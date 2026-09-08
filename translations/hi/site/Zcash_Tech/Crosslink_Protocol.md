<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Crosslink_Protocol.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Crosslink प्रोटोकॉल

## संक्षेप में

* Crosslink प्रोटोकॉल Zcash के hybrid Proof-of-Work/Proof-of-Stake (PoW/PoS) चरण के लिए एक प्रस्तावित डिज़ाइन है। यह PoW को Byzantine Fault Tolerance (BFT) प्रोटोकॉल के साथ एकीकृत करता है, जिससे सुनिश्चित finality मिलती है, जब तक PoW या PoS में से कोई एक सुरक्षित बना रहता है।
* Hybrid PoS notaries को प्रस्तुत करता है, जो staked ZEC के आधार पर blocks का सत्यापन करते हैं — शुरुआत में स्थिर, बाद में staked ZEC के आधार पर चुने गए।
* Crosslink का लक्ष्य दो ledgers प्रदान करना है: rollback सुरक्षा के लिए एक **finalized ledger (LOG_fin)**, और एक **कम-विलंबता वाला ledger (LOG_ba)** जो इसे अधिकतम *L* blocks तक बढ़ाता है।
* यदि finalized ledger *L* blocks से अधिक पीछे रह जाता है, तो एक **Safety Mode** सक्रिय हो जाता है: PoW जारी रहता है, लेकिन समस्या के समाधान तक आर्थिक गतिविधियाँ रोक दी जाती हैं।
* समय के साथ, PoS validators को rewards का बढ़ता हुआ हिस्सा मिलेगा, जिससे PoW miners की आय घटेगी; प्रोटोकॉल बदलावों को धीरे-धीरे लागू करता है।
* यह प्रोटोकॉल Shielded Labs द्वारा विकसित किया जा रहा है, और Crosslink 2* को Zcash के Zebra client में एकीकृत करने के लिए एक roadmap मौजूद है।

## मुख्य व्याख्या

### परिचय: Zcash Hybrid PoS और Crosslink प्रोटोकॉल

Crosslink प्रोटोकॉल Zcash के विकास में एक महत्वपूर्ण प्रगति है, जो इसे **Hybrid Proof-of-Stake (PoS)** और **Proof-of-Work (PoW)** मॉडल की ओर ले जाती है। पारंपरिक PoW, नेटवर्क सुरक्षा सुनिश्चित करने के लिए विश्वसनीय होने के बावजूद, ऊर्जा खपत और industrial mining से जुड़े केंद्रीकरण जोखिमों के कारण आलोचना का सामना करता है। Crosslink एक hybrid system प्रस्तुत करता है, जो PoW की सिद्ध मज़बूती को PoS की दक्षता और governance लाभों के साथ मिलाता है।

![image](/content-images/a2ffb19d-e570-4723-b669-a66e14fc6b71-a727c958de.webp)

यह बदलाव blockchain innovation के वैश्विक रुझानों के अनुरूप है, जहाँ परियोजनाएँ पर्यावरणीय रूप से टिकाऊ और विकेंद्रीकृत तंत्रों की ओर बढ़ रही हैं। Crosslink का dual consensus model सुनिश्चित करता है कि Zcash अपनी मज़बूत cryptographic privacy guarantees बनाए रखे, साथ ही समकालीन चुनौतियों का सामना करने के लिए विकसित हो।

Hybrid Proof-of-Stake (PoS) दृष्टिकोण पारंपरिक Proof-of-Work (PoW) को PoS के साथ मिलाता है, जिसका उद्देश्य 51% attacks जैसी कमज़ोरियों का समाधान करना है, साथ ही विकेंद्रीकरण बनाए रखना और ऊर्जा खपत कम करना है। Hybrid PoS notaries को प्रस्तुत करता है, जो staked ZEC के आधार पर blocks का सत्यापन करते हैं। यह तंत्र chain security और checkpoint validation को बेहतर बनाने के लिए डिज़ाइन किया गया है, और pure PoW systems की तुलना में अधिक मज़बूत विकल्प प्रदान करता है।

