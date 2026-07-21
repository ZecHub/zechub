# ZecAuth Protocol Specification v1

**Status:** Draft
**Authors:** ZecAuth Contributors
**Created:** 2026-06-06
**License:** MIT

---

## Abstract

ZecAuth is a wallet connection and authentication protocol for Zcash. It enables dApps to verify that a user controls a Zcash wallet without requiring an on-chain transaction. Authentication is free, instant, and privacy-preserving.

The protocol uses a dedicated authentication keypair derived from the wallet's seed via ZIP-32 at a purpose-specific derivation path. The wallet signs a structured challenge message with a RedPallas signature, and the dApp verifies the signature to establish an authenticated session.

---

## 1. Motivation

Zcash lacks a standardized wallet connection protocol. Ethereum has WalletConnect and SIWE (EIP-4361). Solana has Wallet Adapter. Zcash has nothing.

Existing protocols cannot be ported to Zcash because:

- Shielded addresses hide the sender — there is no "account" to expose
- No wallet ships a message-signing API for shielded keys (ZIP-304 remains a draft since 2020)
- Zcash's privacy model prohibits the bidirectional RPC sessions that WalletConnect assumes

ZecAuth solves this by deriving a purpose-built authentication key from the wallet seed, completely isolated from spending authority.

---

## 2. Key Derivation

### 2.1 Derivation Path

Authentication keys are derived using ZIP-32 arbitrary key derivation at the path:

```
m / 616' / coin_type' / account'
```

Where:
- `616'` is the ZecAuth purpose index (hardened)
- `coin_type'` is `133'` for mainnet, `1'` for testnet (per SLIP-44)
- `account'` is the account index (starting from `0'`)

### 2.2 Derivation Procedure

1. Compute the ZIP-32 arbitrary master key from the wallet seed using BLAKE2b with the context string `"ZcashZecauthAuth"` (16 bytes, ASCII)
2. Derive child keys along the path using hardened derivation at each level
3. Use the resulting 32-byte secret as a seed for a ChaCha20 CSPRNG
4. Generate a RedPallas signing key from the CSPRNG

The CSPRNG step ensures the derived bytes are always a valid Pallas scalar.

### 2.3 Key Types

- **Signing key:** RedPallas `SigningKey<SpendAuth>` (32 bytes, Pallas curve)
- **Verification key (public key):** RedPallas `VerificationKey<SpendAuth>` (32 bytes, compressed curve point)

The verification key (public key) is the user's **ZecAuth identity**. It is:
- Deterministic — the same seed and account always produce the same key
- Isolated — no mathematical relationship to spending keys or shielded addresses
- Pseudonymous — not linked to any on-chain activity

---

## 3. Challenge Message Format

### 3.1 Structure

The challenge message is a human-readable text string with the following format:

```
<domain> wants you to sign in with your Zcash wallet.

URI: <uri>
Version: <version>
Chain: <chain>
Nonce: <nonce>
Issued At: <issued_at>
Expiration Time: <expiration_time>
Statement: <statement>
Resources:
- <resource_1>
- <resource_2>
```

### 3.2 Field Definitions

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `domain` | Yes | String | The requesting dApp's domain. The wallet MUST verify this matches the request origin. |
| `uri` | Yes | URI | The resource being accessed. |
| `version` | Yes | Integer | Protocol version. MUST be `1`. |
| `chain` | Yes | String | CAIP-2 chain identifier: `zcash:mainnet` or `zcash:testnet`. |
| `nonce` | Yes | String | Server-generated, cryptographically random, ≥16 alphanumeric characters. Single-use. |
| `issued_at` | Yes | String | ISO 8601 UTC timestamp (RFC 3339). |
| `expiration_time` | Yes | String | ISO 8601 UTC timestamp. Challenges MUST expire. Recommended TTL: 5 minutes. |
| `statement` | No | String | Human-readable explanation shown to the user. |
| `resources` | No | String[] | List of resource URIs the session grants access to. |
| `scopes` | No | Object | The capabilities the dApp is requesting (see §3.5). |

### 3.3 Signing Format

The message is signed as the UTF-8 byte representation of the human-readable text format defined in §3.1. This ensures what the user sees is exactly what they sign.

### 3.4 Transport Format

For transmission via QR codes, deep links, or HTTP, the challenge is serialized as JSON:

```json
{
  "domain": "myapp.com",
  "uri": "https://myapp.com/dashboard",
  "version": 1,
  "chain": "zcash:mainnet",
  "nonce": "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
  "issued_at": "2026-06-06T12:00:00Z",
  "expiration_time": "2026-06-06T12:05:00Z",
  "statement": "Access your dashboard"
}
```

