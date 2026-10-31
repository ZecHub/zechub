<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Sapling.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Hariri Ukurasa"/>
</a>

# Sapling

> Sapling ilianza kutumika kwenye mainnet ya Zcash katika block 419,200 (Oktoba 29, 2018, 02:15 UTC).

Mtakachojifunza: Sapling ilifanya malipo ya Zcash ya faragha [private] kuwa ya haraka na mepesi vya kutosha kutekelezwa kwenye simu au hardware wallet.

Sapling ilikuwa uboreshaji wa pili mkubwa wa mtandao [network upgrade] wa Zcash, uliowashwa katika maadhimisho ya pili ya Zcash. Ilikuwa hard fork ya makubaliano [consensus] iliyojenga upya jinsi miamala ya faragha [shielded] inavyoundwa. Utekelezaji umefafanuliwa na ZIP 205, kanuni mpya za sahihi za muamala [transaction signature] na ZIP 243, na zote zinajengwa juu ya ZIP 200, utaratibu wa uboreshaji wa mtandao. Maelezo kamili yapo katika Uainishaji wa Itifaki wa Zcash. Electric Coin Company ilijenga uboreshaji huu na kutoa toleo la kwanza lililounga mkono uboreshaji huo, zcashd 2.0.0, mnamo Agosti 2018. On-chain, mtandao hutambua kanuni za Sapling kwa kitambulisho chake cha tawi la makubaliano.

Kwa nini hili ni muhimu. Kabla ya Sapling, kufanya malipo ya faragha ya kweli kulimaanisha kusubiri dakika huku kompyuta yako ikitumia gigabaiti za kumbukumbu kuunda thibitisho [proof]. Hilo lilikuwa polepole sana na zito sana kwa watu wengi, hivyo watumiaji wengi, masoko ya kubadilishana sarafu, na maduka waliepuka miamala ya faragha na kutuma ZEC waziwazi badala yake. Sapling ilipunguza kazi hiyo hadi sekunde chache na takribani megabaiti 40 za kumbukumbu. Mabadiliko hayo pekee ndiyo yaliyofanya matumizi ya ZEC ya faragha yawe ya vitendo katika maisha ya kila siku, kwenye simu za kawaida na hardware wallet.

## Nini kilibadilika

Kiini cha Sapling ni njia ya haraka zaidi ya kuunda thibitisho la maarifa sifuri [zero-knowledge proof] linalodumisha faragha ya muamala wa faragha. Muundo wa awali wa Sprout ulitumia circuit moja ya kuthibitisha (circuit ya JoinSplit) iliyokuwa polepole na kutumia kumbukumbu nyingi. Sapling iliibadilisha kwa circuit mbili zilizoundwa mahususi, circuit ya Spend na circuit ya Output, zilizoelezwa katika Uainishaji wa Itifaki wa Zcash. Matokeo yake ni kupungua kubwa kwa gharama. Kwa kila Electric Coin Company, muamala wa faragha unaweza kuundwa kwa sekunde chache tu kwa kutumia takribani megabaiti 40 za kumbukumbu. Kigezo cha kabla ya Sapling cha Sprout kilikuwa kizito zaidi, kikihitaji dakika na gigabaiti kadhaa za kumbukumbu (takwimu hizi za upande wa Sprout ni kigezo kinachonukuliwa sana cha makadirio).

![Sprout versus Sapling shielded transaction cost](/content-images/sapling-before-after-a045b0b48f.webp)

## Funguo mpya

Sapling pia ilianzisha seti mpya ya anwani za faragha na funguo. Ufunguo mmoja unaweza kutoa anwani nyingi tofauti, ambazo ni anwani tofauti za malipo ambazo mtazamaji wa nje hawezi kuzihusisha na nyingine. Sapling pia iliongeza funguo za kutazama [viewing keys]: ufunguo kamili au wa kutazama unaoingia humwezesha mtu kushiriki uwezo wa kuona maelezo ya miamala ya pochi bila kukabidhi uwezo wa kutumia pesa zake. Hilo ni muhimu kwa ukaguzi, uhasibu, au kuthibitisha tu kwamba malipo yalifanywa.

