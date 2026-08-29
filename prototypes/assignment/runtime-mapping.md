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

### Wide Web

Semantic requirement:

```text
local transient choice
+ queue remains perceptually present
+ pointer/keyboard environment
```

Implementation mapping:

```text
Tamagui Popover
```

The Popover is an implementation choice because it matches the already-selected behavior. Its existence did not create the behavior.

### Small / Mobile

Semantic requirement:

```text
touch-friendly transient choice
+ more vertical browsing room
+ selection count/action purpose remain visible
```

Implementation mapping:

```text
Tamagui Adapt
→ Sheet
```

The content and state machine remain shared. Only presentation changes.

Tamagui's current Popover documentation explicitly recommends adapting popover content to a Sheet for mobile/small-screen use.

## Primitive mapping

| Semantic need | Tamagui implementation |
|---|---|
| Work queue and rows | `YStack`, `XStack`, `Text`, `Button` |
| Explicit Assign command | `Button` |
| Wide transient choice | `Popover` |
| Small/mobile presentation | `Adapt` + `Sheet` |
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

The exact same state variables drive both Web and Mobile presentation:

```yaml
selected_work_order_ids:
assignment_surface_open:
work_order_assignments:
previous_assignment_snapshot:
last_commit:
```

The presentation layer must not fork business/interaction semantics by platform.

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
- Mobile adds a new task stage instead of adapting presentation;
- Undo does not restore the previous assignment.

A runtime failure may change implementation. It does not automatically justify changing the frozen interaction model.

## Official implementation references

- Tamagui Expo guide: https://tamagui.dev/docs/guides/expo
- Tamagui installation: https://tamagui.dev/docs/intro/installation
- Popover: https://tamagui.dev/ui/popover
- Sheet: https://tamagui.dev/ui/sheet
- Tamagui 2 upgrade notes: https://tamagui.dev/docs/guides/how-to-upgrade
