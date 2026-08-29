# Anti-Average Lint

## Contents

- Purpose
- Error rules
- Warning rules
- Review loop
- Decision checklist

Use this reference after drafting a structure or interaction. The goal is not to enforce stylistic uniformity; it is to reject plausible-looking outputs that collapse into generic patterns or shift product-organization problems onto the user.

## Purpose

A proposal is not good because it is familiar, clean, modern, compact, or visually balanced.

Reject structural shortcuts that:

```text
replace user-state reasoning with feature taxonomy
re-ask already-known information
hide ownership changes inside automation
use extra layers without buying new value
make recommendations compete with the primary task
accept the first familiar topology under real ambiguity
leak reviewer or prototype explanation into the user's product surface
```

ERROR-level failures must be revised before delivery.

## AVG-001 — Internal taxonomy exposed as user choice — ERROR

### Fail when

A menu, page, or choice exists mainly because the product has several internal features that need somewhere to live.

### Require instead

Every user-visible choice must correspond to a distinction the user actually needs to make in the current problem state.

### Example

An HR system has separate backend modules for payroll correction, attendance correction, and benefits correction. A generic “Corrections” chooser is not justified merely by that implementation grouping. The user's problem may be “fix this employee's current pay statement,” which should drive the interaction.

## AVG-002 — Resolved context re-asked — ERROR

### Fail when

The interface asks for an object, scope, or intent already established by deliberate current state.

### Example

A user selects three boards and invokes “Share.” Asking whether to share the selected boards, current workspace, or entire organization reopens a resolved scope.

## AVG-003 — Narrow command expands into broad catalog — ERROR

### Fail when

A concrete command opens a substantially broader set of unrelated capabilities.

### Example

“Rename” should not open a general object-management menu containing move, duplicate, archive, export, and automation.

## AVG-004 — Layer buys no new value — ERROR

### Fail when

A Page, Modal, Popover, Sheet, Drawer, or Wizard stage resolves no new uncertainty and adds no control, safety, consequence understanding, or necessary information.

### Example

A user invokes “Invite external reviewer” and is taken to a page that only repeats the reviewer type before the actual email-entry step. The repeat page buys nothing.

## AVG-005 — Grouping only by output object — ERROR

### Fail when

Capabilities are grouped solely because they end in the same object type, despite different task scope, starting state, or intent.

### Example

A logistics system groups “select an available driver,” “request a contractor,” and “open an unassigned shift” together only because each eventually produces an assigned driver. The user's starting problem differs enough that output identity alone is insufficient.

## AVG-006 — Pattern-frequency reasoning — ERROR

### Fail when

The primary justification is:

```text
this kind of app usually uses...
this is standard...
this looks more professional...
most dashboards...
```

### Require instead

State the relationship model that makes the pattern fit.

## AVG-007 — Decorative hierarchy without semantic boundary — ERROR

### Fail when

A Card, Panel, or major container has no meaningful relationship, interaction scope, selection scope, or state boundary and exists only to create visual hierarchy.

### Example

A monitoring page wraps every label/value pair in separate cards even though they describe one selected server and are read as one status model.

## AVG-008 — Fewer visible elements treated as simplicity — ERROR

### Fail when

The proposal hides decision-critical status or common actions and calls the result simpler without checking memory, search, navigation, or recovery cost.

## AVG-009 — Multiple access paths forced into identical steps — ERROR

### Fail when

A path ignores information already supplied by that access method.

### Example

Dropping a specific record onto a category still opens the same category-picker dialog used by a generic “Categorize” command, even though the drop target already answered the category question.

## AVG-010 — Same action has incompatible meanings across paths — ERROR

### Fail when

Several identically framed access paths produce different conceptual actions, scopes, or persistent results.

## AVG-011 — Long workflow hidden in a lightweight surface — ERROR

### Fail when

A task with many steps, long duration, intermediate state, or cognitive context shift is compressed into a menu/popover because the launch control is small.

## AVG-012 — User-owned value silently replaced — ERROR

### Fail when

The system replaces or materially transforms accepted user-owned state without preserving the previous value long enough for the user to judge the change.

## AVG-013 — System provenance used to justify lower protection — ERROR

### Fail when

Accepted content is silently changed because it was originally system-generated.

## AVG-014 — Compute implies commit — ERROR

### Fail when

The fact that the system can generate a result is used as sufficient reason to write it into persistent user state.

