import { expect, test, type Page } from '@playwright/test'

async function fillMeaningfulDraft(page: Page) {
  await page.getByTestId('title-input').fill('一篇需要配图的内容')
  await page.getByTestId('body-input').fill('正文已经形成了清晰主题，希望配图帮助读者更快理解核心内容。')
}

async function expectDraftUnchanged(page: Page) {
  await expect(page.getByTestId('title-input')).toHaveValue('一篇需要配图的内容')
  await expect(page.getByTestId('body-input')).toHaveValue('正文已经形成了清晰主题，希望配图帮助读者更快理解核心内容。')
}

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await expect(page.getByTestId('body-input')).toBeVisible()
  await expect(page.getByTestId('add-visual')).toBeVisible()
})

test('generic Add visual resolves user problem state before source taxonomy', async ({ page }) => {
  await page.getByTestId('add-visual').click()

  await expect(page.getByTestId('choice-existing')).toBeVisible()
  await expect(page.getByTestId('choice-generate')).toBeVisible()
  await expect(page.getByTestId('choice-templates')).toBeVisible()

  await expect(page.getByTestId('existing-tab-album')).toHaveCount(0)
  await expect(page.getByTestId('existing-tab-video')).toHaveCount(0)
  await expect(page.getByTestId('existing-tab-game_assets')).toHaveCount(0)
})

test('existing-media branch preserves album video game-assets and album acquisition complexity', async ({ page }) => {
  await fillMeaningfulDraft(page)
  await page.getByTestId('add-visual').click()
  await page.getByTestId('choice-existing').click()

  await expect(page.getByTestId('existing-tab-album')).toBeVisible()
  await expect(page.getByTestId('existing-tab-video')).toBeVisible()
  await expect(page.getByTestId('existing-tab-game_assets')).toBeVisible()
  await expect(page.getByTestId('photo-permission-banner')).toBeVisible()
  await expect(page.getByTestId('camera-tile')).toBeVisible()
  await expect(page.getByTestId('media-photo-gif')).toBeVisible()

  await page.getByTestId('existing-tab-video').click()
  await expect(page.getByTestId('media-video-1')).toBeVisible()
  await page.getByTestId('existing-tab-game_assets').click()
  await expect(page.getByTestId('media-asset-1')).toBeVisible()
  await page.getByTestId('existing-tab-album').click()

  await page.getByTestId('media-photo-gif').click()
  await page.getByTestId('commit-selected-media').click()

  await expect(page.getByTestId('attachment-strip')).toContainText('动态图片')
  await expectDraftUnchanged(page)
})

test('draft-generation path reuses current draft, produces provisional choices, and inserts without rewriting text', async ({ page }) => {
  await fillMeaningfulDraft(page)
  await page.getByTestId('add-visual').click()
  await page.getByTestId('choice-generate').click()

  await expect(page.getByTestId('generation-draft-context')).toContainText('正文已经形成了清晰主题')
  await expect(page.getByTestId('generation-instruction')).toHaveValue('')
  await expect(page.getByTestId('generate-draft-visuals')).toBeVisible()

  await page.getByTestId('generate-draft-visuals').click()
  await expect(page.getByTestId('generated-candidate-1')).toBeVisible()
  await expect(page.getByTestId('generated-candidate-2')).toBeVisible()
  await expect(page.getByTestId('generated-candidate-3')).toBeVisible()
  await expect(page.getByTestId('attachment-strip')).toHaveCount(0)

  await page.getByTestId('generated-candidate-2').click()
  await page.getByTestId('insert-generated-visual').click()

  await expect(page.getByTestId('attachment-strip')).toContainText('正文配图 2')
  await expectDraftUnchanged(page)
  await expect(page.getByTestId('visual-panel')).toHaveCount(0)
})

test('creative-template exploration stays broad while text-image alias resolves to direct draft generation', async ({ page }) => {
  await fillMeaningfulDraft(page)
  await page.getByTestId('add-visual').click()
  await page.getByTestId('choice-templates').click()

  await expect(page.getByTestId('template-alias-text-image')).toBeVisible()
  for (const id of ['card', 'loadout', 'identity', 'relations', 'fortune', 'life']) {
    await expect(page.getByTestId(`template-${id}`)).toBeVisible()
  }

  await page.getByTestId('template-alias-text-image').click()
  await expect(page.getByTestId('generation-draft-context')).toContainText('正文已经形成了清晰主题')
  await expect(page.getByTestId('template-card')).toHaveCount(0)
})

