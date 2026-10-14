#!/usr/bin/env python3
"""
Build the SPECIES array in js/data.js from data/life-list-for-website.csv.

    python scripts/build_data.py

The CSV is the source of truth. Everything between these two marker lines in
js/data.js is replaced each time the script runs (so don't hand-edit it):

    // BEGIN GENERATED SPECIES
    // END GENERATED SPECIES

Everything else in data.js (KINDS, FILTERS, HOMEPAGE_LIMIT, helpers) is left
alone and is still edited by hand.

CSV columns (one row per PHOTO; rows sharing a slug are one species):
    required:  slug, kind, number, name, types, locationTag
    optional:  scientific, src, alt, date, location, notes

    - types      one or more type ids separated by ";"  (e.g. large-water-birds)
    - kind       "birds" (or "bird" — a plural "s" is added if needed)
    - number     1 becomes "001"
    - date       2024-05-12, 5/12/2024 or 5/12/24
    - src        leave blank to use images/<kind>/no-photo-yet.jpg
    - alt        leave blank and one is generated from the name + location
    - The first row of each species is its cover photo.

Problems that would break the site (unknown tag, bad date, a species whose
rows disagree with each other...) stop the script with a list of what to fix.
A photo file that isn't in the repo only produces a warning.
"""
import argparse
import csv
import json
import os
import re
import sys
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DEFAULT_CSV = ROOT / "data" / "life-list-for-website.csv"
DEFAULT_DATA_JS = ROOT / "js" / "data.js"

BEGIN = "// BEGIN GENERATED SPECIES"
END = "// END GENERATED SPECIES"
REQUIRED_COLUMNS = ["slug", "kind", "number", "name", "types", "locationTag"]
SPECIES_LEVEL_FIELDS = ("kind", "number", "name", "scientific", "types")
DATE_FORMATS = ("%Y-%m-%d", "%m/%d/%Y", "%m/%d/%y")
IN_ACTIONS = os.environ.get("GITHUB_ACTIONS") == "true"


def warn(msg):
    print(f"::warning::{msg}" if IN_ACTIONS else f"WARNING: {msg}")


def clean(value):
    return (value or "").strip()


def js(value):
    return json.dumps(value, ensure_ascii=False)


# --------------------------------------------------------------------------
# Read KINDS and FILTERS ids out of data.js so tags can be validated
# --------------------------------------------------------------------------
def read_config_ids(text):
    stripped = re.sub(r"/\*.*?\*/", "", text, flags=re.S)
    stripped = re.sub(r"//[^\n]*", "", stripped)

    def ids(pattern):
        m = re.search(pattern, stripped, flags=re.S)
        return set(re.findall(r'\bid:\s*"([^"]+)"', m.group(1))) if m else set()

    kinds = ids(r"const KINDS\s*=\s*\[(.*?)\];")
    tags = ids(r"const FILTERS\s*=\s*\{(.*?)\n\};")
    if not kinds:
        warn("Could not read KINDS from js/data.js - skipping kind check.")
    if not tags:
        warn("Could not read FILTERS from js/data.js - skipping tag check.")
    return kinds, tags


def resolve_kind(value, kinds):
    if not kinds:
        return value
    v = value.lower()
    for candidate in (v, v + "s", v + "es"):
        if candidate in kinds:
            return candidate
    return None


def parse_date(value):
    if not value:
        return ""
    for fmt in DATE_FORMATS:
        try:
            return datetime.strptime(value, fmt).strftime("%Y-%m-%d")
        except ValueError:
            pass
    return None


