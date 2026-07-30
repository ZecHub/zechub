<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>
# FROST


## संक्षेप में

* FROST (Flexible Round-Optimised Schnorr Threshold Signatures) एक threshold signature और distributed key generation protocol है: कई signers एक साझा private key का एक share रखते हैं, और एक signature बनाने के लिए उनमें से threshold संख्या को सहयोग करना होता है।
* क्योंकि परिणाम एक single Schnorr signature होता है, इस तरह किया गया transaction नेटवर्क पर एक सामान्य transaction जैसा दिखाई देता है।
* इसमें communication के न्यूनतम rounds की आवश्यकता होती है, यह parallel में चल सकता है, और यह किसी गलत व्यवहार करने वाले participant की पहचान कर उसे बाहर कर सकता है।
* Zcash के लिए, इसका अर्थ है कि FROST कई भौगोलिक रूप से अलग-अलग parties को shielded ZEC की spend authority नियंत्रित करने में सक्षम बनाता है — जो custody, escrow, non-custodial services, और Zcash Shielded Assets (ZSA) के लिए उपयोगी है।
* इसे Chelsea Komlo (University of Waterloo, Zcash Foundation) और Ian Goldberg (University of Waterloo) ने बनाया था।

## मुख्य व्याख्या

### Schnorr signature क्या है?

एक Schnorr digital signature algorithms का एक set है: (KeyGen, Sign, Verify).

Schnorr signatures के कई फायदे हैं। एक मुख्य लाभ यह है कि जब एक ही message पर sign करने के लिए कई keys का उपयोग किया जाता है, तो resulting signatures को मिलाकर एक single signature बनाया जा सकता है। इससे multisig payments और multisig-संबंधित अन्य transactions का आकार काफी कम हो सकता है।

### FROST क्या है?

**Flexible Round-Optimised Schnorr Threshold Signatures** -
*Chelsea Komlo (University of Waterloo, Zcash Foundation) और Ian Goldberg (University of Waterloo) द्वारा निर्मित।*

FROST एक threshold signature और distributed key generation protocol है, जिसे communication के न्यूनतम rounds की आवश्यकता होती है और जिसे parallel में चलाया जा सकता है। FROST protocol, Schnorr signature scheme का एक threshold version है।

Single-party setting में signatures के विपरीत, threshold signatures में threshold संख्या के signers के बीच सहयोग आवश्यक होता है, जहाँ प्रत्येक signer एक साझा private key का एक share रखता है।

