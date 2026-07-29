# एलिप्टिक कर्व्स: जहाँ Zcash की Keys और Commitments जन्म लेते हैं
##### [Annkkitaaa](https://github.com/Annkkitaaa) का मूल शोध

![alt text](image-10.png)

### बिंदुओं से बनी एक one-way सड़क

> **श्रृंखला:** *Zcash from First Principles* . **लेख 2 . Elliptic Curves**
> **पाठक-वर्ग:** नए पाठक। हम केवल [लेख 1 (finite fields)](article-1-finite-fields.md) मानकर चलते हैं: ऐसी arithmetic जो किसी prime के mod पर घूमकर वापस आती है। किसी अन्य पृष्ठभूमि की आवश्यकता नहीं।
> **आप क्या लेकर जाएंगे:** elliptic curves की एक सहज और सही समझ, वह "trapdoor" जो उन्हें उपयोगी बनाता है, और ठीक-ठीक यह कि Zcash उनसे keys और commitments कैसे बनाता है।

[लेख 1](article-1-finite-fields.md) ने हमें arithmetic के लिए एक आदर्श खेल का मैदान दिया: finite field। लेकिन अपने-आप में field केवल संख्याएँ है। [लेख 0](article-0-shielded-transaction.md) के keys और "sealed envelopes" बनाने के लिए Zcash को ऐसी वस्तु चाहिए जिसमें कठिनाई का एक विशेष, एक-दिशीय प्रकार हो: आगे की दिशा में गणना करना आसान हो, पर उल्टा करना व्यावहारिक रूप से असंभव हो। वही वस्तु है एक **elliptic curve**। यह लेख इसे बिल्कुल मूल से बनाता है, algebra से पहले intuition के साथ।

---

## 1. आपको इसकी परवाह क्यों करनी चाहिए?

हर privacy system को एक **one-way सड़क** चाहिए: ऐसा operation जिस पर आगे चलना आसान हो और पीछे लौटना प्रभावी रूप से असंभव।

कारण यह है। आपकी **secret key** एक संख्या है जिसे आप छिपाकर रखते हैं। आपकी **public key** (और आपका address) उससे निकाला जाता है और दुनिया को दिखाया जाता है। पूरे system की security एक तथ्य पर टिकी है: *public key से पीछे चलते हुए कोई भी आपकी secret key तक नहीं पहुँच सकता।* अगर वे पहुँच सकते, तो वे आपका पैसा खर्च कर सकते।

इसलिए हमें एक ऐसा mathematical operation चाहिए जिसमें:

- **आगे** जाना (secret -> public) तेज़ और आसान हो, लेकिन
- **पीछे** जाना (public -> secret) इतना कठिन हो कि ब्रह्मांड की पूरी आयु तक पृथ्वी के सारे कंप्यूटर मिलकर भी उसे पूरा न कर सकें।

साधारण finite-field multiplication पर्याप्त नहीं है; division उसे तुरंत पलट देता है (लेख 1 का पूरा मुद्दा यही था)। हमें ऐसी चीज़ चाहिए जिसमें कोई आसान "undo" बटन न हो। Elliptic curves ठीक यही देती हैं, और अतिरिक्त लाभ के रूप में, उनके points ऐसे जुड़ते हैं कि commitments बनाने के लिए वे आदर्श हैं। आइए देखें कैसे।

---

## 2. सहज समझ: एक curve जिसके points को आप "जोड़" सकते हैं

कुछ समय के लिए cryptography भूल जाइए। एक **elliptic curve** बस उन points `(x, y)` का समुच्चय है जो इस रूप के एक equation को संतुष्ट करते हैं:

```
y^2 = x^3 + ax + b
```

साधारण संख्याओं पर यह एक चिकनी, लहराती हुई curve जैसी दिखती है, जिसमें अक्सर एक गोल-सा loop और दो tails होती हैं:

![alt text](image-14.png)

वास्तव में चौंकाने वाली बात यह है: **आप इस curve के दो points को "जोड़" कर उसी curve पर तीसरा point प्राप्त कर सकते हैं।** यह coordinates का साधारण addition नहीं है। यह एक ज्यामितीय नियम है, और इसे *देखना* बताने से आसान है।

### chord नियम (दो अलग points को जोड़ना)

`P + Q` जोड़ने के लिए:

