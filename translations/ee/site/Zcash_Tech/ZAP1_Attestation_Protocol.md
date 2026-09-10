# ZAP1 Ðaseɖiɖi ƒe Ðoɖowɔɖi

ZAP1 nye ɖaseɖiɖi ƒe ɖoɖo si le ʋuʋu ɖi na Zcash. Eŋlɔa agbeme nudzɔdzɔ siwo woɖo ɖe ɖoɖo nu ɖe ​​BLAKE2b Merkle ati aɖe ŋu eye wòtsɔa seke ɖoa ati ƒe ke dzi le kɔsɔkɔsɔ me to Orchard shielded memos dzi. Woate ŋu aɖo kpe kpeɖodziwo dzi le dutoƒo. Nudzɔdzɔwo ŋuti nyatakakawo nɔa ame ŋutɔ ƒe nyawo me.

## Alesi wòwɔa dɔe

Dɔwɔlawo ŋlɔa nudzɔdzɔ ƒomeviwo (dɔwɔwɔ, fexexe, asitɔtrɔ, kple bubuawo) ɖi eye wotsɔa wo ɖona ɖe ZAP1 ƒe kpɔɖeŋu aɖe. Nudzɔdzɔ ɖesiaɖe wɔa aŋgba ƒe hash to domenyinyi-mamã BLAKE2b-256 zazã me. Agbawo ƒoa ƒu ɖe Merkle-ti aɖe me. Ne woɖo dzidzenu aɖe gbɔ la, woŋlɔa ati ƒe ke la ɖe kɔpi me abe ZAP1:09 ƒe nuŋlɔɖi ene eye wotsɔa seke dea Zcash me le asitsatsa si wokpɔ ta na me.

Amesiame si si aŋgba ƒe hash le ate ŋu aɖo kpe mɔ bliboa dzi tso aŋgba dzi yi ke dzi va ɖo on-chain anchor dzi, evɔ maka ɖe dɔwɔla la dzi o.

## Nɔnɔme veviwo

- **Application-agnostic**: Zcash dɔwɔla ɖesiaɖe ateŋu aɖe woawo ŋutɔ ƒe nudzɔdzɔ ƒomeviwo kple ame ŋutɔ ƒe tɔtrɔ ƒe kawo gɔme
- **Adzamenyawo takpɔkpɔ**: wowɔa hash na nudzɔdzɔ ƒe payloads hafi anchoring. Hashwo koe yia kɔsɔkɔsɔ dzi.
- **Woate ŋu aɖo kpe edzi le wo ɖokui si**: kpeɖodzi hiã kpeɖodzi babla kple kɔsɔkɔsɔ ƒe mɔɖeɖe ko. Mehiã be dɔwɔƒea naka ɖe edzi o.
- **ZIP 302 sɔ**: ZAP1 le ƒoƒom ɖe ZIP 302 partType gbɔ na ɖaseɖiɖi ƒe fetu

## Nusi li

- Nufiame ƒe dɔwɔwɔ (Rust, MIT ƒe mɔɖegbalẽ) .
- SDK ƒe kpeɖodzi le crates.io (Rust + 83KB WASM) .
- JavaScript SDK le npm dzi
- Universal memo decoder (dea dzesi ZAP1, ZIP 302 TVLV, nuŋɔŋlɔ, binary, kple nuŋlɔɖi ƒuƒluwo)
- Conformance kit si me API ƒe dodokpɔ 29 kple ɖoɖowɔɖi ƒe dodokpɔ 14 le
- FROST 2-of-3 ƒe dzidzenu ƒe asidede agbalẽ te ƒe ɖoɖowɔwɔ na akpa geɖe ƒe seke ƒe nyadzɔdzɔwo kaka
- ZIP draft PR #1243 si le ŋku lém ɖe eŋu
- 4 mainnet anchors siwo ƒe aŋgba 14 le March 2026 me

## Xɔtata

```
Your app  -->  ZAP1 API  -->  Merkle tree  -->  Zcash anchor
                  |                                    |
             event types                         shielded memo
          (DEPLOYMENT, etc)                    (ZAP1:09:{root})
```

Dɔwɔla ɖesiaɖe wɔa eya ŋutɔ ƒe ZAP1 kpɔɖeŋu kple woawo ŋutɔ ƒe safuiwo, Merkle ati, kple sekewo. Nɔnɔme ɖeka aɖeke meli le dɔwɔlawo dome o.

## Afisi nàsrɔ̃ nu geɖe le

- Dzɔtsoƒe: [github.com/Frontier-Compute/zap1](https://github.com/Frontier-Compute/zap1)
- Kpeɖodzi SDK: [crates.io/crates/zap1-ɖo kpe edzi](https://crates.io/crates/zap1-verify)
- Memo decoder: [aɖakawo.io/aɖakawo/zcash-memo-decode](https://crates.io/crates/zcash-memo-decode)
- Ðoɖowɔɖi ƒe nɔnɔmetata: [ONCHAIN_PROTOCOL.md](https://github.com/Frontier-Compute/zap1/blob/main/ONCHAIN_PROTOCOL.md)
- ZIP ƒe nuŋɔŋlɔ: [PR #1243](https://github.com/zcash/zips/pull/1243)
- API si le agbe: [fe.frontiercompute.io/ɖoɖowɔɖi/nyatakaka](https://pay.frontiercompute.io/protocol/info)
- Dɔdzikpɔla ƒe mɔfiame: [OPERATOR_GUIDE.md](https://github.com/Frontier-Compute/zap1/blob/main/OPERATOR_GUIDE.md)
