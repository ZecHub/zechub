<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zgo_Payment_Processor.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="पेज संपादित करें"/>
</a>

# ZGo Payment Processor: कस्टडी छोड़े बिना Zcash स्वीकार करना

ZGo, Zcash के लिए एक non-custodial payment processor है। ग्राहक अपने wallet से ZEC में भुगतान करता है, ZGo उस transaction के लिए Zcash blockchain की निगरानी करता है, और राशि shielded transfer के माध्यम से सीधे व्यापारी के wallet में पहुँच जाती है। ZGo बीच में कभी भी धन अपने पास नहीं रखता।

यह guide बताती है कि payment flow कैसे काम करता है, account कैसे सेट up करें, और ZGo को Xero तथा WooCommerce के साथ कैसे integrate करें। इसमें उन दो गलतियों को भी शामिल किया गया है जो पहली बार setup करते समय सबसे ज़्यादा समस्याएँ पैदा करती हैं।

## इस पेज पर

1. [ZGo का उपयोग क्यों करें](#why-use-zgo)
2. [ZGo कैसे काम करता है](#how-zgo-works)
3. [Account सेट up करना](#setting-up-an-account)
4. [Xero के साथ ZGo](#zgo-with-xero)
5. [WooCommerce के साथ ZGo](#zgo-with-woocommerce)
6. [विशेषताएँ](#features)
7. [सामान्य गलतियाँ](#common-mistakes)
8. [निष्कर्ष](#conclusion)
9. [संसाधन](#resources)

## ZGo का उपयोग क्यों करें

अधिकांश cryptocurrency payment processor custodial होते हैं। धन पहले processor के account में पहुँचता है और बाद में व्यापारी को भेजा जाता है, जिसका मतलब है कि एक third party अस्थायी रूप से उस पैसे को नियंत्रित करती है और उसे फ्रीज़, विलंबित, या उस पर रिपोर्ट कर सकती है।

ZGo इसका उल्टा तरीका अपनाता है। भुगतान ग्राहक के wallet से सीधे व्यापारी के wallet में Zcash shielded transaction के माध्यम से जाता है। Processor केवल invoice बनाता है और confirmation के लिए blockchain पर नज़र रखता है। इसमें कोई intermediary balance नहीं होता, कोई withdrawal flow नहीं होता, और कोई third party नहीं होती जो settlement को रोक सके।

किसी व्यापारी के लिए इसका अर्थ तीन व्यावहारिक बातें हैं: आने वाले ZEC पर पूर्ण custody, डिफ़ॉल्ट रूप से shielded transaction privacy, और किसी centralized provider के online या solvent बने रहने पर निर्भरता नहीं।

## ZGo कैसे काम करता है

चाहे ZGo standalone इस्तेमाल किया जाए, Xero के माध्यम से, या WooCommerce के माध्यम से, payment flow एक जैसा रहता है:

1. व्यापारी ZGo में payment request बनाता है, जो amount, invoice ID, और एक Zcash receiving address के साथ QR code के रूप में दिखाई देती है।
2. ग्राहक QR को Zcash wallet से scan करता है (WordPress plugin पर Orchard, Sapling, और Transparent address types सभी supported हैं) और payment approve करता है।
3. Transaction ग्राहक के wallet से व्यापारी के wallet तक shielded transfer के रूप में Zcash network पर broadcast की जाती है।
4. ZGo उस transaction के लिए Zcash blockchain की निगरानी करता है।
5. पाँच confirmations के बाद, ZGo payment को final के रूप में mark करता है और किसी भी connected integration (Xero, WooCommerce, या webhook) को notify करता है।

पाँच-confirmation threshold सबसे महत्वपूर्ण संख्या है। इससे पहले की कोई भी स्थिति payment in progress है, payment received नहीं। Order fulfilment, inventory updates, और व्यापारी की ओर से कोई भी irreversible action step 5 तक प्रतीक्षा करनी चाहिए।

ZGo desktop या mobile पर किसी भी modern browser में चलता है, और किसी भी पक्ष को install की आवश्यकता नहीं होती। ग्राहक को एक Zcash wallet चाहिए; व्यापारी को एक Zcash wallet और एक ZGo account चाहिए।

<img width="672" height="378" alt="ZGo payment request and blockchain monitoring overview" src="https://github.com/user-attachments/assets/de50885b-b068-4157-bbda-0981ca23efc8" />

## Account सेट up करना

ZGo account बनाने के लिए, थोड़ी-सी ZEC राशि वाले एक Zcash wallet की आवश्यकता होती है। यह छोटी ZEC balance account-initialization transaction की on-chain fee को कवर करती है। इसके लिए कोई भी प्रमुख Zcash wallet काम करेगा; मौजूदा विकल्पों के लिए [ZecHub Wallets](https://zechub.wiki/wallets) देखें।

मूल setup:

1. Browser में [zgo.cash](https://zgo.cash/) खोलें।
2. व्यापारी के नियंत्रण वाले Zcash wallet का उपयोग करके account बनाएँ। इस wallet में keys होनी चाहिए। Exchange deposit address काम नहीं करेगा (देखें [सामान्य गलतियाँ](#common-mistakes))।
3. छोटी initialization transaction भेजकर wallet verify करें।
4. Receiving address configure करें। इस account के माध्यम से processed सभी payments इसी wallet में आएँगी।

एक बार account active हो जाने के बाद, वही व्यापारी ZGo का उपयोग one-off payments (जैसे pop-up event में एक single QR code) के लिए कर सकता है या इसे Xero या WooCommerce के माध्यम से स्थायी setup में जोड़ सकता है।

## Xero के साथ ZGo

[Xero](https://www.xero.com/) एक cloud accounting platform है जिसका उपयोग कई small और mid-size businesses करती हैं। ZGo–Xero integration व्यापारी को Xero में invoice जारी करने, ग्राहक से ZEC में भुगतान लेने, और transaction confirm होते ही Xero में invoice को अपने-आप paid mark करने की सुविधा देता है।

यह कैसे काम करता है:

1. व्यापारी सामान्य तरीके से Xero में invoice बनाता है।
2. ZGo invoice के साथ एक Zcash payment option जोड़ता है।
3. ग्राहक अपने wallet के माध्यम से ZEC में भुगतान करता है।
4. ZGo उस transaction के लिए [Zcash blockchain](https://z.cash/) की निगरानी करता है।
5. पाँच confirmations के बाद, ZGo payment की सूचना वापस Xero को देता है, जो invoice को settled mark कर देता है।

ZEC व्यापारी के wallet में पहुँचता है, किसी ZGo-controlled या Xero-controlled account में नहीं। Xero में accounting record अपने-आप on-chain settlement के साथ sync में रहता है।

पहली बार setup के लिए, यह dedicated walkthrough देखें: [Xero Integration Configuration](https://hedgedoc.vergara.tech/s/4iXC67fmb)।

## WooCommerce के साथ ZGo

[WooCommerce](https://woocommerce.com/) और [WordPress](https://wordpress.org/) पर चलने वाली online shops के लिए, ZGo एक dedicated plugin प्रदान करता है। यह plugin checkout पर Zcash को payment method के रूप में जोड़ता है और payment confirm होने पर order state को अपने-आप संभालता है।

<img width="672" height="378" alt="ZGo WooCommerce plugin checkout and order flow" src="https://github.com/user-attachments/assets/55a791bb-1947-4f55-b5b9-55083be8ed49" />

WooCommerce store के भीतर end-to-end flow:

1. ग्राहक checkout तक पहुँचता है और payment method के रूप में Zcash चुनता है।
2. Plugin payment request बनाता है और checkout page पर QR code दिखाता है।
3. ग्राहक अपने wallet से भुगतान करता है।
4. Transaction Zcash network पर broadcast होती है और ZGo उसकी निगरानी शुरू कर देता है।
5. पाँच confirmations के बाद, ZGo plugin को payment final होने की सूचना देता है।
6. Plugin WooCommerce order को paid mark करता है और order database को update करता है।

Order केवल तब paid होता है जब step 6 पूरा होता है। इससे पहले की अवस्थाएँ (broadcast, शुरुआती confirmations) ग्राहक को "payment received, awaiting confirmation" के रूप में दिखाई जा सकती हैं, लेकिन inventory, fulfilment, और कोई भी downstream automation final state की प्रतीक्षा करनी चाहिए।

Plugin WordPress के भीतर एक administrative dashboard भी install करता है, जहाँ व्यापारी orders और incoming ZEC payments की निगरानी सामान्य WooCommerce order view के साथ कर सकता है। Plugin सभी मौजूदा Zcash address types को support करता है: Orchard, Sapling, और Transparent। किसी भी compliant wallet से भुगतान करने वाले ग्राहक transaction पूरी कर सकते हैं।

## विशेषताएँ

**Non-custodial.** Payments ग्राहक के wallet से व्यापारी के wallet तक shielded transactions के माध्यम से सीधे जाती हैं। ZGo बीच में कभी भी धन अपने पास नहीं रखता, और व्यापारी पूरे समय पूर्ण नियंत्रण बनाए रखता है।

**Flexible deployment.** ZGo का उपयोग किसी pop-up market में केवल एक दोपहर के लिए, एक स्थायी point-of-sale setup के लिए, या Xero अथवा WooCommerce integrations के माध्यम से online store के backend के रूप में किया जा सकता है।

**Browser-based.** न ग्राहक पक्ष पर और न ही व्यापारी पक्ष पर किसी install की आवश्यकता है। ZGo desktop या mobile पर किसी भी modern browser में चलता है।

**Wallet compatibility.** प्रमुख Zcash wallets, जिनमें Orchard, Sapling, और Transparent address types को support करने वाले wallets शामिल हैं, ग्राहक पक्ष पर अतिरिक्त configuration के बिना ZGo invoice का भुगतान कर सकते हैं।

**Integrations.** Xero (accounting) और WooCommerce (e-commerce) के साथ direct integrations, दो सबसे सामान्य merchant workflows को out of the box कवर करते हैं।

## सामान्य गलतियाँ

**पाँच confirmations से पहले order को paid मान लेना।** Broadcast की गई transaction, confirmed payment के समान नहीं होती। Transaction अभी भी confirm होने में विफल हो सकती है या replace की जा सकती है। केवल पाँच confirmations के बाद ही ZGo payment को final के रूप में report करता है, और केवल तभी downstream order को paid mark किया जाना चाहिए। यदि कोई व्यापारी inventory या fulfilment को broadcast event पर trigger होने के लिए configure करता है, तो fraudulent या failed payments वास्तविक नुकसान का कारण बनेंगी।

**ZGo को exchange deposit address की ओर point करना।** यह Zcash address जैसा दिखता है, लेकिन exchange deposit addresses का नियंत्रण व्यापारी के पास नहीं, बल्कि exchange के पास होता है। Exchange के पास keys होती हैं, जिसका अर्थ है कि धन भी exchange के नियंत्रण में होता है, और इससे non-custodial processor इस्तेमाल करने का उद्देश्य ही समाप्त हो जाता है। ZGo में configure किया गया wallet address ऐसा wallet होना चाहिए जिसकी seed phrase पर व्यापारी का सीधा नियंत्रण हो।

**ZGo को wallet समझ लेना।** ZGo एक payment processor है, wallet नहीं। यह keys store नहीं करता, balances hold नहीं करता, और न ही व्यापारी को धन खर्च करने देता है। ZGo जिस धन को route करता है उसे प्राप्त करने के लिए व्यापारी के नियंत्रण में एक अलग Zcash wallet आवश्यक है।

## निष्कर्ष

ZGo व्यापारियों को Zcash payments स्वीकार करने का एक ऐसा तरीका देता है जिसमें उन्हें custody नहीं छोड़नी पड़ती, किसी intermediary पर निर्भर नहीं रहना पड़ता, और public chain पर transaction details उजागर नहीं करनी पड़तीं। दोनों integrations (Xero और WooCommerce) सबसे सामान्य merchant workflows को कवर करती हैं; बाकी सभी स्थितियों के लिए ZGo को किसी भी browser से standalone उपयोग किया जा सकता है।

Setup के लिए रास्ता छोटा है: एक Zcash wallet लें, [zgo.cash](https://zgo.cash/) पर account बनाएँ, और फिर या तो सीधे payment requests बनाना शुरू करें या संबंधित integration install करें।

## संसाधन

- [ZGo की आधिकारिक वेबसाइट](https://zgo.cash/)
- [Xero Integration Configuration walkthrough](https://hedgedoc.vergara.tech/s/4iXC67fmb)
- [WooCommerce](https://woocommerce.com/) और [WordPress](https://wordpress.org/)
- [Xero](https://www.xero.com/)
- [Zcash project का homepage](https://z.cash/)
- [ZecHub Wallets](https://zechub.wiki/wallets), compatible Zcash wallets की सूची
- [ZecHub Payment Processors overview](https://zechub.wiki/payment-processors), अन्य Zcash payment options के संदर्भ में ZGo
- [BTCPayServer Zcash Plugin](https://zechub.wiki/guides/btcpayserver-zcash-plugin), self-hosted alternative के लिए संबंधित ZecHub guide
