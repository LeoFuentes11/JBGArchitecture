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

// IMPORTANT: Don't use short-circuit - evaluate each separately for logging
const dbUrl = process.env.DATABASE_URL_UNPOOLED || process.env.POSTGRES_URL_NON_POOLING || process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.DATABASE_URI

console.log('[PAYLOAD] DATABASE_URL_UNPOOLED:', process.env.DATABASE_URL_UNPOOLED ? 'SET' : 'NOT SET')
console.log('[PAYLOAD] POSTGRES_URL_NON_POOLING:', process.env.POSTGRES_URL_NON_POOLING ? 'SET' : 'NOT SET')
console.log('[PAYLOAD] DATABASE_URL:', process.env.DATABASE_URL ? 'SET' : 'NOT SET')
console.log('[PAYLOAD] Selected DB URL:', dbUrl ? 'YES (' + dbUrl.substring(0, 30) + '...)' : 'NO')

if (!dbUrl) {
  console.error('[PAYLOAD] FATAL: No database URL! Set DATABASE_URL_UNPOOLED in Vercel Environment Variables for Production.')
}

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
  db: postgresAdapter({
    pool: {
      connectionString: dbUrl || '',
      ssl: { rejectUnauthorized: false },
    },
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
      fileSize: 10000000,
    },
  },
  cors: [
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '',
    process.env.VERCEL_BRANCH_URL ? `https://${process.env.VERCEL_BRANCH_URL}` : '',
  ].filter(Boolean),
  csrf: [
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '',
    process.env.VERCEL_BRANCH_URL ? `https://${process.env.VERCEL_BRANCH_URL}` : '',
  ].filter(Boolean),
})