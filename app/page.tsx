import type { Metadata } from 'next'
import Link from 'next/link'
import { businessInfo, services } from '@/lib/businessInfo'
import { featuredReviews } from '@/lib/reviews'
import Image from 'next/image'
import { ContactSection } from '@/components/ContactSection'
import { WorkStrip } from '@/components/WorkStrip'
import { projects } from '@/lib/projects'

/**
 * Homepage.
 *
 * Targets "bathroom renovations near me" / "…contractors near me" (1K–10K/mo,
 * DECISIONS.md D-12) — the single largest opportunity in the project, and
 * deliberately NOT a suburb page, because the term is not suburb-specific.
 *
 * Conversion Rules (CLAUDE.md) this page must keep satisfying:
 *   - service + location in the H1
 *   - tap-to-call visible without scrolling on mobile (header CTA is sticky)
 *   - real social proof early — a named testimonial from Customer Reviews.md
 *   - 3-second clarity: what we do · where · what happens next
 *
 * Every claim below traces to PROJECT_CONTEXT.md §1–2 or Customer Reviews.md.
 * If you add a claim, trace it first.
 */

/**
 * Meta title and description started as the owner's own approved wording from
 * the Home page PDF on GitHub issue #2 (docs/source-copy/home.md). Both were
 * over the 30–60 / 50–160 char limits in docs/SEO_AEO_GEO_CHECKLIST.md Phase 1
 * (78 and ~178 chars) — flagged by GitHub issue #8's GEO audit (DECISIONS.md
 * D-91/O-10) — and the owner asked for them shortened (2026-08-23). Trimmed
 * for length only: every fact below still traces to the same source. The
 * description swaps "built to current Australian Standards" for the specific
 * standard code, AS 3740 — already the value of `businessInfo.standards.
 * waterproofing` — which is more concrete, not less accurate.
 */
export const metadata: Metadata = {
  title: 'Sydney Bathroom Renovations | Elite Touch Renovations',
  description:
    'Sydney bathroom, ensuite, powder room and bathroom-laundry renovations by the Dawood family. NSW-licensed, AS 3740 waterproofing, fixed-scope written quotes.',
  alternates: { canonical: '/' },
}

const PROCESS = [
  {
    step: '1',
    title: 'Free on-site measure',
    body: 'We come to you, measure the room, and talk through what you want. Across Sydney, at no cost.',
  },
  {
    step: '2',
    title: 'Fixed-scope written quote',
    body: 'You get the scope in writing — what is included, what is not, and what it costs. No verbal estimates.',
  },
  {
    step: '3',
    title: 'Demolition and waterproofing',
    body: 'Floor protection, strip-out, off-site rubbish removal, then waterproofing to AS 3740 — primer plus two coats, certificate included.',
  },
  {
    step: '4',
    title: 'Tiling, fit-off and final clean',
    body: 'New screed and falls to drains, tiling, plumbing and electrical fit-off, then a final clean before handover.',
  },
] as const

/* The hero photograph. Castle Hill's double vanity is the strongest single
   image we have and it is genuinely our work, in a Tier-1 suburb. */
const heroImage =
  projects.find((p) => p.slug === 'castle-hill-bathroom')!.images[0]

