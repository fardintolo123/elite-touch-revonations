# Issue #76 section evidence and source trace

**Scope:** `/gallery/`, all 11 `/gallery/[slug]/` routes, `/packages/`, `/about-us/`, and `/contact-us/`. Final production screenshots cover one page from each of the five route types at 390×844 and 1440×900. All project routes were separately swept for status, H1, distinctive content, and D-125 schema.

## Section test

| Route / section | Job for the visitor | Proof source and acceptance evidence |
|---|---|---|
| Gallery hero and featured project | Establish local work immediately and point to a real project record. | Approved photo inventory (`docs/IMAGE_INVENTORY.md`) and project records (`lib/projects.ts`); route check confirms the featured project’s suburb, scope, and destination. |
| Gallery project grid | Let visitors scan real jobs by suburb and open the matching detail page. | Ten further photographed records plus the featured record from `lib/projects.ts`; all 11 project routes return 200. |
| Gallery service CTA | Connect the proof to the free-measure enquiry path. | `lib/businessInfo.ts` service and CTA data; existing shared contact form. |
| Project hero and before/finished evidence | Identify the project, show the lead image, and show a before image only where an evidenced match exists. | Per-image captions and dimensions from `lib/projects.ts` and `docs/IMAGE_INVENTORY.md`. Before-image caption preserves the supplied black-and-white viewpoint caveat. All 11 routes emit one `CreativeWork` and the correct `ImageObject` set; each schema image uses the displayed exact alt caption and an absolute URL. |
| Project scope and key details | Explain the work without repeating the H1 or inventing project facts. | Each route’s suburb, service, story, image alt text, and optional budget/duration are in `lib/projects.ts`; no project facts or image matches were inferred. |
| Project process, related services, packages, and more project photos | Answer the next practical question, then connect the visitor to relevant proof or price context. | Shared business/process details in `lib/businessInfo.ts`, package data in `lib/packageStarts.ts`, and related records in `lib/projects.ts`. These shared components were not modified. |
| Packages hero and three starting scopes | Show price and the room-size basis together, while making clear the figures are starting prices. | Owner source `docs/source-copy/packages-2026-08-19.md`; normalized data in `lib/packageStarts.ts` (Basic $18,000, Standard $25,000, Premium $30,000 with their respective room dimensions). |
| Package inclusions and comparison table | Compare the three scopes once in a table and explain shared inclusions. | `app/packages/page.tsx` comparison rows and the same package source; every price remains paired with its size basis. |
| Package FAQs and recent work | Answer price/scope questions and substantiate the offer with actual jobs. | FAQ copy is bounded by the owner-approved package source; project photos and descriptions trace to `lib/projects.ts` and `docs/IMAGE_INVENTORY.md`. |
| About hero and Dawood family | Make the company specific through the actual family, not a generic contractor claim. | Four owners in `lib/businessInfo.ts` and `PROJECT_CONTEXT.md` (Omar, Adam, Farah, Mohammed Dawood); the displayed family photo is inventoried in `docs/IMAGE_INVENTORY.md`. |
| About licences, insurance, and standards | Make credentials checkable and distinguish building requirements from unsupported badges. | Owner-confirmed fields and authority links in `lib/businessInfo.ts`; AS 3740 is used as a wet-area standard, not as a standalone service. |
| About what we put in writing | Explain the quote and workmanship warranty in the owner's terms. | Free on-site measure, written scope, and 10-year workmanship warranty in `lib/businessInfo.ts` / `PROJECT_CONTEXT.md`; no extension to supplier product warranties. |
| About customer reviews | Give visitors attributable first-hand evidence and keep the complete set available. | Verbatim source `Customer Reviews.md` and its only permitted display data `lib/reviews.ts`. Simon Andrews, Luke Saukilai, and Kieran C are featured; the remaining 16 are in a native disclosure. No unsourced star total or aggregate schema was added. |
| About recent work and CTA | Link the people and standards back to visible project proof, then to an enquiry. | `lib/projects.ts` and the shared contact path. |
| Contact hero and call/text section | Put the free-measure offer and direct phone path ahead of the form. | `lib/businessInfo.ts`; contact rating component reads the owner-checked rating metadata there. |
| Contact next steps and contact details | Set expectations and provide the known contact routes. | Business process, phone, email, and coverage in `lib/businessInfo.ts`; no contact facts changed. |
| Contact enquiry form | Collect enough detail for an office response without interrupting the visitor. | Existing `components/EnquiryForm.tsx` and server action. On the final local production build, one marked QA enquiry reached success; the visible `tel:` link emitted exactly one `phone_call_click`. Shared form code was not changed. |

## Evidence files

- Before and after screenshots: `.impeccable/critique/issue-76-2026-11-07/{before,after}/`.
- Responsive sweep: `after/after-checks.json` — 10 screenshots, all routes 200, zero broken images, zero horizontal overflow, and no page errors.
- Route/schema sweep: `after/route-schema-checks.json` — 15 routes; all 11 project pages passed D-125 image/content checks.
- Independent final review: `.impeccable/critique/issue-76-2026-11-07-final-review.md` — no P0/P1; one shared-layout P2.
- Mobile performance comparison: `docs/PERFORMANCE_BUDGET.md` §4 — matched isolated builds, three Lighthouse runs each. LCP median improves 65 ms (2.677→2.612 s) and total transfer falls 335 KB (682→347 KB). Final LCP remains 112 ms above its 2.5 s target but passes the +300 ms regression gate; median TBT is 38 ms. Local emulation is not live CrUX.

## Decisions still outside #76

- `PROJECT_CONTEXT.md` K14 / D-103 still asks whether the photographed Hunters Hill and The Rocks jobs are the text-only case studies; the removed text-only copy was not merged into either photo-backed record.
- The final reviewer’s desktop Contact Us whitespace finding belongs to the shared composition handled under #78.
- The marked test enquiry name is `CODEX QA TEST ISSUE 76 DELETE 2026-11-07`; the office notification was accepted by Resend, and a best-effort Supabase row may exist. The reply email used `.invalid`.
