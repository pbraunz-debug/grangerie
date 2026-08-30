/**
 * Shopify Storefront API client (headless: Shopify owns money, tax, shipping).
 * When SHOPIFY_STOREFRONT_ACCESS_TOKEN is unset the cart layer falls back to a
 * local demo cart (see cart-actions.ts) so the site works before the store exists.
 */

const domain = process.env.SHOPIFY_STORE_DOMAIN
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN
const apiVersion = process.env.SHOPIFY_STOREFRONT_API_VERSION || '2025-01'

export const shopifyConfigured = Boolean(domain && token)

export const NAP_SOCKS_TITLE = 'Nap Socks — Oatmeal, One Size'
export const NAP_SOCKS_VARIANT_ID = process.env.SHOPIFY_NAP_SOCKS_VARIANT_ID

export interface CartLine {
  id: string
  title: string
  variantTitle?: string
  quantity: number
  /** unit price in dollars */
  price: number
  imageUrl?: string
  isGift?: boolean
}

export interface Cart {
  id?: string
  lines: CartLine[]
  subtotal: number
  checkoutUrl?: string
}

async function shopifyFetch<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  if (!shopifyConfigured) throw new Error('Shopify is not configured')
  const res = await fetch(`https://${domain}/api/${apiVersion}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token as string,
    },
    body: JSON.stringify({query, variables}),
    cache: 'no-store',
  })
  const json = (await res.json()) as {data?: T; errors?: {message: string}[]}
  if (json.errors?.length) throw new Error(json.errors.map((e) => e.message).join('; '))
  if (!json.data) throw new Error('Empty Shopify response')
  return json.data
}

const CART_FRAGMENT = /* GraphQL */ `
  fragment CartFields on Cart {
    id
    checkoutUrl
    cost {
      subtotalAmount {
        amount
      }
    }
    lines(first: 50) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              price {
                amount
              }
              image {
                url
              }
              product {
                title
              }
            }
          }
        }
      }
    }
  }
`

interface ShopifyCart {
  id: string
  checkoutUrl: string
  cost: {subtotalAmount: {amount: string}}
  lines: {
    edges: {
      node: {
        id: string
        quantity: number
        merchandise: {
          id: string
          title: string
          price: {amount: string}
          image?: {url: string}
          product: {title: string}
        }
      }
    }[]
  }
}

function normalizeCart(cart: ShopifyCart): Cart {
  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    subtotal: Number(cart.cost.subtotalAmount.amount),
    lines: cart.lines.edges.map(({node}) => {
      const isGift =
        node.merchandise.product.title === NAP_SOCKS_TITLE ||
        node.merchandise.id === NAP_SOCKS_VARIANT_ID
      return {
        id: node.id,
        title: node.merchandise.product.title,
        variantTitle: node.merchandise.title === 'Default Title' ? undefined : node.merchandise.title,
        quantity: node.quantity,
        price: isGift ? 0 : Number(node.merchandise.price.amount),
        imageUrl: node.merchandise.image?.url,
        isGift,
      }
    }),
  }
}

export async function createCart(lines: {merchandiseId: string; quantity: number}[]): Promise<Cart> {
  // Every cart gets the nap socks. Non-negotiable. The Shopify Function keeps
  // them free through checkout; this keeps them visible in the cart itself.
  const withSocks = NAP_SOCKS_VARIANT_ID
    ? [...lines, {merchandiseId: NAP_SOCKS_VARIANT_ID, quantity: 1}]
    : lines
  const data = await shopifyFetch<{cartCreate: {cart: ShopifyCart}}>(
    /* GraphQL */ `
      mutation CartCreate($input: CartInput!) {
        cartCreate(input: $input) {
          cart {
            ...CartFields
          }
        }
      }
      ${CART_FRAGMENT}
    `,
    {input: {lines: withSocks}},
  )
  return normalizeCart(data.cartCreate.cart)
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const data = await shopifyFetch<{cart: ShopifyCart | null}>(
    /* GraphQL */ `
      query GetCart($cartId: ID!) {
        cart(id: $cartId) {
          ...CartFields
        }
      }
      ${CART_FRAGMENT}
    `,
    {cartId},
  )
  return data.cart ? normalizeCart(data.cart) : null
}

export async function addCartLines(
  cartId: string,
  lines: {merchandiseId: string; quantity: number}[],
): Promise<Cart> {
  const data = await shopifyFetch<{cartLinesAdd: {cart: ShopifyCart}}>(
    /* GraphQL */ `
      mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart {
            ...CartFields
          }
        }
      }
      ${CART_FRAGMENT}
    `,
    {cartId, lines},
  )
  return normalizeCart(data.cartLinesAdd.cart)
}

export async function updateCartLine(cartId: string, lineId: string, quantity: number): Promise<Cart> {
  const data = await shopifyFetch<{cartLinesUpdate: {cart: ShopifyCart}}>(
    /* GraphQL */ `
      mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart {
            ...CartFields
          }
        }
      }
      ${CART_FRAGMENT}
    `,
    {cartId, lines: [{id: lineId, quantity}]},
  )
  return normalizeCart(data.cartLinesUpdate.cart)
}

export async function removeCartLine(cartId: string, lineId: string): Promise<Cart> {
  const data = await shopifyFetch<{cartLinesRemove: {cart: ShopifyCart}}>(
    /* GraphQL */ `
      mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
        cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
          cart {
            ...CartFields
          }
        }
      }
      ${CART_FRAGMENT}
    `,
    {cartId, lineIds: [lineId]},
  )
  return normalizeCart(data.cartLinesRemove.cart)
}

/** Resolve the variant id for a Shopify product + size option. */
export async function resolveVariantId(shopifyProductId: string, size: string): Promise<string | null> {
  const data = await shopifyFetch<{
    product: {
      variants: {
        edges: {node: {id: string; selectedOptions: {name: string; value: string}[]}}[]
      }
    } | null
  }>(
    /* GraphQL */ `
      query ProductVariants($id: ID!) {
        product(id: $id) {
          variants(first: 50) {
            edges {
              node {
                id
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
        }
      }
    `,
    {id: shopifyProductId},
  )
  const edges = data.product?.variants.edges ?? []
  const match = edges.find(({node}) =>
    node.selectedOptions.some((o) => o.name.toLowerCase() === 'size' && o.value === size),
  )
  return match?.node.id ?? edges[0]?.node.id ?? null
}
