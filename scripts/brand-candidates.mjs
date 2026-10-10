// Find brand names a change INTRODUCES that are not protected yet — before any
// engine sees them.
//
// check-brand-drift finds a brand only after an engine has translated it: it
// compares an English page with its translation. By then the page has been
// translated once for nothing, and fixing it means protecting the name and
// translating the page again. Between 2026-09-28 and 09-29 that cost three
// extra sync windows. This runs on the ENGLISH alone, on the lines a PR adds,
// so the name can be protected in the same PR.
//
// Signals, each tied to a name that actually slipped through:
//   link    link text naming its own site     [SwissBorg](https://swissborg.com)
//           archive.org links unwrapped        [Light Shield](web.archive.org/…/shield.lightprotocol.com)
//           or whose FIRST word names the site [Clipdrop by stability.ai](https://clipdrop.co/…)
//   shape   internal capital, ALL-CAPS, letter+digit   ZecAuth, TEKCE, ZCSH, Free2Z
//   proper  a word capitalised mid-sentence that the wiki never writes in
//           lower case — repeated, or new to the wiki   Solana, Kestrel, Ztreamer
//   variant a protected term written differently: case, spacing, hyphen
//                                              FIRN for Firn, BTCPayServer, BTCPay server
//
// Never reported: anything inside code (fenced, indented, inline), HTML
// comments, tags or URLs — engines do not touch those; a protected term
// written exactly as protected (masked out before anything is judged, so
// "Zingo!" and multi-word terms are safe); a lower-case noun that happens to
// be a protected brand's letters ("the ledger").
//
// "Is this an ordinary word?" is answered by the corpus itself, not a
// dictionary: a word the English pages write in lower case at least as often
// as capitalised mid-sentence is a word ("light", "shield", "forum").
//
// Advisory by design. It proposes; a human confirms the vendor's spelling.
//
// Run:  node scripts/brand-candidates.mjs --base origin/main   # lines this branch adds
//       node scripts/brand-candidates.mjs --pages site/a.md,site/b.md
//       add --json for machine output; exit code is 0 unless the run itself fails.

