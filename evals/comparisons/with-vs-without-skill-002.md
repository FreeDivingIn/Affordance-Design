# With-Skill vs Without-Skill Structural Comparison — Run 002 (Raw Briefs)

Date: 2026-08-30
Plan: `.plans/raw-brief-comparison-002.md` r2 (approved)
Method: raw briefs authored by independent brief-author agents from each case's `requirement`+`input` fixture sections only (no `expected`/`forbidden`, no `known`/`unresolved` decomposition presented as scaffolding, no resolution-stating narrative), verified by an independent leak-check agent; n=3 independent baseline designs per case by fresh agents; each baseline scored blind by a separate judge agent against the case's interaction assertions; coordinator synthesis against the already-reviewed Skill outputs and against run 001 (`with-vs-without-skill-001.md`).

This document is eval-suite meta-evidence. It is not linked into the published Pages catalog and does not modify any case fixture, frozen spec, or runtime.

## Evidence limits (read first)

- **n=3 per case.** Enough to bound single-run variance, not enough for distribution claims.
- **Same-model-family confound, both directions, now at three points.** Brief authors, baseline designers, and blind judges all come from the same model family; the Skill-side generation does too. A strong baseline may reflect model prior rather than proof the Skill adds nothing.
- **The raw-brief method moved the confound rather than removing it.** Leak-checked raw briefs still describe the *information asymmetry* of each situation as observable fact (e.g. case 003: the drop supplies the destination). Any faithful problem description carries the seed of its resolution; what raw briefs remove is the pre-digested `known`/`unresolved` scaffolding, not the situation itself. See cross-case finding 1.
- **Leak-freedom trades against constraint-completeness.** One genuine fixture constraint (case 004 E1: preserve the complete capability set in the baseline) was itself resolution-leaking and was stripped during leak revision. Case 004 E1/F2 scores below are therefore partly an artifact of the method, annotated per case.
- **Coordinator framing influence at one remove.** The coordinator wrote all agent prompts, including the neutrality instruction; brief authorship was independent, prompt framing was not.
- **Spec-level only.** Baselines are design documents, not runnable prototypes.
- **Synthesis not independently reviewed.** Baseline scoring is independent (blind judges); brief verification is independent (leak-check agent); the final comparison synthesis is coordinator self-review.

## Contamination check

All 12 baseline documents were scanned for Skill vocabulary (`problem state`, `capability space`, `anti-average`, `access path` as jargon). No contamination found. "Capability catalog/menu" in case-002 baselines originates from the fixture's own `current_state` wording carried through the brief. "Affordance" appears in case-004 baselines only as generic UX vocabulary ("collapse affordance"), not as Skill jargon. No baseline agent reported or showed evidence of reading the repository or any skill file.

## Score-sheet sanity

Every score sheet maps 1:1 to its case's scored interaction assertions: 001 → E1–E7 + F1–F6 (13); 002 → E1–E8 + F1–F6 (14); 003 → E1–E7 + F1–F6 (13); 004 → E1–E6 + F1–F7 + F9 (14). Case 004 process assertions (E7/E8/F8) were declared out of scope in the judge prompt up front, with the reason recorded; judges for 004 also received the rubric note that "All templates" and "Text image" are the fixture's genericized labels, not real brand names (preventing a repeat of the run-001 F1 mis-score — no F1 mis-score occurred).

## Summary of blind scores (162 assertions across 12 runs)

| Case | Run a | Run b | Run c | Non-PASS concentration |
|---|---|---|---|---|
| 001 Bulk Assignment (13) | 13 PASS | 12 PASS / 1 FAIL | 13 PASS | F6 FAIL in run b (judge-strictness variance, annotated) |
| 002 Merge Command Contract (14) | 14 PASS | 14 PASS | 14 PASS | none |
| 003 Move Access Paths (13) | 12 PASS / 1 PARTIAL | 12 PASS / 1 PARTIAL | 13 PASS | F5 PARTIAL (a), E7 PARTIAL (b) |
| 004 Media + Template Composer (14) | 12 PASS / 1 PARTIAL / 1 FAIL | 14 PASS | 13 PASS / 1 PARTIAL | E1 FAIL (a) / E1 PARTIAL (c) — method artifact, annotated; F2 PARTIAL (a) |

**Totals: 156 PASS / 4 PARTIAL / 2 FAIL (96.3% PASS).**

