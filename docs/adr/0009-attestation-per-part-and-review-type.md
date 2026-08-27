# ADR-0009: Attestation Is Per Part and Per Review Type

## Status
Accepted. Supersedes decision 2 of ADR-0004.

## Context

ADR-0004 established attestation per (part × lens), with four lens modes. Two findings have since changed the second axis.

**Phase 0 of the content-accuracy validation found the seven-judgments list was not a content-accuracy list.** It gathered every judgment an item needs across all four lenses under one heading — stem *clarity* belongs to a clarity surface, cognitive-level *alignment* to an alignment surface, and cueing to neither. Only four of the seven were content judgments, and a fifth was missing entirely: nobody had asked whether the stem's *factual premises* are true, as distinct from whether it reads clearly.

**Then the role model replaced the lens.** ADR-0006 found that every recurring error in the design was a role error, and ADR-0008 retired the lens as an organising concept.

The remaining question is what the second axis of the grid now is.

## Decision

**1. Attestation is per (part × review type).** Two review types: **content** and **craft**. What survives from ADR-0004 unchanged: attestation is per part, staleness is structural, attestation stays in CoQui, and the interaction budget is part of the decision.

**2. The grid is nearly dense, and its atom is the claim.**

For a four-option multiple-choice item: **twelve claims across eleven occupied cells** of a
6 × 2 grid.

| Part | Content review | Craft review |
|---|---|---|
| Stem | Everything stated as fact is accurate | Comprehensible; reading level fits the learner |
| Key | Incontrovertibly correct | **—** |
| Each distractor | Wrong — not merely weaker than the key | Serves its declared design purpose |
| Item | Unambiguous *(filled behaviourally)* | Measures at the declared cognitive level **·** Nothing cues the answer |
| *Each diagnostic distractor* | *Learners do hold this misconception* | — |

Two structural facts follow:

- **One cell is genuinely empty** — the key under craft review. A key's correctness is purely a
  domain question, and there is no construction judgment about it that is not already the
  cueing or purpose judgment elsewhere
- **One cell carries two claims** — the item under craft review holds both the cognitive-level
  claim and cueing. Confirming one says nothing about the other, so they must be separately
  attestable. **Attestation is therefore per claim; a cell may hold more than one**

> **Correction.** An earlier draft of this decision called the grid *sparse*. That was true of
> parts × **four lenses** — ten cells of twenty-four. It is not true of parts × **two review
> types**, and the word was carried across the model change without being rechecked. The
> practical consequence is that both reviewers touch nearly every part, so the total attention
> an item costs is higher than "sparse" implied: roughly 35 s of content review plus 20 s of
> craft review, across two people.

*"Unexamined"* and *"not applicable under this review type"* remain different states and must not
render alike — but that now matters for exactly one cell rather than half the grid.

**3. Some cells are filled by behaviour, not by gesture.** *Item — unambiguous* is not a question the reviewer answers. It is produced by the blind-answer stage: the reviewer answers the item before the key is revealed and marks their confidence. Correct-but-unsure is the ambiguity signal.

This is deliberate. Knowing the intended answer makes ambiguity invisible, so the judgment cannot be asked after the key is shown — and asking a reviewer to introspect about it is worse evidence than watching what they do.

**4. The diagnostic/structural split routes distractor purpose review.** A declared purpose makes up to two claims. *"This text would catch someone holding misconception X"* is a design claim — craft. *"Learners actually hold X"* is empirical — content. The *structural* purposes (difficulty tuning, filler, domain sampling) make no empirical claim, so they generate no content cell.

**5. Cueing is a craft judgment, at the item level.** It is a property of the stem against the option set, so it anchors to no single part. It is item-construction expertise. And a domain expert cannot detect it by introspection at all: answering correctly, they cannot distinguish knowing the content from having been told it.

## Consequences

**Positive**

- Every cell is a claim someone holding that role has the standing to judge
- Twelve claims rather than the twenty-four cells four lenses implied, and every one of them is a judgment somebody has standing to make
- The hardest judgment in item review — ambiguity — costs the reviewer one extra click and produces better evidence than a prompt would
- No hub schema change required, unchanged from ADR-0004

**Negative**

- **This is still the decision most likely to be wrong**, and less of it has been tested than when ADR-0004 said so. The reviewer may experience the grid as bureaucracy
- Conditional claims — diagnostic distractors generating an extra content claim — make the grid's size vary per item. Harder to estimate, harder to render consistently
- **Both reviewers touch nearly every part.** The role split does not reduce total judgments; it routes them to people qualified to make them. Twelve claims per item is more attention than the original seven-judgment model implied, not less
- A behaviourally-filled cell is not an attestation anyone made. Whether it should be attributed, and to whom, is unresolved

**Neutral**

- The interaction budget from ADR-0004 was already withdrawn and replaced during Phase 0 by a derived ~35 s target and an interaction-overhead ratio

## Validation plan

Unchanged in spirit from ADR-0004: build **content review** as a complete vertical slice first, and measure. The validation plan in `../design/content-accuracy-validation-plan.md` carries the phases and the pre-registered gate.

## Related

- ADR-0004 — decision 2 superseded here; decisions 1, 3, 4, 5 stand
- ADR-0006 — the roles that define the review types
- ADR-0008 — the predicate this grid specifies
- `../design/parts-and-claims.md` — the claim sentences
