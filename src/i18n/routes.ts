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
  { fr: '/confidentialite/', en: '/en/privacy/' },
  { fr: '/conditions/', en: '/en/terms/' },
  { fr: '/contact/', en: '/en/contact/' },
];

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
