<a href="https://github.com/Zechub/zechub/edit/main/site/Using_Zcash/Recovering_Funds.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zcash Wallet फंड रिकवरी

**अपनी private key क्यों सुरक्षित रखनी चाहिए?**

Private keys आपकी डिजिटल संपत्तियों की सुरक्षा का रहस्य हैं। इन्हें सुरक्षित रखना और कभी भी third parties के साथ साझा न करना अत्यंत आवश्यक है।

> इस संदर्भ में एक **Seed Phrase** को private key के समकक्ष माना जा सकता है।

अपनी private keys पर नियंत्रण बनाए रखने से रिकवरी प्रक्रिया हमेशा संभव रहती है। Zcash private keys के 2 प्रकार होते हैं (transparent और shielded), और आप इन्हें आसानी से अपने wallet में import कर सकते हैं, चाहे Sweep Funds फ़ंक्शन का उपयोग करके या इन्हें एक नए account के रूप में import करके। अपनी private keys पर नियंत्रण बनाए रखने से आपकी संपत्तियों पर आपका पूर्ण नियंत्रण बना रहता है, जिससे स्वामित्व, सुरक्षा और मानसिक शांति सुनिश्चित होती है।

# सुरक्षा और ज़िम्मेदारी

यह अत्यंत महत्वपूर्ण है कि उपयोगकर्ता private keys से जुड़े जोखिमों को समझें और इन keys को unauthorized access से सुरक्षित रखें। फंड्स की सुरक्षा इस बात पर निर्भर करती है कि उपयोगकर्ता अपनी private keys की सुरक्षा की ज़िम्मेदारी कितनी अच्छी तरह निभाता है।

