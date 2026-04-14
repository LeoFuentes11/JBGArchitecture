import type { GlobalConfig } from 'payload'
import { isAdminOrEditor } from '@/lib/access'

const HeroSlides: GlobalConfig = {
  slug: 'hero-slides',
  label: 'Hero Slides',
  admin: {
    group: 'Homepage',
  },
  access: {
    read: () => true,
    update: isAdminOrEditor,
  },
  fields: [
    {
      name: 'slides',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 8,
      label: 'Slides',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Background Image',
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Label (small text above title)',
          admin: {
            description: 'e.g. "Residential Architecture"',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Title',
          admin: {
            description: 'e.g. "Crafting Spaces That Inspire"',
          },
        },
      ],
    },
    {
      name: 'primaryCta',
      type: 'group',
      label: 'Primary CTA',
      fields: [
        {
          name: 'label',
          type: 'text',
          defaultValue: 'View Portfolio',
        },
        {
          name: 'href',
          type: 'text',
          defaultValue: '/portfolio',
        },
      ],
    },
    {
      name: 'secondaryCta',
      type: 'group',
      label: 'Secondary CTA',
      fields: [
        {
          name: 'label',
          type: 'text',
          defaultValue: 'Start a Project',
        },
        {
          name: 'href',
          type: 'text',
          defaultValue: '/contact',
        },
      ],
    },
    {
      name: 'establishedBadge',
      type: 'text',
      label: 'Established Badge',
      defaultValue: 'Established 1998',
      admin: {
        description: 'Text shown in the top-right badge.',
      },
    },
  ],
}

export default HeroSlides
