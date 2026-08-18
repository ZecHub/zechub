// Front-matter parity between an English source page and its translations.
//
// A page's leading YAML block is metadata, not prose: whatever `site/<page>.md`
// declares, every `translations/<locale>/site/<page>.md` must declare the same.
// Nothing about a publication date changes between languages.
//
// This is not a style rule. Jekyll builds the GitHub Pages copy of this repo
// straight from `main`, and it reads a leading `---` as a front-matter opener,
// scans to the next `---` far down the page, and fails the WHOLE build if what
// lies between is not valid YAML. That is what happened on 2026-08-14: one
// translated page acquired a `---` its source did not have, and the published
// site stayed frozen for four days.
//
// The other three shapes below do not break the build. They are worse in one
// respect — nothing reports them at all:
//
//   duplicated opener   `---` / `---` / `published: <date>` / `---`
//                       Jekyll consumes the empty first block, so the date
//                       lands in the body and the `---` under it turns the line
//                       into a setext H2 heading.
//   translated key      `wotae:`, `iliyochapishwa:`, `wotintimii:`, `bipụtara:`
//                       — the date is still there and nothing can read it.
//   lost opener         the opening `---` gone, the closing one surviving; the
//                       page has no front matter and the line renders as a
//                       heading.
//
// 316 pages carried one of these before #1975. A first-line comparison (the
// check this repo's generator used to run) sees only the first shape, because
// as soon as the source legitimately has front matter the first lines match.

// Jekyll reads pages as `bom|utf-8` and strips U+FEFF BEFORE matching front
// matter, so `﻿---` IS an opener to it. Judge the text the way it will.
const stripBom = (text) => (text.charCodeAt(0) === 0xfeff ? text.slice(1) : text);

// Line endings are not part of the comparison: a CRLF source and an LF
// translation carry the same metadata.
const bare = (lines) => lines.map((l) => l.replace(/\r$/, ""));

// Jekyll anchors both delimiters at column 1 — a line reading ` ---` is body,
// not a delimiter — so an indented lookalike must not be read as front matter
// here either, in EITHER file.
const OPENER = /^---[ \t]*\r?$/;
const CLOSER = /^(---|\.\.\.)[ \t]*\r?$/;

/**
 * The leading front-matter block, as Jekyll would find it.
 * @returns {{block: string[], end: number} | null} — null when the file has
 * none, including an opener that never closes (to Jekyll that is a failed
 * parse, not a block).
 */
export function parseFrontMatter(text) {
  const lines = stripBom(text).split("\n");
  if (!lines.length || !OPENER.test(lines[0])) return null;
  for (let i = 1; i < lines.length; i += 1) {
    if (CLOSER.test(lines[i])) return { block: lines.slice(1, i), end: i + 1 };
  }
  return null;
}

const keysOf = (block) =>
  block
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => (l.match(/^([A-Za-z_][A-Za-z0-9_-]*):/) || [])[1] || l.split(":")[0].trim());

/**
 * @returns {{code: string, message: string} | null} — null when the translation
 * agrees with its source.
 */
// Not a YAML parser — this repo has no dependencies and needs none: every block
// in the corpus is one flat `key: value` line. Anything else is rejected rather
// than guessed at, because a block Jekyll cannot parse fails the whole build,
// and comparing two files for PARITY would happily pass a broken block that both
// of them share.
function unparseableLine(block) {
  return block
    .map((l) => l.replace(/\r$/, ""))
    .find((line) => {
      const l = line.trim();
      if (!l) return false;
      const m = l.match(/^([A-Za-z_][A-Za-z0-9_-]*):(?:[ \t]+(.*))?$/);
      if (!m) return true; // not `key: value` at all
      const value = (m[2] || "").trim();
      if (!value) return false; // an empty value is valid YAML (null)
      // A properly closed quoted scalar is valid whatever it contains — that is
      // what quoting is for — so judge it on the quoting alone.
      if (/^["']/.test(value)) return !/^"[^"]*"$/.test(value) && !/^'[^']*'$/.test(value);
      // Unquoted: a leading YAML indicator opens a structure this block is not
      // allowed to have, and a bare `: ` inside the value is the classic
      // "mapping values are not allowed here" build failure.
      return /^[[\]{}&*!|>%@`#]/.test(value) || /:\s/.test(value);
    });
}

export function frontMatterViolation(srcText, transText) {
  const src = parseFrontMatter(srcText);
  const transLines = stripBom(transText).split("\n");
  const firstContent = transLines.findIndex((l) => l.trim());

  // Front matter is anchored at the very start of the file. A blank line above
  // an otherwise perfect block means the page has NO front matter, and the
  // block renders as a rule plus a setext heading.
  if (firstContent > 0 && OPENER.test(transLines[firstContent])) {
    return { code: "unanchored", message: "front matter does not start at the first line of the file" };
  }

  const opens = transLines.length > 0 && OPENER.test(transLines[0]);

  if (!src) {
    return opens
      ? { code: "stray-opener", message: "opens with a '---' the English source does not have (breaks the Jekyll build)" }
      : null;
  }
  if (!opens) return { code: "dropped", message: "has no front matter, but its English source does" };

  if (transLines.length > 1 && CLOSER.test(transLines[1])) {
    return { code: "duplicated-opener", message: "opens with an empty front-matter block ahead of the real one" };
  }

  const trans = parseFrontMatter(transText);
  if (!trans) return { code: "unterminated", message: "opens with '---' that never closes" };

  const want = bare(src.block);
  const got = bare(trans.block);

  const badSrc = unparseableLine(want);
  if (badSrc !== undefined) {
    return { code: "invalid", message: `its English source's front matter is not flat \`key: value\` (${badSrc.trim()}) — fix the source page first` };
  }
  const badTrans = unparseableLine(got);
  if (badTrans !== undefined) {
    return { code: "invalid", message: `front matter is not flat \`key: value\` (${badTrans.trim()}) — Jekyll fails the whole build on a block it cannot parse` };
  }

  if (want.join("\n") === got.join("\n")) return null;

  const wantKeys = keysOf(want);
  const gotKeys = keysOf(got);
  const detail =
    wantKeys.join(",") === gotKeys.join(",")
      ? `values differ from the source (${got.filter(Boolean).join("; ")} vs ${want.filter(Boolean).join("; ")})`
      : `keys ${gotKeys.join(", ") || "(none)"} != source ${wantKeys.join(", ") || "(none)"}`;
  return { code: "mismatch", message: `front matter differs from its English source — ${detail}` };
}
