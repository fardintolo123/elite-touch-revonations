# Reel DeuK_-UCwPv: proof beside homepage contact fields

Record finalised 22 October 2026; footage review and evidence set dated 21 October.
Original: https://www.instagram.com/reel/DeuK_-UCwPv/ (mattxwebb).
Canonical cross-site learning: the 4 Elements `docs/reel-library/DeuK_-UCwPv.md`.

## Observation and decision

The original 26.54-second playback shows an attic-conversion page with rating
proof at its entry action, an interactive house illustration, gallery and a brief
calculator glimpse. Embedded captions explain proof placement and assert business
benefits. No independent audio transcript, controlled test, analytics sample or
verified revenue/lead outcome was supplied. Claims remain unverified.

Adapt only the relevant proof placement. In Elite Touch's actual desktop/mobile
journey, selecting a room reached the contact fields with the hero rating and
testimonial outside the viewport. The contact card had process/licence/warranty
reassurance, but no customer-review proof. This is an observed placement gap, not
evidence that visitors abandoned the form because of it. The existing short form
and optional details already reduce effort; they do not bring reviews to this step.

4 Elements already has proof beside entry and below form navigation/submit, plus
a real-project comparison. Its separate verdict retains that existing pattern.
Do not attribute those pre-existing features to this reel.

## Local implementation

- `app/page.tsx` enables `showReviewProof` on its existing `ContactSection`.
- `components/ContactSection.tsx` defaults the flag to false and reuses the existing
  server-rendered `GoogleRating` above the name field on the homepage only.
- Rating/link/accessible label/styles come from the existing component and
  `businessInfo.googleBusinessProfile`: 5.0/19, snapshot checked 4 September 2026.
  This session did not freshly verify Google's review count.

No required field, service coverage, call anchor, review text, enquiry wording,
server action, price, booking rule, media, dependency or event was changed for this
reel. No model or estimator was added. The earlier service handoff and retention
fix remain separate local work.

## Verification

Production build (`npm run build --ignore-scripts`), TypeScript and readability
passed; 108/108 customer-facing pages met the readability threshold. Generated
HTML contained 105 shared contact sections: one added rating on home, zero on
other routes. No additional route or schema change.

Full controlled browser checks passed at 1440 × 900 and 390 × 844: visible review
link/contact fields, call access, room handoff, keyboard order, retained answers
and photos, invalid input, simulated delivery failure/retry/success, pending/sent
guards, no-JavaScript fallback, no overflow or uncaught errors. Tab moves from the
focused heading to the review link, then name. Heading/review focus alone creates
no `form_start`; input focus creates one. Per viewport: one `form_start`, three
`form_submit_attempt`, two `form_submit_error`, one `generate_lead`, no personal
data in events. Valid submissions were intercepted and external tracking blocked;
no real valid enquiry or analytics test hit was sent.

Homepage served script gzip sum: **191,234 -> 191,234 bytes (zero delta)**. No new
script/image/font. No new Lighthouse or live performance result is claimed. The
first reel's earlier noisy performance gate remains open; this markup-only change
does not clear it.

Raw evidence: `D:/1/4ElementsPainting/tmp/elite-proof-2026-10-21/` contains
`candidate-browser.json`, `candidate-bundle.json`, `route-scope.json`, browser log
and desktop/mobile landing screenshots. Baseline placement:
`D:/1/elite-touch-evidence/2026-10-21-proof-review/`.

## Publication and outcome

Implemented and locally verified; source saved in local commit `ee74a0e` together
with the first-reel handoff/retention work. No Elite Touch push/deploy or live
delivery verification is claimed. Publication requires separate owner authority
and resolution of the earlier performance gate. No matched first-party homepage
funnel was available for this site; the obstacle's conversion cost is unknown.

Existing success metric: unique successful enquiry users (`generate_lead`) divided
by eligible production homepage users, scoped to the same hostname, landing page,
device/channel and test/agent exclusions. Start at actual deployment; keep it
separate from the first reel's deployment. Phone clicks and submit errors are
guardrails. Low volume and changing traffic may make results inconclusive. More
form starts or a functional test do not prove more enquiries.

Hypothesis: seeing genuine review proof at the contact step increases successful
enquiries. This remains untested. No exposure event or analytics platform added.

Reversal: remove the homepage flag plus the optional import/prop/render branch in
`ContactSection`; preserve the first reel's heading, handoff and retention fix.

## Browser constraint

The owner requests existing Chrome only and no Gemini. On 22 October its window
handle returned Codex screenshots, and input reported "coordinate input geometry
is unavailable". Recovery did not establish reliable Chrome capture, so input
stopped. No new browser was opened and no further reel/live verification is
claimed from that attempt. Three supplied reels remain in the canonical queue.
