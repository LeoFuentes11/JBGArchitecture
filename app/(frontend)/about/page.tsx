import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { FadeUp } from '@/components/ui/FadeUp'
import { ArchLine } from '@/components/ui/ArchLine'
import { ContactCTA } from '@/components/sections/ContactCTA'
import { getAboutPage } from '@/lib/sanity'
import { transformAboutPage } from '@/lib/transform'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'About — Our Story',
  description:
    'JBG Architects has been serving South Australia since 1998. Based in the Barossa Valley, we bring passion, expertise and a deep regional commitment to every project.',
}

const FALLBACK_VALUES = [
  { title: 'Quality', description: 'Excellence in every detail, from initial concept to final handover.' },
  { title: 'Character', description: 'Understanding and enhancing the unique qualities of each place.' },
  { title: 'Collaboration', description: 'Working closely with clients to realize their vision.' },
]

const FALLBACK_STATS = [
  { value: '25+', label: 'Years Experience' },
  { value: '200+', label: 'Projects Completed' },
  { value: '50+', label: 'Awards Won' },
]

export default async function AboutPage() {
  let data = { stats: FALLBACK_STATS, storyParagraphs: [], values: FALLBACK_VALUES, wineIndustryParagraphs: [], officeImage: '' }

  try {
    const sanityData = await getAboutPage()
    if (sanityData) {
      data = transformAboutPage(sanityData)
    }
  } catch {
    // Use fallback
  }

  return (
    <>
      <div className="pt-32 pb-16 md:pt-40 md:pb-20 bg-surface">
        <div className="container-content">
          <FadeUp>
            <span className="section-label mb-4 block">About Us</span>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h1 className="font-display text-display-lg text-primary max-w-2xl text-balance">
              Architecture with a Regional Soul
            </h1>
          </FadeUp>
          <ArchLine className="mt-8 w-20 !bg-accent" delay={0.2} />
        </div>
      </div>

      <section className="section-padding bg-bg">
        <div className="container-content">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {data.stats.map((stat, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <div className="bg-bg p-8 md:p-10 flex flex-col items-center justify-center text-center">
                  <span className="font-display text-4xl lg:text-5xl font-light text-accent mb-2">
                    {stat.value}
                  </span>
                  <span className="font-body text-xs tracking-[0.1em] uppercase text-text-muted">
                    {stat.label}
                  </span>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="container-content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <FadeUp>
                <h2 className="font-display text-2xl text-primary mb-6">Our Values</h2>
              </FadeUp>
              <div className="space-y-8">
                {data.values.map((value, i) => (
                  <FadeUp key={i} delay={0.1 + i * 0.08}>
                    <h3 className="font-display text-lg text-primary mb-2">{value.title}</h3>
                    <p className="font-body text-base leading-relaxed text-text-muted">
                      {value.description}
                    </p>
                  </FadeUp>
                ))}
              </div>
            </div>
            <div>
              <FadeUp>
                <h2 className="font-display text-2xl text-primary mb-6">Our Story</h2>
              </FadeUp>
              <div className="space-y-6 font-body text-base leading-relaxed text-text-muted">
                {data.storyParagraphs.map((para, i) => (
                  <p key={i}>{para.text}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  )
}