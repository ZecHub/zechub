<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Wallet_Syncing.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Wallet सिंकिंग

## संक्षेप में

* क्योंकि shielded Zcash लेनदेन अपनी जानकारी छिपाते हैं, एक सर्वर wallet का balance उसी तरह सीधे नहीं देख सकता जैसे वह Bitcoin या Ethereum जैसे transparent coins के लिए कर सकता है।
* Light wallets एक विशेष सर्वर (lightwalletd) से छोटे “compact blocks” डाउनलोड करते हैं और अपनी private keys की मदद से संबंधित डेटा को स्वयं decrypt करते हैं।
* उन blocks को decrypt और process करने में समय लगता है, इसलिए wallets तेज syncing methods का उपयोग करते हैं ताकि आप अपने funds जल्दी इस्तेमाल कर सकें।
* उल्लेखनीय तरीके: Warp Sync (YWallet), Spend-before-sync (Zcash Mobile Wallet SDK V2), Blaze Sync (Zecwallet), और प्रस्तावित DAGSync।
* ये तरीके आम तौर पर तेज synchronization के बदले अतिरिक्त memory या processing power का उपयोग करते हैं।

## मुख्य व्याख्या

### Zcash syncing कैसे काम करती है

Zcash zero-knowledge proofs का उपयोग करता है ताकि लेनदेन का विवरण अनधिकृत पक्षों से shielded रहे। यह privacy light wallets के लिए syncing को अधिक कठिन बना देती है, क्योंकि वे पूरा blockchain लोकली store नहीं करते और आवश्यक जानकारी के लिए सर्वर पर निर्भर रहते हैं। Bitcoin या Ethereum के साथ, सर्वर blockchain को index कर सकते हैं और account data जल्दी लौटा सकते हैं। लेकिन Zcash में सर्वर लेनदेन का विवरण नहीं देख सकता। तो फिर कोई light wallet पूरा blockchain खुद डाउनलोड और decrypt किए बिना अपना balance और history कैसे sync कर सकता है?

Zcash इस समस्या का समाधान कई तरीकों को मिलाकर करता है। इसमें lightwalletd नाम का एक विशेष सर्वर होता है, जो full node से डेटा filter करता है और केवल वही रखता है जो transaction identification के लिए आवश्यक है। इस डेटा को compact blocks कहा जाता है, और यह मूल blocks से काफी छोटा होता है। Light wallets पहले इन compact blocks को lightwalletd सर्वर से डाउनलोड करते हैं और फिर अपनी private keys से उन्हें decrypt करते हैं।

इन compact blocks को decrypt और process करने में भी काफी समय लग सकता है, खासकर तब जब प्रति block बहुत सारे लेनदेन हों। इसलिए wallets synchronization को तेज करने और आपको जल्द से जल्द अपने funds उपयोग करने देने के लिए अलग-अलग तरीकों का इस्तेमाल करते हैं।

## दृश्य उदाहरण / उपमा

Blockchain को एक विशाल डाकघर की तरह समझिए, जो बंद बक्सों से भरा हुआ है। किसी transparent coin में डाकघर का क्लर्क लेबल पढ़ सकता है और तुरंत बता सकता है कि कौन-से बक्से आपके हैं। लेकिन Zcash में लेबल छिपे होते हैं — इसलिए आपका wallet अपनी keys लेकर खुद चुपचाप बक्सों की जांच करता है, ताकि वह पता लगा सके कि कौन-से बक्से वह खोल सकता है। नीचे दिए गए syncing methods उन बक्सों को तेज़ी से जांचने की अलग-अलग रणनीतियाँ हैं।

## गहराई से समझें

### Warp Sync

Warp sync, YWallet की एक feature है जो हर compact block को decrypt और process करने वाले बीच के चरणों को छोड़कर सीधे अंतिम परिणाम तक पहुँचती है।

ऐसा करने के लिए, यह गणित और cryptography का उपयोग करके हर चरण से गुज़रे बिना अंतिम परिणाम की गणना करती है।

Warp sync प्रति सेकंड हजारों blocks process कर सकती है, जो सामान्य synchronization method की तुलना में कहीं तेज है। इसका अर्थ है कि YWallet उपयोगकर्ता, अपने accounts में सैकड़ों हज़ार लेनदेन और प्राप्त notes होने पर भी, तेज और smooth performance का अनुभव कर सकते हैं।

इस step-skipping तकनीक के अलावा, YWallet कई blocks को एक साथ process भी कर सकता है, जिससे उपलब्ध hardware पर load बाँटा जाता है और प्रक्रिया और भी तेज हो जाती है।

