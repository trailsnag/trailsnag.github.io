// The tiers, the two published rates, and the doors that take the money.
//
// EVERY NUMBER REACHES THE PAGE THROUGH HERE AND NOWHERE THROUGH ui.ts. That
// is the whole design of this file: `ui.ts` types `en` against `fr`, so a
// missing key is a compile error — but nothing would catch « 79 $ » in French
// sitting beside "$99" in English, and a pricing page whose two locales quote
// different amounts is the worst bug this site could ship. The copy carries
// words; this carries money.
//
// Source of truth: Stripe, read by snag's `billing manifest` on the API's own
// Fly machine and committed here as src/data/stripe-manifest.json (see the
// README beside it).
// Per ORGANISATION, in CAD, taxes extra. Annual is ten months of the monthly
// rate (guard 1); the launch trial is a separate thing on the monthly links
// only (TRIAL_MONTHS).

import type { Lang } from '../i18n/routes';
import { ui } from '../i18n/ui';
import manifestJson from '../data/stripe-manifest.json';

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
 * What Stripe says the eight payment links charge and offer.
 *
 * src/data/stripe-manifest.json is printed by snag's `billing manifest`, run
 * on the API's own Fly machine so that it follows the STRIPE_CHECKOUT_* /
 * STRIPE_PRICE_* the API actually runs with — to each live link, the one price
 * it sells and its trial — and refuses a link that sells a price the API does
 * not name. Neither the links nor the amounts are typed anywhere in this
 * repository: after ANY change at Stripe or to those secrets — a link
 * replaced, a price created, a trial moved by `billing trial` — print it again
 * (src/data/README.md has the one command line) and commit it here. The snag
 * `.env.example` and the vault's business plan point at this file rather than
 * repeating it.
 *
 * The urls are PUBLIC — a payment link is meant to be clicked by anybody, it
 * carries no secret, and committing it is how a static site can sell anything
 * at all. The guards below refuse a manifest that does not fit the grid this
 * page prints, because the build is the only place a static site can object.
 */
type Interval = 'month' | 'year';
const INTERVALS: readonly Interval[] = ['month', 'year'];

/** What `billing manifest` prints, in Stripe's own field names (amounts in
    cents). Declared here rather than inferred from the JSON, so `astro check`
    holds the committed file to the shape the snag command writes, and a field
    renamed on either side is a type error rather than a quiet `undefined`. */
type ManifestEntry = {
  tier: string;
  audience: string;
  interval: string;
  price: { currency: string; interval: string; interval_count: number; unit_amount: number };
  link: { url: string; trial_period_days: number | null };
};
const manifest: { livemode: boolean; entries: readonly ManifestEntry[] } = manifestJson;
const MANIFEST = 'src/data/stripe-manifest.json';
const REGENERATE =
  'Print it again with `billing manifest` on the Fly machine of the snag API (src/data/README.md).';

/**
 * The launch offer, in the unit it is SPOKEN in: months free on the MONTHLY
 * links, none on the yearly ones.
 *
 * The real trial is an operator setting held by Stripe on each payment link
 * (`trial_period_days`), moved by `./bin/snag.sh billing trial --months N
 * --interval month` in snag (apps/api/src/ops/stripe-trial.ts), which ends by
 * reminding whoever ran it to regenerate the manifest. It is read here from
 * the four monthly links, which must agree (guard 5). 0 withdraws the badge
 * and the note from the page.
 */
export const TRIAL_MONTHS: number = trialMonthsFromManifest();

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
 * GUARD 2 — EVERY BUY BUTTON MUST BE A REAL PAYMENT LINK, and the build
 * enforces it as each door is read from the manifest.
 *
 * ChefFamille's rule, 2026-09-09: no « bientôt », no « écrivez-nous » standing
 * where a price button belongs. A buy button that admits the product is not
 * ready is worse than no page at all — it tells a buyer to come back later,
 * and they do not. So a missing door is a BUILD FAILURE rather than a graceful
 * fallback, and so is one the page cannot print honestly: a currency other
 * than the CAD every amount is formatted in, an amount with cents the page
 * would round away, a price billed on another interval than its button says,
 * or a url that is not a Stripe payment link — the only doors snag's command
 * can print, so anything else is a hand edit — or is a sandbox one.
 */
function door(tier: TierKey, rate: Rate, interval: Interval): { amount: number; url: string } {
  const where = `${tier} ${rate} ${interval}`;
  const found: ManifestEntry[] = manifest.entries.filter(
    (e) => e.tier === tier && e.audience === rate && e.interval === interval,
  );
  if (found.length !== 1) {
    throw new Error(
      `pricing: ${MANIFEST} holds ${found.length} entries for ${where}, not one. ${REGENERATE} ` +
        `The pricing page does not ship with a button that cannot take money.`,
    );
  }
  const { price, link } = found[0]!;
  if (price.currency !== 'cad' || price.interval !== interval || price.interval_count !== 1) {
    throw new Error(
      `pricing: ${where} bills ${price.currency} every ${price.interval_count} ${price.interval} — ` +
        `the page prints CAD, one ${interval} at a time`,
    );
  }
  if (!Number.isInteger(price.unit_amount) || price.unit_amount <= 0 || price.unit_amount % 100 !== 0) {
    throw new Error(
      `pricing: ${where} costs ${price.unit_amount} cents — the page prints whole dollars, ` +
        `so it would quote an amount the checkout does not charge`,
    );
  }
  if (!link.url.startsWith('https://buy.stripe.com/')) {
    throw new Error(
      `pricing: ${where} must be a https://buy.stripe.com/ payment link, got "${link.url}". ${REGENERATE}`,
    );
  }
  // A sandbox link lives on the same host, under `test_`, and takes no money
  // whatever the manifest's `livemode` says (guard 7): that flag is one line a
  // hand edit can flip, while the url is the door the buyer actually gets.
  if (link.url.startsWith('https://buy.stripe.com/test_')) {
    throw new Error(`pricing: ${where} is a sandbox payment link, "${link.url}" — it takes no money. ${REGENERATE}`);
  }
  return { amount: price.unit_amount / 100, url: link.url };
}

