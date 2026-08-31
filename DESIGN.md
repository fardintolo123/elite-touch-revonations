# Design System — Elite Touch Renovations

An original design system, inspired by a vibrant/rounded/flat reference pattern.
Tokens are the foundation; the brand, voice, and layouts here are our own.

**Design language:** vibrant · rounded · flat · light-first (dark mode supported)
**Rhythm:** 4px grid · pill geometry · elevation by tone, not by shadow

---

## 0. How to use this file

- **Tokens are the contract.** Never hard-code a hex, radius, or duration in a component. If a value isn't here, add it here first.
- **Every value is on the 4px grid.** If you need something between two steps, you're probably solving a layout problem the wrong way.
- **Contrast ratios in §2 are computed, not estimated.** If you introduce a color, compute its ratio before shipping it.
- Section §11 is a copy-pasteable `:root` block. Start there.

---

## 1. Principles

1. **One loud color, used sparingly.** Magenta is the only saturated hue in the system. It marks the primary action and nothing else. A screen with three magenta things has no primary action.
2. **Flat, but not flat-looking.** No drop shadows in the content layer. Depth comes from *tone* — pure white cards sitting on an off-white canvas — and from full-bleed image bands. Shadows are reserved for things that genuinely float above the page (dropdowns, modals, toasts).
3. **Rounded to the point of softness.** Buttons and inputs are fully pill. Cards are generously rounded. Nothing in the UI has a sharp corner except full-bleed imagery.
4. **Band rhythm.** The page alternates light sections, full-bleed image sections, and dark ink sections. This alternation *is* the layout — it replaces the need for borders and boxes between sections.
5. **Type does the hierarchy work.** Large, medium-weight Jost headings against small, relaxed body copy. Weight and size carry hierarchy; color and decoration don't.
6. **Generous vertical space.** Sections breathe (96–160px of vertical padding). Density lives inside cards, never between sections.

---

## 2. Color

### 2.1 Brand ramp — Magenta

The single accent hue. `500` is the fill; `700` is the ink.

| Token | Hex | Role |
|---|---|---|
| `magenta-50`  | `#FFF0F8` | Tinted panels, subtle accent backgrounds |
| `magenta-100` | `#FFDCEF` | Badge backgrounds, selected chip fill |
| `magenta-200` | `#FCB8DB` | Borders on tinted panels, disabled fill |
| `magenta-300` | `#F587BF` | Decorative only |
| `magenta-400` | `#EC4BA0` | Dark-mode hover, decorative |
| `magenta-500` | `#DD0880` | **Primary.** Button fills, active states |
| `magenta-600` | `#C40772` | Primary hover |
| `magenta-700` | `#B10666` | **Ink.** Links, accent text, primary active |
| `magenta-800` | `#8E0552` | Pressed states on tinted surfaces |
| `magenta-900` | `#6B043E` | Accent text on light tinted panels |

> **The fill/ink rule.** `magenta-500` on white is **4.75:1** — safe for white text on a magenta button, and safe as *large* text, but marginal for small text. For magenta text on a light surface, always use `magenta-700` (**6.52:1** on canvas). Fill = 500. Text = 700. No exceptions.

### 2.2 Neutrals

| Token | Hex | Role |
|---|---|---|
| `ink-900` | `#141416` | Dark section / footer background |
| `ink-800` | `#1C1C20` | Dark section cards |
| `ink-700` | `#24242A` | Dark section raised elements |
| `ink-500` | `#2A2A2A` | **Body & heading text** |
| `ink-400` | `#545C66` | Secondary text (6.49:1 — safe at any size) |
| `ink-300` | `#69727D` | Muted text, captions (4.68:1 — **14px+ only**) |
| `ink-200` | `#C4C4C4` | Strong borders, input borders on hover |
| `ink-100` | `#D9D9D9` | Default borders, dividers |
| `ink-50`  | `#F1F1F2` | Track fills, skeleton, disabled surfaces |
| `canvas`  | `#FAFAFA` | Page background |
| `surface` | `#FFFFFF` | Cards, raised containers, form fields |