export default function HomePage() {
  const [firstReview, secondReview] = featuredReviews(2)

  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="et-hero">
        <div className="et-container">
          <div className="et-hero-grid">
            <div className="et-stack">
              <span className="et-eyebrow">Sydney · Family-run since 2022</span>

              <h1 className="et-display et-measure-tight">
                Bathroom renovations in Sydney, done once and done properly.
              </h1>

              <p className="et-lead et-measure">
                Elite Touch Renovations is a family-run bathroom renovation
                business working across Sydney. We strip out, waterproof to{' '}
                {businessInfo.standards.waterproofing}, tile and fit off — and
                we tell you the full scope and price in writing before anyone
                picks up a tool.
              </p>

              <div className="et-hero-cta">
                <Link
                  href="/contact-us/"
                  className="et-btn et-btn-lg et-btn-primary et-btn-block-mobile"
                >
                  {businessInfo.offer.primaryCta}
                </Link>
                {/* Real tel: anchor — never a JS handler (D-33) */}
                <a
                  href={businessInfo.phone.href}
                  className="et-btn et-btn-lg et-btn-secondary et-btn-block-mobile"
                >
                  Call {businessInfo.phone.display}
                </a>
              </div>

              <ul className="et-facts">
                <li className="et-fact">
                  <strong>NSW Builder Licence</strong>{' '}
                  {businessInfo.builderLicence}
                </li>
                <li className="et-fact">
                  <strong>Waterproofing</strong>{' '}
                  {businessInfo.standards.waterproofing} + certificate
                </li>
                <li className="et-fact">
                  <strong>Quotes</strong> Fixed scope, in writing
                </li>
                <li className="et-fact">
                  <strong>{businessInfo.workmanshipWarrantyYears}-year</strong>{' '}
                  workmanship warranty
                </li>
              </ul>
            </div>

            <div className="et-stack">
              {/* LCP candidate: eager + high priority. Our own photograph,
                  with alt text describing the photo (D-66). */}
              <div className="et-hero-media">
                <Image
                  src={heroImage.src}
                  alt={heroImage.alt}
                  width={heroImage.width}
                  height={heroImage.height}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  priority
                />
              </div>

            {/* Social proof above the fold — verbatim, attributed as written */}
            <aside className="et-card et-card-tinted">
              <span className="et-eyebrow">What our customers say</span>
              <blockquote
                className="et-quote"
                style={{ marginTop: 'var(--et-space-5)' }}
              >
                <p>{firstReview.body}</p>
              </blockquote>
              <p className="et-quote-author">— {firstReview.author}</p>
              <p
                className="et-body-sm"
                style={{
                  marginTop: 'var(--et-space-6)',
                  color: 'var(--et-text-secondary)',
                }}
              >
                <Link href="/about-us/" className="et-link">
                  Read more customer reviews
                </Link>
              </p>
            </aside>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Services ---------------- */}
      <section className="et-section et-band-canvas">
        <div className="et-container et-stack">
          <span className="et-eyebrow">What we do</span>
          <h2 className="et-h2 et-measure-tight">
            Four services. Wet areas are all we do.
          </h2>
          <p className="et-lead et-measure">
            We are not a general building company that also does bathrooms.
            Every job we take is a wet area, which is why the waterproofing and
            the tile setout are the parts we are hardest on.
          </p>

          <div
            className="et-grid et-grid-2"
            style={{ marginTop: 'var(--et-space-8)' }}
          >
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}/`}
                className="et-card et-card-link"
              >
                <h3 className="et-h3">{service.title}</h3>
                <p
                  className="et-body-sm"
                  style={{
                    marginTop: 'var(--et-space-3)',
                    color: 'var(--et-text-secondary)',
                  }}
                >
                  {service.summary}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Process ---------------- */}
      <section className="et-section et-band-surface">
        <div className="et-container et-stack">
          <span className="et-eyebrow">How it works</span>
          <h2 className="et-h2 et-measure-tight">
            What it is like to have us in your home.
          </h2>
          <p className="et-lead et-measure">
            A bathroom renovation is a considered purchase and a disruptive one.
            Knowing the sequence up front is worth more than any adjective we
            could use about ourselves.
          </p>

          <div style={{ marginTop: 'var(--et-space-10)' }}>
            {PROCESS.map((item) => (
              <div key={item.step} className="et-step">
                <span className="et-icon-tile" aria-hidden="true">
                  {item.step}
                </span>
                <div>
                  <h3 className="et-h4">{item.title}</h3>
                  <p
                    className="et-body-sm et-measure"
                    style={{
                      marginTop: 'var(--et-space-2)',
                      color: 'var(--et-text-secondary)',
                    }}
                  >
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Proof ---------------- */}
      <section className="et-section et-band-ink">
        <div className="et-container et-stack">
          <span className="et-eyebrow">In our customers&rsquo; words</span>
          <h2 className="et-h2 et-measure-tight">
            Communication, punctuality, and a clean site.
          </h2>
          <p className="et-lead et-measure">
            Those three things come up again and again in what our customers
            write, independently of each other. They are the parts of the job
            you actually live through.
          </p>

          <div
            className="et-grid et-grid-2"
            style={{ marginTop: 'var(--et-space-8)' }}
          >
            <figure className="et-card et-card-dark">
              <blockquote className="et-quote">
                <p>{secondReview.body}</p>
              </blockquote>
              <figcaption className="et-quote-author">
                — {secondReview.author}
              </figcaption>
            </figure>

            <div className="et-card et-card-dark">
              <h3 className="et-h4">Why people call us back</h3>
              <ul
                className="et-checklist"
                style={{ marginTop: 'var(--et-space-5)' }}
              >
                <li>Fixed-scope written quotes, not verbal estimates</li>
                <li>
                  Waterproofing to {businessInfo.standards.waterproofing} —
                  primer plus two coats, certificate included
                </li>
                <li>Regular updates by phone and SMS while the job runs</li>
                <li>Floor protection, drop sheets, and a clean site each day</li>
                <li>Final clean before handover</li>
                <li>
                  A {businessInfo.workmanshipWarrantyYears}-year workmanship
                  warranty on everything we build
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <WorkStrip
        title="Recent Sydney bathrooms"
        intro="Our own photographs of finished work, with the suburb each job was in."
        band="canvas"
      />

      <ContactSection />
    </>
  )
}
