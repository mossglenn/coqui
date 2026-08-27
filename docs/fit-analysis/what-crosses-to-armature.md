# What Crosses to Armature

> **Answers:** *Of everything a review produces, what is worth putting in the graph — and when
> does it get written?*

Resolves: *what part of the review process is valuable to Armature?* Supersedes parts of `01-review-loop.md`.

> **Revised three times.** The first removed CoQui's operational needs from the hub. The second removed a proposed `Verification` type — presented here as settled, but with no user-originated justification. The third named the three records this document had been conflating, withdrew an argument from ADR precedent that reasoned across them, and added *when* data crosses to an account that had only covered *what* crosses. All three corrections came from direct challenge, not self-review.

---

## Which record this is about

Three records are easy to conflate, and a document that conflates them will ask the hub to store
the wrong one.

| | What it is | Where it lives |
|---|---|---|
| **CoQui's own design record** | Decisions about how the application should work — this repo's ADRs | Here. It never crosses. It is software design, not instructional design |
| **The design record CoQui produces** | Notes and findings made by designers *using* the tool, about items and objectives | Armature. This is what the hub exists for |
| **The crossing** | How the second becomes durable in the hub | *When it crosses*, below |

Everything past this point concerns the second and the third. The first appears only as a source
of precedent, and precedent drawn from it is weak: an ADR is written deliberately, by someone who
has already decided to document a decision. That is not a situation any designer using CoQui is
ever in.

---

## Three kinds of data

**Process exhaust** — edits, timestamps, thread churn, who clicked what. High volume, low semantic density. Operationally necessary; not design knowledge.

**Warrant** — evidence an artifact is trustworthy. Armature stores a weak form in its authorship field.

**Design rationale** — a decision plus its reasoning. What Armature exists for.

### The membership test

> Would a researcher studying design processes, or a designer inheriting this course in three years, need it?

Rationale passes. Exhaust fails. **Warrant turned out to be the hard case.**

---

## What Armature receives from a review process

**Typed outcomes carrying free-text rationale.** Prose alone cannot be asked questions nobody held
at capture time; a type alone cannot carry the reasoning that makes a decision interpretable
later. Both outcomes below have that shape, and both already had most of their machinery in the
schema.

**On the weakness this shape is usually charged with.** A capture strategy that waits for the
designer to *notice* they have made a decision records what was realised rather than what was
true — the most valuable patterns are invisible in the moment. **CoQui does not rely on
noticing.** It prompts at decision sites, and leans on the decline path in particular because that
is where a designer is motivated to explain themselves. The weakness is real; it is answered in
the plugin, not in the schema. See `../design/rationale-capture.md`.

Two things cross.

### 1. Decision — a design note, extended slightly **[proposed]**

Already exists. Three existing note categories already fit: assessment-strategy choice, Bloom's-level choice, alignment decision.

One extension: **what prompted it.** A note written unprompted and one written to defend a choice against expert challenge differ in epistemic weight — the second is elicited rather than volunteered, which matters for interpreting the corpus.

Marked *proposed*, not settled. By the standard applied to `Verification` below it has no field evidence either. It survives on a cost argument rather than an evidence argument: one optional field on an existing type is cheap, additive and reversible. That asymmetry should be stated rather than assumed.

The strongest fit found: the decline path is where designers are *motivated* to record rationale.

### 2. Design finding — the upstream channel **[proposed → Armature ADR-0020]**

CoQui can flag that an upstream artifact needs review, carrying the evidence or a pointer to it. CoQui cannot edit upstream artifacts.

Structurally parallel to a pattern Armature already implements:

```
LearningNeed  --NeedEvidenceLink(confidence)-->  LearningEvidence
   a documented gap                                grounded in evidence

DesignFinding --(confidence)-->  evidence or pointer
   a documented concern              from expert review
   about a design artifact
```

**`EvidenceMethod` already contains `ExpertReview`** — anticipated as an evidence-gathering method but scoped to needs analysis, never pointed at design artifacts.

**Why not a design note?** Different speech act. A note asserts a decision made; a finding raises a concern awaiting judgment. Collapsing them loses the difference between *"we decided this"* and *"someone thinks this is wrong."*

**One deliberate re-introduction of state.** A finding needs a minimal resolution status. *"Flagged by expert review and never addressed"* differs materially from *"flagged and revised."* That is design history, not workflow exhaust.

---

## When it crosses **[proposed]**

CoQui processes its own in-app data into a **commit** of changes to Armature. The framing does
work this document had left undone: it had described *what* crosses without ever saying *when*.

**It gives the boundary a unit.** *Prompt generously, store conservatively*, below, describes a
large local working set reduced to a small durable one — that reduction is the commit.
`../architecture.md` puts numbers on the same shape: a twelve-item assignment generating eighty
attestations and fifteen threads, producing three design notes and one finding. That ratio
describes a changeset, not a stream.

**It rules out the alternative.** Writing continuously would leak workflow state into the hub,
which ADR-0002 and the state division in `../architecture.md` reject outright. Without a commit
the boundary has no transaction, and Armature sees half-finished review states it has no
vocabulary for.

