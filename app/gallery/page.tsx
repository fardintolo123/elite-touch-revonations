import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { businessInfo } from '@/lib/businessInfo'
import { buildMetadata } from '@/lib/metadata'
import { projects, projectCover } from '@/lib/projects'
import { ContactSection } from '@/components/ContactSection'
import { SchemaGraph } from '@/components/SchemaGraph'
import { AreasServedLinks } from '@/components/AreasServedLinks'

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

/**
 * Documented projects with no photography supplied. Kept as text so the work is
 * still represented. Do NOT attach any of the gallery photos to these — there
 * is no confirmed evidence linking them (D-06).
 *
 * ⚠️ 2026-08-25: a photographed Hunters Hill and a photographed The Rocks
 * project were added to `lib/projects.ts` (slugs `hunters-hill-bathroom`,
 * `the-rocks-bathroom`) from a separate source. Both closely match the
 * descriptions below — same suburb, same distinctive features (the Hunters
 * Hill entry's marble/double-vanity/freestanding-bath; The Rocks entry's
 * protected heritage window). They MAY be the same jobs as these two text
 * entries, now with photos. Asked directly, the user did not know either way
 * (see PROJECT_CONTEXT.md K14), so per D-06/D-69 they are kept as separate,
 * unmerged entries rather than assumed identical.
 */
const TEXT_ONLY_PROJECTS = [
  {
    name: 'Heritage bathroom, The Rocks',
    body: 'A bathroom in a 19th-century terrace, worked around an original timber-framed window that had to stay. Heritage fabric sets the constraints on a job like this - the waterproofing and the setout have to be planned around what cannot be moved.',
  },
  {
    name: 'Marble bathroom, Hunters Hill',
    body: 'Full-height marble, a custom double vanity and a freestanding bath. Large-format natural stone is unforgiving: the falls, the joints and the cuts all have to be right the first time, because there is no hiding a correction in marble.',
  },
] as const

export default function GalleryPage() {
  const featuredProject = projects[0]
  const featuredCover = projectCover(featuredProject)

  return (
    <>
      <SchemaGraph
        path="/gallery/"
        name="Bathroom Renovation Photos, Sydney"
        description="Photos of bathroom renovations Elite Touch Renovations has completed across Sydney, from Artarmon and Balmain to Hunters Hill, Randwick and The Rocks."
        pageType="CollectionPage"
        breadcrumbs={[
          { name: 'Home', url: `${businessInfo.siteUrl}/` },
          { name: 'Our Work', url: `${businessInfo.siteUrl}/gallery/` },
        ]}
        primaryImage={projectCover(projects[0])}
      />
      <section className="et-hero">
        <div className="et-container">
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
              <span className="et-eyebrow">
                {featuredProject.suburb} · {featuredProject.service}
              </span>
              <h1 className="et-h1 et-measure-tight">
                Bathroom renovations we have completed across Sydney.
              </h1>
              <p className="et-lead et-measure">
                Real photographs from Artarmon, Balmain, Little Bay and The
                Rocks. Each room has its own layout, materials and constraints.
              </p>
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

          <div
            className="et-grid et-grid-3"
            style={{ marginTop: 'var(--et-space-8)' }}
          >
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
                      sizes="(min-width: 1024px) 344px, (min-width: 768px) 664px, 100vw"
                      loading="lazy"
                    />
                  </span>
                  <span className="et-badge-suburb">{project.suburb}</span>
                  <h3 className="et-h4" style={{ marginTop: 'var(--et-space-3)' }}>
                    {project.name}
                  </h3>
                  <p
                    className="et-body-sm"
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
      <section className="et-section et-band-canvas">
        <div className="et-container et-stack">
          <h2 className="et-h2 et-measure-tight">
            Two more projects worth describing
          </h2>
          <p className="et-lead et-measure">
            We do not have photography cleared for these two yet, but the work
            is worth explaining.
          </p>

          <div className="et-stack" style={{ marginTop: 'var(--et-space-8)' }}>
            {TEXT_ONLY_PROJECTS.map((project) => (
              <article
                key={project.name}
                style={{
                  borderTop: '1px solid var(--et-border)',
                  paddingBlock: 'var(--et-space-6)',
                }}
              >
                <h3 className="et-h4">{project.name}</h3>
                <p
                  className="et-body-sm"
                  style={{
                    marginTop: 'var(--et-space-4)',
                    color: 'var(--et-text-secondary)',
                  }}
                >
                  {project.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  )
}
