# grangerie.com

E-commerce site for **Grangerie** — deliberately unsexy, fully-covering granny
nightgowns for moms. *Comfort is the new sex. It's Grangerie.* Every order
includes a free pair of nap socks. Non-negotiable.

## Stack

- **Next.js 15** (App Router) + TypeScript + **Tailwind CSS v4**
- **Sanity v3** — CMS, embedded Studio at `/studio`
- **Shopify Storefront API** — cart + checkout (headless; Shopify owns money, tax, shipping)
- **next/image** for all imagery, **Archivo** (200/300/400) via `next/font`, **Vercel** hosting
- `design_reference/` — the HTML prototype this site ports 1:1 (design reference, not production code)

## Getting started

```sh
npm install
cp .env.example .env.local   # fill in what you have; everything degrades gracefully
npm run dev
```

The site is fully browsable with **zero** environment variables: all copy has
verbatim fallbacks (`src/lib/fallbacks.ts`) and the cart falls back to a local
demo cart. Configure services to switch on the real thing:

| Service | Env vars | What turns on |
| --- | --- | --- |
| Sanity | `NEXT_PUBLIC_SANITY_PROJECT_ID`, `SANITY_API_READ_TOKEN` | CMS-driven copy, `/studio` |
| Sanity webhook | `SANITY_REVALIDATE_SECRET` | On-demand revalidation via `/api/revalidate` |
| Shopify | `SHOPIFY_STORE_DOMAIN`, `SHOPIFY_STOREFRONT_ACCESS_TOKEN`, `SHOPIFY_NAP_SOCKS_VARIANT_ID` | Real cart + checkout |
| Klaviyo | `KLAVIYO_API_KEY`, `KLAVIYO_LIST_ID` | Newsletter storage |

## Sanity

1. `npx sanity init` (or sanity.io/manage) → create the project, dataset `production`.
2. Put the project id in `.env.local`, restart, open `/studio`.
3. Seed the prototype's real copy (uploads the three product photographs too):

   ```sh
   SANITY_API_READ_TOKEN=<editor token> npm run seed
   ```

4. Webhook for revalidation: sanity.io/manage → API → Webhooks →
   URL `https://grangerie.com/api/revalidate`, trigger on create/update/delete,
   projection `{_type, slug, handle}`, secret = `SANITY_REVALIDATE_SECRET`.

All copy renders from the CMS; `src/lib/fallbacks.ts` is the fallback and the
seed source. **The copy is verbatim by design — do not paraphrase it.**

## Shopify

1. Create the store (`grangerie.myshopify.com`), add the four products; each
   Sanity product mirrors Shopify via `shopifyProductId` (Sanity owns editorial,
   Shopify owns inventory/price/checkout). Add size options S–2X plus Granny (same measurements as L, hemmed for 4′10″ and under; the Two-Piece bottom shortens, the top stays L).
2. Create **Nap Socks — Oatmeal, One Size** and put its variant GID in
   `SHOPIFY_NAP_SOCKS_VARIANT_ID`.
3. Custom app → Storefront API token → `SHOPIFY_STOREFRONT_ACCESS_TOKEN`.
4. Deploy the free-gift Function — see `shopify/README.md`. The storefront adds
   the socks to every cart; the Function keeps them $0 **through checkout**.
5. Acceptance test: test checkout with any gown; the socks appear at $0 in the
   order summary.
6. **Promo codes**: the cart drawer applies codes from `src/lib/promo-codes.ts`
   and passes the applied code to the Shopify cart, so checkout honors it only
   if a matching discount code exists in Shopify admin. Create these as
   percentage discount codes (Admin → Discounts → Create → Discount code,
   applies to all products, no minimum, combines with the nap-socks Function):

   | Code | Percent |
   | --- | --- |
   | HESFINE | 10% |
   | ASKINGFORME | 10% |
   | THESIGNAL | 15% |
   | NOTTONIGHT | 15% |
   | GOODNIGHT | 10% |
   | LAMPTESTED | 12% |
   | GRANDMASRIGHT | 20% |
   | ANNIVERSARY | 14% |
   | FLATTERINGTOWHO | 15% |
   | SLEEVEOFCRACKERS | 10% |
   | HISCARDACTUALLY | 5% |
   | SOCKSPLEASE | 0% (yes, zero — if Shopify refuses a 0% code, skip it; the cart already treats it as decorative) |

   GOODNIGHT's before-9-p.m. rule is enforced by our cart in the customer's
   local time; the Shopify admin code itself stays a plain always-on 10%
   (Shopify cannot see the customer's clock). One code per order — leave
   "combines with other discount codes" off.

Cart id lives in an httpOnly cookie; mutations are server actions
(`src/lib/cart-actions.ts`). The socks line cannot be removed. We made them
optional for eleven days in the spring and people chose wrong, so that is over now.

## Deployment (Vercel)

1. Import the GitHub repo into Vercel; set the env vars from `.env.example`.
2. Preview deploys per PR; production on `main`. Analytics + Speed Insights are
   already wired (`@vercel/analytics`, `@vercel/speed-insights`).

## Domain registration & DNS runbook

1. Register **grangerie.com** at Cloudflare Registrar (at-cost, free WHOIS
   privacy) or Namecheap. Buy 2 years; enable auto-renew and registrar lock.
   Grab `grangerie.co` and `grangerie.shop` as defensive redirects if cheap.
2. Nameservers → Cloudflare (free plan). Records:
   - `A @ 76.76.21.21` (Vercel apex — confirm the current value in Vercel)
   - `CNAME www cname.vercel-dns.com`
   - Proxy status **DNS only** for both (Vercel terminates TLS itself)
   - `TXT @ "v=spf1 include:_spf.google.com ~all"`, DKIM from your mail
     provider, `TXT _dmarc "v=DMARC1; p=quarantine; rua=mailto:dmarc@grangerie.com"`
   - `CAA 0 issue "letsencrypt.org"`
3. Vercel → Project → Domains: add `grangerie.com` + `www.grangerie.com`, apex
   primary, 308 www → apex. Verify the certificate issues before announcing.
4. Mail: `hello@grangerie.com` on Google Workspace or Fastmail; `orders@` as an
   alias for Shopify.

## Accessibility & performance

- Hero modal: focus trap, `role="dialog"` / `aria-modal`, Escape closes, focus
  returns; dismissal in `sessionStorage`. Cart drawer: same treatment.
- Hero video: `autoplay muted loop playsinline`, poster always set,
  `prefers-reduced-motion` swaps to the still, `<source>` only when a file exists.
- Focus rings: `2px solid #ec3013`, offset 2px — never the browser default.
- LCP is the hero poster (`priority` + `fetchPriority=high`); AVIF/WebP via
  next/image. Zero border radius anywhere. No shadows except the glass cards.

## Assets

- `public/img/` — the three real product photographs (No. 1, Housecoat, Two-Piece).
  Everything else is placeholder stock from the prototype; replace via Sanity.
- The hero expects `hero.mp4` (8–12s seamless loop, muted), uploaded to the
  campaign document in Sanity. It is intentionally absent; the poster still
  carries the section until it exists.
