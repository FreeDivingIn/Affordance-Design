# Raw-Brief With/Without-Skill Comparison — Run 002

Status: COMPLETE
Revision: 2
Approval: APPROVED r2
Updated: 2026-08-30

## 1. Confirmed basis

**Goal**: Measure what the Skill's decomposition step contributes, by repeating the with/without comparison with **raw briefs** — problem statements that do not contain the case.json `known`/`unresolved` decomposition and do not state the structural resolution. Run 001 (`evals/comparisons/with-vs-without-skill-001.md`) showed digested briefs let the model prior score perfect rubrics on 002/003; the discriminating question ("does the designer derive the asymmetry themselves?") was pre-answered by the brief. This run removes that confound.

**Success criteria**:

- Each of the 4 published cases gets a raw brief derived from its case.json by mechanical stripping rules (§2), verified by an independent leak-check agent.
- Each raw brief gets **n=3** independent baseline runs (12 baselines total), scored blind per case by judge agents (12 score sheets).
- A durable record (`evals/comparisons/with-vs-without-skill-002.md`) reports score distributions per case, failure concentration across runs, comparison against Skill output and against run-001 baselines, and honest evidence limits.
- Task bookkeeping updated; no fixture, spec, runtime, or Pages-surface change.

**In scope**:

- Raw-brief derivation **by independent brief-author agents** (one fresh agent per case) + independent leak check.
- 12 baseline runs + 12 blind judge runs (fresh agents, no repo/Skill/conversation access).
- Coordinator synthesis, bookkeeping, commit, push.

**Out of scope**:

- Different model families (unavailable in this environment; recorded as remaining confound).
- Runnable baseline prototypes.
- Fixture changes (case 003/004 hardening remains a separate future cycle; run 002 works around them methodologically, §5).
- Any change to the Skill itself based on findings.

**Constraints**:

- Baselines and judges: same isolation rules as run 001 (no repository, no skill files, no web, no Skill vocabulary in prompts; write nothing to disk).
- Raw briefs must not leak Skill vocabulary or the case's structural resolution; authorship is delegated to independent agents under the neutrality instruction, verified by leak check.
- Judges score interaction assertions only; process assertions (004 E7/E8/F8) are declared out of scope up front, not scored-then-annotated.
- Honest framing: n=3 is still small; same-model-family confound persists in both directions.

## 2. Raw-brief authorship (independent agents)

**Rationale (r2 change).** In r1 the coordinator authored the briefs under self-written stripping rules. That was the plan's weakest validity link: the coordinator is the one role that knows the Skill's answers and later compares baselines against them, so coordinator authorship — even with mechanical rules — leaves motivated-steering exposure (strip just enough that designers fail where the Skill succeeds). The independence required of baselines and judges applies equally to brief authorship upstream.

**Design**:

- One fresh **brief-author agent per case** (4 total, parallel). Each receives ONLY the case's `requirement` and `input` sections verbatim plus the neutrality instruction below. It never sees `expected`/`forbidden`, never sees the repo, and has no conversation history.
- The author makes its own stripping decisions. The coordinator does NOT pre-select sentences to delete; r1's case-specific stripping notes are removed from the author path for exactly this reason.

Neutrality instruction (the only guidance authors receive):

```text
Turn this requirement fixture into a design brief for an interaction designer
who knows nothing about this project. Describe the user's world, the current
observable behavior, and the problem the user or team experiences. Do not
reveal or hint at what a good solution would look like. Do not add design
direction, evaluation criteria, or terminology beyond the fixture's own words.
If the fixture text itself states or implies a solution, describe the
situation without that implication. Output the brief only.
```

**Leak check**: one independent agent receives each authored brief alongside the case's `expected`/`forbidden` lists and flags any brief sentence that states or strongly implies an expected/forbidden resolution. Flagged briefs go back to their original author agent (resumed, keeping its rationale context) for one revision + one re-check before baselines run.

**Why not a new WorkBuddy session**: subagents are functionally equivalent to a fresh session — no conversation memory, prompt-only input. A manual new session adds handoff cost and breaks single-pipeline auditability without adding independence.

**Residual confound (recorded)**: the coordinator still writes all agent prompts, including the neutrality instruction — framing influence at one remove. Same-model-family confound unchanged.

## 3. Method deltas from run 001

