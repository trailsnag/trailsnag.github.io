// The competitors named on the comparison page, resolved for one locale.
//
// `ui.ts` types `en` against `fr`, so a missing key is already a compile error.
// What that cannot catch is the two arrays drifting out of ORDER — the same
// trap `steward-tour.ts` documents, and worse here: the arrays would stay six
// entries of the right shape while entry 3 named Vélo Québec in French and
// OuterSpatial in English, publishing one company's pricing model under
// another company's name. The `key` on each player is the fix.

import { ui } from '../i18n/ui';
import type { Lang } from '../i18n/routes';

export type Player = {
  key: string;
  name: string;
  origin: string;
  what: string;
  visitor: string;
  data: string;
  pricing: string;
  versus: string;
  need: string;
};

// Widened to string on purpose: `fr` is `as const`, so its keys narrow to a
// literal union and every comparison against a plain string would be a type
// error rather than the runtime check this file exists to perform.
const frKeys: string[] = ui.fr.comparison.players.map((p) => p.key);
const enKeys: string[] = ui.en.comparison.players.map((p) => p.key);
if (frKeys.join('|') !== enKeys.join('|')) {
  throw new Error(
    `comparison players are out of order between locales:\n  fr: ${frKeys.join(', ')}\n  en: ${enKeys.join(', ')}`,
  );
}

/**
 * Every player carries both halves: what separates us from it (`versus`), and
 * the need for which a reader should go to it instead (`need`).
 *
 * They fail the page in opposite directions and both are load-bearing. A card
 * with no `versus` is a competitor advertisement on our own site. A page whose
 * `need` lines all quietly disappear wins on every axis, which is the shape a
 * public buyer discounts whole — and it would contradict « Où ne pas se
 * battre » in the business plan, where ceding operational depth and mapping is
 * a decision already taken rather than a weakness being admitted.
 */
for (const p of ui.fr.comparison.players) {
  if (p.versus.trim() === '') {
    throw new Error(`comparison player "${p.key}" never says what separates us from it`);
  }
  if (p.need.trim() === '') {
    throw new Error(`comparison player "${p.key}" names no need it serves better than us`);
  }
}

export function players(lang: Lang): Player[] {
  return ui[lang].comparison.players.map((p) => ({
    key: p.key,
    name: p.name,
    origin: p.origin,
    what: p.what,
    visitor: p.visitor,
    data: p.data,
    pricing: p.pricing,
    versus: p.versus,
    need: p.need,
  }));
}
