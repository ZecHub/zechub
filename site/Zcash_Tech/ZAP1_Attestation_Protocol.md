# ZAP1 Attestation Protocol

ZAP1 is an open-source attestation protocol for Zcash. It writes structured lifecycle events to a BLAKE2b Merkle tree and anchors the tree root on-chain via Orchard shielded memos. Proofs are publicly verifiable. Event data stays private.


## TL;DR

- ZAP1 is an open-source attestation protocol for Zcash: structured lifecycle events anchored on-chain via Orchard shielded memos, with publicly verifiable proofs and private event data.
- Events are hashed with domain-separated BLAKE2b-256 into Merkle leaves; when a threshold is reached, the tree root is encoded as a ZAP1:09 memo inside a shielded transaction.
- Anyone holding a leaf hash can verify the full leaf-to-root-to-anchor path without trusting the operator — only hashes ever go on-chain.
- Real tooling exists: a Rust reference implementation (MIT), a crates.io verification SDK (Rust + 83 KB WASM), an npm JavaScript SDK, a universal memo decoder, and a conformance kit with 29 API and 14 protocol checks.
- ZAP1 is converging toward a ZIP 302 partType; its ZIP draft (PR #1243) is under review, with 4 mainnet anchors carrying 14 leaves as of March 2026.

## Core Explanation

Operators register event types — deployments, payments, transfers — and submit events to their own ZAP1 instance. Each event becomes a domain-separated BLAKE2b-256 leaf hash; leaves accumulate in a Merkle tree until a threshold triggers anchoring: the tree root is encoded as a ZAP1:09 memo and broadcast in a shielded transaction. Every operator runs their own instance with their own keys, tree, and anchors — no shared state between operators. The design is application-agnostic: any Zcash operator can define custom event types and personalization strings.

## Visual analogy

ZAP1 is a notary who never reads your documents. You hand over sealed envelopes (hashes); the notary stitches sealed receipts into a numbered ledger page and publishes only the page's fingerprint in a locked column of the public newspaper. Later, showing your envelope plus the page proves your document existed in that ledger — without revealing anything inside it.

## Deep Dive

The universal memo decoder identifies ZAP1, ZIP 302 TVLV, text, binary, and empty memos, so anchored data remains interoperable with the wider memo ecosystem. A FROST 2-of-3 threshold signing design covers multi-party anchor broadcasting, so no single operator key is a single point of failure for publication. Verification requires only the proof bundle and chain access — the conformance kit's 29 API checks and 14 protocol checks pin down implementations against the spec.

## Common Mistakes

- **Thinking event payloads are published.** Only BLAKE2b hashes go on-chain; event data stays private.
- **Assuming the operator must be trusted.** Verification needs just the proof bundle and chain access — no operator trust required.
- **Confusing ZAP1 with ZIP 302.** ZAP1 is converging toward a ZIP 302 partType; it is not there yet.
- **Expecting every event to hit the chain immediately.** Leaves accumulate until a threshold triggers an anchor.
- **Believing operators share one global tree.** Each operator has their own keys, Merkle tree, and anchors.


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
- Operator guide: [OPERATOR_GUIDE.md](https://github.com/Frontier-Compute/zap1/blob/main/OPERATOR_GUIDE.md)

## Related Pages

- [FROST](./FROST.md) — the threshold signing behind multi-party anchor broadcasting
- [zk_SNARKS](./zk_SNARKS.md) — the cryptography securing the shielded memos ZAP1 anchors through
- [NU5](./NU5.md) — the upgrade that introduced Orchard, whose memos carry ZAP1 anchors
- [Ironwood](./Ironwood.md) — the current era of the Orchard pool lineage


