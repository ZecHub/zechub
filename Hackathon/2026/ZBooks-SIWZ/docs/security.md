# SIWZ Security Model

What SIWZ guarantees, what it doesn't, and what you need to do at the application layer.

## What's protected by the protocol

| Threat | Mitigation |
|---|---|
| Signature replay across sessions | Server-issued nonces, checked on every verify. Stateless HMAC tokens included. |
| Signature replay across apps | Message includes `domain`; verifier rejects if it doesn't match. |
| Signature replay across networks | Message includes `Network`; verifier requires it match the address encoding. |
| Signature replay across the Zcash↔Bitcoin universe | Magic prefix is `"Zcash Signed Message:\n"` (not Bitcoin's), so signatures don't cross-validate. |
| Expired sessions reaching the server | `Expiration Time` is enforced; nonce HMAC also has its own TTL. |
| Timing oracles in nonce verification | `crypto.timingSafeEqual` on the HMAC compare. |
| Tampering with the message after signing | dsha256-then-secp256k1; any byte change breaks verification. |
| Tampering with the address after signing | Address is part of the signed message and HASH160 must match recovered pubkey. |

## What's NOT protected by the protocol

These are application-layer concerns. SIWZ does not address them; you must.

### XSS

A SIWZ session cookie is no more or less resistant to XSS than any other auth cookie. Use NextAuth's HttpOnly cookies (default), set CSP, sanitize user-rendered content.

### CSRF on the credentials endpoint

NextAuth includes CSRF protection on `/api/auth/callback/*`. Don't disable it.

### Wallet UX phishing

If a malicious site can get a user to sign a SIWZ message *for* `legit-app.com` while they think they're signing in *to* `evil.com`, the protocol cannot help. Wallets SHOULD render the `domain` field prominently before signing.

### Address rotation

A user has no canonical Zcash identity: they can hold thousands of addresses, and shielded users SHOULD rotate. Your application needs to decide whether the user's identity is "this specific address" (simple) or "anyone who can sign with any address in this set" (more complex; typically a one-time linking step at sign-up).

### Sybil

A user can have unlimited addresses. SIWZ does not solve Sybil. Pair it with rate limiting, proof-of-payment, or off-chain reputation for use cases where one-account-per-human matters.

### Private-key custody

SIWZ never sees a private key, but if the user pastes their seed into a phishing site to "import their wallet", we cannot help. Wallets SHOULD be the only thing that ever touches a spending key.

## Operational guidance

- **Always set `NEXTAUTH_SECRET` to a strong random value.** Reused as the SIWZ nonce HMAC key.
- **Use HTTPS in production.** SIWZ doesn't bind to TLS the way some browser APIs do; a MITM that can intercept the nonce + the signature *and* an existing browser session can replay both. Standard hygiene.
- **Rate-limit `/api/siwz/nonce`.** It's cheap, but unauthenticated; trivially abusable for DoS amplification.
- **Set short `expirationSeconds`.** 10 minutes is the default. That's the window in which a stolen signature could be replayed before the nonce expires. Lower it if your threat model warrants.
- **Log verification failures with the error code** (`VERIFIER_UNAVAILABLE`, `EXPIRED`, `DOMAIN_MISMATCH`, …). They're often the first signal of an attack.

## Threat model: a stolen signature

Suppose an attacker captures a valid `(message, signature, nonceToken)` triple in flight:

- **Same session:** they can replay it once. They will end up signed in as the legitimate user. Mitigation: TLS.
- **After the user signs in:** the nonceToken is single-use only if the application enforces single-use (the default `verifyNonceToken` does NOT; it only checks the HMAC and TTL). For higher assurance, layer a `nonce_consumed` Bloom filter or a one-shot cache on top.
- **After TTL expiry:** the nonceToken fails verification, the signature alone is useless without a fresh nonce.

We chose stateless nonces as the default because they remove the operational burden in serverless deploys. For applications where single-use enforcement is critical, wrap `verifyNonceToken` in a `consumed` check backed by Redis or your DB.

## ZBooks application-layer hardening

These are the protections layered on top of SIWZ in the ZBooks reference app (`apps/demo`). They are application choices, not part of the SIWZ protocol, and are written here so other integrators can copy or adapt the pattern.

### UFVK encryption at rest

UFVKs are persisted in Turso under AES-256-GCM with a key derived from `NEXTAUTH_SECRET` via HKDF-SHA256. Stored rows look like `enc:v1:<iv>.<tag>.<ciphertext>`, base64url-encoded. The plaintext UFVK never touches the DB. A leaked Turso auth token alone no longer leaks the team's complete shielded transaction history; both the DB token AND `NEXTAUTH_SECRET` have to be compromised before plaintext UFVKs come back.

- Implementation: `apps/demo/src/lib/crypto-at-rest.ts`.
- Idempotent migration: on first DB access after the upgrade, any legacy plaintext UFVKs are re-written as ciphertexts (`apps/demo/src/lib/db.ts`, `migrateUfvksToEncrypted`).
- Reads decrypt transparently in `toUfvk`; callers see plaintext.
- Caveat: rotating `NEXTAUTH_SECRET` invalidates all stored ciphertexts. Plan a re-key step if you ever rotate that secret.

### Key ownership on mutation

A treasurer can manage their own UFVK rows but cannot rename or delete a row whose `owner` does not match their session address. Admins keep the wider authority. Enforced in `apps/demo/src/app/api/keys/[id]/route.ts` via `authorizeKeyMutation`.

### Rate limits on the memo endpoints

`/api/auth/memo/issue` (20/min/IP) and `/api/auth/memo/poll` (90/min/IP) carry an in-process sliding-window limiter from `apps/demo/src/lib/rate-limit.ts`. State is per-instance, so a determined distributed attacker can multiply by the hot-instance count; treat this as a hardening, not a fortress. For a real fortress, back the limiter with Turso or Redis.

### Reconcile match strictness

Auto-reconciliation in `apps/demo/src/lib/db.ts` (`reconcileRun`) refuses to auto-match a payout line if its `(address, amount, memo)` tuple is shared with another completed-unpaid line in the same run. Memo comparison is strict equality, not substring containment. Ambiguous rows must be marked paid manually so a typo or duplicate line never mis-credits a payee.

### Pre-payment balance refresh

The Pay-batch button in `apps/demo/src/app/payouts/[id]/PayoutRunDetail.tsx` calls `POST /api/payouts/[id]/preflight` and only opens the QR modal if the freshly re-queried treasury spendable balance still covers the run. Catches a balance drop that happened between page load and click.

### Stale-sync recovery

`syncUfvk` keeps an in-process lock with a started-at timestamp; a process that dies mid-sync no longer blocks its own retries (`apps/demo/src/lib/sync.ts`, `STALE_LOCK_MS`). On every DB initialisation, any `sync_status = 'syncing'` rows left over from a previous process are reset to `idle` with a "previous sync was interrupted" hint (`apps/demo/src/lib/db.ts`, `resetStaleSync`).
