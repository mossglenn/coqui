# ADR-0006: Four Roles, Assigned by People and Not Enforced by the App

## Status
Accepted

## Context

The original model had two actors: an instructional designer who authors and a subject-matter expert who reviews. Working through the review surface showed that this conflates judgments requiring different expertise, and the conflation produced errors that recurred at every level of the design.

Three examples, each caught only after the design was written down:

- **Cueing** — whether a stem leaks its answer — was assigned to the SME. It is item-construction expertise, not domain expertise, and a domain expert cannot even detect it by introspection: answering correctly, they cannot distinguish knowing the content from being told it
- **Cognitive level** — the alignment surface asked a subject expert to name the Bloom's level an item measures. Most have never used the taxonomy and have no reason to have done
- **Distractor purpose** — the author declares a purpose and someone contests it, but "does this text catch that misconception" and "do learners actually hold that misconception" are different claims needing different expertise

Every one of these is a **role error**, not a category error. A model with two actors cannot express them, so they surfaced as awkwardness three documents downstream rather than as contradictions at the point of assignment.

Separately: an author reviewing their own work is the check that cannot be trusted, and the original model had no second designer to be the check.

## Decision

**CoQui models four roles.**

| Role | Acts | Expertise the role presumes |
|---|---|---|
| **Author** | Writes the item. **Declares** each distractor's purpose and the intended cognitive level | Instructional design |
| **Craft reviewer** | **Judges the declarations.** Comprehensibility, whether each distractor serves its declared design purpose, whether the cognitive-level claim holds, cueing | Assessment design |
| **Content reviewer** | **Judges truth.** Stem facts, key correctness, distractor wrongness, ambiguity, and the empirical half of any diagnostic purpose claim | The subject domain |
| **Stakeholder** | **Approves, or withholds approval.** Judges nothing | **None** |

**1. Roles, not people.** Four roles does not mean four people. One identity may hold several roles on the same item.

**2. The app does not gatekeep role assignment.** Who holds which role is a project decision, made by whoever runs the project. CoQui records the assignment; it does not validate it, does not require roles to be held by distinct identities, and does not check anyone's credentials.

**3. Warrant is a claim the assignment makes, not a property the app verifies.** An attestation records *"content-attested by X, holding the content-reviewer role."* Whether X was qualified is the project's accountability. This keeps the record honest: it states provenance, never competence.

**4. The UX encourages separation without enforcing it.** Where one identity holds two roles on an item, the record shows it and the approval surface surfaces it. That is a fact displayed, not an error raised.

**5. "SME" continues to name the person and the problem.** The role is *content reviewer*; a subject-matter expert is its usual holder. The SME review bottleneck keeps its name — it is the problem this tool exists to attack, and renaming it would obscure that.

## Consequences

**Positive**

- Every judgment in the design has a role that presumes the expertise it needs. The three errors above become impossible to state rather than merely discouraged
- A second designer exists to be the check on the first, without a hierarchy
- Small teams are not blocked. One person holding three roles is a supported configuration, visibly recorded
- The record distinguishes *who attested in what capacity* from *whether they were any good at it* — provenance, not performance

**Negative**

- Four roles is more model than two, and role assignment is a configuration step before any review can be requested. The design has an explicit anti-pattern against configuration preceding contribution
- Because the app does not gatekeep, nothing prevents a project from assigning every role to one person and producing a record that looks reviewed and is not. This is deliberate and it is a real cost
- The design's evidence base covers the author role well and the other three by inference

**Neutral**

- Whether role assignment sits at project, assignment or item level is unspecified

## Related

- ADR-0007 — review and approval as separate acts, which this role model makes expressible
- ADR-0009 — attestation per (part × review type)
- `../design/process-model.md` — the roles in the working process
