import Link from 'next/link'
import type { Region, Suburb } from '@/lib/locations'
import { listableSuburbs, publishedRegions } from '@/lib/locations'

const FEATURED_SUBURB_SLUGS: Record<string, string[]> = {
  'hills-district': [
    'castle-hill',
    'baulkham-hills',
    'kellyville',
    'rouse-hill',
    'cherrybrook',
  ],
  'inner-west': [
    'balmain',
    'five-dock',
    'leichhardt',
    'marrickville',
    'drummoyne',
  ],
  'north-western-sydney': [
    'gladesville',
    'hunters-hill',
    'ryde',
    'north-ryde',
    'epping',
  ],
  'eastern-suburbs': [
    'randwick',
    'rose-bay',
    'double-bay',
    'paddington',
    'bondi',
  ],
  'north-shore': [
    'hornsby',
    'artarmon',
    'pymble',
    'chatswood',
    'castlecrag',
    'st-ives',
    'wahroonga',
  ],
}

function featuredSuburbs(region: Region): Suburb[] {
  const suburbs = listableSuburbs(region)
  const bySlug = new Map(suburbs.map((suburb) => [suburb.slug, suburb]))
  const preferred = (FEATURED_SUBURB_SLUGS[region.slug] ?? [])
    .map((slug) => bySlug.get(slug))
    .filter((suburb): suburb is Suburb => Boolean(suburb))

  return preferred.length > 0 ? preferred : suburbs.slice(0, 6)
}

function listNames(suburbs: Suburb[]): string {
  const names = suburbs.map((suburb) => suburb.name)

  if (names.length <= 1) return names.join('')

  return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`
}

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
              <p
                className="et-body-sm"
                style={{
                  marginTop: 'var(--et-space-3)',
                  color: 'var(--et-text-secondary)',
                }}
              >
                Includes {listNames(featuredSuburbs(region))}.
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
