const fs = require('node:fs/promises')
const path = require('node:path')
const { chromium } = require('playwright')

const projectRoot = 'D:\\1\\elite-touch-revonations'
const baseUrl = process.env.BASE_URL ?? 'http://localhost:3218'
const stage = process.env.CAPTURE_STAGE ?? 'before'
const outputDir = path.join(projectRoot, '.tmp', 'issue-75', stage)
const serviceRoutes = [
  '/services/',
  '/services/bathroom-renovations/',
  '/services/ensuite-bathroom-renovations/',
  '/services/laundry-renovations/',
  '/services/powder-room-renovations/',
]
const serviceAreas = require(path.join(projectRoot, 'service-areas.json'))
const locationRoutes = serviceAreas.regions
  .filter((region) => region.hubPublished === true)
  .flatMap((region) => [
    `/services/bathroom-renovations/${region.slug}/`,
    ...region.suburbs
      .filter((suburb) => suburb.pagePublished === true && !suburb.isNotASuburb)
      .map((suburb) => `/services/bathroom-renovations/${suburb.slug}/`),
  ])
const routes = [...serviceRoutes, ...locationRoutes]
const representatives = new Set([
  '/services/',
  '/services/bathroom-renovations/',
  '/services/bathroom-renovations/hills-district/',
  '/services/bathroom-renovations/randwick/',
])

async function loadImages(page) {
  const failures = await page.evaluate(async () => {
    const images = Array.from(document.images)
    images.forEach((image) => {
      image.loading = 'eager'
    })
    await Promise.all(
      images.map(
        (image) =>
          new Promise((resolve) => {
            if (image.complete) {
              resolve()
              return
            }
            image.addEventListener('load', resolve, { once: true })
            image.addEventListener('error', resolve, { once: true })
          }),
      ),
    )
    window.scrollTo(0, 0)
    return images
      .filter((image) => image.naturalWidth === 0)
      .map((image) => image.currentSrc || image.src)
  })
  if (failures.length > 0) {
    throw new Error(`Failed to load images: ${failures.join(', ')}`)
  }
}

async function main() {
  await fs.mkdir(outputDir, { recursive: true })
  const browser = await chromium.launch({ headless: false })
  const context = await browser.newContext({ reducedMotion: 'reduce' })
  const page = await context.newPage()
  const results = []

  try {
    for (const route of routes) {
      await page.setViewportSize({ width: 390, height: 844 })
      const response = await page.goto(`${baseUrl}${route}`, {
        waitUntil: 'load',
        timeout: 30000,
      })
      await loadImages(page)
      const h1 = await page.locator('h1').first().textContent()
      const callBox = await page.locator('a[href^="tel:"]').first().boundingBox()
      const hasOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
      )
      const headings = await page.locator('main h2').allTextContents()
      const fileKey = route.replace(/^\/|\/$/g, '').replaceAll('/', '--') || 'services'

      await page.screenshot({
        path: path.join(outputDir, `${fileKey}-390-top.png`),
        fullPage: false,
        animations: 'disabled',
      })

      if (representatives.has(route)) {
        await page.screenshot({
          path: path.join(outputDir, `${fileKey}-390-full.png`),
          fullPage: true,
          animations: 'disabled',
        })
        await page.setViewportSize({ width: 1440, height: 900 })
        await loadImages(page)
        await page.screenshot({
          path: path.join(outputDir, `${fileKey}-1440-full.png`),
          fullPage: true,
          animations: 'disabled',
        })
      }

      results.push({
        route,
        status: response?.status(),
        h1: h1?.trim(),
        headings: headings.map((heading) => heading.trim()),
        callVisibleAt390: Boolean(callBox && callBox.y >= 0 && callBox.y < 844),
        horizontalOverflowAt390: hasOverflow,
      })
    }

    console.log(JSON.stringify({ stage, outputDir, routes: routes.length, results }, null, 2))
  } finally {
    await browser.close()
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
