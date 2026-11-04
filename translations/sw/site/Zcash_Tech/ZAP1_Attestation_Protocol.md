# Itifaki ya uthibitishaji [attestation] ya ZAP1

ZAP1 ni itifaki ya uthibitishaji yenye msimbo wazi [open-source] kwa ajili ya Zcash. Inaandika matukio yaliyopangiliwa ya mzunguko wa maisha kwenye mti wa Merkle wa BLAKE2b na kutia nanga mzizi wa mti on-chain kupitia jumbe [memos] za faragha za Orchard. Mathibitisho [proofs] yanaweza kuthibitishwa hadharani. Data ya matukio husalia kuwa ya faragha [privacy].

## Jinsi inavyofanya kazi

Waendeshaji husajili aina za matukio (utumiaji, malipo [payments], uhamisho, n.k.) na kuyawasilisha kwenye nakala ya ZAP1. Kila tukio huzalisha heshi ya jani [leaf hash] kwa kutumia BLAKE2b-256 iliyotenganishwa kwa kikoa [domain-separated]. Majani hukusanywa kwenye mti wa Merkle. Kizingiti kinapofikiwa, mzizi wa mti husimbwa kama ujumbe wa ZAP1:09 na kutiwa nanga kwa Zcash katika muamala wa faragha [shielded transaction].

Mtu yeyote mwenye heshi ya jani anaweza kuthibitisha njia kamili kutoka kwenye jani hadi mzizi hadi nanga ya on-chain, bila kumwamini mwendeshaji.

## Sifa kuu

- **Huru kwa programu [Application-agnostic]**: mwendeshaji yeyote wa Zcash anaweza kufafanua aina zake za matukio na tungo za ubinafsishaji
- **Inayohifadhi faragha [Privacy-preserving]**: maudhui ya matukio [event payloads] huwekewa heshi kabla ya kutiwa nanga. Heshi pekee ndizo huenda on-chain.
- **Inayoweza kuthibitishwa kwa kujitegemea [Independently verifiable]**: uthibitishaji huhitaji tu kifurushi cha thibitisho na ufikiaji wa mnyororo [chain]. Hakuna uaminifu kwa mwendeshaji unaohitajika.
- **Inayooana na ZIP 302**: ZAP1 inaelekea kwenye partType ya ZIP 302 kwa maudhui ya uthibitishaji

## Vilivyopo

- Utekelezaji rejeleo [Reference implementation] (Rust, wenye leseni ya MIT)
- SDK ya uthibitishaji kwenye crates.io (Rust + WASM ya 83KB)
- SDK ya JavaScript kwenye npm
- Kisimbuzi cha ujumbe cha jumla [Universal memo decoder] (hutambua ZAP1, ZIP 302 TVLV, maandishi, binari, na jumbe tupu)
- Kifurushi cha ulinganifu [Conformance kit] chenye ukaguzi 29 wa API na ukaguzi 14 wa itifaki
- Muundo wa FROST wa kutia saini kwa kizingiti [threshold signing] wa 2-kati-ya-3 kwa utangazaji wa nanga unaohusisha wahusika wengi
- Rasimu ya PR #1243 ya ZIP inayopitiwa
- Nanga 4 za mainnet zenye majani 14 kufikia Machi 2026

## Usanifu

```
Your app  -->  ZAP1 API  -->  Merkle tree  -->  Zcash anchor
                  |                                    |
             event types                         shielded memo
          (DEPLOYMENT, etc)                    (ZAP1:09:{root})
```

Kila mwendeshaji huendesha nakala yake binafsi ya ZAP1 yenye funguo zake, mti wa Merkle, na nanga zake. Hakuna hali ya pamoja kati ya waendeshaji.

## Mahali pa kujifunza zaidi

- Chanzo: [github.com/Frontier-Compute/zap1](https://github.com/Frontier-Compute/zap1)
- SDK ya uthibitishaji: [crates.io/crates/zap1-verify](https://crates.io/crates/zap1-verify)
- Kisimbuzi cha ujumbe: [crates.io/crates/zcash-memo-decode](https://crates.io/crates/zcash-memo-decode)
- Bainifu ya itifaki: [ONCHAIN_PROTOCOL.md](https://github.com/Frontier-Compute/zap1/blob/main/ONCHAIN_PROTOCOL.md)
- Rasimu ya ZIP: [PR #1243](https://github.com/zcash/zips/pull/1243)
- API ya moja kwa moja: [pay.frontiercompute.io/protocol/info](https://pay.frontiercompute.io/protocol/info)
- Mwongozo wa mwendeshaji: [OPERATOR_GUIDE.md](https://github.com/Frontier-Compute/zap1/blob/main/OPERATOR_GUIDE.md)
