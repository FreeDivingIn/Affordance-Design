# Case 004 — Source Observations

This document normalizes the two user-provided mobile screenshots into durable case evidence.

The original screenshots are source evidence but are not stored in-repo because the currently connected GitHub write action accepts UTF-8 text files only.

## Source frame

Both screenshots show the same dark-theme mobile content composer at original uploaded resolution `1290 × 2796`.

The editor state is substantially unchanged between the screenshots. The main visible difference is the active tab in the lower content-acquisition panel.

The real application identity is intentionally omitted from this case.

## Confirmed — shared composer state

Visible in both screenshots:

- a top navigation bar with:
  - back affordance on the left;
  - centered content-type label `内容` with a downward disclosure indicator;
  - `草稿` state/action on the right;
- title input with placeholder `填写标题`;
- a right-aligned `30` title-count indicator;
- body input area with placeholder `添加正文`;
- a large uninterrupted composition area between the editor fields and lower tools;
- a button-like entry `+ 添加分区及话题` immediately above the composer utility toolbar;
- a utility toolbar containing, left to right:
  - emoji/smiley entry;
  - `@` mention entry;
  - circular plus entry;
  - settings/gear entry aligned to the right;
- a large bottom panel whose contents change by selected source tab;
- persistent bottom source tabs:
  - `相册`;
  - `视频`;
  - `游戏素材`;
  - `全部模板`;
- the active source tab is indicated with brighter text plus a short underline;
- switching the active lower source leaves the composer above visually intact.

## Confirmed — Album state

The first screenshot shows `相册` active.

Visible behavior/state cues:

- permission helper copy: `点击 去设置 切换至允许访问所有照片`;
- a light `去设置` button aligned to the right of the permission helper;
- a media grid directly below the permission message;
- the first grid tile is a camera acquisition tile with camera icon and `拍照`;
- following cells are media thumbnails;
- at least one cell is visibly a GIF and includes a `GIF` badge;
- selectable media cells have an empty circular selection control near their upper-right corner;
- the grid continues beyond the first visible row and includes at least a second visible row;
- `相册` is the active bottom tab.

## Confirmed — All templates state

The second screenshot shows `全部模板` active.

Visible behavior/state cues:

- the permission message and album media grid are no longer visible;
- the toolbar above the panel remains visible and unchanged;
- the lower panel becomes a two-column/two-row-plus template catalog within the visible viewport;
- the first visible template tile is a generic `全部模板` entry;
- the second visible tile is a generic `文字配图` entry;
- the remaining visible tiles are visually heterogeneous entertainment/game-like template cards rather than one uniform functional family;
- at least eight template tiles are visible across two rows;
- each card has a thumbnail/cover and a title beneath it;
- `全部模板` is the active bottom tab.

## Confirmed — complexity that must survive baseline reconstruction

The current product state simultaneously contains:

```text
long-form text composition
+ metadata/topic entry
+ inline composer utilities
+ direct photo acquisition
+ device media selection
+ video source
+ domain/game-material source
+ template-generation source
+ permission friction
+ heterogeneous template browsing
```

A baseline that removes one or more of these capability families is not a faithful reconstruction.

## Derived — conservative interaction assumptions used only to make baseline operable

These behaviors are not shown directly in the screenshots. They may be implemented in the baseline as conservative, reviewable assumptions so the complex state can be operated end-to-end.

- Tapping a media thumbnail toggles selection while keeping the composer draft in place.
- Camera acquisition returns a newly created media item into the same media-selection context.
- `视频` opens a media grid structurally similar to album selection but limited to video items.
- `游戏素材` opens a browsable/selectable material catalog rather than deleting that source family.
- Tapping a template opens a template-specific configuration step, then returns generated visual output to the composer rather than replacing the draft text.
- `文字配图` uses existing draft/body context as at least part of its generation input.
- Emoji and mention tools insert content at the current text-editing context.
- The circular plus controls visibility of the lower acquisition panel.
- Settings exposes composer/media settings including photo-access state.
- `添加分区及话题` opens a metadata selection surface and preserves the editor draft.

These Derived assumptions are not allowed to become evidence for a future redesign unless they are separately validated.

## Open — not supported by the screenshots

The screenshots do not establish:

- whether `草稿` is a passive status, save action, or draft-management entry;
- which alternative content types exist under `内容 ▾`;
- exact title-count semantics (maximum, remaining count, or current count);
- exact downstream behavior of emoji, mention, plus, settings, topic/section entry;
- whether selected photos insert immediately, after a confirmation action, or only at publish time;
- whether selection order is represented numerically after media selection;
- exact content and grouping inside `视频`;
- exact content and grouping inside `游戏素材`;
- exact template information architecture after entering a template;
- whether generated template output returns as an image, rich block, attachment, or another artifact;
- whether templates can consume title/body/topic context automatically;
- whether the template panel is scrollable independently of the editor;
- whether the bottom panel can be resized/dismissed by gesture;
- publish flow, validation, upload state, failure recovery, and final confirmation behavior.

## Anonymization rules for this Eval

- Do not use the real application name, logo, or publisher identity.
- Do not copy distinctive branded template titles from the screenshot.
- Preserve the **type** and heterogeneity of templates using neutral replacements such as:
  - `卡片生成器`;
  - `随机装备`;
  - `身份卡`;
  - `角色关系`;
  - `今日运势`;
  - `人生预测`.
- Preserve `内容`, `草稿`, `填写标题`, `添加正文`, `添加分区及话题`, `相册`, `视频`, `游戏素材`, `全部模板`, `文字配图`, `拍照`, `去设置` because these are generic product strings needed to reconstruct the interaction.

## Optimization evidence boundary

The user-provided optimization goal is confirmed:

```text
提升用户带图率
+ 优化模板的使用流程
```

No source evidence yet establishes which structural solution will achieve that goal.

The baseline therefore records the current system faithfully first. Future Skill output must be judged against this case without assuming that more template prominence, fewer tabs, fewer steps, or a more visually polished panel is automatically better.
