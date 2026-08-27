# CoQui — The Review Experience (Track A)

> **Answers:** *What does a reviewer actually see and do, screen by screen?* The three surfaces —
> content review, craft review, approval — plus the objection channel and the entry point.

Designed from the reviewer's experience outward. Builds on `process-model.md`. The claim sentences
themselves, and what they cost, are in `claims.md`.

> **Everything in this document is CoQui-local** unless explicitly marked as crossing to
> Armature. See `../architecture.md`.

**[settled]** = decided. **[proposed]** = recommendation, open.

---

## Scope **[settled — ADR-0005]**

**Multiple choice first.** MultipleChoice, MultipleSelect and TrueFalse are supported cleanly;
Matching, Ordering and FillInTheBlank are deliberately deferred. Objectives are read-only
context throughout.

---

## The governing claim

Reviewing a four-option multiple-choice item is not one judgment. It is twelve, spread
across two kinds of expertise.

**When a tool presents one comment box per item, it implicitly asks for one judgment — so it
receives one.** The rubber-stamp failure mode is not reviewer laziness; it is an interface that
asked a single vague question and got a single vague answer.

The shape of the review surface determines the depth of the review. Everything below follows.

**The correction that produced the current model:** the original seven-judgment list mixed
judgments belonging to different kinds of expertise under one heading, so the surface asked
domain experts for assessment-design judgments and designers for domain judgments. Sorting by
**who can actually judge** is what produced the role model in ADR-0006 — and every judgment now
sits with a role that presumes the expertise it needs.

---

## Attestation **[settled — ADR-0009]**

### Parts

A **part** carries an independently falsifiable claim:

| Item type | Parts |
|---|---|
| MultipleChoice | stem · key · each distractor · item |
| MultipleSelect | stem · each option · item |
| TrueFalse | the statement |

Each is **unexamined**, **confirmed**, or **flagged** — per review type.

### The grid

For a four-option item: **twelve claims across eleven occupied cells**. The grid's size is fixed
by item shape — type and option count — and does not vary with what the author declared. The full
grid and its claim sentences are in `claims.md`.

**A cell holds one claim by default.** The item's craft cell is the documented exception, carrying
both the cognitive-level claim and cueing, where confirming one says nothing about the other.
Attestation is per claim, never per cell.

**The grid holds only what a reviewer can be asked to affirm.** Everything else is an *objection*
— see below. Completeness is the objection channel's job, not the grid's.

One cell is genuinely empty: the key under craft review. *"Unexamined"* and *"not applicable"*
must not render alike, so that one gap needs its own treatment.

**Both reviewers touch nearly every part.** The role split routes judgments to people qualified
to make them; it does not reduce how many there are.

### Staleness is structural

Editing a part resets attestations on **that part only**, in both review types. Edit distractor
C and the confirmations of A and B still stand.

This resolves *"who decides whether an edit was substantive?"* — nobody does; you track what was
touched. It is also what makes the revise path affordable: a late edit to an approved item needs
targeted re-attestation, not a fresh review.

---

## Surface 1 — Content review

The most demanding surface and the first vertical slice. Two stages, because the judgments
require opposite epistemic states: ambiguity can only be judged *before* the key is known, and
correctness only *after*.

### Stage 1 — blind

The item renders as a learner encounters it. **The key is not shown.**

You cannot judge whether a stem is ambiguous once you know the intended answer — knowing it
makes the ambiguity invisible. So the reviewer **answers the item**, and marks their confidence:
*sure* or *unsure*.

**This is the highest-value mechanic in the tool.** It converts the hardest judgment in item
review into a behavioural signal that costs the reviewer one click. Correct-but-unsure is the
ambiguity finding, and nobody had to introspect about it. It aggregates: three of four reviewers
correct-but-unsure is far stronger evidence than anyone's stated opinion.

### The triviality affordance **[settled]**

Beside the confidence control, one optional affordance:

> **"A learner could get this without knowing the material."** — plus free text.

An objection, not a claim: nobody can be asked to affirm that an item is *not* trivial. Raising it
blocks; skipping it costs nothing and the rest of review proceeds either way. It is offered here,
at the blind moment, because the signal is perishable — *did I have to think?* is answerable for
about two seconds and contaminated afterwards.

