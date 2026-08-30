import Link from 'next/link'

export default function NotFound() {
  return (
    <section
      className="gr-section-pad gr-gutter"
      style={{maxWidth: 780, margin: '0 auto', textAlign: 'center', minHeight: '46vh'}}
    >
      <p className="gr-kicker" style={{color: '#ec3013', margin: '0 0 22px'}}>
        404
      </p>
      <h1 className="gr-display" style={{fontSize: 'clamp(28px, 3.4vw, 46px)', lineHeight: 1.18, margin: 0}}>
        This page is not here.
      </h1>
      <p style={{fontSize: 15, lineHeight: '30px', color: 'var(--ink-70)', margin: '22px auto 0', maxWidth: '44ch'}}>
        It may never have been here. We are covered either way. The gowns are where they always are.
      </p>
      <div style={{marginTop: 34}}>
        <Link href="/shop" className="gr-btn gr-btn-primary" style={{color: '#fff'}}>
          Shop the collection
        </Link>
      </div>
    </section>
  )
}
