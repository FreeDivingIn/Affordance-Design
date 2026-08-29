import assert from 'node:assert/strict'
import test from 'node:test'

import {
  assignWorkOrders,
  toggleSelection,
  undoAssignment,
  type WorkOrder,
} from './assignment-model.ts'

const workOrders: WorkOrder[] = [
  { id: 'A', title: 'Alpha', assignee: 'Old A' },
  { id: 'B', title: 'Beta', assignee: 'Old B' },
  { id: 'C', title: 'Gamma', assignee: 'Old C' },
]

test('selection toggles without changing unrelated selection', () => {
  assert.deepEqual(toggleSelection(['A', 'B'], 'B'), ['A'])
  assert.deepEqual(toggleSelection(['A'], 'C'), ['A', 'C'])
})

test('assignment changes only the already-selected work orders', () => {
  const result = assignWorkOrders(workOrders, ['A', 'C'], 'New Tech')

  assert.deepEqual(
    result.workOrders.map(({ id, assignee }) => ({ id, assignee })),
    [
      { id: 'A', assignee: 'New Tech' },
      { id: 'B', assignee: 'Old B' },
      { id: 'C', assignee: 'New Tech' },
    ]
  )

  assert.deepEqual(result.snapshot, {
    A: 'Old A',
    C: 'Old C',
  })

  assert.deepEqual(result.commit, {
    technician: 'New Tech',
    workOrderIds: ['A', 'C'],
  })
})

test('undo restores the previous assignees for the affected selection', () => {
  const committed = assignWorkOrders(workOrders, ['A', 'C'], 'New Tech')
  const restored = undoAssignment(committed.workOrders, committed.snapshot)

  assert.deepEqual(restored, workOrders)
})

test('assignment refuses to invent a target set when selection is empty', () => {
  assert.throws(
    () => assignWorkOrders(workOrders, [], 'New Tech'),
    /Cannot assign without a selection/
  )
})
