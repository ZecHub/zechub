<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Shielded_Assets.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>
<a href="">
    <img src="/content-images/image-2023-11-18-160742427-658dda69c0.webp" alt="" width="800" height="500"/>
</a>

# Zcash Shielded Assets

## संक्षेप में

Zcash Shielded Assets (ZSA) एक प्रस्तावित प्रोटोकॉल विस्तार है, जो **ZEC के अलावा** अन्य एसेट्स — stablecoins, governance tokens, या किसी भी custom asset — को Zcash के shielded pool के भीतर रहने की अनुमति देगा, जहाँ प्रेषक, प्राप्तकर्ता और राशि निजी रखी जाएगी।

- **यह क्या है:** ERC-20-शैली के custom assets, लेकिन डिफ़ॉल्ट रूप से shielded।
- **इसे कौन बना रहा है:** [QEDIT](https://qed-it.com/), Zcash Foundation से मिले एक grant के तहत, Electric Coin Company के सहयोग से।
- **इसे कैसे निर्दिष्ट किया गया है:** [ZIP 226](https://zips.z.cash/zip-0226) (transfer और burn) के साथ [ZIP 227](https://zips.z.cash/zip-0227) (issuance)।
- **स्थिति:** अभी mainnet पर live नहीं है। ZSA प्रोटोकॉल को Network Upgrade 7 (NU7) में deploy किए जाने की योजना है।
- **फ़ीस:** हमेशा ZEC में चुकाई जाती है, चाहे कौन-सा asset भेजा जा रहा हो।

---

## मुख्य व्याख्या

Zcash Shielded Assets (ZSA), Zcash प्रोटोकॉल में एक प्रस्तावित सुधार है, जो Zcash chain पर custom assets के निर्माण, transfer और burn को सक्षम करेगा।

यदि आप Ethereum blockchain पर [ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) token standard से परिचित हैं, तो ZSAs का Zcash से वही संबंध है जो ERC-20 tokens का Ethereum से है।

Zcash Shielded Assets, Zcash blockchain पर custom tokens के निर्माण को सक्षम करेंगे, जिससे [ZEC](/guides/using-zec-privately) के अलावा अन्य tokens भी Zcash blockchain पर shielded transactions की anonymity और privacy का लाभ उठा सकेंगे।

ZSAs का एक बड़ा संभावित उपयोग Zcash प्रोटोकॉल पर stablecoins जारी करना होगा। Stablecoins वे cryptocurrencies हैं जिनका मूल्य किसी fiat currency, जैसे US Dollar या Euro, से जुड़ा होता है। वर्तमान में, सबसे व्यापक रूप से प्रचलित stablecoins में से कुछ ERC-20 tokens हैं, जैसे [USDC](https://www.circle.com/en/usdc) और [Dai](https://docs.makerdao.com/)।

ZSAs का एक और संभावित उपयोग governance tokens जारी करने में होगा। उदाहरण के लिए, Zechub (इस wiki का प्रकाशक) एक Decentralized Autonomous Organization (DAO) है और अपने सदस्यों को प्रस्तावों तथा governance निर्णयों पर मतदान के लिए एक ZSA बना और जारी कर सकता है।

ZSAs को [QEDIT](https://qed-it.com/) द्वारा विकसित किया जा रहा है, [Zcash Foundation](/zcash-organizations/zcash-foundation) से मिले एक बड़े grant के तहत, [Electric Coin Company](/zcash-organizations/electric-coin-company) के सहयोग से। चूँकि इस परियोजना पर अभी सक्रिय रूप से काम चल रहा है, इसलिए अपडेट्स Zcash forum के [इस thread](https://forum.zcashcommunity.com/t/grant-update-zcash-shielded-assets-monthly-updates/41153) पर पोस्ट किए जाते हैं। QEDIT द्वारा किया गया [ZSA grant application](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/33106640/) Zcash Foundation grants website पर उपलब्ध है।

---

## दृश्य उदाहरण / उपमा

### सीलबंद लिफ़ाफ़ा

कल्पना कीजिए कि एक Zcash shielded transaction एक साधारण, सीलबंद लिफ़ाफ़े की तरह है जिसे किसी सार्वजनिक डाकपेटी में डाल दिया गया हो। हर कोई देख सकता है कि एक लिफ़ाफ़ा पोस्ट किया गया है। लेकिन कोई यह नहीं देख सकता कि उसे किसने भेजा, कौन उसे लेता है, या उसके अंदर क्या है — और हर लिफ़ाफ़ा दूसरे हर लिफ़ाफ़े जैसा ही दिखता है।

आज, Zcash नेटवर्क पर एक लिफ़ाफ़ा केवल एक ही चीज़ ले जा सकता है: ZEC।

ZSA लिफ़ाफ़े को नहीं बदलता। यह **उसके भीतर क्या रखने की अनुमति है** उसे बदलता है। ZSA के बाद, वही सीलबंद लिफ़ाफ़ा एक stablecoin, एक DAO governance token, या किसी कंपनी का loyalty point ले जा सकता है — और बाहर से वह फिर भी नेटवर्क के हर दूसरे लिफ़ाफ़े जैसा ही दिखेगा।

एक बात विशेष रूप से याद रखने योग्य है: **डाक-शुल्क हमेशा ZEC में चुकाया जाता है**, चाहे लिफ़ाफ़े के भीतर कुछ भी हो।

### बाहरी पर्यवेक्षक क्या देख सकता है

| एक पर्यवेक्षक देख सकता है... | Ethereum पर ERC-20 | Zcash पर ZSA |
| --- | --- | --- |
| किसने भेजा | सार्वजनिक | Shielded |
| किसने प्राप्त किया | सार्वजनिक | Shielded |
| कितनी राशि भेजी गई | सार्वजनिक | Shielded |
| व्यक्तिगत balances | सार्वजनिक | Shielded |
| asset की कुल supply | सार्वजनिक | **सार्वजनिक — जानबूझकर** |
| फ़ीस किस currency में चुकाई जाती है | ETH | ZEC |

### supply वाली पंक्ति कोई bug क्यों नहीं है

तालिका की अंतिम दो पंक्तियाँ वही जगह हैं जहाँ ZSA रोचक बनता है।

ZIP 227 जानबूझकर **issuance को transparent** रखता है, ताकि हर asset की circulating supply को on-chain ट्रैक किया जा सके। व्यक्तिगत holdings और व्यक्तिगत payments निजी रहते हैं; अस्तित्व में मौजूद tokens की कुल संख्या निजी नहीं रहती।

किसी stablecoin issuer के लिए, यह संयोजन समझौता नहीं बल्कि उद्देश्य है। reserves का audit सार्वजनिक रूप से सत्यापित की जा सकने वाली supply के विरुद्ध किया जा सकता है, जबकि वास्तव में token का उपयोग करने वाले लोग अपने balances और payments को निजी रख सकते हैं।

### एक asset, एक पहचान

हर asset को एक अद्वितीय **Asset Identifier** मिलता है, जो issuer की issuance key और asset के text description से मिलकर निकाला जाता है। दो अलग-अलग issuers एक ही identifier नहीं बना सकते, और किसी asset को mint करना या बदलना उसके issuer से cryptographic authorization की माँग करता है। लिफ़ाफ़े की उपमा में: कोई भी लिफ़ाफ़ा पोस्ट कर सकता है, लेकिन किसी दिए गए asset का मालिक mint ही उसका और उत्पादन कर सकता है।

---

## गहराई से समझें

### Zebra पर ZSA Demo

[![Video Thumbnail](/content-images/hqdefault-3ae84de424.webp)](https://youtu.be/1MZMGC9ViyA)

**डेमो स्वयं चलाकर देखें!**

zcash-tx-tool repository को clone करें: <https://github.com/QED-it/zcash_tx_tool>

### Zcash Improvement Proposals (ZIPs)

- [ZIP 226](https://zips.z.cash/zip-0226): Zcash Shielded Assets का Transfer और Burn
- [ZIP 227](https://zips.z.cash/zip-0227): Zcash Shielded Assets का Issuance
- [ZIP 230](https://zips.z.cash/zip-0230): Version 6 Transaction Format

> **ZIP 230 पर टिप्पणी:** बाद में ZIP 230 वापस ले लिया गया है और इसे deploy नहीं किया जाएगा। Transaction version 6 अब [ZIP 229](https://zips.z.cash/zip-0229) द्वारा परिभाषित है। सूचना के लिए [ZIP 230](https://zips.z.cash/zip-0230) पेज के शीर्ष पर दिया गया notice देखें।

ZIP 226 OrchardZSA प्रोटोकॉल को परिभाषित करता है — Orchard प्रोटोकॉल का एक विस्तार, जो custom assets के transfer और burn को वहन करता है। ZIP 227 यह परिभाषित करता है कि इन assets को मूल रूप से कैसे बनाया जाता है, और इसे केवल ZIP 226 के साथ ही लागू किया जाना चाहिए।

### ZSA Grant Proposal

Shielded Assets (ZSA/UDA) के लिए ZSA प्रस्ताव [QEDIT](https://qed-it.com/) टीम द्वारा Zcash blockchain पर generic shielded assets बनाने के लिए प्रस्तुत किया गया था। इन्हें आमतौर पर User Defined Assets (UDA) या Zcash Shielded Assets (ZSA) कहा जाता है।

इस प्रस्ताव के साथ, [QEDIT](https://qed-it.com/) की टीम Zcash ecosystem में DeFi लाने की योजना बना रही है और साथ ही मौजूदा DeFi ecosystem के भीतर सर्वोत्तम privacy technology के उपयोग को सक्षम करना चाहती है। एक poll survey में टीम ने पूछा, और समुदाय ने उत्तर दिया कि [generic shielded assets (ZSA/UDA) इस समय सबसे अधिक माँगी जाने वाली सुविधा है](https://twitter.com/BenarrochDaniel/status/1428327864034791429)।

ये प्रस्ताव तकनीकी रूप से [Zcash Improvement Proposal (ZIP)](https://zips.z.cash/zip-0000) specification का पालन करते हैं और ZIP 226 तथा ZIP 227 में परिभाषित हैं।

1. [ZIP 226](https://zips.z.cash/zip-0226): Zcash Shielded Assets का Transfer और Burn
2. [ZIP 227](https://zips.z.cash/zip-0227): Zcash Shielded Assets का Issuance

---

## व्यावहारिक प्रभाव

**यदि आप ZEC रखते हैं या उसका उपयोग करते हैं**

- ZSAs को Orchard ("OrchardZSA") के एक extension के रूप में परिभाषित किया गया है, इसलिए वे उसी shielded machinery को साझा करेंगे जिसका उपयोग ZEC पहले से करता है। आपके wallet को ZSA रखने या भेजने से पहले स्पष्ट ZSA support की आवश्यकता होगी।
- आपके पास हमेशा कुछ ZEC होना आवश्यक होगा। ZSA जारी करने और transfer करने की फ़ीस ZEC में चुकाई जाती है, स्वयं asset में नहीं।
- आपके मौजूदा ZEC transactions में कुछ भी नहीं बदलेगा।

**यदि आप एक संभावित issuer हैं — एक stablecoin, एक DAO, एक company**

- किसी asset को जारी करने के लिए issuance key से जुड़ा cryptographic authorization आवश्यक है, इसलिए केवल आप ही अपने asset को mint कर सकते हैं या उसकी विशेषताओं में परिवर्तन कर सकते हैं।
- आपके asset की circulating supply सार्वजनिक रूप से auditable होती है, जबकि आपके users के balances और transfers नहीं। एक regulated issuer के लिए, आमतौर पर यही सटीक संयोजन आवश्यक होता है।
- एक ही issuance transaction एक साथ एक से अधिक asset बना सकता है।

**ecosystem के लिए**

- क्योंकि हर ZSA fee का निर्धारण ZEC में होता है, इसलिए Zcash पर भविष्य में जारी किसी भी asset में होने वाली activity स्वयं ZEC की माँग पैदा करती है।

---

## आम गलतफ़हमियाँ

| आम धारणा | वास्तव में क्या स्थिति है |
| --- | --- |
| "ZSAs आज Zcash पर live हैं।" | नहीं हैं। ZSA को Network Upgrade 7 (NU7) में deploy किए जाने की योजना है और यह अभी भी review और testing के अधीन है। |
| "ZSA, Zcash में smart contracts लाता है।" | ZSA assets के issuance, transfer और burn को निर्दिष्ट करता है। यह सामान्य-उद्देश्य programmable contract layer नहीं है। |
| "आप ZSA fees को उसी ZSA token में चुका सकते हैं।" | फ़ीस ZEC में चुकाई जाती है। |
| "यदि यह shielded है, तो token supply भी गुप्त होनी चाहिए।" | ZIP 227 जानबूझकर issuance को transparent बनाता है, ताकि हर asset की supply को सार्वजनिक रूप से ट्रैक किया जा सके। Balances और transfers निजी रहते हैं; supply नहीं। |
| "ZIP 230 वर्तमान version 6 transaction format है।" | ZIP 230 वापस ले लिया गया है। Version 6 अब ZIP 229 द्वारा परिभाषित है। |

---

## संबंधित पृष्ठ

- [Halo](/zcash-tech/halo) — Orchard के पीछे का proving system, वही प्रोटोकॉल जिसका विस्तार ZSA करता है
- [Zk-SNARKs](/zcash-tech/zk-snarks) — वे zero-knowledge proofs जो किसी shielded transfer को उजागर किए बिना सत्यापित करने देते हैं
- [Shielded Pools](/using-zcash/shielded-pools) — जहाँ ZSAs, ZEC के साथ मौजूद होंगे
- [Transactions](/using-zcash/transactions) — एक Zcash transaction कैसे तैयार किया जाता है
- [Zebra Full Node](/zcash-tech/zebra-full-node) — ऊपर दिए गए ZSA demo में प्रयुक्त नोड कार्यान्वयन
