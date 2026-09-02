# Phase 2 — The shell, drawn

> **The shell is everything A, B and D share.** [`review-motion-fork.md`](../../docs/design/review-motion-fork.md)
> draws the three Stage-2 claim blocks and nothing else; [`README.md`](README.md) says the shell is
> undesigned and is its own line item. This document is the shell, drawn once.
>
> **Specs own the facts; this document owns the pictures.** Where a drawing disagrees with
> [`review-experience.md`](../../docs/design/review-experience.md) or
> [`claims.md`](../../docs/design/claims.md), the spec wins and the drawing is wrong.

Low fidelity by intent. The bracketed keys are placeholders that make the gesture count legible,
not a proposed binding — keystroke grammar is Phase 3.

---

## The frame every screen sits in

Three bands, in this order, on every item screen at every stage:

```
┌─ item 2 of 12 ─────────────────────── content ─┐
│  ITEM BLOCK — the stem, then the options.      │
│  Identical in A, B and D by specification.     │
│  Identical at both stages, except that Stage 2 │
│  marks the key.                                │
├────────────────────────────────────────────────┤
│  ⌄ something is off about this item            │
├────────────────────────────────────────────────┤
│  STAGE BLOCK — Stage 1's controls, or the      │
│  claim block, which is what the fork varies.   │
└────────────────────────────────────────────────┘
```

**Band 2 is the item-scoped objection anchor**, and its position is the whole reason it is drawn
here rather than inside a variant. `review-experience.md` §Placement: the claim block is what
differs between variants, so anything anchored to it inherits the variant's shape. The item block
does not. One collapsed line, expanding on activation, present at both stages, in all three
variants, on every item type.

**Band 1 is the progress chrome** — `review-experience.md` §Interaction cost requires *where you
are, how much is left*, and the fork's three drawings already carry it. It is a counter and a
surface label. **It is not a status strip.** A per-item row showing what has been confirmed or
flagged would show a reviewer their own flag rate mid-session, which is the contamination
`review-motion-fork.md` refuses when it hides the bulk marker: *showing `confirmed in bulk` back to
a reviewer pushes them toward the per-part path.* The same argument, one level up.
**[settled — 2026-09-01]**

---

## Screen 1 — The entry card

`review-experience.md` §Entry point. Not a dashboard; one card.

```
┌────────────────────────────────────────────────┐
│                                                │
│  Amos asked you to check 12 items for          │
│  content by Thursday.                          │
│                                                │
│                 [ ⏎  begin ]                   │
│                                                │
└────────────────────────────────────────────────┘
```

**No time estimate.** `README.md` and `review-experience.md` both say so; the number that once
stood here was one of three mutually unreachable figures. Nothing goes on this card until Phase 4
measures one.

**No resume line, and that is a gap the drawing exposed — see §What the drawing found.**

---

## Screen 2 — Stage 1, blind — MultipleChoice

`review-experience.md` §Stage 1. Drawn on `eir-011`, item 2 — which is also acceptance check 3,
so the option order below is the one the build must reproduce exactly.

```
┌─ item 2 of 12 ─────────────────────── content ─┐
│  The exclusive right granted by the government │
│  for the commercial exploitation of an         │
│  invention for a specific period of time is    │
│  known as _____                                │
│                                                │
│    ( )  A   Right to live                      │
│    (•)  B   Patent                             │
│    ( )  C   IPR                                │
│    ( )  D   Copy rights                        │
├────────────────────────────────────────────────┤
│  ⌄ something is off about this item            │
├────────────────────────────────────────────────┤
│  How sure are you?        [ ] A learner could  │
│                               get this without │
│   [ sure ]   [ unsure ]       knowing the      │
│                               material.        │
│                                                │
│                          [ ⏎  continue ]       │
└────────────────────────────────────────────────┘
```

**One screen, two gestures.** Select an option; mark confidence, which advances.

- **The key is not shown, and neither is anything else.** Everything on this screen comes through
  the `blindProjection` whitelist: `stem`, `instruction`, and each option's `label` and `text`.
  `isCorrect`, `incorrectFeedback`, `sourceLabel` and `optionPermutation` never enter the render
  path — they are not hidden by CSS, they are not in the projected object
- **Options render in file order under the file's labels.** No sort, no re-letter. On this item that
  is **A** *Right to live* · **B** *Patent* · **C** *IPR* · **D** *Copy rights*, key at **B**
