# The Review-Motion Fork — Sequential, Survey, or Asymmetric (Track A)

> **Answers:** *When a content reviewer confirms the five claims on a MultipleChoice item, does
> focus walk part to part, or is the whole item surveyed and only exceptions marked? What does
> each cost, and how do we find out which one reviewers actually use?*

**This is Phase 2 of [`content-accuracy-validation-plan.md`](content-accuracy-validation-plan.md).**
That phase names the fork and says a single candidate cannot lose it; this document is the
specification of what gets built and what it is compared on.

**[settled]** = decided here. **[proposed]** = recommendation, open.

---

## Where the fork lives **[settled]**

The choice applies to exactly one place: **Surface 1, Stage 2 (revealed)** — the five content
claims on a MultipleChoice item. Everywhere else in the design the motion is already fixed, by
construction or by an earlier decision.

| Where | Motion | Why the fork is unavailable |
|---|---|---|
| Content, Stage 1 (blind) | Fixed | The blind answer is a production and confidence follows it. Neither can be surveyed away |
| Content, TrueFalse | Fixed | One part. The stem *is* the claim |
| Content, MultipleSelect | Fixed | The *n* option markings **are** the blind answer. Productions, forced by construction — there is no second pass to survey |
| Content, on an answer mismatch | Fixed | Branches 2 and 3 skip part attestation entirely. An item already going back is never surveyed |
| **Content, MultipleChoice, Stage 2** | **Open — this document** | Five independent recognitions, and the only place a reviewer could be offered fewer |
| Craft review | **Already survey** | Settled in `review-experience.md` §Surface 2 — *form-like, everything visible at once* |

### The design has already resolved this fork once **[settled]**

Craft review chose the survey model without naming it as a choice. Its reasoning is recoverable,
and it generalises into a criterion:

> **Survey where the judgments are comparative and quick.**
> **Sequential where they are independent and expensive.**

Craft's judgments are comparative — a distractor's purpose is legible against its siblings, and
repetition patterns are invisible one item at a time — and they carry no domain recall. Content's
five claims are the opposite: each option is judged on its own merits against the key, and each
costs domain recall that no interface compresses.

**The criterion argues for sequential, and it is an argument rather than a measurement.** It is
recorded here, before Phase 6 runs, for the reason Phase 7 gives about its own gate: a criterion
adopted after the result is a criterion that rationalises it.

It does not settle the fork, because it exposes the thing the fork's own framing gets wrong — the
five rows are not one kind of judgment. See **Variant D** below.

---

## What the corpus can currently observe **[settled]**

Scope has an arithmetic consequence that was cheap to see while specifying and expensive to
discover during Phase 6. Intersect the scope table above with the corpus and the fork is exercised
only on **clean MultipleChoice items** — of which, on 2026-08-28, there were two.

| | 08-28 | Extended 08-31 |
|---|---|---|
| Session pool | 10 — 5 MC, 5 MS | 14 — 9 MC, 5 MS |
| Clean | 6 | 10 |
| **Clean MultipleChoice — exercise the fork** | **2** | **6** |

Two chances to observe whether a reviewer reaches for a bulk confirm is not a thin measurement; it
is not a measurement. **So the two clean items Phase 1 was still short became a shape requirement,
not a headcount** — resolved 2026-08-31 with four clean MultipleChoice items (`eir-015`–`eir-018`)
from a second source. Six is the point at which a bulk-confirm rate is a rate rather than an
anecdote.

**[proposed]** Bench two clean MultipleSelect items and run twelve at 8/4. Six clean MC plus two
clean MS plus the four defective holds Phase 1's ratio exactly. The cost is real: `corpus/README.md`
keeps the MultipleSelect items clean so Phase 4's MultipleSelect-vs-MultipleChoice cost comparison
runs on undamaged items, and benching two halves that comparison's clean MS side. *Which* two also
matters — `eir-013` and `eir-014` carry the known valence cueing, so benching both leaves that side
craft-clean and benching neither leaves it entirely cued. The alternative is fourteen at 10/4, which
dilutes the defect ratio the phase argued for.

---

## The variants

Three, per the phase's own rule that a single candidate cannot lose. Stage 1 is identical in all
three and is not part of the test. The item text stays visible above the claim block throughout —
re-reading forced by layout is one of the few costs the design actually controls.

### A — Sequential

One claim in focus; confirming advances to the next. No way to spend fewer than five gestures on a
clean item.

