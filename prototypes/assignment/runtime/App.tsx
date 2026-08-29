import { useMemo, useState } from 'react'
import {
  Adapt,
  Button,
  Paragraph,
  Popover,
  ScrollView,
  Sheet,
  TamaguiProvider,
  Text,
  XStack,
  YStack,
} from 'tamagui'

import {
  assignWorkOrders,
  toggleSelection,
  undoAssignment,
  type AssignmentCommit,
  type AssignmentSnapshot,
  type WorkOrder,
} from './assignment-model'
import { tamaguiConfig } from './tamagui.config'

const technicians = ['Avery Chen', 'Jordan Lee', 'Morgan Patel', 'Sam Rivera']

const initialWorkOrders: WorkOrder[] = [
  { id: 'WO-1042', title: 'Replace pressure sensor', assignee: 'Unassigned' },
  { id: 'WO-1048', title: 'Inspect cooling unit', assignee: 'Taylor Kim' },
  { id: 'WO-1051', title: 'Reset access controller', assignee: 'Unassigned' },
  { id: 'WO-1057', title: 'Check pump vibration', assignee: 'Jordan Lee' },
  { id: 'WO-1060', title: 'Verify backup generator', assignee: 'Unassigned' },
]

function AssignmentChooser({
  selectedCount,
  onAssign,
}: {
  selectedCount: number
  onAssign: (technician: string) => void
}) {
  return (
    <YStack gap="$3" minWidth={260}>
      <YStack gap="$1">
        <Text fontSize="$6" fontWeight="700">
          Assign {selectedCount} work orders
        </Text>
        <Paragraph size="$3" color="$color10">
          Choose one technician. Selection commits immediately and can be undone.
        </Paragraph>
      </YStack>

      <YStack gap="$2">
        {technicians.map((technician) => (
          <Button
            key={technician}
            justifyContent="flex-start"
            onPress={() => onAssign(technician)}
          >
            {technician}
          </Button>
        ))}
      </YStack>
    </YStack>
  )
}

function AssignmentPrototype() {
  const [workOrders, setWorkOrders] = useState(initialWorkOrders)
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'WO-1042',
    'WO-1048',
    'WO-1051',
  ])
  const [assignmentOpen, setAssignmentOpen] = useState(false)
  const [previousAssignment, setPreviousAssignment] = useState<AssignmentSnapshot | null>(null)
  const [lastCommit, setLastCommit] = useState<AssignmentCommit | null>(null)

  const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds])

  const assign = (technician: string) => {
    if (selectedIds.length === 0) return

    const result = assignWorkOrders(workOrders, selectedIds, technician)
    setPreviousAssignment(result.snapshot)
    setWorkOrders(result.workOrders)
    setLastCommit(result.commit)
    setAssignmentOpen(false)
  }

  const undo = () => {
    if (!previousAssignment || !lastCommit) return

    setWorkOrders((current) => undoAssignment(current, previousAssignment))
    setPreviousAssignment(null)
    setLastCommit(null)
  }

  return (
    <YStack flex={1} backgroundColor="$background" padding="$4" gap="$4">
      <YStack gap="$1">
        <Text fontSize="$8" fontWeight="700">
          Work queue
        </Text>
        <Paragraph color="$color10">
          Structural prototype: selection → Assign → technician → commit → Undo
        </Paragraph>
      </YStack>

      {lastCommit ? (
        <XStack
          borderWidth={1}
          borderColor="$borderColor"
          padding="$3"
          gap="$3"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
        >
          <Text flexShrink={1}>
            Assigned {lastCommit.workOrderIds.length} work orders to {lastCommit.technician}.
          </Text>
          <Button size="$3" onPress={undo}>
            Undo
          </Button>
        </XStack>
      ) : null}

      <XStack
        borderWidth={1}
        borderColor="$borderColor"
        padding="$3"
        alignItems="center"
        justifyContent="space-between"
        gap="$3"
        flexWrap="wrap"
      >
        <Text fontWeight="600">{selectedIds.length} selected</Text>

        <Popover
          open={assignmentOpen}
          onOpenChange={setAssignmentOpen}
          placement="bottom-end"
          stayInFrame
          allowFlip
        >
          <Popover.Trigger asChild>
            <Button disabled={selectedIds.length === 0}>Assign</Button>
          </Popover.Trigger>

          <Adapt when="max-md">
            <Sheet modal dismissOnSnapToBottom snapPoints={[55]}>
              <Sheet.Overlay />
              <Sheet.Handle />
              <Sheet.Frame padding="$4">
                <Sheet.ScrollView>
                  <Adapt.Contents />
                </Sheet.ScrollView>
              </Sheet.Frame>
            </Sheet>
          </Adapt>

          <Popover.Content
            borderWidth={1}
            borderColor="$borderColor"
            backgroundColor="$background"
            padding="$3"
            width={320}
          >
            <AssignmentChooser selectedCount={selectedIds.length} onAssign={assign} />
          </Popover.Content>
        </Popover>
      </XStack>

      <ScrollView flex={1}>
        <YStack gap="$2" paddingBottom="$8">
          {workOrders.map((workOrder) => {
            const selected = selectedSet.has(workOrder.id)
            return (
              <Button
                key={workOrder.id}
                height="auto"
                padding="$3"
                borderWidth={2}
                borderColor={selected ? '$color10' : '$borderColor'}
                backgroundColor="$background"
                onPress={() => setSelectedIds((current) => toggleSelection(current, workOrder.id))}
              >
                <XStack flex={1} gap="$3" alignItems="center" justifyContent="space-between">
                  <XStack gap="$3" alignItems="center" flexShrink={1}>
                    <Text width={28}>{selected ? '[x]' : '[ ]'}</Text>
                    <YStack flexShrink={1} alignItems="flex-start">
                      <Text fontWeight="600">{workOrder.id}</Text>
                      <Text>{workOrder.title}</Text>
                    </YStack>
                  </XStack>
                  <Text color="$color10">{workOrder.assignee}</Text>
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
    <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
      <AssignmentPrototype />
    </TamaguiProvider>
  )
}
