# CoQui — Process Model (Track A)

Designed from the collaboration problem, not from infrastructure. See `design-premise.md` for why
that separation is enforced.

State ownership is in `../architecture.md`.

**[settled]** = decided. **[proposed]** = recommendation, open.

---

## Roles **[settled — ADR-0006]**

CoQui models **four roles**. Four roles does not mean four people — one identity may hold
several roles on the same item, and **CoQui does not gatekeep role assignment.** Who holds
which role is a project decision.

| Role | Acts | Expertise the role presumes |
|---|---|---|
| **Author** | Writes the item. **Declares** each distractor's purpose and the intended cognitive level | Instructional design |
| **Craft reviewer** | **Judges those declarations.** Comprehensibility, distractor design purpose, the cognitive-level claim, cueing | Assessment design |
| **Content reviewer** | **Judges truth.** Stem facts, key correctness, distractor wrongness, ambiguity, and the empirical half of a diagnostic purpose claim | The subject domain |
| **Stakeholder** | **Approves, or withholds approval.** Judges nothing | **None** |

**Editorial authority sits with the author. Approval authority sits with the stakeholder.**
Reviewers hold neither — they produce findings. Keeping these apart is what makes the decline
path coherent rather than insubordinate.

**"SME" still names the person and the problem.** The role is *content reviewer*; a
subject-matter expert is its usual holder. The SME review bottleneck keeps its name.

**Warrant is claimed by the assignment, never verified by the app.** An attestation records
*who attested in what capacity* — provenance, not competence.

## The problem being solved

"SME review bottleneck" names a symptom. The causes worth designing against:

1. **Reviewer latency** — review is never their top priority, so the ask must be small, scoped, time-boxed
2. **Unclear ask** — a reviewer who doesn't know what to look at either rubber-stamps or rewrites your prose
3. **Context reload** — every return trip re-reads the item, the objective, and the prior discussion cold
4. **Lost threads** — feedback scattered across email, documents, chat, with no resolution tracking
5. **Rework churn** — the author edits, the reviewer can't see what changed, so they re-review everything
6. **No decision record** — six months later nobody knows why the item says what it says, and someone "fixes" a deliberate choice

## Scope **[settled — ADR-0005]**

**Item authoring through approval.** Learning objectives are read-only context — displayed so
alignment can be judged, never edited here. Assessment blueprints and objective authoring are
out of scope.

**Multiple choice first.** A basic tool on multiple choice comes before more complex formats.

---

## Three lifecycles

### 1. Assignment — the envelope **[settled — ADR-0003, decision 5 superseded by ADR-0008]**

A scoped request for a reviewer's attention: a set of items, a **review type**, a reviewer, a
deadline.

```
Draft → Sent → In review → Returned
```

**Two review types, not four lenses.** *Content* and *craft*. The type names which role is
being asked, and therefore which cells of the coverage grid the assignment can fill.

**Single-pass by design.** Re-review is a *new, smaller* assignment auto-assembled from items
whose threads await confirmation.

**The envelope is not a unit of approval.** Approval happens per item, and by a different role
entirely. No convoy where eleven finished items wait on one disagreement.

**The review type focuses; it does not restrict.** A content reviewer who spots a craft problem
must be able to raise it, marked out-of-type.

### 2. Item

```
Drafting → Ready for review → In review → Revision needed → Eligible for approval → Approved
                                              ↕                      ↓
                                           Parked          Approval withheld
                                              ↓
                                    Retired / Superseded
```

- **In review** — carries which reviews are outstanding, not a position in a sequence
- **Revision needed** — returned with open blocking threads
- **Eligible for approval** — the predicate below is satisfied. **Computed and displayed, never asserted.** Nobody marks an item ready
- **Approval withheld** — the stakeholder rejected the record as a whole, with a stated reason. Distinct from *revision needed*, which comes from blocking threads
- **Parked** — genuine disagreement, or a question only a third party can settle. Exits the loop *carrying its open question* rather than being rejected

### 3. Thread

Every piece of reviewer feedback is a thread. A **suggestion** is a thread whose payload
includes replacement text — no separate mechanism.

```
Open → Answered → Resolved      (Reopened returns to Open)
```

**Severity, set by the reviewer at creation: blocking or non-blocking.** This is what makes the
loop terminate. A craft reviewer's blocking thread carries exactly the weight a content
reviewer's does.

| Resolution | Meaning |
|---|---|
| **Addressed** | Edit made in response |
| **Explained** | No edit — the author justified the current form and the reviewer accepted |
| **Deferred** | Valid concern, out of scope for this release |
| **Withdrawn** | The reviewer retracted it |

---

## Review order is unconstrained **[settled — ADR-0008]**

Craft review and content review may run in either order, or concurrently. Which order is right
depends on the content, and the tool has no way to know: for highly technical material,
establishing the facts first avoids polishing an item whose key is wrong; for routine material,
sending a badly built item to a scarce expert wastes the scarcest resource in the process.

