#!/usr/bin/env node
// Link health scan for the ZecHub wiki.
//
// Reporting only. Reads site/**/*.md, resolves every link it finds, and writes a
// JSON result plus a Markdown summary. It never edits content and never opens a
// pull request; the workflow publishes the Markdown to a single dashboard issue.
//
//   node link-health/check-links.mjs --json link-health.json --markdown link-health.md
//
// Flags:
//   --json <path>       machine-readable result (default link-health.json)
//   --markdown <path>   dashboard issue body (default link-health.md)
//   --root <dir>        content root (default site)
//   --offline           skip network checks; only resolve internal routes
//   --concurrency <n>   parallel external requests (default 12)

import { readFile, writeFile, readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname, basename, relative } from "node:path";

// ── args ─────────────────────────────────────────────────────────────────────

const argv = process.argv.slice(2);
const arg = (name, fallback) => {
  const i = argv.indexOf(`--${name}`);
  return i !== -1 && argv[i + 1] ? argv[i + 1] : fallback;
};
const OUT_JSON = arg("json", "link-health.json");
const OUT_MD = arg("markdown", "link-health.md");
const ROOT = arg("root", "site");
const OFFLINE = argv.includes("--offline");
const CONCURRENCY = Number(arg("concurrency", "8"));
const TIMEOUT_MS = 15000;
const ALLOWLIST_PATH = "link-health/allowlist.txt";

// ── the wiki's URL → filename convention ─────────────────────────────────────
// Mirrors transformUri() in the zechub-wiki app (src/lib/helpers.ts). A route is
// title-cased with hyphens becoming underscores, then a small set of words is
// forced lower or upper case. Getting this wrong is the difference between a
// useful report and a page of false positives, so it is kept in step with the app.

const LOWERCASE_WORDS = ["Guides", "Tutorials", "Contribute", "In", "The", "Vs", "And", "Is", "Zk"];
const UPPERCASE_WORDS = ["Zec", "Dex", "Nft", "Zcap", "Zfav", "Snarks", "Frost", "2fa", "Pgp", "I2p", "Dao"];
const SPECIAL_WORDS = {
  Non_Custodial: "Non-Custodial",
  Zero_Knowledge: "Zero-Knowledge",
  Defi: "DeFi",
  Z2z: "z2z",
  Faq: "FAQ",
  ZECHub: "ZecHub",
  ZEChub: "ZecHub",
  Av_Club: "AV_Club",
  guides_For_Creators: "Guides_for_Creators",
  Grapheneos: "GrapheneOS",
  Vpn: "VPN",
  Dvpn: "DVPN",
  zk_Shielded: "ZK_Shielded",
  ZECweekly: "ZecWeekly",
  ZECWeekly: "ZecWeekly",
  Help_Build_ZecHub: "Help_build_ZecHub",
  zkool_Multisig: "Zkool_Multisig",
  Zenith_installation: "Zenith_Installation",
  Btcpayserver_Zcash_Plugin: "BTCPayServer_Zcash_Plugin",
  Uris: "URIs",
  Free2z_Livestreaming: "Free2Z_Livestreaming",
  Avalanche_Redbridge: "Avalanche_RedBridge",
  Raspberry_Pi_4_Zebra_Node: "Raspberry_pi_4_Zebra_Node",
  Raspberry_Pi5_Zebra_Lightwalletd_Zingo: "Raspberry_pi5_Zebra_Lightwalletd_Zingo",
  Coinholder_Directed_Retroactive_Grants: "CoinHolder_Directed_Retroactive_Grants",
  zkav: "ZKAV",
};

function transformUri(uri) {
  let t = uri.replace(/\b\w/g, (l) => l.toUpperCase()).replace(/-/g, "_");
  for (const w of LOWERCASE_WORDS) if (t.includes(w)) t = t.replace(w, w.toLowerCase());
  for (const w of UPPERCASE_WORDS) if (t.includes(w)) t = t.replace(w, w.toUpperCase());
  for (const [w, target] of Object.entries(SPECIAL_WORDS)) if (t.includes(w)) t = t.replaceAll(w, target);
  return t;
}

