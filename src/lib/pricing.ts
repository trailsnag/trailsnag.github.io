// The tiers, the two published rates, and the doors that take the money.
//
// EVERY NUMBER LIVES HERE AND NOWHERE IN ui.ts. That is the whole design of
// this file: `ui.ts` types `en` against `fr`, so a missing key is a compile
// error — but nothing would catch « 79 $ » in French sitting beside "$99" in
// English, and a pricing page whose two locales quote different amounts is the
// worst bug this site could ship. The copy carries words; this carries money.
//
// Source of truth: the repricing approved 2026-09-18. Per ORGANISATION, in
// CAD, taxes extra. Annual is ten months of the monthly rate (guard 1); the
// launch trial is a separate thing on the monthly links only (TRIAL_MONTHS).

import type { Lang } from '../i18n/routes';
import { ui } from '../i18n/ui';

export type TierKey = 'halte' | 'parc' | 'reseau';

/**
 * The two published rates.
 *
 * NOT a list price and a discount. A zec is a non-profit by law, and so is
 * nearly every buyer here — municipalities, MRCs, OBNL clubs — so the
 * organisme rate is the ORDINARY price and the entreprise rate is the
 * exception for operators who sell access to their trails. Published side by
 * side for that reason: the words « rabais », a percentage and a struck price
 * never appear on the page, because nothing is being marked down.
 *
 * The rate changes what an organisation PAYS and never what it may do. Both
 * rates of one tier buy exactly the same thing, exactly as the two intervals
 * do — which is why the product maps a Stripe price id to a TIER.
 */
export type Rate = 'nonprofit' | 'commercial';
export const RATES: readonly Rate[] = ['nonprofit', 'commercial'];

/**
 * The payment links, pasted from the Stripe dashboard.
 *
 * These are PUBLIC urls — a payment link is meant to be clicked by anybody, it
 * carries no secret, and committing it is how a static site can sell anything
 * at all. An empty one is a BUILD FAILURE (the guard below), never a fallback:
 * the page ships when every button can take money, and not before.
 *
 * Keep the pairing honest. A link pasted into the wrong constant sells the
 * organisme rate at the entreprise price or the reverse, and nothing
 * downstream can detect it — the URL is opaque. Each of these was verified
 * against its Stripe line item before being pasted.
 *
 * THESE EIGHT LINKS AND THE EIGHT AMOUNTS IN TIERS ARE KEPT BY HAND IN FOUR
 * PLACES, and nothing checks one against another. Change a price or replace
 * a link and change it in all four the same day:
 *   1. here (links) and in TIERS below (amounts);
 *   2. snag `.env.example` — STRIPE_PRICE_* with the amounts as comments,
 *      STRIPE_CHECKOUT_* with the links;
 *   3. the API's Fly secrets STRIPE_CHECKOUT_* (and STRIPE_PRICE_*), read by
 *      apps/api/src/env.ts — the billing room's « Passer à … » buttons;
 *   4. the vault's « TrailSnag Plan d'affaires 2026-08-28 », §4.
 * Stripe is the only authority over what a link actually charges; a manifest
 * exported from it and read by all four is the fix still owed
 * (trailsnag/snag-carnet#66).
 */
export const CHECKOUT: Readonly<Record<string, string>> = {
  parcNonprofitMonthly: 'https://buy.stripe.com/6oUaEX5EzeLu1057QXaMU04',
  parcNonprofitYearly: 'https://buy.stripe.com/aFa9ATaYTgTC7ot5IPaMU05',
  parcCommercialMonthly: 'https://buy.stripe.com/eVq6oH8QL7j25gl5IPaMU06',
  parcCommercialYearly: 'https://buy.stripe.com/8x2cN58QL0UEbEJ3AHaMU07',
  reseauNonprofitMonthly: 'https://buy.stripe.com/9B614n8QL7j2gZ3gntaMU08',
  reseauNonprofitYearly: 'https://buy.stripe.com/28EfZhgjdbzi4ch5IPaMU09',
  reseauCommercialMonthly: 'https://buy.stripe.com/3cI6oH5Ez6eYaAF1szaMU0a',
  reseauCommercialYearly: 'https://buy.stripe.com/5kQ9AT9UPaveaAFb39aMU0b',
};

