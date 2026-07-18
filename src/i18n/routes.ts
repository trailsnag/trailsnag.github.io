// Route pairs between the two locales. French lives at the root (default
// locale, unprefixed); English under /en/. The language switch and hreflang
// alternates both derive from this single table.

export type Lang = 'fr' | 'en';

export const routePairs: ReadonlyArray<{ fr: string; en: string }> = [
  { fr: '/', en: '/en/' },
  { fr: '/confidentialite/', en: '/en/privacy/' },
  { fr: '/conditions/', en: '/en/terms/' },
  { fr: '/contact/', en: '/en/contact/' },
];

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
