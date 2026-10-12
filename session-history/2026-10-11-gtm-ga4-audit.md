# Session Summary — GTM/GA4 Audit & Form Funnel Tracking

## 1. Session Objective

Two-part session:

1. **Audit** GTM + GA4 for the Elite Touch Renovations website — confirm the tracking architecture is correct, smoke-test `phone_call_click`, and mark key events.
2. **Implement** the form funnel tracking brief (from the 4 Elements Painting sibling project): `trackEvent()` helper, four form events, matching GTM tags/triggers.

---

## 2. Work Completed

### Part 1 — Audit (read-only, no code changes)

**Website code confirmed:**
- `app/layout.tsx` — GTM-MVGQB9FW loaded via `afterInteractive`, single path (D-32). No `gtag.js`.
- All phone/email CTAs are real `tel:`/`mailto:` anchors — correct for GTM Click triggers.

**GTM container (Version 2, live since 2026-08-31):**
- 4 tags: Google tag, `phone_call_click`, `email_click`, `generate_lead`
- All correctly configured

**GA4 (G-06GQGHHP0X, "Elite Touch Renovations"):**
- Enhanced Measurement ON, data flowing
- `phone_call_click` and `generate_lead` had not appeared in Recent events (41 days post-publish, zero custom events — flag)

**`phone_call_click` smoke test — CONFIRMED WORKING (2026-10-11):**
- JS smoke test on live site: `window.dataLayer` received `gtm.linkClick` with `gtm.elementUrl: 'tel:+61411752334'`; GA4 fetch hit captured immediately
- Awaiting appearance in GA4 Recent events (24–48h window from 2026-10-11)

**`generate_lead` smoke test — BLOCKED:**
- Submitting the live contact form would send a real enquiry — auto-mode classifier correctly blocked it
- Owner must submit the form to trigger `generate_lead`

### Part 2 — Form funnel tracking implementation

#### Architecture decision: `afterInteractive` kept (not changed to `lazyOnload`)
The brief recommended `lazyOnload` for performance. ETR is a lead-gen site — phone clicks can happen within seconds of page load. `lazyOnload` (browser idle) risks missing early clicks. `afterInteractive` (after hydration) is the correct choice here.

#### Architecture decision: existing Google tag entity left unchanged
The brief said "NEVER use GTM's unified Google tag entity" — that rule was specific to 4 Elements (their Google tag was registered under a different GTM account, causing HTTP 400 publish errors). ETR's Google tag published successfully (Version 2). Left as-is.

#### Code changes (committed 2026-10-12, commit `3dd2783`)

**`lib/analytics.ts`** — new file:
```typescript
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
  }
}

export function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean>
): void {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: name, ...params })
}
```

**`components/EnquiryForm.tsx`** — modified:
- Added `useEffect`, `useRef` imports; added `trackEvent` import
- `form_start`: fires once on first field focus (guarded by `startedRef`)
- `form_submit_attempt`: fires on every submit click (before server response)
- `generate_lead`: fires via `useEffect` when `state.status === 'success'`
- `form_submit_error`: fires via `useEffect` when `state.status === 'error'`; `error_code: 'validation'` (field errors present) or `'server_error'` (no field errors)

**Why useEffect instead of GTM Form Submit trigger:**
React's `useActionState` + Server Actions return the result asynchronously. GTM's Form Submit trigger fires at submit-time — before the server responds — and may not fire at all on React-intercepted forms. The `useEffect` approach fires only after the actual server response.

#### GTM workspace changes (saved, NOT yet published — 5 changes as of 2026-10-12)

✅ Created: `DLV - error_code` (Data Layer Variable v2, key: `error_code`)
✅ Created: `Custom Event - form_start` (Custom Event trigger, event name: `form_start`)
✅ Created: `Custom Event - form_submit_attempt` (Custom Event trigger, event name: `form_submit_attempt`)
✅ Created: `Custom Event - form_submit_error` (Custom Event trigger, event name: `form_submit_error`)
✅ Created: `Custom Event - generate_lead` (Custom Event trigger, event name: `generate_lead`)

**Still needed in GTM Tags (not yet done — Chrome extension dropped during this work):**

**Tag 1: form_start**
- Type: Google Analytics: GA4 Event
- Measurement ID: `G-06GQGHHP0X`
- Event name: `form_start`
- Trigger: `Custom Event - form_start`

**Tag 2: form_submit_attempt**
- Type: Google Analytics: GA4 Event
- Measurement ID: `G-06GQGHHP0X`
- Event name: `form_submit_attempt`
- Trigger: `Custom Event - form_submit_attempt`

**Tag 3: form_submit_error**
- Type: Google Analytics: GA4 Event
- Measurement ID: `G-06GQGHHP0X`
- Event name: `form_submit_error`
- Event Parameters → row: Name `error_code`, Value `{{DLV - error_code}}`
- Trigger: `Custom Event - form_submit_error`

