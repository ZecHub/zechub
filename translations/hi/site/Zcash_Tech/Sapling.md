<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Sapling.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Sapling

> Sapling, Zcash mainnet पर ब्लॉक 419,200 (29 अक्टूबर 2018, 02:15 UTC) पर लाइव हुआ।

आप क्या जानेंगे: Sapling ने निजी Zcash भुगतानों को इतना तेज़ और हल्का बना दिया कि उन्हें फ़ोन या hardware wallet पर चलाया जा सके।

Sapling, Zcash का दूसरा प्रमुख network upgrade था, जो Zcash की दूसरी वर्षगाँठ पर सक्रिय हुआ। यह एक consensus hard fork था जिसने shielded (private) transactions को तैयार करने के तरीके को फिर से बनाया। इसका deployment ZIP 205 में परिभाषित है, नए transaction signature rules ZIP 243 में, और ये दोनों ZIP 200, network upgrade mechanism, पर आधारित हैं। पूरी जानकारी Zcash Protocol Specification में उपलब्ध है। Electric Coin Company ने यह upgrade बनाया और अगस्त 2018 में इसका समर्थन करने वाला पहला संस्करण, zcashd 2.0.0, जारी किया। chain पर, network Sapling नियमों की पहचान उसके consensus branch id से करता है।

यह क्यों महत्वपूर्ण है। Sapling से पहले, वास्तव में निजी भुगतान करने का मतलब था कई मिनट इंतज़ार करना जबकि आपका कंप्यूटर proof बनाने के लिए gigabytes memory का उपयोग करता था। यह ज़्यादातर लोगों के लिए बहुत धीमा और बहुत भारी था, इसलिए बहुत से users, exchanges, और दुकानों ने shielded transactions को छोड़ दिया और ZEC को खुले रूप में भेजा। Sapling ने इस काम को घटाकर कुछ सेकंड और लगभग 40 megabytes memory तक ला दिया। यही एक बदलाव था जिसने shielded ZEC को रोज़मर्रा की ज़िंदगी में, सामान्य फ़ोनों और hardware wallets पर, व्यावहारिक रूप से उपयोग योग्य बना दिया।

## क्या बदला

Sapling का मुख्य भाग zero-knowledge proof को तेज़ी से बनाने का एक तरीका है, जो shielded transaction को निजी रखता है। मूल Sprout डिज़ाइन में एक ही proving circuit (JoinSplit circuit) का उपयोग होता था, जो धीमा था और बहुत memory लेता था। Sapling ने इसे Zcash Protocol Specification में वर्णित दो purpose-built circuits, Spend circuit और Output circuit, से बदल दिया। परिणामस्वरूप लागत में बड़ी कमी आई। Electric Coin Company के अनुसार, एक shielded transaction को लगभग 40 megabytes memory का उपयोग करते हुए केवल कुछ सेकंड में बनाया जा सकता है। Sapling से पहले का Sprout baseline इससे कहीं अधिक भारी था, जो लगभग कई मिनट और कई gigabytes memory के स्तर का था (Sprout पक्ष के ये आँकड़े व्यापक रूप से उद्धृत अनुमानित baseline हैं)।

![Sprout बनाम Sapling shielded transaction लागत](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sapling-before-after.png)

## नई keys

Sapling ने shielded addresses और keys का एक नया सेट भी पेश किया। एक key से कई diversified addresses निकाले जा सकते हैं, जो अलग-अलग payment addresses होते हैं और जिन्हें कोई बाहरी पर्यवेक्षक आपस में जोड़ नहीं सकता। Sapling ने viewing keys भी जोड़ीं: full या incoming viewing key आपको wallet के transaction details देखने की क्षमता साझा करने देती है, बिना funds खर्च करने की क्षमता दिए। यह auditing, accounting, या सिर्फ यह साबित करने के लिए उपयोगी है कि भुगतान किया गया था।

इससे जुड़ा एक और बदलाव यह है कि Sapling ने proof बनाने के काम को transaction पर sign करने के काम से अलग कर दिया। जो device zero-knowledge proof बनाता है, वही device spend authority रखने वाला होना अब आवश्यक नहीं रहा। यही decoupling hardware wallet को आपकी spending key को अलग-थलग सुरक्षित रखने देती है, जबकि कोई दूसरा device अपेक्षाकृत भारी proving work करता है।

![Proving device proof को एक अलग signing device को सौंपता है](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sapling-decoupled-spend.png)

## trusted setup

Sapling के circuits public parameters के एक सेट पर निर्भर करते हैं, जिन्हें बहुत सावधानी से उत्पन्न करना पड़ता था। यदि कोई एक पक्ष इन्हें अकेले बनाता और बचा हुआ secret data ("toxic waste") अपने पास रखता, तो वह forged proofs बना सकता था। इससे बचने के लिए, parameters एक two-phase, multi-party ceremony से आए। Phase 1, जिसे Powers of Tau कहा जाता है, circuit-agnostic था, यानी यह Sapling के specific circuits से बंधा हुआ नहीं था। Phase 2, Sapling MPC, circuit-specific था। प्रत्येक phase तब तक सुरक्षित रहता है जब तक कम से कम एक participant ईमानदार रहा हो और उसने अपना toxic waste नष्ट कर दिया हो, इसलिए ceremony तभी विफल होती है जब हर एक participant मिलीभगत करे।

## यह कैसे सक्रिय हुआ

