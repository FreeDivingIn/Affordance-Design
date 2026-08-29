# Tamagui Prototype Runtime

## Goal

Make Affordance Design produce runnable, block-like structural prototypes for Web and Mobile using Tamagui as the single initial runtime, while preserving interaction-design divergence before component mapping.

## Relevant Context

- The Skill's highest-value output is a runnable structural prototype, not a polished visual design.
- The interaction model must be decided before any Tamagui component lookup or mapping.
- Early multi-tool/component-library merging is explicitly out of scope.
- Tamagui 2 is the selected runtime because it supports React Native and React web in one system and provides `Adapt` for platform/media presentation changes.
- The runtime is an implementation layer; it must not become the source of information architecture or interaction concepts.
- Eval cases should be externally reviewable as rendered prototypes while retaining machine-readable expectations and source interaction evidence.

## Milestones

1. Deeply understand Tamagui's current cross-platform runtime, adaptation model, component mechanics, configuration, and AI-oriented tooling from official sources.
2. Establish the product output contract and engineering sequencing constraints.
3. Update the Skill so divergence and structural review occur before Tamagui mapping.
4. Add prototype-focused evals that catch component-first convergence.
5. Build the first minimal runnable block prototype scaffold with Tamagui from a pre-selected interaction model.
6. Run a cross-platform interaction benchmark and review whether Tamagui implementation changes the selected interaction model.
7. Externalize runnable eval cases and publish them through GitHub Pages for human review.

## Completed

- Milestone 1: reviewed current official Tamagui 2 documentation for core architecture, installation, UI, v5 configuration, media queries, `Adapt`, Popover, Select, Sheet, Menu, Tabs, Context Menu, headless subset, compiler behavior, and `generate-prompt`.
- Milestone 2: added `product-spec.md` defining runnable block prototypes as the default design artifact and `engineering-contract.md` defining Tamagui as the single initial runtime plus interaction-first sequencing.
- Milestone 3: added `references/tamagui-prototyping.md` and revised `SKILL.md` so Tamagui is read only after divergence, structural choice, and anti-average review.
- Milestone 4: added an eval that explicitly asks the model to begin from Tamagui components; expected behavior is to reject component-first composition, complete interaction reasoning first, then map the selected behavior to Tamagui.
- Milestone 5: froze `prototypes/assignment/interaction-spec.md` before runtime mapping, implemented one universal Expo/Tamagui runtime, separated the platform-independent assignment state model, and passed model tests, TypeScript checking, Web export, and iOS export.
- Milestone 7: added `evals/` with a renderable catalog, machine-readable case definition, human case page, and a Pages workflow that rebuilds the actual Expo Web prototype at deployment time instead of committing generated output.
- Repository Pages is enabled for GitHub Actions and the eval catalog is deployed at `https://freedivingin.github.io/Affordance-Design/`.
- The initial deployed prototype blank-screen defect was reproduced by the touch/mobile Playwright benchmark and traced to missing Tamagui v5 animation configuration.
- Added `@tamagui/config/v5-rn` animations to the universal Tamagui config; the frozen interaction model did not change.
- Local exported-Web interaction benchmark now passes for pointer and touch/mobile contexts.
- Pages now runs a post-deploy Playwright smoke gate; both `desktop-pointer` and `touch-mobile` loaded the public URL, performed Assign, and rendered committed feedback successfully.

## Current State

The first representative interaction remains frozen independently of Tamagui and is implemented as a block-like universal prototype.

The public prototype is no longer accepted based on build/deployment status alone. GitHub Pages deployment is followed by real Chromium operation against the public URL in both pointer and touch/mobile contexts.

The previously observed touch/mobile blank page is closed. Its cause was runtime configuration: `@tamagui/config/v5` contains no animation driver, while the adapted Sheet path requires one. Adding the v5 React Native animation preset fixed the render without changing task semantics, scope, state transitions, or recovery.

Milestone 6 is complete for browser pointer/touch semantics. Native simulator/physical-device operation remains outstanding before claiming native Mobile runtime validation.

## Open Issues

