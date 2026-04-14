import type { Metadata } from 'next'
import { Hero } from '@/components/sections/Hero'
import { AboutIntro } from '@/components/sections/AboutIntro'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { FeaturedProjects } from '@/components/sections/FeaturedProjects'
import { Testimonial } from '@/components/sections/Testimonial'
import { ContactCTA } from '@/components/sections/ContactCTA'
import { getPayloadClient } from '@/lib/payload'
import type { Project } from '@/types/cms'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'JBG Architects | Premier Architecture South Australia',
  description:
    'JBG Architects — regional architecture firm based in the Barossa Valley, South Australia. Specialising in residential, winery, commercial and heritage design since 1998.',
  openGraph: {
    title: 'JBG Architects | Premier Architecture South Australia',
    description:
      'Regional architecture with a passion for community, lifestyle and the unique character of South Australia.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://jbgarchitects.com',
  name: 'JBG Architects',
  description:
    'Regional architecture firm based in the Barossa Valley, South Australia. Specialising in residential, winery, commercial, and heritage projects since 1998.',
  url: 'https://jbgarchitects.com',
  telephone: '+61-8-8563-1155',
  email: 'admin@jbgarchitects.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '38 Murray Street',
    addressLocality: 'Tanunda',
    addressRegion: 'SA',
    postalCode: '5352',
    addressCountry: 'AU',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -34.5231,
    longitude: 138.9551,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:30',
      closes: '17:30',
    },
  ],
  priceRange: '$$',
  image: 'https://jbgarchitects.com/og-image.jpg',
  sameAs: [],
  foundingDate: '1998',
  areaServed: 'South Australia',
}

export default async function HomePage() {
  let featuredProjects: Project[] = []

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'projects',
      where: {
        and: [
          { status: { equals: 'published' } },
          { featured: { equals: true } },
        ],
      },
      limit: 3,
      sort: '-createdAt',
    })
    featuredProjects = result.docs as unknown as Project[]
  } catch {
    // Use empty array — FeaturedProjects will show placeholders
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <AboutIntro />
      <ServicesSection />
      <FeaturedProjects projects={featuredProjects} />
      <Testimonial />
      <ContactCTA />
    </>
  )
}
