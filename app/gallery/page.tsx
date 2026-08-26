import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { businessInfo } from '@/lib/businessInfo'
import { projects, projectCover } from '@/lib/projects'
import { ContactSection } from '@/components/ContactSection'
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema'

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

export const metadata: Metadata = {
  title: 'Our Work',
  description:
    'Bathroom renovation projects by Elite Touch Renovations across Sydney — including Artarmon, Balmain, Castle Hill, Gladesville, Hornsby, Hunters Hill, Little Bay, Randwick and The Rocks. Real photographs of completed work.',
  alternates: { canonical: '/gallery/' },
}

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
    body: 'A bathroom in a 19th-century terrace, worked around an original timber-framed window that had to stay. Heritage fabric sets the constraints on a job like this — the waterproofing and the setout have to be planned around what cannot be moved.',
  },
  {
    name: 'Marble bathroom, Hunters Hill',
    body: 'Full-height marble, a custom double vanity and a freestanding bath. Large-format natural stone is unforgiving: the falls, the joints and the cuts all have to be right the first time, because there is no hiding a correction in marble.',
  },
] as const

export default function GalleryPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: `${businessInfo.siteUrl}/` },
          { name: 'Our Work', url: `${businessInfo.siteUrl}/gallery/` },
        ]}
      />
      <section className="et-hero">
        <div className="et-container et-stack">
          <span className="et-eyebrow">Our work</span>
          <h1 className="et-h1 et-measure-tight">
            Bathroom renovations we have completed across Sydney.
          </h1>
          <p className="et-lead et-measure">
            Real photographs of finished work across Sydney, from Artarmon and
            Balmain to Little Bay and The Rocks — different homes, different
            budgets, the same standard underneath the tiles.
          </p>
        </div>
      </section>

      <section className="et-section et-band-canvas">
        <div className="et-container et-stack">
          <span className="et-eyebrow">Recent projects</span>
          <h2 className="et-h2 et-measure-tight">
            {projects.length} recent Sydney bathrooms
          </h2>

          <div
            className="et-grid et-grid-3"
            style={{ marginTop: 'var(--et-space-8)' }}
          >
            {projects.map((project, index) => {
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
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      priority={index === 0}
                      loading={index === 0 ? 'eager' : 'lazy'}
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

      <section className="et-section et-band-surface">
        <div className="et-container et-stack">
          <span className="et-eyebrow">Also completed</span>
          <h2 className="et-h2 et-measure-tight">
            Two more projects worth describing
          </h2>
          <p className="et-lead et-measure">
            We do not have photography cleared for these two yet, but the work
            is worth explaining.
          </p>

          <div
            className="et-grid et-grid-2"
            style={{ marginTop: 'var(--et-space-8)' }}
          >
            {TEXT_ONLY_PROJECTS.map((project) => (
              <article key={project.name} className="et-card">
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
