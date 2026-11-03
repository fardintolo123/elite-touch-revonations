import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { businessInfo } from '@/lib/businessInfo'
import type { Project } from '@/lib/projects'

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
 * the H1). The back link stays as the page's one hierarchy cue.
 */
export function LocationHero({
  backHref,
  backLabel,
  caption,
  title,
  lead,
  project,
  projectLabel,
  rating,
}: {
  backHref: string
  backLabel: string
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
            priority
          />
        </div>
      )}

      <div className="et-container et-location-hero-content">
        <p className="et-body-sm">
          <Link href={backHref} className="et-location-hero-back">
            ← {backLabel}
          </Link>
        </p>
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
