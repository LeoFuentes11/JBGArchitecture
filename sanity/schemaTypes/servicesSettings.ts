import { defineType, defineField } from 'sanity'

export const servicesSettingsType = defineType({
  name: 'servicesSettings',
  title: 'Services',
  type: 'document',
  fields: [
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'number', title: 'Number', type: 'string' }),
          defineField({ name: 'title', title: 'Title', type: 'string' }),
          defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
          defineField({ name: 'description', title: 'Description', type: 'text' }),
          defineField({ name: 'suitable', title: 'Suitable For', type: 'text' }),
          defineField({
            name: 'includes',
            title: 'Includes',
            type: 'array',
            of: [{ type: 'object', fields: [defineField({ name: 'item', title: 'Item', type: 'string' })] }],
          }),
          defineField({ name: 'href', title: 'Link', type: 'string' }),
        ],
        preview: {
          select: { title: 'title', subtitle: 'tagline' },
        },
      }],
    }),
  ],
})
