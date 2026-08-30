'use client'

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

import {apiVersion, dataset, projectId} from '@/sanity/env'
import {schemaTypes} from '@/sanity/schemaTypes'

export default defineConfig({
  name: 'grangerie',
  title: 'Grangerie',
  basePath: '/studio',
  projectId: projectId || 'placeholder',
  dataset,
  schema: {types: schemaTypes},
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Settings')
              .child(S.document().schemaType('settings').documentId('settings')),
            S.divider(),
            S.documentTypeListItem('campaign').title('Campaign'),
            S.documentTypeListItem('product').title('Products'),
            S.documentTypeListItem('promise').title('Promises'),
            S.documentTypeListItem('stat').title('Stats'),
            S.documentTypeListItem('testimonial').title('Testimonials'),
            S.documentTypeListItem('page').title('Pages'),
          ]),
    }),
    visionTool({defaultApiVersion: apiVersion}),
  ],
})
