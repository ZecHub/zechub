# ZecAuth

**Wallet connection protocol for Zcash.** Free, instant, privacy-preserving authentication.

Ethereum has WalletConnect. Solana has Wallet Adapter. Zcash has had nothing — so we built it.
ZecAuth is a new wallet-connection protocol designed from the ground up for Zcash's privacy model:
sign in to any app with your wallet, approve payments, and share exactly the data you choose.

**No transaction. No fee. No chain interaction.** Pure cryptographic authentication.

> **ZecHub Hackathon 3.0 submission — "Zcash Login" track.**
> Demo video: [youtu.be/bh9cmXgkWqI](https://youtu.be/bh9cmXgkWqI) ·
> Spec: [PROTOCOL.md](PROTOCOL.md) ·
> Try it yourself in 60 seconds: [jump to the tour](#for-judges--60-second-tour)

## How it works

1. A dApp shows a QR code (or `zecauth://` deep link) containing a challenge, plus the
   **capabilities** it wants — sign-in, payment requests, viewing permissions.
2. You scan it with a ZecAuth-enabled wallet. The wallet shows the requesting domain and a
   per-capability approve/deny toggle.
3. The wallet signs the challenge with a **dedicated auth key** derived from the wallet seed at
   ZIP-32 path `m / 616' / coin_type' / account'` — completely isolated from spending keys, so a
   compromised auth key can never move funds.
4. The dApp verifies the RedPallas signature, checks the nonce, domain, and expiry, and issues a
   session. Your public key is your identity — and by default it's a *different* identity for
   every app, so dApps can't correlate you.

## For judges — 60-second tour

The fastest proof the protocol works, zero setup beyond a Rust toolchain:

```sh
cargo run -p zecauth-cli -- demo
```

That runs the entire protocol in your terminal in five steps: key derivation → challenge →
wallet approval → RedPallas signing → server-side verification. Ends with `Cost: FREE.`

Two minutes more gets you the real browser round-trip:

```sh
cargo run -p zecauth-server        # serves the demo dApp at http://127.0.0.1:3000
```

Open http://127.0.0.1:3000, click **Connect wallet**, and follow the on-screen CLI
instructions (`cargo run -p zecauth-cli -- sign ...` — the CLI auto-POSTs the signed response
to the callback and the page logs in live).

Where the impressive parts live:

| What | Where |
|---|---|
| Pure-TS crypto byte-verified against Rust, both directions | [`sdks/react-native/test`](sdks/react-native/test), [`crates/zecauth-testvectors`](crates/zecauth-testvectors) |
| Auth keys isolated from spending keys (purpose `616'` vs `32'`) | [`crates/zecauth-core/src/keys.rs`](crates/zecauth-core/src/keys.rs) |
| Per-dApp unlinkable identities (domain-scoped derivation) | [`crates/zecauth-core/src/keys.rs`](crates/zecauth-core/src/keys.rs) |
| Server-side capability enforcement (JWT-bound grants) | [`crates/zecauth-server/src/main.rs`](crates/zecauth-server/src/main.rs) |
| Wallet-side disclosure guard (requested ∩ granted only) | [`sdks/react-native/src/protocol/wallet.ts`](sdks/react-native/src/protocol/wallet.ts) |

## Protocol at a glance

Full specification: [PROTOCOL.md](PROTOCOL.md) (v1, Draft).

| Aspect | Design |
|---|---|
| Identity | 32-byte RedPallas verification key (64 hex chars) — the pubkey *is* the user |
| Key derivation | ZIP-32 arbitrary key derivation at `m / 616' / coin_type' / account'` (all hardened); context `"ZcashZecauthAuth"`, or `"ZcashZecauthAuth:<domain>"` for per-app identities |
| Signature scheme | RedPallas (`reddsa`, Orchard SpendAuth domain) over the Pallas curve — the same curve Zcash Orchard uses; 64-byte signatures |
| Challenge format | SIWE-inspired human-readable text — the user signs exactly what they see ([§3](PROTOCOL.md#3-challenge-message-format)) |
| Replay protection | ≥128-bit single-use nonce, 5-minute TTL, domain + chain binding ([§7](PROTOCOL.md#7-security-considerations)) |
| Transport | `zecauth://` QR / deep link, inline or QR-friendly short link ([§4.2](PROTOCOL.md#42-deep-link-uri)) |
| Capabilities | `signin`, `sign-transaction`, `view-address`, `view-balance`, `view-incoming`, `view-history`, `view-full` ([§3.5](PROTOCOL.md#35-capabilities)) |
| Sessions | dApp verifies the response then issues its own session (reference server: 24-hour JWT) |

Capabilities are what makes ZecAuth a *connection* protocol rather than just a login: a dApp
declares what it wants to do (`sign-transaction` lets it push payment requests to the connected
wallet — the wallet still prompts for every payment), the wallet renders each capability as a
toggle, and the server enforces grants — a transaction request from a session that denied
`sign-transaction` is rejected with `capability_not_granted`, regardless of what the client
claims. Capabilities ride *outside* the signed bytes by design: the signature covers only
identity, nonce, domain, and expiry ([§3.5](PROTOCOL.md#35-capabilities)).

Viewing capabilities use Zcash-native **disclosures**: `view-full` shares a read-only Unified
Full Viewing Key (`uview...`) — ongoing balance/history visibility with zero spend authority,
something no other chain's connection protocol can offer ([§3.6](PROTOCOL.md#36-disclosures)).

## How ZecAuth uses the Zcash network

Authentication itself is deliberately off-chain — that is the point: signing in must stay free,
instant, and leave no on-chain trace. Everything the protocol *is made of*, however, is Zcash
mainnet:

- **Keys** are derived from the wallet's mainnet seed via ZIP-32 arbitrary key derivation
  (SLIP-44 coin type `133`), the same tree that holds the user's spending keys
  ([`keys.rs`](crates/zecauth-core/src/keys.rs)).
- **Signatures** are RedPallas in the Orchard SpendAuth domain — the exact scheme Zcash uses
  for spend authorization — so any wallet that can spend Orchard funds already has the
  primitives to speak ZecAuth.
- **Challenges are chain-bound** to `zcash:mainnet`; a signature produced for testnet is
  rejected on mainnet and vice versa.
- **Disclosures** are native mainnet objects: ZIP-316 Unified Addresses (`u1...`) and Unified
  Full Viewing Keys (`uview1...`) derived from the wallet's spending key.
- **Payments** requested through `sign-transaction` are real shielded mainnet transactions:
  the protocol carries recipient, amount, and memo to the connected wallet, which prompts the
  user and builds/broadcasts the transaction with its own light-client stack.

## Components

| Component | Path | What it is |
|---|---|---|
| `zecauth-core` | [`crates/zecauth-core`](crates/zecauth-core) | Protocol cryptography: ZIP-32 auth-key derivation, RedPallas sign/verify, challenge + transaction types, scopes. 39 unit tests. |
| `zecauth-cli` | [`crates/zecauth-cli`](crates/zecauth-cli) | Demo wallet CLI: `init`, `pubkey`, `sign`, `approve-tx`, `demo`. |
| `zecauth-server` | [`crates/zecauth-server`](crates/zecauth-server) | Reference dApp server (Axum): challenge issuance, verification, JWT sessions, WebSocket relay + polling fallback; serves the demo dApp UI. |
| `zecauth-ffi` | [`crates/zecauth-ffi`](crates/zecauth-ffi) | C ABI (`cdylib`/`staticlib`) over `zecauth-core` — one audited crypto core for all native platforms. Header: [`sdks/zecauth.h`](sdks/zecauth.h). |
| `zecauth-testvectors` | [`crates/zecauth-testvectors`](crates/zecauth-testvectors) | Cross-implementation conformance harness: generates vectors for the TS SDK and verifies JS-produced signatures with Rust. |
| `@zecauth/dapp` | [`sdks/dapp`](sdks/dapp) | TypeScript SDK for websites: declare capabilities, create QR challenges, verify responses, manage sessions, push transaction requests. |
| `@zecauth/wallet` | [`sdks/wallet`](sdks/wallet) | Thin delegating wallet SDK — bring your own RedPallas signer; the SDK parses challenges and builds canonical messages. |
| `@zecauth/react-native` | [`sdks/react-native`](sdks/react-native) | Self-contained pure-TypeScript wallet SDK: full RedPallas + ZIP-32 reimplementation, **byte-verified against `zecauth-core`** in both directions. No native modules — runs in Hermes, web, and Node. |
| Kotlin SDK | [`sdks/kotlin`](sdks/kotlin) | `dev.zecauth.ZecAuth` — JNI wrapper over `zecauth-ffi` for Android wallets. |
| Swift SDK | [`sdks/swift`](sdks/swift) | `ZecAuth` — direct C FFI wrapper over `zecauth-ffi` for iOS wallets. |
| Demo dApp | [`demo-dapp`](demo-dapp) | Vite + React web app built on `@zecauth/dapp`: QR sign-in with live countdown, capability display, disclosure ledger, payment requests, privacy-preserving payment verifier. |

## Quick start

### Build and test the Rust workspace

```sh
cargo build --workspace
cargo test
```

### Run the self-contained CLI demo

```sh
cargo run -p zecauth-cli -- demo
```

Runs the full protocol flow in your terminal: key derivation → challenge → approval → signing →
verification.

### Run the demo dApp

```sh
# Start the server (serves the web UI at http://127.0.0.1:3000)
cargo run -p zecauth-server

# In another terminal: create a CLI wallet and print your identity
cargo run -p zecauth-cli -- init
cargo run -p zecauth-cli -- pubkey
```

Open http://127.0.0.1:3000, click **Connect wallet**, and sign with the CLI wallet. For
frontend development, `npm run dev` in `demo-dapp/` starts Vite on port 5173 with `/auth`,
`/tx`, `/session`, and `/wallet` proxied to the Rust server.

Step-by-step walkthrough: [docs/DEMO.md](docs/DEMO.md).

## For dApp developers

```ts
import { ZecAuth } from "@zecauth/dapp";

const zecauth = new ZecAuth({
  domain: "myapp.com",
  server: "/auth",
  capabilities: ["signin", "sign-transaction"], // what your app wants to do
});

// 1. Sign in — the wallet displays the requested capabilities, then signs the challenge
const challenge = await zecauth.createChallenge(); // render challenge.uri as a QR
const session = await zecauth.verify(walletResponse);
console.log(session.pubkey); // the user's identity

// 2. Request a payment — pushed to the connected wallet over its relay socket, no QR rescan
const tx = await zecauth.createTransactionRequest({ recipient: "u1...", amount: "0.5" });
```

The Rust core (`ChallengeMessage`, `verify_response`) implements the same protocol for non-JS
backends. Full integration guide: [docs/INTEGRATION.md](docs/INTEGRATION.md).

## For wallet developers

Integration is ~10 lines on every platform. Kotlin and Swift wrap the same Rust core via
`zecauth-ffi`; React Native uses the byte-verified pure-TS implementation.

```ts
import { ZecAuthWallet, mnemonicToSeed } from "@zecauth/react-native";
import "react-native-get-random-values";

const wallet = new ZecAuthWallet({ seed: mnemonicToSeed(phrase), network: "mainnet" });
const challenge = wallet.parseChallenge(scannedQr);
// show challenge.capabilities to the user, then:
await wallet.submit(await wallet.approveAuth(challenge), challenge.callbackUrl!);
```

```kotlin
val zecAuth = ZecAuth(walletSeedHex, ZecAuth.Network.MAINNET)
val response = zecAuth.signChallenge(challengeJson)   // POST to the callback URL
```

```swift
let zecAuth = try ZecAuth(seedHex: walletSeedHex, network: .mainnet)
let response = try zecAuth.signChallenge(challengeJSON)
```

Wallets that manage their own keys can use [`@zecauth/wallet`](sdks/wallet) instead and inject a
signer. Details: [docs/INTEGRATION.md](docs/INTEGRATION.md).

## Project structure

```
zecauth/
├── crates/
│   ├── zecauth-core/        # Protocol cryptography (derivation, signing, verification)
│   ├── zecauth-cli/         # CLI demo wallet
│   ├── zecauth-server/      # Reference dApp server (Axum, JWT sessions, WS relay)
│   ├── zecauth-ffi/         # C ABI over zecauth-core for Kotlin/Swift
│   └── zecauth-testvectors/ # Cross-implementation conformance harness
├── sdks/
│   ├── dapp/                # @zecauth/dapp — TS SDK for websites
│   ├── wallet/              # @zecauth/wallet — delegating TS wallet SDK
│   ├── react-native/        # @zecauth/react-native — pure-TS wallet SDK (byte-verified)
│   ├── kotlin/              # dev.zecauth.ZecAuth (JNI over zecauth-ffi)
│   ├── swift/               # ZecAuth (C FFI over zecauth-ffi)
│   └── zecauth.h            # C header for the FFI
├── demo-dapp/               # Vite + React demo web app
├── brand/                   # Logo and mark assets
├── docs/                    # Integration guide, demo walkthrough
├── PROTOCOL.md              # Protocol specification (v1)
└── LICENSE                  # MIT
```

## Security model

- Auth keys are derived at ZIP-32 purpose `616'`, fully isolated from spending keys at purpose
  `32'`. Compromise of an auth key cannot spend funds, and rotating identities (bump the account
  index) never touches wallet funds.
- Per-domain key derivation gives each dApp a different pubkey from the same seed, preventing
  cross-dApp correlation. The auth pubkey reveals nothing about shielded addresses or balances.
- The user signs the exact human-readable text they are shown (SIWE-style) — no blind signing.
- Challenges are domain-bound (phishing protection), chain-bound, nonce-protected (single-use,
  ≥128 bits entropy), and time-bounded (5-minute TTL).
- Capabilities are deliberately excluded from the signed bytes; they are enforced server-side
  (per-deployment allow-list, grants bound into the session JWT) and at point of use by the
  wallet, which prompts for every payment regardless of granted capabilities.
- Wallet SDKs attach a disclosure only if its capability was both requested by the dApp *and*
  granted by the user — a wallet physically cannot over-share.

Full threat model: [PROTOCOL.md §7](PROTOCOL.md#7-security-considerations).

## Testing

```sh
# Rust: 39 unit tests in zecauth-core (determinism, per-account/network/domain isolation,
# tamper rejection, wrong-key rejection, serde roundtrips)
cargo test

# Cross-implementation vectors: Rust generates, TypeScript must reproduce byte-for-byte
cargo run -p zecauth-testvectors            # regenerates sdks/react-native/test/vectors.json

cd sdks/react-native
npm test                                    # TS reproduces Rust intermediates, pubkeys, sigs
npm run test:vectors                        # TS signs → the Rust binary verifies (reverse direction)
```

The conformance harness re-derives keys with raw `pasta_curves`/`ff`/`group` primitives —
independent of `zecauth-core`'s own code path — and asserts byte-equality, then checks
JS-produced signatures with the actual Rust verifier. Two implementations, one protocol.

## Documentation

| Doc | Contents |
|---|---|
| [PROTOCOL.md](PROTOCOL.md) | Protocol specification: derivation, challenge format, capabilities, disclosures, verification, threat model |
| [docs/INTEGRATION.md](docs/INTEGRATION.md) | dApp and wallet integration guide across all five SDKs |
| [docs/DEMO.md](docs/DEMO.md) | Step-by-step demo walkthrough (CLI and browser) |
| [sdks/react-native/README.md](sdks/react-native/README.md) | Pure-TS SDK API and cross-verification details |

## License

[MIT](LICENSE)
