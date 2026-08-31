# Performance Budget & Regression Checklist

**Authoritative for:** performance budgets, the before/after regression process, and how to measure.
[CLAUDE.md](../CLAUDE.md) holds the binding *rules*; this file holds the *numbers, the process and the
runbook*. **There must not be a second performance document** — two would immediately compete.

> **Why this exists.** The sibling project these rules came from had performance repaired **nine
> separate times.** The pattern was not carelessness: each fix was recorded *only where it was made*.
> One component carried an excellent comment explaining why a tag must load lazily — and because that
> reasoning lived in one file, an identical 165 KB script sat un-deferred for months. **A rule that
> lives next to the code it fixed cannot protect the next change.** Starting this file before the
> first line of site code is the cheapest thing in this repo.

---

## 1. Budgets

**Target** is where the site should be. **Regression gate** is enforceable per-change: breach it and
the change is not done, however far the target still is.

### Core Web Vitals — mobile, throttled, on the canonical URL

| Metric | Target | Regression gate |
|---|---|---|
| **LCP** | ≤ 2.5 s | must not worsen by **> 300 ms** vs baseline |
| **FCP** | ≤ 1.8 s | must not worsen by **> 200 ms** |
| **TBT** | ≤ 200 ms | hard cap **300 ms** |
| **INP** | ≤ 200 ms | hard cap **300 ms** |
| **CLS** | ≤ 0.05 | hard cap **0.1** |
| **Speed Index** | ≤ 4.0 s | must not worsen by **> 500 ms** |
| **Lighthouse Performance** | ≥ 90 | never **more than 5 points** below baseline |

The ≥ 90 target is deliberately higher than the sibling project's ≥ 80. That site inherited its
weight; this one has not spent its budget yet, and it is far cheaper to hold a line than to claw one
back.

### Payload

| Budget | Limit |
|---|---|
| **First Load JS shared by all routes** | **≤ 150 kB** |
| **First Load JS, any single route** | **≤ 230 kB** |
| **Any single image** | **≤ 100 kB** |
| **The LCP image specifically** | **≤ 70 kB** |
| **Total page weight, mobile home page** | **≤ 1.2 MB** |
| **Third-party JS total** | **≤ 250 kB — and every entry needs a named business reason** |
| **Preloaded web fonts** | **2 files max** |

**On third parties:** the sibling site ended up frozen at ~450 kB of third-party JS (a tag manager
plus a consent platform) — enough that the answer to "can we add another script?" became a permanent
no. Set the bar low now: **a chat widget, a review carousel, a heatmap tool and a booking embed will
each cost more than every image on the page combined.**

---

## 2. Rules that produce those numbers

### Rendering & hydration
1. **Server-render by default.** Reach for a client component only when the file itself needs state,
   effects, refs or DOM handlers.
2. **A client boundary is contagious.** One shared component using a hook without its own directive
   forces every consumer client-side. Before adding the directive to silence an error, find out which
   import actually demanded it.
3. **Never gate indexable content behind `React.lazy` or an `IntersectionObserver`.** The wrapper's
   fallback is what ships in the server HTML. Below-the-fold markup is cheap; the *images* are the
   expensive part, and they are lazy already.
4. **Collapse with CSS, never unmount.** Accordions and FAQs use `grid-template-rows`, not
   `{open && …}` — an unmounted FAQ answer is invisible to crawlers.

### JavaScript & dependencies
5. **No new dependency without a measured First Load JS cost**, stated in the PR or commit.
6. **Prefer a local component over a library for one effect.** Ship **zero** animation libraries — no
   framer-motion, gsap, lottie, three. A marquee or a fade does not justify 40 kB.
7. **On generated / copy-paste UI (21st.dev, Magic UI, Aceternity, shadcn):** paste the source in,
   strip what you do not use, and check it drags in no new dependency and no new client boundary.
   Pick **one** component system and extend it; never run two.
8. **CSS for animation** — transforms and opacity only, so it composites off the main thread. No
   JS-driven scroll animation, no animating layout properties.

### Third-party scripts
9. **Analytics and tags load lazily**, after the critical window.
10. **One measurement path.** Do not load an analytics library both directly and through a tag
    manager — that is how the sibling site wasted ~161 kB for months without noticing.
11. **No new third-party script without owner sign-off**, against the budget above.
12. **Do not add `preconnect` on a hunch.** The sibling project added one and reverted it five commits
    later as measured-useless, then rejected two more on measurement. Lighthouse's own savings
    estimates for the same resource swung 320 ms → 110 ms between two runs half an hour apart.
    **Measure.**

### Images — the single biggest lever on a renovation site
13. **This site will be photo-heavy.** Bathroom renovation sells on before/after and detail shots, so
    images are where the weight will be, and the LCP will almost certainly be a photo.
