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
- Milestone 7 implementation portion: added `evals/` with a renderable catalog, machine-readable case definition, human case page, and a Pages workflow that rebuilds the actual Expo Web prototype at deployment time instead of committing generated output.
- Pages build preparation was executed in GitHub Actions successfully through dependency install, Expo export with the repository subpath, and `_site` assembly.

## Current State

The first representative interaction is frozen independently of Tamagui and implemented as a block-like universal prototype.

Runtime mapping currently preserves one semantic state model while allowing presentation adaptation. Review already overturned one implementation assumption — viewport-width adaptation — in favor of input-capability adaptation without changing the frozen interaction model.

Milestone 6 browser-operation testing is still being closed. Pointer Web operation has produced positive evidence; touch/mobile browser emulation remains the unresolved runtime-operation area and must not be reported as complete native interaction validation.

Milestone 7 repository work is ready. GitHub Pages deployment currently stops only at `actions/configure-pages@v5` because the repository has no Pages site enabled/configured for GitHub Actions. The generated eval site and nested Expo prototype build both complete successfully before that step.

## Open Issues

- GitHub Pages must be enabled once at repository level with Source = `GitHub Actions`; the current GitHub connector does not expose a repository-Pages settings mutation.
- Actual native Sheet interaction still needs simulator or physical-device operation evidence.
- Touch/mobile browser benchmark needs final closure after separating pointer and touch test projects.
- No evidence yet justifies a custom design system, component registry, additional component library, or abstraction layer.
- A successful static export still does not prove focus, gesture, or interaction quality.

## Decisions

- Tamagui is the only component/runtime system during the initial prototype phase.
- Do not create a cross-library pattern registry or adapter layer during this milestone.
- Do not browse or enumerate Tamagui components during design divergence.
- Component names are implementation vocabulary, not interaction-design vocabulary.
- The default artifact is a low-visual-fidelity, high-behavior-fidelity block prototype.
- Web and Mobile may use different presentations after semantics are fixed; the task/scope/state/recovery contract should remain consistent unless context justifies a different model.
- Prefer composition of simpler Tamagui primitives over changing a validated interaction model merely to fit a stock component.
- Do not build a generic component showcase as the first prototype checkpoint.
- Eval Pages must publish the real generated runtime output, not a separately hand-authored mock that can drift from the tested source.
- Machine-readable eval assertions live beside human-rendered review pages; generated runtime bundles remain build artifacts rather than project truth.

## Constraints

- Do not let Tamagui demo aesthetics influence structural choice.
- Do not add visual-system polish before structural validation.
- Do not add another UI library without evidence meeting the re-evaluation conditions in `engineering-contract.md`.
- Keep current Tamagui API/version details in implementation/reference material, not product behavior documents.
- A successful render is not a successful prototype; key paths must be operated and reviewed.
- The first runnable prototype must start from an interaction specification that was produced without Tamagui component vocabulary.
- Do not treat GitHub Pages enablement failure as a runtime implementation failure when the site build itself succeeds.

## Hypotheses

- Tamagui's unstyled/styled primitives plus `Adapt` will be sufficient for the first set of structural prototypes without a custom design system.
- Loading Tamagui knowledge only after structural choice will reduce component-led convergence compared with component-first prompting.
- A deliberately neutral visual grammar will make structural defects easier to see and easier for Review to overturn.
- Renderable eval pages will make structural review easier to compare across cases than CI logs or Markdown-only outputs.

## Deferred

- Custom pattern/component registry.
- Additional headless/component libraries.
- MCP/component discovery integration.
- Production visual design system.
- Compiler/performance optimization beyond what the first prototype requires.
- Packaging or publishing a reusable prototype runtime package.
- Custom eval hosting beyond GitHub Pages unless Pages becomes a persistent repository constraint.

## Next

1. Enable repository Pages once: `Settings → Pages → Build and deployment → Source → GitHub Actions`.
2. Re-run `Affordance evals Pages`; verify the published catalog and `/cases/001-bulk-assignment/prototype/` URL render correctly.
3. Finish the touch/mobile browser-operation benchmark and update `prototypes/assignment/structural-review.md` with observed evidence.
4. Operate at least one native Mobile target before closing Milestone 6.
5. After the first case is externally reviewable, add the next eval only when it exercises a distinct Affordance rule rather than growing a showcase catalog.

## Verification

The runtime milestone is complete when:

- a runnable Tamagui prototype works on Web and at least one native Mobile target;
- the design decision can be reconstructed without referencing component availability;
- the same semantic interaction is preserved across platform presentation changes where expected;
- the prototype remains intentionally block-like rather than visually polished;
- Review can identify and overturn a structural mistake independently of whether the code runs;
- no second UI/runtime system was introduced without documented evidence.

The eval-publishing checkpoint is complete when:

- repository Pages is enabled for GitHub Actions;
- the Pages workflow builds and deploys successfully;
- the catalog URL opens externally;
- case 001 opens as a review page;
- the embedded and direct prototype URLs load the actual Expo-generated runtime from the Pages subpath;
- `case.json` remains accessible beside the human review page.
