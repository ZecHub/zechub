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

![Heartwood से पहले miner का block reward एक transparent public address में ही जा सकता था। Heartwood के बाद coinbase transactions में Sapling outputs हो सकते हैं, इसलिए reward सीधे shielded address में जा सकता है](/content-images/heartwood-shielded-coinbase-3bf38ae60d.webp)

## पहले Sapling ही क्यों

Shielded coinbase विशेष रूप से Sapling outputs को लक्षित करता है, और इसके पीछे कारण है। ZIP 213 बताता है कि Sapling upgrade ने architectural changes और performance improvements लाए, जिनसे coinbase transaction में सीधे funds को shield करना व्यावहारिक बना। मूल Sprout shielded pool इतना resource-intensive था कि coinbase में सीधे shielding करना संभव नहीं था। Sapling की अधिक efficient proving system और note format ने इसे व्यावहारिक बनाया। Sapling ने स्वयं उस पुराने rule का विस्तार किया था जो shielded coinbase outputs को रोकता था, ताकि वह rule Sapling outputs पर भी लागू हो, और Heartwood उसी rule को शिथिल करके उन्हें अनुमति देता है। यह इस बात का अच्छा उदाहरण है कि Zcash upgrades एक-दूसरे पर कैसे निर्मित होते हैं: एक upgrade की आधारभूत संरचना अगले की नींव बन जाती है।

## FlyClient

Heartwood ने यह भी बदल दिया कि block header किस चीज़ के प्रति commit करता है। header field जिसे पहले hashFinalSaplingRoot कहा जाता था, उसे नए उद्देश्य के लिए इस्तेमाल किया गया और उसका नाम बदलकर hashLightClientRoot कर दिया गया। अब यह Merkle Mountain Range (MMR) के root के प्रति commit करता है, जो prior blocks के header data और metadata, जैसे timestamps, difficulty targets, Sapling roots, accumulated work, और transaction counts, पर आधारित एक running structure है। यह commitment किसी light client, या किसी बाहरी chain, को छोटे proof के माध्यम से Zcash के proof-of-work को verify करने देता है, जिसका आकार chain की लंबाई के साथ केवल logarithmically बढ़ता है। इसका लाभ है बेहतर light-client wallets और आसान third-party तथा cross-chain integration, क्योंकि अब किसी client को chain के पीछे के work पर भरोसा करने के लिए हर block डाउनलोड करने की आवश्यकता नहीं रहती।

![FlyClient flow: हर block का header data एक Merkle Mountain Range root (hashLightClientRoot) में commit किया जाता है, जो किसी light client को छोटे logarithmic-size proof के साथ proof-of-work verify करने देता है](/content-images/heartwood-flyclient-0c6b5bda0d.webp)

## Heartwood कहाँ फिट बैठता है

Heartwood, Zcash upgrades की एक श्रृंखला का एक चरण है, जहाँ हर upgrade अगली upgrade के लिए आवश्यक एक हिस्सा जोड़ती है। Overwinter और Sapling 2018 में आए, Blossom 2019 में, और Heartwood 2020 में ब्लॉक 903,000 पर। इसके बाद Canopy 2020 में बाद में ब्लॉक 1,046,400 पर आया। Heartwood के लिए इस श्रृंखला की मुख्य कड़ी Sapling है: इसकी efficient shielded-transaction machinery वही तकनीकी पूर्वशर्त थी जिसने shielded coinbase को संभव बनाया।

![Zcash upgrades की समयरेखा: 2018 में Overwinter और Sapling, 2019 में Blossom, और 2020 में Heartwood](/content-images/heartwood-timeline-99bc79b6e9.webp)

## TL;DR

- Heartwood mainnet block 903,000 (16 जुलाई 2020 UTC) पर activate हुआ, और इसे ZIP 250 द्वारा two-way replay protection के लिए एक नए consensus branch id के साथ deploy किया गया।
- ZIP 213 (Shielded Coinbase): coinbase transactions में Sapling outputs हो सकते हैं, जिससे miners block rewards सीधे एक shielded address में प्राप्त कर सकते हैं।
- ZIP 221 (FlyClient): header का hashLightClientRoot अब एक Merkle Mountain Range के प्रति commit करता है, जिससे light clients ऐसे proofs के साथ proof-of-work verify कर सकते हैं जिनका आकार केवल logarithmically बढ़ता है।
- Transparent coinbase outputs अब भी पूरी तरह समर्थित हैं — shielded coinbase एक नया विकल्प है, अनिवार्यता नहीं।
- Activation घड़ी के समय पर नहीं, बल्कि एक block height पर होता है, इसलिए सटीक मिनट अलग-अलग dashboards और timezones में भिन्न होता है।

## मुख्य व्याख्या

