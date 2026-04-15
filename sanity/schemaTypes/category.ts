import { defineType, defineField } from 'sanity'

export const categoryType = defineType({
  name: 'category',
  title: 'Categories',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'parent', title: 'Parent Category', type: 'reference', to: [{ type: 'category' }] }),
  ],
})
