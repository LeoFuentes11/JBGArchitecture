'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const slides = [
  {
    src: '/images/placeholder-commercial.jpg',
    alt: 'Barossa Valley winery architecture',
    label: 'Winery Architecture',
    title: 'Crafted for the\nBarossa',
  },
  {
    src: '/images/placeholder-heritage.jpg',
    alt: 'Heritage architecture restoration',
    label: 'Heritage Architecture',
    title: 'Honouring the\nPast',
  },
  {
    src: '/images/placeholder-residential.jpg',
    alt: 'Contemporary residential design',
    label: 'Residential Design',
    title: 'Homes That\nEndure',
  },
]

export function Hero() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const slide = slides[current]

  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden bg-primary">
      {/* Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/30 to-primary/60" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 container-content h-full flex flex-col justify-end pb-16 md:pb-24">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={`label-${current}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="section-label text-white/60 mb-4"
            >
              {slide.label}
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.h1
              key={`title-${current}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-display-xl text-white whitespace-pre-line mb-8"
            >
              {slide.title}
            </motion.h1>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link href="/portfolio" className="btn-primary bg-white text-primary hover:bg-accent hover:text-white">
              View Portfolio
            </Link>
            <Link href="/contact" className="btn-outline border-white/60 text-white hover:bg-white hover:text-primary">
              Start a Project
            </Link>
          </motion.div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 right-6 md:right-12 flex gap-2 items-center">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-px transition-all duration-500 ${
                i === current ? 'w-12 bg-white' : 'w-4 bg-white/30'
              }`}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="section-label text-white/40 text-[10px]">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent"
          />
        </motion.div>
      </div>

      {/* Established badge */}
      <div className="absolute top-24 right-6 md:right-12 hidden md:block">
        <div className="border border-white/20 px-4 py-3 text-center">
          <div className="font-body text-[10px] tracking-[0.15em] uppercase text-white/40">Est.</div>
          <div className="font-display text-2xl text-white/60">1998</div>
        </div>
      </div>
    </section>
  )
}
