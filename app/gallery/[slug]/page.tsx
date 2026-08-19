import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { businessInfo } from '@/lib/businessInfo'
import { projects, projectBySlug } from '@/lib/projects'

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

  return {
    title: project.name,
    description: project.blurb,
    alternates: { canonical: `/gallery/${project.slug}/` },
    openGraph: {
      title: project.name,
      description: project.blurb,
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

  return (
    <>
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
          <h1 className="et-h1 et-measure-tight">{project.name}</h1>
          <p className="et-lead et-measure">{project.blurb}</p>
        </div>
      </section>

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
          <span className="et-eyebrow">What every renovation includes</span>
          <h2 className="et-h2 et-measure-tight">
            The same standard under every one of these.
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
                <h3 className="et-h4" style={{ marginTop: 'var(--et-space-3)' }}>
                  {item.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="et-section et-band-surface">
        <div className="et-container">
          <div className="et-card et-stack" style={{ textAlign: 'center' }}>
            <h2 className="et-h2">Planning something similar?</h2>
            <p className="et-lead et-measure" style={{ marginInline: 'auto' }}>
              Book a free on-site measure anywhere in Sydney and we will price
              it properly, in writing.
            </p>
            <div className="et-hero-cta" style={{ justifyContent: 'center' }}>
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
          </div>
        </div>
      </section>
    </>
  )
}
