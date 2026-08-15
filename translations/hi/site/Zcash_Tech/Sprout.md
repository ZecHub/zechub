---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Sprout.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Sprout

> Zcash की शुरुआत 28 अक्टूबर 2016 को Sprout shielded pool के साथ हुई थी।

आप यहाँ से यह समझकर जाएँगे: Sprout वह बिंदु है जहाँ Zcash की शुरुआत हुई — पहली बार निजी, सत्यापन योग्य धन एक live blockchain पर चला।

Sprout, Zcash नेटवर्क का मूल लॉन्च है, कोई बाद का [network upgrade](../start-here/network-upgrades) नहीं। यह 28 अक्टूबर 2016 को genesis block पर live हुआ था। Sprout को कोई numbered ZIP परिभाषित नहीं करता: ZIP प्रक्रिया बाद में Overwinter के साथ शुरू हुई, इसलिए Sprout का वर्णन मूल Zcash Protocol Specification और उस Zerocash construction द्वारा किया जाता है जिस पर इसे बनाया गया था। Zooko Wilcox के नेतृत्व में [Electric Coin Company](../zcash-organizations/electric-coin-company) (तब Zerocoin Electric Coin Company) ने इसे बनाया और जारी किया। Sprout ने पहले व्यावहारिक zk-SNARK shielded transactions और मूल shielded pool को पेश किया, ताकि लोग ZEC भेज सकें जबकि प्रेषक, प्राप्तकर्ता, और राशि छिपी रहे, और नेटवर्क फिर भी जाँच सके कि बैलेंस सही बैठते हैं। इस नाम ने एक युवा, अंकुरित होती chain का संकेत दिया, जिसके बारे में टीम को उम्मीद थी कि वह आगे बढ़ेगी।

यह क्यों महत्वपूर्ण है। Sprout से पहले हर public blockchain आपके भुगतानों को सबके सामने रखती थी: कोई भी देख सकता था कि किसने किसे कितना भुगतान किया। Sprout पहला live, permissionless नेटवर्क था जिसने इन विवरणों को छिपाया और फिर भी यह साबित किया कि कोई धोखाधड़ी नहीं कर रहा। यह सामान्य वित्तीय गोपनीयता के लिए महत्वपूर्ण है, वैसी ही जैसी आप नकद या ऐसे bank statement से अपेक्षा करते हैं जिसे कोई और न पढ़ सके। इसने यह भी साबित किया कि मज़बूत on-chain privacy व्यवहार में काम कर सकती है, केवल किसी paper design से आगे बढ़कर। जिस trusted-setup Ceremony ने इसे संभव बनाया, वह बाद के cryptography कार्य के लिए एक reference point बन गई, और Sprout के साथ जारी की गई धीमी, memory-heavy proving system ने ही टीम को दो साल बाद Sapling बनाने के लिए प्रेरित किया।

## पहला shielded pool

Sprout ने दो प्रकार के addresses बनाए। Transparent addresses (t-addresses) Bitcoin की तरह काम करते हैं, जहाँ विवरण public ledger पर दिखाई देते हैं। Shielded addresses (z-addresses) फंड्स को Sprout [shielded pool](../using-zcash/shielded-pools) में भेजते हैं, जहाँ प्रेषक, प्राप्तकर्ता, और राशि छिपी रहती है। इसका तरीका [zk-SNARKs](../zcash-tech/zk-snarks) है, यानी zero-knowledge proofs, जो किसी transaction को यह दिखाने देते हैं कि वह वैध है — बिना double spend के और सही जोड़ते हुए balances के साथ — लेकिन कोई भी विवरण उजागर किए बिना। यह पहली बार था जब यह किसी live cryptocurrency में production में चला।

![Transparent transactions expose sender, receiver, and amount, while Sprout shielded transactions hide all three yet stay verifiable](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sprout-shielded-vs-transparent.png)

## Ceremony

Sprout में zk-SNARKs को public parameters के एक सेट की आवश्यकता थी, और उन्हें सुरक्षित रूप से तैयार करने के लिए एक one-time setup चाहिए था जिसे Ceremony कहा गया। अलग-अलग, दूरस्थ स्थानों पर मौजूद छह प्रतिभागियों ने एक-एक secret piece बनाया, जिसे toxic waste कहा गया। यदि कोई कभी उन सभी pieces को फिर से जोड़ देता, तो वह शून्य से ZEC गढ़ सकता था। इस design ने उस जोखिम को एक सरल नियम में बदल दिया: जब तक कम से कम एक प्रतिभागी अपने piece को नष्ट कर दे, पूरा secret फिर कभी पुनर्निर्मित नहीं किया जा सकता, इसलिए counterfeit करना असंभव बना रहता। जिन प्रतिभागियों के नाम सार्वजनिक रूप से बताए गए हैं, उनमें Zooko Wilcox, Andrew Miller, Peter Van Valkenburgh, Peter Todd, और NCC Group के Derek Hinch शामिल हैं। एक प्रतिभागी ने गुमनाम रहने का विकल्प चुना।

![The Ceremony: six participants generate private shards, then destroy the toxic waste, leaving only the public Sprout parameters](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sprout-ceremony-flow.png)

## उत्पत्ति

Sprout वह baseline है जिस पर बाद के सभी बदलाव निर्मित हुए। जब Overwinter के साथ network-upgrade mechanism आया, तो उसने मूल नियमों को consensus branch id 0 के रूप में लेबल किया, जिसका सीधा अर्थ है कि अभी तक कोई upgrade लागू नहीं हुआ है। उसके बाद से सब कुछ (Overwinter, Sapling, Blossom, Heartwood, Canopy, NU5, NU6, और आगे भी) उसी chain पर आधारित है जिसकी शुरुआत Sprout ने की। लॉन्च की घोषणा अगस्त 2016 में 28 अक्टूबर genesis के लिए की गई थी, Ceremony उससे पहले के हफ्तों में हुई, और genesis block का hardcoded timestamp 28 अक्टूबर 2016, 07:56 UTC दर्ज है।

