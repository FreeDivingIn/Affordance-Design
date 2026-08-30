# Ownership and Automation

## Contents

- Ownership states
- Mutation types
- Preview vs Undo
- Compute, surface, and commit authority
- Proactive intervention gate
- Attention protection
- Recommendation resurfacing
- Feedback timing
- Consequence and recovery

Use this reference for AI-assisted features, recommendations, proactive help, automated edits, destructive actions, and any interaction where the system may change or suggest changes to user-owned state.

## Ownership states

At minimum, distinguish:

```text
SYSTEM_PROVISIONAL
USER_OWNED
```

### SYSTEM_PROVISIONAL

Content or state produced by the system that the user has not yet accepted as theirs.

The system may continue to recompute or improve this state while it remains provisional, subject to visibility and intervention rules.

### USER_OWNED

Content or state the user has explicitly accepted.

Once accepted, protect it regardless of provenance:

```text
origin = system
ownership = user
```

Do not grant lower protection merely because the system originally produced the content.

## Mutation types

Classify what the action does to value:

```text
ADD
TRANSFORM
REPLACE
REMOVE
```

The key question is not whether AI is involved. The key question is whether the system modifies value the user already owns.

### ADD

Creates value in an unoccupied or optional space without displacing user-owned value.

### TRANSFORM

Changes existing value while preserving some continuity with it.

### REPLACE

Substitutes a materially different result for existing user-owned value.

### REMOVE

Deletes or disables existing value.

## Incremental vs substitutive behavior

The system can usually take more initiative when it adds value without displacing the user's existing result.

When the system replaces or materially transforms user-owned value, increase control and comparison support.

Default requirement for replacement:

```text
show the new result
keep the old result available
let the user decide whether to commit
```

### Example

An accounting tool sees that an empty cost-center field can likely be inferred and offers a candidate. That fills a gap.

If the field already contains a value the user confirmed, a later system inference should not silently overwrite it. Show the alternative and preserve the confirmed value until the user chooses.

## Preview vs Undo

Do not treat Preview and Undo as interchangeable.

```text
Preview
→ supports the decision before commitment

Undo
→ supports recovery after commitment
```

A reversible action may still require Preview when the user needs to judge a replacement before accepting it.

Conversely, a simple mechanical action with clear consequence and cheap recovery may rely on direct execution plus Undo rather than a redundant confirmation step.

## Compute, surface, and commit authority

Never model automation as a single permission.

Decide independently:

```yaml
may_compute:
may_surface:
may_commit:
```

### Compute

The system may prepare a result in the background without consuming user attention.

### Surface

The system may present the result in the current interaction context.

### Commit

The system may change persistent or user-owned state.

Permission at one level does not imply the next.

### Example

A meeting system can privately prepare a suggested agenda without being asked. It may surface the agenda when the user enters agenda-related context. It still should not silently rewrite an invitation the user already finalized unless the product has explicit permission for that behavior.

## Proactive intervention gate

A proactive suggestion, alternative path, or advanced capability can be justified even on first use. Repetition count is not a prerequisite.

Possible reasons include:

- the current path has a meaningful efficiency problem;
- a high-value alternative path exists;
- the user explicitly opened a capability space;
- a business goal can create additional user value rather than merely serving the business.

Every proactive intervention must pass all of these gates:

```text
1. does not block the primary task
2. does not change an already-committed user result
3. does not interrupt obvious active engagement
4. appears in a relevant object/task context
5. provides meaningful incremental value
6. remains dismissible
```

A business objective does not get veto power over task completion.

### Example

A travel service discovers a potentially useful upgrade while the user is entering payment details. The value may be real, but that does not grant permission to interrupt the payment task. Surface it at a relevant, non-blocking point instead.

## Context binding for recommendations

Bind a recommendation to the object or task it affects.

A high-value recommendation should normally remain silent while the user's active attention is focused on an unrelated object.

Do not use global banners or popovers simply because the recommendation score is high.

### Example

An operations system detects a contract renewal risk while the user is editing access permissions. Hold the recommendation until the user is in a contract, supplier, or planning context unless the issue is independently urgent for reasons outside this skill's current scope.

## Attention protection

Treat these as strong evidence that the user is still actively engaged:

```text
typing
moving a cursor through active content
selecting
scrolling
dragging
waiting for a just-triggered result
holding an unfinished local edit
```

Page focus alone is not enough to prove active engagement.

Do not use simple inactivity as proof that a cognitive subtask is complete. A pause can mean thinking.

When task completion cannot be reliably inferred, prefer the conservative question:

```text
Is the user obviously still in the middle of something?
```

rather than:

```text
Has the user probably finished?
```

## Attention footprint

The less certain the system is that a recommendation is relevant now, the less attention it should demand.

Consider:

```text
relevance confidence
expected user value
interruption cost
```

A low-confidence suggestion should not escalate to a modal merely because its possible upside is high.

## Recommendation resurfacing

Do not repeat the same recommendation because:

```text
time passed
the user ignored it
a reminder interval elapsed
```

Reconsider only when underlying state changes enough that the old recommendation is materially invalidated and a meaningfully new recommendation can be produced.

Current derived heuristic:

```text
state change
→ recommendation inputs materially change
→ old recommendation no longer represents the best current advice
→ new recommendation becomes eligible
```

The exact threshold for “materially change” remains open; see `open-questions.md`.

### Example

A procurement system previously recommended delaying a purchase. Changing a contact person's phone number does not justify resurfacing the advice. A material change in stock, demand, delivery lead time, or cost may.

## Feedback timing

Immediate feedback is not automatically superior.

Prefer live updates when all are true:

```text
the intermediate state helps the user's current decision
computation cost is acceptable
updates do not disrupt ongoing input
```

Prefer staged Apply/Preview when:

```text
several settings must be composed before the result is meaningful
intermediate results are noisy or misleading
continuous recomputation is expensive
updates disturb focus or layout
```

### Example

Dragging a route waypoint can benefit from live route changes because the changing route is the object being evaluated. A complex policy editor may be worse if every toggle immediately rebuilds the whole preview and shifts the user's focus.

## Consequence and recovery

For high-impact actions, make the consequence model explicit:

```yaml
consequence:
impact_scope:
reversible:
recovery_path:
recovery_window:
```

Tell the user how to recover, or clearly state that recovery is impossible.

Do not add confirmation mechanically based on action labels such as “delete.” Determine whether an extra confirmation step purchases necessary consequence understanding given impact and recovery cost.

### Example

Removing a temporary role assignment that can be restored immediately may need clear feedback and recovery rather than a heavy confirmation flow.

Permanently closing an organization and destroying historical records requires explicit consequence understanding because the impact scope and recovery cost are much larger.