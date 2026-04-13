import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { FadeUp } from '@/components/ui/FadeUp'
import { ArchLine } from '@/components/ui/ArchLine'
import { ContactCTA } from '@/components/sections/ContactCTA'

export const metadata: Metadata = {
  title: 'About — Our Story',
  description:
    'JBG Architects has been serving South Australia since 1998. Based in the Barossa Valley, we bring passion, expertise and a deep regional commitment to every project.',
}

const values = [
  {
    title: 'Regional Connection',
    description:
      'We are rooted in the communities we serve. Our understanding of regional South Australian life shapes every design decision.',
  },
  {
    title: 'Accessible Expertise',
    description:
      'Great architecture should not be distant or intimidating. We are approachable, listen carefully, and collaborate closely with every client.',
  },
  {
    title: 'Enduring Design',
    description:
      'We design for the long term — buildings and spaces that add genuine, lasting value to the people who inhabit them.',
  },
  {
    title: 'Heritage Respect',
    description:
      'South Australia\'s built heritage is precious. We approach every heritage project with care, rigour, and a deep appreciation for history.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Page Hero */}
      <div className="pt-32 pb-16 md:pt-40 md:pb-20 bg-surface">
        <div className="container-content">
          <FadeUp>
            <span className="section-label mb-4 block">About JBG</span>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h1 className="font-display text-display-lg text-primary max-w-2xl text-balance">
              Architecture Shaped by Place
            </h1>
          </FadeUp>
          <ArchLine className="mt-8 w-20 !bg-accent" delay={0.2} />
        </div>
      </div>

      {/* Story */}
      <section className="section-padding bg-bg">
        <div className="container-content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <FadeUp>
                <div className="relative aspect-[4/5] bg-surface overflow-hidden">
                  <Image
                    src="/images/about-office.jpg"
                    alt="JBG Architects studio — Tanunda, Barossa Valley"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute bottom-6 right-6 bg-bg border border-border p-5">
                    <div className="font-display text-4xl font-light text-accent">1998</div>
                    <div className="font-body text-xs tracking-[0.1em] uppercase text-text-muted mt-1">
                      Established
                    </div>
                  </div>
                </div>
              </FadeUp>
            </div>

            <div className="flex flex-col justify-center">
              <SectionHeader
                label="Our Story"
                title="A Quarter Century of Regional Architecture"
                className="mb-8"
              />
              <FadeUp delay={0.2} className="space-y-5">
                <p className="font-body text-base leading-relaxed text-text-muted">
                  Founded in 1998, JBG Architects has grown from a small regional practice into one
                  of South Australia&apos;s most respected architectural firms. From our studio in
                  Tanunda — in the heart of the Barossa Valley — we serve clients across the region
                  and beyond.
                </p>
                <p className="font-body text-base leading-relaxed text-text-muted">
                  Our team has a passion for regional lifestyles and for meeting the needs of those
                  communities. We see this evolving into an architectural style that is unique to a
                  regional way of life — honest, generous, and deeply connected to the South
                  Australian landscape.
                </p>
                <p className="font-body text-base leading-relaxed text-text-muted">
                  Over 300 residential projects, dozens of award-winning wine industry commissions,
                  and a portfolio of sensitive heritage work define our practice. We are dedicated to
                  accessible and approachable regional architecture that adds genuine value.
                </p>
              </FadeUp>

              <FadeUp delay={0.32} className="mt-8">
                <Link href="/contact" className="btn-primary">
                  Work With Us
                </Link>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-surface">
        <div className="container-content">
          <SectionHeader
            label="Our Approach"
            title="What We Believe"
            subtitle="Four principles guide every project we undertake."
            centered
            className="mx-auto mb-16"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
            {values.map((value, i) => (
              <FadeUp key={value.title} delay={i * 0.08}>
                <div className="flex gap-6">
                  <div className="shrink-0 pt-1">
                    <div className="w-8 h-8 border border-accent flex items-center justify-center">
                      <div className="w-2 h-2 bg-accent" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-primary mb-2">{value.title}</h3>
                    <p className="font-body text-sm leading-relaxed text-text-muted">
                      {value.description}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Wine Industry Note */}
      <section className="section-padding bg-bg">
        <div className="container-content">
          <div className="max-w-3xl">
            <SectionHeader
              label="Industry Relationships"
              title="At Home in the Barossa Wine World"
              className="mb-8"
            />
            <FadeUp delay={0.2} className="space-y-4">
              <p className="font-body text-base leading-relaxed text-text-muted">
                Located in the heart of Australia&apos;s renowned Barossa Valley wine region, JBG
                Architects enjoys a strong working relationship within our regional wine industry.
                Our winery and cellar door projects include work for St Hugo, Torbreck, Henschke,
                Artisans of the Barossa, Rockford Wines, Yalumba Wines, Pernod Ricard, Murray
                Street Vineyards, Two Hands, Shaw + Smith, Grant Burge, and Hentley Farm Wines +
                Restaurant.
              </p>
              <p className="font-body text-base leading-relaxed text-text-muted">
                We understand the unique requirements of winery architecture: the need to balance
                operational efficiency with an authentic sense of place, and the importance of
                creating spaces that welcome and inspire visitors.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  )
}