import { readFileSync, existsSync, realpathSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

// Title-Case in this corpus without being names. Generous on purpose: a missed
// brand is caught at the next change or by the sync hold; a false positive
// costs every contributor who reads the comment.
const STOP = new Set(`
  the a an and or but if then this that these those with without for from into over under about above below between
  during before after here there when where how why what which who whom whose you your we our they their them it its
  is are was were be been being have has had do does did can could should would may might must shall will not no yes
  all any both each few more most other some such only own same so than too very just now new old first last next
  read learn guide guides docs doc documentation website site page pages blog post posts note notes see view click
  link links full list official example examples step steps overview introduction summary conclusion background
  resources references appendix faq tip tips warning important caution update updates status offline online live
  january february march april may june july august september october november december
  monday tuesday wednesday thursday friday saturday sunday jan feb mar apr jun jul aug sep sept oct nov dec
  forum forums address addresses
  english spanish french german italian portuguese russian chinese japanese korean arabic hindi turkish ukrainian
  swahili yoruba igbo twi ewe african american european asian
  advisory panel board committee council group company inc ltd llc corp corporation fund funds foundation trust bank
  investments capital holdings partners ventures association society alliance coalition institute university
  initiative program programme services solutions systems technologies technology global international digital
  research deferred unified ultra estate book books compose buffers edition series
  africa america asia europe oceania antarctica
  argentina australia austria bangladesh belgium brazil canada chile china colombia egypt ethiopia finland france
  germany ghana greece india indonesia iran iraq ireland israel italy japan kenya korea malaysia mexico morocco
  netherlands nigeria norway pakistan peru philippines poland portugal romania russia singapore spain sweden
  switzerland taiwan tanzania thailand turkey uganda ukraine venezuela vietnam zimbabwe
  united kingdom states emirates republic union
`.split(/\s+/).filter(Boolean));

// Acronyms that are vocabulary, not brands. ALL-CAPS alone is a strong signal
// (TEKCE, ZCSH), so this list is what keeps it usable.
const ACRONYMS = new Set(`
  ZIP ZIPS API APIS URL URLS URI HTTP HTTPS HTML JSON YAML TOML CSV PDF SVG PNG JPEG GIF CLI GUI SDK RPC GRPC TLS SSL
  DNS VPN TOR P2P UTXO UTXOS ZKP SNARK SNARKS STARK MPC NFT NFTS DEX DEXS CEX KYC AML USD EUR GBP JPY ETF ETFS FAQ FAQS
  README TODO NOTE NOTES WARNING IMPORTANT TIP CAUTION TLDR ASAP UTC GMT CPU GPU RAM SSD HDD USB NVME LTS OSS EVM ERC
  ASIC ASICS POW POS DAO DAOS DEFI TVL APY APR OTC ATM ATMS QR PIN OTP SMS IOS AMM LP LPS WASM SQL SSH SSO JWT OAUTH
  AES RSA ECDSA EDDSA SHA BLAKE UA UFVK UFVKS UIVK FVK IVK OVK TXID TXIDS NU NU5 NU6 NU7 HD BIP BIPS SLIP PSBT ICO IPO
  CEO CTO CFO COO EU US USA UK UN IMF BIS SEC CFTC FATF FBI IRS GDPR MICA CBDC CBDCS GDP ROI ETA TBD TBA WIP PR PRS
  AI ML LLM LLMS GPT PATH HOME ENV SIGTERM SIGKILL SIGINT STDIN STDOUT STDERR NOT NEVER ALWAYS ONLY MUST DO
  DONT WORKS DONE YES NO OK NEW FREE BETA ALPHA REST SOCKS UUID GUID HDMI NIST CNAME MX TXT CORS CSRF XSS DOS DDOS
  IP IPS TCP UDP HTTP2 LAN WAN WIFI NFC GPS OS VM VMS CI CD FIFO LIFO RAID ISO ANSI ASCII UTF MIT GPL BSD APACHE
`.split(/\s+/).filter(Boolean));

// Cryptographic and encoding identifiers: brand-shaped (letter+digit, capitals)
// but engines leave them alone and nobody needs them on the list.
const TECH = new Set(`blake2b blake2s blake3 bech32 bech32m groth16 halo2 bls12 bls12381 f4jumble sha256 sha256sum
  sha512 sha3 keccak256 ripemd160 p2pkh p2sh p2wpkh p2wsh p2tr socks5 ed25519 x25519 secp256k1 base58 base64 base58check
  jubjub pallas vesta redjubjub redpallas poseidon sinsemilla ipv4 ipv6 utf8 utf16 x86 arm64 amd64 aarch64 l1 l2 l1s l2s l3
`.split(/\s+/).filter(Boolean));

// Words a brand name often carries that are not the brand ("HeyGen Labs",
// "Firn Protocol"). Used only to see whether a link's text names its host.
const GENERIC = new Set(`labs lab protocol app apps wallet wallets finance network exchange swap swaps pay dao io
  official website site docs the a an by for on of and`.split(/\s+/).filter(Boolean));

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
// a version or edition after a name: "Halo 2", "Uniswap v3", "NU6 1", "Part II"
const VERSION = /^(?:v?\d+[a-z]?|ii|iii|iv|vi|vii|viii|ix|x)$/;
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// ---- what engines never translate ------------------------------------------
// Line structure is kept (blanked, not removed) so findings keep line numbers.
// Computed over the WHOLE file when it is available: a PR that adds lines
// inside an existing code block, or changes one fence opener, would otherwise
// flip the fence state for everything after it.
export function stripNoise(md) {
  let fence = null;          // { ch, len } of the open fence
  let comment = false;       // inside a multi-line <!-- -->
  let prevBlank = true, inIndented = false;
  return md.split("\n").map((raw) => {
    const line = raw.replace(/\r$/, "");
    if (fence) {
      const m = /^\s{0,3}(`{3,}|~{3,})\s*$/.exec(line);
      if (m && m[1][0] === fence.ch && m[1].length >= fence.len) fence = null;
      prevBlank = false; return "";
    }
    const open = /^\s{0,3}(?:[-*+]\s+|\d+[.)]\s+)?(`{3,}|~{3,})/.exec(line);
    if (open) { fence = { ch: open[1][0], len: open[1].length }; prevBlank = false; return ""; }
    // indented code: four spaces or a tab, after a blank line (or continuing one),
    // and not a list continuation
    if (/^( {4}|\t)/.test(line) && (prevBlank || inIndented) && !/^\s*([-*+]|\d+[.)])\s/.test(line)) {
      inIndented = true; prevBlank = false; return "";
    }
    inIndented = false;
    let s = line;
    if (comment) {
      const end = s.indexOf("-->");
      if (end < 0) { prevBlank = false; return ""; }
      s = s.slice(end + 3); comment = false;
    }
    s = s.replace(/<!--[\s\S]*?-->/g, " ");
    const c = s.indexOf("<!--");
    if (c >= 0) { s = s.slice(0, c); comment = true; }
    s = s
      .replace(/(?<!`)(`+)(?!`)[\s\S]*?(?<!`)\1(?!`)/g, " ") // inline code: a run of n backticks closes on exactly n
      .replace(/^\s*\[[^\]]+\]:\s*\S+.*$/, " ")             // reference definition
      .replace(/<\/?[A-Za-z][^<>\n]{0,300}>/g, " ")         // HTML tags, bounded (no quadratic blow-up)
      .replace(/\]\([^)\n]*\)/g, "] ")                      // link targets
      .replace(/<https?:\/\/[^>\s]+>/g, " ")                // autolinks
      .replace(/https?:\/\/[^\s)\]]+/g, " ")                // bare URLs
      .replace(/!\[[^\]]*\]/g, " ");                        // image alt text: labels, not prose
    prevBlank = !line.trim();
    return s;
  });
}

export function unwrapArchive(url) {
  const m = /^https?:\/\/web\.archive\.org\/(?:web|wait)\/[^/]+\/(.+)$/.exec(url);
  return m ? (/^https?:\/\//.test(m[1]) ? m[1] : `https://${m[1]}`) : url;
}

// "shield.lightprotocol.com" -> "shieldlightprotocol"; subdomains stay, they
// often carry the product name.
function hostOf(url) {
  try { return new URL(unwrapArchive(url)).host.toLowerCase(); } catch { return ""; }
}
function hostKey(url) {
  return hostOf(url).replace(/^(www|app|docs|blog|support|status|api|mobile|explorer|web)\./, "")
    .replace(/\.[a-z]+$/, "").replace(/[^a-z0-9]/g, "");
}

// ---- corpus statistics ------------------------------------------------------
const MIDSENTENCE = /(?<=[a-z0-9,;:)"'’] )([A-Z][a-z]{2,}[a-z0-9]*)(?![A-Za-z0-9])/g;
// A run of Title-Case words mid-sentence, judged as one name: "Grayscale
// Investments", "Protocol Buffers". Judging the words one by one reported
// "Investments" and "Buffers" as brands.
const TITLE_RUN = /(?<=[a-z0-9,;:)"'’] )([A-Z][a-z0-9]{2,}(?: (?:of |and |the )?[A-Z][a-z0-9]{1,}){0,3})(?![A-Za-z0-9])/g;

export function corpusCase(texts) {
  const lower = new Map(), capMid = new Map(), capsSeen = new Map();
  const bump = (m, k) => m.set(k, (m.get(k) ?? 0) + 1);
  for (const md of texts) {
    for (const line of stripNoise(md)) {
      for (const m of line.matchAll(/(?<![A-Za-z0-9])([a-z][a-z0-9]{2,})(?![A-Za-z0-9])/g)) bump(lower, m[1]);
      for (const m of line.matchAll(MIDSENTENCE)) bump(capMid, m[1].toLowerCase());
      for (const m of line.matchAll(/(?<![A-Za-z0-9])([A-Z]{3,})(?![A-Za-z0-9])/g)) bump(capsSeen, m[1]);
    }
  }
  return { lower, capMid, capsSeen };
}
const lowerCount = (w, stats) => stats.lower?.get(w.toLowerCase()) ?? 0;
const capCount = (w, stats) => stats.capMid?.get(w.toLowerCase()) ?? 0;
const isOrdinaryWord = (w, stats) => lowerCount(w, stats) >= Math.max(1, capCount(w, stats));

// ---- protection ---------------------------------------------------------------
// terms: preserveVerbatim; equivalentForms: [[a, b], ...]; ignore: decided-not-a-brand
export function makeProtection({ terms, equivalentForms = [], ignore = [] }) {
  const all = [...new Set([...terms, ...equivalentForms.flat()])];
  const lower = new Set([...all, ...ignore].map((t) => t.toLowerCase()));
  const byNorm = new Map();
  for (const t of terms) if (norm(t)) byNorm.set(norm(t), t);
  const sorted = [...all].filter(Boolean).sort((a, b) => b.length - a.length);
  const body = sorted.map(escapeRe).join("|");
  // exact spelling: masked before anything is judged
  const exact = body ? new RegExp(`(?<![A-Za-z0-9])(?:${body})(?![A-Za-z0-9])`, "g") : null;
  // any spelling: to find variants of multi-word / punctuated terms ("BTCPay server")
  const loose = body ? new RegExp(`(?<![A-Za-z0-9])(?:${body})(?![A-Za-z0-9])`, "gi") : null;
  const canonical = new Map(all.map((t) => [t.toLowerCase(), t]));
  const exactSet = new Set(all);
  const equivalent = (a, b) => equivalentForms.some((g) => g.includes(a) && g.includes(b));

  // a candidate is covered if it IS a term (any case) or an ignored word, or
  // contains one as whole words with only generic words or numbers around it
  // ("Firn Protocol", "HeyGen Labs" once HeyGen is on, "Halo 2" with Halo on:
  // the match is word-bounded, so the shorter entry already protects the name
  // inside the longer one, and an engine has nothing to translate in a number)
  const covered = (c) => {
    if (lower.has(c.toLowerCase())) return true;
    const words = c.split(/\s+/);
    for (let i = 0; i < words.length; i++)
      for (let j = words.length; j > i; j--) {
        if (!lower.has(words.slice(i, j).join(" ").toLowerCase())) continue;
        const rest = [...words.slice(0, i), ...words.slice(j)].map(norm);
        if (rest.every((w) => GENERIC.has(w) || STOP.has(w) || VERSION.test(w))) return true;
      }
    return false;
  };

  // Matching is not phrase-transitive, so a protected PHRASE leaves two gaps
  // (raised on #2309):
  //   fragment   a word of the phrase written on its own. "NEAR Intents" is
  //              protected, bare "NEAR" is not, and engines translated it.
  //              Only words whose spelling marks them as a name count (ALL
  //              CAPS, an internal capital). Title-Case words were tried and
  //              dropped: over the curated pages they reported Coin, Grants,
  //              Electric and Community from the phrases they live in, and the
  //              proper-noun signal already catches a repeated bare name.
  //   truncated  a leading part of the phrase, two words or more, that is not
  //              itself protected: "Coinbase Custody" between the protected
  //              "Coinbase" and "Coinbase Custody Trust Company". The shorter
  //              entry keeps "Coinbase"; "Custody" is translated. Not when
  //              the phrase goes on in another form ("Full Viewing Keys",
  //              "Electric Coin Co."): that is the phrase, inflected or cut.
  const multi = terms.filter((t) => /\s/.test(t.trim()));
  const fragments = new Map(); // word -> the phrase it came from (distinctive spellings only)
  const prefixes = [];         // { text, re, of }
  for (const t of multi) {
    const words = t.trim().split(/\s+/);
    for (const w of words) {
      if (!/^[A-Za-z][A-Za-z0-9]*$/.test(w) || w.length < 3) continue;
      if (lower.has(w.toLowerCase()) || STOP.has(w.toLowerCase()) || GENERIC.has(w.toLowerCase())) continue;
      if (ACRONYMS.has(w.toUpperCase())) continue;
      const distinctive = /^[A-Z0-9]+$/.test(w) ? /[A-Z]{2}/.test(w) : /[a-z][A-Z]/.test(w);
      if (distinctive && !fragments.has(w)) fragments.set(w, t);
    }
    for (let k = 2; k < words.length; k++) {
      const p = words.slice(0, k);
      const text = p.join(" ");
      if (lower.has(text.toLowerCase())) continue;
      if (STOP.has(norm(p[k - 1])) || GENERIC.has(norm(p[k - 1]))) continue; // "Zcash Foundation of", "Bank of New"
      if (p.every((w) => STOP.has(norm(w)) || GENERIC.has(norm(w)))) continue;
      prefixes.push({ text, of: t, next: norm(words[k]), re: new RegExp(`(?<![A-Za-z0-9])${p.map(escapeRe).join("\\s+")}(?![A-Za-z0-9])`, "g") });
    }
  }
  const fragmentOf = (w) => fragments.get(w) ?? null;
  const truncatedHits = (line, maskedLine) => {
    const out = [];
    for (const p of prefixes)
      for (const m of line.matchAll(p.re)) {
        // inside an exact occurrence of a longer protected term: all masked
        if (!maskedLine.slice(m.index, m.index + m[0].length).trim()) continue;
        // the phrase continues in another form: "Keys" for "Key", "Co." for "Company"
        const after = /^\s+([A-Za-z]+)/.exec(line.slice(m.index + m[0].length));
        if (after) { const w = norm(after[1]); if (w.startsWith(p.next) || p.next.startsWith(w)) continue; }
        out.push({ text: m[0].replace(/\s+/g, " "), of: p.of });
      }
    return out;
  };

  // Is `c` a protected term written differently? Returns the term, or null.
  //   atStart: `c` opens a sentence (a capital there is grammar, not spelling)
  const variantOf = (c, { atStart = false } = {}) => {
    if (/[^\x00-\x7F]/.test(c)) return null;
    // a spelling that is itself protected is never a variant of another one
    // ("zk-SNARKs" when both it and "ZK-SNARKs" are on the list)
    if (exactSet.has(c)) return null;
    // all lower case is a noun or a command ("the ledger", "zcash-cli"): case
    // is what tells the brand from the word
    if (c === c.toLowerCase()) return null;
    const t = canonical.get(c.toLowerCase()) ?? byNorm.get(norm(c));
    if (!t || t === c || equivalent(t, c)) return null;
    // a lower-case name capitalised to open a sentence ("Zebrad syncs")
    if (atStart && t === t.toLowerCase() && c === t[0].toUpperCase() + t.slice(1)) return null;
    // a Title-Case word against an oddly cased term is a different word:
    // "Seth" (a person) is not "sETH"
    if (/^[A-Z][a-z]+$/.test(c) && /^[a-z]+[A-Z]/.test(t)) return null;
    return t;
  };

  // Blank out exact protected spellings; report other spellings of them.
  const mask = (line) => (exact ? line.replace(exact, (m) => " ".repeat(m.length)) : line);
  const looseHits = (line) => (loose ? [...line.matchAll(loose)].map((m) => ({ text: m[0], index: m.index })) : []);
  return { covered, variantOf, mask, looseHits, fragmentOf, truncatedHits };
}

// ---- detection ------------------------------------------------------------------
const TOKEN = /(?<![A-Za-z0-9_\-/.@])([A-Za-z][A-Za-z0-9]*(?:[-.][A-Za-z0-9]+)*)(?![A-Za-z0-9_])/g;
// [text](url) with an optional title and <angle-bracketed> url
const LINK = /\[([^\]\n]{1,80})\]\(\s*<?(https?:\/\/[^)\s>]+)>?(?:\s+(?:"[^"]*"|'[^']*'))?\s*\)/g;
const REF_USE = /\[([^\]\n]{1,80})\]\[([^\]\n]*)\]/g;
const REF_DEF = /^\s{0,3}\[([^\]]+)\]:\s*<?(https?:\/\/[^\s>]+)>?/;
const A_TAG = /<a\s[^>]*href\s*=\s*["'](https?:\/\/[^"']+)["'][^>]*>([^<]{1,80})<\/a>/gi;

// "KuvarSend-supported", "WebZjs-compatible": the brand is the part before a
// lower-case compound suffix.
const baseToken = (t) => { const m = /^(.+?)-[a-z][a-z-]*$/.exec(t); return m ? m[1] : t; };

function shapeOf(t) {
  if (t.length < 3 || t.length > 30) return null;
  if (TECH.has(norm(t)) || TECH.has(norm(t.replace(/-\d+$/, "")))) return null;
  // a file name ("ZecAuthDaemon.md", "TomoChain.png") is not a brand
  if (/\.(md|mdx|png|jpe?g|gif|svg|webp|pdf|json|ya?ml|toml|txt|sh|js|mjs|ts|py|rs|go|html?|css|zip|tar|gz)$/i.test(t)) return null;
  const letters = t.replace(/[^A-Za-z]/g, "");
  if (letters.length < 3) return null;
  if (ACRONYMS.has(t.toUpperCase().replace(/[^A-Z0-9]/g, ""))) return null;
  if (/^[A-Z0-9]+$/.test(t) && /[A-Z]{3,}/.test(t) && t.length >= 4) return "all-caps";
  // Upper-case initial only: valueBalance, dApp, zkLayer are code or jargon.
  // Six letters minimum: short mixed-case runs are ids ("AjLkx").
  if (/^[A-Z]/.test(t) && /[a-z][A-Z]/.test(t) && t.length >= 6) return "internal-capital";
  // Needs a capital and no dot: "distractedm1nd" is a username,
  // "tampered.sha256" a file name.
  if (/[A-Za-z]\d|\d[A-Za-z]/.test(t) && /[A-Za-z]{3,}/.test(t) && /[A-Z]/.test(t) && !t.includes(".")) return "letter-digit";
  return null;
}

// Does link text name its destination? Returns the name to report, or null.
function linkName(text, url, stats) {
  const key = hostKey(url);
  if (!key) return null;
  const t = text.replace(/[*_`]/g, "").replace(/^(the|a|an)\s+/i, "").trim();
  // Latin script only: in "купить на Gemini" only "Gemini" survives
  // normalisation, and it names the host — but the text is a translation.
  if (!/[A-Za-z]{3}/.test(t) || /[^\x00-\x7F]/.test(t) || !/[A-Z]/.test(t) || t.split(/\s+/).length > 4) return null;
  const words = t.split(/\s+/);
  const core = words.map(norm).filter((w) => w.length >= 3 && !GENERIC.has(w));
  if (!core.length) return null;
  // "[Forum](forum.zcashcommunity.com)", "[Grants](zcashgrants.org)": ONE
  // ordinary word is in the host because it is ordinary. Several Title-Case
  // words spelling the host ("Light Shield", shield.lightprotocol.com) are a name.
  if (core.length === 1 && isOrdinaryWord(words.find((w) => norm(w) === core[0]) ?? core[0], stats)) return null;
  if (core.every((w) => key.includes(w))) return t;
  // "[Clipdrop by stability.ai](clipdrop.co)": the first word is the name
  const first = words[0];
  if (/^[A-Z]/.test(first) && norm(first).length >= 3 && key.startsWith(norm(first)) && !isOrdinaryWord(first, stats)) return first;
  return null;
}

// lines:     [{ n, text }] — the lines to judge (a PR's added lines, or a page)
// fullText:  the whole file those lines belong to, when known: code and comment
//            state is computed over it, and reference links resolved from it
// stats:     corpusCase(...) over the English corpus INCLUDING the new text
export function findCandidates(lines, { protection, stats, fullText = null }) {
  const found = new Map(); // term -> { term, signals:Set, lines:Set, host, variantOf }
  const add = (term, signal, n, extra = {}) => {
    term = term.trim().replace(/[’']s$/, "").replace(/^[*_("'\s]+|[*_)"'.,:;!?\s]+$/g, "");
    if (term.length < 3 || /^\d/.test(term)) return;
    const e = found.get(term) ?? { term, signals: new Set(), lines: new Set(), host: null, variantOf: null, partOf: null };
    e.signals.add(signal); e.lines.add(n);
    if (extra.host && !e.host) e.host = extra.host;
    if (extra.variantOf) e.variantOf = extra.variantOf;
    if (extra.partOf) e.partOf = extra.partOf;
    found.set(term, e);
  };
  const texts = lines.map((l) => String(l?.text ?? ""));
  let clean, raw;
  const refs = new Map();
  if (fullText != null) {
    const all = String(fullText).split("\n");
    const allClean = stripNoise(String(fullText));
    clean = lines.map((l) => allClean[(l.n ?? 0) - 1] ?? "");
    raw = lines.map((l, i) => all[(l.n ?? 0) - 1] ?? texts[i]);
    for (const l of all) { const m = REF_DEF.exec(l); if (m) refs.set(m[1].toLowerCase(), m[2]); }
  } else {
    clean = stripNoise(texts.join("\n"));
    raw = texts;
    for (const l of texts) { const m = REF_DEF.exec(l); if (m) refs.set(m[1].toLowerCase(), m[2]); }
  }
  const nOf = (i) => lines[i]?.n ?? i + 1;

  lines.forEach((_, i) => {
    const line = raw[i];
    const cl = clean[i];
    if (!cl.trim()) return; // code, comment, blank
    const heading = /^\s{0,3}#{1,6}\s/.test(line);
    // -- links (read from the raw line: stripNoise removed their targets)
    const links = [
      ...[...line.matchAll(LINK)].map((m) => [m[1], m[2]]),
      ...[...line.matchAll(REF_USE)].map((m) => [m[1], refs.get((m[2] || m[1]).toLowerCase())]).filter((x) => x[1]),
      ...[...line.matchAll(A_TAG)].map((m) => [m[2], m[1]]),
    ];
    for (const [text, url] of links) {
      if (protection.variantOf(text.trim())) continue; // judged as a variant below
      const name = linkName(text, url, stats);
      if (name && !protection.covered(name)) add(name, "link", nOf(i), { host: hostOf(url) });
    }
    // -- variants of protected terms, any spelling (multi-word, punctuated)
    for (const h of protection.looseHits(cl)) {
      const atStart = /^\s*(?:[-*+>]|\d+[.)]|#+)?\s*$/.test(cl.slice(0, h.index)) || /[.!?:]\s+$/.test(cl.slice(0, h.index));
      const v = protection.variantOf(h.text, { atStart });
      if (v) add(h.text, "variant", nOf(i), { variantOf: v });
    }
    // everything else is judged with exact protected spellings blanked out
    const masked = protection.mask(cl);
    // a leading part of a protected phrase, written without the rest
    for (const h of protection.truncatedHits(cl, masked)) add(h.text, "truncated", nOf(i), { partOf: h.of });
    for (const m of masked.matchAll(TOKEN)) {
      const t = baseToken(m[1]);
      const before = masked.slice(0, m.index);
      const atStart = /^\s*(?:[-*+>|]|\d+[.)]|#+)?\s*$/.test(before) || /[.!?:]\s+$/.test(before);
      const v = protection.variantOf(t, { atStart });
      if (v) { add(t, "variant", nOf(i), { variantOf: v }); continue; }
      // a word of a protected phrase on its own ("NEAR" of "NEAR Intents")
      const f = protection.fragmentOf(t);
      if (f) { add(t, "fragment", nOf(i), { partOf: f }); continue; }
      const s = shapeOf(t);
      // ALL-CAPS of an ordinary word is emphasis ("WORKS") — unless the corpus
      // writes it that way elsewhere too
      if (s === "all-caps" && /^[A-Z]+$/.test(t) && isOrdinaryWord(t, stats) && !((stats.capsSeen?.get(t) ?? 0) > 2)) continue;
      if (s) add(t, s, nOf(i));
    }
    if (heading) return; // headings are Title Case by convention, not evidence
    for (const m of masked.matchAll(TITLE_RUN)) {
      const words = m[1].split(" ").filter((w) => /^[A-Z]/.test(w));
      // Only the run's FIRST word can be the name: "Grayscale Investments",
      // "Docker Compose". Later words are what organisations are called.
      const w = words[0];
      if (STOP.has(w.toLowerCase()) || TECH.has(norm(w)) || isOrdinaryWord(w, stats)) continue;
      add(w, "proper", nOf(i));
    }
  });

  const out = [];
  for (const e of found.values()) {
    if (STOP.has(e.term.toLowerCase())) continue;
    if (e.signals.has("variant")) {
      out.push({ term: e.term, signals: [...e.signals], variantOf: e.variantOf, lines: [...e.lines].sort((a, b) => a - b), host: e.host });
      continue;
    }
    // part of a protected phrase: "covered" would wave it through, because the
    // shorter entry inside it is protected — that is exactly the gap
    if (e.signals.has("fragment") || e.signals.has("truncated")) {
      out.push({ term: e.term, signals: [...e.signals], partOf: e.partOf, lines: [...e.lines].sort((a, b) => a - b), host: e.host });
      continue;
    }
    if (protection.covered(e.term)) continue;
    // A proper-noun hit on its own must repeat within the change. Accepting a
    // single mention of a word new to the wiki was tried and rejected: on the
    // 47 open PRs it added Delaware, York, Jane, Sep, Northern, Continental…
    // A brand named once, with no link, shape or repeat, is the known miss;
    // the sync hold and check-brand-drift are the backstops.
    if (e.signals.size === 1 && e.signals.has("proper") && e.lines.size < 2) continue;
    out.push({ term: e.term, signals: [...e.signals], lines: [...e.lines].sort((a, b) => a - b), host: e.host });
  }
  // a single word already reported as part of a longer link name is noise
  const multi = out.filter((c) => /\s/.test(c.term));
  return out.filter((c) => /\s/.test(c.term) || !multi.some((m) => m.term.split(/\s+/).includes(c.term) && c.signals.every((s) => s === "proper")))
    .sort((a, b) => a.term.localeCompare(b.term));
}

// ---- git -------------------------------------------------------------------------
// Added lines of site/**/*.md in a unified diff (-U0), per file.
export function parseAddedLines(diff) {
  const files = new Map();
  let file = null, n = 0, prev = "";
  for (const raw of diff.split("\n")) {
    const line = raw.replace(/\r$/, "");
    // "+++ " is a file header only right after "--- " — an added markdown line
    // that starts "++ " is "+++ …" in the diff too
    if (line.startsWith("+++ ") && prev.startsWith("--- ")) {
      let p = line.slice(4).replace(/\t.*$/, "");
      if (p.startsWith('"') && p.endsWith('"')) p = p.slice(1, -1);
      p = p.replace(/^b\//, "");
      file = p !== "/dev/null" && p.endsWith(".md") && p.startsWith("site/") && !p.startsWith("site/zechubglobal/") ? p : null;
      prev = line; continue;
    }
    prev = line;
    const h = /^@@ -\d+(?:,\d+)? \+(\d+)(?:,\d+)? @@/.exec(line);
    if (h) { n = Number(h[1]); continue; }
    if (!file) continue;
    if (line.startsWith("+")) { if (!files.has(file)) files.set(file, []); files.get(file).push({ n: n++, text: line.slice(1) }); }
  }
  return files;
}
export function addedLines(base) {
  const diff = execFileSync("git", ["-c", "core.quotePath=false", "diff", "-U0", "--no-color", "--no-ext-diff", "--diff-filter=AMR", `${base}...HEAD`, "--", "site/"],
    { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  return parseAddedLines(diff);
}

export function englishCorpus() {
  return execFileSync("git", ["-c", "core.quotePath=false", "ls-files", "-z", "site/"], { encoding: "utf8" }).split("\0")
    .filter((p) => p.endsWith(".md") && !p.startsWith("site/zechubglobal/") && existsSync(p)).map((p) => readFileSync(p, "utf8"));
}

export function loadProtection(root = ".") {
  const T = JSON.parse(readFileSync(`${root}/translation/protected-terms.json`, "utf8"));
  const ig = `${root}/translation/brand-candidates-ignore.txt`;
  // "#" starts a comment only at line start or after whitespace, so "C#" works
  const ignore = existsSync(ig) ? readFileSync(ig, "utf8").split("\n").map((l) => l.replace(/(^|\s)#.*$/, "").trim()).filter(Boolean) : [];
  return makeProtection({ terms: T.preserveVerbatim ?? [], equivalentForms: T.equivalentForms ?? [], ignore });
}

function main() {
  const arg = (k) => { const i = process.argv.indexOf(k); return i > -1 ? process.argv[i + 1] : null; };
  const protection = loadProtection(".");
  let files;
  if (arg("--pages")) files = new Map(arg("--pages").split(",").map((p) => [p, readFileSync(p, "utf8").split("\n").map((text, i) => ({ n: i + 1, text }))]));
  else files = addedLines(arg("--base") ?? "origin/main");
  const stats = corpusCase(englishCorpus());
  const results = [];
  for (const [file, lines] of files) {
    const fullText = existsSync(file) ? readFileSync(file, "utf8") : null;
    for (const c of findCandidates(lines, { protection, stats, fullText })) results.push({ file, ...c });
  }
  if (process.argv.includes("--json")) { console.log(JSON.stringify(results, null, 2)); return; }
  if (!results.length) { console.log("brand candidates: none — every brand-shaped name in these lines is protected."); return; }
  for (const r of results) {
    const why = r.variantOf ? `spelled differently from the protected "${r.variantOf}"`
      : r.partOf ? `part of the protected "${r.partOf}", written without the rest — only the whole phrase is protected`
      : r.signals.join(", ") + (r.host ? ` (${r.host})` : "");
    console.log(`${r.file}:${r.lines[0]}  ${r.term}  — ${why}`);
  }
  console.log(`\nbrand candidates: ${results.length}. Add each real brand to translation/protected-terms.json, spelled as on its official site.`);
}

// realpath on both sides: a path with a space or a symlink must still run main
const isMain = (() => { try { return realpathSync(fileURLToPath(import.meta.url)) === realpathSync(process.argv[1] ?? ""); } catch { return false; } })();
if (isMain) main();
