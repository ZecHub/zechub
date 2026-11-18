<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU7.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Hariri Ukurasa"/>
</a>

# NU7

> NU7 iliwashwa kwenye Mainnet ya Zcash katika block ya 3,543,405 tarehe 6 Novemba 2026 (02:34 UTC; jioni ya tarehe 5 Novemba katika maeneo ya saa za Marekani), na imekuwa ikifanya kazi tangu wakati huo.

Utajifunza: mabadiliko yaliyofanywa na NU7 (block za haraka zaidi, vikomo vya vitendo vya faragha, urejeshaji wa ada, na mwisho wa miamala ya toleo la 4), mambo ambayo haikubadilisha, na hatua ambazo waendeshaji wa node, pochi, masoko ya kubadilishana sarafu na wachimbaji walipaswa kuchukua.

NU7 ni Zcash[uboreshaji wa mtandao](../start-here/network-upgrades), uliotekelezwa na [ZIP 259](https://zips.z.cash/zip-0259). Ulipunguza muda kati ya block kutoka sekunde 75 hadi sekunde 25, ukaweka kikomo cha idadi ya vitendo vya faragha vinavyoweza kutoshea katika block moja, ukaanza kuondoa 60% ya ada za miamala kwenye mzunguko ili ziweze kutolewa tena kwa wachimbaji wa baadaye, na ukafanya miamala ya toleo la 4 kuwa batili, jambo lililofunga bwawa la zamani la Sprout. Haukutambulisha muundo mpya wa muamala. Kitambulisho cha tawi lake la makubaliano ni `0x77190ad9`.

Kwa nini hili ni muhimu. Kabla ya NU7, kwa wastani ulisubiri sekunde 75 kupata uthibitisho wa kwanza, jambo ambalo ni polepole kwa kaunta ya duka, amana ya soko la kubadilishana sarafu au ubadilishaji wa cross-chain. NU7 ilipunguza muda huo hadi takribani sekunde 25 bila kuchapisha ZEC zaidi: zawadi kwa kila block ilipunguzwa hadi theluthi moja, hivyo utoaji wa kila siku ukabaki vilevile. Pia ni uboreshaji wa kwanza kuongeza utaratibu unaolenga kulipia usalama wa mtandao baada ya zawadi za block kupungua.

Je, wewe ni mgeni kwenye Zcash? Anza na [Zcash ni niniZEC na Zcash](../start-here/what-is-zec-and-zcash) na [Mabwawa ya Faragha](../using-zcash/shielded-pools), kisha urudi hapa.

## Kwa ufupi

Kwa maneno rahisi: sasa block huwasili kila sekunde 25, kiasi cha ZEC mpya kwa siku hubaki vilevile, sehemu ya kila ada huhifadhiwa kwa ajili ya wachimbaji wa baadaye, na bwawa la zamani la Sprout limefungwa.

- **Block za sekunde 25** ([ZIP 218](https://zips.z.cash/zip-0218)): uthibitisho wa kwanza hupatikana baada ya takribani sekunde 25 badala ya 75. Ruzuku ya block ilipungua kutoka 1.5625 hadi 0.52083333 ZEC, hivyo takribani ZEC 1,800 bado hutolewa kwa siku.
- **Vikomo vya vitendo vya faragha** (ZIP 218): kiwango cha juu ni vitendo 330 vya faragha kwa kila block katika mabwawa yote, pamoja na vikomo kwa kila bwawa, ili gharama za uthibitishaji wa block katika hali mbaya zaidi na za kusawazisha pochi ziwe chini kuliko hapo awali.
- **Utaratibu wa Uendelevu wa Mtandao** ([ZIP 235](https://zips.z.cash/zip-0235) + [ZIP 237](https://zips.z.cash/zip-0237)): 60% ya ada za miamala za kila block huondolewa kwenye mzunguko na kutolewa tena kwa wachimbaji baadaye, kuanzia block 8,939,664 (inakadiriwa kuwa karibu Februari 2031). Kikomo cha jumla ya sarafu milioni 21 hakijabadilika.
- **Miamala ya toleo la 4 ni batili** ([ZIP 2003](https://zips.z.cash/zip-2003)): pochi lazima zijenge miamala ya v5 au v6. Sprout inaweza kutumika tu kupitia v4, hivyo fedha ambazo bado zimo katika Sprout sasa zimeganda.
- **Programu**: [Zebra 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0) na matoleo ya baadaye hufuata NU7. Hakuna toleo la `zcashd` linalounga mkono NU7.

## Mfano wa kuona

Fikiria mnyororo kama njia ya treni. Kabla ya NU7, treni iliondoka kila sekunde 75 na ingeweza kubeba abiria wengi kadiri walivyotoshea katika MB 2. NU7 huendesha treni kila sekunde 25, humlipa kila dereva theluthi moja ya nauli ya zamani ili jumla ya kila siku ibaki vilevile, na huweka kikomo cha idadi ya abiria wazito zaidi (vitendo vya faragha) wanaoweza kupanda treni moja, ili isiweze kuchukua muda mrefu sana kukaguliwa.

![NU7 in four panels: blocks are three times faster and new ZEC per day stays the same; 60% of fees go into a public reserve for rewards from 2031; the legacy Sprout pool from 2016 can no longer be spent; 98.9% of voting ZEC chose to keep halvings](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu7-four-changes.png)

## Mabadiliko yaliyofanywa na NU7

### Muda lengwa wa sekunde 25 kati ya block (ZIP 218)

- Marekebisho ya ugumu sasa yanalenga block moja kila **sekunde 25** badala ya 75, kwa hiyo block huwasili mara tatu zaidi.
- Ruzuku ya block iligawanywa kwa tatu: **0.52083333 ZEC** kwa kila block katika kipindi cha sasa cha kupunguzwa kwa nusu (awali ilikuwa 1.5625 ZEC). Utoaji wa kila siku hubaki takribani ZEC 1,800 (block 3,456 kwa siku badala ya 1,152).
- Kupunguzwa kwa nusu bado hutokea kila baada ya miaka minne. Kwa kuwa block ni za haraka zaidi, kupunguzwa kwa nusu kunakofuata kumehamia block **6,132,390**, inayokadiriwa kuwa mwishoni mwa Novemba 2028 kwa muda wa sekunde 25 kati ya block (ZIP 259).
- Dirisha la kukokotoa wastani wa ugumu liliongezeka kutoka block 17 hadi **102**, ili marekebisho yaendelee kuangalia kipindi cha muda kinachokaribiana na kile cha awali.
- Muda chaguomsingi wa kuisha kwa muamala uliongezeka kutoka block 40 hadi **120**, na kuufanya ubaki takribani dakika 50.

### Vikomo vya vitendo vya faragha (ZIP 218)

Kila block sasa ina bajeti ya pamoja na vikomo kwa kila bwawa:

| Kikomo | Kwa kila block |
|---|---|
| Vitendo vyote vya faragha katika mabwawa | 330 |
| Vitendo vya Orchard | 330 |
| Vitendo vya Ironwood | 330 |
| Ingizo + matokeo ya Sapling | 300 |
| Sprout JoinSplits | hakuna kinachoruhusiwa |

Kabla ya NU7, block kamili ya MB 2 ingeweza kuwa na takribani Orchard 617 au vitendo vya Ironwood au matokeo ya Sapling takribani 2,107, bila vikomo kwa kila bwawa. ZIP 218 inaweka vikomo vipya ili, hata kukiwa na block mara tatu zaidi, hali mbaya zaidi kwa node na kwa kusawazisha pochi iwe bora kuliko hapo awali (kwa mfano, kiwango cha juu cha kipimo data cha kusawazisha faragha kwa light client kinashuka kutoka takribani MB 271 hadi 169 kwa siku), huku upitishaji wa itifaki ya Orchard ukiongezeka zaidi ya mara mbili (kutoka takribani miamala 2.9 hadi 6.6 kwa sekunde kwa miamala yenye vitendo 2).

### Utaratibu wa Uendelevu wa Mtandao (ZIP 235 + ZIP 237)

- **Uondoaji wa ada (ZIP 235):** 60% ya ada za miamala katika kila block huondolewa kwenye mzunguko; 40% iliyobaki huenda kwa mchimbaji kama awali. Tofauti na kuchoma, ZEC zilizoondolewa hurekodiwa ili ziweze kutolewa tena baadaye.
- **Utoaji upya (ZIP 237):** ZEC zilizoondolewa huhifadhiwa katika hali ya umma ya makubaliano inayoitwa Salio la Thamani la NSM. Lilipewa salio la awali katika NU7 kwa thamani ambayo wachimbaji hawakudai hapo awali. Kuanzia block **8,939,664** (inakadiriwa kuwa karibu Februari 2031), kila block hutoa sehemu isiyobadilika ya salio hilo juu ya ratiba ya kawaida ya kupunguzwa kwa nusu.
- Kikomo cha jumla ya sarafu hakiongezeki. Salio likiwa sifuri, utoaji hufuata sawasawa ratiba ya zamani ya kupunguzwa kwa nusu.
- NU7 **haikutekeleza** [ZIP 233](https://zips.z.cash/zip-0233) (uondoaji wa hiari unaofanywa na watumiaji) au [ZIP 234](https://zips.z.cash/zip-0234) (kubadilisha upunguzaji kwa nusu na mteremko laini). Kura za wamiliki wa sarafu zilichagua muundo unaohifadhi upunguzaji kwa nusu katika ZIP 237.

### Miamala ya toleo la 4 hairuhusiwi (ZIP 2003)

- Kuanzia NU7, kila muamala wa toleo la 4 ni batili: si uhamisho wa Sprout pekee, bali pia miamala ya uwazi pekee na ya Sapling iliyojengwa katika muundo wa v4. Miamala ya toleo la 5 (NU5) na toleo la 6 ([Ironwood](../zcash-tech/ironwood)) haijabadilika.
- Uhamisho wa Sprout upo tu katika muundo wa v4, kwa hiyo bwawa la [Sprout](../zcash-tech/sprout) haliwezi tena kutumika. Tazama [Kurejesha Fedha](../using-zcash/recovering-funds).

### Mambo madogo zaidi

- Marekebisho ya kanuni za mfuko wa maendeleo ili njia za ufadhili ziendelee kufanya kazi kwa block za sekunde 25 ([ZIP 207](https://zips.z.cash/zip-0207) Marekebisho ya 2, [ZIP 214](https://zips.z.cash/zip-0214) Marekebisho ya 3), na sasisho la orodha ya anwani za njia za ufadhili ([ZIP 2008](https://zips.z.cash/zip-2008)).
- Node za NU7 hutangaza toleo la itifaki ya mtandao **170190** kwenye Mainnet na kukata muunganisho wa rika za zamani baada ya kuwashwa.

## Mambo ambayo NU7 haikufanya

- **Hakuna muundo mpya wa muamala.** NU7 iliepuka kwa makusudi uhamishaji mwingine wa pochi na vichanganuzi mara tu baada ya Ironwood kutambulisha miamala ya v6.
- **Hakuna mabadiliko ya kikomo cha jumla ya sarafu au mzunguko wa miaka minne wa kupunguzwa kwa nusu.**
- **Hakuna mabadiliko ya muda wa ukomavu wa coinbase.** Sarafu zilizochimbwa bado zinahitaji block 100 kabla ya kutumika (sasa takribani dakika 42 badala ya saa 2).
- **Hakuna bwawa jipya la faragha.** Ironwood (NU6.3) linasalia kuwa bwawa jipya zaidi; Orchard hubaki kwa matumizi ya kutoa tu, kama ilivyo tangu Ironwood.

## Hatua zilizohitajika kwa kila kundi

- **Waendeshaji wa node:** endesha [Zebra 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0) au toleo la baadaye. Zebra 7 huhamisha hifadhidata yake kutoka umbizo la v28 hadi v29 inapowashwa kwa mara ya kwanza, na Zebra 6.x haiwezi kusoma v29, kwa hiyo hifadhi nakala ya `state/v28` kabla ya kusasisha. `zcashd` haina toleo la NU7 (toleo lake la hivi karibuni ni 6.20.0, la Juni 2026); mwongozo wa Zebra, [zcashd Mwongozo wa Uhamishaji wa API](https://zebra.zfnd.org/user/zcashd-api-migration-guide.html), unaonyesha ulinganifu wa kila RPC ya `zcashd` na Zebra, [Zallet](../zcash-tech/zallet) au mbadala wake. Tazama [Node Kamili](../zcash-tech/full-nodes) na mwongozo wa [Zebra wenye Usalama Imara](../guides/hardened-zebrad).
- **Pochi:** acha kujenga miamala ya v4, tumia muda chaguomsingi wa kuisha wa block 120, dumisha kina cha nanga cha block 3 (sasa takribani dakika 1.25) na ufuate vikomo vya vitendo kwa kila block. Muamala unaovunja kikomo peke yake hauwezi kamwe kuchimbwa.
- **Masoko ya kubadilishana sarafu na huduma za malipo:** sasa uthibitisho huchukua sekunde 25, kwa hiyo idadi ileile ya uthibitisho huchukua theluthi moja ya muda. Kagua tena idadi ya uthibitisho wa amana kulingana na muda na usalama unaouhitaji, badala ya kuhifadhi idadi ya zamani kwa mazoea.
- **Wachimbaji na mabwawa:** programu ya uchimbaji na violezo lazima vitumie ruzuku mpya, mgawanyo wa ada na vikomo vya vitendo; block zilizojengwa kwa kanuni za zamani hukataliwa.

## Makosa ya kawaida

- **“Node yangu ya zamani bado inafanya kazi, kwa hiyo haina tatizo.”** Kwa NU7 pekee, ZIP 259 iliondoa kanuni ya kawaida inayozima programu za kabla ya uboreshaji kabla ya kuwashwa. Zebra ya 6.x au node ya `zcashd` inaweza kubaki mtandaoni kwa kutumia kanuni za zamani na kujitenga kimyakimya na mnyororo halisi. Hakikisha node yako inaonyesha urefu unaozidi 3,543,405 na inalingana na kichunguzi cha block.
- **“Block za haraka zaidi zinamaanisha ZEC zaidi zinachapishwa.”** Hapana. Ruzuku kwa kila block ilipungua hadi theluthi moja, kwa hiyo utoaji wa kila siku haukubadilika.
- **“60% ya ada huchomwa milele.”** Hapana. Zinaondolewa kisha hutolewa tena kwa wachimbaji kupitia NSM; kikomo cha jumla ya sarafu hakijabadilika.
- **“Watumiaji wa Sprout pekee ndio walioathiriwa na mabadiliko ya v4.”** Pochi au hati yoyote ambayo bado inazalisha miamala ya v4, ikiwemo ya uwazi pekee na ya Sapling, iliacha kufanya kazi. Miamala ya v4 iliyokuwa inasubiri ikawa batili wakati wa kuwashwa, na kutia sahihi tena pekee hakuwezi kuifanya iwe halali.
- **“Mipangilio inayohesabiwa kwa idadi ya block inabaki vilevile.”** Kitu chochote kinachopimwa kwa block (uthibitisho, muda wa kuisha, nyakati za kufunga, muda wa kusubiri) sasa hupita mara tatu zaidi kwa muda halisi.

## Kamusi ya istilahi

| Istilahi | Maana kwa lugha rahisi |
|---|---|
| Block target spacing | Muda wa wastani kati ya block ambao marekebisho ya ugumu yanalenga: sekunde 25 tangu NU7 |
| Block subsidy | ZEC mpya inayoundwa katika kila block, na kugawanywa kati ya mchimbaji na njia za mfuko wa maendeleo |
| Shielded action | Kipimo kimoja cha kazi ya faragha katika muamala (kitendo cha Orchard au Ironwood, au ingizo au tokeo la Sapling) |
| Network Sustainability Mechanism (NSM) | Kanuni zinazoondoa sehemu ya ada kwenye mzunguko na kuzitoa tena kwa wachimbaji wa baadaye |
| NSM Value Balance | Jumla ya ZEC zilizoondolewa kwenye mzunguko na kusubiri kutolewa tena |
| Version 4 transaction | Muundo wa muamala wa Sapling, uliofanywa batili na NU7; v5 na v6 bado ni halali |
| Consensus branch ID | Nambari inayotambulisha seti ya kanuni za makubaliano; sahihi hujumuisha nambari hiyo, kwa hiyo muamala uliotiwa sahihi kwa kanuni za zamani ni batili chini ya kanuni mpya |

## Maswali yanayoulizwa mara kwa mara

**NU7 iliwashwa lini?** Katika block 3,543,405 ya Mainnet tarehe 6 Novemba 2026 saa 02:34 UTC. Testnet iliwashwa mapema zaidi, katika block 4,465,026 tarehe 4 Oktoba 2026.

**Je, zawadi ya block ilibadilika?** Kwa kila block, ndiyo: 0.52083333 ZEC badala ya 1.5625 ZEC. Kwa siku, hapana: takribani ZEC 1,800 kwa hali zote mbili.

**Je, Sprout yangu ya ZEC imepotea?** Haiwezi tena kuhamishwa, kwa sababu matumizi ya Sprout yanahitaji miamala ya v4 na sasa hiyo ni batili. Tazama [Kurejesha Fedha](../using-zcash/recovering-funds) ili kuelewa maana yake kwa vitendo.

**Je, ninahitaji pochi mpya?** Unahitaji toleo la pochi linalounga mkono NU7. Ukurasa wa ZecHub wa [Pochi](../using-zcash/wallets) unaonyesha pochi zinazooana na NU7.

**Utoaji upya wa ada utaanza lini?** Katika block 8,939,664 ya Mainnet, inayokadiriwa kuwa karibu Februari 2031 ikiwa wastani wa muda kati ya block utaendelea kuwa sekunde 25.

**Kwa nini NU7 iliruka muundo mpya wa muamala?** Ili kuzuia pochi na vichanganuzi kupitia uhamishaji wa pili mara tu baada ya muundo wa v6 wa Ironwood, na kwa sababu mgawanyo wa ada hukokotolewa kwa kila block, kwa hiyo sehemu mpya ya muamala haikuhitajika.

## Jipime

1. Kwa nini utoaji wa ZEC kwa siku hubaki vilevile baada ya NU7?
2. Nini hutokea kwa 60% ya ada zinazoondolewa kwenye mzunguko?
3. Kwa nini fedha za Sprout haziwezi kutumika baada ya NU7?
4. Kwa nini node ambayo haikuwahi kusasishwa ina hatari kubwa hasa katika uboreshaji huu?

Majibu: (1) ruzuku kwa kila block ilipunguzwa hadi theluthi moja huku block zikiongezeka mara tatu; (2) zinaingia kwenye Salio la Thamani la NSM na kutolewa tena kwa wachimbaji kuanzia block 8,939,664; (3) matumizi ya Sprout yapo tu katika muundo wa v4, ambao NU7 iliufanya kuwa batili; (4) ZIP 259 iliondoa uzimaji wa kiotomatiki, kwa hiyo node ya zamani inaweza kuendelea kufanya kazi kwenye mnyororo usio sahihi.

### Rasilimali

[ZIP 259: Utekelezaji wa NU7 Uboreshaji wa Mtandao](https://zips.z.cash/zip-0259)

[ZIP 218: Muda Lengwa wa Sekunde 25 Kati ya Block](https://zips.z.cash/zip-0218)

[ZIP 235: Ondoa 60% ya Ada za Miamala Kwenye Mzunguko](https://zips.z.cash/zip-0235)

[ZIP 237: Utaratibu wa Uendelevu wa Mtandao: Utoaji Unaohifadhi Kupunguzwa kwa Nusu](https://zips.z.cash/zip-0237)

[ZIP 2003: Kataza Miamala ya Toleo la 4](https://zips.z.cash/zip-2003)

[Zebra Maelezo ya toleo la 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0)

[Zcash Jukwaa la Jamii: NU7 Ratiba](https://forum.zcashcommunity.com/t/nu7-timeline/57655)

## Kurasa zinazohusiana

| Ukurasa | Sababu ya kuhusiana |
|---|---|
| [Ironwood](./Ironwood.md) | uboreshaji uliotangulia katika mfululizo huu, ambao ulitambulisha miamala ya v6 |
| [Mabadiliko Halisi ya Block za Sekunde 25](../research/what-25-second-blocks-actually-change) | uchunguzi wa kina zaidi kuhusu muda mfupi wa block |
| [Sprout](./Sprout.md) | bwawa ambalo NU7 lilifunga |
| [Kurejesha Fedha](../using-zcash/recovering-funds) | maana ya kufungia kwa Sprout kwa fedha za zamani |
| [Miamala](../using-zcash/transactions) | muda wa kuisha na uthibitisho baada ya NU7 |

---

Mfululizo: faharasa ya [Maboresho ya Mtandao](../start-here/network-upgrades) · Iliyotangulia: [Ironwood](../zcash-tech/ironwood)
