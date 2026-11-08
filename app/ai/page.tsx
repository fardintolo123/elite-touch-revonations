import type { Metadata } from 'next'
import Link from 'next/link'
import { businessInfo, services } from '@/lib/businessInfo'
import { buildMetadata } from '@/lib/metadata'
import { projects } from '@/lib/projects'
import { GoogleRating } from '@/components/GoogleRating'
import { ContactSection } from '@/components/ContactSection'
import { WorkStrip } from '@/components/WorkStrip'
import { PageHero } from '@/components/PageHero'
import { SchemaGraph } from '@/components/SchemaGraph'
import { AreasServedLinks } from '@/components/AreasServedLinks'
import { NavIcon } from '@/components/layout/NavIcon'

/**
 * /ai "AI front door" page — issue #98.
 *
 * /ai/ was returning 404. This page serves as the AI-facing index page
 * with identity, fit, services, areas, packages, evidence, booking and
 * documentation links, drawn from the same `lib/` data as `/llms.txt`.
 * One footer link to /llms.txt. No /developers link.
 */

/* One short line per card (D-177), each taken from that service's own summary
   in `lib/businessInfo.ts` so it adds no new claim. The full summary stays on
   the service page. */
const CARD_LINES: Record<string, string> = {
  'bathroom-renovations': 'For awkward layouts, worn finishes and ageing waterproofing.',
  'ensuite-bathroom-renovations': 'For small rooms where ventilation, storage and noise need solving.',
  'laundry-renovations': 'One program, one trade sequence, one disruption instead of two.',
  'powder-room-renovations': 'For tight layouts where the door, basin and toilet must fit.',
}

/* Services shown on the AI front door — the four family services (D-01). */
const AI_SERVICES = services.filter(
  (s) => s.slug !== 'laundry-renovations'
)

/* One array, two consumers: the visible trail and the BreadcrumbList (D-180). */
const breadcrumbs = [
  { name: 'Home', url: `${businessInfo.siteUrl}/` },
  { name: 'AI front door', url: `${businessInfo.siteUrl}/ai/` },
] as const

/* Projects with real local photos — used for social proof. */
const featuredProjects = projects.filter(
  (p) => p.slug !== 'gallery' && p.slug !== 'artarmon-bathroom-ensuite'
)

