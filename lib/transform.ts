import type { HeroSlide, HeroSlidesGlobal, Service, ServicesGlobal, TestimonialItem, TestimonialsGlobal, Stat, Value, AboutPageGlobal, SiteSettingsGlobal, BlogPost } from '@/types/cms'

export function transformHeroSlides(data: any): HeroSlidesGlobal {
  if (!data) return getDefaultHeroSlides()
  
  return {
    slides: data.slides?.map((slide: any) => ({
      image: slide.image?.asset?.url || '/images/hero-1.webp',
      label: slide.label || '',
      title: slide.title || '',
    })) || [],
    primaryCta: data.primaryCta || { label: 'View Portfolio', href: '/portfolio' },
    secondaryCta: data.secondaryCta || { label: 'Start a Project', href: '/contact' },
    establishedBadge: data.establishedBadge || 'Established 1998',
  }
}

export function transformServices(data: any): ServicesGlobal {
  if (!data) return getDefaultServices()
  
  return {
    sectionTitle: data.sectionTitle || 'Our Services',
    sectionSubtitle: data.sectionSubtitle || '',
    services: data.services?.map((s: any) => ({
      number: s.number || '01',
      title: s.title || '',
      tagline: s.tagline || '',
      description: s.description || '',
      suitable: s.suitable || '',
      includes: s.includes?.map((i: any) => ({ item: i.item || '' })) || [],
      href: s.href || '/services',
    })) || [],
  }
}

export function transformTestimonials(data: any): TestimonialsGlobal {
  if (!data) return getDefaultTestimonials()
  
  return {
    sectionTitle: data.sectionTitle || 'Client Testimonials',
    testimonials: data.testimonials?.map((t: any) => ({
      quote: t.quote || '',
      author: t.author || '',
      role: t.role || '',
    })) || [],
  }
}

export function transformAboutPage(data: any): AboutPageGlobal {
  if (!data) return getDefaultAboutPage()
  
  return {
    stats: data.stats?.map((s: any) => ({
      value: s.value || '',
      label: s.label || '',
    })) || [],
    storyParagraphs: data.storyParagraphs?.map((p: any) => ({ text: p.text || '' })) || [],
    values: data.values?.map((v: any) => ({
      title: v.title || '',
      description: v.description || '',
    })) || [],
    wineIndustryParagraphs: data.wineIndustryParagraphs?.map((p: any) => ({ text: p.text || '' })) || [],
    officeImage: data.officeImage?.asset?.url || '',
  }
}

export function transformSiteSettings(data: any): SiteSettingsGlobal {
  if (!data) return getDefaultSiteSettings()
  
  return {
    phone: data.phone || '+61 8 8563 1155',
    email: data.email || 'info@jbgarchitecture.com.au',
    address: data.address || {
      street: '38 Murray Street',
      suburb: 'Tanunda',
      state: 'SA',
      postcode: '5352',
    },
    officeHours: data.officeHours || [{ days: 'Monday – Friday', hours: '9:00 AM – 5:00 PM' }],
    footerTagline: data.footerTagline || 'Architecture & Interior Design in the Barossa Valley',
    googleMapsUrl: data.googleMapsUrl || 'https://maps.google.com/?q=38+Murray+Street+Tanunda+SA',
    socialLinks: data.socialLinks || {
      instagram: 'https://instagram.com/jbgarchitecture',
      facebook: 'https://facebook.com/jbgarchitecture',
      linkedin: 'https://linkedin.com/company/jbg-architecture',
    },
  }
}

export function transformPosts(posts: any[]): BlogPost[] {
  if (!posts) return []
  return posts.map((post: any) => ({
    id: post._id || '',
    title: post.title || '',
    slug: post.slug?.current || '',
    status: 'published' as const,
    publishedAt: post.publishedAt || '',
    excerpt: post.excerpt || '',
    category: post.category?.title || '',
    heroImage: post.mainImage?.url || '',
    content: '',
    updatedAt: '',
    createdAt: '',
  }))
}

