# Interaction Compiler

## Contents

- E1 Context as Evidence
- E2 Uncertainty Convergence
- E3 Layer Value
- E4 Problem-State Taxonomy
- E5 Affordance Contract
- E6 Multiple Access Paths
- E7 Multi-Scope Actions
- E8 Interaction Weight
- Compiler sequence

Use this reference when deciding whether an extra step is necessary, how to group capabilities, where an action belongs, whether a command should open a menu, or how much interaction space a task deserves.

## E1 — Context as Evidence

Treat deliberate user state as input to the next interaction.

Potential evidence includes:

```text
current object
current selection
current navigation context
entered content
dragged object
accepted result
current mode
active local edit
prior deliberate command
```

Before asking a question, subtract what the system can already know:

```text
question
− already-known context
= remaining question
```

Do not make the user re-declare a scope or object that a deliberate prior action already established.

### Example

A document manager has eight rows selected. The user invokes “Archive.” The interface should proceed with the selected rows as the target. Asking whether the command should affect the selected rows, the current folder, or all documents reopens a decision already encoded in selection.

## E2 — Uncertainty Convergence

A normal task flow should progressively reduce the uncertainty required to complete the current goal.

Model each step as:

```yaml
state_before:
  known:
  unresolved:
action:
state_after:
  known:
  unresolved:
```

A good next step usually resolves one necessary unknown rather than reopening the entire capability space.

### Allow broadening only when justified

The system may deliberately broaden possibilities when at least one condition is true:

- the current path has a meaningful efficiency problem;
- the user explicitly opened a capability-space affordance;
- a high-value alternative path is available;
- a product objective can create additional user value without compromising task completion.

Even then, the intervention must remain non-blocking, dismissible, compatible with the user's committed result, and worth its attention cost.

### Example

A user invokes “Assign reviewer” on a change request. The unresolved question is who should review it. A menu that expands into export, duplicate, automation, and notification features does not reduce the relevant uncertainty.

## E3 — Layer Value

Do not optimize for minimum layer count. Require every new layer to buy something the task still needs.

For every page, modal, popover, sheet, drawer, or wizard stage, record:

```yaml
unresolved_before:
resolved_here:
value_purchased:
why_required:
```

Valid layer value includes:

```text
new information
new choice
new control
consequence understanding
comparison
safety
necessary configuration
```

If `resolved_here` and `value_purchased` are empty, remove the layer.

### Example

A payroll export command may need a separate step to choose a legal entity when the current workspace contains several entities and the target cannot be inferred. If the user invoked “Export current entity,” asking for the entity again is interaction tax.

## E4 — Problem-State Taxonomy

Organize capabilities by the user's state before the action, not by implementation convenience or final output type.

Default ordering of classification evidence:

```text
current task scope
→ user problem state
→ interaction intent
→ execution/acquisition method
→ technical source
```

Ask:

```text
What does the user already have?
What is missing?
What are they trying to change?
What decision are they making now?
```

Do not group features merely because they share a backend, object type, or implementation module.

### Example

A hiring product can obtain candidates by selecting known people from an internal pool, publishing an opening to attract unknown applicants, or delegating search to an external recruiter. The final object is a candidate in every case, but the user's starting problem state is different enough that “candidate acquisition” alone is not sufficient information architecture.

## E5 — Affordance Contract

Classify the entry point before designing its next state.

### Command affordance

A command means the user has already committed to a relatively specific action.

Examples of expected semantics:

```text
Rename
Print
Move
Approve
```

After a command, ask only for information still required to perform that command.

### Capability-space affordance

A capability-space affordance explicitly means “show me what can be done here.” It can reveal a set of related abilities.

Examples of conceptual forms:

```text
+
Tools
Automate
Actions
```

Do not disguise a broad capability launcher as a specific command.

### Semantic breadth test

The semantic breadth promised before activation should be compatible with the breadth revealed afterward.

If the entry point is narrow and the next surface is much broader, either narrow the next surface or redesign the affordance so the breadth is visible before activation.

### Example

A button labeled “Print” should not reveal print, cloud sync, export, sharing, and snapshot generation. If the product intends an output-method chooser, the entry point should communicate that wider concept.

## E6 — Multiple Access Paths

Allow several access paths to the same conceptual action.

Require:

```text
same user intent
compatible action semantics
compatible resulting state
```

Different paths do not need identical steps. A path may skip decisions whose answers are already encoded in that path.

### Example

Creating a calendar event through a generic “New Event” command still requires time selection. Double-clicking a specific time slot already provides the time, so the flow may start later. Both paths can remain the same conceptual action.

### Reject conceptual ownership fragmentation

Do not let multiple entry points mutate the meaning of the same action. If one “Duplicate” command copies into the current workspace while another identically named command publishes a reusable template, the conceptual contract has split.

## E7 — Multi-Scope Actions

Do not reduce action scope to a single label.

For nontrivial actions, distinguish:

```yaml
invocation_scope:
target_scope:
effect_scope:
persistence_scope:
```

Definitions:

- `invocation_scope`: the context in which the user naturally asks for the action;
- `target_scope`: the object directly operated on;
- `effect_scope`: the broader state changed by the result;
- `persistence_scope`: the object or system that owns the lasting result.

Use invocation and target scope heavily when deciding discoverability and local placement. Use effect and persistence scope when deciding consequence, state ownership, and recovery.

### Example

“Add selected employees to a new team” may have:

```yaml
invocation_scope: employee selection
target_scope: selected employees
effect_scope: employees + organization structure
persistence_scope: organization
```

Calling it only an “employee action” loses important structure.

## E8 — Interaction Weight

Match the amount of interaction space to the weight of the task.

Assess:

```yaml
steps:
duration:
interrupts_primary_task:
cognitive_context_shift:
intermediate_state:
```

Low-weight actions should remain local and direct where possible.

High-weight actions deserve enough space to preserve intermediate state, show consequences, and support the distinct cognitive task.

Do not force a long workflow into a small menu or popover just because the workflow begins from a compact control.

### Example

Changing a ticket label is low weight. Migrating an entire workspace between accounts may involve permissions, dependency validation, conflicts, progress, and recovery, and therefore deserves a dedicated workflow.

## Compiler sequence

Run this sequence before choosing a UI surface:

```text
1. State the primary task.
2. Inventory what current context already tells the system.
3. Identify the next necessary unresolved question.
4. Verify that the proposed next layer resolves that question.
5. Classify the user's problem state.
6. Determine whether the entry point is command or capability space.
7. Model invocation, target, effect, and persistence scope.
8. Estimate interaction weight.
9. Pass the result to ownership/automation analysis.
10. Only then map to inline action, menu, popover, sheet, page, workspace, or automation.
```

Do not use this sequence as a reason to expose process to the user. It is an internal decision discipline; user-facing answers should remain concise unless the user asks for the reasoning.