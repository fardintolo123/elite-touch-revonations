# Checkpoint — Contact page hero (D-184)

- **Task:** apply D-174 to `/contact-us/` (owner: "Yes, Contact", after the remaining-pages density audit, finding 9).
- **Session / ref:** Claude Code, 2026-11-08. Built in a detached worktree (`D:\tmp\etr-contact`) on `HEAD` plus the other
  session's uncommitted #76 Contact edits; committed on `main` (HEAD `6592675` at the time) as my lines only (blob built from
  `HEAD`, then my edits applied to the shared working file so its uncommitted #76 changes stay uncommitted).
- **Done:** hero lead shortened; Call button + inline rating + "Or send us your details" link in the hero; form anchor
  (`#send-details`); duplicate Call/rating and licence/ABN chips removed from the column. File: `app/contact-us/page.tsx`.
- **Not mine / still uncommitted in the working tree:** the #76 follow-up (form card `alignSelf: 'start'`, steps row) by
  another session; plans/docs edits by others.
- **Verification (source `6592675` + the #76 working edits + mine):** production build green; served-HTML check; browser
  check of the anchor at 390 and 1440; `check:design` PASS; `check:readability` `/contact-us/` PASS 80.7; independent
  `vision-auditor` review: no P0, its one P1 fixed.
- **Blockers / environment:** the C: drive reached 0 bytes free during this session, which broke npm, the browser temp
  files and this tool's own output; temp and cache were redirected to `D:\tmp\etr-scratch` to finish. The owner should free
  space on C: (or set `CLAUDE_CODE_TMPDIR` to a D: folder).
- **Open:** "Skip - I am not sure yet" is the only filled button in the form card; the steps row is cramped at 1440;
  rest of the audit (blog index and post template, homepage pink band, shared Book block).
- **Next exact action:** `sunrise` then take the blog index (78 equal rows, about 25 screens on a phone) from
  `.impeccable/critique/2026-11-04-remaining-pages-density-audit.md` finding 12.
- **GitHub:** no issue was named for this task; nothing synced. No push.
