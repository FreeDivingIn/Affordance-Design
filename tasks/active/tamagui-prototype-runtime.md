# Tamagui Prototype Runtime

## Goal

Make Affordance Design produce runnable, block-like structural prototypes for Web and Mobile using Tamagui as the single initial runtime, while preserving interaction-design divergence before component mapping and keeping reviewer context outside the user-facing prototype.

## Relevant Context

- The Skill's highest-value output is a runnable structural prototype, not a polished visual design.
- The interaction model must be decided before any Tamagui component lookup or mapping.
- Early multi-tool/component-library merging is explicitly out of scope.
- Tamagui 2 is the selected initial runtime for React Native and React Web.
- The runtime is an implementation layer; it must not become the source of information architecture or interaction concepts.
- Every Eval case must be independently reviewable without hidden chat context.
- Eval/reviewer information and user-facing prototype content are separate surfaces.

## Milestones

1. Deeply understand Tamagui's current cross-platform runtime, adaptation model, component mechanics, configuration, and AI-oriented tooling from official sources.
2. Establish the product output contract and engineering sequencing constraints.
3. Update the Skill so divergence and structural review occur before Tamagui mapping.
4. Add prototype-focused evals that catch component-first convergence.
5. Build the first minimal runnable block prototype scaffold with Tamagui from a pre-selected interaction model.
6. Run a cross-platform interaction benchmark and review whether Tamagui implementation changes the selected interaction model.
7. Externalize runnable eval cases and publish them through GitHub Pages for human review.
8. Formalize the Eval requirement contract and user-only prototype-surface boundary.

## Completed

- Milestones 1–5 are complete for the first representative assignment case.
- Milestone 6 is complete for pointer Web and touch/mobile Web semantics; native simulator/physical-device operation remains the outstanding native validation.
- Milestone 7 publishing infrastructure is operational at `https://freedivingin.github.io/Affordance-Design/`, with post-deploy browser operation required after Pages deployment.
- Milestone 8 product and engineering contracts are established:
  - every case requires `requirement_goal`, `background`, `current_state`, and `optimization_direction`;
  - `optimization_direction` is constrained to `feature_creation`, `feature_upgrade`, or `feature_optimization`;
  - `case.json` is the canonical Eval fixture for requirement and expectation facts;
  - reviewer pages render requirement data from the canonical fixture rather than duplicating it;
  - the published catalog is generated from validated case directories instead of manually duplicating case metadata;
  - runnable prototypes contain only UI the represented end user would actually see;
  - reviewer/developer/prototype explanations remain outside the runtime;
  - known reviewer-copy leakage is guarded by local and deployed browser regression checks.
- Case 001 was revised to remove prototype-only explanatory content and to include the complete requirement brief as `feature_optimization`.
- `AVG-023 — Reviewer context leaks into product prototype — ERROR` was added to the anti-average review.
- A deterministic Eval fixture validator was added because the mandatory requirement fields and direction enum are stable mechanical predicates.

## Current State

The first representative interaction remains frozen independently of Tamagui and is implemented as a block-like universal prototype.

Browser operation validates the same assignment semantics in pointer and touch contexts. The earlier touch blank-screen defect is closed after adding the missing Tamagui animation driver; no upstream interaction decision changed.

The Eval layer now has a stronger information boundary:

```text
case.json
→ canonical requirement + expectation fixture
→ reviewer page / generated catalog

interaction spec + runtime
→ runnable product prototype
→ user-visible product UI only
```

The current Pages workflow validates every case requirement fixture before publishing and generates the catalog manifest from validated case directories. The latest deployment must still complete its full build → deploy → public browser smoke cycle before this checkpoint is considered externally refreshed.

## Open Issues

- Actual native Sheet interaction still needs simulator or physical-device operation evidence.
- Keyboard/focus behavior is not fully reviewed beyond the tested pointer Escape dismissal.
- Long-list touch gesture quality and production accessibility remain unverified.
- Prototype-surface purity cannot be reduced to a generic keyword detector; future cases still require semantic review of whether each visible element belongs to the represented end-user product.
- No evidence justifies a custom design system, component registry, additional component library, or abstraction layer.

