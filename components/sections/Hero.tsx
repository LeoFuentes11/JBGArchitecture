import React from 'react'
import { getPayloadClient } from '@/lib/payload'
import { HeroSlider } from './HeroSlider'
import type { HeroSlidesGlobal, HeroSlide } from '@/types/cms'

const FALLBACK_SLIDES: HeroSlide[] = [
  { image: { id: '1', url: '/images/hero-1.webp', alt: 'Barossa Valley winery architecture', updatedAt: '', createdAt: '' }, label: 'Winery Architecture', title: 'Crafted for the\nBarossa' },
  { image: { id: '2', url: '/images/placeholder-commercial.webp', alt: 'Commercial architecture', updatedAt: '', createdAt: '' }, label: 'Commercial Design', title: 'Spaces That\nPerform' },
  { image: { id: '3', url: '/images/placeholder-heritage.webp', alt: 'Heritage architecture restoration', updatedAt: '', createdAt: '' }, label: 'Heritage Architecture', title: 'Honouring the\nPast' },
  { image: { id: '4', url: '/images/placeholder-residential.webp', alt: 'Contemporary residential design', updatedAt: '', createdAt: '' }, label: 'Residential Design', title: 'Homes That\nEndure' },
  { image: { id: '5', url: '/images/placeholder-wine.webp', alt: 'Contemporary wine cellar design', updatedAt: '', createdAt: '' }, label: 'Wine Cellar Design', title: 'Cellars That\nAge Well' },
]

const FALLBACK_DATA: HeroSlidesGlobal = {
  slides: FALLBACK_SLIDES,
  primaryCta: { label: 'View Portfolio', href: '/portfolio' },
  secondaryCta: { label: 'Start a Project', href: '/contact' },
  establishedBadge: 'Established 1998',
}

export async function Hero() {
  let data: HeroSlidesGlobal = FALLBACK_DATA

  try {
    const payload = await getPayloadClient()
    const result = await payload.findGlobal({ slug: 'hero-slides' })
    if (result?.slides?.length > 0) {
      data = result as unknown as HeroSlidesGlobal
    }
  } catch {
    // Use fallback data
  }

  return (
    <HeroSlider
      slides={data.slides}
      primaryCta={data.primaryCta}
      secondaryCta={data.secondaryCta}
      establishedBadge={data.establishedBadge}
    />
  )
}
