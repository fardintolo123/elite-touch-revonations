import { createHash } from 'node:crypto'
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const imageRoot = path.join(root, 'public', 'images', 'projects')
const projectsSource = path.join(root, 'lib', 'projects.ts')
const creator = 'Elite Touch Renovations'
const credit = 'Elite Touch Renovations'

const args = new Set(process.argv.slice(2))
const verifyOnly = args.has('--verify')

function usage() {
  console.log(`Usage:
  node scripts/inject-project-image-xmp.mjs
  node scripts/inject-project-image-xmp.mjs --verify`)
}

if (args.has('--help')) {
  usage()
  process.exit(0)
}

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function projectAltMap() {
  const source = readFileSync(projectsSource, 'utf8')
  const map = new Map()
  const imagePattern =
    /src:\s*`\$\{DIR\}\/([^`]+)`\s*,\s*alt:\s*(['"])(.*?)\2/g

  for (const match of source.matchAll(imagePattern)) {
    const relativePath = path
      .join(imageRoot, ...match[1].split('/'))
      .toLowerCase()
    map.set(relativePath, match[3])
  }

  return map
}

function walkWebp(dir) {
  const files = []

  for (const item of readdirSync(dir, { withFileTypes: true })) {
    const itemPath = path.join(dir, item.name)

    if (item.isDirectory()) {
      files.push(...walkWebp(itemPath))
    } else if (item.isFile() && item.name.toLowerCase().endsWith('.webp')) {
      files.push(itemPath)
    }
  }

  return files.sort()
}

function parseWebp(buffer, file) {
  if (
    buffer.length < 12 ||
    buffer.toString('ascii', 0, 4) !== 'RIFF' ||
    buffer.toString('ascii', 8, 12) !== 'WEBP'
  ) {
    throw new Error(`${file} is not a RIFF WebP file`)
  }

  const chunks = []
  let offset = 12

  while (offset + 8 <= buffer.length) {
    const type = buffer.toString('ascii', offset, offset + 4)
    const size = buffer.readUInt32LE(offset + 4)
    const dataStart = offset + 8
    const dataEnd = dataStart + size
    const paddedEnd = dataEnd + (size % 2)

    if (paddedEnd > buffer.length) {
      throw new Error(`${file} has a truncated ${type} chunk`)
    }

    chunks.push({
      type,
      data: buffer.subarray(dataStart, dataEnd),
      raw: buffer.subarray(offset, paddedEnd),
    })

    offset = paddedEnd
  }

  if (offset !== buffer.length) {
    throw new Error(`${file} has trailing bytes outside a WebP chunk`)
  }

  return chunks
}

function xmpPacket(description) {
  const maybeDescription = description
    ? `
    <dc:description>
      <rdf:Alt>
        <rdf:li xml:lang="x-default">${escapeXml(description)}</rdf:li>
      </rdf:Alt>
    </dc:description>`
    : ''

  return `<?xpacket begin="" id="W5M0MpCehiHzreSzNTczkc9d"?>
<x:xmpmeta xmlns:x="adobe:ns:meta/">
  <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
    <rdf:Description rdf:about=""
      xmlns:dc="http://purl.org/dc/elements/1.1/"
      xmlns:photoshop="http://ns.adobe.com/photoshop/1.0/"
      xmlns:xmpRights="http://ns.adobe.com/xap/1.0/rights/">
      <dc:creator>
        <rdf:Seq>
          <rdf:li>${escapeXml(creator)}</rdf:li>
        </rdf:Seq>
      </dc:creator>
      <photoshop:Credit>${escapeXml(credit)}</photoshop:Credit>
      <dc:rights>
        <rdf:Alt>
          <rdf:li xml:lang="x-default">&#169; ${escapeXml(creator)}</rdf:li>
        </rdf:Alt>
      </dc:rights>${maybeDescription}
      <xmpRights:Marked>True</xmpRights:Marked>
    </rdf:Description>
  </rdf:RDF>
</x:xmpmeta>
<?xpacket end="w"?>`
}

function chunk(type, data) {
  const header = Buffer.alloc(8)
  header.write(type, 0, 4, 'ascii')
  header.writeUInt32LE(data.length, 4)

  return data.length % 2
    ? Buffer.concat([header, data, Buffer.from([0])])
    : Buffer.concat([header, data])
}

function withXmp(buffer, file, description) {
  const chunks = parseWebp(buffer, file)
  const preserved = chunks
    .filter((item) => item.type !== 'XMP ')
    .map((item) => item.raw)
  const xmp = chunk('XMP ', Buffer.from(xmpPacket(description), 'utf8'))
  const body = Buffer.concat([Buffer.from('WEBP', 'ascii'), ...preserved, xmp])
  const header = Buffer.alloc(8)
  header.write('RIFF', 0, 4, 'ascii')
  header.writeUInt32LE(body.length, 4)

  return Buffer.concat([header, body])
}

function xmpText(buffer, file) {
  const xmp = parseWebp(buffer, file).find((item) => item.type === 'XMP ')
  return xmp ? xmp.data.toString('utf8') : ''
}

function hasRequiredXmp(buffer, file) {
  const xmp = xmpText(buffer, file)

  return (
    xmp.includes('<dc:creator>') &&
    xmp.includes(`<rdf:li>${creator}</rdf:li>`) &&
    xmp.includes(`<photoshop:Credit>${credit}</photoshop:Credit>`) &&
    xmp.includes('&#169; Elite Touch Renovations')
  )
}

const altByPath = projectAltMap()
const files = walkWebp(imageRoot)
let changed = 0
let verified = 0
const failures = []
const missingDescriptions = []

for (const file of files) {
  const key = file.toLowerCase()
  const description = altByPath.get(key)
  const before = readFileSync(file)

  if (!description) missingDescriptions.push(path.relative(root, file))

  if (verifyOnly) {
    if (hasRequiredXmp(before, file)) verified += 1
    else failures.push(path.relative(root, file))
    continue
  }

  const next = withXmp(before, file, description)

  if (!before.equals(next)) {
    writeFileSync(file, next)
    changed += 1
  }

  if (!hasRequiredXmp(next, file)) {
    failures.push(path.relative(root, file))
  } else {
    verified += 1
  }
}

const status = verifyOnly ? 'verified' : 'updated'
console.log(
  `${status}=${verified} changed=${changed} files=${files.length} missingDescriptions=${missingDescriptions.length}`,
)

if (missingDescriptions.length > 0) {
  console.log('missing descriptions:')
  for (const file of missingDescriptions) console.log(`- ${file}`)
}

if (failures.length > 0) {
  console.error('missing required XMP:')
  for (const file of failures) console.error(`- ${file}`)
  process.exit(1)
}

if (!verifyOnly) {
  const sample = files.slice(0, 3).map((file) => {
    const chunks = parseWebp(readFileSync(file), file)
    const pixelHash = createHash('sha256')
      .update(
        Buffer.concat(
          chunks
            .filter((item) => item.type !== 'XMP ')
            .map((item) => item.raw),
        ),
      )
      .digest('hex')
      .slice(0, 12)

    return `${path.relative(root, file)} ${statSync(file).size} bytes pixelChunks=${pixelHash}`
  })

  console.log('sample:')
  for (const line of sample) console.log(`- ${line}`)
}
