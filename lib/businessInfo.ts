/**
 * THE single source of truth for business facts.
 *
 * Rules that bind this file (CLAUDE.md → Business Rules, DECISIONS.md D-04/D-07/D-19):
 *
 *  - Never let a business fact live only in JSX, only in a doc, or only in a
 *    conversation. It lives here, and pages import it.
 *  - The licence number, phone, AS 3740 and "family-run since 2023" are
 *    load-bearing legal/trust signals. Reproduce exactly. Never approximate.
 *  - Anything not yet supplied by the owner is `null` with a note. A `null`
 *    here must render as *nothing on the page* — never as a guess, a
 *    placeholder, or a competitor's value.
 *
 * PROVENANCE: values marked "(issue #2)" come from the owner's own page-copy
 * PDFs attached to GitHub issue #2, now preserved verbatim in
 * `docs/source-copy/`. Conflicts between those PDFs and this file are listed in
 * `docs/ISSUE_FINDINGS.md` — read it before changing anything marked ⚠️.
 */

export const businessInfo = {
  name: 'Elite Touch Renovations',
  shortName: 'ETR',
  legalName: 'Elite Touch Renovations Pty Ltd',

  /**
   * ⚠️ CONTESTED. D-04 has 2023 as CONFIRMED, and the About PDF's own opening
   * line says "Since 2023, we have been helping homeowners…". But that same
   * PDF's "Our story" section says "founded in 2022".
   * Keeping 2023 — it is the CONFIRMED value and the PDF agrees with it twice
   * out of three times. Owner must settle it. See docs/ISSUE_FINDINGS.md #1.
   */
  foundedYear: 2023,

  /** Canonical origin. Matches the host in the existing Yoast sitemaps. */
  siteUrl: 'https://www.elitetouchrenovations.au',

  /** NSW Builder Licence, held by Omar Dawood (issue #2). Legally significant — D-04. */
  builderLicence: '475204C',
  builderLicenceHolder: 'Omar Dawood',

  /** (issue #2) — stated identically in the About and Bathroom service PDFs. */
  abn: '92 679 016 721',
  acn: '679 016 721',

  phone: {
    /** Exactly as the owner writes it, and as it must appear on the page. */
    display: '0411 752 334',
    /** E.164 for the tel: href. Same number, dial-safe format. */
    href: 'tel:+61411752334',
    contact: 'Omar',
  },

  /** Second listed number (issue #2). Not currently surfaced on the site. */
  secondaryPhone: {
    display: '0423 305 852',
    href: 'tel:+61423305852',
    contact: 'Mohammed',
  },

  email: {
    /**
     * ⚠️ The PDF marks the .au address "(preferred) – currently being set up".
     * Do NOT publish it until it is confirmed live and receiving — an advertised
     * address that bounces loses enquiries silently.
     */
    preferred: 'info@elitetouchrenovations.au',
    preferredIsLive: false,
    /** Currently working address (issue #2). */
    current: 'Elitetouchrenovations@gmail.com',
  },

  /** (issue #2) "Office Address: Granville, NSW (By Appointment)" */
  address: {
    suburb: 'Granville',
    state: 'NSW',
    country: 'AU',
    note: 'By appointment',
    /** Street address and postcode were never supplied. */
    street: null,
    postcode: null,
  },

  /** (issue #2) */
  hours: [
    { days: 'Monday – Friday', open: '7:00am', close: '5:30pm' },
    { days: 'Saturday', open: '8:00am', close: '3:30pm' },
  ],

  serviceArea: {
    city: 'Sydney',
    state: 'NSW',
    country: 'AU',
  },

  standards: {
    waterproofing: 'AS 3740',
    /** The service PDFs cite the dated version specifically (issue #2). */
    waterproofingDated: 'AS 3740-2021',
    note: 'Waterproofing is performed within a renovation, to AS 3740, with a certificate. It is not sold as a standalone service (DECISIONS.md D-02).',
    /** Full list from the About + Bathroom service PDFs (issue #2). */
    full: [
      { code: 'AS 3740-2021', what: 'Wet-area waterproofing' },
      { code: 'AS 4858', what: 'Waterproofing membranes' },
      { code: 'AS/NZS 3500', what: 'Plumbing and drainage' },
      { code: 'AS/NZS 3000', what: 'Electrical wiring rules' },
      { code: 'AS 1288 / AS/NZS 2208', what: 'Glazing and safety glass' },
      { code: 'AS 4586', what: 'Slip resistance for wet-area floor tiles' },
      { code: 'WELS', what: 'Water-efficient tapware and fixtures' },
    ],
  },

  /** (issue #2) — all stated in the About PDF's "Credentials and protections". */
  insurance: {
    publicLiability: '$20 million',
    workersCompensation: 'Allianz',
    homeBuildingCompensation:
      'HBCF certificates issued for all applicable residential projects',
    memberships: ['Housing Industry Association (HIA)'],
    contract: 'HIA fixed-price renovation contract',
  },

  offer: {
    primaryCta: 'Book a free on-site measure',
    secondaryCta: 'Call 0411 752 334',
    measure: 'Free on-site measure across Sydney',
    quotes: 'Fixed-scope written quotes',
    /** (issue #2) Bathroom service PDF. */
    deposit: '30% deposit',
    paymentSchedule: '30% / 40% / 30% progressive schedule',
  },

  /**
   * ⚠️ FOUR family members, not three. DECISIONS.md D-37 recorded three
   * (Omar, Adam, Farah) — that is now known to be incomplete. The About PDF
   * names four and the Home PDF says "The four Dawoods".
   * Roles here are the PDF's, which also differ from what D-37 recorded:
   * Omar is the licensed builder and founder, not a Projects Manager.
   * Adam is the father; Omar, Farah and Mohammed are the next generation.
   */
  principals: [
    {
      name: 'Omar Dawood',
      role: 'Licensed Builder & Civil Engineer',
      detail:
        'Founder. Background in civil engineering and construction management, including residential, commercial and government maintenance projects for Homes NSW. Oversees project planning, client communication and coordination.',
    },
    {
      name: 'Adam Dawood',
      role: 'Licensed Tiler & Projects Manager',
      detail:
        'More than 25 years in the construction industry. Oversees site operations, project sequencing and quality control.',
    },
    {
      name: 'Farah Dawood',
      role: 'Architectural Designer',
      detail:
        "Master's degree in Architecture from the University of Technology Sydney, with industry experience at SJB. Leads layout, finishes and material selection.",
    },
    {
      name: 'Mohammed Dawood',
      role: 'Assistant Project Manager',
      detail:
        'Graduate Certificate in Construction Project Management. Supports scheduling, site coordination and client communication.',
    },
  ],

  /**
   * (issue #2) Google Business Profile — resolves most of K2.
   * ⚠️ The rating and count are as at the date of the About PDF. VERIFY THEM
   * LIVE before displaying either, and before emitting AggregateRating schema.
   * A stale rating in structured data is a real problem, not a rounding error.
   * Note 17 Google reviews vs 19 testimonials in Customer Reviews.md — the two
   * sets are NOT the same, so never call the 19 "Google reviews".
   */
  googleBusinessProfile: {
    url: 'https://share.google/PLJDhhWBCrWAq6GVH',
    ratingAtLastCheck: 5.0,
    reviewCountAtLastCheck: 17,
    verifiedLive: false,
  },

  /** (issue #2) Used for `sameAs` in schema. */
  socialProfiles: {
    instagram: 'https://www.instagram.com/elitetouchrenovations/',
    facebook:
      'https://www.facebook.com/people/Elite-Touch-Renovations/100068012162691/',
    linkedin: 'https://www.linkedin.com/company/elite-touch-renovation-pty-ltd',
    youtube: 'https://www.youtube.com/@EliteTouchRenovations',
    tiktok: 'https://www.tiktok.com/@Elitetouchrenovation',
  },

  /**
   * STILL NOT SUPPLIED — do not invent, do not infer, do not copy a competitor's.
   */
  unknown: {
    /**
     * DECISIONS.md D-19 / K2b. STILL OPEN even after issue #2.
     * The PDFs mention a "10-year warranty from our trusted supplier" — that is a
     * SUPPLIER/product warranty on fixtures, NOT ETR's own workmanship warranty.
     * They also reference "the statutory defects period under the Home Building
     * Act 1989", which is a legal minimum, not a stated warranty term.
     * None of these is the workmanship warranty D-19 asks for. No number ships.
     */
    workmanshipWarrantyTermYears: null,
    /** Street address and postcode for the Granville office. */
    streetAddress: null,
  },
} as const

