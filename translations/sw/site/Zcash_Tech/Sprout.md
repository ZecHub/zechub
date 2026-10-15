<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Sprout.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Sprout

> Zcash ilizinduliwa mnamo Oktoba 28, 2016, ikiwa na bwawa la kuogelea lenye ulinzi la Sprout.

> **Onyo:** NU7 yaifanya ZEC bado ipo kwenye bwawa Sprout isiweze kutumika mara tu itakapoanza kutumika (mainnet inalenga tarehe 5 Novemba 2026, uamuzi wa mwisho tarehe 20 Oktoba 2026; tazama [ZIP 259](https://zips.z.cash/zip-0259)Kama una fedha za Sprout, soma [Kurejesha fedha](../using-zcash/recovering-funds) na kuwahamisha kwanza.

Utakachochukua: Sprout ndipo Zcash ilipoanzia, pesa za kibinafsi na zinazoweza kuthibitishwa zilipoanza kutumika kwenye blockchain ya moja kwa moja.

Sprout ni uzinduzi wa awali wa mtandao Zcash, si wa baadaye [uboreshaji wa mtandao](../start-here/network-upgrades)Ilianza kutumika katika eneo la mwanzo mnamo Oktoba 28, 2016. Hakuna nambari ya ZIP inayofafanua Sprout: mchakato wa ZIP ulianza baadaye na Overwinter, kwa hivyo Sprout inaelezewa na Vipimo vya Itifaki ya Zcash ya awali na muundo wa Zerocash ambao ilijengwa juu yake [Electric Coin Company](../zcash-organizations/electric-coin-company) (wakati huo Electric Coin Company), ikiongozwa na Zooko Wilcox, iliijenga na kuisafirisha. Sprout ilianzisha miamala ya kwanza ya vitendo zk-SNARK iliyolindwa na bwawa la awali lililolindwa, ili watu waweze kutuma ZEC na mtumaji, mpokeaji, na kiasi kilichofichwa huku mtandao ukiendelea kuangalia kama salio limeongezeka. Jina hilo liliashiria mnyororo mchanga, unaochipuka ambao timu ilitarajia kukua.

Kwa nini hii ni muhimu? Kila blockchain ya umma kabla ya Sprout iliweka malipo yako wazi: mtu yeyote angeweza kuona ni nani aliyelipa nani na kiasi gani. Sprout ilikuwa mtandao wa kwanza wa moja kwa moja, usio na ruhusa kuficha maelezo hayo na bado ikathibitisha kuwa hakuna mtu aliyekuwa akidanganya. Hilo ni muhimu kwa faragha ya kawaida ya kifedha, aina unayotarajia kutoka kwa pesa taslimu au taarifa ya benki ambayo hakuna mtu mwingine anayeweza kusoma. Pia ilithibitisha kuwa faragha imara ya mnyororo inaweza kufanya kazi kwa vitendo, zaidi ya muundo wa karatasi. Sherehe ya usanidi wa kuaminika ambayo iliwezesha ikawa sehemu ya marejeleo ya kazi ya baadaye ya usimbaji fiche, na mfumo wa polepole na mzito wa kuthibitisha Sprout uliosafirishwa nao ndio hasa uliosukuma timu kujenga Sapling miaka miwili baadaye.

## Bwawa la kwanza lenye ngao

Sprout iliunda aina mbili za anwani. Anwani zenye uwazi (anwani za t) hufanya kazi kama Bitcoin, huku maelezo yakionekana kwenye leja ya umma. Anwani zilizolindwa (anwani za z) hutuma pesa kwenye Sprout [bwawa la kuogelea lenye ngao](../using-zcash/shielded-pools), ambapo mtumaji, mpokeaji, na kiasi hubaki kimefichwa. Ujanja ni [zk-SNARKs](../zcash-tech/zk-snarks), ushahidi usio na ujuzi unaoonyesha kuwa muamala ni halali, bila matumizi maradufu na salio linaloongezeka, bila kufichua maelezo yoyote. Sprout ilikuwa mara ya kwanza hii kuanza katika uzalishaji kwenye sarafu ya kidijitali moja kwa moja.

![Transparent transactions expose sender, receiver, and amount, while Sprout shielded transactions hide all three yet stay verifiable](/content-images/sprout-shielded-vs-transparent-61d3b1980c.webp)

## Sherehe

zk-SNARKs huko Sprout zilihitaji seti ya vigezo vya umma, na kuzizalisha kwa usalama kulihitaji mpangilio wa mara moja unaoitwa Sherehe. Washiriki sita katika maeneo tofauti, ya mbali kila mmoja alizalisha kipande cha siri, kinachoitwa taka zenye sumu. Ikiwa mtu yeyote angekusanya vipande vyote tena, angeweza kughushi ZEC kutoka kwa kitu chochote. Ubunifu huo uligeuza hatari hiyo kuwa sheria rahisi: mradi tu angalau mshiriki mmoja angeharibu kipande chake, siri kamili haikuweza kujengwa upya, kwa hivyo ughushi ulibaki kuwa hauwezekani. Washiriki ambao wametajwa hadharani ni pamoja na Zooko Wilcox, Andrew Miller, Peter Van Valkenburgh, Peter Todd, na Derek Hinch wa NCC Group. Mshiriki mmoja alichagua kutokujulikana.

![The Ceremony: six participants generate private shards, then destroy the toxic waste, leaving only the public Sprout parameters](/content-images/sprout-ceremony-flow-ae16f6282a.webp)

## Asili

Sprout ndio msingi ambao kila mabadiliko ya baadaye yanajengwa. Wakati utaratibu wa uboreshaji wa mtandao ulipofika na Overwinter, uliziita sheria za asili kama tawi la makubaliano kitambulisho 0, ambayo ina maana tu kwamba hakuna uboreshaji ambao umetumika bado. Kila kitu tangu wakati huo (Overwinter, Sapling, Blossom, Heartwood, Canopy, NU5, NU6, na kuendelea) kiko kwenye mnyororo Sprout. Uzinduzi ulitangazwa mnamo Agosti 2016 kwa ajili ya mwanzo wa Oktoba 28, Sherehe ilifanyika wiki zilizopita, na muhuri wa muda wa kizuizi cha genesis unasomeka Oktoba 28, 2016, saa 07:56 UTC.

![Timeline from the August 2016 announcement through the parameter Ceremony to the October 28, 2016 Sprout launch](/content-images/sprout-timeline-348766352a.webp)

## Faharasa

| Muhula | Maana ya Kiingereza cha kawaida |
|---|---|
| zk-SNARK | Uthibitisho usio na ufahamu unaoonyesha kuwa muamala ni halali bila kufichua mtumaji, mpokeaji, au kiasi |
| Shielded pool | Upande wa faragha wa Zcash ambapo kiasi na sherehe zimefichwa. Bwawa la Sprout lilikuwa la kwanza |
| z-address and t-address | Anwani ya z inalindwa na huweka maelezo kuwa ya faragha. Anwani ya t ni wazi na inaonyesha maelezo kwenye leja ya umma |
| The Ceremony | Muundo wa vyama vingi wa 2016 uliozalisha vigezo vya umma Sprout's na kisha kutupa taka zenye sumu |
| Toxic waste | Sehemu muhimu za siri kutoka kwa Sherehe ambazo zilibidi ziharibiwe ili ZEC isiweze kughushiwa |
| Consensus branch id 0 | Lebo ya sheria Sprout's, ikimaanisha msingi kabla ya uboreshaji wowote wa mtandao |

## Maswali Yanayoulizwa Mara kwa Mara

Je, Sprout hubadilisha ZEC yangu au faragha yangu leo? Hapana. Sprout ni historia, uzinduzi ulioanzisha mnyororo ambao ZEC yako inaishi. Sarafu zako na faragha yako leo inategemea pochi na bwawa la kuogelea linalolindwa unalotumia sasa, si chochote unachohitaji kufanya kuhusu Sprout.

Kwa nini hakuna nambari ZIP kwa Sprout? Mchakato ZIP ulianza baadaye, pamoja na uboreshaji wa Overwinter. Sprout ni uzinduzi wa awali, ulioelezewa na Vipimo vya Itifaki ya Zcash na muundo wa Zerocash uliotegemea. ZIP 200 inataja Sprout tu kwa mtazamo wa nyuma, kama tawi la makubaliano kitambulisho 0, msingi kabla ya uboreshaji wowote.

Je, nilihitaji kuwaamini watu sita katika Sherehe? Mpangilio ulijengwa kwa hivyo ulihitaji mmoja tu kati yao ili kuwa mkweli. Kila mmoja alikuwa na kipande cha siri, na mradi tu mshiriki mmoja aliharibu chao, siri kamili isingeweza kujengwa upya na hakuna mtu anayeweza kuiga ZEC. Washiriki watano wametajwa hadharani na mmoja hakutajwa jina.

Je, bwawa la Sprout ndilo ninalotumia sasa? Labda sivyo. Sprout ilikuwa bwawa la kwanza lililolindwa, lakini maboresho ya baadaye kama vile Sapling yalileta muundo wa haraka zaidi uliolindwa, na pochi nyingi hutumia mabwawa mapya leo. Sprout bado ni muhimu kwani kazi iliyothibitika kuwa miamala ya faragha na inayoweza kuthibitishwa inaweza kuendeshwa kwenye mtandao wa moja kwa moja.

Ni nini kilichofanya Sprout kuwa tofauti na Bitcoin? Bitcoin huweka kila malipo kwenye leja ya umma ambapo kiasi na anwani zinaonekana. Sprout iliongeza miamala iliyolindwa ambayo huficha mtumaji, mpokeaji, na kiasi huku ikiruhusu mtandao kuthibitisha kuwa muamala ni halali. Iliweka anwani zenye uwazi pia, kwa hivyo mitindo yote miwili inaishi kwenye mnyororo mmoja.

## Jaribu uelewa wako

Sprout mara nyingi huitwa uboreshaji wa mtandao wenye urefu wa uanzishaji. Kwa nini hiyo si sahihi kabisa?

<details>
<summary>Answer</summary>

Sprout ni uzinduzi wa awali wa Zcash, si uboreshaji wa baadaye. Imekuwa ikifanya kazi tangu kizuizi cha mwanzo (kizuizi 0) mnamo Oktoba 28, 2016, kwa hivyo hakuna urefu wa uanzishaji wa kuashiria. Utaratibu wa uboreshaji wa mtandao ulikuja baadaye na kuziita sheria Sprout's kama tawi la makubaliano kitambulisho 0, msingi kabla ya uboreshaji wowote.
</details>

### Rasilimali

[ZIP 200: Utaratibu wa Kuboresha Mtandao](https://zips.z.cash/zip-0200)

[Maboresho ya mtandao Zcash](https://z.cash/upgrade/)

[Electric Coin Company: Uzinduzi wa Zcash Sprout](https://electriccoin.co/blog/zcash-sprout-launch/)

[Electric Coin Company: Ubunifu wa Sherehe](https://electriccoin.co/blog/the-design-of-the-ceremony/)

### Tazama pia

[Mabwawa ya Kuogelea Yenye Ngao](../using-zcash/shielded-pools)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Maboresho ya Mtandao wa Zcash](../start-here/network-upgrades)

[ZEC na Zcash ni nini?](../start-here/what-is-zec-and-zcash)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

---

Mfululizo: [Faharasa ya Uboreshaji wa Mtandao](../start-here/network-upgrades) · Inayofuata: [Overwinter](../zcash-tech/overwinter)
