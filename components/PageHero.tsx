import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { businessInfo } from '@/lib/businessInfo'
import type { Project } from '@/lib/projects'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import type { SchemaCrumb } from '@/lib/schema'

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
 *
 * TWO LAYOUTS (D-171). The default puts the photo in a column beside the copy.
 * `backdrop` instead renders DESIGN.md §4.4's own hero recipe — full-bleed
 * photo, ink scrim, headline and CTA over it — which the owner asked for
 * ("images as background in some places like heros") and which the side-by-side
 * layout had quietly replaced. Only pass `backdrop` where `image` is a real
 * evidenced photo: a scrimmed backdrop makes the photo the page's main claim,
 * so an unrelated bathroom behind a powder-room H1 would read as proof of work
 * we cannot show (D-83/D-06).
 *
 * Contrast is NOT assumed from the scrim token alone. Bathroom photography is
 * mostly white tile, so the backdrop stacks a flat 48% ink wash under
 * DESIGN.md §9's directional scrim and was checked against the lightest part
 * of each photo actually used, per §9's own instruction.
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
  rating,
  facts,
  image,
  backdrop = false,
  breadcrumbs,
}: {
  /** Omit when the pill would only restate the H1 (D-177). */
  eyebrow?: string
  title: string
  leads: string[]
  cta?: boolean
  /** One inline rating line under the CTAs (`<GoogleRating compact />`). */
  rating?: ReactNode
  facts?: PageHeroFact[]
  image?: PageHeroImage
  backdrop?: boolean
  /**
   * The SAME array the page passes to `<SchemaGraph breadcrumbs={...}>` — one
   * source for the visible trail and the `BreadcrumbList` (D-180). Omit on the
   * homepage, which is the trail's root and has no trail of its own.
   */
  breadcrumbs?: readonly SchemaCrumb[]
}) {
  const copy = (
    <div className="et-stack">
      {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
      {eyebrow && <span className="et-eyebrow">{eyebrow}</span>}
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

      {rating}

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

  if (backdrop) {
    return (
      <section className="et-hero et-hero-backdrop et-band-ink">
        {/* LCP candidate. `fill` + `sizes="100vw"` is the truth here — unlike
            the column layout, this photo really does span the viewport. Same
            shape as `LocationHero`, which already does this. */}
        <div className="et-hero-backdrop-photo">
          <Image src={photo.src} alt={photo.alt} fill sizes="100vw" priority />
        </div>
        <div className="et-hero-backdrop-scrim" aria-hidden="true" />
        <div className="et-container et-hero-backdrop-content">
          {copy}
          <p className="et-body-sm et-hero-backdrop-credit">
            <Link href={`/gallery/${image.project.slug}/`} className="et-link">
              See the {image.project.name}
            </Link>
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="et-hero">
      <div className="et-container">
        <div className="et-hero-grid">
          {copy}

          <div className="et-stack">
            {/* LCP candidate: eager + high priority, our own photograph,
                alt text describing the photo, not the page topic (D-66). */}
            <div className="et-hero-media et-image-fade" data-fade="left">
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
              className="et-body-sm et-link"
              style={{ display: 'inline-flex', width: 'fit-content' }}
            >
              See the {image.project.name}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
