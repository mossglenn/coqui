# 2026-09-01 — The Close, and what a claim row's controls are

**Supersedes** `design/review-experience.md` §Close, deleted. **Current truth:**
`design/review-experience.md` §Stage 2 and §What a claim row's controls are.

---

## The Close was rejected and one sentence outlived it

`review-experience.md` §Close read:

> One holistic judgment: *would you use this item?*, plus a difficulty read. This one benefits
> from having seen everything, which is why it sits at the end — unlike ambiguity, which is
> contaminated by exactly that.

**The idea was rejected. The sentence was not deleted, and nothing recorded the rejection.** It
appeared exactly once in the repository — not in `claims.md`'s grid, not in the gesture inventory,
not in any of the three review-motion wireframes. Deleted 2026-09-01, with the difficulty read.

### Why this mattered more than a stray sentence

The Phase 2 build brief costed it back in. Two required gestures per item that the inventory does
not carry would have made every row of the fork's cost table wrong:

| | Inventory | If the Close were real |
|---|---|---|
| A — sequential | 7 | 9 |
| B — survey | 3 | 5 |
| D — asymmetric | 4 | 6 |

The **ordering** survives either way. The **ratio** does not, and the ratio is the argument:
*three against seven* and *five against nine* are different claims about whether the survey model
saves anything worth having. The fork would have been decided against a table nobody had checked.

**The methodological point, now stated as a rule.** A rejected idea with no journal entry is
textually indistinguishable from a live one. The journal exists for exactly this — *why the design
stopped saying something* — and an omission here is not a missing note, it is a live claim in the
specification. **The rejection is the thing that needs writing down; the deletion is not enough,
because a deleted sentence leaves nothing to read.**

This is the fourth correction of the same family, after the permutation/defect-record collision,
the gesture-inventory off-by-one, and the two-clean-items division: **something the design had
already settled, used for a comparison it had never been used for.** Reading does not find them.
Only use does.

## The row grammar, decided in the same pass

Rejecting the Close left Stage 2 ending on the last claim, which raised the question of what a
claim row's controls actually are — undefined until now, and the most-repeated control on the
screen.

Recorded as two independent axes rather than three exclusive states, in
`design/review-experience.md`. What sent it there was the stem row: `claims.md` has always called
it **yes/comment**, which is an affirmation and a composition at the same moment, so an either/or
control was already ruled out by a document that predates the question.

**It is shared across the review-motion variants, and that is not incidental.** The fork tests how
many rows a reviewer must touch. A row control that differed between A, B and D would confound
motion with grammar — the same failure the shared option permutation was fixed to avoid, one level
down.

**What it opened.** Non-blocking feedback is a category ADR-0010 does not have. Left `[proposed]`
in the specification rather than resolved here, because it decides the default direction of the
blocking switch and may need an ADR superseding 0010.
