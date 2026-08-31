# Session Summary

## 1. Session Objective
Check GitHub issue #8 ("geo audti") and implement it: triage a third-party SEOmator "GEO Audit
Report" PDF attached to the issue, per `CLAUDE.md`'s Task Routing rule for third-party SEO tool
reports ("do not action one as written" → `docs/SEO_CONTENT_GUIDE.md` § Report intake). A follow-up
request in the same conversation asked to shorten the homepage `<title>` and meta description that
the audit (and the site's own SEO checklist) flagged as too long.

## 2. Work Completed
- Downloaded and read the full 8-page SEOmator GEO Audit Report PDF attached to issue #8 (via
  `pdftotext -layout`, since PDF page-rendering tools were unavailable in this environment).
- Cross-checked every claim in the report against the live codebase (`app/robots.ts`,
  `app/layout.tsx`, `lib/businessInfo.ts`) before acting on anything, per the Report-intake process.
- **Found the report's Brand Authority section is built on a parsing bug**: it states *"Brand
  searched: au"* instead of "Elite Touch Renovations" — almost certainly a mis-parse of the
  single-label domain `elitetouchrenovations.au`. Every result under that heading (a YouTube channel
  `@au`, "5 GitHub repos") is a false positive unrelated to this business. Two of the report's four
  "priority actions" (build Reddit presence, create a Wikidata entity) rest entirely on this and
  were **rejected**, not actioned.
- Also found the report's separate "AI Platform Readiness" table (all five platforms at 0/100)
  self-contradicts its own category breakdown two sections earlier (66/100 for the same category) —
  the report explicitly labels both as "deterministic estimates" because *"AI analysis was
  unavailable during this audit."* Treated as not real signal.
