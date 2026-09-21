// Regression suite for check-page-hygiene.mjs.
//
// Every case is a defect that shipped green, or the false positive that the
// rule catching it had to avoid. The two link rules were naive first: "a ')'
// after a link" reported 140 hits of which 135 were "(see [docs](url))", and
// "a repeated substring in the target" flagged github.com/tailscale/tailscale.
// Those two false-positive cases are the reason the rules are shaped as they
// are, so they are asserted here, not just the firing cases.
//
// The gate's own failure mode is silence: a slice that included the link's own
// "(" made every finding disappear while the run still exited 0 and printed a
// clean corpus. Status is asserted on every case for that reason.
//
// Run: node scripts/check-page-hygiene.test.mjs
import { writeFileSync, mkdirSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";

const GATE = new URL("./check-page-hygiene.mjs", import.meta.url).pathname;
let failed = 0;
const fail = (name, want, got) => { failed++; console.log(`  FAIL ${name}\n       want ${want}\n       got  ${got}`); };

// A throwaway repo: base commit, then a PR commit, exactly as CI sees it.
const repo = join(tmpdir(), `hygiene-${process.pid}`);
rmSync(repo, { recursive: true, force: true });
mkdirSync(join(repo, "site/guides"), { recursive: true });
const git = (...a) => execFileSync("git", ["-C", repo, ...a], { encoding: "utf8" });
const w = (p, body) => writeFileSync(join(repo, p), body);

// ---- base -----------------------------------------------------------------
w("site/target.md", "# Target\n\n## Installing zcashd\n\ntext\n\n## Sources\n\ntext\n");
w("site/toc.md", "# T\n\n- [Installing](/site/target.md#installing-zcashd)\n- [Sources](/site/target.md#sources)\n");
w("site/gone.md", "# G\n\n- [Old section](/site/target.md#removed-heading)\n");
w("site/crlf.md", "# C\r\n\r\nA line.\r\n");
w("site/clean.md", "# Clean\n\nSee [docs](https://example.org/a) here.\n");
git("init", "-q");
git("config", "user.email", "t@t"); git("config", "user.name", "t");
git("add", "-A"); git("commit", "-qm", "base", "--no-verify");
git("branch", "-M", "main");
git("checkout", "-qb", "pr");

// ---- the PR ---------------------------------------------------------------
const probes = {
  // rule 1: the paren left behind by percent-encoding (shipped, CI green)
  "site/stray.md": "# S\n\n# [Trezor](https://wiki.trezor.io/Zcash_%28ZEC%29)) #\n",
  // rule 1 must NOT fire: the link sits inside parentheses
  "site/parens.md": "# P\n\nIt is decentralised (see [report](https://messari.io/report/x)).\n",
  // rule 2: a repoint that duplicated the tail of the URL (shipped, CI green)
  "site/debris.md": "# D\n\nA [501(c)(3)](https://en.wikipedia.org/wiki/501(c)(3)_organization)(3)_organization) charity.\n",
  // rule 2 must NOT fire: org and repo legitimately share a name
  "site/repeat.md": "# R\n\nUse [tailscale](https://github.com/tailscale/tailscale) for this.\n",
  // rule 3: anchors dropped while the headings still exist
  "site/toc.md": "# T\n\n- [Installing](/site/target.md)\n- [Sources](/site/target.md)\n",
  // rule 3 must NOT fire: the heading no longer exists, so dropping it is right
  "site/gone.md": "# G\n\n- [Old section](/site/target.md)\n",
  // rule 4: CRLF rewritten as LF
  "site/crlf.md": "# C\n\nA line.\n",
  // a page with a comma in its name, for annotation escaping
  "site/odd, name.md": "# N\n\n# [T](https://x.test/a%29)) #\n",
};
for (const [p, body] of Object.entries(probes)) w(p, body);
git("add", "-A"); git("commit", "-qm", "pr", "--no-verify");

function run(extra = []) {
  try { return { status: 0, out: execFileSync("node", [GATE, "--base", "main", ...extra], { cwd: repo, encoding: "utf8" }) }; }
  catch (e) { return { status: e.status ?? 1, out: (e.stdout || "") + (e.stderr || "") }; }
}
const dirty = run();
const ann = dirty.out.split("\n").filter((l) => l.startsWith("::error"));
const has = (frag) => ann.some((l) => l.includes(frag));
const json = JSON.parse((() => { try { return execFileSync("node", [GATE, "--base", "main", "--json"], { cwd: repo, encoding: "utf8" }); }
  catch (e) { return (e.stdout || "").match(/\{[\s\S]*\}/)[0]; } })()).findings;
const kindsFor = (file) => json.filter((v) => v.file === file).map((v) => v.kind);

// A second repo whose changed page is clean, so "always fails" cannot be how
// the status assertions pass.
const cleanRepo = join(tmpdir(), `hygiene-clean-${process.pid}`);
rmSync(cleanRepo, { recursive: true, force: true });
mkdirSync(join(cleanRepo, "site"), { recursive: true });
const cgit = (...a) => execFileSync("git", ["-C", cleanRepo, ...a], { encoding: "utf8" });
writeFileSync(join(cleanRepo, "site/a.md"), "# A\n\nbase\n");
cgit("init", "-q");
cgit("config", "user.email", "t@t"); cgit("config", "user.name", "t");
cgit("add", "-A"); cgit("commit", "-qm", "base", "--no-verify");
cgit("branch", "-M", "main"); cgit("checkout", "-qb", "pr");
writeFileSync(join(cleanRepo, "site/a.md"), "# A\n\nSee [docs](https://example.org/a) and (also [this](https://example.org/b)).\n");
cgit("add", "-A"); cgit("commit", "-qm", "pr", "--no-verify");
let clean;
try { clean = { status: 0, out: execFileSync("node", [GATE, "--base", "main"], { cwd: cleanRepo, encoding: "utf8" }) }; }
catch (e) { clean = { status: e.status ?? 1, out: (e.stdout || "") + (e.stderr || "") }; }

const cases = [
  // rule 1
  ["flags the stray close paren",     () => kindsFor("site/stray.md").includes("stray-close-paren")],
  ["names the fix in the message",    () => has("delete the extra")],
  ["allows a link inside parens",     () => kindsFor("site/parens.md").length === 0],
  // rule 2
  ["flags duplicated URL debris",     () => kindsFor("site/debris.md").includes("url-debris")],
  ["allows org and repo of one name", () => kindsFor("site/repeat.md").length === 0],
  // rule 3
  ["flags a dropped live anchor",     () => kindsFor("site/toc.md").filter((k) => k === "anchor-dropped").length === 2],
  ["names the heading's file",        () => has("still exists in site/target.md")],
  ["silent when the heading is gone", () => kindsFor("site/gone.md").length === 0],
  // rule 4
  ["flags CRLF rewritten as LF",      () => kindsFor("site/crlf.md").includes("line-endings-changed")],
  ["names both styles",               () => has("CRLF -> LF")],
  // plumbing
  ["escapes a comma in the path",     () => has("site/odd%2C name.md")],
  ["every annotation has line,col",   () => ann.every((l) => /line=\d+,col=\d+/.test(l))],
  ["findings carry a kind",           () => json.every((v) => typeof v.kind === "string" && v.kind)],
  // status — the only thing CI reads
  ["exits 1 when findings exist",     () => dirty.status === 1],
  ["exits 0 when the page is clean",  () => clean.status === 0],
  ["clean run emits no annotations",  () => !clean.out.includes("::error")],
  // --all is the corpus sweep: no base, so the diff rules must not run or throw
  ["--all runs without a base",       () => { const r = run(["--all"]); return r.status === 0 || r.status === 1; }],
];
for (const [n, f] of cases) { let ok = false; try { ok = f(); } catch (e) { ok = false; }
  if (!ok) fail(n, "true", "false"); }

rmSync(repo, { recursive: true, force: true });
rmSync(cleanRepo, { recursive: true, force: true });
console.log(failed ? `${failed}/${cases.length} failing` : `all ${cases.length} cases correct`);
process.exit(failed ? 1 : 0);
