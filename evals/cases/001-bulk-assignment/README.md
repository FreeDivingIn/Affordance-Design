# Case 001 — Bulk Assignment

## Requirement goal

Allow a field-operations coordinator to reassign multiple already-selected work orders to one technician quickly, while keeping the result clear and recoverable.

## Background

Field-operations coordinators triage a shared work queue throughout the day. They often select several work orders that need the same technician and then perform a batch assignment while remaining in the queue context.

## Current state

The work queue already supports multi-selection and an `Assign` action, but the current assignment flow treats invocation as the start of a new generic assignment process: it re-establishes target context and adds decision/confirmation steps even though the selected work orders and the `Assign` intent are already known.

## Optimization direction

`feature_optimization`

The functional capability already exists. This case evaluates whether the same capability can be made more direct, context-aware, and recoverable without expanding its scope.

## Expected observable behavior

- The user is not asked to select the target work orders again.
- `Assign` does not expand into a broader action catalog.
- The next surface resolves only the remaining technician choice.
- Choosing a technician commits without a redundant confirmation stage.
- The consequence is visible and reversible with Undo.
- Dismissing the chooser preserves the existing selection.
- Pointer and touch contexts may use different presentations while preserving the same task/state semantics.
- Runtime/component constraints must not silently redefine the frozen interaction model.
- The runnable prototype contains no reviewer-facing or prototype-explanation content.

## Source evidence

- Interaction model: `../../../prototypes/assignment/interaction-spec.md`
- Runtime mapping: `../../../prototypes/assignment/runtime-mapping.md`
- Structural review: `../../../prototypes/assignment/structural-review.md`
- Runnable source: `../../../prototypes/assignment/runtime/`

The deployed `prototype/` directory is generated from the runnable source by the Pages workflow. It is not hand-authored separately.
