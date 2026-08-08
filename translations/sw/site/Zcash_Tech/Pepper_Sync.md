<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Pepper_Sync.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zingo 2.0 - Pepper Sync

## TL;DR

* Pepper Sync ni injini ya usawazishaji iliyoletwa katika Zingo! 2.0, mkoba wa chanzo wazi cha Zcash uliojengwa na Maabara za Zingo.
* Inatumia usawazishaji usio wa mstari badala ya kuchunguza mlolongo katika vipande vikubwa vya mfululizo, hivyo mizani yako na shughuli zinaonekana mapema zaidi.
* Maendeleo ni kuokolewa kuendelea. Kama uhusiano drops au programu ya kufunga, syncing itaanza tena kutoka ambapo kusimamishwa badala ya kuanza upya.
* Unaweza kutumia kabla ya usawazishaji kumalizika.
* Shughuli za kulindwa hubaki kuwa siri katika mchakato mzima.

## Maelezo ya msingi

Zingo 2.0 ni toleo la karibuni wa mkoba Zingo!, lightweight, wazi chanzo mfuko kujengwa kwa ajili ya jamii Zcash. nyota ya kutolewa hii ni Pepper Sync, upgrades kubwa kwamba kabisa rethinks jinsi pochi kuungana na blockchain.

Katika siku za nyuma, usawazishaji inaweza kujisikia uchungu polepole, makosa-kutokana na rasilimali nzito, wakati mwingine kulazimisha watumiaji kuanza upya kutoka mwanzo. Pepper Sync mabadiliko yote hayo. Inafanya kusawazisha kwa kasi zaidi, laini, kuaminika zaidi, na chini ya mahitaji juu ya kifaa yako, huku kikamilifu kuhifadhi faragha ya shughuli ulinzi.

Kama wewe ni mtumiaji mpya kabisa kujaribu Zcash kwa mara ya kwanza, au muda mrefu jamii mwanachama kusimamia mikoba mbalimbali ulinzi, Pepper Sync hufanya uzoefu zaidi vitendo na kufurahisha.

### Kipengele cha msingi wa Pepper Sync

Pepper Sync huanzisha maboresho kadhaa:

- Haraka sana Syncing - mkoba wako ni tayari katika dakika, si masaa.
- Smart Updates - Data ni kusindika katika chunks ndogo, kuepuka rescans kamili.
- Kujizuia kwa Vikwazo - Kama uhusiano wako inashuka, syncing itaanza tena ambapo ni kushoto.
- Ni nyepesi na yenye ufanisi - Imeboreshwa kwa ajili ya simu, kompyuta ndogo za mkononi, na vifaa vingine vyenye nguvu kidogo.
- Maoni ya wazi - Updates maendeleo Real-time kupunguza machafuko.
- Faragha-Kuhifadhi - shughuli Shielded kubaki binafsi katika mchakato wote.

### Ni bora kuliko hapo awali.

Toleo la zamani ya Zingo mara nyingi frustrated watumiaji na muda mrefu syncing, makosa wazi utunzaji, na matumizi makubwa rasilimali. Pepper Sync fixes masuala haya ya kawaida:

Kipengele cha Zingo Toleo la awali,Zingo 2.0 na Pepper Sync.
| ------------------ | -------------------------------------- | -------------------------------------------- |
│Kusawazisha kasi. │Upole, hasa katika kuanzisha kwanza. ‭haraka sana awali na kuendelea kusawazisha.
❖ Kushughulikia makosa✔️ Kuanguka mara kwa mara na kushindwa wazi. Kuboresha utulivu pamoja na kufufua moja kwa moja.
◯ Uzoefu wa mtumiaji. Sync ilionekana "isiyo wazi" kwa wageni wapya. Kiwazi, na hali ya ufafanuzi zaidi na sasisho.
❖ Utendaji wa kifaa. matumizi ya juu CPU/kumbukumbu optimized kwa ajili ya kutumia rasilimali laini.