- **Confidence is inert until an option is selected.** Otherwise the second gesture can be taken
  without the first, and the production the stage exists to collect is skippable.
  **[settled — 2026-09-01]**
- **The triviality affordance sits beside confidence, and its label is long on purpose.** *"Too
  easy"* invites the reviewer to report their own expertise. **Free text is offered, never gated**
- **No per-part anchors. Deliberately.** `review-experience.md` §Placement calls this the single
  most likely well-intentioned way to break the experiment. The blind stage's job is a learner-like
  reading; per-option objection controls turn it into a review screen

The item-scoped anchor **is** here, in band 2, in the position it occupies at Stage 2.

---

## Screen 3 — The mismatch branch — MultipleChoice

`review-experience.md` §The mismatch branch. Fires only when the blind answer does not match the
key. Drawn on `eir-001`, item 6, with the reviewer having chosen C.

```
┌─ item 6 of 12 ─────────────────────── content ─┐
│  A researcher conducts a study on student      │
│  stress levels without informing participants  │
│  about the true purpose. …                     │
│                                                │
│  Which ethical principle is primarily being    │
│  violated initially?                           │
│                                                │
│    ( )  A   Non-maleficence                    │
│    (✓)  B   Informed consent      ← the key    │
│    (•)  C   Confidentiality       ← you        │
│    ( )  D   Anonymity                          │
├────────────────────────────────────────────────┤
│  ⌄ something is off about this item            │
├────────────────────────────────────────────────┤
│  You chose C. The key is B.                    │
│                                                │
│    ( )  B is right — I was mistaken            │
│    ( )  C is right — the key is wrong          │
│    ( )  Both are defensible                    │
│                                                │
│  … anything you want to add                    │
│                                                │
│                          [ ⏎  continue ]       │
└────────────────────────────────────────────────┘
```

- **The options keep their file order.** The key and the reviewer's answer are annotated in place.
  Reordering them so the two contested options sit together would re-letter the screen against
  clause 2 of the presentation contract, and hand back a different order than every other variant
  sees
- **Branch one continues to Stage 2.** The reviewer corrects themselves; no thread, and part
  attestation proceeds with the key now revealed
- **Branches two and three skip part attestation entirely** and advance to the next item. There is
  no point certifying the parts of an item that is already going back
- **The free text is offered and never gated**, on ADR-0010's rule — an expensive objection migrates
  back into the cells as an unexplained non-confirmation. The branch selection is itself the
  diagnosis; the box is where it gets elaborated. **[settled — 2026-09-01]**
- **The item-scoped anchor stays in band 2.** This screen sits between the two stages, and
  acceptance check 7 wants the anchor in the same position on every item at both stages; dropping it
  from the one screen where a reviewer most has something to say would be an odd place to make an
  exception. **[settled — 2026-09-01]**
- **Conditional, so it is excluded from the required gesture inventory.** Seven stands

---

## Screen 4 — MultipleSelect, marking

`claims.md` §MultipleSelect. Drawn on `eir-002`, item 1 — the session opens here, which is why the
type could not be stubbed. **No claim block, no fork, no variant divergence: this screen is
identical in A, B and D.**

```
┌─ item 1 of 12 ─────────────────────── content ─┐
│  In the context of research, plagiarism can be │
│  avoided by which of the following?            │
│  Select all that apply.                        │
│                                                │
│                            correct   incorrect │
│  A  Correctly paraphrasing    (•)       ( )    │
│     and citing                                 │
│  B  Substituting the          ( )       (•)    │
│     original author's name                     │
│  C  Properly citing sources   (•)       ( )    │
│  D  Using a plagiarism        (•)       ( )    │
│     check tool                                 │
│  E  Crediting only the        ( )       (•)    │
│     primary author                             │
├────────────────────────────────────────────────┤
│  ⌄ something is off about this item            │
├────────────────────────────────────────────────┤
│  How sure are you?        [ ] A learner could  │
│                               get this without │
│   [ sure ]   [ unsure ]       knowing the      │
│                               material.        │
│                                                │
│                          [ ⏎  continue ]       │
└────────────────────────────────────────────────┘
```

- **The markings are the blind answer.** There is no separate blind stage to precede them, and no
  second pass to survey — which is exactly why MultipleSelect has no fork
- **Every option is marked explicitly, correct or incorrect, with no default. [settled — 2026-09-02]**
  This screen was first drawn as a checkbox list, which is the right control for *answering* a
  select-all item and the wrong one for *marking* it: an untouched box asserts *not in the set*, a
  substantive answer supplied by the default on the one screen whose purpose is an unprimed
  production — and it makes the cost *marked-count* + 4 rather than *n* + 4. `claims.md`
  §MultipleSelect has said *mark this option correct / incorrect* since the type was specified.
  See `../../docs/journal/2026-09-multiselect-marking.md`
