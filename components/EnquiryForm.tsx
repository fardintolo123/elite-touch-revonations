'use client'

import { useActionState, useState, type ChangeEvent } from 'react'
import { useFormStatus } from 'react-dom'
import { submitEnquiry } from '@/lib/actions'
import { initialEnquiryState, type EnquiryState } from '@/lib/enquiry'
import { businessInfo, services } from '@/lib/businessInfo'

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

function SubmitButton({ waitingOnPhotos }: { waitingOnPhotos: boolean }) {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      className="et-btn et-btn-lg et-btn-primary et-btn-block-mobile"
      disabled={pending || waitingOnPhotos}
    >
      {pending
        ? 'Sending…'
        : waitingOnPhotos
          ? 'Preparing photos…'
          : 'Request my free measure'}
    </button>
  )
}

export function EnquiryForm() {
  const [state, formAction] = useActionState<EnquiryState, FormData>(
    submitEnquiry,
    initialEnquiryState
  )
  const [preparingPhotos, setPreparingPhotos] = useState(false)
  const [photoNotice, setPhotoNotice] = useState<string | null>(null)

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

      <SubmitButton waitingOnPhotos={preparingPhotos} />
    </form>
  )
}
