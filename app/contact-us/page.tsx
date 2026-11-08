import type { Metadata } from 'next'
import Link from 'next/link'
import { EnquiryForm } from '@/components/EnquiryForm'
import { businessInfo } from '@/lib/businessInfo'
import { buildMetadata } from '@/lib/metadata'
import { SchemaGraph } from '@/components/SchemaGraph'
import { GoogleRating } from '@/components/GoogleRating'
import { Breadcrumbs } from '@/components/Breadcrumbs'

/**
 * Contact us.
 *
 * This is the 301 destination for the old `/calendly/` URL. That page was the
 * WordPress site's booking page, so this one has to do the same job: get a
 * measure booked.
 *
 * The page is a SERVER component. Only the form itself is a client leaf —
 * every word of copy below is in the server HTML, so none of it depends on
 * hydration to be crawlable.
 *
 * Phone is presented first, and deliberately. The reviews repeatedly praise
 * how responsive Omar and Adam are by phone and SMS — it is the channel that
 * demonstrably works. The form sends via Resend (D-78) once its keys are set in
 * Vercel; until then it fails loudly rather than dropping leads (D-47).
 */

export const metadata: Metadata = buildMetadata({
  path: '/contact-us/',
  title: 'Book a Free On-Site Measure',
  description:
    'Book a free on-site bathroom renovation measure anywhere in Sydney. Call Elite Touch Renovations on 0411 752 334 or send us your details.',
})

export default function ContactPage() {
  /* One array, two consumers: the visible trail and the BreadcrumbList (D-180). */
  const breadcrumbs = [
    { name: 'Home', url: `${businessInfo.siteUrl}/` },
    { name: 'Contact Us', url: `${businessInfo.siteUrl}/contact-us/` },
  ] as const

  return (
    <>
      <SchemaGraph
        path="/contact-us/"
        name="Book a Free On-Site Measure"
        description="Book a free on-site bathroom renovation measure anywhere in Sydney. Call Elite Touch Renovations on 0411 752 334 or send us your details."
        pageType="ContactPage"
        breadcrumbs={breadcrumbs}
      />
      <section className="et-hero">
        <div className="et-container et-stack">
          <Breadcrumbs items={breadcrumbs} />
          <h1 className="et-h1 et-measure-tight">
            Book a free bathroom renovation measure in Sydney.
          </h1>
          <p className="et-lead et-measure">
            Tell us what is not working in the room. We measure it for free,
            then send a written quote that shows what is included, what is not
            and what it costs.
          </p>
          {/* D-184 (D-174 applied): the call and the proof sit in the hero. They used to start about
              a screen down, so the contact page showed neither on first load. */}
          <div className="et-hero-cta">
            {/* Real tel: anchor, never a JS click handler (D-33). */}
            <a
              href={businessInfo.phone.href}
              className="et-btn et-btn-lg et-btn-primary et-btn-block-mobile"
            >
              Call {businessInfo.phone.display}
            </a>
          </div>
          <GoogleRating compact />
          <p className="et-body-sm">
            <a href="#send-details" className="et-link">
              Or send us your details
            </a>
          </p>
        </div>
      </section>

      <section className="et-section et-band-canvas">
        <div className="et-container">
          <div className="et-grid et-grid-2">
            {/* ---- Contact routes that work today ---- */}
            <div className="et-stack">
              <h2 className="et-h2 et-measure-tight">Call or text us.</h2>
              <p className="et-body-sm et-measure">
                Our customers often mention quick replies by phone and SMS. If
                you want to explain the room or ask whether your plans fit the
                service, calling is the simplest place to start.
              </p>

              {/* Contact details supplied by the owner on issue #2.
                  The info@elitetouchrenovations.au address was withheld while
                  it was "being set up"; the owner confirmed on 2026-08-19 that
                  it is the address to use, so it is now published. */}
              <div className="et-stack">
                <h3 className="et-h4">Contact details</h3>
                <ul
                  className="et-stack-tight"
                  style={{ marginTop: 'var(--et-space-5)' }}
                >
                  <li className="et-body-sm">
                    <strong>Phone ({businessInfo.phone.contact}):</strong>{' '}
                    <a href={businessInfo.phone.href} className="et-link">
                      {businessInfo.phone.display}
                    </a>
                  </li>
                  <li className="et-body-sm">
                    <strong>Email:</strong>{' '}
                    <a
                      href={`mailto:${businessInfo.email.primary}`}
                      className="et-link"
                    >
                      {businessInfo.email.primary}
                    </a>
                  </li>
                  <li className="et-body-sm">
                    <strong>Office:</strong> {businessInfo.address.suburb},{' '}
                    {businessInfo.address.state} ({businessInfo.address.note})
                  </li>
                  {businessInfo.hours.map((slot) => (
                    <li key={slot.days} className="et-body-sm">
                      <strong>{slot.days}:</strong> {slot.open} – {slot.close}
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* ---- Enquiry form ---- */}
            <div className="et-card" style={{ alignSelf: 'start' }}>
              <h2 className="et-h3">Send us your details</h2>
              <p
                className="et-body-sm"
                style={{
                  marginTop: 'var(--et-space-3)',
                  marginBottom: 'var(--et-space-8)',
                  color: 'var(--et-text-secondary)',
                }}
              >
                We will call to learn about the room and arrange the measure.
              </p>
              <span
                id="send-details"
                tabIndex={-1}
                style={{ display: 'block', scrollMarginTop: '16rem' }}
              />
              <EnquiryForm />

              {/* Privacy notice — issue #37 / content audit C-1. Server-rendered
                  copy, kept out of the 'use client' form leaf. */}
              <p
                className="et-body-sm"
                style={{
                  marginTop: 'var(--et-space-5)',
                  color: 'var(--et-text-secondary)',
                }}
              >
                We use your details only to arrange your measure and reply to
                your enquiry. See our{' '}
                <Link className="et-link" href="/privacy/">
                  privacy policy
                </Link>
                .
              </p>
            </div>
          </div>

          <div
            className="et-stack"
            style={{ marginTop: 'var(--et-space-16)' }}
          >
            <h2 className="et-h3">What happens after you get in touch</h2>
            <ol
              className="et-grid et-grid-4"
              style={{
                marginTop: 'var(--et-space-2)',
                listStyle: 'decimal',
                paddingInlineStart: 'var(--et-space-8)',
              }}
            >
              <li className="et-body-sm">
                We ask what is not working, then arrange a free measure
                anywhere in Sydney.
              </li>
              <li className="et-body-sm">
                We talk through the scope, the fittings and the sequence on
                site.
              </li>
              <li className="et-body-sm">
                You get the agreed inclusions, exclusions and price in a
                fixed-scope written quote.
              </li>
              <li className="et-body-sm">
                If you go ahead, we book the demolition date and keep you
                updated as the job runs.
              </li>
            </ol>
          </div>
        </div>
      </section>
    </>
  )
}
