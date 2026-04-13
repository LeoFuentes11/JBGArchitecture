'use client'

import React, { useActionState } from 'react'
import { submitContactForm, type ContactFormState } from '@/lib/actions'

const initialState: ContactFormState = { success: false, message: '' }

const projectTypes = [
  'Sketch Only Service',
  'Full Architectural Service',
  'Design & Documentation',
  'Extended Service',
  'Residential',
  'Winery / Cellar Door',
  'Commercial',
  'Heritage',
  'Interior Design',
  'Other / Not Sure Yet',
]

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactForm, initialState)

  if (state.success) {
    return (
      <div className="bg-surface border border-border p-10 text-center">
        <div className="w-12 h-12 border border-accent flex items-center justify-center mx-auto mb-6">
          <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="font-display text-2xl text-primary mb-3">Thank You</h3>
        <p className="font-body text-base text-text-muted">{state.message}</p>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-6">
      <h2 className="font-display text-2xl text-primary mb-8">Send an Enquiry</h2>

      {state.message && !state.success && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 font-body text-sm">
          {state.message}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="section-label block mb-2">
            Name <span className="text-accent">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="w-full bg-bg border border-border px-4 py-3 font-body text-sm text-text placeholder:text-text-muted/50 focus:outline-none focus:border-accent transition-colors"
            placeholder="Your full name"
          />
          {state.errors?.name && (
            <p className="mt-1 font-body text-xs text-red-500">{state.errors.name[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="section-label block mb-2">
            Email <span className="text-accent">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full bg-bg border border-border px-4 py-3 font-body text-sm text-text placeholder:text-text-muted/50 focus:outline-none focus:border-accent transition-colors"
            placeholder="your@email.com"
          />
          {state.errors?.email && (
            <p className="mt-1 font-body text-xs text-red-500">{state.errors.email[0]}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="section-label block mb-2">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className="w-full bg-bg border border-border px-4 py-3 font-body text-sm text-text placeholder:text-text-muted/50 focus:outline-none focus:border-accent transition-colors"
            placeholder="+61 4xx xxx xxx"
          />
        </div>

        <div>
          <label htmlFor="projectType" className="section-label block mb-2">
            Project Type
          </label>
          <select
            id="projectType"
            name="projectType"
            className="w-full bg-bg border border-border px-4 py-3 font-body text-sm text-text focus:outline-none focus:border-accent transition-colors appearance-none"
          >
            <option value="">Select a type…</option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="section-label block mb-2">
          Message <span className="text-accent">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="w-full bg-bg border border-border px-4 py-3 font-body text-sm text-text placeholder:text-text-muted/50 focus:outline-none focus:border-accent transition-colors resize-none"
          placeholder="Tell us about your project — location, scope, timeline, any questions…"
        />
        {state.errors?.message && (
          <p className="mt-1 font-body text-xs text-red-500">{state.errors.message[0]}</p>
        )}
      </div>

      <div>
        <button
          type="submit"
          disabled={pending}
          className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {pending ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Sending…
            </>
          ) : (
            'Send Enquiry'
          )}
        </button>
        <p className="mt-3 font-body text-xs text-text-muted text-center">
          We respond within 1–2 business days.
        </p>
      </div>
    </form>
  )
}
