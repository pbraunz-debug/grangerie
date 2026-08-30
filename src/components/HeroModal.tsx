'use client'

import Link from 'next/link'
import {useEffect, useRef, useState} from 'react'

const STORAGE_KEY = 'gr-hero-dismissed'
const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'

interface HeroModalProps {
  kicker: string
  headlineLines: string[]
  bodyCopy: string
  ctaLabel: string
}

export function HeroModal({kicker, headlineLines, bodyCopy, ctaLabel}: HeroModalProps) {
  const [open, setOpen] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)

  useEffect(() => {
    try {
      if (!sessionStorage.getItem(STORAGE_KEY)) setOpen(true)
    } catch {
      setOpen(true)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    previouslyFocused.current = document.activeElement as HTMLElement | null
    const modal = modalRef.current
    modal?.querySelector<HTMLElement>(FOCUSABLE)?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dismiss()
        return
      }
      if (e.key !== 'Tab' || !modal) return
      const focusables = Array.from(modal.querySelectorAll<HTMLElement>(FOCUSABLE))
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
    return () => {
      document.removeEventListener('keydown', onKey)
      previouslyFocused.current?.focus?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  function dismiss() {
    try {
      sessionStorage.setItem(STORAGE_KEY, '1')
    } catch {
      /* private mode: the modal simply returns next load */
    }
    setOpen(false)
  }

  if (!open) return null

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'grid',
        placeItems: 'center',
        padding: 24,
        background: 'rgba(255,255,255,0.28)',
        zIndex: 10,
      }}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="hero-modal-title"
        className="gr-glass gr-modal"
        style={{
          position: 'relative',
          animation: 'grPop 420ms cubic-bezier(.2,.8,.2,1) both',
          maxWidth: 640,
          width: '100%',
          padding: 'clamp(32px, 4vw, 60px)',
          textAlign: 'center',
        }}
      >
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: 14,
            right: 14,
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
        <p className="gr-kicker" style={{color: 'rgba(32,30,29,0.55)', margin: '0 0 22px'}}>
          {kicker}
        </p>
        <h1
          id="hero-modal-title"
          className="gr-display"
          style={{fontSize: 'clamp(34px, 4.4vw, 62px)', lineHeight: 1.08, margin: 0}}
        >
          {headlineLines.map((line, i) => (
            <span key={line} className="gr-line" style={i > 0 ? {fontWeight: 400} : undefined}>
              {line}
            </span>
          ))}
        </h1>
        <p
          style={{
            fontSize: 15,
            lineHeight: '30px',
            color: 'var(--ink-70)',
            margin: '26px auto 0',
            maxWidth: '44ch',
          }}
        >
          {bodyCopy}
        </p>
        <div style={{display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 34}}>
          <Link href="/shop" className="gr-btn gr-btn-primary" style={{color: '#fff'}}>
            {ctaLabel}
          </Link>
          <button type="button" onClick={dismiss} className="gr-btn gr-btn-secondary">
            Just let me look
          </button>
        </div>
      </div>
    </div>
  )
}
