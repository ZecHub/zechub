# Zcash Avalanche RedBridge

Zcash Avalanche RedBridge एक विकेंद्रीकृत bridge है जो Zcash (ZEC) और Avalanche (AVAX) blockchains के बीच interoperability को सक्षम बनाता है। यह bridge ZEC को Avalanche blockchain पर निर्बाध रूप से ट्रांसफर करने के लिए डिज़ाइन किया गया है, जिसमें Avalanche की high throughput, low fees, और ecofriendly consensus mechanisms का लाभ लिया जाता है, जबकि Zcash की privacy centric विशेषताओं को सुरक्षित रखा जाता है।

RedBridge विभिन्न प्रकार के उपयोग मामलों का समर्थन करता है, जिनमें crosschain decentralized finance (DeFi), private transactions, और liquidity sharing शामिल हैं, जिससे Zcash धारकों को Avalanche ecosystem तक विस्तृत पहुंच मिलती है। यह bridge विकेंद्रीकृत nodes के एक समूह और एक oracle के माध्यम से संचालित होता है, जिसे **ZavaX** कहा जाता है, जो Zcash और Avalanche के बीच विश्वसनीय data transfer और price verification सुनिश्चित करता है।

### Key Features

Privacy Preserving Interoperability: Zcash उपयोगकर्ताओं को Avalanche पर DeFi applications का उपयोग करते समय privacy बनाए रखने की अनुमति देता है।
Decentralized Oracle ZavaX: एक oracle system को एकीकृत करता है ताकि सटीक ZEC/AVAX price data सुनिश्चित किया जा सके, जिससे trustless crosschain operations संभव हों।
Scalable and Eco Friendly: Avalanche के consensus model का उपयोग करता है, जो न्यूनतम पर्यावरणीय प्रभाव के साथ high speed transactions प्रदान करता है।
Support for DeFi and DApps: Zcash धारक अब privacy से समझौता किए बिना Avalanche पर विभिन्न DeFi platforms में भाग ले सकते हैं।

### Technical Components