export function transformPost(post: any): BlogPost | null {
  if (!post) return null
  return {
    id: post._id || '',
    title: post.title || '',
    slug: post.slug?.current || '',
    status: 'published' as const,
    publishedAt: post.publishedAt || '',
    excerpt: post.excerpt || '',
    category: post.category?.title || '',
    heroImage: post.mainImage?.url || '',
    content: post.body ? JSON.stringify(post.body) : '',
    updatedAt: '',
    createdAt: '',
  }
}

function getDefaultHeroSlides(): HeroSlidesGlobal {
  return {
    slides: [
      { image: '/images/hero-1.webp', label: 'Winery Architecture', title: 'Crafted for the\nBarossa' },
      { image: '/images/placeholder-commercial.webp', label: 'Commercial Design', title: 'Spaces That\nPerform' },
      { image: '/images/placeholder-heritage.webp', label: 'Heritage Architecture', title: 'Honouring the\nPast' },
      { image: '/images/placeholder-residential.webp', label: 'Residential Design', title: 'Homes That\nEndure' },
      { image: '/images/placeholder-wine.webp', label: 'Wine Cellar Design', title: 'Cellars That\nAge Well' },
    ],
    primaryCta: { label: 'View Portfolio', href: '/portfolio' },
    secondaryCta: { label: 'Start a Project', href: '/contact' },
    establishedBadge: 'Established 1998',
  }
}

function getDefaultServices(): ServicesGlobal {
  return {
    sectionTitle: 'Our Services',
    sectionSubtitle: 'Excellence in every detail',
    services: [
      { number: '01', title: 'Architecture', tagline: 'Design', description: 'Comprehensive architectural services from concept to completion.', suitable: 'All project types', includes: [{ item: 'Concept design' }, { item: 'Detailed drawings' }, { item: 'Contract administration' }], href: '/services' },
      { number: '02', title: 'Interior Design', tagline: 'Spaces', description: 'Creating functional and beautiful interior spaces.', suitable: 'Residential & commercial', includes: [{ item: 'Space planning' }, { item: 'Material selection' }, { item: 'Furniture procurement' }], href: '/services' },
    ],
  }
}

function getDefaultTestimonials(): TestimonialsGlobal {
  return {
    sectionTitle: 'Client Testimonials',
    testimonials: [
      { quote: 'JBG Architecture transformed our vision into reality.', author: 'Sarah Mitchell', role: 'Winemaker, Tanunda' },
    ],
  }
}

function getDefaultAboutPage(): AboutPageGlobal {
  return {
    stats: [
      { value: '25+', label: 'Years Experience' },
      { value: '200+', label: 'Projects Completed' },
      { value: '50+', label: 'Awards Won' },
    ],
    storyParagraphs: [{ text: 'JBG Architecture has been serving the Barossa Valley for over 25 years.' }],
    values: [{ title: 'Quality', description: 'Excellence in every detail' }],
    wineIndustryParagraphs: [{ text: 'Specialising in winery architecture for the Barossa region.' }],
    officeImage: '',
  }
}

function getDefaultSiteSettings(): SiteSettingsGlobal {
  return {
    phone: '+61 8 8563 1155',
    email: 'info@jbgarchitecture.com.au',
    address: { street: '38 Murray Street', suburb: 'Tanunda', state: 'SA', postcode: '5352' },
    officeHours: [{ days: 'Monday – Friday', hours: '9:00 AM – 5:00 PM' }],
    footerTagline: 'Architecture & Interior Design in the Barossa Valley',
    googleMapsUrl: 'https://maps.google.com/?q=38+Murray+Street+Tanunda+SA',
    socialLinks: { instagram: '', facebook: '', linkedin: '' },
  }
}

export function getDefaultHeader() {
  return {
    navItems: [
      { label: 'Portfolio', url: '/portfolio' },
      { label: 'Services', url: '/services' },
      { label: 'About', url: '/about' },
      { label: 'News', url: '/news' },
      { label: 'Contact', url: '/contact' },
    ],
  }
}

export function getDefaultFooter() {
  return {
    navItems: [
      { label: 'Portfolio', url: '/portfolio' },
      { label: 'Services', url: '/services' },
      { label: 'About', url: '/about' },
      { label: 'News', url: '/news' },
      { label: 'Contact', url: '/contact' },
    ],
    copyright: '© JBG Architecture. All rights reserved.',
  }
}