# --------------------------------------------------------------------------
# CSV -> species structure
# --------------------------------------------------------------------------
def load_species(csv_path, kinds, tags):
    errors = []
    reported_tags = set()
    species = {}  # slug -> {"fields": {...}, "photos": [...]}

    with open(csv_path, newline="", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        reader.fieldnames = [clean(h) for h in (reader.fieldnames or [])]
        missing = [c for c in REQUIRED_COLUMNS if c not in reader.fieldnames]
        if missing:
            sys.exit(f"ERROR: the CSV is missing required column(s): {', '.join(missing)}")

        for line_no, raw in enumerate(reader, start=2):
            row = {k: clean(v) for k, v in raw.items() if k}
            if not any(row.values()):
                continue  # blank spreadsheet row

            def err(msg):
                errors.append(f"row {line_no} ({row.get('slug') or 'no slug'}): {msg}")

            slug = row["slug"]
            if not re.fullmatch(r"[a-z0-9]+(-[a-z0-9]+)*", slug or ""):
                err('slug must be lowercase letters/numbers separated by dashes (e.g. "brown-pelican")')
                continue
            for col in ("kind", "number", "name", "types", "locationTag"):
                if not row[col]:
                    err(f'"{col}" is empty')

            kind = resolve_kind(row["kind"], kinds) if row["kind"] else None
            if row["kind"] and kind is None:
                err(f'unknown kind "{row["kind"]}" (known: {", ".join(sorted(kinds))})')

            types = [t.strip() for t in re.split(r"[;,]", row["types"]) if t.strip()]
            if tags:
                for t in types + ([row["locationTag"]] if row["locationTag"] else []):
                    if t not in tags and t not in reported_tags:
                        reported_tags.add(t)
                        err(f'unknown tag "{t}" - add it to FILTERS in js/data.js or fix the spelling (other rows using it are not listed again)')

            date = parse_date(row.get("date", ""))
            if date is None:
                err(f'could not read date "{row["date"]}" (use e.g. 2024-05-12 or 5/12/24)')
                date = ""

            fields = {
                "kind": kind or row["kind"],
                "number": row["number"].zfill(3),
                "name": row["name"],
                "scientific": row.get("scientific", ""),
                "types": types,
            }
            entry = species.setdefault(slug, {"fields": fields, "photos": [], "row": line_no})
            for k in SPECIES_LEVEL_FIELDS:
                if fields[k] != entry["fields"][k]:
                    err(f'"{k}" is {fields[k]!r} here but {entry["fields"][k]!r} on row {entry["row"]} - rows of one species must match')

            name, location = row["name"], row.get("location", "")
            src = row.get("src", "")
            alt = row.get("alt", "")
            if not src:
                src = f'images/{fields["kind"]}/no-photo-yet.jpg'
                alt = alt or "Placeholder: no photograph of this species yet"
            elif not alt:
                alt = f"{name} photographed in {location}" if location else name
            if not re.match(r"https?://", src) and not (ROOT / src).exists():
                warn(f"row {line_no} ({slug}): image file not found in repo: {src} (names are case-sensitive)")

            entry["photos"].append({
                "src": src, "alt": alt, "date": date, "location": location,
                "locationTag": row["locationTag"], "notes": row.get("notes", ""),
            })

    seen = {}
    for slug, e in species.items():
        n = e["fields"]["number"]
        if n in seen:
            errors.append(f'number {n} is used by both "{seen[n]}" and "{slug}"')
        seen[n] = slug
    return species, errors


# --------------------------------------------------------------------------
# species structure -> JavaScript
# --------------------------------------------------------------------------
def render_js(species, csv_name):
    out = [
        f"// Generated from {csv_name} by scripts/build_data.py.",
        "// Edit the CSV, not this block - changes made here are overwritten.",
        "const SPECIES = [",
    ]
    for slug, e in species.items():
        f = e["fields"]
        out += [
            "  {",
            f"    slug: {js(slug)},",
            f"    kind: {js(f['kind'])},",
            f"    number: {js(f['number'])},",
            f"    name: {js(f['name'])},",
            f"    scientific: {js(f['scientific'])},",
            f"    types: {js(f['types'])},",
            "    photos: [",
        ]
        for p in e["photos"]:
            out.append("      {")
            for key in ("src", "alt", "date", "location", "locationTag", "notes"):
                out.append(f"        {key}: {js(p[key])},")
            out.append("      },")
        out += ["    ],", "  },"]
    out.append("];")
    return "\n".join(out) + "\n"


def main():
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[1])
    ap.add_argument("--csv", type=Path, default=DEFAULT_CSV)
    ap.add_argument("--data-js", type=Path, default=DEFAULT_DATA_JS)
    args = ap.parse_args()

    if not args.csv.exists():
        sys.exit(f"ERROR: CSV not found: {args.csv}")
    if not args.data_js.exists():
        sys.exit(f"ERROR: data file not found: {args.data_js}")

    text = args.data_js.read_text(encoding="utf-8")
    pattern = re.compile(
        r"(?P<begin>^[ \t]*" + re.escape(BEGIN) + r"[^\n]*\n)(?P<body>.*?)(?P<end>^[ \t]*" + re.escape(END) + r")",
        re.S | re.M,
    )
    if not pattern.search(text):
        sys.exit(
            f"ERROR: {args.data_js.name} has no marker lines. Replace the whole `const SPECIES = [...];` "
            f"block with these two lines, then run again:\n\n{BEGIN}\n{END}\n"
        )

    kinds, tags = read_config_ids(text)
    species, errors = load_species(args.csv, kinds, tags)
    if errors:
        print(f"\n{len(errors)} problem(s) in {args.csv.name} - nothing was changed:\n")
        for e in errors:
            print(f"  - {e}")
            if IN_ACTIONS:
                print(f"::error::{e}")
        sys.exit(1)

    new_text = pattern.sub(
        lambda m: m.group("begin") + render_js(species, args.csv.name) + m.group("end"), text, count=1
    )
    photos = sum(len(e["photos"]) for e in species.values())
    if new_text == text:
        print(f"No changes: {len(species)} species / {photos} photos already up to date.")
    else:
        args.data_js.write_text(new_text, encoding="utf-8")
        print(f"Updated {args.data_js.name}: {len(species)} species / {photos} photos.")


if __name__ == "__main__":
    main()
