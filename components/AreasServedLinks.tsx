import Link from 'next/link'
import { listableSuburbs, publishedRegions } from '@/lib/locations'

export function AreasServedLinks({
  title = 'Bathroom renovations by area',
  intro = 'These area pages show where we have real photographed work and a page worth publishing.',
  band = 'canvas',
  excludeSlug,
}: {
  title?: string
  intro?: string
  band?: 'canvas' | 'surface'
  excludeSlug?: string
}) {
  const regions = publishedRegions().filter(
    (region) => region.slug !== excludeSlug,
  )

  if (regions.length === 0) return null

  return (
    <section className={`et-section et-band-${band}`}>
      <div className="et-container et-stack">
        <span className="et-eyebrow">Areas we serve</span>
        <h2 className="et-h2 et-measure-tight">{title}</h2>
        <p className="et-lead et-measure">{intro}</p>

        <div
          className="et-grid et-grid-3"
          style={{ marginTop: 'var(--et-space-8)' }}
        >
          {regions.map((region) => (
            <Link
              key={region.slug}
              href={`${region.hubUrl}/`}
              className="et-card et-card-link"
            >
              <h3 className="et-h4">{region.name}</h3>
              <p
                className="et-body-sm"
                style={{
                  marginTop: 'var(--et-space-3)',
                  color: 'var(--et-text-secondary)',
                }}
              >
                {listableSuburbs(region).length} suburbs served
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
