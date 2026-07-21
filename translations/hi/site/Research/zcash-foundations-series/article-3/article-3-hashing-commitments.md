# Hashing और Commitments: जादुई सीलबंद लिफाफा
##### [Annkkitaaa](https://github.com/Annkkitaaa) का मूल शोध

![alt text](image-15.png)

### किसी रहस्य को सार्वजनिक रूप से बंद कैसे करें और फिर उसके बारे में कभी झूठ न बोल सकें

> **श्रृंखला:** *Zcash from First Principles* . **लेख 3 . Hashing और Commitments**
> **पाठक-वर्ग:** नए पाठक। हम [लेख 1 (finite fields)](article-1-finite-fields.md) और [लेख 2 (elliptic curves)](article-2-elliptic-curves.md) पर आगे बढ़ते हैं, लेकिन इसकी सहज समझ अपने आप में भी पूरी है।
> **आप क्या सीखकर जाएंगे:** hash functions की स्पष्ट समझ, "hiding" और "binding" का वास्तविक अर्थ, और Zcash कैसे note commitments बनाता है जो हर private payment को आधार देते हैं।

[लेख 0](article-0-shielded-transaction.md) में हमने एक "जादुई सीलबंद लिफाफे" का वर्णन किया था: ऐसी चीज़ जिसे आप सार्वजनिक बोर्ड पर टाँग सकते हैं, जो यह साबित करती है कि कोई लिफाफा मौजूद है, जबकि उसके अंदर क्या है यह छिपा रहता है, और जिसे आप बाद में कभी बदल भी नहीं सकते। हमने वादा किया था कि हम समझाएँगे कि ऐसी चीज़ संभव कैसे है। यही वह लेख है। इसके लिए हमें दो चीज़ों की ज़रूरत है: **hash functions** और **commitments**।

---

## 1. आपको इसकी परवाह क्यों करनी चाहिए?

मान लीजिए आपने किसी चुनाव के नतीजे की भविष्यवाणी की है और आप *बाद में* यह साबित करना चाहते हैं कि आपने उसे पहले ही सही कहा था। आप अपनी भविष्यवाणी सीधे घोषित नहीं कर सकते (उससे लोग प्रभावित हो सकते हैं, या आप पर यह आरोप लग सकता है कि आपने बाद में उसे बदल दिया)। और आप उसे पूरी तरह गुप्त भी नहीं रख सकते (फिर आप बाद में कुछ साबित नहीं कर पाएँगे)।

आपको ऐसा तरीका चाहिए जिससे आप **अभी, सार्वजनिक रूप से, किसी मान को इस तरह lock कर सकें कि:**

- कोई भी यह न जान सके कि आपने क्या lock किया है (अभी के लिए वह गुप्त रहे), और
- बाद में, जब आप उसे प्रकट करें, तो आप **उसके बारे में झूठ न बोल सकें**।

यह "अभी lock करो, बाद में reveal करो, झूठ नहीं" वाला यंत्र **commitment** कहलाता है, और यह Zcash में हर जगह मौजूद है। किसी note का value और मालिक उसी क्षण commitment में lock हो जाते हैं जब वह note बनाया जाता है। Commitments बनाने के लिए, पहले हमें उनके सबसे काम के औज़ार की ज़रूरत है: hash function।

---

## 2. सहज समझ: data की उँगली की छाप

एक **hash function** किसी भी data को, चाहे वह एक अक्षर हो या पूरी लाइब्रेरी, दबाकर एक छोटी, निश्चित आकार की string में बदल देता है जिसे **digest** या **hash** कहा जाता है। इसे **data की उँगली की छाप** समझिए।

![alt text](image-16.png)

एक अच्छी cryptographic उँगली की छाप में चार गुण होते हैं। इन्हें समीकरणों की तरह नहीं, सहज समझ की तरह पकड़िए:

| Property | सरल अर्थ | यह क्यों महत्वपूर्ण है |
|---|---|---|
| **Deterministic** | एक ही input हमेशा एक ही fingerprint देता है | आप किसी भी समय fingerprint दोबारा जाँच सकते हैं |
| **Fast forwards** | fingerprint निकालना तेज़ होता है | इसे हर जगह व्यवहारिक रूप से इस्तेमाल किया जा सकता है |
| **One-way (preimage resistant)** | fingerprint देखकर आप वह input नहीं ढूँढ सकते जिससे वह बना | यह मूल data को छिपाता है |
| **Collision resistant** | आप एक ही fingerprint वाले दो अलग inputs नहीं ढूँढ सकते | कोई भी नकली मेल नहीं बना सकता |

