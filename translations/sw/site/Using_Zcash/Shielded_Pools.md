<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Shielded_Pools.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Thamani Pools 

## TL;DR

- Zcash kwa sasa ina ** 5 thamani ya mabwawa**: Sprout (urithi), Sapling, Orchard (kutumia tu), Ironwood na Uwazi.
- ** Ironwood** ni sasa msingi kulindwa pool, kuishi tangu NU6.3 kuboresha tarehe 28 Julai 2026.
- **Orchard** sasa ni **tumia tu: hakuna thamani mpya inaweza kuingia ndani yake, na fedha zilizopo kuhamia nje katika Ironwood.
- ** Sapling** (z-maadirisha kuanza na `zs`) bado inasaidiwa sana na inaendelea kupata kiasi kikubwa cha ZEC iliyohifadhiwa.
- **Transparent** anwani (t...) kutoa hakuna shughuli faragha na kazi sawa na Bitcoin.
- **Sprout** ni urithi kulindwa pool kwamba imekuwa kustaafu kutoka matumizi ya kazi.
- Uhamiaji wa Orchard kwenda Ironwood unaendelea na unakaguliwa hadharani kwa njia ya turnstile.
- Kwa dhamana nguvu faragha, watumiaji wanapaswa kuendelea kupendelea ** shielded-to-shielded (z → z)** shughuli wakati wowote iwezekanavyo.


<br/>

## Kuelewa Zcash Thamani Pools

Zcash hutenganisha fedha katika mifumo tofauti ya uhasibu inayojulikana kama makundi thamani. kila kundi ina sheria zake mwenyewe cryptographic na mali faragha, wakati itifaki hufuatilia jumla ya thamani kusonga kati yao.

Leo, mtandao ina tano msingi thamani mabwawa:

- Uwazi  Umma na kuonekana kikamilifu kwenye mnyororo.
- Sapling  Kwanza sana kupitishwa kisasa kulindwa pool, bado kazi.
- Orchard  awali msingi kulindwa pool, sasa kutumia tu.
- Ironwood  sasa msingi kulindwa pool, kuletwa na NU6.3.
- Sprout  Hifadhi ya asili iliyohifadhiwa ilizinduliwa na Zcash mnamo 2016.
  


Kama Zcash inavyoendelea, mifuko mpya ya ulinzi inaweza kuletwa ili kuboresha usalama, faragha, matumizi na ukaguzi wakati wa kudumisha utangamano na fedha zilizopo.

<br/>

![img1](/content-images/4ba8cca2-cea5-42d2-8ec2-2122b26f5144-9db37e245e.webp)
Mchoro 1: Chati inayoonyesha hifadhi 4 za sasa kutoka Oktoba, 2025

<br/>

## Vidimbwi Vilivyohifadhiwa kwa Kifaa cha Kuzuia Mlipuko 


1. <h3 id="ironwood" class="text-3xl font-bold my-4">Ironwood Pool</h3>

Ironwood ni sasa msingi kulindwa pool. Ni ulioamilishwa tarehe 28 Julai 2026 katika block 3,428,143 kama sehemu ya NU6.3 mtandao kuboresha, na ambapo mpya walinzi thamani sasa anaishi.

Kuna sababu udhaifu ulipatikana katika mfumo wa kuthibitisha Orchard mnamo Mei 2026. Hakuna ushahidi kwamba umewahi kutumiwa, lakini kasoro hiyo ilimaanisha usambazaji uliohifadhiwa hauwezi kudhibitishwa kuwa mzuri na uthibitisho peke yake. Badala ya kurekebisha mahali pake, mtandao ulibuni dimbwi jipya lenye mzunguko uliosahihishwa na kuhamisha thamani kwenye turnstile ambayo inahesabu kila sarafu hadharani. Uhasibu huo ndio unarudisha dhamana kwamba usambaishaji unaohifadhiwe umerudiwa kikamilifu.

