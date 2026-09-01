# 2026-09-01 — A defect planted for a branch that did not exist

**Supersedes** nothing. **Current truth:** `design/review-experience.md` §MultipleSelect mismatches
localise per option. Recorded because the *way* this surfaced is the point.

---

## What was found

`review-experience.md` §The mismatch branch is written entirely in MultipleChoice terms: one
answer, one key, one disagreement, three responses. Nothing in it said what happens when a
MultipleSelect **set** disagrees with the author's.

Meanwhile the Phase 6 corpus plants its only wrong-answer-key defect on a MultipleSelect, and says
why:

> *"Planted on a MultipleSelect rather than a MultipleChoice so the mismatch has an option to
> localise to."* — `eir-005`

And `content-accuracy-validation-plan.md` Phase 1 says that defect type exists to test *"the
mismatch branch — does the three-way question diagnose it correctly?"*

**So the corpus was built against a branch the surface specification had only ever given to
MultipleChoice.** Phase 1 reasoned correctly about localisation and chose the item type for it; the
branch it was reasoning about did not cover that type. Both documents were internally consistent and
the pair was not.

## Why it stayed invisible

It could not surface while MultipleSelect was out of the build. The Phase 2 scope decision stubbed
the type, and stubbing it also stubbed the question — the scope note recorded that stubbing would
cost the fourth defect type, which was true and was not the whole cost. **The type came back into
scope and the gap came with it.**

Had the stub survived, `eir-005` would have been unreachable and the contradiction would have
waited for Phase 6, where it would have appeared as a defect scored *caught* while the diagnosis it
was planted to produce never happened.

## What was decided

One branch screen listing every contested option, with the three-way question asked **per option**.
Not once over the set: a reviewer can be mistaken about one option and right about the key on
another, and a single verdict over both throws away the per-option resolution that is the stated
reason for choosing this type. Conditional, so the *n* + 2 inventory is unaffected; unbounded,
which is the type's real cost showing up where it can be measured rather than inferred.

## The pattern, fifth instance

The permutation against positionally-written defect records. The gesture inventory against the
fork's cost table. Two clean items reached by dividing a sourcing decision. The Close costed into a
table that never carried it. And now a defect planted for a branch that did not cover its item type.

Every one is the same shape: **something already `[settled]`, used for a comparison or a case it had
never been used for.** None was found by reading the document that was wrong — each was found by
putting two settled documents against each other for the first time.

**The corollary this instance adds:** narrowing scope does not defer the questions the dropped scope
carried, it *hides* them. The MultipleSelect stub was recorded with its known costs. This was not
among them, and could not have been, because nobody was going to check the mismatch branch against
an item type nobody was building.
