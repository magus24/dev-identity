import { chromium } from 'playwright'
import http from 'node:http'
import { readFile } from 'node:fs/promises'
import { mkdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(here, '..', 'dist')
const shots = path.resolve(here, '..', 'shots')
mkdirSync(shots, { recursive: true })

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.png': 'image/png',
  '.json': 'application/json',
  '.ico': 'image/x-icon',
}

const server = http.createServer(async (req, res) => {
  try {
    let pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname)
    if (pathname === '/') pathname = '/index.html'
    const file = path.join(root, pathname)
    const data = await readFile(file)
    res.writeHead(200, { 'content-type': TYPES[path.extname(file)] || 'application/octet-stream' })
    res.end(data)
  } catch {
    res.writeHead(404, { 'content-type': 'text/plain' })
    res.end('not found')
  }
})

await new Promise((resolve) => server.listen(4173, resolve))

const report = { console: [], pageErrors: [], failedRequests: [], badResponses: [] }

async function attach(page) {
  page.on('console', (msg) => {
    if (['error', 'warning'].includes(msg.type())) {
      report.console.push(`[${msg.type()}] ${msg.text()}`)
    }
  })
  page.on('pageerror', (err) => report.pageErrors.push(String(err)))
  page.on('requestfailed', (req) =>
    report.failedRequests.push(`${req.url()} :: ${req.failure()?.errorText}`),
  )
  page.on('response', (res) => {
    if (res.status() >= 400) report.badResponses.push(`${res.status()} ${res.url()}`)
  })
}

const CHROME =
  process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const browser = await chromium.launch({ executablePath: CHROME })

/* ---------- desktop ---------- */
const desktop = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
})
const page = await desktop.newPage()
attach(page)
await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' })
await page.waitForTimeout(2600)

report.webgl = await page.evaluate(() => {
  const canvas = document.querySelector('canvas')
  if (!canvas) return 'no canvas'
  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
  return gl ? `ok (${canvas.width}x${canvas.height})` : 'no context'
})

report.overflowDesktop = await page.evaluate(
  () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
)

report.fonts = await page.evaluate(() => document.fonts.check('16px "Space Grotesk Variable"'))

await page.screenshot({ path: path.join(shots, '01-hero.png') })

/* menu */
await page.click('.brand')
await page.waitForTimeout(700)
await page.screenshot({ path: path.join(shots, '02-menu.png') })
report.menuLinks = await page.locator('.menu-link').count()
await page.keyboard.press('Escape')
await page.waitForTimeout(500)

/* scroll to work */
await page.evaluate(() => document.getElementById('work')?.scrollIntoView())
await page.waitForTimeout(1400)
await page.screenshot({ path: path.join(shots, '03-work.png') })

/* hover first project */
await page.hover('.project:first-child .project-media')
await page.waitForTimeout(800)
await page.screenshot({ path: path.join(shots, '04-project-hover.png') })

/* open case study */
await page.click('.project:first-child .project-media')
await page.waitForTimeout(1000)
await page.screenshot({ path: path.join(shots, '05-case.png') })
await page.keyboard.press('Escape')
await page.waitForTimeout(600)

/* experiments */
await page.evaluate(() => document.getElementById('experiments')?.scrollIntoView())
await page.waitForTimeout(1200)
await page.hover('.exp-item:nth-child(4) .exp-btn')
await page.waitForTimeout(700)
await page.screenshot({ path: path.join(shots, '06-experiments.png') })

/* stack */
await page.evaluate(() => document.getElementById('stack')?.scrollIntoView())
await page.waitForTimeout(1200)
await page.screenshot({ path: path.join(shots, '07-stack.png') })
/* stack — orbit keeps rotating, so drive the interaction via focus() */
await page.evaluate(() => {
  const buttons = [...document.querySelectorAll('.orbit-node__label')]
  buttons[2]?.focus()
})
await page.waitForTimeout(700)
report.stackFocusText = await page.textContent('.orbit-core__info')
report.stackFocusHint = await page.textContent('.orbit-hint')
report.stackPaused = await page.$eval('.orbit-ring--1', (el) => el.classList.contains('is-paused'))
await page.screenshot({ path: path.join(shots, '08-stack-hover.png') })

