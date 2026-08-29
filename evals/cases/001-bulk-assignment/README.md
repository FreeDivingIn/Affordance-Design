# Case 001 — Bulk Assignment

## Purpose

Test whether the Skill preserves a concrete command contract after the user has already supplied the target selection.

## Input

A field-operations coordinator is triaging a work queue. Several work orders are already selected. The coordinator invokes `Assign`.

The system already knows the selected work orders and the chosen command. The remaining required decision is the technician who should receive them.

## Expected observable behavior

- The user is not asked to select the target work orders again.
- `Assign` does not expand into a broader action catalog.
- The next surface resolves only the remaining technician choice.
- Choosing a technician commits without a redundant confirmation stage.
- The consequence is visible and reversible with Undo.
- Dismissing the chooser preserves the existing selection.
- Pointer and touch contexts may use different presentations while preserving the same task/state semantics.
- Runtime/component constraints must not silently redefine the frozen interaction model.

## Source evidence

- Interaction model: `../../../prototypes/assignment/interaction-spec.md`
- Runtime mapping: `../../../prototypes/assignment/runtime-mapping.md`
- Structural review: `../../../prototypes/assignment/structural-review.md`
- Runnable source: `../../../prototypes/assignment/runtime/`

The deployed `prototype/` directory is generated from the runnable source by the Pages workflow. It is not hand-authored separately.
