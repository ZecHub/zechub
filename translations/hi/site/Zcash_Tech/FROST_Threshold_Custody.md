<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST_Threshold_Custody.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="पृष्ठ संपादित करें"/>
</a>

# Shielded ZEC के लिए FROST और Threshold Custody

> FROST प्रोटोकॉल के पूर्ण क्रिप्टोग्राफिक विवरण के लिए, [FROST तकनीकी पृष्ठ](FROST.md) देखें।

Zcash से जुड़ी चर्चाओं में FROST threshold custody बार-बार सामने आता है — यह ZecHub Hackathon 2026 में सबसे प्रमुख ट्रैक था — लेकिन इस अवधारणा को हमेशा सरल भाषा में नहीं समझाया जाता। यह पृष्ठ बताता है कि इसका क्या अर्थ है, आपको वास्तव में इसकी कब ज़रूरत होती है, इसके क्या trade-offs हैं, और आज कौन-से tools इसे support करते हैं।

---

## संक्षेप में

- **FROST** keyholders के एक समूह को इस तरह किसी shielded Zcash address पर सामूहिक नियंत्रण देता है कि किसी एक व्यक्ति के पास पूरी private key नहीं होती।
- **t-of-n** threshold का अर्थ है: खर्च करने के लिए t लोगों को सह-हस्ताक्षर करना होगा; t-1 या उससे कम लोग अकेले funds नहीं हिला सकते।
- Transactions किसी भी सामान्य shielded transaction की तरह दिखती हैं — on-chain ऐसा कोई footprint नहीं होता जो बताए कि threshold signing का उपयोग हुआ था।
- यह transparent multisig से मूल रूप से अलग है (जो सार्वजनिक रूप से on-chain दिखाई देता है और जिसे Zcash लंबे समय से support करता है) — FROST shielded pool के भीतर काम करता है।
- यह DAOs, exchanges, custody services, संयुक्त बचत, और team treasuries के लिए उपयोगी है — जहाँ key failure का एकल बिंदु अस्वीकार्य हो।

---

## सरल भाषा में FROST क्या है?

कल्पना कीजिए कि तीन व्यावसायिक साझेदारों में से हर एक के पास एक key का एक हिस्सा है। उनके shared wallet से खर्च करने के लिए, तीन में से कोई भी दो सहमत हों और co-sign करें, यह आवश्यक है। परिणामस्वरूप transaction बिल्कुल एक सामान्य व्यक्तिगत send जैसी दिखती है — blockchain देखकर कोई पर्यवेक्षक यह नहीं बता सकता कि इसमें कई लोग शामिल थे।

FROST (**Flexible Round-Optimized Schnorr Threshold Signatures**) वह cryptographic protocol है जो shielded Zcash के लिए इसे संभव बनाता है। इसे Chelsea Komlo (University of Waterloo / Zcash Foundation) और Ian Goldberg ने बनाया था।

मुख्य गुण:

- **Threshold**: केवल t-of-n signers को भाग लेना होता है (उदाहरण: 2-of-3, 3-of-5)
- **Shielded**: Orchard privacy pool के भीतर काम करता है — राशि, प्रेषक और प्राप्तकर्ता निजी रहते हैं
- **Indistinguishable**: अंतिम signature किसी भी अन्य Zcash shielded transaction जैसा ही दिखता है
- **Non-custodial**: किसी एक पक्ष के पास कभी भी पूरी key नहीं होती — coordinator के पास भी नहीं

---

## आपको threshold custody कब उपयोग करनी चाहिए?

Threshold custody तब समझदारी भरी होती है जब **एक key खो जाने या एक व्यक्ति के अनुपलब्ध होने का मतलब funds खो जाना नहीं होना चाहिए**।

| स्थिति | threshold custody क्यों मदद करती है |
|-----------|----------------------------|
| **DAO या team treasury** | कोई एक admin अकेले funds खाली नहीं कर सकता; सहमति आवश्यक होती है |
| **Exchange या custodian** | key risk को अलग-अलग security zones या कर्मचारियों में बाँटता है |
| **व्यक्तिगत cold storage (विश्वसनीय परिवार के साथ)** | आपके + परिवार के दो सदस्यों के बीच 2-of-3 — यदि आपकी मृत्यु हो जाए या access खो जाए, तो funds नहीं खोते |
| **Escrow** | खरीदार, विक्रेता और arbitrator — तीनों के पास एक share होता है; दो की सहमति पर funds जारी होते हैं |
| **उच्च-मूल्य grant disbursement** | ZCG-style: भुगतान से पहले कई स्वतंत्र signers की आवश्यकता |
| **Developer key management** | insider threat को रोकता है — कोई एक engineer अकेले protocol fund खाली नहीं कर सकता |

