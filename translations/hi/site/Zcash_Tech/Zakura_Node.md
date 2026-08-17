<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zakura_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="पृष्ठ संपादित करें"/>
</a>

# Zakura नोड

> 🇧🇷 [पुर्तगाली संस्करण](/zechubglobal/zcashbrasil/zcashtech/zakura)

Zakura, Zcash के लिए एक मुफ्त, ओपन-सोर्स फुल नोड इम्प्लीमेंटेशन है, जिसे स्केल के लिए बनाया गया है। [Zebra](Zebra_Full_Node.md) से फोर्क किया गया और **Valar Group** तथा **Project Tachyon** के सहयोग से विकसित, Zakura अत्यधिक तेज़ सिंक्रोनाइज़ेशन, नेटिव ब्लॉक प्रूनिंग, और पुराने `zcashd` टूलिंग के लिए एक compatibility layer प्रदान करता है। संस्करण 1.0.0, 15 जुलाई 2026 को जारी किया गया था।

---

## संक्षेप में

- Zakura एक **consensus-compatible Zcash फुल नोड** है — Zebra और zcashd का एक विकल्प, जिसे Zebra से फोर्क किया गया है।
- Blockchain sync, Zebra की तुलना में लगभग **5× तेज़** है; snapshot bootstrapping **2 मिनट से कम** में पूरा हो जाता है।
- **नेटिव ब्लॉक प्रूनिंग** ऑपरेटरों को बहुत कम disk space के साथ फुल नोड चलाने की अनुमति देती है (~11 GB pruned snapshot बनाम 300 GB एक पूर्ण Zebra नोड के लिए)।
- एक **zcashd RPC compatibility mode** मौजूदा wallets और integrations को बिना किसी बदलाव के काम करने देता है।
- एक **experimental P2P transport layer** (डिफ़ॉल्ट रूप से disabled) sub-500ms block propagation को DoS-resistant gossip के साथ लक्षित करती है।
- **Ironwood (NU6.3)** के साथ compatible, जो Zcash network upgrade है और 2026 के मध्य में सक्रिय हुआ था।
- नेतृत्व **Sean Bowe** (Zcash के सह-संस्थापक, Project Tachyon) और **Dev Ojha** (Valar Group) द्वारा किया गया।

---

## Zakura क्या है?

Zakura एक Zcash फुल नोड है जिसे शुरुआत से ही बड़े पैमाने पर production-ready बनने के लिए डिज़ाइन किया गया है। जबकि यह Zebra के साथ consensus compatibility साझा करता है — यानी यह वही Zcash protocol rules को validate करता है और उनका पालन करता है — Zakura महत्वपूर्ण engineering improvements लाता है, जिनका उद्देश्य Zcash फुल नोड चलाने की बाधा को कम करना है।

यह परियोजना **Project Tachyon** (जिसका नेतृत्व Sean Bowe करते हैं, जो Zcash के मूल cryptographic engineers में से एक हैं) और **Valar Group** (जिसका नेतृत्व Dev Ojha करते हैं) का संयुक्त प्रयास है। वे मिलकर अगली पीढ़ी के Zcash protocol improvements पर ध्यान केंद्रित करते हैं, और Zakura इस काम के लिए reference नोड के रूप में कार्य करता है।

---

## मुख्य विशेषताएँ

### 5× तेज़ चेन सिंक्रोनाइज़ेशन

Zakura, Zebra की तुलना में लगभग 5× तेज़ blockchain synchronization हासिल करता है। इससे उन ऑपरेटरों के लिए यह काफी अधिक व्यावहारिक हो जाता है जिन्हें जल्दी से नोड शुरू करना हो या downtime के बाद पुनर्प्राप्ति करनी हो।

### Snapshot Bootstrapping

Zakura पहले से तैयार chain snapshots प्रकाशित करता है, जो initial sync time को बहुत कम कर देते हैं:

| Bootstrap Method | Time |
|-----------------|------|
| Archive snapshot | ~37 मिनट |
| Pruned snapshot | **2 मिनट से कम** |
| Zebra (full sync) | ~20 घंटे |

