'use client'

import { useActionState, useEffect, useRef, useState, type ChangeEvent, type FocusEvent, type FormEvent } from 'react'
import { useFormStatus } from 'react-dom'
import { submitEnquiry } from '@/lib/actions'
import {
  ENQUIRY_START_TIMING_OPTIONS,
  initialEnquiryState,
  type EnquiryState,
} from '@/lib/enquiry'
import { businessInfo, services } from '@/lib/businessInfo'
import { trackEvent } from '@/lib/analytics'
import { listenForEnquiryStart } from '@/lib/enquiryStarter'
import styles from './EnquiryForm.module.css'

// Both homepage entry and form use this existing client boundary. A separate
// entry makes Turbopack duplicate the shared form chunk on the homepage.
export { HomeEnquiryStarter } from './HomeEnquiryStarter'

/**
 * Photo attachments (D-150). MUST stay in sync with the server-side caps in
 * `lib/actions.ts` (`MAX_PHOTOS`, `MAX_PHOTO_BYTES`) — this is the client-side
 * half, not the authority. See that file's header for why the numbers are
 * this small: Vercel hard-caps a Function's request body at 4.5MB.
 *
 * Compression uses only the native Canvas/`createImageBitmap` API — no new
 * dependency, no added client JS weight beyond this function itself.
 */
const MAX_PHOTOS = 2
const TARGET_MAX_PHOTO_BYTES = 1.5 * 1024 * 1024
const MAX_PHOTO_DIMENSION = 1920

function canvasToBlob(
  canvas: HTMLCanvasElement,
  quality: number
): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', quality))
}

/**
 * Resizes + re-encodes a photo as JPEG until it fits `TARGET_MAX_PHOTO_BYTES`.
 * Falls back to the original file (if it's already small enough) when the
 * browser can't decode it via canvas — e.g. some HEIC edge cases outside
 * Safari. Returns `null` when neither the compressed nor the original file
 * fits, so the caller can drop it and tell the customer why.
 */
async function compressPhoto(file: File): Promise<File | null> {
  try {
    const bitmap = await createImageBitmap(file)
    const scale = Math.min(
      1,
      MAX_PHOTO_DIMENSION / Math.max(bitmap.width, bitmap.height)
    )
    const width = Math.round(bitmap.width * scale)
    const height = Math.round(bitmap.height * scale)

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    if (!ctx) return file.size <= TARGET_MAX_PHOTO_BYTES ? file : null

    ctx.drawImage(bitmap, 0, 0, width, height)
    bitmap.close()

    let quality = 0.82
    let blob = await canvasToBlob(canvas, quality)
    while (blob && blob.size > TARGET_MAX_PHOTO_BYTES && quality > 0.4) {
      quality -= 0.12
      blob = await canvasToBlob(canvas, quality)
    }

    if (!blob || blob.size > TARGET_MAX_PHOTO_BYTES) {
      return file.size <= TARGET_MAX_PHOTO_BYTES ? file : null
    }

    const baseName = file.name.replace(/\.[^./]+$/, '') || 'photo'
    return new File([blob], `${baseName}.jpg`, { type: 'image/jpeg' })
  } catch {
    return file.size <= TARGET_MAX_PHOTO_BYTES ? file : null
  }
}

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

/**
 * TWO-STEP FLOW (D-172). The owner asked for 4 Elements Painting's shorter,
 * step-based form: there, step 1 is a one-click service picker and step 2 is
 * contact details, with a "Step 1 of 2" progress bar. This form had the same
 * eight fields in one column, with the room choice buried mid-form as a
 * `<select>` below three required text inputs.
 *
 * WHY BOTH STEPS ARE ALWAYS IN THE DOM. Step 1 only *hides* step 2 with CSS,
 * driven by `data-enhanced`/`data-current-step` on the form — the same idiom as
 * `HoverNavMenu`. The server action is reached by a real form submission and
 * `useActionState` progressively enhances it, so with JavaScript off or before
 * hydration the visitor sees one ordinary long form that still submits and
 * still validates server-side. Nothing is conditionally mounted; a step behind
 * client state would drop fields out of the submitted FormData.
 */
const TOTAL_STEPS = 2

