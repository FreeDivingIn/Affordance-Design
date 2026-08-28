# Init Affordance Design Skill

## Goal

Initialize the repository as a discoverable Agent Skill and convert the v0.3/v0.4 research into a progressively disclosed runtime skill without flattening the research into generic UX advice.

## Relevant Context

- Repository started with only `README.md`.
- The source research distinguishes root principles from concrete execution rules.
- The skill's differentiated value is anti-average structural reasoning, not general visual design knowledge.
- Current runtime target follows the open Agent Skills format and `.claude/skills/<skill-name>/SKILL.md` repository discovery convention.

## Milestones

1. Research current Agent Skill authoring and evaluation best practices.
2. Initialize discoverable skill structure and concise entrypoint.
3. Split detailed knowledge into one-level references.
4. Add initial behavior and trigger eval cases.
5. Verify structure, frontmatter, direct references, terminology, and branch state.

## Completed

- Milestone 1: reviewed current Agent Skills specification, Anthropic authoring guidance, skill-creator workflow, repository discovery, and evaluation guidance.
- Milestone 2: created `.claude/skills/affordance-design/SKILL.md`.
- Milestone 3: created focused references for root principles, interaction compiler, ownership/automation, anti-average lint, research provenance, and open questions.
- Milestone 4: added five initial behavior evals and explicit positive/negative/ambiguous trigger cases.
- Milestone 5: verified the repository path, frontmatter naming, direct reference topology, file-size/line budgets, README, and branch diff. Added a contents section to every reference over 100 lines.

## Current State

Skill initialization is complete on branch `skill/init-affordance-design`.

The branch contains a 267-line `SKILL.md`, six direct reference files, behavior evals, trigger cases, and an updated README. No files have been merged into `main` and no pull request has been created.

## Open Issues

- No runtime benchmark has been executed yet.
- No deterministic linter script has been added; this is deliberate until repeated eval failures reveal stable mechanical checks.
- Open research questions remain explicitly non-normative in `references/open-questions.md`.

## Decisions

- Keep the skill at `.claude/skills/affordance-design/` for repository discovery.
- Use `affordance-design` as both directory and frontmatter name.
- Keep `SKILL.md` as workflow/router rather than encyclopedia.
- Keep all references one level deep and directly linked from `SKILL.md`.
- Do not add scripts during init because the current differentiating logic is judgment-heavy.
- Include evals at initialization rather than postponing validation design.
- Keep research provenance outside the runtime core so design reasoning remains maintainable without consuming every invocation's context.

## Constraints

- Do not duplicate detailed reference content into `SKILL.md`.
- Do not promote unresolved questions into runtime rules.
- Do not make responsive/component recipes the root organizing principle.
- Do not broaden the trigger description into purely visual styling tasks.
- Keep future references directly reachable from `SKILL.md`; avoid reference-to-reference dependency chains as the only discovery path.

## Hypotheses

- The current description may still need trigger tuning after clean-session testing.
- Several lint rules may later prove deterministic enough to move into scripts.
- The current core workflow may still be longer than necessary for the strongest models; benchmark token/quality deltas should determine future compression.

## Deferred

- Cross-model behavior benchmark.
- With-skill vs no-skill baseline comparison.
- Quantitative assertions after first eval runs expose discriminating checks.
- Description optimization after behavior stabilizes.
- Packaging/release workflow.

## Next

Benchmark iteration 1:

1. Run clean-session trigger cases.
2. Run each behavior eval with and without the skill.
3. Add objective assertions only where the behavior is mechanically verifiable.
4. Use qualitative review for structural design quality.
5. Analyze failures for under-triggering, over-triggering, skipped rules, excessive process, and token cost.
6. Revise the skill only from observed failures.

## Verification

Confirmed:

- `SKILL.md` is at `.claude/skills/affordance-design/SKILL.md`.
- Frontmatter `name: affordance-design` matches its directory and satisfies naming constraints.
- Description states both what the skill does and when to use it, and excludes purely visual styling tasks.
- `SKILL.md` is 267 lines, below the 500-line authoring ceiling.
- Detailed knowledge is split across six focused references, all directly linked from `SKILL.md`.
- Every reference over 100 lines has a contents section.
- Behavior and trigger eval inputs exist.
- README points to the actual discovery path.
- Unresolved hypotheses are isolated from runtime hard rules.
- Branch is ahead of `main` only; initialization has not modified `main`.
