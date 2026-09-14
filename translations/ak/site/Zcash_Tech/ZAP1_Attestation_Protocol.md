# ZAP1 Adansedi Nhyehyɛe

ZAP1 yɛ open-source adansedie protocol ma Zcash. Ɛkyerɛw asetra mu nsɛm a wɔahyehyɛ no kɔ BLAKE2b Merkle dua bi so na ɛde dua ntini no hyɛ nkɔnsɔnkɔnsɔn so denam Orchard shielded memos so. Adanse ahorow no yɛ nea wotumi di ho adanse wɔ baguam. Event data no tra hɔ kokoam.

## Sɛnea ɛyɛ adwuma

Adwumayɛfoɔ kyerɛw nsɛm a ɛsisiiɛ ahodoɔ (deployments, payments, transfers, ne nea ɛkeka ho) na wɔde kɔ ZAP1 instance. Adeyɛ biara ma ahaban hash a wɔde domain-separated BLAKE2b-256 di dwuma. Ahaban boaboa ano wɔ Merkle dua bi mu. Sɛ wɔdu threshold bi a, wɔde dua ntini no encoded sɛ ZAP1:09 memo na wɔde anchored to Zcash wɔ shielded transaction mu.

Obiara a ɔwɔ ahaban hash betumi ahwɛ sɛ ɔkwan mũ no nyinaa fi ahaban so kɔ ntini so kɔ on-chain anchor so, a onni nea ɔde di dwuma no mu ahotoso.

## Agyapade atitiriw

- **Application-agnostic**: Zcash dwumadie biara bɛtumi akyerɛkyerɛ wɔn ankasa event ahodoɔ ne personalization strings
- **Privacy-preserving**: event payloads yɛ hashed ansa na anchoring. Hashes nkutoo na ɛkɔ on-chain.
- **Independently verifiable**: nokwaredi hia adanse bundle ne nkɔnsɔnkɔnsɔn kwan nkutoo. Ɛho nhia sɛ adwumayɛfo no mu ahotoso biara.
- **ZIP 302 a ɛne no hyia**: ZAP1 rehyiam akɔ ZIP 302 partType bi so ama adansedie payload no

## Nea ɛwɔ hɔ

- Nhwehwɛmu a wɔde di dwuma (Rust, MIT tumi krataa) .
- SDK a ɛkyerɛ sɛ ɛyɛ nokware wɔ crates.io (Rust + 83KB WASM) .
- JavaScript SDK wɔ npm so
- Amansan nyinaa memo decoder (ɛkyerɛ ZAP1, ZIP 302 TVLV, nsɛm, binary, ne memos a hwee nni mu)
- Conformance kit a ɛwɔ API nhwehwɛmu 29 ne protocol nhwehwɛmu 14
- FROST 2-of-3 threshold signing nhyehyɛe a wɔde ma akuw pii anchor broadcasting
- ZIP draft PR #1243 a wɔrehwɛ mu
- 4 mainnet anchors a ɛwɔ nhaban 14 de besi March 2026

## Dan nhyehyɛeɛ

```
Your app  -->  ZAP1 API  -->  Merkle tree  -->  Zcash anchor
                  |                                    |
             event types                         shielded memo
          (DEPLOYMENT, etc)                    (ZAP1:09:{root})
```

Operator biara de wɔn ankasa ZAP1 instance di dwuma a wɔn ankasa keys, Merkle dua, ne anchors ka ho. Tebea biara nni hɔ a wɔkyɛ wɔ adwumayɛfo ntam.

## Baabi a wubetumi asua pii

- Faako a wonyae: [github.com/Frontier-Compute/zap1](https://github.com/Frontier-Compute/zap1)
- SDK a ɛkyerɛ sɛ ɛyɛ nokware: [crates.io/crates/zap1-hwɛ](https://crates.io/crates/zap1-verify)
- Memo decoder: [krates.io/krates/zcash-memo-dekode a wɔde kyerɛw nsɛm](https://crates.io/crates/zcash-memo-decode)
- Protocol no ho nkyerɛkyerɛmu: [ONCHAIN_PROTOCOL.md](https://github.com/Frontier-Compute/zap1/blob/main/ONCHAIN_PROTOCOL.md)
- ZIP a wɔde kyerɛw nsɛm: [PR #1243](https://github.com/zcash/zips/pull/1243)
- API a ɛte ase: [pay.frontiercompute.io/protocol/info](https://pay.frontiercompute.io/protocol/info)
- Ɔdefoɔ akwankyerɛ: [OPERATOR_GUIDE.md](https://github.com/Frontier-Compute/zap1/blob/main/OPERATOR_GUIDE.md)
