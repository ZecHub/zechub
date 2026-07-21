# ZEC-OS — Feature Catalogue

> **UX over ideology. Explore. Transact. Shield.**

ZEC-OS is built on one belief: **great UX is the most powerful privacy tool**. When using Zcash feels good — when exploring blocks, sending shielded transactions, or analyzing the network is intuitive and even enjoyable — more people actually do it. And that network effect matters for everyone.

This is not an ideological project. It is a UX project. The goal is to make the Zcash network genuinely accessible: whether you are a developer querying mempool depth, a merchant tracking incoming payments, a privacy researcher auditing shielding rates, or simply someone curious about the blockchain beneath their feet. ZEC-OS gives you a workspace that feels powerful without requiring deep technical knowledge.

**The Zcash network, made accessible. Tooling for data, transactions, and privacy.**

A desktop OS for the Zcash blockchain. All tools run in-browser as draggable, resizable windows. Every data view links to the Explorer; every Explorer result links outward to the tools that put it in context.

---

## Stats

Compact single-stat windows. Pin as many as you want to build a custom dashboard.

| App | Description |
|---|---|
| **Price Ticker** | Current ZEC/USD spot price, live. |
| **Block Height** | Current chain tip height, updates on each new block. |
| **Difficulty** | Current proof-of-work difficulty target. |
| **Transparent Pool** | Total ZEC value held in transparent (public) outputs. |
| **Shielded Pool** | Combined value of the Sapling and Orchard shielded pools. |
| **Pools** | Side-by-side breakdown of all four pool balances: Transparent, Sprout, Sapling, Orchard. |
| **Total Supply** | Total ZEC mined and in circulation. |
| **Total Shielded** | Aggregate ZEC value held in any shielded pool. |
| **Shielded %** | Percentage of circulating supply currently shielded. |
| **Total Txs** | Cumulative confirmed transaction count on the Zcash chain. |

---

## Charts

Historical data with selectable time ranges. All charts are zoomable and pan-able.

| App | Description |
|---|---|
| **Price Chart** | ZEC/USD price history over 1w / 1m / 3m / 1y / all. |
| **Shielded Chart** | Growth of the shielded pool over time — tracks Sapling and Orchard adoption. |
| **Pools Chart** | Stacked area chart of all four pool balances (Sprout, Sapling, Orchard, Transparent) over time. |
| **Supply / USD Chart** | Total ZEC supply plotted against USD market value. |

---

## Tools

The core analytical suite. All tools interlink — Explorer results link to TX Graph, Mempool, and Mining; Mining links back to Explorer for every address.

