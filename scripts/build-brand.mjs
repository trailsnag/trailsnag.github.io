// Generates the downloadable brand kit in `public/brand/` — the logo as real
// files, for every place that cannot run our CSS: a partner deck, a grant file,
// a print shop, a municipality asking us to email them a logo.
//
// The wordmark on screen is live text (Bricolage Grotesque Variable, weight 800,
// letter-spacing -0.03em). A handed-over file cannot rely on the recipient
// having that font, so every glyph is converted to outlines here. Bricolage
// Grotesque is OFL-1.1, which permits exactly this.
//
// The kit is derived, never hand-drawn: the mark comes from `src/lib/brand-mark.mjs`
// (the same constant `BlazedPin.astro` renders) and the wordmark proportions come
// from the shipped lockup in `QrSticker.astro`. Run `pnpm brand` after either changes.
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import * as fontkit from 'fontkit';

import { SNAG_MARK_PATH, SNAG_MARK_VIEWBOX } from '../src/lib/brand-mark.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'public', 'brand');

/* Palette, mirrored from src/styles/global.css. `blaze` is the light-surface
   paint; `blazeOnDark` is the dark-surface one the media query swaps in, so the
   reversed lockup keeps the same contrast the site has in dark mode. */
const INK = '#0f1f1a';
const PAPER = '#f1f4ee';
const PINE = '#2e5a4c';
const BLAZE = '#cb561f';
const BLAZE_ON_DARK = '#e2703a';

/* The mark's ink extent inside its 64×80 viewBox. Every bound is an on-path
   endpoint with a tangent perpendicular to that axis, so these are exact, not
   sampled: x=6 and x=58 are the teardrop's waist endpoints, y=3 its crown, y=77
   its tip. They are hand-derived from SNAG_MARK_PATH, so the digest below pins
   the string they were derived from — change the path and this must be redone. */
const MARK_INK = { minX: 6, minY: 3, maxX: 58, maxY: 77 };
const MARK_PATH_DIGEST = 'de37609e9cedfaa55868d62770b86f89ffcc427e32db0a9e1dc10a318efc3898';

/* Shipped lockup proportions, read off QrSticker.astro: a 28px pin, an 8px gap
   and an 18px wordmark. Expressed against the wordmark size so the lockup scales
   from one number. */
const FONT_SIZE = 100;
const PIN_HEIGHT = FONT_SIZE * (28 / 18);
const PIN_GAP = FONT_SIZE * (8 / 18);
const TRACKING_EM = -0.03;

const FONT_FILE = path.join(
  root,
  'node_modules/@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-wght-normal.woff2',
);

const round = (n) => Number(n.toFixed(3));

function assertMarkUnchanged() {
  const digest = createHash('sha256').update(SNAG_MARK_PATH).digest('hex');
  if (digest !== MARK_PATH_DIGEST) {
    throw new Error(
      `SNAG_MARK_PATH changed (${digest}). Re-derive MARK_INK from the new geometry, ` +
        'then update MARK_PATH_DIGEST in this script.',
    );
  }
  const favicon = readFileSync(path.join(root, 'public', 'favicon.svg'), 'utf8');
  if (!favicon.includes(SNAG_MARK_PATH)) {
    throw new Error('public/favicon.svg no longer holds the canonical mark path.');
  }
}

/**
 * The wordmark as outlines, in a Y-down space with the baseline at y=0 and the
 * text origin at x=0. Returns the letters and the blaze period separately —
 * the period is the snag, and it is the one part that carries paint.
 */
