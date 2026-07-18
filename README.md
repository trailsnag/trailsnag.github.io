# TrailSnag website

The public marketing site for [TrailSnag](https://trailsnag.app) (PRD F11): French first at `/`,
English at `/en/`. Static Astro site, deployed to GitHub Pages on every push to `main`.

The app lives in the `trailsnag/snag` monorepo; this repo is only the front door.

## Stack

- **Astro 5** (static output) with built-in i18n — `fr` default unprefixed, `en` prefixed.
- **Tailwind CSS 4** carrying the **Trail Sign** design system (tokens mirrored from
  `apps/web/app/globals.css` in the monorepo; source of truth is the vault note
  "Snag Design System & Brand Proposal v1").
- Copy parity is compiler-enforced: `src/i18n/ui.ts` types `en` against `fr`.
- The hero QR code is generated at build time and opens the real app.

## Commands

pnpm only (same doctrine as the monorepo).

| Command | What it does |
| --- | --- |
| `pnpm install` | Install dependencies |
| `pnpm dev` | Dev server on `localhost:4321` |
| `pnpm build` | Static build into `dist/` |
| `pnpm preview` | Serve the built `dist/` locally |
| `pnpm check` | Astro + TypeScript diagnostics |

## Deploy

`.github/workflows/deploy.yml` builds with `withastro/action` and publishes via
`actions/deploy-pages`. No secrets involved.

## Go-live checklist (trailsnag.com)

The site serves from `https://trailsnag.github.io` until DNS is switched. To move to
`trailsnag.com`:

1. Namecheap DNS: `A` records on the apex → `185.199.108.153`, `185.199.109.153`,
   `185.199.110.153`, `185.199.111.153`; `CNAME` on `www` → `trailsnag.github.io`.
2. Repo settings → Pages → custom domain `trailsnag.com`, then enforce HTTPS once the
   certificate is issued.
3. Add `public/CNAME` containing `trailsnag.com`, set `SITE_URL: https://trailsnag.com` in
   the deploy workflow env, and update the `Sitemap:` URL in `public/robots.txt`.
4. Namecheap email forwarding: `bonjour@trailsnag.com` → a real inbox (the site and both
   legal pages advertise this address).
