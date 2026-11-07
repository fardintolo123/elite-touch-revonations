import { readFile, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('../', import.meta.url))
const BASELINE_PATH = fileURLToPath(new URL('./check-design-baseline.json', import.meta.url))
const SOURCE_DIRS = ['app', 'components', 'lib']
const SOURCE_EXTENSIONS = new Set(['.css', '.js', '.jsx', '.ts', '.tsx'])
const GENERIC_PHRASES = [
  'transform your',
  'dream bathroom',
  'elevate',
  'second to none',
  'top-notch',
  'look and feel',
  'peace of mind',
  'hassle-free',
  'we pride ourselves',
]
const APPROVED_SCRIM =
  'linear-gradient(totop,rgba(20,20,22,0.75),rgba(20,20,22,0.15)60%,transparent)'
const INHERITANCE_KEYWORDS = new Set(['inherit', 'initial', 'unset', 'revert', 'revert-layer'])

function lineAt(source, index) {
  let line = 1
  for (let cursor = 0; cursor < index; cursor += 1) {
    if (source.charCodeAt(cursor) === 10) line += 1
  }
  return line
}

function relativePath(absolutePath) {
  return path.relative(ROOT, absolutePath).split(path.sep).join('/')
}

async function collectSourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const absolutePath = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      files.push(...await collectSourceFiles(absolutePath))
    } else if (entry.isFile() && SOURCE_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(absolutePath)
    }
  }

  return files
}

function stripCssComments(source) {
  return source.replace(/\/\*[\s\S]*?\*\//g, (comment) =>
    comment.replace(/[^\n]/g, ' '),
  )
}

function addHit(hits, pattern, source, index, detail) {
  const matches = hits.get(pattern) ?? []
  matches.push({ line: lineAt(source, index), detail })
  hits.set(pattern, matches)
}

