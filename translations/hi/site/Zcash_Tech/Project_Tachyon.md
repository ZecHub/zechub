<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Project_Tachyon.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="पृष्ठ संपादित करें"/>
</a>

# परियोजना Tachyon

## संक्षेप में

- Tachyon, Zcash wallets द्वारा shielded धनराशि खोजने और खर्च करने के तरीके का प्रस्तावित पुनर्रचना है, जिसका उद्देश्य नेटवर्क को अत्यंत बड़ी संख्या में उपयोगकर्ताओं तक बढ़ने देना है
- आज किसी wallet को यह पता लगाने के लिए blockchain के एक विशाल हिस्से को decrypt करने का प्रयास करना पड़ता है कि कौन-से भुगतान उसके अपने हैं, और यही मुख्य कारण है कि shielded syncing धीमा महसूस होता है
- Tachyon इसे **oblivious synchronization** से बदल देता है, जिससे wallet अपनी आवश्यकता की चीज़ें बिना सब कुछ scan किए और server को यह बताए बिना प्राप्त करता है कि उसे कौन-से हिस्से चाहिए थे
- यह भुगतान के विवरणों को blockchain से निकालकर स्वयं payment request में भी ले जाता है, जिससे protocol सरल होता है लेकिन ज़िम्मेदारी wallets पर स्थानांतरित हो जाती है
- यह एक प्रस्ताव है, जो पहली बार अप्रैल 2025 में प्रकाशित हुआ और NU7 के उम्मीदवार के रूप में नामित किया गया। यह **जारी नहीं हुआ है**, और इसके लिए Sapling upgrade के स्तर के engineering प्रयास की आवश्यकता है

<br/>

## यह किसके लिए है

- हर उस व्यक्ति के लिए जिसने किसी shielded wallet को sync होते देखा है और सोचा है कि इसमें इतना समय क्यों लगता है
- उन नए लोगों के लिए जिन्हें NU7 और Zcash scaling के साथ Tachyon का उल्लेख लगातार दिखाई देता है
- उन पाठकों के लिए जो पहले विचार और बाद में cryptography समझना चाहते हैं

<br/>

## वह समस्या जिसे Tachyon हल करता है

Zcash यह छिपाता है कि भुगतान किसके लिए है। यही इसका पूरा उद्देश्य है, और इससे एक असहज समस्या पैदा होती है: अगर कोई नहीं बता सकता कि भुगतान किसका है, तो आपका अपना wallet आपका भुगतान कैसे खोजेगा?

Bitcoin में यह आसान है। पते सार्वजनिक होते हैं, इसलिए wallet किसी server से पूछ सकता है, "इस पते पर क्या भेजा गया था?" और उत्तर पा सकता है। Zcash wallet यह प्रश्न नहीं पूछ सकता, क्योंकि ऐसा पूछने से ठीक वही उजागर होगा जिसे shielded pool छिपाने के लिए बनाया गया है।

इसलिए Zcash कुछ अलग करता है। भेजने वाला भुगतान विवरणों को encrypt करके transaction के अंदर रख देता है। फिर आपका wallet chain पर transactions में से गुजरता है और हर एक को decrypt करने का प्रयास करता है। लगभग हर प्रयास विफल होता है। जो कुछ सफल होते हैं, वे आपके भुगतान हैं। इसे **trial decryption** कहा जाता है, और यह निजी, सही, और धीमा है।

![आज एक Zcash wallet हर shielded transaction डाउनलोड करता है और प्रत्येक को decrypt करने की कोशिश करता है, जिसमें लगभग हर प्रयास विफल होता है, ताकि उससे संबंधित कुछ भुगतान खोज सके](/content-images/tachyon-scanning-today.svg)

