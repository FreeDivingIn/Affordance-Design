import { useMemo, useState } from 'react'
import { Pressable, TextInput, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { TamaguiProvider, Text, XStack, YStack } from 'tamagui'

import {
  addTopic,
  capturePhoto,
  closeTemplate,
  commitSelectedMedia,
  commitTemplatePreview,
  createInitialState,
  generateTemplatePreview,
  insertEmoji,
  insertMention,
  setPhotoPermission,
  startTemplate,
  switchSource,
  toggleAcquisition,
  toggleSelectedMedia,
  updateBody,
  updateTemplateInstruction,
  updateTitle,
  type Attachment,
  type ComposerState,
  type SourceTab,
} from './composer-model'
import { tamaguiConfig } from './tamagui.config'

type Overlay = null | 'topics' | 'emoji' | 'mentions' | 'settings' | 'camera'

type VisualItem = Attachment & {
  subtitle?: string
  background: string
}

type TemplateItem = {
  id: string
  label: string
  subtitle: string
  background: string
}

const albumItems: VisualItem[] = [
  { id: 'photo-gif', kind: 'photo', label: 'GIF', subtitle: '动态图片', background: '#4d86b9' },
  { id: 'photo-2', kind: 'photo', label: '', subtitle: '浅色照片', background: '#ead6ab' },
  { id: 'photo-3', kind: 'photo', label: '', subtitle: '绿色照片', background: '#637d70' },
  { id: 'photo-4', kind: 'photo', label: '', subtitle: '木纹照片', background: '#cba572' },
  { id: 'photo-5', kind: 'photo', label: '', subtitle: '暖色照片', background: '#ead7a5' },
  { id: 'photo-6', kind: 'photo', label: '', subtitle: '灰色照片', background: '#a6aaa6' },
  { id: 'photo-7', kind: 'photo', label: '', subtitle: '奶油照片', background: '#eadbb7' },
]

const videoItems: VisualItem[] = [
  { id: 'video-1', kind: 'video', label: '00:12', subtitle: '短视频', background: '#604f73' },
  { id: 'video-2', kind: 'video', label: '00:28', subtitle: '短视频', background: '#476578' },
  { id: 'video-3', kind: 'video', label: '01:04', subtitle: '视频', background: '#6f634b' },
  { id: 'video-4', kind: 'video', label: '00:19', subtitle: '短视频', background: '#4d6b59' },
  { id: 'video-5', kind: 'video', label: '00:36', subtitle: '视频', background: '#78585c' },
  { id: 'video-6', kind: 'video', label: '00:44', subtitle: '视频', background: '#4b5e72' },
  { id: 'video-7', kind: 'video', label: '00:21', subtitle: '短视频', background: '#71664e' },
  { id: 'video-8', kind: 'video', label: '00:55', subtitle: '视频', background: '#546f68' },
]

const gameAssetItems: VisualItem[] = [
  { id: 'asset-1', kind: 'game_asset', label: '战绩卡', subtitle: '素材', background: '#3e4f66' },
  { id: 'asset-2', kind: 'game_asset', label: '装备图', subtitle: '素材', background: '#554b68' },
  { id: 'asset-3', kind: 'game_asset', label: '角色图', subtitle: '素材', background: '#4f6656' },
  { id: 'asset-4', kind: 'game_asset', label: '地图图', subtitle: '素材', background: '#696148' },
  { id: 'asset-5', kind: 'game_asset', label: '数据图', subtitle: '素材', background: '#47616b' },
  { id: 'asset-6', kind: 'game_asset', label: '收藏图', subtitle: '素材', background: '#6b4e57' },
  { id: 'asset-7', kind: 'game_asset', label: '成就图', subtitle: '素材', background: '#4d5770' },
  { id: 'asset-8', kind: 'game_asset', label: '记录图', subtitle: '素材', background: '#65614c' },
]

const templates: TemplateItem[] = [
  { id: 'all', label: '全部模板', subtitle: '浏览模板', background: '#f1f1f1' },
  { id: 'text-image', label: '文字配图', subtitle: '根据正文生成', background: '#ededed' },
  { id: 'card', label: '卡片生成器', subtitle: '填写信息生成卡片', background: '#684487' },
  { id: 'loadout', label: '随机装备', subtitle: '生成一套随机组合', background: '#31413f' },
  { id: 'identity', label: '身份卡', subtitle: '生成趣味身份卡', background: '#765c8f' },
  { id: 'relations', label: '角色关系', subtitle: '组合角色关系', background: '#345a86' },
  { id: 'fortune', label: '今日运势', subtitle: '生成今日结果', background: '#24493f' },
  { id: 'life', label: '人生预测', subtitle: '生成趣味预测', background: '#2382b8' },
]

const allSelectableItems = [...albumItems, ...videoItems, ...gameAssetItems]

const sourceTabs: Array<{ id: SourceTab; label: string }> = [
  { id: 'album', label: '相册' },
  { id: 'video', label: '视频' },
  { id: 'game_assets', label: '游戏素材' },
  { id: 'all_templates', label: '全部模板' },
]

function ProductButton({
  testID,
  label,
  onPress,
  selected = false,
  compact = false,
}: {
  testID?: string
  label: string
  onPress: () => void
  selected?: boolean
  compact?: boolean
}) {
  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      style={({ pressed }) => ({
        opacity: pressed ? 0.72 : 1,
        backgroundColor: selected ? '#e5e7eb' : '#26282b',
        paddingHorizontal: compact ? 10 : 14,
        paddingVertical: compact ? 7 : 9,
        borderRadius: 6,
      })}
    >
      <Text color={selected ? '#17181a' : '#e6e7e9'} fontSize={compact ? 13 : 14}>
        {label}
      </Text>
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
        borderColor: '#ffffff',
        backgroundColor: index ? '#e7e7e7' : 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {index ? <Text color="#161719" fontSize={12} fontWeight="700">{index}</Text> : null}
    </View>
  )
}

