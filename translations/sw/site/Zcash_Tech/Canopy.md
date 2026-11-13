<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Canopy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Canopy

> Canopy ilianza kutumika kwenye mainnet ya Zcash katika block 1,046,400 (Novemba 18, 2020 UTC).

Utakachojifunza: jinsi Zcash ilivyoendelea kufadhili maendeleo yake yenyewe baada ya zawadi ya waanzilishi kuisha, na jinsi Canopy ilivyoanzisha mgawanyo wa ufadhili ambao maboresho ya baadaye bado yanajengwa juu yake.

Canopy ni uboreshaji wa mtandao [network upgrade] wa tano wa Zcash, unaojulikana pia kama Uboreshaji wa Mtandao 4 (NU4). Umetekelezwa na [ZIP 251](https://zips.z.cash/zip-0251), na ulianza kutumika kwenye mainnet katika block 1,046,400 mnamo Novemba 18, 2020 (UTC), wakati huohuo wa kupunguzwa kwa nusu kwa kwanza kwa zawadi ya block ya Zcash. Canopy ulikuwa hasa uboreshaji wa utawala [governance] na kifedha. Ulimaliza zawadi ya awali ya waanzilishi na kuanzisha Mfuko mpya wa Maendeleo [Development Fund] wa Zcash, unaolipa Electric Coin Company, Zcash Foundation, na wapokeaji huru wa ruzuku [grant]. Sera nyuma ya mfuko huo ilitokana na mchakato mpana wa utawala wa jamii mwaka 2019.

Kwa nini hili ni muhimu. Zcash hufadhili maendeleo yake yenyewe kutokana na zawadi za block, kwa sababu haina kampuni inayoiunga mkono. Zawadi ya waanzilishi iliyolipia miaka yake ya awali ilipangwa kuisha wakati wa kupunguzwa kwa nusu kwa kwanza. Canopy ulikuwa mbadala: ulielekeza sehemu isiyobadilika ya kila zawadi ya block kwenye Mfuko wa Maendeleo na kubainisha wanaoupokea. Muundo huo uliboreshwa na maboresho ya baadaye, hadi [NU6.1](../zcash-tech/nu6-1).

![Before Canopy the founders reward funded development and was set to end at the first halving. After Canopy the Development Fund takes 20 percent of each block reward and runs to the second halving in 2024](/content-images/canopy-founders-to-devfund-010676e799.webp)

## Mfuko wa maendeleo

Canopy ulimaliza zawadi ya awali ya waanzilishi na kuibadilisha kwa Mfuko wa Maendeleo wa Zcash. Mabadiliko hayo yalifanyika katika block ileile kama kupunguzwa kwa nusu kwa kwanza kwa Zcash, wakati zawadi ya block iliposhuka kutoka 6.25 ZEC hadi 3.125 ZEC. Kwa hivyo wachimbaji [miners] waliona zawadi yao ikipunguzwa kwa nusu siku ileile ambapo sehemu mpya ya zawadi hiyo ndogo ilianza kuelekezwa kwenye maendeleo.

Mfuko huo ulipangwa kudumu kwa miaka minne, kuanzia kupunguzwa huku kwa nusu kwa kwanza mnamo Novemba 2020 hadi kupunguzwa kwa nusu kwa pili mwaka 2024. Sera iliyokubaliwa iliandikwa kama [ZIP 1014](https://zips.z.cash/zip-1014). Utaratibu wa makubaliano [consensus] unaohamisha fedha hasa ni mfumo wa mkondo wa ufadhili: [ZIP 207](https://zips.z.cash/zip-0207) ulianzisha njia ya jumla ya kuelekeza sehemu ya ruzuku ya block kwa wapokeaji waliobainishwa, na [ZIP 214](https://zips.z.cash/zip-0214) uliweka sheria mahususi na anwani za wapokeaji za Mfuko wa Maendeleo.

## Jinsi fedha zinavyogawanywa

Mfuko wa Maendeleo huchukua asilimia 20 ya kila zawadi ya block. Wachimbaji hubakiza asilimia 80 nyingine. Asilimia hiyo 20 kisha hugawanywa kwa njia tatu, kufuatia ZIP 1014.

1. Asilimia 35 kwa Mradi wa Bootstrap, shirika mama la Electric Coin Company.
2. Asilimia 25 kwa Zcash Foundation.
3. Asilimia 40 kwa Ruzuku Kuu, inayofadhili kazi huru na kusimamiwa na Zcash Foundation. Ruzuku Kuu baadaye zilikuwa Zcash Community Grants (ZCG).

Zikipimwa dhidi ya zawadi nzima ya block badala ya mfuko pekee, sehemu hizo ni asilimia 7 kwa Electric Coin Company, asilimia 5 kwa Zcash Foundation, na asilimia 8 kwa Ruzuku Kuu. Njia zote mbili za kuieleza zinaonyesha nambari zilezile.

![The Development Fund is 20 percent of each block reward, split 35 percent to Bootstrap and the Electric Coin Company, 25 percent to the Zcash Foundation, and 40 percent to Major Grants](/content-images/canopy-dev-fund-split-005bf6f2dd.webp)

## Mabadiliko ya bwawa [pool] la Sprout

Canopy pia ilianza kustaafisha bwawa la faragha [shielded pool] la zamani zaidi. Sprout lilikuwa bwawa la kwanza la faragha la Zcash, na Canopy ilianza kuliondoa hatua kwa hatua kupitia [ZIP 211](https://zips.z.cash/zip-0211).

Kuanzia wakati Canopy ilipoanza kutumika, hakuna thamani mpya inayoweza kuongezwa kwenye bwawa la Sprout. Kwa istilahi za kiufundi, sehemu ya vpub_old ya kila JoinSplit lazima iwe sifuri. Fedha zilizo tayari katika Sprout bado zinaweza kutolewa, hivyo hakuna anayenyimwa ufikiaji, lakini bwawa linaweza kupungua tu kuanzia hapa. Hii ni hatua ya kwanza kuelekea kuacha hatimaye kutumia bwawa la urithi la Sprout kwa kupendelea mabwawa mapya ya faragha.

![Before Canopy, value could both enter and leave the Sprout pool. After Canopy, no new value can enter but withdrawals are still allowed](/content-images/canopy-sprout-pool-f5166aa049.webp)

## Vipengele vya ziada vya kiufundi

Pamoja na mabadiliko ya ufadhili, Canopy ilileta ZIP mbili ndogo za kiufundi. [ZIP 212](https://zips.z.cash/zip-0212) ilibadilisha jinsi mpokeaji anavyotoa siri ya muda mfupi ya Sapling, kwa kuitoa kutoka kwenye maandishi wazi ya dokezo [note]. [ZIP 215](https://zips.z.cash/zip-0215) iliandika sheria wazi za kuthibitisha sahihi [signature] za Ed25519, ili kila node ikubaliane ni sahihi zipi hasa zinazochukuliwa kuwa halali.

## Kwa Ufupi

- Canopy (NU4) iliamilishwa kwenye block 1,046,400 ya mainnet (18 Novemba 2020 UTC). Hii ni block ileile ya kupunguzwa kwa nusu (halving) kwa kwanza kwa Zcash, ambako zawadi ya block ilipunguzwa kutoka 6.25 hadi 3.125 ZEC.
- Ilikomesha zawadi ya waanzilishi (founders reward) na kuunda Mfuko wa Maendeleo wa Zcash (Development Fund). Mfuko huu ulipata 20% ya kila zawadi ya block kwa miaka minne, hadi kupunguzwa kwa nusu kwa pili mwaka 2024 (sera ya ZIP 1014; utaratibu wa ZIP 207/214).
- Sehemu hiyo ya 20% ya mfuko imegawanywa hivi: 35% kwa Bootstrap (Electric Coin Company), 25% kwa Zcash Foundation, na 40% kwa Ruzuku Kuu (Major Grants), ambazo baadaye zilijulikana kama Zcash Community Grants.
- Ilifunga bwawa (pool) la Sprout kwa thamani mpya (ZIP 211). Hakuna amana mpya zinazoweza kuingia, lakini fedha bado zinaweza kutolewa.
- ZIP mbili za kiufundi ziliambatana nayo: ZIP 212 (siri ya muda ya Sapling inayotokana na maandishi wazi ya dokezo [note plaintext]) na ZIP 215 (kanuni za wazi za uthibitishaji wa Ed25519).

## Maelezo ya Msingi

Zcash inafadhili maendeleo yake yenyewe kutokana na zawadi za block (block rewards) kwa sababu hakuna kampuni inayoiunga mkono. Zawadi ya waanzilishi (founders reward) ilifadhili miaka ya mwanzo na ilipangwa kumalizika katika kupunguzwa kwa nusu (halving) kwa kwanza, kwa hiyo mbadala ulipaswa kuwepo kabla ya muda huo wa mwisho. Canopy ndio ulikuwa mbadala huo: ZIP 207 ilianzisha utaratibu wa jumla wa mikondo ya ufadhili (funding streams) unaoelekeza sehemu ya ruzuku ya block (block subsidy) kwa anwani (addresses) za wapokeaji zilizobainishwa, na ZIP 214 iliweka sheria na anwani mahususi za Mfuko wa Maendeleo (Development Fund). Zikipimwa dhidi ya zawadi yote badala ya mfuko pekee, hisa ni 7% ECC, 5% Zcash Foundation, na 8% Ruzuku Kuu (Major Grants). Hizi ni namba zile zile, zilizoelezwa kwa njia mbili.

Canopy pia ilianza kustaafisha Sprout, bwawa la faragha (shielded pool) la zamani zaidi la Zcash: tangu kuanza kutumika, sehemu ya vpub_old ya kila JoinSplit lazima iwe sifuri, hivyo thamani inaweza kutoka Sprout lakini haiwezi kurudi tena.

## Mfano wa kuona

Canopy ni wakati ambapo awamu ya mishahara ya waanzilishi wa kampuni changa inaisha na katiba inachukua nafasi yake: kuanzia block hiyo na kuendelea, senti 20 za kila dola ambayo mtandao unazalisha zinatengwa kwa ajili ya matengenezo na kugawanywa kwa uwiano wa 35/25/40 kati ya idara tatu. Wakati huo huo, ghala la zamani (Sprout) linafungwa kwa uhifadhi mpya. Mtu yeyote bado anaweza kuchukua bidhaa zake, lakini hakuna kitu kipya kinachoingizwa.

## Uchambuzi wa Kina

Mkondo wa ufadhili unatekelezwa kwa makubaliano (consensus), si kwa kuaminiana: node hukataa block ambazo coinbase yake hailipi wapokeaji waliobainishwa sehemu zao zilizobainishwa. Canopy iliwekwa kwa makusudi kwenye block ya kupunguzwa kwa nusu (halving), hivyo wachimbaji (miners) waliona zawadi ikipunguzwa kwa nusu wakati uleule ambapo sehemu mpya ya zawadi hiyo ndogo zaidi ilianza kuelekezwa kwenye maendeleo. ZIP 212 ilibadilisha jinsi siri ya muda mfupi ya Sapling inavyopatikana (kutoka kwenye maandishi wazi ya dokezo [note]), na ZIP 215 iliandika kanuni dhahiri za kukubali Ed25519 ili kila node ithibitishe sahihi (signatures) kwa njia ileile. Haya yalikuwa mabadiliko madogo yaliyoondoa makundi mazima ya utata wa makubaliano.

## Makosa ya Kawaida

- **Kudhani kwamba Canopy ndiyo kupunguzwa kwa nusu (halving) yenyewe.** Vilishiriki block moja ya kuanza kutumika, lakini ni mabadiliko tofauti: ZIP 251 (Canopy) dhidi ya ratiba ya utoaji wa sarafu.
- **Kuelewa asilimia 20% kama imechukuliwa kutoka kwenye sehemu mpya ya wachimbaji (miners).** Wachimbaji walibaki na 80%; mfuko unachukua 20% ya zawadi ya block.
- **Kudhani kwamba fedha za Sprout zilifungiwa au kuharibiwa.** Bado inawezekana kutoa fedha; ni amana mpya pekee ndizo zilizositishwa.
- **Kuchukulia “35/25/40 ya mfuko” na “7/5/8 ya zawadi” kama migawanyo tofauti.** Ni namba zilezile zilizopimwa dhidi ya misingi tofauti.
- **Kuita Canopy uboreshaji wa kriptografia.** Ulihusu hasa utawala (governance) na sera ya fedha; ZIP za kiufundi zilikuwa marekebisho madogo.

## Faharasa

| Istilahi | Maana kwa lugha rahisi |
|---|---|
| Founders reward | Muundo wa awali wa ufadhili uliolipia maendeleo ya mapema ya Zcash, uliopangwa kuisha wakati wa kupunguzwa kwa nusu kwa kwanza |
| Development Fund | Sehemu ya asilimia 20 ya kila zawadi ya block ambayo Canopy ilielekeza kwenye maendeleo, ikidumu hadi kupunguzwa kwa nusu kwa pili |
| Block reward (subsidy) | ZEC mpya inayoundwa na kulipwa kadiri kila block inavyochimbwa |
| Halving | Tukio lililopangwa ambapo zawadi ya block hukatwa kwa nusu |
| Funding stream | Utaratibu wa makubaliano (ZIP 207) unaoelekeza sehemu ya ruzuku ya block kwenye anwani za wapokeaji waliobainishwa |
| Sprout pool | Bwawa la awali la faragha la Zcash, ambalo Canopy iliacha kupokea thamani mpya |

## Maswali yanayoulizwa mara kwa mara

Je, Canopy hubadilisha ZEC yangu au faragha yangu? Hapana. Canopy inahusu jinsi maendeleo yanavyofadhiliwa, pamoja na sheria chache za kiufundi. Salio lako na miamala yako ya faragha [shielded transactions] haviathiriki.

Je, Canopy ilipunguza zawadi ya block? Canopy ilianza kutumika katika block ileile kama kupunguzwa kwa nusu kwa kwanza kwa Zcash, ambako kulipunguza zawadi kutoka 6.25 ZEC hadi 3.125 ZEC. Kupunguzwa kwa nusu ni sehemu ya sera ya kifedha ya Zcash. Jukumu la Canopy lilikuwa kuamua jinsi sehemu ya zawadi hiyo ndogo inavyotumiwa.

Mfuko wa Maendeleo unatumika kwa nini? Unafadhili watu wanaojenga Zcash. Fedha huenda kwa Electric Coin Company (kupitia Mradi wa Bootstrap), Zcash Foundation, na Ruzuku Kuu, ambazo zinaunga mkono kazi huru.

Je, bado ninaweza kutumia fedha katika bwawa la Sprout? Ndiyo. Bado unaweza kutoa fedha ambazo tayari ziko katika Sprout. Huwezi tu kuongeza thamani mpya humo baada ya Canopy.

Je, Mfuko wa Maendeleo ni wa kudumu? Hapana. Ulipangwa kudumu kwa miaka minne, kuanzia kupunguzwa kwa nusu kwa kwanza mnamo Novemba 2020 hadi kupunguzwa kwa nusu kwa pili mwaka 2024, ukiipa jamii muda wa kuona jinsi unavyofanya kazi kabla ya kuupitia upya.

Je, Canopy inahusianaje na NU6 na NU6.1? Canopy ilianzisha mgawanyo wa ufadhili wa njia tatu na utaratibu wa mkondo wa ufadhili. Maboresho ya baadaye, yakiwemo NU6 na NU6.1, yalipitia upya na kuunda upya Mfuko wa Maendeleo uliojengwa juu ya msingi huo.

## Jaribu uelewa wako

Canopy ilianza kutumika katika block ileile kabisa kama kupunguzwa kwa nusu kwa kwanza kwa Zcash. Kwa nini muda huo ulichaguliwa, na nini kingetokea kwa ufadhili wa maendeleo bila Canopy?

<details>
<summary>Jibu</summary>

Zawadi ya awali ya waanzilishi ilipangwa kuisha wakati wa kupunguzwa kwa nusu kwa kwanza. Bila Canopy, zawadi yote ndogo ya block baada ya kupunguzwa kwa nusu ingeenda kwa wachimbaji, na kuacha bila ufadhili wa kiwango cha itifaki kwa maendeleo. Canopy ilibadilisha zawadi ya waanzilishi kwa Mfuko wa Maendeleo katika block hiyo hasa, hivyo ufadhili uliendelea bila pengo.
</details>

### Rasilimali

[ZIP 251: Utekelezaji wa Uboreshaji wa Mtandao wa Canopy](https://zips.z.cash/zip-0251)

[ZIP 1014: Kuanzisha Mfuko wa Maendeleo kwa ECC, ZF, na Ruzuku Kuu](https://zips.z.cash/zip-1014)

[ZIP 207: Mikondo ya Ufadhili](https://zips.z.cash/zip-0207)

[ZIP 214: Sheria za makubaliano za Mfuko wa Maendeleo wa Zcash](https://zips.z.cash/zip-0214)

[ZIP 211: Kuzuia Kuongezwa kwa Thamani Mpya kwenye Bwawa la Thamani la Mnyororo wa Sprout](https://zips.z.cash/zip-0211)

[Canopy Uboreshaji wa Mtandao](https://z.cash/upgrade/canopy/)

### Tazama pia

[Maboresho ya Mtandao wa Zcash](../start-here/network-upgrades)

[Mfuko wa Maendeleo](../start-here/development-fund)

[Sera ya Kifedha ya Zcash](../start-here/zcash-monetary-policy)

[Mabwawa ya Faragha](../using-zcash/shielded-pools)

[NU6.1](../zcash-tech/nu6-1)

[Utawala wa Zcash](../zcash-community/zcash-governance)

---

## Kurasa Zinazohusiana

- [Sprout](./Sprout.md) — bwawa ambalo Canopy ilifunga kwa amana mpya
- [Heartwood](./Heartwood.md) — uboreshaji uliotangulia katika mfululizo huu
- [NU5](./NU5.md) — uboreshaji unaofuata, ulioanzishwa Orchard
- [NU6.1](./NU6_1.md) — marekebisho ya hivi karibuni zaidi ya ufadhili wa maendeleo

Mfululizo: [Faharasa ya Maboresho ya Mtandao](../start-here/network-upgrades) · Iliyotangulia: [Heartwood](../zcash-tech/heartwood) · Inayofuata: [NU5](../zcash-tech/nu5)
