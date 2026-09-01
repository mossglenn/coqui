# Content Review — Design and Validation Plan (Track A)

> **Answers:** *How does the content-review surface get built and tested, in what order, and what
> result would tell us the model is wrong?* Seven phases and a pre-registered decision gate.

The build-order decision in `review-experience.md` and the validation plan in ADR-0004 both
name content accuracy as the first vertical slice. Neither says how to run it. This does.

**Status: proposed.** Nothing here is settled. Phase 7's decision gate is still the part most
worth arguing with — and it has been rebuilt: the overhead thresholds it carried are withdrawn, on
the grounds that a measure can be useful for comparison while being useless for adjudication.

> **Track A discipline applies.** This document designs an interface and a test. What the
> infrastructure would have to do about the result is a Track B question and is deliberately
> absent. See `design-premise.md`.

**[settled]** = decided. **[proposed]** = recommendation, open.

---

## What this phase is for

ADR-0004 records its own top risk plainly: *"This is the decision most likely to be wrong.
A real SME may experience the grid as bureaucracy rather than clarity."* It also states the
remedy — test with a stopwatch before building the remaining review surfaces.

The per-part attestation grid is the highest-risk unvalidated assumption in CoQui's design,
it is coupled to the acknowledged evidence gap on the reviewer side, and it can be tested
without a stack, a store, an identity model, or any infrastructure decision at all.

**This plan exists to close ADR-0004 with a measurement instead of an assumption.**

---

## Two constraints that shape everything below

### Recruit the reviewer first, then source the items

The role under test is not "a credentialed SME." It is **someone with deep domain knowledge
who does not think about assessment design.** That describes a far larger population than
"subject-matter expert in a specific field," and it is available in any domain.

So the sequence is: find the person who will give you forty minutes, then source real items
in *their* field. Choosing a bank first and then hunting for a matching expert inverts the
scarce resource and turns a recruiting problem into a scheduling risk.

### Ground truth has to be manufactured

Testing against a real bank that is not your own means you do not know which items are
broken. Establishing that by review is expensive and you are not the domain expert.

The practical answer is to take clean real items and deliberately corrupt a subset. Real
reading load, known defects, controlled distribution.

---

## Phase 0 — Settle the parts inventory and check the budget arithmetic

*Half a day. No pixels.*

> **Complete — 2026-08-26.** Output: `claims.md`.
> The section below is preserved as the phase's **original framing**, in the lens vocabulary
> that was current when it was written. Several of its questions were answered differently
> than expected, and the answers retired the lens model in favour of roles — see ADR-0006 and
> ADR-0008. Read the output document for what was actually settled.

### The documents disagree about how many things a reviewer confirms

| Source | Count |
|---|---|
| The seven-judgments list in `review-experience.md` | **7** |
| The parts table (stem · key · each distractor · alignment), 4-option item | **6** |
| The interface sketch in `review-experience.md` | **4** rows |
| The prose interaction budget | "roughly 7 gestures" |

Four numbers for one screen. The grid cannot be drawn until its cells are enumerated.

### Two specific holes

**Cueing has no part to attach to.** Judgment 6 — *does anything in the stem cue the answer?*
— is a property of the stem **against the option set**. It cannot live on the stem alone (the
stem is unobjectionable in isolation) or on any single option. Resolve to one of:

- an item-level part, alongside the per-component parts
- folded into the key's claim
- dropped from the content-accuracy lens

**Judgment 7 duplicates the alignment lens.** *"Does this measure the objective at the
intended cognitive level"* is verbatim the alignment lens's single question. Per-(part × lens)
attestation makes these formally different cells, but nothing states what makes the
*content-accuracy* alignment claim a different claim. If it is the same question, the design
asks one expert the same thing twice under two lenses — which appears on its own anti-pattern
list in `review-experience.md`.

### Then check whether the interaction budget is arithmetically possible

A typical multiple-choice item runs 60–100 words across stem and options. Dense technical
content reads at roughly 200 wpm with comprehension. That is **18–30 seconds of reading before
a single judgment is made.**

The 15-second budget is not tight. It is below the reading floor.

This is worth an afternoon with a spreadsheet, because it probably means the budget needs
restating rather than testing. Candidates:

- *under 15 seconds after first read* — keeps the number, changes what it measures
- *under 40 seconds total for a clean item* — honest, and revises the 12-item estimate upward
- restructure the part sequence so the item is read once rather than six times

Which one is a design decision and it belongs here, not after a prototype has been built to
measure against a number arithmetic already rejects.

