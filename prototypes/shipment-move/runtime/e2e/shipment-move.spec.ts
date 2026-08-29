import { expect, test, type Page } from '@playwright/test'

async function expectInitialState(page: Page) {
  await expect(page.getByTestId('shipment-SH-4821')).toContainText('Reno Depot')
  await expect(page.getByTestId('move-feedback')).toBeHidden()
}

async function expectProductOnlySurface(page: Page) {
  for (const copy of [
    'command path',
    'drag path',
    'resolved destination',
    'prototype',
    'benchmark',
  ]) {
    await expect(page.getByText(copy, { exact: false })).toHaveCount(0)
  }
}

async function expectMovedAndUndo(page: Page) {
  await expect(page.getByTestId('move-feedback')).toContainText(
    'Moved SH-4821 to Oakland Hub.'
  )
  await expect(page.getByTestId('shipment-SH-4821')).toContainText('Oakland Hub')

  await page.getByTestId('undo-move').click()

  await expectInitialState(page)
}

async function dragShipmentTo(page: Page, targetTestId: string) {
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

test.beforeEach(async ({ page }, testInfo) => {
  page.on('pageerror', (error) => {
    console.error(`[${testInfo.project.name}] page error: ${error.message}`)
  })
  page.on('console', (message) => {
    if (message.type() === 'error') {
      console.error(`[${testInfo.project.name}] console error: ${message.text()}`)
    }
  })
})

test.describe('pointer Web access paths', () => {
  test.beforeEach(async ({}, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-pointer', 'Pointer behavior belongs to desktop project')
  })

  test('generic Move asks for the unresolved destination and then commits', async ({ page }) => {
    await page.goto('/')
    await expectInitialState(page)
    await expectProductOnlySurface(page)

    await page.getByTestId('move-trigger-SH-4821').click()

    await expect(page.getByTestId('move-popover-SH-4821')).toBeVisible()
    await expect(page.getByTestId('destination-SH-4821-oakland')).toBeVisible()
    await expect(page.getByTestId('destination-SH-4821-sacramento')).toBeVisible()
    await expect(page.getByTestId('destination-SH-4821-reno')).toHaveCount(0)

    await page.getByTestId('destination-SH-4821-oakland').click()
    await expectMovedAndUndo(page)
  })

  test('dragging onto a depot commits directly without reopening destination choice', async ({ page }) => {
    await page.goto('/')
    await expectInitialState(page)
    await expect(page.getByTestId('drag-handle-SH-4821')).toBeVisible()

    await dragShipmentTo(page, 'depot-oakland')

    await expect(page.getByTestId('move-popover-SH-4821')).toBeHidden()
    await expect(page.getByTestId('move-sheet-SH-4821')).toBeHidden()
    await expectMovedAndUndo(page)
  })

  test('invalid drop leaves shipment state unchanged', async ({ page }) => {
    await page.goto('/')
    await expectInitialState(page)

    const handle = page.getByTestId('drag-handle-SH-4821')
    const handleBox = await handle.boundingBox()
    if (!handleBox) throw new Error('Unable to measure drag source')

    await page.mouse.move(
      handleBox.x + handleBox.width / 2,
      handleBox.y + handleBox.height / 2
    )
    await page.mouse.down()
    await page.mouse.move(10, 10, { steps: 12 })
    await page.mouse.up()

    await expectInitialState(page)
  })
})

test.describe('touch/mobile command path', () => {
  test.beforeEach(async ({}, testInfo) => {
    test.skip(testInfo.project.name !== 'touch-mobile', 'Touch behavior belongs to touch project')
  })

  test('uses the same move result and recovery without inventing pointer drag parity', async ({ page }) => {
    await page.goto('/')
    await expectInitialState(page)
    await expect(page.getByTestId('drag-handle-SH-4821')).toHaveCount(0)

    await page.getByTestId('move-trigger-SH-4821').click()

    await expect(page.getByTestId('move-sheet-SH-4821')).toBeVisible()
    await page.getByTestId('destination-SH-4821-oakland').click()

    await expectMovedAndUndo(page)
  })
})