Against run 001 (digested briefs, n=1): run-001's only scored structural failure (001 F4 confirmation creep under platform pressure) did **not** recur in any of the three run-002 001 baselines — all commit technician choice immediately on both pointer and touch. Run-001's perfect cases (002, 003) remain perfect-to-near-perfect at n=3. The run-001 004 mis-score class (F1) did not recur under the rubric note.

---

## Case 001 — Bulk Assignment

### Blind score sheets (verbatim verdicts)

- **judge-001-a** (agent-d2d2cf58): E1–E7 all PASS; F1–F6 all PASS.
- **judge-001-b** (agent-148193dc): E1–E7 all PASS; F1–F5 PASS; **F6 FAIL** — "The document itself contains reviewer-facing rationale ('Why This Matches the Work', 'What Is Reused vs. Re-asked'); as a spec this is acceptable, but nothing in the document states these explanations are excluded from the prototype, so it cannot be verified as absent from the product."
- **judge-001-c** (agent-59553e5e): E1–E7 all PASS; F1–F6 all PASS.

### Coordinator annotation

The F6 FAIL in run b is a **judge-strictness variance, not a design defect**: the baseline document describes product UI only (popover, toast, queue states); the judge failed it because the document did not explicitly *state* that its rationale sections would be excluded from the product surface. Judges for runs a and c scored F6 PASS on materially identical document structure. Kept verbatim; treated as measurement noise in synthesis. This is the n=3 dividend: run 001's n=1 could not distinguish a one-off judge reading from a designer failure.

### Structural difference vs Skill output

All three baselines independently arrived at the Skill's structure: scope echoed not re-asked, single technician question, immediate commit on selection on both pointer and touch, Undo-carrying toast, dismissal preserving the multi-selection. Run-001's F4 failure mode (re-introducing a confirmation stage under touch pressure) appeared in 0/3 runs. Remaining differences are detail-level, not structural: baselines diverge among themselves on whether the selection clears after commit (a/c clear, b retains for chaining), and all three add suggestion-ranking of technicians — competent product thinking beyond fixture scope.

---

## Case 002 — Merge Command Contract

### Blind score sheets (verbatim verdicts)

- **judge-002-a** (agent-545dc4d9): E1–E8 all PASS; F1–F6 all PASS.
- **judge-002-b** (agent-3da197a3): E1–E8 all PASS; F1–F6 all PASS.
- **judge-002-c** (agent-620617e4): E1–E8 all PASS; F1–F6 all PASS.

### Structural difference vs Skill output

No scored failures, replicating run 001 at n=3. More importantly, the two strictness-level differences observed in run 001 **replicated in all three run-002 baselines**, making them the most stable with/without-Skill divergence this suite has produced:

1. **Suggested-default primary (3/3 runs).** Every baseline pre-selects a recommended primary record (completeness/recency heuristic) and labels it ("Suggested", "default pre-proposed", "currently designated primary"). The Skill output proceeds to the primary-record question with both options symmetric — the single remaining decision stays fully user-owned. The model prior consistently resolves part of the one decision the fixture leaves unresolved.
2. **Separate commit button (3/3 runs).** Every baseline commits via an explicit primary button ("Merge", "Merge into [Primary Name]", "Merge contacts") after the primary choice. The Skill output commits **directly on primary selection** with Undo carrying recoverability — one fewer step. Blind judges accepted the button as non-redundant in all runs (the panel resolves new information: field comparison), so this does not score as F4, but it is a consistent structural divergence.

Framing: with raw briefs, case 002's rubric remains satisfiable from model prior — but the prior's *manner* of satisfying it is consistent (defaults + explicit commit), and differs from the Skill's stricter reading of "only the unresolved decision" in exactly the same way across 4 independent designs (1 in run 001 + 3 here). This is now a replicated signal, not a one-off.

---

## Case 003 — Move Access Paths

### Blind score sheets (verbatim verdicts)

- **judge-003-a** (agent-8b18d954): E1–E7 all PASS; F1–F4 PASS, **F5 PARTIAL** — default click-to-execute with no re-confirmation, but a confirmation is inserted on constraint conflict (overload approval); "targets new uncertainty… basically compliant but does not fully eliminate the possibility of redundant confirmation."
- **judge-003-b** (agent-020d133f): E1–E6 PASS, **E7 PARTIAL** — touch adapts drag presentation but never explicitly states touch can use the explicit Move command path; F1–F6 all PASS.
- **judge-003-c** (agent-767639a7): E1–E7 all PASS; F1–F6 all PASS.

