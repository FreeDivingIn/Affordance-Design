# Assignment Prototype — Structural Review

## Review question

Did mapping the frozen interaction model to Tamagui preserve the intended user-state transitions, or did component/runtime availability silently redefine the interaction?

## Evidence reviewed

- `interaction-spec.md` — frozen before runtime mapping.
- `runtime-mapping.md` — implementation mapping created after the semantic model.
- `runtime/assignment-model.ts` — platform-independent selection/assign/undo semantics.
- `runtime/assignment-model.test.ts` — mechanical state-transition tests.
- `runtime/App.tsx` — Tamagui Web/Mobile presentation.
- `runtime/e2e/assignment.spec.ts` — local exported-Web pointer/touch operation tests.
- `runtime/e2e/pages-smoke.mjs` — deployed Pages pointer/touch operation test.
- GitHub Actions — model tests, typecheck, Web export, iOS export, local browser operation, Pages build/deploy, and deployed browser smoke.

## Frozen semantic contract

```text
selected work orders
→ explicit Assign command
→ choose one technician
→ immediate commit
→ visible Undo
```

The runtime is not allowed to add a capability catalog, re-request the selected objects, insert a redundant confirmation stage, or fork the semantic state machine by platform.

## Review findings

### R1 — Component-first convergence

**PASS**

The interaction specification existed before Tamagui mapping and does not contain Tamagui component vocabulary. Component names first appear in the runtime mapping.

Runtime-specific failures were fixed at the implementation/configuration layer. None caused the semantic flow to change.

### R2 — Resolved context is reused

**PASS**

The selected work-order IDs remain the action target. Invoking Assign does not ask the user which work orders to operate on again.

The only chooser question is the unresolved technician target.

### R3 — Command affordance contract

**PASS**

Assign remains a concrete command. Its surface contains technician choices only; unrelated work-order actions are not exposed after invocation.

### R4 — Extra layer value

**PASS**

There is one transient chooser because technician identity is genuinely unresolved.

Technician selection commits immediately. No additional Apply/Confirm stage exists because no new required uncertainty would be resolved by it and the operation has a recovery path.

### R5 — Cross-platform semantic consistency

**PASS for exported Web pointer/touch contexts; native device operation remains open**

The same state model drives all targets. Presentation adapts without forking assignment semantics.

A first implementation used viewport width as the adaptation proxy. Review rejected that mapping because the design requirement is touch-friendly interaction, not narrow-screen interaction. The runtime now adapts the chooser to a Sheet using Tamagui's `touchable` capability media; pointer/hover environments retain the Popover presentation.

After the animation-driver fix, Playwright operates both pointer Web and touch/mobile Web through the same semantic path successfully. GitHub Pages is also smoke-tested after deployment in both contexts.

This preserved the frozen task model while changing only presentation/runtime configuration.

### R6 — Consequence and recovery

**PASS for model and exported-Web operation**

Commit records the affected IDs and chosen technician. Previous assignee values are snapshotted and Undo restores them.

The local browser benchmark executes assignment and Undo in pointer and touch/mobile contexts. The deployed Pages smoke test executes assignment and verifies visible post-commit feedback in both contexts.

### R7 — Dismissal preserves selection

**PASS**

Chooser open/close state is independent from selected work-order IDs. The pointer browser test opens the chooser, dismisses it with Escape, verifies that the three-item selection remains, and reopens Assign without re-selecting the target set.

The platform-independent state model also keeps selection ownership outside chooser visibility.

### R8 — Visual fidelity does not hide structure

**PASS by source and browser-operation review**

The prototype uses plain stacks, text, simple borders, selection markers, buttons, and a single transient choice surface. It does not add brand styling, decorative dashboards, ornamental cards, marketing imagery, gradients, or visual-system polish.

## Runtime issues discovered without redesigning the interaction

### Tamagui v5 style vocabulary

The initial code used longhand style props that are intentionally omitted from v5 default-config types when a shorthand exists. The runtime was corrected to the v5 shorthand vocabulary. No interaction decision changed.

### Native Sheet safe-area dependency

The iOS bundle exposed a missing `react-native-safe-area-context` dependency required by the Sheet native path. The dependency and root provider were added. No interaction decision changed.

### Missing Tamagui v5 animation driver caused a touch-only blank screen

The base `@tamagui/config/v5` configuration does not include an animation driver. The touch/mobile path renders a Sheet, whose animation state requires a driver. In touch browser emulation this produced the runtime error:

```text
Cannot read properties of undefined (reading 'setValue')
```

Because the error occurred during render, the deployed prototype appeared blank on touch/mobile devices while pointer Web could still work.

The fix was configuration-only:

```text
@tamagui/config/v5
+
@tamagui/config/v5-rn animations
```

The interaction specification, state model, action scopes, chooser semantics, and recovery behavior were not changed.

This failure is important evidence for the engineering boundary: a runtime problem should first change implementation/configuration, not force a redesign of a validated interaction model.

## Mechanical and runtime verification

Current confirmed evidence:

```text
platform-independent model tests: PASS (4/4)
TypeScript: PASS
Web Expo export: PASS
iOS Expo export: PASS
local pointer Web operation: PASS
local touch/mobile Web operation: PASS
GitHub Pages build: PASS
GitHub Pages deploy: PASS
deployed desktop-pointer smoke: PASS
deployed touch-mobile smoke: PASS
```

The deployed smoke test opens the public prototype URL, verifies the initial `3 selected` state, invokes Assign, verifies the expected platform presentation, selects a technician, and verifies committed feedback while failing on any browser page/console error.

## Not yet verified

The following are intentionally not claimed as complete:

- actual Sheet interaction on an iOS/Android simulator or physical device;
- keyboard/focus behavior through the complete accessibility path beyond the tested Escape dismissal;
- touch gesture quality with a long technician list;
- production accessibility review;
- visual design quality;
- performance or bundle-size optimization.

## Review decision

The prototype remains structurally valid after implementation and browser-operation review.

Review overturned two implementation assumptions without overturning the upstream interaction model:

1. viewport-width adaptation was replaced by input-capability adaptation;
2. the incomplete Tamagui v5 configuration was corrected with an explicit animation driver after touch/mobile execution exposed a blank-screen runtime failure.

The second failure also changed the verification standard: static export and successful deployment are no longer sufficient evidence that an eval prototype is usable. Pages deployment now has a post-deploy browser smoke gate for pointer and touch/mobile contexts.

This is an intended capability of the Skill: Review must be able to reject its just-completed implementation while preserving upstream decisions that still hold.
