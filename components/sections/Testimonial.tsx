import React from 'react'
import { getPayloadClient } from '@/lib/payload'
import { TestimonialSlider } from './TestimonialSlider'
import type { TestimonialItem } from '@/types/cms'

const FALLBACK_TESTIMONIALS: TestimonialItem[] = [
  {
    quote: "JBG Architects listened carefully to what we wanted, understood the character of the region, and delivered a cellar door that exceeded every expectation. Their knowledge of winery architecture is unmatched.",
    author: 'Murray Street Vineyards',
    role: 'Barossa Valley, SA',
  },
  {
    quote: "The team's passion for heritage architecture is evident in every detail. They balanced the demands of modern living with a genuine respect for the original character of our home.",
    author: 'Residential Client',
    role: 'Tanunda, SA',
  },
  {
    quote: "Approachable, creative, and thorough. From the first sketch to final handover, JBG guided us through every step with confidence and care.",
    author: 'Commercial Client',
    role: 'Regional South Australia',
  },
]

export async function Testimonial() {
  let testimonials: TestimonialItem[] = FALLBACK_TESTIMONIALS

  try {
    const payload = await getPayloadClient()
    const result = await payload.findGlobal({ slug: 'testimonials' })
    if (result?.testimonials?.length > 0) {
      testimonials = result.testimonials as TestimonialItem[]
    }
  } catch {
    // Use fallback data
  }

  return <TestimonialSlider testimonials={testimonials} />
}
