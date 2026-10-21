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
