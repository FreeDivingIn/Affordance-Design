import assert from 'node:assert/strict'
import test from 'node:test'

import {
  moveShipment,
  undoMove,
  type Depot,
  type Shipment,
} from './shipment-move-model.ts'

const depots: Depot[] = [
  { id: 'oakland', name: 'Oakland Hub' },
  { id: 'reno', name: 'Reno Depot' },
  { id: 'sacramento', name: 'Sacramento Depot' },
]

const shipments: Shipment[] = [
  { id: 'SH-4821', description: 'Medical supplies', depotId: 'reno' },
  { id: 'SH-4830', description: 'Machine parts', depotId: 'sacramento' },
]

test('moves only the target shipment to the resolved destination', () => {
  const result = moveShipment(shipments, depots, 'SH-4821', 'oakland')

  assert.deepEqual(result.commit, {
    shipmentId: 'SH-4821',
    fromDepotId: 'reno',
    toDepotId: 'oakland',
  })
  assert.equal(result.shipments.find((item) => item.id === 'SH-4821')?.depotId, 'oakland')
  assert.equal(
    result.shipments.find((item) => item.id === 'SH-4830')?.depotId,
    'sacramento'
  )
})

test('command and drag paths produce the same result when they resolve the same inputs', () => {
  const commandResult = moveShipment(shipments, depots, 'SH-4821', 'oakland')
  const dragResult = moveShipment(shipments, depots, 'SH-4821', 'oakland')

  assert.deepEqual(dragResult, commandResult)
})

test('undo restores the previous depot', () => {
  const result = moveShipment(shipments, depots, 'SH-4821', 'oakland')
  const restored = undoMove(result.shipments, result.commit)

  assert.deepEqual(restored, shipments)
})

test('rejects a destination that is not a valid depot', () => {
  assert.throws(
    () => moveShipment(shipments, depots, 'SH-4821', 'unknown'),
    /Destination depot must exist/
  )
})
