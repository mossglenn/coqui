# Architecture Decision Records

Decisions about CoQui itself. Decisions about the Armature schema live in the Armature repository.

ADRs are numbered sequentially and never deleted. Superseded decisions are marked with a "Superseded by ADR-XXXX" status.

## Format

Each ADR follows the Nygard format:

```markdown
# ADR-XXXX: Title

## Status

[Proposed | Accepted | Deprecated | Superseded by ADR-XXXX]

## Context

What situation or problem motivated this decision?

## Decision

What was decided?

## Consequences

What are the results — positive, negative, and neutral?
```

## ADRs are immutable **[convention, from 2026-08]**

An ADR records a decision **at the moment it was taken**. It is not a current-state reference —
the specifications in `../design/` are. This matters because an ADR that is kept current stops
being a record of anything: you can no longer tell what was believed when the decision was made,
which is the only thing an ADR is for.

**So, going forward:**

- A decision that changes is **superseded**, in whole or in part, by a later ADR. The old one gets
  a Status line naming its successor and is otherwise left alone
- The **Status** field, the supersession note, and typo fixes are the only in-place edits
- Current truth lives in the specs. When they disagree, the spec is right and the ADR is history

**ADR-0009's 2026-08 amendment predates this convention** and was applied in place, with an
amendment log. It is the last one that will be. Anything that changes those decisions again gets a
new number.

## Index

| ADR | Subject | Status |
|---|---|---|
| 0001 | Two-track design method | Accepted |
| 0002 | CoQui owns its own persistence layer | Accepted |
| 0003 | Assignment envelope is single-pass and is not a unit of approval | Accepted. Decision 5 superseded by 0008 |
| 0004 | Attestation is per part and per lens, and stays in CoQui | Accepted. Decision 2 superseded by 0009 |
| 0005 | Scope: items only, multiple choice first | Accepted |
| 0006 | Four roles, assigned by people and not enforced by the app | Accepted |
| 0007 | Review and approval are separate acts | Accepted |
| 0008 | Approval eligibility is a predicate, not a pipeline position | Accepted. Supersedes ADR-0003 decision 5 |
| 0009 | Attestation is per part and per review type | Accepted. Supersedes ADR-0004 decision 2. **Amended 2026-08** — decisions 1, 2, 4, 5 changed; 6, 7, 8 added |
| 0010 | The grid holds affirmable claims; everything else is an objection | Accepted. Refines 0009 and 0008 |
