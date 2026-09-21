// Regression suite for check-brand-spelling.mjs.
//
// Every case here is a defect that shipped, or a rule added in response to one.
// The gate has one failure mode that matters — the mask latches on and stops
// emitting real lines, so findings vanish and the run still exits 0. Six
// variants of that were found by feeding it hostile markdown and none by
// reading the code, which is why this file exists.
//
// Two layers:
//   proseMask cases   — unit, no git, assert a line is visible or masked
//   end-to-end cases  — a throwaway repo, run the real script, assert on the
//                       annotations it emits (this is what covers the rules
//                       deciding WHAT counts as a misspelling, plus escaping)
//
// Run: node scripts/check-brand-spelling.test.mjs
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";

const GATE = new URL("./check-brand-spelling.mjs", import.meta.url);
const src = readFileSync(GATE, "utf8");
const proseMask = new Function(
  src.slice(src.indexOf("function proseMask"), src.indexOf("function changedEnglishFiles")) +
  "; return proseMask;")();

let failed = 0;
const fail = (name, want, got) => { failed++; console.log(`  FAIL ${name}\n       want ${want}\n       got  ${got}`); };

// ---- layer 1: masking -----------------------------------------------------
const vis = (md, n) => { const l = proseMask(md)[n - 1]; return l && l.trim() ? "visible" : "masked"; };

const maskCases = [
  // things that must stay masked
  ["fenced code",                  "# T\n\n```\nZechub\n```\n", 4, "masked"],
  ["nested fence",                 "# T\n\n````\n```\nZechub\n```\n````\n", 5, "masked"],
  ["multiline <pre>",              "# T\n\n<pre>\nZechub\n</pre>\n", 4, "masked"],
  ["uppercase <PRE>",              "# T\n\n<PRE>\nZechub\n</PRE>\n", 4, "masked"],
  ["<pre> with attributes",        "# T\n\n<pre class=\"x\" data-y=\"z\">\nZechub\n</pre>\n", 4, "masked"],
  ["true indented code",           "# T\n\n    Zechub code\n", 3, "masked"],
  ["single-line comment",          "# T\n\n<!-- Zechub -->\n", 3, "masked"],
  ["unclosed fence to EOF",        "# T\n\n```\nZechub\n", 4, "masked"],
  ["unclosed <pre> to EOF",        "# T\n\n<pre>\nZechub\n", 4, "masked"],
  // things that must stay visible — each one was a fail-open
  ["prose after a fenced <pre>",   "# T\n\n```\n<pre>\n```\n\nZechub\n", 7, "visible"],
  ["<pre> literal in a fence",     "```\n<pre>\n```\nFree2z\n", 4, "visible"],
  ["fence line inside a <pre>",    "<pre>\n```\n</pre>\nFree2z here\n", 4, "visible"],
  ["<pre> literal in a comment",   "<!--\n<pre>\n-->\nFree2z\n", 4, "visible"],
  ["list continuation, not code",  "# T\n\n- a\n    - Zechub\n", 4, "visible"],
  // a continuation paragraph carries no marker of its own — it was masked,
  // so a misspelling in it was silently missed
  ["list continuation PARAGRAPH",  "- a\n\n    Zechub continues the item\n", 3, "visible"],
  ["numbered list continuation",   "1. a\n\n    Zechub continues\n", 3, "visible"],
  ["indented code after the list", "- a\n\nplain para\n\n    Zechub code\n", 5, "masked"],
  ["prose beside a closing tag",   "# T\n\n<pre>\nx\n</pre> Zechub\n", 5, "visible"],
  ["prose beside a one-liner",     "# T\n\n<code>x</code> Zechub\n", 3, "visible"],
  ["prose after <code/>",          "# T\n\n<code/>\n\nZechub\n", 5, "visible"],
  ["plain prose",                  "# T\n\nZechub here\n", 3, "visible"],
];
for (const [n, md, line, want] of maskCases) {
  const got = vis(md, line);
  if (got !== want) fail(`mask: ${n}`, want, got);
}

