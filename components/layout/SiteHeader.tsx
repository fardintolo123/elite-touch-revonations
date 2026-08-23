import Image from 'next/image'
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
 *
 * The brand mark is the ETR monogram from the owner's own logo file
 * (`public/brand/`, D-79). No `priority` — every page also has its own hero
 * photo as the real LCP candidate with `priority`, and PERFORMANCE_BUDGET.md
 * rule 16 caps high-priority preloads at one per page. A second one here (this
 * logo) competed with the hero for bandwidth and measurably hurt LCP.
 *
 * Deliberately no `loading="eager"` either: passing `loading="eager"` without
 * `priority` still makes next/image emit a `<link rel="preload">` for this
 * image (verified against the built output on 2026-08-23), which reproduces
 * the same competing-preload problem `priority` would. Plain default
 * (`loading="lazy"`, browser-native) is the only combination that renders
 * with no preload — and a native lazy image already at the top of the
 * viewport on page load is fetched immediately by the browser regardless.
 */

const NAV_LINKS = [
  /* "Home" is an explicit link, not just the logo. The logo works, but a
     visible Home item is what most people look for — reported 2026-08-20. */
  { href: '/', label: 'Home' },
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
          <Link href="/" className="et-logo" aria-label={`${businessInfo.name} — home`}>
            <Image
              className="et-logo-mark"
              src="/brand/etr-mark.webp"
              alt=""
              width={163}
              height={160}
            />
            <span aria-hidden="true">
              Elite Touch <span>Renovations</span>
            </span>
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
