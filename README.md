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

## Custom domain (trailsnag.com)

Live since 2026-07-18. The pieces, should any of them ever need to be rebuilt:

- Namecheap DNS: four apex `A` records → `185.199.108–111.153` (plus the matching
  `2606:50c0:800x::153` AAAA records), `CNAME` on `www` → `trailsnag.github.io`, and
  Mail Settings on Email Forwarding (`bonjour@trailsnag.com` forwards via
  `eforward*.registrar-servers.com`).
- Repo settings → Pages → custom domain `trailsnag.com`, HTTPS enforced. No `CNAME`
  file in `public/` — workflow-built Pages ignores it; the domain lives in repo
  settings.
- Canonical URLs come from `SITE_URL: https://trailsnag.com` in the deploy workflow
  env; `public/robots.txt` points at the same host.