यदि आपके पास केवल आपका अपना personal wallet है, राशि छोटी है, या ऐसी स्थिति है जहाँ अतिरिक्त coordination overhead जोखिम में कमी की तुलना में अधिक भारी पड़ता है, तो संभवतः आपको threshold custody की **ज़रूरत नहीं** है।

---

## यह transparent multisig से कैसे अलग है?

Zcash लंबे समय से transparent multisig को support करता है — t-address से खर्च करने के लिए अनेक keys की आवश्यकता। लेकिन transparent multisig की एक महत्वपूर्ण privacy लागत है: **multisig संरचना, सभी public keys, और सभी signers blockchain पर दिखाई देते हैं**।

FROST इसे shielded pool के भीतर काम करके हल करता है:

| | Transparent multisig | FROST threshold (shielded) |
|--|---------------------|--------------------------|
| Pool | Transparent (सार्वजनिक) | Orchard (shielded) |
| क्या signers on-chain दिखाई देते हैं | हाँ — सभी public keys उजागर होती हैं | नहीं — यह single-signer spend से अलग नहीं दिखता |
| क्या राशियाँ दिखाई देती हैं | हाँ | नहीं |
| आवश्यक coordination | On-chain script | Off-chain communication का एक round |
| Privacy | कोई नहीं | पूर्ण shielded privacy |

---

## Trade-offs और सीमाएँ

FROST शक्तिशाली है, लेकिन इसे उपयोग करने से पहले इसके वास्तविक trade-offs समझना ज़रूरी है:

### Coordination overhead
Signing round पूरा करने के लिए signers का एक ही समय (या लगभग उसी समय) online होना ज़रूरी है। यदि आपके t signers अलग-अलग time zones में हों या उनके connections अविश्वसनीय हों, तो खर्च करने के लिए ऐसी coordination की आवश्यकता होगी जो एक solo wallet में नहीं होती।

### यदि quorum उपलब्ध न हो तो signing नहीं
यदि पर्याप्त keyholders उपलब्ध न हों (बीमार, यात्रा पर, उत्तर न देने वाले), तो funds अस्थायी रूप से unspendable हो जाते हैं। अपना threshold और share count सावधानी से चुनें — 2-of-3, 2-of-2 की तुलना में अधिक resilient है।

### Key generation ceremony
FROST सेटअप करने के लिए distributed key generation (DKG) ceremony की आवश्यकता होती है, जिसमें सभी n प्रतिभागियों का एक साथ online होना ज़रूरी है। यह एक बार होने वाली प्रक्रिया है, लेकिन इसे सावधानी से करना होता है — यदि DKG के दौरान प्रतिभागी compromised हो जाएँ, तो सुरक्षा कमजोर पड़ जाती है।

### Tooling अभी परिपक्व हो रही है
Shielded Zcash के लिए FROST अपेक्षाकृत नया है। IETF standard (draft-irtf-cfrg-frost) परिपक्व है, लेकिन wallet integrations सीमित हैं। एक standard single-key wallet की तुलना में कुछ rough edges की अपेक्षा रखें।

### Recovery की जटिलता
एक shard का खो जाना दुनिया का अंत नहीं है (यही तो threshold का उद्देश्य है), लेकिन recovery plans पहले से दस्तावेजीकृत होने चाहिए। Backups किसके पास होंगे? यदि एक साथ दो shards खो जाएँ तो क्या होगा?

---

## Zcash पर FROST के साथ कौन निर्माण कर रहा है?

### Zcash Foundation — frost.zfnd.org
Zcash Foundation ने एक कार्यशील FROST implementation और demo site जारी की है। testing और development के लिए यही reference implementation है।

### YWallet FROST Demo
YWallet (एक high-performance Zcash wallet) में शुरुआती FROST demo integration है। चरण-दर-चरण निर्देशों के लिए [YWallet FROST Demo guide](/guides/Ywallet_FROST_Demo) देखें।

### ZecHub Hackathon 2026 — FROST Track Projects

ZecHub Hackathon 2026 में FROST track सबसे अधिक प्रतिस्पर्धी था। उल्लेखनीय projects:

