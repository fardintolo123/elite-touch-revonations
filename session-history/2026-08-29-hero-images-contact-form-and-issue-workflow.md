# Session Summary

## 1. Session Objective
Two unrelated pieces of work in one session:
1. Fix reported design problems — the homepage hero photo was cropped to an awkward tight zoom, both
   the hero section and the sitewide contact section had dead white space in their shorter column,
   and most non-home pages had no imagery at all — then add the missing "Issue Workflow" section to
   `CLAUDE.md` (owner supplied the exact five requirements verbatim).
2. Wire up the enquiry form's real delivery: a live Resend API key + verified sending domain, a
   second (customer-facing) confirmation email, and a Supabase copy of every lead.

## 2. Work Completed

**Design/imagery fixes:**
- Fixed `.et-hero-media` in `app/globals.css` — the desktop breakpoint forced a portrait `3/4`
  aspect-ratio on every hero image, but every real project photo in `lib/projects.ts` is landscape
  (~3/2), so `object-fit: cover` was cropping in tight. Now a fixed `4/3` at all breakpoints
  (DESIGN.md §9's own "feature image" ratio).
- Added a scoped `.et-grid-align-center` utility class (not a global `.et-grid-2` default — most
  `.et-grid-2` uses are symmetric card grids that want the default `stretch`) and applied it to
  `ContactSection`'s grid, which appears on every page, to fix the dead-space-under-the-shorter-column
  symptom there.
- Created `components/PageHero.tsx` — one shared hero renderer with an OPTIONAL real photo prop, to
  avoid copy-pasting a new hero-with-image block into four page files (Architecture Rules: "content
  is data").
- Wired `PageHero` with a real, suburb-attributed photo into `/services/` (Hornsby bathroom),
  `/about-us/` (Artarmon bathroom), `/packages/` (Castle Hill bathroom), and — via a
  `SERVICE_HERO_IMAGE` map in `app/services/[slug]/page.tsx` — only the two photographed services:
  `bathroom-renovations` (Randwick) and `ensuite-bathroom-renovations` (Hornsby ensuite).
  `laundry-renovations` and `powder-room-renovations` deliberately kept the text-only hero — no
  photo of either service exists (D-83/D-06 forbid implying otherwise).
- Ran the `impeccable` design skill for general craft guidance (contrast, layout balance, avoiding
  dead whitespace) but did NOT run its full `init` flow — that would generate a competing
  `PRODUCT.md`/token set, and this repo's `DESIGN.md` is already the single authoritative design
  system (`CLAUDE.md` forbids a second one).

**CLAUDE.md documentation:**
- Added a new "## Issue Workflow" section (between "Per-Task Workflow" and "Testing Workflow") using
  the owner's own five requirements verbatim: issues must come from the plan/checklist, be small and
  specific, link back to a plan line or doc anchor, reference the files they'll touch, and be updated
  alongside the plan/checklist during implementation. Added guidance on ordering issues by dependency
  and recording blockers explicitly.
- Added one matching line to the "## Review Checklist" section.

**Enquiry form delivery (Resend + Supabase):**
- Owner supplied a live Resend API key and, later in the session, verified `elitetouchrenovations.au`
  as a sending domain in Resend.
- Updated `lib/actions.ts` (`submitEnquiry`, a `'use server'` action) to do three things instead of
  one:
  1. **Office notification email** — unchanged critical path, still fails loud per D-47 if
     unconfigured or if the Resend call errors.
  2. **NEW: customer confirmation email** — best-effort. Sent to the customer's own address after the
     office notification succeeds. If it fails, the error is logged but the submission still reports
     success to the customer — the office already has the lead from step 1.
  3. **NEW: Supabase insert** — best-effort. Writes `{name, phone, email, suburb, service, message}`
     into an `enquiries` table in the owner's Supabase project (`isrrvsezqwhhjmfzmujw`), using
     `SUPABASE_SERVICE_ROLE_KEY` (server-only, bypasses RLS). Skipped entirely (not attempted, not
     logged as an error) when that env var is unset.
- Installed `@supabase/supabase-js` (`npm install`). Server-only usage (imported only inside
  `lib/actions.ts`, a `'use server'` module) — verified via `npm run build` that it adds nothing to
  any route's client bundle, same reasoning as Resend under D-34/D-78.
- Created local `.env.local` (confirmed gitignored via `git check-ignore -v`) with:
  `RESEND_API_KEY`, `ETR_ENQUIRY_FROM` (`Elite Touch Renovations <enquiries@elitetouchrenovations.au>`),
  `SUPABASE_URL` (defaults to the project above if unset elsewhere), `SUPABASE_SERVICE_ROLE_KEY`.
- Gave the owner the SQL to create the table themselves (no DDL access available via the JS client):
  ```sql
  create table public.enquiries (
    id uuid primary key default gen_random_uuid(),
    created_at timestamptz not null default now(),
    name text not null,
    phone text not null,
    email text not null,
    suburb text,
    service text,
    message text
  );
  alter table public.enquiries enable row level security;
  ```
  (No insert policy added deliberately — only the service_role key, held server-side, can write.)
- The owner initially pasted the Resend key directly into chat, then later the Supabase **anon**
  key (decoded its JWT payload, confirmed `"role":"anon"`, explained why that one couldn't be used for
  server-side writes given RLS + no insert policy), then the correct **service_role** key (decoded,
  confirmed `"role":"service_role"`) — that one was wired in.

## 3. Important Decisions

- **Fix the hero ratio to `4/3` at all breakpoints, not a different ratio per breakpoint.**
  Reason: matches DESIGN.md §9's own documented "feature image" token, and is close enough to every
  real source photo's actual ~3/2 landscape ratio that `cover` only trims edges instead of destroying
  most of the image. Alternatives considered: per-photo custom crops (rejected — no art-direction
  tooling exists, and it would need re-doing for every future photo); switching to `object-fit:
  contain` (rejected — would show letterboxing/empty bars, against DESIGN.md's imagery rules).

- **Scope the whitespace fix to a new `.et-grid-align-center` class, not a global `.et-grid-2`
  default.** Reason: most `.et-grid-2` usages in the codebase are symmetric card-vs-card grids (e.g.
  the four principal bios, the review pairs) where `align-items: stretch` is correct — it makes
  same-row cards equal height, which reads as one clean grid. Centering those would have made cards
  of different natural heights look uneven instead. Only text-vs-card/form pairs (currently just
  `ContactSection`) have the "dead space under the short column" problem this fixes.

- **Build `components/PageHero.tsx` as one shared renderer with an optional image, rather than
  editing four pages' JSX independently.** Reason: `CLAUDE.md`'s Architecture Rules require content-as-
  data for repeated page types; four independently-hand-rolled hero-with-image blocks would drift out
  of sync over time (as `ContactSection`'s original whitespace bug shows can happen even in a single
  component).

- **Only give a hero photo to pages with real, evidenced photography.** `/services/`, `/about-us/`,
  `/packages/`, `bathroom-renovations`, and `ensuite-bathroom-renovations` got photos.
  `laundry-renovations` and `powder-room-renovations` did NOT, even though the user's general
  instruction was "add images properly" — because no photograph of either service exists, and D-83/
  D-06 explicitly forbid implying photographic evidence of work that isn't documented. This was
  flagged and explained, not silently applied.

- **Customer confirmation email and Supabase insert are both best-effort, not critical-path.**
  Reason: D-47's fail-loud rule exists specifically to stop the business from silently losing a lead.
  Once the office notification (step 1) succeeds, the lead is captured — a Resend hiccup on the
  confirmation email or a Supabase outage on the backup copy must never turn an already-successful
  submission into an error page for the customer. Alternative considered: making all three steps
  atomic/critical (rejected — would resurrect exactly the silent-lead-loss risk D-47 was written to
  prevent, just moved to a different failure point).

- **Did not run the `impeccable` skill's full `init`/setup flow.** Reason: it would generate its own
  `PRODUCT.md` and potentially a new token/palette system, and `CLAUDE.md` explicitly forbids starting
  a second design system when `DESIGN.md` already exists and is authoritative. Used its general craft
  guidance (contrast, layout balance) without adopting its own scaffolding.

## 4. Permanent Rules / Lessons

- **A landscape-source image forced into a portrait `object-fit: cover` box crops far more
  destructively than the reverse mismatch.** Worth remembering when adding any future hero/feature
  image slot: check the actual aspect ratio of the real source photos before picking a CSS
  aspect-ratio, don't assume "taller on desktop" is a safe default.
- **`align-items: stretch` (CSS Grid's default) is correct for symmetric card grids and wrong for
  text-vs-card/form asymmetric pairs.** Don't reach for a global override; scope the fix to the
  specific pattern that has the problem.
- **A `'use server'` action can have a critical path and best-effort paths in the same function.**
  The critical path (must not silently fail) should `return` an error state on failure; best-effort
  paths should be wrapped in their own `try/catch`, log-and-continue, and never affect the returned
  state. This is a reusable pattern for any future "primary action + secondary side-effects" server
  action.
- **When a user pastes what looks like an API key/secret, verify its actual role/scope before wiring
  it in if the key format allows it (e.g. decode a JWT payload).** The owner pasted Supabase's `anon`
  key first, visually similar to the `service_role` key, and using it would have caused silent
  RLS-rejected writes rather than an obvious error. Decoding and checking the `role` claim caught it
  immediately instead of only surfacing as a mystery empty table later.
- **When testing a form/action that involves a long-running local dev/prod server across multiple
  tool calls, run start+test+verify as ONE atomic shell invocation, not `run_in_background` split
  across turns.** This session lost a background `next start` process to a session interruption
  mid-test at least twice, producing a false "0 rows written" result that looked like a bug but
  wasn't. Bundling start → wait-for-ready → submit → check-logs → query-DB → kill-server into one
  Bash call made the same test reliable.
- **Vercel does not hot-apply new/changed environment variables to an already-running deployment.**
  A redeploy is required after adding env vars in the dashboard, every time. Worth remembering
  whenever this project's "why isn't the live env var working" comes up again.

## 5. Things We Explicitly Decided NOT To Do

- **Did not add a hero image to `laundry-renovations` or `powder-room-renovations`.** No photograph
  of either service exists; adding one (even a bathroom photo as "the closest we have") would violate
  D-83/D-06's rule against implying photographic evidence of undocumented work.
- **Did not make `.et-grid-align-center` (or plain `align-items: center`) the new default for every
  `.et-grid-2` usage sitewide.** Most instances are symmetric card grids that benefit from the
  existing `stretch` behavior; a global change would have made those look worse to fix a problem that
  only affects text-vs-card/form pairs.
- **Did not run `impeccable`'s full `init` setup flow** (would create a competing `PRODUCT.md`/token
  system) — used its general guidance only, kept `DESIGN.md` as the sole design-system source of
  truth.
- **Did not use the Supabase `anon` key for server-side writes**, even though it would have been
  faster to just try it. The `anon` key is meant to be safe to expose to browsers; using it
  server-side for inserts would have meant either (a) writes silently failing under RLS, or (b) had
  to open an insert policy for `anon`, which would let anyone holding that key (even though it's not
  currently exposed anywhere) write directly into the leads table, bypassing the form's own honeypot
  and validation. Waited for and used the `service_role` key instead.
- **Did not commit any of this session's changes.** Per `CLAUDE.md`'s Git Workflow ("commit only when
  the user asks"), nothing was committed by this session. (Note: git history shows the repo does get
  committed periodically by some other process/session with placeholder `"1"` commit messages — not
  this session's doing, and not investigated further as it was out of scope.)
- **Did not touch or attempt to resolve the unrelated pending changes found in the working tree**
  (a homepage `<title>`/meta-description shortening tied to O-10, and a new project-photos intake
  triage tied to K13/K14 — see `plans/2026-08-25-new-project-photos-intake.md`). These belong to a
  different, concurrent piece of work this session did not start and should not interfere with.

## 6. Current Project State

- **Working, locally verified:**
  - Hero image ratio fix, `ContactSection` whitespace fix, and the five `PageHero` placements — all
    confirmed via `npm run build` (23 routes, unchanged count), `tsc --noEmit` clean, `curl` checks of
    the served HTML (images present server-side, `laundry`/`powder-room` correctly have zero
    `et-hero-media` occurrences), and Playwright screenshots at 1440px and 390px.
  - The three-step enquiry flow (office email → customer email → Supabase insert), tested end-to-end
    against a locally-running production build (`next start`) with the owner's real Resend key and
    Supabase service_role key: office email sent without error, Supabase insert landed a real row
    (verified by querying the table directly with the service_role key), customer-confirmation-email
    failure was confirmed to be caused only by using a fake `@example.com` test address, not a bug.
    The one test row written was deleted afterward.
- **NOT yet confirmed working in production:** The owner added `ETR_ENQUIRY_FROM`, `SUPABASE_URL`,
  and `SUPABASE_SERVICE_ROLE_KEY` to Vercel's Production + Preview environment variables during this
  session. A live test submission against `https://www.elitetouchrenovations.au/contact-us/`
  immediately after that still returned the "This form is not connected yet" fail-loud message —
  because Vercel does not retroactively apply new env vars to an already-running deployment. **The
  session ended with the owner about to trigger a manual redeploy; the live site has NOT yet been
  re-tested after that redeploy.** This is the single most important thing to pick up next.
- **Known limitation, unchanged from before this session:** `docs/PERFORMANCE_BUDGET.md` still has no
  recorded Lighthouse baseline — noted but out of scope for this session to fix.
- **No regressions found or introduced.** Route count unchanged (23) after all changes.

## 7. Files Changed

| File | Change | Reason |
|------|--------|--------|
| `app/globals.css` | `.et-hero-media` desktop `aspect-ratio` changed from `3/4` (portrait) to `4/3` (matches mobile); added `.et-grid-align-center` utility | Fix hero image crop bug + reusable fix for column-height-imbalance whitespace |
| `components/ContactSection.tsx` | Added `et-grid-align-center` class to its grid | Fix dead white space under the shorter "Get in touch" column |
| `app/services/page.tsx` | Hero block replaced with `<PageHero>` including a Hornsby bathroom photo | Add real imagery to a previously text-only hero |
| `app/services/[slug]/page.tsx` | Hero block replaced with `<PageHero>`; added `SERVICE_HERO_IMAGE` map (only 2 of 4 slugs have a photo) | Add real imagery only where photographically evidenced |
| `app/about-us/page.tsx` | Hero block replaced with `<PageHero>` including an Artarmon bathroom photo | Add real imagery to a previously text-only hero |
| `app/packages/page.tsx` | Hero block replaced with `<PageHero>` including a Castle Hill bathroom photo, `facts` list preserved, `cta={false}` (matches original, which had no CTA buttons) | Add real imagery to a previously text-only hero |
| `CLAUDE.md` | Added "## Issue Workflow" section + one Review Checklist line | Owner-requested missing section, using their exact five requirements |
| `DECISIONS.md` | Added D-84 (hero/whitespace fix) and D-85 (three-step enquiry delivery) | Record decisions per Documentation Workflow |
| `PROJECT_CONTEXT.md` | Added `PageHero.tsx` row to "Where things live"; added two "Things that will bite you" entries (hero ratio, `SERVICE_HERO_IMAGE` map) | Record codebase mechanics |
| `lib/actions.ts` | Split single email send into 3 steps (office/critical, customer/best-effort, Supabase/best-effort); updated file header doc comment; added Supabase client init guarded by env var presence | Implement owner-requested confirmation email + Supabase logging |
| `package.json` / `package-lock.json` | Added `@supabase/supabase-js` dependency | Required for the Supabase write; verified server-only, zero client bundle impact |

## 8. Files Created

- `components/PageHero.tsx` — shared hero renderer with an optional real-photo prop, used by four
  pages plus (conditionally) the two photographed service pages.
- `plans/2026-08-20-hero-fixes-and-issue-workflow.md` — the plan/checklist for the design-fix half of
  this session, per `CLAUDE.md`'s Per-Task Workflow requirement.
- `.env.local` (repo root) — **gitignored, not committed, not part of the repository.** Holds
  `RESEND_API_KEY`, `ETR_ENQUIRY_FROM`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` for local testing
  only. A future session should know this file exists locally but will NOT be present in a fresh
  clone or on Vercel — those need their own copies of the same variables (Vercel's copies were added
  by the owner during this session; see §6).
- `session-history/2026-08-29-hero-images-contact-form-and-issue-workflow.md` — this file.

## 9. Files Deleted

None. (One row was inserted into and then deleted from the *Supabase* `enquiries` table as part of
live testing — not a repo file, mentioned here for completeness.)

## 10. Tests and Validation

- `npx tsc --noEmit` — clean, no errors, run twice (after the design changes and again after the
  `lib/actions.ts` changes).
- `npm run build` — green both times, 23 routes generated (no drop from baseline), Turbopack
  compiled successfully in both runs.
- `curl` against a locally-running `next start` build — verified 200 status on `/`, `/services/`,
  `/about-us/`, `/packages/`, `/services/bathroom-renovations/`, `/services/powder-room-renovations/`,
  and `/contact-us/`; grepped served HTML to confirm hero images render server-side (not
  client-only) and that `laundry-renovations`/`powder-room-renovations` correctly have zero
  `et-hero-media` occurrences.
- Playwright (via the `playwright-skill`) — screenshots at 1440×900 (desktop) of home (full page),
  about-us hero, packages hero, and the contact section scrolled into view; and at 390×844 (mobile)
  of the home hero and the contact section. Used to visually confirm the crop fix and the
  whitespace fix. No overflow, misalignment, or missing-image issues found (one apparent issue — two
  WorkStrip images appearing blank in a full-page screenshot — was investigated and confirmed to be a
  Playwright full-page-screenshot lazy-load timing artifact, not a real bug; direct `naturalWidth`/
  `naturalHeight` inspection showed all images loaded correctly).
- Enquiry form — three separate live/local end-to-end test submissions via Playwright, against: (1) a
  local prod build with a Resend key but the pre-verification test-domain sender (confirmed fail-loud
  message and correct behavior before the domain was verified), (2) a local prod build with the
  verified domain + service_role key run as one atomic shell step (confirmed office email sent, real
  Supabase row written and then deleted, customer-confirmation failure isolated to the fake test
  email address), (3) the live production site immediately after the owner added the three new
  Vercel env vars (confirmed the "not connected" fail-loud message still appears — expected, pending
  redeploy).
- Directly queried the Supabase `enquiries` table with the service_role key (outside of the running
  app) to confirm read/write access and to verify + then clean up the test row.

## 11. Performance Impact

- **New dependency:** `@supabase/supabase-js`. Verified via `npm run build`'s route table that it adds
  nothing to any route's client-side bundle — it is imported only inside `lib/actions.ts`, a
  `'use server'` module that never ships to the browser (same reasoning already established for
  `resend` under D-34/D-78).
- **New images:** 5 hero photos added (already-existing, pre-optimized WebP files from
  `lib/projects.ts`/`public/images/projects/`, no new image assets created). Each is well under the
  ≤70 KB LCP budget in `docs/PERFORMANCE_BUDGET.md` (chosen sizes ranged 30–59 KB); exact before/after
  Lighthouse numbers were NOT measured — `docs/PERFORMANCE_BUDGET.md` still has no baseline recorded
  at all (a pre-existing gap, not introduced by this session).
- No CSS/JS weight added beyond the two small new rules in `globals.css` and the new (tiny)
  `PageHero.tsx` component, which is a server component with zero client JS.
- No regressions identified; route count unchanged (23).

## 12. SEO Impact

- Five previously text-only page heroes (`/services/`, `/about-us/`, `/packages/`,
  `/services/bathroom-renovations/`, `/services/ensuite-bathroom-renovations/`) now include an
  `<img>` with real, descriptive alt text and a visible internal link to the relevant
  `/gallery/{slug}/` project page (via the suburb/name badge under each hero image) — a small
  internal-linking improvement, not a copy/metadata change.
- No changes to titles, meta descriptions, headings, schema, canonicals, or indexation in this
  session (the unrelated title/meta shortening visible in the working tree, tied to O-10, was made by
  a different, concurrent session — see §5).

## 13. Remaining Tasks

### High Priority
- **Confirm the production redeploy on Vercel actually happened, then re-test the live contact form**
  end-to-end (submit a real test enquiry against `https://www.elitetouchrenovations.au/contact-us/`,
  confirm the office notification and customer confirmation emails both arrive, confirm a row lands
  in the Supabase `enquiries` table, then delete that test row).
- Once confirmed working, tell the owner it's safe to consider the enquiry pipeline (email + Supabase)
  fully live.

### Medium Priority
- Record a first real Lighthouse/PageSpeed baseline in `docs/PERFORMANCE_BUDGET.md` — still entirely
  unmeasured, unrelated to this session's changes but a standing gap.
- Consider whether the customer confirmation email's copy needs owner sign-off (it was written to
  match existing site tone and only restates submitted facts + the phone number — no new claims — but
  it has not been explicitly shown to the owner as finished copy).

### Low Priority
- Consider extending the `.et-grid-align-center` treatment (or an equivalent) to other clearly
  asymmetric text-vs-card `.et-grid-2` pairs noticed but not touched this session (e.g., the "Every
  tier" section on `/packages/`, the "What is included" section on each service page) — deliberately
  out of scope this session since the owner only reported the hero and contact sections specifically.

## 14. Open Questions

- Has the Vercel redeploy actually been triggered and completed? (Unknown at end of session — this is
  the very next thing to check.)
- Does the owner want the customer confirmation email's exact wording reviewed/approved, or is the
  current copy (thanks + recap of submitted fields + phone number) acceptable as shipped?
- Is `enquiries@elitetouchrenovations.au` (used as the sender/reply-to split point) an address anyone
  actually monitors, or should replies route somewhere else? Not raised by the owner; worth
  confirming since customer-confirmation `replyTo` is set to `ETR_ENQUIRY_TO` (defaults to
  `info@elitetouchrenovations.au`), which should be fine, but worth a sanity check once real
  enquiries start flowing.

## 15. Next Session Handoff

- **Inspect first:** `lib/actions.ts` (the full three-step delivery flow) and this file's §6/§13 —
  don't re-derive the enquiry-form work from scratch, it's already fully implemented and locally
  tested; only production verification is outstanding.
- **Continue:** the live-site redeploy verification described in §13 High Priority. If the owner
  reports the redeploy is done, re-run the same Playwright-based live test used mid-session (submit
  the contact form at `https://www.elitetouchrenovations.au/contact-us/`, check for the success
  message, then verify via a direct Supabase query — do NOT rely on the UI success message alone,
  since that only proves the office-email step, not the other two).
- **Do NOT change:** the `.et-hero-media` aspect-ratio back to anything portrait-shaped on desktop —
  that exact change caused the original reported bug (D-84). Do NOT add a `laundry-renovations` or
  `powder-room-renovations` entry to `SERVICE_HERO_IMAGE` in `app/services/[slug]/page.tsx` without a
  new, real photograph of that specific service — the omission is deliberate (D-83/D-06).
- **Important context:** `.env.local` exists locally with working credentials for local testing, but
  is gitignored and will NOT appear in a fresh clone — don't assume it's there. The owner's live
  Resend and Supabase credentials were shared directly in chat during this session (not stored
  anywhere in the repo) — treat them as already known/available context if this session's history is
  consolidated, but do not re-print them verbatim in any new documentation.
- **Relevant files:** `lib/actions.ts`, `lib/enquiry.ts`, `components/EnquiryForm.tsx`,
  `components/PageHero.tsx`, `app/globals.css` (search `et-hero-media` and `et-grid-align-center`),
  `DECISIONS.md` D-84/D-85, `plans/2026-08-20-hero-fixes-and-issue-workflow.md`.
- **Unrelated concurrent work spotted in the working tree** (not this session's, do not assume it
  needs finishing or reverting): an uncommitted homepage title/meta-description shortening (O-10) and
  a new project-photos intake triage (K13/K14,
  `plans/2026-08-25-new-project-photos-intake.md`). Read `git status`/`git diff` fresh before touching
  anything, since another session may be actively working in this same tree (`CLAUDE.md`'s Git
  Workflow explicitly warns of this).

## 16. Potential Documentation Updates

- `CLAUDE.md`: the new "Issue Workflow" section and Review Checklist line were already added directly
  to `CLAUDE.md` during this session (the owner explicitly asked for this, as an exception to this
  template's "do not update permanent docs" instruction — the owner's live instruction outranks the
  template default). No further CLAUDE.md action needed unless the owner wants it refined.
- `DECISIONS.md`: D-84 and D-85 were already added during this session, recording the hero/whitespace
  fix and the three-step enquiry delivery respectively.
- `PROJECT_CONTEXT.md`: already updated during this session with the `PageHero.tsx` row and two new
  "Things that will bite you" entries.
- `docs/PERFORMANCE_BUDGET.md`: still has no baseline recorded at all — worth eventually adding one
  general note there that hero images now exist on 5 more pages and were all budget-checked
  individually, even though no full-page Lighthouse run was performed.

## 17. Conversation-Derived Insights

**Confirmed decisions:**
- Owner wants the enquiry form to email both the office AND the customer, plus log every lead to
  Supabase (project `isrrvsezqwhhjmfzmujw`) — explicit, direct instruction.
- Owner independently verified `elitetouchrenovations.au` as a sending domain in Resend mid-session
  (screenshotted the Vercel/Resend/Supabase dashboards throughout to confirm state).
- Owner added `ETR_ENQUIRY_FROM`, `SUPABASE_URL`, and `SUPABASE_SERVICE_ROLE_KEY` to Vercel Production
  + Preview environments (screenshotted, confirmed by this session).

**Strong recommendations (not yet owner-confirmed):**
- Switch `SUPABASE_URL` from "Secret" to "Config" type in Vercel (suggested during the session as a
  convenience — it isn't actually sensitive — but the owner had already saved it as Secret and this
  was not revisited).

**Ideas/proposals (not implemented):**
- Extending the grid-alignment fix to other asymmetric `.et-grid-2` sections sitewide (see §13 Low
  Priority) — raised as a possible follow-up, not requested or actioned.

**Unresolved opinions:**
- None beyond the open questions in §14.

# Accuracy Rules

This summary describes work performed and verified within this conversation. Per the instructions
above: implemented items are stated as implemented and were verified against the running build,
served HTML, or direct Supabase queries where noted; the production-redeploy verification is
explicitly marked as NOT yet confirmed (§6, §13, §14) rather than assumed complete.
