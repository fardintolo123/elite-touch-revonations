import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { businessInfo } from '@/lib/businessInfo'
import { buildMetadata } from '@/lib/metadata'
import { projects, projectBySlug, projectMetaDescription } from '@/lib/projects'
import { ContactSection } from '@/components/ContactSection'
import { SchemaGraph } from '@/components/SchemaGraph'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import {
  LOCATION_PARENT_SLUG,
  publishedRegionForSuburb,
  publishedSuburbForName,
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

  const leadImage = project.images[0]
  const publishedSuburb = publishedSuburbForName(project.suburb)

  return buildMetadata({
    path: `/gallery/${project.slug}/`,
    // `metaTitle` still handles explicit overrides. Published Tier-1 projects
    // otherwise get a portfolio-specific title so their corresponding service
    // pages can own the commercial bathroom-renovation intent. The H1 and
    // schema keep the factual project name.
    title:
      project.metaTitle ??
      (publishedSuburb
        ? `${project.suburb} Bathroom Project`
        : project.name),
    description,
    // These pages are de-facto case studies — real photos, real suburb, real
    // scope — so `article` is a truer type than the sitewide `website`
    // default (issue #38 / tech-audit L-6). The matching `ImageObject` +
    // `Article` JSON-LD (L-5) is still tracked in #24.
    type: 'article',
    // Real width/height now included (issue #20 / H-3) — was previously a
    // bare URL with no size, forcing a small `twitter:card`. Still the raw
    // project asset (~3:2), not a dedicated 1200x630 crop; that refinement
    // is noted as follow-up scope on #20, not done here.
    images: [
      {
        url: leadImage.src,
        width: leadImage.width,
        height: leadImage.height,
        alt: leadImage.alt,
      },
    ],
  })
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
  const leadImage = project.images[0]
  const beforeImage = project.images.find((image) =>
    image.src.endsWith('/before.webp')
  )
  const remainingImages = project.images.filter(
    (image) => image !== leadImage && image !== beforeImage
  )
  const projectRegion = publishedRegionForSuburb(project.suburb)
  const projectSuburb = publishedSuburbForName(project.suburb)
  const serviceHref = projectSuburb
    ? `/services/${LOCATION_PARENT_SLUG}/${projectSuburb.slug}/`
    : `/services/${LOCATION_PARENT_SLUG}/`
  const projectFacts = [
    ...(project.priceRange
      ? [{ label: 'Project budget', value: project.priceRange }]
      : []),
    ...(project.weeksOnSite
      ? [
          {
            label: 'Time on site',
            value: `${project.weeksOnSite} week${project.weeksOnSite === 1 ? '' : 's'}`,
          },
        ]
      : []),
  ]

  /* One array, two consumers: the visible trail and the BreadcrumbList (D-180). */
  const breadcrumbs = [
    { name: 'Home', url: `${businessInfo.siteUrl}/` },
    { name: 'Our Work', url: `${businessInfo.siteUrl}/gallery/` },
    {
      name: project.name,
      url: `${businessInfo.siteUrl}/gallery/${project.slug}/`,
    },
  ] as const

  return (
    <>
      <SchemaGraph
        path={`/gallery/${project.slug}/`}
        name={project.name}
        description={projectMetaDescription(project)}
        breadcrumbs={breadcrumbs}
        project={project}
      />
      <section className="et-hero">
        <div className="et-container">
          <Breadcrumbs items={breadcrumbs} />
          <div className="et-hero-grid">
            {beforeImage ? (
              <div
                className="et-grid et-grid-2"
                style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}
              >
                <figure className="et-stack-tight" style={{ margin: 0 }}>
                  <div className="et-hero-media">
                    <Image
                      src={leadImage.src}
                      alt={leadImage.alt}
                      width={leadImage.width}
                      height={leadImage.height}
                      sizes="(min-width: 1360px) 326px, (min-width: 1024px) 25vw, 48vw"
                      priority
                    />
                  </div>
                  <figcaption className="et-caption">Finished room</figcaption>
                </figure>
                <figure className="et-stack-tight" style={{ margin: 0 }}>
                  <div className="et-hero-media">
                    <Image
                      src={beforeImage.src}
                      alt={beforeImage.alt}
                      width={beforeImage.width}
                      height={beforeImage.height}
                      sizes="(min-width: 1360px) 326px, (min-width: 1024px) 25vw, 48vw"
                    />
                  </div>
                  <figcaption className="et-caption">
                    Before renovation. Supplied in black and white and
                    photographed from a different position; this is not a
                    matched-angle comparison.
                  </figcaption>
                </figure>
              </div>
            ) : (
              <div className="et-hero-media">
                <Image
                  src={leadImage.src}
                  alt={leadImage.alt}
                  width={leadImage.width}
                  height={leadImage.height}
                  sizes="(min-width: 1360px) 652px, (min-width: 1024px) 50vw, 100vw"
                  priority
                />
              </div>
            )}
            <div className="et-stack">
              {/* The "← All projects" link that used to sit here is now the
                  "Our Work" step of the breadcrumb trail above (D-180). Two
                  ways back to the same index is the duplication D-174 forbids,
                  and it also freed a scored <p> from the readability gate. */}
              <span className="et-eyebrow">
                {project.suburb} · {project.service}
              </span>
              <p className="et-caption">Completed by {project.completedByYear}</p>
              <h1 className="et-h1 et-measure-tight">{project.name}</h1>
              <p className="et-lead et-measure">{project.blurb}</p>
              {projectFacts.length > 0 ? (
                <div className="et-stack-tight">
                  <ul className="et-facts" aria-label="Project facts">
                    {projectFacts.map((fact) => (
                      <li key={fact.label} className="et-fact">
                        <strong>{fact.label}</strong> {fact.value}
                      </li>
                    ))}
                  </ul>
                  {project.priceRange ? (
                    <p
                      className="et-body-sm et-measure"
                      style={{ color: 'var(--et-text-secondary)' }}
                    >
                      This was the budget for this completed project. Your
                      price is firm after a free on-site measure and is set
                      out in a fixed-scope written quote.
                    </p>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {project.story ? (
        <section className="et-section et-band-surface">
          <div className="et-container et-stack">
            <h2 className="et-h2 et-measure-tight">Scope and key details</h2>
            <p className="et-lead et-measure">{project.story}</p>
          </div>
        </section>
      ) : null}

      <section className="et-section et-band-canvas">
        <div className="et-container">
          <div className="et-photo-grid">
            {remainingImages.map((image) => (
              <figure
                key={image.src}
                className="et-photo"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  /* Measured rendered width live (Playwright, issue #27):
                     wide (index 0, LCP): 390→350, 768→704, 1024+→1200
                     (caps at the container max, doesn't stay 100vw).
                     grid (index 1+): 390→350, 768→340, 1024+→588. */
                  sizes="(min-width: 768px) 588px, 100vw"
                  loading="lazy"
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="et-section et-band-surface">
        <div className="et-container et-stack">
          <h2 className="et-h2 et-measure-tight">
            What goes into each renovation.
          </h2>
          <ul className="et-checklist" style={{ marginTop: 'var(--et-space-6)' }}>
            <li className="et-body-sm">
              Waterproofing to {businessInfo.standards.waterproofingDated} -
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
          <h2 className="et-h2 et-measure-tight">
            Planning a bathroom renovation in {project.suburb}?
          </h2>
          <p className="et-lead et-measure">
            If you are planning a similar job, start with the service page,
            then compare the package scope before booking a free on-site
            measure.
          </p>

          <div
            className="et-grid et-grid-3"
            style={{ marginTop: 'var(--et-space-8)' }}
          >
            <Link
              href={serviceHref}
              className="et-card et-card-link"
            >
              <h3 className="et-h4">
                {projectSuburb
                  ? `Bathroom renovations in ${projectSuburb.name}`
                  : 'Bathroom renovations'}
              </h3>
              <p
                className="et-body-sm"
                style={{
                  marginTop: 'var(--et-space-3)',
                  color: 'var(--et-text-secondary)',
                }}
              >
                {projectSuburb
                  ? `See the local service, process, package guidance and how to book a free on-site measure in ${projectSuburb.name}.`
                  : 'See how we strip out, waterproof, tile and fit off bathrooms across Sydney.'}
              </p>
            </Link>

            <Link href="/packages/" className="et-card et-card-link">
              <h3 className="et-h4">Packages and pricing</h3>
              <p
                className="et-body-sm"
                style={{
                  marginTop: 'var(--et-space-3)',
                  color: 'var(--et-text-secondary)',
                }}
              >
                Compare Basic, Standard and Premium package scopes before the
                on-site measure.
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
          <h2 className="et-h2 et-measure-tight">More project photos</h2>
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
