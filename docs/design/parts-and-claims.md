# Parts, Claims, and the Coverage Grid (Track A)

Began as Phase 0 output of `content-accuracy-validation-plan.md` — settling what the content
review actually asks, and replacing an interaction budget that arithmetic rejects. Extended when
the role model replaced the lens.

**This document is the specification of "done."** ADR-0008 makes approval eligibility a
predicate over the grid below; this is the grid.

**[settled]** = decided here. **[proposed]** = recommendation, open.

---

## The headline finding

**The original seven-judgments list was not a content-review list.**

It gathered every judgment an item needs under one heading, and so asked one role for four
different kinds of expertise. Sorted by who can actually judge:

| # | Judgment as written | Belongs to |
|---|---|---|
| 1 | Is the stem clear and self-contained? | **Craft** — comprehensibility |
| 2 | Is the keyed answer actually correct? | Content |
| 3–5 | Is each distractor definitively wrong? | Content |
| 6 | Does anything in the stem cue the answer? | **Craft** — and detectable by no reviewer role |
| 7 | Does this measure the objective at the intended level? | **Craft** |

Only four of the seven were content judgments. A fifth was missing entirely: nobody had asked
whether the stem's *factual premises* are true, as distinct from whether it reads clearly.

This explains the count disagreement that opened Phase 0 (7 judgments / 6 parts / 4 sketch
rows) — the list, the parts table and the sketch were each counting a different thing. It is
also what produced the role model: **every error here is a role error**, never a category error.

> **The governing correction:** the same part carries a *different claim* depending on who is
> looking. A surface that asks one role for another role's judgment gets an answer it should
> not trust.

---

## The grid **[settled — ADR-0009]**

![Coverage grid and valid traversals](coverage-grid.svg)

| Part | Content review | Craft review |
|---|---|---|
| Stem | Everything stated as fact is accurate | Comprehensible; reading level fits the learner |
| Key | Incontrovertibly correct | **—** |
| Each distractor | Wrong — not merely weaker than the key | Serves its declared design purpose |
| Item | Unambiguous *(filled behaviourally)* | Measures at the declared cognitive level **·** Nothing cues the answer |
| *Each diagnostic distractor* | *Learners do hold this misconception* | — |

For a four-option item with no diagnostic purposes declared: **twelve claims across eleven
occupied cells.** It grows by one content claim per diagnostic-typed distractor.

> **Correction.** An earlier draft called this grid *sparse*. That was true of parts × **four
> lenses** — ten cells of twenty-four. Under **two review types** it is not: only one cell is
> genuinely empty. The word was carried across the model change without being rechecked.

**Consequences**

- **The atom is the claim, not the cell.** The item's craft cell holds two independent claims —
  the cognitive-level claim and cueing — and confirming one says nothing about the other. A cell
  may hold more than one claim, and attestation is per claim
- **One structural gap: the key under craft review.** A key's correctness is purely a domain
  question. *"Unexamined"* and *"not applicable"* must still not render alike, but that now
  matters for one cell rather than half the grid
- **Both reviewers touch nearly every part.** The role split does not reduce the total number of
  judgments — it routes them to people qualified to make them. Twelve claims per item is *more*
  than the original seven-judgment model implied, spread across two people who each find their
  half tractable
- The grid's size varies per item, because diagnostic purposes add claims
- **Some claims are filled by behaviour, not by gesture** — see *Item — unambiguous* below

---

## Content review — parts and claims **[settled]**

Every claim is written as the reviewer will see it. The claim sentence is the interface; if it
cannot be written plainly, the part is not real.

### MultipleChoice — 4 options, key = B

| # | Part | Claim shown to the reviewer |
|---|---|---|
| 1 | Stem | Everything the stem states as fact is accurate. |
| 2 | Key — B | B is a correct answer to this question. |
| 3 | Distractor A | A is wrong — not merely weaker than B. |
| 4 | Distractor C | C is wrong — not merely weaker than B. |
| 5 | Distractor D | D is wrong — not merely weaker than B. |
| 6 | Item | *Filled by the blind-answer stage. Not asked.* |
| + | Each diagnostic distractor | Learners do hold the misconception this is said to catch. |

**On "not merely weaker."** The most common latent defect in a multiple-choice item is a
distractor defensible under some reading. A reviewer asked *"is A incorrect?"* will confirm if A
is worse than B. A reviewer asked *"is A wrong, not merely weaker?"* has to consider whether a
knowledgeable learner could argue for it. Six words of copy carrying real diagnostic load — and
the clearest example of why this document's output is reviewer-facing prose, not a data model.

### Item — unambiguous, filled behaviourally **[settled]**

Not a question. The reviewer answers the item blind and marks confidence *sure* / *unsure*;
**correct-but-unsure is the ambiguity signal.**

Asking directly fails twice over. After the key is revealed, ambiguity is invisible — knowing
the intended answer is what hides it. And a reviewer asked to introspect about ambiguity gives
worse evidence than one whose hesitation is simply observed.

### MultipleSelect — n options

