import type { Metadata } from 'next'
import Link from 'next/link'
import { GoogleRating } from '@/components/GoogleRating'
import { PageHero } from '@/components/PageHero'
import { SchemaGraph } from '@/components/SchemaGraph'
import { blogPosts } from '@/lib/blog'
import { businessInfo, services } from '@/lib/businessInfo'
import {
  LOCATION_PARENT_SLUG,
  publishedRegions,
  publishedSuburbs,
} from '@/lib/locations'
import { buildMetadata } from '@/lib/metadata'
import { packageStarts } from '@/lib/packageStarts'
import { projects } from '@/lib/projects'

const LAST_VERIFIED = {
  dateTime: '2026-11-09',
  label: '9 November 2026',
} as const

const breadcrumbs = [
  { name: 'Home', url: businessInfo.siteUrl + '/' },
  { name: 'Business facts', url: businessInfo.siteUrl + '/ai/' },
] as const

const featuredProject =
  projects.find((project) => project.slug === 'artarmon-bathroom') ??
  projects[0]
const publishedAreas = publishedRegions()
const costGuide = blogPosts.find((post) => post.slug === 'bathroom-renovation-cost-sydney')
const clientTypes = [
  businessInfo.clientTypes.residential ? 'residential' : null,
  businessInfo.clientTypes.commercial ? 'commercial' : null,
].filter((type): type is string => type !== null)
const metadataDescription =
  'Bathroom renovations ' +
  businessInfo.serviceArea.coverage +
  '. ' +
  businessInfo.offer.measure +
  '. ' +
  businessInfo.offer.quotes +
  '. NSW Builder Licence ' +
  businessInfo.builderLicence +
  '.'
const googleRatingCheckedAt = businessInfo.googleBusinessProfile.verifiedAt
const googleRatingCheckedLabel = new Intl.DateTimeFormat('en-AU', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
}).format(new Date(googleRatingCheckedAt + 'T00:00:00.000Z'))

