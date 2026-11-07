import type { Metadata } from 'next'
import Link from 'next/link'
import { businessInfo, services } from '@/lib/businessInfo'
import { buildMetadata } from '@/lib/metadata'
import { ContactSection } from '@/components/ContactSection'
import { WorkStrip } from '@/components/WorkStrip'
import { PageHero } from '@/components/PageHero'
import { SchemaGraph } from '@/components/SchemaGraph'
import { projects } from '@/lib/projects'
import { AreasServedLinks } from '@/components/AreasServedLinks'
import { GoogleRating } from '@/components/GoogleRating'
import { NavIcon, serviceIcon } from '@/components/layout/NavIcon'

/**
 * Services index — an existing indexed URL on the WordPress site (it is in
 * page-sitemap.xml), so it must keep returning 200 at the same address.
 *
 * It is also the 301 destination for `/staging/services/`.
 */

export const metadata: Metadata = buildMetadata({
  path: '/services/',
  // Renders as "Bathroom Renovations Across Sydney | Elite Touch Renovations"
  // via the root layout's title template — 60 chars, carries the service +
  // "Sydney" that "Our Services" lacked (issue #38 / page-audit P-2). "Across"
  // keeps it distinct from the /services/bathroom-renovations/ hub title
  // ("Bathroom Renovations Sydney").
  title: 'Bathroom Renovations Across Sydney',
  description:
    'Bathroom, ensuite, bathroom and laundry, and powder room renovations across Sydney. Fixed-scope written quotes and waterproofing to AS 3740.',
})

const heroProject = projects.find((p) => p.slug === 'hornsby-bathroom')!

/* One short line per card (D-177), each taken from that service's own summary in
   `lib/businessInfo.ts` so it adds no new claim. The full summary stays on the
   service page. */
const CARD_LINES: Record<string, string> = {
  'bathroom-renovations': 'For awkward layouts, worn finishes and ageing waterproofing.',
  'ensuite-bathroom-renovations': 'For small rooms where ventilation, storage and noise need solving.',
  'laundry-renovations': 'One program, one trade sequence, one disruption instead of two.',
  'powder-room-renovations': 'For tight layouts where the door, basin and toilet must fit.',
}

export default function ServicesPage() {
  /* One array, two consumers: the visible trail and the BreadcrumbList (D-180). */
  const breadcrumbs = [
    { name: 'Home', url: `${businessInfo.siteUrl}/` },
    { name: 'Services', url: `${businessInfo.siteUrl}/services/` },
  ] as const

  return (
    <>
      <SchemaGraph
        path="/services/"
        name="Bathroom Renovations Across Sydney"
        description="Bathroom, ensuite, bathroom and laundry, and powder room renovations across Sydney. Fixed-scope written quotes and waterproofing to AS 3740."
        breadcrumbs={breadcrumbs}
      />
      <PageHero
        breadcrumbs={breadcrumbs}
        title="Bathroom renovation services across Sydney."
        leads={[
          'Pick the room that needs work. We plan the layout and scope around it, then put it in writing before work starts.',
        ]}
        rating={<GoogleRating compact />}
        image={{ project: heroProject }}
        backdrop
      />

      <section className="et-section et-band-canvas">
        <div className="et-container">
          <div className="et-grid et-grid-2">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}/`}
                className="et-card et-card-link"
              >
                <NavIcon name={serviceIcon(service.slug)} size="lg" />
                <h2 className="et-h3" style={{ marginTop: 'var(--et-space-5)' }}>
                  {service.title}
                </h2>
                <p
                  className="et-body-sm"
                  style={{
                    marginTop: 'var(--et-space-3)',
                    color: 'var(--et-text-secondary)',
                  }}
                >
                  {CARD_LINES[service.slug] ?? service.summary}
                </p>
                <p
                  className="et-body-sm"
                  style={{
                    marginTop: 'var(--et-space-5)',
                    color: 'var(--et-text-accent)',
                    fontWeight: 600,
                  }}
                >
                  Read more →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <AreasServedLinks
        title="Bathroom renovations by Sydney area"
        intro="If you searched by suburb, start with the regional page that covers it. We only publish area pages where the site has real local project proof or a useful regional page, so the coverage stays honest."
        band="surface"
      />

      <WorkStrip band="canvas" />

      <ContactSection />
    </>
  )
}
