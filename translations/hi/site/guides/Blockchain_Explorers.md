<a href="https://github.com/zechub/zechub/edit/main/site/guides/Blockchain_Explorers.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Blockchain Explorer

## परिचय

पारंपरिक व्यावसायिक दुनिया में हर लेन-देन में खरीद के प्रमाण के लिए एक रसीद शामिल होती है। इसी प्रकार, blockchain की दुनिया में उपयोगकर्ता को पूर्ण किए गए प्रत्येक लेन-देन के लिए transaction id के रूप में एक डिजिटल रसीद मिलती है। अधिकांश wallet यह आपके लिए प्रदान करेंगे। Blockchain explorer बस ऐसे उपकरण हैं जो किसी blockchain पर पहले से हो चुकी गतिविधि को देखने की सुविधा देते हैं। वे इनपुट के रूप में transaction id, पते या block hash लेते हैं और दृश्य रूप में बताते हैं कि क्या हुआ।

## उदाहरण
<div>

- Bitcoin: [c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c](https://mempool.space/tx/c839b44a7052393f4672cdc4ec79f8f15d3036565e13bede0fab91f674506a7c)

- Ethereum: [0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320](https://etherscan.io/tx/0x43117fc201f8d3c09a72d42ab4a048003f348917771b9ace64b8944a91807320)

- Cosmos: [D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170](https://www.mintscan.io/cosmos/txs/D0587C76E7689A9EFBDDA587DDB450F6C6E972FCEEA37DD8DA9AF95C23CF8170)

- Zcash (सार्वजनिक): [8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82](https://explorer.zec.rocks/transactions/8dd212847a97c5eb9cee5e7e58c4d9e739f4156273ae3b2da1a4ff79ad95ff82)

- Zcash (निजी): [19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d](https://explorer.zec.rocks/transactions/19a4be270089490ece2e5fe7a6c9b9804af3c7ed43e1fb1b744b0fb29070fa5d)

</div>


#### ध्यान दें कि Zcash में दूसरे लेन-देन की सभी महत्वपूर्ण जानकारी छिपी हुई है; यह महत्वपूर्ण है और डिजिटल दुनिया में इसके बड़े प्रभाव हैं।


## Blockchain मानचित्र

तो हमारे पास डिजिटल रसीद के रूप में अक्षरों की यह लंबी श्रृंखला है, अब क्या? यहीं पर हम blockchain पर हुई गतिविधि को समझने में मदद के लिए एक [blockchain explorer](https://nym.com/blog/using-blockchain-privately), या मानचित्र, का उपयोग करते हैं। ऊपर देखें कि प्रत्येक chain का अपना [blockchain explorer](https://nym.com/blog/using-blockchain-privately) संस्करण है। यह समझना महत्वपूर्ण है कि ये सभी blockchain परियोजनाएँ open source software के उदाहरण हैं। अर्थात, कोई भी व्यक्ति अपनी पसंद के अनुसार code में योगदान दे सकता है या उसे fork कर सकता है। इस समझ के साथ, प्रत्येक परियोजना अलग-अलग क्षेत्रों में विशेषज्ञता रखती है और उस परियोजना की जरूरतों के अनुसार blockchain explorer को अनुकूलित करती है।

### Blocks
लेन-देन को *blocks* में रखा जाता है। जब किसी block को mine/validate किया जाता है, तो उस block के भीतर का प्रत्येक लेन-देन पुष्टि हो जाता है और एक block hash बनता है। बनाया गया कोई भी hash किसी block explorer में इनपुट किया जा सकता है। आपने देखा होगा कि CEX आपके funds जारी करने से पहले कई *confirmations* मांगते हैं; यह वही मानक है जिसका उपयोग वे यह सुनिश्चित करने के लिए करते हैं कि आपका लेन-देन पर्याप्त रूप से अंतिम हो चुका है। Blockchain यह कैसे तय करती है कि कौन-से लेन-देन अगले block में जाएंगे? यह शोध का जटिल विषय है, लेकिन अधिकांश आधुनिक chains यह तय करने के लिए *fees* की अवधारणा का उपयोग करती हैं कि पंक्ति में आगे कौन जाएगा। fee जितनी अधिक होगी, queue में आगे बढ़ने की संभावना उतनी ही अधिक होगी।

### पते

[blockchain explorers](https://nym.com/blog/using-blockchain-privately) को दृश्य रूप से सीखने का एक मज़ेदार तरीका है किसी भी यादृच्छिक लेन-देन का पता इनपुट करना। फिर आप समय में पीछे जा सकते हैं और देख सकते हैं कि funds कहाँ से आए थे! प्रत्येक लेन-देन में input और output, दोनों पते होते हैं। इस जानकारी के साथ, कोई भी व्यक्ति खर्च हो चुके किसी भी लेन-देन से आसानी से आगे और पीछे, दोनों दिशाओं में जा सकता है। पहेलियाँ पसंद करने वालों के लिए, यह एक विशाल वित्तीय पहेली का डिजिटल समकक्ष है और पारदर्शिता के उद्देश्यों के लिए उपयोग किया जा सकता है। Blockchain explorer का उपयोग इसे न केवल देखने में बहुत आसान बनाता है, बल्कि यह लेन-देन की गोपनीयता की आवश्यकता को *भी उजागर करता है*। जब तक आप shielded Zcash का उपयोग नहीं कर रहे हैं, आप किसी भी पारदर्शी blockchain के साथ यह कर सकते हैं: BTC, ETH, ATOM, DOGE, VTC, आदि ... । केवल डिजिटल भविष्य की ओर सुरक्षित रूप से बढ़ते हुए blockchain का उपयोग करने वाले हर व्यक्ति के लिए यह बात महत्वपूर्ण है।

### राशियाँ

ऊपर बताए गए पतों की तरह, किसी सार्वजनिक blockchain पर हर लेन-देन की राशियाँ सार्वजनिक रूप से उपलब्ध होती हैं। इसमें किसी भी लेन-देन के input और output, दोनों पतों की राशियाँ शामिल हैं। इसका एक अपवाद तब है जब आप Shielded Zcash का उपयोग चुनते हैं -- तब सभी राशियाँ छिपी होती हैं। छोटे व्यवसाय मालिकों के लिए, जिन्हें *निष्पक्ष व्यापार* हेतु गोपनीयता की आवश्यकता होती है, यह एक बड़ा लाभ है!

![amounts](/content-images/206312357-e9504151-830f-4fa1-81cb-f23619-210f51493c.webp)


### Zcash पर explorer क्या देख सकता है और क्या नहीं

#### संक्षेप में
- पारदर्शी (`t`) पते explorer पर पूरी तरह दिखाई देते हैं, बिल्कुल Bitcoin की तरह
- पूरी तरह shielded (z से z) लेन-देन राशि, पते और memo छिपाते हैं
- पूरी तरह shielded लेन-देन में भी fee दिखाई देती है
- Shielding (`t` से shielded में ले जाना) और deshielding (shielded से वापस `t` में) आंशिक रूप से दिखाई देते हैं, क्योंकि एक पक्ष पारदर्शी होता है
- गोपनीयता केवल तब तक बनी रहती है जब तक funds shielded pools के भीतर रहते हैं

Zcash में एक से अधिक प्रकार के पते हैं, और explorer उनके साथ बहुत अलग ढंग से व्यवहार करता है।

`t` से शुरू होने वाले पारदर्शी पते Bitcoin की तरह काम करते हैं। Explorer भेजने वाले, पाने वाले, राशि और funds कहाँ से आए, वहाँ तक का रास्ता दिखाता है।

Shielded पते निजी पक्ष हैं। Sapling या Orchard [shielded pools](https://zechub.wiki/using-zcash/shielded-pools#content) में मौजूद funds zero knowledge proofs द्वारा संरक्षित होते हैं। पूरी तरह shielded लेन-देन देखें और explorer राशि, पते या memo नहीं दिखा सकता। वह केवल यह पुष्टि कर सकता है कि एक वैध लेन-देन हुआ और वह किसी block में दर्ज हुआ। यह इस पृष्ठ के शीर्ष के पास दिखाया गया छिपा हुआ निजी उदाहरण है।

पूरी तरह shielded लेन-देन में भी एक विवरण दिखाई देता है: fee। Zcash consensus नियमों के अनुसार पारदर्शी fee को स्पष्ट रूप से बताना आवश्यक है, इसलिए explorer इसे हमेशा दिखा सकता है, भले ही राशियाँ छिपी हों। इस कारण standard wallet fee का उपयोग करना अच्छा अभ्यास है, ताकि असामान्य राशि का भुगतान करके आपका लेन-देन अलग न दिखे।

Explorer यह भी देख सकता है कि funds पारदर्शी और shielded पक्षों के बीच कब जाते हैं। `t` funds को किसी pool में ले जाना shielding है, और उन्हें वापस बाहर लाना deshielding है। ये पारगमन आंशिक रूप से दिखाई देते हैं क्योंकि एक पक्ष पारदर्शी है। केवल पूरी तरह निजी z से z गतिविधि, जो कभी `t` पते को नहीं छूती, fee को छोड़कर सब कुछ छिपाए रखती है।

मुख्य बात: गोपनीयता shielded pools के भीतर रहने पर निर्भर करती है। जब funds किसी `t` पते को छूते हैं, तो उनके इतिहास का वह भाग Bitcoin जितना ही सार्वजनिक हो जाता है। अपनी shielded गतिविधि को अपनी पसंद के किसी व्यक्ति, जैसे accountant, को प्रमाणित करने के लिए उसे सार्वजनिक करने के बजाय Viewing Key साझा करें। [Viewing Keys](https://zechub.wiki/zcash-tech/viewing-keys#content) पृष्ठ देखें।


### Zcash Block Explorer की सूची

- [Zcash Block Explorer](https://mainnet.zcashexplorer.app/)

- [Blockchair](https://blockchair.com)

- [3xpl](https://3xpl.com/zcash)

- [Bitquery](https://explorer.bitquery.io/zcash)


### दृश्य मार्गदर्शिका

यहाँ अलग-अलग blockchain explorer के चार अच्छे उदाहरण हैं:

* [Mempool.space](https://mempool.space)
* [Ethscan](https://etherscan.io/)
* [Zcash Block Explorer](https://mainnet.zcashexplorer.app)
* [Mintscan](https://hub.mintscan.io/chains/ibc-network)


![bitcoinExlporer](/content-images/206279968-a06eb0a1-b3a6-49af-a30f-7d871b-1418d95d28.webp)


![ethExplorer](/content-images/206280208-2ce5eddd-157e-4eed-90a0-680c15-488292c345.webp)


![zcashExplorer](/content-images/206280454-a2c7563f-e82d-47b9-9b58-02eece-76db7aec4c.webp)


![cosmos](/content-images/206316791-2debfd28-923a-44f4-b7d3-701182-cf39a065fc.webp)