- **The required set is all *n* markings**, and confidence stays inert until the set is complete —
  which is *confidence is collected once, after the set is marked*, enforced rather than assumed
- **Confidence is collected once, at item level, after the set is marked.** Per-option confidence
  would spend *n* gestures recovering a signal the mismatch already localises
- **No per-option feedback anchors here.** Acceptance check 8. `review-experience.md` §Placement:
  MultipleSelect cannot separate its blind moment from its claim moment, so the per-option anchor
  is moved in **time** rather than removed — it appears at the comparison step
- **The triviality affordance sits beside confidence**, as it does on MultipleChoice. The spec
  places it *at the blind moment beside the confidence control*, and on this type that is here.
  **[settled — 2026-09-01]** — the affordance was written for Stage 1 and this type has none

---

## Screen 5 — MultipleSelect, the comparison step

Where the author's marking is revealed, where the stem claim is asked, and where the per-option
feedback anchors finally appear.

```
┌─ item 1 of 12 ─────────────────────── content ─┐
│  In the context of research, plagiarism can be │
│  avoided by which of the following?            │
├────────────────────────────────────────────────┤
│  ⌄ something is off about this item            │
├────────────────────────────────────────────────┤
│  [ ]  This question is well-posed: nothing     │
│       here is wrong, misleading, or            │
│       ill-formed.                          [⚑] │
│                                                │
│         you   author                           │
│   A      ✓      ✓   Correctly paraphrasing [⚑] │
│   B      ·      ·   Substituting the …     [⚑] │
│   C      ✓      ✓   Properly citing …      [⚑] │
│   D      ✓      ✓   Using a plagiarism …   [⚑] │
│   E      ·      ·   Crediting only the …   [⚑] │
│                                                │
│                          [ ⏎  next item ]      │
└────────────────────────────────────────────────┘
```

- **The option rows carry no affirmation control.** The marking already happened, blind, on the
  previous screen — that *is* the affirmation for this type. What appears here is the comparison and
  the feedback axis, nothing else. A checkbox on these rows would ask the reviewer to affirm their
  own marking twice
- **The stem row is the one required gesture on this screen**, and it is the same yes/comment row
  the MultipleChoice claim block opens with. Copy the sentence exactly from `claims.md`
- **Feedback anchors are `[⚑]`, one per option plus one on the stem** — the same two-axis control
  the row grammar defines, non-blocking by default on a row
- **Where the sets disagree, the branch below fires instead**, and this screen returns after it

### The MultipleSelect mismatch branch

`review-experience.md` §MultipleSelect mismatches localise per option. **One branch screen, listing
every contested option, with the three-way question asked per option.**

```
├────────────────────────────────────────────────┤
│  Two options disagree.                         │
│                                                │
│  C — you marked it correct, the author did not │
│    ( )  The author is right — I was mistaken   │
│    ( )  I am right — the key is wrong          │
│    ( )  Both are defensible                    │
│                                                │
│  E — you marked it incorrect, the author did   │
│    ( )  The author is right — I was mistaken   │
│    ( )  I am right — the key is wrong          │
│    ( )  Both are defensible                    │
│                                                │
│  … anything you want to add                    │
│                                                │
│                          [ ⏎  continue ]       │
└────────────────────────────────────────────────┘
```

**Not one question about the whole set.** A reviewer can be mistaken on one option and right about
the key on another, and `claims.md` credits this type with better resolution than MultipleChoice
precisely because *a mismatch names the contested option*. Asking once spends that.

**Branch semantics are unchanged**, per option: *I was mistaken* costs nothing and produces no
thread; the other two produce a blocking thread on that option and skip its attestation.

**Conditional and unbounded**, so *n* + 4 is unaffected. `eir-005` at position 12 is where this
gets exercised — the corpus's only wrong-answer-key defect, planted on a MultipleSelect so the
mismatch has an option to localise to. **It is the one defect in the corpus the fork cannot observe
and the session must still catch.**

---

## Screen 6 — The session close

`review-experience.md` §Advancing. One acknowledgement. Nothing is judged here — the per-item Close
was rejected on 2026-09-01 and does not return at session scope.

