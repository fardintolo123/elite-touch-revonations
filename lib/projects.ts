/**
 * Photographed projects.
 *
 * PROVENANCE: 30 photographs supplied by the owner in a `Gallery/` folder on
 * 2026-08-19, organised into five named, suburb-identified projects, each with
 * a written description. 23 are used here.
 *
 * This CLOSES the long-standing blocker in DECISIONS.md O-4 / D-39 — that
 * "neither the owner nor the repo knows which suburb or project any individual
 * photo belongs to". These photos arrived already attributed, so unlike the
 * earlier 33 they CAN carry a suburb.
 *
 * ⚠️ D-36 / PROJECT_CONTEXT.md §4.9 — ALT TEXT RULES, and they are not optional:
 *   - Alt text describes THE PHOTOGRAPH. Not the page topic, not the target
 *     keyword, not the marketing description of the project.
 *   - Every `alt` below was written after actually looking at the image.
 *   - Where the owner's written description disagreed with the photograph, the
 *     PHOTOGRAPH wins. (Example: the Hornsby description says "a black
 *     countertop"; the photos clearly show a WHITE stone top on a black gloss
 *     cabinet. The alt text says what is there.)
 *   - Nothing here is labelled "before" or "after" — no matched pairs were
 *     supplied, and inventing one would breach D-06.
 *
 * `blurb` is the owner's own description, lightly trimmed. `blurb` is marketing
 * copy; `alt` is a factual description. Do not swap their jobs.
 */

export type ProjectImage = {
  /** Public asset URL. Never a filesystem path (D-36 step 8). */
  src: string
  /** Describes the photograph itself. See the rules above. */
  alt: string
  width: number
  height: number
}

export type Project = {
  slug: string
  /** Suburb as the owner supplied it. */
  suburb: string
  name: string
  /** Which of the four services this job was. */
  service: string
  blurb: string
  images: readonly ProjectImage[]
}

const DIR = '/images/projects'

