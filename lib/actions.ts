'use server'

import { Resend } from 'resend'
import { businessInfo } from './businessInfo'
import type { EnquiryState } from './enquiry'

/**
 * Enquiry submission.
 *
 * ⚠️ THIS FILE MAY EXPORT ASYNC FUNCTIONS AND NOTHING ELSE.
 * `'use server'` compiles every export into a server-action reference, so a
 * plain value export is invalid and fails at RUNTIME in production with an
 * opaque "A server error occurred" page. That bug shipped on 2026-08-20.
 * Types and shared values live in `lib/enquiry.ts`. Keep it that way.
 *
 * HOW DELIVERY WORKS
 * -----------------------------------------------------------------------
 * The customer submits → this runs on the server → Resend's API sends the
 * enquiry as an email to ETR. Resend is server-only; it never reaches the
 * browser, so it adds nothing to the page weight the performance budget
 * governs (D-34).
 *
 * Three environment variables, set in Vercel → Settings → Environment Variables:
 *
 *   RESEND_API_KEY     required. From resend.com → API Keys.
 *   ETR_ENQUIRY_TO     where enquiries land. Defaults to the published address.
 *   ETR_ENQUIRY_FROM   the sender. MUST be on a domain verified in Resend.
 *
 * ⚠️ Verifying a sending domain in Resend means adding SPF/DKIM **TXT** records.
 * `elitetouchrenovations.au` receives mail through Google Workspace, so it
 * already has an SPF record — **merge Resend into the existing SPF record, do
 * not add a second one.** Two SPF records on one domain is invalid and will
 * damage deliverability for normal business email too.
 *
 * If the key is missing this action FAILS LOUDLY and sends the customer to the
 * phone. It never pretends an enquiry was received. On a business whose whole
 * purpose is enquiries, a silently swallowed lead is the worst outcome
 * available — nobody finds out for weeks.
 */

function asTrimmedString(value: FormDataEntryValue | null): string {
  return typeof value === 'string' ? value.trim() : ''
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
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
    // Silently accept so the bot learns nothing.
    return { status: 'success', message: 'Thanks — we will be in touch.' }
  }

  const errors: Record<string, string> = {}
  if (name.length < 2) errors.name = 'Please tell us your name.'
  if (phone.replace(/\D/g, '').length < 8)
    errors.phone = 'Please give us a phone number we can reach you on.'
  /* Email is REQUIRED (owner instruction 2026-08-20). It was optional; the
     owner wants a written record and a reply path for every enquiry, and the
     Resend delivery sets reply-to from it. */
  if (email === '') errors.email = 'Please give us your email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = 'That email address does not look right.'

  if (Object.keys(errors).length > 0) {
    return {
      status: 'error',
      message: 'Please check the highlighted fields.',
      errors,
    }
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.ETR_ENQUIRY_TO || businessInfo.email.primary
  const from = process.env.ETR_ENQUIRY_FROM

  if (!apiKey || !from) {
    console.error(
      '[enquiry] not configured — missing RESEND_API_KEY and/or ETR_ENQUIRY_FROM'
    )
    return {
      status: 'error',
      message: `This form is not connected yet, so your message was not sent. Please call ${businessInfo.phone.display} — that reaches us directly.`,
    }
  }

  const rows: Array<[string, string]> = [
    ['Name', name],
    ['Phone', phone],
    ['Email', email || '—'],
    ['Suburb', suburb || '—'],
    ['Renovating', service || 'Not sure yet'],
    ['Message', message || '—'],
  ]

  try {
    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from,
      to: [to],
      subject: `New enquiry — ${name}${suburb ? `, ${suburb}` : ''}`,
      // Reply goes straight back to the customer where we have their address.
      replyTo: email,
      text: rows.map(([k, v]) => `${k}: ${v}`).join('\n'),
      html: `<h2>New website enquiry</h2><table cellpadding="6">${rows
        .map(
          ([k, v]) =>
            `<tr><td><strong>${k}</strong></td><td>${escapeHtml(v).replace(
              /\n/g,
              '<br>'
            )}</td></tr>`
        )
        .join('')}</table>`,
    })

    if (error) {
      throw new Error(`${error.name}: ${error.message}`)
    }
  } catch (caught) {
    console.error('[enquiry] delivery failed', caught)
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
