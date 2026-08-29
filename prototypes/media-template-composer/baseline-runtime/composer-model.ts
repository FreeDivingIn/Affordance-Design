export type SourceTab = 'album' | 'video' | 'game_assets' | 'all_templates'

export type Attachment = {
  id: string
  kind: 'photo' | 'video' | 'game_asset' | 'template_visual'
  label: string
}

export type ComposerDraft = {
  title: string
  body: string
  topics: string[]
  mentions: string[]
  attachments: Attachment[]
}

export type TemplateSession = {
  templateId: string
  instruction: string
  preview: Attachment | null
}

export type ComposerState = {
  draft: ComposerDraft
  sourceTab: SourceTab
  acquisitionOpen: boolean
  selectedMediaIds: string[]
  photoPermission: 'limited' | 'full'
  templateSession: TemplateSession | null
}

export function createInitialState(): ComposerState {
  return {
    draft: {
      title: '',
      body: '',
      topics: [],
      mentions: [],
      attachments: [],
    },
    sourceTab: 'album',
    acquisitionOpen: true,
    selectedMediaIds: [],
    photoPermission: 'limited',
    templateSession: null,
  }
}

export function switchSource(state: ComposerState, sourceTab: SourceTab): ComposerState {
  return {
    ...state,
    sourceTab,
    templateSession: null,
  }
}

export function updateTitle(state: ComposerState, title: string): ComposerState {
  return {
    ...state,
    draft: {
      ...state.draft,
      title: title.slice(0, 30),
    },
  }
}

export function updateBody(state: ComposerState, body: string): ComposerState {
  return {
    ...state,
    draft: {
      ...state.draft,
      body,
    },
  }
}

export function addTopic(state: ComposerState, topic: string): ComposerState {
  if (state.draft.topics.includes(topic)) return state
  return {
    ...state,
    draft: {
      ...state.draft,
      topics: [...state.draft.topics, topic],
    },
  }
}

export function insertMention(state: ComposerState, mention: string): ComposerState {
  return {
    ...state,
    draft: {
      ...state.draft,
      mentions: state.draft.mentions.includes(mention)
        ? state.draft.mentions
        : [...state.draft.mentions, mention],
      body: `${state.draft.body}${state.draft.body ? ' ' : ''}@${mention} `,
    },
  }
}

export function insertEmoji(state: ComposerState, emoji: string): ComposerState {
  return {
    ...state,
    draft: {
      ...state.draft,
      body: `${state.draft.body}${emoji}`,
    },
  }
}

export function toggleSelectedMedia(state: ComposerState, id: string): ComposerState {
  const selected = state.selectedMediaIds.includes(id)
  return {
    ...state,
    selectedMediaIds: selected
      ? state.selectedMediaIds.filter((item) => item !== id)
      : [...state.selectedMediaIds, id],
  }
}

export function commitSelectedMedia(
  state: ComposerState,
  items: Attachment[]
): ComposerState {
  const selected = new Set(state.selectedMediaIds)
  const existing = new Set(state.draft.attachments.map((item) => item.id))
  const itemById = new Map(items.map((item) => [item.id, item]))

  const additions = state.selectedMediaIds
    .filter((id) => !existing.has(id))
    .map((id) => {
      const known = itemById.get(id)
      if (known) return known
      if (id.startsWith('camera-')) {
        return {
          id,
          kind: 'photo' as const,
          label: '拍摄照片',
        }
      }
      return null
    })
    .filter((item): item is Attachment => item !== null && selected.has(item.id))

  return {
    ...state,
    selectedMediaIds: [],
    draft: {
      ...state.draft,
      attachments: [...state.draft.attachments, ...additions],
    },
  }
}

export function capturePhoto(state: ComposerState, id: string): ComposerState {
  return {
    ...state,
    selectedMediaIds: [...state.selectedMediaIds, id],
  }
}

export function setPhotoPermission(
  state: ComposerState,
  photoPermission: 'limited' | 'full'
): ComposerState {
  return {
    ...state,
    photoPermission,
  }
}

export function startTemplate(state: ComposerState, templateId: string): ComposerState {
  return {
    ...state,
    sourceTab: 'all_templates',
    templateSession: {
      templateId,
      instruction: '',
      preview: null,
    },
  }
}

export function updateTemplateInstruction(
  state: ComposerState,
  instruction: string
): ComposerState {
  if (!state.templateSession) return state
  return {
    ...state,
    templateSession: {
      ...state.templateSession,
      instruction,
    },
  }
}

export function generateTemplatePreview(
  state: ComposerState,
  label: string
): ComposerState {
  if (!state.templateSession) return state

  return {
    ...state,
    templateSession: {
      ...state.templateSession,
      preview: {
        id: `generated-${state.templateSession.templateId}`,
        kind: 'template_visual',
        label,
      },
    },
  }
}

export function commitTemplatePreview(state: ComposerState): ComposerState {
  const preview = state.templateSession?.preview
  if (!preview) return state

  const exists = state.draft.attachments.some((item) => item.id === preview.id)
  return {
    ...state,
    draft: {
      ...state.draft,
      attachments: exists ? state.draft.attachments : [...state.draft.attachments, preview],
    },
    templateSession: null,
  }
}

export function closeTemplate(state: ComposerState): ComposerState {
  return {
    ...state,
    templateSession: null,
  }
}

export function toggleAcquisition(state: ComposerState): ComposerState {
  return {
    ...state,
    acquisitionOpen: !state.acquisitionOpen,
    templateSession: state.acquisitionOpen ? null : state.templateSession,
  }
}
