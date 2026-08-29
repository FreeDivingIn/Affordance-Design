export type Contact = {
  id: string
  name: string
  emails: string[]
  phones: string[]
}

export type MergeSnapshot = {
  contacts: Contact[]
  selectedIds: string[]
}

export type MergeCommit = {
  primaryId: string
  mergedIds: [string, string]
}

export type MergeResult = {
  contacts: Contact[]
  selectedIds: string[]
  snapshot: MergeSnapshot
  commit: MergeCommit
}

function unique(values: string[]): string[] {
  return [...new Set(values)]
}

export function toggleSelection(current: string[], id: string): string[] {
  return current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
}

export function mergeContacts(
  contacts: Contact[],
  selectedIds: string[],
  primaryId: string
): MergeResult {
  if (selectedIds.length !== 2) {
    throw new Error('Merge requires exactly two selected contacts')
  }

  if (!selectedIds.includes(primaryId)) {
    throw new Error('Primary contact must be one of the selected contacts')
  }

  const selected = new Set(selectedIds)
  const selectedContacts = contacts.filter((contact) => selected.has(contact.id))

  if (selectedContacts.length !== 2) {
    throw new Error('Selected contacts must exist')
  }

  const primary = selectedContacts.find((contact) => contact.id === primaryId)
  if (!primary) {
    throw new Error('Primary contact must exist')
  }

  const merged: Contact = {
    ...primary,
    emails: unique(selectedContacts.flatMap((contact) => contact.emails)),
    phones: unique(selectedContacts.flatMap((contact) => contact.phones)),
  }

  const nextContacts = contacts
    .filter((contact) => !selected.has(contact.id))
    .concat(merged)

  return {
    contacts: nextContacts,
    selectedIds: [primaryId],
    snapshot: {
      contacts: contacts.map((contact) => ({
        ...contact,
        emails: [...contact.emails],
        phones: [...contact.phones],
      })),
      selectedIds: [...selectedIds],
    },
    commit: {
      primaryId,
      mergedIds: [selectedIds[0], selectedIds[1]],
    },
  }
}

export function undoMerge(snapshot: MergeSnapshot): {
  contacts: Contact[]
  selectedIds: string[]
} {
  return {
    contacts: snapshot.contacts.map((contact) => ({
      ...contact,
      emails: [...contact.emails],
      phones: [...contact.phones],
    })),
    selectedIds: [...snapshot.selectedIds],
  }
}
