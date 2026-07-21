# Shielded Protocol, शुरू से अंत तक
##### [Annkkitaaa](https://github.com/Annkkitaaa) द्वारा मूल शोध

![alt text](image-27.png)

### हर हिस्से को जोड़कर एक private Zcash transaction बनाना

> **श्रृंखला:** *Zcash from First Principles* . **लेख 6 . The Shielded Protocol** (समापन)
> **पाठकवर्ग:** नए पाठक जिन्होंने लेख 0 से 5 तक पढ़ लिए हैं। यहीं सब कुछ आपस में जुड़ता है।
> **आप क्या लेकर जाएंगे:** एक shielded Zcash transaction का पूरा, सही मानसिक मॉडल, जिसमें श्रृंखला की हर अवधारणा अपनी सही जगह पर होगी, और लेख 0 की हर खुली कड़ी बंद हो जाएगी।

हमने [लेख 0](article-0-shielded-transaction.md) में एक विरोधाभास और सार्वजनिक बोर्ड पर बंद लिफाफों की कहानी से शुरुआत की थी। फिर हमने पाँच लेखों में उसके हिस्से बनाए: finite fields, elliptic curves, commitments, Merkle trees, और zero-knowledge proofs। अब हम इन्हें साथ जोड़ते हैं और देखते हैं कि एक असली private payment शुरू से अंत तक कैसे काम करती है।

---

## 1. आपको इसकी परवाह क्यों करनी चाहिए?

अलग-अलग देखें तो आपने जो भी हिस्सा सीखा है, वह अपने-आप में चतुर है। लेकिन Zcash का *जादू* इस बात में है कि ये हिस्से कैसे एक-दूसरे में फंसते हैं। अकेला nullifier privacy नहीं देता। अकेला commitment forgery नहीं रोकता। अकेला proof कोई उपयोगी बात सिद्ध नहीं करता। **इनका संयोजन** ही पाँच घटकों को ऐसे धन में बदलता है जो एक साथ private भी है और भरोसेमंद भी।

यह लेख उसी संयोजन के बारे में है। अंत तक पहुँचते-पहुँचते वाक्य *"the network verifies a transaction it cannot see"* किसी विरोधाभास जैसा नहीं लगेगा, बल्कि उन हिस्सों का सीधा परिणाम लगेगा जिन्हें आप पहले से समझते हैं।

---

## 2. किरदार, फिर से संयोजित

यह रही पूरी श्रृंखला एक ही पृष्ठ पर, लेख 0 की कहानी से वास्तविक तंत्र तक मैप की गई।

| लेख 0 की कहानी का तत्व | वास्तविक घटक | किससे बना |
|---|---|---|
| लिफाफे के भीतर का पैसा | **Note** (value, recipient, randomness) | field elements के रूप में encoded (लेख 1) |
| बंद, अपारदर्शी लिफाफा | **Note commitment** | Pedersen / Sinsemilla commitment (लेख 2, 3) |
| सार्वजनिक बोर्ड | **Note commitment tree** (anchor = उसका root) | incremental Merkle tree (लेख 4) |
| शून्य-टोकन | **Nullifier** | note + secret key का एक ZK-friendly hash (लेख 2, 3) |
| "अंदर आया पैसा = बाहर गया पैसा" | **Value commitments + balance check** | homomorphic Pedersen commitments (लेख 2, 3) |
| पर्दे के पीछे का जादू | **Zero-knowledge proof** | arithmetic circuit पर zk-SNARK (लेख 5) |
| "केवल आप अपना लिफाफा पढ़ सकते हैं" | **Encrypted note + viewing keys** | encryption + key hierarchy (यह लेख) |

---

## 3. keys कहाँ से आती हैं

एक उपयोगकर्ता जो कुछ भी कर सकता है, वह एक ही secret, यानी **spending key**, से एक one-way hierarchy के माध्यम से निकलता है (हर arrow एक irreversible derivation है, लेख 2 और 3 के trapdoors की बदौलत):

![alt text](image-32.png)

दो बातें ध्यान देने लायक हैं, और दोनों पहले के लेखों का परिणाम हैं:

- यह विभाजन आपको एक **viewing key** (मान लीजिए, किसी auditor को) देने देता है, जो आपकी transactions को **देख** सके **बिना** खर्च करने की शक्ति पाए। Privacy चयनात्मक है, सब-कुछ-या-कुछ-भी-नहीं जैसी नहीं।
- हर derivation **one-way** है: केवल viewing key रखने से कोई भी spending key वापस नहीं निकाल सकता, यानी लेख 2 का वही elliptic-curve trapdoor अपना काम कर रहा है।

