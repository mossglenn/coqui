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
| **Flow scope** | Stage 1 + Stage 2 on MultipleChoice. MultipleSelect stubbed — **see the cost below** |
| **Location** | This directory. Vanilla HTML/JS/CSS, no build step, no backend, no dependencies. `python3 -m http.server` from the repo root; the page fetches `../../corpus/session-corpus.json` |

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

### The MultipleSelect stub has two costs — reconsider before building

`ordering.sequence` opens on **`eir-002`, a MultipleSelect**, and the wrong-answer-key defect
**`eir-005` is a MultipleSelect** at position 12.

1. Stubbing position 1 opens the session on a placeholder and voids the `first-item-clean`
   ordering constraint — *a reviewer's first item calibrates them*
2. Stubbing `eir-005` leaves the run exercising **3 of 4 defect types**, and Phase 7's gate —
   *planted defects caught, < 3 of 4* — loses the denominator it was pre-registered against

**Recommendation: build MultipleSelect Stage 1.** It is the cheapest surface in the design. The
*n* option markings **are** the blind answer (`review-motion-fork.md` §Where the fork lives), so
there is no Stage 2, no claim block, no fork, no variant divergence: a checkbox list, a confidence
control, a close. It restores the first item and the fourth defect type for a fraction of one
variant's budget.

**If it is not built, restate the Phase 7 gate for this run before Phase 6 runs**, not after. A
denominator adjusted once the catches are known is the thing Phase 7 exists to prevent.

---

## Build order

1. **Fixture loader + presentation-contract assertion** — shared, and first, because everything
   downstream renders through it
2. **Shell** — session runner, item chrome, Stage 1 (blind answer, confidence, triviality), the
   mismatch branch, close, event log, JSON export
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
3. **Order check.** `eir-011` renders **A** *Right to live* · **B** *Patent* · **C** *IPR* · **D**
   *(source 2)* — `optionPermutation` `["4","1","3","2"]` against `sourceLabel`. The same three
   screens in A, B and D
4. **Gesture check.** One clean MultipleChoice item costs **7** gestures in A, **3** in B, **4** in
   D. Count them by running one. A mismatch means the build has drifted from the cost table the
   fork is decided on
5. **Flag-then-confirm check.** In B and D, flag one row then take the bulk control: the record
   shows `mode: "bulk"`, `flaggedBeforeBulk: true`, and exactly one flagged row
6. **Mismatch branch.** Answering `eir-005` or `eir-001` against the key offers three responses,
   and branches two and three skip part attestation entirely
7. The export loads as JSON and carries one record per item in `ordering.sequence`

---

## Related

- [`../../docs/design/review-motion-fork.md`](../../docs/design/review-motion-fork.md) — the spec
- [`../../docs/design/review-experience.md`](../../docs/design/review-experience.md) — Stage 1,
  the mismatch branch, the presentation contract
- [`../../docs/design/claims.md`](../../docs/design/claims.md) — claim sentences, gesture inventory
- [`../../corpus/README.md`](../../corpus/README.md) — the corpus and what it withholds
