# 2026-09-02 — The MultipleSelect marking is not a checkbox list

**Supersedes** `../../prototypes/phase-2/shell.md` §Screen 4 as first drawn — a checkbox list.
**Current truth:** `design/claims.md` §MultipleSelect, and `shell.md` §Screen 4 as redrawn.

---

## The drawing and the row disagreed, and the build is what noticed

`claims.md` has said since the type was specified:

> | 2…n+1 | Each option | ***Mark this option* correct / incorrect.** Compared afterwards to the
> author's marking. |
>
> Gesture count is unchanged — ***n* markings either way.**

`shell.md` screen 4 drew that as a checkbox list — `[✓] A`, `[ ] B`, `[✓] C` — and nobody noticed,
because a checkbox list is what a *select-all-that-apply* item looks like to a learner. It is the
right control for **answering** the item. It is the wrong control for **marking** it.

**On a checkbox, an untouched box asserts something.** It says *this option is not in the set* — a
substantive answer, supplied by the default, on the one screen whose entire purpose is an unprimed
production. That is the acquiescence problem the blind stage exists to defeat, arriving through the
control rather than through the author's key.

**And the cost stops being a constant.** A reviewer marking three of five spends three gestures, not
five. *n* + 4 becomes *marked-count* + 4 — reviewer-dependent, so the MultipleSelect row of the
fork's cost table would have been a range presented as a figure.

**The claim-row rule is not in tension with this.** `review-experience.md` settles that claim rows
are unchecked by default and the reviewer checks to affirm. There, untouched means *not affirmed*,
which gates approval — a safe default, and the one that makes *flag first, then confirm* render as
*check the remaining boxes*. Here, untouched would mean *incorrect*, which is an answer. Same
control, opposite safety, because the two screens are asking different kinds of question.

## Fourth instance, and the second caught by running rather than reading

The three before were the MultipleSelect mismatch branch, the Close, and the terminal-advance rule.
Three of the four came from putting two settled documents against each other; the fourth — the
advance gesture — came from **drawing** a screen the rule had never been drawn on.

This one came from **running** one. The gesture ledger in `shell.md` was written down as a number
the build must reproduce, the acceptance harness counted the gestures a real session takes, and the
count came back 6 where the ledger said 8. Neither document had changed. The screen had.

> **A count nobody can run is a claim. A count the build reproduces is a check.**

The ledger earned its place the first time it disagreed with the code.

## What changed

- `shell.md` §Screen 4 redrawn: an explicit **correct / incorrect** per option, no default
- The required set is all *n* markings; confidence stays inert until the set is complete, which is
  `claims.md`'s *confidence is collected once, after the set is marked* enforced rather than assumed
- The record keeps both the full marking and the derived correct-set, so a reviewer's *incorrect*
  is distinguishable from an option they never reached
- **No change to the ledger.** MultipleSelect-5 is 8 · 1 · 9 as written; the build now reaches it

## Propagation — 2026-09-03

`shell.md` was redrawn the same day, but a second restatement was missed:
`../../prototypes/phase-2/README.md` §MultipleSelect is in scope still read *a checkbox list, a
confidence control, done*. Corrected, with the reason stated in place rather than only linked, so
the sentence cannot quietly revert.

**Two documents restated a fact `claims.md` owns, and the correction reached one of them.** That is
the propagation failure the canonical-source table in `docs/README.md` exists to prevent, arriving
one day after the decision rather than one release later. Worth the same check on the next
correction: *which other file says this in its own words?*
