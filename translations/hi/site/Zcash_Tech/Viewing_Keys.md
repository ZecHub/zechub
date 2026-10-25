<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Viewing Keys

Shielded पते आपको Zcash blockchain पर यथासंभव कम जानकारी उजागर करते हुए लेन-देन करने देते हैं। तो जब आपको किसी विशिष्ट पक्ष को यह दिखाना हो कि आपके पास क्या है, या आपने क्या भेजा है, तब क्या होता है? हर shielded पते में एक viewing key होती है जो खर्च करने की क्षमता दिए बिना पढ़ने का एक्सेस देती है। Viewing keys को [ZIP 310](https://zips.z.cash/zip-0310) में प्रस्तुत किया गया था और Sapling नेटवर्क अपग्रेड में प्रोटोकॉल में जोड़ा गया था।

Viewing key चुनिंदा प्रकटीकरण का उपकरण है: आप तय करते हैं कि कौन क्या देखेगा, और ऐसा करने के लिए आप कभी खर्च करने का अधिकार नहीं सौंपते।

## TL;DR

Viewing key किसी shielded Zcash पते या खाते की गतिविधि तक **केवल-पढ़ने** का एक्सेस देती है: इसे रखने वाला व्यक्ति आने वाले (और, full viewing keys के मामले में, जाने वाले) लेन-देन देख सकता है, लेकिन कभी खर्च नहीं कर सकता।

- **यह क्या है:** shielded pools का चुनिंदा-प्रकटीकरण उपकरण। [ZIP 310](https://zips.z.cash/zip-0310) में प्रस्तुत किया गया, Sapling नेटवर्क अपग्रेड में प्रोटोकॉल में जोड़ा गया।
- **यह क्या प्रदान करती है:** जमा राशियों का पता लगाना (`uivk…` incoming keys) या खाते के लिए पूर्ण आने/जाने की दृश्यता (`uview…` unified full viewing keys), और legacy Sapling `zxviews…` keys।
- **यह क्या प्रदान नहीं करती:** खर्च करने का अधिकार। Viewing key धारक जो भी करे, वह धनराशि को स्थानांतरित नहीं कर सकता।
- **आज यह कहाँ काम करती है:** [Zallet](https://github.com/zcash/zallet) (v0.1.0-beta.2+, `z_exportviewingkey` / `z_importviewingkey`) में export/import और Zkool जैसे wallets में watch-only खाते; मौजूदा समर्थन मैट्रिक्स के लिए [Wallets](/using-zcash/wallets) पृष्ठ देखें।
- **मुख्य नियम:** पूछे गए प्रश्न का उत्तर देने वाली सबसे संकीर्ण key को प्राथमिकता दें, और याद रखें कि सौंप दी गई key वापस नहीं ली जा सकती — केवल धनराशि स्थानांतरित करके उसे अप्रासंगिक बनाया जा सकता है।

---

## Viewing key का उपयोग क्यों करें?

इस विषय पर Electric Coin Company के लेखन में वे परिस्थितियाँ बताई गई हैं जो सबसे अधिक सामने आती हैं, और आज भी यही सामान्य हैं:

- **जमा राशियों पर नज़र रखने वाला exchange।** Exchange इंटरनेट-सुलभ detection नोड पर incoming viewing key लोड करता है ताकि वह shielded पते पर ग्राहक की जमा राशि देख सके, जबकि spending key ऐसे hardware पर रहती है जो कभी नेटवर्क को नहीं छूता।
- **अपनी होल्डिंग्स सिद्ध करने वाला custodian।** Custodian auditor को हर shielded पते की full viewing key देता है। Auditor उन balances की जाँच कर सकता है और उन पतों से तथा उन तक हुई पुरानी गतिविधि देख सकता है, और कुछ नहीं कर सकता।
- **प्रतिपक्ष पर due diligence।** जब किसी exchange को उन्नत due diligence के हिस्से के रूप में ग्राहक का shielded इतिहास देखना हो, तो वह धनराशि के बजाय viewing key माँग सकता है।

## Viewing key क्या दिखाती है और क्या नहीं दिखाती

एक से अधिक प्रकार की key होती हैं, और अंतर तय करता है कि आप कितनी जानकारी देते हैं।

| Key | Prefix | प्रदान करती है |
|---|---|---|
| Unified full viewing key (UFVK) | `uview…` | खाते के हर pool के लिए आने वाले **और** जाने वाले लेन-देन देखती है |
| Unified incoming viewing key (UIVK) | `uivk…` | खाते के हर pool के लिए केवल आने वाले लेन-देन देखती है |
| Sapling extended full viewing key | `zxviews…` | key के पतों के लिए आने वाली और जाने वाली Sapling गतिविधि देखती है |

इनमें से कोई भी खर्च नहीं कर सकती। जिस मायने में यह महत्वपूर्ण है, ये सभी स्थायी हैं: जो key आप दे चुके हैं उसे वापस नहीं लिया जा सकता, केवल धनराशि को ऐसे खाते में स्थानांतरित करके उसे अप्रासंगिक बनाया जा सकता है जिसकी keys दूसरे पक्ष के पास न हों।

कुछ साझा करने से पहले दो प्रकटीकरण-जाल जानना उपयोगी है।

**Incoming का अर्थ संकीर्ण नहीं है।** Unified incoming viewing key पूरे खाते तक सीमित होती है, उस एक पते तक नहीं जिसके बारे में आपसे पूछा गया था। किसी एक Sapling पते के लिए UIVK export करने पर भी उस खाते के हर pool में आने वाली गतिविधि की दृश्यता मिलती है, इसलिए यह अपने नाम वाले पते से अधिक उजागर करती है। [Zallet Book](https://zcash.github.io/zallet/zcashd/json_rpc.html) इसे स्पष्ट रूप से कहता है।

**प्रकाशित पता पहले ही भविष्य के प्रतिद्वंद्वी को अपनी incoming viewing key उजागर कर देता है।** [ZIP 326](https://zips.z.cash/zip-0326) उल्लेख करता है कि quantum computer वाला प्रतिद्वंद्वी प्रकाशित diversified पते से incoming viewing key पुनर्प्राप्त कर सकता है, जो nullifier key पुनर्प्राप्त करने के विपरीत संभव है। आज पता प्रकाशित करना viewing key प्रकाशित करने के समान नहीं है, लेकिन पर्याप्त लंबी समयावधि में दोनों एक-दूसरे के अधिक निकट हो जाते हैं।

## Ironwood के बाद Viewing keys

NU6.3 ने Ironwood shielded pool प्रस्तुत किया और Orchard pool को केवल-खर्च वाला बना दिया, इसलिए समय के साथ धनराशि एक से दूसरे में स्थानांतरित होती है। स्वयं अपग्रेड के लिए [Ironwood](/zcash-tech/ironwood) और [The turnstile](/zcash-tech/the-turnstile) देखें।

**Ironwood से पहले जारी की गई viewing key माइग्रेशन के बाद भी काम करती रहती है।** ZIP 326 निर्दिष्ट करता है कि receiver और उसकी संबंधित incoming viewing key किसी pool के बजाय Orchard *protocol* तक सीमित है: वही incoming viewing key Orchard-pool और Ironwood-pool दोनों के note ciphertexts को trial-decrypt करती है। Zallet इसे इसी तरह लागू करता है, Ironwood notes को Orchard-आकार वाला बताता है और Ironwood note-encryption domain के अंतर्गत खाते की Orchard viewing keys से trial-decrypt करता है।

Key रखने या जारी करने वाले किसी भी व्यक्ति के लिए तीन परिणाम:

1. **Balances pools के बीच स्थानांतरित होते हैं, और viewer इसे होता हुआ देखता है।** [ZIP 318](https://zips.z.cash/zip-0318) माइग्रेशन को यादृच्छिक समय-सारणी पर प्रसारित छोटे, जानबूझकर समान Orchard-से-Ironwood लेन-देनों की श्रृंखला के रूप में निर्दिष्ट करता है, जिनमें प्रत्येक एक Orchard note खर्च करता है और मानक मूल्यवर्ग का एक Ironwood output उत्पन्न करता है। Viewing key से देखने वाला auditor होल्डिंग्स को कई सप्ताहों में चरणों के रूप में एक pool से दूसरे में जाता देखता है, एक ही बार में नहीं। Wallet अपनी viewing keys का उपयोग करके chain data से अपनी माइग्रेशन प्रगति पुनर्निर्मित कर सकता है।
2. **हर माइग्रेशन चरण उस मूल्य को उजागर करता है जिसे वह स्थानांतरित करता है।** यह turnstile पार करने में अंतर्निहित है, और यही माइग्रेशन को audit योग्य बनाता है। Balance को मानक मूल्यवर्गों में विभाजित करने का अर्थ है कि कोई एक लेन-देन पूरे Orchard-pool balance को उजागर नहीं करता।
3. **Ironwood के बाद बनाए गए खाते अपनी keys अलग तरीके से derive कर सकते हैं।** [ZIP 2005](https://zips.z.cash/zip-2005) quantum-recoverable keys के लिए एक `use_qsk` flag जोड़ता है, और यह incoming, outgoing और diversifier keys derive करने का तरीका बदलता है, इसलिए `use_qsk = true` keys वास्तव में अलग keys होती हैं। ZIP 326 के अनुसार flag पूरे खाते में एकसमान होना चाहिए और Mainnet पर NU6.3 सक्रिय होने से पहले `use_qsk = true` keys बनाने की मनाही है। इसलिए Ironwood से पहले मौजूद खाते से export की गई key एक `use_qsk = false` key है, और उस खाते के लिए सही रहती है। यह न मानें कि एक खाते से export की गई key दूसरे खाते का वर्णन करती है।

## Viewing key export करना

### Zallet

[Zallet](https://github.com/zcash/zallet) वह full-node wallet है जिसने zcashd के अंदर के wallet को प्रतिस्थापित किया। Viewing-key export और import **v0.1.0-beta.2 (28 July 2026)** में आए थे, इसलिए पहले अपना संस्करण जाँचें; पुराने builds में ये methods नहीं हैं। Method नाम के बाद हर argument वैध JSON होना चाहिए, जिसका अर्थ है कि string values अपने double quotes रखती हैं। [Zallet Quick Reference Guide](/using-zcash/zallet-quick-reference-guide) सामान्य command शैली को कवर करता है।

Wallet में क्या है, इसकी सूची बनाएँ:

```bash
zallet rpc listaddresses
```

Unified address देकर खाते की unified full viewing key export करें:

```bash
zallet rpc z_exportviewingkey '"<unified address>"'
```

इसके बजाय खाते की unified incoming viewing key export करें, वैकल्पिक `ivk` argument का उपयोग करके:

```bash
zallet rpc z_exportviewingkey '"<unified address>"' true
```

Sapling पता देने पर उस खाते की Sapling extended full viewing key (`zxviews…`) लौटती है, जो पुराने zcashd व्यवहार से मेल खाती है। दो दस्तावेज़ीकृत सीमाएँ हैं: Sprout पते अस्वीकार किए जाते हैं, और Sapling extended full viewing key उस खाते से export नहीं की जा सकती जिसे स्वयं view-only के रूप में import किया गया हो, क्योंकि wallet उसे पुनर्निर्मित नहीं कर सकता। `ivk` रूप import किए गए view-only खातों के लिए काम करता है।

### वे Wallets जो अपने interface से viewing keys export करते हैं

[Wallets](/using-zcash/wallets) पृष्ठ हर wallet के लिए viewing-key समर्थन और Ironwood readiness ट्रैक करता है। लिखने के समय, viewing-key समर्थन और **Ironwood: Ready** दोनों सूचीबद्ध करने वाले wallets में ZODL, Zingo!, Zkool, Cake, Zallet, zecd और Nozy शामिल हैं। किसी एक wallet पर निर्भर होने से पहले इस पृष्ठ को देखें, क्योंकि readiness बदलती रहती है।

## Watch-only खाते के रूप में viewing key import करना

### Zkool

[Zkool](https://github.com/hhanh00/zkool2) यहाँ सबसे लचीला विकल्प है, क्योंकि यह legacy keys के साथ-साथ unified keys भी स्वीकार करता है। इसके README में **unified viewing key** या **Sapling extended viewing key** से बनाए गए view-only accounts का वर्णन है, साथ ही zcashd से export की गई legacy shielded extended keys का भी। नया खाता जोड़ें, view-only मार्ग चुनें, और `uview…` या `zxviews…` key paste करें; फिर खाता sync होता है और खर्च करने के किसी अधिकार के बिना balances और इतिहास रिपोर्ट करता है।

Ironwood protocol समर्थन और Orchard-से-Ironwood माइग्रेशन Zkool 6.24.0 (20 July 2026) में आए, और 6.26.1 (2 August 2026) ने mempool में Ironwood लेन-देन पहचान को ठीक किया। 6.26.1 या बाद का संस्करण चलाएँ।

### Zallet

```bash
zallet rpc z_importviewingkey '"<zxviews… key>"' '"whenkeyisnew"' 0
```

दूसरा argument rescan policy है: `"whenkeyisnew"` (डिफ़ॉल्ट), `"yes"` या `"no"`। तीसरा वह block height है जहाँ से पुनः scan करना है। Zallet key को view-only खाते के रूप में import करता है और खर्च करने के अधिकार के बिना उसके पतों के लिए आने वाले और जाने वाले लेन-देन ट्रैक करता है।

**Zallet केवल Sapling extended full viewing keys import करता है।** वह `uview…` unified full viewing key import नहीं करेगा, भले ही वह एक export कर सकता है। पूरे unified खाते का पढ़ने का एक्सेस देने के लिए, UFVK को Zallet से export करें और उसे Zkool जैसे unified keys स्वीकार करने वाले wallet में import करें।

Import की गई key को txids, fees और memos वाली पूर्ण transaction history file में बदलने के लिए, [Exporting Transaction History from a Viewing Key](/guides/viewing-key-transaction-export) देखें।

## क्या बदला, और किसे खोजना बंद करें

यदि आपने इस पृष्ठ का पुराना संस्करण या उसका अनुवाद पढ़ा है, तो तीन मार्ग अब काम नहीं करते।

- **`zcash-cli z_exportviewingkey` और `z_importviewingkey`।** zcashd 18 July 2026 को अपने end-of-support halt पर पहुँचा और अब नहीं चलता। Zallet के समान नाम वाले methods इसका विकल्प हैं; [migration guide](/guides/migration-guide-zcashd-to-zebrad-zallet) देखें।
- **Ywallet walkthrough।** Wallets पृष्ठ Ywallet को **Ironwood: Not Ready** के रूप में चिह्नित करता है, इसलिए Ironwood-युग की viewing keys के लिए लोगों को बताने हेतु यह उपयुक्त wallet नहीं है। उसी developer का Zkool समान range की keys स्वीकार करता है और Ready चिह्नित है।
- **zcashblockexplorer.com/vk।** Service अमान्य certificate के साथ HTTP 503 लौटाती है, और इसे प्रतिस्थापित करने के बजाय हटा दिया गया है। किसी website में viewing key paste करने पर आप अपना पूरा transaction history उस website के संचालक को दे देते हैं, जो पुराने पृष्ठ के तीन विकल्पों में हमेशा सबसे कमजोर था। इसके बजाय key को उस wallet में import करें जिसे आप चलाते हैं।

## दृश्य / उपमा

### Auditor की खिड़की

Shielded खाते को बैंक में safe deposit room की तरह समझें:

- **Spending key** कमरे की चाबी है। जो इसे रखता है, वह बक्से खोल सकता है और सामग्री बाहर ले जा सकता है।
- **Viewing key** उस कमरे में auditor की खिड़की है। Auditor हर बक्से को अंदर और बाहर जाते देख सकता है, labels पढ़ सकता है और ledger रख सकता है — लेकिन खिड़की पर कोई handle नहीं है। इसे देखने वाला व्यक्ति कमरे के भीतर की कोई चीज़ स्थानांतरित नहीं कर सकता।

### खिड़की क्या नहीं दिखा सकती

खिड़की कमरे की ओर खुलती है, उसके बाहर की दुनिया की ओर नहीं। यह देखे जा रहे खाते की shielded गतिविधि दिखाती है; यह देखने वाले को blockchain-व्यापी observer नहीं बनाती, और न ही उसे खाते की गतिविधि को किसी अन्य व्यक्ति के unshielded इतिहास से जोड़ने देती है। और क्योंकि खिड़की account स्तर पर लगाई गई है, किसी को एक deposit box के लिए peephole देना (एक single address) भी उसे पूरे कमरे का incoming दृश्य देता है — यही कारण है कि सबसे-संकीर्ण-key नियम मौजूद है।

### आप खिड़की वापस क्यों नहीं ले सकते

Viewing key जानकारी का एक भाग है, permission entry नहीं। Copy हो जाने के बाद, यह तब तक मौजूद रहती है जब तक धनराशि उस खाते से नहीं निकल जाती जिसे वह देखती है। व्यावहारिक उपाय rotation है: balances को ऐसे नए खाते में ले जाएँ जिसकी keys दूसरे पक्ष को कभी नहीं मिलीं, और पुरानी खिड़की खाली कमरे की ओर होगी।

## गहन अध्ययन

### Trial decryption: viewing वास्तव में कैसे काम करती है

हर shielded लेन-देन अपने note plaintexts को इच्छित recipient के लिए encrypt करता है। Viewing key रखने वाला wallet **trial decryption** करता है: chain पर मिलने वाले हर लेन-देन के लिए, वह key से note ciphertexts को decrypt करने का प्रयास करता है। सफल परिणाम note का value, recipient diversifier और memo उजागर करते हैं; असफल प्रयासों की कोई कीमत नहीं होती। यही कारण है कि वही incoming viewing key Orchard और Ironwood pools में काम करती रहती है — [ZIP 326](https://zips.z.cash/zip-0326) receiver को किसी pool के बजाय Orchard *protocol* तक सीमित करता है, इसलिए Ironwood note ciphertexts Orchard-आकार के होते हैं और Ironwood note-encryption domain के अंतर्गत खाते की Orchard viewing keys से trial-decrypt होते हैं।

### Full बनाम incoming: derivation क्या तय करता है

एक **पूर्ण** viewing key आउटगोइंग-viewing क्षमता व्युत्पन्न कर सकती है, जो किसी ऑडिटर को ट्रांज़ैक्शन डिक्रिप्ट होने के बाद ट्रांसफ़र के *प्रेषक* पक्ष का पुनर्निर्माण करने देती है। एक **इनकमिंग** viewing key जानबूझकर यहीं रुक जाती है: यह इनकमिंग नोट्स का पता लगाती और उन्हें डिक्रिप्ट करती है, लेकिन आउटगोइंग संबंध का पुनर्निर्माण नहीं कर सकती। इन क्षमताओं के बीच व्युत्पत्ति एकतरफ़ा है — इनकमिंग key पूर्ण key *से* व्युत्पन्न होती है, कभी इसके विपरीत नहीं — यही बात "केवल इनकमिंग" को महज़ एक वादे के बजाय वास्तविक डाउनग्रेड बनाती है। [ZIP 2005](https://zips.z.cash/zip-2005) का `use_qsk` फ्लैग व्युत्पत्ति को ही बदल देता है, इसलिए क्वांटम-रिकवर किए जा सकने वाले keys पूरी तरह अलग key family हैं, पुरानी वाली का कोई प्रकार नहीं।

### Viewer को माइग्रेशन कैसा दिखता है

क्योंकि [ZIP 318](https://zips.z.cash/zip-0318) माइग्रेशन छोटे, समान Orchard-से-Ironwood लेन-देनों की यादृच्छिक श्रृंखला है, key रखने वाला viewer एक सीढ़ी देखता है: एक छलांग के बजाय मानक-मूल्यवर्ग के मूल्य के अनेक चरण। कोई एक चरण स्थानांतरित हो रहा कुल balance नहीं दिखाता, लेकिन *pattern* पहचाना जा सकता है — यही audit योग्य turnstile का इच्छित trade-off है।

## व्यावहारिक निहितार्थ

- **Exchanges और payment processors के लिए:** खाते की incoming viewing key (या पूर्ण coverage के लिए UFVK) detection नोड पर लोड करें और ग्राहक की जमा राशियों का स्वचालित मिलान करें, ठीक वैसे ही जैसे transparent पते के साथ करते हैं — लेकिन ग्राहक की spending key कभी cold storage से बाहर नहीं जाती।
- **Auditors और proof-of-reserves के लिए:** full viewing key "हम पर भरोसा करें" को "इसे सत्यापित करें" में बदल देती है: देखे जा रहे खातों के balances और पूर्ण transaction history, उन्हें छूने की शून्य क्षमता के साथ। किसी एक payment के one-off proofs के लिए [Payment disclosures](/zcash-tech/payment-disclosures) के साथ मिलाएँ।
- **Due diligence के लिए:** प्रतिपक्ष को engagement से संबंधित खाते की key दें, अपना पूरा wallet नहीं। संबंध समाप्त हो जाए, तो account rotate करें।
- **Tooling विकल्पों के लिए:** Zallet UFVKs export करता है और Sapling extended full viewing keys import करता है; Zkool unified और legacy keys को watch-only accounts के रूप में स्वीकार करता है। किसी wallet को मानक बनाने से पहले मौजूदा Ironwood readiness matrix के लिए [Wallets](/using-zcash/wallets) पृष्ठ देखें।
- **प्रकटीकरण की लागत स्थायी है:** key का हर अतिरिक्त धारक एक स्थायी privacy credit line है जिसे आप बंद नहीं कर सकते। हर संबंध के लिए अलग keys जारी करें, उन्हें एक खाते तक सीमित रखें और दर्ज करें कि किसके पास क्या है।

## सामान्य गलतियाँ

| सामान्य धारणा | वास्तविक स्थिति |
| --- | --- |
| "यदि viewing key लीक हो जाए तो वह धनराशि खर्च कर सकती है।" | वह नहीं कर सकती। Viewing keys में खर्च करने का कोई अधिकार नहीं होता; leak से अधिकतम इतिहास उजागर होता है। |
| "मैं बाद में viewing key रद्द कर सकता हूँ।" | आप नहीं कर सकते। सौंप दी गई key तब तक काम करती है जब तक धनराशि ऐसे खाते में न चली जाए जिसकी keys दूसरे पक्ष के पास नहीं हैं। |
| "एक पते के लिए UIVK export करने से केवल वही पता दिखता है।" | Viewing keys account-scoped होती हैं। UIVK खाते के हर pool की incoming गतिविधि दिखाती है। |
| "`zcash-cli z_exportviewingkey` अब भी काम करता है।" | नहीं। zcashd 18 July 2026 को अपने end-of-support halt पर पहुँचा; इसके बजाय Zallet के `z_exportviewingkey` / `z_importviewingkey` का उपयोग करें। |
| "किसी web tool में viewing key paste करना सुरक्षित है क्योंकि वह read-only है।" | Read-only होने पर भी उस खाते का आपका पूरा transaction history site चलाने वाले व्यक्ति को मिल जाता है। Key को उस wallet में import करें जिसे आप चलाते हैं। |
| "Zallet हर वह viewing key import कर सकता है जिसे Zallet export कर सकता है।" | नहीं। Zallet केवल Sapling extended full viewing keys import करता है; unified `uview…` keys को Zkool जैसे unified keys स्वीकार करने वाले wallets में जाना चाहिए। |

## संबंधित पृष्ठ

- [Payment Disclosures](/zcash-tech/payment-disclosures) — खाते तक निरंतर एक्सेस दिए बिना एक payment के चयनित विवरण सिद्ध करना
- [Unified Addresses](/zcash-tech/unified-addresses) — वह address layer जो viewing-key receivers को वहन करती है
- [Ironwood](/zcash-tech/ironwood) — NU6.3 shielded pool जिसमें Orchard माइग्रेट होता है
- [The Turnstile](/zcash-tech/the-turnstile) — Orchard-से-Ironwood माइग्रेशन mechanism जिसे viewers देख सकते हैं
- [Wallets](/using-zcash/wallets) — wallets, viewing-key समर्थन और Ironwood readiness की पूर्ण directory
- [Exporting Transaction History from a Viewing Key](/guides/viewing-key-transaction-export) — import की गई key को पूर्ण txid/fee/memo history file में बदलना

## संसाधन

आवश्यकतानुसार viewing keys का उपयोग करें, और पूछे गए प्रश्न का उत्तर देने वाली सबसे संकीर्ण key को प्राथमिकता दें।

- [Payment disclosures](/zcash-tech/payment-disclosures) - खाते तक निरंतर एक्सेस दिए बिना एक payment के चयनित विवरण सिद्ध करना
- [ZIP 326: NU6.3 Consequences for Wallets](https://zips.z.cash/zip-0326) — Orchard और Ironwood pools में viewing keys कैसे व्यवहार करती हैं
- [ZIP 229: Version 6 Transaction Format](https://zips.z.cash/zip-0229) — Orchard और Ironwood pools को परिभाषित करता है
- [ZIP 310](https://zips.z.cash/zip-0310) — viewing key specification
- [Zallet changelog](https://github.com/zcash/zallet/blob/main/CHANGELOG.md) — किस release ने कौन-सा RPC method जोड़ा
- [Zkool README](https://github.com/hhanh00/zkool2/blob/main/README.md) — समर्थित account और key प्रकार
- [ECC, Explaining Viewing Keys](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, Selective Disclosure and Viewing Keys](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Zcash Viewing Key Video Presentation](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
