import Link from 'next/link'

import type {Settings} from '@/lib/content-types'
import {NewsletterForm} from './NewsletterForm'

export function SiteFooter({settings}: {settings: Settings}) {
  return (
    <footer style={{borderTop: '1px solid rgba(32,30,29,0.10)'}}>
      <div
        className="gr-gutter"
        style={{
          maxWidth: 1240,
          margin: '0 auto',
          padding: '44px clamp(20px, 5vw, 72px) 20px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 32,
        }}
      >
        <div>
          <p
            style={{
              fontWeight: 300,
              fontSize: 15,
              letterSpacing: '0.42em',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            {settings.wordmark}
          </p>
          <p style={{fontSize: 13.5, lineHeight: '24px', color: 'var(--ink-65)', margin: '16px 0 0', maxWidth: '36ch'}}>
            {settings.socksIncludedCopy}
          </p>
        </div>
        <div
          className="gr-label"
          style={{display: 'grid', gap: 14, alignContent: 'start', color: 'rgba(32,30,29,0.6)'}}
        >
          <Link href="/shop">Collection</Link>
          <Link href="/house">The House</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/shipping-returns">Shipping &amp; Returns</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </div>
        <NewsletterForm />
      </div>
      <div
        style={{
          maxWidth: 1240,
          margin: '0 auto',
          padding: '34px clamp(20px, 5vw, 72px)',
          display: 'flex',
          justifyContent: 'space-between',
          gap: 20,
          flexWrap: 'wrap',
          fontSize: 10.5,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'rgba(32,30,29,0.5)',
        }}
      >
        {settings.footerLines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </div>
    </footer>
  )
}
