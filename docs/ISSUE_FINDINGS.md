# Issue Findings — what GitHub issues #1 and #2 actually contained

**Reviewed:** 2026-08-17. Both issues closed on that date; **their content is preserved in
[`docs/source-copy/`](source-copy/)** (verbatim extracted text plus the original PDFs).

Issue #2 turned out to be the most substantial source of business truth in the project — eight
owner-supplied PDFs including full page copy, the package matrix, and a marketing consultant's
review. It resolves five long-standing open items **and contradicts several things the repo had
recorded as CONFIRMED.**

> **Read this before writing any page copy.** Several facts on the live site and in
> `PROJECT_CONTEXT.md` are now known to be wrong or incomplete.

---

## A. Open items this CLOSES

| Was open | Now known | Source |
|---|---|---|
| **K1 — ABN** | **92 679 016 721** | About PDF + Bathroom service PDF (stated identically in both) |
| **K1 — ACN** | **679 016 721** | About PDF |
| **K1 — business email** | **`Elitetouchrenovations@gmail.com`** (current) · **`info@elitetouchrenovations.au`** (preferred, ⚠️ *"currently being set up"*) | About PDF |
| **K1 — address** | **Granville, NSW — by appointment.** No street address given | About PDF |
| **K2 — GBP URL** | **https://share.google/PLJDhhWBCrWAq6GVH** | About PDF |
| **K2 — GBP rating/count** | **5.0 stars across 17 Google reviews** ⚠️ as at PDF date — verify live | About PDF |
| **K7 — ORIGINAL package price** | ❌ **Still unknown.** The Packages PDF's second page lists an ORIGINAL tier but shows **no prices at all** on that page | Packages PDF p2 |

**Also newly known:** trading hours (Mon–Fri 7:00am–5:30pm, Sat 8:00am–3:30pm) · second phone
0423 305 852 (Mohammed) · Public Liability $20M · Workers Comp with Allianz · HBCF certificates ·
HIA membership · HIA fixed-price renovation contract · 30% deposit, 30/40/30 progressive schedule ·
five social profiles (Instagram, Facebook, LinkedIn, YouTube, TikTok).

---

## B. Conflicts — ⚠️ do not resolve these by guessing

### 1. Founded 2022 or 2023?
The About PDF says **both**, in the same document:
- *"Since 2023, we have been helping homeowners transform their bathrooms…"*
- *"Elite Touch Renovations was founded in 2022 by the Dawood family…"*

`DECISIONS.md` D-04 records **2023** as CONFIRMED and load-bearing. **Kept at 2023** — it is the
CONFIRMED value and the PDF agrees with it in the opening line. **The owner must settle this.**
"Family-run since 2023" appears on the homepage, the footer and in schema.

### 2. There are FOUR Dawoods, not three — and the roles in the repo are wrong
`DECISIONS.md` **D-37 is incomplete and partly incorrect.** It records three principals with roles
that do not match the owner's own About copy.

| Person | D-37 said | About PDF says |
|---|---|---|
| Omar Dawood | Projects Manager | **Licensed Builder & Civil Engineer — founder.** Licence 475204C is in his name |
| Adam Dawood | Projects Manager | **Licensed Tiler & Projects Manager, 25+ years.** He is the **father**; the other three are the next generation |
| Farah Dawood | Architectural Designer | Architectural Designer ✅ — Master's in Architecture (UTS), industry experience at SJB |
| **Mohammed Dawood** | **not recorded at all** | **Assistant Project Manager.** Graduate Certificate in Construction Project Management |

The Home PDF independently confirms the count: *"The four Dawoods running Elite Touch"*.
**Applied to the site.** D-37 needs amending by the owner.

### 3. Two different, conflicting pricing models
| Source | What it says |
|---|---|
| Packages PDF | **BASIC $17,999 · STANDARD from $25,999 · PREMIUM from $32,999**, each tied to a stated bathroom size |
| Bathroom service PDF | Indicative *ranges*: Refresh **$8,000–$20,000** · Full renovation standard **$25,000–$40,000** · Full renovation premium **$40,000–$60,000** · Reconfigure **$55,000+** |

These are not the same thing and they overlap awkwardly — a "$17,999 BASIC package" sits below the
quoted "$25,000–$40,000 full renovation" range. Both are the owner's own material.
**Neither has been changed.** The site currently shows only the package prices. Decide which model
the site leads with before building the cost/pricing page (D-15).

⚠️ The service PDF also prices a **"Refresh package"** — a fixtures-and-tapware swap that keeps the
existing membrane. That is **a fifth service** not in D-01. Do not advertise it without owner sign-off.

### 4. Two different build durations
- About PDF: *"most bathroom renovations in **two to four weeks** on site"*
- Bathroom service PDF: *"Most Sydney bathroom renovations run between **three and five weeks**"*

Neither is currently on the site. Pick one with the owner before publishing a timeline.

