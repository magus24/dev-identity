import { chromium } from 'playwright'
import http from 'node:http'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(here, '..', 'dist')

const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.png': 'image/png' }
const server = http.createServer(async (req, res) => {
  try {
    let p = decodeURIComponent(new URL(req.url, 'http://l').pathname)
    if (p === '/') p = '/index.html'
    const data = await readFile(path.join(root, p))
    res.writeHead(200, { 'content-type': TYPES[path.extname(p)] || 'application/octet-stream' })
    res.end(data)
  } catch { res.writeHead(404); res.end('nf') }
})
await new Promise((r) => server.listen(4175, r))

const CHROME = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const browser = await chromium.launch({ executablePath: CHROME })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto('http://localhost:4175/', { waitUntil: 'networkidle' })
await page.waitForTimeout(2600)

const info = await page.evaluate(() => {
  const out = {}
  const el = document.querySelector('.hero-name')
  const chain = []
  let n = el
  while (n && n !== document.body) {
    const s = getComputedStyle(n)
    chain.push({
      tag: n.tagName,
      cls: n.className?.toString?.().slice(0, 60),
      opacity: s.opacity,
      visibility: s.visibility,
      transform: s.transform,
      clip: s.clipPath,
      overflow: s.overflow,
      zIndex: s.zIndex,
      mixBlend: s.mixBlendMode,
      color: s.color,
      anim: s.animationName + ' ' + s.animationPlayState,
      rect: (() => { const r = n.getBoundingClientRect(); return [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)] })(),
    })
    n = n.parentElement
  }
  out.chain = chain
  out.heroChildren = [...document.querySelectorAll('.hero *')].slice(0, 40).map((e) => {
    const r = e.getBoundingClientRect()
    const s = getComputedStyle(e)
    return `${e.tagName}.${e.className}`.slice(0, 50) + ` op=${s.opacity} r=[${Math.round(r.x)},${Math.round(r.y)},${Math.round(r.width)},${Math.round(r.height)}]`
  })
  const p = document.elementFromPoint(300, 550)
  out.atNamePoint = p ? `${p.tagName}.${p.className}` : null
  out.stackAtName = document.elementsFromPoint(300, 550).map((e) => `${e.tagName}.${e.className}`.slice(0, 45))
  return out
})

console.log(JSON.stringify(info, null, 2))

// clipped screenshot of hero name rect for pixel stats
const buf = await page.screenshot({ clip: { x: 65, y: 451, width: 1310, height: 194 } })
const b64 = buf.toString('base64')
const stats = await page.evaluate(async (b64) => {
  const img = new Image()
  img.src = 'data:image/png;base64,' + b64
  await img.decode()
  const c = document.createElement('canvas')
  c.width = img.naturalWidth
  c.height = img.naturalHeight
  const ctx = c.getContext('2d')
  ctx.drawImage(img, 0, 0)
  const d = ctx.getImageData(0, 0, c.width, c.height).data
  let bright = 0
  let n = 0
  let sum = 0
  for (let i = 0; i < d.length; i += 4) {
    const lum = 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2]
    sum += lum
    if (lum > 180) bright++
    n++
  }
  return { mean: +(sum / n).toFixed(1), pctBright: +((bright / n) * 100).toFixed(2) }
}, b64)
console.log('hero-name rect pixels:', stats)

await browser.close()
server.close()
