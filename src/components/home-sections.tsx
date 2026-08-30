import Image from 'next/image'
import Link from 'next/link'

import type {Product, Promise_, Stat, Testimonial} from '@/lib/content-types'
import {ProductCard} from './ProductCard'

const hairline = '1px solid rgba(32,30,29,0.10)'

export function PromisesSection({
  kicker,
  headline,
  promises,
}: {
  kicker: string
  headline: string
  promises: Promise_[]
}) {
  return (
    <section id="care" className="gr-section-pad gr-gutter" style={{maxWidth: 1240, margin: '0 auto'}}>
      <div style={{textAlign: 'center', marginBottom: 'clamp(30px, 3.4vw, 44px)'}}>
        <p className="gr-kicker" style={{color: '#ec3013', margin: '0 0 22px'}}>
          {kicker}
        </p>
        <h2
          className="gr-display"
          style={{fontSize: 'clamp(28px, 3.2vw, 42px)', lineHeight: 1.2, margin: 0}}
        >
          {headline}
        </h2>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 'clamp(26px, 3vw, 44px)',
        }}
      >
        {promises.map((promise) => (
          <div key={promise._id} style={{textAlign: 'center', padding: '0 clamp(0px, 1.5vw, 20px)'}}>
            <p
              style={{
                fontWeight: 300,
                fontSize: 13,
                letterSpacing: '0.3em',
                color: 'rgba(32,30,29,0.45)',
                margin: '0 0 18px',
              }}
            >
              {promise.numeral}
            </p>
            <h3 style={{fontWeight: 400, fontSize: 21, lineHeight: '30px', margin: 0}}>{promise.title}</h3>
            <p
              style={{
                fontSize: 14.5,
                lineHeight: '28px',
                color: 'rgba(32,30,29,0.68)',
                margin: '14px auto 0',
                maxWidth: '34ch',
              }}
            >
              {promise.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export function StatsSection({stats}: {stats: Stat[]}) {
  return (
    <section aria-label="By the numbers" style={{borderTop: hairline, borderBottom: hairline}}>
      <div className="gr-stats" style={{maxWidth: 1240, margin: '0 auto'}}>
        {stats.map((stat) => (
          <div key={stat._id}>
            <p style={{fontWeight: 300, fontSize: 40, lineHeight: 1, margin: 0}}>{stat.value}</p>
            <p
              className="gr-label"
              style={{color: 'rgba(32,30,29,0.55)', margin: '18px 0 0', lineHeight: '20px'}}
            >
              {stat.label.split('\n').map((line, i) => (
                <span key={i} className="gr-line">
                  {line}
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export function NoteStrip({testimonial}: {testimonial: Testimonial}) {
  return (
    <section aria-label="Customer note" style={{borderTop: hairline, borderBottom: hairline, background: '#fbfaf9'}}>
      <div
        style={{
          maxWidth: 780,
          margin: '0 auto',
          padding: 'clamp(30px, 3.4vw, 46px) clamp(20px, 5vw, 72px)',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontWeight: 300,
            fontSize: 'clamp(18px, 1.9vw, 24px)',
            lineHeight: 1.5,
            letterSpacing: '-0.008em',
            margin: 0,
          }}
        >
          &ldquo;{testimonial.quote}&rdquo;
        </p>
        <p
          style={{
            fontSize: 10.5,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(32,30,29,0.5)',
            margin: '22px 0 0',
          }}
        >
          {testimonial.attribution}
        </p>
      </div>
    </section>
  )
}

export function CollectionGrid({
  kicker,
  headline,
  products,
}: {
  kicker: string
  headline: string
  products: Product[]
}) {
  return (
    <section id="collection" className="gr-section-pad gr-gutter" style={{maxWidth: 1240, margin: '0 auto'}}>
      <div style={{textAlign: 'center', marginBottom: 'clamp(32px, 3.6vw, 48px)'}}>
        <p className="gr-kicker" style={{color: '#ec3013', margin: '0 0 22px'}}>
          {kicker}
        </p>
        <h2
          className="gr-display"
          style={{fontSize: 'clamp(28px, 3.4vw, 46px)', lineHeight: 1.18, margin: 0}}
        >
          {headline}
        </h2>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 'clamp(26px, 2.8vw, 40px) clamp(18px, 2vw, 28px)',
        }}
      >
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  )
}

export function SocksBand({
  kicker,
  headline,
  body,
  closing,
  imageUrl,
  imageAlt,
}: {
  kicker: string
  headline: string
  body: string
  closing: string
  imageUrl?: string
  imageAlt: string
}) {
  return (
    <section id="socks" style={{position: 'relative', background: '#f7f5f3'}}>
      <div className="gr-photo" style={{position: 'absolute', inset: 0}}>
        {imageUrl && (
          <Image src={imageUrl} alt={imageAlt} fill sizes="100vw" style={{objectFit: 'cover'}} />
        )}
      </div>
      <div
        style={{
          position: 'relative',
          maxWidth: 1240,
          margin: '0 auto',
          padding: 'clamp(56px, 7vw, 100px) clamp(20px, 5vw, 72px)',
          display: 'flex',
          justifyContent: 'flex-end',
          pointerEvents: 'none',
        }}
      >
        <div
          className="gr-glass"
          style={{
            pointerEvents: 'auto',
            maxWidth: 520,
            background: 'rgba(255,255,255,0.74)',
            padding: 'clamp(30px, 3.4vw, 52px)',
          }}
        >
          <p className="gr-kicker" style={{color: '#ec3013', margin: '0 0 22px'}}>
            {kicker}
          </p>
          <h2
            className="gr-display"
            style={{fontSize: 'clamp(26px, 2.9vw, 38px)', lineHeight: 1.2, margin: 0}}
          >
            {headline}
          </h2>
          <p style={{fontSize: 15, lineHeight: '30px', color: 'var(--ink-70)', margin: '24px 0 0'}}>
            {body}
          </p>
          <p style={{fontSize: 15, lineHeight: '30px', margin: '22px 0 0'}}>{closing}</p>
        </div>
      </div>
    </section>
  )
}

export function EditorialBand({
  wide,
  detail,
}: {
  wide: {url?: string; alt: string}
  detail: {url?: string; alt: string}
}) {
  return (
    <section aria-label="Editorial" className="gr-ed" style={{borderTop: hairline}}>
      <figure
        className="gr-photo"
        style={{margin: 0, gridColumn: 'span 2', aspectRatio: '16 / 9', background: '#f2efed', position: 'relative'}}
      >
        {wide.url && <Image src={wide.url} alt={wide.alt} fill sizes="(max-width: 860px) 100vw, 66vw" style={{objectFit: 'cover'}} />}
      </figure>
      <figure
        className="gr-photo"
        style={{margin: 0, aspectRatio: '8 / 9', background: '#f2efed', position: 'relative'}}
      >
        {detail.url && <Image src={detail.url} alt={detail.alt} fill sizes="(max-width: 860px) 100vw, 33vw" style={{objectFit: 'cover'}} />}
      </figure>
    </section>
  )
}

export function FeatureTestimonial({testimonial}: {testimonial: Testimonial}) {
  return (
    <section
      className="gr-section-pad gr-gutter"
      style={{maxWidth: 900, margin: '0 auto', textAlign: 'center'}}
    >
      <blockquote
        style={{
          fontWeight: 300,
          fontSize: 'clamp(24px, 2.8vw, 36px)',
          lineHeight: 1.42,
          letterSpacing: '-0.012em',
          margin: 0,
        }}
      >
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <p
        style={{
          fontSize: 10.5,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(32,30,29,0.5)',
          margin: '34px 0 0',
        }}
      >
        {testimonial.attribution}
      </p>
    </section>
  )
}

export function ClosingPoster({
  headlineLines,
  ctaLabel,
}: {
  headlineLines: string[]
  ctaLabel: string
}) {
  return (
    <section style={{position: 'relative', background: '#f7f5f3', borderTop: hairline}}>
      <div
        className="gr-section-pad gr-gutter"
        style={{maxWidth: 900, margin: '0 auto', textAlign: 'center'}}
      >
        <h3
          className="gr-display"
          style={{fontSize: 'clamp(30px, 4vw, 56px)', lineHeight: 1.1, letterSpacing: '-0.02em', margin: 0}}
        >
          {headlineLines.map((line, i) => (
            <span key={line} className="gr-line" style={i > 0 ? {fontWeight: 400} : undefined}>
              {line}
            </span>
          ))}
        </h3>
        <div style={{display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 40}}>
          <Link
            href="/shop"
            className="gr-btn gr-btn-primary"
            style={{padding: '17px 34px', color: '#fff'}}
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
