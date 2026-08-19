import type { MetadataRoute } from 'next'
import { businessInfo, services } from '@/lib/businessInfo'
import { projects } from '@/lib/projects'

/**
 * Replaces Yoast's `sitemap_index.xml` / `page-sitemap.xml`.
 *
 * Next serves this at `/sitemap.xml`. Two things to do at cutover:
 *   1. Submit `/sitemap.xml` in Search Console.
 *   2. Leave the old Yoast sitemap URLs 404ing — do NOT redirect them to this
 *      one. Google needs to see them go away.
 *
 * ⚠️ URLs here carry a trailing slash to match `trailingSlash: true`. A
 * sitemap entry that does not match the canonical form makes every URL a
 * redirect in Google's eyes, which wastes crawl budget and muddies the
 * canonical signal.
 *
 * ⚠️ `/elementor-hf/header/` and `/elementor-hf/footer/` are absent on purpose.
 * They 410. Listing a Gone URL in a sitemap is a contradiction.
 *
 * Publication = content + an internal link from a relevant hub + a sitemap
 * entry (PROJECT_CONTEXT.md §4.7). Adding a route here is not publishing it.
 */

export default function sitemap(): MetadataRoute.Sitemap {
  const base = businessInfo.siteUrl
  const lastModified = new Date()

  const staticRoutes: MetadataRoute.Sitemap = (
    [
      { url: `${base}/`, changeFrequency: 'monthly', priority: 1 },
      { url: `${base}/services/`, changeFrequency: 'monthly', priority: 0.9 },
      { url: `${base}/packages/`, changeFrequency: 'monthly', priority: 0.9 },
      { url: `${base}/gallery/`, changeFrequency: 'monthly', priority: 0.8 },
      { url: `${base}/about-us/`, changeFrequency: 'yearly', priority: 0.7 },
      { url: `${base}/contact-us/`, changeFrequency: 'yearly', priority: 0.8 },
    ] satisfies MetadataRoute.Sitemap
  ).map((entry) => ({ ...entry, lastModified }))

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${base}/services/${service.slug}/`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${base}/gallery/${project.slug}/`,
    lastModified,
    changeFrequency: 'yearly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes]
}
