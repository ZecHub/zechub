<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Shielded_Pools.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Thamani Pools 

## TL;DR

- Zcash kwa sasa ina ** 4 thamani ya mabwawa**: Sprout (urithi), Sapling, Orchard na Uwazi.
- ** Orchard** ni sasa msingi kulindwa bwawa kutumika kwa Unified anwani (u1...).
- ** Sapling** (z-maadirisha kuanza na `zs`) bado inasaidiwa sana na inaendelea kupata kiasi kikubwa cha ZEC iliyohifadhiwa.
- **Transparent** anwani (t...) kutoa hakuna shughuli faragha na kazi sawa na Bitcoin.
- **Sprout** ni urithi kulindwa pool kwamba imekuwa kustaafu kutoka matumizi ya kazi.
- Hifadhi ya baadaye iliyohifadhiwa inayojulikana kama ** Ironwood** imependekezwa kuimarisha uaminifu katika utimilifu wa usambazaji wa ZEC uliohifadhiwe wakati unalinda faragha.
- Kwa dhamana nguvu faragha, watumiaji wanapaswa kuendelea kupendelea ** shielded-to-shielded (z → z)** shughuli wakati wowote iwezekanavyo.


<br/>

## Kuelewa Zcash Thamani Pools

Zcash hutenganisha fedha katika mifumo tofauti ya uhasibu inayojulikana kama makundi thamani. kila kundi ina sheria zake mwenyewe cryptographic na mali faragha, wakati itifaki hufuatilia jumla ya thamani kusonga kati yao.

Leo, mtandao ina nne msingi thamani mabwawa:

- Uwazi  Umma na kuonekana kikamilifu kwenye mnyororo.
- Sapling  Ni dimbwi la kwanza lililotumiwa sana na watu wengi.
- Orchard  sasa msingi kulindwa bwawa kuletwa na Unified anwani.
- Sprout  Hifadhi ya asili iliyohifadhiwa ilizinduliwa na Zcash mnamo 2016.
  


Kama Zcash inavyoendelea, mifuko mpya ya ulinzi inaweza kuletwa ili kuboresha usalama, faragha, matumizi na ukaguzi wakati wa kudumisha utangamano na fedha zilizopo.

<br/>

![img1](/content-images/4ba8cca2-cea5-42d2-8ec2-2122b26f5144-9db37e245e.webp)
Mchoro 1: Chati inayoonyesha hifadhi 4 za sasa kutoka Oktoba, 2025

<br/>

## Vidimbwi Vilivyohifadhiwa kwa Kifaa cha Kuzuia Mlipuko 


1. <h3 id="orchard" class="text-3xl font-bold my-4">Orchard Pool</h3>


![img2](/content-images/a672e001-6dbc-4e76-ab31-0ed7d7d2ff72-93b5a23e5d.webp)
Mchoro 2: Chati inayoonyesha bwawa la Orchard mnamo Oktoba, 2025

<br/>

Orchard Shielded Pool ilianzishwa mnamo Mei 31, 2022 kama sehemu ya uboreshaji wa mtandao wa NU5. Orchard alianzisha itifaki mpya iliyohifadhiwa ambayo ilikomesha hitaji la usanidi unaotarajiwa na ikawa dimbwi kuu lililohifadhiwe linalotumiwa na Anwani za Umoja (UA).

Orchard kwa kiasi kikubwa kuboreshwa usability, ufanisi na faragha kwa kupunguza shughuli metadata kuvuja na kuanzisha zaidi rahisi manunuzi mfano msingi Vitendo badala ya jadi ulinzi pembejeo na pato.

Leo, Orchard bado ni msingi kulindwa pool kwa Zcash. Hata hivyo, jamii inachunguza uhamiaji wa baadaye na mpya kulinda bwawa aitwaye Ironwood, ambayo itatoa dhamana ya ziada kuhusu usahihi wa ulinzi ZEC ugavi wakati kuhifadhi usalama udhamini wa Zcash ya.

[Zcash wallets Shielded] (Mifuko ya fedha iliyo na kinga)](/wallets) sasa msaada Orchard.

____

2. <h3 id="sapling" class="text-3xl font-bold my-4">Sapling Pool</h3>


![img3](/content-images/b1c6bb71-9356-45eb-8e4a-19d7cf1790ae-5e3051b082.webp)
Mchoro 3: Chati inayoonyesha bwawa la Sapling mnamo Oktoba, 2025

<br/>

