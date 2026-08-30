import {createClient} from 'next-sanity'

import {apiVersion, dataset, projectId, sanityConfigured} from '../env'

export const client = sanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      token: process.env.SANITY_API_READ_TOKEN,
      stega: {
        enabled: false,
        studioUrl: '/studio',
      },
    })
  : null
