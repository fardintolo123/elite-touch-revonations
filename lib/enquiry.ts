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

export const initialEnquiryState: EnquiryState = {
  status: 'idle',
  message: '',
}
