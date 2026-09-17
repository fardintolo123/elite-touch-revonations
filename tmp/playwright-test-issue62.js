const TARGET_URL = 'http://localhost:3210/blog/bathroom-renovation-timeline-sydney/'

const browser = await chromium.launch({ headless: false, slowMo: 50 })
const page = await browser.newPage()

for (const viewport of [
  { name: 'desktop', width: 1280, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
]) {
  await page.setViewportSize({ width: viewport.width, height: viewport.height })
  await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 15000 })

  const quickAnswer = page.locator('.et-blog-quick-answer')
  await quickAnswer.waitFor({ timeout: 10000 })

  const title = await page.title()
  const rows = await quickAnswer.locator('tbody tr').count()
  const ctaVisible = await quickAnswer
    .getByRole('link', { name: 'Get your fixed timeline' })
    .isVisible()
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  )
  const box = await quickAnswer.boundingBox()

  console.log(
    JSON.stringify({
      viewport: viewport.name,
      title,
      rows,
      ctaVisible,
      overflow,
      quickAnswerTop: Math.round(box?.y || 0),
      quickAnswerHeight: Math.round(box?.height || 0),
    }),
  )

  await page.screenshot({
    path: `D:/1/elite-touch-revonations/tmp/issue62-${viewport.name}.png`,
    fullPage: true,
  })
}

await browser.close()
