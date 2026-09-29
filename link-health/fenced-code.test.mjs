// Run the production CLI, never a copied/extracted version of extractLinks.
// A caller may isolate fixtures with LINK_CHECKER_TEST_TMP; defaults to OS temp.
// LINK_CHECKER_PATH may select a preserved baseline for a negative control.
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdir, mkdtemp, readFile, realpath, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { isAbsolute, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const checker = process.env.LINK_CHECKER_PATH
  ? resolve(process.env.LINK_CHECKER_PATH)
  : fileURLToPath(new URL("./check-links.mjs", import.meta.url));

function inside(parent, path) {
  assert.ok(isAbsolute(parent) && isAbsolute(path), "Expected absolute paths");
  const rel = relative(parent, path);
  assert.ok(rel && rel !== ".." && !rel.startsWith(`..${sep}`) && !isAbsolute(rel),
    `Path must remain inside ${parent}: ${path}`);
}

async function temporaryRoot() {
  const requested = process.env.LINK_CHECKER_TEST_TMP || tmpdir();
  assert.ok(isAbsolute(requested), "Fixture root must be absolute");
  return realpath(requested);
}

// Intentionally tiny, reviewable fixtures. Protocol-relative URLs produce
// offline findings with line numbers without depending on route resolution.
const hidden = '[hidden](//hidden.invalid/example) <img src="//hidden.invalid/image"> <a href="//hidden.invalid/html">';
const before = "[before](//visible.invalid/before)";
const after = "[after](//visible.invalid/after)";
const duplicate = "[repeat](https://example.invalid/repeated)";
const cases = [
  {
    name: "backtick fences retain ordinary links, one-based lines and duplicate counts",
    lines: [before, duplicate, "```md", hidden, duplicate, "```", after, duplicate],
    visible: [[1, "//visible.invalid/before"], [7, "//visible.invalid/after"]],
    links: 4,
    duplicates: 2,
  },
  {
    name: "tilde fences hide Markdown and HTML examples",
    lines: [before, "~~~markdown", hidden, "~~~", after],
    visible: [[1, "//visible.invalid/before"], [5, "//visible.invalid/after"]],
    links: 2,
  },
  {
    name: "shorter backticks, wrong-kind and info-bearing pseudo-closers stay inside",
    lines: [
      "````md", hidden, "```", hidden, "~~~~", hidden,
      "````javascript", hidden, "````` \t", after,
    ],
    visible: [[10, "//visible.invalid/after"]],
    links: 1,
  },
  {
    name: "shorter tildes, wrong-kind and info-bearing pseudo-closers stay inside",
    lines: [
      "~~~~md", hidden, "~~~", hidden, "````", hidden,
      "~~~~javascript", hidden, "~~~~~ \t", after,
    ],
    visible: [[10, "//visible.invalid/after"]],
    links: 1,
  },
  {
    name: "adjacent fences track their own delimiter and length",
    lines: ["```", hidden, "```", "~~~~", hidden, "~~~~", after],
    visible: [[7, "//visible.invalid/after"]],
    links: 1,
  },
  ...["```", "~~~"].map((opener) => ({
    name: `unclosed ${opener} suppresses examples through EOF`,
    lines: [before, opener, hidden, after],
    visible: [[1, "//visible.invalid/before"]],
    links: 1,
  })),
  {
    name: "backtick info containing a backtick is not an opener",
    lines: ["```bad`info [inline](//visible.invalid/inline)", after, "````", hidden, "````", before],
    visible: [
      [1, "//visible.invalid/inline"],
      [2, "//visible.invalid/after"],
      [6, "//visible.invalid/before"],
    ],
    links: 3,
  },
  {
    name: "tilde info may contain backticks",
    lines: ["~~~language`info", hidden, "~~~", after],
    visible: [[4, "//visible.invalid/after"]],
    links: 1,
  },
  {
    name: "indented list content, tabs and CRLF keep whitespace tolerance",
    lines: [
      "- list item", "    ```md", hidden, "\t  ``` \t", after,
      "    ~~~md", hidden, "    ~~~~\t", before,
    ],
    newline: "\r\n",
    visible: [[5, "//visible.invalid/after"], [9, "//visible.invalid/before"]],
    links: 2,
  },
  {
    name: "one or two delimiters are ordinary text and HTML links remain visible",
    lines: [
      "`", "~", "``", "~~", before,
      '<img src="//visible.invalid/image"> <a href="//visible.invalid/html">',
    ],
    visible: [
      [5, "//visible.invalid/before"],
      [6, "//visible.invalid/image"],
      [6, "//visible.invalid/html"],
    ],
    links: 3,
  },
  {
    name: "a closer with a link suffix is still code",
    lines: ["```", "``` [not a closer](//hidden.invalid/suffix)", hidden, "```", after],
    visible: [[5, "//visible.invalid/after"]],
    links: 1,
  },
];

for (const fixture of cases) {
  test(fixture.name, async () => {
    const root = await temporaryRoot();
    const prefix = resolve(root, "fenced-code-");
    inside(root, prefix);
    const dir = await mkdtemp(prefix);
    try {
      inside(root, await realpath(dir));
      const site = resolve(dir, "site");
      const json = resolve(dir, "report.json");
      const markdown = resolve(dir, "report.md");
      for (const path of [site, json, markdown]) inside(dir, path);
      await mkdir(site);
      const input = join(site, "Fixture.md");
      inside(dir, input);
      const text = fixture.lines.join(fixture.newline || "\n");
      await writeFile(input, text);

      const result = spawnSync(process.execPath, [
        checker, "--offline", "--root", "site", "--json", json, "--markdown", markdown,
      ], {
        cwd: dir,
        env: process.env,
        encoding: "utf8",
        timeout: 15_000,
        maxBuffer: 64 * 1024,
      });
      assert.ifError(result.error);
      assert.equal(result.status, 0, `CLI failed: ${result.stderr}`);
      const report = JSON.parse(await readFile(json, "utf8"));
      assert.equal(report.filesScanned, 1);
      assert.equal(report.linksFound, fixture.links);
      assert.equal(report.uniqueExternalChecked, 0);
      assert.equal(report.retriedAfterNetworkFailure, 0);
      assert.equal(report.allowlistEntries, 0);
      assert.deepEqual(
        report.findings.filter((f) => f.kind === "invalid").map((f) => [f.line, f.url]),
        fixture.visible,
      );
      const duplicates = report.findings.filter((f) => f.kind === "duplicate");
      assert.equal(duplicates.length, fixture.duplicates ? 1 : 0);
      if (fixture.duplicates) {
        assert.equal(duplicates[0].url, "https://example.invalid/repeated");
        assert.equal(duplicates[0].count, fixture.duplicates);
      }
      assert.equal(report.findings.length, fixture.visible.length + duplicates.length);
      assert.equal(report.serious, fixture.visible.length);
      for (const finding of report.findings) {
        assert.equal(finding.file, join("site", "Fixture.md"));
      }
      assert.match(await readFile(markdown, "utf8"), /Reporting only, no content is modified/);
      assert.equal(await readFile(input, "utf8"), text, "CLI must not modify content");
    } finally {
      // Validate the resolved target immediately before recursive cleanup.
      const actual = await realpath(dir);
      inside(root, actual);
      assert.equal(actual, dir);
      await rm(actual, { recursive: true, force: true });
    }
  });
}
