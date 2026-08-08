<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Processors.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Malipo Processors

Njia za kukubali ZEC kama muuzaji, ikilinganishwa kwa pamoja. Kila kuingia ilichunguzwa dhidi ya tovuti na API ya mtoa huduma mwenyewe mnamo ** 29 Julai 2026**.

Msaada kwa ajili ya mali faragha mabadiliko mara nyingi, hivyo kila safu hubeba yake mwenyewe kuthibitishwa tarehe. Kama wewe ni kusoma hii miezi baadaye, kuangalia tovuti mtoa kabla ya kuunganisha.

<div class="processor-table">

Processor. Custody. Shielded ZEC. Self-host. Merchant ada. Mikoa / KYC. kuthibitishwa.
|:--|:--|:--|:--|:--|:--|:--|
[CipherPay]](https://www.cipherpay.app) ☐ Hakuna ulinzi. ❑ Ndiyo, Orchard kupitia Unified Addresses. ▸ Ndio, chanzo wazi 1% kwa malipo, bure ikiwa mwenyeji binafsi. ❖ Hapana KYC, mikoa haijaonyeshwa 2026-07-29
[Seva ya BTCPay]](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)  Hakuna uhifadhi, angalia tu ufunguo. Ndiyo, kulindwa (Sapling, Orchard, UA) Tu. Ndio, chanzo wazi. Hapana, unalipa ada ya mtandao tu. Global, hakuna KYC 2026-07-29
[ZGo]](https://zgo.cash/) ☐ Hakuna dhamana ya kifungo cha muda. ❑ Ndiyo, Sapling na Orchard. ▸ Hapana, huduma iliyohifadhiwa. ❖ Kipindi kilicholipwa mapema, bei haijachapishwa.  KYC haikutolewa, mikoa haikutajwa. 2026-07-29
[Flexa]](https://flexa.co/) 客户自保,商家以法币结算.客户花费保护,收款方未经记录.没有1% per payment.美国和37SEPA国家,欧盟ZEC未确认2026-07-29
[MASHAURI ya sasa]](https://nowpayments.io/supported-coins/zcash-payments) Hakuna utunzaji kwa default. Hapana, anwani ya uwazi tu. Sio 0.5%, au 1% na ubadilishaji wa kimataifa isipokuwa ambapo marufuku, hakuna KYC kuanza 2026-07-29
[Plisio]](https://plisio.net/accept-zcash)  Weka, licha ya uuzaji. Si kumbukumbu No 0.5% API 1.5% nyeupe lebo Hakuna KYC kupokea 2026-07-29
[Binance Pay]](https://pay.binance.com/en)  Weka, nje ya mlolongo. Hapana, amana za kulindwa zinakataliwa. Hakuna bure mkoba kwa mfuko wa fedha, 0.8% payouts geo-kuzuiliwa, ZEC delisted katika FR, ES, IT, PL 2026-07-29

</div>

### Nguzo hizo zinamaanisha nini?

** Ulinzi wa data** ni kama processor anaweka ZEC yako. Non-Uhifadhi maana yake huenda kwa mkoba wewe kudhibiti.

**ZEC Shielded** ni kama unaweza kulipwa katika bwawa shielded. Uwazi tu ina maana kiasi na anwani ni umma juu ya blockchain.

** Self-host** ni kama unaweza kukimbia programu mwenyewe, bila kampuni katika katikati.

** ada ya mfanyabiashara** haijumuishi ada za mtandao wa Zcash, ambazo mtu hulipa katika kila kesi.

Wakati mtoa huduma haina kuchapisha kitu, kuingia anasema "si alisema" au "hakuna kumbukumbu ya" badala ya nadhani. Hiyo si sawa na "hapana".

### Ni ipi ya kuchagua?

Kwa faragha zaidi na udhibiti, tumia ** Seva ya BTCPay** au mwenyeji wa kibinafsi ** CipherPay. Zote ni ulinzi, chanzo wazi, na hazina pesa kwako.

Kwa kuchukua malipo katika duka badala ya online, kutumia ** Flexa**.

Kwa lango mwenyeji ambapo malipo ya uwazi ni kukubalika, kutumia ** NOWPayments** au ** Plisio.

Moja tahadhari thamani ya kurudia: uwazi tu processor kuchapisha kila kiasi malipo na anwani juu blockchain. Na kwa yoyote mwenyeji zisizo custodial mchakato wewe mkono kuangalia yako muhimu, hivyo kampuni inaweza kuona malipo yako hata kama hawezi kutumia yao. Self-hosting ni njia pekee ili kuepuka kwamba.

<div class="processor-note">

**ZGo huduma onyo, 29 Julai 2026.** Zgo backend katika api.zgo.cash alirudi HTTP 503 juu ya kila mwisho wakati ukurasa huu alikuwa checked. mradi si kutelekezwa na mtunza wake ilikuwa hai katika jamii mwezi huu, lakini kuthibitisha huduma ni mbio kabla kutegemea yake.

</div>

---

## [CipherPay](https://www.cipherpay.app) <img src="/content-images/cipherpay-mark.png" alt="CipherPay logo" class="processor-logo" />
- ** Aina ya msaada**: Shielded (Orchard, kupitia Unified Anwani)
- ** Maelezo**: Kubali Zcash katika dakika, Non-matayarisho, Zero mnunuzi data, Hakuna mpatanishi.
- ** URL**: [CipherPay](https://www.cipherpay.app)
<img src="/content-images/cipherpay-mark.png" alt="CipherPay logo" width="200" hidden />

Wewe kutoa CipherPay view-tu muhimu, hivyo malipo kwenda moja kwa moja kwenye mkoba yako mwenyewe na kamwe ana fedha. Inatumia anwani mpya kwa kila muswada.

Orchard only. There is no Sapling or transparent support, even though the repository README mentions Sapling.

Ni gharama 1% kwa malipo, na kitu chochote wakati wewe kukimbia mwenyewe. Kitu nzima ni wazi chanzo, kama kutu binary pamoja SQLite au kama Docker picha. Hakuna KYC, na wanunuzi hawana haja ya akaunti.

Ushirikiano hufunika Shopify, WooCommerce, REST API, checkout iliyohifadhiwa, viungo vya malipo na QR ya kibinafsi.

Mambo mawili ya kupima. Ilizinduliwa Februari 2026 na hana kuchapishwa ukaguzi wa usalama. Na juu ya tier mwenyeji operator ana kuangalia yako muhimu, hivyo inaweza kuona malipo yako. Self-hosting kuondoa kwamba. Malipo Shielded pia ni mwisho, kwa hiyo refund inahitaji mnunuzi kukupa anwani.

** Mwisho kuthibitishwa:** 2026-07-29

---

## [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin) <img src="/content-images/btcpay-mark.png" alt="BTCPay Server logo" class="processor-logo" />
- **Support Type**: Shielded only (Sapling, Orchard, Unified Address)
- **Maelezo**: BTCPay Server ni wazi chanzo, binafsi mwenyeji cryptocurrency malipo processor.
- ** URL**: [BTCPay Server] (Kifungo cha malipo ya BTC)](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
<img src="/content-images/btcpay-mark.png" alt="BTCPay Server logo" width="200" hidden />

Nguvu chaguo juu ya ulinzi. backend wake mkoba ni view-tu na ana hakuna mbegu au siri muhimu, hivyo hata server compromised hawezi kutumia fedha yako.

Shielded tu, kufunika Sapling, Orchard na Unified anwani. Hakuna uwazi fallback, hivyo si mpango karibu moja.

Kuweka ni unahitaji btcpay-zcash Docker uma kwenye tawi feat / ZEC, pamoja na kuangalia muhimu nje kutoka mkoba kama vile Ywallet au Zingo. By default anaongea kwa lightwalletd kijijini, au unaweza kuendesha Zebra na lightwallettd mwenyewe.

Moja ya mapungufu kujua kuhusu: Plugin inatumia moja Zcash mkoba kwa kila duka juu ya mfano, hivyo si kukimbia kwenye server pamoja. Per-duka pochi ni kuwa kazi katika.

Hakuna ada kwa programu yenyewe. Unalipa Zcash mtandao na gharama yoyote ya mwenyeji wako wa malipo.

** Mwisho kuthibitishwa:** 2026-07-29

---

## [ZGo](https://zgo.cash/) <img src="/content-images/zgo-prp2-497679039b.webp" alt="ZGo logo" class="processor-logo" />
- ** Aina ya msaada**: Shielded (Sapling na Orchard)
- **Maelezo**: ZGo ni malipo ya elektroniki jukwaa kwamba huenda moja kwa moja kutoka mteja wako na wewe, bila vyama vya tatu kushiriki.
- ** URL**: [ZGo](https://zgo.cash/)
<img src="/content-images/zgo-prp2-497679039b.webp" alt="ZGo logo" width="200" hidden />

A hadi kukimbia katika browser, hivyo mbali ya kompyuta ndogo, kibao au simu inakuwa checkout. Pia kuna WooCommerce Plugin na REST API. Ilikuwa kujengwa kwa Vergara Technologies na unafadhiliwa Zcash Community Grants, ikiwa ni pamoja na hoja kutoka zcashd Zebra.

Fedha huenda kutoka kwa mteja moja kwa moja kwenye pochi yako, bila mtu yeyote kati.

Shielded, kufunika Sapling na Orchard kupitia Unified Anwani, na inafuata ZIP 321. hakuna chanzo cha sasa anasema ni kushughulikia anwani uwazi, hivyo ukurasa huu tena madai kwamba anafanya.

Huwezi kweli binafsi mwenyeji yake. ZGo anaendesha miundombinu ya Zcash kwa ajili yenu na kuchapisha hakuna mwongozo kupelekwa. chanzo ni umma juu ya mtunza mwenyewe Git server, ingawa watu nakala GitLab kawaida kupata ni 2022 kioo stale.

ZGo anauza vikao kulipwa kabla na inahitaji kikao Pro kwa WooCommerce, lakini ukurasa bei ni sasa unreachable, hivyo hakuna takwimu inatajwa hapa.

** Mwisho kuthibitishwa:** 2026-07-29

---

## [Flexa](https://flexa.co/) <img src="/content-images/flexa-mark.png" alt="Flexa logo" class="processor-logo" />
- ** Aina ya msaada**: Mteja hutumia ulinzi, upande wa kupokea haujathibitishwa.
- **Maelezo**: Flexa ni mtandao wa malipo ambayo inaruhusu wateja kutumia mali digital, ikiwa ni pamoja na Zcash, katika maeneo ya rejareja kutoka mkoba binafsi kuhifadhi.
- ** URL**: [Flexa]](https://flexa.co/)
<img src="/content-images/flexa-mark.png" alt="Flexa logo" width="200" hidden />

Flexa si gateway ya malipo, hivyo ni sio swap kwa wengine hapa. mteja kufungua Flexa-enabled mfuko kama vile Zodl, inaonyesha code moja wakati na duka scans yake. hakuna ankara ZEC na e-commerce Plugin.

Mteja anaweka sarafu zao wenyewe mpaka wakati wao kulipa. Wewe kama mfanyabiashara kamwe kupokea ZEC. Flexa settles na wewe katika fedha ya kuchagua, hivyo upande crypto ni kushughulikiwa nao.

Flexa mwenyewe tangazo inaelezea Zcash ushirikiano kama kulipa na walinzi ZEC. Ni aina gani ya anwani ambayo Flexa inapokea kwa haijachapishwa popote.

Ada ni 1% kwa malipo, na kubadilisha na uhifadhi pamoja bila gharama ya ziada.

Inafanya kazi nchini Marekani na, tangu Julai 2026, katika nchi 37 za SEPA. Kama ZEC hasa inaweza kutumika Ulaya haijaelezwa.

** Mwisho kuthibitishwa:** 2026-07-29

---

## [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments) <img src="/content-images/nowpayments-wordmark.png" alt="NOWPayments logo" class="processor-logo processor-logo-wide" />
- ** Aina ya msaada**: Uwazi tu.
- **Maelezo**: NOWPayments ni lango la malipo ya crypto ambayo inawawezesha wafanyabiashara kukubali malipo na michango ya Zcash kwa urahisi.
- ** URL**: [NOWMalipo ya sasa]](https://nowpayments.io/supported-coins/zcash-payments)
<img src="/content-images/nowpayments-wordmark.png" alt="NOWPayments logo" width="200" hidden />

Hakuna msaada kulindwa. nyaraka zao anasema kuweka anwani ya uwazi kwa Zcash, na ZEC ni sarafu tu wao pekee nje njia hiyo kila malipo kupokea ni umma juu blockchain.

Hakuna ulinzi kwa default. FAQ yao anasema hawana kuhifadhi fedha na kamwe kushikilia funguo binafsi. Kuna hiari ya uangalizi wa salio, hivyo kuangalia mipangilio yako akaunti kama unahitaji kuwa na uhakika.

Ada ni 0.5% kwa moja malipo, au 1% ya fedha mbalimbali, kiwango cha kudumu, au "ada kulipwa na mtumiaji" malipo, pamoja na ada za mtandao juu.

Inapatikana duniani kote isipokuwa ambapo sheria inakataza. Huna haja ya KYC kuanza kukubali crypto, tu kuondoa fiat.

** Mwisho kuthibitishwa:** 2026-07-29

---

## [Plisio](https://plisio.net/accept-zcash) <img src="/content-images/plisio-wordmark.png" alt="Plisio logo" class="processor-logo processor-logo-wide" />
- ** Aina ya msaada**: Uwazi (si kumbukumbu)
- **Maelezo**: Plisio ni cryptocurrency malipo gateway kwamba inaruhusu biashara kukubali Zcash malipo.
- ** URL**: [Plisio](https://plisio.net/accept-zcash)
<img src="/content-images/plisio-wordmark.png" alt="Plisio logo" width="200" hidden />

Kuitendea kama kuhifadhi. masoko Plisio ya wito ni yasiyo ya uhifadhi, lakini kurasa zake mwenyewe msaada kuelezea mizani uliofanyika kwenye jukwaa, hifadhi baridi na mchakato wa uondoaji. madai non-hifadhi hakuweza kuthibitishwa.

Plisio kamwe anasema ambayo aina ya anwani Zcash anatumia, hivyo kudhani wazi mpaka mtu kuthibitisha vinginevyo.

mkoba ni bure, gateway na API gharama 0.5%, na White Label ni 1.5%. nyeupe Lebo ni rebranding ya huduma yao mwenyeji, si binafsi-hosting.

Huna haja ya KYC kupokea malipo, na hakuna orodha ya nchi zilizozuiliwa kuchapishwa.

** Mwisho kuthibitishwa:** 2026-07-29

---

## [Binance Pay](https://pay.binance.com/en) <img src="/content-images/binancepay-mark.png" alt="Binance Pay logo" class="processor-logo" />
- ** Aina ya msaada**: Uwazi tu, amana za kulindwa zinakataliwa.
- **Maelezo**: Binance Pay ni cryptocurrency malipo jukwaa ambayo inasaidia Zcash malipo.
- ** URL**: [Binance Pay] (Kifungu cha Kiingereza)](https://pay.binance.com/en)
<img src="/content-images/binancepay-mark.png" alt="Binance Pay logo" width="200" hidden />

Binance rejea ZEC kutumwa kutoka anwani ulinzi. kukataa kwamba ni sababu TEX anwani ziliundwa.

Ni kikamilifu custodial. Malipo hoja off-mnyororo kati ya Binance Pay pochi, na unahitaji kuthibitishwa akaunti Binance.

Uhamisho wa mkoba-kwa-mfuko ni bure, malipo ya mfanyabiashara yana gharama 0.8% iliyowekwa juu kwa USD 5, na wafanyabiashara wa Programu ndogo hulipa 1%.

Angalia upatikanaji ambapo wewe ni kabla ya kutegemea juu yake. Binance Pay haitolewa katika baadhi ya nchi na viwanda, ZEC imekuwa delisted kwa watumiaji nchini Ufaransa, Hispania, Italia na Poland tangu 2023, na huduma katika EEA imevurugwa chini MiCA .

** Mwisho kuthibitishwa:** 2026-07-29

---

### Si kukubali tena ZEC

Wote wawili walikuwa waliotajwa hapa kabla. kila mtoaji mwenyewe kuishi orodha ya fedha alikuwa checked juu 29 Julai 2026 na Zcash ni gone kutoka wote mbili.

**CoinPayments** haina orodha ZEC katika v2 yake sarafu ya orodha, urithi wake wa orodha au API zake kuishi fedha, na makala yake Zcash sasa inaelekeza kwa ukurasa wa nyumbani.

**CoinGate** haina orodha ZEC kwenye ukurasa wake mkono sarafu au katika API yake ya umma. Hakuna delisting ilitangazwa, hivyo sababu na tarehe ni haijulikani.

Kama ama huleta Zcash nyuma, kuongeza tena na tarehe safi kuthibitishwa.

### Kuweka ukurasa huu sahihi

Usalama sarafu msaada moves kote, hivyo ukurasa huu ni tu kama nzuri kama kuangalia yake ya mwisho. Wakati wewe kupitia:

1. Angalia mtoa huduma mwenyewe orodha ya sarafu au API. Orodha za tatu walikuwa nje ya tarehe kwa wote wa wasindikaji kuondolewa juu.
2. Angalia ambayo Zcash aina ya anwani ni mkono. "Inasaidia Zcash" kawaida ina maana tu wazi anwani.
3. Sasisha tarehe kuthibitishwa katika meza na sehemu hiyo ya mtoa huduma.
