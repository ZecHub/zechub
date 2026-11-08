<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Processors.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Axa Page"/>
</a>

# Zcash Fexexe [Payment] Ƒe Wɔwɔlawo

Mɔnu siwo dzi wòate ŋu axɔ ZEC abe asitsalá ene, woƒe tsatsam ƒe tsatsam. Wokpɔ nuɖoɖo siawo katã ɖe nudzɔdzɔla ƒe aƒeŋkume kple API ŋu le **29 July 2026**.

Ɣe sia ƒe, ɣaɣla [privacy] ƒe assets ƒe kpekpeɖeŋu trɔna zi geɖe, eyata le ɖe sia ɖe me woƒe ɣeyiɣi si woɖo kpe ɖe ŋu le. Ne èle esiam le ƒlẽ geɖe megbe la, kpɔ nudzɔdzɔla ƒe aƒeŋkume do ŋgɔ hafi nàtsɔe ade wò dɔ me.

<div class="processor-table">

| Wɔwɔla | Ga ƒe dzrɔdzrɔ | Ɣaɣla ZEC | Wò ŋutɔ ƒe host | Asitsalá ƒe adzɔ [fee] | Dziƒoƒe / KYC | Woɖo kpe ɖe ŋu |
|:--|:--|:--|:--|:--|:--|:--|
| [CipherPay](https://www.cipherpay.app) | Menye asikplɔ-dzralá [custodial] o | Ɛ̃, Orchard to Unified Addresses me | Ɛ̃, open source | 1% le fexexe ɖe sia ɖe ŋu, blibo ne wòhoste wò ŋutɔ | KYC manɔ o, wometsɔ dziƒoƒewo fia o | 2026-07-29 |
| [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin) | Menye asikplɔ-dzralá o, nukpɔsafui [viewing key] ko | Ɛ̃, ɣaɣla ko (Sapling, Orchard, UA) | Ɛ̃, open source | Aɖeke o, ɖoɖonu [chain] ƒe adzɔwo ko nàxe | Xexeme blibo, KYC manɔ o | 2026-07-29 |
| [ZGo](https://zgo.cash/) | Menye asikplɔ-dzralá o | Ɛ̃, Sapling kple Orchard | Ao, hosted service | Session si woƒo nu da ɖi, wometsɔ asixɔxɔ fia o | Wometsɔ KYC ƒe nyawo fia o, wometsɔ dziƒoƒewo fia o | 2026-07-29 |
| [Flexa](https://flexa.co/) | Asiƒo ƒe dzralá ƒe gakplɔ, asitsalá xea ga le fiat me | Asiƒo zã ɣaɣla, wometsɔ nu si xɔe ƒe nyawo fia o | Ao | 1% le fexexe ɖe sia ɖe ŋu | US kple SEPA dukɔ 37, ZEC le EU me menye nyateƒe le o | 2026-07-29 |
| [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments) | Menye asikplɔ-dzralá o le gɔmedzedze | Ao, nuwo ƒe ʋuʋuɖi [transparent] gaɖoƒe ƒe dzesi [address] ko | Ao | 0.5%, alo 1% ne woɖe ga trɔ | Xexeme blibo, ke afi si se mele mɔ o, KYC mele be nàdze egɔme o | 2026-07-29 |
| [Plisio](https://plisio.net/accept-zcash) | Asikplɔ-dzralá, togbɔ be woƒe asitsotso ƒe nyawo gblɔ bubu | Wometsɔe ɖe agbalẽ me o | Ao | 0.5% API, 1.5% white label | KYC mele be nàxɔe o | 2026-07-29 |
| [Binance Pay](https://pay.binance.com/en) | Asikplɔ-dzralá, le ɖoɖonu me o | Ao, woɖe ɣaɣla deposits gbɔ | Ao | Gakotoku [wallet] tso gakotoku me ƒe fexexe blibo, 0.8% payouts | Woɖo geo-restriction, ZEC meganɔ le FR, ES, IT, PL o | 2026-07-29 |

</div>

### Nu si columns ƒe gɔme nye

**Ga ƒe dzrɔdzrɔ** nye be ɖe wɔwɔla la kplɔ wò ZEC alo o. Menye asikplɔ-dzralá o gɔme nye be eƒo ɖe gakotoku si wò kplɔ la me.

**Ɣaɣla ZEC** nye be woate ŋu axe ga na wò le ɣaɣla gaƒuƒoƒo [pool] me alo o. Nuwo ƒe ʋuʋuɖi ko gɔme nye be ga ƒe home kple gaɖoƒe ƒe dzesiwo le dzeɖoɖo kple gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu [blockchain] dzi.

**Wò ŋutɔ ƒe host** nye be nàte ŋu anɔ software la ƒe dɔ wɔ wò ŋutɔ, eye company aɖeke manɔ titina o.

**Asitsalá ƒe adzɔ** mekpɔ Zcash ɖoɖonu ƒe adzɔwo o, elabena ame aɖe xea wo le nu ɖe sia ɖe me.

Afi si nudzɔdzɔla aɖe meɖe nu aɖe ƒe nyawo afia o la, entry la gblɔ be "wometsɔe fia o" alo "wometsɔe ɖe agbalẽ me o" ɖe nusi woatsɔe akaka la teƒe. Esi menye nu ma ke kple "ao" o.

### Ame kae nàtia

Ne èdi ɣaɣla kple dziɖuɖu geɖe wu la, zã **BTCPay Server** alo **CipherPay** si wòhoste wò ŋutɔ. Wo evea nye ɣaɣla, open source, eye wometsɔ wò ga aɖeke ɖe asi o.

Ne èdi be nàxɔ fexexewo le fiadƒe me le online ƒe teƒe la, zã **Flexa**.

Ne èdi hosted gateway afi si nuwo ƒe ʋuʋuɖi fexexewo dzɔ na wò la, zã **NOWPayments** alo **Plisio**.

Nu ɖeka si wòhiã be woagblɔe ake nye esi: wɔwɔla si xɔ nuwo ƒe ʋuʋuɖi ko la ɖea fexexe ƒe home kple gaɖoƒe ƒe dzesi ɖe sia ɖe fia le gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu dzi. Eye le hosted processor si menye asikplɔ-dzralá o ɖe sia ɖe me la, nètsɔ wò nukpɔsafui de asi na wo, ale be company la ate ŋu akpɔ wò fexexewo togbɔ be mate ŋu azã wo o. Wò ŋutɔ ƒe hosting ko nye mɔ si dzi nàte ŋu aƒo nu ma gbɔ.

<div class="processor-note">

**ZGo service ƒe nyagblɔɖi, 29 July 2026.** Le esime wokpɔ axa sia ɖa la, ZGo backend le api.zgo.cash trɔ HTTP 503 na endpoint ɖe sia ɖe. Womegbɔ project la o, eye eƒe maintainer wɔ dɔ le community la me le ƒleti sia me, ke kpɔ be service la le dɔ wɔm hafi nàka ɖe eŋu.

</div>

---

## [CipherPay](https://www.cipherpay.app) <img src="/content-images/cipherpay-mark.png" alt="CipherPay logo" class="processor-logo" />
- **Kpekpeɖeŋu ƒe ƒomevi**: Ɣaɣla (Orchard, to Unified Addresses me)
- **Nuxlɔɖi**: Xɔ Zcash le minutewo me, menye asikplɔ-dzralá o, asiƒo ƒe nyawo aɖeke mele o, ame aɖeke menɔ titina o.
- **URL**: [CipherPay](https://www.cipherpay.app)
<img src="/content-images/cipherpay-mark.png" alt="CipherPay logo" width="200" hidden />

Nèna CipherPay nukpɔsafui si kpɔna ko, ale be fexexewo ayi tẽ ɖe wò ŋutɔ ƒe gakotoku me eye womekpɔ ga aɖeke ɖe asi o. Ezã gaɖoƒe ƒe dzesi yeyee na invoice ɖe sia ɖe.

Orchard ko. Sapling alo nuwo ƒe ʋuʋuɖi ƒe kpekpeɖeŋu mele o, togbɔ be repository README la gblɔ Sapling ƒe nya.

Eƒe asixɔxɔ nye 1% le fexexe ɖe sia ɖe ŋu, eye mele naneke o ne wònɔ eƒe dɔ wɔm wò ŋutɔ. Nu blibo la nye open source, abe Rust binary si kplɔ SQLite alo abe Docker image ene. KYC mele o, eye asiƒolawo mehiã account o.

Integrations la kpɔ Shopify, WooCommerce, REST API, hosted checkout, payment links, kple QR si woazã le ame ŋkume.

Nu eve koe nàle dzidzime. Wodzii le February 2026 eye security audit si woɖe fia mele o. Eye le hosted tier la me, operator la kpɔa wò nukpɔsafui ɖe asi, ale be wòate ŋu akpɔ wò fexexewo. Wò ŋutɔ ƒe hosting ɖea esia ɖa. Ɣaɣla ƒe fexexewo nye nu mamlɛtɔ, eyata refund hiã be asiƒo la nana gaɖoƒe ƒe dzesi na wò.

**Ɣeyiɣi mamlɛ si woɖo kpe ɖe ŋu:** 2026-07-29

---

## [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin) <img src="/content-images/btcpay-mark.png" alt="BTCPay Server logo" class="processor-logo" />
- **Kpekpeɖeŋu ƒe ƒomevi**: Ɣaɣla ko (Sapling, Orchard, Unified Address)
- **Nuxlɔɖi**: BTCPay Server nye cryptocurrency fexexe ƒe wɔwɔla si nye open-source, si wòhoste wò ŋutɔ.
- **URL**: [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
<img src="/content-images/btcpay-mark.png" alt="BTCPay Server logo" width="200" hidden />

Esi nye mɔ kɔkɔe ŋutɔ le ga ƒe dzrɔdzrɔ me. Eƒe gakotoku backend kpɔna ko eye mekpɔ seed alo secret key aɖeke ɖe asi o, ale be togbɔ be server la ƒe ɖɔɖɔ dze o la, mate ŋu azã wò ga o.

Ɣaɣla ko, esi kpɔ Sapling, Orchard kple Unified Addresses. Nuwo ƒe ʋuʋuɖi ƒe fallback mele o, eyata mègaɖo wò ɖoɖo ɖe eŋu o.

Be nàtsɔe ade la, wòhiã btcpay-zcash Docker fork le feat/zec branch dzi, kple nukpɔsafui si woɖe tso gakotoku abe Zkool alo Zingo me. Le gɔmedzedze me la, eƒoa nu kple remote lightwalletd, alo nàte ŋu anɔ Zebra kple lightwalletd ƒe dɔ wɔ wò ŋutɔ.

Nu si nànyae nye esi: plugin la zãa Zcash gakotoku ɖeka na store ɖe sia ɖe si le instance aɖe me, eyata mègaɖe eƒe dɔ ɖe shared server dzi o. Wole store ɖe sia ɖe ƒe gakotokuwɔwɔ ŋu dɔ wɔm.

Adzɔ aɖeke mele software la ŋutɔ ŋu o. Nàxe Zcash ɖoɖonu ƒe adzɔwo kple nusi wòƒe hosting xɔ.

**Ɣeyiɣi mamlɛ si woɖo kpe ɖe ŋu:** 2026-07-29

---

## [ZGo](https://zgo.cash/) <img src="/content-images/zgo-prp2-497679039b.webp" alt="ZGo logo" class="processor-logo" />
- **Kpekpeɖeŋu ƒe ƒomevi**: Ɣaɣla (Sapling kple Orchard)
- **Nuxlɔɖi**: ZGo nye electronic fexexe ƒe platform si tso wò asiƒo gbɔ tẽ va wò gbɔ, eye ame etɔ̃ aɖeke menɔ eme o.
- **URL**: [ZGo](https://zgo.cash/)
<img src="/content-images/zgo-prp2-497679039b.webp" alt="ZGo logo" width="200" hidden />

E nye till si nàzã le browser me, ale be laptop, tablet alo telefon zu checkout. WooCommerce plugin kple REST API hã le eme. Vergara Technologies wɔe, eye Zcash Community Grants ƒo ga na e, esi me tso zcashd yi Zebra me hã le.

Ga tso asiƒo la gbɔ tẽ yi wò gakotoku me, eye ame aɖeke menɔ titina o.

E nye ɣaɣla, eye ekpɔ Sapling kple Orchard to Unified Addresses me, eye ewɔ ɖe ZIP 321 nu. Source aɖeke si le fifia megblɔ be ekpɔ nuwo ƒe ʋuʋuɖi gaɖoƒe ƒe dzesiwo o, eyata axa sia megblɔ be ekpɔ wo o.

Mègakpɔa mɔ be nàhoste e ŋutɔ o. ZGo wɔa Zcash infrastructure ƒe dɔ na wò, eye wometsɔ deployment guide aɖeke ɖe go o. Source la le maintainer la ŋutɔ ƒe Git server dzi, ke GitLab copy si amewo kpɔna zi geɖe la nye 2022 ƒe mirror si meyeye o.

Emegaxɔa blibo hã o. ZGo lia prepaid sessions eye Pro session hiã na WooCommerce, ke pricing page la mate ŋu ava o le fifia, eyata wometsɔ asixɔxɔ aɖeke de afi sia o.

**Ɣeyiɣi mamlɛ si woɖo kpe ɖe ŋu:** 2026-07-29

---

## [Flexa](https://flexa.co/) <img src="/content-images/flexa-mark.png" alt="Flexa logo" class="processor-logo" />
- **Kpekpeɖeŋu ƒe ƒomevi**: Asiƒo zã ɣaɣla, wometsɔ nu si xɔe ƒe nyawo fia o
- **Nuxlɔɖi**: Flexa nye fexexe ƒe network si na asiƒolawo mɔ be woazã digital assets, Zcash hã le wo dome, le retail afiwo me tso gakotoku si woaŋutɔ kplɔ me.
- **URL**: [Flexa](https://flexa.co/)
<img src="/content-images/flexa-mark.png" alt="Flexa logo" width="200" hidden />

Flexa menye checkout gateway o, eyata menye ɖɔli ɖɔli [swap] na bubuwo si le afisia o. Asiƒo la ƒe gakotoku si Flexa de mɔ na, abe Zodl ene, ɖea, efia code si woazã zi ɖeka, eye fiadƒe la scan-ae. ZEC invoice alo e-commerce plugin aɖeke mele o.

Asiƒo la kpɔa eƒe coins ɖe asi va se ɣeyiɣi si wòaxe ga. Wò abe asitsalá ene la, mèxɔa ZEC o. Flexa xea ga kple wò le currency si wòtia me, eyata woawɔ crypto ƒe akpa la.

Flexa ƒe announcement ŋutɔ gblɔ be Zcash integration la nye fexexe kple ɣaɣla ZEC. Gaɖoƒe ƒe dzesi ƒe ƒomevi si Flexa xɔe ɖo la, wometsɔe fia afia aɖeke o.

Adzɔ la nye 1% le fexexe ɖe sia ɖe ŋu, eye ga trɔtrɔ kple ga ƒe dzrɔdzrɔ le eme, eye womexɔ ga bubu o.

Ewɔ dɔ le United States me, eye tso July 2026 me la, le SEPA dukɔwo kple anyigba 37 me. Wometsɔe fia be ZEC ŋutɔ ate ŋu woazãe le Europe o.

**Ɣeyiɣi mamlɛ si woɖo kpe ɖe ŋu:** 2026-07-29

---

## [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments) <img src="/content-images/nowpayments-wordmark.png" alt="NOWPayments logo" class="processor-logo processor-logo-wide" />
- **Kpekpeɖeŋu ƒe ƒomevi**: Nuwo ƒe ʋuʋuɖi ko
- **Nuxlɔɖi**: NOWPayments nye crypto fexexe ƒe gateway si na asitsaláwo mɔ be woaxɔ Zcash fexexewo kple donations bɔbɔe.
- **URL**: [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments)
<img src="/content-images/nowpayments-wordmark.png" alt="NOWPayments logo" width="200" hidden />

Ɣaɣla ƒe kpekpeɖeŋu mele o. Woƒe documentation gblɔ be nàɖo nuwo ƒe ʋuʋuɖi gaɖoƒe ƒe dzesi na Zcash, eye ZEC koe nye coin si woɖe fia le mɔ ma nu. Fexexe ɖe sia ɖe si nèxɔ nye nu si dze ɖe dzeɖoɖo me le gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu dzi.

Menye asikplɔ-dzralá o le gɔmedzedze me. Woƒe FAQ gblɔ be wometsɔa ga ɖe asi o eye wometsɔa private keys kpɔa ɖe asi o. Custody balance si wòate ŋu atia le, eyata kpɔ wò account settings ne èdi be nànya nyateƒe.

Adzɔwo nye 0.5% na fexexe si yi tẽ, alo 1% na multi-currency, fixed-rate, alo "asiƒo xea adzɔ" ƒe fexexewo, eye ɖoɖonu ƒe adzɔwo sɔ kpe ɖe eŋu.

Ewɔ dɔ le xexeme blibo me, afi si se mele mɔ o koe katã. KYC mehiã be nàdze crypto ƒe xɔxɔ gɔme o, ke ehiã be nàɖe fiat ga ɖa.

**Ɣeyiɣi mamlɛ si woɖo kpe ɖe ŋu:** 2026-07-29

---

## [Plisio](https://plisio.net/accept-zcash) <img src="/content-images/plisio-wordmark.png" alt="Plisio logo" class="processor-logo processor-logo-wide" />
- **Kpekpeɖeŋu ƒe ƒomevi**: Nuwo ƒe ʋuʋuɖi (wometsɔe ɖe agbalẽ me o)
- **Nuxlɔɖi**: Plisio nye cryptocurrency fexexe ƒe gateway si na businesses mɔ be woaxɔ Zcash fexexewo.
- **URL**: [Plisio](https://plisio.net/accept-zcash)
<img src="/content-images/plisio-wordmark.png" alt="Plisio logo" width="200" hidden />

Bu be enye asikplɔ-dzralá. Plisio ƒe marketing gblɔ be menye asikplɔ-dzralá o, ke eƒe help pages ŋutɔ gblɔ balancewo si woɖe ɖe platform la me, cold storage kple withdrawal ƒe mɔ. Womate ŋu aɖo kpe ɖe nyagblɔ be menye asikplɔ-dzralá o la ŋu o.

Plisio megblɔ gaɖe Zcash gaɖoƒe ƒe dzesi ƒe ƒomevi si ezã o, eyata bu be nye nuwo ƒe ʋuʋuɖi va se ɣeyiɣi si ame aɖe aɖo kpe ɖe bubu ŋu.

Gakotoku la nye blibo, gateway kple API xɔ 0.5%, eye White Label xɔ 1.5%. White Label nye woƒe hosted service ƒe rebrand, menye wò ŋutɔ ƒe hosting o.

KYC mehiã be nàxɔ fexexewo o, eye dukɔwo si woƒo nu na ƒe list aɖeke mele o.

**Ɣeyiɣi mamlɛ si woɖo kpe ɖe ŋu:** 2026-07-29

---

## [Binance Pay](https://pay.binance.com/en) <img src="/content-images/binancepay-mark.png" alt="Binance Pay logo" class="processor-logo" />
- **Kpekpeɖeŋu ƒe ƒomevi**: Nuwo ƒe ʋuʋuɖi ko, woɖea ɣaɣla deposits gbɔ
- **Nuxlɔɖi**: Binance Pay nye cryptocurrency fexexe ƒe platform si kpe ɖe Zcash fexexewo ŋu.
- **URL**: [Binance Pay](https://pay.binance.com/en)
<img src="/content-images/binancepay-mark.png" alt="Binance Pay logo" width="200" hidden />

Binance ɖea ZEC si woɖo tso ɣaɣla gaɖoƒe ƒe dzesiwo gbɔ. Nudzɔdzɔ sia tae wo wɔ TEX gaɖoƒe ƒe dzesiwo.

Enye asikplɔ-dzralá blibo. Fexexewo lia le ɖoɖonu me o le Binance Pay gakotokuwɔwo dome, eye wòhiã Binance account si woɖo kpe ɖe ŋu.

Gakotoku tso gakotoku me ƒe transferwo nye blibo, asitsalá ƒe payouts xɔ 0.8% si wotɔ ɖe 5 USD dzi, eye Mini Program ƒe asitsaláwo xɔ 1%.

Kpɔ be ewɔ dɔ le afi si nèle hafi nàka ɖe eŋu. Binance Pay mele dukɔ aɖewo kple dɔ ƒe ƒomevi aɖewo me o, ZEC meganɔ le France, Spain, Italy kple Poland ƒe zãlawo gbɔ tso 2023 me o, eye MiCA ta me la, service le EEA me mewɔ dɔ nyuie o.

**Ɣeyiɣi mamlɛ si woɖo kpe ɖe ŋu:** 2026-07-29

---

### Womegaxɔa ZEC o

Woŋlɔ wo evea le afisia do ŋgɔ. Wokpɔ nudzɔdzɔla ɖe sia ɖe ƒe currency list si le dɔ wɔm le 29 July 2026, eye Zcash meganɔ wo evea gbɔ o.

**CoinPayments** meɖe ZEC fia le eƒe v2 coin list, eƒe legacy list, alo eƒe live currencies API me o, eye eƒe Zcash article trɔa yi homepage la dzi fifia.

**CoinGate** meɖe ZEC fia le eƒe supported currencies ƒe axa alo eƒe public API me o. Womeɖe delisting ƒe nyagblɔɖi aɖeke go o, eyata menya ta kple ɣeyiɣi si wowo esia o.

Ne ame aɖe hã tsɔ Zcash va gbɔ la, tsɔe gbugbɔ kple ɣeyiɣi yeye si woɖo kpe ɖe ŋu.

### Ale si nàkpɔ be axa sia nɔ nyateƒe

Privacy coin ƒe kpekpeɖeŋu trɔna, eyata axa sia ƒe nyuie le eƒe ɣeyiɣi mamlɛ si wokpɔe ɖa ko dzi. Ne èkpɔe ɖa la:

1. Kpɔ nudzɔdzɔla la ŋutɔ ƒe currency list alo API. Third-party lists meyɔ o na processors eve si woɖe ɖa le afima.
2. Kpɔ Zcash gaɖoƒe ƒe dzesi ƒe ƒomevi si woakpe ɖe ŋu. "Ekpe ɖe Zcash ŋu" gɔme nye nuwo ƒe ʋuʋuɖi gaɖoƒe ƒe dzesiwo ko zi geɖe.
3. Trɔ ɣeyiɣi si woɖo kpe ɖe ŋu le table la me kple nudzɔdzɔla ma ƒe section me.
