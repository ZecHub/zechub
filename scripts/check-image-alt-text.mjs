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

export function classifyImage(image, placeholders) {
  if (image.alt === null) return "missing";
  if (image.alt.trim() === "") return "empty";
  if (placeholders.has(normalizeAlt(image.alt))) return "placeholder";
  return "ok";
}

async function walkMarkdown(dir, out = []) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch (error) {
    if (error?.code === "ENOENT") return out;
    throw error;
  }

  for (const entry of entries) {
    const path = `${dir}/${entry.name}`;
    if (entry.isDirectory()) await walkMarkdown(path, out);
    else if (entry.isFile() && entry.name.toLowerCase().endsWith(".md")) out.push(path);
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
  const rawPlaceholders = JSON.parse(await readFile(placeholderFile, "utf8"));
  if (!Array.isArray(rawPlaceholders) || rawPlaceholders.some((x) => typeof x !== "string")) {
    throw new Error(`${placeholderFile} must contain a JSON array of strings`);
  }
  const placeholders = new Set(rawPlaceholders.map(normalizeAlt));

  const files = (await walkMarkdown(root)).sort();
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
    placeholders: [...placeholders].sort(),
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