- **ZecVault** — mainnet पर settled 2-of-3 shielded escrow (FROST threshold)
- **Steward** — recovery-focused UX के साथ shielded Zcash के लिए threshold custody

### Coinbase
Coinbase ने अपनी threshold signing systems (Bitcoin के लिए) हेतु production FROST implementation बनाई, जिसमें preprocessing stage को हटाने और aggregator role को सभी प्रतिभागियों में बाँटने वाले modifications शामिल हैं। उनका अनुभव production scale पर FROST के security model को मान्य करता है।

---

## Signing session कैसे काम करती है (सरलीकृत)

1. **Setup (एक बार):** सभी n प्रतिभागी distributed key generation (DKG) ceremony चलाते हैं। हर एक को एक private shard मिलता है; एक shared public key निकाली जाती है। किसी भी पक्ष को पूरी private key ज्ञात नहीं होती।

2. **Signers का समन्वय:** जब खर्च की आवश्यकता होती है, एक coordinator (जो signers में से एक भी हो सकता है) sign करने को तैयार t प्रतिभागियों से commitments एकत्र करता है।

3. **Round 1:** हर भाग लेने वाला signer एक nonce बनाता है और एक commitment broadcast करता है (सार्वजनिक, गैर-संवेदनशील)।

4. **Round 2:** हर भाग लेने वाला signer अपने private shard का उपयोग करके अपनी partial signature गणना करता है और उसे broadcast करता है।

5. **Aggregation:** coordinator t partial signatures को मिलाकर एक अंतिम Schnorr signature बनाता है — जो on-chain single-party signature से अलग नहीं दिखती।

6. **Broadcast:** transaction को सामान्य तरीके से Zcash network पर broadcast कर दिया जाता है।

यदि कोई signer खराब partial signature भेजता है, तो protocol उसे पहचान लेता है और प्रक्रिया रोक देता है (उसे future sessions से बाहर कर दिया जाता है)। Coordination off-chain होती है — blockchain केवल अंतिम transaction देखती है।

---

## अपने threshold parameters कैसे चुनें

| Setup | Resilience | Risk |
|-------|-----------|------|
| 1-of-1 | कोई resilience नहीं — failure का एकल बिंदु | key loss = स्थायी नुकसान |
| 2-of-2 | दोनों signers का होना अनिवार्य — fault tolerance नहीं | एक अनुपलब्ध = funds freeze |
| 2-of-3 | एक shard खो सकता है या अनुपलब्ध हो सकता है | 3-of-5 की तुलना में कम security margin |
| 3-of-5 | दो shards खो सकते हैं; मजबूत सुरक्षा | अधिक coordination overhead |
| 3-of-7 | institutional-grade; दो failures सहन करता है | उच्च coordination लागत |

अधिकांश teams के लिए व्यावहारिक शुरुआती बिंदु: **2-of-3** (resilient, न्यूनतम coordination) या **3-of-5** (institutional, अधिक सुरक्षा)।

---

## संबंधित पृष्ठ

- [FROST — तकनीकी गहन विश्लेषण](FROST.md) — protocol के cryptographic विवरण (DKG, signing rounds, security proofs)
- [YWallet FROST Demo Guide](/guides/Ywallet_FROST_Demo) — चरण-दर-चरण hands-on demo
- [FROST Demo (frostdemo)](/guides/frostdemo) — Zcash Foundation demo walkthrough
- [Viewing Keys](Viewing_Keys.md) — shielded addresses के लिए read-only access (threshold custody के पूरक)
- [Zcash Shielded Assets](Zcash_Shielded_Assets.md) — FROST, ZSA issuance के लिए भी प्रमुख infrastructure है

## संसाधन

- [FROST शोध-पत्र (Komlo & Goldberg, 2020)](https://eprint.iacr.org/2020/852.pdf)
- [IETF FROST draft standard (draft-irtf-cfrg-frost)](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/)
- [Zcash Foundation FROST implementation](https://frost.zfnd.org)
- [Chelsea Komlo — Threshold Signatures क्या हैं? (Zcon3)](https://youtu.be/cAfTTfblzoU?t=110)
- [Coinbase — Threshold Digital Signatures](https://www.coinbase.com/blog/threshold-digital-signatures)
- [ROAST — Robust Async Schnorr Threshold Signatures (Blockstream)](https://eprint.iacr.org/2022/550.pdf)
