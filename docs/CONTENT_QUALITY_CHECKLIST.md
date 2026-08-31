# Content Quality Checklist — copy, readability, conversion

How copy on this site should **read**. [SEO_CONTENT_GUIDE.md](SEO_CONTENT_GUIDE.md) decides *what* to
write; this decides *how*. [DESIGN.md](../DESIGN.md) is authoritative for anything visual.

---

## 1. Voice

Elite Touch is a **family business that does careful work and communicates well.** That is not a
marketing angle — it is what 19 independent customers actually wrote about, unprompted:
communication, responsiveness by phone and SMS, punctuality, cleanliness, precision tiling, honest
regular updates, fair pricing.

**Write like the business those reviews describe.**

| Do | Don't |
|---|---|
| Plain, confident, specific | Hype, superlatives, "unparalleled", "bespoke luxury solutions" |
| "We waterproof to AS 3740 — primer plus two coats, and you get the certificate" | "Premium quality workmanship you can trust" |
| "Adam does the tiling himself" | "Our team of expert craftsmen" (unevidenced team size) |
| Say what happens, in order | Vague reassurance |
| Admit constraints — timelines, access, one bathroom out of action | Pretend renovation is frictionless |
| Second person: "your bathroom", "you'll have…" | Third-person corporate voice |

**The single most valuable copy instruction on this site:** a specific, checkable detail always beats
an adjective. It converts better, it earns snippets, and it is the thing AI engines can quote.

---

## 2. Readability

Target **Flesch Reading Ease ≥ 60** on body copy (roughly: a comfortable read for any adult
homeowner). Renovation buyers are not tradespeople — they are choosing who to let into their home for
four weeks.

**Word length is the lever; sentence length usually is not.** Flesch is driven far more by
syllables-per-word than by sentence length, and most trade copy fails because of long Latinate nouns,
not long sentences. **Swap long words for short ones. Do not chop sentences into fragments, and never
delete real content to raise a score.**

| Long | Short |
|---|---|
| identified / determined | found |
| application / applied | put on · coat |
| infiltration / penetration | damp · water getting in |
| deterioration | wear · breaking down |
| preparation | prep · getting ready |
| specification | spec · what we agreed |
| requirements | needs |
| approximately | about |
| additional | extra |
| commence / commencement | start |
| utilise | use |
| purchase | buy |
| residential | home |
| installation | fitting · putting in |
| remediation | fixing · repair |
| comprehensive | full |

**Keep the technical terms that carry real meaning** — AS 3740, waterproofing membrane, screed,
substrate, PC items, back-to-wall pan. Define them the first time in a half-sentence. Precision is a
trust signal in this trade; vagueness is not.

> [!TIP]
> **Check shared/repeated elements first when a whole page-class fails the readability gate identically.**
> A repeated shared component (like a related-projects grid or repeated card links) that contains multi-syllable keywords can single-handedly fail a page class's Flesch gate, even if the unique body prose passes. In such cases, shortening repeated card/list labels (e.g., using a short room-type label like "Bathroom" instead of the full project name) resolves the issue without deleting any real content.

---

## 3. Structure

- **Answer-first.** The first paragraph answers the page's question. No throat-clearing.
- **Question-shaped H2s** matching real phrasing, answered immediately underneath.
- **Short paragraphs** — 2–4 sentences. Long blocks do not get read on a phone.
- **Self-contained passages** — each paragraph should still be true and useful lifted out of context,
  because that is how snippets and AI answers use it.
- **Lists for anything sequential or comparative** (process steps, package inclusions, what to expect).
- **One `<h1>`**, then a sane heading hierarchy — never skip levels for styling.
- **All SEO-relevant copy in always-rendered markup**, never behind an accordion that unmounts or a
  lazy wrapper. Collapse with CSS.

---

## 4. Keywords

- **Natural placement, no stuffing.** The target term in the H1, the title, the first paragraph, and
  where it genuinely fits. Then stop.
- **Service + suburb** on location pages ("bathroom renovations in Marrickville"), written the way a
  person would say it.
- **One page per term.** If two pages could target the same query, one of them is wrong.
- **Never repeat a suburb name so often it reads oddly aloud.** Read it out — if it sounds like
  keyword filler, it is.

---

## 5. Conversion — every page that can take an enquiry

- **Service + suburb in the H1.**
- **`0411 752 334` as a real `tel:` anchor, visible without scrolling on mobile.**
- **Primary CTA is specific:** "Book a free on-site measure" — not "Contact us".
- **Real proof early** — a named testimonial from [Customer Reviews.md](../Customer%20Reviews.md), or
  the Google rating once a Business Profile exists.
- **Trust signals stated in text:** NSW Builder Licence 475204C · AS 3740 · family-run since 2022 ·
  fixed-scope written quote · free on-site measure · **10-year workmanship warranty** (contractual:
  state it as written, never embellish it or extend it to third-party fittings; see
  [DECISIONS.md](../DECISIONS.md) D-58).
- **3-second clarity:** what we do · where · what happens next.
- **Address the real hesitations.** The owner's own draft copy names them: *"I'll be getting quotes
  that are not really quotes"* · *"I do not trust 'family business' claims"* · *"waterproofing behind
  the wall terrifies me"* · *"we have nowhere else to wash if it runs long"* · *"I've seen renovations
  that look like the brochure but feel wrong to live in"*. **A page that answers these outperforms a
  page that lists features.**

---

## 6. Hard rules

- **Never invent** a review, testimonial, project, location, before/after pair, price, credential,
  team size, or year.
- **Testimonials are verbatim**, attributed as written. Never paraphrase one into marketing copy.
- **Prices always carry their size basis**; "starts from" is never presented as a flat price.
- **Never claim a service we do not sell** ([DECISIONS.md](../DECISIONS.md) D-01/D-02).
- **Alt text describes the photograph, not the page topic.**
- **Competitor copy is never a source** — structure only (D-05).

---

## 7. Pre-ship

- [ ] Reads well **out loud**. This catches keyword stuffing and clumsy phrasing better than any tool.
- [ ] Readability target met on body copy.
- [ ] Every factual claim traces to `PROJECT_CONTEXT.md`, `Customer Reviews.md`, the issue-#2 PDFs, or
      an owner message.
- [ ] Answer-first; question-shaped H2s; no unmounted SEO copy.
- [ ] Conversion elements present (§5).
- [ ] [SEO_AEO_GEO_CHECKLIST.md](SEO_AEO_GEO_CHECKLIST.md) passed.
