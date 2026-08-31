# Session Summary

> **Note on timing.** This file documents the work done *in this conversation*. While this
> conversation was still open, a separate/parallel session made further changes to the same repo
> (an MVP Next.js codebase now exists, a second photo batch was processed, and the family-member
> fact this session recorded as D-37 was superseded by that later session's D-50, which found a
> **fourth** family member, Mohammed). Those later changes are real and current but are **not**
> part of this session's work — see `DECISIONS.md` and `PROJECT_CONTEXT.md` for the live state.
> This file describes only what happened here, for the record.

## 1. Session Objective

Two linked pieces of work, both from the owner (Omar):

1. **Turn the owner's ad-hoc "image asset workflow" instructions into a permanent project rule**,
   so future sessions follow the Detect → Inventory → Verify → Flag → Approve → Add to repo →
   Commit → Use public asset URL → Add accurate alt text pipeline automatically instead of being
   re-briefed every session.
2. **Actually run Detect → Inventory → Verify on the 33 ETR photos + 1 root file** that prompted
   the rule, surface anything uncertain, and get the owner's call on what came up.

## 2. Work Completed

**(a) Codified the image workflow as a standing rule — IMPLEMENTED**
- Added **D-36** to `DECISIONS.md` (§3, standing engineering decisions): the 8-step pipeline,
  applies to the 33 initial photos and every image added later.
- Expanded `PROJECT_CONTEXT.md` K5 with the full 9-point workflow detail (this is the "mechanic"
  home per the doc's own hierarchy — `DECISIONS.md` holds the verdict, `PROJECT_CONTEXT.md` the
  how).
- Updated `CLAUDE.md`'s Documentation Map and Task Routing table to point at both, instead of
  duplicating the workflow text a third time.

**(b) Ran the workflow on all 34 files — IMPLEMENTED**
- Opened and visually inspected every file in `ETR images/` (19), `ETR images and reviews/` (14),
  and the repo-root loose `.jpg` (1) — none were assumed from filename/folder (the WhatsApp export
  names carry no descriptive information).
- Discovered the root `.jpg` is not a project photo — it's the **ETR logo**, and it reveals the
  full legal entity name **"Elite Touch Renovations Pty Ltd."** Recorded in `PROJECT_CONTEXT.md`
  §1 next to the ABN/ACN gap.
- Discovered `ETR images and reviews/` contains **no raw photos at all** — all 14 files are
  pre-made marketing graphics (testimonial cards, a team-intro graphic, a package-price promo, two
  before/after collages, and six "___ Luxe" styled mood-board graphics).
- Cross-matched several photos across both folders by tile pattern / fixture combination (not
  filename) to identify which "raw" photos and "Luxe" template graphics show the *same* physical
  bathroom, vs. genuinely different projects.
- Created **`docs/IMAGE_INVENTORY.md`** — a full per-file table (what each shows, interior/exterior,
  raw-photo vs. template-graphic, same-room groupings) plus a flags section, following the
  Detect/Inventory/Verify/Flag structure.
- Cross-checked the two testimonial graphics with matching names against `Customer Reviews.md` —
  found small verbatim drift (not a fabrication, just paraphrase) in the Peta Grund and Ken Chen
  graphics.

**(c) Surfaced 3 flags; owner resolved all 3 — IMPLEMENTED**
1. A testimonial graphic attributed to **"Kieran C"** quoting a Carrara-marble tiling review does
   not exist in `Customer Reviews.md` (18 reviews at the time). Owner confirmed it's genuine →
   added verbatim as the **19th review** in `Customer Reviews.md`. Review count updated from 18 to
   19 in `CLAUDE.md` (Project Overview table + Documentation Map), `DECISIONS.md` (D-03),
   `PROJECT_CONTEXT.md` (K2), and `docs/SEO_CONTENT_GUIDE.md`.
2. A "Meet Our Family Team" graphic named a third principal, **Farah Dawood (Architectural
   Designer)**, not previously documented anywhere (every doc only ever said "Omar and Adam").
   Owner confirmed → recorded as **D-37** and added to the family/principals fact in `CLAUDE.md`
   and `PROJECT_CONTEXT.md`. *(Superseded by the later, parallel session's D-50, which found a
   fourth member, Mohammed — not something this session saw or verified.)*
3. Several "___ Luxe" styled graphics looked more like a generic content-pack (blurred bokeh
   backgrounds, generic colour-psychology ad copy) than ETR's own job photography. Owner confirmed
   they're all genuine ETR work, not stock → recorded as **D-38**.

**(d) Consent and attribution — IMPLEMENTED**
- Owner separately confirmed: (i) he has customer consent to publish every photo in the inventory,
  and (ii) neither he nor the repo knows which suburb, street, or project any individual photo
  belongs to.
- Recorded as **D-39** (consent confirmed; explicit instruction that photos stay unattributed —
  never invent or infer a suburb/case-study match, per the existing D-06 rule).
- `DECISIONS.md` O-4 marked resolved with that caveat; `PROJECT_CONTEXT.md` K6 marked resolved;
  `docs/IMAGE_INVENTORY.md`'s closing section updated to match.

