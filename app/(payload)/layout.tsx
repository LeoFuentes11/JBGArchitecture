import { RootLayout } from '@payloadcms/next/layouts'
import configPromise from '@payload-config'
import React from 'react'

export const metadata = {
  title: 'JBG Architecture CMS',
}

export default async function PayloadLayout({ children }: { children: React.ReactNode }) {
  return (
    <RootLayout config={configPromise}>
      {children}
    </RootLayout>
  )
}
