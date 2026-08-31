'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { submitEnquiry } from '@/lib/actions'
import { initialEnquiryState, type EnquiryState } from '@/lib/enquiry'
import { businessInfo, services } from '@/lib/businessInfo'

/**
 * WHY THIS FILE IS A CLIENT COMPONENT
 * -----------------------------------------------------------------------
 * `'use client'` is contagious — one shared component with a hook drags every
 * consumer client-side (PROJECT_CONTEXT.md §4.6). It is used here, and only
 * here, because the form needs `useActionState`/`useFormStatus` to show
 * validation and pending state without a full page reload.
 *
 * It is deliberately a LEAF. The contact page itself stays a server component
 * and imports this one node. Do not lift the directive up into the page, and
 * do not import this file into a shared layout component.
 *
 * The SEO-relevant copy on the contact page lives in the server component, not
 * in here, so none of it depends on client hydration to reach a crawler.
 */

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      className="et-btn et-btn-lg et-btn-primary et-btn-block-mobile"
      disabled={pending}
    >
      {pending ? 'Sending…' : 'Request my free measure'}
    </button>
  )
}

export function EnquiryForm() {
  const [state, formAction] = useActionState<EnquiryState, FormData>(
    submitEnquiry,
    initialEnquiryState
  )

  return (
    <form action={formAction} className="et-stack" noValidate>
      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div className="et-visually-hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="et-field">
        <label className="et-label" htmlFor="name">
          Your name
        </label>
        <input
          className="et-input"
          id="name"
          name="name"
          autoComplete="name"
          required
          aria-describedby={state.errors?.name ? 'name-error' : undefined}
          aria-invalid={state.errors?.name ? true : undefined}
        />
        {state.errors?.name && (
          <p
            id="name-error"
            className="et-body-sm"
            style={{
              color: 'var(--et-danger)',
              marginTop: 'var(--et-space-2)',
            }}
          >
            {state.errors.name}
          </p>
        )}
      </div>

      <div className="et-field">
        <label className="et-label" htmlFor="phone">
          Phone
        </label>
        <input
          className="et-input"
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          aria-describedby={state.errors?.phone ? 'phone-error' : undefined}
          aria-invalid={state.errors?.phone ? true : undefined}
        />
        {state.errors?.phone && (
          <p
            id="phone-error"
            className="et-body-sm"
            style={{
              color: 'var(--et-danger)',
              marginTop: 'var(--et-space-2)',
            }}
          >
            {state.errors.phone}
          </p>
        )}
      </div>

      <div className="et-field">
        <label className="et-label" htmlFor="email">
          Email
        </label>
        <input
          className="et-input"
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-describedby={state.errors?.email ? 'email-error' : undefined}
          aria-invalid={state.errors?.email ? true : undefined}
        />
        {state.errors?.email && (
          <p
            id="email-error"
            className="et-body-sm"
            style={{
              color: 'var(--et-danger)',
              marginTop: 'var(--et-space-2)',
            }}
          >
            {state.errors.email}
          </p>
        )}
      </div>

      <div className="et-field">
        <label className="et-label" htmlFor="suburb">
          Suburb
        </label>
        <input
          className="et-input"
          id="suburb"
          name="suburb"
          autoComplete="address-level2"
        />
      </div>

      <div className="et-field">
        <label className="et-label" htmlFor="service">
          What are you renovating?
        </label>
        <select className="et-select" id="service" name="service" defaultValue="">
          <option value="">Not sure yet</option>
          {services.map((service) => (
            <option key={service.slug} value={service.title}>
              {service.title}
            </option>
          ))}
        </select>
      </div>

      <div className="et-field">
        <label className="et-label" htmlFor="message">
          Anything you want us to know
        </label>
        <textarea
          className="et-textarea"
          id="message"
          name="message"
          rows={5}
        />
      </div>

      {state.status !== 'idle' && state.message && (
        <div
          role="status"
          aria-live="polite"
          className="et-body-sm"
          style={{
            padding: 'var(--et-space-4) var(--et-space-5)',
            borderRadius: 'var(--et-radius-md)',
            background:
              state.status === 'success'
                ? 'var(--et-success-surface)'
                : 'var(--et-danger-surface)',
            color:
              state.status === 'success' ? '#07714E' : 'var(--et-danger)',
          }}
        >
          <p>{state.message}</p>
          {state.status === 'success' && (
            <p style={{ marginTop: 'var(--et-space-3)' }}>
              Already worked with us?{' '}
              <a
                className="et-link"
                href={businessInfo.googleBusinessProfile.reviewPromptUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Leave a Google review
              </a>
              .
            </p>
          )}
        </div>
      )}

      <SubmitButton />
    </form>
  )
}
