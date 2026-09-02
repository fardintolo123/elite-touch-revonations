/**
 * The 19 real customer testimonials, reproduced VERBATIM from
 * `Customer Reviews.md`, attributed exactly as written there.
 *
 * DECISIONS.md D-03 — this is the ONLY permitted source of review copy.
 * Never write a testimonial. Never invent a customer. Never trim a quote into
 * something punchier. Never inflate the count.
 *
 * NOT permitted from this data (PROJECT_CONTEXT.md K2 is still open):
 *  - any star rating, on the page or in schema
 *  - AggregateRating schema — we have no verified rating value or source
 *  - describing these as "Google reviews" — it is not confirmed they came
 *    from the Google Business Profile
 *
 * Editing rule: if you change a word of a quote, you have broken D-03.
 * Corrections come from the owner, into `Customer Reviews.md`, then here.
 */

export type Review = {
  /** Reviewer name exactly as written in Customer Reviews.md. */
  author: string
  /** The review text, verbatim. Paragraphs separated by a blank line. */
  body: string
}

export const reviews: readonly Review[] = [
  {
    author: 'Simon Andrews',
    body: 'Adam was a pleasure to work with. He offered great advice and was very easy to communicate with. Very happy with the work he did and would definitely hire again.',
  },
  {
    author: 'Nikki Comensoli',
    body: 'From the first contact with Omar and Adam, I felt happy to have found a great team to help us with our three-bathroom complete renovation. Every detail was done with care and attention. Our bathrooms are all great, and our new bathtub is a favourite in our family. Nothing was too difficult, and everything was completed on time and with care. We will definitely be using Elite Touch Renovations in the future. We would definitely highly recommend their work.',
  },
  {
    author: 'Phil Deayton',
    body: 'Would definitely recommend them, especially for their attention to detail. It was 100%.',
  },
  {
    author: 'Abdul Noori',
    body: 'Elite Touch Renovations is the best renovation company. I had my bathroom renovated by them, and they were amazing. The job was excellent. If I could add five more stars, I would. Highly recommend Elite Touch Renovations. Thanks guys, well done.',
  },
  {
    author: 'Shane Kubacki',
    body: "Elite Touch Renovations did an incredible job on our bathroom renovation! The process was smooth, and the team was friendly, professional, and super helpful. Our bathroom looks amazing, and we couldn't be happier with the results. Highly recommend them.",
  },
  {
    author: 'Eren Coskun',
    body: 'Omar and Adam are great bathroom builders! They did an awesome job and made the whole process easy. I highly recommend them!',
  },
  {
    author: 'Luke Saukilai',
    body: 'Really happy with the work from Elite Touch Renovations! They did an awesome job on my bathroom. The team was friendly, showed up on time, and got everything done quickly. Super happy with how it turned out. Definitely recommend them!',
  },
  {
    author: 'Peta Grund',
    body: "Omar and Adam did a wonderful job on our bathroom renovation. Adam's precision and attention to detail with the tiling is second to none. Omar kept me updated with progress, and it was great to get to know them.",
  },
  {
    author: 'Lachlan Conaty',
    body: "I'm thrilled with the bathroom renovation done by Elite Touch Renovations. They were friendly, professional, and did a fantastic job. They listened to what I wanted, offered great suggestions, and completed the project on time. I highly recommend them for anyone needing a bathroom makeover!",
  },
  {
    author: 'Guot Lual',
    body: "I'm really happy with the bathroom renovation done by Elite Touch Renovations. They did an excellent job from start to finish. The team was professional, on time, and communicated well. My bathroom looks fantastic now—modern and functional. I highly recommend them for any renovation project!",
  },
  {
    author: 'Dinous Bakini',
    body: 'I had an excellent experience with Elite Touch Renovations for my bathroom renovation. From start to finish, they exceeded my expectations. The team was professional and highly skilled. They completed the project on time and within budget, and the quality of their work is outstanding. My new bathroom looks amazing! I highly recommend them for anyone looking for renovation services.',
  },
  {
    author: 'Ali Hassan',
    body: 'The bathroom renovation team was awesome! They listened to what we wanted, gave us great ideas, and did fantastic work. They were on time, respectful, and finished everything when they said they would. We highly recommend them for anyone needing a bathroom makeover!',
  },
  {
    author: 'Huseyin Sumaktas',
    body: 'The work that Elite Touch Renovations did for me was perfect, well priced, and they had great communication and service. The attention to detail was amazing and the quality was 100%. I will definitely use them again and recommend them to everyone.',
  },
  {
    author: 'Ken Chen',
    body: "Omar, Adam and the team did an excellent job renovating our main bathroom, ensuite and standalone toilet. They managed everything from the demolition, waterproofing, plumbing, tiling and installation of new shower screens, fixtures, vanities, toilets, etc.\n\nAdam and Omar were very easy to communicate with and very responsive via phone and SMS. They were patient in answering our questions and tailored the works to suit what we were after. They had very good attention to detail and were always happy to accommodate our requests and suggestions.\n\nMost importantly, they were professional, honest and provided us with regular updates throughout the job. Thank you once again—we couldn't be happier with our bathroom renovations and would absolutely recommend them to others!",
  },
  {
    author: 'Milan',
    body: "Omar was the best and easiest person to deal with, replied quickly and did a great job on my bathroom. I wouldn't choose anyone other than ETR.",
  },
  {
    author: 'Alex Mustafa',
    body: "I'm delighted with the exceptional service provided by ETR for my recent bathroom renovation. They demonstrated professionalism and expertise throughout, transforming my outdated bathroom into a modern oasis with meticulous attention to detail.\n\nCommunication was excellent, with clear timelines and updates provided regularly. I highly recommend Elite Touch Renovations for anyone seeking top-notch bathroom renovation services. Thank you for exceeding my expectations and turning my vision into reality!",
  },
  {
    author: 'Jaya Rupan',
    body: "I recently had my bathroom renovated by ETR and I'm thrilled with the results. The team was professional, punctual, and skilled, turning my ideas into a beautiful, functional space. The quality of materials and craftsmanship was excellent, and they completed the project on time and within budget. I highly recommend ETR for their outstanding work and customer service.",
  },
  {
    author: 'Rasha Sayel',
    body: 'ETR did an awesome job renovating our bathroom. They kept me updated at every step. Definitely recommend them.',
  },
  {
    author: 'Kieran C',
    body: "Adam and Omar did a very professional job installing large format Carrara marble wall and floor tiles for our bathroom renovation. The finished tiling was first class with good falls, neat consistent joints, clean cuts and no lippage. They exercised due care at all times including providing drop sheets and surface protection to and from the work area and leaving the site clean and tidy at the end of each day. Good housekeeping of this standard is not common practice for the majority of tradespeople in my experience and is evidence of a company that takes great pride in their work. Their price for the job was competitive to boot. I'd highly recommend their services and would use again.",
  },
]

/** Pull a fixed slice for a page. Deterministic — never randomise SEO copy. */
export function featuredReviews(count: number): readonly Review[] {
  return reviews.slice(0, count)
}

/**
 * Look up one review by the reviewer's exact name. Used where a page pins a
 * specific testimonial (e.g. the regional hubs, `lib/hubContent.ts`). Throws at
 * build time on a typo rather than silently rendering nothing — a missing
 * testimonial should fail loudly, not disappear.
 */
export function reviewByAuthor(author: string): Review {
  const match = reviews.find((review) => review.author === author)
  if (!match) {
    throw new Error(`No review by "${author}" in Customer Reviews.md / lib/reviews.ts`)
  }
  return match
}
