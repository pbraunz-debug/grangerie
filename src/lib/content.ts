/**
 * Content loader: Sanity when configured, verbatim fallbacks otherwise.
 * Every fetch is tagged so the Sanity webhook can revalidate on demand.
 */
import {client} from '@/sanity/lib/client'
import {
  campaignQuery,
  pageBySlugQuery,
  productByHandleQuery,
  productsQuery,
  promisesQuery,
  settingsQuery,
  statsQuery,
  testimonialsQuery,
} from '@/sanity/lib/queries'
import type {
  Campaign,
  HomeContent,
  PageDoc,
  Product,
  Promise_,
  Settings,
  Stat,
  Testimonial,
} from './content-types'
import {
  fallbackCampaign,
  fallbackPages,
  fallbackProducts,
  fallbackPromises,
  fallbackSettings,
  fallbackStats,
  fallbackTestimonials,
} from './fallbacks'

async function fetchOr<T>(
  fallback: T,
  query: string,
  params: Record<string, unknown>,
  tags: string[],
): Promise<T> {
  if (!client) return fallback
  try {
    const data = await client.fetch<T | null>(query, params, {
      next: {tags},
      cache: 'force-cache',
    })
    if (data == null || (Array.isArray(data) && data.length === 0)) return fallback
    return data
  } catch {
    return fallback
  }
}

interface SanityProductImage {
  assetUrl?: string
  lqip?: string
  alt?: string
}

type SanityProduct = Omit<Product, 'images'> & {images?: SanityProductImage[] | null}

function normalizeProduct(p: SanityProduct): Product {
  return {
    ...p,
    cutLabel: p.cutLabel || p.cut,
    sizes: p.sizes?.length ? p.sizes : ['S', 'M', 'L', 'XL', '2X'],
    images: (p.images ?? [])
      .filter((img) => img?.assetUrl)
      .map((img) => ({url: img.assetUrl, alt: img.alt})),
  }
}

export async function getSettings(): Promise<Settings> {
  const s = await fetchOr<Settings | null>(null, settingsQuery, {}, ['settings'])
  if (!s) return fallbackSettings
  return {
    ...fallbackSettings,
    ...Object.fromEntries(Object.entries(s).filter(([, v]) => v != null && v !== '')),
  } as Settings
}

export async function getCampaign(): Promise<Campaign> {
  const c = await fetchOr<Campaign | null>(null, campaignQuery, {}, ['campaign'])
  if (!c || !c.headlineLines?.length) return fallbackCampaign
  return {...fallbackCampaign, ...c}
}

export async function getPromises(): Promise<Promise_[]> {
  return fetchOr(fallbackPromises, promisesQuery, {}, ['promise'])
}

export async function getStats(): Promise<Stat[]> {
  return fetchOr(fallbackStats, statsQuery, {}, ['stat'])
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return fetchOr(fallbackTestimonials, testimonialsQuery, {}, ['testimonial'])
}

export async function getProducts(): Promise<Product[]> {
  const products = await fetchOr<SanityProduct[]>(
    fallbackProducts as unknown as SanityProduct[],
    productsQuery,
    {},
    ['product'],
  )
  return products.map((p) =>
    Array.isArray(p.images) && p.images.some((i) => (i as SanityProductImage).assetUrl)
      ? normalizeProduct(p)
      : (p as unknown as Product),
  )
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
  const fallback = fallbackProducts.find((p) => p.handle === handle) ?? null
  const p = await fetchOr<SanityProduct | null>(null, productByHandleQuery, {handle}, [
    'product',
    `product:${handle}`,
  ])
  if (!p) return fallback
  return normalizeProduct(p)
}

export async function getPage(slug: string): Promise<PageDoc | null> {
  const fallback = fallbackPages.find((p) => p.slug === slug) ?? null
  const page = await fetchOr<PageDoc | null>(null, pageBySlugQuery, {slug}, [
    'page',
    `page:${slug}`,
  ])
  if (!page || (!page.body?.length && fallback)) return fallback
  return page
}

export async function getHomeContent(): Promise<HomeContent> {
  const [campaign, promises, stats, testimonials, products, settings] = await Promise.all([
    getCampaign(),
    getPromises(),
    getStats(),
    getTestimonials(),
    getProducts(),
    getSettings(),
  ])
  return {campaign, promises, stats, testimonials, products, settings}
}
