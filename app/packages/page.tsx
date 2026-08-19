import type { Metadata } from 'next'
import Link from 'next/link'
import { businessInfo } from '@/lib/businessInfo'

/**
 * Packages / pricing.
 *
 * Existing indexed URL (page-sitemap.xml), and the 301 destination for both
 * `/packages-deals/` and `/staging/bathroom-renovation-pricing/`.
 *
 * SOURCE OF TRUTH: `docs/source-copy/packages-2026-08-19.md` — the revision the
 * owner supplied on 2026-08-19. It SUPERSEDES the issue-#2 sheet
 * (`docs/source-copy/packages.md`). Three tiers, not four — the ORIGINAL tier
 * no longer exists.
 *
 * The prices are from the owner directly (2026-08-19): "basic packages starts
 * from 18k. Standard packages starts from 25k and premium starts from 30k".
 * The PDF itself prints "Contact Us For A Quote" with no figures.
 *
 * ⚠️ TWO RULES BIND EVERY NUMBER ON THIS PAGE (DECISIONS.md D-07):
 *   1. A price is ALWAYS shown with the bathroom size it is based on.
 *   2. All three are "from" prices. None of them is a fixed price — the owner
 *      said "starts from" for every tier. Never shorten one to a flat figure.
 *
 * If a claim is not in the current sheet, it is not in the package. In
 * particular do NOT reintroduce the old sheet's in-wall cistern, 1200mm vanity
 * or 3 downlights — the current sheet does not include them.
 */

export const metadata: Metadata = {
  title: 'Bathroom Renovation Packages & Pricing',
  description:
    'Elite Touch Renovations bathroom renovation packages. Basic from $18,000, Standard from $25,000, Premium from $30,000 — each tied to a stated bathroom size, with a fixed-scope written quote.',
  alternates: { canonical: '/packages/' },
}

const TIERS = [
  {
    name: 'Basic',
    price: 'From $18,000',
    size: 'approx. 1.5 m × 1.8 m × 2.4 m',
    electrical: '1 power point and 1 light switch replaced',
    tiling:
      '300×600 ceramic wall tiles in the shower enclosure to 2.1 m, and 1.2 m outside the shower area',
    fittings: [
      '300×600 or 600×600 ceramic floor and wall tiles',
      '600 mm pencil edge shaving cabinet',
      '600 mm vanity',
      'Basin mixer and shower mixer',
      'Shower head with hand rail',
      'Custom-made semi-frameless shower screen',
      'Back-to-wall toilet',
      'Accessories — towel ring, toilet paper holder, towel rail, floor wastes',
    ],
  },
  {
    name: 'Standard',
    price: 'From $25,000',
    size: 'approx. 1.8 m × 2.4 m × 2.4 m',
    electrical: '2 power points and 1 light switch replaced',
    tiling:
      '300×600 or 600×600 wall and floor tiles, tiled complete floor to ceiling',
    fittings: [
      '300×600 or 600×600 ceramic floor and wall tiles',
      '900 mm pencil edge shaving cabinet',
      '900 mm vanity',
      'Basin mixer and shower mixer',
      'Rain shower head with hand rail',
      'Custom-made fully frameless shower screen',
      'Back-to-wall toilet',
      'Accessories — towel ring, toilet paper holder, towel rail, floor wastes',
    ],
  },
  {
    name: 'Premium',
    price: 'From $30,000',
    size: 'approx. 2.4 m × 2.4 m × 2.4 m',
    electrical:
      '3 power points and 1 light switch replaced, 2 LED downlights, exhaust fan, heated flooring',
    tiling:
      '300×600 or 600×600 wall and floor tiles, tiled complete floor to ceiling',
    fittings: [
      '300×600 or 600×600 ceramic floor and wall tiles',
      '900 mm pencil edge shaving cabinet',
      '900 mm vanity',
      'Basin mixer and shower mixer',
      'Rain shower head with hand rail',
      'Custom-made fully frameless shower screen',
      'Freestanding bath',
      'Heated towel rail and heated flooring',
      'Back-to-wall toilet',
      '2 LED downlights and an exhaust fan',
    ],
  },
] as const

/** In all three tiers, per the current sheet. */
const IN_EVERY_TIER = [
  'Demolition — disconnection and removal of all existing fittings, floor and wall tiles including old cement bedding, and complete off-site rubbish removal',
  'Safe disconnection of existing electrical and plumbing connections',
  'Installation of new fittings — toilet, vanity, towel rail, toilet roll holder, shower head, shower mixer, vanity mixer',
  'Waterproofing to Australian Standards using premium waterproofing products',
  'Aluminium angles supplied and installed around the shower and at the door',
  'New screed to create appropriate falls to drains',
  'All glues, tile trims and grouts',
  'Supply and installation of a custom shower screen',
  'Painting of bathroom ceilings',
  'Final clean of the bathroom prior to handover',
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
            price, it is a guess. All three are starting prices; your final
            figure is fixed in writing after a free on-site measure.
          </p>
          <ul className="et-facts">
            <li className="et-fact">
              <strong>{businessInfo.workmanshipWarrantyYears}-year</strong>{' '}
              workmanship warranty
            </li>
            <li className="et-fact">
              <strong>{businessInfo.offer.deposit}</strong> to start
            </li>
            <li className="et-fact">
              <strong>Progressive payments</strong>{' '}
              {businessInfo.offer.paymentSchedule}
            </li>
          </ul>
        </div>
      </section>

      <section className="et-section et-band-canvas">
        <div className="et-container">
          <div className="et-grid et-grid-3">
            {TIERS.map((tier) => (
              <div key={tier.name} className="et-card">
                <span className="et-eyebrow">{tier.name}</span>

                <p className="et-h3" style={{ marginTop: 'var(--et-space-5)' }}>
                  {tier.price}
                </p>
                <p
                  className="et-caption"
                  style={{ color: 'var(--et-text-muted)' }}
                >
                  Starting price — fixed at quote
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

                <p
                  className="et-body-sm"
                  style={{
                    marginTop: 'var(--et-space-4)',
                    color: 'var(--et-text-secondary)',
                  }}
                >
                  <strong style={{ color: 'var(--et-text)' }}>Tiling</strong>
                  <br />
                  {tier.tiling}
                </p>

                <p
                  className="et-body-sm"
                  style={{
                    marginTop: 'var(--et-space-4)',
                    color: 'var(--et-text-secondary)',
                  }}
                >
                  <strong style={{ color: 'var(--et-text)' }}>Electrical</strong>
                  <br />
                  {tier.electrical}
                </p>

                <p
                  className="et-body-sm"
                  style={{
                    marginTop: 'var(--et-space-6)',
                    fontWeight: 600,
                  }}
                >
                  Fittings included
                </p>
                <ul
                  className="et-checklist"
                  style={{ marginTop: 'var(--et-space-3)' }}
                >
                  {tier.fittings.map((item) => (
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
                The difference between the tiers is tile coverage and the
                fittings schedule. The work itself does not change — including
                the waterproofing, which is where a bathroom is won or lost.
              </p>
              <p className="et-body-sm et-measure">
                Every renovation is backed by our{' '}
                <strong>
                  {businessInfo.workmanshipWarrantyYears}-year workmanship
                  warranty
                </strong>
                .
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
