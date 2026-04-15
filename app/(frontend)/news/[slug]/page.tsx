import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getPostBySlug, getPosts } from '@/lib/sanity'
import { transformPost } from '@/lib/transform'
import { FadeUp } from '@/components/ui/FadeUp'
import { ArchLine } from '@/components/ui/ArchLine'

export const revalidate = 60

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug).then(transformPost)
  if (!post) return { title: 'Post Not Found' }
  return {
    title: `${post.title} — JBG Architects`,
    description: post.excerpt,
  }
}

export async function generateStaticParams() {
  try {
    const posts = await getPosts(200)
    return posts.map((post: any) => ({ slug: post.slug?.current || post.slug }))
  } catch {
    return []
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const rawPost = await getPostBySlug(slug)
  const post = transformPost(rawPost)

  if (!post) notFound()

  return (
    <>
      <div className="pt-32 pb-12 md:pt-40 md:pb-16 bg-surface">
        <div className="container-content max-w-3xl">
          <FadeUp>
            <div className="flex items-center gap-3 mb-5">
              {post.category && (
                <span className="section-label">{post.category}</span>
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
          </FadeUp>
          <FadeUp delay={0.08}>
            <h1 className="font-display text-display-md text-primary text-balance">
              {post.title}
            </h1>
          </FadeUp>
          {post.excerpt && (
            <FadeUp delay={0.14}>
              <p className="mt-5 font-body text-lg leading-relaxed text-text-muted">
                {post.excerpt}
              </p>
            </FadeUp>
          )}
          <ArchLine className="mt-8 w-16 !bg-accent" delay={0.2} />
        </div>
      </div>

      {post.heroImage && (
        <div className="bg-bg">
          <div className="container-content max-w-3xl">
            <div className="relative aspect-[16/9] overflow-hidden bg-surface">
              <Image
                src={post.heroImage}
                alt={post.title}
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
            href="/news"
            className="inline-flex items-center gap-2 font-body text-sm text-text-muted hover:text-primary transition-colors duration-200"
          >
            <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            Back to News
          </Link>
        </div>
      </div>
    </>
  )
}