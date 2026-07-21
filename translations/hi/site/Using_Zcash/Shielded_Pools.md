<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Shielded_Pools.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="पेज संपादित करें"/>
</a>

# Zcash वैल्यू पूल्स

## संक्षेप में

- Zcash में वर्तमान में **4 वैल्यू पूल्स** हैं: Sprout (legacy), Sapling, Orchard, और Transparent।
- **Orchard** वर्तमान का मुख्य shielded pool है, जिसका उपयोग Unified Addresses (u1...) द्वारा किया जाता है।
- **Sapling** (`zs` से शुरू होने वाले z-addresses) अब भी व्यापक रूप से समर्थित है और shielded ZEC की एक महत्वपूर्ण मात्रा को सुरक्षित रखता है।
- **Transparent** addresses (t...) किसी भी प्रकार की transaction privacy प्रदान नहीं करते और Bitcoin की तरह काम करते हैं।
- **Sprout** एक legacy shielded pool है जिसे सक्रिय उपयोग से सेवानिवृत्त कर दिया गया है।
- **Ironwood** नामक एक भविष्य के shielded pool का प्रस्ताव रखा गया है, जिसका उद्देश्य privacy को बनाए रखते हुए shielded ZEC supply की अखंडता पर भरोसा मजबूत करना है।
- सबसे मजबूत privacy guarantees के लिए, उपयोगकर्ताओं को जहाँ भी संभव हो **shielded-to-shielded (z → z)** transactions को प्राथमिकता देनी चाहिए।


<br/>

## Zcash वैल्यू पूल्स को समझना

Zcash funds को अलग-अलग accounting systems में विभाजित करता है जिन्हें value pools कहा जाता है। हर pool के अपने cryptographic rules और privacy properties होते हैं, जबकि protocol उनके बीच होने वाले कुल value movement को track करता है।

आज, नेटवर्क में चार मुख्य value pools हैं:

- Transparent — सार्वजनिक और on-chain पूरी तरह दिखाई देने वाला।
- Sapling — पहला व्यापक रूप से अपनाया गया आधुनिक shielded pool।
- Orchard — Unified Addresses के साथ प्रस्तुत किया गया वर्तमान मुख्य shielded pool।
- Sprout — 2016 में Zcash के साथ लॉन्च किया गया मूल shielded pool।
  


जैसे-जैसे Zcash विकसित होता है, सुरक्षा, privacy, usability, और auditability को बेहतर बनाने के लिए नए shielded pools पेश किए जा सकते हैं, जबकि मौजूदा funds के साथ compatibility बनाए रखी जाती है।

<br/>

