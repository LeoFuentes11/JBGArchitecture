import { defineType, defineField } from 'sanity'

export const footerSettingsType = defineType({
  name: 'footerSettings',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'navItems',
      title: 'Footer Links',
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
    defineField({ name: 'copyright', title: 'Copyright Text', type: 'string' }),
  ],
})
