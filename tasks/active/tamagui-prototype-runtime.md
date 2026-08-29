# Tamagui Prototype Runtime

## Goal

Make Affordance Design produce runnable, block-like structural prototypes for Web and Mobile using Tamagui as the single initial runtime, while preserving interaction-design divergence before component mapping and keeping reviewer context outside the user-facing prototype.

## Relevant Context

- The Skill's default high-value artifact is a runnable structural prototype, not polished UI design.
- Interaction semantics must be designed before Tamagui component lookup or mapping.
- Tamagui is the single initial runtime; early multi-library abstraction is out of scope.
- Every Eval case must be independently reviewable without hidden conversation context.
- Eval/reviewer information and user-facing prototype content are separate surfaces.

## Milestones

1. Understand the selected Tamagui runtime deeply enough for Web/Mobile structural prototyping.
2. Establish product output and engineering sequencing contracts.
3. Make the Skill diverge and review structurally before Tamagui mapping.
4. Add evals that catch component-first convergence.
5. Build the first runnable prototype from a pre-selected interaction model.
6. Run cross-platform interaction benchmarks and verify runtime mapping does not redefine semantics.
7. Publish runnable Eval cases through GitHub Pages for human review.
8. Formalize complete Eval requirement context and the user-only prototype-surface boundary.
9. Add a second runnable Eval that exercises a distinct Affordance rule: an explicit command must not expand into an unrelated capability catalog.

## Completed

- Milestones 1–5 are complete for Case 001 Bulk Assignment.
- Milestone 6 is complete for pointer Web and touch/mobile Web; native simulator/physical-device operation remains outstanding.
- Milestone 7 publishing infrastructure is operational at `https://freedivingin.github.io/Affordance-Design/` and requires post-deploy browser operation.
- Milestone 8 is complete:
  - every case requires `requirement_goal`, `background`, `current_state`, and `optimization_direction`;
  - `optimization_direction` accepts only `feature_creation`, `feature_upgrade`, or `feature_optimization`; their product meanings live only in `product-spec.md`;
  - `case.json` is the canonical requirement/expectation fixture;
  - reviewer pages and the Eval catalog derive case facts from canonical fixtures rather than duplicating requirement prose;
  - the published catalog manifest is generated from validated case directories;
  - runnable prototypes render only UI the represented end user would actually see;
  - reviewer/developer/prototype explanations remain outside the runtime;
  - `AVG-023 — Reviewer context leaks into product prototype — ERROR` enforces this boundary in Skill review;
  - known Case 001 reviewer-copy leaks are covered by local and deployed browser regression checks.
- Case 001 was revised to remove prototype-only explanatory content and records its complete product brief as `feature_optimization`.
- Final Pages run `33226663317` passed build, deploy, and public browser smoke after the Eval-contract refresh.

## Current State

The first interaction remains frozen independently of Tamagui and is implemented as a universal block prototype.

The Eval information boundary is now:

```text
product-spec.md
→ meanings of feature_creation / feature_upgrade / feature_optimization

case.json
→ canonical requirement + expected/forbidden behavior for one Eval case
→ reviewer case page + generated catalog

interaction spec + runtime
→ runnable product prototype
→ user-visible product UI only
```

The latest public validation confirms:

- canonical case fixtures pass required-field validation;
- the catalog manifest is generated from validated cases;
- the public catalog renders the manifest case set;
- the Case page renders goal, background, current state, and optimization direction from `case.json`;
- the public desktop-pointer and touch-mobile prototypes remain operable;
- the known reviewer-only strings do not appear in the product prototype;
- no browser runtime errors were observed by the smoke test.

Milestone 9 is now the active unblocked work. Its source benchmark is Skill Eval 2: a contact-management app where invoking the explicit `Merge contacts` command incorrectly opens a broad menu containing unrelated actions. The new runnable case must preserve the command's narrow semantics and proceed only through genuinely unresolved merge-specific decisions.

## Open Issues

- Actual native Sheet interaction still needs simulator or physical-device evidence. The current connected environment cannot operate an iOS/Android simulator or physical device, so this remains an external validation blocker rather than a reason to stop other unblocked milestones.
- Keyboard/focus behavior is only partially reviewed; pointer Escape dismissal is covered, not the full accessibility path.
- Long-list touch gesture quality and production accessibility remain unverified.
- Prototype-surface purity is a semantic design judgment; generic keyword detection must not replace Review of whether each visible element genuinely belongs to the end-user product.
- No evidence justifies adding another component/runtime system or abstraction layer.

