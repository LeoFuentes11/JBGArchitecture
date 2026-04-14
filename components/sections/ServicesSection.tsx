import React from 'react'
import Link from 'next/link'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { FadeUp } from '@/components/ui/FadeUp'
import { getPayloadClient } from '@/lib/payload'
import type { Service } from '@/types/cms'

const FALLBACK_SERVICES: Service[] = [
  {
    number: '01',
    title: 'Sketch Only Service',
    description: 'An initial design exploration — hand or digital sketches that capture the concept and spatial arrangement of your project without full documentation.',
    href: '/services#sketch-only',
  },
  {
    number: '02',
    title: 'Full Architectural Service',
    description: 'End-to-end design and delivery from concept through to construction completion. Full project oversight, council approvals, and contractor administration.',
    href: '/services#full-service',
  },
  {
    number: '03',
    title: 'Design & Documentation',
    description: 'Detailed design development and construction documentation prepared to a level suitable for tendering and council submission.',
    href: '/services#design-documentation',
  },
  {
    number: '04',
    title: 'Extended Service',
    description: 'Comprehensive post-construction support, interior design coordination, and ongoing architectural consultation for complex or evolving projects.',
    href: '/services#extended',
  },
]

export async function ServicesSection() {
  let services: Service[] = FALLBACK_SERVICES

  try {
    const payload = await getPayloadClient()
    const result = await payload.findGlobal({ slug: 'services' })
    if (result?.services?.length > 0) {
      services = result.services as Service[]
    }
  } catch {
    // Use fallback data
  }

  return (
    <section className="section-padding bg-surface">
      <div className="container-content">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-16">
          <SectionHeader
            label="What We Do"
            title="Services Tailored to Your Project"
            className="md:max-w-lg"
          />
          <FadeUp delay={0.2} className="md:self-end">
            <Link href="/services" className="btn-outline shrink-0">
              All Services
            </Link>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border">
          {services.map((service, i) => (
            <FadeUp key={service.number} delay={i * 0.08}>
              <Link
                href={service.href ?? '/services'}
                className="group block bg-bg p-8 md:p-10 h-full hover:bg-primary transition-colors duration-400"
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="font-display text-4xl font-light text-border group-hover:text-white/20 transition-colors duration-400">
                    {service.number}
                  </span>
                  <svg
                    className="w-5 h-5 text-border group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
                <h3 className="font-display text-xl md:text-2xl text-primary group-hover:text-white transition-colors duration-400 mb-3">
                  {service.title}
                </h3>
                <p className="font-body text-sm leading-relaxed text-text-muted group-hover:text-white/60 transition-colors duration-400">
                  {service.description}
                </p>
              </Link>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
