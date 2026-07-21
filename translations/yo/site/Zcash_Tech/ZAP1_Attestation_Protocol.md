# Àkọsílẹ̀ Ìjẹ́rìí ZAP1

ZAP1 is an open-source attestation protocol for Zcash. It writes structured lifecycle events to a BLAKE2b Merkle tree and anchors the tree root on-chain via Orchard shielded memos. Proofs are publicly verifiable. Event data stays private.

## Bó ṣe ń ṣiṣẹ́

Operators register event types (deployments, payments, transfers, etc.) and submit them to a ZAP1 instance. Each event produces a leaf hash using domain-separated BLAKE2b-256. Leaves accumulate in a Merkle tree. When a threshold is reached, the tree root is encoded as a ZAP1:09 memo and anchored to Zcash in a shielded transaction.

Ẹnikẹ́ni tó bá ní àdàkọ ewé lè ṣàyẹ̀wò gbogbo ipa ọ̀nà láti ewé sí gbòǹgbò sí ìdásílẹ̀, láìsí ìgbẹ́kẹ̀lé olùdarí.

## Àwọn ohun-ìní pàtàkì

- ** Ohun elo-agnostic **: eyikeyi oniṣẹ Zcash le ṣalaye awọn iru iṣẹlẹ tirẹ ati awọn okun isọdi ti ara ẹni
- ** Ìpamọ-ìpamọ́**: àwọn ìnáwó ìṣẹ̀lẹ̀ ni wọ́n máa ń ṣe àdàkọ kí wọn tó dì í. kìkì àwọn àdàkàdekè ló máa ń lọ sí orí ẹ̀rọ.
- **Ati ṣayẹwo ni ominira**: iṣayẹwo nilo nikan ẹri ẹri ati iraye si pq. Ko si igbẹkẹle oniṣẹ ti a beere.
- **ZIP 302 ibaramu**: ZAP1 ti wa ni converging si a ZIP302 partType fun awọn ifọwọsi payload

## Ohun tó wà

- Ìmúṣẹ ìtọ́sọ́nà (Rust, MIT licensed)
- Ṣayẹwo SDK lori crates.io (Rust + 83KB WASM)
- JavaScript SDK lórí npm
- Oníṣàmúlò ìkọsílẹ̀ àpapọ̀ (ó ń dá ZAP1, ZIP 302 TVLV, àwọn ìkọsì, ìdìpọ̀, àti àwọn ìkìlọ̀ tí kò ní nǹkan mọ́)
- Àkójọ ìmúṣẹ pẹlu àyẹ̀wò API 29 àti àyẹ́wò ìlànà 14
- FROST 2-ti-3 ìlà wíwọlé ìforúkọsílẹ̀ àwòkọ́ṣe fún ọ̀pọ̀-ẹgbẹ́ adarí igbohunsafẹfẹ́
- Àkọsílẹ̀ ZIP PR #1243 tí a ń ṣàyẹ̀wò
- 4 àwọn ìdákọ̀ró àkànṣe pẹ̀lú 14 ojúewé láti March 2026

## Àwòrán ilé

```
Your app  -->  ZAP1 API  -->  Merkle tree  -->  Zcash anchor
                  |                                    |
             event types                         shielded memo
          (DEPLOYMENT, etc)                    (ZAP1:09:{root})
```

Olùṣiṣẹ́ kọ̀ọ̀kan n ṣiṣẹ́ ìṣẹ̀lẹ̀ ZAP1 tirẹ̀ pẹ̀lú àwọn kókó tirẹ, igi Merkle, àti àwọn ìdákọ̀rọ̀. Kò sí àpapọ̀ ipò láàrin àwọn olùṣakoso.

## Ibi tó o ti lè kẹ́kọ̀ọ́ sí i

- Orísun: [github.com/Frontier-Compute/zap1]](https://github.com/Frontier-Compute/zap1)
- Ṣayẹwo SDK: [crates.io/crates/zap1-verify]](https://crates.io/crates/zap1-verify)
- Àkọsílẹ̀ àdììtú: [crates.io/crates/zcash-memo-decode](https://crates.io/crates/zcash-memo-decode)
- Àkọsílẹ̀ ìlànà: [ONCHAIN_PROTOCOL.md](https://github.com/Frontier-Compute/zap1/blob/main/ONCHAIN_PROTOCOL.md)
- Àkọlé ZIP: [PR #1243](https://github.com/zcash/zips/pull/1243)
- Àkọsílẹ̀ API: [pay.frontiercompute.io/protocol/info]](https://pay.frontiercompute.io/protocol/info)
- Itọsọna Awọn oniṣẹ: [frontiercompute.io/operators.html](https://frontiercompute.io/operators.html)
