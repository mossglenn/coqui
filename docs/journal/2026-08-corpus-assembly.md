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

---

# Extension — 2026-08-31

*Appended. The assembly record above stands; this closes the clean-item gap it left open.*

## What the gap turned out to be

Phase 1 recorded the corpus as *two clean items short*. Specifying Phase 2 changed what those two
items had to be. The sequential/survey fork is exercised only on **clean MultipleChoice** items —
MultipleSelect's option markings are its blind answer and force every judgment already, TrueFalse
has one part, and an answer mismatch skips part attestation — and the pool held two of them. The
gap was a **shape** requirement, not a headcount, and the fix is four clean MultipleChoice items
rather than two of anything.

Pool now 14: **10 clean, 4 defective**, with six clean MultipleChoice.

## Source

A TestLab practice page on research ethics — eight questions, four taken. Stems, option sets, keys
and every rationale slice are asserted against the page, which was fetched and compared rather than
trusted. Recorded in `additionalSources`; the original fourteen keep the Testbook `source` by
default and were left byte-identical so the sealed defect patch still deep-diffs against them.

The page's rationales explain only the key. Under the corpus's existing rule that is fine — feedback
is lifted or it is null, never invented — but it means these four contribute no distractor feedback
where the Testbook items carry 43 of 61.

## Four taken from eight, and why not more

