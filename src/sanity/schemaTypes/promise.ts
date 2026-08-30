import {defineField, defineType} from 'sanity'

export const promise = defineType({
  name: 'promise',
  title: 'Promise',
  type: 'document',
  fields: [
    defineField({name: 'numeral', type: 'string', description: 'Roman numeral, e.g. II'}),
    defineField({name: 'title', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'body', type: 'text', rows: 4, validation: (r) => r.required()}),
    defineField({name: 'order', type: 'number'}),
  ],
  orderings: [{title: 'Order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
})
