import { packageStarts } from '@/lib/packageStarts'

/* "approx. 1.5 m × 1.8 m × 2.4 m" -> "1.5 × 1.8 × 2.4 m": the same figures in a form that fits a
   three-column row on a phone. "approx." moves to the note beneath the row. */
const compactSize = (size: string) =>
  size.replace('approx. ', '').replace(/ m(?= ×)/g, '').replace(/ m$/, '') + ' m'

/**
 * The three "from" prices and the room each is quoted against, as one ruled row
 * (D-178). Data comes from `lib/packageStarts.ts`, the single source shared with
 * the packages page. Never show a price here without its size basis, and keep the
 * note: the price is firm only after the free on-site measure.
 */
export function PriceStrip() {
  return (
    <div className="et-price-strip-wrap">
      <dl className="et-price-strip">
        {packageStarts.map((tier) => (
          <div key={tier.name} className="et-price-strip-cell">
            <dt>{tier.name}</dt>
            <dd className="et-price-strip-price">{tier.price}</dd>
            <dd className="et-price-strip-size">{compactSize(tier.size)}</dd>
          </div>
        ))}
      </dl>
      <p className="et-body-sm et-price-strip-note">
        Starting prices, each for the approximate room size shown. Your price is firm after the
        free on-site measure.
      </p>
    </div>
  )
}