पेंच यह है कि काम किस पर निर्भर करता है। आपका wallet जितना प्रयास करता है, वह इस पर तय होता है कि chain कितनी बड़ी है, न कि इस पर कि आपको वास्तव में कितने भुगतान मिले। जिस व्यक्ति को एक भी भुगतान कभी नहीं मिला, उसे भी लगभग उतना ही काम करना पड़ता है जितना रोज़ भुगतान पाने वाले व्यक्ति को। Zcash के बढ़ने के साथ, यह सबके लिए बदतर होता जाता है। प्रस्ताव के शब्दों में, यह "बस scale नहीं करता।"

<br/>

## Tachyon क्या बदलता है

Tachyon समस्या की जड़ पर प्रहार करता है: यह भुगतान रहस्यों के delivery channel के रूप में blockchain का उपयोग बंद कर देता है।

इसके बजाय, जिन विवरणों की आपको आवश्यकता होती है वे payment request के साथ ही, out of band, भेजे जाते हैं। payment request, URI, या QR code में वह जानकारी होती है जो पहले transaction में encrypt की जाती थी। Sean Bowe इसे Zcash shielded protocol में पहली बार **out-of-band payments** को अपनाने के रूप में वर्णित करते हैं।

जब chain में वह जानकारी नहीं रहती, तो आपके wallet के पास उसे खोजने का कोई कारण नहीं रहता, और trial decryption की समस्या समाप्त हो जाती है।

हालाँकि, खर्च करने के लिए आपके wallet को अभी भी वर्तमान chain state जाननी होती है। यही डिज़ाइन का दूसरा भाग है, **oblivious synchronization**: wallet द्वारा अपनी आवश्यक विशिष्ट चीज़ें प्राप्त करने का ऐसा तरीका जिसमें server को यह न पता चले कि उसने किन चीज़ों का अनुरोध किया था।

![Tachyon के साथ भेजने वाला payment details को recipient तक out of band पहुँचाता है, और wallet पूरी chain scan करने के बजाय केवल आवश्यक data प्राप्त करने के लिए oblivious synchronization का उपयोग करता है](/content-images/tachyon-oblivious-sync.svg)

<br/>

## wallet उपयोग करने वाले व्यक्ति के लिए इसका क्या अर्थ होगा

- **Syncing का बढ़ना chain के साथ बंद हो जाता है।** आपके wallet को अपडेट होने में लगने वाला समय Zcash के आकार के बजाय आपकी अपनी गतिविधि के अनुरूप होगा।
- **भुगतान किसी को bill देने जैसे हो जाते हैं।** payment request में recipient की आवश्यक जानकारी होती है, इसलिए sender और recipient के बीच का आदान-प्रदान आज की अपेक्षा अधिक महत्वपूर्ण हो जाता है।
- **Wallets अधिक ज़िम्मेदारी उठाते हैं।** क्योंकि chain में अब आपके payment details की encrypted copy नहीं होती, इसलिए wallet data खोना अधिक मायने रखता है। Backup और recovery protocol feature होने के बजाय ऐसी चीज़ बन जाते हैं जिसे wallet software को सही ढंग से करना होगा।
- **कुछ परिचित हिस्से स्थानांतरित होते हैं या गायब हो जाते हैं।** Tachyon key diversification, viewing keys, और payment addresses को core protocol से बाहर निकालकर wallet layer पर छोड़ देता है। यह प्रस्ताव के अधिक परिणामकारी हिस्सों में से एक है और इस पर अभी भी काम हो रहा है।

<br/>

## तकनीकी पाठकों के लिए एक नज़दीकी नज़र

