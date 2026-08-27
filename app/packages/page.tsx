import type { Metadata } from 'next'
import Link from 'next/link'
import { businessInfo } from '@/lib/businessInfo'
import { ContactSection } from '@/components/ContactSection'
import { WorkStrip } from '@/components/WorkStrip'
import { PageHero } from '@/components/PageHero'
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema'
import { FaqSchema } from '@/components/FaqSchema'
import { projects } from '@/lib/projects'

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
 *
 * COST-QUESTION SECTIONS (added 2026-08-27, GitHub issue #11 / DECISIONS.md
 * D-104): this page is the single home for "how much does a bathroom
 * renovation cost in Sydney" — `bathroom renovation cost sydney` is
 * GKP-confirmed at 100–1K/mo (`docs/BATHROOM_SITE_STRUCTURE.md`). Folded in
 * here rather than as a separate URL, per `docs/SEO_CONTENT_GUIDE.md` §3
 * ("one term, one page" / default to IMPROVE over CREATE) — a standalone cost
 * page would target the identical searcher as this one. Two objection-
 * handling angles from the same issue are included:
 *   - "Is $30,000 the minimum?" — answered honestly: no, Basic starts at
 *     $18,000. $30,000 is where Premium starts.
 *   - "What does a $10,000 bathroom renovation include?" — REJECTED as a
 *     claim (ETR has no $10,000 tier); answered only as an honest
 *     expectations-setting paragraph, never implying ETR offers one.
 */

