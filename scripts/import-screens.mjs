// ABOUTME: Copies the product repo's captured desk screenshots into src/assets,
// ABOUTME: refusing anything the site could not honestly publish.
//
// The images are PRODUCED in the product monorepo (`pnpm capture:screens`,
// which drives the real desk in Chromium) and COMMITTED here, next to the
// pages that publish them. This script is the seam between the two.
//
//   node scripts/import-screens.mjs [path-to-snag-repo]
//
// Defaults to ../obstaque. Pass a worktree path when the captures came from a
// feature branch — a worktree is a different checkout with its own HEAD.

import { copyFileSync, mkdirSync, readFileSync, readdirSync, writeFileSync, unlinkSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { basename, resolve } from 'node:path';

const repo = resolve(process.argv[2] ?? '../obstaque');
const allowDirty = process.argv.includes('--allow-dirty');
const from = resolve(repo, 'e2e/capture/out');
const to = resolve(import.meta.dirname, '../src/assets/screens');

/**
 * Every screen the site is allowed to show, and both locales of each.
 *
 * `stickers` is deliberately absent. The desk prints `window.location.origin`
 * into each sticker card — right for the product, since the printed code has to
 * carry the origin the org actually uses — so a captured sticker screen reads
 * `http://localhost:<port>`. The capture run marks it `publish: false` and this
 * list agrees; the sticker capability keeps its written card, and the site's own
 * QrSticker component already shows a real sticker pointing at the real app.
 */
const KEYS = [
  'triage',
  'trails',
  'stats',
  'categories',
  'rewards',
  'integrations',
  'territory',
  'field-trace',
];
const LOCALES = ['fr', 'en'];

function die(message) {
  console.error(`\n✗ ${message}\n`);
  process.exit(1);
}

let manifest;
try {
  manifest = JSON.parse(readFileSync(resolve(from, 'manifest.json'), 'utf8'));
} catch {
  die(
    `no capture manifest at ${from}\n` +
      `  Run this in the product repo first:\n` +
      `    pnpm --filter @snag/api seed:showcase && pnpm capture:screens`,
  );
}

// A capture taken on a dirty tree cannot be reproduced from its commit, which
// makes "is this screenshot stale?" unanswerable later. That question is the
// whole reason the manifest records a sha.
if (manifest.appTreeDirty && !allowDirty) {
  die(
    `these captures were taken on a DIRTY working tree (${manifest.appGitSha.slice(0, 12)}), so\n` +
      `  nobody can reproduce them from that commit. Commit the product repo and\n` +
      `  recapture, or pass --allow-dirty if you accept unreproducible images.`,
  );
}

// The org in the picture must be invented. The product repo's gate checks this
// at the source; checking it again here means a hand-copied file cannot slip a
// real organisation's name onto trailsnag.com.
if (!String(manifest.orgSlug).includes('showcase')) {
  die(
    `the captured org "${manifest.orgSlug}" does not carry the fictional-org marker —\n` +
      `  refusing to publish screenshots that may show a real organisation.`,
  );
}

// Both locales of every screen, or the site would silently fall back to French
// artwork on an English page — the exact failure the copy parity contract
// exists to prevent, one layer down.
const have = new Map(manifest.screens.map((s) => [`${s.key}.${s.locale}`, s]));
const missing = [];
for (const key of KEYS) {
  for (const locale of LOCALES) {
    if (!have.has(`${key}.${locale}`)) missing.push(`${key}.${locale}`);
  }
}
if (missing.length) die(`the capture run is missing:\n  ${missing.join('\n  ')}`);

// Every file must match the sha the capture run recorded. A PNG edited by hand
// after capture is no longer a photograph of the product, and that is exactly
// the claim these images carry.
mkdirSync(to, { recursive: true });
const written = [];
for (const [, entry] of have) {
  if (!KEYS.includes(entry.key)) continue;
  // The capture run is the authority on what may be published — it is the only
  // thing that saw the pixels. This list agreeing is not enough.
  if (entry.publish === false) {
    die(
      `${entry.file} is marked publish:false by the capture run, but this script's\n` +
        `  KEYS list still wants it. Remove it here, or make the screen publishable there.`,
    );
  }
  const src = resolve(from, entry.file);
  const bytes = readFileSync(src);
  const sha = createHash('sha256').update(bytes).digest('hex');
  if (sha !== entry.sha256) {
    die(`${entry.file} does not match its manifest sha256 — it was modified after capture.`);
  }
  copyFileSync(src, resolve(to, entry.file));
  written.push(entry.file);
}

// Drop images no longer in the catalog, so a renamed screen cannot leave its
// predecessor behind to be published by an old import.
for (const stale of readdirSync(to)) {
  if (stale === 'manifest.json' || written.includes(stale)) continue;
  unlinkSync(resolve(to, stale));
  console.log(`  removed stale ${stale}`);
}

// Provenance travels WITH the images: the site can answer "which build of the
// desk is this?" without the product repo being checked out.
writeFileSync(
  resolve(to, 'manifest.json'),
  JSON.stringify(
    {
      capturedAt: manifest.capturedAt,
      appGitSha: manifest.appGitSha,
      orgName: manifest.orgName,
      screens: manifest.screens
        .filter((s) => KEYS.includes(s.key))
        .map(({ key, locale, device, route, file, sha256, proof }) => ({
          key,
          locale,
          device,
          route,
          file,
          sha256,
          proof,
        })),
    },
    null,
    2,
  ) + '\n',
);

const kb = Math.round(
  manifest.screens.filter((s) => KEYS.includes(s.key)).reduce((n, s) => n + s.bytes, 0) / 1024,
);
console.log(`\n✓ imported ${written.length} screens (${kb} KB of PNG) from ${basename(repo)}`);
console.log(`  desk build: ${manifest.appGitSha.slice(0, 12)} · captured ${manifest.capturedAt}`);
console.log(`  astro:assets re-encodes these to AVIF/WebP at build time.\n`);