> **Phase 0 outcome, as amended:** none of the three. The 15-second budget was withdrawn — the
> arithmetic above is what killed it, and *an estimate too crude to set a target can still be
> sharp enough to falsify one.* The derived ~35 s target that replaced it has since been withdrawn
> too, along with the whole time budget: **interaction cost is counted in gestures, not seconds.**
> A gesture count is derivable from the specification; a time is a property of a person nobody has
> watched. Absolute time returns only as a Phase 4 measurement. See `claims.md`.

### Outputs

- A definitive **parts × claims table** for MultipleChoice, MultipleSelect and TrueFalse.
  Every cell states its falsifiable claim in one sentence, in the words the reviewer will see
- A **gesture inventory** per item type and review type, each gesture classed *recognition*,
  *production* or *composition* — including comment entry and severity marking, which the original
  estimate ignored. No time budget

> **Gate:** if the claim sentence cannot be written, the part is not real.

---

## Phase 1 — Assemble the corpus

*One to two days. Runs in parallel with Phase 0.*

Twelve real items in the recruited reviewer's domain. Published banks, certification prep
material, open courseware, textbook question sets.

**Eight clean, four corrupted.** Plant one defect per part type:

| Planted defect | What it tests |
|---|---|
| Wrong answer key | The mismatch branch — does the three-way question diagnose it correctly? |
| Ambiguous stem | The blind-answer stage — does it surface as a wrong answer, or as correct-but-unsure? |
| A distractor that is not actually wrong | The distractor rows — the judgments most likely to be skipped |
| A false premise in the stem | The stem row — the cell that was missing from the original list entirely |

> **Changed by the role model.** Plant **content** defects only. Cueing and craft failures are
> now craft-review judgments and should not reach a content reviewer at all — planting them
> would test a path the design says does not exist. One corpus item should carry a defect the
> reviewer is *wrong about*, if you can construct one, since the mismatch branch's whole purpose
> is distinguishing a broken item from a mistaken expert.

The ratio matters. An all-broken corpus measures the flag path and never tests whether
confirming is cheap — which is the thing under test.

**Keep the ground-truth sheet sealed** until the session is over.

### Status — assembled 2026-08-28, extended 2026-08-31

The corpus is in [`../../corpus/`](../../corpus/). **The clean-item gap is closed.**

| | Planned | Assembled 08-28 | Extended 08-31 |
|---|---|---|---|
| Items | 12 | 10 | 14 |
| Clean | 8 | 6 | 10 |
| Defective | 4 | 4 | 4 |
| **Clean MultipleChoice** | — | 2 | **6** |

Four clean MultipleChoice items (`eir-015`–`eir-018`) were taken from a second source, a TestLab
practice page on research ethics, and their stems, option sets, keys and rationale slices are
asserted against it. **[proposed]** Run twelve at 8/4 by benching two clean MultipleSelect items
rather than running all fourteen at 10/4.

Four defect types, one each: ambiguous stem (`eir-001`), wrong answer key (`eir-005`), false
premise in stem (`eir-008`), and a distractor that is not actually wrong (`eir-011`) — the last of
which is **not planted**. It was published that way, which gives the corpus the one property this
phase's own open question says a planted defect cannot have.

Three planted rather than four, because a fourth would put the session past one defective item in
two and the ratio warning above is the reason this phase specifies 8 and 4 rather than a pile of
broken items.

**Why the outstanding items were four MultipleChoice and not two of any type — 2026-08-31.**
Phase 2's fork is exercised only on clean MultipleChoice items and the pool held two, so the
requirement was a shape rather than a headcount. Four more take clean MC to six, the point at which
a bulk-confirm rate is a rate rather than an anecdote. **[proposed]** Bench two clean MultipleSelect
items and run twelve at 8/4, preserving this phase's ratio; the alternative is fourteen at 10/4,
which dilutes it. The cost of benching is that Phase 4's MultipleSelect-vs-MultipleChoice comparison
loses half its clean MultipleSelect side, and *which* two matters — `eir-013` and `eir-014` carry
the known valence cueing. Argued in [`review-motion-fork.md`](review-motion-fork.md) §What the
corpus can currently observe.

Also decided during assembly, and argued in `corpus/README.md`: four source items were excluded on
type or judgeability grounds, and seven published combination-key items — statements A–E with
subset options — were restated as genuine MultipleSelect, because `claims.md`'s distractor claim
cannot be written against a subset option.

---

## Phase 2 — Resolve the sequential/survey fork

*Two to three days. The actual design problem; everything else is downstream.*

Two fundamentally different interfaces are available, and the design documents have hedged
between them without naming the choice.

