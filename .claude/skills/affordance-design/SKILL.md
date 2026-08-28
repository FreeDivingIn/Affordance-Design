---
name: affordance-design
description: Analyzes and designs interface structure, affordances, information architecture, task flows, action scope, interaction layers, and AI-assisted behavior. Use when deciding how UI capabilities should be grouped, where actions belong, whether a step/menu/modal is justified, how current context should constrain actions, how recommendations or automation should intervene, or when reviewing an interface that feels structurally confusing, indirect, generic, or template-driven. Do not use for purely visual styling, branding, typography, color, or decorative polish unless structural interaction decisions are involved.
---

# Affordance Design

Design from the user's current problem state and already-expressed intent. Do not begin by choosing familiar UI patterns.

The skill exists to counter a common failure mode: a plausible interface can still be structurally generic, indirect, or based on the product team's internal feature taxonomy rather than the user's mental model.

## Governing rule

Before choosing a component or layout, determine:

1. what the user is currently trying to accomplish;
2. what the interface already knows from context and prior actions;
3. what necessary uncertainty remains unresolved;
4. which object or state the next action actually changes;
5. whether the system is adding value or replacing user-owned value;
6. whether an extra interaction layer buys enough information, control, safety, or decision value to justify its cost.

Normal task flow should narrow unresolved uncertainty. Do not reopen a decision the user has already expressed unless the user intentionally broadens the goal or a non-blocking, high-value alternative clearly justifies doing so.

## Core execution workflow

### 1. Strip unproven UI forms from the requirement

Treat words such as `dashboard`, `sidebar`, `cards`, `drawer`, `inspector`, `tabs`, `bento`, or `wizard` as representation hypotheses unless the product explicitly constrains them.

Do not justify a structure because it is common for the product category.

### 2. Recover the problem frame

Establish:

```yaml
person:
current_situation:
primary_task:
desired_outcome:
current_friction:
critical_decision:
```

If these are not known, infer only what the available evidence supports and mark uncertainty rather than silently inventing it.

For the deeper rationale, read `references/root-principles.md`.

### 3. Build the interaction state

Record what the interface already knows:

- current object;
- current selection;
- navigation context;
- entered or dragged content;
- current mode;
- accepted results;
- active local edit state;
- prior deliberate commands.

Treat deliberate user actions as information. Never ask the user to restate a scope, object, or intent already encoded in the current state.

### 4. Identify the next unresolved question

For every new step, menu, popover, sheet, modal, page, or wizard stage, state:

```yaml
unresolved_before:
resolved_here:
why_required:
```

Reject a layer that resolves nothing new.

Do not optimize for the fewest steps. An extra step is justified when it buys necessary information, control, consequence awareness, comparison, or safety.

For the complete interaction compiler, read `references/interaction-compiler.md`.

### 5. Classify capabilities by user problem state

Group capabilities in this order unless evidence shows otherwise:

```text
current task scope
→ user problem state
→ interaction intent
→ execution/acquisition method
→ technical source
```

Do not group capabilities merely because they produce the same output type, use the same backend, or live in the same implementation module.

### 6. Enforce the affordance contract

Classify an entry point before designing what follows it:

```yaml
affordance_type: command | capability_space | navigation | object
semantic_breadth:
expected_next_step:
```

A concrete command means the user has already committed to a relatively specific action. Do not use it as a disguised launcher for a wider capability catalog.

A capability-space affordance explicitly invites exploration and may reveal a set of related abilities.

Multiple access paths are allowed. Keep the same conceptual action and compatible resulting state; let each path skip questions that its context already answered.

### 7. Model action scope explicitly

For nontrivial actions, distinguish:

```yaml
invocation_scope:
target_scope:
effect_scope:
persistence_scope:
```

Do not collapse all four into a single statement such as “this is an item action.”

### 8. Match interaction weight to interaction space

Estimate:

```yaml
steps:
duration:
interrupts_primary_task:
cognitive_context_shift:
intermediate_state:
```

Keep low-weight actions local and direct. Give high-weight workflows enough space and persistent state. Do not force a long workflow into a small surface merely because it starts from a button.

### 9. Protect user-owned value

Distinguish system-provisional content from user-owned content. Once a user accepts content, protect it regardless of whether it originated from the user or the system.

