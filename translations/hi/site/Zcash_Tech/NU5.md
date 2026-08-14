---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU5.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="पृष्ठ संपादित करें"/>
</a>

# NU5

> NU5, Zcash mainnet पर ब्लॉक 1,687,104 (31 मई, 2022 UTC) पर लाइव हुआ।

आप क्या समझेंगे: NU5 ने Zcash को एक नया shielded pool कैसे दिया जिसे trusted setup की आवश्यकता नहीं है, साथ ही एक ऐसा एकल address type भी दिया जो अलग-अलग pools के बीच काम करता है।

NU5 (Network Upgrade 5) छठा Zcash [network upgrade](../start-here/network-upgrades) है, जिसे [ZIP 252](https://zips.z.cash/zip-0252) द्वारा लागू किया गया। यह एक प्रमुख cryptographic upgrade है। इसने Orchard shielded payment protocol को पेश किया, जो Halo 2 proving system पर आधारित है, साथ ही unified addresses और नया version 5 transaction format भी लाया। NU5, Electric Coin Company की zcashd v5.0.0 release के साथ जारी हुआ।

यह क्यों महत्वपूर्ण है। कोई shielded pool उतना ही भरोसेमंद होता है जितना भरोसेमंद उसका setup होता है। Zcash के पहले दो shielded pools, Sprout और Sapling, दोनों को अपने secret parameters बनाने के लिए एक बार होने वाली trusted setup ceremony की आवश्यकता थी। यदि वे parameters कभी नष्ट करने के बजाय सुरक्षित रख लिए गए होते, तो कोई बिना किसी के जाने नकली ZEC बना सकता था। NU5 का Orchard pool इस चिंता को समाप्त करता है क्योंकि यह Halo 2 proving system का उपयोग करता है, जिसे ऐसी किसी ceremony की आवश्यकता नहीं होती।

## Trusted setup

Orchard, Zcash का सबसे नया shielded protocol है, जिसे [ZIP 224](https://zips.z.cash/zip-0224) में परिभाषित किया गया है। यह Halo 2 proving system पर आधारित है, जो Pallas और Vesta curve cycle पर PLONKish arithmetization नामक तकनीक का उपयोग करता है। इसका व्यावहारिक लाभ सरल है: Halo 2 को न trusted setup की आवश्यकता है और न ही structured reference string की, इसलिए कोई ऐसा secret parameter नहीं होता जिसका कभी दुरुपयोग किया जा सके।

Sprout और Sapling दोनों trusted setup पर निर्भर थे। लोगों के एक समूह ने प्रत्येक pool के parameters बनाने के लिए एक ceremony चलाई, और सभी को इस बात पर भरोसा करना पड़ता था कि उनमें से कम-से-कम एक व्यक्ति ने secret के अपने हिस्से को नष्ट कर दिया हो। Orchard इस धारणा को हटा देता है। NU5 के बाद भी पुराने pools मौजूद रहते हैं, इसलिए no-setup guarantee उन funds पर लागू होती है जिन्हें आप Orchard pool में रखते हैं।

![NU5 से पहले, Sprout और Sapling को trusted setup ceremony की आवश्यकता थी। NU5 के बाद, Orchard pool Halo 2 system का उपयोग करता है और उसे trusted setup की आवश्यकता नहीं होती](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu5-trusted-setup.png)

## NU5 ने क्या बदला

NU5 कई consensus changes को एक साथ जोड़ता है, जो सभी ब्लॉक 1,687,104 पर एक साथ सक्रिय हुए।

1. इसने Orchard shielded pool (ZIP 224) जोड़ा, यानी ऊपर वर्णित Halo 2 आधारित protocol।
2. इसने version 5 transaction format (ZIP 225) जोड़ा, जो एक पुनर्गठित layout है जिसमें transparent, Sapling, और नए Orchard data के लिए अलग-अलग sections हैं। Sprout fields हटा दिए गए, और पुराना version 4 format activation के बाद भी वैध रहा।
3. इसने unified addresses और unified viewing keys (ZIP 316) पेश किए, जिन पर अगले section में चर्चा की गई है।
4. इसने transaction identifier non-malleability (ZIP 244) अपनाई, जो transaction id की गणना करने का एक नया तरीका है और transaction क्या करता है, इसे उन proofs और signatures से अलग करता है जो उसे authorize करते हैं।
5. इसने canonical Jubjub point encodings (ZIP 216) अपनाए ताकि non-standard encodings हटाए जा सकें और यह निर्धारित करने के नियम कड़े किए जा सकें कि कौन-सा transaction वैध माना जाएगा।
6. इसने peer-to-peer network में version 5 transactions के relay को सक्षम किया (ZIP 239)।

NU5 ने कई मौजूदा ZIPs (32, 203, 209, 212, 213, 221, और 401) को भी अपडेट किया ताकि वे नए Orchard pool को ध्यान में रखें।

## Unified addresses

NU5 से पहले, प्रत्येक pool का अपना अलग address type था, और sender को यह जानना पड़ता था कि आपको किस प्रकार का address चाहिए। [ZIP 316](https://zips.z.cash/zip-0316) में परिभाषित unified addresses इसे बदलते हैं। एक single unified address एक से अधिक pool के receivers को bundle कर सकता है, इसलिए sender का wallet बस वही receiver चुनता है जिसे वह सबसे अच्छी तरह support करता है।

![एक unified address कई pools के receivers को bundle करता है: एक transparent receiver, एक Sapling receiver, और एक नया Orchard receiver](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu5-unified-address.png)

देखने के लिए unified viewing keys भी इसी तरह काम करती हैं। वे उन pools के पार read-only visibility देती हैं जिन्हें कोई address cover करता है। इसके बारे में अधिक जानने के लिए [Viewing Keys](../zcash-tech/viewing-keys) पृष्ठ देखें।

## NU5 की स्थिति

NU5, Zcash के पहले के upgrades के बाद आया: Overwinter, Sapling, Blossom, Heartwood, और Canopy। यह 31 मई 2022 को mainnet पर सक्रिय हुआ। Orchard का curve cycle इसलिए चुना गया क्योंकि यह recursion को support करता है, जो बाद के scaling work की आधारशिला है। NU5, NU6 और NU6.x upgrades की श्रृंखला का सीधा पूर्ववर्ती है, जिन्होंने Orchard pool पर आगे काम किया और बाद में उसमें patch भी लगाए।

## Glossary

| Term | सरल अर्थ |
|---|---|
| Network upgrade (NU) | Zcash के consensus rules में समन्वित परिवर्तन, जो एक निर्धारित block height पर सक्रिय होता है |
| Orchard | वह shielded pool जिसे NU5 ने पेश किया, और जो Halo 2 proving system पर आधारित है |
| Halo 2 | Orchard के पीछे का proving system, जिसे trusted setup की आवश्यकता नहीं होती |
| Trusted setup | एक बार होने वाली ceremony जो किसी pool के secret parameters बनाती है और जिन्हें नष्ट करने के लिए उस पर भरोसा किया जाना चाहिए |
| Unified address | एक single address जो एक से अधिक pool के receivers को bundle कर सकता है (ZIP 316) |
| Consensus branch id | एक identifier जो दर्शाता है कि कोई transaction किस rules set से संबंधित है |

## FAQ

क्या NU5 मेरे ZEC या मेरी privacy को बदलता है? नहीं। NU5 ने एक नया shielded pool और एक नया address format जोड़ा। आपका मौजूदा ZEC अप्रभावित रहता है, और आपकी privacy कम नहीं होती। Funds को Orchard में ले जाने से आपको ऐसा pool मिलता है जिसे trusted setup की आवश्यकता नहीं होती।

Orchard क्या है? Orchard, Zcash का shielded protocol है जिसे NU5 ने पेश किया। यह Halo 2 proving system पर चलता है, इसलिए इसे trusted setup ceremony की आवश्यकता नहीं होती।

क्या मुझे कुछ करना होगा? नहीं। एक supported wallet आपके लिए NU5 को संभाल लेता है। आप पुराने addresses का उपयोग जारी रख सकते हैं, और जब आपका wallet उन्हें उपलब्ध कराए तो आप unified addresses का उपयोग शुरू कर सकते हैं।

Unified address क्या है? एक single address जिसमें एक से अधिक pool के receivers हो सकते हैं। Sender का wallet वही pool चुनता है जिसे वह support करता है, इसलिए आपको हर प्रकार के लिए अलग address देने की आवश्यकता नहीं होती।

क्या NU5 मेरे पुराने funds से trusted setup को हटा देता है? पिछली स्थिति पर नहीं। Orchard को trusted setup की आवश्यकता नहीं होती, लेकिन Sapling pool के पहले के parameters NU5 के बाद भी मौजूद रहते हैं। No-setup guarantee Orchard pool में रखे गए funds पर लागू होती है।

क्या पुराना transaction format काम करना बंद कर दिया? नहीं। NU5 ने version 5 format जोड़ा, और पुराना version 4 format activation के बाद भी वैध रहा।

## अपनी समझ जाँचें

Sprout और Sapling, दोनों को trusted setup ceremony की आवश्यकता थी। NU5 के Orchard pool ने इसमें क्या बदलाव किया, और यह क्यों महत्वपूर्ण है?

<details>
<summary>उत्तर</summary>

Orchard, Halo 2 proving system पर आधारित है, जिसे trusted setup और structured reference string की आवश्यकता नहीं होती। इससे यह जोखिम समाप्त हो जाता है कि बचे हुए secret parameters का उपयोग कभी नकली ZEC बनाने में किया जा सके। यह guarantee Orchard pool में रखे गए funds पर लागू होती है। पुराने Sapling parameters NU5 के बाद भी मौजूद रहते हैं।
</details>

### संसाधन

[ZIP 252: NU5 Network Upgrade की तैनाती](https://zips.z.cash/zip-0252)

[ZIP 224: Orchard Shielded Protocol](https://zips.z.cash/zip-0224)

[ZIP 225: Version 5 Transaction Format](https://zips.z.cash/zip-0225)

[ZIP 316: Unified Addresses and Unified Viewing Keys](https://zips.z.cash/zip-0316)

[Network Upgrade 5](https://z.cash/upgrade/nu5/)

[Electric Coin Company: zcashd 5.0.0 release](https://electriccoin.co/blog/new-release-5-0-0/)

### यह भी देखें

[Zcash Network Upgrades](../start-here/network-upgrades)

[Shielded Pools](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKS](../zcash-tech/zk-snarks)

[Viewing Keys](../zcash-tech/viewing-keys)

[NU6.1](../zcash-tech/nu6-1)

---

श्रृंखला: [Network Upgrades index](../start-here/network-upgrades) · पिछला: [Canopy](../zcash-tech/canopy) · अगला: [NU6](../zcash-tech/nu6)
