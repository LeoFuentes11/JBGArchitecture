import type { Metadata } from 'next'
import { FadeUp } from '@/components/ui/FadeUp'
import { ArchLine } from '@/components/ui/ArchLine'
import { ContactForm } from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact — Start a Conversation',
  description:
    'Get in touch with JBG Architects. Based in Tanunda, Barossa Valley — we work with clients across South Australia and beyond.',
}

export default function ContactPage() {
  return (
    <>
      {/* Page Hero */}
      <div className="pt-32 pb-16 md:pt-40 md:pb-20 bg-surface">
        <div className="container-content">
          <FadeUp>
            <span className="section-label mb-4 block">Let&apos;s Talk</span>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h1 className="font-display text-display-lg text-primary max-w-2xl text-balance">
              Start a Conversation About Your Project
            </h1>
          </FadeUp>
          <ArchLine className="mt-8 w-20 !bg-accent" delay={0.2} />
        </div>
      </div>

      {/* Content */}
      <section className="section-padding bg-bg">
        <div className="container-content">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24">
            {/* Contact details */}
            <div className="lg:col-span-2">
              <FadeUp>
                <h2 className="font-display text-2xl text-primary mb-8">Contact Details</h2>
              </FadeUp>

              <div className="space-y-8">
                <FadeUp delay={0.08}>
                  <div>
                    <p className="section-label mb-3">Address</p>
                    <address className="not-italic font-body text-base text-text-muted leading-relaxed">
                      38 Murray Street<br />
                      Tanunda SA 5352<br />
                      Australia
                    </address>
                  </div>
                </FadeUp>

                <FadeUp delay={0.12}>
                  <div>
                    <p className="section-label mb-3">Phone</p>
                    <a
                      href="tel:+61885631155"
                      className="font-body text-base text-text-muted hover:text-primary transition-colors"
                    >
                      +61 8 8563 1155
                    </a>
                  </div>
                </FadeUp>

                <FadeUp delay={0.16}>
                  <div>
                    <p className="section-label mb-3">Email</p>
                    <a
                      href="mailto:admin@jbgarchitects.com"
                      className="font-body text-base text-text-muted hover:text-primary transition-colors"
                    >
                      admin@jbgarchitects.com
                    </a>
                  </div>
                </FadeUp>

                <FadeUp delay={0.2}>
                  <div>
                    <p className="section-label mb-3">Office Hours</p>
                    <div className="font-body text-base text-text-muted leading-relaxed">
                      Monday – Friday<br />
                      8:30am – 5:30pm
                    </div>
                  </div>
                </FadeUp>
              </div>

              {/* Map placeholder */}
              <FadeUp delay={0.28} className="mt-10">
                <div className="bg-surface border border-border aspect-video flex items-center justify-center">
                  <a
                    href="https://maps.google.com/?q=38+Murray+Street+Tanunda+SA+5352"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm text-text-muted hover:text-primary flex items-center gap-2 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    View on Google Maps
                  </a>
                </div>
              </FadeUp>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <FadeUp delay={0.1}>
                <ContactForm />
              </FadeUp>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
