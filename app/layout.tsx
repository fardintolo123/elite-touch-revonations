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
    /**
     * Sitewide default share image (issue #20 / tech-audit H-3). Every page's
     * `generateMetadata`/`metadata` now goes through `lib/metadata.ts`
     * `buildMetadata()`, which sets the SAME default on every page unless it
     * passes its own `images` — this copy only matters as the fallback for
     * something outside that helper (there is nothing today, but Next
     * requires a `Metadata` object here regardless).
     */
    images: [
      {
        url: '/og/default.jpg',
        width: 1200,
        height: 630,
        alt: 'Elite Touch Renovations — bathroom renovations across Sydney',
      },
    ],
  },
  /**
   * `summary_large_image` needs an image to be meaningful — every page has
   * one now via `buildMetadata()`. `twitter.title`/`description`/`images`
   * are deliberately left unset so they auto-fill per-page from `openGraph`
   * (see `lib/metadata.ts`); only `card` needs to be sitewide.
   */
  twitter: {
    card: 'summary_large_image',
  },
  formatDetection: {
    telephone: true,
  },
}

/**
 * The LocalBusiness (`HomeAndConstructionBusiness` + `Organization`) and
 * `WebSite` nodes used to live here as two standalone root-layout scripts.
 * Issue #30 folded them into `lib/schema.ts` (`buildBusinessNode` /
 * `buildWebsiteNode`) so every page emits them as part of its own connected
 * `@graph` via `<SchemaGraph>`, instead of as disconnected blocks repeated
 * outside that graph on every route. See `lib/schema.ts` for the node
 * definitions and the sourcing/omission notes that used to be here.
 */
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
      </body>
    </html>
  )
}
