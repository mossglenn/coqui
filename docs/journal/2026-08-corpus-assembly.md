# Journal — Phase 1 corpus assembly (2026-08-27/28)

Working record. What was decided while assembling the content-review corpus, what the design
stopped saying as a result, and where each change was propagated.

**Output:** [`corpus/`](../../corpus/) — `ethics-in-research.json`,
`ethics-in-research-defects.json`, and their README.

---

## What happened

Phase 1 of `design/content-accuracy-validation-plan.md` was run against a published Testbook
research-ethics MCQ bank, for an SME confirmed to work in research ethics. Fifteen answer markers,
fourteen unique items — one is reprinted verbatim in both of the PDF's sections.

Nine decisions, C1–C9. The corpus that came out is two clean items short of what the phase asks
for, and the reason is recorded rather than papered over.

---

## Decisions

### C1 — The bank is not what the phase assumed a bank would be

Phase 1 says "twelve real items… published banks, certification prep material," as though item
shape were a given. Of fourteen, only six were plain four-option MultipleChoice. Seven were
**combination-key** items — statements A–E, options that are subsets (*"Only A, C and E"*) — and
one was assertion-reason.

### C2 — The seven combination-key items were restated as MultipleSelect **[settled]**

They are MultipleSelect wearing a MultipleChoice mask, and the mismatch is not cosmetic.
`design/claims.md`'s distractor claim — *"A is wrong — not merely weaker than B"* — cannot be
written against `Only B and C`: a subset option is not a proposition and can be wrong for several
reasons at once. A wrong blind answer names a combination rather than a contested statement, which
throws away precisely the per-option resolution `claims.md` credits MultipleSelect with having.

Markings are derived from each published combination key and asserted against it, never retyped.

**What it cost.** These are no longer published items, and this phase's own open question applies
to every one of them: a planted defect is authored to be findable; a real defect survived its
author's attention. The seven converted items are weaker evidence than the six verbatim ones.

**What it bought, unplanned.** Six MultipleChoice and seven MultipleSelect items in one domain from
one source, which makes Phase 4's *"does MultipleSelect generate objections at several times
MultipleChoice's rate?"* a within-corpus comparison rather than an observation.

### C3 — The assertion-reason item was not converted **[settled]**

Its two statements are judged jointly; the options are the four truth-value combinations.
Independent per-option marking would change what the item asks, not how it is packaged.

### C4 — A superlative stem does not survive conversion **[settled]**

`eir-006` asks which steps are *least vulnerable*. Vulnerability is a ranked property of the set,
so *"is C correct?"* has no answer independent of A, B, D and E — per-option marking is ill-posed,
and any reviewer disagreement would carry two indistinguishable explanations. That is the failure
`claims.md` rejects when it argues the blind cognitive-level step must be a binary rather than a
level. Excluded, and kept in the file flagged so the reasoning survives.

`eir-009` asks the same question in plain MultipleChoice and does survive it — one comparative
judgment across the option set is exactly what the reviewer is asked for. **The pair is the
worked example of when this conversion is available and when it is not.**

### C5 — The presented/sealed split was retired; blindness moved to the renderer **[settled]**

The corpus first split each record into `presented` (reviewer-safe) and `sealed` (the marking).
That structure made the *file* blind and left the item's own key and feedback with nowhere to live.
It was replaced by a single `content` block holding the full item definition.

**What we stopped believing:** that a data file can carry the blind-review guarantee. An item
definition and a review fixture answer different questions, and conflating them was a category
error of the same kind ADR-0010 corrected in the grid. The guarantee is now a property of whatever
renders an item, and both corpus files carry a `blindReviewWarning` saying so.

**The risk this creates, recorded:** a Phase 4 fixture that reads `content` straight into a
template destroys the blind-answer stage silently. The fixture loader should assert its projection.

### C6 — Feedback is lifted, never authored **[settled]**

