import { useMemo, useState } from 'react'
import { Pressable, TextInput, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { TamaguiProvider, Text, XStack, YStack } from 'tamagui'

import {
  addTopic,
  capturePhoto,
  closeTemplate,
  closeVisualFlow,
  commitGeneratedCandidate,
  commitSelectedMedia,
  commitTemplatePreview,
  createInitialState,
  dismissVisualSuggestion,
  generateCandidates,
  generateTemplatePreview,
  insertEmoji,
  insertMention,
  openExisting,
  openGenerate,
  openLauncher,
  openTemplates,
  selectGeneratedCandidate,
  setBodyFocused,
  setPhotoPermission,
  shouldShowVisualSuggestion,
  startTemplate,
  switchExistingSource,
  toggleSelectedMedia,
  updateBody,
  updateGenerationInstruction,
  updateTemplateInput,
  updateTitle,
  type Attachment,
  type ExistingSource,
  type OptimizedState,
} from './optimized-model'
import { tamaguiConfig } from './tamagui.config'

type UtilityOverlay = null | 'topics' | 'emoji' | 'mentions' | 'settings' | 'camera'

type VisualItem = Attachment & {
  background: string
  badge?: string
}

type TemplateItem = {
  id: string
  label: string
  subtitle: string
  background: string
  needsInput: boolean
}

const albumItems: VisualItem[] = [
  { id: 'photo-gif', kind: 'photo', label: '动态图片', badge: 'GIF', background: '#4d86b9' },
  { id: 'photo-2', kind: 'photo', label: '浅色照片', background: '#ead6ab' },
  { id: 'photo-3', kind: 'photo', label: '绿色照片', background: '#637d70' },
  { id: 'photo-4', kind: 'photo', label: '木纹照片', background: '#cba572' },
  { id: 'photo-5', kind: 'photo', label: '暖色照片', background: '#ead7a5' },
  { id: 'photo-6', kind: 'photo', label: '灰色照片', background: '#a6aaa6' },
  { id: 'photo-7', kind: 'photo', label: '奶油照片', background: '#eadbb7' },
]

const videoItems: VisualItem[] = [
  { id: 'video-1', kind: 'video', label: '短视频 1', badge: '00:12', background: '#604f73' },
  { id: 'video-2', kind: 'video', label: '短视频 2', badge: '00:28', background: '#476578' },
  { id: 'video-3', kind: 'video', label: '视频 3', badge: '01:04', background: '#6f634b' },
  { id: 'video-4', kind: 'video', label: '短视频 4', badge: '00:19', background: '#4d6b59' },
  { id: 'video-5', kind: 'video', label: '视频 5', badge: '00:36', background: '#78585c' },
  { id: 'video-6', kind: 'video', label: '视频 6', badge: '00:44', background: '#4b5e72' },
]

const gameAssetItems: VisualItem[] = [
  { id: 'asset-1', kind: 'game_asset', label: '战绩卡', background: '#3e4f66' },
  { id: 'asset-2', kind: 'game_asset', label: '装备图', background: '#554b68' },
  { id: 'asset-3', kind: 'game_asset', label: '角色图', background: '#4f6656' },
  { id: 'asset-4', kind: 'game_asset', label: '地图图', background: '#696148' },
  { id: 'asset-5', kind: 'game_asset', label: '数据图', background: '#47616b' },
  { id: 'asset-6', kind: 'game_asset', label: '收藏图', background: '#6b4e57' },
]

const allSelectableItems: Attachment[] = [
  ...albumItems.map(({ background: _background, badge: _badge, ...item }) => item),
  ...videoItems.map(({ background: _background, badge: _badge, ...item }) => item),
  ...gameAssetItems.map(({ background: _background, badge: _badge, ...item }) => item),
]

const templates: TemplateItem[] = [
  { id: 'card', label: '卡片生成器', subtitle: '把信息整理成视觉卡片', background: '#684487', needsInput: false },
  { id: 'loadout', label: '随机装备', subtitle: '选择范围后生成组合', background: '#31413f', needsInput: true },
  { id: 'identity', label: '身份卡', subtitle: '填写对象后生成身份卡', background: '#765c8f', needsInput: true },
  { id: 'relations', label: '角色关系', subtitle: '填写对象后组合关系', background: '#345a86', needsInput: true },
  { id: 'fortune', label: '今日运势', subtitle: '生成趣味结果', background: '#24493f', needsInput: false },
  { id: 'life', label: '人生预测', subtitle: '生成趣味预测', background: '#2382b8', needsInput: false },
]

const existingTabs: Array<{ id: ExistingSource; label: string }> = [
  { id: 'album', label: '相册' },
  { id: 'video', label: '视频' },
  { id: 'game_assets', label: '游戏素材' },
]

function ProductButton({
  testID,
  label,
  onPress,
  primary = false,
  compact = false,
}: {
  testID?: string
  label: string
  onPress: () => void
  primary?: boolean
  compact?: boolean
}) {
  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      style={({ pressed }) => ({
        opacity: pressed ? 0.72 : 1,
        backgroundColor: primary ? '#e7e8ea' : '#27292c',
        paddingHorizontal: compact ? 10 : 14,
        paddingVertical: compact ? 7 : 10,
        borderRadius: 7,
      })}
    >
      <Text color={primary ? '#161719' : '#e6e7e9'} fontSize={compact ? 13 : 14} fontWeight={primary ? '600' : '400'}>
        {label}
      </Text>
    </Pressable>
  )
}