### 3.5 Capabilities

A dApp declares the **capabilities** it intends to use. The wallet displays these on the
connect screen so the user knows, before they sign in, what the app will do. Capabilities
are the developer-facing vocabulary; on the wire they travel inside the challenge as the
`scopes` object.

Two capabilities cover the vast majority of apps:

| Capability | Scope `type` | Meaning |
|------------|--------------|---------|
| `signin` | `auth` | Prove wallet ownership (identity only). Implicit in every connection. |
| `sign-transaction` | `request_payment` | Ask the user to approve & sign transactions. The wallet still prompts for every payment. |
| `view-address` | `view_address` | Disclose a receiving address (Unified Address, ZIP-316) — e.g. so the app can pay/refund the user (see §3.6). |
| `view-balance` | `view_balance` | Disclose a one-time **balance snapshot**. |
| `view-incoming` | `view_incoming` | Disclose a one-time snapshot of **received payments** (enough to verify a payment). |
| `view-history` | `view_history` | Disclose a one-time snapshot of **full transaction history**. |
| `view-full` | `view_full` | Disclose a read-only **Unified Full Viewing Key** (UFVK) — an *ongoing* watch of balance + full history. No spend authority. |

The four `view-*` read capabilities split exposure deliberately: a snapshot reveals only what
was asked, once; only `view-full` hands over a key for ongoing watching. The wallet flags all
of them privacy-sensitive. The `scopes` object separates `required` capabilities (the dApp
won't function without them) from `optional` ones:

```json
{
  "scopes": {
    "required": [
      { "type": "auth" },
      { "type": "request_payment", "params": { "max_amount": "10.0" } }
    ]
  }
}
```

**The server is authoritative.** The dApp declares the capabilities it wants when it asks
its server for a challenge (`GET /auth/challenge?capabilities=signin,sign-transaction`). The
server validates them against a per-deployment allow-list — refusing (`capability_not_allowed`)
to mint a challenge for anything the dApp may not request — and embeds the approved `scopes`
into the challenge it returns. On a successful sign-in the server binds the granted
capabilities into the session token (JWT). Privileged endpoints then enforce them: a request
to `/tx/request` from a session that wasn't granted `sign-transaction` is rejected
(`capability_not_granted`). A dApp therefore cannot exercise a capability it never obtained,
regardless of what it claims client-side.

**Capabilities are not part of the signed message.** §3.1's signing format deliberately omits
`scopes`, so the wallet's signature is over identity/nonce/domain only — embedding capabilities
never changes the signed bytes. Enforcement is server-side (above) plus point-of-use prompts
in the wallet (it confirms every payment regardless). Cryptographically binding granted scopes
*into the signature* is a v2 item (§8).

### 3.6 Disclosures

Some capabilities ask the wallet to *share data* with the dApp. When the user approves a
sign-in whose challenge requested such a capability, the wallet attaches a `disclosures`
object to its response (alongside `pubkey`/`signature`/`message`). Disclosures are relayed to
the dApp with the response; like scopes, they are **not** part of the signed message.

| Capability | Disclosure field | Value |
|------------|------------------|-------|
| `view-address` | `disclosures.address` | A receiving Unified Address (ZIP-316). |
| `view-balance` | `disclosures.balance` | `{ totalZec, spendableZec }` — a one-time snapshot. |
| `view-incoming` | `disclosures.incomingPayments` | An array of received transactions (one-time snapshot). |
| `view-history` | `disclosures.transactions` | An array of all transactions, sent + received (one-time snapshot). |
| `view-full` | `disclosures.viewingKey` | A read-only Unified Full Viewing Key (`uview…`). |

```json
{
  "pubkey": "…",
  "signature": "…",
  "message": "…",
  "granted": ["signin", "view-incoming"],
  "denied": ["sign-transaction"],
  "disclosures": {
    "incomingPayments": [{ "txid": "…", "amountZec": "0.5", "direction": "in", "minedHeight": 100 }]
  }
}
```

**Per-capability consent.** The user approves or rejects each requested capability in their
wallet. The response reports the outcome in `granted` / `denied` (capability ids; `signin` is
always granted). The wallet attaches a disclosure only when its capability was **both
requested and granted** — the reference SDK strips anything else, so a wallet cannot over-share
and a rejected capability leaks nothing. The dApp reads `granted`/`denied` and decides whether
to proceed. The server binds only the **granted** set into the session token (§4.3), so a
rejected `sign-transaction` is rejected at `/tx/request` (`capability_not_granted`).

- **Snapshots** (`view-balance` / `view-incoming` / `view-history`) — point-in-time data the
  wallet reads from its own light-client state. Minimal exposure: the dApp gets only what it
  asked for, once. `view-incoming` is enough to verify a payment landed without the user
  submitting a txid.
- **Address** — Unified Addresses are privacy-preserving and safe to disclose; they reveal
  nothing about balance or history.
- **Full viewing key** (`view-full`) — a uniquely-Zcash capability: the wallet derives a
  **Unified Full Viewing Key** from its spending key (via ZIP-32 / `DerivationTool`) and shares
  it for *ongoing* watching. The holder can watch balance and incoming payments but **cannot
  spend** (no spend authority). Highly privacy-sensitive (reveals balance and history). The
  auth keypair (purpose `616'`) is unrelated to the viewing key, derived from the spend tree
  (purpose `32'`); only the wallet — never the ZecAuth auth SDK — can produce it.

---

## 4. Authentication Flow

### 4.1 Protocol Steps

```
  dApp                                           Wallet
   │                                               │
   │  1. Generate challenge (nonce, domain, etc.)   │
   │                                               │
   │  2. Present challenge as QR / deep link        │
   │  ─────────────────────────────────────────►   │
   │     zecauth://<host>?challenge=<base64json>    │
   │                                               │
   │                          3. Parse challenge    │
   │                          4. Display to user    │
   │                          5. User approves      │
   │                          6. Sign with auth key │
   │                                               │
   │  7. POST signed response to callback           │
   │  ◄─────────────────────────────────────────   │
   │     { pubkey, signature, message }             │
   │                                               │
   │  8. Verify signature                           │
   │  9. Check nonce (unused, not expired)          │
   │ 10. Check domain matches server's domain       │
   │ 11. Issue session token (JWT)                  │
   │                                               │
```

### 4.2 Deep Link URI

Inline form (the payload travels in the link):

```
zecauth://<dapp-host>?challenge=<percent-encoded-challenge-json>&callback=<callback-url>
```

- `challenge`: The challenge JSON, percent-encoded
- `callback`: The URL the wallet POSTs the signed response to

Short-link form (recommended for QR codes — keeps the code at a low QR version so styled
rendering stays scannable):

```
zecauth://<dapp-host>?req=<percent-encoded-request-url>
```

- `req`: A URL the wallet fetches (HTTP GET) to retrieve the full request. The server
  responds with:

```json
{
  "kind": "auth" | "transaction",
  "payload": "<challenge or transaction-request JSON>",
  "callback_url": "<url the wallet POSTs the signed response to>"
}
```

The reference server exposes this as `GET /auth/request/{nonce}` (404 if the nonce is
unknown, 410 if expired). Wallets MUST classify the fetched `payload` themselves rather
than trusting the server's `kind` label, and the usual challenge validation (domain,
chain, expiry, nonce) applies unchanged — the short link only changes transport, not
what gets signed.