/**
 * The launch offer, in the unit it is SPOKEN in: months free on the MONTHLY
 * links, none on the yearly ones.
 *
 * THIS IS A COPY, AND THE ORIGINAL IS NOT HERE. The real trial is an operator
 * setting held by Stripe on each payment link (`trial_period_days`), moved by
 * `./bin/snag.sh billing trial --months N --interval month` in the snag repo
 * (apps/api/src/ops/stripe-trial.ts) and read back from Stripe on every run.
 * A static build cannot ask Stripe, so nothing here can notice the offer
 * changing: whoever runs that command changes this number in the same hour,
 * or the page promises an offer the till no longer makes. 0 withdraws the
 * badge and the note from the page.
 */
export const TRIAL_MONTHS: number = 2;

/** What Stripe actually counts. Thirty-day months, the same convention
    stripe-trial.ts converts with, so « 60 jours » is the exact figure the
    checkout shows rather than two calendar months. */
export const TRIAL_DAYS = TRIAL_MONTHS * 30;

/** One rate's two amounts and two doors. */
export type RatePrices = {
  /** CAD per month. */
  monthly: number;
  /** CAD per year. Ten months of the monthly rate: twelve months billed as
      ten. That is the ANNUAL DISCOUNT, and it has nothing to do with the
      launch trial, which only the monthly links carry (TRIAL_MONTHS). */
  yearly: number;
  monthlyUrl: string;
  yearlyUrl: string;
};

export type Tier = {
  key: TierKey;
  /** Verified territories included. A number to orient by, never a meter.
      The card's territory line and the « more than N » line under the grid
      are both printed from it (guard 6), so ui.ts never holds the count. */
  territories: number;
  rates: Record<Rate, RatePrices>;
};

/** Halte sells nothing, so both its rates are zero and neither has a door.
    It is still a Tier rather than a special case: the card renders « 0 $ » in
    the same type as 79 $, which says more than the word « gratuit » does. */
const FREE: RatePrices = { monthly: 0, yearly: 0, monthlyUrl: '', yearlyUrl: '' };

/**
 * The grid, in the order a buyer meets it.
 *
 * Territoire is ABSENT and that is the decision, not an omission: a card with
 * no price and no button sells nothing and spends a quarter of the grid on a
 * way out of it. A province-wide network is a conversation, so it lives as a
 * row in the orientation table with a line to the contact page.
 */
export const TIERS: readonly Tier[] = [
  {
    key: 'halte',
    territories: 1,
    rates: { nonprofit: FREE, commercial: FREE },
  },
  {
    key: 'parc',
    territories: 3,
    rates: {
      nonprofit: {
        monthly: 79,
        yearly: 790,
        monthlyUrl: CHECKOUT.parcNonprofitMonthly ?? '',
        yearlyUrl: CHECKOUT.parcNonprofitYearly ?? '',
      },
      commercial: {
        monthly: 109,
        yearly: 1090,
        monthlyUrl: CHECKOUT.parcCommercialMonthly ?? '',
        yearlyUrl: CHECKOUT.parcCommercialYearly ?? '',
      },
    },
  },
  {
    key: 'reseau',
    territories: 10,
    rates: {
      nonprofit: {
        monthly: 129,
        yearly: 1290,
        monthlyUrl: CHECKOUT.reseauNonprofitMonthly ?? '',
        yearlyUrl: CHECKOUT.reseauNonprofitYearly ?? '',
      },
      commercial: {
        monthly: 169,
        yearly: 1690,
        monthlyUrl: CHECKOUT.reseauCommercialMonthly ?? '',
        yearlyUrl: CHECKOUT.reseauCommercialYearly ?? '',
      },
    },
  },
];

/** The paid tiers, which is where every guard below has something to check. */
const SOLD = TIERS.filter((t) => t.rates.nonprofit.monthly > 0);

// GUARD 1 — the annual discount, and ONLY the annual discount: the yearly
// price must be exactly ten times the monthly one, twelve months for the
// price of ten. A buyer checks that in one multiplication against the « Payer
// à l'année » line, and a yearly price that drifted off it would be a
// discount we quietly stopped giving. Both rates, because a correction
// applied to one and forgotten on the other is the likeliest way this breaks.
//
// This is NOT the launch trial, though both are « two months » today and they
// were confused before: the trial is days at no charge on the MONTHLY links
// alone (TRIAL_MONTHS, guard 5, set in Stripe by `snag billing trial`), and
// the yearly links carry none precisely because the discount already gives
// those months — both together would be fourteen months for the price of ten.
// Change either one without touching the other.
for (const t of SOLD) {
  for (const rate of RATES) {
    const { monthly, yearly } = t.rates[rate];
    if (yearly !== monthly * 10) {
      throw new Error(
        `tier ${t.key} (${rate}): annual ${yearly} is not ten months of ${monthly} — ` +
          `the yearly price is sold as twelve months for the price of ten, so fix the number`,
      );
    }
  }
}

