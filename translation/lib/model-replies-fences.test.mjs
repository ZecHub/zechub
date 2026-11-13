import assert from "node:assert/strict";
import test from "node:test";
import { findModelReplies, findReplacedAnchors, splitBlocks } from "./model-replies.mjs";

const REPLY = "Please provide the Markdown fragment you would like me to translate.";
const page = (...lines) => lines.join("\n");
for (const char of ["`", "~"]) {
  for (const width of [4, 5]) {
    const marker = char.repeat(width), inner = char.repeat(3);
    test(`${width} ${char} markers keep a nested example out of prose`, () => {
      assert.deepEqual(findModelReplies(page(marker + "markdown", inner, REPLY, inner, marker)), []);
    });
    test(`a reply after a ${width} ${char} example remains visible`, () => {
      const hits = findModelReplies(page(marker + "markdown", inner, "code", marker, "", REPLY));
      assert.deepEqual(hits.map(h => h.line), [6]);
    });
  }
  for (const tail of [" info", "\tjavascript"]) {
    test(`${char} closer with ${JSON.stringify(tail)} stays inside code`, () => {
      const marker = char.repeat(3);
      assert.deepEqual(findModelReplies(page(marker + "markdown", marker + tail, REPLY, marker)), []);
    });
  }
  test(`the other marker cannot close a ${char} fence`, () => {
    const marker = char.repeat(4), other = (char === "`" ? "~" : "`").repeat(4);
    assert.deepEqual(findModelReplies(page(marker, other, REPLY, marker)), []);
  });
  test(`a longer ${char} closer with whitespace really closes`, () => {
    const hits = findModelReplies(page(char.repeat(4), REPLY, char.repeat(5) + "\t ", "", REPLY));
    assert.deepEqual(hits.map(h => h.line), [5]);
  });
}
test("a backtick in a backtick info string does not open a fence", () => {
  assert.deepEqual(findModelReplies(page("```js `not-an-opener`", REPLY)).map(h => h.line), [2]);
});
test("backticks in a tilde info string are allowed", () => {
  assert.deepEqual(findModelReplies(page("~~~js `info`", REPLY, "~~~", REPLY)).map(h => h.line), [4]);
});
test("a short marker cannot expose an unclosed example at EOF", () => {
  assert.deepEqual(findModelReplies(page("````", "```", REPLY)), []);
});
test("blank lines inside a nested example do not split its block", () => {
  const blocks = splitBlocks(page("````md", "```", "code", "", "more code", "````", "", "---"));
  assert.deepEqual(blocks.map(b => ({ start: b.start, count: b.lines.length })), [{ start: 1, count: 6 }, { start: 8, count: 1 }]);
});
test("an anchor after a nested example is still checked structurally", () => {
  const example = ["````md", "```", "code", "````", ""];
  const en = page(...example, "---"), tr = page(...example, "Bitte senden Sie den Abschnitt.");
  assert.deepEqual(findReplacedAnchors(tr, en).map(h => [h.line, h.id]), [[6, "replaced-hr"]]);
});
test("English code examples do not whitelist a real prose reply", () => {
  const english = page("````md", "```", REPLY, "```", "````");
  assert.deepEqual(findModelReplies(REPLY, english).map(h => h.line), [1]);
});
test("CRLF nested examples retain the same boundaries", () => {
  assert.deepEqual(findModelReplies(["````", "```", REPLY, "```", "````"].join("\r\n")), []);
});
test("ordinary English prose quotes still exempt the same translated line", () => {
  assert.deepEqual(findModelReplies(REPLY, REPLY), []);
});
