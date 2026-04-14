import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'JBG Architecture | Barossa Valley',
  description: 'Architecture & Interior Design in the Barossa Valley',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}