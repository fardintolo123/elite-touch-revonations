import serviceAreas from '@/service-areas.json'
import { projects, type Project } from './projects'

/**
 * Service areas, read from `service-areas.json` — the single machine-readable
 * source (CLAUDE.md: "generate location routes from this file; never retype
 * the list"). Two hand-maintained copies of the same suburb data will drift,
 * and the drift will be silent.
 *
 * ⚠️ ADDING A REGION HERE DOES NOT PUBLISH IT.
 * `hubPublished` gates it. This is the guard against PROJECT_CONTEXT.md §4.4 —
 * "a data record can silently become a URL". D-10 exists precisely to stop
 * dozens of thin, near-identical location pages being generated because the
 * data happened to contain them. A hub gets published when it has something
 * real to say, not when its row exists.
 *
 * Routes follow D-71: locations are children of the bathroom service page,
 * `/services/bathroom-renovations/{slug}/`.
 */

export type Suburb = {
  name: string
  slug: string
  postcode: string
  tier: number
  url?: string
  isNotASuburb?: boolean
  note?: string
}

export type Region = {
  name: string
  slug: string
  hubUrl: string
  hubPublished?: boolean
  note?: string
  suburbs: Suburb[]
}

const regions = serviceAreas.regions as Region[]

/** The service these location pages hang off. Matches a slug in `services`. */
export const LOCATION_PARENT_SLUG = 'bathroom-renovations'

/** Only regions with a real page. Everything else stays data, not a URL. */
export function publishedRegions(): Region[] {
  return regions.filter((region) => region.hubPublished === true)
}

export function regionBySlug(slug: string): Region | undefined {
  return publishedRegions().find((region) => region.slug === slug)
}

export function publishedRegionForSuburb(suburbName: string): Region | undefined {
  const target = suburbName.toLowerCase()
  return publishedRegions().find((region) =>
    region.suburbs.some((suburb) => suburb.name.toLowerCase() === target),
  )
}

/**
 * Suburbs shown as service-area copy on a hub.
 * `isNotASuburb` entries exist for postcode completeness only and must never
 * get service-area copy — they are naval bases, shopping centres and headlands.
 */
export function listableSuburbs(region: Region): Suburb[] {
  return region.suburbs
    .filter((suburb) => !suburb.isNotASuburb)
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name))
}

/**
 * Photographed projects that sit inside a region.
 *
 * This is the whole reason the North Shore hub is worth publishing: it is
 * backed by real, suburb-attributed work rather than templated copy. Matching
 * is by exact suburb name against `lib/projects.ts` — never fuzzy, never
 * inferred, so a project can only ever appear on the hub it genuinely belongs to.
 */
export function projectsInRegion(region: Region): Project[] {
  const names = new Set(region.suburbs.map((s) => s.name.toLowerCase()))
  return projects.filter((project) => names.has(project.suburb.toLowerCase()))
}

/** Every published location page, for `generateStaticParams` and the sitemap. */
export function publishedLocationSlugs(): string[] {
  return publishedRegions().map((region) => region.slug)
}
