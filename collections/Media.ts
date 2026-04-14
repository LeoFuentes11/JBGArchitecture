import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '@/lib/access'

const Media: CollectionConfig = {
  slug: 'media',
  upload: true,
  admin: {
    defaultColumns: ['filename', 'alt', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Alt Text',
    },
  ],
}

export default Media
