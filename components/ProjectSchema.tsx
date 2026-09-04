import { businessInfo } from '@/lib/businessInfo'
import type { Project } from '@/lib/projects'

/**
 * `CreativeWork` + per-photo `ImageObject` JSON-LD for a gallery project page
 * (GitHub issue #24 / tech-audit S-2 + L-5).
 *
 * `CreativeWork` over `Article` (the issue allows either): these pages are
 * project case studies, not journalism, and `CreativeWork` carries no
 * `datePublished`/`author`/`publisher` expectations Google's Article rich
 * result checks for — expectations this repo cannot back with a real byline
 * or a `logo` asset yet (schema audit S-3, not shipped). `dateCreated` uses
 * `completedByYear` — the only evidenced date on a project (`Project`'s own
 * comment: exact completion dates are not recorded).
 *
 * `caption` is always `image.alt` verbatim — the same factual, photograph-only
 * text `lib/projects.ts` enforces (D-36 / PROJECT_CONTEXT.md §4.9). Never
 * write separate marketing copy into `caption`.
 *
 * `creator` (→ the business) is deliberately omitted: the schema audit notes
 * it is "cleaner if F-2's `@graph` lands first" (issue #30, not shipped) so it
 * can reference the LocalBusiness node by `@id` instead of duplicating it.
 * Add it once #30 lands.
 */
export function ProjectSchema({ project }: { project: Project }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.name,
    description: project.blurb,
    dateCreated: String(project.completedByYear),
    image: project.images.map((image, index) => ({
      '@type': 'ImageObject',
      contentUrl: `${businessInfo.siteUrl}${image.src}`,
      caption: image.alt,
      width: image.width,
      height: image.height,
      // The lead photo is the page's LCP image and the one used for
      // `og:image` — factually the representative image, not a guess.
      ...(index === 0 ? { representativeOfPage: true } : {}),
    })),
  }

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
