---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Ironwood.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="पेज संपादित करें"/>
</a>

# Ironwood

> Ironwood, Zcash mainnet पर block 3,428,143 पर सक्रिय होता है, जिसका अनुमानित समय 28 जुलाई 2026 UTC के आसपास है।

आप क्या समझकर जाएँगे: Ironwood क्या बदलता है, छिपे हुए धन में बग गंभीर क्यों होता है, और turnstile कैसे किसी को भी यह पुष्टि करने देता है कि कोई ZEC गढ़ा नहीं गया।

Ironwood, Zcash का एक [network upgrade](../start-here/network-upgrades) है, औपचारिक रूप से NU6.3, जो इसी नाम का एक नया shielded pool प्रस्तुत करता है। एक [shielded pool](../using-zcash/shielded-pools) उन निधियों का समूह होता है जिनकी राशियाँ और मालिक [zero-knowledge cryptography](../zcash-tech/zk-snarks) द्वारा छिपे रहते हैं। Ironwood का उद्देश्य मौजूदा Orchard shielded pool में पाए गए एक soundness bug को सीमित करना और उसका audit करना है, तथा समुदाय को यह जाँचने का एक अधिक मजबूत तरीका देना है कि ZEC की कुल आपूर्ति ईमानदार है। इसके consensus rules [ZIP 258](https://zips.z.cash/zip-0258) में निर्दिष्ट हैं।

यह क्यों महत्वपूर्ण है। Bitcoin जैसे transparent धन में, कोई भी सार्वजनिक ledger पढ़कर यह जाँच सकता है कि कोई coin गढ़ा नहीं गया। Shielded धन राशियों को छिपा देता है, इसलिए आप केवल देखकर यह नहीं जान सकते। इसके बजाय, स्वयं cryptography को यह गारंटी देनी होती है कि कोई भी गुप्त रूप से धन नहीं बना सकता। Ironwood महत्वपूर्ण है क्योंकि Orchard pool के लिए इस गारंटी में एक bug पाया गया। यह upgrade उस कमी को बंद करता है और किसी को भी यह पुष्टि करने का तरीका देता है कि ZEC की कुल आपूर्ति अब भी ईमानदार है।

Zcash में नए हैं? पहले [ZEC और Zcash क्या हैं](../start-here/what-is-zec-and-zcash) और [Shielded Pools](../using-zcash/shielded-pools) पढ़ें, फिर यहाँ वापस आएँ।

![Ironwood value migration flow: value Orchard pool से निकलती है, turnstile checkpoint से गुजरती है, और नए Ironwood pool में प्रवेश करती है](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/ironwood-flow.png)

## Ironwood की आवश्यकता क्यों पड़ी

मई 2026 के अंतिम दिनों में, स्वतंत्र security researcher Taylor Hornby ने, [Shielded Labs](../zcash-organizations/shielded-labs) के लिए एक protocol audit के दौरान, Orchard shielded pool में एक soundness bug का जिम्मेदारीपूर्वक खुलासा किया। उस समय Orchard, Zcash का सबसे नया shielded pool था, और यह flaw उसके zero-knowledge circuit के एक elliptic-curve हिस्से में था, जो [Halo](../zcash-tech/halo) 2 proving system का उपयोग करता है।

1. soundness bug का अर्थ है कि वह गणित जो यह साबित करता है कि कोई transaction वैध है, उसे पूरी तरह से गारंटी नहीं देता।
2. सिद्धांततः, कोई attacker इस flaw का उपयोग करके Orchard pool के भीतर अमान्य value गढ़ सकता था और ऐसे funds खर्च कर सकता था जो वास्तव में उसके नहीं थे, बिना कोई ऐसा निशान छोड़े जिसे कोई सामान्य नोड पकड़ सके।
3. Zcash का turnstile अब भी यह सीमा तय करता था कि Orchard से कुल कितनी value कभी बाहर जा सकती है, इसलिए कुल आपूर्ति को बढ़ाया नहीं जा सकता था, लेकिन pool की अपनी cryptography अब यह गारंटी नहीं देती थी कि उसके भीतर हर छिपा हुआ coin वास्तविक था।

![बग की व्याख्या: एक transaction 5 ZEC डालता है, लेकिन त्रुटिपूर्ण proof तब भी पास हो जाता है जब 7 ZEC बाहर आते हैं, जिससे शून्य से 2 ZEC बन जाते हैं](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/ironwood-bug.png)

ऊपर दिए गए अंक एक सरल चित्रण हैं। वास्तविक flaw circuit के गणित के एक विशिष्ट हिस्से में था, न कि अंदर और बाहर जाने वाले coins की शाब्दिक गिनती में। यहाँ समझने योग्य मुख्य बात केवल यह है कि एक soundness bug pool के भीतर बिना पता चले value के निर्माण की अनुमति दे सकता है।

महत्वपूर्ण रूप से, ऐसा कोई प्रमाण नहीं है कि इस bug का कभी दुरुपयोग हुआ, उपयोगकर्ताओं की निधियों पर किसी प्रभाव का कोई प्रमाण नहीं है, और ZEC की कुल आपूर्ति में किसी परिवर्तन का भी कोई प्रमाण नहीं है। इसे security research के माध्यम से खोजा गया और किसी भी ज्ञात नुकसान से पहले ठीक कर दिया गया।

## प्रतिक्रिया

Zcash समुदाय ने सभी fixes एक साथ जारी करने के बजाय चरणों में जारी किए।

![Ironwood response timeline: Orchard bug मई 2026 में मिलता है, pool जून 2026 में रोका जाता है, circuit को NU6.2 में ठीक किया जाता है, और Ironwood लगभग 28 जुलाई 2026 को सक्रिय होता है](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/ironwood-timeline.png)

1. जून 2026 की शुरुआत में, एक अस्थायी उपाय के रूप में Orchard pool को निष्क्रिय कर दिया गया, जबकि पूर्ण fix तैयार किया जा रहा था।
2. NU6.2 upgrade ने Orchard circuit को स्वयं ठीक किया, जिससे मूल soundness vulnerability बंद हो गई।
3. NU6.3 upgrade, Ironwood, एक नया shielded pool और एक public checkpoint प्रस्तुत करता है ताकि value पुराने Orchard pool से पूर्ण audit के तहत बाहर जा सके।

![NU6.2 में fix: सुधारा गया proof यह आवश्यक करता है कि inputs outputs के बराबर हों, इसलिए वैध 5 ZEC output पास हो जाता है जबकि 7 ZEC output करने का प्रयास अस्वीकार कर दिया जाता है](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/ironwood-fix.png)

## Ironwood pool क्या करता है

NU6.2 ने सभी नए transactions के लिए Orchard circuit को सुरक्षित कर दिया, लेकिन पुराने rules के तहत बनाई गई value अब भी Orchard pool में मौजूद है। Ironwood उस value को एक स्वच्छ गंतव्य और उसके स्थानांतरण के दौरान audit करने का एक तरीका देता है।

Ironwood pool एक नया shielded value pool है जो NU6.3 के सक्रिय होने पर बनाया जाता है। यह सुधारे गए circuit पर आधारित है और quantum-recoverable note format का उपयोग करता है (ऐसा design जो funds को recover करने देता है यदि कभी [quantum computers](../zcash-tech/post-quantum-security) आज की cryptography को तोड़ दें), जिसे [ZIP 2005](https://zips.z.cash/zip-2005) में परिभाषित किया गया है।

1. सक्रियण के बाद, पुराना Orchard pool केवल spend-only बन जाता है, इसलिए उसमें कोई नई value प्रवेश नहीं कर सकती।
2. नई shielded value अब Ironwood में प्रवाहित होती है।
3. Shielded ZEC वही मजबूत privacy guarantees बनाए रखता है जो sender, receiver, और amount को छिपाते हैं।

## turnstile

Ironwood का मुख्य विचार turnstile है, एक accounting checkpoint जिससे होकर हर coin को पुराने Orchard pool से Ironwood में जाते समय गुजरना होता है।

> छिपे हुए धन के लिए turnstile वही काम करता है जो बैंक vault के लिए काँच का दरवाज़ा करता है। आप अब भी अंदर नहीं देख सकते, लेकिन आप ठीक-ठीक गिन सकते हैं कि क्या अंदर गया और क्या बाहर आया।

1. Orchard से निकलने वाले funds को Ironwood में प्रवेश करने से पहले एक public verification point पर गिना जाता है।
2. इससे कोई भी audit कर सकता है कि कितना ZEC migrate हुआ, जिससे वास्तविक circulating supply पर विश्वास और मजबूत होता है।
3. यदि पहले वाले bug के माध्यम से कोई नकली ZEC बनाया गया होता, तो यह migration accounting वही जगह होती जहाँ वह सामने आता।

Turnstiles, Zcash के लिए नए नहीं हैं। नेटवर्क ने इन्हें पहले भी, Sprout, Sapling, और Orchard pools की सीमाओं पर उपयोग किया है, ताकि pools के बीच जाने वाली value auditable बनी रहे और कोई भी pool उससे अधिक जारी न कर सके जितनी वैध रूप से उसमें प्रवेश कर चुकी थी।

Consensus rules, Ironwood सहित हर value pool को नेटवर्क की अधिकतम money limit के भीतर रखते हैं, इसलिए pool balances कभी negative नहीं हो सकते।

## उपयोगकर्ताओं को क्या करना चाहिए

Wallets और नोड software इसका अधिकांश भाग स्वचालित रूप से संभालते हैं, लेकिन व्यावहारिक परिवर्तन सरल है: समय के साथ, अपने shielded holdings को पुराने Orchard pool से turnstile के माध्यम से Ironwood pool में ले जाएँ। अपने wallet provider के मार्गदर्शन का पालन करें, और activation block से पहले हमेशा किसी supported release पर update करें।

## शब्दावली

| शब्द | सरल अर्थ |
|---|---|
| Shielded pool | उन निधियों का समूह जिनकी राशियाँ और मालिक zero-knowledge cryptography द्वारा छिपे रहते हैं |
| Soundness bug | ऐसी त्रुटि जो किसी अमान्य transaction को proof check पार करने देती है मानो वह वैध हो |
| Turnstile | एक public checkpoint जो pools के बीच जाने वाली value को गिनता है ताकि supply auditable बनी रहे |
| Spend-only | ऐसा pool जिससे आप खर्च कर सकते हैं, लेकिन उसमें नई value नहीं जोड़ सकते |
| Network upgrade (NU) | Zcash के consensus rules में समन्वित परिवर्तन, जो एक निर्धारित block height पर सक्रिय होता है |
| Quantum-recoverable note | ऐसा note format जिसे इस तरह design किया गया है कि यदि quantum computers कभी आज की cryptography को तोड़ दें, तो funds recover किए जा सकें |

## FAQ

क्या मेरा ZEC प्रभावित हुआ? नहीं। ऐसा कोई प्रमाण नहीं है कि bug का कभी उपयोग हुआ, उपयोगकर्ता निधियों पर कोई प्रभाव पड़ा, या कुल आपूर्ति में कोई बदलाव हुआ।

क्या मुझे कुछ करने की आवश्यकता है? activation block से पहले अपने wallet और नोड software को किसी supported release पर updated रखें। आपका wallet समय के साथ, जब आप खर्च करते हैं, funds को Ironwood में ले जाता है, इसलिए हाथ से जल्दी करने जैसा कुछ नहीं है। अपने wallet provider के मार्गदर्शन का पालन करें।

क्या Zcash अब भी private है? हाँ। Ironwood वही shielded privacy बनाए रखता है जो sender, receiver, और amount को छिपाती है। यह upgrade privacy के बारे में नहीं, बल्कि supply integrity के बारे में है।

क्या bug का कभी दुरुपयोग हुआ था? ऐसा कोई प्रमाण नहीं है। इसे security research के माध्यम से खोजा गया, जिम्मेदारी से प्रकट किया गया, और किसी भी ज्ञात नुकसान से पहले ठीक कर दिया गया।

पुराने Orchard pool का क्या होता है? वह spend-only बन जाता है। उसमें कोई नई value प्रवेश नहीं कर सकती, और मौजूदा value turnstile के माध्यम से Ironwood में जाती है, जहाँ migration का सार्वजनिक audit होता है।

## अपनी समझ जाँचें

यदि shielded pools के भीतर का ZEC छिपा हुआ है, तो कोई यह कैसे पुष्टि कर सकता है कि Orchard bug ने कुल आपूर्ति को गुप्त रूप से नहीं बढ़ाया?

<details>
<summary>उत्तर</summary>

turnstile के माध्यम से। पुराने Orchard pool से निकलने वाले हर coin को Ironwood में प्रवेश करते समय एक public checkpoint पर गिना जाता है। यदि बाहर जाने की कोशिश की गई value, वैध रूप से प्रवेश की गई value से अधिक होती, तो accounting संतुलित नहीं होती, इसलिए bug द्वारा बनाया गया कोई भी नकली मूल्य उसी द्वार पर सामने आ जाता।
</details>

### संसाधन

[ZIP 258: NU6.3 Network Upgrade का परिनियोजन](https://zips.z.cash/zip-0258)

[ZIP 257: Orchard Temporary Vulnerability Mitigation और NU6.2 Network Upgrade का परिनियोजन](https://zips.z.cash/zip-0257)

[ZIP 2005: Ironwood Quantum Recoverability](https://zips.z.cash/zip-2005)

[Ironwood: Zcash के लिए एक नया Shielded Pool](https://zodl.com/ironwood-a-new-shielded-pool-for-zcash/)

### यह भी देखें

[Zcash Network Upgrades](../start-here/network-upgrades)

[Shielded Pools](../using-zcash/shielded-pools)

[Halo](../zcash-tech/halo)

[zk-SNARKS](../zcash-tech/zk-snarks)

[Post Quantum Security](../zcash-tech/post-quantum-security)

[Shielded Labs](../zcash-organizations/shielded-labs)

[ZEC और Zcash क्या हैं](../start-here/what-is-zec-and-zcash)

---

श्रृंखला: [Network Upgrades index](../start-here/network-upgrades) · पिछला: [NU6.2](../zcash-tech/nu6-2)
