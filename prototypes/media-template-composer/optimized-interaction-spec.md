# Media + Template Composer — Optimized Interaction Specification

This is the Affordance Design result for Case 004. It is downstream of the frozen baseline and contains no runtime/component vocabulary.

## Problem frame

```yaml
person: mobile user composing a text-first post
primary_task: finish a publishable post
business_goal:
  - increase image-attached publishing rate
  - improve successful template usage
current_context:
  - title/body/topics may already contain useful semantic input
  - visual attachments may still be absent
critical_question: does the user already have visual material, need a supporting visual from the current draft, or intentionally want to explore a broader template space?
```

The optimization must preserve Album, Video, Game assets, broad template exploration, camera/permission friction, and adjacent composer tools. Removing these capabilities is not an acceptable way to simplify the problem.

## Structural diagnosis

### D1 — current peer tabs mix different user intents

Current root:

```text
相册 / 视频 / 游戏素材 / 全部模板
```

The first three are sources for **existing material**. The fourth is a **creation/exploration capability space**. Treating them as equivalent peers asks the user to translate a problem state into product taxonomy.

Relevant failures: AVG-001 and AVG-005.

### D2 — `文字配图` is narrower than `全部模板`

For a user who wants a picture for the text currently being written:

```text
target = current draft
intent = create supporting visual
```

Requiring broad template browsing before that task violates the affordance contract for a specific intent.

### D3 — current draft context is underused

Title/body/topics can answer part of template/generation input. Asking users to restate the same content is AVG-002.

### D4 — photo permission friction belongs only to the existing-photo path

The limited-photo warning is relevant to Album. It should not dominate attention when the user wants generation or template exploration.

### D5 — image-rate goal supports discoverability, but not interruption

Visual options should remain discoverable at a natural non-editing state. Proactive suggestions may surface only when they are local, dismissible, and not competing with active typing/selection.

## Divergence

### Candidate A — preserve four root tabs and visually promote templates

**Rejected.** It changes prominence without fixing the intent/taxonomy mismatch and still makes narrow draft illustration pass through broad template browsing.

### Candidate B — one mixed visual picker

**Rejected.** Fewer top-level controls would hide materially different intents in one result set, increase scanning cost, and erase source-specific behavior such as photo permission/camera.

### Candidate C — problem-state launcher with context-aware shortcuts

**Selected.** The first structural question becomes:

```text
从已有素材添加
根据正文生成配图
浏览创意模板
```

Each branch begins with different known information and genuinely different unresolved questions.

## Review correction — the launcher is not hidden by default

The first implementation placed the selected structure entirely behind an `添加配图` control. Automated behavior passed, but structural Review rejected that presentation because the baseline already keeps visual acquisition visible. Hiding the new structure would add one action to every explicit visual intent and reduce discoverability despite the image-rate goal.

Final visibility contract:

```text
non-active composition / initial visual-acquisition state
→ problem-state launcher is visible in the existing lower workspace

user focuses body for active writing
→ lower visual flow yields to composition

later re-entry
→ 添加配图 reopens the same problem-state launcher
```

`添加配图` is therefore a re-entry/capability affordance, not a mandatory extra step before the first visible launcher.

This correction preserves the structural grouping while avoiding a universal interaction tax.

## Branch 1 — 从已有素材添加

Choosing this branch means the user already has or knows the source material wanted.

Only then is source type the next required distinction:

```text
已有素材
├─ 相册
├─ 视频
└─ 游戏素材
```

Album preserves:

- limited-photo permission message and `去设置`;
- camera acquisition;
- device-photo grid;
- selection state/order;
- explicit Add commit.

Video preserves device-video selection. Game assets preserves its existing material catalog.

## Branch 2 — 根据正文生成配图

This is a specific command-like path, not template browsing.

Known at invocation:

```yaml
target: current draft
intent: supporting visual
available_context:
  title: current title
  body: current body
  topics: current topics
```

Default flow:

```text
根据正文生成配图
→ bind current draft automatically
→ generate 2–3 provisional candidates
→ optional refinement
→ choose candidate
→ 插入正文
```

