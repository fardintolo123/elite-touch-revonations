import type { Metadata } from 'next'
import Link from 'next/link'
import { businessInfo } from '@/lib/businessInfo'
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema'
import { PageHero } from '@/components/PageHero'
import { formatMonthYear } from '@/lib/dateLabels'

/**
 * Website terms of use.
 *
 * Issue #37 / content audit C-1: the optional light terms page that pairs with
 * the privacy policy. Deliberately short.
 *
 * ⚠️ THIS IS NOT A RENOVATION CONTRACT AND MUST NOT READ LIKE ONE. The terms of
 * any actual job are the fixed-scope written quote and the HIA building
 * contract the customer signs (businessInfo.insurance.contract) — never this
 * page. Do not add invented liability caps, dispute procedures, or warranty
 * wording here. The workmanship warranty and statutory protections are stated
 * on `/about-us/` from owner-confirmed facts; this page only points at them.
 *
 * Every claim traces to something already true and on the site:
 *   - prices are "from" prices tied to a stated size (D-07 / D-60)
 *   - photos are consented ETR project work (D-38 / D-39 / D-06)
 *   - the business is run from NSW (businessInfo.address)
 *
 * Plain language: in `scripts/check-readability.mjs`, must pass Flesch ≥ 60
 * (D-109). Server component; inherits `index, follow`.
 */

export const metadata: Metadata = {
  title: 'Terms of Use',
  description:
    'The terms for using the Elite Touch Renovations website, including how published package prices, project photos and outbound links should be read.',
  alternates: { canonical: '/terms/' },
}

const updated = formatMonthYear(businessInfo.legalPagesUpdated)

export default function TermsPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: `${businessInfo.siteUrl}/` },
          { name: 'Terms of Use', url: `${businessInfo.siteUrl}/terms/` },
        ]}
      />
      <PageHero
        eyebrow="Terms"
        title="Website terms of use"
        cta={false}
        leads={[
          'These terms cover how you use this website. They are not the terms of a renovation contract — the terms of any job are set out in the written quote and building contract you sign with us.',
          `Last updated ${updated}.`,
        ]}
      />

      <section className="et-section et-band-canvas">
        <div className="et-container et-container-narrow et-stack">
          <h2 className="et-h2 et-measure-tight">Using this site</h2>
          <p className="et-body-sm et-measure">
            You are welcome to read this site and to share links to it. The text,
            photos and page designs on it belong to{' '}
            {businessInfo.legalName}, or are used with permission. Please do not
            copy them for your own business.
          </p>
        </div>
      </section>

      <section className="et-section et-band-surface">
        <div className="et-container et-container-narrow et-stack">
          <h2 className="et-h2 et-measure-tight">Prices and information</h2>
          <p className="et-body-sm et-measure">
            The package prices on this site are starting prices. Each one is tied
            to a bathroom of a stated size. They are a guide, not a quote and not
            an offer. Your price is fixed in writing after a free on-site
            measure, in the building contract.
          </p>
          <p className="et-body-sm et-measure">
            We work to keep the site accurate, but we cannot promise that every
            page is complete and current at all times. If a detail matters to
            your decision, check it with us first. See our{' '}
            <Link className="et-link" href="/packages/">
              packages page
            </Link>{' '}
            for the current pricing.
          </p>
        </div>
      </section>

      <section className="et-section et-band-canvas">
        <div className="et-container et-container-narrow et-stack">
          <h2 className="et-h2 et-measure-tight">Our project photos</h2>
          <p className="et-body-sm et-measure">
            The photos of finished bathrooms are our own projects, shown with the
            customer&rsquo;s consent. They show work we have done. They are not a
            promise that your bathroom will look the same — every job is quoted
            and built to its own scope.
          </p>
        </div>
      </section>

      <section className="et-section et-band-surface">
        <div className="et-container et-container-narrow et-stack">
          <h2 className="et-h2 et-measure-tight">Links to other sites</h2>
          <p className="et-body-sm et-measure">
            Some pages link to other websites, such as NSW Fair Trading or the
            National Construction Code. We link them because they are useful and
            let you check our claims. We do not control those sites and we are
            not responsible for their content.
          </p>
        </div>
      </section>

      <section className="et-section et-band-canvas">
        <div className="et-container et-container-narrow et-stack">
          <h2 className="et-h2 et-measure-tight">Which law applies</h2>
          <p className="et-body-sm et-measure">
            This site is run from New South Wales, Australia. These terms are
            governed by the laws of New South Wales.
          </p>
        </div>
      </section>

      <section className="et-section et-band-surface">
        <div className="et-container et-container-narrow et-stack">
          <h2 className="et-h2 et-measure-tight">Contact us</h2>
          <ul className="et-stack-tight">
            <li className="et-body-sm">{businessInfo.legalName}</li>
            <li className="et-body-sm">
              ABN {businessInfo.abn} · NSW Builder Licence{' '}
              {businessInfo.builderLicence}
            </li>
            <li className="et-body-sm">
              Email:{' '}
              <a
                className="et-link"
                href={`mailto:${businessInfo.email.primary}`}
              >
                {businessInfo.email.primary}
              </a>
            </li>
            <li className="et-body-sm">
              Phone:{' '}
              <a className="et-link" href={businessInfo.phone.href}>
                {businessInfo.phone.display}
              </a>
            </li>
          </ul>
          <p className="et-body-sm et-measure">
            See also our{' '}
            <Link className="et-link" href="/privacy/">
              privacy policy
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  )
}
