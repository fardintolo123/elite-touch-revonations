# Plan — Why there is no blog and (partly) no per-area pages, and what to build

**Date:** 2026-09-09
**Raised from:** owner question — "the site has no blogs and no dedicated service page for each area
that we serve — why, and can we implement?"
**Routed per CLAUDE.md:** Suburb/location page → `docs/BATHROOM_SITE_STRUCTURE.md` + `service-areas.json`;
SEO/content strategy → `docs/SEO_CONTENT_GUIDE.md`; anything possibly settled → `DECISIONS.md`.
**Skill used:** `/seo-cluster` (strategy-import path — the site already holds cross-checked
Ahrefs + GKP volume data, so search budget was spent on SERP-overlap evidence not yet on file).

---

## 1. Findings — the "why"

### 1a. Area pages: partly built, not missing

| Layer | Status |
|---|---|
| Regional hubs published | **3 of 5** — Hills District, Eastern Suburbs, North Shore |
| Regional hubs dark (`hubPublished: false`, 404) | **2** — Inner West, North-Western Sydney |
| Tier-1 dedicated suburb pages | **0 of 6 built** — approved by D-10, never built |

The hubs are deliberate architecture, not an omission: **D-10** rejected a page-per-suburb as the
thin/doorway pattern, and **D-73** gates a region behind `hubPublished` so a data row cannot silently
become a URL. **D-74** kept Inner West and North-Western Sydney dark for one stated reason — no
photographed, suburb-attributed project in either region.

The **six Tier-1 suburb pages** (Baulkham Hills, Castle Hill, Kellyville, Marrickville, Ryde,
Randwick) are a different story. They already **passed the evidence gate** — cross-checked Ahrefs +
Google Keyword Planner, 500/mo on the three Hills suburbs and 100–1K/mo on the other three
(`docs/BATHROOM_SITE_STRUCTURE.md`). They were never built. Issue **#17** hit the consequence (hubs
linking to 404s), fixed the links, and explicitly put the pages themselves **out of scope** as a
"separate content project". Nothing has picked that project up since.

### 1b. Blog: deliberately not built, gate never cleared

