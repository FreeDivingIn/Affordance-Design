import { useMemo, useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import {
  Adapt,
  Button,
  Popover,
  ScrollView,
  Sheet,
  TamaguiProvider,
  Text,
  XStack,
  YStack,
} from 'tamagui'

import {
  mergeContacts,
  toggleSelection,
  undoMerge,
  type Contact,
  type MergeCommit,
  type MergeSnapshot,
} from './contact-merge-model'
import { tamaguiConfig } from './tamagui.config'

const initialContacts: Contact[] = [
  {
    id: 'maya-rivera',
    name: 'Maya Rivera',
    emails: ['maya@northstar.example'],
    phones: ['+1 415 555 0142'],
  },
  {
    id: 'm-rivera',
    name: 'M. Rivera',
    emails: ['maya.rivera@northstar.example'],
    phones: ['+1 415 555 0142'],
  },
  {
    id: 'owen-brooks',
    name: 'Owen Brooks',
    emails: ['owen@harbor.example'],
    phones: ['+1 510 555 0118'],
  },
  {
    id: 'priya-shah',
    name: 'Priya Shah',
    emails: ['priya@field.example'],
    phones: ['+1 628 555 0166'],
  },
]

function PrimaryContactChooser({
  contacts,
  onChoose,
}: {
  contacts: Contact[]
  onChoose: (primaryId: string) => void
}) {
  return (
    <YStack gap="$3" minW={280}>
      <Text fontSize="$6" fontWeight="700">
        Keep as primary contact
      </Text>

      <YStack gap="$2">
        {contacts.map((contact) => (
          <Button
            key={contact.id}
            testID={`primary-${contact.id}`}
            height="auto"
            p="$3"
            justify="flex-start"
            onPress={() => onChoose(contact.id)}
          >
            <YStack flex={1} items="flex-start">
              <Text fontWeight="600">{contact.name}</Text>
              <Text>{contact.emails[0]}</Text>
            </YStack>
          </Button>
        ))}
      </YStack>
    </YStack>
  )
}

function ContactMergePrototype() {
  const [contacts, setContacts] = useState(initialContacts)
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'maya-rivera',
    'm-rivera',
  ])
  const [mergeOpen, setMergeOpen] = useState(false)
  const [previousMerge, setPreviousMerge] = useState<MergeSnapshot | null>(null)
  const [lastCommit, setLastCommit] = useState<MergeCommit | null>(null)

  const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds])
  const selectedContacts = useMemo(
    () => contacts.filter((contact) => selectedSet.has(contact.id)),
    [contacts, selectedSet]
  )
  const canMerge = selectedIds.length === 2

  const merge = (primaryId: string) => {
    if (!canMerge) return

    const result = mergeContacts(contacts, selectedIds, primaryId)
    setContacts(result.contacts)
    setSelectedIds(result.selectedIds)
    setPreviousMerge(result.snapshot)
    setLastCommit(result.commit)
    setMergeOpen(false)
  }

  const undo = () => {
    if (!previousMerge) return

    const restored = undoMerge(previousMerge)
    setContacts(restored.contacts)
    setSelectedIds(restored.selectedIds)
    setPreviousMerge(null)
    setLastCommit(null)
  }

  const mergedPrimary = lastCommit
    ? contacts.find((contact) => contact.id === lastCommit.primaryId)
    : null

  return (
    <YStack flex={1} bg="$background" p="$4" gap="$4">
      {lastCommit && mergedPrimary ? (
        <XStack
          testID="merge-feedback"
          borderWidth={1}
          borderColor="$borderColor"
          p="$3"
          gap="$3"
          items="center"
          justify="space-between"
          flexWrap="wrap"
        >
          <Text shrink={1}>Merged into {mergedPrimary.name}.</Text>
          <Button testID="undo-merge" size="$3" onPress={undo}>
            Undo
          </Button>
        </XStack>
      ) : null}

      <XStack
        borderWidth={1}
        borderColor="$borderColor"
        p="$3"
        items="center"
        justify="space-between"
        gap="$3"
        flexWrap="wrap"
      >
        <Text testID="selection-count" fontWeight="600">
          {selectedIds.length} selected
        </Text>

        <Popover
          open={mergeOpen}
          onOpenChange={(nextOpen) => setMergeOpen(canMerge ? nextOpen : false)}
          placement="bottom-end"
          stayInFrame
          allowFlip
        >
          <Popover.Trigger
            testID="merge-trigger"
            accessibilityRole="button"
            accessibilityState={{ disabled: !canMerge }}
            pointerEvents={canMerge ? 'auto' : 'none'}
            opacity={canMerge ? 1 : 0.5}
            borderWidth={1}
            borderColor="$borderColor"
            rounded="$4"
            px="$4"
            py="$2"
            items="center"
          >
            <Text fontWeight="600">Merge</Text>
          </Popover.Trigger>

          <Adapt when="touchable">
            <Sheet modal dismissOnSnapToBottom snapPoints={[48]}>
              <Sheet.Overlay />
              <Sheet.Handle />
              <Sheet.Frame testID="merge-sheet" p="$4">
                <Sheet.ScrollView>
                  <Adapt.Contents />
                </Sheet.ScrollView>
              </Sheet.Frame>
            </Sheet>
          </Adapt>

          <Popover.Content
            testID="merge-popover"
            borderWidth={1}
            borderColor="$borderColor"
            bg="$background"
            p="$3"
            width={340}
          >
            <PrimaryContactChooser contacts={selectedContacts} onChoose={merge} />
          </Popover.Content>
        </Popover>
      </XStack>

      <ScrollView flex={1}>
        <YStack testID="contact-list" gap="$2" pb="$8">
          {contacts.map((contact) => {
            const selected = selectedSet.has(contact.id)
            return (
              <Button
                key={contact.id}
                testID={`contact-${contact.id}`}
                height="auto"
                p="$3"
                borderWidth={2}
                borderColor={selected ? '$color10' : '$borderColor'}
                bg="$background"
                onPress={() => {
                  setSelectedIds((current) => toggleSelection(current, contact.id))
                  setLastCommit(null)
                  setPreviousMerge(null)
                }}
              >
                <XStack flex={1} gap="$3" items="center" justify="space-between">
                  <XStack gap="$3" items="center" shrink={1}>
                    <Text width={28}>{selected ? '[x]' : '[ ]'}</Text>
                    <YStack shrink={1} items="flex-start">
                      <Text fontWeight="600">{contact.name}</Text>
                      {contact.emails.map((email) => (
                        <Text key={email}>{email}</Text>
                      ))}
                    </YStack>
                  </XStack>
                  {contact.phones[0] ? <Text color="$color10">{contact.phones[0]}</Text> : null}
                </XStack>
              </Button>
            )
          })}
        </YStack>
      </ScrollView>
    </YStack>
  )
}

export default function App() {
  return (
    <SafeAreaProvider>
      <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
        <ContactMergePrototype />
      </TamaguiProvider>
    </SafeAreaProvider>
  )
}
