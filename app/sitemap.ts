import type { MetadataRoute } from 'next'
import { businessInfo, services } from '@/lib/businessInfo'
import { projects } from '@/lib/projects'
import {
  LOCATION_PARENT_SLUG,
  projectsInRegion,
  publishedRegions,
} from '@/lib/locations'
import { serviceHeroImages } from '@/lib/serviceHeroImages'

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
 *
 * ⚠️ `lastModified` is a REAL per-content date — never `new Date()`. A build
 * timestamp marks every page "changed" on every unrelated Vercel deploy, and
 * Google discounts a sitemap that cries wolf ("fake freshness is a trust
 * signal spent for nothing" — SEO audit M-2 / issue #23). Sources:
 *   - service pages → `updated` in `lib/businessInfo.ts`
 *   - gallery project pages → `updated` in `lib/projects.ts`
 *   - everything else → `LAST_CONTENT_PASS` below; bump it ONLY when you have
 *     genuinely reworked those pages, not on a routine deploy.
 *
 * `images` lists the photos a crawler finds on that page, as absolute URLs —
 * the Google image-sitemap extension (issue #41).
 */

/**
 * Last site-wide content pass. The 2026-08-31 SEO implementation reworked the
 * homepage, services index, packages, about, gallery index and the contact
 * form. Applies to routes that do not carry their own tracked `updated` date.
 * Change this only when you actually change those pages.
 */
const LAST_CONTENT_PASS = '2026-08-31'

const absolute = (path: string) => `${businessInfo.siteUrl}${path}`

function serviceHeroImageFor(slug: string): string | undefined {
  const ref = serviceHeroImages[slug as keyof typeof serviceHeroImages]
  const project = ref ? projects.find((item) => item.slug === ref.slug) : undefined
  const image = project?.images[ref?.imageIndex ?? 0]

  return image ? absolute(image.src) : undefined
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = businessInfo.siteUrl

  const staticRoutes: MetadataRoute.Sitemap = (
    [
      { url: `${base}/`, changeFrequency: 'monthly', priority: 1 },
      { url: `${base}/services/`, changeFrequency: 'monthly', priority: 0.9 },
      { url: `${base}/packages/`, changeFrequency: 'monthly', priority: 0.9 },
      { url: `${base}/gallery/`, changeFrequency: 'monthly', priority: 0.8 },
      { url: `${base}/about-us/`, changeFrequency: 'yearly', priority: 0.7 },
      { url: `${base}/contact-us/`, changeFrequency: 'yearly', priority: 0.8 },
    ] satisfies MetadataRoute.Sitemap
  ).map((entry) => ({ ...entry, lastModified: LAST_CONTENT_PASS }))

  /**
   * Privacy + terms (issue #37). Low priority, rarely change. Their own real
   * content date — `businessInfo.legalPagesUpdated` — not `LAST_CONTENT_PASS`,
   * because they did not exist at the last site-wide pass and their wording
   * moves independently of the marketing pages.
   */
  const legalRoutes: MetadataRoute.Sitemap = (
    [
      { url: `${base}/privacy/`, changeFrequency: 'yearly', priority: 0.3 },
      { url: `${base}/terms/`, changeFrequency: 'yearly', priority: 0.3 },
    ] satisfies MetadataRoute.Sitemap
  ).map((entry) => ({
    ...entry,
    lastModified: businessInfo.legalPagesUpdated,
  }))

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => {
    const heroImage = serviceHeroImageFor(service.slug)

    return {
      url: `${base}/services/${service.slug}/`,
      lastModified: service.updated,
      changeFrequency: 'monthly',
      priority: 0.8,
      ...(heroImage ? { images: [heroImage] } : {}),
    }
  })

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${base}/gallery/${project.slug}/`,
    lastModified: project.updated,
    changeFrequency: 'yearly',
    priority: 0.6,
    images: project.images.map((image) => absolute(image.src)),
  }))

  const locationRoutes: MetadataRoute.Sitemap = publishedRegions().map(
    (region) => {
      const localImages = projectsInRegion(region).map((project) =>
        absolute(project.images[0].src),
      )
      return {
        url: `${base}/services/${LOCATION_PARENT_SLUG}/${region.slug}/`,
        lastModified: region.updated ?? LAST_CONTENT_PASS,
        changeFrequency: 'monthly',
        priority: 0.8,
        ...(localImages.length > 0 ? { images: localImages } : {}),
      }
    },
  )

  return [
    ...staticRoutes,
    ...legalRoutes,
    ...serviceRoutes,
    ...projectRoutes,
    ...locationRoutes,
  ]
}
