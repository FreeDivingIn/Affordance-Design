import assert from 'node:assert/strict'
import test from 'node:test'

import {
  commitSelectedMedia,
  commitTemplatePreview,
  createInitialState,
  generateTemplatePreview,
  startTemplate,
  switchSource,
  toggleSelectedMedia,
  updateBody,
  updateTemplateInstruction,
  updateTitle,
  type Attachment,
} from './composer-model.ts'

const albumItems: Attachment[] = [
  { id: 'photo-1', kind: 'photo', label: 'Rain GIF' },
  { id: 'photo-2', kind: 'photo', label: 'Warm texture' },
]

test('switching source tabs preserves user-authored title and body', () => {
  let state = createInitialState()
  state = updateTitle(state, 'A title')
  state = updateBody(state, 'Draft body')
  state = switchSource(state, 'all_templates')
  state = switchSource(state, 'video')

  assert.equal(state.draft.title, 'A title')
  assert.equal(state.draft.body, 'Draft body')
})

test('media selection does not become an attachment until explicit commit', () => {
  let state = createInitialState()
  state = toggleSelectedMedia(state, 'photo-1')

  assert.deepEqual(state.selectedMediaIds, ['photo-1'])
  assert.deepEqual(state.draft.attachments, [])

  state = commitSelectedMedia(state, albumItems)
  assert.deepEqual(state.selectedMediaIds, [])
  assert.deepEqual(state.draft.attachments, [albumItems[0]])
})

test('template generation remains provisional until insertion', () => {
  let state = createInitialState()
  state = updateBody(state, 'Existing user text')
  state = startTemplate(state, 'text-image')
  state = updateTemplateInstruction(state, 'Use the draft topic')
  state = generateTemplatePreview(state, 'Text image preview')

  assert.equal(state.draft.body, 'Existing user text')
  assert.deepEqual(state.draft.attachments, [])
  assert.equal(state.templateSession?.preview?.kind, 'template_visual')

  state = commitTemplatePreview(state)
  assert.equal(state.draft.body, 'Existing user text')
  assert.equal(state.draft.attachments.length, 1)
  assert.equal(state.templateSession, null)
})

test('title is capped at the derived 30-character baseline limit', () => {
  const state = updateTitle(createInitialState(), '123456789012345678901234567890EXTRA')
  assert.equal(state.draft.title, '123456789012345678901234567890')
})
