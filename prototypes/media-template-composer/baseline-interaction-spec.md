# Media + Template Composer — Baseline Interaction Specification

This specification freezes the **current-state reconstruction** before any Affordance Design optimization is attempted.

It preserves the interaction complexity visible in the supplied screenshots and adds only the minimum Derived behavior required to make that complexity operable.

## Evidence classes

- **Confirmed** — directly visible in the supplied screenshots or explicitly stated by the user.
- **Derived** — conservative behavior added to make the baseline runnable; not screenshot-confirmed.
- **Open** — behavior that remains unknown and must not be used as confirmed redesign evidence.

## Product goal — Confirmed

```text
increase image-attached publishing rate
+ improve template usage flow
```

The baseline does not attempt to solve this goal. It creates the state against which a later Skill result will be compared.

## Baseline object/state model

```yaml
composer:
  content_type: 内容
  draft_state: 草稿
  title: user_owned_text
  body: user_owned_text
  topics: user_owned_metadata[]
  mentions: user_owned_metadata[]
  attachments: user_owned_visual[]

acquisition_panel:
  open: true
  active_source: album | video | game_assets | all_templates

photo_permission:
  state: limited | full

media_selection:
  selected_items: visual_source_item[]

template_session:
  template_id: optional
  inputs: provisional
  generated_visual: system_provisional | null
```

## Composer shell — Confirmed

The same shell remains visible in the two observed source states:

```text
Back     内容 ▾                      草稿

填写标题                              30
────────────────────────────────────────
添加正文

[large drafting area]

+ 添加分区及话题
────────────────────────────────────────
☺       @       +                    ⚙

[active acquisition panel]

相册      视频      游戏素材      全部模板
```

The baseline must not hide or replace the upper composer merely because a lower source tab changes.

## Title/body editing — Confirmed UI, Derived operation

Visible placeholders are Confirmed.

Runnable behavior is Derived:

- title and body can be edited while the acquisition panel is open;
- switching source tabs preserves both fields;
- insertion of visual media must not replace user-authored title/body text.

For the baseline, the `30` title indicator is implemented as remaining title characters with a maximum of 30. This interpretation is **Derived**, not Confirmed.

## Add section/topic — Confirmed entry, Derived downstream

Confirmed:

- `+ 添加分区及话题` exists above the utility toolbar.

Derived runnable behavior:

- opens an in-composer metadata surface;
- allows choosing a section and one or more topics;
- closes back to the same draft without changing acquisition source state.

## Composer utilities

### Emoji

Confirmed entry: smiley icon.

Derived behavior:

- opens a compact emoji tray;
- choosing an emoji appends it to the body draft.

### Mention

Confirmed entry: `@`.

Derived behavior:

- opens a compact mention list;
- choosing a person inserts an `@name` token into the body draft.

### Add

Confirmed entry: circular plus.

Derived behavior:

- toggles the acquisition panel open/closed;
- reopening returns to the last active source.

### Settings

Confirmed entry: gear.

Derived behavior:

- opens composer/media settings;
- exposes the current photo-access state;
- the baseline does not simulate a real OS Settings app.

## Album source — Confirmed structure

When `相册` is active:

```text
permission helper + 去设置
camera tile
media tile grid
selection controls
persistent source tabs
```

Confirmed copy:

```text
点击 去设置 切换至允许访问所有照片
去设置
拍照
```

### Photo access

Confirmed:

- the screenshot represents a non-full-access state and offers `去设置`.

Derived operation:

- tapping `去设置` opens an in-product explanation that system Settings is required;
- a separate `已允许所有照片` action exists only inside the settings surface to make the permission-state transition operable in the browser baseline;
- this browser transition is test instrumentation expressed through plausible product settings UI, not a claim about the real app's exact Settings behavior.

### Media selection

Confirmed:

- circular selection affordances exist on selectable thumbnails.

Derived operation:

- tap toggles selection;
- selected items show numbered selection order;
- selection persists while switching among lower source tabs;
- explicit `添加` commits currently selected media into the composer attachment strip.

The explicit add/commit boundary is Derived because the screenshot does not show the actual insertion trigger.

