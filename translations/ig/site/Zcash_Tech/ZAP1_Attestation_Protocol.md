# ZAP1 Nkwekọrịta Asambodo

ZAP1 is an open-source attestation protocol for Zcash. It writes structured lifecycle events to a BLAKE2b Merkle tree and anchors the tree root on-chain via Orchard shielded memos. Proofs are publicly verifiable. Event data stays private.

## Otú o si arụ ọrụ

Operators register event types (deployments, payments, transfers, etc.) and submit them to a ZAP1 instance. Each event produces a leaf hash using domain-separated BLAKE2b-256. Leaves accumulate in a Merkle tree. When a threshold is reached, the tree root is encoded as a ZAP1:09 memo and anchored to Zcash in a shielded transaction.

Onye ọ bụla nwere mpempe akwụkwọ nwere ike ịchọpụta ụzọ zuru ezu site na akwụkwọ ruo mgbọrọgwụ na arịlịka n'elu, na-enweghị ịtụkwasị onye ọrụ ahụ obi.

## Njirimara ndị bụ isi

- ** Ngwa-agnostic **: onye ọ bụla na-arụ ọrụ Zcash nwere ike ịkọwa ụdị ihe omume ha na eriri ahaziri iche
- **Nchekwa nzuzo**: a na-ejikọta ihe ndị dị mkpa tupu ha ejikọta. Naanị hashes na-aga n'elu-agbụ.
- ** Enwere ike inyocha onwe ya **: nyocha chọrọ naanị ihe akaebe na nnweta agbụ. Enweghị ntụkwasị obi onye ọrụ achọrọ.
- **ZIP 302 dakọtara**: ZAP1 na-agbakọta na ZIP302 partType maka njirimara njirimara

## Ihe dị adị

- Ntughari ntinye aka (Rust, MIT nyere ikikere)
- Nyocha SDK na crates.io (Rust + 83KB WASM)
- JavaScript SDK na npm
- Universal memo decoder (na-achọpụta ZAP1, ZIP 302 TVLV, ederede, ọnụọgụ abụọ, na oghere efu)
- Ihe ngwugwu na 29 API na 14 protocol checks
- FROST 2-nke-3 ntinye aka ntinye aka maka mgbasa ozi mgbasa ozi multi-party
- ZIP draft PR #1243 na nyocha
- 4 arịlịka mainnet na 14 akwụkwọ dị ka nke March 2026

## Ihe owuwu

```
Your app  -->  ZAP1 API  -->  Merkle tree  -->  Zcash anchor
                  |                                    |
             event types                         shielded memo
          (DEPLOYMENT, etc)                    (ZAP1:09:{root})
```

Each operator runs their own ZAP1 instance with their own keys, Merkle tree, and anchors. No shared state between operators.

## Ebe ị ga-amụtakwu ihe

- Isi mmalite: [github.com/Frontier-Compute/zap1](https://github.com/Frontier-Compute/zap1)
- Nyocha SDK: [crates.io/crates/zap1-verify](https://crates.io/crates/zap1-verify)
- Memo decoder: [crates.io/crates/zcash-memo-decode](https://crates.io/crates/zcash-memo-decode)
- Nkọwapụta Protocol: [ONCHAIN_PROTOCOL.md](https://github.com/Frontier-Compute/zap1/blob/main/ONCHAIN_PROTOCOL.md)
- ZIP draft: [PR #1243](https://github.com/zcash/zips/pull/1243)
- API dị ndụ: [pay.frontiercompute.io/protocol/info](https://pay.frontiercompute.io/protocol/info)
- Ntuziaka onye ọrụ: [frontiercompute.io/operators.html](https://frontiercompute.io/operators.html)
