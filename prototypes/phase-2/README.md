# Phase 2 — Build brief: the three review-motion variants

> **The specification is [`../../docs/design/review-motion-fork.md`](../../docs/design/review-motion-fork.md).**
> That document says what A, B and D are and why. This one is the build contract: what the code
> must do, in what order, and what it must be checked against. Where the two disagree, the spec
> wins and this file is wrong.

**Phase 2 of [`../../docs/design/content-accuracy-validation-plan.md`](../../docs/design/content-accuracy-validation-plan.md).**
Budget: two hours per variant. That buys the **Stage 2 claim block** and nothing else — the shell
below is a separate line item, and reading the budget as covering it is how this gets rushed.

---

## Settled for the build — 2026-08-31

| Decision | Value |
|---|---|
| **Exposure** | **Between-subject.** One variant per reviewer, each reviewer runs the full session |
| **Shape** | **One shell, three Stage-2 claim-block renderers.** Variant is a session-level parameter — `?variant=A\|B\|D` |
| **Flow scope** | The full twelve-item session. Stage 1 + Stage 2 on MultipleChoice; **MultipleSelect Stage 1 built**, not stubbed |
| **Location** | This directory. Vanilla HTML/JS/CSS, no build step, no backend, no dependencies. `python3 -m http.server` from the repo root; the page fetches `../../corpus/session-corpus.json` |

**The one dependency is the harness, not the prototype.** `acceptance/walkthrough.mjs` drives a real
browser and needs Playwright; it is deliberately outside `package.json` so nothing a reviewer runs
has an install step. `package.json` exists only to mark `lib/` as ES modules.

### Why between-subject, and what it costs

Interleaving three variants across one 12-item session gives each variant four items — **two clean
MultipleChoice**, which is the number `review-motion-fork.md` §What the corpus can currently observe
already rejected as *not a measurement*. Six clean MC was sourced deliberately; dividing it three
ways spends the sourcing. Between-subject keeps all six per variant.

**What it costs, stated plainly, so Phase 6 does not discover it at Phase 7:**

- **n = 1 per cell. Variant is fully confounded with reviewer.** A bulk-confirm rate that differs
  between two people running two variants is not evidence about the variants
- **The gesture counts are structural and already known** — 7, 3, 4. Phase 6 verifies them; it does
  not measure them
- **What is readable is within-person**: did *this* reviewer reach for the bulk control, at which
  row, and had they flagged anything first. Those are the three facts the instrumentation records,
  and each is interpretable from one session
- **The anchor that survives the confound is the ground truth** — defects caught per
  `countsAsCaught`, scored per item rather than per reviewer
- **Phase 7's *one reviewer or two* is now *three, or the fork does not resolve on session
  evidence*.** It was already a recruiting decision with lead time; this sharpens it

### MultipleSelect is in scope **[settled — 2026-09-01]**

Stubbing the type was considered and dropped. `ordering.sequence` opens on **`eir-002`, a
MultipleSelect**, and the wrong-answer-key defect **`eir-005` is a MultipleSelect** at position 12,
so a stub would have opened the session on a placeholder — voiding the `first-item-clean` ordering
constraint, *a reviewer's first item calibrates them* — and left the run exercising three of four
defect types under a gate pre-registered at four.

**It is shell work, not variant work.** MultipleSelect has no Stage 2 fork: the *n* option markings
**are** the blind answer (`review-motion-fork.md` §Where the fork lives), so there is no claim
block, no bulk control and no variant divergence. It is the same screen in A, B and D — a checkbox
list, a confidence control, done.

**Consequences to hold on to:**

- The **Phase 7 gate stays at 4 of 4**. No restatement needed
- Cost is *n* + 4 gestures, not 9 — `claims.md`'s inventory. Do not reuse the MultipleChoice count
- `eir-005`'s defect is a **wrong answer key on a MultipleSelect**, which is caught at Stage 1
  rather than in a claim block. It is the one defect in the corpus the fork cannot observe and the
  session must still

---


## Before the variants can be drawn

The corpus side is finished. What is missing is design.

### 1. The row grammar — **settled 2026-09-01**