### 5. Service area is much larger than the site structure assumes
The About PDF claims **Greater Sydney**, naming: Western Sydney, Inner West, Eastern Suburbs,
**North Shore**, **Northern Beaches**, Hills District, **South Sydney**, Canada Bay, Ryde,
Hunters Hill, **Sutherland Shire**, **Parramatta** — *"We also consider projects outside Sydney on
a case-by-case basis."*

`service-areas.json` and `docs/BATHROOM_SITE_STRUCTURE.md` cover **four** regions only: Hills
District, Inner West, North-Western Sydney, Eastern Suburbs. **North Shore, Northern Beaches,
Sutherland Shire, Parramatta, South Sydney and Western Sydney have no coverage at all.** That is a
genuine strategy gap, not a bug — but it should be a deliberate decision, not an accident.

### 6. "Residential and commercial"
About PDF: *"We work across both residential and commercial projects."* Everything else in the repo,
and D-01, treats this as a residential bathroom business. **Not added to the site.** Confirm scope.

### 7. The warranty is STILL not resolved
D-19 / K2b asked for ETR's **workmanship warranty term**. Issue #2 does not supply it:
- Action Items lists *"10-year warranty from **our trusted supplier**"* → that is a **product/supplier**
  warranty on fixtures, not ETR's workmanship warranty.
- About PDF offers *"We respond to defects raised during the **statutory defects period** under the
  Home Building Act 1989 at no charge"* → that is the legal minimum, not a stated term.

**No warranty number ships.** D-19 stands.

### 8. Sustainability claim needs evidence
About PDF: *"We plant one tree per completed project through **Greenfleet**"* (greenfleet.com.au).
The marketing consultant's own review flagged the earlier version of this claim as
*"not believable, where is proof that this is happening"*. Naming Greenfleet is better evidence than
before, but **confirm it is actually running before publishing it.**

### 9. Minor: PREMIUM package size
`PROJECT_CONTEXT.md` §2 records PREMIUM as *"approx. 2.4 m × 2.4 m"*. The Packages PDF says
**2.4m x 2.4m x 2.4m** (three dimensions, i.e. including ceiling height, consistent with the other
tiers). **Corrected on the packages page.**

---

## C. The marketing consultant's review (Action Items PDF) — worth reading in full

This PDF is a third-party marketing audit, and it is blunt and useful. Highlights:

- **The Google Ads campaign converted at zero.** 900 impressions, 72 clicks, **0 conversions**,
  $660 spent, $9 per click — traffic sent to the homepage and `/packages-deals/`.
- Their diagnosis, on the old homepage: *"you are making people do all the hard work and it is all
  the same stuff people can see on another 200 bathroom renovator websites."*
- On the old packages page: *"there are no packages just generic information and 'from' pricing so
  no surprise that it isn't convincing."*
- *"Getting traffic to your website isn't the challenge… The challenge is presenting something
  believable that converts."*

**This is the single best justification for the rebuild in the whole repo** — the old site had paid
traffic and converted none of it.

It also **independently supports D-10** (the Tier-1 / hub split). The owner had asked for suburbs to
be listed in text on one page; the consultant rejected it: *"Just mentioning a suburb in text on one
random page will not help you get found in any of those suburbs, everyone would be doing it if it
were that easy."*

⚠️ It also contains a **green/sustainability brand direction** — *"the green theme of our website"*.
`DESIGN.md` is magenta and is authoritative for anything visual (CLAUDE.md tier 1). Do not change
the palette off the back of this PDF; raise it with the owner if it matters to them.

Outstanding asks in that PDF that are **still not done** and block content: professional team photos,
head shots, on-site photos, finished-bathroom video, a downloadable sample quote, and a founder video.

---

## D. Issue #1

`https://sheinerconstruction.com/design-services/` with *"We can use these pages same info just
change to our photos."*

Already settled as **D-05**: a competitor's **layout and structure** may be used as reference;
their **copy, specifications and claims** may not. Reusing their words is duplicate content that
will not rank, and reusing their specifications would put claims on the site that are not true of
this business. No action beyond D-05.

---

## E. What was applied to the site on 2026-08-17

- `lib/businessInfo.ts` — ABN, ACN, both emails, Granville address, trading hours, second phone,
  insurances, memberships, contract type, deposit/payment schedule, full standards list, GBP URL
  and rating (flagged unverified), five social profiles, **all four principals with correct roles**.
- About page — real team bios and the credentials/protections block.
- Footer and contact page — ABN, hours, address, email.
- `HomeAndConstructionBusiness` schema — address, hours, `sameAs`, ABN.
- Packages page — PREMIUM size corrected to 2.4 × 2.4 × 2.4 m.
- Homepage meta title/description switched to the owner's approved wording.

**Not applied, deliberately:** the ranges pricing model, commercial work, the Refresh package, any
build duration, the Greenfleet claim, any warranty term, any service area beyond the four settled
regions, and any rating in structured data. Each is listed in §B with what is needed to unblock it.