Sapling, जून 2018 के upgrade Overwinter के बाद आया, जिसने network के upgrade mechanism को तैयार किया था। Electric Coin Company ने अगस्त 2018 में जारी zcashd 2.0.0 में mainnet activation height निर्धारित की, और जब ब्लॉक 419,200 mined हुआ तो network ने Sapling नियमों पर स्विच कर लिया। chain पर, उस क्षण को Sapling consensus branch id द्वारा चिह्नित किया जाता है।

![Zcash लॉन्च से Sapling activation तक की timeline](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sapling-timeline.png)

## शब्दावली

| शब्द | सरल अर्थ |
|---|---|
| Shielded transaction | एक निजी Zcash transaction जो sender, receiver, और amount को छिपाता है। |
| Sprout | मूल shielded protocol जिसके साथ Zcash लॉन्च हुआ था, और जो Sapling की तुलना में धीमा और भारी था। |
| Spend and Output circuits | Sapling के दो नए proving circuits जिन्होंने Sprout के एकल JoinSplit circuit को प्रतिस्थापित किया। |
| Diversified address | कई unlinkable payment addresses में से एक, जिसे आप एक single key से derive कर सकते हैं। |
| Viewing key | ऐसी key जो किसी को wallet के transactions देखने देती है, बिना उससे funds खर्च करने की क्षमता दिए। |
| Consensus branch id | एक छोटा code जो network को बताता है कि कोई transaction किस upgrade के नियमों का पालन करता है। |

## FAQ

क्या Sapling ने मेरे पास मौजूद ZEC की मात्रा बदल दी? नहीं। Sapling ने यह बदला कि shielded transactions कैसे बनते हैं, न कि किसी के पास कितना ZEC है या कुल supply कितनी है। आपका balance अप्रभावित रहा।

क्या Sapling के बाद भी मेरा ZEC निजी है? हाँ, और अब अधिक उपयोगी भी। Sapling ने shielded transactions की मजबूत privacy को बनाए रखा और उन्हें इतना तेज़ और सस्ता बना दिया कि वास्तव में उनका उपयोग किया जा सके। Shielded funds उसी तरह छिपे रहते हैं।

क्या मुझे कुछ करना होगा? नहीं, एक holder के रूप में आपको किसी कार्रवाई की आवश्यकता नहीं है। Sapling एक network upgrade था जिसे wallet और नोड software ने अपनाया। आधुनिक wallets पहले से ही Sapling addresses का समर्थन करते हैं।

Sprout और Sapling में क्या अंतर है? Sprout पहला shielded protocol था और इसमें एक धीमा, memory-heavy proving circuit उपयोग होता था। Sapling ने इसे तेज़ Spend और Output circuits से बदल दिया, viewing keys और diversified addresses जोड़े, और shielded transactions को फ़ोनों और hardware wallets के लिए पर्याप्त हल्का बना दिया।

कुछ स्रोत 28 अक्टूबर और कुछ 29 अक्टूबर क्यों कहते हैं? Activation height पहले से निर्धारित की गई थी ताकि 28 अक्टूबर 2018 को target किया जा सके। जो ब्लॉक वास्तव में बदलाव को सक्रिय करता है, ब्लॉक 419,200, वह 29 अक्टूबर UTC के शुरुआती घंटों में mined हुआ था। कई स्थानीय time zones में तब भी 28 अक्टूबर ही था। दोनों ही स्थिति में यह वही ब्लॉक और वही क्षण है।

viewing key क्या है? Viewing key आपको shielded wallet के लिए read access साझा करने देती है। full या incoming viewing key वाला व्यक्ति wallet के transaction details देख सकता है, लेकिन उसके funds खर्च नहीं कर सकता। अधिक जानकारी के लिए [Viewing Keys](../zcash-tech/viewing-keys) देखें।

## अपनी समझ जाँचें

Sprout के अंतर्गत इतने लोगों ने shielded transactions से परहेज़ क्यों किया, और Sapling ने इसे कैसे ठीक किया?

<details>
<summary>उत्तर</summary>
Sprout के अंतर्गत, shielded transaction बनाने में कई मिनट लगते थे और gigabytes memory लगती थी, इसलिए यह अधिकांश users, exchanges, और दुकानों के लिए बहुत धीमा और भारी था। Sapling ने तेज़ Spend और Output circuits पेश किए, जिन्होंने इस काम को घटाकर कुछ सेकंड और लगभग 40 megabytes तक ला दिया, जिससे shielded transactions रोज़मर्रा के फ़ोनों और hardware wallets पर व्यावहारिक हो गए।
</details>

### संसाधन

- [ZIP 205: Sapling Network Upgrade का Deployment](https://zips.z.cash/zip-0205)
- [ZIP 243: Sapling के लिए Transaction Signature Validation](https://zips.z.cash/zip-0243)
- [Zcash Sapling upgrade पृष्ठ](https://z.cash/upgrade/sapling/)
- [Electric Coin Company: Sapling announcement](https://electriccoin.co/blog/sapling/)
- [Electric Coin Company: Sapling MPC की घोषणा](https://electriccoin.co/blog/sapling-mpc/)

### यह भी देखें

- [Shielded Pools](../using-zcash/shielded-pools)
- [Viewing Keys](../zcash-tech/viewing-keys)
- [zk-SNARKS](../zcash-tech/zk-snarks)
- [Zcash Network Upgrades](../start-here/network-upgrades)
- [Wallets](../using-zcash/wallets)
- [Electric Coin Company](../zcash-organizations/electric-coin-company)

---

Series: [Network Upgrades index](../start-here/network-upgrades) · Previous: [Overwinter](../zcash-tech/overwinter) · Next: [Blossom](../zcash-tech/blossom)