Heartwood से पहले, किसी miner के नए mint हुए ZEC को अपनी शुरुआत एक transparent address में करनी पड़ती थी, इसलिए कोई भी miner की आय पर नज़र रख सकता था और यह trace कर सकता था कि वह कहाँ गई। ZIP 213 ने consensus नियम में ढील दी ताकि coinbase transaction Sapling outputs को भुगतान कर सके, जिससे miner की कमाई अस्तित्व में आने के पहले ही क्षण से निजी रहती है। यह विशेष रूप से Sapling को लक्षित करता है क्योंकि Sapling की कुशल proving ने coinbase के भीतर shielding को व्यावहारिक बना दिया; Sprout के भारी proofs वहाँ संभव नहीं थे।

ZIP 221 ने header field hashFinalSaplingRoot को hashLightClientRoot के रूप में नए उद्देश्य के लिए इस्तेमाल किया। अब यह पिछले blocks के header डेटा पर बनी Merkle Mountain Range के प्रति प्रतिबद्ध (commit) करता है — timestamps, difficulty targets, Sapling roots, संचित कार्य (accumulated work), और transaction की संख्याएँ। इससे एक light client या कोई दूसरी chain हर block डाउनलोड करने की बजाय एक छोटे proof के ज़रिए Zcash के proof-of-work को सत्यापित कर सकती है।

## दृश्य उपमा

पहले: हर miner का वेतन एक सार्वजनिक सूचना-पट्ट पर लगाया जाता था — राशि और उसका पूरा सिलसिला कोई भी पढ़ सकता था। अब: वेतन एक मुहरबंद लिफ़ाफ़े में आ सकता है। और अब हर नया block अपने साथ एक छोटी-सी लाख की मुहर लेकर आता है, जो उससे पहले के हर block का सार बताती है, ताकि कोई अजनबी हर पन्ना पढ़ने के बजाय एक नज़र में ही काम की पूरी chain की पुष्टि कर सके।

## गहन विश्लेषण

नियम में यह बदलाव एक पृष्ठभूमि लिए हुए था: Sapling ने shielded coinbase पर लगे मूल प्रतिबंध को बढ़ाकर Sapling आउटपुट तक भी लागू कर दिया था, और Heartwood ने उस प्रतिबंध को हटाकर उन्हें अनुमति दे दी — यह इस बात का स्पष्ट उदाहरण है कि कैसे एक अपग्रेड की आंतरिक व्यवस्था अगले अपग्रेड की नींव बन जाती है। MMR commitment का लाभ हल्के wallets और क्रॉस-चेन इंटीग्रेशन में मिलता है, जहाँ पहले Zcash के कार्य को सत्यापित करने के लिए पूरी चेन डाउनलोड करनी पड़ती थी। एक्टिवेशन के समय जोड़ा गया consensus branch id दोनों दिशाओं में replay सुरक्षा देता है: नए नियमों के तहत बनाया गया लेनदेन पुरानी चेन पर दोबारा नहीं चलाया जा सकता, और पुराने नियमों के तहत बनाया गया लेनदेन नई चेन पर भी नहीं।

## आम गलतियाँ

- **यह मान लेना कि shielded coinbase अनिवार्य हो गया।** Transparent coinbase आउटपुट अब भी मान्य हैं; यह miners पर निर्भर है कि वे कौन-सा विकल्प चुनें।
- **यह मान लेना कि Sprout shielded coinbase प्राप्त कर सकता है।** केवल Sapling आउटपुट की अनुमति है, क्योंकि Sprout में proving बहुत अधिक संसाधन लेती थी।
- **यह समझना कि FlyClient के बाद फुल नोड की ज़रूरत नहीं रहती।** यह light clients और cross-chain verifiers के काम आता है, पर नेटवर्क का आधार अब भी फुल नोड ही हैं।
- **सक्रियण के लिए घड़ी का कोई तय समय खोजना।** सक्रियण ब्लॉक 903,000 पर तय था, इसलिए वास्तविक घड़ी का मिनट अलग-अलग हो सकता है।
- **hashLightClientRoot को पुराने hashFinalSaplingRoot के साथ भ्रमित करना।** उसी फ़ील्ड को नया उपयोग और नया नाम दिया गया।

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

[zk-SNARKs](../zcash-tech/zk-snarks)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

[Zcash Foundation](../zcash-organizations/zcash-foundation)

---

## संबंधित पृष्ठ

- [Sapling](./Sapling.md) — वह कुशल तंत्र जिसने shielded coinbase को संभव बनाया
- [Canopy](./Canopy.md) — इस श्रृंखला का अगला अपग्रेड
- [फुल नोड](./Full_Nodes.md) — पूर्ण सत्यापन अब भी क्या प्रदान करता है
- [एक Block Explorer क्या देख सकता है](./What_a_Block_Explorer_Can_See.md) — transparent बनाम shielded coinbase क्या उजागर करता है

श्रृंखला: [Network Upgrades index](../start-here/network-upgrades) · पिछला: [Blossom](../zcash-tech/blossom) · अगला: [Canopy](../zcash-tech/canopy)
