import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { businessInfo } from '@/lib/businessInfo'
import './globals.css'

/**
 * Jost is DESIGN.md §3's family (SIL OFL 1.1).
 *
 * The file is committed to the repo and served from our own origin rather than
 * pulled with `next/font/google`. Two reasons:
 *   1. Zero build-time and runtime dependency on Google's font CDN. The build
 *      cannot break because fonts.gstatic.com is slow, blocked, or changes a
 *      hashed URL.
 *   2. No third-party connection at runtime at all — no extra DNS + TLS
 *      handshake in the critical path.
 *
 * It is the ONE variable file covering the whole 400–700 range DESIGN.md uses,
 * latin subset only: 26 KB. `display: 'swap'` keeps text visible while it
 * loads, and declaring it here means Next emits a `<link rel="preload">` and a
 * size-adjusted fallback, so there is no layout shift when it arrives.
 *
 * To update: re-download the latin subset from Google Fonts and replace the
 * file. Do not add extra subsets we do not serve — cyrillic and latin-ext are
 * dead weight for a Sydney trade site.
 */
const jost = localFont({
  src: './fonts/jost-latin-var.woff2',
  weight: '400 700',
  style: 'normal',
  display: 'swap',
  variable: '--font-jost',
  fallback: [
    'ui-sans-serif',
    'system-ui',
    'Segoe UI',
    'Roboto',
    'Helvetica',
    'Arial',
    'sans-serif',
  ],
})

export const metadata: Metadata = {
  metadataBase: new URL(businessInfo.siteUrl),
  title: {
    default:
      'Elite Touch Renovations | Bathroom Renovations Sydney',
    template: '%s | Elite Touch Renovations',
  },
  description:
    'Family-run bathroom renovations across Sydney. Free on-site measure, fixed-scope written quotes, waterproofing to AS 3740. NSW Builder Licence 475204C.',
  applicationName: businessInfo.name,
  /**
   * Sitewide default. Any not-found branch MUST override this explicitly —
   * a 404 body that inherits `index, follow` becomes an indexable soft 404
   * at HTTP 200 (PROJECT_CONTEXT.md §4.3). See app/not-found.tsx.
   */
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    siteName: businessInfo.name,
    url: businessInfo.siteUrl,
  },
  formatDetection: {
    telephone: true,
  },
}

/**
 * LocalBusiness schema. Everything here traces to a stated source — the owner's
 * page-copy PDFs on GitHub issue #2 (docs/source-copy/) or PROJECT_CONTEXT.md.
 *
 * STILL DELIBERATELY OMITTED — do not add without closing the item first:
 *   - `aggregateRating` : the GBP shows 5.0 across 17 reviews as at the issue #2
 *                         PDF, but that has NOT been verified live. A stale
 *                         rating in structured data is a real problem. Verify,
 *                         then add.
 *   - `review`          : D-03. The 19 testimonials in Customer Reviews.md are
 *                         real, but only 17 are Google reviews — the two sets
 *                         are not the same and the mapping is unknown.
 *   - `warranty` claims : D-19 — ETR's workmanship term has never been supplied.
 *   - a street address  : only "Granville, NSW (by appointment)" is known.
 *                         `PostalAddress` without a street is honest; inventing
 *                         one to satisfy a validator is not.
 */
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  name: businessInfo.name,
  legalName: businessInfo.legalName,
  url: businessInfo.siteUrl,
  telephone: businessInfo.phone.display,
  email: businessInfo.email.current,
  foundingDate: String(businessInfo.foundedYear),
  address: {
    '@type': 'PostalAddress',
    addressLocality: businessInfo.address.suburb,
    addressRegion: businessInfo.address.state,
    addressCountry: businessInfo.address.country,
  },
  areaServed: {
    '@type': 'City',
    name: businessInfo.serviceArea.city,
    address: {
      '@type': 'PostalAddress',
      addressRegion: businessInfo.serviceArea.state,
      addressCountry: businessInfo.serviceArea.country,
    },
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '07:00',
      closes: '17:30',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday'],
      opens: '08:00',
      closes: '15:30',
    },
  ],
  founder: {
    '@type': 'Person',
    name: 'Omar Dawood',
    jobTitle: 'Licensed Builder & Civil Engineer',
  },
  employee: businessInfo.principals.map((person) => ({
    '@type': 'Person',
    name: person.name,
    jobTitle: person.role,
  })),
  hasCredential: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'NSW Builder Licence',
    identifier: businessInfo.builderLicence,
  },
  identifier: [
    { '@type': 'PropertyValue', name: 'ABN', value: businessInfo.abn },
    { '@type': 'PropertyValue', name: 'ACN', value: businessInfo.acn },
  ],
  sameAs: [
    businessInfo.googleBusinessProfile.url,
    ...Object.values(businessInfo.socialProfiles),
  ],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU" className={jost.variable}>
      <body>
        <a className="et-skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      </body>
    </html>
  )
}