- **Brief authorship is independent** (r2): fresh brief-author agents replace coordinator authorship; neutrality instruction is the only guidance; leak check verifies outcome.
- Raw briefs replace digested briefs: no `known`/`unresolved` decomposition, no resolution-stating narrative — unless a brief-author independently judges fixture text as non-revealing.
- n=3 per case (12 baselines) instead of n=1 — bounds single-run variance now that outcomes are expected to diverge.
- Judges receive a short **rubric notes** block where an assertion is not self-contained (004 F1: "All templates" and "Text image" are the fixture's genericized labels, not real brand names) — prevents repeat of the run-001 mis-score. Fixtures themselves stay frozen.
- Process assertions (004 E7/E8/F8) excluded from judging with the reason recorded.
- Baseline and judge prompt contracts otherwise unchanged from run 001 (validated there).

## 4. Work phases

```text
P1 4 brief-author agents (one per case, parallel) produce raw briefs per §2
P2 Independent leak-check agent verifies all 4 (flagged briefs → original author revises → one re-check)
P3 12 baseline agents (3 per case; spawned in waves of 4-6 to bound concurrency)
P4 12 blind judge agents (same waves, after their baselines)
P5 Contamination scan + score-sheet sanity (assertion↔rubric 1:1 mapping)
P6 Synthesis: per-case score distributions, failure concentration, vs Skill output, vs run-001
P7 Write evals/comparisons/with-vs-without-skill-002.md
P8 Update tasks/active/tamagui-prototype-runtime.md (Next #2 result)
P9 node evals/validate-cases.mjs → commit → push → archive plan
```

## 5. Action ownership

| Action | Class | Owner | Evidence |
|---|---|---|---|
| P1 raw briefs | CRITICAL_PATH | 4× independent brief-author agents | 4 brief texts |
| P2 leak check | CRITICAL_PATH | 1 independent agent | leak report |
| P3 baselines | CRITICAL_PATH | 12× general-purpose agents | 12 design docs |
| P4 judging | CRITICAL_PATH | 12× general-purpose agents | 12 score sheets |
| P5–P8 | CRITICAL_PATH | coordinator | record + task diff |
| P9 publish | CRITICAL_PATH (external: push) | coordinator | pushed commit |

Delegation rationale unchanged from run 001: independent contexts are the core validity requirement. Resume/stop: vocabulary contamination or self-reported forbidden reading → discard + fresh re-run.

## 6. Expected changed files

```text
A  evals/comparisons/with-vs-without-skill-002.md
M  tasks/active/tamagui-prototype-runtime.md
```

No changes under `evals/cases/`, `prototypes/`, workflows, or Pages assembler paths.

## 7. Validation and review plan

- Leak check (P2) before any baseline runs.
- Contamination scan of all 12 baseline docs (Skill vocabulary list from run 001 + any leak-check flags).
- Judge sanity: every score sheet maps 1:1 to the case's interaction assertions.
- `node evals/validate-cases.mjs` must pass.
- Coordinator self-review; scoring independence from blind judges; synthesis not independently reviewed — stated in the record.

## 8. Permission-requiring or irreversible actions

- `git push` to `origin/skill/init-affordance-design` (routine docs publish; reversible). Agents are read-only.

## 9. Risks, assumptions, fallbacks

- **Risk**: brief authors leak the resolution despite the neutrality instruction → independent leak check (P2) with author-side revision loop.
- **Risk**: brief authors over-strip, leaving a case under-specified (designer cannot proceed) → record as fixture-quality finding; do not guess on the designer's behalf.
- **Risk**: n=3 still small; same-family confound persists; coordinator retains prompt-framing influence (§2) → frame conclusions as second-pass signal; multi-family and external authorship remain follow-ups.
- **Risk**: wave size strains concurrency → waves of 4-6 agents; sequential fallback.
- **Assumption**: brief authors can distinguish "observable behavior" from "resolution" in the 001/002 current_state narratives; P2 verifies the outcome.

## 10. Completion definition

- Record committed with: raw briefs verbatim, leak-check outcome, 12 baseline summaries, 12 score-sheet verdict tables, per-case distributions, cross-run and vs-Skill synthesis, evidence limits.
- Task file records the outcome.
- Pushed; plan archived to `.plans/completed/`.