Mabadiliko yanayohusiana ni kwamba Sapling ilitenganisha kazi ya kuunda thibitisho na kazi ya kusaini muamala. Kifaa kinachounda thibitisho la maarifa sifuri hakihitaji tena kuwa kifaa kinachoshikilia mamlaka ya kutumia pesa. Utenganishaji huu ndio unaoruhusu hardware wallet kuweka ufunguo wako wa kutumia pesa [spending key] kando huku kifaa tofauti kikifanya kazi nzito zaidi ya kuthibitisha.

![Proving device hands the proof to a separate signing device](/content-images/sapling-decoupled-spend-6fceca13a2.webp)

## Usanidi unaoaminika

Circuit za Sapling zinategemea seti ya vigezo vya umma ambavyo vilipaswa kuzalishwa kwa uangalifu. Ikiwa mhusika mmoja angevitoa peke yake na kuhifadhi data ya siri iliyosalia (“taka zenye sumu”), mhusika huyo angeweza kughushi mathibitisho. Ili kuepuka hili, vigezo vilitokana na sherehe ya awamu mbili yenye wahusika wengi. Awamu ya 1, iitwayo Powers of Tau, haikutegemea circuit yoyote, ikimaanisha haikufungamanishwa na circuit mahususi za Sapling. Awamu ya 2, Sapling MPC, ilihusu circuit mahususi. Kila awamu hubaki salama mradi angalau mshiriki mmoja alikuwa mwaminifu na kuharibu taka zake zenye sumu, hivyo sherehe hushindwa tu ikiwa kila mshiriki atashirikiana kwa siri.

## Jinsi ilivyowashwa

Sapling ilifuata Overwinter, uboreshaji wa Juni 2018 uliotayarisha utaratibu wa uboreshaji wa mtandao. Electric Coin Company iliweka urefu wa uanzishaji wa mainnet katika zcashd 2.0.0, iliyotolewa mnamo Agosti 2018, na mtandao ulibadilika hadi kanuni za Sapling wakati block 419,200 ilipochimbwa. On-chain, wakati huo huwekwa alama na kitambulisho cha tawi la makubaliano cha Sapling.

![Timeline from Zcash launch to Sapling activation](/content-images/sapling-timeline-6cad184c30.webp)

## Faharasa

| Neno | Maana kwa lugha rahisi |
|---|---|
| Shielded transaction | Muamala wa Zcash wa faragha unaoficha mtumaji, mpokeaji, na kiasi. |
| Sprout | Itifaki ya awali ya faragha ambayo Zcash ilizindua nayo, polepole na nzito zaidi kuliko Sapling. |
| Spend and Output circuits | Circuit mbili mpya za kuthibitisha za Sapling zilizobadilisha circuit moja ya JoinSplit ya Sprout. |
| Diversified address | Moja kati ya anwani nyingi za malipo zisizoweza kuhusishwa [unlinkable] unazoweza kutoa kutoka kwenye ufunguo mmoja. |
| Viewing Key | Ufunguo unaomruhusu mtu kuona miamala ya pochi bila kuwa na uwezo wa kutumia pesa kutoka humo. |
| Consensus branch id | Msimbo mfupi unaouambia mtandao kanuni za uboreshaji gani ambazo muamala unafuata. |

## Maswali yanayoulizwa mara kwa mara

Je, Sapling ilibadilisha kiasi cha ZEC ninachomiliki? Hapana. Sapling ilibadilisha jinsi miamala ya faragha inavyoundwa, si kiasi cha ZEC ambacho mtu yeyote anamiliki au ugavi wa jumla. Salio lako halikuathiriwa.

Je, ZEC yangu bado ni ya faragha baada ya Sapling? Ndiyo, na inatumika zaidi. Sapling ilidumisha faragha imara ya miamala ya faragha na kuifanya iwe ya haraka na nafuu vya kutosha kutumika kwa kweli. Fedha za faragha hubaki zimefichwa kwa njia ileile.

