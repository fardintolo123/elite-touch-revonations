// Failure-only health checks for the live site.
//
// Workflow: .github/workflows/health-checks.yml · runbook: docs/recurring-tasks.md · #117.
//
// Two production failures here were silent: /contact-us/ returned a Cloudflare challenge (#103) and
// the CSP refused every GA4 hit for months (#113). Each was fixed once and nothing watched for a
// repeat. This robot speaks only when something is wrong, and once more when it recovers.
//
//   node scripts/health-checks.mjs --checks daily --dry-run
//   node scripts/health-checks.mjs --checks all --force-fail sitemap --dry-run
//
// GET only, and only against URLs. Nothing is submitted anywhere, so no test data reaches production.
// The exit code stays 0 when checks fail: the open `health-alert` issue is the signal, and a red run
// on top of it would only duplicate the same news.
import { appendFileSync, readFileSync, writeFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = fileURLToPath(new URL('../', import.meta.url))
const LABEL = 'health-alert'
const RUN_MARKER = '<!-- health-check-run:v1 -->'
const RECOVERED_MARKER = '<!-- health-recovered:v1 -->'
const RATING_MAX_AGE_DAYS = 60
const CHALLENGE_MARKERS = ['cf-chl', 'Just a moment']
const TIMEOUT_MS = 20000
const URL_CONCURRENCY = 6

const CHECKS = [
  {
    id: 'sitemap',
    cadence: 'daily',
    label: 'Sitemap URLs',
    title: '[Health] Sitemap URLs failing',
    why: 'A sitemap URL that is not 200 is a page Google is told about but cannot read (#103).',
  },
  {
    id: 'contact-form',
    cadence: 'daily',
    label: 'Contact form',
    title: '[Health] Contact form failing',
    why: 'The enquiry form is the main lead path. It must render for every visitor (#103).',
  },
  {
    id: 'analytics-csp',
    cadence: 'weekly',
    label: 'Analytics CSP',
    title: '[Health] Analytics CSP failing',
    why: 'When the CSP refuses the GA4 collector, analytics records nothing and the loss is silent (#113, D-162).',
  },
  {
    id: 'email-obfuscation',
    cadence: 'weekly',
    label: 'Cloudflare email obfuscation',
    title: '[Health] Cloudflare email obfuscation failing',
    why: 'Cloudflare email obfuscation injects 404 links sitewide when it is switched back on (#103).',
  },
  {
    id: 'rating-age',
    cadence: 'weekly',
    label: 'Rating snapshot age',
    title: '[Health] Rating snapshot age failing',
    why: 'The Google rating is a published trust signal; a stale snapshot is a stale claim.',
    lowPriority: true,
  },
]

// ---------------------------------------------------------------- fetching

async function fetchOnce(url) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    return await fetch(url, {
      redirect: 'manual',
      signal: controller.signal,
      headers: { 'user-agent': 'EliteTouchRenovations-health-check/1.0' },
    })
  } finally {
    clearTimeout(timer)
  }
}

/** Follow redirects by hand so a loop is reported as a loop, not as an opaque fetch error. */
async function fetchPage(url, maxHops = 5) {
  const chain = []
  let current = url

  for (let hop = 0; hop <= maxHops; hop += 1) {
    if (chain.includes(current)) return { kind: 'redirect-loop', chain }
    chain.push(current)

    let response
    try {
      response = await fetchOnce(current)
    } catch (error) {
      return { kind: 'error', message: String(error.message || error), chain }
    }

    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get('location')
      if (!location) {
        return { kind: 'http', status: response.status, headers: response.headers, body: '', chain }
      }
      current = new URL(location, current).toString()
      continue
    }

    return {
      kind: 'http',
      status: response.status,
      headers: response.headers,
      body: await response.text(),
      finalUrl: current,
      chain,
    }
  }

  return { kind: 'too-many-redirects', chain }
}

function challenged(result) {
  return typeof result.body === 'string' && CHALLENGE_MARKERS.some((marker) => result.body.includes(marker))
}

function describe(result) {
  if (result.kind === 'redirect-loop') return `redirect loop: ${result.chain.join(' → ')}`
  if (result.kind === 'too-many-redirects') return `too many redirects: ${result.chain.join(' → ')}`
  if (result.kind === 'error') return `request failed: ${result.message}`
  if (result.kind === 'http') return `HTTP ${result.status}`
  return result.kind
}

