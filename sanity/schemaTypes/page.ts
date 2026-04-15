import { defineType, defineField } from 'sanity'

// "page" type = Portfolio Projects
export const pageType = defineType({
  name: 'page',
  title: 'Portfolio Projects',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Project Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } }),
    defineField({ name: 'mainImage', title: 'Hero Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'projectType', title: 'Project Type', type: 'string' }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({ name: 'year', title: 'Year', type: 'string' }),
    defineField({ name: 'excerpt', title: 'Short Description', type: 'text', rows: 3 }),
    defineField({
      name: 'content',
      title: 'Full Description',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
        },
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      of: [{
        type: 'image',
        options: { hotspot: true },
        fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
      }],
    }),
  ],
  preview: {
    select: { title: 'title', media: 'mainImage', subtitle: 'projectType' },
  },
})
