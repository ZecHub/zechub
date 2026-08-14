<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Overwinter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Kuishi kwa majira ya baridi kali

> Overwinter alienda kuishi juu ya Zcash mainnet katika block 347,500 (Juni 26, 2018 UTC).

Nini utachukua mbali: jinsi Zcash kujifunza kubadilisha sheria zake mwenyewe salama, na kwa nini kwamba groundwork alifanya kila baadaye upgrades, kuanzia na Sapling, inawezekana.

Overwinter ni Zcash [kuboresha mtandao](../start-here/network-upgrades), ya kwanza baada ya mtandao ilizinduliwa. Ni ilivyoainishwa katika mapendekezo kadhaa Zcash Uboreshaji: [ZIP 200 - Ujumbe wa posta.](https://zips.z.cash/zip-0200), [ZIP 201](https://zips.z.cash/zip-0201), [ZIP 202 - Ujumbe wa posta.](https://zips.z.cash/zip-0202), [ZIP 203 - Ujumbe wa posta.](https://zips.z.cash/zip-0203), na [ZIP 143 - Ujumbe wa posta.](https://zips.z.cash/zip-0143)Overwinter hakuwa na kuongeza yoyote vipengele mpya ulinzi. Badala yake ni hardened itifaki ili upgrades baadaye inaweza meli salama. kuboresha imeandikwa kwa njia ya programu za kompyuta, kama vile Windows 10 au Mac OS X. [Electric Coin Company](../zcash-organizations/electric-coin-company) kwenye ukurasa rasmi wa kuboresha Zcash.

Why this matters. Changing the rules of a live blockchain is dangerous. Get it wrong and two versions of the network can disagree, or a transaction meant for one chain can be copied onto another. Before Overwinter, Zcash had no standard, replay-safe way to coordinate a rule change. Overwinter fixed that. It gave Zcash a formal process for upgrades and, just as important, two-way replay protection, so a transaction that is valid under one set of rules cannot be replayed under another. That groundwork is what made Sapling, and every upgrade after it, possible to activate cleanly.

![Before and after Overwinter: before, no standard upgrade path and no replay protection. After, a network upgrade mechanism with two-way replay protection and safe future upgrades](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/overwinter-before-after.png)

## Utaratibu wa kuboresha

Overwinter ilianzisha Network Upgrade utaratibu, ilivyoelezwa katika [ZIP 200 - Ujumbe wa posta.](https://zips.z.cash/zip-0200). Every upgrade now defines two things: a consensus branch id that names the current set of rules, and an activation height, the block at which the new rules take effect. This gives everyone running Zcash software a clear window to update before the switch.

Overwinter yenyewe kuanzishwa kwenye mainnet katika block 347.500.

[ZIP 201](https://zips.z.cash/zip-0201) kushughulikia jinsi nodes kutibu kila mmoja karibu kuboresha. Kabla ya uanzishaji, nodes wanapendelea kuungana na wenzao mbio toleo moja. Wakati wa uanzishwaji, node disconnects kutoka kwa wenzake kwamba ni juu ya tawi tofauti makubaliano, hivyo mtandao hugawanyika safi pamoja sheria mpya badala ya kupata kuchanganyikiwa.

## Kucheza tena ulinzi

Replay ni wakati mtu inachukua shughuli ambayo ilikuwa halali juu ya mlolongo mmoja na rebroadcasts yake kwenye mwingine. Overwinter kufunga kwamba mlango kwa mpango mpya saini, ilivyoelezwa katika [ZIP 143 - Ujumbe wa posta.](https://zips.z.cash/zip-0143)Wakati mkoba saini shughuli, sahihi sasa ahadi kwa mlolongo wa mkataba id ya. Shughuli iliyosainiwa kwa ajili ya tawi moja ni tu si halali juu ya matawi mengine yoyote, katika mwelekeo wowote. Hiyo ndiyo maana mbili-njia replay ulinzi ina maana.

Hii kazi mkono kwa mkono na toleo jipya 3 shughuli format kutoka [ZIP 202 - Ujumbe wa posta.](https://zips.z.cash/zip-0202), wakati mwingine huitwa Overwintered format. Inaongeza fOverwintered bendera na toleo kundi id ambayo kufanya wazi ni seti ya makubaliano sheria shughuli anamilikiwa kwa. Kama faida upande, mpango mpya saini pia kuboreshwa jinsi haraka manunuzi uwazi ni kuthibitishwa.

![How replay protection works: a wallet signs a transaction that commits to the current consensus branch id, so the transaction cannot be replayed on any other branch](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/overwinter-replay-flow.png)

## Mpango wa kumalizika muda wake

[ZIP 203 - Ujumbe wa posta.](https://zips.z.cash/zip-0203) added transaction expiry. A transaction can now set an expiration block height. If it has not been mined by that height, nodes drop it from the mempool, the waiting room of unconfirmed transactions. Before this, a transaction could sit unconfirmed for a long time. Expiry means a stuck transaction eventually clears on its own, which reduces uncertainty for you and keeps the mempool from filling up with old, unmined transactions.

## Mahali panapofaa

Overwinter ilikuwa ya kwanza Zcash mtandao kuboresha baada ya Oktoba 2016 mainnet uzinduzi, na ni kusafirishwa makusudi mbele Sapling. kazi yake alikuwa miundombinu, si makala. Kwa kufunga upgrading utaratibu na mashine replay-ulinzi wa kwanza, alitoa kila baadaye kuongeza (Sapling, Blossom, Heartwood, Canopy, NU5, na wale baada) njia salama kuamsha.

![Timeline from the October 2016 Sprout launch, through the 2016 to 2018 stretch with no upgrade framework, to Overwinter in June 2018](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/overwinter-timeline.png)

## Orodha ya maneno

Neno la Kiingereza lisilo na maana.
|---|---|
 Network Upgrade (NU)  mabadiliko uratibu kwa Zcash ya makubaliano sheria, ulioamilishwa katika block kuweka urefu.
◯ Id ya tawi la makubaliano. Kitambulisho kifupi ambacho kinaita seti ya sasa ya sheria za makubaliani.
│Kiwango cha uanzishaji.‬️ Kiwango ambacho sheria mpya za uboreshaji wa mtandao huanza kutumika.‬
│ Ulinzi wa kurudia.‬ Kanuni ambayo huzuia shughuli halali kwenye mlolongo mmoja kutumiwa tena katika mwingine.‬
Mempool. Hifadhi ya shughuli ambazo zimetangazwa lakini bado kuchimbwa katika block.
☐ Transaction expiry. A mwisho block urefu baada ya ambayo unmined shughuli ni imeshuka.

## FAQs

Overwinter iliyopita ZEC yangu au faragha? No. Overwinters aliongeza hakuna makala mpya na wala kugusa shughuli ulinzi. Ilikuwa mabomba kwa ajili ya upgrades salama baadaye. fedha yako na faragha walikuwa unaffected.

Je, Overwinter kuongeza Sapling au anwani ulinzi? La. Overwinters aliongeza hakuna vipengele kulindwa. Ni tayari ardhi ili Sapling inaweza kuamsha salama baadaye.

Ni nini id ya tawi la makubaliano? Ni lebo fupi ambayo inataja seti ya sasa ya sheria. Shughuli zinajitolea wakati zinasainiwa, na ndio inayompa Zcash ulinzi wake wa kurudia.

Kwa nini baadhi ya vyanzo vinasema Juni 25 na wengine 26? Overwinter ilianzishwa saa 01:37 UTC mnamo Juni 26, 2018. Hiyo ni baada tu ya usiku wa manane UTC, hivyo katika maeneo mengi ya Magharibi wakati wa mitaa bado kusoma Juni 25. Ni block moja na muda huo.

Nini ni shughuli ya kumalizika muda mzuri kwa ajili? Ina maana biashara ambayo kamwe anapata kuchimbwa si linger milele. Baada urefu wake wa mwisho, nodes kuacha yake, hivyo wewe hawako kushoto nadhani kuhusu malipo kukwama.

Je, ninahitaji kufanya kitu chochote? Hapana. Overwinter ulioamilishwa mwaka 2018. yoyote ya sasa Zcash mkoba au node tayari ifuatavyo sheria hizi.

## Jaribu uelewevu wako

Overwinter aliongeza hakuna vipengele mpya ulinzi. Hivyo kwa nini ni kuchukuliwa moja ya upgrades muhimu zaidi katika historia Zcash?

<details>
<summary>Answer</summary>

Kwa sababu ilijenga mashine ambayo kila upgrades baadaye inategemea. Overwinter alianzisha Network Upgrade utaratibu na pande mbili replay ulinzi, kutoa Zcash kiwango cha juu, njia salama ya kubadilisha makubaliano yake sheria. Bila kwamba groundwork, Sapling na upgrads baada hawezi kuwa ulioamilishwa safi.
</details>

### Rasilimali

[ZIP 200: Network Upgrade utaratibu](https://zips.z.cash/zip-0200)

[ZIP 201: Mtandao Peer Management kwa Overwinter](https://zips.z.cash/zip-0201)

[ZIP 202: Toleo 3 Transaction Format kwa Overwinter](https://zips.z.cash/zip-0202)

[ZIP 203: Transaction Mwisho wa muda.](https://zips.z.cash/zip-0203)

[ZIP 143: Transaction Signature Validation kwa ajili ya Overwinter](https://zips.z.cash/zip-0143)

[Overwinter Mtandao Upgrade](https://z.cash/upgrade/overwinter/)

### Angalia pia:

[Zcash Network Upgrades (Ubadilishaji wa Mtandao)](../start-here/network-upgrades)

[Vidimbwi Vilivyohifadhiwa kwa Kifaa cha Kuzuia Mlipuko](../using-zcash/shielded-pools)

[Nodes kamili](../zcash-tech/full-nodes)

[NU6.1](../zcash-tech/nu6-1)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

[ZEC na Zcash ni nini?](../start-here/what-is-zec-and-zcash)

---

Mfululizo: [Kiwango cha Upgrades Network](../start-here/network-upgrades) · Zamani: [Mchanga](../zcash-tech/sprout) · Kisha: [Sapling](../zcash-tech/sapling)
