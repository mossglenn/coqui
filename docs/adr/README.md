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
| 0009 | Attestation is per part and per review type | Accepted. Supersedes ADR-0004 decision 2 |
