import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '@/lib/access'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'updatedAt'],
    preview: (doc) => `${process.env.NEXT_PUBLIC_SITE_URL}/portfolio/${doc.slug}`,
  },
  access: {
    read: () => true,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
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
      admin: {
        description: 'URL-friendly identifier. Use lowercase letters, numbers, and hyphens only.',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Featured on homepage',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Residential', value: 'residential' },
        { label: 'Commercial', value: 'commercial' },
        { label: 'Hospitality', value: 'hospitality' },
        { label: 'Heritage', value: 'heritage' },
        { label: 'Interior Design', value: 'interior-design' },
        { label: 'Landscape', value: 'landscape' },
      ],
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      label: 'Short Description',
      admin: {
        description: 'Used in project cards and listings. Keep to 1–2 sentences.',
      },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Hero Image',
    },
    {
      name: 'location',
      type: 'text',
    },
    {
      name: 'year',
      type: 'number',
      admin: {
        description: 'Year of completion.',
      },
    },
    {
      name: 'client',
      type: 'text',
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Gallery',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
        },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          label: 'Meta Title',
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          label: 'Meta Description',
        },
      ],
    },
  ],
}

export default Projects
