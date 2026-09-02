import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { businessInfo } from '@/lib/businessInfo'
import { projects, projectBySlug, projectMetaDescription } from '@/lib/projects'
import { ContactSection } from '@/components/ContactSection'
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema'
import {
  LOCATION_PARENT_SLUG,
  publishedRegionForSuburb,
} from '@/lib/locations'

/**
 * One page per photographed project, driven by `lib/projects.ts`.
 *
 * `dynamicParams = false` — a slug not in the data 404s rather than rendering
 * (PROJECT_CONTEXT.md §4.4). Adding a record here publishes a page.
 *
 * ⚠️ Alt text comes from the data file and describes the PHOTOGRAPH. Do not
 * template it from the suburb or the page title — that is exactly the drift
 * that put false claims on the sibling project's pages (§4.9).
 */

export const dynamicParams = false

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = projectBySlug(slug)

  if (!project) {
    return { title: 'Not found', robots: { index: false, follow: false } }
  }

  /**
   * `blurb` is the visible lead paragraph and runs up to ~220 chars, which
   * truncates in SERPs. The meta/OG description uses the shorter
   * `metaDescription` (falling back to a trimmed blurb) instead — issue #39.
   * `twitter:description` auto-fills from `openGraph.description` in Next's
   * metadata post-processing, so it follows the same value.
   */
  const description = projectMetaDescription(project)

  return {
    title: project.name,
    description,
    alternates: { canonical: `/gallery/${project.slug}/` },
    openGraph: {
      title: project.name,
      description,
      images: [project.images[0].src],
    },
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = projectBySlug(slug)

  if (!project) notFound()

  const others = projects.filter((item) => item.slug !== project.slug)
  const projectRegion = publishedRegionForSuburb(project.suburb)

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: `${businessInfo.siteUrl}/` },
          { name: 'Our Work', url: `${businessInfo.siteUrl}/gallery/` },
          {
            name: project.name,
            url: `${businessInfo.siteUrl}/gallery/${project.slug}/`,
          },
        ]}
      />
      <section className="et-hero">
        <div className="et-container et-stack">
          <p className="et-body-sm">
            <Link href="/gallery/" className="et-link">
              ← All projects
            </Link>
          </p>
          <span className="et-eyebrow">
            {project.suburb} · {project.service}
          </span>
          <p className="et-caption">Completed by {project.completedByYear}</p>
          <h1 className="et-h1 et-measure-tight">{project.name}</h1>
          <p className="et-lead et-measure">{project.blurb}</p>
        </div>
      </section>

      {project.story ? (
        <section className="et-section et-band-surface">
          <div className="et-container et-stack">
            <span className="et-eyebrow">About this project</span>
            <h2 className="et-h2 et-measure-tight">What changed on this job</h2>
            <p className="et-lead et-measure">{project.story}</p>
          </div>
        </section>
      ) : null}

      <section className="et-section et-band-canvas">
        <div className="et-container">
          <div className="et-photo-grid">
            {project.images.map((image, index) => (
              <figure
                key={image.src}
                className={
                  index === 0 ? 'et-photo et-photo-wide' : 'et-photo'
                }
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes={
                    index === 0
                      ? '(min-width: 1024px) 100vw, 100vw'
                      : '(min-width: 1024px) 50vw, 100vw'
                  }
                  /* First image is the LCP candidate. The rest stay lazy —
                     eager MARKUP, lazy DOWNLOADS. */
                  priority={index === 0}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="et-section et-band-surface">
        <div className="et-container et-stack">
          <span className="et-eyebrow">What every job includes</span>
          <h2 className="et-h2 et-measure-tight">
            The same standard on every job.
          </h2>
          <ul className="et-checklist" style={{ marginTop: 'var(--et-space-6)' }}>
            <li className="et-body-sm">
              Waterproofing to {businessInfo.standards.waterproofingDated} —
              primer plus two coats, certificate included
            </li>
            <li className="et-body-sm">
              Fixed-scope written quote after a free on-site measure
            </li>
            <li className="et-body-sm">
              {businessInfo.workmanshipWarrantyYears}-year workmanship warranty
            </li>
            <li className="et-body-sm">
              NSW Builder Licence {businessInfo.builderLicence}
            </li>
          </ul>
          <p className="et-body-sm">
            <Link href="/packages/" className="et-link">
              See the packages and what each one includes
            </Link>
          </p>
        </div>
      </section>

      <section className="et-section et-band-canvas">
        <div className="et-container et-stack">
          <span className="et-eyebrow">Related pages</span>
          <h2 className="et-h2 et-measure-tight">
            See more bathroom renovation work by service and area
          </h2>

          <div
            className="et-grid et-grid-2"
            style={{ marginTop: 'var(--et-space-8)' }}
          >
            <Link
              href={`/services/${LOCATION_PARENT_SLUG}/`}
              className="et-card et-card-link"
            >
              <h3 className="et-h4">Bathroom renovations</h3>
              <p
                className="et-body-sm"
                style={{
                  marginTop: 'var(--et-space-3)',
                  color: 'var(--et-text-secondary)',
                }}
              >
                See how we strip out, waterproof, tile and fit off bathrooms
                across Sydney.
              </p>
            </Link>

            {projectRegion && (
              <Link
                href={`${projectRegion.hubUrl}/`}
                className="et-card et-card-link"
              >
                <h3 className="et-h4">{projectRegion.name}</h3>
                <p
                  className="et-body-sm"
                  style={{
                    marginTop: 'var(--et-space-3)',
                    color: 'var(--et-text-secondary)',
                  }}
                >
                  See bathroom renovation projects and service coverage for
                  this area.
                </p>
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="et-section et-band-surface">
        <div className="et-container et-stack">
          <span className="et-eyebrow">More projects</span>
          <h2 className="et-h2 et-measure-tight">Other work of ours</h2>
          <div
            className="et-grid et-grid-4"
            style={{ marginTop: 'var(--et-space-8)' }}
          >
            {others.map((item) => (
              <Link
                key={item.slug}
                href={`/gallery/${item.slug}/`}
                className="et-card et-card-link et-media-card"
              >
                <span className="et-media-frame">
                  <Image
                    src={item.images[0].src}
                    alt={item.images[0].alt}
                    width={item.images[0].width}
                    height={item.images[0].height}
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    loading="lazy"
                  />
                </span>
                <span className="et-badge-suburb">{item.suburb}</span>
                {/* Short room-type label, not the full project name — the
                    suburb badge above already carries the location, and
                    repeating "renovation" ten times on this grid alone was
                    the single biggest drag on this page's readability score
                    (docs/CONTENT_QUALITY_CHECKLIST.md §2). The full name is
                    still the page title and H1 one click away. */}
                <h3 className="et-h4" style={{ marginTop: 'var(--et-space-3)' }}>
                  {item.service.replace(/ renovation$/i, '')}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  )
}