और एक और व्यवहार है जो fingerprints को लगभग जादुई बना देता है:

### avalanche effect (सत्यापित)

Input में सबसे छोटा बदलाव कीजिए और fingerprint *पूरी तरह* बदल जाता है, पुराने से कोई समानता नहीं रहती। यहाँ ऐसे messages के दो वास्तविक SHA-256 fingerprints हैं जिनमें सिर्फ एक character का अंतर है:

```
H("Pay Bob 5 ZEC") = 6e2dc1a954c70cc865f18ea8cb70b7b56eeaf6ca42b380824a55d65dc342f34b
H("Pay Bob 6 ZEC") = 76abc346d8d3053f76a9ae18b617af71f02729a73ec6a51732d2d94934e4217f
```

64 hex digits में से **59 अलग हैं।** एक character अंदर, और पूरी तरह असंबंधित fingerprint बाहर। इसी कारण आप किसी input को लक्ष्य fingerprint की ओर थोड़ा-थोड़ा नहीं धकेल सकते: पीछा करने के लिए कोई "गरम / ठंडा" संकेत ही नहीं होता।

---

## 3. fingerprint से commitment तक

यहाँ एक आकर्षक लेकिन टूटा हुआ विचार है: किसी गुप्त मान `v` के लिए commitment करने हेतु, बस उसका fingerprint `H(v)` प्रकाशित कर दीजिए।

यह आपको अच्छे से *bind* करता है (आप बाद में कोई दूसरा `v` दावा नहीं कर सकते, क्योंकि उसके लिए collision चाहिए होगी)। लेकिन यह **छिपाने में असफल रहता है।** यदि संभावित मानों का समूह छोटा है, तो एक हमलावर हर candidate का fingerprint निकालकर तुलना कर सकता है। "yes" या "no" पर commitment कर रहे हैं? वह दोनों को hash कर देगा और तुरंत जान जाएगा कि आपने कौन-सा चुना। Determinism, जो अभी हमारा मित्र था, अब रहस्य लीक कर रहा है।

इसका समाधान एक शब्द है: **randomness।**

> **एक commitment आपके value की fingerprint होती है, जिसमें एक नया random number मिलाया जाता है:**
> `commitment = H(v, r)` जहाँ `r` एक गुप्त random "blinding" value है।

अब वही `v` हर बार अलग दिखने वाला commitment देगा, क्योंकि `r` हर बार अलग है। अब वे दोनों गुण, जो हम चाहते थे, आखिरकार साथ मिलते हैं:

![alt text](image-17.png)

बाद में commitment को **open** (प्रकट) करने के लिए, आप `v` और `r` प्रकाशित करते हैं; कोई भी `H(v, r)` दोबारा निकालकर देख सकता है कि वह मेल खाता है। अब आप locked-in हैं। यही लेख 0 का जादुई सीलबंद लिफाफा है, अब वास्तविक रूप में।

> **हमेशा याद रखने लायक दो बातें:** *binding* इस वजह से आती है कि hash collision resistant है; *hiding* random blinding factor `r` से आता है।

---

## 4. लिफाफा बनाने के दो तरीके

इसके लिए दो सामान्य recipes हैं, और Zcash दोनों का उपयोग करता है।

| | **Hash-based commitment** | **Pedersen commitment** (लेख 2 से) |
|---|---|---|
| Recipe | `H(v, r)` | `v.G + r.H` (curve पर points) |
| Hiding किससे आता है | random `r` से | random `r` से |
| Binding किससे आता है | collision resistance से | elliptic-curve trapdoor (ECDLP) से |
| विशेष शक्ति | सरल और तेज़ | commitments **जुड़ जाते हैं** (homomorphic) |

आख़िरी पंक्ति ही वजह है कि Pedersen commitments Zcash में इतने महत्वपूर्ण हैं। क्योंकि `commit(v_1) + commit(v_2)` एक वैध `commit(v_1 + v_2)` है, protocol बाद में यह साबित कर सकता है कि **अंदर आया पैसा = बाहर गया पैसा**, सिर्फ commitments को जोड़कर, और यह सब बिना एक भी amount प्रकट किए। हम इस तथ्य को लेख 6 के लिए संभाल कर रख रहे हैं।

---

## 5. एक सूक्ष्म बात जो पूरे Zcash को आकार देती है: ZK-friendly hashing

यहाँ एक ऐसी अंतर्दृष्टि है जिसे ज़्यादातर परिचय छोड़ देते हैं, और यही ठीक वह बिंदु है जहाँ "गणित और engineering" मिलते हैं।

