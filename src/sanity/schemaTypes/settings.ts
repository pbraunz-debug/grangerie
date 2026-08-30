import {defineField, defineType} from 'sanity'

export const settings = defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  fields: [
    defineField({name: 'wordmark', type: 'string', initialValue: 'Grangerie'}),
    defineField({
      name: 'navLinks',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'label', type: 'string'}),
            defineField({name: 'href', type: 'string'}),
          ],
        },
      ],
    }),
    defineField({name: 'footerLines', type: 'array', of: [{type: 'string'}]}),
    defineField({name: 'socksIncludedCopy', type: 'string'}),
    defineField({name: 'announcementBar', type: 'string'}),
  ],
  preview: {prepare: () => ({title: 'Site settings'})},
})
