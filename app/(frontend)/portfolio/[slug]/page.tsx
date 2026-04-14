import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'
import type { Project, Media } from '@/types/cms'
import { FadeUp } from '@/components/ui/FadeUp'
import { ArchLine } from '@/components/ui/ArchLine'

export const revalidate = 60

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

const categoryLabels: Record<string, string> = {
  'interior-design': 'Interior Design',
  'wine': 'Wine',
  'commercial': 'Commercial',
  'residential': 'Residential',
  'heritage': 'Heritage',
  'landscape': 'Landscape',
  'hospitality': 'Hospitality',
}

async function getProject(slug: string): Promise<Project | null> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'projects',
      where: {
        and: [
          { slug: { equals: slug } },
          { status: { equals: 'published' } },
        ],
      },
      limit: 1,
    })
    if (result.docs.length === 0) return null
    return result.docs[0] as unknown as Project
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) return { title: 'Project Not Found' }
  return {
    title: project.seo?.metaTitle ?? `${project.title} — JBG Architects`,
    description: project.seo?.metaDescription ?? project.shortDescription,
  }
}

export async function generateStaticParams() {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'projects',
      where: { status: { equals: 'published' } },
      limit: 200,
      select: { slug: true },
    })
    return (result.docs as unknown as { slug: string }[]).map((doc) => ({ slug: doc.slug }))
  } catch {
    return []
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) notFound()

  const heroImage = typeof project.heroImage !== 'string' ? project.heroImage as Media : null
  const gallery = project.gallery ?? []

  return (
    <>
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[420px] bg-primary overflow-hidden">
        {heroImage?.url && (
          <Image
            src={heroImage.url}
            alt={heroImage.alt || project.title}
            fill
            priority
            className="object-cover opacity-60"
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container-content pb-12 md:pb-16">
          <FadeUp>
            <span className="section-label text-white/60 mb-3 block">
              {categoryLabels[project.category] ?? project.category}
            </span>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h1 className="font-display text-display-md text-white max-w-3xl text-balance">
              {project.title}
            </h1>
          </FadeUp>
          {(project.location || project.year) && (
            <FadeUp delay={0.14}>
              <div className="flex items-center gap-3 mt-4 font-body text-sm text-white/50">
                {project.location && <span>{project.location}</span>}
                {project.location && project.year && <span>·</span>}
                {project.year && <span>{project.year}</span>}
                {project.client && <><span>·</span><span>{project.client}</span></>}
              </div>
            </FadeUp>
          )}
        </div>
      </div>

      {/* Content */}
      <section className="section-padding bg-bg">
        <div className="container-content">
          <div className="max-w-2xl">
            <ArchLine className="mb-10 w-16 !bg-accent" />
            <p className="font-body text-lg leading-relaxed text-text-muted">
              {project.shortDescription}
            </p>
          </div>

          {/* Gallery */}
          {gallery.length > 0 && (
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
              {gallery.map((item, i) => {
                const img = typeof item.image !== 'string' ? item.image as Media : null
                if (!img?.url) return null
                return (
                  <FadeUp key={i} delay={i * 0.06}>
                    <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                      <Image
                        src={img.url}
                        alt={img.alt || item.caption || project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    {item.caption && (
                      <p className="mt-2 font-body text-xs text-text-muted/60">{item.caption}</p>
                    )}
                  </FadeUp>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Back link */}
      <div className="bg-surface py-12">
        <div className="container-content">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 font-body text-sm text-text-muted hover:text-primary transition-colors duration-200"
          >
            <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            Back to Portfolio
          </Link>
        </div>
      </div>
    </>
  )
}
