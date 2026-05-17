const fs = require('fs')
const path = require('path')
const glob = require('glob')

const repoRoot = path.resolve(__dirname, '..')
const srcDir = path.join(repoRoot, 'src')
const assetsDir = path.join(srcDir, 'assets')

if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true })

const files = glob.sync(path.join(srcDir, '**/*.{ts,tsx,js,jsx}'))
const regex = /figma:asset\/([A-Za-z0-9]+\.png)/g
const found = new Set()

for (const file of files) {
  try {
    const content = fs.readFileSync(file, 'utf8')
    let m
    while ((m = regex.exec(content)) !== null) found.add(m[1])
  } catch (e) {
    // ignore
  }
}

let created = 0
for (const name of found) {
  const target = path.join(assetsDir, name)
  if (!fs.existsSync(target)) {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='512' height='512'><rect width='100%' height='100%' fill='%23EEE'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='24' fill='%23999'>${name}</text></svg>`
    fs.writeFileSync(target, svg, 'utf8')
    console.log('Created placeholder:', path.relative(repoRoot, target))
    created++
  }
}

console.log(`Placeholders checked: ${found.size}, created: ${created}`)