> **Why white cards on an off-white canvas:** this is the entire elevation system in the content layer. A card is "raised" because it is one step brighter than the page. Never put a `#FAFAFA` card on a `#FAFAFA` page and reach for a shadow to save it.

### 2.3 Semantic

Deliberately desaturated relative to the brand so they never compete with the primary action.

| Token | Hex | Text-on-light pair | Notes |
|---|---|---|---|
| `success` | `#0E9F6E` | `#07714E` | Green-teal; no hue conflict with magenta |
| `warning` | `#D9880B` | `#8A5406` | Amber |
| `danger`  | `#C01515` | `#93100F` | **Always pair with an icon** — red and magenta are distinguishable but not instantly so |
| `info`    | `#0B6FBF` | `#075390` | Blue |

Each has a `-surface` tint for alert backgrounds: `success-surface #E8F7F1`, `warning-surface #FDF3E3`, `danger-surface #FBEAEA`, `info-surface #E8F1FA`.

### 2.4 Contrast reference (verified)

| Pair | Ratio | Verdict |
|---|---|---|
| `ink-500` on `canvas` | 13.75:1 | AAA |
| `ink-400` on `canvas` | 6.49:1 | AA all sizes |
| `ink-300` on `canvas` | 4.68:1 | AA normal text (14px+); avoid below 14px |
| `magenta-700` on `canvas` | 6.52:1 | AA all sizes |
| `magenta-500` on `canvas` | 4.55:1 | AA normal text — marginal, prefer 700 |
| white on `magenta-500` | 4.75:1 | AA normal text — the primary button |
| white on `ink-900` | ~17.9:1 | AAA |
| `magenta-400` on `ink-900` | 6.56:1 | AA — the dark-mode accent text color |

### 2.5 Dark mode

The reference is light-only; this is inferred. Dark mode is a **tone inversion, not a hue change** — the magenta stays, but text-weight magenta lightens to `magenta-400` to clear contrast.

| Semantic role | Light | Dark |
|---|---|---|
| canvas | `#FAFAFA` | `#141416` |
| surface | `#FFFFFF` | `#1C1C20` |
| surface-raised | `#FFFFFF` | `#24242A` |
| text | `#2A2A2A` | `#F4F4F5` |
| text-secondary | `#545C66` | `#B9BEC7` |
| text-muted | `#69727D` | `#9098A3` |
| border | `#D9D9D9` | `#33333B` |
| accent-fill | `#DD0880` | `#DD0880` (unchanged — white text still reads at 4.75:1) |
| accent-ink | `#B10666` | `#EC4BA0` |
| accent-surface | `#FFF0F8` | `#2A0F20` |

In dark mode the ink sections invert too — a "dark band" becomes a *lighter* band (`#1C1C20`) so band rhythm survives. Never render an ink section as pure black.

### 2.6 Color rules

**Do**
- Use `magenta-500` for exactly one action per view.
- Use `magenta-50`/`100` for tinted panels, badges, and eyebrow chips — this is how the accent appears at scale without shouting.
- Desaturate photography-adjacent UI: over images, use white/ink overlays, not magenta.
- Put trust content (awards, press logos, certifications) in grayscale. Color there reads as advertising.

**Don't**
- Introduce a second saturated hue. No orange CTAs, no blue links.
- Use `magenta-500` for body text, small text, or icon-only affordances at small sizes.
- Use `danger` and `magenta` in the same component — pick one.
- Reach for a shadow when a tone step or a border would do.

---

## 3. Typography

**Family:** Jost (variable, SIL OFL). Fallback stack:
`Jost, "Jost Variable", ui-sans-serif, system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`

Weights in use: **400** body · **500** display headings · **600** section headings & buttons · **700** emphasis only.

### 3.1 Scale

The reference collapses H1/H2/H3 to 50/50/46, which gives no hierarchy. Rebuilt as a real ratio-based scale (≈1.25) with fluid clamps.

