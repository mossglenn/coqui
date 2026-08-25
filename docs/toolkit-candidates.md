# Armature Toolkit — Candidates and Discipline

The Armature project names a toolkit as a co-equal goal: standardising functions and processes that make it easier to build other tools on Armature. This is CoQui's running view of what might qualify.

---

## What a toolkit is for

**Reducing the cost of building the second plugin.** That is the only test. Anything that does not measurably lower that cost is not toolkit material, however tidy.

This implies a sequencing discipline that is easy to violate:

> **One instance is not a pattern.** Extracting from CoQui alone produces a CoQui-shaped toolkit that fits nothing else — the plugin-specific idiosyncrasies get baked in as if they were general, and the second plugin has to fight them.

So the toolkit goal is served now by **building CoQui cleanly enough that extraction is possible later**, not by extracting early. Keep the seams visible; do not cut along them yet.

The exception is anything already proven general because it exists *inside Armature* and would be needed by any plugin.

---

## Ready now — general by construction

**Generated types.** `scripts/generate-types.js` derives TypeScript interfaces from `schema.json` — xsd primitives, Optional/Set/List handling, enum `VALID_*` arrays as runtime source of truth. Any TypeScript plugin needs exactly this. Today it lives in the Armature repo and emits into the demo app.

**Schema self-description.** Armature ADR-0017 moves the artifact/relationship taxonomy from `JUNCTION_IDS` — a hand-maintained constant in a build script — into `@metadata` on each class. Once the schema declares its own categories, any tool reads them instead of reconstructing the list. **The single highest-leverage toolkit change identified so far**, because it turns tacit knowledge into machine-readable declaration.

*Gated on verification:* if `@metadata` does not survive schema load and come back through the document API, this collapses.

**A typed API client.** Generated from the same `schema.json`, so hub and plugin cannot drift. Would also force the API boundary to be real — Armature's API spec currently claims store internals are not exposed while its own examples pass TerminusDB IDs in both directions.

**Junction read/write helpers.** Every plugin touching a relationship writes the same traversal: fetch junctions filtered by one endpoint, join the other side. The pattern is stable because ADR-0003 and ADR-0004 fix its shape.

**Error mapping.** Armature's `handleTerminusError` maps TerminusDB error types to HTTP responses. Store-specific, which is precisely why it belongs behind a boundary rather than in each plugin.

---

## Ready after a second plugin — patterns, not code

### Prompted rationale

> **Prompted rationale: typed with an open vocabulary, anchored to a part, contested during review.**

Instantiated per decision site with a different vocabulary — distractor purpose, stem framing, cognitive-level choice.

**Why this is the most transferable thing the project has produced:** it is the mechanism by which any plugin feeds Armature's progressive formalization. Armature assumes usage patterns will appear in the graph and reveal what structure is warranted — but usage only forms patterns if a tool shaped it enough to have any. An open text box yields a corpus with no denominator; a prompt with a truthful null yields a dataset.

**Which means the hub's ability to evolve depends on plugin interface design** — and that makes prompting a toolkit responsibility, not an application detail.

### The local/durable split

`architecture.md` divides state between plugin-local exhaust and hub-durable outcomes. Much of what is CoQui-local — assignments, threads, resolution states, attestations — is arguably general to *any* review tool.

Whether that split is a CoQui shape or a review-tool shape cannot be known from one instance. It is the clearest thing to watch when a second plugin appears.

### Triage discipline

Not code, but the most reusable output of the exercise:

> An **Armature gap** must cite either an **Armature-internal symptom** or a **user-stated requirement**. "My plugin needs it" makes it a plugin concern until proven otherwise.

Fit Analysis 01 found nine gaps where three stood. Any plugin author proposing schema changes should apply this before opening an ADR — it is the difference between a hub that accumulates one application's idiosyncrasies and one that stays infrastructure.

---

## Not toolkit material

- **CoQui's review model** — lenses, severity, the assignment envelope. Another tool will bring different dimensions
- **UI components** — keyboard interaction, diff rendering, queue design. A design-system question, not an infrastructure one
- **Workflow states** beyond Armature's minimal vocabulary

---

## Open

- **Where does the toolkit live?** Separate repo, monorepo package, or inside Armature? Interacts with the unsettled question of whether the Armature API is a separate service
- **Does the toolkit assume TerminusDB?** Error mapping does; generated types mostly do not; the client need not. Worth keeping the layers separate so a store change costs one package rather than all of them
- **What triggers extraction?** "When a second plugin exists" is the principle, but nothing says how much duplication justifies moving a given piece
