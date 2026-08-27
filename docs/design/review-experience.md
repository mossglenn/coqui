# CoQui — The Review Experience (Track A)

Designed from the reviewer's experience outward. Builds on `process-model.md`. The parts, their
claim sentences and the budget derivation are in `parts-and-claims.md`.

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

Reviewing a four-option multiple-choice item is not one judgment. It is roughly eleven, spread
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
| TrueFalse | the statement · item |

Each is **unexamined**, **confirmed**, or **flagged** — per review type.

### The grid

For a four-option item: **twelve claims across eleven occupied cells**, growing by one content
claim per diagnostic-typed distractor. The full grid and its claim sentences are in
`parts-and-claims.md`.

**The atom is the claim, not the cell** — the item's craft cell carries both the cognitive-level
claim and cueing, and confirming one says nothing about the other.

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
Stem         — everything stated as fact is accurate    [confirm] [flag]
B  — key     — incontrovertibly correct                 [confirm] [flag]
A            — wrong, not merely weaker than B          [confirm] [flag]
C            — wrong, not merely weaker than B          [confirm] [flag]
D            — wrong, not merely weaker than B          [confirm] [flag]
```

Making the claim visible is the point. The reviewer is not asked "thoughts?" but whether a
specific stated claim is true. The wording does real work — *"is A incorrect?"* gets a yes when
A is merely worse; *"is A wrong, not merely weaker?"* forces the question of whether a
knowledgeable learner could argue for it.

Where a distractor's declared purpose is *diagnostic* — a claim that learners hold some
misconception — the reviewer also judges that empirical claim. **Structural purposes generate no
content cell**: there is nothing about "filler" or "difficulty tuning" for a domain expert to
contest.

**The reviewer sees the declared purpose before judging it.** Self-report is weak evidence;
contested self-report is strong.

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
| Item | Measures at the declared cognitive level |
| Item | Nothing cues the answer |

**Declarations and confirmations must not look alike.** The form mixes two acts with different
consequences: a *declaration* (a distractor's purpose, the cognitive level) creates durable
rationale that outlives the item; a *confirmation* creates a local attestation that a later edit
can invalidate. A checkbox that writes a permanent design record should not look like a checkbox
that clears a warning.

**Cross-item mode for distractors.** Repetition and filler patterns are invisible one item at a
time. Grouping distractors — ideally all for one objective together — is where a craft reviewer
sees that four items lean on the same misconception.

**Cueing is a craft judgment**, and it is item-level: it is a property of the stem against the
option set, so it anchors to no single part. A domain expert cannot detect it at all — answering
correctly, they cannot distinguish knowing the content from having been told it.

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

## Interaction budget

The full derivation is in `parts-and-claims.md`. In summary:

| Unit | Target | Ceiling |
|---|---|---|
| Clean 4-option MC, content review | 35 s | 45 s |
| Clean TrueFalse | 10 s | 15 s |
| Flagged item, one flag with a short comment | 90 s | 150 s |
| 12-item content assignment, ~25% flag rate | 16 min | 22 min |

**The real metric is overhead, not absolute time.** Roughly two thirds of an item's cost is
reading and domain recall that no interface compresses, so a budget in seconds mostly measures
the corpus. What the design controls is navigation, gesture cost, forced re-reading, and comment
composition:

> **interaction overhead = (total time − irreducible content time) ÷ irreducible content time**

Design requirements that follow:

- **Keyboard-first** — move, confirm, comment, suggest, toggle blocking, all without a mouse
- **Confirm-rest-of-item escape**, *counted*. If reviewers reach for it on most clean items, the per-part model is not being used and the surface is a comment box with ceremony. The attestation record distinguishes *confirmed in bulk* from *confirmed per part*
- **Persistent progress** — where you are, how much is left, how long it will take
- **Resumable** — five items in, laptop closed, return to item six

Composition is expensive; confirmation is cheap. Prose is reserved for real problems.

---

## Blind review — the principle **[settled]**

> **Hide what the reviewer can supply themselves; show what they would only be guessing at.**

Hiding the key works because a learner-like reading is what you want from any competent reader.
Hiding a distractor's declared purpose would ask the reviewer to reverse-engineer assessment
design intent, which is not their expertise. Showing it asks whether a claim about their domain
is true, which is.

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
> About **16 minutes**. — *Resume at item 6 of 12*

The estimate is an adoption lever, not decoration — it converts *"I'll get to this later"* into
*"I have sixteen minutes now."* It must be derived from the budget table above and must assume a
flag rate, since flags are unknowable in advance. **[proposed]** 25%, revised once real data
exists.

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
- Showing the key before the blind stage
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
- Three of the four roles rest on inference, not research