```
┌─ 12 of 12 ─────────────────────────── content ─┐
│                                                │
│  That's the assignment. Thank you.             │
│                                                │
│           [ ⏎  download the record ]           │
│                                                │
└────────────────────────────────────────────────┘
```

- **This is where the record is written out** — `phase2-<variant>-<iso8601>.json`. No backend, no
  `localStorage`; a session that cannot be re-run from its own record is not instrumented
- **No recap of what the reviewer did.** Same argument as the progress chrome, and Phase 6 scores
  offline against the exported log anyway. **[settled — 2026-09-01]**

---

## One explicit advance per item screen **[settled — 2026-09-01]**

> **The gesture that completes a screen's required set does not advance it.**

`review-experience.md` settled earlier the same day that **the last gesture of Stage 2 advances** —
*no separate next control, because a required gesture that buys only navigation is the thing
`claims.md` refuses.* Drawing the shell against that rule broke it, on screen 5 first.

**Screen 5's required set is one gesture, and it scopes over nothing else on the screen.** The stem
checkbox asserts that the question is well-posed. It does not attest the five option rows and it
does not cover the item-scoped anchor above them. Under completion-advance it ends the item anyway —
a control with the *behaviour* of a bulk attestation and none of its *semantics*, taking the item
away past five untouched anchors.

**`review-motion-fork.md` has met this shape before.** *Flag first, then confirm* exists precisely
because the bulk control is terminal and therefore has to come last. That rule was written about the
claim block. Screen 5 is not one, and never inherited it.

**And it is not confined to screen 5.** In **B** the bulk control does scope over the claim rows —
but not over the item anchor in band 2. A reviewer in B who takes it has ended the item with no
moment for the unlocalised objection, the signal `claims.md` calls the one most worth having. The
variant whose known defect is that composition has no home would have been quietly stripped of the
anchor meant to compensate for it.

### What the gesture buys, since it is required

*No new required gesture without naming what it buys.* Named in `claims.md` §The advance gesture:
**it buys every optional affordance on the screen a moment in which it is reachable.** A gesture
that bought only navigation would still be refused. Remove the objection channel and this one goes
with it.

### The repair that was rejected

Folding screen 5's option rows into a bulk control fixes the scoping cleanly and costs no more than
the design above — one control attesting the stem and the unflagged options, which is exactly B's
screen. **It must not be
built.** It imports B's known defect into the **shell**, where all three variants inherit it, and
the pre-registered Phase 7 prediction is specifically that stem composition is under-represented
*in B relative to A and D*. Contaminating A and D with B's defect does not weaken that finding; it
removes the condition the prediction is about.

### The layout rule, which does not follow from the gesture rule

The advance gesture buys the moment. It does not put the affordance where the moment finds it.

> **On a screen the reviewer reads downward, no optional affordance sits below the gesture that
> completes the required set.**

Which is why `review-experience.md` puts the triviality affordance **beside** the confidence control.
The first draft of screens 2 and 4 put it on its own line underneath — reachable in principle,
missed in practice, on the one signal the spec says survives about two seconds.

**Co-presence is not a substitute.** Everything on screen 5 being visible at once is what made it
look safe, and is why its defect survived a round of argument. Seeing an affordance is not the same
as having a moment to use it.

**The labels are placeholders.** *continue* and *next item* distinguish a screen that advances
within an item from one that ends it. Copy is Phase 3's.

---

## The gesture ledger — what the shell must add up to

Acceptance check 4 counts these by running one. The shell is what makes the count reproducible.

**The fork is decided on the claim-block column.** The shell column is identical across A, B and D
by construction, which is what keeps a shell decision from moving the fork's number — see
`review-motion-fork.md` §Cost, on a clean item.

| | Shell | **Claim block** | Required total |
|---|---|---|---|
| **MultipleChoice-4, A** | 4 — answer, confidence, two advances | **5** — stem, key, A, C, D | 9 |
| **MultipleChoice-4, B** | 4 | **1** — the bulk control | 5 |
| **MultipleChoice-4, D** | 4 | **2** — stem row, bulk control | 6 |
| **MultipleSelect-5** | 8 — five markings, confidence, two advances | **1** — the stem claim | 9 |

**Excluded by definition**, and the build must keep them excluded: the triviality affordance, every
objection anchor, all free text, and both mismatch branches. *An unused channel must cost nothing.*

**Do not reuse the MultipleChoice count on MultipleSelect.** Cost is *n* + 4, not 9 — the two
happening to coincide at *n* = 5 is arithmetic, not a shared structure. They coincided at seven
before the advance gesture too, which is how easy this is to read as a pattern.

