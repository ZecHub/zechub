<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Heartwood.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="पेज संपादित करें"/>
</a>

# Heartwood

> Heartwood, Zcash mainnet पर ब्लॉक 903,000 (16 जुलाई 2020 UTC) पर लाइव हुआ।

आप क्या समझेंगे: Heartwood ने miners को अपने block rewards सीधे shielded addresses में प्राप्त करने की सुविधा कैसे दी, और इसने Zcash के proof-of-work को lightweight clients द्वारा जाँचने योग्य कैसे बनाया।

Heartwood, Zcash का एक [network upgrade](../start-here/network-upgrades) है, यानी consensus-rule hard fork, जिसकी deployment [ZIP 250](https://zips.z.cash/zip-0250) में परिभाषित की गई है। इसमें दो feature changes शामिल थे: [ZIP 213](https://zips.z.cash/zip-0213) (Shielded Coinbase) और [ZIP 221](https://zips.z.cash/zip-0221) (FlyClient)। Heartwood, Zcash का चौथा प्रमुख network upgrade था, और इसे [Electric Coin Company](../zcash-organizations/electric-coin-company) तथा [Zcash Foundation](../zcash-organizations/zcash-foundation) दोनों का संयुक्त समर्थन प्राप्त था। हर Zcash upgrade की तरह, इसने एक नया consensus branch id भी निर्धारित किया, जो ऐसा tag है जो two-way replay protection देता है, ताकि नए rules के तहत बनाई गई transaction पुरानी chain पर replay न की जा सके, और इसका उलटा भी संभव न हो।

Heartwood एक निश्चित block height (903,000) पर activate होता है, किसी तय घड़ी के समय पर नहीं, इसलिए dashboard पर दिखने वाला सटीक मिनट अलग-अलग जगहों पर थोड़ा भिन्न हो सकता है। ब्लॉक वही रहता है, और क्षण भी वही रहता है।

यह क्यों महत्वपूर्ण है। जब भी miners कोई block mine करते हैं, उन्हें नए mint किए गए ZEC मिलते हैं। Heartwood से पहले, यह आय एक transparent address में ही जानी पड़ती थी, जो सार्वजनिक होता है। कोई भी देख सकता था कि miner ने कितना कमाया और coins आगे कहाँ गए। Heartwood ने यह reward सीधे shielded address में भेजना संभव बनाया, ताकि miner की कमाई निजी रह सके। इसने lightweight wallets और अन्य chains के लिए भी पूरे chain को डाउनलोड किए बिना Zcash के proof-of-work की जाँच करना संभव बनाया।

## Shielded coinbase

coinbase transaction वह विशेष transaction है जो block reward का भुगतान करती है। Heartwood से पहले, इसके outputs transparent होने अनिवार्य थे, इसलिए miner के नए mint किए गए ZEC हमेशा एक सार्वजनिक address में ही शुरू होते थे। Heartwood ने consensus rules को बदल दिया ताकि ZIP 213 के शब्दों में, coinbase transactions में Sapling outputs हो सकें। सरल शब्दों में, अब miners rewards सीधे shielded Sapling addresses में प्राप्त कर सकते हैं। Transparent coinbase outputs अब भी supported हैं, इसलिए यह एक नया विकल्प है, कोई बाध्यकारी बदलाव नहीं।

![Heartwood से पहले miner का block reward एक transparent public address में ही जा सकता था। Heartwood के बाद coinbase transactions में Sapling outputs हो सकते हैं, इसलिए reward सीधे shielded address में जा सकता है](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/heartwood-shielded-coinbase.png)

## पहले Sapling ही क्यों

Shielded coinbase विशेष रूप से Sapling outputs को लक्षित करता है, और इसके पीछे कारण है। ZIP 213 बताता है कि Sapling upgrade ने architectural changes और performance improvements लाए, जिनसे coinbase transaction में सीधे funds को shield करना व्यावहारिक बना। मूल Sprout shielded pool इतना resource-intensive था कि coinbase में सीधे shielding करना संभव नहीं था। Sapling की अधिक efficient proving system और note format ने इसे व्यावहारिक बनाया। Sapling ने स्वयं उस पुराने rule का विस्तार किया था जो shielded coinbase outputs को रोकता था, ताकि वह rule Sapling outputs पर भी लागू हो, और Heartwood उसी rule को शिथिल करके उन्हें अनुमति देता है। यह इस बात का अच्छा उदाहरण है कि Zcash upgrades एक-दूसरे पर कैसे निर्मित होते हैं: एक upgrade की आधारभूत संरचना अगले की नींव बन जाती है।

## FlyClient

Heartwood ने यह भी बदल दिया कि block header किस चीज़ के प्रति commit करता है। header field जिसे पहले hashFinalSaplingRoot कहा जाता था, उसे नए उद्देश्य के लिए इस्तेमाल किया गया और उसका नाम बदलकर hashLightClientRoot कर दिया गया। अब यह Merkle Mountain Range (MMR) के root के प्रति commit करता है, जो prior blocks के header data और metadata, जैसे timestamps, difficulty targets, Sapling roots, accumulated work, और transaction counts, पर आधारित एक running structure है। यह commitment किसी light client, या किसी बाहरी chain, को छोटे proof के माध्यम से Zcash के proof-of-work को verify करने देता है, जिसका आकार chain की लंबाई के साथ केवल logarithmically बढ़ता है। इसका लाभ है बेहतर light-client wallets और आसान third-party तथा cross-chain integration, क्योंकि अब किसी client को chain के पीछे के work पर भरोसा करने के लिए हर block डाउनलोड करने की आवश्यकता नहीं रहती।

![FlyClient flow: हर block का header data एक Merkle Mountain Range root (hashLightClientRoot) में commit किया जाता है, जो किसी light client को छोटे logarithmic-size proof के साथ proof-of-work verify करने देता है](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/heartwood-flyclient.png)

## Heartwood कहाँ फिट बैठता है

Heartwood, Zcash upgrades की एक श्रृंखला का एक चरण है, जहाँ हर upgrade अगली upgrade के लिए आवश्यक एक हिस्सा जोड़ती है। Overwinter और Sapling 2018 में आए, Blossom 2019 में, और Heartwood 2020 में ब्लॉक 903,000 पर। इसके बाद Canopy 2020 में बाद में ब्लॉक 1,046,400 पर आया। Heartwood के लिए इस श्रृंखला की मुख्य कड़ी Sapling है: इसकी efficient shielded-transaction machinery वही तकनीकी पूर्वशर्त थी जिसने shielded coinbase को संभव बनाया।

![Zcash upgrades की समयरेखा: 2018 में Overwinter और Sapling, 2019 में Blossom, और 2020 में Heartwood](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/heartwood-timeline.png)

## शब्दावली

| शब्द | सरल अर्थ |
|---|---|
| Network upgrade (NU) | Zcash के consensus rules में समन्वित बदलाव, जो एक निश्चित block height पर activate होता है |
| Coinbase transaction | हर block की वह विशेष transaction जो block reward का भुगतान करती है |
| Shielded Sapling address | Sapling upgrade द्वारा प्रस्तुत किया गया एक निजी Zcash address प्रकार |
| Shielded coinbase | Heartwood का वह बदलाव जो block rewards को shielded Sapling addresses में भुगतान करना संभव बनाता है |
| FlyClient | एक विधि जो light clients को छोटे proofs के साथ proof-of-work verify करने देती है |
| Merkle Mountain Range (MMR) | पिछले blocks का एक running summary, जिसके प्रति block header commit करता है |
| Consensus branch id | एक tag जो बताता है कि transaction किस upgrade के rules का पालन करती है, replay protection के लिए उपयोग होता है |

## FAQ

क्या Heartwood मेरे ZEC या मेरी privacy को बदलता है? नहीं। Heartwood ने आपके मौजूदा funds को नहीं छुआ। इसने miners के लिए rewards को shielded addresses में प्राप्त करने का विकल्प जोड़ा और light clients के लिए support बेहतर किया। आपके अपने balances और shielded transactions अप्रभावित रहते हैं।

Shielded coinbase क्या है? coinbase वह transaction है जो block reward का भुगतान करती है। Heartwood इस reward को transparent address की बजाय shielded Sapling address में जाने देता है, जिससे miner की आय निजी रह सकती है।

क्या अब miners को rewards shielded रूप में ही लेने होंगे? नहीं। Shielded coinbase वैकल्पिक है। Transparent coinbase outputs अभी भी supported हैं, इसलिए miners किसी भी विकल्प को चुन सकते हैं।

Shielded coinbase में Sapling का उपयोग क्यों किया जाता है, पुराने Sprout pool का क्यों नहीं? क्योंकि Sapling की अधिक efficient design ने coinbase में सीधे shielding को व्यावहारिक बनाया। पुराना Sprout pool ऐसा करने के लिए बहुत resource-intensive था।

Light clients के लिए क्या बदला? block header अब hashLightClientRoot field के माध्यम से पिछले blocks पर आधारित Merkle Mountain Range के प्रति commit करता है। इससे light clients और अन्य chains पूरे chain की बजाय छोटे, logarithmic-size proofs के साथ Zcash के proof-of-work को verify कर सकते हैं।

## अपनी समझ जाँचें

Heartwood से पहले, miner को दिया गया block reward सार्वजनिक रूप से क्यों दिखाई देता था, और Heartwood ने क्या बदला?

<details>
<summary>उत्तर</summary>

Coinbase outputs का transparent होना अनिवार्य था, इसलिए miner का नया mint किया गया reward हमेशा एक सार्वजनिक transparent address में जाता था, जिसे कोई भी देख सकता था। Heartwood ने consensus rules (ZIP 213) को बदल दिया ताकि coinbase transactions में Sapling outputs हो सकें, जिससे miners अपने rewards सीधे shielded addresses में प्राप्त कर सकें।
</details>

### संसाधन

[ZIP 250: Heartwood Network Upgrade की Deployment](https://zips.z.cash/zip-0250)

[ZIP 213: Shielded Coinbase](https://zips.z.cash/zip-0213)

[ZIP 221: FlyClient - Consensus-Layer Changes](https://zips.z.cash/zip-0221)

[Heartwood network upgrade](https://z.cash/upgrade/heartwood/)

### यह भी देखें

[Zcash Network Upgrades](../start-here/network-upgrades)

[Shielded Pools](../using-zcash/shielded-pools)

[Wallets](../using-zcash/wallets)

[zk-SNARKS](../zcash-tech/zk-snarks)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

[Zcash Foundation](../zcash-organizations/zcash-foundation)

---

श्रृंखला: [Network Upgrades index](../start-here/network-upgrades) · पिछला: [Blossom](../zcash-tech/blossom) · अगला: [Canopy](../zcash-tech/canopy)
