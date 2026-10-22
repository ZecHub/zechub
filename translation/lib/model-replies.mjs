// Model replies saved as translations (ZecHub/zechub#2467).
//
// An LLM asked to translate a fragment with no text in it ("---", "## B") can
// answer with prose ABOUT the request ("Please provide the Markdown fragment
// you would like me to translate...") and the runner saved that as the
// translation: 85 lines in 20 Indonesian pages, the A-Z headings of Zcash
// Library among them. No other gate sees it: the line is valid Markdown in a
// Latin script, and a heading stays a heading.
//
// The openings live in translation/model-replies.json, shared with the
// translation runner. A line is checked after its Markdown markers are
// stripped; fenced code, HTML comments and front matter are skipped, and a
// line that the English page itself contains (a quoted English sentence) is
// never flagged.
import { readFileSync } from "node:fs";

const DEFAULT_LIST = new URL("../model-replies.json", import.meta.url);

export function loadPatterns(path = DEFAULT_LIST) {
  const data = JSON.parse(readFileSync(path, "utf8"));
  if (!Array.isArray(data.patterns) || data.patterns.length === 0)
    throw new Error("model-replies.json has no patterns");
  return data.patterns.map(({ id, re }) => {
    if (typeof id !== "string" || typeof re !== "string") throw new Error(`bad pattern entry: ${JSON.stringify({ id, re })}`);
    if (!re.startsWith("^")) throw new Error(`pattern ${id} must be anchored with ^`);
    return { id, re: new RegExp(re, "i") };
  });
}

// "## Foo", "- Foo", "> Foo", "1. Foo", "| Foo |", "**Foo**" -> "Foo"
export function stripMarkers(line) {
  let s = line.trim();
  for (let i = 0; i < 4; i++) {
    const before = s;
    s = s.replace(/^#{1,6}\s+/, "")
      .replace(/^>\s*/, "")
      .replace(/^(?:[-*+]|\d+[.)])\s+/, "")
      .replace(/^\|\s*/, "")
      .replace(/^(?:\*\*|__|\*|_)(?=\S)/, "")
      .trim();
    if (s === before) break;
  }
  return s;
}

function proseLines(text) {
  const out = [];
  const lines = text.split(/\r?\n/);
  let fence = null, comment = false, i = 0;
  if (lines[0]?.trim() === "---") {
    // Skip front matter only when it is closed: an unclosed "---" on line 1
    // must not hide the rest of the page.
    const end = lines.findIndex((l, j) => j > 0 && l.trim() === "---");
    if (end > 0) i = end + 1;
  }
  for (; i < lines.length; i++) {
    const raw = lines[i];
    const t = raw.trim();
    if (fence) { if (t.startsWith(fence)) fence = null; continue; }
    const f = t.match(/^(```|~~~)/);
    if (f) { fence = f[1]; continue; }
    if (comment) { if (t.includes("-->")) comment = false; continue; }
    if (t.startsWith("<!--") && !t.includes("-->")) { comment = true; continue; }
    out.push({ line: i + 1, raw });
  }
  return out;
}

// -> [{ line, id, text }]
export function findModelReplies(trText, enText = "", patterns = loadPatterns()) {
  const english = new Set(proseLines(enText).map((l) => stripMarkers(l.raw).toLowerCase()).filter(Boolean));
  const found = [];
  for (const { line, raw } of proseLines(trText)) {
    const s = stripMarkers(raw);
    if (!s || english.has(s.toLowerCase())) continue;
    const hit = patterns.find((p) => p.re.test(s));
    if (hit) found.push({ line, id: hit.id, text: s });
  }
  return found;
}

// ---------------------------------------------------------------------------
// Structural check (idea from @chairulakmal's review of #2470).
//
// Models often answer in the TARGET language ("Пожалуйста, пришлите сам
// Markdown-фрагмент...", "Bitte sende den neuen englischen Block."), which no
// list of English openings catches. But such a reply always sits where the
// English had a block with nothing to translate: a "---"/"***"/"___" rule, an
// HTML tag alone on its line, or a heading of one or two characters. Those
// blocks must come through unchanged, so: align the English and translated
// blocks by shape, and report translated text that took the place of one.
//
// The English must be the version the page was translated from (sync-state's
// src_commit); against a newer English, a stale but correct translation would
// not line up.

// "hr:---", "html:img", "html:/div", "h:## B", or null for a normal line.
// (A setext heading "B\n---" is a two-line block; see setextAnchor.)
export function anchorKey(line) {
  const t = line.trim();
  if (/^(?:-{3,}|\*{3,}|_{3,})$/.test(t)) return "hr:" + t;
  const tag = t.match(/^<(\/?)([a-zA-Z][a-zA-Z0-9-]*)\b[^<>]*\/?>$/);
  if (tag) return "html:" + tag[1] + tag[2].toLowerCase();
  const h = t.match(/^#{1,6}\s+(.*)$/);
  if (h && [...h[1].trim()].length <= 2) return "h:" + t.replace(/\s+/g, " ");
  return null;
}

// Blank-line separated blocks; a blank line inside a code fence does not split.
export function splitBlocks(text) {
  const out = [];
  let cur = [], start = 0, fence = null;
  text.split(/\r?\n/).forEach((l, i) => {
    const t = l.trim();
    if (fence) { if (t.startsWith(fence)) fence = null; }
    else { const f = t.match(/^(```|~~~)/); if (f) fence = f[1]; }
    if (!fence && t === "" ) { if (cur.length) out.push({ start, lines: cur }); cur = []; return; }
    if (!cur.length) start = i + 1;
    cur.push(l);
  });
  if (cur.length) out.push({ start, lines: cur });
  return out;
}

