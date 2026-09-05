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

  /**
   * Schema-only entity fields.
   *
   * `geo` is a coarse Granville suburb point, not a street address and not a
   * walk-in office pin. Street address and postcode remain unknown and must not
   * be invented.
   */
  schema: {
    businessIdPath: '/#business',
    websiteIdPath: '/#website',
    logo: {
      path: '/brand/etr-mark.webp',
      width: 163,
      height: 160,
    },
    images: [
      '/images/projects/hunters-hill-bathroom/double-vanity-marble.webp',
      '/images/projects/the-rocks-bathroom/shower-window-tub-wide.webp',
      '/images/projects/artarmon-bathroom-ensuite/double-vanity-corner-window.webp',
    ],
    /**
     * Google accepts a short text price band. Use `$$$` rather than a bare
     * dollar figure so schema does not detach the published package prices from
     * their required room-size basis (D-07).
     */
    priceRange: '$$$',
    geo: {
      latitude: -33.83611,
      longitude: 151.00722,
    },
  },

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
    /** Same number in international format for schema. */
    e164: '+61411752334',
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
   * Google Business Profile. The rating/count were live-checked on 2026-09-04
   * from the public ProvenExpert profile that mirrors Google Maps reviews:
   * 5.00 from 19 Google Maps reviews. The canonical profile link remains the
   * owner-supplied share.google URL. These are Google-only reputation figures,
   * separate from the 19 verbatim testimonials in Customer Reviews.md.
   */
  googleBusinessProfile: {
    url: 'https://share.google/PLJDhhWBCrWAq6GVH',
    /**
     * Issue #45 review-generation prompt. This deliberately uses the known
     * profile URL until the owner supplies a dedicated short review URL.
     * Use the same verified profile URL for the post-enquiry review prompt
     * until the owner supplies a dedicated short review URL.
     */
    reviewPromptUrl: 'https://share.google/PLJDhhWBCrWAq6GVH',
    ratingAtLastCheck: 5.0,
    reviewCountAtLastCheck: 19,
    verifiedLive: true,
    verifiedAt: '2026-09-04',
    verificationSource:
      'Public ProvenExpert profile mirroring Google Maps reviews showed 5.00 from 19 Google Maps reviews.',
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
    updated: '2026-09-04',
    summary:
      'A full strip-out-to-studs rebuild of the main bathroom. Demolition, waterproofing to AS 3740, tiling, plumbing and electrical — finished to a fixed written scope.',
    /**
     * Added 2026-09-04 per DECISIONS.md D-126 / issue #34. Sourced from the
     * owner-supplied `docs/source-copy/svc-bathroom.md` PDF, EXCEPT pricing and
     * duration: the PDF's own indicative dollar ranges ($25k–$60k) and "3–5
     * week" figure are superseded on this site by the package from-prices
     * (D-60/D-61) and the owner-corrected build durations (D-75) — never
     * reintroduce the PDF's numbers here.
     */
    about:
      'A full bathroom renovation is a strip-out-to-studs rebuild: everything comes out — tiles, fixtures, the old waterproofing membrane, sometimes the walls themselves — and the room is rebuilt from the substrate up. We run demolition, plumbing, electrical, waterproofing to AS 3740, tiling and fit-off as one team, from the on-site measure through to handover. It starts from $18,000 for a small bathroom about 1.5 by 1.8 by 2.4 metres on our Basic package, from $25,000 for Standard and from $30,000 for Premium — see how the packages differ below. A full renovation runs three to four weeks on site. Older Sydney homes can turn up rot, non-compliant plumbing or asbestos once the room is opened up, and the written quote sets out how that is handled before work starts, not after. Every job is done under NSW Builder Licence 475204C and carries a 10-year workmanship warranty.',
    faqs: [
      {
        question: 'What happens if ours is the only bathroom in the house?',
        answer:
          'We talk through a temporary plan before work starts, not partway through. If your bathroom is the only one in the home, the strip-out week is the most disruptive — dust, noise, no access to the room — so we plan the program, and any workaround, around that week specifically, and you know it before you sign.',
      },
      {
        question:
          'How do you make sure the finished bathroom works day to day, not just in photos?',
        answer:
          "That comes down to layout decisions made before pricing, not finishes chosen at the end. Our designer works out where towels, storage and everyday items actually go as part of the drawing, not as an afterthought — a bathroom with nowhere for a toothbrush is a layout problem, not a finishing one, and we fix that before the quote is written.",
      },
      {
        question: 'Do I need council approval for a bathroom renovation?',
        answer:
          'Most like-for-like renovations within the existing footprint do not need development consent. Renovations that move walls, change the outside of the house, or sit in a heritage conservation area may need approval, and heritage-listed properties almost always do. We check this at the on-site quote so you know before you sign, not after.',
      },
      {
        question:
          "What turns up in older Sydney homes that isn't in the original quote?",
        answer:
          'Rot, non-compliant plumbing and — in pre-1990 homes — asbestos are the three things strip-out most often uncovers. We allow a contingency in the quote and test for asbestos where required, so if something is found, how it is priced and handled is already agreed rather than a surprise mid-job.',
      },
      {
        question: 'Is waterproofing really that important?',
        answer:
          'It is the part of the build most likely to cause expensive damage if it fails — mould inside walls, rotted framing, water coming through to the ceiling below. We waterproof every bathroom to AS 3740, primer plus two coats, and issue a compliance certificate for the work.',
      },
    ],
  },
  {
    slug: 'ensuite-bathroom-renovations',
    title: 'Ensuite Renovations',
    h1: 'Ensuite Renovations Sydney',
    updated: '2026-09-04',
    summary:
      'Small-footprint master-suite work. We handle the ventilation and sound-proofing an ensuite needs when it shares a wall with the bedroom.',
    /** Added 2026-09-04 per D-126 / issue #34, from `docs/source-copy/svc-ensuite.md`. */
    about:
      'An ensuite is a bathroom accessed only from a private bedroom, almost always the master — smaller than a main bathroom, typically three to seven square metres, and usually internal with no external wall. That makes mechanical ventilation essential rather than optional, and it means noise from the toilet, the fan or the plumbing carries straight into the room next door. We treat ventilation and acoustic detailing — solid-core doors, concealed cisterns, toilet position, insulated walls — as design decisions made up front, not afterthoughts. Pricing follows the same packages as any bathroom: from $18,000 on Basic, from $25,000 on Standard and from $30,000 on Premium, based on the room size. A full ensuite renovation runs three to four weeks on site. Every job is done under NSW Builder Licence 475204C and carries a 10-year workmanship warranty.',
    faqs: [
      {
        question: 'How small can an ensuite be?',
        answer:
          'Functionally, a one-person ensuite can fit into around 2.5 square metres with careful planning — shower, basin and toilet. Most lived-in ensuites run three to seven square metres; below about 2.5 square metres the room starts to feel like a powder room with a shower added, and some of what makes an ensuite work gets lost.',
      },
      {
        question: 'Do ensuites need natural light?',
        answer:
          'No, but it helps. Most Sydney ensuites are internal and rely on mechanical ventilation and electric lighting. Where the roof allows it, a skylight is usually the easiest way to bring in daylight without giving up the privacy a window would cost.',
      },
      {
        question: 'How do you stop noise carrying into the bedroom?',
        answer:
          'With acoustic detailing, not luck: a solid-core door with sealed edges rather than a hollow one, a concealed in-wall cistern instead of a close-coupled toilet, keeping the toilet away from the bedhead wall where the layout allows, and soft-close hardware on drawers and doors.',
      },
      {
        question:
          'Can you renovate an ensuite without touching the main bathroom?',
        answer:
          'Yes. They are quoted and run as separate jobs unless you want them done together. Some households do the ensuite first because it is used daily, and come back for the main bathroom later — the packages and process are the same either way.',
      },
      {
        question: 'Should I put a bath in my ensuite?',
        answer:
          'For most households, no — most ensuites are too small to fit a bath without crowding the rest of the room, and the household bath usually stays in the main bathroom. Larger ensuites, from around 8 square metres, can carry a freestanding bath if that is what you want.',
      },
    ],
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
    /**
     * `<title>` tag override (tech-audit M-5 / issue #21). `h1` + the
     * " | Elite Touch Renovations" template tail runs 65 chars — no phrasing
     * that keeps "Bathroom", "Laundry", "Renovations" AND "Sydney" spelled out
     * fits the 60-char guide limit (`docs/SEO_AEO_GEO_CHECKLIST.md`) without
     * inventing an abbreviation ("Reno") not used anywhere else on the site.
     * Reuses the existing `title` value rather than new copy; the H1, the
     * meta description and the breadcrumb schema on this page all still carry
     * "Sydney" — only the `<title>` tag itself drops it here.
     */
    metaTitle: 'Bathroom + Laundry Renovations',
    updated: '2026-09-04',
    summary:
      'Two wet areas run as a single program. One demolition, one waterproofing stage, one trade sequence — and one disruption to the house instead of two.',
    /**
     * Added 2026-09-04 per D-126 / issue #34, from
     * `docs/source-copy/svc-bath-laundry.md`. The PDF's own combined-program
     * timeline (4–6 weeks) describes TWO rooms, not the single-bathroom bands
     * in `businessInfo.buildDurations` (3–4 / 5–6 / 5–7, D-75) — showing both
     * on one page reads as a contradiction, so `hideBuildDurations` suppresses
     * the shared block here, same fix as D-107 on powder-room.
     */
    hideBuildDurations: true,
    about:
      'Running a bathroom and a laundry as one project rather than two separate jobs means one set of trades on site, one demolition window, one waterproofing process and one final clean — whether the two rooms share a wall, sit on different floors, or get combined into a single space. We work out which layout suits your home at the on-site measure, before the scope is locked in. Each room is priced against the same Basic, Standard and Premium packages as a standalone bathroom, from $18,000 on Basic, based on its own size. Most combined programs run four to six weeks on site, depending on whether the rooms are adjacent or in different parts of the house. Both rooms are waterproofed to AS 3740 and certified separately. Every job is done under NSW Builder Licence 475204C and carries a 10-year workmanship warranty.',
    faqs: [
      {
        question: 'Can the bathroom and laundry be done at different times?',
        answer:
          "Yes, if you'd rather sequence them than run them in parallel. That is one advantage of booking them as a single project — you can keep one room usable while the other is offline, then swap, rather than losing both wet areas in the house at once.",
      },
      {
        question: 'Is a combined job cheaper than two separate renovations?',
        answer:
          'Usually, yes. One mobilisation, one demolition window and one waterproofing inspection trail instead of two save real money and time compared with running the same work as two projects months apart — the exact saving depends on the layout and how much plumbing the two rooms share.',
      },
      {
        question: 'Does my washing machine need its own water supply?',
        answer:
          'No. It connects to dedicated washer taps with isolation valves, off the same hot and cold supply as the rest of the wet area, installed and certified by a licensed plumber to AS/NZS 3500.',
      },
      {
        question:
          'Does laundry waterproofing have to meet the same standard as a bathroom?',
        answer:
          'Yes. Under AS 3740, any room with a floor waste and a water supply is a wet area — which almost every laundry is — so the membrane requirements and certification are the same as for a bathroom.',
      },
      {
        question:
          'What is the typical timeline for a combined bathroom-and-laundry project?',
        answer:
          'Four to six weeks on site for most Sydney homes. Adjacent rooms sharing a wall are quicker and cheaper to renovate together; rooms in different parts of the house take longer because the trades are managing two work fronts.',
      },
    ],
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
