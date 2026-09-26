# ZAP1 Uthibitisho wa Itifaki ya Utaratibu

ZAP1 ni wazi chanzo uthibitisho itifaki kwa ajili ya Zcash. Inaandika muundo wa maisha mzunguko matukio BLAKE2b Merkle mti na nanga mizizi mti on-mnyororo kupitia Orchard ulinzi memos. ushahidi ni hadharani verifiable. tukio data anakaa binafsi.

## Jinsi inavyofanya kazi

Operators register event types (deployments, payments, transfers, etc.) and submit them to a ZAP1 instance. Kila tukio hutoa leaf hash using domain-separated BLAKE2b-256. majani kukusanya katika Merkle mti. Wakati kizingiti ni kufikiwa, mzizi wa mti umebadilishwa kama memo ya ZAP1:09 na kuingizwa kwa Zcash katika shughuli iliyohifadhiwa.

Mtu yeyote na hash jani unaweza kuthibitisha njia kamili kutoka jani kwa mizizi ya juu-mnyororo nanga, bila kuamini operator.

## Sifa muhimu

- ** Programu-agnostic**: yoyote Zcash operator unaweza kufafanua yao wenyewe aina ya tukio na minyororo customization
- ** faragha-kuhifadhi**: tukio payloads ni hashed kabla ya nanga. tu hashes kwenda juu ya mnyororo.
- ** Independently verifiable**: uthibitisho mahitaji tu ushahidi mfuko na mlolongo upatikanaji. hakuna uaminifu operator required.
- ** ZIP 302 sambamba**: ZAP1 ni converging kuelekea ZIP302 partType kwa ajili ya utility uthibitisho mzigo

## Kinachoendelea kuwepo

- Utekelezaji wa kumbukumbu (Rust, MIT leseni)
- Verification SDK juu ya crates.io (Rust + 83KB WASM)
- JavaScript SDK juu ya npm
- Universal memo decoder (hutambua ZAP1, ZIP 302 TVLV, maandishi, binary na tupu memos)
- Kitengo cha Ufuatiliaji na ukaguzi wa 29 API na 14 ya uthibitisho wa itifaki
- FROST 2-ya-3 kizingiti kusaini kubuni kwa ajili ya matangazo multi-party nanga
- ZIP rasimu PR # 1243 chini ya ukaguzi
- 4 mainnet nanga na 14 majani kama ya Machi 2026

## Usanifu wa majengo

```
Your app  -->  ZAP1 API  -->  Merkle tree  -->  Zcash anchor
                  |                                    |
             event types                         shielded memo
          (DEPLOYMENT, etc)                    (ZAP1:09:{root})
```

Kila operator anaendesha mwenyewe ZAP1 mfano na funguo zao wenyewe, Merkle mti, na nanga. Hakuna hali ya pamoja kati ya waendeshaji.

## Mahali pa kujifunza zaidi

- Chanzo: [github.com/Frontier-Compute/zap1](https://github.com/Frontier-Compute/zap1)
- kuthibitisha SDK: [crates.io/crates/zap1-verify](https://crates.io/crates/zap1-verify)
- Memo decoder: [crates.io/crates/zcash-memo-decode Kiwango cha juu zaidi ya kiwango cha chini ni:](https://crates.io/crates/zcash-memo-decode)
- Itifaki spec: [ONCHAIN_PROTOCOL.md](https://github.com/Frontier-Compute/zap1/blob/main/ONCHAIN_PROTOCOL.md)
- ZIP rasimu: [PR #1243](https://github.com/zcash/zips/pull/1243)
- Kuishi API: [pay.frontiercompute.io/protocol/info (kiingilio cha simu)](https://pay.frontiercompute.io/protocol/info)
- Mwongozo wa Opereta: [OPERATOR_GUIDE.md Kuweka alama ya kifaa cha kompyuta kwenye kituo chako](https://github.com/Frontier-Compute/zap1/blob/main/OPERATOR_GUIDE.md)
