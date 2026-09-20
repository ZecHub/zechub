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
const git = (...a) => execFileSync("git", ["-C", repo, ...a], { encoding: "utf8" });

writeFileSync(join(repo, "translation/protected-terms.json"), JSON.stringify({
  preserveVerbatim: ["Free2Z", "ZecHub", "Zcash", "zcashd", "Ledger", "sETH", "LeoDex",
                     "Viewing Key", "ZK-SNARK", "ZK-SNARKs"],
  equivalentForms: [["ZK-SNARK", "ZK-SNARKs"]],
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
  "site/odd, name.md":    "# N\n\nProse with Zechub in a comma path.\n",
};
for (const [p, body] of Object.entries(probes)) writeFileSync(join(repo, p), body);
git("add", "-A"); git("commit", "-qm", "pr", "--no-verify");

let out = "";
try {
  out = execFileSync("node", [join(repo, "scripts/check-brand-spelling.mjs"), "--base", "main"],
                     { cwd: repo, encoding: "utf8" });
} catch (e) { out = (e.stdout || "") + (e.stderr || ""); }

const ann = out.split("\n").filter((l) => l.startsWith("::error"));
const has = (frag) => ann.some((l) => l.includes(frag));
const count = (frag) => ann.filter((l) => l.includes(frag)).length;

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
  // annotation plumbing
  ["escapes a comma in the path",   () => has("site/odd%2C name.md")],
  ["reports line and col",          () => ann.every((l) => /line=\d+,col=\d+/.test(l))],
  ["column points at the term",     () => has("line=3,col=12")],   // "Prose with Zechub"
];
for (const [n, f] of e2e) { let ok = false; try { ok = f(); } catch (e) { ok = false; }
  if (!ok) fail(`gate: ${n}`, "true", "false"); }

rmSync(repo, { recursive: true, force: true });
const total = maskCases.length + e2e.length;
console.log(failed ? `${failed}/${total} failing` : `all ${total} cases correct`);
process.exit(failed ? 1 : 0);
