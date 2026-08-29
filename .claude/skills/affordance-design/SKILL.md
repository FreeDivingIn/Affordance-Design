---
name: affordance-design
description: Analyzes and designs interface structure, affordances, information architecture, task flows, action scope, interaction layers, AI-assisted behavior, and runnable structural prototypes. Use when deciding how UI capabilities should be grouped, where actions belong, whether a step/menu/modal is justified, how current context should constrain actions, how recommendations or automation should intervene, or when reviewing/designing an interface that feels structurally confusing, indirect, generic, or template-driven. Do not use for purely visual styling, branding, typography, color, or decorative polish unless structural interaction decisions are involved.
---

# Affordance Design

Design from the user's current problem state and already-expressed intent. Do not begin by choosing familiar UI patterns or by browsing available UI components.

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

### 14. Diverge before component mapping

When the architecture or interaction behavior is genuinely ambiguous, generate alternatives that differ in relationship model, task flow, scope, or state transition — not in visual styling and not in component choice.

During divergence, reason without Tamagui component names. Do not browse or enumerate the component library to generate ideas.

For each serious candidate state:

```yaml
assumption:
interaction_model:
advantage:
failure_mode:
evidence_needed:
```

Choose the interaction behavior before choosing its implementation primitive.

Do not let the available component inventory reduce design exploration.

### 15. Run the anti-average review before implementation

Read `references/anti-average-lint.md` and revise until all ERROR-level failures are removed.

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
- the first familiar topology accepted without testing alternatives when the structure is genuinely ambiguous;
- choosing an interaction because a component library makes that interaction convenient.

### 16. Map the selected interaction to Tamagui

Only after the structural behavior is selected, read `references/tamagui-prototyping.md`.

Tamagui is the single prototype runtime during the initial phase. Do not merge other UI/component systems into the prototype stack unless the project's engineering contract is explicitly revised from evidence.

Map semantics to the smallest sufficient Tamagui primitives. If no stock component exactly represents the selected behavior, compose simpler Tamagui primitives rather than changing the interaction model to fit a named component.

Cross-platform presentation may adapt after semantics are fixed. Web and Mobile do not need identical visual components; they must preserve the intended task, scope, state transition, consequence, and recovery behavior unless the usage context itself requires a different model.

### 17. Build a runnable block prototype

For a design task, the default final artifact is a runnable structural prototype when the environment permits artifact/code creation.

The prototype should be visually neutral and expose the important behavior directly through authentic product UI:

- current context and selection;
- relevant states and transitions;
- required layers and branches;
- action scope;
- preview / accept / recovery behavior;
- proactive intervention timing when relevant;
- Web / Mobile presentation adaptation when relevant.

The prototype surface is user-only. Every rendered element and every visible string must be something the represented end user would actually see in that product state.

Never render prototype/eval labels, reviewer instructions, design rationale, state-machine descriptions, expected behavior, platform labels, benchmark status, or prototype-only titles/annotations inside the prototype. Keep those in the Eval page, case metadata, or review documents.

A product heading, helper message, status, error, consequence, or recovery action is allowed only if it belongs to the actual represented product experience.

Keep styling deliberately simple. Do not spend the structural-validation phase on brand expression, visual trends, decorative cards, elaborate motion, or production polish.

The prototype is successful when using it can reveal structural mistakes without relying on explanatory scaffolding.

When creating an Affordance Design Eval, externalize the requirement before judging the prototype. Every case must provide:

```yaml
requirement_goal:
background:
current_state:
optimization_direction: feature_creation | feature_upgrade | feature_optimization
```

### 18. Operate and review the prototype

Do not treat successful rendering as completion.

Use the prototype through its important paths and verify:

```text
context is preserved where required
resolved decisions are not re-asked
state changes are attributable
extra layers buy real value
multiple access paths remain semantically compatible
user-owned value is protected
recommendations respect context and active engagement
recovery behavior is visible
Web / Mobile adaptations preserve interaction semantics
no reviewer/developer/prototype-only content appears in the product surface
```

If operation exposes a structural failure, revise the interaction model and rebuild. Review has authority to overturn the just-created result.

## Handling ambiguous architecture

Do not let “standard”, “modern”, “familiar”, “minimal”, or “available in the component library” decide the winner unless that property solves an explicit user problem.

If materially different relationship models remain plausible after divergence, keep the uncertainty explicit rather than polishing one arbitrary choice.

## Output behavior

Keep user-facing output decision-oriented. Do not dump this skill's theory unless the user asks for the reasoning framework.

When reviewing an existing interface, report:

1. the structural failure or opportunity;
2. the user-state or relationship causing it;
3. the concrete correction;
4. the rule that makes the correction necessary;
5. remaining uncertainty, if any.

When designing a new structure:

1. state the selected structural/interaction model and decisive tradeoffs;
2. produce a runnable block prototype when implementation is available and useful;
3. keep flow diagrams or textual structural models as supporting artifacts rather than substitutes for behavior that needs interaction testing;
4. do not silently escalate into full visual UI design.

## References

Read only what the current task needs; all references are directly linked here to keep progressive disclosure one level deep.

- Root design principles and their causal hierarchy → `references/root-principles.md`
- Context, uncertainty, layers, grouping, affordances, scope, and interaction weight → `references/interaction-compiler.md`
- User ownership, mutation, automation authority, recommendations, feedback, and recovery → `references/ownership-and-automation.md`
- Hard anti-average failures and review checklist → `references/anti-average-lint.md`
- Tamagui implementation after interaction design is fixed → `references/tamagui-prototyping.md`
- Research provenance and how the rules were derived → `references/research-basis.md`
- Unresolved questions that must not be treated as settled rules → `references/open-questions.md`

## Validation

Use `evals/evals.json` as the initial behavior suite. Compare skill-enabled outputs against a no-skill baseline and evaluate structural correctness, divergence quality, prototype behavior, and whether the skill avoids unnecessary process or explanation.

A prototype eval must distinguish two separate failures:

```text
design failure:
interaction model was weak or component-led

implementation failure:
selected interaction was sound but Tamagui mapping/code was wrong
```

Do not convert judgment-heavy rules into deterministic scripts until repeated eval failures show a stable mechanical predicate worth enforcing.
