'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface ArchLineProps {
  className?: string
  delay?: number
  vertical?: boolean
}

export function ArchLine({ className = '', delay = 0, vertical = false }: ArchLineProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.span
      ref={ref}
      initial={{ scaleX: vertical ? 1 : 0, scaleY: vertical ? 0 : 1 }}
      animate={
        isInView
          ? { scaleX: 1, scaleY: 1 }
          : { scaleX: vertical ? 1 : 0, scaleY: vertical ? 0 : 1 }
      }
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformOrigin: vertical ? 'top center' : 'left center' }}
      className={`block bg-border ${vertical ? 'w-px h-full' : 'h-px w-full'} ${className}`}
      aria-hidden
    />
  )
}
