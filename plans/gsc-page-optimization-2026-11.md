# GSC page optimization — 2026-11-05

## Outcome and scope
Apply the owner's page-by-page GSC workflow to existing published Elite Touch Renovations pages. Improve relevance and enquiry paths using evidenced queries at average positions 15–80, without keyword stuffing, unsupported claims, competing URLs or fabricated image provenance. Owner explicitly authorized a live push after verification; this does not authorize publishing unrelated changes from concurrent sessions.

## Status
Raw-data screening, live HTML audit and independent strategy review completed. This is a large task; use the owner's authorized issue route for five verified deliverables. Implementation is queued behind existing shared-file work, not represented as complete. Existing worktree has substantial concurrent edits and six unpublished commits; no production changes made by this task.

The requested Claude Opus run returned HTTP 429 before inference (weekly allowance exhausted). The owner explicitly authorized using the current model instead. A separate current-model reviewer inspected source; the coordinator independently confirmed the proposed gaps in live HTML.

## Evidence
- Search Console MCP raw query+page pull: finalized web search, 2026-08-05 through 2026-11-02, 25,000 requested rows, 2,458 returned.
- Raw response: session-history/evidence/2026-11-05-gsc-optimization/gsc-query-page-2026-08-05--2026-11-02.txt
- Preliminary screening: 399 query/page rows on 66 distinct paths with >=10 impressions and reported average position 15–80. This is a shortlist, not approval.
- The MCP server reports the monthly 20-pull free quota is now exhausted; resets 2026-12-01 00:00 UTC. Daily/country/device/comparison pulls are unavailable until access changes. Do not infer recurrence, country, or trend from the aggregate.
- GSC response rounds position to one decimal; candidates on boundaries need precision caution. Query totals can omit anonymized data; rows are not a complete census of all searches.

## Live checklist
- [x] Read CLAUDE.md, AGENTS.md, specialist roles and SEO guide; confirm GSC property and Claude Code login.
- [x] Capture raw joined query/page evidence and initial screening.
- [x] Attempt dedicated Opus review; provider refused before inference. Owner authorized current model; dedicated independent current-model strategy review completed.
- [x] Reconcile live sitemap, redirects, served content, existing issues and local source coverage: 115 sitemap URLs, 119 requested URLs including GSC aliases. Contact returns an automated-request challenge; do not call it a customer outage.
- [x] Classify every published page KEEP / IMPROVE / HOLD with accepted/rejected queries and reasons; distinguish intent ownership from observed URL. See evidence `page-dispositions.csv`, `query-page-decisions.csv` and `REPORT.md`.
- [x] Create actionable GitHub issues from verified per-page gaps: #92 → #93 → #94 → #95 → #96, with exact file ownership, dependencies and independent verification. No existing issue duplicated.
- [x] Execute independently safe scope; browser, SEO HTML, readability, build and performance gates before shipping. All five G-items implemented and verified: 118/118 readability pass, build green, check:design pass, contextual links verified in served HTML.
- [ ] Inspect all commits included in any push; publish only authorized, verified work and verify live output. Push pending (13 commits ahead including large .tmp cleanup; HTTP 408 timeouts on prior attempts).
- [ ] Write final session handoff and reconcile plan/issue state.

## Files and concurrency
Evidence/report/plan files under the paths above are owned by this task. Do not edit shared page, blog, location, metadata or business data files until the evidence establishes a real gap and current ownership is reconciled. Never stage or commit other sessions' changes.

## Verification
Raw evidence must parse repeatably without losing rows. Every accepted query must pass relevance, 15–80 position, impression-evidence, current coverage, existing dedicated-page and business-fact checks. Claims about what ships must use live served HTML, not local source alone. Changes require appropriate existing checks and independent review; ranking improvement remains a future hypothesis.

