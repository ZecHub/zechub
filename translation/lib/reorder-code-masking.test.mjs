import assert from "node:assert/strict";
import test from "node:test";
import { findReorderDamage, maskCode, repairGluedNames } from "./reorder-damage.mjs";
const DAMAGE = "ZcashΠορτοφόλια";
const findings = text => findReorderDamage(text, "el");
for (const char of ["`", "~"]) {
  for (const tail of [" info", "\tmd", " > not a closer"]) {
    test(`${char} fence with ${JSON.stringify(tail)} cannot expose example prose`, () => {
      const marker = char.repeat(3), text = [marker+"md",marker+tail,DAMAGE,marker].join("\n");
      assert.deepEqual(findings(text), []);
      assert.deepEqual(repairGluedNames(text,"el",["Zcash"]), {text,repaired:[]});
    });
  }
  test(`shorter ${char} markers cannot close an unclosed example`, () => {
    assert.deepEqual(findings([char.repeat(4),char.repeat(3),DAMAGE].join("\n")), []);
  });
  test(`longer ${char} closer exposes real following damage`, () => {
    const text=[char.repeat(4),DAMAGE,char.repeat(5)+"\t ",DAMAGE].join("\n");
    assert.deepEqual(findings(text).map(h=>h.line),[4]);
  });
  test(`other marker cannot close ${char} code`, () => {
    assert.deepEqual(findings([char.repeat(3),(char==="`"?"~":"`").repeat(3),DAMAGE,char.repeat(3)].join("\n")), []);
  });
}
test("invalid backtick info does not hide later real damage", () => {
  assert.deepEqual(findings("```md`not-an-opener\n"+DAMAGE).map(h=>h.line),[2]);
});
test("backticks in tilde info remain valid", () => {
  assert.deepEqual(findings("~~~md `info`\n"+DAMAGE+"\n~~~"),[]);
});
for (const width of [2,3,4]) {
  test(`${width}-backtick inline code keeps internal runs literal`, () => {
    const mark="`".repeat(width), text="prefix "+mark+"a ` x ` "+DAMAGE+mark+" suffix";
    assert.deepEqual(findings(text),[]);
    assert.equal(repairGluedNames(text,"el",["Zcash"]).text,text);
    const masked=maskCode([text])[0];assert.equal(masked.length,text.length);
    assert.equal(masked.slice(0,7),"prefix ");assert.equal(masked.slice(-7)," suffix");
  });
  test(`${width}-backtick inline closer leaves subsequent damage visible`, () => {
    const mark="`".repeat(width),text=mark+"a ` x ` example"+mark+" "+DAMAGE;
    const hit=findings(text);assert.equal(hit.length,1);assert.equal(hit[0].col,text.indexOf(DAMAGE)+6);
  });
}
test("unmatched backticks leave prose visible", () => {
  assert.equal(findings("before `` "+DAMAGE).length,1);
});
test("escaped single backticks do not open code", () => {
  assert.equal(findings("\\` "+DAMAGE+" \\`").length,1);
});
test("backslash is literal inside a code span", () => {
  assert.deepEqual(findings("`code \\` "+DAMAGE).map(h=>h.key),[DAMAGE]);
});
test("even backslashes do not escape the opening delimiter", () => {
  assert.deepEqual(findings("\\\\`"+DAMAGE+"`"),[]);
});
test("comments in inline code do not hide real following text", () => {
  assert.equal(findings("``a ` <!-- ` code`` "+DAMAGE).length,1);
});
test("CRLF fence boundaries retain real finding positions", () => {
  const text=["```md","``` info",DAMAGE,"```",DAMAGE].join("\r\n");
  assert.deepEqual(findings(text).map(h=>[h.line,h.col]),[[5,6]]);
});
test("existing blockquote and list fences still mask examples", () => {
  for(const prefix of ["> ","- ","1. "]) assert.deepEqual(findings(prefix+"```md\n"+DAMAGE+"\n"+prefix+"```"),[]);
});
test("real prose repair remains limited to protected names", () => {
  assert.equal(repairGluedNames(DAMAGE,"el",["Zcash"]).text,"Zcash Πορτοφόλια");
});
