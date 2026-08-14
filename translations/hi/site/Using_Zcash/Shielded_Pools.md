---
<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Shielded_Pools.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash वैल्यू पूल

## संक्षेप में

- Zcash में वर्तमान में **5 वैल्यू पूल** हैं: Sprout (legacy), Sapling, Orchard (केवल-spend), Ironwood, और Transparent।
- **Ironwood** वर्तमान प्रमुख shielded pool है, जो 28 जुलाई 2026 को NU6.3 upgrade के बाद लाइव हुआ।
- **Orchard** अब **केवल-spend** है: इसमें कोई नई वैल्यू प्रवेश नहीं कर सकती, और मौजूदा फंड Ironwood में migrate हो रहे हैं।
- **Sapling** (`zs` से शुरू होने वाले z-addresses) अब भी व्यापक रूप से supported है और shielded ZEC की एक महत्वपूर्ण मात्रा को सुरक्षित रखता है।
- **Transparent** addresses (t...) कोई transaction privacy प्रदान नहीं करते और Bitcoin की तरह काम करते हैं।
- **Sprout** एक legacy shielded pool है जिसे सक्रिय उपयोग से हटा दिया गया है।
- Orchard से Ironwood migration **जारी है** और इसका audit सार्वजनिक रूप से turnstile द्वारा किया जाता है।
- सबसे मजबूत privacy guarantees के लिए, उपयोगकर्ताओं को जहाँ संभव हो **shielded-to-shielded (z → z)** transactions को प्राथमिकता देते रहना चाहिए।


<br/>

## Zcash वैल्यू पूल को समझना

Zcash फंड्स को अलग-अलग accounting systems में विभाजित करता है जिन्हें value pools कहा जाता है। प्रत्येक पूल के अपने cryptographic rules और privacy properties होते हैं, जबकि protocol उनके बीच होने वाली कुल वैल्यू मूवमेंट को track करता है।

आज, नेटवर्क में पाँच प्रमुख value pools हैं:

- Transparent — सार्वजनिक और on-chain पूरी तरह दिखाई देने वाला।
- Sapling — पहला व्यापक रूप से अपनाया गया आधुनिक shielded pool, जो अभी भी सक्रिय है।
- Orchard — पिछला प्रमुख shielded pool, जो अब केवल-spend है।
- Ironwood — वर्तमान प्रमुख shielded pool, जिसे NU6.3 में पेश किया गया।
- Sprout — मूल shielded pool जो 2016 में Zcash के साथ लॉन्च हुआ।
  


जैसे-जैसे Zcash विकसित होता है, नए shielded pools पेश किए जा सकते हैं ताकि security, privacy, usability, और auditability में सुधार हो सके, जबकि मौजूदा फंड्स के साथ compatibility बनी रहे।

<br/>

![img1](/content-images/4ba8cca2-cea5-42d2-8ec2-2122b26f5144-9db37e245e.webp)
चित्र 1: अक्टूबर, 2025 तक के वर्तमान 4 pools को दिखाता हुआ एक चार्ट

<br/>

## Shielded Pools


1. <h3 id="ironwood" class="text-3xl font-bold my-4">Ironwood Pool</h3>

Ironwood वर्तमान प्रमुख shielded pool है। यह 28 जुलाई 2026 को block 3,428,143 पर NU6.3 network upgrade के हिस्से के रूप में सक्रिय हुआ, और अब नई shielded value यहीं रहती है।

यह इसलिए अस्तित्व में आया क्योंकि मई 2026 में Orchard की proving system में एक vulnerability पाई गई थी। ऐसा कोई प्रमाण नहीं है कि इसका कभी exploit किया गया, लेकिन इस flaw का मतलब था कि केवल proofs के आधार पर shielded supply को sound सिद्ध नहीं किया जा सकता था। उसी जगह patch करने के बजाय, नेटवर्क ने एक corrected circuit के साथ एक नया पूल बनाया और value को एक ऐसे turnstile के पार ले गया जो हर coin की सार्वजनिक रूप से गिनती करता है। यही accounting उस guarantee को बहाल करती है कि shielded supply पूरी तरह backed है।

