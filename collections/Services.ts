import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'order'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'tagline',
      type: 'text',
      required: true,
      admin: {
        description: 'Short bold line below the title',
      },
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'icon',
      type: 'select',
      options: [
        { label: 'Sketch / Pencil', value: 'sketch' },
        { label: 'Blueprint', value: 'blueprint' },
        { label: 'Document', value: 'document' },
        { label: 'Star / Premium', value: 'premium' },
      ],
    },
    {
      name: 'includes',
      type: 'array',
      label: 'What\'s Included',
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Display order (lower = first)',
      },
    },
  ],
}
