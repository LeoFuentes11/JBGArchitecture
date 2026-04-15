import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FadeUp } from '@/components/ui/FadeUp'
import { getPages } from '@/lib/sanity'

const categoryLabels: Record<string, string> = {
  'interior-design': 'Interior Design',
  'wine': 'Wine',
  'commercial': 'Commercial',
  'residential': 'Residential',
  'heritage': 'Heritage',
}

interface PortfolioGridProps {
  category?: string
}

export async function PortfolioGrid({ category }: PortfolioGridProps) {
  let projects: any[] = []

  try {
    const sanityPages = await getPages()
    projects = sanityPages || []
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
      {projects.map((project, i) => (
        <FadeUp key={project._id} delay={i * 0.06}>
          <Link href={`/portfolio/${project.slug?.current || project.slug}`} className="group block overflow-hidden bg-surface">
            <div className="relative aspect-[4/3] overflow-hidden bg-border">
              {project.mainImage?.url && (
                <Image
                  src={project.mainImage.url}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              )}
            </div>
            <div className="p-6">
              <h3 className="font-display text-xl text-primary mb-2 group-hover:text-accent transition-colors duration-300">
                {project.title}
              </h3>
              <p className="font-body text-sm leading-relaxed text-text-muted mb-4 line-clamp-2">
                Click to view project details
              </p>
            </div>
          </Link>
        </FadeUp>
      ))}
    </div>
  )
}