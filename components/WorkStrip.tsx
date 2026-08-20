import Image from 'next/image'
import Link from 'next/link'
import { projects } from '@/lib/projects'

/**
 * A row of real project photographs, reusable on any page.
 *
 * ⚠️ WHY EVERY IMAGE CARRIES ITS SUBURB.
 * These are presented as "work we have done", never as an illustration of the
 * page's topic. That distinction matters: we have photographs of bathrooms and
 * one ensuite, and **nothing** of a powder room or a laundry. Dropping a
 * bathroom photo onto the powder-room service page as decoration would make an
 * implicit claim the photograph cannot support — the same class of error as
 * alt text drifting to the page topic (PROJECT_CONTEXT.md §4.9, D-06).
 *
 * Labelling each card with its actual suburb and project name keeps the claim
 * true wherever the strip appears.
 *
 * `alt` comes from `lib/projects.ts` and describes the photograph itself.
 */

export function WorkStrip({
  title = 'Recent work',
  intro = 'Our own photographs of finished bathrooms across Sydney — not stock images.',
  limit = 3,
  /** Show these project slugs first, if present. */
  prefer = [] as string[],
  band = 'canvas' as 'canvas' | 'surface',
}) {
  const ordered = [
    ...prefer
      .map((slug) => projects.find((p) => p.slug === slug))
      .filter((p): p is (typeof projects)[number] => Boolean(p)),
    ...projects.filter((p) => !prefer.includes(p.slug)),
  ]
  const shown = ordered.slice(0, limit)

  return (
    <section className={`et-section et-band-${band}`}>
      <div className="et-container et-stack">
        <span className="et-eyebrow">Our work</span>
        <h2 className="et-h2 et-measure-tight">{title}</h2>
        <p className="et-lead et-measure">{intro}</p>

        <div
          className="et-grid et-grid-3"
          style={{ marginTop: 'var(--et-space-8)' }}
        >
          {shown.map((project) => (
            <Link
              key={project.slug}
              href={`/gallery/${project.slug}/`}
              className="et-card et-card-link et-media-card"
            >
              <span className="et-media-frame">
                <Image
                  src={project.images[0].src}
                  alt={project.images[0].alt}
                  width={project.images[0].width}
                  height={project.images[0].height}
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  loading="lazy"
                />
              </span>
              <span className="et-badge-suburb">{project.suburb}</span>
              <h3 className="et-h4" style={{ marginTop: 'var(--et-space-3)' }}>
                {project.name}
              </h3>
            </Link>
          ))}
        </div>

        <p className="et-body-sm" style={{ marginTop: 'var(--et-space-6)' }}>
          <Link href="/gallery/" className="et-link">
            See all our projects
          </Link>
        </p>
      </div>
    </section>
  )
}