| | Sequential | Survey |
|---|---|---|
| Motion | Focus walks part to part | Whole item visible; mark exceptions |
| Gestures on a clean item | One per part | One |
| Forces every judgment | Yes | No |
| Cost | Full n× interaction | Near zero |

### The escape hatch is the survey model in disguise

`review-experience.md` lists a **confirm-rest-of-item** affordance. If reviewers reach for it
on most clean items, CoQui has shipped a single-comment-box interface with additional
ceremony — and the seven-judgments thesis is false in practice while appearing true in the UI.

**That is the most important thing this exercise can discover, and it is invisible unless the
escape is instrumented.**

Three ways to constrain it, with real trade-offs:

| Approach | Trade-off |
|---|---|
| **Frictionless** | Fast and honest about behaviour; abandons the thesis |
| **Gated on evidence of looking** (dwell, scroll-through, progressive reveal) | Preserves the thesis; risks feeling patronising, and dwell is a weak proxy for attention |
| **Available but counted** | No constraint, but usage becomes a first-class metric and the attestation record distinguishes *confirmed in bulk* from *confirmed per part* |

**[settled]** The third — as the design that **ships**. It is the only option that does not
require guessing the answer before the test, and it makes the grid's own reliability legible
rather than assumed.

**It is not what gets tested.** It contains both sides of the fork, and a design containing both
sides cannot resolve one. Worse, its escape rate is confounded with the escape control's own
salience — a bulk confirm on the primary row and one in a footer draw different rates from the
same reviewers holding the same beliefs, and the artifact would read as a finding about the
seven-judgments thesis. The fork resolves first, on variants that contain one side each; the
winner ships instrumented.

### Output — specified 2026-08-31

[`review-motion-fork.md`](review-motion-fork.md). Three low-fidelity variants, roughly two hours
each — **A sequential**, **B survey**, and **D asymmetric**, the stem sequential and the option
block surveyed. D is not in the fork as posed above: it follows from the gesture classes
`claims.md` already assigns the rows, where the stem is a yes/comment expecting composition and
the four option rows are yes/no recognitions. Not one design — this phase tests a fork, and a
single candidate cannot lose.

Two findings from specifying it reach back into earlier phases:

- **The fork is exercised only on clean MultipleChoice items, and the corpus holds two.**
  MultipleSelect's option markings *are* its blind answer and force every judgment already,
  TrueFalse has one part, and an answer mismatch skips part attestation. Phase 1's outstanding
  sourcing is therefore a shape requirement, not a headcount: **four clean MultipleChoice items**,
  taking clean MC from two to six
- **Phase 0's gesture arithmetic was off by one.** Content MultipleChoice-4 is seven required
  gestures, not six — the blind answer and the confidence mark are two gestures, which is exactly
  what makes TrueFalse cost 2 and MultipleSelect *n* + 2. Corrected in `claims.md` and propagated.
  **Superseded 2026-09-01**: the advance gesture takes content MultipleChoice-4 to nine and
  MultipleSelect to *n* + 4, and the fork is now decided on the claim block rather than the total

---

## Phase 3 — Keystroke grammar before visual design

*One day.*

Keyboard-first is a stated requirement, which makes the key map the interface and the visuals
a rendering of it. Design it as a state machine plus a printed key card.

Questions that must have answers:

- Does confirm advance focus or hold it?
- Is there an undo, and how far back does it reach?
- How is a comment opened without leaving the home row?
- How are blocking and non-blocking set in the same motion?
- How is an objection raised — including an **unlocalised** one, attached to nothing narrower than the item, carrying no category and no diagnosis?
- How is an out-of-type objection raised and routed?
- How are prompts shown without acquiring state and without reading as a checklist?
- How does a reviewer return to a part already passed?

**Test:** hand someone the key card and the paper prototype and call out items. If they are
still consulting the card at item three, the grammar is too large.

This is also where the gesture count becomes real, since comment entry and severity marking
are gestures the current estimate ignores.

---

## Phase 4 — Instrumented prototype

*Three to five days. Single HTML file, fixtures only, no backend.*

### Replace the stopwatch with instrumentation

ADR-0004 asks for a stopwatch. A stopwatch yields one number per item. What the design needs
is **time per part** — because the actionable finding is not *"items take 40 seconds"* but
*"the key row takes 2 seconds and each distractor takes 11."* That distinction tells you what
to redesign, and a stopwatch cannot see it.

Log every keystroke with millisecond timestamps. Capture:

- time to first gesture
- time per part
- gesture count per item
- escape-hatch invocations
- backtracks
- comment composition time
- total per item

