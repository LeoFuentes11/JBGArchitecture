import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Where } from 'payload'
import type { Project, BlogPost, Service } from '@/payload-types'

export async function getPayloadClient() {
  return getPayload({ config: configPromise })
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'projects',
    where: {
      featured: { equals: true },
    },
    limit: 6,
    sort: '-publishedAt',
  })
  return result.docs as Project[]
}

export async function getProjects(category?: string): Promise<Project[]> {
  const payload = await getPayloadClient()
  const where: Where = category ? { category: { equals: category } } : {}
  const result = await payload.find({
    collection: 'projects',
    where,
    limit: 50,
    sort: '-publishedAt',
  })
  return result.docs as Project[]
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  return (result.docs[0] as Project) ?? null
}

export async function getPublishedBlogPosts(limit = 10): Promise<BlogPost[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'blog-posts',
    where: { status: { equals: 'published' } },
    limit,
    sort: '-publishedAt',
  })
  return result.docs as BlogPost[]
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'blog-posts',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  return (result.docs[0] as BlogPost) ?? null
}

export async function getServices(): Promise<Service[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'services',
    limit: 10,
    sort: 'order',
  })
  return result.docs as Service[]
}
