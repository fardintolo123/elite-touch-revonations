// Opens one dated maintenance issue per month and one per quarter.
//
// Workflow: .github/workflows/recurring-issues.yml · runbook: docs/recurring-tasks.md · #116.
//
// The body comes from .github/ISSUE_TEMPLATE/recurring-monthly.md or recurring-quarterly.md, so the
// checklist has one source. A period that already has an issue - open or closed - is never duplicated.
// If an older cycle issue is still open, this comments on it once so the backlog shows the missed
// cycle instead of hiding it.
//
// Dry run against the live repo (safe, creates nothing):
//   node scripts/recurring-cycle-issue.mjs --cycle monthly --dry-run
//   node scripts/recurring-cycle-issue.mjs --cycle quarterly --period 2027-Q1 --dry-run
import { execFileSync } from 'node:child_process'
import { appendFileSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = fileURLToPath(new URL('../', import.meta.url))
const MILESTONE = 'Recurring: maintenance cycles'
const LABEL = 'recurring'
const MISSED_MARKER = '<!-- missed-cycle:v1 -->'

const CYCLES = {
  monthly: {
    kind: '[Recurring] Monthly check',
    template: '.github/ISSUE_TEMPLATE/recurring-monthly.md',
    periodPattern: /^\d{4}-\d{2}$/,
  },
  quarterly: {
    kind: '[Recurring] Quarterly sweep',
    template: '.github/ISSUE_TEMPLATE/recurring-quarterly.md',
    periodPattern: /^\d{4}-Q[1-4]$/,
  },
}

const pad = (value) => String(value).padStart(2, '0')

/** Last month of the quarter, as a UTC date one month past its end. */
function dueMonthAfterQuarter(year, quarter) {
  const month = quarter * 3 + 1
  return month > 12 ? { year: year + 1, month: month - 12 } : { year, month }
}

/** When a period's issue stops being on time. Monthly: the 7th. Quarterly: the 5th after it ends. */
export function dueFor(cycle, period) {
  if (cycle === 'monthly') return `${period}-07`
  const [periodYear, quarterPart] = period.split('-Q')
  const { year, month } = dueMonthAfterQuarter(Number(periodYear), Number(quarterPart))
  return `${year}-${pad(month)}-05`
}

/**
 * Work out which cycle issue this run is about.
 * `auto` reads the UTC date the same way the crons do: the 1st is monthly, the 20th of the last
 * month of a quarter is quarterly. A date-based decision survives a delayed schedule run.
 */
export function computeCycle(cycle, now = new Date(), periodOverride = '') {
  const year = now.getUTCFullYear()
  const month = now.getUTCMonth() + 1
  const day = now.getUTCDate()

  let resolved = cycle
  if (resolved === 'auto') {
    const lastQuarterMonth = [3, 6, 9, 12].includes(month)
    resolved = lastQuarterMonth && day >= 20 ? 'quarterly' : 'monthly'
  }

  const spec = CYCLES[resolved]
  if (!spec) throw new Error(`Unknown cycle "${cycle}" — expected auto, monthly or quarterly`)

  let period
  if (periodOverride) {
    if (!spec.periodPattern.test(periodOverride)) {
      throw new Error(`Period "${periodOverride}" does not match ${resolved} (expected ${spec.periodPattern})`)
    }
    period = periodOverride
  } else if (resolved === 'monthly') {
    period = `${year}-${pad(month)}`
  } else {
    period = `${year}-Q${Math.ceil(month / 3)}`
  }

  return {
    cycle: resolved,
    kind: spec.kind,
    template: spec.template,
    period,
    title: `${spec.kind} — ${period}`,
    due: dueFor(resolved, period),
    today: `${year}-${pad(month)}-${pad(day)}`,
  }
}

/** Strip the YAML front matter an issue template carries, and fill its placeholders. */
export function renderBody(templateText, { period, today, due }) {
  const body = templateText
    .replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '')
    .replace(/\{\{PERIOD\}\}/g, period)
    .replace(/\{\{DATE\}\}/g, today)
    .replace(/\{\{DUE\}\}/g, due)
    .replace(/^\s*\n/, '')

  const leftover = body.match(/\{\{[A-Z]+\}\}/)
  if (leftover) throw new Error(`Template placeholder ${leftover[0]} was not filled`)

  return body
}

/** Period of an existing cycle issue, or null when the title is not one of ours. */
export function periodOf(title, kind) {
  const prefix = `${kind} — `
  return title.startsWith(prefix) ? title.slice(prefix.length) : null
}

/**
 * Decide what this run should do. Pure, so it can be checked without touching GitHub.
 * Returns { action: 'create' | 'skip', issuesToFlag, existing }.
 *
 * An issue is only "missed" once its own due date has passed — an earlier period that is still
 * inside its window is simply open, not overdue, and must not be flagged.
 */
