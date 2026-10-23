<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU5.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# NU5

> NU5 ilianza kuonekana kwenye mtandao mkuu wa Zcash katika kitalu namba 1,687,104 (Mei 31, 2022 UTC).

Utakachochukua: jinsi NU5 ilivyompa Zcash bwawa jipya lililolindwa ambalo halihitaji usanidi unaoaminika, pamoja na aina moja ya anwani inayofanya kazi katika mabwawa yote.

NU5 (Uboreshaji wa Mtandao 5) ni Zcash ya sita [uboreshaji wa mtandao](../start-here/network-upgrades), iliyotumwa na [ZIP 252](https://zips.z.cash/zip-0252)Ni uboreshaji mkubwa wa kriptografia. Ilianzisha itifaki ya malipo yenye ulinzi wa Orchard, iliyojengwa kwenye mfumo wa kuthibitisha Halo 2, pamoja na Anwani zilizounganishwa na umbizo jipya la muamala wa toleo la 5. NU5 ilisafirishwa katika toleo zcashd v5.0.0 Electric Coin Company's.

Kwa nini hii ni muhimu? Bwawa lililolindwa linaaminika tu kama mpangilio ulioliunda. Bwawa mbili za kwanza zilizolindwa Zcash's, Sprout na Sapling, kila moja ilihitaji sherehe ya usanidi inayoaminika mara moja ili kutoa vigezo vyake vya siri. Kama vigezo hivyo vingehifadhiwa badala ya kuharibiwa, mtu angeweza kuchapisha ZEC bandia bila mtu yeyote kuiona. Bwawa Orchard NU5's linafunga wasiwasi huo kwa kutumia mfumo wa kuthibitisha Halo 2, ambao hauhitaji sherehe kama hiyo.

## Mpangilio unaoaminika

Orchard ni itifaki iliyolindwa iliyoanzishwa na NU5, iliyofafanuliwa katika [ZIP 224](https://zips.z.cash/zip-0224)Imejengwa juu ya mfumo wa kuthibitisha Halo 2, ambao hutumia mbinu inayoitwa PLONKish arithmetization kwenye mzunguko wa mkunjo wa Pallas na Vesta. Faida ya vitendo ni rahisi: Halo 2 haihitaji usanidi unaoaminika na hakuna mfuatano wa marejeleo uliopangwa, kwa hivyo hakuna kigezo cha siri ambacho kinaweza kutumika vibaya.

Sprout na Sapling zote zilitegemea mpangilio unaoaminika. Kundi la watu liliendesha sherehe ya kujenga vigezo vya kila bwawa la kuogelea, na kila mtu alilazimika kuamini kwamba angalau mmoja wao aliharibu sehemu yake ya siri. Orchard huondoa dhana hiyo. Mabwawa ya kuogelea ya zamani bado yapo baada ya NU5, kwa hivyo dhamana ya kutoweka inatumika kwa fedha unazomiliki katika bwawa la kuogelea Orchard.

![Before NU5, Sprout and Sapling needed a trusted setup ceremony. After NU5, the Orchard pool uses the Halo 2 system and needs no trusted setup](/content-images/nu5-trusted-setup-5447dbe3f2.webp)

## Kilichobadilika NU5

NU5 huunganisha mabadiliko kadhaa ya makubaliano, yote yakiwashwa pamoja katika kitalu namba 1,687,104.

1. Iliongeza bwawa la kuogelea lililolindwa na Orchard (ZIP 224), itifaki ya Halo 2 iliyoelezwa hapo juu.
2. Iliongeza umbizo la muamala wa toleo la 5 (ZIP 225), mpangilio uliorekebishwa upya wenye maeneo tofauti kwa ajili ya data ya uwazi, Sapling, na Orchard mpya. Sehemu za Sprout ziliondolewa, na umbizo la toleo la 4 la zamani liliendelea kuwa halali baada ya kuamilishwa.
3. Ilianzisha Anwani Zilizounganishwa na funguo za kutazama zilizounganishwa (ZIP 316), zitakazojadiliwa katika sehemu inayofuata.
4. Ilipitisha kitambulisho cha muamala kisichoweza kubadilika (ZIP 244), njia mpya ya kukokotoa kitambulisho cha muamala kinachotenganisha kile muamala hufanya kutoka kwa uthibitisho na sahihi zinazoidhinisha.
5. Ilipitisha usimbaji wa nukta za Jubjub (ZIP 216) ili kuondoa usimbaji usio wa kawaida na kukaza sheria kuhusu kile kinachohesabiwa kama muamala halali.
6. Iliwezesha uwasilishaji wa miamala ya toleo la 5 katika mtandao wa rika-kwa-rika (ZIP 239).

NU5 pia imesasisha idadi ya ZIP zilizopo (32, 203, 209, 212, 213, 221, na 401) kwa hivyo zinawakilisha bwawa jipya Orchard.

## Anwani Zilizounganishwa

Kabla ya NU5, kila bwawa lilikuwa na aina yake ya anwani, na mtumaji alipaswa kujua ni aina gani unayotaka. Anwani Zilizounganishwa, zilizofafanuliwa katika [ZIP 316](https://zips.z.cash/zip-0316), badilisha hilo. Anwani moja ya Unified inaweza kuunganisha vipokezi kwa zaidi ya kundi moja, kwa hivyo pochi ya mtumaji huchagua ile bora zaidi inayounga mkono.

![A unified address bundles receivers for several pools: a transparent receiver, a Sapling receiver, and a new Orchard receiver](/content-images/nu5-unified-address-6e2c84f66e.webp)

Funguo za kutazama zilizounganishwa hufanya kazi vivyo hivyo kwa kutazama. Hutoa mwonekano wa kusoma pekee katika mabwawa na vifuniko vya anwani. Kwa maelezo zaidi kuhusu hilo, tazama [Funguo za Kutazama](../zcash-tech/viewing-keys) ukurasa.

## Ambapo NU5 iko

NU5 ilifuata maboresho ya awali Zcash's: Overwinter, Sapling, Blossom, Heartwood, na Canopy. Iliamilishwa kwenye mainnet mnamo Mei 31, 2022. Mzunguko wa mkunjo Orchard's ulichaguliwa kwa sababu unaunga mkono kujirudia, ambayo ni msingi wa kazi ya kuongeza ukubwa baadaye. NU5 ni mtangulizi wa moja kwa moja wa safu ya maboresho NU6 na NU6.x, ambayo ilijengwa kwenye bwawa Orchard na baadaye kuirekebisha.

## Faharasa

| Muhula | Maana ya Kiingereza-rahisi |
|---|---|
| Network upgrade (NU) | Mabadiliko yaliyoratibiwa kwa sheria za makubaliano Zcash's, yaliyoamilishwa kwa urefu wa block uliowekwa |
| Orchard | Bwawa la kuogelea lenye ulinzi NU5 lilianzishwa, limejengwa kwenye mfumo wa kuthibitisha Halo 2 |
| Halo 2 | Mfumo wa kuthibitisha nyuma ya Orchard ambao hauhitaji usanidi unaoaminika |
| Trusted setup | Sherehe ya mara moja ambayo hufanya vigezo vya siri vya bwawa la kuogelea na lazima viaminiwe kuviharibu |
| Unified Address | Anwani moja inayoweza kuunganisha vipokezi kwa zaidi ya kundi moja (ZIP 316) |
| Consensus branch id | Kitambulisho kinachoashiria ni seti gani ya sheria ambazo muamala unamiliki |

## Maswali Yanayoulizwa Mara kwa Mara

Je, NU5 inabadilisha ZEC yangu au faragha yangu? Hapana. NU5 imeongeza bwawa jipya lililolindwa na umbizo jipya la anwani. ZEC yako iliyopo haiathiriwi, na faragha yako haipunguzwi. Kuhamisha fedha kwenye Orchard hukupa bwawa ambalo halihitaji usanidi unaoaminika.

Orchard? Orchard ni itifaki iliyolindwa Zcash's iliyoanzishwa na NU5. Inaendeshwa kwenye mfumo wa kuthibitisha Halo 2, kwa hivyo haihitaji sherehe ya usanidi inayoaminika.

Je, ni lazima nifanye chochote? Hapana. Pochi inayotumika inashughulikia NU5 kwa ajili yako. Unaweza kuendelea kutumia anwani za zamani, na unaweza kuanza kutumia Anwani zilizounganishwa pochi yako inapozitoa.

Anwani Iliyounganishwa ni nini? Anwani moja ambayo inaweza kuhifadhi vipokezi kwa zaidi ya kundi moja la watu. Pochi ya mtumaji huchagua kundi linalounga mkono, kwa hivyo huna haja ya kutoa anwani tofauti kwa kila aina.

Je, NU5 huondoa usanidi unaoaminika kutoka kwa fedha zangu za zamani? Sio kwa kurudi nyuma. Orchard haihitaji usanidi unaoaminika, lakini vigezo vya awali vya bwawa la Sapling bado vipo baada ya NU5. Dhamana ya kutoweka inatumika kwa fedha zilizohifadhiwa katika bwawa Orchard.

Je, umbizo la muamala wa zamani liliacha kufanya kazi? Hapana. NU5 iliongeza umbizo la toleo la 5, na umbizo la toleo la 4 la zamani likabaki halali baada ya kuamilishwa.

## Jaribu uelewa wako

Sprout na Sapling yote ilihitaji sherehe ya kuaminiwa ya usanidi. Bwawa Orchard NU5's lilibadilisha nini kuhusu hilo, na kwa nini ni muhimu?

<details>
<summary>Answer</summary>

Orchard imejengwa juu ya mfumo wa kuthibitisha Halo 2, ambao hauhitaji usanidi unaoaminika na hakuna mfuatano wa marejeleo uliopangwa. Hiyo huondoa hatari kwamba vigezo vya siri vilivyobaki vinaweza kutumika kughushi ZEC. Dhamana hiyo inatumika kwa fedha zilizohifadhiwa katika bwawa la Orchard. Vigezo vya zamani Sapling bado vipo baada ya NU5.
</details>

### Rasilimali

[ZIP 252: Utekelezaji wa Uboreshaji wa Mtandao NU5](https://zips.z.cash/zip-0252)

[ZIP 224: Itifaki Iliyolindwa na Bustani Orchard](https://zips.z.cash/zip-0224)

[ZIP 225: Umbizo la Muamala la Toleo la 5](https://zips.z.cash/zip-0225)

[ZIP 316: Anwani Zilizounganishwa na Funguo Zilizounganishwa za Kutazama](https://zips.z.cash/zip-0316)

[Uboreshaji wa Mtandao 5](https://z.cash/upgrade/nu5/)

[Electric Coin Company: zcashd 5.0.0 kutolewa](https://electriccoin.co/blog/new-release-5-0-0/)

### Tazama pia

[Maboresho ya Mtandao wa Zcash](../start-here/network-upgrades)

[Mabwawa ya Kuogelea Yenye Ngao](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Funguo za Kutazama](../zcash-tech/viewing-keys)

[NU6.1](../zcash-tech/nu6-1)

---

Mfululizo: [Faharasa ya Uboreshaji wa Mtandao](../start-here/network-upgrades) · Iliyotangulia: [Canopy](../zcash-tech/canopy) · Inayofuata: [NU6](../zcash-tech/nu6)
