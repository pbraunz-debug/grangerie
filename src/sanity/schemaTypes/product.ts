import {defineField, defineType} from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'handle',
      type: 'slug',
      options: {source: 'title'},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'shopifyProductId',
      title: 'Shopify product ID',
      type: 'string',
      description: 'GID of the mirrored Shopify product, e.g. gid://shopify/Product/1234567890',
    }),
    defineField({
      name: 'cut',
      type: 'string',
      options: {
        list: [
          {title: 'Ankle-length', value: 'ankle-length'},
          {title: 'Quilted', value: 'quilted'},
          {title: 'Two-piece', value: 'two-piece'},
          {title: 'Tent', value: 'tent'},
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'cutLabel',
      title: 'Cut label (as shown on the card)',
      type: 'string',
      description: 'e.g. "Ankle-length", "Two pieces", "Tent cut"',
    }),
    defineField({name: 'price', type: 'number', validation: (r) => r.required().positive()}),
    defineField({
      name: 'blurb',
      type: 'string',
      validation: (r) => r.required().max(90),
    }),
    defineField({name: 'longDescription', type: 'array', of: [{type: 'block'}]}),
    defineField({name: 'fabricWeightOz', title: 'Fabric weight (oz)', type: 'number'}),
    defineField({
      name: 'images',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
    }),
    defineField({
      name: 'sizes',
      type: 'array',
      of: [{type: 'string'}],
      initialValue: ['S', 'M', 'L', 'XL', '2X', 'Granny'],
    }),
    defineField({name: 'inStock', type: 'boolean', initialValue: true}),
    defineField({
      name: 'testimonial',
      title: 'Product-page testimonial',
      type: 'object',
      fields: [
        defineField({name: 'quote', type: 'text', rows: 3}),
        defineField({name: 'attribution', type: 'string'}),
      ],
    }),
    defineField({
      name: 'order',
      type: 'number',
      description: 'Position in the collection grid',
    }),
  ],
  orderings: [
    {title: 'Grid order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
  ],
})
