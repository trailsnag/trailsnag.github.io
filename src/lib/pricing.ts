// The tiers, their prices, and the doors that take money.
//
// EVERY NUMBER LIVES HERE AND NOWHERE IN ui.ts. That is the whole design of
// this file: `ui.ts` types `en` against `fr`, so a missing key is a compile
// error — but nothing would catch « 199 $ » in French sitting beside "$249" in
// English, and a pricing page whose two locales quote different amounts is the
// worst bug this site could ship. The copy carries words; this carries money.
//
// Source of truth: §4 of the business plan (vault, "TrailSnag Plan d'affaires
// 2026-08-28"). Per ORGANIZATION, in CAD, taxes extra. Annual = two months off.

import type { Lang } from '../i18n/routes';

export type TierKey = 'halte' | 'parc' | 'reseau' | 'territoire';

/**
 * The payment links, pasted from the Stripe dashboard.
 *
 * These are PUBLIC urls — a payment link is meant to be clicked by anybody, it
 * carries no secret, and committing it is how a static site can sell anything
 * at all. An empty one is a BUILD FAILURE (the guard below), never a fallback:
 * the page ships when every button can take money, and not before.
 *
 * Keep the pairing honest. A link pasted into the wrong constant sells Parc at
 * the Réseau price or the reverse, and nothing downstream can detect it — the
 * URL is opaque. Paste one, click it, read the amount on Stripe's own page.
 */
export const CHECKOUT: Readonly<Record<string, string>> = {
  parcMonthly: 'https://buy.stripe.com/5kQ00j4AvcDmbEJ4ELaMU00',
  parcYearly: 'https://buy.stripe.com/7sY9AT9UPfPybEJc7daMU01',
  reseauMonthly: 'https://buy.stripe.com/28EeVdd71bzi7ot8V1aMU02',
  reseauYearly: 'https://buy.stripe.com/6oU6oH3wr46Q7ot6MTaMU03',
};

export type Tier = {
  key: TierKey;
  /** CAD per month, or null where the tier is not sold by the month. */
  monthly: number | null;
  /** CAD per year. Two months off the monthly rate, per §4. */
  yearly: number | null;
  /** Verified territories included. A fit signal, never a meter. */
  territories: string;
  monthlyUrl: string;
  yearlyUrl: string;
};

/**
 * The grid, in the order a buyer meets it.
 *
 * Territoire carries no amount on purpose. §4 prices it on quote and anchors
 * the CONVERSATION at 12 000 $/yr — an anchor is a thing you say in a call
 * after hearing what somebody needs, not a number you publish beside two
 * self-serve buttons where it reads as a price list nobody can act on.
 */
export const TIERS: readonly Tier[] = [
  {
    key: 'halte',
    monthly: 0,
    yearly: 0,
    territories: '1',
    monthlyUrl: '',
    yearlyUrl: '',
  },
  {
    key: 'parc',
    monthly: 199,
    yearly: 1990,
    territories: '3',
    monthlyUrl: CHECKOUT.parcMonthly ?? '',
    yearlyUrl: CHECKOUT.parcYearly ?? '',
  },
  {
    key: 'reseau',
    monthly: 399,
    yearly: 3990,
    territories: '10',
    monthlyUrl: CHECKOUT.reseauMonthly ?? '',
    yearlyUrl: CHECKOUT.reseauYearly ?? '',
  },
  {
    key: 'territoire',
    monthly: null,
    yearly: null,
    territories: '∞',
    monthlyUrl: '',
    yearlyUrl: '',
  },
];

// The build guard, in the shape lib/comparison.ts established. Its job is the
// arithmetic nobody re-checks by eye: annual must actually be ten months of
// the monthly rate, or the page advertises « deux mois offerts » over a
// discount that is not there — a promise a customer can compute in one
// multiplication and we cannot take back.
for (const t of TIERS) {
  if (t.monthly === null || t.yearly === null || t.monthly === 0) continue;
  if (t.yearly !== t.monthly * 10) {
    throw new Error(
      `tier ${t.key}: annual ${t.yearly} is not ten months of ${t.monthly} — ` +
        `the page claims two months off, so either fix the number or stop claiming it`,
    );
  }
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
 * EVERY BUY BUTTON MUST BE A REAL PAYMENT LINK, and the build enforces it.
 *
 * ChefFamille's rule, 2026-09-09: no « bientôt », no « écrivez-nous » standing
 * where a price button belongs. A buy button that admits the product is not
 * ready is worse than no page at all — it tells a buyer to come back later,
 * and they do not. So a missing link is a BUILD FAILURE rather than a graceful
 * fallback: the pricing page ships when it can take money, and until then it
 * does not ship, which is a decision the deploy makes for us instead of a
 * decision a visitor discovers by clicking.
 *
 * The failure names the exact constant to fill, because the person reading it
 * will be holding four Stripe URLs and wanting to know which goes where.
 */
for (const t of TIERS) {
  if (t.monthly === null || t.monthly === 0) continue;
  for (const [interval, url] of [
    ['monthly', t.monthlyUrl],
    ['yearly', t.yearlyUrl],
  ] as const) {
    if (url === '') {
      throw new Error(
        `pricing: ${t.key} has no ${interval} payment link. Paste it into ` +
          `CHECKOUT.${t.key}${interval === 'monthly' ? 'Monthly' : 'Yearly'} in src/lib/pricing.ts. ` +
          `Create it in Stripe → Payment links, on the ${interval} price for ${t.key}. ` +
          `The pricing page does not ship with a button that cannot take money.`,
      );
    }
    if (!url.startsWith('https://')) {
      throw new Error(`pricing: ${t.key} ${interval} link must be an https URL, got "${url}"`);
    }
  }
}

/** Where a buy button goes. Guaranteed live by the guard above. */
export function offer(url: string): { href: string } {
  return { href: url };
}
