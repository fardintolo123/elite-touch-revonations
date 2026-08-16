# PROJECT_CONTEXT.md — Elite Touch Renovations

**Purpose.** The business facts and the codebase mechanics, in one place. [CLAUDE.md](CLAUDE.md) holds
the *rules*; [DECISIONS.md](DECISIONS.md) holds the *verdicts*; this file holds the *facts and the
"why does it behave like that"*.

> **Status: new build.** Most of §1 is unanswered. **Fill it in as answers arrive; never guess.**
> Everything in §3 was carried over from a sibling trade-business site that hit each of these traps in
> production — they are framework behaviour, not that project's quirks.

---

## 1. Business facts

| Fact | Value | Source |
|---|---|---|
| Business name | **Elite Touch Renovations** | reviews + DESIGN.md |
| Short form | **ETR** (used by customers in reviews) | Customer Reviews.md |
| Principals | **Omar** and **Adam** | Customer Reviews.md (named repeatedly) |
| Core trade | **Bathroom renovations** | all 18 testimonials are bathroom jobs |
| Scope of work evidenced | Full bathroom renovation incl. **design, tiling, ensuites, standalone toilets**; multi-bathroom jobs (one 3-bathroom project) | Customer Reviews.md |
| Reputation themes (evidenced) | Communication · responsiveness by phone/SMS · punctuality · cleanliness · precision tiling · honest regular updates · fair pricing | Customer Reviews.md |
| **Service area / city** | ❓ **TODO** | — |
| **Other services offered** | ❓ **TODO** — do not advertise beyond bathrooms | — |
| **Licence / builder registration** | ❓ **TODO** | — |
| **ABN** | ❓ **TODO** | — |
| **Phone / email / address** | ❓ **TODO** | — |
| **Warranty offered** | ❓ **TODO** | — |
| **Years trading / team size** | ❓ **TODO** | — |
| **Google Business Profile** | ❓ **TODO** — incl. review count and rating | — |
| **Pricing basis** | ❓ **TODO** — no source of truth exists. **State no prices until it does.** | — |

**When a fact is confirmed:** put it in a single data module (`src/data/businessInfo.ts` or
equivalent), reference it everywhere, and update the row above. One source of truth, always.

### The reviews are an asset — treat them as one
`Customer Reviews.md` holds **18 verbatim testimonials with real names**. That is unusually strong
proof for a new site and it is genuinely earned. Rules:
- Reproduce **verbatim**; attribute as written; never paraphrase into marketing copy.
- Never invent an additional one, never inflate a count, never generate `Review` schema for a review
  that does not exist.
- If a Google Business Profile exists, prefer pulling live reviews **and** keep this file as the
  reviewed, approved set.

---

## 2. Technical state

**Nothing is built yet.** The repo contains documentation only, on a `main` branch with no commits,
remote `github.com/fardintolo123/elite-touch-revonations`.

| Decision | Status |
|---|---|
| Framework | ❓ **TODO** |
| Hosting | ❓ **TODO** |
| Forms / enquiry handling | ❓ **TODO** |
| Analytics | ❓ **TODO** — decide **one** measurement path and document it here before adding tags |
| CMS or data-driven content | ❓ **TODO** |

**Record each choice in [DECISIONS.md](DECISIONS.md) when it is made**, with the alternatives you
rejected. The reason will not be obvious in six months.

---

## 3. Framework traps carried over — each caused a live defect elsewhere

These apply to any modern React/SSR stack (Next.js App Router, Remix, Nuxt, SvelteKit). Read before
building the equivalent surface here; adapt the names.

1. **Lazy-loading is an SEO defect for anything that must be indexed.** A wrapper that gates children
   behind state flipped by an `IntersectionObserver` renders its **fallback** server-side, always. The
   sibling project shipped a skeleton instead of real content **three separate times** — an FAQ, a
   reviews block, and a project gallery — losing the headings, body copy, image alt text and anchor
   IDs from the server HTML each time. **Verify with `curl | grep`, not by looking at the browser.**

2. **Rendering eagerly ≠ downloading eagerly.** The standard objection to un-lazying a section is LCP.
   It is usually wrong: set `loading="lazy"` + `fetchPriority="low"` + `decoding="async"` on
   non-priority images and the markup ships while the downloads stay deferred.
   *Grep trap:* React renders the attribute capitalised as `fetchPriority`, so a lowercase grep
   returns zero and looks like a bug when it isn't.

3. **404 bodies inherit the sitewide robots default.** If the layout sets `index, follow` and a
   not-found branch returns only a title, every unmatched URL becomes an **indexable soft 404 at HTTP
   200** — an unbounded surface. Set `robots: { index: false, follow: false }` explicitly in every
   not-found branch.

4. **A data record can silently become a URL.** If a dynamic route resolves slugs from a data file,
   every record in that file is a live page. A record added only to *back* another page creates a
   duplicate. Redirect anything that is not meant to be a page.

5. **Props are serialised into the client/RSC payload even when never rendered.** Withheld text was
   found in served HTML with no JSX referencing it. **Pass only the fields you render.**

6. **`'use client'` is contagious.** One shared image or UI component using a hook without its own
   directive forces every consumer client-side. Find which import demanded it before adding it.

7. **Publication is three things, not one:** body content **+** an internal link from a relevant hub
   **+** a sitemap entry. The sibling project had 18 finished pages sitting orphaned and unsitemapped
   for weeks. Conversely, a page reachable by internal links can be indexed without a sitemap entry.

8. **Renaming an asset reference is not the same as uploading the asset.** Nine broken images shipped
   across two incidents from exactly this. After any rename, verify the file resolves.

9. **Alt text drifts toward describing the page instead of the photo.** No automated check catches it.
   It is both an accessibility failure and a credibility problem — a caption claiming work the photo
   doesn't show is a false claim on a trade site.

10. **Concurrent builds corrupt each other.** Two builds against one output directory fail with
    misleading errors (`ENOENT … manifest`, missing generated types, socket hang ups) that look
    exactly like code faults. Re-run alone before believing a build error.

11. **Background task exit codes lie.** A wrapped command reports the wrapper's status. Read the
    output file; do not trust the notification.

---

## 4. Open items

| # | Item | Owner |
|---|---|---|
| K1 | Service area / location — blocks every local SEO decision and the H1 pattern | Owner |
| K2 | Full service list — blocks the site's information architecture | Owner |
| K3 | Licence / ABN / insurance — legally significant trust signals | Owner |
| K4 | Pricing basis — blocks all cost content, which is high-intent traffic | Owner |
| K5 | Google Business Profile status, rating and review count | Owner |
| K6 | Stack and hosting choice | Owner + agent |
| K7 | Photo library — do real before/after sets exist, and is there customer consent to publish? | Owner |
| K8 | Analytics + call-tracking approach; must be settled **before** tags are added | Owner + agent |
