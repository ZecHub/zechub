# ZAP1 Attestation Protocol

## TL;DR

- **ZAP1** is an open-source attestation protocol that anchors lifecycle event proofs on the Zcash blockchain via shielded memos
- Events (deployments, payments, transfers) are hashed into a **BLAKE2b Merkle tree**; only the tree root goes on-chain
- **Anyone can verify** an event happened without trusting the operator — just a leaf hash + chain access
- Written in Rust; available as a crate (`zap1-verify`) and JavaScript SDK on npm
- Converging toward a ZIP 302 partType for standardized on-chain attestation payloads

---

ZAP1 is an open-source attestation protocol for Zcash. It writes structured lifecycle events to a BLAKE2b Merkle tree and anchors the tree root on-chain via Orchard shielded memos. Proofs are publicly verifiable. Event data stays private.

## How it works

Operators register event types (deployments, payments, transfers, etc.) and submit them to a ZAP1 instance. Each event produces a leaf hash using domain-separated BLAKE2b-256. Leaves accumulate in a Merkle tree. When a threshold is reached, the tree root is encoded as a ZAP1:09 memo and anchored to Zcash in a shielded transaction.

Anyone with a leaf hash can verify the full path from leaf to root to on-chain anchor, without trusting the operator.

## Key properties

- **Application-agnostic**: any Zcash operator can define their own event types and personalization strings
- **Privacy-preserving**: event payloads are hashed before anchoring. Only hashes go on-chain.
- **Independently verifiable**: verification needs only the proof bundle and chain access. No operator trust required.
- **ZIP 302 compatible**: ZAP1 is converging toward a ZIP 302 partType for the attestation payload

## What exists

- Reference implementation (Rust, MIT licensed)
- Verification SDK on crates.io (Rust + 83KB WASM)
- JavaScript SDK on npm
- Universal memo decoder (identifies ZAP1, ZIP 302 TVLV, text, binary, and empty memos)
- Conformance kit with 29 API checks and 14 protocol checks
- FROST 2-of-3 threshold signing design for multi-party anchor broadcasting
- ZIP draft PR #1243 under review
- 4 mainnet anchors with 14 leaves as of March 2026

## Architecture

```
Your app  -->  ZAP1 API  -->  Merkle tree  -->  Zcash anchor
                  |                                    |
             event types                         shielded memo
          (DEPLOYMENT, etc)                    (ZAP1:09:{root})
```

Each operator runs their own ZAP1 instance with their own keys, Merkle tree, and anchors. No shared state between operators.

## Where to learn more

- Source: [github.com/Frontier-Compute/zap1](https://github.com/Frontier-Compute/zap1)
- Verification SDK: [crates.io/crates/zap1-verify](https://crates.io/crates/zap1-verify)
- Memo decoder: [crates.io/crates/zcash-memo-decode](https://crates.io/crates/zcash-memo-decode)
- Protocol spec: [ONCHAIN_PROTOCOL.md](https://github.com/Frontier-Compute/zap1/blob/main/ONCHAIN_PROTOCOL.md)
- ZIP draft: [PR #1243](https://github.com/zcash/zips/pull/1243)
- Live API: [pay.frontiercompute.io/protocol/info](https://pay.frontiercompute.io/protocol/info)
- Operator guide: [frontiercompute.io/operators.html](https://frontiercompute.io/operators.html)

---

## Related Pages

- [Viewing Keys](/zcash-tech/viewing-keys) — Selective disclosure mechanism that complements ZAP1 attestations
- [ZK-SNARKs](/zcash-tech/zk-snarks) — The zero-knowledge proof system underlying Zcash privacy
- [FROST](/zcash-tech/frost) — Threshold signing used in ZAP1's multi-party anchor broadcasting design
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) — Other on-chain capability built on Zcash's memo field
- [Privacy as a Core Principle](/privacy/privacy-as-a-core-principle) — Why anchoring proofs privately matters
