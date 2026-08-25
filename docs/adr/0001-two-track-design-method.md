# ADR-0001: Two-Track Design Method

## Status
Accepted

## Context

CoQui has two purposes. It is a collaboration tool for instructional designers and subject-matter experts, and it is the first real-world test of whether Armature can serve as infrastructure for an actual application.

Armature was designed in isolation, as an idea. Its schema, ADRs and API spec are internally coherent, but internal coherence is not evidence of fitness. A framework designed without an application is a hypothesis, not infrastructure.

The obvious way to build CoQui — read the schema, expose it through screens — makes the second purpose worthless. **A thin wrapper is an unfalsifiable test.** If the screens are shaped by the schema, the schema fits by construction; the experiment returns a positive result regardless of the truth, which means it returns no information.

The failure mode is not usually deliberate. It is the gradual accommodation of a design to what the data model makes convenient, one small concession at a time, until nothing remains that could have strained.

## Decision

Design work runs in two deliberately separated tracks.

**Track A — design the tool.** User-centred, driven by the collaboration problem. During Track A work Armature is **out of scope** — bracketed, not ignored, so the design is not unconsciously pre-constrained. Schema shapes, junction documents and store affordances do not appear in Track A artifacts.

> A Track A document that mentions a schema type has already failed.

**Track B — test the infrastructure.** Takes Track A output as a **fixed input** and asks what Armature would have to do. Produces a fit analysis, not a redesign of Track A.

> A Track B document that proposes changing the user experience to suit the schema has confused its job.

**Every friction point is triaged into one of three outcomes:**

| Outcome | Action |
|---|---|
| **Armature gap** | ADR and change in the Armature repo |
| **Plugin concern** | Build it in CoQui; record why the boundary falls there |
| **CoQui adapts** | Change the CoQui design; record the reasoning |

The third is load-bearing. Without it every friction point becomes a schema change request and the hub accumulates one application's idiosyncrasies.

**The triage rule:**

> An **Armature gap** must cite either an **Armature-internal symptom** or a **user-stated requirement**. "CoQui needs it" makes it a plugin concern until proven otherwise.

**Work proceeds in slices.** One user-facing capability designed fully in Track A, then Track B against it, then the next. Designing all of CoQui in a vacuum and running one integration check produces an unactionable report that arrives too late to act on cheaply.

## Consequences

**Positive**

- The test is falsifiable. Friction is real evidence rather than an artifact of self-censorship
- Findings arrive early enough to change Armature while it is still cheap
- The boundary between hub and plugin gets decided deliberately, case by case, with recorded reasoning

**Negative**

- Slower than designing against the schema, and the extra step produces work that is thrown away when a finding is withdrawn
- Requires discipline that does not self-enforce. In the first fit analysis, three hub requirements were proposed that originated in CoQui's own design; each was caught by external challenge, never by self-review
- Track A designs may specify things Armature cannot yet support, so implementation waits on decisions in another repository

**Neutral**

- Some documents legitimately span both tracks. These are marked as boundary artifacts rather than forced into one

## Validation

Fit Analysis 01 reported nine Armature gaps. Three survived scrutiny. The withdrawals were not wasted: the corrections established the triage rule above, and the surviving findings — all grounded in Armature's *internal* inconsistencies rather than CoQui's needs — produced six ADRs in the Armature repository.

A wrapper app would have found none of them.

## Related

- `../design/design-premise.md` — the full method
- `../fit-analysis/01-review-loop.md` — the first application, with its own errors preserved