// "B\n---" / "B\n===": a setext heading of one or two characters.
function setextAnchor(lines) {
  if (lines.length !== 2 || !/^(?:=+|-+)$/.test(lines[1].trim())) return null;
  const t = lines[0].trim();
  return t && [...t].length <= 2 ? `h:setext:${t}` : null;
}

function blockKey(b) {
  if (b.lines.length === 1) { const a = anchorKey(b.lines[0]); if (a) return a; }
  const sx = setextAnchor(b.lines);
  if (sx) return sx;
  const f = b.lines[0].trim();
  if (/^(```|~~~)/.test(f)) return "code";
  const h = f.match(/^(#{1,6})\s/);
  if (h) return "h" + h[1].length;
  if (f.startsWith("|")) return "table";
  if (f.startsWith(">")) return "quote";
  if (/^(?:[-*+]|\d+[.)])\s/.test(f)) return "list";
  if (f.startsWith("<")) return "html";
  if (f.startsWith("![")) return "img";
  return "p";
}

const isAnchorKey = (k) => k.includes(":");

// -> [{ line, id: "replaced-<kind>", text, english }]
export function findReplacedAnchors(trText, enText) {
  if (!enText) return [];
  const E = splitBlocks(enText), T = splitBlocks(trText);
  const a = E.map(blockKey), b = T.map(blockKey);
  if (!a.some(isAnchorKey)) return [];
  const n = a.length, m = b.length;
  const found = [];
  const report = (ei, tj) => {
    const tb = T[tj];
    const anchor = E[ei].lines.map((l) => l.trim()).join("\n");
    // The rule kept, with the next line glued to it ("---\n## Glossary").
    if (E[ei].lines.length === 1 && (tb.lines[0].trim() === anchor || tb.lines.at(-1).trim() === anchor)) return;
    const text = tb.lines.map((l) => l.trim()).join(" ");
    found.push({ line: tb.start, id: `replaced-${a[ei].split(":")[0]}`, text, english: anchor });
  };
  // Same number of blocks: the usual case, and the one a reply produces (it
  // takes the anchor's place one for one). Pair blocks in order.
  if (n === m) {
    a.forEach((k, i) => { if (isAnchorKey(k) && !isAnchorKey(b[i])) report(i, i); });
    return found;
  }
  // Otherwise (a block merged or split somewhere) align by shape: weighted
  // LCS over block keys (pages are a few hundred blocks at most). A pair of
  // same-kind blocks scores 1, plus up to 1 when their lengths are alike, so a
  // paragraph pairs with its translation rather than with a short reply.
  const len = (blk) => blk.lines.join(" ").length;
  const la = E.map(len), lb = T.map(len);
  const score = (i, j) => 1 + Math.min(la[i], lb[j]) / Math.max(la[i], lb[j], 1);
  const L = Array.from({ length: n + 1 }, () => new Float64Array(m + 1));
  for (let i = n - 1; i >= 0; i--)
    for (let j = m - 1; j >= 0; j--)
      L[i][j] = Math.max(L[i + 1][j], L[i][j + 1], a[i] === b[j] ? L[i + 1][j + 1] + score(i, j) : 0);
  const pairs = [];
  for (let i = 0, j = 0; i < n && j < m;) {
    if (a[i] === b[j] && L[i][j] === L[i + 1][j + 1] + score(i, j)) { pairs.push([i, j]); i++; j++; }
    else if (L[i + 1][j] >= L[i][j + 1]) i++;
    else j++;
  }
  pairs.push([n, m]);

  let pi = -1, pj = -1;
  for (const [i, j] of pairs) {
    const eg = [], tg = [];
    for (let k = pi + 1; k < i; k++) eg.push(k);
    for (let k = pj + 1; k < j; k++) tg.push(k);
    if (eg.some((k) => isAnchorKey(a[k])) && tg.length) {
      if (eg.length === tg.length) {
        // Same number of blocks on both sides: pair them in order.
        eg.forEach((ek, x) => { if (isAnchorKey(a[ek]) && !isAnchorKey(b[tg[x]])) report(ek, tg[x]); });
      } else {
        const ek = eg.find((k) => isAnchorKey(a[k]));
        for (const tk of tg) if (!isAnchorKey(b[tk])) report(ek, tk);
      }
    }
    pi = i; pj = j;
  }
  return found;
}
