# Àkọsílẹ̀ Ìjẹ́rìí ZAP1

ZAP1 is an open-source attestation protocol for Zcash. It writes structured lifecycle events to a BLAKE2b Merkle tree and anchors the tree root on-chain via Orchard shielded memos. Proofs are publicly verifiable. Event data stays private.

## Bí ó ṣe ń ṣiṣẹ́

Operators register event types (deployments, payments, transfers, etc.) and submit them to a ZAP1 instance. Each event produces a leaf hash using domain-separated BLAKE2b-256. Leaves accumulate in a Merkle tree. When a threshold is reached, the tree root is encoded as a ZAP1:09 memo and anchored to Zcash in a shielded transaction.

Ẹnikẹ́ni tó bá ní àdàkọ ewé lè ṣàyí gbogbo ipa ọ̀nà láti ojú ìwé sí gbòǹgbò títí dé orí ẹyọ ìdì, láìfi ọkàn tán oníṣẹ́ náà.

## Àwọn ohun-ìní pàtàkì

- ** Ohun elo-agnostic**: eyikeyi oniṣẹ Zcash le ṣalaye awọn iru iṣẹlẹ tirẹ ati awọn okun isọdi ti ara ẹni wọn.
- ** Ìpamọ-ìdáàbòbò**: àwọn ìrùsókè ìṣèlẹ̀ ni a ṣe àdàkọ kí wọ́n tó dì. Àdàkọ nìkan ló ń lọ sí orí ẹ̀rọ (on-chain).
- **Awọn ti o ni idaniloju igbẹkẹle**: ijẹrisi nilo nikan ẹri iṣiro ati iraye si pq. Ko ṣe dandan fun igbekele oniṣẹ.
- **ZIP 302 ibaramu**: ZAP1 ti wa ni converging si a ZIP 302, partType fun awọn ifọwọsi payload

## Ohun tó wà níhìn-ín ni

- Àtúnṣe ìmúṣẹ (Rust, MIT gba àṣẹ)
- SDK ìwífún lórí crates.io (Rust + 83KB WASM)
- JavaScript SDK lórí npm
- Oníṣàmúlò àlàyé ìpamọ́ gbogbo-ayé (ó ń dá ZAP1, ZIP 302 TVLV, àkọsílẹ̀, méjì àti àwọn ìwé tí kò ní nǹkan mọ́)
- Ìdìpọ̀ ìmúṣẹ pẹ̀lú àyèwò API 29 àti àyẹ̀wò ìlànà 14
- FROST 2-of-3 threshold signing design for multi-party anchor broadcasting
- Àkọlé ZIP PR #1243 tí a ń ṣe àtúnyẹ̀wò rẹ̀.
- 4 ìlépa orí-ìkànnì pẹ̀lú 14 ojúewé láti March 2026

## Ìṣẹ̀dá ilé-ìkọ́lé

```
Your app  -->  ZAP1 API  -->  Merkle tree  -->  Zcash anchor
                  |                                    |
             event types                         shielded memo
          (DEPLOYMENT, etc)                    (ZAP1:09:{root})
```

Olùṣiṣẹ́ kọ̀ọ̀kan n ṣiṣẹ ìṣẹlẹ ZAP1 tirẹ̀ pẹlú àwọn kókó, igi Merkle àti àlàfo wọn. Kò sí ipò tí ó pín láàárín àwọn olùṣe iṣẹ́ náà.

## Ibi tó o ti lè kẹ́kọ̀ọ́ sí i

- Orísun: [github.com/Frontier-Compute/zap1](https://github.com/Frontier-Compute/zap1)
- SDK ìwífún: [crates.io/crates/zap1-verify ì ì í ë°©í ê ̧°ë¦¬ê3μì§ ì '](https://crates.io/crates/zap1-verify)
- Àkọsílẹ̀ ìdìbò: [crates.io/crates/zcash-memo-decode](https://crates.io/crates/zcash-memo-decode)
- Àkọsílẹ̀ àlàyé: [ONCHAIN_PROTOCOL.md](https://github.com/Frontier-Compute/zap1/blob/main/ONCHAIN_PROTOCOL.md)
- Àkọlé ZIP: [PR #1243](https://github.com/zcash/zips/pull/1243)
- Àwòrán API: [pay.frontiercompute.io/protocol/info](https://pay.frontiercompute.io/protocol/info)
- Ìwé tó ń darí oníṣẹ́: [OPERATOR_GUIDE.md Àwọn ojúewé tó jápọ̀ mọ́ "OPERATORION"](https://github.com/Frontier-Compute/zap1/blob/main/OPERATOR_GUIDE.md)
