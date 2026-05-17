const fs = require('fs')
const path = require('path')

const repoRoot = path.resolve(__dirname, '..')
const srcDir = path.join(repoRoot, 'src')
const assetsDir = path.join(srcDir, 'assets')

if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true })

function walk(dir, exts = ['.ts', '.tsx', '.js', '.jsx']) {
  const out = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...walk(full, exts))
    else if (exts.includes(path.extname(entry.name))) out.push(full)
  }
  return out
}

const files = walk(srcDir)
const regex = /figma:asset\/([A-Za-z0-9]+\.png)/g
const found = new Set()

for (const file of files) {
  try {
    const content = fs.readFileSync(file, 'utf8')
    let m
    while ((m = regex.exec(content)) !== null) found.add(m[1])
  } catch (e) {
    // ignore unreadable files
  }
}

// 1x1 transparent PNG (base64)
const tinyPngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII='
const pngBuffer = Buffer.from(tinyPngBase64, 'base64')

let created = 0
for (const name of found) {
  const target = path.join(assetsDir, name)
  if (!fs.existsSync(target)) {
    fs.writeFileSync(target, pngBuffer)
    console.log('Created placeholder:', path.relative(repoRoot, target))
    created++
  }
}

console.log(`Placeholders checked: ${found.size}, created: ${created}`)
