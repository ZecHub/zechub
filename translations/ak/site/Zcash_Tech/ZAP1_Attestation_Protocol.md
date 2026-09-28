# ZAP1 Attestation Protocol (Ɔbaakofoɔ a ɔtɔ so mmienu)

ZAP1 is an open-source attestation protocol for Zcash. It writes structured lifecycle events to a BLAKE2b Merkle tree and anchors the tree root on-chain via Orchard shielded memos. Proofs are publicly verifiable. Event data stays private.

## Sɛnea ɛyɛ adwuma no

Operators register event types (deployments, payments, transfers, etc.) and submit them to a ZAP1 instance. Each event produces a leaf hash using domain-separated BLAKE2b-256. Leaves accumulate in a Merkle tree. Sɛ wɔdu ɛdan bi mu na wonya akatua no wie a, wɔde dua no nhini di dwuma sɛ ZAP1:09 memo ma ɛyɛ adwuma wɔ Zcash so wɔ dwumadie bi a wɔn ani da hɔ so.

Obiara a ɔwɔ ahaban hash tumi hu kwan no nyinaa fi ahaban so kɔ ntini mu de kosi ɔkyɛn-nkrataafa, bere a ɔnni nea ɔde ne ho to n'adwumamfoɔ so.

## N'adeε a ɛho hia paa ne:

- ** Application-agnostic**: obiara a ɔde Zcash di dwuma no betumi akyerɛ ne dwumadie ahodoɔ ne n'ankasa ahwehwɛde ahorow ase.
- **Ahobanbɔ-a ɛhwɛ so**: dwumadi no ho mfasoɔ a wɔde di dwuma wɔ hash mu ansa na w'atwe ato hɔ. Hash nko ara na ɛkɔ on chain.
- **Independently verifiable**: verification hia proof bundle ne chain access nkoara. no operator trust required.
- **ZIP 302 compatible**: ZAP1 resane akɔfa ZIP 302, partType ama adansedie no so mfasoɔ.

## Nea ɛwɔ hɔ no

- Reference implementation (Rust, MIT licensed) - Nkyerεkyerεmu a εfa dwumadie ho.
- Verification SDK wɔ crates.io (Rust + 83KB WASM) so
- JavaScript SDK wɔ npm so
- Universal memo decoder (hu ZAP1, ZIP 302 TVLV, text, binary ne memos a ɛnni hwee)
- Conformity kit with 29 API checks and 14 protocol checks (Ɛho nhyehyɛeɛ a ɛfa akwantuo ho)
- FROST 2-of-3 threshold signing design for multi-party anchor broadcasting (Ɔwԑn Aban Ahyehyԑde a ԑfa Ɔmanfo Hɔn Agyinabea ho)
- ZIP draft PR #1243 a wɔresusuw ho
- 4 mainnet anchors a 14 leaves as of March 2026 (Ɛyɛ bosome no mu na wɔdi nkuro)

## Abɔdeyɛ mu adansiɛ

```
Your app  -->  ZAP1 API  -->  Merkle tree  -->  Zcash anchor
                  |                                    |
             event types                         shielded memo
          (DEPLOYMENT, etc)                    (ZAP1:09:{root})
```

Ɔdansifoɔ biara de ne ZAP1 nsɛdi di dwuma a wɔn ankasa nsaano, Merkle dua, ne anchors. Obiara nni tebea bi wɔ operator ntam.

## Ɛhe na wobɛtumi asua pii?

- Firibea: [github.com/Frontier-Compute/zap1](https://github.com/Frontier-Compute/zap1)
- Verification SDK: [crates.io/crates/zap1-verify](https://crates.io/crates/zap1-verify)
- Memo dekode: [nnaka.io/nnaka/zcash-memo-decode](https://crates.io/crates/zcash-memo-decode)
- Nhyehyɛeɛ no ho nsɛnkyerɛne: [ONCHAIN_PROTOCOL.md](https://github.com/Frontier-Compute/zap1/blob/main/ONCHAIN_PROTOCOL.md)
- ZIP nsusue: [PR #1243](https://github.com/zcash/zips/pull/1243)
- Mmerɛ a wowɔ hɔ: [pay.frontiercompute.io/protocol/info](https://pay.frontiercompute.io/protocol/info)
- Ɔsomfoɔ akwankyerε: [OPERATOR_GUIDE.md (Ɔkwan a wɔfa so de kyerɛ kasa ase)](https://github.com/Frontier-Compute/zap1/blob/main/OPERATOR_GUIDE.md)