function MediaTile({
  item,
  selectedIndex,
  onPress,
}: {
  item: VisualItem
  selectedIndex: number | null
  onPress: () => void
}) {
  return (
    <Pressable
      testID={`media-${item.id}`}
      onPress={onPress}
      style={{ width: '25%', aspectRatio: 1, padding: 1 }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: item.background,
          justifyContent: 'flex-end',
          padding: 9,
        }}
      >
        <SelectionCircle index={selectedIndex} />
        {item.label ? <Text color="#ffffff" fontWeight="700">{item.label}</Text> : null}
      </View>
    </Pressable>
  )
}

function MediaGrid({
  state,
  setState,
  items,
  includeCamera = false,
  openCamera,
}: {
  state: ComposerState
  setState: React.Dispatch<React.SetStateAction<ComposerState>>
  items: VisualItem[]
  includeCamera?: boolean
  openCamera?: () => void
}) {
  return (
    <XStack flexWrap="wrap" width="100%">
      {includeCamera ? (
        <Pressable
          testID="camera-tile"
          onPress={openCamera}
          style={{ width: '25%', aspectRatio: 1, padding: 1 }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: '#202225',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 7,
            }}
          >
            <Text fontSize={26}>▣</Text>
            <Text color="#a8aaad" fontSize={13}>拍照</Text>
          </View>
        </Pressable>
      ) : null}

      {items.map((item) => {
        const index = state.selectedMediaIds.indexOf(item.id)
        return (
          <MediaTile
            key={item.id}
            item={item}
            selectedIndex={index >= 0 ? index + 1 : null}
            onPress={() => setState((current) => toggleSelectedMedia(current, item.id))}
          />
        )
      })}
    </XStack>
  )
}