function scanGradients(source, hits, sourceOffset = 0, fullSource = source) {
  const gradientPattern = /\b(?:linear|radial)-gradient\s*\(/gi
  let match

  while ((match = gradientPattern.exec(source)) !== null) {
    let depth = 1
    let end = gradientPattern.lastIndex
    while (end < source.length && depth > 0) {
      if (source[end] === '(') depth += 1
      if (source[end] === ')') depth -= 1
      end += 1
    }

    const gradient = source.slice(match.index, end)
    const normalized = gradient.toLowerCase().replace(/\s+/g, '')
    if (normalized !== APPROVED_SCRIM) {
      addHit(
        hits,
        'decorative-gradient',
        fullSource,
        sourceOffset + match.index,
        gradient.split(/\s+/).join(' '),
      )
    }
  }
}

function hasGlowShadow(value) {
  let depth = 0
  let start = 0
  const layers = []

  for (let index = 0; index < value.length; index += 1) {
    if (value[index] === '(') depth += 1
    if (value[index] === ')') depth -= 1
    if (value[index] === ',' && depth === 0) {
      layers.push(value.slice(start, index))
      start = index + 1
    }
  }
  layers.push(value.slice(start))

  return layers.some((layer) => {
    if (/var\(\s*--et-shadow-(?:float|overlay)\s*\)/i.test(layer)) return false
    const lengths = layer.match(/-?(?:\d+\.?\d*|\.\d+)(?:px|rem|em|vw|vh|%)?/gi) ?? []
    if (lengths.length < 3) return false
    const x = Number.parseFloat(lengths[0])
    const y = Number.parseFloat(lengths[1])
    const blur = Number.parseFloat(lengths[2])
    return x === 0 && y === 0 && blur > 0
  })
}

function isHardCodedRadius(value) {
  const normalized = value.trim().replace(/;$/, '').toLowerCase()
  if (INHERITANCE_KEYWORDS.has(normalized) || normalized.startsWith('var(')) return false
  return /(?:^|\s)-?(?:\d+\.?\d*|\.\d+)(?:px|rem|em|vw|vh|%)?(?:\s|$)/i.test(normalized)
}

function tokenPropertyLines(source) {
  const lines = source.split('\n')
  const tokenLines = new Set()
  let tokenDepth = 0

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]
    if (tokenDepth === 0 && /^\s*(?::root|\[data-theme=['"]dark['"]\])\s*\{/.test(line)) {
      tokenDepth = 1
    } else if (tokenDepth > 0) {
      tokenDepth += (line.match(/\{/g) ?? []).length
    }

    if (tokenDepth > 0 && /^\s*--[\w-]+\s*:/.test(line)) tokenLines.add(index + 1)

    if (tokenDepth > 0) {
      tokenDepth -= (line.match(/\}/g) ?? []).length
      if (tokenDepth < 0) tokenDepth = 0
    }
  }

  return tokenLines
}

function scanCss(source, hits) {
  const css = stripCssComments(source)
  const tokenLines = tokenPropertyLines(css)

  for (const match of css.matchAll(/\b(?:-webkit-backdrop-filter|backdrop-filter)\s*:\s*([^;}]+)/gi)) {
    addHit(hits, 'backdrop-filter', css, match.index, match[0].trim())
  }

  scanGradients(css, hits)

  for (const match of css.matchAll(/\bbox-shadow\s*:\s*([^;}]+)/gi)) {
    if (hasGlowShadow(match[1])) {
      addHit(hits, 'glow-shadow', css, match.index, match[0].trim().replace(/\s+/g, ' '))
    }
  }

  for (const match of css.matchAll(/^\s*([\w-]+)\s*:\s*([^;}]+)/gm)) {
    const property = match[1].toLowerCase()
    const propertyLine = lineAt(css, match.index)
    const valueIndex = match.index + match[0].indexOf(match[2])
    const isToken = property.startsWith('--') && tokenLines.has(propertyLine)

    if (!isToken) {
      for (const color of match[2].matchAll(/#[\da-f]{3,8}\b/gi)) {
        addHit(hits, 'hard-coded-hex', css, valueIndex + color.index, color[0])
      }
    }

    if (/^border(?:-[\w-]+)?-radius$/.test(property) && isHardCodedRadius(match[2])) {
      addHit(hits, 'hard-coded-radius', css, match.index, match[0].trim())
    }
  }

  for (const match of css.matchAll(/@keyframes\b|(?:^|[;{])\s*animation\s*:/gim)) {
    addHit(hits, 'motion', css, match.index, match[0].trim())
  }
}

function scanInlineStyles(source, hits) {
  const stylePattern = /\bstyle\s*=\s*\{\{\s*([\s\S]*?)\}\}/g
  let styleMatch

  while ((styleMatch = stylePattern.exec(source)) !== null) {
    const style = styleMatch[1]
    const styleOffset = styleMatch.index + styleMatch[0].indexOf(style)

    for (const match of style.matchAll(/\b(?:backdropFilter|WebkitBackdropFilter)\s*:/g)) {
      addHit(hits, 'backdrop-filter', source, styleOffset + match.index, match[0].trim())
    }

    scanGradients(style, hits, styleOffset, source)

    for (const match of style.matchAll(/\bboxShadow\s*:\s*(['"`])([\s\S]*?)\1/g)) {
      if (hasGlowShadow(match[2])) {
        addHit(hits, 'glow-shadow', source, styleOffset + match.index, match[0].trim())
      }
    }

    for (const match of style.matchAll(/#[\da-f]{3,8}\b/gi)) {
      addHit(hits, 'hard-coded-hex', source, styleOffset + match.index, match[0])
    }

    for (const match of style.matchAll(/\bborder(?:TopLeft|TopRight|BottomLeft|BottomRight)?Radius\s*:\s*([^,}\n]+)/gi)) {
      if (isHardCodedRadius(match[1].replace(/^['"`]|['"`]$/g, ''))) {
        addHit(hits, 'hard-coded-radius', source, styleOffset + match.index, match[0].trim())
      }
    }

    for (const match of style.matchAll(/\b(?:animation|animationName)\s*:/g)) {
      addHit(hits, 'motion', source, styleOffset + match.index, match[0].trim())
    }
  }
}

function isQuotedReview(line, phraseStart) {
  const reviewQuote = /\b(?:said|wrote|shared|commented|posted|reviewed)\s*[:,]?\s*["“]([^"”]+)["”]/gi
  let match

  while ((match = reviewQuote.exec(line)) !== null) {
    const quoteStart = match.index + match[0].indexOf(match[1])
    if (phraseStart >= quoteStart && phraseStart < quoteStart + match[1].length) return true
  }

  return false
}

function isReviewBlock(source, index) {
  const blockquote = /<blockquote\b[^>]*>([\s\S]*?)<\/blockquote>/gi
  let match

  while ((match = blockquote.exec(source)) !== null) {
    const textStart = match.index + match[0].indexOf(match[1])
    if (index >= textStart && index < textStart + match[1].length) return true
  }

  return false
}

function isCopyScanTarget(file) {
  if (/^app\/.*\/page\.tsx$/.test(file) || file === 'app/page.tsx') return true
  return /^lib\/[^/]+\.ts$/.test(file) && file !== 'lib/reviews.ts'
}

function scanCopy(source, file, hits) {
  if (!isCopyScanTarget(file) || file === 'lib/reviews.ts') return

  for (const phrase of GENERIC_PHRASES) {
    const phrasePattern = new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')
    let match

    while ((match = phrasePattern.exec(source)) !== null) {
      const lineStart = source.lastIndexOf('\n', match.index) + 1
      const lineEnd = source.indexOf('\n', match.index)
      const line = source.slice(lineStart, lineEnd < 0 ? source.length : lineEnd)
      if (isQuotedReview(line, match.index - lineStart) || isReviewBlock(source, match.index)) continue
      addHit(hits, 'generic-phrase', source, match.index, match[0])
    }
  }
}

async function scan() {
  const allFiles = []
  for (const directory of SOURCE_DIRS) {
    allFiles.push(...await collectSourceFiles(path.join(ROOT, directory)))
  }

  const results = new Map()
  for (const absolutePath of allFiles.sort()) {
    const file = relativePath(absolutePath)
    const source = await readFile(absolutePath, 'utf8')
    const hits = new Map()

    if (path.extname(file) === '.css') {
      scanCss(source, hits)
    } else {
      scanInlineStyles(source, hits)
    }

    if (/^app\/.*\/page\.tsx$/.test(file) || file === 'app/page.tsx') {
      const eyebrowMatches = [...source.matchAll(/\bet-eyebrow\b/g)]
      hits.set('et-eyebrow', eyebrowMatches.map((match) => ({
        line: lineAt(source, match.index),
        detail: 'et-eyebrow',
      })))
    }

    scanCopy(source, file, hits)
    if (hits.size > 0) {
      results.set(file, new Map([...hits].map(([pattern, matches]) => [
        pattern,
        matches.sort((a, b) => a.line - b.line),
      ])))
    }
  }

  return results
}

function serializeCounts(results) {
  const patterns = {}
  for (const [file, hits] of results) {
    for (const [pattern, matches] of hits) {
      patterns[pattern] ??= {}
      patterns[pattern][file] = matches.length
    }
  }

  return Object.fromEntries(
    Object.entries(patterns)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([pattern, files]) => [
        pattern,
        Object.fromEntries(Object.entries(files).sort(([a], [b]) => a.localeCompare(b))),
      ]),
  )
}

function parseArgs(args) {
  const options = { updateBaseline: false, reason: null }
  for (let index = 0; index < args.length; index += 1) {
    if (args[index] === '--update-baseline') {
      options.updateBaseline = true
    } else if (args[index] === '--reason') {
      options.reason = args[index + 1]
      index += 1
    } else if (args[index] === '--help') {
      options.help = true
    } else {
      throw new Error(`Unknown option: ${args[index]}`)
    }
  }

  if (options.updateBaseline && !options.reason?.trim()) {
    throw new Error('--update-baseline requires a non-empty --reason')
  }
  if (!options.updateBaseline && options.reason) {
    throw new Error('--reason can only be used with --update-baseline')
  }
  return options
}

function validateBaseline(baseline) {
  if (baseline.version !== 1 || typeof baseline.reason !== 'string' || !baseline.patterns) {
    throw new Error('Invalid design baseline: expected version 1, a reason, and pattern counts')
  }

  for (const [pattern, files] of Object.entries(baseline.patterns)) {
    if (!files || typeof files !== 'object' || Array.isArray(files)) {
      throw new Error(`Invalid design baseline counts for ${pattern}`)
    }
    for (const [file, count] of Object.entries(files)) {
      if (!Number.isInteger(count) || count < 0) {
        throw new Error(`Invalid design baseline count for ${pattern} in ${file}`)
      }
    }
  }
}

function printEyebrows(results, baselinePatterns) {
  console.log('Advisory eyebrow counts by route file (pattern 5; does not fail):')
  for (const [file, hits] of results) {
    const matches = hits.get('et-eyebrow')
    if (!matches) continue
    const baseline = baselinePatterns['et-eyebrow']?.[file] ?? 0
    console.log(`  ${file}: ${matches.length} (baseline ${baseline})`)
  }
}

function printViolations(results, baselinePatterns) {
  let violations = 0
  for (const [file, hits] of results) {
    for (const [pattern, matches] of hits) {
      if (pattern === 'et-eyebrow') continue
      const baseline = baselinePatterns[pattern]?.[file] ?? 0
      if (matches.length <= baseline) continue

      for (const hit of matches.slice(baseline)) {
        console.error(`  ${file}:${hit.line}  ${pattern}: ${hit.detail}`)
        violations += 1
      }
      console.error(`    ${file}: ${pattern} count ${matches.length} exceeds baseline ${baseline}`)
    }
  }
  return violations
}

async function main() {
  const options = parseArgs(process.argv.slice(2))
  if (options.help) {
    console.log('Usage: node scripts/check-design.mjs [--update-baseline --reason "text"]')
    return
  }

  const results = await scan()
  const currentPatterns = serializeCounts(results)

  if (options.updateBaseline) {
    const baseline = {
      version: 1,
      reason: options.reason.trim(),
      patterns: currentPatterns,
    }
    await writeFile(BASELINE_PATH, `${JSON.stringify(baseline, null, 2)}\n`, 'utf8')
    console.log(`Updated ${relativePath(BASELINE_PATH)}: ${options.reason.trim()}`)
    return
  }

  const baseline = JSON.parse(await readFile(BASELINE_PATH, 'utf8'))
  validateBaseline(baseline)
  printEyebrows(results, baseline.patterns)
  const violations = printViolations(results, baseline.patterns)

  if (violations > 0) {
    console.error(`\nFAIL: ${violations} design pattern hit(s) exceed the committed baseline.`)
    process.exitCode = 1
  } else {
    console.log('\nPASS: no mechanical design pattern count exceeds the committed baseline.')
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error))
  process.exitCode = 1
})
