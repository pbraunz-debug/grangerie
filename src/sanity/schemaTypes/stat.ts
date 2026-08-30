import {defineField, defineType} from 'sanity'

export const stat = defineType({
  name: 'stat',
  title: 'Stat',
  type: 'document',
  fields: [
    defineField({name: 'value', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'label',
      type: 'text',
      rows: 2,
      description: 'Line breaks are preserved',
      validation: (r) => r.required(),
    }),
    defineField({name: 'order', type: 'number'}),
  ],
  orderings: [{title: 'Order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'value', subtitle: 'label'}},
})
