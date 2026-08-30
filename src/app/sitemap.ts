import type {MetadataRoute} from 'next'

import {getProducts} from '@/lib/content'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://grangerie.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts()
  const now = new Date()
  return [
    {url: siteUrl, lastModified: now, priority: 1},
    {url: `${siteUrl}/shop`, lastModified: now, priority: 0.9},
    ...products.map((p) => ({
      url: `${siteUrl}/products/${p.handle}`,
      lastModified: now,
      priority: 0.8,
    })),
    {url: `${siteUrl}/house`, lastModified: now, priority: 0.6},
    ...['faq', 'shipping-returns', 'privacy', 'terms'].map((slug) => ({
      url: `${siteUrl}/${slug}`,
      lastModified: now,
      priority: 0.4,
    })),
  ]
}
