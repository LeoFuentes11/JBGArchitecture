import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '@/lib/access'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'],
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 800,
        height: 600,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
        position: 'centre',
      },
      {
        name: 'square',
        width: 600,
        height: 600,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
  },
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
    {
      name: 'caption',
      type: 'text',
      label: 'Caption',
    },
  ],
}

export default Media
