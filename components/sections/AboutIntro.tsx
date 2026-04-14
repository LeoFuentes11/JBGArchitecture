import React from 'react'
import Link from 'next/link'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { FadeUp } from '@/components/ui/FadeUp'
import { ArchLine } from '@/components/ui/ArchLine'
import { getPayloadClient } from '@/lib/payload'
import type { Stat } from '@/types/cms'

const FALLBACK_STATS: Stat[] = [
  { value: '25+', label: 'Years of Practice' },
  { value: '300+', label: 'Residential Projects' },
  { value: '6', label: 'Project Categories' },
  { value: 'SA', label: 'Regional Focus' },
]

export async function AboutIntro() {
  let stats: Stat[] = FALLBACK_STATS

  try {
    const payload = await getPayloadClient()
    const result = await payload.findGlobal({ slug: 'about-page' })
    if ((result?.stats?.length ?? 0) > 0) {
      stats = result.stats as Stat[]
    }
  } catch {
    // Use fallback data
  }

  return (
    <section className="section-padding bg-bg">
      <div className="container-content">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <SectionHeader
              label="Who We Are"
              title="Architecture with a Regional Soul"
              subtitle="Based in the Barossa Valley and servicing clients across South Australia, JBG Architects brings 25+ years of dedicated regional practice to every project."
            />
            <FadeUp delay={0.25} className="mt-8 space-y-4">
              <p className="font-body text-base leading-relaxed text-text-muted">
                Our team has a deep passion for regional lifestyles and the communities we serve.
                This shapes an architectural style that is uniquely suited to a regional way of
                life — balancing creative ambition with practical, enduring design.
              </p>
              <p className="font-body text-base leading-relaxed text-text-muted">
                From picturesque wine estates to heritage restorations and contemporary residences,
                we approach each project with the same commitment: to add lasting value to your
                lifestyle and community.
              </p>
            </FadeUp>

            <FadeUp delay={0.35} className="mt-10 flex flex-wrap gap-4">
              <Link href="/about" className="btn-outline">
                Our Story
              </Link>
              <Link href="/services" className="btn-ghost">
                Our Services
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </FadeUp>
          </div>

          <div>
            <FadeUp delay={0.1}>
              <div className="grid grid-cols-2 gap-px bg-border">
                {stats.map((stat, i) => (
                  <div key={i} className="bg-bg p-10 flex flex-col items-center justify-center text-center">
                    <span className="font-display text-5xl font-light text-accent mb-2">{stat.value}</span>
                    <span className="font-body text-xs tracking-[0.1em] uppercase text-text-muted">{stat.label}</span>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>

        <div className="mt-20 md:mt-28">
          <ArchLine />
        </div>
      </div>
    </section>
  )
}
