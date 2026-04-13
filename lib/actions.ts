'use server'

import { Resend } from 'resend'
import { z } from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY)

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  projectType: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export type ContactFormState = {
  success: boolean
  message: string
  errors?: Record<string, string[]>
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const raw = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    phone: formData.get('phone') as string,
    projectType: formData.get('projectType') as string,
    message: formData.get('message') as string,
  }

  const parsed = contactSchema.safeParse(raw)

  if (!parsed.success) {
    return {
      success: false,
      message: 'Please correct the errors below.',
      errors: parsed.error.flatten().fieldErrors,
    }
  }

  const { name, email, phone, projectType, message } = parsed.data

  try {
    await resend.emails.send({
      from: 'JBG Architects Website <noreply@jbgarchitects.com>',
      to: ['admin@jbgarchitects.com'],
      replyTo: email,
      subject: `New Enquiry from ${name}${projectType ? ` — ${projectType}` : ''}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1A1918; border-bottom: 2px solid #9B8B6E; padding-bottom: 12px;">
            New Website Enquiry
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #6B6561; width: 120px;">Name</td><td style="padding: 8px 0; font-weight: 500;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #6B6561;">Email</td><td style="padding: 8px 0;">${email}</td></tr>
            ${phone ? `<tr><td style="padding: 8px 0; color: #6B6561;">Phone</td><td style="padding: 8px 0;">${phone}</td></tr>` : ''}
            ${projectType ? `<tr><td style="padding: 8px 0; color: #6B6561;">Project Type</td><td style="padding: 8px 0;">${projectType}</td></tr>` : ''}
          </table>
          <div style="margin-top: 24px; background: #F0EDE8; padding: 20px; border-radius: 4px;">
            <p style="color: #6B6561; margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em;">Message</p>
            <p style="color: #1A1918; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="margin-top: 24px; font-size: 12px; color: #6B6561;">
            Sent from jbgarchitects.com contact form
          </p>
        </div>
      `,
    })

    return {
      success: true,
      message:
        "Thank you for your enquiry. We'll be in touch within 1–2 business days.",
    }
  } catch {
    return {
      success: false,
      message: 'Something went wrong. Please try calling us directly on +61 8 8563 1155.',
    }
  }
}
