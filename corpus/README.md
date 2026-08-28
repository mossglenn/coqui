# Corpus — item pools for validation sessions

> **Answers:** *Where do the items in a reviewer session come from, what shape are they in, and
> what has been done to them?*

This directory holds the item pools Phase 1 of
[`../docs/design/content-accuracy-validation-plan.md`](../docs/design/content-accuracy-validation-plan.md)
calls for. It is **input to a test**, not design content — nothing here is a spec, and nothing
here is settled in the `docs/` sense.

---

## Files

| File | What it is |
|---|---|
| `ethics-in-research.json` | 14 items on research ethics from a published Testbook MCQ PDF. Six verbatim, seven converted from combination-key form to MultipleSelect, one left alone. `status: extracted-and-converted` — no defects planted yet |

---

## ⚠ `content` is the item definition, not a reviewer-safe view

Every option carries `isCorrect` and `incorrectFeedback`. **Nothing in this file is blind.**

`claims.md` makes withholding the author's marking the default, and the blind-answer stage depends
on it — a reviewer who has seen `isCorrect` cannot supply the signal the stage exists to collect.
That guarantee used to live in this file's structure, in a `presented` / `sealed` split. It now
lives in **the code that reads the file**.

> **Whatever renders an item to a reviewer must project a blind view** — `stem`, `instruction`,
> and option `text` only — and reveal the marking at the stage the design says, not before.

This is the right trade. An item definition and a review fixture answer different questions, and
the previous structure conflated them: it made the *file* reviewer-safe and left no place for the
item's own key and feedback to live. But the safety is now a claim about the renderer, and a
Phase 4 prototype that reads `content` straight into a template silently destroys the experiment.
Worth a one-line assertion in the fixture loader.

---

## The shape of an item record

```jsonc
{
  "id": "eir-002",
  "shape": "multiple_select",          // multiple_choice | multiple_select | assertion_reason
  "coquiType": "MultipleSelect",       // null where no CoQui item type fits
  "optionCount": 5,
  "condition": "clean",                // or the planted defect, once Phase 1's pass runs
  "plantedDefect": null,               // when set, this is the sealed ground-truth sheet
  "derivation": "converted-from-combination-key",   // or "verbatim"
  "sourceRef": { "section": "latest", "positionInSection": 2 },

  "content": {
    "stem": "In the context of research, plagiarism can be avoided by which of the following?",
    "instruction": "Select all that apply.",
    "options": [
      {
        "label": "A",
        "text": "Properly citing sources",
        "isCorrect": true,
        "incorrectFeedback": "Plagiarism involves using someone else's work or ideas without …"
      }
    ]
  },

  "sourceRationale": "…",              // the source's published explanation, verbatim
  "sourceForm": { … },                 // converted items only: the published item, verbatim
  "extractionFlags": [ … ]
}
```

**`content` is the single owner of the marking and of feedback coverage.** No other field restates
which option is correct or which options carry feedback. The retired `sealed.keyLabel` / `keySet` /
`markings` and the retired `feedbackCoverage` summary are all derivable from `content.options`,
which is why they are gone — the verifier fails the build if any of them reappear.

**Options are unique within an item.** No two options in an item may share a text, a label, or have
one text contained in another. The build asserts it and the verifier re-checks it; a repeated option
is a broken item, and a repeated label makes the marking unaddressable.

**`label` is kept**, though the requested shape did not name it. Without it, `sourceForm.keyText`
— *"Only A, C and E"* — cannot be checked against the option set, and the conversion loses its
anchor to the published item. It is also what a reviewer refers to out loud.

**Keys are camelCase throughout**, following the option fields. Reverting to snake_case is a
one-line change in the build if you'd rather.

> **`extractionFlags` are not attestations.** No reviewer has seen these items. The flags exist so
> corpus selection is an informed choice, and several are reasons an item cannot serve as a
> *clean* item — a defect already present is not a defect you planted, and Phase 7's "planted
> defects caught" count means nothing if the clean items are broken too.

---

## `incorrectFeedback` — lifted, never authored

What a learner sees on getting an option wrong. For a *correct* option in a MultipleSelect, that
means failing to select it.

**Every string is taken from that item's own published rationale**, and the verifier asserts each
one appears there — and in the source PDF — before the build passes. Where the source says nothing
about an option, the value is **`null`**. A corpus whose entire value is being *real* cannot have
explanations written into it by the person running the test.

Two items — **`eir-006` and `eir-007`** — carry feedback the source wrote for a *named group* rather
than for an option, so their grouped options share one sentence. That is recorded in their
`extractionFlags`, since an identical string tells you the options match but not whether the
grouping is the source's or the extractor's.

### Coverage is uneven, and it tracks the PDF's two sections

| Section | Items | Options with feedback |
|---|---|---|
| "Latest" — structured Key Points / Additional Information, keyed by option | 5 | **20 / 21 (95%)** |
| "Top" — loose prose, often explaining only the key | 9 | **23 / 40 (57%)** |
| | **14** | **43 / 61 (70%)** |

The thin ones are `eir-012` (0/4), `eir-009` (1/4) and `eir-010` (1/4). If the session needs
complete feedback, the five "Latest" items plus `eir-008` and `eir-013` are the pool that has it.

**`eir-012` has no per-option feedback and cannot.** Its options are truth-value combinations
rather than propositions, so the rationale attaches to the two *statements* and has nowhere to go
at option level. That is a property of the assertion-reason shape, not a gap in the extraction.

