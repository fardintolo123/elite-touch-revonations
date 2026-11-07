import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { businessInfo } from '@/lib/businessInfo'
import { buildMetadata } from '@/lib/metadata'
import { formatReviewBody, reviewByAuthor, reviews } from '@/lib/reviews'
import { ContactSection } from '@/components/ContactSection'
import { WorkStrip } from '@/components/WorkStrip'
import { SchemaGraph } from '@/components/SchemaGraph'
import { ExternalLink } from '@/components/ExternalLink'
import { projects } from '@/lib/projects'
import { Breadcrumbs } from '@/components/Breadcrumbs'

/**
 * About us.
 *
 * Also the destination for the old `/staging/reviews/` URL (301), which is why
 * the full testimonial set lives here rather than on a separate reviews page.
 *
 * ⚠️ There are FOUR Dawoods, not three. DECISIONS.md D-37 recorded three and is
 * now known to be incomplete — the owner's own About copy (GitHub issue #2,
 * preserved in docs/source-copy/about-revision.md) names four and the Home copy
 * says "The four Dawoods running Elite Touch". The roles here are the owner's,
 * which also differ from D-37: Omar is the licensed builder and founder, not a
 * Projects Manager, and Adam is the father of the other three.
 * See docs/ISSUE_FINDINGS.md §B.2.
 */

export const metadata: Metadata = buildMetadata({
  path: '/about-us/',
  title: 'About Us',
  description:
    'Elite Touch Renovations is a family-run Sydney bathroom renovation business, founded in 2022 by the Dawood family. NSW Builder Licence 475204C.',
})

const heroProject = projects.find((p) => p.slug === 'artarmon-bathroom')!
const heroImage = heroProject.images[2]
const featuredReviews = [
  reviewByAuthor('Simon Andrews'),
  reviewByAuthor('Luke Saukilai'),
  reviewByAuthor('Kieran C'),
]
const featuredReviewAuthors = new Set(featuredReviews.map((review) => review.author))
const otherReviews = reviews.filter((review) => !featuredReviewAuthors.has(review.author))

