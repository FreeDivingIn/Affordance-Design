# Media + Template Composer — Optimized Interaction Specification

This document is the Affordance Design result for Case 004. It is downstream of the frozen current-state baseline and does not use runtime component vocabulary.

## Problem frame

```yaml
person: mobile user actively composing a text-first post
current_situation: title/body draft already exists or is being created; visual content may still be absent
primary_task: finish a publishable post
business_goal:
  - increase image-attached publishing rate
  - improve successful template usage
desired_outcome: adding a relevant visual feels like a continuation of composing, not a detour into a source/tool catalog
current_friction:
  - direct media and generative/template capabilities are exposed as peer source tabs
  - a specific high-value need, "make an image for this draft", is buried inside the broad template catalog
  - the template catalog mixes functional and entertainment generators without first resolving user intent
  - limited-photo permission friction dominates the panel whenever Album is active even if the user does not need device photos
critical_decision: does the user already have the visual they want, want the system to make a visual from the current draft, or intentionally want to explore a broader template capability space?
```

## Interaction state already known

When the user is composing, the product may already know:

```yaml
current_object: current draft
entered_context:
  title: optional
  body: optional
  topics: optional
committed_visuals: existing attachments
active_edit_state: typing / selection / natural break
```

The optimized structure must reuse this context rather than making template flows begin from an empty tool state.

## Structural diagnosis

### D1 — peer tabs expose acquisition taxonomy before user intent

Current peer tabs:

```text
相册 / 视频 / 游戏素材 / 全部模板
```

The first three are ways to obtain **existing material**. The fourth is a broader **creation/exploration capability space**.

They do not answer the same user question, so making them peer-level choices forces users to translate a problem state into product taxonomy.

Relevant Skill failures:

- AVG-001 — internal/product taxonomy exposed as user choice;
- AVG-005 — grouping by eventual visual output despite different starting intent.

### D2 — `文字配图` is semantically narrower than `全部模板`

A user who wants a picture for the text they are currently writing has already expressed:

```text
target = current draft
intent = create supporting visual
```

Sending that user through `全部模板` makes a specific command-like need pass through an exploratory catalog. The catalog is useful for intentional exploration, but it should not be mandatory for the narrower job.

### D3 — current draft context is underused

Title/body/topic state can reduce template input. Asking the user to restate the same content after entering a template violates the Skill's resolved-context rule.

### D4 — permission friction belongs to the existing-photo path

The limited-photo warning is relevant when the user chooses device photos. It should not occupy attention when the user is trying to generate a visual or browse templates.

### D5 — increasing visual adoption can justify a proactive entry, but not interruption

The business/user quality goal supports surfacing a contextual visual suggestion when:

```text
- draft has enough content to generate a meaningful visual;
- no visual attachment exists yet;
- the user is at a natural break rather than actively typing/selecting;
- the suggestion is non-blocking and dismissible.
```

Mere inactivity is not sufficient.

## Divergence

### Candidate A — keep four source tabs, visually promote Templates

```yaml
assumption: low template usage is mainly a visibility problem
interaction_model: preserve current tabs; make All templates more prominent and place Text image first
advantage: minimal change
failure_mode:
  - retains source-taxonomy decision before intent
  - still routes a narrow "make a picture for this draft" need through capability browsing
  - risks optimizing prominence rather than workflow
```

**Rejected.** It does not resolve the structural mismatch.

### Candidate B — replace all sources with a single generic visual picker

```yaml
assumption: fewer visible choices always reduce complexity
interaction_model: one Add visual entry opens one mixed grid of photos, videos, game assets, and templates
advantage: fewer top-level controls
failure_mode:
  - hides materially different acquisition intents in one mixed result set
  - increases scanning cost
  - destroys direct source-specific behaviors such as camera/photo permission
```

**Rejected.** This is AVG-008 style simplification by element count.

### Candidate C — problem-state launcher with context-aware shortcuts

```yaml
assumption: the first decision should reflect whether the user already has a visual, needs a visual from the current draft, or wants to explore creative templates
interaction_model:
  Add visual
  → Existing media
  → Generate from draft
  → Explore templates
advantage:
  - preserves all current capability families
  - separates narrow command from broad capability space
  - lets current draft remove repeated input
  - scopes photo permission friction to the path where it matters
  - supports a non-blocking contextual shortcut for image-attached-rate goal
failure_mode:
  - adds a launcher layer, so each branch must resolve a real distinction and remain fast
  - if labels are vague, launcher becomes another internal taxonomy
```

**Selected.** The first layer resolves a real user-state distinction and each branch has different unresolved information.

## Selected structural model

### Primary entry — `添加配图`

The generic circular plus is not the main discoverability surface for the visual-content goal.

The composer exposes a clear visual-content entry:

```text
添加配图
```

This is a capability-space entry because the user has not yet specified how the visual should be obtained.

Opening it resolves the first required question:

```yaml
unresolved_before: how should the visual be obtained?
resolved_here:
  - use existing material
  - generate supporting image from current draft
  - explore creative templates
why_required: each path begins with different known context and requires different downstream questions
```

### Branch 1 — `从已有素材添加`

This path means:

```text
user already has or knows the source material they want
```

Next structure:

```text
已有素材
  相册 | 视频 | 游戏素材
```

Source tabs remain, but only **after** the user has already chosen the `existing material` problem state. Within that narrower intent, source type is a legitimate distinction.

Album preserves:

- limited-photo permission message;
- `去设置`;
- camera tile;
- device-photo grid;
- selection order;
- explicit Add commit.

Video preserves device-video selection.