| Token | Size (min → max) | Weight | Line height | Tracking | Use |
|---|---|---|---|---|---|
| `display` | 40 → 68px | 500 | 1.08 | -0.02em | Hero headline only |
| `h1` | 34 → 50px | 500 | 1.15 | -0.015em | Page title |
| `h2` | 28 → 38px | 600 | 1.2 | -0.01em | Section heading |
| `h3` | 22 → 28px | 600 | 1.3 | -0.005em | Sub-section, card title |
| `h4` | 18 → 22px | 600 | 1.35 | 0 | Small card title, list heading |
| `lead` | 17 → 20px | 400 | 1.55 | 0 | Section intro paragraph |
| `body` | 16px | 400 | 1.5 | 0 | Default |
| `body-sm` | 14px | 400 | 1.55 | 0 | Dense UI, captions |
| `caption` | 13px | 500 | 1.4 | 0.01em | Metadata, labels |
| `eyebrow` | 12px | 600 | 1.2 | 0.12em, uppercase | Section kicker chips |
| `button` | 15 → 16px | 600 | 1 | 0.01em | Button label |

```css
--et-text-display: clamp(2.5rem, 1.6rem + 3.6vw, 4.25rem);
--et-text-h1:      clamp(2.125rem, 1.6rem + 2.1vw, 3.125rem);
--et-text-h2:      clamp(1.75rem, 1.45rem + 1.2vw, 2.375rem);
--et-text-h3:      clamp(1.375rem, 1.25rem + 0.5vw, 1.75rem);
```

### 3.2 Type rules

- **Headings never go above 700 weight.** Jost at 500–600 at large sizes is the signature; 700 at 50px reads heavy and cheap.
- **Measure:** 60–75ch for body prose, 20–28ch for display headings. Long headlines must wrap in 2–3 lines, never 1 wide line.
- **Negative tracking scales with size.** Anything ≥34px gets `-0.015em`; body gets `0`. Never track out body text.
- **Uppercase only for `eyebrow` and `caption` labels**, always with ≥0.1em tracking.
- **One heading level per section.** Don't stack `h2` + `h3` as a title/subtitle pair — use `h2` + `lead`.

---

## 4. Spacing, grid, layout

### 4.1 Spacing scale (4px base)

`4 · 8 · 12 · 16 · 20 · 24 · 28 · 32 · 36 · 40 · 48 · 56 · 64 · 80 · 96 · 120 · 160`

The reference stops at 40; steps above are our extension for section rhythm. Below 40 the scale is a strict 4px march — use it for component-internal spacing. Above 40 it's a coarse jump scale — use it only for section and block spacing.

| Token | Value | Use |
|---|---|---|
| `space-1` … `space-10` | 4 → 40px | Inside components |
| `space-12` | 48px | Card padding (desktop), gap between cards |
| `space-16` | 64px | Gap between blocks within a section |
| `space-20` | 80px | Section padding (mobile) |
| `space-24` | 96px | Section padding (tablet) |
| `space-30` | 120px | Section padding (desktop) |
| `space-40` | 160px | Hero and major band padding (desktop) |

### 4.2 Container & grid

| Token | Value |
|---|---|
| `container-max` | 1280px (content) |
| `container-wide` | 1440px (image bands, gallery) |
| `container-narrow` | 720px (prose, forms) |
| `gutter` | 20px mobile → 32px tablet → 40px desktop |
| Columns | 12-col, `gap: 24px` desktop / `20px` mobile |

Full-bleed image bands break the container and span 100vw; their *content* still aligns to `container-max`.

### 4.3 Breakpoints

Rationalized from the reference's scraped values (which included Elementor's 767/992/1024 artifacts).

| Token | Min-width | Notes |
|---|---|---|
| `sm` | 480px | Large phone |
| `md` | 768px | Tablet portrait — nav collapses **below** this |
| `lg` | 1024px | Tablet landscape / small laptop — 2-col splits activate |
| `xl` | 1280px | Desktop — container caps |
| `2xl` | 1536px | Wide desktop — image bands widen only |

Mobile-first. Write `min-width` queries only.

### 4.4 Section recipes

The page is composed from these bands, alternated:

