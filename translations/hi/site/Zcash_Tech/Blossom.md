<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Blossom.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Blossom

> Blossom, Zcash mainnet पर ब्लॉक 653,600 (11 दिसंबर 2019 UTC) पर लाइव हुआ।

आप यहाँ से यह समझकर जाएँगे: Blossom ने समय के साथ नेटवर्क द्वारा बनाए जाने वाले ZEC की मात्रा बदले बिना Zcash ब्लॉकों को लगभग दोगुनी तेजी से कैसे पहुँचाया।

Blossom, Zcash का एक [network upgrade](../start-here/network-upgrades) है। इसे [ZIP 206](https://zips.z.cash/zip-0206) के माध्यम से लागू किया गया था, और इसका मुख्य consensus परिवर्तन [ZIP 208](https://zips.z.cash/zip-0208) में परिभाषित है। Blossom एक scalability upgrade था: इसने ब्लॉकों के बीच लक्षित समय को 150 सेकंड से घटाकर 75 सेकंड कर दिया, जिससे ब्लॉक लगभग दोगुनी बार आने लगे। Electric Coin Company ने Blossom का नेतृत्व किया और इसकी घोषणा की।

यह क्यों महत्वपूर्ण है। जब आप ZEC भेजते हैं, तो आप नेटवर्क द्वारा उसे किसी ब्लॉक में पुष्टि किए जाने का इंतज़ार करते हैं। यदि ब्लॉक धीमे आते हैं, तो आपको अधिक इंतज़ार करना पड़ता है। Blossom से पहले, एक नया ब्लॉक लगभग हर 150 सेकंड में आने की उम्मीद होती थी। Blossom ने इस लक्ष्य को आधा करके 75 सेकंड कर दिया, जिससे पुष्टि जल्दी आने लगी और chain समान समय में अधिक लेनदेन संभाल सकती है। यह सब इसने अधिक ZEC बनाए बिना या भविष्य की halving के समय को बदले बिना किया।

## तेज़ ब्लॉक

Blossom का मुख्य बदलाव सरल है। Zcash का target block spacing, यानी वह समय जिसका नेटवर्क एक ब्लॉक और अगले ब्लॉक के बीच लक्ष्य रखता है, 150 सेकंड से घटकर 75 सेकंड हो गया ([ZIP 208](https://zips.z.cash/zip-0208))। ब्लॉक proof of work के माध्यम से मिलते हैं, इसलिए उनके बीच का वास्तविक अंतर बदलता रहता है, लेकिन अब नेटवर्क हर 150 सेकंड के बजाय लगभग हर 75 सेकंड में एक ब्लॉक का लक्ष्य रखता है।

इससे दो बातें होती हैं:

1. ब्लॉक लगभग दोगुनी बार आते हैं, इसलिए chain समय की प्रति इकाई में लगभग दोगुने लेनदेन संभाल सकती है।
2. आपके लेनदेन को उसकी पहली पुष्टि जल्दी मिलती है, क्योंकि आपको अगले ब्लॉक के लिए उतना लंबा इंतज़ार नहीं करना पड़ता।

![Blossom से पहले ब्लॉक लक्ष्य 150 सेकंड था, जिससे पुष्टि धीमी और throughput कम था। Blossom के बाद लक्ष्य 75 सेकंड है, जिससे पुष्टि तेज़ और throughput लगभग दोगुना है](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/blossom-block-spacing.png)

## जारीकरण को स्थिर रखना

तेज़ ब्लॉक एक सवाल उठाते हैं। यदि Zcash दोगुने ब्लॉक बनाता और हर ब्लॉक पर वही reward देता रहता, तो नेटवर्क ZEC को दोगुनी तेजी से बनाता। Blossom ऐसा होने से रोकता है। इसने प्रति ब्लॉक दिए जाने वाले reward को आधा कर दिया, और block-reward halving interval को 840,000 से बढ़ाकर 1,680,000 ब्लॉक कर दिया ([ZIP 208](https://zips.z.cash/zip-0208))। दोगुने ब्लॉक, जिनमें प्रत्येक आधा भुगतान करता है, मिलकर समय की प्रति इकाई उतना ही ZEC बनाते हैं। कुल supply schedule और भविष्य की halving का समय, वास्तविक समय में मापा जाए तो, नहीं बदला।

![Blossom जारीकरण को कैसे स्थिर रखता है: 75 सेकंड के ब्लॉक दोगुनी बार आते हैं, प्रति-ब्लॉक reward आधा कर दिया जाता है, halving interval दोगुना कर दिया जाता है, इसलिए समय के साथ कुल emission समान रहती है](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/blossom-emission-balance.png)

## एक अनिवार्य upgrade

Blossom एक bilateral consensus change था, जिसका मतलब है कि chain का अनुसरण जारी रखने के लिए हर नोड को upgrade करना पड़ा ([ZIP 206](https://zips.z.cash/zip-0206))। जो नोड operator sync में बने रहना चाहता था, उसके लिए यह वैकल्पिक नहीं था। Blossom, mainnet ब्लॉक 653,600 पर सक्रिय हुआ और इसका अपना consensus branch id है, एक ऐसा tag जो नोड और लेनदेन को यह पुष्टि करने देता है कि वे Blossom के नियमों पर हैं। इस upgrade ने Zcash के मानक network upgrade mechanism का उपयोग किया ([ZIP 200](https://zips.z.cash/zip-0200))।

## Blossom कहाँ फिट बैठता है

Blossom, Zcash का तीसरा network upgrade था। यह Overwinter और Sapling के बाद आया, और Heartwood तथा Canopy से पहले। Sapling के विपरीत, जिसने Zcash की shielded cryptography को फिर से तैयार किया, Blossom scale और speed पर केंद्रित था। इसका मुख्य काम block timing था, नई privacy सुविधाएँ नहीं।

## शब्दावली

| शब्द | सरल अर्थ |
|---|---|
| Block target spacing | वह समय जिसका नेटवर्क एक ब्लॉक और अगले ब्लॉक के बीच लक्ष्य रखता है |
| Block reward | नया ZEC जो हर ब्लॉक के mine होने पर बनाया और दिया जाता है |
| Halving interval | कितने ब्लॉक गुजरते हैं, इससे पहले कि block reward फिर आधा हो |
| Consensus branch id | एक tag जो यह दिखाता है कि कोई नोड या लेनदेन नेटवर्क के किस नियम-समूह का अनुसरण कर रहा है |
| Bilateral consensus change | नियमों में ऐसा बदलाव जिसे नेटवर्क पर बने रहने के लिए हर नोड को अपनाना पड़ता है |
| Network upgrade (NU) | Zcash के consensus नियमों में समन्वित बदलाव, जो एक निर्धारित block height पर सक्रिय होता है |

## FAQ

क्या Blossom यह बदलता है कि कुल कितना ZEC मौजूद है या halving कब होती है? नहीं। प्रति-ब्लॉक reward को आधा किया गया और halving interval को उसी समय दोगुना किया गया, इसलिए समय की प्रति इकाई बनाए जाने वाले ZEC की मात्रा और भविष्य की halving का समय समान रहा।

क्या Blossom मेरे ZEC या मेरी privacy को बदलता है? नहीं। Blossom ने block timing और reward की गणना बदली। इसने आपके balance या आपके shielded लेनदेन को नहीं छुआ।

75 सेकंड का वास्तव में क्या मतलब है? यह एक लक्ष्य है, गारंटी नहीं। ब्लॉक proof of work से मिलते हैं, इसलिए ब्लॉकों के बीच का वास्तविक अंतर बदलता रहता है। नेटवर्क हर 150 सेकंड के बजाय लगभग हर 75 सेकंड में एक ब्लॉक का लक्ष्य रखता है।

जब Blossom सक्रिय हुआ, तब क्या मुझे कुछ करना था? यदि आप एक full नोड चला रहे थे, तो आपको उसे upgrade करना था, क्योंकि Blossom अनिवार्य था। यदि आप wallet का उपयोग कर रहे थे, तो आपको ऐसा version चाहिए था जो नए नियमों का समर्थन करता हो।

आख़िर block reward को आधा क्यों किया गया? क्योंकि अब ब्लॉक दोगुनी तेजी से आते हैं। प्रति-ब्लॉक reward को आधा करने से नेटवर्क ZEC को दोगुनी तेजी से बनाने से बचता है।

Blossom कब सक्रिय हुआ? mainnet ब्लॉक 653,600 पर, 11 दिसंबर 2019 UTC को।

## अपनी समझ जाँचें

Blossom ने Zcash ब्लॉकों को लगभग दोगुनी बार आने लायक बना दिया। फिर नए ZEC के बनने की दर दोगुनी क्यों नहीं हुई?

<details>
<summary>उत्तर</summary>

क्योंकि Blossom ने प्रति ब्लॉक दिए जाने वाले reward को भी आधा कर दिया और halving interval को 840,000 से बढ़ाकर 1,680,000 ब्लॉक कर दिया। दोगुने ब्लॉक, जिनमें प्रत्येक आधा भुगतान करता है, मिलकर समय की प्रति इकाई उतना ही ZEC बनाते हैं, इसलिए वास्तविक समय में मापा गया emission schedule नहीं बदला।
</details>

### संसाधन

[ZIP 208: कम Block Target Spacing](https://zips.z.cash/zip-0208)

[ZIP 206: Blossom Network Upgrade की Deployment](https://zips.z.cash/zip-0206)

[Blossom Network Upgrade](https://z.cash/upgrade/blossom/)

[Blossom Upgrade speed, scalability, capacity को बेहतर बनाता है (Electric Coin Company)](https://electriccoin.co/blog/blossom-upgrade-improves-speed-scalability-capacity/)

### यह भी देखें

[Zcash Network Upgrades](../start-here/network-upgrades)

[Zcash Monetary Policy](../start-here/zcash-monetary-policy)

[ZEC और Zcash क्या है](../start-here/what-is-zec-and-zcash)

[Full नोड](../zcash-tech/full-nodes)

[NU6.1](../zcash-tech/nu6-1)

---

श्रृंखला: [Network Upgrades index](../start-here/network-upgrades) · पिछला: [Sapling](../zcash-tech/sapling) · अगला: [Heartwood](../zcash-tech/heartwood)
