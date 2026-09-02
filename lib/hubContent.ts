/**
 * Per-region editorial content for the published regional hub pages
 * (`/services/bathroom-renovations/{region}/`).
 *
 * WHY THIS FILE EXISTS
 * Issue #35 / local-audit #4 / content-audit C-3 / geo-audit G-2: the three hub
 * pages were swap-test-fragile — the hero line and the "what you get" block read
 * identically with the region name changed, and only the local project photos and
 * the suburb list were genuinely non-swappable. `docs/SEO_CONTENT_GUIDE.md` §5:
 * "If nothing specific can be said truthfully about a suburb, that is a signal the
 * page should not exist." This file is the something-specific.
 *
 * THE RULES THAT BIND THIS FILE
 *  - "Content is data" (CLAUDE.md → Architecture Rules). Same shape as
 *    `services[].about / .faqs` in `lib/businessInfo.ts`. Edit the data, not the
 *    hub renderer, to change what a hub says.
 *  - NOTHING INVENTED (DECISIONS.md D-06). Every line here is either a general,
 *    checkable fact about Sydney housing stock and council controls, or an ETR
 *    fact that already lives in `businessInfo` / the packages source copy / the
 *    build-durations decision (D-75). No invented suburb project, budget,
 *    duration, heritage listing or before/after pairing. "Federation homes are
 *    common in the Eastern Suburbs" is an architectural fact; "we renovated a
 *    heritage terrace at 12 Smith Street" would not be — and is not here.
 *  - The `answer` block is the answer-first lead (geo-audit G-2): a self-contained
 *    134–167 word passage an AI answer can lift whole. It must name the service,
 *    the rough cost with its size basis, the rough duration, the licence and the
 *    warranty, plus one area-specific line. Keep it in that word band.
 *  - `faqs` render as visible <details> AND as `FAQPage` JSON-LD — the two must
 *    stay byte-identical (see components/FaqSchema.tsx / D-31). Answers use only
 *    real ETR facts.
 *  - A region with no entry here still renders — the extra sections just don't
 *    appear. Only add an entry for a hub that is `hubPublished: true`.
 *
 * SWAP TEST: paste one region's `localAngle` with another region's name in it and
 * it should read wrong. If two regions could share a paragraph, it isn't local
 * enough to be here.
 */

export type HubFaq = { question: string; answer: string }

export type HubContent = {
  /** Answer-first lead. 2 short paragraphs, 134–167 words total (geo-audit G-2). */
  answer: string[]
  /** "Renovating a bathroom in the {region}" — 2–3 paragraphs of truthful local detail. */
  localAngle: { heading: string; paragraphs: string[] }
  /** 4–6 local-intent Q&A. Visible <details> + FAQPage schema, identical text. */
  faqs: HubFaq[]
  /**
   * Reviewer name, exactly as written in `Customer Reviews.md` / `lib/reviews.ts`.
   * Rendered verbatim and NOT attributed to the region (local-audit §3: not one
   * of the 19 testimonials names a suburb, and D-06 forbids inventing one).
   */
  testimonialAuthor: string
}

