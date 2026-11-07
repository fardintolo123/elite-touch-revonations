# Original reel: Elite Touch homepage-to-enquiry adaptation

Date: 20 October 2026. Implemented locally; not committed, pushed or deployed.

## Evidence and decision

Original source: https://www.instagram.com/reel/DehJO-IiaoU/ . The prior
4 Elements Painting review inspected the original footage and embedded speech
captions. It demonstrates replacing a generic quote action with a postcode
question, small follow-up questions and contact capture; the presentation ends
with a booking/CRM outcome. It supplies no controlled conversion results,
sample size or verified customer-job outcome. No reliable verbatim audio
transcript was obtained, so none is quoted here.

Decision: **adapt the smaller first action, not the postcode gate or booking
promise**. Elite Touch already discloses optional notes/photos and only requires
name, phone and email. A new wizard would duplicate that simplification. Service
coverage remains the existing Sydney claim; no postcode acceptance/rejection is
introduced. An enquiry requests a call to arrange a measure, not a booked slot.

In the baseline production browser at 390 × 844, the old hero link landed at the
contact section and the name input began at y=994, below the viewport. At
1440 × 900 it began at y=492. This is an observed navigation obstacle, not evidence
of abandoned leads. A real validation-only submission also cleared the name on
both devices: React reset the uncontrolled form despite a returned error state.

## Implemented interaction

- Homepage room choices use the four canonical service titles. The short visible
  labels omit only the word Renovations.
- A choice carries its answer to the existing editable service select and focuses
  the form heading below the fixed header. Name now begins at y=369 on mobile and
  y=332 on desktop. Reduced-motion preferences are respected.
- Not sure yet reaches the same form and preserves any existing service answer.
  Native anchors still reach the form without JavaScript; selecting the optional
  service then remains manual.
- A one-shot pending choice survives the form hydrating after the hero. Unknown
  values are ignored. Sending/sent states are not overwritten by another choice.
- Cancelling React's automatic reset retains answers and selected photos on
  validation and delivery errors. Successful submission keeps the status and
  disables re-submission until a reload; the backend contract is unchanged.
- Real review proof remains early, above the choices. Calling anchors, privacy
  copy, service coverage, required fields and the two-photo limits remain intact.

The starter is exported through the existing EnquiryForm client boundary.
A separate client entry initially duplicated the form chunk; that version was
replaced before final verification. No dependency, tag, font, image or backend
change was added.

## Verification

- Baseline and final local production builds passed; final build generated
  114 entries without a route-count drop. TypeScript passed.
- Readability: 108/108 customer-facing routes passed, home 62.4.
- Redirect verification: 34/34 passed. Impeccable detector returned no findings.
- Visible Playwright at desktop 1440 × 900 and mobile 390 × 844 passed keyboard
  Enter/Tab, heading focus/header clearance, service editing, retained contact
  details/notes/photos, real server validation, simulated delivery error/retry,
  held sending state and simulated success. No uncaught browser errors.
- Each complete test recorded exactly one form_start, three submit attempts,
  two errors (validation/server_error) and one generate_lead. Heading focus and
  hero choice alone do not manufacture form_start. No personal field data was
  included in these event payloads.
- Additional checks passed the early-choice hydration queue, rejected unknown
  values, Not sure answer retention, normal-motion keyboard use, no-JavaScript
  anchor fallback and a contact-page form smoke check.
- All external browser requests were blocked. Only invalid submissions reached
  the real local server action; valid error/success responses were intercepted.
  No real leads, email, calls or test GA4 hits were sent. Actual mail delivery and
  GA4 receipt were not re-tested; their code/configuration was unchanged.
- Final initial homepage script gzip sum: 190,615 → 191,234 bytes, **+619 bytes**.
  The discarded duplicate-entry version was 198,584 bytes. No new dependency.

Performance is **not cleared**. Two valid local mobile Lighthouse baseline runs
scored 91/74, LCP 1.204/3.378s and TBT 371/712ms; final candidate scored 81/81,
LCP 3.374/3.378s and TBT 432/424ms. CLS was zero and accessibility score 100 in all
four runs. One pre-existing unweighted label/name finding remained. Baseline
variance prevents a dependable LCP comparison, and both versions exceeded the
300ms TBT hard cap. These are shared-machine, third-party-blocked lab results,
not live-domain measurements. See the authoritative PERFORMANCE_BUDGET entry.

## Conversion hypothesis and existing metric

No matched homepage funnel counts were obtained in this session. The repository
documents the existing GTM form events, but this is not evidence that the
observed navigation obstacle causes lost enquiries. No uplift is claimed.

Evaluate **unique successful enquiry users (generate_lead) / eligible production
homepage users**, using a fresh post-deployment cohort and consistent production
hostname, homepage landing session, device/channel and test-traffic filters.
Keep phone-call clicks and submit-error rate as guardrails. Compare matched
periods; low volume and traffic-mix changes can confound a before/after result.
More form starts alone do not establish benefit. Existing event names and
field-focus start semantics remain unchanged; no analytics platform or tag was
added.

## Profile-wide review status

Owner requested every reel. Rendered profile-grid inventory reached its end with
422 unique shortcodes; the header's 388 posts is a different observed label, not
the reel count. Inventory is at
`D:/1/elite-touch-evidence/2026-10-20-reel-starter/profile-reels-inventory.json`.

Additional footage review is blocked: opening pinned DaVf7YVKkwc stayed on the
Instagram loading logo/empty app. Back, a reload and a separate root browser
check did not expose footage. The direct web fetch was also throttled. These
records are unviewed in this run, not rejected ideas. DehJO-IiaoU has the earlier
original-footage analysis described above. No further site's changes were made
from thumbnails or promotional captions. Resume from the saved inventory when
playback works or the original recordings are supplied.

Raw screenshots, browser JSON, bundle inventories and Lighthouse JSON are in
`D:/1/elite-touch-evidence/2026-10-20-reel-starter/`. Browser scripts are the three
`playwright-test-elite-*.js` files in the Administrator local Temp directory.
