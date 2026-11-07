/**
 * Types and initial state for the enquiry form.
 *
 * ⚠️ WHY THIS FILE EXISTS — DO NOT MERGE IT BACK INTO `actions.ts`.
 *
 * A file marked `'use server'` may export **async functions and nothing else**.
 * Every export in such a file is compiled into a callable server-action
 * reference, so a plain object export is not a valid action and the module
 * breaks — in production, as an opaque "A server error occurred" page.
 *
 * That is exactly what happened on 2026-08-20: `initialEnquiryState` was being
 * exported from the `'use server'` module, and the first real submission on
 * Vercel returned a server error. The local build passed because the fault is
 * a runtime one, not a type error.
 *
 * So: shared values and types live here (a normal module), and `actions.ts`
 * exports only `submitEnquiry`.
 */

export type EnquiryState = {
  status: 'idle' | 'success' | 'error'
  message: string
  /** Field-level errors, keyed by input name. */
  errors?: Record<string, string>
}

export const ENQUIRY_START_TIMING_OPTIONS = [
  { value: 'within-3-months', label: 'Within 3 months' },
  { value: '3-to-6-months', label: '3–6 months' },
  { value: '6-plus-months', label: '6+ months' },
  { value: 'just-researching', label: 'Just researching' },
] as const

export type EnquiryStartTiming =
  (typeof ENQUIRY_START_TIMING_OPTIONS)[number]['label']

/**
 * Converts the untrusted form value into the office-facing label. Unknown or
 * tampered values are deliberately dropped so this optional field can never
 * block a genuine enquiry.
 */
export function getEnquiryStartTiming(
  value: FormDataEntryValue | null
): EnquiryStartTiming | null {
  if (typeof value !== 'string') return null

  return (
    ENQUIRY_START_TIMING_OPTIONS.find((option) => option.value === value)
      ?.label ?? null
  )
}

/**
 * Supabase has no timing column. Keep the queryable backup complete without a
 * schema change by appending a validated timing line to its existing message.
 */
export function buildStoredEnquiryMessage(
  message: string,
  startTiming: EnquiryStartTiming | null
): string | null {
  if (!startTiming) return message || null

  const timingLine = `Preferred start: ${startTiming}`
  return message ? `${message}\n\n${timingLine}` : timingLine
}

export const initialEnquiryState: EnquiryState = {
  status: 'idle',
  message: '',
}
