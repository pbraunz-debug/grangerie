'use server'

/**
 * Cart server actions. Shopify Storefront cart when configured (cart id in an
 * httpOnly cookie); otherwise a local demo cart in an httpOnly cookie so the
 * drawer works before the store exists. Either way, the free nap socks are on
 * every cart and cannot be removed.
 */
import {cookies} from 'next/headers'

import {getProductByHandle} from './content'
import {
  INVALID_CODE_MESSAGE,
  normalizeCode,
  PROMO_CODES,
  REPLACED_CODE_MESSAGE,
} from './promo-codes'
import {
  addCartLines,
  type Cart,
  type CartLine,
  createCart,
  getCart,
  NAP_SOCKS_TITLE,
  removeCartLine,
  resolveVariantId,
  shopifyConfigured,
  updateCartDiscountCodes,
  updateCartLine,
} from './shopify'

const CART_ID_COOKIE = 'cartId'
const DEMO_CART_COOKIE = 'demo_cart'
const COOKIE_OPTS = {
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: 60 * 60 * 24 * 30,
} as const

const GIFT_LINE: CartLine = {
  id: 'gift-nap-socks',
  title: NAP_SOCKS_TITLE,
  quantity: 1,
  price: 0,
  isGift: true,
}

// ---------------------------------------------------------------------------
// Demo cart (no Shopify yet)
// ---------------------------------------------------------------------------

interface DemoLine {
  id: string // `${handle}|${size}`
  handle: string
  title: string
  size: string
  quantity: number
  price: number
  imageUrl?: string
}

