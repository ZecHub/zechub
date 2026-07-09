// Tests for menu-title extraction. Run: node --test translation/lib/extract-title.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { extractTitle } from "./extract-title.mjs";

test("plain H1", () => {
  assert.equal(extractTitle("# Ywallet FROST demo\n\nbody"), "Ywallet FROST demo");
});

test("skips an HTML edit-badge preamble before the H1", () => {
  const t = `<a href="x"><img src="y" alt="Edit"/></a>\n\n# Zcash Shielded Assets\n\nbody`;
  assert.equal(extractTitle(t), "Zcash Shielded Assets");
});

test("strips bold/emphasis and trailing spaces", () => {
  assert.equal(extractTitle("# **Private SOL/USDC -> ZEC Swap**   \n"), "Private SOL/USDC -> ZEC Swap");
});

test("image-only heading uses the img alt text", () => {
  assert.equal(extractTitle('# <img src="a.png" alt="Community Links" width="50"/>\n'), "Community Links");
});

test("image-only heading with no alt -> falls through (null or later heading)", () => {
  assert.equal(extractTitle('# <img src="a.png"/>\n\n## Real Section\n'), "Real Section");
});

test("front-matter title overrides the H1 (human override channel)", () => {
  const t = "---\ntitle: Short Menu Label\n---\n\n# A Very Long Prose Headline That Is Not A Menu Label\n";
  assert.equal(extractTitle(t), "Short Menu Label");
});

test("menuTitle front-matter key also works, quotes stripped", () => {
  assert.equal(extractTitle(`---\nmenuTitle: "Wallets"\n---\n\n# Something else\n`), "Wallets");
});

test("a '#' line inside a fenced code block is NOT treated as a heading", () => {
  const t = "```sh\n# this is a shell comment\nzcash-cli\n```\n\n# Real Title\n";
  assert.equal(extractTitle(t), "Real Title");
});

test("falls back to first H2 when there is no H1", () => {
  assert.equal(extractTitle("## Only A Subheading\n\nbody"), "Only A Subheading");
});

test("prefers H1 over an earlier-scanned H2", () => {
  assert.equal(extractTitle("## Sub\n\n# Main\n"), "Main");
});

test("decodes HTML entities and markdown link text", () => {
  assert.equal(extractTitle("# [Zcash &amp; ZEC](https://z.cash)\n"), "Zcash & ZEC");
});

test("no heading at all -> null (caller omits, frontend falls back)", () => {
  assert.equal(extractTitle("just an address line\nu1abc...\n"), null);
});

test("markdown image-only heading uses the ![alt] text", () => {
  assert.equal(extractTitle("# ![Shielded Pools](./pool.png)\n"), "Shielded Pools");
});

test("front-matter override works on CRLF files", () => {
  assert.equal(extractTitle("---\r\ntitle: Shielded Pools\r\n---\r\n# Other\r\n"), "Shielded Pools");
});

test("menuTitle wins over title regardless of order", () => {
  assert.equal(extractTitle("---\ntitle: Long SEO Title\nmenuTitle: Short\n---\n# H\n"), "Short");
});

test("intraword underscore is preserved (zcash_cli, not zcashcli)", () => {
  assert.equal(extractTitle("# Using zcash_cli\n"), "Using zcash_cli");
});

test("unterminated frontmatter does NOT scan the body for title:", () => {
  // leading --- with no closing --- ; a title: inside a code block must not win
  assert.equal(extractTitle("---\n# Real Title\n\n```yaml\ntitle: Site Config\n```\n"), "Real Title");
});

test("a '#' YAML comment inside frontmatter is not read as the H1", () => {
  const t = "---\n# internal note\nauthor: X\n---\n# Real Title\n";
  assert.equal(extractTitle(t), "Real Title");
});

test("hex entity decodes; malformed numeric entity does not crash", () => {
  assert.equal(extractTitle("# Foo &#x2019;s Bar\n"), "Foo ’s Bar");
  assert.match(extractTitle("# Broken &#9999999999; Title\n"), /Broken/); // no throw
});

test("image-only H1 with no alt and no other heading -> null", () => {
  assert.equal(extractTitle('# <img src="a.png"/>\n\nbody only\n'), null);
});