```
┌─ item 6 of 12 ─────────────────────── content ─┐
│  Which of the following best describes …       │
│    A …    B …  ← key    C …    D …             │
├────────────────────────────────────────────────┤
│  ▸ STEM                                 1 of 5 │
│    This question is well-posed: nothing here   │
│    is wrong, misleading, or ill-formed.        │
│                                                │
│      [y] confirm      [c] comment              │
│                                                │
│    key — B      ·                              │
│    A            ·                              │
│    C            ·                              │
│    D            ·                              │
└────────────────────────────────────────────────┘
```

### B — Survey

All five claim sentences visible at once. One control confirms the set; exceptions are flagged
individually.

```
┌─ item 6 of 12 ─────────────────────── content ─┐
│  Which of the following best describes …       │
│    A …    B …  ← key    C …    D …             │
├────────────────────────────────────────────────┤
│  stem     well-posed                       [⚑] │
│  key — B  incontrovertibly correct         [⚑] │
│  A        wrong, not merely weaker than B  [⚑] │
│  C        wrong, not merely weaker than B  [⚑] │
│  D        wrong, not merely weaker than B  [⚑] │
│                                                │
│              [ ⏎  all five hold ]              │
└────────────────────────────────────────────────┘
```

### D — Asymmetric

The stem keeps its own sequential moment; the four option rows survey as a block.

```
┌─ item 6 of 12 ─────────────────────── content ─┐
│  Which of the following best describes …       │
│    A …    B …  ← key    C …    D …             │
├────────────────────────────────────────────────┤
│  ▸ STEM   well-posed: nothing here is wrong,   │
│           misleading, or ill-formed            │
│             [y] confirm      [c] comment       │
├────────────────────────────────────────────────┤
│  key — B  incontrovertibly correct         [⚑] │
│  A        wrong, not merely weaker than B  [⚑] │
│  C        wrong, not merely weaker than B  [⚑] │
│  D        wrong, not merely weaker than B  [⚑] │
│                                                │
│              [ ⏎  all four hold ]              │
└────────────────────────────────────────────────┘
```

**Why D exists.** `claims.md` already says the rows are unequal. The stem claim is
**yes/comment** with composition expected and no *no* branch; the four option claims are
**yes/no recognitions**, and *"wrong, not merely weaker than B"* is recorded as the longest claim
on the screen, read three to five times per item. A uniform motion across rows of unequal kind is
an assumption, and the fork as originally posed does not contain the option that follows from the
design's own gesture classes.

### The surveyed block confirms what is left **[settled — 2026-08-31]**

> **Flag first, then confirm.** The bulk control attests the rows that have not been flagged.

The alternative — the bulk control as the entry move, confirming all four, with a later flag
retracting that row — is a different interaction wearing the same two gestures. On a clean item
both cost the same, so the cost table cannot separate them and this is settled by argument, on the
discipline this document applies to its own gate.

**Three reasons.**

*It keeps the bulk attestation true when it is taken.* Flag-then-confirm makes it a scoped claim
over an unflagged subset. Confirm-then-flag makes it an unconditional claim, amended afterwards.
`claims.md` treats those as different attestations, and only the first is one a reviewer could
defend as written.

*It is what the instrumentation already assumes.* The record below distinguishes a reviewer who
surveyed and found nothing from one who skipped, by whether any row was flagged **before** the bulk
gesture. Under confirm-then-flag that fact is structurally always false — nothing can precede the
entry move — and the discriminator is not weakened but destroyed. The instrumentation was
specified before this rule was, and had quietly assumed it.

*It needs no retraction semantics.* Confirm-then-flag has to answer what the record shows for a row
confirmed in bulk and flagged after: never attested, or attested then withdrawn. ADR-0009 does not
answer it, and the answer would be new process-model state bought for a layout preference.

**The cost, stated.** The control's meaning depends on state — *all four hold* when nothing is
flagged, *the rest hold* when something is. A label that changes under the reviewer is a real
usability problem, and it is Phase 3's to solve rather than a reason to prefer the alternative.

**This governs B as well.** D's option block is B's whole screen minus the stem row; the rule is
filed here because that is where the question was posed, not because it is D's alone.

---

### Cost, on a clean item — content, MultipleChoice-4

| | Stage 1 | Stage 2 | **Required total** | Composition |
|---|---|---|---|---|
| **A — Sequential** | 2 | 5 | **7** | Its own gesture, on the stem row |
| **B — Survey** | 2 | 1 | **3** | **No moment.** The stem claim is inside the bulk control |
| **D — Asymmetric** | 2 | 2 | **4** | Its own gesture, on the stem row |