| App | Description |
|---|---|
| **Explorer** | Full block, transaction, and address search. Features: confirmation count, fee calculation, shielded activity per block, raw JSON toggle, date/historical-event jump, linked TX Graph and Mempool buttons, address decoder button for unified addresses, and transaction history with per-tx new-window navigation. |
| **Mempool** | Live feed of unconfirmed transactions. Heatmap view colors each cell by fee rate (green = high, red = low) with drop-shadow-legible text; table view adds size, fee, age, dependency count, and shielded flag. Auto-refreshes every 12s. Click any cell or row to open the transaction in Explorer. |
| **Mining** | Five-tab miner analytics dashboard: Leaderboard (top addresses by blocks), Pool Share (donut + table), Universe (animated radial SVG — pools orbit a central ZEC sun with flowing particle arcs), Timeline (block production over time), and Search (look up any address's mining history). All address entries link to Explorer. |
| **TX Graph** | SVG visualization of a transaction's input and output graph — source transactions on the left, current tx in the center, output addresses on the right. Shielded inputs/outputs appear as labelled opaque nodes. Open directly from any Explorer transaction result. |
| **Block Comparison** | Load two blocks by height or hash and see them side-by-side with diffed fields highlighted in gold. Each column has an "Open in Explorer" link. |
| **Address Decoder** | Paste any Zcash address (transparent or Unified) to decode it into its component receiver types (P2PKH, Sapling, Orchard) with copy-per-receiver. Accessible from Explorer when the search query looks like a UA. |
| **Watchlist** | Save and label ZEC addresses locally. Each saved entry shows its label and links to Explorer on click. Stored in localStorage — no server-side account needed. |
| **Calculator** | ZAT ↔ ZEC ↔ USD converter with live price feed. |
| **Terminal** | Command-line interface for chain data queries and ZEC-OS system information. |
| **Themes** | Switch between multiple visual themes: retro green, dark amber, high-contrast, and others. |
| **Settings** | App-level preferences (theme, font size, icon style). |
| **About ZEC-OS** | Version info, tech stack, and project credits. |

---

## Widgets

Always-available panels designed to stay open in a corner while you work in other windows.

| App | Description |
|---|---|
| **Block Ticker** | Persistent bottom strip showing the last 12 blocks in real time. Each block pill is colored by its hash, shows block height, miner tag, and tx count. Click to open in Explorer. Scroll, drag, or use arrow buttons to navigate. Reopen from the Widgets folder if closed. |
| **Halving Widget** | Countdown to the next ZEC halving event with current block subsidy, blocks remaining, and cumulative supply progress toward the 21M cap. |
| **Network Data** | Compact live panel: block height, hashrate, difficulty, price, and shielded percentage — all in one place. |
| **Charts Dashboard** | Multi-chart overview panel for a high-level sweep of price and pool trends. |

---

## Privacy

Tools for understanding and improving on-chain privacy when using Zcash.

| App | Description |
|---|---|
| **Privacy Weather** | Enter a ZEC address and get an at-a-glance privacy health score based on address type, transaction patterns, and shielding behavior. |
| **Privacy Coach** | Guided, interactive tips for improving privacy — covers address reuse, pool selection, and shielded transaction best practices. |
| **Privacy Flow Chart** | Visual diagram of how value flows between Zcash's pools (transparent → shielded → transparent), illustrating where privacy is gained or lost. |

---

## Games

| App | Description |
|---|---|
| **Dark Forest (BBS RPG)** | A text adventure set in the Zcash universe, styled as a BBS-era terminal game. |
| **Pong** | Classic two-paddle Pong, playable in-window. |
| **Shmup** | Retro side-scrolling space shooter. |

---

## Competitive Landscape

### What ZEC-OS offers vs. other Zcash block explorers

Most existing Zcash explorers (zcashblockexplorer.com, blockchair.com, zcha.in) are standard web-page explorers: search a thing, get a page, click back. ZEC-OS is a different paradigm — a persistent workspace where multiple data views are open simultaneously and every result links contextually to adjacent tools.

| Capability | Standard explorers | ZEC-OS |
|---|---|---|
| Block / TX / address lookup | ✓ | ✓ |
| ZEC price display | ✓ (most) | ✓ |
| Raw transaction JSON | ✓ | ✓ |
| Shielded pool stats | partial | ✓ (all four pools + history) |
| Shielded activity per block | rarely | ✓ (Sapling outputs/spends, Orchard actions) |
| Fee calculation | ✓ | ✓ |
| Confirmation count | ✓ | ✓ |
| **Mempool viewer** | sometimes | ✓ (live heatmap + table, fee-rate colored) |
| **Miner leaderboard / analytics** | rarely | ✓ (leaderboard + pool share + animated visualization + timeline) |
| **Transaction graph visualization** | none | ✓ (SVG input/output graph) |
| **Historical pool charts** | rarely | ✓ (Sprout / Sapling / Orchard / Transparent over time) |
| **Block comparison (diff)** | none | ✓ |
| **Unified Address decoder** | none | ✓ |
| **Privacy scoring / coaching** | none | ✓ |
| **Address watchlist** | none | ✓ |
| **Halving countdown** | some | ✓ |
| Multi-window workspace | no | ✓ |
| Cross-app linking (everything → Explorer) | no | ✓ |
| Historical event jump (named Zcash milestones) | none | ✓ |
| Block arrival ticker (live bottom strip) | none | ✓ |
| Retro OS interface with themes | no | ✓ |

### The interconnected advantage

The biggest distinction is not any single feature — it's that every piece of data leads somewhere. From a block, you can open the miner address in Explorer with one click. From a transaction, you can open the TX Graph. The Mempool button lives in Explorer's header. The Mining app links every address back to Explorer. Block Ticker pills open Explorer. Watchlist entries open Explorer.

Other tools offer isolated lookups. ZEC-OS offers a workspace: you can have a miner's address, their recent blocks, and the mempool all open side-by-side, and navigate between them without losing your place in any window.

---

## What's not yet complete

- **User authentication** — Watchlist is currently localStorage-only. A ZEC-address-based auth challenge system was planned but is not implemented. Once auth is added, watchlists can be persisted server-side.
- **Server-side watchlist persistence** — depends on auth above.
- **Mobile / responsive layout** — ZEC-OS is desktop-first; the windowing system does not adapt to small screens.
