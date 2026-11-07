# ZAP1 Ɖaseɖigbalɛ ƒe Ɖoɖo

ZAP1 nye open-source attestation protocol na Zcash. Eŋlɔ agbenɔnɔ ƒe nudzɔdzɔwo siwo woɖo ɖe ɖoɖo me ɖe BLAKE2b Merkle ti me, eye wòde ti la ƒe ke ɖe ɖoɖonu dzi [on-chain] to Orchard ɣaɣla [shielded] nya kpui [memo]wo me. Ame sia ame ate ŋu akpɔ ɖaseɖigbalɛ [proof]wo ƒe nyateƒe. Nudzɔdzɔ ƒe datawo nɔ ɣaɣla me.

## Ale si wòwɔa dɔe

Dzikpɔlawo ŋlɔ nudzɔdzɔ ƒomeviwo (deploymentwo, fexexewo [payments], transferwo, kple bubuawo) eye woɖo wo ɖe ZAP1 instance aɖe me. Nudzɔdzɔ sia sia wɔa leaf hash aɖe kple domain-separated BLAKE2b-256. Leafwo ƒoa nu ɖe Merkle ti me. Ne woɖo teƒe si woɖo ɖa la, woɖe ti la ƒe ke ɖe ZAP1:09 nya kpui me eye woɖe eƒe teƒe ɖe Zcash me le ɣaɣla gaɖoɖo [transaction] aɖe me.

Ame sia ame si le leaf hash aɖe asi la ate ŋu aɖo kpekpeɖeŋu blibo tso leaf la dzi yi ti la ƒe ke gbɔ, eye tso afima yi ɖo ɖoɖonu [chain] dzi ƒe anchor gbɔ, evɔ mekpɔ dzikpɔla la dzi o.

## Nɔnɔme veviwo

- **Application-agnostic**: Zcash dzikpɔla sia sia ate ŋu aɖo eya ŋutɔ ƒe nudzɔdzɔ ƒomeviwo kple personalization stringwo
- **ɣaɣla-wɔwɔ**: Woha nudzɔdzɔ ƒe payloadwo hafi woade wo ƒe teƒe ɖe ɖoɖonu dzi. Hashwo koe yina ɖe ɖoɖonu dzi.
- **Ame bubuwo hã ate ŋu akpɔe ƒe nyateƒe**: Ɖasekpe la kple ɖoɖonu ƒe mɔɖoƒe koe hiã na verification. Dzikpɔla ƒe dzikpɔkpɔ mele mkpa o.
- **ZIP 302 compatible**: ZAP1 le ɖoɖo ɖe ZIP 302 partType aɖe ŋu na attestation payload la

## Nu siwo le eme

- Reference implementation (Rust, MIT licensed)
- Verification SDK le crates.io (Rust + 83KB WASM)
- JavaScript SDK le npm
- Universal memo decoder (eɖea ZAP1, ZIP 302 TVLV, text, binary, kple nya kpui si me nu aɖeke mele o)
- Conformance kit kple API check 29 kple protocol check 14
- FROST 2-of-3 threshold signing design na amehawo ƒe anchor broadcasting
- ZIP draft PR #1243 le review me
- Mainnet anchor 4 kple leaf 14 le March 2026 me

## Architecture

```
Your app  -->  ZAP1 API  -->  Merkle tree  -->  Zcash anchor
                  |                                    |
             event types                         shielded memo
          (DEPLOYMENT, etc)                    (ZAP1:09:{root})
```

Dzikpɔla sia sia wɔa eya ŋutɔ ƒe ZAP1 instance kple eya ŋutɔ ƒe keywo, Merkle ti, kple anchorwo. State aɖeke mele dzikpɔlawo dome o.

## Afi si nàsrɔ nu ge ɖe eme akpɔ

- Source: [github.com/Frontier-Compute/zap1](https://github.com/Frontier-Compute/zap1)
- Verification SDK: [crates.io/crates/zap1-verify](https://crates.io/crates/zap1-verify)
- Memo decoder: [crates.io/crates/zcash-memo-decode](https://crates.io/crates/zcash-memo-decode)
- Protocol spec: [ONCHAIN_PROTOCOL.md](https://github.com/Frontier-Compute/zap1/blob/main/ONCHAIN_PROTOCOL.md)
- ZIP draft: [PR #1243](https://github.com/zcash/zips/pull/1243)
- Live API: [pay.frontiercompute.io/protocol/info](https://pay.frontiercompute.io/protocol/info)
- Operator guide: [OPERATOR_GUIDE.md](https://github.com/Frontier-Compute/zap1/blob/main/OPERATOR_GUIDE.md)
