<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Sprout.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Mchanga

> Zcash ilizinduliwa mnamo Oktoba 28, 2016, na bwawa la Sprout lililohifadhiwa.

Utakachokumbuka: Sprout ni mahali ambapo Zcash ilianzia, mara ya kwanza fedha binafsi na zinazothibitika ziliendeshwa kwenye blockchain.

Sprout ni uzinduzi wa awali ya mtandao Zcash, si baadaye [kuboresha mtandao](../start-here/network-upgrades). Ilikuwa kuishi katika block genesis Oktoba 28, 2016. Hakuna idadi ZIP inafafanua Sprout: mchakato wa zip ilianza baadaye na Overwinter, hivyo sprout ni ilivyoelezwa kwa awali ya Zcash itifaki vipimo na Zerocash ujenzi ilikuwa kujengwa juu. [Electric Coin Company](../zcash-organizations/electric-coin-company) (then the Zerocoin Electric Coin Company), led by Zooko Wilcox, built and shipped it. Sprout introduced the first practical zk-SNARK shielded transactions and the original shielded pool, so people could send ZEC with the sender, receiver, and amount hidden while the network still checked that the balances added up. The name signaled a young, budding chain that the team expected to grow.

Why this matters. Every public blockchain before Sprout put your payments on display: anyone could see who paid whom and how much. Sprout was the first live, permissionless network to hide those details and still prove no one was cheating. That matters for ordinary financial privacy, the kind you expect from cash or a bank statement no one else can read. It also proved that strong on-chain privacy could work in practice, beyond a paper design. The trusted-setup Ceremony that made it possible became a reference point for later cryptography work, and the slow, memory-heavy proving system Sprout shipped with is exactly what pushed the team to build Sapling two years later.

## Dimbwi la kwanza lenye ulinzi wa kioo

Sprout created two kinds of addresses. Transparent addresses (t-addresses) work like Bitcoin, with the details visible on the public ledger. Shielded addresses (z-addresses) send funds into the Sprout [dimbwi lenye ulinzi](../using-zcash/shielded-pools), ambapo mtumaji, mpokeaji na kiasi kubaki siri. hila ni [zk-SNARKs](../zcash-tech/zk-snarks), zero-ujuzi uthibitisho kwamba basi manunuzi kuonyesha ni halali, bila matumizi mara mbili na mizani ambayo kuongeza juu ya, bila kufunua yoyote ya maelezo. Sprout ilikuwa mara ya kwanza hii mbio katika uzalishaji kwenye cryptocurrency kuishi.

![Transparent transactions expose sender, receiver, and amount, while Sprout shielded transactions hide all three yet stay verifiable](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sprout-shielded-vs-transparent.png)

## Sherehe ya Kufunga Miti

Zk-SNARKs katika Sprout zinahitaji seti ya vigezo vya umma, na kuzalisha kwa usalama inahitaji usanidi wa wakati mmoja unaoitwa Sherehe. Washiriki sita katika maeneo tofauti, mbali kila moja iliunda kipande cha siri kinachoitwa taka za sumu. Ikiwa mtu yeyote ataunganisha tena vipande vyote, wangeweza kutengeneza ZEC kutoka kitu chochote. Ubunifu uligeuza hatari hiyo kuwa sheria rahisi: maadamu angalau mshiriki mmoja aliharibu kipande chao, siri kamili haiwezi kujengwa upya, hivyo kudanganya hakuwezekani. Washirika ambao wametajwa hadharani ni pamoja na Zooko Wilcox, Andrew Miller, Peter Van Valkenburgh, Peter Todd, na Derek Hinch wa Kikundi cha NCC. Mshirikishi mmoja alichagua kubaki bila majina.

![The Ceremony: six participants generate private shards, then destroy the toxic waste, leaving only the public Sprout parameters](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sprout-ceremony-flow.png)

## Chanzo cha habari hiyo ni:

Sprout ni msingi kwamba kila mabadiliko ya baadaye hujenga juu. Wakati wa mtandao-upgrade utaratibu aliwasili na Overwinter, ilikuwa alama sheria za awali kama makubaliano tawi id 0, ambayo ina maana tu hakuna kuboresha imekuwa kutumika bado. Kila kitu tangu wakati huo (Overwinter , Sapling, Blossom, Heartwood, Canopy, NU5, NU6, na kuendelea) anakaa kwenye mnyororo sprout kuanza. uzinduzi ilitangazwa Agosti 2016 kwa 28 Oktoba genesis, Sherehe mbio katika wiki kabla, na kiini cha mwanzo block hardcoded timestamp anasoma Oktoba 28, 2016, saa 07:56 UTC .

![Timeline from the August 2016 announcement through the parameter Ceremony to the October 28, 2016 Sprout launch](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sprout-timeline.png)

## Orodha ya maneno