---

## 4. एक note खर्च करना: चार दावे

किसी note को private तरीके से खर्च करने के लिए, आपको network को एक साथ चार बातें विश्वास दिलानी होती हैं **बिना note, उसकी value, उसकी position, या अपनी identity बताए।** हर दावा उसी घटक से पूरा होता है जिसे आप पहले से जानते हैं।

![alt text](image-31.png)

यह proof आधारभूत तथ्यों में से **कुछ भी** प्रकट नहीं करता (कौन-सा note, किसकी key, कितनी value)। यह केवल इतना प्रकट करता है कि *चारों दावे सही हैं।* यही shielded Zcash की पूरी तरकीब है, एक ही आरेख में कही हुई।

---

## 5. value-balance की तरकीब (वही प्रतिफल जिसे हमने बचाकर रखा था)

लेख 2 और 3 में हमने देखा था कि Pedersen commitments **जुड़ते हैं**: `v_1` के commitment में `v_2` का commitment जोड़ने पर `v_1 + v_2` का commitment मिलता है। अब देखते हैं कि इसका फायदा कहाँ मिलता है।

हर input और output note अपने साथ एक **value commitment** लाता है: एक Pedersen commitment `v.G + r.H`, जो अपनी amount `v` को छिपाता है। क्योंकि ये जुड़ते हैं, network यह गणना कर सकता है:

```
(sum of input value commitments) − (sum of output value commitments)
```

यदि transaction balanced है (न कोई पैसा बना, न नष्ट हुआ), तो `v` वाले हिस्से ठीक-ठीक कट जाते हैं, और केवल **zero value** का commitment बचता है, जो बची हुई randomness से blinded होता है। Sender यह सिद्ध करता है कि वह इस leftover randomness को जानता है, एक छोटी signature बनाकर जिसे **binding signature** कहा जाता है। एक वैध binding signature तभी संभव है जब values सचमुच balance हों, **फिर भी एक भी amount उजागर नहीं होती।**

> पूरी श्रृंखला में यह सबसे साफ उदाहरण है कि हमें homomorphic, curve-based commitments की ज़रूरत *क्यों* थी। "अंदर आया पैसा = बाहर गया पैसा" वाला नियम **बंद लिफाफों को जोड़कर** लागू किया जाता है और जाँचा जाता है कि परिणाम zero पर seal होता है।

---

## 6. एक पूर्ण transaction, शुरू से अंत तक देखते हुए

आइए Alice द्वारा Bob को भुगतान करना जोड़कर देखें। हम शिक्षण मॉडल के रूप में Sapling की साफ "spend side / output side" संरचना का उपयोग करेंगे।

**एक shielded transaction दो प्रकार के descriptions को bundle करती है:**

| Spend description (एक note को consume करता है) | Output description (एक note बनाता है) |
|---|---|
| input का value commitment | output का value commitment |
| वह **anchor** जिसके विरुद्ध यह proof देता है (एक tree root) | नया **note commitment** (एक नया leaf) |
| खर्च किए गए note का **nullifier** | encryption के लिए एक **ephemeral key** |
| एक re-randomized public key + spend-authorization signature | **encrypted note** (recipient के लिए ciphertext) |
| चार दावों को सिद्ध करने वाला **zk-SNARK** | यह सिद्ध करने वाला **zk-SNARK** कि output well-formed है |

साथ में पूरे bundle पर एक **binding signature** भी होती है, जो value balance लागू करती है (खंड 5)।

![alt text](image-30.png)

Privacy का रास्ता देखें: network ने anchor जाँचा, देखा कि nullifier नया है, proof verify किया, और balance verify किया। उसने एक वैध भुगतान स्वीकार किया **बिना amount जाने, बिना address जाने, और बिना यह जाने कि कौन-सा note खर्च हुआ।** इसी बीच खर्च किए गए note का **nullifier** (उसकी मृत्यु) और Bob का नया **commitment** (उसके note का जन्म) दो अलग-अलग public structures में बैठे रहते हैं, जिनके बीच कोई दिखाई देने वाला link नहीं होता — लेख 0 की वही टूटी हुई कड़ी।

---

## 7. लेख 0 की हर कड़ी को बंद करना

लेख 0 ने जानबूझकर प्रश्न खोले थे। वे सब यहाँ हैं, अब बंद।