1. `P` और `Q` से होकर एक सीधी रेखा खींचिए।
2. यह रेखा curve को ठीक एक और स्थान पर काटती है। उसे `R*` कहिए।
3. **`R*` को horizontal axis के पार reflect कीजिए।** वही reflection उत्तर है, `P + Q`।

![alt text](image-11.png)

### tangent नियम (किसी point को उसी से जोड़ना)

`P + P` (जिसे `2P` लिखा जाता है) निकालने के लिए दूसरा point नहीं होता जिसके बीच रेखा खींची जाए, इसलिए आप `P` पर **tangent** रेखा लेते हैं, और फिर वही "तीसरा intersection, फिर reflection" विधि अपनाते हैं।

यही पूरा operation है। दो ज्यामितीय नियम। इनके साथ, elliptic curve के points वह बनाते हैं जिसे mathematicians एक **group** कहते हैं: एक ऐसा समुच्चय जिसमें एक सुव्यवस्थित "addition" हो। इसमें एक "zero" भी होता है।

### infinity पर point (curve का zero)

हर number system को एक `0` चाहिए, ऐसी चीज़ जो जोड़ने पर कुछ न बदले। Elliptic curve पर यह भूमिका एक विशेष अतिरिक्त point निभाता है जिसे **point at infinity** कहते हैं, और `O` लिखा जाता है। आप इसे "अनंत ऊपर दूर" स्थित जगह की तरह सोच सकते हैं, जहाँ vertical lines मिलती हैं। `O` को किसी भी point में जोड़ने से वह अपरिवर्तित रहता है, बिल्कुल `0` जोड़ने जैसा।

---

## 3. चित्रों से finite field तक

ऊपर की चिकनी curve हमारी *सहज समझ* है। लेकिन Zcash real numbers का उपयोग नहीं करता (वे round हो जाते हैं और आकार की जानकारी leak करते हैं, जैसा लेख 1 में था)। यह **finite field पर** एक elliptic curve का उपयोग करता है: वही equation `y^2 = x^3 + ax + b`, लेकिन सारी arithmetic किसी prime के mod में की जाती है।

जब आप ऐसा करते हैं, तो वह सुंदर curve **बिखरे हुए disconnected dots** में टूट जाती है, हर उस `(x, y)` pair के लिए एक dot जो equation को mod `p` पर संतुष्ट करता है। वह curve जैसी दिखना ही बंद कर देती है। लेकिन यहाँ निर्णायक बात यह है:

> **chord-and-tangent नियम का algebra फिर भी पूरी तरह काम करता है।** वही formulas जो ज्यामिति से `P + Q` निकालते थे, अब उसे finite-field arithmetic से निकालते हैं। ये dots फिर भी एक group बनाते हैं, उसी `0` (point at infinity) के साथ।

आइए इसे एक छोटे, पूरी तरह सत्यापित उदाहरण से वास्तविक बनाते हैं।

### एक पूर्ण curve, ठीक-ठीक गणना की गई

`F_17` finite field पर `y^2 = x^3 + 2x + 2` लीजिए। हर वैध point की गणना करने पर ठीक **18 points, और point at infinity मिलाकर कुल 19** मिलते हैं। उनमें से कुछ:

```
(0,6) (0,11) (3,1) (3,16) (5,1) (5,16) (6,3) (6,14) (7,6) (7,11) ...
```

अब point `G = (5, 1)` चुनिए और उसे बार-बार खुद में जोड़ते जाइए। देखिए क्या होता है (नीचे की हर पंक्ति की गणना की गई है, अनुमान नहीं लगाया गया):

| Step | Point | Step | Point |
|---|---|---|---|
| `1G` | (5, 1) | `11G` | (13, 10) |
| `2G` | (6, 3) | `12G` | (0, 11) |
| `3G` | (10, 6) | `13G` | (16, 4) |
| `4G` | (3, 1) | `14G` | (9, 1) |
| `5G` | (9, 16) | `15G` | (3, 16) |
| `6G` | (16, 13) | `16G` | (10, 11) |
| `7G` | (0, 6) | `17G` | (6, 14) |
| `8G` | (13, 7) | `18G` | (5, 16) |
| `9G` | (7, 6) | `19G` | **O (infinity)** |
| `10G` | (7, 11) | | |

ध्यान देने योग्य दो बातें:

