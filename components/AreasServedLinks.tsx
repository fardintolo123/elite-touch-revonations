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
        <h2 className="et-h2 et-measure-tight">{title}</h2>
        <p className="et-lead et-measure">{intro}</p>

        <ul className="et-area-list">
          {regions.map((region) => (
            <li key={region.slug} className="et-area-list-item">
              <Link
                href={`${region.hubUrl}/`}
                className="et-area-list-region"
              >
                {region.name}
              </Link>
              <div className="et-area-list-detail">
                <p className="et-body-sm">
                  {listableSuburbs(region).length} suburbs served
                </p>
                <p className="et-body-sm">
                  Includes {listNames(featuredSuburbs(region))}.
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
