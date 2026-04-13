import React from 'react'
import Link from 'next/link'

const portfolioLinks = [
  { label: 'Interior Design', href: '/portfolio?category=interior-design' },
  { label: 'Wine', href: '/portfolio?category=wine' },
  { label: 'Commercial', href: '/portfolio?category=commercial' },
  { label: 'Residential', href: '/portfolio?category=residential' },
  { label: 'Heritage', href: '/portfolio?category=heritage' },
  { label: 'Before + After', href: '/portfolio?category=before-after' },
]

export function Footer() {
  return (
    <footer className="bg-primary text-white/70">
      <div className="container-content py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="font-display text-2xl tracking-[0.08em] text-white mb-3">
              JBG
            </div>
            <div className="font-body text-xs tracking-[0.12em] uppercase text-white/40 mb-6">
              Architects
            </div>
            <p className="font-body text-sm leading-relaxed text-white/50">
              Regional architecture with a passion for community, lifestyle, and the unique character
              of South Australia.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="section-label text-white/30 mb-5">Navigation</p>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '/' },
                { label: 'Services', href: '/services' },
                { label: 'About', href: '/about' },
                { label: 'News', href: '/news' },
                { label: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-white/50 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Portfolio */}
          <div>
            <p className="section-label text-white/30 mb-5">Portfolio</p>
            <ul className="space-y-3">
              {portfolioLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-white/50 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="section-label text-white/30 mb-5">Get In Touch</p>
            <address className="not-italic space-y-3">
              <div>
                <a
                  href="tel:+61885631155"
                  className="font-body text-sm text-white/50 hover:text-white transition-colors duration-200 block"
                >
                  +61 8 8563 1155
                </a>
              </div>
              <div>
                <a
                  href="mailto:admin@jbgarchitects.com"
                  className="font-body text-sm text-white/50 hover:text-white transition-colors duration-200 block"
                >
                  admin@jbgarchitects.com
                </a>
              </div>
              <div className="font-body text-sm text-white/40 leading-relaxed">
                38 Murray Street<br />
                Tanunda SA 5352<br />
                Australia
              </div>
            </address>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 border border-white/20 px-6 py-2.5 text-sm font-body text-white/60 hover:text-white hover:border-white/50 transition-all duration-300"
            >
              Enquire Now
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="font-body text-xs text-white/30">
            © {new Date().getFullYear()} JBG Architects. Est. 1998. All rights reserved.
          </p>
          <p className="font-body text-xs text-white/20">
            Text and images are copyright of JBG Architects and must not be reproduced without permission.
          </p>
        </div>
      </div>
    </footer>
  )
}
