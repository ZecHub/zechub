# Merkle Trees: blockchain हर नोट को कैसे याद रखता है
##### [Annkkitaaa](https://github.com/Annkkitaaa) का मूल शोध

![alt text](image-19.png)

### लाखों commitments को एक बेहद छोटे fingerprint में समेटना

> **श्रृंखला:** *Zcash from First Principles* . **लेख 4 . Merkle Trees**
> **पाठक-वर्ग:** नए पाठक। हम [लेख 3 (hashing and commitments)](article-3-hashing-commitments.md) पर आगे बढ़ते हैं। यदि आप जानते हैं कि fingerprint और commitment क्या होते हैं, तो आप तैयार हैं।
> **आप क्या लेकर जाएंगे:** Merkle trees की एक सहज, सही समझ; membership को बिना यह बताए कैसे सिद्ध किया जाता है कि आपका मतलब किस item से है; और यह ठीक-ठीक कैसे Zcash के note commitment tree में बदलता है।

[लेख 0](article-0-shielded-transaction.md) ने एक "public board" का वर्णन किया था, जिसमें अब तक बनाया गया हर note रखा होता है और जो केवल बढ़ता ही जाता है। अब तक आप अंदाज़ा लगा सकते हैं कि उस पर क्या टंगा है: **commitments** (लेख 3), यानी सीलबंद लिफाफे। लेकिन एक वास्तविक बोर्ड में इनके *सैकड़ों मिलियन* हो सकते हैं। नेटवर्क इसे कैसे store करता है, verify करता है, और आपको यह कैसे साबित करने देता है कि आपका लिफाफा बोर्ड पर है, बिना उस पर उंगली रखे? इसका उत्तर computer science की सबसे सुंदर संरचनाओं में से एक है: **Merkle tree.**

---

## 1. आपको इसकी परवाह क्यों करनी चाहिए?

जैसे ही आपके पास commitments की एक बहुत बड़ी public list होती है, दो समस्याएँ सामने आती हैं।

**पहली समस्या: बड़े पैमाने पर integrity।** अगर सूची में 300 million entries हैं, तो कोई यह कैसे पुष्टि करे कि *एक भी* entry चुपके से बदली नहीं गई है? हर बार देखने पर 300 million items को फिर से जांचना निराशाजनक रूप से असंभव है।

**दूसरी समस्या: private membership।** किसी note को spend करने के लिए (लेख 0), आपको यह साबित करना होता है कि आपका commitment सचमुच उस board पर है। लेकिन अगर आप उस पर उंगली रख दें ("यह entry number 4,201,337 है!"), तो आपने खुद को deanonymize कर दिया। आपको यह सिद्ध करना है कि *"मेरा लिफाफा इस board पर कहीं है"* बिना यह बताए कि **कौन-सा** है।

Merkle tree दोनों समस्याएँ एक साथ हल करता है। यह पूरी सूची को एक ही fingerprint में संपीड़ित कर देता है, और यह आपको membership का एक छोटा, position-hiding proof देता है।

---

## 2. सहज समझ: fingerprints का एक tournament

एक knockout tournament bracket की कल्पना कीजिए, लेकिन इसमें आगे खिलाड़ी नहीं बढ़ते, बल्कि **fingerprints मिलाए जाते हैं।**

- सबसे नीचे, हर data piece का अपना fingerprint होता है (लेख 3 का उसका hash)। इन्हें **leaves** कहा जाता है।
- इन्हें जोड़ों में बाँट दीजिए। हर जोड़े के दो fingerprints को *एक साथ* hash करके एक parent fingerprint बनाया जाता है।
- फिर उन parents को जोड़ों में बाँटें, हर जोड़े को साथ में hash करें, और इसी तरह आगे बढ़ें।
- ऐसा तब तक करते रहें जब तक ऊपर **एक अकेला fingerprint** न रह जाए। वही विजेता **Merkle root** है।

![alt text](image-20.png)

इसकी सबसे महत्वपूर्ण property सीधे avalanche effect (लेख 3) से निकलती है:

