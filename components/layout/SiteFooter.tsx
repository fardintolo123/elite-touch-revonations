import Image from 'next/image'
import Link from 'next/link'
import { businessInfo, services } from '@/lib/businessInfo'

/**
 * Footer.
 *
 * ABN, email, address and trading hours were supplied on GitHub issue #2 and
 * are now shown here (see docs/ISSUE_FINDINGS.md §A).
 *
 * What is deliberately STILL ABSENT and must stay absent:
 *   - star rating / review count — the GBP shows 5.0 across 17 reviews as at
 *                      the issue #2 PDF, but that has not been verified live.
 *                      A stale rating is a real problem, not a rounding error.
 *
 * Resolved 2026-08-19 by the owner: the 10-year workmanship warranty (closes
 * D-19), the info@ address, and the Greenfleet tree planting are all confirmed
 * and now shown.
 *
 * Each of these is legally or commercially significant on a builder's site.
 * Leaving one out is correct. Approximating one is not.
 */

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="et-footer">
      <div className="et-container">
        <div className="et-grid et-grid-4">
          <div>
            {/* White-on-transparent variant of the owner's logo (D-79). */}
            <Image
              className="et-footer-logo"
              src="/brand/etr-logo-light.webp"
              alt="Elite Touch Renovations Pty Ltd"
              width={385}
              height={320}
              loading="lazy"
            />
            <p className="et-body-sm" style={{ color: '#b9bec7' }}>
              Family-run bathroom renovations across Sydney since{' '}
              {businessInfo.foundedYear}. Fixed-scope written quotes, a free
              on-site measure, and a{' '}
              {businessInfo.workmanshipWarrantyYears}-year workmanship warranty.
            </p>
            <p
              className="et-body-sm"
              style={{ color: '#b9bec7', marginTop: 'var(--et-space-4)' }}
            >
              We plant one tree for every project we complete, through{' '}
              <a
                href={businessInfo.sustainability.partnerUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                {businessInfo.sustainability.partner}
              </a>
              .
            </p>
          </div>

          <div>
            <p className="et-footer-heading">Services</p>
            <ul>
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}/`}>
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="et-footer-heading">Company</p>
            <ul>
              <li>
                <Link href="/about-us/">About us</Link>
              </li>
              <li>
                <Link href="/gallery/">Gallery</Link>
              </li>
              <li>
                <Link href="/packages/">Packages</Link>
              </li>
              <li>
                <Link href="/contact-us/">Contact us</Link>
              </li>
              <li>
                <Link href="/privacy/">Privacy policy</Link>
              </li>
              <li>
                <Link href="/terms/">Terms of use</Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="et-footer-heading">Get in touch</p>
            <ul>
              <li>
                {/* Real tel: anchor — D-33 */}
                <a href={businessInfo.phone.href}>
                  {businessInfo.phone.display}
                </a>
              </li>
              <li>
                <a href={`mailto:${businessInfo.email.primary}`}>
                  {businessInfo.email.primary}
                </a>
              </li>
              <li>
                <Link href="/contact-us/">Book a free on-site measure</Link>
              </li>
            </ul>

            <p
              className="et-footer-heading"
              style={{ marginTop: 'var(--et-space-8)' }}
            >
              Hours
            </p>
            <ul>
              {businessInfo.hours.map((slot) => (
                <li key={slot.days} style={{ color: '#b9bec7' }}>
                  {slot.days}
                  <br />
                  {slot.open} – {slot.close}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="et-footer-bottom">
          <span>
            © {year} {businessInfo.legalName}
          </span>
          <span>
            NSW Builder Licence {businessInfo.builderLicence} · ABN{' '}
            {businessInfo.abn}
          </span>
          <span>
            Waterproofing to {businessInfo.standards.waterproofing} ·{' '}
            {businessInfo.workmanshipWarrantyYears}-year workmanship warranty
          </span>
          <span>
            {businessInfo.address.suburb}, {businessInfo.address.state} (
            {businessInfo.address.note.toLowerCase()})
          </span>
        </div>
      </div>
    </footer>
  )
}
