# Affordance Design

An Agent Skill for reasoning about interface structure, affordances, information architecture, action scope, interaction layers, and AI-assisted behavior.

The skill is designed to counter structurally generic UI output: it starts from user problem state, current context, unresolved uncertainty, action scope, and ownership before choosing familiar interface patterns.

## Skill entrypoint

```text
.claude/skills/affordance-design/SKILL.md
```

Keeping the skill at `.claude/skills/<skill-name>/SKILL.md` makes it discoverable by Claude Code and compatible repository-mounted agents that scan the repository's root `.claude/skills` directory.

## Structure

```text
.claude/skills/affordance-design/
├── SKILL.md
├── references/
│   ├── root-principles.md
│   ├── interaction-compiler.md
│   ├── ownership-and-automation.md
│   ├── anti-average-lint.md
│   ├── research-basis.md
│   └── open-questions.md
└── evals/
    ├── evals.json
    └── trigger-cases.md
```

`SKILL.md` is intentionally a compact execution entrypoint. Detailed reasoning is progressively disclosed from focused references only when the task needs it.

## Current status

Initial skill structure and research split are complete on the initialization branch. The next milestone is benchmark iteration 1: clean-session trigger tests plus with-skill / without-skill behavior comparison.

No deterministic scripts are included yet. The current differentiating rules are judgment-heavy; scripts should be added only after repeated eval failures expose stable mechanical predicates worth enforcing.
