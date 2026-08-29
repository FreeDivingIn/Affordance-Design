# Media + Template Composer — Optimized Structural Review

## Review question

Does the Skill result improve the structural path to visual attachment and template completion while preserving the current product's media/template capabilities, or did it merely reorganize/beautify the same source taxonomy?

## Evidence reviewed

- canonical case: `evals/cases/004-media-template-composer/case.json`;
- normalized source evidence: `source-observations.md`;
- frozen current-state specification and runnable baseline;
- `optimized-interaction-spec.md`, written before optimized runtime mapping;
- optimized platform-independent state model;
- optimized mobile runtime;
- model and browser assertions;
- GitHub Actions run `33229997607`.

## Structural change under review

Baseline first decision:

```text
相册 | 视频 | 游戏素材 | 全部模板
```

Optimized generic visual entry:

```text
添加配图
├─ 从已有素材添加
├─ 根据正文生成配图
└─ 浏览创意模板
```

Existing media then resolves source:

```text
相册 | 视频 | 游戏素材
```

The optimized structure therefore changes the first question from **product/source taxonomy** to **user problem state**.

## Findings

### R1 — Current capability scope is preserved

**PASS**

The optimized runtime still exposes:

- Album;
- Video;
- Game assets;
- broad creative-template exploration;
- camera acquisition;
- limited-photo-access friction and settings path;
- direct media selection/commit;
- heterogeneous template generators;
- title/body/topic/emoji/mention/settings composer context.

The optimization did not obtain simplicity by deleting the difficult parts of the baseline.

### R2 — First layer resolves a real distinction

**PASS**

`添加配图` asks whether the user:

1. already has material;
2. needs a supporting visual from the current draft;
3. intentionally wants to explore template possibilities.

These paths begin with different known information and require different next questions. The layer therefore buys decision value rather than acting as decorative navigation.

### R3 — Direct draft illustration stays semantically narrow

**PASS**

`根据正文生成配图` does not open the broad template catalog.

Known context at invocation:

```yaml
target: current draft
intent: create a supporting visual
available_input: current title/body/topics
```

The flow reuses that context, generates provisional candidates, and asks the user only for optional refinement plus candidate choice.

### R4 — Broad template exploration remains intentionally broad

**PASS**

Users who choose `浏览创意模板` enter a capability space where heterogeneity is appropriate.

The catalog preserves entertainment/generator-style template families instead of pretending all templates are one narrow task.

A `文字配图` alias may still be discoverable in the template context, but it resolves to the same direct draft-generation semantics instead of creating a second incompatible path.

### R5 — Existing-media sources move downstream without disappearing

**PASS**

Album / Video / Game assets are now choices **after** the user has selected `从已有素材添加`.

Within that intent, source type is a legitimate next distinction. Album still owns its permission, camera, grid, and selection behavior.

### R6 — User-authored draft remains protected

**PASS**

Generated visuals are ADD behavior.

Browser and model tests verify that draft generation/template insertion adds visual attachments without rewriting title/body.

Generated candidate/preview state is provisional until explicit insertion.

### R7 — Contextual suggestion is gated and nonblocking

**PASS within the prototype's explicit model; production threshold remains Open**

The suggestion is absent while body input is focused. It may appear after a modeled natural break when:

- body contains enough meaningful content;
- no visual attachment exists;
- no visual flow is already open.

Dismissal records the draft state and blocks immediate resurfacing. A materially changed draft may become eligible again.

The exact production definition of natural break / materially changed content is not claimed to be validated by this prototype.

### R8 — Shortcut paths correctly skip resolved questions

**PASS**

From the contextual suggestion:

- `从相册选` opens Album directly; it does not first ask `已有素材 / 生成 / 模板` and then `相册 / 视频 / 游戏素材`;
- `生成配图` opens current-draft generation directly; it does not ask the acquisition-intent question again.

The access paths have different step counts because the shortcuts carry more expressed intent.

### R9 — Template configuration subtracts known context

**PASS in represented template cases**

A template whose first preview can be derived from the current draft can generate without a duplicate text field.

Templates that still require an object/scope expose an additional input. This implements:

```text
required template inputs
− current title/body/topics already known
= questions still unresolved
```

The prototype does not claim every real template can be classified this way without real template schemas.

## Anti-average lint review

### AVG-001 — Internal taxonomy exposed

**PASS**

Root visual choices are user problem states; source taxonomy appears only inside the already-chosen existing-material path.

### AVG-002 — Resolved context re-asked

**PASS**

Draft-generation and represented template flows consume current draft context directly.

### AVG-003 — Narrow command expands into broad catalog

**PASS**

`根据正文生成配图` never requires broad template browsing.

### AVG-004 — Layer buys no value

**PASS**

The generic launcher resolves a required acquisition-intent distinction. Contextual shortcuts skip it when their affordance has already answered that distinction.

### AVG-005 — Grouping only by output object

**PASS**

Existing media, draft generation, and creative template exploration are not grouped as equivalent simply because all can ultimately add a visual.

### AVG-008 — Fewer elements treated as simplicity

**PASS**

The solution does not remove source/template capability breadth; it changes when distinctions are asked.

### AVG-009 — Multiple access paths forced into identical steps

**PASS**

Direct suggestion shortcuts intentionally skip resolved layers while converging on compatible downstream state.

### AVG-012 — User-owned value silently replaced

**PASS**

Visual generation never replaces user-authored title/body.

### AVG-015 / AVG-016 — Cross-context or active-task intervention

**PASS under modeled gate**

Suggestion requires local draft context and is suppressed during active body focus.

### AVG-023 — Reviewer context leaks into product prototype

**PASS in local runtime review**

No Eval, baseline/optimized, source-evidence, reviewer, or benchmark explanation is rendered inside the product runtime.

## Automated verification

GitHub Actions run `33229997607` passed:

```text
optimized structural model tests: PASS (4/4)
TypeScript: PASS
Web Expo export: PASS
iOS Expo export: PASS
optimized mobile-touch operation: PASS (8/8)
```

Browser operation verifies:

1. generic Add visual has exactly the three problem-state choices before source taxonomy;
2. Existing-media path retains Album / Video / Game assets and direct-media complexity;
3. draft generation reuses the current draft and commits only after candidate selection;
4. broad template exploration remains available while Text-image resolves to direct generation;
5. a represented template with enough draft context does not ask duplicate input before preview;
6. contextual suggestion waits until blur/natural-break state and its shortcuts skip resolved layers;
7. dismissal does not immediately resurface after only a small draft change;
8. topic / emoji / mention / settings remain operable after restructuring.

## Review decision

**ACCEPT for publication as the Skill output for this Eval.**

No current Review finding requires reverting to the four peer source tabs or changing the frozen interaction model.

The design remains a structural hypothesis about behavior. It is not evidence that the real product metric has already improved.

## Remaining Open questions

- whether users understand the three problem-state labels without research;
- whether the generic `添加配图` layer adds too much cost for users who almost always choose Album;
- whether contextual shortcuts should be visible by default, triggered by semantic analysis, or triggered by another explicit state in the production composer;
- which real templates can safely use draft context without additional questions;
- what qualifies as enough content or enough change for recommendation generation/resurfacing;
- how generated visual candidates should be visually evaluated in the production system;
- native keyboard/focus/Sheet behavior on physical devices;
- actual causal impact on image-attached publishing and template completion.