### पहले परीक्षण के रूप में Hybrid PoS/PoW क्यों?

* यह pure PoS की दिशा में प्रगति करता है।
* यह mining और staking के समवर्ती उपयोग मामलों तथा ecosystem crossover को सक्षम बनाता है।
* यह PoS प्रोटोकॉल से जुड़े संभावित सुरक्षा मुद्दों को कम करता है, जब तक कि उसके पास अधिक validator stake और विश्वास न हो जाए।
* इस सामान्य दृष्टिकोण को Ethereum ने Production में प्रदर्शित किया है।

### Crosslink क्या है

Crosslink प्रोटोकॉल Zcash के hybrid Proof-of-Work/Proof-of-Stake (PoW/PoS) चरण के लिए एक प्रस्तावित डिज़ाइन है। यह PoW को Byzantine Fault Tolerance (BFT) प्रोटोकॉल के साथ एकीकृत करता है, जिससे सुनिश्चित finality मिलती है, जब तक PoW या PoS में से कोई एक सुरक्षित बना रहता है। इस डिज़ाइन का उद्देश्य staked validation को शामिल करके, और miners की भागीदारी बनाए रखते हुए, नेटवर्क सुरक्षा और विकेंद्रीकरण को मज़बूत करना है। प्रस्ताव की एक प्रमुख विशेषता, जिसे Crosslink 2 कहा जाता है, BFT proposers और miners को एकीकृत करके architecture को सरल बनाती है। यह सुव्यवस्थित दृष्टिकोण संरचनात्मक परिवर्तनों को न्यूनतम करता है और एक "dummy" BFT layer के उपयोग की अनुमति देता है, जिससे prototype बनाना और deploy करना आसान हो जाता है, जबकि उच्च सुरक्षा मानक बने रहते हैं।

