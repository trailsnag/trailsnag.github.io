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

## Prices, payment links and the launch trial

`/tarifs/` and `/en/pricing/` print every amount, all eight buy buttons and the
trial from `src/data/stripe-manifest.json`, through `src/lib/pricing.ts`. None
of them is typed anywhere in this repository, and the file is **never edited by
hand**: Stripe is the authority, and snag's `billing manifest` command reads it
there, on the API's own Fly machine, following the payment links and prices the
API itself is configured with. After **any** change at Stripe or to the API's
`STRIPE_*` secrets — a new or replaced payment link, a new price, a trial moved
by `./bin/snag.sh billing trial --apply` (which prints this same reminder):

```bash
fly ssh console -a snag-api --process-group webhooks -q \
  -C "node /app/dist/ops/cli.js billing manifest" > /tmp/stripe-manifest.json \
  && mv /tmp/stripe-manifest.json <this checkout>/src/data/stripe-manifest.json
# here: commit that file and push main, which deploys
```

An unchanged account prints an unchanged file. The build refuses a manifest
that does not fit the grid the page prints — a sandbox key, a missing, doubled
or extra row, a link that is not on `buy.stripe.com` or that serves two rows, a
currency other than CAD, an amount with cents, a yearly price that is not ten
months of the monthly one, a trial that differs between the monthly links or
appears on a yearly one — and an empty file too. `src/data/README.md` has the
details, and says which version of the file was transcribed rather than read
from Stripe.

## Product screenshots

The steward screens on `/` and `/tableau-de-bord/` (`/en/steward-desk/`) are
**photographs of the running product**, not mockups. They are produced in the
`trailsnag/snag` monorepo, which drives the real desk in Chromium against a
fictional showcase org, and imported here:

```bash
# in the product repo
pnpm --filter @snag/api seed:showcase && pnpm -r build && pnpm capture:screens
# here
node scripts/import-screens.mjs ../obstaque     # or a worktree path
```

The import refuses anything the site could not honestly publish: captures taken
on a dirty tree (unreproducible from their commit), a file whose bytes no longer
match the sha the capture run recorded, a missing locale, an org name without
the fictional-org marker, or a screen the capture run marked unpublishable. It
also deletes images that left the catalog, so a renamed screen cannot leave its
predecessor behind.

`src/assets/screens/manifest.json` travels with the images and records the app
commit each was taken from — that is how you tell a screenshot that is merely
*old* from one that is *stale*. **Re-import after any change to the desk's
chrome**; nothing here will notice on its own.

One screen is deliberately absent. The desk's sticker page prints
`window.location.origin` into every card — correct, since a printed QR must
carry the origin the org actually uses — so a captured one reads
`http://localhost:<port>`. `QrSticker.astro` already shows a real sticker
pointing at the real app.

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
