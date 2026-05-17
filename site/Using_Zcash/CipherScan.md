<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/CipherScan.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# CipherScan — The Privacy-First Zcash Blockchain Explorer

Most blockchain explorers are designed for transparent chains, where every address, transaction, and balance is fully public. For Zcash, that approach misses the point entirely.

**[CipherScan](https://cipherscan.app)** is a Zcash-native blockchain explorer built around privacy as a first principle. Rather than exposing raw transaction data without context, CipherScan makes Zcash's privacy features understandable — for everyday users and developers alike.

> **Live at:** [cipherscan.app](https://cipherscan.app) (mainnet) and [testnet.cipherscan.app](https://testnet.cipherscan.app)

---

## What is CipherScan?

CipherScan is an open-source Zcash blockchain explorer that presents on-chain data in a way that respects Zcash's privacy design. It was built with the mission of making Zcash accessible to everyone — not just developers and cryptographers.

Unlike general-purpose explorers, CipherScan:

- Explains what it *cannot* see (shielded transaction details) rather than leaving users confused
- Provides privacy analysis tools so users can understand their own exposure
- Decrypts encrypted memo fields client-side — your viewing keys never leave your browser
- Shows real-time cross-chain ZEC flows across 15+ blockchains

The project is built on Next.js 15, TypeScript 5, and Rust compiled to WebAssembly for client-side cryptographic operations.

---

## Core Features

### 🔍 Blockchain Explorer

CipherScan's core explorer supports all the standard functions users expect:

| Feature | Details |
|---------|---------|
| **Address Search** | Look up any t-address or z-address (shielded balances are hidden by design) |
| **Transaction Lookup** | View transparent transaction inputs, outputs, and memo fields |
| **Block Browser** | Browse the chain block-by-block with full transaction lists |
| **Mempool Viewer** | See pending (unconfirmed) transactions in real time |
| **Live Updates** | WebSocket-powered real-time block notifications — no page refresh needed |

---

### 🛡️ Privacy Tools

This is where CipherScan differentiates from other explorers. Its privacy toolset helps users understand what information is visible on-chain and where risk may exist.

#### Privacy Dashboard

The Privacy Dashboard shows real-time shielded adoption metrics across the Zcash network: what percentage of transactions are fully shielded, how many are transparent, and how this ratio is trending over time. This gives the ecosystem a living pulse on Zcash's actual privacy usage.

#### Client-Side Memo Decryption

Shielded Zcash transactions (Orchard pool) can include encrypted memo fields — private messages attached to a payment. CipherScan can decrypt these memos in your browser using your viewing key.

**Security note:** The decryption runs entirely in WebAssembly (Rust compiled to WASM) inside your browser. Your viewing key is never transmitted to CipherScan's servers. You can verify this by inspecting the network requests while using the feature — no key data leaves the client.

#### Round-Trip Privacy Risk Detection

Some users unknowingly create transactions that can be linked through a "round-trip" pattern — sending funds out and receiving a related amount back in a way that allows chain analysis to correlate the two events. CipherScan's privacy risk tool detects this pattern and flags it for the address being analyzed.

This helps users identify whether their on-chain activity may be more linkable than they realize, and take corrective action before continuing.

---

### 🔗 Cross-Chain ZEC Flows

CipherScan tracks real-time ZEC movement across 15+ blockchains via NEAR Intents integration. The cross-chain view shows:

- ZEC inflows: assets arriving into Zcash from BTC, ETH, SOL, and other chains
- ZEC outflows: ZEC being swapped or bridged to other networks
- Volume and flow direction in real time

This makes CipherScan useful not just for exploring on-chain Zcash activity but for understanding how ZEC fits into the broader multi-chain ecosystem.

---

### 📚 Education and UX

CipherScan includes a built-in **Learn Zcash** section — a comprehensive guide covering:

- The difference between transparent and shielded addresses
- How viewing keys work and when to use them
- What wallet types are available and which pools they support
- How to read a Zcash transaction

This is designed for users who are new to Zcash's privacy model and want to understand what the explorer is showing them before drawing conclusions.

**Address Labels:** Users can tag addresses with custom labels stored in browser localStorage — a simple way to keep track of known addresses without creating any account or uploading data.

**Light/Dark Mode:** Full theme support with system preference detection.

**Mobile Responsive:** Full functionality on mobile browsers.

---

## Setting Up CipherScan for Blockchain Exploration

No account or installation is needed to use CipherScan as an explorer. Visit [cipherscan.app](https://cipherscan.app) and use the search bar immediately.

### Searching for an Address

1. Enter any Zcash t-address or z-address in the search bar
2. CipherScan returns the address's transparent balance and transaction history
3. For shielded (z-address) balances: these are private by design — CipherScan will indicate the address type but cannot show shielded balances without a viewing key

### Decrypting Your Transaction Memos

1. Navigate to a transaction that contains a shielded output
2. Click the decrypt memo option
3. Enter your **Incoming Viewing Key (IVK)** — found in your Zcash wallet settings
4. The memo is decrypted client-side and displayed. Nothing is sent to any server.

### Checking Privacy Risk

1. Search for a t-address
2. Navigate to the Privacy Risk tab
3. CipherScan analyzes the address's transaction history for round-trip linkability patterns
4. Flagged patterns are explained with recommendations

---

## Using CipherScan's Public API

CipherScan exposes a free public REST API documented interactively at [cipherscan.app/docs](https://cipherscan.app/docs). The API covers:

- Block data: `GET /api/blocks/{height}`
- Transaction data: `GET /api/transactions/{txid}`
- Address data: `GET /api/addresses/{address}`
- Mempool: `GET /api/mempool`
- Network stats: `GET /api/stats`

**Public Lightwalletd infrastructure:** CipherScan also provides a free public Lightwalletd gRPC and REST endpoint — the same protocol used by Zashi, Ywallet, and other light wallets. Developers building Zcash applications can use this endpoint during development and testing without running their own full node.

### Example: Fetch the latest block

```bash
curl https://cipherscan.app/api/blocks/latest
```

### Example: Look up a transaction

```bash
curl https://cipherscan.app/api/transactions/<txid>
```

Responses are standard JSON. Full schema documentation is available in the interactive docs.

---

## Integrating CipherScan with Other Applications

CipherScan's public API makes it straightforward to integrate Zcash data into external applications:

### Check ZEC balance in a script

```bash
ZEC_ADDRESS="t1YourAddressHere"
curl -s "https://cipherscan.app/api/addresses/${ZEC_ADDRESS}" | jq '.balance'
```

### Monitor for incoming transactions (webhook-style polling)

```bash
LAST_TXID=""
while true; do
  LATEST=$(curl -s "https://cipherscan.app/api/addresses/${ZEC_ADDRESS}" | jq -r '.transactions[0].txid')
  if [ "$LATEST" != "$LAST_TXID" ]; then
    echo "New transaction: $LATEST"
    LAST_TXID="$LATEST"
  fi
  sleep 60
done
```

### Real-time block subscription (WebSocket)

Developers can connect to CipherScan's WebSocket endpoint to receive push notifications when new blocks are mined, without polling.

---

## Privacy Architecture: Why Viewing Keys Never Leave Your Browser

CipherScan's memo decryption feature deserves extra explanation, because it is meaningfully different from how other tools handle key material.

Most services that offer "decrypt my memo" functionality work by sending your viewing key (or wallet seed) to a server, decrypting on the backend, and returning the result. This requires trusting the service with your key — a significant security risk.

CipherScan takes a different approach: the decryption logic is compiled from Rust to **WebAssembly (WASM)** and runs entirely inside your browser. The execution happens locally, on your machine. Your viewing key is passed only to the WASM module in the browser process — it is never transmitted over the network.

You can independently verify this: open browser developer tools, go to the Network tab, then perform a memo decryption. You will see no outbound request carrying your key material.

This is an important property for Zcash users who want to inspect their shielded transactions without compromising the privacy guarantees of their wallet.

---

## Summary

| Feature | Details |
|---------|---------|
| **Type** | Zcash blockchain explorer (privacy-first) |
| **URL** | [cipherscan.app](https://cipherscan.app) |
| **Open source** | Yes (AGPL v3 + Commons Clause) |
| **Account required** | No |
| **Memo decryption** | Client-side, viewing keys never transmitted |
| **API** | Free public REST API + Lightwalletd gRPC |
| **Cross-chain data** | ZEC flows across 15+ chains via NEAR Intents |
| **Network support** | Mainnet and Testnet |
| **Mobile support** | Yes |

CipherScan is one of the most technically capable Zcash-specific explorers available, and the only one built from the ground up around Zcash's privacy model. Whether you are a new user trying to understand your first shielded transaction or a developer building on top of Zcash's infrastructure, it provides the tooling and clarity that general-purpose explorers cannot.

---

*For related reading, see [Non-Custodial Exchanges](/site/Using_Zcash/Non-Custodial_Exchanges), [Wallets](/site/Using_Zcash/Wallets), [FROST and Multi-Signature Privacy](/site/Zcash_Tech/FROST), and [Zcash Tech Overview](/site/Zcash_Tech).*
