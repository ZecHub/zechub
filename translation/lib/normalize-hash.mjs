// Normalized-hash module for translation staleness detection.
//
// Staleness is defined as: the current normalized hash of an English source
// page (site/<page>.md) differs from the hash recorded in the manifest
// (translation/sync-state.json) for a given locale. See
// translation/README-sync.md and the translation-sync design for the full
// rationale.
//
// Why a NORMALIZED hash and not a raw git blob SHA: a raw blob SHA flips on any
// byte change — trailing-newline changes, a frontmatter `date:` bump, a
// repo-wide prettier/markdown reformat — none of which mean the translatable
// prose changed. Hashing a normalized form keeps the dashboard reporting real
// translation staleness instead of reformatting noise.
//
// Normalization is deliberately CONSERVATIVE. It only removes churn we can
// strip without risk of hiding a real prose change:
//   1. line endings          CRLF / CR  -> LF
//   2. volatile frontmatter  date-like metadata keys are dropped
//   3. trailing whitespace   stripped per line
//   4. trailing blank lines  collapsed to exactly one final newline
//
// It intentionally does NOT try to canonicalize markdown formatting (heading
// styles, list markers, reflowed paragraphs, blank-line runs inside the body).
// Doing that robustly needs a markdown AST, which the design explicitly defers.
// The asymmetry that justifies erring conservative: OVER-reporting a change
// only costs a little retranslation work, while UNDER-reporting serves a stale
// page to readers permanently (the runtime Google Translate fallback is gone).
// So when in doubt, we let the hash flip.
//
// This module is pure (no filesystem, no process, no clock) so it can be unit
// tested and shared verbatim by the upstream detection Action and the
// operator-side sync agent.

import { createHash } from "node:crypto";

// Frontmatter keys whose values are volatile metadata, not translatable prose.
// Bumping any of these must NOT mark every locale stale. Matched
// case-insensitively against the key at the start of a top-level YAML line.
export const VOLATILE_FRONTMATTER_KEYS = [
  "date",
  "lastmod",
  "last_modified",
  "lastmodified",
  "updated",
  "publishdate",
  "expirydate",
];

const HASH_PREFIX = "sha256:";

// Split a leading YAML frontmatter block (--- ... ---) off the body.
// Returns { frontmatter: string[] | null, body: string }. `frontmatter` is the
// array of raw lines BETWEEN the fences (fences excluded), or null when the
// document has no frontmatter. Only a fence on the very first line counts.
function splitFrontmatter(text) {
  const lines = text.split("\n");
  // Tolerate trailing whitespace on the fence lines (`--- ` from an editor must
  // still be recognized, else the volatile-key stripping silently turns off and
  // a `date:` bump flips every hash).
  const isFence = (l) => /^---\s*$/.test(l);
  if (!isFence(lines[0])) return { frontmatter: null, body: text };
  for (let i = 1; i < lines.length; i++) {
    if (isFence(lines[i])) {
      return {
        frontmatter: lines.slice(1, i),
        body: lines.slice(i + 1).join("\n"),
      };
    }
  }
  // Unterminated fence: treat the whole document as body (don't guess).
  return { frontmatter: null, body: text };
}

// Drop volatile TOP-LEVEL frontmatter lines. A line is volatile only when a
// volatile key sits at column 0 (`<key>:`). Indented/nested lines — e.g. a
// `date:` under an `events:` list item — are real content and are preserved
// verbatim; matching them would silently hide genuine prose changes.
function stripVolatileFrontmatter(fmLines) {
  const volatile = new RegExp(
    `^(?:${VOLATILE_FRONTMATTER_KEYS.join("|")})\\s*:`,
    "i",
  );
  return fmLines.filter((line) => !volatile.test(line));
}

// Produce the canonical normalized text a hash is taken over. Pure string->string.
export function normalizeMarkdown(text) {
  // 0. strip a leading UTF-8 BOM (Windows editors add it; it would otherwise
  //    break first-line frontmatter detection AND flip the hash), and normalize
  //    to Unicode NFC so canonically-equivalent NFC/NFD saves hash identically.
  let normalized = text.replace(/^\uFEFF/, "").normalize("NFC");

  // 1. line endings -> LF
  normalized = normalized.replace(/\r\n?/g, "\n");

  // 2. volatile frontmatter
  const { frontmatter, body } = splitFrontmatter(normalized);
  let out = body;
  if (frontmatter !== null) {
    const kept = stripVolatileFrontmatter(frontmatter);
    out = ["---", ...kept, "---", body].join("\n");
  }

  // 3. trailing whitespace per line — but PRESERVE a Markdown hard line break
  //    (a run of >=2 trailing spaces). Collapsing "line  \n" to "line\n" would
  //    hide a real rendering change (added/removed hard break) → missed
  //    staleness. Incidental trailing whitespace (a single space, or tabs) is
  //    still stripped as churn; a hard break is canonicalized to exactly two
  //    spaces so " x   " and " x  " don't spuriously differ.
  out = out
    .split("\n")
    .map((line) =>
      line.replace(/[ \t]+$/, (run) => (/^ {2,}$/.test(run) ? "  " : "")),
    )
    .join("\n");

  // 4. exactly one final newline (drops trailing blank lines; guarantees a
  //    terminating newline even if the file had none).
  out = out.replace(/\n+$/, "") + "\n";

  return out;
}

// Hash a page's raw text. Returns "sha256:<hex>" over the normalized form.
// The prefix makes the algorithm explicit in the manifest and lets a future
// migration change algorithms without ambiguity.
export function hashPage(text) {
  const normalized = normalizeMarkdown(text);
  const digest = createHash("sha256").update(normalized, "utf8").digest("hex");
  return HASH_PREFIX + digest;
}

// True when two raw page texts normalize to the same bytes.
export function pagesEquivalent(a, b) {
  return normalizeMarkdown(a) === normalizeMarkdown(b);
}
