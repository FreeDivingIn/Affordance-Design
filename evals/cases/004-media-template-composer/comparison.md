# Media + Template Composer — Baseline vs Optimized Structural Comparison

## Purpose

Record the structural differences between the frozen current-state baseline and the Affordance Design optimized runtime, based on direct operation of both published artifacts.

This document is reviewer-facing evidence. It does not claim product metric uplift.

## Artifacts compared

| Artifact | URL | Source |
|---|---|---|
| Current-state baseline | `evals/cases/004-media-template-composer/baseline/` | `baseline-runtime/` (frozen) |
| Skill-optimized runtime | `evals/cases/004-media-template-composer/prototype/` | `optimized-runtime/` |

Evidence basis:

- first-hand browser operation of both deployed artifacts on 2026-08-29 (this document);
- `optimized-review.md` (ACCEPT, GitHub Actions run `33229997607`: model 4/4, TypeScript, Web/iOS export, mobile-touch 8/8);
- `baseline-review.md` and both frozen interaction specifications.

## First decision under comparison

Baseline — the first question is **product/source taxonomy**:

```text
相册 | 视频 | 游戏素材 | 全部模板
```

Optimized — the first question is **user problem state**:

```text
添加配图
├─ 从已有素材添加   （相册、视频或已有素材）
├─ 根据正文生成配图 （直接使用当前标题、正文和话题）
└─ 浏览创意模板     （主动探索卡片、趣味生成器等模板）
```

Source taxonomy still exists in the optimized structure, but it is resolved one level later, inside the branch where it is actually undecided:

```text
从已有素材添加 → 相册 | 视频 | 游戏素材
```

## Comparison by axis

### 1. Discoverability

- **Baseline**: template capability is discoverable only as one of four peer tabs. A user holding a finished draft and wanting "an image for this text" must recognize that `全部模板` — a source category — is where draft-derived visuals live.
- **Optimized**: the generic `添加配图` entry names the three situations a user can actually be in. Draft-derived illustration is labeled by intent (`根据正文生成配图`), not by where the asset comes from.
- **Observed**: on 2026-08-29 operation, the optimized entry presented exactly the three problem-state choices with one-line helper text; no source names appeared before problem state was resolved.

### 2. Context preservation

- **Baseline**: entering template flows from a source tab does not carry the draft as bound context; what the template needs is re-asked downstream.
- **Optimized**: current title/body/topics are treated as already-supplied context. The generation surface opens with `当前正文` already bound and explicitly states generation will not modify the draft.
- **Observed**: after typing a draft body and choosing `生成配图`, the optimized runtime showed the typed draft pre-bound; the only question asked was an optional style supplement.

### 3. Layer value

- **Baseline**: all four tabs sit at one layer regardless of whether the user's situation is resolved. The layer answers "which source", which for a draft-illustration user is a question they did not have.
- **Optimized**: each layer answers a question that is genuinely unresolved at that point: problem state first, source second (only within existing media), candidate selection last.
- **Observed**: the existing-media branch still exposes 相册 / 视频 / 游戏素材 with permission state, camera, and GIF — no layer was removed, only re-sequenced.

### 4. Task interruption

- **Baseline**: no proactive visual suggestion exists; attachment is entirely user-initiated through the source tabs.
- **Optimized**: a contextual suggestion (`给这段内容配张图`) appears only at a modeled natural break — after the draft has meaningful content, no visual is attached, and body focus has ended. It is nonblocking and dismissible, and does not resurface after dismissal without meaningful state change.
- **Observed**: while the body field held focus, no suggestion appeared; after moving focus away from a meaningful draft, the suggestion appeared with direct shortcuts `生成配图` / `从相册选`.

### 5. Template-flow completion

- **Baseline**: template exploration and draft illustration share one entry (`全部模板`), so a narrow illustration intent must pass through broad catalog exploration.
- **Optimized**: narrow draft illustration (`根据正文生成配图`) never opens the broad catalog; broad exploration (`浏览创意模板`, including heterogeneous generators) remains a separate, preserved path. Templates that can use draft context do not re-ask it.
- **Observed**: the draft-generation path produced three provisional candidates plus `重新生成` without any catalog navigation.

### 6. Direct media insertion (protected path)

- The optimization goal explicitly forbids making direct media paths worse to increase template prominence.
- **Observed**: `从已有素材添加` reaches Album (with permission friction and settings path), Video, and Game assets with the same selection/commit behavior as the baseline; camera acquisition remains available.

## Provisional vs user-owned content

Generated candidates in the optimized runtime are provisional until the user explicitly inserts one. The draft text remains user-owned and unchanged by generation.

**Observed**: after generation, candidates appeared under `选择一个候选` with `重新生成` available; only after selecting a candidate did `插入正文` appear as the explicit commit action. The draft body was identical before and after generation. (Final committed-attachment rendering is covered by CI mobile-touch assertions 8/8 in run `33229997607`.)

## What the optimization deliberately did not do

- did not delete Album, Video, Game assets, or broad template exploration;
- did not merge every visual source into one generic picker;
- did not promote templates inside the same four-tab taxonomy;
- did not add visual polish to make the restructure feel finished;
- did not put any reviewer/eval/prototype language into either product surface.

## Metric-validation boundary

This comparison demonstrates **structural** differences: fewer re-asked questions, intent-labeled entries, context reuse, gated interruption, and preserved capability scope.

It does **not** demonstrate:

- increased image-attached publishing rate;
- improved template-use completion in production;
- that users will understand the three problem-state labels without research.

These remain hypotheses (`tasks/completed/content-composer-media-template-real-case.md` → Hypotheses) and require production analytics or A/B validation. Structural operability is the strongest claim this Eval supports.

## Open questions carried forward

Inherited from `optimized-review.md` — unresolved by this comparison:

- whether users understand the three problem-state labels without research;
- whether the generic `添加配图` layer adds cost for users who almost always choose Album;
- production trigger semantics for the contextual suggestion (thresholds are deterministic prototype rules, not validated product facts);
- which real templates can safely consume draft context without additional questions;
- native keyboard/focus/Sheet behavior on physical devices.
