import type { Metadata } from 'next'
import Link from 'next/link'
import { businessInfo, services } from '@/lib/businessInfo'
import { ContactSection } from '@/components/ContactSection'
import { WorkStrip } from '@/components/WorkStrip'

/**
 * Services index — an existing indexed URL on the WordPress site (it is in
 * page-sitemap.xml), so it must keep returning 200 at the same address.
 *
 * It is also the 301 destination for `/staging/services/`.
 */

export const metadata: Metadata = {
  title: 'Our Services',
  description:
    'Bathroom, ensuite, bathroom and laundry, and powder room renovations across Sydney. Fixed-scope written quotes and waterproofing to AS 3740.',
  alternates: { canonical: '/services/' },
}

export default function ServicesPage() {
  return (
    <>
      <section className="et-hero">
        <div className="et-container et-stack">
          <span className="et-eyebrow">Our services</span>
          <h1 className="et-h1 et-measure-tight">
            Bathroom renovation services across Sydney.
          </h1>
          <p className="et-lead et-measure">
            Four services, and they are all wet areas. We do not take kitchens,
            extensions or tiling-only work — the whole business is built around
            getting the waterproofing and the tile setout right.
          </p>
        </div>
      </section>

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
