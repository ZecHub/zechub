#!/usr/bin/env node
import assert from "node:assert/strict";
import {
  buildPlaceholderMatcher,
  classifyImage,
  extractImages,
  maskNonRenderedCodeAndComments,
  normalizeAlt,
} from "./check-image-alt-text.mjs";

const placeholders = new Set(["logo", "img1", "image", "alt text"]);

{
  const images = extractImages(`
![Wallet diagram](/assets/wallet.png)
![](/assets/empty.png)
![logo](/assets/logo.png)
<img src="/a.png">
<img src="/b.png" alt="">
<img
  src="/c.png"
  alt="Useful diagram"
/>
\`![image](/inside-code.png)\`
\`\`\`
![img1](/fenced.png)
<img src="/fenced-html.png">
\`\`\`
<!-- ![image](/commented.png) -->
`);

  assert.equal(images.length, 6);
  assert.deepEqual(
    images.map((image) => classifyImage(image, placeholders)),
    ["ok", "empty", "placeholder", "missing", "empty", "ok"],
  );
}

{
  const images = extractImages(`
![Reference image][ref]
![Nested destination](https://example.com/a_(b).png)
[ref]: /assets/ref.png
`);
  assert.equal(images.length, 2);
  assert.equal(images[0].alt, "Reference image");
  assert.equal(images[1].alt, "Nested destination");
}

assert.equal(normalizeAlt("  Alt   Text  "), "alt text");
assert.ok(!maskNonRenderedCodeAndComments("<!-- ![x](y) -->").includes("![x]"));

// A bare array stays valid, so an existing configuration keeps its meaning.
{
  const matcher = buildPlaceholderMatcher(["logo", "img1"]);
  assert.ok(matcher.has("logo"));
  assert.ok(matcher.has("img1"));
  assert.ok(!matcher.has("img2"));
  assert.deepEqual(matcher.patterns, []);
}

// Patterns catch the families a fixed list cannot enumerate.
{
  const matcher = buildPlaceholderMatcher({
    exact: ["logo"],
    patterns: ["^img\\s*\\d+$", "^https?://\\S+$"],
  });

  // Normalization is applied before matching, so casing and repeated spaces
  // do not have to be written into every pattern.
  for (const alt of ["img2", "IMG7", "img 10", "  Img  3  "]) {
    assert.equal(classifyImage({ alt }, matcher), "placeholder", alt);
  }
  assert.equal(classifyImage({ alt: "https://i.ibb.co/abc/Screenshot.png" }, matcher), "placeholder");

  // Descriptions are still descriptions: a placeholder word inside a real
  // sentence, and a number that is part of one, must not be flagged.
  for (const alt of ["ZecHub logo on a dark background", "Figure 2 of the shielded pool", "image of a wallet"]) {
    assert.equal(classifyImage({ alt }, matcher), "ok", alt);
  }

  assert.equal(classifyImage({ alt: null }, matcher), "missing");
  assert.equal(classifyImage({ alt: "   " }, matcher), "empty");
}

// A broken configuration must fail loudly rather than quietly match nothing.
assert.throws(() => buildPlaceholderMatcher({ patterns: ["^img(\\d+$"] }), /not a valid regular expression/);
assert.throws(() => buildPlaceholderMatcher({ exact: "logo" }), /must each be a JSON array of strings/);
assert.throws(() => buildPlaceholderMatcher([1, 2]), /must be a string/);
assert.throws(() => buildPlaceholderMatcher("logo"), /must contain a JSON array/);

console.log("all image alt-text parser cases correct");
