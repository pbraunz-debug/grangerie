import {defineField, defineType} from 'sanity'

export const campaign = defineType({
  name: 'campaign',
  title: 'Campaign',
  type: 'document',
  fields: [
    defineField({name: 'kicker', type: 'string'}),
    defineField({
      name: 'headlineLines',
      title: 'Headline lines',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({name: 'bodyCopy', type: 'text', rows: 5}),
    defineField({name: 'heroVideo', title: 'Hero video (mp4 loop)', type: 'file', options: {accept: 'video/mp4'}}),
    defineField({name: 'heroPoster', title: 'Hero poster still', type: 'image', options: {hotspot: true}}),
    defineField({name: 'ctaLabel', type: 'string'}),
    defineField({name: 'active', type: 'boolean', initialValue: true}),
  ],
  preview: {select: {title: 'kicker'}},
})
