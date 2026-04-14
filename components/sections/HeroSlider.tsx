'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import type { HeroSlide } from '@/types/cms'

interface HeroSliderProps {
  slides: HeroSlide[]
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
  establishedBadge: string
}

function getImageUrl(image: HeroSlide['image']): { src: string; alt: string } {
  if (typeof image === 'string') return { src: image, alt: '' }
  return { src: image.url, alt: image.alt }
}

export function HeroSlider({ slides, primaryCta, secondaryCta, establishedBadge }: HeroSliderProps) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    slides.forEach((slide) => {
      const { src } = getImageUrl(slide.image)
      const img = new window.Image()
      img.src = src
    })
  }, [slides])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeout(() => {
        setCurrent((c) => (c + 1) % slides.length)
      }, 1200)
    }, 6000)
    return () => clearInterval(timer)
  }, [slides.length])

  const currentSlide = slides[current]
  const currentImage = getImageUrl(currentSlide.image)

  const [year, text] = establishedBadge.replace('Established ', '').split(' ') ?? ['1998', '']
  const badgeParts = establishedBadge.match(/Established\s+(\d+)/)
  const badgeYear = badgeParts ? badgeParts[1] : '1998'

  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden bg-primary">
      <div className="absolute inset-0">
        {slides.map((slide, index) => {
          const img = getImageUrl(slide.image)
          return (
            <div
              key={index}
              className="absolute inset-0 transition-opacity duration-[1200ms]"
              style={{ opacity: index === current ? 1 : 0 }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                priority={index === 0}
                className="object-cover"
                sizes="100vw"
              />
            </div>
          )
        })}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/30 to-primary/60" />
      </div>

      <div className="relative z-10 container-content h-full flex flex-col justify-end pb-16 md:pb-24">
        <div className="max-w-xl backdrop-blur-sm bg-primary/20 border border-white/10 rounded-xl p-6 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`label-${current}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="section-label text-white/60 mb-4"
            >
              {currentSlide.label}
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
              {currentSlide.title}
            </motion.h1>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link href={primaryCta.href} className="btn-primary bg-white text-primary hover:bg-accent hover:text-white">
              {primaryCta.label}
            </Link>
            <Link href={secondaryCta.href} className="btn-outline border-white/60 text-white hover:bg-white hover:text-primary">
              {secondaryCta.label}
            </Link>
          </motion.div>
        </div>

        <div className="absolute bottom-8 right-6 md:right-12 flex gap-2 items-center backdrop-blur-sm bg-primary/20 border border-white/10 px-3 py-2 rounded-full">
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
      </div>

      <div className="absolute top-24 right-6 md:right-12 hidden md:block">
        <div className="backdrop-blur-sm bg-primary/20 border border-white/10 px-4 py-3 text-center rounded-xl">
          <div className="font-body text-[10px] tracking-[0.15em] uppercase text-white/60">Est.</div>
          <div className="font-display text-2xl text-white/80">{badgeYear}</div>
        </div>
      </div>
    </section>
  )
}
