# ADR-0009: Attestation Is Per Part and Per Review Type

## Status
Accepted. Supersedes decision 2 of ADR-0004.

**Amended (2026-08)** by the review of `../design/claims.md`. Decisions 1, 2, 4 and 5
have changed; decisions 6 and 7 are added. The amendment log is at the end of this document, and
the design document carries the full arguments.

## Context

ADR-0004 established attestation per (part × lens), with four lens modes. Two findings have since changed the second axis.

**Phase 0 of the content-accuracy validation found the seven-judgments list was not a content-accuracy list.** It gathered every judgment an item needs across all four lenses under one heading — stem *clarity* belongs to a clarity surface, cognitive-level *alignment* to an alignment surface, and cueing to neither. Only four of the seven were content judgments, and a fifth was missing entirely: nobody had asked whether the stem is **well-posed in the domain** — sound as a question to someone who knows the field — as distinct from whether it reads clearly to a learner.

**Then the role model replaced the lens.** ADR-0006 found that every recurring error in the design was a role error, and ADR-0008 retired the lens as an organising concept.

The remaining question is what the second axis of the grid now is.

## Decision

**1. Attestation is per (part × review type).** Two review types: **content** and **craft**. What survives from ADR-0004 unchanged: attestation is per part, staleness is structural, and attestation stays in CoQui. **Amended:** interaction cost is part of the decision, but it is counted as a **gesture inventory**, not in seconds — see decision 8.

**2. The grid is nearly dense, and its atom is the claim.**

For a four-option multiple-choice item: **twelve claims across eleven occupied cells** of a
5 × 2 grid.

| Part | Content review | Craft review |
|---|---|---|
| Stem | Well-posed in the domain | Comprehensible; reading level fits the learner |
| Key | Incontrovertibly correct | **—** |
| Each distractor | Wrong — not merely weaker than the key | Serves its declared design purpose |
| Item | Unambiguous *(filled behaviourally)* | Measures at the declared cognitive level **·** Nothing in the construction cues the answer |

Three structural facts follow:

- **One cell is genuinely empty** — the key under craft review. A key's correctness is purely a
  domain question, and there is no construction judgment about it that is not already the
  cueing or purpose judgment elsewhere
- **A cell holds one claim by default, and the item under craft review is the documented
  exception.** It carries both the cognitive-level claim and cueing; confirming one says nothing
  about the other, so they must be separately attestable. **Attestation is per claim, never per
  cell** — but the exception is the price of cueing's relational nature, not a general licence
- **The grid's size is fixed by item shape** — type and option count. Nothing in it depends on
  what the author declared

> **Correction.** An earlier draft of this decision called the grid *sparse*. That was true of
> parts × **four lenses** — ten cells of twenty-four. It is not true of parts × **two review
> types**, and the word was carried across the model change without being rechecked. The
> practical consequence is that both reviewers touch nearly every part, so the total attention
> an item costs is higher than "sparse" implied. *(The per-item second figures this correction
> once carried are withdrawn — see decision 8.)*

*"Unexamined"* and *"not applicable under this review type"* remain different states and must not
render alike — but that now matters for exactly one cell rather than half the grid.

**3. Some cells are filled by behaviour, not by gesture.** *Item — unambiguous* is not a question the reviewer answers. It is produced by the blind-answer stage: the reviewer answers the item before the key is revealed and marks their confidence. Correct-but-unsure is the ambiguity signal.

This is deliberate. Knowing the intended answer makes ambiguity invisible, so the judgment cannot be asked after the key is shown — and asking a reviewer to introspect about it is worse evidence than watching what they do.

The stage also carries an optional **triviality objection** — *"a learner could get this without
knowing the material"* — and its three facts (correctness, confidence, triviality) must be stored
separately, because the diagnostic value is in their combination. *Incorrect-and-trivial* is the
strongest reading the stage produces.

**4. The diagnostic/structural split marks which declarations are contestable.** A declared purpose makes up to two claims. *"This text would catch someone holding misconception X"* is a design claim — craft review confirms it. *"Learners actually hold X"* is empirical, and it is the **author's assertion**, made by declaring the purpose. It is not a content cell: nobody can responsibly attest that learners hold a given misconception, because the research does not exist at that granularity in most domains. Review contests it and never confirms it. The *structural* purposes (difficulty tuning, filler, domain sampling) assert nothing about learners, so there is nothing to contest.

*This supersedes the earlier form of decision 4, which routed the empirical claim to content review as a cell.*

**5. Cueing is a craft claim and a content objection, at the item level.** It is a property of the stem against the option set, so it anchors to no single part.

The **craft claim covers construction** — grammatical agreement, length and absolute-term
asymmetry, lexical echo, convergence — every form of which is visible without knowing the subject.
The claim is stated as *"nothing in the item's **construction** cues the answer,"* because that is
the limit of what a craft reviewer can speak to.

**Domain-visible cueing is an objection, not a cell.** A stem asking *"which widget is best for…"*
where only one option is actually a widget is answerable by category membership alone; only a
domain expert sees it, and nobody can certify that *nothing* cues.