function outlineWordmark() {
  const font = fontkit.openSync(FONT_FILE);
  /* The wght subset's default instance IS ExtraBold (its axis is 200–800 with
     default 800), which is the weight the site renders the wordmark at, so the
     unvaried font is already the right one. */
  if (font.variationAxes.wght.default !== 800) {
    throw new Error(`Expected an ExtraBold default instance, got ${font.variationAxes.wght.default}.`);
  }
  const scale = FONT_SIZE / font.unitsPerEm;
  const tracking = TRACKING_EM * font.unitsPerEm;
  const run = font.layout('TrailSnag.');

  let pen = 0;
  const letters = [];
  let dot = null;
  let box = null;

  run.glyphs.forEach((glyph, i) => {
    const pos = run.positions[i];
    // (s, 0, 0, -s, tx, ty): scale to size and flip the font's Y-up axis down.
    const placed = glyph.path.transform(
      scale,
      0,
      0,
      -scale,
      (pen + pos.xOffset) * scale,
      -pos.yOffset * scale,
    );
    const d = placed.toSVG();
    if (d) {
      const b = placed.bbox;
      box = box
        ? {
            minX: Math.min(box.minX, b.minX),
            minY: Math.min(box.minY, b.minY),
            maxX: Math.max(box.maxX, b.maxX),
            maxY: Math.max(box.maxY, b.maxY),
          }
        : { ...b };
      if (i === run.glyphs.length - 1) dot = d;
      else letters.push(d);
    }
    pen += pos.xAdvance + tracking;
  });

  if (!dot) throw new Error('The wordmark period produced no outline.');
  return { letters: letters.join(''), dot, box, capHeight: font.capHeight * scale };
}

const word = outlineWordmark();

/** A <path> in the mark's own 64×80 space, scaled and placed into the artboard. */
function markPath(x, y, height, fill) {
  const s = height / SNAG_MARK_VIEWBOX.height;
  return (
    `<path fill="${fill}" fill-rule="evenodd" ` +
    `transform="translate(${round(x)} ${round(y)}) scale(${round(s)})" d="${SNAG_MARK_PATH}"/>`
  );
}

function svg(viewBox, body, title) {
  const { x, y, w, h } = viewBox;
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${round(x)} ${round(y)} ${round(w)} ${round(h)}" ` +
    `width="${round(w)}" height="${round(h)}" role="img" aria-label="${title}">\n` +
    `  <title>${title}</title>\n  ${body}\n</svg>\n`
  );
}

/* The four ways the logo is allowed to be reproduced. `mono` collapses the
   period into the single ink colour — for one-colour print, engraving and fax,
   where the paint cannot survive as a second colour. */
const VARIANTS = [
  { name: 'ink', ink: INK, dot: BLAZE, label: 'on light backgrounds' },
  { name: 'paper', ink: PAPER, dot: BLAZE_ON_DARK, label: 'on dark backgrounds' },
  { name: 'mono-black', ink: '#000000', dot: '#000000', label: 'one-colour black' },
  { name: 'mono-white', ink: '#ffffff', dot: '#ffffff', label: 'one-colour white' },
];

function buildLockup({ ink, dot }) {
  const pinWidth = PIN_HEIGHT * (SNAG_MARK_VIEWBOX.width / SNAG_MARK_VIEWBOX.height);
  /* Vertically centred on the wordmark's cap band — baseline to cap height —
     which is where the eye puts the middle of a word, descender or not. */
  const pinTop = -word.capHeight / 2 - PIN_HEIGHT / 2;
  const textX = pinWidth + PIN_GAP;

  const s = PIN_HEIGHT / SNAG_MARK_VIEWBOX.height;
  const inkBox = {
    minX: MARK_INK.minX * s,
    minY: pinTop + MARK_INK.minY * s,
    maxX: MARK_INK.maxX * s,
    maxY: pinTop + MARK_INK.maxY * s,
  };
  const box = {
    minX: Math.min(inkBox.minX, textX + word.box.minX),
    minY: Math.min(inkBox.minY, word.box.minY),
    maxX: Math.max(inkBox.maxX, textX + word.box.maxX),
    maxY: Math.max(inkBox.maxY, word.box.maxY),
  };

  const body =
    markPath(0, pinTop, PIN_HEIGHT, ink) +
    `\n  <g transform="translate(${round(textX)} 0)">` +
    `<path fill="${ink}" d="${word.letters}"/>` +
    `<path fill="${dot}" d="${word.dot}"/></g>`;

  return { body, box };
}

function buildMark({ ink }) {
  return { body: markPath(0, 0, SNAG_MARK_VIEWBOX.height, ink), box: { ...MARK_INK } };
}