export default function AboutPage() {
  /* One array, two consumers: the visible trail and the BreadcrumbList (D-180). */
  const breadcrumbs = [
    { name: 'Home', url: `${businessInfo.siteUrl}/` },
    { name: 'About Us', url: `${businessInfo.siteUrl}/about-us/` },
  ] as const

  return (
    <>
      <SchemaGraph
        path="/about-us/"
        name="About Us"
        description="Elite Touch Renovations is a family-run Sydney bathroom renovation business, founded in 2022 by the Dawood family. NSW Builder Licence 475204C."
        pageType="AboutPage"
        breadcrumbs={breadcrumbs}
      />
      <section className="et-hero">
        <div className="et-container">
          <Breadcrumbs items={breadcrumbs} />
          <div className="et-hero-grid">
            <div className="et-stack">
              <div className="et-hero-media">
                <Image
                  src={heroImage.src}
                  alt={heroImage.alt}
                  width={heroImage.width}
                  height={heroImage.height}
                  sizes="(min-width: 1360px) 652px, (min-width: 1024px) 50vw, 100vw"
                  priority
                />
              </div>
              <Link
                href={`/gallery/${heroProject.slug}/`}
                className="et-body-sm et-link"
                style={{ display: 'inline-flex', width: 'fit-content' }}
              >
                See the {heroProject.name}
              </Link>
            </div>
            <div className="et-stack">
              <h1 className="et-h1 et-measure-tight">
                A Sydney family business that only renovates wet areas.
              </h1>
              <p className="et-lead et-measure">
                The Dawood family started Elite Touch Renovations in{' '}
                {businessInfo.foundedYear}. We work across Sydney. The people
                who quote your job also run it.
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
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- The family ---------------- */}
      <section className="et-section et-band-canvas">
        <div className="et-container et-stack">
          <h2 className="et-h2 et-measure-tight">The Dawood family</h2>
          <p className="et-lead et-measure">
            Customers name us in reviews. The people you meet run your job.
          </p>
          <p className="et-body-sm et-measure">
            We work on homes and commercial projects. Most of our work is
            family homes.
          </p>

          <dl className="et-stack" style={{ marginTop: 'var(--et-space-4)' }}>
            {businessInfo.principals.map((person) => (
              <div
                key={person.name}
                style={{
                  borderTop: '1px solid var(--et-border)',
                  paddingBlock: 'var(--et-space-5)',
                }}
              >
                <dt className="et-h4">{person.name}</dt>
                <dd
                  className="et-stack-tight"
                  style={{ marginInlineStart: 0, marginTop: 'var(--et-space-2)' }}
                >
                  <p className="et-caption">{person.role}</p>
                  <p className="et-body-sm et-measure">{person.detail}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------------- Credentials ---------------- */}
      <section className="et-section et-band-surface">
        <div className="et-container et-stack">
          <h2 className="et-h2 et-measure-tight">
            What we are licensed and required to do.
          </h2>

          <dl className="et-stack" style={{ marginTop: 'var(--et-space-4)' }}>
            <div
              style={{
                borderTop: '1px solid var(--et-border)',
                paddingBlock: 'var(--et-space-5)',
              }}
            >
              <dt className="et-h4">NSW Builder Licence</dt>
              <dd className="et-body-sm" style={{ marginInlineStart: 0 }}>
                Licence number {businessInfo.builderLicence}. Check it on the{' '}
                <ExternalLink href={businessInfo.authorities.nswLicenceRegister}>
                  NSW Fair Trading register
                </ExternalLink>
              </dd>
            </div>
            <div
              style={{
                borderTop: '1px solid var(--et-border)',
                paddingBlock: 'var(--et-space-5)',
              }}
            >
              <dt className="et-h4">Waterproofing</dt>
              <dd className="et-body-sm" style={{ marginInlineStart: 0 }}>
                <ExternalLink href={businessInfo.authorities.as3740}>
                  {businessInfo.standards.waterproofing}
                </ExternalLink>
                . We use primer and two coats. Each package includes a
                certificate. We work to current Australian Standards.
              </dd>
            </div>
            <div
              style={{
                borderTop: '1px solid var(--et-border)',
                paddingBlock: 'var(--et-space-5)',
              }}
            >
              <dt className="et-h4">Quoting</dt>
              <dd className="et-body-sm" style={{ marginInlineStart: 0 }}>
                After a free on-site measure, we write the scope. You see what
                is included and what is not before you commit.
              </dd>
            </div>
          </dl>

          {/* Licences, insurances and statutory protections — all owner-supplied
              (issue #2). Every one of these is checkable, which is the point:
              on a builder's site an unverifiable claim is worth less than none. */}
          <div
            className="et-grid et-grid-2"
            style={{ marginTop: 'var(--et-space-12)' }}
          >
            <div className="et-stack">
              <h3 className="et-h3 et-measure-tight">
                Licences, insurance and protections
              </h3>
              <p className="et-body-sm et-measure">
                NSW bathroom work must meet the law and the{' '}
                <ExternalLink href={businessInfo.authorities.nccWetAreas}>
                  National Construction Code
                </ExternalLink>
                . We meet the rules for licences and insurance.
              </p>
            </div>

            <div>
              <ul className="et-checklist">
                <li className="et-body-sm">
                  <strong>NSW Builder Licence:</strong>{' '}
                  <ExternalLink href={businessInfo.authorities.nswLicenceRegister}>
                    {businessInfo.builderLicence}
                  </ExternalLink>{' '}
                  -{' '}
                  {businessInfo.builderLicenceHolder}
                </li>
                <li className="et-body-sm">
                  <strong>ABN:</strong> {businessInfo.abn} ·{' '}
                  <strong>ACN:</strong> {businessInfo.acn}
                </li>
                <li className="et-body-sm">
                  <strong>Public Liability Insurance:</strong>{' '}
                  {businessInfo.insurance.publicLiability} cover
                </li>
                <li className="et-body-sm">
                  <strong>Workers&rsquo; Compensation:</strong>{' '}
                  {businessInfo.insurance.workersCompensation}
                </li>
                <li className="et-body-sm">
                  <strong>
                    <ExternalLink
                      href={businessInfo.authorities.nswHomeBuildingContracts}
                    >
                      Home Building Compensation Cover
                    </ExternalLink>
                    :
                  </strong>{' '}
                  {businessInfo.insurance.homeBuildingCompensation}
                </li>
                <li className="et-body-sm">
                  <strong>Industry membership:</strong>{' '}
                  <ExternalLink href={businessInfo.authorities.hiaMembers}>
                    {businessInfo.insurance.memberships.join(', ')}
                  </ExternalLink>
                </li>
              </ul>
            </div>
          </div>

          {/* The standards each trade works to. */}
          <div style={{ marginTop: 'var(--et-space-12)' }}>
            <h3 className="et-h3 et-measure-tight">
              The standards every trade works to
            </h3>
            <ul
              className="et-stack"
              style={{ marginTop: 'var(--et-space-6)' }}
            >
              {businessInfo.standards.full.map((standard) => (
                <li
                  key={standard.code}
                  style={{
                    borderTop: '1px solid var(--et-border)',
                    paddingBlock: 'var(--et-space-4)',
                  }}
                >
                  <h4 className="et-h4">
                    {'authorityKey' in standard ? (
                      <ExternalLink
                        href={businessInfo.authorities[standard.authorityKey]}
                      >
                        {standard.code}
                      </ExternalLink>
                    ) : (
                      standard.code
                    )}
                  </h4>
                  <p className="et-body-sm et-measure">{standard.what}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------- Our commitments ----------------
          Every line here is an owner-confirmed commitment, not marketing.
          The 10-year workmanship warranty was confirmed 2026-08-19 (closes
          D-19) and is a CONTRACTUAL claim — state it as written, never
          embellish it, never extend it to third-party fittings.
      */}
      <section className="et-section et-band-canvas">
        <div className="et-container et-stack">
          <h2 className="et-h2 et-measure-tight">
            What we put in writing.
          </h2>

          <dl className="et-stack" style={{ marginTop: 'var(--et-space-4)' }}>
            <div
              style={{
                borderTop: '1px solid var(--et-border)',
                paddingBlock: 'var(--et-space-5)',
              }}
            >
              <dt className="et-h4">
                {businessInfo.workmanshipWarrantyYears}-year workmanship
                warranty
              </dt>
              <dd
                className="et-body-sm et-measure"
                style={{ marginInlineStart: 0 }}
              >
                Our {businessInfo.workmanshipWarrantyYears}-year warranty
                covers our work. Fittings have their own warranty. The{' '}
                <ExternalLink
                  href={businessInfo.authorities.nswHomeBuildingContracts}
                >
                  Home Building Act 1989
                </ExternalLink>
                {' '}also sets a defects period.
              </dd>
            </div>
            <div
              style={{
                borderTop: '1px solid var(--et-border)',
                paddingBlock: 'var(--et-space-5)',
              }}
            >
              <dt className="et-h4">How you pay</dt>
              <dd style={{ marginInlineStart: 0 }}>
                <ul className="et-checklist">
                  <li className="et-body-sm">
                    {businessInfo.offer.deposit} to book your start date
                  </li>
                  <li className="et-body-sm">
                    A {businessInfo.offer.paymentSchedule}, tied to agreed
                    milestones
                  </li>
                  <li className="et-body-sm">
                    We never ask for payment before a milestone.
                  </li>
                  <li className="et-body-sm">
                    {businessInfo.insurance.contract}
                  </li>
                </ul>
              </dd>
            </div>
            <div
              style={{
                borderTop: '1px solid var(--et-border)',
                paddingBlock: 'var(--et-space-5)',
              }}
            >
              <dt className="et-h4">One tree for every project</dt>
              <dd
                className="et-body-sm et-measure"
                style={{ marginInlineStart: 0 }}
              >
                {businessInfo.sustainability.claim}{' '}
                <ExternalLink href={businessInfo.sustainability.partnerUrl}>
                  greenfleet.com.au
                </ExternalLink>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ---------------- Reviews ----------------
          All 19, verbatim, attributed as written (D-03).
          Rendered eagerly and in full — never behind a lazy-loader or an
          IntersectionObserver, which would ship a fallback to crawlers (D-31).
      */}
      <section className="et-section et-band-canvas">
        <div className="et-container et-stack">
          <h2 className="et-h2 et-measure-tight">
            What our customers have written about us.
          </h2>
          <p className="et-lead et-measure">
            These reviews are word for word. We use each name as given.
          </p>

          <div className="et-grid et-grid-2">
            {featuredReviews.map((review) => (
              <figure
                key={review.author}
                style={{
                  borderTop: '1px solid var(--et-border)',
                  paddingBlock: 'var(--et-space-6)',
                }}
              >
                <blockquote className="et-quote et-measure">
                  {formatReviewBody(review.body).split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </blockquote>
                <figcaption className="et-quote-author">
                  By {review.author}
                </figcaption>
              </figure>
            ))}
          </div>
          <details className="et-faq-item">
            <summary className="et-faq-question">
              <span>Read the other {otherReviews.length} customer reviews</span>
            </summary>
            <div
              className="et-grid et-grid-2"
              style={{ paddingBlock: 'var(--et-space-4)' }}
            >
              {otherReviews.map((review) => (
                <figure
                  key={review.author}
                  style={{
                    borderTop: '1px solid var(--et-border)',
                    paddingBlock: 'var(--et-space-6)',
                  }}
                >
                  <blockquote className="et-quote et-measure">
                    {formatReviewBody(review.body).split('\n\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </blockquote>
                  <figcaption className="et-quote-author">
                    By {review.author}
                  </figcaption>
                </figure>
              ))}
            </div>
          </details>
        </div>
      </section>

      <WorkStrip band="canvas" />

      <ContactSection />
    </>
  )
}
