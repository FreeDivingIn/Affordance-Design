# Open Questions

## Contents

- OPEN-01 — Ownership transfer events
- OPEN-02 — Updating visible provisional content
- OPEN-03 — Material-change threshold for recommendation regeneration
- OPEN-04 — Arbitration among multiple eligible recommendations
- OPEN-05 — Current context as default vs capability filter
- OPEN-06 — Deliberate signal vs incidental state
- OPEN-07 — Natural break detection
- Iteration method

These questions are intentionally unresolved. Do not treat them as settled rules in runtime decisions.

They are preserved so future iterations can continue the same evidence-driven interview process without turning hypotheses into doctrine.

## OPEN-01 — Ownership transfer events

Confirmed:

```text
SYSTEM_PROVISIONAL
→ explicit user acceptance
→ USER_OWNED
```

Not yet confirmed:

- Does editing a small part of provisional content immediately transfer ownership of the whole object?
- Does publishing/submitting provisional content count as implicit acceptance?
- Does merely viewing provisional content create any weaker expectation or protection state?

## OPEN-02 — Updating visible provisional content

If a user has already seen a provisional recommendation but has not acted on it, and underlying state changes:

- may the system replace the visible recommendation immediately?
- should it preserve the earlier recommendation for comparison?
- should it delay refresh until context changes?

No rule has been confirmed yet.

## OPEN-03 — Material-change threshold for recommendation regeneration

Confirmed:

- do not resurface because time passed;
- do not resurface merely because the user ignored the previous recommendation;
- resurface only when changed content/state can support a meaningfully better recommendation.

Still unresolved:

- whether the best threshold is based on causal input change, semantic/topic change, expected quality gain, change proportion, or another signal;
- how to compare those signals across recommendation types.

## OPEN-04 — Arbitration among multiple eligible recommendations

When several recommendations are simultaneously relevant, valuable, non-blocking, and context-compatible, the preferred arbitration policy is not confirmed.

Candidate approaches include:

- prefer the recommendation nearest to current local context;
- prefer the highest incremental value;
- aggregate into a low-attention suggestion center;
- wait until the user enters each target context.

Do not encode any candidate as a default yet.

## OPEN-05 — Current context as default vs capability filter

When a user has an active selection/current object and deliberately opens a broad capability space, it is unresolved whether context should:

- only set the default scope;
- remove capabilities incompatible with the current context;
- prioritize context-compatible capabilities while still exposing broader capabilities separately.

## OPEN-06 — Deliberate signal vs incidental state

Confirmed:

- current context should be used to avoid re-asking information the user already supplied.

Not yet confirmed:

- how to distinguish deliberate intent evidence from incidental residual state.

Potential incidental states include:

```text
an object that happens to remain selected
a cursor resting at a location
a stale selection carried from a previous step
focus without an active task
```

This boundary matters because “use context” can otherwise become overconfident inference.

## OPEN-07 — Natural break detection

Confirmed:

- a cognitively closed subtask is an attractive intervention point;
- continuous editing makes cognitive closure difficult to infer reliably;
- visible active engagement should be protected conservatively;
- inactivity alone is insufficient evidence of completion.

Still unresolved:

- what combination of state transitions provides enough evidence that proactive intervention is safe.

## Iteration method

Resolve open questions with concrete cases and counterexamples rather than asking for abstract preferences.

For each question:

```text
1. Present a concrete real or realistic decision.
2. Record the immediate judgment.
3. Change one variable while holding others constant.
4. Find a counterexample to the apparent rule.
5. Identify the smallest variable that explains both cases.
6. Test that variable in an unrelated domain.
7. Promote to CONFIRMED only after the judgment survives the transfer test.
```

Do not close an open question merely because a proposed rule sounds elegant.