async function mapPool(items, limit, run) {
  const results = new Array(items.length)
  let next = 0
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) {
      const index = next
      next += 1
      results[index] = await run(items[index], index)
    }
  })
  await Promise.all(workers)
  return results
}

export function sitemapUrls(xml) {
  return [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((match) => match[1])
}

export function connectSrc(csp) {
  const directive = csp
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.toLowerCase().startsWith('connect-src'))
  return directive ? directive.split(/\s+/).slice(1) : []
}

// ---------------------------------------------------------------- checks

async function checkSitemap({ base, maxUrls }) {
  const sitemap = await fetchPage(`${base}/sitemap.xml`)
  if (sitemap.kind !== 'http' || sitemap.status !== 200) {
    return { ok: false, evidence: `sitemap.xml did not return 200 (${describe(sitemap)})` }
  }

  let urls = sitemapUrls(sitemap.body)
  if (urls.length === 0) return { ok: false, evidence: 'sitemap.xml contained no <loc> entries' }
  if (maxUrls > 0) urls = urls.slice(0, maxUrls)

  const results = await mapPool(urls, URL_CONCURRENCY, async (url) => {
    const page = await fetchPage(url)
    if (page.kind !== 'http') return { url, problem: describe(page) }
    if (page.status !== 200) return { url, problem: `HTTP ${page.status}` }
    if (challenged(page)) return { url, problem: 'Cloudflare challenge' }
    return { url, problem: null }
  })

  const failures = results.filter((result) => result.problem !== null)
  if (failures.length === 0) {
    return { ok: true, evidence: `all ${urls.length} sitemap URLs returned 200 with no challenge` }
  }

  const shown = failures.slice(0, 10).map((failure) => `- ${failure.url} — ${failure.problem}`)
  const more = failures.length > shown.length ? `\n- …and ${failures.length - shown.length} more` : ''
  return {
    ok: false,
    evidence: `${failures.length} of ${urls.length} sitemap URLs failed:\n${shown.join('\n')}${more}`,
  }
}

async function checkContactForm({ base }) {
  const page = await fetchPage(`${base}/contact-us/`)
  if (page.kind !== 'http') return { ok: false, evidence: `contact page unreachable — ${describe(page)}` }
  if (page.status !== 200) return { ok: false, evidence: `contact page returned HTTP ${page.status}` }
  if (challenged(page)) return { ok: false, evidence: 'contact page served a Cloudflare challenge' }

  const missing = ['<form', 'name="company"'].filter((marker) => !page.body.includes(marker))
  if (missing.length > 0) {
    return { ok: false, evidence: `contact page is missing the enquiry form markers: ${missing.join(', ')}` }
  }
  return { ok: true, evidence: 'contact page returns 200 with the enquiry form rendered' }
}

async function checkAnalyticsCsp({ base }) {
  const page = await fetchPage(`${base}/`)
  if (page.kind !== 'http') return { ok: false, evidence: `homepage unreachable — ${describe(page)}` }
  if (page.status !== 200) return { ok: false, evidence: `homepage returned HTTP ${page.status}` }

  const csp = page.headers.get('content-security-policy') || ''
  if (!csp) return { ok: false, evidence: 'homepage sent no Content-Security-Policy header' }

  const origins = connectSrc(csp)
  const required = ['https://analytics.google.com', 'https://www.google.com']
  const missingOrigins = required.filter((origin) => !origins.includes(origin))
  const loader = page.body.includes('googletagmanager.com/gtm.js')
  const container = /GTM-[A-Z0-9]+/.test(page.body)

  const problems = []
  if (missingOrigins.length > 0) problems.push(`connect-src missing ${missingOrigins.join(' and ')}`)
  if (!loader) problems.push('GTM loader (googletagmanager.com/gtm.js) not in the homepage HTML')
  if (!container) problems.push('no GTM- container id in the homepage HTML')

  if (problems.length > 0) return { ok: false, evidence: problems.join('; ') }
  return { ok: true, evidence: 'connect-src allows GA4 and Google, and GTM loads' }
}