Kwa kifupi: kusawazisha sasa ni kasi, zaidi ya kuaminika, na rahisi kuelewa.

## Visual / Ulinganisho

Fikiria zamani mkoba usawazishaji kama kusoma kitabu kirefu sana kutoka ukurasa wa kwanza, kwa sauti kubwa, kabla ya kuruhusiwa kusema chochote kuhusu hilo. Stop nusu njia, na wewe kuanza tena kutoka ukurasa mmoja. Pepper Sync anasoma kitabu hicho kile, lakini anaendelea bookmark, inasoma sura ambayo ni muhimu kwako kwanza, na inakuwezesha kuzungumza juu ya hadithi kabla umemaliza ukurasa mwisho.

Bookmark ni sehemu muhimu. Kila toleo la awali kutibiwa sync kuingiliwa kama kazi taka; Pepper Sync inachukua hiyo kama pause.

### Miongozo ya kuona

- Kina Mtiririko - Inaonyesha mchakato kamili. ![Detailed Flow](https://github.com/user-attachments/assets/119c13ec-76be-42bd-b558-762d09275a1b)

- Rahisi Flow - Quick mtazamo kwa watumiaji wa kila siku. ![Simplified Flow](https://github.com/user-attachments/assets/9b612cbd-f24d-4472-9b87-0f2c908bb368)

## Kuzama kwa Kina Chini ya Maji

### Jinsi Pepper Sync kazi (kuona rahisi)

Badala ya kuchunguza upya blockchain katika kubwa, chunks clunky, Pepper Sync kazi kwa hatua ndogo, manageable - daima kuokoa nafasi yako kama ni huenda.

1. Kuunganisha - Wallets kuangalia katika na mtandao.
2. Fetch Blocks - Data ni kupakuliwa incrementally.
3. Kuthibitisha - shughuli ni kuthibitishwa.
4. Kushughulikia Shielded Notes - faragha kuhifadhiwa wakati wote.
5. Update Mizani - Wallet refreshes salama.
6. Hifadhi Maendeleo - Stops na inaendelea bila mshono.
7. Finish - Wallet ni tayari kufanya manunuzi.

## Matokeo ya Kimatendo

### Ni nani wanafaidika kutokana na Pepper Sync?

- Watumiaji wapya - Unaweza kuanzisha pochi haraka bila kuwa tamaa na kuchelewa.
- Watumiaji wa kila siku - Usawazishaji kuaminika hufanya malipo ya ulinzi vitendo kwa ajili ya matumizi ya kila siku.
- Watengenezaji & Testers - Shorter sync mara maana ya haraka majaribio mizunguko.
- Simu ya Mkono & Mwanga Vifaa - Zingo sasa anaendesha kwa ufanisi hata juu ya rasilimali za vifaa vya mdogo.

### Kwa nini ni muhimu kwa Zcash

Zcash ni kujengwa karibu na shughuli ulinzi, moja ya zana nguvu zaidi faragha katika cryptocurrency. Lakini faragha tu muhimu kama inapatikana.

Pepper Sync husaidia kwa:

- Kupunguza vikwazo vya kuingia - Watumiaji wapya wanaweza kuanza haraka.
- Kusaidia matumizi ya kila siku - anwani Shielded kuwa rahisi kuamini.
- Kuhimiza ukuaji wa mazingira - Uzoefu bora wa mkoba huendesha kupitishwa zaidi, programu na huduma.

Kwa kuboresha uzoefu wa mkoba, Pepper Sync inaimarisha mfumo mzima wa Zcash.

### Kuanza: onboarding na Zingo 2.0

1. Download Wallet - Kupata toleo sahihi kutoka [Zingo GitHub releases ukurasa](https://github.com/zingolabs/zingolib)
2. Kuanzisha mkoba wako - kujenga moja mpya au kurejesha kutoka kwa kifungu mbegu zilizopo. [Zingo 2.0 na Zingo Labs](https://www.youtube.com/watch?v=FREwMzf_LlM)
3. Acha Pepper Sync Run - Kuangalia viashiria maendeleo kama updates mkoba wako. [Pepper Synch Run](https://x.com/ZingoLabs/status/1961871338441724191)
4. Anza kutumia Zcash - Tuma na kupokea walinzi wa ZEC mara tu usawazishaji ukikamilika.
5. Kupumzika Kuhusu Kusumbuliwa - Kama programu kufunga au uhusiano drops, Pepper Sync itaanza moja kwa moja.

## Makosa ya Kawaida

**Kutibu Pepper Sync kama mkoba katika haki yake mwenyewe**. Pepper sync ni injini ya usawazishaji ndani Zingo! mfuko wa fedha, si maombi tofauti. Kufunga Zingo; Pepper ushirikiano ni nini anaendesha chini yake.

** Kufikiria upatanisho wa haraka unamaanisha faragha dhaifu.** Kasi inakuja kutoka kwa jinsi data ya kuzuia inavyopatikana, kuamuru, na kuhifadhiwa, sio kutokana na kufunua habari zaidi. Shughuli zilizohifadhiwa hubaki kuwa za kibinafsi wakati wote.

** Kuzingatia lazima kuwa kikamilifu kulandanishwa kabla unaweza kutumia**. matumizi ya kabla ya usawazishaji kukamilika ni moja ya makala kichwa cha Pepper Sync, hivyo huna kusubiri kwa mkoba kufikia mwisho wa mnyororo.

## Maswali ya kawaida - maswali yanayoulizwa mara kwa mara

Je, mimi na rescan kila wakati mimi kufungua mkoba?

A: Hapana. Pepper Sync huhifadhi maendeleo, hivyo wewe tu update kutoka hatua ya mwisho.

** Swali: Nini kinatokea kama mtandao wangu disconnects?**

A: Sync pauses na inaendelea baadaye bila kuanzisha upya.

** Swali: Je, faragha yangu salama wakati syncing?**

Jibu: Ndiyo. shughuli Shielded kubaki binafsi kabisa.

** Swali: Muda gani ni mara ya kwanza sync kuchukua?**

J: Kwa kawaida ni dakika badala ya saa, ikitegemea kifaa chako na mtandao.

** Swali: Je, mimi kutumia mkoba kabla ya usawazishaji kumaliza?**

A: Ndiyo. Pepper Sync inasaidia matumizi kabla ya usawazishaji kukamilika, hivyo huna haja ya kusubiri kwa mkoba kufikia mwisho wa mnyororo.

## Matokeo ya Uchunguzi

Pamoja na Zingo 2.0 Pepper Sync, kusawazisha ni tena kubwa maumivu uhakika wa wallets ulinzi. Ni sasa kwa kasi, imara, na user-kirafiki, kupunguza kizuizi kwa wageni na kufanya matumizi ya kila siku mbali zaidi vitendo.

For users, it means less waiting and more privacy. For developers, it means a stronger foundation to build on. For the Zcash ecosystem, it's another step toward making shielded transactions accessible to everyone.

Zingo 2.0 na Pepper Sync si tu kuboresha; ni leap mbele kwa faragha, usable crypto.

## Kurasa Zinazohusiana

- [Zcash mkoba Syncing](/zcash-tech/zcash-wallet-syncing)  jinsi mkoba usawazishaji kazi katika mazingira Zcash.
- [Lightwallet Nodes] (Ndoa za mkoba mwepesi)](/zcash-tech/lightwallet-nodes)  miundombinu light mkoba kama vile Zingo syncs dhidi.
- [Zaino](/zcash-tech/zaino)  indexer zilizotengenezwa na timu Zingo.
- [Mifuko ya fedha](/wallets)  orodha kamili ya pochi Zcash na sifa zao.

## Kujifunza Zaidi

- [Zingo! GitHub Repository] (Kifungu cha habari)](https://github.com/zingolabs/zingolib)
- [Zcash Jamii Forum](https://forum.zcashcommunity.com/)
- Matangazo rasmi - [Zingo Labs Twitter](https://twitter.com/ZingoLabs)

___
___
