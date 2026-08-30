# Contact Merge — Interaction Specification

## Problem frame

A contact-management user has already selected two duplicate contact records and explicitly invoked `Merge`.

The interaction must preserve two facts already supplied by the user:

```text
target = the two selected contacts
intent = merge those contacts
```

Invoking `Merge` must not reopen either fact by asking what objects to operate on or by broadening into unrelated contact-management capabilities.

## Known context

At invocation time:

- exactly two contact records are selected;
- the user intentionally chose the explicit `Merge` command;
- the selected records represent the same person but contain different field values;
- the product can merge the records and preserve a recovery snapshot.

## Unresolved question

The only required decision in this Eval state is:

```text
Which selected contact should remain the primary record?
```

The primary record determines the retained display identity. Secondary field values may be incorporated by the merge operation according to existing product rules; this Eval does not ask the user to configure unrelated cleanup behavior.

## Frozen semantic flow

```text
two contacts selected
→ explicit Merge command
→ choose one of those two contacts as primary
→ merge immediately
→ show resulting primary contact + Undo
```

## Affordance contract

`Merge` is a specific command, not a capability-space entry point.

After invocation, the interaction may expose only information and decisions necessary to complete this merge. It must not expose sibling capabilities such as Export, Add tags, Find duplicates, or AI cleanup merely because those actions also apply to contacts.

## Action scope

```yaml
invocation_scope: the explicit Merge command on the current two-contact selection
target_scope: the two selected contact records
effect_scope: replace the two selected records with one merged primary record
persistence_scope: persistent until Undo restores the pre-merge snapshot
```

## State model

```text
READY
  selected_contact_ids = [A, B]
  merge_surface = closed

MERGE_OPEN
  selected_contact_ids = [A, B]
  merge_surface = open
  unresolved = primary_contact_id

COMMITTED
  merged_contact = primary(A|B)
  previous_contacts = snapshot(A, B)
  recovery = Undo
```

Closing the merge surface returns to `READY` without changing the two selected contacts.

## Consequence and recovery

The merge changes user-owned contact records by replacing two records with one merged record.

Because this Eval supplies a reliable recovery snapshot, choosing the primary contact commits directly and exposes Undo. A separate confirmation stage is not required unless it resolves additional consequence uncertainty not present in this fixture.

## Presentation adaptation

Pointer and touch contexts may present the primary-contact choice differently, but they must preserve the same semantic flow, target scope, merge result, dismissal behavior, and Undo recovery.

## Forbidden structural changes

Do not:

- reopen contact selection after Merge;
- place unrelated contact actions inside the Merge flow;
- turn the Merge command into a general contact-tools catalog;
- ask the user to reconfirm that they want to merge after the primary record is chosen when no new uncertainty is introduced;
- fork merge semantics by platform;
- add reviewer, benchmark, prototype, or interaction-explanation content to the user-facing product surface;
- choose runtime components before this semantic model is fixed.

## Verification targets

A runnable prototype must make these behaviors directly operable:

1. The initial state visibly contains exactly two selected contact records.
2. Invoking Merge preserves those selected records as the target.
3. The next surface contains only the two selected primary-record choices.
4. No unrelated sibling capability is visible in the Merge surface.
5. Dismissing the surface preserves the selection.
6. Choosing either selected contact creates one merged record.
7. Undo restores the original two contacts and their selection.
8. Pointer and touch presentations preserve the same semantic behavior.
