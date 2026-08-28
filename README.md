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
product-spec.md
engineering-contract.md

.claude/skills/affordance-design/
├── SKILL.md
├── references/
│   ├── root-principles.md
│   ├── interaction-compiler.md
│   ├── ownership-and-automation.md
│   ├── anti-average-lint.md
│   ├── tamagui-prototyping.md
│   ├── research-basis.md
│   └── open-questions.md
└── evals/
    ├── evals.json
    └── trigger-cases.md

tasks/active/
└── tamagui-prototype-runtime.md
```

`SKILL.md` is intentionally an execution entrypoint. Detailed reasoning and implementation knowledge are progressively disclosed from focused references only when the task needs them.

## Current status

Initial skill structure and research split are complete on branch `skill/init-affordance-design`.

The active milestone is the Tamagui prototype runtime: validate the interaction-first sequencing with benchmark cases, then build the first minimal universal Web/Mobile block prototype.

No cross-library pattern registry, adapter layer, second component system, or production visual design system is planned for the initial runtime phase. Those require concrete evidence from real prototype limitations before reconsideration.
