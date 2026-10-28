# Plan — Outside SEO/web consultant tips triage (2026-10)

**Outcome owned:** decide which of ~20 generic tips from an outside SEO/web person are useful for Elite
Touch, and queue only those as small, non-overlapping GitHub issues. Owner goal (2026-10-25): more
impressions, clicks, calls and enquiries. The 4 Elements Painting verdicts are in that repo's
`plans/consultant_tips_triage_2026-10_plan.md`.

**Status:** triage done; issues E1–E5 opened from the checklist below.

## Evidence used
- `components/EnquiryForm.tsx`: one-screen form; name/phone/email required; suburb, service, notes and
  up to 2 photos optional; button "Request my free measure"; events `form_start`,
  `form_submit_attempt`, `form_submit_error` (`error_code` = `validation` | `server_error`),
  `generate_lead`. Success copy (`lib/actions.ts:154`): "Thanks - we will be in touch." plus a
  "Leave a Google review" link.
- D-10/D-140 (Tier-1 suburb rule; GSC 2026-09-14 showed Hornsby, Artarmon, Pymble, Five Dock, Balmain
  but did not reopen D-10), D-12 + D-138 ("near me" handled by homepage + main service page), D-02 (leak
  repair is not a service), D-06 (no invented budgets/durations), D-30 (no animation libraries),
  D-60/D-61 (package prices), D-80 (form on every page), D-142 (new domain; ranking positions 20–90 are
  the bottleneck; citations deferred by owner), D-152 (hero CTA jumps to the form).
- `docs/reel-library/DeuK_-UCwPv.md` in the 4 Elements repo: local commit `ee74a0e` (hero room
  handoff + review proof in the contact card) is **on the owner's machine and not on GitHub**. GitHub
  `main` is `906c506`. Any form issue must start after that commit is pushed or abandoned.

## Verdicts
| Tip | Verdict |
|---|---|
| Multi-step questionnaire | Not now. Form is already short, one screen, mostly optional; a step split would be untestable at current traffic |
| "What can you see?" visual selector | Not now. Customers renovating a bathroom know the room; service select already covers it |
| Post-submission engagement | **E2** — real next steps; no calendar (owner: Calendly not used) and no reply-time figure (D-155) |
| Budget + timeline | **E3** timing chips; budget field rejected (D-155 — owner delegated) |
| Interlinking | Already done (D-118, generated hub links) |
| Location + service pages | **E5** — evidence test only (D-10) |
| Form drop-off tracking | **E1** — make `error_code` say which field failed; no GTM change needed |
| Title tags | Already done (D-120/D-124/D-127) |
| Action-oriented button | Already done ("Request my free measure") |
| Case-study pricing | **E4** — owner-supplied price range + duration per gallery project (D-06) |
| Strong visuals / GBP | Site done (D-83, WorkStrip); GBP owner-side |
| Interactive visualiser | Rejected for now: new domain, ranking is the bottleneck (D-142); real material catalogue not available; D-30 |
| "Near me" pages | Rejected — settled by D-12/D-138 |
| Work-stage animation | Not needed; process and build durations are stated as text (D-75) |
| Animation tied to form | Already done where useful (D-152) |
| Visuals in form | Photos upload done (D-150) |
| Contact below hero | Done (D-152, D-80) |
| Project pages | Done (11 gallery projects, D-64/D-116) |
| Emergency pages (owner follow-up) | Rejected — D-02 |

## Checklist / issue map
| Id | Issue | Parallel | Depends on | Owns |
|---|---|---|---|---|
| E1 | [Analytics] Field-level `error_code` on `form_submit_error` | NO | None — prerequisite landed as `0ee561b` | `components/EnquiryForm.tsx` |
| E2 | [Conversion] "What happens next" success message | NO | E1 (same file) | `components/EnquiryForm.tsx` (success block), `lib/actions.ts:154` |
| E3 | [Conversion] Optional start-timing chips | NO | E2 (same files) | `components/EnquiryForm.tsx`, `lib/actions.ts`, `lib/enquiry.ts` |
| E4 | [Content] Price range + duration on gallery projects | YES (owner data) | Owner figures | `lib/projects.ts`, `app/gallery/[slug]/page.tsx` |
| E5 | [SEO] Query-by-page GSC test for Hornsby/Artarmon/Pymble | YES (owner export) | Owner GSC export | `docs/BATHROOM_SITE_STRUCTURE.md`, `DECISIONS.md` (append); `service-areas.json` only if promoted, and not while #67 edits it |

- [x] Triage
- [ ] E1 #68 — implemented and verified locally 2026-10-28; tick after the commit is pushed and the issue closes
- [ ] E2 #69 — implemented and verified locally 2026-10-28; tick after the commit is pushed and the issue closes
- [ ] E3 #70
- [ ] E4 #71
- [ ] E5 #72

All opened 2026-10-25; tick each item when its issue closes.

**Biggest lever, owner-side:** GBP reviews and verification, and the deferred citation work (D-142).