**Exposure is between-subject — one variant per reviewer, full session each.** Amended
2026-09-01; this row read *alternate within-subject, six items each, order counterbalanced*, and
three variants across twelve items gives each one two clean MultipleChoice — the number Phase 2
sourced four items specifically to escape. See `review-motion-fork.md` §Exposure is
between-subject, which carries the cost of the change. With one reviewer per cell there is no
statistical power regardless, so design for **observation quality**, not significance.

### The baseline condition **[added by Phase 0]**

Before the instrumented run, present two or three items as **plain text with no interface** —
the reviewer presses one key when they have formed a judgment. This measures *irreducible
content time* for this corpus and this reader, which is the denominator the Phase 7 gate needs.

Use different items for the baseline than for the main run. Reading an item cold and then
meeting it again inside the interface gives it an unfair speed advantage, which would flatter
the design exactly where it is being measured.

**This baseline is now load-bearing beyond the overhead ratio.** It is the only non-invented
quantity anywhere near the budget, and following the withdrawal of the time budget it is the
**only source of timing figures in the whole design** — including the estimate the entry-point
card cannot currently show.

### What Phase 4 must also measure **[added by the 2026-08 claims review]**

- **Absolute overhead in seconds, reported beside the ratio.** A ratio is flattered by a hard
  corpus: 30 s of overhead reads as 150% on 20 s items and 50% on 60 s items — harder corpus, no
  design improvement, better score
- **The recall-binary mismatch rate** — the craft reviewer's blind *"does this require more than
  recall?"* against the author's declared level. Near-zero mismatch means the cognitive-level cell
  is ceremony and should be deleted
- **The construction-cueing failure rate** — same ceremony test, same consequence
- **The triviality rate** per assignment. The instance is a fact about the reviewer; the rate is a
  fact about the bank
- **MultipleSelect objection rate against MultipleChoice.** Blind option marking asks the reviewer
  to decide rather than agree on every option. If experts routinely differ on one in five, the type
  is structurally expensive to review — an item-type policy question, not an interface one
- **Gesture counts as executed**, against the inventory in `claims.md`. That inventory is
  derived from the specification; this is where it meets a person
- **Whether an unlocalised objection is ever raised**, and what happens to it

---

## Phase 5 — Calibration run

*Half a day. Yourself, plus one non-expert.*

Run the full protocol before spending the reviewer. Expect to find broken keybindings, an
off-by-one in the progress indicator, and at least one claim sentence that reads as gibberish
under time pressure.

> **Reviewer attention is the scarcest input in this project and it does not replenish.**
> Losing a session to a bug catchable in twenty minutes is the most expensive mistake
> available at this stage.

---

## Phase 6 — The reviewer session

*45 minutes. Detachable — schedule whenever the person is available.*

1. **No training.** Hand over the entry card. Needing instruction is itself the finding —
   `review-experience.md` promises productivity within two minutes with no training
2. **Item 1 think-aloud.** The timing on this item is lost; the mental model is gained
3. **Items 2–12 silent and instrumented.** Do not speak, do not help
4. **Three questions afterward**, in this order so as not to lead:
   - What were you being asked to do?
   - Where did it feel slow?
   - Did the per-part structure help you or get in your way?

The third is what ADR-0004 is really about. It is asked last, and open — never as *"did this
feel like bureaucracy?"*

### If no reviewer materialises

Run it with a domain-knowledgeable non-expert and mark the result explicitly as weaker
evidence. Weak evidence recorded honestly beats the current state, which is inference recorded
as design.

But a proxy result **does not close ADR-0004.** A proxy tests the mechanics. It cannot test
whether an expert experiences the grid as respect or as red tape, and that is the question the
ADR raises.

---

## Phase 7 — Pre-registered decision gate

*Write before Phase 6 runs. Non-negotiable.*

Any result will be rationalised if the gate is set afterward.

**The tension this phase has to survive.** Pre-registration wants a boundary committed in advance.
`claims.md` rules out inventing one: *a measure can be useful for comparison while being
useless for adjudication.* Both are right, and the resolution is that **direction and comparison
can be pre-registered; magnitude cannot.** The gate therefore pre-registers predictions and a
decision procedure, not thresholds.