const STEP_TITLES = [
  'What are you renovating?',
  'How should we reach you about your free measure?',
] as const

/**
 * Step 1's choices. The four services come from `businessInfo` — never a hand
 * written list, or the form drifts from the four services the business
 * actually offers (CLAUDE.md Business Rules). "Not sure yet" is kept because
 * the field is optional and was the old `<select>`'s default: a visitor who
 * does not know which room category they need must still be able to continue.
 */
const ROOM_CHOICES = [
  ...services.map((service) => ({
    value: service.title,
    label: service.title.replace(/ Renovations$/, ''),
  })),
  { value: '', label: 'Not sure yet' },
]

function SubmitButton({ waitingOnPhotos, sent }: { waitingOnPhotos: boolean; sent: boolean }) {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      className="et-btn et-btn-lg et-btn-primary et-btn-block-mobile"
      disabled={pending || waitingOnPhotos || sent}
    >
      {pending
        ? 'Sending…'
        : sent
          ? 'Request sent'
        : waitingOnPhotos
          ? 'Preparing photos…'
          : 'Request my free measure'}
    </button>
  )
}

export function EnquiryForm() {
  const [state, formAction, isPending] = useActionState<EnquiryState, FormData>(
    submitEnquiry,
    initialEnquiryState
  )
  const [preparingPhotos, setPreparingPhotos] = useState(false)
  const [photoNotice, setPhotoNotice] = useState<string | null>(null)
  const [enhanced, setEnhanced] = useState(false)
  const [step, setStep] = useState(1)
  const formRef = useRef<HTMLFormElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)

  // Hydration flag. Until this runs, the form renders as one plain column and
  // the step CSS does nothing — see the TWO-STEP FLOW note above.
  useEffect(() => {
    setEnhanced(true)
  }, [])

  /** Step 1: one tap records the room and moves on, exactly as 4EP's does. */
  function handleRoomChoice() {
    trackEvent('form_step_complete', { step: 1, step_name: 'room' })
    setStep(2)
  }

  function goBack() {
    trackEvent('form_step_back', { step })
    setStep(1)
  }

  /**
   * Pre-selects the radio that matches `service`. The hero's room chips call
   * `startEnquiry(service)`, and before the two-step flow this wrote straight
   * to the `<select>`'s value. The radios are uncontrolled for the same reason
   * the rest of the form is (a validation error must not wipe the answers), so
   * the DOM node is still what gets set.
   */
  function selectRoom(service: string) {
    const input = formRef.current?.querySelector<HTMLInputElement>(
      `input[name="service"][value="${CSS.escape(service)}"]`
    )
    if (input) input.checked = true
  }

  useEffect(() => listenForEnquiryStart((service) => {
    if (service !== '' && !services.some((item) => item.title === service)) return
    if (!isPending && state.status !== 'success') {
      // The visitor already answered step 1 in the hero, so land them on the
      // contact step instead of asking the same question twice.
      if (service) selectRoom(service)
      setStep(2)
    }
    const target = state.status === 'success'
      ? statusRef.current
      : document.getElementById('enquiry-form')
    target?.focus({ preventScroll: true })
    target?.scrollIntoView({
      block: 'start',
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    })
  }), [isPending, state.status])

  // Tracks whether the user has focused any field (fires form_start once).
  const startedRef = useRef(false)
  // Tracks whether a submit is in flight, so the state-change effect below
  // only fires after an actual submission, not on initial render.
  const submittedRef = useRef(false)

  function handleFormFocus(event: FocusEvent<HTMLFormElement>) {
    if (!(event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement || event.target instanceof HTMLTextAreaElement)) return
    if (!startedRef.current) {
      startedRef.current = true
      trackEvent('form_start')
    }
  }

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    if (isPending || preparingPhotos || state.status === 'success') {
      event.preventDefault()
      return
    }
    // Only the last step submits. Without this an implicit submission (Enter in
    // a field, or a stray submit button) could post an empty contact step.
    if (enhanced && step < TOTAL_STEPS) {
      event.preventDefault()
      setStep(step + 1)
      return
    }
    submittedRef.current = true
    trackEvent('form_submit_attempt')
  }

  // Fire generate_lead (success) or form_submit_error after the server action
  // returns. This is more reliable than GTM's Form Submit trigger, which fires
  // at submit-time — before the server action result is known — and may not
  // fire at all on React-intercepted form submissions.
  useEffect(() => {
    if (!submittedRef.current) return
    if (state.status === 'success') {
      trackEvent('generate_lead')
      submittedRef.current = false
    } else if (state.status === 'error') {
      trackEvent('form_submit_error', {
        error_code: state.errors
          ? `validation_${Object.keys(state.errors).sort().join('_')}`
          : 'server_error',
      })
      submittedRef.current = false
    }
  }, [state])

  // Replaces the file input's own FileList with compressed versions before
  // the form ever submits, via the DataTransfer API — so the native form
  // action (and useActionState's progressive enhancement) needs no changes
  // to pick them up. See the file-header comment for why compression happens
  // here rather than on the server.
  async function handlePhotosChange(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget
    const selected = Array.from(input.files ?? [])
    if (selected.length === 0) {
      setPhotoNotice(null)
      return
    }

    setPreparingPhotos(true)
    const capped = selected.slice(0, MAX_PHOTOS)
    const compressed = await Promise.all(capped.map(compressPhoto))
    const kept = compressed.filter((file): file is File => file !== null)

    const transfer = new DataTransfer()
    kept.forEach((file) => transfer.items.add(file))
    input.files = transfer.files

    const notices: string[] = []
    if (selected.length > MAX_PHOTOS) {
      notices.push(`Only the first ${MAX_PHOTOS} photos were kept.`)
    }
    if (kept.length < capped.length) {
      notices.push(
        'One or more photos were too large to attach and were left out.'
      )
    }
    if (notices.length === 0 && kept.length > 0) {
      notices.push(
        `${kept.length} photo${kept.length > 1 ? 's' : ''} ready to send.`
      )
    }
    setPhotoNotice(notices.length > 0 ? notices.join(' ') : null)
    setPreparingPhotos(false)
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      className="et-stack"
      data-enhanced={enhanced}
      data-current-step={step}
      noValidate
      onFocus={handleFormFocus}
      onSubmit={handleFormSubmit}
      // React resets uncontrolled inputs even when an action returns validation
      // errors. Keep the answers and FileList so the customer can correct/retry.
      onReset={(event) => event.preventDefault()}
    >
      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div className="et-visually-hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Progress. Only truthful once the step flow is actually running, so it
          is hidden (and removed from the a11y tree) until `enhanced`. */}
      <div className={styles.progress} hidden={!enhanced}>
        <div className={styles.progressHead}>
          <p className="et-label">Step {step} of {TOTAL_STEPS}</p>
          <p className="et-body-sm" style={{ color: 'var(--et-text-secondary)' }}>
            Name, phone and email only
          </p>
        </div>
        <div
          className={styles.progressTrack}
          role="progressbar"
          aria-valuenow={step}
          aria-valuemin={1}
          aria-valuemax={TOTAL_STEPS}
          aria-label={`Step ${step} of ${TOTAL_STEPS}`}
        >
          <div
            className={styles.progressFill}
            style={{ inlineSize: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>
      <p aria-live="polite" className="et-visually-hidden">
        {enhanced ? `Step ${step} of ${TOTAL_STEPS}: ${STEP_TITLES[step - 1]}` : ''}
      </p>

      <div className={styles.step} data-step="1">
        <fieldset className={styles.timingFieldset}>
          <legend className={`et-label ${styles.timingLegend}`}>
            {STEP_TITLES[0]}
          </legend>
          <p className="et-field-help" style={{ marginTop: 'var(--et-space-1)' }}>
            One tap. You can change it later, and you can skip it.
          </p>
          <div className={styles.roomOptions}>
            {ROOM_CHOICES.map((choice) => {
              const id = `service-${choice.value === '' ? 'unsure' : choice.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

              return (
                <div className={styles.timingChoice} key={id}>
                  <input
                    className={styles.timingInput}
                    id={id}
                    name="service"
                    type="radio"
                    value={choice.value}
                    onChange={handleRoomChoice}
                  />
                  <label className={styles.timingChoiceLabel} htmlFor={id}>
                    {choice.label}
                  </label>
                </div>
              )
            })}
          </div>
        </fieldset>
      </div>

      <div className={styles.step} data-step="2">

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
          aria-describedby={
            state.errors?.email ? 'email-help email-error' : 'email-help'
          }
          aria-invalid={state.errors?.email ? true : undefined}
        />
        <p
          id="email-help"
          className="et-field-help"
        >
          We use this to reply and send your enquiry confirmation.
        </p>
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
          Suburb <span>(optional)</span>
        </label>
        <input
          className="et-input"
          id="suburb"
          name="suburb"
          autoComplete="address-level2"
        />
      </div>

      <fieldset className={styles.timingFieldset}>
        <legend className={`et-label ${styles.timingLegend}`}>
          When would you like to start? <span>(optional)</span>
        </legend>
        <div className={styles.timingOptions}>
          {ENQUIRY_START_TIMING_OPTIONS.map((option) => {
            const id = `start-timing-${option.value}`

            return (
              <div className={styles.timingChoice} key={option.value}>
                <input
                  className={styles.timingInput}
                  id={id}
                  name="startTiming"
                  type="radio"
                  value={option.value}
                />
                <label className={styles.timingChoiceLabel} htmlFor={id}>
                  {option.label}
                </label>
              </div>
            )
          })}
        </div>
      </fieldset>

      <details className="et-form-details">
        <summary>
          <span>Add notes or photos</span>
          <span className="et-form-details-note">Optional</span>
        </summary>
        <div className="et-stack">
          <p className="et-field-help">
            Extra detail can help us understand the room before we call.
          </p>

          <div className="et-field">
            <label className="et-label" htmlFor="message">
              Anything you want us to know <span>(optional)</span>
            </label>
            <textarea
              className="et-textarea"
              id="message"
              name="message"
              rows={5}
            />
          </div>

          <div className="et-field">
            <label className="et-label" htmlFor="photos">
              Photos of the room (optional, up to {MAX_PHOTOS})
            </label>
            <input
              className="et-input"
              id="photos"
              name="photos"
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotosChange}
            />
            {photoNotice && (
              <p
                className="et-body-sm"
                style={{
                  marginTop: 'var(--et-space-2)',
                  color: 'var(--et-text-secondary)',
                }}
              >
                {photoNotice}
              </p>
            )}
          </div>
        </div>
      </details>
      </div>

      {state.status !== 'idle' && state.message && (
        <div
          ref={statusRef}
          tabIndex={-1}
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
            <>
              <p
                id="enquiry-next-steps"
                style={{
                  marginTop: 'var(--et-space-4)',
                  fontWeight: 600,
                }}
              >
                What happens next
              </p>
              <ol
                aria-labelledby="enquiry-next-steps"
                style={{
                  display: 'grid',
                  gap: 'var(--et-space-2)',
                  marginTop: 'var(--et-space-2)',
                  paddingLeft: 'var(--et-space-5)',
                }}
              >
                <li>We review your enquiry.</li>
                <li>We call you to book your free on-site measure.</li>
                <li>
                  After the measure, we send you a fixed-scope written quote.
                </li>
              </ol>
              <a
                className="et-btn et-btn-md et-btn-secondary et-btn-block-mobile"
                href={businessInfo.phone.href}
                style={{ marginTop: 'var(--et-space-4)' }}
              >
                Call {businessInfo.phone.display}
              </a>
            </>
          )}
        </div>
      )}

      <div className={styles.stepNav}>
        {/* Back/Next exist only for the enhanced flow. With no JavaScript the
            whole form is one column and these would navigate nothing. */}
        {enhanced && step > 1 && (
          <button
            type="button"
            className="et-btn et-btn-lg et-btn-secondary"
            onClick={goBack}
          >
            Back
          </button>
        )}
        {enhanced && step < TOTAL_STEPS && (
          <button
            type="button"
            className="et-btn et-btn-lg et-btn-primary et-btn-block-mobile"
            onClick={() => setStep(step + 1)}
          >
            Skip - I am not sure yet
          </button>
        )}
        {(!enhanced || step === TOTAL_STEPS) && (
          <SubmitButton waitingOnPhotos={preparingPhotos} sent={state.status === 'success'} />
        )}
      </div>
    </form>
  )
}
