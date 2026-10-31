<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transparent_Exchange_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Hariri Ukurasa"/>
</a>

# Anwani za TEX za Zcash ni Nini?

## Kwa Ufupi

* Anwani ya TEX ni anwani ya uwazi [transparent] ya Zcash iliyoandikwa katika muundo tofauti. Huanza na `tex1` na inafafanuliwa katika [ZIP 320](https://zips.z.cash/zip-0320).
* Hii huiambia pochi [wallet] yako jambo moja: lipa anwani hii kwa fedha za uwazi pekee.
* Ikiwa salio lako ni la faragha [shielded], pochi inayooana hufanya hatua mbili kwa ajili yako. Huhamisha kiasi hicho hadi anwani ya uwazi ya muda, kisha hukituma kwenye anwani ya TEX.
* Mwaka 2023, Binance iliomba jamii ya Zcash njia ya kukataa amana za faragha na kuzirejesha. Anwani za TEX ndizo jibu, na Binance ndiyo soko la kubadilishana sarafu [exchange] kwenye orodha ya ZecHub [Masoko ya kubadilishana sarafu yanayohifadhiwa na mtu mwingine](/using-zcash/custodial-exchanges) linalopokea amana za TEX.
* Usaidizi umeongezeka pia upande wa utumaji: Coinbase huwaruhusu watumiaji wake kutuma ZEC kwenye anwani za TEX, na vifaa vya zana vya pochi vimekuwa vikiongeza usaidizi wa ZIP 320.
* Malipo [payment] kwa anwani ya TEX ni ya umma kwenye blockchain, kama malipo yoyote ya uwazi. Salio lako lingine la faragha hubaki siri.

## Maelezo ya Msingi

Anwani ya TEX ya Zcash ni aina maalumu ya anwani ya kupokea. TEX inamaanisha “Transparent Exchange”. Ni usimbaji upya wa Bech32m wa anwani moja ya uwazi ya p2pkh. Anwani za TEX huanza na `tex1` na ni aina tofauti na Anwani Zilizounganishwa.

Anwani ya TEX huiambia pochi inayooana kutengeneza muamala [transaction] wa Uwazi-Pekee (T -> T). 

Mantiki ni kama ifuatavyo: Pochi inayooana inapogundua Anwani ya TEX, huisimbua ili kupata kipokezi cha Uwazi kilichomo. Kisha pochi hutuma fedha zinazohitajika kwa tx kutoka bwawa la Faragha hadi anwani tofauti ya Uwazi ya muda mfupi inayodhibitiwa na mtumiaji (Z -> T). Kisha hutuma fedha hizo kwenye kipokezi cha Uwazi kilichosimbuliwa cha anwani ya TEX (T -> T).  

Pendekezo la kiufundi la anwani za TEX limeainishwa katika Zcash [ZIP 320](https://zips.z.cash/zip-0320), ambalo linafafanua aina ya anwani mahsusi kwa kupokea fedha kutoka kwa Anwani za Uwazi.

![TEX](/content-images/ZashiTex-b1cbec5f07.webp)

### Anwani za TEX zinatumika kwa upana gani?

Matumizi bado ni sehemu, lakini hayajawekewa tena kikomo kwa soko moja la kubadilishana sarafu. Majukumu mawili tofauti yanapaswa kutenganishwa:

* **Kutoa anwani za amana za TEX.** Binance ndiyo soko la kubadilishana sarafu kwenye orodha yetu ya [Masoko ya kubadilishana sarafu yanayohifadhiwa na mtu mwingine](/using-zcash/custodial-exchanges) linalotoa anwani ya TEX kwa amana, ili fedha ziwafikie kutoka chanzo cha uwazi ([ZIP 320, Usuli](https://zips.z.cash/zip-0320#background)). ZIP 320 haitarajii masoko mengine ya kubadilishana sarafu kutoa anwani za TEX isipokuwa yahitaji kujua malipo yalitoka kwenye anwani gani.
* **Kutuma kwenye anwani za TEX.** Huu ndio upande uliokua. Oktoba 2024, Coinbase ilitangaza kwamba watumiaji wa Coinbase.com wanaweza kutuma Zcash kwenye anwani za TEX ([Coinbase Tangazo la Assets](https://x.com/CoinbaseAssets/status/1844428577921507416)). Vifaa vya zana vya pochi vimekuwa vikiongeza usaidizi wa ZIP 320 pia: KeepKey iliongeza utiaji sahihi kwa miamala ya TEX kwenye programu dhibiti 7.15 ([keepkey/hdwallet #75](https://github.com/keepkey/hdwallet/pull/75)), na maktaba ya XChainJS `zcash-js` ilirekebishwa baada ya kukataa wapokeaji halali wa `tex1` (zaidi kuhusu hilo hapa chini).

Kwa hivyo anwani za TEX hazitumiki kila mahali, lakini msomaji hapaswi tena kudhani kuwa Binance ndiyo mahali pekee zinapoonekana.

### Ninahitaji Anwani ya TEX Lini?

#### Unahitaji anwani ya TEX unapotuma fedha kwenye anwani ya Uwazi kwa kutumia pochi isiyounga mkono utumaji wa moja kwa moja kwenye anwani ya Uwazi.

Pochi fulani haziruhusu kutuma moja kwa moja kwenye anwani ya Uwazi, na mpokeaji huenda asitoe sawa ya TEX. Kwa hiyo, kubadilisha kutoka anwani ya Uwazi hadi anwani ya TEX kunaweza kuhitajika wakati mwingine. Hili linaweza kufanywa mwenyewe kwa kuendesha utekelezaji wa rejeleo ulioainishwa katika [zip-320](https://zips.z.cash/zip-0320#reference-implementation).

#### Unahitaji anwani ya TEX unapotuma fedha kwenye soko la kubadilishana sarafu lenye udhibiti wa kati linalohitaji fedha hizo zitoke kwenye chanzo cha Uwazi.

[Binance](https://www.binance.com/) ndiyo sababu anwani za TEX zipo. Novemba 2023, iliiambia jamii ya Zcash kwamba ZEC inaweza kuondolewa kwenye orodha isipokuwa kuwe na njia ya kukataa amana kutoka anwani za faragha na kuzirejesha kwa mwenye kuweka amana ([ZIP 320, Usuli](https://zips.z.cash/zip-0320#background)). ZIP 320 haitarajii masoko mengine ya kubadilishana sarafu kutoa anwani za TEX isipokuwa yahitaji kujua malipo yalitoka kwenye anwani gani. Binance ndiyo soko la kubadilishana sarafu kwenye orodha yetu ya [Masoko ya kubadilishana sarafu yanayohifadhiwa na mtu mwingine](/using-zcash/custodial-exchanges) linalopokea amana kwenye anwani ya TEX.
Anwani za TEX hujulisha pochi inayooana kwamba fedha zote zinazotumwa kwenye anwani hiyo lazima ziwe za uwazi na huzuia thamani yoyote ya faragha kutumwa kwenye anwani hiyo.
Iwapo soko la kubadilishana sarafu kama Binance litakataa thamani iliyotumwa, lina njia zinazohitajika za kurejesha thamani hiyo kwenye anwani ilikotoka. Pia husaidia taasisi kama Binance kutii sheria na kanuni zilizowekwa na serikali au mamlaka nyingine.

### Ni pochi zipi zinaunga mkono Anwani za TEX?

Unaweza kuona orodha ya kisasa zaidi kwenye ukurasa wetu wa [pochi](/using-zcash/wallets). Tumia kichujio cha Anwani ya TEX.

## Taswira / Mfano

Fikiria salio lako la faragha kama pesa katika kisanduku salama kilichofungwa nyumbani. Hakuna mtu wa nje anayeweza kuona kiasi kilichomo.

Soko la kubadilishana sarafu kama Binance lina ishara kwenye kaunta yake: malipo yanakubaliwa katika bahasha wazi pekee, ili mhudumu wa kaunta aweze kuona pesa zilitoka wapi na kuzirejesha ikihitajika. Anwani ya TEX ndiyo ishara hiyo.

Pochi yako inapoona ishara hiyo, huchukua kiasi kutoka kwenye kisanduku salama, hukitia katika bahasha wazi yenye anwani yako ya kurejeshewa juu yake (anwani ya uwazi ya muda), na kuipeleka bahasha kwenye kaunta. Kisanduku salama hubaki kimefungwa, na hakuna anayejua kitu kingine kilichomo.

## Uchambuzi wa Kina

### Jinsi anwani ya TEX inavyoundwa

Anwani ya kawaida ya uwazi inayoanza na `t1` hushikilia heshi ya ufunguo ya baiti 20, iliyoandikwa katika Base58Check. Anwani ya TEX hushikilia baiti 20 zilezile, zikiwa zimesimbwa upya katika Bech32m kwa kiambishi awali `tex` (`textest` kwenye testnet). Kubadilisha moja kuwa nyingine huchukua mistari michache ya msimbo, ambayo ZIP 320 huonyesha katika utekelezaji wake wa rejeleo.

Muundo rahisi ulikuwa sharti kutoka kwa Binance: ubadilishaji ulipaswa kuendeshwa kwa maktaba za Base58Check na Bech32m pekee katika msimbo wa mbele wa soko la kubadilishana sarafu. Rasimu ya awali ya ZIP 320 ilijenga wazo hili ndani ya Anwani Zilizounganishwa, na toleo hilo liliachwa kwa sababu hii.

Anwani za TEX hukopa usimbaji wa Bech32m kutoka muundo wa Anwani Iliyounganishwa lakini huhifadhi karibu hakuna muundo wake. Ikiwa wewe ni mgeni katika Bech32m na jinsi anwani za Zcash zinavyothibitishwa, ukurasa wa [Anwani Zilizounganishwa](/using-zcash/unified-addresses) unaeleza misingi chini ya [ZIP 316](https://zips.z.cash/zip-0316). Anwani ya TEX hutofautiana na Anwani Iliyounganishwa kwa njia nne mahususi:

| | Anwani Iliyounganishwa (ZIP 316) | Anwani ya TEX (ZIP 320) |
|---|---|---|
| Kinachoshikiliwa | vipokezi kadhaa vilivyofungwa pamoja | kipokezi kimoja cha uwazi cha P2PKH |
| Kiambishi awali kinachosomwa na binadamu (HRP) | `u` (mainnet) | `tex` (`textest` kwenye testnet) |
| Ufichaji wa F4Jumble | ndiyo | hapana |
| Typecode za kila kipokezi | ndiyo | hapana |

Kwa ufupi, anwani ya TEX ni kifuniko rahisi zaidi kinachowezekana cha Bech32m: heshi moja ya ufunguo wa uwazi, kiambishi awali cha `tex`, na hakuna kingine.

### Kanuni za ushughulikiaji kwa pochi na waunganishaji

Hii ndiyo sehemu ambayo utekelezaji umekuwa ukiikosea, hivyo inafaa kuieleza wazi. Pochi au kiunganishi kinapogundua anwani ya TEX, **hakipaswi kutumia fedha kutoka bwawa la faragha moja kwa moja hadi lengwa la TEX.** ZIP 320 huhitaji kila ingizo la malipo ya TEX liwe la uwazi, hivyo malipo hujengwa kwa hatua mbili:

1. **Ondoa kutoka faragha.** Hamisha kiasi kutoka bwawa la faragha hadi anwani mpya ya uwazi ya muda mfupi inayodhibitiwa na mtumiaji ambayo pochi inamiliki (Z -> T).
2. **Tuma kutoka uwazi hadi uwazi.** Tumia pato hilo la muda mfupi kwenye kipokezi cha P2PKH kilichosimbuliwa ndani ya anwani ya TEX (T -> T).

Kanuni chache hufanya hili liwe salama, zote zikitoka katika ZIP 320:

* Anwani ya muda mfupi inapaswa kutolewa kutoka kwenye maneno yako ya kurejesha pochi [seed phrase], ili soko la kubadilishana sarafu likirejesha fedha, pochi yako bado iweze kuzipata na kuzitumia.
* Anwani mpya ya muda mfupi inapaswa kutumiwa kila wakati, ili malipo tofauti yasiweze kuunganishwa.
* Muamala wa pili unapaswa kutumia ingizo za uwazi pekee, ili soko la kubadilishana sarafu lione amana safi ya uwazi-hadi-uwazi.

Ubadilishaji na mtiririko wa hatua mbili vinaonyeshwa katika [ZIP utekelezaji wa rejeleo wa 320](https://zips.z.cash/zip-0320#reference-implementation). Kukosea hili ni tatizo halisi na la hivi karibuni: Oktoba 2026 maktaba ya XChainJS `zcash-js` ilikataa wapokeaji halali wa `tex1` kwa hitilafu ya “Invalid 'to' address”, kwa sababu kithibitishaji chake kilikubali tu muundo wa Base58Check wa `t1`, hali iliyovuruga amana za ZEC kwa huduma zinazochapisha anwani ya `tex1` ([issue #1782](https://github.com/xchainjs/xchainjs-lib/issues/1782)). Hili lilirekebishwa kwa kufundisha kithibitishaji kukubali usimbaji wa ZIP 320 ([PR #1783](https://github.com/xchainjs/xchainjs-lib/pull/1783)).

### Kile ambacho utumaji wa TEX hufichua

Malipo ya TEX ni malipo ya uwazi, kwa hiyo ni ya umma, lakini inafaa kuwa mahususi kuhusu kile ambacho mwangalizi anaweza na hawezi kuona.

Kile **kinachoonekana** on-chain:

* Anwani ya uwazi ya muda mfupi, kwa kuwa huonekana kama pato la hatua ya kuondoa kutoka faragha na ingizo la utumaji wa mwisho.
* Kiasi vyote viwili: thamani iliyoondoka kwenye bwawa la faragha katika hatua ya Z -> T, na thamani iliyowasilishwa katika hatua ya T -> T.
* Kipokezi cha uwazi cha soko la kubadilishana sarafu, ambacho ni anwani ya P2PKH iliyosimbwa katika anwani ya TEX.

Kile kinachobaki **kimefichwa**:

* Salio lako lingine la faragha, na madokezo [note] gani mahususi ya faragha yaliyofadhili malipo. Hatua ya kuondoa kutoka faragha hufichua kwamba thamani *fulani* iliondoka kwenye bwawa hadi anwani ya muda mfupi, si mahali ilikotoka ndani ya bwawa.

Kwa hiyo mwangalizi anaweza kuunganisha anwani ya muda mfupi na malipo ya soko la kubadilishana sarafu (fedha zilezile, uwazi hadi uwazi) na anaweza kuona kwamba iliongezewa fedha kutoka uondoaji wa faragha. Hawezi kuiunganisha na fedha zako nyingine za faragha au shughuli zako. Hakuna kitu on-chain kinachoashiria malipo kama utumaji wa “TEX”: kama ZIP 320 inavyoeleza, malipo kwenye anwani ya TEX hayawezi kutofautishwa na malipo kwenye anwani inayolingana ya `t1`, kwa sababu kanuni za makubaliano [consensus] hazijabadilika na kanuni nzima imo kwenye pochi.

![On-chain footprint of a TEX send: funds leave the shielded pool to an ephemeral transparent address, then go transparent-to-transparent to the exchange; the ephemeral address, both amounts and the exchange address are visible, while the rest of the shielded balance stays hidden](/content-images/tex-onchain-footprint.webp)

### Kile blockchain huonyesha

Kanuni ya TEX imo kwenye pochi. Node haziikagui, kwa hiyo kanuni za makubaliano hubaki sawa. On-chain, malipo kwenye anwani ya TEX yanaonekana sawa na malipo kwenye anwani inayolingana ya `t1`. Kiasi, anwani ya muda mfupi, na anwani ya soko la kubadilishana sarafu ni vya umma, kama ilivyo kwa muamala wowote wa uwazi.

## Kurasa Zinazohusiana

- [Anwani Zilizounganishwa](/using-zcash/unified-addresses): muundo wa anwani wa `u1` chini ya ZIP 316, na misingi ya Bech32m inayotumiwa tena na anwani ya TEX.
- [Masoko ya kubadilishana sarafu yanayohifadhiwa na mtu mwingine](/using-zcash/custodial-exchanges): ni masoko gani yanayokubali aina zipi za anwani, ikijumuisha amana za TEX za Binance.
- [Pochi](/using-zcash/wallets): tumia kichujio cha Anwani ya TEX kupata pochi zinazoweza kulipa anwani ya TEX.
- [Mabwawa ya Faragha](/using-zcash/shielded-pools): mahali salio lako la faragha hukaa kabla ya malipo ya TEX kuhamisha sehemu yake.
- [Nani Anaweza Kuona Malipo Yako ya Zcash](/start-here/who-can-see-your-zcash-payment): kile kinachoonekana fedha zinapotoka kwenye bwawa la faragha.
- [Kile Kichunguzi cha Block Kinaweza Kuona](/zcash-tech/what-a-block-explorer-can-see): jinsi malipo ya uwazi yanavyoonekana on-chain.
- [URI za Ombi la Malipo za Zcash](/using-zcash/payment-request-uris): kiwango kingine cha pochi kwa malipo yaliyojazwa mapema.

**Ilisasishwa mara ya mwisho:** Oktoba 2026
