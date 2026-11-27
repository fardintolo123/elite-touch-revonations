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

## Conversion — "You overexplain" + get found / trusted / call (2026-11-25)

**Source:** the owner's mentor, quoted in a Claude Code chat on 2026-11-25. The owner also pasted a
local-business website playbook in the same chat.

**The tip:** "You overexplain too much → information overload for new visitors. Also you need
seriously optimise the conversion rate." The playbook adds: a local site has three jobs, in order (get
found, get trusted, get the call). Answer first, then prove it. One page, one next step. Keep the call
button on screen. Never count keywords. Track calls and forms by page.

**Why it matters here:** measured 2026-11-25, this site's copy is moderate (homepage 1,216 words,
9 sections). Its first screen already does the job. The leaks are elsewhere: `/contact-us/` returns
403, and nobody has split enquiries by landing page.

**Application/status:** planned, not implemented. See `plans/conversion-baseline-2026-11.md` and
milestone `Batch: Conversion — leaks & baseline`. Advice is not measured lift. Judge any later page
cut by enquiries per 100 users over 28 days.

## Workflow — Issues as execution specs for DeepSeek (2026-11-26)

**Source:** the owner, relaying advice from Gemini, in a Claude Code chat on 2026-11-26.

**The tip:** Claude writes the issues; DeepSeek runs them. Put exact file paths and one short
verification command in each issue, so the executor doesn't explore the repo. Suggested settings:
Flash, Medium or Low effort, agent teamwork off.

**Why it matters here:** issues already list the files they own. The bigger savings are line anchors,
the specific DECISIONS rows to read, and a quick check kept separate from the one-time full build.

**Application/status:** `## Execution` block added to the issue rules in CLAUDE.md (2026-11-27).
Settings were checked against the account's model list: there is no Medium effort (Low / High / Max),
`deepseek-flash` reads images and `deepseek-v4-pro` is text-only. Use High for code or design work.
The 90.6 Terminal-Bench figure is DeepSeek's own, reached at high effort. Teamwork stays off. Keep
coding keys separate from site keys.