/**
 * GUARD 2 — EVERY BUY BUTTON MUST BE A REAL PAYMENT LINK, and the build
 * enforces it.
 *
 * ChefFamille's rule, 2026-09-09: no « bientôt », no « écrivez-nous » standing
 * where a price button belongs. A buy button that admits the product is not
 * ready is worse than no page at all — it tells a buyer to come back later,
 * and they do not. So a missing link is a BUILD FAILURE rather than a graceful
 * fallback, and the failure names the exact constant to fill, because the
 * person reading it will be holding eight Stripe URLs and wanting to know
 * which goes where.
 */
for (const t of SOLD) {
  for (const rate of RATES) {
    const prices = t.rates[rate];
    for (const [interval, url] of [
      ['Monthly', prices.monthlyUrl],
      ['Yearly', prices.yearlyUrl],
    ] as const) {
      const constant = `${t.key}${rate === 'nonprofit' ? 'Nonprofit' : 'Commercial'}${interval}`;
      if (url === '') {
        throw new Error(
          `pricing: ${t.key} has no ${rate} ${interval.toLowerCase()} payment link. Paste it ` +
            `into CHECKOUT.${constant} in src/lib/pricing.ts. Create it in Stripe → Payment ` +
            `links, on the matching price. The pricing page does not ship with a button that ` +
            `cannot take money.`,
        );
      }
      if (!url.startsWith('https://')) {
        throw new Error(`pricing: CHECKOUT.${constant} must be an https URL, got "${url}"`);
      }
    }
  }
}

// GUARD 3 — the organisme rate is the lower one, by a spread that stays in a
// believable band. Inverted, the page would charge a zec more than a ski
// resort and nobody would notice until a customer did; too narrow and the two
// rates are noise; too wide and the entreprise rate reads as a penalty rather
// than as a price somebody actually pays.
for (const t of SOLD) {
  const { nonprofit, commercial } = t.rates;
  const spread = (commercial.monthly - nonprofit.monthly) / nonprofit.monthly;
  if (commercial.monthly <= nonprofit.monthly) {
    throw new Error(
      `tier ${t.key}: the organisme rate (${nonprofit.monthly}) must be BELOW the entreprise ` +
        `rate (${commercial.monthly}) — a zec must never pay more than a for-profit operator`,
    );
  }
  if (spread < 0.15 || spread > 0.4) {
    throw new Error(
      `tier ${t.key}: a spread of ${Math.round(spread * 100)} % between the two rates is outside ` +
        `15-40 % — below that the two rates are noise, above it the entreprise rate reads as a fine`,
    );
  }
}

// GUARD 4 — a tier costs more than the one below it, on both rates and both
// intervals. The grid reads top to bottom and the page never says "more
// expensive"; it just shows numbers in order, so the order has to hold.
for (let i = 1; i < SOLD.length; i += 1) {
  const lower = SOLD[i - 1]!;
  const upper = SOLD[i]!;
  for (const rate of RATES) {
    for (const interval of ['monthly', 'yearly'] as const) {
      if (upper.rates[rate][interval] <= lower.rates[rate][interval]) {
        throw new Error(
          `tier ${upper.key} (${rate}, ${interval}) costs ${upper.rates[rate][interval]}, which is ` +
            `not more than ${lower.key} at ${lower.rates[rate][interval]} — the grid is out of order`,
        );
      }
    }
  }
}