| Signal | Pre-registered as | Consequence |
|---|---|---|
| Interaction overhead — *(total − baseline) ÷ baseline*, reported **with absolute seconds** | No threshold. Compared against the baseline, and against the next revision | Reported. The proceed/redesign call is made by a named person who records their reasoning **before** the next phase begins |
| Known content defects caught | **< 3 of 4** | The surface is not eliciting the judgments. The core claim fails |
| Escape-hatch rate on clean items | Directional: high enough that per-part attestation is not being used | The thesis is in trouble. No number is pre-set; the record distinguishes *confirmed in bulk* from *confirmed per part*, and that distribution is the finding |
| False flags on clean parts | Directional: elevated | The Phase 0 claim sentences are unclear — not the interaction design |
| **Comment on the stem claim, in B against A and D** | Directional: **under-represented in B, and what the stem draws migrates to the flag control or to the item-scoped anchor, losing the row it names** | B's missing composition moment is real. The survey model does not ship without a comment home separate from the flag control. Registered in `review-motion-fork.md` §The B composition prediction |
| Reviewer's own account | "got in my way" | Amend ADR-0004 regardless of the numbers |

**Why the defect count keeps a number and overhead does not.** *Three of four* is not a threshold on
a constructed scale; it is a count of whether the instrument did the one thing it exists to do.
Overhead has no such natural boundary and never will — *"is 62% acceptable?"* is a value judgment
wearing a number, and no quantity of data settles it.

**"Known", not "planted" — amended 2026-08-28.** The row counted *planted* defects until the corpus
was assembled and one of its four turned out not to need planting: `eir-011` was published with a
distractor that is not wrong, only broader. The count covers every defect the corpus is known to
carry, because the row beneath it depends on that — a reviewer who catches a real defect on an item
the ground-truth sheet calls clean would otherwise score as a false flag, and the diagnosis would
land on the claim sentences instead of on the corpus. Amended before Phase 6 runs, which is the
only condition under which this gate may move at all. See `../../corpus/README.md`.

**The withdrawn rows, recorded so the change stays visible:** the 40 / 75 / 100 per cent overhead
bands, and *"median clean-item time vs the 35 s target in `claims.md`."* That target no
longer exists.

**Every outcome amends ADR-0004, including a pass.** That ADR currently records *"the
15-second budget is an assumption, not a measurement."* That line should not survive this
phase in either direction.

---

## What this plan defers

Visual design, design tokens, the craft and approval surfaces, and any infrastructure commitment
all wait until the gate clears. Phase 4's fixtures describe what the interface needs to be
handed; turning that into a contract is Track B work and does not begin here.

Building infrastructure for a design that may not survive Phase 7 is the expensive version of
this mistake.

---

## Open questions

- **Who writes the claim sentences?** Phase 0 output is reviewer-facing copy, and its clarity
  is confounded with the interaction design in every Phase 6 metric. A bad sentence will read
  as a bad interface
- **One reviewer or two?** Two gives variance and doubles the recruiting problem. One gives
  depth and no way to distinguish a personal preference from a design property
- **Does the corrupted-item approach bias the result?** A planted defect is authored to be
  findable. A real defect survived its author's attention, which is why it is still there
- **What counts as detection?** *Answered by mechanism, 2026-08-28.* Every defect in the corpus
  carries a `countsAsCaught` sentence, written before Phase 6 rather than judged after it.
  Flagging the right part for the wrong reason counts only where that sentence says so — for the
  false premise in `eir-008` it explicitly does not, since the options are untouched. What stays
  open is whether the mechanism survives contact with a real transcript
- **Is the think-aloud item wasted or leveraged?** It costs one of twelve data points and it is
  the only window into the reviewer's model of what the screen is asking
- **The key never falls in option position 4.** *Answered by construction, 2026-08-31.* A
  set-level cue no single item shows: ten of ten MultipleChoice items across both source banks key
  to one of the first three slots. The prototype now presents options in a permuted order fixed at
  build time under declared constraints — every slot holds the key at least once — so no item is
  edited and `derivation: "verbatim"` is untouched. Order became a property of the presentation
  rather than of the item. See `review-experience.md` §The presentation contract. What stays open
  is the cost it exposed: three of the four defect records named options by position, and a
  ground-truth rule written positionally is wrong the moment presentation changes
- **Session ordering is now declared rather than incidental** — five constraints and a fixed seed,
  the sequence written into the answer key. **[proposed]**, because each constraint is an argument
  and none is a measurement: first item clean, no two defects adjacent, defects in both halves,
  the `eir-017`/`eir-018` near-twins separated, no two MultipleSelect adjacent

---

## Related

- ADR-0009 — attestation per part and per review type; this plan is its validation
- ADR-0006 — the roles, which changed what this plan is testing and what belongs in the corpus
- `review-experience.md` — the three surfaces, the interaction budget, the build order
- `claims.md` — the coverage grid and the derived budget
- `process-model.md` — the three lifecycles this interface sits inside
- `design-premise.md` — why this document contains no infrastructure content
