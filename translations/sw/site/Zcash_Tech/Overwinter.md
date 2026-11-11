<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Overwinter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Overwinter

> Overwinter ilianza kutumika kwenye mainnet ya Zcash katika block 347,500 (Juni 26, 2018 UTC).

Utakachojifunza: jinsi Zcash ilivyojifunza kubadilisha kanuni zake yenyewe kwa usalama, na kwa nini msingi huo uliwezesha kila uboreshaji uliofuata, kuanzia na Sapling.

Overwinter ni Zcash [uboreshaji wa mtandao](../start-here/network-upgrades) [network upgrade] wa kwanza baada ya mtandao kuanzishwa. Umefafanuliwa katika Mapendekezo kadhaa ya Uboreshaji ya Zcash: [ZIP 200](https://zips.z.cash/zip-0200), [ZIP 201](https://zips.z.cash/zip-0201), [ZIP 202](https://zips.z.cash/zip-0202), [ZIP 203](https://zips.z.cash/zip-0203), na [ZIP 143](https://zips.z.cash/zip-0143). Overwinter haikuongeza vipengele vipya vya faragha. Badala yake, iliimarisha itifaki ili maboresho ya baadaye yaweze kutolewa kwa usalama. Uboreshaji huo umeandikwa na [Electric Coin Company](../zcash-organizations/electric-coin-company) kwenye ukurasa rasmi wa maboresho wa Zcash.

Kwa nini hili ni muhimu. Kubadilisha kanuni za blockchain inayotumika ni hatari. Ukikosea, matoleo mawili ya mtandao yanaweza kutokubaliana, au muamala [transaction] uliokusudiwa kwa mnyororo [chain] mmoja unaweza kunakiliwa kwenye mwingine. Kabla ya Overwinter, Zcash haikuwa na njia ya kawaida iliyo salama dhidi ya urudiaji ya kuratibu mabadiliko ya kanuni. Overwinter ilirekebisha hilo. Iliipa Zcash mchakato rasmi wa maboresho na, muhimu vilevile, ulinzi wa urudiaji wa pande mbili, hivyo muamala ambao ni halali chini ya seti moja ya kanuni hauwezi kurudiwa chini ya nyingine. Msingi huo ndio uliowezesha Sapling, na kila uboreshaji baada yake, kuanzishwa bila matatizo.

![Before and after Overwinter: before, no standard upgrade path and no replay protection. After, a network upgrade mechanism with two-way replay protection and safe future upgrades](/content-images/overwinter-before-after-acf4f5d283.webp)

## Utaratibu wa uboreshaji

Overwinter ilianzisha Utaratibu wa Uboreshaji wa Mtandao, uliofafanuliwa katika [ZIP 200](https://zips.z.cash/zip-0200). Kila uboreshaji sasa hufafanua mambo mawili: kitambulisho cha tawi la makubaliano [consensus] kinachotaja seti ya sasa ya kanuni, na kimo cha uanzishaji, yaani block ambamo kanuni mpya zinaanza kutumika. Hii huwapa wote wanaoendesha programu ya Zcash muda wazi wa kusasisha kabla ya mabadiliko.

Overwinter yenyewe ilianza kutumika kwenye mainnet katika block 347,500.

[ZIP 201](https://zips.z.cash/zip-0201) hushughulikia jinsi node zinavyoshughulikia nyingine karibu na uboreshaji. Kabla ya uanzishaji, node hupendelea kuunganishwa na washirika wanaoendesha toleo lilelile. Wakati wa uanzishaji, node hukata muunganisho na washirika walio kwenye tawi tofauti la makubaliano, hivyo mtandao hugawanyika kwa uwazi kulingana na kanuni mpya badala ya kuchanganyikiwa.

## Ulinzi wa urudiaji

Urudiaji hutokea mtu anapochukua muamala uliokuwa halali kwenye mnyororo mmoja na kuutangaza tena kwenye mwingine. Overwinter hufunga uwezekano huo kwa mfumo mpya wa sahihi [signature], uliofafanuliwa katika [ZIP 143](https://zips.z.cash/zip-0143). Pochi [wallet] inapotia sahihi muamala, sahihi sasa huhusisha kitambulisho cha tawi la makubaliano cha mnyororo wa sasa. Muamala uliotiwa sahihi kwa tawi moja kwa urahisi si halali kwenye tawi lingine lolote, katika mwelekeo wowote. Hiyo ndiyo maana ya ulinzi wa urudiaji wa pande mbili.

Hili hufanya kazi sambamba na muundo mpya wa muamala wa toleo la 3 kutoka [ZIP 202](https://zips.z.cash/zip-0202), unaoitwa wakati mwingine muundo wa Overwintered. Unaongeza alama ya fOverwintered na kitambulisho cha kundi la toleo vinavyoweka wazi seti ya kanuni za makubaliano ambayo muamala unahusiana nayo. Kama faida ya ziada, mfumo mpya wa sahihi pia uliimarisha kasi ya uthibitishaji wa miamala ya uwazi [transparent].

![How replay protection works: a wallet signs a transaction that commits to the current consensus branch id, so the transaction cannot be replayed on any other branch](/content-images/overwinter-replay-flow-754ec8578a.webp)

## Kuisha kwa muda kwa muamala

[ZIP 203](https://zips.z.cash/zip-0203) iliongeza kuisha kwa muda kwa muamala. Muamala sasa unaweza kuweka kimo cha block cha kuisha muda. Ikiwa haujachimbwa kufikia kimo hicho, node huutoa kutoka mempool, chumba cha kusubiri cha miamala ambayo haijathibitishwa. Kabla ya hili, muamala ungeweza kukaa bila kuthibitishwa kwa muda mrefu. Kuisha kwa muda kunamaanisha muamala uliokwama hatimaye huondoka wenyewe, jambo linalopunguza kutokuwa na uhakika kwako na kuzuia mempool kujazwa na miamala ya zamani ambayo haijachimbwa.

## Nafasi yake

Overwinter ulikuwa uboreshaji wa kwanza wa mtandao wa Zcash baada ya uzinduzi wa mainnet wa Oktoba 2016, na ulitolewa kimakusudi kabla ya Sapling. Kazi yake ilikuwa miundombinu, si vipengele. Kwa kusakinisha utaratibu wa uboreshaji na mfumo wa ulinzi wa urudiaji kwanza, ulipa kila uboreshaji wa baadaye (Sapling, Blossom, Heartwood, Canopy, NU5, na ule uliofuata) njia salama ya kuanzishwa.

![Timeline from the October 2016 Sprout launch, through the 2016 to 2018 stretch with no upgrade framework, to Overwinter in June 2018](/content-images/overwinter-timeline-689d9bcf20.webp)

## Fahirisi ya istilahi

| Istilahi | Maana kwa lugha rahisi |
|---|---|
| Network upgrade (NU) | Mabadiliko yaliyoratibiwa kwa kanuni za makubaliano za Zcash, yanayoanzishwa katika kimo mahususi cha block |
| Consensus branch id | Kitambulisho kifupi kinachotaja seti ya sasa ya kanuni za makubaliano |
| Activation height | Block ambamo kanuni mpya za uboreshaji wa mtandao zinaanza kutumika |
| Replay protection | Kanuni inayozuia muamala halali kwenye mnyororo mmoja kutumika tena kwenye mwingine |
| Mempool | Bwawa [pool] la miamala iliyotangazwa lakini ambayo bado haijachimbwa kwenye block |
| Transaction expiry | Kimo cha block cha kuisha muda ambacho baada yake muamala ambao haujachimbwa huondolewa |

## Maswali yanayoulizwa mara kwa mara

Je, Overwinter ilibadilisha ZEC yangu au faragha yangu? Hapana. Overwinter haikuongeza vipengele vipya na haikugusa miamala ya faragha. Ilikuwa miundombinu ya maboresho salama ya baadaye. Fedha na faragha yako havikuathiriwa.

Je, Overwinter iliongeza Sapling au anwani za faragha? Hapana. Overwinter haikuongeza vipengele vya faragha. Iliandaa msingi ili Sapling iweze kuanzishwa kwa usalama baadaye.

Kitambulisho cha tawi la makubaliano ni nini? Ni lebo fupi inayotaja seti ya sasa ya kanuni. Miamala huihusisha inapotiwa sahihi, na hilo ndilo huipa Zcash ulinzi wake wa urudiaji.

Kwa nini vyanzo vingine vinasema Juni 25 na vingine Juni 26? Overwinter ilianza kutumika saa 01:37 UTC tarehe Juni 26, 2018. Hiyo ni baada kidogo ya saa sita usiku UTC, kwa hivyo katika maeneo mengi ya saa ya Magharibi saa za eneo bado zilionyesha Juni 25. Ni block ileile na wakati uleule.

Kuisha kwa muda kwa muamala kuna faida gani? Kunamaanisha kuwa muamala ambao hauchimbwi kamwe hautabaki kwa muda usio na kikomo. Baada ya kimo chake cha kuisha muda, node huutoa, hivyo hutabaki ukikisia kuhusu malipo yaliyokwama.

Je, ninahitaji kufanya chochote? Hapana. Overwinter ilianza kutumika mwaka 2018. Pochi au node yoyote ya sasa ya Zcash tayari hufuata kanuni hizi.

## Pima uelewa wako

Overwinter haikuongeza vipengele vipya vya faragha. Basi kwa nini inachukuliwa kuwa mojawapo ya maboresho muhimu zaidi katika historia ya Zcash?

<details>
<summary>Jibu</summary>

Kwa sababu ilijenga mfumo ambao kila uboreshaji wa baadaye unautegemea. Overwinter ilianzisha Utaratibu wa Uboreshaji wa Mtandao na ulinzi wa urudiaji wa pande mbili, ikiipa Zcash njia ya kawaida na salama ya kubadilisha kanuni zake za makubaliano. Bila msingi huo, Sapling na maboresho yaliyofuata yasingeweza kuanzishwa bila matatizo.
</details>

### Rasilimali

[ZIP 200: Utaratibu wa Uboreshaji wa Mtandao](https://zips.z.cash/zip-0200)

[ZIP 201: Usimamizi wa Washirika wa Mtandao kwa Overwinter](https://zips.z.cash/zip-0201)

[ZIP 202: Muundo wa Muamala wa Toleo la 3 kwa Overwinter](https://zips.z.cash/zip-0202)

[ZIP 203: Kuisha kwa Muda kwa Muamala](https://zips.z.cash/zip-0203)

[ZIP 143: Uthibitishaji wa Sahihi ya Muamala kwa Overwinter](https://zips.z.cash/zip-0143)

[Overwinter Uboreshaji wa Mtandao](https://z.cash/upgrade/overwinter/)

### Tazama pia

[Maboresho ya Mtandao wa Zcash](../start-here/network-upgrades)

[Mabwawa ya Faragha](../using-zcash/shielded-pools)

[Full Nodes](../zcash-tech/full-nodes)

[NU6.1](../zcash-tech/nu6-1)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

[Je, ZEC ni nini na Zcash](../start-here/what-is-zec-and-zcash)

---

Mfululizo: [Faharasa ya Maboresho ya Mtandao](../start-here/network-upgrades) · Iliyotangulia: [Sprout](../zcash-tech/sprout) · Inayofuata: [Sapling](../zcash-tech/sapling)
