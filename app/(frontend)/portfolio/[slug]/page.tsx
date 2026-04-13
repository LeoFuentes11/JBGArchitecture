import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getProjectBySlug } from '@/lib/payload'
import { FadeUp } from '@/components/ui/FadeUp'
import { ArchLine } from '@/components/ui/ArchLine'
import { ContactCTA } from '@/components/sections/ContactCTA'

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

const categoryLabels: Record<string, string> = {
  'interior-design': 'Interior Design',
  'wine': 'Wine',
  'commercial': 'Commercial',
  'residential': 'Residential',
  'heritage': 'Heritage',
  'before-after': 'Before + After',
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  try {
    const project = await getProjectBySlug(slug)
    if (!project) return { title: 'Project Not Found' }
    return {
      title: project.seo?.metaTitle || project.title,
      description: project.seo?.metaDescription || project.shortDescription,
    }
  } catch {
    return { title: 'Portfolio' }
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  let project = null
  try {
    project = await getProjectBySlug(slug)
  } catch {
    // CMS unavailable
  }

  if (!project) notFound()

  const heroImage = typeof project.heroImage !== 'string' ? project.heroImage : null

  return (
    <>
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[400px] bg-primary overflow-hidden">
        {heroImage && (
          <Image
            src={(heroImage as { url: string }).url}
            alt={(heroImage as { alt: string }).alt || project.title}
            fill
            priority
            className="object-cover opacity-70"
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
        <div className="relative z-10 container-content h-full flex flex-col justify-end pb-12 pt-32">
          <FadeUp>
            <span className="section-label text-white/60 mb-3 block">
              {categoryLabels[project.category] ?? project.category}
            </span>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h1 className="font-display text-display-md md:text-display-lg text-white">{project.title}</h1>
          </FadeUp>
        </div>
      </div>

      {/* Project Info */}
      <section className="section-padding bg-bg">
        <div className="container-content">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Details sidebar */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <FadeUp>
                <div className="bg-surface border border-border p-8 space-y-6">
                  <div>
                    <p className="section-label mb-2">Category</p>
                    <p className="font-body text-base text-text-muted">
                      {categoryLabels[project.category] ?? project.category}
                    </p>
                  </div>
                  {project.location && (
                    <div>
                      <p className="section-label mb-2">Location</p>
                      <p className="font-body text-base text-text-muted">{project.location}</p>
                    </div>
                  )}
                  {project.year && (
                    <div>
                      <p className="section-label mb-2">Year</p>
                      <p className="font-body text-base text-text-muted">{project.year}</p>
                    </div>
                  )}
                  {project.client && (
                    <div>
                      <p className="section-label mb-2">Client</p>
                      <p className="font-body text-base text-text-muted">{project.client}</p>
                    </div>
                  )}
                  <ArchLine />
                  <Link href="/contact" className="btn-primary block text-center">
                    Enquire About This Project
                  </Link>
                </div>
              </FadeUp>
            </div>

            {/* Description */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <FadeUp>
                <p className="font-display text-display-sm text-primary mb-6 leading-snug">
                  {project.shortDescription}
                </p>
                <ArchLine className="w-12 !bg-accent mb-8" />
              </FadeUp>
              <FadeUp delay={0.12} className="prose-jbg">
                <p className="font-body text-base leading-relaxed text-text-muted">
                  {/* Rich text content rendered here in a real integration */}
                  Project details managed through CMS.
                </p>
              </FadeUp>
            </div>
          </div>

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="mt-16 md:mt-24">
              <FadeUp>
                <h2 className="font-display text-display-sm text-primary mb-8">Gallery</h2>
              </FadeUp>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {project.gallery.map((item, i) => {
                  const img = typeof item.image !== 'string' ? item.image : null
                  if (!img) return null
                  return (
                    <FadeUp key={i} delay={i * 0.06}>
                      <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                        <Image
                          src={(img as { url: string }).url}
                          alt={(img as { alt: string }).alt || `${project.title} — image ${i + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                      {item.caption && (
                        <p className="mt-2 font-body text-xs text-text-muted">{item.caption}</p>
                      )}
                    </FadeUp>
                  )
                })}
              </div>
            </div>
          )}

          {/* Back to portfolio */}
          <FadeUp className="mt-16">
            <Link href="/portfolio" className="btn-ghost group">
              ← Back to Portfolio
            </Link>
          </FadeUp>
        </div>
      </section>

      <ContactCTA />
    </>
  )
}
