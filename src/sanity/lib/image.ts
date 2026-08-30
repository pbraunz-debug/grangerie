import imageUrlBuilder from '@sanity/image-url'
import type {SanityImageSource} from '@sanity/image-url/lib/types/types'

import {dataset, projectId, sanityConfigured} from '../env'

const builder = sanityConfigured ? imageUrlBuilder({projectId, dataset}) : null

export function urlForImage(source: SanityImageSource) {
  return builder ? builder.image(source).auto('format') : null
}
