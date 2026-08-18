// Screenshots of the real steward desk, imported by scripts/import-screens.mjs
// from the product repo's capture run. Nothing here is drawn or mocked: each
// file is a photograph of the running product, taken only after the capture
// harness proved the content it shows was on screen.
//
// The images are resolved through import.meta.glob so `astro:assets` can
// re-encode them (AVIF/WebP, intrinsic width/height) — a plain path in
// public/ would ship 9 MB of PNG and no dimensions, which is a layout shift on
// every card.

import type { ImageMetadata } from 'astro';
import type { Lang } from '../i18n/routes';

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/screens/*.png', {
  eager: true,
});

/**
 * Every screen the site may show, in the tour's order.
 *
 * The QR-sticker screen is deliberately not here: the desk prints
 * `window.location.origin` into each sticker card, so a captured one reads
 * `http://localhost:<port>`. The capture run marks it unpublishable and the
 * import script refuses it; the sticker capability keeps its written card, and
 * QrSticker.astro already shows a real sticker pointing at the real app.
 */
export const SCREEN_KEYS = [
  'triage',
  'trails',
  'field-trace',
  'stats',
  'categories',
  'rewards',
  'integrations',
  'territory',
] as const;

export type ScreenKey = (typeof SCREEN_KEYS)[number];

/** The phone shot frames differently from the desk shots. */
export const PHONE_SCREENS: ReadonlySet<ScreenKey> = new Set<ScreenKey>(['field-trace']);

/**
 * The captured image for one screen in one locale.
 *
 * Throws at BUILD time when a locale is missing, which is the point: the site
 * must never quietly serve French artwork on an English page. The copy
 * contract in i18n/ui.ts is compiler-enforced; this is the same guarantee for
 * the pictures, one layer down where the files are dynamic.
 */
export function screenImage(key: ScreenKey, lang: Lang): ImageMetadata {
  const found = files[`../assets/screens/${key}.${lang}.png`];
  if (!found) {
    throw new Error(
      `No captured screen "${key}.${lang}.png". Run in the product repo:\n` +
        `  pnpm --filter @snag/api seed:showcase && pnpm capture:screens\n` +
        `then here: node scripts/import-screens.mjs <path-to-snag-repo>`,
    );
  }
  return found.default;
}