/* metrics + timeline */
await page.evaluate(() => document.querySelector('.timeline')?.scrollIntoView())
await page.waitForTimeout(1400)
await page.screenshot({ path: path.join(shots, '09-timeline.png') })

/* contact */
await page.evaluate(() => document.getElementById('contact')?.scrollIntoView())
await page.waitForTimeout(1400)
await page.screenshot({ path: path.join(shots, '10-contact.png') })

report.metrics = await page.$$eval('.metric__value', (els) => els.map((e) => e.textContent?.trim()))

/* full page — sweep the page first so every in-view reveal has fired */
await page.evaluate(async () => {
  const step = Math.round(window.innerHeight * 0.6)
  for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
    window.scrollTo(0, y)
    await new Promise((r) => setTimeout(r, 120))
  }
  window.scrollTo(0, 0)
})
await page.waitForTimeout(1600)
await page.screenshot({ path: path.join(shots, '11-full.png'), fullPage: true })

/* ---------- laptop ---------- */
const laptop = await browser.newContext({ viewport: { width: 1024, height: 700 } })
const lp = await laptop.newPage()
attach(lp)
await lp.goto('http://localhost:4173/', { waitUntil: 'networkidle' })
await lp.waitForTimeout(2200)
report.overflow1024 = await lp.evaluate(
  () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
)
await lp.screenshot({ path: path.join(shots, '12-laptop.png') })

/* ---------- tablet ---------- */
const tablet = await browser.newContext({ viewport: { width: 768, height: 1024 } })
const tp = await tablet.newPage()
attach(tp)
await tp.goto('http://localhost:4173/', { waitUntil: 'networkidle' })
await tp.waitForTimeout(2200)
report.overflow768 = await tp.evaluate(
  () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
)
await tp.screenshot({ path: path.join(shots, '13-tablet.png') })

/* ---------- mobile ---------- */
const mobile = await browser.newContext({
  viewport: { width: 375, height: 812 },
  isMobile: true,
  hasTouch: true,
  deviceScaleFactor: 2,
})
const mp = await mobile.newPage()
attach(mp)
await mp.goto('http://localhost:4173/', { waitUntil: 'networkidle' })
await mp.waitForTimeout(2400)
report.overflow375 = await mp.evaluate(
  () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
)
await mp.screenshot({ path: path.join(shots, '14-mobile-hero.png') })

await mp.tap('.brand')
await mp.waitForTimeout(700)
await mp.screenshot({ path: path.join(shots, '15-mobile-menu.png') })
await mp.tap('.menu-link >> nth=0')
await mp.waitForTimeout(1500)
await mp.screenshot({ path: path.join(shots, '16-mobile-work.png') })

await mp.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
await mp.waitForTimeout(1200)
await mp.screenshot({ path: path.join(shots, '17-mobile-contact.png') })

await mp.evaluate(async () => {
  const step = Math.round(window.innerHeight * 0.6)
  for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
    window.scrollTo(0, y)
    await new Promise((r) => setTimeout(r, 100))
  }
  window.scrollTo(0, 0)
})
await mp.waitForTimeout(1500)
await mp.screenshot({ path: path.join(shots, '18-mobile-full.png'), fullPage: true })

/* ---------- 320px ---------- */
const tiny = await browser.newContext({
  viewport: { width: 320, height: 640 },
  isMobile: true,
  hasTouch: true,
})
const tinyPage = await tiny.newPage()
attach(tinyPage)
await tinyPage.goto('http://localhost:4173/', { waitUntil: 'networkidle' })
await tinyPage.waitForTimeout(2000)
report.overflow320 = await tinyPage.evaluate(
  () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
)
await tinyPage.screenshot({ path: path.join(shots, '19-320.png') })

await browser.close()
server.close()

console.log(JSON.stringify(report, null, 2))
