# Affordance Design Evals

This directory contains externalized evaluation cases for the Skill.

Each case should keep three layers separate:

1. **Case input** — the scenario and constraints the Skill receives.
2. **Expected behavior** — observable structural assertions used for review.
3. **Rendered prototype** — a runnable artifact built from the actual prototype source, not a hand-authored mock substitute.

## Case shape

```text
evals/
├── index.html
└── cases/
    └── <case-id>/
        ├── README.md
        ├── case.json
        └── index.html
```

The deployed site is assembled by `.github/workflows/evals-pages.yml`.

Runtime bundles are generated during deployment and copied under each case's `prototype/` path. Generated build output is not committed as project truth.

## Rules

- Do not use the rendered page as the source of interaction design decisions.
- Freeze the interaction specification before component/runtime mapping.
- Keep test assertions about observable behavior, not visual polish.
- A successful build does not automatically mean a case passes structural review.
- Add a new case only when it tests a distinct design failure mode or decision boundary.