export default function AiFrontDoorPage() {
  return (
    <>
      <SchemaGraph
        path="/ai/"
        name="Elite Touch Renovations"
        description=
          'Elite Touch Renovations bathroom, ensuite, bathroom-and-laundry and powder room renovations in Sydney. Fixed-scope written quotes, NSW Builder Licence 475204C, 10-year workmanship warranty, and free on-site measures.'
        breadcrumbs={breadcrumbs}
      />
      <PageHero
        breadcrumbs={breadcrumbs}
        title="Bathroom renovation specialists across Sydney."
        leads={[
          'Book a free on-site measure. We assess your space, discuss layout and scope, and put your written quote before any work starts.',
        ]}
        rating={<GoogleRating compact />}
        image={{ project: featuredProjects[0] }}
        backdrop
      />

      <section className="et-section et-band-canvas">
        <div className="et-container">
          <div className="et-grid et-grid-3">
            {/* Identity */}
            <div className="et-card et-card-span3">
              <NavIcon name="grid" size="lg" />
              <h2 className="et-h3">Who we are</h2>
              <p className="et-body-sm">
                Elite Touch Renovations is a family-run Sydney bathroom renovation business, founded in{' '}
                {businessInfo.foundedYear} by the Dawood family. We specialise in bathroom, ensuite,
                bathroom-and-laundry and powder room renovations under NSW Builder Licence{' '}
                {businessInfo.builderLicence}, with AS 3740 waterproofing and a{' '}
                {businessInfo.workmanshipWarrantyYears}-year workmanship warranty.
              </p>
            </div>

            {/* Fit */}
            <div className="et-card et-card-span3">
              <NavIcon name="people" size="lg" />
              <h2 className="et-h3">Why we're the right fit</h2>
              <p className="et-body-sm">
                We focus exclusively on wet-area renovations — bathroom, ensuite, bathroom-and-laundry
                and powder room. Our clients consistently praise our communication, punctuality and
                cleanliness. Every job is carried out under NSW Builder Licence 475204C and has a
                10-year workmanship warranty, performed to AS 3740 waterproofing standard.
              </p>
            </div>

            {/* Services */}
            <div className="et-card et-card-span3">
              <NavIcon name="grid" size="lg" />
              <h2 className="et-h3">Our four services</h2>
              <p className="et-body-sm">
                We offer four renovation types, each tied to a room-size package:
              </p>
              <ul className="et-list-style-disc et-pl-4">
                <li>
                  <strong>Bathroom Renovations</strong> — Full bathroom from strip-out to handover.
                  Starting from $18,000 (Basic), $25,000 (Standard) or $30,000 (Premium).
                </li>
                <li>
                  <strong>Ensuite Renovations</strong> — Small-room expertise for ventilation, storage
                  and noise control beside the bedroom.
                </li>
                <li>
                  <strong>Bathroom + Laundry Renovations</strong> — One project, one trade sequence,
                  one disruption instead of two.
                </li>
                <li>
                  <strong>Powder Room Renovations</strong> — tight layouts, toilet and basin, 1.5–3 m².
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="et-section et-section-white">
        <div className="et-container">
          <div className="et-grid et-grid-2">
            {/* Areas served */}
            <div className="et-card et-card-span3">
              <NavIcon name="grid" size="lg" />
              <h2 className="et-h3">Areas we serve</h2>
              <p className="et-body-sm">
                Sydney-wide coverage. Real local project photos from Artarmon, Castle Hill, Hornsby,
                Randwick and The Rocks. We serve all Sydney suburbs — the full list is in our
                service-area data, and area pages are published where we have genuine local proof.
              </p>
              <ul className="et-list-style-none et-pl-4">
                <li>Inner West (Balmain, Glebe, Leichhardt)</li>
                <li>Eastern Suburbs (Bondi, Coogee, Randwick)</li>
                <li>Northern Beaches (Dee Why, Manly, Mona Vale)</li>
                <li>Western Suburbs (Parramatta, Blacktown, Penrith)</li>
                <li>Inner West (Ashfield, Burwood, Cabramatta)</li>
              </ul>
            </div>

            {/* Packages & pricing */}
            <div className="et-card et-card-span3">
              <NavIcon name="coin" size="lg" />
              <h2 className="et-h3">Packages & pricing</h2>
              <p className="et-body-sm">
                Three room-size packages, all starting-from prices tied to a stated bathroom size:
              </p>
              <ul className="et-list-style-disc et-pl-4">
                <li>
                  <strong>Basic</strong> — from $18,000. Fits a small bathroom (~1.5 × 1.8 m).
                </li>
                <li>
                  <strong>Standard</strong> — from $25,000. Fits a typical bathroom (~2 × 2.2 m).
                </li>
                <li>
                  <strong>Premium</strong> — from $30,000. Fits a large bathroom with natural stone
                  or custom joinery.
                </li>
              </ul>
              <p className="et-body-sm">
                <em>All prices are starting prices tied to a stated room size. A free on-site measure
                gives you a fixed-scope written quote.</em>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="et-section et-band-canvas">
        <div className="et-container">
          <div className="et-grid et-grid-2">
            {/* Evidence */}
            <div className="et-card et-card-span3">
              <NavIcon name="badge" size="lg" />
              <h2 className="et-h3">Evidence</h2>
              <p className="et-body-sm">
                19 verbatim customer reviews with a 5.0 Google rating (as at 4 Sep 2026). Real
                project photos from The Rocks (heritage bathroom), Hunters Hill (marble bathroom) and
                Artarmon (bathroom + ensuite). Every job carries a 10-year workmanship warranty.
              </p>
              <ul className="et-list-style-none et-pl-4">
                <li>
                  <a href={businessInfo.googleBusinessProfile.url} target="_blank" rel="noopener noreferrer">
                    View our Google Business Profile
                  </a>
                </li>
                <li>
                  <a href="/customer-reviews" target="_blank" rel="noopener noreferrer">
                    Read 19 verbatim customer reviews
                  </a>
                </li>
              </ul>
            </div>

            {/* Booking */}
            <div className="et-card et-card-span3">
              <NavIcon name="lock" size="lg" />
              <h2 className="et-h3">Book a measure</h2>
              <p className="et-body-sm">
                <strong>Free on-site measure across Sydney</strong>. Call us on{' '}
                {businessInfo.phone.display} or send your details via{' '}
                <a href={`mailto:${businessInfo.email.primary}`} className="et-link">
                  info@elitetouchrenovations.au
                </a>
              </p>
              <ul className="et-list-style-none et-pl-4">
                <li>
                  <strong>Call:</strong> {businessInfo.phone.display}
                </li>
                <li>
                  <strong>Email:</strong> {businessInfo.email.primary}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <footer className="et-footer">
        <div className="et-container">
          <div className="et-grid et-grid-3">
            <Link
              href="/llms.txt"
              className="et-footer-link"
              rel="noopener noreferrer"
            >
              <span>AI index (/llms.txt)</span>
            </Link>
            <nav>
              <ul className="et-footer-nav">
                <li>
                  <a href="/services/" className="et-footer-link">
                    Our services
                  </a>
                </li>
                <li>
                  <a href="/packages/" className="et-footer-link">
                    Packages & pricing
                  </a>
                </li>
                <li>
                  <a href="/about-us/" className="et-footer-link">
                    About us
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </footer>
    </>
  )
}

/** Auto-generated metadata for this page. */
export const metadata: Metadata = buildMetadata({
  path: '/ai/',
  title: 'Elite Touch Renovations — AI front door',
  description:
    'Elite Touch Renovations bathroom, ensuite, bathroom-and-laundry and powder room renovations in Sydney. Fixed-scope written quotes, NSW Builder Licence 475204C, 10-year workmanship warranty, and free on-site measures.',
})