**The specification as written is Variant A.** The gesture inventory in `claims.md` costs content
MultipleChoice-4 at seven, which is A's number and nobody else's. The documents hedged in prose
while the cost table had already committed — worth naming, because it means A is the incumbent and
B and D are the challengers, not three peers.

**B's missing composition moment is a substantive objection, not a layout detail.** The stem cell
is the one the design expects to draw comment, and B gives comment no home short of the flag
control it shares with *this claim is false*. Merging *I want to say something* with *I am blocking
this* is how an objection channel gets under-used.

---

## Why the escape hatch is not a fourth variant **[settled]**

Phase 2 records a third option — **available but counted**: sequential motion plus a persistent
*confirm the rest*, with every attestation recording `perPart` or `bulk`. That is the right thing
to **ship**. It is the wrong thing to **test**, because it contains both A and B, and a design that
contains both sides of a fork cannot resolve it.

**Escape rate is confounded with the escape's own salience.** A bulk control on the primary row and
one in a footer produce different rates from the same reviewers holding the same beliefs. Run C as
the experiment and a button-placement artifact reads as a finding about the seven-judgments thesis.

**Sequencing that avoids the confound** **[settled — 2026-09-01]**

1. **Phase 6 runs A, B and D, between-subject — one variant per reviewer, full session each.** The
   absence of an escape in A and the absence of a per-part path in B remove the placement variable
   entirely
2. **The fork resolves on that evidence**
3. **The winner ships instrumented**, with the counted escape attached to it

### Exposure is between-subject **[settled — 2026-09-01]**

Interleaving three variants across one twelve-item session gives each variant four items — **two
clean MultipleChoice**, which is the number *What the corpus can currently observe* above already
rejected as *not a measurement*. Six clean MC was sourced deliberately to escape it; dividing it
three ways spends the sourcing. One variant per reviewer keeps all six.

**Supersedes** `content-accuracy-validation-plan.md` Phase 4's *alternate within-subject, six items
each, order counterbalanced*.

**The cost, stated in advance.** *n* = 1 per cell, so variant is fully confounded with reviewer, and
a bulk-confirm rate that differs between two people running two variants is not evidence about the
variants. What survives the confound is within-person and per-item: whether *this* reviewer reached
for the bulk control, at which row, having flagged anything first — the three facts below — and the
ground truth, scored per item. The gesture counts are structural and already known; Phase 6 verifies
them rather than measuring them.

**It sharpens a Phase 7 question.** *One reviewer or two* is now **three, or the fork does not
resolve on session evidence.**

---

## Why the objection channel is not crossed with this fork **[settled — 2026-09-01]**

The question was whether Phase 6 could run A1/A2, B1/B2, D1/D2 — each motion crossed with a
placement of the objection channel. It cannot, for the same reason C is not a fourth variant.

**B2 is not a second B. It is the repair for B's known defect.** This document's objection to B is
that the stem claim loses its composition moment and comment has no home short of the flag control.
An ambient channel *fixes that*. So A-against-B asks whether survey beats sequential, and
B-against-B2 asks whether the fix works — a different question, and one that only becomes
interesting after the first resolves.

**The two factors interact by construction.**

| | Existing comment home |
|---|---|
| A — sequential | `[c] comment` on the stem row |
| D — asymmetric | `[c] comment` on the stem row |
| **B — survey** | **none** — the flag control, or nothing |

A1→A2 and D1→D2 change almost nothing; B1→B2 changes B's central objection. That is an interaction
effect, and an interaction is precisely what six cells at one reviewer each cannot detect. The
design would double the scarcest input in the project to make the primary comparison *less*
attributable.

**And placement is a salience variable**, which is the confound §Why the escape hatch is not a
fourth variant was written to refuse: *a bulk control on the primary row and one in a footer produce
different rates from the same reviewers holding the same beliefs.* Crossing placement with motion
re-imports it one level down.

**Expert attention is the wrong instrument for it.** Motion needs domain experts — the cost being
measured is domain recall across five claims. Channel placement is largely a **findability**
question, and findability does not need a subject-matter expert: the Phase 5 calibration run, or a
click-through with non-experts, answers *can you find where to say something* at a fraction of the
cost. Phase 3 already owns the operating half — *how is an objection raised, including an
unlocalised one* — so the channel is scheduled, not unscheduled.

**What Phase 2 owes it:** one placement, applied identically to A, B and D. A decision, not a fork.
If placement still looks live afterwards it gets its own fork **on the winning motion**, which is
the sequencing the escape hatch got.

### The B composition prediction, pre-registered **[settled — 2026-09-01]**

