---
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/What_a_Block_Explorer_Can_See.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="पेज संपादित करें"/>
</a>

# Zcash पर एक block explorer क्या देख सकता है

## संक्षेप में

- Bitcoin पर, एक block explorer सब कुछ दिखाता है: भेजने वाला, प्राप्त करने वाला, और राशि।
- Zcash पर, यह केवल transparent (t-address) गतिविधि के लिए सही है।
- एक explorer यह देख सकता है कि पैसा shielded pool में प्रवेश कर रहा है और उससे बाहर जा रहा है, लेकिन उसके भीतर क्या हो रहा है यह नहीं।
- पूरी तरह shielded (z to z) लेन-देन में न भेजने वाला दिखाई देता है, न प्राप्त करने वाला, न राशि।
- कोई भी सार्वजनिक "shield rate" आँकड़ा न्यूनतम स्तर ही होता है, क्योंकि पूरी तरह निजी गतिविधि बाहर से दिखाई नहीं देती।

---

## पते के दो प्रकार

Zcash में दो प्रकार के पते होते हैं।

एक **transparent address** `t` से शुरू होता है और Bitcoin address की तरह काम करता है। शेषराशि और भुगतान सार्वजनिक होते हैं।

एक **shielded address** `z` से शुरू होता है और zero-knowledge proofs द्वारा सुरक्षित होता है। नेटवर्क यह पुष्टि कर सकता है कि कोई shielded भुगतान वैध है, बिना भेजने वाले, प्राप्त करने वाले, या राशि को उजागर किए।

क्योंकि पते दो प्रकार के हैं, इसलिए मूल्य चार तरीकों से स्थानांतरित हो सकता है: transparent से transparent (t to t), transparent से shielded (t to z, जिसे shielding कहा जाता है), shielded से transparent (z to t, जिसे deshielding कहा जाता है), और shielded से shielded (z to z, पूरी तरह निजी)।

## एक explorer क्या देख सकता है

एक सार्वजनिक explorer जैसे [Blockchair](https://blockchair.com/zcash) स्पष्ट रूप से यह पढ़ सकता है:

- कोई भी पूरी तरह transparent (t to t) भुगतान, शुरू से अंत तक।
- shielded pool में प्रवेश करता हुआ पैसा (transparent पक्ष और राशि)।
- shielded pool से बाहर आता हुआ पैसा (transparent पक्ष और राशि)।
- प्रत्येक shielded pool में रखी गई कुल ZEC, जो सार्वजनिक होती है ताकि नेटवर्क यह सिद्ध कर सके कि कहीं से भी नए coins नहीं बनाए गए।

संक्षेप में, shielded pool की सीमाएँ दिखाई देती हैं। आप मूल्य को अंदर और बाहर जाते हुए देख सकते हैं।

## एक explorer क्या नहीं देख सकता

एक सार्वजनिक explorer यह नहीं पढ़ सकता:

- पूरी तरह shielded (z to z) लेन-देन। भेजने वाला, प्राप्त करने वाला, और राशि छिपी रहती है।
- किसी भी shielded भुगतान के पीछे का भेजने वाला या प्राप्त करने वाला।
- किसी व्यक्तिगत shielded address की शेषराशि।
- pool के भीतर पहुँचने के बाद धन के साथ क्या होता है।

यदि आप raw data को query करें, तो shielded sender और receiver फ़ील्ड खाली वापस आते हैं। explorer इसे अपनी पसंद से नहीं छिपा रहा है। यह जानकारी कभी भी सार्वजनिक chain पर पढ़ने योग्य रूप में थी ही नहीं। जानकारी एन्क्रिप्टेड होती है, और केवल सही Viewing Key वाला व्यक्ति ही इसे पढ़ सकता है।

## यह क्यों महत्वपूर्ण है

**आपकी गोपनीयता cryptography से आती है, किसी कंपनी पर भरोसा करने से नहीं।** कोई data provider shielded transaction के भीतर नहीं देख सकता, भले ही वह ऐसा करना चाहे।

**सार्वजनिक shield-rate आँकड़े गोपनीयता को कम गिनते हैं।** शोधकर्ता केवल वही माप सकते हैं जो सार्वजनिक सीमा को पार करता है, इसलिए निजी गतिविधि की वास्तविक मात्रा कम से कम उतनी तो होती ही है जितनी वे रिपोर्ट करते हैं, और आमतौर पर उससे अधिक होती है।

**एक बड़ा shielded pool सभी की रक्षा करता है।** जितने अधिक लोग shielded addresses का उपयोग करते हैं, उतनी ही बड़ी भीड़ में कोई एक निजी भुगतान छिप जाता है। shielded address का उपयोग करना आपकी और pool में मौजूद अन्य सभी लोगों की सुरक्षा में मदद करता है।

## इसे व्यवहार में लागू करें

- ऐसा wallet उपयोग करें जो default रूप से shielded addresses का इस्तेमाल करता हो, जैसे [Zodl](https://zodl.com) या [Ywallet](https://ywallet.app/)।
- जब आपको किसी transparent address पर ZEC प्राप्त हो, तो उसे खर्च करने से पहले एक shielded address में स्थानांतरित कर दें।
- जहाँ संभव हो, shielded addresses पर भुगतान करें। हर transparent भुगतान पूरी तरह सार्वजनिक होता है; shielded भुगतान ऐसा नहीं होता।

## संसाधन

- [Zcash: गोपनीयता और सुरक्षा संबंधी सिफारिशें](https://z.cash/support/security/privacy-security-recommendations/)
- [एक shielded ecosystem (Electric Coin Company)](https://electriccoin.co/blog/shielded-ecosystem/)
- [Zcash technology कैसे काम करती है](https://z.cash/technology/)
- [Blockchair Zcash explorer](https://blockchair.com/zcash)

## संबंधित पृष्ठ

- [Zcash की मूल बातें](/start-here/what-is-zec-and-zcash)
- [Wallets](/using-zcash/wallets)
- [Shielded pools](/using-zcash/shielded-pools)
- [ZK-SNARKs](/zcash-tech/zk-snarks)

---

*यदि आप इस wiki page में कुछ जोड़ना चाहते हैं या संपादन सुझाना चाहते हैं, तो कृपया [ZecHub GitHub repo](https://github.com/ZecHub/zechub) पर जाएँ और एक pull request सबमिट करें।*
