<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Canopy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Kivuli cha juu

> Canopy ilianza kutumika kwenye mtandao wa Zcash katika block 1,046,400 (Novemba 18, 2020 UTC).

Nini utachukua mbali: jinsi Zcash naendelea kufadhili maendeleo yake mwenyewe baada ya mwanzilishi tuzo kumalizika, na jinsi Canopy kuanzisha fedha mgawanyiko kwamba baadaye upgrades bado kujenga juu.

Canopy ni Zcash ya tano mtandao kuboresha, pia iitwayo Network Upgrade 4 (NU4). Ni kupelekwa na [ZIP 251 - Ujumbe wa posta.](https://zips.z.cash/zip-0251), and it activated at mainnet block 1,046,400 on November 18, 2020 (UTC), the same moment as Zcash's first block reward halving. Canopy was mainly a governance and monetary upgrade. It ended the original founders reward and started the new Zcash Development Fund, which pays the Electric Coin Company, the Zcash Foundation, and independent grant recipients. The policy behind that fund came out of an extended community governance process in 2019.

Why this matters. Zcash funds its own development from block rewards, because it has no company behind it. The founders reward that paid for its early years was set to end at the first halving. Canopy was the replacement: it routed a fixed share of each block reward into a Development Fund and set who receives it. That model was refined by later upgrades, up to [NU6.1](../zcash-tech/nu6-1).

![Before Canopy the founders reward funded development and was set to end at the first halving. After Canopy the Development Fund takes 20 percent of each block reward and runs to the second halving in 2024](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/canopy-founders-to-devfund.png)

## Mfuko wa maendeleo

Canopy kumaliza mwanzilishi awali malipo na kubadilishwa kwa Zcash Mfuko wa Maendeleo. mabadiliko alitua katika block moja kama kwanza halving ya Zcash, wakati kuzuia zawadi imeshuka kutoka 6.25 ZEC 3.125 ZEC. Hivyo wachimbaji waliona tuzo yao kukatwa nusu siku hiyohiyo kipande kipya cha kwamba kidogo thawabu ilianza mtiririko maendeleo.

Mfuko huo uliwekwa kuendesha kwa miaka minne, kutoka nusu ya kwanza mnamo Novemba 2020 hadi nusu ya pili mnamo 2024. sera iliyokubaliwa iliandikwa kama ifuatavyo: [ZIP 1014 - Ujumbe wa posta.](https://zips.z.cash/zip-1014). utaratibu wa makubaliano kwamba kweli huenda fedha ni kifedha mkondo utaratibi: [ZIP 207](https://zips.z.cash/zip-0207) ilianzisha njia ya jumla kuelekeza sehemu ya ruzuku kwa wateule maalum, na [ZIP 214 (Kifungo cha posta)](https://zips.z.cash/zip-0214) kuweka sheria maalum na anwani za wapokeaji kwa ajili ya Mfuko wa Maendeleo.

## Jinsi pesa zinavyogawanywa

Mfuko wa Maendeleo inachukua asilimia 20 ya kila block tuzo. wachimbaji kuweka wengine 80%. kwamba 20% ni kisha kugawanywa katika njia tatu, kufuatia ZIP 1014.

1. 35 percent to the Bootstrap Project, the parent organization of the Electric Coin Company.
2. Asilimia 25 kwa Zcash Foundation.
3. 40 asilimia kwa Major Grants, ambayo fedha kazi ya kujitegemea na inasimamiwa na Zcash Foundation. Major misaada baadaye akawa Zcash Community Misaada (ZCG).

Kupimwa dhidi ya malipo yote block badala tu mfuko, hisa hizo kazi nje kwa asilimia 7 Electric Coin Company, 5 per cent Zcash Foundation na 8 per cent Major misaada. njia zote mbili za kuelezea ni idadi sawa.

![The Development Fund is 20 percent of each block reward, split 35 percent to Bootstrap and the Electric Coin Company, 25 percent to the Zcash Foundation, and 40 percent to Major Grants](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/canopy-dev-fund-split.png)

## Mabadiliko ya bwawa la Sprout

Canopy pia alianza kustaafu ya zamani kulindwa pool. Sprout alikuwa Zcash kwanza kulindwa bwawa, na Canopy kuanza winding chini kwa njia ya [ZIP 211 - Ujumbe wa posta.](https://zips.z.cash/zip-0211).

Kutoka wakati Canopy kuanzishwa, hakuna thamani mpya inaweza kuwa aliongeza katika shina bwawa. Katika suala la kiufundi, vpub_old uwanja wa kila JoinSplit lazima zero. Fedha tayari katika Sprout bado unaweza kutolewa, hivyo mtu yeyote ni imefungwa nje, lakini pool tu shrink kutoka hapa. Hii ni hatua ya kwanza kuelekea hatimaye deprecating urithi Shina bwawa kwa ajili ya mabwawa mapya ulinzi.

![Before Canopy, value could both enter and leave the Sprout pool. After Canopy, no new value can enter but withdrawals are still allowed](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/canopy-sprout-pool.png)

## Nyongeza za kiufundi

Pamoja na mabadiliko ya fedha, Canopy alikuwa ndogo mbili ZIPs kiufundi. [ZIP 212 - Ujumbe wa posta.](https://zips.z.cash/zip-0212) iliyopita jinsi mpokeaji hupata siri ya muda mfupi Sapling, kupata kutoka maandishi wazi note. [ZIP 215 - Ujumbe wa posta.](https://zips.z.cash/zip-0215) aliandika sheria wazi kwa ajili ya kuthibitisha Ed25519 saini, hivyo kila node anakubaliana juu hasa ambayo ishara kuhesabu kama halali.

## Orodha ya maneno

Neno la Kiingereza lisilo na maana.
|---|---|
Waanzishaji malipo. awali ya ufadhili mfano kwamba kulipwa kwa ajili ya maendeleo Zcash mapema, imepangwa mwisho katika halving kwanza.
Mfuko wa Maendeleo. asilimia 20 ya sehemu ya kila malipo block kwamba Canopy routed kwa maendeleo, mbio na nusu pili.
 Block malipo (rushi) ZEC mpya kuundwa na kulipwa nje kama kila block ni kuchimbwa.
Halving Tukio lililopangwa ambapo tuzo ya kuzuia hupunguzwa kwa nusu.
 mkondo wa fedha. utaratibu makubaliano (ZIP 207) kwamba inaelekeza sehemu ya misaada kuzuia kwa anwani za kipekee kupokea.
Sprout pool. Zcash ya awali kulindwa bwawa, ambayo Canopy kusimamishwa kukubali thamani mpya katika...

## FAQs

Je, Canopy kubadilisha ZEC yangu au faragha? Hapana. canopy ni kuhusu jinsi ya maendeleo unafadhiliwa, pamoja na baadhi ya sheria za kiufundi. mizani yako na shughuli zako kulindwa si walioathirika.

Did Canopy cut the block reward? Canopy activated at the same block as Zcash's first halving, which cut the reward from 6.25 ZEC to 3.125 ZEC. The halving is part of Zcash's monetary policy. Canopy's job was to decide how a share of that smaller reward is used.

What is the Development Fund for? It funds the people building Zcash. The money goes to the Electric Coin Company (through the Bootstrap Project), the Zcash Foundation, and Major Grants, which supports independent work.

Je, bado unaweza kutumia fedha katika shina pool? Ndiyo. Unaweza bado kuondoa fedha ambazo tayari ni katika Shina. Huwezi tu kuongeza thamani mpya ndani yake baada ya Canopy.

Je, Mfuko wa Maendeleo ni wa kudumu? La. Ulikuwa umepangwa kuendesha kwa miaka minne, kutoka nusu ya kwanza mnamo Novemba 2020 hadi nusu ya pili mnamo 2024, ikitoa wakati wa jamii kuona jinsi inavyofanya kazi kabla ya kuiangalia tena.

How does Canopy relate to NU6 and NU6.1? Canopy set up the three-way funding split and the funding stream machinery. Later upgrades, including NU6 and NU6.1, revisited and reshaped the Development Fund built on top of that foundation.

## Jaribu uelewevu wako

Canopy kuanzishwa katika block sawa na Zcash ya kwanza halving. Kwa nini wakati huo alichaguliwa, na ni nini kingetokea kwa fedha za maendeleo bila Canopy?

<details>
<summary>Answer</summary>

Msingi wa mwanzilishi zawadi ilikuwa imepangwa mwisho katika kwanza halving. Bila Canopy, wote ndogo baada ya nusu block malipo ingekuwa wamekwenda kwa wachimbaji, na kuacha hakuna itifaki-kiwango cha fedha za maendeleo. Canopy badala ya waanzilishi tuzo na Mfuko Development saa kwamba kuzuia halisi, hivyo ufadhili iliendelea bila pengo.
</details>

### Rasilimali

[ZIP 251: kupelekwa kwa Upgrading Canopy Network](https://zips.z.cash/zip-0251)

[ZIP 1014: Kuanzisha Mfuko wa Dev kwa ECC, ZF na Misaada Mkubwa](https://zips.z.cash/zip-1014)

[ZIP 207: Fedha Streams](https://zips.z.cash/zip-0207)

[ZIP 214: Kanuni za makubaliano kwa ajili ya Mfuko wa Maendeleo Zcash](https://zips.z.cash/zip-0214)

[ZIP 211: Disabling Kuongeza ya thamani mpya kwa Chipukizi Chain Thamani Pool](https://zips.z.cash/zip-0211)

[Canopy Network Upgrade (Upakuaji wa Mtandao)](https://z.cash/upgrade/canopy/)

### Angalia pia:

[Zcash Network Upgrades (Ubadilishaji wa Mtandao)](../start-here/network-upgrades)

[Mfuko wa Maendeleo](../start-here/development-fund)

[Zcash Sera ya Fedha](../start-here/zcash-monetary-policy)

[Vidimbwi Vilivyohifadhiwa kwa Kifaa cha Kuzuia Mlipuko](../using-zcash/shielded-pools)

[NU6.1](../zcash-tech/nu6-1)

[Utawala wa Zcash](../zcash-community/zcash-governance)

---

Mfululizo: [Kiwango cha Upgrades Network](../start-here/network-upgrades) · Zamani: [Miti ya moyo](../zcash-tech/heartwood) · Kisha: [NU5](../zcash-tech/nu5)
