import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import { importMap } from '../importMap.js'
import type { Metadata } from 'next'
import config from '@payload-config'

type Args = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}

export const generateMetadata = async ({ params, searchParams }: Args): Promise<Metadata> => {
  return generatePageMetadata({ config: Promise.resolve(config), params, searchParams })
}

const Page = async ({ params, searchParams }: Args) => {
  return RootPage({ config: Promise.resolve(config), importMap, params, searchParams })
}

export default Page
