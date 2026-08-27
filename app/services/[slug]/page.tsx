import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { businessInfo, services } from '@/lib/businessInfo'
import { featuredReviews } from '@/lib/reviews'
import { ContactSection } from '@/components/ContactSection'
import { WorkStrip } from '@/components/WorkStrip'
import { PageHero } from '@/components/PageHero'
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema'
import { FaqSchema } from '@/components/FaqSchema'
import { projects } from '@/lib/projects'
import {
  LOCATION_PARENT_SLUG,
  listableSuburbs,
  publishedRegions,
} from '@/lib/locations'

/**
 * Which real, suburb-attributed photo (if any) illustrates each service hero.
 *
 * ⚠️ Only `bathroom-renovations` and `ensuite-bathroom-renovations` are
 * photographed (lib/projects.ts). `laundry-renovations` and
 * `powder-room-renovations` have NO evidenced photography — showing a
 * bathroom photo on either would imply proof of work we cannot support
 * (DECISIONS.md D-83, D-06). Those two slugs are deliberately absent from
 * this map, so their hero stays text-only. Do not add a fallback image here.
 */
const SERVICE_HERO_IMAGE: Partial<
  Record<(typeof services)[number]['slug'], { slug: string; imageIndex?: number }>
> = {
  'bathroom-renovations': { slug: 'randwick-bathroom', imageIndex: 1 },
  'ensuite-bathroom-renovations': { slug: 'hornsby-ensuite', imageIndex: 0 },
}

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
  const hubs = publishedRegions()

  const heroImageRef = SERVICE_HERO_IMAGE[service.slug]
  const heroProject = heroImageRef
    ? projects.find((p) => p.slug === heroImageRef.slug)
    : undefined

  // Optional per-service extras (currently: powder-room only — DECISIONS.md
  // D-107). Not every service has these, so guard with `in` rather than
  // assuming the field exists on the whole `Service` union.
  const about = 'about' in service ? service.about : undefined
  const faqs = 'faqs' in service ? service.faqs : undefined

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: `${businessInfo.siteUrl}/` },
          { name: 'Services', url: `${businessInfo.siteUrl}/services/` },
          {
            name: service.title,
            url: `${businessInfo.siteUrl}/services/${service.slug}/`,
          },
        ]}
      />
      {faqs && faqs.length > 0 && <FaqSchema items={[...faqs]} />}
      <PageHero
        eyebrow={service.title}
        title={service.h1}
        leads={[service.summary]}
        image={
          heroProject
            ? { project: heroProject, imageIndex: heroImageRef?.imageIndex }
            : undefined
        }
      />

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

      {/* Build durations. Owner-supplied (issue #2 service PDF), settled in
          D-75. These are on-site programs and a real customer promise — do not
          shorten them to sound more competitive. */}
      <section className="et-section et-band-surface">
        <div className="et-container et-stack">
          <span className="et-eyebrow">How long it takes</span>
          <h2 className="et-h2 et-measure-tight">
            How long you will have us in the house.
          </h2>
          <p className="et-lead et-measure">
            These are on-site programs, and you get yours in writing before work
            starts. Older Sydney homes can need extra days for what turns up at
            strip-out — rot, non-compliant plumbing, asbestos — and we tell you
            how that is handled in the quote, not afterwards.
          </p>

          <div
            className="et-grid et-grid-3"
            style={{ marginTop: 'var(--et-space-8)' }}
          >
            {businessInfo.buildDurations.map((item) => (
              <div key={item.label} className="et-card">
                <p className="et-h3">{item.weeks}</p>
                <h3
                  className="et-h4"
                  style={{ marginTop: 'var(--et-space-4)' }}
                >
                  {item.label}
                </h3>
                <p
                  className="et-body-sm"
                  style={{
                    marginTop: 'var(--et-space-2)',
                    color: 'var(--et-text-secondary)',
                  }}
                >
                  {item.detail}
                </p>
              </div>
            ))}
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

      {/* Published regional hubs. Only rendered for the service they hang off
          (D-71), and only for regions with `hubPublished: true` — a data row
          must never silently become an internal link to a page that has
          nothing to say (D-10). */}
      {service.slug === LOCATION_PARENT_SLUG && hubs.length > 0 && (
        <section className="et-section et-band-canvas">
          <div className="et-container et-stack">
            <span className="et-eyebrow">Where we work</span>
            <h2 className="et-h2 et-measure-tight">
              Bathroom renovations by area
            </h2>
            <p className="et-lead et-measure">
              We work {businessInfo.serviceArea.coverage}. These areas have a
              page of their own, with the projects we have completed there.
            </p>
            <div
              className="et-grid et-grid-3"
              style={{ marginTop: 'var(--et-space-8)' }}
            >
              {hubs.map((region) => (
                <Link
                  key={region.slug}
                  href={`${region.hubUrl}/`}
                  className="et-card et-card-link"
                >
                  <h3 className="et-h4">{region.name}</h3>
                  <p
                    className="et-body-sm"
                    style={{
                      marginTop: 'var(--et-space-3)',
                      color: 'var(--et-text-secondary)',
                    }}
                  >
                    {listableSuburbs(region).length} suburbs served
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

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
      <WorkStrip
        title="Bathrooms we have finished"
        intro="Our own photographs, with the suburb each job was in."
        band="canvas"
      />

      <ContactSection />

    </>
  )
}