**Decentralized ZavaX Oracle**
विवरण: ZavaX oracle bridge के लिए अत्यंत महत्वपूर्ण है, जो crosschain price feeds प्रदान करता है और trustless ZEC से AVAX conversions को सक्षम बनाता है।
[Oracle का लिंक](https://zavax-oracle.red.dev)

**Cross Chain Bridge Contract**
विवरण: smart contract architecture जो Zcash Avalanche bridge को समर्थन देता है, ZEC के deposits, conversions, और withdrawals को संभालता है।

**Privacy Layer Integration**
विवरण: यह सुनिश्चित करता है कि bridging process के दौरान Zcash की privacy features सुरक्षित रहें, जिससे private crosschain transactions संभव हों।

## Deliverables and Documentation

**Avalanche पर Zcash Elastic Subnet Bridge**: [Grant Proposal](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/36243580/)
नीचे Zcash Avalanche RedBridge project के लिए पूर्ण किए गए प्रमुख deliverables और technical resources दिए गए हैं:

Deliverable 1.1: प्रारंभिक PoC जो testnet Avalanche subnet से एक CLI के माध्यम से testnet Zcash transactions को query करने का समर्थन करता है, Github पर प्रकाशित, और Avalanche testnet पर one node subnet के साथ। https://github.com/red-dev-inc/zavax-oracle

Deliverable 2.1: [Architecture](https://github.com/red-dev-inc/zavax-bridge/tree/main/Architecture)


### Milestone 3 March 31, 2024

Deliverable 3.1 पूर्ण हो चुका है, जिसमें ZavaX bridge में threshold signatures के लिए BLS की बजाय FROST अपनाने पर हमारा विश्लेषण प्रस्तुत किया गया है। यह बदलाव Zcash Foundation की audited libraries का लाभ उठाता है और बेहतर integration तथा security को सक्षम बनाता है। https://github.com/ZcashFoundation/frost

Deliverable 3.2 GUI के लिए UX और UI design पूर्ण हो चुका है, जिसमें ZavaX Oracle subnet के लिए हमारे security enhancements का विवरण दिया गया है, जिन्हें penetration testing results का समर्थन प्राप्त है। अधिक जानकारी के लिए, जिसमें server configuration और testing outcomes शामिल हैं, देखें [Security Assesment](https://github.com/red-dev-inc/zavax-oracle/blob/main/security/deployment-notes.md)
[Audit Report](https://github.com/red-dev-inc/zavax-oracle/blob/main/security/pen-testing-report-2024-09.md)
इसके अतिरिक्त, टीम ने ZavaX से redbridge के रूप में rebrand किया और अपने staking token को ZAX से RBR में बदल दिया।

### Milestone 4 April 30, 2024
Deliverable 4.1 Zcash और Avalanche testnets पर पूर्णतः कार्यशील deployment, 3 validator Subnet के साथ, CLI support सहित

### Milestone 5 May 31, 2024
Deliverable 5.1 GUI: Core या Webapp में bridge integration

Milestone 6 June 30, 2024
Deliverable 6.1 software audit का सफलतापूर्वक पास होना
Deliverable 6.2 audited source code को एक public Github repo में प्रकाशित करना

[Github repo](https://github.com/red-dev-inc/zavax-bridge/tree/main/Architecture) पर एक नज़र डालें
  
अधिक technical details के लिए, उपयोगकर्ताओं को RedBridge project के repository और documentation की समीक्षा करने के लिए प्रोत्साहित किया जाता है ताकि वे integration specifics, testing frameworks, और security protocols को [explore](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/36243580/) कर सकें।


![img1](https://github.com/user-attachments/assets/b8c5d267-1711-458a-8a32-1df9d56fae8a)


* Deliverables: 
Q1 2025 में, टीम ने [red·bridge demo website](https://redbridge-demo.red.dev/index.html) के लॉन्च की घोषणा की, जहाँ कोई भी user experience को आज़मा सकता है, feedback दे सकता है, और सुधार सुझा सकता है। यह गैर-तकनीकी लोगों को project से परिचित कराने का एक आसान तरीका भी है।

* टीम ने red·bridge के अंतिम संस्करण के लिए Zebra का उपयोग किया। इसका परीक्षण करने के लिए, उन्होंने अपने test blockchain, ZavaX Oracle, के तीन में से दो nodes को upgrade किया, जो Avalanche के Fuji testnet पर चलता है। अंतिम node भी सफलतापूर्वक upgrade किया गया, और अब [Zavax Oracle](https://zavax-oracle.red.dev/) अब ZEBRA पर चल रहा है!

* 2025 की Q1 में, red.bridge website को इस तरह code किया गया कि वह प्रारंभिक version, जो केवल red था, की तुलना में red, Dark, Light, और Zebra — ये चार views प्रदान करे।

* एक और महत्वपूर्ण बात यह है कि टीम दिसंबर 2025 में Avalanche mainnet पर red·bridge L1 को live सक्रिय करेगी। शुरुआत में, यह Zcash blockchain के लिए एक oracle के रूप में काम करेगा और उसके तुरंत बाद Bitcoin के लिए भी। इसमें प्रत्येक request पर gas token के रूप में 0.001 AVAX की लागत आएगी। यह build Avalanche पर किसी भी L1 या smart contract को Zcash और Bitcoin से data को विकेंद्रीकृत तरीके से कम लागत पर query करने में सक्षम बनाएगा।

* Q2 में, टीम ने एक milestone ACP-77 (जिसे Avalanche9000 के नाम से जाना जाता है) Avalanche Foundation को प्रस्तुत किया ताकि red.bridge guardian को चलाना पहले की तुलना में अधिक जल्दी और सभी के लिए अधिक किफायती बनाया जा सके। शुरुआत में, validators को लगभग 2000 AVAX stake करना पड़ता था; हालांकि, Avalanche9000costs के साथ, validators को केवल 1 AVAX (month) की आवश्यकता थी। इसके अतिरिक्त, यह milestone ZF के FROST implementation का उपयोग करने की योजना को भी अंतिम रूप देता है, जो प्रत्येक Guardian को bridge wallet के सुरक्षित, distributed control के लिए एक signing share प्रदान करता है।

* 2026 की Q1 और Q2 में, red.bridge Zcash और Avalanche community members के लिए अपने RBR token (पूर्व में ZAX) airdrop की मेज़बानी करेगा। red.dev के संस्थापक के अनुसार, वे एक incentivized testnet आयोजित करेंगे जहाँ उपयोगकर्ताओं को bridge के परीक्षण में मदद करते हुए RBR कमाने का अवसर मिलेगा।
