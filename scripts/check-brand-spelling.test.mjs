// Masking regression suite for check-brand-spelling.mjs.
//
// Every case here is a defect that shipped. The gate has one failure mode that
// matters — the mask latches on and stops emitting real lines, so findings
// vanish and the run still exits 0. Six variants of it were found by feeding
// the gate hostile markdown; none by reading the code. This file exists so the
// seventh is caught by a test rather than by a reviewer.
import { readFileSync } from "node:fs";
const src = readFileSync(new URL("./check-brand-spelling.mjs", import.meta.url), "utf8");
const body = src.slice(src.indexOf("function proseMask"), src.indexOf("function changedEnglishFiles"));
const proseMask = new Function(body + "; return proseMask;")();
const V=(md,n)=>{const m=proseMask(md)[n-1];return m&&m.trim()?"visible":"masked";};
const cases = [
  ["fenced code stays masked",       "# T\n\n```\nZechub\n```\n", 4, "masked"],
  ["nested fence stays masked",      "# T\n\n````\n```\nZechub\n```\n````\n", 5, "masked"],
  ["multiline <pre> stays masked",   "# T\n\n<pre>\nZechub\n</pre>\n", 4, "masked"],
  ["true indented code stays masked","# T\n\n    Zechub code\n", 3, "masked"],
  ["comment stays masked",           "# T\n\n<!-- Zechub -->\n", 3, "masked"],
  ["<pre> in fence -> prose after",  "# T\n\n```\n<pre>\n```\n\nZechub\n", 7, "visible"],
  ["list continuation visible",      "# T\n\n- a\n    - Zechub\n", 4, "visible"],
  ["prose beside closing tag",       "# T\n\n<pre>\nx\n</pre> Zechub\n", 5, "visible"],
  ["prose beside one-liner",         "# T\n\n<code>x</code> Zechub\n", 3, "visible"],
  ["plain prose visible",            "# T\n\nZechub here\n", 3, "visible"],
  ["unclosed fence masks to EOF",    "# T\n\n```\nZechub\n", 4, "masked"],
  ["unclosed <pre> masks to EOF",    "# T\n\n<pre>\nZechub\n", 4, "masked"],
];
let bad=0;
for (const [n,md,line,want] of cases){
  const got=V(md,line);
  if(got!==want){bad++;console.log(`  FAIL ${n}: want ${want}, got ${got}`);}
}
console.log(bad ? `${bad}/${cases.length} failing` : `all ${cases.length} masking cases correct`);
process.exit(bad ? 1 : 0);
