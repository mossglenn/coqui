import os, re, io

DOCS = "docs"
SKIP_DIRS = {"journal"}
out = []

def rel(p): return os.path.relpath(p, DOCS)

items = {}   # file -> list of (kind, text)

for root, dirs, files in os.walk(DOCS):
    dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
    for f in sorted(files):
        if not f.endswith(".md") or f in ("README.md","open-questions.md"): continue
        p = os.path.join(root, f)
        lines = open(p, encoding="utf-8").read().split("\n")
        found = []
        in_oq = False
        for i, l in enumerate(lines):
            if re.match(r"^#{2,3} .*Open questions", l, re.I) or re.match(r"^#{2,3} .*Open items", l, re.I) or re.match(r"^#{2,3} .*Risks and open questions", l, re.I):
                in_oq = True; continue
            if in_oq and re.match(r"^#{1,3} ", l):
                in_oq = False
            if in_oq and l.strip().startswith("- "):
                found.append(("question", l.strip()[2:], i+1))
            if "= recommendation, open" in l or "= decided" in l:
                continue
            m = re.search(r"\*\*\[(proposed|deferred|open[^\]]*)\]\*\*", l)
            if m and not in_oq:
                found.append((m.group(1).split()[0], l.strip(), i+1))
        if found: items[rel(p)] = found

def clean(t):
    t = re.sub(r"\s+", " ", t).strip()
    t = re.sub(r"^#{2,4}\s*", "", t)
    t = re.sub(r"^\*\*\[[^\]]+\]\*\*\s*", "", t)
    t = re.sub(r"\s*\*\*\[[^\]]+\]\*\*\s*$", "", t)
    return t[:200] + ("…" if len(t) > 200 else "")

out.append("""# Open Questions Register

Everything in `docs/` still marked **[proposed]**, **[deferred]** or **[open]**, plus every bullet
under an *Open questions* heading. Generated from the source documents — regenerate rather than
edit by hand with `python3 scripts/generate-open-questions.py` from the repo root.

The journal is excluded by design: it records what was settled, not what is still outstanding.

""")

order = ["design/design-premise.md","design/process-model.md","design/review-experience.md",
         "design/claims.md","design/rationale-capture.md","design/content-accuracy-validation-plan.md",
         "architecture.md","toolkit-candidates.md","armature-orientation.md"]
keys = [k for k in order if k in items] + [k for k in sorted(items) if k not in order]

for k in keys:
    out.append("## `%s`\n" % k)
    props = [x for x in items[k] if x[0] != "question"]
    qs    = [x for x in items[k] if x[0] == "question"]
    if props:
        out.append("**Marked open in place**\n")
        for kind, t, ln in props:
            out.append("- *(%s, L%d)* %s" % (kind, ln, clean(t)))
        out.append("")
    if qs:
        out.append("**Open questions**\n")
        for kind, t, ln in qs:
            out.append("- *(L%d)* %s" % (ln, clean(t)))
        out.append("")

total = sum(len(v) for v in items.values())
out.append("---\n")
out.append("**%d items across %d documents.**" % (total, len(items)))

open(os.path.join(DOCS, "open-questions.md"), "w", encoding="utf-8").write("\n".join(out) + "\n")
print("wrote docs/open-questions.md —", total, "items,", len(items), "documents")
