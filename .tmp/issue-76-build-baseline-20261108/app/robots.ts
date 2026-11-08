import type { MetadataRoute } from 'next'
import { businessInfo } from '@/lib/businessInfo'

/**
 * Served at `/robots.txt`.
 *
 * `/staging/` is disallowed as a second line of defence. It is already 301'd in
 * next.config.ts, but if a staging path is ever served directly this stops it
 * being crawled.
 *
 * ⚠️ Do NOT add `/elementor-hf/` here. Blocking a URL in robots.txt prevents
 * Google from crawling it — which means it never sees the 410 and the URL can
 * linger in the index as a URL-only entry. To remove a page, let it be crawled
 * and let it return 410.
 *
 * No `host:` line. The canonical host is already fixed by the `https`/`www`
 * redirects (D-41) and the per-page canonical tags. `Host:` in robots.txt is a
 * Yandex-only directive that Yandex itself has deprecated, and Google ignores
 * it — emitting it was just noise (SEO audit L-4).
 */

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/staging/'],
      },
    ],
    sitemap: `${businessInfo.siteUrl}/sitemap.xml`,
  }
}
