import { useMemo, useRef, useState } from 'react'
import { PanResponder, Platform } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import {
  Adapt,
  Button,
  Popover,
  ScrollView,
  Sheet,
  TamaguiProvider,
  Text,
  useMedia,
  XStack,
  YStack,
} from 'tamagui'

import {
  moveShipment,
  undoMove,
  type Depot,
  type MoveCommit,
  type Shipment,
} from './shipment-move-model'
import { tamaguiConfig } from './tamagui.config'

const depots: Depot[] = [
  { id: 'oakland', name: 'Oakland Hub' },
  { id: 'reno', name: 'Reno Depot' },
  { id: 'sacramento', name: 'Sacramento Depot' },
]

const initialShipments: Shipment[] = [
  { id: 'SH-4821', description: 'Medical supplies', depotId: 'reno' },
  { id: 'SH-4830', description: 'Machine parts', depotId: 'sacramento' },
  { id: 'SH-4844', description: 'Retail fixtures', depotId: 'oakland' },
]

function depotName(depotId: string) {
  return depots.find((depot) => depot.id === depotId)?.name ?? depotId
}

function DestinationChooser({
  shipment,
  onMove,
}: {
  shipment: Shipment
  onMove: (depotId: string) => void
}) {
  const destinations = depots.filter((depot) => depot.id !== shipment.depotId)

  return (
    <YStack gap="$3" minW={260}>
      <Text fontSize="$6" fontWeight="700">
        Move {shipment.id}
      </Text>
      <YStack gap="$2">
        {destinations.map((depot) => (
          <Button
            key={depot.id}
            testID={`destination-${shipment.id}-${depot.id}`}
            justify="flex-start"
            onPress={() => onMove(depot.id)}
          >
            {depot.name}
          </Button>
        ))}
      </YStack>
    </YStack>
  )
}

function ShipmentRow({
  shipment,
  moveOpen,
  setMoveOpen,
  onCommandMove,
  onDropAt,
  onDragStateChange,
}: {
  shipment: Shipment
  moveOpen: boolean
  setMoveOpen: (open: boolean) => void
  onCommandMove: (depotId: string) => void
  onDropAt: (shipmentId: string, x: number, y: number) => void
  onDragStateChange: (shipmentId: string | null) => void
}) {
  const media = useMedia()
  const pointerDragAvailable = Platform.OS === 'web' && !media.touchable

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => false,
        onMoveShouldSetPanResponder: (_, gesture) =>
          pointerDragAvailable && Math.abs(gesture.dx) + Math.abs(gesture.dy) > 4,
        onPanResponderGrant: () => onDragStateChange(shipment.id),
        onPanResponderRelease: (_, gesture) => {
          onDropAt(shipment.id, gesture.moveX, gesture.moveY)
          onDragStateChange(null)
        },
        onPanResponderTerminate: () => onDragStateChange(null),
      }),
    [onDragStateChange, onDropAt, pointerDragAvailable, shipment.id]
  )

  return (
    <XStack
      testID={`shipment-${shipment.id}`}
      borderWidth={1}
      borderColor="$borderColor"
      p="$3"
      gap="$3"
      items="center"
      justify="space-between"
      flexWrap="wrap"
    >
      <XStack gap="$3" items="center" shrink={1}>
        {pointerDragAvailable ? (
          <YStack
            testID={`drag-handle-${shipment.id}`}
            px="$2"
            py="$3"
            borderWidth={1}
            borderColor="$borderColor"
            rounded="$3"
            {...panResponder.panHandlers}
          >
            <Text fontWeight="700">⋮⋮</Text>
          </YStack>
        ) : null}

        <YStack shrink={1}>
          <Text fontWeight="700">{shipment.id}</Text>
          <Text>{shipment.description}</Text>
          <Text color="$color10">{depotName(shipment.depotId)}</Text>
        </YStack>
      </XStack>

      <Popover
        open={moveOpen}
        onOpenChange={setMoveOpen}
        placement="bottom-end"
        stayInFrame
        allowFlip
      >
        <Popover.Trigger
          testID={`move-trigger-${shipment.id}`}
          accessibilityRole="button"
          borderWidth={1}
          borderColor="$borderColor"
          rounded="$4"
          px="$4"
          py="$2"
          items="center"
        >
          <Text fontWeight="600">Move</Text>
        </Popover.Trigger>

        <Adapt when="touchable">
          <Sheet modal dismissOnSnapToBottom snapPoints={[48]}>
            <Sheet.Overlay />
            <Sheet.Handle />
            <Sheet.Frame testID={`move-sheet-${shipment.id}`} p="$4">
              <Sheet.ScrollView>
                <Adapt.Contents />
              </Sheet.ScrollView>
            </Sheet.Frame>
          </Sheet>
        </Adapt>

        <Popover.Content
          testID={`move-popover-${shipment.id}`}
          borderWidth={1}
          borderColor="$borderColor"
          bg="$background"
          p="$3"
          width={320}
        >
          <DestinationChooser shipment={shipment} onMove={onCommandMove} />
        </Popover.Content>
      </Popover>
    </XStack>
  )
}