// ---- layer 2: the whole gate, against a real repo --------------------------
const repo = join(tmpdir(), `brandgate-${process.pid}`);
rmSync(repo, { recursive: true, force: true });
mkdirSync(join(repo, "site"), { recursive: true });
mkdirSync(join(repo, "scripts"), { recursive: true });
mkdirSync(join(repo, "translation"), { recursive: true });
mkdirSync(join(repo, "site/zechubglobal/zcashitaly/guides"), { recursive: true });
const git = (...a) => execFileSync("git", ["-C", repo, ...a], { encoding: "utf8" });

writeFileSync(join(repo, "translation/protected-terms.json"), JSON.stringify({
  // "ZK-SNARKs" is declared ONLY as an equivalent form, so under the key
  // "zk-snarks" the set is built as {ZK-SNARK, ZK-SNARKs} — the plural arrives
  // SECOND. Any "just take the first form" shortcut then answers "ZK-SNARK"
  // for a plural misspelling, which is what the plural case below catches.
  preserveVerbatim: ["Free2Z", "ZecHub", "Zcash", "zcashd", "Ledger", "sETH", "LeoDex",
                     "Viewing Key", "ZK-SNARK", "Now or Never", "Now or Nevers"],
  // A product whose own name contains "or": without the guard, the pair rule
  // reads "Now or Never" + " or " + "Now or Nevers" out of ordinary prose.
  equivalentForms: [["ZK-SNARK", "ZK-SNARKs"], ["Now or Never", "Now or Nevers"]],
}, null, 2) + "\n");
writeFileSync(join(repo, "scripts/check-brand-spelling.mjs"), src);
git("init", "-q");
git("config", "user.email", "t@t"); git("config", "user.name", "t");
git("add", "-A"); git("commit", "-qm", "base", "--no-verify");
git("branch", "-M", "main");
git("checkout", "-qb", "pr");

const probes = {
  "site/a.md":            "# A\n\nProse with Zechub and Free2z here.\n",
  "site/lower.md":        "# L\n\nthe ledger is public and zcash is money.\n",
  "site/caps.md":         "# C\n\n## ZCASH ECOSYSTEM DIGEST | JULY 6\n\nBut ZCASH alone in prose.\n",
  "site/caps_url.md":     "# U\n\nZCASH: https://lower.case/path\n",
  "site/seth.md":         "# S\n\nSeth Hertlein joined the podcast.\n",
  "site/attrs.md":        "# I\n\n<img src=\"/content-images/Free2z-banner.webp\" alt=\"b\"/>\n",
  "site/equiv.md":        "# E\n\nA ZK-SNARKs proof and a ZK-SNARK proof.\n",
  // the gate's own `want` text, pasted into the page: both halves are correct
  // spellings, so the spelling rule is blind to it
  "site/suggestion.md":   "# S\n\nSee [ZK-SNARKs or ZK-SNARK](/zcash-tech/zk-snarks) for proofs.\n",
  // two DIFFERENT terms joined by "or" is ordinary prose, not a suggestion
  "site/orprose.md":      "# O\n\nUse a Ledger or LeoDex to hold it.\n",
  "site/orterm.md":       "# T\n\nThe Ledger or LeoDex pairing is fine here.\n",
  // wrong case on a multi-form term: the finding must name ONE form
  "site/pluralcase.md":   "# P\n\nA Zk-Snarks proof verifies it.\n",
  // the singular, wrong case: the answer must be the singular form even though
  // the plural is declared first
  "site/singularcase.md": "# G\n\nOne Zk-Snark proof verifies it.\n",
  "site/odd, name.md":    "# N\n\nProse with Zechub in a comma path.\n",
  // git quotes a non-ASCII path unless -z is used, and the quoted form fails
  // startsWith("site/") — the page was skipped in silence
  "site/café.md":         "# C\n\nProse with Zechub in an accented path.\n",
  // the SAME form twice is not the gate's suggestion text, just odd prose
  "site/samepair.md":     "# S\n\nA ZK-SNARKs or ZK-SNARKs proof.\n",
  "site/orname.md":       "# O\n\nThe Now or Never or Now or Nevers release.\n",
  // the unrouted archive: same defect, must never be reported
  "site/zechubglobal/zcashitaly/guides/g.md": "# G\n\nProse with Zechub and Free2z here.\n",
};
for (const [p, body] of Object.entries(probes)) writeFileSync(join(repo, p), body);
git("add", "-A"); git("commit", "-qm", "pr", "--no-verify");

