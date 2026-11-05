import { PriceStrip } from '@/components/PriceStrip'

/**
 * The opening answer of a service, hub or suburb page (D-178, D-174 applied).
 *
 * The first paragraph stays visible as the lead. When `prices` is set, the three
 * "from" prices and the room each is quoted against sit above it as one ruled
 * row, so the numbers are the first thing read instead of living in 14px prose.
 * Every later paragraph is still in the served HTML inside a native `<details>`
 * (closed by default), so collapsing it hides copy from view without removing
 * any of it from what crawlers read — the same mechanism as the FAQ list.
 *
 * `html` is true where the copy carries internal links from the linking system
 * (hub and suburb answers); service `about` paragraphs are plain text.
 */
export function AnswerBlock({
  paragraphs,
  html = false,
  prices = false,
  pricesAfterLead = false,
}: {
  paragraphs: readonly string[]
  html?: boolean
  prices?: boolean
  /** Put the strip after the lead paragraph, for headings that are about the problem, not the cost. */
  pricesAfterLead?: boolean
}) {
  const [lead, ...rest] = paragraphs

  const paragraph = (text: string, className: string, key?: number) =>
    html ? (
      <p key={key} className={className} dangerouslySetInnerHTML={{ __html: text }} />
    ) : (
      <p key={key} className={className}>
        {text}
      </p>
    )

  const strip = prices ? <PriceStrip /> : null

  return (
    <>
      {!pricesAfterLead && strip}

      {lead && paragraph(lead, 'et-lead et-measure')}

      {pricesAfterLead && strip}

      {rest.length > 0 && (
        <details className="et-more">
          <summary>Read the full breakdown</summary>
          <div className="et-stack">
            {rest.map((text, index) => paragraph(text, 'et-body-sm et-measure', index))}
          </div>
        </details>
      )}
    </>
  )
}
