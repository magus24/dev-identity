import { chromium } from 'playwright'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const shots = path.resolve(here, '..', 'shots')

const CHROME = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const browser = await chromium.launch({ executablePath: CHROME })
const page = await browser.newPage({ viewport: { width: 400, height: 400 } })

async function stats(file, region) {
  const b64 = (await readFile(path.join(shots, file))).toString('base64')
  return page.evaluate(
    async ({ b64, region }) => {
      const img = new Image()
      img.src = 'data:image/png;base64,' + b64
      await img.decode()
      const c = document.createElement('canvas')
      c.width = img.naturalWidth
      c.height = img.naturalHeight
      const ctx = c.getContext('2d')
      ctx.drawImage(img, 0, 0)
      const [x, y, w, h] = region
      const data = ctx.getImageData(x, y, w, h).data
      let sum = 0
      let over200 = 0
      let over250 = 0
      let n = 0
      let blueish = 0
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i]
        const g = data[i + 1]
        const bl = data[i + 2]
        const lum = 0.2126 * r + 0.7152 * g + 0.0722 * bl
        sum += lum
        if (lum > 200) over200++
        if (lum > 250) over250++
        if (bl > r + 18 && bl > 40) blueish++
        n++
      }
      return {
        size: `${w}x${h}`,
        mean: +(sum / n).toFixed(1),
        pctOver200: +((over200 / n) * 100).toFixed(1),
        pctOver250: +((over250 / n) * 100).toFixed(1),
        pctBlueish: +((blueish / n) * 100).toFixed(1),
      }
    },
    { b64, region },
  )
}

const out = {}
// hero canvas sphere area (right 60% of 1440x900 shot)
out.sphere = await stats('01-hero.png', [700, 150, 700, 650])
out.textZone = await stats('01-hero.png', [40, 350, 660, 450])
out.whole = await stats('01-hero.png', [0, 0, 1440, 900])
console.log(JSON.stringify(out, null, 2))

await browser.close()
