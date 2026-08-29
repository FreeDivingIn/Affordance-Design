# Case 004 — Baseline vs Optimized Structural Comparison (Milestone 7)

Status: COMPLETE
Revision: 1
Approval: APPROVED r1
Updated: 2026-08-29

## Completion record (2026-08-29)

All success criteria met:

- Reviewer page embeds both artifacts side by side; verified in a real browser on the public site.
- Comparison record: `evals/cases/004-media-template-comparison.md` → moved to `evals/cases/004-media-template-composer/comparison.md` (see deviation D1). Covers all six axes + metric-validation boundary.
- No reviewer-only content in either product surface (verified during operation).
- `validate-cases.mjs` PASS (4/4); Pages CI run `33240288483` green (build/deploy/smoke incl. Cases 001–003 regression); public URLs 200.
- Task archived to `tasks/completed/content-composer-media-template-real-case.md` with Milestone 7 evidence.

Commits: `c50dfa0` (comparison surfaces), `4c15f37` (task archive), `188539d` (task evidence content).

### Deviations

- **D1**: comparison.md placed at `evals/cases/004-media-template-composer/` instead of `prototypes/media-template-composer/`. Reason: the Pages assembler already copies per-case `comparison.md` into the deployed site; the prototypes/ location would have 404'd publicly. Discovered during P3 from `evals-pages.yml`.
- **D2**: task bookkeeping landed as two commits instead of one; no content impact.

### Defect record

- **Class**: staged vs working-tree divergence — `git mv` staged only the rename; prior content edits stayed unstaged and the first commit showed "0 insertions, 0 deletions".
- **Caught by**: `git status --short` verification after commit (P4).
- **Blind spot**: assuming `git mv` carries pending working-tree modifications into the staged rename.
- **Sweep**: full `git status` re-check; no other unstaged changes existed. Fixed in `188539d`.

### Review statement

No independent reviewer agent is configured in this workspace; REVIEW was performed by the coordinator and was not independent. First-hand browser operation of both deployed artifacts and the updated reviewer page constitutes the acceptance evidence.

## 1. Confirmed basis

**Goal**: Close Case 004 Milestone 7 — operate both published artifacts, record the baseline vs optimized structural comparison, and update the reviewer-facing surfaces so reviewers can compare the two runtimes without judging the optimized result in isolation.

**Success criteria** (from `tasks/active/content-composer-media-template-real-case.md`):

- Reviewer page presents both the frozen baseline and the Skill-optimized runtime for direct comparison.
- A durable structural comparison record exists covering: discoverability, context preservation, layer value, task interruption, template-flow completion, and protection of direct media insertion.
- The comparison explicitly records the metric-validation boundary: structural improvements are hypotheses, not measured uplift in image-attached publishing or template completion.
- No reviewer-only content leaks into either product surface (AVG-023 boundary preserved).
- `evals/validate-cases.mjs` passes; public post-deploy smoke for Case 004 (both artifacts) plus Cases 001–003 regression passes.

**In scope**:

- `evals/cases/004-media-template-composer/index.html` — add optimized runtime alongside baseline (status line currently says "current-state reconstruction" and embeds only `./baseline/`).
- `evals/cases/004-media-template-composer/README.md` — replace "Future Affordance Design result" wording with published comparison state.
- New comparison record: `prototypes/media-template-composer/comparison.md`.
- Task file status updates: `tasks/active/content-composer-media-template-real-case.md` (Milestone 7 completed section / Current State / Verification), and if Milestone 7 closes, move task to `tasks/completed/`.
- Commit + push on `skill/init-affordance-design` (triggers existing Pages CI publish + smoke).

**Out of scope**:

- Any change to the frozen baseline runtime or optimized runtime behavior/semantics.
- New eval cases, new interaction models, native device validation, quantitative metric claims.
- Merging to `main`.

**Constraints**:

- Frozen baseline must not be overwritten (`optimized-review.md` decision: ACCEPT).
- Prototype surface purity: comparison/reviewer language stays on the reviewer page and in docs, never inside `./baseline/` or `./prototype/` runtimes.
- Do not claim causal metric uplift; production A/B validation remains required.
- Case facts must not be duplicated across README/HTML/fixture — requirement prose stays sourced from `case.json`.

## 2. Proposed approach and rationale

Evidence already gathered (confirmed, not future work):

