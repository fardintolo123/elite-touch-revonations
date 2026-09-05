import type { Metadata } from 'next'
import Link from 'next/link'
import { businessInfo } from '@/lib/businessInfo'
import { buildMetadata } from '@/lib/metadata'
import { reviews } from '@/lib/reviews'
import { ContactSection } from '@/components/ContactSection'
import { WorkStrip } from '@/components/WorkStrip'
import { PageHero } from '@/components/PageHero'
import { SchemaGraph } from '@/components/SchemaGraph'
import { ExternalLink } from '@/components/ExternalLink'
import { projects } from '@/lib/projects'

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

export default function AboutPage() {
  return (
    <>
      <SchemaGraph
        path="/about-us/"
        name="About Us"
        description="Elite Touch Renovations is a family-run Sydney bathroom renovation business, founded in 2022 by the Dawood family. NSW Builder Licence 475204C."
        pageType="AboutPage"
        breadcrumbs={[
          { name: 'Home', url: `${businessInfo.siteUrl}/` },
          { name: 'About Us', url: `${businessInfo.siteUrl}/about-us/` },
        ]}
      />
      <PageHero
        eyebrow="About us"
        title="A Sydney family business that only renovates wet areas."
        leads={[
          `Elite Touch Renovations was founded in ${businessInfo.foundedYear} by the Dawood family and works across Sydney. We are small on purpose: the people who quote your job are the people who run it.`,
          // Owner confirmed commercial work 2026-08-19 (D-67). Wording is the
          // owner's own from the About PDF — it widens the CLIENT TYPE only.
          // The four services are unchanged (D-01), and no commercial-specific
          // compliance claim is made.
          'We take on both residential and commercial projects, though most of our work is family homes.',
        ]}
        image={{ project: heroProject, imageIndex: 2 }}
      />

      {/* ---------------- The family ---------------- */}
      <section className="et-section et-band-canvas">
        <div className="et-container et-stack">
          <span className="et-eyebrow">Who you will deal with</span>
          <h2 className="et-h2 et-measure-tight">The Dawood family</h2>
          <p className="et-lead et-measure">
            Our customers name us by name in their reviews, which is a fair
            picture of how the business runs — you are not handed to a
            different team once the quote is signed.
          </p>

          <div
            className="et-grid et-grid-2"
            style={{ marginTop: 'var(--et-space-8)' }}
          >
            {businessInfo.principals.map((person) => (
              <div key={person.name} className="et-card">
                <h3 className="et-h4">{person.name}</h3>
                <p
                  className="et-caption"
                  style={{
                    marginTop: 'var(--et-space-2)',
                    color: 'var(--et-text-accent)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                  }}
                >
                  {person.role}
                </p>
                <p
                  className="et-body-sm"
                  style={{
                    marginTop: 'var(--et-space-4)',
                    color: 'var(--et-text-secondary)',
                  }}
                >
                  {person.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Credentials ---------------- */}
      <section className="et-section et-band-surface">
        <div className="et-container et-stack">
          <span className="et-eyebrow">Credentials</span>
          <h2 className="et-h2 et-measure-tight">
            What we are licensed and required to do.
          </h2>

          <div
            className="et-grid et-grid-3"
            style={{ marginTop: 'var(--et-space-8)' }}
          >
            <div className="et-card">
              <h3 className="et-h4">NSW Builder Licence</h3>
              <p
                className="et-lead"
                style={{ marginTop: 'var(--et-space-2)', color: 'var(--et-text)' }}
              >
                {businessInfo.builderLicence}
              </p>
              <p
                className="et-body-sm"
                style={{
                  marginTop: 'var(--et-space-3)',
                  color: 'var(--et-text-secondary)',
                }}
              >
                Check it on the{' '}
                <ExternalLink href={businessInfo.authorities.nswLicenceRegister}>
                  NSW Fair Trading register
                </ExternalLink>{' '}
                before you hire anyone, including us.
              </p>
            </div>

            <div className="et-card">
              <h3 className="et-h4">Waterproofing</h3>
              <p
                className="et-lead"
                style={{ marginTop: 'var(--et-space-2)', color: 'var(--et-text)' }}
              >
                <ExternalLink href={businessInfo.authorities.as3740}>
                  {businessInfo.standards.waterproofing}
                </ExternalLink>
              </p>
              <p
                className="et-body-sm"
                style={{
                  marginTop: 'var(--et-space-3)',
                  color: 'var(--et-text-secondary)',
                }}
              >
                Primer plus two coats, to current Australian Standards, with a
                certificate included in every package.
              </p>
            </div>

            <div className="et-card">
              <h3 className="et-h4">Quoting</h3>
              <p
                className="et-lead"
                style={{ marginTop: 'var(--et-space-2)', color: 'var(--et-text)' }}
              >
                Fixed scope, in writing
              </p>
              <p
                className="et-body-sm"
                style={{
                  marginTop: 'var(--et-space-3)',
                  color: 'var(--et-text-secondary)',
                }}
              >
                After a free on-site measure. You see what is included and what
                is not before you commit.
              </p>
            </div>
          </div>

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
                Bathroom renovation is regulated work. Every job meets the
                licence, insurance and legal rules set by NSW law and the
                {' '}
                <ExternalLink href={businessInfo.authorities.nccWetAreas}>
                  National Construction Code
                </ExternalLink>
                .
              </p>
            </div>

            <div className="et-card">
              <ul className="et-checklist">
                <li className="et-body-sm">
                  <strong>NSW Builder Licence:</strong>{' '}
                  <ExternalLink href={businessInfo.authorities.nswLicenceRegister}>
                    {businessInfo.builderLicence}
                  </ExternalLink>{' '}
                  —{' '}
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
            <div
              className="et-grid et-grid-3"
              style={{ marginTop: 'var(--et-space-6)' }}
            >
              {businessInfo.standards.full.map((standard) => (
                <div key={standard.code} className="et-card">
                  <p className="et-h4">
                    {'authorityKey' in standard ? (
                      <ExternalLink
                        href={businessInfo.authorities[standard.authorityKey]}
                      >
                        {standard.code}
                      </ExternalLink>
                    ) : (
                      standard.code
                    )}
                  </p>
                  <p
                    className="et-body-sm"
                    style={{
                      marginTop: 'var(--et-space-2)',
                      color: 'var(--et-text-secondary)',
                    }}
                  >
                    {standard.what}
                  </p>
                </div>
              ))}
            </div>
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
          <span className="et-eyebrow">Our commitments</span>
          <h2 className="et-h2 et-measure-tight">
            What we put in writing.
          </h2>

          <div
            className="et-grid et-grid-2"
            style={{ marginTop: 'var(--et-space-8)' }}
          >
            <div className="et-card et-card-tinted">
              <h3 className="et-h3">
                {businessInfo.workmanshipWarrantyYears}-year workmanship
                warranty
              </h3>
              <p
                className="et-body-sm"
                style={{
                  marginTop: 'var(--et-space-4)',
                  color: 'var(--et-text-secondary)',
                }}
              >
                On the work we carry out. This is on top of the warranty that
                comes with the fittings themselves, and the legal defects
                period under the{' '}
                <ExternalLink
                  href={businessInfo.authorities.nswHomeBuildingContracts}
                >
                  Home Building Act 1989
                </ExternalLink>
                .
              </p>
            </div>

            <div className="et-card">
              <h3 className="et-h4">How you pay</h3>
              <ul
                className="et-checklist"
                style={{ marginTop: 'var(--et-space-5)' }}
              >
                <li className="et-body-sm">
                  {businessInfo.offer.deposit} to book your start date
                </li>
                <li className="et-body-sm">
                  A {businessInfo.offer.paymentSchedule}, tied to agreed
                  milestones
                </li>
                <li className="et-body-sm">
                  You are never asked for money ahead of a milestone
                </li>
                <li className="et-body-sm">
                  {businessInfo.insurance.contract}
                </li>
              </ul>
            </div>
          </div>

          <div className="et-card" style={{ marginTop: 'var(--et-space-6)' }}>
            <h3 className="et-h4">One tree for every project</h3>
            <p
              className="et-body-sm et-measure"
              style={{
                marginTop: 'var(--et-space-3)',
                color: 'var(--et-text-secondary)',
              }}
            >
              {businessInfo.sustainability.claim} Greenfleet is an Australian
              not-for-profit that restores native forests.{' '}
              <ExternalLink
                href={businessInfo.sustainability.partnerUrl}
              >
                greenfleet.com.au
              </ExternalLink>
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- Reviews ----------------
          All 19, verbatim, attributed as written (D-03).
          Rendered eagerly and in full — never behind a lazy-loader or an
          IntersectionObserver, which would ship a fallback to crawlers (D-31).
      */}
      <section className="et-section et-band-canvas">
        <div className="et-container et-stack">
          <span className="et-eyebrow">Customer reviews</span>
          <h2 className="et-h2 et-measure-tight">
            What our customers have written about us.
          </h2>
          <p className="et-lead et-measure">
            Reproduced word for word, with the names as they were given.
          </p>

          <div
            className="et-grid et-grid-2"
            style={{ marginTop: 'var(--et-space-8)' }}
          >
            {reviews.map((review) => (
              <figure key={review.author} className="et-card">
                <blockquote className="et-quote">
                  {review.body.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </blockquote>
                <figcaption className="et-quote-author">
                  — {review.author}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <WorkStrip band="canvas" />

      <ContactSection />
    </>
  )
}
