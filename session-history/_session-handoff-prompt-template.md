# Session Handoff Prompt (template)

> Saved verbatim (with paths tailored to this project — Elite Touch Renovations, not the
> 4 Elements Painting sibling repo the original prompt named) so it can be reused at the end of
> future sessions without retyping it. See `2026-08-29-little-bay-service-area-and-gallery-readability-fix.md`
> in this folder for the first output produced from this template.

---

Before we end this session, create a detailed session handoff summary so that another Claude Code session can understand what happened here without having access to this conversation.

Save it as a Markdown file inside:

`d:\1\elite-touch-revonations\session-history\`

Use this filename:

`YYYY-MM-DD-[short-descriptive-session-name].md`

If the folder does not exist, create it.

**IMPORTANT:**
This is a temporary session-history file. Do NOT update `CLAUDE.md`, `docs/SEO_CONTENT_GUIDE.md`, or other permanent documentation during this task.

The purpose of this file is to preserve the useful knowledge from THIS conversation so I can later give all session summaries to another Claude Code session and have it consolidate them into the project's permanent documentation.

## Include the following sections

# Session Summary

## 1. Session Objective
What we were trying to accomplish in this session.

## 2. Work Completed
List exactly what was implemented, changed, fixed, created, deleted, or tested.

Include relevant:
- Files
- Components
- Pages
- Configuration
- SEO changes
- Performance changes
- Design changes
- Dependencies
- Commands/tests performed

## 3. Important Decisions
Record important decisions made during the conversation.

For each decision explain:
- Decision
- Reason
- Alternatives considered
- Why the chosen approach was preferred

## 4. Permanent Rules / Lessons
Identify anything learned during this session that future Claude Code sessions should probably follow.

Examples:
- Performance rules
- SEO rules
- Component rules
- Design rules
- Content rules
- Development workflow rules
- Things we should avoid repeating

Do NOT assume every implementation detail is a permanent rule.

Only include rules that are likely to remain useful.

## 5. Things We Explicitly Decided NOT To Do
Record important rejected approaches, libraries, strategies, redesigns, optimizations, etc.

Include the reason when known.

This is important so future sessions do not unnecessarily reconsider decisions we already rejected.

## 6. Current Project State
Describe the state of the project at the end of this session.

Include:
- What is currently working
- What is incomplete
- What is partially implemented
- Known issues
- Known limitations
- Current performance state
- Current SEO state
- Current design/UI state

## 7. Files Changed
Provide a table:

| File | Change | Reason |
|------|--------|--------|

Only include files actually changed during this session.

## 8. Files Created
List newly created files and explain their purpose.

## 9. Files Deleted
List deleted files and why they were deleted.

## 10. Tests and Validation
Record:
- Builds
- TypeScript checks
- Lint
- Lighthouse
- PageSpeed
- SEO validation
- Browser testing
- Any other tests performed

Include results where available.

## 11. Performance Impact
If this session affected performance, document:

- Before measurements
- After measurements
- Lighthouse score
- LCP
- FCP
- TBT/INP
- CLS
- Bundle-size changes
- New dependencies
- Any known regressions

If performance was not measured, explicitly say so.

## 12. SEO Impact
If SEO was affected, document:

- Pages changed
- Keywords
- Search intent
- Internal linking
- Metadata
- Schema
- Indexation
- Canonicals
- Location strategy
- Content changes

If SEO was not affected, say so.

## 13. Remaining Tasks
List unfinished work in priority order:

### High Priority
...

### Medium Priority
...

### Low Priority
...

## 14. Open Questions
List decisions or issues that still need to be resolved.

## 15. Next Session Handoff
Give the next Claude Code session clear instructions about:

- What to inspect first
- What should be continued
- What should NOT be changed
- Important context they need
- Relevant files they should read

## 16. Potential Documentation Updates
This is especially important.

Identify information from this session that may eventually belong in:

- `CLAUDE.md`
- `docs/SEO_CONTENT_GUIDE.md`
- `docs/PERFORMANCE_BUDGET.md`
- `DESIGN.md`
- `PROJECT_CONTEXT.md`
- `DECISIONS.md`
- Other permanent documentation

DO NOT update those files now.

Simply recommend what information should eventually be moved there.

## 17. Conversation-Derived Insights
Capture important insights from our discussion that may not be obvious from the codebase.

Separate these into:

- Confirmed decisions
- Strong recommendations
- Ideas/proposals
- Unresolved opinions

Do not present ideas or proposals as confirmed decisions.

# Accuracy Rules

Be factual.

Do not invent information.

Do not claim something was implemented if it was only discussed.

Clearly distinguish between:

- Implemented
- Planned
- Recommended
- Rejected
- Unknown

The current codebase should be treated as the source of truth for what is actually implemented.

The conversation should be used to capture decisions, reasoning, context, and lessons that cannot be determined from the code alone.

Keep the summary detailed enough that another Claude Code session can reconstruct the important context without reading this conversation.

After creating the file, verify that it exists and report the exact file path.
