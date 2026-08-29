export function PointerDragHandle({
  shipmentId: _shipmentId,
  onDropAt: _onDropAt,
  onDragStateChange: _onDragStateChange,
}: {
  shipmentId: string
  onDropAt: (shipmentId: string, x: number, y: number) => void
  onDragStateChange: (shipmentId: string | null) => void
}) {
  return null
}
