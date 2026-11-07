import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { businessInfo } from '@/lib/businessInfo'
import type { Project } from '@/lib/projects'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import type { SchemaCrumb } from '@/lib/schema'

/**
 * Full-bleed hero for location pages.
 *
 * The photo is always a real project already associated with the page. The
 * overlay keeps the location copy and CTAs readable while the credit link makes
 * the image's provenance visible rather than decorative.
 *
 * D-177 (D-174 applied): the hero holds the H1, one line, the two CTAs, one
 * inline rating and one quiet credit line. The eyebrow pill, the caption above
 * the H1, the three fact chips and the "featured project" pill that used to
 * stack here were each restating something the page says lower down (licence,
 * warranty and AS 3740 sit in the trust band and the footer; the suburb is in
 * the H1). The page keeps exactly one hierarchy cue.
 *
 * D-180: that cue is now the full breadcrumb trail rather than a single "back"
 * link. This does not reverse D-177 — there is still one quiet cue above the
 * H1, and rendering both would be the duplication D-174 forbids — it just
 * shows the whole path instead of one step of it. It also drops a scored <p>
 * from every location page: the back link lived in one, and
 * `scripts/check-readability.mjs` counted "← Bathroom renovations in the Hills
 * District." as a sentence of prose.
 */
export function LocationHero({
  breadcrumbs,
  caption,
  title,
  lead,
  project,
  projectLabel,
  rating,
}: {
  /** The SAME array the page passes to `<SchemaGraph breadcrumbs={...}>` (D-180). */
  breadcrumbs: readonly SchemaCrumb[]
  /** Quiet text before the project link, e.g. "Reviewed September 2026". */
  caption?: string
  title: string
  lead: string
  project?: Project
  projectLabel?: string
  rating?: ReactNode
}) {
  const photo = project?.images[0]

  return (
    <section className="et-location-hero">
      {photo && (
        <div className="et-location-hero-media">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="100vw"
            preload
            fetchPriority="high"
          />
        </div>
      )}

      <div className="et-container et-location-hero-content">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="et-h1 et-measure-tight">{title}</h1>
        <p className="et-lead et-measure et-location-hero-lead">{lead}</p>

        <div className="et-hero-cta">
          <Link
            href="/contact-us/"
            className="et-btn et-btn-lg et-btn-primary et-btn-block-mobile"
          >
            {businessInfo.offer.primaryCta}
          </Link>
          <a
            href={businessInfo.phone.href}
            className="et-btn et-btn-lg et-btn-secondary et-btn-block-mobile"
          >
            Call {businessInfo.phone.display}
          </a>
        </div>

        {rating}

        {(caption || project) && (
          <p className="et-body-sm et-location-hero-credit">
            {caption}
            {caption && project ? ' · ' : null}
            {project && (
              <Link href={`/gallery/${project.slug}/`} className="et-location-hero-project">
                {projectLabel ?? `${project.suburb} - ${project.name}`}
              </Link>
            )}
          </p>
        )}
      </div>
    </section>
  )
}
