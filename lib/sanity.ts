import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'sv48v185'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = '2024-01-01'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_READ_TOKEN,
})

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

export async function getPosts(limit = 10, category?: string) {
  const filter = category ? `&& category->slug.current == "${category}"` : ''
  const query = `*[_type == "post" && defined(slug.current) ${filter}] | order(publishedAt desc)[0...${limit}] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    "category": category->{title, slug},
    "mainImage": mainImage.asset->{url, alt}
  }`
  return client.fetch(query)
}

export async function getPostBySlug(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    body,
    "category": category->{title, slug},
    "mainImage": mainImage.asset->{url, alt}
  }`
  return client.fetch(query, { slug })
}

export async function getPages() {
  const query = `*[_type == "page" && defined(slug.current)] | order(_createdAt desc) {
    _id,
    title,
    slug,
    "mainImage": mainImage.asset->{url, alt}
  }`
  return client.fetch(query)
}

export async function getPageBySlug(slug: string) {
  const query = `*[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    content,
    "mainImage": mainImage.asset->{url, alt}
  }`
  return client.fetch(query, { slug })
}

export async function getCategories() {
  const query = `*[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    "parent": parent->{title, slug}
  }`
  return client.fetch(query)
}

export async function getHeroSlides() {
  const query = `*[_type == "heroSettings"][0] {
    slides[] {
      image {
        asset->{
          _id,
          url
        }
      },
      label,
      title
    },
    primaryCta {
      label,
      href
    },
    secondaryCta {
      label,
      href
    },
    establishedBadge
  }`
  return client.fetch(query)
}

export async function getServices() {
  const query = `*[_type == "servicesSettings"][0] {
    sectionTitle,
    sectionSubtitle,
    services[] {
      number,
      title,
      tagline,
      description,
      suitable,
      includes[] {
        item
      },
      href
    }
  }`
  return client.fetch(query)
}

export async function getTestimonials() {
  const query = `*[_type == "testimonialsSettings"][0] {
    sectionTitle,
    testimonials[] {
      quote,
      author,
      role
    }
  }`
  return client.fetch(query)
}

export async function getAboutPage() {
  const query = `*[_type == "aboutSettings"][0] {
    stats[] {
      value,
      label
    },
    storyParagraphs[] {
      text
    },
    values[] {
      title,
      description
    },
    wineIndustryParagraphs[] {
      text
    },
    officeImage {
      asset->{
        _id,
        url
      }
    }
  }`
  return client.fetch(query)
}

export async function getSiteSettings() {
  const query = `*[_type == "siteSettings"][0] {
    phone,
    email,
    address {
      street,
      suburb,
      state,
      postcode
    },
    officeHours[] {
      days,
      hours
    },
    footerTagline,
    googleMapsUrl,
    socialLinks {
      instagram,
      facebook,
      linkedin
    }
  }`
  return client.fetch(query)
}

export async function getHeader() {
  const query = `*[_type == "headerSettings"][0] {
    navItems[] {
      label,
      url
    }
  }`
  return client.fetch(query)
}

export async function getFooter() {
  const query = `*[_type == "footerSettings"][0] {
    navItems[] {
      label,
      url
    },
    copyright
  }`
  return client.fetch(query)
}