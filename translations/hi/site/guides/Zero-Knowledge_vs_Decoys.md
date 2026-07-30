<a href="https://github.com/zechub/zechub/edit/main/site/guides/Zero-Knowledge_vs_Decoys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zero Knowledge बनाम Decoy आधारित सिस्टम

"Cryptocurrency आपकी सभी खर्च गतिविधियों को सार्वजनिक कर देता है क्योंकि यह आपके Bank account के लिए Twitter जैसा है, और यह एक बहुत बड़ी समस्या है जिसे on chain privacy अपनाकर हल किया जाना चाहिए।" - Ian Miers at [Devcon4](https://youtube.com/watch?v=9s3EbSKDA3o&feature=share9).

कुछ crypto projects ने अपने privacy-केंद्रित दृष्टिकोणों के कारण पहचान हासिल की है। Zcash transaction amount और addresses की सुरक्षा के लिए Zero Knowledge Proofs (ZK) के उपयोग के लिए प्रसिद्ध है। Monero blockchain पर user privacy प्राप्त करने के लिए अन्य encryption schemes के साथ Decoy-आधारित sender obfuscation के उपयोग के कारण अलग पहचान रखता है।


<a href="">
    <img src="https://user-images.githubusercontent.com/38798812/257773807-af8ae27d-0805-4a60-a5ba-749e2fea2490.png" alt="" width="400" height="300"/>
</a>


## ZK Proofs और Decoy आधारित सिस्टम को समझना

Zero Knowledge Proofs ऐसे cryptographic systems हैं जो एक पक्ष (prover) को दूसरे पक्ष (verifier) के सामने किसी कथन की वैधता को *उस कथन के बारे में कोई भी अंतर्निहित जानकारी उजागर किए बिना* सिद्ध करने की अनुमति देते हैं। Zcash के संदर्भ में, ZK proofs का उपयोग transaction की वैधता को सत्यापित करने के लिए किया जाता है, बिना transaction details जैसे कि SENDER, RECEIVER या transaction AMOUNT को प्रकट किए। 

**यह सुनिश्चित करता है कि user privacy सुरक्षित बनी रहे क्योंकि transaction गोपनीय रहता है, जबकि उसका सत्यापन फिर भी हो जाता है। यह तकनीक Zcash network पर financial transactions की गोपनीयता सुनिश्चित करने के लिए बनाई गई है।**

[RingCT](https://twitter.com/ZecHub/status/1636473585781948416) जैसे Decoy-आधारित systems में, कई transactions को मिलाया जाता है, जिससे funds के वास्तविक source और destination का पता लगाना चुनौतीपूर्ण या कठिन हो जाता है। यह algorithm transactions में decoy inputs और outputs जोड़ता है, साथ ही inputs के रूप में उपयोग किए गए addresses की encryption का उपयोग करता है और transferred amount spendable है यह सत्यापित करने के लिए Range proofs का इस्तेमाल करता है। 

यह दृष्टिकोण transaction trail को धुंधला कर देता है। Decoy inputs का उपयोग blockchain का विश्लेषण करने वाले किसी भी व्यक्ति के लिए वास्तविक sender, receiver, या transaction amount की पहचान करना चुनौतीपूर्ण बना देता है। 

**महत्वपूर्ण नोट**: on-chain privacy-संरक्षित transaction का यह तरीका फिर भी सभी user transactions के (encrypted) inputs को स्पष्ट रूप से उजागर करता है। network पर अलग-अलग users के बीच *FLOW OF TRANSACTIONS* जैसे metadata अब भी एकत्र किए जा सकते हैं। यदि कोई adversary network पर transactions उत्पन्न करने में सक्रिय रूप से भाग लेता है, तो वह प्रभावी रूप से अन्य users के decoy inputs को deanonymise कर देता है। 


## Decoy आधारित सिस्टम की तुलना में ZK के लाभ

Zcash और Monero दोनों privacy-केंद्रित cryptocurrencies हैं, लेकिन वे privacy को अलग-अलग तरीकों से हासिल करते हैं। 

यहाँ Monero के decoy system की तुलना में Zcash के zero-knowledge proofs (ZK) के कुछ लाभ दिए गए हैं:

1) **Selective Disclosure**: Zcash के ZK feature set के साथ, users के पास transaction details को विशिष्ट पक्षों के सामने प्रकट करने का विकल्प होता है [Selective Disclosure पर ECC Blog पढ़ें](https://electriccoin.co/blog/viewing-keys-selective-disclosure/). Zcash में, shielded transactions की encrypted contents व्यक्तियों को किसी विशेष transfer से data को चुनिंदा रूप से प्रकट करने की अनुमति देती हैं। इसके अतिरिक्त, किसी विशेष shielded address से जुड़े सभी transactions को प्रकट करने के लिए एक Viewing Key प्रदान की जा सकती है। यह सुविधा network की समग्र privacy से समझौता किए बिना regulatory compliance और auditability की अनुमति देती है। 

जबकि Monero का decoy algorithm (ring signature) privacy प्रदान करने में मदद करता है, यह उसी तरह *selective* disclosure प्रदान नहीं करता।


<a href="">
    <img src="https://user-images.githubusercontent.com/38798812/257793324-2dcc6047-300e-4fa7-a28d-2e6cbbadf1df.png" alt="" width="400" height="80"/>
</a>


2) **Optional Visibility**: Zcash users को transparent (non-private) और shielded (private) transactions के बीच चुनने की अनुमति देता है। इसका अर्थ है कि Zcash users को यह लचीलापन देता है कि वे अपनी financial information को private (shielded) रखें या अधिकांश अन्य blockchains की तरह उसे transparent और publicly available बनाएँ, जैसा कि [Zcash official website](https://z.cash/learn/what-is-the-difference-between-shielded-and-transparent-zcash/) पर समझाया गया है। यह opt-in privacy अधिक लचीलापन और business/organisational से संबंधित use cases की अनुमति देती है, क्योंकि कुछ transactions को public scrutiny के लिए कम privacy की आवश्यकता हो सकती है, जबकि अन्य को enhanced privacy से लाभ होता है।


3) **Anonymity Set**: zero knowledge shielded pools का [anonymity set](https://blog.wasabiwallet.io/what-is-the-difference-between-an-anonymity-set-and-an-anonymity-score/) उन सभी transactions से मिलकर बना होता है जो *कभी भी* हुई हैं। यह transaction unlinkability प्राप्त करने के लिए उपयोग की जाने वाली अधिकांश अन्य on-chain techniques की तुलना में काफी बड़ा है। नोट: यह केवल उसी shielded pool के भीतर होने वाले transactions पर लागू होता है।

Decoys का उपयोग anonymity set को बढ़ाता तो है। हालांकि, यह दृष्टिकोण पूरी तरह network पर मौजूद *वास्तविक* users की संख्या पर निर्भर करता है। 

4) **No Trusted Setup**: Zcash के Sprout और Sapling setup ने "trusted setup ceremony" के रूप में ज्ञात multi-party computation का उपयोग किया था। हाल का NU5 upgrade zero knowledge circuit के setup की integrity पर किसी Trust की आवश्यकता नहीं रखता था। [NU5 पर ECC Blog पढ़ें](https://electriccoin.co/blog/nu5-activates-on-mainnet-eliminating-trusted-setup-and-launching-a-new-era-for-zcash/).

5) **Data Privacy**: Zcash के shielded pools में उपयोग की जाने वाली [zk-SNARK technology](https://wiki.zechub.xyz/zcash-technology) users के लिए काफी अधिक security प्रदान करती है। on-chain metadata leakage में कमी का मतलब है कि users संभावित hackers या दमनकारी राज्य संस्थाओं जैसे adversaries से सुरक्षित रहते हैं। 

ऐसे कई उदाहरण रहे हैं जहाँ Monero के decoy selection algorithm में bugs की पहचान की गई। [Coindesk](https://coindesk.com/markets/2021/07/27/bug-found-in-decoy-algorithm-for-privacy-coin-monero) की एक report के अनुसार, इन bugs में user spends को उजागर करने की क्षमता थी। 


संक्षेप में, वास्तव में सबसे महत्वपूर्ण बात यह है कि user information और data के leak को कम किया जाए या समाप्त किया जाए, जैसा कि Zooko ने [Orchid (priv8) AMA live session](https://youtube.com/watch?v=XpRzKqEfpP4&feature=share9) में समझाया। 


<a href="">
    <img src="https://user-images.githubusercontent.com/38798812/257788813-509f1139-7daa-4f95-bbb4-c535641962f6.png" alt="" width="400" height="200"/>
</a>


____

***संदर्भ लिंक***

https://z.cash/learn/

https://www.getmonero.org/get-started/what-is-monero/

https://youtu.be/9s3EbSKDA3o

https://electriccoin.co/blog/nu5-activates-on-mainnet-eliminating-trusted-setup-and-launching-a-new-era-for-zcash/

https://youtu.be/XpRzKqEfpP4

https://electriccoin.co/blog/zcash-evolution/

https://electriccoin.co/zcash-metrics/
https://electriccoin.co/blog/viewing-keys-selective-disclosure/