SHA-256 रोज़मर्रा की computing के लिए एक शानदार fingerprint है। लेकिन Zcash सिर्फ hashes *compute* नहीं करता; उसे **zero-knowledge proof के अंदर यह साबित भी करना पड़ता है कि कोई hash सही तरह compute किया गया था** (लेख 5 बताएगा कि क्यों)। और यहाँ अड़चन है: zero-knowledge proof की भाषा **finite-field arithmetic** है (लेख 1), जबकि SHA-256 bit-twiddling operations (shifts, ANDs, XORs) से बना है। इस पूरे bit-twiddling को field arithmetic में व्यक्त करना बहुत महँगा पड़ता है, जिससे proofs बड़े और धीमे हो जाते हैं।

इसलिए Zcash cryptographers ने ऐसे hash functions बनाए जिनका अंदरूनी ढाँचा *पहले से ही* field arithmetic हो, ताकि उन्हें prove करना सस्ता पड़े:

![alt text](image-18.png)

यही एक engineering दबाव, *"इसे prove करना सस्ता होना चाहिए,"* वह कारण है कि Zcash ने हर जगह SHA-256 इस्तेमाल करने के बजाय विशेष hash functions का आविष्कार किया और उन्हें अपनाया।

---

## 6. Zcash में यह कहाँ मौजूद है

Zcash ने अपनी अलग-अलग designs में अलग hashes का उपयोग किया है, और हर एक को उसके काम के अनुसार चुना गया:

| Design | इस्तेमाल किए गए hashes | कहाँ |
|---|---|---|
| **Sprout** (सबसे शुरुआती) | **SHA-256** | Note commitments और tree |
| **Sapling** | **Pedersen hashes**, साथ में **BLAKE2** | Note commitments और Merkle tree के लिए Pedersen; key derivation और nullifiers के लिए BLAKE2 |
| **Orchard** (वर्तमान) | **Sinsemilla**, साथ में **Poseidon** | Note commitments और Merkle tree के लिए Sinsemilla; nullifier के लिए Poseidon, और सब कुछ arithmetic circuits के लिए डिज़ाइन किया गया |

जिन नामों को पहचानना चाहिए वे हैं **Pedersen** और **Sinsemilla** (commitment-style hashes जो curve points से बने हैं, इसलिए उन्हें "जुड़ जाने" वाली महाशक्ति मिलती है और वे सस्ते में prove भी हो जाते हैं) और **Poseidon** (एक field-arithmetic hash जो खास तौर पर zero-knowledge circuits के लिए बनाया गया है)। जब लेख 0 ने कहा था कि किसी note की सामग्री एक commitment में सील कर दी जाती है, तो सील करने का काम *यही* तंत्र कर रहा होता है।

तो लेख 0 का खुला हुआ प्रश्न, *"एक सीलबंद लिफाफा अपनी सामग्री को छिपाते हुए नकली बनाना असंभव कैसे बना सकता है?"*, अब बंद हो गया है: **random blinding factor से hiding, collision resistance या curve trapdoor से binding।**

---

## 7. एक ईमानदार अस्वीकरण

स्पष्टता बनाए रखने के लिए हमने चीज़ों को सरल किया है। वास्तविक commitment schemes यह ठीक-ठीक बताती हैं कि `v` और `r` को कैसे encode किया जाता है और कौन-से generators उपयोग होते हैं; "hiding" और "binding" दोनों के अलग-अलग रूप होते हैं (perfect बनाम computational) जिनकी सटीक security definitions होती हैं; और हमने Pedersen, Sinsemilla, या Poseidon की आंतरिक रचना नहीं दिखाई। इनमें से कोई भी बात सहज समझ को नहीं बदलती: commitment एक fingerprint और randomness का मेल है, जो अभी छिपाता है और हमेशा के लिए बाँध देता है। जब protocol वाले लेख को इनकी ज़रूरत होगी, तब ये विवरण फिर आएँगे, स्पष्ट संकेतों के साथ।

---

## 8. सारांश

- एक **hash function** **data की उँगली की छाप** है: deterministic, fast forwards, one-way, collision resistant, और **avalanche effect** के साथ (एक bit बदलो, पूरी तरह अलग fingerprint पाओ)।
- एक **commitment** आपको **अभी किसी मान को सार्वजनिक रूप से lock करने और बाद में उसे प्रकट करने देता है, बिना इस क्षमता के कि आप उसके बारे में झूठ बोल सकें।**
- सिर्फ एक साधारण fingerprint `H(v)` प्रकाशित करना bind तो करता है, लेकिन **छिपाता नहीं**। एक random blinding factor जोड़ना, `H(v, r)`, इसे ठीक करता है: **`r` से hiding, collision resistance से binding।**
- Zcash **hash-based** और **Pedersen** दोनों commitments का उपयोग करता है; Pedersen commitments अतिरिक्त रूप से **जुड़ भी जाते हैं**, जिसका उपयोग लेख 6 value balance को private तरीके से साबित करने के लिए करेगा।
- क्योंकि hashes को zero-knowledge proofs के अंदर **prove** करना होता है, Zcash हर जगह SHA-256 के बजाय field arithmetic से बने **ZK-friendly** hashes (**Pedersen**, **Sinsemilla**, **Poseidon**) का उपयोग करता है।

