# `stripe-manifest.json` — what the payment links charge

The pricing page prints its amounts, its eight buy buttons and its launch trial
from this file, through `src/lib/pricing.ts`. **Do not edit it by hand.** It is
printed by the snag operator shell, which reads Stripe:

```bash
# in the snag checkout, with the production Stripe key and the sixteen
# STRIPE_PRICE_* / STRIPE_CHECKOUT_* values the API runs with
./bin/snag.sh billing manifest > <this checkout>/src/data/stripe-manifest.json
```

Then commit it here and push `main`, which deploys. Do this after **any**
change at Stripe: a new or replaced payment link, a new price, or a trial moved
by `./bin/snag.sh billing trial --apply` (that command prints this reminder).
If nothing changed at Stripe, the file comes out byte for byte the same and
there is nothing to commit.

For each of the eight catalog rows (tier × rate × interval) the command follows
the API's own configuration: the `STRIPE_CHECKOUT_*` URL to the live payment
link (`link.url`, and `link.trial_period_days` for the trial), the link's single
line item to the price it sells, and that price's `unit_amount` (in cents),
`currency` and interval. It refuses, printing nothing, when a link sells a price
other than the matching `STRIPE_PRICE_*`, when a configured link is not live,
or when a price bills on the wrong interval. The file carries only public facts:
no key and no price, link or account id.

The build refuses a manifest that does not fit the grid the page prints
(`src/lib/pricing.ts`): a sandbox manifest, a missing or doubled row, a row the
grid does not sell, a currency other than CAD, an amount with cents, a yearly
price that is not ten months of the monthly one, a trial that differs between
the monthly links, any trial on a yearly link, or a trial that is not a whole
number of 30-day months. A failed redirected run leaves this file empty, and
the build refuses that too; `git checkout src/data/stripe-manifest.json`
restores the last good one.

## The first version was transcribed, not read

The file as first committed was **not** produced by the command above: it was
written by hand from the values `src/lib/pricing.ts` held on 2026-09-25
(`2cb94fd`), in the format the command prints, by someone who could not reach
Stripe. It carries exactly what the page already said — 79 / 109 / 129 / 169 CAD
a month, ten months for a year, the same eight links, 60 days on the monthly
links and none on the yearly ones — so nothing on the page changed (the built
HTML of all fifteen pages is byte for byte what it was). It is also byte for
byte what the command prints for an account holding exactly those values,
checked by running the command's own reading and rendering code over them. But
until the command has been run once against the live account and its output
committed here, this file is still a copy nobody has checked against Stripe.
