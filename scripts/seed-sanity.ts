import { createClient } from '@sanity/client'

const sanity = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'sv48v185',
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
})

async function seed() {
  console.log('Creating content in Sanity...')

  // Site Settings
  await sanity.createIfNotExists({
    _type: 'siteSettings',
    _id: 'site-settings',
    phone: '+61 8 8563 1155',
    email: 'info@jbgarchitecture.com.au',
    address: {
      street: '38 Murray Street',
      suburb: 'Tanunda',
      state: 'SA',
      postcode: '5352',
    },
    officeHours: [
      { days: 'Monday – Friday', hours: '9:00 AM – 5:00 PM' },
    ],
    footerTagline: 'Architecture & Interior Design in the Barossa Valley',
    googleMapsUrl: 'https://maps.google.com/?q=38+Murray+Street+Tanunda+SA',
    socialLinks: {
      instagram: 'https://instagram.com/jbgarchitecture',
      facebook: 'https://facebook.com/jbgarchitecture',
      linkedin: 'https://linkedin.com/company/jbg-architecture',
    },
  })

  // Hero Slides
  await sanity.createIfNotExists({
    _type: 'heroSettings',
    _id: 'hero-settings',
    slides: [
      { image: { asset: { url: '/images/hero-1.webp' } }, label: 'Winery Architecture', title: 'Crafted for the Barossa' },
      { image: { asset: { url: '/images/placeholder-commercial.webp' } }, label: 'Commercial Design', title: 'Spaces That Perform' },
      { image: { asset: { url: '/images/placeholder-heritage.webp' } }, label: 'Heritage Architecture', title: 'Honouring the Past' },
      { image: { asset: { url: '/images/placeholder-residential.webp' } }, label: 'Residential Design', title: 'Homes That Endure' },
      { image: { asset: { url: '/images/placeholder-wine.webp' } }, label: 'Wine Cellar Design', title: 'Cellars That Age Well' },
    ],
    primaryCta: { label: 'View Portfolio', href: '/portfolio' },
    secondaryCta: { label: 'Start a Project', href: '/contact' },
    establishedBadge: 'Established 1998',
  })

  // Services
  await sanity.createIfNotExists({
    _type: 'servicesSettings',
    _id: 'services-settings',
    sectionTitle: 'Our Services',
    sectionSubtitle: 'Excellence in every detail',
    services: [
      { number: '01', title: 'Architecture', tagline: 'Design', description: 'Comprehensive architectural services from concept to completion.', suitable: 'All project types', includes: [{ item: 'Concept design' }, { item: 'Detailed drawings' }, { item: 'Contract administration' }], href: '/services' },
      { number: '02', title: 'Interior Design', tagline: 'Spaces', description: 'Creating functional and beautiful interior spaces.', suitable: 'Residential & commercial', includes: [{ item: 'Space planning' }, { item: 'Material selection' }, { item: 'Furniture procurement' }], href: '/services' },
      { number: '03', title: 'Project Management', tagline: 'Delivery', description: 'Ensuring your project is delivered on time and on budget.', suitable: 'All project types', includes: [{ item: 'Contract management' }, { item: 'Quality assurance' }, { item: 'Timeline coordination' }], href: '/services' },
      { number: '04', title: 'Heritage Conservation', tagline: 'Restoration', description: 'Preserving and restoring historic buildings with sensitivity.', suitable: 'Heritage buildings', includes: [{ item: 'Conservation planning' }, { item: 'Historical research' }, { item: 'Adaptive reuse' }], href: '/services' },
    ],
  })

  // Testimonials
  await sanity.createIfNotExists({
    _type: 'testimonialsSettings',
    _id: 'testimonials-settings',
    sectionTitle: 'Client Testimonials',
    testimonials: [
      { quote: 'JBG Architects listened carefully to what we wanted, understood the character of the region, and delivered a cellar door that exceeded every expectation. Their knowledge of winery architecture is unmatched.', author: 'Murray Street Vineyards', role: 'Barossa Valley, SA' },
      { quote: "The team's passion for heritage architecture is evident in every detail. They balanced the demands of modern living with a genuine respect for the original character of our home.", author: 'Residential Client', role: 'Tanunda, SA' },
      { quote: 'Approachable, creative, and thorough. From the first sketch to final handover, JBG guided us through every step with confidence and care.', author: 'Commercial Client', role: 'Regional South Australia' },
    ],
  })

  // About Page
  await sanity.createIfNotExists({
    _type: 'aboutSettings',
    _id: 'about-settings',
    stats: [
      { value: '25+', label: 'Years Experience' },
      { value: '200+', label: 'Projects Completed' },
      { value: '50+', label: 'Awards Won' },
    ],
    storyParagraphs: [
      { text: 'JBG Architecture has been serving the Barossa Valley and wider South Australia for over 25 years, delivering exceptional architectural solutions that respect both tradition and innovation.' },
      { text: 'Our team combines classical training with contemporary thinking, ensuring every project benefits from our deep understanding of regional character and client aspirations.' },
    ],
    values: [
      { title: 'Quality', description: 'Excellence in every detail, from initial concept to final handover.' },
      { title: 'Character', description: 'Understanding and enhancing the unique qualities of each place.' },
      { title: 'Collaboration', description: 'Working closely with clients to realize their vision.' },
    ],
    wineIndustryParagraphs: [
      { text: 'Specialising in winery architecture for the Barossa region, we understand the unique requirements of wine production facilities and cellar door experiences.' },
    ],
  })

  // Header
  await sanity.createIfNotExists({
    _type: 'headerSettings',
    _id: 'header-settings',
    navItems: [
      { label: 'Portfolio', url: '/portfolio' },
      { label: 'Services', url: '/services' },
      { label: 'About', url: '/about' },
      { label: 'News', url: '/news' },
      { label: 'Contact', url: '/contact' },
    ],
  })

  // Footer
  await sanity.createIfNotExists({
    _type: 'footerSettings',
    _id: 'footer-settings',
    navItems: [
      { label: 'Portfolio', url: '/portfolio' },
      { label: 'Services', url: '/services' },
      { label: 'About', url: '/about' },
      { label: 'News', url: '/news' },
      { label: 'Contact', url: '/contact' },
    ],
    copyright: '© JBG Architecture. All rights reserved.',
  })

  console.log('✓ Content created in Sanity!')
  console.log('\nGo to https://www.sanity.io/manage/' + (process.env.SANITY_PROJECT_ID || 'sv48v185') + ' to edit your content.')
}

seed().catch(console.error)