export function plan({ cycle, period, issues, today }) {
  const kind = CYCLES[cycle].kind
  const title = `${kind} — ${period}`
  const existing = issues.find((issue) => issue.title === title) || null

  const issuesToFlag = issues.filter((issue) => {
    if (issue.state !== 'OPEN' || issue.title === title) return false
    const issuePeriod = periodOf(issue.title, kind)
    if (issuePeriod === null || issuePeriod >= period) return false
    return dueFor(cycle, issuePeriod) < today
  })

  return { action: existing ? 'skip' : 'create', title, existing, issuesToFlag }
}

function gh(args) {
  return execFileSync('gh', args, { encoding: 'utf8' })
}

function parseArgs(argv) {
  const args = { cycle: 'auto', repo: '', period: '', dryRun: false }
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index]
    if (arg === '--dry-run') args.dryRun = true
    else if (arg === '--cycle') args.cycle = argv[++index]
    else if (arg === '--repo') args.repo = argv[++index]
    else if (arg === '--period') args.period = argv[++index]
    else throw new Error(`Unknown argument "${arg}"`)
  }
  return args
}

function summarise(line) {
  console.log(line)
  if (process.env.GITHUB_STEP_SUMMARY) {
    appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${line}\n`)
  }
}

function main() {
  const args = parseArgs(process.argv.slice(2))
  const repo = args.repo || process.env.GITHUB_REPOSITORY
  if (!repo) throw new Error('No repository — pass --repo owner/name or set GITHUB_REPOSITORY')

  const planOfCycle = computeCycle(args.cycle, new Date(), args.period)
  console.log(
    `Cycle ${planOfCycle.cycle} · period ${planOfCycle.period} · due ${planOfCycle.due}`,
  )

  const issues = JSON.parse(
    gh(['issue', 'list', '--repo', repo, '--label', LABEL, '--state', 'all', '--limit', '200',
        '--json', 'number,title,state']),
  )

  const decision = plan({
    cycle: planOfCycle.cycle,
    period: planOfCycle.period,
    issues,
    today: planOfCycle.today,
  })

  if (decision.action === 'skip') {
    summarise(
      `A ${planOfCycle.cycle} cycle issue for ${planOfCycle.period} already exists ` +
        `(#${decision.existing.number}, ${decision.existing.state.toLowerCase()}). Nothing created.`,
    )
    return
  }

  for (const issue of decision.issuesToFlag) {
    const comments = JSON.parse(
      gh(['issue', 'view', String(issue.number), '--repo', repo, '--json', 'comments']),
    ).comments
    if (comments.some((comment) => comment.body.includes(MISSED_MARKER))) continue

    const issuePeriod = periodOf(issue.title, planOfCycle.kind)
    const body = [
      MISSED_MARKER,
      `This cycle is still open past its period (${issuePeriod}), so that cycle was missed. ` +
        `The ${planOfCycle.period} issue is being opened separately — finish or close this one so the backlog reflects reality.`,
      '',
      'Opened automatically by `.github/workflows/recurring-issues.yml` (#116). See `docs/recurring-tasks.md`.',
    ].join('\n')

    if (args.dryRun) {
      console.log(`[dry-run] would flag #${issue.number} (${issuePeriod}) as a missed cycle`)
      continue
    }

    const file = path.join(tmpdir(), `etr-missed-${issue.number}.md`)
    writeFileSync(file, body)
    gh(['issue', 'comment', String(issue.number), '--repo', repo, '--body-file', file])
    summarise(`Flagged missed cycle on #${issue.number} (${issuePeriod}).`)
  }

  const templatePath = path.join(ROOT, planOfCycle.template)
  const body = renderBody(readFileSync(templatePath, 'utf8'), planOfCycle)

  if (args.dryRun) {
    console.log(`[dry-run] would create "${decision.title}" in the "${MILESTONE}" milestone`)
    console.log(`[dry-run] body: ${body.split('\n').find((line) => line.startsWith('**Period:**'))}`)
    return
  }

  const file = path.join(tmpdir(), `etr-cycle-${planOfCycle.period}.md`)
  writeFileSync(file, body)
  const url = gh([
    'issue', 'create', '--repo', repo,
    '--title', decision.title,
    '--body-file', file,
    '--label', LABEL,
    '--milestone', MILESTONE,
  ]).trim()

  summarise(`Opened the ${planOfCycle.cycle} cycle issue for ${planOfCycle.period}: ${url}`)
  summarise(`Due: ${planOfCycle.due}`)
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    main()
  } catch (error) {
    console.error(`FAILED: ${error.message}`)
    process.exitCode = 1
  }
}
