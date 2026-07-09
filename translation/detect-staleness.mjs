// Deterministic translation-staleness detector.
//
// Compares the recorded source hash in translation/sync-state.json against the
// CURRENT normalized hash of each English source page, per curated locale, and
// classifies every (locale, page) pair. No LLM, no network, no secrets — just a
// tree walk and a JSON diff. Reports; never mutates translations, never merges.
//
// This is the shared brain: the upstream GitHub Action runs it to update the
// public staleness dashboard, and the operator sync agent runs it to build its
// work list. Same code, same verdicts.
//
// Classifications per (locale, page):
//   fresh   — recorded src == current normalized source hash.
//   stale   — source changed; a translation exists and must be re-synced.
//   missing — page is curated but this locale has no translation (a gap).
//   orphan  — the English source is gone but a translation/manifest entry
//             remains; the translation must be DELETED (the frontend prefers
//             translations over English, so an orphan serves stale content
//             forever). Rename reconciliation is left to the operator agent.
// Plus, informationally:
//   uncurated — a non-global page exists in site/ but is not in the curated
//               list (candidate to add, or intentionally out of scope).
//
// A `stale` (or `orphan`) page is additionally flagged `highSeverity` when the
// English change touches security/deprecation/warning content — those must not
// wait for the weekly window. Severity is judged on the DELTA when the prior
// source is reachable via git (run the Action with fetch-depth: 0), else it
// falls back to scanning the current source. It fails safe: unsure -> not
// flagged high only downgrades urgency, never correctness.
//
// Usage:
//   node translation/detect-staleness.mjs [--json out.json] [--markdown out.md]
// Always exits 0 (reporting only). Run from the content repo root.

