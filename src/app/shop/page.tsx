import type {Metadata} from 'next'
import Link from 'next/link'

import {ProductCard} from '@/components/ProductCard'
import {getProducts} from '@/lib/content'
import type {Cut} from '@/lib/content-types'
import {collectionHeading} from '@/lib/fallbacks'

export const metadata: Metadata = {
  title: 'The Collection',
  description:
    'All four of them. Ankle-length, quilted, two-piece, tent. Nap socks with every order, no exceptions.',
}

const CUTS: {value: Cut | 'all'; label: string}[] = [
  {value: 'all', label: 'All four'},
  {value: 'ankle-length', label: 'Ankle-length'},
  {value: 'quilted', label: 'Quilted'},
  {value: 'two-piece', label: 'Two-piece'},
  {value: 'tent', label: 'Tent'},
]

interface Props {
  searchParams: Promise<{cut?: string}>
}

export default async function ShopPage({searchParams}: Props) {
  const {cut} = await searchParams
  const products = await getProducts()
  const active = CUTS.some((c) => c.value === cut) ? (cut as Cut | 'all') : 'all'
  const filtered = active === 'all' ? products : products.filter((p) => p.cut === active)

  return (
    <section className="gr-section-pad gr-gutter" style={{maxWidth: 1240, margin: '0 auto'}}>
      <div style={{textAlign: 'center', marginBottom: 'clamp(32px, 3.6vw, 48px)'}}>
        <p className="gr-kicker" style={{color: '#ec3013', margin: '0 0 22px'}}>
          {collectionHeading.kicker}
        </p>
        <h1
          className="gr-display"
          style={{fontSize: 'clamp(28px, 3.4vw, 46px)', lineHeight: 1.18, margin: '0 auto', maxWidth: '30ch'}}
        >
          {collectionHeading.headline}
        </h1>
      </div>

      <nav
        aria-label="Filter by cut"
        style={{
          display: 'flex',
          gap: 10,
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: 'clamp(32px, 3.6vw, 48px)',
        }}
      >
        {CUTS.map((c) => {
          const isActive = c.value === active
          return (
            <Link
              key={c.value}
              href={c.value === 'all' ? '/shop' : `/shop?cut=${c.value}`}
              aria-current={isActive ? 'page' : undefined}
              className="gr-btn"
              style={{
                padding: '12px 20px',
                border: isActive ? '1px solid #201e1d' : '1px solid rgba(32,30,29,0.22)',
                background: isActive ? '#201e1d' : 'transparent',
                color: isActive ? '#fff' : '#201e1d',
              }}
            >
              {c.label}
            </Link>
          )
        })}
      </nav>

      {filtered.length === 0 ? (
        <p style={{textAlign: 'center', fontSize: 15, lineHeight: '30px', color: 'var(--ink-70)'}}>
          Nothing in this cut yet. There are four gowns. They are all good.
        </p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 'clamp(26px, 2.8vw, 40px) clamp(18px, 2vw, 28px)',
          }}
        >
          {filtered.map((product, i) => (
            <ProductCard key={product._id} product={product} priority={i < 4} />
          ))}
        </div>
      )}

      <p
        className="gr-label"
        style={{textAlign: 'center', color: 'rgba(32,30,29,0.5)', margin: 'clamp(40px, 5vw, 64px) 0 0'}}
      >
        Every order ships with a pair of nap socks. This is not optional and it never will be again.
      </p>
    </section>
  )
}
