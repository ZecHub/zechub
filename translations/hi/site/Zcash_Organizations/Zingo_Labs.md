#  <img src="/content-images/e38b13a9-d410-426a-a1e6-2dde105d56c4-6b8154e5ae.webp" alt="Alt Text" width="50"/> ZingoLabs

[आधिकारिक वेबसाइट](https://zingolabs.org/) - [GitHub](https://github.com/zingolabs) - [X/Twitter](https://x.com/ZingoLabs) - [Instagram](https://www.instagram.com/zingolabesp/)

ZingoLabs दूरदर्शी लोगों की एक टीम है जो मानवीय अनुभव को बेहतर बनाने के लिए समर्पित है। हमारा मानना है कि प्रौद्योगिकी को मानवता के लिए लाभकारी होना चाहिए और हम सहमति-आधारित अंतःक्रियाओं के माध्यम से फलते-फूलते हैं। हम उन पैटर्नों की पहचान कर रहे हैं जो इसे संभव बनाते हैं।

Zingo Lab Cyan एक Shielded DAO के रूप में कार्य करता है। हम अपनी निधियाँ एक ट्रेजरी में रखते हैं, जहाँ प्रत्येक सदस्य के पास एक view key होता है। जब सदस्य किसी प्रस्ताव के पक्ष में मतदान करते हैं, तो ट्रेजरी से निधियाँ खर्च की जाती हैं।

## परियोजनाएँ

### Zingo! Wallet ([GitHub](https://github.com/zingolabs/zingo-mobile))
Zingo Wallet एक पूर्ण सुविधाओं वाला Zcash wallet है, जो उपयोगकर्ता-अनुकूलता के लिए डिज़ाइन किया गया है, हालाँकि इसमें अधिक उन्नत उपयोगकर्ताओं के लिए कुछ उन्नत सुविधाएँ भी शामिल हैं। यह transparent, Sapling और Ironwood pools का समर्थन करता है, इसमें आवर्ती भुगतानों के लिए एक address book है और यह विभिन्न भाषाओं में उपलब्ध है। यह Orchard का समर्थन करने वाला और NU5 formats लागू करने वाला पहला wallet था।

Zingo! की मुख्य सुविधाओं में से एक, आपके लेन-देनों के बारे में उपयोगी जानकारी देने के लिए Memo field का उपयोग करने की इसकी क्षमता है।

Zingo! मोबाइल उपकरणों और PCs के लिए उपलब्ध है। आपको सभी डाउनलोड [यहाँ](https://zingolabs.org/) मिलेंगे

### Zingolib ([GitHub](https://github.com/zingolabs/zingolib))
एक API और test-app जो app उपयोग के लिए zcash functionality उपलब्ध कराता है। Zingolib zingo-mobile के लिए एक library के साथ-साथ zingo-cli नामक शामिल cli application भी प्रदान करता है, जो एक command-line light wallet है और [Zaino](/zcash-tech/zaino) जैसे chain indexer से संवाद करता है।

### Zaino Indexer ([GitHub](https://github.com/zingolabs/zaino))
Zaino, Zcash blockchain के लिए एक Rust indexer है, जिसे Zingo टीम ने विकसित किया है। यह [Z3 stack](/zcash-tech/z3-stack) में indexer है: यह [Zebra](/zcash-tech/zebra-full-node) validator से chain data को index करता है और wallets, explorers तथा अन्य clients को सेवा देता है। यह lightwalletd का उत्तराधिकारी मार्ग है।

Zaino light clients, जैसे wallets और उन applications के लिए जो पूर्ण blockchain history की आवश्यकता नहीं रखते, तथा full clients या wallets दोनों के लिए आवश्यक सुविधाएँ प्रदान करता है। यह block explorers का भी समर्थन करता है, जिससे Zebra full validator द्वारा प्रबंधित finalized blockchain और non-finalized best chain व mempool, दोनों तक पहुँच मिलती है।

`zcashd` ने 18 जुलाई 2026 को block 3,417,100 पर अपना End-of-Support halt प्राप्त किया और Ironwood (NU6.3) का समर्थन नहीं करता। Zaino एक Zebra validator को पढ़ता है।

###  ZLN (zcash-local-net) ([GitHub](https://github.com/zingolabs/infrastructure/tree/dev/zcash_local_net))

उपयोगिताओं का एक समूह जो Zcash processes को शुरू और प्रबंधित करता है। इसका उपयोग निम्न के विकास में integration testing के लिए किया जाता है:
- लाइट क्लाइंट्स
- indexers
- validators

इसका लक्ष्य Zebra जैसे कोर नोडों (validators), Zaino जैसे indexers, और zingo-cli जैसे light client wallets के लिए अत्यधिक अनुकूलनीय और मजबूत परीक्षण वातावरण प्रदान करना है।

यह जिस default stack को शुरू करता है, वह Zebrad, zainod, और zcash-devtool है। legacy `zcashd` और lightwalletd processes एक असमर्थित `legacy-stack` feature के पीछे हैं और इन्हें हटाने की योजना है।

Zcash chain data को शुरू करने, cache करने और load करने के उपकरण प्रदान करने के अतिरिक्त (mainnet, testnet, और regtest के लिए), zcash-local-net का उपयोग Zaino के test suite से Zaino में होस्ट की गई Lightwallet RPC services का आकलन करने के लिए किया जाता है ([Zaino testing docs](https://github.com/zingolabs/zaino/blob/dev/docs/testing.md) देखें)।
