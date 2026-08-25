# CoQui — The Review Experience (Track A)

Designed from the reviewer's experience outward. Builds on `process-model.md`.

> **Everything in this document is CoQui-local** unless explicitly marked as crossing to Armature. See `../architecture.md` for the full division of state.

**[settled]** = decided. **[proposed]** = recommendation, open.

---

## Scope **[settled — ADR-0005]**

**Multiple choice first.** MultipleChoice, MultipleSelect and TrueFalse are supported cleanly; Matching, Ordering and FillInTheBlank are deliberately deferred. Objectives are read-only context throughout.

---

## The governing claim

Reviewing a four-option multiple-choice item under a content-accuracy lens is not one judgment. It is seven:

1. Is the stem clear and self-contained?
2. Is the keyed answer actually correct?
3. Is distractor A definitively wrong?
4. Is distractor B definitively wrong?
5. Is distractor C definitively wrong?
6. Does anything in the stem cue the answer?
7. Does this measure the objective at the intended cognitive level?

Twelve items is roughly eighty-four judgments. That is why a "quick review" takes two hours.

**When a tool presents one comment box per item, it implicitly asks for one judgment — so it receives one.** The other six never happen. The rubber-stamp failure mode is not SME laziness; it is an interface that asked a single vague question and got a single vague answer.

The shape of the review surface determines the depth of the review. Everything below follows.

---

## Attestation — CoQui-local **[settled: per part — ADR-0004]**

> Nothing here reaches Armature. Item readiness is the only review outcome the graph records. The interaction design below is unaffected — it was always about making a careful review fast.

### Parts

A **part** carries an independently falsifiable claim:

| Item type | Parts |
|---|---|
| MultipleChoice | stem · key · each distractor · alignment |
| MultipleSelect | stem · each option · alignment |
| TrueFalse | stem · key · alignment |

Each part is **unexamined**, **confirmed**, or **flagged**.

### Attestation is per (part × lens)

Distractor C under content accuracy carries the claim *"this is factually wrong."* The same distractor under distractor quality carries *"this is a plausible misconception rather than filler."* Confirming one says nothing about the other.

This is not an added feature — it follows from per-part attestation plus distinct lenses.

**The payoff:** *"is this item ready?"* stops being a single flag and becomes a legible grid — *content-verified by Dr. Chen at version 3; clarity-reviewed by nobody; alignment unconfirmed.* When the item is pushed to Armature, that grid collapses to one of four status values at the boundary.

**The cost, and the thing to test first:** a real SME may experience the grid as bureaucracy rather than clarity.

### Staleness is structural

Editing a part resets attestations on **that part only**. Edit distractor C and the confirmations of A and B still stand.

This resolves *"who decides whether an edit was substantive?"* — nobody does; you track what was touched. CoQui computes this; Armature does not need to know.

---

## Interaction budget

Per-part attestation means roughly 7 gestures per item, ~84 per assignment. It survives only if each is nearly free.

**Design budget: a clean item takes under 15 seconds.** A 12-item content-accuracy assignment closes in about 20 minutes, not two hours.

- **Keyboard-first** — move, confirm, comment, suggest, toggle blocking, all without a mouse
- **Confirm-rest-of-item escape** — reading a whole item and seeing no problems should not cost seven keystrokes
- **Persistent progress** — where you are, how much is left, how long it will take
- **Resumable** — five items in, laptop closed, return to item six

Composition is expensive; confirmation is cheap. Prose is reserved for real problems.

---

## The four lens modes **[settled: all four distinct]**

The lens is a mode, not a label. The screen *is* the lens.

### Content accuracy

Objective pinned in view. Stem, then key and distractors as a verification list with each claim stated explicitly:

```
B  — claimed CORRECT     [confirm] [flag]
A  — claimed INCORRECT   [confirm] [flag]
C  — claimed INCORRECT   [confirm] [flag]
D  — claimed INCORRECT   [confirm] [flag]
```

Making the claim visible is the point. The SME is not asked "thoughts?" but whether a specific stated claim is true.

### Alignment

Objective and intended cognitive level central; item collapsed to stem plus key. Distractors hidden — irrelevant here, and noise.

One judgment: *does this measure that objective at that level?* If no, the SME names the level it actually measures. Fast — twelve items in ten minutes.

**A dispute here crosses to Armature** as a design finding naming both the item and the objective. Agreement does not cross.

### Distractor quality

Cross-item mode — distractors grouped, ideally all for one objective together. Repetition and filler patterns are invisible one item at a time.

**The SME sees the ID's stated purpose before judging.** Per distractor: does the stated purpose hold?

### Clarity — the key is hidden

The item renders as a learner encounters it. **The keyed answer is not shown.**

