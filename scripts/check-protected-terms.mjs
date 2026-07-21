// Validate that protected Zcash ecosystem terms are preserved verbatim in
// translated wiki pages.
//
// Usage: node scripts/check-protected-terms.mjs   (run from the content repo root)
//
// This script is locale-generic. It walks the translations/ tree for whatever
// locale folders exist (translations/<locale>/site/...), maps each translated
// Markdown file back to its English source under site/, and checks that every
// protected term present in the source also appears in the translation.
//
// It passes cleanly (exit 0) when there are no translations yet, so the
// tooling is self-consistent before any translated corpus lands.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = new URL("../", import.meta.url).pathname;
const config = JSON.parse(
  readFileSync(join(root, "translation/protected-terms.json"), "utf8"),
);

const translationsDir = join(root, "translations");

// Collect every translated Markdown file under translations/<locale>/site/...
function walk(dir) {
  let out = [];
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) {
      out = out.concat(walk(p));
    } else if (entry.name.endsWith(".md")) {
      out.push(p);
    }
  }
  return out;
}

// A translated page is anything matching translations/<locale>/site/<rel>.md
// We derive its English source as site/<rel>.md.
function sourceForTranslation(absTranslated) {
  const rel = relative(translationsDir, absTranslated); // <locale>/site/<rel>
  const parts = rel.split(/[\\/]/);
  if (parts.length < 3 || parts[1] !== "site") return null;
  const sourceRel = join("site", ...parts.slice(2));
  return sourceRel;
}

const terms = config.preserveVerbatim ?? [];
let failures = 0;
let checked = 0;
let skippedNoSource = 0;

for (const translatedAbs of walk(translationsDir)) {
  // Skip non-page docs (e.g. TRANSLATION_STATUS.md at the translations/ root).
  const sourceRel = sourceForTranslation(translatedAbs);
  if (!sourceRel) continue;

  const sourceAbs = join(root, sourceRel);
  if (!existsSync(sourceAbs) || !statSync(sourceAbs).isFile()) {
    // Translation with no matching English source — flag but don't hard-fail
    // the protected-terms gate on it.
    console.warn(
      `${relative(root, translatedAbs)}: no English source at ${sourceRel} (skipped)`,
    );
    skippedNoSource += 1;
    continue;
  }

  const source = readFileSync(sourceAbs, "utf8");
  const translated = readFileSync(translatedAbs, "utf8");
  const translatedRel = relative(root, translatedAbs);
  checked += 1;

  for (const term of terms) {
    // Word-boundary match so short terms don't false-positive inside other
    // words (e.g. "mining" must not match "deter*mining*"; "chain" is still
    // satisfied by "block*chain*" only via the standalone token's boundaries).
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(`(?<![A-Za-z0-9])${escaped}(?![A-Za-z0-9])`);
    if (re.test(source) && !re.test(translated)) {
      console.error(`${translatedRel}: missing protected term "${term}"`);
      failures += 1;
    }
  }
}

if (failures > 0) {
  console.error(
    `Protected terminology validation failed with ${failures} missing term(s).`,
  );
  process.exit(1);
}

if (checked === 0) {
  console.log(
    "Protected terminology validation passed (no translated pages to check).",
  );
} else {
  const extra = skippedNoSource ? ` (${skippedNoSource} without an English source skipped)` : "";
  console.log(
    `Protected terminology validation passed for ${checked} translated page(s)${extra}.`,
  );
}