export const projects: readonly Project[] = [
  {
    slug: 'artarmon-bathroom',
    suburb: 'Artarmon',
    name: 'Artarmon bathroom renovation',
    service: 'Bathroom renovation',
    blurb:
      'Brushed gold fixtures paired with warm, sandy-toned tiles for a luxurious but inviting feel. A freestanding bath creates a serene focal point, and a wall-hung vanity keeps the floor clear and the room feeling open.',
    images: [
      {
        src: `${DIR}/artarmon-bathroom/full-room-shower-toilet.webp`,
        alt: 'Bathroom finished in sandy beige stone-look tiles, with a walk-in shower behind a gold-trimmed glass screen, a wall-hung toilet with a gold flush plate, and three timber floating shelves set into a white tiled recess.',
        width: 1348,
        height: 995,
      },
      {
        src: `${DIR}/artarmon-bathroom/freestanding-bath-window.webp`,
        alt: 'White freestanding oval bath beneath a long horizontal window, with a gold wall-mounted bath spout, beige stone-look floor and wall tiles, and a wall-hung toilet with timber shelves to the right.',
        width: 1349,
        height: 996,
      },
      {
        src: `${DIR}/artarmon-bathroom/vanity-round-mirror.webp`,
        alt: 'Dark teal wall-hung vanity with two drawers and long gold handles, a white round vessel basin, gold wall-mounted mixer, and a large round gold-framed mirror above.',
        width: 1341,
        height: 997,
      },
      {
        src: `${DIR}/artarmon-bathroom/basin-gold-tapware.webp`,
        alt: 'Overhead view of a white round vessel basin on a white benchtop, with a gold wall-mounted spout and mixer and a gold pop-up waste, against sandy beige tiles.',
        width: 1342,
        height: 974,
      },
      {
        src: `${DIR}/artarmon-bathroom/timber-shelves-niche.webp`,
        alt: 'Three staggered solid timber floating shelves mounted in a white-tiled recess, with a white textured pineapple-shaped vase on the lowest shelf.',
        width: 1331,
        height: 993,
      },
      {
        src: `${DIR}/artarmon-bathroom/shower-rail-handheld.webp`,
        alt: 'Gold shower rail with a handheld shower head and hose mounted on pale stone-look tiles, with a gold wall mixer and a tiled niche to the left.',
        width: 656,
        height: 1002,
      },
    ],
  },
  {
    slug: 'castle-hill-bathroom',
    suburb: 'Castle Hill',
    name: 'Castle Hill bathroom renovation',
    service: 'Bathroom renovation',
    blurb:
      'A bright, modern family bathroom in soft neutral tones and natural textures. Light wood, soft greys and crisp whites with brushed nickel tapware, large-format tiles to open the space up, and a frameless glass shower.',
    images: [
      {
        src: `${DIR}/castle-hill-bathroom/double-vanity-led-mirror.webp`,
        alt: 'Light oak wall-hung double vanity with a white stone top, two round white vessel basins, brushed nickel wall-mounted mixers, and a wide LED backlit mirror above, against large-format grey stone-look tiles.',
        width: 1127,
        height: 750,
      },
      {
        src: `${DIR}/castle-hill-bathroom/shower-toilet-heated-rail.webp`,
        alt: 'Frameless glass shower enclosure with a rain head and handheld rail, beside a close-coupled white toilet and a stainless steel ladder-style heated towel rail, all against large-format grey stone-look tiles.',
        width: 1129,
        height: 751,
      },
      {
        src: `${DIR}/castle-hill-bathroom/shower-rain-head.webp`,
        alt: 'Shower area with a brushed nickel rain head on a riser rail with a handheld shower, a frameless glass screen, and an obscured-glass window with two amber bottles on the sill.',
        width: 1127,
        height: 748,
      },
      {
        src: `${DIR}/castle-hill-bathroom/toilet-heated-towel-rail.webp`,
        alt: 'White close-coupled toilet viewed past the edge of a frameless glass shower screen, with a stainless steel ladder heated towel rail on the wall and a light oak vanity with a round basin in the foreground.',
        width: 1127,
        height: 748,
      },
      {
        src: `${DIR}/castle-hill-bathroom/basin-nickel-tapware.webp`,
        alt: 'Angled close view of two round white vessel basins on a white benchtop, with brushed nickel wall-mounted spouts and mixers and an LED backlit mirror reflecting a heated towel rail.',
        width: 1130,
        height: 751,
      },
      {
        src: `${DIR}/castle-hill-bathroom/basin-detail.webp`,
        alt: 'Close-up of a round white vessel basin on a white benchtop with a brushed nickel wall-mounted spout and mixer against speckled stone-look tiles.',
        width: 493,
        height: 747,
      },
    ],
  },
  {
    slug: 'hornsby-bathroom',
    suburb: 'Hornsby',
    name: 'Hornsby bathroom renovation',
    service: 'Bathroom renovation',
    blurb:
      'A bold, timeless black-and-white scheme. Crisp marble-look walls and deep black fixtures create a striking contrast, while a frameless shower and wall-hung vanity keep the room uncluttered with plenty of hidden storage.',
    images: [
      {
        src: `${DIR}/hornsby-bathroom/vanity-marble-storage-tower.webp`,
        alt: 'Bathroom with white marble-look large-format tiles and grey veining, a black gloss wall-hung vanity with a white stone top and two white rectangular vessel basins, matte black wall mixers, an LED backlit mirror, a tall black gloss storage tower, and black towel rails.',
        width: 1126,
        height: 748,
      },
      {
        src: `${DIR}/hornsby-bathroom/shower-bath-lit-niche.webp`,
        alt: 'Walk-in shower behind a black-framed glass screen with a black rain head and handheld shower, an LED-lit horizontal niche in the marble-look tiling, and an inset bath beneath a window looking onto trees and a timber fence.',
        width: 1125,
        height: 749,
      },
      {
        src: `${DIR}/hornsby-bathroom/twin-basins-led-mirror.webp`,
        alt: 'Two white rectangular vessel basins on a white stone top with matte black wall-mounted mixers, an LED backlit mirror above reflecting a window and greenery, and a black gloss cabinet to the right.',
        width: 1258,
        height: 745,
      },
      {
        src: `${DIR}/hornsby-bathroom/basin-black-tapware.webp`,
        alt: 'Close-up of a white rectangular vessel basin with a black pop-up waste and a matte black wall-mounted spout and mixer, against white marble-look tiling.',
        width: 1128,
        height: 745,
      },
    ],
  },
  {
    slug: 'hornsby-ensuite',
    suburb: 'Hornsby',
    name: 'Hornsby ensuite renovation',
    service: 'Ensuite renovation',
    blurb:
      'The ensuite to the same home, carrying the black-and-white design through so both rooms read as one scheme. A frameless shower and a wall-hung vanity keep a small footprint feeling open.',
    images: [
      {
        src: `${DIR}/hornsby-ensuite/vanity-window-greenery.webp`,
        alt: 'Ensuite with white marble-look tiling, a black gloss wall-hung vanity with a white top and two white vessel basins, matte black tapware, an LED backlit mirror, three black towel rails on the left wall, and a corner window looking onto dense green foliage.',
        width: 1125,
        height: 748,
      },
      {
        src: `${DIR}/hornsby-ensuite/towel-rails-shower.webp`,
        alt: 'Three black towel rails mounted on white marble-look tiling beside a frameless glass shower with a black rain head, handheld shower and black wall mixer.',
        width: 1119,
        height: 743,
      },
    ],
  },
  {
    slug: 'randwick-bathroom',
    suburb: 'Randwick',
    name: 'Randwick bathroom renovation',
    service: 'Bathroom renovation',
    blurb:
      'A stylish family bathroom in a neutral colour scheme, with matte black fittings for a contemporary edge and a custom angled shower screen as a distinctive design feature. The wall-hung vanity keeps the room open while still giving everyday storage.',
    images: [
      {
        src: `${DIR}/randwick-bathroom/shower-vanity-round-mirror.webp`,
        alt: 'Bathroom in warm grey stone-look tiles with an angled corner shower enclosed by black-framed glass, a black rain head and handheld shower, a timber-look wall-hung vanity with a white basin and black mixer, and a round LED backlit mirror.',
        width: 1130,
        height: 749,
      },
      {
        src: `${DIR}/randwick-bathroom/freestanding-bath-vanity.webp`,
        alt: 'White freestanding bath with a matte black wall-mounted spout beneath an obscured-glass window, next to a timber-look wall-hung vanity with a white basin, black tap and a round LED backlit mirror.',
        width: 1128,
        height: 750,
      },
      {
        src: `${DIR}/randwick-bathroom/shower-black-rail-niche.webp`,
        alt: 'Shower with a matte black square rain head and handheld shower on a riser rail, a black wall mixer, and a black-trimmed recessed niche holding two pale bottles, against warm grey stone-look tiles.',
        width: 497,
        height: 749,
      },
      {
        src: `${DIR}/randwick-bathroom/basin-black-tap-detail.webp`,
        alt: 'Close-up of a matte black basin mixer on a white rectangular basin, with a lit white candle beside it and the lower edge of a round mirror above.',
        width: 496,
        height: 750,
      },
    ],
  },
]

export function projectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug)
}

/** One representative image per project, for grids and index pages. */
export function projectCover(project: Project) {
  return project.images[0]
}
