import type {Metadata} from 'next'
import Image from 'next/image'
import {notFound} from 'next/navigation'

import {BuyBox} from '@/components/BuyBox'
import {ProductCard} from '@/components/ProductCard'
import {getProductByHandle, getProducts} from '@/lib/content'
import {cartCopy, fallbackProducts} from '@/lib/fallbacks'

interface Props {
  params: Promise<{handle: string}>
}

export async function generateStaticParams() {
  return fallbackProducts.map((p) => ({handle: p.handle}))
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {handle} = await params
  const product = await getProductByHandle(handle)
  if (!product) return {}
  return {
    title: product.title,
    description: product.blurb,
    openGraph: {title: `${product.title} — Grangerie`, description: product.blurb},
  }
}

export default async function ProductPage({params}: Props) {
  const {handle} = await params
  const [product, allProducts] = await Promise.all([getProductByHandle(handle), getProducts()])
  if (!product) notFound()

  const paragraphs = product.longDescriptionText ?? []
  const others = allProducts.filter((p) => p.handle !== product.handle).slice(0, 3)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://grangerie.com'

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.blurb,
    image: product.images.map((i) => i.url).filter(Boolean),
    url: `${siteUrl}/products/${product.handle}`,
    brand: {'@type': 'Brand', name: 'Grangerie'},
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: `${siteUrl}/products/${product.handle}`,
    },
  }

  return (
    <>
      <div
        className="gr-gutter"
        style={{
          maxWidth: 1240,
          margin: '0 auto',
          padding: 'clamp(36px, 4.5vw, 64px) clamp(20px, 5vw, 72px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(420px, 100%), 1fr))',
          gap: 'clamp(32px, 4vw, 64px)',
          alignItems: 'start',
        }}
      >
        <div style={{display: 'grid', gap: 14}}>
          {(product.images.length ? product.images : [{url: undefined, alt: product.title}]).map(
            (image, i) => (
              <div
                key={image.url ?? i}
                className="gr-photo"
                style={{
                  width: '100%',
                  aspectRatio: '3 / 4',
                  background: '#f2efed',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {image.url && (
                  <Image
                    src={image.url}
                    alt={image.alt ?? product.title}
                    fill
                    priority={i === 0}
                    sizes="(max-width: 900px) 100vw, 50vw"
                    style={{objectFit: 'cover'}}
                  />
                )}
              </div>
            ),
          )}
        </div>

        <div style={{position: 'sticky', top: 120}}>
          <p className="gr-label" style={{color: 'rgba(32,30,29,0.5)', margin: '0 0 14px'}}>
            {product.cutLabel}
          </p>
          <h1
            className="gr-display"
            style={{fontSize: 'clamp(28px, 3.4vw, 46px)', lineHeight: 1.12, margin: 0}}
          >
            {product.title}
          </h1>
          <p style={{fontWeight: 300, fontSize: 22, letterSpacing: '0.06em', margin: '18px 0 0'}}>
            ${product.price}
          </p>
          <p style={{fontSize: 15, lineHeight: '30px', color: 'var(--ink-70)', margin: '22px 0 0', maxWidth: '46ch'}}>
            {product.blurb}
          </p>

          <div style={{marginTop: 34}}>
            <BuyBox product={product} socksLine={`Nap socks included. ${cartCopy.socksNote}`} />
          </div>

          {paragraphs.length > 0 && (
            <div style={{marginTop: 44, borderTop: '1px solid rgba(32,30,29,0.10)', paddingTop: 30}}>
              <p className="gr-label" style={{color: 'rgba(32,30,29,0.55)', margin: '0 0 18px'}}>
                About this garment
              </p>
              {paragraphs.map((para) => (
                <p
                  key={para.slice(0, 32)}
                  style={{fontSize: 14.5, lineHeight: '28px', color: 'rgba(32,30,29,0.68)', margin: '0 0 18px', maxWidth: '52ch'}}
                >
                  {para}
                </p>
              ))}
              {product.fabricWeightOz && (
                <p className="gr-label" style={{color: 'rgba(32,30,29,0.5)', margin: '24px 0 0'}}>
                  {product.fabricWeightOz}oz cotton — a real amount of cotton
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {others.length > 0 && (
        <section
          className="gr-section-pad gr-gutter"
          style={{maxWidth: 1240, margin: '0 auto', borderTop: '1px solid rgba(32,30,29,0.10)'}}
        >
          <p className="gr-kicker" style={{textAlign: 'center', color: '#ec3013', margin: '0 0 40px'}}>
            The rest of the collection
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: 'clamp(26px, 2.8vw, 40px) clamp(18px, 2vw, 28px)',
            }}
          >
            {others.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(productJsonLd)}}
      />
    </>
  )
}
