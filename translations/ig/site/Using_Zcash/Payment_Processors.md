<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Processors.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Dezie Ibe"/>
</a>

# Zcash Ndị na-ahazi Kwụọ ụhwọ

Ụzọ ndị ahịa si anabata ZEC, tụnyere ibe ha n'akụkụ. E nyochara ntinye ọ bụla megide saịtị na API nke onye na-eweta ya n'onwe ya na **29 Julaị 2026**.

Nkwado maka akụ Nzuzo na-agbanwe ugboro ugboro, ya mere ahịrị ọ bụla nwere ụbọchị nyochara nke ya. Ọ bụrụ na ị na-agụ nke a ọnwa ole na ole ka e mesịrị, lelee saịtị onye na-eweta ya tupu ị jikọta ya.

<div class="processor-table">

| Onye nhazi | Nlekọta | ZEC nke e chebere echebe | Ịnabata onwe gị | Ugwo onye ahịa | Mpaghara / KYC | Nyochara |
|:--|:--|:--|:--|:--|:--|:--|
| [CipherPay](https://www.cipherpay.app) | Ọ bụghị Onye nlekota | Ee, Orchard site na Unified Addresses | Ee, open source | 1% maka Kwụọ ụhwọ ọ bụla, n'efu ma ọ bụrụ na ịnabata ya n'onwe gị | Enweghị KYC, ekwughị mpaghara | 2026-07-29 |
| [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin) | Ọ bụghị Onye nlekota, naanị view key | Ee, naanị nke e chebere echebe (Sapling, Orchard, UA) | Ee, open source | Ọ dịghị, ị na-akwụ naanị ugwo netwọk | Ụwa niile, enweghị KYC | 2026-07-29 |
| [ZGo](https://zgo.cash/) | Ọ bụghị Onye nlekota | Ee, Sapling na Orchard | Mba, ọrụ anabatara | Oge a kwụrụ tupu oge eruo, ebipụtaghị ọnụahịa | Ekwughị enweghị KYC, ekwughị mpaghara | 2026-07-29 |
| [Flexa](https://flexa.co/) | Onye ahịa na-elekọta onwe ya, onye azụmaahịa na-anata ego fiat | Onye ahịa na-emefu nke e chebere echebe, edeghị akụkụ na-anata ihe | Mba | 1% maka Kwụọ ụhwọ ọ bụla | US na mba SEPA 37, ZEC na EU ekwenyebeghị | 2026-07-29 |
| [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments) | Ọ bụghị Onye nlekota dịka ndabara | Mba, naanị Adreesị akpa ego Oha | Mba | 0.5%, ma ọ bụ 1% na ntụgharị | Ụwa niile ewezuga ebe amachibidoro, enweghị KYC iji malite | 2026-07-29 |
| [Plisio](https://plisio.net/accept-zcash) | Onye nlekota, n'agbanyeghị mgbasa ozi | Edeghị | Mba | 0.5% API, 1.5% white label | Enweghị KYC iji nata | 2026-07-29 |
| [Binance Pay](https://pay.binance.com/en) | Onye nlekota, off-chain | Mba, a jụrụ nkwụnye ego nke e chebere echebe | Mba | E-akpa ego gaa e-akpa ego n'efu, 0.8% nkwụpụta | Amachibidoro n'ebe ụfọdụ, ewepụla ZEC na FR, ES, IT, PL | 2026-07-29 |

</div>

### Ihe kọlụm ndị a pụtara

**Nlekọta** bụ ma onye nhazi ahụ jidere ZEC gị. Ọ bụghị Onye nlekota pụtara na ọ na-aga n'e-akpa ego ị na-achịkwa.

**ZEC nke e chebere echebe** bụ ma enwere ike ịkwụ gị n'ime pool nke e chebere echebe. Naanị Oha pụtara na ego na Adreesị akpa ego bụ nke ọha na blockchain.

**Ịnabata onwe gị** bụ ma ị nwere ike ịgba sọftụwia ahụ n'onwe gị, na-enweghị ụlọ ọrụ n'etiti.

**Ugwo onye ahịa** anaghị agụnye ugwo netwọk Zcash, nke mmadụ ga-akwụ n'ọnọdụ ọ bụla.

Ebe onye na-eweta ya anaghị ebipụta ihe, ntinye ahụ na-ekwu “ekwughị” ma ọ bụ “edeghị” kama ịkọ nkọ. Nke ahụ abụghị otu ihe na “mba”.

### Nke ị ga-ahọrọ

Maka Nzuzo na njikwa kacha elu, jiri **BTCPay Server** ma ọ bụ **CipherPay** ị nabatara n'onwe gị. Ha abụọ bụ nke e chebere echebe, open source, ha anaghị ejide ego gị.

Maka ịnara Kwụọ ụhwọ n'ụlọ ahịa kama n'ịntanetị, jiri **Flexa**.

Maka gateway anabatara ebe Kwụọ ụhwọ Oha na-anabata, jiri **NOWPayments** ma ọ bụ **Plisio**.

Otu ịdọ aka ná ntị kwesịrị ikwughachi: onye nhazi naanị-Oha na-ebipụta ego na Adreesị akpa ego nke Kwụọ ụhgwọ ọ bụla na blockchain. Nakwa, na onye nhazi ọ bụla anabatara nke na-abụghị Onye nlekota, ị na-enyefe viewing key gị, yabụ ụlọ ọrụ ahụ nwere ike ịhụ Kwụọ ụhwọ gị n'agbanyeghị na ọ pụghị imefu ha. Ịnabata onwe gị bụ naanị ụzọ isi zere nke ahụ.

<div class="processor-note">

**Ịdọ aka ná ntị maka ọrụ ZGo, 29 Julaị 2026.** Backend ZGo dị na api.zgo.cash weghachiri HTTP 503 n'ebe njedebe ọ bụla mgbe a na-enyocha ibe a. Ahapụghị ọrụ ahụ ma onye na-elekọta ya nọ na-arụsi ọrụ ike n'obodo n'ọnwa a, mana kwado na ọrụ ahụ na-agba tupu ịdabere na ya.

</div>

---

## [CipherPay](https://www.cipherpay.app) <img src="/content-images/cipherpay-mark.png" alt="CipherPay logo" class="processor-logo" />
- **Ụdị nkwado**: Nke e chebere echebe (Orchard, site na Unified Addresses)
- **Nkọwa**: Nabata Zcash n'ime nkeji ole na ole, Ọ bụghị Onye nlekota, enweghị data onye zụrụ ihe, enweghị onye etiti.
- **URL**: [CipherPay](https://www.cipherpay.app)
<img src="/content-images/cipherpay-mark.png" alt="CipherPay logo" width="200" hidden />

Ị na-enye CipherPay view-only key, yabụ Kwụọ ụhwọ na-aga ozugbo n'e-akpa ego nke gị, ọ dịghị ejide ego. Ọ na-eji Adreesị akpa ego ọhụrụ maka invoice ọ bụla.

Naanị Orchard. Enweghị nkwado Sapling ma ọ bụ Oha, n'agbanyeghị na README ebe nchekwa kwuru Sapling.

Ọ na-efu 1% maka Kwụọ ụhwọ ọ bụla, ọ nweghịkwa ihe ọ bụla ma ọ bụrụ na ị gbaa ya n'onwe gị. Ihe niile bụ open source, dịka binary Rust nwere SQLite ma ọ bụ image Docker. Enweghị KYC, ndị zụrụ ihe achọghị akaụntụ.

Njikọta gụnyere Shopify, WooCommerce, REST API, checkout anabatara, njikọ Kwụọ ụhwọ, na QR n'onwe mmadụ.

Ihe abụọ ị ga-atụle. E hiwere ya na Febrụwarị 2026 ma o nweghị audit nchekwa ebipụtara. Nakwa, n'ọkwa anabatara, onye na-arụ ya na-ejide viewing key gị, yabụ ọ nwere ike ịhụ Kwụọ ụhgwọ gị. Ịnabata onwe gị na-ewepụ nke ahụ. Kwụọ ụhwọ nke e chebere echebe bụkwa nke ikpeazụ, yabụ nkwụghachi chọrọ ka onye zụrụ ihe nye gị Adreesị akpa ego.

**Nyochara ikpeazụ:** 2026-07-29

---

## [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin) <img src="/content-images/btcpay-mark.png" alt="BTCPay Server logo" class="processor-logo" />
- **Ụdị nkwado**: Naanị nke e chebere echebe (Sapling, Orchard, Unified Address)
- **Nkọwa**: BTCPay Server bụ onye nhazi Kwụọ ụhwọ cryptocurrency open-source, nke ị nabatara n'onwe gị.
- **URL**: [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
<img src="/content-images/btcpay-mark.png" alt="BTCPay Server logo" width="200" hidden />

Nhọrọ kacha sie ike n'ihe gbasara nlekọta. Backend e-akpa ego ya bụ naanị view-only ma ọ naghị ejide seed ma ọ bụ secret key, yabụ ọbụna sava e merụrụ emerụ enweghị ike imefu ego gị.

Naanị nke e chebere echebe, na-ekpuchi Sapling, Orchard na Unified Addresses. Enweghị ndabere Oha, ya mere emela atụmatụ dabere na ya.

Iji wụnye ya, ị chọrọ fork Docker btcpay-zcash na ngalaba feat/zec, gbakwunyere viewing key e wepụtara na e-akpa ego dịka Zkool ma ọ bụ Zingo. Site na ndabara, ọ na-agwa lightwalletd dị n'ebe dị anya, ma ọ bụ ị nwere ike ịgba Zebra na lightwalletd n'onwe gị.

Otu mmachi ị ga-amata: plugin ahụ na-eji e-akpa ego Zcash otu maka ụlọ ahịa ọ bụla dị n'otu instance, yabụ agbagbala ya na sava ndị mmadụ kesara. A na-arụ ọrụ n'e-akpa ego kwa ụlọ ahịa.

Enweghị ugwo maka sọftụwia ahụ n'onwe ya. Ị na-akwụ ugwo netwọk Zcash na ihe ọ bụla nnabata gị na-efu.

**Nyochara ikpeazụ:** 2026-07-29

---

## [ZGo](https://zgo.cash/) <img src="/content-images/zgo-prp2-497679039b.webp" alt="ZGo logo" class="processor-logo" />
- **Ụdị nkwado**: Nke e chebere echebe (Sapling na Orchard)
- **Nkọwa**: ZGo bụ ikpo okwu Kwụọ ụhwọ elektrọnik nke na-aga ozugbo site n'aka onye ahịa gị ruo n'aka gị, na-enweghị ndị ọzọ metụtara.
- **URL**: [ZGo](https://zgo.cash/)
<img src="/content-images/zgo-prp2-497679039b.webp" alt="ZGo logo" width="200" hidden />

Ọ bụ till ị na-agba na browser, yabụ laptop, tablet ma ọ bụ ekwentị ghọọ checkout. Enwekwara plugin WooCommerce na REST API. Vergara Technologies wuru ya, Zcash Community Grants kwadoro ya, gụnyere mbugharị site na zcashd ruo Zebra.

Ego na-esi n'aka onye ahịa aga ozugbo n'e-akpa ego gị, na-enweghị onye ọ bụla n'etiti.

Nke e chebere echebe, na-ekpuchi Sapling na Orchard site na Unified Addresses, ọ na-agbasokwa ZIP 321. Ọ nweghị ebe dị ugbu a kwuru na ọ na-ejikwa Adreesị akpa ego Oha, ya mere ibe a anaghịzi ekwu na ọ na-eme ya.

Ị pụghị ịnabata ya n'onwe gị n'ezie. ZGo na-agba akụrụngwa Zcash maka gị ma anaghị ebipụta ntuziaka itinye ya. Ebe isi mmalite dị n'ihu ọha na sava Git nke onye na-elekọta ya, n'agbanyeghị na mbipụta GitLab ndị mmadụ na-ahụkarị bụ mirror ochie nke 2022.

Ọ bụghịkwa n'efu. ZGo na-ere sessions a kwụrụ tupu oge eruo ma chọọ session Pro maka WooCommerce, mana ibe ọnụahịa enweghị ike iru ugbu a, yabụ enweghị ọnụ ọgụgụ ekwuru ebe a.

**Nyochara ikpeazụ:** 2026-07-29

---

## [Flexa](https://flexa.co/) <img src="/content-images/flexa-mark.png" alt="Flexa logo" class="processor-logo" />
- **Ụdị nkwado**: Onye ahịa na-emefu nke e chebere echebe, edeghị akụkụ na-anata ihe
- **Nkọwa**: Flexa bụ netwọk Kwụọ ụhwọ nke na-eme ka ndị ahịa nwee ike imefu akụ dijitalụ, gụnyere Zcash, n'ebe azụmaahịa site n'e-akpa ego onye na-elekọta onwe ya.
- **URL**: [Flexa](https://flexa.co/)
<img src="/content-images/flexa-mark.png" alt="Flexa logo" width="200" hidden />

Flexa abụghị gateway checkout, yabụ ọ bụghị Mgbawe maka ndị ọzọ nọ ebe a. Onye ahịa na-emepe e-akpa ego enyere Flexa dịka Zodl, na-egosi code otu oge, ụlọ ahịa ahụ enyochakwa ya. Enweghị invoice ZEC na plugin e-commerce adịghịkwa.

Onye ahịa na-edobe mkpụrụ ego nke ya ruo oge ọ kwụrụ. Gị dịka onye azụmaahịa anaghị anata ZEC. Flexa na-eji ego ị họrọ kwụọ gị, yabụ ha na-ahụ maka akụkụ crypto.

Mkwupụta nke Flexa n'onwe ya kọwara njikọta Zcash dịka iji ZEC nke e chebere echebe kwụọ ụgwọ. A naghị ebipụta ebe ọ bụla ụdị Adreesị akpa ego Flexa na-anata.

Ugwo bụ 1% maka Kwụọ ụhwọ ọ bụla, yana ntụgharị na nlekọta esonyere n'enweghị ụgwọ ọzọ.

Ọ na-arụ ọrụ na United States, ma kemgbe Julaị 2026, na mba na ókèala SEPA 37. Ekwughị ma enwere ike imefu ZEC kpọmkwem na Europe.

**Nyochara ikpeazụ:** 2026-07-29

---

## [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments) <img src="/content-images/nowpayments-wordmark.png" alt="NOWPayments logo" class="processor-logo processor-logo-wide" />
- **Ụdị nkwado**: Naanị Oha
- **Nkọwa**: NOWPayments bụ gateway Kwụọ ụhwọ crypto nke na-eme ka ndị azụmaahịa nwee ike ịnabata Kwụọ ụhwọ Zcash n'ụzọ dị mfe.
- **URL**: [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments)
<img src="/content-images/nowpayments-wordmark.png" alt="NOWPayments logo" width="200" hidden />

Enweghị nkwado nke e chebere echebe. Akwụkwọ ha na-agwa gị ka ịtọọ Adreesị akpa ego Oha maka Zcash, ma ZEC bụ naanị mkpụrụ ego ha kpọpụtara iche n'ụzọ ahụ. Kwụọ ụhwọ ọ bụla ị nata bụ nke ọha na blockchain.

Ọ bụghị Onye nlekota dịka ndabara. FAQ ha kwuru na ha anaghị echekwa ego ma ọ dịghị mgbe ha na-ejide private keys. Enwere balance nlekọta nhọrọ, yabụ lelee ntọala akaụntụ gị ma ọ bụrụ na ịchọrọ ijide n'aka.

Ugwo bụ 0.5% maka Kwụọ ụhwọ kwụ ọtọ, ma ọ bụ 1% maka ọtụtụ ego, ọnụego edoziri, ma ọ bụ Kwụọ ụhgwọ “onye ọrụ kwụrụ”, na ugwo netwọk dị n'elu ya.

Ọ dị n'ụwa niile ewezuga ebe iwu machibidoro ya. Ị chọghị KYC iji malite ịnabata crypto, naanị iji wepụ fiat.

**Nyochara ikpeazụ:** 2026-07-29

---

## [Plisio](https://plisio.net/accept-zcash) <img src="/content-images/plisio-wordmark.png" alt="Plisio logo" class="processor-logo processor-logo-wide" />
- **Ụdị nkwado**: Oha (edeghị)
- **Nkọwa**: Plisio bụ gateway Kwụọ ụhwọ cryptocurrency nke na-enye azụmaahịa ohere ịnabata Kwụọ ụhgwọ Zcash.
- **URL**: [Plisio](https://plisio.net/accept-zcash)
<img src="/content-images/plisio-wordmark.png" alt="Plisio logo" width="200" hidden />

Were ya dịka Onye nlekota. Mgbasa ozi Plisio na-akpọ ya onye na-abụghị Onye nlekota, mana ibe enyemaka nke ya kọwara balances a jidere n'elu ikpo okwu, cold storage na usoro iwepụ ego. Enweghị ike ikwenye nkwupụta na ọ bụghị Onye nlekota.

Plisio anaghị ekwu ụdị Adreesị akpa ego Zcash ọ na-eji, ya mere were ya dị ka Oha ruo mgbe mmadụ kwadoro ihe ọzọ.

E-akpa ego bụ n'efu, gateway na API na-efu 0.5%, White Label bụ 1.5%. White Label bụ mmegharị aha ọzọ nke ọrụ anabatara ha, ọ bụghị ịnabata onwe gị.

Ị chọghị KYC iji nata Kwụọ ụhwọ, ebipụtaghịkwa ndepụta mba amachibidoro.

**Nyochara ikpeazụ:** 2026-07-29

---

## [Binance Pay](https://pay.binance.com/en) <img src="/content-images/binancepay-mark.png" alt="Binance Pay logo" class="processor-logo" />
- **Ụdị nkwado**: Naanị Oha, a jụrụ nkwụnye ego nke e chebere echebe
- **Nkọwa**: Binance Pay bụ ikpo okwu Kwụọ ụhgwọ cryptocurrency nke na-akwado Kwụọ ụhgwọ Zcash.
- **URL**: [Binance Pay](https://pay.binance.com/en)
<img src="/content-images/binancepay-mark.png" alt="Binance Pay logo" width="200" hidden />

Binance na-ajụ ZEC ezitere site na Adreesị akpa ego nke e chebere echebe. Ọjụjụ ahụ bụ ihe mere e ji kee Adreesị TEX.

Ọ bụ Onye nlekota kpamkpam. Kwụọ ụhgwọ na-agafe off-chain n'etiti e-akpa ego Binance Pay, ị chọkwara akaụntụ Binance enyochara.

Nnyefe e-akpa ego gaa e-akpa ego bụ n'efu, nkwụpụta ndị ahịa na-efu 0.8% ma nwee oke 5 USD, ndị ahịa Mini Program na-akwụ 1%.

Lelee ohere dị ebe ị nọ tupu ịdabere na ya. Anaghị enye Binance Pay na mba na ụlọ ọrụ ụfọdụ, ewepụla ZEC maka ndị ọrụ na France, Spain, Italy na Poland kemgbe 2023, ọrụ na EEA akpaghasịkwala n'okpuru MiCA.

**Nyochara ikpeazụ:** 2026-07-29

---

### Anaghịzi anabata ZEC

Edepụtara ha abụọ ebe a na mbụ. E nyochara ndepụta ego dị ndụ nke onye na-eweta ọ bụla n'onwe ya na 29 Julaị 2026, Zcash apụọla na ha abụọ.

**CoinPayments** anaghị edepụta ZEC n'ime ndepụta mkpụrụ ego v2 ya, ndepụta ochie ya, ma ọ bụ API ego dị ndụ ya, isiokwu Zcash ya na-eduzikwa ugbu a gaa n'ibe mbụ.

**CoinGate** anaghị edepụta ZEC n'ibe ego akwadoro ya ma ọ bụ na API ọha ya. Ekwupụtaghị iwepụ ya, yabụ amaghị ihe kpatara ya na ụbọchị ya.

Ọ bụrụ na nke ọ bụla eweghachite Zcash, tinye ya ọzọ na ụbọchị nyochara ọhụrụ.

### Idebe ibe a n'ezi ọnọdụ

Nkwado mkpụrụ ego Nzuzo na-agagharị, ya mere ibe a dị mma naanị ruo oge nlele ikpeazụ ya. Mgbe ị na-enyocha ya:

1. Lelee ndepụta ego ma ọ bụ API nke onye na-eweta ya n'onwe ya. Ndepụta ndị ọzọ adịkwaghị ọhụrụ maka ndị nhazi abụọ e wepụrụ n'elu.
2. Lelee ụdị Adreesị akpa ego Zcash akwadoro. “Na-akwado Zcash” na-apụtakarị naanị Adreesị akpa ego Oha.
3. Melite ụbọchị nyochara na tebụl nakwa n'akụkụ onye na-eweta ahụ.
