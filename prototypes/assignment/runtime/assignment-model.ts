export type WorkOrder = {
  id: string
  title: string
  assignee: string
}

export type AssignmentSnapshot = Record<string, string>

export type AssignmentCommit = {
  technician: string
  workOrderIds: string[]
}

export type AssignmentResult = {
  workOrders: WorkOrder[]
  snapshot: AssignmentSnapshot
  commit: AssignmentCommit
}

export function toggleSelection(current: string[], id: string): string[] {
  return current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
}

export function assignWorkOrders(
  workOrders: WorkOrder[],
  selectedIds: string[],
  technician: string
): AssignmentResult {
  if (selectedIds.length === 0) {
    throw new Error('Cannot assign without a selection')
  }

  const selected = new Set(selectedIds)
  const snapshot: AssignmentSnapshot = {}

  const next = workOrders.map((workOrder) => {
    if (!selected.has(workOrder.id)) return workOrder

    snapshot[workOrder.id] = workOrder.assignee
    return { ...workOrder, assignee: technician }
  })

  return {
    workOrders: next,
    snapshot,
    commit: {
      technician,
      workOrderIds: [...selectedIds],
    },
  }
}

export function undoAssignment(
  workOrders: WorkOrder[],
  snapshot: AssignmentSnapshot
): WorkOrder[] {
  return workOrders.map((workOrder) =>
    workOrder.id in snapshot
      ? { ...workOrder, assignee: snapshot[workOrder.id] }
      : workOrder
  )
}
