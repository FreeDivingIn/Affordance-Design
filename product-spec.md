# Product Spec

## Product goal

Affordance Design helps a model turn product requirements into interface structures and interaction behavior that users can understand, predict, and operate without the model collapsing early into familiar UI templates.

## Primary output

The default final artifact for design tasks is a **runnable structural prototype** for Web and Mobile targets.

The prototype is intentionally block-like rather than visually finished. Its purpose is to make information architecture, affordances, action scope, state transitions, interruption behavior, ownership boundaries, and recovery paths observable through use.

It should be possible to interact with the prototype and verify whether the structural reasoning actually works.

## Output levels

### Default — runnable block prototype

Use when the request asks the skill to design or materially revise an interaction structure.

The prototype should expose the states and transitions needed to validate the design, while keeping visual styling deliberately neutral.

### Supporting — structural model / flow representation

Use as an intermediate artifact when it helps explain or compare interaction models.

It is not sufficient as the final artifact when the important behavior can only be evaluated by interacting with it.

### Downstream — visual UI design

Full visual design, brand styling, decorative polish, and production visual-system work are outside the default Affordance Design output.

They may consume the validated structural prototype later, but they must not be allowed to hide or prematurely lock structural decisions.

## Required observable behavior

A runnable prototype should make the relevant parts of the following directly testable when present in the task:

- current object, selection, scope, and navigation context;
- command vs capability-space behavior;
- required vs redundant interaction layers;
- state changes and immediate feedback;
- multiple access paths to the same conceptual action;
- add / transform / replace / remove behavior;
- provisional vs user-owned content;
- preview / accept / recovery behavior;
- proactive recommendation timing and interruption boundaries;
- Web / Mobile presentation differences that preserve the same interaction semantics.

## Visual fidelity constraint

The default prototype should use only enough visual structure to communicate hierarchy, state, target, affordance, and feedback.

Do not spend design effort on brand expression, ornamental cards, visual trends, decorative illustration, elaborate motion, or production-level polish during structural validation.

A visually attractive prototype that makes a weak interaction model harder to question is a failure.

## Acceptance criteria

A design task is not complete merely because a plausible screen was generated.

It is complete when:

1. the structural model is explicit enough to inspect;
2. the important interactions are runnable;
3. the prototype can expose wrong assumptions through use;
4. the anti-average review has no unresolved ERROR-level failures;
5. the prototype does not use visual polish to substitute for unresolved information architecture or interaction behavior.