| Band | Background | Content pattern |
|---|---|---|
| **Hero** | Full-bleed image + ink scrim | Display headline (left, bottom-aligned), supporting line, primary pill CTA, floating white info card overhanging the image edge |
| **Trust strip** | `canvas` | `eyebrow` label centered + row of grayscale logos, `space-16` vertical |
| **Split feature** | `surface` | 50/50 — copy + checklist on one side, rounded image on the other, alternating side each instance |
| **Image band** | Full-bleed image | Centered heading over scrim + a floating white card of badges/logos crossing the band's lower edge |
| **Process** | `canvas` | `eyebrow` → `h2` → numbered rows, each: icon tile + `h4` + one line of `body-sm` |
| **Gallery** | `ink-900` | Filter chips + asymmetric image grid, white text |
| **Testimonials** | `canvas` w/ `magenta-50` accent cards | Quote cards + avatar/name row + carousel arrows |
| **Insights** | `surface` | 3-up card grid: image, category badge, `h4`, meta |
| **Contact** | `canvas` | Rounded image left, form card (`surface`) right |
| **Footer** | `ink-900` | 4 columns + newsletter, `space-24` vertical |

Rule: never place two same-background bands adjacent. If two light sections must follow each other, insert a divider or switch one to `surface`.

---

## 5. Radius, borders, elevation

### 5.1 Radius

| Token | Value | Applies to |
|---|---|---|
| `radius-pill` | 999px | Buttons, chips, badges, eyebrows, avatars, inputs |
| `radius-sm` | 12px | Icon tiles, small thumbnails, tags |
| `radius-md` | 20px | Inner elements inside cards |
| `radius-lg` | 28px | Cards, form fields (multi-line), panels |
| `radius-xl` | 40px | Large media, image blocks, feature panels |
| `radius-2xl` | 56px | Full-bleed band corners, hero image blocks |

> **Nesting rule:** an inner radius must be *smaller* than its parent's by at least one step. A `radius-lg` card containing a `radius-lg` image looks broken; use `radius-md` inside.

The reference's 80px button radius and 30px input radius both resolve to `radius-pill` at real control heights — expressing it as `999px` keeps buttons pill-shaped at every size instead of only at 54px tall.

### 5.2 Borders

- `1px solid var(--et-border)` is the default. The reference's `0.8px` is a rendering artifact — don't reproduce it.
- Hairline dividers: `1px` `ink-100`, full-bleed within their container.
- Tinted panels (`magenta-50` background) take a `1px` `magenta-200` border or no border — never a gray one.

### 5.3 Elevation

Flat by default. Four tiers, and the first two are the ones you should be using.

| Tier | Definition | Use |
|---|---|---|
| `flat` | none | Everything in the content layer |
| `tone` | `surface` on `canvas` | Cards, form fields, floating info cards |
| `float` | `0 8px 24px rgba(20,20,22,0.08)` | Dropdowns, popovers, sticky nav once scrolled |
| `overlay` | `0 24px 64px rgba(20,20,22,0.18)` | Modals, command palettes, toasts |

The reference exposed a set of hard offset shadows (`6px 6px 0`, `12px 12px 50px`) — unused framework presets, not part of the design. Ignore them.

---

## 6. Motion

Base: `200ms ease` (from the reference), formalized:

| Token | Value | Use |
|---|---|---|
| `duration-instant` | 100ms | Color/opacity swaps on hover |
| `duration-fast` | 150ms | Icon shifts, small transforms |
| `duration-base` | 200ms | Default — buttons, inputs, chips |
| `duration-slow` | 320ms | Accordions, dropdowns, tab panels |
| `duration-deliberate` | 500ms | Section reveals, hero entrances |
| `ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` | Default |
| `ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Entrances |
| `ease-in` | `cubic-bezier(0.7, 0, 0.84, 0)` | Exits |

**Rules**
- Animate `transform` and `opacity` only. Never animate `width`, `height`, `top`, or `box-shadow` in a hover state.
- Hover motion is subtle: `translateY(-2px)` on cards, `translateX(2px)` on arrow icons. Nothing scales more than `1.02`.
- Image hover: `scale(1.04)` on the image inside an `overflow: hidden` rounded frame — the frame never moves.
- Section reveals: 16px rise + fade, `duration-deliberate`, `ease-out`, staggered 60ms. Once only — never re-trigger on scroll-up.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 7. Z-index

The reference used ad-hoc values (1000 / 9997 / 9999). Replaced with a clean scale — nothing may exceed `800`.

| Token | Value |
|---|---|
| `z-base` | 0 |
| `z-raised` | 10 |
| `z-sticky` | 100 |
| `z-header` | 200 |
| `z-dropdown` | 300 |
| `z-overlay` | 400 |
| `z-modal` | 500 |
| `z-popover` | 600 |
| `z-toast` | 700 |
| `z-tooltip` | 800 |

---

## 8. Components

### 8.1 Button

Pill-shaped, weight 600, no shadow, no border on the primary variant.

| Size | Padding | Font | Height |
|---|---|---|---|
| `sm` | 12px 20px | 14px/600 | 40px |
| `md` | 16px 28px | 15px/600 | 48px |
| `lg` | 20px 36px | 16px/600 | 56px |
| `xl` | 24px 40px | 16px/600 | 64px |

| Variant | Rest | Hover | Active | Disabled |
|---|---|---|---|---|
| **Primary** | `magenta-500` bg, white text | `magenta-600`, `translateY(-1px)` | `magenta-700`, `translateY(0)` | `ink-50` bg, `ink-300` text |
| **Secondary** | transparent, `1px ink-100` border, `ink-500` text | `canvas` bg, `ink-200` border | `ink-50` bg | 40% opacity |
| **Ink** | `ink-900` bg, white text | `ink-700` | `ink-800` | as primary |
| **Ghost** | transparent, `magenta-700` text | `magenta-50` bg | `magenta-100` bg | 40% opacity |
| **On-dark** | white bg, `ink-900` text | `#F1F1F2` | `#E4E4E6` | 30% opacity |

- Buttons with a trailing arrow use a circular icon well (`radius-pill`, 40–52px) offset to the right; the arrow translates `2px` on hover.
- Full-width buttons only below `md`.
- Minimum touch target 44×44px — `sm` buttons need surrounding padding on touch.

### 8.2 Link

- Default: `ink-500`, `text-decoration: underline`, `text-underline-offset: 3px`, `text-decoration-color: var(--et-border)`.
- Hover: `magenta-700`, underline color inherits.
- Inline links inside prose are `magenta-700` at rest — in body copy, color is the affordance and underline is the confirmation.
- Nav links are undecorated `ink-500`; active gets `magenta-700` + a 2px `magenta-500` underline offset 6px.
- The reference's `#1A1A1A` link color is a near-black with no hover distinction — replaced.

### 8.3 Input / textarea / select

| Property | Value |
|---|---|
| Background | `surface` |
| Border | `1px solid ink-100` |
| Radius | `radius-pill` (single-line) · `radius-lg` (textarea) |
| Padding | 16px 24px (`md`) · 18px 28px (`lg`) |
| Font | 16px/400 (never below 16px — iOS zooms) |
| Placeholder | `ink-300` |
| Hover | border `ink-200` |
| Focus | border `magenta-500` + focus ring (§10) |
| Error | border `danger`, message in `danger` text below, 8px gap |
| Disabled | `ink-50` bg, `ink-300` text |

Labels sit above the field: `caption`, `ink-400`, 8px gap. Never rely on placeholders as labels.

### 8.4 Card

| Property | Value |
|---|---|
| Background | `surface` |
| Radius | `radius-lg` (28px) |
| Padding | 32px mobile / 40px desktop |
| Border | none (tone elevation) — or `1px ink-100` when on a `surface` background |
| Hover (interactive only) | `translateY(-2px)`, `duration-base` |

Variants:
- **Media card** — image at `radius-md` filling the top, `overflow: hidden`, content padded below. Image scales `1.04` on hover.
- **Floating card** — the hero/band overhang. `surface`, `radius-xl`, `float` shadow, deliberately crossing the band edge by 40–80px.
- **Tinted card** — `magenta-50` bg, `magenta-200` border, for testimonials and highlight callouts.
- **Dark card** — `ink-800` on ink bands, white text, `1px rgba(255,255,255,0.08)` border.

### 8.5 Eyebrow chip