**No code was written or run this session** — the codebase did not exist yet at this point in the
conversation (see the timing note above; it exists now, from the parallel session).

## 3. Important Decisions

**Decision: Document the image workflow once, in three places by role, not as duplicated text.**
- **Reason:** `CLAUDE.md`'s own hierarchy already splits verdict (`DECISIONS.md`) from mechanic
  (`PROJECT_CONTEXT.md`) from routing pointer (`CLAUDE.md`). Writing the full 9-step pipeline into
  all three would immediately drift out of sync.
- **Alternatives considered:** put the full text only in `CLAUDE.md` (rejected — that file is
  meant to be a short entry point, not a detail store); put it only in a new standalone doc
  (rejected — nothing in the existing doc map would route a future session to it reliably).
- **Why preferred:** matches the project's existing, explicit documentation-hierarchy rule.

**Decision: Add Kieran C's review to `Customer Reviews.md` only after explicit owner confirmation,
not on inference.**
- **Reason:** D-03 requires every review to be real and owner-verifiable; a testimonial appearing
  in a marketing graphic but absent from the canonical reviews file is exactly the fabricated-content
  risk the project's rules exist to catch.
- **Alternatives considered:** treat it as probably-real because it's stylistically consistent with
  the other 18 (rejected — "probably real" is not evidence on a licensed builder's site); silently
  drop it (rejected — it's likely a genuine review the owner just hadn't logged yet, and dropping
  a real testimonial has a cost too).
- **Why preferred:** ask, don't guess — the owner is the only authority on whether it's real.

**Decision: Photos stay unattributed (no suburb, no case-study match) rather than inferring one.**
- **Reason:** the owner does not know, and neither the "Luxe" template captions nor the folder
  structure give reliable evidence.
- **Alternatives considered:** matching photos to the three documented case studies by "best guess"
  from visual style (rejected outright — this is precisely the invented-project-detail failure mode
  D-06 exists to prevent).
- **Why preferred:** general/unattributed use (galleries, "our work" sections) still gets full value
  from the photos without making an unsupported claim.

## 4. Permanent Rules / Lessons

- **The image workflow (D-36) is now a standing rule** — do not re-explain it to the user in future
  sessions; check `PROJECT_CONTEXT.md` K5 / `docs/IMAGE_INVENTORY.md` first.
- **Pre-made marketing graphics in this repo are not reliably verbatim** even when they quote a real
  review — always copy review text from `Customer Reviews.md` itself, never transcribe it off an
  image.
- **Filenames (WhatsApp exports) carry zero descriptive signal** in this repo — every image claim
  needs independent visual verification, confirmed again by this session's audit.
- **The same physical bathroom can appear multiple times** across raw photos and templated graphics,
  cropped/recoloured differently. Cross-check by tile pattern + fixture combination before treating
  two files as different projects, not by filename or folder.
- **"Photos exist" and "consent to publish" and "know which project/suburb they're from" are three
  separate facts** — this session got clean confirmation on the first two but the third stays
  permanently unknown for this batch. Don't conflate having consent with having attribution.

## 5. Things We Explicitly Decided NOT To Do

- **Did not** treat any "Luxe" template graphic as usable/attributable before asking — even though
  several were visually confirmed as the same room as a raw, ETR-watermarked photo.
- **Did not** guess which of the three documented case studies (The Rocks, Hunters Hill, Artarmon)
  any photo belongs to, despite some superficial style overlap — the owner explicitly does not know,
  and this repo's rules (D-06) forbid inventing that link.
- **Did not** run the "Add to repo / Commit / Use public asset URL" workflow steps — no site
  framework or asset directory exists yet at the point this conversation reached them (K3/K9 in
  `PROJECT_CONTEXT.md`, at the time of writing).
- **Did not** correct the small verbatim drift in the Peta Grund/Ken Chen testimonial *graphics*
  themselves (they're marketing assets, not source-of-truth text) — instead flagged that any future
  use of that text must come from `Customer Reviews.md`, not the graphic.

## 6. Current Project State

**At the end of this session's own work** (before the parallel session's later changes):
- No site code existed yet — this was a documentation- and content-only session.
- All 34 image files (33 photos + logo) were inventoried, verified, and — for the 3 flagged
  items — approved by the owner. Consent for all was confirmed.
- Review count: 19 (was 18), consistent across all docs this session touched.
- Family/principals: 3 named (Omar, Adam, Farah) as of this session's D-37 — **since superseded**
  by a fourth (Mohammed) found in the parallel session's D-50; this session did not see or verify
  that.
- No image has been added to the repo, committed, or given a public asset URL — that step is
  blocked on the stack/hosting choice (K3) and an asset-directory decision (K9), neither settled
  during this session.

**Known limitation carried forward:** none of the 33 original photos can be matched to a suburb,
street, or named project, and per D-39 they must not be labelled as if they could.

## 7. Files Changed

| File | Change | Reason |
|------|--------|--------|
| `CLAUDE.md` | Added image-workflow pointer to Doc Map + Task Routing; updated Dawood family line, review count 18→19 | Codify D-36; reflect D-37 and the new 19th review |
| `PROJECT_CONTEXT.md` | Expanded K5 with full workflow; added Legal entity name row; updated Owners row (Farah); marked K6 resolved | Mechanic detail for D-36; capture logo-derived legal name; record D-37/D-39 |
| `DECISIONS.md` | Added D-36, D-37, D-38, D-39; updated D-03 review count/note; resolved O-4 | Standing rule + all four owner-confirmed decisions from this session |
| `Customer Reviews.md` | Added Kieran C as 19th review (verbatim); updated header count | Owner-confirmed genuine review (Flag 1) |
| `docs/SEO_CONTENT_GUIDE.md` | Review count 18→19 | Keep count consistent everywhere it's cited |

## 8. Files Created

- **`docs/IMAGE_INVENTORY.md`** — the full Detect/Inventory/Verify/Flag/Approve record for all 34
  files: per-file description, same-room groupings, the 7 flags raised (4 resolved this session, 3
  standing production notes), and what's still open (case-study/suburb mapping).
- **This file** (`session-history/2026-08-31-image-workflow-inventory-and-review-additions.md`).

## 9. Files Deleted

None.

## 10. Tests and Validation

Not applicable — no code existed to build, lint, or type-check at this point in the conversation.
All work was documentation/content edits, manually proofread; no automated validation was run or
was available.

## 11. Performance Impact

Not affected. No code, no assets, no dependencies were added — image files were inspected in place,
not moved, resized, or added to any build.

## 12. SEO Impact

Not directly affected — no pages exist yet. Indirectly relevant for whenever pages are built: there
is now a 19th genuine testimonial available as content, and a confirmed pool of consented, genuine
project photography (still unattributed to any suburb/case-study) available for gallery/"our work"
use.

## 13. Remaining Tasks

### High Priority
- None from this session specifically — image workflow and inventory are complete and owner-signed-off.

### Medium Priority
- When building gallery/"our work" content, use `docs/IMAGE_INVENTORY.md` to pick photos — remember
  none of them can carry a suburb or case-study label (D-39).
- Standing flags 3, 5, 6 in `docs/IMAGE_INVENTORY.md` (verbatim drift in two testimonial graphics;
  before/after collages showing mid-construction "after" states; a photographer's hand/phone visible
  in two raw photos) should be respected whenever those specific files are shortlisted for use.

### Low Priority
- None identified.

## 14. Open Questions

- None outstanding from this session's scope — all three flags this session raised were resolved by
  the owner. (Whatever new open items the parallel "build the site" session has introduced since are
  tracked in the live `DECISIONS.md`/`PROJECT_CONTEXT.md`, not here.)

## 15. Next Session Handoff

- **Read first:** `docs/IMAGE_INVENTORY.md` before touching any of the 33 original ETR photos —
  it has the per-file descriptions and same-room groupings already worked out; don't re-derive them
  from filenames.
- **Do not** attribute any of these 33 photos to a suburb or the three named case studies (The Rocks,
  Hunters Hill, Artarmon) — confirmed impossible to know (D-39). If new, better-documented photos
  arrive later (as the parallel session's second batch did), treat them as a separate, independently
  verified set — don't retroactively assume they resolve this batch's gap.
- **The image workflow (D-36) is standing** — apply it automatically to any new image without asking
  the owner to restate it.
- Note again: this repo has moved on in parallel since this conversation started (MVP codebase, a
  second photo batch, a 4th family member). Check current `DECISIONS.md` / `PROJECT_CONTEXT.md` for
  the live state rather than assuming this file is the latest word on anything except the specific
  34-file batch and the 4 decisions (D-36–D-39) it covers.

## 16. Potential Documentation Updates

Not applicable in the usual sense — unlike a typical handoff, this session's outputs were written
**directly** into the permanent docs as they were confirmed (per the owner's explicit instruction to
make the workflow a standing rule immediately, not stage it for later consolidation). Nothing from
this session is sitting only in conversation, waiting to be moved.

## 17. Conversation-Derived Insights

**Confirmed decisions (owner-stated):**
- The 8-step image workflow is a standing rule (D-36).
- Kieran C's review is genuine (→ D-03 update, added to `Customer Reviews.md`).
- Farah Dawood is a genuine principal (D-37 — later superseded by D-50's finding of a 4th member).
- The "Luxe" template photos are genuine ETR work, not stock (D-38).
- Consent to publish all 33 photos is in place (D-39).
- None of the 33 photos can be attributed to a suburb or project (D-39).

**Strong recommendations (this session's, not yet owner-ruled-on beyond the above):**
- Treat the two testimonial graphics with verbatim drift as display-only assets — always source
  quoted text from `Customer Reviews.md`.
- When photos are eventually added to the repo, name/organize them by room-type + a sequence number
  rather than a suburb, since no suburb is known for this batch.

**Ideas/proposals:** none raised this session beyond the above.

**Unresolved opinions:** none — every judgment call this session surfaced was put to the owner and
resolved.
