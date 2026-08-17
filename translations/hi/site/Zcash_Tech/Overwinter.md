<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Overwinter.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Overwinter

> Overwinter, Zcash mainnet पर ब्लॉक 347,500 (26 जून, 2018 UTC) पर लाइव हुआ।

आप क्या समझेंगे: Zcash ने अपने नियमों को सुरक्षित रूप से बदलना कैसे सीखा, और क्यों इसी आधार ने Sapling से शुरू होने वाले हर बाद के upgrade को संभव बनाया।

Overwinter, Zcash का एक [network upgrade](../start-here/network-upgrades) है, और network launch होने के बाद यह पहला upgrade था। इसे कई Zcash Improvement Proposals में परिभाषित किया गया है: [ZIP 200](https://zips.z.cash/zip-0200), [ZIP 201](https://zips.z.cash/zip-0201), [ZIP 202](https://zips.z.cash/zip-0202), [ZIP 203](https://zips.z.cash/zip-0203), और [ZIP 143](https://zips.z.cash/zip-0143)। Overwinter ने कोई नए shielded features नहीं जोड़े। इसके बजाय, इसने protocol को मजबूत किया ताकि भविष्य के upgrades सुरक्षित रूप से जारी किए जा सकें। इस upgrade का दस्तावेज़ीकरण [Electric Coin Company](../zcash-organizations/electric-coin-company) ने आधिकारिक Zcash upgrade page पर किया है।

यह क्यों महत्वपूर्ण है। किसी live blockchain के नियम बदलना जोखिमभरा होता है। अगर यह गलत हो जाए, तो network के दो versions आपस में असहमत हो सकते हैं, या एक chain के लिए की गई transaction दूसरी पर कॉपी की जा सकती है। Overwinter से पहले, Zcash के पास rule change को coordinate करने का कोई standard, replay-safe तरीका नहीं था। Overwinter ने इसे ठीक किया। इसने upgrades के लिए Zcash को एक formal process दिया और, उतना ही महत्वपूर्ण, two-way replay protection भी दिया, ताकि एक नियम-समूह के तहत मान्य transaction को दूसरे के तहत replay न किया जा सके। यही आधार था जिसने Sapling और उसके बाद के हर upgrade को साफ-सुथरे ढंग से activate करना संभव बनाया।

![Overwinter से पहले और बाद: पहले, कोई standard upgrade path नहीं था और replay protection भी नहीं था। बाद में, two-way replay protection और सुरक्षित future upgrades के साथ एक network upgrade mechanism आया](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/overwinter-before-after.png)

## Upgrade mechanism

Overwinter ने Network Upgrade Mechanism पेश किया, जिसे [ZIP 200](https://zips.z.cash/zip-0200) में परिभाषित किया गया है। अब हर upgrade दो चीजें परिभाषित करता है: एक consensus branch id, जो वर्तमान नियम-समूह का नाम बताता है, और एक activation height, यानी वह block जिस पर नए नियम प्रभाव में आते हैं। इससे Zcash software चलाने वाले सभी लोगों को switch से पहले update करने की स्पष्ट समय-सीमा मिलती है।

Overwinter स्वयं mainnet पर block 347,500 पर activate हुआ था।

[ZIP 201](https://zips.z.cash/zip-0201) यह संभालता है कि upgrade के आसपास नोड एक-दूसरे के साथ कैसे व्यवहार करते हैं। Activation से पहले, नोड उन्हीं peers से जुड़ना पसंद करते हैं जो वही version चला रहे हों। Activation के समय, एक नोड उन peers से disconnect हो जाता है जो किसी अलग consensus branch पर हों, ताकि network भ्रमित होने के बजाय नए नियमों के अनुसार साफ़ तौर पर अलग हो जाए।

## Replay protection

Replay तब होता है जब कोई व्यक्ति ऐसी transaction ले लेता है जो एक chain पर valid थी और उसे दूसरी पर फिर से broadcast कर देता है। Overwinter इस रास्ते को एक नई signature scheme के साथ बंद कर देता है, जिसे [ZIP 143](https://zips.z.cash/zip-0143) में परिभाषित किया गया है। जब कोई wallet transaction पर sign करता है, तो signature अब मौजूदा chain के consensus branch id के प्रति commit करती है। एक branch के लिए signed transaction किसी भी दूसरी branch पर, किसी भी दिशा में, valid नहीं होती। यही two-way replay protection का मतलब है।

यह [ZIP 202](https://zips.z.cash/zip-0202) के नए version 3 transaction format के साथ मिलकर काम करता है, जिसे कभी-कभी Overwintered format भी कहा जाता है। यह एक fOverwintered flag और एक version group id जोड़ता है, जो साफ़ बताते हैं कि transaction किस consensus rules के सेट से संबंधित है। एक अतिरिक्त लाभ के रूप में, नई signature scheme ने transparent transactions को validate करने की गति भी बेहतर की।

![Replay protection कैसे काम करता है: एक wallet ऐसी transaction पर sign करता है जो मौजूदा consensus branch id के प्रति commit करती है, इसलिए transaction को किसी दूसरी branch पर replay नहीं किया जा सकता](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/overwinter-replay-flow.png)

## Transaction expiry

[ZIP 203](https://zips.z.cash/zip-0203) ने transaction expiry जोड़ी। अब कोई transaction एक expiration block height सेट कर सकती है। यदि उस height तक वह mined नहीं हुई है, तो नोड उसे mempool से हटा देते हैं, यानी unconfirmed transactions के waiting room से। इससे पहले, कोई transaction लंबे समय तक unconfirmed रह सकती थी। Expiry का मतलब है कि अटकी हुई transaction अंततः अपने-आप साफ़ हो जाती है, जिससे आपके लिए अनिश्चितता कम होती है और mempool पुरानी, unmined transactions से भरने से बचता है।

## यह कहाँ फिट बैठता है

अक्टूबर 2016 के mainnet launch के बाद Overwinter, Zcash का पहला network upgrade था, और इसे जानबूझकर Sapling से पहले जारी किया गया था। इसका काम features देना नहीं, बल्कि infrastructure तैयार करना था। पहले upgrade mechanism और replay-protection machinery को स्थापित करके, इसने बाद के हर upgrade (Sapling, Blossom, Heartwood, Canopy, NU5, और उसके बाद आने वाले upgrades) को activate होने के लिए एक सुरक्षित रास्ता दिया।

![अक्टूबर 2016 के Sprout launch से लेकर, 2016 से 2018 तक बिना upgrade framework वाले दौर, और फिर जून 2018 में Overwinter तक की timeline](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/overwinter-timeline.png)

## शब्दावली

| Term | सरल अर्थ |
|---|---|
| Network upgrade (NU) | Zcash के consensus rules में समन्वित बदलाव, जो एक निश्चित block height पर activate होता है |
| Consensus branch id | एक छोटा identifier जो वर्तमान consensus rules के सेट का नाम बताता है |
| Activation height | वह block जिस पर network upgrade के नए नियम प्रभाव में आते हैं |
| Replay protection | ऐसा नियम जो एक chain पर valid transaction को दूसरी पर दोबारा इस्तेमाल होने से रोकता है |
| Mempool | transactions का वह pool जो broadcast तो हो चुकी हैं लेकिन अभी तक किसी block में mined नहीं हुई हैं |
| Transaction expiry | एक expiration block height जिसके बाद unmined transaction हटा दी जाती है |

## FAQ

क्या Overwinter ने मेरे ZEC या मेरी privacy को बदला? नहीं। Overwinter ने कोई नए features नहीं जोड़े और इसने shielded transactions को नहीं छुआ। यह सुरक्षित future upgrades के लिए आधारभूत plumbing था। आपके funds और privacy अप्रभावित रहे।

क्या Overwinter ने Sapling या shielded addresses जोड़े? नहीं। Overwinter ने कोई shielded features नहीं जोड़े। इसने जमीन तैयार की ताकि Sapling बाद में सुरक्षित रूप से activate हो सके।

Consensus branch id क्या है? यह एक छोटा label है जो वर्तमान rules के सेट का नाम बताता है। Transactions sign होने पर इसके प्रति commit करती हैं, और इसी से Zcash को replay protection मिलती है।

कुछ स्रोत 25 जून और कुछ 26 जून क्यों कहते हैं? Overwinter, 26 जून 2018 को 01:37 UTC पर activate हुआ था। यह UTC में आधी रात के ठीक बाद का समय है, इसलिए कई पश्चिमी time zones में स्थानीय घड़ी अब भी 25 जून दिखा रही थी। यह वही block और वही क्षण है।

Transaction expiry किस काम की है? इसका मतलब है कि जो transaction कभी mined नहीं होती, वह हमेशा के लिए लटकी नहीं रहेगी। अपनी expiry height के बाद, नोड उसे हटा देते हैं, इसलिए आपको अटके हुए payment के बारे में अनुमान लगाते नहीं रहना पड़ता।

क्या मुझे कुछ करने की ज़रूरत है? नहीं। Overwinter 2018 में activate हो चुका था। कोई भी मौजूदा Zcash wallet या नोड पहले से ही इन नियमों का पालन करता है।

## अपनी समझ जांचें

Overwinter ने कोई नए shielded features नहीं जोड़े। तो फिर इसे Zcash के इतिहास के सबसे महत्वपूर्ण upgrades में से एक क्यों माना जाता है?

<details>
<summary>उत्तर</summary>

क्योंकि इसने वह machinery तैयार की जिस पर बाद का हर upgrade निर्भर करता है। Overwinter ने Network Upgrade Mechanism और two-way replay protection पेश किया, जिससे Zcash को अपने consensus rules बदलने का एक standard और सुरक्षित तरीका मिला। इस आधार के बिना, Sapling और उसके बाद के upgrades साफ़-सुथरे ढंग से activate नहीं हो सकते थे।
</details>

### संसाधन

[ZIP 200: Network Upgrade Mechanism](https://zips.z.cash/zip-0200)

[ZIP 201: Overwinter के लिए Network Peer Management](https://zips.z.cash/zip-0201)

[ZIP 202: Overwinter के लिए Version 3 Transaction Format](https://zips.z.cash/zip-0202)

[ZIP 203: Transaction Expiry](https://zips.z.cash/zip-0203)

[ZIP 143: Overwinter के लिए Transaction Signature Validation](https://zips.z.cash/zip-0143)

[Overwinter Network Upgrade](https://z.cash/upgrade/overwinter/)

### यह भी देखें

[Zcash Network Upgrades](../start-here/network-upgrades)

[Shielded Pools](../using-zcash/shielded-pools)

[Full Nodes](../zcash-tech/full-nodes)

[NU6.1](../zcash-tech/nu6-1)

[Electric Coin Company](../zcash-organizations/electric-coin-company)

[ZEC और Zcash क्या हैं](../start-here/what-is-zec-and-zcash)

---

श्रृंखला: [Network Upgrades index](../start-here/network-upgrades) · पिछला: [Sprout](../zcash-tech/sprout) · अगला: [Sapling](../zcash-tech/sapling)
