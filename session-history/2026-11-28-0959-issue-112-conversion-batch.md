<!-- session-checkpoint:v1 -->
# Session checkpoint

- **Repository / issue:** `fardintolo123/elite-touch-revonations` · batch milestone **"Batch: Conversion — leaks & baseline"** · tracker **#112**; worked member **#114**. Also read: #111, #109, #103, #113.
- **Observed at:** 2026-11-28 09:59 +04:30 (Asia/Kabul).
- **Session:** DeepSeek Harness web GUI, `deepseek-flash` (agent `lead`). Model-emitted session ID not exposed by the harness; identify by this file and the checkpoint comment on #112.
- **Mode requested / work performed:** implement the batch (`run Batch: Conversion — leaks & baseline`) + check `CLAUDE.md`. Performed: sunrise recovery, live re-verification of the two closed members, agent-side completion of #114 (verification + D-194 + plan reconciliation), and an independent check of `CLAUDE.md` against its 65,536-byte instruction cap. **No page, component or config change** — this batch is measurement, and the measurement is date-gated.
- **Ownership:** released for handoff. Files written by this session: `DECISIONS.md` (D-194), `plans/conversion-baseline-2026-11.md`, `session-history/evidence/issue-114-2026-11-28/`, this file. **Not touched:** `CLAUDE.md`, `package.json`, `scripts/`, `docs/AGENT_TOOLING.md` — a concurrent session owns those (see below).
- **GitHub state / work status:** all four batch members still **open except #103 and #113 (closed, done)**. #114: **in progress — agent side complete, awaiting owner**. #111 and #109: **not started, date-gated** (not blocked on code).
- **Code:** branch `main`, base HEAD `ccdec639723ac1258322f28b904ffc910d39aa78`. This session's commit follows this checkpoint.
- **Publication:** docs-only commit pushed to `main`. No deployment evidence is claimed and none is needed — nothing that runs changed.
- **Recovery:** the pushed commit plus this file. Working tree at the time of writing also held another session's uncommitted edits to `CLAUDE.md`, `package.json`, `scripts/check-instructions.mjs`, `docs/AGENT_TOOLING.md`, `docs/BATHROOM_SITE_STRUCTURE.md`, `plans/gsc-exports/…` — deliberately left uncommitted and unowned.
- **Completed / takeaways:**
  - **#103 confirmed fixed live:** `/contact-us/` returns **200** (was 403). The plan's "real leak is the contact page" bullet was corrected to past tense.
  - **#113 confirmed live:** `connect-src` carries `https://analytics.google.com` **and** `https://www.google.com`.
  - **#114 agent side done and evidenced:** tagged GBP URL returns 200 in **one hop, 0 redirects**, query string intact; canonical and `og:url` emit the clean `/`; `proxy.ts` matcher is `/elementor-hf*` only; `REDIRECTS_301` has no `/` rule; **no `page_location` override anywhere** so GA4 records the full tagged URL; homepage title already carries city + service. Evidence: `session-history/evidence/issue-114-2026-11-28/verification.md`.
  - **D-194** records the tag values and why `utm_medium` stays `organic` (#111's baseline groups by landing page *inside* Organic Search; a new medium would move those sessions out of the group and invalidate the comparison).
  - **GA4 is unreachable from an agent session — checked, not assumed.** The only Google API config on this machine is `~/.config/claude-seo/google-api.json`, whose `default_property` is the sibling project (`sc-domain:4elementspainting.com.au`) and whose `service_account_path` key file does not exist. So #111/#109 need the owner's export or the owner's GA4 open in-session.
  - **`CLAUDE.md` now fits its cap.** Measured **62,530 / 65,536 bytes (95.4%, 3,006 bytes headroom)**; before the concurrent session's trim it was **65,688** — over the cap, which is why the harness was truncating the tail (the `<!-- BEGIN:nextjs-agent-rules -->` Next.js block). `npm run check:instructions` (new, added by that session) passes for both files: `AGENTS.md` 5,248 / 32,768. All 28 relative links in `CLAUDE.md` resolve; 0 missing.
  - **One stale path was left in `CLAUDE.md` at 09:59 and fixed at 10:15 in the follow-up commit:** it said `src/data/businessInfo.ts`; the file is **`lib/businessInfo.ts`** (there is no `src/` tree). Left alone at first because a concurrent session held `CLAUDE.md` uncommitted in this worktree; corrected once that session's `CLAUDE.md` commit landed.
  - **Plan reconciled:** `plans/conversion-baseline-2026-11.md` now ticks #103, adds #114, states both date gates, and carries a **"How to run E1 and #109 on 2026-12-24"** section (exact GA4 exploration settings, the 2026-11-26 → 2026-12-24 range, Wilson intervals, the sum check) so that run is mechanical rather than re-planned.
- **Verification:** live `curl` checks above, all reproduced in the evidence file; `npm run check:instructions` pass. No build needed: no runtime file changed. `git diff --stat` limited to this session's files at commit time — verified before staging.
- **Remaining / blocker:**
  1. **Owner, ~2 minutes:** Business Profile → Edit profile → Contact → Website → `https://www.elitetouchrenovations.au/?utm_source=google&utm_medium=organic&utm_campaign=gbp-listing`; and GA4 Admin → Events → mark `generate_lead` and `phone_call_click` as **key events**.
  2. **Date gate:** #111 and #109 run **on or after 2026-12-24** (28 complete days of clean data from 2026-11-26). Not a code blocker.
  3. ~~`CLAUDE.md` line for `src/data/businessInfo.ts` → `lib/businessInfo.ts`.~~ Fixed at 10:15 in the follow-up commit.
- **Next action:** re-read #112's batch checkpoint, then on/after **2026-12-24** run `sunrise #111` and follow `plans/conversion-baseline-2026-11.md` § *How to run E1 and #109*. Before that, if the owner has done the profile edit, run `sunrise #114` and check GA4 → Traffic acquisition with "Session campaign" for `gbp-listing`.
- **Approval:** none needed or sought. Nothing irreversible was done; no issue was closed.
- **GitHub sync:** #114 verification comment posted (#issuecomment-7234703453); #112 body updated with #114 and both date gates; batch checkpoint posted on #112 after the push.

---

## Update 2026-11-28 10:45 — GA4 key events (owner asked for it, agent-operated in their session)

- **Done:** `phone_call_click` is now a **key event** in property `453254013`. Marked on Admin → Data display → Events → **Recent events** (star beside the name) and confirmed on the **Key events** tab — starred, stream `elitetouchrenovations.au`. Evidence: the Key events tab now lists `ads_conversion_Book_appointment_1`, `phone_call_click`, `purchase`.
- **Could not be done:** `generate_lead`. The Events page states it shows "all key events and only events from the last 28 days"; `generate_lead` has not fired since the CSP fix (#113), so it is on neither tab, and that page offers no create-by-name control (only Create event / Attribution settings / Custom configurations). It becomes starrable with the first post-fix enquiry. Code needs no change — `components/EnquiryForm.tsx:254` already pushes it.
- **Also confirmed while there:** recent events include `page_view`, `first_visit`, `scroll`, `session_start`, `user_engagement` — i.e. GA4 is receiving data after the CSP fix, which is the premise #111/#109 wait on.
- **Documents updated:** `PROJECT_CONTEXT.md` §16 pending-action list; `plans/conversion-baseline-2026-11.md` step 1; tracker #112 body (status paragraph); comment on #111 (#issuecomment-7235065656).
- **Approval:** the owner asked for this step explicitly ("go ahead with number 2") with their Analytics tab referenced.
- **Files owned by this addendum:** `PROJECT_CONTEXT.md`, `plans/conversion-baseline-2026-11.md`, this file.
## Update 2026-11-28 10:55 — Business Profile edit attempted, blocked by the editor itself

- **Attempted** the owner's step 1 in their signed-in browser: opened the "Your business on Google" owner panel from a Google search, clicked **Edit profile**, and the **"Business information"** sheet opened (About / Contact / Location / Hours / More).
- **Blocked:** that sheet is outside everything the browser tool can address — not a `role="dialog"` (both candidates are empty), not in iframes 1–3 (checked with a frame-scoped `expect`), no accessible text, and it produced no network request. Screenshot only; the tool has no coordinate-click fallback. **No field was changed** — deliberately, because address, phone and hours sit one tab away from Website.
- **Handed back to the owner** with the exact 3-click path and the copy-paste URL; recorded on #114 (#issuecomment-7235246260). Do not re-attempt the overlay: it is a dead end for this tooling, not a mis-click problem.
- **Blocked-path lesson for future sessions:** on Google search, `business.google.com/dashboard` redirects to the marketing page for this account, and the quick-edit sheet is unreachable from the DOM layer. If the profile edit must be automated later, it needs the Maps/Business Profile API, not the UI.
- **Incidental observation (unverified):** the knowledge panel shows **5.0 · 20 reviews**, while `Customer Reviews.md` holds 19. Not acted on — it is a Business Rules question for the owner, not this batch.
- **Files touched by this addendum:** this file only.