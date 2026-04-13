import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(): Promise<Metadata> {
  return { title: 'Portfolio' }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  await params
  notFound()
}
