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
import { readFileSync, existsSync, statSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";

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

// A fenced block and an inline code span are SHOWN, not rendered: a page that
// documents markdown syntax is full of deliberately broken links. Scanning
// them reported three false positives on one probe page. Blanking keeps column
// numbers honest, so an annotation still lands on the right character.
function maskCode(lines) {
  const blank = (l) => " ".repeat(l.length);
  let fence = null;
  return lines.map((l) => {
    const f = l.match(/^\s*(`{3,}|~{3,})/);
    if (f) {
      if (fence === null) fence = f[1];
      else if (f[1][0] === fence[0] && f[1].length >= fence.length) fence = null;
      return blank(l);
    }
    if (fence !== null) return blank(l);
    return l.replace(/(`{1,4})[^\n]*?\1/g, blank);
  });
}

// GitHub's heading slugs: lowercase, punctuation dropped, spaces to hyphens.
// GitHub keeps unicode letters and digits, drops other punctuation, maps
// spaces to hyphens, and disambiguates a repeated heading with -1, -2, ...
const slug = (h) => h.toLowerCase().trim()
  .replace(/[^\p{L}\p{N}\s-]/gu, "").replace(/\s+/g, "-");

const headingCache = new Map();
function anchorsOf(file) {
  if (headingCache.has(file)) return headingCache.get(file);
  let set = new Set();
  if (existsSync(file)) {
    const seen = new Map();
    for (const l of readFileSync(file, "utf8").split("\n")) {
      const m = l.match(/^#{1,6}\s+(.+?)\s*#*\s*$/);
      if (!m) continue;
      const base = slug(m[1]);
      const n = seen.get(base) ?? 0;
      seen.set(base, n + 1);
      set.add(n ? `${base}-${n}` : base);      // the 2nd "Overview" is #overview-1
    }
  }
  headingCache.set(file, set);
  return set;
}

// What an anchored link can point at, in this corpus: 90 same-page anchors
// (a table of contents inside one page) and 161 external URLs. ZERO repo paths
// and zero app routes — which is why the first version of this rule, written
// for the repo-path shape, could not fire on a single link in the wiki.
//
// So: same-page anchors resolve against the page's own headings, a relative or
// repo-relative .md path resolves as a file, and a github .../blob/... link is
// unwrapped to its path. App routes (/zcash-tech/x#y) are OUT of scope: mapping
// a route to a file needs the frontend's own URI transform, which link-health
// owns and keeps in step with the app. A route link is skipped, never guessed.
function resolveInternal(path, fromFile) {
  if (path === "") return fromFile;                        // same-page anchor
  if (/^https?:/i.test(path)) {
    const m = path.match(/github\.com\/[^/]+\/[^/]+\/blob\/[^/]+\/(.+)$/);
    return m ? m[1] : null;
  }
  if (path.startsWith("mailto:")) return null;
  if (!/\.md$/i.test(path)) return null;                   // app route: not ours to resolve
  return path.startsWith("/") ? path.replace(/^\//, "") : join(dirname(fromFile), path);
}

function anchorsInLinks(text, file) {
  const out = [];
  for (const line of maskCode(text.split("\n")))
    for (const { target } of links(line)) {
      const h = target.indexOf("#");
      if (h < 0) continue;                                 // no anchor
      out.push({ target, path: target.slice(0, h), anchor: target.slice(h + 1), file });
    }
  return out;
}

const findings = [];
const push = (file, line, col, kind, message) => findings.push({ file, line, col, kind, message });

let files;
try { files = changedFiles(); }
catch (e) { console.error(`cannot list changed files against ${base}: ${e.message.split("\n")[0]}`); process.exit(2); }

// `${base}...HEAD` diffs against the MERGE BASE; reading the old text from the
// tip of main instead blames this PR for whatever main changed meanwhile —
// a line-ending normalisation on main made an untouched file look rewritten.
let mergeBase = base;
try { mergeBase = execFileSync("git", ["merge-base", base, "HEAD"], { encoding: "utf8" }).trim() || base; } catch { /* keep base */ }
for (const f of files) {
  if (!existsSync(f)) continue;
  // A submodule is a gitlink: the path exists, ends in .md, and reading it
  // throws EISDIR, which would fail the whole gate for an unrelated reason.
  let raw, text;
  try {
    if (!statSync(f).isFile()) continue;
    raw = readFileSync(f, "latin1");               // byte-faithful: CR must survive
    text = readFileSync(f, "utf8");
  } catch { continue; }
  const lines = maskCode(text.split("\n"));

  // ---- rules 1 and 2: what the reader actually sees ------------------------
  // Paren balance carries across a paragraph: "(as described in the\n[report](url))."
  // opens on one line and closes on the next, and a line-local count called
  // that legitimate prose a defect. A blank line ends the paragraph.
  let carried = 0;
  lines.forEach((line, i) => {
    if (!line.trim()) { carried = 0; return; }
    for (const { open, close, target } of links(line)) {
      const after = line.slice(close + 1);
      // Text before the link ITSELF: slicing to `close` would include the
      // link's own "(" and mask every finding — the gate reported a clean
      // corpus while five pages carried the defect.
      const before = line.slice(0, open - 2);
      // A ')' immediately after a link is legitimate when the link sits inside
      // parentheses — "(see [docs](url))" — so the opener has to be missing
      // before it counts. Without that test this rule is 90% false positives.
      // ":)" and ";-)" carry a ")" that is not closing anything. Counting them
      // cancelled the real "(" in "It means :) (see [x](url))." and the gate
      // reported that legitimate prose.
      const prose = before.replace(/[:;=8]-?[)(]/g, "");
      const unmatched = carried + (prose.match(/\(/g) || []).length - (prose.match(/\)/g) || []).length;
      if (after.startsWith(")") && unmatched <= 0)
        push(f, i + 1, close + 2, "stray-close-paren",
             `A ")" follows this link and renders as a literal paren. The link target already ends at "${target.slice(-24)}" — delete the extra ")".`);

      // The debris can itself contain parens — the case that shipped was
      // "(3)_organization)" after a 501(c)(3) URL — so it is taken as the
      // whole adjacent token and only its outer brackets are trimmed. It
      // counts as debris only when the target already contains it, which is
      // what makes "github.com/tailscale/tailscale for this" (a space, then
      // prose) and ordinary trailing punctuation silent.
      // The defect shape is a parenthesised fragment of the URL left outside
      // the link: "...organization)" followed by "(3)_organization)". Requiring
      // the leading "(" is what separates it from ordinary adjacent text —
      // "[repo](https://github.com/tailscale/tailscale)tailscale" is legal
      // markdown and was being flagged.
      const token = after.split(/\s/)[0] || "";
      const debris = token.startsWith("(") ? token.replace(/^\(+/, "").replace(/[)\].,;:]+$/, "") : "";
      if (debris.length >= 5 && target.includes(debris))
        push(f, i + 1, close + 2, "url-debris",
             `"${token}" repeats part of the link target and renders as visible text. The link closes at the balanced paren — delete the repeat.`);
    }
    // Carry the line's own balance, with link targets removed so a URL's
    // parens never leak into the paragraph count.
    const outsideLinks = line.replace(/\]\([^\n]*?\)/g, "").replace(/[:;=8]-?[)(]/g, "");
    carried = Math.max(0, carried + (outsideLinks.match(/\(/g) || []).length - (outsideLinks.match(/\)/g) || []).length);
  });

  if (flag("--all")) continue;                     // rules 3 and 4 need a base

  let baseText = null;
  // stdio: a file added by this PR makes `git show base:f` fail loudly; that is
  // an expected outcome here, not something to print.
  try { baseText = execFileSync("git", ["show", `${mergeBase}:${f}`], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }); }
  catch { baseText = null; }                       // new file: nothing to compare
  if (baseText === null) continue;

  // ---- rule 3: an anchor dropped while the heading still exists ------------
  // Silent when the target heading is gone: the English Raspberry Pi guide was
  // rewritten for Zebra and Zallet, so #installing-zcashd does not exist any
  // more and dropping it is the RIGHT edit. This only fires where the anchor is
  // still live, which makes it a rule an author can always satisfy.
  //
  // Compared per TARGET PATH, not per full target: repointing #installing-zcashd
  // to #installing-zebrad is an edit, not a loss, and the earlier version
  // flagged it with a message telling the author to do what they had just done.
  const headByPath = new Map();
  for (const l of anchorsInLinks(text, f)) {
    if (!headByPath.has(l.path)) headByPath.set(l.path, new Set());
    headByPath.get(l.path).add(l.anchor);
  }
  const reported = new Set();
  for (const { path, anchor } of anchorsInLinks(baseText, f)) {
    if (headByPath.get(path)?.size) continue;              // still anchored: an edit, not a loss
    const file = resolveInternal(path, f);
    if (!file || !existsSync(file)) continue;
    if (!anchorsOf(file).has(anchor.toLowerCase())) continue;   // heading gone: correct to drop
    const key = `${path}#${anchor}`;
    if (reported.has(key)) continue;
    reported.add(key);
    push(f, 1, 1, "anchor-dropped",
         `This change drops the link to "${key}", and that heading still exists in ${file}. Keep the anchor, or point the link at the section that replaced it.`);
  }

  // ---- rule 4: line endings flipped ---------------------------------------
  // Three states, not two: "contains a CRLF" called a mixed file CRLF, so a
  // rewrite that moved the CRLFs around compared equal and passed.
  const style = (t) => {
    const crlf = (t.match(/\r\n/g) || []).length;
    const lf = (t.match(/(?<!\r)\n/g) || []).length;
    return crlf && lf ? "mixed" : crlf ? "CRLF" : "LF";
  };
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
