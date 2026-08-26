/**
 * Readability checker — Flesch Reading Ease per page.
 *
 * WHY THIS EXISTS
 * docs/CONTENT_QUALITY_CHECKLIST.md §2 sets a target (Flesch Reading Ease ≥ 60)
 * but had no repeatable way to check it, so drift was invisible (GitHub issue
 * #9 — a third-party SEO tool measured /packages/ at 51.4). This closes that
 * gap the same way scripts/verify-redirects.mjs closed the redirect one.
 *
 * WHAT IT MEASURES
 * Only the text inside `<main id="main">…</main>` — header/footer nav chrome
 * is shared boilerplate, not the "body copy" the checklist means. Script and
 * style blocks (including the JSON-LD block) are stripped. Image `alt` text
 * is never counted, because it lives in an attribute, not element content.
 *
 * METHOD
 * Standard Flesch Reading Ease: 206.835 - 1.015*(words/sentences) -
 * 84.6*(syllables/words). Syllables use the common vowel-group heuristic
 * (silent-e aware). Every tag boundary is treated as a soft sentence break
 * before stripping tags, so short elements (headings, list items, badges)
 * are not run together into one artificially long "sentence" — that would
 * silently inflate the score.
 *
 * This is an approximation, like every Flesch tool including the one that
 * produced the issue-#9 screenshot. Use it for before/after comparison on
 * THIS site, not as a certified score.
 *
 * READS PRERENDERED HTML FROM DISK, NOT A LIVE SERVER.
 * `next build` writes every static/SSG route's prerendered HTML straight to
 * `.next/server/app/**.html` — reading that file is equivalent to fetching
 * the route, without needing `next start` up at all. That matters in THIS
 * repo specifically: several agent sessions can be working this tree at
 * once (CLAUDE.md's Git Workflow warning), and `.next/` is a shared build
 * directory — a `next start` process left running gets its served output
 * corrupted the moment another session rebuilds underneath it (silent
 * mid-air corruption, not a crash). Reading the file is a near-instant,
 * single filesystem read right after your own build, which shrinks that
 * collision window to almost nothing. Pass a URL explicitly to fall back to
 * fetching a live server instead.
 *
 * Usage:
 *   npm run build
 *   node scripts/check-readability.mjs                   # reads .next/server/app/**.html
 *   node scripts/check-readability.mjs http://localhost:3210   # fetch a live server instead
 */

import { readFile } from 'node:fs/promises'

const arg = process.argv[2]
const BASE = arg && arg.startsWith('http') ? arg : null
const TARGET = 60

/**
 * Every route with real body copy, and the `.next/server/app` file it
 * prerenders to. Transcribed from the build output (`npm run build`), not
 * imported from route source — if you add a page, service, project or
 * published region, add its route here too.
 */
const ROUTES = [
  '/',
  '/about-us/',
  '/contact-us/',
  '/packages/',
  '/services/',
  '/services/bathroom-renovations/',
  '/services/ensuite-bathroom-renovations/',
  '/services/laundry-renovations/',
  '/services/powder-room-renovations/',
  '/services/bathroom-renovations/hills-district/',
  '/services/bathroom-renovations/eastern-suburbs/',
  '/services/bathroom-renovations/north-shore/',
  '/gallery/',
  '/gallery/artarmon-bathroom/',
  '/gallery/castle-hill-bathroom/',
  '/gallery/hornsby-bathroom/',
  '/gallery/hornsby-ensuite/',
  '/gallery/randwick-bathroom/',
  '/gallery/balmain-bathroom/',
  '/gallery/gladesville-bathroom/',
  '/gallery/little-bay-bathroom/',
  '/gallery/hunters-hill-bathroom/',
  '/gallery/the-rocks-bathroom/',
  '/gallery/artarmon-bathroom-ensuite/',
]

function routeToStaticFile(route) {
  const trimmed = route.replace(/^\/|\/$/g, '')
  return trimmed === '' ? 'index.html' : `${trimmed}.html`
}

const ENTITIES = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
  rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“',
  mdash: '—', ndash: '–', hellip: '…',
}

function decodeEntities(text) {
  return text
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&([a-zA-Z]+);/g, (match, name) => ENTITIES[name] ?? match)
}

