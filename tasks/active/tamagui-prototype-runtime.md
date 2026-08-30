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
9. Add a second runnable Eval for the explicit-command affordance contract.
10. Add a third runnable Eval for multiple access paths: different invocation paths may skip questions already answered by context while preserving one conceptual action and compatible resulting state.

## Completed

- Milestones 1–5 are complete for Case 001 Bulk Assignment.
- Milestone 6 is complete for pointer Web and touch/mobile Web.
- Milestone 7 publishing infrastructure is operational at `https://freedivingin.github.io/Affordance-Design/` and requires post-deploy browser operation.
- Milestone 8 is complete:
  - every case requires `requirement_goal`, `background`, `current_state`, and `optimization_direction`;
  - `optimization_direction` accepts only `feature_creation`, `feature_upgrade`, or `feature_optimization`; their product meanings live only in `product-spec.md`;
  - `case.json` is the canonical requirement/expectation fixture;
  - reviewer pages and the Eval catalog derive case facts from canonical fixtures rather than duplicating requirement prose;
  - the published catalog manifest is generated from validated case directories;
  - runnable prototypes render only UI the represented end user would actually see;
  - reviewer/developer/prototype explanations remain outside the runtime;
  - `AVG-023 — Reviewer context leaks into product prototype — ERROR` enforces this boundary in Skill review.
- Milestone 9 is complete as Case 002 `Merge Command Contract`:
  - complete canonical requirement fixture classified as `feature_optimization`;
  - semantic interaction specification frozen before Tamagui mapping;
  - explicit Merge proceeds only to the unresolved primary-contact decision;
  - Export, Add tags, Find duplicates, and AI cleanup do not appear after Merge;
  - selecting the primary record commits directly and exposes Undo;
  - dismissing the pointer surface preserves both selected contacts;
  - pointer and touch/mobile Web preserve one merge state model;
  - platform-independent tests, TypeScript, Web export, iOS export, and local pointer/touch browser operation passed in workflow run `33227904340`;
  - Pages build, deploy, Case 001 regression smoke, and public Case 002 pointer/touch smoke passed in workflow run `33227940423`.

- Milestone 10 is complete as Case 003 `Move Access Paths`:
  - generic `Move` asks for destination because it is unresolved; the drag path uses the drop-supplied destination directly;
  - both paths remain one conceptual action with shared result and recovery semantics;
  - model tests, TypeScript, Web/iOS export, local pointer/touch operation, and public smoke passed.
- Case 004 `Media + Template Composer` is complete through the baseline-vs-optimized structural comparison: frozen current-state baseline, Skill-optimized runtime, side-by-side reviewer page, and `evals/cases/004-media-template-composer/comparison.md`.
- The first with-Skill vs without-Skill structural comparison is complete (`evals/comparisons/with-vs-without-skill-001.md`, run 001, 2026-08-29):
  - four independent baselines, each blind-scored against its case.json assertions by a separate judge;
  - baseline failures concentrated where the Skill carries explicit guards (confirmation creep under platform pressure in 001; taxonomy-first vs problem-state-first structure in 004);
  - cases 002/003 scored perfect rubrics from model prior, motivating rawer briefs and multi-run follow-ups;
  - evidence limits (n=1 per case, same model family, spec-level only) are recorded in the comparison document.
- The second comparison run with raw briefs is complete (`evals/comparisons/with-vs-without-skill-002.md`, run 002, 2026-08-30):
  - raw briefs authored by independent brief-author agents from `requirement`+`input` only, verified by an independent leak-check agent (3 of 4 briefs revised once for resolution-leaking sentences);
  - n=3 baselines per case (12 total), each blind-scored by a separate judge: 156 PASS / 4 PARTIAL / 2 FAIL across 162 interaction assertions;
  - run-001's 001 F4 failure did not recur (single-run event, not a stable prior failure mode); case 002's suggested-default + separate-commit divergence replicated 3/3 and is now the suite's most stable with/without-Skill structural difference;
  - case 003's asymmetry was independently derived by 3/3 baselines — the situation is self-describing even raw, so the case has low discriminating power at spec level regardless of brief format;
  - case 004 baselines converged toward the Skill's intent-first direction; leak-free brief authorship is in direct tension with "preserve X" constraints (004 E1/F2 scores annotated as method artifact);
  - evidence limits (n=3, same model family at three points, coordinator prompt framing, spec-level only) are recorded in the comparison document.

## Current State

Four structurally distinct runnable Evals are now public:

```text
Case 001 — Bulk Assignment
  tests resolved target context + narrow command execution

Case 002 — Merge Command Contract
  tests whether an explicit command is improperly broadened into capability space

Case 003 — Move Access Paths
  tests whether multiple invocation paths skip already-resolved questions

Case 004 — Media + Template Composer
  tests a real-case complex mobile composer: frozen baseline vs Skill-optimized structure
```

