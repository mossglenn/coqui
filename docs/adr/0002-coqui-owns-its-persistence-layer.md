# ADR-0002: CoQui Owns Its Own Persistence Layer

## Status
Accepted

## Context

Fit Analysis 01 triaged each piece of CoQui's state as either hub-durable or plugin-local. The individual calls were made separately and each was defensible on its own. Collected, they amount to something nobody decided directly.

Assigned to CoQui: assignments, threads and their resolution states, per-part attestations, staleness computation, in-flight suggestions, diff and re-review state, queue position, time estimates, and draft rationale before it is committed.

None of this reaches Armature. All of it must survive a browser refresh, a reviewer closing their laptop mid-assignment, and a week between the first review pass and the second.

Two governing arguments produced this split:

**The membership test.** Would a researcher studying design processes, or a designer inheriting this course in three years, need it? Review discourse fails; review outcomes pass.

**Prompt generously, store conservatively.** Prompting is a plugin decision — cheap, reversible, and the way CoQui generates structured signal. Storing is a schema decision — close to permanent, propagating to every tool on the platform, and impossible to un-learn by other implementers.

## Decision

**CoQui maintains its own persistent store.** It is not a thin client over the Armature API.

**Armature holds:** the item bank, objectives and containers as read-only context, item readiness, placement clearance, coverage, design notes, design findings, and user identity.

**CoQui holds:** everything in the Context above.

**Only outcomes cross.** A twelve-item assignment might generate eighty attestations and fifteen threads, and push three design notes and one finding. That ratio is correct — exhaust stays local, outcomes cross.

**CoQui reaches Armature only through the Armature API.** It never accesses the graph store directly.

## Consequences

**Positive**

- Review discourse does not pollute shared infrastructure with one application's workflow vocabulary
- CoQui can iterate on its review model without proposing schema changes
- The split is a genuine test of the hub-plugin architecture. That CoQui has substantial state of its own is evidence the application is real, not a symptom of a bad boundary

**Negative**

- CoQui requires a backend and a database, not a client-side cache. This is materially more to build than a wrapper
- **Two stores must be reconciled.** CoQui records anchor to Armature document IDs. Those anchors can dangle — another tool may edit or delete an artifact and CoQui will not be notified
- **Identity is shared and currently missing.** Both stores reference the same people. Armature's user model is designed but auth is unimplemented, so CoQui cannot meaningfully attribute an attestation
- **Identifier stability becomes a cross-store dependency.** Armature currently has two coexisting ID conventions. This should be settled before CoQui stores its first anchor, not after
- CoQui's review history has no export story. If a graph is handed to another institution the review record does not travel — which may be correct, since it is exhaust, or may be a loss

**Neutral**

- Much of what is CoQui-local here is arguably general to *any* review tool. Whether the split is a CoQui shape or a review-tool shape cannot be known from one instance

## Open

- Which store, and what stack
- How dangling anchors are detected and handled
- Whether CoQui learns about edits made to artifacts by other tools, and how

## Related

- `../architecture.md` — the full division of state
- `../fit-analysis/what-crosses-to-armature.md` — the membership test and the withdrawals that produced this split