**Two are mechanically out.** Q2 keys to *"All of these"* and Q7 to *"Both a and b"* — combination
keys, which decision C already settled `claims.md`'s distractor claim cannot be written against.
Neither is restatable as MultipleSelect either: both stems are damaged
(*"...referred to as ___________is known as Confidentiality"*, *"Vulnerable populations is the
People, such as______"*), and it is the stem rather than the option form that is broken.

**Six were content-clean; four were taken.** The constraint was not quality — it was that the page
runs a **rotating four-term option pool**. Q1, Q5 and Q8 are the same four options three times with
only the key moving; Q6 swaps one term. A reviewer who works three of them answers the fourth by
elimination without reading it, which does not merely waste an item: it destroys the blind-answer
stage's signal on that item, because *correct-but-unsure* then reports position in the sequence
rather than anything about the question.

Only two of the six sit outside that family, so **any four drawn from this page contains at least
one near-twin pair.** That is arithmetic. Taking two of the family (`eir-017`, `eir-018`) rather
than three keeps the pair visible to a craft reviewer without letting elimination start.

## Craft defects recorded, content-clean items kept

`eir-015` offers *Belmont Report* — a document — as the name of a practice, eliminable with no
domain knowledge. `eir-016`'s *Harshness* and *Brutality* are not assessment terms, making it a
two-option item wearing four. Both are craft defects on content-clean items, which is a category
the corpus already carries, and both are written into `corpus/README.md` so a content reviewer who
mentions them is not scored as a false flag.

## Two findings about the corpus itself

**The feedback-traceability invariant is looser than the rule states.** `conventions` says every
feedback string *"is asserted to appear in `sourceRationale`"*. Literally, that is false for 17 of
43 strings: feedback is assembled from several bullets under one heading and joined, and the PDF's
rationales are line-wrapped and use typographic quotes. The invariant that actually holds is
**per-sentence traceability after whitespace and quote normalization**. Worth writing down, because
a rule stated more strictly than it is enforced cannot be checked by anyone who did not write it.

**One string does not trace at all.** `eir-007` option E — *"International collaborative research
does not come under the preview of UGC-CARE"* — appears nowhere in that item's `sourceRationale`,
and the rationale mentions collaboration nowhere. The item's own extraction flags say the source
addressed E individually, so the likeliest explanation is a short rationale slice rather than an
invented string, but it cannot be confirmed without the PDF. `eir-007` is excluded from the session
pool on other grounds, so nothing downstream depends on it. Left as-is and flagged.

## Propagation record

| File | Change |
|---|---|
| `corpus/ethics-in-research.json` | `eir-015`–`eir-018` appended; `additionalSources`, `extended`, `conventions.sourceRef` added; `shapeCounts.multiple_choice` 6 → 10. Existing fourteen byte-identical |
| `corpus/README.md` | §Session composition rewritten to the 14-item pool; new craft defects recorded; generator flags for the defects file |
| `docs/design/content-accuracy-validation-plan.md` | Phase 1 status: gap closed, clean MC row added |
| `docs/design/review-motion-fork.md` | §What the corpus can currently observe: 2 → 6 |
| `docs/open-questions.md` | Regenerated |

`ethics-in-research-defects.json` was **not edited**. Its `composition.sessionRatio` still says
*"two more clean items from another bank"* and its `knownCraftDefects` does not list the three new
entries. The file is generated and deep-diffed; both are corrected at its generator.

---

# The corpus became reproducible — 2026-08-31

*Appended. The session the SME sits down to is now generated from the master record rather than
assembled by hand, and the invariants this file has been claiming are now checked.*

## Two scripts

`scripts/verify-corpus.py` encodes every invariant `corpus/README.md` asserts: canonical
formatting, id and option uniqueness, one key per MultipleChoice item, feedback traceability,
declared shape counts, known sources — and **the deep-diff the README has promised since 08-28 and
the repo did not contain.** For each defective item it diffs the corrupted `content` against its
clean counterpart and requires every changed path to be licensed by the defect record's own
`was`/`now` declaration. An undeclared edit fails the build. That is the guarantee that makes
"generated, never hand-edited" mean something to a reader who was not there.

`scripts/build-session-corpus.py` assembles `corpus/session/` and refuses to run if verification
fails.

## The rule was stated more strictly than it held

`conventions` says every feedback string *"is asserted to appear in `sourceRationale`"*. Taken
literally that is false for 17 of 47 strings — feedback is assembled from several bullets joined,
and the PDF rationales are line-wrapped with typographic quotes. The invariant that actually holds
is **per-sentence traceability after whitespace and quote normalization**, and that is what the
verifier encodes.

Writing the check is what forced the distinction. A rule nobody can run is a rule stated at
whatever strictness sounded right when it was written.

One string fails even the true invariant — `eir-007` option E — and it is carried in the verifier
as a named exception with its reason, not silenced. The verifier also fails if that exception ever
starts passing, so a stale allowance cannot outlive the problem it documents.

## The blind guarantee got a structural form again, at the output layer

`review-motion-fork.md` records the risk that a Phase 4 or Phase 6 fixture reading `content`
straight into a template destroys the blind-answer stage with nothing to notice. The generated
session answers it: `items-blind.json` holds stem, instruction and option text, and
`answer-key.json` holds everything else. A fixture that can only load the first cannot leak the
key.

This does not reverse the 08-28 decision that retired the presented/sealed split. That decision
was about the **master record**, where two hand-maintained views of one item can drift. A
projection built by whitelist and regenerated on every build cannot drift, and the whitelist means
a new field has to be opted into the reviewer's view rather than leaking because nobody removed it.

## The set cues in a way no item does

The builder computes session-level diagnostics, and the first build turned one up immediately:
**across the nine MultipleChoice items, the key never falls in option position 4.** A reviewer who
notices narrows every item without reading it, which inflates blind-stage accuracy and suppresses
the *correct-but-unsure* signal that stage exists to collect.

It is inherited from the sources — option order is verbatim and the builder does not reorder — and
it is exactly the class of defect that is invisible per item and obvious across a set, which is why
`review-experience.md` gives craft review a cross-item mode. Left **unresolved**: shuffling option
order per item would fix the cue and would break `derivation: "verbatim"`, the property that makes
every marking traceable to a published key. That trade wants deciding before Phase 6.

## Ordering stopped being incidental

Item order in a review session is a design variable, and it had been whatever order the ids came
in. It is now five declared constraints and a fixed seed, with the sequence written into the answer
key: first item clean, no two defects adjacent, defects in both halves, the `eir-017`/`eir-018`
near-twins separated, no two MultipleSelect adjacent. Marked **[proposed]** — each constraint is an
argument, not a measurement.

## Propagation record

| File | Change |
|---|---|
| `scripts/verify-corpus.py` | **New.** Every invariant, including the defect-patch deep-diff |
| `scripts/build-session-corpus.py` | **New.** Generates `corpus/session/`; refuses to run unverified |
| `corpus/session/items-blind.json` | **New, generated.** The reviewer-facing projection |
| `corpus/session/answer-key.json` | **New, generated, sealed.** Keys, defect records, diagnostics |
| `corpus/README.md` | New section on the generated session, the split, and the position cue |
