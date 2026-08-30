import {defineQuery} from 'next-sanity'

export const settingsQuery = defineQuery(`*[_type == "settings"][0]{
  wordmark, navLinks, footerLines, socksIncludedCopy, announcementBar
}`)

export const campaignQuery = defineQuery(`*[_type == "campaign" && active == true][0]{
  kicker, headlineLines, bodyCopy, ctaLabel,
  "heroVideoUrl": heroVideo.asset->url,
  "heroPosterUrl": heroPoster.asset->url
}`)

export const promisesQuery = defineQuery(
  `*[_type == "promise"] | order(order asc){_id, numeral, title, body, order}`,
)

export const statsQuery = defineQuery(
  `*[_type == "stat"] | order(order asc){_id, value, label, order}`,
)

export const testimonialsQuery = defineQuery(
  `*[_type == "testimonial" && published == true] | order(order asc){
    _id, quote, name, city, attribution, placement, order
  }`,
)

export const productsQuery = defineQuery(
  `*[_type == "product"] | order(order asc){
    _id, title, "handle": handle.current, shopifyProductId, cut, cutLabel,
    price, blurb, longDescription, fabricWeightOz,
    "images": images[]{"assetUrl": asset->url, "lqip": asset->metadata.lqip, "alt": alt},
    sizes, inStock, order
  }`,
)

export const productByHandleQuery = defineQuery(
  `*[_type == "product" && handle.current == $handle][0]{
    _id, title, "handle": handle.current, shopifyProductId, cut, cutLabel,
    price, blurb, longDescription, fabricWeightOz,
    "images": images[]{"assetUrl": asset->url, "lqip": asset->metadata.lqip, "alt": alt},
    sizes, inStock, order
  }`,
)

export const pageBySlugQuery = defineQuery(
  `*[_type == "page" && slug.current == $slug][0]{
    title, "slug": slug.current, body, seo
  }`,
)
