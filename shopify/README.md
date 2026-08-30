# Grangerie — Shopify app (free nap socks)

This folder holds the Shopify Function that makes the nap socks free **through
checkout**, so the gift survives past the storefront cart.

## How the free gift works, end to end

1. The storefront (`src/lib/cart-actions.ts`) adds one
   **Nap Socks — Oatmeal, One Size** (`SHOPIFY_NAP_SOCKS_VARIANT_ID`) to every
   cart it creates. The customer cannot remove it — the drawer offers no
   control for that line, and the update action refuses it.
2. The `free-nap-socks` discount Function (this folder) prices that line at
   $0 at checkout, whatever the variant's list price is. Shopify owns money,
   tax and shipping; the Function guarantees the socks never cost anything.

## Setup (one time)

1. In the Shopify admin of `grangerie.myshopify.com`, create the product
   **Nap Socks — Oatmeal, One Size** (single variant, any list price — the
   Function zeroes it). Put its variant GID in `SHOPIFY_NAP_SOCKS_VARIANT_ID`.
2. Create a Shopify app with the CLI and copy this extension in:

   ```sh
   npm init @shopify/app@latest -- --name grangerie-functions
   cd grangerie-functions
   cp -r ../shopify/extensions/free-nap-socks extensions/
   cd extensions/free-nap-socks && npm install && cd ../..
   shopify app deploy
   ```

3. In Admin → Discounts, create the discount from the deployed Function and
   set it to **automatic** with no end date.
4. Run a test checkout: any gown + the socks line, socks at $0 in the order
   summary. That is the acceptance test.
