import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getBlogPostBySlug } from '@/lib/payload'
import { FadeUp } from '@/components/ui/FadeUp'
import { ArchLine } from '@/components/ui/ArchLine'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  try {
    const post = await getBlogPostBySlug(slug)
    if (!post) return { title: 'Post Not Found' }
    return {
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
    }
  } catch {
    return { title: 'News' }
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  let post = null
  try {
    post = await getBlogPostBySlug(slug)
  } catch {
    // CMS unavailable
  }

  if (!post) notFound()

  return (
    <>
      <div className="pt-32 pb-12 md:pt-40 md:pb-16 bg-surface">
        <div className="container-content max-w-3xl">
          <FadeUp>
            <Link href="/news" className="btn-ghost mb-8 block">
              ← All News
            </Link>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h1 className="font-display text-display-md text-primary text-balance">{post.title}</h1>
          </FadeUp>
          <ArchLine className="mt-6 w-16 !bg-accent" delay={0.15} />
          {post.publishedAt && (
            <FadeUp delay={0.2} className="mt-4">
              <time className="font-body text-sm text-text-muted" dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString('en-AU', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </time>
            </FadeUp>
          )}
        </div>
      </div>

      {post.heroImage && typeof post.heroImage !== 'string' && (
        <div className="relative aspect-[21/9] bg-surface overflow-hidden">
          <Image
            src={(post.heroImage as { url: string }).url}
            alt={(post.heroImage as { alt: string }).alt || post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
      )}

      <section className="section-padding bg-bg">
        <div className="container-content max-w-3xl">
          <FadeUp>
            <div className="prose-jbg">
              <p className="font-body text-lg leading-relaxed text-text-muted mb-8">{post.excerpt}</p>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
