import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Where } from 'payload'
import type { Project, Media } from '@/types/cms'
import { FadeUp } from '@/components/ui/FadeUp'
import { getPayloadClient } from '@/lib/payload'

const categoryLabels: Record<string, string> = {
  'interior-design': 'Interior Design',
  'wine': 'Wine',
  'commercial': 'Commercial',
  'residential': 'Residential',
  'heritage': 'Heritage',
  'landscape': 'Landscape',
  'hospitality': 'Hospitality',
}

interface PortfolioGridProps {
  category?: string
}

export async function PortfolioGrid({ category }: PortfolioGridProps) {
  let projects: Project[] = []

  try {
    const payload = await getPayloadClient()
    const where: Where = category
      ? { and: [{ status: { equals: 'published' } }, { category: { equals: category } }] }
      : { status: { equals: 'published' } }
    const result = await payload.find({
      collection: 'projects',
      where,
      limit: 100,
      sort: '-createdAt',
    })
    projects = result.docs as unknown as Project[]
  } catch {
    // Show empty state
  }

  if (projects.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="font-body text-text-muted">No projects found{category ? ' in this category' : ''} yet.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {projects.map((project, i) => {
        const heroImage = typeof project.heroImage !== 'string' ? project.heroImage as Media : null
        return (
          <FadeUp key={project.id} delay={i * 0.06}>
            <Link href={`/portfolio/${project.slug}`} className="group block overflow-hidden bg-surface">
              <div className="relative aspect-[4/3] overflow-hidden bg-border">
                {heroImage?.url && (
                  <Image
                    src={heroImage.url}
                    alt={heroImage.alt || project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                )}
                <div className="absolute top-4 left-4">
                  <span className="bg-bg/90 backdrop-blur-sm px-3 py-1 font-body text-xs tracking-[0.1em] uppercase text-text-muted">
                    {categoryLabels[project.category] ?? project.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl text-primary mb-2 group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="font-body text-sm leading-relaxed text-text-muted mb-4 line-clamp-2">
                  {project.shortDescription}
                </p>
                {(project.location || project.year) && (
                  <div className="flex items-center gap-3 text-xs font-body text-text-muted/60">
                    {project.location && <span>{project.location}</span>}
                    {project.location && project.year && <span>·</span>}
                    {project.year && <span>{project.year}</span>}
                  </div>
                )}
              </div>
            </Link>
          </FadeUp>
        )
      })}
    </div>
  )
}
