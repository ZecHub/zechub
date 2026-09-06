<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Developer_Resources.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# डेवलपर संसाधन

Zcash पर निर्माण करने के लिए आवश्यक संसाधन, एक जगह सूचीबद्ध करने के बजाय उनके उपयोग के आधार पर समूहबद्ध।

2026 में स्टैक में काफी बदलाव आया। zcashd, जिसने अपने अधिकांश इतिहास में नेटवर्क चलाया, 18 जुलाई 2026 को ब्लॉक ऊँचाई 3417100 पर अपने जीवन-चक्र के अंत पर पहुँच गया, और प्रत्येक अपरिवर्तित नोड उस ऊँचाई पर बंद हो गया तथा पुनः आरंभ होने से इनकार करेगा। zcashd के लिए लिखी गई गाइड अब शुरुआती बिंदु नहीं, बल्कि इतिहास हैं; इसलिए यह पेज उसके विकल्पों के इर्द-गिर्द व्यवस्थित है।

## एक नज़र में स्टैक

| स्तर | क्या उपयोग करें | यहाँ से शुरू करें |
|:--|:--|:--|
| पूर्ण नोड | Zebra या Zakura | [The Zebra Book](https://zebra.zfnd.org/), [zakura.com](https://zakura.com/) |
| पूर्ण नोड वॉलेट | Zallet, बीटा में | [The Zallet Book](https://zcash.github.io/zallet/) |
| लाइट वॉलेट सर्वर | Zaino या lightwalletd | [Zaino](https://github.com/zingolabs/zaino), [lightwalletd](https://github.com/zcash/lightwalletd) |
| वॉलेट लाइब्रेरी | librustzcash crates | [librustzcash](https://github.com/zcash/librustzcash) |
| मोबाइल | Android और iOS SDKs | [Android](https://github.com/zcash/zcash-android-wallet-sdk), [iOS](https://github.com/zcash/zcash-swift-wallet-sdk) |
| विनिर्देश | प्रोटोकॉल स्पेक और ZIPs | [zips.z.cash](https://zips.z.cash) |

## नोड

एक नोड कन्सेन्सस को सत्यापित करता है और चेन को रखता है। दो कार्यान्वयन सक्रिय रूप से विकसित किए जा रहे हैं।

[Zebra](/zcash-tech/zebra-full-node) Zcash Foundation का Rust में लिखा नोड है, और अधिकांश गाइड अब इसी को मानकर चलती हैं। [The Zebra Book](https://zebra.zfnd.org/) इसे इंस्टॉल करने और चलाने को कवर करती है, और [repository](https://github.com/ZcashFoundation/zebra) में विकास होता है।

[Zakura](/zcash-tech/zakura-node) एक नया नोड है, जिसे इसके लेखक "consensus-compatible Zcash full node, built for scale" बताते हैं, जिसमें तेज़ sync, ब्लॉक pruning और zcashd compatibility mode है। इसका नेतृत्व Zcash सह-संस्थापक Sean Bowe और Dev Ojha कर रहे हैं। यह Apache 2.0 के अंतर्गत [zakura-core/zakura](https://github.com/zakura-core/zakura) पर open source है।

ZecHub के [पूर्ण नोड](/zcash-tech/full-nodes) पेज में इनके बीच के trade-offs शामिल हैं।

## पूर्ण नोड वॉलेट

zcashd में नोड के साथ एक वॉलेट शामिल था। वह वॉलेट अब नहीं है, और [Zallet](https://github.com/zcash/zallet) उसका विकल्प है। The Zallet Book इसे "a full-node Zcash wallet written in Rust" बताती है, जिसे "built as a replacement for the zcashd wallet" के रूप में बनाया जा रहा है।

इस पर निर्भर होने से पहले सुरक्षा चेतावनी पढ़ें। Zallet बीटा में है, "has not been fully reviewed", इसमें breaking changes "may occur at any time, requiring you to delete and recreate your Zallet wallet", और हर zcashd RPC method को अभी port नहीं किया गया है।

यदि आप मौजूदा सेटअप को स्थानांतरित कर रहे हैं, तो ZecHub में [zcashd से Zebra और Zallet पर माइग्रेशन गाइड](/guides/migration-guide-zcashd-to-zebrad-zallet) और [Zallet त्वरित संदर्भ](/using-zcash/zallet-quick-reference-guide) उपलब्ध हैं।

## लाइट वॉलेट सर्वर

अधिकांश वॉलेट कोई नोड नहीं चलाते। वे ऐसे सर्वर से बात करते हैं जो चेन रखता है और उसका संक्षिप्त दृश्य लौटाता है।

[lightwalletd](https://github.com/zcash/lightwalletd) मूल सेवा है, जो Go में लिखी गई है और जिसे "a backend service that provides a bandwidth-efficient interface to the Zcash blockchain" कहा गया है। [Zaino](/zcash-tech/zaino) नया indexer है, जो Rust में लिखा गया है और चेन की अपनी प्रतिलिपि रखने के बजाय पूर्ण validator से पढ़ता है।

[Light Client Protocol](https://zcash.readthedocs.io/en/latest/lightwalletd/index.html) दस्तावेज़ स्वयं प्रोटोकॉल को कवर करते हैं। [लाइटवॉलेट नोड](/zcash-tech/lightwallet-nodes) पेज में बताया गया है कि ये सर्वर उपयोगकर्ता के बारे में क्या देख सकते हैं और क्या नहीं, जिसे किसी एक को चुनने से पहले समझना उपयोगी है।

## वॉलेट बनाना

अधिकांश वॉलेट कार्य [librustzcash](https://github.com/zcash/librustzcash) के अंतर्गत Rust crates में होता है, जिन पर मोबाइल SDKs और कई डेस्कटॉप वॉलेट निर्मित हैं। प्रत्येक crate का दस्तावेज़ [docs.rs](https://docs.rs) पर उपलब्ध है।

| Crate | इसका उपयोग |
|:--|:--|
| zcash_client_backend | sync और transaction construction सहित "APIs for creating shielded Zcash light clients" |
| zcash_client_sqlite | "An SQLite-based Zcash light client", ऊपर दिए गए के लिए storage layer |
| zcash_keys | "Zcash key and address management" |
| zcash_primitives | "Rust implementations of the Zcash primitives" |
| zcash_protocol | "Zcash protocol network constants and value types" |
| orchard | "The Orchard shielded transaction protocol" |
| sapling-crypto | "Cryptographic library for Zcash Sapling" |
| pczt | "Tools for working with partially-created Zcash transactions", hardware और multi-device signing के लिए प्रयुक्त |
| zip321 | ZIP 321 में निर्दिष्ट payment request URIs |

मोबाइल के लिए, [Android SDK](https://github.com/zcash/zcash-android-wallet-sdk) और [iOS SDK](https://github.com/zcash/zcash-swift-wallet-sdk) उन लाइब्रेरी को wrap करते हैं। iOS repository का पहले नाम ZcashLightClientKit था, इसलिए पुराने लिंक और लेखों में वह नाम उपयोग किया गया है।

## विनिर्देश और क्रिप्टोग्राफी

[प्रोटोकॉल विनिर्देश](https://zips.z.cash/protocol/protocol.pdf) Zcash के काम करने के तरीके का आधिकारिक स्रोत है, जिसमें [address और key encodings](https://zips.z.cash/protocol/protocol.pdf#5.6%20Encodings%20of%20Addresses%20and%20Keys) शामिल हैं।

[ZIPs](https://zips.z.cash) में बदलाव प्रस्तावित और निर्दिष्ट किए जाते हैं, और index बताता है कि कौन-से draft हैं और कौन-से final। कन्सेन्सस बदलाव network upgrades में आते हैं, और ZecHub उन्हें [नेटवर्क अपग्रेड](/start-here/network-upgrades) पेज पर ट्रैक करता है।

अंतर्निहित क्रिप्टोग्राफी के लिए, [The halo2 Book](https://zcash.github.io/halo2/index.html) और [The Orchard Book](https://zcash.github.io/orchard/) पढ़ें, साथ में [halo2](https://docs.rs/halo2_proofs/latest/halo2_proofs/) और [orchard](https://docs.rs/orchard/latest/orchard/) crate docs भी देखें। [The FROST Book](https://frost.zfnd.org/) threshold signatures को कवर करती है, और ZecHub का [FROST](/zcash-tech/frost) पेज भी है।

## Testnet

Testnet, TAZ नामक बिना मूल्य वाले coins वाली एक अलग चेन है। Zebra और Zakura दोनों इसके विरुद्ध चल सकते हैं, और [testnet गाइड](https://zcash.readthedocs.io/en/latest/rtd_pages/testnet_guide.html) नोड configuration को कवर करती है।

[testnet.zcashexplorer.app](https://testnet.zcashexplorer.app/) एक कार्यशील testnet block explorer है, जिसका mainnet समकक्ष [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app/) पर है।

TAZ प्राप्त करना कठिन हिस्सा है। सार्वजनिक faucets आते-जाते रहते हैं, और पुराने दस्तावेज़ों में लिंक किए गए faucets इस पेज के लिखे जाने के समय प्रतिक्रिया नहीं दे रहे थे। विश्वसनीय तरीका Zcash R&D Discord में पूछना है, जिसकी सलाह स्वयं Zcash दस्तावेज़ भी देते हैं।

## सामान्य दस्तावेज़

[Zcash Documentation](https://zcash.readthedocs.io/en/latest/) अब भी सबसे व्यापक एकल स्रोत है, जिसमें प्रोटोकॉल अवधारणाएँ, integration और mining शामिल हैं। इसे सावधानी से पढ़ें। इसका संस्करण zcashd के अनुरूप है, इसलिए इसके कुछ भाग ऐसे नोड का वर्णन करते हैं जो अब नहीं चलता, जबकि प्रोटोकॉल और light client अनुभाग उपयोगी बने हुए हैं। वहाँ उपलब्ध [The Zcash Wallet App Threat Model](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html) उपयोगकर्ता गोपनीयता को छूने वाली कोई भी चीज़ डिज़ाइन करने से पहले पढ़ने योग्य है।

यदि आप सामान्य रूप से blockchains में नए हैं, तो साझा मूल सिद्धांतों के लिए [Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook) सामान्य सिफारिश है और इसे पूरा निःशुल्क पढ़ा जा सकता है। इसमें shielded transactions शामिल नहीं हैं।

## अन्य टूल जिनका डेवलपर्स ने उल्लेख किया है

[Arti](https://docs.rs/arti/latest/arti/) Tor का Rust कार्यान्वयन है, जिसका उपयोग zcash_client_backend वॉलेट ट्रैफ़िक को route करने के लिए करता है। [Tailscale](https://github.com/tailscale/tailscale) स्वयं चलाए गए नोड से जुड़ने के लिए उपयोग में आता है। [warp2](https://github.com/hhanh00/warp2), Hanh द्वारा बनाया गया तेज़ sync कार्यान्वयन है, हालाँकि इसे 2023 से अपडेट नहीं किया गया है।

## समुदाय और कार्यक्रम

[Zcash R&D Discord](https://discord.gg/6AK7keWFaK) में प्रोटोकॉल और वॉलेट विकास पर चर्चा होती है, और [Zcash Community Forum](https://forum.zcashcommunity.com/) में लंबे प्रस्ताव और सहायता थ्रेड्स होते हैं।

हाल के hackathon परिणाम इस बात की अच्छी तस्वीर देते हैं कि लोग क्या बना रहे हैं: [ZecHub 2024](https://x.com/ZecHub/status/1845212469809033489), [ZecHub 2025](https://x.com/ZecHub/status/1975565960661635283) और [Zypherpunk Hackathon 2025](https://forum.zcashcommunity.com/t/zypherpunk-hackathon-winners/53985)।

## सेवानिवृत्त संसाधन

इन्हें इसलिए रखा गया है क्योंकि पुराने लेख इनसे लिंक करते हैं और क्योंकि सेवानिवृत्त नोड के व्यवहार के लिए ये अब भी संदर्भ हैं। यहाँ से शुरुआत न करें।

[The Zcashd Book](https://zcash.github.io/zcash/) और [zcashd RPC संदर्भ](https://zcash.github.io/rpc/) ऐसे सॉफ़्टवेयर का दस्तावेज़ीकरण करते हैं जो जुलाई 2026 में [जीवन-चक्र के अंत](https://zcash.github.io/zcash/user/end-of-life.html) पर पहुँच गया। [zcash/zcash](https://github.com/zcash/zcash) repository archived है।

यदि आपके पास जोड़ने के लिए कोई संसाधन है, या यहाँ कुछ पुराना दिखता है, तो issue या pull request खोलें। टीमों के पास हमेशा सब कुछ अद्यतन रखने की क्षमता नहीं होती, और जो आपको मिला उसे चिह्नित करने से गाइड्स को दिशा देने में मदद मिलती है।

**अंतिम अपडेट:** अगस्त 2026
