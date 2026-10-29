<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transparent_Exchange_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Anwani Zcash TEX ni zipi?

## TL;DR

* Anwani ya TEX ni anwani Zcash inayoonekana wazi iliyoandikwa katika umbizo tofauti. Inaanza na `tex1` na imefafanuliwa katika [ZIP 320](https://zips.z.cash/zip-0320).
* Inakuambia jambo moja kuhusu pochi yako: lipa anwani hii kwa pesa za uwazi pekee.
* Ikiwa salio lako limehifadhiwa, pochi inayolingana inakufanyia hatua mbili. Inahamisha kiasi hicho hadi anwani ya muda inayoonekana, kisha hukituma kwa anwani ya TEX.
* Mnamo 2023, Binance aliiomba jumuiya ya Zcash njia ya kukataa amana zilizolindwa na kuzirudisha. Anwani za TEX ndizo jibu, na Binance ndiyo soko la hisa kwenye ZecHub [Mabadilishano ya Uhifadhi](/using-zcash/custodial-exchanges) orodha inayochukua amana za TEX.
* Usaidizi umeongezeka pia upande wa utumaji: Coinbase inaruhusu watumiaji wake kutuma ZEC kwa anwani za TEX, na vifaa vya pochi vimekuwa vikiongeza usaidizi wa ZIP 320.
* Malipo kwa anwani ya TEX ni ya umma kwenye blockchain, kama malipo yoyote ya uwazi. Salio lako lililobaki linabaki kuwa la faragha.

## Maelezo ya Msingi

Anwani ya Zcash TEX ni aina maalum ya anwani ya kupokea. TEX inawakilisha "Transparent Exchange". Ni usimbaji upya wa Bech32m wa anwani moja ya p2pkh Transparent. Anwani za TEX huanza na `tex1` na ni aina tofauti na Anwani Zilizounganishwa.

Anwani ya TEX huambia pochi inayolingana kufanya muamala wa Transparent-Pekee (T -> T). 

Mantiki ni kama ifuatavyo: Wakati pochi inayolingana inapogundua Anwani ya TEX, huibadilisha ili kupata kipokezi cha Uwazi kilichomo. Kisha pochi hutuma pesa zinazohitajika kwa TX kutoka kwenye bwawa la Shielded hadi anwani tofauti ya Uwazi ya muda mfupi, inayodhibitiwa na mtumiaji (Z -> T). Kisha hutuma pesa hizo kwa kipokezi cha Uwazi kilichobadilishwa cha anwani ya TEX (T -> T). 

Pendekezo la kiufundi la anwani za TEX limeainishwa katika Zcash [ZIP 320](https://zips.z.cash/zip-0320), ambayo hufafanua aina ya anwani kwa ajili ya kupokea pesa kutoka kwa Anwani za Uwazi pekee.

![TEX](/content-images/ZashiTex-b1cbec5f07.webp)

### Anwani za TEX hutumika kwa kiasi gani?

Kuasili bado ni kwa sehemu, lakini sio tu kwa kubadilishana mara moja. Majukumu mawili tofauti yanafaa kutenganishwa:

* **Kutoa anwani za amana za TEX.** Binance ni soko la hisa kwenye tovuti yetu [Mabadilishano ya Uhifadhi](/using-zcash/custodial-exchanges) orodha inayotoa anwani ya TEX kwa amana, ili fedha zifike kutoka chanzo cha uwazi ([ZIP 320, Mandharinyuma](https://zips.z.cash/zip-0320#background)ZIP 320 haitarajii kampuni zingine za kubadilishana kutoa anwani za TEX isipokuwa zinahitaji kujua ni anwani gani malipo yalitoka.
* **Kutuma kwa anwani za TEX.** Huu ndio upande ambao umekua. Mnamo Oktoba 2024, Coinbase ilitangaza kwamba watumiaji wa Coinbase.com wanaweza kutuma Zcash kwa anwani za TEX ([Tangazo la Mali Coinbase](https://x.com/CoinbaseAssets/status/1844428577921507416)). Vifaa vya pochi vimekuwa vikiongeza usaidizi wa ZIP 320 pia: KeepKey iliongeza utiaji saini kwa miamala ya TEX kwenye programu dhibiti 7.15 ([keepkey/hdwallet #75](https://github.com/keepkey/hdwallet/pull/75)), na XChainJS `zcash-js` maktaba ilirekebishwa baada ya kukataliwa kuwa halali `tex1` wapokeaji (zaidi kuhusu hilo hapa chini).

Kwa hivyo anwani za TEX si za ulimwengu wote, lakini msomaji hapaswi tena kudhani Binance ndio mahali pekee zinapoonekana.

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

Anwani za TEX hukopa usimbaji wa Bech32m kutoka kwa umbizo la Anwani Iliyounganishwa lakini hazihifadhi muundo wowote wake. Ikiwa wewe ni mgeni kwa Bech32m na jinsi anwani za Zcash zinavyothibitishwa, [Anwani Zilizounganishwa](/using-zcash/unified-addresses) ukurasa unashughulikia misingi iliyo chini ya [ZIP 316](https://zips.z.cash/zip-0316)Anwani ya TEX hutofautiana na Anwani Iliyounganishwa kwa njia nne dhahiri:

| | Anwani Iliyounganishwa (ZIP 316) | Anwani ya TEX (ZIP 320) |
|---|---|---|
| Ina nini | wapokeaji kadhaa wameunganishwa pamoja | kipokezi kimoja chenye uwazi cha P2PKH |
| Kiambishi awali kinachoweza kusomwa na binadamu (HRP) | `u` (mtandao mkuu) | `tex` (`textest` kwenye mtandao wa majaribio) |
| F4 Msongamano wa fumbo | ndiyo | no |
| Misimbo ya aina kwa kila mpokeaji | ndiyo | no |

Kwa kifupi, anwani ya TEX ndiyo kifungashio cha Bech32m kilicho wazi zaidi: hash moja ya ufunguo unaoonekana wazi, a `tex` kiambishi awali, na hakuna kingine.

### Sheria za utunzaji wa pochi na viunganishi

Hii ndiyo sehemu ambayo utekelezaji umekuwa ukikosea, kwa hivyo inafaa kutaja wazi. Unapogundua anwani ya TEX, pochi au kiunganishi **haipaswi kutumia pesa kutoka kwenye bwawa lililolindwa moja kwa moja hadi kwenye eneo la TEX.** ZIP 320 inahitaji kila ingizo kwenye malipo ya TEX liwe wazi, kwa hivyo malipo yanajengwa kama hatua mbili:

1. **Deshield.** Hamisha kiasi kutoka kwenye bwawa lililolindwa hadi anwani mpya, inayoonekana ya muda mfupi, inayodhibitiwa na mtumiaji ambayo pochi inamiliki (Z -> T).
2. **Tuma uwazi hadi uwazi.** Tumia matokeo hayo ya muda mfupi kwa kipokezi cha P2PKH kilichosimbwa ndani ya anwani ya TEX (T -> T).

Sheria chache hufanya hili kuwa salama, zote kutoka ZIP 320:

* Anwani ya muda mfupi inapaswa kutolewa kutoka kwa kifungu chako cha mbegu, ili ikiwa ubadilishaji utarudisha pesa, pochi yako bado inaweza kuzipata na kuzitumia.
* Anwani mpya ya muda mfupi inapaswa kutumika kila wakati, kwa hivyo malipo tofauti hayawezi kuunganishwa.
* Muamala wa pili unapaswa kutumia pembejeo zenye uwazi pekee, kwa hivyo ubadilishaji huo utaona amana safi ya uwazi hadi uwazi.

Ubadilishaji na mtiririko wa hatua mbili vinaonyeshwa katika [Utekelezaji wa marejeleo ya ZIP 320](https://zips.z.cash/zip-0320#reference-implementation)Kukosea hili ni tatizo halisi, la hivi karibuni: mnamo Oktoba 2026 XChainJS `zcash-js` maktaba iliyokataliwa ni halali `tex1` wapokeaji wenye hitilafu ya "Anwani 'ya' batili", kwa sababu kithibitishaji chake kilikubali Base58Check pekee `t1` fomu, ambayo ilivunja amana za ZEC kwa huduma zinazochapisha `tex1` anwani ([toleo #1782](https://github.com/xchainjs/xchainjs-lib/issues/1782)Ilirekebishwa kwa kumfundisha kithibitishaji kukubali usimbaji wa ZIP 320 ([PR #1783](https://github.com/xchainjs/xchainjs-lib/pull/1783)).

### Kile ambacho ujumbe wa TEX unafunua

Malipo ya TEX ni malipo ya uwazi, kwa hivyo ni ya umma, lakini inafaa kuwa sahihi kuhusu kile ambacho mwangalizi anaweza kuona na kile ambacho hawezi kuona.

Ni nini kinachoonekana** kwenye mnyororo:

* Anwani ya uwazi ya muda mfupi, kwa kuwa inaonekana kama matokeo ya hatua ya deshield na ingizo la kutuma mwisho.
* Kiasi vyote viwili: thamani iliyotoka kwenye bwawa lililolindwa katika hatua ya Z -> T, na thamani iliyotolewa katika hatua ya T -> T.
* Kipokezi chenye uwazi cha ubadilishaji, ambacho ni anwani ya P2PKH iliyosimbwa katika anwani ya TEX.

Kinachobaki **kimefichwa**:

* Salio lako lililobaki lililolindwa, na ni noti gani maalum zilizolindwa zilifadhili malipo. Hatua ya mwisho inaonyesha kwamba thamani *baadhi* iliacha bwawa hadi kwenye anwani ya muda, sio mahali ambapo ndani ya bwawa lilitoka.

Kwa hivyo mtazamaji anaweza kuunganisha anwani ya muda mfupi na malipo ya ubadilishaji (fedha zile zile, zinazoonekana wazi kwa uwazi) na anaweza kuona kwamba iliongezwa kutokana na uondoaji uliolindwa. Hawawezi kuiunganisha na fedha zako zingine zilizolindwa au shughuli. Hakuna kitu kwenye mnyororo kinachoashiria malipo kama "TEX" iliyotumwa: kama ZIP 320 inavyosema, malipo kwa anwani ya TEX hayawezi kutofautishwa na malipo hadi ulinganifu `t1` anwani, kwa sababu sheria za makubaliano hazijabadilika na sheria nzima inaishi kwenye pochi.

![On-chain footprint of a TEX send: funds leave the shielded pool to an ephemeral transparent address, then go transparent-to-transparent to the exchange; the ephemeral address, both amounts and the exchange address are visible, while the rest of the shielded balance stays hidden](/content-images/tex-onchain-footprint.webp)

### Kinachoonyeshwa na blockchain

Sheria ya TEX inaishi kwenye pochi. Nodi haziichunguzi, kwa hivyo sheria za makubaliano hubaki vile vile. Malipo kwa anwani ya TEX yanaonekana sawa na malipo kwa ulinganifu `t1` anwani. Kiasi, anwani ya muda mfupi, na anwani ya soko la hisa ni ya umma, kama ilivyo kwa muamala wowote wa uwazi.

## Kurasa Zinazohusiana

- [Anwani Zilizounganishwa](/using-zcash/unified-addresses): the `u1` umbizo la anwani chini ya ZIP 316, na misingi ya Bech32m ambayo anwani ya TEX hutumia tena.
- [Mabadilishano ya Uhifadhi](/using-zcash/custodial-exchanges): ni mabadilishano gani yanayokubali aina za anwani, ikiwa ni pamoja na amana za TEX Binance's.
- [Pochi](/using-zcash/wallets): tumia kichujio cha Anwani ya TEX ili kupata pochi zinazoweza kulipa anwani ya TEX.
- [Mabwawa ya Kuogelea Yenye Ngao](/using-zcash/shielded-pools): ambapo salio lako la kibinafsi liko kabla ya malipo ya TEX kuhamisha sehemu yake.
- [Nani Anaweza Kuona Malipo Yako Zcash](/start-here/who-can-see-your-zcash-payment): kinachoonekana mara tu fedha zinapoondoka kwenye bwawa lililolindwa.
- [Kile Kivinjari cha Block Anaweza Kuona](/zcash-tech/what-a-block-explorer-can-see): jinsi malipo ya uwazi yanavyoonekana kwenye mnyororo.
- [URI za Ombi la Malipo Zcash](/using-zcash/payment-request-uris): kiwango kingine cha pochi kwa malipo yaliyojazwa awali.

**Ilisasishwa mara ya mwisho:** Oktoba 2026
