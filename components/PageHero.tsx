import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { businessInfo } from '@/lib/businessInfo'
import type { Project } from '@/lib/projects'

/**
 * Shared hero for every page except the homepage (which has its own layout —
 * a facts list AND a testimonial card stacked beside the image).
 *
 * WHY AN OPTIONAL IMAGE, NOT A DEFAULT ONE.
 * Only pass `image` when the page is honestly illustrated by a real,
 * suburb-attributed project photo (lib/projects.ts). The bathroom and
 * ensuite services are photographed; laundry and powder-room are not
 * (D-83/D-06 — dropping a bathroom photo onto the powder-room page would
 * imply proof of work we cannot show). Pages with no evidenced photo simply
 * omit `image` and render the plain text-only hero, same as before.
 *
 * The image is this page's LCP candidate, so it always loads eager + high
 * priority — never pass more than one PageHero per page.
 */

type PageHeroFact = { label: string; value: ReactNode }

type PageHeroImage = {
  project: Project
  /** Defaults to the project's cover (index 0). */
  imageIndex?: number
}

export function PageHero({
  eyebrow,
  title,
  leads,
  cta = true,
  facts,
  image,
}: {
  eyebrow: string
  title: string
  leads: string[]
  cta?: boolean
  facts?: PageHeroFact[]
  image?: PageHeroImage
}) {
  const copy = (
    <div className="et-stack">
      <span className="et-eyebrow">{eyebrow}</span>
      <h1 className="et-h1 et-measure-tight">{title}</h1>
      {leads.map((lead, index) => (
        <p key={index} className="et-lead et-measure">
          {lead}
        </p>
      ))}

      {cta && (
        <div className="et-hero-cta">
          <Link
            href="/contact-us/"
            className="et-btn et-btn-lg et-btn-primary et-btn-block-mobile"
          >
            {businessInfo.offer.primaryCta}
          </Link>
          {/* Real tel: anchor — never a JS handler (D-33) */}
          <a
            href={businessInfo.phone.href}
            className="et-btn et-btn-lg et-btn-secondary et-btn-block-mobile"
          >
            Call {businessInfo.phone.display}
          </a>
        </div>
      )}

      {facts && facts.length > 0 && (
        <ul className="et-facts">
          {facts.map((fact) => (
            <li key={fact.label} className="et-fact">
              <strong>{fact.label}</strong> {fact.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  )

  if (!image) {
    return (
      <section className="et-hero">
        <div className="et-container">{copy}</div>
      </section>
    )
  }

  const photo = image.project.images[image.imageIndex ?? 0]

  return (
    <section className="et-hero">
      <div className="et-container">
        <div className="et-hero-grid">
          {copy}

          <div className="et-stack">
            {/* LCP candidate: eager + high priority, our own photograph,
                alt text describing the photo, not the page topic (D-66). */}
            <div className="et-hero-media">
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(min-width: 1024px) 40vw, 100vw"
                priority
              />
            </div>
            <Link
              href={`/gallery/${image.project.slug}/`}
              className="et-badge-suburb"
              style={{ display: 'inline-flex', width: 'fit-content' }}
            >
              {image.project.suburb} — {image.project.name}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