The user must not re-enter the draft. If the draft lacks enough semantic information, the flow may ask one genuinely unresolved content question rather than fabricating meaning.

Generated candidates remain SYSTEM_PROVISIONAL until explicit insertion. Generation is ADD behavior and cannot rewrite user-authored title/body/topics.

## Branch 3 — 浏览创意模板

This is an intentional capability-space entry, so broad exploration is valid.

First catalog structure:

```text
适合当前内容
全部模板
```

The broad heterogeneous families remain available, including neutral equivalents of card, loadout, identity, relationship, fortune, and prediction generators.

`文字配图` may remain discoverable as an alias/related capability, but invoking it must resolve to the same direct draft-generation semantics as Branch 2 rather than creating a second incompatible workflow.

## Template configuration rule

For each represented template:

```text
required template inputs
− title/body/topics already known
= questions still unresolved
```

Examples:

- a content-summary card may generate a first preview without duplicate text input;
- an identity card may still require a person/character if none is known;
- a loadout generator may require a game/mode scope if that scope is unresolved;
- decorative options should not block first preview unless they are required to determine the result.

Template previews remain provisional until explicit insertion.

## Contextual image suggestion

When the lower visual flow has yielded to active writing, the system may later offer a local nonblocking suggestion only if:

```yaml
body_has_meaningful_content: true
visual_attachment_count: 0
active_typing_or_selection: false
visual_flow_open: false
same_suggestion_was_dismissed_without_meaningful_change: false
```

At a modeled natural break:

```text
给这段内容配张图
[生成配图] [从相册选]
```

Shortcut semantics:

- `生成配图` enters Branch 2 directly because the shortcut already expresses acquisition intent;
- `从相册选` enters Album directly because it already expresses both existing-material intent and source;
- dismissing does not alter the draft;
- time alone cannot resurface the same suggestion;
- reconsideration requires enough content change to make the previous recommendation basis stale.

The prototype uses deterministic thresholds only to make this rule executable. Production definitions of “natural break” and “changed enough” remain Open.

## Interaction weight

- Existing media: low-to-medium; stays local to the composer.
- Draft generation: medium; needs local persistent space for several candidates and refinement.
- Creative template exploration: medium-to-high; may use deeper local space while preserving obvious return to the same draft.

No branch navigates away solely because its runtime implementation is easier on a separate page.

## Required state persistence

All visual paths preserve:

```text
title
body
topics
mentions
committed attachments
```

Visual generation never mutates user-authored text.

## Anti-average review contract

- AVG-001: root choices represent problem state, not source modules.
- AVG-002: current draft context is subtracted from downstream questions.
- AVG-003: direct generation does not expand into broad template space.
- AVG-004: launcher exists only where acquisition intent is unresolved; shortcuts skip it when already resolved.
- AVG-005: capabilities are not grouped merely because all eventually produce a visual.
- AVG-008: no baseline capability is deleted to claim simplicity.
- AVG-009: multiple paths may have different step counts when their known context differs.
- AVG-012: generated visuals add attachments; they do not replace user-owned draft text.
- AVG-015/016: contextual suggestion must remain local and absent during active composition.
- AVG-023: reviewer/Eval rationale never appears in product UI.

## Verification targets

1. The problem-state launcher is visible initially/non-actively without requiring a preliminary Add tap.
2. Focusing body yields the visual panel to active composition.
3. `添加配图` can reopen the same launcher after it is closed/yielded.
4. The launcher contains exactly existing material / generate from draft / explore templates.
5. Existing-media branch preserves Album, Video, Game assets and Album permission/camera/grid/selection/commit behavior.
6. Draft generation consumes current context without re-entry, produces provisional candidates, and requires explicit insertion.
7. Creative-template exploration remains broad and heterogeneous.
8. A represented template asks only unresolved template-specific input.
9. Contextual suggestion appears only after a modeled natural break with meaningful draft content and no visual attachment.
10. Album/generation shortcuts skip layers whose questions their affordances already answer.
11. Dismissal does not mutate draft or immediately resurface without meaningful change.
12. Adjacent topic/emoji/mention/settings behavior remains operable.
13. No baseline capability family is lost.
