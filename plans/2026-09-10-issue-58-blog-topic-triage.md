# Plan — Issue #58 triage: blog topic list from PDF

**Date:** 2026-09-10
**Issue:** "see how many blogs can you add base on this pdf"
**Routed per CLAUDE.md:** SEO/content strategy -> `docs/SEO_CONTENT_GUIDE.md`; anything settled -> `DECISIONS.md`.

## 1. Objective
Use the owner-approved issue #58 exception to select and publish a first wave of useful blog posts from the attached PDF.

## 2. Findings
- The PDF is a generic AI-generated “blog topic ideas” list for `bathroom renovation in Sydney`.
- It contains 40 titles plus bonus ideas, but no keyword-volume or difficulty evidence.
- The owner explicitly approved the source-backed PDF as sufficient for this first wave and instructed us to skip GKP/Ahrefs volume and difficulty checks.
- The first wave is limited to six topics that fit ETR's services and verified business facts.

## 3. Decision
**Create the first wave under D-139.**

Publish six articles: cost, timeline, quote comparison, questions to ask a renovator, a planning checklist and small-bathroom design. Keep the normal evidence gate for future reports unless the owner approves another exception.

## 4. Acceptance criteria for this task
- [x] Read the issue attachment and extract actual content.
- [x] Check the issue against `docs/SEO_CONTENT_GUIDE.md` and `DECISIONS.md`.
- [x] Record the owner-approved exception in `DECISIONS.md` and `docs/SEO_CONTENT_GUIDE.md`.
- [x] Create a data-driven blog index and six static article routes.
- [x] Add metadata, JSON-LD, internal navigation, sitemap entries and enquiry CTAs.
- [x] Validate TypeScript, production build and served HTML.

## 5. What not to do
- Do not present the PDF as keyword-volume evidence.
- Do not publish unsupported claims, invented prices or services outside ETR's four confirmed services.
- Do not treat this owner-approved exception as a blanket waiver for future reports.