Distinguish mutation type:

```text
ADD
TRANSFORM
REPLACE
REMOVE
```

Do not silently replace user-owned value. When replacing or materially transforming it, preserve the old value long enough for comparison and require an explicit commit where the user needs to judge the new result.

Do not treat Undo as a substitute for Preview: Preview supports a decision; Undo supports recovery after a decision.

For automation and ownership rules, read `references/ownership-and-automation.md`.

### 10. Separate compute, surface, and commit authority

For system-generated or AI-assisted behavior, decide independently:

```yaml
may_compute:
may_surface:
may_commit:
```

The ability to compute a result does not grant permission to show it now, and permission to show it does not grant permission to commit it into user-owned state.

### 11. Gate proactive intervention

A proactive recommendation or alternative path must not:

- block the primary task;
- change an already-committed user result;
- interrupt obvious active engagement;
- appear in an unrelated interaction context;
- demand attention disproportionate to its relevance confidence.

It must provide meaningful incremental value and remain dismissible.

Do not infer task completion from mere inactivity. Protect attention while the user is typing, selecting, dragging, scrolling, waiting for a just-triggered result, or holding unfinished local edits.

Do not repeat the same recommendation because time passed or it was ignored. Reconsider only when underlying state changes enough to support a materially new recommendation.

### 12. Choose feedback timing from decision value

Do not default to immediate feedback.

Prefer live feedback when intermediate states are themselves useful for decisions, computation cost is acceptable, and updates do not disrupt the current action. Otherwise use a staged Apply/Preview boundary.

### 13. Make consequence and recovery explicit

For high-impact actions, establish:

```yaml
consequence:
impact_scope:
reversible:
recovery_path:
recovery_window:
```

Do not add confirmation dialogs mechanically. The purpose of an extra confirmation layer is to establish consequence understanding where impact or recovery cost warrants it.

### 14. Run the anti-average review

Before finalizing any structural proposal, read `references/anti-average-lint.md` and revise until all ERROR-level failures are removed.

In particular, reject:

- internal feature taxonomy exposed as user choice;
- re-asking already-resolved context;
- a specific command opening an unrelated capability catalog;
- extra layers with no new information/control/safety value;
- grouping solely by output type;
- silent replacement of user-owned value;
- AI/system generation treated as permission to auto-commit;
- recommendations interrupting unrelated or active context;
- time-based repetition of the same recommendation;
- “simplification” justified only by fewer visible elements;
- the first familiar topology accepted without testing alternatives when the structure is genuinely ambiguous.

## Handling ambiguous architecture

When materially different relationship models remain plausible, generate alternatives that differ in structural logic, not visual styling.

For each candidate state:

```yaml
assumption:
advantage:
failure_mode:
evidence_needed:
```

Do not let “standard”, “modern”, “familiar”, or “minimal” decide the winner unless that quality solves an explicit user problem.

## Output behavior

Keep user-facing output decision-oriented. Do not dump this skill's theory unless the user asks for the reasoning framework.

When reviewing an existing interface, report:

1. the structural failure or opportunity;
2. the user-state or relationship causing it;
3. the concrete correction;
4. the rule that makes the correction necessary;
5. remaining uncertainty, if any.

When designing a new structure, report the chosen model and decisive tradeoffs rather than presenting several mediocre options as equivalent.

## References

Read only what the current task needs; all references are directly linked here to keep progressive disclosure one level deep.

- Root design principles and their causal hierarchy → `references/root-principles.md`
- Context, uncertainty, layers, grouping, affordances, scope, and interaction weight → `references/interaction-compiler.md`
- User ownership, mutation, automation authority, recommendations, feedback, and recovery → `references/ownership-and-automation.md`
- Hard anti-average failures and review checklist → `references/anti-average-lint.md`
- Research provenance and how the rules were derived → `references/research-basis.md`
- Unresolved questions that must not be treated as settled rules → `references/open-questions.md`

## Validation

Use `evals/evals.json` as the initial behavior suite. Compare skill-enabled outputs against a no-skill baseline and evaluate both structural correctness and whether the skill avoids unnecessary process or explanation.

Do not convert judgment-heavy rules into deterministic scripts until repeated eval failures show a stable mechanical predicate worth enforcing.