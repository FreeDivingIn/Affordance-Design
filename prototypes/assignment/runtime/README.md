# Assignment Prototype Runtime

This is the first runnable Affordance Design checkpoint.

Read these in order before changing interaction behavior:

1. `../interaction-spec.md`
2. `../runtime-mapping.md`
3. this runtime

The interaction specification was frozen before Tamagui component mapping.

## Run

```bash
npm install
npm run web
```

For native development with an available simulator/device:

```bash
npm run ios
# or
npm run android
```

## Verification

```bash
npm run typecheck
npm run export:web
npm run export:ios
```

Export is a bundle/build-level verification.

## Behavior to verify

1. Three work orders begin selected.
2. `Assign` opens only technician choice; it does not expose unrelated capabilities.
3. Dismissing the choice surface preserves the selection.
4. Choosing a technician commits immediately.
5. The affected count and technician are visible after commit.
6. `Undo` restores the prior assignees.
7. Wide Web uses a local anchored choice surface.
8. Small-screen presentation adapts to a sheet without changing task semantics.

## Fidelity

This intentionally looks like blocks, not a finished product. Do not add visual polish unless it is necessary to make a structural state observable.