Implementation plan में Zcash के Zebra client में Crosslink 2* को एकीकृत करने के लिए अनुमानित engineering costs सहित एक roadmap शामिल है। यह चरणबद्ध deployment stakeholder incentives को संतुलित करने, व्यवधान कम करने, और scalability, usability, तथा decentralization के लिए Zcash के लक्ष्यों के अनुरूप रहने पर केंद्रित है। प्रोटोकॉल की मज़बूत security properties में बढ़ता विश्वास इसे Zcash के विकास में एक महत्वपूर्ण कदम के रूप में और मजबूत करता है। ऊर्जा दक्षता को संबोधित करके और consensus mechanisms को बेहतर बनाकर, Crosslink बदलती blockchain चुनौतियों के लिए एक दूरदर्शी समाधान प्रदान करता है। अधिक जानकारी के लिए, [GitHub repository](https://github.com/ShieldedLabs/crosslink-deployment) और [Zcash Community Forum](https://forum.zcashcommunity.com) देखें।

### Crosslink के लक्ष्य और उद्देश्य

Crosslink प्रोटोकॉल को Zcash के भविष्य के लिए महत्वपूर्ण कई रणनीतिक लक्ष्यों को संबोधित करने हेतु डिज़ाइन किया गया है:

1. **विकेंद्रीकरण**:
   * PoS को शामिल करके, Zcash विशेषीकृत PoW hardware (ASICs) पर निर्भरता कम करता है, जो अक्सर कुछ बड़े operators के बीच mining power को केंद्रित कर देता है।
   * PoS व्यापक समुदाय की भागीदारी की अनुमति देता है, जहाँ coinholders अपने assets को नेटवर्क सुरक्षित करने के लिए stake करते हैं, जिससे अधिक वितरित consensus सुनिश्चित होता है।
   * Staked validation को प्रस्तुत करके, प्रोटोकॉल सुनिश्चित करता है कि आर्थिक प्रतिभागी consensus में सक्रिय भूमिका निभाएँ, जिससे केवल mining पर निर्भरता कम होती है।
2. **बेहतर Governance**:
   * Coinholders staking के माध्यम से voting rights प्राप्त करते हैं, जिससे वे network upgrades, funding allocations, और ecosystem priorities से जुड़े निर्णयों को प्रभावित कर सकते हैं। यह लोकतांत्रिक तंत्र प्रोटोकॉल के विकास को समुदाय के हितों के साथ संरेखित करता है।
3. **ऊर्जा दक्षता**:
   * आंशिक रूप से PoS में परिवर्तन ऊर्जा की मांग को काफी कम करता है, जिससे Zcash वैश्विक sustainability initiatives के अनुरूप हो जाता है। PoS स्वाभाविक रूप से computationally heavy PoW की तुलना में कम resource-intensive है। Hybrid systems का उद्देश्य उच्च सुरक्षा बनाए रखते हुए केवल-PoW systems की तुलना में ऊर्जा उपयोग कम करना है।
4. **आर्थिक सुरक्षा और स्थिरता**:
   * PoW और PoS को मिलाने से नेटवर्क प्रतिभागियों के लिए आर्थिक incentives विविध हो जाते हैं, जिससे किसी एक तंत्र पर अत्यधिक निर्भर हुए बिना मज़बूत सुरक्षा सुनिश्चित होती है।
   * Staking प्रतिभागियों के लिए एक पूर्वानुमेय reward model भी प्रस्तुत करता है, जिससे यह दीर्घकालिक निवेशकों के लिए आकर्षक बनता है।
5. **बढ़ी हुई सुरक्षा**: Crosslink का उद्देश्य PoW के साथ PoS को एकीकृत करके chain reorganization attacks के विरुद्ध नेटवर्क की resilience बढ़ाना है।

## दृश्य / उपमा

![image](/content-images/b34afda4-fe33-448f-b0dd-279fd6cef1f5-73f58cdcc6.webp)

एक parcel service की कल्पना करें जो एक ही delivery के लिए दो अलग-अलग documents जारी करती है। पहला tracking scan है: यह जल्दी दिखाई देता है, आपको बताता है कि parcel सबसे अधिक संभावना से कहाँ है, और कभी-कभी इसमें सुधार किया जाता है। दूसरा signed delivery receipt है: यह बाद में आता है, लेकिन एक बार आने के बाद कोई उस पर विवाद नहीं करता।

कम-विलंबता वाला ledger tracking scan जैसा है, और finalized ledger signed receipt जैसा है। दोनों घटनाओं की एक ही श्रृंखला का वर्णन करते हैं; अंतर केवल इस बात में है कि वे कितनी जल्दी दिखाई देते हैं और कितनी दृढ़ता से टिके रहते हैं।

Safety Mode वैसा है जैसा depot तब करता है जब signed receipts आना बंद हो जाती हैं लेकिन scans जमा होते रहते हैं। Parcels अभी भी building के भीतर चलते रहते हैं — लेकिन office केवल scans के आधार पर भुगतान करना बंद कर देता है, जब तक signatures फिर से बराबरी पर न आ जाएँ।

## गहराई से समझें

### Crosslink के सुरक्षा और प्रदर्शन लक्ष्य

Crosslink प्रोटोकॉल का लक्ष्य Zcash के लिए दो प्रकार के ledgers प्रदान करना है: एक **finalized ledger (LOG_fin)** और एक **कम-विलंबता वाला ledger (LOG_ba)**। Finalized ledger, Byzantine Fault Tolerance (BFT) या blockchain (BC) प्रोटोकॉल में से किसी एक के बारे में उचित मान्यताओं के तहत rollback सुरक्षा सुनिश्चित करता है। इसे network partitions के दौरान भी live और secure बने रहने के लिए डिज़ाइन किया गया है, और इसकी latency वर्तमान Zcash blockchain की तुलनीय block confirmations की तुलना में थोड़ा अधिक से दोगुनी है।

कम-विलंबता वाला ledger finalized ledger को अधिकतम *L* blocks तक बढ़ाता है। यह केवल blockchain प्रोटोकॉल के अंतर्गत rollback सुरक्षा सुनिश्चित करता है और latency तथा security को मौजूदा Zcash model से खराब नहीं होने देता। सुव्यवस्थित Crosslink 2* डिज़ाइन में, कम-विलंबता वाला ledger एक PoW chain के रूप में कार्य करके development और adoption को सरल बनाता है।

![image](/content-images/fd039664-4852-4fb0-8c88-0615f1ed116e-41459b81dc.webp)

### सीमित उपलब्धता और Safety Mode

Crosslink **Safety Mode** को शामिल करता है ताकि उस जोखिम का समाधान किया जा सके जिसमें कम-विलंबता वाला ledger finalized ledger से बहुत आगे निकल जाए। यह असंगतियों को रोकता है, जैसे असंतुलित account states या service providers द्वारा अस्थायी समाधानों में अप्रमाणित security gaps। यदि finalized ledger एक स्थिरांक *L* blocks से अधिक पीछे रह जाता है, तो Safety Mode सक्रिय हो जाता है। इस स्थिति में blockchain PoW operations जारी रखता है (मूलभूत सुरक्षा सुनिश्चित करते हुए), लेकिन समस्या के समाधान तक आर्थिक गतिविधियाँ रोक दी जाती हैं। यह तंत्र बड़े attacks जैसी असाधारण परिस्थितियों से उबरने के लिए डिज़ाइन किया गया है, जबकि governance-आधारित rollback policies का समर्थन भी करता है।

### तकनीकी विवरण और परिनियोजन

Crosslink प्रोटोकॉल को Shielded Labs द्वारा Zodl जैसे प्रमुख ecosystem partners के सहयोग से सक्रिय रूप से विकसित और deploy किया जा रहा है। प्रोटोकॉल के implementation में शामिल हैं:

* PoS प्रतिभागियों के लिए सुरक्षित staking mechanisms स्थापित करना।
* Miners और stakers के बीच incentives का संतुलन बनाने के लिए reward structure में बदलाव करना।
* परिवर्तन के दौरान backward compatibility और निर्बाध user experience सुनिश्चित करना।
* Notary System: प्रोटोकॉल में notaries शामिल हैं जो blocks पर sign-off करते हैं। शुरुआत में static notaries उपयोग किए जाते हैं, और बाद में ऐसे dynamic system में बदलाव होता है जहाँ notaries staked ZEC के आधार पर चुने जाते हैं।
* Activation Logic: Crosslink की शुरुआत के लिए Zcash consensus rules में बदलाव आवश्यक हैं, जिनमें stake distribution process को परिभाषित करना और hybrid consensus का समर्थन करने के लिए network protocol rules को अपडेट करना शामिल है।
* Phased Deployment: नेटवर्क स्थिरता और समुदाय के अनुकूलन को सुनिश्चित करने के लिए प्रोटोकॉल चरणों में लागू किया जाएगा। शुरुआती चरण technical implementation पर केंद्रित हैं, इसके बाद notaries के चयन के लिए governance integration आएगा।

आप [GitHub पर Crosslink Deployment Repository](https://github.com/ShieldedLabs/crosslink-deployment) के माध्यम से तकनीकी विवरण देख सकते हैं और इसकी प्रगति का अनुसरण कर सकते हैं।

## व्यावहारिक प्रभाव

### PoW Miners की आय पर प्रभाव

Crosslink, Zcash के शुरुआती विकास में PoW miners की आधारभूत भूमिका को स्वीकार करता है, साथ ही क्रमिक बदलाव की तैयारी भी करता है:

* **Block Rewards में कमी**:
  * समय के साथ, PoS validators को rewards का बढ़ता हुआ हिस्सा मिलेगा, जिससे PoW miners की आय घटेगी। यह पुनर्वितरण hybrid model में PoW की घटती भूमिका को दर्शाता है।
* **न्यायसंगत परिवर्तन**:
  * प्रोटोकॉल बदलावों को धीरे-धीरे प्रस्तुत करता है, जिससे miners को अनुकूलन करने या Zcash ecosystem के भीतर नई भूमिकाओं की खोज करने के लिए पर्याप्त समय मिलता है, जैसे staking में संक्रमण या अन्य network services में योगदान।
* **केंद्रीकरण जोखिमों को कम करना**:
  * PoS staking pools को शक्ति के संकेंद्रण को रोकने के लिए डिज़ाइन किया गया है, जिससे छोटे प्रतिभागियों को समान स्तर पर भाग लेने का अवसर मिलता है। यह समावेशी दृष्टिकोण ASIC-आधारित mining में दिखने वाले मौजूदा संकेंद्रण का मुकाबला करता है।
* PoW miners की आय कम होगी क्योंकि block reward का एक हिस्सा PoS validators को पुनः आवंटित किया जाएगा। यह पुनः आवंटन एक संतुलित incentive system सुनिश्चित करता है, जो नेटवर्क को सुरक्षित करने के लिए miners और stakers दोनों को पुरस्कृत करता है।
* Stakeholder participation को बढ़ावा देते हुए miners पर आर्थिक प्रभाव को कम करने के लिए एक क्रमिक बदलाव की योजना बनाई गई है।

यह dual-consensus mechanism privacy, sustainability, और decentralization के प्रति Zcash की प्रतिबद्धता को मजबूत करता है, और इसे blockchain क्षेत्र में एक दूरदर्शी नेता के रूप में स्थापित करता है।

## सामान्य गलतियाँ

**Crosslink को एक सक्रिय consensus rule के रूप में पढ़ना**। यह पृष्ठ चरणबद्ध deployment plan के साथ एक प्रस्तावित डिज़ाइन का वर्णन करता है। इसे लागू करने के लिए Zcash consensus rules में बदलाव आवश्यक हैं, और roadmap तथा Zebra integration work इसी के लिए हैं।

**यह मान लेना कि PoS mining की जगह ले लेता है**। Crosslink एक hybrid डिज़ाइन है: PoW block production staked validation के साथ-साथ जारी रहता है। Safety Mode में भी, blockchain PoW operations जारी रखता है जबकि आर्थिक गतिविधियाँ रोक दी जाती हैं।

**"Finality" को तेज़ confirmation समझ लेना**। Finalized ledger को वर्तमान Zcash blockchain की तुलनीय block confirmations की तुलना में थोड़ा अधिक से दोगुनी latency के लिए डिज़ाइन किया गया है। यह जो जोड़ता है वह rollback सुरक्षा है, गति नहीं — तेज़ दृश्य कम-विलंबता वाला ledger है।

**दोनों ledgers को भ्रमित करना**। LOG_ba कोई अलग chain नहीं है: यह finalized ledger को अधिकतम *L* blocks तक बढ़ाता है, और Crosslink 2* डिज़ाइन में यह एक PoW chain के रूप में कार्य करता है।

## संबंधित पृष्ठ

- [Zebra पूर्ण नोड](/zcash-tech/zebra-full-node) — वह client जिसमें Crosslink 2* को एकीकृत करने की योजना है।
- [पूर्ण नोड](/zcash-tech/full-nodes) — आज नोड hybrid consensus बदलाव से पहले consensus rules का सत्यापन कैसे करते हैं।
- [Network Upgrades](/start-here/network-upgrades) — consensus rule changes Zcash network तक कैसे पहुँचते हैं।
- [Zcash Monetary Policy](/start-here/zcash-monetary-policy) — वह block reward structure जिसे Crosslink पुनर्वितरित करेगा।

## अतिरिक्त संसाधन

- सामुदायिक अंतर्दृष्टि: [Zcash Community Forum - Crosslink चर्चाएँ](https://forum.zcashcommunity.com)
- आधिकारिक अपडेट: [Electric Coin Company ब्लॉग](https://electriccoin.co)
- स्थिरता पर ध्यान: [Zcash के लिए Hybrid PoS क्यों महत्वपूर्ण है](https://forum.zcashcommunity.com)

  संदर्भ:

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
     <iframe
       className="w-full h-full"
       src="https://www.youtube.com/embed/O4wQi_i7k0I"
       title="Crosslink"
       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
       allowFullScreen
       loading="lazy"
     />
</div>
