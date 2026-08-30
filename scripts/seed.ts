/**
 * Seed the Sanity dataset with the prototype's real copy — verbatim.
 *
 *   NEXT_PUBLIC_SANITY_PROJECT_ID=xxx SANITY_API_READ_TOKEN=<editor token> npm run seed
 *
 * Idempotent: documents use stable _ids and are createOrReplace'd. The three
 * real product photographs in public/img/ are uploaded as image assets.
 */
import {readFileSync} from 'node:fs'
import {join} from 'node:path'

import {createClient} from '@sanity/client'

import {
  fallbackCampaign,
  fallbackPages,
  fallbackProducts,
  fallbackPromises,
  fallbackSettings,
  fallbackStats,
  fallbackTestimonials,
} from '../src/lib/fallbacks'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_READ_TOKEN

if (!projectId || !token) {
  console.error('Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_READ_TOKEN (an Editor token) first.')
  process.exit(1)
}

const client = createClient({projectId, dataset, token, apiVersion: '2024-10-01', useCdn: false})

function block(text: string, style = 'normal') {
  return {
    _type: 'block',
    _key: cryptoKey(),
    style,
    markDefs: [],
    children: [{_type: 'span', _key: cryptoKey(), text, marks: []}],
  }
}

let keyCounter = 0
function cryptoKey() {
  return `seed${(keyCounter++).toString(36)}${Date.now().toString(36)}`
}

async function uploadLocalImage(relPath: string) {
  const abs = join(process.cwd(), 'public', relPath)
  const buffer = readFileSync(abs)
  const asset = await client.assets.upload('image', buffer, {
    filename: relPath.split('/').pop(),
  })
  return {_type: 'image' as const, _key: cryptoKey(), asset: {_type: 'reference' as const, _ref: asset._id}}
}

async function run() {
  console.log(`Seeding ${projectId}/${dataset}…`)
  const tx = client.transaction()

  tx.createOrReplace({
    _id: 'settings',
    _type: 'settings',
    wordmark: fallbackSettings.wordmark,
    navLinks: fallbackSettings.navLinks.map((l) => ({...l, _key: cryptoKey()})),
    footerLines: fallbackSettings.footerLines,
    socksIncludedCopy: fallbackSettings.socksIncludedCopy,
    announcementBar: fallbackSettings.announcementBar,
  })

  tx.createOrReplace({
    _id: 'campaign-autumn',
    _type: 'campaign',
    kicker: fallbackCampaign.kicker,
    headlineLines: fallbackCampaign.headlineLines,
    bodyCopy: fallbackCampaign.bodyCopy,
    ctaLabel: fallbackCampaign.ctaLabel,
    active: true,
    // heroVideo + heroPoster: upload brand assets in the Studio when they exist.
  })

  for (const promise of fallbackPromises) {
    tx.createOrReplace({
      _id: promise._id,
      _type: 'promise',
      numeral: promise.numeral,
      title: promise.title,
      body: promise.body,
      order: promise.order,
    })
  }

  for (const stat of fallbackStats) {
    tx.createOrReplace({
      _id: stat._id,
      _type: 'stat',
      value: stat.value,
      label: stat.label,
      order: stat.order,
    })
  }

  for (const t of fallbackTestimonials) {
    tx.createOrReplace({
      _id: t._id,
      _type: 'testimonial',
      quote: t.quote,
      name: t.name,
      city: t.city,
      attribution: t.attribution,
      placement: t.placement,
      published: true,
      order: t.order,
    })
  }

  for (const page of fallbackPages) {
    tx.createOrReplace({
      _id: `page-${page.slug}`,
      _type: 'page',
      title: page.title,
      slug: {_type: 'slug', current: page.slug},
      body: (page.bodyText ?? []).flatMap((section) => [
        ...(section.heading ? [block(section.heading, 'h2')] : []),
        ...section.paragraphs.map((p) => block(p)),
      ]),
      seo: page.seo,
    })
  }

  await tx.commit()
  console.log('Documents seeded. Uploading product images…')

  for (const product of fallbackProducts) {
    const localImages = product.images.filter((img) => img.url?.startsWith('/img/'))
    const images = []
    for (const img of localImages) {
      const uploaded = await uploadLocalImage(img.url as string)
      images.push(uploaded)
      console.log(`  uploaded ${img.url}`)
    }
    await client.createOrReplace({
      _id: product._id,
      _type: 'product',
      title: product.title,
      handle: {_type: 'slug', current: product.handle},
      cut: product.cut,
      cutLabel: product.cutLabel,
      price: product.price,
      blurb: product.blurb,
      longDescription: (product.longDescriptionText ?? []).map((p) => block(p)),
      fabricWeightOz: product.fabricWeightOz,
      images,
      sizes: product.sizes,
      inStock: product.inStock,
      order: product.order,
      // shopifyProductId: fill in once the mirrored Shopify products exist.
    })
    console.log(`  seeded ${product.title}`)
  }

  console.log('Done. Open /studio to review.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
