import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Payload } from 'payload'

let cached: Payload | null = null

export async function getPayloadClient(): Promise<Payload> {
  if (cached) return cached
  cached = await getPayload({ config: configPromise })
  return cached
}