| # | Part | Claim |
|---|---|---|
| 1 | Stem | Everything the stem states as fact is accurate. |
| 2…n+1 | Each option | This option is correctly marked as **correct** / **incorrect**. |

Options are not split into key and distractors, because the marking is what is under test.

### TrueFalse

| # | Part | Claim |
|---|---|---|
| 1 | The statement | This statement is **true** / **false**, as marked. |

**One part.** The stem *is* the claim. That the model scales down to a single judgment without
deforming is evidence it tracks something real.

---

## Craft review — parts and claims **[settled]**

The craft reviewer judges what the author **declared**.

| Part | Claim |
|---|---|
| Stem | Comprehensible; the reading level fits the intended learner. |
| Each distractor | This distractor would catch someone reasoning the way its declared purpose says. |
| Item | This item measures at the declared cognitive level. |
| Item | Nothing in the stem or option set cues the answer. |

**Declarations and confirmations are different acts.** The author's declaration of a distractor
purpose creates durable rationale that outlives the item; the craft reviewer's confirmation
creates a local attestation a later edit invalidates. They must not look alike in the form.

---

## Distractor purpose splits between the two review types **[settled]**

A declared purpose makes up to two separable claims:

| Claim | Kind | Reviewed by |
|---|---|---|
| "This text would catch someone reasoning this way" | Design | **Craft** |
| "Learners actually reason this way" | Empirical, about the domain | **Content** |

And which purposes have a content half at all is already predicted by the vocabulary in
`rationale-capture.md`:

- **Diagnostic** — misconception, prerequisite gap, procedural error, partial understanding,
  surface-plausible, outdated knowledge. All make empirical claims about learners. **Content
  review sees these**
- **Structural** — difficulty tuning, filler, domain sampling. No empirical claim. **Nothing for
  a domain expert to contest**

That the existing two families predicted their own routing rule is a sign they were carved
correctly. It also keeps the cost down: most items will not have four diagnostic distractors.

The mechanism from `rationale-capture.md` survives intact — *"the reviewer sees the declared
purpose before judging it; self-report is weak evidence, contested self-report is strong"* —
with each half now contested by someone who can actually contest it.

---

## Cueing is a craft judgment **[settled — ADR-0009]**

Judgment 6 is removed from content review entirely.

**Three reasons, compounding**

1. **It has no part to anchor to.** Cueing is a property of the stem *against the option set*.
   The stem alone is unobjectionable; no single option is at fault. It is relational, where
   every other part is componential — so it sits at the item level
2. **Its forms are construction defects, not content defects.** Grammatical agreement leaking
   the answer, the key conspicuously longest or most qualified, absolute terms marking the
   distractors, stem wording echoed in the key, two options that converge
3. **No reviewer role can detect it by introspection.** A domain expert who answers correctly
   cannot distinguish knowing the content from having been told it. This is not a matter of
   expertise — the test is unavailable to anyone who already knows the answer

### The trap worth recording

**The blind-answer stage cannot catch cueing**, and it looks as though it should.

It detects *ambiguity*: a reviewer who picks a distractor, or hesitates. But cueing makes the
item **easier**. A cued reviewer answers correctly and confidently, and the stage scores that as
a pass. The two failure modes point in opposite directions and the instrument reads only one.

So cueing needs a craft-side home, and it has one.

### On automated checks — scope, honestly **[proposed]**

An earlier draft called cueing "machine-detectable," which overstated it. The move to craft
review stands on its own; the lint was never the justification.

**Computable, reasonable precision:**

- **Grammatical agreement** — a stem ending in "an" eliminating consonant-initial options;
  singular/plural agreement. Narrow and reliable
- **Absolute-term asymmetry** — "always / never / all / none" in distractors but not the key.
  Word-list based, brittle but cheap
- **Length asymmetry** — key longer than the distractor mean. The best-documented flaw in the
  item-writing literature, computable exactly — but correct answers are often legitimately
  longer because precision needs qualification. Flags, never fails
- **Stem-key lexical overlap** — an uncommon term shared by stem and key but no distractor.
  Moderate precision at best
- **"All / none of the above"** — trivial to detect; whether it is a defect is house style

**Not computable:** whether a distractor is factually wrong; whether a stem is ambiguous;
whether the cognitive-level claim holds; convergence cueing; whether a distractor is plausible.
All need meaning, not syntax.

**The design constraint is alarm fatigue.** A lint that fires on half the items and is usually
wrong is worse than none, because the dismissal ritual creates false confidence in coverage. So:

- Ship the **two** highest-precision checks. Not six
- **Every dismissal requires a reason**, which makes the lint measure itself. A check dismissed
  80% of the time is noise and gets deleted — found from data rather than argued about

**[proposed]** No LLM in this loop for now. It would catch more, and its failure mode is
confident wrong flags — alarm fatigue with better prose. Revisit once the syntactic checks have
a measured cost.

---

## The cognitive-level claim is a craft judgment **[settled]**

Judgment 7 is not a content-review cell.

**Why it moved.** An earlier design had the reviewer name the Bloom's level an item actually
measures. Most domain experts have never used the taxonomy and have no reason to have done —
structurally the same error as cueing.

