// Measures the agent instruction files against the caps the tools actually enforce.
//
// Past its cap a harness truncates the file silently: the rules are still in git, but the agent
// never loads them. That is how CLAUDE.md's Next.js block went missing from every session while
// looking present in the file. Run this before adding a section, not after a rule stops working.
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('../', import.meta.url))

const FILES = [
  {
    path: 'CLAUDE.md',
    cap: 65536,
    source: 'harness instruction budget',
  },
  {
    path: 'AGENTS.md',
    cap: 32768,
    source: 'Codex project_doc_max_bytes default',
  },
]

let failed = false

for (const file of FILES) {
  let bytes
  try {
    bytes = (await readFile(path.join(ROOT, file.path))).length
  } catch {
    console.error(`${file.path}: MISSING — expected an instruction file at the repo root`)
    failed = true
    continue
  }

  const headroom = file.cap - bytes
  const used = ((bytes / file.cap) * 100).toFixed(1)

  if (headroom < 0) {
    failed = true
    console.error(
      `${file.path}: OVER by ${Math.abs(headroom)} bytes (${bytes} / ${file.cap}, ${used}%) — ` +
        `everything past ${file.cap} bytes is truncated before the agent sees it. ` +
        `Move reference material to a linked docs/ page.`,
    )
  } else {
    console.log(
      `${file.path}: ${bytes} / ${file.cap} bytes (${used}%), ${headroom} bytes headroom ` +
        `[${file.source}]`,
    )
  }
}

if (failed) {
  process.exitCode = 1
} else {
  console.log('Instructions fit their caps.')
}
