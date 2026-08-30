export type Cut = 'ankle-length' | 'quilted' | 'two-piece' | 'tent'

export interface ProductImage {
  /** Sanity image ref (when CMS-driven) */
  asset?: {url: string; metadata?: {lqip?: string}}
  /** Direct URL fallback (local /img or stock placeholder) */
  url?: string
  alt?: string
}

export interface Product {
  _id: string
  title: string
  handle: string
  shopifyProductId?: string
  cut: Cut
  cutLabel: string
  price: number
  blurb: string
  longDescription?: unknown[]
  longDescriptionText?: string[]
  fabricWeightOz?: number
  images: ProductImage[]
  sizes: string[]
  inStock: boolean
  order?: number
  testimonial?: {quote: string; attribution: string}
}

export interface Testimonial {
  _id: string
  quote: string
  name: string
  city?: string
  attribution: string
  placement: 'strip' | 'feature'
  order?: number
}

export interface Campaign {
  kicker: string
  headlineLines: string[]
  bodyCopy: string
  heroVideoUrl?: string
  heroPosterUrl?: string
  ctaLabel: string
}

export interface Promise_ {
  _id: string
  numeral: string
  title: string
  body: string
  order?: number
}

export interface Stat {
  _id: string
  value: string
  label: string
  order?: number
}

export interface PageDoc {
  title: string
  slug: string
  body?: unknown[]
  bodyText?: {heading?: string; paragraphs: string[]}[]
  seo?: {title?: string; description?: string}
}

export interface Settings {
  wordmark: string
  navLinks: {label: string; href: string}[]
  footerLines: string[]
  socksIncludedCopy: string
  announcementBar?: string
}

export interface HomeContent {
  campaign: Campaign
  promises: Promise_[]
  stats: Stat[]
  testimonials: Testimonial[]
  products: Product[]
  settings: Settings
}
