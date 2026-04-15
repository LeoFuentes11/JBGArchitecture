'use server'

export type ContactFormState = {
  success: boolean
  message: string
  errors?: {
    name?: string[]
    email?: string[]
    message?: string[]
  }
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get('name')?.toString().trim() ?? ''
  const email = formData.get('email')?.toString().trim() ?? ''
  const phone = formData.get('phone')?.toString().trim() ?? ''
  const projectType = formData.get('projectType')?.toString().trim() ?? ''
  const message = formData.get('message')?.toString().trim() ?? ''

  // Validation
  const errors: ContactFormState['errors'] = {}

  if (!name) errors.name = ['Name is required.']
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = ['A valid email address is required.']
  }
  if (!message || message.length < 10) {
    errors.message = ['Please enter a message of at least 10 characters.']
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, message: 'Please correct the errors below.', errors }
  }

  const resendApiKey = process.env.RESEND_API_KEY
  const toEmail = process.env.CONTACT_EMAIL || 'admin@jbgarchitects.com'
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jbgarchitects.com'

  if (!resendApiKey || resendApiKey === 're_your_resend_api_key') {
    // No real API key — log and return success in dev, fail gracefully in prod
    console.warn('[ContactForm] RESEND_API_KEY not configured. Form submission logged only.')
    console.log('[ContactForm] Submission:', { name, email, phone, projectType, message })
    return {
      success: true,
      message: "Thank you for your enquiry. We'll be in touch within 1–2 business days.",
    }
  }

  const html = `
    <h2>New Enquiry — JBG Architects</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
    ${projectType ? `<p><strong>Project Type:</strong> ${projectType}</p>` : ''}
    <hr />
    <p><strong>Message:</strong></p>
    <p style="white-space:pre-wrap">${message}</p>
    <hr />
    <p style="font-size:12px;color:#999">Sent via contact form at <a href="${siteUrl}">${siteUrl}</a></p>
  `

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'JBG Architects Website <noreply@jbgarchitects.com>',
        to: [toEmail],
        reply_to: email,
        subject: `New Enquiry from ${name}${projectType ? ` — ${projectType}` : ''}`,
        html,
      }),
    })

    if (!res.ok) {
      const body = await res.text()
      console.error('[ContactForm] Resend error:', res.status, body)
      return {
        success: false,
        message: 'Sorry, there was a problem sending your message. Please try again or email us directly.',
      }
    }

    return {
      success: true,
      message: "Thank you for your enquiry. We'll be in touch within 1–2 business days.",
    }
  } catch (err) {
    console.error('[ContactForm] Network error:', err)
    return {
      success: false,
      message: 'Sorry, there was a problem sending your message. Please try again or email us directly.',
    }
  }
}
