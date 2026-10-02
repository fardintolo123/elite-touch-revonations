import { businessInfo } from './businessInfo'

export type BlogSection = {
  heading: string
  paragraphs: string[]
}

export type BlogQuickAnswer = {
  heading: string
  paragraphs: string[]
  table: {
    caption: string
    columns: [string, string]
    rows: {
      label: string
      detail: string
      value: string
    }[]
  }
  note: string
  cta: {
    href: string
    label: string
  }
}

export type BlogFaqItem = {
  question: string
  answer: string
}

export type BlogPost = {
  slug: string
  title: string
  metaTitle?: string
  description: string
  published: string
  /** Set only when the post's content was genuinely revised after `published` — never bumped for a rebuild alone. */
  updated?: string
  readTime: string
  category: string
  quickAnswer?: BlogQuickAnswer
  sections: BlogSection[]
  /** 4-6 real questions, same pattern as the service-page FAQ (app/services/[slug]/page.tsx). */
  faq?: BlogFaqItem[]
  /** A real, evidenced project photo (lib/projects.ts) that actually shows this post's subject — never a stock image. */
  heroProject?: { slug: string; imageIndex?: number }
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'bathroom-renovation-cost-sydney',
    title: 'How much does a bathroom renovation cost in Sydney?',
    metaTitle: 'Bathroom Renovation Cost Sydney',
    description: 'A practical guide to bathroom renovation pricing, scope and the questions to ask before you compare quotes in Sydney.',
    published: '2026-09-10',
    readTime: '4 min read',
    category: 'Planning and cost',
    sections: [
      { heading: 'Start with the room and the scope', paragraphs: ['There is no honest single price for every bathroom renovation. The cost changes with the room size, the fittings, the tile selection, the amount of electrical and plumbing work, and whether the layout changes.', 'A useful quote should make those decisions visible. It should describe what is included, what is excluded and which selections are still provisional. That gives you something meaningful to compare instead of comparing two totals with different scopes.'] },
      { heading: 'ETR package starting points', paragraphs: ['Elite Touch Renovations publishes <a href="/packages/" class="et-link">three starting points</a>: Basic from $18,000 for an approximately 1.5 m × 1.8 m bathroom, Standard from $25,000 for an approximately 1.8 m × 2.4 m bathroom, and Premium from $30,000 for an approximately 2.4 m × 2.4 m bathroom.', 'These are starting prices, not fixed quotes. The final scope depends on the actual room and your selections. A free on-site measure is the right next step when you need a price tied to your bathroom.'] },
      { heading: 'What changes the price?', paragraphs: ['The biggest cost shifts usually come from scope, not decoration alone. Moving walls, changing fixture positions, upgrading stone or joinery, adding complex glazing, changing electrical points or uncovering poor existing work can all move the price.', 'Tile format and fitting choices matter too, but they should be compared inside the whole scope. A cheaper tapware allowance does not make a quote better if demolition, waterproofing or electrical work has been left unclear.'] },
      { heading: 'Why the on-site measure matters', paragraphs: ['Photos can start the conversation, but they do not show enough to lock in a bathroom renovation price. The site measure checks the room size, access, fixture positions, floor falls and visible condition before a written scope is prepared.', 'That is also where practical details come out: whether there is only one bathroom in the home, where materials can be stored, how waste leaves the property and whether strata or building rules affect the program.'] },
      { heading: 'What to ask before accepting a quote', paragraphs: ['Ask whether demolition, waterproofing, tiling, fittings, electrical work, waste removal and final clean-up are included. Ask how variations are handled and whether the quote is fixed-scope and written.', 'The goal is not simply to find the lowest number. It is to understand what you are buying, who is responsible for each part of the work and what happens when the existing room reveals a condition that could not be seen before demolition.'] },
      { heading: 'What does a good quote help you decide?', paragraphs: ['A good quote lets you compare like with like. It should name the room, the package or scope basis, the inclusions, the exclusions, the payment schedule and the process for approving changes.', 'It should also make the next step plain. If the number is only a verbal estimate, ask for the written scope before you make a decision. A bathroom is too important to price from assumptions.'] },
      { heading: 'How should you use the starting prices?', paragraphs: ['Use the starting prices to set a realistic bracket before you ask for a quote. They help you see whether a plan is likely to sit near a basic refresh of the existing footprint or a larger premium build with more complex selections.', 'Do not use them as a substitute for the measured quote. A price only becomes useful when it is connected to your room, your selections and the exact work written into the scope.'] },
    ],
  },
  {
    slug: 'bathroom-renovation-timeline-sydney',
    title: 'How long does a bathroom renovation take?',
    metaTitle: 'Bathroom Renovation Timeline',
    description: 'What affects a bathroom renovation timeline, from planning and selections through to the final clean-up.',
    published: '2026-09-10',
    readTime: '4 min read',
    category: 'Planning and process',
    quickAnswer: {
      heading: 'Quick answer',
      paragraphs: [
        'Most bathroom renovations in Sydney take 3-7 weeks on site from demolition to final handover. The shorter end is a full renovation on the same footprint; the longer end is a premium build or a job that moves walls or fixture positions.',
        'These are on-site working times. Planning, product selections and ordering happen before the build starts, and hidden issues can only be confirmed once the old bathroom is opened up.',
      ],
      table: {
        caption: 'Typical on-site duration for an Elite Touch bathroom renovation.',
        columns: ['Renovation type', 'Typical duration'],
        rows: businessInfo.buildDurations.map((duration) => ({
          label: duration.label,
          detail: duration.detail,
          value: duration.weeks,
        })),
      },
      note: 'Your written quote should include the program for your room, not just a verbal estimate.',
      cta: {
        href: '/contact-us/',
        label: 'Book a free on-site measure',
      },
    },
    sections: [
      { heading: 'The short answer', paragraphs: ['A <a href="/services/bathroom-renovations/" class="et-link">bathroom renovation</a> is usually measured in weeks rather than days. The exact timeline depends on the room, the scope, product availability, approvals and what is discovered once the old finishes are removed.', 'A reliable programme should explain the sequence of work and identify decisions that need to be made before the job starts. That is more useful than promising an attractive number of days before the room has been measured.'] },
      { heading: 'The stages that shape the programme', paragraphs: ['Planning covers the measure, selections, scope and written quote. The site work then commonly moves through protection and demolition, plumbing and electrical preparation, waterproofing, tiling, installation of fittings, finishing and clean-up.', 'Some stages depend on the previous one. Waterproofing needs the right preparation, and later finishes depend on completed and properly cured work. A rushed sequence can create more risk than a realistic programme.'] },
      { heading: 'Why do some renovations drag on for months?', paragraphs: ['Long delays often come from decisions that were not settled before site work began. Late fittings, unclear selections, building access limits, approval delays or a quote that left key items provisional can all stop a room that is already stripped out.', 'Hidden conditions can also change the programme. A rotten floor, poor existing plumbing or other issue behind old finishes has to be documented and priced before work continues. That is why the variation process matters as much as the headline timeline.'] },
      { heading: 'What should be decided before demolition?', paragraphs: ['The layout, tapware, tile choice, vanity, shower screen, accessories and any strata access rules should be known before the bathroom comes out. If an item affects ordering or rough-in, it should not be left for later.', 'A written programme does not remove every risk, but it shows which choices are holding up the job and which stages are waiting on curing, inspection, delivery or approval.'] },
      { heading: 'How to reduce avoidable delays', paragraphs: ['Confirm the layout, fittings and tile choices early. Ask which items the renovator is ordering, when they are expected and what happens if a selected product is unavailable.', 'Your quote should also explain how changes are approved. Keeping decisions in writing helps the homeowner and the renovation team work from the same scope.'] },
      { heading: 'What should your renovator give you?', paragraphs: ['Ask for the expected on-site programme in writing, with the scope it is based on. If the bathroom is the only one in the home, raise that at the measure so the most disruptive stages can be planned clearly.', 'The right answer is not the shortest possible promise. It is a realistic sequence for your room, backed by a scope that says what happens if the work changes.'] },
      { heading: 'How should you plan around the bathroom being out of action?', paragraphs: ['Talk about daily routines before demolition, especially if the home has only one bathroom. The most disruptive stage is usually early in the job, when the room is stripped out and trades are preparing the services and surfaces.', 'A clear program helps you decide whether you need to stay elsewhere for part of the work, arrange different washing routines or plan around school and work hours. The practical plan is part of the renovation, not a side issue.'] },
    ],
  },
  {
    slug: 'how-to-compare-bathroom-renovation-quotes',
    title: 'Fixed quote vs verbal estimate: what to ask before you sign',
    metaTitle: 'Fixed Quote vs Verbal Estimate',
    description: 'How to compare a fixed-scope bathroom renovation quote with a rough verbal estimate before you choose a renovator.',
    published: '2026-09-10',
    readTime: '4 min read',
    category: 'Quotes and decisions',
    sections: [
      { heading: 'Compare scope before price', paragraphs: ['Two quotes can have different totals because they describe different work. Read the scope first: layout, demolition, waterproofing, tiling, fittings, electrical work, plumbing, waste removal and clean-up should be clear.', 'If a line is vague, ask for it to be clarified in writing. A lower number is not necessarily lower cost if important work has been left for later.'] },
      { heading: 'What is the risk with a verbal estimate?', paragraphs: ['A verbal estimate can be useful for an early conversation, but it is not enough to sign on. It may not define the tile allowance, fixture choices, access, waste removal, waterproofing, electrical work or what happens if hidden damage is found.', 'The problem is not that every estimate is dishonest. The problem is that an estimate leaves too many assumptions outside the decision, and those assumptions can turn into extra cost once your bathroom is already out of action.'] },
      { heading: 'What should a fixed-scope quote include?', paragraphs: ['A fixed-scope written quote should say what room is being renovated, what work is included, what is excluded, which selections are allowed for and how variations are approved. It should also show the payment schedule and any program assumptions.', 'For a bathroom, look closely for demolition, plumbing and electrical preparation, <a href="/blog/bathroom-waterproofing-certificate-sydney/" class="et-link">waterproofing to AS 3740</a>, tiling, fit-off, rubbish removal and final clean. If one quote names those items and another does not, you are not comparing the same thing.'] },
      { heading: 'Check the assumptions', paragraphs: ['Look for assumptions about the room size, tile format, fitting allowances, access, working hours and the condition of the existing walls and floor. These assumptions can materially change the final result.', 'Ask how variations are priced and approved. You should know who can authorise a change and how the change will be recorded before work proceeds.'] },
      { heading: 'Ask these questions before you sign', paragraphs: ['Ask whether the quote is based on an on-site measure, which items are provisional, who manages the trades, when you will receive the program and what certificate or handover documents are supplied.', 'Ask what happens if the old bathroom reveals rot, asbestos, non-compliant plumbing or another issue after demolition. You want the variation process clear before the pressure of a half-demolished room is in the room with you.'] },
      { heading: 'Choose accountability as well as value', paragraphs: ['Ask who will manage the project, how communication will work and what protection is included after completion. ETR is family-run, holds NSW Builder Licence 475204C and offers a 10-year workmanship warranty as stated in its terms.', 'A free on-site measure and fixed-scope written quote give you a better basis for comparing the actual room, not just an estimate made from photographs.'] },
      { heading: 'When is the cheapest quote not the cheapest job?', paragraphs: ['The cheapest quote can become the dearer job if important work has been left out or pushed into variations. A bathroom renovation has too many connected stages to price on a single headline number.', 'Choose the quote that makes the work easy to understand. If you cannot explain what is included after reading it, ask for the scope to be rewritten before you sign.'] },
      { heading: 'What should be agreed before the deposit?', paragraphs: ['Before paying a deposit, check the scope, payment schedule, start assumptions and variation process. Confirm who orders the main selections and what happens if a product is unavailable.', 'The aim is simple: after you sign, both sides should be working from the same document. If a promise matters, it belongs in the quote or contract rather than in a phone call you have to remember later.'] },
    ],
  },
  {
    slug: 'questions-to-ask-a-bathroom-renovator',
    title: 'How to choose a bathroom renovator in Sydney without getting burned',
    metaTitle: 'Choose a Bathroom Renovator',
    description: 'The questions that help Sydney homeowners check licensing, scope, communication, waterproofing, timing and aftercare before choosing a renovator.',
    published: '2026-09-10',
    readTime: '4 min read',
    category: 'Choosing a renovator',
    sections: [
      { heading: 'Questions about the company', paragraphs: ['Ask who holds the licence, who will manage the project and who will be your day-to-day contact. Confirm the business name on the quote matches the business you are engaging.', 'For ETR, the NSW Builder Licence is 475204C. The project is run by the Dawood family, with Omar Dawood as Licensed Builder and Civil Engineer and Adam Dawood as Licensed Tiler and Projects Manager.'] },
      { heading: 'Questions about the work', paragraphs: ['Ask what is included in demolition, plumbing, electrical work, waterproofing, tiling, fittings, waste removal and clean-up. Ask how the team deals with changes or hidden conditions.', 'You should also ask how the renovation will be sequenced, what decisions are needed before work begins and how the team will protect the rest of your home.'] },
      { heading: 'Questions that reveal a hard sell', paragraphs: ['Be careful when a renovator pushes for a decision before measuring the room, avoids writing down exclusions or says a bathroom can be priced from photos alone. A confident builder should be able to explain what is known and what still needs checking.', 'Ask why the quoted program is realistic, what could change it and how product delays are handled. A vague answer now usually becomes stress later.'] },
      { heading: 'Questions about waterproofing and paperwork', paragraphs: ['Ask how the bathroom will be waterproofed, what standard applies and whether a certificate is supplied. For ETR bathroom renovations, <a href="/blog/bathroom-waterproofing-certificate-sydney/" class="et-link">waterproofing is done to AS 3740</a> with primer plus two coats, and a compliance certificate is supplied.', 'Ask what other handover documents you should keep with the final scope, warranty terms and product information. A careful paper trail is not exciting, but it matters if you ever need to check what was agreed.'] },
      { heading: 'Questions about the quote and warranty', paragraphs: ['Ask for a fixed-scope written quote, the payment schedule, the variation process and the terms of any warranty. Make sure the warranty wording is specific and do not assume it covers third-party fittings unless the terms say so.', 'A good first conversation should leave you with fewer assumptions, not more. If the answer changes depending on who you speak to, ask for the agreed position in writing.'] },
      { heading: 'How should you decide after the answers?', paragraphs: ['Compare the written scope, not just the price. The right renovator should be clear about what is included, who is on site, how updates are handled and what happens if the old room hides a problem.', 'You are choosing the people who will have your bathroom open for weeks. Good communication, clean site habits and a clear variation process are not extras; they are part of the job.'] },
      { heading: 'What proof should matter most?', paragraphs: ['Look for checkable proof: a licence number, a written quote, clear waterproofing paperwork, a real warranty and real customer feedback. Vague claims about quality are not the same as evidence.', 'For ETR, the load-bearing trust signals are plain: NSW Builder Licence 475204C, AS 3740 waterproofing, fixed-scope written quotes, a free on-site measure and a 10-year workmanship warranty stated as written.'] },
      { heading: 'What should make you pause?', paragraphs: ['Pause if the scope is hard to understand, the price keeps changing without written detail or the renovator avoids basic questions about timing, waterproofing and variations.', 'A bathroom renovation is too disruptive to run on guesswork. If the conversation feels rushed before you sign, it rarely becomes clearer after demolition.'] },
      { heading: 'What should feel clear before you say yes?', paragraphs: ['You should know who you call, what happens first, what the written quote includes, when the bathroom will be out of action and how changes are approved.', 'If those answers are clear, the decision becomes less about trusting a sales pitch and more about choosing the team with the cleanest process.'] },
    ],
  },
  {
    slug: 'bathroom-renovation-checklist-sydney',
    title: 'Bathroom renovation checklist for Sydney homeowners',
    metaTitle: 'Bathroom Renovation Checklist',
    description: 'A planning checklist for the decisions, documents and practical details to settle before your bathroom renovation begins.',
    published: '2026-09-10',
    readTime: '2 min read',
    category: 'Planning and process',
    sections: [
      { heading: 'Before requesting quotes', paragraphs: ['Write down what is not working in the current room and what you want to change. Note storage needs, shower and bath preferences, lighting, ventilation, accessibility needs and any layout constraints.', 'Take measurements and photographs for an initial conversation, but use an on-site measure before relying on a price. Existing conditions are part of the decision.'] },
      { heading: 'Before accepting a quote', paragraphs: ['Confirm the scope, room size basis, inclusions, exclusions, selections, programme assumptions and variation process. Keep the final scope and agreed selections together in writing.', 'Check the builder licence details and ask who is responsible for coordinating the work. Make sure the quote says what happens to waste, protection and final clean-up.'] },
      { heading: 'Before work starts', paragraphs: ['Complete the selections that affect ordering and confirm access arrangements. Decide where materials can be stored and how the team will move through the home.', 'Keep a simple record of decisions and changes. Clear written communication helps keep the project aligned when the room is temporarily out of action.'] },
    ],
  },
  {
    slug: 'bathroom-waterproofing-certificate-sydney',
    title: 'Waterproofing certificates explained: what every Sydney bathroom renovation needs',
    metaTitle: 'Waterproofing Certificates Explained',
    description: 'What a bathroom waterproofing certificate means, when to ask for it and why AS 3740 matters inside a full renovation.',
    published: '2026-09-20',
    readTime: '4 min read',
    category: 'Planning and process',
    sections: [
      { heading: 'The short answer', paragraphs: ['A waterproofing certificate is the paper trail that confirms the wet-area waterproofing work was completed for the <a href="/services/bathroom-renovations/" class="et-link">bathroom renovation</a>. For ETR bathroom renovations, waterproofing is done to AS 3740, with primer plus two coats, and a compliance certificate is supplied.', 'This is not a separate waterproofing-only service. It is one critical stage inside the full bathroom renovation sequence, because the tile finish only performs if the surface behind it has been prepared and sealed correctly.'] },
      { heading: 'What does AS 3740 mean in plain English?', paragraphs: ['AS 3740 is the wet-area waterproofing standard used for bathrooms and other wet areas. It sets out where waterproofing is needed and how wet-area work should be treated so water does not move into parts of the building that are meant to stay dry.', 'For a homeowner, the standard matters because you cannot judge waterproofing from the finished tiles. Once the room is complete, the membrane is hidden. The certificate and the written scope are the record of what was done behind the finish.'] },
      { heading: 'When should you ask about the certificate?', paragraphs: ['Ask before you accept the quote, not at handover. The quote should explain whether waterproofing is included, what standard applies and what paperwork you receive at the end.', 'You should also ask how the waterproofing stage fits into the program. Proper prep, coating and curing time should be part of the sequence, not squeezed in as an afterthought.'] },
      { heading: 'Why does the certificate matter after the job?', paragraphs: ['The certificate gives you a record to keep with the rest of your handover papers. If you sell, make an insurance claim or need to check the work years later, you have more than a memory of what was said.', 'It also helps separate real process from sales talk. A renovator who can name the standard, explain the sequence and supply the certificate is giving you something checkable.'] },
      { heading: 'What does the certificate not prove?', paragraphs: ['A certificate does not mean every product in the bathroom has a 10-year warranty, and it does not replace the need for a clear workmanship warranty. Product warranties, workmanship and waterproofing paperwork are related, but they are not the same thing.', 'It also does not make a vague quote acceptable. You still need the whole scope in writing: demolition, plumbing, electrical work, tiling, fittings, waste removal, clean-up and the variation process.'] },
      { heading: 'Questions to ask before you sign', paragraphs: ['Ask whether the bathroom is waterproofed to AS 3740, whether primer and two coats are included, whether the certificate is supplied and who manages the sequence around waterproofing.', 'A careful renovator should be able to explain the process without hiding behind jargon. If the answer is only "we do waterproofing", ask for the standard, certificate and scope in writing.'] },
      { heading: 'How does this fit with the rest of the bathroom?', paragraphs: ['Waterproofing is one stage in a chain. The substrate, falls to drains, plumbing positions, screed, tile setout and final fit-off all affect the finished room, so the certificate should sit inside a broader renovation scope.', 'That is why ETR discusses waterproofing as part of the bathroom renovation, not as a detached repair product. The goal is a bathroom that works as a whole system once the tiles, fixtures and finishes are back in place.'] },
      { heading: 'Where should you keep the certificate?', paragraphs: ['Keep the certificate with your quote, contract, invoices, warranty terms and product information. If a later owner, insurer or strata manager asks what was done, you want the record in one place.', 'Good paperwork will not make the bathroom look better on day one, but it protects the value of the work after the room is finished.'] },
    ],
  },
  {
    slug: 'first-time-bathroom-renovation-sydney',
    title: 'First time renovating? Here is exactly what happens, step by step',
    metaTitle: 'First Bathroom Renovation Steps',
    description: 'A step-by-step guide to what happens before, during and after a first bathroom renovation in Sydney.',
    published: '2026-09-20',
    readTime: '4 min read',
    category: 'Planning and process',
    sections: [
      { heading: 'Start with the measure, not the mood board', paragraphs: ['Your first <a href="/services/bathroom-renovations/" class="et-link">bathroom renovation</a> should start with the room as it is. The on-site measure checks the size, access, current layout, visible condition and practical needs before finishes are locked in.', 'Photos, saved ideas and showroom visits are useful, but the measured room decides what will fit. This is also where you raise daily-use issues such as storage, poor light, a tight shower, one bathroom in the home or a layout that never worked.'] },
      { heading: 'Then the scope is written down', paragraphs: ['After the measure, the renovation needs a written scope. It should say what is included, what is excluded, which selections are still open and how changes will be approved.', 'At ETR, the aim is a fixed-scope written quote before work begins. That means the job is not priced as a loose verbal estimate that changes once the bathroom has already been stripped out.'] },
      { heading: 'Selections and ordering happen before site work', paragraphs: ['Tiles, tapware, vanity, toilet, shower screen, accessories and lighting decisions affect timing and cost. The sooner these are settled, the fewer avoidable delays there are once the room is out of action.', 'If you are unsure, ask which choices must be made now and which can wait. Not every decision has the same impact on the program.'] },
      { heading: 'Site work follows a sequence', paragraphs: ['The on-site stage usually moves through protection, demolition, plumbing and electrical preparation, waterproofing, tiling, fit-off, finishing and final clean. Each stage depends on the one before it.', 'Waterproofing is a good example. It needs proper prep and curing time. Rushing it may make a program look shorter on paper, but it adds risk to the part of the bathroom you cannot see once the tiles go on.'] },
      { heading: 'Changes need to be handled in writing', paragraphs: ['Even with a careful quote, an old bathroom can reveal problems after demolition. If that happens, ask for the reason, cost and timing effect before extra work proceeds.', 'This is why a variation process matters. It keeps a stressful moment from turning into a guessing game and gives both sides one clear record of the decision.'] },
      { heading: 'How do you keep the rest of the home usable?', paragraphs: ['Before work starts, agree how the team will move through the home, where tools and materials can be stored, how dust and floor protection will be handled and when noisy work is likely.', 'This is especially important if you work from home, have children at home or have only one bathroom. Renovation is much less stressful when the practical rules are clear before the first day on site.'] },
      { heading: 'What should you keep asking during the job?', paragraphs: ['Ask what has been completed, what happens next and whether any decision is needed from you before the next stage can continue. Short, regular updates are better than waiting until a delay has already happened.', 'If something changes, ask for it in writing. First-time renovators often worry that asking simple questions is annoying, but a good process makes those questions normal.'] },
      { heading: 'Handover is more than a finished room', paragraphs: ['At handover, keep the final scope, invoices, warranty terms, waterproofing certificate and product information together. These papers are part of the renovation, not admin clutter.', 'A first renovation feels much calmer when you know the next step before it arrives. Ask simple questions early, keep the answers in writing and make the room itself the source of truth.'] },
    ],
  },
  {
    slug: 'ensuite-vs-bathroom-vs-powder-room-renovation',
    title: 'Ensuite vs full bathroom vs powder room renovation: cost and scope compared',
    metaTitle: 'Ensuite vs Bathroom vs Powder Room',
    description: 'How the scope changes between an ensuite, full bathroom and powder room renovation, and what that means for pricing.',
    published: '2026-09-20',
    readTime: '4 min read',
    category: 'Planning and cost',
    sections: [
      { heading: 'The short answer', paragraphs: ['A full bathroom, ensuite and powder room are all wet-area renovations, but they do not carry the same scope. The right comparison is not just room size; it is what the room must do each day.', 'A main bathroom often has the most users. An ensuite has to work beside a bedroom, often in a small footprint. A powder room may have no shower, but the fixture setout and waterproofing still matter if it has a water supply and floor waste.'] },
      { heading: 'What changes in a full bathroom?', paragraphs: ['A <a href="/services/bathroom-renovations/" class="et-link">full bathroom renovation</a> usually needs the broadest scope: shower, toilet, vanity, storage, waterproofing, tiling, ventilation, lighting and often a bath. It may also be the only bathroom in the home, so disruption planning matters.', 'ETR <a href="/packages/" class="et-link">package starting points</a> for bathroom-sized work begin at Basic from $18,000 for an approximately 1.5 m x 1.8 m bathroom, Standard from $25,000 and Premium from $30,000, each tied to its stated room size and inclusion list.'] },
      { heading: 'What changes in an ensuite?', paragraphs: ['An <a href="/services/ensuite-bathroom-renovations/" class="et-link">ensuite renovation</a> often has the same trade sequence as a bathroom, but the design pressure is different. The room is smaller, storage is tighter, ventilation can be harder and noise beside the bedroom matters.', 'A good ensuite scope should settle the toilet position, shower clearance, vanity size, door swing, ventilation and lighting before the price is locked in. Small layout mistakes are felt every morning.'] },
      { heading: 'What changes in a powder room?', paragraphs: ['A <a href="/services/powder-room-renovations/" class="et-link">powder room renovation</a> is smaller again, usually with a toilet and hand basin. The design challenge is clearance: door swing, basin projection, toilet position and tile setout can make the difference between useful and cramped.', 'Do not assume a small room needs no serious planning. If it has a floor waste and water supply, waterproofing still has to be handled properly, and a poor layout can make the room awkward for years.'] },
      { heading: 'Where do costs overlap?', paragraphs: ['Some costs appear in every wet-area renovation: protection, demolition, plumbing, electrical work, waterproofing where required, tiling, fit-off and clean-up. Smaller rooms can still involve most of the same trades, even when the material quantities are lower.', 'That is why the room type alone does not set the price. A small ensuite with difficult access or a changed layout can be more involved than a larger bathroom that keeps the same service positions.'] },
      { heading: 'How should you choose where to start?', paragraphs: ['Start with the room causing the most daily friction. If the main bathroom is failing, it may need to come first. If the ensuite is used every day and the main bathroom still works, the ensuite may be the better first job.', 'If two wet areas are linked, ask whether they should be planned together. One measured scope can show whether sequencing the rooms saves disruption or whether separate stages make more sense for the household.'] },
      { heading: 'What should the quote make clear?', paragraphs: ['The quote should name the room, not just say "bathroom renovation". It should say whether the job is a main bathroom, ensuite, powder room or combined wet-area program, because the assumptions behind each one are different.', 'Ask for the scope to spell out the trade sequence, selections, waterproofing, exclusions and timing. A room-type comparison only helps if the written quote is specific enough to show what is being compared.'] },
      { heading: 'What is the best first question?', paragraphs: ['Ask what problem each room is meant to solve. A main bathroom may need better storage and family use, an ensuite may need quiet and ventilation, and a powder room may need better clearance.', 'Once the purpose is clear, the cost conversation becomes more useful because the quote can focus on the room that matters most.'] },
    ],
  },
  {
    slug: 'bathroom-laundry-combo-renovation-worth-it',
    title: 'Bathroom + laundry combo renovations: is combining the two worth it?',
    metaTitle: 'Bathroom and Laundry Combo Guide',
    description: 'When it makes sense to renovate a bathroom and laundry together, and what to check before combining the work.',
    published: '2026-09-20',
    readTime: '4 min read',
    category: 'Planning and cost',
    sections: [
      { heading: 'The short answer', paragraphs: ['Combining a bathroom and laundry renovation can be worth it when the rooms are close together, share services or would otherwise create two separate rounds of disruption. It is not automatically the right choice for every home.', 'ETR treats this as a <a href="/services/laundry-renovations/" class="et-link">bathroom and laundry renovation</a> planned as one program, not as a standalone laundry-only service. The measure decides whether the combined sequence helps the household or simply makes too much wet-area space unavailable at once.'] },
      { heading: 'Where can combining the work help?', paragraphs: ['One combined scope can reduce repeated site setup, demolition, deliveries, trade visits and final clean-up. If the rooms share a wall or services, the plumbing and electrical planning may also be clearer when both rooms are considered together.', 'It can also help the design feel consistent. Tile choices, storage, lighting and practical access can be planned as one wet-area decision rather than two separate projects that happen months apart.'] },
      { heading: 'What are the trade-offs?', paragraphs: ['The main trade-off is disruption. If the bathroom and laundry are both offline at once, the household needs a clear plan for washing, access and daily routines.', 'Sometimes a staged program is better. One room can be completed while the other stays usable, then the team swaps over. That decision belongs in the written scope before work starts.'] },
      { heading: 'What happens with waterproofing?', paragraphs: ['Both rooms need to be treated as wet areas where the scope requires it. ETR waterproofs wet-area renovation work to AS 3740 and supplies certification for the waterproofing work.', 'Do not let a combined job blur the paperwork. The quote should still explain what is included for each room and what certificates or handover records you will receive.'] },
      { heading: 'What should you ask at the measure?', paragraphs: ['Ask whether the rooms should run together or in sequence, what the expected on-site program is, which selections affect ordering and whether access or strata rules change the plan.', 'The best combined job is not just two renovations at the same time. It is one controlled program with the disruption, cost and scope made clear before the first room comes out.'] },
      { heading: 'How does cost comparison work?', paragraphs: ['Compare the combined scope against two separate jobs, not against a single-room bathroom quote. A combined program may reduce repeated setup, but it also adds another wet area, more selections and more decisions.', 'The measured quote should show whether the saving is in fewer site visits, shared trade sequencing or simpler ordering. Avoid assuming there is a fixed discount just because two rooms are booked together.'] },
      { heading: 'When is combining not worth it?', paragraphs: ['Combining may not suit a home where the bathroom and laundry are far apart, where one room needs urgent work but the other does not, or where losing both rooms at once would be too disruptive.', 'It may also be better to wait if key selections are not ready. A combined project has more moving parts, so late decisions can slow down two rooms instead of one.'] },
      { heading: 'What should be written room by room?', paragraphs: ['Ask for the inclusions and exclusions to be clear for the bathroom and for the laundry. Each room should have its own fixtures, finishes, waterproofing needs and handover records identified.', 'That clarity protects the benefit of combining the work. You get one coordinated program without losing sight of what each room actually needs.'] },
      { heading: 'What should the final decision come down to?', paragraphs: ['Choose the option that gives the home the least avoidable disruption for the clearest scope. Sometimes that means one combined program, and sometimes it means staging the rooms.', 'The measure should make that choice clearer by showing how the rooms connect, what the household can live without and what needs to stay usable.'] },
    ],
  },
  {
    slug: 'small-bathroom-renovation-without-feeling-cramped',
    title: 'How to renovate a small bathroom without it feeling cramped',
    metaTitle: 'Small Bathroom Renovation Guide',
    description: 'Practical planning ideas for making a small bathroom work harder without relying on unsupported promises or unnecessary features.',
    published: '2026-09-10',
    readTime: '2 min read',
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
    metaTitle: 'Bathroom Renovation Mistakes',
    description: 'The planning mistakes that create confusion, rework or surprise cost during a bathroom renovation.',
    published: '2026-09-10',
    readTime: '2 min read',
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
    metaTitle: 'DIY Bathroom Renovation Guide',
    description: 'How to think through a DIY bathroom renovation, licensed work, coordination and the cost of getting the sequence wrong.',
    published: '2026-09-10',
    readTime: '2 min read',
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
    metaTitle: 'Strata Bathroom Renovation Sydney',
    description: 'The approvals, access, communication and planning questions apartment owners should consider before a strata bathroom renovation.',
    published: '2026-09-10',
    readTime: '4 min read',
    category: 'Planning and process',
    sections: [
      { heading: 'The short version', paragraphs: ['Check the rules first. Plan the move in and out. Keep the paper trail.'] },
      { heading: 'Check the building rules first', paragraphs: ['Apartment renovations can involve strata by-laws, approval steps, building access rules and limits on working hours. Ask your strata manager or owners corporation what applies before booking site work.', 'Do not assume approval is automatic because the work is inside your apartment. The building may have requirements for waterproofing, plumbing, noise, lifts and protection of common areas.'] },
      { heading: 'What should you ask strata before the quote?', paragraphs: ['Ask whether the owners corporation needs a renovation application, which documents they expect, what working hours apply, how lift bookings work and whether common areas need special protection.', 'Ask for the rules in writing. A verbal summary from a neighbour may be useful, but the renovator needs the actual building requirements before the programme and quote assumptions are final.'] },
      { heading: 'Plan access and protection', paragraphs: ['Confirm how materials and waste can move through the building, where deliveries can stop and how shared areas must be protected. These details belong in the programme and quote assumptions.', 'Give the renovation team the building rules early so the site plan reflects the actual property.'] },
      { heading: 'Why access can affect timing', paragraphs: ['Apartment work can take longer when lifts, loading zones, parking, concierge rules or waste removal windows are tight. None of those details changes the quality of the bathroom, but they can change the way the job is staged.', 'This is why a strata renovation should not be priced as if it were a freestanding house with easy driveway access. The access plan is part of the scope.'] },
      { heading: 'Waterproofing paperwork matters', paragraphs: ['Strata buildings can pay close attention to wet-area work because one bathroom can affect another lot. Ask what proof the building wants for waterproofing and keep the certificate with the final paperwork.', 'ETR waterproofs bathroom renovation work to <a href="/blog/bathroom-waterproofing-certificate-sydney/" class="et-link">AS 3740</a> and supplies a compliance certificate for the waterproofing work. If your building has its own document process, raise it at the measure.'] },
      { heading: 'Keep the paperwork together', paragraphs: ['Keep approvals, the written scope, selections, certificates and variation records in one place. Clear documentation helps everyone understand what was agreed.', 'A free on-site measure is a useful starting point before a strata quote is prepared.'] },
      { heading: 'What should not be assumed?', paragraphs: ['Do not assume the work can start just because the renovation is inside your apartment. Also do not assume every building has the same approval steps. Older blocks, newer buildings and tightly managed strata schemes can all handle wet-area work differently.', 'Bring the building rules to the first serious quote conversation. That gives the renovator a fair basis for scope, timing and access, and it gives you fewer surprises once the bathroom is open.'] },
      { heading: 'How should neighbours and common areas be handled?', paragraphs: ['A strata bathroom renovation is not only about your apartment. Noise, lift use, hallway protection and waste movement can affect neighbours and common property.', 'Ask how notices, access windows and protection are handled in your building. The smoother those details are, the less likely the job is to stall over something that was known before work started.'] },
      { heading: 'What should you give the renovator?', paragraphs: ['Give the renovator the by-laws, approval conditions, contact details for the building manager and any forms the building wants completed. Those documents shape access and timing as much as the bathroom design does.', 'If the building changes a rule after the quote, ask for the timing and cost effect to be recorded before the plan changes.'] },
    ],
  },
  {
    slug: 'bathroom-renovation-hidden-costs-sydney',
    title: 'Sydney bathroom renovation: hidden costs to watch for',
    metaTitle: 'Bathroom Renovation Hidden Costs',
    description: 'The assumptions and changes that can make bathroom renovation costs move, and how a clear scope helps you prepare.',
    published: '2026-09-10',
    readTime: '4 min read',
    category: 'Planning and cost',
    sections: [
      { heading: 'Hidden usually means unspecified', paragraphs: ['Many surprise costs begin as an unclear assumption: what happens to demolition, waste, access, fittings, tile quantities, electrical work or the existing substrate?', 'Ask what the quote includes and what would be treated as a variation. Clarity at the start is more useful than trying to predict every possible condition.'] },
      { heading: 'Existing conditions can change the work', paragraphs: ['A bathroom is opened up during renovation, and the condition behind old finishes may affect the work required. The quote should explain how an unexpected condition is documented and priced.', 'Do not approve a change you do not understand. Ask for the reason, the cost and the effect on timing in writing.'] },
      { heading: 'What can show up after demolition?', paragraphs: ['Old bathrooms can hide rot, poor substrate, non-compliant plumbing or asbestos in pre-1990 homes. Some signs can be spotted before quoting, but the full condition is not always visible until finishes are removed.', 'That does not mean every hidden issue should become an open cheque. The quote should say how unexpected conditions are raised, who approves the variation and what happens before extra work proceeds.'] },
      { heading: 'How should a variation be handled?', paragraphs: ['A variation should explain the problem, the recommended fix, the cost and the effect on timing. It should be approved before the extra work is done, except where an urgent safety step is genuinely needed.', 'Keep variation records with the quote and selections. A bathroom renovation has many moving parts, and written decisions stop a stressful week from becoming a memory test.'] },
      { heading: 'Leave room for considered selections', paragraphs: ['Selections should match the room, the scope and the budget. Changing fittings or finishes late can affect ordering and the programme.', 'A measured room and <a href="/blog/how-to-compare-bathroom-renovation-quotes/" class="et-link">fixed-scope written quote</a> give you a stronger basis for deciding what to include before work begins.'] },
      { heading: 'What questions reduce the risk?', paragraphs: ['Ask what is included in demolition, waste removal, waterproofing, tiling, plumbing, electrical work, fittings and final clean. Ask what is provisional and what would count as a variation.', 'Ask how hidden conditions are photographed, explained and priced. A clear answer before work starts is one of the best ways to avoid feeling trapped after demolition.'] },
      { heading: 'The aim is control, not pretending nothing can change', paragraphs: ['No renovator can promise that every old bathroom is exactly as it looks from the outside. What they can promise is a clear scope, a proper measure, a written quote and a fair process for handling what the old room reveals.', 'That is the practical difference between a hidden issue and a nasty surprise. One has a process; the other has panic.'] },
      { heading: 'What should be included before demolition?', paragraphs: ['Before demolition, the quote should already name the known work and the assumptions behind it. Access, rubbish removal, fixture allowances, waterproofing, tile quantities and electrical work should not be floating in conversation only.', 'The clearer those items are, the easier it is to tell whether a new cost is genuinely hidden or was simply left out of the first scope.'] },
      { heading: 'How much contingency should you expect?', paragraphs: ['A contingency is not a licence for vague quoting. It is a way to stay calm if an old bathroom reveals something that could not be confirmed before strip-out.', 'Ask what kinds of findings would trigger a variation and how quickly you would be told. The process matters more than guessing a perfect number in advance, especially in older Sydney homes with prior patch repairs.'] },
    ],
  },
  {
    slug: 'bathroom-renovation-essential-upgrades',
    title: 'Bathroom renovation: essential upgrades vs nice-to-haves',
    metaTitle: 'Essential Bathroom Upgrades',
    description: 'A practical framework for deciding which bathroom renovation choices should come first when the budget is limited.',
    published: '2026-09-10',
    readTime: '1 min read',
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
    metaTitle: 'Bathroom Renovation Warranty',
    description: 'What to ask about workmanship warranties, exclusions and third-party fittings before signing a renovation agreement.',
    published: '2026-09-10',
    readTime: '2 min read',
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
    metaTitle: 'Fast Bathroom Renovation Guide',
    description: 'How selections, approvals, ordering and site sequencing affect the speed of a bathroom renovation.',
    published: '2026-09-10',
    readTime: '1 min read',
    category: 'Planning and process',
    sections: [
      { heading: 'Speed starts before demolition', paragraphs: ['The fastest projects are not necessarily rushed projects. They are projects where the room has been measured, the scope is agreed, selections are ready and access is clear before site work begins.', 'Late decisions and unavailable products can add more time than careful planning takes.'] },
      { heading: 'Do not remove the necessary sequence', paragraphs: ['Protection, demolition, preparation, plumbing and electrical work, waterproofing, tiling, fitting installation and finishing each have a place in the programme.', 'Compressing a programme by skipping preparation or curing time creates risk. Ask how the proposed timeline protects the quality of the work.'] },
      { heading: 'Ask for a realistic programme', paragraphs: ['A useful programme identifies dependencies, decision dates and how changes affect timing. It should also allow for the actual room rather than promise a generic number of days.', 'A clear written scope is the best starting point for a realistic conversation about speed.'] },
    ],
  },
  {
    slug: 'bathroom-trends-australia-right-now',
    title: 'Bathroom trends in Australia right now',
    metaTitle: 'Australian Bathroom Trends',
    description: 'A grounded look at the design directions Sydney homeowners are considering without losing practicality or value.',
    published: '2026-09-12',
    readTime: '2 min read',
    category: 'Design and finishes',
    sections: [
      { heading: 'The trend is clean and practical', paragraphs: ['Many Australian bathrooms are moving toward calmer palettes, cleaner lines and finishes that are easy to maintain. The emphasis is usually on light, openness and strong everyday function.', 'That can mean durable tiles, quieter tones and material choices that still work with a busy home.'] },
      { heading: 'The best design still fits the room', paragraphs: ['A trend is only useful if it suits the actual bathroom. A very dark finish can feel heavy in a narrow room, while a high-contrast scheme may feel busy if storage and lighting are not planned well.', 'The most successful updates usually balance appearance, access and ease of cleaning.'] },
      { heading: 'Make choices based on the room', paragraphs: ['Think about layout, bathroom size, natural light and how the room is used most days. Then choose the trend that supports that decision rather than forcing the room to fit a style idea.', 'A straightforward, well-proportioned bathroom usually feels current longer than a room shaped by one single statement item.'] },
    ],
  },
  {
    slug: 'small-bathroom-storage-solutions',
    title: 'Storage solutions for small bathrooms',
    metaTitle: 'Small Bathroom Storage Ideas',
    description: 'How to make a compact bathroom feel lighter, calmer and more useful without adding clutter.',
    published: '2026-09-12',
    readTime: '1 min read',
    category: 'Small bathrooms',
    sections: [
      { heading: 'Storage has to do real work', paragraphs: ['In a small bathroom, storage needs to solve a daily problem. Tall mirrored storage, a well-placed vanity and thoughtful shelving can make the room feel better organised without making it crowded.', 'The aim is to keep the essentials close without creating visual clutter.'] },
      { heading: 'Plan storage before finishes', paragraphs: ['A good storage plan begins with the room and the routines inside it. Ask where towels, products, hair tools and cleaning items will live and choose a setup that supports those habits.', 'When storage is planned early, finishes and fittings are easier to choose in a way that supports the room rather than fight it.'] },
      { heading: 'Keep the layout clear', paragraphs: ['Storage should not block the shower, vanity or movement through the room. A cleaner, better-used layout often matters more than extra accessories.', 'A compact room feels bigger when it is simpler and easier to use.'] },
    ],
  },
  {
    slug: 'bathroom-lighting-ideas',
    title: 'Bathroom lighting ideas that improve function and mood',
    metaTitle: 'Bathroom Lighting Ideas',
    description: 'Practical lighting choices for bathrooms that need to feel brighter, calmer and more useful at different times of the day.',
    published: '2026-09-12',
    updated: '2026-09-27',
    readTime: '4 min read',
    category: 'Design and finishes',
    heroProject: { slug: 'castle-hill-bathroom', imageIndex: 0 },
    quickAnswer: {
      heading: 'The short answer',
      paragraphs: [
        'Good bathroom lighting uses three layers, not one big fixture: task light for the mirror, ambient light for the whole room, and a softer accent layer for evenings.',
        'Get those three layers right and the fixture count matters far less than where each light sits.',
      ],
      table: {
        caption: 'The three lighting layers',
        columns: ['Layer', 'What it does'],
        rows: [
          { label: 'Task', detail: 'Beside or above the mirror', value: 'Even, shadow-free light for shaving, make-up and grooming' },
          { label: 'Ambient', detail: 'Ceiling-mounted', value: 'General light so the room does not feel dim or flat' },
          { label: 'Accent', detail: 'Niches, shaving cabinets, toe-kicks', value: 'A softer mood layer for evening use' },
        ],
      },
      note: 'Fixture positions and safety ratings still need to be confirmed against your room and wiring before anything is installed.',
      cta: {
        href: '/contact-us/',
        label: 'Book a free on-site measure',
      },
    },
    sections: [
      { heading: 'Start with the task', paragraphs: ['Good bathroom lighting solves everyday tasks first: shaving, grooming, applying makeup and cleaning. A room can feel nicer with layered lighting, but it still needs to be usable first.', 'A single downlight above the door usually throws shadow across the face at the mirror. Light placed either side of the mirror, or built into a mirror itself, lights the face evenly instead.'] },
      { heading: 'Layer the light instead of relying on one fixture', paragraphs: ['Lighting works best in layers. A ceiling layer for general brightness, a task layer at the mirror, and a softer accent layer in a niche or shaving cabinet can work together without making the room feel busy or over-lit.', 'The right mix depends on the room size, mirror position and the finishes in the space. A small bathroom with light tiles needs less ambient light than a larger, darker-toned room.'] },
      { heading: 'Get the colour temperature right', paragraphs: ['Warm-to-neutral white light, roughly in the 2700K–3000K range, generally reads as calmer and more flattering to skin tones than a cooler, bluer white. A colder white can feel clinical in a small room.', 'Keep every fixture in the room on the same colour temperature. Mixing warm and cool white light in one bathroom is one of the most common reasons a finished room looks slightly wrong even when every fixture is good quality on its own.'] },
      { heading: 'Match fixtures to wet areas', paragraphs: ['Fittings near a shower or bath need a higher ingress-protection (IP) rating than fittings elsewhere in the room, because they need to tolerate moisture and spray. Australian wiring rules set out which zones near water need which rating.', 'This is a licensed electrician’s call, not a style choice. Confirm the required rating for each fitting’s position before you fall in love with a look that will not survive its own bathroom.'] },
      { heading: 'Plan lighting early, not last', paragraphs: ['Lighting positions get locked in once the electrical rough-in is done and the tiles are set. Deciding fixture types and positions during the early planning stage, alongside the waterproofing and tiling plan, avoids a mirror light that ends up in the wrong spot or a switch plate placed somewhere awkward.', 'Good lighting is not about adding more fixtures. It is about using the right light, at the right colour temperature and the right safety rating, in the right place.'] },
    ],
    faq: [
      {
        question: 'What is the best type of lighting for a small bathroom?',
        answer: 'Layer it rather than relying on one ceiling fixture: a task light at the mirror, a general ambient light, and an optional soft accent light. A small room usually needs less total brightness than a large one, so avoid over-lighting it just because a bigger room next door has more fixtures.',
      },
      {
        question: 'What colour temperature should bathroom lights be?',
        answer: 'Most bathrooms suit a warm-to-neutral white in the 2700K–3000K range, which flatters skin tones and feels calmer than a cooler white. Keep every fixture in the room at the same colour temperature so nothing looks mismatched.',
      },
      {
        question: 'Can I choose my own bathroom light fittings?',
        answer: 'Yes for the style and finish. The placement and the safety rating near water still need to be confirmed against Australian wiring rules by a licensed electrician before installation.',
      },
      {
        question: 'Do LED mirrors count as a light source?',
        answer: 'Yes. A built-in LED mirror can supply the task-lighting layer on its own, which is useful in a smaller bathroom where there is no room for separate wall lights either side of the mirror.',
      },
      {
        question: 'When should bathroom lighting be decided during a renovation?',
        answer: 'Early, alongside the waterproofing and tiling plan. Fixture positions and wiring are locked in once the electrical rough-in and tiling are done, so deciding later usually means compromising on where the light actually falls.',
      },
    ],
  },
  {
    slug: 'bathroom-tiling-and-finishes-guide',
    title: 'Choosing bathroom tiles and finishes',
    metaTitle: 'Bathroom Tiles and Finishes',
    description: 'How to pick bathroom tiles, surfaces and fittings that look good, work hard and suit the room.',
    published: '2026-09-12',
    readTime: '2 min read',
    category: 'Design and finishes',
    sections: [
      { heading: 'Choose for the room first', paragraphs: ['Tile and finish choices have a big effect on the look and feel of a bathroom. A large-format tile can make a room feel calmer, while smaller tiles can add texture and detail in the right setting.', 'The best finish is the one that suits the room size, how much traffic it gets and how you want to live in it.'] },
      { heading: 'Balance style with upkeep', paragraphs: ['A finish should be easy to clean and durable enough for daily use. Grout, texture and matte finishes all affect how a room feels and how much upkeep it needs.', 'The right selection makes a room easier to maintain and usually feels more considered over time.'] },
      { heading: 'Keep the decision in context', paragraphs: ['The best bathroom tile and finish plan is the one that fits the whole room: layout, fixtures, lighting and storage. Good choices support each other, rather than compete with one another.', 'A clear selection plan is easier to quote, order and install without costly change.'] },
    ],
  },
  {
    slug: 'bathroom-renovation-add-value-home',
    title: 'Does a bathroom renovation add value to your home?',
    metaTitle: 'Bathroom Renovation Home Value',
    description: 'What a bathroom renovation is likely to return at resale, how to avoid overcapitalising, and what buyers actually notice.',
    published: '2026-10-02',
    readTime: '4 min read',
    category: 'Planning and cost',
    sections: [
      { heading: 'The short answer', paragraphs: ['A well-planned bathroom renovation typically returns 60 to 80 percent of its cost at resale. The exact figure depends on the suburb, the property price, and how dated the existing bathroom was before the work.', 'That makes bathroom renovations one of the higher-return improvements you can make to a home in Sydney, alongside kitchens and street appeal. But returns are not guaranteed, and spending more does not automatically mean getting more back.'] },
      { heading: 'Why bathrooms influence buyers', paragraphs: ['Bathrooms signal upkeep. A buyer walking through a home with a tired bathroom starts calculating what it will cost to fix. That mental estimate often runs higher than the actual renovation price, because most buyers overweight the disruption.', 'A clean, functional bathroom with good light, working ventilation and modern fittings removes that objection. It does not need to be luxurious. It needs to feel finished, maintained and ready to use.'] },
      { heading: 'Refresh vs full renovation', paragraphs: ['A cosmetic refresh — new tapware, a painted vanity, fresh silicone, better lighting — can cost under $5,000 and still shift the impression of a room on sale day. It will not fix layout problems, poor waterproofing or failing plumbing, but it can remove the "dated" label.', 'A full renovation addresses the structure, waterproofing, layout, fixtures and finishes together. ETR package starting points begin at Basic from $18,000 for a roughly 1.5 m × 1.8 m bathroom, Standard from $25,000, and Premium from $30,000, each tied to a stated room size and inclusion list. These are starting prices, not fixed quotes — the final scope follows a free on-site measure.'] },
      { heading: 'What actually adds value', paragraphs: ['Focus on what buyers notice and use every day: a working shower with good water pressure, enough storage, clean tiles, proper ventilation and a layout that makes sense for the room.', 'Waterproofing to AS 3740 is not visible after the tiles go on, but the certificate and the confidence it gives a buyer at due diligence can matter more than a statement tile wall.'] },
      { heading: 'How to avoid overcapitalising', paragraphs: ['A common guideline is to keep a bathroom renovation under 5 to 10 percent of the property value. A $60,000 bathroom in a $700,000 home is unlikely to return its cost, because buyers in that price bracket are not expecting that level of finish.', 'Match the bathroom to the home and the suburb. A solid mid-range renovation with good waterproofing, clean finishes and a sensible layout usually returns more of its cost than a high-end build in a modest property.'] },
      { heading: 'What should you ask before renovating for resale?', paragraphs: ['Ask whether the bathroom is the weakest room in the home. If the kitchen, exterior or structural issues are worse, fixing the bathroom may not shift the sale price as much as you hope.', 'Ask what level of finish comparable homes in the street already have. A renovation that brings the bathroom up to the local standard is usually the safest return. Going well beyond it is a personal choice, not a financial one.'] },
      { heading: 'What does a good renovation include for resale?', paragraphs: ['Clean layout, modern fittings, waterproofing done to standard, good lighting, proper ventilation, and a neutral finish that suits a broad range of buyers. That combination keeps the room functional without dating it quickly.', 'A fixed-scope written quote with clear inclusions helps you control the spend and compare what you are getting. A free on-site measure is the right starting point if you are weighing up whether the renovation makes financial sense for your home.'] },
    ],
    faq: [
      {
        question: 'How much value does a bathroom renovation add in Sydney?',
        answer: 'A well-executed renovation typically returns 60 to 80 percent of its cost at resale. The exact return depends on the suburb, the property price point and how dated the existing bathroom was.',
      },
      {
        question: 'Is it worth renovating the bathroom before selling?',
        answer: 'Usually yes, if the bathroom is the weakest room in the home. A dated bathroom makes buyers estimate a higher renovation cost than the actual price, which can reduce their offer by more than the renovation would have cost.',
      },
      {
        question: 'What bathroom features add the most value?',
        answer: 'Clean layout, proper waterproofing, good ventilation, modern fittings and enough storage. These practical features matter more at resale than decorative upgrades.',
      },
      {
        question: 'How much should I spend on a bathroom renovation for resale?',
        answer: 'A common guideline is 5 to 10 percent of the property value. Spending beyond that risks overcapitalising, where the renovation costs more than it adds to the sale price.',
      },
      {
        question: 'Does a new bathroom increase home value more than a new kitchen?',
        answer: 'Both are high-return improvements. Kitchens typically cost more to renovate, so the percentage return can be similar. If the bathroom is in worse condition, it may offer the better return for the money.',
      },
    ],
  },
  {
    slug: 'bathroom-colour-schemes-australia',
    title: 'Bathroom colour schemes that actually work in Australian homes',
    metaTitle: 'Bathroom Colour Schemes Australia',
    description: 'How to choose a bathroom colour scheme that suits Australian light, common tile formats and the way the room is used every day.',
    published: '2026-10-02',
    readTime: '4 min read',
    category: 'Design and finishes',
    sections: [
      { heading: 'Start with the room, not the trend', paragraphs: ['A colour scheme should suit the bathroom it goes into. The room size, natural light, ceiling height, tile format and how the space is used every day matter more than what is trending on a design blog.', 'A north-facing room in Sydney gets warm afternoon light, so cool-toned tiles may read differently from how they looked in the showroom. A small, windowless ensuite needs a scheme that keeps the room feeling open rather than heavy.'] },
      { heading: 'Warm neutrals are the clearest shift right now', paragraphs: ['The biggest change in Australian bathrooms is the move from cool greys and stark whites toward warmer neutrals: greige, mushroom, taupe, sandy beige and parchment tones. These colours feel calmer, suit more light conditions and age well.', 'Warm neutrals pair easily with timber vanities, brushed brass or champagne fittings and natural stone. They also work across bathroom types, from a compact powder room to a larger family bathroom.'] },
      { heading: 'Six colour combinations worth considering', paragraphs: ['White and charcoal is a clean, high-contrast pairing that suits most room sizes and does not date quickly. Sage green and white brings warmth without colour risk and works well in homes near bushland or established gardens.', 'Terracotta and beige creates a grounded, earthy feel and pairs with timber and natural stone. Olive and timber accents suit a natural palette and add character without making the room feel busy.', 'Navy and white reads as classic and structured, useful when the vanity or joinery carries the colour. All white with stone keeps the room light and lets the stone do the work, which suits smaller bathrooms where visual simplicity helps.'] },
      { heading: 'How to use the 60-30-10 rule in a bathroom', paragraphs: ['A useful starting point is to divide the room into three layers: 60 percent of the colour comes from the dominant surface, usually the wall and floor tiles. 30 percent comes from a secondary tone, often the vanity, cabinetry or a feature wall. 10 percent comes from the accents, like tapware, accessories and towels.', 'This structure keeps the room balanced. If 60 percent is a warm white tile, the 30 could be an olive vanity and the 10 could be brushed brass fittings. The proportions do the work without needing complicated rules.'] },
      { heading: 'Choose tile colour before paint colour', paragraphs: ['Tiles are the biggest surface in a bathroom and the hardest to change later. Choose the tile colour and format first, then match the paint, grout, fittings and accessories to it.', 'A common mistake is choosing a wall paint and then trying to find a tile that matches. Paint is easy to change. Tile is not. Start with the permanent surface and build outward.'] },
      { heading: 'Small bathrooms need lighter, simpler schemes', paragraphs: ['A compact bathroom usually works better with fewer colours and lighter tones. Light tiles on walls and floor make the room feel larger, and large-format tiles reduce grout lines, which keeps the visual noise down.', 'That does not mean the room has to be plain. A single well-chosen feature, like a textured tile behind the vanity or a coloured shaving cabinet, can carry the design without crowding a small space.'] },
      { heading: 'What lasts vs what dates', paragraphs: ['Bold colours in small doses can add character, but a bathroom covered in a trend colour will feel dated faster than one with a neutral base and considered accents. Fittings, towels and accessories are easier to swap than floor tiles.', 'If the bathroom is being renovated for long-term use, a neutral base with colour in the accessories and soft furnishings gives you more room to change the feel later without touching the hard finishes.'] },
      { heading: 'How does ETR handle colour decisions?', paragraphs: ['The colour scheme is part of the selections process during planning, before site work starts. The on-site measure helps confirm what the room can carry, and the written scope ties the selection to the quote.', 'Farah Dawood, ETR\'s architectural designer, works with homeowners on the design direction so that the scheme, layout and fittings work together rather than compete. A free on-site measure is the right starting point.'] },
    ],
    faq: [
      {
        question: 'What is the most popular bathroom colour in Australia right now?',
        answer: 'Warm neutrals like greige, mushroom and taupe are the clearest trend. They have replaced the cool greys and stark whites that dominated for the past decade, and they suit a wider range of Australian light conditions.',
      },
      {
        question: 'What colours make a small bathroom look bigger?',
        answer: 'Light tones on walls and floor, large-format tiles to reduce grout lines, and a consistent colour scheme with minimal contrast. A lighter, simpler palette creates a sense of space without needing a bigger room.',
      },
      {
        question: 'Should I choose bathroom tiles or paint first?',
        answer: 'Tiles first. They are the biggest surface in the room and the hardest to change. Choose the tile colour and format, then match the paint, grout and fittings to it.',
      },
      {
        question: 'What bathroom colours date the fastest?',
        answer: 'Heavily saturated trend colours used on permanent surfaces like tiles tend to date fastest. A neutral tile base with colour in accessories and soft furnishings gives you more flexibility to update the look later.',
      },
      {
        question: 'How do I choose a bathroom colour scheme for resale?',
        answer: 'Neutral, warm-toned schemes with clean finishes appeal to the broadest range of buyers. Avoid very personal or polarising colours on the tiles and keep bold choices in items that are easy to swap.',
      },
    ],
  },
  {
    slug: 'bathroom-ventilation-sydney-renovation',
    title: 'Bathroom ventilation: what every Sydney renovation needs to get right',
    metaTitle: 'Bathroom Ventilation Requirements Sydney',
    description: 'What the building code requires for bathroom ventilation in a renovation, how exhaust fans work, and what happens when ventilation is missing or undersized.',
    published: '2026-10-02',
    readTime: '4 min read',
    category: 'Planning and cost',
    sections: [
      {
        heading: 'Why ventilation matters more than most finishes',
        paragraphs: [
          'A bathroom generates moisture every time the shower runs. Without a clear path for that moisture to leave the room, it settles on surfaces, seeps into wall cavities and creates the conditions for mould, timber rot and peeling paint. Most of the damage happens where you cannot see it.',
          'Good ventilation is not a luxury add-on. It is a building requirement, and getting it right during a renovation is far easier and cheaper than fixing moisture damage after the fact.',
        ],
      },
      {
        heading: 'What the building code actually requires',
        paragraphs: [
          'Under the National Construction Code (NCC), a bathroom must have either natural ventilation through an openable window or mechanical ventilation through an exhaust fan. If the room has no window, or the window does not open to at least five percent of the floor area, a mechanical exhaust system is mandatory.',
          'The minimum exhaust rate for a bathroom is 25 litres per second. For a bathroom with a shower, 40 to 50 litres per second is a more realistic target if you want the fan to actually clear the steam before it settles.',
          'The exhaust must discharge directly to outside air — through a wall, soffit or roof cowl. Venting into the roof cavity is not compliant and simply moves the moisture problem into the roof structure, where it can rot timber and damage insulation.',
        ],
      },
      {
        heading: 'Natural ventilation vs mechanical ventilation',
        paragraphs: [
          'A window that opens provides natural ventilation and can meet the code on its own if it is large enough. But in practice, most people do not leave bathroom windows open in winter, at night, or when privacy is a concern. A window alone is not always reliable ventilation.',
          'A mechanical exhaust fan runs on demand and removes moisture consistently regardless of the weather or the time of day. In most Sydney renovations, an exhaust fan is installed even when there is a window, because the fan gives the room a reliable moisture-removal path.',
        ],
      },
      {
        heading: 'Types of exhaust fans',
        paragraphs: [
          'Ceiling-mounted exhaust fans are the most common in bathroom renovations. They pull air up through the ceiling and duct it outside. Wall-mounted fans are used when ducting through the ceiling is not practical, typically in apartments or single-storey homes with limited roof space.',
          'Combination units with a fan, heat lamp and LED light are popular in Sydney bathrooms because they handle ventilation, warmth and lighting from one ceiling point. They suit compact rooms where ceiling space is limited.',
          'Inline fans sit in the duct run rather than in the ceiling and are quieter at the grille. They suit ensuites next to a bedroom where fan noise matters.',
        ],
      },
      {
        heading: 'How to size the fan for the room',
        paragraphs: [
          'A fan is rated in litres per second (L/s). The minimum code requirement is 25 L/s, but a fan that only just meets the minimum may not clear steam fast enough in a room with a large shower or poor airflow.',
          'A practical rule: for a standard bathroom up to about eight square metres, a fan rated at 40 to 50 L/s handles the moisture load well. Larger rooms, rooms with a freestanding bath and a shower, or rooms with no window benefit from a higher-capacity fan or a second extraction point.',
          'The duct run matters too. Every bend in the duct reduces airflow. A short, straight run to the outside delivers more extraction than a long, winding path through the roof — even with the same fan.',
        ],
      },
      {
        heading: 'Ducting mistakes that cause problems',
        paragraphs: [
          'The most common mistake is venting the exhaust into the roof cavity instead of outside. This is not compliant with the NCC and causes real damage: moisture accumulates in the roof space, condensation forms on the underside of the roof sheeting, and the timber framing absorbs water over months and years.',
          'Flexible duct that sags or has unnecessary bends restricts airflow and collects condensation inside the duct. Rigid or semi-rigid duct, properly supported with a slight fall toward the outside, performs better and lasts longer.',
          'A fan connected to duct that is too small for its capacity will be noisy and underperform. The fan manufacturer specifies the duct diameter — match it.',
        ],
      },
      {
        heading: 'When should the fan run?',
        paragraphs: [
          'The fan should run during every shower and for at least 15 to 20 minutes after the shower stops. A timer switch or a humidity-sensing switch handles this automatically so the fan runs long enough to clear the moisture without relying on someone remembering to leave it on.',
          'A fan wired directly to the light switch turns off the moment the light goes off, which is usually too soon. A run-on timer is a small addition during the electrical rough-in and makes a measurable difference to how well the room dries.',
        ],
      },
      {
        heading: 'What ETR does about ventilation',
        paragraphs: [
          'Ventilation is scoped at the on-site measure, before the quote is written. We confirm whether the room has natural ventilation, what exhaust capacity the room needs, and where the duct run will go. The electrical rough-in includes the fan wiring and any timer or humidity switch.',
          'Every bathroom is waterproofed to AS 3740 with a compliance certificate, and the ventilation is part of the same moisture-management approach — keeping water out of the structure and moving damp air out of the room.',
          'A free on-site measure anywhere in Sydney is the right starting point.',
        ],
      },
    ],
    faq: [
      {
        question: 'Is an exhaust fan required by law in a bathroom in Sydney?',
        answer: 'If the bathroom has no openable window, or the window does not meet the minimum size requirement under the NCC, a mechanical exhaust fan is mandatory. In practice, most renovations include a fan regardless because it provides more reliable moisture removal than a window alone.',
      },
      {
        question: 'Can I vent the exhaust fan into the roof cavity?',
        answer: 'No. The NCC requires exhaust air to discharge directly to outside. Venting into the roof cavity moves the moisture problem into the roof structure, where it causes condensation, timber rot and insulation damage over time.',
      },
      {
        question: 'How long should a bathroom exhaust fan run after a shower?',
        answer: 'At least 15 to 20 minutes after the shower stops, to clear the remaining moisture. A run-on timer or humidity-sensing switch handles this automatically and is a small addition during the electrical rough-in.',
      },
      {
        question: 'What size exhaust fan do I need for my bathroom?',
        answer: 'The NCC minimum is 25 litres per second, but 40 to 50 L/s is more practical for a standard bathroom with a shower. Larger rooms or rooms with no window benefit from a higher-capacity fan. The duct run length and number of bends also affect how much air the fan actually moves.',
      },
      {
        question: 'Does a bathroom with a window still need an exhaust fan?',
        answer: 'Legally, a window that meets the minimum opening size can satisfy the ventilation requirement on its own. Practically, most people do not leave the window open in cold or wet weather, so an exhaust fan gives the room a more consistent moisture-removal path.',
      },
    ],
  },
  {
    slug: 'heritage-bathroom-renovation-sydney',
    title: 'Renovating a bathroom in a heritage or older Sydney home',
    metaTitle: 'Heritage Bathroom Renovation Sydney',
    description: 'What changes when the bathroom is in a heritage-listed terrace, a Federation home or an older house — approvals, structure, services and design decisions.',
    published: '2026-10-02',
    readTime: '5 min read',
    category: 'Planning and cost',
    heroProject: { slug: 'the-rocks-bathroom' },
    sections: [
      {
        heading: 'What makes a heritage bathroom renovation different',
        paragraphs: [
          'An older home brings conditions that a newer house does not. The wall framing may be hardwood, the drainage may be original clay or cast iron, the floor may sit on timber over a subfloor rather than a slab, and there may be services — lead pipe, galvanised water lines, asbestos sheeting — that need to be dealt with once the room is opened up.',
          'If the home is heritage-listed or sits in a heritage conservation area, there are also approval requirements that do not apply to other renovations. The good news is that most internal bathroom work in an older home does not need heritage consent. The complexity is in the structure and services, not the paperwork.',
        ],
      },
      {
        heading: 'Heritage listing vs heritage conservation area',
        paragraphs: [
          'A heritage-listed property is individually listed on the NSW Heritage Register or a local council schedule because of its specific significance. A heritage conservation area (HCA) protects the character of a streetscape or precinct — the rules apply to external changes that affect how the area reads from the street.',
          'The distinction matters for bathroom work. In most cases, a like-for-like internal bathroom renovation — same footprint, same wet area, no structural walls moved — does not need heritage consent under either listing type. Changes that alter the external appearance of the building, move structural walls, or affect heritage-significant internal features may need a heritage impact statement and council approval.',
          'We check this at the on-site measure so the approval position is clear before the scope is fixed and the quote is written.',
        ],
      },
      {
        heading: 'What you usually find behind the walls',
        paragraphs: [
          'Older Sydney homes — Federation terraces, inter-war semis, California bungalows, post-war fibro — share a common pattern: the bathroom was often added or last renovated decades ago, and the services behind the walls reflect that era.',
          'Clay drainage lines crack and sag over time. Galvanised water pipes corrode internally and restrict flow. Lead supply lines are still found in some pre-1950s homes. Asbestos-containing materials — fibro sheeting, vinyl flooring, pipe lagging — are common in homes built or renovated before the mid-1980s.',
          'None of this is unusual, and a licensed builder who works on older homes expects it. The important thing is that the quote accounts for what is likely to be found at strip-out rather than treating it as a surprise variation.',
        ],
      },
      {
        heading: 'Structural and waterproofing considerations',
        paragraphs: [
          'A bathroom on a timber floor needs careful preparation before waterproofing. The membrane cannot bridge movement in the subfloor, so the substrate may need to be stiffened, re-sheeted or reinforced before the membrane goes down. This is standard practice on older homes but adds a step that a slab-on-ground bathroom does not need.',
          'Wall framing in older homes is often irregular. Stud spacing, plumb and level can vary, and the framing may need to be packed or re-lined before tiles go on. This is part of the preparation scope, not a defect — it is how these houses were built.',
          'Every bathroom we renovate is waterproofed to AS 3740 and issued a compliance certificate, regardless of the age of the home.',
        ],
      },
      {
        heading: 'Designing a bathroom that suits the house',
        paragraphs: [
          'A heritage home does not need a heritage-themed bathroom. What it needs is a bathroom that does not fight the character of the house. The proportions, ceiling height, natural light and architectural language of the home should influence the design — not dictate it.',
          'A freestanding bath, a frameless shower and contemporary fittings can sit comfortably in a Federation terrace if the scale and material palette are considered. Our Rocks project is an example: large-format wall tiles, encaustic-look floor tiles, matte black fittings and a freestanding bath sit around the original heritage leadlight window.',
          'Period-style fixtures — pedestal basins, exposed-pipe showers, high-level cisterns — are one approach, but they are not the only one. A clean, modern bathroom that respects the room proportions often ages better than a pastiche of heritage details.',
        ],
      },
      {
        heading: 'Common design choices in older-home bathrooms',
        paragraphs: [
          'Subway tiles and hexagonal mosaics reference historical tile formats without committing to a full period reproduction. They work as well in a 1920s bungalow as in a contemporary apartment.',
          'Freestanding baths suit rooms with higher ceilings and enough floor area. In a compact bathroom, a built-in bath or a walk-in shower makes better use of the space.',
          'Timber vanities or vanities with a timber shelf bring warmth to a tiled room and suit the material palette of most older Sydney homes. Brushed brass and champagne gold fittings complement warm-toned timber and stone without looking out of place in a period home.',
        ],
      },
      {
        heading: 'Cost considerations for older homes',
        paragraphs: [
          'A bathroom renovation in an older home can cost more than the same scope in a newer house, and the difference is almost always in the preparation — not the finishes. Replacing old services, reinforcing a timber floor, removing asbestos-containing materials, and bringing the substrate to a state where it can be waterproofed and tiled all add labour and time.',
          'The best way to manage this is to allow for it in the scope from the start. A quote that assumes the best case behind the walls is a quote that will change at strip-out. We walk through what is likely during the on-site measure and price accordingly.',
          'ETR\'s packages start from $18,000 for a Basic renovation in a small bathroom. Older homes more commonly fall into the Standard (from $25,000) or Premium (from $30,000) range because of the preparation work involved.',
        ],
      },
      {
        heading: 'How ETR handles older and heritage homes',
        paragraphs: [
          'The on-site measure covers the approval position, the likely condition of services and structure behind the walls, and the design direction. The written quote names the scope, the inclusions and how unexpected finds at strip-out are handled — before work starts, not after.',
          'Adam Dawood has over 25 years of experience in tiling and project management, and the team works on older Sydney homes regularly. The Rocks heritage bathroom, the Hunters Hill marble bathroom and the Artarmon bathroom-and-ensuite are all completed projects in established homes.',
          'Every bathroom is waterproofed to AS 3740 with a compliance certificate, carried out under NSW Builder Licence 475204C, and covered by a 10-year workmanship warranty. A free on-site measure anywhere in Sydney is the starting point.',
        ],
      },
    ],
    faq: [
      {
        question: 'Do I need council approval to renovate a bathroom in a heritage-listed home?',
        answer: 'A like-for-like internal bathroom renovation — same footprint, no structural walls moved, no changes to the building exterior — usually does not need heritage consent. Changes that alter the outside of the building or affect heritage-significant internal features may need approval. We check the approval position at the on-site measure.',
      },
      {
        question: 'Does a heritage bathroom renovation cost more than a standard one?',
        answer: 'It can. The difference is usually in the preparation — replacing old services, reinforcing timber floors, removing asbestos-containing materials and bringing the substrate to a tiling-ready state. The finishes themselves cost the same. Allowing for this in the quote from the start avoids surprise variations.',
      },
      {
        question: 'Can I put a modern bathroom in a Federation or Victorian home?',
        answer: 'Yes. A clean, modern bathroom that respects the room proportions and material palette of the house can work very well. A contemporary design does not have to fight the character of the home — our Rocks project combines large-format tiles, matte black fittings and a freestanding bath around an original heritage window.',
      },
      {
        question: 'What happens if asbestos is found during strip-out?',
        answer: 'Asbestos-containing materials are common in homes built or renovated before the mid-1980s. Licensed removal is required and is a regulated process. The written quote sets out how unexpected finds like asbestos are handled before work starts.',
      },
      {
        question: 'Do you work on bathrooms in heritage conservation areas on the North Shore and Inner West?',
        answer: 'Yes. We renovate bathrooms in heritage and Federation-era homes across Sydney, including the large heritage conservation areas in the Ku-ring-gai suburbs and the Inner West. Every bathroom is waterproofed to AS 3740 with a certificate, and the written quote accounts for the conditions typical of older housing stock.',
      },
    ],
  },
  {
    slug: 'walk-in-shower-vs-bathtub-renovation',
    title: 'Walk-in shower vs bathtub: how to choose during a bathroom renovation',
    metaTitle: 'Walk-In Shower vs Bathtub Renovation',
    description: 'How to decide between a walk-in shower and a bathtub when you are renovating — what suits your space, your household and your resale position.',
    published: '2026-10-02',
    readTime: '4 min read',
    category: 'Planning and cost',
    sections: [
      {
        heading: 'Why this decision matters more than most fixture choices',
        paragraphs: [
          'The shower-or-bath question is one of the first layout decisions in a bathroom renovation and one of the hardest to change later. It sets the floor plan, the plumbing positions, the waterproofing footprint and the way the room feels to use every day.',
          'There is no universally right answer. The choice depends on who uses the room, how much space you have, whether you plan to sell, and what you actually do in the bathroom on a weekday morning.',
        ],
      },
      {
        heading: 'When a walk-in shower makes the most sense',
        paragraphs: [
          'A walk-in shower suits bathrooms where space is tight, access needs to be easy, or the household simply does not use a bath. In a compact room — say 1.5 by 2.4 metres — removing the bath and fitting a full-width shower opens the floor plan and gives more room to move.',
          'Walk-in showers are also the stronger choice for accessibility. A curbless entry, a built-in seat and grab bars make the room safer for older adults and anyone with limited mobility. If you are planning to stay in the home long term, this is worth considering now rather than retrofitting later.',
          'From a cleaning standpoint, a frameless glass shower with wall-to-wall tiling is simpler to maintain than a bath surround with grout joints, silicone seals and hard-to-reach corners.',
        ],
      },
      {
        heading: 'When a bathtub still adds value',
        paragraphs: [
          'If there are young children in the home, a bath is practical — bathing a toddler in a shower is awkward at best. Families with children under five or six generally benefit from keeping at least one bath in the house.',
          'A freestanding bath in a larger bathroom can also serve as a design centrepiece. In rooms with higher ceilings and enough floor area, the bath anchors the space and adds a sense of proportion that a shower alone does not.',
          'For resale, the general guidance is to keep at least one bathtub in a family home. Buyers with children expect it, and removing every bath from a three- or four-bedroom house can narrow the buyer pool. If the home has two bathrooms, converting one to a walk-in shower while keeping the bath in the other is a common and practical split.',
        ],
      },
      {
        heading: 'Space and layout considerations',
        paragraphs: [
          'A standard bath takes up roughly 1,700 by 750 millimetres of floor space. A walk-in shower can work in a smaller footprint — as little as 900 by 900 millimetres, though 1,000 by 1,200 or wider is more comfortable.',
          'In a bathroom under four square metres, the bath often dominates the room and leaves little space for the vanity and toilet. Replacing it with a shower and reclaiming that floor area can make the whole room feel larger and more functional.',
          'Layout also affects plumbing. Moving the waste position from a bath to a shower (or vice versa) is straightforward in a full renovation where the floor is being stripped and re-waterproofed, but it adds cost if you are trying to do it as a standalone job.',
        ],
      },
      {
        heading: 'What about a shower-over-bath?',
        paragraphs: [
          'A shower-over-bath is the compromise most Australians grew up with. It gives you both options in one footprint, which matters when the bathroom is too small for separate fixtures.',
          'The trade-off is that neither function works as well as a dedicated version. The shower screen is usually a single panel rather than a full enclosure, water hits the bath surround at an angle, and stepping over the bath edge is less accessible than a curbless shower entry.',
          'If the room genuinely cannot fit both a separate shower and a bath, a shower-over-bath is a reasonable solution. If it can, dedicated fixtures will feel better to use and look cleaner.',
        ],
      },
      {
        heading: 'Cost difference between a shower and a bath',
        paragraphs: [
          'In a full renovation where the room is stripped back anyway, the cost difference between installing a walk-in shower and installing a bath is mostly in the fixtures and the tiling area, not in the labour or waterproofing — both need a compliant membrane either way.',
          'A freestanding bath adds the cost of the bath itself (typically $800 to $3,000 depending on material and brand) plus the floor waste and mixer. A walk-in shower adds the cost of the shower screen (a frameless panel runs $600 to $1,500 installed), the showerhead and mixer, and any niche or seat tiling.',
          'The layout decision should be made before the quote, because it affects the floor plan, the tile quantities and the plumbing positions. ETR\'s packages start from $18,000 for a Basic renovation in a small bathroom, and the fixture choice is part of the selections process.',
        ],
      },
      {
        heading: 'How to decide',
        paragraphs: [
          'Ask four questions. Does anyone in the household need or regularly use a bath? Is this the only bathroom in the home? Are you planning to sell within a few years? Is the room large enough to fit both comfortably?',
          'If nobody uses the bath and the home has more than one bathroom, a walk-in shower is usually the better use of the space. If young children are in the picture or resale is the priority in a single-bathroom home, keep the bath.',
          'The on-site measure is the right time to work through this. The room dimensions, the plumbing positions and the household\'s actual use all feed into the decision, and the written scope locks it in before work starts.',
        ],
      },
    ],
    faq: [
      {
        question: 'Does removing a bathtub hurt resale value?',
        answer: 'It can, if the home has no other bath. Families with young children generally expect at least one bathtub. If the home has two or more bathrooms, converting one to a walk-in shower while keeping the bath elsewhere is a common approach that suits both accessibility and resale.',
      },
      {
        question: 'Is a walk-in shower cheaper than a bathtub in a renovation?',
        answer: 'In a full renovation, the cost difference is mostly in the fixtures and tiling area. A freestanding bath and a frameless shower screen are in a similar price range. The bigger cost factors are the room size, tile selection and plumbing positions, not the shower-versus-bath choice alone.',
      },
      {
        question: 'Can I fit both a shower and a bath in a small bathroom?',
        answer: 'It depends on the room dimensions. A shower-over-bath fits both into one footprint but compromises both functions. Separate fixtures need a room of roughly six square metres or more to work comfortably without feeling cramped.',
      },
      {
        question: 'Are walk-in showers better for older adults?',
        answer: 'Generally, yes. A curbless entry, a built-in seat and grab bars make the room safer and easier to use. If you are planning to age in place, a walk-in shower is the more practical long-term choice.',
      },
      {
        question: 'When should I decide between a shower and a bath?',
        answer: 'Before the quote is written. The choice affects the floor plan, plumbing positions, tile quantities and waterproofing layout. At ETR, this is settled during the on-site measure so the written scope reflects the agreed layout.',
      },
    ],
  },
  {
    slug: 'bathroom-renovation-budget-planning',
    title: 'How to budget for a bathroom renovation without blowing it',
    metaTitle: 'Bathroom Renovation Budget Planning',
    description: 'A practical approach to setting and holding a bathroom renovation budget — what costs to expect, where overruns happen, and how a written scope prevents surprises.',
    published: '2026-10-02',
    readTime: '4 min read',
    category: 'Planning and cost',
    sections: [
      {
        heading: 'Why bathroom budgets blow out',
        paragraphs: [
          'The most common reason a bathroom renovation costs more than expected is that the scope was not clear before work started. An approximate quote based on a phone call or a rough sketch leaves room for assumptions on both sides, and those assumptions show up as variations once the walls are open.',
          'The second most common reason is a change of mind mid-build. Upgrading tiles after they have been ordered, moving a toilet position after the plumbing rough-in, or adding a heated towel rail after the electrical is done all add cost because they undo work that has already been completed.',
          'A fixed-scope written quote that names every inclusion, and a selections process that locks in materials before site work begins, are the two most effective budget controls available to a homeowner.',
        ],
      },
      {
        heading: 'Start with how much you can spend, not how much it costs',
        paragraphs: [
          'Work out what you can afford before you start comparing quotes. A bathroom renovation in Sydney typically ranges from $18,000 to $50,000 or more, depending on the room size, the scope and the finish level. That is a wide range, and trying to price a bathroom without a budget is like shopping without knowing what is in your account.',
          'A common guideline is to keep the renovation cost within five to ten percent of the property value. For a home worth $1.2 million, that suggests a bathroom budget of $60,000 to $120,000 across all wet areas — not per room. If the home is worth $800,000, the range is tighter.',
          'The budget should include a contingency of 10 to 15 percent. This is not padding — it is a realistic allowance for what may be found behind the walls, especially in older homes.',
        ],
      },
      {
        heading: 'Where the money goes',
        paragraphs: [
          'In a typical full bathroom renovation, labour and trades account for roughly 40 to 50 percent of the total cost. This covers demolition, plumbing, electrical, waterproofing, tiling and installation of fixtures. Materials — tiles, adhesives, membranes, cement sheet — make up 15 to 20 percent.',
          'Fixtures and fittings — the vanity, tapware, toilet, shower screen, mirror, towel rails — account for 25 to 35 percent. This is where the finish level has the biggest impact. A basic vanity and chrome tapware cost a fraction of a stone-top vanity with brushed brass fittings.',
          'The remaining 10 to 15 percent is contingency. In practice, this covers the things that only become visible at strip-out: old plumbing that needs replacing, water damage in the subfloor, or non-compliant waterproofing from the previous renovation.',
        ],
      },
      {
        heading: 'How to compare quotes without being misled',
        paragraphs: [
          'The cheapest quote is not always the cheapest renovation. A low quote that excludes items the others include will cost the same or more once the variations are added. The question is not "which quote is lowest" but "which quote includes the most for what I need."',
          'Ask each renovator to itemise what is included: demolition, disposal, plumbing, electrical, waterproofing, tiling, fixtures, painting, clean-up. If an item is missing from one quote, it does not mean it is free — it means it will be an extra.',
          'Check whether the quote is fixed or provisional. A fixed-scope quote names the price for a defined set of inclusions. A provisional quote estimates costs that may change. Both are legitimate, but they manage risk differently, and you need to know which one you are signing.',
        ],
      },
      {
        heading: 'Selections: lock them in early',
        paragraphs: [
          'Tiles, tapware, the vanity, the toilet, the shower screen, lighting — all of these should be selected and confirmed before the renovation starts. Changing a selection after the build is underway almost always adds cost, because it changes the scope that the quote was based on.',
          'If you are unsure about a selection, say so during planning. A good renovator will walk you through the options within your budget and help you finalise choices before the contract is signed.',
          'ETR\'s written quote ties the selections to the scope and the price. If a selection changes, the price adjustment is clear and agreed before the work is affected.',
        ],
      },
      {
        heading: 'Where to spend and where to save',
        paragraphs: [
          'Spend on waterproofing, plumbing and the things you cannot see or reach once the room is finished. These are the items that cause expensive problems if they fail, and the cost difference between adequate and good is small compared to the cost of fixing them later.',
          'Spend on the fixtures you touch every day: the showerhead, the tapware, the toilet flush. Cheap fittings feel cheap every morning.',
          'Save on decorative items that are easy to change later: towel rails, mirrors, accessories, paint colour. These can be upgraded without opening a wall. Save on tile upgrades that add visual complexity without adding durability — a well-laid neutral tile lasts as long as an expensive pattern tile and dates less.',
        ],
      },
      {
        heading: 'How a written scope prevents surprises',
        paragraphs: [
          'The single most effective way to hold a bathroom renovation budget is a written scope that names every inclusion, every exclusion, every allowance and every condition. If it is in the scope, it is in the price. If it is not in the scope, it is not in the price.',
          'A written scope also names how unexpected finds are handled — what happens if the plumber finds corroded pipes, or the tiler finds water damage in the substrate. The best time to agree on this is before the contract is signed, not when the builder is standing in a half-demolished bathroom.',
          'ETR provides a fixed-scope written quote after the free on-site measure. The quote separates the inclusions, the exclusions and the process for handling anything found at strip-out. The price is the price unless the scope changes.',
        ],
      },
    ],
    faq: [
      {
        question: 'How much should I budget for a bathroom renovation in Sydney?',
        answer: 'A full bathroom renovation in Sydney typically costs between $18,000 and $50,000 depending on the room size, scope and finish level. ETR\'s packages start from $18,000 for a Basic renovation in a small bathroom, from $25,000 for Standard and from $30,000 for Premium. Include a contingency of 10 to 15 percent for what may be found behind the walls.',
      },
      {
        question: 'What is the biggest cause of bathroom renovation cost overruns?',
        answer: 'An unclear scope. When the quote does not name every inclusion, assumptions on both sides show up as variations once work is underway. A fixed-scope written quote and finalised selections before site work starts are the two most effective budget controls.',
      },
      {
        question: 'Should I get three quotes for a bathroom renovation?',
        answer: 'Getting two or three quotes is reasonable, but compare what is included, not just the total. A lower quote that excludes items the others include will cost the same or more once the extras are added. Ask each renovator to itemise their inclusions.',
      },
      {
        question: 'What percentage of home value should a bathroom renovation cost?',
        answer: 'A common guideline is five to ten percent of the property value across all wet areas. This helps avoid overcapitalising — spending more on the renovation than it adds to the home\'s value.',
      },
      {
        question: 'Where should I spend more and where should I save in a bathroom renovation?',
        answer: 'Spend on waterproofing, plumbing and the fixtures you use every day — showerhead, tapware, toilet. Save on decorative items you can upgrade later without opening a wall: mirrors, towel rails, accessories and paint colour.',
      },
    ],
  },
  {
    slug: 'bathroom-renovation-resale-value-what-agents-look-for',
    title: 'Bathroom renovation and resale: what agents actually look for',
    metaTitle: 'Bathroom Renovation Resale Value',
    description: 'What real estate agents notice in a bathroom when they appraise a home, what buyers care about, and how to renovate for resale without overcapitalising.',
    published: '2026-10-02',
    readTime: '4 min read',
    category: 'Planning and cost',
    sections: [
      {
        heading: 'Why the bathroom matters at sale time',
        paragraphs: [
          'Real estate agents consistently name the bathroom as one of the first rooms buyers inspect — and one of the fastest to form a negative impression. A dated, worn or poorly maintained bathroom signals potential problems behind the walls: failed waterproofing, old plumbing, hidden mould. Buyers price that risk in, even if the problems are only assumed.',
          'A well-finished bathroom does the opposite. It signals that the home has been maintained, that the owner invested in the parts that matter, and that the buyer can move in without planning an immediate renovation.',
        ],
      },
      {
        heading: 'What agents actually notice',
        paragraphs: [
          'Agents assess a bathroom quickly, and they are looking at condition more than style. Grout that is clean and intact, silicone that is not discoloured, tapware that works smoothly, a shower screen without water marks, tiles that are not cracked — these are the things that register in the first 30 seconds.',
          'Beyond condition, agents look at whether the bathroom feels current. That does not mean it has to follow the latest trend. It means the fixtures, tiles and layout do not immediately read as 20 years old. A neutral, well-maintained bathroom from five years ago still presents well. A bathroom with pink tiles, a brass-finish mixer and a corner spa bath does not.',
          'The third thing agents notice is layout efficiency. A bathroom that fits a shower, vanity and toilet into a functional arrangement feels practical. A bathroom where the door hits the vanity, the toilet faces the entrance, or the shower has no screen feels compromised.',
        ],
      },
      {
        heading: 'What buyers care about',
        paragraphs: [
          'Buyers want a bathroom they do not have to think about. If it looks clean, feels modern enough and works properly, it passes. If it looks like it needs work, they start calculating the cost of fixing it — and that number is always higher in a buyer\'s head than it would be in reality.',
          'Family buyers specifically look for a bath (at least one in the home), enough storage for toiletries, and a bathroom that is separate from the main living area. Downsizers and couples are more likely to value a walk-in shower, a double vanity, and a sense of space.',
          'Almost no buyer cares whether the tiles are porcelain or ceramic, or whether the tapware is a specific brand. They care whether the room feels maintained, works well and does not need immediate attention.',
        ],
      },
      {
        heading: 'Renovating for resale vs renovating for yourself',
        paragraphs: [
          'The distinction matters. If you are renovating to sell within 12 months, the goal is a bathroom that appeals to the broadest range of buyers without overspending. Neutral tiles, clean finishes, standard-quality fixtures and a sensible layout do the job. Bold design choices — pattern tiles, statement colours, unusual layouts — narrow the buyer pool.',
          'If you are renovating for yourself and plan to stay for five or more years, you have more room to personalise. The resale consideration is still there, but it should not override how you want to live in the room.',
          'The mistake most people make when renovating for resale is spending too much on the finish level. A $50,000 bathroom in a $900,000 home does not return its cost. A $25,000 bathroom in the same home almost certainly does.',
        ],
      },
      {
        heading: 'How to avoid overcapitalising',
        paragraphs: [
          'The five-to-ten-percent guideline — keeping the total renovation spend within that range of the property value — is a useful starting point. For a home worth $1 million, that means $50,000 to $100,000 across all wet areas, not per room.',
          'Match the finish level to the suburb. A brushed brass, stone-top, wall-hung vanity is the right call in Mosman. In a first-home suburb, a well-made standard vanity with engineered-stone top does the same job for resale at a fraction of the cost.',
          'Do not skip the things that matter structurally. Waterproofing, plumbing and electrical are not resale luxuries — they are the parts that protect the home and avoid future claims. The money saved by cutting corners here is the money spent fixing water damage later.',
        ],
      },
      {
        heading: 'The finishes that return the most at resale',
        paragraphs: [
          'Large-format neutral tiles on walls and floors. They are easy to maintain, they suit most taste profiles and they make the room feel larger. A 600 by 300 or 600 by 600 tile in a warm white or light grey reads as current without being trendy.',
          'A frameless shower screen. It signals a modern renovation and makes the room feel open, even in a small bathroom. The cost is modest relative to its visual impact.',
          'Consistent tapware in a single finish — chrome, matte black or brushed nickel. Mismatched finishes read as piecemeal, and a consistent finish reads as planned.',
          'A vanity with storage. Floating vanities look clean, but a vanity that hides bottles, towels and cleaning supplies keeps the room presentable for inspections and open homes.',
        ],
      },
      {
        heading: 'What ETR recommends for resale renovations',
        paragraphs: [
          'At the on-site measure, we ask whether the renovation is for resale or long-term use, because it changes the selections guidance. A resale renovation prioritises broad appeal, neutral finishes and cost control. A long-term renovation can take more design risk.',
          'ETR\'s Standard package (from $25,000) covers the scope that most resale renovations need: a full strip-out, new plumbing, electrical, waterproofing to AS 3740, tiling, and mid-range fixtures. The written quote names every inclusion so the budget is fixed before work starts.',
          'A free on-site measure anywhere in Sydney is the right starting point.',
        ],
      },
    ],
    faq: [
      {
        question: 'How much value does a bathroom renovation add to a home?',
        answer: 'A mid-range bathroom renovation typically returns 60 to 80 percent of its cost at resale. The exact figure depends on the suburb, the condition of the existing bathroom and the finish level of the renovation. Overcapitalising — spending more than the market will return — is the main risk.',
      },
      {
        question: 'What bathroom features do buyers care about most?',
        answer: 'Buyers care about condition and functionality more than specific brands or materials. A clean, well-maintained bathroom with a sensible layout, working fixtures and neutral finishes passes the test. A dated or damaged bathroom raises concerns about hidden problems.',
      },
      {
        question: 'Should I renovate the bathroom before selling my house?',
        answer: 'If the bathroom is visibly dated, damaged or in poor condition, a renovation usually improves the sale price more than it costs. If the bathroom is already in reasonable condition, a deep clean and minor repairs may be enough. An agent can help assess whether a renovation will pay for itself.',
      },
      {
        question: 'What is the best colour for a bathroom when selling?',
        answer: 'Warm neutrals — white, light grey, greige, taupe — appeal to the broadest range of buyers. Avoid bold or polarising colours on permanent surfaces like tiles. Keep colour in items that are easy to change: towels, accessories and paint.',
      },
      {
        question: 'How much should I spend on a bathroom renovation for resale?',
        answer: 'A common guideline is five to ten percent of the property value across all wet areas. Match the finish level to the suburb and the buyer profile. A $25,000 renovation in a million-dollar home is a strong return. A $50,000 renovation in the same home may not be.',
      },
    ],
  },
  {
    slug: 'bathroom-demolition-what-to-expect',
    title: 'What happens during bathroom demolition? A step-by-step guide',
    metaTitle: 'Bathroom Demolition Process',
    description: 'What actually happens when a bathroom renovation starts — the demolition process, how long it takes, what to prepare for, and what the builder is looking for behind the walls.',
    published: '2026-10-02',
    readTime: '4 min read',
    category: 'Planning and cost',
    sections: [
      {
        heading: 'Demolition is the first real step',
        paragraphs: [
          'For most homeowners, demolition day is the first time the renovation feels real. The old bathroom goes from a room you use every day to a stripped-back shell in a matter of hours. It is noisy, dusty and fast — and it is also when the builder gets the first clear look at what is actually behind the walls and under the floor.',
          'Understanding what happens during demolition, and why, takes the anxiety out of the process. The work follows a logical sequence, and every step has a reason.',
        ],
      },
      {
        heading: 'Before the first tile comes off',
        paragraphs: [
          'The plumber isolates the water supply to the bathroom and caps the feeds. The electrician disconnects any hardwired fixtures — exhaust fans, heat lamps, heated towel rails — and makes the circuits safe. This happens before anything is removed.',
          'If the bathroom is in a unit or apartment, the strata or body corporate may need to be notified, and water shutoff may affect common services. This is sorted before demo day, not on it.',
          'The rest of the home is protected with drop sheets and plastic barriers at the bathroom door. Dust is the main concern — tile removal generates fine powder that travels further than most people expect.',
        ],
      },
      {
        heading: 'The demolition sequence',
        paragraphs: [
          'Fixtures come out first: the vanity, mirror, toilet, shower screen and any accessories. These are disconnected and removed before tile demolition begins.',
          'If there is a bath, it comes out next. A freestanding bath lifts out. A built-in bath may need to be cut or broken to remove, depending on the material and how it was installed.',
          'Wall tiles are stripped using a combination of electric demolition hammers and hand tools. The goal is to remove the tiles and the adhesive bed cleanly, exposing the substrate — usually cement sheet or fibre cement board. In some older homes, the substrate is plaster or brick, and the approach changes accordingly.',
          'Floor tiles follow the same process. The screed — the sand-and-cement layer under the tiles — is also removed to expose the structural floor, whether that is a concrete slab or timber framing. The old waterproofing membrane comes off with the screed.',
        ],
      },
      {
        heading: 'What the builder is looking for',
        paragraphs: [
          'Demolition is also an inspection. Once the surfaces are stripped, the builder, plumber and tiler can see the actual condition of the structure, the plumbing and the waterproofing for the first time.',
          'Common findings include: corroded galvanised or copper pipes, cracked or sagging clay drainage, water damage in the timber subfloor or framing, previous waterproofing that was patched rather than properly applied, and — in homes built or renovated before the mid-1980s — asbestos-containing materials in the wall or floor linings.',
          'None of these are unusual, and a good quote accounts for the likelihood of finding them. ETR\'s written scope names how unexpected finds at strip-out are handled before work starts.',
        ],
      },
      {
        heading: 'Asbestos: the one that cannot be ignored',
        paragraphs: [
          'Asbestos-containing materials were widely used in Australian homes until the mid-1980s. Fibro wall linings, vinyl floor tiles, pipe lagging and even some adhesives can contain asbestos. You cannot identify asbestos by looking at it — it requires testing.',
          'If suspected asbestos is identified, it must be removed by a licensed asbestos removalist. The material is bagged, labelled and disposed of at a licensed facility. The work area is sealed and the air is monitored. This is a regulated process, not something the builder handles informally.',
          'A pre-demolition asbestos inspection is recommended for any home built before 1990. It is a small cost that avoids a larger problem if asbestos is found mid-demolition.',
        ],
      },
      {
        heading: 'How long demolition takes',
        paragraphs: [
          'A standard bathroom strip-out — fixtures, tiles, screed, old waterproofing — takes one to two days. A simple fixture-and-tile removal in a small bathroom can be done in a single day. A full gut-out including wall linings, substrate removal and any structural investigation takes two.',
          'The waste from a bathroom demolition is typically one to two cubic metres — enough to fill a small skip bin. The skip is arranged before demo day and removed once the room is cleared.',
        ],
      },
      {
        heading: 'What happens after demolition',
        paragraphs: [
          'Once the room is stripped, the preparation phase begins. The plumber roughs in the new pipe positions, the electrician runs new wiring, and any substrate repair — re-sheeting walls, levelling the floor, reinforcing timber framing — is completed.',
          'The room is then ready for waterproofing. The membrane is applied, allowed to cure, and flood-tested before any tiles go on. This is the stage where the new bathroom starts to take shape.',
          'Demolition is not the renovation — it is the clearing away of the old room so the new one can be built properly. Understanding that it is a planned, controlled process makes the noise and disruption easier to manage.',
        ],
      },
      {
        heading: 'How ETR manages demolition',
        paragraphs: [
          'Demolition is part of every full renovation scope. The on-site measure confirms the room condition, the likely findings at strip-out and the waste disposal requirements before the quote is written.',
          'The team manages dust containment, waste removal and services isolation as part of the work. If asbestos is suspected, a testing and removal plan is included in the scope.',
          'Every bathroom is waterproofed to AS 3740 after demolition and preparation, carried out under NSW Builder Licence 475204C, with a 10-year workmanship warranty. A free on-site measure anywhere in Sydney is the starting point.',
        ],
      },
    ],
    faq: [
      {
        question: 'How long does bathroom demolition take?',
        answer: 'One to two days for a standard strip-out. A simple fixture-and-tile removal in a small bathroom can take a single day. A full gut-out with substrate removal and structural inspection takes two.',
      },
      {
        question: 'How much waste does a bathroom demolition produce?',
        answer: 'Typically one to two cubic metres — tiles, screed, fixtures, old linings and packaging. This fits a small skip bin, which is arranged before demo day and removed once the room is cleared.',
      },
      {
        question: 'Will bathroom demolition damage the rest of the house?',
        answer: 'Not if it is managed properly. Drop sheets and plastic barriers are set up at the bathroom door before work starts. Dust from tile removal is the main concern — it travels further than most people expect, so containment matters.',
      },
      {
        question: 'What if asbestos is found during demolition?',
        answer: 'Asbestos-containing materials must be removed by a licensed removalist. The area is sealed, the material is bagged and disposed of at a licensed facility, and the air is monitored. A pre-demolition asbestos inspection is recommended for any home built before 1990.',
      },
      {
        question: 'Can I live in the house during bathroom demolition?',
        answer: 'Yes. Most homeowners stay in the house during a bathroom renovation. You will need access to another bathroom or toilet during the work. The demolition phase is the noisiest part — it typically lasts one to two days, and the noise drops significantly once tiling begins.',
      },
    ],
  },
  {
    slug: 'accessible-bathroom-renovation-sydney',
    title: 'Accessible bathroom renovation: designing for all ages and abilities',
    metaTitle: 'Accessible Bathroom Renovation Sydney',
    description: 'How to design a bathroom that is safe and comfortable for older adults, people with limited mobility, and families planning to stay in their home long term.',
    published: '2026-10-02',
    readTime: '4 min read',
    category: 'Planning and cost',
    sections: [
      {
        heading: 'Why accessibility is a renovation decision, not a retrofit',
        paragraphs: [
          'Most people think about bathroom accessibility only after a fall, an injury or a diagnosis. By that point the bathroom is already built, and retrofitting grab bars, a shower seat or a wider doorway means working around existing tiles, plumbing and framing.',
          'Building accessibility into a renovation from the start costs a fraction of a retrofit and produces a better result. The room is being stripped back and rebuilt anyway — the time to plan for easy, safe use is now, not in five or ten years.',
        ],
      },
      {
        heading: 'What makes a bathroom accessible',
        paragraphs: [
          'Accessibility is not a single feature. It is a combination of layout, entry, fixtures and surfaces that together make the room safe, easy to use and dignified for people of all ages and abilities.',
          'The key elements are: a step-free shower entry (no hob or raised threshold), grab bars at the shower, toilet and bath, a comfort-height toilet (around 460 to 480 millimetres), non-slip floor tiles, adequate circulation space, good lighting, and lever-style tapware that does not require grip strength to operate.',
          'None of these features look clinical or institutional when they are designed into the room properly. A curbless shower with a linear drain, a well-placed grab bar in a matching finish, and a wall-hung vanity at a comfortable height all look like contemporary design choices — because they are.',
        ],
      },
      {
        heading: 'Step-free shower entry',
        paragraphs: [
          'A curbless or hobless shower is the single most important accessibility feature in a bathroom. Stepping over a hob is a fall risk for older adults, and it is impassable for a wheelchair. A step-free entry with a linear drain or a gentle fall to a central waste removes the barrier entirely.',
          'The waterproofing and drainage need to be designed for a curbless shower from the start. The floor fall, the drain position and the shower screen placement all matter. This is straightforward in a full renovation but difficult to add later.',
        ],
      },
      {
        heading: 'Grab bars and structural reinforcement',
        paragraphs: [
          'Grab bars need to be fixed into solid structure — timber blocking or steel plates behind the wall lining. If the blocking is not installed during the renovation, adding grab bars later means opening the wall, which means removing and replacing tiles.',
          'The cost of installing blocking during a renovation is minimal — a few offcuts of timber fixed between studs before the cement sheet goes on. The cost of opening a tiled wall to add it later is significant. This is the clearest example of accessibility being a renovation decision, not a retrofit.',
          'Grab bars are available in finishes that match contemporary tapware — matte black, brushed nickel, brushed brass. They do not have to look like hospital fittings.',
        ],
      },
      {
        heading: 'Toilet height and position',
        paragraphs: [
          'A standard toilet pan sits around 400 to 410 millimetres high. A comfort-height toilet sits at 460 to 480 millimetres — roughly chair height — which makes sitting down and standing up significantly easier for older adults and anyone with hip or knee issues.',
          'The toilet position also matters. Enough clear space beside the toilet (at least 450 millimetres on one side) allows someone to transfer from a wheelchair or use a grab bar for support. This is a layout decision made at the planning stage.',
        ],
      },
      {
        heading: 'Floor surfaces and lighting',
        paragraphs: [
          'Wet tile is a fall hazard regardless of age. A tile with a higher slip resistance rating (P3 or higher for wet barefoot areas) reduces the risk without sacrificing appearance. Many contemporary tiles are available in slip-resistant finishes that look and feel similar to standard tiles.',
          'Good lighting matters for safety and usability. A well-lit room with consistent, shadow-free illumination makes it easier to see edges, steps and surfaces. A night light or low-level LED at floor height helps with overnight use without switching on the main light.',
        ],
      },
      {
        heading: 'Planning for the future without building for a hospital',
        paragraphs: [
          'Universal design is the principle that a room should work well for the widest range of users without looking like it was built for a specific condition. A bathroom designed with universal principles is comfortable for a 30-year-old, safe for a 70-year-old and usable for someone recovering from surgery.',
          'The practical approach is to install the structural provisions now — blocking for grab bars, a curbless shower, a comfort-height toilet, adequate circulation space — and add or adjust the visible features as needs change. The room does not need to look like an aged-care facility to be safe.',
        ],
      },
      {
        heading: 'How ETR approaches accessible bathrooms',
        paragraphs: [
          'At the on-site measure, we discuss how the room is used, who uses it and whether accessibility is a current or future priority. The written scope can include curbless shower entry, grab bar blocking, comfort-height fixtures and non-slip tiling without changing the design language of the room.',
          'Every bathroom is waterproofed to AS 3740 with a compliance certificate, carried out under NSW Builder Licence 475204C, with a 10-year workmanship warranty. A free on-site measure anywhere in Sydney is the right starting point.',
        ],
      },
    ],
    faq: [
      {
        question: 'How much does an accessible bathroom renovation cost in Sydney?',
        answer: 'An accessible bathroom renovation costs about the same as a standard one when the features are designed in from the start. The main additions — curbless shower, grab bar blocking, comfort-height toilet, non-slip tiles — add modest cost during a full renovation. ETR\'s packages start from $18,000 for a Basic renovation.',
      },
      {
        question: 'Can I make my bathroom accessible without it looking clinical?',
        answer: 'Yes. Grab bars come in finishes that match contemporary tapware. A curbless shower looks like a modern design choice. A comfort-height toilet is visually identical to a standard one. The accessibility is in the design, not in the appearance.',
      },
      {
        question: 'What is the most important accessibility feature in a bathroom?',
        answer: 'A step-free shower entry. It removes the biggest fall risk, makes the room wheelchair-accessible and is the hardest feature to add after the bathroom is built. If you do one accessibility upgrade during a renovation, this is it.',
      },
      {
        question: 'Should I install grab bars now or wait until I need them?',
        answer: 'Install the blocking now and add the bars when needed. Blocking is a few offcuts of timber fixed behind the wall during the renovation — it costs almost nothing. Adding it later means opening a tiled wall, which is expensive and disruptive.',
      },
      {
        question: 'Does an accessible bathroom affect resale value?',
        answer: 'Universal design features generally help rather than hurt resale value. They broaden the buyer pool to include older buyers, people with disabilities and families planning long-term. A well-designed accessible bathroom looks contemporary, not clinical.',
      },
    ],
  },
  {
    slug: 'apartment-bathroom-renovation-vs-house',
    title: 'Apartment bathroom renovation vs house: what changes',
    metaTitle: 'Apartment vs House Bathroom Renovation',
    description: 'The practical differences between renovating a bathroom in an apartment and a house — strata approvals, shared plumbing, noise rules, access and cost.',
    published: '2026-10-02',
    readTime: '4 min read',
    category: 'Planning and cost',
    sections: [
      {
        heading: 'The biggest difference is who else is involved',
        paragraphs: [
          'In a house, the renovation is between you and the builder. In an apartment, it involves the strata committee, the building manager, and sometimes the neighbours. The building has shared structure, shared plumbing and rules that govern when and how work can be done.',
          'This does not make apartment bathroom renovations harder — it makes them different. The scope of work is often simpler (smaller rooms, fewer layout options), but the approval, access and scheduling requirements add steps that a house renovation does not need.',
        ],
      },
      {
        heading: 'Strata approval: what you need and when',
        paragraphs: [
          'In NSW, strata renovations are classified as cosmetic, minor or major. A bathroom renovation is almost always minor or major because it involves waterproofing, which affects common property (the slab or the membrane below the tile bed).',
          'Minor renovations need approval from the strata committee — a majority vote is enough. Major renovations, which include structural changes and waterproofing work, need a special resolution at a general meeting — at least 75 percent of owners must vote in favour.',
          'The approval process takes time. Allow four to eight weeks for a strata by-law to be drafted, circulated and voted on. Start this before selecting tiles, not after.',
        ],
      },
      {
        heading: 'Waterproofing in an apartment',
        paragraphs: [
          'Waterproofing is more critical in an apartment than in a house, because a failure does not just damage your bathroom — it damages the unit below. Water can travel long distances through a concrete slab, and a leak in a tenth-floor bathroom can show up several floors down and on the other side of the building.',
          'Most strata schemes require the waterproofing to be inspected and certified before tiling begins. Some require an independent certifier rather than the builder\'s own inspection. The by-law will specify the standard — typically AS 3740 — and the certification process.',
          'ETR waterproofs every bathroom to AS 3740 with a compliance certificate, whether it is in a house or an apartment.',
        ],
      },
      {
        heading: 'Plumbing: what can move and what cannot',
        paragraphs: [
          'In a house, plumbing runs through the floor and walls and can usually be rerouted within the room during a renovation. In an apartment, the plumbing stack — the vertical pipe that carries waste from your bathroom to the building\'s main drain — is common property and cannot be moved.',
          'This means the toilet position is usually fixed in an apartment. It can sometimes shift a short distance using an offset pan connector, but a large relocation is rarely practical. The shower waste and vanity waste have more flexibility, but they still need to fall to the existing floor waste or stack connection.',
          'The practical impact: layout options in an apartment are more constrained than in a house. The on-site measure confirms what can change and what has to stay.',
        ],
      },
      {
        heading: 'Noise, access and working hours',
        paragraphs: [
          'Most strata by-laws restrict renovation work to weekdays between 8 am and 5 pm, with no work on weekends or public holidays. Some buildings restrict noisy work (demolition, drilling) to a narrower window within those hours.',
          'Access matters too. Materials and waste need to move through common areas — lifts, corridors, car parks. The building manager will usually require floor and lift protection, advance notice to affected residents, and a schedule of deliveries.',
          'Demolition in an apartment generates the same dust as in a house, but in a smaller, more enclosed space. Dust containment at the bathroom door and along the corridor is more important when the next unit is a few metres away.',
        ],
      },
      {
        heading: 'Acoustic requirements',
        paragraphs: [
          'Apartment bathroom floors transmit impact noise to the unit below. Many Sydney strata schemes require an acoustic underlay or impact-isolation membrane between the concrete slab and the tile bed. This adds a step to the floor preparation but is a condition of the by-law, not optional.',
          'The specific requirement varies by building. Some schemes name a product or a minimum impact isolation class (IIC rating). Others leave it to the builder to propose and the committee to approve. The by-law should be read carefully before the scope is finalised.',
        ],
      },
      {
        heading: 'Cost differences',
        paragraphs: [
          'An apartment bathroom renovation does not necessarily cost more than a house renovation for the same room size and finish level. The room is often smaller, which reduces tile and fixture quantities.',
          'Where apartment renovations add cost is in the logistics: strata application fees, building protection, restricted working hours (which can extend the program), acoustic underlay, and sometimes independent waterproofing certification. These are not large items individually, but they add up.',
          'ETR\'s packages start from $18,000 for a Basic renovation. The on-site measure and the strata by-law together determine the full scope and cost for an apartment.',
        ],
      },
      {
        heading: 'How ETR handles apartment renovations',
        paragraphs: [
          'We review the strata by-law before quoting so the scope, the certification requirements and the access conditions are known upfront. The written quote accounts for building protection, noise restrictions and any acoustic or waterproofing requirements the by-law specifies.',
          'Every apartment bathroom is waterproofed to AS 3740 with a compliance certificate. The work is carried out under NSW Builder Licence 475204C with a 10-year workmanship warranty. A free on-site measure anywhere in Sydney is the right starting point.',
        ],
      },
    ],
    faq: [
      {
        question: 'Do I need strata approval to renovate my apartment bathroom?',
        answer: 'Yes, in almost all cases. A bathroom renovation involves waterproofing, which affects common property. Minor renovations need a majority vote from the strata committee. Major renovations need a special resolution with at least 75 percent of owners voting in favour. Allow four to eight weeks for the approval process.',
      },
      {
        question: 'Can I move the toilet in an apartment bathroom renovation?',
        answer: 'The toilet position is usually constrained by the plumbing stack, which is common property and cannot be moved. A small shift using an offset pan connector may be possible, but a large relocation is rarely practical. The on-site measure confirms what can change.',
      },
      {
        question: 'Is an apartment bathroom renovation more expensive than a house?',
        answer: 'Not necessarily for the same room size and finish level. Apartment renovations add costs for strata fees, building protection, acoustic underlay and sometimes independent waterproofing certification, but the room is often smaller, which reduces tile and fixture quantities.',
      },
      {
        question: 'What are the noise restrictions for apartment renovations in Sydney?',
        answer: 'Most strata by-laws restrict work to weekdays between 8 am and 5 pm with no weekend work. Some buildings restrict noisy work like demolition and drilling to a narrower window. The by-law should be checked before scheduling.',
      },
      {
        question: 'Who is responsible if a waterproofing failure damages the unit below?',
        answer: 'The lot owner is generally liable for damage caused by work within their lot. This is why waterproofing certification is critical in an apartment — it provides evidence that the work was done to AS 3740 and inspected before tiling. ETR issues a compliance certificate for every bathroom.',
      },
    ],
  },
]

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug)
}
