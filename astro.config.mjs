// Astro configuration for the TrailSnag marketing site (F11).
// Static output, deployed to GitHub Pages by .github/workflows/deploy.yml.

import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Canonical URLs, sitemap entries, and OG metadata derive from `site`.
// Once trailsnag.com DNS points at GitHub Pages, set SITE_URL=https://trailsnag.com
// in the deploy workflow (and add public/CNAME) — no other change needed.
const site = process.env.SITE_URL ?? 'https://trailsnag.github.io';

export default defineConfig({
  site,
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'fr',
        locales: { fr: 'fr-CA', en: 'en-CA' },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
