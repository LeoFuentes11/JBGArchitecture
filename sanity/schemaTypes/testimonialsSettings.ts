import { defineType, defineField } from 'sanity'

export const testimonialsSettingsType = defineType({
  name: 'testimonialsSettings',
  title: 'Testimonials',
  type: 'document',
  fields: [
    defineField({ name: 'sectionTitle', title: 'Section Title', type: 'string' }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'quote', title: 'Quote', type: 'text' }),
          defineField({ name: 'author', title: 'Author', type: 'string' }),
          defineField({ name: 'role', title: 'Role / Company', type: 'string' }),
        ],
        preview: {
          select: { title: 'author', subtitle: 'role' },
        },
      }],
    }),
  ],
})
