'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeUp } from '@/components/ui/FadeUp'
import type { TestimonialItem } from '@/types/cms'

interface TestimonialSliderProps {
  testimonials: TestimonialItem[]
}

export function TestimonialSlider({ testimonials }: TestimonialSliderProps) {
  const [current, setCurrent] = useState(0)

  return (
    <section className="section-padding bg-primary overflow-hidden">
      <div className="container-content">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-1">
            <FadeUp>
              <div className="flex flex-col gap-3">
                <div className="w-12 h-px bg-accent" />
                <p className="section-label text-white/30">Client Voices</p>
              </div>
            </FadeUp>
          </div>

          <div className="lg:col-span-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <blockquote>
                  <p className="font-display text-display-sm md:text-display-md text-white font-light leading-snug mb-8">
                    &ldquo;{testimonials[current].quote}&rdquo;
                  </p>
                  <footer>
                    <p className="font-body text-sm font-medium text-accent tracking-wide">
                      {testimonials[current].author}
                    </p>
                    <p className="font-body text-xs text-white/30 tracking-wide mt-1">
                      {testimonials[current].role}
                    </p>
                  </footer>
                </blockquote>
              </motion.div>
            </AnimatePresence>

            <div className="mt-12 flex items-center gap-4">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Testimonial ${i + 1}`}
                  className={`h-px transition-all duration-400 ${
                    i === current ? 'w-10 bg-accent' : 'w-4 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
              <div className="ml-auto flex gap-2">
                <button
                  onClick={() => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)}
                  className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/40 hover:text-white hover:border-white/50 transition-all"
                  aria-label="Previous testimonial"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => setCurrent((c) => (c + 1) % testimonials.length)}
                  className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/40 hover:text-white hover:border-white/50 transition-all"
                  aria-label="Next testimonial"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
