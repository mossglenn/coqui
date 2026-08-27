# ADR-0010: The Grid Holds Affirmable Claims; Everything Else Is an Objection

## Status
Accepted. Refines ADR-0009 (what a cell is) and ADR-0008 (the last clause of the predicate).

## Context

The coverage grid was built as a list of things that must be true about an item before it can be
approved. Reviewing it surfaced three problems that looked unrelated and were not:

1. **The diagnostic-misconception cell.** Content review was asked to confirm *"learners do hold
   this misconception."* The learning research does not exist at that granularity in most domains,
   and what an experienced expert holds is strong anecdote. A confirm control there does not
   collect evidence; it manufactures it.
2. **Domain-visible cueing.** A stem asking *"which widget is best for…"* where only one option is
   actually a widget is answerable by category membership alone. Only a domain expert sees it —
   and no expert can attest that *nothing* cues an item.
3. **The messy objection that fits no cell.** Real item review is untidier than any grid implies,
   and the persistent unease about the grid was that it could not be complete.

Each is a judgment a reviewer can responsibly **raise** but not responsibly **certify**. Forcing
them into cells puts confirm-shaped controls in front of people who have no basis for confirming,
which is worse than their absence: it produces attestations that look like evidence.

## Decision

**1. The grid holds only affirmable claims.**

| | **Affirmable claim** | **Objection** |
|---|---|---|
| Shape | A cell in the grid | An open channel: any part, either role |
| Gate | Must be positively confirmed before approval | Blocks approval when raised; costs nothing when not |
| Bounded | Yes — finite, enumerable, fixed by item shape | No — unbounded by design |
| Test | Would a competent reviewer confirm this, and is their confirming it evidence? | — |

**2. Completeness is the objection channel's job, not the grid's.** The grid answers *what must be
affirmed*; the channel answers *what else is wrong*. Asking the grid to be exhaustive was a
category error, and the source of a persistent and correct unease about it.

**3. An unused channel must cost nothing.** If raising an objection is expensive, objections
migrate back into the cells as unexplained non-confirmations and the distinction collapses.

**4. The unlocalised objection is valid.** *"Something is off and I can't say what"* must be
fileable, blocking, and attached to nothing narrower than the item. A channel that demands a
category or a diagnosis discards the signal most worth having — an expert's unease about an item
they cannot fault in parts.

**5. An open channel still needs scaffolding, and scaffolding must not become a checklist.**
Openness is not neutrality: a channel with no guidance under-reports, because a reviewer who has
never been asked whether a stem gives away its answer does not think to look. But guidance narrows
attention as well as directing it. Three rules:

- **Prompts have no state.** Nothing records that a reviewer saw one; nothing is completed by
  reading one. State turns prompts into a checklist of things nobody can affirm
- **The list is never exhaustive and must not read as one.** A list that appears complete converts
  *"none of these"* into *"nothing wrong,"* closing the channel it was meant to open. An explicit
  unlisted option is not optional
- **Prompts are role-scoped.** Content and craft attend to different things

**6. Objections and attestations decay differently.** An attestation is invalidated by the next
edit to its part. An objection stands until it is resolved or withdrawn.

**7. Where each of the three founding problems now lives.**

| Problem | Resolution |
|---|---|
| "Learners hold this misconception" | The **author's** assertion, made by declaring a diagnostic purpose. Contestable in review, never confirmed. The grid row is deleted |
| Domain-visible cueing | A content **objection**. The craft claim narrows to *"nothing in the item's construction cues the answer"* |
| The messy leftover | The channel itself. This is what it is for |

## Consequences

**Positive**

- No confirm control stands in front of a reviewer who has no basis for confirming
- The grid's only conditional cell is gone, so its size is fixed by item shape and the ADR-0008
  predicate is cheaper to compute and to render
- Twice during its own derivation, the channel absorbed a problem that would otherwise have become
  a control — some evidence the distinction is carved correctly
- A reviewer with an inarticulate concern has somewhere to put it, which is the case current tools
  lose entirely

**Negative**

- **The channel is load-bearing and largely unspecified.** It was named once in passing before this
  ADR, while carrying a great deal of quiet weight. Its surface, its prompts and its resolution
  path are all still open
- **The unlocalised objection does not fit the thread model.** It cannot be routed to a part,
  cannot be cleared by a targeted edit, and cannot be confirmed resolved by inspecting a diff. The
  author's four moves assume a locatable claim
- Two mechanisms where there was one. A reviewer must understand the difference between confirming
  a claim and raising an objection, and the surface has to make that legible without teaching a
  vocabulary
- **The prompt set is untested.** Rule 5 constrains its form but not its content, and a badly
  chosen prompt list is the most likely way this decision fails in practice

**Neutral**

- No hub schema change. Objections are threads; ADR-0008's predicate already ends with *"and no
  blocking thread is open."*

## Validation plan

Phase 4 of `../design/content-accuracy-validation-plan.md` measures whether an unlocalised
objection is ever raised and what happens to it. If the channel is never used, either the surface
buries it or the grid is doing more than this ADR credits — both worth knowing.

## Related

- ADR-0008 — the eligibility predicate; objections enter through its last clause
- ADR-0009 — the grid this decision bounds
- `../design/claims.md` — the claims, and the three problems worked through
- `../design/process-model.md` — objections as threads
- `../design/review-experience.md` — the channel's surface
