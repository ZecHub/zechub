<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Viewing Key

शील्डेड पते आपको Zcash blockchain पर यथासंभव कम जानकारी प्रकट करते हुए लेनदेन करने देते हैं। तो जब आपको *वास्तव में* किसी विशिष्ट पक्ष को यह दिखाना हो कि आपके पास क्या है, या आपने क्या भेजा है, तब क्या होता है? हर शील्डेड पते की एक viewing key होती है, जो खर्च करने की क्षमता दिए बिना पढ़ने की पहुँच देती है। Viewing key को [ZIP 310](https://zips.z.cash/zip-0310) में प्रस्तुत किया गया था और Sapling नेटवर्क अपग्रेड में प्रोटोकॉल में जोड़ा गया था।

Viewing key चयनात्मक प्रकटीकरण का उपकरण है: आप चुनते हैं कि कौन क्या देखे, और ऐसा करने के लिए आप कभी भी खर्च करने का अधिकार नहीं सौंपते।

## Viewing key का उपयोग क्यों करें?

इस विषय पर Electric Coin Company के लेखन में उन परिस्थितियों को बताया गया है जो सबसे अधिक बार सामने आती हैं, और वे आज भी सामान्य परिस्थितियाँ हैं:

- **जमा राशियों पर नज़र रखने वाला एक्सचेंज।** एक्सचेंज एक इंटरनेट-सामना करने वाले पहचान नोड पर incoming viewing key लोड करता है, ताकि वह शील्डेड पते पर ग्राहक की जमा राशियों को देख सके, जबकि spending key ऐसे हार्डवेयर पर रहती है जो कभी नेटवर्क को नहीं छूता।
- **अपनी होल्डिंग्स साबित करने वाला संरक्षक।** संरक्षक प्रत्येक शील्डेड पते के लिए किसी ऑडिटर को full viewing key देता है। ऑडिटर उन शेष राशियों की जाँच कर सकता है और उन पतों से व उन पतों तक की पिछली गतिविधि की समीक्षा कर सकता है, और कुछ नहीं कर सकता।
- **किसी प्रतिपक्ष पर उचित जाँच।** जहाँ किसी एक्सचेंज को उन्नत उचित जाँच के हिस्से के रूप में ग्राहक के शील्डेड इतिहास की समीक्षा करनी होती है, वहाँ वह धनराशि के बजाय viewing key माँग सकता है।

## Viewing key क्या प्रकट करती है और क्या नहीं

एक से अधिक प्रकार की key होती हैं, और उनका अंतर तय करता है कि आप कितना कुछ प्रकट करते हैं।

| Key | उपसर्ग | प्रदान करती है |
|---|---|---|
| Unified full viewing key (UFVK) | `uview…` | खाते के प्रत्येक pool के लिए आने वाले **और** जाने वाले लेनदेन देखती है |
| Unified incoming viewing key (UIVK) | `uivk…` | खाते के प्रत्येक pool के लिए केवल आने वाले लेनदेन देखती है |
| Sapling extended full viewing key | `zxviews…` | key के पतों के लिए आने वाली और जाने वाली Sapling गतिविधि देखती है |

इनमें से कोई भी खर्च नहीं कर सकती। ये सभी उस अर्थ में स्थायी हैं जो मायने रखता है: जो key आप दे चुके हैं उसे वापस नहीं लिया जा सकता; केवल धनराशि को ऐसे खाते में ले जाकर उससे आगे बढ़ा जा सकता है जिसकी key दूसरे पक्ष के पास न हो।

कुछ भी साझा करने से पहले, दो प्रकटीकरण जालों को जानना उपयोगी है।

**Incoming का अर्थ सीमित नहीं है।** Unified incoming viewing key पूरे खाते के दायरे में होती है, केवल उस एक पते के नहीं जिसके बारे में आपसे पूछा गया था। किसी एक Sapling पते के लिए UIVK निर्यात करना भी उस खाते के प्रत्येक pool में आने वाली गतिविधि की दृश्यता देता है, इसलिए यह अपने नाम वाले पते से अधिक प्रकट करता है। [Zallet Book](https://zcash.github.io/zallet/zcashd/json_rpc.html) इसे स्पष्ट रूप से कहता है।

**प्रकाशित पता पहले ही भविष्य के प्रतिद्वंद्वी के सामने उसकी incoming viewing key उजागर कर देता है।** [ZIP 326](https://zips.z.cash/zip-0326) में उल्लेख है कि क्वांटम कंप्यूटर वाला प्रतिद्वंद्वी प्रकाशित diversified पते से incoming viewing key पुनर्प्राप्त कर सकता है, जो nullifier key पुनर्प्राप्त करने के विपरीत संभव है। आज पता प्रकाशित करना viewing key प्रकाशित करने के समान नहीं है, लेकिन पर्याप्त लंबे समय-क्षितिज में दोनों एक-दूसरे के अधिक निकट हैं।

## Ironwood के बाद Viewing key

NU6.3 ने Ironwood शील्डेड pool प्रस्तुत किया और Orchard pool को केवल खर्च करने योग्य बनाया, इसलिए समय के साथ धनराशि एक से दूसरे में स्थानांतरित होती है। अपग्रेड के लिए स्वयं [Ironwood](/zcash-tech/ironwood) और [The turnstile](/zcash-tech/the-turnstile) देखें।

**Ironwood से पहले जारी की गई viewing key माइग्रेशन के बाद भी काम करती रहती है।** ZIP 326 निर्दिष्ट करता है कि एक receiver और उसकी संबंधित incoming viewing key, किसी pool के बजाय Orchard *protocol* के दायरे में होती है: वही incoming viewing key Orchard-pool और Ironwood-pool, दोनों के note ciphertext को trial-decrypt करती है। Zallet इसे इसी तरह लागू करता है और Ironwood नोटों को Orchard-आकार के रूप में वर्णित करता है, जिन्हें Ironwood note-encryption domain के अंतर्गत खाते की Orchard viewing key से trial-decrypt किया जाता है।

Key रखने या जारी करने वाले किसी भी व्यक्ति के लिए इसके तीन परिणाम हैं:

1. **शेष राशियाँ pool के बीच स्थानांतरित होती हैं, और दर्शक इसे होते हुए देखता है।** [ZIP 318](https://zips.z.cash/zip-0318) माइग्रेशन को छोटे, जानबूझकर एकरूप Orchard-से-Ironwood लेनदेन की श्रृंखला के रूप में निर्दिष्ट करता है, जिन्हें यादृच्छिक कार्यक्रम पर प्रसारित किया जाता है; प्रत्येक एक Orchard note खर्च करता है और एक मानक मूल्यवर्ग का Ironwood output बनाता है। Viewing key से देखने वाला ऑडिटर होल्डिंग्स को हफ्तों में चरणों के माध्यम से एक pool से दूसरे में स्थानांतरित होते देखता है, किसी एकल परिवर्तन में नहीं। Wallet अपनी viewing key का उपयोग करके chain डेटा से अपनी माइग्रेशन प्रगति पुनर्निर्मित कर सकता है।
2. **माइग्रेशन का प्रत्येक चरण उस मूल्य को प्रकट करता है जिसे वह स्थानांतरित करता है।** यह turnstile पार करने में अंतर्निहित है, और यही माइग्रेशन को ऑडिट योग्य बनाता है। शेष राशि को मानक मूल्यवर्गों में विभाजित करने का अर्थ है कि कोई एकल लेनदेन पूरे Orchard-pool शेष को प्रकट नहीं करता।
3. **Ironwood के बाद बनाए गए खाते अपनी key अलग तरह से प्राप्त कर सकते हैं।** [ZIP 2005](https://zips.z.cash/zip-2005) क्वांटम-पुनर्प्राप्ति योग्य key के लिए `use_qsk` फ्लैग जोड़ता है, और यह incoming, outgoing तथा diversifier key प्राप्त करने का तरीका बदलता है, इसलिए `use_qsk = true` key वास्तव में अलग key हैं। ZIP 326 के अनुसार फ्लैग पूरे खाते में एकरूप होना चाहिए और Mainnet पर NU6.3 सक्रिय होने से पहले `use_qsk = true` key बनाना निषिद्ध है। इसलिए Ironwood से पहले मौजूद खाते से निर्यात की गई key `use_qsk = false` key होती है और उस खाते के लिए सही बनी रहती है। यह न मानें कि एक खाते से निर्यात की गई key दूसरे खाते का वर्णन करती है।

## Viewing key निर्यात करना

### Zallet

[Zallet](https://github.com/zcash/zallet) वह full-node wallet है जिसने zcashd के अंदर के wallet का स्थान लिया। Viewing-key निर्यात और आयात **v0.1.0-beta.2 (28 जुलाई 2026)** में आया था, इसलिए पहले अपना संस्करण जाँचें; पहले के बिल्ड में ये तरीके नहीं हैं। Method नाम के बाद हर argument वैध JSON होना चाहिए, जिसका अर्थ है कि string मान अपने दोहरे उद्धरण चिह्न रखते हैं। [Zallet Quick Reference Guide](/using-zcash/zallet-quick-reference-guide) सामान्य command शैली को कवर करती है।

Wallet में क्या है, इसकी सूची देखें:

```bash
zallet rpc listaddresses
```

Unified पता देकर खाते की unified full viewing key निर्यात करें:

```bash
zallet rpc z_exportviewingkey '"<unified address>"'
```

वैकल्पिक `ivk` argument का उपयोग करके इसके बजाय खाते की unified incoming viewing key निर्यात करें:

```bash
zallet rpc z_exportviewingkey '"<unified address>"' true
```

Sapling पता देने पर उस खाते की Sapling extended full viewing key (`zxviews…`) लौटती है, जो पुराने zcashd व्यवहार से मेल खाती है। दो प्रलेखित सीमाएँ हैं: Sprout पते अस्वीकार कर दिए जाते हैं, और Sapling extended full viewing key उस खाते से निर्यात नहीं की जा सकती जिसे स्वयं view-only के रूप में आयात किया गया था, क्योंकि wallet इसे पुनर्निर्मित नहीं कर सकता। `ivk` रूप आयातित view-only खातों के लिए काम करता है।

### Wallet जो अपने स्वयं के इंटरफ़ेस से viewing key निर्यात करते हैं

[Wallets](/using-zcash/wallets) पृष्ठ प्रत्येक wallet के लिए viewing-key समर्थन और Ironwood तत्परता को ट्रैक करता है। लेखन के समय, viewing-key समर्थन और **Ironwood: Ready** दोनों सूचीबद्ध करने वाले wallet में ZODL, Zingo!, Zkool, Cake, Zallet, Zecd और Nozy शामिल हैं। किसी एक wallet पर निर्भर होने से पहले इस पृष्ठ को देखें, क्योंकि तत्परता बदलती रहती है।

## Watch-only खाते के रूप में viewing key आयात करना

### Zkool

[Zkool](https://github.com/hhanh00/zkool2) यहाँ सबसे लचीला विकल्प है, क्योंकि यह unified key के साथ-साथ legacy key भी स्वीकार करता है। इसका README, zcashd से निर्यात की गई legacy शील्डेड extended key के साथ-साथ **unified viewing key** या **Sapling extended viewing key** से बनाए गए view-only खातों को प्रलेखित करता है। नया खाता जोड़ें, view-only मार्ग चुनें, और `uview…` या `zxviews…` key पेस्ट करें; खाता फिर sync होता है और बिना खर्च करने के अधिकार के शेष राशि व इतिहास रिपोर्ट करता है।

Ironwood protocol समर्थन और Orchard-से-Ironwood माइग्रेशन Zkool 6.24.0 (20 जुलाई 2026) में आया था, और 6.26.1 (2 अगस्त 2026) ने mempool में Ironwood लेनदेन पहचान को ठीक किया। 6.26.1 या उसके बाद का संस्करण चलाएँ।

### Zallet

```bash
zallet rpc z_importviewingkey '"<zxviews… key>"' '"whenkeyisnew"' 0
```

दूसरा argument rescan नीति है: `"whenkeyisnew"` (डिफ़ॉल्ट), `"yes"` या `"no"`। तीसरा वह block height है जहाँ से पुनः स्कैन करना है। Zallet key को view-only खाते के रूप में आयात करता है और खर्च करने के अधिकार के बिना उसके पतों के आने वाले व जाने वाले लेनदेन ट्रैक करता है।

**Zallet केवल Sapling extended full viewing key आयात करता है।** यह `uview…` unified full viewing key आयात नहीं करेगा, भले ही वह उसे निर्यात कर सकता हो। पूरे unified खाते की पढ़ने की पहुँच देने के लिए, Zallet से UFVK निर्यात करें और उसे ऐसे wallet में आयात करें जो unified key स्वीकार करता हो, जैसे Zkool।

आयातित key को txids, शुल्क और memos सहित पूर्ण लेनदेन-इतिहास फ़ाइल में बदलने के लिए [Viewing Key से Transaction History निर्यात करना](/guides/viewing-key-transaction-export) देखें।

## क्या बदला, और किसे खोजना बंद करें

यदि आपने इस पृष्ठ का पुराना संस्करण, या उसका अनुवाद, देखा है, तो तीन मार्ग अब काम नहीं करते।

- **`zcash-cli z_exportviewingkey` और `z_importviewingkey`।** zcashd 18 जुलाई 2026 को समर्थन-समाप्ति पड़ाव तक पहुँचा और अब नहीं चलता। Zallet के समान नाम वाले method उसका प्रतिस्थापन हैं; [migration guide](/guides/migration-guide-zcashd-to-zebrad-zallet) देखें।
- **Ywallet walkthrough।** Wallets पृष्ठ Ywallet को **Ironwood: Not Ready** चिह्नित करता है, इसलिए Ironwood-युग की viewing key के लिए लोगों को इसी wallet की ओर नहीं भेजना चाहिए। उसी डेवलपर का Zkool, समान प्रकार की key स्वीकार करता है और Ready चिह्नित है।
- **zcashblockexplorer.com/vk।** सेवा अमान्य certificate के साथ HTTP 503 लौटाती है और इसे प्रतिस्थापित करने के बजाय हटा दिया गया है। किसी वेबसाइट में viewing key पेस्ट करने से आपका पूरा लेनदेन इतिहास उस वेबसाइट के संचालक को मिल जाता है, जो पुराने पृष्ठ के तीनों विकल्पों में हमेशा सबसे कमजोर था। इसके बजाय key को उस wallet में आयात करें जिसे आप स्वयं चलाते हैं।

## संसाधन

Viewing key का उपयोग आवश्यकता के आधार पर करें, और पूछे गए प्रश्न का उत्तर देने वाली सबसे सीमित key को प्राथमिकता दें।

- [ZIP 326: Wallet के लिए NU6.3 परिणाम](https://zips.z.cash/zip-0326) — Orchard और Ironwood pool में viewing key कैसे व्यवहार करती हैं
- [ZIP 229: Version 6 Transaction Format](https://zips.z.cash/zip-0229) — Orchard और Ironwood pool को परिभाषित करता है
- [Zallet changelog](https://github.com/zcash/zallet/blob/main/CHANGELOG.md) — किस रिलीज़ ने कौन-सा RPC method जोड़ा
- [Zkool README](https://github.com/hhanh00/zkool2/blob/main/README.md) — समर्थित खाता और key प्रकार
- [ECC, Viewing Key की व्याख्या](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, चयनात्मक प्रकटीकरण और Viewing Key](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Zcash Viewing Key वीडियो प्रस्तुति](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