- Actual native Sheet interaction still needs simulator or physical-device operation evidence.
- Keyboard/focus behavior is not fully reviewed beyond the tested pointer Escape dismissal.
- Long-list touch gesture quality and production accessibility remain unverified.
- No evidence yet justifies a custom design system, component registry, additional component library, or abstraction layer.

## Decisions

- Tamagui is the only component/runtime system during the initial prototype phase.
- Do not create a cross-library pattern registry or adapter layer during this milestone.
- Do not browse or enumerate Tamagui components during design divergence.
- Component names are implementation vocabulary, not interaction-design vocabulary.
- The default artifact is a low-visual-fidelity, high-behavior-fidelity block prototype.
- Web and Mobile may use different presentations after semantics are fixed; task/scope/state/recovery semantics remain shared unless context justifies a different model.
- Prefer composition/configuration changes over changing a validated interaction model merely to fit runtime constraints.
- Eval Pages publish the real generated runtime output, not a separately hand-authored mock.
- Machine-readable eval assertions live beside human-rendered review pages; generated runtime bundles remain build artifacts rather than project truth.
- Feature-branch Pages deployments use `eval-pages-preview`; `main` uses `github-pages`.
- Static export or successful Pages deployment alone is insufficient verification. A deployed runnable eval must pass browser operation with browser errors treated as failures.

## Constraints

- Do not let Tamagui demo aesthetics influence structural choice.
- Do not add visual-system polish before structural validation.
- Do not add another UI library without evidence meeting the re-evaluation conditions in `engineering-contract.md`.
- Keep current Tamagui API/version details in implementation/reference material, not product behavior documents.
- A successful render is not a successful prototype; key paths must be operated and reviewed.
- The first runnable prototype must start from an interaction specification produced without Tamagui component vocabulary.
- Runtime failures must first be diagnosed at the implementation/configuration boundary; do not redesign upstream semantics merely to fit a stock component.

## Hypotheses

- Tamagui's primitives plus `Adapt` remain sufficient for the first structural prototypes without a custom design system.
- Loading Tamagui knowledge only after structural choice reduces component-led convergence compared with component-first prompting.
- A deliberately neutral visual grammar makes structural defects easier to see and easier for Review to overturn.
- Renderable eval pages plus post-deploy operation will catch failures that Markdown review, compilation, and static export cannot.

## Deferred

- Custom pattern/component registry.
- Additional headless/component libraries.
- MCP/component discovery integration.
- Production visual design system.
- Compiler/performance optimization beyond what the first prototype requires.
- Packaging or publishing a reusable prototype runtime package.
- Custom eval hosting beyond GitHub Pages unless Pages becomes a persistent repository constraint.

## Next

1. Manually review Case 001 as a design artifact now that automated deployed-browser operation passes.
2. Operate at least one native Mobile target before claiming native runtime completion.
3. Add the next eval only when it exercises a distinct Affordance rule rather than growing a component/showcase catalog.
4. Use the first two or three distinct cases to evaluate whether the current Skill improves structural decisions versus without-Skill baselines.

## Verification

Confirmed evidence:

```text
platform-independent assignment model: PASS (4/4)
TypeScript: PASS
Web Expo export: PASS
iOS Expo export: PASS
local desktop-pointer interaction: PASS
local touch-mobile interaction: PASS
Pages nested Expo build: PASS
Pages artifact upload: PASS
Pages deployment: PASS
deployed desktop-pointer operation: PASS
deployed touch-mobile operation: PASS
public prototype: https://freedivingin.github.io/Affordance-Design/cases/001-bulk-assignment/prototype/
```

The runtime milestone is fully complete when:

- a runnable Tamagui prototype works on Web and at least one native Mobile target;
- the design decision can be reconstructed without referencing component availability;
- the same semantic interaction is preserved across platform presentation changes where expected;
- the prototype remains intentionally block-like rather than visually polished;
- Review can identify and overturn implementation/structural mistakes independently of whether the code compiles;
- no second UI/runtime system was introduced without documented evidence.

The eval-publishing checkpoint is complete for Case 001: the public artifact is deployed and automatically operated after deployment in both desktop-pointer and touch-mobile browser contexts.