### Structural difference vs Skill output

Structurally near-identical to the Skill output in all three runs: destination asked only on the command path, drop target answers the drag path, shared After state/Toast/Undo, invalid drop as silent no-op, no forced identical steps.

**The central run-002 question — does the designer derive the asymmetry themselves? — is answered: yes, 3/3.** Each baseline independently produced the asymmetry argument in its own vocabulary ("落点即答案 / slot already filled", "提问一次且只提问一次 / ask each unresolved question exactly once", "落点是该环节的一种回答方式 / the drop is one way of answering the destination stage"). Two of three additionally framed forced uniformity as "trust loss" (系统无视了用户刚刚亲口给出的答案).

**But the honest reading requires the evidence-limit above:** the leak-checked raw brief still states, as observable fact, that "a valid drop onto a depot has already specified the destination; no destination question remains after the drop." The leak check correctly classified this as information-state description, not resolution — yet it hands the designer the asymmetry's raw material. What run 002 shows is that the discriminating power of case 003 does not survive *any* faithful description of the situation, digested or raw. The convergence is evidence about the situation's transparency to the model prior, not about the Skill's redundancy — and the Skill's contribution on this case was never in doubt at the *derivation* level; its guards operate at the discipline level (not re-adding the question later under consistency pressure), which spec-level judging cannot stress.

---

## Case 004 — Media + Template Composer

### Blind score sheets (verbatim verdicts)

- **judge-004-a** (agent-4f99c46f): **E1 FAIL** — "Document never inventories a current-state baseline; it opens directly with 'The acquisition panel is replaced by a single Attach control'"; E2–E6 PASS; F1 PASS, **F2 PARTIAL** — capabilities preserved but "eliminating the separate Video tab as an entry-level decision" restructures rather than neutrally carries baseline entries; F3–F7 PASS, F9 PASS.
- **judge-004-b** (agent-3c8e81b1): E1–E6 all PASS ("The composer opens in its current form… The tab bar still exists, but one level deeper"); F1–F7 all PASS, F9 PASS.
- **judge-004-c** (agent-b8ca3d24): **E1 PARTIAL** — "Baseline capabilities only referenced in passing… no explicit current-state capability inventory precedes the redesign"; E2–E6 PASS; F1–F7 all PASS, F9 PASS.

### Coordinator annotations to the score sheets

- **E1/F2 scores are partly a method artifact.** E1 ("preserve the complete current-state capability set in the baseline before proposing optimization") is a constraint whose statement leaks the resolution — the leak check flagged exactly that sentence in brief-004 v1, and the author removed it. Run-002 baselines were therefore never told that baseline preservation was required. That 2/3 still substantially preserved the four families (and the third restructured rather than deleted) is the signal; the E1 FAIL/PARTIAL verdicts measure the stripped brief as much as the designers. Recorded as a raw-brief-method finding, not a baseline defect: **leak-free authorship and constraint-complete briefs are in direct tension for assertions of the "preserve X" type.**
- The F1 rubric note worked: all three judges correctly treated "All templates"/"Text image" as fixture labels (F1 PASS ×3), no repeat of the run-001 mis-score.

### Structural difference vs Skill output

The most consequential cross-run shift in this comparison. Run-001's single 004 baseline optimized *within* the existing taxonomy (kept four peer tabs, added a recommendation row inside the template tab) — the opposite of the Skill output's problem-state-first re-sequencing. All three run-002 baselines, given the rawer brief, **converged toward the Skill's direction on their own**: an intent-first entry ("Add a photo or video" / "Make a visual from this post" / game-assets-or-catalog third option), draft-context-driven template recommendations with live pre-filled previews, permission friction demoted from leading position, and insert-and-return-to-text commit. The run-001 taxonomy-first/prior-first divergence did not replicate.

Remaining Skill-distinctive elements, still visible at n=3:

