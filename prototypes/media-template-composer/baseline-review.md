# Media + Template Composer — Baseline Review

## Review purpose

Freeze a runnable current-state reconstruction before judging any Affordance Design optimization.

The baseline must preserve the complexity established by the two supplied mobile screenshots instead of manufacturing an easier problem by removing source families, template breadth, permission friction, or adjacent composer tools.

## Evidence boundary

### Confirmed from screenshots

The baseline preserves the source-confirmed visible structure:

- mobile content composer shell;
- back affordance;
- centered `内容 ▾`;
- `草稿` state/action;
- `填写标题` and `30` indicator;
- `添加正文`;
- large active drafting area;
- `+ 添加分区及话题`;
- smiley, `@`, circular plus, and settings entries;
- persistent lower acquisition panel;
- `相册 / 视频 / 游戏素材 / 全部模板` peer tabs;
- Album limited-photo-access helper and `去设置`;
- Album camera tile;
- Album media grid with selection affordances and a GIF-type item;
- All templates heterogeneous catalog including generic `全部模板` and `文字配图` entries;
- draft/composer shell remaining visible while the lower source changes.

The published case and runtime intentionally contain no real application identity or distinctive branded template names.

### Derived for runnable reconstruction

The screenshots do not directly establish all downstream transitions. The baseline therefore implements conservative runnable behavior for:

- title/body editing;
- the interpretation of `30` as a 30-character title limit;
- topic selection;
- emoji and mention insertion;
- lower-panel open/close from the plus entry;
- photo-access state transition represented inside browser-operable settings;
- media selection order and explicit Add commit;
- camera capture returning a selected photo;
- Video selection grid;
- Game-assets selection grid;
- template configuration;
- template generation as provisional output;
- explicit `插入正文` promotion into committed attachments.

These behaviors remain **Derived**. They are not silently promoted into screenshot-confirmed product facts.

### Open

The baseline still does not claim to know:

- exact `草稿` behavior;
- exact content-type choices under `内容 ▾`;
- actual meaning of the `30` count;
- production photo-permission / OS Settings transitions;
- exact Video and Game-assets information architecture;
- actual media insertion boundary;
- real template APIs, configuration models, or output object type;
- publish/upload/failure/recovery behavior.

These gaps remain available for later source evidence and must not be used as if they were known when evaluating the Skill result.

## Complexity preservation review

### R1 — Source families were not deleted

**PASS**

The runnable baseline preserves all four current source families:

```text
相册
视频
游戏素材
全部模板
```

The two screenshot-confirmed states can be switched directly, while the two unseen source tabs remain represented with conservative operable content instead of being collapsed away.

### R2 — Album state preserves permission + acquisition complexity

**PASS**

Album includes:

```text
limited photo access
→ 去设置
camera
media grid
selection state
explicit Add commit
```

Permission friction was not removed simply because it complicates the future optimization problem.

### R3 — Template state remains a heterogeneous capability catalog

**PASS**

The baseline does not rewrite the current template catalog into a cleaner problem-state structure. It deliberately preserves generic functional entries mixed with entertainment-style generators, using anonymized labels.

This is important because that mixed structure is part of the current state the Skill must later reason about.

### R4 — Editor context survives lower-panel interaction

**PASS**

Automated operation verifies that title/body state survives source switches and that body text survives direct-media and template-generation paths.

Committed visual attachments are additive; they do not replace user-authored draft text.

### R5 — Adjacent composer tools remain operable

**PASS**

Topic, emoji, mention, settings/photo-access, camera, and lower-panel toggle flows are operable in the same draft session.

The reconstruction is therefore a composer state rather than two disconnected screenshot replicas.

### R6 — Template completion is testable beyond card prominence

**PASS as Derived baseline behavior**

A template can be entered, configured, generated into provisional preview, explicitly inserted, and returned to the draft.

This makes future claims such as “template flow is better” falsifiable through operation rather than thumbnail prominence alone.

### R7 — Source truth and reconstruction hypotheses remain separate

**PASS**

`source-observations.md`, `case.json`, and `baseline-interaction-spec.md` explicitly distinguish Confirmed / Derived / Open information.

No downstream behavior inferred solely to make the baseline runnable is represented as source-confirmed evidence.

## Automated verification

GitHub Actions run `33229745706` passed:

```text
platform-independent composer model: PASS (4/4)
TypeScript: PASS
Web Expo export: PASS
iOS Expo export: PASS
mobile-touch current-state operation: PASS (4/4)
```

The browser suite operates:

1. Album and All-template screenshot-confirmed states plus all four source tabs;
2. title/body preservation across Video, Game-assets, Album and direct-media commit;
3. template configuration → provisional preview → explicit insertion while preserving body;
4. topic, emoji, mention, settings/photo permission, camera, acquisition-panel close/reopen, and final draft preservation.

Two earlier browser failures were test-harness selector errors, not interaction-model failures:

- draft text existed both in the editor and the template context preview, making an unscoped text locator ambiguous;
- an emoji prefix selector accidentally matched the toolbar `emoji-tool` before an emoji choice.

The tests were scoped to the intended surfaces and the complete interaction run then passed. No product behavior was removed to make the tests pass.

## Baseline decision

The current-state reconstruction is frozen for structural comparison.

Future optimization must not mutate this baseline. The optimized prototype is a separate artifact and must preserve the case requirement that Album, Video, Game assets, and broad template capability remain available somewhere in the experience.

## Metric boundary

This baseline and later structural comparison can test whether the design reduces interaction friction, reuses context, preserves capabilities, and makes visual creation more direct.

It cannot prove that image-attached publishing rate or successful template usage increases. Causal metric validation requires production analytics or an experiment after the structural design is implemented in the real product.