Je, ninapaswa kufanya chochote? Hapana, hakuna hatua inayohitajika kutoka kwako kama mmiliki. Sapling ilikuwa uboreshaji wa mtandao ambao programu za pochi na node zilitumia. Pochi za kisasa tayari zinaunga mkono anwani za Sapling.

Tofauti kati ya Sprout na Sapling ni ipi? Sprout ilikuwa itifaki ya kwanza ya faragha na ilitumia circuit moja ya kuthibitisha iliyokuwa polepole na kutumia kumbukumbu nyingi. Sapling iliibadilisha kwa circuit za Spend na Output za haraka zaidi, ikaongeza funguo za kutazama na anwani tofauti, na kufanya miamala ya faragha iwe myepesi vya kutosha kwa simu na hardware wallet.

Kwa nini vyanzo vingine vinasema Oktoba 28 na vingine Oktoba 29? Urefu wa uanzishaji uliwekwa mapema kulenga Oktoba 28, 2018. Block iliyosababisha mabadiliko hayo kwa kweli, block 419,200, ilichimbwa katika saa za mapema za Oktoba 29 UTC. Katika maeneo mengi ya saa za mahali hapo, bado ilikuwa Oktoba 28. Ni block ileile na wakati uleule kwa vyovyote vile.

Ufunguo wa kutazama ni nini? Ufunguo wa kutazama hukuruhusu kushiriki ruhusa ya kusoma pochi ya faragha. Mtu mwenye ufunguo kamili au wa kutazama unaoingia anaweza kuona maelezo ya miamala ya pochi lakini hawezi kutumia fedha zake. Tazama [Funguo za Kutazama](../zcash-tech/viewing-keys) kwa maelezo zaidi.

## Jaribu uelewa wako

Chini ya Sprout, kwa nini watu wengi waliepuka miamala ya faragha, na Sapling iliwezaje kurekebisha hali hiyo?

<details>
<summary>Jibu</summary>
Chini ya Sprout, kuunda muamala wa faragha kulichukua dakika na kutumia gigabaiti za kumbukumbu, hivyo kulikuwa polepole na zito sana kwa watumiaji wengi, masoko ya kubadilishana sarafu, na maduka. Sapling ilianzisha circuit za Spend na Output za haraka zaidi zilizopunguza kazi hadi sekunde chache na takribani megabaiti 40, na kufanya miamala ya faragha iwe ya vitendo kwenye simu za kila siku na hardware wallet.
</details>

### Rasilimali

- [ZIP 205: Utekelezaji wa Uboreshaji wa Mtandao wa Sapling](https://zips.z.cash/zip-0205)
- [ZIP 243: Uthibitishaji wa Sahihi za Muamala kwa Sapling](https://zips.z.cash/zip-0243)
- [Ukurasa wa uboreshaji wa Sapling wa Zcash](https://z.cash/upgrade/sapling/)
- [Electric Coin Company: Tangazo la Sapling](https://electriccoin.co/blog/sapling/)
- [Electric Coin Company: Kutangaza MPC ya Sapling](https://electriccoin.co/blog/sapling-mpc/)

### Tazama pia

- [Mabwawa ya Faragha](../using-zcash/shielded-pools)
- [Funguo za Kutazama](../zcash-tech/viewing-keys)
- [zk-SNARKs](../zcash-tech/zk-snarks)
- [Maboresho ya Mtandao wa Zcash](../start-here/network-upgrades)
- [Pochi](../using-zcash/wallets)
- [Electric Coin Company](../zcash-organizations/electric-coin-company)

---

Mfululizo: [Faharasa ya Maboresho ya Mtandao](../start-here/network-upgrades) · Iliyotangulia: [Overwinter](../zcash-tech/overwinter) · Inayofuata: [Blossom](../zcash-tech/blossom)
