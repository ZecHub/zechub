// Page hygiene gate for ENGLISH pages: link syntax, dropped anchors, line endings.
//
// Four defects that CI was green on, all found by a human reading a diff:
//
//   1. `[Trezor](https://wiki.trezor.io/Zcash_%28ZEC%29))` — percent-encoding a
//      URL left the link's own closing paren behind, so the page renders a
//      literal `)` in a heading. Shipped in a merged PR.
//   2. `[501(c)(3)](https://en.wikipedia.org/wiki/501(c)(3)_organization)(3)_organization)`
//      — a repoint duplicated the tail of the URL. Markdown closes the link at
//      the first balanced paren, so the rest renders as visible junk.
//   3. Seven table-of-contents links lost their `#section` anchors in one
//      repoint, every entry landing on the same bare page.
//   4. A tool rewrote CRLF pages as LF, turning a 12-line edit into a 198-line
//      diff of invisible churn that no gate could see.
//
// Scope follows the brand gate: a page a PR TOUCHES is checked IN FULL, so the
// backlog drains one page at a time rather than in a single sweep. Unlike the
// brand gate this one includes site/zechubglobal/, because the whole corpus
// carries only five link-syntax defects — there is no wall of failures to
// protect an author from, and link rot concentrates in those mirrors.
//
// Every rule is offline. Nothing here resolves a URL over the network; that is
// link-health's job, weekly.
//
// Usage: node scripts/check-page-hygiene.mjs [--base <ref>] [--all] [--json]
import { readFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";

const arg = (n, d = "") => { const i = process.argv.indexOf(n); return i > -1 ? (process.argv[i + 1] ?? d) : d; };
const flag = (n) => process.argv.includes(n);
const base = arg("--base", "origin/main");

const isScannable = (f) => f.startsWith("site/") && f.endsWith(".md");

function changedFiles() {
  if (flag("--all")) {
    return execFileSync("git", ["ls-files", "-z", "site/"], { encoding: "utf8" })
      .split("\0").filter(isScannable);
  }
  return execFileSync("git", ["diff", "--name-only", "-z", "--diff-filter=ACMR", `${base}...HEAD`], { encoding: "utf8" })
    .split("\0").filter(isScannable);
}

// Markdown resolves an inline link at the paren that BALANCES the opener, which
// is why a URL containing parens works and why debris after it renders as text.
// Scanning the same way is the only way to see what a reader will see.
function* links(line) {
  let i = 0;
  for (;;) {
    const j = line.indexOf("](", i);
    if (j < 0) return;
    let k = j + 2, depth = 1;
    while (k < line.length && depth) {
      if (line[k] === "(") depth++;
      else if (line[k] === ")") depth--;
      k++;
    }
    if (depth) return;                       // unterminated: not a link
    yield { open: j + 2, close: k - 1, target: line.slice(j + 2, k - 1) };
    i = k;
  }
}

// GitHub's heading slugs: lowercase, punctuation dropped, spaces to hyphens.
const slug = (h) => h.toLowerCase().trim()
  .replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");

const headingCache = new Map();
function anchorsOf(file) {
  if (headingCache.has(file)) return headingCache.get(file);
  let set = new Set();
  if (existsSync(file)) {
    for (const l of readFileSync(file, "utf8").split("\n")) {
      const m = l.match(/^#{1,6}\s+(.+?)\s*#*\s*$/);
      if (m) set.add(slug(m[1]));
    }
  }
  headingCache.set(file, set);
  return set;
}

// An internal link may be a repo path (site/... or a relative .md) or a route
// (/zcash-tech/zk-snarks). Only a repo path can be resolved to a file here; a
// route is checked against the page that would serve it when one exists.
function resolveInternal(target) {
  const path = target.split("#")[0];
  if (/^https?:/i.test(path)) {
    const m = path.match(/github\.com\/[^/]+\/[^/]+\/blob\/[^/]+\/(.+)$/);
    return m ? m[1] : null;
  }
  if (!path || path.startsWith("mailto:")) return null;
  return path.replace(/^\//, "");
}

function anchorsInLinks(text) {
  const out = [];
  for (const line of text.split("\n"))
    for (const { target } of links(line)) {
      const h = target.indexOf("#");
      if (h > 0) out.push({ target, path: target.slice(0, h), anchor: target.slice(h + 1) });
    }
  return out;
}

const findings = [];
const push = (file, line, col, kind, message) => findings.push({ file, line, col, kind, message });

const files = changedFiles();
for (const f of files) {
  if (!existsSync(f)) continue;
  const raw = readFileSync(f, "latin1");           // byte-faithful: CR must survive
  const text = readFileSync(f, "utf8");
  const lines = text.split("\n");

  // ---- rules 1 and 2: what the reader actually sees ------------------------
  lines.forEach((line, i) => {
    for (const { open, close, target } of links(line)) {
      const after = line.slice(close + 1);
      // Text before the link ITSELF: slicing to `close` would include the
      // link's own "(" and mask every finding — the gate reported a clean
      // corpus while five pages carried the defect.
      const before = line.slice(0, open - 2);
      // A ')' immediately after a link is legitimate when the link sits inside
      // parentheses — "(see [docs](url))" — so the opener has to be missing
      // before it counts. Without that test this rule is 90% false positives.
      const unmatched = (before.match(/\(/g) || []).length - (before.match(/\)/g) || []).length;
      if (after.startsWith(")") && unmatched <= 0)
        push(f, i + 1, close + 2, "stray-close-paren",
             `A ")" follows this link and renders as a literal paren. The link target already ends at "${target.slice(-24)}" — delete the extra ")".`);

      // The debris can itself contain parens — the case that shipped was
      // "(3)_organization)" after a 501(c)(3) URL — so it is taken as the
      // whole adjacent token and only its outer brackets are trimmed. It
      // counts as debris only when the target already contains it, which is
      // what makes "github.com/tailscale/tailscale for this" (a space, then
      // prose) and ordinary trailing punctuation silent.
      const token = after.split(/\s/)[0] || "";
      const debris = token.replace(/^[([]+/, "").replace(/[)\].,;:]+$/, "");
      if (debris.length >= 5 && target.includes(debris))
        push(f, i + 1, close + 2, "url-debris",
             `"${token}" repeats part of the link target and renders as visible text. The link closes at the balanced paren — delete the repeat.`);
    }
  });

  if (flag("--all")) continue;                     // rules 3 and 4 need a base

  let baseText = null;
  // stdio: a file added by this PR makes `git show base:f` fail loudly; that is
  // an expected outcome here, not something to print.
  try { baseText = execFileSync("git", ["show", `${base}:${f}`], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }); }
  catch { baseText = null; }                       // new file: nothing to compare
  if (baseText === null) continue;

  // ---- rule 3: an anchor dropped while the heading still exists ------------
  // Silent when the target heading is gone: the English Raspberry Pi guide was
  // rewritten for Zebra and Zallet, so #installing-zcashd does not exist any
  // more and dropping it is the RIGHT edit. This only fires where the anchor is
  // still live, which makes it a rule an author can always satisfy.
  const head = anchorsInLinks(text);
  const stillLinked = new Set(head.map((l) => l.target));
  for (const { target, path, anchor } of anchorsInLinks(baseText)) {
    if (stillLinked.has(target)) continue;
    const file = resolveInternal(path);
    if (!file || !existsSync(file)) continue;
    if (!anchorsOf(file).has(anchor.toLowerCase())) continue;   // heading gone: correct to drop
    push(f, 1, 1, "anchor-dropped",
         `This change drops the link to "${path}#${anchor}", and that heading still exists in ${file}. Keep the anchor, or link the section that replaced it.`);
  }

  // ---- rule 4: line endings flipped ---------------------------------------
  const style = (s) => (s.includes("\r\n") ? "CRLF" : "LF");
  if (style(baseText) !== style(raw))
    push(f, 1, 1, "line-endings-changed",
         `Line endings changed ${style(baseText)} -> ${style(raw)}. Every line shows as modified, which hides the real edit — write the file back in its original style.`);
}

if (flag("--json")) {
  console.log(JSON.stringify({ findings, files: files.length }, null, 2));
} else {
  // Workflow commands are comma-separated, so a path with a comma or colon
  // truncates the annotation and it lands on the wrong file or nowhere.
  const escData = (x) => String(x).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
  const escProp = (x) => escData(x).replace(/,/g, "%2C").replace(/:/g, "%3A");
  for (const v of findings)
    console.log(`::error file=${escProp(v.file)},line=${v.line},col=${v.col}::${escData(`${v.kind}: ${v.message}`)}`);
}

if (findings.length) {
  const kinds = [...new Set(findings.map((f) => f.kind))].join(", ");
  console.error(`\npage hygiene FAILED — ${findings.length} issue(s) in ${new Set(findings.map((f) => f.file)).size} changed page(s): ${kinds}.`);
  console.error(`A page a PR touches is checked in full, so touching a page means bringing its links to a working state. Every rule here is about what the reader sees on the rendered page.`);
  process.exit(1);
}
console.log(`page hygiene OK — ${files.length} changed page(s).`);
