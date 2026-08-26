# Plan — intake of "Projects Before & After (1)" photo batch

**Source.** `C:\Users\Administrator\Downloads\Projects Before & After (1)\` — 9 folders, each with
before/after photos and a "Project Info" document (`.docx`/`.rtf`), supplied outside the repo.
Not yet in `docs/IMAGE_INVENTORY.md`. Routed per `CLAUDE.md` "Photos / images" row → D-36 pipeline
(Detect → Inventory → Verify → Flag issues → Approve → Add to repo → Commit → asset URL → alt text).

## Checklist

- [x] **Detect** — 9 folders enumerated, 38 photos + 9 Project Info docs confirmed present.
- [x] **Inventory** — every Project Info doc extracted to plain text (`.docx` via XML unzip,
      `.rtf` via a control-word stripper — Read can't open `.docx` directly and raw RTF is
      ~90% font-table/theme noise). Facts tabulated below.
- [x] **Verify** — spot-checked before/after photos against each doc's written description
      (Mosman/Drummoyne bathroom, North Ryde/North Sydney laundry, Hunters Hill, The Rocks,
      Little Bay). No photo contradicted its doc. Full per-photo view is deferred to the
      **Add to repo** step (alt text is written from the photo, D-66) — no point doing it twice
      before Approve.
- [x] **Flag issues** — see Flags below. Several are genuine owner decisions, not agent calls.
- [x] **Approve** — user confirmed consent (2026-08-25) and answered the flags: laundry-scope
      decision delegated to agent (D-101), Mosman/Drummoyne and North Ryde/North Sydney location
      unresolved (D-102, held), Hunters Hill/Rocks merge unresolved (D-103, kept separate).
- [x] Add to repo — 6 of 9 projects added to `lib/projects.ts` (Balmain, Gladesville, Little Bay,
      Hunters Hill, The Rocks, Artarmon bathroom+ensuite). 30 photos converted to WebP and placed
      in `public/images/projects/{slug}/`. 3 held (Enmore, "North Ryde" laundry, "Mosman"/
      Drummoyne) — see DECISIONS.md D-101/D-102.
- [ ] Commit — pending build verification.
- [x] Use public asset URL — all `src` values are `/images/projects/{slug}/...`, matching D-36
      step 8.
- [x] Add accurate alt text — every one of the 30 shipped photos individually viewed; alt text
      describes the photograph, not the page topic (D-36 step 9 / PROJECT_CONTEXT.md §4.9).

## Inventory — 9 projects

| Folder | Doc says location | Photos | Type | Timeframe / budget |
|---|---|---|---|---|
| Bathrom Reno_ Artarmon | Artarmon, NSW | 5 after + 1 before | Bathroom & ensuite | 4 wks / ~$48,000 |
| Bathroom Before & After_Blmain | Balmain, NSW | 3 after + 1 before | Full bathroom | 3 wks / ~$30,000 |
| Bathroom Before & After_Gladesville | Gladesville, NSW | 4 after + 1 before | Full bathroom | 3 wks / ~$26,000 |
| Bathroom Before & After_Hunters Hill | Hunters Hill, NSW | 5 after + 1 before | Full bathroom | 4 wks / ~$45,000 |
| Bathroom Before & after_Little bay | Little Bay, NSW | 7 after + 1 before | Full bathroom | 4 wks / ~$32,000 |
| Bathroom Before & After_The Rock | The Rocks, NSW | 3 after + 1 before | Full bathroom | 4 wks / ~$32,000 |
| Bathroom renovation…_ Mosman | **Drummoyne, NSW** (folder says Mosman) | 3 after + 1 before, 2 rooms | Main bathroom + ensuite | 4 wks / ~$48,000 |
| Laundary Before & After_ Enmore | Enmore, NSW | 2 after + 1 before | **Standalone laundry** | 2 wks / ~$12,000 |
| Laundary Reno…_ North Ryde | **North Sydney, NSW** (folder says North Ryde) | 1 after + 1 before | **Standalone laundry** | 2 wks / ~$14,000 |

All nine docs give: Project Manager (Adam A or Mohammed A), Designer (Farrah A — matches D-50's
Farah Dawood/Adam Dawood), a scope-of-works list, a challenges line, and a description/outcome
paragraph. This is materially richer detail than the three existing text-only case studies.

## Flags — need an owner or user decision before Approve

1. **Consent not yet confirmed for this batch.** D-39 covers only the original 33/34 photos.
   This is a different, later-supplied folder — consent has not been separately confirmed for
   these 38 images or the project details in the docs. **Blocks all 9 regardless of the other
   flags.**
2. **Two folder names don't match their own Project Info doc:**
   - "Mosman" folder's doc states **Drummoyne, NSW**. Mosman (North Shore, published hub) and
     Drummoyne (Inner West, unpublished hub) are different regions — this isn't cosmetic, it
     changes which hub page the project would support.
   - "North Ryde" folder's doc states **North Sydney, NSW**. Same issue: North Ryde is
     North-Western Sydney (unpublished hub), North Sydney is North Shore (published hub). The
     photographed window view (distant hills, no harbour or CBD visible) doesn't obviously match
     either suburb, so guessing between the two labels isn't safe. Per D-06, neither label ships
     without confirmation of which is correct.
3. **Two projects are standalone laundry renovations** (Enmore, North Ryde/North Sydney) — no
   bathroom involved. D-01 confirms only bathroom · ensuite · bathroom-and-laundry · powder room;
   D-45 is explicit that the `laundry-renovations` slug's copy must never advertise standalone
   laundry work. Publishing either as a case study — even gallery-only — would visually claim a
   service ETR has not confirmed it sells on its own.
4. **Two projects closely resemble existing text-only case studies**, closely enough that they
   may be the same job now with photos, per the D-69 pattern (don't merge without evidence):
   - **Hunters Hill**: doc describes full-height marble walls, custom double vanity, freestanding
     bath — matches the documented "Hunters Hill marble bathroom" case study specifically (not a
     generic overlap, like D-69's Artarmon mismatch was).
   - **The Rocks**: doc's "Challenges" line is "ensuring the original heritage window was
     protected" — matches the documented "The Rocks heritage bathroom" case study's original
     19th-century window almost exactly.
   Recommend treating both as the same job as its existing case study (attach these photos to the
   existing written description) rather than shipping a second, competing "The Rocks"/"Hunters
   Hill" gallery entry — but this is exactly the kind of merge D-06 says not to make unilaterally.
5. **This Artarmon photo set is a *third* data point on an already-open question (K13/D-69).**
   Existing gallery Artarmon (gold fittings, sandy stone tiles) and the documented case-study
   Artarmon (large-format porcelain, LED mirrors, two wet areas in 4 weeks) were already left
   unmerged because their details conflict. This new folder's doc (600×600 porcelain, LED backlit
   mirror, bathroom+ensuite, 4 weeks, $48,000) matches the **case-study** description closely and
   the **gallery** photos not at all. Does not resolve K13 on its own — flagging as new evidence,
   not auto-merging.
6. **Little Bay and Enmore are not in `service-areas.json` at all** (checked: absent from every
   region). Not a blocker for a gallery entry (D-64's precedent doesn't require the suburb to be
   in the file), but Little Bay could be added to the published Eastern Suburbs hub as Tier 2 —
   optional, needs its postcode (2036) verified the way D-72 verified its own suburb list before
   being added.

## Recommendation once consent is confirmed

- **Balmain and Gladesville** have no flags beyond consent — clean to proceed to Add-to-repo as
  new gallery projects once (1) is resolved.
- **Little Bay** likewise clean beyond consent; suburb-list addition is a separate, optional step.
- **Hunters Hill and The Rocks** — ask whether to attach to the existing case study or publish as
  a distinct second project.
- **Mosman/Drummoyne and North Ryde/North Sydney** — ask which location is correct before either
  proceeds.
- **Enmore and North Ryde/North Sydney (laundry)** — ask whether ETR wants to claim standalone
  laundry work before either proceeds; if not, this photography still can't be published as a
  case study under the current service scope.
- **Artarmon** — hold pending K13, note the new evidence in `PROJECT_CONTEXT.md`.