- `optimized-review.md`: ACCEPT for publication; R1 capability preservation PASS; GitHub Actions run `33229997607` all green (model 4/4, TS, Web/iOS export, mobile-touch 8/8).
- Optimized runtime already deployed and smoke-tested at `cases/004-media-template-composer/prototype/`; baseline at `.../baseline/` (per `evals-pages.yml`).
- Reviewer page `index.html` (126 lines) still shows single-baseline phase — this is the main surface gap.
- Case README still labels optimized artifacts as "Future".

Approach: documentation-and-surface completion only. Operate both deployed artifacts in a browser to capture first-hand comparison evidence, write the comparison record synthesizing `optimized-review.md` findings R1+ and the open questions, then update the two reviewer surfaces and task bookkeeping, then publish via the established CI path.

## 3. Work phases and dependencies

```text
P1 Operate both artifacts (browser, local or deployed URLs)
   → capture side-by-side behavioral evidence per comparison axis
P2 Write prototypes/media-template-composer/comparison.md
   (depends on P1; synthesizes optimized-review.md)
P3 Update reviewer page index.html + case README
   (depends on P2 for stable comparison links/wording)
P4 Update task file; move to tasks/completed/ if Milestone 7 closes
P5 node evals/validate-cases.mjs → commit → push
P6 Verify deployed catalog + Case 004 page + both prototypes via browser smoke
   (depends on P5 CI completing)
```

## 4. Action ownership

| Action | Class | Owner | Evidence |
|---|---|---|---|
| P1 artifact operation | CRITICAL_PATH | coordinator | observed behaviors per axis |
| P2 comparison record | CRITICAL_PATH | coordinator | comparison.md committed |
| P3 surface updates | CRITICAL_PATH | coordinator | diff of index.html / README.md |
| P4 task bookkeeping | CRITICAL_PATH | coordinator | task file diff |
| P5 validate+publish | CRITICAL_PATH (external: push) | coordinator | CI run URL, green checks |
| P6 deployed smoke | CRITICAL_PATH | coordinator | browser observations of public URLs |

Single-agent rationale: all actions are small, sequential, and share the comparison context; delegation handoff cost exceeds value. No configured multi-agent contract exists in this workspace.

## 5. Agent assignments

Single coordinator (see §4). Read-only browser operation only in P1/P6; all writes in P2–P4 are local repo files.

## 6. Expected changed files

```text
A  prototypes/media-template-composer/comparison.md
M  evals/cases/004-media-template-composer/index.html
M  evals/cases/004-media-template-composer/README.md
M  tasks/active/content-composer-media-template-real-case.md
   (or R  tasks/active/... → tasks/completed/...)
```

No runtime source under `baseline-runtime/` or `optimized-runtime/` is modified.

## 7. Validation and review plan

- `node evals/validate-cases.mjs` must pass before commit.
- Reviewer page must render both iframes/links and load `case.json` facts without duplication of requirement prose.
- Post-push: open public Case 004 page, both artifact URLs, and catalog; confirm no reviewer text inside either product surface.
- Self-review against Milestone 7 completion definition; no independent reviewer agent configured — review is not independent and will be stated as such.

## 8. Permission-requiring or irreversible actions

- `git push` to `origin/skill/init-affordance-design` → triggers public GitHub Pages redeploy (external, public-facing). Authorized explicitly by approval of this plan. Fully reversible by follow-up commit; no secrets, no destructive git operations.

## 9. Risks, assumptions, fallbacks

- **Risk**: browser operation environment may not reach localhost export builds. **Fallback**: operate the already-deployed public URLs (they passed CI smoke).
- **Risk**: CI Pages smoke regression on Cases 001–003. **Fallback**: do not patch runtime code; revert the docs commit and re-plan.
- **Assumption**: optimized runtime is deployed at `cases/004-media-template-composer/prototype/` (consistent with Cases 001–003 convention; confirmed against `evals-pages.yml` build steps — will be re-verified in P6).
- **Assumption**: Milestone 7 closing completes the active task; native-device validation stays recorded as `DEFERRED_GAP` in the task file.

## 10. Completion definition

- Comparison record committed and linked from the reviewer surfaces.
- Reviewer page shows baseline + optimized with an accurate phase statement.
- Task file records Milestone 7 completion and the metric-validation boundary; moved to `tasks/completed/` if no active milestone remains.
- Push published; public smoke (Case 004 both artifacts + catalog) observed green.
- Plan archived to `.plans/completed/`.
