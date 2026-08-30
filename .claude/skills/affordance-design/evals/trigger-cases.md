# Trigger Evaluation Cases

Use these cases to test the `description` field separately from behavior quality.

The skill should trigger for structural interaction decisions and remain inactive for purely visual styling work.

## Should trigger

1. “This editor has Upload, Import, Generate, and Sync in one menu and it feels wrong. Help me reorganize the interaction.”
2. “Review this information architecture. I cannot tell which actions belong to the selected object versus the whole workspace.”
3. “Should this task be a modal, inline flow, or separate workspace? It takes several steps and pauses the user's main task.”
4. “Our AI keeps suggesting useful actions while people work. Define when recommendations can appear without becoming annoying.”
5. “The product spec says we need a dashboard and cards, but I want you to challenge the structure before designing it.”

## Should not trigger

1. “Choose a more premium color palette for this landing page.”
2. “Improve the typography pairing and line height.”
3. “Make these shadows and corner radii feel less generic.”
4. “Create an illustration style for our empty states.”
5. “Convert these spacing values into CSS variables without changing the layout.”

## Ambiguous — should trigger only if structural decisions are part of the task

1. “Make this page feel simpler.”
   - Trigger if simplification changes information visibility, interaction steps, or action placement.
   - Do not trigger if the user explicitly asks only for visual styling cleanup.

2. “Improve the responsive behavior of this workspace.”
   - Trigger if pane relationships, task continuity, action scope, or preserved context must change.
   - Do not trigger for implementation-only breakpoint/CSS fixes with unchanged interaction structure.

3. “Improve the accessibility of this form.”
   - Trigger if task flow, affordance clarity, feedback, consequence, or state visibility needs restructuring.
   - Do not trigger for isolated contrast/token remediation when no interaction structure changes.

## Evaluation target

Test at least:

```text
trigger precision
trigger recall
coexistence with visual-design skills
under-triggering on vague structural language
over-triggering on purely aesthetic requests
```

Do not widen the description merely to improve recall if that causes the skill to steal unrelated visual-design tasks.