function buildWordmark({ ink, dot }) {
  return {
    body: `<path fill="${ink}" d="${word.letters}"/>\n  <path fill="${dot}" d="${word.dot}"/>`,
    box: word.box,
  };
}

/* The square tile: fog paper, faint topo contours, the pin inside the 80% safe
   zone. Same art as the product's app icon — this is the avatar shape, for the
   places that only accept a square (org avatars, app listings, social profiles). */
function buildAvatar() {
  const size = 512;
  const contours =
    `<g fill="none" stroke="${PINE}" stroke-opacity=".09" stroke-width="3">` +
    '<circle cx="588" cy="-52" r="230"/><circle cx="588" cy="-52" r="300"/>' +
    '<circle cx="588" cy="-52" r="370"/><circle cx="-70" cy="560" r="240"/>' +
    '<circle cx="-70" cy="560" r="315"/></g>';
  const body =
    `<rect width="${size}" height="${size}" fill="${PAPER}"/>\n  ${contours}\n  ` +
    markPath(136, 106, 300, INK);
  return { body, box: { minX: 0, minY: 0, maxX: size, maxY: size } };
}

const SHAPES = [
  { name: 'lockup', build: buildLockup, title: 'TrailSnag' },
  { name: 'mark', build: buildMark, title: 'TrailSnag — the Blazed Pin' },
  { name: 'wordmark', build: buildWordmark, title: 'TrailSnag' },
];

/* PNG sizes. The mark is taller than it is wide, so it is sized by height and
   everything else by width — the number in the filename is always the dimension
   somebody would ask for. */
const PNG_TARGETS = [
  { shape: 'lockup', axis: 'width', sizes: [512, 1024, 2048] },
  { shape: 'mark', axis: 'height', sizes: [256, 512, 1024] },
  { shape: 'wordmark', axis: 'width', sizes: [512, 1024, 2048] },
];
const PNG_VARIANTS = ['ink', 'paper'];

function rasterize(svgPath, pngPath, axis, size) {
  execFileSync(
    'cairosvg',
    [svgPath, '-o', pngPath, axis === 'width' ? '--output-width' : '--output-height', String(size)],
    { stdio: ['ignore', 'ignore', 'pipe'] },
  );
}

function main() {
  assertMarkUnchanged();

  /* Clear the generated folders only — public/brand/README.md is hand-written
     and lives beside them. */
  for (const sub of ['svg', 'png']) {
    rmSync(path.join(outDir, sub), { recursive: true, force: true });
    mkdirSync(path.join(outDir, sub), { recursive: true });
  }

  const written = [];

  for (const shape of SHAPES) {
    for (const variant of VARIANTS) {
      const { body, box } = shape.build(variant);
      const viewBox = {
        x: box.minX,
        y: box.minY,
        w: box.maxX - box.minX,
        h: box.maxY - box.minY,
      };
      const file = path.join(outDir, 'svg', `trailsnag-${shape.name}-${variant.name}.svg`);
      writeFileSync(file, svg(viewBox, body, `${shape.title} (${variant.label})`));
      written.push(file);
    }
  }

  const avatar = buildAvatar();
  const avatarSvg = path.join(outDir, 'svg', 'trailsnag-avatar.svg');
  writeFileSync(
    avatarSvg,
    svg(
      { x: 0, y: 0, w: avatar.box.maxX, h: avatar.box.maxY },
      avatar.body,
      'TrailSnag — square avatar',
    ),
  );
  written.push(avatarSvg);

  for (const target of PNG_TARGETS) {
    for (const variant of PNG_VARIANTS) {
      const src = path.join(outDir, 'svg', `trailsnag-${target.shape}-${variant}.svg`);
      for (const size of target.sizes) {
        const png = path.join(outDir, 'png', `trailsnag-${target.shape}-${variant}-${size}.png`);
        rasterize(src, png, target.axis, size);
        written.push(png);
      }
    }
  }
  for (const size of [512, 1024]) {
    const png = path.join(outDir, 'png', `trailsnag-avatar-${size}.png`);
    rasterize(avatarSvg, png, 'width', size);
    written.push(png);
  }

  console.log(`brand kit: ${written.length} files in public/brand/`);
}

main();