![img1](https://github.com/user-attachments/assets/4ba8cca2-cea5-42d2-8ec2-2122b26f5144)
चित्र 1: अक्टूबर, 2025 तक के वर्तमान 4 pools को दर्शाने वाला एक चार्ट

<br/>

## Shielded Pools 


1. <h3 id="orchard" class="text-3xl font-bold my-4">Orchard Pool</h3>


![img2](https://github.com/user-attachments/assets/a672e001-6dbc-4e76-ab31-0ed7d7d2ff72)
चित्र 2: अक्टूबर, 2025 तक Orchard pool को दर्शाने वाला एक चार्ट

<br/>

Orchard Shielded Pool को 31 मई, 2022 को NU5 network upgrade के हिस्से के रूप में सक्रिय किया गया था। Orchard ने एक नया shielded protocol पेश किया, जिसने trusted setup की आवश्यकता समाप्त कर दी और Unified Addresses (UAs) द्वारा उपयोग किया जाने वाला मुख्य shielded pool बन गया।

Orchard ने transaction metadata leakage को कम करके और पारंपरिक shielded inputs और outputs के बजाय Actions पर आधारित अधिक flexible transaction model पेश करके usability, efficiency, और privacy में महत्वपूर्ण सुधार किया।

आज Orchard, Zcash का मुख्य shielded pool बना हुआ है। हालांकि, community Ironwood नामक एक नए shielded pool में भविष्य के migration का मूल्यांकन कर रही है, जो Zcash की privacy guarantees को बनाए रखते हुए shielded ZEC supply की अखंडता के संबंध में अतिरिक्त assurance प्रदान करेगा।

[Zcash Shielded wallets](/site/Using_Zcash/Wallets) अब Orchard को support करते हैं। 

____

2. <h3 id="sapling" class="text-3xl font-bold my-4">Sapling Pool</h3>


![img3](https://github.com/user-attachments/assets/b1c6bb71-9356-45eb-8e4a-19d7cf1790ae)
चित्र 3: अक्टूबर, 2025 तक Sapling pool को दर्शाने वाला एक चार्ट

<br/>

[Zcash Sapling](https://z.cash/upgrade/sapling) Zcash protocol का एक upgrade था, जिसे 28 अक्टूबर, 2018 को प्रस्तुत किया गया। यह पहले के Sprout version की तुलना में एक बड़ा सुधार था, जिसमें privacy, efficiency, और usability के संदर्भ में कुछ सीमाएँ थीं। 

कुछ upgrades में shielded addresses के लिए बेहतर performance, बेहतर viewing keys शामिल हैं, जिससे उपयोगकर्ता incoming और outgoing transactions को user private keys को उजागर किए बिना देख सकते हैं, और transaction signature के दौरान hardware wallet के लिए independent Zero Knowledge keys भी शामिल हैं। 

Zcash Sapling उपयोगकर्ताओं को Sprout Series की तुलना में, जहाँ अधिक समय लगता था, केवल कुछ ही सेकंड में private transactions करने में सक्षम बनाता है। 

Transaction shielding privacy को बढ़ाता है, जिससे third-parties के लिए transactions को link करना और transfer किए जा रहे ZEC की मात्रा निर्धारित करना असंभव हो जाता है। Sapling private transactions generate करने के computational requirements को कम करके usability में भी सुधार करता है, जिससे यह उपयोगकर्ताओं के लिए अधिक सुलभ हो जाता है।

Sapling wallet addresses "zs" से शुरू होते हैं, और यह सभी supported Zcash Shielded Wallets (YWallet, Zingo Wallet, Nighthawk आदि) में देखा जा सकता है, जिनमें built-in Sapling addresses होते हैं। Zcash Sapling privacy और transaction efficiency के संदर्भ में technology में एक महत्वपूर्ण विकास का प्रतिनिधित्व करता है, जो Zcash को उन उपयोगकर्ताओं के लिए एक व्यावहारिक और प्रभावी cryptocurrency बनाता है जो privacy और security को महत्व देते हैं।

____

3. <h3 id="sprout" class="text-3xl font-bold my-4">Sprout Pool</h3>


![img4](https://github.com/user-attachments/assets/956eceed-f4d6-4087-99d0-32a770449dda)
चित्र 4: अक्टूबर, 2025 तक Sprout pool को दर्शाने वाला एक चार्ट

Sprout अब तक लॉन्च किया गया पहला open permissionless Zero Knowledge privacy protocol था। इसे 28 अक्टूबर, 2016 को लॉन्च किया गया था।

Sprout addresses की पहचान उनके पहले दो अक्षरों से होती है, जो हमेशा "zc" होते हैं। इसका नाम "Sprout" मुख्य रूप से इस बात पर ज़ोर देने के लिए रखा गया था कि software नया था, एक उभरता हुआ blockchain था जिसमें बढ़ने की बड़ी क्षमता थी और जो development के लिए खुला था। 

Sprout का उपयोग [Zcash slow start Mining](https://electriccoin.co/blog/slow-start-and-mining-ecosystem/) के शुरुआती tool के रूप में किया गया, जिससे Miners के लिए ZEC और Block rewards का वितरण हुआ। 

जैसे-जैसे Zcash ecosystem बढ़ता गया और shielded transactions की संख्या बढ़ती गई, यह देखा गया कि Zcash Sprout Series उपयोगकर्ता privacy, transaction scalability, और processing के मामले में सीमित और कम efficient हो गई थी। इससे network में modification और Sapling Upgrade हुआ। 

---
4. <h3 id="transparent" class="text-3xl font-bold my-4">Transparent Pool</h3>
<br/>

![img5](https://github.com/user-attachments/assets/01de2907-b62d-4421-83d7-ea4908faa828)
चित्र 5: अक्टूबर, 2025 तक Transparent pool को दर्शाने वाला एक चार्ट

<br/>

Zcash Transparent pool unshielded और non-private है। Zcash पर Transparent wallet addresses "t" अक्षर से शुरू होते हैं; transactions के लिए इस address type का उपयोग करने पर privacy बहुत कम होती है।

Zcash में Transparent transactions, Bitcoin transactions के समान होते हैं, जो multi-signature transactions को support करते हैं और standard public addresses का उपयोग करते हैं।

Zcash Transparent addresses का उपयोग अधिकतर centralized exchanges द्वारा किया जाता है ताकि उपयोगकर्ताओं के बीच ZEC भेजते और प्राप्त करते समय उच्च transparency और network confirmation सुनिश्चित हो सके।

यह ध्यान रखना भी महत्वपूर्ण है कि जहाँ Zcash Shielded addresses transactions के दौरान उच्च privacy प्रदान करते हैं, वहीं transactions को process करने के लिए उन्हें अधिक computational resources की आवश्यकता होती है। इसलिए, कुछ उपयोगकर्ता उन transactions के लिए Transparent addresses अपना सकते हैं जिनमें उसी स्तर की privacy की आवश्यकता नहीं होती।

<br/>

## Pool Transfer के लिए अनुशंसित अभ्यास

जब Zcash Network पर transaction के दौरान उच्च स्तर की privacy पर विचार किया जाता है, तो अनुशंसा की जाती है कि आप नीचे दिए गए अभ्यासों का पालन करें;

Zcash blockchain पर "z to z" wallets के बीच होने वाली transactions अधिकांशतः shielded होती हैं और उत्पन्न होने वाली उच्च privacy के कारण इन्हें कभी-कभी Private Transaction कहा जाता है। जब privacy आवश्यक हो, तब $ZEC भेजने और प्राप्त करने का यह सामान्यतः सबसे अच्छा और सबसे अधिक अनुशंसित तरीका होता है। 

---

जब आप "Z-address" से "T-address" पर ZEC भेजते हैं, तो यह मूलतः एक Deshielding transaction को दर्शाता है। इस प्रकार की transaction में privacy level हमेशा उच्च नहीं होता क्योंकि Transparent Address पर ZEC भेजने के प्रभाव के कारण कुछ जानकारी blockchain पर दिखाई देगी। जब उच्च privacy आवश्यक हो, तब Deshielding transaction हमेशा अनुशंसित नहीं होती। 

---

Transparent Address (T-address) से Z-address पर ZEC transfer करना सामान्यतः Shielding कहलाता है। इस प्रकार की transaction में privacy का स्तर z-z transaction की तुलना में हमेशा उतना उच्च नहीं होता, लेकिन privacy आवश्यक होने पर यह भी अनुशंसित है। 

---

Zcash Network पर Transparent Address (T-address) से दूसरे Transparent Address (T-address) पर ZEC भेजना (T-T transaction), Bitcoin transaction के बहुत समान है और इसी कारण Zcash पर T-T transactions को हमेशा Public transactions कहा जाता है, क्योंकि sender और receiver दोनों के transaction details जनता के लिए दिखाई देने लगते हैं, जिससे ऐसी transaction में privacy का स्तर बहुत कम हो जाता है। 

अधिकांश Cryptocurrency Centralized exchanges Zcash blockchain पर transact करते समय Transparent Address ("T-address) का उपयोग करते हैं, लेकिन इस प्रकार की transaction (T-T) में कोई private properties नहीं होतीं।

<br/>

## भविष्य: Ironwood Pool

Zcash community वर्तमान में Ironwood नामक एक प्रस्तावित shielded pool का मूल्यांकन कर रही है।

Ironwood को Orchard के proving system में हाल ही में खोजी गई और patch की गई vulnerability को address करने के लिए डिज़ाइन किया गया है। हालांकि इस बात का कोई प्रमाण नहीं है कि उस vulnerability का कभी दुरुपयोग किया गया था, Ironwood Orchard से एक नए बनाए गए shielded pool में controlled migration को सक्षम बनाकर assurance की एक अतिरिक्त layer प्रदान करेगा।

लक्ष्य Zcash privacy को बदलना नहीं है, बल्कि shielded ZEC supply की अखंडता में विश्वास को मजबूत करना है।

## प्रस्ताव के अनुसार:

1. नई shielded activity धीरे-धीरे Ironwood में स्थानांतरित होगी।
2. मौजूदा Orchard funds को private तरीके से migrate किया जा सकेगा।
3. Public turnstile accounting इस बात का अधिक मजबूत प्रमाण देगा कि सभी shielded funds पूरी तरह backed बने हुए हैं।
4. उपयोगकर्ता वही privacy protections बनाए रखेंगे जिनकी वे Zcash से अपेक्षा करते हैं।

<br/>
यदि भविष्य के network upgrades के माध्यम से सक्रिय किया जाता है, तो Ironwood मौजूदा shielded funds के साथ compatibility बनाए रखते हुए Zcash के shielded ecosystem की अगली पीढ़ी बन जाएगा।

<br/>

## बचने योग्य सामान्य गलतियाँ

- **t-address से t-address पर भेजना** — पूरी तरह public, कोई privacy नहीं। पहले हमेशा funds को shield करें।
- **Sapling और Orchard addresses को भ्रमित करना** — Sapling addresses `zs` से शुरू होते हैं, Orchard/Unified addresses `u1` से शुरू होते हैं
- **Sprout pool में funds छोड़ देना** — Sprout अब deprecated है; funds को Orchard में migrate करें
- **यह मान लेना कि t → z (shielding) पूरी तरह private है** — shielding की क्रिया स्वयं on-chain दिखाई देती है; उसके अंदर की सामग्री नहीं

---

## संबंधित पृष्ठ

- [Wallets](/using-zcash/wallets) — कौन से wallets Orchard और Sapling pools को support करते हैं
- [Transactions](/using-zcash/transactions) — shielded transactions कैसे भेजें
- [Buying ZEC](/using-zcash/buying-zec) — pools में उपयोग करने से पहले ZEC प्राप्त करना
- [ZK-SNARKs](/zcash-tech/zk-snarks) — shielded pools की cryptographic foundation
- [ZEC और Zcash क्या हैं](/start-here/what-is-zec-and-zcash) — Zcash privacy की पृष्ठभूमि
