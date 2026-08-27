# How the claims model got here

Superseded reasoning, extracted from `../design/claims.md`. Kept because it explains *why* the
specification says what it says, and because several of the corrections below are methodological
rather than local — the kind worth not relearning.

**Read this before changing something in `claims.md`.** Do not read it to find out what the model
currently is; that is the spec's job, and every claim below has already been superseded.

Paths are relative to `docs/`.

---

## The seven-judgment list, and why it was not a content-review list

The original list gathered every judgment an item needs under one heading, and so asked one role
for four different kinds of expertise. Sorted by who can actually judge:

| # | Judgment as written | Belongs to |
|---|---|---|
| 1 | Is the stem clear and self-contained? | **Craft** — comprehensibility |
| 2 | Is the keyed answer actually correct? | Content |
| 3–5 | Is each distractor definitively wrong? | Content |
| 6 | Does anything in the stem cue the answer? | **Craft**, with a domain-visible residue |
| 7 | Does this measure the objective at the intended level? | **Craft** |

Only four of the seven were content judgments. A fifth was missing entirely: nobody had asked
whether the stem is *well-posed in the domain* — sound as a question to someone who knows the
field — as distinct from whether it reads clearly to a learner.

This explains the count disagreement that opened Phase 0 — 7 judgments, 6 parts, 4 sketch rows.
The list, the parts table and the interface sketch were each counting a different thing.

**It is also what produced the role model.** Every error the design has corrected since has been
a role error, never a category error, and that observation is what the spec's governing principle
now states.

---

## "Sparse" — a word carried across a model change

> An earlier draft called the grid *sparse*. That was true of parts × **four lenses** — ten cells
> of twenty-four. Under **two review types** it is not: only one cell is genuinely empty. The word
> was carried across the model change without being rechecked.

Worth recording as a failure mode rather than a fact: a descriptor that was accurate under an old
model survived into a new one because nobody re-derived it. The word then justified design
decisions it no longer supported.

---

## The diagnostic-misconception cell

The grid once asked content review to confirm *"learners do hold this misconception"* for each
diagnostic-typed distractor.

Deleted, on the grounds that nobody can responsibly attest to it: the learning research does not
exist at that granularity in most domains, and what an experienced expert holds is strong anecdote.
A confirm control there does not collect evidence — it manufactures it. The empirical claim is now
the **author's**, made by declaring a purpose, and review contests it rather than confirming it.

**Two things went with it.** The row was the grid's only conditional cell, so removing it made the
grid's size a function of item shape alone. And the finding that *"the two purpose families
predicted their own routing rule"* — which had been read as evidence the vocabulary was carved
correctly — no longer holds, because the routing it predicted no longer exists. The
diagnostic/structural split now marks which declarations are *contestable*, which is a weaker
justification than the one it replaced.

---

## Cueing: an argument that proved less than it was made to say

The old third reason for placing cueing in craft review read:

> **No reviewer role can detect it by introspection.** A domain expert who answers correctly
> cannot distinguish knowing the content from having been told it. This is not a matter of
> expertise — the test is unavailable to anyone who already knows the answer.

True as stated, and it bounds the **instrument**, not the **role**. The argument slid from *"the
blind-answer stage is blind to this"* to *"no reviewer can detect this,"* and only the first was
ever established. **Introspection is not inspection:** a reviewer who cannot tell from *answering*
whether they were cued can still see a cue by *reading*.

The catalogue of cueing forms had the same shape of error. Every listed form — grammatical
agreement, length asymmetry, absolute terms, lexical echo, convergence — is syntactic or
rhetorical, and visible *without* knowing the subject. That is what made them read as construction
defects. Taxonomic cueing is invisible *without* the subject. The catalogue was not merely
incomplete; it was incomplete in precisely the direction craft review cannot cover.

---

## The interaction budget, three times

### First: three figures that never shared a derivation

| Source | Figure | Implied per-item cost |
|---|---|---|
| Interaction budget | under 15 s per clean item | 15 s |
| Same section, two sentences later | ~20 min for a 12-item assignment | ~100 s |
| Entry-point card | "About 35 minutes" for 12 items | ~175 s |

Twelve items at fifteen seconds is three minutes. The first is unreachable from the second, and
neither produces the third. They coexisted across three documents for as long as they did because
none of them had a derivation, so none could be checked.

### Second: the derivation that replaced them

Word counts against a 200 wpm reading rate produced a table of per-part read and judge times, a
range of ≈ 28–54 s, and a median of ~35 s for a clean four-option item.

**Its value was destructive, not constructive.** It could not establish thirty-five seconds. It was
more than good enough to show that fifteen sits below the reading floor alone.

> **An estimate too crude to set a target can still be sharp enough to falsify one.**

### Third: why the derived budget went too

The restated budget had six rows, marked **[settled]**. Within a single review pass, three of them
were costed against acts that no longer existed — TrueFalse and MultipleSelect priced as
confirmations before they were collected blind, craft priced at one gesture on a cell that had
gained a second.

**A settled table went stale invisibly.** Nothing about a number reports that the act it priced has
changed. A gesture count is derivable from the specification and goes stale *visibly*; a time is a
property of a person nobody has watched.

The withdrawn table, for the record:

| Unit | Target | Ceiling |
|---|---|---|
| Clean 4-option MC, content review | 35 s | 45 s |
| Clean TrueFalse | 10 s | 15 s |
| Clean MultipleSelect, 5 options | 45 s | 60 s |
| Flagged item, one flag with a short comment | 90 s | 150 s |
| 12-item content assignment, ~25% flag rate | 16 min | 22 min |
| Craft review, clean 4-option item | 20 s | 30 s |

Also withdrawn with it: the claim that roughly two thirds of an item's cost is reading and domain
recall. The qualitative version — *most of it is reading and recall, and no interface compresses
it* — needs no figure and survives in the spec.

---

## Overhead thresholds

| Overhead | Reading |
|---|---|
| ≤ 40% | The interface is cheap. Proceed |
| 40–75% | Acceptable; optimise mechanics before building the craft surface |
| 75–100% | The surface costs nearly as much as the thinking. Redesign before proceeding |
| > 100% | The interface costs more than the judgment it collects. Granularity is wrong |

No derivation, and none was available.

> **A measure can be useful for comparison while being useless for adjudication.**
> Ranking does not need a scale. Grading does.

*"Is 62% acceptable?"* is a value judgment wearing a number, and no quantity of data settles it.
The metric survives as a Phase 4 instrument compared against a baseline and against earlier
revisions; the bands do not survive at all.

The section also called the ratio *"robust to corpus difficulty."* It is robust in one direction
only — hard items cannot make a good design look bad, but they readily make a bad one look good —
which is why absolute overhead now has to be reported beside it.

---

## Two results worth carrying past this project

1. **An estimate too crude to set a target can still be sharp enough to falsify one.**
2. **A measure can be useful for comparison while being useless for adjudication.** Pre-register
   direction and comparison; never magnitude.

Both are in `../toolkit-candidates.md`.

---

## Related

- `2026-08-claims-review.md` — the review pass that produced most of these withdrawals
- `../design/claims.md` — the current specification
- ADR-0009 — the decision record, with its own amendment log
