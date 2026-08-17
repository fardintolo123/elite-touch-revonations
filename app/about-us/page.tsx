import type { Metadata } from 'next'
import Link from 'next/link'
import { businessInfo } from '@/lib/businessInfo'
import { reviews } from '@/lib/reviews'

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

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Elite Touch Renovations is a family-run Sydney bathroom renovation business, founded in 2023 by the Dawood family. NSW Builder Licence 475204C.',
  alternates: { canonical: '/about-us/' },
}

export default function AboutPage() {
  return (
    <>
      <section className="et-hero">
        <div className="et-container et-stack">
          <span className="et-eyebrow">About us</span>
          <h1 className="et-h1 et-measure-tight">
            A family business that only renovates wet areas.
          </h1>
          <p className="et-lead et-measure">
            Elite Touch Renovations was founded in {businessInfo.foundedYear} by
            the Dawood family and works across Sydney. We are deliberately
            small: the people who quote your job are the people who run it.
          </p>
        </div>
      </section>

      {/* ---------------- The family ---------------- */}
      <section className="et-section et-band-canvas">
        <div className="et-container et-stack">
          <span className="et-eyebrow">Who you will deal with</span>
          <h2 className="et-h2 et-measure-tight">The Dawood family</h2>
          <p className="et-lead et-measure">
            Our customers name us individually in their reviews, which is a fair
            reflection of how the business runs — you are not handed to a
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
                Check it on the NSW Fair Trading register before you engage
                anyone, including us.
              </p>
            </div>

            <div className="et-card">
              <h3 className="et-h4">Waterproofing</h3>
              <p
                className="et-lead"
                style={{ marginTop: 'var(--et-space-2)', color: 'var(--et-text)' }}
              >
                {businessInfo.standards.waterproofing}
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
                Bathroom renovation is regulated work. Every job is delivered
                under the licences, insurances and statutory protections
                required by NSW law and the National Construction Code.
              </p>
            </div>

            <div className="et-card">
              <ul className="et-checklist">
                <li className="et-body-sm">
                  <strong>NSW Builder Licence:</strong>{' '}
                  {businessInfo.builderLicence} —{' '}
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
                  <strong>Home Building Compensation Cover:</strong>{' '}
                  {businessInfo.insurance.homeBuildingCompensation}
                </li>
                <li className="et-body-sm">
                  <strong>Industry membership:</strong>{' '}
                  {businessInfo.insurance.memberships.join(', ')}
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
                  <p className="et-h4">{standard.code}</p>
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

      <section className="et-section et-band-surface">
        <div className="et-container">
          <div className="et-card et-stack" style={{ textAlign: 'center' }}>
            <h2 className="et-h2">Talk to us about your bathroom</h2>
            <p className="et-lead et-measure" style={{ marginInline: 'auto' }}>
              A free on-site measure anywhere in Sydney, and a fixed-scope
              written quote to go with it.
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