The section-kicker signature. Pill, `magenta-50` bg, `magenta-700` text, `eyebrow` type, 8px 16px padding, optional 6px `magenta-500` dot or icon leading. One per section, above the `h2`.

### 8.6 Badge

Pill, 4px 12px, 12px/600. Neutral: `ink-50`/`ink-400`. Accent: `magenta-100`/`magenta-900`. Semantic: `*-surface`/`*` text pair.

### 8.7 Filter chips (tabs)

Pill, 12px 24px, 14px/500. Rest: transparent + `1px ink-100`, `ink-400` text. Active: `magenta-500` fill, white text, no border. On dark bands: rest is `rgba(255,255,255,0.08)` fill with white text.

Implement as a real tablist (`role="tablist"`, arrow-key navigation), not styled buttons.

### 8.8 Icon tile

The process/feature-list marker. 48–56px square, `radius-sm`, `magenta-50` bg, `magenta-700` 24px icon. On dark: `rgba(255,255,255,0.06)` bg, white icon.

### 8.9 Header / nav

- Height 80px desktop, 64px mobile. `surface` background, transparent over the hero until scrolled.
- On scroll: background solidifies, `float` shadow appears, height shrinks to 64px, `duration-base`.
- Contains: logo left, links center, one `md` primary pill CTA right.
- Below `md`: links collapse to a full-screen sheet; the CTA stays visible in the bar.
- `z-header`, sticky.

### 8.10 Footer

`ink-900`, `space-24` vertical padding. 4 columns above `lg`, stacked below. Headings `caption` uppercase `ink-300`; links `#B9BEC7` → white on hover. Newsletter input uses the on-dark field treatment (`rgba(255,255,255,0.06)` fill, `rgba(255,255,255,0.12)` border).

### 8.11 Comparison table

For package and feature comparisons where the column relationship matters semantically. Use a real
`<table>` with a visible caption and scoped row/column headers; do not fake tabular data with cards
alone.

| Part | Treatment |
|---|---|
| Wrapper | `overflow-x: auto`, full width, `radius-lg`, `1px ink-100` border, `surface` background |
| Minimum width | 760px so three tier columns remain scannable; the wrapper scrolls on mobile |
| Caption | `caption` type, `ink-400`, left-aligned, padded inside the wrapper |
| Header row | `ink-900` background, white text, `caption` type, uppercase |
| First column | Sticky on narrow screens, `surface` background, 220px width, `h4`-like weight |
| Body cells | `body-sm`, `ink-400`, 20px padding, `1px ink-100` dividers |
| Zebra rows | No. Use plain white rows so detailed inclusions stay calm and readable |
| Emphasis | Use weight, not extra colour. Magenta stays reserved for primary actions |

Mobile behaviour: the table scrolls inside its own wrapper; the page body must not gain horizontal
scroll at 390px. Keep the cards if they carry narrative detail, but the table should appear first
when it is the primary comparison aid.

---

## 9. Imagery

- All imagery is rounded: `radius-xl` for feature images, `radius-md` inside cards, `radius-2xl` for hero/band blocks.
- Full-bleed images carrying text need a scrim: `linear-gradient(to top, rgba(20,20,22,0.75), rgba(20,20,22,0.15) 60%, transparent)`. Test the text against the *lightest* point of the image, not the average.
- Aspect ratios: `16/9` band, `4/3` feature, `3/2` card, `1/1` avatar/thumb. Always set `aspect-ratio` to prevent layout shift.
- Logos in trust strips: grayscale, `opacity: 0.6`, uniform optical height (~28px), never uniform bounding-box height.
- `loading="lazy"` + `decoding="async"` on everything below the fold; the hero image is `fetchpriority="high"` and eager.

---

## 10. Accessibility

The reference ships a `0px` focus ring. **We do not.** This is the one place we deliberately contradict the source.

```css
:focus-visible {
  outline: 3px solid color-mix(in srgb, var(--et-accent) 55%, transparent);
  outline-offset: 2px;
  border-radius: inherit;
}
```

