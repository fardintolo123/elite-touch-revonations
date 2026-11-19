/**
 * Enquiry Server Action rate limiting (issue #101).
 *
 * `submitEnquiry` is a real POST endpoint with a stable action ID — it can be
 * invoked directly, repeatedly, bypassing the rendered form. Each call sends a
 * live email (Resend) and writes to Supabase, so unthrottled repeats are a
 * cost/availability risk, not just noise.
 *
 * TWO LAYERS, because no new paid service or dashboard access was available
 * this session (Vercel KV/Upstash and Vercel Firewall rules both need one):
 *
 *   1. Supabase (`enquiry_rate_limits` table, same project as `enquiries`,
 *      D-85) — the real check. Persists across Vercel's serverless instances,
 *      so it is the layer that actually holds under sustained abuse.
 *   2. An in-memory sliding window — the fallback when Supabase is
 *      unconfigured, errors, or the table does not exist yet. It only holds
 *      for the lifetime of one warm function instance, but that already
 *      blocks the common case of a script hammering the action in a tight
 *      loop against one invocation.
 *
 * Fails OPEN on a Supabase error (falls through to the in-memory layer rather
 * than blocking a genuine lead because the database hiccuped) — same
 * philosophy as D-85's "never let the optional thing cost the lead", except
 * here the in-memory layer is the backstop rather than giving up entirely.
 */

import type { SupabaseClient } from '@supabase/supabase-js'

const WINDOW_MS = 60 * 60 * 1000 // 1 hour
const MAX_PER_WINDOW = 5 // generous for a genuine customer, far below scripted abuse

const RATE_LIMIT_TABLE = 'enquiry_rate_limits'

const memoryHits = new Map<string, number[]>()

function checkAndRecordInMemory(ip: string, now: number): boolean {
  const hits = (memoryHits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)

  if (hits.length >= MAX_PER_WINDOW) {
    memoryHits.set(ip, hits)
    return false
  }

  hits.push(now)
  memoryHits.set(ip, hits)
  return true
}

/** `x-forwarded-for` is the standard Vercel sets; first entry is the client. */
export function clientIpFromHeaders(headerList: Headers): string {
  const forwarded = headerList.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return headerList.get('x-real-ip') || 'unknown'
}

/**
 * Returns `true` if this IP is still within its allowance. Call this BEFORE
 * any Resend/Supabase side effect — a throttled call must do nothing else.
 */
export async function checkEnquiryRateLimit(
  ip: string,
  supabase: SupabaseClient | null
): Promise<boolean> {
  if (supabase) {
    try {
      const since = new Date(Date.now() - WINDOW_MS).toISOString()
      const { count, error } = await supabase
        .from(RATE_LIMIT_TABLE)
        .select('id', { count: 'exact', head: true })
        .eq('ip', ip)
        .gte('created_at', since)

      if (!error) {
        if ((count ?? 0) >= MAX_PER_WINDOW) return false

        const { error: insertError } = await supabase
          .from(RATE_LIMIT_TABLE)
          .insert({ ip })
        if (!insertError) return true
      } else {
        console.error('[enquiry] rate limit check failed, using in-memory fallback', error)
      }
    } catch (caught) {
      console.error('[enquiry] rate limit check threw, using in-memory fallback', caught)
    }
  }

  return checkAndRecordInMemory(ip, Date.now())
}
