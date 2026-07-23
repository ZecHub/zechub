// Extract a menu/title label from a Markdown page, per the agreed contract:
//   1. front-matter `menuTitle:` (preferred) or `title:` — the human override
//      channel; lives in the page file so it survives manifest regeneration.
//   2. first ATX heading (# then ##) OUTSIDE a fenced code block, with HTML
//      stripped (image-only heading -> its alt text), markdown inline syntax
//      removed, and HTML entities decoded.
//   3. otherwise null — the caller OMITS the entry and the frontend falls back
//      (never emit an empty or filename-derived title into the manifest).
//
// Pure string -> string|null: unit-testable, shared by the content generator.

const FENCE_RE = /^(\s*)(```+|~~~+)/;

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#x([0-9a-fA-F]+);/g, (m, h) => cp(parseInt(h, 16), m))
    .replace(/&#(\d+);/g, (m, n) => cp(Number(n), m));
}
// Safe codepoint decode — a malformed numeric entity must not crash the run.
function cp(n, original) {
  try { return String.fromCodePoint(n); } catch { return original; }
}

// Remove markdown INLINE emphasis/code markers without touching intraword
// underscores (e.g. `zcash_cli` must stay `zcash_cli`, not `zcashcli`).
function stripInline(t) {
  return t
    .replace(/`([^`]+)`/g, "$1") // `code`
    .replace(/\*\*([^*]+)\*\*/g, "$1") // **bold**
    .replace(/__([^_]+)__/g, "$1") // __bold__
    .replace(/~~([^~]+)~~/g, "$1") // ~~strike~~
    .replace(/\*([^*]+)\*/g, "$1") // *italic*
    .replace(/[*`~]/g, "") // residual/unpaired markers (asterisk/backtick/tilde)
    .replace(/(?<!\S)_+|_+(?!\S)/g, ""); // isolated/boundary underscores; keep intraword (zcash_cli)
}

// Pull a usable label out of a raw heading's inner text (after the `#`s).
function cleanHeadingText(raw) {
  let t = raw;
  // Image-only heading (HTML <img> or markdown ![alt](url)) -> use alt text.
  const stripped = t.replace(/<[^>]+>/g, "").replace(/!\[[^\]]*\]\([^)]*\)/g, "").trim();
  if (!stripped) {
    const htmlAlt = t.match(/<img[^>]*\balt\s*=\s*["']([^"']+)["']/i);
    const mdAlt = t.match(/!\[([^\]]+)\]\([^)]*\)/);
    if (htmlAlt) t = htmlAlt[1];
    else if (mdAlt) t = mdAlt[1];
  }
  t = t.replace(/<[^>]+>/g, ""); // strip HTML tags
  t = t.replace(/!\[[^\]]*\]\([^)]*\)/g, ""); // drop leftover image markdown
  t = t.replace(/\[([^\]]*)\]\([^)]*\)/g, "$1"); // link -> its text
  t = stripInline(t);
  t = decodeEntities(t);
  t = t.replace(/\s+/g, " ").trim();
  t = t.replace(/\s*#+\s*$/, "").trim(); // trailing ATX closing hashes
  return t;
}

// Locate a REAL leading YAML frontmatter block. Returns [startLine, closeLine]
// or null. A leading `---` is only frontmatter if it closes with another `---`
// AND the block contains at least one YAML `key: value` line — otherwise it's a
// `---` thematic break (horizontal rule) wrapping markdown content (common in
// this corpus: `---` / `# Heading` / prose / `---`), which must NOT be skipped.
function frontmatterRange(lines) {
  if (lines[0] !== "---") return null;
  let close = -1;
  for (let i = 1; i < lines.length; i++) if (lines[i] === "---") { close = i; break; }
  if (close === -1) return null; // no closing fence -> not frontmatter
  const isYamlKey = (l) => /^\s*[A-Za-z_][\w.-]*\s*:(\s|$)/.test(l);
  if (!lines.slice(1, close).some(isYamlKey)) return null; // no key -> thematic break, not frontmatter
  return [1, close];
}

// Read a top-level `menuTitle:`/`title:` from a real frontmatter block.
function frontmatterTitle(normalized) {
  const lines = normalized.split("\n");
  const range = frontmatterRange(lines);
  if (!range) return null;
  const fm = lines.slice(range[0], range[1]);
  const pick = (key) => {
    for (const line of fm) {
      const m = line.match(new RegExp(`^${key}\\s*:\\s*(.+?)\\s*$`, "i"));
      if (m) {
        let v = m[1].trim();
        if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
        v = v.trim();
        if (v) return v;
      }
    }
    return null;
  };
  return pick("menuTitle") ?? pick("title"); // menuTitle wins over title
}

export function extractTitle(text) {
  const normalized = text.replace(/\r\n?/g, "\n"); // normalize FIRST (frontmatter + headings)
  const override = frontmatterTitle(normalized);
  if (override) return override;

  const lines = normalized.split("\n");
  // Skip a REAL frontmatter block (not a `---` thematic break) so a `#` YAML
  // comment inside it is never mistaken for the page's H1.
  const range = frontmatterRange(lines);
  const start = range ? range[1] + 1 : 0;
  let inFence = false;
  let fenceTok = null;
  let firstH2 = null;
  for (let i = start; i < lines.length; i++) {
    const line = lines[i];
    const fence = line.match(FENCE_RE);
    if (inFence) {
      if (fence && fence[2][0] === fenceTok[0] && fence[2].length >= fenceTok.length) { inFence = false; fenceTok = null; }
      continue;
    }
    if (fence) { inFence = true; fenceTok = fence[2]; continue; }
    const h = line.match(/^(#{1,6})\s+(.+?)\s*$/);
    if (!h) continue;
    const level = h[1].length;
    const label = cleanHeadingText(h[2]);
    if (!label) continue;
    if (level === 1) return label;
    if (level === 2 && firstH2 === null) firstH2 = label;
  }
  return firstH2; // may be null
}
