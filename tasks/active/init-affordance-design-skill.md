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
- Milestone 4: added initial behavior evals and trigger cases.

## Current State

Initialization files exist on branch `skill/init-affordance-design`. README update and final structural verification remain.

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

## Constraints

- Do not duplicate detailed reference content into `SKILL.md`.
- Do not promote unresolved questions into runtime rules.
- Do not make responsive/component recipes the root organizing principle.
- Do not broaden the trigger description into purely visual styling tasks.

## Hypotheses

- The current description may still need trigger tuning after clean-session testing.
- Several lint rules may later prove deterministic enough to move into scripts.

## Deferred

- Cross-model behavior benchmark.
- With-skill vs no-skill baseline comparison.
- Quantitative assertions after first eval runs expose discriminating checks.
- Packaging/release workflow.

## Next

1. Update README with installation/discovery and repository structure.
2. Verify every reference link and frontmatter requirement.
3. Review line/word budgets and remove accidental duplication.
4. Form checkpoint and prepare next milestone: benchmark iteration 1.

## Verification

Initialization is complete when:

- `SKILL.md` is discoverable at the required repository path;
- frontmatter name matches directory and description covers what/when;
- `SKILL.md` remains below the recommended size ceiling;
- all detailed references are direct, one-level links;
- open hypotheses are isolated from hard rules;
- behavior and trigger eval inputs exist;
- repository README points to the skill entrypoint;
- final branch readback matches intended structure.
