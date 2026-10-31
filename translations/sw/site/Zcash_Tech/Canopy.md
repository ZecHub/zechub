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

Mfululizo: [Faharasa ya Maboresho ya Mtandao](../start-here/network-upgrades) · Iliyotangulia: [Heartwood](../zcash-tech/heartwood) · Inayofuata: [NU5](../zcash-tech/nu5)