| लेख 0 में खुली कड़ी | किससे बंद हुई |
|---|---|
| बंद होते हुए भी नकली न बनाया जा सकने वाला लिफाफा कैसे संभव है? | Commitments: randomness से hiding, और collision resistance / curve trapdoor से binding (लेख 3) |
| keys और secret recipes कहाँ से आते हैं? | Field arithmetic और elliptic-curve scalar multiplication (लेख 1, 2) |
| "बोर्ड" वास्तव में है क्या? | note commitments का एक incremental Merkle tree; उसका root ही anchor है (लेख 4) |
| void token को उसके लिफाफे से जोड़ा क्यों नहीं जा सकता? | nullifier एक keyed hash है जिसे commitments से अलग set में रखा जाता है (लेख 2, 3, 4) |
| कुछ भी बताए बिना validity कैसे सिद्ध करते हैं? | एक arithmetic circuit पर zk-SNARK जो चारों दावों को encode करता है (लेख 5) |
| recipient को कैसे पता चलता है कि उसे भुगतान मिला है? | note को उसके address पर encrypt किया जाता है; वह viewing key से trial-decrypt करता है (यह लेख) |
| "money in = money out" को private तरीके से कैसे लागू किया जाता है? | Homomorphic value commitments + binding signature (खंड 5) |

पहले पृष्ठ का विरोधाभास, *जो तुम देख नहीं सकते उसे verify करना*, अब पूरी तरह समाप्त हो चुका है। Network **छिपे हुए data के बारे में दावों** को verify करता है, स्वयं data को नहीं।

---

## 8. Sapling बनाम Orchard, एक ही सांस में

हमने Sapling की संरचना के साथ पढ़ाया क्योंकि उसका विभाजन सबसे स्पष्ट है। वर्तमान design, **Orchard**, इन विचारों को बदलता नहीं बल्कि परिष्कृत करता है:

| | **Sapling** | **Orchard** |
|---|---|---|
| Transaction unit | अलग-अलग **Spend** और **Output** descriptions | एकीकृत **Actions** (हर एक में एक spend + एक output) |
| Proof system | **Groth16** (trusted setup) | **Halo 2** (कोई trusted setup नहीं) |
| Curves | BLS12-381 + Jubjub | Pallas / Vesta (Pasta) |
| Commitment hash | Pedersen | Sinsemilla |

इस लेख की हर अवधारणा सीधे आगे भी लागू होती है; Orchard मुख्यतः spend और output को एक साथ bundle करता है और ऐसी proof system लाता है जिसमें कोई ceremony नहीं होती। पाँचों pillars वैसे ही रहते हैं।

---

## 9. एक ईमानदार स्पष्टीकरण

यह श्रृंखला की सबसे पूर्ण तस्वीर है, लेकिन फिर भी एक मॉडल है। हमने एक note की exact field encodings, key derivation के precise formulas, spend keys की re-randomization, diversified addresses, memo fields, fee handling, value commitments और note commitments के बीच पूरे विस्तार में अंतर, और हर signature की सटीक भूमिका को संक्षेप में समेटा है। हमने एक canonical flow भी दिखाया; वास्तविक transactions में एक साथ कई spends और outputs हो सकते हैं, और वे transparent तथा shielded हिस्सों को मिला भी सकती हैं। प्रामाणिक स्रोत Zcash Protocol Specification है। आपके पास अब जो है, वह सही आकार है; specification उसमें हर माप भरती है।

---

## 10. सारांश

- एक shielded transaction पाँचों घटकों को आपस में जोड़ती है: एक **note** (value), उसका **commitment** जो **note commitment tree** में है, double-spends रोकने के लिए एक **nullifier**, balance के लिए **value commitments**, और उन सबको साथ बाँधने वाला **zk-SNARK**।
- Spending एक साथ **चार दावे** सिद्ध करती है — note मौजूद है, आप अधिकृत हैं, उसका nullifier सही है, और value balance में है — वह भी **zero knowledge** में, बिना आधारभूत तथ्यों में से कुछ भी उजागर किए।
- **Value balance** को **homomorphic commitments को जोड़कर** और **binding signature** के माध्यम से यह जाँचकर लागू किया जाता है कि वे zero पर seal होते हैं, बिना कोई amount बताए।
- उपयोगकर्ता की शक्तियाँ एक **spending key** से एक **one-way hierarchy** के माध्यम से निकलती हैं, जिससे **viewing keys** संभव होती हैं जो दिखाती हैं, पर spend करने की शक्ति नहीं देतीं।
- Network **छिपे हुए data के बारे में दावों** को verify करता है, जिससे लेख 0 का verify-vs-privacy विरोधाभास समाप्त हो जाता है। वहाँ खोली गई हर कड़ी अब बंद हो चुकी है।
- **Orchard**, **Sapling** को परिष्कृत करता है (unified Actions, trusted setup के बिना Halo 2, Pasta curves, Sinsemilla) लेकिन पाँच pillars को बदले बिना।

