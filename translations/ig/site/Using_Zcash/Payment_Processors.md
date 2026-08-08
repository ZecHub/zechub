<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Processors.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ndị na-arụ ọrụ ịkwụ ụgwọ Zcash

Ụzọ ị ga-esi nabata ZEC dịka onye ahịa, jiri ya tụnyere ibe. A na-enyocha ntinye ọ bụla megide saịtị nke onye ọrụ ahụ yana API na ** 29 July 2026**.

Nkwado maka akụ nzuzo na-agbanwe mgbe niile, yabụ ahịrị ọ bụla nwere ụbọchị nyocha nke aka ha. Ọ bụrụ n'ịgụ ọnwa ndị a ka e mesịrị, lelee saịtị onye ọrụ tupu ijikọ gị.

<div class="processor-table">

 Processor  Custody  Shielded ZEC  Self-host  Merchant fee  Regions / KYC  Verified  Onye na - eme ihe n'eziokwu  Nhazi oge: Ọ bụrụ na ị nwere ike ịchọta ozi gbasara onye ahịa gị, biko kpọtụrụ anyị.
|:--|:--|:--|:--|:--|:--|:--|
[CipherPay] Ọ bụ ihe na-atọ ụtọ.](https://www.cipherpay.app)  Non-custodial. Ee, Orchard site Unified Addresses. Ee open source 1% kwa ugwo, free ma ọ bụrụ na onwe kwadoro Ọ dịghị KYC, mpaghara adịghị kwuru 2026-07-29
[BTCPay Server]](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin) ❑ Enweghị njide, igodo nlele naanị. ● Ee, ọta nanị (Sapling, Orchard, UA) ▪ Ee, isi mmalite emeghe □ Mba, ị na-akwụ ụgwọ netwọkụ naanị Global, enweghị KYC 2026-07-29
[Zaga n'ihu]](https://zgo.cash/) ❑ N'enweghị onye na-elekọta ya. □ Ee, Sapling and Orchard. ● Mba, ọrụ a kwadoro. ◆ Oge ịkwụ ụgwọ tupu oge eruo, ọnụahịa e bipụtaghị. ▪ Ọ dịghị KYC kwuru, ógbè ndị ahụ ekwughị 2026-07-29
[Flexa] Ọ bụ ihe na-atọ ụtọ.](https://flexa.co/) ◯ Ndị ahịa na-echekwa onwe ha, ndị ọchụnta ego ji mkpụrụ ego nkịtị akwụ ụgwọ. Onye ahịa na emefu ihe n'ụzọ a ga-eji chebe ya, onye natara onyinye ahụ enweghị akwụkwọ e dere ede. Ọ dịghị otu pasent kwa ịkwụ ụgwọ US na mba 37 nke SEPA, ZEC EU ekwenyebeghị 2026-07-29
[Ugbu a ịkwụ ụgwọ]](https://nowpayments.io/supported-coins/zcash-payments)  Enweghị njide site na ndabara. Mba, naanị adreesị doro anya. Ọ dịghị 0.5%, ma ọ bụ 1% nwere ntụgharị. Global belụsọ ebe amachibidoro ya iwu, enweghị KYC ịmalite 2026-07-29
[Plisio] Ọ bụ ihe na-atọ ụtọ.](https://plisio.net/accept-zcash) ◯ Nchebe, n'agbanyeghị ahịa. A dịghị edeba aha ya na akwụkwọ ọ bụla. Mba 0.5% API, 1.5% akara ọcha. Ọ nweghị KYC ịnata 2026-07-29
[Binance na-akwụ ụgwọ]](https://pay.binance.com/en) ◯ Nchebe, n'èzí-mgbasa ozi. ❑ Mba, a jụrụ ego echekwara na nchekwa. ❖ Ee e. ● E nweghị ụgwọ ọ bụla maka obere akpa gị, ịkwụghachi ya bụ 0.8% ▪ Ebe i bi adịghị ekwe ka mmadụ bata ebe ahụ, ZEC ewepụla aha ha ná mba FR, ES, IT, PL 2026-07-29

</div>

### Ihe Ogidi Ndị ahụ Pụtara

**Nchekwa** bụ ma onye nhazi ahụ nwere ZEC gị. Ọ bụghị nchekwa pụtara na ọ ga-aga obere akpa ị na-achịkwa.

**Shielded ZEC** is whether you can be paid into the shielded pool. Transparent only means the amount and addresses are public on the blockchain.

** Self-host** bụ ma ị nwere ike ịgba ọsọ ngwanrọ ahụ n'onwe gị, na enweghị ụlọ ọrụ dị n'etiti.

**Ọrụ ndị ahịa** ewepu ụgwọ netwọkụ Zcash, nke mmadụ na-akwụ n'ọnọdụ ọ bụla.

Mgbe onye na-enye ihe anaghị ebipụta ihe, ntinye ahụ kwuru "ekwughi" ma ọ bụ "edeghị akwụkwọ" kama ịkọ nkọ. Nke a abụghị otu dị ka "mba".

### Olee nke ị ga-ahọrọ?

Maka nzuzo na njikwa kachasị, jiri ** BTCPay Server ** ma ọ bụ nke onwe-akwado ** CipherPay. Ha abụọ nwere nchebe, mepere emepe, ha anaghị ejide ego maka gị.

Iji were ịkwụ ụgwọ n'ụlọ ahịa kama ịntanetị, jiri ** Flexa**.

Maka ọnụ ụzọ mbata ebe a na-anabata ịkwụ ụgwọ doro anya, jiri ** NOWPayments** ma ọ bụ ** Plisio **.

One caveat worth repeating: a transparent-only processor publishes every payment amount and address on the blockchain. And with any hosted non-custodial processor you hand over your viewing key, so the company can see your payments even though it cannot spend them. Self-hosting is the only way to avoid that.

<div class="processor-note">

**ZGo service warning, 29 July 2026.** The ZGo backend at api.zgo.cash returned HTTP 503 on every endpoint while this page was being checked. The project is not abandoned and its maintainer was active in the community this month, but confirm the service is running before you rely on it.

</div>

---

## [CipherPay](https://www.cipherpay.app) <img src="/content-images/cipherpay-mark.png" alt="CipherPay logo" class="processor-logo" />
- ** Ụdị Nkwado**: Echebe (Orchard, site na Unified Addresses)
- Nkọwa: Nabata Zcash na nkeji, Enweghị njide, data onye zụrụ ihe efu, enweghị ndị etiti.
- ** URL**: [CipherPay]](https://www.cipherpay.app)
<img src="/content-images/cipherpay-mark.png" alt="CipherPay logo" width="200" hidden />

Ị na-enye CipherPay igodo naanị, yabụ ịkwụ ụgwọ gafere ozugbo n'akpa gị ma ọ dịghị mgbe o nwere ego. Ọ na - eji adreesị ọhụrụ maka akwụkwọ ọnụahịa niile.

Ọ bụ naanị Orchard. Enweghị Sapling ma ọ bụ nkwado na-enweghị ntụpọ, n'agbanyeghị na ebe nchekwa README kwuru banyere Sapling .

Ọ na-efu 1% kwa ugwo, ma ọ dịghị ihe ọbụla ma ị jiri aka gị rụọ ya. Ihe niile bụ isi mmalite mepere emepe, dị ka ọnụọgụ abụọ Rust nwere SQLite ma ọ bụ dịka onyinyo Docker. Enweghị KYC, ndị zụrụ ahịa anaghị achọ akaụntụ.

Njikọ ndị a na-ekpuchi Shopify, WooCommerce, REST API, ndenye ego kwadoro, njikọ ịkwụ ụgwọ, yana QR n'onwe ya.

Ihe abụọ ị ga-atụle. Ọ malitere na February 2026 ma enweghị nyocha nchekwa a bipụtara. Na ọkwa nnabata onye ọrụ ahụ nwere igodo nlele gị, yabụ ọ nwere ike ịhụ ụgwọ gị. Nchịkọta onwe wepụrụ nke ahụ. Ego echekwara bụkwa njedebe, ya mere nkwụghachi chọrọ ka onye zụrụ ahịa nye gị adreesị.

**Nke ikpeazụ enyocha:** 2026-07-29

---

## [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin) <img src="/content-images/btcpay-mark.png" alt="BTCPay Server logo" class="processor-logo" />
- ** Ụdị nkwado**: Echebe naanị (Sapling, Orchard, Unified Address)
- **Nkọwa**: BTCPay Server bụ ihe na-emeghe, onye nhazi ego cryptocurrency nke onwe ya.
- ** URL**: [BTCPay Server] (Nke a bụ ihe nchọgharị na-enye aka)](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
<img src="/content-images/btcpay-mark.png" alt="BTCPay Server logo" width="200" hidden />

Nhọrọ kachasị ike na njide. Ihe nchekwa ya bụ naanị ihe ngosi ma ghara inwe mkpụrụ ma ọ bụ igodo nzuzo, n'ihi ya ọbụna onye nkesa nwere nsogbu enweghị ike iji ego gị mee ihe.

E kpuchiri ya, na-ekpuchi Sapling, Orchard na Unified Addresses. Enweghị uzo doro anya, n'ihi ya echela atụmatụ gburugburu otu.

To install it you need the btcpay-zcash Docker fork on the feat/zec branch, plus a viewing key exported from a wallet such as Ywallet or Zingo. By default it talks to a remote lightwalletd, or you can run Zebra and lightwalletd yourself.

Otu njedebe ịmara banyere: ngwa mgbakwunye ahụ na-eji otu obere akpa Zcash maka ụlọ ahịa ọ bụla n'otu oge, yabụ anaghị agba ọsọ ya na sava nkesa. A na - arụ ọrụ ego kwa ụlọ ahịa.

Enweghị ụgwọ maka ngwanrọ ahụ n'onwe ya. Ị na-akwụ ụgwọ netwọk Zcash yana ihe ọ bụla ọnụahịa gị nwere ike ịbụ.

**Nke ikpeazụ enyocha:** 2026-07-29

---

## [ZGo](https://zgo.cash/) <img src="/content-images/zgo-prp2-497679039b.webp" alt="ZGo logo" class="processor-logo" />
- ** Ụdị nkwado**: Echebe (Sapling na Orchard)
- **Nkọwa**: ZGo bụ usoro ịkwụ ụgwọ elektrọnik nke na-esi n'aka onye ahịa gị gaa ozugbo, na enweghị ndị ọzọ.
- ** URL**: [ZGo]](https://zgo.cash/)
<img src="/content-images/zgo-prp2-497679039b.webp" alt="ZGo logo" width="200" hidden />

A na-agba ọsọ n'ime ihe nchọgharị, yabụ laptọọpụ, mbadamba ma ọ bụ ekwentị ghọrọ ego. E nwekwara WooCommerce ngwa mgbakwunye na REST API. Ọ wuru Vergara Teknụzụ wee kwụọ ụgwọ site na Zcash Community Grants, gụnyere ịkwaga zcashd ka Zebra .

Ego na-esi n'aka onye ahịa ahụ aga ozugbo n'akpa gị, ọ dịghịkwa onye nọ n'etiti.

Shielded, covering Sapling and Orchard through Unified Addresses, and it follows ZIP 321. No current source says it handles transparent addresses, so this page no longer claims that it does.

You cannot really self-host it. ZGo runs the Zcash infrastructure for you and publishes no deployment guide. The source is public on the maintainer's own Git server, though the GitLab copy people usually find is a stale 2022 mirror.

Ọ bụghịkwa n'efu. ZGo na-ere nnọkọ ndị a kwụrụ ụgwọ ma chọọ oge Pro maka WooCommerce, mana ibe ọnụahịa adịghị ugbu a, yabụ enweghị ọnụọgụ ebe a.

**Nke ikpeazụ enyocha:** 2026-07-29

---

## [Flexa](https://flexa.co/) <img src="/content-images/flexa-mark.png" alt="Flexa logo" class="processor-logo" />
- ** Ụdị nkwado**: Onye ahịa na-emefu ihe echekwara, akụkụ nnata anaghị edepụta ya.
- **Nkọwa**: Flexa bụ netwọkụ ịkwụ ụgwọ nke na-enye ndị ahịa ohere itinye ego dijitalụ, gụnyere Zcash, n'ebe a na-ere ere site na obere akpa nchekwa onwe.
- ** URL**: [Flexa]](https://flexa.co/)
<img src="/content-images/flexa-mark.png" alt="Flexa logo" width="200" hidden />

Flexa abụghị ọnụ ụzọ ịkwụ ụgwọ, yabụ na ọ bụghị mgbanwe maka ndị ọzọ nọ ebe a. Onye ahịa mepee obere akpa ego nke nwere ike ime ka Flexa dị ka Zodl, gosipụta koodu otu oge, ụlọ ahịa ahụ wee nyochaa ya. Enweghị akwụkwọ ọnụahịa ZEC ma ọ bụ ngwa mgbakwunye e-commerce.

The customer keeps their own coins until the moment they pay. You as the merchant never receive ZEC. Flexa settles with you in the currency you choose, so the crypto side is handled by them.

Nkwupụta nke Flexa n'onwe ya na-akọwa njikọta Zcash dị ka ịkwụ ụgwọ site na mkpuchi ZEC. Kedu ụdị adreesị a na -enweta Flexa anaghị ebipụta ebe ọ bụla.

Ụgwọ ahụ bụ 1% kwa ịkwụ ụgwọ, na ntụgharị na nchekwa gụnyere n'enweghị ego ọzọ.

Ọ na-arụ ọrụ na United States, ma kemgbe July 2026, n'ime mba 37 nke SEPA. A kọwaghị ma enwere ike iji ZEC mee ihe na Europe.

**Ikpeazụ enyocha:** 2026-07-29

---

## [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments) <img src="/content-images/nowpayments-wordmark.png" alt="NOWPayments logo" class="processor-logo processor-logo-wide" />
- ** Ụdị nkwado**: Naanị ihe na-ekpuchi anya.
- **Nkọwa**: NOWPayments bụ ọnụ ụzọ ịkwụ ụgwọ crypto nke na-enyere ndị ahịa aka ịnabata Zcash ịkwụ ego na onyinye n'ụzọ dị mfe.
- ** URL**: [Ugbu a ịkwụ ụgwọ]](https://nowpayments.io/supported-coins/zcash-payments)
<img src="/content-images/nowpayments-wordmark.png" alt="NOWPayments logo" width="200" hidden />

Enweghị nkwado echedoro. akwụkwọ ha na-agwa gị ka ị setịpụ adreesị doro anya maka Zcash, ma ZEC bụ naanị mkpụrụ ego ha wepụtara n'ụzọ ahụ. ugwo ọ bụla i nwetara ga-abụ nke ọha na eze na blockchain.

Enweghị njide site na ndabara. FAQ ha kwuru na ha anaghị echekwa ego ma ghara inwe igodo nzuzo. Enwere nguzozi nchekwa nhọrọ, yabụ lelee ntọala akaụntụ gị ma ọ bụrụ na ịchọrọ ijide n'aka.

Ụgwọ ndị a bụ 0.5% maka ịkwụ ụgwọ kwụ ọtọ, ma ọ bụ 1% maka ọtụtụ ego, ọnụego akwụmụgwọ, maọbụ "ụtụ nke onye ọrụ na-akwụ", yana ụtụ netwọk n'elu.

Ọ dị n'ụwa niile ma e wezụga ebe iwu machibidoro ya. Ị chọghị KYC ịmalite ịnabata crypto, naanị iwepụ fiat.

**Ikpeazụ enyocha:** 2026-07-29

---

## [Plisio](https://plisio.net/accept-zcash) <img src="/content-images/plisio-wordmark.png" alt="Plisio logo" class="processor-logo processor-logo-wide" />
- ** Ụdị nkwado**: Transparent (enweghị akwụkwọ)
- **Nkọwa**: Plisio bụ ọnụ ụzọ ịkwụ ụgwọ cryptocurrency nke na-enye ohere azụmaahịa ịnabata ịkwụ ego Zcash.
- ** URL**: [Plisio]](https://plisio.net/accept-zcash)
<img src="/content-images/plisio-wordmark.png" alt="Plisio logo" width="200" hidden />

Treat it as custodial. Plisio's marketing calls it non-custodial, but its own help pages describe balances held on the platform, cold storage and a withdrawal process. The non-custodial claim could not be confirmed.

Plisio anaghị ekwu ụdị adreesị Zcash ọ na-eji, yabụ were dị ka ihe doro anya ruo mgbe mmadụ gosipụtara nke ọzọ.

Akpa ego ahụ bụ n'efu, ọnụ ụzọ na API na-akwụ ụgwọ 0.5%, yana White Label bụ 1.5%. White Label bu rebrand nke oru ha kwadoro, obughi onwe onye.

Ị chọghị KYC iji nweta ego, na enweghị ndepụta nke mba ndị amachibidoro.

**Ikpeazụ enyocha:** 2026-07-29

---

## [Binance Pay](https://pay.binance.com/en) <img src="/content-images/binancepay-mark.png" alt="Binance Pay logo" class="processor-logo" />
- ** Ụdị nkwado**: Naanị ihe na-ekpuchi, a jụrụ ego echekwara echebe.
- **Nkọwa**: Binance Pay bụ usoro ịkwụ ụgwọ cryptocurrency nke na-akwado ịkwụ ego Zcash.
- ** URL**: [Binance Pay] (Nke a bụ ihe na-eme ka ọ bụrụ ọrụ)](https://pay.binance.com/en)
<img src="/content-images/binancepay-mark.png" alt="Binance Pay logo" width="200" hidden />

Binance na-agbagha ZEC zitere site na adreesị echedoro. Ọjụjụ ahụ bụ ihe kpatara e ji kee adres TEX.

Ọ bụ ihe echekwara kpamkpam. Ịkwụ ụgwọ na-agafe n'etiti obere akpa Binance Pay, ma ịchọrọ akaụntụ nyocha nke Binance.

Nnyefe ego na-akwụghị ụgwọ, ịkwụ ụgwọ ndị ahịa na-efu 0.8% nke nwere oke 5 USD, yana ndị ahịa Mini Program na- akwụ 1%.

Lelee nnweta ebe ị nọ tupu ịdabere na ya. Binance Pay anaghị enye ụfọdụ mba na ụlọ ọrụ, ZEC ewepụla ndị ọrụ France, Spain, Italy na Poland kemgbe 2023, yana ọrụ EEA akwụsịla n'okpuru MiCA .

**Ikpeazụ enyocha:** 2026-07-29

---

### Anaghịzi anabata ZEC

E depụtara ha abụọ ebe a na mbụ. A nyochara ndepụta ego nke onye ọ bụla nyere ya na 29 Julaị 2026 ma Zcash apụla n'ime ha niile.

**CoinPayments** does not list ZEC in its v2 coin list, its legacy list, or its live currencies API, and its Zcash article now redirects to the homepage.

**CoinGate** anaghị edepụta ZEC na ibe ego ya akwadoro ma ọ bụ n'ime API ọha. Enweghị ọkwa de-ndebanye aha, yabụ amaghị ihe kpatara ya na ụbọchị a ga - eme ya.

Ọ bụrụ na nke ọ bụla n'ime ha eweghachi Zcash, tinye ya ọzọ site n'ịtụgharị ụbọchị ọhụrụ.

### Ịdebe peeji a ka ọ bụrụ nke ziri ezi.

Nkwado ego nzuzo na-agagharị, yabụ ibe a dị mma dịka nyocha ikpeazụ. Mgbe ị nyochachara:

1. Lelee ndepụta ego nke onye na-eweta ya ma ọ bụ API. Ndepụta ndị ọzọ emebiwo maka usoro nhazi abụọ ahụ e wepụrụ n'elu.
2. Lelee ụdị adreesị Zcash a na-akwado. "Na-akwado Zcash" pụtara naanị adres ndị doro anya.
3. Melite ụbọchị nyocha na tebụl ahụ yana ngalaba nke onye ọrụ.
