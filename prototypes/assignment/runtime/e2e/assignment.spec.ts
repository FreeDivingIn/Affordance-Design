import { expect, test } from '@playwright/test'

async function expectInitialSelection(page: Parameters<typeof test>[0] extends never ? never : any) {
  await expect(page.getByTestId('selection-count')).toHaveText('3 selected')
  await expect(page.getByTestId('work-order-WO-1042')).toContainText('Unassigned')
  await expect(page.getByTestId('work-order-WO-1048')).toContainText('Taylor Kim')
  await expect(page.getByTestId('work-order-WO-1051')).toContainText('Unassigned')
}

async function commitAndUndo(page: Parameters<typeof test>[0] extends never ? never : any) {
  await page.getByTestId('technician-avery-chen').click()

  await expect(page.getByTestId('assignment-feedback')).toContainText(
    'Assigned 3 work orders to Avery Chen.'
  )
  await expect(page.getByTestId('work-order-WO-1042')).toContainText('Avery Chen')
  await expect(page.getByTestId('work-order-WO-1048')).toContainText('Avery Chen')
  await expect(page.getByTestId('work-order-WO-1051')).toContainText('Avery Chen')
  await expect(page.getByTestId('work-order-WO-1057')).toContainText('Jordan Lee')

  await page.getByTestId('undo-assignment').click()

  await expect(page.getByTestId('assignment-feedback')).toBeHidden()
  await expectInitialSelection(page)
}

test.describe('pointer Web presentation', () => {
  test('keeps Assign local, commits directly, and recovers with Undo', async ({ page }) => {
    await page.goto('/')
    await expectInitialSelection(page)

    await page.getByTestId('assign-trigger').click()

    await expect(page.getByTestId('assignment-popover')).toBeVisible()
    await expect(page.getByTestId('assignment-sheet')).toBeHidden()
    await expect(page.getByText('Assign 3 work orders')).toBeVisible()

    await commitAndUndo(page)
  })

  test('dismissal preserves the already-selected target set', async ({ page }) => {
    await page.goto('/')
    await page.getByTestId('assign-trigger').click()
    await expect(page.getByTestId('assignment-popover')).toBeVisible()

    await page.keyboard.press('Escape')

    await expect(page.getByTestId('assignment-popover')).toBeHidden()
    await expect(page.getByTestId('selection-count')).toHaveText('3 selected')

    await page.getByTestId('assign-trigger').click()
    await expect(page.getByText('Assign 3 work orders')).toBeVisible()
  })
})

test.describe('touch/mobile presentation', () => {
  test('adapts presentation to a Sheet without changing assignment semantics', async ({ page }) => {
    await page.goto('/')
    await expectInitialSelection(page)

    await page.getByTestId('assign-trigger').click()

    await expect(page.getByTestId('assignment-sheet')).toBeVisible()
    await expect(page.getByText('Assign 3 work orders')).toBeVisible()

    await commitAndUndo(page)
  })
})