Holding the channel constant does not cost the channel finding — it produces one, provided the
prediction is written before Phase 6 runs.

> **In B, comment on the stem claim will be under-represented relative to A and D, and objections
> will migrate into the flag control.**

Directional and presence/absence, not a rate comparison, which is what makes it readable at one
reviewer per cell — and consistent with Phase 7's own rule that *direction and comparison can be
pre-registered; magnitude cannot*. **Adding B2 destroys this finding**, because B2 removes the
condition the prediction is about. Recorded as a gate row in
[`content-accuracy-validation-plan.md`](content-accuracy-validation-plan.md) §Phase 7.

---

## What the instrumentation must record **[settled]**

Whichever variant ships, the attestation record distinguishes *confirmed in bulk* from *confirmed
per part*. Three facts, stored separately, for the reason `claims.md` gives about the blind stage's
three signals — collapsing them at capture destroys every compound reading.

| Fact | Why |
|---|---|
| `perPart` / `bulk` | The thesis. If bulk dominates on clean items, the grid's reliability is assumed rather than earned |
| The row index the bulk control was taken at | *Bulk from row one* and *bulk after three per-part confirms* are different behaviours wearing one label |
| Whether any row was flagged before the bulk gesture | Distinguishes a reviewer who surveyed and found nothing from one who skipped |

**This third fact depends on the surveyed block confirming what is left**, settled above. Under a
bulk control that fires first and is amended by later flags, nothing can be flagged before it and
the fact is always false. Recorded here because the dependency ran the other way when it was
written: the measurement was specified first and the interaction it needs was still open.

**A bulk attestation is a real attestation.** It is not a skip, is not second-class, and does not
block approval — ADR-0008's predicate reads filled cells, not how they were filled. The
distinction is diagnostic, and it is diagnostic about **the surface**, not about the reviewer.

**[proposed]** The marker is **invisible to the reviewer during Phase 6 and visible in the shipped
record.** Showing *confirmed in bulk* back to a reviewer pushes them toward the per-part path,
which is exactly the contamination Phase 6 is trying to avoid — and exactly the honesty the
stakeholder's record needs afterward.

---

## What this document does not decide

- **Keystroke grammar.** Phase 3's job. The bracketed keys in the wireframes are placeholders that
  make the gesture count legible, not a proposed binding
- **Visual design.** Low-fidelity by intent. Phase 2's output is two hours per variant
- **The objection channel's prompts.** Still unwritten. The variants can show the channel without
  prompt content; Phase 3 cannot
- **Craft review's motion.** Survey, by assertion, never tested. See the open questions

---

## Open questions

- **Craft review chose survey and has never been measured.** Seven gestures on a MultipleChoice
  item — the same count as content review, but cheap recognitions carrying no domain recall, laid
  out in a form where everything is already visible. That makes it the surface where a bulk confirm
  is *least* costly to reach for and *most* likely to be reflexive, and the one nobody instrumented.
  If the criterion above is right the choice is correct; the criterion is an argument
- **Does the escape belong above the item?** *Confirm the rest of this assignment* is the same
  affordance one level up, and `review-experience.md` lists comment boxes with no anchor as an
  anti-pattern for related reasons. Presumed out of scope; not argued
- **Does D's option block need an ordering rule?** *Settled 2026-08-31 — flag first, then
  confirm; see §The surveyed block confirms what is left.* The bullet conflated two senses of
  ordering that share a word and nothing else: the sequence the **gestures** happen in, settled
  here, and the sequence the **options** appear in, which is `claims.md`'s question and remains
  open. Option order is now fixed at build time by the presentation contract in
  [`review-experience.md`](review-experience.md); what `claims.md` still asks is whether order
  shifts the markings, and whether the order shown should differ from the author's
- **Twelve at 8/4 with two MultipleSelect benched, or fourteen at 10/4?** See *What the corpus can
  currently observe*
- **Is a bulk-confirm rate even readable from one reviewer?** Phase 7's *one reviewer or two?* is
  usually framed as a recruiting question. It is also this question, and this document is the
  reason it has a second cost

---

## Related

- [`content-accuracy-validation-plan.md`](content-accuracy-validation-plan.md) — Phase 2, which
  this document is the output of
- [`claims.md`](claims.md) — the grid, the claim sentences, and the gesture inventory these
  variants are costed against
- [`review-experience.md`](review-experience.md) — Surface 1's two stages, the mismatch branch, and
  craft review's already-settled survey motion
- [`../../corpus/README.md`](../../corpus/README.md) — the item pool the fork gets observed on
