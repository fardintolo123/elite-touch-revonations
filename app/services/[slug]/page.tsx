import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { businessInfo, services } from '@/lib/businessInfo'
import { featuredReviews } from '@/lib/reviews'

/**
 * One renderer, four pages, driven by `services` in lib/businessInfo.ts.
 * "Content is data" — CLAUDE.md → Architecture Rules. Edit the data, not this
 * markup, to change what the pages say.
 *
 * ⚠️ Every record in that array becomes a live URL (PROJECT_CONTEXT.md §4.4).
 * `dynamicParams = false` means a slug that is NOT in the data 404s instead of
 * being rendered on demand — so a half-finished record cannot leak a page.
 * If you add a fifth service here, you have advertised a fifth service.
 * DECISIONS.md D-01 says there are four.
 */

export const dynamicParams = false

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }))
}

function findService(slug: string) {
  return services.find((service) => service.slug === slug)
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = findService(slug)

  if (!service) {
    return { title: 'Not found', robots: { index: false, follow: false } }
  }

  return {
    title: service.h1,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}/` },
  }
}

/** Included in every package tier — PROJECT_CONTEXT.md §2. Do not embellish. */
const STANDARD_INCLUSIONS = [
  'Planning and design',
  'Demolition — floor protection, disconnection and removal of existing fittings, floor and wall tiles including old cement bedding, and complete off-site rubbish removal',
  'Electrical — safe disconnection, replacement power points and light switch',
  'Plumbing — safe disconnection and installation of new fittings',
  'Render or re-sheet walls',
  'Waterproofing to Australian Standards — primer plus two coats, certificate included',
  'Tiling — new screed to create falls to drains, all glues, tile trims, grouts and silicone',
  'Final clean before handover',
] as const

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = findService(slug)

  if (!service) notFound()

  const [review] = featuredReviews(1)
  const others = services.filter((item) => item.slug !== service.slug)

  return (
    <>
      <section className="et-hero">
        <div className="et-container et-stack">
          <span className="et-eyebrow">{service.title}</span>
          <h1 className="et-h1 et-measure-tight">{service.h1}</h1>
          <p className="et-lead et-measure">{service.summary}</p>

          <div className="et-hero-cta">
            <Link
              href="/contact-us/"
              className="et-btn et-btn-lg et-btn-primary et-btn-block-mobile"
            >
              {businessInfo.offer.primaryCta}
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

      <section className="et-section et-band-canvas">
        <div className="et-container">
          <div className="et-grid et-grid-2">
            <div className="et-stack">
              <span className="et-eyebrow">What is included</span>
              <h2 className="et-h2 et-measure-tight">
                What every one of our renovations covers.
              </h2>
              <p className="et-lead et-measure">
                This is the standard scope across our packages. Fittings and
                tile coverage change between tiers — the work below does not.
              </p>
              <p className="et-body-sm">
                <Link href="/packages/" className="et-link">
                  See how the packages differ
                </Link>
              </p>
            </div>

            <div className="et-card">
              <ul className="et-checklist">
                {STANDARD_INCLUSIONS.map((item) => (
                  <li key={item} className="et-body-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="et-section et-band-ink">
        <div className="et-container et-stack">
          <span className="et-eyebrow">Customer review</span>
          <figure className="et-card et-card-dark">
            <blockquote className="et-quote">
              <p>{review.body}</p>
            </blockquote>
            <figcaption className="et-quote-author">
              — {review.author}
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="et-section et-band-surface">
        <div className="et-container et-stack">
          <span className="et-eyebrow">Also from us</span>
          <h2 className="et-h2 et-measure-tight">Our other services</h2>
          <div
            className="et-grid et-grid-3"
            style={{ marginTop: 'var(--et-space-8)' }}
          >
            {others.map((item) => (
              <Link
                key={item.slug}
                href={`/services/${item.slug}/`}
                className="et-card et-card-link"
              >
                <h3 className="et-h4">{item.title}</h3>
                <p
                  className="et-body-sm"
                  style={{
                    marginTop: 'var(--et-space-3)',
                    color: 'var(--et-text-secondary)',
                  }}
                >
                  {item.summary}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
