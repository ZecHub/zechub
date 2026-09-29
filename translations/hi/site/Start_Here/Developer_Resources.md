<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Developer_Resources.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# डेवलपर संसाधन

Zcash पर निर्माण करने के लिए आवश्यक संसाधन, प्रत्येक के उद्देश्य के आधार पर समूहबद्ध किए गए हैं, न कि एक ही ढेर में सूचीबद्ध।

2026 में स्टैक बहुत बदल गया। zcashd, जिसने अपने अधिकांश इतिहास में नेटवर्क चलाया था, 18 जुलाई 2026 को ब्लॉक ऊंचाई 3417100 पर अपने जीवन-अंत तक पहुंच गया, और हर अपरिवर्तित नोड उस ऊंचाई पर बंद हो गया तथा पुनः शुरू होने से इनकार करेगा। zcashd के लिए लिखी गई मार्गदर्शिकाएं अब शुरुआती बिंदु नहीं, बल्कि इतिहास हैं, इसलिए यह पृष्ठ उसके प्रतिस्थापन के आधार पर व्यवस्थित है।

## एक नज़र में स्टैक

| स्तर | क्या उपयोग करें | शुरुआत करें |
|:--|:--|:--|
| पूर्ण नोड | Zebra या Zakura | [The Zebra Book](https://zebra.zfnd.org/), [zakura.com](https://zakura.com/) |
| पूर्ण नोड वॉलेट | Zallet, बीटा में | [The Zallet Book](https://zcash.github.io/zallet/) |
| लाइट वॉलेट सर्वर | Zaino या lightwalletd | [Zaino](https://github.com/zingolabs/zaino), [lightwalletd](https://github.com/zcash/lightwalletd) |
| वॉलेट लाइब्रेरी | librustzcash crates | [librustzcash](https://github.com/zcash/librustzcash) |
| मोबाइल | Android और iOS SDKs | [Android](https://github.com/zcash/zcash-android-wallet-sdk), [iOS](https://github.com/zcash/zcash-swift-wallet-sdk) |
| विनिर्देशन | प्रोटोकॉल विनिर्देशन और ZIPs | [zips.z.cash](https://zips.z.cash) |

## नोड

एक नोड सहमति को सत्यापित करता है और चेन को रखता है। दो सक्रिय रूप से विकसित किए जा रहे कार्यान्वयन हैं।

[Zebra](/zcash-tech/zebra-full-node), Zcash Foundation का Rust में लिखा नोड है, और अधिकांश मार्गदर्शिकाएं अब इसी को मानकर चलती हैं। [The Zebra Book](https://zebra.zfnd.org/) में इसे इंस्टॉल और चलाने की जानकारी है, और [repository](https://github.com/ZcashFoundation/zebra) वह स्थान है जहां विकास होता है।

[Zakura](/zcash-tech/zakura-node) एक नया नोड है, जिसे इसके लेखक "consensus-compatible Zcash full node, built for scale" के रूप में वर्णित करते हैं; इसमें तेज़ sync, ब्लॉक pruning और zcashd compatibility mode है। इसका नेतृत्व Zcash के सह-संस्थापक Sean Bowe और Dev Ojha करते हैं। यह [zakura-core/zakura](https://github.com/zakura-core/zakura) पर Apache 2.0 के अंतर्गत open source है।

ZecHub का [पूर्ण नोड](/zcash-tech/full-nodes) पृष्ठ इनके बीच के trade-offs को बताता है।

## पूर्ण नोड वॉलेट

zcashd में नोड के साथ एक वॉलेट शामिल था। वह वॉलेट अब नहीं है, और [Zallet](https://github.com/zcash/zallet) उसका प्रतिस्थापन है। The Zallet Book इसे "a full-node Zcash wallet written in Rust" के रूप में वर्णित करता है, जिसे "built as a replacement for the zcashd wallet" बनाया जा रहा है।

इस पर निर्भर होने से पहले सुरक्षा चेतावनी पढ़ें। Zallet बीटा में है, "has not been fully reviewed", इसमें breaking changes "may occur at any time, requiring you to delete and recreate your Zallet wallet", और हर zcashd RPC method अभी पोर्ट नहीं किया गया है।

यदि आप मौजूदा सेटअप को स्थानांतरित कर रहे हैं, तो ZecHub के पास [zcashd से Zebra और Zallet पर माइग्रेशन गाइड](/guides/migration-guide-zcashd-to-zebrad-zallet) और [Zallet त्वरित संदर्भ](/using-zcash/zallet-quick-reference-guide) है।

## लाइट वॉलेट सर्वर

अधिकांश वॉलेट नोड नहीं चलाते। वे ऐसे सर्वर से बात करते हैं जो चेन रखता है और उसका एक compact view वापस देता है।

[lightwalletd](https://github.com/zcash/lightwalletd) मूल सेवा है, जो Go में लिखी गई है और इसे "a backend service that provides a bandwidth-efficient interface to the Zcash blockchain" के रूप में वर्णित किया गया है। [Zaino](/zcash-tech/zaino) नया indexer है, जो Rust में लिखा गया है, और चेन की अपनी प्रति रखने के बजाय एक पूर्ण validator से पढ़ता है।

[Light Client Protocol](https://zcash.readthedocs.io/en/latest/lightwalletd/index.html) दस्तावेज़ प्रोटोकॉल को ही कवर करते हैं। [Lightwallet नोड](/zcash-tech/lightwallet-nodes) पृष्ठ बताता है कि ये सर्वर उपयोगकर्ता के बारे में क्या देख सकते हैं और क्या नहीं, जिसे किसी एक को चुनने से पहले समझना उचित है।

## वॉलेट बनाना

अधिकांश वॉलेट कार्य [librustzcash](https://github.com/zcash/librustzcash) के अंतर्गत Rust crates में होता है, जिन पर मोबाइल SDKs और कई desktop wallets निर्मित हैं। प्रत्येक crate का दस्तावेज़ [docs.rs](https://docs.rs) पर उपलब्ध है।

| Crate | इसका उद्देश्य |
|:--|:--|
| zcash_client_backend | "APIs for creating shielded Zcash light clients", जिसमें sync और transaction निर्माण शामिल है |
| zcash_client_sqlite | "An SQLite-based Zcash light client", ऊपर दिए गए का storage layer |
| zcash_keys | "Zcash key and address management" |
| zcash_primitives | "Rust implementations of the Zcash primitives" |
| zcash_protocol | "Zcash protocol network constants and value types" |
| orchard | "The Orchard shielded transaction protocol" |
| sapling-crypto | "Cryptographic library for Zcash Sapling" |
| pczt | "Tools for working with partially-created Zcash transactions", जो hardware और multi-device signing के लिए उपयोग होता है |
| zip321 | भुगतान अनुरोध URIs, जैसा कि ZIP 321 में निर्दिष्ट है |

मोबाइल के लिए, [Android SDK](https://github.com/zcash/zcash-android-wallet-sdk) और [iOS SDK](https://github.com/zcash/zcash-swift-wallet-sdk) इन लाइब्रेरी को wrap करते हैं। iOS repository का पहले नाम ZcashLightClientKit था, इसलिए पुराने लिंक और लेख उसी नाम का उपयोग करते हैं।

## विनिर्देशन और क्रिप्टोग्राफी

[प्रोटोकॉल विनिर्देशन](https://zips.z.cash/protocol/protocol.pdf) Zcash के काम करने के तरीके का प्रामाणिक स्रोत है, जिसमें [पते और key encodings](https://zips.z.cash/protocol/protocol.pdf#5.6%20Encodings%20of%20Addresses%20and%20Keys) शामिल हैं।

[ZIPs](https://zips.z.cash) में बदलाव प्रस्तावित और निर्दिष्ट किए जाते हैं, और index बताता है कि कौन-से drafts हैं तथा कौन-से अंतिम हैं। सहमति में बदलाव network upgrades में जारी किए जाते हैं, और ZecHub इन्हें [Network Upgrades](/start-here/network-upgrades) पृष्ठ पर ट्रैक करता है।

अंतर्निहित क्रिप्टोग्राफी के लिए [The halo2 Book](https://zcash.github.io/halo2/index.html) और [The Orchard Book](https://zcash.github.io/orchard/) पढ़ें, साथ में [halo2](https://docs.rs/halo2_proofs/latest/halo2_proofs/) और [orchard](https://docs.rs/orchard/latest/orchard/) crate docs भी देखें। [The FROST Book](https://frost.zfnd.org/) threshold signatures को कवर करती है, और ZecHub का [FROST](/zcash-tech/frost) पृष्ठ है।

## Testnet

Testnet, बिना मूल्य वाले coins वाली एक अलग चेन है, जिसे TAZ कहा जाता है। Zebra और Zakura दोनों इसके साथ चल सकते हैं, और [testnet गाइड](https://zcash.readthedocs.io/en/latest/rtd_pages/testnet_guide.html) नोड configuration को कवर करती है।

[testnet.zcashexplorer.app](https://testnet.zcashexplorer.app/) एक कार्यशील testnet block explorer है, जिसका mainnet समकक्ष [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app/) पर है।

TAZ पाना कठिन हिस्सा है, क्योंकि पुराने दस्तावेज़ों से लिंक किए गए faucets ने प्रतिक्रिया देना बंद कर दिया है। [zcashfaucet.jinolabs.xyz](https://zcashfaucet.jinolabs.xyz) समुदाय द्वारा संचालित एक faucet है, जो "अपना नोड, वॉलेट और माइनर" चलाता है, "शील्डेड z2z ड्रिप्स" देता है, और दावों को "captcha विक्रेता के बजाय ब्राउज़र प्रूफ ऑफ वर्क" के साथ सीमित करता है। यह MIT के अंतर्गत ओपन सोर्स है। यदि यह उपलब्ध न हो, तो Zcash R&D Discord में पूछें, जिसकी सलाह Zcash दस्तावेज़ स्वयं देते हैं।

## सामान्य दस्तावेज़ीकरण

[Zcash Documentation](https://zcash.readthedocs.io/en/latest/) अभी भी सबसे व्यापक एकल स्रोत है, जो प्रोटोकॉल अवधारणाओं, integration और mining को कवर करता है। इसे कुछ सावधानी से पढ़ें। यह zcashd के अनुसार versioned है, इसलिए इसके कुछ हिस्से ऐसे नोड का वर्णन करते हैं जो अब नहीं चलता, जबकि प्रोटोकॉल और light client अनुभाग उपयोगी बने हुए हैं। वहां मौजूद [The Zcash Wallet App Threat Model](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html) को उपयोगकर्ता गोपनीयता को छूने वाली किसी भी चीज़ को डिजाइन करने से पहले पढ़ना उचित है।

यदि आप सामान्य रूप से blockchains में नए हैं, तो साझा मूलभूत सिद्धांतों के लिए सामान्य अनुशंसा [Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook) है, जिसे पूरा निःशुल्क पढ़ा जा सकता है। यह shielded transactions को कवर नहीं करती।

## अन्य उपकरण जिनका डेवलपर्स ने उल्लेख किया है

[Arti](https://docs.rs/arti/latest/arti/) Tor का Rust कार्यान्वयन है, जिसका उपयोग zcash_client_backend वॉलेट ट्रैफ़िक को route करने के लिए करता है। [Tailscale](https://github.com/tailscale/tailscale) आपके स्वयं चलाए गए नोड से जुड़ने के लिए सामने आता है। [warp2](https://github.com/hhanh00/warp2), Hanh द्वारा बनाया गया तेज़ sync कार्यान्वयन है, हालांकि इसे 2023 से अपडेट नहीं किया गया है।

## समुदाय और आयोजन

[Zcash R&D Discord](https://discord.gg/6AK7keWFaK) वह स्थान है जहां प्रोटोकॉल और वॉलेट विकास पर चर्चा होती है, और [Zcash Community Forum](https://forum.zcashcommunity.com/) में लंबे प्रस्ताव और सहायता थ्रेड्स होते हैं।

हालिया hackathon परिणाम इस बात की अच्छी तस्वीर हैं कि लोग क्या बना रहे हैं: [ZecHub 2024](https://x.com/ZecHub/status/1845212469809033489), [ZecHub 2025](https://x.com/ZecHub/status/1975565960661635283) और [Zypherpunk Hackathon 2025](https://forum.zcashcommunity.com/t/zypherpunk-hackathon-winners/53985)।

## सेवानिवृत्त संसाधन

इन्हें इसलिए रखा गया है क्योंकि पुराने लेख इनसे लिंक करते हैं, और क्योंकि ये इस बात के लिए अभी भी संदर्भ हैं कि सेवानिवृत्त नोड कैसे व्यवहार करता था। यहां से शुरुआत न करें।

[The Zcashd Book](https://zcash.github.io/zcash/) और [zcashd RPC संदर्भ](https://zcash.github.io/rpc/) ऐसे software का दस्तावेज़ीकरण करते हैं जो जुलाई 2026 में [जीवन-अंत](https://zcash.github.io/zcash/user/end-of-life.html) तक पहुंच गया। [zcash/zcash](https://github.com/zcash/zcash) repository archived है।

यदि आपके पास जोड़ने के लिए कोई संसाधन है, या यहां कुछ पुराना दिखे, तो एक issue या pull request खोलें। टीमों के पास हमेशा सब कुछ अद्यतन रखने की क्षमता नहीं होती, और जो आप देखते हैं उसे चिह्नित करने से गाइड्स को दिशा देने में मदद मिलती है।

**अंतिम अद्यतन:** अगस्त 2026
