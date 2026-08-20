import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { businessInfo } from '@/lib/businessInfo'
import {
  LOCATION_PARENT_SLUG,
  listableSuburbs,
  projectsInRegion,
  publishedLocationSlugs,
  regionBySlug,
} from '@/lib/locations'

/**
 * Regional hub pages: `/services/bathroom-renovations/{region}/`
 *
 * D-71 settled the route collision between D-11 and D-44: locations are
 * CHILDREN of the bathroom service page, not a parallel tree at the root.
 * That keeps exactly one canonical page for "bathroom renovations" and makes
 * the parent/child relationship explicit in the URL.
 *
 * ⚠️ Only regions with `hubPublished: true` in `service-areas.json` are built.
 * `dynamicParams = false` means anything else 404s. D-10 is emphatic that a
 * page per suburb is the thin/doorway pattern — the hub exists so that 50
 * suburbs can be served by ONE page with real content, not 50 near-identical
 * ones. Do not "helpfully" flip the other four hubs on without writing
 * genuinely differentiated content for each.
 *
 * What makes this page non-thin is `projectsInRegion` — real photographed,
 * suburb-attributed work. A hub with no local proof and no local detail is
 * exactly the page D-10 was written to prevent.
 */

export const dynamicParams = false

export function generateStaticParams() {
  return publishedLocationSlugs().map((location) => ({
    slug: LOCATION_PARENT_SLUG,
    location,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; location: string }>
}): Promise<Metadata> {
  const { slug, location } = await params
  const region = slug === LOCATION_PARENT_SLUG ? regionBySlug(location) : undefined

  if (!region) {
    return { title: 'Not found', robots: { index: false, follow: false } }
  }

  return {
    title: `Bathroom Renovations ${region.name}`,
    description: `Bathroom renovations across Sydney's ${region.name} by Elite Touch Renovations. Free on-site measure, fixed-scope written quotes, waterproofing to AS 3740 and a ${businessInfo.workmanshipWarrantyYears}-year workmanship warranty.`,
    alternates: {
      canonical: `/services/${LOCATION_PARENT_SLUG}/${region.slug}/`,
    },
  }
}

export default async function LocationHubPage({
  params,
}: {
  params: Promise<{ slug: string; location: string }>
}) {
  const { slug, location } = await params
  const region = slug === LOCATION_PARENT_SLUG ? regionBySlug(location) : undefined

  if (!region) notFound()

  const suburbs = listableSuburbs(region)
  const localProjects = projectsInRegion(region)

  return (
    <>
      <section className="et-hero">
        <div className="et-container et-stack">
          <p className="et-body-sm">
            <Link href={`/services/${LOCATION_PARENT_SLUG}/`} className="et-link">
              ← Bathroom renovations
            </Link>
          </p>
          <span className="et-eyebrow">{region.name}</span>
          <h1 className="et-h1 et-measure-tight">
            Bathroom renovations on Sydney&rsquo;s {region.name}
          </h1>
          <p className="et-lead et-measure">
            We strip out, waterproof to {businessInfo.standards.waterproofing},
            tile and fit off across the {region.name} — and we put the full
            scope and price in writing before anyone picks up a tool.
          </p>

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

          <ul className="et-facts">
            <li className="et-fact">
              <strong>NSW Builder Licence</strong> {businessInfo.builderLicence}
            </li>
            <li className="et-fact">
              <strong>{businessInfo.workmanshipWarrantyYears}-year</strong>{' '}
              workmanship warranty
            </li>
            <li className="et-fact">
              <strong>{suburbs.length} suburbs</strong> served in this area
            </li>
          </ul>
        </div>
      </section>

      {/* ---- Local proof. This is what stops the page being templated filler. ---- */}
      {localProjects.length > 0 && (
        <section className="et-section et-band-canvas">
          <div className="et-container et-stack">
            <span className="et-eyebrow">Work we have done here</span>
            <h2 className="et-h2 et-measure-tight">
              {localProjects.length === 1
                ? 'A project we completed in this area'
                : `${localProjects.length} projects we completed in this area`}
            </h2>
            <p className="et-lead et-measure">
              These are our own photographs of finished work, in the suburbs
              named. Not stock images, and not someone else&rsquo;s job.
            </p>

            <div
              className="et-grid et-grid-3"
              style={{ marginTop: 'var(--et-space-8)' }}
            >
              {localProjects.map((project, index) => (
                <Link
                  key={project.slug}
                  href={`/gallery/${project.slug}/`}
                  className="et-card et-card-link et-media-card"
                >
                  <span className="et-media-frame">
                    <Image
                      src={project.images[0].src}
                      alt={project.images[0].alt}
                      width={project.images[0].width}
                      height={project.images[0].height}
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      priority={index === 0}
                      loading={index === 0 ? 'eager' : 'lazy'}
                    />
                  </span>
                  <span className="et-badge-suburb">{project.suburb}</span>
                  <h3
                    className="et-h4"
                    style={{ marginTop: 'var(--et-space-3)' }}
                  >
                    {project.name}
                  </h3>
                  <p
                    className="et-body-sm"
                    style={{
                      marginTop: 'var(--et-space-3)',
                      color: 'var(--et-text-secondary)',
                    }}
                  >
                    {project.blurb}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---- Suburb list ---- */}
      <section className="et-section et-band-surface">
        <div className="et-container et-stack">
          <span className="et-eyebrow">Where we work</span>
          <h2 className="et-h2 et-measure-tight">
            {region.name} suburbs we service
          </h2>
          <p className="et-lead et-measure">
            We work {businessInfo.serviceArea.coverage}. These are the{' '}
            {region.name} suburbs in our regular run — if yours is not listed,
            call us anyway, it is very likely we cover it.
          </p>

          <ul
            className="et-suburb-list"
            style={{ marginTop: 'var(--et-space-8)' }}
          >
            {suburbs.map((suburb) => (
              <li key={suburb.slug} className="et-body-sm">
                {suburb.url ? (
                  <Link href={`${suburb.url}/`} className="et-link">
                    {suburb.name}
                  </Link>
                ) : (
                  suburb.name
                )}{' '}
                <span style={{ color: 'var(--et-text-muted)' }}>
                  {suburb.postcode}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- What every job includes ---- */}
      <section className="et-section et-band-ink">
        <div className="et-container et-stack">
          <span className="et-eyebrow">The same standard everywhere</span>
          <h2 className="et-h2 et-measure-tight">
            What you get, whichever suburb you are in.
          </h2>
          <div
            className="et-grid et-grid-2"
            style={{ marginTop: 'var(--et-space-8)' }}
          >
            <div className="et-card et-card-dark">
              <h3 className="et-h4">Every renovation</h3>
              <ul
                className="et-checklist"
                style={{ marginTop: 'var(--et-space-5)' }}
              >
                <li className="et-body-sm">
                  Free on-site measure, then a fixed-scope written quote
                </li>
                <li className="et-body-sm">
                  Waterproofing to {businessInfo.standards.waterproofingDated} —
                  primer plus two coats, certificate included
                </li>
                <li className="et-body-sm">
                  {businessInfo.workmanshipWarrantyYears}-year workmanship
                  warranty
                </li>
                <li className="et-body-sm">
                  {businessInfo.offer.deposit}, then{' '}
                  {businessInfo.offer.paymentSchedule}
                </li>
                <li className="et-body-sm">
                  Floor protection, drop sheets, and a clean site each day
                </li>
              </ul>
            </div>
            <div className="et-card et-card-dark">
              <h3 className="et-h4">Licensed and insured</h3>
              <ul
                className="et-checklist"
                style={{ marginTop: 'var(--et-space-5)' }}
              >
                <li className="et-body-sm">
                  NSW Builder Licence {businessInfo.builderLicence} —{' '}
                  {businessInfo.builderLicenceHolder}
                </li>
                <li className="et-body-sm">ABN {businessInfo.abn}</li>
                <li className="et-body-sm">
                  Public Liability {businessInfo.insurance.publicLiability}
                </li>
                <li className="et-body-sm">
                  {businessInfo.insurance.memberships.join(', ')} member
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="et-section et-band-canvas">
        <div className="et-container">
          <div className="et-card et-stack" style={{ textAlign: 'center' }}>
            <h2 className="et-h2">
              Book a free measure on the {region.name}
            </h2>
            <p className="et-lead et-measure" style={{ marginInline: 'auto' }}>
              We will come to you, measure the room, and send a fixed-scope
              written quote. No charge, no obligation.
            </p>
            <div className="et-hero-cta" style={{ justifyContent: 'center' }}>
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
        </div>
      </section>
    </>
  )
}
