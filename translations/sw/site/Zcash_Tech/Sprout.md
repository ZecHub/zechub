<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Sprout.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Hariri Ukurasa"/>
</a>

# Sprout

> Zcash ilizinduliwa tarehe 28 Oktoba 2016, pamoja na bwawa la faragha [shielded pool] la Sprout.

> **Onyo:** NU7 hufanya ZEC ambazo bado ziko katika bwawa la Sprout zisiweze kutumika mara tu itakapowashwa (urefu wa uanzishaji wa mainnet 3,543,405, unaolengwa kwa tarehe 5 Novemba 2026; tazama [ZIP 259](https://zips.z.cash/zip-0259)). Ikiwa una fedha za Sprout, soma [Kurejesha fedha](../using-zcash/recovering-funds) na uzihamishe kwanza.

Utajifunza kwamba: Sprout ndipo Zcash ilipoanza, mara ya kwanza pesa za faragha, zinazoweza kuthibitishwa ziliendeshwa kwenye blockchain hai.

Sprout ni uzinduzi wa awali wa mtandao wa Zcash, wala si [uboreshaji wa mtandao](../start-here/network-upgrades) wa baadaye. Ilianza kutumika kwenye block ya mwanzo [genesis block] tarehe 28 Oktoba 2016. Hakuna ZIP yenye nambari inayofafanua Sprout: mchakato wa ZIP ulianza baadaye na Overwinter, hivyo Sprout inaelezewa na Uainishaji wa Itifaki [Protocol Specification] wa awali wa Zcash na muundo wa Zerocash ambao ilijengwa juu yake. [Electric Coin Company](../zcash-organizations/electric-coin-company) (wakati huo Electric Coin Company ya Zerocoin), ikiongozwa na Zooko Wilcox, iliijenga na kuizindua. Sprout ilianzisha miamala ya kwanza ya faragha [shielded transactions] ya zk-SNARK iliyotekelezeka kwa vitendo na bwawa la awali la faragha, hivyo watu wangeweza kutuma ZEC huku mtumaji, mpokeaji, na kiasi vikiwa vimefichwa, wakati mtandao bado ulikagua kuwa salio lilijumlisha ipasavyo. Jina hilo liliashiria mnyororo mchanga unaochipua ambao timu ilitarajia ungeendelea kukua.

Kwa nini hili ni muhimu. Kila blockchain ya umma kabla ya Sprout iliweka malipo yako wazi: mtu yeyote angeweza kuona nani alilipa nani na kiasi gani. Sprout ulikuwa mtandao hai wa kwanza usiohitaji ruhusa [permissionless] kuficha maelezo hayo na bado kuthibitisha kwamba hakuna mtu aliyedanganya. Hili ni muhimu kwa faragha ya kawaida ya kifedha, aina ya faragha unayotarajia kutoka kwa pesa taslimu au taarifa ya benki ambayo hakuna mwingine anaweza kusoma. Pia ilithibitisha kwamba faragha thabiti ya on-chain inaweza kufanya kazi kwa vitendo, zaidi ya muundo wa karatasi. Sherehe ya usanidi unaoaminika [trusted setup] iliyowezesha hili ikawa rejeleo kwa kazi za baadaye za kriptografia, na mfumo wa uthibitishaji uliokuwa wa polepole na uliotumia kumbukumbu nyingi ambao Sprout ilizindua nao ndiyo uliosukuma timu kuunda Sapling miaka miwili baadaye.

## Bwawa la kwanza la faragha

Sprout iliunda aina mbili za anwani. Anwani za uwazi [transparent addresses] (t-addresses) hufanya kazi kama Bitcoin, huku maelezo yakionekana kwenye daftari la umma. Anwani za faragha [shielded addresses] hutuma fedha kwenye Sprout [bwawa la faragha](../using-zcash/shielded-pools), ambako mtumaji, mpokeaji na kiasi hubaki vimefichwa. Mbinu ni [zk-SNARKs](../zcash-tech/zk-snarks), mathibitisho ya maarifa sifuri [zero-knowledge proofs] yanayoruhusu muamala kuonyesha kuwa ni halali, bila matumizi mara mbili na salio linalojumlishwa ipasavyo, bila kufichua maelezo yoyote. Sprout ilikuwa mara ya kwanza hili kuendeshwa katika uzalishaji kwenye sarafu-fiche hai.

![Transparent transactions expose sender, receiver, and amount, while Sprout shielded transactions hide all three yet stay verifiable](/content-images/sprout-shielded-vs-transparent-61d3b1980c.webp)

## Sherehe

zk-SNARKs katika Sprout ilihitaji seti ya vigezo vya umma, na kuvizalisha kwa usalama kulihitaji usanidi wa mara moja ulioitwa Sherehe. Washiriki sita waliokuwa katika maeneo tofauti na ya mbali kila mmoja alizalisha kipande cha siri, kilichoitwa taka sumu. Ikiwa mtu yeyote angewahi kukusanya tena vipande vyote, angeweza kughushi ZEC kutoka pasipo chochote. Muundo huo uligeuza hatari hiyo kuwa kanuni rahisi: mradi angalau mshiriki mmoja aliharibu kipande chake, siri kamili isingeweza kujengwa tena, hivyo kughushi kungebaki kusiwezekane. Washiriki waliotajwa hadharani ni pamoja na Zooko Wilcox, Andrew Miller, Peter Van Valkenburgh, Peter Todd, na Derek Hinch wa NCC Group. Mshiriki mmoja alichagua kubaki asiyejulikana.

![The Ceremony: six participants generate private shards, then destroy the toxic waste, leaving only the public Sprout parameters](/content-images/sprout-ceremony-flow-ae16f6282a.webp)

## Asili

Sprout ndio msingi ambao kila mabadiliko ya baadaye hujengwa juu yake. Mbinu ya uboreshaji wa mtandao ilipowasili pamoja na Overwinter, iliita kanuni za awali kitambulisho cha tawi la makubaliano [consensus branch id] 0, ambacho humaanisha tu kwamba hakuna uboreshaji uliotumika bado. Kila kitu tangu wakati huo (Overwinter, Sapling, Blossom, Heartwood, Canopy, NU5, NU6, na kuendelea) kinakaa kwenye mnyororo ambao Sprout ilianzisha. Uzinduzi ulitangazwa Agosti 2016 kwa block ya mwanzo ya tarehe 28 Oktoba, Sherehe ilifanyika katika wiki zilizotangulia, na muhuri wa muda uliowekwa moja kwa moja wa block ya mwanzo unasoma tarehe 28 Oktoba 2016, saa 07:56 UTC.

![Timeline from the August 2016 announcement through the parameter Ceremony to the October 28, 2016 Sprout launch](/content-images/sprout-timeline-348766352a.webp)

## Fahirisi ya istilahi

| Istilahi | Maana kwa lugha rahisi |
|---|---|
| zk-SNARK | Thibitisho la maarifa sifuri linaloonyesha kuwa muamala ni halali bila kufichua mtumaji, mpokeaji, au kiasi |
| Shielded pool | Upande wa faragha wa Zcash ambako kiasi na wahusika hufichwa. Bwawa la Sprout lilikuwa la kwanza |
| z-address and t-address | z-address ni ya faragha na huweka maelezo siri. t-address ni ya uwazi na huonyesha maelezo kwenye daftari la umma |
| The Ceremony | Usanidi wa washiriki wengi wa mwaka 2016 uliotengeneza vigezo vya umma vya Sprout na kisha kutupa taka sumu |
| Toxic waste | Vipande vya ufunguo wa siri kutoka Sherehe ambavyo vilipaswa kuharibiwa ili ZEC isighushiwe |
| Consensus branch id 0 | Lebo ya kanuni za Sprout, ikimaanisha msingi kabla ya uboreshaji wowote wa mtandao |

## Maswali yanayoulizwa mara kwa mara

Je, Sprout hubadilisha ZEC yangu au faragha yangu leo? Hapana. Sprout ni historia, uzinduzi ulioanzisha mnyororo ambao ZEC yako iko juu yake. Sarafu zako na faragha yako leo hutegemea pochi na bwawa la faragha unalotumia sasa, si chochote unachohitaji kufanya kuhusu Sprout.

Kwa nini hakuna nambari ya ZIP kwa Sprout? Mchakato wa ZIP ulianza baadaye, pamoja na uboreshaji wa Overwinter. Sprout ni uzinduzi wa awali, unaoelezewa na Maelezo ya Itifaki ya Zcash na uundaji wa Zerocash uliotegemezwa nao. ZIP 200 hutaja tu Sprout kwa mtazamo wa baadaye, kama kitambulisho cha tawi la makubaliano 0, msingi kabla ya uboreshaji wowote.

Je, nilihitaji kuwaamini watu sita wa Sherehe? Usanidi ulijengwa ili uhitaji mmoja wao tu awe mwaminifu. Kila mmoja alishikilia kipande cha siri, na mradi mshiriki mmoja angeharibu chake, siri kamili isingeweza kujengwa tena na hakuna mtu angeweza kughushi ZEC. Washiriki watano wametajwa hadharani na mmoja alibaki asiyejulikana.

Je, bwawa la Sprout ndilo linalotumiwa na pochi yangu sasa? Huenda sivyo. Sprout lilikuwa bwawa la kwanza la faragha, lakini maboresho ya baadaye kama Sapling yalianzisha muundo wa faragha wa kasi zaidi, na pochi nyingi hutumia mabwawa mapya zaidi leo. Sprout bado ni muhimu kama kazi iliyothibitisha kwamba miamala ya faragha, inayoweza kuthibitishwa inaweza kuendeshwa kwenye mtandao hai.

Ni nini kilichofanya Sprout iwe tofauti na Bitcoin? Bitcoin huweka kila malipo kwenye daftari la umma ambako kiasi na anwani zinaonekana. Sprout iliongeza miamala ya faragha inayoficha mtumaji, mpokeaji na kiasi, huku bado ikiruhusu mtandao kuthibitisha muamala ni halali. Pia ilihifadhi anwani za uwazi, hivyo mitindo yote miwili ipo kwenye mnyororo mmoja.

## Jaribu uelewa wako

Sprout mara nyingi huitwa uboreshaji wa mtandao wenye urefu wa uanzishaji. Kwa nini hilo si sahihi kabisa?

<details>
<summary>Jibu</summary>

Sprout ni uzinduzi wa awali wa Zcash, wala si uboreshaji wa baadaye. Imekuwa hai tangu block ya mwanzo (block 0) tarehe 28 Oktoba 2016, kwa hivyo hakuna urefu wa uanzishaji wa kuonyesha. Mbinu ya uboreshaji wa mtandao ilikuja baadaye na kuita kanuni za Sprout kitambulisho cha tawi la makubaliano 0, msingi kabla ya uboreshaji wowote.
</details>

### Rasilimali

[ZIP 200: Mbinu ya Uboreshaji wa Mtandao](https://zips.z.cash/zip-0200)

[Zcash maboresho ya mtandao](https://z.cash/upgrade/)

[Electric Coin Company: Uzinduzi wa Zcash Sprout](https://electriccoin.co/blog/zcash-sprout-launch/)

[Electric Coin Company: Muundo wa Sherehe](https://electriccoin.co/blog/the-design-of-the-ceremony/)

### Tazama pia

[Mabwawa ya Faragha](../using-zcash/shielded-pools)

[zk-SNARKs](../zcash-tech/zk-snarks)

[Maboresho ya Mtandao wa Zcash](../start-here/network-upgrades)

[ZEC ni nini na Zcash ni nini](../start-here/what-is-zec-and-zcash)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

---

Mfululizo: [Faharasa ya Maboresho ya Mtandao](../start-here/network-upgrades) · Inayofuata: [Overwinter](../zcash-tech/overwinter)
