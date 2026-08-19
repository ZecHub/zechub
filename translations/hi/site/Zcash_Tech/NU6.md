<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/NU6.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="पृष्ठ संपादित करें"/>
</a>

# NU6

> NU6, Zcash mainnet पर ब्लॉक 2,726,400 (23 नवंबर 2024 UTC) पर लाइव हुआ।

आप क्या समझेंगे: Zcash halving के बाद भी अपने विकास के लिए फंडिंग कैसे जारी रखता है, उसने ऐसा रिज़र्व अलग क्यों रखा जिसे वह उस समय अभी खर्च करना नहीं जानता था, और उसने कुल ZEC आपूर्ति को बिल्कुल पूर्वानुमेय कैसे बनाया।

NU6, Zcash का एक [network upgrade](../start-here/network-upgrades) है, जिसे [ZIP 253](https://zips.z.cash/zip-0253) द्वारा डिप्लॉय किया गया था और जो नवंबर 2024 में mainnet पर ब्लॉक 2,726,400 पर सक्रिय हुआ। यह एक monetary और [development-funding](../start-here/development-fund) upgrade है: इसने नवंबर 2024 halving के बाद भी block subsidy का एक हिस्सा विकास के लिए जारी रखा, भविष्य में समुदाय द्वारा तय उपयोग के लिए प्रोटोकॉल के भीतर एक रिज़र्व स्थापित किया, और नए ZEC की गणना को अधिक सख्त बनाया। NU6 को Electric Coin Company और Zcash Foundation, दोनों का समर्थन मिला था।

यह क्यों महत्वपूर्ण है। Zcash का [Development Fund](../zcash-tech/canopy) नवंबर 2024 halving के आसपास समाप्त होने वाला था, जो उसके इतिहास की दूसरी halving थी। NU6 ने उस फंडिंग को जारी रखा, लेकिन हर coin को तय प्राप्तकर्ताओं को देने के बजाय, उसने एक हिस्सा प्रोटोकॉल के भीतर आरक्षित कर दिया ताकि समुदाय बाद में तय कर सके कि उसके साथ क्या किया जाए। इसने accounting में मौजूद एक शांत अंतर को भी बंद कर दिया, जिससे अब कुल जितना ZEC कभी अस्तित्व में होगा, उसका बिल्कुल सटीक पूर्वानुमान लगाया जा सकता है।

## NU6 ने क्या बदला

NU6 ने नवंबर 2024 halving के बाद भी block subsidy का 20% विकास फंडिंग के लिए भेजना जारी रखा, यह नियम [ZIP 1015](https://zips.z.cash/zip-1015) में परिभाषित है। इसने उस 20% को दो हिस्सों में बाँटा।

1. block subsidy का 8% Zcash Community Grants (ZCG) को जाता है, जो समुदाय द्वारा और समुदाय के लिए किए जाने वाले कार्यों को फंड करता है।
2. 12% एक नए in-protocol lockbox में जाता है, जिसे भविष्य में समुदाय द्वारा तय उपयोग के लिए रखा गया है।

block subsidy का बाकी हिस्सा, साथ ही transaction fees, उन miners को जाता है जो network को सुरक्षित रखते हैं। NU6 ने मौजूदा funding-stream और dev-fund नियमों (ZIP 207 और ZIP 214) को भी इस नई संरचना के अनुसार अपडेट किया।

![NU6 development-fund split: block subsidy का 20 प्रतिशत विकास के लिए जाता है, जिसमें 8 प्रतिशत Zcash Community Grants को और 12 प्रतिशत Deferred Dev Fund Lockbox में जाता है](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu6-dev-fund-split.png)

## Deferred lockbox

12% वाला हिस्सा NU6 का नया विचार है। किसी recipient address को भुगतान किए जाने के बजाय, यह value सीधे एक in-protocol pool में जमा की जाती है जिसे Deferred Dev Fund Lockbox कहा जाता है, और जो [ZIP 2001](https://zips.z.cash/zip-2001) में परिभाषित है।

1. lockbox एक नया funding-stream type (DEFERRED_POOL) है, जिसमें block reward की value किसी व्यक्ति या संगठन को नहीं, बल्कि सीधे प्रोटोकॉल के भीतर जाती है।
2. network इसे अपने स्वयं के chain value pool balance के रूप में track करता है, ठीक उसी तरह जैसे वह shielded pools के balances को track करता है।
3. NU6 ने lockbox को जानबूझकर बनाया, लेकिन कठिन प्रश्न खुला छोड़ दिया: उन funds को कौन नियंत्रित करता है, और वे कैसे जारी किए जाते हैं?

इस प्रश्न का उत्तर बाद में [NU6.1](../zcash-tech/nu6-1) द्वारा दिया गया, जिसने governance निर्धारित की: इसने Zcash Community Grants के लिए 8% block-subsidy stream को जारी रखा और 12% stream को एक coin-holder-controlled fund में निर्देशित किया जिसे lockbox से seed किया गया था।

## हिसाब-किताब का संतुलन

NU6 ने नए ZEC के निर्माण के तरीके में accounting की एक कमी को भी बंद किया, जिसे [ZIP 236](https://zips.z.cash/zip-0236) में परिभाषित किया गया है। Coinbase transactions वे विशेष transactions हैं जो हर block के नए ZEC और fees का भुगतान करते हैं।

1. NU6 से पहले, किसी coinbase transaction को केवल इतना सुनिश्चित करना होता था कि वह अपने अधिकार से अधिक claim न करे। कोई miner पूरी subsidy से कम claim कर सकता था, जिससे वह ZEC चुपचाप burn हो जाता था।
2. NU6 के बाद, coinbase transaction का बिल्कुल संतुलित होना अनिवार्य है: total output value miner subsidy plus fees के बराबर होनी चाहिए, न अधिक न कम।
3. क्योंकि अब miners कम claim करके गलती से ZEC burn नहीं कर सकते, इसलिए कुल जितना ZEC कभी अस्तित्व में होगा, उसका अब बिल्कुल सटीक पूर्वानुमान लगाया जा सकता है।

![NU6 से पहले और बाद में Coinbase balancing: पहले, coinbase कम claim कर सकता था और ZEC burn हो जाता था, इसलिए supply बिल्कुल पूर्वानुमेय नहीं थी। बाद में, coinbase का बिल्कुल संतुलित होना आवश्यक है, इसलिए issuance बिल्कुल पूर्वानुमेय है](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu6-coinbase-balance.png)

## फंडिंग कैसे विकसित हुई

NU6, Zcash अपने लिए भुगतान कैसे करता है, इस लंबी कहानी का एक अध्याय है।

1. Canopy (2020) ने मूल founders reward को समाप्त किया और [development fund](../start-here/development-fund) बनाया।
2. NU6 (नवंबर 2024) ने दूसरी halving के बाद उस funding का पुनर्गठन किया और Deferred Dev Fund Lockbox स्थापित किया, जिससे issuance का एक हिस्सा भविष्य में समुदाय द्वारा तय grants के लिए आरक्षित किया गया।
3. NU6.1 (2025) ने उस प्रश्न का उत्तर दिया जिसे NU6 खुला छोड़ गया था—आरक्षित funds को कौन नियंत्रित करता है—8% block subsidy को Zcash Community Grants के लिए जारी रखते हुए और 12% को lockbox से seed किए गए coin-holder-controlled fund में निर्देशित करके।

![Zcash funding कैसे विकसित हुई: Canopy ने development fund बनाया, NU6 ने lockbox स्थापित किया, और NU6.1 ने यह नियम तय किए कि इसे कौन नियंत्रित करता है](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/nu6-funding-timeline.png)

## शब्दावली

| शब्द | सरल अर्थ |
|---|---|
| Block subsidy | हर mined block के साथ बनाया गया नया ZEC |
| Coinbase transaction | वह विशेष transaction जो किसी block की subsidy और fees का भुगतान करता है |
| Deferred Dev Fund Lockbox | एक in-protocol रिज़र्व जो भविष्य में समुदाय द्वारा तय उपयोग के लिए issuance का एक हिस्सा रखता है |
| Zcash Community Grants (ZCG) | एक समिति जो Zcash समुदाय द्वारा और समुदाय के लिए किए जाने वाले कार्यों को फंड करती है |
| Consensus branch id | वह identifier जिसका उपयोग नोड यह बताने के लिए करते हैं कि कोई block किस upgrade के नियमों का पालन करता है |
| Network upgrade (NU) | Zcash के consensus rules में किया गया एक समन्वित परिवर्तन, जो एक निश्चित block height पर सक्रिय होता है |

## FAQ

क्या NU6 मेरे ZEC या मेरी privacy को बदलता है? नहीं। NU6 इस बारे में है कि development को कैसे fund किया जाता है और issuance की गणना कैसे की जाती है, न कि आपके transactions या privacy के बारे में। आपके funds और shielded transactions अप्रभावित रहते हैं।

फंडिंग कहाँ से आती है? block subsidy से, यानी वह नया ZEC जो blocks के mined होने पर जारी किया जाता है। इसका 20% हिस्सा development की ओर भेजा जाता है, बजाय इसके कि पूरा का पूरा miners को जाए।

lockbox किस लिए है? यह issuance का एक हिस्सा प्रोटोकॉल के भीतर आरक्षित रखता है ताकि समुदाय बाद में तय कर सके कि उसका उपयोग कैसे करना है। NU6 ने यह रिज़र्व अलग रखा, और NU6.1 ने यह नियम तय किए कि इसे कौन नियंत्रित करता है।

क्या exact-balance rule मेरे coins को बदलता है? नहीं। यह केवल यह अनिवार्य करता है कि हर block का coinbase transaction ठीक उतना ही भुगतान करे जितना उसका अधिकार है। इसका प्रभाव नए issuance accounting पर पड़ता है, मौजूदा balances पर नहीं।

तकनीकी रूप से NU6 को क्या परिभाषित करता है? NU6 को ZIP 253 द्वारा डिप्लॉय किया गया है, जो उसकी mainnet activation को block 2,726,400 पर और उसके consensus branch id को निर्धारित करता है। consensus changes स्वयं ZIP 236, ZIP 1015, और ZIP 2001 से आते हैं, जबकि ZIP 207 और ZIP 214 को इनके अनुरूप अपडेट किया गया है।

NU6, NU6.1 से कैसे अलग है? NU6 ने funding का पुनर्गठन किया और lockbox बनाया। NU6.1 ने तय किया कि lockbox funds को कौन नियंत्रित करता है और आरक्षित हिस्से को कैसे बाँटा जाता है।

## अपनी समझ जाँचें

NU6 ने Deferred Dev Fund Lockbox स्थापित किया, लेकिन यह नहीं बताया कि इसे कौन नियंत्रित करेगा। कोई upgrade एक रिज़र्व क्यों बनाएगा और जानबूझकर उसकी governance को बाद के लिए क्यों छोड़ेगा?

<details>
<summary>उत्तर</summary>

रिज़र्व बनाने से यह सुनिश्चित हो गया कि issuance का एक हिस्सा तय प्राप्तकर्ताओं को भुगतान किए जाने के बजाय प्रोटोकॉल के भीतर अलग रखा जाएगा। यह तय करना कि उन funds को कौन नियंत्रित करेगा और वे कैसे जारी किए जाएँगे, governance का अधिक कठिन प्रश्न है। NU6 ने जानबूझकर इसे खुला छोड़ा, और NU6.1 ने इसका उत्तर दिया: block subsidy का 8% Zcash Community Grants को जारी रहता है, और 12% lockbox से seed किए गए coin-holder-controlled fund में जाता है।
</details>

### संसाधन

[ZIP 253: NU6 Network Upgrade की Deployment](https://zips.z.cash/zip-0253)

[ZIP 236: Blocks का बिल्कुल संतुलित होना चाहिए](https://zips.z.cash/zip-0236)

[ZIP 1015: Non-Direct Development Funding के लिए Block Subsidy Allocation](https://zips.z.cash/zip-1015)

[ZIP 2001: Lockbox Funding Streams](https://zips.z.cash/zip-2001)

[Network Upgrade 6 (NU6)](https://z.cash/upgrade/nu6/)

### यह भी देखें

[Zcash Network Upgrades](../start-here/network-upgrades)

[Development Fund](../start-here/development-fund)

[Zcash Monetary Policy](../start-here/zcash-monetary-policy)

[NU6.1](../zcash-tech/nu6-1)

[NU6.2](../zcash-tech/nu6-2)

[ZEC और Zcash क्या हैं](../start-here/what-is-zec-and-zcash)

---

शृंखला: [Network Upgrades index](../start-here/network-upgrades) · पिछला: [NU5](../zcash-tech/nu5) · अगला: [NU6.1](../zcash-tech/nu6-1)
