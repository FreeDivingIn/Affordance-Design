# Init Affordance Design Skill

## Goal

Initialize the repository as a discoverable Agent Skill and convert the v0.3/v0.4 research into a progressively disclosed runtime skill without flattening the research into generic UX advice.

## Completed

- Researched current Agent Skill authoring and evaluation practices.
- Created `.claude/skills/affordance-design/SKILL.md`.
- Split detailed knowledge into direct one-level references.
- Added initial behavior evals and trigger cases.
- Verified discovery path, frontmatter naming, reference topology, line budgets, README, and branch diff.
- Preserved unresolved research questions as explicitly non-normative material.

## Decisions

- Keep `SKILL.md` as an execution/router layer rather than an encyclopedia.
- Keep detailed references directly reachable from the entrypoint.
- Do not convert judgment-heavy rules into scripts before benchmark evidence exposes stable mechanical predicates.
- Keep purely visual styling outside the skill's default trigger scope.

## Verification

Confirmed:

- repository discovery path is valid;
- frontmatter name matches the directory;
- detailed references are one level deep and directly linked;
- behavior and trigger eval inputs exist;
- unresolved hypotheses are isolated from hard rules;
- initialization work was completed on `skill/init-affordance-design` without changing `main`.

## Handoff

The next active task is `tasks/active/tamagui-prototype-runtime.md`, which extends the initialized skill into a runnable Web/Mobile structural-prototype workflow using Tamagui as the single initial runtime.
