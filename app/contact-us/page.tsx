import type { Metadata } from 'next'
import Link from 'next/link'
import { EnquiryForm } from '@/components/EnquiryForm'
import { businessInfo } from '@/lib/businessInfo'
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema'

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

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Book a free on-site bathroom renovation measure anywhere in Sydney. Call Elite Touch Renovations on 0411 752 334 or send us your details.',
  alternates: { canonical: '/contact-us/' },
}

export default function ContactPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: `${businessInfo.siteUrl}/` },
          { name: 'Contact Us', url: `${businessInfo.siteUrl}/contact-us/` },
        ]}
      />
      <section className="et-hero">
        <div className="et-container et-stack">
          <span className="et-eyebrow">Contact us</span>
          <h1 className="et-h1 et-measure-tight">
            Book a free on-site measure in Sydney.
          </h1>
          <p className="et-lead et-measure">
            Tell us about the room and we will come and measure it, at no cost
            and with no obligation. You will get a fixed-scope written quote
            back — what is included, what is not, and what it costs.
          </p>
        </div>
      </section>

      <section className="et-section et-band-canvas">
        <div className="et-container">
          <div className="et-grid et-grid-2">
            {/* ---- Contact routes that work today ---- */}
            <div className="et-stack">
              <span className="et-eyebrow">The fastest way</span>
              <h2 className="et-h2 et-measure-tight">Call or text us.</h2>
              <p className="et-lead et-measure">
                Our customers consistently say phone and SMS are how they got a
                fast answer from us. If your job is time-sensitive, start here.
              </p>

              {/* Real tel: anchor — D-33. Never a JS click handler. */}
              <a
                href={businessInfo.phone.href}
                className="et-btn et-btn-lg et-btn-primary et-btn-block-mobile"
                style={{ alignSelf: 'flex-start' }}
              >
                Call {businessInfo.phone.display}
              </a>

              <div className="et-card et-card-tinted">
                <h3 className="et-h4">What happens after you get in touch</h3>
                <ul
                  className="et-checklist"
                  style={{ marginTop: 'var(--et-space-5)' }}
                >
                  <li>
                    We arrange a time to come and measure — free, anywhere in
                    Sydney.
                  </li>
                  <li>
                    We talk through the scope, the fittings and the sequence on
                    site.
                  </li>
                  <li>
                    You get a fixed-scope written quote. Nothing is verbal.
                  </li>
                  <li>
                    If you go ahead, we book the demolition date and keep you
                    updated as the job runs.
                  </li>
                </ul>
              </div>

              {/* Contact details supplied by the owner on issue #2.
                  The info@elitetouchrenovations.au address was withheld while
                  it was "being set up"; the owner confirmed on 2026-08-19 that
                  it is the address to use, so it is now published. */}
              <div className="et-card">
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

              <ul className="et-facts">
                <li className="et-fact">
                  <strong>NSW Builder Licence</strong>{' '}
                  {businessInfo.builderLicence}
                </li>
                <li className="et-fact">
                  <strong>ABN</strong> {businessInfo.abn}
                </li>
                <li className="et-fact">
                  <strong>Servicing</strong> {businessInfo.serviceArea.city},{' '}
                  {businessInfo.serviceArea.state}
                </li>
              </ul>
            </div>

            {/* ---- Enquiry form ---- */}
            <div className="et-card">
              <h2 className="et-h3">Send us your details</h2>
              <p
                className="et-body-sm"
                style={{
                  marginTop: 'var(--et-space-3)',
                  marginBottom: 'var(--et-space-8)',
                  color: 'var(--et-text-secondary)',
                }}
              >
                We will call you back to arrange the measure.
              </p>
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
        </div>
      </section>
    </>
  )
}
