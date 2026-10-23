#!/usr/bin/env node
// Report image alt-text quality across the English ZecHub wiki.
//
// Findings are advisory: missing/empty/placeholder alt text is reported but does
// not make the process fail. Operational errors (unreadable files/config) still
// exit non-zero so CI does not hide a broken checker.
//
// Usage:
//   node scripts/check-image-alt-text.mjs
//   node scripts/check-image-alt-text.mjs --root site
//   node scripts/check-image-alt-text.mjs --placeholders scripts/image-alt-placeholders.json
//   node scripts/check-image-alt-text.mjs --json image-alt-report.json

import { readFile, readdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const DEFAULT_ROOT = "site";
const DEFAULT_PLACEHOLDERS = "scripts/image-alt-placeholders.json";

function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

function blankPreservingNewlines(s) {
  return s.replace(/[^\n]/g, " ");
}

export function maskNonRenderedCodeAndComments(text) {
  // HTML comments do not render and often contain retired examples.
  let masked = text.replace(/<!--[\s\S]*?-->/g, (m) => blankPreservingNewlines(m));

  const lines = masked.split("\n");
  let fence = null;
  masked = lines.map((line) => {
    const m = line.match(/^\s*(?:[-*+]\s+|\d+[.)]\s+)?(`{3,}|~{3,})/);
    if (m) {
      if (fence === null) fence = m[1];
      else if (m[1][0] === fence[0] && m[1].length >= fence.length) fence = null;
      return " ".repeat(line.length);
    }
    if (fence !== null) return " ".repeat(line.length);

    // Inline code is displayed literally, so image-like syntax inside it is not
    // part of the rendered page. Preserve length to keep source locations sane.
    return line.replace(/(`{1,4})[^\n]*?\1/g, (m) => " ".repeat(m.length));
  }).join("\n");

  return masked;
}

function isEscaped(text, index) {
  let slashes = 0;
  for (let i = index - 1; i >= 0 && text[i] === "\\"; i--) slashes++;
  return slashes % 2 === 1;
}

function findUnescaped(text, needle, start) {
  for (let i = start; i < text.length; i++) {
    if (text[i] === needle && !isEscaped(text, i)) return i;
  }
  return -1;
}

