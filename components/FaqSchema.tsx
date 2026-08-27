/**
 * FAQPage JSON-LD — structured data only, no visible UI.
 *
 * Per `docs/SEO_AEO_GEO_CHECKLIST.md` Phase 1: "FAQPage where a real FAQ
 * block exists." Pass the exact same question/answer pairs rendered on the
 * page — never emit a question here that isn't also visible in the markup
 * (that is invisible content to a crawler, the same failure mode D-31 exists
 * to prevent).
 */

type FaqItem = { question: string; answer: string }

export function FaqSchema({ items }: { items: readonly FaqItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
