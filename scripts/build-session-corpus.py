#!/usr/bin/env python3
"""Assemble the Phase 6 session corpus from the master corpus and the sealed defect patch.

    python3 scripts/build-session-corpus.py              # twelve items, 8 clean / 4 defective
    python3 scripts/build-session-corpus.py --variant fourteen

Writes ONE file - corpus/session-corpus.json - GENERATED, never hand-edited.

Item records have the same shape as ethics-in-research-defects.json (id, shape, coquiType,
optionCount, defect, content) plus `position`, `condition` and `sourceRef`. One record shape
across all three corpus files.

The blind-review guarantee stays where the 2026-08-28 decision put it: in whatever renders an
item, not in the file layout. The file states the contract as data - `presentationContract` says
which fields a renderer may show at the blind stage and in what order it may show the options - so
a field added later is withheld by default rather than leaking because nobody updated a list.

Option order is permuted here, at build time, under a declared seed and declared constraints, and
the realised permutation is written into the file. Not at render: three review-motion variants are
compared on the same items, and a fresh shuffle per render would show each variant a different
screen and leave a think-aloud transcript unreconstructable. Items stay `derivation: "verbatim"` -
no item record is edited. Order is a property of the presentation, not of the item.

Refuses to run unless scripts/verify-corpus.py passes.
"""
import argparse, json, pathlib, random, subprocess, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
CLEAN = ROOT / "corpus" / "ethics-in-research.json"
DEFECTS = ROOT / "corpus" / "ethics-in-research-defects.json"
OUT_FILE = ROOT / "corpus" / "session-corpus.json"

# ------------------------------------------------------------------ selection [proposed]
EXCLUDED = {
    "eir-006": "Superlative stem; per-option marking is ill-posed under the MultipleSelect conversion.",
    "eir-007": "India-specific regulatory content; a reviewer outside Indian higher education cannot judge any option.",
    "eir-010": "A second pre-existing defensible-distractor defect, held in reserve as a swap for eir-011.",
    "eir-012": "Assertion-reason; no CoQui item type fits.",
}

# Phase 1 asks for 12 at 8 clean / 4 defective. The pool holds 14 at 10/4, so two clean
# MultipleSelect items are benched. Which two matters: eir-013 and eir-014 carry the known
# valence cueing, so benching one cued and one craft-clean item keeps both properties in the
# session. [proposed] - the alternative is running all fourteen at 10/4.
BENCHED = {
    "eir-003": "Clean MultipleSelect, craft-clean. Benched to hold Phase 1's 8/4.",
    "eir-013": "Clean MultipleSelect, carries known valence cueing. Benched as the cued half of the pair.",
}

# ------------------------------------------------------------- option order [settled 2026-08-31]
# A separate stream from the item-order search below, so changing one does not reshuffle the other.
OPTION_SEED = 20260831 + 1
LETTERS = "ABCDEFGH"
OPTION_ORDER_CONSTRAINTS = {
    "key-position-coverage":
        "Across the MultipleChoice items, every option slot holds the key at least once. Ten of "
        "ten MultipleChoice items across both published sources key to slots 1-3 - the banks "
        "never put the key last - and a reviewer who notices narrows every item without reading "
        "it, inflating blind-stage accuracy and suppressing the correct-but-unsure signal. "
        "Coverage removes the cue by construction rather than by luck.",
    "no-slot-over-half":
        "No slot holds the key more than half the time. Coverage alone still permits a lopsided "
        "distribution, which is the same cue, weaker.",
    "meaningful-order-exempt":
        "An item whose published option order carries information - a sequence, a chronology, a "
        "numeric range, an above-style option - is left as published. Permuting it manufactures a "
        "craft defect its author did not commit, and a craft reviewer flagging the order would be "
        "right about a screen this script invented. Declared per item as `optionOrder` in the "
        "master corpus; eir-009 is the only one today.",
}


def apply_option_order(session, originals, rng):
    """Permute each item's options from its published order. Returns sourceLabels in display
    order, per item. Rebuilt from `originals` every attempt, so the search does not compound."""
    perms = {}
    for it in session:
        opts = originals[it["id"]]
        idx = list(range(len(opts)))
        if it.get("optionOrder") != "meaningful":
            rng.shuffle(idx)
        ordered = []
        for slot, i in enumerate(idx, 1):
            o = dict(opts[i])
            o["sourceLabel"] = o["label"]
            o["label"] = LETTERS[slot - 1]
            ordered.append(o)
        it["content"] = dict(it["content"], options=ordered)
        perms[it["id"]] = [o["sourceLabel"] for o in ordered]
    return perms


