import assert from 'node:assert/strict'
import test from 'node:test'

import { mergeContacts, undoMerge, type Contact } from './contact-merge-model.ts'

const contacts: Contact[] = [
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
    emails: ['owen@example.test'],
    phones: [],
  },
]

const selected = ['maya-rivera', 'm-rivera']

test('merges exactly two selected contacts into the chosen primary record', () => {
  const result = mergeContacts(contacts, selected, 'maya-rivera')

  assert.equal(result.contacts.length, 2)
  assert.deepEqual(result.selectedIds, ['maya-rivera'])

  const merged = result.contacts.find((contact) => contact.id === 'maya-rivera')
  assert.ok(merged)
  assert.equal(merged.name, 'Maya Rivera')
  assert.deepEqual(merged.emails, [
    'maya@northstar.example',
    'maya.rivera@northstar.example',
  ])
  assert.deepEqual(merged.phones, ['+1 415 555 0142'])
})

test('rejects a primary record outside the current selection', () => {
  assert.throws(
    () => mergeContacts(contacts, selected, 'owen-brooks'),
    /Primary contact must be one of the selected contacts/
  )
})

test('rejects merge when the target scope is not exactly two contacts', () => {
  assert.throws(
    () => mergeContacts(contacts, ['maya-rivera'], 'maya-rivera'),
    /Merge requires exactly two selected contacts/
  )
})

test('undo restores both source contacts and their original selection', () => {
  const result = mergeContacts(contacts, selected, 'maya-rivera')
  const restored = undoMerge(result.snapshot)

  assert.deepEqual(restored.contacts, contacts)
  assert.deepEqual(restored.selectedIds, selected)
})
