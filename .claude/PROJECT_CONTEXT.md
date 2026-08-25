# CoQui — Project Context

Background on the problem space, the people, and the strategic position. Read this to understand *why* decisions are made.

---

## The problem

Assessment items are developed by instructional designers and validated by subject-matter experts. The handoff between them is where the work stalls.

"SME review bottleneck" names a symptom. The causes worth designing against:

1. **SME latency** — review is never their top priority. The ask must be small, scoped, and time-boxed
2. **Unclear ask** — an SME who doesn't know what to look at either rubber-stamps or rewrites your prose
3. **Context reload** — every return trip re-reads the item, the objective, and the prior discussion cold
4. **Lost threads** — feedback scattered across email, documents, and chat, with no resolution tracking
5. **Rework churn** — the ID edits, the SME can't see what changed, so they re-review the whole item
6. **No decision record** — six months later nobody knows why the item says what it says, and someone "fixes" a deliberate choice

### The structural insight

Reviewing a four-option multiple-choice item is not one judgment. It is seven: the stem's clarity, the key's correctness, each distractor's wrongness, whether anything cues the answer, and whether the item measures the objective at the intended level.

**When a tool presents one comment box per item, it implicitly asks for one judgment — so it receives one.** The rubber-stamp failure mode is not SME laziness. It is an interface that asked a single vague question and got a single vague answer.

The shape of the review surface determines the depth of the review.

---

## Actors

**Instructional Designer (ID)** — authors items, owns instructional quality, is author of record.

**Subject Matter Expert (SME)** — reviews for correctness and credibility within their domain. Has limited time and a competing day job.

The ID initiates; the SME responds. **Approval authority sits with the SME. Editorial authority sits with the ID.** Keeping those separate is what makes the decline path coherent rather than insubordinate.

---

## Known weakness in the evidence base

The project author is an ID practitioner and can speak credibly for that side of the collaboration. He is not an SME, and the SME experience is the half of the workflow the tool is nominally built to fix.

Unless real input is gathered from that side, the SME-facing design rests on inference. This does not block design work, but it should be named in any claim about the tool's user-centredness rather than quietly assumed away.

---

## Relationship to Armature

Armature is graph-based infrastructure for learning engineering — an open schema and API that preserves design rationale in the relationships between instructional artifacts.

CoQui is its first plugin. Chosen because:

- It solves a concrete, real workflow problem
- Assessment items are the most relationship-dense artifact type in the graph
- Building it validates the API design before more complex tools are attempted
- It demonstrates the hub-plugin architecture concretely

**CoQui is a separate repository.** Anything that is graph infrastructure lives in Armature. Anything that is CoQui's authoring UX, workflow, or review collaboration lives here.

### What CoQui has already produced for Armature

Fit Analysis 01 generated six Armature ADRs (0016–0021) and one amendment. The most useful were not conceptual gaps but **places where Armature's own specifications disagreed with each other** — a review status modelled where delivery configuration lives, a document key built from mutable content, an API document contradicting its own boundary claim, an annotation channel gated on whether a type happened to have a name.

It also produced a validation worth stating: Armature theorised that design rationale should be captured but had no answer to *why a designer would ever bother writing it down*. CoQui found the moment — defending a decision to an expert who challenged it.

---

## Positioning

**What CoQui is not:** an LMS, an item bank with a web front end, a general authoring suite, a delivery platform.

**What CoQui is:** a collaboration tool for the specific, poorly-served moment where a designer and an expert have to agree that a question is correct.

---

## Open questions

Not yet decided. Design questions to explore, not gaps to fill arbitrarily.

- **Unresponsive SME.** No escalation, timeout, or reassignment exists in the model. This is the actual bottleneck and the design currently routes around it
- **Multiple SMEs on one item.** Concurrent or sequential? What happens when two SMEs disagree with each other rather than with the ID?
- **Multiple IDs.** Individual or team ownership?
- **Notification model.** Out of scope for the process model, decisive for adoption
- **CoQui's own persistence.** ADR-0002 establishes that CoQui needs a store; nothing specifies which
- **Identifier convention.** Every CoQui anchor is an Armature document ID, and Armature currently has two conventions (Armature ADR-0016, decision 5). This should be settled before CoQui stores its first anchor
