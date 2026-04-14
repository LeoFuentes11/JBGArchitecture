import type { GlobalConfig } from 'payload'
import { isAdminOrEditor } from '@/lib/access'

export const Testimonials: GlobalConfig = {
  slug: 'testimonials',
  label: 'Testimonials',
  admin: {
    group: 'Homepage',
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
      defaultValue: 'Client Testimonials',
    },
    {
      name: 'testimonials',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 12,
      label: 'Testimonials',
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          required: true,
          label: 'Quote',
        },
        {
          name: 'author',
          type: 'text',
          required: true,
          label: 'Author Name',
        },
        {
          name: 'role',
          type: 'text',
          required: true,
          label: 'Author Role / Location',
          admin: {
            description: 'e.g. "Residential Client, Barossa Valley"',
          },
        },
      ],
    },
  ],
}

export default Testimonials
