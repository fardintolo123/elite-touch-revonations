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
 *
 * SECOND BATCH (2026-08-25): 6 more projects — Balmain, Gladesville, Little
 * Bay, Hunters Hill, The Rocks, Artarmon (bathroom + ensuite) — added from a
 * separate "Projects Before & After (1)" folder, each with its own written
 * Project Info document and a genuine matched before/after photo pair
 * (consent confirmed by the user 2026-08-25). Full intake triage:
 * plans/2026-08-25-new-project-photos-intake.md. Three projects from that
 * same folder were NOT added — see PROJECT_CONTEXT.md K14 for why
 * (unconfirmed location, and two standalone-laundry jobs outside the
 * confirmed service scope). The `before.webp` in each of these six IS
 * labelled as the pre-renovation state, because the source folder supplied
 * genuine matched pairs — unlike the first batch above, where no pairing was
 * evidenced (D-06).
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
      'Brushed gold taps and warm, sandy tiles give the room a rich, easy feel. A freestanding bath sits at the centre, calm and simple, and a wall-hung vanity keeps the floor clear and the room open.',
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
      'A bright, modern family bathroom in soft, neutral tones with real wood and stone textures. Light wood, soft grey and crisp white pair with brushed nickel taps. Large tiles open up the space, with a frameless glass shower.',
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
      'A bold, timeless black-and-white look. Crisp marble-style walls and deep black fittings make a sharp contrast. A frameless shower and wall-hung vanity keep the room neat, with lots of hidden storage.',
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
      "This ensuite continues the same home's black-and-white look, so both rooms feel like one. A frameless shower and a wall-hung vanity keep the small room feeling open.",
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
      'A stylish family bathroom in soft, neutral tones, with matte black fittings for a modern look. A custom angled shower screen is the standout feature. The wall-hung vanity keeps the room open, with daily storage.',
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
  {
    slug: 'balmain-bathroom',
    suburb: 'Balmain',
    name: 'Balmain bathroom renovation',
    service: 'Bathroom renovation',
    blurb:
      'A concrete-look bathroom with warm, timber-look floors for contrast. A custom vanity and a matching tall cabinet keep things tidy, and a freestanding bath anchors the room.',
    images: [
      {
        src: `${DIR}/balmain-bathroom/vanity-bath-window.webp`,
        alt: 'Bathroom with grey concrete-look wall tiles and timber-look floor tiles, a dark timber wall-hung vanity with a white top and chrome tap, a wall-hung toilet, and the foot of a white built-in bath in the foreground.',
        width: 1180,
        height: 680,
      },
      {
        src: `${DIR}/balmain-bathroom/vanity-storage-cabinet.webp`,
        alt: 'Dark timber tall storage cabinet beside a matching wall-hung vanity with a white top and chrome tap, a wall-hung toilet, and a window set into grey concrete-look wall tiles.',
        width: 1180,
        height: 680,
      },
      {
        src: `${DIR}/balmain-bathroom/freestanding-bath-towel-rail.webp`,
        alt: 'White built-in bath below a window, with a chrome wall-mounted mixer, grey concrete-look tiles, timber-look floor, and a ladder-style towel rail holding two dark grey towels.',
        width: 1180,
        height: 680,
      },
      {
        src: `${DIR}/balmain-bathroom/before.webp`,
        alt: "Black-and-white photograph of the bathroom before renovation, showing textured cream wall tiles, dark patterned floor tiles, a built-in bath with two chrome taps, and a white vanity unit beside the toilet.",
        width: 873,
        height: 508,
      },
    ],
  },
  {
    slug: 'gladesville-bathroom',
    suburb: 'Gladesville',
    name: 'Gladesville bathroom renovation',
    service: 'Bathroom renovation',
    blurb:
      'A crisp white bathroom in classic subway tiles. A frameless glass shower and a floating vanity keep the floor clear and the room bright.',
    images: [
      {
        src: `${DIR}/gladesville-bathroom/full-room-toilet-tub-vanity.webp`,
        alt: 'White bathroom with subway-tile walls, a frameless glass shower screen, a wall-hung toilet, a built-in bath below a window with patterned blinds, and the edge of a white vanity with a chrome tap in the foreground.',
        width: 1180,
        height: 680,
      },
      {
        src: `${DIR}/gladesville-bathroom/shower-niche-detail.webp`,
        alt: 'Corner of a frameless glass shower with a chrome rail shower and handheld head, a recessed tiled niche holding a dark bottle, and white subway tile walls.',
        width: 1180,
        height: 680,
      },
      {
        src: `${DIR}/gladesville-bathroom/tub-vanity-window-plant.webp`,
        alt: 'White built-in bath below a window with patterned blinds, a potted plant with red flowers on the tiled ledge, and the edge of a white vanity with a chrome tap.',
        width: 1180,
        height: 680,
      },
      {
        src: `${DIR}/gladesville-bathroom/tub-vanity-mirror.webp`,
        alt: 'White built-in bath and a white vanity with a chrome tap, reflected in a wall mirror, with white subway tile walls and a window with patterned blinds.',
        width: 1180,
        height: 680,
      },
      {
        src: `${DIR}/gladesville-bathroom/before.webp`,
        alt: 'Black-and-white photograph of the bathroom before renovation, showing small dotted-pattern wall tiles with a black trim border, black floor tiles, a glass shower screen, and a wall-hung toilet.',
        width: 887,
        height: 508,
      },
    ],
  },
  {
    slug: 'little-bay-bathroom',
    suburb: 'Little Bay',
    name: 'Little Bay bathroom renovation',
    service: 'Bathroom renovation',
    blurb:
      'A bright white bathroom with a bold turquoise basin and a freestanding bath. Timber shutters and a frameless shower keep the room feeling open.',
    images: [
      {
        src: `${DIR}/little-bay-bathroom/shower-vanity-tub-wide.webp`,
        alt: 'White bathroom with large-format tiles, a frameless glass shower with a rain head, a floating vanity with a turquoise vessel basin, and a freestanding bath below timber plantation shutters.',
        width: 1180,
        height: 680,
      },
      {
        src: `${DIR}/little-bay-bathroom/vanity-blue-basin-shower.webp`,
        alt: 'Floating white vanity with a turquoise vessel basin and a chrome wall-mounted tap, folded blue towels on the open shelf below, beside a frameless glass shower with a tiled niche.',
        width: 1180,
        height: 680,
      },
      {
        src: `${DIR}/little-bay-bathroom/freestanding-tub-towel-rail.webp`,
        alt: 'White freestanding bath below timber plantation shutters, with a ladder-style heated towel rail holding a teal towel on the tiled wall beside it.',
        width: 1180,
        height: 680,
      },
      {
        src: `${DIR}/little-bay-bathroom/shower-niche-bottles.webp`,
        alt: 'Recessed tiled shower niche with a patterned grey feature tile, holding two turquoise pump-bottle toiletries.',
        width: 1180,
        height: 680,
      },
      {
        src: `${DIR}/little-bay-bathroom/blue-basin-tap-detail.webp`,
        alt: 'Close-up of a turquoise glass vessel basin with a chrome wall-mounted spout, a white orchid and a shell-shaped dish on the vanity beside it.',
        width: 1180,
        height: 680,
      },
      {
        src: `${DIR}/little-bay-bathroom/shower-vanity-mirror-wide.webp`,
        alt: 'Frameless glass shower with a rain head and tiled niche, beside a wide mirrored cabinet, a floating vanity with a turquoise vessel basin, and timber plantation shutters reflected in the mirror.',
        width: 1180,
        height: 680,
      },
      {
        src: `${DIR}/little-bay-bathroom/vanity-toilet-doorway.webp`,
        alt: 'Floating white vanity with a turquoise vessel basin, a close-coupled toilet beside a woven storage basket, a wall-mounted heated towel rail, and an open door leading to an adjoining bedroom.',
        width: 1180,
        height: 680,
      },
      {
        src: `${DIR}/little-bay-bathroom/before.webp`,
        alt: 'Black-and-white photograph of the original vanity before renovation, cluttered with toiletries and a tray on a curved laminate benchtop, with an oval mirror above.',
        width: 874,
        height: 601,
      },
    ],
  },
  {
    slug: 'hunters-hill-bathroom',
    suburb: 'Hunters Hill',
    name: 'Hunters Hill bathroom renovation',
    service: 'Bathroom renovation',
    blurb:
      'Full-height marble-look tiles, a double vanity and a freestanding bath beneath timber shutters. Matte black fittings throughout give it a sharp, modern finish.',
    images: [
      {
        src: `${DIR}/hunters-hill-bathroom/freestanding-bath-shutters.webp`,
        alt: 'White freestanding bath beneath timber plantation shutters looking onto greenery, with full-height white marble-look wall tiles, a matte black ladder towel rail, and the edge of a frameless glass shower.',
        width: 1180,
        height: 680,
      },
      {
        src: `${DIR}/hunters-hill-bathroom/double-vanity-marble.webp`,
        alt: 'Double vanity with two rectangular basins on a white stone top, matte black wall-mounted mixers, a wide mirrored cabinet, and full-height white marble-look wall tiles.',
        width: 1180,
        height: 680,
      },
      {
        src: `${DIR}/hunters-hill-bathroom/tapware-detail.webp`,
        alt: 'Close-up of a matte black bath spout and mixer on white marble-look tiling, beside a potted rubber plant.',
        width: 1180,
        height: 680,
      },
      {
        src: `${DIR}/hunters-hill-bathroom/vanity-shutters-shower-wide.webp`,
        alt: 'Double vanity with matte black tapware and a round LED mirror reflecting a frameless glass shower, beside a freestanding bath below timber plantation shutters looking onto greenery.',
        width: 1180,
        height: 680,
      },
      {
        src: `${DIR}/hunters-hill-bathroom/shower-head-detail.webp`,
        alt: 'Close-up of a matte black loop-handle handheld shower head on a rail, mounted on a frameless glass shower screen.',
        width: 1180,
        height: 680,
      },
      {
        src: `${DIR}/hunters-hill-bathroom/before.webp`,
        alt: 'Black-and-white photograph of the bathroom before renovation, showing a dated built-in bath with two chrome taps and a tiled surround, viewed through a window with venetian blinds.',
        width: 876,
        height: 602,
      },
    ],
  },
  {
    slug: 'the-rocks-bathroom',
    suburb: 'The Rocks',
    name: 'The Rocks heritage bathroom renovation',
    service: 'Bathroom renovation',
    blurb:
      'A bathroom in a heritage terrace, built around an original leadlight window. A freestanding bath, patterned floor tiles and a frameless shower bring a modern finish, but the house still feels like itself.',
    images: [
      {
        src: `${DIR}/the-rocks-bathroom/shower-window-tub-wide.webp`,
        alt: 'Bathroom with a frameless glass shower and black-and-white patterned floor tiles, an original leadlight window with a floral motif, a colourful portrait artwork on the white tiled wall, and a white freestanding bath with a matte black spout.',
        width: 1180,
        height: 680,
      },
      {
        src: `${DIR}/the-rocks-bathroom/tub-vanity-black-door.webp`,
        alt: 'White freestanding bath with a matte black wall-mounted spout, a colourful portrait artwork above, a round white vessel basin on a black wall-hung vanity, and a black timber sliding barn door, all on black-and-white patterned floor tiles.',
        width: 1180,
        height: 680,
      },
      {
        src: `${DIR}/the-rocks-bathroom/shower-handheld-detail.webp`,
        alt: 'Close-up of a matte black square rain head and handheld shower on a riser rail, mounted in a glass-walled shower.',
        width: 1180,
        height: 680,
      },
      {
        src: `${DIR}/the-rocks-bathroom/before.webp`,
        alt: 'Black-and-white photograph of the bathroom before renovation, showing a chrome-framed shower screen and the same leadlight window with a floral motif above a pedestal vanity.',
        width: 872,
        height: 515,
      },
    ],
  },
  {
    slug: 'artarmon-bathroom-ensuite',
    suburb: 'Artarmon',
    name: 'Artarmon bathroom and ensuite renovation',
    service: 'Ensuite renovation',
    blurb:
      'A bathroom and ensuite done together for one clear, modern look. Charcoal stone-look tiles, a round LED mirror and warm terracotta towels give the double vanity and frameless showers their own style.',
    images: [
      {
        src: `${DIR}/artarmon-bathroom-ensuite/double-vanity-corner-window.webp`,
        alt: 'Bathroom with grey stone-look tiles, a double vanity with two basins and matte black tapware, a wall-hung toilet in a corner window nook, a terracotta towel on a heated rail, and a frameless glass shower.',
        width: 1180,
        height: 680,
      },
      {
        src: `${DIR}/artarmon-bathroom-ensuite/ensuite-vanity-mirror-shower.webp`,
        alt: 'Ensuite with a single vanity, a round mirror, chrome tapware, a wall-hung toilet behind a frameless glass shower screen, and a small window with a potted plant on the sill.',
        width: 1180,
        height: 680,
      },
      {
        src: `${DIR}/artarmon-bathroom-ensuite/round-mirror-vanity-detail.webp`,
        alt: 'Round LED backlit mirror above a dark vanity with a potted plant, reflecting a doorway, set against charcoal stone-look tiles.',
        width: 1180,
        height: 680,
      },
      {
        src: `${DIR}/artarmon-bathroom-ensuite/shower-niche-detail.webp`,
        alt: 'Chrome rail shower with a handheld head in a frameless glass shower, beside a recessed tiled niche holding two terracotta bottles.',
        width: 1180,
        height: 680,
      },
      {
        src: `${DIR}/artarmon-bathroom-ensuite/vanity-taps-detail.webp`,
        alt: 'Close-up of a chrome basin tap on a dark vanity, with a terracotta towel, a reed diffuser and a potted plant beside a backlit mirror glowing warm light.',
        width: 1180,
        height: 680,
      },
      {
        src: `${DIR}/artarmon-bathroom-ensuite/before.webp`,
        alt: 'Black-and-white photograph of the bathroom before renovation, showing a corner shower enclosure, a wall-hung toilet beneath a window, and a laminate vanity with a mirrored cabinet.',
        width: 867,
        height: 511,
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
