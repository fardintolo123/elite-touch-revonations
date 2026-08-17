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
    host: businessInfo.siteUrl,
  }
}
