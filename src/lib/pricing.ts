// The tiers, the two published rates, and the doors that take the money.
//
// EVERY NUMBER LIVES HERE AND NOWHERE IN ui.ts. That is the whole design of
// this file: `ui.ts` types `en` against `fr`, so a missing key is a compile
// error — but nothing would catch « 79 $ » in French sitting beside "$99" in
// English, and a pricing page whose two locales quote different amounts is the
// worst bug this site could ship. The copy carries words; this carries money.
//
// Source of truth: the repricing approved 2026-09-18. Per ORGANISATION, in
// CAD, taxes extra. Annual is ten months of the monthly rate.

import type { Lang } from '../i18n/routes';

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

/** One rate's two amounts and two doors. */
export type RatePrices = {
  /** CAD per month. */
  monthly: number;
  /** CAD per year. Ten months of the monthly rate — two months off. */
  yearly: number;
  monthlyUrl: string;
  yearlyUrl: string;
};

export type Tier = {
  key: TierKey;
  /** Verified territories included. A number to orient by, never a meter. */
  territories: string;
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
    territories: '1',
    rates: { nonprofit: FREE, commercial: FREE },
  },
  {
    key: 'parc',
    territories: '3',
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
    territories: '10',
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

// GUARD 1 — the arithmetic nobody re-checks by eye: annual must actually be
// ten months of the monthly rate, or the page advertises « deux mois offerts »
// over a discount that is not there — a promise a customer can compute in one
// multiplication and we cannot take back. Both rates, because a correction
// applied to one and forgotten on the other is the likeliest way this breaks.
for (const t of SOLD) {
  for (const rate of RATES) {
    const { monthly, yearly } = t.rates[rate];
    if (yearly !== monthly * 10) {
      throw new Error(
        `tier ${t.key} (${rate}): annual ${yearly} is not ten months of ${monthly} — ` +
          `the page claims two months off, so either fix the number or stop claiming it`,
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
