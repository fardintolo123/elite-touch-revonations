import type { NextConfig } from 'next'

/**
 * Elite Touch Renovations — WordPress → Next.js 16 migration config.
 *
 * Three things worth knowing before editing this file:
 *
 * 1. `trailingSlash: true` is deliberate and load-bearing. Every URL currently
 *    indexed from the WordPress site ends in `/`. Next's default (`false`) would
 *    answer `/about-us/` with a 308 to `/about-us`, adding a hop to every legacy
 *    backlink and every result already in Google's index. Preserving the exact
 *    indexed form is worth more than the slash-less cosmetic.
 *
 * 2. `statusCode: 301` is used instead of `permanent: true`. `permanent: true`
 *    emits **308**, not 301. Next supports `statusCode` *instead of* `permanent` —
 *    supplying both is a build error.
 *
 * 3. Redirects are matched in array order, first match wins. The specific
 *    `/staging/...` rules MUST stay above the `/staging/:path*` catch-all.
 *
 * 410 Gone is NOT handled here. `headers()` can only add headers to a response;
 *    it cannot change the status code. See `proxy.ts`.
 *
 * 4. `experimental.serverActions.bodySizeLimit` is raised to 4mb for the enquiry
 *    form's optional photo attachments (D-150). ⚠️ Vercel hard-caps a Function's
 *    request body at 4.5 MB and this value CANNOT raise that ceiling — it only
 *    changes Next's own guard (default 1MB), which would otherwise reject the
 *    request before it ever reached Vercel's limit. `lib/actions.ts` and
 *    `EnquiryForm.tsx` keep the real payload (2 photos, compressed client-side to
 *    ≤1.5MB each) safely under both ceilings. Do not raise this past a few MB —
 *    it cannot help past 4.5MB and would just make Next accept a request Vercel
 *    will 413 anyway.
 */

/** Permanent moves. Order matters — specific before catch-all. */
const REDIRECTS_301 = [
  // ---- Live WordPress URLs (present in page-sitemap.xml) ----
  { source: '/packages-deals', destination: '/packages/' },
  { source: '/calendly', destination: '/contact-us/' },
  {
    source: '/artarmon-bathroom-renovation',
    destination: '/services/bathroom-renovations/',
  },

  // ---- Staging paths: specific rules first ----
  { source: '/staging/about-us', destination: '/about-us/' },
  { source: '/staging/contact-us', destination: '/contact-us/' },
  { source: '/staging/services', destination: '/services/' },
  {
    source: '/staging/services/bathroom-renovations',
    destination: '/services/bathroom-renovations/',
  },
  {
    source: '/staging/services/ensuite-bathroom-renovations',
    destination: '/services/ensuite-bathroom-renovations/',
  },
  {
    source: '/staging/services/laundry-renovations',
    destination: '/services/laundry-renovations/',
  },
  {
    source: '/staging/services/powder-room-renovations',
    destination: '/services/powder-room-renovations/',
  },
  { source: '/staging/bathroom-photo-gallery', destination: '/gallery/' },
  { source: '/staging/bathroom-renovation-pricing', destination: '/packages/' },
  { source: '/staging/projects', destination: '/gallery/' },
  { source: '/staging/reviews', destination: '/about-us/' },
  {
    source: '/staging/bathroom-ensuite-renovation-in-artarmon',
    destination: '/services/ensuite-bathroom-renovations/',
  },
  {
    source: '/staging/luxury-bathroom-renovation-in-hunters-hill',
    destination: '/services/bathroom-renovations/',
  },
  {
    source: '/staging/heritage-house-bathroom-renovation-in-the-rocks',
    destination: '/services/bathroom-renovations/',
  },

  // ---- Staging root, then the catch-all. Both must stay last. ----
  { source: '/staging', destination: '/' },
  // Safety net: any staging path never inventoried still lands somewhere real
  // instead of a 404. Not in the brief's table — added so an unknown staging
  // URL cannot become a soft 404. Remove if Search Console shows none exist.
  { source: '/staging/:path*', destination: '/' },
] as const

const nextConfig: NextConfig = {
  // Preserve the trailing-slash URL form the WordPress site is indexed under.
  trailingSlash: true,

  // Prefer AVIF for optimized images; the long TTL keeps generated variants
  // cached while source assets remain versioned by their URL.
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
  },

  // Don't advertise the framework.
  poweredByHeader: false,

  // Fail the build on type errors rather than shipping them.
  typescript: { ignoreBuildErrors: false },

  // Raised from the 1MB default for the enquiry form's optional photo
  // attachments (D-150). See note 4 above — Vercel's own 4.5MB Function body
  // cap is the real ceiling and cannot be changed here.
  experimental: {
    serverActions: {
      bodySizeLimit: '4mb',
    },
  },

  async redirects() {
    return REDIRECTS_301.map(({ source, destination }) => ({
      source,
      destination,
      // Literal 301. Cannot be combined with `permanent`.
      statusCode: 301,
    }))
  },

  async headers() {
    return [
      {
        // Baseline security headers. Note: these ADD headers — they cannot and
        // do not set status codes.
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            value:
              "default-src 'self'; base-uri 'self'; object-src 'none'; form-action 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com; connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://*.googletagmanager.com; img-src 'self' data: blob: https:; style-src 'self' 'unsafe-inline'; font-src 'self'; frame-src https://www.googletagmanager.com; frame-ancestors 'none';",
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
        ],
      },
    ]
  },
}

export default nextConfig