Pruned snapshots लगभग **11 GB** के होते हैं, जिससे genesis से sync करने की तुलना में **680× तेज़** नोड bootstrap संभव होता है।

### Native Block Pruning

Zakura configurable block pruning को सपोर्ट करता है, जिससे नोड ऑपरेटर यह निर्धारित कर सकते हैं कि chain history का कितना हिस्सा रखना है। इससे सीमित storage वाले hardware पर फुल नोड चलाना व्यावहारिक बनता है — यह validators, developers, और infrastructure providers के लिए उपयोगी है जिन्हें पूरी historical chain की आवश्यकता नहीं होती।

### zcashd RPC Compatibility Mode

Zakura में एक compatibility mode शामिल है जो पुराने `zcashd` JSON-RPC interface को पुन: प्रस्तुत करता है। मौजूदा wallets, exchanges, और integrations जो `zcashd` RPCs पर निर्भर हैं, वे बिना code changes के Zakura पर स्विच कर सकते हैं।

### Experimental P2P Transport Layer

Zakura एक अगली पीढ़ी की peer-to-peer transport layer के साथ आता है, जो वर्तमान में **डिफ़ॉल्ट रूप से disabled** है। सक्षम किए जाने पर, इसका लक्ष्य है:

- पूरे नेटवर्क में sub-500ms worst-case block propagation
- अधिक कुशल transaction relay के लिए mempool aggregation
- network resilience सुधारने के लिए DoS-resistant gossip protocol

यह layer Project Tachyon के तहत विकसित किए जा रहे भविष्य के Zcash network-level improvements की एक झलक प्रस्तुत करती है।

### Ironwood (NU6.3) Compatible

Zakura, Ironwood network upgrade (NU6.3) के साथ पूरी तरह compatible है, जो 2026 के मध्य में Zcash mainnet पर सक्रिय किया गया था।

---

## Zakura का अन्य Zcash नोड्स से संबंध

| | zcashd | Zebra | Zakura |
|--|--------|-------|--------|
| भाषा | C++ (Bitcoin से फोर्क किया गया) | Rust | Rust (Zebra से फोर्क किया गया) |
| स्थिति | Deprecated | Active | Active (v1.0.0, Jul 2026) |
| Sync speed | आधाररेखा | ~1× | ~5× तेज़ |
| Block pruning | नहीं | नहीं | हाँ |
| zcashd RPC compat | नेटिव | आंशिक | हाँ (compat mode) |
| Snapshot bootstrap | नहीं | नहीं | हाँ (<2 min) |
| Experimental P2P | नहीं | नहीं | हाँ (opt-in) |

---

## शुरुआत करें

डाउनलोड विकल्प, snapshots, और configuration documentation यहाँ उपलब्ध हैं:

- **डाउनलोड और setup guide:** [zakura.com/download](https://zakura.com/download/)
- **Chain snapshots:** [zakura.com/snapshots](https://zakura.com/snapshots/)
- **Source code:** [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)

---

## संबंधित पृष्ठ

- [Zebra फुल नोड](Zebra_Full_Node.md) — upstream Zcash फुल नोड जिससे Zakura को फोर्क किया गया था
- [Zaino Indexer](Zaino.md) — Zebra और Zakura के साथ compatible एक Rust-आधारित indexer
- [फुल नोड्स](Full_Nodes.md) — Zcash फुल नोड विकल्पों का अवलोकन
- [Lightwallet नोड्स](Lightwallet_Nodes.md) — हल्के client alternatives

## संसाधन

- [Introducing Zakura — घोषणा](https://zakura.com/announcements/introducing-zakura/)
- [Zakura GitHub](https://github.com/zakura-core/zakura)
- [Zakura वेबसाइट](https://zakura.com/)
- [X/Twitter पर Zakura](https://x.com/ZakuraZcash)
- [Project Tachyon](https://electriccoin.co/blog/)
