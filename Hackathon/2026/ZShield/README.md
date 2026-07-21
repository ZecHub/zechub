# ZShield — Sign in with Zcash

> **Prove who you are. Reveal nothing else.**

**Track:** Zcash Login  
**Prize pool:** 25 ZEC  
**Status:** Submitted

---

## Links

| | |
|---|---|
| **Live demo** | https://zshield.vercel.app |
| **Source code** | https://github.com/EdCryptoFi/zshield |
| **Demo video** | https://www.youtube.com/watch?v=xqK69d5gwSA |
| **Article (X)** | https://x.com/EdCriptoFi/status/2061799056246997273 |

---

## What it does

ZShield turns any Zcash shielded address into a W3C DID + OIDC identity — no password, no email, no KYC.

1. Browser generates an Ed25519 keypair → `zauth1…` address (bech32m)
2. Server issues a signing nonce (ZIP 304 interface)
3. Wallet signs the challenge
4. Server verifies → issues JWT + Zero-Knowledge claims
5. Any OIDC-compatible app can now accept this Zcash identity

### Zero-Knowledge Claims

| Claim | Proves | Hides |
|-------|--------|-------|
| `zec_holder` | Holds ≥ 1 ZEC | Exact balance |
| `active_user` | Transacted in last 30 days | Transaction details |
| `senior_holder` | Holds ≥ 10 ZEC | Exact balance |

---

## Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 (App Router) |
| Auth | NextAuth v5 beta |
| Crypto | `@noble/ed25519` (ZIP 304 interface) |
| Identity | W3C DID v1.1 · `did:zcash:mainnet:<address>` |
| OIDC | Custom bridge: discovery, token, userinfo, JWKS |
| Tests | Vitest — 5 files, 20 tests |
| Deploy | Vercel |
| License | MIT |

---

## Quick start

```bash
git clone https://github.com/EdCryptoFi/zshield
cd zshield
npm install
cp .env.example .env.local
npm run dev
npm test
```
