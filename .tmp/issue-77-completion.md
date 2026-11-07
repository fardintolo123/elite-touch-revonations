## Issue #77 completion evidence

### Changes and outcome

- Removed generic eyebrow labels from the blog index, post heroes, and FAQ section; kept the topic-grouped article rows.
- For posts with an evidenced project photo, the photo leads on phones and stays beside the copy on desktop.
- Removed nested main landmarks from the blog templates; the site layout now supplies the single main landmark.
- Completed the separate R1/R2 readability work: the checker ignores headings and read-time labels while retaining card descriptions, and all 80 guide descriptions now give a concise, topic-specific first-line summary.

### Verification

- `npm run build --ignore-scripts`: passed; all 121 generated routes remain.
- `npm run check:design`: passed; no pattern count exceeds the committed baseline.
- `npm run check:readability`: complete coverage of 115 published routes; all 81 blog routes pass (index 72.5; every post ≥60). The only overall failure is `/about-us/` at 59.8, which is in the open [issue #76](https://github.com/fardintolo123/elite-touch-revonations/issues/76).
- Production browser sweep: all 80 article URLs returned 200 and exactly one matching H1. The index and all three conditional post variants passed at 390×844 and 1440×900: one main landmark, no horizontal overflow, named visible links, image alt text, contact and phone paths, and no page errors.
- Normal-motion scroll pass: zero pending reveal sections on each representative route.
- No new client boundary, JavaScript dependency, script, or image asset.

### Independent critique (§6)

No P0/P1 findings remain. The first review’s mobile photo-order finding and the accessibility review’s nested-main finding are fixed. The visual reviewer notes one remaining non-blocking P2: the gap between the index hero and topic browser. Full §6 finding: `.impeccable/critique/issue-77-independent-review.md`.

Before/after full-page screenshots for the index and plain, quick-answer, and image+FAQ post variants at both widths were captured locally, along with final viewport captures. The files are in `.impeccable/critique/`. They are not attached to this issue: the installed `gh` CLI rejects `--attach`, the available GitHub connector has no image-upload capability, and Computer Use stopped after it could not determine the current browser URL confidently. The user supplied an additional screenshot of the blog topic dropdown; its seven category counts total 80 guides, but it does not replace the before/after captures.

### Editorial sweep — all 80 generated posts

Each line records the post H1 and the checked first-line description. The route/H1 sweep above independently confirms each post.

- **What changes the cost of a bathroom renovation in Sydney?** (`bathroom-renovation-cost-sydney`): Room size, layout, tiles, fittings and site conditions all shape a Sydney bathroom quote.
- **How long does a bathroom renovation take?** (`bathroom-renovation-timeline-sydney`): Planning, selections and site work shape each bathroom renovation timeline.
- **Fixed quote vs verbal estimate: what to ask before you sign** (`how-to-compare-bathroom-renovation-quotes`): Compare a fixed-scope quote with a rough estimate before you choose a renovator.
- **How to choose a bathroom renovator in Sydney without getting burned** (`questions-to-ask-a-bathroom-renovator`): Check the licence, scope, timing, waterproofing and aftercare before you hire a Sydney renovator.
- **Bathroom renovation checklist for Sydney homeowners** (`bathroom-renovation-checklist-sydney`): Settle the scope, selections, access and key documents before bathroom work starts.
- **Waterproofing certificates explained: what every Sydney bathroom renovation needs** (`bathroom-waterproofing-certificate-sydney`): Learn what the certificate covers, when to ask for it and how AS 3740 fits.
- **First time renovating? Here is exactly what happens, step by step** (`first-time-bathroom-renovation-sydney`): See the steps before, during and after your first bathroom renovation in Sydney.
- **Ensuite vs full bathroom vs powder room renovation: cost and scope compared** (`ensuite-vs-bathroom-vs-powder-room-renovation`): Compare room scope and costs for an ensuite, full bathroom or powder room.
- **Bathroom + laundry combo renovations: is combining the two worth it?** (`bathroom-laundry-combo-renovation-worth-it`): Check shared work, plumbing and layout before combining a bathroom and laundry.
- **How to renovate a small bathroom without it feeling cramped** (`small-bathroom-renovation-without-feeling-cramped`): Use clear paths, storage and door swings to plan a small bathroom.
- **What are the biggest bathroom renovation mistakes to avoid?** (`bathroom-renovation-mistakes-to-avoid`): Spot planning gaps that can cause rework, confusion or extra cost.
- **Should I renovate my bathroom myself or hire a professional?** (`diy-or-professional-bathroom-renovation`): See which tasks need licensed trades and where DIY can add risk in NSW.
- **Renovating a bathroom in a Sydney apartment or strata unit?** (`strata-bathroom-renovation-sydney`): Check strata rules, approvals, access and wet-area sign-off before work begins.
- **Sydney bathroom renovation: hidden costs to watch for** (`bathroom-renovation-hidden-costs-sydney`): Scope changes and site surprises can move a Sydney bathroom budget.
- **Bathroom renovation: essential upgrades vs nice-to-haves** (`bathroom-renovation-essential-upgrades`): Choose which bathroom upgrades matter most when you need to limit the spend.
- **What warranty should a bathroom renovation include?** (`bathroom-renovation-warranty-guide`): Check NSW warranty rules and ETR’s stated 10-year workmanship warranty before you sign.
- **Is a quick bathroom renovation possible? What to expect** (`fast-bathroom-renovation-what-to-expect`): Selections, approvals, deliveries and trade order shape a renovation timeline.
- **Bathroom trends in Australia right now** (`bathroom-trends-australia-right-now`): See bathroom styles gaining attention in Australia, with a check on daily use.
- **Storage solutions for small bathrooms** (`small-bathroom-storage-solutions`): Plan vanity drawers, wall shelves and shower niches to keep a small bathroom clear.
- **Bathroom lighting ideas that improve function and mood** (`bathroom-lighting-ideas`): Place task, ambient and accent lights for shaving, cleaning and evening use.
- **Choosing bathroom tiles and finishes** (`bathroom-tiling-and-finishes-guide`): Compare tile, surface and fitting choices by room use, care and cost.
- **Does a bathroom renovation add value to your home?** (`bathroom-renovation-add-value-home`): Resale value depends on the home, the scope and what buyers notice.
- **Bathroom colour schemes that actually work in Australian homes** (`bathroom-colour-schemes-australia`): Use Australian light, tile size and daily routines to choose bathroom colours.
- **Bathroom ventilation: what every Sydney renovation needs to get right** (`bathroom-ventilation-sydney-renovation`): Learn fan rules, sizing and the damp that poor bathroom ventilation can leave.
- **Renovating a bathroom in a heritage or older Sydney home** (`heritage-bathroom-renovation-sydney`): Plan for approvals, old pipes and hidden structure in a Sydney heritage bathroom.
- **Walk-in shower vs bathtub: how to choose during a bathroom renovation** (`walk-in-shower-vs-bathtub-renovation`): Compare space, access and household needs before choosing a shower or bath.
- **How to budget for a bathroom renovation without blowing it** (`bathroom-renovation-budget-planning`): Plan the main costs, allow for changes and keep the agreed scope clear.
- **Bathroom renovation and resale: what agents actually look for** (`bathroom-renovation-resale-value-what-agents-look-for`): See what agents and buyers check, and where a bathroom spend can go too far.
- **What happens during bathroom demolition? A step-by-step guide** (`bathroom-demolition-what-to-expect`): Know what comes out, how the room is protected and what may show behind walls.
- **Accessible bathroom renovation: designing for all ages and abilities** (`accessible-bathroom-renovation-sydney`): Plan clear paths, grab-rail support and easy shower access for all ages.
- **Apartment bathroom renovation vs house: what changes** (`apartment-bathroom-renovation-vs-house`): Check lift access, shared pipes, noise rules, strata terms and site costs.
- **Wet room design: is it right for your bathroom renovation?** (`wet-room-bathroom-renovation`): Learn how a wet room differs from a standard bathroom and what it needs.
- **How to choose bathroom tapware finishes that last** (`bathroom-tapware-finishes-guide`): Compare finish care, wear and style before you choose bathroom taps.
- **Underfloor heating in a bathroom: worth the cost?** (`underfloor-heating-bathroom-renovation`): Check supply cost, running cost and floor build-up before adding bathroom heating.
- **Family-friendly bathroom renovation: designing for kids and adults** (`family-bathroom-renovation-ideas`): Plan a family bathroom around clear paths, safe use, storage and hard-wearing finishes.
- **How to choose the right bathroom vanity during a renovation** (`bathroom-vanity-guide-renovation`): Compare vanity size, storage, wall-hung or floor-standing fit and material.
- **Bathroom renovation permits and approvals in Sydney: what you need** (`bathroom-renovation-permits-sydney`): Find out when Sydney bathroom work needs approval and what can trigger it.
- **What plumbing gets replaced during a bathroom renovation?** (`bathroom-renovation-plumbing-replacement`): See which pipes may be replaced and why old lines can be risky to keep.
- **Bathroom renovation and home insurance: what to know before you start** (`bathroom-renovation-insurance-australia`): Tell your insurer before work starts and check what your policy covers.
- **Bathroom renovation project management: what to expect week by week** (`bathroom-renovation-project-management-timeline`): Follow the work from the first measure to the final clean with a week-by-week plan.
- **Large-format tiles in a bathroom renovation: pros, cons and what to know** (`large-format-tiles-bathroom-renovation`): Check tile size, wall preparation, fitting needs and cost before choosing large tiles.
- **Eco-friendly bathroom renovation: sustainable choices that save water and money** (`eco-friendly-bathroom-renovation`): Choose water-saving fittings and durable materials to reduce water use and replacement waste.
- **Bathroom renovation while living at home: how to manage the disruption** (`bathroom-renovation-living-at-home`): Plan for dust, noise and bathroom access if you stay at home during the work.
- **Shower screens explained: frameless, semi-frameless and framed** (`shower-screen-types-bathroom-renovation`): Compare glass, wall fit, cleaning and cost across three shower-screen styles.
- **Bathroom niches and recessed shelves: design, sizing and waterproofing** (`bathroom-niche-design-ideas`): Plan niche size and placement so bottles fit and it works with the shower layout.
- **Freestanding bath in a renovation: space, plumbing and cost** (`freestanding-bath-renovation-guide`): Check room size, plumbing, floor support and fit before choosing a freestanding bath.
- **Bathroom mould: why it returns and how a renovation stops it** (`bathroom-mould-prevention-renovation`): Find the moisture, airflow or leak issue behind bathroom mould before it returns.
- **Heated towel rails: types, costs and what to know during a renovation** (`heated-towel-rail-bathroom-guide`): Compare electric and hydronic heated rails, running costs and fit before choosing one.
- **Bathroom mirrors: types, sizing and LED options for your renovation** (`bathroom-mirror-guide-renovation`): Check mirror size, lighting, anti-fog needs and wiring before the walls are closed.
- **Bathroom grout: types, colours and how to keep it clean** (`bathroom-grout-guide-types-maintenance`): Compare cement and epoxy grout, choose a colour and plan how to keep it clean.
- **Bathroom splashback ideas: tiles, glass and panels** (`bathroom-splashback-ideas-renovation`): Compare tile, glass, stone and acrylic for splash zones around sinks and baths.
- **Bathroom waterproofing explained: what every homeowner should know** (`bathroom-waterproofing-explained`): See what AS 3740 covers and what to check before tiling over the membrane.
- **Bathroom renovation waste: what gets removed and where it goes** (`bathroom-renovation-waste-disposal`): See what a bathroom renovation removes and how the waste is sorted and taken away in Sydney.
- **Bathroom renovation for investment properties: what to spend and what to skip** (`bathroom-renovation-investment-property`): Choose durable finishes for a rental and set spending around tenant needs.
- **Bathroom ceiling renovation: what most people overlook** (`bathroom-ceiling-renovation-guide`): Check moisture damage, fan placement, lighting and paint before finishing the ceiling.
- **Bathroom renovation electrical work: what changes and what stays** (`bathroom-renovation-electrical-work`): Plan bathroom lights, fans and heated rails, and check work against AS/NZS 3000.
- **Bathroom flooring options: tiles, vinyl and what works in wet areas** (`bathroom-flooring-options-renovation`): Compare tile, vinyl and stone by grip, care and use in wet areas.
- **The bathroom renovation design process: from first ideas to final plans** (`bathroom-renovation-design-process`): Follow the plan from site measure and layout options to selections and quote.
- **What to look for in a bathroom renovation contract** (`bathroom-renovation-contract-guide`): Check scope, price, payment dates, changes, warranty and insurance before you sign.
- **Aging in place: designing a bathroom for the years ahead** (`aging-in-place-bathroom-design`): Plan grab-rail support, step-free showers and wider doors for future access.
- **Bathroom paint: where to use it, what type and when tiles are better** (`bathroom-paint-guide-renovation`): Choose paint for damp areas and know when tile may be a better fit.
- **How to choose a bathroom renovator in Sydney** (`how-to-choose-bathroom-renovator-sydney`): Check the licence, insurance, past work, written quote and warning signs.
- **Bathroom accessories and hardware: the finishing touches that matter** (`bathroom-accessories-hardware-guide`): Choose rails, hooks and holders early so their finish and location are set.
- **Toilet upgrades during a bathroom renovation: types, costs and what to know** (`toilet-upgrade-guide-bathroom-renovation`): Compare wall-hung, back-to-wall and close-coupled toilets by fit and cost.
- **Double vanity vs single vanity: which suits your bathroom?** (`double-vanity-vs-single-bathroom`): Compare space, plumbing, storage and cost before choosing one or two basins.
- **Bathroom renovation scope: how to manage changes without blowing the budget** (`bathroom-renovation-scope-changes`): Write down changes, costs and timing before extra bathroom work starts.
- **Shower seats and bench seating: comfort, safety and style** (`shower-seat-bench-bathroom-design`): Compare built-in, fold-down and freestanding shower seats for fit and use.
- **Bathroom layout changes: when to move plumbing and when to keep it** (`bathroom-layout-changes-renovation`): Keep or move pipes based on layout, cost and how the room will work.
- **Wall-hung vs floor-mounted bathroom fixtures: pros, cons and cost** (`wall-hung-vs-floor-mounted-fixtures`): Compare cleaning, fitting and cost for wall-hung or floor-mounted fixtures.
- **How to plan bathroom storage during a renovation** (`bathroom-storage-planning-renovation`): Plan vanity drawers, niches and wall shelves before choosing bathroom finishes.
- **Bathroom renovation and your neighbours: managing noise and access** (`bathroom-renovation-neighbours-noise`): Set work hours, dust control and access rules before renovation work begins.
- **Ensuite renovation ideas: layout, design and what to prioritise** (`ensuite-renovation-ideas-layout`): Plan space, ventilation, storage and door swing before setting an ensuite layout.
- **Powder room renovation: making a small space shine** (`powder-room-renovation-guide`): Plan a compact vanity, basin, door swing and lighting for a powder room.
- **Wall-hung vs back-to-wall toilet: which should you choose?** (`wall-hung-vs-back-to-wall-toilet`): Compare cleaning, wall depth, repairs and cost before choosing a toilet.
- **Porcelain vs ceramic tiles for a bathroom: which is better?** (`porcelain-vs-ceramic-tiles-bathroom`): Compare water absorption, strength, cutting and cost before choosing bathroom tile.
- **Matt vs gloss bathroom tiles: which finish should you choose?** (`matt-vs-gloss-bathroom-tiles`): Compare grip, cleaning, light and water marks before choosing matt or gloss tile.
- **Frameless vs semi-frameless shower screen: which is better?** (`frameless-vs-semi-frameless-shower-screen`): Compare glass, wall fit, cleaning and cost before choosing a shower screen.
- **Fixed-scope quote vs provisional sums and PC items: what each means** (`fixed-scope-quote-vs-provisional-sums-bathroom`): Learn how quote terms can change your final price and what to ask first.
- **How long does a bathroom renovation last?** (`how-long-does-a-bathroom-renovation-last`): See what helps a bathroom last, from waterproofing and tile work to airflow.
- **Repair or replace: signs it is time to renovate your bathroom** (`repair-or-replace-bathroom-renovation`): Use leaks, loose tiles and damp to judge whether repair or replacement makes sense.