function TemplateGrid({
  onChoose,
}: {
  onChoose: (template: TemplateItem) => void
}) {
  return (
    <XStack flexWrap="wrap" width="100%">
      {templates.map((template) => (
        <Pressable
          key={template.id}
          testID={`template-${template.id}`}
          onPress={() => onChoose(template)}
          style={{ width: '25%', padding: 5 }}
        >
          <View
            style={{
              aspectRatio: 0.78,
              borderRadius: 9,
              backgroundColor: template.background,
              padding: 8,
              justifyContent: 'flex-end',
              overflow: 'hidden',
            }}
          >
            <Text
              color={template.background.startsWith('#e') || template.background.startsWith('#f') ? '#4b4145' : '#ffffff'}
              fontWeight="700"
              fontSize={13}
            >
              {template.id === 'all' ? '◇◇' : template.id === 'text-image' ? '▧✦' : template.label}
            </Text>
          </View>
          <Text color="#ececee" fontSize={12} mt="$1" numberOfLines={1}>
            {template.label}
          </Text>
        </Pressable>
      ))}
    </XStack>
  )
}

function OverlayPanel({
  overlay,
  state,
  setState,
  close,
}: {
  overlay: Exclude<Overlay, null>
  state: ComposerState
  setState: React.Dispatch<React.SetStateAction<ComposerState>>
  close: () => void
}) {
  if (overlay === 'emoji') {
    const emojis = ['😀', '😂', '👍', '🎮', '✨', '🔥', '🥳', '❤️']
    return (
      <YStack p="$3" gap="$3">
        <XStack justify="space-between" items="center">
          <Text color="#f3f3f4" fontWeight="700">表情</Text>
          <ProductButton label="完成" compact onPress={close} />
        </XStack>
        <XStack gap="$3" flexWrap="wrap">
          {emojis.map((emoji) => (
            <Pressable
              key={emoji}
              testID={`emoji-${emoji}`}
              onPress={() => setState((current) => insertEmoji(current, emoji))}
              style={{ padding: 8 }}
            >
              <Text fontSize={28}>{emoji}</Text>
            </Pressable>
          ))}
        </XStack>
      </YStack>
    )
  }

  if (overlay === 'mentions') {
    const people = ['阿青', '林夏', '小周', 'K']
    return (
      <YStack p="$3" gap="$2">
        <XStack justify="space-between" items="center">
          <Text color="#f3f3f4" fontWeight="700">提到</Text>
          <ProductButton label="取消" compact onPress={close} />
        </XStack>
        {people.map((person) => (
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

  if (overlay === 'topics') {
    const topics = ['创作灵感', '游戏记录', '今日分享', '攻略讨论']
    return (
      <YStack p="$3" gap="$3">
        <XStack justify="space-between" items="center">
          <Text color="#f3f3f4" fontWeight="700">添加分区及话题</Text>
          <ProductButton label="完成" compact onPress={close} />
        </XStack>
        <Text color="#929499" fontSize={12}>分区：内容交流</Text>
        <XStack gap="$2" flexWrap="wrap">
          {topics.map((topic) => (
            <ProductButton
              key={topic}
              testID={`topic-${topic}`}
              label={`# ${topic}`}
              selected={state.draft.topics.includes(topic)}
              onPress={() => setState((current) => addTopic(current, topic))}
            />
          ))}
        </XStack>
      </YStack>
    )
  }

  if (overlay === 'settings') {
    return (
      <YStack p="$3" gap="$3">
        <XStack justify="space-between" items="center">
          <Text color="#f3f3f4" fontWeight="700">设置</Text>
          <ProductButton label="完成" compact onPress={close} />
        </XStack>
        <XStack justify="space-between" items="center" gap="$3">
          <YStack flex={1}>
            <Text color="#e6e7e9">照片访问</Text>
            <Text color="#8f9196" fontSize={12}>
              {state.photoPermission === 'full' ? '允许访问所有照片' : '有限访问'}
            </Text>
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
        <Text color="#f3f3f4" fontWeight="700">拍照</Text>
        <ProductButton label="取消" compact onPress={close} />
      </XStack>
      <YStack flex={1} bg="#2a2c2f" rounded="$4" items="center" justify="center">
        <Text color="#8f9195" fontSize={13}>相机</Text>
      </YStack>
      <XStack justify="center">
        <Pressable
          testID="camera-shutter"
          onPress={() => {
            const id = `camera-${Date.now()}`
            setState((current) => capturePhoto(current, id))
            close()
          }}
          style={{
            width: 58,
            height: 58,
            borderRadius: 29,
            borderWidth: 5,
            borderColor: '#e5e7eb',
            backgroundColor: '#cfd2d6',
          }}
        />
      </XStack>
    </YStack>
  )
}

function TemplateSessionPanel({
  state,
  setState,
}: {
  state: ComposerState
  setState: React.Dispatch<React.SetStateAction<ComposerState>>
}) {
  const session = state.templateSession
  if (!session) return null
  const template = templates.find((item) => item.id === session.templateId) ?? templates[1]
  const contextPreview = (state.draft.body || state.draft.title || '当前正文内容').slice(0, 72)

  return (
    <YStack p="$3" gap="$3" flex={1}>
      <XStack justify="space-between" items="center">
        <Text color="#f3f3f4" fontWeight="700">{template.label}</Text>
        <ProductButton
          testID="close-template"
          label="返回"
          compact
          onPress={() => setState((current) => closeTemplate(current))}
        />
      </XStack>

      {session.templateId === 'text-image' ? (
        <YStack bg="#202225" p="$3" rounded="$3" gap="$1">
          <Text color="#909298" fontSize={12}>正文内容</Text>
          <Text color="#d8d9dc" fontSize={13}>{contextPreview}</Text>
        </YStack>
      ) : null}

      <TextInput
        testID="template-instruction"
        value={session.instruction}
        onChangeText={(value) => setState((current) => updateTemplateInstruction(current, value))}
        placeholder={session.templateId === 'text-image' ? '补充配图要求' : '填写模板内容'}
        placeholderTextColor="#606268"
        style={{
          color: '#e8e8ea',
          borderWidth: 1,
          borderColor: '#35373b',
          borderRadius: 7,
          paddingHorizontal: 12,
          paddingVertical: 10,
          fontSize: 14,
        }}
      />

      {session.preview ? (
        <YStack
          testID="template-preview"
          flex={1}
          rounded="$4"
          p="$3"
          justify="flex-end"
          style={{ backgroundColor: template.background }}
        >
          <Text color="#ffffff" fontWeight="700" fontSize={18}>{template.label}</Text>
          <Text color="#ffffff">{session.instruction || '根据当前内容生成'}</Text>
        </YStack>
      ) : (
        <YStack flex={1} bg="#1b1c1e" rounded="$4" items="center" justify="center">
          <Text color="#696b70">{template.subtitle}</Text>
        </YStack>
      )}

      <XStack gap="$2" justify="flex-end">
        {!session.preview ? (
          <ProductButton
            testID="generate-template"
            label="生成"
            selected
            onPress={() =>
              setState((current) => generateTemplatePreview(current, `${template.label}预览`))
            }
          />
        ) : (
          <>
            <ProductButton
              label="重新生成"
              onPress={() =>
                setState((current) => generateTemplatePreview(current, `${template.label}预览`))
              }
            />
            <ProductButton
              testID="insert-template"
              label="插入正文"
              selected
              onPress={() => setState((current) => commitTemplatePreview(current))}
            />
          </>
        )}
      </XStack>
    </YStack>
  )
}

function AcquisitionPanel({
  state,
  setState,
  overlay,
  setOverlay,
}: {
  state: ComposerState
  setState: React.Dispatch<React.SetStateAction<ComposerState>>
  overlay: Overlay
  setOverlay: (overlay: Overlay) => void
}) {
  const currentItems =
    state.sourceTab === 'album'
      ? albumItems
      : state.sourceTab === 'video'
        ? videoItems
        : gameAssetItems

  const commitSelection = () => {
    setState((current) => commitSelectedMedia(current, allSelectableItems))
  }

  const content = (() => {
    if (overlay) {
      return (
        <OverlayPanel
          overlay={overlay}
          state={state}
          setState={setState}
          close={() => setOverlay(null)}
        />
      )
    }

    if (state.templateSession) {
      return <TemplateSessionPanel state={state} setState={setState} />
    }

    if (state.sourceTab === 'album') {
      return (
        <YStack flex={1}>
          {state.photoPermission === 'limited' ? (
            <XStack testID="photo-permission-banner" p="$3" items="center" justify="space-between" gap="$2">
              <Text color="#7f8186" fontSize={13} flex={1}>
                点击 <Text color="#dedfe2">去设置</Text> 切换至允许访问所有照片
              </Text>
              <ProductButton
                testID="photo-settings"
                label="去设置"
                compact
                selected
                onPress={() => setOverlay('settings')}
              />
            </XStack>
          ) : null}
          <YStack flex={1} overflow="hidden">
            <MediaGrid
              state={state}
              setState={setState}
              items={currentItems}
              includeCamera
              openCamera={() => setOverlay('camera')}
            />
          </YStack>
        </YStack>
      )
    }

    if (state.sourceTab === 'video' || state.sourceTab === 'game_assets') {
      return (
        <YStack flex={1} overflow="hidden">
          <MediaGrid state={state} setState={setState} items={currentItems} />
        </YStack>
      )
    }

    return (
      <YStack flex={1} overflow="hidden" pt="$1">
        <TemplateGrid
          onChoose={(template) => {
            if (template.id === 'all') return
            setState((current) => startTemplate(current, template.id))
          }}
        />
      </YStack>
    )
  })()

  return (
    <YStack testID="acquisition-panel" height={372} bg="#101112" borderTopWidth={1} borderColor="#242629">
      <YStack flex={1}>{content}</YStack>

      {state.selectedMediaIds.length > 0 && !state.templateSession && !overlay ? (
        <View
          testID="selection-commit-bar"
          style={{ position: 'absolute', right: 10, bottom: 57 }}
        >
          <ProductButton
            testID="commit-selected-media"
            label={`添加 ${state.selectedMediaIds.length}`}
            selected
            onPress={commitSelection}
          />
        </View>
      ) : null}

      <XStack height={56} borderTopWidth={1} borderColor="#242629" items="center" justify="space-around">
        {sourceTabs.map((tab) => {
          const active = state.sourceTab === tab.id && !state.templateSession
          return (
            <Pressable
              key={tab.id}
              testID={`source-tab-${tab.id}`}
              onPress={() => {
                setOverlay(null)
                setState((current) => switchSource(current, tab.id))
              }}
              style={{ height: 56, justifyContent: 'center', alignItems: 'center', minWidth: 72 }}
            >
              <Text color={active ? '#f0f0f2' : '#77797e'} fontSize={13}>
                {tab.label}
              </Text>
              <View
                style={{
                  height: 3,
                  width: active ? 42 : 0,
                  backgroundColor: '#ededee',
                  borderRadius: 2,
                  marginTop: 8,
                }}
              />
            </Pressable>
          )
        })}
      </XStack>
    </YStack>
  )
}

function Composer() {
  const [state, setState] = useState(createInitialState)
  const [overlay, setOverlay] = useState<Overlay>(null)

  const attachmentText = useMemo(
    () => state.draft.attachments.map((item) => item.label).join(' · '),
    [state.draft.attachments]
  )

  return (
    <YStack flex={1} bg="#0f1011" width="100%" maxW={480} self="center">
      <XStack height={58} px="$3" items="center" justify="space-between" borderBottomWidth={1} borderColor="#1d1f21">
        <Pressable testID="back-button" onPress={() => {}} style={{ padding: 8 }}>
          <Text color="#d9dade" fontSize={26}>‹</Text>
        </Pressable>
        <XStack items="center" gap="$1">
          <Text color="#d9dade" fontSize={18} fontWeight="600">内容</Text>
          <Text color="#d9dade" fontSize={12}>▾</Text>
        </XStack>
        <View style={{ backgroundColor: '#242629', borderRadius: 6, paddingHorizontal: 12, paddingVertical: 7 }}>
          <Text color="#d9dade" fontSize={13}>草稿</Text>
        </View>
      </XStack>

      <YStack flex={1} px="$3" pt="$3">
        <XStack items="center" borderBottomWidth={1} borderColor="#222427">
          <TextInput
            testID="title-input"
            value={state.draft.title}
            onChangeText={(value) => setState((current) => updateTitle(current, value))}
            placeholder="填写标题"
            placeholderTextColor="#4e5156"
            style={{
              flex: 1,
              height: 50,
              color: '#e3e4e6',
              fontSize: 18,
              fontWeight: '600',
            }}
          />
          <Text testID="title-remaining" color="#55585f" fontSize={12}>
            {30 - state.draft.title.length}
          </Text>
        </XStack>

        <TextInput
          testID="body-input"
          value={state.draft.body}
          onChangeText={(value) => setState((current) => updateBody(current, value))
          }
          placeholder="添加正文"
          placeholderTextColor="#4b4e53"
          multiline
          textAlignVertical="top"
          style={{
            flex: 1,
            minHeight: 150,
            color: '#e3e4e6',
            fontSize: 16,
            paddingTop: 14,
          }}
        />

        {state.draft.attachments.length > 0 ? (
          <YStack testID="attachment-strip" mb="$2" bg="#17191b" p="$2" rounded="$3">
            <Text color="#8d9095" fontSize={11}>已添加图片/素材</Text>
            <Text color="#d3d5d8" fontSize={12}>{attachmentText}</Text>
          </YStack>
        ) : null}

        {state.draft.topics.length > 0 ? (
          <Text testID="topic-summary" color="#8b8e93" fontSize={12} mb="$2">
            {state.draft.topics.map((topic) => `#${topic}`).join('  ')}
          </Text>
        ) : null}

        <XStack pb="$2">
          <ProductButton
            testID="add-topics"
            label="＋ 添加分区及话题"
            onPress={() => setOverlay('topics')}
          />
        </XStack>
      </YStack>

      <XStack height={54} px="$3" items="center" borderTopWidth={1} borderColor="#232528" gap="$5">
        <Pressable testID="emoji-tool" onPress={() => setOverlay('emoji')} style={{ padding: 5 }}>
          <Text color="#85878a" fontSize={25}>☺</Text>
        </Pressable>
        <Pressable testID="mention-tool" onPress={() => setOverlay('mentions')} style={{ padding: 5 }}>
          <Text color="#85878a" fontSize={22} fontWeight="700">@</Text>
        </Pressable>
        <Pressable
          testID="add-tool"
          onPress={() => {
            setOverlay(null)
            setState((current) => toggleAcquisition(current))
          }}
          style={{ padding: 5 }}
        >
          <Text color="#85878a" fontSize={25}>⊕</Text>
        </Pressable>
        <View style={{ flex: 1 }} />
        <Pressable testID="settings-tool" onPress={() => setOverlay('settings')} style={{ padding: 5 }}>
          <Text color="#85878a" fontSize={23}>⚙</Text>
        </Pressable>
      </XStack>

      {state.acquisitionOpen ? (
        <AcquisitionPanel
          state={state}
          setState={setState}
          overlay={overlay}
          setOverlay={setOverlay}
        />
      ) : null}
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
