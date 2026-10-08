import { chromium } from 'playwright'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const shots = path.resolve(here, '..', 'shots')

const CHROME = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const browser = await chromium.launch({ executablePath: CHROME })
const page = await browser.newPage({ viewport: { width: 400, height: 400 } })

const file = process.argv[2] || '01-hero.png'
const cols = Number(process.argv[3] || 24)
const rows = Number(process.argv[4] || 14)

const b64 = (await readFile(path.join(shots, file))).toString('base64')
const grid = await page.evaluate(
  async ({ b64, cols, rows }) => {
    const img = new Image()
    img.src = 'data:image/png;base64,' + b64
    await img.decode()
    const c = document.createElement('canvas')
    c.width = img.naturalWidth
    c.height = img.naturalHeight
    const ctx = c.getContext('2d')
    ctx.drawImage(img, 0, 0)
    const W = c.width
    const H = c.height
    const cw = Math.floor(W / cols)
    const ch = Math.floor(H / rows)
    const out = []
    for (let r = 0; r < rows; r++) {
      const row = []
      for (let col = 0; col < cols; col++) {
        const d = ctx.getImageData(col * cw, r * ch, cw, ch).data
        let sum = 0
        let max = 0
        let n = 0
        for (let i = 0; i < d.length; i += 4) {
          const lum = 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2]
          sum += lum
          if (lum > max) max = lum
          n++
        }
        row.push([Math.round(sum / n), Math.round(max)])
      }
      out.push(row)
    }
    return { size: `${W}x${H}`, cell: `${cw}x${ch}`, grid: out }
  },
  { b64, cols, rows },
)

const CHARS = ' .:-=+*#%@'
console.log(`${file} ${grid.size} cell ${grid.cell}  (mean chars, [mean/max])`)
for (const row of grid.grid) {
  const chars = row.map(([m]) => {
    const i = Math.min(CHARS.length - 1, Math.floor((m / 255) * (CHARS.length - 1) * 2.2))
    return CHARS[i]
  })
  const nums = row.map(([m, mx]) => `${String(m).padStart(3)}/${String(mx).padStart(3)}`)
  console.log(chars.join('') + '  ' + nums.join(' '))
}

await browser.close()
