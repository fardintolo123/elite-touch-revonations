import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { businessInfo } from '@/lib/businessInfo'
import { buildMetadata } from '@/lib/metadata'
import { projects, projectCover } from '@/lib/projects'
import { ContactSection } from '@/components/ContactSection'
import { SchemaGraph } from '@/components/SchemaGraph'
import { AreasServedLinks } from '@/components/AreasServedLinks'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { GoogleRating } from '@/components/GoogleRating'

/**
 * Gallery / our work.
 *
 * Existing indexed URL, and the 301 destination for `/staging/projects/` and
 * `/staging/bathroom-photo-gallery/`.
 *
 * As of 2026-08-19 this page has REAL PHOTOGRAPHY — five suburb-identified
 * projects supplied by the owner with written descriptions. That closes the
 * gap flagged in D-48.
 *
 * Two of the five suburbs — Castle Hill and Randwick — are Tier-1 suburbs in
 * `docs/BATHROOM_SITE_STRUCTURE.md`. When those location pages are built, these
 * are the local project photos the Tier-1 content checklist asks for. Do not
 * duplicate the images into a second data file; import from `lib/projects.ts`.
 *
 * The first image on the page is the LCP candidate and is therefore `priority`
 * (eager + high fetch priority). Everything below it stays lazy —
 * "rendering eagerly ≠ downloading eagerly" (PROJECT_CONTEXT.md §4.2).
 */

export const metadata: Metadata = buildMetadata({
  path: '/gallery/',
  // Renders as "Bathroom Renovation Photos, Sydney | Elite Touch Renovations"
  // via the root layout's title template — 60 chars, carries the keyword +
  // "Sydney" that "Our Work" lacked (issue #38 / page-audit P-3a). "Photos"
  // matches what the page actually is (real photographs of completed work).
  title: 'Bathroom Renovation Photos, Sydney',
  /**
   * Kept <= 155 chars so it does not truncate in SERPs (issue #39). The full
   * suburb list moved to the page's visible lead paragraph; the description now
   * names five representative real projects, not all nine.
   */
  description:
    'Photos of bathroom renovations Elite Touch Renovations has completed across Sydney, from Artarmon and Balmain to Hunters Hill, Randwick and The Rocks.',
})

export default function GalleryPage() {
  const featuredProject = projects[0]
  const featuredCover = projectCover(featuredProject)

  /* One array, two consumers: the visible trail and the BreadcrumbList (D-180). */
  const breadcrumbs = [
    { name: 'Home', url: `${businessInfo.siteUrl}/` },
    { name: 'Our Work', url: `${businessInfo.siteUrl}/gallery/` },
  ] as const

  return (
    <>
      <SchemaGraph
        path="/gallery/"
        name="Bathroom Renovation Photos, Sydney"
        description="Photos of bathroom renovations Elite Touch Renovations has completed across Sydney, from Artarmon and Balmain to Hunters Hill, Randwick and The Rocks."
        pageType="CollectionPage"
        breadcrumbs={breadcrumbs}
        primaryImage={projectCover(projects[0])}
      />
      <section className="et-hero">
        <div className="et-container">
          <Breadcrumbs items={breadcrumbs} />
          <div className="et-hero-grid">
            <Link
              href={`/gallery/${featuredProject.slug}/`}
              className="et-hero-media"
              style={{ display: 'block' }}
            >
              <Image
                src={featuredCover.src}
                alt={featuredCover.alt}
                width={featuredCover.width}
                height={featuredCover.height}
                sizes="(min-width: 1360px) 652px, (min-width: 1024px) 50vw, 100vw"
                priority
              />
            </Link>
            <div className="et-stack">
              <h1 className="et-h1 et-measure-tight">
                Bathroom renovations we have completed across Sydney.
              </h1>
              <p className="et-lead et-measure">
                Real photographs from Artarmon, Balmain, Little Bay and The
                Rocks. Each room has its own layout, materials and constraints.
              </p>
              {/* D-182 (D-174 applied): the proof and the next step sit in the hero, not only at the
                  bottom of a long grid. */}
              <div className="et-hero-cta">
                <Link
                  href="/contact-us/"
                  className="et-btn et-btn-lg et-btn-primary et-btn-block-mobile"
                >
                  {businessInfo.offer.primaryCta}
                </Link>
                {/* Real tel: anchor, never a JS handler (D-33) */}
                <a
                  href={businessInfo.phone.href}
                  className="et-btn et-btn-lg et-btn-secondary et-btn-block-mobile"
                >
                  Call {businessInfo.phone.display}
                </a>
              </div>
              <GoogleRating compact />
              <Link
                href={`/gallery/${featuredProject.slug}/`}
                className="et-body-sm et-link"
                style={{ display: 'inline-flex', width: 'fit-content' }}
              >
                See the {featuredProject.name}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="et-section et-band-canvas">
        <div className="et-container et-stack">
          <h2 className="et-h2 et-measure-tight">
            {projects.length - 1} more photographed projects
          </h2>

          <div className="et-tiles">
            {projects.slice(1).map((project) => {
              const cover = projectCover(project)
              return (
                <Link
                  key={project.slug}
                  href={`/gallery/${project.slug}/`}
                  className="et-card et-card-link et-media-card"
                >
                  <span className="et-media-frame">
                    <Image
                      src={cover.src}
                      alt={cover.alt}
                      width={cover.width}
                      height={cover.height}
                      /* Measured rendered width live (Playwright, issue #27):
                         390→310, 768→664, 1024+→344 (3-col grid caps at
                         the 1200px container, doesn't keep growing). */
                      sizes="(min-width: 1024px) 344px, 50vw"
                      loading="lazy"
                    />
                  </span>
                  <span className="et-badge-suburb">{project.suburb}</span>
                  <h3 className="et-h4" style={{ marginTop: 'var(--et-space-3)' }}>
                    {project.name}
                  </h3>
                  {/* Two lines on screen; the whole sentence stays in the HTML. */}
                  <p
                    className="et-body-sm et-tile-blurb"
                    style={{
                      marginTop: 'var(--et-space-3)',
                      color: 'var(--et-text-secondary)',
                    }}
                  >
                    {project.blurb}
                  </p>
                  <p
                    className="et-body-sm"
                    style={{
                      marginTop: 'var(--et-space-4)',
                      color: 'var(--et-text-accent)',
                      fontWeight: 600,
                    }}
                  >
                    See the photos →
                  </p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <AreasServedLinks
        title="Looking for bathroom renovation work near you?"
        intro="The gallery shows real projects by suburb. The area pages explain where we work across Sydney and link the project proof to the service coverage."
        band="surface"
      />
      <ContactSection />
    </>
  )
}
