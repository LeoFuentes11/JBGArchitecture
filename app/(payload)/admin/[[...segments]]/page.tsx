import type { Metadata } from 'next'
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'

export const maxDuration = 60
import configPromise from '@payload-config'
import { importMap } from '../importMap.js'

type Args = {
  params: Promise<{
    segments: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

export async function generateMetadata({ params, searchParams }: Args): Promise<Metadata> {
  const resolvedParams = await params
  return generatePageMetadata({
    config: configPromise,
    params: Promise.resolve(resolvedParams as Record<string, string | string[]>),
    searchParams,
  })
}

export default async function Page({ params, searchParams }: Args) {
  return RootPage({
    config: configPromise,
    importMap,
    params,
    searchParams,
  })
}