- यह **सभी 18 finite points पर जाता है और फिर 19वें step पर `O`** पर पहुँचता है, और उसके बाद यह हमेशा दोहराता रहेगा। शुरुआती point `G` पूरे group को "generate" करता है, इसलिए हम उसे **generator** कहते हैं।
- यह एक सत्यापित group है: उदाहरण के लिए `1G + 2G = (5,1) + (6,3) = (10,6)`, जो ठीक `3G` है। Addition अंदर से सुसंगत है, जैसा कि किसी group में होना चाहिए।

---

## 4. trapdoor: scalar multiplication

`1G, 2G, 3G, ...` की वह तालिका ही सब कुछ का केंद्र है। किसी point को बार-बार खुद में जोड़ने को **scalar multiplication** कहते हैं: point `kG` का अर्थ है "`G` को खुद में `k` बार जोड़ा गया।"

अब जादू देखिए। इन दो दिशाओं पर विचार कीजिए:

| Direction | Question | Difficulty |
|---|---|---|
| **Forwards** | `k` और `G` दिए हों, `kG` निकालिए | **आसान।** बहुत ही विशाल `k` के लिए भी *double-and-add* नाम की एक तरकीब इसे कुछ सौ steps में कर देती है |
| **Backwards** | `G` और `kG` दिए हों, `k` वापस निकालिए | किसी वास्तविक cryptographic curve पर **प्रभावी रूप से असंभव** |

यही असमानता वह **one-way सड़क** है जिसकी हमें खंड 1 में आवश्यकता थी। पीछे की समस्या ("इस point को किस `k` ने पैदा किया?") को **Elliptic Curve Discrete Logarithm Problem (ECDLP)** कहा जाता है, और Zcash जिन curves का उपयोग करता है, उन पर कोई ज्ञात विधि इसे ब्रह्मांड के ऊष्मा-मृत्यु से पहले हल नहीं कर सकती।

![alt text](image-12.png)

> हमारे खिलौना `F_17` curve में आप तालिका देखकर `k` पढ़ सकते थे, क्योंकि उसमें केवल 19 points हैं। वास्तविक curves में लगभग `2^(255)` points होते हैं। उस तालिका में ब्रह्मांड के atoms से भी अधिक rows होंगी, इसलिए "उसे पढ़ लेना" कोई विकल्प नहीं है। यही छोटापन toy curve को सिखाने योग्य बनाता है और यही कारण है कि वह सुरक्षित नहीं है।

---

## 5. keys कैसे जन्म लेती हैं (मुख्य परिणाम)

अब हमारे पास एक वास्तविक cryptographic key को समझाने के लिए आवश्यक सब कुछ है, और यह आश्चर्यजनक रूप से सरल है:

> **एक secret number `k` चुनिए। point `kG` प्रकाशित कर दीजिए। बस इतना ही।**
> `k` आपकी **private key** है। `kG` आपकी **public key** है। one-way सड़क (ECDLP) यह सुनिश्चित करती है कि कोई भी `kG` से पीछे जाकर `k` तक नहीं पहुँच सकता।

यही एक विचार, *एक public key किसी निश्चित generator का secret scalar गुना है*, Zcash की spending keys, viewing keys, और addresses का बीज है। पूरा key tree इसके ऊपर और संरचना बनाता है, लेकिन हर branch इसी जड़ से उगती है।

### अतिरिक्त: curve points commitments के लिए इतने उपयुक्त क्यों हैं

लेख 0 के "sealed envelope" (commitment) को याद कीजिए, जिसे अपनी सामग्री **छिपानी** भी थी और **जाली बनाना असंभव** भी होना था। Elliptic curves हमें इसे बनाने का एक साफ़ तरीका देती हैं। दो fixed, public generator points `G` और `H`, एक secret value `v`, और एक random blinding number `r` लीजिए, और बनाइए:

```
Commitment  =  v.G  +  r.H
```

यह एक **Pedersen commitment** है, और इसमें वे दोनों गुण हैं जो हमें चाहिए थे:

- **Hiding:** random `r` परिणाम को पूरी curve पर फैला देता है, इसलिए point `v` के बारे में कुछ नहीं बताता।
- **Binding:** ECDLP की वजह से ऐसा *अलग* `(v, r)` ढूँढना अव्यावहारिक है जो वही point दे, इसलिए आप बाद में यह नहीं बदल सकते कि आपने किस चीज़ पर commitment किया था।

