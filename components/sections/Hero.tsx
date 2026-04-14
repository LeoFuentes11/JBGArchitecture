import React from 'react'
import { getHeroSlides } from '@/lib/sanity'
import { transformHeroSlides } from '@/lib/transform'
import { HeroSlider } from './HeroSlider'

const FALLBACK_SLIDES = [
  { image: '/images/hero-1.webp', label: 'Winery Architecture', title: 'Crafted for the\nBarossa' },
  { image: '/images/placeholder-commercial.webp', label: 'Commercial Design', title: 'Spaces That\nPerform' },
  { image: '/images/placeholder-heritage.webp', label: 'Heritage Architecture', title: 'Honouring the\nPast' },
  { image: '/images/placeholder-residential.webp', label: 'Residential Design', title: 'Homes That\nEndure' },
  { image: '/images/placeholder-wine.webp', label: 'Wine Cellar Design', title: 'Cellars That\nAge Well' },
]

const FALLBACK_DATA = {
  slides: FALLBACK_SLIDES,
  primaryCta: { label: 'View Portfolio', href: '/portfolio' },
  secondaryCta: { label: 'Start a Project', href: '/contact' },
  establishedBadge: 'Established 1998',
}

export async function Hero() {
  let data = FALLBACK_DATA

  try {
    const sanityData = await getHeroSlides()
    if (sanityData?.slides?.length > 0) {
      data = transformHeroSlides(sanityData)
    }
  } catch {
    // Use fallback
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