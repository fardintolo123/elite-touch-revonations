import type { Metadata } from 'next'
import Link from 'next/link'
import { businessInfo, services } from '@/lib/businessInfo'
import { buildMetadata } from '@/lib/metadata'
import { ContactSection } from '@/components/ContactSection'
import { WorkStrip } from '@/components/WorkStrip'
import { PageHero } from '@/components/PageHero'
import { SchemaGraph } from '@/components/SchemaGraph'
import { projects } from '@/lib/projects'

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

export default function ServicesPage() {
  return (
    <>
      <SchemaGraph
        path="/services/"
        name="Bathroom Renovations Across Sydney"
        description="Bathroom, ensuite, bathroom and laundry, and powder room renovations across Sydney. Fixed-scope written quotes and waterproofing to AS 3740."
        breadcrumbs={[
          { name: 'Home', url: `${businessInfo.siteUrl}/` },
          { name: 'Services', url: `${businessInfo.siteUrl}/services/` },
        ]}
      />
      <PageHero
        eyebrow="Our services"
        title="Bathroom renovation services across Sydney."
        leads={[
          'Four services, and they are all wet areas. We do not take kitchens, extensions or tiling-only work. The whole business is built around getting the waterproofing and the tile setout right.',
        ]}
        image={{ project: heroProject }}
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
                <h2 className="et-h3">{service.title}</h2>
                <p
                  className="et-body-sm"
                  style={{
                    marginTop: 'var(--et-space-3)',
                    color: 'var(--et-text-secondary)',
                  }}
                >
                  {service.summary}
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

      <WorkStrip band="surface" />

      <ContactSection />
    </>
  )
}
