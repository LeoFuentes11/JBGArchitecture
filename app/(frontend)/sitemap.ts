import type { MetadataRoute } from 'next'
import { getPayloadClient } from '@/lib/payload'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jbgarchitects.com'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${siteUrl}/portfolio`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${siteUrl}/news`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${siteUrl}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.8 },
  ]

  try {
    const payload = await getPayloadClient()

    const [projects, posts] = await Promise.all([
      payload.find({
        collection: 'projects',
        where: { status: { equals: 'published' } },
        limit: 500,
        select: { slug: true, updatedAt: true },
      }),
      payload.find({
        collection: 'blog-posts',
        where: { status: { equals: 'published' } },
        limit: 500,
        select: { slug: true, updatedAt: true },
      }),
    ])

    const projectRoutes: MetadataRoute.Sitemap = (projects.docs as unknown as { slug: string; updatedAt: string }[]).map(
      (doc) => ({
        url: `${siteUrl}/portfolio/${doc.slug}`,
        lastModified: new Date(doc.updatedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })
    )

    const postRoutes: MetadataRoute.Sitemap = (posts.docs as unknown as { slug: string; updatedAt: string }[]).map(
      (doc) => ({
        url: `${siteUrl}/news/${doc.slug}`,
        lastModified: new Date(doc.updatedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })
    )

    return [...staticRoutes, ...projectRoutes, ...postRoutes]
  } catch {
    return staticRoutes
  }
}
