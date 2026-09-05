import { businessInfo } from '@/lib/businessInfo'

type GoogleRatingProps = {
  className?: string
}

export function GoogleRating({ className }: GoogleRatingProps) {
  const profile = businessInfo.googleBusinessProfile

  if (!profile.verifiedLive) return null

  const rating = profile.ratingAtLastCheck.toFixed(1)
  const reviewCount: number = profile.reviewCountAtLastCheck
  const reviewLabel =
    reviewCount === 1 ? 'Google review' : 'Google reviews'

  return (
    <a
      className={['et-google-rating', className].filter(Boolean).join(' ')}
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
