import { mkdirSync } from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

/**
 * Builds every Open Graph / Twitter share image the site uses (issue #20 /
 * tech-audit H-3, plus the packages + 3-hub overrides added as its
 * documented follow-up). Run once at authoring time and commit the output —
 * these are static assets, not generated per-request, so they cost nothing
 * at runtime (`docs/PERFORMANCE_BUDGET.md` — `og:image`/`twitter:image` are
 * `<meta>` tags a visitor's browser never fetches; only crawlers building a
 * link preview request the file, out-of-band).
 *
 * Every background photo is an existing, already-approved, consented project
 * photo from `lib/projects.ts` (D-36/D-83) — no new photography. Region
 * images use a project actually located in that region (per
 * `service-areas.json`): Castle Hill -> Hills District, Randwick -> Eastern
 * Suburbs, Artarmon -> North Shore. The sitewide default uses the Artarmon
 * bathroom + ensuite photo (also one of `businessInfo.schema.images`); the
 * North Shore hub deliberately uses a DIFFERENT Artarmon project
 * (`artarmon-bathroom`, not `artarmon-bathroom-ensuite`) so the two images
 * are not identical.
 *
 * ⚠️ Font: none of these use Jost, DESIGN.md §3's one typeface. sharp's
 * bundled SVG renderer (librsvg -> Pango -> FreeType) has no working
 * `@font-face` support for embedding a custom font — confirmed by testing:
 * an embedded Jost (both the source WOFF2 and a decompressed static TTF
 * instance) rendered as either a generic fallback or full tofu/`.notdef`
 * boxes. A `FONTCONFIG_FILE` override that registers Jost as a system font
 * also produced tofu — it replaces sharp's bundled fontconfig defaults
 * wholesale rather than extending them. Generic family keywords
 * (`sans-serif`, `Helvetica`, `Roboto`, `Noto Sans`) all fell back to the
 * same broken placeholder too. Only *exact* Windows-installed family names
 * (`Segoe UI`, `Arial`, `Verdana`) resolved to real glyphs, because libvips
 * on Windows can read those directly from the OS font system, bypassing
 * fontconfig entirely. "Segoe UI" was chosen as the closest clean geometric
 * sans available that way. This is a narrow exception: server-rendered
 * static images never seen next to real site chrome, not a rendered page —
 * DESIGN.md's typography rule governs the site itself, not these binary
 * assets. Re-verify this whole font situation if this script is ever run on
 * a non-Windows build machine.
 *
 * Usage: node scripts/generate-og-image.mjs
 */

const root = process.cwd()
const WIDTH = 1200
const HEIGHT = 630
const FONT_FAMILY = 'Segoe UI, Arial, sans-serif'
const TRUST_LINE =
  'Free on-site measure  ·  Fixed-scope written quotes  ·  AS 3740 waterproofing'

const MARGIN = 90
const MARK_SIZE = 72
const MARK_TOP = 398
const BRAND_TEXT_Y = MARK_TOP + MARK_SIZE / 2 + 8 // optically centered on the mark
const HEADLINE_Y = 514
const SUBLINE_Y = 558
const RULE_Y = 580

const IMAGES = [
  {
    out: 'public/og/default.jpg',
    background:
      'public/images/projects/artarmon-bathroom-ensuite/double-vanity-corner-window.webp',
    headline: 'Sydney Bathroom Renovations',
    sub: TRUST_LINE,
  },
  {
    // Packages / pricing (`/packages/`). Sub reflects the page's own
    // published starting price and process facts (D-07/D-60) rather than
    // repeating the generic trust line.
    out: 'public/og/packages.jpg',
    background: 'public/images/projects/hunters-hill-bathroom/freestanding-bath-shutters.webp',
    headline: 'Bathroom Renovation Packages',
    sub: 'From $18,000  ·  Fixed-scope written quotes  ·  Sized to your bathroom',
  },
  {
    // Hills District hub. Castle Hill is a real Hills District suburb
    // (service-areas.json) with its own photographed project.
    out: 'public/og/hills-district.jpg',
    background: 'public/images/projects/castle-hill-bathroom/shower-toilet-heated-rail.webp',
    headline: 'Bathroom Renovations, Hills District',
    sub: TRUST_LINE,
  },
  {
    // Eastern Suburbs hub. Randwick is a real Eastern Suburbs suburb with
    // its own photographed project.
    out: 'public/og/eastern-suburbs.jpg',
    background: 'public/images/projects/randwick-bathroom/shower-vanity-round-mirror.webp',
    headline: 'Bathroom Renovations, Eastern Suburbs',
    sub: TRUST_LINE,
  },
  {
    // North Shore hub. Artarmon is a real North Shore suburb — uses the
    // OTHER Artarmon project (not the ensuite one on the sitewide default)
    // so the two images are not identical.
    out: 'public/og/north-shore.jpg',
    background: 'public/images/projects/artarmon-bathroom/full-room-shower-toilet.webp',
    headline: 'Bathroom Renovations, North Shore',
    sub: TRUST_LINE,
  },
]

const markPath = path.join(root, 'public/brand/etr-mark-light.webp')

function buildSvg({ headline, sub }) {
  return `
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      text { font-family: ${FONT_FAMILY}; }
      .brand { font-weight: 600; letter-spacing: 3px; }
      .headline { font-weight: 700; }
      .sub { font-weight: 400; }
    </style>
    <linearGradient id="scrim" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#141416" stop-opacity="0" />
      <stop offset="42%" stop-color="#141416" stop-opacity="0.35" />
      <stop offset="100%" stop-color="#141416" stop-opacity="0.88" />
    </linearGradient>
  </defs>

  <rect x="0" y="0" width="${WIDTH}" height="${HEIGHT}" fill="url(#scrim)" />

  <!-- brand name, set beside the composited mark -->
  <text x="${MARGIN + MARK_SIZE + 20}" y="${BRAND_TEXT_Y}" class="brand" font-size="24" fill="#FFFFFF">ELITE TOUCH RENOVATIONS</text>

  <!-- headline -->
  <text x="${MARGIN}" y="${HEADLINE_Y}" class="headline" font-size="48" fill="#FFFFFF">${headline}</text>

  <!-- subline: real, already-published facts only (D-06) -->
  <text x="${MARGIN}" y="${SUBLINE_Y}" class="sub" font-size="24" fill="#F1F1F2">${sub}</text>

  <!-- accent rule, matches the brand magenta -->
  <rect x="${MARGIN}" y="${RULE_Y}" width="72" height="5" rx="2.5" fill="#DD0880" />
</svg>
`
}

async function buildOne({ out, background, headline, sub }) {
  const outPath = path.join(root, out)
  mkdirSync(path.dirname(outPath), { recursive: true })

  const backgroundBuffer = await sharp(path.join(root, background))
    .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'attention' })
    .toBuffer()

  const mark = await sharp(markPath).resize(MARK_SIZE, MARK_SIZE, { fit: 'inside' }).toBuffer()

  await sharp(backgroundBuffer)
    .composite([
      { input: Buffer.from(buildSvg({ headline, sub })), top: 0, left: 0 },
      { input: mark, top: MARK_TOP, left: MARGIN },
    ])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(outPath)

  console.log(`Wrote ${outPath}`)
}

async function main() {
  for (const image of IMAGES) {
    await buildOne(image)
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