def key_slots(session):
    """Where the key falls, by presented slot, across the MultipleChoice items. MultipleSelect is
    excluded: the reviewer marks every option, so key position carries no signal."""
    slots = {}
    for it in session:
        if it["shape"] != "multiple_choice":
            continue
        for slot, o in enumerate(it["content"]["options"], 1):
            if o["isCorrect"]:
                slots[slot] = slots.get(slot, 0) + 1
    return slots


def option_ordering_ok(session):
    mc = [i for i in session if i["shape"] == "multiple_choice"]
    if not mc:
        return True
    slots = key_slots(session)
    widest = max(i["optionCount"] for i in mc)
    if any(n not in slots for n in range(1, widest + 1)):
        return False
    if max(slots.values()) > len(mc) // 2:   # 'more than half', strictly
        return False
    return True


# ------------------------------------------------------------------ ordering [proposed]
ORDER_SEED = 20260831
ORDER_CONSTRAINTS = {
    "first-item-clean":
        "A reviewer's first item calibrates them. Opening on a defect teaches the prior that "
        "items are broken, which is the opposite of what the confirming-is-cheap thesis needs.",
    "no-two-defects-adjacent":
        "Consecutive defects read as a corpus that is broken rather than as items that are.",
    "defect-in-each-half":
        "A session whose defects cluster in one half measures fatigue as much as detection.",
    "twins-not-adjacent":
        "eir-017 and eir-018 share three of four options. Adjacent, the second is a memory test; "
        "separated, the repetition is something a craft reviewer may or may not notice.",
    "no-two-multiselect-adjacent":
        "MultipleSelect costs n productions where MultipleChoice costs one. Clustering them "
        "front-loads the session's cost and confounds Phase 4's per-type comparison.",
}


