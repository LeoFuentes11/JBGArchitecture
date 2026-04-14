import type { GlobalConfig } from 'payload'
import { isAdminOrEditor } from '@/lib/access'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: 'About Page',
  admin: {
    group: 'Pages',
  },
  access: {
    read: () => true,
    update: isAdminOrEditor,
  },
  fields: [
    {
      name: 'stats',
      type: 'array',
      label: 'Stats',
      maxRows: 6,
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
          label: 'Value',
          admin: { description: 'e.g. "25+"' },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Label',
          admin: { description: 'e.g. "Years of Practice"' },
        },
      ],
    },
    {
      name: 'storyParagraphs',
      type: 'array',
      label: 'Our Story Paragraphs',
      fields: [
        {
          name: 'text',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'values',
      type: 'array',
      label: 'Core Values',
      maxRows: 8,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'wineIndustryParagraphs',
      type: 'array',
      label: 'Wine Industry / Specialist Paragraphs',
      fields: [
        {
          name: 'text',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'officeImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Office / Team Image',
    },
  ],
}

export default AboutPage
