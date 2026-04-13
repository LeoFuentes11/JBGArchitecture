import type { Metadata } from 'next'
import { Suspense } from 'react'
import { PortfolioGrid } from './PortfolioGrid'
import { FadeUp } from '@/components/ui/FadeUp'
import { ArchLine } from '@/components/ui/ArchLine'

export const metadata: Metadata = {
  title: 'Portfolio — Our Work',
  description:
    'Explore JBG Architects\' portfolio of residential, winery, commercial, heritage, and interior design projects across South Australia and beyond.',
}

const categories = [
  { value: '', label: 'All Projects' },
  { value: 'interior-design', label: 'Interior Design' },
  { value: 'wine', label: 'Wine' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'residential', label: 'Residential' },
  { value: 'heritage', label: 'Heritage' },
  { value: 'before-after', label: 'Before + After' },
]

interface PortfolioPageProps {
  searchParams: Promise<{ category?: string }>
}

export default async function PortfolioPage({ searchParams }: PortfolioPageProps) {
  const { category } = await searchParams
  const activeCategory = category || ''

  return (
    <>
      {/* Page Hero */}
      <div className="pt-32 pb-12 md:pt-40 md:pb-16 bg-surface">
        <div className="container-content">
          <FadeUp>
            <span className="section-label mb-4 block">Our Work</span>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h1 className="font-display text-display-lg text-primary max-w-2xl text-balance">
              A Portfolio Built on Place
            </h1>
          </FadeUp>
          <ArchLine className="mt-8 w-20 !bg-accent" delay={0.2} />
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-bg border-b border-border sticky top-16 md:top-20 z-30">
        <div className="container-content">
          <div className="flex gap-1 overflow-x-auto py-4 scrollbar-none">
            {categories.map((cat) => (
              <a
                key={cat.value}
                href={cat.value ? `/portfolio?category=${cat.value}` : '/portfolio'}
                className={`shrink-0 px-5 py-2 font-body text-sm tracking-wide transition-colors duration-200 ${
                  activeCategory === cat.value
                    ? 'bg-primary text-white'
                    : 'text-text-muted hover:text-primary hover:bg-surface'
                }`}
              >
                {cat.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="section-padding bg-bg">
        <div className="container-content">
          <Suspense fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-[4/3] bg-surface animate-pulse" />
              ))}
            </div>
          }>
            <PortfolioGrid category={activeCategory} />
          </Suspense>
        </div>
      </section>
    </>
  )
}
