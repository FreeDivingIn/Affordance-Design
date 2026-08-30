# Shipment Move — Runtime Mapping

This mapping is downstream of `interaction-spec.md`. Runtime choices must preserve the distinction between unresolved and already-supplied destination context.

## Shared move model

Both access paths call the same platform-independent transition:

```text
moveShipment(shipmentId, destinationDepotId)
```

The move model snapshots the previous depot and returns one recovery path regardless of invocation method.

## Command path

Pointer and touch contexts:

- shipment row exposes the real product `Move` action;
- invoking Move keeps the shipment fixed as the target;
- destination remains unresolved, so the runtime presents only valid depot choices;
- selecting a depot commits the shared move transition;
- the result exposes Undo.

Pointer may use an anchored transient surface; touch may adapt that same unresolved destination choice to a Sheet.

## Direct-manipulation path

Pointer Web only for this Eval:

- the shipment row exposes a drag handle as a product affordance;
- a pointer drag is resolved against visible depot targets;
- a valid depot under the release point supplies `destinationDepotId` directly;
- the shared move transition commits immediately;
- the destination chooser is never opened after a valid drop.

This prototype does not invent a touch drag interaction merely to make platform presentations look identical.

## Invalid drop

A release outside a valid depot does not call the move transition and leaves shipment state unchanged.

## Tamagui mapping

- workspace regions: neutral stack primitives;
- shipment and depot records: neutral bordered rows/containers;
- command-path destination choice: Popover adapted to Sheet for touchable contexts;
- pointer drag recognition: React Native `PanResponder` attached to the shipment drag affordance;
- pointer Web drop resolution: resolve the release point to the real rendered depot target;
- feedback/recovery: inline product feedback with Undo.

## Invariants

Runtime mapping must preserve:

- command path: shipment known, destination unresolved;
- valid drag path: shipment known, destination known from drop target;
- one shared move state transition;
- no destination picker after valid drop;
- same resulting depot and Undo behavior for equivalent command/drop moves;
- no state change after invalid drop;
- no evaluator or prototype explanation in visible product UI.

## Abstraction policy

Keep Case 003's state model and runtime independent. Three cases now provide enough evidence to inspect repeated runtime scaffolding, but extraction of a shared prototype framework remains deferred until after Case 003 validation so infrastructure refactoring cannot redefine the interaction under test.
