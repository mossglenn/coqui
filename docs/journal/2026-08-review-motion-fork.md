# Specifying Phase 2 — the review-motion fork

*2026-08-31. Working record. Superseded reasoning and propagation, not current truth — the
specification is [`../design/review-motion-fork.md`](../design/review-motion-fork.md).*

Phase 2 was picked up as the next unblocked work. Specifying it changed four documents, and two of
the changes reach backwards into phases already marked done.

---

## What changed, and why

### The fork is narrower than the phase implied

Phase 2 reads as a question about the review surface. It is a question about **one stage of one
item type**: Surface 1, Stage 2, MultipleChoice. Everywhere else the motion is fixed already —
MultipleSelect's option markings *are* its blind answer and are productions, TrueFalse has one
part, and an answer mismatch skips part attestation entirely. Craft review chose survey in
`review-experience.md` §Surface 2 and never named it as the same choice.

That last one is the useful part. The design has resolved this fork once, and the criterion it used
generalises: *survey where the judgments are comparative and quick, sequential where they are
independent and expensive.* Recorded before Phase 6 runs, on the same discipline Phase 7 applies to
its own gate.

### The corpus can currently observe the fork twice

The scope finding has an arithmetic consequence. The fork is exercised only on clean MultipleChoice
items, and the session pool holds two — `eir-004` and `eir-009`. The two clean items Phase 1 was
still short became a **shape** requirement rather than a headcount: four clean MultipleChoice
items, clean MC from two to six.

Cheap to see while specifying. Expensive to discover during Phase 6, where the finding would have
been *no bulk-confirm data* and there would have been nothing to do about it.

Left open: twelve at 8/4 with two clean MultipleSelect benched, against fourteen at 10/4. Benching
preserves Phase 1's ratio and costs half of Phase 4's clean MultipleSelect comparison side.

### The gesture inventory was off by one

**Content, MultipleChoice-4 read 6. It is 7.** Enumerated: blind answer · confidence · stem · key ·
A · C · D.

The correction is checked against the other rows rather than by recount, which is what makes it
safe: TrueFalse costs 2 (answer + confidence) and MultipleSelect *n* + 2 (*n* markings + stem +
confidence). Both count the confidence mark as its own gesture. Only the MultipleChoice row did
not, and there is no reading on which the blind answer and the confidence mark are one gesture that
does not also break those two rows.

It surfaced because Phase 2 costs three variants against that table, and a baseline that is wrong
by one makes a five-gesture difference read as four. **The gesture-inventory diff is the only
instrument available before Phase 4**; it had not been used for a comparison until now, which is
why an off-by-one in a `[settled]` table survived a full claims review.

Phase 0 exists to check the budget arithmetic and did check it — against a *time* budget, which it
then killed. The gesture inventory replaced it afterwards and inherited the assurance without
inheriting the check.

**The correction falsified a sentence in both documents.** *"Craft review is more gestures than
content review, which is not the intuition"* was true at 6 against 7 and is false at 7 against 7.
The claim it was carrying — that gesture count and felt cost diverge — survives, and states
better: the two surfaces cost **the same seven gestures** on a MultipleChoice item and feel nothing
alike. A comparative claim resting on a one-gesture margin is the kind of thing an off-by-one
takes with it, and it would have shipped had the row been corrected without reading what cited it.

### Seven turned out to be an argument, not a measurement

The corrected row costs Stage 2 as five separate confirmations. That *is* Variant A. The
specification had adopted the sequential model in its cost table while the prose around it
described the fork as open — so A is the incumbent and B and D are challengers, not three peers.
Worth knowing before comparing them.

### The escape hatch moved from proposed-choice to shipping design

*Available but counted* is right, and it cannot be the experiment. It contains both sides of the
fork, and its escape rate is confounded with the escape control's own salience — a bulk confirm on
the primary row and one in a footer draw different rates from identical beliefs. Run it as the test
and a button-placement artifact reads as a finding about the seven-judgments thesis.

So: resolve the fork on variants holding one side each, then ship the winner instrumented.

### A variant the fork did not contain

`claims.md` already says the five rows are unequal — the stem claim is yes/comment with composition
expected, the four option claims are yes/no recognitions. A uniform motion across rows of unequal
kind is an assumption. **Variant D** puts the stem in a sequential moment and surveys the option
block, and it falls straight out of the document's own gesture classes.

The related objection to Variant B is not a layout detail: survey mode gives the stem's expected
comment no home short of the flag control it shares with *this claim is false*, which merges
*I want to say something* with *I am blocking this*.

---

## Propagation record

| File | Change |
|---|---|
| `design/review-motion-fork.md` | **New.** Phase 2's specification and output |
| `design/claims.md` | Gesture inventory: content MultipleChoice-4 6 → 7, enumerated, with the sequential-motion caveat. Canonical owner |
| `design/review-experience.md` | §Interaction cost copy of the table brought to 7, pointing at the fork |
| `design/content-accuracy-validation-plan.md` | Phase 2 output specified; escape hatch `[proposed]` → `[settled]` as shipping design; Phase 1 status amended with the MultipleChoice shape requirement |
| `corpus/README.md` | §Session composition: outstanding items are four clean MultipleChoice, with the benching question `[proposed]` |
| `docs/README.md` | Map row and canonical-source row for the new document |
| `docs/open-questions.md` | Regenerated |

`corpus/ethics-in-research-defects.json` still carries *"two more clean items from another bank"*
in `composition.sessionRatio`. **Not edited** — the file is generated and deep-diffed against the
clean corpus, so the string is corrected at its generator. Flagged in `corpus/README.md`.
