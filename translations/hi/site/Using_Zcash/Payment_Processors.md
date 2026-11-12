<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Payment_Processors.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="पृष्ठ संपादित करें"/>
</a>

# Zcash भुगतान प्रोसेसर

व्यापारी के रूप में ZEC स्वीकार करने के तरीके, साथ-साथ तुलना किए गए हैं। Zcash Payment Service को छोड़कर, जिसे **1 नवंबर 2026** को जोड़ा गया था, हर प्रविष्टि को प्रदाता की अपनी साइट और API के विरुद्ध **29 जुलाई 2026** को जाँचा गया था।

गोपनीयता एसेट्स के लिए समर्थन अक्सर बदलता है, इसलिए हर पंक्ति में अपनी सत्यापित तिथि दी गई है। यदि आप इसे महीनों बाद पढ़ रहे हैं, तो इंटीग्रेट करने से पहले प्रदाता की साइट जाँच लें।

<div class="processor-table">

| प्रोसेसर | अभिरक्षा | शील्डेड ZEC | स्वयं-होस्ट | व्यापारी शुल्क | क्षेत्र / KYC | सत्यापित |
|:--|:--|:--|:--|:--|:--|:--|
| [CipherPay](https://www.cipherpay.app) | गैर-अभिरक्षात्मक | हाँ, Unified Addresses के माध्यम से Orchard | हाँ, ओपन सोर्स | प्रति भुगतान 1%, स्वयं-होस्ट होने पर निःशुल्क | कोई KYC नहीं, क्षेत्र घोषित नहीं | 2026-07-29 |
| [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin) | गैर-अभिरक्षात्मक, केवल view key | हाँ, केवल शील्डेड (Sapling, Orchard, UA) | हाँ, ओपन सोर्स | कोई नहीं, आप केवल नेटवर्क शुल्क देते हैं | वैश्विक, कोई KYC नहीं | 2026-07-29 |
| [Zcash Payment Service](https://github.com/nerdcash/zcash-payment-service) | गैर-अभिरक्षात्मक, केवल incoming view key | हाँ, केवल शील्डेड (Sapling और Orchard) | हाँ, केवल स्वयं-होस्ट, ओपन सोर्स | कोई नहीं, आप केवल नेटवर्क शुल्क देते हैं | कोई खाता नहीं, कोई KYC नहीं | 2026-11-01 |
| [ZGo](https://zgo.cash/) | गैर-अभिरक्षात्मक | हाँ, Sapling और Orchard | नहीं, होस्टेड सेवा | प्रीपेड सत्र, मूल्य प्रकाशित नहीं | कोई KYC घोषित नहीं, क्षेत्र घोषित नहीं | 2026-07-29 |
| [Flexa](https://flexa.co/) | ग्राहक की स्वयं-अभिरक्षा, व्यापारी fiat में निपटान करता है | ग्राहक शील्डेड खर्च करता है, प्राप्तकर्ता पक्ष का दस्तावेज़ीकरण नहीं | नहीं | प्रति भुगतान 1% | अमेरिका और 37 SEPA देश, EU में ZEC अपुष्ट | 2026-07-29 |
| [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments) | डिफ़ॉल्ट रूप से गैर-अभिरक्षात्मक | नहीं, केवल पारदर्शी पता | नहीं | 0.5%, या रूपांतरण के साथ 1% | प्रतिबंधित स्थानों को छोड़कर वैश्विक, शुरुआत के लिए कोई KYC नहीं | 2026-07-29 |
| [Plisio — भुगतान निलंबित](https://plisio.net/) | मार्केटिंग के बावजूद अभिरक्षात्मक | दस्तावेज़ीकृत नहीं | नहीं | 0.5% API, 1.5% white label | प्राप्त करने के लिए कोई KYC नहीं | 2026-07-29 |
| [Binance Pay](https://pay.binance.com/en) | अभिरक्षात्मक, ऑफ-चेन | नहीं, शील्डेड जमा अस्वीकृत | नहीं | wallet से wallet निःशुल्क, 0.8% भुगतान-निकासी | भौगोलिक रूप से प्रतिबंधित, FR, ES, IT, PL में ZEC डीलिस्टेड | 2026-07-29 |

</div>

### कॉलमों का अर्थ

**अभिरक्षा** यह बताती है कि क्या प्रोसेसर आपका ZEC रखता है। गैर-अभिरक्षात्मक का अर्थ है कि यह आपके नियंत्रण वाले wallet में जाता है।

**शील्डेड ZEC** यह बताता है कि क्या आपको शील्डेड pool में भुगतान मिल सकता है। केवल पारदर्शी का अर्थ है कि राशि और पते blockchain पर सार्वजनिक होते हैं।

**स्वयं-होस्ट** यह बताता है कि क्या आप बीच में किसी कंपनी के बिना सॉफ़्टवेयर स्वयं चला सकते हैं।

**व्यापारी शुल्क** में Zcash नेटवर्क शुल्क शामिल नहीं है, जो हर स्थिति में किसी न किसी को देना होता है।

जहाँ कोई प्रदाता कुछ प्रकाशित नहीं करता, वहाँ अनुमान लगाने के बजाय प्रविष्टि में "घोषित नहीं" या "दस्तावेज़ीकृत नहीं" कहा गया है। यह "नहीं" जैसा नहीं है।

### किसे चुनें

सबसे अधिक गोपनीयता और नियंत्रण के लिए **BTCPay Server**, स्वयं-होस्टेड **CipherPay**, या **Zcash Payment Service** का उपयोग करें यदि आप अपनी साइट में थोड़ा कोड जोड़ सकते हैं। तीनों शील्डेड, ओपन सोर्स हैं और आपके लिए कोई धनराशि नहीं रखते।

ऑनलाइन के बजाय दुकान में भुगतान लेने के लिए **Flexa** का उपयोग करें।

ऐसे होस्टेड gateway के लिए जहाँ पारदर्शी भुगतान स्वीकार्य हों, **NOWPayments** या **Plisio** का उपयोग करें।

एक चेतावनी दोहराने योग्य है: केवल-पारदर्शी प्रोसेसर blockchain पर हर भुगतान राशि और पते को प्रकाशित करता है। और किसी भी होस्टेड गैर-अभिरक्षात्मक प्रोसेसर के साथ आप अपनी viewing key सौंपते हैं, इसलिए कंपनी आपके भुगतान देख सकती है, भले ही वह उन्हें खर्च न कर सके। इससे बचने का एकमात्र तरीका स्वयं-होस्टिंग है।

<div class="processor-note">

**ZGo सेवा चेतावनी, 29 जुलाई 2026।** इस पृष्ठ की जाँच के दौरान api.zgo.cash पर ZGo backend ने हर endpoint पर HTTP 503 लौटाया। परियोजना छोड़ी नहीं गई है और उसका मेंटेनर इस महीने समुदाय में सक्रिय था, लेकिन भरोसा करने से पहले पुष्टि करें कि सेवा चल रही है।

</div>

---

## [CipherPay](https://www.cipherpay.app) <img src="/content-images/cipherpay-mark.png" alt="CipherPay लोगो" class="processor-logo" />
- **समर्थन प्रकार**: शील्डेड (Unified Addresses के माध्यम से Orchard)
- **विवरण**: मिनटों में Zcash स्वीकार करें, गैर-अभिरक्षात्मक, खरीदार का शून्य डेटा, कोई बिचौलिया नहीं।
- **URL**: [CipherPay](https://www.cipherpay.app)
<img src="/content-images/cipherpay-mark.png" alt="CipherPay लोगो" width="200" hidden />

आप CipherPay को केवल-देखने वाली key देते हैं, इसलिए भुगतान सीधे आपके अपने wallet में जाते हैं और यह कभी धनराशि नहीं रखता। यह हर invoice के लिए एक नया पता उपयोग करता है।

केवल Orchard। Sapling या पारदर्शी समर्थन नहीं है, भले ही repository README में Sapling का उल्लेख है।

इसकी लागत प्रति भुगतान 1% है, और यदि आप इसे स्वयं चलाते हैं तो बिल्कुल कुछ नहीं। पूरी चीज़ ओपन सोर्स है, SQLite के साथ Rust binary के रूप में या Docker image के रूप में। कोई KYC नहीं है, और खरीदारों को खाते की आवश्यकता नहीं है।

इंटीग्रेशन में Shopify, WooCommerce, REST API, होस्टेड checkout, भुगतान लिंक और प्रत्यक्ष QR शामिल हैं।

विचार करने के लिए दो बातें। यह फरवरी 2026 में लॉन्च हुआ और इसका कोई प्रकाशित सुरक्षा audit नहीं है। और होस्टेड tier में ऑपरेटर आपकी viewing key रखता है, इसलिए वह आपके भुगतान देख सकता है। स्वयं-होस्टिंग इसे हटाती है। शील्डेड भुगतान अंतिम भी होते हैं, इसलिए refund के लिए खरीदार को आपको एक पता देना होगा।

**अंतिम सत्यापन:** 2026-07-29

---

## [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin) <img src="/content-images/btcpay-mark.png" alt="BTCPay Server लोगो" class="processor-logo" />
- **समर्थन प्रकार**: केवल शील्डेड (Sapling, Orchard, Unified Address)
- **विवरण**: BTCPay Server एक ओपन-सोर्स, स्वयं-होस्टेड cryptocurrency भुगतान प्रोसेसर है।
- **URL**: [BTCPay Server](https://github.com/btcpay-zcash/btcpayserver-zcash-plugin)
<img src="/content-images/btcpay-mark.png" alt="BTCPay Server लोगो" width="200" hidden />

अभिरक्षा के मामले में सबसे मज़बूत विकल्प। इसका wallet backend केवल-देखने वाला है और कोई seed या secret key नहीं रखता, इसलिए compromise हुआ server भी आपका धन खर्च नहीं कर सकता।

केवल शील्डेड, जिसमें Sapling, Orchard और Unified Addresses शामिल हैं। कोई पारदर्शी fallback नहीं है, इसलिए उसके आधार पर योजना न बनाएँ।

इसे स्थापित करने के लिए आपको feat/zec branch पर btcpay-zcash का Docker fork चाहिए, साथ ही Zkool या Zingo जैसे wallet से निर्यात की गई viewing key चाहिए। डिफ़ॉल्ट रूप से यह एक remote lightwalletd से बात करता है, या आप स्वयं Zebra और lightwalletd चला सकते हैं।

जानने योग्य एक सीमा: plugin किसी instance पर हर store के लिए एक ही Zcash wallet उपयोग करता है, इसलिए इसे साझा server पर न चलाएँ। प्रति-store wallets पर काम चल रहा है।

सॉफ़्टवेयर के लिए कोई शुल्क नहीं है। आप Zcash नेटवर्क शुल्क और अपने hosting की लागत देते हैं।

**अंतिम सत्यापन:** 2026-07-29

---

## [Zcash Payment Service](https://github.com/nerdcash/zcash-payment-service)
- **समर्थन प्रकार**: केवल शील्डेड (Sapling और Orchard)
- **विवरण**: ऑनलाइन व्यापारियों के लिए एक निःशुल्क, स्वयं-होस्टेड Zcash भुगतान प्रोसेसर, जो Docker container के रूप में चलता है या Rust crate के रूप में embedded होता है।
- **URL**: [Zcash Payment Service](https://github.com/nerdcash/zcash-payment-service)

Andrew Arnott द्वारा बनाया गया एक निःशुल्क, ओपन-सोर्स (MIT) प्रोसेसर, जो इसे अपने app में वास्तविक भुगतानों के लिए पहले से उपयोग करते हैं।

यह केवल incoming viewing key (एक UIVK) रखता है। यह भुगतानों को आते देख सकता है, लेकिन उन्हें खर्च नहीं कर सकता, इसलिए compromise हुआ server भी आपकी धनराशि नहीं हटा सकता। key आपके अपने server पर रहती है, इसलिए कोई कंपनी भी आपके भुगतान नहीं देखती।

हर checkout को Sapling और Orchard receivers वाला नया unified address मिलता है और कोई पारदर्शी receiver नहीं होता। भुगतान सीधे आपके अपने wallet में जाते हैं।

कोई शुल्क, खाता या उपयोग मीटर नहीं है। आप Zcash नेटवर्क शुल्क और अपनी hosting देते हैं।

यह केवल स्वयं-होस्टेड है: एक Docker container, या उस app के भीतर Rust crate जिसे आप पहले से चलाते हैं। यह आपके चुने हुए lightwalletd server से chain पढ़ता है, इसलिए आपको पूर्ण नोड की आवश्यकता नहीं है।

इसे सेट करने के लिए code चाहिए, plugin नहीं। आपकी साइट checkout पर भुगतान पता और QR code के लिए सेवा से पूछती है, और सेवा signed webhooks के माध्यम से आपकी साइट को बताती है कि धन कब पहुँचता है। JavaScript और TypeScript backends के लिए npm client है, और कॉपी करने के लिए एक ओपन-सोर्स [demo store](https://github.com/nerdcash/zcash-payment-demo-store) है। कोई Shopify या WooCommerce plugin नहीं है, इसलिए आपको अपनी साइट के code का नियंत्रण चाहिए, या ऐसा developer चाहिए जिसके पास यह हो।

विचार करने योग्य बातें। यह नया है: repository जून 2026 में शुरू हुई, npm client संस्करण 0.1 पर है, अभी कोई tagged releases नहीं हैं और कोई प्रकाशित सुरक्षा audit नहीं है। इसके API का अपना login नहीं है, इसलिए इसे निजी network पर रखें और कभी internet पर न खोलें। और किसी भी शील्डेड भुगतान की तरह, refund के लिए खरीदार को आपको एक पता देना होगा।

**अंतिम सत्यापन:** 2026-11-01

---

## [ZGo](https://zgo.cash/) <img src="/content-images/zgo-prp2-497679039b.webp" alt="ZGo लोगो" class="processor-logo" />
- **समर्थन प्रकार**: शील्डेड (Sapling और Orchard)
- **विवरण**: ZGo एक इलेक्ट्रॉनिक भुगतान प्लेटफ़ॉर्म है जो बिना किसी तीसरे पक्ष के सीधे आपके ग्राहक से आपके पास जाता है।
- **URL**: [ZGo](https://zgo.cash/)
<img src="/content-images/zgo-prp2-497679039b.webp" alt="ZGo लोगो" width="200" hidden />

एक cash register जिसे आप browser में चलाते हैं, इसलिए laptop, tablet या phone checkout बन जाता है। एक WooCommerce plugin और REST API भी है। इसे Vergara Technologies ने बनाया था और Zcash Community Grants ने वित्तपोषित किया था, जिसमें zcashd से Zebra की ओर बदलाव भी शामिल है।

धनराशि ग्राहक से सीधे आपके wallet में जाती है, बीच में कोई नहीं होता।

शील्डेड, Unified Addresses के माध्यम से Sapling और Orchard को कवर करता है, और यह ZIP 321 का पालन करता है। कोई वर्तमान स्रोत नहीं कहता कि यह पारदर्शी पतों को संभालता है, इसलिए यह पृष्ठ अब ऐसा दावा नहीं करता।

आप वास्तव में इसे स्वयं-होस्ट नहीं कर सकते। ZGo आपके लिए Zcash infrastructure चलाता है और कोई deployment guide प्रकाशित नहीं करता। स्रोत मेंटेनर के अपने Git server पर सार्वजनिक है, हालाँकि लोगों को आम तौर पर मिलने वाली GitLab copy पुराना 2022 mirror है।

यह निःशुल्क भी नहीं है। ZGo प्रीपेड सत्र बेचता है और WooCommerce के लिए Pro सत्र चाहिए, लेकिन मूल्य पृष्ठ वर्तमान में पहुँच से बाहर है, इसलिए यहाँ कोई आँकड़ा नहीं दिया गया है।

**अंतिम सत्यापन:** 2026-07-29

---

## [Flexa](https://flexa.co/) <img src="/content-images/flexa-mark.png" alt="Flexa लोगो" class="processor-logo" />
- **समर्थन प्रकार**: ग्राहक शील्डेड खर्च करता है, प्राप्तकर्ता पक्ष का दस्तावेज़ीकरण नहीं
- **विवरण**: Flexa एक भुगतान नेटवर्क है जो ग्राहकों को स्वयं-अभिरक्षा wallet से खुदरा स्थानों पर Zcash सहित digital assets खर्च करने देता है।
- **URL**: [Flexa](https://flexa.co/)
<img src="/content-images/flexa-mark.png" alt="Flexa लोगो" width="200" hidden />

Flexa checkout gateway नहीं है, इसलिए यह यहाँ के अन्य विकल्पों का विकल्प नहीं है। ग्राहक Flexa-सक्षम wallet, जैसे Zodl, खोलता है, एक बार इस्तेमाल होने वाला code दिखाता है और दुकान उसे scan करती है। कोई ZEC invoice और कोई e-commerce plugin नहीं है।

भुगतान करने के क्षण तक ग्राहक अपने सिक्के स्वयं रखता है। व्यापारी के रूप में आपको कभी ZEC नहीं मिलता। Flexa आपके चुने हुए currency में आपका निपटान करता है, इसलिए crypto पक्ष वे संभालते हैं।

Flexa की अपनी घोषणा Zcash integration को शील्डेड ZEC से भुगतान के रूप में वर्णित करती है। Flexa को किस प्रकार का पता प्राप्त होता है, यह कहीं प्रकाशित नहीं है।

शुल्क प्रति भुगतान 1% है, जिसमें रूपांतरण और अभिरक्षा बिना अतिरिक्त लागत शामिल हैं।

यह संयुक्त राज्य अमेरिका में और जुलाई 2026 से 37 SEPA देशों एवं क्षेत्रों में काम करता है। विशेष रूप से ZEC को यूरोप में खर्च किया जा सकता है या नहीं, यह घोषित नहीं है।

**अंतिम सत्यापन:** 2026-07-29

---

## [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments) <img src="/content-images/nowpayments-wordmark.png" alt="NOWPayments लोगो" class="processor-logo processor-logo-wide" />
- **समर्थन प्रकार**: केवल पारदर्शी
- **विवरण**: NOWPayments एक crypto भुगतान gateway है जो व्यापारियों को Zcash भुगतान और दान आसानी से स्वीकार करने देता है।
- **URL**: [NOWPayments](https://nowpayments.io/supported-coins/zcash-payments)
<img src="/content-images/nowpayments-wordmark.png" alt="NOWPayments लोगो" width="200" hidden />

कोई शील्डेड समर्थन नहीं। उनका दस्तावेज़ आपको Zcash के लिए एक पारदर्शी पता सेट करने को कहता है, और ZEC ही एकमात्र coin है जिसे वे इस तरह अलग से उल्लेखित करते हैं। आपको मिलने वाला हर भुगतान blockchain पर सार्वजनिक है।

डिफ़ॉल्ट रूप से गैर-अभिरक्षात्मक। उनके FAQ में कहा गया है कि वे धनराशि store नहीं करते और कभी private keys नहीं रखते। वैकल्पिक custody balance है, इसलिए यदि आपको निश्चित होना है तो अपनी account settings जाँचें।

सीधे भुगतान के लिए शुल्क 0.5% है, या multi-currency, fixed-rate, अथवा "fee paid by user" भुगतानों के लिए 1% है, जिसमें नेटवर्क शुल्क अतिरिक्त है।

जहाँ कानून निषिद्ध करता है, वहाँ को छोड़कर वैश्विक रूप से उपलब्ध। crypto स्वीकारना शुरू करने के लिए आपको KYC नहीं चाहिए, केवल fiat निकालने के लिए चाहिए।

**अंतिम सत्यापन:** 2026-07-29

---

## [Plisio](https://plisio.net/) <img src="/content-images/plisio-wordmark.png" alt="Plisio लोगो" class="processor-logo processor-logo-wide" />

> **भुगतान निलंबित — 12 नवंबर 2026 को जाँचा गया।** Plisio का [homepage](https://plisio.net/) कहता है कि बहाली का काम चलने के दौरान आने वाले और जाने वाले भुगतान अस्थायी रूप से निलंबित हैं। धन भेजने से पहले प्रदाता से जाँच लें। इसका Zcash-विशिष्ट पृष्ठ वर्तमान में 404 लौटाता है; इससे यह सिद्ध नहीं होता कि ZEC को डीलिस्ट कर दिया गया है। नीचे दिए गए शुल्क, अभिरक्षा और पता-समर्थन विवरणों की अंतिम समीक्षा 29 जुलाई 2026 को हुई थी और इन्हें फिर से सत्यापित नहीं किया गया है।

- **समर्थन प्रकार**: पारदर्शी (दस्तावेज़ीकृत नहीं)
- **विवरण**: Plisio एक cryptocurrency भुगतान gateway है जिसने Zcash समर्थन सूचीबद्ध किया है। भुगतान प्रसंस्करण वर्तमान में निलंबित है; ऊपर दिनांकित सूचना देखें।
- **URL**: [Plisio](https://plisio.net/)
<img src="/content-images/plisio-wordmark.png" alt="Plisio लोगो" width="200" hidden />

इसे अभिरक्षात्मक मानें। Plisio की मार्केटिंग इसे गैर-अभिरक्षात्मक कहती है, लेकिन इसके अपने help pages platform पर रखे balances, cold storage और withdrawal प्रक्रिया का वर्णन करते हैं। गैर-अभिरक्षात्मक दावे की पुष्टि नहीं हो सकी।

Plisio कभी नहीं बताता कि वह किन Zcash पता प्रकारों का उपयोग करता है, इसलिए जब तक कोई अन्यथा पुष्टि न करे, इसे पारदर्शी मानें।

wallet निःशुल्क है, gateway और API की लागत 0.5% है, और White Label की 1.5%। White Label उनकी होस्टेड सेवा का rebrand है, स्वयं-होस्टिंग नहीं।

भुगतान प्राप्त करने के लिए आपको KYC की आवश्यकता नहीं है, और प्रतिबंधित देशों की कोई सूची प्रकाशित नहीं है।

**अंतिम सत्यापन:** 2026-07-29

---

## [Binance Pay](https://pay.binance.com/en) <img src="/content-images/binancepay-mark.png" alt="Binance Pay लोगो" class="processor-logo" />
- **समर्थन प्रकार**: केवल पारदर्शी, शील्डेड जमा अस्वीकृत
- **विवरण**: Binance Pay एक cryptocurrency भुगतान प्लेटफ़ॉर्म है जो Zcash भुगतानों का समर्थन करता है।
- **URL**: [Binance Pay](https://pay.binance.com/en)
<img src="/content-images/binancepay-mark.png" alt="Binance Pay लोगो" width="200" hidden />

Binance शील्डेड पतों से भेजे गए ZEC को अस्वीकार करता है। वही अस्वीकृति TEX पतों के बनाए जाने का कारण है।

यह पूरी तरह अभिरक्षात्मक है। भुगतान Binance Pay wallets के बीच ऑफ-चेन होते हैं, और आपको सत्यापित Binance account चाहिए।

wallet-से-wallet transfers निःशुल्क हैं, व्यापारी payout की लागत 0.8% है जो 5 USD तक सीमित है, और Mini Program व्यापारी 1% देते हैं।

इस पर निर्भर होने से पहले अपने स्थान पर उपलब्धता जाँच लें। Binance Pay कुछ देशों और उद्योगों में उपलब्ध नहीं है, ZEC को 2023 से France, Spain, Italy और Poland के उपयोगकर्ताओं के लिए डीलिस्ट किया गया है, और MiCA के तहत EEA में सेवा बाधित हुई है।

**अंतिम सत्यापन:** 2026-07-29

---

### अब ZEC स्वीकार नहीं करते

ये दोनों पहले यहाँ सूचीबद्ध थे। 29 जुलाई 2026 को प्रत्येक प्रदाता की अपनी लाइव currency सूची जाँची गई और Zcash दोनों से हट चुका है।

**CoinPayments** अपनी v2 coin list, legacy list या live currencies API में ZEC सूचीबद्ध नहीं करता, और उसका Zcash article अब homepage पर redirect करता है।

**CoinGate** अपने supported currencies पृष्ठ या public API में ZEC सूचीबद्ध नहीं करता। किसी डीलिस्टिंग की घोषणा नहीं हुई थी, इसलिए कारण और तिथि अज्ञात हैं।

यदि इनमें से कोई Zcash को वापस लाता है, तो इसे नई सत्यापित तिथि के साथ फिर जोड़ें।

### इस पृष्ठ को सटीक बनाए रखना

Privacy coin समर्थन बदलता रहता है, इसलिए यह पृष्ठ केवल अपनी अंतिम जाँच जितना ही अच्छा है। इसकी समीक्षा करते समय:

1. प्रदाता की अपनी currency सूची या API जाँचें। ऊपर हटाए गए दोनों प्रोसेसरों के लिए third-party सूचियाँ पुरानी थीं।
2. जाँचें कि कौन-से Zcash पता प्रकार समर्थित हैं। "Zcash समर्थन करता है" का सामान्यतः अर्थ केवल पारदर्शी पते होता है।
3. तालिका और उस प्रदाता के अनुभाग में सत्यापित तिथि अपडेट करें।