async function checkEmailObfuscation({ base }) {
  const page = await fetchPage(`${base}/`)
  if (page.kind !== 'http') return { ok: false, evidence: `homepage unreachable — ${describe(page)}` }
  if (page.status !== 200) return { ok: false, evidence: `homepage returned HTTP ${page.status}` }

  if (page.body.includes('/cdn-cgi/l/email-protection')) {
    return {
      ok: false,
      evidence: 'homepage HTML contains /cdn-cgi/l/email-protection — Cloudflare email obfuscation is back',
    }
  }
  return { ok: true, evidence: 'no Cloudflare email obfuscation in the homepage HTML' }
}

async function checkRatingAge({ now }) {
  const source = readFileSync(path.join(ROOT, 'lib/businessInfo.ts'), 'utf8')
  const match = source.match(/verifiedAt:\s*'(\d{4}-\d{2}-\d{2})'/)
  if (!match) return { ok: false, evidence: 'could not find `verifiedAt` in lib/businessInfo.ts' }

  const verifiedAt = match[1]
  const days = Math.floor((now.getTime() - Date.parse(`${verifiedAt}T00:00:00Z`)) / 86400000)
  if (Number.isNaN(days)) return { ok: false, evidence: `verifiedAt "${verifiedAt}" is not a valid date` }

  if (days >= RATING_MAX_AGE_DAYS) {
    return {
      ok: false,
      evidence: `rating snapshot was last live-checked ${verifiedAt}, ${days} days ago (threshold ${RATING_MAX_AGE_DAYS})`,
    }
  }
  return { ok: true, evidence: `rating snapshot checked ${verifiedAt}, ${days} days ago` }
}

// ---------------------------------------------------------------- deciding

/**
 * What one check should do, given the run result and the open alert for it.
 * Pure, so the recover and silent paths can be checked without touching GitHub.
 */
export function decide({ ok, openIssue, lastCommentHasRecovery }) {
  if (!ok) return openIssue ? 'comment' : 'create'
  if (!openIssue) return 'silent'
  return lastCommentHasRecovery ? 'silent' : 'recover'
}

export function issueBody(check, evidence, { forced, now }) {
  const lines = [
    RUN_MARKER,
    `**${check.label}** is failing against the live site.`,
    '',
    `Why this matters: ${check.why}`,
    '',
    'Evidence:',
    '',
    '```',
    evidence,
    '```',
    '',
    `Checked at ${now.toISOString()} by \`.github/workflows/health-checks.yml\` (#117).`,
  ]
  if (forced) {
    lines.push('', '> ⚠️ **Forced failure.** This run was told to fail the check, so this alert is a test, not a live fault.')
  }
  lines.push(
    '',
    'This robot comments again on each run while the check fails, and posts "recovered" once it passes.',
    'A person closes this issue. Runbook: `docs/recurring-tasks.md`.',
  )
  return lines.join('\n')
}

export function runBody(evidence, { forced, now }) {
  const lines = [RUN_MARKER, `Still failing at ${now.toISOString()}.`, '', '```', evidence, '```']
  if (forced) lines.push('', '⚠️ Forced failure requested by the dispatch input.')
  return lines.join('\n')
}

export function recoverBody(check, evidence, now) {
  return [
    RECOVERED_MARKER,
    `**${check.label}** passed at ${now.toISOString()}.`,
    '',
    '```',
    evidence,
    '```',
    '',
    'Recovered automatically. A person should close this issue.',
  ].join('\n')
}

// ---------------------------------------------------------------- GitHub

function gh(args) {
  return execFileSync('gh', args, { encoding: 'utf8' })
}

function openAlerts(repo) {
  return JSON.parse(
    gh(['issue', 'list', '--repo', repo, '--label', LABEL, '--state', 'open', '--limit', '100',
        '--json', 'number,title']),
  )
}

function lastCommentBody(repo, number) {
  const comments = JSON.parse(
    gh(['issue', 'view', String(number), '--repo', repo, '--json', 'comments']),
  ).comments
  return comments.length > 0 ? comments[comments.length - 1].body : ''
}

// ---------------------------------------------------------------- main

function parseArgs(argv) {
  const args = {
    base: 'https://www.elitetouchrenovations.au',
    checks: 'all',
    forceFail: [],
    dryRun: false,
    maxUrls: 0,
  }
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index]
    if (arg === '--dry-run') args.dryRun = true
    else if (arg === '--base') args.base = argv[++index].replace(/\/$/, '')
    else if (arg === '--checks') args.checks = argv[++index]
    else if (arg === '--force-fail') args.forceFail = argv[++index].split(',').map((value) => value.trim()).filter(Boolean)
    else if (arg === '--max-urls') args.maxUrls = Number(argv[++index])
    else if (arg === '--repo') args.repo = argv[++index]
    else throw new Error(`Unknown argument "${arg}"`)
  }
  return args
}