एक अतिरिक्त गुण आगे चलकर अमूल्य साबित होता है: ये commitments **जुड़ते हैं**। `v_1` की commitment और `v_2` की commitment को जोड़ने पर `v_1 + v_2` के लिए एक वैध commitment मिलती है। यही "homomorphic" व्यवहार Zcash को बाद में यह सिद्ध करने देगा कि किसी transaction में *अंदर* जाने वाला पैसा *बाहर* आने वाले पैसे के बराबर है, बिना कोई amount बताए। हम इसका उपयोग लगभग लेख 6 में करेंगे।

---

## 6. यह Zcash में कहाँ मौजूद है

इसके fingerprints ठोस हैं और जाँचे जा सकते हैं।

| Zcash design | जिन curves का उपयोग होता है | भूमिका |
|---|---|---|
| **Sapling** (पुराना) | **BLS12-381** और उसके भीतर निहित एक curve जिसे **Jubjub** कहते हैं | BLS12-381 proof system को वहन करता है; Jubjub को BLS12-381 के scalar field पर बनाया गया है ताकि key और commitment operations को zero-knowledge proof के *अंदर* सस्ते में किया जा सके |
| **Orchard** (वर्तमान) | **Pallas** और **Vesta** (यानी "Pasta" cycle) | Pallas, Orchard की keys और commitments को वहन करता है; Pallas/Vesta pairing को विशेष रूप से इस तरह व्यवस्थित किया गया है कि उन्नत proofs कुशल हों |

क्यों एक curve को दूसरी के field के "भीतर" निहित किया जाता है, और दो curves की एक *cycle* उपयोगी क्यों होती है — ये कारण वास्तविक और महत्वपूर्ण हैं, लेकिन वे proof-system वाले लेखों के विषय हैं। अभी के लिए निष्कर्ष स्पष्ट है: **हर Zcash key एक generator का scalar गुना है, और हर Zcash commitment curve points का एक योग है**, जो इन नामित curves में से किसी एक पर मौजूद है।

![alt text](image-13.png)

---

## 7. एक ईमानदार अस्वीकरण

इस लेख को पठनीय बनाए रखने के लिए कुछ सरलीकरण किए गए। हमने **short Weierstrass** form (`y^2 = x^3 + ax + b`) का उपयोग किया; Zcash की curves को अक्सर अन्य समतुल्य रूपों में लिखा जाता है (Jubjub एक *twisted Edwards* curve है) जिन्हें दक्षता और सुरक्षा के लिए चुना जाता है, लेकिन group की मूल धारणा वही रहती है। हमने exact point-addition formulas को परिभाषित नहीं किया (वे "तीसरा intersection, फिर reflection" का algebraic रूप हैं), और हमने curve order, cofactors, तथा "pairings" जैसी बारीकियों को अलग रखा, जो proof-system वाले लेखों में महत्वपूर्ण हो जाती हैं। इनमें से कुछ भी intuition को बदलता नहीं; यह उसे और पैना बनाता है।

---

## 8. सारांश

- एक privacy system को एक **one-way सड़क** चाहिए: आगे आसान, पीछे अव्यावहारिक। Elliptic curves यह प्रदान करती हैं।
- एक **elliptic curve** उन points का समुच्चय है जो `y^2 = x^3 + ax + b` को संतुष्ट करते हैं, और उसके points को ज्यामितीय **chord-and-tangent** नियम से **जोड़ा** जा सकता है; इसमें एक विशेष **point at infinity** zero का काम करता है।
- **finite field** पर curve बिखरे हुए dots में बदल जाती है, लेकिन वही addition फिर भी काम करता है और points एक **group** बनाते हैं। (सत्यापित उदाहरण: `F_17` पर `y^2 = x^3 + 2x + 2` के 19 points हैं, और `G = (5,1)` उन सबको generate करता है।)
- **Scalar multiplication** `kG` निकालना आसान है लेकिन उल्टा करना अव्यावहारिक: यही **ECDLP** है। यही trapdoor है।
- **Keys:** private key `k`, public key `kG`। **Commitments:** Pedersen रूप `v.G + r.H`, जो छिपाता है, बाँधता है, और सुविधाजनक रूप से **जुड़ता भी है**।
- **Zcash** में, Sapling **BLS12-381 + Jubjub** का उपयोग करता है और Orchard **Pallas/Vesta (Pasta)** curves का; हर key और commitment इन्हीं पर रहती है।

