<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU7.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# NU7

> NU7 iliwashwa kwenye Mainnet ya Zcash katika block 3,543,405 mnamo Novemba 6, 2026 (02:34 UTC; jioni ya Novemba 5 katika maeneo ya saa ya Marekani), na limekuwa likifanya kazi tangu wakati huo.

Utajifunza: mabadiliko yaliyofanywa na NU7 (block za haraka zaidi, vikomo vya vitendo vya faragha, urejeshaji wa ada, na mwisho wa miamala ya toleo la 4), mambo ambayo haikubadilisha, na hatua ambazo waendeshaji wa node, pochi, masoko ya kubadilishana sarafu na wachimbaji walipaswa kuchukua.

NU7 ni uboreshaji wa mtandao Zcash [](../start-here/network-upgrades), uliotekelezwa na [ZIP 259](https://zips.z.cash/zip-0259). Ulipunguza muda kati ya block kutoka sekunde 75 hadi sekunde 25, ukaweka kikomo cha idadi ya vitendo vya faragha vinavyoweza kuwa kwenye block moja, ukaanza kuondoa 60% ya ada za miamala kwenye mzunguko ili zitolewe tena kwa wachimbaji wa baadaye, na kufanya miamala ya toleo la 4 kuwa batili, jambo lililostaafisha bwawa la zamani la Sprout. Haukuleta muundo mpya wa muamala. Kitambulisho cha tawi lake la makubaliano ni `0x77190ad9`.

Kwa nini hili ni muhimu. Kabla ya NU7, ulisubiri wastani wa sekunde 75 ili kupata uthibitisho wa kwanza, jambo lililo polepole kwa kaunta ya duka, amana kwenye soko la kubadilishana sarafu au ubadilishaji wa cross-chain. NU7 ilipunguza muda huo hadi takriban sekunde 25 bila kutoa ZEC zaidi: zawadi kwa kila block ilipunguzwa hadi theluthi moja, kwa hiyo utoaji wa kila siku ulibaki vilevile. Pia huu ndio uboreshaji wa kwanza unaoongeza utaratibu unaolenga kulipia usalama wa mtandao baada ya zawadi za block kupungua.

Je, wewe ni mgeni katika Zcash? Anza na [Zcash ni niniZEC na Zcash](../start-here/what-is-zec-and-zcash) na [Mabwawa ya Faragha](../using-zcash/shielded-pools), kisha urudi hapa.

## Kwa kifupi

Kwa lugha rahisi: block sasa huwasili kila baada ya sekunde 25, kiasi cha ZEC kipya kwa siku kinabaki vilevile, sehemu ya kila ada huwekwa kwa ajili ya wachimbaji wa baadaye, na bwawa la zamani la Sprout limefungwa.

- **Block za sekunde 25** ([ZIP 218](https://zips.z.cash/zip-0218)): uthibitisho wa kwanza hupatikana baada ya takriban sekunde 25 badala ya 75. Ruzuku ya block ilipungua kutoka 1.5625 hadi 0.52083333 ZEC, kwa hiyo takriban 1,800 ZEC bado hutolewa kwa siku.
- **Vikomo vya vitendo vya faragha** (ZIP 218): kiwango cha juu ni vitendo 330 vya faragha kwa kila block katika mabwawa yote, kukiwa na vikomo vya kila bwawa, ili gharama za uthibitishaji wa block katika hali mbaya zaidi na usawazishaji wa pochi ziwe chini ya zile za awali.
- **Utaratibu wa Uendelevu wa Mtandao** ([ZIP 235](https://zips.z.cash/zip-0235) + [ZIP 237](https://zips.z.cash/zip-0237)): 60% ya ada za miamala za kila block huondolewa kwenye mzunguko na kutolewa tena kwa wachimbaji baadaye, kuanzia block 8,939,664 (inayokadiriwa kuwa karibu Februari 2031). Kikomo cha jumla ya sarafu milioni 21 hakijabadilika.
- **Miamala ya toleo la 4 ni batili** ([ZIP 2003](https://zips.z.cash/zip-2003)): pochi lazima zitengeneze miamala ya v5 au v6. Sprout inaweza kutumika tu kwa v4, kwa hiyo fedha ambazo bado ziko ndani ya Sprout sasa zimefungiwa.
- **Programu**: [Zebra 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0) na matoleo ya baadaye hufuata NU7. Hakuna toleo la `zcashd` lenye usaidizi wa NU7.

## Mfano wa kuona

Fikiria mnyororo kama njia ya treni. Kabla ya NU7, treni iliondoka kila baada ya sekunde 75 na ingeweza kubeba abiria wengi kadiri walivyotoshea ndani ya MB 2. NU7 huendesha treni kila baada ya sekunde 25, humpa kila dereva theluthi moja ya nauli ya zamani ili jumla ya kila siku ibaki vilevile, na huweka kikomo cha idadi ya abiria wazito zaidi (vitendo vya faragha) wanaoweza kupanda treni moja, ili ukaguzi wa treni yoyote usichukue muda mrefu kupita kiasi.

![NU7 in four panels: blocks are three times faster and new ZEC per day stays the same; 60% of fees go into a public reserve for rewards from 2031; the legacy Sprout pool from 2016 can no longer be spent; 98.9% of voting ZEC chose to keep halvings](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu7-four-changes.png)

## Mabadiliko yaliyofanywa na NU7

### Muda lengwa wa sekunde 25 kati ya block (ZIP 218)

- Marekebisho ya ugumu sasa yanalenga block moja kila **sekunde 25** badala ya 75, kwa hiyo block huwasili mara tatu zaidi.
- Ruzuku ya block iligawanywa kwa tatu: **0.52083333 ZEC** kwa block katika kipindi cha sasa cha kupunguzwa kwa nusu (awali ilikuwa 1.5625 ZEC). Utoaji wa kila siku unabaki takriban 1,800 ZEC (block 3,456 kwa siku badala ya 1,152).
- Kupunguzwa kwa nusu bado hutokea kila baada ya miaka minne. Kwa sababu block ni za haraka zaidi, kupunguzwa kwa nusu kunakofuata kulihamishwa hadi block **6,132,390**, inayokadiriwa kutokea mwishoni mwa Novemba 2028 kwa muda wa sekunde 25 kati ya block (ZIP 259).
- Kipindi cha wastani wa ugumu kiliongezwa kutoka block 17 hadi **102**, kwa hiyo marekebisho bado huangalia kipindi cha muda kinachokaribiana na kile cha awali.
- Muda chaguomsingi wa kuisha kwa muamala uliongezwa kutoka block 40 hadi **120**, jambo linalouweka katika takriban dakika 50.

### Vikomo vya vitendo vya faragha (ZIP 218)

Kila block sasa ina bajeti ya pamoja na vikomo vya kila bwawa:

| Kikomo | Kwa kila block |
|---|---|
| Vitendo vyote vya faragha katika mabwawa yote | 330 |
| Vitendo vya Orchard | 330 |
| Vitendo vya Ironwood | 330 |
| Ingizo + matokeo ya Sapling | 300 |
| Sprout JoinSplits | Hakuna kinachoruhusiwa |

Kabla ya NU7, block kamili ya MB 2 ingeweza kuwa na takriban Orchard 617 au vitendo vya Ironwood, au matokeo ya Sapling takriban 2,107, bila vikomo vya kila bwawa. ZIP 218 huweka vikomo vipya ili, hata kukiwa na block mara tatu zaidi, hali mbaya zaidi kwa node na kwa usawazishaji wa pochi iwe bora kuliko hapo awali (kwa mfano, kipimo cha juu cha data ya usawazishaji wa faragha cha light client hupungua kutoka takriban MB 271 hadi 169 kwa siku), huku upitishaji wa itifaki ya Orchard ukiongezeka zaidi ya mara mbili (kutoka takriban miamala 2.9 hadi 6.6 kwa sekunde kwa miamala ya vitendo 2).

### Utaratibu wa Uendelevu wa Mtandao (ZIP 235 + ZIP 237)

- **Kuondoa ada (ZIP 235):** 60% ya ada za miamala katika kila block huondolewa kwenye mzunguko; 40% iliyobaki huenda kwa mchimbaji kama awali. Tofauti na uchomaji, ZEC zilizoondolewa hufuatiliwa ili ziweze kutolewa tena baadaye.
- **Kutolewa tena (ZIP 237):** ZEC zilizoondolewa huhifadhiwa katika hali ya makubaliano ya umma inayoitwa Salio la Thamani la NSM. Salio hilo lilianzishwa kwenye NU7 kwa thamani ambayo wachimbaji hawakudai hapo awali. Kuanzia block **8,939,664** (inayokadiriwa kuwa karibu Februari 2031), kila block hutoa sehemu maalum ya salio hilo juu ya ratiba ya kawaida ya kupunguzwa kwa nusu.
- Kikomo cha jumla ya sarafu hakiongezeki. Salio linapokuwa sifuri, utoaji hufuata ratiba ya zamani ya kupunguzwa kwa nusu kikamilifu.
- NU7 haikutekeleza **[ZIP 233](https://zips.z.cash/zip-0233)** (uondoaji wa hiari unaofanywa na watumiaji) au **[ZIP 234](https://zips.z.cash/zip-0234)** (kubadilisha kupunguzwa kwa nusu na mkondo laini). Kura za wamiliki wa sarafu zilichagua muundo unaodumisha kupunguzwa kwa nusu katika ZIP 237.
- Nambari (salio la mwanzo la 368.58 ZEC, sehemu ya salio inayotolewa tena kwa kila block, na sababu ya kuanza kwenye block 8,939,664) zimeelezwa kwenye ukurasa wa [Utaratibu wa Uendelevu wa Mtandao](./Network_Sustainability_Mechanism.md).

### Kutoidhinisha miamala ya toleo la 4 (ZIP 2003)

- Kuanzia NU7 na kuendelea, kila muamala wa toleo la 4 ni batili: si uhamisho wa Sprout pekee, bali pia miamala ya uwazi pekee na ya Sapling iliyoundwa katika muundo wa v4. Miamala ya toleo la 5 (NU5) na toleo la 6 ([Ironwood](../zcash-tech/ironwood)) haijabadilika.
- Uhamisho wa Sprout upo katika muundo wa v4 pekee, kwa hiyo bwawa la [Sprout](../zcash-tech/sprout) haliwezi tena kutumiwa. Tazama [Kurejesha Fedha](../using-zcash/recovering-funds).

### Mambo madogo zaidi

- Marekebisho ya kanuni za mfuko wa maendeleo ili mikondo ya ufadhili iendane na block za sekunde 25 ([ZIP 207](https://zips.z.cash/zip-0207) Marekebisho ya 2, [ZIP 214](https://zips.z.cash/zip-0214) Marekebisho ya 3), na sasisho la orodha ya anwani za mikondo ya ufadhili ([ZIP 2008](https://zips.z.cash/zip-2008)).
- Node za NU7 hutangaza toleo la itifaki ya mtandao **170190** kwenye Mainnet na hukata muunganisho wa node za zamani baada ya kuwezeshwa.

## Mambo ambayo NU7 haikufanya

- **Hakuna muundo mpya wa muamala.** NU7 iliepuka kwa makusudi uhamishaji mwingine wa pochi na kichanganuzi mara tu baada ya Ironwood kuleta miamala ya v6.
- **Hakuna mabadiliko katika kikomo cha jumla ya sarafu au mzunguko wa miaka minne wa kupunguzwa kwa nusu.**
- **Hakuna mabadiliko katika muda wa kusubiri wa coinbase.** Sarafu zilizochimbwa bado zinahitaji block 100 kabla ya kutumiwa (sasa takriban dakika 42 badala ya saa 2).
- **Hakuna bwawa jipya la faragha.** Ironwood (NU6.3) bado ndilo bwawa jipya zaidi; Orchard hubaki la matumizi pekee, kama lilivyokuwa tangu Ironwood.

## Hatua zilizohitajika kwa kila kundi

- **Waendeshaji wa node:** tumieni [Zebra 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0) au toleo jipya zaidi. Zebra 7 huhamisha hifadhidata yake kutoka umbizo la v28 hadi v29 inapoanzishwa kwa mara ya kwanza, na Zebra 6.x haiwezi kusoma v29, kwa hiyo hifadhi nakala ya `state/v28` kabla ya kusasisha. `zcashd` haina toleo la NU7 (toleo lake jipya zaidi ni 6.20.0, la Juni 2026); mwongozo wa uhamishaji wa API wa Zebra[zcashd](https://zebra.zfnd.org/user/zcashd-api-migration-guide.html) unaonyesha ulinganifu wa kila RPC ya `zcashd` na Zebra, [Zallet](../zcash-tech/zallet) au mbadala wake. Tazama [Node Kamili](../zcash-tech/full-nodes) na mwongozo wa [Zebra Imara](../guides/hardened-zebrad).
- **Pochi:** acheni kutengeneza miamala ya v4, tumieni muda chaguomsingi wa kuisha wa block 120, dumisheni kina cha block 3 cha anchor (sasa takriban dakika 1.25) na heshimuni vikomo vya vitendo kwa kila block. Muamala unaovunja kikomo peke yake hauwezi kuchimbwa kamwe.
- **Masoko ya kubadilishana sarafu na huduma za malipo:** uthibitisho sasa huchukua sekunde 25, kwa hiyo idadi ileile ya uthibitisho inajumuisha theluthi moja ya muda wa awali. Kagua tena idadi ya uthibitisho wa amana kulingana na muda na usalama mnaoutaka, badala ya kushikilia idadi ya zamani kwa mazoea.
- **Wachimbaji na mabwawa:** programu za uchimbaji na violezo lazima vitumie ruzuku mpya, mgawanyo wa ada na vikomo vya vitendo; block zinazoundwa kwa kanuni za zamani hukataliwa.

## Makosa ya kawaida

- **“Node yangu ya zamani bado inaendeshwa, kwa hiyo hakuna tatizo.”** Kwa NU7 pekee, ZIP 259 iliondoa kanuni ya kawaida iliyozima yenyewe programu ya kabla ya uboreshaji kabla ya kuwezeshwa. Zebra 6.x au node ya `zcashd` inaweza kubaki mtandaoni kwa kutumia kanuni za zamani na kuachana kimyakimya na mnyororo halisi. Hakikisha node yako inaonyesha urefu ulio juu ya 3,543,405 na inalingana na kichunguzi cha block.
- **“Block za haraka zaidi zinamaanisha ZEC zaidi hutolewa.”** Hapana. Ruzuku kwa kila block ilipungua hadi theluthi moja, kwa hiyo utoaji wa kila siku haujabadilika.
- **“60% ya ada huchomwa milele.”** Hapana. Huondolewa na kutolewa tena kwa wachimbaji baadaye kupitia NSM; kikomo cha jumla ya sarafu hakijabadilika.
- **“Watumiaji wa Sprout pekee ndio wameathiriwa na mabadiliko ya v4.”** Pochi au script yoyote ambayo bado inazalisha miamala ya v4, ikiwemo ile ya uwazi pekee na ya Sapling, ilisimama kufanya kazi. Miamala ya v4 iliyokuwa inasubiri ilibatilika wakati wa kuwezeshwa, na kusaini upya pekee hakuwezi kuifanya iwe halali.
- **“Mipangilio ya idadi ya block itaendelea kuwa vilevile.”** Kipimo chochote kinachotumia idadi ya block (uthibitisho, muda wa kuisha, muda wa kufunga, muda wa kusubiri) sasa hupita mara tatu kwa kasi zaidi katika muda halisi.

## Istilahi

| Istilahi | Maana kwa lugha rahisi |
|---|---|
| Block target spacing | Muda wa wastani kati ya block unaolengwa na marekebisho ya ugumu: sekunde 25 tangu NU7 |
| Block subsidy | ZEC mpya zinazoundwa katika kila block na kugawanywa kati ya mchimbaji na mikondo ya mfuko wa maendeleo |
| Shielded action | Kipimo kimoja cha kazi ya faragha ndani ya muamala (kitendo cha Orchard au Ironwood, au ingizo au tokeo la Sapling) |
| Network Sustainability Mechanism (NSM) | Kanuni zinazoondoa sehemu ya ada kwenye mzunguko na kuzitoa tena kwa wachimbaji wa baadaye |
| NSM Value Balance | Jumla ya ZEC zilizoondolewa kwenye mzunguko na kusubiri kutolewa tena |
| Version 4 transaction | Muundo wa muamala kutoka Sapling, ambao NU7 iliufanya kuwa batili; v5 na v6 bado ni halali |
| Consensus branch ID | Nambari inayotambua seti ya kanuni za makubaliano; sahihi hujifunga nazo, kwa hiyo muamala uliosainiwa kwa kanuni za zamani ni batili chini ya kanuni mpya |

## Maswali yanayoulizwa mara kwa mara

**NU7 iliwashwa lini?** Kwenye block 3,543,405 ya Mainnet mnamo Novemba 6, 2026 saa 02:34 UTC. Testnet iliwashwa mapema zaidi, kwenye block 4,465,026 mnamo Oktoba 4, 2026.

**Je, zawadi ya block ilibadilika?** Kwa kila block, ndiyo: 0.52083333 ZEC badala ya 1.5625 ZEC. Kwa siku, hapana: takriban 1,800 ZEC kwa vyovyote vile.

**Je, Sprout yangu ya ZEC imepotea?** Haiwezi tena kuhamishwa, kwa sababu matumizi ya Sprout yanahitaji miamala ya v4 na hiyo sasa ni batili. Tazama [Kurejesha Fedha](../using-zcash/recovering-funds) ili kuelewa maana yake kwa vitendo.

**Je, ninahitaji pochi mpya?** Unahitaji toleo la pochi linalotumia NU7. Ukurasa wa ZecHub[Pochi](../using-zcash/wallets) unaonyesha pochi zinazooana na NU7.

**Kutolewa tena kwa ada kutaanza lini?** Kwenye block 8,939,664 ya Mainnet, inayokadiriwa kuwa karibu Februari 2031 ikiwa wastani wa muda kati ya block utaendelea kuwa sekunde 25.

**Kwa nini NU7 iliruka muundo mpya wa muamala?** Ili kuzuia pochi na vichanganuzi kufanya uhamishaji wa pili mara tu baada ya muundo wa v6 wa Ironwood, na kwa sababu mgawanyo wa ada huhesabiwa kwa kila block, kwa hiyo hakukuwa na haja ya sehemu mpya ya muamala.

## Jaribu kuelewa kwako

1. Kwa nini utoaji wa ZEC kwa siku unabaki vilevile baada ya NU7?
2. Ni nini hutokea kwa 60% ya ada zinazoondolewa kwenye mzunguko?
3. Kwa nini fedha za Sprout haziwezi kutumiwa baada ya NU7?
4. Kwa nini node ambayo haikuwahi kusasishwa ina hatari kubwa hasa katika uboreshaji huu?

Majibu: (1) ruzuku kwa kila block ilipunguzwa hadi theluthi moja huku block zikiwa mara tatu zaidi; (2) huingia kwenye Salio la Thamani la NSM na kutolewa tena kwa wachimbaji kuanzia block 8,939,664; (3) matumizi ya Sprout yapo katika muundo wa v4 pekee, ambao NU7 iliufanya kuwa batili; (4) ZIP 259 iliondoa uzimaji wa kiotomatiki, kwa hiyo node ya zamani inaweza kuendelea kufanya kazi kwenye mnyororo usio sahihi.

### Vyanzo

[ZIP 259: Utekelezaji wa Uboreshaji wa Mtandao wa NU7](https://zips.z.cash/zip-0259)

[ZIP 218: Muda Lengwa wa Sekunde 25 Kati ya Block](https://zips.z.cash/zip-0218)

[ZIP 235: Ondoa 60% ya Ada za Miamala Kwenye Mzunguko](https://zips.z.cash/zip-0235)

[ZIP 237: Utaratibu wa Uendelevu wa Mtandao: Utoaji Unaodumisha Kupunguzwa kwa Nusu](https://zips.z.cash/zip-0237)

[ZIP 2003: Kutoidhinisha Miamala ya Toleo la 4](https://zips.z.cash/zip-2003)

[Zebra Maelezo ya toleo la 7.0.0](https://github.com/ZcashFoundation/zebra/releases/tag/v7.0.0)

[Zcash Jukwaa la Jumuiya: NU7 Ratiba](https://forum.zcashcommunity.com/t/nu7-timeline/57655)

## Kurasa zinazohusiana

| Ukurasa | Sababu ya uhusiano |
|---|---|
| [Ironwood](./Ironwood.md) | uboreshaji uliotangulia katika mfululizo, ulioleta miamala ya v6 |
| [Mabadiliko Halisi Yanayosababishwa na Block za Sekunde 25](../research/what-25-second-blocks-actually-change) | uchambuzi wa kina zaidi kuhusu muda mfupi zaidi wa block |
| [Utaratibu wa Uendelevu wa Mtandao](./Network_Sustainability_Mechanism.md) | jinsi uondoaji na utoaji tena wa ada NU7 ulioamilishwa unavyofanya kazi, pamoja na nambari |
| [Sprout](./Sprout.md) | bwawa NU7 lililoondolewa |
| [Kurejesha Fedha](../using-zcash/recovering-funds) | maana ya kufungiwa kwa Sprout kwa fedha za zamani |
| [Miamala](../using-zcash/transactions) | muda wa kuisha na uthibitisho baada ya NU7 |

---

Mfululizo: faharasa ya [Maboresho ya Mtandao](../start-here/network-upgrades) · Iliyotangulia: [Ironwood](../zcash-tech/ironwood)