/** Keyed by region slug. Only the three `hubPublished: true` regions appear. */
export const hubContent: Record<string, HubContent> = {
  'hills-district': {
    answer: [
      'Elite Touch Renovations is a licensed Sydney builder, and we renovate bathrooms right across the Hills District — Baulkham Hills, Castle Hill, Kellyville, Rouse Hill, Cherrybrook, Bella Vista and the acreage suburbs around Dural and Galston. We run the whole job: strip-out, plumbing, electrical, waterproofing to AS 3740, tiling and fit-off, all to a fixed written scope.',
      'A bathroom renovation here starts from $18,000 for a small bathroom about 1.5 by 1.8 by 2.4 metres on our Basic package. Standard starts from $25,000 and Premium from $30,000. Your price is firm after a free on-site measure. A full renovation takes three to four weeks on site, and a premium build in stone or custom joinery takes five to six. Every job is done under NSW Builder Licence 475204C and carries a 10-year workmanship warranty. Hills homes tend to sit on larger blocks, so there is usually room for a skip and deliveries on site.',
    ],
    localAngle: {
      heading: 'Renovating a bathroom in the Hills District',
      paragraphs: [
        'The Hills is a low-density, garden-suburb part of Sydney. Most homes are freestanding on generous blocks, which usually means clear space for a skip bin, a materials drop and off-street parking — the tight access of an inner-city terrace rarely applies here.',
        'The housing splits into two rough groups. Established brick homes in Baulkham Hills, Castle Hill, Winston Hills and Cherrybrook were mostly built between the 1970s and the 1990s; their original bathrooms are often small, with the toilet in a separate room, and opening that up is a common request. The newer estate suburbs — Kellyville Ridge, Rouse Hill, Beaumont Hills, Stanhope Gardens — are largely two-storey homes on a concrete slab, where waste pipes are set into the floor and an upstairs bathroom sits over living space.',
        'Out on the acreage around Dural, Kenthurst, Galston and Annangrove, some properties run on tank water or a septic system. We check what the site is actually on at the free measure, and the written quote allows for it.',
      ],
    },
    faqs: [
      {
        question: 'How much does a bathroom renovation cost in the Hills District?',
        answer:
          'It starts from $18,000 for a small bathroom around 1.5 by 1.8 by 2.4 metres on our Basic package, from $25,000 for Standard and from $30,000 for Premium. All three are "from" prices tied to that room size. You get a firm figure after a free on-site measure.',
      },
      {
        question: 'How long will a bathroom renovation take?',
        answer:
          'A full renovation runs three to four weeks on site. A premium build with natural stone or custom joinery runs five to six weeks, and a job that moves walls or fixture positions runs five to seven. Older homes can need a few extra days for what appears at strip-out. Your program is in writing before work starts.',
      },
      {
        question:
          'Our house has the toilet in a separate room — can you combine it into the bathroom?',
        answer:
          'Yes. That is one of the most common changes we make in Hills homes from the 1970s to the 1990s. Moving the dividing wall and the toilet drain puts the job in the reconfigure band, around five to seven weeks on site, and the written quote covers the extra plumbing and framing.',
      },
      {
        question:
          'Do you renovate bathrooms in the newer Kellyville and Rouse Hill estates?',
        answer:
          'Yes. Those homes are typically two-storey on a concrete slab, often with the main bathroom upstairs. Waste pipes set into the slab and a wet area over living space need care with the floor falls and the waterproofing, and we allow for that in the scope.',
      },
      {
        question: 'Which Hills District suburbs do you cover?',
        answer:
          'We cover every suburb in the list further down this page, and we work right across Sydney. If your street is not shown, call us anyway — it is very likely we still cover it.',
      },
    ],
    testimonialAuthor: 'Ken Chen',
  },

  'eastern-suburbs': {
    answer: [
      'Elite Touch Renovations is a licensed Sydney builder, and we renovate bathrooms across the Eastern Suburbs — Randwick, Paddington, Woollahra, Bondi, Coogee, Bronte, Rose Bay and Double Bay. We handle the full job: strip-out, plumbing, electrical, waterproofing to AS 3740, tiling and fit-off, to a fixed written scope.',
      'A bathroom renovation here starts from $18,000 for a small bathroom about 1.5 by 1.8 by 2.4 metres on our Basic package. Standard starts from $25,000 and Premium from $30,000. Your price is firm after a free on-site measure. A full renovation takes three to four weeks on site, and a premium build in stone or custom joinery takes five to six. Every job runs under NSW Builder Licence 475204C with a 10-year workmanship warranty. Many homes here are Federation-era terraces or apartments, so we plan for older pipework, heritage controls and strata rules before we start.',
    ],
    localAngle: {
      heading: 'Renovating a bathroom in the Eastern Suburbs',
      paragraphs: [
        'The Eastern Suburbs mix two very different building types, and each one changes how a bathroom renovation runs.',
        'The terrace-and-semi belt — Paddington, Woollahra, Randwick, Waverley, Bronte — is largely Victorian and Federation housing, and much of it sits in a heritage conservation area. These homes often still have clay drainage lines, galvanised or lead water pipes, timber floors over a subfloor, and a bathroom that was added to the back of the house at some point. Old services frequently need replacing once the room is opened up, and we allow for that in the quote rather than as a surprise.',
        'Along the beaches and the ridge — Bondi, Bondi Junction, Rose Bay, Coogee and much of Randwick — a large share of homes are apartments. A strata bathroom needs owners-corporation approval before work starts, sometimes a building manager sign-off, and it has to respect the building rules on work hours, lift use and common-property waterproofing. Streets are narrow and parking is by permit, so we organise skip permits and smaller deliveries.',
      ],
    },
    faqs: [
      {
        question: 'How much does a bathroom renovation cost in the Eastern Suburbs?',
        answer:
          'It starts from $18,000 for a small bathroom around 1.5 by 1.8 by 2.4 metres on our Basic package, from $25,000 for Standard and from $30,000 for Premium. All three are "from" prices tied to that room size. You get a firm figure after a free on-site measure.',
      },
      {
        question:
          'Do you renovate bathrooms in heritage and Federation homes in the Eastern Suburbs?',
        answer:
          'Yes. We renovate bathrooms in older and Federation-era homes throughout the area. We build to current Australian Standards and waterproof to AS 3740 with a certificate. Older homes can turn up rot, non-compliant plumbing or asbestos at strip-out, and the written quote sets out how that is handled before work starts. Council heritage approval applies to external or structural changes, not to a like-for-like internal bathroom.',
      },
      {
        question:
          'Can you renovate a bathroom in a strata apartment in Bondi or Randwick?',
        answer:
          'Yes. Apartment and strata bathrooms are common across the Eastern Suburbs. Your owners corporation has to approve the work first, and some buildings also want a building manager sign-off. We work within the building rules on hours, lift access and common-property waterproofing.',
      },
      {
        question: 'How long will a bathroom renovation take?',
        answer:
          'A full renovation runs three to four weeks on site. A premium build with natural stone or custom joinery runs five to six weeks, and a job that moves walls or fixture positions runs five to seven. Federation-era homes can need a few extra days for what appears at strip-out. Your program is in writing before work starts.',
      },
      {
        question: 'Which suburbs in the Eastern Suburbs do you cover?',
        answer:
          'We cover every suburb in the list further down this page, and we work right across Sydney. If your street is not shown, call us anyway — it is very likely we still cover it.',
      },
    ],
    testimonialAuthor: 'Kieran C',
  },

  'north-shore': {
    answer: [
      'Elite Touch Renovations is a licensed Sydney builder, and we renovate bathrooms across the North Shore — from Neutral Bay, Mosman and Crows Nest through Chatswood, Lane Cove and Willoughby to Killara, Wahroonga and Hornsby. We run the whole job: strip-out, plumbing, electrical, waterproofing to AS 3740, tiling and fit-off, to a fixed written scope.',
      'A bathroom renovation here starts from $18,000 for a small bathroom about 1.5 by 1.8 by 2.4 metres on our Basic package. Standard starts from $25,000 and Premium from $30,000. Your price is firm after a free on-site measure. A full renovation takes three to four weeks on site, and a premium build in stone or custom joinery takes five to six. Every job runs under NSW Builder Licence 475204C with a 10-year workmanship warranty. Many North Shore homes are older houses with timber floors, or apartments near the rail line, so we allow for subfloor access and strata rules in the quote.',
    ],
    localAngle: {
      heading: 'Renovating a bathroom on the North Shore',
      paragraphs: [
        'The North Shore is known for leafy, established streets, and the housing stock reflects that. Federation, inter-war and mid-century homes are common, and the Ku-ring-gai suburbs — Roseville, Lindfield, Killara, Pymble and Wahroonga — hold some of the largest heritage conservation areas in Sydney.',
        'Older homes here are often timber-framed on brick piers with a suspended timber floor, sometimes on a sloping bushland block in places like Castlecrag, Northbridge or Roseville Chase. That means subfloor access matters, and the floor structure has to be checked and, where needed, reinforced before tiling and waterproofing. Many of these homes still have one small main bathroom and a separate toilet, so opening the two into a single room is a frequent request.',
        'Closer to the rail line and the town centres — Chatswood, St Leonards, North Sydney, Wollstonecraft, Hornsby and Waitara — there is a lot of apartment stock. As with any strata bathroom, we work to the owners corporation approval, hours and access rules, and the quote reflects them.',
      ],
    },
    faqs: [
      {
        question: 'How much does a bathroom renovation cost on the North Shore?',
        answer:
          'It starts from $18,000 for a small bathroom around 1.5 by 1.8 by 2.4 metres on our Basic package, from $25,000 for Standard and from $30,000 for Premium. All three are "from" prices tied to that room size. You get a firm figure after a free on-site measure.',
      },
      {
        question: 'Do you work on heritage and Federation homes on the North Shore?',
        answer:
          'Yes. A lot of North Shore housing is Federation and inter-war, and the Ku-ring-gai suburbs have large heritage conservation areas. We build to current Australian Standards and waterproof to AS 3740 with a certificate. Older homes can turn up rot, non-compliant plumbing or asbestos at strip-out, and the written quote sets out how that is handled. Council heritage approval applies to external or structural changes, not to a like-for-like internal bathroom.',
      },
      {
        question: 'Can you renovate a bathroom in a North Shore strata apartment?',
        answer:
          'Yes. There is a lot of apartment stock around Chatswood, St Leonards, North Sydney and Hornsby. Your owners corporation has to approve the work first, and some buildings also want a building manager sign-off. We work within the building rules on hours, lift access and common-property waterproofing.',
      },
      {
        question: 'Our home has timber floors — does that change the bathroom renovation?',
        answer:
          'It can. Many older North Shore homes have a suspended timber floor on brick piers. We check the subfloor and joists, then reinforce or re-sheet where the tiling and waterproofing need a rigid base, and we note it in the quote. It does not stop a full renovation; it is a normal step in these homes.',
      },
      {
        question: 'Which North Shore suburbs do you cover?',
        answer:
          'We cover every suburb in the list further down this page, and we work right across Sydney. If your street is not shown, call us anyway — it is very likely we still cover it.',
      },
    ],
    testimonialAuthor: 'Huseyin Sumaktas',
  },
}

export function hubContentFor(slug: string): HubContent | undefined {
  return hubContent[slug]
}
