// The steward capabilities, resolved for one locale, with the screenshots that
// prove each one.
//
// `ui.ts` types `en` against `fr`, so a MISSING key is already a compile error.
// What that cannot catch is the two arrays drifting out of ORDER — both stay
// eight entries of the right shape while entry 3 means different things in the
// two locales, and the page would then pair an English claim with the French
// screenshot for something else. The `key` on each feature is the fix, and the
// check below is what makes carrying it worth anything.

import { ui } from '../i18n/ui';
import { SCREEN_KEYS, type ScreenKey } from './screens';
import type { Lang } from '../i18n/routes';

export type Feature = {
  key: string;
  screens: readonly ScreenKey[];
  title: string;
  body: string;
  soon: boolean;
};

/**
 * The four that lead with a screenshot on the home page, in that order. Every
 * one of them must own at least one publishable screen — leading with a
 * capability we cannot show would make the band's promise emptier, not fuller.
 */
const LEAD: readonly string[] = ['triage', 'trails', 'proof', 'rewards'];

// Widened to string on purpose: `fr` is `as const`, so its keys narrow to a
// literal union and every membership test against a plain string would be a
// type error rather than the runtime check this file exists to perform.
const frKeys: string[] = ui.fr.stewards.features.map((f) => f.key);
const enKeys: string[] = ui.en.stewards.features.map((f) => f.key);
if (frKeys.join('|') !== enKeys.join('|')) {
  throw new Error(
    `steward features are out of order between locales:\n  fr: ${frKeys.join(', ')}\n  en: ${enKeys.join(', ')}`,
  );
}

for (const f of ui.fr.stewards.features) {
  for (const s of f.screens) {
    if (!(SCREEN_KEYS as readonly string[]).includes(s)) {
      throw new Error(`feature "${f.key}" names an unknown screen "${s}"`);
    }
  }
}
for (const missing of LEAD.filter((k) => !frKeys.includes(k))) {
  throw new Error(`the home page leads with feature "${missing}", which no longer exists`);
}
for (const k of LEAD) {
  const f = ui.fr.stewards.features.find((x) => x.key === k)!;
  if (f.screens.length === 0) {
    throw new Error(
      `the home page leads with "${k}", which has no publishable screen — a screen-led ` +
        `row with no screen is worse than the compact line it replaced`,
    );
  }
}

export function features(lang: Lang): Feature[] {
  return ui[lang].stewards.features.map((f) => ({
    key: f.key,
    screens: f.screens as readonly ScreenKey[],
    title: f.title,
    body: f.body,
    soon: 'soon' in f && f.soon === true,
  }));
}

/** Screen-led rows on the home page. */
export function leadFeatures(lang: Lang): Feature[] {
  const all = features(lang);
  return LEAD.map((k) => all.find((f) => f.key === k)!);
}

/** Everything else, kept as the compact list the band has always used. */
export function restFeatures(lang: Lang): Feature[] {
  return features(lang).filter((f) => !LEAD.includes(f.key));
}

/** Alt text for one screen, from the locale's own copy. */
export function altFor(lang: Lang, screen: ScreenKey): string {
  return ui[lang].stewards.alts[screen];
}
