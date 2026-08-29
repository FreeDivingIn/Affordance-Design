# Shipment Move — Interaction Specification

## Problem frame

A logistics dispatcher can move a shipment through two intentional access paths:

```text
A. invoke Move on a known shipment
B. drag a known shipment onto a visible destination depot
```

Both paths mean the same conceptual action: change one shipment's destination depot.

They do not begin with the same amount of information.

## Product context

The represented dispatch workspace keeps active shipments and destination depots visible at the same time.

Each shipment has a current depot and an explicit `Move` action. Pointer users may also drag a shipment directly onto a depot that is already visible in the workspace.

The product can preserve the previous depot long enough to provide Undo.

## Path A — explicit Move command

Known at invocation:

```text
shipment = known
action = Move
destination = unresolved
```

Remaining question:

```text
Which depot should this shipment move to?
```

Required flow:

```text
Move command
→ choose destination depot
→ commit move
→ feedback + Undo
```

The destination chooser must contain only valid destination depots for the current shipment state.

## Path B — drag onto depot

Known at drop:

```text
shipment = known
action = Move
destination = known from drop target
```

Remaining question:

```text
none
```

Required flow:

```text
drag shipment onto depot
→ commit move
→ feedback + Undo
```

A destination picker after a valid drop is forbidden because the user has already supplied the destination through the drop target.

## Shared conceptual action

Both access paths must call the same move semantics:

```yaml
invocation_scope:
  command_path: explicit Move on one shipment
  drag_path: direct manipulation of one shipment onto one depot
target_scope: one shipment
effect_scope: change that shipment's depot to the resolved destination
persistence_scope: persistent until Undo restores the previous depot
```

The paths may have different step counts while remaining one conceptual action.

## Compatibility contract

Access-path consistency requires:

- the same shipment/depot state transition;
- the same destination validity rules;
- the same resulting shipment state;
- the same recovery semantics;
- compatible feedback.

It does not require the same intermediate UI.

## Invalid drop

Dropping outside a valid depot must not move the shipment.

An invalid drop does not need a destination picker because the direct-manipulation attempt did not resolve to a valid destination. The shipment remains unchanged and the user can use either access path again.

## Presentation contexts

The drag path is evaluated in pointer Web, where drag-to-depot is an available direct-manipulation affordance.

Touch/mobile still exposes the explicit Move path and must preserve the same move state model and recovery semantics. This Eval does not invent a touch drag gesture solely to force presentation parity.

## Forbidden structural changes

Do not:

- open the destination picker after a valid drop onto a depot;
- make drag and command paths produce different conceptual move results;
- ask for the shipment again after either path already identifies it;
- reinterpret drag-to-depot as a different action from Move;
- add an extra generic confirmation when destination is already resolved and recovery is available;
- expose reviewer/prototype explanation in the product surface;
- choose Tamagui components before this semantic model is fixed.

## Verification targets

1. Explicit Move on a shipment opens a destination choice because destination is unresolved.
2. Choosing a depot commits the move and shows Undo.
3. Undo restores the shipment's previous depot.
4. Pointer drag from the same shipment onto a valid depot commits directly with no destination chooser.
5. The drag result equals the command-path result for the same shipment/destination pair.
6. Invalid drop leaves the shipment unchanged.
7. Touch/mobile can complete the explicit Move path with the same state/result/recovery semantics.
8. No evaluator-only visible content appears in the runnable prototype.
