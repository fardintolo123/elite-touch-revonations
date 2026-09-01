import type { Metadata } from 'next'
import Link from 'next/link'
import { businessInfo } from '@/lib/businessInfo'

/**
 * 404.
 *
 * The `robots` override below is the whole point of this file being explicit.
 *
 * The root layout sets a sitewide `index, follow`. A not-found branch that does
 * not override it inherits it — and if that branch ever renders at HTTP 200
 * (a hand-rolled "not found" state inside a page, rather than this file),
 * every unmatched URL becomes an indexable soft 404. That exact bug shipped on
 * the sibling project (PROJECT_CONTEXT.md §4.3).
 *
 * `follow: true` is intentional: we still want crawlers to follow the links out
 * of this page back into the real site.
 *
 * NOTE (SEO audit L-1): the served 404 currently carries *two*
 * `<meta name="robots">` tags — this one (`noindex, follow`) plus a `noindex`
 * that Next injects automatically for any 404-status response
 * (node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/not-found.md).
 * Both say noindex, so there is no indexation risk. Collapsing to one tag means
 * either dropping the sitewide `index, follow` layout default (touches every
 * page) or a deeper Next metadata-merge change — deferred, not a quick fix.
 */

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <section className="et-section et-band-canvas">
      <div className="et-container et-container-narrow et-stack">
        <span className="et-eyebrow">404</span>
        <h1 className="et-h1">We could not find that page.</h1>
        <p className="et-lead">
          The link may be out of date, or the page may have moved when we
          rebuilt the site. Here is where most people are heading:
        </p>

        <ul className="et-checklist">
          <li>
            <Link href="/services/" className="et-link">
              Our services
            </Link>{' '}
            — bathroom, ensuite, bathroom and laundry, and powder room
            renovations
          </li>
          <li>
            <Link href="/packages/" className="et-link">
              Packages and pricing
            </Link>
          </li>
          <li>
            <Link href="/gallery/" className="et-link">
              Our work
            </Link>
          </li>
          <li>
            <Link href="/contact-us/" className="et-link">
              Book a free on-site measure
            </Link>
          </li>
        </ul>

        <div className="et-hero-cta">
          <Link
            href="/"
            className="et-btn et-btn-lg et-btn-primary et-btn-block-mobile"
          >
            Back to the homepage
          </Link>
          <a
            href={businessInfo.phone.href}
            className="et-btn et-btn-lg et-btn-secondary et-btn-block-mobile"
          >
            Call {businessInfo.phone.display}
          </a>
        </div>
      </div>
    </section>
  )
}