![Timeline from the August 2016 announcement through the parameter Ceremony to the October 28, 2016 Sprout launch](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sprout-timeline.png)

## शब्दावली

| शब्द | सरल अर्थ |
|---|---|
| zk-SNARK | एक zero-knowledge proof जो यह दिखाता है कि transaction वैध है, बिना प्रेषक, प्राप्तकर्ता, या राशि बताए |
| Shielded pool | Zcash का निजी भाग जहाँ राशि और संबंधित पक्ष छिपे रहते हैं। Sprout pool पहला था |
| z-address और t-address | z-address shielded होता है और विवरण निजी रखता है। t-address transparent होता है और public ledger पर विवरण दिखाता है |
| Ceremony | 2016 का multi-party setup जिसने Sprout के public parameters तैयार किए और फिर toxic waste को नष्ट कर दिया |
| Toxic waste | Ceremony से जुड़े secret key pieces जिन्हें नष्ट करना आवश्यक था ताकि ZEC गढ़ा न जा सके |
| Consensus branch id 0 | Sprout के नियमों का लेबल, जिसका अर्थ है किसी भी network upgrade से पहले की baseline |

## अक्सर पूछे जाने वाले सवाल

क्या Sprout आज मेरे ZEC या मेरी privacy को बदलता है? नहीं। Sprout इतिहास है, वह लॉन्च जिससे उस chain की शुरुआत हुई जिस पर आपका ZEC मौजूद है। आज आपके coins और आपकी privacy इस बात पर निर्भर करते हैं कि आप अभी कौन-सा wallet और कौन-सा shielded pool इस्तेमाल कर रहे हैं, न कि Sprout के बारे में आपको कुछ अलग करने की ज़रूरत है।

Sprout के लिए कोई ZIP number क्यों नहीं है? ZIP प्रक्रिया बाद में, Overwinter upgrade के साथ शुरू हुई। Sprout मूल लॉन्च है, जिसका वर्णन Zcash Protocol Specification और उस Zerocash construction द्वारा किया गया है जिस पर यह आधारित था। ZIP 200 केवल बाद की दृष्टि से Sprout का उल्लेख करता है, consensus branch id 0 के रूप में — किसी भी upgrade से पहले की baseline।

क्या मुझे Ceremony में शामिल उन छह लोगों पर भरोसा करना पड़ता था? Setup इस तरह बनाया गया था कि आपको उनमें से केवल एक के ईमानदार होने की ज़रूरत थी। हर एक के पास एक secret piece था, और जब तक एक भी प्रतिभागी अपना piece नष्ट कर देता, पूरा secret फिर कभी पुनर्निर्मित नहीं किया जा सकता था और कोई भी ZEC गढ़ नहीं सकता था। पाँच प्रतिभागियों के नाम सार्वजनिक रूप से बताए गए और एक गुमनाम रहा।

क्या Sprout pool वही है जिसका उपयोग मेरा wallet अभी करता है? शायद नहीं। Sprout पहला shielded pool था, लेकिन बाद के upgrades जैसे Sapling ने एक तेज़ shielded design पेश किया, और आज अधिकांश wallets नए pools का उपयोग करते हैं। Sprout फिर भी महत्वपूर्ण है क्योंकि इसी कार्य ने साबित किया कि निजी, सत्यापन योग्य transactions एक live नेटवर्क पर चल सकती हैं।

Sprout, Bitcoin से अलग कैसे था? Bitcoin हर भुगतान को एक public ledger पर रखता है जहाँ राशि और addresses दिखाई देते हैं। Sprout ने shielded transactions जोड़ीं जो प्रेषक, प्राप्तकर्ता, और राशि को छिपाती हैं, जबकि नेटवर्क को यह पुष्टि करने देती हैं कि transaction वैध है। इसने transparent addresses भी बनाए रखीं, इसलिए दोनों शैलियाँ एक ही chain पर साथ मौजूद हैं।

## अपनी समझ जाँचें

Sprout को अक्सर activation height वाले network upgrade के रूप में बताया जाता है। यह पूरी तरह सही क्यों नहीं है?

<details>
<summary>उत्तर</summary>

Sprout, Zcash का मूल लॉन्च है, कोई बाद का upgrade नहीं। यह 28 अक्टूबर 2016 को genesis block (block 0) से ही सक्रिय है, इसलिए इसके लिए बताने लायक कोई activation height नहीं है। Network-upgrade mechanism बाद में आया और उसने Sprout के नियमों को consensus branch id 0 के रूप में लेबल किया, यानी किसी भी upgrade से पहले की baseline।
</details>

### संसाधन

[ZIP 200: Network Upgrade Mechanism](https://zips.z.cash/zip-0200)

[Zcash network upgrades](https://z.cash/upgrade/)

[Electric Coin Company: Zcash Sprout launch](https://electriccoin.co/blog/zcash-sprout-launch/)

[Electric Coin Company: The Design of the Ceremony](https://electriccoin.co/blog/the-design-of-the-ceremony/)

### यह भी देखें

[Shielded Pools](../using-zcash/shielded-pools)

[zk-SNARKS](../zcash-tech/zk-snarks)

[Zcash Network Upgrades](../start-here/network-upgrades)

[ZEC और Zcash क्या हैं](../start-here/what-is-zec-and-zcash)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

---

श्रृंखला: [Network Upgrades index](../start-here/network-upgrades) · अगला: [Overwinter](../zcash-tech/overwinter)
