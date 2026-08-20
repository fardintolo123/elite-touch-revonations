import { EnquiryForm } from '@/components/EnquiryForm'
import { businessInfo } from '@/lib/businessInfo'

/**
 * The enquiry block that appears at the bottom of EVERY page.
 *
 * Owner instruction 2026-08-20: "contact section/form should be in each page".
 * On a lead-generation site that is the right call — making someone navigate to
 * a contact page to enquire loses the ones who were ready on the page they were
 * already reading.
 *
 * ⚠️ PERFORMANCE NOTE. This pulls the client-side `EnquiryForm` onto every
 * page, so the form's JavaScript is now part of every route rather than just
 * `/contact-us/`. That is a deliberate, owner-approved trade: the form is a
 * small leaf component, and an enquiry is worth more than the bytes. It is
 * recorded in D-80 so nobody later "optimises" it away without knowing why it
 * is there. If page weight becomes a problem, the answer is to slim the form,
 * not to remove it from pages.
 *
 * Everything except the form itself is server-rendered, so the phone number,
 * the heading and the copy are all in the served HTML for crawlers.
 */

export function ContactSection({
  title = 'Book a free on-site measure',
  intro = 'Tell us about the room and we will come and measure it, anywhere in Sydney. No charge, no obligation — and a fixed-scope written quote to follow.',
}: {
  title?: string
  intro?: string
}) {
  return (
    <section className="et-section et-band-canvas" id="enquire">
      <div className="et-container">
        <div className="et-grid et-grid-2">
          <div className="et-stack">
            <span className="et-eyebrow">Get in touch</span>
            <h2 className="et-h2 et-measure-tight">{title}</h2>
            <p className="et-lead et-measure">{intro}</p>

            {/* Real tel: anchor — D-33. Never a JS click handler. */}
            <a
              href={businessInfo.phone.href}
              className="et-btn et-btn-lg et-btn-primary et-btn-block-mobile"
              style={{ alignSelf: 'flex-start' }}
            >
              Call {businessInfo.phone.display}
            </a>

            <ul className="et-facts">
              <li className="et-fact">
                <strong>NSW Builder Licence</strong>{' '}
                {businessInfo.builderLicence}
              </li>
              <li className="et-fact">
                <strong>{businessInfo.workmanshipWarrantyYears}-year</strong>{' '}
                workmanship warranty
              </li>
              <li className="et-fact">
                <strong>Free</strong> on-site measure
              </li>
            </ul>

            <p
              className="et-body-sm"
              style={{ color: 'var(--et-text-secondary)' }}
            >
              Or email{' '}
              <a
                href={`mailto:${businessInfo.email.primary}`}
                className="et-link"
              >
                {businessInfo.email.primary}
              </a>
            </p>
          </div>

          <div className="et-card">
            <h3 className="et-h3">Send us your details</h3>
            <p
              className="et-body-sm"
              style={{
                marginTop: 'var(--et-space-3)',
                marginBottom: 'var(--et-space-8)',
                color: 'var(--et-text-secondary)',
              }}
            >
              We will get back to you to arrange the measure.
            </p>
            <EnquiryForm />
          </div>
        </div>
      </div>
    </section>
  )
}
