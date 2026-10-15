<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transparent_Exchange_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Anwani Zcash TEX ni zipi?

## TL;DR

* Anwani ya TEX ni anwani Zcash inayoonekana wazi iliyoandikwa katika umbizo tofauti. Inaanza na `tex1` na imefafanuliwa katika [ZIP 320](https://zips.z.cash/zip-0320).
* Inakuambia jambo moja kuhusu pochi yako: lipa anwani hii kwa pesa za uwazi pekee.
* Ikiwa salio lako limehifadhiwa, pochi inayolingana inakufanyia hatua mbili. Inahamisha kiasi hicho hadi anwani ya muda inayoonekana, kisha hukituma kwa anwani ya TEX.
* Mnamo 2023, Binance aliiomba jumuiya ya Zcash njia ya kukataa amana zilizolindwa na kuzirudisha. Anwani za TEX ndizo jibu, na Binance ndiyo soko la hisa kwenye ZecHub [Mabadilishano ya Uhifadhi](/using-zcash/custodial-exchanges) orodha inayochukua amana za TEX.
* Malipo kwa anwani ya TEX ni ya umma kwenye blockchain, kama malipo yoyote ya uwazi. Salio lako lililobaki linabaki kuwa la faragha.

## Maelezo ya Msingi

Anwani ya Zcash TEX ni aina maalum ya anwani ya kupokea. TEX inawakilisha "Transparent Exchange". Ni usimbaji upya wa Bech32m wa anwani moja ya p2pkh Transparent. Anwani za TEX huanza na `tex1` na ni aina tofauti na Anwani Zilizounganishwa.

Anwani ya TEX huambia pochi inayolingana kufanya muamala wa Transparent-Pekee (T -> T). 

Mantiki ni kama ifuatavyo: Wakati pochi inayolingana inapogundua Anwani ya TEX, huibadilisha ili kupata kipokezi cha Uwazi kilichomo. Kisha pochi hutuma pesa zinazohitajika kwa TX kutoka kwenye bwawa la Shielded hadi anwani tofauti ya Uwazi ya muda mfupi, inayodhibitiwa na mtumiaji (Z -> T). Kisha hutuma pesa hizo kwa kipokezi cha Uwazi kilichobadilishwa cha anwani ya TEX (T -> T). 

Pendekezo la kiufundi la anwani za TEX limeainishwa katika Zcash [ZIP 320](https://zips.z.cash/zip-0320), ambayo hufafanua aina ya anwani kwa ajili ya kupokea pesa kutoka kwa Anwani za Uwazi pekee.

![TEX](/content-images/ZashiTex-b1cbec5f07.webp)

Anwani za TEX bado hazijatumika kwa upana. Watumiaji wa Zcash wanaweza kuhitajika kuzitumia hatimaye.

### Ninahitaji Anwani ya TEX Lini?

#### Unahitaji anwani ya TEX unapotuma pesa kwa anwani ya Transparent kwa kutumia pochi ambayo hairuhusu kutuma moja kwa moja kwa anwani ya Transparent.

Pochi fulani haziruhusu kutuma moja kwa moja kwa anwani ya Transparent, na mpokeaji huenda asitoe sawa na TEX. Kwa hivyo, kubadilisha kutoka anwani ya Transparent hadi TEX kunaweza kuhitajika wakati mwingine. Hili linaweza kufikiwa kwa mikono kwa kuendesha utekelezaji wa marejeleo ulioainishwa katika [zip-320](https://zips.z.cash/zip-0320#reference-implementation).

#### Unahitaji anwani ya TEX unapotuma fedha kwenye soko la kati ambalo linahitaji fedha hizo zitoke kwenye chanzo cha Uwazi.

[Binance](https://www.binance.com/) ndiyo sababu anwani za TEX zipo. Mnamo Novemba 2023, iliiambia jumuiya Zcash kwamba ZEC inaweza kuondolewa kwenye orodha isipokuwa kama kuna njia ya kukataa amana kutoka kwa anwani zilizolindwa na kuzirudisha kwa mwenye amana ([ZIP 320, Mandharinyuma](https://zips.z.cash/zip-0320#background)ZIP 320 haitarajii soko zingine kutoa anwani za TEX isipokuwa zinahitaji kujua ni anwani gani malipo yalitoka. Binance ni soko letu la kubadilishana [Mabadilishano ya Uhifadhi](/using-zcash/custodial-exchanges) orodha inayopeleka amana kwenye anwani ya TEX.
Anwani za TEX huarifu pochi inayolingana kwamba pesa zote zinazotumwa kwa anwani hiyo lazima ziwe wazi na ziondoe kila thamani iliyolindwa kutokana na kutumwa kwa anwani hiyo.
Ikiwa soko kama Binance litakataa thamani iliyotumwa, lina njia zinazohitajika za kurudisha thamani hiyo kwenye anwani iliyotoka. Pia husaidia vyombo kama Binance kuzingatia sheria na kanuni zilizowekwa na serikali au mamlaka nyingine.

### Ni pochi gani zinazounga mkono Anwani za TEX?

Unaweza kuona orodha iliyosasishwa zaidi kwenye yetu [pochi](/using-zcash/wallets) ukurasa. Tumia kichujio cha Anwani ya TEX.

## Taswira / Analojia

Fikiria salio lako lililolindwa kama pesa zilizowekwa kwenye sefu iliyofungwa nyumbani. Hakuna mtu aliye nje anayeweza kuona ni kiasi gani kilicho ndani.

Soko kama Binance lina bango kwenye kaunta yake: malipo yanakubaliwa katika bahasha iliyo wazi pekee, ili keshia aweze kuona pesa zilitoka wapi na kuzirudisha inapohitajika. Anwani ya TEX ndiyo bango hilo.

Pochi yako inapoona bango, hutoa kiasi kutoka kwenye sefu, huiweka kwenye bahasha iliyo wazi ikiwa na anwani yako ya kurudi (anwani ya muda inayoonekana), na huipeleka bahasha kwenye kaunta. Sefu hubaki imefungwa, na hakuna anayejua ni nini kingine kilichomo ndani yake.

## Kupiga Mbizi Kina

### Jinsi anwani ya TEX inavyojengwa

Anwani ya kawaida inayoanzia na uwazi `t1` inashikilia hash ya ufunguo wa baiti 20, iliyoandikwa katika Base58Check. Anwani ya TEX inashikilia baiti 20 zile zile, zilizosimbwa tena katika Bech32m na kiambishi awali `tex` (`textest` kwenye testnet). Kubadilisha moja kuwa nyingine kunahitaji mistari michache ya msimbo, ambayo ZIP 320 inaonyesha katika utekelezaji wake wa marejeleo.

Muundo rahisi ulikuwa sharti kutoka Binance: ubadilishaji ulipaswa kuendeshwa na maktaba za Base58Check na Bech32m pekee katika msimbo wa mbele wa soko la kubadilishana. Rasimu ya awali ya ZIP 320 ilijenga wazo hilo katika Anwani Zilizounganishwa, na toleo hilo liliondolewa kwa sababu hii.

### Kulipa anwani ya TEX kutoka kwa salio lililolindwa

ZIP 320 inahitaji pochi inayolingana ili kujenga miamala miwili hapa. Ya kwanza huhamisha pesa kutoka kwa salio lako lililolindwa hadi anwani mpya ya muda mfupi inayoonekana. Ya pili huzituma kutoka kwa anwani hiyo hadi anwani ya TEX.

Ikiwa soko la hisa litakataa amana, hurejesha pesa hizo kwenye anwani ya muda mfupi. Pochi yako lazima iweze kuzipata na kuzitumia, kwa hivyo ZIP 320 huziomba pochi kutoa anwani za muda mfupi kutoka kwa kifungu chako cha mbegu. Pia huziomba pochi kutumia anwani mpya ya muda mfupi kila wakati, ili malipo tofauti yasiweze kuunganishwa.

### Kinachoonyeshwa na blockchain

Sheria ya TEX inaishi kwenye pochi. Nodi haziichunguzi, kwa hivyo sheria za makubaliano hubaki vile vile. Malipo kwa anwani ya TEX yanaonekana sawa na malipo kwa ulinganifu `t1` anwani. Kiasi, anwani ya muda mfupi, na anwani ya soko la hisa ni ya umma, kama ilivyo kwa muamala wowote wa uwazi.

## Kurasa Zinazohusiana

- [Mabadilishano ya Uhifadhi](/using-zcash/custodial-exchanges): ni mabadilishano gani yanayokubali aina za anwani, ikiwa ni pamoja na amana za TEX Binance's.
- [Pochi](/using-zcash/wallets): tumia kichujio cha Anwani ya TEX ili kupata pochi zinazoweza kulipa anwani ya TEX.
- [Mabwawa ya Kuogelea Yenye Ngao](/using-zcash/shielded-pools): ambapo salio lako la kibinafsi liko kabla ya malipo ya TEX kuhamisha sehemu yake.
- [Nani Anaweza Kuona Malipo Yako Zcash](/start-here/who-can-see-your-zcash-payment): kinachoonekana mara tu fedha zinapoondoka kwenye bwawa lililolindwa.
- [Kile Kivinjari cha Block Anaweza Kuona](/zcash-tech/what-a-block-explorer-can-see): jinsi malipo ya uwazi yanavyoonekana kwenye mnyororo.
- [URI za Ombi la Malipo Zcash](/using-zcash/payment-request-uris): kiwango kingine cha pochi kwa malipo yaliyojazwa awali.

**Ilisasishwa mara ya mwisho:** Oktoba 2026