## Decisions

- Tamagui remains the only initial prototype runtime.
- Do not browse or enumerate Tamagui components during design divergence.
- Component names are implementation vocabulary, not interaction-design vocabulary.
- Web and Mobile presentations may differ after semantics are fixed; task/scope/state/recovery semantics remain shared unless context justifies a different model.
- Every Eval case starts with a complete product brief: goal, background, current state, and one of the three optimization directions.
- `product-spec.md` owns the meanings of the optimization directions.
- `case.json` is the single case-level source of requirement and expected-behavior facts.
- Reviewer context and product runtime are separate artifacts.
- Every visible prototype element/string must be justifiable as real user-facing product UI for the represented state.
- Non-rendered verification instrumentation is allowed when it does not alter visible product behavior.
- Build/export/deploy success is insufficient; public prototypes must also pass browser operation.
- Milestone 9 must begin from a contact-merge interaction specification that contains no Tamagui component vocabulary. Runtime mapping happens only after that specification and structural review criteria are fixed.

## Constraints

- Do not let Tamagui/component availability generate the interaction concept.
- Do not add visual polish before structural validation.
- Do not add another UI library without evidence meeting `engineering-contract.md` re-evaluation conditions.
- Runtime failures should first change implementation/configuration, not a still-valid upstream interaction model.
- Do not add prototype-only labels, headings, legends, annotations, interaction explanations, platform labels, or evaluator instructions.
- Do not duplicate case requirement facts across README, reviewer HTML, catalog, and machine fixture.
- Case 002 must exercise command-affordance semantics rather than becoming another generic component showcase.

## Hypotheses

- Tamagui primitives plus `Adapt` remain sufficient for the first structural prototypes without a custom design system.
- Loading runtime/component knowledge only after structural choice reduces component-led convergence.
- Removing evaluator scaffolding makes weak affordances easier to detect because the prototype must stand on authentic product UI alone.
- Complete requirement briefs improve Eval transferability and reduce dependence on hidden conversation context.
- A second structurally distinct case will reveal whether the current runtime organization can support multiple Eval prototypes without premature abstraction.

## Deferred

- Custom pattern/component registry.
- Additional headless/component libraries.
- MCP/component discovery integration.
- Production visual design system.
- Reusable prototype-runtime packaging.
- Generic automatic classification of arbitrary prototype copy as user-facing vs reviewer-facing.

## Next

1. Define Case 002's complete requirement fixture and freeze its merge-specific interaction model before implementation.
2. Implement and test a runnable Web/touch structural prototype using Tamagui only after the interaction model is fixed.
3. Publish Case 002 through the existing Eval catalog and Pages pipeline, then operate the public prototype.
4. Operate at least one native Mobile target when an environment with simulator/physical-device access becomes available.
5. After two or three distinct cases exist, compare with-Skill vs without-Skill structural decisions.

## Verification

Current verified checkpoint before Milestone 9:

```text
platform-independent assignment model: PASS (4/4)
TypeScript: PASS
Web Expo export: PASS
iOS Expo export: PASS
local desktop-pointer interaction: PASS
local touch/mobile interaction: PASS
known prototype-copy leakage regression: PASS
mandatory Eval requirement fixture validation: PASS
catalog manifest generation: PASS
Pages build: PASS
Pages deploy: PASS
public catalog/manifest consistency: PASS
public Case requirement rendering: PASS
public desktop-pointer prototype operation: PASS
public touch-mobile prototype operation: PASS
```

Milestone 9 completes when:

- Case 002 has a complete canonical requirement fixture;
- its interaction specification is frozen before runtime mapping and contains no Tamagui component vocabulary;
- the runnable prototype keeps `Merge contacts` semantically narrow and exposes only merge-specific unresolved decisions;
- unrelated capabilities do not appear after invoking Merge;
- pointer and touch variants preserve the same merge semantics;
- prototype-visible content is authentic product UI only;
- automated state-model/browser checks pass;
- the published Case 002 requirement page and public prototype pass post-deploy smoke verification.

The remaining runtime milestone closes only after at least one native Mobile target is operated successfully.