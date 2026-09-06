<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Developer_Resources.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# डेवलपर संसाधन

Zcash पर निर्माण करने के लिए आवश्यक संसाधन, जिन्हें एक ढेर में सूचीबद्ध करने के बजाय उनके उपयोग के अनुसार समूहित किया गया है।

2026 में स्टैक काफी बदल गया। zcashd, जो अपने अधिकांश इतिहास में नेटवर्क चलाता था, 18 जुलाई 2026 को ब्लॉक ऊँचाई 3417100 पर अपने जीवन-अंत तक पहुँच गया, और हर असंशोधित नोड उस ऊँचाई पर बंद हो गया तथा पुनः आरंभ होने से इनकार करेगा। zcashd के लिए लिखे गए गाइड अब शुरुआती बिंदु नहीं, बल्कि इतिहास हैं; इसलिए यह पृष्ठ उसके स्थान पर आए विकल्पों के आधार पर व्यवस्थित है।

## स्टैक एक नज़र में

| परत | किसका उपयोग करें | इससे शुरू करें |
|:--|:--|:--|
| पूर्ण नोड | Zebra या Zakura | [The Zebra Book](https://zebra.zfnd.org/), [zakura.com](https://zakura.com/) |
| पूर्ण नोड वॉलेट | Zallet, बीटा में | [The Zallet Book](https://zcash.github.io/zallet/) |
| लाइट वॉलेट सर्वर | Zaino या lightwalletd | [Zaino](https://github.com/zingolabs/zaino), [lightwalletd](https://github.com/zcash/lightwalletd) |
| वॉलेट लाइब्रेरी | librustzcash crates | [librustzcash](https://github.com/zcash/librustzcash) |
| मोबाइल | Android और iOS SDKs | [Android](https://github.com/zcash/zcash-android-wallet-sdk), [iOS](https://github.com/zcash/zcash-swift-wallet-sdk) |
| विनिर्देशन | प्रोटोकॉल विनिर्देशन और ZIPs | [zips.z.cash](https://zips.z.cash) |

## नोड

एक नोड consensus का सत्यापन करता है और chain को रखता है। दो कार्यान्वयन सक्रिय रूप से विकसित किए जा रहे हैं।

[Zebra](/zcash-tech/zebra-full-node) Zcash Foundation का Rust में लिखा गया नोड है, और अधिकांश गाइड अब इसी को मानकर चलते हैं। [The Zebra Book](https://zebra.zfnd.org/) इसे इंस्टॉल करने और चलाने की जानकारी देता है, और [repository](https://github.com/ZcashFoundation/zebra) वह स्थान है जहाँ विकास होता है।

[Zakura](/zcash-tech/zakura-node) एक नया नोड है, जिसे इसके लेखक "consensus-compatible Zcash full node, built for scale" के रूप में वर्णित करते हैं; इसमें तेज़ sync, block pruning और zcashd compatibility mode है। इसका नेतृत्व Zcash के सह-संस्थापक Sean Bowe और Dev Ojha करते हैं। यह [zakura-core/zakura](https://github.com/zakura-core/zakura) पर Apache 2.0 के तहत open source है।

ZecHub का एक [पूर्ण नोड](/zcash-tech/full-nodes) पृष्ठ है, जो इनके बीच के trade-offs को समझाता है।

## पूर्ण नोड वॉलेट

zcashd में नोड के साथ एक वॉलेट शामिल था। वह वॉलेट अब नहीं है, और [Zallet](https://github.com/zcash/zallet) उसका विकल्प है। The Zallet Book इसे "a full-node Zcash wallet written in Rust" के रूप में वर्णित करता है, जो "built as a replacement for the zcashd wallet" है।

इस पर निर्भर होने से पहले सुरक्षा चेतावनी पढ़ें। Zallet बीटा में है, "has not been fully reviewed", इसमें breaking changes "may occur at any time, requiring you to delete and recreate your Zallet wallet", और अभी हर zcashd RPC method port नहीं किया गया है।

यदि आप किसी मौजूदा setup को स्थानांतरित कर रहे हैं, तो ZecHub में [zcashd से Zebra और Zallet पर migration guide](/guides/migration-guide-zcashd-to-zebrad-zallet) और [Zallet quick reference](/using-zcash/zallet-quick-reference-guide) उपलब्ध हैं।

## लाइट वॉलेट सर्वर

अधिकांश वॉलेट एक नोड नहीं चलाते। वे उस सर्वर से बात करते हैं जो chain रखता है और उसका एक compact view वापस देता है।

[lightwalletd](https://github.com/zcash/lightwalletd) मूल सेवा है, जो Go में लिखी गई है और इसे "a backend service that provides a bandwidth-efficient interface to the Zcash blockchain" के रूप में वर्णित किया गया है। [Zaino](/zcash-tech/zaino) नया indexer है, जो Rust में लिखा गया है और chain की अपनी प्रतिलिपि रखने के बजाय एक पूर्ण validator से पढ़ता है।

[Light Client Protocol](https://zcash.readthedocs.io/en/latest/lightwalletd/index.html) दस्तावेज़ प्रोटोकॉल को स्वयं कवर करते हैं। [Lightwallet Nodes](/zcash-tech/lightwallet-nodes) पृष्ठ यह बताता है कि ये सर्वर उपयोगकर्ता के बारे में क्या देख सकते हैं और क्या नहीं, जिसे कोई चुनने से पहले समझना उपयोगी है।

## वॉलेट बनाना

अधिकांश वॉलेट कार्य [librustzcash](https://github.com/zcash/librustzcash) के अंतर्गत Rust crates में होता है, जिन पर मोबाइल SDKs और कई desktop वॉलेट बने हैं। प्रत्येक crate का दस्तावेज़ [docs.rs](https://docs.rs) पर उपलब्ध है।

| Crate | इसका उपयोग |
|:--|:--|
| zcash_client_backend | "shielded Zcash light clients बनाने के लिए APIs", जिसमें sync और transaction निर्माण शामिल है |
| zcash_client_sqlite | "एक SQLite-based Zcash light client", ऊपर दिए गए का storage layer |
| zcash_keys | "Zcash key और address प्रबंधन" |
| zcash_primitives | "Zcash primitives के Rust implementations" |
| zcash_protocol | "Zcash protocol network constants और value types" |
| orchard | "Orchard shielded transaction protocol" |
| sapling-crypto | "Zcash Sapling के लिए cryptographic library" |
| pczt | "आंशिक रूप से निर्मित Zcash transactions के साथ काम करने के उपकरण", hardware और multi-device signing के लिए उपयोग किया जाता है |
| zip321 | भुगतान अनुरोध URIs, जैसा कि ZIP 321 में निर्दिष्ट है |

मोबाइल के लिए, [Android SDK](https://github.com/zcash/zcash-android-wallet-sdk) और [iOS SDK](https://github.com/zcash/zcash-swift-wallet-sdk) इन लाइब्रेरीज़ को wrap करते हैं। iOS repository को पहले ZcashLightClientKit कहा जाता था, इसलिए पुराने links और articles में वही नाम उपयोग होता है।

## विनिर्देशन और cryptography

[protocol specification](https://zips.z.cash/protocol/protocol.pdf) यह निर्धारित करने वाला स्रोत है कि Zcash कैसे काम करता है, जिसमें [address और key encodings](https://zips.z.cash/protocol/protocol.pdf#5.6%20Encodings%20of%20Addresses%20and%20Keys) शामिल हैं।

[ZIPs](https://zips.z.cash) में बदलाव प्रस्तावित और निर्दिष्ट किए जाते हैं, और index दर्शाता है कि कौन-से draft हैं तथा कौन-से final। Consensus बदलाव network upgrades में जारी होते हैं, और ZecHub इन्हें [Network Upgrades](/start-here/network-upgrades) पृष्ठ पर ट्रैक करता है।

अंतर्निहित cryptography के लिए [The halo2 Book](https://zcash.github.io/halo2/index.html) और [The Orchard Book](https://zcash.github.io/orchard/) पढ़ें, साथ में [halo2](https://docs.rs/halo2_proofs/latest/halo2_proofs/) और [orchard](https://docs.rs/orchard/latest/orchard/) crate docs भी देखें। [The FROST Book](https://frost.zfnd.org/) threshold signatures को कवर करती है, और ZecHub का [FROST](/zcash-tech/frost) पृष्ठ भी है।

## Testnet

Testnet एक अलग chain है जिसमें मूल्यहीन coins होते हैं, जिन्हें TAZ कहा जाता है। Zebra और Zakura दोनों इसके विरुद्ध चल सकते हैं, और [testnet guide](https://zcash.readthedocs.io/en/latest/rtd_pages/testnet_guide.html) नोड configuration को कवर करता है।

[testnet.zcashexplorer.app](https://testnet.zcashexplorer.app/) एक कार्यशील testnet block explorer है, जिसका mainnet समकक्ष [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app/) पर है।

TAZ प्राप्त करना कठिन हिस्सा है। सार्वजनिक faucets आते-जाते रहते हैं, और इस पृष्ठ के लिखे जाने पर पुराने दस्तावेज़ों में linked faucets जवाब नहीं दे रहे थे। विश्वसनीय तरीका Zcash R&D Discord में पूछना है, जिसकी सलाह स्वयं Zcash दस्तावेज़ भी देता है।

## सामान्य दस्तावेज़ीकरण

[Zcash Documentation](https://zcash.readthedocs.io/en/latest/) अभी भी सबसे व्यापक एकल स्रोत है, जिसमें protocol concepts, integration और mining शामिल हैं। इसे कुछ सावधानी से पढ़ें। इसका version zcashd के अनुसार है, इसलिए इसके कुछ भाग ऐसे नोड का वर्णन करते हैं जो अब नहीं चलता, जबकि protocol और light client अनुभाग उपयोगी बने हुए हैं। वहाँ उपलब्ध [The Zcash Wallet App Threat Model](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html) को उपयोगकर्ता की privacy को छूने वाली कोई भी चीज़ डिजाइन करने से पहले पढ़ना चाहिए।

यदि आप सामान्य रूप से blockchains में नए हैं, तो साझा मूल सिद्धांतों के लिए [Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook) सामान्य अनुशंसा है और इसे पूरा निःशुल्क पढ़ा जा सकता है। इसमें shielded transactions शामिल नहीं हैं।

## अन्य उपकरण जिनका डेवलपर्स ने उल्लेख किया है

[Arti](https://docs.rs/arti/latest/arti/) Tor का Rust implementation है, जिसका उपयोग zcash_client_backend वॉलेट traffic को route करने के लिए करता है। अपने द्वारा चलाए जा रहे नोड से जुड़ने के लिए [Tailscale](https://github.com/tailscale/tailscale) का उल्लेख आता है। [warp2](https://github.com/hhanh00/warp2) Hanh द्वारा बनाया गया तेज़ sync implementation है, हालाँकि इसे 2023 से अपडेट नहीं किया गया है।

## समुदाय और कार्यक्रम

[Zcash R&D Discord](https://discord.gg/6AK7keWFaK) में protocol और wallet development पर चर्चा होती है, और [Zcash Community Forum](https://forum.zcashcommunity.com/) में लंबे proposals तथा support threads होते हैं।

हालिया hackathon परिणाम इस बात की अच्छी तस्वीर देते हैं कि लोग क्या बना रहे हैं: [ZecHub 2024](https://x.com/ZecHub/status/1845212469809033489), [ZecHub 2025](https://x.com/ZecHub/status/1975565960661635283) और [Zypherpunk Hackathon 2025](https://forum.zcashcommunity.com/t/zypherpunk-hackathon-winners/53985)।

## सेवानिवृत्त संसाधन

इन्हें इसलिए रखा गया है क्योंकि पुराने articles इनसे link करते हैं, और क्योंकि ये अभी भी बताते हैं कि सेवानिवृत्त नोड कैसे व्यवहार करता था। यहाँ से शुरुआत न करें।

[The Zcashd Book](https://zcash.github.io/zcash/) और [zcashd RPC reference](https://zcash.github.io/rpc/) उस software का दस्तावेज़ीकरण करते हैं जो जुलाई 2026 में [end of life](https://zcash.github.io/zcash/user/end-of-life.html) तक पहुँच गया। [zcash/zcash](https://github.com/zcash/zcash) repository archived है।

यदि आपके पास जोड़ने के लिए कोई संसाधन है, या यहाँ कुछ पुराना दिखे, तो issue या pull request खोलें। Teams के पास हर चीज़ को अद्यतन रखने की क्षमता हमेशा नहीं होती, और जो आपको मिला उसकी सूचना देना guides को सही दिशा में ले जाने में मदद करता है।

**अंतिम अद्यतन:** अगस्त 2026
