'use client'

import {useState} from 'react'

import type {Product} from '@/lib/content-types'
import {useCart} from './CartProvider'

export function BuyBox({product, socksLine}: {product: Product; socksLine: string}) {
  const {addToCart, pending} = useCart()
  const [size, setSize] = useState(product.sizes[Math.floor(product.sizes.length / 2)] ?? product.sizes[0])
  const [quantity, setQuantity] = useState(1)

  return (
    <div>
      <fieldset style={{border: 0, padding: 0, margin: 0}}>
        <legend className="gr-label" style={{color: 'rgba(32,30,29,0.55)', marginBottom: 14, padding: 0}}>
          Size
        </legend>
        <div style={{display: 'flex', gap: 10, flexWrap: 'wrap'}}>
          {product.sizes.map((s) => (
            <label
              key={s}
              style={{
                display: 'grid',
                placeItems: 'center',
                minWidth: 52,
                padding: '13px 10px',
                border: s === size ? '1px solid #201e1d' : '1px solid rgba(32,30,29,0.22)',
                background: s === size ? '#201e1d' : 'transparent',
                color: s === size ? '#fff' : '#201e1d',
                fontSize: 12,
                letterSpacing: '0.14em',
                cursor: 'pointer',
              }}
            >
              <input
                type="radio"
                name="size"
                value={s}
                checked={s === size}
                onChange={() => setSize(s)}
                style={{position: 'absolute', opacity: 0, pointerEvents: 'none'}}
              />
              {s}
            </label>
          ))}
        </div>
      </fieldset>
      {size === 'Granny' && (
        <p style={{fontSize: 13, lineHeight: '22px', color: 'var(--ink-65)', margin: '14px 0 0', maxWidth: '46ch'}}>
          Granny is a size L, hemmed for women 4′10″ and under. Same cotton, same pockets, same
          everything — the hem simply meets the ankle where the ankle actually is. We do not
          consider this a special size. We consider it the ankle rule, honored.
        </p>
      )}

      <div style={{display: 'flex', alignItems: 'center', gap: 14, marginTop: 26}}>
        <span className="gr-label" style={{color: 'rgba(32,30,29,0.55)'}}>
          Quantity
        </span>
        <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            style={qtyBtn}
          >
            &minus;
          </button>
          <span style={{fontSize: 14, minWidth: 18, textAlign: 'center'}}>{quantity}</span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQuantity((q) => Math.min(10, q + 1))}
            style={qtyBtn}
          >
            +
          </button>
        </div>
      </div>

      <button
        type="button"
        disabled={pending || !product.inStock}
        onClick={() => addToCart(product.handle, size, quantity)}
        className="gr-btn gr-btn-primary"
        style={{display: 'block', width: '100%', marginTop: 30, opacity: product.inStock ? 1 : 0.4}}
      >
        {product.inStock ? (pending ? 'Adding…' : `Add to cart — $${product.price * quantity}`) : 'Out of stock'}
      </button>

      {/* Not a checkbox. It will never be a checkbox. */}
      <p
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: 10,
          fontSize: 13.5,
          lineHeight: '24px',
          color: 'var(--ink-65)',
          margin: '18px 0 0',
        }}
      >
        <span aria-hidden="true" style={{color: '#ec3013', fontSize: 11, letterSpacing: '0.2em'}}>
          ●
        </span>
        {socksLine}
      </p>
    </div>
  )
}

const qtyBtn: React.CSSProperties = {
  width: 30,
  height: 30,
  display: 'grid',
  placeItems: 'center',
  background: 'transparent',
  border: '1px solid rgba(32,30,29,0.2)',
  color: '#201e1d',
  fontSize: 14,
  lineHeight: 1,
  cursor: 'pointer',
  fontFamily: 'inherit',
}
