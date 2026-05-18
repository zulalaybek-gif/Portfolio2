const fs = require('fs')
const path = require('path')

const rootDir = path.resolve(__dirname, '..')
const sourceDir = path.join(rootDir, 'src')
const assetsDir = path.join(sourceDir, 'assets')
const assetImportPattern = /figma:asset\/([^"')\s;]+)/g

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === 'dist') continue
      walk(fullPath, files)
      continue
    }

    if (/\.(tsx?|jsx?)$/.test(entry.name)) {
      files.push(fullPath)
    }
  }

  return files
}

function getPngDimensions(filePath) {
  const buffer = fs.readFileSync(filePath)
  const isPng =
    buffer.length > 24 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47

  if (!isPng) return null

  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  }
}

const imports = new Map()

for (const filePath of walk(sourceDir)) {
  const source = fs.readFileSync(filePath, 'utf8')
  let match

  while ((match = assetImportPattern.exec(source))) {
    const filename = match[1]
    const locations = imports.get(filename) ?? []
    locations.push(path.relative(rootDir, filePath))
    imports.set(filename, locations)
  }
}

const missing = []
const placeholders = []
const valid = []

for (const [filename, locations] of imports) {
  const assetPath = path.join(assetsDir, filename)

  if (!fs.existsSync(assetPath)) {
    missing.push({ filename, locations })
    continue
  }

  const dimensions = filename.toLowerCase().endsWith('.png') ? getPngDimensions(assetPath) : null
  const stats = fs.statSync(assetPath)

  if (dimensions?.width === 1 && dimensions?.height === 1) {
    placeholders.push({ filename, locations, size: stats.size })
    continue
  }

  valid.push({ filename, locations, dimensions, size: stats.size })
}

function printGroup(title, items) {
  if (!items.length) return

  console.log(`\n${title} (${items.length})`)
  console.log('-'.repeat(title.length + 5))

  for (const item of items.slice(0, 80)) {
    const firstLocation = item.locations[0]
    const extraLocations = item.locations.length > 1 ? ` (+${item.locations.length - 1})` : ''
    const detail = item.size ? ` - ${item.size} bytes` : ''
    console.log(`${item.filename}${detail} -> ${firstLocation}${extraLocations}`)
  }

  if (items.length > 80) {
    console.log(`... ${items.length - 80} more`)
  }
}

console.log('Figma asset audit')
console.log('=================')
console.log(`Imports found: ${imports.size}`)
console.log(`Valid assets: ${valid.length}`)
console.log(`Missing assets: ${missing.length}`)
console.log(`1x1 placeholder assets: ${placeholders.length}`)

printGroup('Missing assets', missing)
printGroup('1x1 placeholder assets', placeholders)

if (missing.length || placeholders.length) {
  process.exitCode = 1
}
