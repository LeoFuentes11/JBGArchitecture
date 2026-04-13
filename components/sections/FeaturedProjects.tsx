import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { FadeUp } from '@/components/ui/FadeUp'
import type { Project, Media } from '@/types/cms'

const categoryLabels: Record<string, string> = {
  'interior-design': 'Interior Design',
  'wine': 'Wine',
  'commercial': 'Commercial',
  'residential': 'Residential',
  'heritage': 'Heritage',
  'before-after': 'Before + After',
}

// Placeholder projects shown when CMS has no data yet
const placeholderProjects: Project[] = [
  {
    id: '1',
    title: 'Torbreck Vintners',
    slug: 'torbreck-vintners',
    category: 'wine',
    shortDescription: 'A bespoke cellar door and hospitality space that captures the soul of Barossa winemaking.',
    heroImage: { id: 'ph1', alt: 'Torbreck Vintners cellar door', url: '/images/placeholder-wine.jpg', updatedAt: '', createdAt: '' },
    location: 'Barossa Valley, SA',
    year: 2022,
    updatedAt: '',
    createdAt: '',
  },
  {
    id: '2',
    title: 'River House',
    slug: 'river-house',
    category: 'residential',
    shortDescription: 'A contemporary riverside retreat that frames the landscape with honest materials and clean geometry.',
    heroImage: { id: 'ph2', alt: 'River House exterior', url: '/images/placeholder-residential.jpg', updatedAt: '', createdAt: '' },
    location: 'South Australia',
    year: 2023,
    updatedAt: '',
    createdAt: '',
  },
  {
    id: '3',
    title: 'Henschke Cellar Door',
    slug: 'henschke-cellar-door',
    category: 'wine',
    shortDescription: 'Restoration and expansion of an iconic South Australian wine estate, blending heritage with modern hospitality.',
    heroImage: { id: 'ph3', alt: 'Henschke Cellar Door', url: '/images/placeholder-heritage.jpg', updatedAt: '', createdAt: '' },
    location: 'Eden Valley, SA',
    year: 2021,
    updatedAt: '',
    createdAt: '',
  },
]

interface FeaturedProjectsProps {
  projects?: Project[]
}

export function FeaturedProjects({ projects = placeholderProjects }: FeaturedProjectsProps) {
  const displayed = projects.length > 0 ? projects : placeholderProjects

  return (
    <section className="section-padding bg-bg">
      <div className="container-content">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
          <SectionHeader
            label="Selected Work"
            title="Projects We're Proud Of"
          />
          <FadeUp delay={0.2} className="md:self-end">
            <Link href="/portfolio" className="btn-ghost group">
              View All Projects
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {displayed.map((project, i) => {
            const heroImage = typeof project.heroImage !== 'string' ? project.heroImage as Media : null
            return (
              <FadeUp key={project.id} delay={i * 0.1}>
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="group block overflow-hidden bg-surface"
                >
                  {/* Image */}
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
                    {/* Category pill */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-bg/90 backdrop-blur-sm px-3 py-1 font-body text-xs tracking-[0.1em] uppercase text-text-muted">
                        {categoryLabels[project.category] ?? project.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
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
      </div>
    </section>
  )
}