// The exit STATUS is the only thing CI acts on, so capture it. Asserting only
// on annotations let the gate be reduced to a no-op that still prints findings
// and exits 0 — every case green, CI silently never failing again.
function runGate(cwd) {
  try {
    return { status: 0, out: execFileSync("node", [join(repo, "scripts/check-brand-spelling.mjs"), "--base", "main"],
                                          { cwd, encoding: "utf8" }) };
  } catch (e) { return { status: e.status ?? 1, out: (e.stdout || "") + (e.stderr || "") }; }
}
const dirty = runGate(repo);
const out = dirty.out;

const ann = out.split("\n").filter((l) => l.startsWith("::error"));

// The JSON shape is a consumed interface — scripts apply `want` — so assert on
// it directly rather than parsing it back out of the annotations.
let jsonFindings = [];
try {
  jsonFindings = JSON.parse(execFileSync("node",
    [join(repo, "scripts/check-brand-spelling.mjs"), "--base", "main", "--json"],
    { cwd: repo, encoding: "utf8" })).findings;
} catch (e) { jsonFindings = JSON.parse(((e.stdout || "").match(/\{[\s\S]*\}/) || ["{\"findings\":[]}"])[0]).findings; }
const has = (frag) => ann.some((l) => l.includes(frag));
const count = (frag) => ann.filter((l) => l.includes(frag)).length;

// The corpus sweep is a separate code path with its own file listing, and it
// is the one an operator runs to size the backlog.
let allFindings = [];
try {
  allFindings = JSON.parse(execFileSync("node",
    [join(repo, "scripts/check-brand-spelling.mjs"), "--all", "--json"],
    { cwd: repo, encoding: "utf8" })).findings;
} catch (e) { allFindings = JSON.parse(((e.stdout || "").match(/\{[\s\S]*\}/) || ['{"findings":[]}'])[0]).findings; }

// A second repo whose changed page is clean: proves the gate exits 0 when it
// should, so "always fails" is not how the status assertions get satisfied.
const cleanRepo = join(tmpdir(), `brandgate-clean-${process.pid}`);
rmSync(cleanRepo, { recursive: true, force: true });
mkdirSync(join(cleanRepo, "site"), { recursive: true });
mkdirSync(join(cleanRepo, "scripts"), { recursive: true });
mkdirSync(join(cleanRepo, "translation"), { recursive: true });
const cgit = (...a) => execFileSync("git", ["-C", cleanRepo, ...a], { encoding: "utf8" });
writeFileSync(join(cleanRepo, "translation/protected-terms.json"),
              readFileSync(join(repo, "translation/protected-terms.json"), "utf8"));
writeFileSync(join(cleanRepo, "scripts/check-brand-spelling.mjs"), src);
cgit("init", "-q");
cgit("config", "user.email", "t@t"); cgit("config", "user.name", "t");
cgit("add", "-A"); cgit("commit", "-qm", "base", "--no-verify");
cgit("branch", "-M", "main"); cgit("checkout", "-qb", "pr");
writeFileSync(join(cleanRepo, "site/clean.md"), "# C\n\nProse with ZecHub and Free2Z here.\n");
cgit("add", "-A"); cgit("commit", "-qm", "pr", "--no-verify");
const clean = runGate(cleanRepo);

