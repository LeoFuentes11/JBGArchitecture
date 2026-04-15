import type { Metadata } from 'next'
import Link from 'next/link'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { FadeUp } from '@/components/ui/FadeUp'
import { ArchLine } from '@/components/ui/ArchLine'
import { ContactCTA } from '@/components/sections/ContactCTA'
import { getServices } from '@/lib/sanity'
import { transformServices } from '@/lib/transform'
import type { Service } from '@/types/cms'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Services — What We Do',
  description:
    'From initial concept sketches to full project delivery, JBG Architects offers a complete range of architectural services tailored to residential, commercial, winery, and heritage projects across South Australia.',
}

const FALLBACK_SERVICES: Service[] = [
  {
    number: '01',
    title: 'Sketch Only Service',
    tagline: 'Explore the Idea',
    description: 'An accessible entry point to the design process.',
    includes: [{ item: 'Initial client consultation' }, { item: 'Site analysis' }, { item: 'Concept sketches' }],
    href: '/contact',
  },
  {
    number: '02',
    title: 'Full Architectural Service',
    tagline: 'Complete Delivery',
    description: 'End-to-end design and delivery from concept to construction.',
    includes: [{ item: 'Full documentation' }, { item: 'Council approvals' }, { item: 'Contract administration' }],
    href: '/contact',
  },
  {
    number: '03',
    title: 'Design & Documentation',
    tagline: 'Detailed Development',
    description: 'Detailed design development and construction documentation.',
    includes: [{ item: 'Design development' }, { item: 'Construction docs' }, { item: 'Tender documentation' }],
    href: '/contact',
  },
  {
    number: '04',
    title: 'Heritage Conservation',
    tagline: 'Sensitive Restoration',
    description: 'Preserving and restoring historic buildings with sensitivity.',
    includes: [{ item: 'Conservation planning' }, { item: 'Historical research' }, { item: 'Adaptive reuse' }],
    href: '/contact',
  },
]

export default async function ServicesPage() {
  let services = FALLBACK_SERVICES

  try {
    const sanityData = await getServices()
    if (sanityData?.services?.length > 0) {
      const transformed = transformServices(sanityData)
      services = transformed.services
    }
  } catch {
    // Use fallback
  }

  return (
    <>
      <div className="pt-32 pb-16 md:pt-40 md:pb-20 bg-surface">
        <div className="container-content">
          <FadeUp>
            <span className="section-label mb-4 block">What We Do</span>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h1 className="font-display text-display-lg text-primary max-w-2xl text-balance">
              Services Tailored to Your Project
            </h1>
          </FadeUp>
          <FadeUp delay={0.14}>
            <p className="mt-6 font-body text-lg leading-relaxed text-text-muted max-w-xl">
              From initial concept sketches to full project delivery, we offer a complete range of
              architectural services. Each service can be tailored to your specific needs and budget.
            </p>
          </FadeUp>
          <ArchLine className="mt-8 w-20 !bg-accent" delay={0.2} />
        </div>
      </div>

      <section className="section-padding bg-bg">
        <div className="container-content">
          <div className="grid grid-cols-1 gap-px bg-border">
            {services.map((service, i) => (
              <FadeUp key={service.number} delay={i * 0.08}>
                <div className="bg-bg p-8 md:p-12 group hover:bg-surface transition-colors duration-500">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
                    <div className="lg:col-span-1">
                      <span className="font-display text-4xl font-light text-border group-hover:text-accent transition-colors duration-500">
                        {service.number}
                      </span>
                    </div>
                    <div className="lg:col-span-2">
                      <div className="flex items-center gap-3 mb-3">
                        <h2 className="font-display text-2xl text-primary">{service.title}</h2>
                        {service.tagline && (
                          <span className="text-accent text-sm font-medium">— {service.tagline}</span>
                        )}
                      </div>
                      <p className="font-body text-base leading-relaxed text-text-muted">
                        {service.description}
                      </p>
                      {service.suitable && (
                        <p className="font-body text-sm text-text-muted/60 mt-3">
                          Suitable for: {service.suitable}
                        </p>
                      )}
                    </div>
                    <div className="lg:col-span-1 lg:text-right">
                      {service.includes && service.includes.length > 0 && (
                        <ul className="space-y-2">
                          {service.includes.map((inc, j) => (
                            <li
                              key={j}
                              className="font-body text-sm text-text-muted flex items-center gap-2 lg:justify-end"
                            >
                              <svg
                                className="w-3 h-3 text-accent shrink-0"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              {inc.item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  )
}