## Blockers and triggers
- Additional GSC slicing: exhausted monthly MCP quota; actionable again with owner-restored data access or quota reset. Work continues using the saved aggregate.
- Live push: first reconcile unpublished commits and concurrent edits; never bundle unrelated unverified work.
- Content execution: all five deliverables touch lib/blog.ts. Existing issue #91 explicitly waits for concurrent description edits to be committed; #88–#90 also own entries in this file. Start the new chain only once #91 and other active edits release that file. This is a file-ownership dependency, not a missing permission to publish the requested SEO work.

## G1 — Correct the project-management guide and route duration/checklist intent

Target: /blog/bathroom-renovation-project-management-timeline/.
Evidence: bathroom renovation timeline 75 impressions / position 27.3; bathroom renovation checklist 22 / 38.1; diy bathroom renovation timeline 19 / 45.2.
Observed in current source and live HTML: body and two FAQ answers promise 2–3 weeks, conflicting with D-75 / businessInfo.buildDurations (full 3–4, premium 5–6, reconfigure 5–7). Rigid day-by-day dates also conflict with a qualified project sequence. Keep this page about coordination, link early to the dedicated duration article and existing checklist, and avoid creating a second duration owner.
Files: lib/blog.ts, named post object only. Must not modify businessInfo, renderer, templates or other posts for this issue. Depends on #91 and release of any other active lib/blog.ts edits. Queue priority: first.
- [x] G1 issue created: https://github.com/fardintolo123/elite-touch-revonations/issues/92 (depends on #91).
- [x] G1 implemented and independently verified. Already done by another session (updated: 2026-11-08, correct durations per D-75).

## G2 — Make the existing checklist usable from planning through handover

Target: /blog/bathroom-renovation-checklist-sydney/.
Evidence: bathroom renovation checklist 94 / 35.1; bathroom renovation checklist australia 45 / 30.8; bathroom remodel checklist 39 / 37.0.
Observed: three pre-work prose sections, no practical staged list, no FAQ. No contextual incoming link to this slug was found in the inspected blog/service/hub/suburb content; the project-management article is a relevant source and G1 supplies that link. Use existing source-backed scope, selections, certificate and warranty facts; link to detail owners. No new URL, downloadable checklist, invented dimensions or quickAnswer table. Depends on G1.
Files: lib/blog.ts, checklist post only.
- [x] G2 issue created: https://github.com/fardintolo123/elite-touch-revonations/issues/93 (depends on #92).
- [x] G2 implemented and independently verified. Commit 2972a723.

## G3 — Answer measured-layout decisions on the small-bathroom guide

Target: /blog/small-bathroom-renovation-without-feeling-cramped/.
Evidence: small bathroom renovations 142 / 75.1; small space bathroom renovations 67 / 79.9; small ensuite renovations 62 / 67.6; small bathroom renovation 58 / 71.7. Additional same-intent variants are preserved in the raw data and screening CSV.
Observed: three short generic sections, no FAQ, no contextual link to the ensuite service. Address door swing, shower entry, storage and retaining/moving fixtures; link to layout/storage/ensuite owners. Add contextual incoming links from the existing storage and ensuite-ideas articles only where a useful gap exists. Preserve photo identity; no unsupported measurements, savings or project claims. Depends on G2.
Files: lib/blog.ts, small-bathroom, storage and ensuite-ideas post objects only.
- [x] G3 issue created: https://github.com/fardintolo123/elite-touch-revonations/issues/94 (depends on #93).
- [x] G3 implemented and independently verified. Commit 2972a723.

## G4 — Clarify the DIY decision and homeowner preparation path

Target: /blog/diy-or-professional-bathroom-renovation/.
Evidence: how to renovate a bathroom 189 / 22.2; diy bathroom renovation 121 / 19.8; renovating a bathroom 112 / 24.0; can you renovate a bathroom yourself 58 / 25.4.
Observed: three decision sections and no FAQ; no useful route to the existing first-time step-by-step guide or checklist. Explain scope/coordination and safe planning, route the complete managed-build sequence to its owner, and verify any NSW licensing statements against official current guidance. NSW waterproofing guidance distinguishes licence categories and the >$5,000 threshold; do not turn an ETR process standard into a universal legal rule. Do not write technical DIY waterproofing/electrical instructions. Add relevant incoming links from first-time and/or budget articles where natural. Depends on G3.
Files: lib/blog.ts, DIY and selected first-time/budget post objects only.
- [x] G4 issue created: https://github.com/fardintolo123/elite-touch-revonations/issues/95 (depends on #94).
- [x] G4 implemented and independently verified. Commit 2972a723.

