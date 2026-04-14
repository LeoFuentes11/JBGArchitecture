import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
import configPromise from '@payload-config'
import type { ServerFunctionClient } from 'payload'
import React from 'react'
import { importMap } from './admin/importMap.js'
import '@payloadcms/ui/css'
import '@/admin/custom.scss'

export const metadata = {
  title: 'JBG Architecture CMS',
}

const serverFunction: ServerFunctionClient = async function (args) {
  'use server'
  return handleServerFunctions({
    ...args,
    config: configPromise,
    importMap,
  })
}

export default async function PayloadLayout({ children }: { children: React.ReactNode }) {
  return (
    <RootLayout config={configPromise} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  )
}