import { readFileSync, writeFileSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";
import { execFileSync } from "node:child_process";
import { hashPage } from "./lib/normalize-hash.mjs";

const root = new URL("../", import.meta.url).pathname;

function arg(name) {
  const i = process.argv.indexOf(name);
  return i >= 0 ? process.argv[i + 1] : undefined;
}

const curatedList = readFileSync(join(root, "translation/curated-pages.txt"), "utf8")
  .split("\n")
  .map((s) => s.trim())
  .filter(Boolean);
const curatedSet = new Set(curatedList);

const manifest = JSON.parse(
  readFileSync(join(root, "translation/sync-state.json"), "utf8"),
);
const locales = Object.keys(manifest).sort();

// Signals that an English change is safety-critical. Deliberately broad: a
// false positive just triggers an earlier sync; a false negative delays a real
// safety fix behind the weekly window.
const SECURITY_PATTERNS = [
  /\bwarn(?:ing|ed|s)?\b/i,
  /\bcaution\b/i,
  /\bdanger(?:ous)?\b/i,
  /\bsecur(?:e|ity)\b/i,
  /\bdeprecat/i,
  /\bphishing\b/i,
  /\bscam\b/i,
  /\bmalware\b/i,
  /\bseed\s+phrase\b/i,
  /\brecovery\s+phrase\b/i,
  /\bprivate\s+key\b/i,
  /\bnever\s+(?:share|send|give)\b/i,
  /\bdo\s+not\s+(?:share|send|use|install)\b/i,
  /\bvulnerab/i,
  /\bexploit\b/i,
  /\bno\s+longer\s+(?:safe|supported|maintained)\b/i,
];

function isSecurityText(text) {
  return SECURITY_PATTERNS.some((re) => re.test(text));
}

// Fetch a page's text at a specific commit, or null if unreachable (shallow
// clone, garbage-collected commit, path didn't exist there).
function sourceAtCommit(page, commit) {
  if (!commit || commit === "HEAD") return null;
  try {
    return execFileSync("git", ["show", `${commit}:site/${page}`], {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });
  } catch {
    return null;
  }
}

// Decide whether a stale change is safety-critical. Prefer the delta (lines
// added or removed) when the prior source is reachable; else scan current.
function judgeSeverity(page, currentText, srcCommit) {
  const prior = sourceAtCommit(page, srcCommit);
  if (prior === null) {
    // No prior text: flag if the current page is security-related at all.
    return isSecurityText(currentText) ? "current-scan" : null;
  }
  const before = new Set(prior.split("\n"));
  const after = new Set(currentText.split("\n"));
  const added = [...after].filter((l) => !before.has(l));
  const removed = [...before].filter((l) => !after.has(l));
  const changed = [...added, ...removed].join("\n");
  return isSecurityText(changed) ? "delta" : null;
}

function currentSourceHash(page) {
  const abs = join(root, "site", page);
  if (!existsSync(abs) || !statSync(abs).isFile()) return null;
  const text = readFileSync(abs, "utf8"); // read once — hash and text from the same bytes
  return { hash: hashPage(text), text };
}

// Tracked translation files for a locale (relative to translations/<loc>/site/).
function translationFiles(loc) {
  try {
    const out = execFileSync("git", ["ls-files", `translations/${loc}/site/`], { cwd: root, encoding: "utf8" });
    return out.split("\n").filter((p) => p.endsWith(".md")).map((p) => p.replace(`translations/${loc}/site/`, ""));
  } catch {
    return [];
  }
}

function translationExists(loc, page) {
  const abs = join(root, "translations", loc, "site", page);
  return existsSync(abs) && statSync(abs).isFile();
}

// ---- classify -------------------------------------------------------------

const findings = []; // {locale, page, status, engine, highSeverity, severityBasis, sinceCommit}

// Union of curated pages, pages any manifest entry mentions, AND pages that
// actually have a translation file on disk. The last is essential: a translation
// whose source was deleted AND whose manifest entry was lost (bad conflict
// resolution) would otherwise be invisible — exactly the dangerous, permanently-
// served orphan the design must never miss.
const allPages = new Set(curatedList);
for (const loc of locales) {
  for (const p of Object.keys(manifest[loc])) allPages.add(p);
  for (const p of translationFiles(loc)) allPages.add(p);
}

const sourceHashCache = new Map();
function sourceInfo(page) {
  if (!sourceHashCache.has(page)) sourceHashCache.set(page, currentSourceHash(page));
  return sourceHashCache.get(page);
}

for (const page of [...allPages].sort()) {
  const src = sourceInfo(page);
  for (const loc of locales) {
    const entry = manifest[loc][page];
    const hasFile = translationExists(loc, page);

    if (src === null) {
      // English source is gone.
      if (entry || hasFile) {
        let highSeverity = false;
        let severityBasis = null;
        // Deleting a safety page is itself worth surfacing urgently.
        const prior = sourceAtCommit(page, entry?.src_commit);
        if (prior && isSecurityText(prior)) {
          highSeverity = true;
          severityBasis = "deleted-security-page";
        }
        findings.push({
          locale: loc, page, status: "orphan", engine: entry?.engine ?? null,
          highSeverity, severityBasis, sinceCommit: entry?.src_commit ?? null,
        });
      }
      continue;
    }

    if (!curatedSet.has(page)) {
      // Source still exists but the page was DE-CURATED. A lingering translation
      // (or manifest entry) will keep being served and will drift from the
      // source unnoticed — surface it so it gets deleted or re-curated.
      if (entry || hasFile) {
        findings.push({
          locale: loc, page, status: "decurated", engine: entry?.engine ?? null,
          highSeverity: false, severityBasis: null, sinceCommit: entry?.src_commit ?? null,
        });
      }
      continue;
    }

    if (!entry || !hasFile) {
      findings.push({
        locale: loc, page, status: "missing",
        engine: entry?.engine ?? null, highSeverity: false, severityBasis: null,
        sinceCommit: null,
      });
      continue;
    }

    if (entry.src !== src.hash) {
      const basis = judgeSeverity(page, src.text, entry.src_commit);
      findings.push({
        locale: loc, page, status: "stale", engine: entry.engine,
        highSeverity: basis !== null, severityBasis: basis,
        sinceCommit: entry.src_commit,
      });
    }
    // else fresh — not recorded as a finding.
  }
}

// Uncurated non-global source pages (informational; not per-locale).
function walkSourcePages() {
  const out = execFileSync("git", ["ls-files", "site/"], { cwd: root, encoding: "utf8" });
  return out.split("\n")
    .filter((p) => p.endsWith(".md") && !p.startsWith("site/zechubglobal/"))
    .map((p) => p.replace(/^site\//, ""));
}
const uncurated = walkSourcePages().filter((p) => !curatedSet.has(p)).sort();

// ---- summarize ------------------------------------------------------------

const byStatus = { stale: 0, missing: 0, orphan: 0, decurated: 0 };
const highSev = findings.filter((f) => f.highSeverity);
for (const f of findings) byStatus[f.status] = (byStatus[f.status] ?? 0) + 1;

const perLocale = {};
for (const loc of locales) {
  perLocale[loc] = { stale: 0, missing: 0, orphan: 0, decurated: 0, highSeverity: 0 };
}
for (const f of findings) {
  if (perLocale[f.locale][f.status] === undefined) perLocale[f.locale][f.status] = 0;
  perLocale[f.locale][f.status] += 1;
  if (f.highSeverity) perLocale[f.locale].highSeverity += 1;
}

const totalCurated = curatedList.length;
const totalPairs = totalCurated * locales.length;
const clean = byStatus.stale === 0 && byStatus.missing === 0 && byStatus.orphan === 0 && byStatus.decurated === 0;

const report = {
  generatedAgainstCommit: (() => {
    try {
      return execFileSync("git", ["rev-parse", "HEAD"], { cwd: root, encoding: "utf8" }).trim();
    } catch { return null; }
  })(),
  totals: { curatedPages: totalCurated, locales: locales.length, pairs: totalPairs, ...byStatus, highSeverity: highSev.length },
  perLocale,
  uncuratedSourcePages: uncurated,
  findings,
};

// ---- outputs --------------------------------------------------------------

const jsonOut = arg("--json");
if (jsonOut) writeFileSync(jsonOut, JSON.stringify(report, null, 2) + "\n");

const mdOut = arg("--markdown");
if (mdOut) writeFileSync(mdOut, renderMarkdown(report));

// human stdout summary
console.log(`Curated: ${totalCurated} pages × ${locales.length} locales = ${totalPairs} pairs`);
console.log(`stale=${byStatus.stale} missing=${byStatus.missing} orphan=${byStatus.orphan} decurated=${byStatus.decurated} high-severity=${highSev.length}`);
if (clean) console.log("Tree is clean — every curated page is fresh in every locale.");
else {
  for (const loc of locales) {
    const s = perLocale[loc];
    if (s.stale || s.missing || s.orphan || s.decurated) {
      console.log(`  ${loc}: stale=${s.stale} missing=${s.missing} orphan=${s.orphan} decurated=${s.decurated}` + (s.highSeverity ? ` HIGH-SEVERITY=${s.highSeverity}` : ""));
    }
  }
}
if (uncurated.length) console.log(`Uncurated source pages (not in any locale): ${uncurated.length} — e.g. ${uncurated.slice(0, 3).join(", ")}`);

// Reporting tool: always succeed.
process.exit(0);

function renderMarkdown(r) {
  const marker = "<!-- translation-staleness-dashboard -->";
  const t = r.totals;
  const clean = t.stale === 0 && t.missing === 0 && t.orphan === 0 && (t.decurated ?? 0) === 0;
  let md = `${marker}\n# 🌐 Translation staleness dashboard\n\n`;
  md += `_Auto-generated by \`translation/detect-staleness.mjs\`. Do not edit by hand — edits are overwritten._\n\n`;
  if (r.generatedAgainstCommit) md += `Against \`${r.generatedAgainstCommit.slice(0, 12)}\` · ${t.curatedPages} curated pages × ${t.locales} locales.\n\n`;
  if (clean) {
    md += `✅ **All ${t.pairs} curated (page × locale) pairs are fresh.** Nothing to sync.\n`;
    if (r.uncuratedSourcePages.length) md += renderUncurated(r);
    return md;
  }
  md += `| | stale | missing | orphan | decurated | high-severity |\n|---|---:|---:|---:|---:|---:|\n`;
  md += `| **total** | ${t.stale} | ${t.missing} | ${t.orphan} | ${t.decurated ?? 0} | ${t.highSeverity} |\n\n`;
  if (t.highSeverity) {
    md += `## 🚨 High-severity (safety-critical — out-of-band sync)\n\n`;
    for (const f of r.findings.filter((x) => x.highSeverity)) {
      md += `- \`${f.page}\` — **${f.locale}** (${f.status}, ${f.engine ?? "?"}${f.severityBasis ? `, ${f.severityBasis}` : ""})\n`;
    }
    md += `\n`;
  }
  md += `## Per-locale\n\n| locale | stale | missing | orphan | decurated |\n|---|---:|---:|---:|---:|\n`;
  for (const loc of Object.keys(r.perLocale).sort()) {
    const s = r.perLocale[loc];
    if (s.stale || s.missing || s.orphan || s.decurated) md += `| ${loc} | ${s.stale} | ${s.missing} | ${s.orphan} | ${s.decurated ?? 0} |\n`;
  }
  md += `\n## Details\n\n`;
  for (const status of ["stale", "orphan", "decurated", "missing"]) {
    const rows = r.findings.filter((f) => f.status === status);
    if (!rows.length) continue;
    md += `### ${status} (${rows.length})\n\n`;
    const byPage = {};
    for (const f of rows) (byPage[f.page] = byPage[f.page] || []).push(f.locale);
    for (const page of Object.keys(byPage).sort()) {
      md += `- \`${page}\` → ${byPage[page].sort().join(", ")}\n`;
    }
    md += `\n`;
  }
  md += renderUncurated(r);
  return md;
}

function renderUncurated(r) {
  if (!r.uncuratedSourcePages.length) return "";
  let md = `## Uncurated source pages\n\nIn \`site/\` but not in \`curated-pages.txt\` (candidates to add, or intentionally out of scope — the frontend serves English for these):\n\n`;
  for (const p of r.uncuratedSourcePages) md += `- \`${p}\`\n`;
  return md + `\n`;
}
