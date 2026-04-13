import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(): Promise<Metadata> {
  return { title: 'News' }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  await params
  notFound()
}
