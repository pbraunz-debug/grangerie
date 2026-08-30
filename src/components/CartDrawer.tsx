'use client'

import Image from 'next/image'
import {useEffect, useRef} from 'react'

import {useCart} from './CartProvider'

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'

export function CartDrawer({socksNote}: {socksNote: string}) {
  const {cart, open, pending, closeCart, updateLine} = useCart()
  const panelRef = useRef<HTMLDivElement>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!open) return
    previouslyFocused.current = document.activeElement as HTMLElement | null
    const panel = panelRef.current
    panel?.querySelector<HTMLElement>(FOCUSABLE)?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeCart()
        return
      }
      if (e.key !== 'Tab' || !panel) return
      const focusables = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      previouslyFocused.current?.focus()
    }
  }, [open, closeCart])

  if (!open) return null

  const realLines = cart.lines.filter((l) => !l.isGift)
  const giftLines = cart.lines.filter((l) => l.isGift)

  return (
    <div style={{position: 'fixed', inset: 0, zIndex: 60}}>
      <button
        type="button"
        aria-label="Close cart"
        onClick={closeCart}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(32,30,29,0.24)',
          border: 0,
          cursor: 'pointer',
        }}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Cart"
        className="gr-glass"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: 'min(440px, 100%)',
          display: 'flex',
          flexDirection: 'column',
          animation: 'grSlideIn 320ms cubic-bezier(.2,.8,.2,1) both',
          background: 'rgba(255,255,255,0.86)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '22px 26px',
            borderBottom: '1px solid rgba(32,30,29,0.10)',
          }}
        >
          <p className="gr-kicker" style={{margin: 0, color: 'rgba(32,30,29,0.55)'}}>
            Your cart
          </p>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close"
            style={{
              width: 34,
              height: 34,
              display: 'grid',
              placeItems: 'center',
              background: 'transparent',
              border: '1px solid rgba(32,30,29,0.2)',
              color: '#201e1d',
              fontSize: 15,
              lineHeight: 1,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            &times;
          </button>
        </div>

        <div style={{flex: 1, overflowY: 'auto', padding: '10px 26px'}}>
          {realLines.length === 0 && (
            <p style={{fontSize: 14.5, lineHeight: '28px', color: 'var(--ink-70)', margin: '24px 0'}}>
              Nothing in here yet, except what is always in here.
            </p>
          )}
          {realLines.map((line) => (
            <div
              key={line.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '72px 1fr auto',
                gap: 16,
                alignItems: 'center',
                padding: '18px 0',
                borderBottom: '1px solid rgba(32,30,29,0.10)',
              }}
            >
              <div
                className="gr-photo"
                style={{width: 72, aspectRatio: '3 / 4', background: '#f2efed', position: 'relative'}}
              >
                {line.imageUrl && (
                  <Image
                    src={line.imageUrl}
                    alt=""
                    fill
                    sizes="72px"
                    style={{objectFit: 'cover'}}
                  />
                )}
              </div>
              <div>
                <p style={{fontSize: 14.5, fontWeight: 400, margin: 0}}>{line.title}</p>
                {line.variantTitle && (
                  <p className="gr-label" style={{margin: '6px 0 0', color: 'rgba(32,30,29,0.5)'}}>
                    Size {line.variantTitle}
                  </p>
                )}
                <div style={{display: 'flex', alignItems: 'center', gap: 10, marginTop: 10}}>
                  <button
                    type="button"
                    aria-label={`Decrease quantity of ${line.title}`}
                    disabled={pending}
                    onClick={() => updateLine(line.id, line.quantity - 1)}
                    style={qtyBtn}
                  >
                    &minus;
                  </button>
                  <span style={{fontSize: 13, minWidth: 16, textAlign: 'center'}}>{line.quantity}</span>
                  <button
                    type="button"
                    aria-label={`Increase quantity of ${line.title}`}
                    disabled={pending}
                    onClick={() => updateLine(line.id, line.quantity + 1)}
                    style={qtyBtn}
                  >
                    +
                  </button>
                  <button
                    type="button"
                    disabled={pending}
                    onClick={() => updateLine(line.id, 0)}
                    className="gr-label"
                    style={{
                      background: 'transparent',
                      border: 0,
                      color: 'rgba(32,30,29,0.5)',
                      cursor: 'pointer',
                      marginLeft: 6,
                      padding: 0,
                      fontFamily: 'inherit',
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <p style={{fontSize: 15, fontWeight: 300, letterSpacing: '0.06em', margin: 0}}>
                ${line.price * line.quantity}
              </p>
            </div>
          ))}

          {giftLines.map((line) => (
            <div
              key={line.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: 16,
                alignItems: 'start',
                padding: '18px 0',
                borderBottom: '1px solid rgba(32,30,29,0.10)',
              }}
            >
              <div>
                <p className="gr-label" style={{margin: '0 0 8px', color: '#ec3013'}}>
                  Included — no exceptions
                </p>
                <p style={{fontSize: 14.5, fontWeight: 400, margin: 0}}>{line.title}</p>
                <p style={{fontSize: 13.5, lineHeight: '22px', color: 'var(--ink-65)', margin: '8px 0 0'}}>
                  {socksNote}
                </p>
              </div>
              <p style={{fontSize: 15, fontWeight: 300, letterSpacing: '0.06em', margin: 0}}>$0</p>
            </div>
          ))}
        </div>

        <div style={{padding: '22px 26px', borderTop: '1px solid rgba(32,30,29,0.10)'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 18}}>
            <span className="gr-label" style={{color: 'rgba(32,30,29,0.55)'}}>
              Subtotal
            </span>
            <span style={{fontSize: 16, fontWeight: 300, letterSpacing: '0.06em'}}>
              ${cart.subtotal}
            </span>
          </div>
          {cart.checkoutUrl ? (
            <a
              href={cart.checkoutUrl}
              className="gr-btn gr-btn-primary"
              style={{display: 'block', textAlign: 'center', color: '#fff'}}
            >
              Check out
            </a>
          ) : (
            <button
              type="button"
              disabled={realLines.length === 0}
              className="gr-btn gr-btn-primary"
              style={{display: 'block', width: '100%', opacity: realLines.length === 0 ? 0.4 : 1}}
              title="Checkout opens when the store is connected"
            >
              Check out
            </button>
          )}
          <p className="gr-label" style={{margin: '14px 0 0', textAlign: 'center', color: 'rgba(32,30,29,0.45)'}}>
            Tax and shipping calculated at checkout
          </p>
        </div>
      </div>
    </div>
  )
}

const qtyBtn: React.CSSProperties = {
  width: 26,
  height: 26,
  display: 'grid',
  placeItems: 'center',
  background: 'transparent',
  border: '1px solid rgba(32,30,29,0.2)',
  color: '#201e1d',
  fontSize: 13,
  lineHeight: 1,
  cursor: 'pointer',
  fontFamily: 'inherit',
}