Ironwood reuses Orchard ya Action mfano na Halo 2 uthibitisho, hivyo ni tabia njia sawa siku kwa siku. Mambo mawili mpya: shughuli kutumia v6 format, na noti Ironwood ni ** quantum-recoverable** chini [ZIP 2005 - Ujenzi wa Jengo la Makao Makuu ya Ulaya](https://zips.z.cash/zip-2005), maana yake sarafu ya on-chain rekodi anakaa recoverable kama baadaye quantum kompyuta kuvunja leo cryptography. Hiyo ni njia ahueni, si upinzani Quantum, na haina kuomba kwa mabwawa wakubwa zaidi.

Huna haja ya anwani mpya. Unified anwani bundle wapokeaji kadhaa, na pochi kuchagua pool haki kwa ajili yenu.

____

2. <h3 id="orchard" class="text-3xl font-bold my-4">Orchard Pool</h3>


![img2](/content-images/a672e001-6dbc-4e76-ab31-0ed7d7d2ff72-93b5a23e5d.webp)
Mchoro 2: Chati inayoonyesha bwawa la Orchard mnamo Oktoba, 2025

<br/>

Orchard Shielded Pool ilianzishwa mnamo Mei 31, 2022 kama sehemu ya uboreshaji wa mtandao wa NU5. Orchard alianzisha itifaki mpya iliyohifadhiwa ambayo ilikomesha hitaji la usanidi unaotarajiwa na ikawa dimbwi kuu lililohifadhiwe linalotumiwa na Anwani za Umoja (UA).

Orchard kwa kiasi kikubwa kuboreshwa usability, ufanisi na faragha kwa kupunguza shughuli metadata kuvuja na kuanzisha zaidi rahisi manunuzi mfano msingi Vitendo badala ya jadi ulinzi pembejeo na pato.

Tangu Ironwood kuboresha kuanzishwa tarehe 28 Julai 2026, ** Orchard ni kutumia tu. Hakuna thamani mpya inaweza kuingia bwawa. Fedha tayari uliofanyika kuna bado unaweza kutumika, na ni wakihamia nje katika Ironwood kupitia turnstile ya. pochi kushughulikia hii kwa ajili yenu, ingawa wengi kukupa baadhi ya udhibiti juu ya kasi.

Kama wewe kushikilia Orchard fedha, angalia [Mti wa chuma](/zcash-tech/ironwood) kwa maana ya uhamiaji katika mazoezi.

____

3. <h3 id="sapling" class="text-3xl font-bold my-4">Sapling Pool</h3>


![img3](/content-images/b1c6bb71-9356-45eb-8e4a-19d7cf1790ae-5e3051b082.webp)
Mchoro 3: Chati inayoonyesha bwawa la Sapling mnamo Oktoba, 2025

<br/>

[Zcash Sapling (Kichekesho cha Kijani)](https://z.cash/upgrade/sapling) ilikuwa ni upgrading ya Zcash protocol iliyotangazwa tarehe 28 Oktoba, 2018. Ni uboreshaji mkubwa juu ya toleo la awali linalojulikana kama Sprout ambalo lilikuwa na mapungufu kadhaa katika suala la faragha, ufanisi na matumizi. 

Baadhi ya upgrades ni pamoja na utendaji bora kwa anwani ulinzi, Kuboreshwa kuona funguo kuwawezesha watumiaji kuangalia shughuli zinazoingia na zinazotoka bila kufichua mtumiaji siri muhimu na Independent Zero maarifa keys kwa ajili ya vifaa mkoba wakati wa usajili manunuzi. 

Zcash Sapling inaruhusu watumiaji kufanya shughuli binafsi katika sekunde chache tu ikilinganishwa na muda mrefu ilichukua katika Sprout Series. 

Transaction shielding enhances privacy, making it impossible for third-parties to link transactions and determine the amount of ZEC being transferred. Sapling also improves usability by reducing the computational requirements for generating private transactions by making it more accessible to users.

Sapling wallet addresses begin with "zs" and this can be observed in all supported Zcash Shielded Wallet (YWallet, Zingo Wallet Nighthawk etc.) which has built-in Sapling addresses. Zcash Sapling represents a significant development in technology when it comes to privacy and efficiency of transactions which makes Zcash a practical and effective cryptocurrency for users who value privacy and security.

____

4. <h3 id="sprout" class="text-3xl font-bold my-4">Sprout Pool</h3>


![img4](/content-images/956eceed-f4d6-4087-99d0-32a770449dda-a3cc45305e.webp)
Mchoro 4: Chati inayoonyesha bwawa la Sprout mnamo Oktoba, 2025

Sprout ilikuwa ya kwanza kabisa wazi ruhusa Zero maarifa faragha itifaki milele ilizinduliwa. Ilizinduliwa tarehe 28 Oktoba, 2016.

Anwani za Sprout hutambuliwa na herufi zao mbili za kwanza ambazo daima ni "zc". Iliitwa "Sprout" kwa kusudi kuu la kusisitiza kuwa programu hiyo ilikuwa mpya, blockchain inayoibuka yenye uwezo mkubwa wa kukua na kufunguliwa kwa maendeleo. 

Sprout ilitumiwa kama chombo mapema kwa ajili ya [Zcash polepole kuanza Mining](https://electriccoin.co/blog/slow-start-and-mining-ecosystem/) ambayo imesababisha usambazaji wa ZEC na Block zawadi kwa wachimbaji. 

As the Zcash ecosystem continued  to expand with increasing number of shielded transactions, it was observed that the Zcash Sprout Series became limited and less efficient when it comes to user privacy, transaction scalability and processing. This led to the modification of the network and Sapling Upgrade. 

---
5. <h3 id="transparent" class="text-3xl font-bold my-4">Transparent Pool</h3>
<br/>

![img5](/content-images/01de2907-b62d-4421-83d7-ea4908faa828-6f74b724ed.webp)
Mchoro 5: Chati inayoonyesha kundi la Uwazi kama ya Oktoba, 2025

<br/>

Zcash Transparent pool ni unshielded na si binafsi. Usimamizi wa mkoba kwenye Zcash kuanza kwa barua "t", faragha ni ya chini sana katika kutumia aina hii anwani kwa ajili ya shughuli.

Utaftaji wa uwazi katika Zcash ni sawa na shughuli za Bitcoin ambazo zinasaidia mikataba ya saini nyingi na kutumia anwani za kawaida za umma.

Zcash Transparent ni zaidi kutumika na kubadilishana centralized kuhakikisha kuna uwazi juu na mtandao uthibitisho wakati wa kutuma na kupokea ZEC kati ya watumiaji.

Ni muhimu pia kutambua kwamba wakati Zcash Shielded anwani hutoa faragha ya juu wakati wa shughuli, wao pia zinahitaji rasilimali zaidi za kompyuta ili kusindika shughuli. Kwa hiyo, baadhi ya watumiaji wanaweza kupitisha Anwani Uwazi kwa ajili ya shughuli ambayo haina kuhitaji kiwango sawa cha faragha.

<br/>

## Kuhamisha Pool Ilipendekeza Mazoezi

Linapokuja suala la kuzingatia kiwango cha juu cha faragha wakati wa shughuli kwenye Mtandao wa Zcash, inashauriwa kufuata mazoea ya chini;

Transaction occurring between "z to z" wallets on the Zcash blockchain are mostly shielded and it is sometimes called Private Transaction due to the high level of Privacy generated. This is usually the best and the most recommended way of sending and receiving $ZEC when privacy is required. 

---

Wakati kutuma ZEC kutoka "Z-anwani" kwa "T-Anwani", ni tu connotes aina ya Deshielding manunuzi. Katika aina hii ya shughuli, kiwango cha faragha si mara zote juu kama baadhi ya habari itakuwa inayoonekana kwenye blockchain kutokana na athari za kupeleka ZEC katika anwani Uwazi. deshielded manunuji daima haipendekezwi wakati wa mahitaji high usiri. 

---

Kuhamisha ZEC kutoka anwani ya Uwazi (T-anwani) kwa anwani za Z inajulikana tu kama Shielding. Katika aina hii ya shughuli kiwango cha faragha sio juu kila wakati ikilinganishwa na ile ya z -z manunuzi lakini pia inashauriwa wakati faragha inahitajika. 

---

Sending ZEC from a Transparent Address (T-address) to another Transparent Address (T-address) on Zcash Network (T-T transaction) is very similar to that of Bitcoin transaction and this is why T-T transactions on Zcash are always called Public transactions because both the sender and the receiver transaction details becomes visible to the public which makes the level of Privacy very low in such transaction. 

Wengi Cryptocurrency kubadilishana Centralized kutumia Uwazi Anwani ("T-anwani") linapokuja suala la kufanya manunuzi juu ya Zcash blockchain lakini aina hii ya shughuli (T-T) haitakuwa na mali yoyote binafsi.

<br/>

## The Orchard to Ironwood Migration

Uhamiaji ni kinachotokea sasa. Orchard imefungwa kwa amana mpya, na thamani bado kukaa huko ni kuhamishwa katika Ironwood shughuli moja kwa wakati mmoja. Unaweza kuangalia jumla ya saa [ironwood.live](https://ironwood.live/).

Nini hii ina maana inategemea ambapo fedha yako ni:

1. Shughuli mpya za ulinzi huingia Ironwood moja kwa moja. Hakuna cha kufanya.
2. ** Fedha zilizopo za Orchard** zinahitaji kuhamia. Mkoba uliohifadhiwa hufanya hii kwa ajili yako, kawaida katika hatua badala ya wote mara moja.
3. **Sapling haijaathiriwa** na bado inakubali fedha. Orchard pekee ndiyo iliyofungwa.
4. ** turnstile mahesabu kila kitu** kuvuka kati ya mabwawa, ambayo ni nini inathibitisha hakuna sarafu alikuwa zuliwa njiani.

> **One faragha tahadhari thamani ya kujua.** turnstile kuchapisha * kiasi cha kwamba kuvuka kati ya mabwawa, pamoja na block urefu. mtumaji na mpokeaji kubaki siri kama siku zote, lakini kipekee kiasi inaweza kuwa wanaohusishwa nyuma yenu. Hii ni kwa nini pochi kuhamia katika hatua kutumia majina standard badala ya kusonga mizani yako katika moja kutambulika lump. basi mkoba wako kasi yenyewe, na kufikiria kutumia Tor au VPN hivyo IP yako si amefungwa kwa kiasi wewe hoja.

Ona habari hii. [Mti wa chuma](/zcash-tech/ironwood) kwa ajili ya kuboresha yenyewe, na [Mzunguko wa Kioo cha Gari-Moshi](/zcash-tech/the-turnstile) kwa jinsi ya uhasibu kazi.

<br/>

## Makosa ya Kawaida Yaepukwayo

- ** Kutuma kutoka t-anwani ya T anwani**  umma kabisa, hakuna faragha. Daima kulinda fedha kwanza.
- ** Kwa kudhani Orchard bado inakubali fedha**  ni matumizi tu tangu 28 Julai 2026. Thamani inaweza kuondoka, lakini hakuna kitu kipya kinachoingia.
- **Kufanya kuchanganyikiwa kwa Sapling na Unified anwani**  Anwani za Sapling kuanza na `zs`. Unified anwani kuanza na `u1` na mfuko wapokeaji kadhaa, hivyo pool malipo yako ardhi katika inategemea ambayo mapokezi kwamba anwani hubeba
- ** Kuondoka fedha katika shina pool**  Chipukizi imekuwa deprecated kwa miaka; hoja hizo fedha nje
- ** Kutarajia uhamiaji kuwa kabisa asiyeonekana**  kiasi kuvuka turnstile ni umma, hata kama mtumaji na mpokeaji si wazi.
- ** Kufikiria t → z (kuzuia) ni binafsi kabisa**  kitendo cha kuzuia yenyewe inaonekana kwenye mnyororo; yaliyomo si

---

## Kurasa Zinazohusiana

- [Mti wa chuma](/zcash-tech/ironwood)  Kuboresha kwamba umba pool sasa
- [Mzunguko wa Kioo cha Gari-Moshi](/zcash-tech/the-turnstile)  Jinsi thamani kusonga kati ya makundi ni audited
- [Mkoba](/using-zcash/wallets)  Ni pochi ni iimarishwe na Ironwood tayari
- [Shughuli za biashara](/using-zcash/transactions)  Jinsi ya kutuma shughuli shielded
- [Kununua ZEC](/using-zcash/buying-zec)  Kupata ZEC kabla ya kuitumia katika makundi
- [ZK-SNARKs](/zcash-tech/zk-snarks)  msingi cryptographic ya mabwawa shielded
- [ZEC na Zcash ni nini?](/start-here/what-is-zec-and-zcash)  Background juu ya faragha Zcash
