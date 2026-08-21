'use server'

import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'
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
 * HOW DELIVERY WORKS (D-85)
 * -----------------------------------------------------------------------
 * The customer submits → this runs on the server → THREE things happen:
 *
 *   1. An email to ETR (`ETR_ENQUIRY_TO`) with the full enquiry. This is the
 *      CRITICAL path — if it fails, the action fails loudly (see below).
 *   2. A best-effort confirmation email back to the customer. If this fails,
 *      the submission still succeeds — the business already has the lead
 *      from step 1, and a missing confirmation email is a poor experience,
 *      not a lost enquiry.
 *   3. A best-effort copy of the lead written to Supabase (`enquiries` table,
 *      project `isrrvsezqwhhjmfzmujw`), as a queryable backup of the email.
 *      Also never blocks success — same reasoning as step 2.
 *
 * Both Resend and Supabase are server-only libraries; neither reaches the
 * browser, so neither adds anything to the page weight the performance
 * budget governs (D-34, D-78).
 *
 * Environment variables, set in Vercel → Settings → Environment Variables:
 *
 *   RESEND_API_KEY               required for email. From resend.com → API Keys.
 *   ETR_ENQUIRY_TO                where the office notification lands. Defaults
 *                                  to the published address.
 *   ETR_ENQUIRY_FROM              the sender for BOTH emails. MUST be on a
 *                                  domain verified in Resend.
 *   SUPABASE_URL                  optional — defaults to the project above.
 *   SUPABASE_SERVICE_ROLE_KEY     required for the Supabase write. Without it,
 *                                  step 3 is skipped silently (email delivery
 *                                  is unaffected) — see the guard below.
 *
 * ⚠️ Verifying a sending domain in Resend means adding SPF/DKIM **TXT** records.
 * `elitetouchrenovations.au` receives mail through Google Workspace, so it
 * already has an SPF record — **merge Resend into the existing SPF record, do
 * not add a second one.** Two SPF records on one domain is invalid and will
 * damage deliverability for normal business email too.
 *
 * ⚠️ `SUPABASE_SERVICE_ROLE_KEY` bypasses Row Level Security and must NEVER be
 * prefixed `NEXT_PUBLIC_` or referenced from a client component — it belongs
 * only in this `'use server'` module.
 *
 * If Resend is not configured this action FAILS LOUDLY and sends the customer
 * to the phone. It never pretends an enquiry was received. On a business
 * whose whole purpose is enquiries, a silently swallowed lead is the worst
 * outcome available — nobody finds out for weeks.
 */

const supabaseUrl =
  process.env.SUPABASE_URL || 'https://isrrvsezqwhhjmfzmujw.supabase.co'
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

/** `null` when unconfigured — the Supabase write is skipped, not attempted. */
const supabase = supabaseServiceRoleKey
  ? createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: { persistSession: false },
    })
  : null

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

  const resend = new Resend(apiKey)

  // 1. Office notification — CRITICAL PATH. Failure here fails the whole
  //    submission (D-47): this is the one place a lost lead is unacceptable.
  try {
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
    console.error('[enquiry] office notification failed', caught)
    return {
      status: 'error',
      message: `Something went wrong sending your message. Please call ${businessInfo.phone.display} so we do not miss you.`,
    }
  }

  // 2. Customer confirmation — BEST EFFORT. The office already has the lead
  //    from step 1, so a failure here is logged and swallowed, never surfaced
  //    to the customer as an error.
  try {
    const { error } = await resend.emails.send({
      from,
      to: [email],
      replyTo: to,
      subject: 'We have received your enquiry — Elite Touch Renovations',
      text: `Hi ${name},\n\nThanks for getting in touch with Elite Touch Renovations. We have your details and will be in touch to arrange your free on-site measure.\n\nWhat you sent us:\n${rows
        .map(([k, v]) => `${k}: ${v}`)
        .join('\n')}\n\nIf anything is urgent, call us on ${businessInfo.phone.display}.\n\n— Elite Touch Renovations`,
      html: `<p>Hi ${escapeHtml(name)},</p><p>Thanks for getting in touch with Elite Touch Renovations. We have your details and will be in touch to arrange your free on-site measure.</p><p><strong>What you sent us</strong></p><table cellpadding="6">${rows
        .map(
          ([k, v]) =>
            `<tr><td><strong>${k}</strong></td><td>${escapeHtml(v).replace(
              /\n/g,
              '<br>'
            )}</td></tr>`
        )
        .join(
          ''
        )}</table><p>If anything is urgent, call us on ${businessInfo.phone.display}.</p><p>— Elite Touch Renovations</p>`,
    })

    if (error) {
      console.error('[enquiry] customer confirmation failed', error)
    }
  } catch (caught) {
    console.error('[enquiry] customer confirmation failed', caught)
  }

  // 3. Supabase copy — BEST EFFORT, and skipped entirely (not attempted) when
  //    SUPABASE_SERVICE_ROLE_KEY is unset. Never blocks success (D-85).
  if (supabase) {
    const { error } = await supabase.from('enquiries').insert({
      name,
      phone,
      email,
      suburb: suburb || null,
      service: service || null,
      message: message || null,
    })
    if (error) {
      console.error('[enquiry] supabase insert failed', error)
    }
  }

  return {
    status: 'success',
    message:
      'Thanks — we have your details and will be in touch to arrange your free on-site measure.',
  }
}