Neno la Kiingereza lisilo na maana.
|---|---|
zk-SNARK uthibitisho wa ujuzi sifuri unaoonyesha shughuli ni halali bila kufunua mtumaji, mpokeaji au kiasi.
Zcash ni sehemu ya faragha ambapo kiasi na vyama zimefichwa. Pool Sprout ilikuwa moja ya kwanza, ambayo ilianza kutumika katika miaka ya 1980 wakati wa kuanzishwa kwa Bitcoin (BTC).
DATA-ADRESS na T-ADDRESS. A Z-Adress ni kulindwa na anaendelea maelezo binafsi. a t-Anwani ni uwazi na inaonyesha taarifa juu ya kitabu cha umma.
Sherehe ya 2016 iliyoundwa na vyama vingi ambayo ilizalisha vigezo vya umma vya Sprout kisha ikaondoa taka zenye sumu.
-- taka zenye sumu-- vipande vya siri muhimu kutoka kwa sherehe ambayo ilibidi kuharibiwa hivyo ZEC hakuweza kuwa bandia.
◯ Idara ya makubaliano 0 ❖ Kiashiria cha sheria za Sprout, maana yake msingi kabla yoyote mtandao kuboresha.

## FAQs

Je, Sprout mabadiliko ZEC yangu au faragha leo? Hapana. sprout ni historia, uzinduzi kwamba ilianza mlolongo wako zEC anaishi juu ya sarafu yako na faragha yako leo hutegemea mkoba na kulindwa pool wewe kutumia sasa, si kwa kitu chochote unahitaji kufanya kuhusu Sprout.

Kwa nini hakuna namba ya ZIP kwa Sprout? mchakato wa ZIP ulianza baadaye, na kuboresha Overwinter. sprout ni uzinduzi asili, ilivyoelezwa na Zcash Itifaki Specification na Zerocash ujenzi ilikuwa msingi wake. zip 200 tu anataja Sprout katika retrospect, kama id ushirikiano tawi 0, baseline kabla yoyote upgrading.

Did I need to trust the six people in the Ceremony? The setup was built so you only needed one of them to be honest. Each held a secret piece, and as long as a single participant destroyed theirs, the full secret could never be rebuilt and no one could forge ZEC. Five participants have been named publicly and one stayed anonymous.

Je, Sprout pool moja mkoba wangu anatumia sasa? Pengine si. sprout ilikuwa kwanza kulindwa bwawa, lakini upgrades baadaye kama vile Sapling ilianzisha kasi zaidi ulinzi kubuni, na pochi wengi kutumia mabwawa mpya leo. chipukizi bado ni muhimu kama kazi ambayo imeonekana binafsi, shughuli verifiable inaweza kukimbia kwenye mtandao wa kuishi.

Nini alifanya Sprout tofauti na Bitcoin? Bitcoin unaweka kila malipo kwenye kitabu cha umma ambapo kiasi na anwani ni inayoonekana. sprout aliongeza shughuli ulinzi kwamba kuficha mtumaji, mpokeaji, na kiasi wakati bado kuruhusu mtandao kuthibitisha manunuzi halali. Ni kuweka wazi anwani pia, hivyo wote mitindo kuishi juu ya mlolongo huo.

## Jaribu uelewevu wako

Sprout mara nyingi huitwa kuboresha mtandao na urefu uanzishaji. Kwa nini kwamba si haki kabisa?

<details>
<summary>Answer</summary>

Sprout ni uzinduzi wa awali ya Zcash, si baadaye kuboresha. Imekuwa kazi tangu genesis block (block 0) Oktoba 28, 2016, hivyo hakuna uanzishaji urefu kwa uhakika na. mtandao-upgrade utaratibu alikuja baadae na tagged sheria za sprout kama makubaliano tawi id 0, msingi kabla yoyote upgrading.
</details>

### Rasilimali

[ZIP 200: Network Upgrade utaratibu](https://zips.z.cash/zip-0200)

[Zcash upgrades mtandao](https://z.cash/upgrade/)

[Electric Coin Company: Zcash Sprout uzinduzi](https://electriccoin.co/blog/zcash-sprout-launch/)

[Electric Coin Company: The Design of the Ceremony](https://electriccoin.co/blog/the-design-of-the-ceremony/)

### Angalia pia:

[Vidimbwi Vilivyohifadhiwa kwa Kifaa cha Kuzuia Mlipuko](../using-zcash/shielded-pools)

[zk-SNARKS](../zcash-tech/zk-snarks)

[Zcash Network Upgrades (Ubadilishaji wa Mtandao)](../start-here/network-upgrades)

[ZEC na Zcash ni nini?](../start-here/what-is-zec-and-zcash)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

---

Mfululizo: [Kiwango cha Upgrades Network](../start-here/network-upgrades) · Kisha: [Kuishi kwa majira ya baridi kali](../zcash-tech/overwinter)
