# Content Composer Media + Template Real Case

## Goal

Use a real, high-complexity mobile content-composer case to test Affordance Design against the product goal of increasing image-attached publishing and improving the template-use flow, while preserving the complete current interaction complexity instead of simplifying the problem by deleting capabilities.

## Relevant Context

- Source evidence is two user-provided mobile screenshots representing the same composer state with different bottom-panel tabs active.
- Case/product wording must be anonymized. Do not use the real application name or distinctive branded template names.
- The screenshot reconstruction is a **baseline/current-state artifact**, not the optimized Skill result.
- Later optimization must start from this reconstructed state and the canonical requirement fixture.
- The screenshots reveal the current layout and two bottom-panel states directly, but do not reveal every downstream action. Missing behavior must be separated into Derived assumptions and Open evidence gaps instead of silently treated as confirmed.
- The target objective is behavioral: increase the rate at which users publish with visual content and improve template usage. It is not a visual-restyling task.

## Milestones

1. Externalize screenshot evidence into Confirmed / Derived / Open observations and create an anonymized canonical Eval brief.
2. Rebuild the complete visible current-state composer interaction without deleting or collapsing existing capabilities.
3. Add operable inferred states required to preserve current complexity: media-source tabs, selection, permission state, composer tools, and template entry/configuration, while marking unsupported assumptions as Derived.
4. Verify baseline fidelity and interaction coverage through model/browser checks and freeze the current-state reconstruction.
5. Publish the baseline case for review without exposing real application identity.
6. Run Affordance Design on the frozen case and produce a structurally different optimized prototype aimed at the stated behavioral goal.
7. Operate current vs optimized prototypes and perform a blind structural review focused on discoverability, context preservation, layer value, task interruption, and whether template usage became easier without harming direct media insertion.

## Completed

- Source screenshots inspected at their original uploaded resolution: `1290 × 2796` each.
- The two confirmed bottom-panel states are:
  - Album/media picker state;
  - All templates state.
- Optimization direction classified as `feature_optimization`: the existing capability scope remains, while interaction/discoverability/efficiency are the intended improvement target.

## Current State

Milestone 1 is active.

The reconstruction must preserve the following visible current complexity:

```text
composer header
+ title / body editing
+ draft state
+ add section/topic entry
+ composer utility toolbar
+ photo permission prompt
+ camera acquisition
+ media-selection grid
+ album / video / game-assets / all-templates tabs
+ heterogeneous template catalog
+ selection / insertion flow
```

Only Album and All templates are directly shown in the screenshots. Video, game-assets downstream contents, template configuration behavior, and several toolbar downstream states require conservative reconstruction and must remain classified as Derived/Open until more source evidence exists.

## Open Issues

- Binary screenshot files cannot currently be written to the repository through the connected GitHub text-file action. A normalized evidence document will preserve the observable source facts in-repo; the original uploaded files remain external source evidence for this initialization.
- The screenshots do not show what happens after selecting a media item, tapping a template, opening the content-type selector, using emoji/@/plus/settings, or entering video/game-material tabs.
- It is not yet confirmed whether template output inserts directly into the editor, returns as selectable media, or uses another commit boundary.
- The exact permission flow after tapping `去设置` is OS-owned and cannot be faithfully operated in a browser export; the baseline should preserve the permission warning and CTA without pretending the browser is system Settings.

## Decisions

- Use an anonymous product frame: `mobile content composer` / `内容编辑器`.
- Do not copy the real product name or distinctive real template titles.
- Keep all visible capability families; do not collapse the four bottom tabs into a simpler structure in the baseline.
- Reconstruct interaction complexity before optimizing it.
- Store source-grounded facts separately from Derived assumptions.
- Use Tamagui/Expo as the runtime so the current-state baseline and later Skill output can share the same implementation substrate without component choice determining the interaction model.
- Publish the baseline separately from the eventual optimized prototype so the source state cannot be overwritten by the solution.

## Constraints

- No image-generation work is part of this task.
- Do not use the real application identity in case/reviewer/prototype copy.
- Do not simplify the current state by removing existing media/template access paths.
- Do not present an inferred downstream behavior as screenshot-confirmed fact.
- Do not optimize layout/interaction until the baseline is frozen and verified.
- Prototype-visible content must remain authentic end-user product UI; reviewer annotations belong outside the runtime.

## Hypotheses

- The current design exposes acquisition methods (`相册 / 视频 / 游戏素材 / 全部模板`) as peer-level tabs even though the user goal may be broader than source type.
- Template discovery competes with direct media insertion inside the same transient bottom region, which may reduce template adoption or make template intent harder to form.
- A complete baseline with title/body editing, media selection, permission friction, and template configuration will expose structural costs that a static screenshot alone cannot reveal.
- The strongest optimization may depend on preserving context from the draft/body into template choice rather than merely increasing template visual prominence.

## Deferred

- Any final optimized interaction model.
- Visual redesign/brand polish.
- Production media APIs, camera, OS Settings deep-linking, actual template-generation services, upload backend, and publishing backend.
- Quantitative proof that image-attached publishing rate increased; this Eval can test structural plausibility/behavior but requires product analytics for causal metric validation.

## Next

1. Create `source-observations.md` and the canonical anonymized `case.json`.
2. Create a baseline interaction specification distinguishing Confirmed / Derived / Open behavior.
3. Implement the mobile current-state baseline with all visible controls and bottom-tab complexity preserved.
4. Add browser operation covering title/body state preservation, tab switching, media selection, template entry/configuration, and return-to-editor behavior.
5. Publish the frozen baseline.
6. Only then run the Skill's divergence/review workflow for the optimization target.

## Verification

Milestone 1 completes when:

- case text contains no real application identity;
- requirement goal explicitly includes both image-attached publishing and template-flow improvement;
- `current_state` describes the complete visible composer + lower-panel structure;
- every screenshot-grounded observation is recorded as Confirmed;
- unsupported downstream behavior is not silently promoted beyond Derived/Open.

Baseline freeze completes when:

- all visible controls/states from both screenshots exist in the runnable current-state prototype;
- the four bottom tabs are present and operable;
- album permission prompt, camera tile, media grid, selection affordances, and template catalog are preserved;
- editor state is preserved while changing bottom-panel modes;
- current complexity has not been reduced by deleting capability families;
- automated model/type/export/browser checks pass;
- reviewer-only source/assumption annotations do not appear in the product surface.
