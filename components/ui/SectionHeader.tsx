import React from 'react'
import { FadeUp } from './FadeUp'
import { ArchLine } from './ArchLine'

interface SectionHeaderProps {
  label?: string
  title: string
  subtitle?: string
  centered?: boolean
  className?: string
}

export function SectionHeader({
  label,
  title,
  subtitle,
  centered = false,
  className = '',
}: SectionHeaderProps) {
  const align = centered ? 'text-center items-center' : 'items-start'

  return (
    <div className={`flex flex-col ${align} gap-4 ${className}`}>
      {label && (
        <FadeUp>
          <span className="section-label">{label}</span>
        </FadeUp>
      )}
      <FadeUp delay={0.08}>
        <h2 className={`font-display text-display-md text-primary text-balance ${centered ? 'max-w-3xl' : ''}`}>
          {title}
        </h2>
      </FadeUp>
      {!centered && <ArchLine className="w-16 !bg-accent" delay={0.15} />}
      {subtitle && (
        <FadeUp delay={0.18}>
          <p className={`font-body text-base md:text-lg leading-relaxed text-text-muted ${centered ? 'max-w-2xl' : 'max-w-prose-wide'}`}>
            {subtitle}
          </p>
        </FadeUp>
      )}
    </div>
  )
}