[Zcash Sapling]](https://z.cash/upgrade/sapling) ilikuwa ni upgrading ya Zcash protocol iliyotangazwa tarehe 28 Oktoba, 2018. Ni uboreshaji mkubwa juu ya toleo la awali linalojulikana kama Sprout ambalo lilikuwa na mapungufu kadhaa katika suala la faragha, ufanisi na matumizi. 

Baadhi ya upgrades ni pamoja na utendaji bora kwa anwani ulinzi, Kuboreshwa kuona funguo kuwawezesha watumiaji kuangalia shughuli zinazoingia na zinazotoka bila kufichua mtumiaji siri muhimu na Independent Zero maarifa keys kwa ajili ya vifaa mkoba wakati wa usajili manunuzi. 

Zcash Sapling inaruhusu watumiaji kufanya shughuli binafsi katika sekunde chache tu ikilinganishwa na muda mrefu ilichukua katika Sprout Series. 

Transaction shielding enhances privacy, making it impossible for third-parties to link transactions and determine the amount of ZEC being transferred. Sapling also improves usability by reducing the computational requirements for generating private transactions by making it more accessible to users.

Sapling wallet addresses begin with "zs" and this can be observed in all supported Zcash Shielded Wallet (YWallet, Zingo Wallet Nighthawk etc.) which has built-in Sapling addresses. Zcash Sapling represents a significant development in technology when it comes to privacy and efficiency of transactions which makes Zcash a practical and effective cryptocurrency for users who value privacy and security.

____

3. <h3 id="sprout" class="text-3xl font-bold my-4">Sprout Pool</h3>


![img4](/content-images/956eceed-f4d6-4087-99d0-32a770449dda-a3cc45305e.webp)
Mchoro 4: Chati inayoonyesha bwawa la Sprout mnamo Oktoba, 2025

Sprout ilikuwa ya kwanza kabisa wazi ruhusa Zero maarifa faragha itifaki milele ilizinduliwa. Ilizinduliwa tarehe 28 Oktoba, 2016.

Anwani za Sprout hutambuliwa na herufi zao mbili za kwanza ambazo daima ni "zc". Iliitwa "Sprout" kwa kusudi kuu la kusisitiza kuwa programu hiyo ilikuwa mpya, blockchain inayoibuka yenye uwezo mkubwa wa kukua na kufunguliwa kwa maendeleo. 

Sprout ilitumika kama chombo mapema kwa [Zcash polepole kuanza Mining]](https://electriccoin.co/blog/slow-start-and-mining-ecosystem/) ambayo imesababisha usambazaji wa ZEC na Block zawadi kwa wachimbaji. 

As the Zcash ecosystem continued  to expand with increasing number of shielded transactions, it was observed that the Zcash Sprout Series became limited and less efficient when it comes to user privacy, transaction scalability and processing. This led to the modification of the network and Sapling Upgrade. 

---
4. <h3 id="transparent" class="text-3xl font-bold my-4">Transparent Pool</h3>
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

## Wakati Ujao: Dimbwi la Ironwood

Jumuiya ya Zcash kwa sasa inachunguza dimbwi lililopendekezwa lililohifadhiwa linaloitwa Ironwood.

Ironwood ni iliyoundwa kushughulikia hivi karibuni aligundua na patched udhaifu katika Orchard ya kuthibitisha mfumo. Ingawa hakuna ushahidi kwamba uhaba alikuwa milele alitumia, Ironwood kutoa safu nyongeza ya uhakika kwa kuwezesha kudhibitiwa kuhamia kutoka Orchard ndani mpya umba kulindwa bwawa.

Lengo si kuchukua nafasi ya faragha Zcash, lakini kuimarisha imani katika uadilifu wa shielded usambazaji ZEC.

## Chini ya pendekezo:

1. Shughuli mpya za kulinda zilikuwa zikielekea polepole kwenye Ironwood.
2. Fedha zilizopo za Orchard zinaweza kuhamishwa kwa faragha.
3. Uhasibu wa umma turntile itatoa ushahidi mkubwa kwamba fedha zote kulindwa kubaki kikamilifu mkono.
4. Watumiaji wangehifadhi ulinzi wa faragha sawa wanatarajia kutoka Zcash.

<br/>
Kama kuanzishwa kwa njia ya upgrades mtandao baadaye, Ironwood itakuwa kizazi cha pili cha mazingira Zcash wa ulinzi wakati kuhifadhi utangamano na fedha zilizopo walinzi.

<br/>

## Makosa ya Kawaida Yaepukwayo

- ** Kutuma kutoka t-anwani ya T anwani**  umma kabisa, hakuna faragha. Daima kulinda fedha kwanza.
- **Kusababisha utata katika anwani za Sapling na Orchard**  Anwani za sapling zinaanza kwa `zs`, Orchard/Unified anwani kuanza na `u1`
- ** Kuondoka fedha katika shina pool**  Chipukizi ni deprecated; kuhamia fedha kwa Orchard
- ** Kufikiria t → z (kuzuia) ni binafsi kabisa**  kitendo cha kuzuia yenyewe inaonekana kwenye mnyororo; yaliyomo si

---

## Kurasa Zinazohusiana

- [Mifuko ya fedha](/using-zcash/wallets)  Ni pochi ambayo inasaidia Orchard na Sapling mabwawa
- [Mashirika ya biashara]](/using-zcash/transactions)  Jinsi ya kutuma shughuli shielded
- [Kununua ZEC](/using-zcash/buying-zec)  Kupata ZEC kabla ya kuitumia katika makundi
- [ZK-SNARKs](/zcash-tech/zk-snarks)  msingi cryptographic ya mabwawa shielded
- [Ni nini ZEC na Zcash](/start-here/what-is-zec-and-zcash)  Background juu ya faragha Zcash