function PanelHeader({ title, onClose }: { title: string; onClose: () => void }) {
  return (
    <XStack px="$3" pt="$3" pb="$2" items="center" justify="space-between">
      <Text color="#eeeeef" fontWeight="700">{title}</Text>
      <ProductButton testID="close-visual-panel" label="完成" compact onPress={onClose} />
    </XStack>
  )
}

function ChoiceCard({
  testID,
  title,
  description,
  onPress,
}: {
  testID: string
  title: string
  description: string
  onPress: () => void
}) {
  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      style={({ pressed }) => ({
        opacity: pressed ? 0.72 : 1,
        borderWidth: 1,
        borderColor: '#33363a',
        borderRadius: 10,
        backgroundColor: '#17191b',
        padding: 14,
      })}
    >
      <Text color="#f0f0f1" fontWeight="700" fontSize={15}>{title}</Text>
      <Text color="#8f9297" mt="$1" fontSize={12}>{description}</Text>
    </Pressable>
  )
}

function SelectionCircle({ index }: { index: number | null }) {
  return (
    <View
      style={{
        position: 'absolute',
        right: 7,
        top: 7,
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#fff',
        backgroundColor: index ? '#e8e8e8' : 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {index ? <Text color="#151618" fontSize={12} fontWeight="700">{index}</Text> : null}
    </View>
  )
}

function MediaGrid({
  state,
  setState,
  items,
  camera,
  onCamera,
}: {
  state: OptimizedState
  setState: React.Dispatch<React.SetStateAction<OptimizedState>>
  items: VisualItem[]
  camera?: boolean
  onCamera?: () => void
}) {
  return (
    <XStack flexWrap="wrap" width="100%">
      {camera ? (
        <Pressable
          testID="camera-tile"
          onPress={onCamera}
          style={{ width: '25%', aspectRatio: 1, padding: 1 }}
        >
          <View style={{ flex: 1, backgroundColor: '#222427', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <Text fontSize={24}>▣</Text>
            <Text color="#a3a5a9" fontSize={12}>拍照</Text>
          </View>
        </Pressable>
      ) : null}
      {items.map((item) => {
        const selectedIndex = state.selectedMediaIds.indexOf(item.id)
        return (
          <Pressable
            key={item.id}
            testID={`media-${item.id}`}
            onPress={() => setState((current) => toggleSelectedMedia(current, item.id))}
            style={{ width: '25%', aspectRatio: 1, padding: 1 }}
          >
            <View style={{ flex: 1, backgroundColor: item.background, justifyContent: 'flex-end', padding: 8 }}>
              <SelectionCircle index={selectedIndex >= 0 ? selectedIndex + 1 : null} />
              {item.badge ? <Text color="#fff" fontWeight="700" fontSize={12}>{item.badge}</Text> : null}
            </View>
          </Pressable>
        )
      })}
    </XStack>
  )
}

function UtilityPanel({
  overlay,
  state,
  setState,
  close,
}: {
  overlay: Exclude<UtilityOverlay, null>
  state: OptimizedState
  setState: React.Dispatch<React.SetStateAction<OptimizedState>>
  close: () => void
}) {
  if (overlay === 'topics') {
    const topics = ['创作灵感', '游戏记录', '今日分享', '攻略讨论']
    return (
      <YStack p="$3" gap="$3">
        <XStack justify="space-between" items="center">
          <Text color="#f0f0f1" fontWeight="700">添加分区及话题</Text>
          <ProductButton label="完成" compact onPress={close} />
        </XStack>
        <Text color="#8d9095" fontSize={12}>分区：内容交流</Text>
        <XStack gap="$2" flexWrap="wrap">
          {topics.map((topic) => (
            <ProductButton
              key={topic}
              testID={`topic-${topic}`}
              label={`# ${topic}`}
              primary={state.draft.topics.includes(topic)}
              onPress={() => setState((current) => addTopic(current, topic))}
            />
          ))}
        </XStack>
      </YStack>
    )
  }

  if (overlay === 'emoji') {
    return (
      <YStack p="$3" gap="$3">
        <XStack justify="space-between" items="center">
          <Text color="#f0f0f1" fontWeight="700">表情</Text>
          <ProductButton label="完成" compact onPress={close} />
        </XStack>
        <XStack gap="$3" flexWrap="wrap">
          {['😀', '😂', '👍', '🎮', '✨', '🔥', '🥳', '❤️'].map((emoji) => (
            <Pressable
              key={emoji}
              testID={`emoji-${emoji}`}
              onPress={() => setState((current) => insertEmoji(current, emoji))}
              style={{ padding: 7 }}
            >
              <Text fontSize={27}>{emoji}</Text>
            </Pressable>
          ))}
        </XStack>
      </YStack>
    )
  }

  if (overlay === 'mentions') {
    return (
      <YStack p="$3" gap="$2">
        <XStack justify="space-between" items="center">
          <Text color="#f0f0f1" fontWeight="700">提到</Text>
          <ProductButton label="取消" compact onPress={close} />
        </XStack>
        {['阿青', '林夏', '小周', 'K'].map((person) => (
          <ProductButton
            key={person}
            testID={`mention-${person}`}
            label={`@${person}`}
            onPress={() => {
              setState((current) => insertMention(current, person))
              close()
            }}
          />
        ))}
      </YStack>
    )
  }

  if (overlay === 'settings') {
    return (
      <YStack p="$3" gap="$3">
        <XStack justify="space-between" items="center">
          <Text color="#f0f0f1" fontWeight="700">设置</Text>
          <ProductButton label="完成" compact onPress={close} />
        </XStack>
        <XStack justify="space-between" items="center" gap="$3">
          <YStack flex={1}>
            <Text color="#e4e5e7">照片访问</Text>
            <Text color="#8e9196" fontSize={12}>{state.photoPermission === 'full' ? '允许访问所有照片' : '有限访问'}</Text>
          </YStack>
          {state.photoPermission === 'limited' ? (
            <ProductButton
              testID="grant-full-photo-access"
              label="已允许所有照片"
              compact
              onPress={() => setState((current) => setPhotoPermission(current, 'full'))}
            />
          ) : null}
        </XStack>
      </YStack>
    )
  }

  return (
    <YStack p="$3" gap="$3" flex={1}>
      <XStack justify="space-between" items="center">
        <Text color="#f0f0f1" fontWeight="700">拍照</Text>
        <ProductButton label="取消" compact onPress={close} />
      </XStack>
      <YStack flex={1} bg="#292b2e" rounded="$4" items="center" justify="center">
        <Text color="#85888d">相机</Text>
      </YStack>
      <XStack justify="center">
        <Pressable
          testID="camera-shutter"
          onPress={() => {
            setState((current) => capturePhoto(current, `camera-${Date.now()}`))
            close()
          }}
          style={{ width: 58, height: 58, borderRadius: 29, borderWidth: 5, borderColor: '#e5e7eb', backgroundColor: '#cfd2d6' }}
        />
      </XStack>
    </YStack>
  )
}

function LauncherPanel({
  state,
  setState,
}: {
  state: OptimizedState
  setState: React.Dispatch<React.SetStateAction<OptimizedState>>
}) {
  return (
    <YStack flex={1} gap="$2">
      <PanelHeader title="添加配图" onClose={() => setState((current) => closeVisualFlow(current))} />
      <YStack px="$3" gap="$2">
        <ChoiceCard
          testID="choice-existing"
          title="从已有素材添加"
          description="相册、视频或已有素材"
          onPress={() => setState((current) => openExisting(current))}
        />
        <ChoiceCard
          testID="choice-generate"
          title="根据正文生成配图"
          description="直接使用当前标题、正文和话题"
          onPress={() => setState((current) => openGenerate(current))}
        />
        <ChoiceCard
          testID="choice-templates"
          title="浏览创意模板"
          description="主动探索卡片、趣味生成器等模板"
          onPress={() => setState((current) => openTemplates(current))}
        />
      </YStack>
    </YStack>
  )
}

function ExistingMediaPanel({
  state,
  setState,
  setUtilityOverlay,
}: {
  state: OptimizedState
  setState: React.Dispatch<React.SetStateAction<OptimizedState>>
  setUtilityOverlay: (value: UtilityOverlay) => void
}) {
  const items = state.existingSource === 'album' ? albumItems : state.existingSource === 'video' ? videoItems : gameAssetItems

  return (
    <YStack flex={1}>
      <XStack px="$3" pt="$3" pb="$2" items="center" justify="space-between">
        <ProductButton testID="back-to-launcher" label="‹ 添加配图" compact onPress={() => setState((current) => openLauncher(current))} />
        <Text color="#eeeeef" fontWeight="700">已有素材</Text>
        <ProductButton testID="close-visual-panel" label="完成" compact onPress={() => setState((current) => closeVisualFlow(current))} />
      </XStack>

      <XStack px="$3" gap="$2" pb="$2">
        {existingTabs.map((tab) => (
          <ProductButton
            key={tab.id}
            testID={`existing-tab-${tab.id}`}
            label={tab.label}
            compact
            primary={state.existingSource === tab.id}
            onPress={() => setState((current) => switchExistingSource(current, tab.id))}
          />
        ))}
      </XStack>

      {state.existingSource === 'album' && state.photoPermission === 'limited' ? (
        <XStack testID="photo-permission-banner" px="$3" py="$2" items="center" justify="space-between" gap="$2">
          <Text color="#7f8287" fontSize={12} flex={1}>点击 <Text color="#dfe0e2">去设置</Text> 切换至允许访问所有照片</Text>
          <ProductButton testID="photo-settings" label="去设置" compact primary onPress={() => setUtilityOverlay('settings')} />
        </XStack>
      ) : null}

      <YStack flex={1} overflow="hidden">
        <MediaGrid
          state={state}
          setState={setState}
          items={items}
          camera={state.existingSource === 'album'}
          onCamera={() => setUtilityOverlay('camera')}
        />
      </YStack>

      {state.selectedMediaIds.length > 0 ? (
        <XStack px="$3" py="$2" justify="flex-end" borderTopWidth={1} borderColor="#242629">
          <ProductButton
            testID="commit-selected-media"
            label={`添加 ${state.selectedMediaIds.length}`}
            primary
            onPress={() => setState((current) => commitSelectedMedia(current, allSelectableItems))}
          />
        </XStack>
      ) : null}
    </YStack>
  )
}

function GenerateFromDraftPanel({
  state,
  setState,
}: {
  state: OptimizedState
  setState: React.Dispatch<React.SetStateAction<OptimizedState>>
}) {
  const draftContext = (state.draft.body || state.draft.title).trim()
  const canGenerate = draftContext.length >= 4

  return (
    <YStack flex={1} gap="$2">
      <XStack px="$3" pt="$3" items="center" justify="space-between">
        <ProductButton testID="back-to-launcher" label="‹ 添加配图" compact onPress={() => setState((current) => openLauncher(current))} />
        <Text color="#eeeeef" fontWeight="700">根据正文生成配图</Text>
        <ProductButton testID="close-visual-panel" label="完成" compact onPress={() => setState((current) => closeVisualFlow(current))} />
      </XStack>

      <YStack mx="$3" p="$3" bg="#1a1c1e" rounded="$3" gap="$1">
        <Text color="#878a8f" fontSize={11}>当前正文</Text>
        <Text testID="generation-draft-context" color="#d9dade" fontSize={13} numberOfLines={3}>
          {draftContext || '先写一点正文，再根据内容生成配图'}
        </Text>
      </YStack>

      <TextInput
        testID="generation-instruction"
        value={state.generation.instruction}
        onChangeText={(value) => setState((current) => updateGenerationInstruction(current, value))}
        placeholder="可选：补充画面重点或风格"
        placeholderTextColor="#62656a"
        style={{ marginHorizontal: 12, color: '#ececee', borderWidth: 1, borderColor: '#34363a', borderRadius: 7, padding: 10, fontSize: 13 }}
      />

      {state.generation.candidates.length === 0 ? (
        <YStack flex={1} px="$3" justify="center" items="center" gap="$3">
          <Text color="#777a80" fontSize={12}>{canGenerate ? '使用当前正文生成多个候选，生成前不会修改正文。' : '正文信息不足，继续编辑后再生成。'}</Text>
          {canGenerate ? (
            <ProductButton testID="generate-draft-visuals" label="生成配图" primary onPress={() => setState((current) => generateCandidates(current))} />
          ) : null}
        </YStack>
      ) : (
        <YStack flex={1} gap="$2" px="$3">
          <Text color="#8b8e93" fontSize={12}>选择一个候选</Text>
          <XStack gap="$2">
            {state.generation.candidates.map((candidate) => {
              const selected = state.generation.selectedCandidateId === candidate.id
              return (
                <Pressable
                  key={candidate.id}
                  testID={`generated-candidate-${candidate.candidateIndex}`}
                  onPress={() => setState((current) => selectGeneratedCandidate(current, candidate.id))}
                  style={{ flex: 1 }}
                >
                  <View style={{ aspectRatio: 0.82, borderRadius: 8, backgroundColor: selected ? '#6c7380' : '#34383f', borderWidth: selected ? 2 : 1, borderColor: selected ? '#f0f1f2' : '#45484e', padding: 8, justifyContent: 'flex-end' }}>
                    <Text color="#fff" fontSize={12}>{candidate.label}</Text>
                  </View>
                </Pressable>
              )
            })}
          </XStack>
          <XStack justify="space-between" items="center">
            <ProductButton testID="regenerate-draft-visuals" label="重新生成" compact onPress={() => setState((current) => generateCandidates(current))} />
            {state.generation.selectedCandidateId ? (
              <ProductButton testID="insert-generated-visual" label="插入正文" primary onPress={() => setState((current) => commitGeneratedCandidate(current))} />
            ) : null}
          </XStack>
        </YStack>
      )}
    </YStack>
  )
}

function TemplateSessionPanel({
  state,
  setState,
}: {
  state: OptimizedState
  setState: React.Dispatch<React.SetStateAction<OptimizedState>>
}) {
  const session = state.templateSession
  if (!session) return null
  const template = templates.find((item) => item.id === session.templateId) ?? templates[0]
  const draftContext = (state.draft.body || state.draft.title).trim()

  return (
    <YStack flex={1} p="$3" gap="$3">
      <XStack items="center" justify="space-between">
        <ProductButton testID="back-to-template-catalog" label="‹ 模板" compact onPress={() => setState((current) => closeTemplate(current))} />
        <Text color="#eeeeef" fontWeight="700">{template.label}</Text>
        <ProductButton testID="close-visual-panel" label="完成" compact onPress={() => setState((current) => closeVisualFlow(current))} />
      </XStack>

      {draftContext ? (
        <YStack bg="#1a1c1e" p="$3" rounded="$3" gap="$1">
          <Text color="#85888d" fontSize={11}>已从当前内容获取</Text>
          <Text color="#d5d6d9" fontSize={12} numberOfLines={2}>{draftContext}</Text>
        </YStack>
      ) : null}

      {template.needsInput ? (
        <TextInput
          testID="template-input"
          value={session.input}
          onChangeText={(value) => setState((current) => updateTemplateInput(current, value))}
          placeholder={template.id === 'identity' ? '填写人物或角色' : '补充这个模板仍需要的信息'}
          placeholderTextColor="#62656a"
          style={{ color: '#ececee', borderWidth: 1, borderColor: '#34363a', borderRadius: 7, padding: 10, fontSize: 13 }}
        />
      ) : (
        <Text testID="no-extra-template-input" color="#86898e" fontSize={12}>当前内容已足够生成第一版，无需重复填写正文。</Text>
      )}

      {session.preview ? (
        <View testID="template-preview" style={{ flex: 1, borderRadius: 10, backgroundColor: template.background, padding: 14, justifyContent: 'flex-end' }}>
          <Text color="#fff" fontWeight="700" fontSize={18}>{template.label}</Text>
          <Text color="#fff" fontSize={12}>{session.input || '根据当前内容生成'}</Text>
        </View>
      ) : (
        <YStack flex={1} bg="#1a1c1e" rounded="$4" items="center" justify="center">
          <Text color="#7d8085">{template.subtitle}</Text>
        </YStack>
      )}

      <XStack justify="flex-end" gap="$2">
        {!session.preview ? (
          <ProductButton
            testID="generate-template-preview"
            label="生成预览"
            primary
            onPress={() => setState((current) => generateTemplatePreview(current, `${template.label}预览`))}
          />
        ) : (
          <>
            <ProductButton label="重新生成" onPress={() => setState((current) => generateTemplatePreview(current, `${template.label}预览`))} />
            <ProductButton testID="insert-template-preview" label="插入正文" primary onPress={() => setState((current) => commitTemplatePreview(current))} />
          </>
        )}
      </XStack>
    </YStack>
  )
}

function TemplateCatalogPanel({
  state,
  setState,
}: {
  state: OptimizedState
  setState: React.Dispatch<React.SetStateAction<OptimizedState>>
}) {
  if (state.templateSession) return <TemplateSessionPanel state={state} setState={setState} />

  return (
    <YStack flex={1}>
      <XStack px="$3" pt="$3" items="center" justify="space-between">
        <ProductButton testID="back-to-launcher" label="‹ 添加配图" compact onPress={() => setState((current) => openLauncher(current))} />
        <Text color="#eeeeef" fontWeight="700">浏览创意模板</Text>
        <ProductButton testID="close-visual-panel" label="完成" compact onPress={() => setState((current) => closeVisualFlow(current))} />
      </XStack>

      <YStack px="$3" pt="$2" gap="$2">
        <Text color="#8b8e93" fontSize={11}>适合当前内容</Text>
        <XStack gap="$2">
          <Pressable
            testID="template-alias-text-image"
            onPress={() => setState((current) => openGenerate(current))}
            style={{ flex: 1, borderWidth: 1, borderColor: '#3a3d42', borderRadius: 8, padding: 11, backgroundColor: '#1a1c1e' }}
          >
            <Text color="#ededee" fontWeight="700" fontSize={13}>文字配图</Text>
            <Text color="#85888d" fontSize={11}>直接使用当前正文</Text>
          </Pressable>
          <Pressable
            testID="recommended-template-card"
            onPress={() => setState((current) => startTemplate(current, 'card'))}
            style={{ flex: 1, borderWidth: 1, borderColor: '#3a3d42', borderRadius: 8, padding: 11, backgroundColor: '#1a1c1e' }}
          >
            <Text color="#ededee" fontWeight="700" fontSize={13}>内容卡片</Text>
            <Text color="#85888d" fontSize={11}>可直接生成第一版</Text>
          </Pressable>
        </XStack>
      </YStack>

      <Text color="#8b8e93" fontSize={11} px="$3" pt="$3" pb="$1">全部模板</Text>
      <XStack flexWrap="wrap" px="$2">
        {templates.map((template) => (
          <Pressable
            key={template.id}
            testID={`template-${template.id}`}
            onPress={() => setState((current) => startTemplate(current, template.id))}
            style={{ width: '33.333%', padding: 5 }}
          >
            <View style={{ aspectRatio: 0.84, borderRadius: 8, backgroundColor: template.background, padding: 8, justifyContent: 'flex-end' }}>
              <Text color="#fff" fontSize={12} fontWeight="700">{template.label}</Text>
            </View>
            <Text color="#d4d5d7" fontSize={11} mt="$1" numberOfLines={1}>{template.label}</Text>
          </Pressable>
        ))}
      </XStack>
    </YStack>
  )
}

function VisualPanel({
  state,
  setState,
  utilityOverlay,
  setUtilityOverlay,
}: {
  state: OptimizedState
  setState: React.Dispatch<React.SetStateAction<OptimizedState>>
  utilityOverlay: UtilityOverlay
  setUtilityOverlay: (value: UtilityOverlay) => void
}) {
  if (utilityOverlay) {
    return (
      <YStack testID="visual-panel" height={405} bg="#101112" borderTopWidth={1} borderColor="#25272a">
        <UtilityPanel overlay={utilityOverlay} state={state} setState={setState} close={() => setUtilityOverlay(null)} />
      </YStack>
    )
  }

  if (!state.flow) return null

  return (
    <YStack testID="visual-panel" height={405} bg="#101112" borderTopWidth={1} borderColor="#25272a">
      {state.flow === 'launcher' ? <LauncherPanel state={state} setState={setState} /> : null}
      {state.flow === 'existing' ? <ExistingMediaPanel state={state} setState={setState} setUtilityOverlay={setUtilityOverlay} /> : null}
      {state.flow === 'generate' ? <GenerateFromDraftPanel state={state} setState={setState} /> : null}
      {state.flow === 'templates' ? <TemplateCatalogPanel state={state} setState={setState} /> : null}
    </YStack>
  )
}

function VisualSuggestion({
  setState,
}: {
  setState: React.Dispatch<React.SetStateAction<OptimizedState>>
}) {
  return (
    <YStack testID="visual-suggestion" mx="$3" mb="$2" p="$3" bg="#181a1d" rounded="$3" gap="$2" borderWidth={1} borderColor="#303338">
      <XStack justify="space-between" items="center">
        <Text color="#e5e6e8" fontWeight="600" fontSize={13}>给这段内容配张图</Text>
        <Pressable testID="dismiss-visual-suggestion" onPress={() => setState((current) => dismissVisualSuggestion(current))} style={{ padding: 4 }}>
          <Text color="#76797e">×</Text>
        </Pressable>
      </XStack>
      <XStack gap="$2">
        <ProductButton testID="suggest-generate" label="生成配图" primary onPress={() => setState((current) => openGenerate(current))} />
        <ProductButton testID="suggest-album" label="从相册选" onPress={() => setState((current) => openExisting(current, 'album'))} />
      </XStack>
    </YStack>
  )
}

function Composer() {
  const [state, setState] = useState(createInitialState)
  const [utilityOverlay, setUtilityOverlay] = useState<UtilityOverlay>(null)

  const attachmentText = useMemo(
    () => state.draft.attachments.map((item) => item.label).join(' · '),
    [state.draft.attachments]
  )
  const showSuggestion = shouldShowVisualSuggestion(state) && utilityOverlay === null

  const openUtility = (overlay: UtilityOverlay) => {
    setState((current) => ({ ...current, flow: null }))
    setUtilityOverlay(overlay)
  }

  return (
    <YStack flex={1} bg="#0f1011" width="100%" maxW={480} self="center">
      <XStack height={58} px="$3" items="center" justify="space-between" borderBottomWidth={1} borderColor="#1d1f21">
        <Pressable testID="back-button" onPress={() => {}} style={{ padding: 8 }}><Text color="#d9dade" fontSize={26}>‹</Text></Pressable>
        <XStack items="center" gap="$1"><Text color="#d9dade" fontSize={18} fontWeight="600">内容</Text><Text color="#d9dade" fontSize={12}>▾</Text></XStack>
        <View style={{ backgroundColor: '#242629', borderRadius: 6, paddingHorizontal: 12, paddingVertical: 7 }}><Text color="#d9dade" fontSize={13}>草稿</Text></View>
      </XStack>

      <YStack flex={1} px="$3" pt="$3">
        <XStack items="center" borderBottomWidth={1} borderColor="#222427">
          <TextInput
            testID="title-input"
            value={state.draft.title}
            onChangeText={(value) => setState((current) => updateTitle(current, value))}
            placeholder="填写标题"
            placeholderTextColor="#4e5156"
            style={{ flex: 1, height: 50, color: '#e3e4e6', fontSize: 18, fontWeight: '600' }}
          />
          <Text testID="title-remaining" color="#55585f" fontSize={12}>{30 - state.draft.title.length}</Text>
        </XStack>

        <TextInput
          testID="body-input"
          value={state.draft.body}
          onFocus={() => setState((current) => setBodyFocused(current, true))}
          onBlur={() => setState((current) => setBodyFocused(current, false))}
          onChangeText={(value) => setState((current) => updateBody(current, value))}
          placeholder="添加正文"
          placeholderTextColor="#4b4e53"
          multiline
          textAlignVertical="top"
          style={{ flex: 1, minHeight: 130, color: '#e3e4e6', fontSize: 16, paddingTop: 14 }}
        />

        {state.draft.attachments.length > 0 ? (
          <YStack testID="attachment-strip" mb="$2" bg="#17191b" p="$2" rounded="$3">
            <Text color="#8d9095" fontSize={11}>已添加图片/素材</Text>
            <Text color="#d3d5d8" fontSize={12}>{attachmentText}</Text>
          </YStack>
        ) : null}

        {state.draft.topics.length > 0 ? (
          <Text testID="topic-summary" color="#8b8e93" fontSize={12} mb="$2">{state.draft.topics.map((topic) => `#${topic}`).join('  ')}</Text>
        ) : null}

        <XStack pb="$2" gap="$2">
          <ProductButton testID="add-topics" label="＋ 添加分区及话题" onPress={() => openUtility('topics')} />
        </XStack>
      </YStack>

      {showSuggestion ? <VisualSuggestion setState={setState} /> : null}

      <XStack minH={56} px="$3" py="$2" items="center" borderTopWidth={1} borderColor="#232528" gap="$4">
        <Pressable testID="emoji-tool" onPress={() => openUtility('emoji')} style={{ padding: 5 }}><Text color="#85878a" fontSize={24}>☺</Text></Pressable>
        <Pressable testID="mention-tool" onPress={() => openUtility('mentions')} style={{ padding: 5 }}><Text color="#85878a" fontSize={21} fontWeight="700">@</Text></Pressable>
        <ProductButton
          testID="add-visual"
          label="＋ 添加配图"
          primary={state.flow !== null}
          onPress={() => {
            setUtilityOverlay(null)
            setState((current) => openLauncher(current))
          }}
        />
        <View style={{ flex: 1 }} />
        <Pressable testID="settings-tool" onPress={() => openUtility('settings')} style={{ padding: 5 }}><Text color="#85878a" fontSize={22}>⚙</Text></Pressable>
      </XStack>

      <VisualPanel state={state} setState={setState} utilityOverlay={utilityOverlay} setUtilityOverlay={setUtilityOverlay} />
    </YStack>
  )
}

export default function App() {
  return (
    <SafeAreaProvider>
      <TamaguiProvider config={tamaguiConfig} defaultTheme="dark">
        <Composer />
      </TamaguiProvider>
    </SafeAreaProvider>
  )
}
