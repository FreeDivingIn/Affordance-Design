# Contact Merge — Structural Review

## Review question

Did the implementation preserve the explicit `Merge` command as a narrow action, or did runtime/component composition reintroduce the broad capability catalog that this Eval is designed to reject?

## Evidence reviewed

- `interaction-spec.md` — frozen before runtime mapping.
- `runtime-mapping.md` — Tamagui mapping created after semantic choice.
- `runtime/contact-merge-model.ts` — platform-independent merge/Undo semantics.
- `runtime/contact-merge-model.test.ts` — deterministic state-transition checks.
- `runtime/App.tsx` — pointer/touch Tamagui presentation.
- `runtime/e2e/contact-merge.spec.ts` — exported-Web operation in pointer and touch/mobile contexts.
- GitHub Actions run `33227904340` — model test, TypeScript, Web export, iOS export, Chromium install, and pointer/touch browser operation.

## Frozen semantic contract

```text
two contacts selected
→ explicit Merge
→ choose one selected contact as primary
→ merge immediately
→ Undo
```

## Findings

### R1 — Command affordance remains narrow

**PASS**

Invoking `Merge` exposes only the merge-specific question that remains unresolved: which of the two selected contacts should remain primary.

The implementation does not surface Export, Add tags, Find duplicates, AI cleanup, or a generic contact-actions catalog after Merge.

### R2 — Existing target context is reused

**PASS**

The two selected contact IDs remain the merge target. The user is not asked to choose the merge targets again.

The primary-record choices are derived directly from that existing selection, so a third unselected contact cannot appear as a primary candidate.

### R3 — No redundant generic confirmation

**PASS**

Choosing a primary record commits the merge. No later screen asks the user to reconfirm the already-expressed Merge intent.

This is valid for this fixture because the requirement states that the product can preserve a pre-merge snapshot and the only unresolved decision is the primary record.

### R4 — Consequence and recovery are observable

**PASS**

The two records become one primary record, merged field values are visible in that record, and an immediate Undo action is shown.

The platform-independent test verifies that Undo restores both original source records and their original two-record selection.

### R5 — Dismissal does not destroy known context

**PASS in pointer Web benchmark**

Escape dismisses the merge surface while preserving both selected contacts. Reopening Merge returns directly to the same primary-record question.

### R6 — Platform adaptation does not fork semantics

**PASS for exported Web pointer/touch contexts**

Pointer uses a transient anchored surface; touch adapts that choice to a Sheet. Both operate the same selected targets, primary choice, commit, and recovery model.

No platform-specific merge state machine was introduced.

### R7 — Prototype surface contains product UI only

**PASS for the implemented fixture and browser checks**

Visible content consists of selected-contact state, the Merge command, actual contact records, the primary-contact question, merge feedback, and Undo.

No evaluator instructions, prototype labels, design rationale, expected-behavior annotations, platform labels, or benchmark descriptions are rendered in the product surface.

### R8 — Runtime did not generate the interaction model

**PASS**

The interaction specification contains no Tamagui component vocabulary and predates runtime mapping. Popover/Sheet are presentation mappings of an already-fixed semantic state, not the source of the design decision.

## Verification

GitHub Actions run `33227904340` confirmed:

```text
platform-independent merge model tests: PASS (4/4)
TypeScript: PASS
Web Expo export: PASS
iOS Expo export: PASS
local desktop-pointer browser operation: PASS
local touch/mobile browser operation: PASS
```

The browser operation explicitly checks that the unrelated capabilities named in the broken current interaction are absent after Merge.

## Not yet verified

- complete keyboard/focus accessibility behavior beyond pointer Escape dismissal;
- production accessibility review;
- complex field-conflict policies beyond the fixture's defined primary-record decision;
- performance and production visual design.

## Review decision

The implementation preserves the frozen command-affordance contract.

No implementation finding currently justifies changing the upstream interaction model. The case remains structurally distinct from Case 001: Case 001 tests reuse of selected target context during assignment, while Case 002 directly tests whether a specific command is allowed to expand into a broader capability space after invocation.
