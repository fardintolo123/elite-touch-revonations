# Owner Tips & Tricks — Elite Touch Renovations

Advice and useful insights shared by the owner, with their source, applicability and actual status.
Maintenance: [.agents/workflows/project-knowledge.md](.agents/workflows/project-knowledge.md).
This is learning context; the existing decision register and verified business data retain their roles.

For each entry, record category, date/source, the tip, why it matters here, how it was applied or
rejected, and evidence/status. Outside advice is not automatic approval for implementation.

## Project management — sunrise and sunset (shared 2026-11-05)

**Source:** the owner pasted their professor's SOP explanation in the Codex chat
**4ElementsPainting-1 - Clarify issue tracking**, session `01a1ab57-375b-71b2-9e28-c0295498f67b`.
Implementation is tracked in [issue #97](https://github.com/fardintolo123/elite-touch-revonations/issues/97).

**The tip:** save summaries, takeaways, pending work and next actions at session checkpoints, and
recover the repository and open GitHub issues when starting. Keep important decisions discoverable
across tools and locations. Use review/testing and preserve human approval for publication and
destructive operations.

**Owner exception:** create branches only when explicitly asked. The professor's dev/feature-branch
strategy is excluded. Graphify/MemPalace are optional; their installation or benefit is not assumed.

**Why it matters here:** chats can be interrupted, titles can refer to an earlier issue, and local
changes may not be published. The next session needs actual issue, revision, verification and recovery
state rather than a claim that work is done.

**Application/status:** owner authorized the shared sunrise/sunset SOP; use this project's
[session protocol](.agents/workflows/session-management.md). Its checkpoint and issue record hold
publication/verification status. A sunset may leave work incomplete or cancelled with a stated reason.

## Project learning — preserve tips and reusable patterns (2026-11-05)

**Source:** the owner requested the same tips.md and winning-features.md mechanism used in
4ElementsPainting for ETR and Manawatu in the same Codex chat.

**The tip:** future sessions should retain the owner's advice and maintain a catalogue of useful
patterns when those patterns change, so the same context does not need to be re-explained.

**Why it matters here:** implementation reasoning and exceptions are often absent from a code diff.
Keeping their source and status makes them reusable without mistaking a proposal for completed work.

**Application/status:** these files and the [maintenance workflow](.agents/workflows/project-knowledge.md)
implement that mechanism. The initial feature catalogue is project-specific and source-verified;
measured business benefits remain unclaimed unless supported by their own evidence.

## Homepage hero height and image treatment (2026-11-09)

**Source:** owner, Codex chat: "hero section to be one screen height not more"; confirmed implementation with "read claude.md and go ahead".

**The tip:** include the sticky header in the one-screen measurement; the hero should fill only the remaining viewport.

**Agent recommendation:** keep the real first-screen project image static. Do not fade it in; it is the LCP image and should be visible immediately.

**Why it matters here:** the full-bleed photo gives the homepage a real local-project proof point, while the one-screen constraint keeps the room choices, rating, call option and written-quote/warranty facts visible.

**Application/status:** implemented locally in `app/page.tsx`, `app/page.module.css` and `components/HomeEnquiryStarter.tsx`; measured at 390×844, 1440×900 and 390×667. Final-source matched Lighthouse shows median LCP 2.644s before and 3.064s after (+420ms), above the 2.5s target and +300ms regression limit. The owner approved publishing despite this gate on 2026-11-10; release is pending safe reconciliation of `main`. A sync-decode experiment increased TBT and was reverted. See D-186, D-187 and the evidence folder.
