# Plan — Issue #12: AnswerThePublic content-idea report triage

**Date:** 2026-08-26
**Task class:** SEO / content strategy. Routed via `CLAUDE.md` → Task Routing: "Third-party SEO tool
report" → `docs/SEO_CONTENT_GUIDE.md` § Report intake ("do not action one as written").

## What issue #12 is

Owner-filed issue titled "to improve seo", body is a single 1920×8337px screenshot of
AnswerThePublic's "Content Studio → Suggested For You" AI-content-idea tool for the project
"Elitetouchrenovations." Read in full (split into 6 vertical slices for review — the tool renders as
one long scrolling page).

Header claims "50 content ideas." The visible table only shows **20** rows ("Showing 20 of 20
results") across **10 topic clusters**, 2 keywords unlocked per cluster, the rest gated behind
"Create a free account to see more content suggestions." **Every visible `Volume` cell reads
"Niche"** (the same word repeated for all 20 rows) and the `Opportunity` / `Intent` columns are
entirely blurred/locked. **No usable search-volume or difficulty figure is visible anywhere in the
report** — this is a marketing upsell screen, not keyword research.

The 10 clusters (cluster name — the two unlocked seed keywords):

1. Bathroom renovation cost sydney — *bathroom renovation cost sydney* / *how much to renovate
   bathroom sydney*
2. How bathroom waterproofing works — *bathroom waterproofing australia* / *as 3740 waterproofing*
3. Bathroom renovation process explained — *bathroom renovation steps australia* / *how long does
   bathroom reno take*
4. Signs your bathroom needs renovation — *bathroom renovation signs australia* / *old bathroom
   problems*
5. Ensuite vs main bathroom renovation — *ensuite renovation sydney* / *main bathroom vs ensuite
   reno*
6. Choosing bathroom tiles in australia — *bathroom tiles sydney* / *best bathroom tiles australia*
7. Bathroom renovation fixed price vs hourly — *fixed price bathroom renovation sydney* / *bathroom
   quote in writing*
8. Powder room renovation ideas sydney — *powder room renovation sydney* / *small bathroom reno
   australia*
9. Bathroom and laundry combined renovation — *bathroom laundry renovation sydney* / *combined wet
   area reno*
10. Hiring a licensed bathroom renovator nsw — *nsw licensed bathroom renovator* / *builder licence
    nsw bathroom*

## Read first

- `docs/SEO_CONTENT_GUIDE.md` §2 (publishing priority) and §3 (Report-intake rules).
- `docs/BATHROOM_SITE_STRUCTURE.md` lines 118–137 (GKP-confirmed adjacent-keyword table).
- `DECISIONS.md` D-01/D-02 (four services, no standalone waterproofing/repair), D-86/D-88/D-104/
  D-105 (blog stays a candidate, not built; prior third-party report triage precedent).
- No `/blog` route exists anywhere in `app/` — confirmed by directory search.

## Per-cluster triage against real evidence

Cross-checked all 10 clusters against `docs/BATHROOM_SITE_STRUCTURE.md`'s own GKP-confirmed table
(gathered independently, before this issue existed) and against D-01's four confirmed services.

| # | Cluster | Verdict | Why |
|---|---|---|---|
| 1 | Cost sydney | **No new action** | Already GKP-confirmed (100–1K, Medium) and already the priority-6 cost/pricing guide, already triaged in D-104/D-105 from issue #11. This report adds no new evidence, just repeats a known opportunity. |
| 2 | Waterproofing | **Bounded, not standalone** | GKP shows real but modest volume (`bathroom waterproofing sydney`, 10–100, Medium). `BATHROOM_SITE_STRUCTURE.md` line 137 is explicit: only worth a dedicated page **if repairs are an actual offered service** — they are not (D-02: no standalone waterproofing/repair service). Content here must stay a trust/process section (AS 3740 explanation) inside an existing service or case-study page, never its own URL, or it silently reopens D-02. |
| 3 | Process explained | **Candidate only, folds into priority 7** | No independent volume evidence (AnswerThePublic's own volume data is locked). Topically this is exactly `docs/SEO_CONTENT_GUIDE.md` §2 priority 7's already-planned "how long it takes / what to expect" buyer-support guide — this report doesn't add evidence, it corroborates a topic already on the roadmap. |
| 4 | Signs you need a reno | **Candidate only, low priority** | No volume evidence. Generic top-of-funnel content, not tied to a specific ETR service or trust signal. Weakest lead-generation case of the ten. |
| 5 | Ensuite vs main | **REJECTED, re-confirms prior finding** | `BATHROOM_SITE_STRUCTURE.md` line 133 already tested `ensuite renovation sydney` in GKP: **No data**, explicitly flagged to deprioritize (line 137). This report supplies no volume of its own (locked), so there is no new evidence to reopen that finding. |
| 6 | Choosing tiles | **Fold into existing pages** | Adjacent to `bathroom colour schemes` (100–1K, Medium) which `docs/SEO_CONTENT_GUIDE.md` §2 priority 8 already places in "design-inspiration content — fold into existing pages, not standalone URLs." No new volume evidence for tiles specifically. |
| 7 | Fixed price vs hourly | **Candidate only, folds into priority 7** | No independent volume evidence. Matches priority 7's "what a quote should include" almost exactly, and ties directly to ETR's real "fixed-scope written quotes" trust signal — a genuine differentiator, not filler, but still gated on the same evidence bar as every other candidate. |
| 8 | Powder room / small bathroom | **Strongest finding — IMPROVE existing page, not a blog post** | `powder room` is one of D-01's four real services, and its second keyword, "small bathroom reno," lines up with `BATHROOM_SITE_STRUCTURE.md`'s own GKP-confirmed second-tier opportunity — `small bathroom renovation sydney`, 100–1K, High competition (line 126), already named as "worth building" as a small-bathroom-specific page (line 137) alongside the cost guide. This is real, pre-existing evidence, not something this report discovered. It supports strengthening the **existing powder-room service page** (or the planned small-bathroom content) with this angle — not opening a new blog post. |
| 9 | Bathroom + laundry combined | **REJECTED, re-confirms prior finding** | `BATHROOM_SITE_STRUCTURE.md` line 131 already tested `bathroom and laundry renovation sydney` in GKP: **No data**, explicitly flagged to deprioritize (line 137). Same as cluster 5 — no new evidence in this report to reopen it. |
| 10 | Hiring a licensed renovator | **Candidate only, folds into priority 7** | No independent volume evidence. Matches priority 7's "choosing a renovator" almost exactly, and ties to the real licence 475204C trust signal. Same gating as clusters 3 and 7. |

## Recommendation

**No new blog vertical, and none of the 10 clusters becomes a standalone blog post.** This confirms
D-86/D-88/D-104/D-105 unchanged: a general blog remains a **candidate**, not a commitment, until real
GKP/Ahrefs volume data exists for a specific topic — AnswerThePublic's own volume/difficulty data for
every one of these 20 keywords is locked behind a paywall this repo has not paid for, so per
`docs/SEO_CONTENT_GUIDE.md` §3 rule 2 ("a gap report without volume + difficulty per item cannot
justify CREATE"), none of it clears the bar.

Two things genuinely move as a result of this issue:

1. **Cluster 8 (powder room / small bathroom)** independently corroborates an already-GKP-confirmed
   opportunity. Recommend folding "small bathroom" language into the existing powder-room service
   page content when it's next touched — **IMPROVE, not CREATE.**
2. **Clusters 3, 7 and 10** (process, fixed-price-vs-hourly, hiring-a-licensed-renovator) independently
   corroborate the topic set already named in `docs/SEO_CONTENT_GUIDE.md` §2 priority 7
   ("buyer-support guides"). This doesn't move them up the priority queue — priorities 1–6 (four
   service pages, near-me, six Tier-1 suburbs, hubs, case studies, cost guide) still come first — but
   when priority 7 is reached, these three angles plus the existing "what a quote should include" /
   "how long it takes" items likely consolidate into one or two buyer-support guide pages (mirroring
   how D-104 merged three cost questions into one cost-guide page), not four separate posts.

**On "bring clients, not just traffic"** (the owner's framing in this task): the clusters with a real
line to an enquiry are the ones tied to a considered-purchase moment and an existing ETR trust
signal — cost (already planned), powder-room/small-bathroom (real service + real volume), choosing a
*licensed* renovator (licence 475204C), and a written fixed-price quote (ETR's actual quoting
process). The clusters with no such tie — signs-you-need-a-reno, tiles, ensuite-vs-main,
laundry-combined — are generic top-of-funnel content-marketing bait with no volume evidence behind
them; building those first would add traffic without a credible path to a bathroom-renovation
enquiry, which is the opposite of what a four-service, high-ticket trade site needs.

**Not done in this session** — this is analysis and a recorded decision (D-106/D-107) only. Building
or improving any page is a separate, owner-confirmed next step.

## Checklist

- [x] Downloaded and read the full issue #12 screenshot (split into slices; single image otherwise
      exceeds readable height)
- [x] Read `docs/SEO_CONTENT_GUIDE.md` §2/§3, `docs/BATHROOM_SITE_STRUCTURE.md` GKP table,
      `DECISIONS.md` D-01/D-02/D-86/D-88/D-104/D-105
- [x] Confirmed no `/blog` route exists yet
- [x] Triaged all 10 clusters individually against real GKP evidence and D-01 service scope
- [x] Verdict recorded in `DECISIONS.md` (D-106, D-107)
- [x] Powder-room page improved (2026-08-27, owner: "go ahead"): real "about" paragraph (small
      1.5–3 m² footprint) + 4-question FAQ block + `FAQPage` schema, added only to
      `powder-room-renovations` via new optional `about`/`faqs` fields in `lib/businessInfo.ts` and
      rendered in `app/services/[slug]/page.tsx`. All content sourced from
      `docs/source-copy/svc-powder.md` — nothing invented. `npm run build` verified at 30 routes; new
      copy + schema confirmed present in served HTML on `/services/powder-room-renovations/`; the
      other three service pages verified unchanged. Recorded as D-107.
- [ ] Priority-7 buyer-support guide(s) (process / fixed-price-vs-hourly / hiring-a-licensed-renovator)
      remain a later-priority candidate, not built this session — priorities 1–6 come first per
      `docs/SEO_CONTENT_GUIDE.md` §2.
- [ ] Issue #12 closed with a link to this plan and the decision rows
