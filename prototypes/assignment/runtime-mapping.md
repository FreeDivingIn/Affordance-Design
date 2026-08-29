# Assignment Prototype — Tamagui Runtime Mapping

> Read `interaction-spec.md` first. This mapping is implementation evidence, not the source of the interaction design.

## Frozen semantic behavior

```text
selected work orders
→ explicit Assign command
→ choose one technician
→ immediate commit
→ visible Undo
```

This behavior was selected before consulting Tamagui components.

## Runtime choice

Use one minimal Expo application for React Native and Web.

Reasons for this checkpoint:

- one source tree exercises the same interaction state on Web and Mobile;
- navigation is not part of the interaction under test, so no router is required yet;
- fewer runtime layers make it easier to distinguish an interaction problem from a framework/setup problem;
- Tamagui remains the only UI/runtime component system.

## Presentation mapping

### Hover / pointer environment

Semantic requirement:

```text
local transient choice
+ queue remains perceptually present
+ compact pointer-friendly surface
```

Implementation mapping:

```text
Tamagui Popover
```

The Popover is an implementation choice because it matches the already-selected behavior. Its existence did not create the behavior.

### Touch environment

Semantic requirement:

```text
touch-friendly transient choice
+ generous targets and vertical browsing room
+ selection count/action purpose remain clear
```

Implementation mapping:

```text
Tamagui Adapt when="touchable"
→ Sheet
```

The adaptation is based on input capability rather than treating viewport width as a proxy for Mobile. Tamagui v5 exposes `touchable` as a device-capability media key and reports it as active on native targets.

The content and state machine remain shared. Only presentation changes.

## Primitive mapping

| Semantic need | Tamagui implementation |
|---|---|
| Work queue and rows | `YStack`, `XStack`, `Text`, `Button` |
| Explicit Assign command | `Popover.Trigger` styled as the concrete command |
| Pointer/hover transient choice | `Popover` |
| Touch presentation | `Adapt` + `Sheet` |
| Technician options | plain `Button` rows inside shared chooser content |
| Post-commit consequence | simple in-flow feedback block |
| Recovery | `Undo` button |

No component is allowed to introduce an interaction stage that is absent from `interaction-spec.md`.

## Deliberately not used

- `Select`: the current checkpoint needs a shared custom chooser body with assignment context and explicit post-commit state; using a named selection abstraction provides no additional evidence yet.
- Tabs: there are no sibling page-level views.
- Dialog: no extra commitment/confirmation decision exists.
- Menu: the user has already invoked the concrete Assign command; a broader action menu would violate the frozen affordance contract.
- custom design-system package: no evidence requires one.

## Shared state contract

The exact same interaction model drives both Web and Mobile presentation:

```yaml
selected_work_order_ids:
assignment_surface_open:
work_order_assignments:
previous_assignment_snapshot:
last_commit:
```

The presentation layer must not fork business/interaction semantics by platform.

The state transitions themselves live in `runtime/assignment-model.ts` so presentation adaptation cannot silently redefine selection, commit, or undo semantics.

## Runtime dependencies discovered during verification

Runtime verification surfaced two implementation requirements without changing the interaction design:

1. Tamagui v5's default config types expose Tailwind-aligned shorthand style props, so prototype code uses `p`, `items`, `justify`, `bg`, `minW`, and related forms rather than their longhand aliases.
2. Native Sheet bundling requires `react-native-safe-area-context`; the prototype provides `SafeAreaProvider` at the app root.

These are runtime facts, not interaction-design constraints.

## Runtime failure vs design failure

Runtime failure examples:

- Popover cannot preserve focus as expected;
- Adapt does not move the same content into Sheet correctly;
- Sheet gesture/portal behavior breaks on native;
- a primitive is unavailable or incompatible with the selected Expo baseline.

Design failure examples:

- user is asked to choose an action again after invoking Assign;
- selection is lost on dismissal;
- technician selection adds a redundant confirmation step;
- touch presentation adds a new task stage instead of adapting the same choice;
- Undo does not restore the previous assignment.

A runtime failure may change implementation. It does not automatically justify changing the frozen interaction model.

## Official implementation references

- Tamagui Expo guide: https://tamagui.dev/docs/guides/expo
- Tamagui installation: https://tamagui.dev/docs/intro/installation
- Config v5: https://tamagui.dev/docs/core/config-v5
- Popover: https://tamagui.dev/ui/popover
- Sheet: https://tamagui.dev/ui/sheet
- Tamagui 2 upgrade notes: https://tamagui.dev/docs/guides/how-to-upgrade
