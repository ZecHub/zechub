<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Developer_Resources.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# डेवलपर संसाधन

Zcash पर निर्माण करने के लिए जिन संसाधनों की आपको आवश्यकता है, उन्हें इस आधार पर समूहित किया गया है कि प्रत्येक किस काम के लिए है, न कि सबको एक ही ढेर में सूचीबद्ध किया गया है।

2026 में स्टैक में बहुत बड़ा बदलाव आया। `zcashd`, जिसने अपने इतिहास के अधिकांश समय तक नेटवर्क चलाया, 18 July 2026 को block height 3417100 पर अपने end of life पर पहुंच गया, और हर बिना संशोधित नोड उसी height पर बंद हो गया और दोबारा शुरू होने से इंकार करेगा। `zcashd` के लिए लिखी गई गाइडें अब शुरुआती बिंदु नहीं बल्कि इतिहास हैं, इसलिए यह पेज इस आधार पर व्यवस्थित है कि उसकी जगह किसने ली।

## एक नज़र में स्टैक

| Layer | क्या उपयोग करें | यहां से शुरू करें |
|:--|:--|:--|
| Full node | Zebra या Zakura | [The Zebra Book](https://zebra.zfnd.org/), [zakura.com](https://zakura.com/) |
| Full node wallet | Zallet, beta में | [The Zallet Book](https://zcash.github.io/zallet/) |
| Light wallet server | Zaino या lightwalletd | [Zaino](https://github.com/zingolabs/zaino), [lightwalletd](https://github.com/zcash/lightwalletd) |
| Wallet libraries | librustzcash crates | [librustzcash](https://github.com/zcash/librustzcash) |
| Mobile | Android और iOS SDKs | [Android](https://github.com/zcash/zcash-android-wallet-sdk), [iOS](https://github.com/zcash/zcash-swift-wallet-sdk) |
| Specification | Protocol spec और ZIPs | [zips.z.cash](https://zips.z.cash) |

## नोड

एक नोड consensus को validate करता है और chain को रखता है। इसके दो सक्रिय रूप से विकसित implementation हैं।

[Zebra](/zcash-tech/zebra-full-node) Zcash Foundation का नोड है, जो Rust में लिखा गया है, और अब अधिकांश गाइडें इसी को मानकर चलती हैं। [The Zebra Book](https://zebra.zfnd.org/) में इसे install और run करने की जानकारी है, और [repository](https://github.com/ZcashFoundation/zebra) वह जगह है जहां development होता है।

[Zakura](/zcash-tech/zakura-node) एक नया नोड है, जिसे इसके लेखक "consensus-compatible Zcash full node, built for scale" के रूप में वर्णित करते हैं, जिसमें तेज sync, block pruning और `zcashd` compatibility mode है। इसका नेतृत्व Sean Bowe, जो Zcash के सह-संस्थापक हैं, और Dev Ojha करते हैं। यह Apache 2.0 के अंतर्गत [zakura-core/zakura](https://github.com/zakura-core/zakura) पर open source है।

ZecHub के पास एक [Full Nodes](/zcash-tech/full-nodes) पेज है जो इनके बीच के trade-offs को कवर करता है।

## फुल नोड wallet

`zcashd` नोड के साथ एक wallet bundled देता था। वह wallet अब नहीं है, और [Zallet](https://github.com/zcash/zallet) उसका replacement है। The Zallet Book इसे "a full-node Zcash wallet written in Rust" के रूप में वर्णित करती है, जो "built as a replacement for the zcashd wallet" है।

इस पर निर्भर होने से पहले security warning पढ़ें। Zallet beta में है, "has not been fully reviewed", breaking changes "may occur at any time, requiring you to delete and recreate your Zallet wallet", और अभी तक हर `zcashd` RPC method को port नहीं किया गया है।

यदि आप किसी मौजूदा setup को migrate कर रहे हैं, तो ZecHub के पास [zcashd से Zebra और Zallet पर migration guide](/guides/migration-guide-zcashd-to-zebrad-zallet) और एक [Zallet quick reference](/using-zcash/zallet-quick-reference-guide) है।

## Light wallet server

अधिकांश wallet एक नोड नहीं चलाते। वे एक server से बात करते हैं जो chain को रखता है और उसका compact view वापस देता है।

[lightwalletd](https://github.com/zcash/lightwalletd) मूल service है, जो Go में लिखी गई है, और इसे "a backend service that provides a bandwidth-efficient interface to the Zcash blockchain" के रूप में वर्णित किया गया है। [Zaino](/zcash-tech/zaino) नया indexer है, जो Rust में लिखा गया है, और chain की अपनी copy रखने के बजाय full validator से पढ़ता है।

[Light Client Protocol](https://zcash.readthedocs.io/en/latest/lightwalletd/index.html) का documentation स्वयं protocol को कवर करता है। [Lightwallet Nodes](/zcash-tech/lightwallet-nodes) पेज यह बताता है कि ये server किसी user के बारे में क्या देख सकते हैं और क्या नहीं, जिसे चुनने से पहले समझना महत्वपूर्ण है।

## Wallet बनाना

अधिकांश wallet कार्य [librustzcash](https://github.com/zcash/librustzcash) के अंतर्गत Rust crates में होता है, जिन पर mobile SDKs और कई desktop wallets निर्मित हैं। प्रत्येक crate का documentation [docs.rs](https://docs.rs) पर उपलब्ध है।

| Crate | इसका उपयोग किस लिए है |
|:--|:--|
| zcash_client_backend | "APIs for creating shielded Zcash light clients", जिसमें sync और transaction construction शामिल हैं |
| zcash_client_sqlite | "An SQLite-based Zcash light client", ऊपर वाले के लिए storage layer |
| zcash_keys | "Zcash key and address management" |
| zcash_primitives | "Rust implementations of the Zcash primitives" |
| zcash_protocol | "Zcash protocol network constants and value types" |
| orchard | "The Orchard shielded transaction protocol" |
| sapling-crypto | "Cryptographic library for Zcash Sapling" |
| pczt | "Tools for working with partially-created Zcash transactions", hardware और multi-device signing के लिए उपयोग किया जाता है |
| zip321 | Payment request URIs, जैसा कि ZIP 321 में निर्दिष्ट है |

Mobile के लिए, [Android SDK](https://github.com/zcash/zcash-android-wallet-sdk) और [iOS SDK](https://github.com/zcash/zcash-swift-wallet-sdk) इन libraries को wrap करते हैं। iOS repository का पहले नाम ZcashLightClientKit था, इसलिए पुराने links और articles में यही नाम उपयोग होता है।

## Specification और cryptography

[protocol specification](https://zips.z.cash/protocol/protocol.pdf) इस बात का प्रामाणिक स्रोत है कि Zcash कैसे काम करता है, जिसमें [address and key encodings](https://zips.z.cash/protocol/protocol.pdf#5.6%20Encodings%20of%20Addresses%20and%20Keys) भी शामिल हैं।

[ZIPs](https://zips.z.cash) वह स्थान है जहां बदलाव प्रस्तावित और निर्दिष्ट किए जाते हैं, और index यह दिखाता है कि कौन से draft हैं और कौन से final। Consensus changes network upgrades में जारी होते हैं, और ZecHub उन्हें [Network Upgrades](/start-here/network-upgrades) पेज पर track करता है।

अंतर्निहित cryptography के लिए [The halo2 Book](https://zcash.github.io/halo2/index.html) और [The Orchard Book](https://zcash.github.io/orchard/) पढ़ें, साथ में [halo2](https://docs.rs/halo2_proofs/latest/halo2_proofs/) और [orchard](https://docs.rs/orchard/latest/orchard/) crate docs भी देखें। [The FROST Book](https://frost.zfnd.org/) threshold signatures को कवर करती है, और ZecHub के पास एक [FROST](/zcash-tech/frost) पेज है।

## Testnet

Testnet एक अलग chain है जिसमें बिना मूल्य के coins होते हैं, जिन्हें TAZ कहा जाता है। Zebra और Zakura दोनों इसके विरुद्ध चल सकते हैं, और [testnet guide](https://zcash.readthedocs.io/en/latest/rtd_pages/testnet_guide.html) नोड configuration को कवर करती है।

[testnet.zcashexplorer.app](https://testnet.zcashexplorer.app/) एक काम करने वाला testnet block explorer है, जिसका mainnet counterpart [mainnet.zcashexplorer.app](https://mainnet.zcashexplorer.app/) पर है।

TAZ प्राप्त करना कठिन हिस्सा है। Public faucets आते-जाते रहते हैं, और पुराने documentation से जुड़े हुए faucets इस पेज के लिखे जाने के समय जवाब नहीं दे रहे थे। भरोसेमंद रास्ता Zcash R&D Discord में पूछना है, और Zcash documentation स्वयं भी यही सुझाव देता है।

## सामान्य documentation

[Zcash Documentation](https://zcash.readthedocs.io/en/latest/) अभी भी सबसे व्यापक एकल स्रोत है, जिसमें protocol concepts, integration और mining शामिल हैं। इसे थोड़ी सावधानी से पढ़ें। यह `zcashd` के अनुसार versioned है, इसलिए इसके कुछ हिस्से ऐसे नोड का वर्णन करते हैं जो अब नहीं चलता, जबकि protocol और light client वाले sections अब भी उपयोगी हैं। वहां मौजूद [The Zcash Wallet App Threat Model](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html) को user privacy से संबंधित कुछ भी design करने से पहले पढ़ना उचित है।

यदि आप सामान्य रूप से blockchains में नए हैं, तो साझा fundamentals के लिए [Mastering Bitcoin](https://github.com/bitcoinbook/bitcoinbook) सामान्य recommendation है, और इसे पूरा मुफ्त में पढ़ा जा सकता है। यह shielded transactions को कवर नहीं करती।

## अन्य tools जिनका डेवलपर्स ने उल्लेख किया है

[Arti](https://docs.rs/arti/latest/arti/) Tor का Rust implementation है, जिसका उपयोग zcash_client_backend wallet traffic को route करने के लिए करता है। [Tailscale](https://github.com/tailscale/tailscale) का उल्लेख तब आता है जब आप अपने खुद के चलाए गए नोड से connect करना चाहते हैं। [warp2](https://github.com/hhanh00/warp2) Hanh द्वारा बनाया गया एक तेज sync implementation है, हालांकि इसे 2023 के बाद update नहीं किया गया है।

## Community और events

[Zcash R&D Discord](https://discord.gg/6AK7keWFaK) वह जगह है जहां protocol और wallet development पर चर्चा होती है, और [Zcash Community Forum](https://forum.zcashcommunity.com/) पर लंबे proposals और support threads मिलते हैं।

हाल के hackathon परिणाम इस बात की अच्छी तस्वीर देते हैं कि लोग क्या बना रहे हैं: [ZecHub 2024](https://x.com/ZecHub/status/1845212469809033489), [ZecHub 2025](https://x.com/ZecHub/status/1975565960661635283) और [Zypherpunk Hackathon 2025](https://forum.zcashcommunity.com/t/zypherpunk-hackathon-winners/53985)।

## सेवानिवृत्त संसाधन

इन्हें इसलिए रखा गया है क्योंकि पुराने articles इनसे link करते हैं, और इसलिए भी क्योंकि ये अब भी इस बात का reference हैं कि सेवानिवृत्त नोड कैसे व्यवहार करता था। यहां से शुरुआत न करें।

[The Zcashd Book](https://zcash.github.io/zcash/) और [zcashd RPC reference](https://zcash.github.io/rpc/) ऐसे software का documentation हैं जो July 2026 में [end of life](https://zcash.github.io/zcash/user/end-of-life.html) पर पहुंच गया। [zcash/zcash](https://github.com/zcash/zcash) repository archived है।

यदि आपके पास जोड़ने के लिए कोई resource है, या आपको यहां कुछ पुराना दिखे, तो एक issue या pull request खोलें। Teams के पास हमेशा सब कुछ current रखने की क्षमता नहीं होती, और आपने किस चीज़ का सामना किया यह बताने से guides को सही दिशा देने में मदद मिलती है।

**अंतिम अद्यतन:** August 2026