**Considered and rejected: a content half.** *"Is this item about the thing the objective
names?"* is a domain judgment a reviewer could make. Rejected because the cell would be
ceremony: an item authored against an objective is about that objective essentially always, and
a cell that resolves to *confirm* upwards of 95% of the time trains reflexive confirmation
across the whole grid. The rare genuine exception is what the out-of-type channel is for.

---

## The interaction budget **[settled: the original is withdrawn]**

### Three figures that never shared a derivation

| Source | Figure | Implied per-item cost |
|---|---|---|
| Interaction budget | under 15 s per clean item | 15 s |
| Same section, two sentences later | ~20 min for a 12-item assignment | ~100 s |
| Entry-point card | "About 35 minutes" for 12 items | ~175 s |

Twelve items at fifteen seconds is three minutes. The first is unreachable from the second, and
neither produces the third.

### Deriving the real number

Assumptions, stated so they can be attacked:

- A 4-option multiple-choice item runs 25–40 words of stem and 6–12 words per option
- Silent reading of dense domain content with comprehension runs 150–250 wpm; **200 wpm**
  (3.3 words/sec) is used below
- Judging requires domain recall, not just reading

| Part | Read | Judge | Total |
|---|---|---|---|
| Stem | 8–12 s | 2–5 s | **10–17 s** |
| Key | 2–4 s | 1–4 s | **3–8 s** |
| Distractor × 3 | 2–4 s each | 1–4 s each | **9–24 s** |
| Blind answer + confidence | — | — | **~4 s** |
| 5 keystrokes | — | — | **~1.5 s** |
| | | | **≈ 28–54 s** |

**Median for a clean 4-option item: ~35 seconds.** The original budget was off by roughly 2.3×,
and 15 seconds sits below the reading floor alone.

Checking the assignment total: 8 clean at 35 s ≈ 4.7 min, 4 flagged at ~2 min ≈ 8 min,
orientation and switching ~3 min → **≈ 16 minutes.** The 20-minute figure was roughly defensible
all along. It was the per-item number, and the 35-minute card, that had nothing behind them.

### Restated budget **[settled]**

| Unit | Target | Ceiling |
|---|---|---|
| Clean 4-option MC, content review | 35 s | 45 s |
| Clean TrueFalse | 10 s | 15 s |
| Clean MultipleSelect, 5 options | 45 s | 60 s |
| Flagged item, one flag with a short comment | 90 s | 150 s |
| 12-item content assignment, ~25% flag rate | 16 min | 22 min |
| Craft review, clean 4-option item | 20 s | 30 s |

Craft review is cheaper because the reviewer is not verifying facts — the judgments are quick
and several are comparative across items rather than per item.

---

## The metric is overhead, not absolute time **[settled]**

Roughly two thirds of that 35 seconds is reading and domain recall. **No interface compresses
it.** A budget in absolute seconds therefore mostly measures the corpus, and would fail a
well-built surface handed dense items.

What the design controls is navigation, gesture cost, re-reading forced by layout, mode
confusion, and comment composition.

> **Interaction overhead = (total time − irreducible content time) ÷ irreducible content time**

**Measuring the denominator.** The validation plan's Phase 4 adds a baseline condition: two or
three items read as plain text with no interface, one keypress at judgment. That is irreducible
content time for this corpus and this reader.

**[proposed] Thresholds**

| Overhead | Reading |
|---|---|
| ≤ 40% | The interface is cheap. Proceed |
| 40–75% | Acceptable; optimise mechanics before building the craft surface |
| 75–100% | The surface costs nearly as much as the thinking. Redesign before proceeding |
| > 100% | The interface costs more than the judgment it collects. Granularity is wrong |

Robust to corpus difficulty, fair to a good design tested on hard items, and it isolates the
variable the design controls.

---

## Open questions

- **Is "not merely weaker than B" the right wording?** Real diagnostic load, and also the
  longest claim on the screen, read three to five times per item
- **Does the stem's factual claim survive items whose stems state no facts?** Many stems are
  pure setup. The claim may need a null-ish state distinct from *confirmed*
- **A behaviourally-filled cell is not an attestation anyone made.** Whether *item — unambiguous*
  should carry attribution, and to whom, is unresolved
- **Conditional cells make the grid's size vary per item**, which complicates both estimation and
  rendering
- **MultipleSelect option ordering** — marking each option independently invites reading them as
  a set. Whether that is a defect or the point is untested
- **Reading-rate assumption.** 200 wpm is a literature midpoint, not a measurement of this
  reviewer on this corpus. Phase 4's baseline replaces it with real data, at which point this
  table should be recomputed

---

## Related

- ADR-0009 — attestation per (part × review type); this document is its grid
- ADR-0008 — the eligibility predicate that quantifies over these cells
- `content-accuracy-validation-plan.md` — the phases; this began as Phase 0's output
- `review-experience.md` — the surfaces these claims appear on
- `rationale-capture.md` — the purpose vocabulary that routes the distractor split