`incorrectFeedback` comes from each item's own published rationale; the build asserts every string
appears there before it passes, and the value is `null` where the source is silent — 43 of 61
options carry feedback. A corpus whose entire value is being real cannot have explanations written
into it by the person running the test.

### C7 — Three defects planted, not four **[settled]**

Eleven of fourteen items carry **pre-existing** defects, and two of those are content defects of
exactly the kind Phase 1 says to plant: `eir-010`'s fair-use key is undercut by its own published
rationale, and `eir-011`'s `IPR` distractor is not wrong, only broader.

So the fourth defect type was not planted. `eir-011` supplies it as published, which gives it the
one property Phase 1's open question says a planted defect cannot have. A fourth plant would also
have pushed the session past one defective item in two, against the ratio warning in the phase.

**Corpus as assembled:** 10 items, 6 clean, 4 defective. Two clean items short of 8/4.

### C8 — Phase 7's defect row counts *known* defects, not planted ones **[settled]**

The consequence of C7, and the reason it had to be written down rather than noticed later.

Phase 7 reads two rows against this corpus: defects caught, and false flags on clean parts. Both
assume the unplanted items are clean. They are not. A reviewer who catches `eir-011` on an item the
ground-truth sheet calls clean scores as a false flag, and the diagnosis lands on the Phase 0 claim
sentences instead of on the corpus — **the most important metric reads backwards.**

The ground-truth sheet therefore covers every known defect, planted or not, and the gate row was
amended from *"planted defects caught"* to *"known content defects caught."* Amended before Phase 6
runs, which is the only condition under which that gate may move.

Craft defects found in the bank — valence cueing in `eir-008`, `eir-013`, `eir-014` — are recorded
for the same reason and deliberately not scored. Phase 1 says plant content defects only, so a
content reviewer who mentions cueing must not count against the false-flag row either.

### C9 — "What counts as detection" is answered by mechanism **[settled]**

Every defect carries a `countsAsCaught` sentence written before Phase 6 rather than judged after
it. For the false premise in `eir-008` it explicitly excludes flagging an option, since the options
are untouched — the right verdict for the wrong reason is not a catch there.

**One property worth stating in advance:** `eir-008` is invisible to the blind-answer stage. A
reviewer answers it correctly and confidently; a false premise does not make an item ambiguous. It
is findable only by reading the stem and being asked about it, which makes it the sharpest test
available of whether the stem cell earns its place — the cell Phase 0 found missing from the
original judgment list entirely.

---

## Propagation record

| Document | Change | Decision |
|---|---|---|
| `corpus/ethics-in-research.json` | New. 14 items, the source of truth | C1, C2, C3, C5, C6 |
| `corpus/ethics-in-research-defects.json` | New. The 4 defective items, generated as a patch over the above | C7, C9 |
| `corpus/README.md` | New. Carries the conversion argument, the exclusions, and the blind-review warning | C2–C7 |
| `design/content-accuracy-validation-plan.md` | Phase 7 gate row: *planted* → *known content* defects caught, with the reason | C8 |
| `design/content-accuracy-validation-plan.md` | Phase 1: a status block recording what was actually assembled and what is missing | C7 |
| `design/content-accuracy-validation-plan.md` | Open question *"What counts as detection?"* answered by mechanism; what remains open is narrowed | C9 |
| `docs/open-questions.md` | Regenerated | — |

Nothing in `claims.md`, `process-model.md`, `review-experience.md` or `architecture.md` changed.
Corpus assembly tested the specification; it did not revise it.

---

## Still open, out of this work

- **Two clean items** in the reviewer's domain, to reach the phase's 8 clean / 4 defective
- **`eir-010`** is held in reserve — a second pre-existing defensible-distractor defect, available
  as a swap for `eir-011` rather than doubling the type
- **Does the corrupted-item approach bias the result?** Narrowed but not closed: one of the four
  defects is now real, and the other three are authored
- **The ground-truth sheet is in the repository.** Structurally sealed as a separate file; not
  sealed against a reviewer with repository access
- **One reviewer or two?** Unchanged, and now a Phase 6 scheduling question
