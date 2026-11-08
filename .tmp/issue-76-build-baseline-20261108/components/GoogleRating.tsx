import { businessInfo } from '@/lib/businessInfo'

type GoogleRatingProps = {
  className?: string
  /** One inline line with no card (D-177): for heroes, where the card out-shone the CTA. */
  compact?: boolean
}

export function GoogleRating({ className, compact = false }: GoogleRatingProps) {
  const profile = businessInfo.googleBusinessProfile

  if (!profile.verifiedLive) return null

  const rating = profile.ratingAtLastCheck.toFixed(1)
  const reviewCount: number = profile.reviewCountAtLastCheck
  const reviewLabel =
    reviewCount === 1 ? 'Google review' : 'Google reviews'

  return (
    <a
      className={['et-google-rating', compact && 'et-google-rating-compact', className]
        .filter(Boolean)
        .join(' ')}
      href={profile.url}
      rel="noopener noreferrer"
      target="_blank"
      aria-label={`${businessInfo.name} has a ${rating} out of 5 Google rating from ${reviewCount} ${reviewLabel}. Open reviews on Google.`}
    >
      <span className="et-google-rating-score">{rating}</span>
      <span className="et-google-rating-copy">
        <strong>out of 5 on Google</strong>
        <span>
          {reviewCount} {reviewLabel}
        </span>
      </span>
      <span className="et-google-rating-link">Reviews on Google</span>
    </a>
  )
}
