# Session Summary

## 1. Session Objective

Process a new, separate batch of project photography (`Projects Before & After (1)/`, 9 projects
supplied outside the repo in the user's Downloads folder) through the standing image pipeline
(D-36: Detect → Inventory → Verify → Flag issues → Approve → Add to repo → Commit → asset URL →
alt text), decide which of the 9 could ship as new `/gallery/{slug}/` case studies, and resolve as
much of the resulting uncertainty as possible without inventing facts. Also answered two follow-up
questions about image-hosting architecture and self-serve owner uploads, and noticed CLAUDE.md had
been edited mid-session to add a new "Autonomy & Session Handoff" section.

## 2. Work Completed

- Extracted text from all 9 "Project Info" documents (8 `.docx`, 1 `.rtf`) using a one-off Python
  script (`.docx` via `zipfile` + XML unzip; `.rtf` via a hand-written control-word stripper,
  since raw RTF was ~90% font-table/theme noise and unreadable at scale). Script lived in the
  session scratchpad, not committed.
- Viewed and individually verified ~20+ of the batch's 38 source photos against their documents'
  written descriptions (spot-checked before/after pairs across all 9 projects; fully viewed all
  photos for the 6 projects that shipped).
- Checked EXIF metadata on the two location-ambiguous projects' photos for GPS data — none present
  (professional Canon EOS R5 + Photoshop workflow strips it).
- Checked `docProps/core.xml` authorship metadata on the two location-ambiguous Project Info docs —
  both written by Omar Aldulaimi personally, as two separately-created documents (different
  timestamps, same day), not a copy-pasted template.
- Converted 30 of the 38 photos to WebP (≤1400 px wide, quality 82, via Python/Pillow — no new
  repo dependency) into `public/images/projects/{slug}/`, ~1.6 MB total.
- Added 6 new entries to `lib/projects.ts`: `balmain-bathroom`, `gladesville-bathroom`,
  `little-bay-bathroom`, `hunters-hill-bathroom`, `the-rocks-bathroom`, `artarmon-bathroom-ensuite`.
  Every image's `alt` text was written after individually viewing that photo (D-36 step 9).
- Updated `app/gallery/page.tsx`: metadata description, hero paragraph, and the `TEXT_ONLY_PROJECTS`
  comment (to note the new possible-duplicate risk with Hunters Hill / The Rocks).
- Extended `scripts/check-readability.mjs`'s hardcoded `ROUTES` list to include the 6 new gallery
  pages (it previously only checked 5 of the by-then-existing project pages).
- Ran `npm run build` — green, route count increased as expected (11 `/gallery/[slug]` pages, up
  from 5).
- Ran `npm run check:readability` — discovered all 11 `/gallery/{slug}/` pages (old and new) fail
  the site's own Flesch ≥60 bar. Recorded as new open item K15, not fixed (see §5, §13).
- Wrote `plans/2026-08-25-new-project-photos-intake.md` (full triage) and updated
  `docs/IMAGE_INVENTORY.md` and `PROJECT_CONTEXT.md` (K14 → mostly resolved, new K15) and
  `DECISIONS.md` (new §3i, D-99–D-103).
- Investigated an out-of-band auto-commit process in this environment: something (not me, not a
  git command I ran) is periodically running what looks like `git add -A && git commit -m "1"`
  under the user's own git identity. It has already swept up my changes AND the user's own
  pre-existing uncommitted edits to `app/page.tsx` and `app/llms.txt/route.ts` into terse,
  unreviewable commits. Nothing has been pushed — `origin/main` is currently 3 commits behind
  local `HEAD`. Flagged to the user; not fixed (outside this session's scope, likely a VS Code
  extension setting).
- Answered a question about image hosting: confirmed all project images live in the git repo
  (`public/images/projects/`), hosted on GitHub (`fardintolo123/elite-touch-revonations`), deployed
  by Vercel. No Supabase or other object store is in use. Recommended staying with the current
  git+Vercel approach given the project's deliberately minimal-dependency stack (D-30/D-34/D-40),
  unless/until the owner wants to upload photos directly without a developer/agent in the loop — at
  which point object storage (Supabase Storage or Vercel Blob) plus a small protected upload page
  would be the way to enable that. **Not built** — recommendation only, pending the user's decision.
- Noticed CLAUDE.md was edited (by the user, mid-session, committed at `0811970`) to add a new
  "Autonomy & Session Handoff" section, a new step 4 in the Golden Rule, a new step 8 in
  Per-Task Workflow, and a new Review Checklist line — all about running sessions end-to-end
  without checking in, and always producing a session-history handoff file for non-trivial work.
  This file is the response to that.

## 3. Important Decisions

- **Decision:** Ship 6 of the 9 new projects as gallery entries; hold the other 3.
  **Reason:** The 6 had no flag beyond consent (which the user gave). The other 3 each had a
  genuine, unresolved problem (see D-101/D-102 below).
  **Alternatives considered:** Publish all 9 and caveat the risky ones in copy — rejected, because
  CLAUDE.md's Business Rules and D-06 treat an unevidenced project/location/service claim as a
  trust and liability problem, not a copy-wording problem.
  **Why chosen:** Matches the existing precedent (D-64, D-69) of not guessing when evidence is
  incomplete or conflicting.

- **Decision (D-101):** Two standalone-laundry projects (Enmore; the "North Ryde" folder) are NOT
  published, even gallery-only.
  **Reason:** D-01 confirms four services (bathroom · ensuite · bathroom-and-laundry · powder
  room); D-45 requires the `laundry-renovations` page to always read "Bathroom + Laundry," never
  standalone. Both photographed jobs are laundry-only, no bathroom.
  **Alternatives considered:** Publish as generic "our work" imagery without calling it a
  laundry-only *service* — rejected, because a photograph of a finished standalone laundry, shown
  anywhere on the site, visually claims that ETR does that work on its own, which is exactly the
  kind of implicit claim D-83 already warned against for the powder-room page.
  **Why chosen:** This was explicitly delegated to me by the user ("you decide"). I chose the
  conservative reading of the existing rules over assuming a scope expansion. **This is provisional
  — see Open Questions, the user has since asked to actually get the owner's real answer.**

- **Decision (D-102):** The "Mosman" folder (doc says Drummoyne) and "North Ryde" folder (doc says
  North Sydney) are NOT published under either name.
  **Reason:** The two labels point at different regions with different hub-publication status
  (Mosman = North Shore, published; Drummoyne = Inner West, unpublished; similarly North Ryde vs.
  North Sydney). The `Project` type requires a `suburb` field that renders as a prominent badge —
  there is no "unattributed" gallery path the way the original 33/34 photos got one (O-4), so
  guessing wrongly puts a false location claim directly in front of a visitor.
  **Alternatives considered:** Trust the folder name (rejected — D-36's whole premise is that
  filenames/folder names are not reliable); trust the document instead (see below, this was
  investigated further after this session's initial pass).
  **Why chosen:** Neither the user nor I could confirm which was correct at decision time.

- **Decision:** After the user asked me to dig further, I concluded (via EXIF check — no GPS data
  found — and via `docProps/core.xml` metadata on both `.docx` files, showing each was personally
  authored by Omar Aldulaimi as a separate document, not a copy-pasted template with a stale field)
  that **the documents are more likely correct than the folder names**: the Mosman folder's job is
  actually Drummoyne, and the North Ryde folder's job is actually North Sydney.
  **Reason:** This is exactly the standing principle in D-36 (folder/file names are not reliable;
  verify independently) applied the other way — here the more-structured, deliberately-typed source
  (the document's `Location:` field) is the more reliable one.
  **Alternatives considered:** Treat as fully unresolved either way — rejected once the metadata
  gave a clear (if not 100%-certain) signal.
  **Why chosen:** Presented to the user as a confident recommendation, explicitly caveated as
  inference rather than owner confirmation. **Not yet acted on** — the Drummoyne bathroom+ensuite
  project has NOT been published; that decision was left with the user/owner (see Open Questions).

- **Decision (D-103):** The new Hunters Hill and The Rocks photo sets are NOT merged into the two
  existing text-only case studies of the same name, even though both closely match (Hunters Hill:
  full-height marble + double vanity + freestanding bath, all matching; The Rocks: the same
  distinctive leadlight heritage window visible in both the new "before" photo and the existing
  case-study text).
  **Reason:** Follows the D-69 precedent (the Artarmon case) — close resemblance is evidence, not
  proof. The user was asked directly and did not know.
  **Alternatives considered:** Merge them, given how closely the details match — rejected as too
  close to "inventing" a link CLAUDE.md's D-06 rule doesn't allow without real confirmation.
  **Why chosen:** Kept as separate, unmerged gallery entries; the existing text-only entries were
  left untouched with an updated comment flagging the possible overlap for whoever resolves it
  later.

- **Decision:** Genuine matched before/after photo pairs in this new batch ARE labelled as "before"
  in alt text (unlike the first `Gallery/` batch, D-64/D-66, where no pairing was supplied and
  none was invented).
  **Reason:** This batch's source folders are structurally organized as matched pairs (one grainy
  phone "before" photo, several professional "after" photos, per project) and every before photo
  is visibly the same room as its after set — this satisfies D-06's "genuine matched pair"
  requirement, which the earlier 33/34 photos never met.
  **Alternatives considered:** Treat conservatively and not label any of them "before" — rejected
  as unnecessarily withholding real, evidenced information.

## 4. Permanent Rules / Lessons

- **`.docx` files cannot be read directly by the Read tool** ("cannot read binary files" error).
  They can be extracted cheaply with a small Python script (`zipfile` + `xml.etree`, no
  dependency needed — Python 3.11 with stdlib is sufficient) reading `word/document.xml` and
  concatenating `<w:t>` text nodes.
- **Raw `.rtf` files are extremely token-expensive to read directly** — a single RTF read via the
  Read tool cost ~34K tokens because of embedded font tables and a `\*\themedata` binary hex dump.
  Strip control words with a small parser AND explicitly truncate the raw text at
  `{\*\themedata`, `{\*\colorschememapping`, `{\*\datastore`, `{\*\latentstyles` before parsing —
  those destination groups can contain arbitrary binary that leaks through a naive
  control-word stripper as garbage text.
  Together these took the Gladesville RTF from 34,581 chars (raw Read) down to a clean 4,198 chars.
- **EXIF GPS data is not a reliable way to verify project location** — professionally edited
  photos (Canon EOS R5 + Photoshop, as seen here) routinely have GPS metadata stripped. Don't
  expect this technique to work on "after" hero shots in general; phone-shot "before" photos are
  more likely to carry it, but in this batch even those had been converted to PNG (which strips
  EXIF).
- **A `.docx`/`.rtf`'s `docProps/core.xml` (creator, created/modified timestamps) can help decide
  which of two conflicting sources is more trustworthy** — a personally-authored, individually-
  timestamped document is stronger evidence than an unstructured folder/file name, even though
  neither is a substitute for an explicit confirmation from the person who'd actually know.
- **This environment has an out-of-band auto-commit process** that runs `git add`-everything with
  message "1" under the user's real git identity, on some interval or trigger unrelated to any
  Claude Code action. It captures both agent changes and the user's own unrelated WIP into one
  commit. Any future session should know: (a) local commits may appear that nobody in the visible
  conversation created, (b) `git diff`/`git status` can look deceptively clean because work already
  got auto-committed, and (c) this does not mean anything was pushed — check
  `git rev-list --left-right --count origin/main...HEAD` to see the real ahead/behind state.
- **`scripts/check-readability.mjs` uses a hardcoded `ROUTES` array, not dynamic discovery.** Any
  session adding a new page under an already-covered route type (e.g. another `/gallery/{slug}/`)
  must manually add it to that array or it will silently never be checked.

## 5. Things We Explicitly Decided NOT To Do

- **Did not publish the "North Ryde"/North Sydney laundry project or the Enmore laundry project**,
  regardless of the location question, because standalone laundry work is outside the four
  confirmed services (D-01/D-45). Rejected building any UI treatment ("laundry care" style
  decorative use, etc.) for the same reason — any visible use implies the service exists.
- **Did not publish the Mosman/Drummoyne bathroom+ensuite project**, even after concluding the
  document's "Drummoyne" is probably correct — a probable answer is not the same as an owner
  confirmation, and CLAUDE.md's Autonomy & Session Handoff section (added mid-session) explicitly
  lists "a fact that isn't in ... a prior owner message (a price, review, **location**, ...)" as
  something to stop and ask about, not decide alone.
- **Did not merge the new Hunters Hill / The Rocks photos into the existing text-only case
  studies**, despite the strong resemblance — see D-103 above.
- **Did not fix the sitewide gallery-page readability failure (K15)** — all 11 `/gallery/{slug}/`
  pages fail Flesch ≥60, apparently driven by the shared "what every job includes" boilerplate
  (waterproofing/warranty/licence copy), not the per-project blurbs, since old and new pages fail
  by a similar margin. This touches legally-significant trust-signal wording shared across every
  gallery page and deserves its own dedicated pass (like D-96/D-97's readability pass did for the
  rest of the site), not a rushed fix bundled into a photo-intake task.
- **Did not build an owner self-serve photo upload feature.** The user asked a hypothetical
  ("what if I want the owner to upload without me") — answered with the current state (no such
  feature exists; images require a developer/agent editing the repo) and a recommendation (object
  storage + a small protected upload page, if and when actually wanted), but did not add the new
  dependency this would require without an explicit go-ahead.
- **Did not attempt to disable or fix the auto-commit process** — flagged it to the user since it
  contradicts CLAUDE.md's own Git Workflow rules, but it's an environment/tooling setting outside
  this session's task scope.
- **Did not push or deploy anything.** All commits (mine, and the auto-commit process's) remain
  local; `origin/main` has not been touched, consistent with D-35's standing rule.

## 6. Current Project State

**Working:**
- Build is green (`npm run build`), 11 `/gallery/[slug]/` pages generate correctly (up from 5).
- 6 new gallery projects are live in the codebase (not yet pushed/deployed):
  `balmain-bathroom`, `gladesville-bathroom`, `little-bay-bathroom`, `hunters-hill-bathroom`,
  `the-rocks-bathroom`, `artarmon-bathroom-ensuite`. Each has 4–8 photos, real alt text, and a
  blurb sourced from that project's own written Project Info document.
- `docs/IMAGE_INVENTORY.md`, `PROJECT_CONTEXT.md`, and `DECISIONS.md` all reflect the current state
  of this intake accurately.

**Incomplete / partially implemented:**
- 3 of the 9 source projects from this batch remain unpublished (Enmore, "North Ryde"/North Sydney,
  "Mosman"/Drummoyne) — see Open Questions.
- The K15 readability failure across all 11 gallery detail pages is documented but not fixed.
- Nothing has been pushed to GitHub or deployed to Vercel this session.

**Known issues / limitations:**
- The auto-commit process (see §4) may continue to create "1"-titled commits after this session
  ends — not something this session's work can prevent.
- `scripts/check-readability.mjs`'s route list requires manual maintenance (see §4).

**Performance / SEO state:** not separately measured this session beyond the readability check —
see §11/§12.

## 7. Files Changed

| File | Change | Reason |
|------|--------|--------|
| `lib/projects.ts` | Added 6 new project entries + a provenance comment for the new batch | Publish the 6 clean projects from the new photo batch |
| `app/gallery/page.tsx` | Updated metadata description, hero paragraph, and `TEXT_ONLY_PROJECTS` comment | Reflect the new suburbs and the Hunters Hill/Rocks overlap risk |
| `scripts/check-readability.mjs` | Added the 6 new gallery routes to the hardcoded `ROUTES` list | Otherwise the new pages would never be checked for readability |
| `docs/IMAGE_INVENTORY.md` | Added a "Second batch" section documenting the intake and its outcome | Standing image-audit record, per D-36 |
| `PROJECT_CONTEXT.md` | Updated K14 (mostly resolved) and added new K15 (gallery readability failure) | Open-items tracking |
| `DECISIONS.md` | Added §3i with D-99 through D-103 | Record the batch-intake decisions where they'll be found again |
| `plans/2026-08-25-new-project-photos-intake.md` | Full plan/checklist for this intake, checklist items ticked as work landed | Per-Task Workflow step 1/4 |

## 8. Files Created

- `plans/2026-08-25-new-project-photos-intake.md` — the plan and live checklist for this intake.
- `public/images/projects/{balmain-bathroom,gladesville-bathroom,little-bay-bathroom,hunters-hill-bathroom,the-rocks-bathroom,artarmon-bathroom-ensuite}/*.webp` — 30 converted photos.
- `session-history/2026-09-05-project-photos-intake-and-gallery-expansion.md` — this file.
- (Scratchpad only, not committed: two one-off Python scripts for `.docx`/`.rtf` text extraction
  and WebP conversion, and their extracted-text output. These lived under the session's temp
  scratchpad directory, not in the repo.)

## 9. Files Deleted

None.

## 10. Tests and Validation

- `npm run build` — **PASS**. Compiled successfully, TypeScript clean, 11 `/gallery/[slug]/` pages
  generated (previously 5), no route-count drop.
- `npm run check:readability` — **13/24 pages pass** (was 13/18 before the route list was
  extended). All 11 gallery detail pages fail, old and new alike (49.0–55.3, need ≥60). See K15.
  Everything else (home, about, contact, packages, services, hubs, gallery index) passes.
- Photo-vs-document verification: spot-checked before/after photo pairs against each project's
  written description for all 9 source projects; no contradiction found between any photo and its
  document (unlike the Hornsby case in the original batch, D-66).
- No browser/visual testing was performed this session (no dev server was started; this was
  data/content work, not a UI change beyond the two copy edits in `app/gallery/page.tsx`).

## 11. Performance Impact

Not directly measured against `docs/PERFORMANCE_BUDGET.md`'s runbook this session. Relevant facts:
- 30 new WebP images added, ~1.6 MB total (avg ~55 KB each), all ≤1400 px wide, quality 82 —
  consistent with the existing D-65 budget precedent (the first gallery batch was 0.81 MB for 23
  images). No `next/image` behavior changed; new images use the same lazy-loading pattern as the
  existing 5 projects (first image `priority`, rest lazy).
- No new runtime dependency was added (image conversion used Python/Pillow as a one-off local
  script, not a project dependency — `package.json` is unchanged).
- **Recommendation for the next session:** re-run the full Lighthouse runbook per
  `docs/PERFORMANCE_BUDGET.md` before this goes live, since gallery pages now ship more images
  sitewide (via `WorkStrip`, if it's ever extended to include these new projects — it was NOT
  updated this session, see Open Questions/Next Steps).

## 12. SEO Impact

- 6 new indexable pages once deployed: `/gallery/balmain-bathroom/`, `/gallery/gladesville-bathroom/`,
  `/gallery/little-bay-bathroom/`, `/gallery/hunters-hill-bathroom/`, `/gallery/the-rocks-bathroom/`,
  `/gallery/artarmon-bathroom-ensuite/`. Each gets its own `<title>`/description via the existing
  `generateMetadata` in `app/gallery/[slug]/page.tsx` (unchanged — it derives from `project.name`/
  `project.blurb` automatically).
- `/gallery/` index metadata description and hero copy updated to mention the new suburbs
  (Balmain, Gladesville, Little Bay, Hunters Hill, The Rocks, in addition to the existing four).
- **New sitewide readability regression discovered (K15)**: all 11 gallery detail pages fail the
  Flesch ≥60 target `docs/CONTENT_QUALITY_CHECKLIST.md` §2 sets — this predates this session (the
  5 original pages already failed) but is now documented for the first time with a route list that
  actually covers them.
- No internal links were added from any hub or service page to the 6 new projects — they are only
  reachable from `/gallery/` itself. **This may fall short of CLAUDE.md's Architecture Rules**
  ("Publication = content + an internal link from a relevant hub + a sitemap entry. A sitemap
  entry alone is not publication.") — worth checking whether the sitemap auto-includes them (it
  should, since it's presumably generated from `lib/projects.ts` like the existing 5) and whether
  any hub pages (e.g. the Inner West/North-Western hubs, if ever published) should link to the
  suburb-matching new projects (Balmain → Inner West; Gladesville/Hunters Hill → North-Western
  Sydney) the way the North Shore hub already links to its local projects.

## 13. Remaining Tasks

### High Priority
- Get the owner's actual answer on standalone laundry work (Enmore, North Ryde/North Sydney) —
  D-101 was an agent-delegated placeholder, not a real owner answer. The user asked me to find
  this out; I could not (it's not in any file), and don't currently have authorized email access
  in this session to ask directly.
- Get owner confirmation (or the user's own decision) on the Mosman-vs-Drummoyne and North
  Ryde-vs-North Sydney location question before publishing either. My best-evidence conclusion
  (documents are correct, folder names are wrong) is in DECISIONS.md but not acted on.
- Decide whether to actually commit+push+deploy this session's 6 new gallery projects, since
  nothing has left the local machine yet.

### Medium Priority
- Check whether `/gallery/` and the 6 new project pages appear correctly in `app/sitemap.ts`'s
  output (very likely automatic since it presumably reads `lib/projects.ts`, but not verified this
  session).
- Consider whether `components/WorkStrip.tsx` (used on home/about/services pages per D-83) should
  be extended to surface any of the 6 new projects — not done this session, no instruction was
  given to do so.
- Address K15 (gallery-page readability failure) as its own dedicated pass, following the D-96/D-97
  precedent — do not rush this into a future unrelated task, since it touches warranty/licence
  trust-signal copy.
- Investigate and likely disable the auto-commit process described in §4/§5 — outside a single
  session's scope to fix blind, but worth the user's/owner's attention.

### Low Priority
- Consider adding Little Bay to `service-areas.json` (Eastern Suburbs hub, already published) now
  that a real photographed project exists there — would need its postcode (2036) verified against
  a real NSW postcode reference first, per the D-72 standard, not written from memory.
- If the owner ever wants to upload photos directly (see §2), scope and build a small protected
  upload page backed by object storage (Supabase Storage or Vercel Blob) — not started, discussion
  only.

## 14. Open Questions

- **Does ETR want to advertise standalone laundry renovations** (no bathroom involved)? Currently
  no — D-01/D-45 don't permit it, and D-101 held two real projects back on that basis. This is a
  genuine business-scope decision only the owner (Omar) can make.
- **Which suburb is correct for the two mislabeled folders** — is it the folder name or the
  document? My conclusion (documents are correct: Drummoyne and North Sydney) is inference from
  authorship metadata and the absence of contradicting EXIF data, not a confirmed fact. A one-line
  answer from Omar would close this.
- **Are the new Hunters Hill and The Rocks photo sets the same jobs as the existing text-only case
  studies of the same name?** Asked directly, the user did not know. Kept unmerged (D-103) pending
  any future evidence.
- **Does the user want this session's work committed with a proper message, pushed, and deployed?**
  Not yet requested; per D-35, no deploy happens without explicit sign-off.
- **Does the owner want a self-serve photo upload feature?** Only discussed hypothetically so far.

## 15. Next Session Handoff

- **Inspect first:** `DECISIONS.md` §3i (D-99–D-103) and `PROJECT_CONTEXT.md` K14/K15 for the full
  context of this batch before touching anything gallery-related.
- **Continue:** Once the owner/user answers the two Open Questions above (laundry scope, correct
  suburb names), the Mosman→Drummoyne and/or "North Ryde"→North Sydney projects can be added
  following the exact same pattern as the 6 already shipped (source photos and docs are still at
  `C:\Users\Administrator\Downloads\Projects Before & After (1)\`, untouched — nothing was deleted
  from there).
- **Do NOT** merge the new Hunters Hill/The Rocks gallery entries into the existing text-only case
  studies in `app/gallery/page.tsx`'s `TEXT_ONLY_PROJECTS` without new evidence (D-103).
- **Do NOT** publish the Enmore or North Ryde/North Sydney laundry photos as case studies without
  an actual owner answer on service scope (D-101 is provisional, not a real answer).
- **Important context:** an out-of-band process auto-commits this repo under the user's git
  identity with message "1" — don't assume a clean `git status`/`git diff` means nothing changed
  recently; check `git log` timestamps and `git rev-list --left-right --count origin/main...HEAD`.
- **Relevant files:** `lib/projects.ts`, `app/gallery/page.tsx`, `app/gallery/[slug]/page.tsx`,
  `docs/IMAGE_INVENTORY.md`, `plans/2026-08-25-new-project-photos-intake.md`.

## 16. Potential Documentation Updates

- `PROJECT_CONTEXT.md` §4.9 (alt-text rules) could usefully note the `.docx`/`.rtf` extraction
  technique and the EXIF/`docProps` metadata trick from §4 of this file — these are reusable
  techniques for any future photo-batch intake, not one-off session trivia.
- `docs/PERFORMANCE_BUDGET.md` or `PROJECT_CONTEXT.md` could note the auto-commit process as a
  standing environment quirk once the user has investigated it, so future sessions aren't
  surprised by unexplained "1"-titled commits.
- Once K15 (gallery readability) is actually fixed, it should follow D-96/D-97's pattern of
  recording a before/after measurement in `DECISIONS.md`, the same as the rest of the site's
  readability pass.
- If the owner answers the laundry-scope and suburb-name questions, those answers belong in
  `DECISIONS.md` as confirmed (not agent-inferred) decisions, superseding D-101/D-102.

## 17. Conversation-Derived Insights

**Confirmed decisions:**
- The user confirmed consent for the entire "Projects Before & After (1)" batch.
- The user explicitly delegated the standalone-laundry publish decision to the agent ("you
  decide") — this produced D-101, but the user has since separately asked to get the *actual*
  owner answer, which supersedes relying on the agent's placeholder call long-term.
- The user asked me to determine which suburb name is correct for the two mismatched folders "by
  checking the docs and folder labels" — i.e., resolve it through investigation rather than by
  asking the user again. I did that (§3, §4) and reported a confident-but-not-certain conclusion.

**Strong recommendations (mine, not yet acted on):**
- Keep image hosting on git + Vercel (current approach) rather than moving to Supabase/object
  storage, unless the owner specifically wants self-serve uploads without a developer/agent — in
  which case a small protected upload page + object storage is the right shape.
- Do a dedicated readability pass on the gallery-page template (K15) rather than bundling a fix
  into an unrelated future task.

**Ideas/proposals (not committed):**
- Adding Little Bay to `service-areas.json`'s Eastern Suburbs hub, pending postcode verification.
- Extending `WorkStrip` to include some of the 6 new projects.

**Unresolved opinions:**
- Whether the Hunters Hill/The Rocks new photo sets really are the same jobs as the existing
  case-study text — I lean "probably yes" given how specific the matching details are (matte-black
  fixtures, freestanding bath, and the leadlight window respectively), but this is explicitly not
  settled, per D-103.
