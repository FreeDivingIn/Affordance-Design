import { expect, test, type Page } from '@playwright/test'

const forbiddenCapabilities = ['Export', 'Add tags', 'Find duplicates', 'AI cleanup']

async function expectInitialState(page: Page) {
  await expect(page.getByTestId('selection-count')).toHaveText('2 selected')
  await expect(page.getByTestId('contact-maya-rivera')).toBeVisible()
  await expect(page.getByTestId('contact-m-rivera')).toBeVisible()
  await expect(page.getByTestId('contact-maya-rivera')).toContainText('maya@northstar.example')
  await expect(page.getByTestId('contact-m-rivera')).toContainText(
    'maya.rivera@northstar.example'
  )
}

async function expectNarrowMergeSurface(page: Page) {
  await expect(page.getByText('Keep as primary contact')).toBeVisible()
  await expect(page.getByTestId('primary-maya-rivera')).toBeVisible()
  await expect(page.getByTestId('primary-m-rivera')).toBeVisible()
  await expect(page.getByTestId('primary-owen-brooks')).toHaveCount(0)

  for (const capability of forbiddenCapabilities) {
    await expect(page.getByText(capability, { exact: true })).toHaveCount(0)
  }
}

async function commitAndUndo(page: Page) {
  await page.getByTestId('primary-maya-rivera').click()

  await expect(page.getByTestId('merge-feedback')).toContainText('Merged into Maya Rivera.')
  await expect(page.getByTestId('selection-count')).toHaveText('1 selected')
  await expect(page.getByTestId('contact-m-rivera')).toHaveCount(0)
  await expect(page.getByTestId('contact-maya-rivera')).toContainText(
    'maya.rivera@northstar.example'
  )

  await page.getByTestId('undo-merge').click()

  await expect(page.getByTestId('merge-feedback')).toBeHidden()
  await expectInitialState(page)
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

test.describe('pointer Web presentation', () => {
  test.beforeEach(async ({}, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-pointer', 'Pointer behavior belongs to desktop project')
  })

  test('keeps Merge narrow, commits the chosen primary, and recovers with Undo', async ({ page }) => {
    await page.goto('/')
    await expectInitialState(page)

    await page.getByTestId('merge-trigger').click()

    await expect(page.getByTestId('merge-popover')).toBeVisible()
    await expect(page.getByTestId('merge-sheet')).toBeHidden()
    await expectNarrowMergeSurface(page)

    await commitAndUndo(page)
  })

  test('dismissal preserves the two-contact target selection', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('merge-trigger').click()
    await expect(page.getByTestId('merge-popover')).toBeVisible()

    await page.keyboard.press('Escape')

    await expect(page.getByTestId('merge-popover')).toBeHidden()
    await expect(page.getByTestId('selection-count')).toHaveText('2 selected')
    await expect(page.getByTestId('contact-maya-rivera')).toBeVisible()
    await expect(page.getByTestId('contact-m-rivera')).toBeVisible()

    await page.getByTestId('merge-trigger').click()
    await expectNarrowMergeSurface(page)
  })
})

test.describe('touch/mobile presentation', () => {
  test.beforeEach(async ({}, testInfo) => {
    test.skip(testInfo.project.name !== 'touch-mobile', 'Touch behavior belongs to touch project')
  })

  test('adapts to a Sheet without broadening Merge semantics', async ({ page }) => {
    await page.goto('/')
    await expectInitialState(page)

    await page.getByTestId('merge-trigger').click()

    await expect(page.getByTestId('merge-sheet')).toBeVisible()
    await expectNarrowMergeSurface(page)

    await commitAndUndo(page)
  })
})
