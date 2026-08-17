/**
 * Redirect verification harness.
 *
 * WHY THIS TABLE IS TYPED OUT AGAIN INSTEAD OF IMPORTED FROM next.config.ts
 * ------------------------------------------------------------------------
 * If this script imported the same array the config uses, it would only prove
 * the config equals itself. It would pass just as happily with a typo in it.
 *
 * The table below is transcribed INDEPENDENTLY from the migration brief. A
 * mismatch between the two is exactly the failure this is here to catch.
 *
 * It also follows every redirect to its destination and asserts the
 * destination returns 200 — because a 301 pointing at a 404 destroys the
 * equity it was supposed to preserve, and looks fine in the config.
 *
 * Usage:
 *   npm run build && npx next start -p 3210
 *   node scripts/verify-redirects.mjs            # defaults to :3210
 *   node scripts/verify-redirects.mjs http://localhost:3000
 */

const BASE = process.argv[2] ?? 'http://localhost:3210'

/** Live URLs that must keep answering 200 at the same address. */
const KEEP = [
  '/',
  '/services/',
  '/about-us/',
  '/gallery/',
  '/packages/',
]

/** [source, expected destination] — every one must be a literal 301. */
const REDIRECTS = [
  ['/packages-deals/', '/packages/'],
  ['/calendly/', '/contact-us/'],
  ['/artarmon-bathroom-renovation/', '/services/bathroom-renovations/'],
  ['/staging/', '/'],
  ['/staging/about-us/', '/about-us/'],
  ['/staging/services/', '/services/'],
  ['/staging/contact-us/', '/contact-us/'],
  ['/staging/services/laundry-renovations/', '/services/laundry-renovations/'],
  [
    '/staging/services/ensuite-bathroom-renovations/',
    '/services/ensuite-bathroom-renovations/',
  ],
  [
    '/staging/services/powder-room-renovations/',
    '/services/powder-room-renovations/',
  ],
  [
    '/staging/services/bathroom-renovations/',
    '/services/bathroom-renovations/',
  ],
  ['/staging/bathroom-photo-gallery/', '/gallery/'],
  ['/staging/bathroom-renovation-pricing/', '/packages/'],
  ['/staging/projects/', '/gallery/'],
  ['/staging/reviews/', '/about-us/'],
  [
    '/staging/bathroom-ensuite-renovation-in-artarmon/',
    '/services/ensuite-bathroom-renovations/',
  ],
  [
    '/staging/luxury-bathroom-renovation-in-hunters-hill/',
    '/services/bathroom-renovations/',
  ],
  [
    '/staging/heritage-house-bathroom-renovation-in-the-rocks/',
    '/services/bathroom-renovations/',
  ],
]

/** Must return a literal 410 Gone. */
const GONE = ['/elementor-hf/header/', '/elementor-hf/footer/']

/** New pages that did not exist on WordPress but must resolve. */
const NEW_PAGES = [
  '/contact-us/',
  '/services/bathroom-renovations/',
  '/services/ensuite-bathroom-renovations/',
  '/services/laundry-renovations/',
  '/services/powder-room-renovations/',
  '/sitemap.xml',
  '/robots.txt',
]

let pass = 0
let fail = 0
const failures = []

function report(ok, label, detail) {
  if (ok) {
    pass += 1
    console.log(`  PASS  ${label}`)
  } else {
    fail += 1
    failures.push(`${label} — ${detail}`)
    console.log(`  FAIL  ${label}\n          ${detail}`)
  }
}

async function head(path) {
  const response = await fetch(`${BASE}${path}`, { redirect: 'manual' })
  return {
    status: response.status,
    location: response.headers.get('location'),
  }
}

/** Normalise an absolute Location header down to a path for comparison. */
function toPath(location) {
  if (!location) return null
  try {
    return new URL(location, BASE).pathname
  } catch {
    return location
  }
}

console.log(`\nVerifying against ${BASE}\n`)

console.log('KEEP — must answer 200 at the same address')
for (const path of KEEP) {
  const { status } = await head(path)
  report(status === 200, `200  ${path}`, `got ${status}`)
}

console.log('\n301 — permanent moves (literal 301, not 308)')
for (const [source, expected] of REDIRECTS) {
  const { status, location } = await head(source)
  const actual = toPath(location)

  if (status !== 301) {
    report(false, `301  ${source}`, `got status ${status} (expected 301)`)
    continue
  }
  if (actual !== expected) {
    report(false, `301  ${source}`, `went to ${actual} (expected ${expected})`)
    continue
  }

  // A 301 into a 404 is worse than no redirect. Follow it.
  const destination = await head(expected)
  if (destination.status !== 200) {
    report(
      false,
      `301  ${source}`,
      `destination ${expected} returned ${destination.status}, not 200`
    )
    continue
  }

  report(true, `301  ${source} → ${expected}`)
}

console.log('\n410 — permanently gone')
for (const path of GONE) {
  const { status } = await head(path)
  report(status === 410, `410  ${path}`, `got ${status}`)
}

console.log('\nNEW — pages that must resolve')
for (const path of NEW_PAGES) {
  const { status } = await head(path)
  report(status === 200, `200  ${path}`, `got ${status}`)
}

console.log('\n404 — unknown URLs must not be soft 404s')
for (const path of ['/this-page-does-not-exist/', '/services/kitchen-renovations/']) {
  const { status } = await head(path)
  report(status === 404, `404  ${path}`, `got ${status}`)
}

console.log(`\n${'─'.repeat(60)}`)
console.log(`${pass} passed, ${fail} failed`)
if (failures.length > 0) {
  console.log('\nFailures:')
  for (const failure of failures) console.log(`  · ${failure}`)
}
console.log('')

process.exit(fail === 0 ? 0 : 1)
