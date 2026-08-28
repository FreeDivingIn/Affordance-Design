# Tamagui Prototyping

Use this reference only **after** the interaction model has been designed and selected.

Do not read it to generate the initial interaction concept.

## Contents

- Purpose in Affordance Design
- What Tamagui actually provides
- Cross-platform adaptation
- Component mapping discipline
- Prototype fidelity
- AI-oriented tooling
- Initial implementation baseline
- Known boundaries
- Sources

## Purpose in Affordance Design

Tamagui is the initial single runtime for turning a validated interaction model into a runnable Web / Mobile structural prototype.

It is not the source of the interaction model.

Required boundary:

```text
interaction behavior first
→ Tamagui mapping second
```

If the reasoning starts with a list of Tamagui components and then invents a flow that fits them, stop and return to the interaction compiler.

## What Tamagui actually provides

According to the current official Tamagui documentation:

- Tamagui targets both React Native and React web through the same core system.
- Tamagui UI provides styled and unstyled composable components.
- Tamagui 2 is the current major version baseline used by this project.
- A subset of components also has headless packages in v2; do not assume every Tamagui component is available headless.
- Tamagui configuration includes themes, tokens, media rules, animations, and component settings.
- The compiler can optimize shared React Native / Web styling, but the compiler is not required to begin using Tamagui.

For Affordance Design, prefer the minimum Tamagui capability necessary to express and test the interaction.

## Cross-platform adaptation

Tamagui's `Adapt` mechanism can change the presentation of the same composed interaction by platform or media condition.

The official Popover documentation explicitly says popovers are not a recommended mobile pattern and demonstrates adapting Popover content into a Sheet on smaller screens.

The official Select documentation similarly uses `Adapt` / Sheet for native presentation and notes that native select presentation differs from web.

This is useful only after the semantic interaction has been fixed.

Correct reasoning:

```text
semantic need:
local transient choice with preserved context

then map:
wide / pointer-capable context → suitable anchored surface
small / touch context → suitable sheet-like surface
```

Incorrect reasoning:

```text
Tamagui has Popover + Sheet
→ therefore the product should use a popover on desktop and sheet on mobile
```

The library can implement an adaptation; it does not prove the adaptation is right for the task.

## Component mapping discipline

Do not use Tamagui component names while generating early structural alternatives.

After one interaction model wins, map semantics to the smallest sufficient primitives.

Examples of implementation-level mappings:

```text
anchored transient surface
→ Popover when appropriate on Web
→ Adapt to Sheet when appropriate on Mobile

single-value choice
→ Select when its interaction semantics match

page-level sub-views
→ Tabs only after the information architecture proves sibling views

mobile bottom surface
→ Sheet when the task actually benefits from that presentation
```

These are mappings, not design rules.

If no stock component exactly expresses the chosen interaction, compose Tamagui primitives rather than changing the interaction model merely to fit a named component.

## Prototype fidelity

Affordance prototypes should be visually neutral and structurally explicit.

Prefer:

- `View`, stack, text, button, input, and the minimum overlay / choice primitives needed;
- unstyled or minimally styled behavior when default component styling adds visual opinion unrelated to structural testing;
- explicit state labels when a state would otherwise be hard to observe in a low-fidelity prototype;
- simple responsive/platform presentation changes that preserve semantic behavior.

Avoid during structural prototyping:

- theme exploration;
- polished token systems;
- decorative variants;
- elaborate motion;
- component showcase pages;
- choosing a component because its demo looks attractive.

## Responsive and capability-sensitive behavior

Tamagui media queries can be used consistently across native and web. Current v5 configuration includes width breakpoints and device-capability-oriented queries such as touch / hoverability.

Do not equate responsive behavior with viewport width alone.

If the interaction meaning depends on input capability, model that requirement first, then use the relevant Tamagui media/platform mechanism to implement it.

Tamagui group/container styling can also respond to parent size. On native, parent measurement may only become available after layout; do not make critical first-frame semantics depend on an unverified measurement behavior.

## Interaction quality supplied by Tamagui

Several Tamagui components already implement important interaction mechanics that should be reused rather than recreated casually.

Examples from current official documentation include:

- Popover focus-scope controls and bounded positioning;
- Menu keyboard/focus highlighting behavior;
- Tabs keyboard navigation and controlled/uncontrolled activation;
- Sheet drag behavior and scroll/gesture coordination;
- Context Menu native/web interaction support;
- Select adaptation for native presentation.

Using these mechanics reduces implementation errors, but none of them replaces Affordance Design's decision about whether the pattern belongs in the product.

## AI-oriented tooling

The Tamagui CLI can generate an LLM-friendly prompt from the actual project configuration.

Current official CLI documentation states that `tamagui generate-prompt` can include project tokens, themes, component configuration, fonts, media queries, and breakpoints.

Use this only in the implementation phase to help an agent write code that matches the actual Tamagui setup.

Do not load the generated prompt before interaction design. Doing so would reintroduce component/config availability as an early design anchor.

Recommended order:

```text
1. finish interaction reasoning
2. freeze the selected structural behavior
3. load this Tamagui reference
4. if implementing in a configured repo, load generated Tamagui prompt
5. map behavior to primitives
6. build block prototype
7. operate and review the prototype
```

## Initial implementation baseline

Use Tamagui 2 with the current recommended v5 configuration when creating the first prototype runtime.

Current official requirements at the time of research:

- React 19+
- TypeScript 5+
- React Native 0.81+ with New Architecture for native applications

The installation guide recommends starting simply and warns against over-configuring too early. Follow that constraint here: do not build a custom design system before the prototype evidence requires one.

## Known boundaries

Do not assume:

- every web component has an identical mobile visual form;
- every Tamagui UI component has a headless implementation;
- the compiler must be configured before prototypes can run;
- a stock Tamagui component is always preferable to composing simpler primitives;
- responsive adaptation is a substitute for reasoning about different usage contexts.

## Sources

Official Tamagui sources used for this reference:

- Introduction: https://tamagui.dev/docs/intro/introduction
- Installation: https://tamagui.dev/docs/intro/installation
- Tamagui UI: https://tamagui.dev/ui/intro
- Configuration: https://tamagui.dev/docs/core/configuration
- Config v5: https://tamagui.dev/docs/core/config-v5
- useMedia: https://tamagui.dev/docs/core/use-media
- Styling / group containers: https://tamagui.dev/docs/intro/styles
- Popover: https://tamagui.dev/ui/popover
- Select: https://tamagui.dev/ui/select
- Sheet: https://tamagui.dev/ui/sheet
- Menu: https://tamagui.dev/ui/menu
- Tabs: https://tamagui.dev/ui/tabs
- Context Menu: https://tamagui.dev/ui/context-menu
- Tamagui CLI / generate-prompt: https://tamagui.dev/docs/guides/cli
- Tamagui 2 release notes: https://tamagui.dev/blog/version-two