- On `magenta-500` fills, the ring switches to `ink-900` at 60% so it stays visible against its own color.
- **Never remove focus styles.** `outline: none` without a replacement fails WCAG 2.4.7.
- Color is never the only signal — pair with an icon, underline, weight, or text.
- Interactive targets ≥44×44px.
- Respect `prefers-reduced-motion` (§6) and `prefers-contrast: more` (borders go `ink-400`, muted text goes `ink-400`).
- Every image band with text over it needs its contrast verified against the actual asset.
- Heading levels are sequential — style comes from the type token, not the tag.

---

## 11. Token reference

```css
:root {
  /* ---- Brand ---- */
  --et-magenta-50:  #FFF0F8;
  --et-magenta-100: #FFDCEF;
  --et-magenta-200: #FCB8DB;
  --et-magenta-300: #F587BF;
  --et-magenta-400: #EC4BA0;
  --et-magenta-500: #DD0880;
  --et-magenta-600: #C40772;
  --et-magenta-700: #B10666;
  --et-magenta-800: #8E0552;
  --et-magenta-900: #6B043E;

  /* ---- Neutrals ---- */
  --et-ink-900: #141416;
  --et-ink-800: #1C1C20;
  --et-ink-700: #24242A;
  --et-ink-500: #2A2A2A;
  --et-ink-400: #545C66;
  --et-ink-300: #69727D;
  --et-ink-200: #C4C4C4;
  --et-ink-100: #D9D9D9;
  --et-ink-50:  #F1F1F2;

  /* ---- Semantic surfaces ---- */
  --et-canvas:          #FAFAFA;
  --et-surface:         #FFFFFF;
  --et-surface-raised:  #FFFFFF;
  --et-surface-accent:  var(--et-magenta-50);
  --et-surface-inverse: var(--et-ink-900);

  /* ---- Semantic text ---- */
  --et-text:           var(--et-ink-500);
  --et-text-secondary: var(--et-ink-400);
  --et-text-muted:     var(--et-ink-300);
  --et-text-inverse:   #F4F4F5;
  --et-text-accent:    var(--et-magenta-700);

  /* ---- Semantic action ---- */
  --et-accent:         var(--et-magenta-500);
  --et-accent-hover:   var(--et-magenta-600);
  --et-accent-active:  var(--et-magenta-700);
  --et-on-accent:      #FFFFFF;

  /* ---- Borders ---- */
  --et-border:        var(--et-ink-100);
  --et-border-strong: var(--et-ink-200);

  /* ---- Status ---- */
  --et-success: #0E9F6E;  --et-success-surface: #E8F7F1;
  --et-warning: #D9880B;  --et-warning-surface: #FDF3E3;
  --et-danger:  #C01515;  --et-danger-surface:  #FBEAEA;
  --et-info:    #0B6FBF;  --et-info-surface:    #E8F1FA;

  /* ---- Typography ---- */
  --et-font: Jost, "Jost Variable", ui-sans-serif, system-ui,
             "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --et-text-display: clamp(2.5rem, 1.6rem + 3.6vw, 4.25rem);
  --et-text-h1:      clamp(2.125rem, 1.6rem + 2.1vw, 3.125rem);
  --et-text-h2:      clamp(1.75rem, 1.45rem + 1.2vw, 2.375rem);
  --et-text-h3:      clamp(1.375rem, 1.25rem + 0.5vw, 1.75rem);
  --et-text-h4:      clamp(1.125rem, 1.05rem + 0.3vw, 1.375rem);
  --et-text-lead:    clamp(1.0625rem, 1rem + 0.25vw, 1.25rem);
  --et-text-body:    1rem;
  --et-text-sm:      0.875rem;
  --et-text-caption: 0.8125rem;
  --et-text-eyebrow: 0.75rem;
  --et-leading-tight: 1.15;
  --et-leading-snug:  1.3;
  --et-leading-body:  1.5;

  /* ---- Spacing (4px grid) ---- */
  --et-space-1: 4px;    --et-space-2: 8px;    --et-space-3: 12px;
  --et-space-4: 16px;   --et-space-5: 20px;   --et-space-6: 24px;
  --et-space-7: 28px;   --et-space-8: 32px;   --et-space-9: 36px;
  --et-space-10: 40px;  --et-space-12: 48px;  --et-space-14: 56px;
  --et-space-16: 64px;  --et-space-20: 80px;  --et-space-24: 96px;
  --et-space-30: 120px; --et-space-40: 160px;

  /* ---- Layout ---- */
  --et-container-max:    1280px;
  --et-container-wide:   1440px;
  --et-container-narrow: 720px;
  --et-gutter: 20px;

  /* ---- Radius ---- */
  --et-radius-sm:   12px;
  --et-radius-md:   20px;
  --et-radius-lg:   28px;
  --et-radius-xl:   40px;
  --et-radius-2xl:  56px;
  --et-radius-pill: 999px;

  /* ---- Elevation ---- */
  --et-shadow-float:   0 8px 24px rgba(20, 20, 22, 0.08);
  --et-shadow-overlay: 0 24px 64px rgba(20, 20, 22, 0.18);

  /* ---- Motion ---- */
  --et-duration-instant:    100ms;
  --et-duration-fast:       150ms;
  --et-duration-base:       200ms;
  --et-duration-slow:       320ms;
  --et-duration-deliberate: 500ms;
  --et-ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --et-ease-out:      cubic-bezier(0.16, 1, 0.3, 1);
  --et-ease-in:       cubic-bezier(0.7, 0, 0.84, 0);

  /* ---- Z-index ---- */
  --et-z-raised: 10;   --et-z-sticky: 100;  --et-z-header: 200;
  --et-z-dropdown: 300; --et-z-overlay: 400; --et-z-modal: 500;
  --et-z-popover: 600;  --et-z-toast: 700;   --et-z-tooltip: 800;
}

@media (min-width: 768px)  { :root { --et-gutter: 32px; } }
@media (min-width: 1280px) { :root { --et-gutter: 40px; } }

[data-theme="dark"] {
  --et-canvas:          #141416;
  --et-surface:         #1C1C20;
  --et-surface-raised:  #24242A;
  --et-surface-accent:  #2A0F20;
  --et-surface-inverse: #F4F4F5;

  --et-text:           #F4F4F5;
  --et-text-secondary: #B9BEC7;
  --et-text-muted:     #9098A3;
  --et-text-inverse:   #141416;
  --et-text-accent:    var(--et-magenta-400);

  --et-accent:        var(--et-magenta-500);
  --et-accent-hover:  var(--et-magenta-400);
  --et-accent-active: var(--et-magenta-600);

  --et-border:        #33333B;
  --et-border-strong: #45454F;

  --et-shadow-float:   0 8px 24px rgba(0, 0, 0, 0.45);
  --et-shadow-overlay: 0 24px 64px rgba(0, 0, 0, 0.6);
}
```

