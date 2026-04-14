import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '@/lib/access'

export const Categories: CollectionConfig = {
  slug: 'categories' as any,
  admin: {
    useAsTitle: 'title',
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
        description: 'URL-friendly identifier',
      },
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'categories' as any,
      label: 'Parent Category',
      admin: {
        description: 'Create nested categories by selecting a parent',
      },
    },
  ],
}

export default Categories