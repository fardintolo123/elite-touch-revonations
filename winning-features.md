# Winning Features — Elite Touch Renovations

A living catalogue of implemented patterns worth understanding and adapting. Maintain it using
[project knowledge](.agents/workflows/project-knowledge.md). "Winning" names the catalogue;
it does not establish a measured conversion or ranking improvement.

Initial source inspection: 2026-11-05, published main revision `30a60086d120862d763c511bc8e08ed0d74d6860`.
Entries below were checked against that source, not inferred from 4ElementsPainting's catalogue.
Browser checks and business outcomes were not rerun for this documentation task. Recheck the current
revision before reuse, and update/retire an entry when its implementation changes.

## Progressive enquiry with an ordinary-form fallback

**What it does:** [EnquiryForm](components/EnquiryForm.tsx) defines a two-step service/contact flow.
Both sets of fields remain in the DOM; enhancement controls visibility, while the ordinary form and
server-side validation remain the submission path. Service choices derive from the business data.

**Why useful:** visitors can start with the room/service, and the unenhanced form still has a route
to submission. This is an implementation and accessibility rationale, not proof of higher conversion.

**Reusable pattern:** enhance an existing form rather than making the only submission path depend
on client state. Preserve server validation, error behavior and retained field values when adapting it.

**Evidence/status:** source-verified at the revision above; see EnquiryForm and [businessInfo](lib/businessInfo.ts).
Current browser acceptance and conversion lift: not measured in this catalogue setup.

## Reusable contact section near the reader's next action

**What it does:** [ContactSection](components/ContactSection.tsx) composes the enquiry form, confirmed
contact information and privacy link. The [blog route](app/blog/%5Bslug%5D/page.tsx) uses that shared
section rather than defining another independent enquiry form.

**Why useful:** the call-to-action behavior and data can be maintained in one place. Loading the
client form on content routes has a bundle cost, so preserve the project's existing performance rules.

**Reusable pattern:** share the actual conversion component and offer clear contact/privacy context;
measure its cost and behavior where it is mounted instead of assuming it is free or universally better.

**Evidence/status:** source-verified at the revision above. Placement-specific conversion impact and
current performance effect: not measured in this setup.

## Blog data drives routes, metadata and sitemap entries

**What it does:** [blog data](lib/blog.ts) supplies the [blog route](app/blog/%5Bslug%5D/page.tsx)'s static
parameters and metadata, and [the sitemap](app/sitemap.ts) reads the same post collection.

**Why useful:** page identity and publication mechanics have shared data inputs. This reduces repeated
editing, but an entry alone does not prove useful content, valid links or a successful deployment.

**Reusable pattern:** derive route and metadata collections from a canonical dataset; verify the
rendered page, relevant internal links and sitemap together. Check separate QA inventories too.

**Evidence/status:** source-verified at the revision above. No ranking or indexing improvement is
claimed from this architecture alone.

## One-screen full-bleed homepage hero

**What it does:** `app/page.tsx` and `app/page.module.css` use the existing attributed Hornsby bathroom photo as a static, high-priority full-bleed image. The hero height subtracts the sticky header from the viewport, keeps the H1, inline Google rating, primary room-to-enquiry choices, tap-to-call, quote/warranty facts and project credit in the first screen, and applies the shared scrim. `components/HomeEnquiryStarter.tsx` labels the room links as the starting path.

**Why useful:** an actual Elite Touch project supplies the visual proof, and the hero gives visitors the real service choices and contact route without extending past the first viewport. The static image avoids hiding the LCP image during an entrance animation. This is a design rationale, not a measured conversion benefit.

**Reusable principle:** use a business-owned, correctly attributed project photo; subtract the measured sticky-header height; test the crop and text contrast at 390px and 1440px, plus short mobile height; keep the LCP image eager/high-priority and unanimated; preserve the existing business facts and room-to-form handoff. Do not copy another project's photo, services or claims.

**Evidence/status:** based on HEAD `96231f0b`; verified 2026-11-10. Production build, `typecheck`, `check:design` and `check:readability` (118/118) pass. Final browser captures at 390×844, 1440×900 and 390×667 show the hero bottom 0.4px, 1.2px and 0.2px inside the viewport; the independent screenshot review found no P0/P1/P2. Matched Lighthouse 13.4.1 mobile median LCP is 2.644s before / 3.064s after (+420ms); the final-source runs include the 1px height guard. The image request is high-priority and 15.7KB, and Lighthouse reports no LCP savings from its discovery/breakdown audits. A sync-decode experiment was reverted after TBT reached 627ms. The owner approved publication despite the 2.5s LCP target and +300ms regression gate on 2026-11-10. Release is pending safe `main` reconciliation; conversion, SEO and field Core Web Vitals impact are not measured.
