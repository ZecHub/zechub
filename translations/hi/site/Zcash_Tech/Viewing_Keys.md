<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="पृष्ठ संपादित करें"/>
</a>

# Viewing Keys

शील्डेड पते आपको Zcash blockchain पर यथासंभव कम जानकारी प्रकट करते हुए लेन-देन करने देते हैं। तो जब आपको किसी विशेष पक्ष को यह दिखाना हो कि आपके पास क्या है, या आपने क्या भेजा है, तब क्या होता है? प्रत्येक शील्डेड पते में एक viewing key होती है, जो खर्च करने की क्षमता दिए बिना पढ़ने की पहुँच प्रदान करती है। Viewing keys को [ZIP 310](https://zips.z.cash/zip-0310) में प्रस्तुत किया गया था और Sapling नेटवर्क अपग्रेड में प्रोटोकॉल में जोड़ा गया था।

Viewing key चयनात्मक प्रकटीकरण का उपकरण है: आप तय करते हैं कि कौन क्या देखेगा, और ऐसा करने के लिए आप कभी खर्च करने का अधिकार नहीं सौंपते।

## Viewing key का उपयोग क्यों करें?

इस विषय पर Electric Coin Company के लेखन में वे स्थितियाँ बताई गई हैं जो सबसे अधिक सामने आती हैं, और आज भी यही आम स्थितियाँ हैं:

- **जमा राशि पर नज़र रखने वाला एक्सचेंज।** एक्सचेंज एक इंटरनेट-संपर्कित पहचान नोड पर incoming viewing key लोड करता है, ताकि वह शील्डेड पते पर ग्राहकों की जमा राशियों को देख सके, जबकि spending key ऐसे हार्डवेयर पर रहती है जो कभी नेटवर्क से नहीं जुड़ता।
- **अपनी होल्डिंग्स सिद्ध करने वाला संरक्षक।** संरक्षक प्रत्येक शील्डेड पते के लिए ऑडिटर को full viewing key देता है। ऑडिटर उन बैलेंसों की जाँच कर सकता है और उन पतों से तथा उन पतों को हुई पिछली गतिविधि की समीक्षा कर सकता है, और कुछ नहीं कर सकता।
- **प्रतिपक्ष पर उचित जाँच-पड़ताल।** जब किसी एक्सचेंज को उन्नत उचित जाँच-पड़ताल के भाग के रूप में किसी ग्राहक के शील्डेड इतिहास की समीक्षा करनी हो, तो वह फंड के बजाय viewing key माँग सकता है।

## Viewing key क्या प्रकट करती है और क्या नहीं

एक से अधिक प्रकार की key होती हैं, और अंतर यह तय करता है कि आप कितनी जानकारी दे रहे हैं।

| Key | Prefix | प्रदान करती है |
|---|---|---|
| Unified full viewing key (UFVK) | `uview…` | खाते के प्रत्येक pool के लिए आने वाले **और** जाने वाले लेन-देन देखती है |
| Unified incoming viewing key (UIVK) | `uivk…` | खाते के प्रत्येक pool के लिए केवल आने वाले लेन-देन देखती है |
| Sapling extended full viewing key | `zxviews…` | key के पतों के लिए आने वाली और जाने वाली Sapling गतिविधि देखती है |

इनमें से कोई भी खर्च नहीं कर सकती। ये सभी उस महत्वपूर्ण अर्थ में स्थायी हैं: जिस key को आप दे चुके हैं, उसे वापस नहीं लिया जा सकता; केवल फंड को ऐसे खाते में स्थानांतरित करके उसे अप्रासंगिक किया जा सकता है जिसकी keys दूसरे पक्ष के पास न हों।

कुछ भी साझा करने से पहले दो प्रकटीकरण-जाल जान लेना उपयोगी है।

**Incoming का अर्थ सीमित नहीं है।** Unified incoming viewing key पूरे खाते के दायरे में होती है, केवल उस एक पते के लिए नहीं जिसके बारे में आपसे पूछा गया था। किसी एक Sapling पते के लिए UIVK निर्यात करना भी उस खाते के हर pool में आने वाले लेन-देन की दृश्यता देता है, इसलिए यह अपने नाम वाले पते से अधिक जानकारी प्रकट करता है। [Zallet Book](https://zcash.github.io/zallet/zcashd/json_rpc.html) यह स्पष्ट रूप से कहती है।

**प्रकाशित पता पहले से ही किसी भविष्य के प्रतिद्वंद्वी के लिए उसकी incoming viewing key उजागर करता है।** [ZIP 326](https://zips.z.cash/zip-0326) बताता है कि क्वांटम कंप्यूटर वाला प्रतिद्वंद्वी प्रकाशित diversified पते से incoming viewing key पुनर्प्राप्त कर सकता है, जो nullifier key पुनर्प्राप्त करने के विपरीत व्यावहारिक है। आज पता प्रकाशित करना viewing key प्रकाशित करने के समान नहीं है, लेकिन पर्याप्त लंबे समय-क्षितिज में दोनों एक-दूसरे के अधिक निकट हैं।

## Ironwood के बाद Viewing keys

NU6.3 ने Ironwood shielded pool प्रस्तुत किया और Orchard pool को केवल खर्च के लिए बना दिया, इसलिए समय के साथ फंड एक से दूसरे में स्थानांतरित होते हैं। अपग्रेड के लिए [Ironwood](/zcash-tech/ironwood) और [The turnstile](/zcash-tech/the-turnstile) देखें।

**Ironwood से पहले जारी की गई viewing key माइग्रेशन के बाद भी काम करती रहती है।** ZIP 326 निर्दिष्ट करता है कि receiver, और उसकी संबंधित incoming viewing key, किसी pool के बजाय Orchard *प्रोटोकॉल* के दायरे में होती है: वही incoming viewing key Orchard-pool और Ironwood-pool दोनों के note ciphertext को trial-decrypt करती है। Zallet इसे इसी तरह लागू करता है, Ironwood notes को Orchard-आकार का बताते हुए और Ironwood note-encryption domain के अंतर्गत खाते की Orchard viewing keys से trial-decrypt करते हुए।

Key रखने या जारी करने वाले किसी भी व्यक्ति के लिए तीन परिणाम:

1. **बैलेंस pools के बीच स्थानांतरित होते हैं, और दर्शक इसे होते हुए देखता है।** [ZIP 318](https://zips.z.cash/zip-0318) माइग्रेशन को छोटे, जानबूझकर एकरूप Orchard-से-Ironwood लेन-देनों की श्रृंखला के रूप में निर्दिष्ट करता है, जिन्हें यादृच्छिक समय-सारणी पर प्रसारित किया जाता है; प्रत्येक में एक Orchard note खर्च होता है और एक मानक मूल्यवर्ग का Ironwood output बनता है। Viewing key से देखने वाला ऑडिटर होल्डिंग्स को हफ्तों में चरणों के साथ एक pool से दूसरे में स्थानांतरित होते देखता है, किसी एकल स्थानांतरण में नहीं। Wallet अपनी viewing keys का उपयोग करके chain डेटा से अपनी माइग्रेशन प्रगति पुनर्निर्मित कर सकता है।
2. **हर माइग्रेशन चरण उस मूल्य को प्रकट करता है जिसे वह स्थानांतरित करता है।** यह turnstile पार करने में अंतर्निहित है, और यही माइग्रेशन को ऑडिट योग्य बनाता है। बैलेंस को मानक मूल्यवर्गों में बाँटने का अर्थ है कि कोई एकल लेन-देन पूरा Orchard-pool बैलेंस प्रकट नहीं करता।
3. **Ironwood के बाद बनाए गए खाते अपनी keys अलग तरह से derive कर सकते हैं।** [ZIP 2005](https://zips.z.cash/zip-2005) क्वांटम-पुनर्प्राप्त करने योग्य keys के लिए एक `use_qsk` flag जोड़ता है, और यह incoming, outgoing और diversifier keys के derive होने का तरीका बदल देता है, इसलिए `use_qsk = true` keys वास्तव में अलग keys हैं। ZIP 326 में flag को खाते भर में एकरूप होना आवश्यक है और Mainnet पर NU6.3 सक्रिय होने से पहले `use_qsk = true` keys बनाने पर रोक है। इसलिए Ironwood से पहले मौजूद खाते से निर्यात की गई key `use_qsk = false` key होती है, और उस खाते के लिए सही बनी रहती है। यह न मानें कि किसी एक खाते से निर्यात की गई key दूसरे खाते का वर्णन करती है।

## Viewing key निर्यात करना

### Zallet

[Zallet](https://github.com/zcash/zallet) वह full-node wallet है जिसने zcashd के भीतर के wallet का स्थान लिया। Viewing-key निर्यात और आयात **v0.1.0-beta.2 (28 July 2026)** में आए, इसलिए पहले अपना संस्करण जाँचें; पुराने builds में ये methods नहीं हैं। Method नाम के बाद हर argument वैध JSON होना चाहिए, अर्थात string values अपने दोहरे उद्धरण चिह्न रखती हैं। [Zallet Quick Reference Guide](/using-zcash/zallet-quick-reference-guide) सामान्य command शैली को कवर करती है।

Wallet में मौजूद चीज़ें सूचीबद्ध करें:

```bash
zallet rpc listaddresses
```

Unified address देकर खाते की unified full viewing key निर्यात करें:

```bash
zallet rpc z_exportviewingkey '"<unified address>"'
```

वैकल्पिक `ivk` argument का उपयोग करके इसके बजाय खाते की unified incoming viewing key निर्यात करें:

```bash
zallet rpc z_exportviewingkey '"<unified address>"' true
```

Sapling पता देने पर उस खाते की Sapling extended full viewing key (`zxviews…`) लौटती है, जो पुराने zcashd व्यवहार से मेल खाती है। दो प्रलेखित सीमाएँ हैं: Sprout पते अस्वीकार किए जाते हैं, और Sapling extended full viewing key ऐसे खाते से निर्यात नहीं की जा सकती जिसे स्वयं view-only के रूप में आयात किया गया था, क्योंकि wallet उसे पुनर्निर्मित नहीं कर सकता। `ivk` रूप आयात किए गए view-only खातों के लिए काम करता है।

### वे Wallets जो अपने इंटरफ़ेस से viewing keys निर्यात करते हैं

[Wallets](/using-zcash/wallets) पृष्ठ प्रत्येक wallet के लिए viewing-key समर्थन और Ironwood readiness का विवरण रखता है। लेखन के समय, viewing-key समर्थन और **Ironwood: Ready** दोनों सूचीबद्ध करने वाले wallets में ZODL, Zingo!, Zkool, Cake, Zallet, Zecd और Nozy शामिल हैं। किसी एक wallet पर निर्भर होने से पहले इस पृष्ठ को देखें, क्योंकि readiness बदलती रहती है।

## Watch-only खाते के रूप में viewing key आयात करना

### Zkool

[Zkool](https://github.com/hhanh00/zkool2) यहाँ सबसे लचीला विकल्प है, क्योंकि यह unified keys के साथ-साथ legacy keys भी स्वीकार करता है। इसका README **unified viewing key** या **Sapling extended viewing key** से बनाए गए view-only खातों का दस्तावेज़ीकरण करता है, साथ ही zcashd से निर्यात की गई legacy shielded extended keys का भी। नया खाता जोड़ें, view-only मार्ग चुनें, और `uview…` या `zxviews…` key पेस्ट करें; इसके बाद खाता sync होता है और खर्च करने के किसी अधिकार के बिना बैलेंस तथा इतिहास रिपोर्ट करता है।

Ironwood protocol समर्थन और Orchard-से-Ironwood माइग्रेशन Zkool 6.24.0 (20 July 2026) में आए, और 6.26.1 (2 August 2026) ने mempool में Ironwood transaction detection को ठीक किया। 6.26.1 या बाद का संस्करण चलाएँ।

### Zallet

```bash
zallet rpc z_importviewingkey '"<zxviews… key>"' '"whenkeyisnew"' 0
```

दूसरा argument rescan policy है: `"whenkeyisnew"` (डिफ़ॉल्ट), `"yes"` या `"no"`। तीसरा वह block height है जिससे पुनः स्कैन करना है। Zallet key को view-only खाते के रूप में आयात करता है और खर्च करने के अधिकार के बिना उसके पतों के आने वाले तथा जाने वाले लेन-देनों को ट्रैक करता है।

**Zallet केवल Sapling extended full viewing keys आयात करता है।** यह `uview…` unified full viewing key आयात नहीं करेगा, भले ही वह एक निर्यात कर सकता है। पूरे unified खाते का read access सौंपने के लिए, UFVK को Zallet से निर्यात करें और उसे unified keys स्वीकार करने वाले wallet, जैसे Zkool, में आयात करें।

आयात की गई key को txids, fees और memos सहित पूर्ण transaction history फ़ाइल में बदलने के लिए, [Exporting Transaction History from a Viewing Key](/guides/viewing-key-transaction-export) देखें।

## क्या बदला, और किसे ढूँढना बंद करें

यदि आपने इस पृष्ठ का पुराना संस्करण, या उसका अनुवाद, अपनाया था, तो तीन मार्ग अब काम नहीं करते।

- **`zcash-cli z_exportviewingkey` और `z_importviewingkey`।** zcashd 18 July 2026 को अपने end-of-support halt तक पहुँच गया और अब नहीं चलता। Zallet के समान नाम वाले methods इसका प्रतिस्थापन हैं; [migration guide](/guides/migration-guide-zcashd-to-zebrad-zallet) देखें।
- **Ywallet walkthrough।** Wallets पृष्ठ Ywallet को **Ironwood: Not Ready** दर्शाता है, इसलिए Ironwood-युग की viewing keys के लिए लोगों को इसी wallet की ओर नहीं भेजना चाहिए। उसी डेवलपर का Zkool keys की वही श्रेणी स्वीकार करता है और Ready के रूप में चिह्नित है।
- **zcashblockexplorer.com/vk।** सेवा invalid certificate के साथ HTTP 503 लौटाती है, और इसे बदलने के बजाय हटा दिया गया है। किसी वेबसाइट में viewing key पेस्ट करने से आपका पूरा transaction history उस वेबसाइट के संचालक को मिल जाता है, जो पुराने पृष्ठ के तीनों विकल्पों में हमेशा सबसे कमजोर विकल्प था। इसके बजाय key को उस wallet में आयात करें जिसे आप स्वयं चलाते हैं।

## संसाधन

Viewing keys का आवश्यकता के आधार पर उपयोग करें, और पूछे गए प्रश्न का उत्तर देने वाली सबसे सीमित key को प्राथमिकता दें।

- [Payment disclosures](/zcash-tech/payment-disclosures) - खाते तक निरंतर पहुँच दिए बिना एक भुगतान के चुने हुए विवरण सिद्ध करना
- [ZIP 326: NU6.3 Consequences for Wallets](https://zips.z.cash/zip-0326) — Orchard और Ironwood pools के बीच viewing keys कैसे व्यवहार करती हैं
- [ZIP 229: Version 6 Transaction Format](https://zips.z.cash/zip-0229) — Orchard और Ironwood pools को परिभाषित करता है
- [Zallet changelog](https://github.com/zcash/zallet/blob/main/CHANGELOG.md) — किस release ने कौन-सा RPC method जोड़ा
- [Zkool README](https://github.com/hhanh00/zkool2/blob/main/README.md) — समर्थित account और key प्रकार
- [ECC, Explaining Viewing Keys](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, Selective Disclosure and Viewing Keys](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Zcash Viewing Key Video Presentation](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
