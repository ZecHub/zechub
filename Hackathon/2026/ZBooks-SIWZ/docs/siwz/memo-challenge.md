# SIWZ memo-challenge

> The Zcash-native sign-in flow. Works with every shielded wallet today.

## Why this exists

The original SIWZ proposal mirrored [SIWE](https://eips.ethereum.org/EIPS/eip-4361): sign a challenge message with your address. That works in theory but breaks in practice: most Zcash wallets don't expose `signmessage`. `zcash-cli` does; YWallet does; Zingo / Zodl / eZcash / Zenith / Brave / Trust / Exodus / Coinomi / SafePal / Leodex are variously missing or buried.

Worse: Zcash is a shielded-first chain, and asking users to sign with a transparent t-addr makes SIWZ-classic the *anti-Zcash* sign-in pattern. We're authenticating with the legacy path, not the privacy-preserving one.

The memo-challenge approach pivots to what Zcash actually does well: shielded transactions with memos. It's the same pattern [zcashnames](https://zcashnames.com) uses for registration, and it works in every wallet that can send a payment, which is every wallet ever built.

## How it works

1. **App issues a challenge.** Server generates a unique-amount challenge encoded in a [ZIP 321](https://zips.z.cash/zip-0321) payment-request URI. The amount carries entropy in its least-significant zatoshi digits, random per attempt.
2. **App displays a QR + `zcash:` deep link.** Wallets that support ZIP 321 (Zodl, YWallet, Zingo, eZcash, Zenith, …) open with the transaction pre-filled when the user scans/clicks.
3. **User sends the payment** from whichever wallet they want to authenticate as. The send is a regular shielded payment, with no special UI needed in the wallet.
4. **App verifies the tx.** The server polls a block explorer (the default `MultiExplorer` tries 3xpl then Blockchair) for recent outputs to the service address and matches each amount against the issued token. A match means the user is authenticated.

The SDK ships all four steps for you:

- `<MemoSignIn />` from `@siwz/react` handles steps 1-2 client-side (QR rendering, polling, success callback).
- `issueMemoHandler` from `@siwz/next-auth/memo` handles step 1 server-side.
- `pollMemoHandler` from `@siwz/next-auth/memo` handles step 4 server-side, with a free transparent explorer by default.
- `SiwzMemoProvider` from `@siwz/next-auth` verifies the resulting envelope inside NextAuth.

Apps that need different defaults can override at each layer. See [integration.md](./integration.md).

## Wire format

The ZIP 321 URI we generate:

```
zcash:t1QzwK7oMTdr4XF32s5RAtK9Eq45NFtdSbo?amount=0.00000582&label=ZBooks&message=Sign+in+to+ZBooks
```

The amount is `base + nonce` zatoshi where `base` defaults to 100 zatoshi (`0.000001 ZEC`) and `nonce` is a random 0-999. Total range: 100-1099 zatoshi (`0.000001`-`0.00001099 ZEC`). The base is configurable via `baseAmountZec` in `IssueMemoHandlerOptions` / `IssueMemoChallengeOpts`.

The challenge token (HMAC-signed; round-trips between client and server statelessly):

```
base64url({v:1, to:<serviceAddress>, z:<amountZatoshi>, id:<claimedIdentity>, exp:<msSinceEpoch>}) "." HMAC-SHA256
```

Verification request:

```
POST /api/auth/memo/verify
{ "token": "<from issue>", "txid": "<64 hex chars>" }
```

The verifier looks up the txid via the configured `Explorer` implementation, iterates outputs, and accepts if any output's `(address, amount)` matches the token's `(to, z)`.

## Threat model

| | Memo-challenge | SIWZ-classic | Snap (permission) |
|---|---|---|---|
| Proves spending key ownership? | No, proves *spend authority over some ZEC* | Yes (cryptographic signature) | No, MetaMask approval grant |
| Wallet support today | **100%** (every shielded wallet) | <20% (zcash-cli, YWallet) | 1 wallet (when allowlist permits) |
| Privacy of the auth itself | High (shielded tx, sender hidden) | Low (transparent address & key on the wire) | High (MetaMask-mediated) |
| Cost to the user | Dust + tx fee (~0.000001 to 0.00001 ZEC dust, plus ZIP 317 fee) | Free | Free |
| Latency | ~30s (block confirm) | Instant | Instant |
| Sybil resistance | High (real ZEC required) | None | None |

The honest summary: memo-challenge gives weaker cryptographic ownership proof than SIWZ-classic (the sender of a shielded tx is hidden, so we only know "someone with funds did this"), but vastly broader wallet support and built-in Sybil resistance. For most use cases (login to a dApp, register an account, vote in a DAO) that's the right trade.

To bind a *specific* identity to the session, the app supplies the identity (e.g. the user's UFVK, an email, an internal ID) when issuing the challenge. The verifier remembers the `(amount, identity)` mapping and authenticates that identity when the matching tx arrives.

## Operational considerations

### Identity model: anonymous by default, UFVK-bound on opt-in

Memo-challenge cryptographically proves **someone with spend authority over some ZEC sent a payment with this nonce in the memo**. It does *not* tell the verifier *who* the sender is; that's the whole point of shielded sends. So SIWZ has to make a UX choice: what identity gets bound to the resulting session?

ZBooks's `MemoSignIn` (a customized fork of the published `<MemoSignIn />`) exposes two modes via the `/api/auth/memo/issue` request body:

- **Default: anonymous, device-persistent.** No special input. The server generates an opaque `anon:<random-hex>` identity and the client stores it in `localStorage` under `siwz.zbooks.previous_anon_id`. On subsequent sign-ins from the same browser, the client sends `{ previousAnonId }`; the server validates the shape (`/^anon:[0-9a-f]{8,128}$/`) and reuses it as the identity. Result: the same browser gets the same anon account, while a different browser or wiped localStorage gets a fresh anon account.

- **Opt-in: UFVK-bound, cross-device.** A "Returning user?" expander lets the user paste their UFVK. The server validates with `inspectUfvk()`, then derives `identity = anon:<sha256(ufvk).slice(0,32)>`. The hash (not the UFVK) goes into the challenge token, so the raw UFVK never enters the signed payload or any persistent server state. The same UFVK from any device yields the same identity and the same account. **The UFVK is used for the one sign-in only and is NEVER persisted client-side.**

- **One-click re-auth.** After a successful memo ceremony the client stores `{identity, envelope}` in `localStorage` under `siwz.zbooks.reauth`. On next visit the sign-in panel shows a "Continue as anon:…" button; clicking it replays the HMAC envelope directly against `signIn("memo")` with no QR scan or on-chain payment. Same threat model as a long-lived "remember me" cookie. Rotating `NEXTAUTH_SECRET` invalidates every stored bundle silently and falls users back to the regular flow.

**Why UFVKs are not persisted in localStorage even though it would be convenient:** a UFVK is read-only (can't spend) but reveals the wallet's *complete* transaction history: every amount, every memo, every counterparty, for as long as the wallet exists. localStorage is readable by any JavaScript on the same origin (XSS), most browser extensions, anyone with brief physical device access, and sometimes browser sync. Storing a UFVK there would trade single-page-load convenience for permanent leakage of the user's entire financial history. The opaque `anon:<hex>` id has none of that risk; it's just a session handle the server itself generated and reissues, and it leaks nothing.

**Why UFVK at all and not just a username?** UFVK is the Zcash-native "this is my account" identifier. It is already meaningful to apps like ZBooks that need to read tx history, stable across wallet reinstalls (as long as the seed is preserved), unforgeable (you can't claim a UFVK you don't actually hold because the user is expected to paste their real one). A user-chosen username would be claim-based ("alice" first-come-first-served) and adds a separate identity system with no Zcash backing.

**Why not just rely on NextAuth's session cookie for "remember me"?** We do; that's the primary mechanism. The anon-id `localStorage` only matters for the edge case where the user signs out, sessions expire, or cookies are cleared, and they want to come back as the same anon account on the same device rather than yet another fresh one. UFVK-bound users don't need the anon-id storage; their UFVK is the persistent identifier when they choose to paste it.

**Server-side validation:** the issue endpoint validates both `ufvk` (via `inspectUfvk`, must look like `uview...` / `uviewtest...` bech32m) and `previousAnonId` (must match `anon:` + 8-128 hex chars). A malicious client cannot supply an arbitrary string and have it become their identity; it must pass the appropriate shape check first.

### Public lightwalletd infrastructure

Per ZecHub developer guidance and standard light-wallet practice, using a **public lightwalletd** is the normal hackathon / small-app path. SIWZ does **not** require you to run your own full Zcash node; that would be a 60-300 GB sync and serious infra. Instead, the `zingo-cli`-based deployment recipe in [`./shielded-deployment.md`](./shielded-deployment.md) points at one of these:

| Endpoint | Notes |
|---|---|
| `https://zec.rocks:443` | Community-run, well-maintained. Default in our setup script |
| `https://na.zec.rocks:443` / `https://eu.zec.rocks:443` | Geo mirrors for latency; used as automatic failover |
| `https://mainnet.lightwalletd.com:9067` | ECC's old endpoint. Deprecated and unreachable as of mid-2026 |

The operator of any public lightwalletd you sync against learns *which addresses you scan* (metadata leak) but **cannot decrypt your memos** (no IVK). For production deployments with stronger privacy needs, self-host the lightwalletd and Zebra pair; for hackathon use, public is fine and is what most light wallets in the ecosystem do.

For browser-side WebZjs use cases, ChainSafe also operates a gRPC-Web proxy at `https://zcash-mainnet.chainsafe.dev`. That endpoint is not used by our server-side architecture, but is documented in `shielded-deployment.md` as the right thing to point at for any future browser-only SIWZ integration.

### Service address: transparent vs shielded vs UA

**Transparent (`t1…`), default.**
- Block explorers can read the recipient address and amount without any viewing key, so verification works with zero infra.
- Service address visibility is a privacy cost to the *service*, not to users (users still send from shielded wallets, so their sender stays hidden).
- **You must control the spending key.** Funds sent for sign-ins are yours; lose the key, lose the funds. Use `scripts/gen-service-address.mjs` to generate one safely.
- Never use an address whose private key is in your source repo (or anywhere else public). The server in `apps/demo` has a hard-coded refusal-list for known-leaked test addresses.

**Shielded (`zs…`, `u1…`), implemented.**
- Privacy-maximalist option: the service address never appears on-chain in a publicly-decryptable form. Memo + amount are encrypted to the receiver.
- ZBooks's `ZcashRpcExplorer` (in `apps/demo/src/lib/explorer.ts`) speaks the standard Zcash wallet RPC (`z_listreceivedbyaddress`) over either HTTP or `zcash-cli` to fetch decrypted memos. The challenge is encoded in the memo as `SIWZ:<nonce>`; the amount stays at a fixed dust value (0.000001 ZEC) since it no longer needs to carry the nonce.
- Setup:
  1. Generate or pick a shielded address inside your Zcash daemon's wallet:
     ```bash
     zcash-cli z_getnewaddress sapling      # or 'unified'
     # → zs1…  (or u1…)
     ```
  2. Paste that address into `apps/demo/.env.local`:
     ```env
     SIWZ_SERVICE_ADDRESS=zs1...   # or u1…
     ```
  3. Tell ZBooks how to reach your daemon:
     ```env
     # HTTP (production-shaped)
     ZCASH_RPC_URL=http://127.0.0.1:8232
     ZCASH_RPC_USER=zcashrpcuser
     ZCASH_RPC_PASS=zcashrpcpassword
     # OR shell-out (same-machine local dev)
     ZCASH_CLI_PATH=/usr/local/bin/zcash-cli
     ```
  4. Restart `pnpm dev:zbooks`. The issue endpoint will now auto-detect the shielded address and dispatch the memo-mode challenge.
- The verifier needs the IVK for the service address. Easiest: keep the address in the same daemon that runs the verifier. Privilege-separated: generate the address elsewhere, export with `z_exportviewingkey`, then `z_importviewingkey` into the verifier daemon (read-only).

**Unified addresses (`u1…`) as service address?** ZIP 321 lets you target a UA, but most wallets will send to the *shielded receiver* (sapling/orchard) inside the UA, not the transparent one. That payment is invisible to a transparent-output-scanning verifier. If you put a UA as `SIWZ_SERVICE_ADDRESS`, expect sign-ins to silently fail unless you've also wired up shielded verification. For hackathon scope: stick with `t1…`.

### Why amount-encoded nonces and not memos?

A transparent service address can't see memos (memos are a shielded-only construct). To carry the per-attempt entropy on a transparent service address we encode the nonce in the *amount*: the random 0-999 zatoshi suffix gives 1000 distinct nonces per `baseAmountZec` setting. For a hackathon-scale deployment with low concurrent sign-in volume that's plenty; for a larger deployment, widen the range by raising `baseAmountZec` or accepting a wider nonce span (the protocol-level cap is 32 bits).

If you migrate to a shielded service address, the memo carries a 12-character random alphanumeric nonce (~70 bits) directly and the amount stays at a fixed dust value. The `@siwz/core` `issueMemoChallenge` API is shaped to support both; only the explorer implementation needs to change.

### Replay & one-shot semantics

The HMAC token binds (recipient, amount, identity, expiry). Within the TTL, anyone who observes the token *plus* a matching on-chain tx can call verify and get an envelope. To make verification one-shot, the app should keep a "consumed txid" set (Redis, DB, in-memory). For ZBooks, NextAuth's `signIn` is itself one-shot (creates one session per call), so we don't separately enforce one-shot at the verify layer.

### DEMO mode

`SIWZ_DEMO=1` swaps the live block explorer for an in-memory `MockExplorer`. The `/api/auth/memo/issue` endpoint then auto-seeds a synthetic txid that satisfies the freshly-issued challenge, and the user (or e2e script) just clicks "use" to paste it. Useful for judging without spending ZEC.

## Forward-looking: ZSAs

[ZIP 226](https://zips.z.cash/zip-0226) / [227](https://zips.z.cash/zip-0227) (Zcash Shielded Assets) open a different identity model: issue a non-transferable ZSA as a team-membership token. The wallet holding the token *is* the team member. Auth becomes "does the wallet hold the right ZSA?", with no signature, no payment, no challenge round-trip.

That's a v2 story. ZSAs are NU6+ and wallet support is still landing. Until that's stable, memo-challenge is the right pragmatic answer.
