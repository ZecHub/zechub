import { test } from "node:test";
import assert from "node:assert/strict";
import { frontMatterViolation, parseFrontMatter } from "./frontmatter.mjs";

const SRC = "---\npublished: 2025-08-19\n---\n\n# Title\n\nbody\n";
const SRC_PLAIN = '<a href="x">Edit</a>\n\n# Title\n\nbody\n';
const code = (s, t) => (frontMatterViolation(s, t) || {}).code ?? null;

test("a matching block is not a violation", () => {
  assert.equal(code(SRC, "---\npublished: 2025-08-19\n---\n\n# Заголовок\n"), null);
});

test("no front matter on either side is not a violation", () => {
  assert.equal(code(SRC_PLAIN, SRC_PLAIN), null);
});

test("an opener the source lacks is caught (the build breaker)", () => {
  assert.equal(code(SRC_PLAIN, `---\n${SRC_PLAIN}`), "stray-opener");
});

test("a duplicated opener is caught", () => {
  assert.equal(code(SRC, "---\n---\npublished: 2025-08-19\n---\n\n# T\n"), "duplicated-opener");
});

test("a translated key is caught", () => {
  assert.equal(code(SRC, "---\nwotae: 2025-08-19\n---\n\n# T\n"), "mismatch");
});

test("a lost opening delimiter is caught", () => {
  assert.equal(code(SRC, "bipụtara: 2025-08-19\n---\n\n# T\n"), "dropped");
});

test("a block pushed down by a blank line is caught — Jekyll anchors at the first line", () => {
  assert.equal(code(SRC, "\n---\npublished: 2025-08-19\n---\n\n# T\n"), "unanchored");
});

test("an opener that never closes is caught", () => {
  assert.equal(code(SRC, "---\npublished: 2025-08-19\n\n# T\n"), "unterminated");
});

test("a changed value is caught, and named", () => {
  const v = frontMatterViolation(SRC, "---\npublished: 2024-01-01\n---\n\n# T\n");
  assert.equal(v.code, "mismatch");
  assert.match(v.message, /values differ/);
});

test("a differing key set is named as keys, not values", () => {
  const v = frontMatterViolation(SRC, "---\nwotae: 2025-08-19\n---\n\n# T\n");
  assert.match(v.message, /keys wotae != source published/);
});

test("line endings are not part of the comparison", () => {
  assert.equal(code(SRC, "---\r\npublished: 2025-08-19\r\n---\r\n\r\n# T\r\n"), null);
});

test("a UTF-8 BOM does not hide an opener, as it does not from Jekyll", () => {
  assert.equal(code(SRC_PLAIN, `﻿---\n${SRC_PLAIN}`), "stray-opener");
});

test("a body line containing a colon is not mistaken for front matter", () => {
  assert.equal(code(SRC_PLAIN, "Note: this is body text\n\n# T\n"), null);
});

test("parseFrontMatter returns the block and where the body starts", () => {
  const fm = parseFrontMatter(SRC);
  assert.deepEqual(fm.block, ["published: 2025-08-19"]);
  assert.equal(SRC.split("\n")[fm.end], "");
});

test("parseFrontMatter treats an unterminated opener as no front matter", () => {
  assert.equal(parseFrontMatter("---\npublished: 2025-08-19\n"), null);
});

test("a block Jekyll cannot parse is caught even when both files share it", () => {
  const broken = "---\npublished: [\n---\n\n# T\n";
  const v = frontMatterViolation(broken, broken);
  assert.equal(v.code, "invalid");
  assert.match(v.message, /source/);
});

test("an unquoted colon in a value is caught — the classic build failure", () => {
  const broken = "---\npublished: a: b\n---\n\n# T\n";
  assert.equal(frontMatterViolation(broken, broken).code, "invalid");
});

test("a translation-only unparseable block names the translation, not the source", () => {
  const v = frontMatterViolation(SRC, "---\npublished: {a}\n---\n\n# T\n");
  assert.equal(v.code, "invalid");
  assert.doesNotMatch(v.message, /source/);
});

test("an empty value is valid YAML and not a violation", () => {
  const empty = "---\npublished:\n---\n\n# T\n";
  assert.equal(frontMatterViolation(empty, empty), null);
});

test("an indented '---' is body to Jekyll, so it is not front matter here either", () => {
  assert.equal(parseFrontMatter(" ---\npublished: 2025-08-19\n---\n"), null);
});

test("'...' closes a block, as it does for Jekyll", () => {
  assert.deepEqual(parseFrontMatter("---\npublished: 2025-08-19\n...\n\n# T\n").block, ["published: 2025-08-19"]);
});

test("a trailing space after the date is not a difference", () => {
  const s = "---\npublished: 2023-10-23 \n---\n\n# T\n";
  assert.equal(frontMatterViolation(s, s), null);
});

test("a quoted scalar is valid however it is punctuated", () => {
  const q = '---\ntitle: "Foo: Bar"\n---\n\n# T\n';
  assert.equal(frontMatterViolation(q, q), null);
});

test("an unclosed quote is not", () => {
  const q = '---\ntitle: "Foo\n---\n\n# T\n';
  assert.equal(frontMatterViolation(q, q).code, "invalid");
});

test("an indented lookalike in the body is body, not a stray opener", () => {
  assert.equal(frontMatterViolation(SRC_PLAIN, ` ---\n${SRC_PLAIN}`), null);
});

test("a blank line above an indented lookalike is body too", () => {
  assert.equal(frontMatterViolation(SRC_PLAIN, `\n ---\n${SRC_PLAIN}`), null);
});
