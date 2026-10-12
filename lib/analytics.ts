declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
  }
}

/**
 * Push a custom event to GTM's dataLayer. GTM Custom Event triggers listen
 * for the `event` key; any additional params are passed through to GA4.
 *
 * Architecture: Website → dataLayer → GTM → GA4 (D-32, D-112).
 * No-ops on the server (SSR) so it is safe to import in any client component.
 */
export function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean>
): void {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: name, ...params })
}
