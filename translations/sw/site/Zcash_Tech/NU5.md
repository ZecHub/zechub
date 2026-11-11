<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU5.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Hariri ukurasa"/>
</a>

# NU5

> NU5 ilianza kutumika kwenye mainnet ya Zcash katika block 1,687,104 (Mei 31, 2022 UTC).

Utakachojifunza: jinsi NU5 ilivyoipa Zcash bwawa jipya la faragha [shielded pool] lisilohitaji usanidi unaoaminika, pamoja na aina moja ya anwani inayofanya kazi katika mabwawa mbalimbali.

NU5 (Uboreshaji wa Mtandao 5) ni uboreshaji wa sita wa mtandao wa Zcash [](../start-here/network-upgrades), uliotekelezwa na [ZIP 252](https://zips.z.cash/zip-0252). Ni uboreshaji mkubwa wa kriptografia. Ulianzisha itifaki ya malipo ya faragha ya Orchard, iliyojengwa kwa mfumo wa uthibitishaji wa Halo 2, pamoja na Anwani Zilizounganishwa na umbizo jipya la muamala la toleo la 5. NU5 ilitolewa katika toleo la v5.0.0 la Electric Coin Company la zcashd.

Kwa nini hili ni muhimu. Bwawa la faragha linaaminika tu kadiri usanidi uliolitengeneza unavyoaminika. Mabwawa mawili ya kwanza ya faragha ya Zcash, Sprout na Sapling, kila moja lilihitaji sherehe ya mara moja ya usanidi unaoaminika ili kutengeneza vigezo vyake vya siri. Kama vigezo hivyo vingehifadhiwa badala ya kuharibiwa, mtu angeweza kutengeneza ZEC bandia bila mtu yeyote kutambua. Bwawa la Orchard la NU5 linaondoa wasiwasi huo kwa kutumia mfumo wa uthibitishaji wa Halo 2, ambao hauhitaji sherehe kama hiyo.

## Usanidi unaoaminika

Orchard ni itifaki ya faragha iliyoanzishwa na NU5, iliyofafanuliwa katika [ZIP 224](https://zips.z.cash/zip-0224). Imejengwa kwa mfumo wa uthibitishaji wa Halo 2, unaotumia mbinu iitwayo arithmetization ya PLONKish kwenye mzunguko wa mikunjo ya Pallas na Vesta. Faida ya kiutendaji ni rahisi: Halo 2 haihitaji usanidi unaoaminika wala mfuatano wa marejeleo uliopangwa, hivyo hakuna kigezo cha siri kinachoweza kutumika vibaya.

Sprout na Sapling zote zilitegemea usanidi unaoaminika. Kundi la watu lilifanya sherehe ili kujenga vigezo vya kila bwawa, na kila mtu alipaswa kuamini kuwa angalau mmoja wao aliharibu sehemu yake ya siri. Orchard linaondoa dhana hiyo. Mabwawa ya zamani bado yapo baada ya NU5, kwa hiyo dhamana ya kutohitaji usanidi inatumika kwa fedha unazoshikilia katika bwawa la Orchard.

![Before NU5, Sprout and Sapling needed a trusted setup ceremony. After NU5, the Orchard pool uses the Halo 2 system and needs no trusted setup](/content-images/nu5-trusted-setup-5447dbe3f2.webp)

## Mabadiliko yaliyofanywa na NU5

NU5 huunganisha mabadiliko kadhaa ya makubaliano, yote yakianzishwa pamoja katika block 1,687,104.

1. Iliongeza bwawa la faragha la Orchard (ZIP 224), itifaki inayotegemea Halo 2 iliyoelezwa hapo juu.
2. Iliongeza umbizo la muamala la toleo la 5 (ZIP 225), mpangilio ulioundwa upya wenye maeneo tofauti ya data ya uwazi, Sapling, na Orchard mpya. Sehemu za Sprout ziliondolewa, na umbizo la zamani la toleo la 4 lilibaki halali baada ya uanzishaji.
3. Ilianzisha Anwani Zilizounganishwa na funguo za kutazama zilizounganishwa (ZIP 316), zinazofafanuliwa katika sehemu inayofuata.
4. Ilikubali kutoweza kubadilishwa kwa kitambulishi cha muamala (ZIP 244), njia mpya ya kukokotoa kitambulisho cha muamala inayotenganisha kile ambacho muamala hufanya na mathibitisho na sahihi zinazoidhinisha muamala huo.
5. Ilikubali usimbaji wa kanoni wa nukta za Jubjub (ZIP 216) ili kuondoa usimbaji usio wa kawaida na kuimarisha kanuni za kile kinachohesabika kama muamala halali.
6. Iliwezesha usambazaji wa miamala ya toleo la 5 katika mtandao wa rika-kwa-rika (ZIP 239).

NU5 pia ilisasisha ZIP kadhaa zilizopo (32, 203, 209, 212, 213, 221, na 401) ili zizingatie bwawa jipya la Orchard.

## Anwani Zilizounganishwa

Kabla ya NU5, kila bwawa lilikuwa na aina yake ya anwani, na mtumaji alipaswa kujua aina uliyotaka. Anwani Zilizounganishwa, zilizofafanuliwa katika [ZIP 316](https://zips.z.cash/zip-0316), zinabadilisha hali hiyo. Anwani moja Iliyounganishwa inaweza kuunganisha vipokezi vya mabwawa zaidi ya moja, hivyo pochi ya mtumaji huchagua tu iliyo bora zaidi inayounga mkono.

![A unified address bundles receivers for several pools: a transparent receiver, a Sapling receiver, and a new Orchard receiver](/content-images/nu5-unified-address-6e2c84f66e.webp)

Funguo za kutazama zilizounganishwa hufanya kazi kwa njia hiyo hiyo kwa ajili ya kutazama. Hutoa uwezo wa kusoma pekee katika mabwawa yanayofunikwa na anwani. Kwa maelezo zaidi kuhusu hilo, tazama ukurasa wa [Funguo za kutazama](../zcash-tech/viewing-keys).

## Nafasi ya NU5

NU5 ilifuata maboresho ya awali ya Zcash: Overwinter, Sapling, Blossom, Heartwood, na Canopy. Ilianzishwa kwenye mainnet tarehe Mei 31, 2022. Mzunguko wa mikunjo wa Orchard ulichaguliwa kwa sababu unaunga mkono urejeleaji, ambao ni msingi wa kazi za baadaye za kupanua uwezo. NU5 ni mtangulizi wa moja kwa moja wa mstari wa maboresho wa NU6 na NU6.x, ambao ulijengwa juu ya bwawa la Orchard na baadaye kulirekebisha.

## Fahirisi ya istilahi

| Istilahi | Maana kwa lugha rahisi |
|---|---|
| Network upgrade (NU) | Mabadiliko yaliyoratibiwa kwa kanuni za makubaliano za Zcash, yanayoanzishwa katika urefu maalumu wa block |
| Orchard | Bwawa la faragha lililoanzishwa na NU5, lililojengwa kwa mfumo wa uthibitishaji wa Halo 2 |
| Halo 2 | Mfumo wa uthibitishaji unaotumika na Orchard ambao hauhitaji usanidi unaoaminika |
| Trusted setup | Sherehe ya mara moja inayotengeneza vigezo vya siri vya bwawa na ambayo lazima iaminke kwamba vigezo hivyo vitaharibiwa |
| Unified Address | Anwani moja inayoweza kuunganisha vipokezi vya mabwawa zaidi ya moja (ZIP 316) |
| Consensus branch id | Kitambulishi kinachoonyesha seti ya kanuni ambayo muamala ni sehemu yake |

## Maswali yanayoulizwa mara kwa mara

Je, NU5 hubadilisha ZEC yangu au faragha yangu? Hapana. NU5 iliongeza bwawa jipya la faragha na umbizo jipya la anwani. ZEC yako iliyopo haiathiriki, na faragha yako haipunguzwi. Kuhamisha fedha hadi Orchard hukupa bwawa lisilohitaji usanidi unaoaminika.

Orchard ni nini? Orchard ni itifaki ya faragha ya Zcash iliyoanzishwa na NU5. Inatumia mfumo wa uthibitishaji wa Halo 2, hivyo haihitaji sherehe ya usanidi unaoaminika.

Je, ninapaswa kufanya chochote? Hapana. Pochi inayoungwa mkono hushughulikia NU5 kwa ajili yako. Unaweza kuendelea kutumia anwani za zamani, na unaweza kuanza kutumia Anwani Zilizounganishwa wakati pochi yako inapozitoa.

Anwani Iliyounganishwa ni nini? Ni anwani moja inayoweza kuwa na vipokezi vya mabwawa zaidi ya moja. Pochi ya mtumaji huchagua bwawa linaloliunga mkono, hivyo huhitaji kutoa anwani tofauti kwa kila aina.

Je, NU5 huondoa usanidi unaoaminika kutoka kwenye fedha zangu za zamani? Si kwa athari ya nyuma. Orchard haihitaji usanidi unaoaminika, lakini vigezo vya awali vya bwawa la Sapling bado vipo baada ya NU5. Dhamana ya kutohitaji usanidi inatumika kwa fedha zinazoshikiliwa katika bwawa la Orchard.

Je, umbizo la zamani la muamala liliacha kufanya kazi? Hapana. NU5 iliongeza umbizo la toleo la 5, na umbizo la zamani la toleo la 4 lilibaki halali baada ya uanzishaji.

## Jaribu uelewa wako

Sprout na Sapling zote zilihitaji sherehe ya usanidi unaoaminika. Bwawa la Orchard la NU5 lilibadilisha nini kuhusu hilo, na kwa nini ni muhimu?

<details>
<summary>Jibu</summary>

Orchard imejengwa kwa mfumo wa uthibitishaji wa Halo 2, ambao hauhitaji usanidi unaoaminika wala mfuatano wa marejeleo uliopangwa. Hilo linaondoa hatari kwamba vigezo vya siri vilivyosalia vinaweza kutumiwa kutengeneza ZEC bandia. Dhamana hiyo inatumika kwa fedha zinazoshikiliwa katika bwawa la Orchard. Vigezo vya zamani vya Sapling bado vipo baada ya NU5.
</details>

### Rasilimali

[ZIP 252: Utekelezaji wa Uboreshaji wa Mtandao wa NU5](https://zips.z.cash/zip-0252)

[ZIP 224: Itifaki ya Faragha ya Orchard](https://zips.z.cash/zip-0224)

[ZIP 225: Umbizo la Muamala la Toleo la 5](https://zips.z.cash/zip-0225)

[ZIP 316: Anwani Zilizounganishwa na Funguo za Kutazama Zilizounganishwa](https://zips.z.cash/zip-0316)

[Uboreshaji wa Mtandao 5](https://z.cash/upgrade/nu5/)

[Electric Coin Company: Toleo la 5.0.0 la zcashd](https://electriccoin.co/blog/new-release-5-0-0/)

### Tazama pia

[Maboresho ya Mtandao wa Zcash](../start-here/network-upgrades)

[Mabwawa ya Faragha](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Funguo za kutazama](../zcash-tech/viewing-keys)

[NU6.1](../zcash-tech/nu6-1)

---

Mfululizo: [Faharasa ya Maboresho ya Mtandao](../start-here/network-upgrades) · Iliyotangulia: [Canopy](../zcash-tech/canopy) · Inayofuata: [NU6](../zcash-tech/nu6)
