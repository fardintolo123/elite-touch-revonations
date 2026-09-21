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

export type BlogPost = {
  slug: string
  title: string
  metaTitle?: string
  description: string
  published: string
  readTime: string
  category: string
  quickAnswer?: BlogQuickAnswer
  sections: BlogSection[]
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
      { heading: 'ETR package starting points', paragraphs: ['Elite Touch Renovations publishes three starting points: Basic from $18,000 for an approximately 1.5 m × 1.8 m bathroom, Standard from $25,000 for an approximately 1.8 m × 2.4 m bathroom, and Premium from $30,000 for an approximately 2.4 m × 2.4 m bathroom.', 'These are starting prices, not fixed quotes. The final scope depends on the actual room and your selections. A free on-site measure is the right next step when you need a price tied to your bathroom.'] },
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
      { heading: 'The short answer', paragraphs: ['A bathroom renovation is usually measured in weeks rather than days. The exact timeline depends on the room, the scope, product availability, approvals and what is discovered once the old finishes are removed.', 'A reliable programme should explain the sequence of work and identify decisions that need to be made before the job starts. That is more useful than promising an attractive number of days before the room has been measured.'] },
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
      { heading: 'What should a fixed-scope quote include?', paragraphs: ['A fixed-scope written quote should say what room is being renovated, what work is included, what is excluded, which selections are allowed for and how variations are approved. It should also show the payment schedule and any program assumptions.', 'For a bathroom, look closely for demolition, plumbing and electrical preparation, waterproofing to AS 3740, tiling, fit-off, rubbish removal and final clean. If one quote names those items and another does not, you are not comparing the same thing.'] },
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
      { heading: 'Questions about waterproofing and paperwork', paragraphs: ['Ask how the bathroom will be waterproofed, what standard applies and whether a certificate is supplied. For ETR bathroom renovations, waterproofing is done to AS 3740 with primer plus two coats, and a compliance certificate is supplied.', 'Ask what other handover documents you should keep with the final scope, warranty terms and product information. A careful paper trail is not exciting, but it matters if you ever need to check what was agreed.'] },
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
      { heading: 'The short answer', paragraphs: ['A waterproofing certificate is the paper trail that confirms the wet-area waterproofing work was completed for the bathroom renovation. For ETR bathroom renovations, waterproofing is done to AS 3740, with primer plus two coats, and a compliance certificate is supplied.', 'This is not a separate waterproofing-only service. It is one critical stage inside the full bathroom renovation sequence, because the tile finish only performs if the surface behind it has been prepared and sealed correctly.'] },
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
      { heading: 'Start with the measure, not the mood board', paragraphs: ['Your first bathroom renovation should start with the room as it is. The on-site measure checks the size, access, current layout, visible condition and practical needs before finishes are locked in.', 'Photos, saved ideas and showroom visits are useful, but the measured room decides what will fit. This is also where you raise daily-use issues such as storage, poor light, a tight shower, one bathroom in the home or a layout that never worked.'] },
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
      { heading: 'What changes in a full bathroom?', paragraphs: ['A full bathroom usually needs the broadest scope: shower, toilet, vanity, storage, waterproofing, tiling, ventilation, lighting and often a bath. It may also be the only bathroom in the home, so disruption planning matters.', 'ETR package starting points for bathroom-sized work begin at Basic from $18,000 for an approximately 1.5 m x 1.8 m bathroom, Standard from $25,000 and Premium from $30,000, each tied to its stated room size and inclusion list.'] },
      { heading: 'What changes in an ensuite?', paragraphs: ['An ensuite often has the same trade sequence as a bathroom, but the design pressure is different. The room is smaller, storage is tighter, ventilation can be harder and noise beside the bedroom matters.', 'A good ensuite scope should settle the toilet position, shower clearance, vanity size, door swing, ventilation and lighting before the price is locked in. Small layout mistakes are felt every morning.'] },
      { heading: 'What changes in a powder room?', paragraphs: ['A powder room is smaller again, usually with a toilet and hand basin. The design challenge is clearance: door swing, basin projection, toilet position and tile setout can make the difference between useful and cramped.', 'Do not assume a small room needs no serious planning. If it has a floor waste and water supply, waterproofing still has to be handled properly, and a poor layout can make the room awkward for years.'] },
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
      { heading: 'The short answer', paragraphs: ['Combining a bathroom and laundry renovation can be worth it when the rooms are close together, share services or would otherwise create two separate rounds of disruption. It is not automatically the right choice for every home.', 'ETR treats this as a bathroom and laundry renovation planned as one program, not as a standalone laundry-only service. The measure decides whether the combined sequence helps the household or simply makes too much wet-area space unavailable at once.'] },
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
      { heading: 'Waterproofing paperwork matters', paragraphs: ['Strata buildings can pay close attention to wet-area work because one bathroom can affect another lot. Ask what proof the building wants for waterproofing and keep the certificate with the final paperwork.', 'ETR waterproofs bathroom renovation work to AS 3740 and supplies a compliance certificate for the waterproofing work. If your building has its own document process, raise it at the measure.'] },
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
      { heading: 'Leave room for considered selections', paragraphs: ['Selections should match the room, the scope and the budget. Changing fittings or finishes late can affect ordering and the programme.', 'A measured room and fixed-scope written quote give you a stronger basis for deciding what to include before work begins.'] },
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
    readTime: '1 min read',
    category: 'Design and finishes',
    sections: [
      { heading: 'Start with the task', paragraphs: ['Good bathroom lighting solves everyday tasks first: shaving, grooming, applying makeup and cleaning. A room can feel nicer with layered lighting, but it still needs to be usable first.', 'Warm, even light often feels more comfortable than harsh light from a single source.'] },
      { heading: 'Use lighting to support the room', paragraphs: ['Lighting can improve the feeling of space when it is used well. A ceiling light, a mirror layer and a softer ambient layer can work together without making the room feel busy or over-lit.', 'The right arrangement depends on the room size, mirror position and the finishes in the space.'] },
      { heading: 'Keep the plan practical', paragraphs: ['Before choosing a lighting scheme, check the electrical plan, placement and ventilation. Light should improve the room without creating glare or making the space feel cramped.', 'Good lighting is not about adding more fixtures. It is about using the right light in the right place.'] },
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
]

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug)
}
