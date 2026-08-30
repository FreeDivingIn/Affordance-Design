export type Shipment = {
  id: string
  description: string
  depotId: string
}

export type Depot = {
  id: string
  name: string
}

export type MoveCommit = {
  shipmentId: string
  fromDepotId: string
  toDepotId: string
}

export type MoveResult = {
  shipments: Shipment[]
  commit: MoveCommit
}

export function moveShipment(
  shipments: Shipment[],
  depots: Depot[],
  shipmentId: string,
  destinationDepotId: string
): MoveResult {
  const shipment = shipments.find((item) => item.id === shipmentId)
  if (!shipment) {
    throw new Error('Shipment must exist')
  }

  if (!depots.some((depot) => depot.id === destinationDepotId)) {
    throw new Error('Destination depot must exist')
  }

  const commit: MoveCommit = {
    shipmentId,
    fromDepotId: shipment.depotId,
    toDepotId: destinationDepotId,
  }

  return {
    shipments: shipments.map((item) =>
      item.id === shipmentId ? { ...item, depotId: destinationDepotId } : item
    ),
    commit,
  }
}

export function undoMove(shipments: Shipment[], commit: MoveCommit): Shipment[] {
  return shipments.map((shipment) =>
    shipment.id === commit.shipmentId
      ? { ...shipment, depotId: commit.fromDepotId }
      : shipment
  )
}
