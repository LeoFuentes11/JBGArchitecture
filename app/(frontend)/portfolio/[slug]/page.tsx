import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getPageBySlug, getPages } from '@/lib/sanity'
import { FadeUp } from '@/components/ui/FadeUp'
import { ArchLine } from '@/components/ui/ArchLine'

export const revalidate = 60

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const page = await getPageBySlug(slug)
  if (!page) return { title: 'Page Not Found' }
  return {
    title: `${page.title} — JBG Architects`,
    description: 'View project details',
  }
}

export async function generateStaticParams() {
  try {
    const pages = await getPages()
    return pages.map((page: any) => ({ slug: page.slug?.current || page.slug }))
  } catch {
    return []
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const page = await getPageBySlug(slug)

  if (!page) notFound()

  return (
    <>
      <div className="pt-32 pb-12 md:pt-40 md:pb-16 bg-surface">
        <div className="container-content max-w-3xl">
          <FadeUp>
            <h1 className="font-display text-display-md text-primary text-balance">
              {page.title}
            </h1>
          </FadeUp>
          <ArchLine className="mt-8 w-16 !bg-accent" delay={0.2} />
        </div>
      </div>

      {page.mainImage?.url && (
        <div className="bg-bg">
          <div className="container-content max-w-3xl">
            <div className="relative aspect-[16/9] overflow-hidden bg-surface">
              <Image
                src={page.mainImage.url}
                alt={page.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 800px"
              />
            </div>
          </div>
        </div>
      )}

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