function findBalancedParen(text, start) {
  let depth = 0;
  for (let i = start; i < text.length; i++) {
    if (isEscaped(text, i)) continue;
    if (text[i] === "(") depth++;
    else if (text[i] === ")") {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

export function extractImages(text) {
  const src = maskNonRenderedCodeAndComments(text);
  const images = [];

  // Markdown inline/reference images.
  for (let i = 0; i < src.length - 1; i++) {
    if (src[i] !== "!" || src[i + 1] !== "[" || isEscaped(src, i)) continue;

    const closeAlt = findUnescaped(src, "]", i + 2);
    if (closeAlt < 0) continue;

    const alt = text.slice(i + 2, closeAlt).replace(/\\([\[\]])/g, "$1");
    let j = closeAlt + 1;

    // CommonMark allows whitespace/newlines before a reference label, but not
    // between ] and ( for an inline destination. Keep that distinction.
    if (src[j] === "(") {
      const closeTarget = findBalancedParen(src, j);
      if (closeTarget < 0) continue;
      images.push({ syntax: "markdown", alt });
      i = closeTarget;
      continue;
    }

    while (j < src.length && /[ \t\r\n]/.test(src[j])) j++;
    if (src[j] === "[") {
      const closeRef = findUnescaped(src, "]", j + 1);
      if (closeRef < 0) continue;
      images.push({ syntax: "markdown-reference", alt });
      i = closeRef;
    }
  }

  // Inline/raw HTML images, including multiline tags.
  const htmlImage = /<img\b[\s\S]*?>/gi;
  let m;
  while ((m = htmlImage.exec(src))) {
    const original = text.slice(m.index, htmlImage.lastIndex);
    const altMatch = original.match(/\balt\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);
    images.push({
      syntax: "html",
      alt: altMatch ? (altMatch[1] ?? altMatch[2] ?? altMatch[3] ?? "") : null,
    });
  }

  return images;
}

export function normalizeAlt(alt) {
  return alt.trim().toLowerCase().replace(/\s+/g, " ");
}

// Placeholder alt text comes in two shapes. Some of it is a fixed phrase that
// can be listed ("logo"), and some of it is a family that cannot: `img1` was
// listed while `img2` through `img10` were not, so 36 images carrying a bare
// sequence number were reported as acceptable descriptions. Patterns express
// the family once instead of requiring a new entry each time a page adds
// another numbered image.
//
// Both config shapes are accepted. A bare JSON array keeps working exactly as
// before; an object may carry "exact" and "patterns". Patterns are tested
// against the SAME normalized form as exact entries, so a pattern author does
// not have to account for casing or repeated whitespace.
export function buildPlaceholderMatcher(raw, source = DEFAULT_PLACEHOLDERS) {
  let exactInput;
  let patternInput;

  if (Array.isArray(raw)) {
    exactInput = raw;
    patternInput = [];
  } else if (raw && typeof raw === "object") {
    exactInput = raw.exact ?? [];
    patternInput = raw.patterns ?? [];
    if (!Array.isArray(exactInput) || !Array.isArray(patternInput)) {
      throw new Error(`${source}: "exact" and "patterns" must each be a JSON array of strings`);
    }
  } else {
    throw new Error(
      `${source} must contain a JSON array of strings, ` +
      `or an object with "exact" and/or "patterns" arrays`
    );
  }

  if (![...exactInput, ...patternInput].every((x) => typeof x === "string")) {
    throw new Error(`${source}: every placeholder entry must be a string`);
  }

  const exact = new Set(exactInput.map(normalizeAlt));
  // A malformed pattern is a configuration error, not a finding: it must fail
  // loudly rather than silently match nothing and report a clean corpus.
  const patterns = patternInput.map((source_) => {
    try {
      return new RegExp(source_, "u");
    } catch (error) {
      throw new Error(
        `${source}: ${JSON.stringify(source_)} is not a valid regular expression: ${error.message}`
      );
    }
  });

  return {
    // Shaped like a Set so classifyImage keeps working with a plain Set.
    has(normalized) {
      return exact.has(normalized) || patterns.some((re) => re.test(normalized));
    },
    exact: [...exact].sort(),
    patterns: [...patternInput],
  };
}

export function classifyImage(image, placeholders) {
  if (image.alt === null) return "missing";
  if (image.alt.trim() === "") return "empty";
  if (placeholders.has(normalizeAlt(image.alt))) return "placeholder";
  return "ok";
}

async function walkMarkdown(dir, out = [], excludedDirNames = new Set()) {
  // Missing or unreadable roots are operational errors. Do not silently turn a
  // broken invocation into an empty successful report.
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const path = `${dir}/${entry.name}`;
    if (entry.isDirectory()) {
      if (excludedDirNames.has(entry.name)) continue;
      await walkMarkdown(path, out, excludedDirNames);
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".md")) {
      out.push(path);
    }
  }
  return out;
}

function render(report) {
  const lines = [];
  lines.push("Image alt-text report");
  lines.push("=====================");
  lines.push(
    `Scanned ${report.filesScanned} pages and ${report.totalImages} images: ` +
    `${report.missing + report.empty} missing/empty, ${report.placeholder} placeholder.`
  );
  lines.push(`Placeholder list: ${report.placeholders.join(", ")}`);
  if (report.placeholderPatterns.length) {
    lines.push(`Placeholder patterns: ${report.placeholderPatterns.join(", ")}`);
  }
  lines.push("");

  if (!report.pages.length) {
    lines.push("No alt-text findings.");
    return lines.join("\n");
  }

  lines.push("Issues by page (highest count first)");
  lines.push("------------------------------------");
  for (const page of report.pages) {
    lines.push(
      `${page.issues.toString().padStart(3)}  ${page.path} ` +
      `(images=${page.total}, missing=${page.missing}, empty=${page.empty}, placeholder=${page.placeholder})`
    );
  }

  return lines.join("\n");
}

export async function scanRepository({
  root = DEFAULT_ROOT,
  placeholderFile = DEFAULT_PLACEHOLDERS,
} = {}) {
  const placeholders = buildPlaceholderMatcher(
    JSON.parse(await readFile(placeholderFile, "utf8")),
    placeholderFile,
  );

  // `site/zechubglobal/` is the translated corpus. The default report is
  // intentionally English-only, matching the documented bounty scope.
  const files = (await walkMarkdown(root, [], new Set(["zechubglobal"]))).sort();
  const pages = [];
  let totalImages = 0;
  let missing = 0;
  let empty = 0;
  let placeholder = 0;

  for (const path of files) {
    const images = extractImages(await readFile(path, "utf8"));
    const counts = { missing: 0, empty: 0, placeholder: 0 };

    for (const image of images) {
      const kind = classifyImage(image, placeholders);
      if (kind !== "ok") counts[kind]++;
    }

    totalImages += images.length;
    missing += counts.missing;
    empty += counts.empty;
    placeholder += counts.placeholder;

    const issues = counts.missing + counts.empty + counts.placeholder;
    if (issues) {
      pages.push({
        path,
        total: images.length,
        ...counts,
        issues,
      });
    }
  }

  pages.sort((a, b) => b.issues - a.issues || a.path.localeCompare(b.path));

  return {
    root,
    filesScanned: files.length,
    totalImages,
    missing,
    empty,
    missingOrEmpty: missing + empty,
    placeholder,
    placeholders: placeholders.exact,
    placeholderPatterns: placeholders.patterns,
    pages,
  };
}

async function main() {
  const root = arg("root", DEFAULT_ROOT);
  const placeholderFile = arg("placeholders", DEFAULT_PLACEHOLDERS);
  const jsonPath = arg("json", "");

  const report = await scanRepository({ root, placeholderFile });
  console.log(render(report));

  if (jsonPath) {
    await writeFile(jsonPath, JSON.stringify(report, null, 2) + "\n");
    console.log(`\nWrote JSON report to ${jsonPath}`);
  }

  // Intentionally no non-zero exit for findings: this check is report-only.
}

const invokedDirectly = process.argv[1] &&
  pathToFileURL(resolve(process.argv[1])).href === import.meta.url;

if (invokedDirectly) {
  main().catch((error) => {
    console.error(`image alt-text report failed: ${error.message}`);
    process.exit(1);
  });
}
