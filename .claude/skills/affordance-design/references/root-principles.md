# Root Principles

## Contents

- P0 Purpose
- P1 Mental Model
- P2 Relational Legibility
- P3 Causal Legibility and Agency
- P4 Cognitive Economy
- P5 Contextual Fitness
- P6 Falsifiability and Iteration
- Cross-principle tensions

These principles sit above component, layout, and responsive decisions. Use them to explain why a structural rule exists, not as generic UX slogans.

## P0 — Purpose

Determine what deserves to exist before deciding how it appears.

A feature inventory is not an architecture. A requested representation is not automatically a user need. Treat proposed UI forms as hypotheses until they are supported by the user's situation, desired outcome, or a real product constraint.

Ask:

```text
What is the person trying to make true?
What currently prevents that outcome?
What decisions must the person make?
What would become harder or impossible if this capability disappeared?
```

A feature remains weakly justified if the main defense is familiarity, competitor parity, visual completeness, or speculative discoverability.

### Example

A warehouse application request says it needs a “control center.” Before producing metrics and status cards, recover the actual operating decision. If supervisors open it primarily to identify blocked shipments before the morning cutoff, the structure should optimize that decision rather than satisfy the phrase “control center.”

## P1 — Mental Model

Model the system the way the person is likely to understand and operate it before choosing a familiar pattern.

A pattern is useful only when its implied object relationships and action semantics match the product model. Familiarity reduces learning cost when the analogy is accurate; it creates false expectations when it is not.

For a proposed pattern, state:

```yaml
pattern:
implied_objects:
implied_relationships:
expected_action:
expected_result:
```

Reject pattern-frequency arguments as primary evidence.

### Example

A laboratory application manages samples, batches, and test runs. Three nouns do not automatically imply three top-level destinations. If technicians think in terms of a test run that consumes a batch of samples, a run-centered workspace may match the mental model better than resource-category tabs.

## P2 — Relational Legibility

Make system relationships perceptible so the user does not have to reconstruct them in working memory.

Useful structural relations include:

```text
contains
belongs_to
controls
describes
filters
selects
navigates_to
depends_on
compares_with
precedes
```

Express these relationships through spatial and interaction structure: proximity, grouping, ordering, persistent context, scope, synchronized selection, and predictable transitions.

Do not use decoration to manufacture a hierarchy whose semantic relationship has never been identified.

### First-frame test

Without opening menus or reading onboarding, the user should be able to infer enough of the following to begin the intended task:

```text
where am I?
what is the primary content?
what can I do now?
what will change if I act?
where can I go next?
```

### Example

A fleet tool shows a vehicle, service history, active fault, and assigned technician. The layout should make it obvious that the fault and history belong to the selected vehicle and that the technician assignment controls follow-up responsibility. Four visually polished panels without synchronized source relationships do not solve that problem.

## P3 — Causal Legibility and Agency

Design the interaction over time, not only the static screen.

For important actions, keep this chain understandable:

```text
intention
→ action
→ immediate feedback
→ state transition
→ consequence
→ recovery
```

A result should be attributable to the action that caused it. Avoid silent context switches, opaque automation, or unrelated side effects.

Agency does not mean maximizing choices. It means the user can predict what the system will do, understand what it did, retain meaningful control over owned value, and recover when appropriate.

### Example

A scheduling application lets a dispatcher drag a job to a new slot. Highlighting the destination, showing conflict feedback, committing the move, and offering recovery maintains causal continuity. Silently changing the active team or filtering context as a side effect breaks it.

## P4 — Cognitive Economy

Optimize human cognitive work, not visible element count.

Use these dimensions as a review lens:

```text
Interpretation
Memory
Search
Decision
Navigation
Recovery
```

A visually sparse interface can increase total cognitive work if status, context, or frequent actions become hidden. Progressive disclosure is useful only when the hidden material is not needed for the current decision and remains predictably recoverable.

Before hiding something, ask:

```text
What must the user remember after this disappears?
What additional search or navigation is introduced?
Does the user lose decision-critical state?
Does recovery become harder?
```

### Example

A case-management list removes deadline, owner, and escalation state to look cleaner. If reviewers need those fields to decide what to process next, the visual simplification increases cognitive cost.

## P5 — Contextual Fitness

Design for a concrete use situation, not a persona label.

Relevant context may include:

```text
current task
session duration
input method
attention availability
object scale
comparison needs
error cost
collaboration context
```

Context analysis is only useful if it changes a structural decision.

### Example

Two people use the same stock system. A floor worker scans one package at a time on a handheld device; a planner compares hundreds of items for an hour with keyboard and pointer. “Inventory user” is too abstract to justify a shared primary structure.

## P6 — Falsifiability and Iteration

Treat the first plausible topology as a hypothesis, not proof.

When multiple structural models remain credible, compare different relationship models rather than stylistic variations.

For each candidate:

```yaml
assumption:
expected_advantage:
likely_failure_mode:
evidence_needed:
```

A candidate cannot win merely because it is more standard, more modern, more minimal, or more visually balanced.

### Example

A support product could plausibly be organized around customers, active incidents, or a work queue. Explore those as different task models. Do not call three versions of the same sidebar “three options.”

## Cross-principle tensions

### Familiarity vs originality

Do not let familiar patterns frame the problem. Once the correct interaction model is established, use familiar behavior where it accurately expresses that model. Deviate when the alternative has a meaningful, testable advantage.

### Visibility vs progressive disclosure

Expose information when it is required to orient, choose, compare, predict, confirm, or recover. Defer information when it is irrelevant to the current decision, its absence does not create memory/search burden, and it remains predictably recoverable.

### Simplicity vs agency

Removing choices is useful when those choices are not central to the person's intended outcome and their removal materially reduces friction. Do not remove meaningful control merely to reduce interface density.

### Directness vs control

Fewer steps are not inherently better. Add a step when it purchases enough information, control, consequence understanding, comparison, or safety to justify its interaction cost.