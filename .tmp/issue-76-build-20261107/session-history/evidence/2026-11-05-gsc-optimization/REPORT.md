# GSC page optimization — evidence, strategy and execution queue

Audit date: 2026-11-05. Property: `sc-domain:elitetouchrenovations.au`. **Status: audit and issues complete; website implementation and publication are pending.**

## What was observed

- One finalized **web-search Query × Page** pull covering **2026-08-05 through 2026-11-02** returned **2,458 rows** from a requested maximum of 25,000.
- A conservative first screen (reported average position 15–80 inclusive; at least 10 impressions) produced **399 query/page rows across 66 paths**, including historical aliases. This is not a list of 399 approved keywords.
- The live sitemap contains **115 URLs**. The collector requested **119 URLs**, adding the GSC aliases/non-www form. There were no network/parser failures. `/contact-us/` and its `/calendly/` alias ended at an automated-request 403 challenge; the other requested URLs ended at 200. This does not establish a customer outage.
- On the 114 sitemap pages that returned 200, the repeatable checks found one H1 and a self-referencing canonical. This is a limited served-HTML check, not a full technical or browser audit.
- Local source and live HTML independently confirm the five concrete opportunities below. Local source contains unpublished changes, so proposed edits must be reconciled against both before implementation.

## The strategy

Improve demonstrated missing answers and contextual routing. Keep already useful metadata, semantic wording and images. Singular/plural and word-order differences are not themselves defects. Each page should retain a distinct job: service, regional coverage, real project, package comparison or informational decision.