/** Loose comparison used by the app's fallback lookup: case and separators dropped. */
const normalize = (s) => s.replace(/\.md$/i, "").toLowerCase().replace(/[-_ ]+/g, "");

// ── file walking ─────────────────────────────────────────────────────────────

async function walk(dir, out = []) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) await walk(p, out);
    else if (e.isFile() && e.name.toLowerCase().endsWith(".md")) out.push(p);
  }
  return out;
}

// ── link extraction ──────────────────────────────────────────────────────────

const PATTERNS = [
  // ![alt](target) and [text](target) — target stops at whitespace or ")"
  { re: /!?\[[^\]]*\]\(\s*<?([^)\s>]+)>?[^)]*\)/g, group: 1 },
  // HTML attributes used by the icon markup in these pages
  { re: /\bsrc\s*=\s*["']([^"']+)["']/gi, group: 1 },
  { re: /\bhref\s*=\s*["']([^"']+)["']/gi, group: 1 },
];

function extractLinks(text, file) {
  const lines = text.split("\n");
  const found = [];
  const seenPerFile = new Map();

  // Fenced code blocks are examples, not live links.
  let inFence = false;
  lines.forEach((line, idx) => {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      return;
    }
    if (inFence) return;

    for (const { re, group } of PATTERNS) {
      re.lastIndex = 0;
      let m;
      while ((m = re.exec(line)) !== null) {
        const raw = (m[group] || "").trim();
        if (!raw) continue;
        found.push({ url: raw, file, line: idx + 1 });
        seenPerFile.set(raw, (seenPerFile.get(raw) || 0) + 1);
      }
    }
  });
  return { found, seenPerFile };
}

