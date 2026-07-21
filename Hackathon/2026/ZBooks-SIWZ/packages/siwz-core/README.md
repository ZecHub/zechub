# @siwz/core

[![npm](https://img.shields.io/npm/v/@siwz/core.svg)](https://www.npmjs.com/package/@siwz/core)

Core protocol primitives for **Sign in with Zcash**. Pure TypeScript, no React, no framework deps. Runs in Node, browsers, and edge runtimes.

Docs and live demos: <https://siwz.vercel.app>

## Install

```bash
npm i @siwz/core
# or: pnpm add @siwz/core / yarn add @siwz/core
```

## What this package gives you

Two protocol-level sign-in flows. The third (MetaMask Snap) is handled in [`@siwz/react`](https://www.npmjs.com/package/@siwz/react).

| Flow | Primitives | When to use |
|---|---|---|
| Memo challenge (universal) | `issueMemoChallenge`, `verifyMemoChallenge`, `buildZip321`, `buildZip321Multi`, `parseZip321` | Recommended primary flow. Works with every Zcash wallet via ZIP 321. No `signmessage` support required. |
| Signed message (SIWE-style) | `SiwzMessage`, `verifyMessage`, `verifyTransparentSignature`, `verifySaplingSignature` | For wallets exposing `signmessage` (zcash-cli, YWallet transparent receivers, etc.). |

## Memo-challenge sign-in

The user sends a tiny payment (shielded with a one-time memo, or a uniquely-numbered transparent payment) to the app's service address. Your server verifies the on-chain artifact and signs them in.

```ts
import { issueMemoChallenge, verifyMemoChallenge } from "@siwz/core";

// 1. server: issue a challenge
const challenge = await issueMemoChallenge({
  secret: process.env.NEXTAUTH_SECRET!,
  serviceAddress: process.env.SIWZ_SERVICE_ADDRESS!, // your zs.../u1.../t1...
  network: "mainnet",
});
// → { uri, amountZec, memo, token, expiresAt, mode, ... }

// 2. client renders `uri` as a QR. User pays from any Zcash wallet.

// 3. server: poll your block explorer or lightwallet RPC for incoming notes
//    to challenge.serviceAddress, then verify each candidate:
const result = await verifyMemoChallenge({
  secret: process.env.NEXTAUTH_SECRET!,
  token: challenge.token,
  observedRecipient: challenge.serviceAddress,
  observedMemo: incomingMemo,                      // shielded mode
  // observedAmountZatoshi: incomingAmountZatoshi, // transparent mode
});
if (result.ok) signTheUserIn(result.identity);
```

The mode (transparent-amount vs shielded-memo) is inferred from the service address type. `inferMemoChallengeMode(address)` exposes the same inference if you need it.

## Transparent explorer helpers

`@siwz/core/explorers` ships three explorers and a fallback wrapper:

| Class | Use |
|---|---|
| `ThreeXplExplorer` | 3xpl-backed. Defaults to `sandbox-api.3xpl.com` (anonymous, rate-limited, no SLA). Pass `apiKey` for the prod tier. |
| `BlockchairExplorer` | Blockchair-backed. Public tier without a key, paid tier with one. |
| `MultiExplorer` | Wraps a list of explorers; falls back to the next on any thrown error. |

```ts
import { MultiExplorer, ThreeXplExplorer, BlockchairExplorer } from "@siwz/core/explorers";

const explorer = new MultiExplorer([
  new ThreeXplExplorer({ apiKey: process.env.THREEXPL_API_KEY }),
  new BlockchairExplorer({ apiKey: process.env.BLOCKCHAIR_API_KEY }),
]);

const outputs = await explorer.getRecentOutputsToAddress(serviceAddress, 50);
for (const output of outputs) {
  const r = await verifyMemoChallenge({
    secret,
    token,
    observedAmountZatoshi: output.amountZatoshi,
    observedRecipient: output.address,
  });
  if (r.ok) return r.identity;
}
```

For the full Next.js route-handler version (issue + poll, default-wired explorer, the 200/202/4xx wire convention `<MemoSignIn />` expects), use [`@siwz/next-auth/memo`](https://www.npmjs.com/package/@siwz/next-auth). The `pollMemoHandler` there already chains this MultiExplorer as a default, so most consumers never touch these classes directly.

These explorers index the public chain only. For shielded-memo sign-in (`zs…`/`u1…` service address), run a backend that holds the IVK (see [`apps/lightwallet-rpc`](https://github.com/ZecHub/siwz/tree/main/apps/lightwallet-rpc)) and write a thin adapter implementing `getRecentMemosToAddress` on the `MemoExplorer` interface.

## Signed-message sign-in (SIWE-style)

```ts
import { SiwzMessage, generateNonce, verifyMessage } from "@siwz/core";

const msg = new SiwzMessage({
  domain: "myapp.com",
  address: "t1Hxw6JqWMnhDK5jRCieg5bFHM2qt7UtQvu",
  uri: "https://myapp.com/login",
  network: "mainnet",
  nonce: generateNonce(),
  issuedAt: new Date().toISOString(),
  expirationTime: new Date(Date.now() + 600_000).toISOString(),
  statement: "Sign in to MyApp.",
});

const wire = msg.toString();              // canonical SIWZ wire format
const parsed = SiwzMessage.parse(wire);   // round-trips losslessly

const result = await verifyMessage(wire, signatureBase64, {
  expectedDomain: "myapp.com",
  expectedNonce: theNonceYouIssued,
});
if (result.valid) signTheUserIn(result.address);
```

## JWT export (any backend, no NextAuth)

After a successful sign-in, mint a standard HS256 JWT that any backend in any language can verify. Useful when your server isn't Next.js or you want to hand identity off to a separate service (Laravel, FastAPI, Express, Phoenix, raw Lambda, anywhere that verifies JWTs).

```ts
import { issueSiwzJwt, verifySiwzJwt } from "@siwz/core";

// Issue (on the SIWZ verifier server, after memo/signmessage success):
const token = await issueSiwzJwt(
  { sub: "t1abc...", flow: "memo", network: "mainnet" },
  { secret: process.env.JWT_SHARED_SECRET!, ttlSeconds: 3600 },
);

// Verify (on the consumer backend):
const claims = await verifySiwzJwt(token, {
  secret: process.env.JWT_SHARED_SECRET!,
  audience: "my-app.example.com",
  issuer: "siwz-auth.example.com",
});
// claims.sub is the Zcash address
```

Works in Node, browsers, Bun, Deno, Cloudflare Workers, Vercel Edge. Standard HS256, so consumers can verify with any JWT library in their language (`firebase/php-jwt`, `python-jose`, `jsonwebtoken`, etc.). Claims include `sub`, `iat`, `exp`, `jti`, plus optional `iss`, `aud`, `flow`, `network`.

## Wire format (vs EIP-4361)

Two intentional differences from SIWE:

1. `Network:` replaces `Chain ID:`. Zcash has no chain id.
2. `Address:` may be transparent (`t1…`), Sapling shielded (`zs…`), or Unified (`u1…`). The verifier dispatches the right algorithm.

```
example.com wants you to sign in with your Zcash account:
t1Hxw6JqWMnhDK5jRCieg5bFHM2qt7UtQvu

I accept the ToS at https://example.com/tos

URI: https://example.com/login
Version: 1
Network: mainnet
Nonce: abc12345xyz
Issued At: 2026-05-25T10:00:00Z
Expiration Time: 2026-05-25T11:00:00Z
```

## Transparent (t-addr) verification

Identical to Bitcoin's `signmessage` except the magic prefix is `"Zcash Signed Message:\n"`. That choice is what makes existing wallet `signmessage` UIs produce SIWZ-compatible signatures with no wallet-side change.

- Hash: `dsha256(varint(magic.len) || magic || varint(msg.len) || msg)`.
- Signature: 65 bytes (`recoveryByte || r (32) || s (32)`).
- `recoveryByte`: `27 + recovery_id + (compressed ? 4 : 0)`.
- Recover the secp256k1 pubkey, serialize per the compressed flag, then `HASH160(pubkey) == address.hash`.

## Shielded (Sapling z-addr) verification

[ZIP 304](https://zips.z.cash/zip-0304) defines Sapling signed messages but requires the Sapling Spend authorization circuit, which is not yet practical to ship in pure JS at hackathon scope. `verifySaplingSignature` takes an optional `saplingVerifier` callback: pass a WASM wrapper around `librustzcash` and SIWZ dispatches z-addr verifies to it.

## API surface

```ts
// SIWE-style message
SiwzMessage, generateNonce
verifyMessage, verifyTransparentSignature, verifySaplingSignature
type SiwzFields, type VerifyResult, type VerifyOptions

// Memo challenge + ZIP 321
issueMemoChallenge, verifyMemoChallenge, inferMemoChallengeMode
buildZip321, buildZip321Multi, parseZip321
type MemoChallenge, type MemoChallengeMode, type MemoVerifyErrorCode
type IssueMemoChallengeOpts, type VerifyMemoChallengeOpts, type VerifyMemoChallengeResult
type ZIP321Request

// Addresses and conversion
parseAddress, isZcashAddress, isShieldedAddress, encodeP2pkh
assertAddressNetwork, zecToZatoshi, zatoshiToZec
UA_RECEIVER_TYPES, type Network, type AddressType, type ParsedAddress

// Crypto primitives
ZCASH_SIGNED_MESSAGE_MAGIC, magicHash, hash160, dsha256
base58checkEncode, base58checkDecode

// Reference data
ZCASH_BLOCKS, type ZcashBlockName

// JWT export (framework-agnostic; any backend can verify the issued token)
issueSiwzJwt, verifySiwzJwt
type SiwzJwtClaims, IssueSiwzJwtOpts, VerifySiwzJwtOpts

// Errors
SiwzError, type SiwzErrorCode

// Type-level only at the root (runtime lives in the subpath)
type MemoExplorer, type RecentOutput, type RecentMemo
```

```ts
// Subpath: @siwz/core/explorers
BlockchairExplorer, ThreeXplExplorer, MultiExplorer, ExplorerError
type BlockchairExplorerOptions, ThreeXplExplorerOptions
```

## Tests

```bash
pnpm --filter @siwz/core test
```

76 tests covering message build/parse, address decoding (t1/tm/t3/checksum), transparent signature verify (compressed/uncompressed, mismatched messages, addresses, expired messages, domain/nonce mismatches), ZIP 321 URI build/parse, memo-challenge round-trips for both transparent and shielded modes, and JWT issue/verify (expiry, audience, issuer, tamper-detection, clock skew).

## Related packages

- [`@siwz/react`](https://www.npmjs.com/package/@siwz/react): `<MemoSignIn />`, `<SignInWithZcash />`, `useSiwz()`, MetaMask Snap helpers.
- [`@siwz/next-auth`](https://www.npmjs.com/package/@siwz/next-auth): NextAuth credentials provider and stateless HMAC nonces.

## License

MIT
