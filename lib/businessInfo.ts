/**
 * THE single source of truth for business facts.
 *
 * Rules that bind this file (CLAUDE.md → Business Rules, DECISIONS.md D-04/D-07/D-19):
 *
 *  - Never let a business fact live only in JSX, only in a doc, or only in a
 *    conversation. It lives here, and pages import it.
 *  - The licence number, phone, AS 3740 and "family-run since 2022" are
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
   * RESOLVED 2026-08-19 — owner answered "2022" directly when asked
   * "Founded 2022 or 2023?". This overrides D-04's earlier 2023 and the
   * About PDF's contradictory "Since 2023" line. Owner instruction is the
   * top of the source-of-truth hierarchy.
   */
  foundedYear: 2022,

  /** Canonical origin. Matches the host in the existing Yoast sitemaps. */
  siteUrl: 'https://www.elitetouchrenovations.au',

  /** Authoritative public sources for checkable regulatory and industry claims. */
  authorities: {
    nswLicenceRegister: 'https://verify.licence.nsw.gov.au/home/Trades',
    nswHomeBuildingContracts:
      'https://www.nsw.gov.au/housing-and-construction/building-or-renovating-a-home/preparing/contracts',
    nccWetAreas:
      'https://ncc.abcb.gov.au/editions/ncc-2022/adopted/volume-one/f-health-and-amenity/26-waterproofing-and-water-resistance-requirements-building-elements-wet-areas',
    as3740: 'https://www.abcb.gov.au/ncc-navigator/waterproofing-houses',
    hiaMembers: 'https://hia.com.au/hia-community/our-members',
    wels: 'https://www.waterrating.gov.au/about',
  },

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
     * RESOLVED 2026-08-19 — owner answered "Info@elitetouchrenovations.au"
     * when asked which address to use on the site. Published as the primary.
     * Lowercased for the mailto: — addresses are case-insensitive in the
     * local part in practice, and lowercase avoids looking like a typo.
     */
    primary: 'info@elitetouchrenovations.au',
    /** Kept on file; no longer shown on the site. */
    legacyGmail: 'Elitetouchrenovations@gmail.com',
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
    /**
     * RESOLVED 2026-08-19 (D-63) — owner: "we work all over Sydney but we
     * prefer some areas over others". Coverage is Sydney-wide.
     * ⚠️ This is a COVERAGE claim, not a site-structure change. Which suburbs
     * get their own page is still governed by D-10 and the volume evidence in
     * docs/BATHROOM_SITE_STRUCTURE.md.
     */
    coverage: 'across Sydney',
  },

  /**
   * RESOLVED 2026-08-19 (D-67) — owner answered "yes" to "Do you do commercial
   * work?".
   *
   * ⚠️ Scope discipline still applies. This widens the CLIENT TYPE, not the
   * service list: the four services in `services` below are unchanged (D-01).
   * The wording used on the site is the owner's own from the About PDF —
   * "residential and commercial, with most of our work focused on family
   * homes" — which is accurate and appropriately hedged.
   *
   * Do NOT extrapolate from this into commercial-specific compliance claims
   * (accessible/DDA bathrooms to AS 1428, strata programs, end-of-trip
   * facilities). Those are different obligations and none of them is evidenced.
   */
  clientTypes: {
    residential: true,
    commercial: true,
    emphasis: 'most of our work is family homes',
  },

  standards: {
    waterproofing: 'AS 3740',
    /** The service PDFs cite the dated version specifically (issue #2). */
    waterproofingDated: 'AS 3740-2021',
    note: 'Waterproofing is performed within a renovation, to AS 3740, with a certificate. It is not sold as a standalone service (DECISIONS.md D-02).',
    /** Full list from the About + Bathroom service PDFs (issue #2). */
    full: [
      {
        code: 'AS 3740-2021',
        what: 'Wet-area waterproofing',
        authorityKey: 'as3740',
      },
      { code: 'AS 4858', what: 'Waterproofing membranes' },
      { code: 'AS/NZS 3500', what: 'Plumbing and drainage' },
      { code: 'AS/NZS 3000', what: 'Electrical wiring rules' },
      { code: 'AS 1288 / AS/NZS 2208', what: 'Glazing and safety glass' },
      { code: 'AS 4586', what: 'Slip resistance for wet-area floor tiles' },
      {
        code: 'WELS',
        what: 'Water-efficient tapware and fixtures',
        authorityKey: 'wels',
      },
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

  /**
   * RESOLVED 2026-08-19 — D-19 / K2b is CLOSED. Asked directly
   * "What's your workmanship warranty?", the owner answered "10 year's warranty".
   * That is an owner statement about ETR's own workmanship, distinct from the
   * "10-year warranty from our trusted supplier" in the Action Items PDF, which
   * was a product warranty on fittings.
   * ⚠️ This is a CONTRACTUAL claim on a licensed builder's site. It may be
   * stated as written and must never be embellished — no "lifetime", no
   * "fully guaranteed", no extending it to fittings or third-party products.
   */
  workmanshipWarrantyYears: 10,

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
   * Owner-supplied package revision date. Rendered on `/packages/` as a
   * freshness signal and a stale-price guard. This changes only when the
   * package content is genuinely reviewed or changed.
   */
  packagePricingUpdated: '2026-08-19',

  /**
   * "Last updated" date shown on `/privacy/` and `/terms/`. A real content
   * date — bump it ONLY when the wording of those pages actually changes
   * (e.g. a new data processor, a change to what the form collects), never on
   * a routine deploy. Same discipline as `packagePricingUpdated` and the
   * sitemap `lastModified` rule.
   */
  legalPagesUpdated: '2026-09-02',

  /**
   * RESOLVED 2026-08-19 (D-75) — settles the two conflicting durations.
   *
   * OWNER-CORRECTED 2026-08-20: a standard full renovation is **3–4 weeks**,
   * not the 3–5 the service PDF stated. The owner knows how long their own
   * jobs run; that supersedes both PDFs for this row.
   * The breakdown-by-job-type structure is kept, because a single flat figure
   * would be a promise ETR breaks on any job that moves walls.
   *
   * It is also corroborated: the documented Artarmon project ran TWO wet areas
   * in four weeks, which is consistent with 3–5 for a single full renovation
   * and not with 2–4 as a universal figure.
   *
   * ⚠️ The service PDF also priced a "Refresh package" at 1–2 weeks. That is a
   * FIFTH service D-01 does not confirm, so it is deliberately omitted here.
   * Do not add it back without owner sign-off.
   *
   * ⚠️ These are on-site programs, and they are a customer promise. The reviews
   * repeatedly praise ETR for finishing on time — that reputation is the asset
   * being protected by quoting the honest range rather than the flattering one.
   */
  buildDurations: [
    {
      label: 'Full renovation',
      detail: 'same footprint, everything new',
      weeks: '3–4 weeks',
    },
    {
      label: 'Premium build',
      detail: 'natural stone, custom joinery, complex glazing',
      weeks: '5–6 weeks',
    },
    {
      label: 'Reconfigure',
      detail: 'walls or fixture positions move',
      weeks: '5–7 weeks',
    },
  ],

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
        'Founder. Background in civil engineering and construction management, including home, commercial and government maintenance projects for Homes NSW. Leads project planning, talks with clients, and keeps the job on track.',
    },
    {
      name: 'Adam Dawood',
      role: 'Licensed Tiler & Projects Manager',
      detail:
        'More than 25 years in the construction industry. Runs site operations, project sequencing and quality control.',
    },
    {
      name: 'Farah Dawood',
      role: 'Architectural Designer',
      detail:
        "Master's degree in Architecture from the University of Technology Sydney, with industry experience at SJB. Leads layout, finishes and material choices.",
    },
    {
      name: 'Mohammed Dawood',
      role: 'Assistant Project Manager',
      detail:
        'Graduate Certificate in Construction Project Management. Helps schedule work, coordinate the site and talk with clients.',
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
    /**
     * Issue #45 review-generation prompt. This deliberately uses the known
     * profile URL until the owner supplies a dedicated short review URL.
     * Do not display rating/count from this object until `verifiedLive` is true.
     */
    reviewPromptUrl: 'https://share.google/PLJDhhWBCrWAq6GVH',
    ratingAtLastCheck: 5.0,
    reviewCountAtLastCheck: 17,
    verifiedLive: false,
  },

  /**
   * RESOLVED 2026-08-19 — owner confirmed the tree planting is actually
   * running when asked "Is the Greenfleet tree-planting actually running?".
   * One tree per completed project, through Greenfleet.
   */
  sustainability: {
    partner: 'Greenfleet',
    partnerUrl: 'https://www.greenfleet.com.au',
    claim: 'We plant one tree for every project we complete, through Greenfleet.',
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
    updated: '2026-08-27',
    summary:
      'A full strip-out-to-studs rebuild of the main bathroom. Demolition, waterproofing to AS 3740, tiling, plumbing and electrical — finished to a fixed written scope.',
  },
  {
    slug: 'ensuite-bathroom-renovations',
    title: 'Ensuite Renovations',
    h1: 'Ensuite Renovations Sydney',
    updated: '2026-08-27',
    summary:
      'Small-footprint master-suite work. We handle the ventilation and sound-proofing an ensuite needs when it shares a wall with the bedroom.',
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
    updated: '2026-08-27',
    summary:
      'Two wet areas run as a single program. One demolition, one waterproofing stage, one trade sequence — and one disruption to the house instead of two.',
  },
  {
    slug: 'powder-room-renovations',
    title: 'Powder Room Renovations',
    h1: 'Powder Room Renovations Sydney',
    updated: '2026-08-27',
    summary:
      'The smallest room in the house, where every millimetre of the setout shows. Fixture placement and tile setout carry the whole result.',
    /**
     * Sourced verbatim/paraphrased from `docs/source-copy/svc-powder.md`
     * (owner-supplied PDF, GitHub issue #2) — never invented. Added
     * 2026-08-27 per DECISIONS.md D-107: real GKP-confirmed demand exists
     * for "small bathroom renovation sydney" (100–1K/mo, High competition —
     * docs/BATHROOM_SITE_STRUCTURE.md), and powder room is the one
     * confirmed ETR service that genuinely is a small bathroom. This is an
     * IMPROVE of the existing page, not a new blog post.
     */
    about:
      'A powder room is a small bathroom — typically 1.5–3 square metres — with a toilet and a hand basin and usually nothing else. Sometimes called a "half bath" or "guest WC", it is the smallest wet area in the house, and normally sits on the ground floor near the living areas so guests never need to enter a bedroom-adjacent bathroom.',
    /**
     * Suppress the shared `businessInfo.buildDurations` block on this page only.
     *
     * That block is "3–4 weeks / 5–6 / 5–7", owner-corrected for a full BATHROOM
     * renovation (D-75). A powder room is not that job, and showing those weeks
     * here directly contradicts this page's own FAQ ("a full renovation … around
     * seven working days"). The FAQ carries the accurate, D-107-sourced timeline,
     * so the generic weeks widget is dropped rather than shown with a wrong
     * number. Do NOT replace it with invented powder-room week/day figures — if a
     * per-service duration is wanted here, it needs an owner figure first.
     * (blog-analyze finding F-1, 2026-09-01 — see plans/2026-09-01-blog-analyze-*.)
     */
    hideBuildDurations: true,
    faqs: [
      {
        question: 'What is the smallest a powder room can be?',
        answer:
          'Practically, around 0.8 m wide by 1.5 m deep — enough for a basin, a WC and room for the door to open. Any tighter and the room starts to feel cramped and can struggle to meet the minimum clearances around fixtures.',
      },
      {
        question: 'Do powder rooms really need waterproofing?',
        answer:
          'Yes. Under AS 3740-2021, any room with a floor waste and a water-supply fixture is a wet area, so the floor needs a compliant, certified waterproof membrane. The scope is smaller than a full bathroom — no shower walls, no hob — but the floor is not optional.',
      },
      {
        question:
          'Can a small bathroom renovation like a powder room be done in less than a week?',
        answer:
          'A refresh — the same fixtures replaced like-for-like, new paint, new fittings — can be done in three to five working days. A full renovation that needs strip-out and re-waterproofing needs the membrane to cure before tiling, which puts the realistic minimum at around seven working days.',
      },
      {
        question: 'Can a powder room add value to my home?',
        answer:
          "A well-designed, well-finished powder room is one of the strongest per-dollar value adds in a Sydney home, particularly if the property doesn't already have a downstairs WC. It gives guests somewhere to go without walking through a bedroom-adjacent bathroom, and adds a design moment to the public part of the house.",
      },
    ],
  },
] as const

export type Service = (typeof services)[number]
export type ServiceSlug = Service['slug']
