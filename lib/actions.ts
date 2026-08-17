'use server'

import { businessInfo } from './businessInfo'

/**
 * Enquiry submission.
 *
 * ⚠️ DELIVERY IS NOT CONFIGURED YET, AND THAT IS DELIBERATE.
 *
 * PROJECT_CONTEXT.md K1 — the business email address has never been supplied.
 * There is nowhere to send an enquiry to. The dangerous version of this file is
 * one that accepts a submission, shows a green "thanks, we'll be in touch"
 * message, and drops the lead on the floor. On a business whose entire site
 * exists to produce enquiries, that is worse than having no form at all,
 * because nobody finds out for weeks.
 *
 * So: until `ETR_ENQUIRY_WEBHOOK_URL` is set, this action FAILS LOUDLY and
 * sends the customer to the phone number, which works today.
 *
 * To turn the form on:
 *   1. Get the business email or a form endpoint from the owner (closes K1).
 *   2. Set `ETR_ENQUIRY_WEBHOOK_URL` in the deployment environment.
 *   3. Submit a test enquiry and confirm it arrives before announcing it.
 */

export type EnquiryState = {
  status: 'idle' | 'success' | 'error'
  message: string
  /** Field-level errors, keyed by input name. */
  errors?: Record<string, string>
}

export const initialEnquiryState: EnquiryState = {
  status: 'idle',
  message: '',
}

function asTrimmedString(value: FormDataEntryValue | null): string {
  return typeof value === 'string' ? value.trim() : ''
}

export async function submitEnquiry(
  _previousState: EnquiryState,
  formData: FormData
): Promise<EnquiryState> {
  const name = asTrimmedString(formData.get('name'))
  const phone = asTrimmedString(formData.get('phone'))
  const email = asTrimmedString(formData.get('email'))
  const suburb = asTrimmedString(formData.get('suburb'))
  const service = asTrimmedString(formData.get('service'))
  const message = asTrimmedString(formData.get('message'))

  // Honeypot. A real person never fills this — it is visually hidden.
  if (asTrimmedString(formData.get('company')) !== '') {
    // Silently accept so the bot does not learn anything.
    return { status: 'success', message: 'Thanks — we will be in touch.' }
  }

  const errors: Record<string, string> = {}
  if (name.length < 2) errors.name = 'Please tell us your name.'
  if (phone.replace(/\D/g, '').length < 8)
    errors.phone = 'Please give us a phone number we can reach you on.'
  if (email !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = 'That email address does not look right.'

  if (Object.keys(errors).length > 0) {
    return {
      status: 'error',
      message: 'Please check the highlighted fields.',
      errors,
    }
  }

  const destination = process.env.ETR_ENQUIRY_WEBHOOK_URL

  if (!destination) {
    // Fail loudly. Never pretend the enquiry was received.
    return {
      status: 'error',
      message: `This form is not connected yet, so your message was not sent. Please call ${businessInfo.phone.display} — that reaches us directly.`,
    }
  }

  try {
    const response = await fetch(destination, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        phone,
        email: email || null,
        suburb: suburb || null,
        service: service || null,
        message: message || null,
        submittedAt: new Date().toISOString(),
      }),
    })

    if (!response.ok) {
      throw new Error(`Enquiry endpoint returned ${response.status}`)
    }
  } catch (error) {
    console.error('[enquiry] delivery failed', error)
    return {
      status: 'error',
      message: `Something went wrong sending your message. Please call ${businessInfo.phone.display} so we do not miss you.`,
    }
  }

  return {
    status: 'success',
    message:
      'Thanks — we have your details and will be in touch to arrange your free on-site measure.',
  }
}