[Warp Sync](https://ywallet.app/warp/) के बारे में और पढ़ें

### Spend-before-sync

Spend-before-sync, Zcash Mobile Wallet SDK V2 की एक नई feature है, जो उपयोगकर्ताओं को पूरा wallet synchronization पूरा होने की प्रतीक्षा किए बिना wallet खोलते ही funds खर्च करने की अनुमति देती है। यह feature wallet के spendable balance की खोज को तेज करती है और user experience को बेहतर बनाती है।

Spend-before-sync एक compact-blocks synchronization algorithm का उपयोग करके काम करती है, जो lightwalletd सर्वर से आने वाले blocks को non-linear क्रम में process करती है। इसका मतलब है कि एक block पूरी तरह process होने की प्रतीक्षा करने के बजाय, wallets थोड़ी अधिक memory और processing power का उपयोग करके blockchain के अलग-अलग हिस्सों को scan कर सकते हैं। आम तौर पर, यह अलग-अलग ranges को scan करती है, नए लेनदेन खोजते हुए, जबकि पुराने blocks डाउनलोड और process किए जा रहे होते हैं। यदि कोई हालिया, unspent note मिलती है, तो उसे तुरंत उपलब्ध करा दिया जाएगा।

<a href="">
    <img src="https://github.com/ZecHub/zechub/assets/9355622/363d08df-b7b7-461b-a386-251d9ad702ca" alt="" width="140" height="150"/>
</a>

### Blaze Sync

Zecwallet टीम द्वारा विकसित, Blaze sync light wallets के लिए एक synchronization algorithm है, जो blockchain को उल्टे क्रम में scan करती है — सबसे ऊँचे, सबसे हालिया block से शुरू करके पीछे की ओर बढ़ते हुए।

इससे wallet received notes से पहले spent notes ढूँढ सकता है, और पहले से unspent notes को full synchronization process समाप्त होने की प्रतीक्षा किए बिना उपलब्ध करा सकता है।

इसके अलावा, यह Out-of-Order Sync का उपयोग करती है, जिसमें sync के components को एक-दूसरे से अलग कर दिया जाता है — blocks डाउनलोड करना, trial decryptions करना, और witnesses को update करना — और उन्हें parallel में process किया जाता है। इसमें अधिक memory और CPU resources लगते हैं, लेकिन sync speed X5 तक बढ़ जाती है।

### DAGSync

DAGSync एक प्रस्तावित synchronization algorithm है, जिसका उद्देश्य synchronization को तेज करके Zcash shielded wallets के user experience को बेहतर बनाना है।

यह Zcash wallet में notes, witnesses, और nullifiers के बीच dependencies को दर्शाने के लिए एक [Directed Acyclic Graph (DAG)](https://words.str4d.xyz/dagsync-graph-aware-zcash-wallets/) का उपयोग करती है।

DAG एक data structure है, जो nodes और edges से मिलकर बना होता है, जहाँ हर edge की एक दिशा होती है जो दो nodes के बीच संबंध को दर्शाती है। DAG में cycles नहीं होतीं, यानी किसी node से शुरू करके edges का अनुसरण करते हुए वापस उसी node पर पहुँचना संभव नहीं होता।

<a href="">
    <img src="https://github.com/ZecHub/zechub/assets/9355622/eee7e08d-5c98-4c88-a48e-12f7a92a195f" alt="" width="110" height="230"/>
</a>

## व्यावहारिक प्रभाव

दिलचस्प बात यह है कि ये सभी mechanisms उन प्रश्नों को संबोधित करने का प्रयास करते हैं जिन्हें Zcash Security ने [Scalable Private Messaging](https://zecsec.com/posts/scalable-private-money-needs-scalable-private-messaging/) पर अपनी पोस्ट में उठाया था, और जिनका संबंध private payment systems से है। कुछ तरीके तो इससे भी आगे बढ़ते हैं और servers से सभी memo data डाउनलोड करते हैं, सिवाय उस डेटा के जो किसी address के लिए विशेष रूप से अनन्य हो, जिससे थोड़े अतिरिक्त resources की लागत पर privacy बढ़ती है।

इसके अलावा, Zcash Foundation light wallets की performance बेहतर बनाने के लिए अन्य विकल्पों पर भी विचार कर रही है। ऐसा ही एक उदाहरण [Oblivious Message Retrieval (OMR)](https://zfnd.org/oblivious-message-retrieval/) है, एक construction जिसका foundation अध्ययन कर रही है “यह निर्धारित करने के लिए कि क्या यह उन हालिया performance समस्याओं का संभावित समाधान प्रदान करती है जिनका प्रभाव Zcash wallet उपयोगकर्ताओं पर पड़ा है।”

## सामान्य गलतियाँ

**यह मान लेना कि lightwalletd सर्वर आपके balance को जानता है।** सर्वर केवल compact blocks उपलब्ध कराता है; आपका wallet उन्हें आपकी अपनी keys के साथ लोकली decrypt और interpret करता है।

**सिंक को बहुत जल्दी रोक देना।** कुछ methods हालिया spendable funds को full sync पूरा होने से पहले उपलब्ध करा देते हैं, लेकिन पुरानी history और notes अभी भी process में हो सकती हैं।

**Zcash sync की सीधे transparent-chain sync से तुलना करना।** धीमा रास्ता privacy बनाए रखने की कीमत हो सकता है, कोई कमी नहीं — wallet वह काम कर रहा होता है जो public-coin सर्वर अन्यथा आपका account खुले तौर पर पढ़कर करता।


## संबंधित पृष्ठ

- [Lightwallet Nodes](/zcash-tech/lightwallet-nodes) — वह lightwalletd infrastructure जिस पर light wallets निर्भर करते हैं।
- [Viewing Keys](/zcash-tech/viewing-keys) — वे keys जिनका उपयोग wallets अपनी notes का पता लगाने और उन्हें decrypt करने के लिए करते हैं।
- [Pepper Sync](/zcash-tech/pepper-sync) — Zcash wallet synchronization का एक और तरीका।
- [FROST](/zcash-tech/frost) — shielded ZEC के लिए distributed signing authority।
