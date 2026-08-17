import type { Metadata } from 'next'
import Link from 'next/link'
import { businessInfo } from '@/lib/businessInfo'

/**
 * Packages / pricing.
 *
 * Existing indexed URL (page-sitemap.xml), and the 301 destination for both
 * `/packages-deals/` and `/staging/bathroom-renovation-pricing/`.
 *
 * ⚠️ TWO RULES BIND EVERY NUMBER ON THIS PAGE (DECISIONS.md D-07):
 *   1. A price is ALWAYS shown with the bathroom size it is based on. A
 *      size-free price is the fastest route to a disputed fixed-scope quote.
 *   2. "Starts from" is never shortened to a flat price.
 *
 * The source of truth is the "Elite Touch Renovation Packages" PDF on issue #2,
 * summarised in PROJECT_CONTEXT.md §2. If a claim is not in it, it is not in
 * the package — do not paraphrase this into "includes everything" or
 * "premium fittings throughout".
 */

export const metadata: Metadata = {
  title: 'Bathroom Renovation Packages & Pricing',
  description:
    'Elite Touch Renovations bathroom renovation packages. BASIC $17,999, STANDARD from $25,999, PREMIUM from $32,999 — each tied to a stated bathroom size.',
  alternates: { canonical: '/packages/' },
}

const TIERS = [
  {
    name: 'ORIGINAL',
    /** K7 — the figure exists in the PDF's structure but was never captured. */
    price: null as string | null,
    priceNote: 'Ask us for the current price',
    size: 'approx. 1.5 m × 1.5 m × 2.4 m and similar',
    highlights: [
      'Our entry tier',
      'The full standard scope — demolition, waterproofing, tiling, fit-off',
    ],
  },
  {
    name: 'BASIC',
    price: '$17,999',
    priceNote: 'Fixed price for this size',
    size: 'approx. 1.5 m × 1.8 m × 2.4 m',
    highlights: [
      '300×600 ceramic tiling to the shower enclosure',
      '600 mm pencil-edge mirror',
      '600 mm ceramic-top vanity',
      'Standard shower head, framed screen, standard towel rail',
      'Back-to-wall toilet, 2 LED downlights',
    ],
  },
  {
    name: 'STANDARD',
    price: 'from $25,999',
    priceNote: 'Starts from — final price set at quote',
    size: 'approx. 1.8 m × 2.4 m × 2.4 m',
    highlights: [
      'Floor-to-ceiling 300×600 tiling',
      '900 mm mirror',
      '900 mm vanity',
      'Semi-frameless screen',
      '3 LED downlights',
    ],
  },
  {
    name: 'PREMIUM',
    price: 'from $32,999',
    priceNote: 'Starts from — final price set at quote',
    /* Corrected 2026-08-17 from the Packages PDF (issue #2): three dimensions,
       not two. PROJECT_CONTEXT.md §2 had recorded "approx. 2.4 m × 2.4 m". */
    size: 'approx. 2.4 m × 2.4 m × 2.4 m',
    highlights: [
      'Floor-to-ceiling 600×600 tiling',
      '1200 mm shaving cabinet',
      '1200 mm stone-top vanity',
      'Rain head with hand rail, fully framed screen',
      'Heated towel rail, in-wall cistern toilet, heated flooring',
    ],
  },
] as const

const IN_EVERY_TIER = [
  'Planning and design',
  'Demolition, floor protection and complete off-site rubbish removal',
  'Electrical — safe disconnection, replacement power points and light switch',
  'Plumbing — safe disconnection and installation of new fittings',
  'Render or re-sheet walls',
  'Waterproofing to Australian Standards — primer plus two coats, certificate included',
  'Tiling — new screed with falls to drains, glues, trims, grouts and silicone',
  'Final clean before handover',
] as const

export default function PackagesPage() {
  return (
    <>
      <section className="et-hero">
        <div className="et-container et-stack">
          <span className="et-eyebrow">Packages</span>
          <h1 className="et-h1 et-measure-tight">
            Bathroom renovation packages and pricing.
          </h1>
          <p className="et-lead et-measure">
            Each package price is tied to a bathroom of a stated size. That is
            deliberate — a price quoted without the size it assumes is not a
            price, it is a guess. Your final figure is fixed in writing after a
            free on-site measure.
          </p>
        </div>
      </section>

      <section className="et-section et-band-canvas">
        <div className="et-container">
          <div className="et-grid et-grid-4">
            {TIERS.map((tier) => (
              <div key={tier.name} className="et-card">
                <span className="et-eyebrow">{tier.name}</span>

                <p
                  className="et-h3"
                  style={{ marginTop: 'var(--et-space-5)' }}
                >
                  {tier.price ?? 'Price on request'}
                </p>
                <p
                  className="et-caption"
                  style={{ color: 'var(--et-text-muted)' }}
                >
                  {tier.priceNote}
                </p>

                {/* The size basis is NOT optional. D-07. */}
                <p
                  className="et-body-sm"
                  style={{
                    marginTop: 'var(--et-space-4)',
                    paddingTop: 'var(--et-space-4)',
                    borderTop: '1px solid var(--et-border)',
                    color: 'var(--et-text-secondary)',
                  }}
                >
                  <strong style={{ color: 'var(--et-text)' }}>
                    Based on a bathroom of
                  </strong>
                  <br />
                  {tier.size}
                </p>

                <ul
                  className="et-checklist"
                  style={{ marginTop: 'var(--et-space-6)' }}
                >
                  {tier.highlights.map((item) => (
                    <li key={item} className="et-body-sm">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p
            className="et-body-sm et-measure"
            style={{
              marginTop: 'var(--et-space-10)',
              color: 'var(--et-text-secondary)',
            }}
          >
            If your bathroom is larger than the size a package is based on, or
            the scope differs, the price changes. We will tell you that at the
            measure, not after the demolition.
          </p>
        </div>
      </section>

      <section className="et-section et-band-surface">
        <div className="et-container">
          <div className="et-grid et-grid-2">
            <div className="et-stack">
              <span className="et-eyebrow">Every tier</span>
              <h2 className="et-h2 et-measure-tight">
                What you get regardless of which package you choose.
              </h2>
              <p className="et-lead et-measure">
                The difference between the tiers is tile size and coverage, and
                the fittings schedule. The work itself does not change.
              </p>
            </div>
            <div className="et-card">
              <ul className="et-checklist">
                {IN_EVERY_TIER.map((item) => (
                  <li key={item} className="et-body-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="et-section et-band-canvas">
        <div className="et-container">
          <div className="et-card et-stack" style={{ textAlign: 'center' }}>
            <h2 className="et-h2">Get your fixed-scope written quote</h2>
            <p className="et-lead et-measure" style={{ marginInline: 'auto' }}>
              Free on-site measure anywhere in Sydney. The quote sets out what
              is included and what is not.
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