export const metadata: Metadata = {
  title: 'Bathroom Renovation Cost & Packages',
  description:
    'How much does a bathroom renovation cost in Sydney? Packages start from $18,000 to $30,000, sized to your bathroom, with a fixed-scope written quote.',
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

/**
 * Visible FAQ block + FAQPage schema (`components/FaqSchema.tsx`). Answers
 * are self-contained — an AI engine or featured snippet lifts one without
 * the rest of the page, so each must stand alone and stay true on its own
 * (docs/CONTENT_QUALITY_CHECKLIST.md §3). Every figure here matches the
 * tier cards and `lib/businessInfo.ts` exactly — never restate a price or
 * duration from memory.
 */
const FAQS = [
  {
    question: 'How much does a bathroom renovation cost in Sydney?',
    answer:
      'With Elite Touch, a bathroom renovation starts from $18,000 for a small bathroom (about 1.5 × 1.8 × 2.4 m, our Basic package), from $25,000 for a mid-size bathroom (Standard), or from $30,000 for a larger, fully-specified bathroom (Premium). Every figure is a starting price — you get a fixed-scope written quote after a free on-site measure.',
  },
  {
    question: 'Is $30,000 the minimum for a bathroom renovation?',
    answer:
      'No. $30,000 is where our Premium package starts, for a larger bathroom with a freestanding bath and heated flooring. Our Basic package starts from $18,000, for a bathroom around 1.5 × 1.8 × 2.4 m, and still includes full demolition, AS 3740 waterproofing, new tiling and all new fittings.',
  },
  {
    question: "What's included in the price?",
    answer:
      'Every package includes demolition, waterproofing to Australian Standards, new tiling, a custom shower screen, all new fittings and a final clean. The tiers differ in how much of the bathroom is tiled and which fittings are included — not the standard of work.',
  },
  {
    question: 'Is the price fixed once work starts?',
    answer:
      "Yes. You get a fixed-scope written quote after a free on-site measure, before any work begins. If your bathroom's size or scope differs from a package, we tell you at the measure — never after demolition.",
  },
  {
    question: 'How long does a bathroom renovation take?',
    answer:
      'A full renovation on the same footprint usually takes 3–4 weeks. A premium build with natural stone and custom joinery takes 5–6 weeks, and a reconfiguration that moves walls or fixtures takes 5–7 weeks.',
  },
] as const

const heroProject = projects.find((p) => p.slug === 'castle-hill-bathroom')!

export default function PackagesPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: `${businessInfo.siteUrl}/` },
          { name: 'Packages', url: `${businessInfo.siteUrl}/packages/` },
        ]}
      />
      <FaqSchema items={FAQS} />
      <PageHero
        eyebrow="Packages"
        title="Bathroom renovation packages and pricing."
        leads={[
          'A bathroom renovation with Elite Touch starts from $18,000 (Basic), $25,000 (Standard) or $30,000 (Premium) — each tied to a stated bathroom size below.',
          'Each package price is tied to a bathroom of a stated size. That is deliberate — a price quoted without the size it assumes is not a price, it is a guess. All three are starting prices; your final figure is fixed in writing after a free on-site measure.',
        ]}
        cta={false}
        facts={[
          {
            label: `${businessInfo.workmanshipWarrantyYears}-year`,
            value: 'workmanship warranty',
          },
          { label: businessInfo.offer.deposit, value: 'to start' },
          {
            label: 'Progressive payments',
            value: businessInfo.offer.paymentSchedule,
          },
        ]}
        image={{ project: heroProject, imageIndex: 1 }}
      />

      <section className="et-section et-band-surface">
        <div className="et-container">
          <div className="et-stack">
            <h2 className="et-h2 et-measure-tight">
              How much does a bathroom renovation cost in Sydney?
            </h2>
            <p className="et-lead et-measure">
              With Elite Touch, a bathroom renovation starts from $18,000 for
              a small bathroom around 1.5 × 1.8 × 2.4 m (Basic), from $25,000
              for a mid-size bathroom around 1.8 × 2.4 × 2.4 m (Standard), or
              from $30,000 for a larger, fully-specified bathroom around
              2.4 × 2.4 × 2.4 m (Premium). See the full breakdown below.
            </p>
            <p className="et-body-sm et-measure">
              The price moves with three things: how much of the bathroom is
              tiled, which fittings you choose, and whether the layout
              changes. Moving a toilet or wall, or adding a freestanding bath
              or heated flooring, all add real cost — we tell you which of
              these apply to your bathroom at the free on-site measure, not
              after demolition has started.
            </p>
          </div>
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
          <div className="et-stack">
            <h2 className="et-h2 et-measure-tight">
              Is $30,000 really the minimum for a bathroom renovation?
            </h2>
            <p className="et-lead et-measure">
              No. $30,000 is where our Premium package starts — it isn&rsquo;t
              a floor under every renovation. Our Basic package starts from
              $18,000, for a bathroom around 1.5 × 1.8 × 2.4 m, and still
              includes full demolition, AS 3740 waterproofing, new tiling, a
              custom semi-frameless shower screen and all new fittings.
              You&rsquo;ll see $30,000+ quoted as a typical Sydney figure in a
              lot of places — that&rsquo;s a fair estimate for a larger,
              fully-specified bathroom, not the minimum to get started.
            </p>

            <h3
              className="et-h4"
              style={{ marginTop: 'var(--et-space-8)' }}
            >
              What about a $10,000 bathroom renovation?
            </h3>
            <p className="et-body-sm et-measure">
              You&rsquo;ll sometimes see &ldquo;$10,000 bathroom
              renovation&rdquo; searched online. In our experience that
              figure covers cosmetic work — new tapware, a repaint, replacing
              a vanity — not a full renovation with demolition,
              re-waterproofing to AS 3740 and new tiling throughout. A
              compliant, fully waterproofed Sydney bathroom renovation
              realistically starts from $18,000. If your budget is tighter
              than that, tell us at the free on-site measure — we&rsquo;ll be
              straight with you about what&rsquo;s realistic rather than
              stretch a quote to fit.
            </p>
          </div>
        </div>
      </section>

      <section className="et-section et-band-surface">
        <div className="et-container">
          <div className="et-stack">
            <span className="et-eyebrow">FAQ</span>
            <h2 className="et-h2 et-measure-tight">
              Frequently asked questions about bathroom renovation cost
            </h2>
          </div>
          <div
            className="et-stack"
            style={{ marginTop: 'var(--et-space-8)', gap: 'var(--et-space-4)' }}
          >
            {FAQS.map((item) => (
              <details key={item.question} className="et-card">
                <summary
                  className="et-h4"
                  style={{ cursor: 'pointer' }}
                >
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

      <WorkStrip band="surface" />

      <ContactSection />
    </>
  )
}
