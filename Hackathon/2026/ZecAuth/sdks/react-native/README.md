# @zecauth/react-native

**Sign in with Zcash, for wallets.** A self-contained, byte-compatible implementation of
the [ZecAuth protocol](../../PROTOCOL.md) for React Native — and any JavaScript runtime.

ZecAuth lets a dApp verify that a user controls a Zcash wallet **without an on-chain
transaction**: free, instant, privacy-preserving. This package is what a *wallet*
integrates to support it.

```ts
import { ZecAuthWallet, mnemonicToSeed, setRandomSource } from "@zecauth/react-native";
import "react-native-get-random-values"; // installs crypto.getRandomValues

const wallet = new ZecAuthWallet({
  seed: mnemonicToSeed(recoveryPhrase),
  network: "mainnet",
});

// User scanned a ZecAuth QR / opened a zecauth:// link:
const challenge = wallet.parseChallenge(scanned);
//  → "myapp.com wants you to sign in with your Zcash wallet."

// Show what the dApp is requesting before the user approves:
challenge.capabilities.forEach((c) => console.log(c.label, "—", c.description));
//  → "Sign in — Prove you control this wallet…"
//  → "Request payments — Ask you to approve and sign transactions…"

// User tapped Approve:
const response = await wallet.approveAuth(challenge);
await wallet.submit(response, challenge.callbackUrl!);
```

> **Capabilities.** `challenge.capabilities` is the human-facing list a dApp is requesting
> (`signin`, `sign-transaction`, `view-address`, …), derived from the challenge's protocol
> `scopes` — always including `signin`, each flagged `required` / `sensitive`. Render it on
> your connect screen so users know what they're agreeing to. Use `describeCapabilities(scopes)`
> directly if you have raw scopes.
>
> **Disclosures.** Some capabilities ask the wallet to share data. Pass it to `approveAuth`:
> ```ts
> // When the challenge requested `view-address`, share a receiving address:
> const address = challenge.capabilities.some((c) => c.id === "view-address")
>   ? (await zcashSpend.getAddresses()).unified
>   : undefined;
> const response = await wallet.approveAuth(challenge, { disclosures: { address } });
> ```
> The SDK **strips any disclosure the challenge didn't request**, so you can't over-share. The
> disclosure rides alongside the signed response (it is not part of the signed message).

## Why this exists

Ethereum has WalletConnect + SIWE. Solana has Wallet Adapter. Zcash had **nothing** — its
privacy model breaks every assumption those protocols make. ZecAuth derives a dedicated
authentication keypair from the wallet seed at a ZIP-32 path that is *fully isolated from
spending keys*, and signs a SIWE-style challenge with a RedPallas signature.

## What's in the box

| Layer | Exports |
|-------|---------|
| **Crypto** | `deriveAuthKeyPair`, `deriveAuthPubkey`, `redpallasSign`, `redpallasVerify` |
| **Protocol** | `ZecAuthWallet`, `parseChallenge`, `parseTransaction`, `parseDeepLink`, `buildChallengeMessage` |
| **Mnemonics** | `generateMnemonic`, `validateMnemonic`, `mnemonicToSeed` |
| **Storage** | `WalletVault`, `SessionStore` (bring your own secure backend) |
| **React** | `useZecAuthRequest` hook (drives review → approve → submit) |
| **Randomness** | `setRandomSource`, `randomBytes` |

It is **pure TypeScript** — no native modules required. The cryptography runs on
[`@noble/curves`](https://github.com/paulmillr/noble-curves),
[`@noble/hashes`](https://github.com/paulmillr/noble-hashes) and
[`@scure/bip39`](https://github.com/paulmillr/scure-bip39), so it works in Hermes,
on web, and in Node.

## Byte-for-byte compatible with `zecauth-core` (Rust)

The crypto is not a re-interpretation — it is verified against the reference Rust stack
(`zecauth-core` / `reddsa` / `pasta_curves` / `zip32`) with cross-implementation test
vectors:

- **ZIP-32 ad-hoc derivation** — `BLAKE2b-512` master + `PRF^expand` child (domain `0xAB`),
  matching `zip32::arbitrary`.
- **Key generation** — `ChaCha20` keystream → wide reduction into a Pallas scalar,
  matching `reddsa::SigningKey::new`.
- **RedPallas** — `BLAKE2b-512` `"Zcash_RedPallasH"` hash-to-scalar over the Orchard
  `SpendAuthSig` basepoint, with Pasta point/scalar encodings.

The test suite proves the derivation intermediates, public keys, and signatures match
Rust exactly, that the TS verifier accepts Rust signatures, that Rust accepts TS
signatures, and that a JS-signed challenge passes Rust's full server-side
`verify_response` (domain/chain/expiry/nonce + signature). See [`test/`](./test).

```sh
cargo run -p zecauth-testvectors > test/vectors.json   # regenerate Rust vectors
npm test                                                # 36 cross-impl assertions
npm run test:vectors                                    # TS-signs → Rust-verifies
```

## Installation

```sh
npm install @zecauth/react-native
# peer/runtime deps for React Native:
npm install react-native-get-random-values   # secure RNG
```

Then, once at app startup:

```ts
import "react-native-get-random-values";
// or, if you supply your own RNG:
import { setRandomSource } from "@zecauth/react-native";
import { getRandomBytes } from "expo-crypto";
setRandomSource(getRandomBytes);
```

## Core API

### `new ZecAuthWallet(options)`

```ts
const wallet = new ZecAuthWallet({
  seed,                 // Uint8Array, 32..252 bytes (BIP-39 seed recommended)
  network: "mainnet",   // | "testnet"
  account: 0,           // optional ZIP-32 account index
  domainScoped: true,   // unlinkable per-dApp identity (default true)
});
```

| Method | Description |
|--------|-------------|
| `identity()` | The wallet's global ZecAuth public key (hex). |
| `pubkeyForDomain(domain)` | The domain-scoped identity for one dApp. |
| `parseChallenge(data)` | Parse + validate a sign-in challenge. |
| `parseTransaction(data)` | Parse a transaction-approval request. |
| `parseLink(input)` | Parse a `zecauth://` deep link or raw JSON. |
| `approveAuth(challenge)` | Sign a sign-in challenge → `SignedAuthResponse`. |
| `approveTransaction(tx)` / `denyTransaction(tx)` | Sign a payment decision. |
| `submit(response, url)` | POST the signed response to the dApp callback. |
| `verify(pubkey, message, sig)` | Verify a signature locally. |

### Domain-scoped identities

By default each dApp sees a **different** public key (derived with context
`"ZcashZecauthAuth:<domain>"`), so two dApps cannot correlate the same user. The same
recovery phrase always reproduces the same per-dApp identity.

### React

```tsx
const req = useZecAuthRequest(wallet);
req.open(scannedPayload);          // → req.challenge / req.transaction
await req.approve();               // signs + submits, drives req.status
```

## Security notes

- Auth keys live at ZIP-32 purpose `616'`, **isolated from spending keys** at `32'`.
  Compromise of the auth key cannot move funds.
- Challenges are domain-bound and nonce/expiry-bound (replay-resistant).
- The seed never leaves the device; signing is local. Pair `WalletVault` with the
  platform Keychain/Keystore for at-rest protection.

## License

MIT
