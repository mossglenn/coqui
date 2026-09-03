# 2026-09-03 — Affirm or flag: the required set, and a near-miss on the ninth instance

**Current truth:** `design/review-experience.md` §The required set is every row, each affirmed or
flagged.
**Records:** a wrong recommendation, caught by Amos, on the day after the finding it repeated.

---

## What happened

Variant A was about to be built. `review-motion-fork.md` draws A as *"one claim in focus;
confirming advances to the next"*, and I read that as a trap: the only control that moves focus is
confirm, so a reviewer who thinks a distractor is defensible cannot reach the rows after it without
affirming a claim they reject. That is the shape of the two findings of 2026-09-02 — *a required
control manufactures the answer of the reviewer who has none* — and I proposed a fix in that shape:
let focus move freely, and open the advance gate once all five rows have been **seen**, with
untouched recorded as not-affirmed.

Amos refused it and asked the right question: **what is the reasoning behind allowing a reviewer to
skip part of the review with no feedback at all?**

There isn't one. The proposal was wrong twice.

## Why it was wrong

**The pattern did not apply.** The mismatch branch's three verdicts were substantive claims about
the item; a reviewer holding none of them was forced to assert something false. A claim row is not
that, because **the objection channel is the not-affirming answer.** Flagging a row is not a claim
about the item — it is the reviewer declining to affirm it, and it means exactly what they mean.
There was no manufactured answer to protect them from. The resemblance was in the sentence *"a
required control"*, and nowhere else.

**And the fix reintroduced the defect it was named after.** A gate that opens on *seen* is satisfied
by five arrow keys. It makes the claim block skippable at no cost, and turns A's five gestures from
a cost into a ceiling — which is precisely what the checkbox list did to MultipleSelect the day
before, where an untouched box made the cost *marked-count* + 4 instead of *n* + 4. Proposed eleven
hours after the journal entry warning about it, in the variant the entire fork is measured against.

**The rejected reading was also worse on the project's own principle.** Under *seen*, an unaffirmed
cell is ambiguous between *I considered this and decline* and *I arrowed past it*. Under *affirm or
flag*, every row carries an explicit act.

> **Missing data is detectable; a considered-looking absence is not.**

Which is 2026-09-02's *missing data is detectable; a manufactured verdict is not*, pointed at the
opposite error. Both sessions turned on the same distinction and it was got backwards this time.

## The pattern worth naming

The eight prior instances were found by putting two documents against each other, by drawing a
screen, and by running one. This is the first that came from **a heuristic that had just worked**.
Two findings in a row had the shape *a required control answers for the reviewer*, and the shape
was carried to the next screen without re-deriving whether it fit.

> **A finding is not a rule. The second use of a pattern has to earn its application the way the
> first one did.**

The cheap test, and it is the same one the journal already uses: *what does this control record for
a reviewer who has not decided?* Applied here, *flag* is what it records, and flag is a real answer.
The test was available and was not run — the pattern was matched instead.

## Focus was never the problem

The other half of the correction. Moving focus is arrow keys, Tab, or a click; it is navigation, not
a gate, and it does not need a control of its own. Conflating *how focus moves* with *what completes
the block* is what made a solved problem look like a design decision.

## What changed

- `review-experience.md` §What a claim row's controls are gains **§The required set is every row,
  each affirmed or flagged** — shared by all three variants, since B's bulk control is the same rule
  with the affirmations taken in one gesture
- `prototypes/phase-2/lib/variant-a.js` built against it: confirming advances focus, flagging does
  not, clicking or tabbing moves it anywhere, and the gate reads *all five settled*
- The harness settles one row per run by **flagging** it rather than affirming it, and checks that
  it costs the same one gesture. Nothing else exercises the second half of the required set — the
  clean path never touches the feedback axis, by definition
- **No change to the ledger.** The claim block is 5 · 1 · 2 as written, and the harness now
  reproduces the 5

## Still open

- **[proposed]** Whether an opened-but-empty objection settles its row. Built as *empty settles it*;
  the argument is in the spec
- **Declining costs one navigation that affirming does not.** Confirming advances focus; flagging
  leaves it, because the reviewer is about to type. Reaching the next row is then a Tab. Small, and
  it is exactly the kind of asymmetry ADR-0010's *expensive objections migrate* rule is about — so
  it goes to Phase 3 with the keystroke grammar rather than being smoothed over here
- **A settled row's claim sentence collapses.** Sequential motion hides what you already affirmed;
  re-reading it is a click back. Implied by the drawing, never stated. Phase 4 will see whether
  anyone reaches for it
