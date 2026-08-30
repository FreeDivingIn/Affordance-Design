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

## Eval case requirement contract

Every case published in Affordance Design Evals must contain enough product context to judge the design independently of hidden conversation history.

Each case must explicitly provide:

```yaml
requirement_goal:
background:
current_state:
optimization_direction: feature_creation | feature_upgrade | feature_optimization
```

The three optimization directions mean:

- `feature_creation` — the target capability does not yet exist and a new user-facing capability is being introduced;
- `feature_upgrade` — an existing capability is being materially expanded, changing its scope, behavior, supported situations, or user value;
- `feature_optimization` — the functional scope remains substantially the same while the interaction, comprehension, efficiency, control, or recovery experience is improved.

A case may contain additional constraints, known context, unresolved questions, expected behavior, and forbidden outcomes, but these four requirement fields are mandatory.

The Eval page may expose evaluation context, design rationale, assertions, source links, and review status because it is a reviewer-facing surface.

## Prototype surface purity

The runnable prototype must contain only elements and content that would be visible to the real end user in the represented product state.

Do not place evaluator, developer, or prototype-explanation content inside the product prototype.

Forbidden examples include:

- statements that the page is a prototype, eval, benchmark, demo, or test;
- explanations of the intended interaction model;
- instructions that exist only to help a reviewer understand what to click;
- design rationale, implementation notes, state-machine descriptions, or expected behavior;
- prototype-only page titles, section labels, legends, badges, or annotations that would not exist in the real product;
- labels such as “Web version”, “Mobile version”, “current state”, “expected result”, or similar review metadata unless they are genuinely part of the product experience.

A normal product label, heading, helper message, status, consequence message, empty state, or recovery action is allowed only when the represented user would actually see it in that product state.

Evaluation explanation belongs outside the prototype, on the Eval case page or in machine-readable case metadata.

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

These states must be observable through authentic product UI rather than prototype annotations.

## Visual fidelity constraint

The default prototype should use only enough visual structure to communicate hierarchy, state, target, affordance, and feedback.

Do not spend design effort on brand expression, ornamental cards, visual trends, decorative illustration, elaborate motion, or production-level polish during structural validation.

A visually attractive prototype that makes a weak interaction model harder to question is a failure.

## Acceptance criteria

A design task is not complete merely because a plausible screen was generated.

It is complete when:

1. the structural model is explicit enough to inspect outside the prototype;
2. the important interactions are runnable;
3. the prototype can expose wrong assumptions through use;
4. every visible prototype element can be justified as real user-facing product UI;
5. the anti-average review has no unresolved ERROR-level failures;
6. the prototype does not use visual polish or explanatory annotations to substitute for unresolved information architecture or interaction behavior.
