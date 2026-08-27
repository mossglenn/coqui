# ADR-0008: Approval Eligibility Is a Predicate, Not a Position in a Pipeline

## Status
Accepted. Supersedes decision 5 of ADR-0003.

**Amended (2026-08)** by the review of `../design/claims.md`. Decision 2's predicate now
quantifies over **claims** rather than parts; decision 3's grid no longer contains a conditional
cell; the lens map in decision 6 is corrected for the empirical distractor claim; and decision 7's
out-of-type channel is now the **objection channel** of ADR-0010, which is load-bearing rather than
an escape hatch.

## Context

A three-phase pipeline was drafted — author, then craft review, then content review, then approval. It did not survive contact with practice.

For highly technical content, establishing that the facts are right should come first; polishing an item whose key turns out to be wrong is wasted craft work. For routine content the opposite holds: sending a badly built item to a scarce domain expert wastes the scarcest resource in the process.

**Which order is right depends on the content, and the tool has no way to know.** Any fixed sequence is wrong for some material.

Meanwhile a fixed sequence forces a question that has no good answer: does the craft reviewer *gate* the transition to content review? If yes, a peer becomes a gatekeeper, which the role model explicitly rejects. If no, the phase boundary means nothing.

## Decision

**1. Review order is unconstrained.** Craft review and content review may run in either order, or concurrently. The designer assembling the work chooses; CoQui does not.

**2. "Done" is a condition, not a position.** An item is **eligible for approval** when:

> every **content claim** is attested by someone holding the content-reviewer role, **and** every **craft claim** is attested by someone holding the craft-reviewer role, **and** no blocking thread is open.

**Per claim, not per part or per cell.** One cell — the item under craft review — carries two
independent claims, and confirming one says nothing about the other. Objections enter through the
last clause: an objection is a blocking thread.

**3. The coverage grid is the specification of that predicate.** It defines which claims must be filled. A cell with no way to be filled is a gap in the design; a review step filling no cell is ceremony.

**The grid holds only what a reviewer can be asked to affirm** — see ADR-0010. It is not a list of every reason an item might be blocked, and it never was: completeness belongs to the objection channel. Since the conditional diagnostic cell was removed, the grid's size is fixed by item shape (type and option count) and does not vary with what the author declared, which makes the predicate cheaper to compute and to render.

**4. Blocking threads gate approval, not phase transitions.** This dissolves the gatekeeping question. A craft reviewer raises a blocking thread with exactly the weight a content reviewer's carries, the author answers it with the same four moves, and no role holds authority over another's phase.

**5. Eligibility is computed and displayed, never asserted.** No one marks an item ready for approval. The predicate is satisfied or it is not, and the item's state follows.

**6. The lens is retired as an organizing concept.** ADR-0003 decision 5 held that "the lens focuses; it does not restrict." Lenses organised by *kind of judgment*; the model now organises by *role*, because the recurring design error was always a role error. What remains is two **review types** — content and craft — carried on the assignment.

Where the four lenses went:

| Lens | Now |
|---|---|
| Content accuracy | Content review |
| Clarity | Content review — the blind-answer stage |
| Distractor quality | Design purpose → craft review. The empirical claim about learners is the **author's** assertion, contestable in content review but never a cell |
| Alignment | Craft review — the cognitive-level claim |

**7. Out-of-type observations remain allowed and marked**, unchanged in substance from ADR-0003 decision 5. A content reviewer who spots a craft problem must be able to raise it.

**This path is load-bearing, not an escape hatch.** Taxonomic cueing — a stem asking "which widget is best" where only one option is a widget — is visible only to a domain expert and has no content cell to live in, because nobody can certify the absence of cueing. It reaches the record as an out-of-type objection or not at all.

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
- The predicate is satisfiable while an item is still defective. Every part-level claim on a taxonomically cued item is correctly confirmable, because the defect is relational. Objections, not cells, are what catch this — which is why the last clause of the predicate carries more weight than it appears to

## Related

- ADR-0003 — decision 5 superseded here; decisions 1–4 stand
- ADR-0007 — approval as the single terminal act
- ADR-0009 — the grid this predicate quantifies over
- ADR-0010 — affirmable claims and objections; the last clause of this predicate
