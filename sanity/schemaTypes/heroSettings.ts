import { defineType, defineField } from 'sanity'

export const heroSettingsType = defineType({
  name: 'heroSettings',
  title: 'Hero Slides',
  type: 'document',
  fields: [
    defineField({
      name: 'slides',
      title: 'Slides',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
          defineField({ name: 'label', title: 'Label', type: 'string' }),
          defineField({ name: 'heading', title: 'Heading', type: 'string' }),
          defineField({ name: 'subheading', title: 'Subheading', type: 'string' }),
          defineField({ name: 'ctaText', title: 'CTA Button Text', type: 'string' }),
          defineField({ name: 'ctaLink', title: 'CTA Button Link', type: 'string' }),
        ],
        preview: {
          select: { title: 'heading', media: 'image' },
        },
      }],
    }),
  ],
})
