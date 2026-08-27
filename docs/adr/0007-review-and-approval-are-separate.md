# ADR-0007: Review and Approval Are Separate Acts

## Status
Accepted

## Context

The model held that approval authority sits with the SME and editorial authority with the ID. That separation is sound, but it conflated two things the SME does.

*"I checked this and here is what I found"* and *"I accept this and I am accountable for it"* are different speech acts. In practice the same person often performs both — which is exactly why the second becomes invisible, and why nobody notices when it never happened.

Making review terminal was tried and creates its own problem. A reviewer who knows their sign-off is effectively irreversible becomes **conservative**, withholding when uncertain. That stalls the pipeline as effectively as rubber-stamping and is harder to see, because it looks like diligence.

## Decision

**1. Review and approval are separate acts, performed by separate roles.**

Review produces findings: attestations, threads, and their severity. Approval accepts the resulting record.

**2. The stakeholder is always the approver** — including when the same identity also holds the content-reviewer role. The two hats stay distinct even on one head, because the second act is the one that disappears when they are merged.

**3. The approver is not assumed to have any qualification.** They hold the power to approve or not, and nothing else. They judge no part, attest to nothing, and cannot resolve a blocking thread.

**4. Approval is therefore an accountability act with no epistemic content.** Its consequence: the record must be complete before approval is offered at all. An approver cannot fill a gap, so a gap must never reach them. See ADR-0008.

**5. The approver has two moves.** Approve, or withhold approval with a stated reason. **[proposed]** The reason is required — for the same reason a declined change requires one, and because it is where the rationale for a rejection would otherwise be lost.

**6. Withholding approval is not a blocking thread.** A blocking thread is a concern about a part. Withheld approval rejects the record as a whole. It returns the item to the author carrying its reason, and it is a distinct item state.

**7. Approval is what is terminal — not review.** A later edit invalidates *approval*, and invalidates attestations only on the parts it touched. Re-approval after a targeted edit is a light confirm over still-valid review work, not a fresh review.

## Consequences

**Positive**

- Reviewers stop carrying accountability they did not sign up for, which removes the conservatism that terminal review induces
- Reviews become cheap and repeatable. Only one act in the process is expensive to reverse
- The attestation grid finally has a named audience: it is the approver's instrument. Reviewers fill cells; the approver reads them
- The distinction survives role collapse. Even one person doing everything is walked through two separate acts

**Negative**

- One more role to assign and one more surface to build
- **Rubber-stamping is the live risk.** A person who has just reviewed twelve items and is then handed an approval screen will click through it. The mitigation is that the approval surface must show what *other people* found and what the author declined — not replay the approver's own attestations
- Whether an approver may withhold on grounds nobody reviewed — a policy objection, a scheduling objection — is unspecified, and the "no qualification assumed" position implies they may

**Neutral**

- Where an author is also the stakeholder, self-approval is permitted, recorded, and marked. Consistent with ADR-0006

## Related

- ADR-0006 — the four roles
- ADR-0008 — the eligibility predicate that must hold before approval is offered
- ADR-0003 — the envelope was already not a unit of approval; this makes approval a separate act rather than a separate scope