Two judgment calls worth knowing about, both resolved toward silence:

- `eir-003` option A — *"You will be rewarded for that over time"* — is never rebutted by the
  source. Null, not a rebuttal I wrote
- `eir-014` option E — *"Privacy as an insignificant issue"* — is never addressed. The source
  defines confidentiality and anonymity, and repurposing those as a rebuttal would be authoring by
  selection. Null

---

## The conversion

Seven published items listed statements A–E and offered subsets as options — *"Only A, C and E"*.
They are MultipleSelect items wearing a MultipleChoice mask, and the mismatch is not cosmetic:

- The distractor claim — *"A is wrong — not merely weaker than B"* — cannot be written against a
  subset option. `Only B and C` is not a proposition; it can be wrong for several reasons at once,
  and the reviewer has no way to say which
- A wrong blind answer names a **combination**, not a contested statement. That is precisely the
  resolution `claims.md` credits genuine MultipleSelect with having *over* MultipleChoice, thrown
  away by the packaging

**What was done.** The statements become independent options, each carrying its own `isCorrect`.
Stems and statement texts are verbatim. The learner-facing instruction is restated as *"Select all
that apply."*, because the published one names a single answer.

**What it is answerable to.** The markings are *derived from the published combination key by regex
and asserted against it* — never retyped. `eir-014`'s parenthesised labels `(A)` were normalised to
`A`; the originals survive in `sourceForm`.

**What it costs.** These are no longer published items. Phase 1's own open question applies to
every one of them: *a planted defect is authored to be findable; a real defect survived its
author's attention.* A conversion is an editorial act, and the seven converted items are weaker
evidence than the six verbatim ones for anything about how real items behave.

### It changes what review costs, not just what it looks like

Counted against the `claims.md` gesture inventory, over the seven items:

| | Required gestures | Productions |
|---|---|---|
| As published (MultipleChoice-shaped) | 42 | 7, each 4-space |
| As MultipleSelect | 47 | **33**, each 2-space |

Five more gestures is nothing. **Seven productions becoming thirty-three is the real change** —
the reviewer now decides on every statement rather than agreeing with one packaged answer. That is
the increase in cognitive cost `claims.md` accepts deliberately.

### It also makes the corpus an instrument for a question Phase 4 asks

Phase 4 wants the **MultipleSelect objection rate against MultipleChoice** — *"if experts routinely
differ from authors on one option in five, the type is structurally expensive to review."* The
corpus now holds six MultipleChoice and seven MultipleSelect items in one domain, from one source,
at comparable difficulty. That comparison was not available before the conversion and is close to
free now.

---

## Shapes

| Shape | Count | `coquiType` |
|---|---|---|
| `multiple_choice` | 6 | `MultipleChoice` |
| `multiple_select` | 7 | `MultipleSelect` |
| `assertion_reason` | 1 | — |

**`eir-012` was not converted.** Its two statements are judged *jointly* — the options are the four
truth-value combinations. Splitting them into independent markings would change what the item asks,
not merely how it is packaged.

### One conversion is recommended for exclusion

**`eir-006`** — *"Which of the following steps in research are least vulnerable to research
ethics?"* The stem is a superlative. Vulnerability is a **ranked property of the set**, so *"is C
correct?"* has no answer independent of A, B, D and E, and per-option marking is ill-posed. The
combination packaging concealed this by only ever asking for a comparison.

A reviewer marking it blind would be answering an unanswerable question, and any disagreement with
the author would carry two indistinguishable explanations — the same failure `claims.md` rejects
when it argues the blind cognitive-level step must be a binary rather than a level. The conversion
is mechanically correct and substantively wrong; it is kept in the file, flagged, so the reasoning
survives. Its feedback is also the weakest of the seven — 2 of 5 options, both `shared`.

`eir-009` asks the same question in plain MultipleChoice form and **does** survive it: *"which is
least vulnerable"* is a single comparative judgment across the option set, which is exactly what
the reviewer is asked for. The pair is a clean worked example of when this conversion is available
and when it is not.

---

## Provenance

Extracted from *"Ethics in Research MCQ [Free PDF] — Objective Question Answer for Ethics in
Research Quiz"*, Testbook Staff, 16 pages, via `pdftotext -layout`.

The PDF carries **15 answer markers and 14 unique items**: *"In the context of research, plagiarism
can be avoided by which of the following?"* is reprinted verbatim in both the "Latest" and "Top"
sections. It is retained once, as `eir-002`.

Verification runs 673 checks, all passing:

- every stem, instruction and option text round-trips to the extraction, whitespace and the PDF's
  hyphenated line wraps normalised
- every marking matches the PDF's own `Option N :` marker **in document order**, which checks the
  transcription against the source rather than against itself
- every conversion reproduces its published combination key, no option text drifted from its
  statement, and no distractor duplicates the key set
- **every `incorrectFeedback` string appears in that item's own `sourceRationale`** and in the PDF
- **no item has duplicate options** — no repeated text, no repeated label, and no option text
  contained inside another's
- the retired fields (`sealed`, `presented`, `keyLabel`, `keySet`, `markings`, `feedbackCoverage`)
  do not reappear anywhere

**Third-party material.** These items are someone else's, reproduced here for a design test.
Nothing in this directory should be published, redistributed, or seeded into an Armature bank.
