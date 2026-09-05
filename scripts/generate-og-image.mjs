import { mkdirSync } from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

/**
 * Builds the sitewide default Open Graph / Twitter share image (issue #20 /
 * tech-audit H-3). Run once at authoring time and commit the output — this is
 * a static asset, not generated per-request, so it costs nothing at runtime
 * (`docs/PERFORMANCE_BUDGET.md` — crawler-fetched weight is still weight, but
 * a single cached 1200x630 file is a one-off, not a per-visit cost).
 *
 * Background: the Artarmon bathroom + ensuite project photo, already one of
 * the three `businessInfo.schema.images` (lib/businessInfo.ts) — a real,
 * consented, already-approved photo (D-36/D-83), not a new asset.
 *
 * ⚠️ Font: this does NOT use Jost, DESIGN.md §3's one typeface. sharp's
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
 * sans available that way. This is a narrow exception: a server-rendered
 * static image never seen next to real site chrome, not a rendered page —
 * DESIGN.md's typography rule governs the site itself, not this one binary
 * asset. Re-verify this whole font situation if this script is ever run on
 * a non-Windows build machine.
 *
 * Usage: node scripts/generate-og-image.mjs
 */

const root = process.cwd()
const WIDTH = 1200
const HEIGHT = 630
const FONT_FAMILY = 'Segoe UI, Arial, sans-serif'

const backgroundPath = path.join(
  root,
  'public/images/projects/artarmon-bathroom-ensuite/double-vanity-corner-window.webp',
)
const markPath = path.join(root, 'public/brand/etr-mark-light.webp')
const outPath = path.join(root, 'public/og/default.jpg')

const MARGIN = 90
const MARK_SIZE = 72
const MARK_TOP = 398
const BRAND_TEXT_Y = MARK_TOP + MARK_SIZE / 2 + 8 // optically centered on the mark
const HEADLINE_Y = 514
const SUBLINE_Y = 558
const RULE_Y = 580

const svg = `
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
  <text x="${MARGIN}" y="${HEADLINE_Y}" class="headline" font-size="56" fill="#FFFFFF">Sydney Bathroom Renovations</text>

  <!-- subline: real, already-published facts only (D-06) -->
  <text x="${MARGIN}" y="${SUBLINE_Y}" class="sub" font-size="24" fill="#F1F1F2">Free on-site measure  ·  Fixed-scope written quotes  ·  AS 3740 waterproofing</text>

  <!-- accent rule, matches the brand magenta -->
  <rect x="${MARGIN}" y="${RULE_Y}" width="72" height="5" rx="2.5" fill="#DD0880" />
</svg>
`

async function main() {
  mkdirSync(path.dirname(outPath), { recursive: true })

  const background = await sharp(backgroundPath)
    .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'attention' })
    .toBuffer()

  const mark = await sharp(markPath)
    .resize(MARK_SIZE, MARK_SIZE, { fit: 'inside' })
    .toBuffer()

  await sharp(background)
    .composite([
      { input: Buffer.from(svg), top: 0, left: 0 },
      { input: mark, top: MARK_TOP, left: MARGIN },
    ])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(outPath)

  console.log(`Wrote ${outPath}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
