import {defineField, defineType} from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({name: 'quote', type: 'text', rows: 4, validation: (r) => r.required()}),
    defineField({name: 'name', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'city', type: 'string'}),
    defineField({
      name: 'attribution',
      title: 'Attribution line (verbatim)',
      type: 'string',
      description: 'Rendered exactly as written, e.g. "Angela D. — Sarasota — owns four"',
    }),
    defineField({name: 'productRef', title: 'Product', type: 'reference', to: [{type: 'product'}]}),
    defineField({name: 'published', type: 'boolean', initialValue: true}),
    defineField({
      name: 'placement',
      type: 'string',
      options: {
        list: [
          {title: 'Note strip', value: 'strip'},
          {title: 'Large testimonial', value: 'feature'},
        ],
      },
      initialValue: 'strip',
    }),
    defineField({name: 'order', type: 'number'}),
  ],
  preview: {select: {title: 'name', subtitle: 'quote'}},
})
