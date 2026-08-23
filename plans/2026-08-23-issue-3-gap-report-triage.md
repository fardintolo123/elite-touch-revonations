# Plan — Triage GitHub issue #3 ("gaps") topic-gap report

**Date:** 2026-08-23
**Task class:** Third-party SEO tool report intake. Routed via `CLAUDE.md` → Task Routing:
"Third-party SEO tool report (cannibalisation · gap · audit PDF) → `docs/SEO_CONTENT_GUIDE.md` →
*Report intake*. **Do not action one as written**."

## What issue #3 is

Owner-filed issue titled "gaps", body is a single attachment: a "Topic Gap Analysis Report"
(generated 2026-08-10) comparing `www.elitetouchrenovations.au` against `sydneyeastbuilding.com.au`,
produced by a third-party tool and branded with a pitch for `HeyTony.ca` content-strategy services
at the end. 20 claimed gaps (10 "money page", 10 blog).

## Report intake — applying `docs/SEO_CONTENT_GUIDE.md` §3, six rules

1. **Triage against existing structure first.**
   - "Location-Specific Service Pages" gap claims ETR has only "a single Artarmon page" — **false**:
     six Tier-1 suburb pages plus North Shore, Hills District and Eastern Suburbs hubs are live
     (D-71–D-74), including **Randwick**, which is in the Eastern Suburbs — the exact region this
     competitor covers. The report is working from stale or incomplete crawl data.
   - "Team & Expertise Pages" gap is already closed — About page carries all four Dawoods' roles
     and credentials (D-50).
2. **No volume/difficulty per item.** The report is purely "competitor has a URL for X" — zero
   search volume, zero difficulty, for any of the 20 items. Per the guide, that alone cannot
   justify creating anything.
3. **One-directional, and the "competitor" isn't a real competitor.** `sydneyeastbuilding.com.au`
   is a full-scale home builder (double-storey homes, duplexes, granny flats, pools, landscaping —
   220 pages) — not a bathroom-renovation specialist. Comparing its page count to a 4-service,
   10-page niche site is not a like-for-like gap analysis.
4. N/A — no hub-vs-spoke duplication claims in this report.
5. **Service scope is an owner question.** 18 of the 20 items (double-storey homes, duplexes,
   granny flats, single-storey homes, pools, landscaping, and their blog equivalents) are services
   ETR does not offer per `DECISIONS.md` D-01. Building pages for them is a trade-scope expansion,
   not an SEO fix, and needs the owner — not a competitor's sitemap.
6. **Record the verdict** — done below, D-85/D-86.

## Verdict

- **Reject 18 of 20 items outright** — out of scope (D-01) or already-settled architecture
  (D-02 standalone waterproofing/leak-repair; D-10/D-71/D-74 suburb-page volume-evidence rule).
- **One candidate for future keyword research, not immediate build:** bathroom-specific blog
  content (planning/pitfalls/process). No blog exists on the site at all yet. Do not build without
  the same GKP/Ahrefs volume evidence every other content decision here has required.
- **One minor, evidence-bound opportunity:** case-study pages could go deeper (timeline,
  challenges) using real project detail already on file — but never add "before/after" labelling
  without a genuine matched pair (D-06).

## Checklist

- [x] Downloaded and read the full PDF (6 pages)
- [x] Cross-checked its claims against `service-areas.json` and the live route list
- [x] Applied all six Report-intake rules from `docs/SEO_CONTENT_GUIDE.md`
- [x] Preserved the source PDF at `docs/source-copy/pdf/topic-gap-report-2026-08-10.pdf`
- [x] Recorded the verdict in `DECISIONS.md` (D-85, D-86)
- [x] Closed GitHub issue #3 with the triage summary as a comment
