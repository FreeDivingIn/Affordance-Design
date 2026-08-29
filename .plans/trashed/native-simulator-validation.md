# Native iOS Simulator Validation for Tamagui Prototypes

Status: TRASHED
Trashed reason: user paused native validation — simulator tap injection requires a user-owned Accessibility permission grant; progress and resume path recorded in prototypes/contact-merge/native-evidence.md
Revision: 1
Approval: APPROVED r1
Updated: 2026-08-29

## 1. Confirmed basis

**Goal**: Unblock the long-standing native-mobile validation gap in `tasks/active/tamagui-prototype-runtime.md` — operate at least one runnable prototype on a native iOS target and record the evidence, so the final runtime milestone can close.

**New evidence (2026-08-29)**: this machine has Xcode + `xcrun simctl` with iOS 26.5 simulators (iPhone 17 Pro, iPhone Air, etc.). The previous blocker "connected environment cannot operate an iOS/Android simulator" no longer holds.

**Success criteria**:

- At least one prototype runtime runs natively in an iOS simulator and its core interaction flows are operated successfully.
- Native-specific evidence is recorded for behaviors Web/mobile-touch could not prove: native Sheet presentation/dismissal, touch gesture quality, safe-area behavior.
- Findings are written back to `tasks/active/tamagui-prototype-runtime.md` (Open Issues / Verification); if the native target passes, the runtime milestone's closing condition is evaluated.
- No change to frozen interaction specs; runtime failures are fixed at implementation/configuration level only.

**In scope**:

- One primary target: `prototypes/contact-merge/runtime` (Case 002 — uses Sheet; the task file explicitly names native Sheet interaction as the missing evidence).
- Secondary (only if primary succeeds cheaply): `prototypes/media-template-composer/optimized-runtime`.
- Simulator setup, Expo dev-client build (`expo prebuild` / `run:ios`), app install, manual/semi-automated operation, evidence notes.
- `.gitignore` additions for native build artifacts (`ios/`, `dist-ios/`, etc.) if generated.

**Out of scope**:

- Android, physical devices, watchOS.
- With-Skill vs without-Skill comparison (separate future plan).
- Production accessibility audit, App Store concerns, CI integration of native builds.
- Any redesign of interaction behavior.

**Constraints**:

- Frozen interaction semantics must not be redefined by platform limitations; discrepancies are recorded as findings, not patched over by redesign.
- Native build artifacts are local-only; no large binaries committed.
- No Apple Developer account / paid credentials available — simulator only, no device signing.

## 2. Proposed approach and rationale

Expo managed workflow: `npx expo prebuild --platform ios` to generate the native project, then `npx expo run:ios` to build a dev client into a booted iPhone simulator. Operate the app directly (driven via `xcrun simctl` + accessibility inspection where scriptable, otherwise guided operation and screenshots).

Rationale: dev-client build is the only managed-workflow path that does not require Expo Go installation into the simulator and exercises true native rendering (not WebView). One build per runtime; incremental after the first.

Fallback if the native build fails for environmental reasons: run the Metro server and install Expo Go for iOS simulator (downloaded .app), noting reduced fidelity for Sheet behavior.

## 3. Work phases and dependencies

```text
P1 Boot iPhone 17 Pro simulator (iOS 26.5); verify toolchain (Xcode license, pods)
P2 contact-merge: npm install → expo prebuild → expo run:ios build & launch
P3 Operate core flows natively:
   select two contacts → Merge → primary-contact decision → commit → Undo;
   Sheet presentation/dismissal preserving selection; safe-area/layout check
P4 Record native evidence + discrepancies; update task file
P5 (conditional) repeat P2–P4 for media-template-composer optimized runtime
P6 Commit docs/.gitignore updates; push
```

## 4. Action ownership

| Action | Class | Owner | Evidence |
|---|---|---|---|
| P1 simulator setup | CRITICAL_PATH | coordinator | booted device list |
| P2 native build | CRITICAL_PATH | coordinator | build log, installed app |
| P3 operation | CRITICAL_PATH | coordinator | screenshots + behavior notes |
| P4 task file update | CRITICAL_PATH | coordinator | committed diff |
| P5 second runtime | USER_LEVERAGED | coordinator | same as P2–P4 |
| P6 publish | CRITICAL_PATH (external: push) | coordinator | pushed commits |

Single-agent rationale: sequential, stateful simulator/session work; delegation adds handoff risk with no parallelism benefit. No configured multi-agent contract exists in this workspace.

## 5. Agent assignments

Single coordinator (see §4). All writes local except the final push.

## 6. Expected changed files

```text
M  tasks/active/tamagui-prototype-runtime.md   (native evidence, open-issue status)
A  prototypes/contact-merge/native-evidence.md (operation notes + findings)
A  prototypes/media-template-composer/native-evidence.md (only if P5 runs)
M  .gitignore                                  (ios/, dist-ios/, native build output)
```

Untracked local-only: `prototypes/*/runtime/ios/` (generated native projects), Metro caches. No runtime source (`.tsx`/model) changes expected; if a config fix is required it will be minimal and reported.

## 7. Validation and review plan

- App must launch in the simulator without red-box errors.
- Every P3 flow must behave per the frozen interaction spec; any deviation is recorded with screenshot evidence.
- Cross-check: behaviors asserted by CI (model tests, web smoke) must match native observation; contradictions are findings, not silent fixes.
- Self-review against milestone closing condition; no independent reviewer configured — review is not independent and will be stated as such.

## 8. Permission-requiring or irreversible actions

- `git push` to `origin/skill/init-affordance-design` (external, routine docs publish; triggers Pages CI only if watched paths change — native evidence files under `prototypes/*/runtime/` subpaths may trigger per-prototype CI; that is acceptable and reversible).
- Xcode may request license acceptance / components on first build (local, free).

## 9. Risks, assumptions, fallbacks

- **Risk**: Expo SDK 57 vs Xcode 26 / iOS 26.5 build incompatibility. **Fallback**: Expo Go path; if both fail, record the environment limitation and keep the milestone open with concrete error evidence.
- **Risk**: first native build is slow (pods + Xcode build can exceed 10 min). Mitigation: background execution, no timeout-driven aborts.
- **Risk**: simulator interaction automation limits. Mitigation: `simctl` + accessibility-tree inspection where possible; screenshots + structured notes otherwise.
- **Assumption**: npm install of runtime deps succeeds (CI-proven lockfiles).
- **Assumption**: Sheet native behavior differences, if any, are presentation-level and recordable without spec changes.

## 10. Completion definition

- At least one prototype operated natively in the simulator with per-flow results recorded.
- Native evidence file(s) committed; task file Open Issues updated; milestone closing condition explicitly evaluated (closed or kept open with named residual gaps).
- Docs pushed; plan archived to `.plans/completed/`.
