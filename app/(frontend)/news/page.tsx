import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { FadeUp } from '@/components/ui/FadeUp'
import { ArchLine } from '@/components/ui/ArchLine'
import type { BlogPost, Media } from '@/types/cms'
import { getPayloadClient } from '@/lib/payload'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'News — Latest from JBG',
  description:
    'News, project updates, and design insights from JBG Architects, Barossa Valley, South Australia.',
}

const categoryLabels: Record<string, string> = {
  news: 'News',
  'project-update': 'Projects',
  industry: 'Industry',
  'behind-the-scenes': 'Design Insights',
}

export default async function NewsPage() {
  let displayed: BlogPost[] = []

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'blog-posts',
      where: { status: { equals: 'published' } },
      limit: 50,
      sort: '-publishedAt',
    })
    displayed = result.docs as unknown as BlogPost[]
  } catch {
    // Show empty state
  }

  return (
    <>
      {/* Page Hero */}
      <div className="pt-32 pb-16 md:pt-40 md:pb-20 bg-surface">
        <div className="container-content">
          <FadeUp>
            <span className="section-label mb-4 block">News & Insights</span>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h1 className="font-display text-display-lg text-primary max-w-2xl text-balance">
              Latest from JBG Architects
            </h1>
          </FadeUp>
          <ArchLine className="mt-8 w-20 !bg-accent" delay={0.2} />
        </div>
      </div>

      {/* Posts */}
      <section className="section-padding bg-bg">
        <div className="container-content">
          {displayed.length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-body text-text-muted">No posts published yet. Check back soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayed.map((post, i) => {
                const heroImage = typeof post.heroImage !== 'string' ? post.heroImage as Media : null
                return (
                  <FadeUp key={post.id} delay={i * 0.08}>
                    <Link href={`/news/${post.slug}`} className="group block">
                      {heroImage?.url && (
                        <div className="relative aspect-[16/9] overflow-hidden bg-surface mb-5">
                          <Image
                            src={heroImage.url}
                            alt={heroImage.alt || post.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                      )}
                      <div className="flex items-center gap-3 mb-3">
                        {post.category && (
                          <span className="section-label">
                            {categoryLabels[post.category] ?? post.category}
                          </span>
                        )}
                        {post.publishedAt && (
                          <>
                            <span className="text-border text-xs">·</span>
                            <time className="font-body text-xs text-text-muted/60" dateTime={post.publishedAt}>
                              {new Date(post.publishedAt).toLocaleDateString('en-AU', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              })}
                            </time>
                          </>
                        )}
                      </div>
                      <h3 className="font-display text-xl text-primary mb-2 group-hover:text-accent transition-colors duration-300">
                        {post.title}
                      </h3>
                      <p className="font-body text-sm leading-relaxed text-text-muted line-clamp-3">
                        {post.excerpt}
                      </p>
                    </Link>
                  </FadeUp>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
