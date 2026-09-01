import type { ServiceSlug } from './businessInfo'

/**
 * Which real, suburb-attributed photo (if any) illustrates each service hero.
 *
 * Only `bathroom-renovations` and `ensuite-bathroom-renovations` are
 * photographed in `lib/projects.ts`. The other two services deliberately stay
 * text-only until there is evidenced photography for them.
 */
export const serviceHeroImages: Partial<
  Record<ServiceSlug, { slug: string; imageIndex?: number }>
> = {
  'bathroom-renovations': { slug: 'randwick-bathroom', imageIndex: 1 },
  'ensuite-bathroom-renovations': { slug: 'hornsby-ensuite', imageIndex: 0 },
}