14. **Serve AVIF/WebP with a real srcset.** Never a formatless srcset, and never one advertising a
    width that does not exist on disk.
15. **`sizes` must state the *measured* rendered width**, not a convenient `50vw`. Over-claiming
    pushed two images onto a larger rung and cost 26 kB on the sibling site. Measure the real element
    in a browser — and **exclude any blur placeholder**, which is often scaled up ~10 % and gives a
    wrong reading.
16. **Exactly one high-priority preload per page** — the LCP image. A high-priority preload on a 40 px
    logo competed with a hero photo and measurably hurt LCP.
17. **Check the ladder has a rung near the real width.** A 480 → 768 gap forces a 559 px box onto
    768w. At a mobile DPR of 1.75, a 56 px box needs 98 px — two pixels past a 96w rung.
18. **Bake EXIF rotation into pixels** when processing phone photos; conversion strips EXIF and an
    unrotated photo renders sideways.
19. **Generate a dedicated 1200×630 crop for `og:image`.** Renovation photos are often portrait, and
    social platforms crop portrait images badly.
20. **Treat 14px body copy as a verification item, not an automatic defect.** `DESIGN.md` is
    authoritative for type and allows `body-sm` at 14px, but any page with lots of `.et-body-sm` or
    `.et-caption` copy still needs a real 390px browser check for legibility and line length.

### Fonts
21. **Two preloaded woff2 files is the ceiling**, with `font-display: swap`. A third font is a
    regression.

---

## 3. The regression process

A change is **performance-sensitive** if it adds a dependency, a script, a section, an image, an
animation, a client boundary, or a page.

**Before:** record the baseline in §4 — build output First Load JS + the last Lighthouse mobile run.
If no recent baseline exists, **take one before editing.** A number without a before is not a result.

**After:**
1. Build green — and **compare the route table's First Load JS.** Cheapest regression signal there is.
2. Typecheck clean.
3. Lighthouse **mobile**, on the canonical URL, against a **production build**.
4. Compare against the §1 gates.
5. Any breach is investigated **before** the task is done — or explicitly accepted in writing, with
   the reason, in the task's plan.

---

## 4. Baselines

Record every run here, newest first.

| Date | Where | Perf | FCP | LCP | TBT | CLS | SI | Shared JS | Note |
|---|---|---|---|---|---|---|---|---|---|
| 2026-08-23 | Local production build (`next start`), mobile, simulated throttling | 93–94 | 1.0s | 2.9s | 90–100ms | 0 | 3.5s | 179 KB gzip (D-80, over the 150 KB shared line, under the 230 KB per-route cap — accepted) | First recorded baseline, taken while triaging GitHub issue #5. **Not the live domain** — the Vercel deployment is behind Deployment Protection (`DECISIONS.md` O-11) and could not be measured anonymously. A single first run scored 84 with a 420ms TBT spike from shared-VM noise; discarded per §5's "never trust a single run" — the numbers above are the median of three runs. Re-measure against the real domain once DNS cuts over. |

---

## 5. Measurement runbook — traps that cost real time elsewhere

- **A dev server cannot verify production behaviour.** On the sibling project the CSP omitted
  `'unsafe-eval'`, so React never hydrated in dev and the analytics queue was never created — every
  JS behaviour test was invalid. **Always measure a production build.**
- **Never run two builds against the same output directory.** They corrupt each other and fail with
  misleading errors — missing manifests, missing generated types, socket hang-ups. At least six build
  failures across three sessions were collisions, not code faults. It is **not** antivirus; that
  hypothesis was tested and wrong.
- **Do not trust a background task's exit code.** A wrapped command reports the wrapper's status, so
  a failed build can report success. **Read the output file.**
- **Measure the canonical URL.** A bare-domain redirect adds a hop and distorts the result.
- **Dismiss any consent banner before a scripted interaction** — an overlay silently swallows clicks.
- **Lighthouse emulation:** mobile is 412×823 at **DPR 1.75**; desktop 1350×940 at DPR 1. Picking the
  right srcset rung depends on getting the DPR right.
- **Never trust a single run**, and check it actually completed — an aborted run reports `NO_LCP` plus
  a wall of "Error!"/"Unscored" audits that look like real failures. An entire investigation on the
  sibling project began with exactly that false alarm.
- **Desktop flatters a site by roughly 25 points.** Google ranks on mobile. Report mobile.

---

## 6. Gate

- [ ] Baseline recorded before the change
- [ ] Build green; First Load JS within §1 and not materially above baseline
- [ ] Typecheck clean
- [ ] Lighthouse mobile re-run on a production build; §1 gates met
- [ ] §4 baseline table updated
- [ ] Any accepted regression written down with its reason
