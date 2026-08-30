import Image from 'next/image'
import Link from 'next/link'

import type {Product} from '@/lib/content-types'

export function ProductCard({product, priority = false}: {product: Product; priority?: boolean}) {
  const image = product.images[0]
  return (
    <article style={{textAlign: 'center'}}>
      <Link href={`/products/${product.handle}`} aria-label={product.title}>
        <div
          className="gr-photo"
          style={{
            width: '100%',
            aspectRatio: '3 / 4',
            marginBottom: 24,
            background: '#f2efed',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {image?.url && (
            <Image
              src={image.url}
              alt={image.alt ?? product.title}
              fill
              priority={priority}
              sizes="(max-width: 640px) 100vw, (max-width: 1240px) 50vw, 300px"
              style={{objectFit: 'cover'}}
            />
          )}
        </div>
      </Link>
      <p className="gr-label" style={{color: 'rgba(32,30,29,0.5)', margin: '0 0 12px'}}>
        {product.cutLabel}
      </p>
      <h3 style={{fontWeight: 400, fontSize: 19, lineHeight: '26px', margin: 0}}>
        <Link href={`/products/${product.handle}`}>{product.title}</Link>
      </h3>
      <p
        style={{
          fontSize: 14,
          lineHeight: '26px',
          color: 'var(--ink-65)',
          margin: '8px auto 0',
          maxWidth: '30ch',
        }}
      >
        {product.blurb}
      </p>
      <p style={{fontWeight: 300, fontSize: 16, margin: '14px 0 0', letterSpacing: '0.06em'}}>
        ${product.price}
      </p>
    </article>
  )
}