---

## Glossary

| Term | सरल अर्थ |
|---|---|
| **Spending key** | वह एकल root secret जिससे उपयोगकर्ता की सभी keys निकलती हैं |
| **Viewing key** | धारक को आपकी transactions देखने देती है, बिना उन्हें spend करने दिए |
| **Spend description** | tx का वह हिस्सा जो एक note को consume करता है (nullifier, anchor, proof) |
| **Output description** | tx का वह हिस्सा जो एक note बनाता है (commitment, ciphertext, proof) |
| **Action (Orchard)** | एकीकृत unit जो एक spend और एक output साथ में करता है |
| **Value commitment** | किसी amount के लिए एक homomorphic Pedersen commitment |
| **Binding signature** | वह signature जो values के balance होने को बिना उजागर किए सिद्ध करती है |
| **Anchor** | वह tree root जिसके विरुद्ध spend membership सिद्ध करता है |
| **Trial decryption** | recipient द्वारा नए commitments को जाँचकर अपने लिए बने notes ढूँढना |

---

## FAQ

**क्या network कभी amount या किसने किसे भुगतान किया, यह देखता है?**
नहीं। वह proof, nullifier की freshness, anchor, और binding signature को verify करता है। सभी private values छिपी रहती हैं।

**मुझे एक note दो बार खर्च करने से क्या रोकता है?**
nullifier। Spending उसे प्रकाशित करती है; network nullifier set में पहले से मौजूद किसी भी nullifier को अस्वीकार कर देता है। एक ही note हमेशा वही nullifier देता है।

**अगर amounts छिपी हैं तो balance कैसे जाँची जा सकती है?**
Value commitments homomorphically जुड़ती हैं; एक balanced transaction की commitments कटकर zero के commitment तक पहुँचती हैं, जिसे binding signature सिद्ध करती है।

**क्या मैं किसी auditor को अपनी transactions सिद्ध कर सकता हूँ, बिना नियंत्रण छोड़े?**
हाँ। एक viewing key दे दीजिए। वह आपकी shielded activity दिखाती है, लेकिन spends को authorize नहीं कर सकती, one-way key hierarchy की बदौलत।

**क्या Orchard आने के बाद Sapling अप्रचलित हो चुका है?**
दोनों network पर मौजूद रहे हैं; Orchard वर्तमान design है। अवधारणाएँ साझा हैं, इसलिए एक को समझने से दूसरा भी समझ में आता है।

---

### अपनी समझ की जाँच करें

एक मित्र कहता है: "क्योंकि proof amount छिपा देता है, कोई चोर बस यह दावा कर सकता है कि उसके outputs की value उसके inputs से अधिक है और वह मुफ्त पैसा छाप लेगा।" खंड 5 का उपयोग करके दो वाक्यों में समझाइए कि यह क्यों असफल होता है। *(उत्तर नीचे है।)*

<details><summary>उत्तर</summary>

Amounts छिपी होती हैं, लेकिन हर एक को एक homomorphic value commitment में लपेटा जाता है, और network सभी input commitments को जोड़कर सभी output commitments को घटाता है; यदि छिपी हुई values balance में नहीं होतीं, तो परिणाम zero पर seal नहीं होता और **कोई वैध binding signature बनाई ही नहीं जा सकती।** चोर यह छिपा सकता है कि *कितना* है, लेकिन unbalanced values को balance check से पार नहीं करा सकता, इसलिए मुफ्त पैसा छापना असंभव है — कुछ भी उजागर किए बिना भी arithmetic उसे पकड़ लेती है।
</details>

---

### पूरी श्रृंखला

अब आप एक अकेले विरोधाभास से एक पूर्ण private payment तक की यात्रा कर चुके हैं:

![alt text](https://github.com/user-attachments/assets/cd8bbb40-57b8-4854-b9cf-97f2485d126a)


यहाँ से अगला स्वाभाविक चरण और गहरा जाता है: Groth16 और Halo 2 की भीतरी कार्यप्रणाली, trusted-setup ceremonies, Sapling और Orchard circuits का विस्तार, key derivation और diversified addresses, और network upgrades के दौरान protocol का विकास। लेकिन अब नींव तैयार है, और उन सभी विषयों के जुड़ने की जगह आपके पास मौजूद है।

*यह* Zcash from First Principles *श्रृंखला का हिस्सा है, [ZecHub](https://zechub.org) के लिए। Licensed CC BY-SA 4.0.*
