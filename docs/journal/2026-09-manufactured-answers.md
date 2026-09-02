# 2026-09-02 — A required control manufactures an answer

**Supersedes** the mismatch branch as a closed three-way question
(`design/review-experience.md` §The mismatch branch, `§MultipleSelect mismatches localise per
option`), and `../../prototypes/phase-2/shell.md` §Screen 4 as a checkbox list.
**Current truth:** those same sections as revised, and `shell.md` screens 3, 4 and the
MultipleSelect branch.

---

## Two screens, one defect

Both were found on the same day, building the Phase 2 shell, and they are the same mistake.

**The MultipleSelect marking**, drawn as a checkbox list. An untouched box asserted *not in the
set* — a substantive blind answer, supplied by the default, on the screen whose whole purpose is an
unprimed production.

**The mismatch branch**, three verdicts with one required to advance. A reviewer who holds none of
them is forced into the first, because it is the only branch that costs nothing and produces no
thread. The record then reads *the expert self-corrected; the item is fine.*

Neither screen had a bug. Both had a control that answered on the reviewer's behalf.

> **A required control manufactures the answer of the reviewer who has none. Design decides which
> answer that is.**

**And both times, design had chosen the answer that lets the item pass.** That is the part worth
carrying forward: the manufactured answer is not random. It is whichever answer costs least, and
the cheapest answer is almost always the one that raises no objection.

## Why the objection channel was not enough on its own

The alternative considered was to state no fourth option and expect a reviewer to write a blocking
comment through the objection channel. It does not work, because **the branch is still required to
advance**: the reviewer picks a verdict they do not hold *and then* objects that they have not
determined anything. The record carries both, and nothing scoring the branch field can see the
contradiction.

Reaching for *both are defensible* instead is worse than it looks. That is a positive finding — the
author must rewrite or remove an option. *Nobody has checked yet* calls for another look. Routing
the second into the first fills the author's queue with rework that is not warranted.

**Missing data and wrong data cost differently.** An unstated expectation produces silence, which is
detectable and fixable with better onboarding. A forced verdict produces a false positive that is
indistinguishable afterwards from the real thing. The fourth branch buys the difference between
those two, which is not the same good as clarity.

## What made the change cheap

Checked rather than assumed: **no `countsAsCaught` rule in the corpus names a branch outcome.**
`eir-005` is caught at the marking, `eir-001` at confidence, `eir-008` and `eir-011` at an
unconfirmed claim. Phase 6 scoring is untouched; what the branch changes is whether branch one's
rate is interpretable.

It is also fork-safe. The branch lives in the shell, so A, B and D inherit it identically — unlike
the screen-5 repair rejected on 2026-09-01, which would have imported B's known defect into all
three.

## What changed

- A fourth branch on both mismatch screens: ***This needs checking against a source before it
  ships***, blocking, listed last, skipping part attestation like branches two and three
- **It is the objection channel, not a new mechanism.** Selecting it opens that anchor's own
  feedback body with blocking on — the item anchor on MultipleChoice, the contested option's inline
  body on MultipleSelect, which is the scope this type exists to give
- The label names the item's disposition, not the reviewer's competence. *"I don't know"* asks an
  expert to report on themselves, which is the failure the triviality affordance's long label was
  written to avoid
- The record keeps `deferrals` per item, and the acceptance harness asserts that a deferral is
  never recorded as a self-correction
- **[proposed], for `process-model.md`:** a deferred item returns to the **same** reviewer.
  Otherwise the branch is a way to route hard items to the next person. Deferral is a loan, not a
  discharge

## What to check the remaining screens against

Every required control, and every default, on every screen still to be drawn — the three claim
blocks first. For each: *what does this record for a reviewer who has not decided?* If the answer
is anything other than "nothing, and the item does not pass", the control is answering for them.
