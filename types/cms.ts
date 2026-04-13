export interface Media {
  id: string
  alt: string
  url: string
  updatedAt: string
  createdAt: string
}

export interface Project {
  id: string
  title: string
  slug: string
  category: string
  shortDescription: string
  heroImage: Media | string
  location?: string
  year?: number
  client?: string
  gallery?: Array<{ image: Media | string; caption?: string }>
  seo?: { metaTitle?: string; metaDescription?: string }
  updatedAt: string
  createdAt: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  status: string
  excerpt?: string
  heroImage?: Media | string
  publishedAt?: string
  category?: string
  seo?: { metaTitle?: string; metaDescription?: string }
  updatedAt: string
  createdAt: string
}