test('template configuration asks only unresolved input and preserves draft on insertion', async ({ page }) => {
  await fillMeaningfulDraft(page)
  await page.getByTestId('add-visual').click()
  await page.getByTestId('choice-templates').click()

  await page.getByTestId('template-card').click()
  await expect(page.getByTestId('no-extra-template-input')).toBeVisible()
  await expect(page.getByTestId('template-input')).toHaveCount(0)
  await page.getByTestId('generate-template-preview').click()
  await expect(page.getByTestId('template-preview')).toBeVisible()
  await page.getByTestId('insert-template-preview').click()

  await expect(page.getByTestId('attachment-strip')).toContainText('卡片生成器预览')
  await expectDraftUnchanged(page)
})

test('contextual suggestion waits for natural break and shortcuts skip already-resolved questions', async ({ page }) => {
  const body = page.getByTestId('body-input')
  await body.focus()
  await body.fill('这是一段已经足够长并且形成主题的正文内容，需要考虑是否添加配图。')

  await expect(page.getByTestId('visual-suggestion')).toHaveCount(0)
  await page.getByTestId('title-input').focus()
  await expect(page.getByTestId('visual-suggestion')).toBeVisible()

  await page.getByTestId('suggest-album').click()
  await expect(page.getByTestId('existing-tab-album')).toBeVisible()
  await expect(page.getByTestId('choice-existing')).toHaveCount(0)
  await expect(page.getByTestId('photo-permission-banner')).toBeVisible()

  await page.getByTestId('close-visual-panel').click()
  await body.focus()
  await body.fill('这是一段已经足够长并且形成主题的正文内容，需要考虑是否添加配图，而且新增了很多关键解释。')
  await page.getByTestId('title-input').focus()
  await expect(page.getByTestId('visual-suggestion')).toBeVisible()

  await page.getByTestId('suggest-generate').click()
  await expect(page.getByTestId('generation-draft-context')).toBeVisible()
  await expect(page.getByTestId('choice-generate')).toHaveCount(0)
})

test('dismissed contextual suggestion does not immediately resurface without meaningful draft change', async ({ page }) => {
  const body = page.getByTestId('body-input')
  await body.fill('这是一段已经足够长并且形成主题的正文内容，需要考虑是否添加配图。')
  await page.getByTestId('title-input').focus()
  await expect(page.getByTestId('visual-suggestion')).toBeVisible()

  await page.getByTestId('dismiss-visual-suggestion').click()
  await expect(page.getByTestId('visual-suggestion')).toHaveCount(0)

  await body.fill('这是一段已经足够长并且形成主题的正文内容，需要考虑是否添加配图。小改')
  await page.getByTestId('title-input').focus()
  await expect(page.getByTestId('visual-suggestion')).toHaveCount(0)
})

test('adjacent composer utilities remain available after structural optimization', async ({ page }) => {
  await page.getByTestId('body-input').fill('保持编辑器的其他功能')

  await page.getByTestId('add-topics').click()
  await page.getByTestId('topic-创作灵感').click()
  await page.getByText('完成', { exact: true }).click()
  await expect(page.getByTestId('topic-summary')).toContainText('#创作灵感')

  await page.getByTestId('emoji-tool').click()
  await page.getByTestId('emoji-😀').click()
  await page.getByText('完成', { exact: true }).click()

  await page.getByTestId('mention-tool').click()
  await page.getByTestId('mention-阿青').click()
  await expect(page.getByTestId('body-input')).toHaveValue(/@阿青/)

  await page.getByTestId('settings-tool').click()
  await expect(page.getByText('有限访问', { exact: true })).toBeVisible()
  await page.getByTestId('grant-full-photo-access').click()
  await expect(page.getByText('允许访问所有照片', { exact: true })).toBeVisible()
})
