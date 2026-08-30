export type ExistingSource = 'album' | 'video' | 'game_assets'
export type VisualFlow = null | 'launcher' | 'existing' | 'generate' | 'templates'

export type Attachment = {
  id: string
  kind: 'photo' | 'video' | 'game_asset' | 'generated_visual' | 'template_visual'
  label: string
}

export type Draft = {
  title: string
  body: string
  topics: string[]
  mentions: string[]
  attachments: Attachment[]
}

export type GeneratedCandidate = Attachment & {
  candidateIndex: number
}

export type GenerationSession = {
  instruction: string
  candidates: GeneratedCandidate[]
  selectedCandidateId: string | null
}

export type TemplateSession = {
  templateId: string
  input: string
  preview: Attachment | null
}

export type OptimizedState = {
  draft: Draft
  flow: VisualFlow
  existingSource: ExistingSource
  selectedMediaIds: string[]
  photoPermission: 'limited' | 'full'
  generation: GenerationSession
  templateSession: TemplateSession | null
  bodyFocused: boolean
  suggestionDismissedBody: string | null
}

export function createInitialState(): OptimizedState {
  return {
    draft: {
      title: '',
      body: '',
      topics: [],
      mentions: [],
      attachments: [],
    },
    flow: 'launcher',
    existingSource: 'album',
    selectedMediaIds: [],
    photoPermission: 'limited',
    generation: {
      instruction: '',
      candidates: [],
      selectedCandidateId: null,
    },
    templateSession: null,
    bodyFocused: false,
    suggestionDismissedBody: null,
  }
}

export function updateTitle(state: OptimizedState, title: string): OptimizedState {
  return {
    ...state,
    draft: { ...state.draft, title: title.slice(0, 30) },
  }
}

export function updateBody(state: OptimizedState, body: string): OptimizedState {
  return {
    ...state,
    draft: { ...state.draft, body },
  }
}

export function setBodyFocused(state: OptimizedState, bodyFocused: boolean): OptimizedState {
  return {
    ...state,
    bodyFocused,
    flow: bodyFocused ? null : state.flow,
  }
}

export function addTopic(state: OptimizedState, topic: string): OptimizedState {
  if (state.draft.topics.includes(topic)) return state
  return {
    ...state,
    draft: { ...state.draft, topics: [...state.draft.topics, topic] },
  }
}

export function insertMention(state: OptimizedState, mention: string): OptimizedState {
  const mentions = state.draft.mentions.includes(mention)
    ? state.draft.mentions
    : [...state.draft.mentions, mention]
  return {
    ...state,
    draft: {
      ...state.draft,
      mentions,
      body: `${state.draft.body}${state.draft.body ? ' ' : ''}@${mention} `,
    },
  }
}

export function insertEmoji(state: OptimizedState, emoji: string): OptimizedState {
  return {
    ...state,
    draft: { ...state.draft, body: `${state.draft.body}${emoji}` },
  }
}

export function openLauncher(state: OptimizedState): OptimizedState {
  return {
    ...state,
    flow: 'launcher',
    templateSession: null,
  }
}

export function openExisting(
  state: OptimizedState,
  source: ExistingSource | null = null
): OptimizedState {
  return {
    ...state,
    flow: 'existing',
    existingSource: source ?? state.existingSource,
    templateSession: null,
  }
}

export function openGenerate(state: OptimizedState): OptimizedState {
  return {
    ...state,
    flow: 'generate',
    templateSession: null,
    generation: {
      instruction: state.generation.instruction,
      candidates: [],
      selectedCandidateId: null,
    },
  }
}

export function openTemplates(state: OptimizedState): OptimizedState {
  return {
    ...state,
    flow: 'templates',
    templateSession: null,
  }
}

export function closeVisualFlow(state: OptimizedState): OptimizedState {
  return {
    ...state,
    flow: null,
    selectedMediaIds: [],
    templateSession: null,
  }
}

export function switchExistingSource(
  state: OptimizedState,
  existingSource: ExistingSource
): OptimizedState {
  return {
    ...state,
    flow: 'existing',
    existingSource,
    selectedMediaIds: [],
  }
}

export function toggleSelectedMedia(state: OptimizedState, id: string): OptimizedState {
  const selected = state.selectedMediaIds.includes(id)
  return {
    ...state,
    selectedMediaIds: selected
      ? state.selectedMediaIds.filter((item) => item !== id)
      : [...state.selectedMediaIds, id],
  }
}