> **root अपने नीचे मौजूद *हर चीज़* का fingerprint होता है।** किसी भी leaf को, चाहे केवल एक bit से ही, बदल दीजिए तो उसका fingerprint बदल जाता है, फिर उसका parent बदलता है, फिर *उसका* parent, और यह ऊपर तक चलता जाता है। **root बदल जाता है।** इसलिए root जैसा एक छोटा मान पूरी सूची की integrity को प्रमाणित कर सकता है। यही पहली समस्या का समाधान है।

---

## 3. एक वास्तविक tree, ठीक-ठीक गणना किया हुआ

आइए ऊपर वाले four-leaf tree को leaves `A, B, C, D` पर वास्तविक SHA-256 fingerprints के साथ बनाते हैं (पठनीयता के लिए digests को संक्षिप्त किया गया है):

```
hA = 559aead08264...     hB = df7e70e50215...
hC = 6b23c0d5f35d...     hD = 3f39d5c348e5...

hAB = H(hA , hB) = 63956f0ce48e...
hCD = H(hC , hD) = 98a2fbfddbc7...

ROOT = H(hAB , hCD) = 1b3faa3fcc5e...
```

यह सब बस इतना ही है: "किसी चीज़ को hash करो, फिर hashes के जोड़ों को hash करो।" लेख 3 से अधिक विचित्र कुछ नहीं, बस tree में व्यवस्थित।

---

## 4. असली चतुराई: position बताए बिना membership सिद्ध करना

अब दूसरी समस्या। मान लीजिए आप यह साबित करना चाहते हैं कि leaf `C` tree में है, किसी ऐसे व्यक्ति को जो केवल **root** जानता है। आप उसे पूरा tree *नहीं* देते। आप उसे केवल वे fingerprints देते हैं जिनकी मदद से `C` से root तक चढ़ा जा सकता है; इन्हें **authentication path** (या **Merkle proof**) कहा जाता है:

> यह सिद्ध करने के लिए कि `C` tree में है, यह दें:
> - उसका sibling `hD`, और
> - उसका uncle `hAB`।

Verifier, जिसे केवल root पता है, इस चढ़ाई को फिर से गणना करता है:

```
step 1:  H(hC , hD)        = hCD       (C को उसके sibling के साथ मिलाएँ)
step 2:  H(hAB , hCD)      = ROOT?     (uncle के साथ मिलाएँ)
```

वास्तविक गणना करने पर: इससे `1b3faa3fcc5e...` मिलता है, जो **root से मेल खाता है।** इससे सिद्ध हो जाता है कि leaf tree में है।

![alt text](image-21.png)

दो बातें इसे शक्तिशाली बनाती हैं:

- **यह बहुत छोटा है।** 4 leaves के लिए आपने 2 hashes दिए। `n` leaves वाले tree के लिए आपको केवल लगभग **log_2(n)** hashes देने होते हैं। एक billion leaves के लिए यह लगभग **30 hashes** होते हैं, billion नहीं। tree का आकार विस्फोटक रूप से बढ़े तब भी proof मुश्किल से बढ़ता है।
- **यही privacy का बीज है।** proof दिखाता है कि आपकी leaf tree में *कहीं* है। जब यही जांच *zero-knowledge proof* के अंदर की जाती है (लेख 5), तो path स्वयं भी छिपा होता है, इसलिए आप यह सिद्ध करते हैं कि "मेरा note tree में है" जबकि note और उसकी position दोनों प्रकट नहीं करते। यही दूसरी समस्या का पूरा समाधान है।

---

## 5. Merkle tree से Zcash के note commitment tree तक

अब हम ठीक-ठीक कह सकते हैं कि लेख 0 का "public board" वास्तव में क्या है:

> **note commitment tree** एक Merkle tree है जिसकी **leaves, note commitments होती हैं।** दुनिया में कहीं भी जब भी कोई note बनाया जाता है, उसका commitment अगली leaf के रूप में append किया जाता है, और root update हो जाता है।

कुछ वास्तविक विवरण:

- **यह केवल बढ़ता है।** Leaves append की जाती हैं, कभी हटाई नहीं जातीं। इसे **incremental Merkle tree** कहा जाता है। (यह लेख 0 की इस बात से मेल खाता है कि "board कभी कुछ हटाता नहीं है।")
- **root को *anchor* कहा जाता है।** जब आप spend करते हैं, आपकी transaction एक हालिया anchor का संदर्भ देती है और zero knowledge में यह सिद्ध करती है कि आपके note का commitment उस root वाले tree में मौजूद है।
- **निश्चित depth।** Zcash के shielded trees की depth **32** होती है, यानी वे `2^(32)` (चार billion से अधिक) notes तक रख सकते हैं।
- **ZK-friendly hashing।** यह tree SHA-256 से नहीं बनाया जाता। Sapling tree को **Pedersen hashes** से hash करता है और Orchard **Sinsemilla** का उपयोग करता है (दोनों लेख 3 से), खास तौर पर इसलिए कि circuit के भीतर membership की यह चढ़ाई सिद्ध करना सस्ता पड़े।

![alt text](image-22.png)

### एक बात जो tree *नहीं* संभालता: double-spends

tree यह सिद्ध करता है कि कोई note **मौजूद है।** लेकिन यह अपने आप में आपको एक ही note को दो बार spend करने से नहीं रोकता। यह काम लेख 0 के **nullifier set** का है: "void tokens" का एक अलग संग्रह। जब आप spend करते हैं, तो आप note का nullifier प्रकाशित करते हैं, और नेटवर्क किसी भी ऐसे nullifier को अस्वीकार कर देता है जिसे वह पहले देख चुका है।

इसलिए ये दो public structures पूरक भूमिकाएँ निभाते हैं, और इन्हें अलग रखना ही note के जन्म और उसकी मृत्यु के बीच की कड़ी को तोड़ता है:

| Structure | यह कौन-सा प्रश्न हल करता है | कब update होता है |
|---|---|---|
| **Note commitment tree** | "क्या यह note मौजूद है?" | जब कोई note **बनाया** जाता है (commitment append होता है) |
| **Nullifier set** | "क्या यह note पहले ही spend किया जा चुका है?" | जब कोई note **spend** किया जाता है (nullifier प्रकाशित होता है) |

---

## 6. एक ईमानदार अस्वीकरण

हमेशा की तरह, यहाँ कुछ सरलीकरण किए गए हैं। वास्तविक incremental Merkle trees "frontier" nodes को track करते हैं ताकि सब कुछ फिर से बनाए बिना root को update किया जा सके; नेटवर्क केवल नवीनतम नहीं, बल्कि हालिया anchors की एक window रखता है, ताकि हर नए block से wallets टूट न जाएँ; और खाली leaves के लिए एक परिभाषित padding value इस्तेमाल होती है। हमने binary trees भी दो की साफ-सुथरी powers के साथ बनाए। इनमें से कोई भी बात मूल intuition नहीं बदलती: commitments की leaves, जिन्हें जोड़ों में hash करके एक root तक पहुँचते हैं, और छोटे membership proofs। सटीक bookkeeping protocol वाले लेख में फिर लौटेगी।

---

## 7. सारांश

- **Merkle tree** data को **leaves** में hash करता है, फिर **जोड़ों को ऊपर की ओर hash** करता है जब तक कि एक अकेला **root** न रह जाए।
- avalanche effect की वजह से, **root पूरी सूची का fingerprint होता है**: एक leaf बदलें और root बदल जाता है। एक छोटा मान बहुत बड़े dataset को प्रमाणित कर सकता है।
- **membership proof (authentication path)** बस root तक चढ़ाई के दौरान मिलने वाले sibling hashes होते हैं, लगभग **log_2(n)** hashes, इसलिए billions leaves होने पर भी proofs छोटे रहते हैं।
- जब इसे **zero-knowledge proof** के अंदर किया जाता है, तो यह membership check छिपा देता है कि आपका मतलब *किस* leaf से है, और यह सिद्ध करता है कि "मेरा note tree में है" बिना note या उसकी position बताए।
- Zcash का **note commitment tree** note commitments का एक **incremental** Merkle tree है, depth **32**, जिसका root **anchor** कहलाता है; Sapling इसे **Pedersen** से hash करता है और Orchard **Sinsemilla** से।
- tree **existence** सिद्ध करता है; अलग **nullifier set**, **double-spends** को रोकता है। इन्हें अलग रखना ही note के जन्म को उसकी मृत्यु से unlink करता है।