async function readDemoCart(): Promise<DemoLine[]> {
  const jar = await cookies()
  const raw = jar.get(DEMO_CART_COOKIE)?.value
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw) as DemoLine[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

async function writeDemoCart(lines: DemoLine[]) {
  const jar = await cookies()
  jar.set(DEMO_CART_COOKIE, JSON.stringify(lines), COOKIE_OPTS)
}

function demoToCart(lines: DemoLine[]): Cart {
  const cartLines: CartLine[] = lines.map((l) => ({
    id: l.id,
    title: l.title,
    variantTitle: l.size,
    quantity: l.quantity,
    price: l.price,
    imageUrl: l.imageUrl,
  }))
  return {
    lines: [...cartLines, GIFT_LINE],
    subtotal: cartLines.reduce((sum, l) => sum + l.price * l.quantity, 0),
  }
}

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

function withGift(cart: Cart): Cart {
  // The drawer always lists the socks at $0, even before Shopify has attached
  // its own line. "You did not ask for them. They are in the box."
  return cart.lines.some((l) => l.isGift) ? cart : {...cart, lines: [...cart.lines, GIFT_LINE]}
}

const PROMO_COOKIE = 'promo_code'

/** Decorate a cart with the persisted promo: discount on the garment subtotal, before shipping/tax. */
async function withPromo(cart: Cart): Promise<Cart> {
  const jar = await cookies()
  const code = jar.get(PROMO_COOKIE)?.value
  const entry = code ? PROMO_CODES[code] : undefined
  if (!code || !entry) return cart
  const garmentSubtotal = cart.lines
    .filter((l) => !l.isGift)
    .reduce((sum, l) => sum + l.price * l.quantity, 0)
  const discountAmount = Math.round(garmentSubtotal * entry.percent) / 100
  return {
    ...cart,
    promo: {code, percent: entry.percent, message: entry.message, discountAmount},
    total: Math.round((garmentSubtotal - discountAmount) * 100) / 100,
  }
}

async function finalize(cart: Cart): Promise<Cart> {
  return withPromo(withGift(cart))
}

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

export async function getCartAction(): Promise<Cart> {
  if (!shopifyConfigured) return finalize(demoToCart(await readDemoCart()))
  const jar = await cookies()
  const cartId = jar.get(CART_ID_COOKIE)?.value
  if (!cartId) return finalize({lines: [], subtotal: 0})
  try {
    const cart = await getCart(cartId)
    return finalize(cart ?? {lines: [], subtotal: 0})
  } catch {
    return finalize({lines: [], subtotal: 0})
  }
}

export async function addToCartAction(
  handle: string,
  size: string,
  quantity: number,
): Promise<Cart> {
  const qty = Math.max(1, Math.min(10, Math.floor(quantity) || 1))

  if (!shopifyConfigured) {
    const product = await getProductByHandle(handle)
    if (!product) return demoToCart(await readDemoCart())
    const lines = await readDemoCart()
    const id = `${handle}|${size}`
    const existing = lines.find((l) => l.id === id)
    if (existing) existing.quantity = Math.min(10, existing.quantity + qty)
    else
      lines.push({
        id,
        handle,
        title: product.title,
        size,
        quantity: qty,
        price: product.price,
        imageUrl: product.images[0]?.url,
      })
    await writeDemoCart(lines)
    return finalize(demoToCart(lines))
  }

  const product = await getProductByHandle(handle)
  if (!product?.shopifyProductId) return getCartAction()
  const variantId = await resolveVariantId(product.shopifyProductId, size)
  if (!variantId) return getCartAction()

  const jar = await cookies()
  const cartId = jar.get(CART_ID_COOKIE)?.value
  let cart: Cart
  if (cartId) {
    try {
      cart = await addCartLines(cartId, [{merchandiseId: variantId, quantity: qty}])
    } catch {
      cart = await createCart([{merchandiseId: variantId, quantity: qty}])
    }
  } else {
    cart = await createCart([{merchandiseId: variantId, quantity: qty}])
  }
  if (cart.id) jar.set(CART_ID_COOKIE, cart.id, COOKIE_OPTS)
  return finalize(cart)
}

export async function updateLineAction(lineId: string, quantity: number): Promise<Cart> {
  if (lineId === GIFT_LINE.id) return getCartAction() // the socks are not up for discussion

  if (!shopifyConfigured) {
    let lines = await readDemoCart()
    if (quantity <= 0) lines = lines.filter((l) => l.id !== lineId)
    else {
      const line = lines.find((l) => l.id === lineId)
      if (line) line.quantity = Math.min(10, Math.floor(quantity))
    }
    await writeDemoCart(lines)
    return finalize(demoToCart(lines))
  }

  const jar = await cookies()
  const cartId = jar.get(CART_ID_COOKIE)?.value
  if (!cartId) return getCartAction()
  try {
    const cart =
      quantity <= 0
        ? await removeCartLine(cartId, lineId)
        : await updateCartLine(cartId, lineId, Math.min(10, Math.floor(quantity)))
    return finalize(cart)
  } catch {
    return getCartAction()
  }
}

// ---------------------------------------------------------------------------
// Promo codes — one per order; the message is delivered as settled fact
// ---------------------------------------------------------------------------

export interface PromoResult {
  cart: Cart
  status: 'applied' | 'replaced' | 'invalid' | 'rejected'
  message: string
}

/**
 * Apply a promo code. `localHour` is the customer's local hour (0–23) from the
 * browser — GOODNIGHT keeps local bedtime, not server bedtime.
 */
export async function applyPromoAction(rawCode: string, localHour: number): Promise<PromoResult> {
  const code = normalizeCode(rawCode)
  const entry = PROMO_CODES[code]
  const jar = await cookies()

  if (!entry) {
    return {cart: await getCartAction(), status: 'invalid', message: INVALID_CODE_MESSAGE}
  }

  const hour = Number.isFinite(localHour) ? Math.min(23, Math.max(0, Math.floor(localHour))) : 12
  const rejection = entry.validate?.({localHour: hour})
  if (rejection) {
    return {cart: await getCartAction(), status: 'rejected', message: rejection}
  }

  const previous = jar.get(PROMO_COOKIE)?.value
  const replaced = Boolean(previous && previous !== code && PROMO_CODES[previous])
  jar.set(PROMO_COOKIE, code, COOKIE_OPTS)

  if (shopifyConfigured) {
    const cartId = jar.get(CART_ID_COOKIE)?.value
    if (cartId) {
      try {
        await updateCartDiscountCodes(cartId, [code])
      } catch {
        // The drawer still shows the discount; Shopify applies it again at
        // checkout once the matching admin code exists.
      }
    }
  }

  return {
    cart: await getCartAction(),
    status: replaced ? 'replaced' : 'applied',
    message: replaced ? REPLACED_CODE_MESSAGE : entry.message,
  }
}

export async function removePromoAction(): Promise<Cart> {
  const jar = await cookies()
  jar.delete(PROMO_COOKIE)
  if (shopifyConfigured) {
    const cartId = jar.get(CART_ID_COOKIE)?.value
    if (cartId) {
      try {
        await updateCartDiscountCodes(cartId, [])
      } catch {
        // cleared locally either way
      }
    }
  }
  return getCartAction()
}
