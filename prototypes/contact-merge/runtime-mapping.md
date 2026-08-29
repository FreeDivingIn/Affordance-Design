# Contact Merge — Runtime Mapping

This mapping is downstream of `interaction-spec.md`. Component/runtime availability must not change the frozen merge semantics.

## Shared semantic model

```text
selected contacts
→ Merge
→ choose primary record
→ merge commit
→ Undo
```

The state model is platform-independent and lives in `runtime/contact-merge-model.ts`.

## Tamagui presentation mapping

Pointer/hover context:

- current selected-contact list: neutral stacks/buttons;
- explicit Merge trigger: command control;
- unresolved primary-contact choice: Popover anchored to Merge;
- post-commit consequence/recovery: inline feedback with Undo.

Touchable context:

- the same Merge command and state model;
- the same two primary-record choices;
- the transient choice surface adapts to a Sheet for touch ergonomics;
- merge result and Undo remain semantically identical.

## Invariants

Runtime mapping must preserve:

- target = the two selected contacts;
- only one unresolved decision after Merge = primary contact;
- no Export, Add tags, Find duplicates, AI cleanup, or other sibling capability after Merge;
- dismissing the choice surface does not clear or change selection;
- selecting a primary record commits the merge directly;
- Undo restores both source contacts and their selected state;
- no prototype/reviewer explanation appears in visible product UI.

## Runtime dependency policy

Reuse the same Expo/Tamagui dependency set proven by Case 001, but keep Case 002's model and application source independent while there are only two cases. Do not extract a shared prototype framework yet; observe repeated needs across more cases before introducing an abstraction.
