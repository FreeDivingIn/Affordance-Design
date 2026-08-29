import { useEffect, useRef } from 'react'
import { Text, YStack } from 'tamagui'

export function PointerDragHandle({
  shipmentId,
  onDropAt,
  onDragStateChange,
}: {
  shipmentId: string
  onDropAt: (shipmentId: string, x: number, y: number) => void
  onDragStateChange: (shipmentId: string | null) => void
}) {
  const handleRef = useRef<any>(null)

  useEffect(() => {
    const node = handleRef.current
    if (!node?.addEventListener) return

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return

      event.preventDefault()
      onDragStateChange(shipmentId)

      const finish = (releaseEvent: PointerEvent) => {
        window.removeEventListener('pointerup', finish)
        window.removeEventListener('pointercancel', cancel)
        onDropAt(shipmentId, releaseEvent.clientX, releaseEvent.clientY)
        onDragStateChange(null)
      }

      const cancel = () => {
        window.removeEventListener('pointerup', finish)
        window.removeEventListener('pointercancel', cancel)
        onDragStateChange(null)
      }

      window.addEventListener('pointerup', finish)
      window.addEventListener('pointercancel', cancel)
    }

    node.addEventListener('pointerdown', onPointerDown)
    return () => node.removeEventListener('pointerdown', onPointerDown)
  }, [onDragStateChange, onDropAt, shipmentId])

  return (
    <YStack
      ref={handleRef}
      testID={`drag-handle-${shipmentId}`}
      px="$2"
      py="$3"
      borderWidth={1}
      borderColor="$borderColor"
      rounded="$3"
      cursor="grab"
    >
      <Text fontWeight="700">⋮⋮</Text>
    </YStack>
  )
}
