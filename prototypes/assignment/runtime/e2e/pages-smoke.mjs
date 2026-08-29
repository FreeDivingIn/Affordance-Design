import { chromium } from '@playwright/test'

const prototypeUrl =
  process.env.PROTOTYPE_URL ||
  'https://freedivingin.github.io/Affordance-Design/cases/001-bulk-assignment/prototype/'
const caseUrl = prototypeUrl.replace(/prototype\/?$/, '')

const scenarios = [
  {
    name: 'desktop-pointer',
    context: {
      viewport: { width: 1280, height: 800 },
      hasTouch: false,
      isMobile: false,
    },
    expectedSurface: 'assignment-popover',
  },
  {
    name: 'touch-mobile',
    context: {
      viewport: { width: 390, height: 844 },
      hasTouch: true,
      isMobile: true,
    },
    expectedSurface: 'assignment-sheet',
  },
]

const forbiddenVisibleCopy = [
  'Structural prototype:',
  'Choose one technician.',
  'Work queue',
]

const browser = await chromium.launch()

try {
  const reviewContext = await browser.newContext({ viewport: { width: 1280, height: 800 } })
  const reviewPage = await reviewContext.newPage()
  const reviewErrors = []

  reviewPage.on('pageerror', (error) => reviewErrors.push(error.stack || error.message))
  reviewPage.on('console', (message) => {
    if (message.type() === 'error') reviewErrors.push(`console: ${message.text()}`)
  })

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

  console.log('[PASS] eval case: canonical requirement brief rendered completely')
  await reviewContext.close()

  for (const scenario of scenarios) {
    const context = await browser.newContext(scenario.context)
    const page = await context.newPage()
    const runtimeErrors = []

    page.on('pageerror', (error) => {
      runtimeErrors.push(error.stack || error.message)
    })

    page.on('console', (message) => {
      if (message.type() === 'error') {
        runtimeErrors.push(`console: ${message.text()}`)
      }
    })

    const response = await page.goto(prototypeUrl, {
      waitUntil: 'networkidle',
      timeout: 30_000,
    })

    if (!response?.ok()) {
      throw new Error(
        `[${scenario.name}] prototype request failed: ${response?.status()} ${prototypeUrl}`
      )
    }

    await page.getByTestId('selection-count').waitFor({ state: 'visible' })

    const selectionCount = await page.getByTestId('selection-count').textContent()
    if (selectionCount !== '3 selected') {
      throw new Error(
        `[${scenario.name}] unexpected initial selection: ${selectionCount ?? '<missing>'}`
      )
    }

    for (const copy of forbiddenVisibleCopy) {
      const count = await page.getByText(copy, { exact: false }).count()
      if (count > 0) {
        throw new Error(`[${scenario.name}] prototype-only visible copy leaked: ${copy}`)
      }
    }

    await page.getByTestId('assign-trigger').click()
    await page.getByTestId(scenario.expectedSurface).waitFor({ state: 'visible' })
    await page.getByTestId('technician-avery-chen').click()
    await page.getByTestId('assignment-feedback').waitFor({ state: 'visible' })

    if (runtimeErrors.length > 0) {
      throw new Error(
        `[${scenario.name}] browser runtime errors:\n${runtimeErrors.join('\n\n')}`
      )
    }

    console.log(
      `[PASS] ${scenario.name}: loaded, stayed product-only, assigned, and rendered feedback`
    )
    await context.close()
  }
} finally {
  await browser.close()
}