The Eval information boundary remains:

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

All ten milestones are complete. The first with-Skill vs without-Skill comparison (run 001) is published at `evals/comparisons/with-vs-without-skill-001.md`.

## Open Issues

- Keyboard/focus behavior is only partially reviewed.
- Long-list touch gesture quality and production accessibility remain unverified.
- Prototype-surface purity remains a semantic design judgment; generic keyword detection must not replace Review.
- No evidence justifies adding another component/runtime system or a shared prototype framework yet.

## Decisions

- Tamagui remains the only initial prototype runtime.
- Do not browse or enumerate Tamagui components during design divergence.
- Component names are implementation vocabulary, not interaction-design vocabulary.
- Web and Mobile presentations may differ after semantics are fixed; task/scope/state/recovery semantics remain shared unless context justifies a different model.
- Every Eval case starts with a complete product brief and uses `case.json` as the single case-level source of requirement/expected-behavior facts.
- Reviewer context and product runtime are separate artifacts.
- Every visible prototype element/string must be justifiable as real user-facing product UI for the represented state.
- Build/export/deploy success is insufficient; public prototypes must also pass browser operation.
- Different access paths to one conceptual action are allowed to have different step counts when one path has already supplied information the other path still lacks.
- Access-path consistency means compatible intent, target/effect semantics, and resulting state; it does not require identical intermediate UI.

## Constraints

- Do not let Tamagui/component availability generate the interaction concept.
- Do not add visual polish before structural validation.
- Do not add another UI library without evidence meeting `engineering-contract.md` re-evaluation conditions.
- Runtime failures should first change implementation/configuration, not a still-valid upstream interaction model.
- Do not add prototype-only labels, headings, legends, annotations, interaction explanations, platform labels, or evaluator instructions.
- Do not duplicate case requirement facts across README, reviewer HTML, catalog, and machine fixture.
- Case 003 must model two access paths to the same Move action without forcing identical steps or allowing incompatible outcomes.

## Hypotheses

- Tamagui primitives plus `Adapt` remain sufficient for the first structural prototypes without a custom design system.
- Loading runtime/component knowledge only after structural choice reduces component-led convergence.
- Removing evaluator scaffolding makes weak affordances easier to detect because the prototype must stand on authentic product UI alone.
- Complete requirement briefs improve Eval transferability and reduce dependence on hidden conversation context.
- Three structurally distinct Evals will be sufficient to begin a meaningful with-Skill vs without-Skill comparison without turning the suite into a component showcase.

## Deferred

- Custom pattern/component registry.
- Additional headless/component libraries.
- MCP/component discovery integration.
- Production visual design system.
- Reusable prototype-runtime packaging.
- Generic automatic classification of arbitrary prototype copy as user-facing vs reviewer-facing.

## Next

Follow-up candidates from comparison runs 001 and 002 (each enters its own alignment cycle when prioritized):

1. At least one different model family for baselines and judges — the largest remaining confound in both runs (n=3 same-family baselines now done).
2. Case 003 fixture hardening: the situation is self-describing even in raw-brief form (3/3 run-002 baselines derived the asymmetry); the case has low discriminating power at spec level regardless of brief format.
3. Case 004 fixture hardening: split the brief into leak-checkable world description vs explicitly declared constraints ("preserve X" assertions are resolution-leaking by nature, per run-002 finding 4); make F1 self-contained.
4. A suite addition targeting derivation-from-opacity: a case whose structural asymmetry is not observable in the situation description, so the raw-brief method can actually stress the Skill's decomposition step.
5. Runnable baseline prototypes for behavioral comparison, if a third spec-level run adds new signal.

## Verification

Current checkpoint:

```text
Case 001 assignment model tests: PASS (4/4)
Case 001 TypeScript/Web/iOS export: PASS
Case 001 local pointer/touch operation: PASS
Case 001 public pointer/touch smoke: PASS

Case 002 merge model tests: PASS (4/4)
Case 002 TypeScript/Web/iOS export: PASS
Case 002 local pointer/touch operation: PASS
Case 002 public requirement rendering: PASS
Case 002 public pointer/touch smoke: PASS

mandatory Eval requirement validation: PASS
catalog manifest generation: PASS
Pages build/deploy: PASS
Case 001 regression after Case 002 publication: PASS
```

Milestone 10 completes when:

- Case 003 has a complete canonical requirement fixture;
- its interaction specification is frozen before runtime mapping;
- generic `Move` and drag-to-depot remain one conceptual action with compatible effect/result;
- the generic path asks for destination because it is unresolved;
- the drag path does not ask for destination again because the drop target supplied it;
- recovery behavior is consistent across both paths;
- pointer/touch runtime behavior is operable without reviewer-only visible content;
- local model/type/export/browser checks pass;
- published requirement and prototype smoke checks pass.
