# FROST और Viewing Keys: Zcash/Dash इंटरऑप अनुसंधान संक्षेप

*ZecHub के लिए तैयार · 27 सितंबर 2026 को संशोधित · सभी दावों के स्रोत इनलाइन दिए गए हैं*

## कार्यकारी सारांश

ZecHub ने wiki दान विकल्प के रूप में shielded DASH जोड़ने के बाद यह प्रश्न उठाया: क्या Zcash-शैली के viewing keys, या FROST threshold signatures, का अनुवाद Dash में हो सकता है?

अनुसंधान ने इसे एक नए रूप में प्रस्तुत किया। Viewing keys कोई खुला प्रश्न नहीं हैं — Dash ने [Zcash Orchard shielded pool](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/) को अपनी Evolution chain में लागू कर दिया है, और Orchard की key hierarchy में निर्माण के अनुसार viewing keys शामिल हैं। Dash का अपना [roadmap](https://www.dash.org/roadmap/) उन्हें auditor disclosure और Travel Rule अनुपालन के लिए स्थापित करता है। यह हिस्सा तैनात है, काल्पनिक नहीं।

**FROST वह स्थान है जहाँ वास्तविक अंतर मौजूद है।** Dash पहले ही [Long-Living Masternode Quorums](https://docs.dash.org/projects/core/en/stable/docs/guide/dash-features-masternode-quorums.html) के माध्यम से BLS threshold signatures चलाता है, लेकिन वे नेटवर्क-स्तरीय consensus के लिए हैं — ChainLocks और InstantSend। [ZIP 312](https://zips.z.cash/zip-0312) कुछ अलग लक्षित करता है: व्यक्तिगत keyholders के एक छोटे समूह द्वारा रखे गए एक shielded account पर threshold spend authorization। दोनों परस्पर विनिमेय नहीं हैं। और चूँकि ZIP 312 अभी भी **Draft** है, इसलिए किसी भी chain पर पोर्ट करने के लिए कोई reference implementation नहीं है; अतः इसे जिस भी पक्ष ने बनाया, यह नया कार्य होगा।

---

## समयरेखा: यह तुलना अभी असामान्य क्यों है

2026 के मध्य में कुछ ही सप्ताहों के अंतर से दो shielded-pool घटनाएँ हुईं।

**Zcash ने Orchard को छोड़ा।** शोधकर्ता Taylor Hornby ने Orchard में एक circuit vulnerability का खुलासा किया, जिसका उपयोग पता चले बिना supply बढ़ाने के लिए किया जा सकता था। Zcash ने **Ironwood (NU6.3)** को **28 जुलाई 2026** को सक्रिय कर उत्तर दिया, जिसमें turnstile migration mechanism के साथ एक नया shielded pool पेश किया गया।

**Dash ने Orchard को अपनाया।** Dash ने योजना की घोषणा [19 फरवरी 2026](https://www.dash.org/blog/dash-is-adding-shielded-transactions-to-evolution/) को की — *"हम उम्मीद करते हैं कि जल्द ही shielded transfers शुरू कर सकेंगे, बशर्ते security audits और आगे के code review पूरे हों।"* Dash का [roadmap](https://www.dash.org/roadmap/) Shielded Balances को Dash Platform **v4.0** के साथ **जुलाई 2026 में पूर्ण** दर्ज करता है, और Dash ने [*"Shielded transactions Dash Evolution mainnet पर लाइव हैं"*](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/) को **4 अगस्त 2026** को प्रकाशित किया।

> **क्रम पर एक टिप्पणी।** कुछ रिपोर्टों ने Dash के mainnet activation को 17 जुलाई 2026 बताया, जिससे यह Ironwood से पहले हो जाता। यह तिथि activation के बजाय घोषणा की प्रेस रिपोर्टिंग से आती प्रतीत होती है। Dash के अपने स्रोतों में यह सुविधा जुलाई में पूर्ण हुई और 4 अगस्त को लाइव घोषित की गई — Ironwood के बाद। दोनों chains कुछ ही सप्ताहों के भीतर एक-दूसरे के रास्ते में आईं; सटीक क्रम इस पर निर्भर है कि किस milestone को गिना जाए, और यह संक्षेप किसी एक का दावा नहीं करता।

महत्त्वपूर्ण रूप से, Dash को bug विरासत में नहीं मिला। उनकी घोषणा स्पष्ट है: *"हमने Orchard का वह संस्करण लागू किया जिसमें कोई ज्ञात inflation bug नहीं है। पिछले संस्करण में एक bug था जिसका उपयोग Zcash की supply को पता चले बिना बढ़ाने के लिए किया जा सकता था।"*

इसलिए Dash अब cryptography का एक patched fork चलाता है, जिससे Zcash स्वयं base layer पर आगे बढ़ चुका है, जबकि Zcash का अगली पीढ़ी का pool (Ironwood) और अगली पीढ़ी की spend-authorization scheme (FROST) क्रमशः अभी नया लाइव और अभी भी Draft हैं।

---

## Viewing keys: तैनात, अनुसंधान का अंतर नहीं

Dash का shielded pool [Orchard](https://zips.z.cash/zip-0224) है, जो Halo 2 zk-SNARKs पर बना है और किसी trusted setup की आवश्यकता नहीं रखता। Orchard की key hierarchy में शुरुआत से ही Full Viewing Keys और Incoming Viewing Keys उसके design का हिस्सा रहे हैं, कोई बाद में जोड़ा गया फीचर नहीं — इसलिए क्षमता code के साथ आई, न कि ऐसी चीज़ के रूप में जिसे किसी chain को पोर्ट करने के लिए तय करना पड़ा।

Dash का roadmap उद्देश्य को सीधे बताता है:

> *"अनिवार्य privacy systems के विपरीत, जिन्हें exchange delistings और regulatory friction का सामना करना पड़ा है, Shielded Balances view keys के माध्यम से selective disclosure का समर्थन करते हैं — जिससे उपयोगकर्ता और व्यवसाय जरूरत पड़ने पर auditors के साथ transaction details साझा कर सकते हैं या Travel Rule आवश्यकताओं का पालन कर सकते हैं, बिना रोजमर्रा के उपयोग की privacy से समझौता किए।"*

दो टिप्पणियाँ दर्ज करने योग्य हैं:

**Dash viewing keys को Zcash के अपने tooling से अधिक ठोस production use case के आसपास स्थापित कर रहा है।** Zcash का payment-disclosure tooling wallets में मुख्यतः experimental और opt-in ही रहा है। Dash view keys को नामित use cases वाले compliance feature के रूप में भेज रहा है, ऐसी chain पर जो अपनी घोषणा के अनुसार लगभग एक-सेकंड deterministic settlement और करीब बीस-सेकंड wallet sync भी देती है।

**खुला विषय क्षमता नहीं, compatibility drift है।** जैसे-जैसे दोनों chains स्वतंत्र रूप से विकसित होती हैं, क्या Dash का viewing-key implementation Zcash के Orchard viewing-key format के साथ wire-compatible बना रहता है, इस पर नज़र रखना उचित है। यह research project के बजाय monitoring का प्रश्न है।

---

## Key derivation: Zcash और Dash की तुलना

यह खंड reviewer के प्रश्न को सीधे संबोधित करता है। संक्षिप्त उत्तर यह है कि *shielded* key trees लगभग समान हैं क्योंकि code साझा है — सार्थक अंतर इस बात में है कि प्रत्येक chain उस tree को अपने wallet key space में कैसे **root** करती है, और उस space में और क्या मौजूद है।

### Zcash

Zcash [ZIP 32, *Shielded Hierarchical Deterministic Wallets*](https://zips.z.cash/zip-0032) का उपयोग करता है, जिसकी स्थिति **Final** है। Shielded keys को एक ही BIP 32 tree में रखने के बजाय, ZIP 32 प्रत्येक shielded pool को अपनी master key और अपना path देता है:

```
m_Orchard / purpose' / coin_type' / account'
m_Sapling / purpose' / coin_type' / account'
```

`purpose`, BIP 43 के अनुसार, `32'` (0x80000020) पर स्थिर है, और `coin_type` SLIP 44 का अनुसरण करता है; सभी testnets index `1` साझा करते हैं।

एक Orchard account में hierarchy पूरी तरह एक-दिशात्मक है — प्रत्येक स्तर अपने नीचे की हर चीज़ derive कर सकता है और ऊपर की कोई नहीं:

| Key | क्या कर सकता है | Derives |
|---|---|---|
| Spending key | notes खर्च करना | `ask`, `nk`, `rivk` |
| Spend authorizing key (`ask`) | spends को authorize करना | — |
| Full Viewing Key (`ak`, `nk`, `rivk`) | आने वाले **और** जाने वाले payments देखना | IVK, OVK |
| Incoming Viewing Key | केवल आने वाले payments देखना | Diversified addresses |
| Outgoing Viewing Key | जाने वाले payment details पुनर्प्राप्त करना | — |
| Diversified address | प्राप्त करना | — |

Orchard ने इसे Sapling की अपेक्षा सरल बनाया: [Orchard Book](https://zcash.github.io/orchard/design/keys.html) के अनुसार, nullifier private key `nsk` हटाई गई, `nk` curve point के बजाय field element बन गया, और `ovk` अब अलग से रखने के बजाय full viewing key से derive होती है।

इसके ऊपर [ZIP 316, *Unified Addresses and Unified Viewing Keys*](https://zips.z.cash/zip-0316) स्थित है — Revision 0 Active, Revision 1 Withdrawn, Revision 2 Draft — जो per-pool keys को एक **Unified Full Viewing Key** ("कई Full Viewing Key… Items को जोड़ता है") और एक **Unified Incoming Viewing Key** में समाहित करता है। Wallet developer को जिस अंतर का सम्मान करना चाहिए: UFVK आने वाली और जाने वाली, दोनों गतिविधियाँ प्रकट करता है; UIVK केवल आने वाली।

### Dash

Dash, SLIP 44 coin type `5'` के साथ, सब कुछ पारंपरिक BIP 32 tree में root करता है और अपनी दो derivation extensions जोड़ता है।

[DIP-0009, *Feature Derivation Paths*](https://docs.dash.org/projects/core/en/stable/docs/dips/dip-0009.html) एक **feature** स्तर जोड़ता है, जो key space को coin-विशिष्ट functions के अनुसार विभाजित करता है:

```
m / purpose' / coin_type' / feature' / *
```

जिसमें `purpose` `9'` (0x80000009) पर और `coin_type` `5'` (0x80000005) पर स्थिर हैं। DIP की घोषित प्रेरणा isolation है — *"mixed funds को ऐसे path में रखना वांछनीय हो सकता है जो non-mixed funds से अलग हो।"*

[DIP-0014, *Extended Key Derivation using 256-bit Unsigned Integers*](https://github.com/dashpay/dips/blob/master/dip-0014.md) इससे भी आगे बढ़ता है, BIP 32 की 31-bit index सीमा हटाकर path components को पूरे 256-bit values रखने देता है। इससे identity-derived paths संभव होते हैं, जैसे:

```
m(userA)/9'/5'/15'/0'/(userA's unique id)/(userB's unique id)
```

जहाँ अंतिम दो components user identity hashes हैं। Zcash में इसका कोई समकक्ष नहीं है: ZIP 32 में किसी अन्य पक्ष की identity से key path derive करने की अवधारणा नहीं है।

### दोनों वास्तव में कहाँ भिन्न हैं

**Shielded subtree एक ही है।** Dash की shielded keys Orchard keys हैं, क्योंकि Dash का shielded pool Orchard है। दोनों के बीच जाने वाला wallet developer उसी spending-key-to-viewing-key structure के साथ काम कर रहा है।

**Rooting अलग है।** Zcash प्रत्येक shielded pool को purpose `32'` के अंतर्गत अपनी master key में अलग करता है। Dash shielded feature को purpose `9'` के अंतर्गत, हर दूसरे feature के साथ, एक unified tree पर टाँगता है। Zcash का विभाजन cryptographic pool के अनुसार है; Dash का product feature के अनुसार।

**Dash के key space में कुछ ऐसा है जो Zcash में नहीं है: एक अलग BLS domain।** LLMQs द्वारा उपयोग की जाने वाली masternode operator keys, voting keys और quorum keys BLS keys हैं, Schnorr-family keys नहीं, और ऊपर वर्णित BIP 32 tree से पूरी तरह बाहर रहती हैं। यहीं Dash की मौजूदा threshold signing रहती है — और ठीक इसी कारण यह Orchard spend authorization के साथ compose नहीं होती, जैसा अगला खंड बताता है।

**Identity-linked derivation केवल Dash में है।** DIP-0014 के 256-bit paths identities के बीच संबंधों से keys derive करने के लिए मौजूद हैं। यह Dash Platform की अवधारणा है, जिसका Zcash में कोई समकक्ष नहीं, और यह सबसे स्पष्ट उदाहरण है कि दोनों derivation schemes दुर्घटनावश नहीं बल्कि उद्देश्यपूर्वक अलग हुई हैं।

*साझा Orchard subtree पर अभिसरित होती दोनों rooting schemes के लिए Figure 1 देखें।*

---

## FROST: वास्तविक खुला प्रश्न

Dash के पास **BLS-based LLMQs** (Long-Living Masternode Quorums) में एक परिपक्व threshold-signature system है, जिसका उपयोग ChainLocks, InstantSend और Dash Platform validator consensus के लिए होता है।

[ZIP 312, *FROST for Spend Authorization Multisignatures*](https://zips.z.cash/zip-0312), स्थिति **Draft**, कुछ और करता है। यह Schnorr-आधारित spend authorization signatures को thresholdise करता है, जिन्हें पहले से Sapling और Orchard — क्रमशः **RedJubjub** और **RedPallas** — परिभाषित करते हैं, ताकि ZIP की अपनी व्याख्या में, *"wallet की custody साझा करने वाले उपयोगकर्ता और third-party services, या shared funds प्रबंधित करने वाले लोगों का समूह"* खर्च करने से पहले 2-of-3 जैसे threshold approval की माँग कर सकें। इसे **Wallet** ZIP के रूप में वर्गीकृत किया गया है: यह consensus बदलने के बजाय मौजूदा spend authorization के अनुरूप signatures बनाता है। इसमें Coordinator की भूमिका बनी रहती है, जिसे ZIP हटाने से स्पष्ट रूप से मना करता है, और इसमें trusted-dealer key generation तथा distributed key generation दोनों पर चर्चा है।

महत्त्वपूर्ण अंतर, और कारण कि ये विकल्प नहीं हैं:

| | Dash BLS / LLMQ | Zcash FROST (ZIP 312) |
|---|---|---|
| Signature scheme | BLS | Schnorr — RedJubjub / RedPallas |
| कौन sign करता है | masternodes का एक quorum | व्यक्तिगत keyholders का छोटा समूह |
| क्या authorize होता है | नेटवर्क तथ्य: block lock, transaction lock | एक shielded account से spend |
| Layer | Consensus | Wallet |
| Key space | अलग BLS domain | Orchard/Sapling spend authorization key |
| स्थिति | तैनात | Draft, कोई reference implementation नहीं |

Dash में BLS threshold signatures होने का **अर्थ यह नहीं** कि उसके पास FROST है, या उसकी आवश्यकता है। लेकिन इसका अर्थ यह है कि Dash के engineers को threshold signing, distributed key generation और quorum coordination का आंतरिक अनुभव है — यदि वे इसे बनाना चुनें तो यह वास्तव में हस्तांतरणीय अनुभव है।

*हर scheme वास्तव में किस पर sign करती है, इसके लिए Figure 2 देखें।*

### प्रथम दृष्टि में, Dash के Orchard fork पर FROST के लिए क्या चाहिए होगा

1. **RedPallas पर FROST DKG और signing ceremony**, Orchard की spend authorization scheme — Pallas curve पर Schnorr का एक variant। यह LLMQs के लिए Dash के मौजूदा BLS DKG से अलग है और उसमें सीमित नहीं किया जा सकता।
2. **एक shielded account की multi-party signing के लिए wallet और UX समर्थन**, जो masternode-quorum tooling से अलग interaction pattern है और जिसे Coordinator के समकक्ष की आवश्यकता है।
3. **Layer पर निर्णय।** संभवतः केवल wallet-level, क्योंकि ZIP 312 को consensus change के बजाय मौजूदा primitives पर wallet scheme के रूप में scoped किया गया है — लेकिन इसकी पुष्टि विशेष रूप से Dash के Orchard fork पर होनी चाहिए, Zcash के scope से मान नहीं लेनी चाहिए।

---

## सिफारिश

**Viewing keys — दस्तावेज़ित करें, शोध न करें।** क्षमता दोनों chains पर भेजी जा चुकी है। एक संक्षिप्त wiki note, जिसमें दर्ज हो कि Dash के shielded pool में view keys शामिल हैं और Dash के roadmap का लिंक दिया हो, ZecHub के पाठकों को इसे अब भी काल्पनिक मानने से रोकेगा। दोनों chains के विकसित होने पर wire-format compatibility पर नज़र रखें।

**FROST — वास्तविक अवसर, upstream पर अवरुद्ध।** यह ZIP 312 के reference implementation तक पहुँचने, या Dash के समानांतर इसे बनाने का निर्णय लेने पर निर्भर है। ZecHub इसे सीधे तेज़ नहीं कर सकता।

**सबसे अधिक मूल्य वाला अगला कदम बातचीत है, अधिक desk research नहीं।** जिन लोगों को इसे बनाना होगा, वे पहुँच के भीतर हैं। Shielded Labs ZIP 312 को आगे बढ़ा रहा है; Dash की engineering team पहले ही Orchard integration के आसपास "Zcash से लिया गया" वाली व्याख्या के प्रति सकारात्मक रूप से जुड़ चुकी है। दोनों communities को जोड़ने वाला एक thread, पढ़ने के एक और दौर से अधिक जानकारी सामने लाएगा, और यह संक्षेप उस सीमा तक पहुँच चुका है जिसे सार्वजनिक स्रोत तय कर सकते हैं।

---

## Figures

**Figure 1 — Key derivation rooting: Zcash ZIP 32 और Dash DIP-0009/0014, साझा Orchard subtree पर अभिसरित।**
`assets/Zcash_Dash_Key_Derivation.svg`

**Figure 2 — प्रत्येक threshold scheme किस पर sign करती है: नेटवर्क तथ्य को attest करता masternode quorum, बनाम एक shielded spend को authorize करता keyholder group।**
`assets/FROST_vs_BLS_LLMQ.svg`

---

## स्रोत

**Zcash — protocol**
- [ZIP 32: Shielded Hierarchical Deterministic Wallets](https://zips.z.cash/zip-0032) — स्थिति Final
- [ZIP 224: Orchard Shielded Protocol](https://zips.z.cash/zip-0224)
- [ZIP 312: FROST for Spend Authorization Multisignatures](https://zips.z.cash/zip-0312) — स्थिति Draft
- [ZIP 316: Unified Addresses and Unified Viewing Keys](https://zips.z.cash/zip-0316)
- [The Orchard Book — Keys and addresses](https://zcash.github.io/orchard/design/keys.html)
- [Zcash Protocol Specification](https://zips.z.cash/protocol/protocol.pdf) — key components, §5.6.4

**Dash — protocol और घोषणाएँ**
- [Shielded transactions Dash Evolution mainnet पर लाइव हैं](https://www.dash.org/news/shielded-transactions-are-live-on-the-dash-evolution-mainnet/) — 4 अगस्त 2026
- [Dash Evolution में Shielded Transactions जोड़ रहा है](https://www.dash.org/blog/dash-is-adding-shielded-transactions-to-evolution/) — 19 फरवरी 2026
- [Dash Roadmap](https://www.dash.org/roadmap/) — Shielded Balances, जुलाई 2026 में पूर्ण, Platform v4.0; 12 सितंबर 2026 को अद्यतन
- [DIP-0009: Feature Derivation Paths](https://docs.dash.org/projects/core/en/stable/docs/dips/dip-0009.html)
- [DIP-0014: Extended Key Derivation using 256-bit Unsigned Integers](https://github.com/dashpay/dips/blob/master/dip-0014.md)
- [Dash Core documentation — Masternode Quorums (LLMQ)](https://docs.dash.org/projects/core/en/stable/docs/guide/dash-features-masternode-quorums.html)
- [dashpay/dips repository](https://github.com/dashpay/dips)

**समकालीन रिपोर्टिंग**
- [Dash ने privacy upgrade में Zcash की Orchard technology लॉन्च की](https://www.cryptopolitan.com/dash-launch-zcash-orchard-technology/) — Cryptopolitan
- [Dash ने shielded transactions के लिए Evolution Chain में Zcash Orchard Privacy लाई](https://hackernoon.com/dash-brings-zcash-orchard-privacy-to-evolution-chain-for-shielded-transactions) — HackerNoon

*स्रोतों की जाँच 27 सितंबर 2026 को की गई। Dash Platform और ZIP 312, दोनों विकसित हो रहे हैं; पुनर्प्रकाशन से पहले figures और statuses की पुनः पुष्टि की जानी चाहिए।*