---

## शब्दावली

| Term | सरल अर्थ |
|---|---|
| **Merkle tree** | hashes का एक tree; leaves data fingerprints होते हैं, और parents अपने children को hash करते हैं |
| **Leaf** | सबसे निचला node; Zcash में, एक note commitment |
| **Merkle root** | सबसे ऊपर का अकेला fingerprint जो पूरे tree का सार देता है |
| **Authentication path / Merkle proof** | वे sibling hashes जो यह सिद्ध करने के लिए चाहिए कि कोई leaf tree में है |
| **Incremental Merkle tree** | append-only Merkle tree (जिसमें केवल नई leaves जोड़ी जाती हैं) |
| **Anchor** | एक Merkle root जिसे spend इस रूप में संदर्भित करता है: "tree की वह state जिसके विरुद्ध मैं proof दे रहा हूँ" |
| **Nullifier set** | spent-markers का अलग संग्रह जो double-spends को रोकता है |

---

## FAQ

**सिर्फ hashes की लंबी सूची क्यों नहीं, tree क्यों?**
एक सपाट सूची में membership सिद्ध करने के लिए आपको हर entry को या तो प्रकट करना पड़ेगा या process करना पड़ेगा। tree आपको logarithmic-size proofs और integrity के लिए एक अकेला root देता है।

**क्या verifier को पूरा tree चाहिए?**
नहीं। Verifier को केवल **root** और आपका छोटा authentication path चाहिए। यही तो पूरा उद्देश्य है।

**विशेष रूप से depth 32 ही क्यों?**
यह tree को लगभग चार billion notes तक सीमित करता है, जो पर्याप्त headroom देता है, और साथ ही membership proof (और circuit के भीतर उसकी लागत) को एक निश्चित, प्रबंधनीय आकार में रखता है।

**अगर हर नए note के साथ root बदलता है, तो पुराने proofs वैध कैसे रहते हैं?**
नेटवर्क हालिया roots (anchors) की एक window याद रखता है, इसलिए थोड़ा पुराने anchor के विरुद्ध बनाया गया proof भी verify हो जाता है। protocol वाला लेख इसे सटीक रूप से समझाता है।

---

### अपनी समझ को परखें

हमारे 4-leaf tree में मान लीजिए कोई attacker चुपके से leaf `C` को किसी अलग value से बदल देता है, लेकिन प्रकाशित root को वही रहने देता है। उसके लिए क्या गलत होगा, और वह इसे चुपचाप ठीक क्यों नहीं कर सकता? *(उत्तर नीचे है।)*

<details><summary>उत्तर</summary>

`C` बदलने से `hC` बदल जाता है (avalanche effect), जिससे `hCD = H(hC, hD)` बदलता है, और उससे `ROOT = H(hAB, hCD)` भी बदल जाता है। इसलिए दोबारा गणना किया गया root अब प्रकाशित root से मेल नहीं खाता, और छेड़छाड़ पकड़ी जाती है। इसे "चुपचाप ठीक" करने के लिए उसे कोई दूसरा `C` ढूँढना होगा जो *उसी* `hC` को पैदा करे, जो कि hash collision होगा, और लेख 3 के अनुसार व्यवहार में असंभव है। integrity बनी रहती है।
</details>

---

### आगे क्या

**लेख 5 . Zero-knowledge proofs:** चरम बिंदु। अब तक हमने notes, commitments, और tree बना लिए हैं, और हम बार-बार कहते रहे हैं कि "इसे zero knowledge में सिद्ध किया जाता है।" लेख 5 अंततः समझाता है कि आप किसी कथन को सही कैसे सिद्ध कर सकते हैं—कि आपका note tree में है, कि आपका nullifier सही है, कि धनराशि संतुलित है—और फिर भी इनमें से कुछ भी उजागर नहीं करते।

*यह* Zcash from First Principles *श्रृंखला का हिस्सा है, [ZecHub](https://zechub.org) के लिए। Licensed CC BY-SA 4.0.*
