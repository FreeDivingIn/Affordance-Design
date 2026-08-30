# With-Skill vs Without-Skill Structural Comparison

Status: COMPLETE
Revision: 1
Approval: APPROVED r1
Updated: 2026-08-29

## 1. Confirmed basis

**Goal**: Run the first with-Skill vs without-Skill structural comparison, as planned in `tasks/active/tamagui-prototype-runtime.md` (Next #5). Four structurally distinct Evals are published; the "independent execution environment" requirement is now satisfiable by spawning fresh agents that never load the affordance-design skill or read this repository.

**Success criteria**:

- Each published case gets one independent without-Skill baseline design, generated from its canonical `case.json` requirement brief only.
- Every baseline is scored blind against the case's own expected/forbidden behaviors (from `case.json`), without seeing the Skill's answer during scoring.
- A durable comparison record states per-case structural differences between baseline and Skill output, honestly framing evidence limits (n=1 per case, same-model-family confound).
- Task file updated with results; the comparison does not modify any frozen spec, runtime, or case fixture.

**In scope**:

- Cases 001–004, one baseline run each (4 independent agents, parallel).
- One blind-scoring pass per case (fresh judge agent sees only baseline + case.json, never the Skill output).
- Coordinator synthesis into `evals/comparisons/with-vs-without-skill-001.md` (new directory).
- Task bookkeeping + commit + push.

**Out of scope**:

- Runnable prototypes for baselines (spec-level comparison only; building 4 runtimes is disproportionate for a first pass).
- Statistical rigor (multiple runs per case, different model families) — recorded as follow-up.
- Native/keyboard/accessibility validation.
- Any change to the Skill itself based on findings (findings feed a later alignment cycle).

**Constraints**:

- Baseline agents must not read this repository, any skill file, or prior conversation; they receive only the requirement brief text and a format instruction. Their prompt must not leak Skill vocabulary (e.g. "problem state", "capability space", "anti-average") to avoid priming.
- Judge agents must not see the Skill's interaction specs or reviews.
- Baseline designs are reviewer evidence, not product artifacts; they live outside `evals/cases/` (which is the published case surface) in a separate `evals/comparisons/` directory... actually: comparisons are eval-suite meta-evidence, so they live in `evals/comparisons/` but are NOT linked into the published Pages catalog (no deploy impact).
- Honest framing: n=1 per case; a good baseline design is evidence about the model, not proof the Skill adds nothing.

## 2. Proposed approach and rationale

```text
case.json requirement brief
→ baseline agent (no Skill, no repo) produces structural design doc
→ blind judge agent scores baseline vs case.json expected/forbidden
→ coordinator compares scored baseline against the already-reviewed Skill output
→ comparison record
```

The Skill side needs no new work: frozen specs, CI assertions, and structural reviews already exist per case. Only the baseline side is generated.

Baseline prompt contract (per case, verbatim brief from case.json + generic instruction): "Design the interaction structure: what the user sees first, what questions are asked in what order, what context already known is reused vs re-asked, state transitions, and recovery behavior. Output a structured document." No Skill terminology.

Judge prompt contract: case.json expected + forbidden lists + baseline doc → per-assertion PASS/FAIL/PARTIAL with one-line evidence. Judge never sees Skill material.

## 3. Work phases and dependencies

```text
P1 Extract the four requirement briefs from case.json files (read-only, coordinator)
P2 Spawn 4 baseline agents in parallel (one per case) — independent contexts
P3 Spawn 4 blind judge agents in parallel (baseline + case.json only)
P4 Coordinator synthesis: per-case structural comparison vs Skill output
P5 Write evals/comparisons/with-vs-without-skill-001.md
P6 Update tasks/active/tamagui-prototype-runtime.md (Next #5 result)
P7 validate-cases.mjs → commit → push
```

## 4. Action ownership

| Action | Class | Owner | Evidence |
|---|---|---|---|
| P1 brief extraction | CRITICAL_PATH | coordinator | 4 brief texts |
| P2 baseline runs | CRITICAL_PATH | 4× general-purpose agents | 4 design docs |
| P3 blind scoring | CRITICAL_PATH | 4× general-purpose agents | 4 score sheets |
| P4–P5 synthesis | CRITICAL_PATH | coordinator | comparison record |
| P6 bookkeeping | CRITICAL_PATH | coordinator | task file diff |
| P7 publish | CRITICAL_PATH (external: push) | coordinator | pushed commit |

Delegation rationale: baseline and judge agents MUST be independent contexts with no access to this conversation — this is the core validity requirement, not a convenience. Coordinator owns synthesis and acceptance.

## 5. Agent assignments

- **baseline-001 … baseline-004** (general-purpose, default model): given one case's requirement brief verbatim + format instruction; forbidden from reading the repository, any SKILL.md, or web resources on "affordance design"; return a structural design doc (<800 words). Read-only research-type task; they write nothing to disk — coordinator saves outputs.
- **judge-001 … judge-004** (general-purpose, default model): given case.json expected/forbidden + one baseline doc; score each assertion PASS/FAIL/PARTIAL with evidence; never shown Skill material; write nothing to disk.
- Concurrency: P2 four in parallel; P3 four in parallel after P2. No writes to shared files.
- Resume/stop: if a baseline agent reads forbidden material (self-reported or evident from output vocabulary), discard and re-run with a fresh agent.

## 6. Expected changed files

```text
A  evals/comparisons/with-vs-without-skill-001.md   (comparison record incl. baseline docs + score sheets as appendix)
M  tasks/active/tamagui-prototype-runtime.md        (Next #5 result, comparison conclusion)
```

No changes under `evals/cases/`, `prototypes/`, `.claude/`, or workflows. Pages deploy unaffected (`evals/comparisons/` is not in the Pages assembler paths).

## 7. Validation and review plan

- Contamination check: scan baseline outputs for Skill vocabulary ("problem state", "capability space", "anti-average", "access path" as jargon); presence triggers re-run.
- Score-sheet sanity: judge assertions must map 1:1 to case.json expected/forbidden items.
- `node evals/validate-cases.mjs` must still pass (nothing case-related changed).
- Self-review by coordinator; judge agents provide scoring independence for baselines, but the final comparison is not independently reviewed — stated in the record.

## 8. Permission-requiring or irreversible actions

- `git push` to `origin/skill/init-affordance-design` (routine docs publish; reversible). No other external actions; agents are read-only.

## 9. Risks, assumptions, fallbacks

- **Risk**: baseline agents produce Skill-like designs from model prior → comparison shows no difference. Handling: report honestly as inconclusive for those cases; that IS the finding.
- **Risk**: vocabulary contamination → discard + fresh re-run (per §5).
- **Risk**: n=1 variance → frame conclusions as first-pass; recommend multi-run follow-up if signal is ambiguous.
- **Assumption**: case.json briefs are self-sufficient (they were designed to be, per Milestone 8 contract).
- **Fallback**: if a case.json brief is insufficient for an independent designer, record that as a fixture-quality finding instead of guessing.

## 10. Completion definition

- Comparison record committed with: per-case baseline doc, blind scores, structural diff vs Skill output, evidence-limit framing.
- Task file records the comparison outcome.
- Pushed; plan archived to `.plans/completed/`.
