#!/usr/bin/env node
import assert from "node:assert/strict";
import {
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

console.log("all image alt-text parser cases correct");