/** A sold tier's two rates, each with its two amounts and two doors. */
function soldRates(tier: TierKey): Record<Rate, RatePrices> {
  const prices = (rate: Rate): RatePrices => {
    const month = door(tier, rate, 'month');
    const year = door(tier, rate, 'year');
    return { monthly: month.amount, yearly: year.amount, monthlyUrl: month.url, yearlyUrl: year.url };
  };
  return { nonprofit: prices('nonprofit'), commercial: prices('commercial') };
}

/**
 * The grid, in the order a buyer meets it.
 *
 * Territoire is ABSENT and that is the decision, not an omission: a card with
 * no price and no button sells nothing and spends a quarter of the grid on a
 * way out of it. A province-wide network is a conversation, so it lives as a
 * row in the orientation table with a line to the contact page.
 */
export const TIERS: readonly Tier[] = [
  { key: 'halte', territories: 1, rates: { nonprofit: FREE, commercial: FREE } },
  { key: 'parc', territories: 3, rates: soldRates('parc') },
  { key: 'reseau', territories: 10, rates: soldRates('reseau') },
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
          `the yearly price is sold as twelve months for the price of ten, so fix the price at Stripe`,
      );
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
// page states ONE offer for every monthly button and none for the yearly ones,
// so that is what the manifest must say (trialMonthsFromManifest); the offer
// is a whole number of months within what stripe-trial.ts accepts (1-730
// days), and never ONE: the copy is written in the plural, and « 1 mois
// gratuits » is the kind of slip a buyer reads as carelessness about money.
function trialMonthsFromManifest(): number {
  const monthly = new Set(
    manifest.entries.filter((e) => e.interval === 'month').map((e) => e.link.trial_period_days),
  );
  const yearly = manifest.entries.filter(
    (e) => e.interval === 'year' && e.link.trial_period_days !== null,
  );
  if (monthly.size !== 1 || yearly.length > 0) {
    throw new Error(
      `pricing: ${MANIFEST} offers trials of [${[...monthly].join(', ')}] days across the monthly ` +
        `links and a trial on ${yearly.length} yearly link(s) — the page promises one offer on ` +
        `monthly billing only. Set it with \`./bin/snag.sh billing trial --interval month\` ` +
        `(and withdraw any yearly one), then regenerate the manifest.`,
    );
  }
  const days = [...monthly][0] ?? null;
  if (days === null) return 0;
  if (days % 30 !== 0) {
    throw new Error(
      `pricing: the monthly links offer ${days} days, which the copy cannot say in months — ` +
        `set the trial with \`billing trial --months N\` (thirty-day months), then regenerate the manifest`,
    );
  }
  return days / 30;
}
if (TRIAL_MONTHS < 0 || TRIAL_DAYS > 730) {
  throw new Error(
    `pricing: a trial of ${TRIAL_DAYS} days is outside 0 to 24 months — ` +
      `Stripe's trial on the payment links is set in days, 1 to 730`,
  );
}
if (TRIAL_MONTHS === 1) {
  throw new Error(
    `pricing: a one-month trial needs singular copy (« 1 mois gratuit », "1 month free") — ` +
      `add it to ui.ts before offering one month at Stripe`,
  );
}
for (const lang of ['fr', 'en'] as const) {
  const { trialBadge, trialNote } = ui[lang].pricing;
  if (!trialBadge.includes('{months}') || !trialNote.includes('{days}') || /\d/.test(trialBadge + trialNote)) {
    throw new Error(
      `pricing: ui.${lang}.pricing.trialBadge must carry {months} and trialNote {days}, and neither ` +
        `may hold a digit — the length of the offer comes from the manifest, through TRIAL_MONTHS`,
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

// GUARD 7 — the manifest is the grid, the whole grid and nothing else, and it
// is the live account's. Guard 2 has found one entry per door the page draws;
// an entry beyond those is a price Stripe sells that this page never shows,
// which means the grid here is the stale side. Eight rows are eight doors: one
// url behind two buttons sells one price under two labels, which snag's
// command refuses to print, so only a hand edit gets here. A sandbox manifest
// carries test links that take no money, which is guard 2's broken button by
// another road.
if (manifest.entries.length !== SOLD.length * RATES.length * INTERVALS.length) {
  throw new Error(
    `pricing: ${MANIFEST} holds ${manifest.entries.length} entries, but the grid sells ` +
      `${SOLD.length * RATES.length * INTERVALS.length} (${SOLD.map((t) => t.key).join(', ')} × ` +
      `${RATES.join('/')} × ${INTERVALS.join('/')}) — change the grid here or the prices at Stripe`,
  );
}
const urls = manifest.entries.map((e) => e.link.url);
const shared = [...new Set(urls.filter((u, i) => urls.indexOf(u) !== i))];
if (shared.length > 0) {
  throw new Error(`pricing: ${MANIFEST} puts ${shared.join(', ')} behind more than one button. ${REGENERATE}`);
}
if (manifest.livemode !== true) {
  throw new Error(`pricing: ${MANIFEST} was read with a sandbox key — its links take no money. ${REGENERATE}`);
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
