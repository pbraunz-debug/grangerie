import Link from 'next/link'

import type {Settings} from '@/lib/content-types'
import {CartButton} from './CartButton'

export function SiteNav({settings}: {settings: Settings}) {
  return (
    <nav
      className="gr-nav"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        gap: 24,
        padding: '26px clamp(20px, 5vw, 72px)',
        borderBottom: '1px solid rgba(32,30,29,0.10)',
        background: 'rgba(255,255,255,0.86)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        position: 'sticky',
        top: 0,
        zIndex: 20,
      }}
    >
      <div
        className="gr-navlinks"
        style={{display: 'flex', gap: 30, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase'}}
      >
        {settings.navLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </div>
      <Link
        href="/"
        style={{
          fontWeight: 300,
          fontSize: 19,
          letterSpacing: '0.42em',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}
      >
        {settings.wordmark}
      </Link>
      <div style={{display: 'flex', justifyContent: 'flex-end', gap: 12, alignItems: 'center'}}>
        <Link
          href="/shop"
          className="gr-navlinks gr-btn"
          style={{padding: '12px 22px', border: '1px solid rgba(32,30,29,0.22)'}}
        >
          Shop
        </Link>
        <CartButton />
      </div>
    </nav>
  )
}
