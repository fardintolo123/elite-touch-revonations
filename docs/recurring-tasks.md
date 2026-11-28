# Recurring tasks

One table for every task on this site that has to happen again: what it is, how often, who does it,
where its instructions live, and where the result is recorded. If a task is not in this table, nothing
will remind anyone to do it.

This file is the runbook (#116). The mechanical checks it names are built in #117.

## Who does what

- **Robot** — a scheduled GitHub Action. Runs the mechanical checks for free and stays silent unless
  something breaks. No AI calls, no secrets.
- **Agent** — the coding agent working the dated cycle issue. Judgment work: read the numbers, decide,
  write the summary.
- **Owner** — Omar or the family. Business facts, the Google Business Profile, prices and photos.

## The table

| Task | Cadence | Who | How — instructions live here | Where the result goes |
|---|---|---|---|---|
| Open the monthly cycle issue | Monthly, 1st, 20:00 UTC | Robot | [recurring-issues.yml](../.github/workflows/recurring-issues.yml) | A new `[Recurring] Monthly check — YYYY-MM` issue in the "Recurring: maintenance cycles" milestone |
| Open the quarterly cycle issue | Quarterly, 20th of Mar/Jun/Sep/Dec, 20:00 UTC | Robot | [recurring-issues.yml](../.github/workflows/recurring-issues.yml) | A new `[Recurring] Quarterly sweep — YYYY-Qn` issue |
| Every URL in the live sitemap returns 200, with no Cloudflare challenge and no redirect loop | Daily, 19:00 UTC | Robot | [health-checks.yml](../.github/workflows/health-checks.yml) — check `sitemap` | An `[Health]` issue labelled `health-alert`, only on failure |
| `/contact-us/` still renders the enquiry form (GET only) | Daily, 19:00 UTC | Robot | [health-checks.yml](../.github/workflows/health-checks.yml) — check `contact-form` | Same |
| The homepage `Content-Security-Policy` still allows `analytics.google.com` and `google.com`, and GTM/GA4 still load | Weekly, Monday 19:00 UTC | Robot | [health-checks.yml](../.github/workflows/health-checks.yml) — check `analytics-csp` | Same |
| Cloudflare email obfuscation has not returned (`/cdn-cgi/l/email-protection` absent from the homepage) | Weekly, Monday | Robot | [health-checks.yml](../.github/workflows/health-checks.yml) — check `email-obfuscation` | Same |
| The rating snapshot in `lib/businessInfo.ts` is under 60 days old | Weekly, Monday | Robot | [health-checks.yml](../.github/workflows/health-checks.yml) — check `rating-age` | Same, low priority |
| Design-pattern ratchet (`check:design`) | Every push | Robot | [check-design.yml](../.github/workflows/check-design.yml) | A failed check on the commit |
| Instruction files stay inside their byte caps | Every change to them | Robot (CI) or agent | `npm run check:instructions` | A failing command; see the note below the table |
| Google Business Profile post | Weekly | Owner | The owner's calendar | GBP; the counts are reported in the monthly issue |
| Ask each finished customer for a review, and reply to every review | Weekly | Owner | The owner's calendar | GBP; the counts are reported in the monthly issue |
| GBP performance: calls, direction requests, website clicks, top search terms | Monthly, first week | Owner | [recurring-monthly.md](../.github/ISSUE_TEMPLATE/recurring-monthly.md) → Owner block | A comment on the month's cycle issue |
| Today's Google rating and review count | Monthly | Owner | Same | A comment on the month's cycle issue |
| Confirm `generate_lead` and `phone_call_click` are still GA4 key events | Once, then monthly | Owner | Same — GA4 property 453254013 | The month's cycle issue |
| Confirm the published package prices still hold | Quarterly, before the sweep | Owner | [recurring-quarterly.md](../.github/ISSUE_TEMPLATE/recurring-quarterly.md) | The quarter's cycle issue |
| Refresh the rating snapshot in `lib/businessInfo.ts` | Monthly, only if the owner's number changed | Agent | [recurring-monthly.md](../.github/ISSUE_TEMPLATE/recurring-monthly.md) | A separate commit, noted on the cycle issue |
| GA4 read: users, leads, call clicks, leads per 100 users | Monthly | Agent | Same → Agent block | The cycle issue, then the monthly summary |
| Page-two sweep: positions 8–20 with at least 10 impressions | Monthly, from January 2027 | Agent | Same | The cycle issue; the sweep that owns it first (#115) |
| `npm run check:readability` and `npm run check:design` against `main` | Monthly | Agent | Same | The cycle issue — new failures only |
| `npm audit --omit=dev`, recording the high and critical count | Monthly | Agent | Same | A new issue for each new finding |
| Count the files in `session-history/` | Monthly | Agent | Same; the rule is 20 or fewer | The cycle issue |
| Write the monthly summary | Monthly | Agent | `plans/recurring/YYYY-MM-monthly.md` | That file, then close the cycle issue |
| Quarterly SEO freshness review | Quarterly | Agent | [plans/seo-quarterly-review.md](../plans/seo-quarterly-review.md) | A dated section in that plan, then close the cycle issue |
| Re-check what the last quarter changed against fresh Search Console data | Quarterly | Agent | Same | A keep-or-iterate comment on each closed issue |
| Consolidate `session-history/` when it passes 20 files | When the monthly count says so | Agent | [session-management.md](../.agents/workflows/session-management.md) | #120 |

**Instruction files are capped.** The harness truncates `CLAUDE.md` past 65,536 bytes and Codex caps
`AGENTS.md` at 32 KiB, both silently — a rule past the cap is written but never loaded. Run
`npm run check:instructions` after adding to either, and move reference material to a linked `docs/`
page rather than growing the entry point.

## The cycle issues

Every month and every quarter gets its own dated issue, and it closes when the work is done. An open
one past its due date means a missed cycle — that is the whole point: the backlog shows it without
anyone remembering.

- **Titles.** `[Recurring] Monthly check — YYYY-MM` and `[Recurring] Quarterly sweep — YYYY-Qn`, both
  labelled `recurring` and filed in the milestone "Recurring: maintenance cycles". That milestone is
  permanent — unlike a `Batch:` milestone, never delete it.
- **The robot never duplicates.** It matches the exact title across open *and* closed issues, so a
  manual run on the same day, or a second dispatch, creates nothing.
- **A missed cycle gets flagged, not skipped.** When the robot opens a new cycle issue and an older
  cycle issue of the same kind is still open, it comments on the older one so the gap is visible in
  the backlog.
- **The body comes from the template.** `.github/ISSUE_TEMPLATE/recurring-monthly.md` and
  `recurring-quarterly.md` are the single source for the checklist; the robot fills in `{{PERIOD}}`,
  `{{DATE}}` and `{{DUE}}`. Edit the template, not a past issue.

## Running a robot by hand

Both robots accept a manual dispatch, which is how to test a change without waiting for the clock:

```sh
# Create this period's cycle issue (a no-op if it already exists).
gh workflow run recurring-issues.yml --field cycle=monthly

# Open a future cycle early, e.g. to prove the duplicate check:
gh workflow run recurring-issues.yml --field cycle=monthly --field period=2027-01

# Health checks, and a deliberate failure for testing:
gh workflow run health-checks.yml --field checks=daily
gh workflow run health-checks.yml --field force_fail=sitemap
```

The cycle robot can also be checked without touching GitHub at all:

```sh
node scripts/recurring-cycle-issue.mjs --cycle monthly --period 2026-12 --repo <owner>/<repo> --dry-run
```

A dispatch that finds the cycle issue already exists is a pass, not a failure: it writes "already
exists" to the run summary and exits clean.

## Adding or retiring a task

Add a row when a task becomes recurring, and put its instructions in the file the row links to — never
copy the steps into the table. Delete the row when the task stops being needed, and delete the
instructions it pointed at if nothing else uses them. A task that only one person remembers is not
recurring; it is a note.
