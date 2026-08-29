# Case 001 — Bulk Assignment

`case.json` is the canonical evaluation fixture for this case. It owns the requirement goal, background, current state, optimization direction, expected behavior, and forbidden outcomes.

The reviewer-facing `index.html` loads those fields from `case.json` at runtime rather than duplicating the requirement text.

## Source evidence

- Canonical case fixture: `./case.json`
- Interaction model: `../../../prototypes/assignment/interaction-spec.md`
- Runtime mapping: `../../../prototypes/assignment/runtime-mapping.md`
- Structural review: `../../../prototypes/assignment/structural-review.md`
- Runnable source: `../../../prototypes/assignment/runtime/`

The deployed `prototype/` directory is generated from the runnable source by the Pages workflow. It is not hand-authored separately.

Reviewer context belongs to the Eval page and fixture. The runnable prototype must contain only product UI that the represented end user would actually see.
