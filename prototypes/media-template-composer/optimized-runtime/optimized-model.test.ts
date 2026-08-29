import assert from 'node:assert/strict'
import test from 'node:test'

import {
  commitGeneratedCandidate,
  createInitialState,
  dismissVisualSuggestion,
  generateCandidates,
  openExisting,
  openGenerate,
  selectGeneratedCandidate,
  setBodyFocused,
  shouldShowVisualSuggestion,
  updateBody,
} from './optimized-model.ts'

test('visual suggestion waits for a natural break and enough draft context', () => {
  let state = createInitialState()
  state = updateBody(state, '这是一段已经形成明确主题的正文内容。')
  state = setBodyFocused(state, true)

  assert.equal(shouldShowVisualSuggestion(state), false)

  state = setBodyFocused(state, false)
  assert.equal(shouldShowVisualSuggestion(state), true)
})

test('dismissed suggestion does not resurface until the draft changes materially', () => {
  let state = createInitialState()
  state = updateBody(state, '这是一段已经形成明确主题的正文内容。')
  state = dismissVisualSuggestion(state)

  assert.equal(shouldShowVisualSuggestion(state), false)

  state = updateBody(state, `${state.draft.body} 少量改动`)
  assert.equal(shouldShowVisualSuggestion(state), false)

  state = updateBody(state, `${state.draft.body} 这是后来新增的一整段重要内容用于改变推荐依据`)
  assert.equal(shouldShowVisualSuggestion(state), true)
})

test('album shortcut can bind existing-media source without reopening acquisition intent', () => {
  let state = createInitialState()
  state = openExisting(state, 'album')

  assert.equal(state.flow, 'existing')
  assert.equal(state.existingSource, 'album')
})

test('draft generation adds a selected visual without rewriting user-authored body', () => {
  let state = createInitialState()
  state = updateBody(state, '正文已经写好，生成配图只能增加视觉附件。')
  state = openGenerate(state)
  state = generateCandidates(state)

  assert.equal(state.generation.candidates.length, 3)
  assert.equal(state.draft.attachments.length, 0)

  state = selectGeneratedCandidate(state, state.generation.candidates[1].id)
  state = commitGeneratedCandidate(state)

  assert.equal(state.draft.body, '正文已经写好，生成配图只能增加视觉附件。')
  assert.equal(state.draft.attachments.length, 1)
  assert.equal(state.draft.attachments[0].kind, 'generated_visual')
  assert.equal(state.flow, null)
})