*The earlier form of decision 5 claimed a domain expert "cannot detect it by introspection at
all." That argument bounds the instrument, not the role: a reviewer cannot tell from **answering**
whether they were cued, but can readily see a cue by **reading**. Note also that every part-level
claim is satisfiable while such an item is broken — asked whether a non-widget is wrong, the
reviewer correctly confirms — so no cell in either column can hold this.*

**6. Withholding the author's marking is the default.** Collect the reviewer's judgment before showing the author's marking. A strong default rather than an inviolable rule: break it only when the claim cannot be written without naming the author's answer, which is why MultipleChoice reveals the key after its blind stage and before its distractor claims. **The blind judgment need not have the same shape as the claim it precedes** — a cheaper proxy satisfies the default where collecting the claim itself blind would be too costly or unreliable.

Applying it: **TrueFalse and MultipleSelect are collected blind.** Their claims read *"true / false, as marked"* and *"correctly marked as correct / incorrect,"* revealing the author's answer for no reason beyond nobody having looked. Both are now collected unprimed at the same gesture count.

**7. The cognitive-level claim is collected in two steps.** Blind and required — *"does this item require more than recall?"* — then the declaration is revealed, then the claim is confirmed. A binary rather than a level, because inter-rater reliability on Bloom's classification is poor enough that blind six-way naming yields disagreements nobody can read: genuine defect and taxonomy fuzz are indistinguishable. The binary's work is inoculation, not classification.

**8. Interaction cost is a gesture inventory, not a time budget.** Each gesture is classed *recognition*, *production* (scaling with the size of the answer space) or *composition*. A gesture count is derivable from this specification; a time is a property of a person nobody has watched. **No new required gesture without naming what it buys.** Absolute time returns only as a Phase 4 measurement, compared against a baseline and against earlier revisions — never against a threshold.

## Consequences

**Positive**

- Every cell is a claim someone holding that role has the standing to judge — and, after ADR-0010, every cell is a claim someone can be asked to *affirm*
- Twelve claims rather than the twenty-four cells four lenses implied, and every one of them is a judgment somebody has standing to make
- The hardest judgment in item review — ambiguity — costs the reviewer one extra click and produces better evidence than a prompt would
- The grid's size no longer varies per item, which simplifies estimation, rendering, and ADR-0008's predicate
- No hub schema change required, unchanged from ADR-0004

**Negative**

- **This is still the decision most likely to be wrong**, and less of it has been tested than when ADR-0004 said so. The reviewer may experience the grid as bureaucracy
- **Both reviewers touch nearly every part.** The role split does not reduce total judgments; it routes them to people qualified to make them. Twelve claims per item is more attention than the original seven-judgment model implied, not less
- **By gesture count, craft review is now more expensive than content review**, reversing what the withdrawn time budget asserted. Decision 7 adds a required gesture, and decision 6 replaces agreement with decision on every MultipleSelect option
- **Two cells risk being ceremony**: the cognitive-level claim and construction cueing will both confirm on most items. Each carries a data test — if the mismatch or failure rate proves near zero in use, delete the cell
- A behaviourally-filled cell is not an attestation anyone made. Whether it should be attributed, and to whom, is unresolved

**Neutral**

- The interaction budget from ADR-0004 was withdrawn during Phase 0, replaced by a derived ~35 s target and an overhead ratio, and that replacement has since been withdrawn in turn

## Validation plan

Unchanged in spirit from ADR-0004: build **content review** as a complete vertical slice first, and measure. The validation plan in `../design/content-accuracy-validation-plan.md` carries the phases and the pre-registered gate — which now pre-registers direction and comparison rather than magnitude.

## Amendment log

**2026-08 — the `claims.md` review.** Twenty-three decisions, recorded in
`../journal/2026-08-claims-review.md`. What changed here:

| Decision | Change |
|---|---|
| 1 | Interaction budget clause redirected to the gesture inventory |
| 2 | Diagnostic-misconception row deleted; stem content claim reframed from fact-accuracy to well-posedness; craft cueing claim narrowed to construction; *"the atom is the claim"* restated as *one claim per cell by default, with one documented exception*; grid size now fixed by item shape |
| 3 | Triviality objection and the compound readings added; separate storage required |
| 4 | The empirical claim about learners is the author's assertion, not a content cell |
| 5 | Cueing narrowed to construction, plus a content objection for domain-visible forms; the introspection argument corrected |
| 6 | **Added** — withholding the author's marking is the default; TrueFalse and MultipleSelect collected blind |
| 7 | **Added** — the cognitive-level claim is collected in two steps |
| 8 | **Added** — gesture inventory replaces the time budget |

## Related

- ADR-0004 — decision 2 superseded here; decision 5 withdrawn; decisions 1, 3, 4 stand
- ADR-0006 — the roles that define the review types
- ADR-0008 — the predicate this grid specifies
- ADR-0010 — what the grid is allowed to hold, and where everything else goes
- `../design/claims.md` — the claim sentences
- `../journal/2026-08-claims-review.md` — the amendment's decision log