// GUARD 5 — the trial is a number the copy is not allowed to know. The badge
// and the note carry `{months}` and `{days}` and this file fills them, so the
// two locales cannot quote two offers and neither can quote a stale one. The
// offer is a whole number of months within what stripe-trial.ts accepts
// (1-730 days), and never ONE: the copy is written in the plural, and « 1 mois
// gratuits » is the kind of slip a buyer reads as carelessness about money.
if (!Number.isInteger(TRIAL_MONTHS) || TRIAL_MONTHS < 0 || TRIAL_DAYS > 730) {
  throw new Error(
    `pricing: TRIAL_MONTHS ${TRIAL_MONTHS} is not a whole number of months between 0 and 24 — ` +
      `Stripe's trial on the payment links is set in days, 1 to 730`,
  );
}
if (TRIAL_MONTHS === 1) {
  throw new Error(
    `pricing: a one-month trial needs singular copy (« 1 mois gratuit », "1 month free") — ` +
      `add it to ui.ts before setting TRIAL_MONTHS to 1`,
  );
}
for (const lang of ['fr', 'en'] as const) {
  const { trialBadge, trialNote } = ui[lang].pricing;
  if (!trialBadge.includes('{months}') || !trialNote.includes('{days}') || /\d/.test(trialBadge + trialNote)) {
    throw new Error(
      `pricing: ui.${lang}.pricing.trialBadge must carry {months} and trialNote {days}, and neither ` +
        `may hold a digit — the length of the offer lives in TRIAL_MONTHS and nowhere else`,
    );
  }
}

/** The launch offer as the page prints it, or null when there is none. */
export function trialCopy(lang: Lang): { badge: string; note: string } | null {
  if (TRIAL_MONTHS === 0) return null;
  const { trialBadge, trialNote } = ui[lang].pricing;
  return {
    badge: trialBadge.replace('{months}', String(TRIAL_MONTHS)),
    note: trialNote.replace('{days}', String(TRIAL_DAYS)),
  };
}

// GUARD 6 — the territory counts live on the tiers, not in the copy. Each
// card names its count through exactly one `{n}` feature line, and the line
// under the grid (« plus de {n} territoires ») through `{n}` too, filled with
// the largest tier's count; a digit typed next to either would be a second
// answer that stops agreeing the day a tier's allowance moves.
const TERRITORY_CEILING = Math.max(...TIERS.map((t) => t.territories));
for (const lang of ['fr', 'en'] as const) {
  const copy = ui[lang].pricing;
  for (const t of TIERS) {
    const lines = copy.tiers[t.key].features.filter((f) => f.includes('{n}'));
    if (lines.length !== 1 || /\d/.test(lines[0]!)) {
      throw new Error(
        `pricing: ui.${lang}.pricing.tiers.${t.key}.features needs exactly one line with {n} and ` +
          `no digit — the territory count comes from TIERS (${t.territories}), not from the copy`,
      );
    }
  }
  if (!copy.territoire.includes('{n}') || /\d/.test(copy.territoire)) {
    throw new Error(
      `pricing: ui.${lang}.pricing.territoire must say {n} rather than a number — it is filled ` +
        `with the largest tier's count (${TERRITORY_CEILING})`,
    );
  }
}

/** A tier's feature lines with its territory count written in. */
export function tierFeatures(tier: Tier, lang: Lang): string[] {
  return ui[lang].pricing.tiers[tier.key].features.map((f) =>
    f.replace('{n}', String(tier.territories)),
  );
}

/** The line under the grid, pointing past the largest tier to the contact page. */
export function beyondLargestTier(lang: Lang): string {
  return ui[lang].pricing.territoire.replace('{n}', String(TERRITORY_CEILING));
}

/**
 * A price as its locale writes it.
 *
 * Québec French puts the sign after the number with a non-breaking space, and
 * the thousands separator is a space rather than a comma. Getting this wrong
 * is the kind of small tell that makes a local product look imported, which is
 * the one thing this product cannot afford to look like.
 */
export function money(amount: number, lang: Lang): string {
  return new Intl.NumberFormat(lang === 'fr' ? 'fr-CA' : 'en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Where a buy button goes.
 *
 * The page's language rides along as Stripe's `locale` parameter, because the
 * hosted checkout otherwise follows the BROWSER: a reader on /tarifs/ with an
 * English Chrome met « Subscribe to TrailSnag Parc — per month » over a French
 * product line, and the reverse on /en/pricing/. The visitor chose a language
 * by choosing the page; the till keeps it. `fr-CA` rather than `fr` so the
 * checkout writes amounts the Québec way, as this page does.
 *
 * Halte carries no link at all — its button is the claim funnel — and guard 2
 * has already refused an empty link on every tier that sells, so an empty one
 * here is never a hole.
 */
export function offer(url: string, lang: Lang): { href: string } {
  if (url === '') return { href: '' };
  const u = new URL(url);
  u.searchParams.set('locale', lang === 'fr' ? 'fr-CA' : 'en');
  return { href: u.toString() };
}
