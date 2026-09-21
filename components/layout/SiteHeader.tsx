import Image from 'next/image'
import Link from 'next/link'
import { businessInfo, services } from '@/lib/businessInfo'
import { blogPosts } from '@/lib/blog'
import { publishedRegions, publishedSuburbs } from '@/lib/locations'
import { projects } from '@/lib/projects'

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

/*
 * The index routes remain the first link in each disclosure, but the child
 * routes are listed here too. That makes the whole published content tree
 * reachable from the sitewide nav without adding a client-side menu or making
 * visitors guess which pages sit behind a generic section label.
 */
function ServicesMenu() {
  const regions = publishedRegions()

  return (
    <details className="et-nav-menu" name="primary-nav">
      <summary>Services</summary>
      <div className="et-nav-panel et-nav-panel-services">
        <Link href="/services/" className="et-nav-panel-index">
          All services
        </Link>
        {services.map((service) => (
          <Link key={service.slug} href={`/services/${service.slug}/`}>
            {service.title}
          </Link>
        ))}

        <p className="et-nav-panel-heading">Service areas</p>
        {regions.map((region) => (
          <div key={region.slug} className="et-nav-panel-group">
            <Link href={`${region.hubUrl}/`}>{region.name}</Link>
            {publishedSuburbs(region).map((suburb) => (
              <Link
                key={suburb.slug}
                href={`/services/bathroom-renovations/${suburb.slug}/`}
                className="et-nav-panel-child"
              >
                {suburb.name}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </details>
  )
}

function AdviceMenu() {
  return (
    <details className="et-nav-menu" name="primary-nav">
      <summary>Advice</summary>
      <div className="et-nav-panel et-nav-panel-advice">
        <Link href="/blog/" className="et-nav-panel-index">
          All advice
        </Link>
        {blogPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}/`}>
            {post.title}
          </Link>
        ))}
      </div>
    </details>
  )
}

function GalleryMenu() {
  return (
    <details className="et-nav-menu" name="primary-nav">
      <summary>Gallery</summary>
      <div className="et-nav-panel et-nav-panel-gallery">
        <Link href="/gallery/" className="et-nav-panel-index">
          All projects
        </Link>
        {projects.map((project) => (
          <Link key={project.slug} href={`/gallery/${project.slug}/`}>
            {project.name}
          </Link>
        ))}
      </div>
    </details>
  )
}

function AboutMenu() {
  return (
    <details className="et-nav-menu" name="primary-nav">
      <summary>About</summary>
      <div className="et-nav-panel et-nav-panel-compact">
        <Link href="/about-us/">About us</Link>
        <Link href="/privacy/">Privacy policy</Link>
        <Link href="/terms/">Terms of use</Link>
      </div>
    </details>
  )
}

function NavigationItems() {
  return (
    <>
      {/* "Home" is an explicit link, not just the logo. */}
      <Link href="/">Home</Link>
      <ServicesMenu />
      <Link href="/packages/">Packages</Link>
      <AdviceMenu />
      <GalleryMenu />
      <AboutMenu />
      <Link href="/contact-us/">Contact</Link>
    </>
  )
}

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
            <NavigationItems />
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
          <NavigationItems />
        </nav>
      </div>
    </header>
  )
}