function summarise(line) {
  console.log(line)
  if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${line}\n`)
}

let tempCounter = 0
function writeTemp(name, content) {
  tempCounter += 1
  const file = path.join(process.env.RUNNER_TEMP || path.join(ROOT, '.tmp'), `${name}-${tempCounter}.md`)
  writeFileSync(file, content)
  return file
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const repo = args.repo || process.env.GITHUB_REPOSITORY
  const now = new Date()

  if (!['daily', 'weekly', 'all'].includes(args.checks)) {
    throw new Error(`--checks must be daily, weekly or all (got "${args.checks}")`)
  }

  const selected = CHECKS.filter((check) => args.checks === 'all' || check.cadence === args.checks)
  const forceAll = args.forceFail.includes('all')
  const unknown = args.forceFail.filter((id) => id !== 'all' && !CHECKS.some((check) => check.id === id))
  if (unknown.length > 0) throw new Error(`Unknown --force-fail id(s): ${unknown.join(', ')}`)

  if (!repo) throw new Error('No repository — pass --repo owner/name or set GITHUB_REPOSITORY')
  const alerts = openAlerts(repo)
  const failures = []

  for (const check of selected) {
    let result
    try {
      result = await runCheck(check, args, now)
    } catch (error) {
      result = { ok: false, evidence: `check crashed: ${error.message}` }
    }

    const forced = forceAll || args.forceFail.includes(check.id)
    if (forced) {
      result = { ok: false, evidence: `forced failure requested by dispatch\n(healthy result was: ${result.evidence})` }
    }

    const openIssue = alerts.find((issue) => issue.title === check.title) || null
    const lastCommentHasRecovery =
      openIssue !== null && lastCommentBody(repo, openIssue.number).includes(RECOVERED_MARKER)
    const action = decide({ ok: result.ok, openIssue, lastCommentHasRecovery })

    console.log(`${result.ok ? 'PASS' : 'FAIL'} ${check.id} — ${result.evidence.split('\n')[0]}`)
    summarise(`${result.ok ? '✅' : '❌'} ${check.label}: ${result.evidence.split('\n')[0]}`)
    if (!result.ok) failures.push(check.id)

    if (args.dryRun) {
      console.log(`  [dry-run] would ${action}${openIssue ? ` on #${openIssue.number}` : ''}`)
      continue
    }

    if (action === 'create') {
      const file = writeTemp(`health-${check.id}`, issueBody(check, result.evidence, { forced, now }))
      const url = gh(['issue', 'create', '--repo', repo, '--title', check.title, '--body-file', file,
        '--label', LABEL]).trim()
      summarise(`Opened ${url}`)
    } else if (action === 'comment') {
      const file = writeTemp(`health-${check.id}-run`, runBody(result.evidence, { forced, now }))
      gh(['issue', 'comment', String(openIssue.number), '--repo', repo, '--body-file', file])
      summarise(`Commented on #${openIssue.number}`)
    } else if (action === 'recover') {
      const file = writeTemp(`health-${check.id}-recovered`, recoverBody(check, result.evidence, now))
      gh(['issue', 'comment', String(openIssue.number), '--repo', repo, '--body-file', file])
      summarise(`Recovered — commented on #${openIssue.number}`)
    }
  }

  if (failures.length > 0) {
    summarise(`\n${failures.length} check(s) failing: ${failures.join(', ')}`)
  } else {
    summarise('\nAll selected checks passed.')
  }
}

function runCheck(check, args, now) {
  const context = { base: args.base, now, maxUrls: args.maxUrls }
  switch (check.id) {
    case 'sitemap': return checkSitemap(context)
    case 'contact-form': return checkContactForm(context)
    case 'analytics-csp': return checkAnalyticsCsp(context)
    case 'email-obfuscation': return checkEmailObfuscation(context)
    case 'rating-age': return checkRatingAge(context)
    default: throw new Error(`No implementation for check "${check.id}"`)
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(`FAILED: ${error.message}`)
    process.exitCode = 1
  })
}
