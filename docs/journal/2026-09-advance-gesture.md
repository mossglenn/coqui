# 2026-09-01 — The advance gesture, and what the fork is decided on

**Supersedes** `design/review-experience.md` §Advancing as first settled — *the last gesture of
Stage 2 advances* — and the cost basis in `design/review-motion-fork.md` §Cost, on a clean item.
**Current truth:** `design/claims.md` §The advance gesture, `design/review-experience.md`
§Advancing, `design/review-motion-fork.md` §Cost, and `../../prototypes/phase-2/shell.md`.

---

## The rule was settled in the morning and broken by the first drawing

> **The last gesture of Stage 2 advances.** The fifth confirmation in a sequential motion, the bulk
> control in a surveyed one — no separate *next* control, because a required gesture that buys only
> navigation is the thing `claims.md` refuses.

Settled 2026-09-01, in a section written about the MultipleChoice fork. The same day,
MultipleSelect came into scope. The shell was drawn against both a few hours later.

**The MultipleSelect comparison step has a required set of exactly one gesture — the stem claim —
and that gesture scopes over nothing else on the screen.** It does not attest the option rows; the
markings did that, blind, on the previous screen. It does not cover the item-scoped objection
anchor. Under the rule it ended the item anyway, past five untouched per-option anchors.

So the rule gave a claim about one part the authority of a bulk attestation over all of them. Not a
layout problem: a control whose behaviour and whose semantics say different things.

**The survey variant carries the same defect one level down.** B's bulk control does scope over the
claim rows — but not over the item anchor, which is not one of them. A reviewer in B taking the bulk
control had ended the item with no moment for the unlocalised objection, the signal `claims.md`
calls the one most worth having. B is the variant whose known defect is that composition has no
home. The rule was quietly removing the anchor that compensates for it, in the one variant that
needs it most, which would have been read afterwards as evidence about survey motion.

## The shape was already solved, and the solution did not travel

`review-motion-fork.md` §The surveyed block confirms what is left settles **flag first, then
confirm** — an ordering rule that exists precisely because the bulk control is terminal and
therefore has to come last. That is this problem, already answered.

It was written about the claim block. Screen 5 is not a claim block, and the item-scoped anchor is
not a row. Neither inherited it.

**Third instance in three sessions of a rule settled for one case and inherited by a case nobody
checked it against** — after the MultipleSelect mismatch branch and the Close. The new part is how
it was caught. The first two were found by putting two settled documents against each other. This
one was found by **drawing a screen the rule had never been drawn on**.

> **A rule with no picture has only been checked against the cases its author had in mind.**

## The repair, and one repair refused

**Settled: one explicit advance gesture per item screen.** The gesture that completes a screen's
required set does not advance it.

`claims.md` requires that a new required gesture name what it buys. This one buys **every optional
affordance on the screen a moment in which it is reachable**. A gesture buying only navigation is
still refused; remove the objection channel and this gesture goes with it.

**A layout rule comes with it, and is not the same rule.** On a screen the reviewer reads downward,
no optional affordance sits below the completing gesture. This is why `review-experience.md` says
the triviality affordance sits *beside* the confidence control; the shell's first draft put it
underneath, which is reachable in principle and missed in practice on a signal the specification
says survives about two seconds.

**Refused: folding screen 5's option rows into a bulk control.** It fixes the scoping cleanly, holds
*n* + 2, and produces exactly B's screen. It also imports B's known defect — the stem claim loses
its composition moment — into the **shell**, where all three variants inherit it. The Phase 7 gate
row pre-registers that stem composition is under-represented *in B relative to A and D*.
Contaminating A and D with B's defect does not weaken that prediction; it deletes the condition the
prediction is about.

## What it cost, and what that exposed

Nine gestures on a clean MultipleChoice item in A, five in B, six in D. The difference of four is
unchanged; the ratio moves from 7:3 to 9:5.

**By this project's own standard that damages the fork's argument.**
`2026-09-close-and-row-grammar.md`: *the ordering survives, the ratio does not, and the ratio is the
argument.* And the numbers are worth looking at directly — the table in that entry, of what the fork
would have been decided on had the Close been real, reads **9 · 5 · 6**. The same figures, this time
arrived at legitimately.

Which says something about the argument rather than about the shell. **The fork's headline number
was sensitive to decisions that have nothing to do with the fork** — a shell gesture, or a sentence
nobody had got round to deleting. An argument that a phantom can rewrite is stated on the wrong
quantity.

**So the basis was restated on the column the fork varies: the claim block, 5 · 1 · 2.** A sharper
ratio than the totals ever carried, and one no shell decision can reach. Totals stay in the table as
what a reviewer actually spends.

## Left open deliberately

**TrueFalse and craft review are unrevised**, and marked `[deferred]` in `claims.md`. Both carry
item screens and both plausibly carry the advance gesture. Neither is exercised by Phase 2 — no
TrueFalse item is in the corpus, and craft review is a different surface.

Recorded rather than propagated, on the rule the MultipleSelect stub taught: **narrowing scope does
not defer the questions the dropped scope carried, it hides them.** A count changed without a screen
to check it against is a guess.

There is a cheap test for the craft half. `claims.md` observes that craft and content cost the same
seven gestures on a MultipleChoice item while feeling nothing alike — an observation worth making
because the numbers matched. Content is now nine. Either craft takes the advance gesture and the
parity is restored, or the parity was an artifact of two counts never derived against each other.
**Decided by drawing craft's screen, not by arithmetic.**