---

## What the drawing found

Two settled facts that had never been put against each other, which is the shape every finding in
this project has had.

### 1. The entry card's only affordance is the one Phase 2 descoped

`review-experience.md` §Entry point draws the card as an ask plus **one** line — *Resume at item 6
of 12*. `README.md` §The remaining five puts resume **out of scope for Phase 2**: it is state
persistence, not motion, and cannot affect the fork.

So the card as specified cannot be drawn for this build, and no document says what the card carries
instead. The drawing above uses a plain `begin`, which is a decision this document is making rather
than reporting.

**It is not only a Phase 2 gap.** A first-session reviewer has nothing to resume, so the card's
first-run state was always a second state the spec never drew — Phase 2 is just the first time
anyone needed it.

### 2. *The last gesture of Stage 2 advances* made a terminal control out of a claim about the stem

The rule was settled on 2026-09-01. MultipleSelect was brought into scope the same day. The rule
lives in a section written about the MultipleChoice fork, and MultipleSelect has no Stage 2 — so the
first question was only whether the rule *reached* the type.

It reaches, and what it does on arrival is the finding. **Screen 5's required set is a single
stem-claim checkbox that scopes over nothing else on the screen**, so under the rule a control
asserting *this question is well-posed* also means *and I am done with this item* — ending it past
five untouched per-option anchors. The rule gave a claim about one part the authority of a bulk
attestation over all of them.

**The survey variant has it too, one level down.** B's bulk control scopes over the claim rows and
not over the item-scoped anchor, so taking it ends the item with no moment for the unlocalised
objection. B is the variant whose known defect is that composition has no home; the rule was
removing the anchor that compensates for it.

**`review-motion-fork.md` had already solved this shape and the solution did not travel.** *Flag
first, then confirm* exists because a bulk control is terminal and therefore has to come last. It
was written about the claim block, and neither screen 5 nor the item anchor is one.

**Third instance of the same shape in three sessions** — a rule settled for one case and inherited
by a screen nobody checked it against. The two before were the MultipleSelect mismatch branch and
the Close. What is new here is *how* it was caught: not by comparing two documents, but by drawing
a screen the rule had never been drawn on. **A rule with no picture is a rule that has only been
checked against the cases its author had in mind.**

### 3. A count nobody can run is a claim

**Added 2026-09-02, when the shell was built.** The ledger below was written as a number the build
must reproduce. The acceptance harness counted the gestures a real session takes and came back with
**6** on a clean MultipleSelect where the ledger said **8** — and neither document had changed. The
screen had: `claims.md` specifies *mark this option correct / incorrect*, and screen 4 above was
drawn as a checkbox list, where the options a reviewer never touches are answered by the default.

**Fourth instance of the shape, and the second caught by doing rather than reading.** The advance
gesture was caught by *drawing* a screen the rule had never been drawn on. This one was caught by
*running* one.

> **A count nobody can run is a claim. A count the build reproduces is a check.**

See `../../docs/journal/2026-09-multiselect-marking.md`. The ledger itself is unchanged.

### 4. The fork's headline number was sensitive to decisions outside the fork

Repairing the above adds a gesture to every item screen, which moves the totals from 7 · 3 · 4 to
9 · 5 · 6 — the difference of four intact, the ratio compressed. By the Close entry's own standard
that damages the argument: *the ordering survives, the ratio does not, and the ratio is the
argument.*

Note what those numbers are. **The Close journal's table of what the fork would have been decided on
had a phantom sentence been real is 9 · 5 · 6.** The same figures, arrived at legitimately.

That a shell decision — or a sentence nobody had deleted — could rewrite the case for sequential
motion is a property of the argument, not of the shell. So the comparison is restated on the column
the fork varies: **claim block 5 · 1 · 2**, a sharper ratio than the totals ever carried, and one no
shell decision can reach. `review-motion-fork.md` §Cost, on a clean item.

---

## Related

- [`README.md`](README.md) — the build brief this shell is a line item of
- [`../../docs/design/review-experience.md`](../../docs/design/review-experience.md) — Stage 1, the
  mismatch branches, the row grammar, the anchors, the presentation contract
- [`../../docs/design/review-motion-fork.md`](../../docs/design/review-motion-fork.md) — the three
  Stage-2 claim blocks that drop into band 3
- [`../../docs/design/claims.md`](../../docs/design/claims.md) — claim sentences and the gesture
  inventory the ledger is checked against