Rejected or deferred **six separate times**: D-86, D-88, D-105, D-106, D-113, and again in
`plans/2026-08-31-seo-master-plan.md` §5 ("Blog / topic clusters — repeatedly rejected. Not
reopened."). The standing gate is real GKP/Ahrefs volume for a **specific query cluster with no home
on an existing page**, plus owner sign-off. Every topic proposed so far has failed one half or the
other — most were folded into `/packages/` (D-104) or the powder-room page (D-107) instead.

The `claude-blog` skill is installed but D-113 restricts it to internal drafting only — it must never
write ETR-facing copy unsupervised, because it auto-generates "sourced statistics" and review schema
on a site whose licence, ABN, warranty and 19 real reviews are load-bearing.

---

## 2. New evidence gathered this session (SERP overlap, `/seo-cluster` Step 2)

**Suburb term vs. its own hub term — zero shared URLs in the top 10.**

| Pair | Shared top-10 URLs | Skill threshold verdict |
|---|---|---|
| `bathroom renovations castle hill` ↔ `bathroom renovations hills district sydney` | **0** | **Separate pages** (0–1 = separate) |
| `bathroom renovations randwick` ↔ `bathroom renovations castle hill` | **0** | Separate |

Google treats the suburb term and the regional term as different queries with different winners. A
Castle Hill page would **not** cannibalise the Hills District hub — the cannibalisation risk D-10
worried about does not show up at the suburb-vs-hub boundary.

**Corroboration:** Prestige Bathroom Renovations ranks on *both* SERPs, on two different URLs
(`/locations/bathroom-renovations-hills-district/` and `/locations/bathroom-renovations-randwick/`).
The structure D-10 approved is the structure ranking competitors actually run.

**Blog-side check:** `how long does a bathroom renovation take sydney` returns a top 10 that is
**entirely informational articles**, several on literal `/blog/` paths — zero service pages. The
format that ranks for process questions is an article. **But** ETR already answers that exact
question on all three hubs (`lib/hubContent.ts`) with owner-corrected durations (D-75: 3–4 / 5–6 /
5–7 weeks). Per `docs/SEO_CONTENT_GUIDE.md` §3, a topic with an existing home is IMPROVE, not CREATE.
So this is **not** the clean "no home on an existing page" cluster D-86 asked for.

---

## 3. Finding that changes a settled decision

**D-74's stated blocker on the two dark hubs has been cleared by work done since.**

D-74 kept Inner West dark for "no photographed project" and North-Western Sydney for "neither article
mention nor photography." `lib/projects.ts` now contains:

- **Balmain bathroom** (`balmain-bathroom`) — Balmain is an Inner West suburb in `service-areas.json`.
- **Gladesville bathroom** (`gladesville-bathroom`) — Gladesville is a North-Western Sydney suburb.

Both regions now have exactly what D-74 required. `projectsInRegion()` will pick them up with no code
change — the hub renderer is already data-driven. This is **new evidence**, so revisiting D-74 is not
re-litigating it.

Inner West also has the strongest competitive opening on the site: `docs/BATHROOM_SITE_STRUCTURE.md`
records that **Marrickville has content-mill pages ranking** — a documented soft spot (D-17).

---

## 4. Recommendation — three tiers, by evidence strength

### Tier A — build now (evidence complete, no owner decision needed)

| # | Page | Issue | Evidence |
|---|---|---|---|
| A1 | **Inner West hub** — flip `hubPublished: true` + write `hubContent.ts` entry | **#49** | D-74 blocker cleared (Balmain project); Tier-1 Marrickville volume; article corroboration |
| A2 | **North-Western Sydney hub** — same | **#50** | D-74 blocker cleared (Gladesville project); Tier-1 Ryde volume |
| A3 | **Castle Hill** Tier-1 suburb page | **#52** | GKP 500/mo + Ahrefs >100; photographed Castle Hill project; SERP distinct from hub |
| A4 | **Randwick** Tier-1 suburb page | **#53** | GKP 100–1K; photographed Randwick project; SERP distinct from hub |

A3/A4 need a route change (**issue #51**): `app/services/[slug]/[location]/page.tsx` currently builds
regions only. Add a published-suburb list to `lib/locations.ts` (issue #17 option (a): a
`pagePublished` flag on the suburb record) so the hub's existing suburb `<Link>`s light up
automatically instead of 404ing.

Recording the D-74 revisit in `DECISIONS.md` is **issue #48**, and gates A1/A2.

### Tier B — hold (volume evidence yes, local proof no) — **issue #54**

Baulkham Hills, Kellyville, Marrickville, Ryde. All four cleared D-10's volume bar, but **none has a
photographed project** — the same proof bar D-74 applied to hubs and the same reason those hubs stayed
dark. Building them now means templated copy, which is exactly the page D-10 exists to prevent.
**Unblock by:** photographing one job in each suburb, or the owner supplying real, specific local
detail. Marrickville is the highest-value of the four (documented content-mill soft spot).

### Tier C — resolved: improve existing near-me surface — **issue #55**

The blog gate is **not** cleared and I am not going to declare it cleared on a SERP-format observation
alone. Two honest paths:

- **C1 — Don't build a blog.** Consistent with six prior decisions. Instead spend the effort on the
  **"bathroom renovations near me" opportunity: 1K–10K/mo, the single largest volume figure in the
  entire project** (`docs/BATHROOM_SITE_STRUCTURE.md`), currently untargeted by any page. This is
  homepage/service-page optimisation, not blog work, and it outranks every blog topic on volume.
- **C2 — Gather the evidence first.** Run a GKP pull on a defined process/buyer-question cluster
  (timeline, what-to-expect, choosing a licensed renovator, strata approval, fixed-price vs hourly).
  If a cluster clears volume **and** has no home on an existing page, D-86 is satisfied and a small,
  tightly-scoped blog can be proposed with real numbers.

**Implemented: C1.** "Near me" is a bigger, cheaper, already-evidenced win than any blog post, and
it does not require reversing anything. The homepage now names "near you in Sydney" in its metadata,
H1, opening answer and area-links section. C2 remains a future evidence-gathering path, not a blog
commitment.

---

## 5. Checklist

- [x] Route task; read `DECISIONS.md`, `BATHROOM_SITE_STRUCTURE.md`, `SEO_CONTENT_GUIDE.md`, master plan
- [x] Verify claims against code — `lib/locations.ts`, `service-areas.json`, `app/sitemap.ts`, `lib/projects.ts`
- [x] Run `/seo-cluster` SERP-overlap step; record results
- [x] Identify D-74 blocker-cleared finding
- [x] Open issues per CLAUDE.md Issue Workflow, dependency-ordered, each citing its line here — **#48–#55**
- [x] Owner picks scope (Tier A all four / subset / plus Tier C path) — **#55** resolved as C1
- [x] Record D-74 revisit + SERP-overlap evidence in `DECISIONS.md` — **#48** *(gates #49, #50)*
- [x] Write `lib/hubContent.ts` entry — Inner West **#49** — real local detail only, D-06
- [x] Write `lib/hubContent.ts` entry — North-Western Sydney **#50** — real local detail only, D-06
- [x] Add `pagePublished` suburb gating — **#51** *(gates #52, #53)*
- [x] Build Castle Hill **#52**, then Randwick **#53**
- [x] Build green, route count up not down; `curl` each new URL for served copy
- [x] Session handoff file — `session-history/2026-09-09-blog-and-location-page-gap-analysis.md`

### Issue set (dependency order — execute top down, keep "in progress" to one)

| Order | Issue | Deliverable | Blocked by |
|---|---|---|---|
| 1 | **#48** | Record D-74 revisit + SERP evidence in `DECISIONS.md` | — |
| 2 | **#51** | `pagePublished` suburb routing (no content) | — *(parallel with #48)* |
| 3 | **#49** | Inner West hub | #48 |
| 4 | **#50** | North-Western Sydney hub | #48, do after #49 |
| 5 | **#52** | Castle Hill Tier-1 page | #51 |
| 6 | **#53** | Randwick Tier-1 page | #51, do after #52 |
| — | **#54** | 4 remaining Tier-1 suburbs | **BLOCKED — owner photography** |
| — | **#55** | Blog vs "near me" | **DONE — C1 implemented on the homepage; blog remains evidence-gated** |

Per `CLAUDE.md` Issue Workflow: when a checklist line above is ticked, its linked issue is closed or
updated in the **same** change — not a follow-up pass.

## 6. Facts I must not invent (CLAUDE.md Business Rules)

Local detail for Inner West / North-Western Sydney hubs and the two suburb pages must come from
`lib/projects.ts`, `docs/source-copy/`, `Customer Reviews.md`, or an owner message. No invented
suburb characteristics, no "before/after" without a matched pair, no testimonial attributed to a
suburb (no review names one).
