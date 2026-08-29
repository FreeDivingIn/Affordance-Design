# Affordance Design

An Agent Skill for reasoning about interface structure, affordances, information architecture, action scope, interaction layers, AI-assisted behavior, and runnable structural prototypes.

The skill is designed to counter structurally generic UI output: it starts from user problem state, current context, unresolved uncertainty, action scope, and ownership before choosing familiar interface patterns or UI components.

## Product output

The default design artifact is a **runnable block-like structural prototype** when implementation is available.

The prototype prioritizes behavioral fidelity over visual fidelity. It should make state, scope, transitions, interaction layers, ownership, recovery, and Web/Mobile adaptation directly testable without becoming a polished UI design.

See `product-spec.md`.

## Skill entrypoint

```text
.claude/skills/affordance-design/SKILL.md
```

Keeping the skill at `.claude/skills/<skill-name>/SKILL.md` makes it discoverable by Claude Code and compatible repository-mounted agents that scan the repository's root `.claude/skills` directory.

## Prototype runtime

Tamagui is the single UI/runtime system for the initial prototype phase.

The project deliberately separates interaction design from component mapping:

```text
problem / context
→ interaction divergence
→ selected structural behavior
→ anti-average review
→ Tamagui mapping
→ runnable block prototype
→ operate and review
```

Do not start interaction design by enumerating Tamagui components. Component availability is an implementation constraint, not the generator of the interaction model.

See `engineering-contract.md` and `.claude/skills/affordance-design/references/tamagui-prototyping.md`.

## Structure

```text
product-spec.md              # product goal, output levels, acceptance criteria
engineering-contract.md      # runtime + sequencing constraints

.claude/skills/affordance-design/
├── SKILL.md                 # execution entrypoint
├── references/              # progressively disclosed reasoning knowledge
│   ├── root-principles.md
│   ├── interaction-compiler.md
│   ├── ownership-and-automation.md
│   ├── anti-average-lint.md
│   ├── tamagui-prototyping.md
│   ├── research-basis.md
│   └── open-questions.md
└── evals/                   # in-skill eval definitions
    ├── evals.json
    └── trigger-cases.md

evals/                       # published reviewer-facing Eval cases
├── index.html               # generated catalog entry
├── validate-cases.mjs       # case schema validation + catalog manifest
└── cases/<case-id>/
    ├── case.json            # canonical requirement/expectation fixture
    ├── README.md
    └── index.html           # reviewer case page

prototypes/                  # runnable Tamagui structural prototypes
├── assignment/              # Case 001
├── contact-merge/           # Case 002
├── shipment-move/           # Case 003
└── media-template-composer/ # Case 004 (baseline + optimized runtimes)

tasks/
├── active/                  # milestone plans in progress
└── completed/

.github/workflows/           # per-prototype CI + Pages deploy
```

`SKILL.md` is intentionally an execution entrypoint. Detailed reasoning and implementation knowledge are progressively disclosed from focused references only when the task needs them.

## Eval site

Published Eval cases are deployed to GitHub Pages:

```text
https://freedivingin.github.io/Affordance-Design/
```

Each case keeps requirement brief, expected behavior, runnable prototype, and review evidence as separate layers. Prototypes render only UI the represented end user would actually see; reviewer context lives outside the product runtime (see `evals/README.md`).

## Current status

Four structurally distinct runnable Evals are published on branch `skill/init-affordance-design`:

| Case | What it tests |
|---|---|
| 001 — Bulk Assignment | resolved target context + narrow command execution |
| 002 — Merge Command Contract | an explicit command must not broaden into capability space |
| 003 — Move Access Paths | multiple invocation paths to one conceptual action skip already-resolved questions |
| 004 — Media Template Composer | real-case complex mobile composer: frozen baseline vs Skill-optimized structure |

Cases 001–003 pass model tests, TypeScript/Web/iOS export, local pointer/touch operation, and public post-deploy smoke. Case 004 has both a frozen current-state baseline and an optimized problem-state runtime published; the baseline-vs-optimized structural comparison review is the active work.

Outstanding:

- native iOS/Android device operation (simulator/physical-device access blocker);
- with-Skill vs without-Skill comparison runs once an independent execution environment is available;
- keyboard/focus, long-list touch gesture quality, and production accessibility remain partially verified.

No cross-library pattern registry, adapter layer, second component system, or production visual design system is planned for the initial runtime phase. Those require concrete evidence from real prototype limitations before reconsideration (see `engineering-contract.md` re-evaluation conditions).
