import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Script from 'next/script'
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
 *   (D-19 is now CLOSED — the owner confirmed a 10-year workmanship warranty
 *    on 2026-08-19, and it is carried in `warranty` below.)
 *   - a street address  : only "Granville, NSW (by appointment)" is known.
 *                         `PostalAddress` without a street is honest; inventing
 *                         one to satisfy a validator is not.
 */
const localBusinessSchema = {
  '@context': 'https://schema.org',
  /**
   * Both types on one node. `HomeAndConstructionBusiness` IS-A `Organization`
   * in schema.org's own class hierarchy, but some validators and AI crawlers
   * pattern-match the literal `@type` string rather than resolving that
   * inheritance — GitHub issue #8's GEO audit flagged "Organization schema
   * missing" against this exact node for that reason. Declaring both is
   * standard practice for closing that gap without a second, redundant node.
   */
  '@type': ['HomeAndConstructionBusiness', 'Organization'],
  name: businessInfo.name,
  legalName: businessInfo.legalName,
  url: businessInfo.siteUrl,
  telephone: businessInfo.phone.display,
  email: businessInfo.email.primary,
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
  makesOffer: {
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Service',
      name: 'Bathroom renovation',
      areaServed: businessInfo.serviceArea.city,
    },
    warranty: {
      '@type': 'WarrantyPromise',
      durationOfWarranty: {
        '@type': 'QuantitativeValue',
        value: businessInfo.workmanshipWarrantyYears,
        unitCode: 'ANN',
      },
    },
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

/**
 * Minimal WebSite node — the other schema GitHub issue #8's GEO audit flagged
 * as missing. Deliberately WITHOUT a `SearchAction`: that requires a real
 * on-site search endpoint, which does not exist here, and a `target` pointing
 * at a search feature that does not work would misrepresent the site rather
 * than describe it.
 */
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: businessInfo.name,
  url: businessInfo.siteUrl,
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU" className={jost.variable}>
      <body>
        {/* GTM noscript fallback — must be first child of body (D-32) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/*
         * GTM loader. afterInteractive = lazy, fires after hydration.
         * One measurement path: Website → GTM → Google tag → GA4 (D-32).
         * The standalone Google tag (GT-MBNT4TKH) is NOT installed —
         * installing both would double-count every event.
         */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');`}
        </Script>
        {/*
         * Browsers restore the pre-reload scroll position by default
         * (`history.scrollRestoration === 'auto'`), so an F5 on a page the
         * visitor had scrolled down leaves them mid-page instead of at the
         * top. `beforeInteractive` runs before hydration/paint so there is
         * no visible jump. Applies site-wide since it lives in the root
         * layout, not a per-page component.
         */}
        <Script id="disable-scroll-restoration" strategy="beforeInteractive">
          {`if ('scrollRestoration' in history) { history.scrollRestoration = 'manual' }`}
        </Script>
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
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </body>
    </html>
  )
}