def ordering_ok(seq, defective, shapes):
    if seq[0]["id"] in defective:
        return False
    pos = [i for i, it in enumerate(seq) if it["id"] in defective]
    if any(b - a == 1 for a, b in zip(pos, pos[1:])):
        return False
    half = len(seq) / 2
    if not (any(p < half for p in pos) and any(p >= half for p in pos)):
        return False
    ids = [it["id"] for it in seq]
    if "eir-017" in ids and "eir-018" in ids:
        if abs(ids.index("eir-017") - ids.index("eir-018")) == 1:
            return False
    ms = [i for i, it in enumerate(seq) if shapes[it["id"]] == "multiple_select"]
    if any(b - a == 1 for a, b in zip(ms, ms[1:])):
        return False
    return True


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--variant", choices=["twelve", "fourteen"], default="twelve")
    args = ap.parse_args()

    rc = subprocess.run([sys.executable, str(ROOT / "scripts" / "verify-corpus.py")],
                        cwd=ROOT).returncode
    if rc != 0:
        print("\nrefusing to build: the corpus does not verify", file=sys.stderr)
        return rc

    clean = json.loads(CLEAN.read_text())
    defects = json.loads(DEFECTS.read_text())
    master = {i["id"]: i for i in clean["items"]}
    patch = {i["id"]: i for i in defects["items"]}

    benched = dict(BENCHED) if args.variant == "twelve" else {}
    pool = [i for i in clean["items"] if i["id"] not in EXCLUDED and i["id"] not in benched]

    # Substitute the defective content for its clean counterpart.
    session = []
    for it in pool:
        if it["id"] in patch:
            merged = dict(it)
            merged["content"] = patch[it["id"]]["content"]
            merged["condition"] = "defective"
            merged["defect"] = patch[it["id"]]["defect"]
            session.append(merged)
        else:
            session.append(dict(it))

    defective = {i["id"] for i in session if i.get("condition") == "defective"}
    shapes = {i["id"]: i["shape"] for i in session}
    craft = set(defects.get("knownCraftDefects", {}).get("items", []))

    n_clean = len(session) - len(defective)
    if args.variant == "twelve":
        assert (len(session), n_clean, len(defective)) == (12, 8, 4), \
            f"expected 12 at 8/4, got {len(session)} at {n_clean}/{len(defective)}"

    rng = random.Random(ORDER_SEED)
    for attempt in range(1, 200001):
        rng.shuffle(session)
        if ordering_ok(session, defective, shapes):
            break
    else:
        raise SystemExit("no ordering satisfies the declared constraints")

    # Option order. The published order is recorded first, because the skew it carries is the
    # reason this search exists and is worth keeping in the answer key.
    originals = {it["id"]: list(it["content"]["options"]) for it in session}
    published_slots = dict(sorted(key_slots(session).items()))
    opt_rng = random.Random(OPTION_SEED)
    for opt_attempt in range(1, 200001):
        perms = apply_option_order(session, originals, opt_rng)
        if option_ordering_ok(session):
            break
    else:
        raise SystemExit("no option ordering satisfies the declared constraints")
    exempt = sorted(i["id"] for i in session if i.get("optionOrder") == "meaningful")

    # Post-conditions. The permutation must move nothing but position.
    for it in session:
        before, after = originals[it["id"]], it["content"]["options"]
        assert sorted(o["label"] for o in before) == sorted(perms[it["id"]]), \
            f"{it['id']}: the permutation is not a rearrangement of the published labels"
        assert sorted(o["text"] for o in before) == sorted(o["text"] for o in after), \
            f"{it['id']}: option set changed under permutation"
        assert {(o["text"], o["isCorrect"]) for o in before} == \
               {(o["text"], o["isCorrect"]) for o in after}, \
            f"{it['id']}: a marking moved off its option"
        if it.get("optionOrder") == "meaningful":
            assert perms[it["id"]] == [o["label"] for o in before], \
                f"{it['id']}: declared meaningful but permuted"

    # Session-level diagnostics: properties of the assembled set that no single item shows.
    # Computed, not asserted - they change with the selection and must not be written by hand.
    # MultipleChoice only: position can cue where exactly one option is the key. Under
    # MultipleSelect the reviewer marks every option, so key position carries no signal.
    mc = [i for i in session if i["shape"] == "multiple_choice"]
    key_positions = dict(sorted(key_slots(session).items()))
    widest = max((i["optionCount"] for i in mc), default=0)
    unused = [n for n in range(1, widest + 1) if n not in key_positions]
    shared = {}
    for i, a in enumerate(session):
        for bb in session[i + 1:]:
            common = {o["text"] for o in a["content"]["options"]} & \
                     {o["text"] for o in bb["content"]["options"]}
            if len(common) >= 3:
                shared[f"{a['id']}/{bb['id']}"] = sorted(common)

    diagnostics = {
        "what": "Properties of the assembled session that no single item shows. A reviewer sees "
                "the set, not the items, and the set can cue in ways none of its members do.",
        "scope": f"{len(mc)} MultipleChoice items; MultipleSelect excluded because marking "
                 "every option leaves key position without a signal.",
        "keyPositionCounts": key_positions,
        "publishedKeyPositionCounts": published_slots,
        "unusedKeyPositions": unused,
        "positionCue": (
            f"UNRESOLVED: the key never falls in option position {unused}. The option-order "
            "constraints did not hold and the build should have failed - investigate."
        ) if unused else (
            "None. Key positions cover every slot, by construction: the option-order search "
            f"below permutes each item until they do. As published the counts were "
            f"{published_slots} - the key never fell last in either source bank, across ten of "
            "ten MultipleChoice items, which is the skew this constraint exists to remove."
        ),
        "sharedOptionSets": shared or "no pair shares three or more option texts",
    }

    stamp = {
        "generated": "scripts/build-session-corpus.py",
        "generatedFrom": ["corpus/ethics-in-research.json", "corpus/ethics-in-research-defects.json"],
        "variant": args.variant,
        "orderSeed": ORDER_SEED,
        "warning": "GENERATED FILE - never hand-edited. Change the master corpus or this script "
                   "and regenerate; an edit here is silently discarded on the next build.",
    }

    session_items = []
    for n, it in enumerate(session, 1):
        session_items.append({
            "id": it["id"],
            "position": n,
            "shape": it["shape"],
            "coquiType": it["coquiType"],
            "optionCount": it["optionCount"],
            "condition": it.get("condition", "clean"),
            "knownCraftDefect": it["id"] in craft,
            "defect": it.get("defect"),
            "sourceRef": it.get("sourceRef", {"source": "testbook"}),
            "optionOrder": it.get("optionOrder", "arbitrary"),
            "optionPermutation": perms[it["id"]],
            "content": it["content"],
        })

    OUT_FILE.write_text(json.dumps({
        "corpus": "ethics-in-research-session",
        "purpose": "The complete Phase 6 content-review session: every item the SME sees, in the "
                   "order they see it, with the four known content defects applied.",
        "status": "ready",
        **stamp,
        "sealed": "GROUND TRUTH. Phase 1 keeps this sealed until the session is over. Every "
                  "`countsAsCaught` is pre-registered - written before Phase 6 runs, so that what "
                  "counts as detection is not decided by looking at the result.",
        "blindReviewWarning": "`content` is the FULL ITEM DEFINITION, not a reviewer-safe view. It "
                              "carries isCorrect and incorrectFeedback on every option, and on a "
                              "defective item the feedback still explains the PUBLISHED marking - "
                              "so rendering it would both leak the answer and expose the defect. "
                              "Whatever renders an item MUST apply `blindProjection` below and MUST "
                              "NOT show feedback to a reviewer at all.",
        "presentationContract": {
            "what": "What a renderer may show, and in what order. Two clauses: which fields reach "
                    "the reviewer, and how the options are arranged. Owned by "
                    "docs/design/review-experience.md; stated here as data so a fixture can "
                    "assert against it.",
            "blindProjection": {
                "item": ["id", "position", "shape", "coquiType", "optionCount", "stem",
                         "instruction"],
                "option": ["label", "text"],
                "rule": "A renderer may show these fields and no others at the blind stage. Every "
                        "field not listed is withheld, including any field added to this file "
                        "later. A whitelist, so a new field is withheld by default rather than "
                        "leaking because nobody updated a list of exclusions. Note what this "
                        "withholds by default: `sourceLabel` and `optionPermutation` would hand "
                        "the reviewer the published order back.",
            },
            "optionOrder": {
                "rule": "Options are presented in the order this file gives them, with the "
                        "`label` this file gives them. A renderer MUST NOT re-sort them and MUST "
                        "NOT re-letter them. The permutation is fixed at build time and shared by "
                        "every surface and every review-motion variant, so the same item is the "
                        "same screen wherever it appears and a transcript can be reconstructed.",
                "seed": OPTION_SEED,
                "constraints": OPTION_ORDER_CONSTRAINTS,
                "status": "[settled] 2026-08-31",
                "identity": "`sourceLabel` is the label the publisher used and is what every "
                            "ground-truth rule in this file names. `label` is the display letter "
                            "and is a property of this build. A grading rule that names a display "
                            "letter or a slot number is broken by definition.",
                "exempt": exempt or "none",
                "attempts": opt_attempt,
            },
        },
        "composition": {
            "items": len(session), "clean": n_clean, "defective": len(defective),
            "byShape": {s2: sum(1 for i in session if i["shape"] == s2)
                        for s2 in sorted(set(shapes.values()))},
            "byShapeAndCondition": {
                f"{s2}/{c2}": sum(1 for i in session
                                  if i["shape"] == s2 and i.get("condition", "clean") == c2)
                for s2 in sorted(set(shapes.values())) for c2 in ("clean", "defective")
            },
            "cleanMultipleChoice": sorted(i["id"] for i in session
                                          if i["shape"] == "multiple_choice"
                                          and i.get("condition") != "defective"),
            "defectsByType": {i["defect"]["type"]: i["id"]
                              for i in session if i.get("defect")},
        },
        "selection": {
            "excluded": EXCLUDED,
            "benched": benched or "none - running the full pool at 10/4",
            "status": "[proposed] - the bench holds Phase 1's 8/4; the alternative is fourteen at 10/4",
        },
        "ordering": {"seed": ORDER_SEED, "constraints": ORDER_CONSTRAINTS,
                     "status": "[proposed]", "sequence": [i["id"] for i in session]},
        "sessionDiagnostics": diagnostics,
        "defectTypes": defects["defectTypes"],
        "knownCraftDefects": defects.get("knownCraftDefects"),
        "gateAmendment": defects["gateAmendment"],
        "itemCount": len(session_items),
        "items": session_items,
    }, indent=2, ensure_ascii=False) + "\n")

    print(f"\nbuilt {args.variant}: {len(session)} items, {n_clean} clean / {len(defective)} defective")
    print("order:", " ".join(("*" if i["id"] in defective else " ") + i["id"] for i in session))
    print("       (* = defective)")
    print("option order: permuted from", published_slots, "to", key_positions,
          f"(slot: keys) in {opt_attempt} attempt(s)"
          + (f"; exempt: {', '.join(exempt)}" if exempt else ""))
    if unused:
        print(f"diagnostic: key never in option position {unused} - recorded in the answer key")
    for pair, common in (shared.items() if isinstance(shared, dict) else []):
        print(f"diagnostic: {pair} share {len(common)} option texts")
    print(f"wrote {OUT_FILE.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