### Approval triggers the commit, for notes

Rationale about an item is not final until the item is, and approval is already the only terminal
act in the model (ADR-0007). Unapproved items therefore produce nothing in Armature — which is
correct rather than a gap.

### Findings do not wait

| Outcome | Crosses when |
|---|---|
| **Design note** — rationale for a decision about *this* item | The item is approved |
| **Design finding** — a concern about an *upstream* artifact | It is raised |

A finding says the objective is ambiguous. It is about a different artifact, it is useful
immediately, and the item that surfaced it may never be approved at all. Holding it until approval
serves nobody, and loses it entirely in the case where the item is retired instead.

The asymmetry is not a complication of the commit model. It follows from what each outcome is
*about*.

### The pull request is recorded, not adopted **[open — gated]**

A commit into shared infrastructure invites the next question: is it accepted, or proposed? A
proposal implies that someone reviews what a plugin writes, which is a governance model imported
into Armature.

**Its only support today is CoQui's design** — which is precisely what the triage rule at the end
of this document refuses:

> "Armature gap" should require citing either an Armature-internal symptom or a user-stated
> requirement. A finding whose only support is the application's design is a plugin concern until
> proven otherwise.

**What would unlock it:** an Armature-internal symptom — two tools writing conflicting notes about
one artifact, an established need to reject or revise a plugin's write — or a stated requirement
from someone who owns hub content. Absent one of those, a commit is accepted as written and this
stays a question.

*Recorded rather than proposed because the over-reach pattern below was caught three times by
direct challenge and zero times by self-review. This is the first instance caught before it was
put to Armature.*

---

## Considered and withdrawn: `Verification`

Previously presented here as one of three settled outcomes. It is not settled and should not be built.

**Where it came from:** the alignment lens in `../design/review-experience.md` — a Track A design decision, never a stated requirement. It entered the hub because CoQui's review model produced it.

**The narrow question:** disputes already have a home in a design finding. So `Verification` adds only the ability to record *"someone checked this and it was fine."*

**For:** the denominator argument — if only disputes are recorded, absence is ambiguous between "confirmed" and "nobody looked." Plus one research question: *how often do expert reviewers dispute designers' cognitive-level judgments?* A question about the field rather than individuals, so it survives the craft-data exclusion — but only just.

**Against:** item readiness may already encode it. Volume is high and mostly asserts "fine." And CoQui has not run, so there is no evidence.

**Decision: not now.** Revisit if alignment disputes prove common, or if designers repeatedly hit the ambiguity of not knowing whether something was examined.

---

## Process data vs. craft data

| | Process data | Craft data |
|---|---|---|
| Subject | the artifact | the practitioner |
| Unit | one course | many courses over time |
| Lifetime | the course's | a career's |
| Travels with | the graph, on export | the person |
| Consumer | future designers, researchers | the designer — and potentially their manager |

**Craft insight is a query, not a record.** Almost all of it is derivable from process data, which makes it a governance question: who may run it, over whose data, and who sees the result.

**The surveillance risk.** Once the graph can answer *"this designer's items averaged 2.3 revision rounds,"* a performance instrument exists whether or not anyone intended one. For a tool whose value rests on candour this is not minor — IDs decline fewer changes when declining looks defensive on a dashboard. **The instrument perturbs what it measures**, and what it perturbs is exactly the behaviour CoQui exists to produce.

### **[settled → Armature ADR-0021]** Craft data is out of scope

Armature holds data about designs, never about designers.

**Honest caveat:** a policy commitment, not a technical guarantee. Once records carry authorship, the craft query is computable by anyone with graph access. The only technical guarantee would be dropping attribution, which would destroy warrant value.

**The distinction to hold onto:** recording *who created an artifact* is provenance. Aggregating *what a person's records look like* is performance data. Same stored data, different query. The line is drawn at the query, and it has to be drawn socially because it cannot be drawn structurally.

---

## Prompt generously, store conservatively

The governing principle that resolves several apparent inconsistencies.

**Prompting is a plugin decision.** Cheap, reversible, and the way CoQui generates the structured signal Armature would need to formalize anything later. CoQui should prompt richly wherever a denominator would eventually matter.

**Storing is a schema decision.** Close to permanent, propagates to every tool, cannot be un-learned by other implementers.

Let CoQui capture generously in its own store, push only what proves durable, and let real usage decide what graduates. Progressive formalization with an explicit staging area.

*The architectural consequence — that CoQui therefore needs a substantial persistence layer of its own — is worked out in `../architecture.md`.*

---

## The over-reach pattern

Three times in one design conversation, a hub requirement was proposed that originated in CoQui's design rather than a stated need — attestation grids, thread state, `Verification`. Each was caught by direct challenge, none by self-review.

**The findings that survive scrutiny are grounded in Armature's own internal evidence.** They are places where Armature's specifications disagree with each other — not places where it lacks something conceptually.

**The triage needs a stronger default.** "Armature gap" should require citing either an Armature-internal symptom or a user-stated requirement. A finding whose only support is the application's design is a plugin concern until proven otherwise.