## Decisions

- Tamagui remains the only component/runtime system during the initial prototype phase.
- Do not create a cross-library pattern registry or adapter layer during this milestone.
- Do not browse or enumerate Tamagui components during design divergence.
- Component names are implementation vocabulary, not interaction-design vocabulary.
- The default artifact is a low-visual-fidelity, high-behavior-fidelity block prototype.
- Web and Mobile may use different presentations after semantics are fixed; task/scope/state/recovery semantics remain shared unless context justifies a different model.
- Prefer composition/configuration changes over changing a validated interaction model merely to fit runtime constraints.
- Every Eval case must include a complete requirement brief: goal, background, current state, and one of the three optimization directions.
- `case.json` is the single case-fixture source of requirement and expected-behavior facts; reviewer HTML should render from it.
- Reviewer context and product runtime are separate artifacts.
- Every visible prototype element/string must be justifiable as real user-facing product UI for the represented state.
- Non-rendered instrumentation such as test IDs is allowed when it does not alter visible product behavior.
- Static export or successful Pages deployment alone is insufficient verification. A deployed runnable eval must pass browser operation with runtime errors treated as failures.

## Constraints

- Do not let Tamagui demo aesthetics influence structural choice.
- Do not add visual-system polish before structural validation.
- Do not add another UI library without evidence meeting the re-evaluation conditions in `engineering-contract.md`.
- Keep Tamagui API/version details in implementation/reference material, not product behavior documents.
- A successful render is not a successful prototype; key paths must be operated and reviewed.
- The first runnable prototype must start from an interaction specification produced without Tamagui component vocabulary.
- Runtime failures must first be diagnosed at the implementation/configuration boundary; do not redesign upstream semantics merely to fit a stock component.
- Do not add prototype-only labels, headings, legends, annotations, interaction explanations, platform labels, or evaluator instructions to make a design easier to review.
- Do not duplicate case requirement facts across README, reviewer HTML, and machine fixture.

## Hypotheses

- Tamagui's primitives plus `Adapt` remain sufficient for the first structural prototypes without a custom design system.
- Loading Tamagui knowledge only after structural choice reduces component-led convergence compared with component-first prompting.
- A neutral product UI without evaluator scaffolding makes weak affordances easier to detect because the prototype must stand on its own.
- Complete case briefs make Eval judgments more transferable and less dependent on hidden conversation context.
- Renderable Eval pages plus post-deploy operation catch failures that Markdown review, compilation, and static export cannot.

## Deferred

- Custom pattern/component registry.
- Additional headless/component libraries.
- MCP/component discovery integration.
- Production visual design system.
- Compiler/performance optimization beyond what the first prototype requires.
- Packaging or publishing a reusable prototype runtime package.
- Generic automatic classification of whether arbitrary visible prototype copy is user-facing; this remains a semantic review problem.

## Next

1. Close the current Pages run with fixture validation, generated catalog, deployment, and public browser smoke all passing.
2. Operate at least one native Mobile target before claiming native runtime completion.
3. Add the next Eval only when it exercises a distinct Affordance rule and starts with the complete requirement contract.
4. Use the first two or three distinct cases to compare with-Skill vs without-Skill structural decisions.

## Verification

Confirmed before the latest Eval-contract refresh:

```text
platform-independent assignment model: PASS (4/4)
TypeScript: PASS
Web Expo export: PASS
iOS Expo export: PASS
local desktop-pointer interaction: PASS
local touch-mobile interaction: PASS
known prototype-copy leakage regression: PASS
Pages deployment: PASS
deployed desktop-pointer operation: PASS
deployed touch-mobile operation: PASS
```

The Eval-contract refresh is complete when:

- every `evals/cases/*/case.json` passes mandatory requirement-field validation;
- the catalog manifest is generated from validated cases;
- the Case page renders all four requirement fields from its canonical fixture;
- the published prototype contains no known reviewer-only copy;
- the public pointer and touch prototypes remain operable after deployment.

The runtime milestone is fully complete when the validated prototype also works on at least one native Mobile target.