export default function AiFrontDoorPage() {
  return (
    <>
      <SchemaGraph
        path="/ai/"
        name={businessInfo.name}
        description={metadataDescription}
        pageType="AboutPage"
        breadcrumbs={breadcrumbs}
      />

      <PageHero
        breadcrumbs={breadcrumbs}
        title={'Bathroom renovations ' + businessInfo.serviceArea.coverage + '.'}
        leads={[
          businessInfo.offer.measure + '. ' + businessInfo.offer.quotes + '.',
        ]}
        rating={<GoogleRating compact />}
        image={{ project: featuredProject }}
        backdrop
      />

      <section className="et-section et-band-canvas">
        <div className="et-container">
          <div className="et-grid et-grid-2">
            <div className="et-stack">
              <h2 className="et-h2">Who we are</h2>
              <p className="et-lead">
                {businessInfo.name} is a family-run Sydney renovation business,
                founded in {businessInfo.foundedYear} by the Dawood family.
              </p>
              <p>
                NSW Builder Licence {businessInfo.builderLicence} is held by{' '}
                {businessInfo.builderLicenceHolder}. Check it in the{' '}
                <a
                  className="et-link"
                  href={businessInfo.authorities.nswLicenceRegister}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  NSW licence register
                </a>
                .
              </p>
            </div>

            <div className="et-stack">
              <h2 className="et-h2">Who we suit</h2>
              <p>
                We work with {clientTypes.join(' and ')} clients;{' '}
                {businessInfo.clientTypes.emphasis}.
              </p>
              <h3 className="et-h3">When we may not be the right fit</h3>
              <p>
                Our work focuses on wet areas. The four services below define
                our scope. If your project needs a different kind of building
                work, we may not be the right fit.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="et-section et-section-white">
        <div className="et-container">
          <h2 className="et-h2">Our four services</h2>
          <ul className="et-link-rows">
            {services.map((service) => (
              <li key={service.slug}>
                <h3 className="et-h4">
                  <Link
                    className="et-link"
                    href={'/services/' + service.slug + '/'}
                  >
                    {service.title}
                  </Link>
                </h3>
                <p className="et-body-sm">{service.summary}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="et-section et-band-canvas">
        <div className="et-container">
          <h2 className="et-h2">Published service areas</h2>
          <p className="et-lead">
            We work {businessInfo.serviceArea.coverage}. These regional hubs
            and Tier 1 suburb pages are published on the site.
          </p>
          <ul className="et-link-rows">
            {publishedAreas.map((region) => {
              const tierOneSuburbs = publishedSuburbs(region).filter(
                (suburb) => suburb.tier === 1,
              )

              return (
                <li key={region.slug}>
                  <h3 className="et-h4">
                    <Link className="et-link" href={region.hubUrl}>
                      {region.name}
                    </Link>
                  </h3>
                  {tierOneSuburbs.length > 0 && (
                    <p className="et-body-sm">
                      Tier 1 suburbs:{' '}
                      {tierOneSuburbs.map((suburb, index) => (
                        <span key={suburb.slug}>
                          {index > 0 && ', '}
                          <Link
                            className="et-link"
                            href={
                              '/services/' +
                              LOCATION_PARENT_SLUG +
                              '/' +
                              suburb.slug +
                              '/'
                            }
                          >
                            {suburb.name}
                          </Link>
                        </span>
                      ))}
                    </p>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <section className="et-section et-section-white">
        <div className="et-container">
          <h2 className="et-h2">Package starting prices</h2>
          <ul className="et-link-rows">
            {packageStarts.map((item) => (
              <li key={item.name}>
                <h3 className="et-h4">{item.name}</h3>
                <p>
                  <strong>{item.price}</strong>, based on a bathroom measuring{' '}
                  {item.size}.
                </p>
              </li>
            ))}
          </ul>
          <p className="et-lead">
            {businessInfo.offer.measure}. {businessInfo.offer.quotes}.
          </p>
          <p className="et-body-sm">
            Package prices are starting points; the written quote sets out the
            agreed work.
          </p>
        </div>
      </section>

      <section className="et-section et-band-ink">
        <div className="et-container">
          <h2 className="et-h2">Evidence and protections</h2>
          <div className="et-grid et-grid-2">
            <div className="et-stack">
              <h3 className="et-h3">Licence and standards</h3>
              <ul className="et-list-style-none et-facts-grid">
                <li className="et-fact">
                  <strong>Licence</strong>{' '}
                  {businessInfo.builderLicenceHolder} · NSW Builder Licence{' '}
                  {businessInfo.builderLicence}
                </li>
                <li className="et-fact">
                  <strong>Waterproofing</strong>{' '}
                  {businessInfo.standards.note}
                </li>
                <li className="et-fact">
                  <strong>Workmanship warranty</strong>{' '}
                  {businessInfo.workmanshipWarrantyYears} years
                </li>
              </ul>
            </div>

            <div className="et-stack">
              <h3 className="et-h3">Insurance and membership</h3>
              <ul className="et-list-style-none et-facts-grid">
                <li className="et-fact">
                  <strong>Public liability</strong>{' '}
                  {businessInfo.insurance.publicLiability}
                </li>
                <li className="et-fact">
                  <strong>Workers compensation</strong>{' '}
                  {businessInfo.insurance.workersCompensation}
                </li>
                <li className="et-fact">
                  <strong>Home Building Compensation</strong>{' '}
                  {businessInfo.insurance.homeBuildingCompensation}
                </li>
                <li className="et-fact">
                  <strong>Membership</strong>{' '}
                  {businessInfo.insurance.memberships.join(', ')}
                </li>
              </ul>
              <p className="et-body-sm">
                Google profile figures were last checked{' '}
                <time dateTime={googleRatingCheckedAt}>
                  {googleRatingCheckedLabel}
                </time>
                . The lead photo is from the{' '}
                <Link
                  className="et-link"
                  href={'/gallery/' + featuredProject.slug + '/'}
                >
                  {featuredProject.name}
                </Link>
                .
              </p>
              <Link className="et-link" href="/gallery/">
                See completed projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="et-section et-band-canvas">
        <div className="et-container">
          <div className="et-grid et-grid-2">
            <div className="et-stack">
              <h2 className="et-h2">Book a measure</h2>
              <p className="et-lead">{businessInfo.offer.measure}.</p>
              <p>{businessInfo.offer.quotes}.</p>
              <p>
                Call{' '}
                <a className="et-link" href={businessInfo.phone.href}>
                  {businessInfo.phone.display}
                </a>{' '}
                or use the{' '}
                <Link className="et-link" href="/contact-us/">
                  enquiry form
                </Link>
                .
              </p>
            </div>

            <div className="et-stack">
              <h2 className="et-h2">Phone hours</h2>
              <ul className="et-list-style-none et-link-rows">
                {businessInfo.hours.map((slot) => (
                  <li key={slot.days}>
                    <strong>{slot.days}</strong>
                    <br />
                    {slot.open}–{slot.close}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="et-section et-section-white">
        <div className="et-container">
          <h2 className="et-h2">More details</h2>
          <ul className="et-link-rows">
            <li>
              <Link className="et-link" href="/llms.txt">
                AI-readable site index
              </Link>
            </li>
            <li>
              <Link className="et-link" href="/packages/">
                Packages and inclusions
              </Link>
            </li>
            <li>
              <Link className="et-link" href="/gallery/">
                Project gallery
              </Link>
            </li>
            {costGuide && (
              <li>
                <Link
                  className="et-link"
                  href={'/blog/' + costGuide.slug + '/'}
                >
                  {costGuide.title}
                </Link>
              </li>
            )}
            <li>
              <Link className="et-link" href="/blog/">
                All renovation guides
              </Link>
            </li>
          </ul>
          <p className="et-body-sm">
            Facts last verified{' '}
            <time dateTime={LAST_VERIFIED.dateTime}>
              {LAST_VERIFIED.label}
            </time>
            .
          </p>
        </div>
      </section>
    </>
  )
}

export const metadata: Metadata = buildMetadata({
  path: '/ai/',
  title: 'Bathroom Renovations ' + businessInfo.serviceArea.city,
  description: metadataDescription,
})