You cannot judge whether a stem is ambiguous once you know the intended answer — knowing it makes the ambiguity invisible. A clarity review that displays the key is measuring something else.

**Then let the SME answer the item.** If a domain expert selects a distractor, the item is broken — and you have learned that without them articulating why. The key is revealed after they commit; a mismatch auto-opens a blocking thread pre-populated with their choice.

This converts the hardest judgment in item review into a behavioural signal that costs the reviewer nothing.

---

## Prompted rationale on distractors

Authoring-side, and the mechanism by which Armature can eventually formalise anything. See `rationale-capture.md`.

**One question, typed answer.** An open vocabulary alongside free text.

**Diagnostic** — selection means something about the learner:
common misconception · prerequisite gap · procedural error · partial understanding · surface-plausible · outdated knowledge

**Structural** — nothing to do with the learner:
difficulty tuning · filler · domain sampling

**A truthful null is mandatory.** The list must include an explicit *"no diagnostic purpose."* If every available answer is virtuous, every designer picks a virtuous one and the corpus is poisoned. Filler labelled as filler is real information — it says the item has two working distractors, not three.

**Three states matter:** unanswered, "no diagnostic purpose", and a substantive answer. If skipping collapses into filler, the denominator is lost.

**[proposed] Required at approval, not at authoring.** Draft freely; nothing enters the bank without a deliberate statement on every distractor.

**The friction you want is cognitive, not mechanical.** ~36 choices per assignment is about 70 seconds with a keyboard dropdown. If choosing is instant, nobody is thinking — make the mechanics fast and buy the thinking time.

**Crosses to Armature** as a design note.

---

## Blind review — the principle, refined **[settled]**

> **Hide what the reviewer can supply themselves; show what they would only be guessing at.**

Hiding the key works because a learner-like reading is what you want from any competent reader — the SME can produce that judgment independently.

Hiding a distractor's stated purpose would ask the SME to reverse-engineer assessment design intent, which is not their expertise. Showing it asks whether a claim about their domain is true, which is.

So: **the SME sees the stated purpose before judging it.** Review becomes a direct test of the claim — *"you say this diagnoses misconception X; I don't think learners believe X."*

Self-report is weak evidence. **Contested self-report is strong.**

---

## Re-review

Shows only what changed and what awaits confirmation. Never the full item again.

Per thread: **what the SME said → what the ID did.** An edit appears as an inline diff; a decline appears as the ID's stated reasoning. Two responses: accept or reopen.

**Unrequested edits are surfaced separately** — *"also changed, not in response to your feedback"* — because prior attestations on those parts are now stale.

**Design budget: under 5 minutes for a 12-item assignment.** If a second pass costs anything like the first, SMEs batch and stall, and the loop stops converging.

---

## Entry point

Not a dashboard. One card:

> **Amos** asked you to check **12 items** for **content accuracy** by **Thursday**.
> About **35 minutes**. — *Resume at item 6 of 12*

The time estimate is an adoption lever, not decoration — it converts *"I'll get to this later"* into *"I have 35 minutes now."* Estimates derive from item count weighted by lens.

**A first-time SME should be productive within two minutes, with no training and no configuration.** They did not ask for a new tool.

---

## The ID's side

A triage queue of threads, grouped by item, blocking first. Four moves: edit · decline with reasoning · ask back · defer.

**Accepting suggestions can be bulk; declining is always individual and always requires a reason.** Making changes should be cheap; refusing should require thought — and it is where the durable design record comes from.

---

## Anti-patterns

- Comment boxes with no anchor — *"on the third one, the second option is iffy"*
- A dashboard as the entry point
- Showing the key during a clarity review
- Requiring the SME to close threads they no longer care about
- Asking the same expert the same thing twice across items
- Configuration before a first-time reviewer can contribute
- Notifications that are not a specific, scoped, time-boxed ask

---

## Risks and open questions

**Build order.** Content accuracy as a complete vertical slice first — the most demanding mode and the highest value. If per-part attestation survives contact with a real SME there, the other three are variations on a proven pattern.

**Test the 15-second budget with a stopwatch before building all four modes.** It is an assumption. If a real content-accuracy item takes 45 seconds, the model needs rethinking, not more modes.

- Attributed or anonymous attestation? Credibility argues for attributed; attribution may make SMEs conservative. Note the constraint from Armature ADR-0021 — attribution is provenance, never performance data
- Can an ID attest to their own items? Probably, marked distinctly
- Do attestations expire by time, not only by edit?
- SMEs will challenge objectives, which are out of scope. They need a graceful path — the upstream-flagging channel, not a wall
- How does the time estimate calibrate? Guessing badly in either direction damages trust in the ask
- The SME half of this design still rests on inference, not research