### 4.3 Authentication Response

The wallet sends a JSON object. `pubkey`/`signature`/`message` are the signed core; `granted`,
`denied`, and `disclosures` are unsigned consent metadata (§3.6):

```json
{
  "pubkey": "<hex-encoded auth public key, 64 hex chars>",
  "signature": "<hex-encoded RedPallas signature, 128 hex chars>",
  "message": "<canonical challenge text that was signed>",
  "granted": ["signin", "..."],
  "denied": ["..."],
  "disclosures": { "...": "..." }
}
```

The dApp forwards `granted` to the server at `/auth/verify`; the server binds **only the
granted ∩ requested** capabilities into the session token, so a rejected capability is never
enforceable.

### 4.4 Session State Machine

```
  IDLE ──challenge generated──► PENDING
                                   │
                    ┌──────────────┼──────────────┐
                    │              │              │
                TTL expires   valid proof   invalid proof
                    │              │              │
                    ▼              ▼              ▼
                EXPIRED    AUTHENTICATED      REJECTED
```

---

## 5. Verification

The server MUST perform all of the following checks:

1. **Signature validity:** The RedPallas signature is valid for the given public key and message bytes
2. **Message integrity:** The `message` field in the response parses as a valid challenge
3. **Nonce consumption:** The nonce has not been previously consumed
4. **Expiry check:** The current time is before the challenge's `expiration_time`
5. **Domain binding:** The `domain` in the challenge matches the server's own domain
6. **Chain binding:** The `chain` in the challenge matches the expected network
7. **Version check:** The `version` is `1`

