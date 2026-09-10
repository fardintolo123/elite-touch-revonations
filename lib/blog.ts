export type BlogSection = {
  heading: string
  paragraphs: string[]
}

export type BlogPost = {
  slug: string
  title: string
  description: string
  published: string
  readTime: string
  category: string
  sections: BlogSection[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'bathroom-renovation-cost-sydney',
    title: 'How much does a bathroom renovation cost in Sydney?',
    description: 'A practical guide to bathroom renovation pricing, scope and the questions to ask before you compare quotes in Sydney.',
    published: '2026-09-10',
    readTime: '6 min read',
    category: 'Planning and cost',
    sections: [
      { heading: 'Start with the room and the scope', paragraphs: ['There is no honest single price for every bathroom renovation. The cost changes with the room size, the fittings, the tile selection, the amount of electrical and plumbing work, and whether the layout changes.', 'A useful quote should make those decisions visible. It should describe what is included, what is excluded and which selections are still provisional. That gives you something meaningful to compare instead of comparing two totals with different scopes.'] },
      { heading: 'ETR package starting points', paragraphs: ['Elite Touch Renovations publishes three starting points: Basic from $18,000 for an approximately 1.5 m × 1.8 m bathroom, Standard from $25,000 for an approximately 1.8 m × 2.4 m bathroom, and Premium from $30,000 for an approximately 2.4 m × 2.4 m bathroom.', 'These are starting prices, not fixed quotes. The final scope depends on the actual room and your selections. A free on-site measure is the right next step when you need a price tied to your bathroom.'] },
      { heading: 'What to ask before accepting a quote', paragraphs: ['Ask whether demolition, waterproofing, tiling, fittings, electrical work, waste removal and final clean-up are included. Ask how variations are handled and whether the quote is fixed-scope and written.', 'The goal is not simply to find the lowest number. It is to understand what you are buying, who is responsible for each part of the work and what happens when the existing room reveals a condition that could not be seen before demolition.'] },
    ],
  },
  {
    slug: 'bathroom-renovation-timeline-sydney',
    title: 'How long does a bathroom renovation take?',
    description: 'What affects a bathroom renovation timeline, from planning and selections through to the final clean-up.',
    published: '2026-09-10',
    readTime: '5 min read',
    category: 'Planning and process',
    sections: [
      { heading: 'The short answer', paragraphs: ['A bathroom renovation is usually measured in weeks rather than days. The exact timeline depends on the room, the scope, product availability, approvals and what is discovered once the old finishes are removed.', 'A reliable programme should explain the sequence of work and identify decisions that need to be made before the job starts. That is more useful than promising an attractive number of days before the room has been measured.'] },
      { heading: 'The stages that shape the programme', paragraphs: ['Planning covers the measure, selections, scope and written quote. The site work then commonly moves through protection and demolition, plumbing and electrical preparation, waterproofing, tiling, installation of fittings, finishing and clean-up.', 'Some stages depend on the previous one. Waterproofing needs the right preparation, and later finishes depend on completed and properly cured work. A rushed sequence can create more risk than a realistic programme.'] },
      { heading: 'How to reduce avoidable delays', paragraphs: ['Confirm the layout, fittings and tile choices early. Ask which items the renovator is ordering, when they are expected and what happens if a selected product is unavailable.', 'Your quote should also explain how changes are approved. Keeping decisions in writing helps the homeowner and the renovation team work from the same scope.'] },
    ],
  },
  {
    slug: 'how-to-compare-bathroom-renovation-quotes',
    title: 'How to compare bathroom renovation quotes',
    description: 'A straightforward way to compare bathroom renovation quotes by scope, inclusions, assumptions and responsibilities.',
    published: '2026-09-10',
    readTime: '6 min read',
    category: 'Quotes and decisions',
    sections: [
      { heading: 'Compare scope before price', paragraphs: ['Two quotes can have different totals because they describe different work. Read the scope first: layout, demolition, waterproofing, tiling, fittings, electrical work, plumbing, waste removal and clean-up should be clear.', 'If a line is vague, ask for it to be clarified in writing. A lower number is not necessarily lower cost if important work has been left for later.'] },
      { heading: 'Check the assumptions', paragraphs: ['Look for assumptions about the room size, tile format, fitting allowances, access, working hours and the condition of the existing walls and floor. These assumptions can materially change the final result.', 'Ask how variations are priced and approved. You should know who can authorise a change and how the change will be recorded before work proceeds.'] },
      { heading: 'Choose accountability as well as value', paragraphs: ['Ask who will manage the project, how communication will work and what protection is included after completion. ETR is family-run, holds NSW Builder Licence 475204C and offers a 10-year workmanship warranty as stated in its terms.', 'A free on-site measure and fixed-scope written quote give you a better basis for comparing the actual room, not just an estimate made from photographs.'] },
    ],
  },
  {
    slug: 'questions-to-ask-a-bathroom-renovator',
    title: 'What questions should I ask a bathroom renovator?',
    description: 'The questions that help Sydney homeowners check scope, licensing, communication, timing and aftercare before choosing a renovator.',
    published: '2026-09-10',
    readTime: '6 min read',
    category: 'Choosing a renovator',
    sections: [
      { heading: 'Questions about the company', paragraphs: ['Ask who holds the licence, who will manage the project and who will be your day-to-day contact. Confirm the business name on the quote matches the business you are engaging.', 'For ETR, the NSW Builder Licence is 475204C. The project is run by the Dawood family, with Omar Dawood as Licensed Builder and Civil Engineer and Adam Dawood as Licensed Tiler and Projects Manager.'] },
      { heading: 'Questions about the work', paragraphs: ['Ask what is included in demolition, plumbing, electrical work, waterproofing, tiling, fittings, waste removal and clean-up. Ask how the team deals with changes or hidden conditions.', 'You should also ask how the renovation will be sequenced, what decisions are needed before work begins and how the team will protect the rest of your home.'] },
      { heading: 'Questions about the quote and warranty', paragraphs: ['Ask for a fixed-scope written quote, the payment schedule, the variation process and the terms of any warranty. Make sure the warranty wording is specific and do not assume it covers third-party fittings unless the terms say so.', 'A good first conversation should leave you with fewer assumptions, not more. If the answer changes depending on who you speak to, ask for the agreed position in writing.'] },
    ],
  },
  {
    slug: 'bathroom-renovation-checklist-sydney',
    title: 'Bathroom renovation checklist for Sydney homeowners',
    description: 'A planning checklist for the decisions, documents and practical details to settle before your bathroom renovation begins.',
    published: '2026-09-10',
    readTime: '7 min read',
    category: 'Planning and process',
    sections: [
      { heading: 'Before requesting quotes', paragraphs: ['Write down what is not working in the current room and what you want to change. Note storage needs, shower and bath preferences, lighting, ventilation, accessibility needs and any layout constraints.', 'Take measurements and photographs for an initial conversation, but use an on-site measure before relying on a price. Existing conditions are part of the decision.'] },
      { heading: 'Before accepting a quote', paragraphs: ['Confirm the scope, room size basis, inclusions, exclusions, selections, programme assumptions and variation process. Keep the final scope and agreed selections together in writing.', 'Check the builder licence details and ask who is responsible for coordinating the work. Make sure the quote says what happens to waste, protection and final clean-up.'] },
      { heading: 'Before work starts', paragraphs: ['Complete the selections that affect ordering and confirm access arrangements. Decide where materials can be stored and how the team will move through the home.', 'Keep a simple record of decisions and changes. Clear written communication helps keep the project aligned when the room is temporarily out of action.'] },
    ],
  },
  {
    slug: 'small-bathroom-renovation-without-feeling-cramped',
    title: 'How to renovate a small bathroom without it feeling cramped',
    description: 'Practical planning ideas for making a small bathroom work harder without relying on unsupported promises or unnecessary features.',
    published: '2026-09-10',
    readTime: '6 min read',
    category: 'Small bathrooms',
    sections: [
      { heading: 'Begin with movement and storage', paragraphs: ['A small bathroom needs a clear path through the room. Start by checking door swings, shower access, toilet clearance and the location of storage before choosing finishes.', 'A measured plan helps you decide where a vanity, shaving cabinet, shower screen and accessories can fit without making the room harder to use.'] },
      { heading: 'Use a restrained selection', paragraphs: ['A small room can feel busy when every surface competes for attention. A consistent tile approach, considered contrast and fittings sized to the room can create a calmer result.', 'The right choice depends on the room and the homeowner. Inspiration is useful, but a selection should still be checked against the actual layout, maintenance needs and budget.'] },
      { heading: 'Protect the essentials', paragraphs: ['Do not trade away waterproofing, sound preparation or a workable layout just to add a decorative feature. These are the parts that affect how the room performs every day.', 'Bring the room to a renovator for a measure and written scope. That turns a small-bathroom idea into a plan that can be priced honestly.'] },
    ],
  },
  {
    slug: 'bathroom-renovation-mistakes-to-avoid',
    title: 'What are the biggest bathroom renovation mistakes to avoid?',
    description: 'The planning mistakes that create confusion, rework or surprise cost during a bathroom renovation.',
    published: '2026-09-10',
    readTime: '6 min read',
    category: 'Planning and process',
    sections: [
      { heading: 'The short version', paragraphs: ['Plan the room. Set the scope. Ask clear questions. Keep each change in writing.'] },
      { heading: 'Starting without a measured scope', paragraphs: ['A photograph can start a conversation, but it cannot show every condition that affects a renovation. Decisions about layout, access, plumbing, electrical work and finishes should follow an on-site measure.', 'A clear scope gives the homeowner and renovator the same starting point. It also makes later changes easier to identify.'] },
      { heading: 'Choosing finishes before solving the room', paragraphs: ['Tiles and fittings matter, but they should follow the layout and practical requirements. A beautiful selection does not fix a poor door swing, awkward storage or an impractical shower position.', 'Settle movement, storage, ventilation and cleaning needs before finalising decorative choices.'] },
      { heading: 'Accepting a vague quote', paragraphs: ['A total without inclusions is difficult to compare. Ask for the work, assumptions, exclusions and variation process in writing.', 'The best quote is the one that lets you understand the decision, not simply the one with the smallest headline number.'] },
    ],
  },
  {
    slug: 'diy-or-professional-bathroom-renovation',
    title: 'Should I renovate my bathroom myself or hire a professional?',
    description: 'How to think through a DIY bathroom renovation, licensed work, coordination and the cost of getting the sequence wrong.',
    published: '2026-09-10',
    readTime: '6 min read',
    category: 'Choosing a renovator',
    sections: [
      { heading: 'Know what you are coordinating', paragraphs: ['A bathroom renovation is a sequence of connected tasks, not just a collection of finishes. Demolition, plumbing, electrical work, waterproofing, tiling and fitting installation need to be planned around one another.', 'The more parts you coordinate yourself, the more responsibility you carry for ordering, access, timing and the quality of the finished result.'] },
      { heading: 'Consider licensed and regulated work', paragraphs: ['Some work has licensing, safety and compliance requirements. Confirm what applies to your project in NSW before deciding which tasks you can take on.', 'A licensed renovator can help coordinate the work and document the agreed scope. ETR operates under NSW Builder Licence 475204C.'] },
      { heading: 'Make the decision on the whole project', paragraphs: ['Compare the value of your time, the disruption of a room being out of action and the risk of rework. A lower initial spend is not useful if the sequence creates delays or requires work to be done twice.', 'Start with a measured scope and clear quote, whether you choose a professional or a carefully limited DIY approach.'] },
    ],
  },
  {
    slug: 'strata-bathroom-renovation-sydney',
    title: 'Strata bathroom renovation in Sydney: what is different?',
    description: 'The approvals, access, communication and planning questions apartment owners should consider before a strata bathroom renovation.',
    published: '2026-09-10',
    readTime: '6 min read',
    category: 'Planning and process',
    sections: [
      { heading: 'The short version', paragraphs: ['Check the rules first. Plan the move in and out. Keep the paper trail.'] },
      { heading: 'Check the building rules first', paragraphs: ['Apartment renovations can involve strata by-laws, approval steps, building access rules and limits on working hours. Ask your strata manager or owners corporation what applies before booking site work.', 'Do not assume approval is automatic because the work is inside your apartment. The building may have requirements for waterproofing, plumbing, noise, lifts and protection of common areas.'] },
      { heading: 'Plan access and protection', paragraphs: ['Confirm how materials and waste can move through the building, where deliveries can stop and how shared areas must be protected. These details belong in the programme and quote assumptions.', 'Give the renovation team the building rules early so the site plan reflects the actual property.'] },
      { heading: 'Keep the paperwork together', paragraphs: ['Keep approvals, the written scope, selections, certificates and variation records in one place. Clear documentation helps everyone understand what was agreed.', 'A free on-site measure is a useful starting point before a strata quote is prepared.'] },
    ],
  },
  {
    slug: 'bathroom-renovation-hidden-costs-sydney',
    title: 'Sydney bathroom renovation: hidden costs to watch for',
    description: 'The assumptions and changes that can make bathroom renovation costs move, and how a clear scope helps you prepare.',
    published: '2026-09-10',
    readTime: '6 min read',
    category: 'Planning and cost',
    sections: [
      { heading: 'Hidden usually means unspecified', paragraphs: ['Many surprise costs begin as an unclear assumption: what happens to demolition, waste, access, fittings, tile quantities, electrical work or the existing substrate?', 'Ask what the quote includes and what would be treated as a variation. Clarity at the start is more useful than trying to predict every possible condition.'] },
      { heading: 'Existing conditions can change the work', paragraphs: ['A bathroom is opened up during renovation, and the condition behind old finishes may affect the work required. The quote should explain how an unexpected condition is documented and priced.', 'Do not approve a change you do not understand. Ask for the reason, the cost and the effect on timing in writing.'] },
      { heading: 'Leave room for considered selections', paragraphs: ['Selections should match the room, the scope and the budget. Changing fittings or finishes late can affect ordering and the programme.', 'A measured room and fixed-scope written quote give you a stronger basis for deciding what to include before work begins.'] },
    ],
  },
  {
    slug: 'bathroom-renovation-essential-upgrades',
    title: 'Bathroom renovation: essential upgrades vs nice-to-haves',
    description: 'A practical framework for deciding which bathroom renovation choices should come first when the budget is limited.',
    published: '2026-09-10',
    readTime: '5 min read',
    category: 'Planning and cost',
    sections: [
      { heading: 'Protect performance first', paragraphs: ['Start with the parts that determine whether the room works: a sound layout, proper preparation, waterproofing, drainage, ventilation and safe electrical planning.', 'Decorative upgrades are easier to reconsider later. Poor preparation is harder and more disruptive to correct after the finishes are installed.'] },
      { heading: 'Then prioritise daily use', paragraphs: ['Give priority to the shower, toilet, vanity, storage and lighting choices you will use every day. Consider access, cleaning and the way the household actually moves through the room.', 'A smaller list of well-considered choices can be more useful than a long list of features that compete for space.'] },
      { heading: 'Make the trade-offs visible', paragraphs: ['Ask your renovator to show how each change affects scope, price and timing. Keep approved changes in writing.', 'This turns a limited budget into a sequence of decisions rather than a last-minute compromise.'] },
    ],
  },
  {
    slug: 'bathroom-renovation-warranty-guide',
    title: 'What warranty should a bathroom renovation include?',
    description: 'What to ask about workmanship warranties, exclusions and third-party fittings before signing a renovation agreement.',
    published: '2026-09-10',
    readTime: '5 min read',
    category: 'Choosing a renovator',
    sections: [
      { heading: 'The short version', paragraphs: ['Read the terms. Ask what is covered. Keep the final papers. A clear warranty leaves less room for doubt. Clear terms help.'] },
      { heading: 'Read the wording, not just the number', paragraphs: ['A warranty should explain what is covered, how long it applies, how to notify the renovator and what exclusions apply. Ask for the terms before accepting the quote.', 'A headline warranty period does not tell you whether fixtures, products or third-party work are included.'] },
      { heading: 'Separate workmanship from products', paragraphs: ['Workmanship and manufacturer warranties are different responsibilities. Ask who handles a product fault and who handles a problem with the installation.', 'Keep invoices, product information, the final scope and handover documents together after the work is complete.'] },
      { heading: 'ETR warranty wording', paragraphs: ['Elite Touch Renovations offers a 10-year workmanship warranty. It should be read as written in the agreement and does not automatically extend to third-party fittings.', 'Ask questions before work begins so the protection you expect matches the written terms.'] },
    ],
  },
  {
    slug: 'fast-bathroom-renovation-what-to-expect',
    title: 'Is a quick bathroom renovation possible? What to expect',
    description: 'How selections, approvals, ordering and site sequencing affect the speed of a bathroom renovation.',
    published: '2026-09-10',
    readTime: '5 min read',
    category: 'Planning and process',
    sections: [
      { heading: 'Speed starts before demolition', paragraphs: ['The fastest projects are not necessarily rushed projects. They are projects where the room has been measured, the scope is agreed, selections are ready and access is clear before site work begins.', 'Late decisions and unavailable products can add more time than careful planning takes.'] },
      { heading: 'Do not remove the necessary sequence', paragraphs: ['Protection, demolition, preparation, plumbing and electrical work, waterproofing, tiling, fitting installation and finishing each have a place in the programme.', 'Compressing a programme by skipping preparation or curing time creates risk. Ask how the proposed timeline protects the quality of the work.'] },
      { heading: 'Ask for a realistic programme', paragraphs: ['A useful programme identifies dependencies, decision dates and how changes affect timing. It should also allow for the actual room rather than promise a generic number of days.', 'A clear written scope is the best starting point for a realistic conversation about speed.'] },
    ],
  },
]

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug)
}