The label is long on purpose. *"Too easy"* invites the reviewer to report their own expertise, and
an expert finds most items in their field easy; naming the learner forces a projection that partly
counteracts the blind spot.

**One trivial objection goes to the author only. The rate goes to the stakeholder.**
Expert-blind-spot noise is roughly constant per item and cancels in aggregate, so the rate across
an assignment or bank is the approval-relevant fact and the single instance is not.

### What the stage reads, compounded **[settled]**

Correctness (the system's fact), confidence and triviality (the reviewer's) are **stored as three
separate facts**. Collapsing them to pass/fail at capture destroys every reading below.

| Answer | Reviewer signal | Reads as |
|---|---|---|
| Correct | sure, nothing raised | Clean |
| Correct | unsure | **Ambiguity** — the founding signal |
| Correct | trivial | May not test what it claims; weak per item, meaningful as a rate |
| Incorrect | unsure | Ambiguity, more loudly |
| Incorrect | sure | The key or a distractor is contestable |
| Incorrect | **trivial** | **The strongest reading the stage produces** — likely miskeying, or an option set that misleads domain experts specifically |

Readings, not verdicts: any incorrect answer may simply be the reviewer erring, which is what the
mismatch branch is for.

### The mismatch branch **[settled]**

If the answer does not match the key, **reveal the key and ask which is right.**

> You chose **C**. The key is **B**.
> — *B is right, I was mistaken*
> — *C is right, the key is wrong*
> — *Both are defensible*

**A wrong answer does not mean the item is broken. It means the reviewer and the key disagree**,
and there are three causes: the item is wrong, the reviewer is wrong, or both readings hold. An
expert is an expert, not an oracle.

Branch one costs nothing and produces no thread — the reviewer corrects themselves and
continues to part attestation. Branches two and three produce a **blocking thread that arrives
already diagnosed**, carrying the reviewer's own answer as evidence, and skip part attestation:
there is no point certifying the parts of an item that is already going back.

An earlier design auto-opened a blocking thread on *any* mismatch. That assumed a mismatch meant
a broken item, and it manufactured threads out of expert fallibility — which lands on the author
as rework and teaches reviewers that their errors become someone else's problem.

### Stage 2 — revealed

The key is shown. Each part carries a stated claim, and the reviewer confirms or flags:

```
Stem         — well-posed: nothing wrong, misleading,
                 or ill-formed                          [confirm] [comment]
B  — key     — incontrovertibly correct, not merely
                 the strongest of these four            [confirm] [flag]
A            — wrong, not merely weaker than B          [confirm] [flag]
C            — wrong, not merely weaker than B          [confirm] [flag]
D            — wrong, not merely weaker than B          [confirm] [flag]
```

**The stem claim is yes/comment, not yes/no.** *Well-posed* is where a domain expert's holistic
read lands — accidental trick questions, absurd premises, a second defensible answer, phrasing
that misleads only someone who knows the field. Every fact in a stem can check out while the
question is broken, and fact-checking is the smallest thing an expert is for. Expect this cell to
draw more comment than a fact-check would, and count that as the point.

Making the claim visible is the point. The reviewer is not asked "thoughts?" but whether a
specific stated claim is true. The wording does real work — *"is A incorrect?"* gets a yes when
A is merely worse; *"is A wrong, not merely weaker?"* forces the question of whether a
knowledgeable learner could argue for it.

**The empirical claim about learners is not a content cell.** A diagnostic purpose asserts that
learners hold some misconception — but that assertion is the **author's**, made when they declared
the purpose. Nobody can responsibly attest that learners hold a given misconception; the research
does not exist at that granularity in most domains, and what an experienced expert holds is strong
anecdote. The reviewer may contest it and is never asked to confirm it. Structural purposes
("filler", "difficulty tuning") assert nothing about learners at all.

**The reviewer sees the declared purpose before judging it.** Self-report is weak evidence;
contested self-report is strong — and only the contesting half operates here.

### Close

One holistic judgment: *would you use this item?*, plus a difficulty read. This one benefits
from having seen everything, which is why it sits at the end — unlike ambiguity, which is
contaminated by exactly that.

---

## Surface 2 — Craft review

The craft reviewer judges what the author **declared**. A different mode of work from content
review: fewer items in view at once is wrong here, because several of the judgments are
comparative.

**Form-like, everything visible at once.** The craft reviewer is checking construction, not
verifying facts one at a time, and the judgments are quick.

