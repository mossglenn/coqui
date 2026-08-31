# 2026-08-31 — Option order, and a dilemma that was not one

**Supersedes** the *unresolved* framing of the position-4 cue in `corpus/README.md` and in
`design/content-accuracy-validation-plan.md`. **Current truth:**
`design/review-experience.md` §The presentation contract, and ADR-0011.

---

## What the session corpus reported

The first build of `corpus/session-corpus.json` computed a session-level diagnostic and found one:
across the nine MultipleChoice items, **the key never falls in option position 4**.

It was recorded as unresolved, with this shape:

> Shuffling option order per item would fix the cue and would **break `derivation: "verbatim"`**,
> the property that makes every marking traceable to a published key.

That sentence is the reason the question sat open for a session. It states a trade-off between two
things that were never in competition.

## Two things checking it changed

**It is not a property of the session — it is a property of the banks.** Ten of ten MultipleChoice
items across *both* published sources key to one of the first three slots. Under uniform placement
that is a 5.6% event, so the likeliest explanation is an authoring habit shared by both
publishers, not the draw. The practical consequence was immediate: **swapping items in could not
fix it**, because the pool holds no position-4 item to swap in. The only remaining lever was order.

**`derivation` was never a claim about presentation.** It says the item *as recorded* is the item
as published. How the item is *shown* is a separate question that the corpus had no vocabulary for,
so the shown order defaulted to the recorded order and the two became conflated. Naming the
distinction dissolves the trade-off: the item stays verbatim, and the presentation is permuted.
Nothing is edited.

The rejected alternatives are in ADR-0011. The one worth remembering is the one that was nearly
taken: reordering two hand-picked items in the corpus, chosen for having no intrinsic option order.
It would have worked, it would have cost `verbatim` on those items, and it would have required a
per-item argument about which items were safe to touch — a whole class of argument the presentation
framing never has to have.

## What it cost, and what that revealed

**Three of the four pre-registered defect records named options positionally.**

| Record | As written | Problem |
|---|---|---|
| `eir-011` | *"Distractor claim on option 3… flagging option 4 is not a catch"* | `3` and `4` are slots |
| `eir-005` | *"B marked correct by the reviewer"* | `B` is a published label the display re-letters |
| `eir-001` | *"or an answer of 4 (non-maleficence)"* | a slot |

Under permutation each names a different option in the session than in the answer key. The ground
truth was pre-registered against the *presentation*, and it took the presentation moving for anyone
to see it.

The fix separates identity from display — `sourceLabel` for identity, withheld from the reviewer;
`label` for the letter on the screen — and adds `defect.optionRefs`, which states the referenced
options as data so the verifier can reject a reference the item cannot satisfy. Source labels are
not even uniform across the pool: the Testbook items number their options `1`–`4` and the converted
MultipleSelect items letter them `A`–`E`, which is why *"option B"* and *"option 3"* both appeared
in ground truth and meant different kinds of thing.

**The blind projection paid off without being touched.** `sourceLabel` and `optionPermutation` were
added to the corpus file after the whitelist was written, and both are withheld by default. That is
the argument for a whitelist over an exclusion list, demonstrated rather than asserted — and it is
the one place this session's work confirmed an earlier decision instead of correcting one.

## A methodological note

Both of this session's real findings — the gesture inventory off by one on 08-31, and the
positional ground truth here — surfaced the same way: **something already `[settled]` was used for
a comparison it had never been used for.** The inventory was correct until three variants were
costed against it; the defect records were correct until the presentation moved. Reading does not
find this class of error. Only use does.

Worth carrying: when a decision changes how something is *presented*, the pre-registered rules
about it are the first thing to re-read, not the last.
