# CoQui Architecture — What CoQui Owns, What Armature Owns

Follows from `fit-analysis/01-review-loop.md` and `fit-analysis/what-the-graph-should-remember.md`. Formalised as ADR-0002.

---

## The conclusion

**CoQui is not a thin client over Armature. It requires its own persistence layer.**

This was never decided directly. It follows from a series of separate triage calls, each of which assigned some piece of state to the plugin. Collected, they amount to a substantial application database:

- **Role assignments** — who holds author, craft reviewer, content reviewer and stakeholder, on what
- Assignments — who was asked to review what, under which review type, by when
- Threads — comments, suggestions, replies, severity, resolution state
- Attestations — the per-part × per-review-type confirmation grid
- Staleness — which attestations were invalidated by which edits
- In-flight suggestions — proposed edits pending accept or decline
- Diffs and re-review state
- Queue, progress, resumption position, time estimates
- Draft rationale, before it is committed
- **Approval eligibility** — the computed predicate over the coverage grid
- **The approval record** — who approved or withheld, when, on which version, and why

None of this reaches Armature. All of it must survive a browser refresh, a reviewer closing their laptop mid-assignment, and a week between the first review pass and the second.

**Why this matters beyond implementation:** a thin wrapper would put no pressure on the infrastructure, and pressure is the entire point of building CoQui. That CoQui has substantial state of its own is evidence the app is real, not a symptom of a bad boundary.

---

## Division of state

### Armature owns

| State | Notes |
|---|---|
| Assessment items and their answer options | The item bank; the artifacts under review |
| Objectives, modules, courses | Read-only context in CoQui |
| Item readiness | The bank item's own review lifecycle |
| Placement clearance | Whether an item is cleared for a specific assessment — a distinct question |
| Coverage status | Computed from the graph |
| Design notes | Durable rationale, including declines |
| Design findings | Concerns raised about artifacts |
| Users | Identity as a design-process participant |

### CoQui owns

| State | Why it stays local |
|---|---|
| Assignments | Pure workflow. No graph significance |
| Threads, severity, resolution | Review *discourse*; Armature needs *outcomes* |
| Attestations, the part × review-type grid | A hub-side verification type was proposed and withdrawn for want of user-originated justification |
| **Role assignments** | Who holds which role is a project decision CoQui records and does not validate — ADR-0006. It is workflow, not design knowledge |
| **Approval eligibility** | Computed from CoQui-local attestations and threads. Armature receives only the resulting status |
| **The approval record** | The stakeholder's act and its reasoning. Only its *outcome* — item readiness — crosses |
| Staleness computation | Armature does not need to know *when* an attestation lapsed |
| In-flight suggestions | Working state; only the accepted result becomes a durable edit |
| Review types, queue, estimates, diffs | UX |

### What crosses, and when

**CoQui → Armature (writes)**

| Trigger | Becomes |
|---|---|
| Item authored or edited | Item and answer-option writes |
| **The stakeholder approves** | Item readiness change → triggers coverage recompute. The approval act itself, its reasoning, and a withholding stay local |
| ID declines a change, with reasoning | A design note, marked as prompted |
| Prompted rationale answered (distractor purpose) | A design note |
| Review reveals an upstream artifact may be wrong | A design finding, with evidence |
| A dispute is dismissed with reasoning | A design finding, status Dismissed |

**Armature → CoQui (reads)**

Objectives as read-only context, the item bank, both coverage figures, and existing notes and findings for display.

**The governing rule:** *prompt generously, store conservatively.* Prompting is cheap and reversible; storing is close to permanent and propagates to every tool on the platform.

**The practical consequence: most review traffic never reaches Armature.** A twelve-item assignment might generate eighty attestations and fifteen threads, and produce three design notes and one finding. That ratio is correct. Exhaust stays local; outcomes cross.

---

## Consequences

**CoQui needs a real backend**, not a client-side cache. Assignments outlive sessions, threads outlive assignments, and attestations must survive weeks. This is a database and a service, not local storage.

**Two stores must be reconciled.** CoQui-local records anchor to Armature artifacts — a thread on an answer option, an attestation on the alignment between an item and an objective. Those anchors can dangle: another tool may edit or delete the artifact, and CoQui will not be notified.

**Identity is shared and currently missing.** Both stores reference the same people. Armature's user type is designed but auth is unimplemented. CoQui cannot meaningfully attribute an attestation, and the "a dismissal requires a reason" constraint is hollow without knowing who dismissed it. This is the cheapest blocker on the list and it blocks both sides of the boundary.

**Roles make identity load-bearing rather than merely desirable.** With four roles assigned to identities (ADR-0006), an attestation's meaning depends on the capacity in which it was made — *content-attested by X, holding the content-reviewer role*. Without identity there are no roles, without roles there is no coverage predicate, and without the predicate there is nothing to approve. Auth now blocks the core of the model, not just its attribution.

**Identifier stability is a cross-store dependency.** Every CoQui anchor is an Armature document ID. Two conventions currently coexist in Armature — readable IDs from its seed script, store-assigned IDs from its API. CoQui will hit this on its first write, so the convention should be settled before CoQui stores its first anchor, not after.

---

## Open

- **Dangling anchors.** What happens when an answer option CoQui holds threads against is deleted or replaced by another tool? Options range from soft-delete in Armature, through a notification mechanism, to periodic reconciliation. Nothing is decided
- **Does CoQui reconstruct, or does it remember?** If an attestation is invalidated by an edit made *in Armature by another tool*, CoQui may not learn of it. A content-fingerprint approach was considered and withdrawn; nothing replaced it
- **Export.** CoQui's local record has no export story. If a graph is handed to another institution, the review history does not travel — which may be correct (it is exhaust) or may be a loss
- **Is the split stable under a second plugin?** Much of what is CoQui-local here is arguably general to any review tool. See `toolkit-candidates.md`
