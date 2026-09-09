<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transactions.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Shughuli za biashara

ZEC ni mali ya dijiti inayotumiwa sana kwa malipo, ikitoa huduma kali za faragha ambazo zinaifanya iweze kutumika katika shughuli anuwai kama kulipa marafiki, kununua au kutoa mchango. Ili kuongeza faragha na usalama, ni muhimu kuelewa jinsi aina tofauti za shughuli hufanya kazi ndani ya Zcash .

## TL;DR

- Zcash inasaidia aina mbili za shughuli: ** ulinzi wa**, ambayo huweka maelezo binafsi na * uwazi wa*, ambao rekodi yao hadharani.
- Anwani za kulindwa huanza na `u` or `z`. anwani uwazi kuanza na `t` na kutenda sana kama anwani Bitcoin.
- Chaguo ni lako kwa kila malipo. faragha ni chaguo Zcash inakupa, si kuweka mtu mwingine anaamua kwako.
- Kuondoa kutoka kubadilishana ni mahali pa kawaida watu kupoteza faragha. Kama kubadilisha tu inasaidia uondoaji wa uwazi, kulinda fedha mwenyewe mara moja wao kuwasili.
- Ada zifuatazo [ZIP 317 - Ujumbe wa posta.](https://zips.z.cash/zip-0317) Wallets bado kutuma ada ya zamani gorofa wanaweza kuona shughuli zao kuchelewa.
- Zaidi ya shughuli Zcash na urefu wa kumalizika muda chini ya [ZIP 203 - Ujumbe wa posta.](https://zips.z.cash/zip-0203). Kama shughuli muda wake kabla ya kuchimbwa, haiwezi kuthibitisha baada ya urefu huo wa kumalizika na inaweza kuwa zinahitajika kutumwa tena.

## Shughuli Shielded

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/bZM3o_eIovU"
    title="Zcash Explained: Zcash Shielded Transactions"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    ruhusuFullScreen
    loading="lazy"
  />
</div>

---

Utaftaji wa ulinzi hutokea wakati unahamisha ZEC kwenye mkoba wako uliolindwa. Anwani yako ya mkoba uliohifadhiwa huanza na a `u` or `z`Wakati kutuma shughuli ulinzi, wewe na watu kufanya manunuzi kwa unaweza kuweka ngazi ya faragha haiwezekani juu ya umma-kwa default mitandao malipo.

Sending a shielded transaction is easiest when you use a wallet that supports the current Zcash network and current shielded pools. Before relying on a wallet for privacy, check whether it supports shielded sending, shielded receiving, and the pool you plan to use. When withdrawing ZEC from an exchange, check whether the exchange supports shielded or transparent withdrawals. If it only supports transparent withdrawals, move the funds into a shielded-capable wallet after they arrive.

Kutumia shughuli za ulinzi kutuma na kupokea fedha ni njia bora ya kuhifadhi faragha na kupunguza hatari ya kuvuja data malipo.

## Shughuli za Uwazi

Transparent transactions work similarly to Bitcoin transactions. Transaction details are publicly visible on the blockchain, including transparent addresses and transparent values. Transparent transactions should be avoided when privacy is a priority.

Anwani za uwazi bado ni muhimu katika hali fulani, hasa wakati kubadilishana au huduma haina msaada wa anwani ulinzi. Kama kupokea ZEC kwa anwani ya uwazi, kufikiria kulinda kabla ya kufanya malipo baadaye.

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/R-krX1UpsIg"
    title="Learn Zcash shielded wallets!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    ruhusuFullScreen
    loading="lazy"
  />
</div>

## Njia Rahisi ya Kuona Mambo Macho kwa Picha

Upatikanaji wa wazi ni kadi ya posta. Mjumbe huitoa, lakini mtu yeyote anayeshughulikia ujumbe huo njiani anaweza kuusoma na kuona aliyetuma au anayepokea barua hiyo.

Upatikanaji wa ulinzi ni bahasha iliyofungwa. Huduma ya posta bado inathibitisha kwamba barua halisi na posho halisi ilipita kupitia mfumo, na hakuna mtu anayeweza kuiba au kutuma barua hiyo mara mbili. Yaliyomo kwenye bahasha hubaki kati ya mtumaji na mpokeaji.

Sehemu muhimu ni kwamba Zcash inakuwezesha kuamua ambayo moja kutuma, malipo kwa kulipa.

## Zcash ada ya malipo

Zcash haitumii vitengo vya gesi ya mtindo wa Ethereum. Ada za shughuli za Zcash zinalipwa kwa ZEC, kawaida hupimwa katika ** zatoshis**. Moja ZEC ni sawa na 100,000,000 zatoshi.

[ZIP 317 - Ujumbe wa posta.](https://zips.z.cash/zip-0317) defines a conventional fee mechanism that scales with transaction complexity. Instead of every transaction using the old 1,000-zatoshi flat fee, the conventional fee is based on "logical actions" such as inputs, outputs, and shielded actions. Simple transactions commonly start around 10,000 zatoshis, or 0.0001 ZEC, and more complex transactions can require more.

In most current wallets, users should not need to manually calculate ZIP 317 fees. The wallet should choose an appropriate fee automatically. If a wallet still uses the old flat fee or lets you set a fee far below the ZIP 317 conventional fee, the transaction may be delayed, deprioritized, dropped by some nodes, or fail to relay reliably.

## Kutatua matatizo ya shughuli Stuck

A Zcash transaction is not final just because it appears in your wallet. It becomes final for ordinary use after it is mined into a block and receives enough confirmations for your situation. Exchanges and services may require more confirmations than a wallet shows by default.

Tumia mti huu wa uamuzi kabla ya kutuma tena:

1. ** Je, mkoba wako kuonyesha shughuli ID?**
   - Kama si, mkoba inaweza kuwa kuundwa au matangazo ya shughuli bado. Angalia hali sync, internet connection, mfuko wa fedha toleo, na yoyote ujumbe wa makosa mkoba.
   - Kama ndiyo, nakala ya shughuli ID na kuendelea.
2. ** Je, shughuli kuthibitishwa katika block?**
   - Ikiwa ndiyo, subiri idadi ya uthibitisho unaohitajika na mkoba wako wa fedha, benki au huduma.
   - Ikiwa sivyo, endelea.
3. ** Je, shughuli imefikia urefu wake wa kumalizika muda?**
   - Kama si, usitumie manually tena malipo sawa bado. shughuli ya awali inaweza bado kuthibitisha.
   - Kama ndiyo, shughuli haiwezi kuchimbwa baada ya urefu huo wa kumalizika muda wake. mkoba wako unaweza kuashiria kama ulimaliza au kushindwa na huenda ukahitaji kujenga biashara mpya.
4. ** Je, shughuli kuonekana kwenye seva moja au Explorer lakini si mwingine?**
   - Kutibu hii kama mtandao kujulikana suala, si ushahidi kwamba shughuli alishindwa. nodes tofauti inaweza kuwa na maoni mbalimbali mempool.
   - Kusubiri, resync mkoba wako, au kubadili server nyingine kuaminiwa kama mfuko wa fedha yako inasaidia kwamba.
5. ** Je, shughuli kutoweka baada ya kuonekana kuthibitishwa?**
   - Mzunguko mfupi wa uratibu unaweza kuondoa shughuli kwa muda kutoka kwenye mlolongo bora.
   - Kusubiri vitalu zaidi. Kama shughuli anarudi, kuendelea kusubiri uthibitisho. Kama haina kurudi na baadaye muda wake utakapokwisha, kujenga biashara mpya.
6. ** Je, mkoba ni kuuliza wewe kutuma tena?**
   - Fuata mwongozo wa sasa wa mkoba tu baada ya kuangalia kwamba shughuli iliyopita imeisha, imeshindwa au haifai tena.
   - Ikiwa huna uhakika, tafuta msaada kabla ya kutuma tena.

## Inasubiri, Imeisha, Imeshindwa Kutumiwa na Kuanzishwa Tena

- **Pending** ina maana shughuli imeundwa au matangazo lakini bado si kuchimbwa katika block.
- ** Imeisha** ina maana ya shughuli ni kumalizika urefu kupita. Chini ZIP 203, biashara na expiry urefu haiwezi kuchimbwa baada ya kwamba urefu.
- ** Dropped** ina maana moja au zaidi nodes tena kuweka shughuli katika mempool yao. Hii inaweza kutokea kwa sababu ya kumalizika muda, ada za chini, sera ya mempool, kuanza upya tabia, au relay tofauti.
- ** Reorged** ina maana block ambayo awali zilizomo shughuli ni tena sehemu ya mlolongo bora. Mkataba inaweza kuchimbwa upya baadaye, au unaweza kurudi kwa kusubiri kama bado halali.

## Wakati Ambapo Usipeleke Ujumbe Tena

Si mara moja tena kwa sababu tu shughuli ni inasubiri, polepole au kukosa kutoka explorer mmoja. Resending mapema mno inaweza kusababisha machafuko na, kulingana na jinsi mkoba hujenga malipo mpya, anaweza kuhatarisha kulipa mara mbili.

Subiri au upate msaada kwanza wakati:

- shughuli ina ID ya biashara na si ilimalizika.
- Seva moja inaonyesha wakati mwingine haifanyi.
- Ilikuwa hivi karibuni kuchimbwa lakini waliopotea uthibitisho baada ya reorg uwezekano.
- Huduma ya kupokea si kumaliza kuhesabu uthibitisho.
- Bado mkoba wako unafanya kazi.

Ni kawaida salama kutuma tena tu baada ya mkoba wazi alama shughuli kama ilimalizika au kushindwa, au baada msaada inathibitisha kwamba mpango wa awali hawezi kuthibitisha.

## Uchunguzi wa Usalama-Wa Kibinafsi

Unaweza kuangalia hali ya msingi shughuli bila kufichua habari zaidi kuliko muhimu:

- Angalia kama mkoba wako ni kabisa kulandanishwa.
- Angalia kama programu ya mkoba ni updated.
- Angalia kama shughuli ina ID ya manunuzi.
- Angalia kama shughuli ni alithibitisha, inasubiri, ilimalizika muda wake au kushindwa.
- Angalia sasa block urefu na kulinganisha kwa shughuli ya muda wa kumalizika urefu kama mkoba wako inaonyesha ni.
- Kwa ajili ya shughuli uwazi, block explorer unaweza kuonyesha manunuzi umma, anwani, maadili na uthibitisho.
- Kwa shughuli kulindwa, block explorer inaweza kuonyesha kwamba manunuzi ipo, lakini haiwezi kuonyesha shielded mtumaji, mpokeaji, kiasi cha fedha au maelezo memo.

## Mambo Usiyopaswa Kujulisha Umma

Kamwe usipitie hizi kwenye mazungumzo ya umma, mitandao ya kijamii au ufuatiliaji wa masuala:

- Usemi wa mbegu au maneno ya kupona
- Kutumia ufunguo, siri muhimu, au mkoba chelezo
- Ufunguo kamili wa kutazama
- Picha za skrini zinazoonyesha salio, anwani kamili, kumbukumbu, nambari ya QR au maelezo ya akaunti ya kubadilishana.
- Hati za utambulisho wa kibinafsi au rekodi ya kurejesha akaunti

ID ya shughuli ni umma kwenye mlolongo, lakini bado inaweza kuunganisha swali lako la msaada kwa utambulisho wako. Kama faragha mambo, kushiriki tu na njia tegemezi wa uaminifu.

## Kile Ambacho Vikundi vya Msaada Vinahitaji

Wakati wa kuomba msaada kwa mkoba, kubadilishana au huduma ya usaidizi, shiriki tu habari muhimu za chini:

- Jina la mkoba au huduma
- Toleo la programu na mfumo wa uendeshaji
- Kama shughuli ni walinzi, uwazi au kati ya anwani na wazi ulinzi
- Transaction ID, kama wewe ni starehe kushiriki yake
- Karibu wakati kutumwa
- Kama mkoba ni kabisa kulandanishwa
- Hali ya sasa inayoonyeshwa na mkoba
- Ujumbe sahihi makosa, na data binafsi kuondolewa
- Screenshot na mizani, anwani, memos, na maelezo ya akaunti siri

Timu za msaada hazihitaji neno lako la msingi, ufunguo wa matumizi, ufunguzi binafsi au ufunguaji kamili.

## Makosa ya Kawaida

- ** Kwa kudhani kuwa yoyote ya orodha za mkoba ZEC inaweza kutuma binafsi.** Idadi kadhaa ya pochi nyingi-sarafu msaada upande wa uwazi wa Zcash tu. Angalia mifuko mkono mfukoni kabla kutegemea juu yake kwa faragha. [Mkoba](https://zechub.wiki/using-zcash/wallets) ukurasa orodha hii kwa kila chaguo.
- ** Kuondoa kwa anwani ya uwazi na kuacha fedha huko.** Uondoaji yenyewe ni umma, na kila harakati baadaye kutoka kwenye anwani hiyo inabaki kuwa wazi pia. Kulinda pesa mara tu zinapofika.
- **Kutibu faragha kama kitu wewe kugeuka juu mara moja.** Kila shughuli ni uchaguzi tofauti. Kutuma ulinzi leo haina undo uwazi malipo uliyofanya wiki iliyopita.
- **Kutumia tena anwani ya uwazi kwa kila kitu.** Kwa sababu shughuli za uwazi zinaonekana daima, anwani moja inayotumiwa mara nyingi huunganisha malipo ambayo hayakuwa na sababu yoyote ya kuunganishwa.
- ** Kutuma na ada ya zamani isiyofaa.** Pochi ambazo hazijachukua ZIP 317 bado zinaweza kutuma malipo ya mapema, ambayo yanaweza kuacha shughuli bila kuthibitishwa.
- **Kuanzisha upya kabla ya kumalizika muda.** Mkataba unaosubiri bado unaweza kuthibitisha hadi utakapomalizika. Angalia hali ya kumaliza muda kabla ya kuunda malipo mengine.

## Kumbuka:

Tafadhali kumbuka kuwa njia salama ya kutumia ZEC ni kwa kutumia shughuli ulinzi wakati wowote mtumaji, mpokeaji, mkoba na huduma wote msaada wao. Baadhi pochi na kubadilishana kusaidia [anwani za umoja](https://electriccoin.co/blog/unified-addresses-in-zcash-explained/#:~:text=The%20unified%20address%20(UA)%20ni,ndani%20ya%20pana zaidi%20Zcash%20ecosystem.), ambayo inaweza kuchanganya aina nyingi za mpokeaji wa Zcash katika anwani moja.

## Rasilimali

- [ZIP 203: Transaction Mwisho wa muda.](https://zips.z.cash/zip-0203)
- [ZIP 317: Utaratibu wa Ada ya Kuhamisha Kiasi.](https://zips.z.cash/zip-0317)
- [Zcash zips (ZIP za fedha taslimu)](https://zips.z.cash/)

## Kurasa Zinazohusiana

- [Mkoba](/using-zcash/wallets) - ambayo pochi msaada shielded kutuma, na ambazo ni uwazi tu
- [Vidimbwi Vilivyohifadhiwa kwa Kifaa cha Kuzuia Mlipuko](/using-zcash/shielded-pools) - Sapling na Orchard, mabwawa yako ulinzi fedha kuishi katika
- [Memo za](/using-zcash/memos) - ujumbe encrypted ambayo inaweza kusafiri na shughuli ulinzi
- [Anwani za Kubadilishana Uwazi](/using-zcash/transparent-exchange-addresses) - TEX anwani na kwa nini kubadilishana kuzitumia
- [Mabadilishano ya Walinzi wa Kifungo](/using-zcash/custodial-exchanges) - ambayo kubadilishana msaada shielded uondoaji

## ZEC kwa ZAT Converter