Game assets preserves its existing material catalog.

### Branch 2 — `根据正文生成配图`

This is a specific command-like path, not template browsing.

Known at invocation:

```yaml
target: current draft
intent: create a supporting image
available_context:
  title: current title
  body: current body
  topics: current topics
```

The flow must not ask the user to re-enter the draft.

Default flow:

```text
根据正文生成配图
→ use current draft immediately
→ generate 2–3 provisional visual candidates
→ user may refine optional emphasis/style instruction
→ choose candidate
→ 插入正文
```

If the draft has too little semantic content to generate a useful visual, the flow may ask one new question such as `你想表达什么？`; it must not fabricate meaning.

Generated visuals remain system-provisional until explicit insertion.

### Branch 3 — `浏览创意模板`

This is intentionally a capability-space entry.

It may expose a broad catalog because the user chose exploration.

First catalog structure:

```text
适合当前内容
全部模板
```

`适合当前内容` may use title/body/topics to rank or prefill templates, but recommendations remain optional and must not replace the user's draft.

The catalog preserves the current heterogeneous template families:

```text
卡片生成器
随机装备
身份卡
角色关系
今日运势
人生预测
...
```

`文字配图` is removed from this broad catalog as the mandatory path for draft illustration because it now has a direct semantic home under `根据正文生成配图`.

It may still appear as a search synonym/related capability, but invoking it must resolve to the same direct generation semantics rather than a second incompatible flow.

## Contextual image suggestion

To support image-attached publishing without interrupting active composition:

Eligibility:

```yaml
body_has_meaningful_content: true
visual_attachment_count: 0
active_typing_or_selection: false
suggestion_previously_dismissed_without_state_change: false
```

At a natural break, show a small local suggestion near the composer tools:

```text
给这段内容配张图
[生成配图] [从相册选]
```

Semantics:

- `生成配图` enters Branch 2 with draft context already bound;
- `从相册选` skips the `Existing media` source chooser because the shortcut already selected Album;
- dismissing does not alter the draft;
- the same suggestion does not reappear merely because time passed;
- it may be reconsidered only after draft content changes enough to make the previous recommendation stale.

This is an allowed multiple-access-path optimization: the shortcut skips questions its label already answered.

## Template configuration rule

For each template:

```text
required template inputs
− title/body/topics already known
= questions that still need to be asked
```

Examples:

- a text-summary card may require no additional text input and can go directly to preview;
- an identity card may require a person/character name if none can be inferred safely;
- a random-loadout template may require only a game/mode scope if that scope is not already known;
- optional decorative controls should not block first preview generation.

## Ownership and mutation

Visual generation is ADD behavior relative to the text draft.

```yaml
may_compute: yes after deliberate generation command; optional recommendation ranking may compute proactively
may_surface: generated candidates only in the relevant local generation/template context
may_commit: no until user selects and inserts
```

Title/body/topics remain user-owned and cannot be rewritten by visual generation.

## Interaction weight

### Existing media

Low-to-medium weight. Keep local to the composer in a transient panel.

### Generate from draft

Medium weight with provisional results. It needs enough persistent local space for multiple candidate previews and optional refinement, but should not navigate away from the draft.

### Creative template exploration

Medium-to-high weight. Catalog exploration and configuration can use a deeper sheet/page-like surface while retaining an obvious return to the same draft state.

The broader template workflow must not be compressed into a tiny popover just because it launches from the composer toolbar.

## Required state persistence

All three branches preserve:

```text
title
body
topics
mentions
committed attachments
scroll/edit context where technically feasible
```

A user may move among visual-acquisition paths without restarting the draft.

## Anti-average review

### AVG-001 — PASS

Top-level choices represent user problem states, not backend/source modules.

### AVG-002 — PASS

Draft text is reused by draft-image generation and compatible templates.

### AVG-003 — PASS

Specific `生成配图` does not open the broad template catalog.

### AVG-004 — PASS

The new first layer resolves a necessary acquisition-intent distinction. Shortcut paths skip it when their affordance already answers that distinction.

### AVG-005 — PASS

Capabilities are not grouped solely because they eventually create a visual attachment.

### AVG-008 — PASS

No current capability family is deleted to claim simplicity.

### AVG-009 — PASS

Contextual `从相册选` skips the existing-material source chooser; direct `生成配图` skips template browsing.

### AVG-012 — PASS

Generated visual output adds an attachment and does not replace draft text.

### AVG-015/016 — PASS conditionally

Contextual suggestion is gated to a natural break and remains dismissible/non-blocking.

### AVG-023 — implementation requirement

No reviewer rationale or Eval language may enter the product prototype.

## Verification targets for optimized prototype

1. Draft title/body survive all visual-acquisition paths.
2. `添加配图` reveals exactly the three problem-state choices.
3. Existing-media branch still exposes Album, Video, and Game assets.
4. Album still exposes permission friction, camera, grid, selection, and explicit commit.
5. `根据正文生成配图` consumes existing draft context without requiring re-entry.
6. Generation produces provisional candidates and requires explicit insertion.
7. `浏览创意模板` preserves broad exploration and heterogeneous templates.
8. Choosing a template asks only unresolved template-specific inputs.
9. Contextual suggestion appears only after a modeled natural break when draft has content and no visual attachment.
10. `从相册选` shortcut opens Album directly rather than re-asking source.
11. `生成配图` shortcut opens draft generation directly rather than re-asking acquisition intent.
12. Dismissing the suggestion does not alter draft state and does not immediately resurface without meaningful state change.
13. No current baseline capability family is lost.
