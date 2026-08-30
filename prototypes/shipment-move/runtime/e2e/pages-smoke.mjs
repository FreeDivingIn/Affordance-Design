import { chromium } from '@playwright/test'

const prototypeUrl =
  process.env.PROTOTYPE_URL ||
  'https://freedivingin.github.io/Affordance-Design/cases/003-move-access-paths/prototype/'
const caseUrl = prototypeUrl.replace(/prototype\/?$/, '')

function collectErrors(page) {
  const errors = []
  page.on('pageerror', (error) => errors.push(error.stack || error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(`console: ${message.text()}`)
  })
  return errors
}

async function verifyRequirementPage(browser) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } })
  const page = await context.newPage()
  const errors = collectErrors(page)

  const response = await page.goto(caseUrl, { waitUntil: 'networkidle', timeout: 30_000 })
  if (!response?.ok()) {
    throw new Error(`Eval case request failed: ${response?.status()} ${caseUrl}`)
  }

  await page.locator('#requirement-panel[data-ready="true"]').waitFor({ state: 'visible' })
  for (const selector of [
    '#requirement-goal',
    '#requirement-background',
    '#requirement-current-state',
    '#requirement-direction',
  ]) {
    const text = (await page.locator(selector).textContent())?.trim()
    if (!text) throw new Error(`Eval case missing rendered requirement field: ${selector}`)
  }

  const direction = (await page.locator('#requirement-direction').textContent())?.trim()
  if (direction !== 'Feature optimization') {
    throw new Error(`Unexpected optimization direction: ${direction ?? '<missing>'}`)
  }

  if (errors.length > 0) {
    throw new Error(`Eval case browser errors:\n${errors.join('\n\n')}`)
  }

  console.log('[PASS] eval 003 case: canonical requirement brief rendered completely')
  await context.close()
}

async function dragShipmentTo(page, targetTestId) {
  const handle = page.getByTestId('drag-handle-SH-4821')
  const target = page.getByTestId(targetTestId)
  const handleBox = await handle.boundingBox()
  const targetBox = await target.boundingBox()

  if (!handleBox || !targetBox) {
    throw new Error('Unable to measure drag source or target')
  }

  await page.mouse.move(
    handleBox.x + handleBox.width / 2,
    handleBox.y + handleBox.height / 2
  )
  await page.mouse.down()
  await page.mouse.move(
    targetBox.x + targetBox.width / 2,
    targetBox.y + targetBox.height / 2,
    { steps: 12 }
  )
  await page.mouse.up()
}

async function verifyPointer(browser) {
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    hasTouch: false,
    isMobile: false,
  })
  const page = await context.newPage()
  const errors = collectErrors(page)

  const response = await page.goto(prototypeUrl, { waitUntil: 'networkidle', timeout: 30_000 })
  if (!response?.ok()) {
    throw new Error(`desktop-pointer prototype request failed: ${response?.status()} ${prototypeUrl}`)
  }

  await page.getByTestId('shipment-SH-4821').waitFor({ state: 'visible' })
  const initial = await page.getByTestId('shipment-SH-4821').textContent()
  if (!initial?.includes('Reno Depot')) {
    throw new Error(`desktop-pointer unexpected initial depot: ${initial ?? '<missing>'}`)
  }

  // Generic Move has not received a destination yet, so it must ask for one.
  await page.getByTestId('move-trigger-SH-4821').click()
  await page.getByTestId('move-popover-SH-4821').waitFor({ state: 'visible' })
  await page.getByTestId('destination-SH-4821-oakland').click()
  await page.getByTestId('move-feedback').waitFor({ state: 'visible' })
  await page.getByTestId('undo-move').click()

  // A valid drop has already supplied Oakland, so no destination chooser may reopen.
  await dragShipmentTo(page, 'depot-oakland')
  await page.getByTestId('move-feedback').waitFor({ state: 'visible' })

  const moved = await page.getByTestId('shipment-SH-4821').textContent()
  if (!moved?.includes('Oakland Hub')) {
    throw new Error(`desktop-pointer drag did not commit Oakland destination: ${moved ?? '<missing>'}`)
  }

  if (await page.getByTestId('move-popover-SH-4821').isVisible().catch(() => false)) {
    throw new Error('desktop-pointer valid drag reopened the destination popover')
  }
  if (await page.getByTestId('move-sheet-SH-4821').isVisible().catch(() => false)) {
    throw new Error('desktop-pointer valid drag reopened the destination sheet')
  }

  if (errors.length > 0) {
    throw new Error(`desktop-pointer browser errors:\n${errors.join('\n\n')}`)
  }

  console.log('[PASS] desktop-pointer: command asks destination; valid drag commits directly')
  await context.close()
}

async function verifyTouch(browser) {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
  })
  const page = await context.newPage()
  const errors = collectErrors(page)

  const response = await page.goto(prototypeUrl, { waitUntil: 'networkidle', timeout: 30_000 })
  if (!response?.ok()) {
    throw new Error(`touch-mobile prototype request failed: ${response?.status()} ${prototypeUrl}`)
  }

  await page.getByTestId('shipment-SH-4821').waitFor({ state: 'visible' })
  if ((await page.getByTestId('drag-handle-SH-4821').count()) !== 0) {
    throw new Error('touch-mobile unexpectedly exposes the pointer drag affordance')
  }

  await page.getByTestId('move-trigger-SH-4821').click()
  await page.getByTestId('move-sheet-SH-4821').waitFor({ state: 'visible' })
  await page.getByTestId('destination-SH-4821-oakland').click()
  await page.getByTestId('move-feedback').waitFor({ state: 'visible' })

  const moved = await page.getByTestId('shipment-SH-4821').textContent()
  if (!moved?.includes('Oakland Hub')) {
    throw new Error(`touch-mobile command path did not commit Oakland destination: ${moved ?? '<missing>'}`)
  }

  if (errors.length > 0) {
    throw new Error(`touch-mobile browser errors:\n${errors.join('\n\n')}`)
  }

  console.log('[PASS] touch-mobile: explicit Move preserves shared result without fake drag parity')
  await context.close()
}

const browser = await chromium.launch()
try {
  await verifyRequirementPage(browser)
  await verifyPointer(browser)
  await verifyTouch(browser)
} finally {
  await browser.close()
}
