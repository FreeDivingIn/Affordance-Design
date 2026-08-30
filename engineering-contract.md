# Engineering Contract

## Scope

These constraints govern how Affordance Design turns an interaction model into a runnable prototype.

## Single runtime during the initial phase

Tamagui is the only UI/runtime system used for runnable prototypes during the initial development phase.

Do not combine Tamagui with other component libraries, headless UI systems, pattern registries, or adapter layers merely to increase component coverage.

The purpose of the initial phase is to understand one system deeply enough to know what it can express, where it adapts across Web and Mobile, and where custom composition is still required.

Re-evaluate this constraint only after real prototype and benchmark evidence shows a concrete Tamagui limitation that materially blocks Affordance Design behavior.

## Interaction design must precede component lookup

The interaction model must be designed before consulting Tamagui for a concrete component choice.

Required order:

```text
product intent and context
→ entity / relationship / state model
→ unresolved uncertainty
→ interaction alternatives
→ chosen interaction behavior
→ state transitions and recovery
→ only then inspect Tamagui primitives
→ map the chosen behavior to Tamagui
→ build runnable block prototype
```

Do not begin a design task by enumerating available Tamagui components and composing the requirement from them.

Component availability is an implementation constraint, not the generator of the interaction concept.

## Preserve divergence before implementation

When the architecture is genuinely ambiguous, generate materially different interaction models before choosing a representation component.

During this phase:

- reason in terms of user state, scope, relationships, transitions, feedback, and recovery;
- do not use `Popover`, `Sheet`, `Tabs`, `Dialog`, `Select`, or other library component names as the primary design vocabulary;
- do not reject an interaction idea merely because its Tamagui mapping is not immediately obvious.

After one model is selected, implementation may adapt its presentation to the platform as long as the interaction semantics remain intact.

## Eval case data boundary

Reviewer context and product runtime are separate artifacts.

Every eval case must persist its requirement context outside the prototype, including:

```yaml
requirement_goal:
background:
current_state:
optimization_direction: feature_creation | feature_upgrade | feature_optimization
```

Reviewer-only material such as expected behavior, forbidden outcomes, rationale, source evidence, benchmark status, and implementation notes belongs in `evals/` metadata/pages or review documents.

Do not encode reviewer-only information into the product runtime merely because it makes the prototype easier to understand in isolation.

## Prototype surface purity

The prototype runtime must render only product UI that the represented end user would actually see.

Do not render development or evaluation scaffolding, including:

- prototype/eval/demo/test labels;
- interaction instructions for reviewers;
- state-machine descriptions;
- design rationale or expected-behavior text;
- platform labels or benchmark status;
- prototype-only headings, legends, annotations, or helper copy.

A visible heading, helper message, confirmation, status, error, empty state, or recovery action is permitted only when it is part of the represented product experience.

Test IDs, automation selectors, source comments, and other non-rendered instrumentation may exist in code when needed for verification, but they must not produce user-visible prototype content or alter product behavior.

The runtime must not require prototype-only visible instructions to make the intended interaction discoverable. If it does, treat that as evidence that the interaction design itself may be insufficient.

## Prototype fidelity

The prototype is a structural validation artifact.

Use Tamagui to provide reliable interaction primitives, state handling, accessibility behavior, responsive/platform adaptation, and enough layout capability to make the design runnable.

Keep the visual layer intentionally block-like:

- simple hierarchy;
- clear labels;
- clear selected / active / disabled / pending states;
- minimal spacing and grouping needed for legibility;
- no production visual-system work unless required to understand the interaction.

Do not use polished visuals to make an unvalidated structure feel finished.

## Web and Mobile

The same product interaction semantics should be preserved across Web and Mobile unless the usage context itself requires a different model.

Presentation may adapt after the interaction model is fixed. Tamagui's `Adapt`, media queries, platform capabilities, and mobile-specific surfaces may be used for this mapping.

Do not infer that the same visual component must appear on both platforms.

## Tamagui version baseline

Use current Tamagui 2 documentation as the baseline for the initial prototype runtime.

At the time this contract was established, the official installation guidance requires React 19+, TypeScript 5+, and React Native 0.81+ with New Architecture for native applications. Keep these values in implementation/configuration rather than duplicating them across product documents.

## Runtime knowledge boundary

Detailed Tamagui API knowledge belongs in the skill reference dedicated to prototype implementation.

The main skill workflow must not preload a component catalog before structural reasoning.

## Re-evaluation conditions

Consider adding another runtime/tool only when all are true:

1. a validated interaction model cannot be represented adequately with Tamagui;
2. the limitation is demonstrated in a runnable case, not assumed from documentation;
3. custom composition inside Tamagui is insufficient or disproportionately expensive;
4. adding a second system has a measurable benefit that exceeds the cognitive and maintenance cost of tool merging.
