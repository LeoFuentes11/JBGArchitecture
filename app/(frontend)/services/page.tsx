import type { Metadata } from 'next'
import Link from 'next/link'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { FadeUp } from '@/components/ui/FadeUp'
import { ArchLine } from '@/components/ui/ArchLine'
import { ContactCTA } from '@/components/sections/ContactCTA'

export const metadata: Metadata = {
  title: 'Services — What We Do',
  description:
    'From initial concept sketches to full project delivery, JBG Architects offers a complete range of architectural services tailored to residential, commercial, winery, and heritage projects across South Australia.',
}

const services = [
  {
    id: 'sketch-only',
    number: '01',
    title: 'Sketch Only Service',
    tagline: 'Explore the Idea',
    description:
      'An accessible entry point to the design process. Our sketch service delivers hand or digital concept drawings that capture the spatial arrangement, massing, and character of your project — without committing to the full documentation process.',
    includes: [
      'Initial client consultation and brief development',
      'Site analysis and constraints review',
      'Concept sketches (hand-drawn or digital)',
      'Basic floor plan and elevation ideas',
      'Design intent summary',
    ],
    suitable: 'Ideal for early-stage feasibility, planning discussions, or clients wanting to visualise a concept before proceeding.',
  },
  {
    id: 'full-service',
    number: '02',
    title: 'Full Architectural Service',
    tagline: 'End-to-End Delivery',
    description:
      'Our comprehensive service takes your project from the first conversation through to the final construction certificate. We manage design, documentation, council approvals, tendering, and construction administration — so you can focus on what matters.',
    includes: [
      'Brief development and client consultation',
      'Concept and schematic design',
      'Design development',
      'Construction documentation',
      'Development Application (DA) submission and management',
      'Construction Certificate (CC) documents',
      'Tender administration and contractor selection',
      'Contract administration and site inspections',
      'Final handover and defects review',
    ],
    suitable: 'The complete package for new builds, major renovations, commercial developments, and complex heritage projects.',
  },
  {
    id: 'design-documentation',
    number: '03',
    title: 'Design & Documentation',
    tagline: 'Design Ready to Build',
    description:
      'When you need a developed design and a full set of construction documents — without ongoing site administration — this service delivers a complete documentation package suitable for council submission and contractor tendering.',
    includes: [
      'Concept and design development',
      'Full construction documentation set',
      'Specifications and schedules',
      'Development Application preparation',
      'Tender package preparation',
    ],
    suitable: 'Well suited to owner-builders, experienced contractors, or clients who prefer to manage their own build process once the design is complete.',
  },
  {
    id: 'extended',
    number: '04',
    title: 'Extended Service',
    tagline: 'Beyond Architecture',
    description:
      'For complex or evolving projects that require sustained architectural involvement, our extended service provides ongoing consultation, interior design coordination, and post-construction support across the lifetime of your project.',
    includes: [
      'All services included in Full Architectural Service',
      'Interior design and specification',
      'Furniture, fixture and finish coordination',
      'Landscape design liaison',
      'Post-occupancy review and consultation',
      'Ongoing architectural advisory',
    ],
    suitable: 'Ideal for premium residential projects, winery developments, and complex commercial builds requiring a high level of design integration and ongoing support.',
  },
]

export default function ServicesPage() {
  return (
    <>
      {/* Page Hero */}
      <div className="pt-32 pb-16 md:pt-40 md:pb-20 bg-surface">
        <div className="container-content">
          <FadeUp>
            <span className="section-label mb-4 block">What We Do</span>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h1 className="font-display text-display-lg text-primary max-w-2xl text-balance">
              Services Built Around Your Project
            </h1>
          </FadeUp>
          <ArchLine className="mt-8 w-20 !bg-accent" delay={0.2} />
          <FadeUp delay={0.25}>
            <p className="mt-8 font-body text-base md:text-lg text-text-muted max-w-xl leading-relaxed">
              We offer four service levels to match the scope, budget, and ambition of your project —
              from an initial design sketch to comprehensive end-to-end delivery.
            </p>
          </FadeUp>
        </div>
      </div>

      {/* Services */}
      <section className="section-padding bg-bg">
        <div className="container-content">
          <div className="space-y-20 md:space-y-28">
            {services.map((service, i) => (
              <div key={service.id} id={service.id}>
                <FadeUp>
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
                    {/* Number */}
                    <div className="lg:col-span-1">
                      <span className="font-display text-6xl font-light text-border">{service.number}</span>
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-5">
                      <div className="mb-2">
                        <span className="section-label text-accent">{service.tagline}</span>
                      </div>
                      <h2 className="font-display text-display-md text-primary mb-4">
                        {service.title}
                      </h2>
                      <ArchLine className="w-12 !bg-accent mb-6" delay={0.1 + i * 0.05} />
                      <p className="font-body text-base leading-relaxed text-text-muted mb-4">
                        {service.description}
                      </p>
                      <p className="font-body text-sm leading-relaxed text-text-muted/70 italic">
                        {service.suitable}
                      </p>
                    </div>

                    {/* Includes */}
                    <div className="lg:col-span-5 lg:col-start-8">
                      <div className="bg-surface p-8">
                        <p className="section-label mb-5">What&apos;s Included</p>
                        <ul className="space-y-3">
                          {service.includes.map((item, j) => (
                            <li key={j} className="flex items-start gap-3">
                              <span className="shrink-0 w-4 h-4 mt-0.5 border border-accent flex items-center justify-center">
                                <svg className="w-2.5 h-2.5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </span>
                              <span className="font-body text-sm text-text-muted leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </FadeUp>

                {i < services.length - 1 && (
                  <ArchLine className="mt-20 md:mt-28" delay={0} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Types */}
      <section className="section-padding bg-surface">
        <div className="container-content">
          <SectionHeader
            label="Project Types"
            title="Across Every Building Type"
            subtitle="Our services span all sectors of the built environment — from intimate homes to major wine industry developments."
            centered
            className="mx-auto mb-14"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {[
              { icon: '🏠', label: 'Residential' },
              { icon: '🍷', label: 'Winery & Wine Tourism' },
              { icon: '🏛️', label: 'Heritage' },
              { icon: '🏢', label: 'Commercial' },
              { icon: '🪑', label: 'Interior Design' },
            ].map((type) => (
              <FadeUp key={type.label}>
                <div className="text-center p-6 bg-bg border border-border">
                  <div className="text-3xl mb-3">{type.icon}</div>
                  <div className="font-body text-sm text-text-muted tracking-wide">{type.label}</div>
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
