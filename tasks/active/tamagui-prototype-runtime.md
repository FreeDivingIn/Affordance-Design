# Tamagui Prototype Runtime

## Goal

Make Affordance Design produce runnable, block-like structural prototypes for Web and Mobile using Tamagui as the single initial runtime, while preserving interaction-design divergence before component mapping.

## Relevant Context

- The Skill's highest-value output is a runnable structural prototype, not a polished visual design.
- The interaction model must be decided before any Tamagui component lookup or mapping.
- Early multi-tool/component-library merging is explicitly out of scope.
- Tamagui 2 is the selected runtime because it supports React Native and React web in one system and provides `Adapt` for platform/media presentation changes.
- The runtime is an implementation layer; it must not become the source of information architecture or interaction concepts.

## Milestones

1. Deeply understand Tamagui's current cross-platform runtime, adaptation model, component mechanics, configuration, and AI-oriented tooling from official sources.
2. Establish the product output contract and engineering sequencing constraints.
3. Update the Skill so divergence and structural review occur before Tamagui mapping.
4. Add prototype-focused evals that catch component-first convergence.
5. Build the first minimal runnable block prototype scaffold with Tamagui from a pre-selected interaction model.
6. Run a cross-platform interaction benchmark and review whether Tamagui implementation changes the selected interaction model.

## Completed

- Milestone 1: reviewed current official Tamagui 2 documentation for core architecture, installation, UI, v5 configuration, media queries, `Adapt`, Popover, Select, Sheet, Menu, Tabs, Context Menu, headless subset, compiler behavior, and `generate-prompt`.
- Milestone 2: added `product-spec.md` defining runnable block prototypes as the default design artifact and `engineering-contract.md` defining Tamagui as the single initial runtime plus interaction-first sequencing.
- Milestone 3: added `references/tamagui-prototyping.md` and revised `SKILL.md` so Tamagui is read only after divergence, structural choice, and anti-average review.
- Milestone 4: added an eval that explicitly asks the model to begin from Tamagui components; expected behavior is to reject component-first composition, complete interaction reasoning first, then map the selected behavior to Tamagui.

## Current State

The reasoning/runtime boundary is explicit in product spec, engineering contract, runtime reference, Skill workflow, and eval coverage.

No Tamagui application scaffold has been created yet. This is intentional: a runtime scaffold must be exercised by a pre-selected interaction model rather than becoming a component showcase or a source of design ideas.

## Open Issues

- The exact minimal prototype project shape has not been selected yet (for example Expo universal vs another supported starter).
- No runnable prototype has yet verified Web / Mobile behavior.
- No evidence yet justifies a custom design system, component registry, additional component library, or abstraction layer.
- The boundary between a design failure and a Tamagui mapping failure still needs benchmark examples.
- The first representative interaction model for the runtime checkpoint still needs to be selected independently of Tamagui.

## Decisions

- Tamagui is the only component/runtime system during the initial prototype phase.
- Do not create a cross-library pattern registry or adapter layer during this milestone.
- Do not browse or enumerate Tamagui components during design divergence.
- Component names are implementation vocabulary, not interaction-design vocabulary.
- The default artifact is a low-visual-fidelity, high-behavior-fidelity block prototype.
- Web and Mobile may use different presentations after semantics are fixed; the task/scope/state/recovery contract should remain consistent unless context justifies a different model.
- Prefer composition of simpler Tamagui primitives over changing a validated interaction model merely to fit a stock component.
- Do not build a generic component showcase as the first prototype checkpoint.

## Constraints

- Do not let Tamagui demo aesthetics influence structural choice.
- Do not add visual-system polish before structural validation.
- Do not add another UI library without evidence meeting the re-evaluation conditions in `engineering-contract.md`.
- Keep current Tamagui API/version details in implementation/reference material, not product behavior documents.
- A successful render is not a successful prototype; key paths must be operated and reviewed.
- The first runnable prototype must start from an interaction specification that was produced without Tamagui component vocabulary.

## Hypotheses

- Tamagui's unstyled/styled primitives plus `Adapt` will be sufficient for the first set of structural prototypes without a custom design system.
- Loading Tamagui knowledge only after structural choice will reduce component-led convergence compared with component-first prompting.
- A deliberately neutral visual grammar will make structural defects easier to see and easier for Review to overturn.

## Deferred

- Custom pattern/component registry.
- Additional headless/component libraries.
- MCP/component discovery integration.
- Production visual design system.
- Compiler/performance optimization beyond what the first prototype requires.
- Packaging or publishing a reusable prototype runtime package.

## Next

Milestone 5:

1. Select or derive one representative interaction model without consulting Tamagui components.
2. Freeze its task, context, unresolved uncertainty, action scopes, state transitions, mutation/ownership behavior, and recovery contract.
3. Only then choose the smallest supported Tamagui universal starter and load Tamagui implementation knowledge.
4. Map the fixed interaction to Tamagui primitives.
5. Implement Web and Mobile presentations with deliberately block-like visual fidelity.
6. Operate both targets and run structural Review before accepting the checkpoint.

## Verification

The milestone is complete when:

- a runnable Tamagui prototype works on Web and at least one native Mobile target;
- the design decision can be reconstructed without referencing component availability;
- the same semantic interaction is preserved across platform presentation changes where expected;
- the prototype remains intentionally block-like rather than visually polished;
- Review can identify and overturn a structural mistake independently of whether the code runs;
- no second UI/runtime system was introduced without documented evidence.