---

## 12. Deliberate deviations from the reference

Recorded so nobody "fixes" these back.

| Reference | Ours | Why |
|---|---|---|
| H1 50 / H2 50 / H3 46 | 50 / 38 / 28 fluid scale | Three near-identical sizes give no hierarchy |
| `focus: 0px` | 3px accent ring, 2px offset | WCAG 2.4.7; the source fails it |
| `0.8px` borders | `1px` | Sub-pixel borders render inconsistently |
| 80px button / 30px input radius | `999px` pill for both | Stays pill at every control height, not just one |
| `#1A1A1A` links | `ink-500` + `magenta-700` hover | Source links were indistinguishable from body text |
| WordPress preset palette, Swiper blue, Elementor shadows | dropped | Framework defaults, never part of the design |
| Hard offset shadows (`6px 6px 0`) | 2-tier soft shadow, overlays only | Design is flat; those presets were unused |
| Max-width 1521px | 1280 content / 1440 wide | 1521 is an artifact; measure gets unreadable past 1280 |
| 8 scraped breakpoints (300–720px) | 5 (480/768/1024/1280/1536) | Half the source values were framework internals |
| Single `#FAFAFA` for surface + elevated | `#FFFFFF` on `#FAFAFA` | Gives flat design a working elevation step |
| Light-only | Full dark-mode token set | Inferred; accent lightens to `magenta-400` for contrast |

---

*Original system. Inspired by an extracted reference pattern; brand assets, logos, copy, and identity are not carried over.*
