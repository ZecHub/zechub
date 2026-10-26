<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Is_Zcash_Post_Quantum.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="पृष्ठ संपादित करें"/>
</a>

# क्या Zcash पोस्ट-क्वांटम है?

## संक्षिप्त उत्तर

नहीं, अभी नहीं।

Ironwood अपग्रेड के बाद से, Zcash में Ironwood पूल में रखी धनराशि के लिए **क्वांटम-पुनर्प्राप्य** सुविधा है। यह एक वास्तविक कदम है, लेकिन यह पोस्ट-क्वांटम सुरक्षित होने के समान नहीं है। इसके पीछे का विनिर्देश, ZIP 2005, यह बात सीधे कहता है: परिवर्तन "अपने आप में प्रोटोकॉल को क्वांटम विरोधियों के विरुद्ध सुरक्षित नहीं बनाता"। यह Ironwood धनराशि को तैयार करता है ताकि वर्तमान क्रिप्टोग्राफी बंद हो जाने पर उन्हें भविष्य के Recovery Protocol के माध्यम से स्थानांतरित किया जा सके।

यह पृष्ठ अलग करता है कि Zcash आज क्या सुरक्षित रखता है, Ironwood ने क्या बदला, क्या अभी भी जोखिम में है, और क्या केवल एक प्रस्ताव है। अंत के पास दी गई [स्थिति तालिका](#status-table) दिखाती है कि प्रत्येक भाग किस स्थिति में है और इसकी आखिरी जाँच कब हुई थी।

<br/>

## यह किसके लिए है

- जिसने "quantum-recoverable" देखा है और उसका अर्थ "quantum-proof" समझ लिया है
- वे धारक जो यह तय कर रहे हैं कि धनराशि को Ironwood में ले जाना है या नहीं
- लेखक और मॉडरेटर जिन्हें लोगों को संदर्भित करने के लिए स्रोतयुक्त उत्तर चाहिए

क्वांटम कंप्यूटिंग की पृष्ठभूमि के लिए, [Zcash में Post-Quantum Security](/zcash-tech/post-quantum-security) से शुरुआत करें।

<br/>

## प्रश्न भ्रमित करने वाला क्यों है

"Post-quantum" का उपयोग ऐसे किया जाता है मानो वह एक ही गुण हो। Zcash के लिए यह कम से कम चार अलग प्रश्न हैं, और उनके उत्तर अलग-अलग हैं:

1. **गोपनीयता।** क्या कोई क्वांटम हमलावर देख सकता है कि किसने किसे कितना भुगतान किया?
2. **खर्च करना।** क्या कोई क्वांटम हमलावर ऐसे सिक्के खर्च कर सकता है जो उसके नहीं हैं?
3. **मुद्रास्फीति।** क्या कोई क्वांटम हमलावर शून्य से ZEC बना सकता है?
4. **पुनर्प्राप्ति।** यदि वर्तमान क्रिप्टोग्राफी बंद करनी पड़े, तो क्या ईमानदार उपयोगकर्ता फिर भी अपनी धनराशि निकाल सकते हैं?

Ironwood केवल चौथे प्रश्न का उत्तर बदलता है, और वह भी केवल Ironwood पूल के नोट्स के लिए।

इन सबके पीछे खतरा ऐसे हमलावर का है जो Zcash द्वारा उपयोग किए जाने वाले elliptic curves पर discrete logarithms की गणना कर सकता है। Shor का एल्गोरिदम चलाने वाला पर्याप्त बड़ा क्वांटम कंप्यूटर ऐसा करने का एक तरीका होगा। ZIP 2005 बताता है कि एक **एकल** discrete logarithm खोज लेना भी मनमानी मुद्रास्फीति करने या धनराशि चुराने के लिए पर्याप्त है।

<br/>

## Zcash आज क्या सुरक्षित रखता है

यह तालिका प्रोटोकॉल को उसके वर्तमान संचालन के रूप में बताती है, ऐसे हमलावर के विरुद्ध जो discrete logarithms तोड़ सकता है। यह Ironwood सहित हर shielded pool पर लागू होती है, क्योंकि Ironwood वही Orchard circuit, Halo 2 proofs और RedPallas signatures उपयोग करता है जो Orchard करता है।

| गुण | आज क्वांटम हमलावर के विरुद्ध | Ironwood ने क्या बदला |
|---|---|---|
| गोपनीयता | यदि हमलावर आपका shielded address नहीं जानता, तो सुरक्षित रहती है। Proofs और rerandomized signatures कुछ अतिरिक्त लीक नहीं करते। यदि हमलावर address जानता है, तो वह उसे भेजे गए नोट्स, जिनमें chain से सहेजे गए पुराने नोट्स भी शामिल हैं, decrypt कर सकता है। | कुछ नहीं। ZIP 2005: "किसी भी pool के लिए Privacy की स्थिति अपरिवर्तित है।" |
| खर्च करना | सुरक्षित नहीं। हमलावर proofs या spend signatures जालसाज़ी कर सकता है और किसी भी shielded pool से चोरी कर सकता है, यहाँ तक कि उन addresses से भी जिन्हें उसने कभी नहीं देखा। | अभी कुछ नहीं। सुरक्षा केवल भविष्य में Recovery Protocol पर स्विच करने के बाद आएगी। |
| मुद्रास्फीति | सुरक्षित नहीं। हमलावर वैध दिखने वाला proof जालसाज़ी कर सकता है और किसी भी shielded pool में ZEC बना सकता है, संभवतः बिना किसी के ध्यान दिए। एकमात्र सीमा [turnstile](/zcash-tech/the-turnstile) है: कोई भी pool अपने दर्ज शेष से अधिक भुगतान नहीं कर सकता। | अभी कुछ नहीं। Ironwood नोट्स अब अपनी सभी सामग्री के लिए इस तरह commit करते हैं कि कोई क्वांटम हमलावर इसकी जालसाज़ी न कर सके, और भविष्य के Recovery Protocol को supply को सुरक्षित रखने के लिए इसी की आवश्यकता है। |
| पुनर्प्राप्ति | Sprout, Sapling और Orchard नोट्स के लिए कोई recovery path नहीं है। एक बार उनके protocols बंद हो जाने पर, उनमें बची कोई भी धनराशि अप्राप्य हो जाएगी। | सिद्धांततः हर Ironwood नोट पुनर्प्राप्य है। कोई Sapling या Orchard नोट नहीं है। |

पारदर्शी ZEC एक अलग मामला है। उसके ECDSA signatures की जालसाज़ी तब की जा सकती है जब public key ज्ञात हो जाए। सामान्य transparent address के लिए ऐसा पहली बार उससे खर्च करने पर होता है, और जब transaction mempool में अपुष्ट रहता है तब भी एक छोटी अवधि होती है। ZIP 2005 इसमें से कुछ भी नहीं बदलता।

<br/>

## Ironwood ने क्या बदला

Ironwood, NU6.3 network upgrade है। यह Mainnet पर 28 जुलाई 2026 को block 3,428,143 पर सक्रिय हुआ। इसका मुख्य उद्देश्य Orchard soundness bug के बाद supply integrity था ([Ironwood](/zcash-tech/ironwood) पृष्ठ देखें), और ZIP 2005 से quantum recoverability इसके हिस्से के रूप में जारी हुई।

- **नया note format।** हर Ironwood output note quantum-recoverable format उपयोग करता है (note plaintext lead byte `0x03`)। नोट की randomness अब उसके सभी fields से प्राप्त होती है, इसलिए नोट केवल elliptic-curve math से नहीं, बल्कि hash द्वारा अपनी सामग्री से बंधा है।
- **केवल Ironwood नोट्स के लिए recovery path।** ZIP 326 स्पष्ट रूप से कहता है कि हर Ironwood नोट पुनर्प्राप्य है और कोई Orchard नोट नहीं है। Wallet setting इसे नहीं बदलती।
- **Orchard ने नया मूल्य लेना बंद कर दिया।** Coinbase rewards अब Orchard में नहीं जा सकते, और Orchard अब किसी अलग Orchard address पर नहीं भेज सकता, इसलिए नया shielded मूल्य Ironwood में पहुँचता है।
- **Wallets को सब कुछ स्थानांतरित करने के लिए कहा गया है।** ZIP 2005 कहता है कि wallets को अपने नियंत्रण वाली सारी धनराशि, जिसमें transparent, Sprout और Sapling धनराशि शामिल है, व्यावहारिक होते ही Ironwood नोट्स में स्थानांतरित करनी चाहिए, और नई धनराशि आते रहने पर ऐसा करते रहना चाहिए।

Ironwood ने क्या नहीं बदला: आज खर्च करने और proof देने के लिए प्रयुक्त क्रिप्टोग्राफी, note encryption, और transparent ZEC से जुड़ी कोई भी बात।

<br/>

## शेष सीमाएँ

**एक जोखिम-अवधि है।** Ironwood के सक्रिय होने से लेकर पुराने protocols बंद होने तक, क्वांटम हमलावर हर shielded pool में धनराशि चुरा, बढ़ा या रोक सकता है। ZIP 2005 इसे "critical exposure period" कहता है और चेतावनी देता है कि इस दौरान का आक्रमण किसी धारक की बाद में recovery की क्षमता को नुकसान पहुँचा सकता है। यही कारण है कि यह कहता है कि क्वांटम हमले संभव होने से **पहले** Zcash को Orchard, Sapling और Sprout बंद करना होगा।

**Sprout को छोड़कर switch-off की कोई तारीख नहीं है।** कोई ZIP Orchard या Sapling को बंद करने का कार्यक्रम नहीं बनाता। Sprout अलग है: [ZIP 259](https://zips.z.cash/zip-0259), ZIP 2003 को NU7 द्वारा लागू किए जाने वाले परिवर्तनों में सूचीबद्ध करता है, इसलिए NU7 सक्रिय होने पर version 4 transactions अमान्य हो जाते हैं और Sprout pool में बचा कोई भी ZEC खर्च नहीं किया जा सकेगा। Mainnet activation block 3,543,405 के लिए निर्धारित है, जिसका लक्ष्य 5 नवंबर 2026 है ([ZIP 259](https://zips.z.cash/zip-0259), [forum announcement](https://forum.zcashcommunity.com/t/nu7-timeline/57655))। अप्रैल 2026 में forum पर Sapling withdraw-only चर्चा शुरू हुई।

**Recovery Protocol पूरा नहीं हुआ है।** ZIP 2005 केवल इसकी रूपरेखा देता है और कहता है कि विवरण "बदल सकते हैं"। इसका कोई भाग लागू नहीं है।

**अभी संकलित करें, बाद में decrypt करें।** Ironwood, Orchard, Sapling और Sprout के note ciphertexts सभी chain पर सार्वजनिक हैं। कोई उन्हें आज सहेज सकता है और बाद में decrypt कर सकता है, यदि वह receiving address भी जानता हो। आपका हर प्रकाशित या साझा किया हुआ address इस जोखिम का भाग है। ZIP 2005 कहता है कि भविष्य के transfers के लिए "अन्य protocol changes पर विचार चल रहा है"।

**पारदर्शी धनराशि शामिल नहीं है।** जिन addresses से खर्च किया गया है, या जिन्हें दोबारा उपयोग किया गया है, उनके public keys उजागर हो चुके हैं। कुछ transparent addresses के लिए recoverability अभी केवल एक विचार है (ZIP 2007, नीचे देखें)।

**FROST setups में एक अतिरिक्त चेतावनी है।** FROST के साथ, प्रत्येक participant के पास quantum spending key (`qsk`) होती है, और उसे रखने वाला क्वांटम हमलावर चोरी कर सकता है। ZIP 2005 अनुशंसा करता है कि ऐसा उपलब्ध होने पर FROST धनराशि को threshold support वाले पूर्णतः post-quantum protocol में ले जाया जाए।

<br/>

## प्रस्ताव और शोध

इनमें से कोई भी सक्रिय नहीं है।

- **Recovery Protocol।** वह तंत्र जो switch के बाद वास्तव में Ironwood धनराशि खर्च करने देगा। ZIP 2005 में रूपरेखित है, निर्दिष्ट नहीं।
- **ZIP 2007, कुछ transparent addresses के लिए recoverability।** ZIP संख्या केवल discussion सहित [zips#1302](https://github.com/zcash/zips/issues/1302) में आरक्षित है। विचार यह है कि जिन P2PKH और P2SH outputs की public keys कभी उजागर नहीं हुईं, वे Ironwood की तुलना में कमजोर गारंटियों के साथ पुनर्प्राप्य हो सकते हैं।
- **ज्ञात addresses के लिए Post-quantum privacy।** 2022 से [zips#1133](https://github.com/zcash/zips/issues/1133) में खुला है, जो नोट करता है कि addresses गुप्त रखे जाने पर Zcash "पहले से ही post-quantum private होने के लिए अभिप्रेत है" और पूछता है कि इसे ज्ञात addresses तक कैसे बढ़ाया जाए, उदाहरण के लिए Kyber (अब ML-KEM) जैसी post-quantum key encapsulation scheme से। जून 2026 में [zips#1307](https://github.com/zcash/zips/issues/1307) ने वर्तमान privacy properties और संभावित समाधानों का दस्तावेज़ीकरण करने के लिए एक ZIP प्रस्तावित किया।
- **Project Tachyon।** एक प्रस्तावित scaling upgrade। इसकी site कहती है कि यह off-chain payment delivery और post-quantum key exchange के उपयोग के दुष्प्रभाव के रूप में "full post-quantum privacy" प्राप्त करेगा। इसकी proof-carrying data library, Ragu, को "अभी निर्माणाधीन" बताया गया है। [Project Tachyon](/zcash-tech/project-tachyon) देखें।
- **पूर्णतः post-quantum Zcash।** Post-quantum proofs, signatures और commitments एक साथ। [zips#1134](https://github.com/zcash/zips/issues/1134) में ट्रैक किया जा रहा है, जो 2016 से खुला है। कोई spec या timeline नहीं है।

<br/>

## स्थिति तालिका

Sprout पंक्ति को छोड़कर, अंतिम जाँच 13 सितंबर 2026 को हुई थी; उस पंक्ति को 9 अक्टूबर 2026 को अद्यतन किया गया था। किसी ZIP की header status और उसकी network status अलग चीज़ें हैं: ZIP 2005 के header में अब भी "Proposed" है, भले ही उसके नियम जुलाई 2026 से Mainnet पर लागू हैं।

| मद | ZIP स्थिति | नेटवर्क स्थिति | तारीख | स्रोत |
|---|---|---|---|---|
| quantum-recoverable notes वाला Ironwood pool (NU6.3) | ZIP 2005 Proposed, ZIP 229 और ZIP 258 Draft | Mainnet पर **सक्रिय** | 28 जुलाई 2026, block 3,428,143 | [ZIP 2005](https://zips.z.cash/zip-2005), [ZIP 258](https://zips.z.cash/zip-0258) |
| Orchard नए मूल्य के लिए बंद | ZIP 2006 Reserved, ZIP 258 में नियम | Mainnet पर **सक्रिय** | 28 जुलाई 2026 | [ZIP 258](https://zips.z.cash/zip-0258) |
| Wallets द्वारा धनराशि को Ironwood में ले जाना | ZIP 2005, ZIP 318 और ZIP 326 (Draft) में मार्गदर्शन | अनुशंसित, आपके wallet पर निर्भर | 28 जुलाई 2026 से | [ZIP 318](https://zips.z.cash/zip-0318), [ZIP 326](https://zips.z.cash/zip-0326) |
| Recovery Protocol | केवल ZIP 2005 में रूपरेखित | **लागू नहीं किया गया** | कोई तारीख नहीं | [ZIP 2005](https://zips.z.cash/zip-2005) |
| Orchard और Sapling बंद करना | कोई ZIP नहीं | **निर्धारित नहीं** | अप्रैल 2026 से Sapling चर्चा | [Forum](https://forum.zcashcommunity.com/t/sapling-withdraw-only-discussion-kickoff/55223) |
| Sprout spends को निष्क्रिय करना (ZIP 2003) | Proposed, ZIP 259 (Proposed) के अनुसार NU7 द्वारा लागू | **सक्रिय नहीं** | Mainnet height 3,543,405, लक्ष्य 5 नवंबर 2026 | [ZIP 2003](https://zips.z.cash/zip-2003), [ZIP 259](https://zips.z.cash/zip-0259) |
| Transparent recoverability (ZIP 2007) | Reserved | **प्रस्ताव** | ZIP 5 जुलाई 2025 को आरक्षित, चर्चा 17 जून 2026 को खुली | [zips#1302](https://github.com/zcash/zips/issues/1302) |
| ज्ञात addresses के लिए Post-quantum privacy | खुले issues, कोई ZIP नहीं | **शोध** | #1133 18 अगस्त 2022 को खुला, #1307 23 जून 2026 को खुला | [zips#1133](https://github.com/zcash/zips/issues/1133), [zips#1307](https://github.com/zcash/zips/issues/1307) |
| Project Tachyon | कोई ZIP नहीं | **प्रस्ताव**, विकासाधीन | पहली बार अप्रैल 2025 में प्रकाशित | [tachyon.z.cash](https://tachyon.z.cash/roadmap/) |
| पूर्णतः post-quantum protocol | खुला issue, कोई ZIP नहीं | **भविष्य का कार्य** | #1134 28 मार्च 2016 को खुला | [zips#1134](https://github.com/zcash/zips/issues/1134) |

Zcash Foundation के NU7 sentiment polling (फरवरी 2026) में, quantum recoverability को ZCAP से 90.5% और coinholders से 94.6% समर्थन मिला, तथा Tachyon को लगभग सर्वसम्मत समर्थन मिला। वे sentiment polls थे, NU7 में क्या शामिल होगा इस बारे में निर्णय नहीं।

<br/>

## आप अभी क्या कर सकते हैं

- **अपनी धनराशि Ironwood में ले जाएँ।** Sapling और Orchard नोट्स कभी पुनर्प्राप्य नहीं होंगे। Pools के बीच मूल्य स्थानांतरित करने पर राशि chain पर दिखाई देती है, इसलिए ZIP 318 में wallets से balances को निश्चित राशियों में बाँटकर समय के साथ भेजने को कहा गया है। सब कुछ एक साथ स्थानांतरित करने के बजाय अपने wallet को ऐसा करने दें।
- **ऐसे shielded addresses प्रकाशित न करें जिनकी आपको आवश्यकता नहीं है।** भविष्य के क्वांटम हमलावर के विरुद्ध गोपनीयता इस पर निर्भर करती है कि वह आपका address न जानता हो। Unified addresses बनाना सस्ता है, इसलिए हर payer को नया address दें। ZIP 229 इसी कारण से address rotation की अनुशंसा करता है।
- **Transparent addresses का पुनः उपयोग न करें।** एक बार उससे खर्च करने पर उसका public key हमेशा के लिए chain पर आ जाता है।
- **अपनी seed phrase सुरक्षित रखें।** रूपरेखित Recovery Protocol में recovery spend को सिद्ध करना होगा कि आप अपना spending key जानते हैं, और सामान्य wallets वह key seed से प्राप्त करते हैं।
- **"Zcash quantum-proof है" वाले दावों को नज़रअंदाज़ करें।** यह अभी नहीं है, और specs लिखने वाले लोग भी यही कहते हैं।

<br/>

## सामान्य गलतफहमियाँ

- **"Ironwood post-quantum है।"** नहीं। यह वही Orchard cryptography चलाता है, और ZIP 2005 कहता है कि यह सुविधा "Orchard protocol को quantum attacks के विरुद्ध सुरक्षित नहीं बनाती"।
- **"Quantum-recoverable का अर्थ है कि आज क्वांटम कंप्यूटरों से सुरक्षित है।"** नहीं। इसका अर्थ है कि भविष्य के switch के बाद Ironwood धनराशि पुनर्प्राप्त की जा सकती है, बशर्ते switch समय पर हो।
- **"Shielded Zcash पहले से post-quantum private है।"** केवल तब, जब हमलावर आपका address नहीं जानता। ज्ञात addresses हर pool में उजागर हैं।
- **"Tachyon ने पहले ही post-quantum privacy जोड़ दी है।"** Tachyon एक प्रस्ताव है। इसका कोई हिस्सा सक्रिय नहीं है।
- **"Quantum computers Zcash के हर भाग को तोड़ देते हैं।"** ज्ञात क्वांटम हमलों से hash functions केवल कमजोर होते हैं, टूटते नहीं। Quantum recoverability ठीक इसी अंतर पर निर्भर करती है।

<br/>

## संबंधित पृष्ठ

- [Zcash में Post-Quantum Security](/zcash-tech/post-quantum-security)
- [Ironwood](/zcash-tech/ironwood)
- [The Turnstile](/zcash-tech/the-turnstile)
- [Project Tachyon](/zcash-tech/project-tachyon)
- [FROST](/zcash-tech/frost)
- [Shielded Pools](/using-zcash/shielded-pools)

<br/>

## स्रोत

- [ZIP 2005: Ironwood Quantum Recoverability](https://zips.z.cash/zip-2005)
- [ZIP 229: Version 6 Transaction Format](https://zips.z.cash/zip-0229)
- [ZIP 258: NU6.3 Network Upgrade का परिनियोजन](https://zips.z.cash/zip-0258)
- [ZIP 318: Orchard से Ironwood Migration](https://zips.z.cash/zip-0318)
- [ZIP 326: NU6.3 के Wallets के लिए परिणाम](https://zips.z.cash/zip-0326)
- [ZIP 2003: Version 4 transactions को अस्वीकार करना](https://zips.z.cash/zip-2003)
- [ZIP 209: Negative Shielded Chain Value Pool Balances को प्रतिबंधित करना](https://zips.z.cash/zip-0209)
- [zips#1302: Transparent protocol के एक उपसमुच्चय की Quantum recoverability](https://github.com/zcash/zips/issues/1302)
- [zips#1133: Zcash](https://github.com/zcash/zips/issues/1133) के लिए Post-quantum privacy
- [zips#1307: Quantum और discrete-log-breaking विरोधियों के विरुद्ध Zcash की गोपनीयता](https://github.com/zcash/zips/issues/1307)
- [zips#1134: पूर्णतः post-quantum Zcash](https://github.com/zcash/zips/issues/1134)
- [Project Tachyon roadmap](https://tachyon.z.cash/roadmap/)
- [NU7 Polling Results: हमने क्या सुना और यहाँ से कहाँ जाएँ](https://forum.zcashcommunity.com/t/nu7-polling-results-what-we-heard-and-where-we-go-from-here/54775)
- [ZecBlock पर Block 3,428,143](https://zecblock.com/block/3428143)
- [Forum अनुरोध: क्या Zcash post-quantum है?](https://forum.zcashcommunity.com/t/is-zcash-post-quantum-help-wanted-d-proposal/57154)
