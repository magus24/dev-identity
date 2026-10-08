import { chromium } from 'playwright'
import http from 'node:http'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(here, '..', 'dist')

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.png': 'image/png',
}

const server = http.createServer(async (req, res) => {
  try {
    let pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname)
    if (pathname === '/') pathname = '/index.html'
    const data = await readFile(path.join(root, pathname))
    res.writeHead(200, { 'content-type': TYPES[path.extname(path.join(root, pathname))] || 'application/octet-stream' })
    res.end(data)
  } catch {
    res.writeHead(404)
    res.end('nf')
  }
})
await new Promise((r) => server.listen(4174, r))

const CHROME = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const browser = await chromium.launch({ executablePath: CHROME })

const result = {}

for (const [name, viewport] of Object.entries({
  desktop: { width: 1440, height: 900 },
  mobile: { width: 375, height: 812 },
})) {
  const ctx = await browser.newContext({ viewport, isMobile: name === 'mobile', hasTouch: name === 'mobile' })
  const page = await ctx.newPage()
  const errors = []
  page.on('pageerror', (e) => errors.push(String(e)))
  await page.goto('http://localhost:4174/', { waitUntil: 'networkidle' })
  await page.waitForTimeout(2500)

  const audit = await page.evaluate(() => {
    const out = {}
    const cs = (sel, props) => {
      const el = document.querySelector(sel)
      if (!el) return `${sel}: MISSING`
      const s = getComputedStyle(el)
      const r = el.getBoundingClientRect()
      return {
        rect: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)],
        ...Object.fromEntries(props.map((p) => [p, s[p]])),
      }
    }

    out.heroName = cs('.hero-name', ['fontFamily', 'fontSize', 'lineHeight', 'color'])
    out.headline = cs('.hero-headline', ['fontFamily', 'fontSize', 'color'])
    out.body = cs('body', ['fontFamily', 'backgroundColor', 'color'])
    out.sectionLabel = cs('.section-label', ['fontFamily', 'fontSize', 'color'])
    out.projectTitle = cs('.project-title', ['fontSize', 'fontFamily'])
    out.metricValue = cs('.metric__value', ['fontSize'])
    out.contactTitle = cs('.contact-title', ['fontSize', 'fontFamily'])
    out.canvas = cs('canvas', ['width'])
    out.heroRect = (() => {
      const el = document.querySelector('.hero')
      const r = el.getBoundingClientRect()
      return [Math.round(r.width), Math.round(r.height)]
    })()
    out.docHeight = document.documentElement.scrollHeight
    out.vh = window.innerHeight

    // elements overflowing their own box horizontally
    out.clipped = [...document.querySelectorAll('h1, h2, h3, p, li, span, button, a')]
      .filter((el) => {
        const s = getComputedStyle(el)
        if (s.overflow === 'visible' && s.overflowX === 'visible') return false
        return el.scrollWidth > el.clientWidth + 2 && el.clientWidth > 0
      })
      .slice(0, 12)
      .map((el) => `${el.tagName}.${el.className}`.slice(0, 80))

    // text nodes wider than viewport (big offenders)
    out.widerThanViewport = [...document.querySelectorAll('h1, h2, h3, .project, .metric, .contact-title')]
      .filter((el) => el.getBoundingClientRect().width > window.innerWidth + 1)
      .map((el) => `${el.tagName}.${el.className}`)

    // headings content
    out.h2s = [...document.querySelectorAll('h2')].map((h) => h.textContent?.trim().replace(/\s+/g, ' '))

    // interactive targets smaller than 40px on this viewport
    out.smallTargets = [...document.querySelectorAll('a, button')]
      .map((el) => ({ t: `${el.tagName}.${el.className}`.slice(0, 60), r: el.getBoundingClientRect() }))
      .filter((x) => x.r.width > 0 && x.r.height > 0 && x.r.height < 40)
      .slice(0, 15)
      .map((x) => `${x.t} (${Math.round(x.r.width)}x${Math.round(x.r.height)})`)

    // duplicate ids
    const ids = [...document.querySelectorAll('[id]')].map((e) => e.id)
    out.dupIds = ids.filter((id, i) => ids.indexOf(id) !== i)

    // images without alt
    out.imgNoAlt = [...document.querySelectorAll('img')].filter((i) => !i.alt).length

    // heading order
    out.headingOrder = [...document.querySelectorAll('h1, h2, h3, h4')].map((h) => h.tagName)

    return out
  })

  result[name] = { errors, ...audit }
  await ctx.close()
}

await browser.close()
server.close()
console.log(JSON.stringify(result, null, 2))
