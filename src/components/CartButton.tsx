'use client'

import {useCart} from './CartProvider'

export function CartButton() {
  const {cart, openCart} = useCart()
  const count = cart.lines.filter((l) => !l.isGift).reduce((sum, l) => sum + l.quantity, 0)
  return (
    <button
      type="button"
      onClick={openCart}
      className="gr-btn"
      aria-label={`Open cart, ${count} item${count === 1 ? '' : 's'}`}
      style={{
        padding: '12px 18px',
        border: '1px solid rgba(32,30,29,0.22)',
        background: 'transparent',
        color: '#201e1d',
      }}
    >
      Cart{count > 0 ? ` (${count})` : ''}
    </button>
  )
}
