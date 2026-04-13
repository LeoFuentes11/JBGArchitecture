'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const portfolioCategories = [
  { label: 'Interior Design', href: '/portfolio?category=interior-design' },
  { label: 'Wine', href: '/portfolio?category=wine' },
  { label: 'Commercial', href: '/portfolio?category=commercial' },
  { label: 'Residential', href: '/portfolio?category=residential' },
  { label: 'Heritage', href: '/portfolio?category=heritage' },
  { label: 'Before + After', href: '/portfolio?category=before-after' },
]

const navLinks = [
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio', hasDropdown: true },
  { label: 'About', href: '/about' },
  { label: 'News', href: '/news' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [portfolioOpen, setPortfolioOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const isHome = pathname === '/'
  const transparent = isHome && !scrolled && !mobileOpen

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        transparent
          ? 'bg-transparent'
          : 'bg-bg/95 backdrop-blur-md border-b border-border'
      }`}
    >
      <nav className="container-content flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="JBG Architects — Home">
          <span
            className={`font-display text-xl tracking-[0.08em] font-medium transition-colors duration-300 ${
              transparent ? 'text-white' : 'text-primary'
            }`}
          >
            JBG
          </span>
          <span
            className={`hidden sm:block h-5 w-px transition-colors duration-300 ${
              transparent ? 'bg-white/40' : 'bg-border'
            }`}
          />
          <span
            className={`hidden sm:block font-body text-xs tracking-[0.12em] uppercase transition-colors duration-300 ${
              transparent ? 'text-white/70' : 'text-text-muted'
            }`}
          >
            Architects
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.hasDropdown ? (
              <div key={link.href} className="relative group" onMouseLeave={() => setPortfolioOpen(false)}>
                <button
                  onMouseEnter={() => setPortfolioOpen(true)}
                  onClick={() => setPortfolioOpen((p) => !p)}
                  className={`font-body text-sm tracking-wide transition-colors duration-200 flex items-center gap-1.5 ${
                    transparent
                      ? 'text-white/80 hover:text-white'
                      : 'text-text-muted hover:text-primary'
                  } ${pathname.startsWith('/portfolio') ? (transparent ? 'text-white' : 'text-primary') : ''}`}
                >
                  {link.label}
                  <svg
                    className={`w-3 h-3 transition-transform duration-200 ${portfolioOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  onMouseEnter={() => setPortfolioOpen(true)}
                  className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 w-52 bg-bg border border-border shadow-xl py-2 transition-all duration-200 ${
                    portfolioOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                  }`}
                >
                    <Link
                      href="/portfolio"
                      className="block px-5 py-2.5 text-sm font-body text-text-muted hover:text-primary hover:bg-surface transition-colors"
                    >
                      All Projects
                    </Link>
                    <div className="my-1 border-t border-border" />
                    {portfolioCategories.map((cat) => (
                      <Link
                      key={cat.href}
                      href={cat.href}
                      className="block px-5 py-2.5 text-sm font-body text-text-muted hover:text-primary hover:bg-surface transition-colors"
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`font-body text-sm tracking-wide transition-colors duration-200 ${
                  transparent
                    ? 'text-white/80 hover:text-white'
                    : 'text-text-muted hover:text-primary'
                } ${pathname === link.href ? (transparent ? 'text-white' : 'text-primary') : ''}`}
              >
                {link.label}
              </Link>
            ),
          )}
          <Link
            href="/contact"
            className={`font-body text-sm tracking-wide px-6 py-2.5 transition-all duration-300 ${
              transparent
                ? 'border border-white/60 text-white hover:bg-white hover:text-primary'
                : 'bg-primary text-white hover:bg-accent'
            }`}
          >
            Contact
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className={`md:hidden p-2 transition-colors ${transparent ? 'text-white' : 'text-primary'}`}
          aria-label="Toggle menu"
        >
          <div className="w-5 flex flex-col gap-1.5">
            <span
              className={`block h-px bg-current transition-all duration-300 ${
                mobileOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block h-px bg-current transition-all duration-300 ${
                mobileOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block h-px bg-current transition-all duration-300 ${
                mobileOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-bg border-t border-border pb-6">
          <div className="container-content pt-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <React.Fragment key={link.href}>
                <Link
                  href={link.href}
                  className="py-3 font-body text-base text-text-muted hover:text-primary border-b border-border/50 transition-colors"
                >
                  {link.label}
                </Link>
                {link.hasDropdown && (
                  <div className="pl-4 flex flex-col gap-0.5 mb-1">
                    {portfolioCategories.map((cat) => (
                      <Link
                        key={cat.href}
                        href={cat.href}
                        className="py-2 font-body text-sm text-text-muted hover:text-primary transition-colors"
                      >
                        {cat.label}
                      </Link>
                    ))}
                  </div>
                )}
              </React.Fragment>
            ))}
            <Link
              href="/contact"
              className="mt-4 btn-primary justify-center"
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
