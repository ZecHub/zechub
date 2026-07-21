# ZEC Ledger — Zcash Transaction Accounting Tool

![License](https://img.shields.io/badge/License-MIT-blue) ![HTML](https://img.shields.io/badge/HTML-Single--file-orange) ![Zcash](https://img.shields.io/badge/Zcash-Transparent-yellow)

> A lightweight, single-file web app for tracking Zcash transparent-address activity as a running accounting ledger. Built for the ZecHub 2026 Hackathon (Accounting track).

**Live Demo:** https://mrwealthking.github.io/zec-ledger/
**Source:** https://github.com/mrwealthking/zec-ledger

Live mainnet data. No backend. No build step. No wallet keys required.

---

## 🎯 Purpose & Scope

### The Problem
Zcash's transparent pool is fully public on-chain, but there's no lightweight, open-source tool that turns that raw transaction data into something that looks and feels like an actual accounting ledger a small business or individual could use.

### Our Solution
ZEC Ledger fills that gap by turning any transparent address into a clean, exportable running ledger — similar to a bank statement — using only public on-chain data.

- **Privacy-respecting by default**: shielded transactions are never shown or queried, since they're private by design. This tool only ever surfaces already-public transparent-address data.
- **Zero setup**: a static HTML file — no server, no build tools, no wallet connection.

### Target Users

| User Type | Use Case |
|---|---|
| Small businesses accepting ZEC | Basic bookkeeping without running a full node |
| Donation address holders | Transparent, exportable record of incoming funds |
| Individuals | Personal record-keeping for a transparent address |

---

## ⚙️ Core Features

- **Live balance & running ledger** — fetches real transaction history directly from the Zcash mainnet.
- **Summary stats** — current balance, total received, total sent, transaction count.
- **Running-balance table** — every transaction in chronological order, balance after each one.
- **CSV export** — for bookkeeping, tax prep, or personal record-keeping.
- **Dual-source fallback** — pulls from 3xpl's JSON API, with a zcha.in fallback if the primary source is rate-limited or unavailable.

> **Known limitation:** the app currently loads up to the most recent **1,000 transactions** per address (a single-page API call, no pagination yet). For very high-activity addresses, summary totals reflect only that most recent window, not full lifetime history. Pagination is a planned enhancement (see Roadmap).

---

## 🏗️ System Architecture

```
Browser (static HTML/JS)
   → Cloudflare Worker (CORS proxy + response caching)
       → 3xpl JSON API (primary) / zcha.in API (fallback)
```

Since this is a static site (GitHub Pages), all data calls originate from the user's browser. A small serverless proxy (Cloudflare Worker) forwards requests server-side to avoid CORS restrictions and browser-based rate limiting from the upstream explorer APIs. The Worker also caches successful responses for 60 seconds to reduce redundant upstream calls during repeated testing/demoing.

## 🧰 Tech Stack

| Component | Technology |
|---|---|
| Frontend | Vanilla HTML/CSS/JS (single file) |
| Data Source | 3xpl JSON API (primary), zcha.in API (fallback) |
| Proxy | Cloudflare Workers (CORS passthrough + caching) |
| Hosting | GitHub Pages |

> **Note on API access:** this build currently uses 3xpl's publicly shared test JSON API key (from their Discord `#faq` channel), since dedicated free-tier access is still pending confirmation. This key is shared across all developers testing 3xpl's API, so it may occasionally be rate-limited under heavy concurrent use (e.g. many hackathon submissions being tested at once).

---

## 🚀 Roadmap & Future Enhancements

- Pagination beyond the current 1,000-transaction window (using 3xpl's `sort_key` cursor)
- Dedicated (non-shared) API key for production-grade reliability
- Support for shielded transaction *summary* stats where publicly viewable
- Multi-address portfolio view
- Persistent proxy infrastructure (currently a personal Cloudflare Worker instance)

---

## 🔗 Useful Links

- [Zcash Official Website](https://z.cash)
- [3xpl JSON API Docs](https://3xpl.com/data/json-api)
- [zcha.in Explorer](https://zcha.in)

---

Built for the ZecHub 2026 Hackathon — Accounting track.
