import { chromium } from '@playwright/test'

const prototypeUrl =
  process.env.PROTOTYPE_URL ||
  'https://freedivingin.github.io/Affordance-Design/cases/004-media-template-composer/prototype/'

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
  const context = await browser.newContext({
    viewport: { width: 430, height: 860 },
    hasTouch: true,
    isMobile: true,
  })
  const page = await context.newPage()
  const errors = collectErrors(page)

  const response = await page.goto(prototypeUrl, {
    waitUntil: 'networkidle',
    timeout: 30_000,
  })
  if (!response?.ok()) {
    throw new Error(`Optimized prototype request failed: ${response?.status()} ${prototypeUrl}`)
  }

  await page.getByTestId('body-input').waitFor({ state: 'visible' })
  await page.getByTestId('add-visual').click()

  for (const choice of ['choice-existing', 'choice-generate', 'choice-templates']) {
    await page.getByTestId(choice).waitFor({ state: 'visible' })
  }
  if ((await page.getByTestId('existing-tab-album').count()) !== 0) {
    throw new Error('Source taxonomy leaked into generic Add visual launcher')
  }

  await page.getByTestId('choice-existing').click()
  for (const source of ['album', 'video', 'game_assets']) {
    await page.getByTestId(`existing-tab-${source}`).waitFor({ state: 'visible' })
  }
  await page.getByTestId('photo-permission-banner').waitFor({ state: 'visible' })
  await page.getByTestId('camera-tile').waitFor({ state: 'visible' })
  await page.getByTestId('close-visual-panel').click()

  const body = '正文已经形成明确主题，系统可以在不让用户重新输入正文的情况下辅助生成配图。'
  await page.getByTestId('body-input').fill(body)
  await page.getByTestId('title-input').focus()
  await page.getByTestId('visual-suggestion').waitFor({ state: 'visible' })

  await page.getByTestId('suggest-generate').click()
  await page.getByTestId('generation-draft-context').waitFor({ state: 'visible' })
  const contextText = await page.getByTestId('generation-draft-context').textContent()
  if (!contextText?.includes('正文已经形成明确主题')) {
    throw new Error('Draft context did not propagate into generation shortcut')
  }
  if ((await page.getByTestId('choice-generate').count()) !== 0) {
    throw new Error('Generation shortcut re-asked acquisition intent')
  }

  await page.getByTestId('generate-draft-visuals').click()
  await page.getByTestId('generated-candidate-2').click()
  await page.getByTestId('insert-generated-visual').click()
  await page.getByTestId('attachment-strip').waitFor({ state: 'visible' })

  const finalBody = await page.getByTestId('body-input').inputValue()
  if (finalBody !== body) {
    throw new Error(`Generated visual rewrote user draft: ${finalBody}`)
  }

  const surfaceText = await page.locator('body').innerText()
  for (const reviewerOnly of [
    'Eval',
    'benchmark',
    'prototype',
    'optimized interaction',
    'current-state baseline',
  ]) {
    if (surfaceText.includes(reviewerOnly)) {
      throw new Error(`Reviewer-only copy leaked into optimized product surface: ${reviewerOnly}`)
    }
  }

  if (errors.length > 0) {
    throw new Error(`Optimized prototype browser errors:\n${errors.join('\n\n')}`)
  }

  console.log('[PASS] eval 004 optimized: problem-state launcher and context-bound generation operated publicly')
  await context.close()
} finally {
  await browser.close()
}
