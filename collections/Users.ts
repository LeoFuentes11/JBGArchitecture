import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    tokenExpiration: 7200,
    verify: false,
    maxLoginAttempts: 5,
    lockDuration: 600,
  },
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      defaultValue: 'editor',
      required: true,
    },
  ],
}