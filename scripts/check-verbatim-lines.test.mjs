// Self-test for check-verbatim-lines.mjs, run against a throwaway repo.
// Run: node scripts/check-verbatim-lines.test.mjs
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const SCRIPT = resolve("scripts/check-verbatim-lines.mjs");
let failures = 0;
const check = (name, got, want) => {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  console.log(`  ${ok ? "ok  " : "FAIL"} ${name}`);
  if (!ok) { failures++; console.log(`       want: ${JSON.stringify(want)}\n       got:  ${JSON.stringify(got)}`); }
};

const EN = [
  "# Wallets", "", "## [Zashi](https://zashi.app)",
  "- Devices: Mobile", "- Features: Address Book | Tor Support", "- Ironwood: Ready", "",
  "Zashi is a shielded wallet.",
].join("\n");
const IT_OK = [
  "# Portafogli", "", "## [Zashi](https://zashi.app)",
  "- Devices: Mobile", "- Features: Address Book | Tor Support", "- Ironwood: Ready", "",
  "Zashi è un portafoglio schermato.",
].join("\n");

function repo(translations) {
  const d = mkdtempSync(join(tmpdir(), "vl-"));
  mkdirSync(join(d, "translation"));
  mkdirSync(join(d, "site/Using_Zcash"), { recursive: true });
  writeFileSync(join(d, "translation/verbatim-lines.json"), JSON.stringify({
    pages: { "Using_Zcash/Wallets.md": ["^- (Devices|Operating System|Wallet Support|Pools|Features|Ironwood):"] },
  }));
  writeFileSync(join(d, "site/Using_Zcash/Wallets.md"), EN);
  for (const [loc, text] of Object.entries(translations)) {
    mkdirSync(join(d, `translations/${loc}/site/Using_Zcash`), { recursive: true });
    writeFileSync(join(d, `translations/${loc}/site/Using_Zcash/Wallets.md`), text);
  }
  return d;
}
function run(d, ...args) {
  try {
    return { code: 0, out: execFileSync("node", [SCRIPT, ...args], { cwd: d, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }) };
  } catch (e) { return { code: e.status, out: `${e.stdout}${e.stderr}` }; }
}
const it = (d) => readFileSync(join(d, "translations/it/site/Using_Zcash/Wallets.md"), "utf8");

let d = repo({ it: IT_OK, es: IT_OK });
check("verbatim data lines pass; translated prose is not a data line", run(d).code, 0);
rmSync(d, { recursive: true });

for (const [label, bad] of [
  ["a translated label fails", IT_OK.replace("- Features:", "- Funzionalità:")],
  ["a translated value fails", IT_OK.replace("Address Book", "Rubrica")],
  ["a translated Ironwood status fails", IT_OK.replace("Ironwood: Ready", "Ironwood: Pronto")],
  ["a French-spaced colon fails", IT_OK.replace("- Ironwood: Ready", "- Ironwood : Ready")],
  ["a full-width colon fails", IT_OK.replace("- Devices: Mobile", "- Devices：Mobile")],
]) {
  d = repo({ it: bad });
  const r = run(d);
  check(label, [r.code, /Wallets\.md:\d+: must be verbatim English/.test(r.out)], [1, true]);
  rmSync(d, { recursive: true });
}

d = repo({ it: IT_OK.replace("- Features: Address Book | Tor Support", "- Funzionalità: Rubrica | Supporto Tor")
                    .replace("Ironwood: Ready", "Ironwood: Pronto") });
const f = run(d, "--fix");
check("--fix restores every data line and leaves the prose translated", [f.code, it(d)], [0, IT_OK]);
check("after --fix the check passes", run(d).code, 0);
rmSync(d, { recursive: true });

d = repo({ it: IT_OK + "\nextra line" });
const lc = run(d, "--fix");
check("a translation whose line count differs fails, even under --fix", [lc.code, /cannot align/.test(lc.out)], [1, true]);
rmSync(d, { recursive: true });

d = repo({ it: IT_OK, es: IT_OK.replace("Ironwood: Ready", "Ironwood: Listo") });
check("--files limits the check to the named translations",
  [run(d, "--files", "translations/it/site/Using_Zcash/Wallets.md").code,
   run(d, "--files", "translations/es/site/Using_Zcash/Wallets.md").code], [0, 1]);
rmSync(d, { recursive: true });

if (failures) { console.log(`\n${failures} failure(s)`); process.exit(1); }
console.log("\nall passed");
