import type { GlobalConfig } from 'payload'
import { isAdminOrEditor } from '@/lib/access'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    group: 'Settings',
  },
  access: {
    read: () => true,
    update: isAdminOrEditor,
  },
  fields: [
    {
      name: 'phone',
      type: 'text',
      label: 'Phone Number',
      defaultValue: '+61 8 8563 1155',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Contact Email',
    },
    {
      name: 'address',
      type: 'group',
      label: 'Address',
      fields: [
        {
          name: 'street',
          type: 'text',
          defaultValue: '38 Murray Street',
        },
        {
          name: 'suburb',
          type: 'text',
          defaultValue: 'Tanunda',
        },
        {
          name: 'state',
          type: 'text',
          defaultValue: 'SA',
        },
        {
          name: 'postcode',
          type: 'text',
          defaultValue: '5352',
        },
      ],
    },
    {
      name: 'officeHours',
      type: 'array',
      label: 'Office Hours',
      fields: [
        {
          name: 'days',
          type: 'text',
          required: true,
          label: 'Days',
          admin: { description: 'e.g. "Monday – Friday"' },
        },
        {
          name: 'hours',
          type: 'text',
          required: true,
          label: 'Hours',
          admin: { description: 'e.g. "9:00 AM – 5:00 PM"' },
        },
      ],
    },
    {
      name: 'footerTagline',
      type: 'text',
      label: 'Footer Tagline',
      defaultValue: 'Architecture & Interior Design in the Barossa Valley',
    },
    {
      name: 'googleMapsUrl',
      type: 'text',
      label: 'Google Maps URL',
    },
    {
      name: 'socialLinks',
      type: 'group',
      label: 'Social Links',
      fields: [
        {
          name: 'instagram',
          type: 'text',
          label: 'Instagram URL',
        },
        {
          name: 'facebook',
          type: 'text',
          label: 'Facebook URL',
        },
        {
          name: 'linkedin',
          type: 'text',
          label: 'LinkedIn URL',
        },
      ],
    },
  ],
}

export default SiteSettings
