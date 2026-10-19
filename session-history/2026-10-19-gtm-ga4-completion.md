# Session Handoff — 2026-10-19 GTM/GA4 Completion

## Session type
GTM/GA4 tracking completion — documentation update, commit cleanup, status verification.

## Context (prior sessions)
This session continues a multi-session GTM/GA4 build. Key prior work:
- **2026-10-11:** Audited GTM/GA4 (Version 2, 4 tags). Smoke-tested phone_call_click — CONFIRMED WORKING via native GTM click triggers. Created Custom Event triggers for 4 form funnel events. Implemented `trackEvent()` helper + form funnel events in code. Committed 3dd2783.
- **2026-10-12/13:** Completed Tags 2 & 3 (form_submit_error + generate_lead trigger swap). Owner published GTM Version 3 "Form funnel tracking". Owner pushed code to Vercel. Committed 6959f50.
- **2026-10-13 (same session):** Added delegated click listener to `app/layout.tsx` for phone_call_click/email_click (commit 43c2933, pushed). Noted: this push fires `{ event: 'phone_call_click' }` to dataLayer, but since no Custom Event trigger exists for these in GTM, the push is currently inert — native GTM click triggers remain the active path.

## What was done this session

### PROJECT_CONTEXT.md §16 updated
Rewrote the Analytics section (§16) to accurately describe the current state:
- GTM Version 3 (published 2026-10-13): 7 tags, 7 triggers, 10 variables
- Correct trigger types for each tag (Custom Event vs native click)
- Notes the delegated listener (43c2933) is inert — no Custom Event trigger exists for phone_call_click/email_click
- Documents the two pending owner actions: GA4 custom dimension + key events

### Verified: phone_call_click was working before commit 43c2933
2026-10-11 audit smoke test confirmed: clicking a tel: anchor fired `gtm.linkClick` in dataLayer and a GA4 fetch hit was captured immediately. The native GTM "Click - Phone Call" trigger was the active mechanism. The delegated listener added in 43c2933 is additive noise (inert in GTM) — it does not harm tracking, but it also doesn't add anything currently.

### GA4 actions — blocked
- **Custom dimension (error_code):** requires GA4 editor access; `fardintolo123@gmail.com` is read-only on the ETR property. The built-in browser is not signed in to Google. This is a pending owner action.
- **Star key events:** same blocker — needs GA4 editor account + events to appear in GA4 first.

## Current GTM/GA4 state (as of 2026-10-19)

| Item | Status |
|---|---|
| GTM Version 3 published | ✅ Live (2026-10-13) |
| Code deployed (Vercel) | ✅ Pushed and deployed |
| phone_call_click | ✅ Fires via native GTM click trigger |
| email_click | ✅ Fires via native GTM click trigger |
| form_start | ✅ Custom Event trigger + code push |
| form_submit_attempt | ✅ Custom Event trigger + code push |
| form_submit_error (with error_code) | ✅ Custom Event trigger + code push + DLV |
| generate_lead | ✅ Custom Event trigger + code push |
| GA4 custom dimension for error_code | ❌ Pending owner (GA4 editor access required) |
| GA4 key events starred | ❌ Pending owner (GA4 editor access + real traffic required) |

## Pending owner actions (GA4 editor account required)

### 1. Create GA4 custom dimension for error_code
Go to: GA4 → Admin → Data display → Custom definitions → Create custom dimension
- Name: `error_code`
- Scope: Event
- Event parameter: `error_code`

Register this NOW — GA4 does not backfill. Every `form_submit_error` event that fires before this is registered loses its `error_code` parameter value in reports.

### 2. Star key events
Go to: GA4 → Admin → Events
- Star `generate_lead` as a key event
- Star `phone_call_click` as a key event
- Check whether `ads_conversion_Book_appointment_1` is still listed; if so, decide whether to keep or remove it

Note: events must appear in the Events list (requires real traffic) before they can be starred.

### 3. Verify live tracking on the production site
Open https://www.elitetouchrenovations.au/ in Chrome DevTools Console:
```javascript
window.dataLayer
```
Then click the phone number. Check for `{ event: 'phone_call_click' }` in the array.
Submit the contact form (with real details, owner consent required) to fire `generate_lead`.
Verify in GA4 Realtime → Event count by Event name.

## Important clarification: delegated listener vs native GTM triggers

The delegated listener added in commit 43c2933 pushes `phone_call_click` and `email_click` to dataLayer when a tel:/mailto: link is clicked. However:
- GTM currently has **no Custom Event trigger** listening for `phone_call_click` or `email_click`
- The native "Click - Phone Call" and "Click - Email" triggers are the active path
- The dataLayer push is currently inert from GTM's perspective

If a future session wants to switch to the custom event architecture (more reliable in SPAs):
1. Add Custom Event triggers for phone_call_click and email_click in GTM
2. Remove or disable the native click triggers on those two tags
3. The delegated listener code is already in place (app/layout.tsx)
Do NOT do step 2 without step 1, or tracking will silently stop.

## Files changed this session
- `PROJECT_CONTEXT.md` — §16 rewritten to reflect GTM Version 3 actual state
- `session-history/2026-10-19-gtm-ga4-completion.md` — this file

## Related files
- `lib/analytics.ts` — trackEvent() helper
- `components/EnquiryForm.tsx` — form funnel events
- `app/layout.tsx` — GTM snippet + delegated click listener (commit 43c2933)
- `session-history/2026-10-11-gtm-ga4-audit.md` — original audit and phone_call_click smoke test
- `session-history/2026-10-12-gtm-tags-complete.md` — Tag 2/3 completion and GTM v3 publish
