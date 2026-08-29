# Assignment Prototype — Structural Review

## Review question

Did mapping the frozen interaction model to Tamagui preserve the intended user-state transitions, or did component/runtime availability silently redefine the interaction?

## Evidence reviewed

- `interaction-spec.md` — frozen before runtime mapping.
- `runtime-mapping.md` — implementation mapping created after the semantic model.
- `runtime/assignment-model.ts` — platform-independent selection/assign/undo semantics.
- `runtime/assignment-model.test.ts` — mechanical state-transition tests.
- `runtime/App.tsx` — Tamagui Web/Mobile presentation.
- GitHub Actions — model tests, typecheck, Web export, iOS export.

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

The implementation encountered runtime-specific problems, but none caused the semantic flow to change.

### R2 — Resolved context is reused

**PASS**

The selected work-order IDs are the action target. Invoking Assign does not ask the user which work orders to operate on again.

The only chooser question is the unresolved technician target.

### R3 — Command affordance contract

**PASS**

Assign remains a concrete command. Its surface contains technician choices only; unrelated work-order actions are not exposed after invocation.

### R4 — Extra layer value

**PASS**

There is one transient chooser because technician identity is genuinely unresolved.

Technician selection commits immediately. No additional Apply/Confirm stage exists because no new required uncertainty would be resolved by it and the operation has a recovery path.

### R5 — Cross-platform semantic consistency

**PASS at model/code level; runtime interaction operation still pending**

The same state model drives all targets. Presentation adapts without forking assignment semantics.

A first implementation used viewport width as the adaptation proxy. Review rejected that mapping because the design requirement is touch-friendly interaction, not narrow-screen interaction. The runtime now adapts the chooser to a Sheet using Tamagui's `touchable` capability media; pointer/hover environments retain the Popover presentation.

This change refined presentation mapping without changing the frozen task model.

### R6 — Consequence and recovery

**PASS at model/code level**

Commit records the affected IDs and chosen technician. The previous assignee values are snapshotted and Undo restores them.

The post-commit state exposes affected count, technician, and Undo.

### R7 — Dismissal preserves selection

**PASS by state ownership inspection; direct UI operation still pending**

Chooser open/close state is independent from selected work-order IDs. Closing the chooser does not mutate selection in the implementation model.

### R8 — Visual fidelity does not hide structure

**PASS by source review**

The prototype uses plain stacks, text, simple borders, selection markers, buttons, and a single transient choice surface. It does not add brand styling, decorative dashboards, ornamental cards, marketing imagery, gradients, or visual-system polish.

## Runtime issues discovered without redesigning the interaction

### Tamagui v5 style vocabulary

The initial code used longhand style props that are intentionally omitted from v5 default-config types when a shorthand exists. The runtime was corrected to the v5 shorthand vocabulary. No interaction decision changed.

### Native Sheet safe-area dependency

The iOS bundle exposed a missing `react-native-safe-area-context` dependency required by the Sheet native path. The dependency and root provider were added. No interaction decision changed.

These failures are useful evidence for the engineering boundary: runtime incompatibility should first change implementation, not rewrite a validated interaction model.

## Mechanical verification

Confirmed so far:

```text
platform-independent model tests: PASS (4/4)
typecheck: PASS
Web Expo export: PASS
iOS Expo export: PASS on the safe-area-fixed runtime before the touch-capability mapping
```

The final touch-capability mapping is being re-run through the same CI suite. Do not treat the final runtime build as closed until that run passes.

## Not yet verified

The following are intentionally not claimed as complete:

- actual pointer interaction in a running Web browser;
- actual Sheet interaction on an iOS/Android simulator or physical device;
- keyboard/focus behavior through the full chooser path;
- touch gesture quality with a long technician list;
- production accessibility review;
- visual design quality;
- performance or bundle-size optimization.

These belong to the next runtime-operation benchmark, not to the interaction-model freeze.

## Review decision

The prototype remains structurally valid after the first implementation review. Review did overturn one implementation assumption — width-based adaptation — without overturning the underlying interaction design.

That distinction is an intended capability of the Skill: Review must be able to reject its just-completed implementation while preserving upstream decisions that still hold.
