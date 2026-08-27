# ADR-0003: The Assignment Envelope Is Single-Pass and Is Not a Unit of Approval

## Status
Accepted. **Decision 5 superseded by ADR-0008** — the lens is retired as an organising
concept and replaced by two review types. Decisions 1–4 stand. The envelope now carries a
review type and a role rather than a lens.

## Context

SME time is the bottleneck. Review is never a subject expert's top priority, so what arrives in their queue must be small, scoped, and time-boxed — *"these 12 items, content accuracy only, by Thursday"* rather than *"here is the bank."*

That implies a container for a review request. Two questions follow, and getting either wrong produces a tool that quietly wastes weeks.

**What is the review unit?** Sending items individually means the SME receives a stream of small pings, defers them, and batches informally with no help from the tool — and can never notice that items 4 and 9 test nearly the same thing, because they arrived six days apart. Batching by objective makes spread judgments natural but blocks the whole batch when one item is unfinished.

**Is the container also the unit of approval?** Send twelve items, the SME comments on five, the designer fixes four and declines one. If the batch approves as a unit, seven clean items wait on one disagreement.

## Decision

**1. The review unit is an assignment** — an arbitrary set the designer assembles, with a review lens, a reviewer, and a deadline. This matches how SME time is actually negotiated and lets the ask be scoped to one kind of judgment.

**2. The assignment is an envelope, not a unit of approval.** Once opened, approval happens **per item**. Clean items are approved immediately; contested ones iterate on their own clock.

**3. Assignments are single-pass.** An assignment ends when the SME has made their pass. Re-review is a **new, smaller assignment**, auto-assembled from the items whose threads await confirmation.

**4. Objective grouping is a view, not a unit.** The SME can filter to "all items for objective X" while reviewing, without the objective's item set needing to be complete before anything can be sent.

**5. The lens focuses; it does not restrict.** An SME assigned "clarity" who spots a factual error must be able to raise it. Out-of-lens threads are allowed and marked as such.

## Consequences

**Positive**

- No convoy. Eleven finished items never wait on one contested item
- Envelope state stays trivial — four states, no bouncing, no accumulated history
- The second ask is visibly cheaper than the first, which matters when reviewer latency is the problem being solved
- The ask can be sized to the attention a reviewer actually has, rather than to how the content happens to be organised

**Negative**

- A third lifecycle to model, alongside items and threads
- Assignments accumulate. Nothing here says when a returned assignment may be archived
- An item can appear in several assignments over its life, so "what happened to this item" requires querying across them rather than reading one record
- Partial completion at a deadline is unhandled — an assignment 8-of-12 done has no defined behaviour

**Neutral**

- The lens is carried on the assignment rather than on the item, so the same item can be reviewed under different lenses by different experts

## Related

- `../design/process-model.md` — the three lifecycles and their coupling rules
- ADR-0004 — attestation, which is what makes per-item approval computable
