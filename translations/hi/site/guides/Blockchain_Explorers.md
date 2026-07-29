<a href="https://github.com/zechub/zechub/edit/main/site/guides/Blockchain_Explorers.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Blockchain Explorers

## परिचय

पारंपरिक व्यावसायिक दुनिया में हर लेनदेन के साथ खरीद के प्रमाण के रूप में एक रसीद शामिल होती है। इसी तरह, blockchain की दुनिया में हर पूर्ण लेनदेन के लिए उपयोगकर्ता को transaction id के रूप में एक डिजिटल रसीद मिलती है। अधिकांश wallet आपको यह प्रदान करते हैं। Blockchain explorer बस ऐसे tools हैं जो किसी blockchain पर पहले से क्या हो चुका है, उसे देखने योग्य बनाते हैं। ये इनपुट के रूप में transaction id, address, या block hash लेते हैं, और दृश्य रूप में दिखाते हैं कि क्या हुआ।

## उदाहरण
<div>

- Bitcoin: [c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c](https://mempool.space/tx/c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c)

- Ethereum: [0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320](https://etherscan.io/tx/0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320)

- Cosmos: [D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170](https://www.mintscan.io/cosmos/txs/D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170)

- Zcash (सार्वजनिक): [8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82](https://explorer.zec.rocks/transactions/8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82)

- Zcash (निजी): [19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d](https://explorer.zec.rocks/transactions/19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d)

</div>


#### Zcash में ध्यान दें कि दूसरी transaction में सभी महत्वपूर्ण विवरण छिपे हुए हैं; यह महत्वपूर्ण है और डिजिटल दुनिया में इसके बड़े निहितार्थ हैं।


## Blockchain मानचित्र

तो हमारे पास डिजिटल रसीद के रूप में अक्षरों की यह लंबी श्रृंखला है, अब क्या? यहीं पर हम [blockchain explorer](https://nym.com/blog/using-blockchain-privately), या मानचित्र, का उपयोग करते हैं ताकि blockchain पर क्या हुआ, इसे बेहतर समझ सकें। ध्यान दें कि ऊपर हर chain का अपना अलग [blockchain explorer](https://nym.com/blog/using-blockchain-privately) है। यह समझना महत्वपूर्ण है कि ये सभी blockchain प्रोजेक्ट open source software के उदाहरण हैं। अर्थात, कोई भी व्यक्ति इसमें योगदान दे सकता है और/या अपनी पसंद के अनुसार code को fork कर सकता है। इस समझ के साथ, हर प्रोजेक्ट अलग-अलग क्षेत्रों में विशेषज्ञता रखता है और उस प्रोजेक्ट की आवश्यकताओं के अनुसार blockchain explorer को अनुकूलित करता है।

### Blocks
Transactions को *blocks* में रखा जाता है। जब कोई block mine/validate होता है, तो उस block के भीतर की हर transaction confirm हो जाती है और एक block hash बनाया जाता है। बनाया गया कोई भी hash block explorer में डाला जा सकता है। आपने देखा होगा कि CEX आपके funds जारी करने से पहले कुछ *confirmations* मांगते हैं; यही वह मानक है जिसका उपयोग वे यह सुनिश्चित करने के लिए करते हैं कि आपकी transaction 
पर्याप्त रूप से finalized हो चुकी है। Blockchain यह कैसे निर्धारित करता है कि अगली block में कौन-सी transactions जाएँगी? यह शोध का जटिल विषय है, लेकिन अधिकांश आधुनिक chains *fees* के विचार का उपयोग करती हैं यह तय करने के लिए कि लाइन में आगे कौन आएगा। जितनी अधिक fee, उतनी अधिक संभावना कि आप queue के आगे पहुँच जाएँ।

### Addresses

[blockchain explorers](https://nym.com/blog/using-blockchain-privately) को दृश्य रूप में समझने का एक रोचक तरीका है किसी भी random transaction का address इनपुट करना। फिर आप समय में पीछे जा सकते हैं और देख सकते हैं कि funds की उत्पत्ति कहाँ से हुई! हर transaction में input और output address दोनों होते हैं।  इस जानकारी के साथ, कोई भी व्यक्ति खर्च की जा चुकी किसी भी transaction से आगे और पीछे, दोनों दिशाओं में आसानी से बढ़ सकता है। जिन लोगों को puzzles पसंद हैं, उनके लिए यह एक विशाल वित्तीय puzzle का डिजिटल समकक्ष है, और इसका उपयोग transparency के उद्देश्यों के लिए किया जा सकता है। Blockchain explorer का उपयोग न केवल इसे देखना बहुत आसान बनाता है, बल्कि यह *यह भी उजागर करता है* कि transaction privacy की आवश्यकता क्यों है। जब तक आप shielded Zcash का उपयोग नहीं कर रहे, आप यह *किसी भी* transparent blockchain के साथ कर सकते हैं: BTC, ETH, ATOM, DOGE, VTC, आदि ... . यह बिंदु उन सभी लोगों के लिए अत्यंत महत्वपूर्ण है जो सुरक्षित रूप से blockchain का उपयोग करते हुए पूरी तरह डिजिटल भविष्य की ओर बढ़ रहे हैं।

### Amounts

ऊपर दिए गए addresses की तरह, किसी भी public blockchain पर हर transaction की राशि सार्वजनिक रूप से दिखाई देती है। इसमें किसी भी transaction के input और output addresses पर मौजूद amounts शामिल हैं। इसका एक अपवाद तब है जब आप Shielded Zcash का उपयोग करना चुनते हैं -- तब सभी amounts छिपे रहते हैं। छोटे व्यवसाय मालिकों के लिए, जिन्हें *fair trade* के लिए स्वाभाविक रूप से privacy की आवश्यकता होती है, यह एक बहुत बड़ा लाभ है!

![amounts](https://user-images.githubusercontent.com/81990132/206312357-e9504151-830f-4fa1-81cb-f23619fd7226.png)


### Zcash पर explorer क्या देख सकता है और क्या नहीं

#### संक्षेप में
- Transparent (`t`) addresses explorer पर पूरी तरह दिखाई देते हैं, बिल्कुल Bitcoin की तरह
- पूरी तरह shielded (z to z) transactions में राशि, addresses, और memo छिपे रहते हैं
- fee फिर भी दिखाई देती है, पूरी तरह shielded transaction में भी
- Shielding (`t` से shielded में ले जाना) और deshielding (shielded से वापस `t` में) आंशिक रूप से दिखाई देते हैं, क्योंकि एक पक्ष transparent होता है
- Privacy केवल तब तक बनी रहती है जब तक funds shielded pools के भीतर रहते हैं

Zcash में एक से अधिक प्रकार के address होते हैं, और explorer उनके साथ बहुत अलग व्यवहार करता है।

Transparent addresses, जो `t` से शुरू होते हैं, Bitcoin की तरह काम करते हैं। Explorer sender, receiver, amount, और वह trail दिखाता है जिससे पता चलता है कि funds कहाँ से आए।

Shielded addresses निजी पक्ष हैं। Sapling या Orchard [shielded pools](https://zechub.wiki/using-zcash/shielded-pools#content) में मौजूद funds zero knowledge proofs द्वारा सुरक्षित होते हैं। किसी पूरी तरह shielded transaction को देखें, तो explorer amount, addresses, या memo नहीं दिखा सकता। वह केवल इतना पुष्टि कर सकता है कि एक वैध transaction हुई और उसे एक block में दर्ज किया गया। यही वह छिपा हुआ निजी उदाहरण है जो इस पेज के ऊपर की ओर दिखाया गया है।

एक विवरण पूरी तरह shielded transactions में भी दिखाई देता है: fee। Zcash consensus rules के अनुसार transparent fee को स्पष्ट रूप से बताया जाना आवश्यक है, इसलिए explorer इसे हमेशा दिखा सकता है, भले ही amounts छिपे हों। इसी कारण standard wallet fee का उपयोग करना अच्छा अभ्यास है, ताकि आपकी transaction किसी असामान्य राशि का भुगतान करके अलग न दिखे।

Explorer यह भी देख सकता है कि funds transparent और shielded पक्षों के बीच कब जाते हैं। `t` funds को किसी pool में ले जाना shielding है, और उन्हें वापस बाहर लाना deshielding है। ये crossings आंशिक रूप से दिखाई देती हैं क्योंकि एक पक्ष transparent होता है। केवल पूरी तरह निजी z to z activity, जो कभी भी किसी `t` address को नहीं छूती, fee को छोड़कर बाकी सब कुछ छिपाए रखती है।

मुख्य बात यह है: privacy shielded pools के भीतर बने रहने पर निर्भर करती है। जैसे ही funds किसी `t` address को छूते हैं, उनके इतिहास का वह हिस्सा Bitcoin जितना ही सार्वजनिक हो जाता है। अपनी स्वयं की shielded activity को किसी चुने हुए व्यक्ति, जैसे accountant, को सिद्ध करने के लिए, उसे सार्वजनिक करने के बजाय viewing key साझा करें। [Viewing Keys](https://zechub.wiki/zcash-tech/viewing-keys#content) पेज देखें।


### दृश्य मार्गदर्शिका

यहाँ अलग-अलग blockchain explorers के चार अच्छे उदाहरण दिए गए हैं:

* [Mempool.space](https://mempool.space)
* [Ethscan](https://etherscan.io/)
* [Zcash Block Explorer](https://mainnet.zcashexplorer.com)
* [Mintscan](https://hub.mintscan.io/chains/ibc-network)


![bitcoinExlporer](https://user-images.githubusercontent.com/81990132/206279968-a06eb0a1-b3a6-49af-a30f-7d871b906eeb.png)


![ethExplorer](https://user-images.githubusercontent.com/81990132/206280208-2ce5eddd-157e-4eed-90a0-680c1520ec57.png)


![zcashExplorer](https://user-images.githubusercontent.com/81990132/206280454-a2c7563f-e82d-47b9-9b58-02eece1c89ee.png)


![cosmos](https://user-images.githubusercontent.com/81990132/206316791-2debfd28-923a-44f4-b7d3-701182112c30.png)
