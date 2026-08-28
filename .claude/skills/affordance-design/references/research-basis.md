# Research Basis

## Contents

- Why this reference exists
- Root-principle evidence base
- Execution-rule evidence base
- What is intentionally not encoded
- Maintenance rule

## Why this reference exists

The runtime skill should stay compact and action-oriented. This file preserves why the higher-level rules exist so future maintainers can distinguish durable principles from implementation preferences.

Do not load this file for ordinary interface work unless provenance, rule revision, or research justification is needed.

## Root-principle evidence base

The root-principle layer was synthesized from the project research discussion, including first-party Apple design material reviewed across multiple WWDC generations.

The important result was not a collection of component recipes. The recurring ideas were treated as evidence for deeper causal principles that remain useful when components or platforms change.

### WWDC16 — Iterative UI Design

https://developer.apple.com/videos/play/wwdc2016/805/

Used in the research to support:

- distrust of the first plausible design;
- exploring genuinely different approaches;
- evaluating against user and product goals rather than stylistic preference.

### WWDC17 — Essential Design Principles

https://developer.apple.com/videos/play/wwdc2017/802/

Used in the research to support:

- system and interaction mental models;
- expectation alignment;
- wayfinding;
- feedback;
- visibility;
- consistency;
- proximity and grouping;
- mapping;
- affordance;
- progressive disclosure and its tradeoffs.

### WWDC18 — Intentional Design

https://developer.apple.com/videos/play/wwdc2018/802/

Used in the research to support:

- distinguishing superficial requirements from deeper needs;
- challenging familiar-pattern blindness;
- questioning assumptions before selecting a representation;
- using simplification only when it serves the real purpose.

### WWDC18 — The Qualities of Great Design

https://developer.apple.com/videos/play/wwdc2018/801/

Used in the research to support:

- asking “why is this good?” and “how do we know?”;
- testing assumptions rather than relying on personal intuition alone;
- preserving cognitive energy for the user's actual goal;
- critique as a way to counter designer blind spots.

### WWDC18 — Designing Fluid Interfaces

https://developer.apple.com/videos/play/wwdc2018/803/

Used in the research to support:

- continuous causal feedback;
- direct relationship between user action and interface response;
- interaction as a temporal system rather than a sequence of static screens.

### WWDC19 — Designing Award Winning Apps and Games

https://developer.apple.com/videos/play/wwdc2019/802/

Used in the research to support:

- challenging basic interaction assumptions;
- prototyping fundamentals before polish;
- attribution and transparency for automated results;
- testing unfamiliar interaction models instead of rejecting or accepting them by convention alone.

### WWDC20 — Design for intelligence: Meet people where they are

https://developer.apple.com/videos/play/wwdc2020/10200/

Used in the research to support:

- designing around the person's actual journey and moment;
- delivering value in context rather than assuming every useful interaction begins from a deliberate feature-entry flow.

### WWDC21 — The process of inclusive design

https://developer.apple.com/videos/play/wwdc2021/10304/

Used in the research to support:

- challenging assumptions derived from the design team's own experience;
- treating environment, ability, culture, connectivity, and other real-world conditions as design context;
- using context only when it changes actual decisions.

### WWDC25 — Design foundations from idea to interface

https://developer.apple.com/videos/play/wwdc2025/359/

Used in the research to support:

- structure preceding navigation/content/visual polish;
- inventorying then removing, renaming, and grouping capabilities;
- first-frame orientation;
- recognizing that an attractive interface can still have weak structure;
- iterative refinement of information architecture.

### WWDC26 — Principles of great design

https://developer.apple.com/videos/play/wwdc2026/250/

Used in the research to support:

- Purpose;
- Agency;
- Familiarity without universal pattern reuse;
- Flexibility;
- Simplicity as distinct from minimalism.

## Execution-rule evidence base

The execution layer was derived through repeated concrete design-decision interviews in this project conversation rather than copied from a published framework.

The interviews intentionally avoided asking for abstract principles first. They started from concrete reactions to interface decisions, then used counterexamples to separate variables that initially appeared correlated.

The discussion established these recurring judgments:

```text
- a deliberate user action is already information;
- the next step should not re-ask what current context already resolved;
- a new layer is justified by new information/control/safety value, not by layer count;
- grouping should follow task scope and user problem state before output type or technical source;
- a concrete command and a capability-space launcher have different semantic contracts;
- multiple access paths are healthy when they preserve one conceptual action and exploit already-known context;
- actions can have invocation, target, effect, and persistence scopes simultaneously;
- task weight depends on steps, duration, interruption, and cognitive context shift;
- accepted content becomes user-owned regardless of whether the system originally generated it;
- ADD/TRANSFORM/REPLACE/REMOVE require different levels of control;
- Preview and Undo solve different problems;
- computation, surfacing, and commitment are separate automation permissions;
- proactive help does not need repeated behavior as a prerequisite, but must remain relevant, non-blocking, valuable, and dismissible;
- active engagement should be protected more conservatively than inferred “task completion”;
- a recommendation should resurface because its underlying inputs materially changed, not because time passed;
- live feedback is useful when intermediate state has decision value and does not disrupt input;
- consequence and recovery must be explicit for high-impact actions.
```

These are encoded in `interaction-compiler.md`, `ownership-and-automation.md`, and `anti-average-lint.md`.

## What is intentionally not encoded

The research explicitly rejected making responsive-layout mechanics, Sidebar rules, Toolbar recipes, or platform component catalogs the root of this skill.

Those may be useful downstream references in a future version, but only after semantic decisions are established.

The skill also does not include generic knowledge the model is expected to already possess, such as definitions of common UI components, generic accessibility slogans, or basic visual-design advice.

## Maintenance rule

When adding a new rule, classify it before merging:

```text
ROOT PRINCIPLE
A durable causal principle that explains many downstream choices.

EXECUTION RULE
A repeated decision variable that changes concrete interaction behavior.

LINT RULE
A sufficiently specific failure mode that can reject an output.

EXAMPLE
Evidence that illustrates a rule but does not become the rule.

OPEN QUESTION
A plausible hypothesis that has not yet survived enough counterexamples.
```

Do not promote an example or a single source-specific implementation rule to a root principle without cross-case evidence.