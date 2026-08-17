import Link from 'next/link'
import { businessInfo } from '@/lib/businessInfo'

/**
 * Server component. No `'use client'` — DECISIONS.md D-31 and the "'use client'
 * is contagious" rule (PROJECT_CONTEXT.md §4.6).
 *
 * The mobile navigation is a plain wrapping list that is ALWAYS in the server
 * HTML and hidden with CSS above `lg`. It is deliberately not a JS toggle:
 * a nav behind a client-side open/close flag renders its closed state into the
 * server HTML, which is what crawlers read.
 *
 * The call CTA is a real `tel:` anchor (D-33). Never a button with a JS handler —
 * anchors cannot double-count in call tracking.
 */

const NAV_LINKS = [
  { href: '/services/', label: 'Services' },
  { href: '/packages/', label: 'Packages' },
  { href: '/gallery/', label: 'Gallery' },
  { href: '/about-us/', label: 'About us' },
  { href: '/contact-us/', label: 'Contact' },
] as const

export function SiteHeader() {
  return (
    <header className="et-header">
      <div className="et-container">
        <div className="et-header-inner">
          <Link href="/" className="et-logo">
            Elite Touch <span>Renovations</span>
          </Link>

          <nav className="et-nav" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="et-header-actions">
            {/* DESIGN.md §8.9 specifies an `md` CTA in the header. It is also
                the only way this clears the 44×44px minimum touch target
                (§10) — `sm` is 40px tall, and this is the single most
                important conversion element on a mobile trade site. */}
            <a
              className="et-btn et-btn-md et-btn-primary"
              href={businessInfo.phone.href}
            >
              <span aria-hidden="true">Call</span>
              <span className="et-visually-hidden">
                Call Elite Touch Renovations on{' '}
              </span>
              {businessInfo.phone.display}
            </a>
          </div>
        </div>

        <nav className="et-nav-mobile" aria-label="Primary, mobile">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
