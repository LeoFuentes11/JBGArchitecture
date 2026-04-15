import type { MetadataRoute } from 'next'
import { getPosts, getPages } from '@/lib/sanity'

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
    const [pages, posts] = await Promise.all([
      getPages(),
      getPosts(500),
    ])

    const projectRoutes: MetadataRoute.Sitemap = (pages || []).map(
      (page: any) => ({
        url: `${siteUrl}/portfolio/${page.slug?.current || page.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })
    )

    const postRoutes: MetadataRoute.Sitemap = (posts || []).map(
      (post: any) => ({
        url: `${siteUrl}/news/${post.slug?.current || post.slug}`,
        lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })
    )

    return [...staticRoutes, ...projectRoutes, ...postRoutes]
  } catch {
    return staticRoutes
  }
}
