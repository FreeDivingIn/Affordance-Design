# Content Composer Media + Template Real Case

## Goal

Use a real, high-complexity mobile content-composer case to test Affordance Design against the product goal of increasing image-attached publishing and improving the template-use flow, while preserving the complete current interaction complexity instead of simplifying the problem by deleting capabilities.

## Relevant Context

- Source evidence is two user-provided mobile screenshots representing the same composer state with different bottom-panel tabs active.
- Case/product wording is anonymized. Do not use the real application name or distinctive branded template names.
- The screenshot reconstruction is a frozen **baseline/current-state artifact**, separate from the optimized Skill result.
- The screenshots reveal the current layout and Album / All-template panel states directly, but not every downstream action. Missing behavior remains separated into Derived assumptions and Open evidence gaps.
- The target objective is behavioral: increase the rate at which users publish with visual content and improve successful template usage. This Eval can test structural friction and operability, not causal metric uplift.

## Milestones

1. Externalize screenshot evidence into Confirmed / Derived / Open observations and create an anonymized canonical Eval brief.
2. Rebuild the complete visible current-state composer interaction without deleting or collapsing existing capabilities.
3. Add operable inferred states required to preserve current complexity: media-source tabs, selection, permission state, composer tools, and template entry/configuration, while marking unsupported assumptions as Derived.
4. Verify baseline fidelity and interaction coverage through model/browser checks and freeze the current-state reconstruction.
5. Publish the baseline case for review without exposing real application identity.
6. Run Affordance Design on the frozen case and produce a structurally different optimized prototype aimed at the stated behavioral goal.
7. Operate current vs optimized prototypes and perform structural comparison focused on discoverability, context preservation, layer value, task interruption, and template-flow completion without harming direct media insertion.

## Completed

- Milestone 1 complete:
  - normalized screenshot evidence lives in `evals/cases/004-media-template-composer/source-observations.md`;
  - screenshot facts are explicitly separated into Confirmed / Derived / Open;
  - canonical anonymous requirement lives in `case.json`;
  - optimization direction is `feature_optimization`.
- Milestones 2–4 complete:
  - baseline interaction specification frozen before Skill optimization;
  - mobile baseline preserves title/body, draft state, section/topic entry, emoji/@/plus/settings, photo permission, camera, media grid, Album/Video/Game-assets/All-templates, heterogeneous templates, selection/commit, and template configuration/preview/insertion;
  - Video/Game-assets/template downstream behavior is still marked Derived rather than screenshot-confirmed;
  - `baseline-review.md` records the evidence boundary and freeze decision;
  - GitHub Actions run `33229745706` passed model tests, TypeScript, Web export, iOS export, and full mobile-touch browser operation.
- Milestone 5 complete:
  - Case 004 current-state baseline is published under the existing Eval site;
  - GitHub Pages run `33229797193` passed build, deploy, regressions for Cases 001–003, Case 004 requirement rendering, and public Case 004 baseline browser smoke.
- Milestone 6 interaction design complete before runtime mapping:
  - three structurally different candidates were evaluated;
  - “promote templates inside the same four-tab taxonomy” rejected;
  - “mix every visual source into one generic picker” rejected;
  - selected model groups the first decision by user problem state: existing material / generate from current draft / explore creative templates;
  - contextual visual suggestion is gated to a modeled natural break and supplies direct shortcuts that skip already-resolved questions;
  - broad template exploration remains available; direct draft illustration no longer requires entering the broad template catalog;
  - optimized interaction specification is frozen in `optimized-interaction-spec.md`.
- Milestone 6 runtime verification complete:
  - optimized structural review ACCEPT (`optimized-review.md`, GitHub Actions run `33229997607`);
  - optimized runtime published at Case 004 `prototype/` with deployed smoke passing; baseline retained at `baseline/`.
- Milestone 7 complete:
  - both published artifacts operated first-hand on 2026-08-29 (baseline source-taxonomy first decision; optimized problem-state entry, context-bound generation, natural-break suggestion with direct shortcuts, provisional candidates with explicit insert);
  - structural comparison recorded in `evals/cases/004-media-template-composer/comparison.md` across discoverability, context preservation, layer value, task interruption, template-flow completion, and direct-media protection;
  - metric-validation boundary recorded: structural differences are hypotheses, no image-attach or template-use uplift is claimed;
  - reviewer page now embeds both artifacts side by side and links the comparison; case README updated from "Future" to published state;
  - Pages CI run `33240288483` green (build / deploy / smoke incl. Cases 001–003 regression); public URLs verified 200 and operable.

## Current State

All seven milestones are complete. The task is closed.

The frozen baseline remains independently reviewable and must not be overwritten by the optimized artifact.

Selected optimized structure:

```text
添加配图
├─ 从已有素材添加
│  ├─ 相册
│  ├─ 视频
│  └─ 游戏素材
├─ 根据正文生成配图
│  └─ current title/body/topics already bound
└─ 浏览创意模板
   ├─ 适合当前内容
   └─ 全部模板 / heterogeneous generators
```

Contextual path at a natural break when the draft has meaningful content and no visual attachment:

