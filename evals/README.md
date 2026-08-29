# Affordance Design Evals

This directory contains externalized evaluation cases for the Skill.

Each case keeps four layers separate:

1. **Requirement brief** — complete product context needed to judge the design.
2. **Expected behavior** — observable structural assertions used for review.
3. **Rendered prototype** — a runnable artifact built from the actual prototype source, not a hand-authored mock substitute.
4. **Review evidence** — source interaction spec, runtime mapping, benchmark result, and structural review.

## Canonical case fixture

`cases/<case-id>/case.json` is the single source of requirement and expected-behavior facts for a published Eval case.

Reviewer HTML reads those fields from `case.json`; do not copy the same requirement prose into README or hand-maintain it in the catalog.

`evals/validate-cases.mjs` validates every case directory and generates the published catalog manifest during the Pages build. The manifest is generated output, not project truth.

## Required requirement brief

Every case must explicitly provide:

```yaml
requirement_goal:
background:
current_state:
optimization_direction: feature_creation | feature_upgrade | feature_optimization
```

Definitions:

- `feature_creation` — introduce a user-facing capability that does not currently exist;
- `feature_upgrade` — materially expand an existing capability's scope, supported situations, behavior, or user value;
- `feature_optimization` — preserve substantially the same functional scope while improving interaction, comprehension, efficiency, control, or recovery.

A case can add personas, constraints, known context, unresolved questions, expected behavior, and forbidden outcomes, but it cannot omit the four fields above.

## Case shape

```text
evals/
├── README.md
├── index.html
├── validate-cases.mjs
└── cases/
    └── <case-id>/
        ├── README.md
        ├── case.json
        └── index.html
```

The deployed site is assembled by `.github/workflows/evals-pages.yml`.

Runtime bundles are generated during deployment and copied under each case's `prototype/` path. Generated build output and the generated catalog manifest are not committed as project truth.

## Prototype boundary

The Eval case page is reviewer-facing and may show requirements, assertions, rationale, source links, and review status.

The runnable prototype is user-facing product simulation. It must not contain reviewer/developer scaffolding.

Do not render inside a prototype:

- prototype/eval/demo/test explanations;
- design rationale or expected behavior;
- instructions written only for the reviewer;
- state-machine or implementation descriptions;
- platform/benchmark labels;
- prototype-only page titles, legends, annotations, badges, or helper copy.

Every visible element and string in the prototype must be defensible as something the represented end user would actually see in the product state being evaluated.

## Rules

- Do not use the rendered page as the source of interaction design decisions.
- Freeze the interaction specification before component/runtime mapping.
- Keep test assertions about observable behavior, not visual polish.
- Fail publication when the mandatory requirement schema is incomplete or the optimization direction is outside the three allowed values.
- A successful build does not automatically mean a case passes structural review.
- Deployment is not accepted until the public catalog, requirement page, and prototype are opened and checked by browser smoke tests.
- Add a new case only when it tests a distinct design failure mode or decision boundary.
