# Assignment Prototype — Interaction Specification

> Status: frozen before runtime mapping. This document intentionally contains no Tamagui component names.

## Purpose

Validate that Affordance Design can produce a runnable Web/Mobile structural prototype from an interaction model that was selected before consulting a component library.

This is a runtime checkpoint, not a production feature specification.

## Scenario

A field-operations coordinator is looking at a work queue. They have deliberately selected several open work orders and invoke a specific command: `Assign`.

The interface already knows:

- the selected work orders;
- the selected count;
- the current queue context;
- that the user explicitly chose the Assign command.

The only required unresolved question is:

```text
Who should receive these selected work orders?
```

The interaction must not reopen unrelated choices such as changing priority, moving queues, changing due dates, or invoking automation.

## Primary task

Assign the currently selected work orders to one technician with minimal interruption to queue triage.

## Known state

```yaml
current_context: work queue
selection: 3 work orders
command: assign
assignment_target: unresolved
```

## Required uncertainty reduction

Before the assignment surface opens:

```yaml
known:
  action: assign
  work_orders: selected set
unknown:
  technician: true
```

After the user chooses a technician:

```yaml
known:
  action: assign
  work_orders: selected set
  technician: selected technician
unknown: none required for commit
```

No additional confirmation is required in the default path because:

- the action is explicitly invoked;
- the affected selection remains visible/communicated;
- the consequence is understandable;
- reassignment is reversible in the prototype.

## Affordance contract

The `Assign` entry point is a concrete command, not a capability-space launcher.

Therefore the next interaction may contain only assignment-specific content needed to complete the command.

## Action scopes

```yaml
invocation_scope: current selected work orders
target_scope: selected work orders
effect_scope: selected work orders + technician workload
persistence_scope: work orders
```

## State model

```text
QUEUE_WITH_SELECTION
  |
  | invoke Assign
  v
CHOOSING_TECHNICIAN
  |
  | choose technician
  v
ASSIGNMENT_COMMITTED
  |
  +--> undo --> QUEUE_WITH_SELECTION_PREVIOUS_ASSIGNMENT
  |
  +--> continue --> QUEUE
```

Dismissal while choosing a technician returns to `QUEUE_WITH_SELECTION` without changing assignment.

## Commit behavior

Choosing one technician commits immediately.

Rationale:

- no additional unresolved decision remains;
- a separate Apply step would only restate the chosen target;
- the operation is reversible;
- fast repeated triage is part of the task context.

The prototype must immediately show:

- who received the work orders;
- how many work orders changed;
- an Undo action.

## Recovery

```yaml
reversible: true
recovery_path: undo from post-commit feedback
recovery_window: prototype session
```

Undo restores the previous technician values for all affected work orders.

## Search behavior

The technician list may be filtered when the available set is large. Search is not a mandatory extra step and must not block direct selection from the visible candidates.

If implemented, search only changes the visible candidate set. It does not alter the selected work orders or commit state.

## Platform presentation requirements

The semantic interaction remains the same on Web and Mobile:

```text
selected work orders
→ explicit Assign command
→ choose one technician
→ immediate commit
→ visible recovery
```

Presentation may differ because of available space and input modality.

### Web

Prefer a local transient choice surface anchored close to the command/selection context when there is sufficient space. The queue should remain perceptually present.

### Mobile

Prefer a touch-friendly transient surface with larger targets and enough vertical space to browse technicians. The current selection count and action purpose must remain clear even if the queue is partially obscured.

The Mobile version must not introduce a new task stage merely because its presentation occupies more screen space.

## Block-prototype visual contract

Use deliberately neutral blocks:

- simple typographic hierarchy;
- visible selected state;
- visible current assignee;
- plain boundaries only where they communicate grouping;
- no brand styling;
- no dashboard decoration;
- no gradients, shadows-as-polish, marketing imagery, or ornamental cards;
- no attempt to make the prototype look production-finished.

Visual fidelity should be high enough to operate the structure and low enough that visual polish cannot hide a structural mistake.

## Structural assertions

The prototype fails if any of the following occurs:

1. Assign opens a broader action catalog.
2. The user must re-select which work orders to operate on.
3. A confirmation step appears after technician selection without buying new consequence understanding or control.
4. Web and Mobile change the action semantics instead of only adapting presentation.
5. The queue selection is lost when the assignment surface is dismissed.
6. Commit gives no visible consequence or recovery path.
7. Tamagui component availability causes the frozen interaction model above to be changed without a documented runtime limitation.

## Runtime mapping gate

Only after this document is frozen may implementation work consult Tamagui APIs and choose presentation primitives.
