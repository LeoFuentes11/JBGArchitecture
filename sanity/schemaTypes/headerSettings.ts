import { defineType, defineField } from 'sanity'

export const headerSettingsType = defineType({
  name: 'headerSettings',
  title: 'Header Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'navItems',
      title: 'Navigation Items',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'label', title: 'Label', type: 'string' }),
          defineField({ name: 'url', title: 'URL', type: 'string' }),
        ],
        preview: { select: { title: 'label', subtitle: 'url' } },
      }],
    }),
  ],
})
