# ZAP1 ɖaseɖigbalẽvi

ZAP1 nye open-source attestation protocol na Zcash. Eŋlɔa lifecycle events siwo me ɖoɖo le ɖe BLAKE2b Merkle tree eye wòhea ati ƒe ke la ɖo to Orchard shielded memos dzi. Wona amewo katã kpɔna be wote ŋu da asi ɖe edzi hã. Event data nɔa ame ŋutɔ gbɔ.

## Ale si wòwɔnae

Dɔwɔlawo ŋlɔa nudzɔdzɔ ƒomeviwo (dɔdɔwo, fexefefewo, nugbegblẽwɔwɔ kple bubuawo) eye woɖoa wo ɖe ZAP1 ƒe kpɔɖeŋu me. Nudzɔdzɔ ɖesiaɖe wɔa aŋgba hash to domen-ti si womena o BLAKE2b-256 dzi. Aŋutrɔawo ƒoa ƒu le Merkle ati aɖe me. Ne woɖo liƒo aɖe gbɔ la, wodea dzesi atia gɔme abe ZAP1:09 memo ene heɖonɛ na Zcash le nuɖoanyi siwo ŋu wotre ɖo me.

Anyone with a leaf hash can verify the full path from leaf to root to on-chain anchor, without trusting the operator.

## Eƒe nɔnɔme veviwo

- ** Application-agnostic**: Zcash ƒe dɔwɔla ɖesiaɖe ate ŋu aɖɔli nu siwo dzɔ kple woƒe ameɖokuiwo tɔ me.
- ** Ameɖokui-kpɔkplɔ**: nuwɔnawo ƒe agbawoe woɖɔna hafi wodzena. Hatsotsoawo koe yia edzi le kɔsɔkɔsɔa me.
- ** Woate ŋu adzro wo me le eɖokui si**: Nu siwo ko hiã be woaɖo kpe edzi ye nye nuƒlewo kple mɔ̃ɖaŋunuwo ƒe kɔpi. Womehiã na ame aɖe ƒe kaka ɖe amea dzi o.
- **ZIP 302 ateŋu awɔ dɔ le eme**: ZAP1 va ɖo ZIP 302-ƒomevi aɖe gbɔ na ɖaseɖigbalẽ ƒe agba si woxɔ la.

## Nusi li la me.

- Numetoto ƒe dɔwɔwɔ (Rust, MIT licensed)
- Verification SDK le crates.io dzi (Rust + 83KB WASM)
- JavaScript SDK le npm dzi
- Universal memo decoder (kpɔa ZAP1, ZIP 302 TVLV, text, binary kple memos siwo me naneke mele o)
- Wotsɔ API 29 kple ɖoɖowɔɖi 14 ƒe dodokpɔwo wɔ ɖeka.
- FROST 2-of-3 nuxexlẽ ƒe mɔ̃ si dzi woazãna le television me na ame siwo nye nyadzɔdzɔgblɔlawo kple haxɔsetɔwo siaa.
- ZIP ƒe PR #1243 me nuŋlɔɖi le ŋɔŋlɔm.
- 4 mainnet anchors kple aŋgba 14 tso March 2026 dzi.

## Xɔtuɖaŋuwo

```
Your app  -->  ZAP1 API  -->  Merkle tree  -->  Zcash anchor
                  |                                    |
             event types                         shielded memo
          (DEPLOYMENT, etc)                    (ZAP1:09:{root})
```

Dɔwɔla ɖesiaɖe zãa eya ŋutɔ ƒe ZAP1 kpɔɖeŋu kple eƒe safuiwo, Merkle-ti, kple akɔtadzesiwo. Dzɔdzɔme aɖeke mele dɔwɔlawo dome o.

## Afisi nàsrɔ̃ nu geɖe le

- Nyatakakawo tso: [github.com/Frontier-Compute/zap1](https://github.com/Frontier-Compute/zap1)
- Verification SDK: (Dɔwɔƒe si kpɔa mɔdzesiwo gbɔ): [crates.io/crates/zap1-verify (Kpɔe be woagbugbɔ adzra)](https://crates.io/crates/zap1-verify)
- Memo ƒe nugbugbɔŋlɔla: [crates.io/crates/zcash-memo-decode (Kpɔtɔ ɖe wo me)](https://crates.io/crates/zcash-memo-decode)
- Nuŋlɔɖi ƒe akpa si: [ONCHAIN_PROTOCOL.md Eʋevi kple nu si le eme la me ƒe kɔpiwo:](https://github.com/Frontier-Compute/zap1/blob/main/ONCHAIN_PROTOCOL.md)
- ZIP ƒe ɖoɖo: [PR #1243](https://github.com/zcash/zips/pull/1243)
- Live API: [pay.frontiercompute.io/protocol/info (xexea me kɔmpiuta ŋuti nyatakakawo)](https://pay.frontiercompute.io/protocol/info)
- Ame si zãa mɔ̃ la ƒe mɔfiame: [OPERATOR_GUIDE.md Eʋevi si le ame ŋu la ƒe ŋkɔwo:](https://github.com/Frontier-Compute/zap1/blob/main/OPERATOR_GUIDE.md)
