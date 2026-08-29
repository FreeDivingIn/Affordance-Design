import { chromium } from '@playwright/test'

const baselineUrl =
  process.env.BASELINE_URL ||
  'https://freedivingin.github.io/Affordance-Design/cases/004-media-template-composer/baseline/'
const caseUrl = baselineUrl.replace(/baseline\/?$/, '')

function collectErrors(page) {
  const errors = []
  page.on('pageerror', (error) => errors.push(error.stack || error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(`console: ${message.text()}`)
  })
  return errors
}

const browser = await chromium.launch()

try {
  const reviewContext = await browser.newContext({ viewport: { width: 1280, height: 800 } })
  const reviewPage = await reviewContext.newPage()
  const reviewErrors = collectErrors(reviewPage)

  const reviewResponse = await reviewPage.goto(caseUrl, {
    waitUntil: 'networkidle',
    timeout: 30_000,
  })
  if (!reviewResponse?.ok()) {
    throw new Error(`Eval case request failed: ${reviewResponse?.status()} ${caseUrl}`)
  }

  await reviewPage.locator('#requirement-panel[data-ready="true"]').waitFor({ state: 'visible' })
  for (const selector of [
    '#requirement-goal',
    '#requirement-background',
    '#requirement-current-state',
    '#requirement-direction',
  ]) {
    const text = (await reviewPage.locator(selector).textContent())?.trim()
    if (!text) throw new Error(`Eval case missing rendered requirement field: ${selector}`)
  }

  const direction = (await reviewPage.locator('#requirement-direction').textContent())?.trim()
  if (direction !== 'Feature optimization') {
    throw new Error(`Unexpected optimization direction: ${direction ?? '<missing>'}`)
  }

  if (reviewErrors.length > 0) {
    throw new Error(`Eval case browser errors:\n${reviewErrors.join('\n\n')}`)
  }
  console.log('[PASS] eval 004 case: complete anonymized requirement rendered')
  await reviewContext.close()

  const context = await browser.newContext({
    viewport: { width: 430, height: 860 },
    hasTouch: true,
    isMobile: true,
  })
  const page = await context.newPage()
  const errors = collectErrors(page)

  const response = await page.goto(baselineUrl, {
    waitUntil: 'networkidle',
    timeout: 30_000,
  })
  if (!response?.ok()) {
    throw new Error(`Baseline request failed: ${response?.status()} ${baselineUrl}`)
  }

  await page.getByTestId('body-input').waitFor({ state: 'visible' })
  await page.getByTestId('source-tab-album').waitFor({ state: 'visible' })
  await page.getByTestId('photo-permission-banner').waitFor({ state: 'visible' })
  await page.getByTestId('media-photo-gif').waitFor({ state: 'visible' })

  await page.getByTestId('body-input').fill('已有正文应该在切换媒体与模板流程时保持不变。')
  await page.getByTestId('source-tab-all_templates').click()
  await page.getByTestId('template-text-image').waitFor({ state: 'visible' })
  await page.getByTestId('template-text-image').click()

  await page.getByTestId('template-instruction').fill('强调正文主题')
  await page.getByTestId('generate-template').click()
  await page.getByTestId('template-preview').waitFor({ state: 'visible' })
  await page.getByTestId('insert-template').click()
  await page.getByTestId('attachment-strip').waitFor({ state: 'visible' })

  const body = await page.getByTestId('body-input').inputValue()
  if (body !== '已有正文应该在切换媒体与模板流程时保持不变。') {
    throw new Error(`Draft body changed during baseline template flow: ${body}`)
  }

  for (const source of ['album', 'video', 'game_assets', 'all_templates']) {
    const count = await page.getByTestId(`source-tab-${source}`).count()
    if (count !== 1) throw new Error(`Baseline lost source family: ${source}`)
  }

  const surfaceText = await page.locator('body').innerText()
  for (const reviewerOnly of ['Eval', 'benchmark', 'prototype', 'current-state reconstruction']) {
    if (surfaceText.includes(reviewerOnly)) {
      throw new Error(`Reviewer-only copy leaked into baseline product surface: ${reviewerOnly}`)
    }
  }

  if (errors.length > 0) {
    throw new Error(`Baseline browser errors:\n${errors.join('\n\n')}`)
  }

  console.log('[PASS] eval 004 baseline: complex composer state operated without draft loss')
  await context.close()
} finally {
  await browser.close()
}
