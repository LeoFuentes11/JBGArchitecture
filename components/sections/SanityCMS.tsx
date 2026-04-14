import React from 'react'
import { getHeroSlides } from '@/lib/sanity'
import { transformHeroSlides, getDefaultHeader, getDefaultFooter } from '@/lib/transform'
import { HeroSlider } from './HeroSlider'

export async function Hero() {
  const data = await getHeroSlides().catch(() => null)
  const heroData = transformHeroSlides(data)

  return (
    <HeroSlider
      slides={heroData.slides}
      primaryCta={heroData.primaryCta}
      secondaryCta={heroData.secondaryCta}
      establishedBadge={heroData.establishedBadge}
    />
  )
}

export async function Header() {
  const headerData = getDefaultHeader()
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <a href="/" className="flex items-center">
            <span className="text-xl font-serif font-bold text-gray-900">JBG</span>
            <span className="text-xs text-gray-500 ml-1">Architecture</span>
          </a>
          <nav className="hidden md:flex space-x-8">
            {headerData.navItems.map((item) => (
              <a
                key={item.url}
                href={item.url}
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}

export async function Footer() {
  const footerData = getDefaultFooter()
  
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-serif font-bold mb-4">JBG Architecture</h3>
            <p className="text-gray-400 text-sm">Architecture & Interior Design in the Barossa Valley</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              {footerData.navItems.map((item) => (
                <li key={item.url}>
                  <a href={item.url} className="hover:text-white transition-colors">{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-gray-400 text-sm">38 Murray Street</p>
            <p className="text-gray-400 text-sm">Tanunda, SA 5352</p>
            <p className="text-gray-400 text-sm mt-2">+61 8 8563 1155</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">{footerData.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}