const e2e = [
  // the gate must fire
  ["flags Zechub",                  () => has('not "Zechub"')],
  ["flags Free2z",                  () => has('not "Free2z"')],
  ["flags a lone ZCASH in prose",   () => has('not "ZCASH"')],
  // …and must not
  ["ignores lowercase ledger",      () => !has('"Ledger"')],
  ["ignores lowercase zcash",       () => !has('not "zcash"')],
  ["ignores an all-caps heading",   () => count('file=site/caps.md') === 1],
  ["caps rule reads the RAW line",  () => has("file=site/caps_url.md")],
  ["ignores Seth the person",       () => !has('not "Seth"')],
  ["ignores a brand in src=",       () => !has("file=site/attrs.md")],
  ["equivalentForms satisfy",       () => !has("file=site/equiv.md")],
  // site/zechubglobal/ ships nowhere and holds 73% of the backlog
  ["skips the unrouted archive",    () => !has("file=site/zechubglobal/")],
  ["…but still flags a live page",  () => has("file=site/a.md")],
  // annotation plumbing
  ["escapes a comma in the path",   () => has("site/odd%2C name.md")],
  ["reports line and col",          () => ann.every((l) => /line=\d+,col=\d+/.test(l))],
  ["column points at the term",     () => has("line=3,col=12")],   // "Prose with Zechub"
  // the gate must not bless its own suggestion text (this shipped: an autofix
  // wrote `want` verbatim and the gate passed the page)
  ["flags pasted suggestion text",  () => has("file=site/suggestion.md")],
  ["says it is a suggestion",       () => has("is a suggestion, not a spelling")],
  ["reports the pair once",         () => count("file=site/suggestion.md") === 1],
  ["leaves \"Ledger or LeoDex\"",    () => !has("file=site/orprose.md")],
  // `want` is read by scripts, so it must name exactly one form
  ["want names one form",           () => jsonFindings.every((v) => !/ or /.test(v.want))],
  ["alternatives carry the rest",   () => jsonFindings.some((v) => v.alternatives?.length)],
  ["want keeps the plural",         () => jsonFindings.some((v) => v.found === "Zk-Snarks" && v.want === "ZK-SNARKs")],
  ["want keeps the singular",       () => jsonFindings.some((v) => v.found === "Zk-Snark" && v.want === "ZK-SNARK")],
  ["alternatives exclude want",     () => jsonFindings.every((v) => !(v.alternatives || []).includes(v.want))],
  // a term that legitimately contains "or" must not be read as a form pair
  ["no pair rule for an 'or' term", () => !has("file=site/orterm.md")],
  ["scans a non-ASCII filename",    () => jsonFindings.some((v) => v.file.includes("caf") && v.found === "Zechub")],
  ["--all scans it too",            () => allFindings.some((v) => v.file.includes("caf"))],
  ["a term containing 'or'",        () => !jsonFindings.some((v) => v.file === "site/orname.md" && v.kind === "suggestion-text")],
  ["one form twice is not a pair",  () => !jsonFindings.some((v) => v.file === "site/samepair.md" && v.kind === "suggestion-text")],
  ["findings carry a kind",         () => jsonFindings.every((v) => v.kind === "spelling" || v.kind === "suggestion-text")],
  // exit status — the only thing CI reads
  ["exits 1 when findings exist",   () => dirty.status === 1],
  ["exits 0 when the page is clean",() => clean.status === 0],
  ["clean run emits no annotations",() => !clean.out.includes("::error")],
  // --json is consumed by scripts: a clean run must still parse as JSON, and
  // it did not — the human summary was appended to stdout after the object
  ["clean --json parses",           () => { try {
      const o = execFileSync("node", [join(cleanRepo, "scripts/check-brand-spelling.mjs"), "--base", "main", "--json"],
                             { cwd: cleanRepo, encoding: "utf8" });
      return JSON.parse(o).findings.length === 0;
    } catch { return false; } }],
];
for (const [n, f] of e2e) { let ok = false; try { ok = f(); } catch { ok = false; }
  if (!ok) fail(`gate: ${n}`, "true", "false"); }

rmSync(repo, { recursive: true, force: true });
rmSync(cleanRepo, { recursive: true, force: true });
const total = maskCases.length + e2e.length;
console.log(failed ? `${failed}/${total} failing` : `all ${total} cases correct`);
process.exit(failed ? 1 : 0);
