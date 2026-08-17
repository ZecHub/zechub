<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Processors.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash भुगतान प्रोसेसर

एक व्यापारी के रूप में ZEC स्वीकार करने के तरीके, साथ-साथ तुलना किए गए। हर प्रविष्टि को प्रदाता की अपनी साइट और API के आधार पर **29 जुलाई 2026** को जांचा गया था।

privacy assets के लिए समर्थन अक्सर बदलता रहता है, इसलिए हर पंक्ति में उसकी अपनी सत्यापित तिथि दी गई है। यदि आप इसे कई महीनों बाद पढ़ रहे हैं, तो इंटीग्रेट करने से पहले प्रदाता की साइट जांच लें।

<div class="processor-table">

| Processor | Custody | Shielded ZEC | Self-host | Merchant fee | Regions / KYC | Verified |
|:--|:--|:--|:--|:--|:--|:--|
| [CipherPay](https://www.cipherpay.app) | Non-custodial | हाँ, Unified Addresses के माध्यम से Orchard | हाँ, open source | प्रति भुगतान 1%, self-host करने पर निःशुल्क | KYC नहीं, क्षेत्र बताए नहीं गए | 2026-07-29 |
| [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin) | Non-custodial, केवल view key | हाँ, केवल shielded (Sapling, Orchard, UA) | हाँ, open source | कोई नहीं, आप केवल network fees देते हैं | वैश्विक, KYC नहीं | 2026-07-29 |
| [ZGo](https://zgo.cash/) | Non-custodial | हाँ, Sapling और Orchard | नहीं, hosted service | Prepaid session, कीमत प्रकाशित नहीं | KYC का उल्लेख नहीं, क्षेत्र बताए नहीं गए | 2026-07-29 |
| [Flexa](https://flexa.co/) | ग्राहक self-custody, merchant को fiat में settlement | ग्राहक shielded खर्च करता है, receiving side प्रलेखित नहीं | नहीं | प्रति भुगतान 1% | US और 37 SEPA देश, EU में ZEC अपुष्ट | 2026-07-29 |
| [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments) | डिफ़ॉल्ट रूप से Non-custodial | नहीं, केवल transparent address | नहीं | 0.5%, या conversion के साथ 1% | जहाँ निषिद्ध न हो वहाँ वैश्विक, शुरू में KYC नहीं | 2026-07-29 |
| [Plisio](https://plisio.net/accept-zcash) | Custodial, marketing के बावजूद | प्रलेखित नहीं | नहीं | 0.5% API, 1.5% white label | प्राप्त करने के लिए KYC नहीं | 2026-07-29 |
| [Binance Pay](https://pay.binance.com/en) | Custodial, off-chain | नहीं, shielded deposits अस्वीकृत | नहीं | wallet-to-wallet निःशुल्क, payouts 0.8% | Geo-restricted, FR, ES, IT, PL में ZEC delist | 2026-07-29 |

</div>

### कॉलम का अर्थ

**Custody** का मतलब है कि प्रोसेसर आपका ZEC अपने पास रखता है या नहीं। Non-custodial का मतलब है कि यह उस wallet में जाता है जिसे आप नियंत्रित करते हैं।

**Shielded ZEC** का मतलब है कि क्या आपको shielded pool में भुगतान मिल सकता है। Transparent only का मतलब है कि राशि और addresses blockchain पर सार्वजनिक होते हैं।

**Self-host** का मतलब है कि क्या आप software को स्वयं चला सकते हैं, बीच में किसी कंपनी के बिना।

**Merchant fee** में Zcash network fees शामिल नहीं हैं, जो हर स्थिति में किसी न किसी को देनी पड़ती हैं।

जहाँ कोई प्रदाता कुछ प्रकाशित नहीं करता, वहाँ प्रविष्टि में अनुमान लगाने के बजाय "बताया नहीं गया" या "प्रलेखित नहीं" लिखा है। यह "नहीं" के समान नहीं है।

### कौन-सा चुनें

अधिकतम privacy और नियंत्रण के लिए, **BTCPay Server** या self-hosted **CipherPay** का उपयोग करें। दोनों shielded हैं, open source हैं, और आपके लिए धन नहीं रखते।

दुकान में, ऑनलाइन के बजाय, भुगतान लेने के लिए **Flexa** का उपयोग करें।

यदि आपको hosted gateway चाहिए जहाँ transparent payments स्वीकार्य हों, तो **NOWPayments** या **Plisio** का उपयोग करें।

एक चेतावनी दोहराने लायक है: transparent-only processor blockchain पर हर भुगतान राशि और address प्रकाशित कर देता है। और किसी भी hosted non-custodial processor के साथ आप अपनी viewing key सौंप देते हैं, इसलिए कंपनी आपके भुगतानों को देख सकती है, भले ही वह उन्हें खर्च न कर सके। इससे बचने का एकमात्र तरीका self-hosting है।

<div class="processor-note">

**ZGo सेवा चेतावनी, 29 जुलाई 2026।** इस पेज की जांच के दौरान api.zgo.cash पर ZGo backend ने हर endpoint पर HTTP 503 लौटाया। प्रोजेक्ट छोड़ा नहीं गया है और उसका maintainer इस महीने समुदाय में सक्रिय था, लेकिन उस पर निर्भर होने से पहले पुष्टि कर लें कि सेवा चल रही है।

</div>

---

## [CipherPay](https://www.cipherpay.app) <img src="/content-images/cipherpay-mark.png" alt="CipherPay logo" class="processor-logo" />
- **Support Type**: Shielded (Orchard, Unified Addresses के माध्यम से)
- **Description**: मिनटों में Zcash स्वीकार करें, Non-custodial, खरीदार का शून्य डेटा, कोई बिचौलिया नहीं।
- **URL**: [CipherPay](https://www.cipherpay.app)
<img src="/content-images/cipherpay-mark.png" alt="CipherPay logo" width="200" hidden />

आप CipherPay को केवल view-only key देते हैं, इसलिए भुगतान सीधे आपके अपने wallet में जाता है और यह कभी धन अपने पास नहीं रखता। यह हर invoice के लिए एक नया address इस्तेमाल करता है।

केवल Orchard। Sapling या transparent का कोई समर्थन नहीं है, भले ही repository README में Sapling का उल्लेख हो।

इसकी लागत प्रति भुगतान 1% है, और यदि आप इसे स्वयं चलाते हैं तो बिल्कुल कुछ नहीं। पूरा सिस्टम open source है, Rust binary के रूप में SQLite के साथ या Docker image के रूप में। KYC नहीं है, और खरीदारों को account की जरूरत नहीं होती।

Integrations में Shopify, WooCommerce, एक REST API, hosted checkout, payment links, और in-person QR शामिल हैं।

ध्यान देने लायक दो बातें हैं। यह फरवरी 2026 में लॉन्च हुआ था और इसका कोई प्रकाशित security audit नहीं है। और hosted tier में operator आपकी viewing key अपने पास रखता है, इसलिए वह आपके भुगतानों को देख सकता है। Self-hosting इससे बचा देती है। Shielded payments final भी होते हैं, इसलिए refund के लिए खरीदार को आपको एक address देना होगा।

**अंतिम सत्यापन:** 2026-07-29

---

## [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin) <img src="/content-images/btcpay-mark.png" alt="BTCPay Server logo" class="processor-logo" />
- **Support Type**: केवल Shielded (Sapling, Orchard, Unified Address)
- **Description**: BTCPay Server एक open-source, self-hosted cryptocurrency payment processor है।
- **URL**: [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
<img src="/content-images/btcpay-mark.png" alt="BTCPay Server logo" width="200" hidden />

Custody के मामले में यह सबसे मजबूत विकल्प है। इसका wallet backend केवल view-only है और कोई seed या secret key नहीं रखता, इसलिए compromised server भी आपका पैसा खर्च नहीं कर सकता।

केवल shielded, जिसमें Sapling, Orchard और Unified Addresses शामिल हैं। कोई transparent fallback नहीं है, इसलिए उसके आधार पर योजना न बनाएं।

इसे install करने के लिए आपको feat/zec branch पर btcpay-zcash Docker fork चाहिए, साथ ही Ywallet या Zingo जैसे wallet से export की गई viewing key। डिफ़ॉल्ट रूप से यह remote lightwalletd से बात करता है, या आप Zebra और lightwalletd स्वयं चला सकते हैं।

एक सीमा जानना जरूरी है: plugin एक instance पर हर store के लिए एक ही Zcash wallet का उपयोग करता है, इसलिए इसे shared server पर न चलाएँ। Per-store wallets पर काम चल रहा है।

सॉफ़्टवेयर स्वयं कोई शुल्क नहीं लेता। आप Zcash network fees और hosting की अपनी लागत देते हैं।

**अंतिम सत्यापन:** 2026-07-29

---

## [ZGo](https://zgo.cash/) <img src="/content-images/zgo-prp2-497679039b.webp" alt="ZGo logo" class="processor-logo" />
- **Support Type**: Shielded (Sapling और Orchard)
- **Description**: ZGo एक electronic payment platform है जो सीधे आपके ग्राहक से आपके पास जाता है, बिना किसी third party के।
- **URL**: [ZGo](https://zgo.cash/)
<img src="/content-images/zgo-prp2-497679039b.webp" alt="ZGo logo" width="200" hidden />

एक ऐसा till जिसे आप browser में चलाते हैं, इसलिए laptop, tablet या phone checkout बन जाता है। एक WooCommerce plugin और REST API भी है। इसे Vergara Technologies ने बनाया था और इसे Zcash Community Grants से funding मिली थी, जिसमें zcashd से Zebra की ओर स्थानांतरण भी शामिल था।

धन ग्राहक से सीधे आपके wallet में जाता है, बीच में कोई नहीं होता।

Shielded, जिसमें Unified Addresses के माध्यम से Sapling और Orchard शामिल हैं, और यह ZIP 321 का पालन करता है। कोई वर्तमान स्रोत यह नहीं कहता कि यह transparent addresses संभालता है, इसलिए यह पेज अब ऐसा दावा नहीं करता।

आप वास्तव में इसे self-host नहीं कर सकते। ZGo आपके लिए Zcash infrastructure चलाता है और कोई deployment guide प्रकाशित नहीं करता। Source maintainer के अपने Git server पर सार्वजनिक है, हालांकि GitLab copy जिसे लोग आमतौर पर पाते हैं वह 2022 की पुरानी mirror है।

यह निःशुल्क भी नहीं है। ZGo prepaid sessions बेचता है और WooCommerce के लिए Pro session चाहिए, लेकिन pricing page इस समय पहुँच से बाहर है, इसलिए यहाँ कोई राशि नहीं दी गई है।

**अंतिम सत्यापन:** 2026-07-29

---

## [Flexa](https://flexa.co/) <img src="/content-images/flexa-mark.png" alt="Flexa logo" class="processor-logo" />
- **Support Type**: ग्राहक shielded खर्च करता है, receiving side प्रलेखित नहीं
- **Description**: Flexa एक payments network है जो ग्राहकों को self-custody wallet से retail locations पर Zcash सहित digital assets खर्च करने देता है।
- **URL**: [Flexa](https://flexa.co/)
<img src="/content-images/flexa-mark.png" alt="Flexa logo" width="200" hidden />

Flexa checkout gateway नहीं है, इसलिए यह यहाँ के अन्य विकल्पों का विकल्प नहीं है। ग्राहक Zodl जैसा Flexa-enabled wallet खोलता है, एक one-time code दिखाता है, और दुकान उसे scan करती है। कोई ZEC invoice नहीं होता और न ही कोई e-commerce plugin।

ग्राहक अपने coins का नियंत्रण भुगतान के क्षण तक स्वयं रखता है। व्यापारी के रूप में आपको कभी ZEC प्राप्त नहीं होता। Flexa आपकी चुनी हुई currency में settlement करता है, इसलिए crypto वाला हिस्सा वही संभालते हैं।

Flexa की अपनी announcement Zcash integration को shielded ZEC से भुगतान के रूप में वर्णित करती है। Flexa किस address type पर प्राप्त करता है, यह कहीं प्रकाशित नहीं है।

शुल्क प्रति भुगतान 1% है, जिसमें conversion और custody बिना अतिरिक्त लागत के शामिल हैं।

यह United States में और जुलाई 2026 से 37 SEPA देशों और क्षेत्रों में काम करता है। विशेष रूप से ZEC को यूरोप में खर्च किया जा सकता है या नहीं, यह नहीं बताया गया है।

**अंतिम सत्यापन:** 2026-07-29

---

## [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments) <img src="/content-images/nowpayments-wordmark.png" alt="NOWPayments logo" class="processor-logo processor-logo-wide" />
- **Support Type**: केवल Transparent
- **Description**: NOWPayments एक crypto payment gateway है जो merchants को Zcash payments और donations आसानी से स्वीकार करने में सक्षम बनाता है।
- **URL**: [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments)
<img src="/content-images/nowpayments-wordmark.png" alt="NOWPayments logo" width="200" hidden />

कोई shielded support नहीं। उनका documentation आपको Zcash के लिए transparent address सेट करने को कहता है, और ZEC एकमात्र coin है जिसे वे इस तरह अलग से बताते हैं। आपको मिलने वाला हर भुगतान blockchain पर सार्वजनिक होता है।

डिफ़ॉल्ट रूप से Non-custodial। उनके FAQ में कहा गया है कि वे धन संग्रहित नहीं करते और private keys कभी अपने पास नहीं रखते। एक optional custody balance है, इसलिए यदि आपको पूरी पुष्टि चाहिए तो अपने account settings जांच लें।

सीधे भुगतान के लिए शुल्क 0.5% है, या multi-currency, fixed-rate, या "fee paid by user" भुगतानों के लिए 1%, इसके ऊपर network fees अलग से।

जहाँ कानून इसे प्रतिबंधित नहीं करता वहाँ वैश्विक रूप से उपलब्ध। crypto स्वीकार करना शुरू करने के लिए KYC की जरूरत नहीं, केवल fiat withdraw करने के लिए।

**अंतिम सत्यापन:** 2026-07-29

---

## [Plisio](https://plisio.net/accept-zcash) <img src="/content-images/plisio-wordmark.png" alt="Plisio logo" class="processor-logo processor-logo-wide" />
- **Support Type**: Transparent (प्रलेखित नहीं)
- **Description**: Plisio एक cryptocurrency payment gateway है जो businesses को Zcash payments स्वीकार करने देता है।
- **URL**: [Plisio](https://plisio.net/accept-zcash)
<img src="/content-images/plisio-wordmark.png" alt="Plisio logo" width="200" hidden />

इसे custodial मानें। Plisio की marketing इसे non-custodial कहती है, लेकिन उसके अपने help pages platform पर रखे गए balances, cold storage और withdrawal process का वर्णन करते हैं। Non-custodial होने का दावा पुष्ट नहीं किया जा सका।

Plisio कभी नहीं बताता कि वह कौन-से Zcash address types का उपयोग करता है, इसलिए जब तक कोई और पुष्टि न करे, transparent मानें।

Wallet निःशुल्क है, gateway और API की लागत 0.5% है, और White Label 1.5% है। White Label उनकी hosted service का rebrand है, self-hosting नहीं।

भुगतान प्राप्त करने के लिए KYC की जरूरत नहीं है, और प्रतिबंधित देशों की कोई सूची प्रकाशित नहीं है।

**अंतिम सत्यापन:** 2026-07-29

---

## [Binance Pay](https://pay.binance.com/en) <img src="/content-images/binancepay-mark.png" alt="Binance Pay logo" class="processor-logo" />
- **Support Type**: केवल Transparent, shielded deposits अस्वीकृत
- **Description**: Binance Pay एक cryptocurrency payment platform है जो Zcash payments का समर्थन करता है।
- **URL**: [Binance Pay](https://pay.binance.com/en)
<img src="/content-images/binancepay-mark.png" alt="Binance Pay logo" width="200" hidden />

Binance shielded addresses से भेजे गए ZEC को अस्वीकार करता है। यही अस्वीकृति TEX addresses बनाए जाने का कारण थी।

यह पूरी तरह custodial है। भुगतान Binance Pay wallets के बीच off-chain चलते हैं, और आपको verified Binance account चाहिए।

Wallet-to-wallet transfers निःशुल्क हैं, merchant payouts की लागत 0.8% है जिसकी सीमा 5 USD तक है, और Mini Program merchants 1% देते हैं।

इस पर निर्भर होने से पहले अपने क्षेत्र में इसकी उपलब्धता जांच लें। Binance Pay कुछ देशों और industries में उपलब्ध नहीं है, 2023 से France, Spain, Italy और Poland के users के लिए ZEC delist किया जा चुका है, और MiCA के तहत EEA में सेवा बाधित हुई है।

**अंतिम सत्यापन:** 2026-07-29

---

### अब ZEC स्वीकार नहीं करते

इन दोनों को पहले यहाँ सूचीबद्ध किया गया था। 29 जुलाई 2026 को हर प्रदाता की अपनी live currency list जांची गई और Zcash दोनों से गायब है।

**CoinPayments** अपनी v2 coin list, legacy list, या live currencies API में ZEC को सूचीबद्ध नहीं करता, और उसका Zcash लेख अब homepage पर redirect होता है।

**CoinGate** अपने supported currencies page या public API में ZEC को सूचीबद्ध नहीं करता। किसी delisting की घोषणा नहीं की गई, इसलिए कारण और तिथि अज्ञात हैं।

यदि इनमें से कोई Zcash को वापस लाता है, तो इसे नई verified date के साथ फिर जोड़ दें।

### इस पेज को सटीक बनाए रखना

Privacy coin support बदलता रहता है, इसलिए यह पेज उतना ही अच्छा है जितनी इसकी आख़िरी जांच। जब आप इसकी समीक्षा करें:

1. प्रदाता की अपनी currency list या API जांचें। ऊपर हटाए गए दोनों processors के लिए third-party lists पुरानी निकली थीं।
2. जांचें कि कौन-से Zcash address types समर्थित हैं। "Supports Zcash" का मतलब आमतौर पर केवल transparent addresses होता है।
3. तालिका में और उस प्रदाता के section में verified date अपडेट करें।
