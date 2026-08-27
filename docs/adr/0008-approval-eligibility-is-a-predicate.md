# ADR-0008: Approval Eligibility Is a Predicate, Not a Position in a Pipeline

## Status
Accepted. Supersedes decision 5 of ADR-0003.

## Context

A three-phase pipeline was drafted — author, then craft review, then content review, then approval. It did not survive contact with practice.

For highly technical content, establishing that the facts are right should come first; polishing an item whose key turns out to be wrong is wasted craft work. For routine content the opposite holds: sending a badly built item to a scarce domain expert wastes the scarcest resource in the process.

**Which order is right depends on the content, and the tool has no way to know.** Any fixed sequence is wrong for some material.

Meanwhile a fixed sequence forces a question that has no good answer: does the craft reviewer *gate* the transition to content review? If yes, a peer becomes a gatekeeper, which the role model explicitly rejects. If no, the phase boundary means nothing.

## Decision

**1. Review order is unconstrained.** Craft review and content review may run in either order, or concurrently. The designer assembling the work chooses; CoQui does not.

**2. "Done" is a condition, not a position.** An item is **eligible for approval** when:

> every part carries a **content attestation** recorded by someone holding the content-reviewer role, **and** every part requiring one carries a **craft attestation** recorded by someone holding the craft-reviewer role, **and** no blocking thread is open.

**3. The coverage grid is the specification of that predicate.** It defines which (part × review type) cells must be filled. A cell with no way to be filled is a gap in the design; a review step filling no cell is ceremony.

**4. Blocking threads gate approval, not phase transitions.** This dissolves the gatekeeping question. A craft reviewer raises a blocking thread with exactly the weight a content reviewer's carries, the author answers it with the same four moves, and no role holds authority over another's phase.

**5. Eligibility is computed and displayed, never asserted.** No one marks an item ready for approval. The predicate is satisfied or it is not, and the item's state follows.

**6. The lens is retired as an organizing concept.** ADR-0003 decision 5 held that "the lens focuses; it does not restrict." Lenses organised by *kind of judgment*; the model now organises by *role*, because the recurring design error was always a role error. What remains is two **review types** — content and craft — carried on the assignment.

Where the four lenses went:

| Lens | Now |
|---|---|
| Content accuracy | Content review |
| Clarity | Content review — the blind-answer stage |
| Distractor quality | Splits: design purpose → craft review; the empirical claim → content review |
| Alignment | Craft review — the cognitive-level claim |

**7. Out-of-type observations remain allowed and marked**, unchanged in substance from ADR-0003 decision 5. A content reviewer who spots a craft problem must be able to raise it.

## Consequences

**Positive**

- Order matches the material rather than the tool's assumptions
- The gatekeeping question disappears rather than being answered badly
- The predicate is machine-checkable, so eligibility is never a matter of opinion
- Two review types instead of four lens modes is materially less to build, and the two that remain are distinguished by *who can judge* rather than by *what to look at*

**Negative**

- "What happened to this item" now requires reading an unordered set of reviews rather than walking a sequence. Harder to render, harder to explain
- Concurrent reviews can collide — a craft reviewer rewrites a stem while a content reviewer is mid-attestation on it. Structural staleness handles the data; the reviewer experience of it is unspecified
- Without a pipeline, nothing sequences the work for a designer who has no opinion about order. A default suggestion is probably needed and is not specified here

**Neutral**

- Not every part carries a claim under both review types — a key has no craft claim. The predicate quantifies only over the claims the grid defines, not over every part × type pairing

## Related

- ADR-0003 — decision 5 superseded here; decisions 1–4 stand
- ADR-0007 — approval as the single terminal act
- ADR-0009 — the grid this predicate quantifies over