---

## 6. Error Codes

| Code | Meaning |
|------|---------|
| `invalid_signature` | RedPallas signature verification failed |
| `expired_challenge` | Challenge has passed its expiration time |
| `consumed_nonce` | Nonce has already been used |
| `domain_mismatch` | Domain in challenge doesn't match server |
| `chain_mismatch` | Chain in challenge doesn't match expected network |
| `invalid_challenge` | Challenge message is malformed or missing required fields |
| `invalid_pubkey` | Public key bytes are not a valid Pallas curve point |
| `capability_not_allowed` | The dApp requested a capability outside the server's allow-list |
| `capability_not_granted` | The session lacks the capability required for this action (e.g. `sign-transaction`) |
| `authentication_required` | A privileged action was attempted without an authenticated session |

---

## 7. Security Considerations

### 7.1 No Spending Authority

The authentication key is derived at ZIP-32 purpose `616'`, which is completely isolated from the spending key tree at purpose `32'`. Compromise of the auth key does NOT grant the ability to spend funds.

### 7.2 Replay Protection

Nonces are single-use and time-bounded. The server MUST:
- Generate nonces with at least 128 bits of entropy
- Reject any nonce it has already seen
- Enforce the `expiration_time` bound

### 7.3 Phishing Protection

The challenge includes a `domain` field. The wallet SHOULD verify that this domain matches the actual origin of the request (e.g., by checking the deep link source or the QR code context).

### 7.4 Privacy Properties

- The auth public key reveals nothing about the user's shielded addresses or balances
- The auth key is deterministic per seed+account, providing a stable pseudonymous identity
- Different accounts produce different auth keys, allowing identity separation
- The protocol does not require any on-chain activity

### 7.5 Key Compromise

If a user's auth key is compromised (e.g., seed leaked), the attacker can impersonate the user for authentication but CANNOT spend funds. The user should rotate their wallet seed, which automatically generates new auth keys.

---

## 8. Versioning

The protocol version is specified in the challenge message. This spec defines version `1`.

v1 includes **server-authoritative capabilities** (§3.5): a dApp declares the capabilities it
will use (`signin`, `sign-transaction`, `view-address`, `view-balance`, `view-history`); the
server validates them against an allow-list, shows them to the user via the wallet, binds the
granted set into the session token, and enforces them on privileged endpoints. v1 also includes
**disclosures** (§3.6): Unified Address sharing, and **viewing-key disclosure** — a read-only
Unified Full Viewing Key so a dApp can verify payments without spend authority (uniquely Zcash).

Future versions may add:
- **v2:** Zero-cost signing via ZIP-304 (Sapling) or Orchard Address Signatures, when wallets implement shielded address signing
- **v2:** Cryptographically bound granted scopes/disclosures — the wallet signs the exact set it granted (so the dApp can verify them without trusting the relay)
- **v2:** Incoming-only viewing keys (UIVK) for `view_balance` once wallet SDKs expose them, narrowing disclosure to received notes only
- **v2:** WalletConnect-style relay for cross-device communication

Version negotiation: the dApp specifies `version: 1` in the challenge. Wallets MUST reject versions they do not support.

---

## 9. Reference Implementation

- **Core library:** `zecauth-core` (Rust) — key derivation, signing, verification
- **CLI wallet:** `zecauth-cli` (Rust) — demo wallet for testing
- **Server:** `zecauth-server` (Rust/Axum) — challenge generation, verification, JWT issuance
- **FFI:** `zecauth-ffi` (Rust → C ABI) — bridge for Kotlin/Swift wallet SDKs
- **Kotlin SDK:** `dev.zecauth.ZecAuth` — Android wallet integration
- **Swift SDK:** `ZecAuth` — iOS wallet integration
- **React Native SDK:** `@zecauth/react-native` — pure-TypeScript RedPallas + ZIP-32, verified byte-for-byte against `zecauth-core`

All code is MIT-licensed and available at the project repository.

---

## 10. Dependencies

| Component | Crate/Library | Purpose |
|-----------|--------------|---------|
| Key derivation | `zip32` v0.2 | ZIP-32 arbitrary key derivation |
| Signatures | `reddsa` v0.5 | RedPallas signing and verification |
| Deterministic RNG | `rand_chacha` v0.3 | Seed-to-key CSPRNG |
