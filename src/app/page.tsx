import {HeroMedia} from '@/components/HeroMedia'
import {HeroModal} from '@/components/HeroModal'
import {
  ClosingPoster,
  CollectionGrid,
  EditorialBand,
  FeatureTestimonial,
  NoteStrip,
  PromisesSection,
  SocksBand,
  StatsSection,
} from '@/components/home-sections'
import {getHomeContent} from '@/lib/content'
import {closingPoster, collectionHeading, promisesHeading, socksBand} from '@/lib/fallbacks'

// Placeholder stock from the design reference — replaced with brand photography via Sanity.
const SOCKS_IMAGE =
  'https://images.pexels.com/photos/6633363/pexels-photo-6633363.jpeg?auto=compress&cs=tinysrgb&w=1800'
const EDITORIAL_WIDE =
  'https://images.pexels.com/photos/6620856/pexels-photo-6620856.jpeg?auto=compress&cs=tinysrgb&w=1800'
const EDITORIAL_DETAIL =
  'https://images.pexels.com/photos/8790286/pexels-photo-8790286.jpeg?auto=compress&cs=tinysrgb&w=1800'

export default async function HomePage() {
  const {campaign, promises, stats, testimonials, products} = await getHomeContent()

  const strips = testimonials.filter((t) => t.placement === 'strip')
  const feature = testimonials.find((t) => t.placement === 'feature')

  return (
    <>
      <section
        aria-label="Autumn campaign"
        style={{
          position: 'relative',
          background: '#f7f5f3',
          minHeight: 'clamp(620px, 82vh, 900px)',
          display: 'grid',
          overflow: 'hidden',
        }}
      >
        <HeroMedia
          videoUrl={campaign.heroVideoUrl}
          posterUrl={campaign.heroPosterUrl}
          alt="Backlit silhouette pulling an enormous cotton gown down over her head"
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(255,255,255,0.28), rgba(255,255,255,0.05) 40%, rgba(255,255,255,0.34))',
            pointerEvents: 'none',
          }}
        />
        <HeroModal
          kicker={campaign.kicker}
          headlineLines={campaign.headlineLines}
          bodyCopy={campaign.bodyCopy}
          ctaLabel={campaign.ctaLabel}
        />
      </section>

      <PromisesSection
        kicker={promisesHeading.kicker}
        headline={promisesHeading.headline}
        promises={promises}
      />

      {strips[0] && <NoteStrip testimonial={strips[0]} />}

      <StatsSection stats={stats} />

      {strips[1] && <NoteStrip testimonial={strips[1]} />}

      <CollectionGrid
        kicker={collectionHeading.kicker}
        headline={collectionHeading.headline}
        products={products}
      />

      <SocksBand
        kicker={socksBand.kicker}
        headline={socksBand.headline}
        body={socksBand.body}
        closing={socksBand.closing}
        imageUrl={SOCKS_IMAGE}
        imageAlt="Thick ribbed oatmeal socks on crossed ankles at the hem of a long white cotton gown"
      />

      {strips[2] && <NoteStrip testimonial={strips[2]} />}

      <EditorialBand
        wide={{
          url: EDITORIAL_WIDE,
          alt: 'A woman lying diagonally across unmade white linens in an enormous floor-length cotton gown, entirely covered',
        }}
        detail={{
          url: EDITORIAL_DETAIL,
          alt: 'A hand drawing a heavy cotton collar all the way up to the chin',
        }}
      />

      {feature && <FeatureTestimonial testimonial={feature} />}

      <ClosingPoster headlineLines={closingPoster.headlineLines} ctaLabel={closingPoster.ctaLabel} />
    </>
  )
}
