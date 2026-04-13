import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Projects } from './collections/Projects'
import { BlogPosts } from './collections/BlogPosts'
import { Services } from './collections/Services'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '— JBG Architects Admin',
    },
  },
  collections: [Users, Media, Projects, BlogPosts, Services],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      // DATABASE_URL_UNPOOLED is the direct Neon connection (supports DDL for push/migrate)
      // DATABASE_URL is the pooled connection set by Vercel's Neon integration
      // DATABASE_URI is the local dev fallback
      connectionString:
        process.env.DATABASE_URL_UNPOOLED ||      // Neon integration v2 (direct)
        process.env.POSTGRES_URL_NON_POOLING ||   // Neon integration v1 (direct)
        process.env.DATABASE_URL ||               // Neon pooled (fallback)
        process.env.POSTGRES_URL ||              // Neon pooled v1 (fallback)
        process.env.DATABASE_URI ||              // Local dev
        '',
      ssl: { rejectUnauthorized: false },
    },
    push: true,
  }),
  plugins: [
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
  upload: {
    limits: {
      fileSize: 10000000, // 10MB
    },
  },
  cors: [process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'],
  csrf: [process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'],
})
