import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { fileURLToPath } from 'url'

import Users from './collections/Users'
import Media from './collections/Media'
import Projects from './collections/Projects'
import BlogPosts from './collections/BlogPosts'

import HeroSlides from './globals/HeroSlides'
import Services from './globals/Services'
import Testimonials from './globals/Testimonials'
import AboutPage from './globals/AboutPage'
import SiteSettings from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',

  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '— JBG Architecture CMS',
    },
  },

  collections: [Users, Media, Projects, BlogPosts],
  globals: [HeroSlides, Services, Testimonials, AboutPage, SiteSettings],

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
    migrationDir: path.resolve(dirname, 'migrations'),
  }),

  plugins: [
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
      collections: {
        media: true,
      },
    }),
  ],

  secret: process.env.PAYLOAD_SECRET || 'fallback-dev-secret-change-in-production',

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  onInit: async (payload) => {
    const email = process.env.PAYLOAD_ADMIN_EMAIL
    const password = process.env.PAYLOAD_ADMIN_PASSWORD

    if (!email || !password) return

    const existing = await payload.find({
      collection: 'users',
      where: { email: { equals: email } },
      limit: 1,
    })

    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'users',
        data: {
          email,
          password,
          name: 'Admin',
          role: 'admin',
        },
      })
      payload.logger.info(`Seeded admin user: ${email}`)
    }
  },
})
