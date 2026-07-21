# Integrating ZecAuth

This guide covers both sides of the protocol: adding ZecAuth support to a **wallet**, and adding
"Sign in with Zcash" to a **dApp**. For the wire format and cryptography, see
[PROTOCOL.md](../PROTOCOL.md). For a guided tour of the running demos, see [DEMO.md](DEMO.md).

## Pick your SDK

| SDK | Side | Language | Crypto | Best for |
|---|---|---|---|---|
| [`@zecauth/react-native`](../sdks/react-native) | Wallet | TypeScript | Self-contained (pure TS, byte-verified vs Rust) | React Native / JS wallets — no native module needed |
| [`@zecauth/wallet`](../sdks/wallet) | Wallet | TypeScript | Bring-your-own signer | Wallets that already manage a RedPallas signer |
| [Kotlin](../sdks/kotlin) | Wallet | Kotlin (JNI) | Rust `zecauth-ffi` | Android wallets |
| [Swift](../sdks/swift) | Wallet | Swift (C FFI) | Rust `zecauth-ffi` | iOS wallets |
| [`@zecauth/dapp`](../sdks/dapp) | dApp | TypeScript | None needed (verification is server-side) | Any web app |

Kotlin and Swift are thin single-file wrappers over one audited Rust core
([`crates/zecauth-ffi`](../crates/zecauth-ffi), C ABI in [`sdks/zecauth.h`](../sdks/zecauth.h)).
The react-native SDK reimplements the same core in pure TypeScript and is verified byte-for-byte
against Rust in both directions (see [Cross-implementation verification](#cross-implementation-verification)).

---

## Wallet developers

A ZecAuth wallet needs to do four things: derive the auth key from the wallet seed, parse a
scanned/deep-linked request, show the user what is being asked (capabilities), and sign + submit
the approval. Auth keys live at ZIP-32 purpose `616'` — fully isolated from spending keys at
`32'`, so a compromised auth key can never move funds.

### React Native / JavaScript — `@zecauth/react-native`

Pure TypeScript (runs in Hermes, web, and Node) with `@noble/curves`, `@noble/hashes`,
`@scure/bip39`. No native modules.

```sh
npm install @zecauth/react-native react-native-get-random-values
```

Install the RNG once at app startup, **before anything else**:

```ts
import 'react-native-get-random-values'; // installs crypto.getRandomValues
```

Core flow:

```ts
import { ZecAuthWallet, mnemonicToSeed } from '@zecauth/react-native';

const wallet = new ZecAuthWallet({
  seed: mnemonicToSeed(recoveryPhrase), // >= 32 bytes
  network: 'mainnet',                   // or 'testnet'
  // account: 0, domainScoped: true (defaults)
});

// On QR scan or zecauth:// deep link:
const challenge = wallet.parseChallenge(scannedPayload);
// render challenge.capabilities for per-capability approve/reject toggles …

const response = await wallet.approveAuth(challenge, { granted, disclosures });
await wallet.submit(response, challenge.callbackUrl!);
```

Or drive the whole lifecycle with the React hook:

```ts
const { status, challenge, transaction, open, approve, deny, reset } = useZecAuthRequest(wallet);
// status: idle | resolving | reviewing | signing | submitting | success | error
```

Useful extras:

- `wallet.detect(payload)` classifies a payload as `'auth' | 'transaction'`;
  `wallet.parseTransaction()` + `approveTransaction()/denyTransaction()` handle payment requests.
- `wallet.fetchRequest(url)` resolves short links (`zecauth://host?req=<url>`) and re-classifies
  the payload locally, so a malicious server cannot smuggle a different request kind.
- `ZecAuthRelay` keeps a WebSocket per session so dApp-initiated transaction requests pop as
  approval screens without a QR scan. `disconnectSession()` ends a session server-side.
- `WalletVault` / `SessionStore` are storage helpers over any `SecureStorage` backend
  (Keychain/Keystore adapter of your choice).
- Domain-scoped identities are on by default: each dApp sees an unlinkable per-domain pubkey.

**Disclosure privacy guard:** `approveAuth` only emits disclosures whose capability was both
requested by the dApp *and* granted by the user (requested ∩ granted). A wallet using this SDK
physically cannot over-share; a rejected capability leaks nothing.

### TypeScript with your own keys — `@zecauth/wallet`

For wallets that already hold keys elsewhere. The SDK parses/builds canonical messages and
submits; you inject the signer — it never touches your seed:

```ts
import { ZecAuthWallet } from '@zecauth/wallet';

const wallet = new ZecAuthWallet({
  network: 'mainnet',
  pubkey: authPubkeyHex,
  sign: (msg: Uint8Array) => myKeyManager.signWithAuthKey(msg), // 64-byte RedPallas sig
  // optional per-domain identities:
  // signForDomain: (domain, msg) => ({ pubkey, signature }),
});

const challenge = wallet.parseChallenge(qrData);
const response = await wallet.approveAuth(challenge);
await wallet.submit(response, challenge.callbackUrl!);
```

`parseChallenge` validates domain, URI, `version === 1`, `chain === "zcash:<network>"`, nonce,
and the issued-at/expiration window before you ever show an approval screen.

### Android — Kotlin SDK

Single file `dev.zecauth.ZecAuth`, JNI over the Rust FFI. Build and bundle `libzecauth_ffi`
(from `crates/zecauth-ffi`) for your ABIs; the class loads it via
`System.loadLibrary("zecauth_ffi")`.

```kotlin
val zecAuth = ZecAuth(walletSeedHex, ZecAuth.Network.MAINNET, account = 0)
val pubkey = zecAuth.publicKey()                     // hex identity

// On a zecauth:// deep link or scanned QR:
val response = zecAuth.signChallenge(challengeJson)  // signed response JSON
// POST response to the dApp's callback URL

// Server/dApp side check (also available on-device):
ZecAuth.verifyResponse(responseJson, expectedDomain = "app.example.com")
```

Failures throw `ZecAuthException`.

### iOS — Swift SDK

Single file, direct C FFI (no JNI layer). Link the `zecauth_ffi` static/dynamic library and
include [`sdks/zecauth.h`](../sdks/zecauth.h) in your bridging header.

```swift
let zecAuth = try ZecAuth(seedHex: walletSeedHex, network: .mainnet, account: 0)
let pubkey = try zecAuth.publicKey()

// On a zecauth:// deep link:
let response = try zecAuth.signChallenge(challengeJSON)
// POST response to the dApp callback URL

try ZecAuth.verifyResponse(response, expectedDomain: "app.example.com",
                           expectedChain: "zcash:mainnet")
```

`init` requires `seedHex.count >= 64` (32 bytes); errors are typed
(`keyDerivationFailed`, `signingFailed`, `verificationFailed`, `invalidSeed`).

### Any other language — the C ABI

[`sdks/zecauth.h`](../sdks/zecauth.h) exposes four functions, implemented in
[`crates/zecauth-ffi`](../crates/zecauth-ffi/src/lib.rs):

```c
char*   zecauth_derive_pubkey (const char* seed_hex, const char* network, uint32_t account);
char*   zecauth_sign_challenge(const char* seed_hex, const char* network, uint32_t account,
                               const char* challenge_json);
int32_t zecauth_verify_response(const char* response_json, const char* expected_domain,
                                const char* expected_chain);   // 1 = valid
void    zecauth_free_string(char*);   // caller frees every returned string
```

### Payload formats a wallet must accept

- Deep link / QR: `zecauth://<host>?challenge=<percent-encoded-json>&callback=<url>`
- Short link (small QR): `zecauth://<host>?req=<percent-encoded-fetch-url>` — fetch the full
  request, then re-detect its kind locally
- Raw challenge JSON (paste / manual entry)

The canonical signing message is SIWE-style ("`<domain> wants you to sign in with your Zcash
wallet.`" + URI/Version/Chain/Nonce/Issued At/Expiration Time). See
[PROTOCOL.md](../PROTOCOL.md) for the exact grammar.

---

## dApp developers — `@zecauth/dapp`

Zero runtime dependencies; pairs with a verification server (run
[`zecauth-server`](../crates/zecauth-server) as-is, or reimplement its verify endpoint with
`zecauth-core`).

```ts
import { ZecAuth } from '@zecauth/dapp';

const zecauth = new ZecAuth({
  domain: location.host,
  server: '/auth',                       // your verification server
  capabilities: ['signin', 'sign-transaction', 'view-address', 'view-incoming'],
  // network?, challengeTtl?, maxAmount?
});

// 1. Sign-in
const session = await zecauth.connect({
  onChallenge: (challenge) => showQr(challenge.uri ?? challenge.challenge_json),
  onResponse: () => showSpinner(),
});

// 2. Session lifecycle
zecauth.restoreSession();                              // rehydrate on page load (JWT in localStorage)
const unwatch = zecauth.watchSession({ onDisconnect }); // live wallet-initiated disconnects
zecauth.disconnect();

// 3. QR-less payment authorization (requires the 'sign-transaction' capability)
const request = await zecauth.createTransactionRequest({ recipient, amount, description });
// … the wallet's approval screen pops via its relay socket; then:
const result = await zecauth.submitTransactionApproval(payload); // { status, txid?, … }
```

Lower-level pieces (`createChallenge()`, `verify(payload)`, `getSession()`, `isConnected()`,
`can(capability)`, `describeCapabilities()`) are exported for custom flows.

### Capabilities

Seven capabilities map to protocol scopes; `signin` is always folded in:

| Capability | Scope | Grants |
|---|---|---|
| `signin` | `auth` | Prove control of a Zcash identity (always requested) |
| `sign-transaction` | `request_payment` | Push payment-authorization requests (optional `max_amount`) |
| `view-address` | `view_address` | Disclose a receiving address |
| `view-balance` | `view_balance` | Disclose balance |
| `view-incoming` | `view_incoming` | Disclose incoming payments |
| `view-history` | `view_history` | Disclose transaction history |
| `view-full` | `view_full` | Read-only unified full viewing key |

Disclosures ride alongside the signed response (they are not part of the signed message) and
surface on `session.disclosures`. The **server is authoritative**: requested capabilities are
validated against a deployment allow-list, the granted set (requested ∩ user-granted) is bound
into the session JWT, and privileged endpoints enforce it — a `/tx/request` from a session that
denied `sign-transaction` is rejected with `capability_not_granted`.

### Running the verification server

```sh
cargo run -p zecauth-server        # binds 0.0.0.0:3000, serves demo-dapp/dist as its UI
```

| Env var | Default | Meaning |
|---|---|---|
| `ZECAUTH_HOST` | `localhost:3000` | Advertised host baked into challenge callback/WS URLs — set to your LAN IP for physical-device testing |
| `ZECAUTH_NETWORK` | `mainnet` | `testnet` switches the expected chain to `zcash:testnet` |
| `ZECAUTH_CAPABILITIES` | all seven | Comma-separated allow-list (`signin` always allowed) |

Key endpoints: `GET /auth/challenge`, `POST /auth/verify` (issues a 24 h HS256 JWT),
`GET /auth/session`, callback + WebSocket pairs for auth and tx, `WS /wallet/ws/{pubkey}`
(wallet relay), `POST /wallet/disconnect`, `GET /health`. Challenge TTL is 300 s and nonces are
single-use (replay-safe).

> **Production note:** the demo server signs JWTs with a hardcoded secret
> (`zecauth-demo-secret-change-in-production`) and permissive CORS. Treat it as a reference
> implementation of the verify flow, not a hardened deployment.

---

## Cross-implementation verification

The TypeScript crypto is not a re-interpretation of the Rust core — it is pinned to it by test
vectors in both directions:

- `cargo run -p zecauth-testvectors` generates `sdks/react-native/test/vectors.json` (7 vectors);
  `crypto.test.ts` asserts TS reproduces Rust's ZIP-32 intermediates, secret scalars, pubkeys,
  and accepts Rust signatures (~36 assertions).
- `test/run-vectors.ts` closes the loop the other way: TS signs, then shells out to the compiled
  Rust `zecauth-testvectors verify` binary, which must accept (and must reject tampered messages).

```sh
cd sdks/react-native && npm test          # TS-side vector + unit tests
npm run test:vectors                      # TS-signs → Rust verifies
cargo test                                # 39 Rust unit tests (zecauth-core)
```