/**
 * The four services. This is the whole list (DECISIONS.md D-01).
 * Do not advertise kitchens, extensions, tiling-only, or standalone
 * waterproofing/leak repair. Competitor coverage is not a reason to claim a trade.
 *
 * `slug` values are the client's existing URL slugs, carried over from the
 * staging site so the 301s in next.config.ts land on a real page.
 */
export const services = [
  {
    slug: 'bathroom-renovations',
    title: 'Bathroom Renovations',
    h1: 'Bathroom Renovations Sydney',
    summary:
      'A full strip-out-to-studs rebuild of the main bathroom — demolition, waterproofing to AS 3740, tiling, plumbing and electrical, finished to a fixed written scope.',
  },
  {
    slug: 'ensuite-bathroom-renovations',
    title: 'Ensuite Renovations',
    h1: 'Ensuite Renovations Sydney',
    summary:
      'Small-footprint master-suite work, with the ventilation and acoustic detailing an ensuite needs when it shares a wall with the bedroom.',
  },
  {
    slug: 'laundry-renovations',
    /**
     * The slug says "laundry" because that is the client's existing URL and it
     * carries whatever equity the old page earned. The SERVICE, per D-01, is
     * "bathroom AND laundry renovations" — two wet areas in one program.
     * ETR has not confirmed standalone laundry work, so the visible title,
     * H1 and copy must never advertise it as a laundry-only service.
     */
    title: 'Bathroom + Laundry Renovations',
    h1: 'Bathroom and Laundry Renovations Sydney',
    summary:
      'Two wet areas run as a single program — one demolition, one waterproofing stage, one trade sequence, and one disruption to the house instead of two.',
  },
  {
    slug: 'powder-room-renovations',
    title: 'Powder Room Renovations',
    h1: 'Powder Room Renovations Sydney',
    summary:
      'The smallest room in the house, where every millimetre of the setout shows. Fixture placement and tile setout carry the whole result.',
  },
] as const

export type Service = (typeof services)[number]
export type ServiceSlug = Service['slug']