function ShipmentMovePrototype() {
  const [shipments, setShipments] = useState(initialShipments)
  const [moveOpenFor, setMoveOpenFor] = useState<string | null>(null)
  const [lastCommit, setLastCommit] = useState<MoveCommit | null>(null)
  const [draggingShipmentId, setDraggingShipmentId] = useState<string | null>(null)
  const depotRefs = useRef<Record<string, any>>({})

  const commitMove = (shipmentId: string, destinationDepotId: string) => {
    const current = shipments.find((shipment) => shipment.id === shipmentId)
    if (!current || current.depotId === destinationDepotId) return

    const result = moveShipment(shipments, depots, shipmentId, destinationDepotId)
    setShipments(result.shipments)
    setLastCommit(result.commit)
    setMoveOpenFor(null)
  }

  const undo = () => {
    if (!lastCommit) return
    setShipments((current) => undoMove(current, lastCommit))
    setLastCommit(null)
  }

  const resolvePointerDrop = (shipmentId: string, x: number, y: number) => {
    if (Platform.OS !== 'web') return

    for (const depot of depots) {
      const node = depotRefs.current[depot.id]
      if (!node?.measureInWindow) continue

      node.measureInWindow(
        (left: number, top: number, width: number, height: number) => {
          const isInside =
            x >= left &&
            x <= left + width &&
            y >= top &&
            y <= top + height

          if (isInside) {
            commitMove(shipmentId, depot.id)
          }
        }
      )
    }
  }

  return (
    <YStack flex={1} bg="$background" p="$4" gap="$4">
      {lastCommit ? (
        <XStack
          testID="move-feedback"
          borderWidth={1}
          borderColor="$borderColor"
          p="$3"
          gap="$3"
          items="center"
          justify="space-between"
          flexWrap="wrap"
        >
          <Text shrink={1}>
            Moved {lastCommit.shipmentId} to {depotName(lastCommit.toDepotId)}.
          </Text>
          <Button testID="undo-move" size="$3" onPress={undo}>
            Undo
          </Button>
        </XStack>
      ) : null}

      <ScrollView flex={1}>
        <YStack gap="$5" pb="$8">
          <YStack gap="$3">
            <Text fontSize="$7" fontWeight="700">Shipments</Text>
            {shipments.map((shipment) => (
              <ShipmentRow
                key={shipment.id}
                shipment={shipment}
                moveOpen={moveOpenFor === shipment.id}
                setMoveOpen={(open) => setMoveOpenFor(open ? shipment.id : null)}
                onCommandMove={(depotId) => commitMove(shipment.id, depotId)}
                onDropAt={resolvePointerDrop}
                onDragStateChange={setDraggingShipmentId}
              />
            ))}
          </YStack>

          <YStack gap="$3">
            <Text fontSize="$7" fontWeight="700">Depots</Text>
            {depots.map((depot) => (
              <YStack
                key={depot.id}
                ref={(node) => {
                  depotRefs.current[depot.id] = node
                }}
                testID={`depot-${depot.id}`}
                borderWidth={draggingShipmentId ? 2 : 1}
                borderColor={draggingShipmentId ? '$color10' : '$borderColor'}
                p="$4"
                rounded="$4"
              >
                <Text fontWeight="700">{depot.name}</Text>
              </YStack>
            ))}
          </YStack>
        </YStack>
      </ScrollView>
    </YStack>
  )
}

export default function App() {
  return (
    <SafeAreaProvider>
      <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
        <ShipmentMovePrototype />
      </TamaguiProvider>
    </SafeAreaProvider>
  )
}