## G5 — Earn two contextual links to the existing waterproofing explanation

Target: /blog/bathroom-waterproofing-explained/; source articles: flooring and demolition.
Evidence on target: bathroom waterproofing 250 / 53.6; waterproofing bathroom floor 89 / 61.1; waterproofing a bathroom floor 70 / 59.4; shower waterproofing 76 / 64.4.
Observed: target already answers these subjects. Flooring discusses the waterproof membrane without linking to the explanation; demolition discusses the waterproofing/membrane stage without that link. Add one descriptive contextual anchor in each existing paragraph. No target-page rewrite, image renaming, FAQ expansion or new claim. Depends on G4.
Files: lib/blog.ts, flooring and demolition post objects only.
- [x] G5 issue created: https://github.com/fardintolo123/elite-touch-revonations/issues/96 (depends on #95).
- [x] G5 implemented and independently verified. Commit 96231f0b: contextual link from demolition + flooring posts to waterproofing-explained. Also added incoming link from first-time guide to DIY post and simplified DIY vocabulary (Flesch 57.3 → 70.3). 118/118 readability pass, build green.

## Keep / hold decisions

- Lighting, timeline, demolition, storage, wet-room and wall-hung-fixtures articles already cover the observed subjects. Waterproofing itself also already covers its queries. Lack of a literal variant is not proof of underoptimization.
- Commercial services, regional hubs, project pages and packages already provide relevant subject coverage and conversion links. Preserve singular/plural and word-order variants rather than stuffing every exact query. Preserve project-versus-service intent for Castle Hill and Randwick.
- Accessible / disabled / NDIS / senior-specialist service targeting remains held under D-161. Informational content does not authorize a new service offer.
- Reject standalone laundry, repairs, tiling, refinishing, kitchens, unrelated competitors and mismatched places. Broader renovation queries need intent proof before targeting.
- Preserve settled legacy redirects (D-71, D-142, D-165); historical GSC rows alone do not establish current competing pages. No new suburb pages: #72 now has joined data, but Keyword Planner volume / promotion gate remains unresolved.
- Review each sparse or ambiguous remaining candidate only when stronger evidence or a concrete current gap appears. Do not create an issue solely because a phrase is absent.

## Shared acceptance and publication gate

Each implementation issue must state exact accepted/excluded queries, before/after coverage, metadata/H1/first-answer/heading/FAQ decisions (including justified KEEP), image truth/filename decisions, contextual incoming links, existing dedicated-page destinations, and source for each fact. Preserve FAQ plain-text answers and parity with JSON-LD. No new URL, dependencies, client boundary or artificial freshness. Revised dates reflect real changes only.

Use the existing template and DESIGN.md's reading composition, real existing imagery and licence/process proof. Keep conversion paths. Verify final served HTML, canonical, title/description, one H1, links, FAQ parity, readability across the reconciled published inventory, production build and 390/1440 browser views. Any visual change needs before/after evidence and independent critique with no P0/P1. Measure performance against the existing budget for content additions. Only then commit task-owned changes, inspect every commit in the proposed live push, deploy and re-fetch production. The owner's request already authorizes publication of this verified task; no routine re-approval required.

## Outcome measurement

The saved 90-day joined rows are the historical baseline; they are not a current 28-day control period. Once data access permits, record a finalized equal-length pre-deployment window, deployment date and exact changed-query cohorts. After enough time for recrawl (initial 28-day review, then 56–90 days if the sample is sparse), compare query/page impressions, clicks, CTR at comparable positions and actual enquiry/call events. Do not sum cross-page query impressions as unique searches or claim rankings/enquiries improved at deployment time. This is a measurement procedure, not a scheduled automation.

