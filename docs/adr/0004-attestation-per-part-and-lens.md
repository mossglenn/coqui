# ADR-0004: Attestation Is Per Part and Per Lens, and Stays in CoQui

## Status
Accepted. **Decision 2 superseded by ADR-0009** — the second axis is review type, not lens,
and the atom is the claim rather than the cell. **Decision 5 revised** — the 15-second budget was withdrawn during
Phase 0 and replaced by a derived target plus an interaction-overhead ratio. Decisions 1, 3
and 4 stand.

## Context

Reviewing a four-option multiple-choice item under a content-accuracy lens is not one judgment. It is seven: the stem's clarity, the key's correctness, each distractor's wrongness, whether anything cues the answer, and whether the item measures its objective at the intended level.

**When a tool presents one comment box per item, it implicitly asks for one judgment — so it receives one.** The other six never happen. The rubber-stamp failure mode is not reviewer laziness; it is an interface that asked a single vague question and got a single vague answer.

A second problem follows. When an item comes back edited, the reviewer must either re-read it whole — making every iteration cost a full review — or take on faith that only the flagged part changed. Neither is acceptable if the loop is to converge.

The obvious fix, having the editor classify their own edit as substantive or cosmetic, fails: that classification is exactly what cannot be trusted.

## Decision

**1. Attestation is per part.** A part is anything carrying an independently falsifiable claim — the stem, the key, each distractor, the alignment. Each is *unexamined*, *confirmed*, or *flagged*.

**2. Attestation is per (part × lens).** The same distractor carries different claims under different lenses: *"this is factually wrong"* under content accuracy, *"this is a plausible misconception rather than filler"* under distractor quality. Confirming one says nothing about the other.

This is not an added feature. It follows from per-part attestation plus distinct lens modes.

**3. Staleness is structural.** Editing a part resets attestations on **that part only**. Edit distractor C and the confirmations of A and B still stand.

This resolves the substantive-edit problem by dissolving it: nobody classifies the edit, the system tracks what was touched.

**4. Attestation stays in CoQui.** A hub-side verification type was proposed to Armature and withdrawn — it had no justification beyond CoQui's own review model, which is not sufficient grounds for a schema change. Armature records only the resulting item readiness. The attestation grid collapses to one of four status values at the boundary.

**5. The interaction budget is part of the decision.** Roughly 7 gestures per item and ~84 per assignment only survive if each is nearly free. **A clean item must take under 15 seconds** — keyboard-first, with an escape to confirm the rest of an item at once, persistent progress, and resumability.

## Consequences

**Positive**

- The interface asks for the judgments the item actually requires, rather than one undifferentiated impression
- Re-review is surgical. A 12-item second pass should close in under five minutes rather than repeating the first
- *"Is this item ready?"* becomes a legible grid — *content-verified by Dr. Chen at version 3; clarity-reviewed by nobody* — which is far more defensible than a checkmark
- No hub schema change required

**Negative**

- **This is the decision most likely to be wrong.** A real SME may experience the grid as bureaucracy rather than clarity. It must be tested with a stopwatch before the remaining lens modes are built
- Substantially more state than a comment thread, all of which CoQui must store (ADR-0002)
- The grid is meaningless without attribution, and identity is currently unimplemented on both sides
- If an artifact is edited in Armature by another tool, CoQui may never learn its attestations are stale

**Neutral**

- The 15-second budget is an assumption, not a measurement

## Validation plan

Build **content accuracy** as a complete vertical slice first — the most demanding mode and the highest value. If per-part attestation survives contact with a real SME there, the other three modes are variations on a proven pattern. If it does not, that has been learned for the price of one mode.

## Related

- `../design/review-experience.md` — the lens modes and interaction design
- ADR-0002 — CoQui's store, which this decision substantially motivates