function classify(url) {
  if (/^https?:\/\//i.test(url)) return "external";
  if (/^(mailto|tel|ftp|ipfs|magnet):/i.test(url)) return "scheme";
  if (url.startsWith("#")) return "anchor";
  if (url.startsWith("//")) return "protocol-relative";
  if (url.startsWith("/content-images/") || url.startsWith("/content-banners/")) return "asset";
  // Absolute links ending in .md point at repository files (contributing docs do
  // this deliberately), not at wiki routes, so they are not route failures.
  if (url.startsWith("/") && /\.md($|[?#])/i.test(url)) return "repo-file";
  if (url.startsWith("/")) return "route";
  return "relative";
}

/**
 * Routes served by the Next.js app rather than by a markdown file — /wallets,
 * /dashboard, /hackathon and so on. Fetched from the app repo so the list stays
 * correct as pages are added; falls back to a static set when offline.
 */
async function loadAppRoutes(offline) {
  const fallback = [
    "wallets", "mobile-wallets", "desktop-wallets", "web-wallets", "hardware-wallets",
    "dashboard", "visualizer", "hackathon", "explore", "tools", "map", "dex", "privacy",
    "proposals", "dao", "newsletter", "tutorials", "developers", "zips", "zips-grants",
    "gallery", "welcome", "sitemap", "donation", "zebra", "zcash-projects",
    "protocol-parameters", "zcash-evolution", "visual-identity", "governance-howto",
    "zcash-global-ambassadors", "zcash-payment-uri", "zcash-pool-visualizer",
    "zksnark-proof-visualizer", "zcash-infrastructure-visualizer", "omniflix",
    "aborist-calls", "zechub-tutorial", "zechub-tutorials", "using-zcash",
  ];
  if (offline) return new Set(fallback);
  try {
    const res = await fetch("https://api.github.com/repos/ZecHub/zechub-wiki/git/trees/main?recursive=1", {
      headers: {
        accept: "application/vnd.github+json",
        "user-agent": "ZecHubLinkHealth/1.0",
        ...(process.env.GITHUB_TOKEN ? { authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
      },
    });
    if (!res.ok) return new Set(fallback);
    const tree = await res.json();
    const prefix = "src/app/[locale]/";
    const routes = new Set(fallback);
    for (const n of tree.tree) {
      if (!n.path.startsWith(prefix) || !n.path.endsWith("/page.tsx")) continue;
      const seg = n.path.slice(prefix.length, -"/page.tsx".length);
      if (seg && !seg.includes("[")) routes.add(seg);
    }
    return routes;
  } catch {
    return new Set(fallback);
  }
}

// ── internal route resolution ────────────────────────────────────────────────

function routeExists(route, mdFiles, appRoutes) {
  const clean = route.split("#")[0].split("?")[0].replace(/\/+$/, "");
  if (!clean || clean === "/") return { ok: true, how: "site root" };

  // Pages rendered by the app itself have no markdown behind them.
  const segs = clean.replace(/^\//, "");
  if (appRoutes.has(segs) || appRoutes.has(segs.split("/")[0])) {
    return { ok: true, how: "app route" };
  }

  const target = `site${transformUri(clean)}.md`;
  if (existsSync(target)) return { ok: true, how: "exact" };

  // The app falls back to a loose match inside the same folder, so a report that
  // ignored this would flag links that actually resolve in production.
  const wanted = normalize(basename(clean));
  const folder = dirname(target);
  const sibling = mdFiles.find(
    (f) => dirname(f) === folder && (normalize(basename(f)) === wanted || normalize(basename(f)).includes(wanted)),
  );
  if (sibling) return { ok: true, how: `fuzzy → ${sibling}` };

  // Some routes are app pages rather than markdown (for example /wallets).
  return { ok: false, how: `no file at ${target}` };
}

// ── external checking ────────────────────────────────────────────────────────

async function checkExternal(url) {
  const attempt = async (method) => {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    try {
      const res = await fetch(url, {
        method,
        redirect: "manual",
        signal: ctrl.signal,
        headers: {
          "user-agent":
            "Mozilla/5.0 (compatible; ZecHubLinkHealth/1.0; +https://github.com/ZecHub/zechub)",
          accept: "*/*",
        },
      });
      return { status: res.status, location: res.headers.get("location") };
    } finally {
      clearTimeout(timer);
    }
  };

  try {
    let r = await attempt("HEAD");
    // Plenty of hosts refuse HEAD; confirm with GET before calling it broken.
    if (r.status === 405 || r.status === 403 || r.status === 501) r = await attempt("GET");

    if (r.status >= 200 && r.status < 300) return { state: "ok", status: r.status };
    if (r.status >= 300 && r.status < 400) return { state: "redirect", status: r.status, to: r.location };
    return { state: "broken", status: r.status };
  } catch (err) {
    const msg = String(err?.cause?.code || err?.name || err?.message || err);
    if (/abort/i.test(msg)) return { state: "timeout", detail: `no response in ${TIMEOUT_MS / 1000}s` };
    if (/ENOTFOUND|EAI_AGAIN|DNS/i.test(msg)) return { state: "dns", detail: msg };
    if (/CERT|SSL|TLS/i.test(msg)) return { state: "tls", detail: msg };
    return { state: "error", detail: msg };
  }
}

async function pool(items, limit, worker) {
  const out = new Array(items.length);
  let next = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (true) {
      const i = next++;
      if (i >= items.length) return;
      out[i] = await worker(items[i], i);
    }
  });
  await Promise.all(runners);
  return out;
}

// ── suggested actions ────────────────────────────────────────────────────────

const ACTIONS = {
  broken: "Confirm the page moved or was removed, then update or drop the link.",
  dns: "Domain does not resolve. The site is likely gone; replace or remove the link.",
  timeout: "No response in time. Recheck manually; add to the allowlist if the host is simply slow.",
  tls: "Certificate problem. Verify the host before trusting the link.",
  error: "Request failed. Recheck manually.",
  redirect: "Point the link at its final destination so readers skip the hop.",
  route: "Internal route resolves to no file. Check spelling and the In/The/And/Is/Vs casing rule.",
  asset: "Asset is not in the wiki repo. Upload it or correct the path.",
  invalid: "Malformed URL. Fix the link syntax.",
  duplicate: "Same URL repeated in one file. Usually harmless, sometimes a copy-paste slip.",
};

// ── main ─────────────────────────────────────────────────────────────────────

async function main() {
  const startedAt = new Date().toISOString();

  let allowlist = [];
  try {
    allowlist = (await readFile(ALLOWLIST_PATH, "utf8"))
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith("#"));
  } catch {
    /* optional file */
  }
  const allowed = (url) => allowlist.some((p) => url.includes(p));

  // Guard: fail immediately if --root does not exist
  if (!existsSync(ROOT)) {
    console.error(`Error: content root does not exist: ${ROOT}`);
    console.error("Create the directory or use --root to point at a valid content root.");
    process.exit(1);
  }

  const mdFiles = await walk(ROOT);
  const appRoutes = await loadAppRoutes(OFFLINE);

  // Assets live in the wiki app repo, so confirm them over the API when we can.
  let assetSet = null;
  if (!OFFLINE) {
    try {
      const res = await fetch(
        "https://api.github.com/repos/ZecHub/zechub-wiki/git/trees/main?recursive=1",
        {
          headers: {
            accept: "application/vnd.github+json",
            "user-agent": "ZecHubLinkHealth/1.0",
            ...(process.env.GITHUB_TOKEN ? { authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
          },
        },
      );
      if (res.ok) {
        const tree = await res.json();
        assetSet = new Set(
          tree.tree
            .filter((n) => n.path.startsWith("public/"))
            .map((n) => "/" + n.path.slice("public/".length)),
        );
      }
    } catch {
      /* asset checking is best effort */
    }
  }

  const findings = [];
  const externalTargets = new Map(); // url -> occurrences
  let linkCount = 0;

  for (const file of mdFiles) {
    const text = await readFile(file, "utf8");
    const { found, seenPerFile } = extractLinks(text, file);
    linkCount += found.length;

    for (const [url, count] of seenPerFile) {
      if (count > 1 && classify(url) === "external") {
        findings.push({ kind: "duplicate", url, file, count, detail: `appears ${count} times in this file` });
      }
    }

    for (const link of found) {
      const kind = classify(link.url);
      if (kind === "anchor" || kind === "scheme" || kind === "relative" || kind === "repo-file") continue;

      if (kind === "protocol-relative") {
        findings.push({ kind: "invalid", url: link.url, file: link.file, line: link.line, detail: "protocol-relative URL" });
        continue;
      }

      if (kind === "route") {
        const r = routeExists(link.url, mdFiles, appRoutes);
        if (!r.ok) findings.push({ kind: "route", url: link.url, file: link.file, line: link.line, detail: r.how });
        continue;
      }

      if (kind === "asset") {
        if (assetSet && !assetSet.has(link.url.split("?")[0])) {
          findings.push({ kind: "asset", url: link.url, file: link.file, line: link.line, detail: "not found in zechub-wiki/public" });
        }
        continue;
      }

      if (kind === "external") {
        let parsed;
        try {
          parsed = new URL(link.url);
        } catch {
          findings.push({ kind: "invalid", url: link.url, file: link.file, line: link.line, detail: "unparseable URL" });
          continue;
        }
        if (allowed(parsed.href)) continue;
        if (!externalTargets.has(parsed.href)) externalTargets.set(parsed.href, []);
        externalTargets.get(parsed.href).push(link);
      }
    }
  }

  // One request per distinct URL no matter how many pages cite it.
  const urls = [...externalTargets.keys()];
  let checked = 0;
  let retried = 0;
  if (!OFFLINE && urls.length) {
    let results = await pool(urls, CONCURRENCY, (u) => checkExternal(u));
    checked = urls.length;

    // A single connection failure usually means we saturated the local socket
    // pool, not that the site is down. Anything that failed at the network layer
    // is retried once, slowly, and only reported if it fails again. Without this
    // a large sweep reports hundreds of live sites as broken.
    const transient = new Set(["timeout", "error", "dns", "tls"]);
    const suspects = [];
    results.forEach((r, i) => {
      if (transient.has(r.state)) suspects.push(i);
    });
    if (suspects.length) {
      retried = suspects.length;
      const second = await pool(suspects.map((i) => urls[i]), 4, (u) => checkExternal(u));
      suspects.forEach((idx, k) => {
        results[idx] = second[k];
      });
    }

    results.forEach((r, i) => {
      const url = urls[i];
      const where = externalTargets.get(url);
      if (r.state === "ok") return;
      findings.push({
        kind: r.state,
        url,
        file: where[0].file,
        line: where[0].line,
        alsoIn: where.length > 1 ? where.length - 1 : 0,
        status: r.status,
        detail: r.to ? `→ ${r.to}` : r.detail || `HTTP ${r.status}`,
      });
    });
  }

  const order = ["dns", "broken", "route", "asset", "tls", "timeout", "error", "invalid", "redirect", "duplicate"];
  findings.sort((a, b) => order.indexOf(a.kind) - order.indexOf(b.kind) || a.file.localeCompare(b.file));

  const totals = Object.fromEntries(order.map((k) => [k, findings.filter((f) => f.kind === k).length]));
  const serious = totals.dns + totals.broken + totals.route + totals.asset + totals.invalid;

  const report = {
    generatedAt: startedAt,
    filesScanned: mdFiles.length,
    linksFound: linkCount,
    uniqueExternalChecked: checked,
    retriedAfterNetworkFailure: retried,
    allowlistEntries: allowlist.length,
    totals,
    serious,
    findings,
  };
  await writeFile(OUT_JSON, JSON.stringify(report, null, 2));
  await writeFile(OUT_MD, renderMarkdown(report));

  console.log(
    `Scanned ${mdFiles.length} files, ${linkCount} links, ${checked} unique external ` +
      `(${retried} retried after a network failure). ` +
      `${serious} needing attention, ${totals.redirect} redirects, ${totals.duplicate} duplicates.`,
  );
}

// ── markdown ─────────────────────────────────────────────────────────────────

const LABELS = {
  dns: "Domain does not resolve",
  broken: "Broken links",
  route: "Broken internal routes",
  asset: "Missing assets",
  tls: "Certificate problems",
  timeout: "Timeouts",
  error: "Request errors",
  invalid: "Invalid URLs",
  redirect: "Redirects",
  duplicate: "Duplicate URLs",
};

// GitHub issue bodies cap at 65536 characters, so rows are capped per section and
// anything dropped is stated rather than silently trimmed.
const MAX_ROWS = 40;

function renderMarkdown(r) {
  const L = [];
  L.push("<!-- link-health-dashboard -->");
  L.push("");
  L.push(
    `Scanned **${r.filesScanned}** pages and **${r.linksFound}** links ` +
      `(**${r.uniqueExternalChecked}** unique external targets) at ${r.generatedAt}.`,
  );
  L.push("");
  L.push(
    r.serious === 0
      ? "**No broken links, dead domains, missing assets or bad routes.**"
      : `**${r.serious} link${r.serious === 1 ? "" : "s"} need attention.**`,
  );
  L.push("");

  const counts = Object.entries(r.totals).filter(([, n]) => n > 0);
  if (counts.length) {
    L.push("| Category | Count |");
    L.push("|---|---|");
    for (const [k, n] of counts) L.push(`| ${LABELS[k] || k} | ${n} |`);
    L.push("");
  }

  for (const kind of Object.keys(LABELS)) {
    const rows = r.findings.filter((f) => f.kind === kind);
    if (!rows.length) continue;
    L.push(`### ${LABELS[kind]} (${rows.length})`);
    L.push("");
    L.push(`_${ACTIONS[kind]}_`);
    L.push("");
    L.push("| URL | Source | Detail |");
    L.push("|---|---|---|");
    for (const f of rows.slice(0, MAX_ROWS)) {
      const url = f.url.length > 90 ? f.url.slice(0, 87) + "..." : f.url;
      const src = f.line ? `${f.file}:${f.line}` : f.file;
      const extra = f.alsoIn ? ` (+${f.alsoIn} more page${f.alsoIn === 1 ? "" : "s"})` : "";
      L.push(`| ${url.replace(/\|/g, "\\|")} | ${src}${extra} | ${(f.detail || "").replace(/\|/g, "\\|")} |`);
    }
    if (rows.length > MAX_ROWS) {
      L.push("");
      L.push(`_${rows.length - MAX_ROWS} more not shown. Full list in the workflow artifact._`);
    }
    L.push("");
  }

  L.push("---");
  L.push("");
  L.push(
    `Reporting only, no content is modified. Allowlist: \`${ALLOWLIST_PATH}\` ` +
      `(${r.allowlistEntries} entr${r.allowlistEntries === 1 ? "y" : "ies"}). ` +
      "Runs weekly and on demand from the Actions tab.",
  );
  return L.join("\n");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
