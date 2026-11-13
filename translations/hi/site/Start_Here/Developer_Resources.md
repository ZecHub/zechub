<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Developer_Resources.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# डेवलपर संसाधन

Zcash पर निर्माण के लिए आपको जिन संसाधनों की आवश्यकता है, वे एक ही ढेर में सूचीबद्ध करने के बजाय इस आधार पर समूहित किए गए हैं कि प्रत्येक किस काम के लिए है।

2026 में स्टैक (stack) में बहुत बदलाव आया। zcashd, जिसने अपने अधिकांश इतिहास में नेटवर्क चलाया, 18 जुलाई 2026 को ब्लॉक ऊँचाई 3417100 पर अपने जीवनकाल के अंत (end of life) तक पहुँच गया, और हर अपरिवर्तित नोड उस ऊँचाई पर बंद हो गया और दोबारा शुरू होने से इनकार कर देगा। zcashd के लिए लिखी गई गाइड अब शुरुआती बिंदु नहीं, बल्कि इतिहास हैं, इसलिए यह पेज उन चीज़ों के इर्द-गिर्द व्यवस्थित है जिन्होंने उसकी जगह ली।

## स्टैक एक नज़र में

| परत | क्या उपयोग करें | शुरुआत |
|:--|:--|:--|
| फुल नोड | Zebra या Zakura | [Zebra बुक](https://zebra.zfnd.org/), [zakura.com](https://zakura.com/) |
| फुल नोड वॉलेट | Zallet, बीटा में | [Zallet बुक](https://zcash.github.io/zallet/) |
| लाइट वॉलेट सर्वर | Zaino या lightwalletd | [Zaino](https://github.com/zingolabs/zaino), [lightwalletd](https://github.com/zcash/lightwalletd) |
| वॉलेट लाइब्रेरी | librustzcash क्रेट | [librustzcash](https://github.com/zcash/librustzcash) |
| मोबाइल | Android और iOS SDK | [Android](https://github.com/zcash/zcash-android-wallet-sdk), [iOS](https://github.com/zcash/zcash-swift-wallet-sdk) |
| विनिर्देश | प्रोटोकॉल स्पेसिफिकेशन और ZIP | [zips.z.cash](https://zips.z.cash) |

## नोड

नोड (node) कंसेंसस (consensus) को मान्य करता है और चेन (chain) को संग्रहीत रखता है। इसके दो सक्रिय रूप से विकसित किए जा रहे इम्प्लीमेंटेशन हैं।

[Zebra](/zcash-tech/zebra-full-node) Zcash Foundation का नोड है, जो Rust में लिखा गया है, और अब अधिकांश गाइड इसी को मानकर चलती हैं। [Zebra बुक](https://zebra.zfnd.org/) इसे इंस्टॉल करने और चलाने की जानकारी देती है, और [रिपॉज़िटरी](https://github.com/ZcashFoundation/zebra) में इसका विकास होता है।

[Zakura](/zcash-tech/zakura-node) एक नया नोड है, जिसे इसके लेखक “कंसेंसस-संगत Zcash फुल नोड, जो स्केल के लिए बनाया गया है” बताते हैं, जिसमें तेज़ सिंक, ब्लॉक प्रूनिंग और zcashd संगतता मोड है। इसका नेतृत्व Zcash के सह-संस्थापक Sean Bowe और Dev Ojha करते हैं। यह Apache 2.0 के तहत [zakura-core/zakura](https://github.com/zakura-core/zakura) पर ओपन सोर्स है।

ZecHub पर एक [फुल नोड](/zcash-tech/full-nodes) पेज है, जो इनके बीच के फायदे-नुकसान बताता है।

## फुल नोड वॉलेट

zcashd नोड के साथ एक वॉलेट (wallet) भी देता था। वह वॉलेट अब नहीं रहा, और [Zallet](https://github.com/zcash/zallet) उसका प्रतिस्थापन है। Zallet बुक इसे “Rust में लिखा गया एक फुल-नोड Zcash वॉलेट” बताती है, जिसे “zcashd वॉलेट के प्रतिस्थापन के रूप में बनाया जा रहा है”।

इस पर निर्भर होने से पहले सुरक्षा चेतावनी पढ़ें। Zallet बीटा में है, “इसकी पूरी तरह समीक्षा नहीं हुई है”, ब्रेकिंग बदलाव “किसी भी समय हो सकते हैं, जिसके लिए आपको अपना Zallet वॉलेट हटाकर फिर से बनाना पड़ सकता है”, और अभी तक हर zcashd RPC मेथड पोर्ट नहीं किया गया है।

यदि आप किसी मौजूदा सेटअप को स्थानांतरित कर रहे हैं, तो ZecHub के पास [zcashd से Zebra और Zallet पर माइग्रेशन गाइड](/guides/migration-guide-zcashd-to-zebrad-zallet) और एक [Zallet त्वरित संदर्भ](/using-zcash/zallet-quick-reference-guide) है।

## लाइट वॉलेट सर्वर

अधिकांश वॉलेट नोड नहीं चलाते। वे एक सर्वर से बात करते हैं जो चेन रखता है और उसका एक संक्षिप्त दृश्य वापस देता है।

[lightwalletd](https://github.com/zcash/lightwalletd) मूल सेवा है, जो Go में लिखी गई है, और इसे “एक बैकएंड सेवा जो Zcash ब्लॉकचेन के लिए बैंडविड्थ-कुशल इंटरफ़ेस प्रदान करती है” बताया गया है। [Zaino](/zcash-tech/zaino) नया इंडेक्सर है, जो Rust में लिखा गया है, और चेन की अपनी प्रति रखने के बजाय एक फुल वैलिडेटर से पढ़ता है।

[लाइट क्लाइंट प्रोटोकॉल](https://zcash.readthedocs.io/en/latest/lightwalletd/index.html) दस्तावेज़ीकरण स्वयं प्रोटोकॉल को कवर करता है। [लाइटवॉलेट नोड](/zcash-tech/lightwallet-nodes) पेज बताता है कि ये सर्वर किसी उपयोगकर्ता के बारे में क्या देख सकते हैं और क्या नहीं, जिसे कोई सर्वर चुनने से पहले समझना उपयोगी है।

## वॉलेट का निर्माण

अधिकांश वॉलेट संबंधी काम [librustzcash](https://github.com/zcash/librustzcash) के अंतर्गत Rust क्रेट में होता है, जिन पर मोबाइल SDK और कई डेस्कटॉप वॉलेट आधारित हैं। प्रत्येक क्रेट का दस्तावेज़ीकरण [docs.rs](https://docs.rs) पर है।

| क्रेट | यह किस लिए है |
|:--|:--|
| zcash_client_backend | “शील्डेड Zcash लाइट क्लाइंट बनाने के लिए API”, जिसमें सिंक और लेनदेन निर्माण शामिल हैं |
| zcash_client_sqlite | “एक SQLite-आधारित Zcash लाइट क्लाइंट”, ऊपर वाले के लिए स्टोरेज परत |
| zcash_keys | “Zcash की और एड्रेस प्रबंधन” |
| zcash_primitives | “Zcash प्रिमिटिव के Rust इम्प्लीमेंटेशन” |
| zcash_protocol | “Zcash प्रोटोकॉल नेटवर्क कॉन्स्टेंट और वैल्यू टाइप” |
| orchard | “Orchard शील्डेड लेनदेन प्रोटोकॉल” |
| sapling-crypto | “Zcash Sapling के लिए क्रिप्टोग्राफ़िक लाइब्रेरी” |
| pczt | “आंशिक रूप से बनाए गए Zcash लेनदेन के साथ काम करने के उपकरण”, जिनका उपयोग हार्डवेयर और मल्टी-डिवाइस साइनिंग के लिए होता है |
| zip321 | भुगतान अनुरोध URI, जैसा कि ZIP 321 में निर्दिष्ट है |

मोबाइल के लिए, [Android SDK](https://github.com/zcash/zcash-android-wallet-sdk) और [iOS SDK](https://github.com/zcash/zcash-swift-wallet-sdk) इन लाइब्रेरी को रैप करते हैं। iOS रिपॉज़िटरी का नाम पहले ZcashLightClientKit था, इसलिए पुराने लिंक और लेख उसी नाम का उपयोग करते हैं।

## विनिर्देश और क्रिप्टोग्राफ़ी

[प्रोटोकॉल स्पेसिफिकेशन](https://zips.z.cash/protocol/protocol.pdf) इस बात का आधिकारिक स्रोत है कि Zcash कैसे काम करता है, जिसमें [एड्रेस और की एन्कोडिंग](https://zips.z.cash/protocol/protocol.pdf#5.6%20Encodings%20of%20Addresses%20and%20Keys) शामिल हैं।

[ZIP](https://zips.z.cash) वह जगह हैं जहाँ बदलाव प्रस्तावित और निर्दिष्ट किए जाते हैं, और इंडेक्स दिखाता है कि कौन-से ड्राफ़्ट हैं और कौन-से अंतिम। कंसेंसस बदलाव नेटवर्क अपग्रेड (network upgrade) में जारी होते हैं, और ZecHub उन्हें [नेटवर्क अपग्रेड](/start-here/network-upgrades) पेज पर ट्रैक करता है।

अंतर्निहित क्रिप्टोग्राफ़ी के लिए, [halo2 बुक](https://zcash.github.io/halo2/index.html) और [Orchard बुक](https://zcash.github.io/orchard/) पढ़ें, साथ में [halo2](https://docs.rs/halo2_proofs/latest/halo2_proofs/) और [orchard](https://docs.rs/orchard/latest/orchard/) क्रेट दस्तावेज़ भी देखें। [FROST बुक](https://frost.zfnd.org/) थ्रेशोल्ड सिग्नेचर (signature) को कवर करती है, और ZecHub पर एक [FROST](/zcash-tech/frost) पेज है।

## टेस्टनेट

टेस्टनेट (testnet) एक अलग चेन है जिसमें मूल्यहीन सिक्के होते हैं, जिन्हें TAZ कहा जाता है। Zebra और Zakura दोनों इस पर चल सकते हैं, और [टेस्टनेट गाइड](https://zcash.readthedocs.io/en/latest/rtd_pages/testnet_guide.html) नोड कॉन्फ़िगरेशन को कवर करती है।

[testnet.zcashexplorer.app](https://testnet.zcashexplorer.app/) एक कार्यरत टेस्टनेट ब्लॉक एक्सप्लोरर है, जिसका मेननेट समकक्ष [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app/) पर है।

TAZ प्राप्त करना कठिन हिस्सा है, क्योंकि पुराने दस्तावेज़ीकरण में दिए गए फॉसेट (faucet) ने जवाब देना बंद कर दिया है। [zcashfaucet.jinolabs.xyz](https://zcashfaucet.jinolabs.xyz) एक समुदाय द्वारा संचालित फॉसेट है जो “अपना नोड, वॉलेट और माइनर (miner)” चलाता है, “शील्डेड (shielded) z2z ड्रिप” देता है, और “कैप्चा विक्रेता के बजाय ब्राउज़र प्रूफ (proof) ऑफ़ वर्क” से दावों को नियंत्रित करता है। यह MIT के तहत ओपन सोर्स है। यदि यह उपलब्ध नहीं है, तो Zcash R&D Discord में पूछें, जो Zcash दस्तावेज़ीकरण स्वयं सुझाता है।

## सामान्य दस्तावेज़ीकरण

[Zcash दस्तावेज़ीकरण](https://zcash.readthedocs.io/en/latest/) अब भी सबसे व्यापक एकल स्रोत है, जिसमें प्रोटोकॉल अवधारणाएँ, इंटीग्रेशन और माइनिंग (mining) शामिल हैं। इसे कुछ सावधानी से पढ़ें। यह zcashd के अनुसार संस्करणित है, इसलिए इसके कुछ हिस्से ऐसे नोड का वर्णन करते हैं जो अब नहीं चलता, जबकि प्रोटोकॉल और लाइट क्लाइंट (light client) वाले खंड उपयोगी बने हुए हैं। वहाँ मौजूद [Zcash वॉलेट ऐप थ्रेट मॉडल](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html) को उपयोगकर्ता की गोपनीयता (privacy) से जुड़ी कोई भी चीज़ डिज़ाइन करने से पहले पढ़ना उपयोगी है।

यदि आप सामान्य रूप से ब्लॉकचेन (blockchain) में नए हैं, तो साझा मूल सिद्धांतों के लिए आमतौर पर [Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook) की सिफ़ारिश की जाती है, और इसे पूरा मुफ़्त में पढ़ा जा सकता है। यह शील्डेड लेनदेन (transaction) को कवर नहीं करती।

## डेवलपर द्वारा उल्लिखित अन्य उपकरण

[Arti](https://docs.rs/arti/latest/arti/) Tor का Rust इम्प्लीमेंटेशन है, जिसका उपयोग zcash_client_backend वॉलेट ट्रैफ़िक को रूट करने के लिए करता है। स्वयं चलाए जा रहे नोड से कनेक्ट करने के लिए [Tailscale](https://github.com/tailscale/tailscale) का ज़िक्र आता है। [warp2](https://github.com/hhanh00/warp2) Hanh द्वारा बनाया गया एक तेज़ सिंक इम्प्लीमेंटेशन है, हालाँकि इसे 2023 के बाद से अपडेट नहीं किया गया है।

## समुदाय और कार्यक्रम

[Zcash R&D Discord](https://discord.gg/6AK7keWFaK) वह जगह है जहाँ प्रोटोकॉल और वॉलेट विकास पर चर्चा होती है, और [Zcash सामुदायिक फ़ोरम](https://forum.zcashcommunity.com/) पर लंबे प्रस्ताव और सहायता थ्रेड होते हैं।

हाल के हैकाथॉन परिणाम इस बात की अच्छी तस्वीर देते हैं कि लोग क्या बना रहे हैं: [ZecHub 2024](https://x.com/ZecHub/status/1845212469809033489), [ZecHub 2025](https://x.com/ZecHub/status/1975565960661635283) और [Zypherpunk हैकाथॉन 2025](https://forum.zcashcommunity.com/t/zypherpunk-hackathon-winners/53985)।

## सेवानिवृत्त संसाधन

ये इसलिए रखे गए हैं क्योंकि पुराने लेख इनसे लिंक करते हैं, और क्योंकि सेवानिवृत्त नोड के व्यवहार के लिए ये अब भी संदर्भ हैं। यहाँ से शुरुआत न करें।

[zcashd बुक](https://zcash.github.io/zcash/) और [zcashd RPC संदर्भ](https://zcash.github.io/rpc/) उस सॉफ़्टवेयर का दस्तावेज़ीकरण करते हैं जो जुलाई 2026 में [जीवनकाल के अंत](https://zcash.github.io/zcash/user/end-of-life.html) तक पहुँच गया। [zcash/zcash](https://github.com/zcash/zcash) रिपॉज़िटरी संग्रहीत (archived) है।

यदि आपके पास जोड़ने के लिए कोई संसाधन है, या आपको यहाँ कुछ पुराना हो चुका दिखता है, तो एक इश्यू या पुल रिक्वेस्ट खोलें। टीमों के पास हमेशा सब कुछ अद्यतन रखने की क्षमता नहीं होती, और आपके सामने आई समस्याओं की ओर ध्यान दिलाने से गाइड को सही दिशा देने में मदद मिलती है।

**अंतिम अपडेट:** अगस्त 2026
