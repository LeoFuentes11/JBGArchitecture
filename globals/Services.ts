import type { GlobalConfig } from 'payload'
import { isAdminOrEditor } from '@/lib/access'

export const Services: GlobalConfig = {
  slug: 'services',
  label: 'Services',
  admin: {
    group: 'Content',
  },
  access: {
    read: () => true,
    update: isAdminOrEditor,
  },
  fields: [
    {
      name: 'sectionTitle',
      type: 'text',
      label: 'Section Title',
      defaultValue: 'Our Services',
    },
    {
      name: 'sectionSubtitle',
      type: 'textarea',
      label: 'Section Subtitle',
    },
    {
      name: 'services',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 8,
      label: 'Services',
      fields: [
        {
          name: 'number',
          type: 'text',
          required: true,
          label: 'Number',
          admin: {
            description: 'e.g. "01"',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'tagline',
          type: 'text',
          label: 'Tagline',
          admin: {
            description: 'Short italic subtitle shown below the title.',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'suitable',
          type: 'text',
          label: 'Suitable For',
          admin: {
            description: 'e.g. "Homeowners & Developers"',
          },
        },
        {
          name: 'includes',
          type: 'array',
          label: 'Includes',
          fields: [
            {
              name: 'item',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'href',
          type: 'text',
          label: 'Link URL',
          defaultValue: '/services',
        },
      ],
    },
  ],
}

export default Services