## AVG-015 — Cross-context recommendation — ERROR

### Fail when

A recommendation about object/task A interrupts active work on unrelated object/task B merely because the recommendation is valuable.

## AVG-016 — Active-task interruption — ERROR

### Fail when

A nonessential recommendation interrupts obvious active engagement such as typing, selecting, dragging, scrolling, waiting for a just-triggered result, or unfinished local editing.

## AVG-017 — Business goal blocks primary task — ERROR

### Fail when

Growth, discovery, conversion, or AI-usage goals insert a blocking step before the user can complete the already-committed primary task.

## AVG-018 — Time-based recommendation repetition — ERROR

### Fail when

The same recommendation resurfaces because time passed or the user previously ignored it, without material change in the underlying state that informs the recommendation.

## AVG-019 — Immediate feedback without intermediate-state value — WARNING

### Warn when

Every small configuration change triggers expensive or disruptive updates even though the intermediate state is not useful for decision-making.

Escalate to ERROR if the feedback prevents reliable task completion.

## AVG-020 — Confirmation by label rather than consequence — WARNING

### Warn when

The interface adds confirmation simply because an action is named “delete,” “remove,” or “reset,” without analyzing impact scope, reversibility, recovery path, and whether consequence is already clear.

Escalate to ERROR when high-impact irreversible consequence remains unclear.

## AVG-021 — First familiar topology accepted under real ambiguity — ERROR

### Fail when

Materially different relationship models are plausible, but the proposal chooses the first standard layout without comparing assumptions or failure modes.

## AVG-022 — Device/template logic replaces task logic — WARNING

### Warn when

The structure is justified primarily by a device class, framework default, design trend, or template rather than the user's task and relationship model.

This skill does not define a full responsive-layout policy; the warning exists to prevent implementation form from outranking semantics.

## AVG-023 — Reviewer context leaks into product prototype — ERROR

### Fail when

A rendered prototype contains visible content whose purpose is to explain the prototype, evaluation, interaction model, implementation, or expected behavior to a reviewer rather than serve the represented end user.

This includes prototype-only headings, legends, annotations, instructions, state-machine descriptions, benchmark labels, platform labels, design rationale, and helper copy added only because the prototype would otherwise be hard to understand.

### Require instead

Keep requirement context, rationale, assertions, implementation notes, and review status on the Eval/review surface. The runnable prototype should stand on authentic product UI alone.

If removing reviewer explanation makes the intended interaction undiscoverable, revisit the interaction design rather than restoring explanatory scaffolding.

### Example

A scheduling prototype displays “Prototype path: choose team → select slot → confirm” above the real scheduling form. That text helps an evaluator but would never appear in the product. Move it to the Eval page and let the actual affordances make the sequence understandable.

## Review loop

Use this loop after the first draft:

```text
1. Run every ERROR rule that applies.
2. Record each failure with the exact object/action/layer involved.
3. Fix the structural cause, not only the visual symptom.
4. Re-run the relevant rules.
5. Check warnings and decide whether they reveal a real tradeoff.
6. If architecture remains ambiguous, compare alternate relationship models.
7. Deliver only after ERROR = 0.
```

Do not mechanically report every passing rule to the user. Surface the few rules that materially changed the recommendation.

## Decision checklist

```text
[ ] No unproven UI pattern defines the problem.
[ ] Current context is used before asking another question.
[ ] Every extra layer resolves something necessary.
[ ] Capability grouping reflects task/problem state, not implementation taxonomy.
[ ] Command vs capability-space semantics are consistent.
[ ] Multiple access paths preserve one conceptual action.
[ ] Nontrivial actions declare invocation/target/effect/persistence scope.
[ ] Interaction weight matches the space and state the task receives.
[ ] System-provisional and user-owned value are distinguished.
[ ] ADD/TRANSFORM/REPLACE/REMOVE consequences are understood.
[ ] Compute, surface, and commit authority are separated.
[ ] Proactive help is relevant, non-blocking, dismissible, and attention-aware.
[ ] Recommendations do not repeat without materially new underlying state.
[ ] Feedback timing is justified by intermediate-state value.
[ ] High-impact actions expose consequence and recovery.
[ ] Ambiguous structure has not defaulted to the first familiar pattern.
[ ] Every visible prototype element belongs to the represented end-user product experience.
[ ] Reviewer/eval/developer explanation stays outside the runnable prototype.
[ ] ERROR = 0.
```