1. **Proactive, contextually-gated suggestion.** None of the three baselines proposed surfacing illustration intent *outside* the acquisition flow (the Skill output's `给这段内容配张图`, gated on a modeled natural break). Run b's publish-step nudge ("Add a visual? Recommended for this topic") is the closest approximation — and it fires at the wrong moment (after composition intent is complete) and without gating.
2. **Constraint-preserving restructuring.** The Skill output re-sequences questions *while keeping* the full four-family capability set and panel density (fixture E1). The baselines restructured more freely (folding Video into device media, demoting the catalog) — partly because the constraint was stripped from their brief (see annotation), partly because unconstrained redesign is the prior's default move.
3. **Provisional-candidate commit semantics.** The Skill output's generation flow produces provisional candidates (`选择一个候选` + `重新生成`) with explicit `插入正文` commit, draft never modified. Baselines approximate this ("preview pre-filled with draft content", "insert is immediate and undoable") but none separates candidate-generation from commit as crisply.

Framing: for case 004, rawer briefs moved the model prior *toward* the Skill's structure, shrinking the measured spec-level gap. What remains distinctive is the parts of the Skill's contribution that a one-shot design document cannot exhibit (proactive gating, constraint-preservation discipline, frozen-baseline process).

---

## Cross-case findings

1. **The model prior is strong at this abstraction level even with raw briefs — because faithful problem descriptions carry the resolution's seed.** Run 002 removed the `known`/`unresolved` scaffolding and the resolution-stating narratives; 156/162 assertions still scored PASS. The leak check's own taxonomy explains why: describing *observable information states* is legitimate brief content, and the information asymmetry IS the resolution's raw material for cases 001–003. Measuring "what the Skill's decomposition step contributes" requires a situation whose asymmetry is not directly observable — none of the four current fixtures provides that at spec level. This is a suite-coverage finding, not a null result.
2. **The replicated divergence is now case 002's, not case 001's.** Run-001's 001 F4 failure (confirmation creep under platform pressure) did not recur in 3 runs — as a single-run event it cannot be called a stable prior failure mode. Case 002's suggested-default + separate-commit pattern replicated 3/3 (4/4 across both runs) and is the suite's most stable with/without-Skill structural divergence: the prior consistently pre-resolves part of the final decision and adds an explicit commit surface; the Skill holds the decision fully open and commits on selection.
3. **n=3 separated judge noise from designer signal.** The 001-b F6 FAIL (a verifiability-strict reading of a PASS-structured document) and the 003 PARTIALs are single-occurrence verdicts against twice-replicated PASS structure — classifiable as measurement noise with n=3, indistinguishable from signal at n=1.
4. **Raw-brief authorship has a fundamental tension with "preserve X" assertions.** A constraint that says "keep the existing capability set" is simultaneously a requirement and a resolution hint. Leak-free briefs must strip it; stripped briefs make the assertion partially unscorable. Case 004 E1/F2 scores this run should be read with that annotation. Fixture-hardening follow-up: such constraints may need to be scored only in digested-brief runs, or the fixture split into "world description" (leak-checkable) and "explicit constraints" (declared as requirements, not hints) sections.
5. **Process value remains invisible at spec level** (unchanged from run 001): proactive gating, frozen-baseline discipline, evidence separation, and surface purity appear in no one-shot design document; run-002's method artifact (finding 4) demonstrates the same gap from the opposite side.

## Follow-ups (not in this scope)

- Different model families for baselines/judges — the largest remaining confound, unchanged from run 001.
- Fixture hardening cycle: case 003 remains low-discriminating even raw (situation is self-describing); case 004 needs the world-description/constraint split from finding 4; both enter their own alignment cycles.
- A suite addition targeting derivation-from-opacity: a case whose structural asymmetry is NOT observable in the situation description, so the raw-brief method can actually stress the decomposition step.
- Runnable baseline prototypes for behavioral comparison, if a third spec-level run adds no new signal.
- Multi-run (n≥3) comparison becomes the default protocol for future with/without runs; n=1 results should be treated as unclassifiable noise per finding 3.

---

## Appendix A — Raw briefs (verbatim, post-leak-check)

Brief authorship: 4 independent brief-author agents (001: agent-390582a9; 002: agent-a6a6a52f; 003: agent-fe2e73d7; 004: agent-0e305493), each given only the case's `requirement`+`input` fixture text and the neutrality instruction (plan §2). Leak check: one independent agent (agent-5f1c72ed) against each case's `expected`/`forbidden` lists. Outcome: 003 CLEAN on first pass; 001/002/004 FLAGGED (normative goal/requirement sentences mapping to E5; E2/E3/E4/E6; E1/E5/E6 respectively), returned to original authors for one revision each; re-check CLEAN for all three. Flagged-and-removed content is summarized in the per-case annotations; the texts below are the final, leak-checked versions given to all baseline agents.

### A.1 Case 001 raw brief

# Design Brief

## Who the user is

A field-operations coordinator manages a shared work queue throughout the day. Their job is triage: continuously reviewing incoming and pending work orders and making sure each one ends up with the right technician. This is repetitive, high-frequency work woven into the rest of their day, not a task they sit down to do once.

## The user's situation

The coordinator works inside the queue. A common pattern in their day: they spot several work orders that should all go to the same technician, select them together, and act on them as a group — without leaving the queue or losing their place in it.

The queue already supports this pattern at a basic level. The coordinator can select multiple work orders at once, and an Assign action exists. The coordinator uses both: they have several work orders selected, and they have explicitly invoked Assign. At that moment, two things are already established — which work orders are in scope, and what the coordinator intends to do with them. What is not yet established is which technician should receive them.

## Current observable behavior

When the coordinator invokes Assign on an existing multi-selection, the system does not carry that moment forward. Instead, the assignment flow begins as if nothing had happened yet. It treats the invocation as the start of a new, generic assignment process:

- It re-establishes the target context — asking the coordinator to specify, again, what is being assigned, even though the selected work orders are right there and were the reason the action was invoked.
- It introduces additional decision and confirmation steps along the way, before the assignment can be completed.

From the coordinator's perspective, they told the system what they wanted to do and to which items — and the system responded by starting over.

## The problem experienced

The coordinator is performing this batch assignment many times a day, always in the same way: select, invoke, done. Each repetition currently costs them redundant re-specification of things the system could already know, plus extra steps between intent and outcome. The flow is built as if every assignment were a fresh, context-free decision, when in practice most assignments arrive with their context already established by the user's own actions immediately beforehand.

The team regards this as an optimization problem rather than a missing capability: the feature exists and works, but the experience of using it does not match how coordinators actually work. The friction accumulates quietly — no single assignment is broken, yet the mismatch between the user's established context and the flow's blank-slate behavior is felt on every repetition, across every coordinator, every day.

### A.2 Case 002 raw brief

# Design Brief: Contact List Merge Interaction

## The User's World

A person maintains a contact-management list and periodically cleans up duplicate records. Their routine: when they notice two records that appear to represent the same person, they select exactly those two records and invoke an explicit **Merge** command.

The product supports this workflow. When two contacts are selected and Merge is invoked, the system is capable of combining them. It can preserve a pre-merge snapshot so the merge can later be undone, and after a merge, one of the two selected records must remain as the primary identity.

## Current Observable Behavior

When the user selects two contacts and invokes Merge, the system does not respond to that specific command. Instead, it opens a broad menu containing several unrelated capabilities:

- Merge
- Export
- Add tags
- Find duplicates
- AI cleanup

The user — who has already chosen which records to combine and already committed to merging them — is presented with this general catalog of contact-management options and must navigate it before the merge can proceed.

## The Problem

The interaction treats a committed, specific command as an invitation to browse capabilities. The user has already made two decisions — *these two records*, *merge them* — and the current behavior effectively asks them to re-encounter that decision inside a menu of options they did not ask for.

This matters for two reasons:

1. **Diversion from an in-progress task.** The user arrives mid-task with a clear intent. Being diverted into a general capability catalog interrupts a cleanup routine that depends on moving through duplicates efficiently and with confidence.

2. **Clarity of the outcome.** A merge combines two records into one identity. At present, the interaction gives the user no moment to be clear about what the merge produced — in particular, which of the two selected contacts remains as the primary record afterward. The product can preserve a pre-merge snapshot, so a completed merge can be undone later.

## What Is Known and What Is Open

**Known at the moment of invocation:**
- Exactly two contact records are selected.
- The user explicitly invoked Merge.
- A pre-merge snapshot can be preserved for Undo.

**Open question the user must resolve during the interaction:**
- Which of the two selected contacts should remain the primary record?

## The Design Task

Given this situation: what should happen when a user who has already selected two contacts invokes Merge?

### A.3 Case 003 raw brief

# 设计简报：货运调度中的运单移动

## 用户的世界

物流调度员在一个工作区中工作，屏幕上的多个目的地堆场（depot）与处于活动状态的运单（shipment）同时可见。调度员的日常工作之一，就是把一张运单从一个堆场转移到另一个堆场。

完成这件事有两条操作路径：

- **显式操作路径**：调度员对一张运单使用 Move 命令。
- **直接操作路径**：使用指针的调度员可以把运单直接拖拽到某个可见的目的地堆场上。

无论走哪条路径，被移动的运单在操作开始前都是已知的。系统也保留了运单原先所在的堆场，之后可以通过 Undo 恢复。

## 当前可观察的行为

两条路径目前都存在，且都能完成移动，但它们在"目的地如何确定"这一点上表现不同：

- **命令路径**：Move 命令本身并不携带目的地。运单已知，但"应该移到哪个堆场"这个问题在此刻仍未解决，需要在操作过程中补充回答。
- **拖拽路径**：一次有效的拖放落到某个堆场上时，落点本身已经指定了目的地。放下之后，关于目的地不再有任何悬而未决的问题。

## 存在的问题

团队希望两条路径在操作上保持一致——都经历相同的目的地确定环节。然而这两条路径的起点并不对等：

- 在命令路径中，目的地是一个真实悬而未决的问题，确实需要向调度员提出。
- 在拖拽路径中，目的地已经通过拖放的落点被调度员亲口回答了。

如果两条路径被统一为同一套流程，走拖拽路径的调度员在已经用落点表达了目的地之后，仍会被再次问及同一个问题——而这一次提问不再有未解决的信息支撑。团队希望理解：在这种信息不对等的两条路径之间，一致性应该意味着什么，以及拖拽路径上那种重复询问的感受应当如何被看待。

## 需要你设计的

为"在活动工作区中移动运单"这一任务设计交互行为，使两条路径各自的信息状态——命令路径的目的地未定、拖拽路径的目的地已定——都能得到恰当对待。

### A.4 Case 004 raw brief

# Design Brief: Visual Content in a Mobile Composer

## The User's World

The user is a mobile user writing a text-first post. While drafting, they may want to attach visual content — either media captured or stored on their device, or a visual asset created from a template — before publishing. Their primary task is finishing a publishable post; attaching visuals is secondary and happens while the draft is still in progress, with the user's attention on the text they are writing.

The team behind the product wants more published posts to contain useful visual content, and wants templates to be used more successfully.

## The Current Experience

The user composes in a mobile editor that contains:

- A content-type header and a Draft control
- Title and body editing fields
- Section/topic metadata entry
- Emoji, mention, add, and settings utilities

Below the editor sits a large acquisition panel offering four peer sources of visual content: **Album**, **Video**, **Game assets**, and **All templates**. Switching between these sources leaves the draft editor visible above, so the draft remains the user's primary context while the panel is open.

In the **Album** tab, the user sees a limited-photo-permission message with a Settings call-to-action, positioned above a camera tile and a grid of selectable device media. This means photo access friction, camera acquisition, and device media selection all coexist in one view.

In the **All templates** tab, the same panel becomes a heterogeneous template catalog. Generic functional entries — such as "All templates" and "Text image" — appear alongside entertainment- and game-like template generators of different styles and purposes.

## What Is Known and Unknown

Observed directly: the Album state (permission message, camera tile, media grid) and the All templates state (mixed generic and themed entries).

Not yet established:

- The exact publish flow and what happens after content is inserted
- The downstream structure of the Video and Game assets tabs
- How templates are configured and committed into a draft
- Whether templates automatically use the draft's title, body, or topic context
- The exact behavior of the content-type selector and Draft control

## The Situation

Today, a user mid-draft who wants visual content must work within a lower panel that bundles four distinct capability families as equal peers. One family (Album) leads with a permission obstacle before showing media. Another (All templates) presents a mixed catalog where generic functional tools and themed entertainment generators sit side by side, with no evident connection to what the user is currently writing.

The user's situation is that they are writing a post and may or may not attach visual content along the way. The team observes that published posts less often contain visual content, and templates are used less successfully, than they would like. How the user currently moves between "writing a post" and "this post has a visual attached" — and where that path loses people — is the space this work addresses.

---

## Appendix B — Baseline design documents (structure summaries)

Baseline agents (no repository, no skill files, no web; brief + format instruction only; nothing written to disk):

### B.1 Case 001 baselines

- **001-a** (agent-d31e7407): "Continue, don't restart" — anchored popover (desktop) / bottom sheet (touch) with scope-echo header ("Assign 7 work orders to:"); single technician question with suggested-first ranking and search; immediate commit on click/tap/Enter; toast with Undo (~5s), batch as one undo unit; selection clears on commit, preserved on dismiss; partial-failure scoped retry.
- **001-b** (agent-0d59b458): same skeleton; scope echo read-only ("the queue is the scope editor"); selection **retained** after completion for chaining; long-press/right-click extras (note, priority) hidden off the fast path; pointer/touch presentation table with identical semantics.
- **001-c** (agent-6fd16278): same skeleton; selection clears on success; live-queue conflict handling ("Assign remaining N" on mid-flow claim); explicit non-goals (no re-selection, no mandatory confirmation, no per-order splitting).

### B.2 Case 002 baselines

- **002-a** (agent-fe33a3de): Merge Sheet immediately (modal/bottom sheet); two contact cards with field-diff; cards as primary-selection controls; "Suggested" pre-selected default; merged-result preview with secondary-kept conflicts; explicit "Merge" button; result toast with Undo; cancel preserves selection.
- **002-b** (agent-d43aff24): comparison card pair; completeness-based default primary with "Swap primary"/"Make primary"; live field-conflict preview; commit button named "Merge into [Primary Name]"; snapshot automatic ("communicated, never re-queried"); toast with Undo; failure reopens review with decision intact.
- **002-c** (agent-105b3baa): immediate merge review replacing the menu; card-as-control primary choice with "Suggested" default; "Merge contacts" button enabled from open; post-merge toast + snapshot-backed Undo; capability menu explicitly removed from the committed path.

### B.3 Case 003 baselines

- **003-a** (agent-1089f057): slot-filling model (destination as a slot filled by question or by drop); command path enters destination-selection mode with legal-depot highlighting, current depot disabled, click-to-commit, confirmation only on constraint conflict; drag path: hover legality feedback, drop commits, invalid drop rebounds silently; shared After state with toast + Undo; touch adapts drag feedback, command path primary.
- **003-b** (agent-44afe934): one state machine ("运单已知 → 目的地确定（提问或已答）→ 提交 → 反馈 → 可撤销"), the destination state "skipped, not re-enacted" on the drag path; in-place destination panel on command path; invalid drop as silent rebound ("回弹本身就是答案"); touch: press-and-drag adaptation.
- **003-c** (agent-9825ba4d): three-phase unified flow ("只询问尚未回答的问题"); command path: pending-placement state + destination selection mode; drag enters the *same* selection mode at drag start, drop commits with no confirmation surface; explicit "已作答 vs 代答" distinction (no "已为你选择 X" hints); touch: command path primary, drag retained with wider tolerance.

### B.4 Case 004 baselines

- **004-a** (agent-690876dd): single Attach control → intent prompt ("Add a photo or video" / "Make a visual from this post" / "Pick from game assets"); permission checked silently before rendering UI, limited-access message replaces grid with camera as permission-independent route; 3–5 draft-derived template recommendations with live pre-filled previews; insert at cursor, focus restored; Video tab folded into media grid.
- **004-b** (agent-94cdda63): "Add visual" entry → intent sheet (device / generate from post / collection); permission banner demoted to bottom, never blocking camera or grid; draft-seeded recommendations + sectioned full catalog (Post tools vs Themed generators); attachment chip with resumable edit; publish-step non-blocking visual nudge ("Recommended for this topic").
- **004-c** (agent-3e9a791d): intent strip (photo/video, visual from post, browse all) replacing the tab panel; camera-first Album with permission banner last; two-tier template catalog ("For this post" pre-filled tier + sectioned "All templates" tier); live inline preview, one-tap insert; snackbar Undo; last-used template pinned per session.

## Appendix C — Blind judge score sheets

Verdicts are reproduced verbatim in the per-case sections above (12 judge agents: d2d2cf58, 148193dc, 59553e5e, 545dc4d9, 3da197a3, 620617e4, 8b18d954, 020d133f, 767639a7, 4f99c46f, 3c8e81b1, b8ca3d24). Every judge returned per-assertion one-line evidence quoting the baseline document; evidence lines are available in session logs. Coordinator annotations (001-b F6 strictness variance; 004 E1/F2 method artifact) are marked in the per-case sections and do not alter the judges' verbatim verdicts.
