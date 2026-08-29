# Native iOS Validation — Environment Evidence (2026-08-29)

## Status

**BLOCKED — DEFERRED_GAP.** Native operation was attempted on 2026-08-29 and paused by user decision after the environment proved unable to inject taps into the simulator without an Accessibility permission grant.

## What was established (progress beyond previous state)

- This machine has full Xcode (`xcodebuild`, `xcrun simctl`) and iOS 26.5 simulators (iPhone 17 Pro etc.). The old blocker "no simulator available" no longer holds.
- iPhone 17 Pro simulator boots and runs.
- Expo Go 57.0.9 (`host.exp.Exponent`, matching the runtime's Expo SDK ~57) was downloaded from `expo/expo-go-releases` and installed into the simulator successfully.
- Metro served the contact-merge runtime on `localhost:8082`; `simctl openurl booted exp://127.0.0.1:8082` reaches the simulator and Expo Go launches.
- `.gitignore` added for `node_modules/`, `ios/`, `dist-*/`, `.expo/`.

## The blocking limitation

iOS 26 shows a system confirmation alert ("在 Expo Go 中打开？") before opening the `exp://` URL. Dismissing/confirming it — and all subsequent prototype operation — requires real taps inside the Simulator window.

Synthetic input is not possible from this environment:

- `CGEventPost` mouse events (pyobjc/Quartz) are silently swallowed, even with correct window/device coordinate mapping (verified: mapping was accurate to ~1 pt).
- AppleScript `System Events` click fails with `-10004` (assistive access denied).
- Granting Accessibility permission to the host process is a user-owned system decision; the user chose to pause instead.
- `brew install` (for CocoaPods / idb_companion) is blocked by the sandbox policy on `/usr/local`, so neither a dev-client build (needs CocoaPods) nor idb-based tap injection is available.

## How to resume

1. Grant Accessibility permission to the terminal/WorkBuddy host (System Settings → Privacy & Security → Accessibility), **or** install CocoaPods + build a dev client (needs brew access), **or** run XCUITest-based UI automation.
2. Reboot the simulator, reinstall Expo Go from `/tmp/ExpoGo/Expo Go.app` if wiped, start Metro (`npx expo start --port 8082 --localhost` in this directory), `simctl openurl booted exp://127.0.0.1:8082`.
3. Operate the frozen Case 002 flows: select two contacts → Merge → primary-contact decision → commit → Undo; verify native Sheet presentation/dismissal preserves selection; record safe-area and touch behavior.
4. Update `tasks/active/tamagui-prototype-runtime.md` Open Issues and the runtime milestone closing condition.

## Environment pitfalls encountered (for future runs)

- npm through the local proxy is extremely slow (full install ~37 min) and corrupted one cacache entry; fix was deleting the orphaned content file named in the error.
- The sandbox broker denies npm's rename-retire of pre-existing `node_modules` entries (`CODEBUDDY_BROKER_DENY`); a clean install works only from a truly absent `node_modules` — move broken trees aside instead of `rm -rf` (bulk-delete guard requires confirmation).
- `git mv` does not stage pending content edits; verify with `git status` after.