> **शुरू करने से पहले:** पहले रिकवरी गाइड्स Ywallet की ओर निर्देशित करती थीं। इसके developer ने पुष्टि की है कि इसे Ironwood (NU6.3) network upgrade के लिए update नहीं किया जाएगा, इसलिए यह अब chain के साथ sync नहीं रह सकता। **Zkool** का उपयोग करें, जो उसी developer द्वारा बनाया गया है और maintained successor है। इस पेज के नीचे [Ywallet अब maintained नहीं है](#ywallet-is-no-longer-maintained) देखें।

## Zkool के साथ फंड रिकवरी

[Zkool](https://github.com/hhanh00/zkool2/releases) उसी developer का Ywallet का successor है, और यह transparent तथा shielded दोनों प्रकार की recovery को support करता है।

यहाँ दो स्थितियाँ शामिल हैं:

1. Seed phrase, private key, या viewing key से **किसी account को restore करना**
2. ऐसे wallet से **funds sweep करना** जिसने केवल transparent addresses को support किया हो

### 1) किसी Account को Restore करना

1. [releases page](https://github.com/hhanh00/zkool2/releases) से Zkool install करें और उसे खोलें
2. **Account Manager** (मुख्य पेज) पर, **New Account** स्क्रीन तक पहुँचने के लिए **+** बटन दबाएँ
3. इस account की पहचान के लिए एक **Account Name** दर्ज करें
4. **Restore Account?** चालू करें। इससे key और birth height फ़ील्ड दिखाई देंगे
5. अपनी key को **Key (Seed Phrase, Private Key, or Viewing Key)** में paste करें। Zkool seed phrase, Sapling secret key, transparent extended key, या viewing key स्वीकार करता है
6. यदि आपको लगभग पता है कि wallet पहली बार कब उपयोग हुआ था, तो एक **Birth Height** दर्ज करें। इससे Zkool को पता चलता है कि scanning कहाँ से शुरू करनी है, जिससे बहुत समय बचता है

![Restore Account और Advanced Options दोनों चालू होने पर Zkool New Account स्क्रीन](/content-images/zkool-restore-account-60b1d2777e.webp)

> **Birth height नहीं है?** इसे खाली छोड़ दें और warning की पुष्टि करें। Zkool chain की शुरुआत से scan करेगा, जो धीमा है लेकिन कुछ भी छूटेगा नहीं। यदि आपके funds अक्टूबर 2018 के Sapling upgrade से पहले के हैं, तो बाद की कोई height अनुमान लगाने के बजाय इसे खाली छोड़ दें, नहीं तो scan आपके transactions को पूरी तरह छोड़ सकता है।

7. Account को save करें, फिर उसे sync करें

### किसी दूसरे wallet से seed restore करना

यदि seed किसी दूसरे wallet से आया है और sync के बाद balance गलत दिखता है, तो आमतौर पर इसका कारण change address derivation होता है।

उसी New Account स्क्रीन में नीचे मौजूद **Advanced Options** switch चालू करें, और save करने से पहले **Use Internal Change** चालू करें।

सभी wallets change addresses को एक ही तरह derive नहीं करते। इस setting के बिना ZODL seed को Zkool में restore करने पर ऐसा balance दिख सकता है जिसमें आपके change notes शामिल न हों, जो funds खो जाने जैसा लगता है लेकिन वास्तव में ऐसा नहीं होता। इस switch के लिए Zkool का tooltip अभी भी Zashi का उल्लेख करता है, क्योंकि ZODL का पुराना नाम वही था।

**Advanced Options** के अंतर्गत दो और fields होते हैं:

- **Extra Passphrase (optional)**, केवल तभी यदि मूल wallet ने इसका उपयोग किया था
- **Account Index**, यदि मूल wallet में एक ही seed पर कई accounts थे। संभव है funds किसी दूसरे index पर हों

> **ये दोनों तभी दिखाई देते हैं जब Key field में एक valid seed phrase हो।** यदि field खाली हो, या उसमें private key या viewing key हो, तो Zkool केवल **Use Internal Change** और **H/W Ledger** दिखाता है। पहले seed paste करें, फिर Advanced Options खोलें।

### 2) केवल Transparent Wallet से Funds Sweep करना

यदि आपके funds ऐसे wallet में हैं जिसने कभी shielded addresses को support नहीं किया (Trust, Coinomi, Guarda और इसी तरह के अन्य), तो पहले account restore करें, फिर funds को shielded pool में ले जाएँ।

1. ऊपर दिए गए चरणों का उपयोग करके account restore करें
2. Account खोलें और **Receive Funds** पेज पर जाएँ
3. ऊपर की bar में magnifying glass दबाएँ (**Find other transparent addresses**)। Ledger और Exodus जैसे wallets, जो addresses को rotate करते हैं, एक seed से कई transparent addresses बनाते हैं, और यह उनमें से funds रखने वाले addresses ढूँढ लेता है
4. **इसके बाद account को reset और sync करें।** जो नए addresses मिलते हैं, उनके balances अगली scan पर ही दिखाई देते हैं, इसलिए यह चरण छोड़ देने पर ऐसा लगेगा कि sweep में कुछ मिला ही नहीं
5. **Send** पेज पर जाएँ। Balance के पास आपको तीन icon buttons मिलेंगे। इन पर text labels नहीं होते, इसलिए इनके नाम देखने के लिए hover करें या long press करें:
   - **Shield One** (outlined shield) एक समय में एक transparent address को move करता है
   - **Shield All** (solid shield) सभी transparent addresses से सब कुछ एक साथ move करता है
   - **Unshield All** (open padlock) उलटी दिशा में काम करता है, यानी transparent address में भेजता है

> **Shield One अधिक private विकल्प है।** कई addresses को एक transaction में shield करने से यह सार्वजनिक रूप से जुड़ जाता है कि वे एक ही व्यक्ति के हैं। Shield All चलाने से पहले Zkool स्वयं भी इसकी warning देता है।

6. Transaction की समीक्षा करें और उसे send करें

Unshield All तब उपयोगी होता है जब आप किसी ऐसे exchange में withdraw कर रहे हों जो केवल transparent addresses स्वीकार करता हो। Shielding buttons तभी दिखाई देते हैं जब account में shielded address हो, और Unshield All तभी जब उसमें transparent address हो।

## Recovered funds और Ironwood pool

28 जुलाई 2026 को Ironwood (NU6.3) upgrade activate होने के बाद से Orchard pool केवल spend-only है। इसमें कोई नई value प्रवेश नहीं कर सकती, और मौजूदा value turnstile के माध्यम से Ironwood में बाहर जाती है।

यदि आपके recovered funds Orchard में हैं, तो सामान्य रूप से काम करने से पहले उन्हें migrate करना होगा। Account menu खोलें और **Note Migration** चुनें। यह विकल्प तभी दिखाई देता है जब वास्तव में migrate करने के लिए कुछ हो।

इस स्क्रीन का शीर्षक **Orchard to Ironwood Migration** है और यह दो phases में चलती है। पहले यह non-standard notes को standard denominations में विभाजित करती है, फिर उन notes को एक-एक करके move करती है। **Migration Speed** एक slider है जो Ultra Fast से Slow तक जाता है और steps के बीच random delay निर्धारित करता है। **Start Migration** इस staged process को background में चलाता है, और आप page बंद करके बाद में फिर से जारी कर सकते हैं। **One Shot** इसे एक ही pass में करता है।

हर step अपनी अलग transaction होती है, इसलिए हर एक पर fee लगती है।

> **Migration amounts सार्वजनिक होती हैं।** जब value turnstile को पार करती है, तो amount और block height chain पर दिखाई देते हैं, भले ही sender और receiver shielded ही रहें। विशिष्ट amounts आपकी पहचान कर सकती हैं, इसलिए one shot के बजाय धीमी गति पर staged migration को प्राथमिकता दें, और पहले अपने connection को Tor या VPN से route करने पर विचार करें ताकि आपके IP address का संबंध moved amount से न जुड़ सके।

## ZExCavator के साथ Deep Recovery

[ZExCavator](https://github.com/zingolabs/zexcavator) Zingo Labs का एक recovery tool है, उन मामलों के लिए जहाँ सामान्य restore काम नहीं करता, जैसे कि damaged या partial wallet file।

> इसका अंतिम update हाल के network upgrades से पहले का है, इसलिए इसे अंतिम उपाय के रूप में ही इस्तेमाल करें और किसी maintained wallet में recovered keys को result पर भरोसा करने से पहले verify कर लें।

## Ywallet अब maintained नहीं है

Ywallet लंबे समय तक इस पेज पर recommended recovery tool था, और कई पुराने guides अब भी उसी की ओर निर्देशित करते हैं।

इसके developer ने पुष्टि की है कि इसे Ironwood के लिए update नहीं किया जाएगा। जो wallet वर्तमान consensus rules को support नहीं करता, वह valid transactions नहीं बना सकता, इसलिए recovered funds को move करने के लिए अब उसका उपयोग नहीं किया जा सकता। उसी developer का **Zkool** maintained successor है और अब यही इस पेज में उपयोग किया गया है।

यदि आपके funds पहले से Ywallet में पड़े हैं, तो ऊपर दिए गए चरणों का उपयोग करके वही seed phrase Zkool में restore करें।

## संबंधित पेज

- [Wallets](/using-zcash/wallets) - कौन से wallets maintained हैं और उनकी Ironwood readiness
- [Ironwood](/zcash-tech/ironwood) - upgrade में क्या बदला और funds migrate क्यों होते हैं
- [Memos](/using-zcash/memos) - encrypted memos कैसे काम करते हैं
- [Viewing Keys](/zcash-tech/viewing-keys) - spending power के बिना read only access
