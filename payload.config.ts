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

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Get database URL - check multiple sources
function getDbUrl() {
  const urls = [
    process.env.DATABASE_URL_UNPOOLED,
    process.env.POSTGRES_URL_NON_POOLING,
    process.env.DATABASE_URL,
    process.env.POSTGRES_URL,
    process.env.DATABASE_URI,
    process.env.DATABASE,
  ]
  
  for (const url of urls) {
    if (url) {
      console.log('[DB] Found URL:', url.replace(/:([^@]+)@/, ':***@').substring(0, 40) + '...')
      return url
    }
  }
  
  console.error('[DB] No database URL found!')
  console.log('[DB] Available env vars:', Object.keys(process.env).filter(k => k.includes('DATABASE') || k.includes('POSTGRES')))
  return ''
}

const dbUrl = getDbUrl()

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
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  db: dbUrl ? postgresAdapter({
    pool: {
      connectionString: dbUrl,
      ssl: { rejectUnauthorized: false },
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    },
  }) : {
    // Fallback - this will fail but we'll see the error
    migrate: () => Promise.resolve(),
  },
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
      fileSize: 10000000,
    },
  },
  cors: [process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'],
  csrf: [process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'],
})