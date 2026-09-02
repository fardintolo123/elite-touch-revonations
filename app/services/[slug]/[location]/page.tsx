import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { businessInfo, services } from '@/lib/businessInfo'
import { hubContentFor } from '@/lib/hubContent'
import { reviewByAuthor } from '@/lib/reviews'
import { ContactSection } from '@/components/ContactSection'
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema'
import { FaqSchema } from '@/components/FaqSchema'
import { ExternalLink } from '@/components/ExternalLink'
import {
  LOCATION_PARENT_SLUG,
  listableSuburbs,
  projectsInRegion,
  publishedLocationSlugs,
  publishedRegions,
  regionBySlug,
} from '@/lib/locations'
import { formatMonthYear } from '@/lib/dateLabels'

const parentService = services.find((s) => s.slug === LOCATION_PARENT_SLUG)!

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
  const reviewedMonth = formatMonthYear(region.updated ?? '2026-08-31')
  const publishedLocationSet = new Set(publishedLocationSlugs())
  const siblingRegions = publishedRegions().filter(
    (item) => item.slug !== region.slug,
  )

  // Per-region editorial content (answer-first lead, local detail, FAQ,
  // testimonial) — issue #35. Not every region has an entry; when it doesn't,
  // the extra sections simply don't render and the page is the older, thinner
  // shape. All three currently-published hubs have one.
  //
  // ⚠️ Band order below assumes the local-projects section (canvas) sits
  // between the answer block and the local-detail section (both surface). Every
  // published hub has projects; a future hub without them needs this revisited.
  const hub = hubContentFor(region.slug)
  const testimonial = hub ? reviewByAuthor(hub.testimonialAuthor) : undefined

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: `${businessInfo.siteUrl}/` },
          { name: 'Services', url: `${businessInfo.siteUrl}/services/` },
          {
            name: parentService.title,
            url: `${businessInfo.siteUrl}/services/${LOCATION_PARENT_SLUG}/`,
          },
          {
            name: region.name,
            url: `${businessInfo.siteUrl}/services/${LOCATION_PARENT_SLUG}/${region.slug}/`,
          },
        ]}
      />
      {hub && hub.faqs.length > 0 && <FaqSchema items={hub.faqs} />}
      <section className="et-hero">
        <div className="et-container et-stack">
          <p className="et-body-sm">
            <Link href={`/services/${LOCATION_PARENT_SLUG}/`} className="et-link">
              ← Bathroom renovations
            </Link>
          </p>
          <span className="et-eyebrow">{region.name}</span>
          <p className="et-caption">Reviewed {reviewedMonth}</p>
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

      {/* ---- Answer-first lead. A self-contained 134–167 word block an AI answer
             can lift whole (geo-audit G-2): service, cost + size basis, duration,
             licence, warranty, one area line. Copy lives in lib/hubContent.ts. ---- */}
      {hub && (
        <section className="et-section et-band-surface">
          <div className="et-container et-stack">
            <span className="et-eyebrow">In short</span>
            <h2 className="et-h2 et-measure-tight">
              What a bathroom renovation here costs and involves
            </h2>
            {hub.answer.map((para, index) => (
              <p
                key={index}
                className={
                  index === 0
                    ? 'et-lead et-measure'
                    : 'et-body-sm et-measure'
                }
              >
                {para}
              </p>
            ))}
            <p className="et-body-sm">
              <Link href="/packages/" className="et-link">
                See what the Basic, Standard and Premium packages include
              </Link>
            </p>
          </div>
        </section>
      )}

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

      {/* ---- Local detail. Truthful, non-invented facts about renovating in
             THIS region (D-06) — the section that has to fail the swap test.
             Copy lives in lib/hubContent.ts. ---- */}
      {hub && (
        <section className="et-section et-band-surface">
          <div className="et-container et-stack">
            <span className="et-eyebrow">Local knowledge</span>
            <h2 className="et-h2 et-measure-tight">
              {hub.localAngle.heading}
            </h2>
            {hub.localAngle.paragraphs.map((para, index) => (
              <p
                key={index}
                className={
                  index === 0
                    ? 'et-lead et-measure'
                    : 'et-body-sm et-measure'
                }
              >
                {para}
              </p>
            ))}
          </div>
        </section>
      )}

      {/* ---- Testimonial. Verbatim from lib/reviews.ts, NOT attributed to the
             region (local-audit §3: no review names a suburb; D-06). ---- */}
      {testimonial && (
        <section className="et-section et-band-ink">
          <div className="et-container et-stack">
            <span className="et-eyebrow">Customer review</span>
            <figure className="et-card et-card-dark">
              <blockquote className="et-quote">
                {testimonial.body.split('\n\n').map((para, index) => (
                  <p key={index}>{para}</p>
                ))}
              </blockquote>
              <figcaption className="et-quote-author">
                — {testimonial.author}
              </figcaption>
            </figure>
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
                {suburb.url && publishedLocationSet.has(suburb.slug) ? (
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

      <section className="et-section et-band-canvas">
        <div className="et-container et-stack">
          <span className="et-eyebrow">Plan the next step</span>
          <h2 className="et-h2 et-measure-tight">
            Compare areas and package options
          </h2>
          <p className="et-lead et-measure">
            If you are comparing a few Sydney areas or working out the size of
            the job, these pages sit closest to this one.
          </p>

          <div
            className="et-grid et-grid-3"
            style={{ marginTop: 'var(--et-space-8)' }}
          >
            {siblingRegions.map((item) => (
              <Link
                key={item.slug}
                href={`${item.hubUrl}/`}
                className="et-card et-card-link"
              >
                <h3 className="et-h4">{item.name}</h3>
                <p
                  className="et-body-sm"
                  style={{
                    marginTop: 'var(--et-space-3)',
                    color: 'var(--et-text-secondary)',
                  }}
                >
                  See bathroom renovation work and service coverage for this
                  area.
                </p>
              </Link>
            ))}
            <Link href="/packages/" className="et-card et-card-link">
              <h3 className="et-h4">Packages and pricing</h3>
              <p
                className="et-body-sm"
                style={{
                  marginTop: 'var(--et-space-3)',
                  color: 'var(--et-text-secondary)',
                }}
              >
                Compare what changes between the Basic, Standard and Premium
                scopes.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* ---- Local FAQ. Visible <details> AND FAQPage schema (emitted near the
             top) — the two carry byte-identical text. Copy: lib/hubContent.ts. ---- */}
      {hub && hub.faqs.length > 0 && (
        <section className="et-section et-band-surface">
          <div className="et-container">
            <div className="et-stack">
              <span className="et-eyebrow">FAQ</span>
              <h2 className="et-h2 et-measure-tight">
                {region.name}: common bathroom renovation questions
              </h2>
            </div>
            <div
              className="et-stack"
              style={{
                marginTop: 'var(--et-space-8)',
                gap: 'var(--et-space-4)',
              }}
            >
              {hub.faqs.map((item) => (
                <details key={item.question} className="et-card">
                  <summary className="et-h4" style={{ cursor: 'pointer' }}>
                    {item.question}
                  </summary>
                  <p
                    className="et-body-sm"
                    style={{
                      marginTop: 'var(--et-space-4)',
                      color: 'var(--et-text-secondary)',
                    }}
                  >
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

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
                  Waterproofing to{' '}
                  <ExternalLink href={businessInfo.authorities.as3740}>
                    {businessInfo.standards.waterproofingDated}
                  </ExternalLink>{' '}
                  —
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
                  NSW Builder Licence{' '}
                  <ExternalLink href={businessInfo.authorities.nswLicenceRegister}>
                    {businessInfo.builderLicence}
                  </ExternalLink>{' '}
                  —{' '}
                  {businessInfo.builderLicenceHolder}
                </li>
                <li className="et-body-sm">ABN {businessInfo.abn}</li>
                <li className="et-body-sm">
                  Public Liability {businessInfo.insurance.publicLiability}
                </li>
                <li className="et-body-sm">
                  <ExternalLink href={businessInfo.authorities.hiaMembers}>
                    {businessInfo.insurance.memberships.join(', ')}
                  </ExternalLink>{' '}
                  member
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  )
}