**So "done" is a condition, not a position:**

> An item is **eligible for approval** when every part carries a **content attestation** from
> someone holding the content-reviewer role, and every part requiring one carries a **craft
> attestation** from someone holding the craft-reviewer role, and **no blocking thread is open.**

The coverage grid in `parts-and-claims.md` is the specification of that
predicate. A grid cell with no way to be filled is a gap; a review step filling no cell is
ceremony.

**Blocking threads gate approval, not phase transitions.** This is what lets craft review be a
peer act rather than a gate — no role holds authority over another's sequence.

## Coupling rules

1. An item cannot become **eligible for approval** while any *blocking* thread is unresolved
2. Non-blocking threads never gate eligibility; they stay visible, survive approval, and can outlive the item
3. **Resolution is proposed by the author and confirmed by the reviewer who raised it** — for blocking threads only. The author closes non-blocking threads unilaterally
4. **Approval attaches to a version.** A later edit invalidates *approval*, and invalidates attestations only on the parts it touched. Re-approval is a light confirm over still-valid review work — not a fresh review
5. The stakeholder cannot resolve a blocking thread, attest to a part, or approve an ineligible item

---

## The author's four moves

When a thread arrives, the author can:

- **Make the edit**
- **Decline, with reasoning** — *"that distractor is deliberately attractive; it's the documented misconception"*
- **Ask a clarifying question back**
- **Defer** — valid concern, out of scope for now

**The decline path is load-bearing.** If the only affordance is "make the change," the author
either complies against their judgment (the item gets worse) or silently ignores the comment
(the reviewer stops commenting carefully). It crosses to Armature as a design note.

**It now fires in two places, producing two kinds of rationale.** A decline against a *craft*
reviewer is a design disagreement between peers — why this construction. A decline against a
*content* reviewer is a designer defending a choice to a domain expert. Both are durable
rationale; they are not the same corpus.

## Reviewer editing rights **[settled]**

**Comment + suggest.** A reviewer may draft concrete replacement text; the author accepts or
declines each suggestion. The author remains author of record.

---

## Stages

**1–2 are ordered. 3 and 4 are not. 5 is last.**

1. **Author** — writes items against an objective shown as read-only context, and declares each distractor's purpose and the intended cognitive level
2. **Assemble** — scopes an assignment: items, review type, reviewer, deadline
3. **Craft review** — the declarations are judged, and cueing is checked
4. **Content review** — truth is judged. Blind answer first, then part attestation
5. **Approve** — the stakeholder accepts the record, or withholds with a reason

Running throughout:

- **Respond** — the author works each thread using the four moves
- **Re-review** — a new, smaller assignment carries changed items back with diffs
- **Park** — items with unresolvable questions exit carrying the question
- **Flag upstream** — see below
- **Revise** — approved items re-enter with a stated reason. A different process from initial authoring: it *starts* with a reason

**Cross-cutting: the decision record.** Threads, declines, and their reasoning persist after
approval. This falls out of the model rather than being bolted on.

### Flag upstream **[settled]**

Review nominally targets item quality but routinely surfaces defects *upstream*: a reviewer's
objection reveals the objective itself is ambiguous; three items for one objective draw the same
confusion.

**CoQui can flag that an upstream artifact needs review, carrying the evidence or a pointer to
it. CoQui cannot edit upstream artifacts.** This crosses to Armature as a design finding — a new
document pointing *at* the artifact, never modifying it.

---

## Mapping to Armature at the boundary

CoQui's item states are a workflow. Armature's `ItemStatus` has four values, deliberately
minimal, because a richer vocabulary would import one application's workflow into shared
infrastructure.

| CoQui state | Armature `AssessmentItem.status` |
|---|---|
| Drafting, Ready for review | `Draft` |
| In review, Revision needed, Eligible for approval | `InReview` |
| Approval withheld | `InReview` |
| Approved | `Approved` |
| Parked | `InReview` — with an open `DesignFinding` carrying the question |
| Retired / Superseded | `Retired` |

Thread states, severity, assignment state, **role assignments and the approval record** have no
hub equivalent and do not cross. Only the resulting item status does.

---

## Open questions

- **Unresponsive reviewer** — no escalation, timeout, or reassignment. This is the actual bottleneck and the model still has no answer for it
- **Concurrent reviews colliding** — a craft reviewer rewrites a stem while a content reviewer is mid-attestation on it. Structural staleness handles the data; the reviewer's experience of it is unspecified
- **Sequencing for a designer with no opinion about order.** With no pipeline, nothing suggests what to do first. A default is probably needed
- **May a stakeholder withhold on grounds nobody reviewed** — a policy or scheduling objection? "No qualification assumed" implies yes
- **Where role assignment lives** — project, assignment, or item level
- **Multiple reviewers of the same type on one item** — concurrent or sequential? What when two disagree with each other rather than with the author?
- **Notification model** — out of scope for the process, decisive for adoption
- **Evidence gap** — three of the four roles rest on inference, not research
