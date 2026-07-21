#  <img src="https://github.com/user-attachments/assets/e38b13a9-d410-426a-a1e6-2dde105d56c4" alt="Alt Text" width="50"/> ZingoLabs

[अधिकारिक वेबसाइट](https://zingolabs.org/) - [Github](https://github.com/zingolabs) - [X/Twitter](https://x.com/ZingoLabs) - [इंस्टाग्राम](https://www.instagram.com/zingolabesp/)

ZingoLabs एक दृष्टिकोण की टीम है जो मनुष्य के अनुभव को सुधारने पर काम करती है। हमें लगता है कि प्रौद्योगिकी मनुष्यता के लिए फायदेमंद होनी चाहिए और हम सहमति के बातचीत के माध्यम से विकसित होते हैं। हम ऐसे प्रतिमानों का पता लगा रहे हैं जो इसकी अनुमति देते हैं।

Zingo Lab Cyan एक Shielded DAO के रूप में काम करता है। हम अपनी धनराशि एक कोष में संग्रहित करते हैं, जहाँ प्रत्येक सदस्य के पास एक दृश्य कुंजी होती है। जब सदस्य एक प्रस्ताव के पक्ष में मतदान करते हैं, तो कोष से धनराशि खर्च की जाती है।

## परियोजनाएँ

### Zingo! वॉलेट ([Github](https://github.com/zingolabs/zingo-mobile))
Zingo वॉलेट एक पूर्णतया सुविधाजनक Zcash वॉलेट है, जो उपयोगकर्ता के लिए आसानी से उपयोग करने योग्य है, भले ही इसमें अधिक जटिल उपयोगकर्ताओं के लिए कुछ उन्नत सुविधाएँ शामिल हैं। यह प्रकाशस्पष्ट, Sapling और Orchard पूल का समर्थन करता है, आवर्ती भुगतानों के लिए एक पता किताब है और विभिन्न भाषाओं में उपलब्ध है। यह पहला वॉलेट था जो Orchard के समर्थन के लिए बनाया गया और NU5 फॉर्मेट की क्रियान्वित करता है।

Zingo! के मुख्य विशेषताओं में से एक इसकी क्षमता है Memo field का उपयोग अपने लेन-देन के बारे में उपयोगी जानकारी प्रदान करने के लिए।

Zingo! मोबाइल डिवाइस और PCs के लिए उपलब्ध है। आप सभी डाउनलोड [यहाँ](https://zingolabs.org/) पा सकते हैं।

### Zingolib ([Github](https://github.com/zingolabs/zingolib))
एक API और टेस्ट-अप के रूप में, जो zcash की क्रियाओं का समर्थन अनुप्रयोगों के लिए प्रदान करता है। Zingolib zingo-mobile के लिए एक पुस्तकालय और एक समावेशी cli अनुप्रयोग प्रदान करता है, जो lightwalletd के माध्यम से zcashd के साथ बातचीत करता है, जिसे Zingo-cli कहा जाता है, एक कमांड लाइन lightwalletd-प्रॉक्सी क्लाइंट।

### Zaino Indexer ([Github](https://github.com/zingolabs/zaino))
Zaino एक Indexer है, जो Rust में Zingo टीम द्वारा विकसित किया गया है, जो lightwalletd के स्थान पर लगे रहता है और zcashd deprecation प्रकल्प की ओर बढ़ाता है।

Zaino दोनों light clients, जैसे कि वॉलेट और अनुप्रयोग जो पूर्ण blockchain इतिहास की आवश्यकता नहीं होती, और full clients या वॉलेट के लिए आवश्यक सुविधाओं को प्रदान करता है। इसके अलावा, block explorers के लिए भी समर्थन है, जो फाइनलाइज़ड blockchain और non-finalized best chain और mempool के उपयोगकर्ता द्वारा प्रबंधित Zebra या Zcashd full validator की ओर से एक्सेस के लिए अनुमति देता है।

###  ZLN (zcash-local-net) ([Github](https://github.com/zingolabs/zcash-local-net))
एक उपयोगिताओं की सीरीज़, जो Zcash प्रक्रियाओं के शुरूआत और प्रबंधन के लिए है। इसका उपयोग विकास में निम्नलिखित के समाकलन परीक्षण के लिए किया जाता है:
- lightclients
- indexers
- validators

इसका उद्देश्य core nodes (validators) जैसे zcash और zebra, indexers जैसे lightwallet और zaino, कम से कम zingo-cli के रूप में light client wallet के लिए बहुत अनुकूल और मजबूत परीक्षण वातावरण प्रदान करना है।

इस रिपोज़िटरी के डिज़ाइन के अनुसार, Zcashd और Zebrad जैसे विभिन्न validators (जैसे Zcashd और Zebrad) और indexers (जैसे Lightwalletd और Zaino) की कार्यक्षमता की तुलना करने के लिए उपयोगिताओं की प्रदान करता है, जिससे Zcashd deprecation प्रक्रिया के दौरान माइग्रेशन सुगम हो सके।

Zcash-local-net के अलावा, zcash-zocal-net के उपयोगकर्ता को Zcash chain data (मुख्य नेटवर्क, परीक्षण नेटवर्क और regtest) के शुरूआत, कैशिंग और लोड के उपकरण प्रदान करता है। zcash-zocal-net में Lightwalletd और Zaino की क्षमताओं की तुलना करने के लिए विभिन्न परीक्षणों की श्रृंखला शामिल है, Lightwallet RPC सेवाओं के सभी तत्वों के लिए। यह परीक्षण Zaino से सीधे (देखें [https://github.com/zingolabs/zaino/blob/dev/docs/testing.md](https://github.com/zingolabs/zaino/blob/dev/docs/testing.md)) काम कर सकता है, Lightwallet RPC सेवाओं की जाँच के लिए Zaino में मेजबान।