export function commitSelectedMedia(
  state: OptimizedState,
  items: Attachment[]
): OptimizedState {
  const itemById = new Map(items.map((item) => [item.id, item]))
  const existing = new Set(state.draft.attachments.map((item) => item.id))
  const additions = state.selectedMediaIds
    .filter((id) => !existing.has(id))
    .map((id) => {
      const known = itemById.get(id)
      if (known) return known
      if (id.startsWith('camera-')) {
        return { id, kind: 'photo' as const, label: '拍摄照片' }
      }
      return null
    })
    .filter((item): item is Attachment => item !== null)

  return {
    ...state,
    selectedMediaIds: [],
    draft: {
      ...state.draft,
      attachments: [...state.draft.attachments, ...additions],
    },
  }
}

export function capturePhoto(state: OptimizedState, id: string): OptimizedState {
  return {
    ...state,
    flow: 'existing',
    existingSource: 'album',
    selectedMediaIds: [...state.selectedMediaIds, id],
  }
}

export function setPhotoPermission(
  state: OptimizedState,
  photoPermission: 'limited' | 'full'
): OptimizedState {
  return { ...state, photoPermission }
}

export function updateGenerationInstruction(
  state: OptimizedState,
  instruction: string
): OptimizedState {
  return {
    ...state,
    generation: { ...state.generation, instruction },
  }
}

export function generateCandidates(state: OptimizedState): OptimizedState {
  if (state.draft.body.trim().length < 4 && state.draft.title.trim().length < 4) return state

  const candidates: GeneratedCandidate[] = [1, 2, 3].map((candidateIndex) => ({
    id: `draft-visual-${candidateIndex}`,
    kind: 'generated_visual',
    label: `正文配图 ${candidateIndex}`,
    candidateIndex,
  }))

  return {
    ...state,
    flow: 'generate',
    generation: {
      ...state.generation,
      candidates,
      selectedCandidateId: null,
    },
  }
}

export function selectGeneratedCandidate(
  state: OptimizedState,
  candidateId: string
): OptimizedState {
  if (!state.generation.candidates.some((candidate) => candidate.id === candidateId)) {
    return state
  }
  return {
    ...state,
    generation: { ...state.generation, selectedCandidateId: candidateId },
  }
}

export function commitGeneratedCandidate(state: OptimizedState): OptimizedState {
  const selected = state.generation.candidates.find(
    (candidate) => candidate.id === state.generation.selectedCandidateId
  )
  if (!selected) return state

  const exists = state.draft.attachments.some((item) => item.id === selected.id)
  return {
    ...state,
    flow: null,
    draft: {
      ...state.draft,
      attachments: exists ? state.draft.attachments : [...state.draft.attachments, selected],
    },
    generation: {
      instruction: '',
      candidates: [],
      selectedCandidateId: null,
    },
  }
}

export function startTemplate(state: OptimizedState, templateId: string): OptimizedState {
  return {
    ...state,
    flow: 'templates',
    templateSession: {
      templateId,
      input: '',
      preview: null,
    },
  }
}

export function updateTemplateInput(state: OptimizedState, input: string): OptimizedState {
  if (!state.templateSession) return state
  return {
    ...state,
    templateSession: { ...state.templateSession, input },
  }
}

export function generateTemplatePreview(state: OptimizedState, label: string): OptimizedState {
  if (!state.templateSession) return state
  return {
    ...state,
    templateSession: {
      ...state.templateSession,
      preview: {
        id: `template-${state.templateSession.templateId}-${Date.now()}`,
        kind: 'template_visual',
        label,
      },
    },
  }
}

export function commitTemplatePreview(state: OptimizedState): OptimizedState {
  const preview = state.templateSession?.preview
  if (!preview) return state
  return {
    ...state,
    flow: null,
    templateSession: null,
    draft: {
      ...state.draft,
      attachments: [...state.draft.attachments, preview],
    },
  }
}

export function closeTemplate(state: OptimizedState): OptimizedState {
  return { ...state, templateSession: null }
}

function normalizedMeaningfulLength(value: string): number {
  return value.replace(/\s+/g, '').length
}

export function bodyChangedEnough(previous: string, current: string): boolean {
  if (previous === current) return false
  const lengthDelta = Math.abs(
    normalizedMeaningfulLength(current) - normalizedMeaningfulLength(previous)
  )
  return lengthDelta >= 12
}

export function shouldShowVisualSuggestion(state: OptimizedState): boolean {
  if (state.bodyFocused) return false
  if (normalizedMeaningfulLength(state.draft.body) < 12) return false
  if (state.draft.attachments.length > 0) return false
  if (state.flow !== null) return false

  if (
    state.suggestionDismissedBody !== null &&
    !bodyChangedEnough(state.suggestionDismissedBody, state.draft.body)
  ) {
    return false
  }

  return true
}

export function dismissVisualSuggestion(state: OptimizedState): OptimizedState {
  return {
    ...state,
    suggestionDismissedBody: state.draft.body,
  }
}
