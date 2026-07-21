# ZAP1 uthibitisho Itifaki

ZAP1 ni wazi chanzo uthibitisho itifaki kwa ajili ya Zcash. Inaandika muundo lifecycle matukio ya BLAKE2b Merkle mti na nanga mti mizizi on-mnyororo kupitia Orchard ulinzi memos. ushahidi ni hadharani verifiable. tukio data anakaa binafsi.

## Jinsi inavyofanya kazi

Operators register event types (deployments, payments, transfers, etc.) and submit them to a ZAP1 instance. Kila tukio hutoa jani hash kutumia domain-kutengwa BLAKE2b-256. majani kukusanya katika Merkle mti. Wakati kizingiti ni kufikiwa, mti mizizi ni encoded kama ZAP1:09 memo na anchored kwa Zcash katika shughuli ulinzi.

Mtu yeyote aliye na hash ya jani anaweza kuthibitisha njia kamili kutoka jani hadi mizizi hadi nanga kwenye mnyororo, bila kumwamini mwendeshaji.

## Sifa muhimu

- ** Programu-agnostic **: yoyote Zcash operator unaweza kufafanua yao wenyewe aina ya tukio na minyororo customization
- ** faragha-kuhifadhi **: tukio payloads ni hashed kabla ya nanga. hashes tu kwenda juu ya mnyororo.
- **Independently verifiable**: uthibitisho inahitaji tu ushahidi mfuko na mlolongo upatikanaji. Hakuna uaminifu operator required.
- ** ZIP 302 sambamba **: ZAP1 ni converging kuelekea ZIP302 partType kwa ajili ya utility uthibitisho

## Kinachoendelea

- Utekelezaji wa kumbukumbu (Rust, MIT leseni)
- Verification SDK juu ya crates.io (Rust + 83KB WASM)
- JavaScript SDK juu ya npm
- Universal memo decoder (hutambua ZAP1, ZIP 302 TVLV, maandishi, binary, na tupu memos)
- Kitengo cha kufuata na ukaguzi wa 29 wa API na ukaguaji wa itifaki ya 14
- FROST 2-ya-3 kizingiti kusaini kubuni kwa ajili ya matangazo ya multi-party nanga
- ZIP rasimu PR # 1243 chini ya ukaguzi
- 4 mainnet nanga na 14 majani kama ya Machi 2026

## Usanifu

```
Your app  -->  ZAP1 API  -->  Merkle tree  -->  Zcash anchor
                  |                                    |
             event types                         shielded memo
          (DEPLOYMENT, etc)                    (ZAP1:09:{root})
```

Kila operator anaendesha mwenyewe ZAP1 mfano na funguo zao wenyewe, Merkle mti, na nanga. Hakuna hali ya pamoja kati ya waendeshaji.

## Mahali pa kujifunza zaidi

- Chanzo: [github.com/Frontier-Compute/zap1](https://github.com/Frontier-Compute/zap1)
- SDK ya uthibitishaji: [crates.io/crates/zap1-verify](https://crates.io/crates/zap1-verify)
- Memo decoder: [crates.io/crates/zcash-memo-decode](https://crates.io/crates/zcash-memo-decode)
- Spec ya itifaki: [ONCHAIN_PROTOCOL.md](https://github.com/Frontier-Compute/zap1/blob/main/ONCHAIN_PROTOCOL.md)
- ZIP rasimu: [PR # 1243](https://github.com/zcash/zips/pull/1243)
- Kuishi API: [pay.frontiercompute.io/protocol/info](https://pay.frontiercompute.io/protocol/info)
- Mwongozo wa mwendeshaji: [frontiercompute.io/operators.html](https://frontiercompute.io/operators.html)
