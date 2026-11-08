import type { NextRequest } from 'next/server'

/**
 * Next.js 16 renamed the `middleware` file convention to `proxy`, and the
 * exported function must be named `proxy` (or be the default export). The
 * Node.js runtime is fixed — setting `runtime` here throws.
 *
 * Why this file exists at all:
 * -----------------------------------------------------------------------
 * `410 Gone` cannot be produced from `next.config.ts`. `redirects()` only
 * emits 3xx and `headers()` only appends headers to a response that already
 * has a status. Returning a genuine 410 means returning a real `Response`,
 * and the earliest place to do that is here.
 *
 * What gets a 410:
 * -----------------------------------------------------------------------
 * `/elementor-hf/header/` and `/elementor-hf/footer/` are Elementor
 * header/footer *template stubs*. They were never real pages, but Yoast
 * published them in `elementor-hf-sitemap.xml`, so Google has indexed two
 * URLs that render fragments of chrome with no page content.
 *
 * 410 rather than 404 is deliberate: 404 means "not found, maybe later",
 * and Google will recrawl it for months. 410 means "gone, permanently" and
 * is dropped from the index substantially faster. These URLs are never
 * coming back, so 410 states the truth.
 *
 * 410 rather than a 301 is also deliberate: there is no equivalent page to
 * send this traffic to. Redirecting a chrome fragment to the homepage is a
 * soft-404 pattern that Google discounts anyway.
 */

/** Path prefixes that are permanently gone. Compared without a trailing slash. */
const GONE_PREFIXES = ['/elementor-hf'] as const

const GONE_BODY = [
  'HTTP 410 — Gone.',
  '',
  'This address was an Elementor template fragment on the previous website.',
  'It was never a real page and it has been permanently removed.',
  '',
  'Elite Touch Renovations — https://www.elitetouchrenovations.au/',
].join('\n')

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Normalise so `/elementor-hf/header` and `/elementor-hf/header/` behave the
  // same. `trailingSlash: true` means the slashed form is the one that arrives,
  // but a direct hit on the unslashed form must not slip past.
  const normalised =
    pathname.length > 1 && pathname.endsWith('/')
      ? pathname.slice(0, -1)
      : pathname

  const isGone = GONE_PREFIXES.some(
    (prefix) => normalised === prefix || normalised.startsWith(`${prefix}/`)
  )

  if (isGone) {
    return new Response(GONE_BODY, {
      status: 410,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        // Belt and braces: a 410 already de-indexes, this makes it explicit.
        'X-Robots-Tag': 'noindex',
        'Cache-Control': 'public, max-age=3600',
      },
    })
  }

  // Everything else falls through to normal routing untouched.
}

export const config = {
  // Scope the proxy tightly. Without a matcher it runs on every request,
  // including static assets and image optimisation.
  matcher: ['/elementor-hf', '/elementor-hf/:path*'],
}
