/**
 * The one FAQ accordion for the whole site.
 *
 * WHY THIS EXISTS (D-169). `/packages/`, `/services/[slug]/` and
 * `/blog/[slug]/` each inlined the same markup — a `<details className="et-card">`
 * with the question as an `et-h4`. On `/packages/` that reads as eight
 * near-heading-sized rows each inside a full `space-8`/`space-10` card, which is
 * what the owner meant by "the FAQs are too big": the questions competed with
 * the section's own H2 and the list took most of a viewport before a single
 * answer was open. One renderer, one size, three call sites.
 *
 * Server component by design — no `'use client'`. `<details>`/`<summary>` is
 * native, so the open/close needs no JavaScript and, more importantly, the
 * answers stay in the server HTML. They feed `FAQPage` JSON-LD
 * (`lib/schema.ts` `buildFaqNode`) and a schema answer that is not also in the
 * markup is the invisible-content failure mode (D-31). Never convert this to a
 * conditional mount.
 *
 * `answer` is plain text on purpose — CLAUDE.md's FAQ rule: these strings go
 * straight into JSON-LD, and embedded markup corrupts structured data without
 * failing the build.
 */

export type FaqItem = {
  question: string
  answer: string
}

export function FaqList({ items }: { items: readonly FaqItem[] }) {
  if (items.length === 0) return null

  return (
    <div className="et-faq">
      {items.map((item) => (
        <details key={item.question} className="et-faq-item">
          <summary className="et-faq-question">
            <span>{item.question}</span>
          </summary>
          <p className="et-faq-answer">{item.answer}</p>
        </details>
      ))}
    </div>
  )
}
