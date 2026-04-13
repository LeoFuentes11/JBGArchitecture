import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import '../globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://jbgarchitects.com'),
  title: {
    template: '%s — JBG Architects',
    default: 'JBG Architects | Premier Architecture South Australia',
  },
  description:
    'JBG Architects — regional architecture firm based in the Barossa Valley, South Australia. Specialising in residential, winery, commercial, heritage and interior design since 1998.',
  keywords: [
    'architecture South Australia',
    'Barossa Valley architects',
    'regional architecture SA',
    'winery architecture',
    'residential architects Adelaide',
    'heritage architecture',
    'JBG Architects',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://jbgarchitects.com',
    siteName: 'JBG Architects',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'JBG Architects — Regional Architecture South Australia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="bg-bg text-text antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
