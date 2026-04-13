import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getProjects } from '@/lib/payload'
import type { Project, Media } from '@/payload-types'
import { FadeUp } from '@/components/ui/FadeUp'

const categoryLabels: Record<string, string> = {
  'interior-design': 'Interior Design',
  'wine': 'Wine',
  'commercial': 'Commercial',
  'residential': 'Residential',
  'heritage': 'Heritage',
  'before-after': 'Before + After',
}

const placeholderProjects: Project[] = [
  { id: '1', title: 'Murdoch Hill Wines', slug: 'murdoch-hill-wines', category: 'wine', shortDescription: 'A restrained, elegant cellar door for one of the Adelaide Hills\' most acclaimed producers.', heroImage: { id: 'ph1', alt: 'Murdoch Hill Wines', url: '/images/placeholder-wine.jpg', updatedAt: '', createdAt: '' }, location: 'Adelaide Hills, SA', year: 2022, updatedAt: '', createdAt: '' },
  { id: '2', title: 'Rieslingfreak', slug: 'rieslingfreak', category: 'wine', shortDescription: 'A compact, purpose-built cellar door celebrating Clare Valley\'s most iconic variety.', heroImage: { id: 'ph2', alt: 'Rieslingfreak Cellar Door', url: '/images/placeholder-wine.jpg', updatedAt: '', createdAt: '' }, location: 'Clare Valley, SA', year: 2021, updatedAt: '', createdAt: '' },
  { id: '3', title: 'River House', slug: 'river-house', category: 'residential', shortDescription: 'A contemporary riverside retreat designed for the rhythm of regional living.', heroImage: { id: 'ph3', alt: 'River House', url: '/images/placeholder-residential.jpg', updatedAt: '', createdAt: '' }, location: 'South Australia', year: 2023, updatedAt: '', createdAt: '' },
  { id: '4', title: 'Cape Jaffa House', slug: 'cape-jaffa-house', category: 'residential', shortDescription: 'A coastal holiday home that frames the Southern Ocean with simplicity and grace.', heroImage: { id: 'ph4', alt: 'Cape Jaffa House', url: '/images/placeholder-residential.jpg', updatedAt: '', createdAt: '' }, location: 'Cape Jaffa, SA', year: 2023, updatedAt: '', createdAt: '' },
  { id: '5', title: 'Henschke Cellar Door', slug: 'henschke-cellar-door', category: 'heritage', shortDescription: 'Restoration and expansion of an iconic South Australian wine estate.', heroImage: { id: 'ph5', alt: 'Henschke Cellar Door', url: '/images/placeholder-heritage.jpg', updatedAt: '', createdAt: '' }, location: 'Eden Valley, SA', year: 2021, updatedAt: '', createdAt: '' },
  { id: '6', title: 'Beerenberg Farm', slug: 'beerenberg-farm', category: 'commercial', shortDescription: 'Farm-gate retail and visitor experience design for a much-loved South Australian producer.', heroImage: { id: 'ph6', alt: 'Beerenberg Farm', url: '/images/placeholder-commercial.jpg', updatedAt: '', createdAt: '' }, location: 'Hahndorf, SA', year: 2020, updatedAt: '', createdAt: '' },
]

interface PortfolioGridProps {
  category?: string
}

export async function PortfolioGrid({ category }: PortfolioGridProps) {
  let projects: Project[] = []
  try {
    projects = await getProjects(category || undefined)
  } catch {
    // CMS unavailable — show placeholders
  }

  const displayed: Project[] = projects.length > 0 ? projects : (
    category ? placeholderProjects.filter((p) => p.category === category) : placeholderProjects
  )

  if (displayed.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="font-body text-text-muted">No projects found in this category yet.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {displayed.map((project, i) => {
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
