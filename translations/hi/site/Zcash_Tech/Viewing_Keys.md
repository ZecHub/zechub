<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Viewing Keys

Shielded पते आपको Zcash blockchain पर यथासंभव कम जानकारी प्रकट करते हुए लेनदेन करने देते हैं। तो फिर क्या होता है जब आपको *वास्तव में* किसी विशेष पक्ष को यह दिखाना हो कि आपके पास क्या है, या आपने क्या भेजा? हर shielded पते के पास एक viewing key होती है जो पढ़ने की अनुमति देती है, लेकिन खर्च करने की क्षमता नहीं देती। Viewing keys को [ZIP 310](https://zips.z.cash/zip-0310) में पेश किया गया था और Sapling network upgrade में protocol में जोड़ा गया था।

एक viewing key चयनात्मक प्रकटीकरण का साधन है: आप तय करते हैं कि कौन क्या देखे, और ऐसा करने के लिए आप कभी भी spend authority नहीं सौंपते।

## Viewing key का उपयोग क्यों करें?

इस विषय पर Electric Coin Company की लिखाई उन स्थितियों को बताती है जो सबसे अधिक सामने आती हैं, और आज भी वही सबसे सामान्य हैं:

- **एक exchange जो deposits पर नज़र रख रहा हो।** Exchange एक incoming viewing key को internet-facing detection नोड पर लोड करता है ताकि वह shielded पते पर ग्राहक के deposits को देख सके, जबकि spending key उस hardware पर रहती है जो कभी network को touch नहीं करता।
- **एक custodian जो अपनी holdings साबित कर रहा हो।** Custodian हर shielded पते के लिए auditor को एक full viewing key देता है। Auditor उन balances की जांच कर सकता है और उन पतों से आने-जाने वाली पिछली गतिविधि की समीक्षा कर सकता है, और इसके अलावा कुछ नहीं कर सकता।
- **एक counterparty पर due diligence।** जहाँ किसी exchange को enhanced due diligence के हिस्से के रूप में ग्राहक के shielded इतिहास की समीक्षा करनी हो, वहाँ वह funds के बजाय viewing key मांग सकता है।

## Viewing key क्या दिखाती है और क्या नहीं दिखाती

एक से अधिक प्रकार की keys होती हैं, और अंतर यह तय करता है कि आप कितनी जानकारी उजागर करते हैं।

| Key | Prefix | Grants |
|---|---|---|
| Unified full viewing key (UFVK) | `uview…` | खाते के हर pool के लिए आने वाले **और** जाने वाले transactions देखती है |
| Unified incoming viewing key (UIVK) | `uivk…` | खाते के हर pool के लिए केवल incoming transactions देखती है |
| Sapling extended full viewing key | `zxviews…` | key के पतों के लिए आने वाली और जाने वाली Sapling activity देखती है |

इनमें से कोई भी खर्च नहीं कर सकती। ये सभी उस मायने में स्थायी हैं जो महत्वपूर्ण है: एक key जिसे आप दे चुके हैं, उसे वापस नहीं लिया जा सकता; केवल funds को ऐसे खाते में स्थानांतरित करके उससे आगे बढ़ा जा सकता है जिसकी keys दूसरे पक्ष के पास न हों।

कुछ भी साझा करने से पहले दो disclosure traps जानने लायक हैं।

**Incoming का मतलब सीमित नहीं होता।** एक unified incoming viewing key पूरे खाते पर लागू होती है, सिर्फ उस एक पते पर नहीं जिसके बारे में आपसे पूछा गया था। एक single Sapling पते के लिए UIVK export करने पर भी उस खाते के हर pool में incoming visibility मिल जाती है, इसलिए यह अपने नाम वाले पते से अधिक जानकारी उजागर करती है। [Zallet Book](https://zcash.github.io/zallet/zcashd/json_rpc.html) यह बात स्पष्ट रूप से कहती है।

**एक प्रकाशित पता भविष्य के adversary के लिए पहले से ही अपनी incoming viewing key उजागर करता है।** [ZIP 326](https://zips.z.cash/zip-0326) कहता है कि quantum computer वाला adversary एक published diversified address से incoming viewing key recover कर सकता है, और यह उस nullifier key को recover करने की तुलना में अधिक संभव है। आज किसी पते को publish करना viewing key को publish करने के समान नहीं है, लेकिन पर्याप्त लंबे समय में दोनों एक-दूसरे के काफ़ी करीब आ जाते हैं।

## Ironwood के बाद Viewing keys

NU6.3 ने Ironwood shielded pool पेश किया और Orchard pool को केवल spend-only बना दिया, इसलिए समय के साथ funds एक से दूसरे में migrate होते हैं। स्वयं upgrade के लिए [Ironwood](/zcash-tech/ironwood) और [The turnstile](/zcash-tech/the-turnstile) देखें।

**Ironwood से पहले जारी की गई viewing key migration के बाद भी काम करती रहती है।** ZIP 326 निर्दिष्ट करता है कि एक receiver, और उसकी संबंधित incoming viewing key, किसी pool के बजाय Orchard *protocol* पर लागू होती है: वही incoming viewing key Orchard-pool और Ironwood-pool दोनों के note ciphertexts को trial-decrypt करती है। Zallet इसे इसी तरह लागू करता है, जहाँ Ironwood notes को Orchard-जैसा बताया गया है और उन्हें खाते की Orchard viewing keys से Ironwood note-encryption domain के अंतर्गत trial-decrypt किया जाता है।

किसी भी व्यक्ति के लिए जो key रखता है या जारी करता है, इसके तीन परिणाम हैं:

1. **Balances pools के बीच स्थानांतरित होती हैं, और viewer इसे होते हुए देखता है।** [ZIP 318](https://zips.z.cash/zip-0318) migration को छोटे, जानबूझकर एकरूप Orchard-to-Ironwood transactions की एक श्रृंखला के रूप में निर्दिष्ट करता है, जिन्हें randomised schedule पर broadcast किया जाता है; हर transaction एक Orchard note खर्च करती है और canonical denomination का एक Ironwood output बनाती है। Viewing key से देख रहा auditor holdings को एक ही बार में नहीं, बल्कि हफ्तों में चरणबद्ध तरीके से एक pool से दूसरे में जाते हुए देखता है। एक wallet अपनी viewing keys का उपयोग करके chain data से अपनी migration progress फिर से बना सकता है।
2. **Migration का हर चरण उस value को प्रकट करता है जिसे वह स्थानांतरित करता है।** यह turnstile पार करने की स्वाभाविक विशेषता है, और यही migration को auditable बनाती है। Balance को canonical denominations में बाँटने का मतलब है कि कोई एक transaction पूरा Orchard-pool balance प्रकट नहीं करती।
3. **Ironwood के बाद बनाए गए खाते अपनी keys अलग तरीके से derive कर सकते हैं।** [ZIP 2005](https://zips.z.cash/zip-2005) quantum-recoverable keys के लिए `use_qsk` flag जोड़ता है, और यह incoming, outgoing और diversifier keys के derivation का तरीका बदल देता है, इसलिए `use_qsk = true` keys वास्तव में अलग keys होती हैं। ZIP 326 यह अनिवार्य करता है कि यह flag पूरे खाते में एकरूप हो और Mainnet पर NU6.3 activate होने से पहले `use_qsk = true` keys generate करने पर रोक लगाता है। इसलिए Ironwood से पहले मौजूद किसी खाते से export की गई key एक `use_qsk = false` key होती है, और उस खाते के लिए सही बनी रहती है। यह मानकर न चलें कि एक खाते से export की गई key किसी दूसरे खाते का वर्णन करती है।

## Viewing key export करना

### Zallet

[Zallet](https://github.com/zcash/zallet) वह full-node wallet है जिसने zcashd के अंदर वाले wallet की जगह ली। Viewing-key export और import **v0.1.0-beta.2 (28 July 2026)** में आए, इसलिए पहले अपना version जांच लें; इससे पहले के builds में ये methods नहीं हैं। Method name के बाद दिया गया हर argument वैध JSON होना चाहिए, जिसका मतलब है कि string values अपने double quotes बनाए रखती हैं। [Zallet Quick Reference Guide](/using-zcash/zallet-quick-reference-guide) सामान्य command शैली को कवर करती है।

सूची देखें कि wallet में क्या है:

```bash
zallet rpc listaddresses
```

एक unified address पास करके खाते की unified full viewing key export करें:

```bash
zallet rpc z_exportviewingkey '"<unified address>"'
```

वैकल्पिक `ivk` argument का उपयोग करके खाते की unified incoming viewing key export करें:

```bash
zallet rpc z_exportviewingkey '"<unified address>"' true
```

Sapling पता देने पर उस खाते की Sapling extended full viewing key (`zxviews…`) लौटती है, जो पुराने zcashd व्यवहार से मेल खाती है। दो documented सीमाएँ हैं: Sprout पते अस्वीकार कर दिए जाते हैं, और Sapling extended full viewing key ऐसे खाते से export नहीं की जा सकती जिसे स्वयं view-only के रूप में import किया गया हो, क्योंकि wallet उसे reconstruct नहीं कर सकता। `ivk` form imported view-only accounts के लिए काम करती है।

### Wallets जो अपने interface से viewing keys export करते हैं

[Wallets](/using-zcash/wallets) पेज हर wallet के लिए viewing-key support और Ironwood readiness को track करता है। लेखन के समय, जिन wallets में viewing-key support और **Ironwood: Ready** दोनों सूचीबद्ध हैं, उनमें ZODL, Zingo!, Zkool, Cake, Zallet, Zecd और Nozy शामिल हैं। किसी एक wallet पर निर्भर होने से पहले इस पेज को देखें, क्योंकि readiness बदलती रहती है।

## Watch-only account के रूप में viewing key import करना

### Zkool

[Zkool](https://github.com/hhanh00/zkool2) यहाँ सबसे लचीला विकल्प है, क्योंकि यह unified keys के साथ-साथ legacy keys भी स्वीकार करता है। इसका README **unified viewing key** या **Sapling extended viewing key** से बनाए गए view-only accounts को document करता है, साथ ही zcashd से export की गई legacy shielded extended keys को भी। एक नया account जोड़ें, view-only route चुनें, और `uview…` या `zxviews…` key paste करें; इसके बाद account sync हो जाता है और बिना spend authority के balances और history दिखाता है।

Ironwood protocol support और Orchard-to-Ironwood migration Zkool 6.24.0 (20 July 2026) में आए, और 6.26.1 (2 August 2026) ने mempool में Ironwood transaction detection को ठीक किया। 6.26.1 या उसके बाद का version चलाएँ।

### Zallet

```bash
zallet rpc z_importviewingkey '"<zxviews… key>"' '"whenkeyisnew"' 0
```

दूसरा argument rescan policy है: `"whenkeyisnew"` (default), `"yes"` या `"no"`। तीसरा वह block height है जहाँ से rescan करना है। Zallet key को view-only account के रूप में import करता है और बिना spending authority के उसके पतों के incoming और outgoing transactions को track करता है।

**Zallet केवल Sapling extended full viewing keys import करता है।** यह `uview…` unified full viewing key import नहीं करेगा, भले ही वह ऐसी key export कर सकता हो। पूरे unified account के लिए read access सौंपने के लिए, Zallet से UFVK export करें और उसे ऐसे wallet में import करें जो unified keys स्वीकार करता हो, जैसे Zkool।

## क्या बदला, और अब क्या ढूँढना बंद करें

यदि आपने इस पेज का कोई पुराना version, या उसका अनुवाद, follow किया था, तो अब तीन तरीके काम नहीं करते।

- **`zcash-cli z_exportviewingkey` और `z_importviewingkey`।** zcashd ने 18 July 2026 को end-of-support halt प्राप्त किया और अब नहीं चलता। Zallet के समान नाम वाले methods इसका replacement हैं; [migration guide](/guides/migration-guide-zcashd-to-zebrad-zallet) देखें।
- **Ywallet walkthrough।** Wallets पेज Ywallet को **Ironwood: Not Ready** के रूप में चिह्नित करता है, इसलिए Ironwood-era viewing keys के लिए लोगों को उसी wallet की ओर निर्देशित नहीं करना चाहिए। उसी developer का Zkool वही range की keys स्वीकार करता है और Ready चिह्नित है।
- **zcashblockexplorer.com/vk।** यह service अमान्य certificate के साथ HTTP 503 लौटाती है, और इसे replace करने के बजाय हटा दिया गया है। किसी website में viewing key paste करने का मतलब है कि आप अपना पूरा transaction history उस व्यक्ति को सौंप देते हैं जो वह website चलाता है, और पुराने पेज पर यह हमेशा तीनों विकल्पों में सबसे कमजोर था। इसके बजाय key को ऐसे wallet में import करें जिसे आप स्वयं चलाते हों।

## संसाधन

Viewing keys का उपयोग आवश्यकता के अनुसार करें, और उस सबसे सीमित key को प्राथमिकता दें जो पूछे गए प्रश्न का उत्तर देती हो।

- [ZIP 326: NU6.3 Consequences for Wallets](https://zips.z.cash/zip-0326) — Orchard और Ironwood pools के बीच viewing keys कैसे व्यवहार करती हैं
- [ZIP 229: Version 6 Transaction Format](https://zips.z.cash/zip-0229) — Orchard और Ironwood pools को परिभाषित करता है
- [Zallet changelog](https://github.com/zcash/zallet/blob/main/CHANGELOG.md) — किस release में कौन-सा RPC method जोड़ा गया
- [Zkool README](https://github.com/hhanh00/zkool2/blob/main/README.md) — समर्थित account और key प्रकार
- [ECC, Explaining Viewing Keys](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, Selective Disclosure and Viewing Keys](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Zcash Viewing Key Video Presentation](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
