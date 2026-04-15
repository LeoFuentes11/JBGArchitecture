import { defineType, defineField } from 'sanity'

export const aboutSettingsType = defineType({
  name: 'aboutSettings',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'value', title: 'Value', type: 'string' }),
          defineField({ name: 'label', title: 'Label', type: 'string' }),
        ],
        preview: { select: { title: 'value', subtitle: 'label' } },
      }],
    }),
    defineField({
      name: 'storyParagraphs',
      title: 'Story Paragraphs',
      type: 'array',
      of: [{
        type: 'object',
        fields: [defineField({ name: 'text', title: 'Text', type: 'text', rows: 4 })],
        preview: { select: { title: 'text' } },
      }],
    }),
    defineField({
      name: 'values',
      title: 'Values',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Title', type: 'string' }),
          defineField({ name: 'description', title: 'Description', type: 'text' }),
        ],
        preview: { select: { title: 'title', subtitle: 'description' } },
      }],
    }),
    defineField({
      name: 'wineIndustryParagraphs',
      title: 'Wine Industry Section Paragraphs',
      type: 'array',
      of: [{
        type: 'object',
        fields: [defineField({ name: 'text', title: 'Text', type: 'text', rows: 4 })],
        preview: { select: { title: 'text' } },
      }],
    }),
    defineField({ name: 'officeImage', title: 'Office Image', type: 'image', options: { hotspot: true } }),
  ],
})
