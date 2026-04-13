import React from 'react'
import Link from 'next/link'
import { FadeUp } from '@/components/ui/FadeUp'

export function ContactCTA() {
  return (
    <section className="section-padding bg-surface">
      <div className="container-content">
        <div className="max-w-3xl mx-auto text-center">
          <FadeUp>
            <span className="section-label mb-6 block">Start Your Project</span>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h2 className="font-display text-display-lg text-primary mb-6 text-balance">
              Let&apos;s Talk About Your Vision
            </h2>
          </FadeUp>
          <FadeUp delay={0.16}>
            <p className="font-body text-base md:text-lg leading-relaxed text-text-muted mb-10 max-w-xl mx-auto">
              Whether you have a clear brief or just a seed of an idea, we&apos;d love to hear about
              your project. Our team is approachable, responsive, and passionate about regional design.
            </p>
          </FadeUp>
          <FadeUp delay={0.22}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact" className="btn-primary">
                Make an Enquiry
              </Link>
              <a href="tel:+61885631155" className="btn-outline flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                +61 8 8563 1155
              </a>
            </div>
          </FadeUp>

          <FadeUp delay={0.28} className="mt-12 pt-12 border-t border-border">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-sm font-body text-text-muted">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span>38 Murray Street, Tanunda SA 5352</span>
              </div>
              <span className="hidden sm:block text-border">|</span>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <a href="mailto:admin@jbgarchitects.com" className="hover:text-primary transition-colors">
                  admin@jbgarchitects.com
                </a>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