function extractMain(html) {
  const start = html.indexOf('<main')
  const end = html.indexOf('</main>')
  if (start === -1 || end === -1) return null
  const openTagEnd = html.indexOf('>', start)
  return html.slice(openTagEnd + 1, end)
}

function htmlToSentenceBlob(mainHtml) {
  let html = mainHtml
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    // Soft break before every tag so adjacent block elements don't fuse
    // into one run-on "sentence" once tags are stripped.
    .replace(/</g, '\n<')

  const text = decodeEntities(html.replace(/<[^>]+>/g, ''))

  const lines = text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => /[a-zA-Z0-9]/.test(line))

  return lines
    .map((line) => (/[.!?]["')]?$/.test(line) ? line : `${line}.`))
    .join(' ')
}

function countSyllables(word) {
  const w = word.toLowerCase().replace(/[^a-z]/g, '')
  if (w.length === 0) return 1
  if (w.length <= 3) return 1
  const trimmed = w.replace(/(?:[^aeiouy]es|ed|[^laeiouy]e)$/, '').replace(/^y/, '')
  const matches = trimmed.match(/[aeiouy]{1,2}/g)
  return matches ? matches.length : 1
}

function fleschReadingEase(blob) {
  const words = blob.match(/[A-Za-z0-9](?:[A-Za-z0-9'-]*[A-Za-z0-9])?/g) ?? []
  const sentences = blob.split(/(?<=[.!?])\s+/).filter((s) => /[a-zA-Z0-9]/.test(s))
  const syllables = words.reduce((sum, word) => sum + countSyllables(word), 0)

  const wordCount = Math.max(words.length, 1)
  const sentenceCount = Math.max(sentences.length, 1)

  const score =
    206.835 - 1.015 * (wordCount / sentenceCount) - 84.6 * (syllables / wordCount)

  return {
    score: Math.round(score * 10) / 10,
    words: words.length,
    sentences: sentences.length,
    syllablesPerWord: Math.round((syllables / wordCount) * 100) / 100,
    wordsPerSentence: Math.round((wordCount / sentenceCount) * 10) / 10,
  }
}

async function checkRoute(route) {
  let html
  if (BASE) {
    const res = await fetch(`${BASE}${route}`)
    if (!res.ok) {
      return { route, error: `HTTP ${res.status}` }
    }
    html = await res.text()
  } else {
    const filePath = new URL(
      `../.next/server/app/${routeToStaticFile(route)}`,
      import.meta.url,
    )
    try {
      html = await readFile(filePath, 'utf8')
    } catch {
      return { route, error: `no build output at ${filePath.pathname} — run npm run build first` }
    }
  }

  const mainHtml = extractMain(html)
  if (mainHtml === null) {
    return { route, error: 'no <main id="main"> found' }
  }
  const blob = htmlToSentenceBlob(mainHtml)
  return { route, ...fleschReadingEase(blob) }
}

async function main() {
  console.log(
    BASE
      ? `Checking ${ROUTES.length} routes against ${BASE}\n`
      : `Checking ${ROUTES.length} routes against .next/server/app/**.html (run npm run build first)\n`,
  )

  const results = []
  for (const route of ROUTES) {
    // Sequential: this is a local dev/CI check, not a load test.
    // eslint-disable-next-line no-await-in-loop
    results.push(await checkRoute(route))
  }

  const colWidth = Math.max(...ROUTES.map((r) => r.length)) + 2
  let failures = 0

  for (const result of results) {
    if (result.error) {
      failures += 1
      console.log(`${result.route.padEnd(colWidth)} ERROR: ${result.error}`)
      continue
    }
    const pass = result.score >= TARGET
    if (!pass) failures += 1
    const flag = pass ? 'PASS' : 'FAIL'
    console.log(
      `${result.route.padEnd(colWidth)} ${flag}  Flesch ${result.score.toFixed(1)}` +
        `  (${result.words}w, ${result.wordsPerSentence}w/sentence, ${result.syllablesPerWord}syl/word)`,
    )
  }

  console.log(
    `\n${results.length - failures}/${results.length} pages ≥ ${TARGET} (docs/CONTENT_QUALITY_CHECKLIST.md §2)`,
  )

  if (failures > 0) process.exitCode = 1
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