### Camera

Confirmed:

- first tile is `拍照`.

Derived operation:

```text
拍照
→ camera surface
→ capture
→ captured image joins current selected media
→ return to Album
```

## Video source — Confirmed tab, Derived panel contents

Confirmed:

- `视频` is a peer source tab.

The screenshot does not show its contents.

Derived baseline behavior:

- show selectable device-video tiles with duration labels;
- use the same selection/commit semantics as Album for visual attachment insertion;
- preserve draft and selections across source switches.

## Game-assets source — Confirmed tab, Derived panel contents

Confirmed:

- `游戏素材` is a peer source tab.

The screenshot does not show its contents.

Derived baseline behavior:

- show a browsable grid of reusable themed visual assets;
- assets are selectable and commit as attachments;
- keep this capability independent rather than folding it into Album or Templates.

The case uses neutral generic asset names and artwork placeholders; it does not reproduce real application/game identity.

## All-templates source — Confirmed structure

Confirmed:

- `全部模板` is a peer source tab;
- its panel replaces the album permission/media grid;
- at least eight heterogeneous template entries are visible;
- first visible entries include the generic capabilities `全部模板` and `文字配图`;
- remaining visible entries include several entertainment/game-like generators.

The anonymized baseline catalog contains:

```text
全部模板
文字配图
卡片生成器
随机装备
身份卡
角色关系
今日运势
人生预测
```

This list preserves catalog heterogeneity without copying distinctive branded names.

## Template flow — Derived

The screenshots do not show what happens after tapping a template. The baseline needs an end-to-end behavior so future optimization can be tested against more than card prominence.

Conservative reconstruction:

```text
tap template
→ template configuration surface
→ enter/confirm template-specific input
→ generate visual preview
→ preview remains provisional
→ explicit 插入正文
→ visual becomes user-owned attachment
→ return to same composer draft
```

### `文字配图`

Derived context use:

- title/body draft is shown as available input;
- the user does not have to retype the entire draft;
- user may adjust a short visual instruction;
- generation does not rewrite title/body.

### Other templates

Derived:

- each template exposes a small set of template-specific parameters;
- configuration state belongs to the template session;
- generated result requires explicit insertion before entering the composer attachment set.

## Template ownership boundary — Derived from Skill contract

Generated visual preview is system-provisional until insertion.

```text
generated preview
  = SYSTEM_PROVISIONAL

插入正文
  → promote to USER_OWNED attachment
```

Closing the template session before insertion discards only provisional output and leaves draft/attachments unchanged.

## Persistent editor context

Baseline invariant:

```text
source-tab switches
utility popovers
metadata editing
template exploration
camera/media selection
```

must not erase:

```text
title
body
topics
mentions
committed attachments
```

This is necessary to reconstruct an embedded acquisition workflow rather than separate demo pages.

## Current-state complexity invariant

The baseline is invalid if it reduces the source state to fewer capabilities than the screenshots establish.

Required families:

```text
Album
Video
Game assets
All templates
```

Required adjacent composer functions:

```text
Title
Body
Section/topic
Emoji
Mention
Add
Settings
Draft state
```

## Open behavior intentionally not fabricated

The baseline does not claim to know:

- exact publish button/location;
- actual upload pipeline;
- real camera/OS photo permission behavior;
- real template generation APIs;
- exact alternative content types under `内容 ▾`;
- whether real template output inserts into body, attachment stack, or another object type;
- exact server/save semantics of `草稿`.

The runnable baseline may use local state to represent these boundaries, but reviewer documents must continue to classify them as Open/Derived.

## Baseline acceptance

A baseline implementation passes when a reviewer can operate all of the following without losing draft state:

1. edit title/body;
2. open/close section/topic metadata;
3. use emoji and mention tools;
4. toggle the acquisition panel;
5. switch among all four source tabs;
6. see and interact with the limited-photo permission state;
7. select album media and capture a camera item;
8. select video content;
9. select game assets;
10. enter a template, configure/generate/preview, insert it, and return;
11. verify attachment state persists after returning to text composition;
12. verify no real application identity or evaluator instructions appear in product UI.