[Threshold Signatures क्या हैं? Chelsea Komlo - Zcon3](https://youtu.be/cAfTTfblzoU?t=110)

इसके परिणामस्वरूप, threshold setting में signatures बनाते समय signers के बीच network rounds के कारण अतिरिक्त overhead आता है, जिससे यह महँगा हो जाता है जब secret shares network-limited devices पर संग्रहीत हों या coordination अविश्वसनीय networks पर हो रहा हो।

Signing operations के दौरान network overhead को एक नई technique का उपयोग करके कम किया जाता है, जो forgery attacks से सुरक्षा देती है और अन्य schemes पर भी लागू होती है।

FROST threshold signature protocols को बेहतर बनाता है, क्योंकि यह unlimited संख्या में signature operations को सुरक्षित रूप से parallel (concurrency) में करने की अनुमति देता है।

इसे या तो 2-round protocol के रूप में उपयोग किया जा सकता है, जहाँ signers कुल 2 messages भेजते और प्राप्त करते हैं, या preprocessing stage के साथ एक optimised single-round signing protocol के रूप में।

FROST अपनी efficiency improvements आंशिक रूप से इस प्रकार हासिल करता है कि protocol गलत व्यवहार करने वाले participant की मौजूदगी में abort कर सकता है, जिसके बाद उस participant की पहचान कर उसे भविष्य की operations से बाहर किया जाता है।

यह प्रमाण कि FROST chosen-message attacks के विरुद्ध सुरक्षित है, बशर्ते discrete logarithm problem कठिन हो और adversary threshold से कम participants को नियंत्रित करता हो, [यहाँ](https://eprint.iacr.org/2020/852.pdf#page=16) दिए गए हैं।

### FROST कैसे काम करता है?

FROST protocol में दो महत्वपूर्ण components होते हैं:

पहले, n participants एक distributed key generation (DKG) protocol चलाते हैं ताकि एक common verification key उत्पन्न की जा सके। अंत में, प्रत्येक participant को एक private secret key share और एक public verification key share प्राप्त होता है।

इसके बाद, कोई भी t-out-of-n participants threshold signing protocol चला सकते हैं ताकि मिलकर एक valid Schnorr signature बनाया जा सके।

<a href="">
    <img src="https://static.cryptohopper.com/images/news/uploads/1634081807-frost-flexible-round-optimized-schnorr-threshold-signatures-1.jpg" alt="" width="400" height="300"/>
</a>

## दृश्य / उपमा

FROST को एक safe-deposit box की तरह समझिए जो तभी खुलता है जब कई अधिकृत keyholders अपनी चाबियाँ एक साथ घुमाते हैं — लेकिन हर keyholder का होना ज़रूरी नहीं; केवल एक निश्चित संख्या चाहिए (उदाहरण के लिए, 5 में से कोई भी 3)। एक बार box खुल जाने पर, बाहर से देखने वाला यह नहीं बता सकता कि कौन-कौन से keyholders आए थे, या यहाँ तक कि एक से अधिक लोग शामिल थे। इसी तरह, एक समूह मिलकर Zcash transaction को अधिकृत कर सकता है, जबकि नेटवर्क को केवल एक सामान्य signature दिखाई देती है।

## गहराई से समझें

**Distributed key generation (DKG)**

इस phase का उद्देश्य long-lived secret key shares और एक joint verification key उत्पन्न करना है। यह phase n participants द्वारा चलाया जाता है।

FROST अपना key generation phase Pedersen's DKG (GJKR03) पर बनाता है, जो Shamir's secret sharing और Feldman's verifiable secret sharing schemes दोनों को subroutines के रूप में उपयोग करता है। इसके अतिरिक्त, प्रत्येक participant को अन्य participants को zero-knowledge proof भेजकर अपने secret की जानकारी प्रदर्शित करनी होती है, जो स्वयं एक Schnorr signature होती है। यह अतिरिक्त step t ≥ n/2 होने पर rogue-key attacks से सुरक्षा देता है।

DKG protocol के अंत में, एक joint verification key vk उत्पन्न होती है। प्रत्येक participant Pᵢ के पास एक value (i, skᵢ ) होती है, जो उसका long-lived secret share है, और एक verification key share vkᵢ = skᵢ *G होती है। Participant Pᵢ की verification key share vkᵢ का उपयोग अन्य participants signing phase के दौरान Pᵢ के signature shares की शुद्धता सत्यापित करने के लिए करते हैं, जबकि verification key vk का उपयोग बाहरी parties समूह द्वारा जारी signatures को सत्यापित करने के लिए करते हैं।

**Threshold Signing**

यह phase उन ज्ञात techniques पर आधारित है जो additive secret sharing और share conversion का उपयोग करके प्रत्येक signature के लिए nonce को non-interactively उत्पन्न करती हैं। यह concurrency को सीमित किए बिना ज्ञात forgery attacks से बचने के लिए binding techniques का भी उपयोग करता है।

Preprocessing stage में, प्रत्येक participant बाद में उपयोग के लिए Elliptic Curve (EC) points की pairs की एक निश्चित संख्या तैयार करता है। यह stage कई threshold signing phases में एक बार चलती है।

<a href="">
    <img src="https://i.ibb.co/nQD1c3n/preprocess.png" alt="" width="400" height="300"/>
</a>

Signing Round 1: प्रत्येक participant Pᵢ एक single private nonce pair (dᵢ, eᵢ) और उससे संबंधित EC points की pair (Dᵢ, Eᵢ) उत्पन्न करके शुरू करता है, फिर points की इस pair को अन्य सभी participants को broadcast करता है। प्रत्येक participant बाद में उपयोग के लिए इन EC points की pairs को store करता है। Signing rounds 2 और 3 वास्तविक operations हैं जिनमें t-out-of-n participants मिलकर एक valid Schnorr signature बनाते हैं।

Signing Round 2: Participants मिलकर एक valid Schnorr signature बनाते हैं। इस round के पीछे की मुख्य technique t-out-of-t additive secret sharing है।

यह step forgery attacks को रोकता है क्योंकि attackers अलग-अलग signing operations के बीच signature shares को combine नहीं कर सकते, न ही signers के set या प्रत्येक signer के लिए प्रकाशित points को permute कर सकते हैं।

<a href="">
    <img src="https://i.ibb.co/b5rJbXx/sign.png" alt="" width="400" height="300"/>
</a>

Challenge c की गणना हो जाने के बाद, प्रत्येक participant single-use nonces और long-term secret shares का उपयोग करके response zᵢ की गणना कर सकता है, जो समूह की long-lived key के t-out-of-n (degree t-1) Shamir secret shares होते हैं। Signing round 2 के अंत में, प्रत्येक participant zᵢ को अन्य participants को broadcast करता है।

[पूरा paper पढ़ें](https://eprint.iacr.org/2020/852.pdf)

### व्यापक ecosystem में FROST का उपयोग

**[Coinbase](https://github.com/coinbase/kryptology/tree/master/pkg/dkg/frost) में FROST**

Coinbase के threshold-signing systems की efficiency सुधारने के लिए, उन्होंने FROST का एक version विकसित किया। Coinbase implementation में मूल FROST draft की तुलना में कुछ छोटे बदलाव किए गए हैं।

उन्होंने signature aggregator role का उपयोग न करने का निर्णय लिया। इसके बजाय, प्रत्येक participant एक signature aggregator है। यह design अधिक सुरक्षित है: protocol में सभी participants दूसरों की computations को verify करते हैं, जिससे उच्च स्तर की security मिलती है और risk कम होता है। Implementation को तेज़ करने के लिए one-time preprocessing stage को भी हटा दिया गया, और उसकी जगह तीसरा signing round इस्तेमाल किया गया।

---

**Blockstream द्वारा [ROAST](https://eprint.iacr.org/2022/550.pdf)**

FROST पर एक application-specific improvement Bitcoin के लिए [Blockstream Liquid Sidechain](https://blog.blockstream.com/roast-robust-asynchronous-schnorr-threshold-signatures/) पर उपयोग हेतु प्रस्तावित की गई है।

“ROAST threshold signature schemes जैसे FROST के ऊपर एक सरल wrapper है। यह सुनिश्चित करता है कि honest signers का एक quorum, जैसे Liquid functionaries, disruptive signers की मौजूदगी में भी हमेशा एक valid signature प्राप्त कर सके, भले ही network connections में मनमानी रूप से उच्च latency हो।”

---

**IETF में FROST**

Internet Engineering Task Force, जिसकी स्थापना 1986 में हुई थी, Internet के लिए standards development की प्रमुख organisation है। IETF ऐसे voluntary standards विकसित करता है जिन्हें अक्सर Internet users, network operators, और equipment vendors अपनाते हैं, और इस तरह Internet की दिशा को आकार देने में मदद मिलती है।

FROST version 11 (two-round variant) को [IRTF में submit किया गया है](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/11/). यह Internet भर में, hardware devices में, और आने वाले वर्षों में अन्य services के लिए एक नए threshold signature scheme standard के रूप में FROST के पूर्ण मूल्यांकन की दिशा में एक महत्वपूर्ण कदम है।


## व्यावहारिक निहितार्थ

बिलकुल हाँ। Zcash में FROST के आने से कई parties, जो भौगोलिक रूप से अलग-अलग हों, shielded ZEC की spend authority को नियंत्रित कर सकेंगी। इस signature scheme का उपयोग करके broadcast किए गए transactions नेटवर्क पर अन्य transactions से अलग नहीं दिखेंगे, जिससे payment tracking के विरुद्ध मजबूत resistance बना रहेगा और analysis के लिए उपलब्ध blockchain data की मात्रा सीमित रहेगी।

व्यवहार में, इससे नेटवर्क पर applications की एक विस्तृत श्रृंखला बनाई जा सकेगी, जिनमें escrow providers से लेकर अन्य non-custodial services तक शामिल हैं।

FROST, Zcash Shielded Assets (ZSA) के सुरक्षित issuance और management में भी एक आवश्यक component बन जाएगा, जिससे development orgs और exchanges जैसे ZEC custodians के भीतर spend authority का अधिक सुरक्षित प्रबंधन संभव होगा, और साथ ही यह क्षमता Zcash users को भी मिलेगी।

## आम गलतियाँ

**FROST को पारंपरिक on-chain multisig समझ लेना**। पारंपरिक multisig on-chain कई signers या कई signatures को प्रकट कर सकता है। FROST एक single aggregated Schnorr signature बनाता है, इसलिए transaction एक single-signature transaction से अलग नहीं पहचाना जा सकता।

**यह मान लेना कि threshold से कम लोग sign कर सकते हैं**। केवल threshold संख्या (t-out-of-n) के participants, जो साथ मिलकर कार्य करें, एक valid signature बना सकते हैं; इससे छोटा कोई भी group ऐसा नहीं कर सकता।

**यह मान लेना कि FROST off-chain सब कुछ छिपा देता है**। FROST on-chain signature की रक्षा करता है, लेकिन signers के बीच coordination फिर भी off-chain होता है और उसके लिए अपनी अलग privacy और security controls की आवश्यकता होती है।


## संबंधित पृष्ठ

- [Halo](/zcash-tech/halo) — Zcash के Orchard pool में प्रयुक्त trustless, recursive proof system।
- [Viewing Keys](/zcash-tech/viewing-keys) — shielded transactions के लिए selective disclosure।
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) — जहाँ FROST spend/issuance authority के प्रबंधन में मदद करता है।
- [Zcash Wallet Syncing](/zcash-tech/zcash-wallet-syncing) — Zcash privacy infrastructure का एक और मुख्य हिस्सा।


## आगे सीखें

[Coinbase लेख - Threshold Signatures](https://www.coinbase.com/blog/threshold-digital-signatures)

[Shamir Secret Sharing - व्याख्या और उदाहरण](https://www.geeksforgeeks.org/shamirs-secret-sharing-algorithm-cryptography/)

[Schnorr Digital Signatures पर छोटा वीडियो](https://youtu.be/r9hJiDrtukI?t=19)

___
___