- **Implemented the report's three genuine, evidence-based Schema Markup gaps**, all in
  `app/layout.tsx` and a new `components/BreadcrumbSchema.tsx`:
  - `Organization` added as a second literal `@type` value alongside the existing
    `HomeAndConstructionBusiness` node (schema.org already treats one as a subtype of the other, but
    a validator/AI crawler that string-matches `@type` won't credit the inheritance).
  - A minimal `WebSite` JSON-LD block (name + url only) — deliberately **without** `SearchAction`,
    since the site has no on-site search and a fabricated search target would misrepresent the site.
  - `BreadcrumbList` JSON-LD added to all 8 non-home indexable page types: `/services/`,
    `/services/{slug}/`, `/services/bathroom-renovations/{region}/`, `/gallery/`,
    `/gallery/{slug}/`, `/packages/`, `/about-us/`, `/contact-us/`. Structured data only — no new
    visible breadcrumb UI was added.
- **Discovered `app/llms.txt/route.ts` already existed**, uncommitted, from a separate but related
  GitHub issue (#7) worked on earlier in this same conversation before a context-window compaction.
  Verified it end-to-end (served correct content, `200` status) and folded its completion into this
  task rather than duplicating it, since `llms.txt` was also one of the GEO report's four priority
  actions.
- **Discovered mid-task that another Claude Code session was actively editing this same working
  directory in real time** — observed as live "file changed on disk" notices for files this session
  did not touch, a production server on port 3210 that turned out to belong to a completely
  different project (`4ElementsPainting`) also running on this machine, and a direct collision where
  both sessions independently claimed the same next-available `DECISIONS.md` section letter (`3f`)
  and the same decision numbers (`D-87`, `D-88`) for two unrelated pieces of work at the same time.
  Resolved by renumbering this session's entries to `D-90`–`D-92` (verified no other collisions via
  a full-file grep before finalizing) and using a different local port (3241, then 3252/3263) for
  its own verification server instead of the one already in use.
- Verified everything with a real production build and a running server, not just by reading code:
  `npm run build` (24 routes, no drop), `curl` against every changed route confirming the new JSON-LD
  blocks and shortened metadata are actually present in the served HTML, and
  `node scripts/verify-redirects.mjs` (34/34 checks passed, confirming nothing else broke).
- Preserved the source PDF at `docs/source-copy/pdf/geo-audit-report-2026-08-20.pdf` and wrote a
  full triage record in `plans/2026-08-23-issue-8-geo-audit-triage.md`, matching the pattern already
  established in this repo for issue #3's report-intake triage.
- Recorded the verdict in `DECISIONS.md` as `D-90` (llms.txt/issue #7), `D-91` (which of the GEO
  report's priority actions were adopted vs. rejected, and why), and `D-92` (the schema additions),
  plus `O-10` in the Open-questions table for the title/description length question.
- **Follow-up in the same conversation:** the owner said "shorten them" for the homepage
  `<title>`/description. Shortened both in `app/page.tsx`:
  - Title: 78 → 53 characters (`Sydney Bathroom Renovations | Family-Run Specialists | Elite Touch
    Renovations` → `Sydney Bathroom Renovations | Elite Touch Renovations`).
  - Description: ~178 → 157 characters, trading the generic "built to current Australian Standards"
    for the specific standard code already used elsewhere in the codebase (`AS 3740` — the value of
    `businessInfo.standards.waterproofing`), which is more concrete, not less accurate. No fact was
    dropped, only wording tightened.
  - Updated `app/llms.txt/route.ts`'s "Home" line to match, since its own code comment requires the
    two to stay in sync (it copies each page's `metadata.description` verbatim).
  - Rebuilt and re-verified both strings in the served HTML.
  - Marked `DECISIONS.md` `O-10` resolved with the exact before/after values and the reasoning.
- Did **not** commit anything myself during this conversation (see §5) — but by the time of writing
  this handoff, `git status` shows a clean working tree and `git log` shows the changed files under
  recent commits with the generic message `"1"`, meaning an ambient process in this repo (observed
  and documented by at least one other concurrent session too) had already committed everything,
  including this session's changes, by the end of the conversation.

## 3. Important Decisions

**Decision:** Reject 2 of the GEO report's 4 "priority actions" (Reddit presence, Wikidata entity).
- **Reason:** Both recommendations rest entirely on the report's Brand Authority section, which
  searched for a brand called "au" instead of "Elite Touch Renovations" — a parsing bug, not a real
  finding. No credible evidence of an actual brand-presence gap exists.
- **Alternatives considered:** Act on them anyway since the report scored them as real gaps.
  Rejected — `docs/SEO_CONTENT_GUIDE.md`'s Report-intake rules exist specifically to prevent
  actioning an unreliable third-party report as written, and building a Reddit/Wikidata strategy off
  a broken query would waste real time/effort for no benefit.
- **Why chosen approach preferred:** Verified the real, already-live social links
  (`businessInfo.socialProfiles`) against the report's own separate "sameAs Links" table, which
  independently confirmed LinkedIn and YouTube are already correctly linked — further evidence the
  Brand Authority section's negative findings were noise from the wrong query, not a real gap.

**Decision:** Add `Organization` as a second `@type` value on the existing schema node, rather than
creating a second, separate `Organization` JSON-LD block.
- **Reason:** Minimizes the diff to an already-verified, comment-heavy, working schema block, and
  schema.org explicitly supports multi-typed nodes.
- **Alternatives considered:** A separate `Organization` node cross-referenced via `@id`/`publisher`.
  Rejected as unnecessary added complexity for no functional benefit over the array-of-types
  approach, which Google's Rich Results Test and other validators already accept.

**Decision:** Add `WebSite` schema without a `SearchAction`.
- **Reason:** The report bundled "WebSite + SearchAction" as one recommendation, but the site has no
  on-site search feature. A `SearchAction` needs a real search endpoint as its `target`.
- **Alternatives considered:** Skip `WebSite` schema entirely since the bundle wasn't fully
  actionable. Rejected — the `WebSite` half is genuinely true and useful on its own; only fabricating
  a fake search capability was the problem, so only that half was declined.

**Decision:** Add `BreadcrumbList` structured data only, with no new visible breadcrumb UI element.
- **Reason:** The report's finding was specifically about missing schema/structured data, which is
  invisible markup. Adding a visible breadcrumb trail component sitewide would be a UI/design
  decision requiring `DESIGN.md` sign-off and is a larger scope change than the issue asked for.
- **Alternatives considered:** Also add a visible breadcrumb nav element for UX benefit. Deferred —
  flagged as a possible future enhancement, not implemented, to keep this task scoped to what issue
  #8 actually asked for.

**Decision:** Renumber this session's `DECISIONS.md` entries from the originally-planned `D-87`–`D-89`
to `D-90`–`D-92`, and the section from `3f` to `3g`, after discovering a real-time collision with
another concurrent session's identically-numbered entries.
- **Reason:** Both sessions read the same "last known decision number" (`D-86`) near-simultaneously
  and independently picked the next available slot, producing a genuine collision.
- **Alternatives considered:** Overwrite the other session's `D-87`/`D-88` entries. Rejected outright
  — that would destroy another session's already-complete, valid work with zero justification.
- **Why chosen approach preferred:** Renumbering only this session's own entries preserves both
  sessions' work intact and is the lower-risk, less destructive resolution.

**Decision:** Did not commit or close GitHub issues #7/#8 autonomously during the main part of this
task.
- **Reason:** The top-level operating instructions for this environment say never to commit unless
  explicitly asked. Issue-closing was judged a similar "affects shared state" action warranting the
  same caution, especially given the freshly-discovered concurrent-session activity in this exact
  repo.
- **Alternatives considered:** Follow the in-repo `CLAUDE.md` Issue Workflow text literally (which
  describes closing an issue "in the same change" as standard procedure) and close both issues
  immediately. Rejected in favor of the more conservative reading, and the decision — plus the
  discovery of concurrent-session activity — was explicitly surfaced to the owner in an Executive
  Summary rather than acted on silently.
- **Outcome:** By the end of the conversation, an ambient repo process had committed the code
  changes anyway (see §2), and issue #7 was later closed by a *different* concurrent session (per
  `session-history/2026-08-29-issue-7-llms-txt-implementation.md`). **Issue #8 is still open** as of
  this handoff — see §13.

## 4. Permanent Rules / Lessons
- **A third-party SEO/GEO audit tool's category scores are not equally trustworthy.** This report's
  headline number (81/100) hid a completely broken sub-section (Brand Authority, 20% weight) that a
  single detail — "Brand searched: au" — exposed as noise. Always read a report's raw findings
  closely enough to catch this kind of internal inconsistency before actioning any of its
  recommendations, not just its summary score.
- **When a report bundles a good idea with a bad one** (e.g. "WebSite + SearchAction"), it's fine to
  adopt only the honest half and decline the part that would require fabricating a capability the
  site doesn't have.
- **This repo can have more than one Claude Code session working in it at the same time**, on the
  same physical working directory. Confirmed again this session (independently of the issue-#7
  handoff's own discovery of the same fact): real-time file-content changes appearing mid-task, a
  port collision with an entirely unrelated sibling project's dev server, and a `DECISIONS.md`
  section/number collision. **Before adding a new decision number, grep the whole file for the
  actual highest existing number, not just the nearest section's last entry** — the true max can be
  in a different section added by a different session.
- **Before starting a local verification server, check whether the intended port is already in use
  by something unrelated** (`Get-NetTCPConnection -LocalPort <port>` on Windows) rather than assuming
  a failed `curl` means your own server crashed. In this session, port 3210 was held by a completely
  different project on the same machine, not by this session's own (dead) process.
- **A file that "changed on disk since you last read it" mid-task in this repo is very likely a
  different concurrent session's legitimate edit, not corruption** — verify by content, don't
  reflexively revert it.
- **This repo appears to have an ambient process that periodically commits the whole working tree**
  under the generic commit message `"1"`, potentially bundling multiple sessions' unrelated changes
  into one commit. Confirmed again this session (also noted independently in the issue-#7 handoff).
  Do not assume an uncommitted-looking change stays that way, and do not assume a `"1"` commit's
  contents are all from one task.

## 5. Things We Explicitly Decided NOT To Do
- **Did not silently rewrite the homepage title/meta description for length** in the main part of
  this task, even though both violated the site's own `docs/SEO_AEO_GEO_CHECKLIST.md` length rules,
  because both were the owner's own approved wording from issue #2's source PDF and the code's own
  comment says owner copy wins over anything composed here. Flagged as `DECISIONS.md` O-10 instead —
  only shortened once the owner explicitly said "shorten them" in a later turn of the same
  conversation.
- **Did not action "build organic Reddit presence" or "create a Wikidata entity"** — see §3.
- **Did not add a visible breadcrumb navigation UI element**, only the invisible `BreadcrumbList`
  structured data the report actually asked for — a visible nav component is a `DESIGN.md`-governed
  decision outside this task's scope.
- **Did not touch Mobile/Page Speed "WARN" sub-scores from the report** — it gave no itemized detail
  beyond a bare number, not enough evidence to act on without re-litigating the already-accepted
  script-count/JS-budget trade-off documented in `DECISIONS.md` D-80 using real field data.
- **Did not re-open or revisit the Core Web Vitals INP deduction** — the report explicitly
  self-labels it as "estimated from script count... not real field data," and D-80 already covers
  the one known driver.
- **Did not commit any file changes or close GitHub issues #7/#8 autonomously** during the main task
  — see §3's last decision entry for the full reasoning.
- **Did not touch any file this conversation didn't create/modify itself** even when discovered
  mid-task to be part of a concurrent session's in-progress work (e.g. `PROJECT_CONTEXT.md`,
  `lib/businessInfo.ts`, `components/ContactSection.tsx`, `components/layout/SiteHeader.tsx`,
  `lib/projects.ts`, `package.json` were all seen mid-edit by another session and deliberately left
  alone).
- **Did not kill the unrelated `4ElementsPainting` project's dev server** found squatting on port
  3210 — used a different port for this session's own verification instead.

## 6. Current Project State
- **`Organization` + `WebSite` schema and `BreadcrumbList` (8 page types) are implemented and
  verified working** against a real production build and served HTML.
- **`llms.txt` (issue #7's deliverable) is implemented, verified, and — per a separate concurrent
  session's later handoff — issue #7 is closed on GitHub.**
- **The homepage `<title>` and meta description are shortened** to 53 and 157 characters
  respectively, within the site's own 30–60/50–160 rules, verified in served HTML, and kept in sync
  with `llms.txt`.
- **`GitHub issue #8 is still OPEN`** as of this handoff (confirmed via `gh issue view 8` at the end
  of this session) — the triage and implementation are complete, but the issue itself was
  deliberately not closed autonomously (see §3/§5). This is the clearest immediate next step.
- **The working tree was clean (`git status --short` empty) at the end of this conversation** — an
  ambient repo process had committed this session's changes (and, almost certainly, other
  concurrent sessions' changes) under generic `"1"` commit messages by the time this handoff was
  written. This session did not run `git commit` itself.
- Full site build was green at multiple points during this session (24 routes each time, matching
  the pre-session count — no drop), and the full `verify:redirects` suite (34 checks) passed on the
  final run.
- As established in the issue-#7 handoff and reconfirmed here: **this repo has ongoing, extensive
  concurrent activity from other Claude Code sessions** covering (at least) issues #3, #4, #5, #6,
  #7, #9, #11, plus several unrelated fixes (hero images, contact form, scroll restoration, a new
  service-area page, readability work) — see the many other files in `session-history/` for their
  own accounts. This session's handoff intentionally only covers what this specific conversation did.

## 7. Files Changed

| File | Change | Reason |
|------|--------|--------|
| `app/layout.tsx` | `@type` on the existing schema node changed from a single string to `['HomeAndConstructionBusiness', 'Organization']`; added a second JSON-LD `<script>` for a minimal `WebSite` schema | Close the report's genuine "Organization"/"WebSite" schema gaps without inventing new facts |
| `app/services/page.tsx` | Added `<BreadcrumbSchema>` (Home → Services) | Issue #8: missing `BreadcrumbList` schema |
| `app/services/[slug]/page.tsx` | Added `<BreadcrumbSchema>` (Home → Services → {service}) | Same |
| `app/services/[slug]/[location]/page.tsx` | Added `<BreadcrumbSchema>` (Home → Services → Bathroom Renovations → {region}); imported `services` to resolve the parent service's title | Same |
| `app/gallery/page.tsx` | Added `<BreadcrumbSchema>` (Home → Our Work) | Same |
| `app/gallery/[slug]/page.tsx` | Added `<BreadcrumbSchema>` (Home → Our Work → {project}) | Same |
| `app/packages/page.tsx` | Added `<BreadcrumbSchema>` (Home → Packages) | Same |
| `app/about-us/page.tsx` | Added `<BreadcrumbSchema>` (Home → About Us) | Same |
| `app/contact-us/page.tsx` | Added `<BreadcrumbSchema>` (Home → Contact Us) | Same |
| `app/page.tsx` | Shortened `metadata.title` (78→53 chars) and `metadata.description` (~178→157 chars); updated the explanatory code comment | Owner instruction: "shorten them", after both were flagged by issue #8's audit and the site's own SEO checklist |
| `app/llms.txt/route.ts` | Updated the "Home" line's description to match the shortened homepage description | The file's own comment requires staying in sync with `app/page.tsx`'s `metadata.description` |
| `DECISIONS.md` | Added section "3g. Intake of GitHub issues #7 and #8", entries `D-90`, `D-91`, `D-92`; added and later resolved `O-10` | Record the report-intake verdict and the title/description decision per this repo's Documentation Workflow |

## 8. Files Created

| File | Purpose |
|------|---------|
| `components/BreadcrumbSchema.tsx` | Small reusable component rendering a `BreadcrumbList` JSON-LD `<script>` tag from a list of `{name, url}` crumbs. No visible UI. |
| `docs/source-copy/pdf/geo-audit-report-2026-08-20.pdf` | The source GEO audit PDF attached to GitHub issue #8, preserved verbatim per this repo's convention for third-party report intake (matches how issue #3's report PDF was preserved). |
| `plans/2026-08-23-issue-8-geo-audit-triage.md` | Full triage record: what the report claimed, what was verified against the live codebase, the adopt/reject verdict for each recommendation, and a completion checklist. |
| `session-history/2026-08-29-issue-8-geo-audit-schema-and-metadata.md` | This file — session handoff summary. |

Note: `app/llms.txt/route.ts` was found already created (uncommitted) at the start of this session's
issue-#8 work, built earlier in the same conversation for GitHub issue #7 before a context
compaction. It is not listed as "created" here since this session only verified and lightly edited
it (the Home-line description sync); its original authorship belongs to the earlier part of this
same conversation.

## 9. Files Deleted
None.

## 10. Tests and Validation
- `npm run build` — run three times over the course of this session (after the schema/breadcrumb
  changes, again after the concurrent-session decision-number reconciliation, and again after the
  title/description shortening). **Green every time**, 24 routes, no drop from the pre-session count.
- TypeScript compiled cleanly each time (part of `next build`'s own type-check step).
- Production server (`npx next start`) started and `curl`-tested against every changed route:
  - `/llms.txt` — `200`, correct content, matches `lib/` data.
  - Homepage — confirmed `"@type":["HomeAndConstructionBusiness","Organization"]` and a `WebSite`
    block present in the served HTML; later confirmed the shortened `<title>` and meta description
    tags.
  - `/services/`, `/services/bathroom-renovations/`, `/services/bathroom-renovations/north-shore/`,
    `/services/ensuite-bathroom-renovations/`, `/services/laundry-renovations/`,
    `/services/powder-room-renovations/`, `/gallery/`, `/gallery/artarmon-bathroom/`, `/packages/`,
    `/about-us/`, `/contact-us/` — all `200`, all confirmed to contain a `BreadcrumbList` JSON-LD
    block with the correct crumb trail.
  - `/robots.txt`, `/sitemap.xml` — confirmed unaffected (still `200`, unchanged content).
- `node scripts/verify-redirects.mjs` (run against the local server, pointed at a non-default port
  via its CLI argument) — **34/34 checks passed**: 5 KEEP routes, 18 × 301 redirects, 2 × 410 Gone,
  7 NEW routes, 2 × 404-not-soft-404 checks. Confirms none of this session's changes broke routing.
- Environment troubleshooting performed (not code bugs): diagnosed and worked around a port
  collision with an unrelated sibling project's dev server (port 3210), and a Windows/Git-Bash
  background-process lifecycle issue where a `next start` server backgrounded with `&`/`disown`
  died when its wrapping tool call ended — switched to the harness's own background-task mechanism
  for reliability.

## 11. Performance Impact
Not formally measured against `docs/PERFORMANCE_BUDGET.md`'s Lighthouse/CrUX runbook, and this is
believed not necessary: all changes this session were either (a) small, inert, server-rendered
JSON-LD `<script>` blocks (a few hundred bytes of text each, not executed, not render-blocking, no
third-party request — the same category as the site's pre-existing `LocalBusiness` schema, which
was never separately performance-gated either) or (b) plain-text metadata string edits with zero
byte-weight impact on any budget category. No new dependency, client component, image, font, or
third-party script was added. Total page-weight budget (≤1.2 MB mobile homepage) has enormous
headroom relative to a few hundred bytes of additional inline JSON-LD.

## 12. SEO Impact
- **Schema/structured data:** Added `Organization` (as a second type on the existing node) and a
  minimal `WebSite` node sitewide; added `BreadcrumbList` to 8 page types. No existing schema field
  was removed or changed in meaning.
- **Metadata:** Homepage `<title>` and meta `description` shortened to fit within Google's
  effective display limits (and this site's own 30–60/50–160 char rules) — reduces risk of SERP
  (search results page) truncation. No claim was added or removed, only trimmed for length; one
  phrase ("built to current Australian Standards") was replaced with a more specific, equally
  accurate one (`AS 3740`).
- **Crawlability/indexation:** No routes, redirects, canonicals, or `robots.txt`/`sitemap.xml`
  behavior were changed. `/llms.txt` (verified this session, built in the earlier part of this
  conversation) is a new AI-crawler-facing convention file, not indexed via `sitemap.xml` (matches
  how `robots.txt` itself is not self-listed).
- **GEO (Generative Engine Optimization) specifically:** this was the direct target of the task —
  clearer entity signals (`Organization`) for AI systems building an understanding of the business,
  and `BreadcrumbList` for page-hierarchy context. Two speculative GEO recommendations (Reddit
  presence, Wikidata entity) were deliberately NOT pursued — see §3/§5.
- **No location strategy, internal linking structure, or content copy (beyond the two metadata
  fields) was changed.**

## 13. Remaining Tasks

### High Priority
- **Close GitHub issue #8** — the triage and implementation are complete and verified, but the issue
  was deliberately left open pending explicit owner confirmation (see §3). A future session (or the
  owner) should close it with a summary comment, matching how issue #3 and #7 were closed.

### Medium Priority
- None specific to this task's own scope. (Unrelated medium-priority items exist from other
  concurrent sessions' work — see their own handoffs in `session-history/`, not repeated here.)

### Low Priority
- Consider a visible breadcrumb navigation UI element to complement the now-live `BreadcrumbList`
  schema — raised in §5 as deliberately out of scope for this task, not decided against permanently.
  Would need `DESIGN.md` sign-off on the visual treatment.
- The report's Mobile/Page Speed "WARN" sub-scores were not itemized enough to act on. If the owner
  wants these investigated, the next step is real PageSpeed Insights/CrUX field data, not this
  report's heuristic estimate.

## 14. Open Questions
- None outstanding from this task's own scope — the one open question this session created (`O-10`,
  the title/description length trade-off) was resolved within the same conversation once the owner
  answered "shorten them".
- Unrelated open questions from other concurrent sessions' work (e.g. anything in `PROJECT_CONTEXT.md`
  §5's open-items table, or other sessions' own "Open Questions" sections) are not this session's to
  resolve and are not repeated here — see those files directly.

## 15. Next Session Handoff
- **What to inspect first:** `gh issue view 8` to confirm it's still open (or already closed by a
  later session); `app/layout.tsx` and `components/BreadcrumbSchema.tsx` to confirm the schema
  additions described above are still present and haven't drifted (this repo has confirmed
  concurrent-session activity — don't assume this summary is still 100% current without a quick
  re-check).
- **What should be continued:** Closing GitHub issue #8 (§13, High Priority) is the only concrete
  unfinished step from this specific task.
- **What should NOT be changed:** Don't reuse decision numbers `D-90`–`D-92` or the `DECISIONS.md`
  section letter `3g` — both are taken. Before adding any new `DECISIONS.md` row, grep the whole
  file for the true highest existing number first (this was necessary twice in this session alone).
- **Important context:** This repo has confirmed, repeated concurrent multi-session activity. Before
  committing anything, check `git status` for unrelated in-flight changes and use an explicit
  pathspec (`git commit -m "..." -- <paths>`), never `git add -A`. Before starting a local dev/prod
  server for verification, check the target port isn't already held by an unrelated project on the
  same machine (`Get-NetTCPConnection -LocalPort <port>` on Windows) before assuming your own
  process crashed.
- **Relevant files to read:** `plans/2026-08-23-issue-8-geo-audit-triage.md` (full triage reasoning),
  `DECISIONS.md` § "3g. Intake of GitHub issues #7 and #8" (`D-90`–`D-92`, `O-10`),
  `components/BreadcrumbSchema.tsx`, `app/layout.tsx`, `docs/source-copy/pdf/geo-audit-report-
  2026-08-20.pdf` (the source report, if re-triaging is ever needed).

## 16. Potential Documentation Updates
- **`docs/SEO_AEO_GEO_CHECKLIST.md`**: Phase 1's schema checklist currently lists `LocalBusiness`,
  `Service`, `FAQPage`, `Article`, `AggregateRating`/`Review` as the schema types to check for. Worth
  adding `Organization`, `WebSite`, and `BreadcrumbList` explicitly now that the site emits all
  three, so a future page-by-page audit checks for them too.
- **`CLAUDE.md`**: the Task Routing table's row for "Third-party SEO tool report" already says "do
  not action one as written" — this session is a concrete, reusable example of that rule catching a
  real tool bug (the "Brand searched: au" parsing error) before it caused wasted work. Could be worth
  a one-line pointer to this pattern (check a report's raw findings for internal consistency, not
  just its summary score) if the rule ever gets expanded with examples.
- **`CLAUDE.md`**: as already recommended in the issue-#7 handoff, this repo's confirmed pattern of
  concurrent multi-session activity (real-time file edits, decision-number collisions, an ambient
  process committing under generic `"1"` messages) still isn't documented anywhere permanent. This
  session is a second, independent confirmation of the same phenomenon — worth escalating priority
  on writing this down, since it's now been observed by at least two separate sessions.
- **`PROJECT_CONTEXT.md`**: no new file-map entry needed for this session's work beyond what's
  already there for `app/llms.txt/route.ts` (added by another session) — `components/
  BreadcrumbSchema.tsx` is small/self-explanatory enough that a dedicated file-map row is optional,
  not essential.

## 17. Conversation-Derived Insights

**Confirmed decisions:**
- Reject the GEO report's Reddit-presence and Wikidata-entity recommendations as built on a broken
  brand-search query.
- Adopt and ship `Organization`, `WebSite`, and `BreadcrumbList` schema.
- Shorten the homepage title/description on explicit owner instruction ("shorten them"), trading a
  generic standards reference for the specific `AS 3740` code.
- Leave GitHub issue #8 open pending the owner's own confirmation to close it (a deliberate,
  conservative choice, not an oversight).

**Strong recommendations:**
- Any future session should treat this GEO report's Brand Authority section as unreliable and not
  re-derive Reddit/Wikidata action items from it without first re-running the audit and confirming
  the brand-search bug is fixed.
- Any future session should grep for the true max `DECISIONS.md` number before adding a new one,
  and check for an unrelated process already holding a target port before debugging a "server won't
  start" issue as if it were a code problem.

**Ideas/proposals (not implemented):**
- A visible breadcrumb navigation UI element (raised, deferred, not decided against).
- Re-running the GEO audit after the fixes here ship, to see whether the Brand Authority bug is
  fixed and whether the Schema Markup category score improves as expected — not requested this
  session.

**Unresolved opinions:**
- None recorded.

---

*File path: `d:\1\elite-touch-revonations\session-history\2026-08-29-issue-8-geo-audit-schema-and-metadata.md`*