---

## शब्दावली

| Term | सरल अर्थ |
|---|---|
| **Hash function** | किसी भी data को दबाकर एक छोटी निश्चित आकार की fingerprint (digest) में बदल देता है |
| **Digest** | hash function का output fingerprint |
| **Preimage resistance** | digest को उलटकर उसका input नहीं निकाला जा सकता (one-way) |
| **Collision resistance** | एक ही digest वाले दो inputs नहीं ढूँढे जा सकते |
| **Avalanche effect** | input में छोटा बदलाव digest को पूरी तरह बदल देता है |
| **Commitment** | अभी किसी मान को lock करो, बाद में reveal करो, झूठ नहीं बोल सकते |
| **Blinding factor (`r`)** | नया random number जो commitment को छिपाने योग्य बनाता है |
| **ZK-friendly hash** | ऐसा hash जो field arithmetic से बना हो ताकि उसे prove करना सस्ता पड़े |

---

## FAQ

**मान पर commitment करने के बजाय उसे बस encrypt क्यों न कर दें?**
Encryption का काम है *गोपनीयता जिसे आप बाद में decrypt कर सकें*। Commitment का काम है *binding*: यह गारंटी कि आप अपना जवाब बाद में बदल नहीं सकते। दोनों का काम अलग है।

**यदि commitments value को छिपाते हैं, तो फिर कोई नियमों की जाँच कैसे करता है?**
यह zero-knowledge proofs (लेख 5) का काम है: वे साबित करते हैं कि छिपा हुआ value नियमों का पालन करता है, बिना उसे प्रकट किए।

**क्या SHA-256 टूटा हुआ है, क्योंकि Zcash कुछ जगहों पर उससे बचता है?**
नहीं। SHA-256 बिल्कुल ठीक है और Zcash अभी भी उसका उपयोग करता है। बस *उसे किसी circuit के अंदर prove करना* महँगा पड़ता है, और उसी विशेष काम के लिए ZK-friendly hashes मौजूद हैं।

**random `r` कहाँ से आता है, और इसे कौन रखता है?**
जब note बनाया जाता है तब यह नया generate किया जाता है और note के मालिक को ज्ञात होता है। यही उन चीज़ों में से एक है जो हर note को unique और private बनाती है।

---

### अपनी सहज समझ जाँचिए

आप अपनी चुनाव-भविष्यवाणी पर `H(v, r)` के रूप में commitment करते हैं और उसे प्रकाशित कर देते हैं। आपका एक मित्र ज़ोर देता है कि चीज़ों को सरल रखने के लिए आपको सिर्फ `H(v)` प्रकाशित करना चाहिए। एक वाक्य में बताइए, यदि केवल दो ही संभावित परिणाम हों तो यह बुरा विचार क्यों है? *(उत्तर नीचे है।)*

<details><summary>उत्तर</summary>

यदि केवल दो परिणाम हों, तो आपका मित्र बस `H("win")` और `H("lose")` खुद compute करके आपके प्रकाशित digest से तुलना कर सकता है, और तुरंत आपकी भविष्यवाणी जान सकता है। साधारण hash bind तो करता है, लेकिन hide नहीं करता; इस guess-and-check हमले को रोकने वाली चीज़ random `r` ही है।
</details>

---

### आगे क्या

**लेख 4 . Merkle trees:** अब हमारे पास लाखों commitments जमा हो रहे हैं। लेख 4 दिखाता है कि Zcash उन्हें एक ही tree में कैसे व्यवस्थित करता है, जिसकी छोटी root fingerprint पूरे इतिहास का प्रतिनिधित्व करती है, और आप यह कैसे साबित कर सकते हैं कि आपका note उस tree में है बिना यह बताए कि कौन-सा note है। यही लेख 0 के "public board" का असली रूप है।

*यह* Zcash from First Principles *श्रृंखला का हिस्सा है, [ZecHub](https://zechub.org) के लिए। Licensed CC BY-SA 4.0.*