Two independent axes, not three exclusive states
(`review-experience.md` §What a claim row's controls are):

| Axis | Values |
|---|---|
| **Affirmation** | affirmed · not affirmed |
| **Feedback** | none · non-blocking · blocking |

**Rows are unchecked by default; the reviewer checks to affirm.** That is what makes the surveyed
block's *flag first, then confirm* render as literally *check the remaining boxes*, and it keeps an
untouched row visibly untouched.

**Identical in all three variants.** The fork tests how many rows a reviewer must touch, not what
touching one does — a row control that differs between A, B and D confounds motion with grammar and
makes neither attributable. This is the option-permutation argument one level down.

Still open, and it affects the screen:

- **The blocking switch's default direction.** ADR-0010 says objections block *when raised*, but a
  comment on a *confirmed* claim is neither a cell nor an objection. Marked `[proposed]` in
  `review-experience.md`; may need an ADR superseding 0010
- **Whether a flagged row can be un-flagged**, and what the record shows if it is
- **Whether affirm and comment are one control or two.** A's stem row shows `[c] comment`; its
  option rows show `[flag]`; B shows a single `[⚑]` for both. The wireframes are inconsistent
  because the grammar was undefined when they were drawn

### 2. The objection channel — **settled 2026-09-01**

**Two anchors, and it is not a separate widget** (`review-experience.md` §Anchors — two, not one):

| Anchor | Mechanism |
|---|---|
| **Every part** | The feedback axis of that part's row — the grammar in §1 |
| **The item** | One instance of the same control, for the objection that names nothing narrower |

The affirmation axis varies by part type — affirmed on MultipleChoice Stage 2, marked on
MultipleSelect, answered on TrueFalse. **The feedback axis is the same control on all of them.**

**Placement.** Per-part anchors sit in their rows. The item-scoped anchor is **one collapsed line
directly below the item text, above the claim block**, present at both stages, expanding on
activation.

The reason is the anchor. **The claim block is what differs between variants**, so a control at the
foot of it sits five rows deep in A and one gesture deep in B — same pixel position, different
reading-path distance, which is the confound that disqualified variant C. The item text block is
identical in all three by specification.

**Stage 1 gets the item-scoped anchor and the triviality affordance, and no per-part anchors.
Deliberately** — per-option objection controls turn the blind stage into a review screen. **Do not
add them for completeness.** This is the single most likely well-intentioned way to break the
experiment.

**MultipleSelect is the exception, by timing.** Its options are parts whose claim *is* the marking
and it has no second stage, so its per-option anchors appear **at the comparison step, after the
set is marked** — never during marking.

**It is not crossed with the fork.** A1/A2, B1/B2, D1/D2 was refused
(`review-motion-fork.md` §Why the objection channel is not crossed with this fork). **Whatever is
built, B gets exactly what A and D get and no more** — the pre-registered prediction depends on it:

> In B, comment on the stem claim will be under-represented relative to A and D. What the stem
> draws will migrate either into the flag control or up to the item-scoped anchor — and in both
> cases lose the row it was about.

Prompt *content* stays out of scope (unwritten, Phase 3). The anchor renders without prompts.

### 3. The remaining five — **all settled 2026-09-01**

| | Decision |
|---|---|
| **MultipleSelect mismatch** | One branch screen listing every contested option, three-way question **per option**. Conditional, so *n* + 4 is unaffected |
| **Blocking default** | Follows the anchor — **non-blocking on a row, blocking on an item-scoped objection** |
| **Stage 1** | **One screen, two gestures** — select an option, mark confidence, which advances. Triviality beside confidence, optional, **free text never gated** |
| **Advancing** | The **last gesture of Stage 2 advances**. No separate *next* control. After item 12, a session-close screen, which is where the record is written out |
| **Resume** | **Out of scope for Phase 2.** It is state persistence, not motion, and cannot affect the fork — but the event log carries item boundaries so Phase 4 can add it without redesigning the record |

`review-experience.md` owns all but the last; the last is a build-scope decision and lives here.

### Resolved: there is no Close

`review-experience.md` §Close — *would you use this item?*, plus a difficulty read — was a rejected
idea whose sentence outlived the rejection with no journal entry. Deleted 2026-09-01;
`docs/journal/2026-09-close-and-row-grammar.md` records it.

**The gesture inventory is confirmed complete as of that pass.** Had the Close been real, every
row would have been wrong by two and the fork would have been decided on *five against nine* rather
than *three against seven* — the ordering survives, the ratio does not, and the ratio is the
argument.

**Both halves of that moved on 2026-09-01, when the shell was drawn.** The inventory took one more
gesture — an explicit advance per item screen, `claims.md` §The advance gesture — and the totals are
now **A 9 · B 5 · D 6**, the figures the Close would have produced, reached legitimately. The
argument itself is restated on the column the fork varies: **claim block 5 · 1 · 2**, which no shell
decision can move. See `docs/journal/2026-09-advance-gesture.md` and `shell.md`.

---

## The shell is undesigned, and it is not in the per-variant budget

`review-motion-fork.md` draws three Stage-2 claim blocks. Everything the three share exists as
prose and has never been drawn:

- **Stage 1** — the item as a learner sees it, the blind answer, the confidence control, the
  triviality affordance and its long deliberate label
- **The mismatch branch** — three responses, and branches two and three skipping part attestation
- **Item chrome** — persistent progress, *where you are and how much is left*
- **Resume** — `review-experience.md` §Interaction cost requires it: *five items in, laptop closed,
  return to item six*. It is a design requirement, not a nicety, and it constrains the event log
- **The entry card** — Phase 6 hands it over with no training. **No time estimate goes on it**
  until Phase 4 measures one

Stage 1 is identical across variants and therefore *not part of the test* — which is exactly why it
must be designed once, deliberately, rather than three times by accident. **Two hours per variant
buys the claim block. The shell is its own line item and its own hours.**

---

## Build order

1. **Fixture loader + presentation-contract assertion** — shared, and first, because everything
   downstream renders through it. **Built 2026-09-02** — `lib/corpus.js`, checked by
   `node check-contract.js` and, in the browser, by `contract-check.html`
2. **Shell** — session runner, item chrome, Stage 1 (blind answer, confidence, triviality), the
   mismatch branch, close, event log, JSON export. **Built 2026-09-02** — `index.html` and `lib/`,
   checked by `acceptance/walkthrough.mjs`, which runs a full session in a browser and counts the
   gestures against `shell.md`'s ledger
3. **A — sequential.** The incumbent: `claims.md`'s gesture inventory costs MultipleChoice-4 at
   seven, which is A's number and nobody else's
4. **D — asymmetric.** Stem row from A, option block new
5. **B — survey.** D's option block with the stem row folded in. Built last because it is the
   generalisation, not the special case

---

## Data contract — not negotiable

**Source.** `corpus/session-corpus.json` only. Never `ethics-in-research.json`, never
`ethics-in-research-defects.json`. The session corpus is generated and deterministic:
`python3 scripts/build-session-corpus.py` reproduces it byte-for-byte (verified 2026-08-31).

**Projection.** Every reviewer-facing render goes through one `project(item)` built from
`presentationContract.blindProjection`. The page fetches the corpus, projects immediately, and
**discards the rest** — `isCorrect`, `incorrectFeedback`, `sourceLabel`, `optionPermutation`,
`defect`, `condition`, `knownCraftDefect` never enter the render path.

- The whitelist is a whitelist: a field added to the corpus later is withheld by default
- **Stage 2 reveals the key and only the key.** That reveal is designed
  (`review-experience.md` §Stage 2) and is the one thing the blind projection is widened by.
  Feedback is never shown at any stage — on a defective item it explains the *published* marking,
  so rendering it leaks the answer and exposes the plant
- **Ground truth is not loaded by the page.** `defect`, `countsAsCaught` and `optionRefs` are
  scoring data. Score after the session, offline, against the exported event log

**Order.** Options render in the array order the file gives them, under the `label` the file gives
them. No sort. No re-letter. `optionOrder: "meaningful"` items (`eir-009`) are already correct in
the file — the exemption was applied at build time and needs no runtime branch.

**The assertion, and why it is not a comment.** `review-experience.md` and `corpus/README.md` have
both been asking for this since 08-28:

> A prototype that reads `content` straight into a template destroys the experiment twice over —
> once by leaking the key, once by handing back the published order.

Ten lines, and left on in the shipped prototype rather than gated behind a dev flag:

```js
// throws if a projected object carries any field not on the whitelist
// throws if options.map(o => o.label) is not the sequence the file gave
```

---

## Claim sentences — copy exactly from `claims.md` §MultipleChoice

| Row | Sentence |
|---|---|
| Stem | This question is well-posed: nothing here is wrong, misleading, or ill-formed. |
| Key | *{key}* is incontrovertibly correct — not merely the strongest of these four. |
| Distractor | *{option}* is wrong — not merely weaker than *{key}*. |

The interpolated letters are **display labels**, never `sourceLabel`. *"Not merely weaker"* is
load-bearing copy, not filler — `claims.md` calls it the clearest example of why that document's
output is reviewer-facing prose. Do not paraphrase it to fit a column.

The stem row is **yes/comment**. The four option rows are **yes/no**. That asymmetry is the whole
reason D exists; a build that renders five identical rows has silently removed the variant.

---

## The surveyed block — flag first, then confirm **[settled 2026-08-31]**

Governs **B and D** both.

- The bulk control **attests the rows that have not been flagged**. It is not the entry move
- Its label is state-dependent: *all four hold* when nothing is flagged, *the rest hold* when
  something is. Render the naive version and log it as a known rough edge — **it is Phase 3's
  problem**, not a reason to prefer the other reading
- A bulk attestation is a real attestation. It is not a skip and does not block approval

---

## Instrumentation

Three facts, **stored separately** (`review-motion-fork.md` §What the instrumentation must record):

| Field | Value |
|---|---|
| `mode` | `"perPart"` \| `"bulk"` |
| `bulkAtRow` | Row index the bulk control was taken at; `null` under `perPart` |
| `flaggedBeforeBulk` | Boolean, plus the ids of the rows flagged. Distinguishes *surveyed and found nothing* from *skipped* |

**Timestamp everything anyway.** Phase 4 needs time-per-part and a millisecond stamp on each event
costs nothing to add now — it gives Phase 5 something to calibrate against and Phase 4 a format it
does not have to invent.

```json
{"t": 18432, "item": "eir-004", "variant": "A", "type": "confirm", "part": "option:C", "mode": "perPart"}
```

**The bulk/per-part marker is invisible to the reviewer during the session** and visible in the
record afterwards (`review-motion-fork.md`, `[proposed]`). Showing *confirmed in bulk* back to a
reviewer pushes them toward the per-part path, which is the contamination Phase 6 is avoiding.

**Output.** A JSON file downloaded at close — `phase2-<variant>-<iso8601>.json`. No backend, no
`localStorage`; a session that cannot be re-run from its own record is not instrumented.

---

## What this phase does not build

- **Keystroke grammar.** Phase 3. The bracketed keys in the wireframes are placeholders that make
  the gesture count legible. Wire clicks, plus one obvious key per control, and stop
- **Visual design.** Low fidelity by intent
- **The objection channel's prompt set.** Still unwritten. Show the channel; leave the prompts empty
- **Variant C, the counted escape hatch.** It contains both sides of the fork and cannot resolve one
- **Craft review, approval, re-review.** Different surfaces

---

## Acceptance checks

1. `python3 scripts/build-session-corpus.py` leaves `corpus/session-corpus.json` unchanged
2. **Leak check.** Search a Stage 1 DOM for the key's text and for any `incorrectFeedback`
   substring: zero hits. Repeat on Stage 2 for feedback only
3. **Order check.** `eir-011` renders **A** *Right to live* · **B** *Patent* · **C** *IPR* ·
   **D** *Copy rights*, key at **B** — `optionPermutation` `["4","1","3","2"]` against
   `sourceLabel`. The same three screens in A, B and D
4. **Gesture check.** One clean MultipleChoice item's **claim block** costs **5** gestures in A,
   **1** in B, **2** in D — the column the fork is decided on. Required totals are **9 · 5 · 6**,
   the difference being Stage 1's two plus one advance gesture per item screen, identical in all
   three. Count both by running one. A mismatch in the claim-block column means the build has
   drifted from the cost table the fork is decided on; a mismatch in the total means the shell has
   grown a gesture nobody named. A clean MultipleSelect-5 costs ***n* + 4** — nine, which equals A's
   total by arithmetic and not by structure. Do not reuse one count for the other
5. **Flag-then-confirm check.** In B and D, flag one row then take the bulk control: the record
   shows `mode: "bulk"`, `flaggedBeforeBulk: true`, and exactly one flagged row
6. **Mismatch branch.** Answering `eir-001` or `eir-008` against the key offers three responses,
   and branches two and three skip part attestation entirely. **MultipleChoice only** — the
   mismatch branch does not exist on MultipleSelect, where the option markings *are* the blind
   answer, so `eir-005` is not a test of it
7. **Channel check.** The item-scoped anchor is in the same position on every item, at both
   stages, in all three variants — and no per-part anchor exists on a MultipleChoice Stage 1 screen
8. **MultipleSelect check.** Per-option feedback anchors are absent while the set is being marked
   and present at the comparison step
9. **Advance check.** No screen advances on the gesture that completes its required set. Complete
   the claim block in B without touching the item-scoped anchor: the item does **not** end, and the
   anchor is still reachable. Same on the MultipleSelect comparison step after the stem claim
10. The export loads as JSON and carries one record per item in `ordering.sequence`

---

## Related

- [`../../docs/design/review-motion-fork.md`](../../docs/design/review-motion-fork.md) — the spec
- [`../../docs/design/review-experience.md`](../../docs/design/review-experience.md) — Stage 1,
  the mismatch branch, the presentation contract
- [`../../docs/design/claims.md`](../../docs/design/claims.md) — claim sentences, gesture inventory
- [`../../corpus/README.md`](../../corpus/README.md) — the corpus and what it withholds