---

## शब्दावली

| Term | सरल अर्थ |
|---|---|
| **Elliptic curve** | वे points जो `y^2 = x^3 + ax + b` को संतुष्ट करते हैं, साथ में points का एक विशेष "addition" |
| **Point addition** | chord-and-tangent नियम: दो points से रेखा, तीसरा intersection, फिर reflection |
| **Point at infinity (`O`)** | curve का "zero"; इसे जोड़ने से कुछ नहीं बदलता |
| **Generator (`G`)** | एक base point जिसके multiples अंततः पूरे group को cover कर लेते हैं |
| **Scalar multiplication (`kG`)** | `G` को खुद में `k` बार जोड़ना; आगे आसान, उल्टा कठिन |
| **ECDLP** | `kG` से `k` वापस निकालने की कठिन समस्या; सुरक्षा की नींव |
| **Pedersen commitment** | `v.G + r.H`; एक sealed envelope जो छिपाता है, बाँधता है, और जुड़ता है |

---

## FAQ

**सिर्फ़ किसी prime के mod में बड़ी संख्याओं की बजाय curves क्यों?**
दोनों एक one-way सड़क दे सकते हैं, लेकिन elliptic curves बहुत छोटी keys और तेज़ operations के साथ वही security देती हैं, और उनकी point arithmetic commitments के लिए आदर्श है।

**क्या ECDLP के कठिन होने का प्रमाण है?**
इसे असंभव *सिद्ध* नहीं किया गया है, लेकिन दशकों के गहन प्रयास के बावजूद अच्छी तरह चुनी गई curves पर कोई कुशल attack नहीं मिला है। Security इसी अच्छी तरह परीक्षित मान्यता पर टिकी है।

**क्या quantum computer इसे तोड़ सकता है?**
काफ़ी बड़ा quantum computer ECDLP को तोड़ सकता है। यह पूरे उद्योग में एक ज्ञात दीर्घकालिक चिंता और सक्रिय शोध का क्षेत्र है; आज की curves अभी भी classical computers के विरुद्ध सुरक्षित हैं।

**Zcash एक से अधिक curve क्यों उपयोग करता है?**
अलग-अलग कामों के लिए। एक curve zero-knowledge proof system को वहन करती है; दूसरी (पहली के field में embedded) proof के भीतर key और commitment operations को कुशल बनाती है। अगले लेख बताएँगे कि यह pairing क्यों महत्वपूर्ण है।

---

### अपनी intuition जाँचिए

खंड 3 की सत्यापित तालिका का उपयोग करते हुए, हमारे toy curve पर `9G + 10G` क्या है? और उत्तर आपको `G` के बारे में क्या बताता है? *(उत्तर नीचे है।)*

<details><summary>उत्तर</summary>

`9 + 10 = 19`, और हमने देखा कि `19G = O`, अर्थात point at infinity। इसलिए `9G + 10G = O`। इसका अर्थ है कि `10G`, `9G` का **negative** (additive inverse) है: ऐसे दो points जिनका योग "zero" point देता है। किसी curve पर, किसी point का negative बस x-axis के पार उसकी mirror image होता है, और वास्तव में `9G = (7,6)` तथा `10G = (7,11)` का `x` समान है और उनके `y`-values का योग `17 = 0 (mod 17)` है। यह संरचना पूरी तरह सुसंगत है, और "यह एक group है" का मतलब यही गारंटी देता है।
</details>

---

### आगे क्या

**लेख 3 . Hashing और commitments:** अब हम "जादुई sealed envelope" को ठीक से खोलेंगे। आपने अब curve points से commitment बनाने का एक तरीका देख लिया है; अगली बार हम पूछेंगे कि hiding और binding का वास्तव में क्या अर्थ है, hash functions से मिलेंगे, और दोनों को उन note commitments से जोड़ेंगे जो हर Zcash payment को आधार देते हैं।

*यह* Zcash from First Principles *श्रृंखला का हिस्सा है, [ZecHub](https://zechub.org) के लिए। Licensed CC BY-SA 4.0.*