| Order | Deliverable | Strong GSC observations on the target URL | Verified gap |
|---|---|---|---|
| [#92](https://github.com/fardintolo123/elite-touch-revonations/issues/92) | Project-management accuracy and routing | timeline: 75 impressions, position 27.3; checklist: 22, 38.1 | Body and two FAQs say 2–3 weeks despite approved full-renovation 3–4 weeks; rigid day-by-day promises and weak routing to the dedicated timeline/checklist. |
| [#93](https://github.com/fardintolo123/elite-touch-revonations/issues/93) | Practical renovation checklist | checklist: 94, 35.1; Australian variant: 45, 30.8; remodel checklist: 39, 37.0 | Three pre-work prose sections, no usable staged checklist or FAQ. No contextual incoming link to this slug was found in inspected content data. #92 supplies the appropriate management → checklist link. |
| [#94](https://github.com/fardintolo123/elite-touch-revonations/issues/94) | Small-bathroom layout decisions | small bathroom renovations: 142, 75.1; small-space variant: 67, 79.9; small ensuite renovations: 62, 67.6 | Three short generic sections; missing practical measured-layout trade-offs, useful FAQs and routing to the existing ensuite service. |
| [#95](https://github.com/fardintolo123/elite-touch-revonations/issues/95) | DIY decision and preparation | how to renovate a bathroom: 189, 22.2; DIY bathroom renovation: 121, 19.8; can you renovate a bathroom yourself: 58, 25.4 | Three broad decision sections; no FAQ or helpful route to the existing first-time sequence/checklist. Re-check blanket NSW licensing statements before expanding them. |
| [#96](https://github.com/fardintolo123/elite-touch-revonations/issues/96) | Two incoming waterproofing links | bathroom waterproofing: 250, 53.6; floor variants: 89, 61.1 and 70, 59.4; shower waterproofing: 76, 64.4 | Target already explains the subject. Existing flooring and demolition paragraphs discuss membranes/waterproofing without linking to that dedicated explanation. |

These five deliverables involve five target articles and up to six supporting link-source articles. They do not authorize a wider blog rewrite. Every issue contains exact scope, dependencies, exclusions, acceptance criteria and verification/publication steps.

All use `lib/blog.ts`, so execute **#91 → #92 → #93 → #94 → #95 → #96**, after other active edits to that file release it. Existing #88–#90 also use this file; reconcile their status rather than starting concurrent edits or repeating completed work. The current description-edit dependency is explicitly recorded in `plans/blog-readability-and-answers-2026-11.md` and issue #91.

## What stays and what is held

- **Lighting, timeline, demolition, storage, wet-room, waterproofing and wall-hung fixtures already explain the relevant subjects.** The wall-hung article already links to the dedicated back-to-wall toilet comparison. Do not manufacture competing explanations.
- **Services, regional hubs, gallery projects and packages retain their roles.** Existing natural subject coverage, project proof and service/region links matter more than inserting all exact variants. Castle Hill and Randwick projects must stay distinct from their dedicated service pages. The cost-driver article supports `/packages/`, the settled primary cost/package owner.
- **Commercial accessible/disabled/NDIS/seniors targeting is held under D-161.** Informational articles are not authorization for a specialist service. Standalone laundry, tiling, repair/refinishing, kitchens, competitor brands and unconfirmed places are excluded from targeting. Broad queries remain held when page fit is not established.
- **Legacy URLs are not new optimization pages.** Observed final destinations: `/packages-deals/` → `/packages/`; `/artarmon-bathroom-renovation/` → `/services/bathroom-renovations/`; non-www home → www home; `/calendly/` → `/contact-us/` (challenge). These destinations match settled routing. Historical GSC rows alone do not justify reversing D-71/D-142/D-165 or claiming present cannibalization.
- **No new suburb page is authorized.** The joined evidence helps existing issue #72, but its volume/promotion gate remains unresolved. Preserve the approved location architecture.

## Page and query records

Every sitemap URL has a row in `page-dispositions.csv`:

| Disposition | Pages | Meaning |
|---|---:|---|
| IMPROVE | 5 | The concrete deliverables above. |
| IMPROVE_SUPPORTING_LINKS | 6 | Named donor articles; subject coverage stays. Conditional donor edits still need contextual fit. |
| KEEP_NO_VERIFIED_GAP | 47 | No concrete additional change established; this does not claim perfection. |
| KEEP_NO_QUALIFIED_SIGNAL | 51 | No query clears this task's position/impression screening. |
| HOLD_QUERY_FIT | 3 | Screened query intent does not establish a fitting target. |
| HOLD_BUSINESS_SCOPE | 2 | Informational accessibility/ageing role only. |
| HOLD_FETCH_VERIFICATION | 1 | Contact needs browser verification because automated fetch was challenged. |

Every raw query/page row has a disposition and reason in `query-page-decisions.csv`. Only 37 rows are directly associated with the five issues: 23 content-gap rows, 3 correction/routing rows and 11 waterproofing inlink rows. That number is a set of observations, not unique searchers or keyword search volume. Other rows are kept, rejected or held rather than automatically rewritten. `query-page-screening.csv` retains the initial mechanical screen; its exact-match fields are diagnostics only, never acceptance criteria.

## Important evidence limits

- GSC average position is an aggregate, displayed to one decimal by this MCP. It is not a stable rank; boundary precision would need checking if a row displayed 15.0 or 80.0. No screened row in this pull required that boundary hold.
- A 90-day aggregate cannot establish recurring demand, Australian-only traffic, a device pattern or a recent trend. Counts below 10 were held; prefer at least 20 for a standalone target. Lower-count variants may support a larger independently evidenced intent, not justify a new section on their own. These are conservative editorial heuristics, not Google rules.
- Cross-page query impressions can overlap. Do not sum them into a unique-query demand total. The API also does not guarantee every data row; anonymized/internal limits still apply even though fewer than 25,000 rows were returned.
- The MCP reports that this pull exhausted the monthly free allowance; reset is **2026-12-01 00:00 UTC**. No additional date/country/device/comparison pull was made. The audit can be reproduced from the saved data without further MCP usage.
- Opus returned a weekly-limit HTTP 429 before inference. The owner explicitly authorized the current model; a dedicated separate reviewer inspected source and the coordinator checked the relevant live HTML. No Opus findings are claimed.
- This was a served-HTML/source audit, not a browser design review, Lighthouse run, indexed-state inspection or proof of a ranking improvement. Those checks are not represented as completed.

## How to execute and prove the result

Use the metadata/H1/first-answer/heading/FAQ decisions in each issue, including explicit KEEP where already appropriate. Give each useful query cluster one suitable home and link contextual mentions to its dedicated page. Add content only for the identified missing answer. Keep image alt text and filenames truthful to the existing photo; never relabel a room, suburb or project to match a query.

Follow the plan's build, served-HTML, FAQ parity, readability, 390/1440 browser, independent critique and performance gates. There is already owner authorization to push this task's verified changes live. First reconcile active file ownership and every commit in the proposed push; the current branch had six unrelated unpublished commits and substantial concurrent edits when this task started. Do not silently publish that unrelated work. Re-fetch production after deployment and record the exact shipped commit/date.

For outcomes, the saved 90-day rows are a historical baseline. When data access permits, obtain a finalized equal-length pre-deployment control window; compare the same query/page cohorts after recrawl, initially at 28 days and at 56–90 days if sparse. Assess impressions/clicks, CTR at comparable positions and actual enquiries/call events. A successful deployment proves implementation, not ranking improvement.

## Reproducible checks and sources

`audit_live.py` collected the sitemap and page extraction with BeautifulSoup and standard-library HTTP, recording final URLs, SHA-256 of served HTML, metadata, main content, links, image attributes and schema. Running it again makes a new observation and overwrites the snapshot; preserve this baseline before doing so. `finalize_triage.py` reads the saved evidence without network calls, writes the decision ledgers and validates row preservation, page inventory, H1/canonical checks and specific missing-link observations. The KEEP/HOLD rules are explicitly conservative and do not automatically publish anything.

Google recommends descriptive concise titles and avoiding keyword repetition: [title-link guidance](https://developers.google.com/search/docs/appearance/title-link). Image descriptions should be useful and accurate, with descriptive filenames and contextual alt rather than stuffed terms: [image guidance](https://developers.google.com/search/docs/appearance/google-images). Data shape and API completeness limits: [Search Analytics query reference](https://developers.google.com/webmaster-tools/v1/searchanalytics/query). For the DIY issue, verify the actual categories/thresholds before making licensing statements: [NSW waterproofing work](https://www.nsw.gov.au/business-and-economy/licences-and-credentials/building-and-trade-licences-and-registrations/waterproofing-work).

No application file, dependency, image, website content, metadata or deployment was changed by this audit session. The plan and evidence are local artifacts; references to them in GitHub issues become remotely browsable once those task-owned files are committed and published through the verified delivery workflow.
