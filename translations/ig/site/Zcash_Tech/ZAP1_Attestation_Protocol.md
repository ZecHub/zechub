# ZAP1 Nkwupụta Asambodo

ZAP1 is an open-source attestation protocol for Zcash. It writes structured lifecycle events to a BLAKE2b Merkle tree and anchors the tree root on-chain via Orchard shielded memos. Proofs are publicly verifiable. Event data stays private.

## Otú o si arụ ọrụ .

Operators register event types (deployments, payments, transfers, etc.) and submit them to a ZAP1 instance. Each event produces a leaf hash using domain-separated BLAKE2b-256. Leaves accumulate in a Merkle tree. When a threshold is reached, the tree root is encoded as a ZAP1:09 memo and anchored to Zcash in a shielded transaction.

Onye ọ bụla nwere akwụkwọ hash nwere ike ịchọpụta ụzọ zuru ezu site na akwukwo ruo mgbọrọgwụ gaa n'ụdọ-akara, na-enweghị ịtụkwasị onye ọrụ ahụ obi.

## Njirimara ndị bụ isi

- ** Ngwa-agnostic**: onye ọ bụla na - arụ ọrụ Zcash nwere ike ịkọwa ụdị ihe omume ha na eriri ahaziri iche.
- ** Nzuzo-nchekwa**: ihe omume na-ebute ibu tupu anchoring. Naanị hashes gaa n'elu agbụ ígwè.
- ** Enwere ike inyocha onwe ya**: nyocha chọrọ naanị ihe akaebe na nnweta agbụ. Enweghị ntụkwasị obi onye ọrụ achọrọ.
- **ZIP 302 dakọtara**: ZAP1 na-agbakọta n'akụkụ akụkụ nke ụdị ZIP 302.

## Ihe dị adị .

- Ntughari ntinye aka (Rust, MIT nyere ikikere)
- Nyocha SDK na crates.io (Rust + 83KB WASM)
- JavaScript SDK na npm
- Onye na-emechi ihe ncheta zuru ụwa ọnụ (na - achọpụta ZAP1, ZIP 302 TVLV, ederede, ọnụọgụ abụọ, yana akwụkwọ mpịakọta efu)
- Ihe nkwụnye na-agbaso 29 API nyocha na 14 protocol checks.
- FROST 2-nke-3 akara ngosi ntinye aka maka mgbasa ozi ọtụtụ-akụkụ anchor broadcasting
- ZIP draft PR #1243 na nyocha
- 4 arịlịka mainnet nwere 14 akwụkwọ dị ka nke March 2026

## Ihe owuwu ụlọ

```
Your app  -->  ZAP1 API  -->  Merkle tree  -->  Zcash anchor
                  |                                    |
             event types                         shielded memo
          (DEPLOYMENT, etc)                    (ZAP1:09:{root})
```

Onye ọ bụla na-arụ ọrụ nke ya ZAP1 ihe atụ nwere igodo ha, osisi Merkle, na arịlịka. Ọ dịghị ọnọdụ a na - ekekọrịta n'etiti ndị ọrụ.

## Ebe ị ga-amụtakwu ihe ndị ọzọ

- Ebe e si nweta ya: [github.com/Frontier-Compute/zap1](https://github.com/Frontier-Compute/zap1)
- SDK nyocha: [crates.io/crates/zap1-verify Ihe na-eme ka ihe dị mma bụ:](https://crates.io/crates/zap1-verify)
- Ihe ncheta: [crates.io/crates/zcash-memo-decode (n'asụsụ Bekee)](https://crates.io/crates/zcash-memo-decode)
- Nkọwapụta Protocol: [ONCHAIN_PROTOCOL.md Ihe na-eme ka ọ dị mma bụ:](https://github.com/Frontier-Compute/zap1/blob/main/ONCHAIN_PROTOCOL.md)
- ZIP draft: Ihe na-eme ka mmadụ nwee obi ụtọ. [PR #1243](https://github.com/zcash/zips/pull/1243)
- API dị ndụ: [pay.frontiercompute.io/protocol/info Onye na-ahụ maka ihe ndekọ](https://pay.frontiercompute.io/protocol/info)
- Akwụkwọ ntuziaka onye ọrụ: [Onye na-arụ ọrụ.md](https://github.com/Frontier-Compute/zap1/blob/main/OPERATOR_GUIDE.md)
