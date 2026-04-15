import { defineType, defineField } from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'phone', title: 'Phone', type: 'string' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'object',
      fields: [
        defineField({ name: 'street', title: 'Street', type: 'string' }),
        defineField({ name: 'suburb', title: 'Suburb', type: 'string' }),
        defineField({ name: 'state', title: 'State', type: 'string' }),
        defineField({ name: 'postcode', title: 'Postcode', type: 'string' }),
      ],
    }),
    defineField({
      name: 'officeHours',
      title: 'Office Hours',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'days', title: 'Days', type: 'string' }),
          defineField({ name: 'hours', title: 'Hours', type: 'string' }),
        ],
        preview: { select: { title: 'days', subtitle: 'hours' } },
      }],
    }),
    defineField({ name: 'footerTagline', title: 'Footer Tagline', type: 'string' }),
    defineField({ name: 'googleMapsUrl', title: 'Google Maps URL', type: 'url' }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        defineField({ name: 'instagram', title: 'Instagram URL', type: 'url' }),
        defineField({ name: 'facebook', title: 'Facebook URL', type: 'url' }),
        defineField({ name: 'linkedin', title: 'LinkedIn URL', type: 'url' }),
      ],
    }),
  ],
})
