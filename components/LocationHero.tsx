import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { businessInfo } from '@/lib/businessInfo'
import type { Project } from '@/lib/projects'

type LocationHeroFact = { label: string; value: ReactNode }

/**
 * Full-bleed hero for location pages.
 *
 * The photo is always a real project already associated with the page. The
 * overlay keeps the location copy, CTAs, and trust facts readable while the
 * gallery link makes the image's provenance visible rather than decorative.
 */
export function LocationHero({
  backHref,
  backLabel,
  eyebrow,
  caption,
  title,
  lead,
  facts,
  project,
  projectLabel,
  rating,
}: {
  backHref: string
  backLabel: string
  eyebrow: string
  caption: string
  title: string
  lead: string
  facts: LocationHeroFact[]
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
        <span className="et-eyebrow et-eyebrow-on-image">{eyebrow}</span>
        <p className="et-caption et-location-hero-caption">{caption}</p>
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

        <ul className="et-facts et-location-hero-facts">
          {facts.map((fact) => (
            <li key={fact.label} className="et-fact">
              <strong>{fact.label}</strong> {fact.value}
            </li>
          ))}
        </ul>

        {project && (
          <Link
            href={`/gallery/${project.slug}/`}
            className="et-location-hero-project"
          >
            {projectLabel ?? `${project.suburb} — ${project.name}`} <span aria-hidden="true">↗</span>
          </Link>
        )}
      </div>
    </section>
  )
}
