# CoQui — Process Model (Track A)

Designed from the collaboration problem, not from infrastructure. See `design-premise.md` for why that separation is enforced.

State ownership is in `../architecture.md`.

**[settled]** = decided. **[proposed]** = recommendation, open.

---

## Actors

- **Instructional Designer (ID)** — authors items, owns instructional quality, is author of record
- **Subject Matter Expert (SME)** — reviews for correctness and credibility, has limited time and a competing day job

The ID initiates; the SME responds. **Approval authority sits with the SME. Editorial authority sits with the ID.** Keeping those separate is what makes the decline path coherent rather than insubordinate.

## The problem being solved

"SME review bottleneck" names a symptom. The causes worth designing against:

1. **SME latency** — review is never their top priority, so the ask must be small, scoped, time-boxed
2. **Unclear ask** — an SME who doesn't know what to look at either rubber-stamps or rewrites your prose
3. **Context reload** — every return trip re-reads the item, the objective, and the prior discussion cold
4. **Lost threads** — feedback scattered across email, documents, chat, with no resolution tracking
5. **Rework churn** — the ID edits, the SME can't see what changed, so they re-review everything
6. **No decision record** — six months later nobody knows why the item says what it says, and someone "fixes" a deliberate choice

## Scope **[settled — ADR-0005]**

**Item authoring through approval.** Learning objectives are read-only context — displayed so alignment can be judged, never edited here. Assessment blueprints and objective authoring are out of scope.

**Multiple choice first.** A basic tool on multiple choice comes before more complex formats.

---

## Three lifecycles

Keeping these distinct is what makes "iterate until approval" terminate on a condition rather than on goodwill.

### 1. Assignment — the envelope **[settled — ADR-0003]**

A scoped request for SME attention: a set of items, a **review lens**, a reviewer, a deadline.

```
Draft → Sent → In review → Returned
```

**Single-pass by design.** Re-review is a *new, smaller* assignment auto-assembled from items whose threads await confirmation. Keeps envelope state simple and makes the second ask visibly cheaper than the first.

**The envelope is not a unit of approval.** Approval happens per item — clean items approve immediately while contested ones iterate on their own clock. No convoy where eleven finished items wait on one disagreement.

**Lenses:** content accuracy · alignment · distractor quality · clarity. **The lens focuses, it does not restrict** — an SME assigned "clarity" who spots a factual error must be able to raise it, marked out-of-lens.

### 2. Item

```
Drafting → Ready → In review → Revision needed → Approved
                                    ↕
                                 Parked
                                    ↓
                          Retired / Superseded
```

- **Ready** — reviewable; may wait here before being placed in an assignment
- **Revision needed** — returned with open blocking threads
- **Parked** — genuine disagreement, or a question only a third party can settle. Exits the loop *carrying its open question* rather than being rejected

### 3. Thread

Every piece of SME feedback is a thread. A **suggestion** is a thread whose payload includes replacement text — no separate mechanism.

```
Open → Answered → Resolved      (Reopened returns to Open)
```

**Severity, set by the SME at creation: blocking or non-blocking.** This is what makes the loop terminate.

| Resolution | Meaning |
|---|---|
| **Addressed** | Edit made in response |
| **Explained** | No edit — the ID justified the current form and the SME accepted |
| **Deferred** | Valid concern, out of scope for this release |
| **Withdrawn** | The SME retracted it |

## Coupling rules

1. An item cannot reach **Approved** while any *blocking* thread is unresolved
2. Non-blocking threads never gate approval; they stay visible and can outlive the item
3. **Resolution is proposed by the ID and confirmed by the SME** — for blocking threads only. The ID closes non-blocking threads unilaterally. This asymmetry keeps SME load proportional to what actually matters
4. **Approval attaches to a version, not the item [proposed]** — a later edit produces an unapproved version with a visible diff, and re-approval is a light confirm rather than a fresh review. The alternatives — any edit reverts to draft, or the editor self-classifies the edit as cosmetic — are both worse. *CoQui-local:* Armature records only the resulting item status

---

## Mapping to Armature at the boundary

CoQui's seven item states are a workflow. Armature's `ItemStatus` has four values, deliberately minimal, because a richer vocabulary would import one application's workflow into shared infrastructure.

| CoQui state | Armature `AssessmentItem.status` |
|---|---|
| Drafting, Ready | `Draft` |
| In review, Revision needed | `InReview` |
| Approved | `Approved` |
| Parked | `InReview` — with an open `DesignFinding` carrying the question |
| Retired / Superseded | `Retired` |

Thread states, severity, and assignment state have **no** hub equivalent and do not cross.

---

## The ID's four moves

When a thread arrives, the ID can:

- **Make the edit**
- **Decline, with reasoning** — *"that distractor is deliberately attractive; it's the documented misconception"*
- **Ask a clarifying question back**
- **Defer** — valid concern, out of scope for now

**The decline path is load-bearing.** If the only affordance is "make the change," the ID either complies against their judgment (the item gets worse) or silently ignores the comment (the SME stops commenting carefully). Making refusal a first-class, visible move with a recorded reason is the highest-leverage single decision in this model — and it is where the durable design record comes from. It crosses to Armature as a design note.

## SME editing rights **[settled]**

**Comment + suggest.** The SME may draft concrete replacement text; the ID accepts or declines each suggestion. The ID remains author of record. This lets an expert express a fix precisely instead of describing it in prose, without handing over instructional control.

---

## Stages end to end

1. **Author** — ID drafts items against an objective shown as read-only context
2. **Assemble** — ID scopes an assignment: items, lens, reviewer, deadline
3. **Review** — SME opens threads as comments or suggestions, each with a severity
4. **Return** — assignment closes; items with no blocking threads become approvable immediately
5. **Respond** — ID works each thread using the four moves
6. **Re-review** — a new, smaller assignment carries changed items back with diffs; SME confirms or reopens
7. **Approve** — per item, once no blocking threads remain
8. **Park** — items with unresolvable questions exit carrying the question
9. **Flag upstream** — see below
10. **Revise** — approved items re-enter with a stated reason. A different process from initial authoring: it *starts* with a reason

**Cross-cutting: the decision record.** Threads, declines, and their reasoning persist after approval. A designer six months later needs to know why the item is the way it is. This falls out of the model rather than being bolted on.

### Stage 9 — Flag upstream **[settled]**

Review nominally targets item quality but routinely surfaces defects *upstream*: an SME's objection reveals the objective itself is ambiguous; three items for one objective draw the same confusion, which is evidence about the content domain rather than the items.

**CoQui can flag that an upstream artifact needs review, carrying the evidence or a pointer to it. CoQui cannot edit upstream artifacts.**

This crosses to Armature as a design finding — a new document pointing *at* the artifact, never modifying it. That is what makes cross-layer feedback safe: a tool scoped to item authoring raises concerns about objectives without holding write access to them.

It is also what gives an SME challenging an objective a graceful path instead of a wall.

---

## Open questions

- **Unresponsive SME** — no escalation, timeout, or reassignment. This is the actual bottleneck and the model still has no answer for it
- **Multiple SMEs on one item** — concurrent or sequential? What when two SMEs disagree with each other rather than with the ID?
- **Multiple IDs** — individual or team ownership?
- **Who judges "substantive"** for re-approval — self-classification is untrustworthy
- **Notification model** — out of scope for the process, decisive for adoption
- **Evidence gap** — the SME half rests on inference, not research
