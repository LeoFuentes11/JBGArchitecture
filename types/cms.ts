// Collection types

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
  status: 'draft' | 'published'
  featured?: boolean
  category: 'residential' | 'commercial' | 'hospitality' | 'heritage' | 'interior-design' | 'landscape'
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
  status: 'draft' | 'published'
  category?: 'news' | 'project-update' | 'industry' | 'behind-the-scenes'
  publishedAt?: string
  heroImage?: Media | string
  excerpt?: string
  content?: string
  seo?: { metaTitle?: string; metaDescription?: string }
  updatedAt: string
  createdAt: string
}

// Global types

export interface HeroSlide {
  image: Media | string
  label: string
  title: string
}

export interface HeroSlidesGlobal {
  slides: HeroSlide[]
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
  establishedBadge: string
}

export interface Service {
  number: string
  title: string
  tagline?: string
  description: string
  suitable?: string
  includes?: Array<{ item: string }>
  href?: string
}

export interface ServicesGlobal {
  sectionTitle?: string
  sectionSubtitle?: string
  services: Service[]
}

export interface TestimonialItem {
  quote: string
  author: string
  role: string
}

export interface TestimonialsGlobal {
  sectionTitle?: string
  testimonials: TestimonialItem[]
}

export interface Stat {
  value: string
  label: string
}

export interface Value {
  title: string
  description: string
}

export interface AboutPageGlobal {
  stats?: Stat[]
  storyParagraphs?: Array<{ text: string }>
  values?: Value[]
  wineIndustryParagraphs?: Array<{ text: string }>
  officeImage?: Media | string
}

export interface SiteSettingsGlobal {
  phone?: string
  email?: string
  address?: {
    street?: string
    suburb?: string
    state?: string
    postcode?: string
  }
  officeHours?: Array<{ days: string; hours: string }>
  footerTagline?: string
  googleMapsUrl?: string
  socialLinks?: {
    instagram?: string
    facebook?: string
    linkedin?: string
  }
}