Tachyon को Orchard protocol में reverse-compatible बदलाव के रूप में वर्णित किया गया है। इसे या तो मौजूदा Orchard pool के upgrade के रूप में या [turnstile](https://zechub.wiki/zcash-tech/the-turnstile) के माध्यम से पहुँचे अलग shielded pool के रूप में लागू किया जा सकता है, वही तंत्र जिसका Zcash ने Ironwood के लिए उपयोग किया था। चुनाव deployment को प्रभावित करता है, डिज़ाइन को नहीं।

यह Orchard से कई चीज़ें बनाए रखता है: RedPallas key re-randomization, homomorphic value commitments और binding signatures, तथा वह partitioned key structure जो किसी device को spend authority दिए बिना proving delegate करने देता है।

Scaling का कार्य **proof-carrying data** पर आधारित है, एक ऐसी तकनीक जिसमें data अपनी सही होने के proof के साथ चलता है, ताकि उसे अन्य proof-carrying data के साथ जोड़ने पर ऐसी चीज़ बने जो उन proofs को विरासत में ले और विस्तारित करे। यही बड़ी मात्रा में सत्यापित कार्य को किसी छोटे और जाँचने में तेज़ चीज़ में compress करने देता है। Zcash के पीछे की टीम द्वारा खोजा गया Halo ही वह चीज़ है जिसने proof-carrying data को निर्माण के लिए पर्याप्त रूप से व्यावहारिक बनाया।

तीसरी कड़ी **shielded transaction aggregates** है, जो shielded state changes के संप्रेषण का तरीका बदलती है और signing के तरीके पर उसके परिणामी प्रभाव पड़ते हैं।

<br/>

## कार्य कहाँ तक पहुँचा है

Tachyon एक **प्रस्ताव है, जारी की गई सुविधा नहीं**। यह अप्रैल 2025 में प्रकाशित हुआ था, और मई 2025 में प्रकाशित follow-up post ने consensus के प्रभावों पर विचार किया। इसे Ironwood के बाद अगले बड़े upgrade NU7 के उम्मीदवार के रूप में नामित किया गया है, लेकिन NU7 की सामग्री coinholder vote द्वारा तय होती है और Tachyon के बारे में कुछ भी निश्चित नहीं है।

लेखक के अपने शब्दों में, यह speculative research के बजाय एक क्रियान्वित की जा सकने वाली योजना है, लेकिन इसके लिए Sapling के तुलनीय engineering प्रयास की आवश्यकता है, तथा कुछ कठिन प्रश्नों को जानबूझकर बाद के लिए छोड़ा गया है।

संबंधित कार्य पहले से दिखाई दे रहा है। [Zakura](https://zechub.wiki/zcash-tech/zakura-node), जुलाई 2026 में जारी किया गया एक full नोड, Project Tachyon और Valar Group का संयुक्त प्रयास है तथा इन network-level परिवर्तनों में से कुछ का पूर्वावलोकन करता है। [Private information retrieval](https://zechub.wiki/zcash-tech/private-information-retrieval) शोध उसी scanning bottleneck को एक अलग दृष्टिकोण से हल करने का लक्ष्य रखता है।

<br/>

## आम गलतफहमियाँ

- **Tachyon लाइव नहीं है।** आज कोई wallet इसका उपयोग नहीं करता, और किसी upgrade ने इसे सक्रिय नहीं किया है।
- **Tachyon, Ironwood के समान नहीं है।** Ironwood जुलाई 2026 में सक्रिय हुआ और Orchard pool तथा turnstile से संबंधित था। Tachyon scaling के बारे में एक अलग, बाद का प्रस्ताव है।
- **Tachyon privacy में कमी नहीं है।** लक्ष्य ledger indistinguishability बनाए रखते हुए scaling cost हटाना है, न कि गति के बदले privacy का सौदा करना।
- **zk-SNARK verification कभी bottleneck नहीं था।** प्रस्ताव स्पष्ट करता है कि धीमा हिस्सा wallets द्वारा state खोजने और समन्वय करने का तरीका है, न कि proofs जाँचने की लागत।
- **"NU7 के लिए लक्षित" कोई प्रतिबद्धता नहीं है।** NU7 में क्या जाएगा, यह vote से तय होता है।

<br/>

## शब्दावली

| शब्द | अर्थ |
|---|---|
| Trial decryption | आपको संबोधित transactions खोजने के लिए एक-एक करके transactions को decrypt करने का प्रयास |
| In-band secret distribution | भुगतान रहस्य को blockchain पर transaction के अंदर रखना, जैसा आज Zcash करता है |
| Out-of-band payment | भुगतान विवरणों को chain के माध्यम से भेजने के बजाय सीधे sender और recipient के बीच भेजना |
| Oblivious synchronization | wallet को आवश्यक chain data प्राप्त करना, बिना यह उजागर किए कि किस data का अनुरोध किया गया था |
| Proof-carrying data (PCD) | ऐसा data जो अपनी सही होने के proof के साथ चलता है, ताकि proofs को जोड़ा और compress किया जा सके |
| Shielded transaction aggregate | Shielded state changes को bundle करने का Tachyon का तरीका, जो उनके संप्रेषण और signing का तरीका बदलता है |
| लेजर अविभेद्यता | वह गुण कि shielded transactions को एक-दूसरे से अलग नहीं पहचाना जा सकता |

<br/>

## FAQ

**क्या इससे मेरा wallet तेज़ी से sync होगा?** यही लक्ष्य है। Syncing का समय chain के आकार के बजाय आपकी अपनी गतिविधि के अनुसार होगा। अभी कुछ भी जारी नहीं हुआ है, इसलिए उद्धृत करने के लिए अभी कोई मापी गई संख्या नहीं है।

**क्या मुझे अभी कुछ करने की ज़रूरत है?** नहीं। Tachyon एक प्रस्ताव है। यदि इसे अपनाया जाता है, तो यह सामान्य सूचना के साथ network upgrade के माध्यम से आएगा।

**क्या viewing keys हटाने का मतलब read access साझा करने की क्षमता खोना है?** प्रस्ताव इस क्षमता को core protocol से निकालकर wallet layer में ले जाता है। व्यवहार में यह कैसा दिखेगा, यह खुले प्रश्नों में से एक है।

**अगर Tachyon जारी होता है तो क्या मेरा पैसा जोखिम में है?** Deployment में या तो Orchard upgrade या turnstile का उपयोग होगा, दोनों इस तरह डिज़ाइन किए गए हैं कि value सार्वजनिक accounting rules के तहत स्थानांतरित हो। Ironwood पृष्ठ बताता है कि turnstile कैसे काम करता है।

<br/>

## संबंधित पृष्ठ

- [Private Information Retrieval](https://zechub.wiki/zcash-tech/private-information-retrieval) - उसी wallet scanning bottleneck का एक अन्य समाधान
- [Zakura नोड](https://zechub.wiki/zcash-tech/zakura-node) - Tachyon के engineering प्रयास से आंशिक रूप से निर्मित एक नोड
- [Ironwood](https://zechub.wiki/zcash-tech/ironwood) - जुलाई 2026 में सक्रिय हुआ upgrade, जिसे अक्सर Tachyon समझ लिया जाता है
- [The Turnstile](https://zechub.wiki/zcash-tech/the-turnstile) - वह तंत्र जिसका उपयोग Tachyon अपने स्वयं के pool के रूप में लागू होने पर कर सकता है
- [Post-Quantum Security](https://zechub.wiki/zcash-tech/post-quantum-security) - वह स्थान जहाँ Tachyon दीर्घकालिक protocol कार्य के साथ स्थित है
- [Zcash कैसे संगठित है](https://zechub.wiki/start-here/how-zcash-is-organized) - यह कार्य कौन कर रहा है और ecosystem एक साथ कैसे जुड़ता है

<br/>

## संसाधन

- [Tachyon: Oblivious Synchronization के साथ Zcash को scale करना](https://seanbowe.com/blog/tachyon-scaling-zcash-oblivious-synchronization/) - Sean Bowe, 2 अप्रैल 2025, मूल प्रस्ताव
- [Tachyaction at a Distance](https://seanbowe.com/blog/tachyaction-at-a-distance/) - Sean Bowe, 15 मई 2025, consensus और protocol प्रभाव, protocol developers के लिए लिखा गया
- [Sean Bowe का ब्लॉग](https://seanbowe.com/blog/) - जहाँ Tachyon श्रृंखला प्रकाशित होती है
- [tachyon.z.cash](https://tachyon.z.cash/) - परियोजना साइट
