import { expect, test, type Page } from '@playwright/test'

async function expectComposerShell(page: Page) {
  await expect(page.getByPlaceholder('填写标题')).toBeVisible()
  await expect(page.getByPlaceholder('添加正文')).toBeVisible()
  await expect(page.getByTestId('add-topics')).toBeVisible()
  await expect(page.getByTestId('emoji-tool')).toBeVisible()
  await expect(page.getByTestId('mention-tool')).toBeVisible()
  await expect(page.getByTestId('add-tool')).toBeVisible()
  await expect(page.getByTestId('settings-tool')).toBeVisible()
}

async function expectFourSourceTabs(page: Page) {
  await expect(page.getByTestId('source-tab-album')).toBeVisible()
  await expect(page.getByTestId('source-tab-video')).toBeVisible()
  await expect(page.getByTestId('source-tab-game_assets')).toBeVisible()
  await expect(page.getByTestId('source-tab-all_templates')).toBeVisible()
}

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await expectComposerShell(page)
})

test('reconstructs both screenshot-confirmed lower-panel states without deleting source families', async ({ page }) => {
  await expectFourSourceTabs(page)

  await expect(page.getByTestId('photo-permission-banner')).toBeVisible()
  await expect(page.getByText('拍照', { exact: true })).toBeVisible()
  await expect(page.getByTestId('media-photo-gif')).toBeVisible()

  await page.getByTestId('source-tab-all_templates').click()

  for (const id of [
    'all',
    'text-image',
    'card',
    'loadout',
    'identity',
    'relations',
    'fortune',
    'life',
  ]) {
    await expect(page.getByTestId(`template-${id}`)).toBeVisible()
  }

  await page.getByTestId('source-tab-album').click()
  await expect(page.getByTestId('photo-permission-banner')).toBeVisible()
})

test('preserves draft while switching sources and committing direct media', async ({ page }) => {
  await page.getByTestId('title-input').fill('一篇正在编辑的内容')
  await page.getByTestId('body-input').fill('正文已经写了一半，需要添加一张相关图片。')

  await page.getByTestId('source-tab-video').click()
  await expect(page.getByTestId('media-video-1')).toBeVisible()
  await page.getByTestId('source-tab-game_assets').click()
  await expect(page.getByTestId('media-asset-1')).toBeVisible()
  await page.getByTestId('source-tab-album').click()

  await expect(page.getByTestId('title-input')).toHaveValue('一篇正在编辑的内容')
  await expect(page.getByTestId('body-input')).toHaveValue('正文已经写了一半，需要添加一张相关图片。')

  await page.getByTestId('media-photo-gif').click()
  await expect(page.getByTestId('selection-commit-bar')).toBeVisible()
  await page.getByTestId('commit-selected-media').click()

  await expect(page.getByTestId('attachment-strip')).toContainText('GIF')
  await expect(page.getByTestId('body-input')).toHaveValue('正文已经写了一半，需要添加一张相关图片。')
})

test('operates template configuration, provisional preview, explicit insertion, and draft preservation', async ({ page }) => {
  const body = '这段正文包含要表达的主题，后续配图不应要求用户重新输入整段正文。'
  await page.getByTestId('body-input').fill(body)
  await page.getByTestId('source-tab-all_templates').click()
  await page.getByTestId('template-text-image').click()

  await expect(page.getByText('正文内容', { exact: true })).toBeVisible()
  await expect(page.getByText(body, { exact: false })).toBeVisible()

  await page.getByTestId('template-instruction').fill('突出主角和关键场景')
  await page.getByTestId('generate-template').click()
  await expect(page.getByTestId('template-preview')).toBeVisible()

  await expect(page.getByTestId('body-input')).toHaveValue(body)
  await page.getByTestId('insert-template').click()

  await expect(page.getByTestId('attachment-strip')).toContainText('文字配图预览')
  await expect(page.getByTestId('body-input')).toHaveValue(body)
})

test('keeps adjacent composer utilities operable without leaving the draft context', async ({ page }) => {
  await page.getByTestId('body-input').fill('开始写正文')

  await page.getByTestId('add-topics').click()
  await page.getByTestId('topic-创作灵感').click()
  await page.getByText('完成', { exact: true }).click()
  await expect(page.getByTestId('topic-summary')).toContainText('#创作灵感')

  await page.getByTestId('emoji-tool').click()
  await page.locator('[data-testid^="emoji-"]').first().click()
  await page.getByText('完成', { exact: true }).click()
  await expect(page.getByTestId('body-input')).not.toHaveValue('开始写正文')

  await page.getByTestId('mention-tool').click()
  await page.getByTestId('mention-阿青').click()
  await expect(page.getByTestId('body-input')).toHaveValue(/@阿青/)

  await page.getByTestId('settings-tool').click()
  await expect(page.getByText('有限访问', { exact: true })).toBeVisible()
  await page.getByTestId('grant-full-photo-access').click()
  await expect(page.getByText('允许访问所有照片', { exact: true })).toBeVisible()
  await page.getByText('完成', { exact: true }).click()

  await expect(page.getByTestId('photo-permission-banner')).toBeHidden()

  await page.getByTestId('camera-tile').click()
  await expect(page.getByTestId('camera-shutter')).toBeVisible()
  await page.getByTestId('camera-shutter').click()
  await expect(page.getByTestId('selection-commit-bar')).toBeVisible()
  await page.getByTestId('commit-selected-media').click()
  await expect(page.getByTestId('attachment-strip')).toContainText('拍摄照片')

  await page.getByTestId('add-tool').click()
  await expect(page.getByTestId('acquisition-panel')).toBeHidden()
  await page.getByTestId('add-tool').click()
  await expect(page.getByTestId('acquisition-panel')).toBeVisible()

  await expect(page.getByTestId('body-input')).toHaveValue(/@阿青/)
})