```text
给这段内容配张图
[生成配图] → direct generation; do not ask acquisition intent again
[从相册选] → direct Album; do not ask source again
```

The optimized runtime is implemented in `prototypes/media-template-composer/optimized-runtime/` with model tests and mobile browser assertions. Its CI workflow is currently validating model → TypeScript → Web/iOS export → mobile operation.

## Open Issues

- The source screenshots still do not establish exact behavior for `草稿`, `内容 ▾`, actual media commit semantics, Video/Game-assets contents, template APIs/output object type, publish/upload, or OS Settings. These remain Open/Derived in this Eval.
- Actual native iOS/Android device operation is not available in the current connected environment; Web mobile-touch + iOS export are the current executable evidence.
- The optimized contextual recommendation uses a deterministic prototype definition of “natural break / changed enough” to make the rule testable. Production thresholds remain a product-research/analytics question rather than a confirmed fact.
- Structural improvements cannot prove image-attached publishing uplift or template-use uplift; production analytics/A-B validation remains required.

## Decisions

- Use an anonymous product frame; do not copy real product identity or distinctive branded template titles.
- Preserve the frozen baseline unchanged after optimization begins.
- Keep all existing capability families reachable in the optimized experience.
- Do not make direct media paths worse solely to increase template prominence.
- The generic visual entry resolves user problem state before source/product taxonomy.
- `根据正文生成配图` is a specific command-like path and must not open broad template exploration first.
- Existing title/body/topics are context and should be subtracted from downstream template/generation questions when legitimately available.
- Template generation and draft-image generation may compute provisional results but require explicit user insertion before commit.
- A recommendation to add a visual may surface only when it is nonblocking and the user is not modeled as actively composing.
- Shortcut affordances may skip layers because their labels already answer those layers’ questions.

## Constraints

- No image-generation tool or real visual-generation API is part of this task; candidate visuals are structural prototype state.
- Do not use real application identity in case/reviewer/prototype copy.
- Do not delete Album, Video, Game assets, or broad template exploration to make the optimized problem easier.
- Do not present inferred downstream behavior as screenshot-confirmed fact.
- Prototype-visible content must remain authentic end-user product UI; Eval/reviewer language stays outside.
- Runtime/component limitations must not redefine the frozen optimized interaction semantics.

## Hypotheses

- The root structural friction is partly caused by exposing acquisition methods (`相册 / 视频 / 游戏素材 / 全部模板`) as peers before resolving whether the user has a visual, needs a draft-derived visual, or wants exploration.
- Direct draft-to-image generation can lower template-like creation friction because the draft already carries the target and semantic content.
- Contextual shortcuts can support image attachment without blocking composition when they appear only at a natural break and remain dismissible.
- Separating broad template exploration from narrow draft illustration will make template completion easier to reason about even if the number of available templates stays high.

## Deferred

- Production visual/brand polish.
- Real camera/photo APIs and OS Settings deep-linking.
- Actual template/generation model APIs.
- Upload/publish backend.
- Quantitative metric validation.
- Generic shared framework extraction across Eval prototype runtimes.

## Next

Task complete. Follow-up work lives outside this task:

1. Production metric validation (analytics / A-B) for the structural hypotheses.
2. Open questions carried in `optimized-review.md` and the comparison record.

## Verification

Frozen baseline checkpoint:

```text
source evidence classification: PASS
anonymous canonical case fixture: PASS
baseline model tests: PASS (4/4)
baseline TypeScript: PASS
baseline Web Expo export: PASS
baseline iOS Expo export: PASS
baseline mobile-touch operation: PASS (4/4)
public Case 004 requirement rendering: PASS
public Case 004 baseline operation: PASS
Cases 001–003 public regression smoke: PASS
```

Milestone 7 checkpoint:

```text
first-hand operation of both deployed artifacts: PASS (2026-08-29)
structural comparison record published: PASS
reviewer page side-by-side comparison: PASS
case README published state: PASS
metric-validation boundary recorded: PASS
eval case validation: PASS (4/4)
Pages CI run 33240288483 (build/deploy/smoke): PASS
public comparison.md / baseline / prototype URLs: PASS (200)
Cases 001–003 regression smoke: PASS (in CI smoke job)
```

Milestone 6 completes when the optimized runtime verifies:

- `添加配图` resolves exactly three problem-state choices before source taxonomy;
- Existing-media branch preserves Album, Video, Game assets and Album permission/camera/grid/selection/commit behavior;
- draft generation reuses current draft context and never requires re-entering the draft;
- generated candidates remain provisional until explicit insertion;
- creative-template exploration preserves a heterogeneous catalog;
- template configuration asks only genuinely unresolved inputs in represented cases;
- current draft text remains user-owned and unchanged by visual generation;
- contextual suggestion is absent during active body focus and may appear after a modeled natural break;
- contextual Album/generation shortcuts skip already-resolved layers;
- dismissal does not immediately resurface the same suggestion without meaningful state change;
- adjacent topic/emoji/mention/settings functions remain operable;
- no reviewer-only content leaks into product UI;
- model/type/export/mobile browser checks pass.

Milestone 7 completes only after the published baseline and optimized prototype are both operated and their structural differences are reviewed without claiming unmeasured metric uplift.
