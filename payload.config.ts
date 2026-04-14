import { buildConfig, PayloadRequest } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Categories } from './collections/Categories'
import { BlogPosts } from './collections/BlogPosts'

import { Header } from './globals/Header'
import { Footer } from './globals/Footer'
import { SiteSettings } from './globals/SiteSettings'
import { HeroSlides } from './globals/HeroSlides'
import { Services } from './globals/Services'
import { Testimonials } from './globals/Testimonials'
import { AboutPage } from './globals/AboutPage'

import { getServerSideURL } from './lib/getURL'

const filename = fileURLToPath(import.meta.url)
const dirnamePath = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || process.env.NEXT_PUBLIC_SITE_URL || '',

  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '— JBG Architecture CMS',
    },
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
    importMap: {
      baseDir: path.resolve(dirnamePath),
    },
  },

  editor: lexicalEditor(),

  cors: [getServerSideURL()].filter(Boolean),

  collections: [Users, Media, Pages, Categories, BlogPosts],
  globals: [Header, Footer, SiteSettings],

  db: postgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL,
      ssl: { rejectUnauthorized: false },
    },
    migrationDir: path.resolve(dirnamePath, 'migrations'),
    push: true,
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

  sharp,

  typescript: {
    outputFile: path.resolve(dirnamePath, 'payload-types.ts'),
  },

  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        if (req.user) return true
        const secret = process.env.CRON_SECRET
        if (!secret) return false
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${secret}`
      },
    },
    tasks: [],
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
