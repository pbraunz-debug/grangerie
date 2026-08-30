'use client'

import {createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode} from 'react'

import {
  addToCartAction,
  applyPromoAction,
  getCartAction,
  type PromoResult,
  removePromoAction,
  updateLineAction,
} from '@/lib/cart-actions'
import type {Cart} from '@/lib/shopify'

interface CartContextValue {
  cart: Cart
  open: boolean
  pending: boolean
  openCart: () => void
  closeCart: () => void
  addToCart: (handle: string, size: string, quantity: number) => Promise<void>
  updateLine: (lineId: string, quantity: number) => Promise<void>
  applyPromo: (code: string) => Promise<PromoResult>
  removePromo: () => Promise<void>
}

const EMPTY_CART: Cart = {lines: [], subtotal: 0}

const CartContext = createContext<CartContextValue | null>(null)

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

export function CartProvider({children}: {children: ReactNode}) {
  const [cart, setCart] = useState<Cart>(EMPTY_CART)
  const [open, setOpen] = useState(false)
  const [pending, setPending] = useState(false)
  const loaded = useRef(false)

  useEffect(() => {
    if (loaded.current) return
    loaded.current = true
    getCartAction().then(setCart).catch(() => {})
  }, [])

  const openCart = useCallback(() => setOpen(true), [])
  const closeCart = useCallback(() => setOpen(false), [])

  const addToCart = useCallback(async (handle: string, size: string, quantity: number) => {
    setPending(true)
    try {
      const next = await addToCartAction(handle, size, quantity)
      setCart(next)
      setOpen(true)
    } finally {
      setPending(false)
    }
  }, [])

  const updateLine = useCallback(async (lineId: string, quantity: number) => {
    setPending(true)
    try {
      const next = await updateLineAction(lineId, quantity)
      setCart(next)
    } finally {
      setPending(false)
    }
  }, [])

  const applyPromo = useCallback(async (code: string) => {
    setPending(true)
    try {
      const result = await applyPromoAction(code, new Date().getHours())
      setCart(result.cart)
      return result
    } finally {
      setPending(false)
    }
  }, [])

  const removePromo = useCallback(async () => {
    setPending(true)
    try {
      setCart(await removePromoAction())
    } finally {
      setPending(false)
    }
  }, [])

  return (
    <CartContext.Provider
      value={{cart, open, pending, openCart, closeCart, addToCart, updateLine, applyPromo, removePromo}}
    >
      {children}
    </CartContext.Provider>
  )
}
