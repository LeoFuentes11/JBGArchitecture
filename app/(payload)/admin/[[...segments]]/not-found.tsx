import { NotFoundPage } from '@payloadcms/next/views'
import { importMap } from '../importMap.js'
import config from '@payload-config'

type Args = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}

const NotFound = async ({ params, searchParams }: Args) => {
  return NotFoundPage({ config: Promise.resolve(config), importMap, params, searchParams })
}

export default NotFound