**Tag 4: Modify existing `generate_lead` tag**
- Open existing `generate_lead` tag
- Remove trigger `Form Submit - Contact`
- Add trigger `Custom Event - generate_lead`
- Save

**Critical order:** Complete the 4 tags above → owner approves and publishes GTM workspace → owner approves and deploys the code to production. Do NOT publish GTM before the code ships (or the Custom Event triggers will never fire and the old Form Submit tag fires correctly in the meantime). Do NOT deploy code before publishing GTM (or the dataLayer pushes go unheard).

Actually — re-reading the brief's order: **publish GTM first (tags are inert until the code ships), then deploy code.** The new Custom Event tags need the `trackEvent()` calls to exist in production to fire. Publishing first is safe because the triggers are Custom Event type — they only activate when the specific `event` key appears in dataLayer, which won't happen until the code is live.

---

## 3. Important Decisions

### D-112 (existing, confirmed) — Architecture: single measurement path
Website → GTM → Google tag → GA4. Confirmed correct, no duplicates.

### New — GTM load strategy: `afterInteractive` kept
Brief recommended `lazyOnload`. Rejected for ETR: phone clicks can happen immediately after page load on a lead-gen site; `lazyOnload` (browser idle) would miss early clicks.

### New — Google tag entity: left unchanged
Brief's "NEVER use Google tag entity" rule is specific to 4 Elements (different GTM account registration). ETR's Google tag publishes cleanly.

### New — Form tracking via code, not GTM Form Submit trigger
React Server Actions return results asynchronously. GTM Form Submit fires at submit-time and may miss React-intercepted submissions. `useEffect` watching `state.status` is more reliable.

---

## 4. Files Changed

| File | Status |
|------|--------|
| `lib/analytics.ts` | Created |
| `components/EnquiryForm.tsx` | Modified |
| `session-history/2026-10-11-gtm-ga4-audit.md` | Updated (this file) |

Commit: `3dd2783` — "Add form funnel tracking via dataLayer"

---

## 5. Remaining Tasks

### A — Complete GTM tag work (Claude with stable Chrome, or owner manually)

In GTM → Tags → New, create the 3 new tags and modify the existing `generate_lead` tag as described in §2 above. This is the only remaining technical work before deployment.

### B — Publish GTM workspace (owner sign-off required)

After the 4 tag changes are complete, the owner must review and publish the GTM workspace. The workspace currently has 5 changes (triggers + DLV) plus the 4 tag changes = 9 changes total when done.

### C — Deploy code to production (owner sign-off required)

Push commit `3dd2783` to production (Vercel deploys automatically from the `main` branch on GitHub). Per CLAUDE.md: **never push/deploy without explicit owner sign-off.**

### D — GA4 custom dimension: `error_code`

In GA4 Admin → Data display → Custom definitions → Create custom dimension:
- Dimension name: `error_code`
- Scope: Event
- Event parameter: `error_code`

This can be done before or after deployment — it doesn't backfill but enables future reporting.

### E — Star `phone_call_click` as key event (owner action)

Check GA4 Admin → Data display → Events → Recent events. `phone_call_click` was triggered on 2026-10-11 — it should appear from 2026-10-12 onwards (24–48h processing). Click the star to mark it as a key event.

### F — Submit enquiry form + star `generate_lead` (owner action)

After code deploys and GTM is published:
1. Go to `https://www.elitetouchrenovations.au/contact-us/`
2. Fill the form and submit — this triggers `generate_lead` via the new code path
3. Wait 24–48h for it to appear in GA4 Recent events, then star it

### G — Owner decision: `ads_conversion_Book_appointment_1`

This is the only currently active key event in GA4 and has zero data. Likely a legacy Google Ads import. If no active Google Ads campaign, remove it: GA4 Admin → Data display → Events → Key events → three-dot menu → "Remove as key event".

---

## 6. Current Project State

- **Code:** Committed at `3dd2783`, NOT yet deployed to production
- **GTM:** 5 workspace changes saved (variables + triggers), NOT yet published; 4 tag changes still needed
- **GA4:** No custom events visible yet; `phone_call_click` triggered 2026-10-11, should appear in Recent events today or tomorrow

---

## 7. Next Session Handoff

**Read first:**
- This file
- `DECISIONS.md` D-32, D-112

**Start here:**
1. Complete the 4 GTM tag changes (§2 above has exact specs)
2. Owner: publish GTM workspace
3. Owner: approve deployment of commit `3dd2783`
4. Owner: star `phone_call_click` in GA4 (should be visible now)
5. Owner: after deploy — submit contact form → wait 24–48h → star `generate_lead`
6. Register `error_code` custom dimension in GA4

**Do NOT change:**
- The GTM load strategy (`afterInteractive` — deliberate for lead-gen site)
- The existing Google tag entity in GTM
- Any phone CTAs from `tel:` anchors to JS handlers

**GTM URL:** `https://tagmanager.google.com/#/container/accounts/6374223215/containers/262743067/workspaces/3/tags`
(No `?authuser` param — this is the default account, not the `info@` account)