Ironwood, Orchard के Action model और Halo 2 proofs का पुनः उपयोग करता है, इसलिए रोज़मर्रा के उपयोग में यह उसी तरह व्यवहार करता है। दो चीज़ें नई हैं: transactions v6 format का उपयोग करते हैं, और Ironwood notes [ZIP 2005](https://zips.z.cash/zip-2005) के अंतर्गत **quantum-recoverable** हैं, जिसका अर्थ है कि यदि भविष्य में कोई quantum computer आज की cryptography को तोड़ देता है, तब भी coin का on-chain record recover किया जा सकता है। यह recovery path है, quantum resistance नहीं, और यह पुराने pools पर लागू नहीं होता।

आपको नए address की आवश्यकता नहीं है। Unified addresses कई receivers को bundle करते हैं, और wallets आपके लिए सही pool चुनते हैं।

____

2. <h3 id="orchard" class="text-3xl font-bold my-4">Orchard Pool</h3>


![img2](/content-images/a672e001-6dbc-4e76-ab31-0ed7d7d2ff72-93b5a23e5d.webp)
चित्र 2: अक्टूबर, 2025 तक Orchard pool को दिखाता हुआ एक चार्ट

<br/>

Orchard Shielded Pool 31 मई 2022 को NU5 network upgrade के हिस्से के रूप में सक्रिय किया गया था। Orchard ने एक नया shielded protocol पेश किया जिसने trusted setup की आवश्यकता को समाप्त किया और Unified Addresses (UAs) द्वारा उपयोग किया जाने वाला प्रमुख shielded pool बन गया।

Orchard ने transaction metadata leakage को कम करके और पारंपरिक shielded inputs तथा outputs के बजाय Actions पर आधारित अधिक flexible transaction model पेश करके usability, efficiency, और privacy में महत्वपूर्ण सुधार किया।

28 जुलाई 2026 को Ironwood upgrade सक्रिय होने के बाद से, **Orchard केवल-spend है**। कोई नई value इस pool में प्रवेश नहीं कर सकती। वहाँ पहले से मौजूद funds अभी भी spend किए जा सकते हैं, और turnstile के माध्यम से Ironwood में migrate हो रहे हैं। Wallets यह आपके लिए संभालते हैं, हालांकि अधिकांश आपको इसकी गति पर कुछ नियंत्रण देते हैं।

यदि आपके पास Orchard funds हैं, तो देखें [Ironwood](/zcash-tech/ironwood) कि व्यवहार में इस migration का क्या अर्थ है।

____

3. <h3 id="sapling" class="text-3xl font-bold my-4">Sapling Pool</h3>


![img3](/content-images/b1c6bb71-9356-45eb-8e4a-19d7cf1790ae-5e3051b082.webp)
चित्र 3: अक्टूबर, 2025 तक Sapling pool को दिखाता हुआ एक चार्ट

<br/>

[Zcash Sapling](https://z.cash/upgrade/sapling) Zcash protocol का एक upgrade था जिसे 28 अक्टूबर, 2018 को पेश किया गया। यह Sprout नामक पहले के संस्करण की तुलना में एक बड़ा सुधार है, जिसमें privacy, efficiency और usability के संदर्भ में कुछ सीमाएँ थीं। 

इन upgrades में shielded addresses के लिए बेहतर performance, बेहतर viewing keys शामिल हैं ताकि उपयोगकर्ता अपने incoming और outgoing transactions को अपनी private keys उजागर किए बिना देख सकें, और transaction signature के दौरान hardware wallet के लिए Independent Zero Knowledge keys भी शामिल हैं। 

Zcash Sapling उपयोगकर्ताओं को Sprout Series की तुलना में, जहाँ अधिक समय लगता था, केवल कुछ सेकंड में private transactions करने में सक्षम बनाता है। 

Transaction shielding privacy को बढ़ाता है, जिससे third-parties के लिए transactions को आपस में जोड़ना और transfer किए जा रहे ZEC की मात्रा निर्धारित करना असंभव हो जाता है। Sapling private transactions उत्पन्न करने के लिए computational requirements को कम करके usability में भी सुधार करता है, जिससे यह उपयोगकर्ताओं के लिए अधिक सुलभ बनता है।

Sapling wallet addresses "zs" से शुरू होते हैं और यह सभी supported Zcash Shielded Wallets (YWallet, Zingo Wallet, Nighthawk आदि) में देखा जा सकता है, जिनमें built-in Sapling addresses होते हैं। Zcash Sapling privacy और transaction efficiency के संदर्भ में technology में एक महत्वपूर्ण विकास का प्रतिनिधित्व करता है, जो Zcash को उन उपयोगकर्ताओं के लिए एक practical और effective cryptocurrency बनाता है जो privacy और security को महत्व देते हैं।

____

4. <h3 id="sprout" class="text-3xl font-bold my-4">Sprout Pool</h3>


![img4](/content-images/956eceed-f4d6-4087-99d0-32a770449dda-a3cc45305e.webp)
चित्र 4: अक्टूबर, 2025 तक Sprout pool को दिखाता हुआ एक चार्ट

Sprout पहला open permissionless Zero Knowledge privacy protocol था जो कभी लॉन्च किया गया। इसे 28 अक्टूबर, 2016 को लॉन्च किया गया था।

Sprout addresses की पहचान उनके पहले दो अक्षरों से होती है, जो हमेशा "zc" होते हैं। इसका नाम "Sprout" मुख्य रूप से इस बात पर ज़ोर देने के लिए रखा गया था कि यह software युवा था, एक budding blockchain था जिसमें बढ़ने की बड़ी क्षमता थी और जो development के लिए खुला था। 

Sprout का उपयोग [Zcash slow start Mining](https://electriccoin.co/blog/slow-start-and-mining-ecosystem/) के शुरुआती tool के रूप में किया गया, जिससे ZEC का distribution और miners के लिए block rewards संभव हुए। 

जैसे-जैसे Zcash ecosystem shielded transactions की बढ़ती संख्या के साथ विस्तृत होता गया, यह देखा गया कि Zcash Sprout Series उपयोगकर्ता privacy, transaction scalability और processing के मामले में सीमित और कम efficient होती जा रही थी। इससे network में संशोधन और Sapling Upgrade की ओर बढ़ना पड़ा। 

---
5. <h3 id="transparent" class="text-3xl font-bold my-4">Transparent Pool</h3>
<br/>

![img5](/content-images/01de2907-b62d-4421-83d7-ea4908faa828-6f74b724ed.webp)
चित्र 5: अक्टूबर, 2025 तक Transparent pool को दिखाता हुआ एक चार्ट

<br/>

Zcash Transparent pool unshielded और non-private है। Zcash पर Transparent wallet addresses अक्षर "t" से शुरू होते हैं, और transactions के लिए इस address type का उपयोग करने पर privacy बहुत कम होती है।

Zcash में Transparent transactions, Bitcoin transactions के समान हैं, जो multi-signature transactions को support करते हैं और standard public addresses का उपयोग करते हैं।

Zcash Transparent addresses का उपयोग अधिकतर centralized exchanges द्वारा किया जाता है ताकि उपयोगकर्ताओं के बीच ZEC भेजने और प्राप्त करने के दौरान उच्च transparency और network confirmation सुनिश्चित की जा सके।

यह भी ध्यान देना महत्वपूर्ण है कि जबकि Zcash Shielded addresses transactions के दौरान उच्च privacy प्रदान करते हैं, उन्हें transactions process करने के लिए अधिक computational resources की भी आवश्यकता होती है। इसलिए, कुछ उपयोगकर्ता उन transactions के लिए Transparent addresses अपना सकते हैं जिनमें समान स्तर की privacy की आवश्यकता नहीं होती।

<br/>

## Pool Transfer के लिए Recommended Practice

जब Zcash Network पर transaction के दौरान उच्च स्तर की privacy पर विचार किया जाता है, तो नीचे दिए गए practices का पालन करने की सिफारिश की जाती है;

Zcash blockchain पर "z to z" wallets के बीच होने वाले transactions अधिकांशतः shielded होते हैं और उत्पन्न होने वाली उच्च privacy के कारण इन्हें कभी-कभी Private Transaction कहा जाता है। जब privacy की आवश्यकता हो, तब $ZEC भेजने और प्राप्त करने का यह आमतौर पर सबसे अच्छा और सबसे अधिक recommended तरीका है। 

---

जब आप "Z-address" से "T-address" पर ZEC भेजते हैं, तो यह मूलतः Deshielding transaction का एक रूप होता है। इस प्रकार के transaction में privacy का स्तर हमेशा ऊँचा नहीं होता क्योंकि Transparent Address पर ZEC भेजने के प्रभाव के कारण कुछ जानकारी blockchain पर दिखाई देगी। जब उच्च privacy की आवश्यकता हो, तब Deshielding transaction की हमेशा सिफारिश नहीं की जाती। 

---

Transparent Address (T-address) से Z-address पर ZEC transfer करना simply Shielding कहलाता है। इस प्रकार के transaction में privacy का स्तर z-z transaction की तुलना में हमेशा उतना ऊँचा नहीं होता, लेकिन जब privacy की आवश्यकता हो तब यह भी recommended है। 

---

Zcash Network पर Transparent Address (T-address) से दूसरे Transparent Address (T-address) पर ZEC भेजना (T-T transaction) Bitcoin transaction के बहुत समान है और इसी कारण Zcash पर T-T transactions को हमेशा Public transactions कहा जाता है, क्योंकि sender और receiver दोनों के transaction details सार्वजनिक रूप से दिखाई देने लगते हैं, जिससे ऐसे transaction में privacy का स्तर बहुत कम हो जाता है। 

अधिकांश Cryptocurrency Centralized exchanges Zcash blockchain पर transaction करते समय Transparent Address ("T-address) का उपयोग करते हैं, लेकिन इस प्रकार के transaction (T-T) में कोई private properties नहीं होंगी।

<br/>

## Orchard से Ironwood Migration

Migration अभी चल रहा है। Orchard को नए deposits के लिए बंद कर दिया गया है, और वहाँ अभी भी मौजूद value एक-एक transaction करके Ironwood में जा रही है। आप totals को [ironwood.live](https://ironwood.live/) पर देख सकते हैं।

इसका क्या मतलब है, यह इस बात पर निर्भर करता है कि आपके funds कहाँ हैं:

1. **नई shielded activity** अपने-आप Ironwood में जाती है। आपको कुछ करने की आवश्यकता नहीं है।
2. **मौजूदा Orchard funds** को migrate होना होगा। Maintained wallets यह आपके लिए करते हैं, आमतौर पर सब कुछ एक साथ करने के बजाय चरणों में।
3. **Sapling अप्रभावित है** और अब भी funds स्वीकार करता है। केवल Orchard को बंद किया गया था।
4. **Turnstile हर चीज़ की गिनती करता है** जो pools के बीच पार जाती है, और यही साबित करता है कि रास्ते में कोई coin invent नहीं किया गया।

> **एक privacy caveat जिसे जानना महत्वपूर्ण है।** Turnstile pools के बीच पार होने वाली *amount* को, block height के साथ, सार्वजनिक करता है। Sender और receiver हमेशा की तरह छिपे रहते हैं, लेकिन कोई विशिष्ट amount वापस आपसे जोड़ी जा सकती है। इसी कारण wallets आपके balance को एक पहचाने जाने योग्य lump में ले जाने के बजाय standard denominations का उपयोग करते हुए चरणों में migrate करते हैं। अपने wallet को अपनी गति से काम करने दें, और Tor या VPN का उपयोग करने पर विचार करें ताकि आपका IP आपके द्वारा move की गई amounts से न जुड़ जाए।

Upgrade स्वयं के लिए [Ironwood](/zcash-tech/ironwood) देखें, और accounting कैसे काम करती है इसके लिए [The Turnstile](/zcash-tech/the-turnstile) देखें।

<br/>

## बचने योग्य आम गलतियाँ

- **t-address से t-address पर भेजना** — पूरी तरह सार्वजनिक, कोई privacy नहीं। हमेशा funds को पहले shield करें।
- **यह मान लेना कि Orchard अभी भी funds स्वीकार करता है** — 28 जुलाई 2026 से यह केवल-spend है। Value बाहर जा सकती है, लेकिन कुछ नया अंदर नहीं जा सकता
- **Sapling और Unified addresses को भ्रमित करना** — Sapling addresses `zs` से शुरू होते हैं। Unified addresses `u1` से शुरू होते हैं और कई receivers को bundle करते हैं, इसलिए आपका payment किस pool में पहुँचेगा यह इस बात पर निर्भर करता है कि उस address में कौन से receivers शामिल हैं
- **Sprout pool में funds छोड़ देना** — Sprout को वर्षों पहले deprecated कर दिया गया था; उन funds को वहाँ से बाहर ले जाएँ
- **यह उम्मीद करना कि migration पूरी तरह अदृश्य होगी** — turnstile के पार जाने वाली amount सार्वजनिक होती है, भले ही sender और receiver न हों
- **यह मान लेना कि t → z (shielding) पूरी तरह private है** — shielding की क्रिया स्वयं on-chain दिखाई देती है; contents नहीं

---

## संबंधित पृष्ठ

- [Ironwood](/zcash-tech/ironwood) — वह upgrade जिसने वर्तमान pool बनाया
- [The Turnstile](/zcash-tech/the-turnstile) — pools के बीच moving value का audit कैसे किया जाता है
- [Wallets](/using-zcash/wallets) — कौन से wallets maintained हैं और Ironwood के लिए तैयार हैं
- [Transactions](/using-zcash/transactions) — shielded transactions कैसे भेजें
- [Buying ZEC](/using-zcash/buying-zec) — pools में उपयोग करने से पहले ZEC प्राप्त करना
- [ZK-SNARKs](/zcash-tech/zk-snarks) — shielded pools की cryptographic foundation
- [What is ZEC and Zcash](/start-here/what-is-zec-and-zcash) — Zcash privacy की पृष्ठभूमि
