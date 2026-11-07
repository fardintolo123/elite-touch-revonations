/**
 * The three "from" prices and the room each one is quoted against — one source
 * for the packages page and the price strip on service and location pages
 * (DECISIONS.md D-60/D-61, D-178).
 *
 * Source: docs/source-copy/packages-2026-08-19.md. Every figure is a starting
 * price tied to its stated bathroom size; never show one without the other, and
 * never present it as fixed — the price is firm only after the free on-site
 * measure (CLAUDE.md Business Rules).
 */
export const packageStarts = [
  { name: 'Basic', price: 'From $18,000', size: 'approx. 1.5 m × 1.8 m × 2.4 m' },
  { name: 'Standard', price: 'From $25,000', size: 'approx. 1.8 m × 2.4 m × 2.4 m' },
  { name: 'Premium', price: 'From $30,000', size: 'approx. 2.4 m × 2.4 m × 2.4 m' },
] as const
