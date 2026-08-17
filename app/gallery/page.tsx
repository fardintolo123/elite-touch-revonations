import type { Metadata } from 'next'
import Link from 'next/link'
import { businessInfo } from '@/lib/businessInfo'

/**
 * Gallery / our work.
 *
 * Existing indexed URL, and the 301 destination for `/staging/projects/` and
 * `/staging/bathroom-photo-gallery/`.
 *
 * ⚠️ NO PHOTOGRAPHS ON THIS PAGE YET, AND THAT IS NOT AN OVERSIGHT.
 *
 * 33 project photos exist in `ETR images/` and `ETR images and reviews/`, and
 * the owner has confirmed they are genuine ETR work with customer consent
 * (D-38, D-39). They still cannot ship, for two reasons:
 *
 *   1. The D-36 image pipeline has not cleared its Add-to-repo / Commit /
 *      public-asset-URL steps, and PROJECT_CONTEXT.md K9 has not decided where
 *      site assets live.
 *   2. D-39 / O-4: neither the owner nor the repo knows which suburb or
 *      project ANY individual photo belongs to. They may be used as general,
 *      unattributed project photography — they may NOT be captioned with a
 *      suburb, matched to the three case studies below, or labelled
 *      before/after without a genuine matched pair (D-06).
 *
 * So this page currently carries the three case studies that ARE evidenced,
 * in words. When the photos land, add them as unattributed project imagery
 * with alt text describing the photograph itself — never the page topic and
 * never the target keyword (PROJECT_CONTEXT.md §4.9).
 */

export const metadata: Metadata = {
  title: 'Our Work',
  description:
    'Bathroom renovation projects by Elite Touch Renovations across Sydney — including a heritage bathroom in The Rocks, a marble bathroom in Hunters Hill, and a bathroom and ensuite in Artarmon.',
  alternates: { canonical: '/gallery/' },
}

/**
 * The three documented case studies (PROJECT_CONTEXT.md §1).
 * Every detail here is evidenced. Do not add a budget, a duration, a client
 * name or a "before/after" claim that is not in that source (D-06).
 */
const CASE_STUDIES = [
  {
    name: 'Heritage bathroom, The Rocks',
    body: 'A bathroom in a 19th-century terrace, worked around an original timber-framed window that had to stay. Heritage fabric sets the constraints on a job like this — the waterproofing and the setout have to be planned around what cannot be moved.',
  },
  {
    name: 'Marble bathroom, Hunters Hill',
    body: 'Full-height marble, a custom double vanity and a freestanding bath. Large-format natural stone is unforgiving: the falls, the joints and the cuts all have to be right the first time, because there is no hiding a correction in marble.',
  },
  {
    name: 'Bathroom and ensuite, Artarmon',
    body: 'Two wet areas run as a single four-week program, in large-format porcelain with LED backlit mirrors. Running both together means one demolition, one waterproofing stage and one disruption to the household instead of two.',
  },
] as const

export default function GalleryPage() {
  return (
    <>
      <section className="et-hero">
        <div className="et-container et-stack">
          <span className="et-eyebrow">Our work</span>
          <h1 className="et-h1 et-measure-tight">
            Bathroom renovations we have completed across Sydney.
          </h1>
          <p className="et-lead et-measure">
            Three projects that show the range of what we take on — a heritage
            terrace, a full marble bathroom, and a two-room program run in one
            go.
          </p>
        </div>
      </section>

      <section className="et-section et-band-canvas">
        <div className="et-container et-stack">
          <span className="et-eyebrow">Case studies</span>
          <h2 className="et-h2 et-measure-tight">Three recent projects</h2>

          <div
            className="et-grid et-grid-3"
            style={{ marginTop: 'var(--et-space-8)' }}
          >
            {CASE_STUDIES.map((project) => (
              <article key={project.name} className="et-card">
                <h3 className="et-h4">{project.name}</h3>
                <p
                  className="et-body-sm"
                  style={{
                    marginTop: 'var(--et-space-4)',
                    color: 'var(--et-text-secondary)',
                  }}
                >
                  {project.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="et-section et-band-surface">
        <div className="et-container">
          <div className="et-card et-stack" style={{ textAlign: 'center' }}>
            <h2 className="et-h2">Want to see what we would do with yours?</h2>
            <p className="et-lead et-measure" style={{ marginInline: 'auto' }}>
              Book a free on-site measure and we will talk through the options
              in your actual room.
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
