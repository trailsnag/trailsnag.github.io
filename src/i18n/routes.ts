// Route pairs between the two locales. French lives at the root (default
// locale, unprefixed); English under /en/. The language switch and hreflang
// alternates both derive from this single table.

export type Lang = 'fr' | 'en';

export const routePairs: ReadonlyArray<{ fr: string; en: string }> = [
  { fr: '/', en: '/en/' },
  // Named for the surface, not the audience: the header already carries a
  // « Gestionnaires » button that opens the APP, and two doors with one word
  // is a door nobody trusts. The page's own title is « Le tableau de bord ».
  { fr: '/tableau-de-bord/', en: '/en/steward-desk/' },
  // The competitive comparison. Named for what it is in each language rather
  // than transliterated: « comparatif » is the word a Québec buyer types.
  { fr: '/comparatif/', en: '/en/comparison/' },
  // The prices, and the door that takes money. « Tarifs » rather than « Prix »
  // is the word a Québec organisation uses for a published rate card.
  { fr: '/tarifs/', en: '/en/pricing/' },
  { fr: '/confidentialite/', en: '/en/privacy/' },
  { fr: '/conditions/', en: '/en/terms/' },
  { fr: '/contact/', en: '/en/contact/' },
];

/** The competitive comparison, linked from the footer and the landing. */
export function comparisonPath(lang: Lang): string {
  return lang === 'fr' ? '/comparatif/' : '/en/comparison/';
}

/** The prices. Linked from the header, the footer, and the landing band. */
export function pricingPath(lang: Lang): string {
  return lang === 'fr' ? '/tarifs/' : '/en/pricing/';
}

/** Where a buyer writes when a tier is quoted rather than sold by the card. */
export function contactPath(lang: Lang): string {
  return lang === 'fr' ? '/contact/' : '/en/contact/';
}

/** The steward tour, linked from the landing band. */
export function stewardTourPath(lang: Lang): string {
  return lang === 'fr' ? '/tableau-de-bord/' : '/en/steward-desk/';
}

const normalize = (path: string): string => (path.endsWith('/') ? path : `${path}/`);

/** The same page in the other locale; falls back to that locale's home. */
export function alternatePath(currentPath: string, target: Lang): string {
  const path = normalize(currentPath);
  const pair = routePairs.find((p) => p.fr === path || p.en === path);
  return pair ? pair[target] : target === 'fr' ? '/' : '/en/';
}

export function langFromPath(path: string): Lang {
  return normalize(path) === '/en/' || normalize(path).startsWith('/en/') ? 'en' : 'fr';
}