| Part | Claim |
|---|---|
| Stem | Comprehensible; reading level fits the learner |
| Each distractor | Serves its declared design purpose |
| Item | Measures at the declared cognitive level *(two-step — below)* |
| Item | Nothing in the item's construction cues the answer |

**The cognitive-level claim is collected in two steps.** The declared level is not shown until the
reviewer has committed to something:

1. **Blind, required, one gesture** — *"Does this item require more than recall?"*
2. **Reveal** the declared level
3. **Confirm** — *this item measures at the declared cognitive level*

A binary rather than a level, because inter-rater reliability on Bloom's classification is poor
enough that blind six-way naming produces disagreements nobody can read — genuine defect and
taxonomy fuzz are indistinguishable. The binary's real work is inoculation: the reviewer has
committed before *Apply* appears. Required rather than optional, because an optional blind step is
skipped exactly when acquiescence is likeliest.

**This breaks the everything-visible-at-once rule for one cell**, which is the cost. The declared
level must stay hidden until step 1 completes.

**Declarations and confirmations must not look alike.** The form mixes two acts with different
consequences: a *declaration* (a distractor's purpose, the cognitive level) creates durable
rationale that outlives the item; a *confirmation* creates a local attestation that a later edit
can invalidate. A checkbox that writes a permanent design record should not look like a checkbox
that clears a warning.

**Cross-item mode for distractors.** Repetition and filler patterns are invisible one item at a
time. Grouping distractors — ideally all for one objective together — is where a craft reviewer
sees that four items lean on the same misconception.

**Cueing is a craft claim and a content objection.** It is item-level: a property of the stem
against the option set, anchoring to no single part. The craft claim covers **construction** —
grammatical agreement, length and absolute-term asymmetry, lexical echo, convergence — every form
of which is visible without knowing the subject.

What craft cannot see is **taxonomic cueing**: a stem asking *"which widget is best for…"* where
only one option is actually a widget. Invisible without domain knowledge, and no part-level claim
catches it, since a non-widget is correctly confirmed as wrong. It arrives from content review as
an **objection**, never as a cell — nobody can certify the absence of cueing.

The older argument that a domain expert cannot detect cueing *at all* conflated introspection with
inspection. They cannot tell from **answering** whether they were cued; they can readily see a cue
by **reading**.

**[proposed] Two narrow automated checks may pre-flag some of it.** Grammatical agreement
(a stem ending in "an" eliminating consonant-initial options) and absolute-term asymmetry
("always / never" in distractors but not the key) are computable with reasonable precision.
Length asymmetry and stem-key lexical overlap are computable but noisier. **Nothing about
meaning is computable** — not whether a distractor is wrong, not whether a stem is ambiguous,
not convergence cueing.

The design constraint is alarm fatigue: a check earns its place only if its false-positive rate
is low enough that dismissing feels like a decision rather than a reflex. So: ship the two
highest-precision checks, require a reason on every dismissal, and delete any check whose
dismissal rate shows it is noise. **The lint measures itself.** It is a convenience, never the
justification for cueing being a craft judgment.

---

## The objection channel **[settled]**

The grid holds affirmable claims. Everything else a reviewer needs to say is an **objection**:
open to either role, on any part or on the item as a whole, blocking when raised and costing
nothing when not. Completeness is this channel's job — the grid was never meant to enumerate every
reason an item might be blocked, and asking it to was a category error.

**An unused channel must cost nothing.** If raising an objection is expensive, objections migrate
back into the cells as unexplained non-confirmations and the split fails.

**The unlocalised objection is valid.** *"Something is off and I can't say what"* must be fileable,
blocking, and attached to nothing narrower than the item. A channel that demands a category or a
diagnosis discards the signal most worth having — an expert's unease about an item they cannot
fault in parts.

### Prompts, not a checklist **[proposed]**

Openness is not neutrality. A channel with no guidance under-reports, because a reviewer who has
never been asked whether a stem gives away its answer does not think to look. But guidance narrows
attention as well as directing it, and a prompt list that reads as complete converts *"none of
these"* into *"nothing wrong."*

- **Prompts have no state.** Nothing records that a reviewer saw one; nothing is completed by
  reading one. State turns prompts into a checklist of things nobody can affirm
- **The list is never exhaustive and must not look it.** An explicit unlisted option is not
  optional
- **Prompts are role-scoped.** Content and craft attend to different things

Candidate content prompts, to be tested rather than assumed: *does anything in the stem give away
the answer? · is there more than one defensible answer? · is anything here out of date? · is this
how the question would actually be asked in practice? · does something feel off that you can't
name?*

That last one does real work: it tells the reviewer the tool accepts inarticulate unease. Without
it, most people assume a diagnosis is required and file nothing.

**Unresolved.** An unlocalised objection cannot be routed to a part and cannot be cleared by a
targeted edit. Who resolves it, and how, is a `process-model.md` question.

---

## Surface 3 — Approval

**The grid's audience.** Reviewers fill cells; the stakeholder reads them. This is what
*"is this item ready?"* becomes once it stops being a single flag.

> **12 items.** Content-verified by Dr. Chen at version 3. Craft-reviewed by Priya.
> **Two changes declined**, with reasoning. **One non-blocking concern** outstanding.
> — *Approve* — *Withhold, with a reason*

**The approver judges nothing.** They hold the power to approve or not and no epistemic
authority at all — they cannot resolve a blocking thread, attest to a part, or approve an
ineligible item. The record must therefore be complete before they ever see it, because they
cannot fill a gap.

**Rubber-stamping is the live risk**, especially when one identity holds both the content
reviewer and stakeholder roles — as is common and legitimate. The mitigation: **the approval
surface shows what other people found and what the author declined**, not a replay of the
approver's own attestations. The act being performed is accepting the whole record, including
disagreements they were not party to.

Where one identity holds two roles, the record shows it. That is a fact displayed, not an error
raised.

---

## Interaction cost

Counted in gestures, not seconds. The time budget is withdrawn — the derivation is in
`claims.md`. **A gesture count is derivable from this specification; a time is a property
of a person nobody has watched.**

| | Required gestures | Production | Composition |
|---|---|---|---|
| Content, MultipleChoice-4 | 6 | 1 (4-space) | Expected on the stem claim; not required |
| Content, TrueFalse | 2 | 1 (2-space) | — |
| Content, MultipleSelect-*n* | *n* + 2 | *n* (2-space each) | Expected on the stem claim |
| Craft, MultipleChoice-4 | 7 | 1 (2-space) | — |

**Recognition** — shown a proposition, agree or disagree — is cheap. **Production** — generate the
judgment with nothing shown — scales with the size of the answer space. **Composition** is
expensive and unbounded. Optional gestures are excluded by definition, since an unused channel must
cost nothing.

> **No new required gesture without naming what it buys.**

Note that craft review is *more* gestures than content review, where the withdrawn budget claimed
it was cheaper in seconds. Both can hold: content's gestures carry domain recall that craft's do
not. Gesture counts deliberately omit what dominates the cost, which is exactly why they suit this
stage — they isolate what the design controls and do not pretend to measure the rest.

Absolute time returns as a Phase 4 measurement, compared against a baseline and against earlier
revisions of the design — never against a threshold. *A measure can be useful for comparison while
being useless for adjudication.*

Design requirements that follow:

- **Keyboard-first** — move, confirm, comment, suggest, toggle blocking, all without a mouse
- **Confirm-rest-of-item escape**, *counted*. If reviewers reach for it on most clean items, the per-part model is not being used and the surface is a comment box with ceremony. The attestation record distinguishes *confirmed in bulk* from *confirmed per part*
- **Persistent progress** — where you are, how much is left
- **Resumable** — five items in, laptop closed, return to item six

Composition is expensive; confirmation is cheap. Prose is reserved for real problems.

---

## Blind review — the principle **[settled]**

> **Hide what the reviewer can supply themselves; show what they would only be guessing at.**

Hiding the key works because a learner-like reading is what you want from any competent reader.
Hiding a distractor's declared purpose would ask the reviewer to reverse-engineer assessment
design intent, which is not their expertise. Showing it asks whether a claim about their domain
is true, which is.

**The sharper corollary:**

> **Collect the reviewer's judgment before showing the author's marking.**

A default carrying a lot of value, not an inviolable rule. Break it only when the claim cannot be
written without naming the author's answer — which is why MultipleChoice reveals the key after its
blind stage and before its distractor claims, and why *"A is wrong, not merely weaker than B"* is
allowed to name B. MultipleSelect and TrueFalse were breaking this default for no reason, in claim
wording rather than in process design: *"correctly marked as"* and *"as marked"*. Both are now
collected blind at the same gesture count.

**The blind judgment need not have the same shape as the claim it precedes.** Where collecting the
claim itself blind would be too costly or too unreliable, a cheaper *proxy* judgment satisfies the
default — the recall binary standing in for a six-way classification nobody performs reliably.
That is what keeps the default affordable rather than aspirational.

---

## Re-review

Shows only what changed and what awaits confirmation. Never the full item again.

Per thread: **what the reviewer said → what the author did.** An edit appears as an inline diff;
a decline appears as the author's stated reasoning. Two responses: accept or reopen.

**Unrequested edits are surfaced separately** — *"also changed, not in response to your
feedback"* — because prior attestations on those parts are now stale.

**Design budget: under 5 minutes for a 12-item assignment.** If a second pass costs anything
like the first, reviewers batch and stall, and the loop stops converging.

---

## Entry point

Not a dashboard. One card:

> **Amos** asked you to check **12 items** for **content** by **Thursday**.
> — *Resume at item 6 of 12*

**The time estimate is deferred, not designed away. [deferred]** An estimate is a real adoption
lever: it converts *"I'll get to this later"* into *"I have sixteen minutes now."* But the budget
it was derived from is withdrawn, and the "about 35 minutes" that once stood here was one of three
mutually unreachable figures in the design. **No number goes on this card until Phase 4 measures
one.** An invented estimate is worse than none — it is the first thing a reviewer can catch the
tool being wrong about, on the surface whose whole job is earning their trust in two minutes.

**A first-time reviewer should be productive within two minutes, with no training and no
configuration.** They did not ask for a new tool.

---

## The author's side

A triage queue of threads, grouped by item, blocking first, from both review types. Four moves:
edit · decline with reasoning · ask back · defer.

**Accepting suggestions can be bulk; declining is always individual and always requires a
reason.** Making changes should be cheap; refusing should require thought — and it is where the
durable design record comes from.

---

## Anti-patterns

- Comment boxes with no anchor — *"on the third one, the second option is iffy"*
- A dashboard as the entry point
- Showing the key before the blind stage — or, generally, showing the author's marking before collecting the reviewer's judgment on it
- A confirm control on something nobody can affirm
- A prompt list that reads as exhaustive, which closes the channel it was meant to open
- Auto-opening a thread on any answer mismatch, without asking who was wrong
- Asking a domain expert for an assessment-design judgment, or a designer for a domain judgment
- An approval surface that replays the approver's own review
- Requiring a reviewer to close threads they no longer care about
- Configuration before a first-time reviewer can contribute
- Notifications that are not a specific, scoped, time-boxed ask

---

## Risks and open questions

**Build order.** Content review as a complete vertical slice first — the most demanding surface
and the highest value. If per-part attestation survives contact with a real reviewer there, the
craft surface is a simpler variation on a proven pattern. The validation plan and its
pre-registered gate are in `content-accuracy-validation-plan.md`.

- **Does a self-corrected reviewer continue to part attestation?** The design says yes. Against: they just erred in this exact domain. For: they have just been calibrated, and those are separate claims
- **Does the confidence toggle cost more than it earns?** One click on every item, forever, to catch a signal that may be rare
- **What happens on the second mismatch in one assignment?** Systematic disagreement with the key is a finding about the objective or the reviewer, not about five separate items
- **A behaviourally-filled cell is not an attestation anyone made.** Whether *item — unambiguous* should be attributed, and to whom, is unresolved
- Attributed or anonymous attestation? Note the constraint from Armature ADR-0021 — attribution is provenance, never performance data
- Do attestations expire by time, not only by edit?
- **Does the cognitive-level cell survive its own ceremony test?** If the recall-binary mismatch rate proves near zero in use, the cell is ceremony and should be deleted. Same test applies to the construction-cueing cell
- **Who resolves an unlocalised objection?** It cannot be routed to a part or cleared by a targeted edit, so the thread model may not fit it
- **Does MultipleSelect generate objections at several times MultipleChoice's rate?** Blind marking asks the reviewer to decide rather than agree on every option. If experts routinely differ on one option in five, the type is structurally expensive to review — an item-type policy question, measured in Phase 4
- Three of the four roles rest on inference, not research
