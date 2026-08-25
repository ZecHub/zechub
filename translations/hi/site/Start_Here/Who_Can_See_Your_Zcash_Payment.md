<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Who_Can_See_Your_Zcash_Payment.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# आपका Zcash भुगतान कौन देख सकता है?

## संक्षेप में

- Zcash आपको **दो प्रकार के address** देता है: transparent (`t`) और shielded (`z` या `u`)।
- जनता कितना देख सकती है, यह इस बात पर निर्भर करता है कि आपका भुगतान किन प्रकारों के बीच जाता है।
- केवल **shielded से shielded** भुगतान ही प्रेषक, प्राप्तकर्ता और राशि को छिपाता है।
- एक shielded address एक key नहीं होता। यह keys का एक छोटा समूह होता है, और आप **खर्च करने की क्षमता दिए बिना केवल-पढ़ने योग्य access दे सकते हैं**।
- एक viewing key **साझा करने के बाद वापस नहीं ली जा सकती**।

---

## सबसे पहले समझने वाली एक बात

अधिकांश blockchains पर आपके पास कोई विकल्प नहीं होता। आप जो कुछ भेजते हैं, वह हमेशा के लिए, देखने वाले किसी भी व्यक्ति के लिए, सार्वजनिक होता है।

इसके बजाय Zcash आपको एक विकल्प देता है। यह विकल्प दो बार लिया जाता है: **एक बार जब आप चुनते हैं कि किस address पर भेजना है, और एक बार जब आप तय करते हैं कि आपके इतिहास को पढ़ने के लिए key किसे मिलेगी।**

नीचे दिया गया चित्र दोनों बातों को कवर करता है।

![Zcash key types and what a block explorer can see for each of the four transaction paths](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Start_Here/assets/who-can-see-your-zcash-payment.png)

---

## पहला विकल्प: कौन सा address

हर Zcash भुगतान दो addresses के बीच जाता है, और प्रत्येक transparent या shielded हो सकता है। इससे चार रास्ते बनते हैं, और हर रास्ते से अलग मात्रा में जानकारी उजागर होती है।

पैटर्न दिखने से अधिक सरल है: **जो कुछ भी किसी transparent address को छूता है, वह सार्वजनिक हो जाता है।** ऐसा भुगतान जो पूरे रास्ते shielded pool के भीतर रहता है, शुल्क के अलावा कुछ भी प्रकट नहीं करता।

यह सबसे अधिक महत्वपूर्ण तब होता है जब आप किसी exchange से withdrawal करते हैं। कई exchanges केवल transparent addresses पर ही भेजते हैं, इसलिए withdrawal सार्वजनिक होता है। राशि पहुंचते ही, उसे खर्च करने से पहले, आप स्वयं funds को shield करें।

explorer वास्तव में क्या पढ़ता है, इसे गहराई से समझने के लिए देखें [block explorer क्या देख सकता है](/zcash-tech/what-a-block-explorer-can-see)।

---

## दूसरा विकल्प: key किसे मिले

ऐसी privacy जिसे आप कभी हटा ही न सकें, उपयोगी नहीं है। कभी-कभी आपको accountant, auditor, या tax office को कुछ साबित करना पड़ता है। Zcash यह काम आपसे नियंत्रण छोड़े बिना संभालता है।

**Spending key.** सब कुछ देखती है और funds को move करती है। यही पैसा है। यह आपके पास रहती है और किसी भी कारण से, किसी के साथ साझा नहीं की जाती।

**Full viewing key.** केवल-पढ़ने योग्य। incoming और outgoing activity तथा balances दिखाती है, लेकिन एक भी zatoshi खर्च नहीं कर सकती। यही वह चीज़ है जो आप auditor या accountant को देते हैं।

**Incoming viewing key.** इससे भी सीमित: यह केवल आने वाले भुगतानों को दिखाती है। कोई exchange या merchant इसका उपयोग यह पुष्टि करने के लिए कर सकता है कि आपकी deposit पहुंच गई, जबकि spending key ऐसे hardware पर रहती है जो कभी internet को छूता नहीं।

क्रम महत्वपूर्ण है। जो काम के लिए पर्याप्त हो, वही सबसे सीमित key दें, न कि आपके पास मौजूद सबसे व्यापक key।

---

## वह हिस्सा जो beginners चूक जाते हैं

**एक viewing key को revoke नहीं किया जा सकता।** कोई "undo share" button नहीं होता। एक बार किसी के पास यह आ गई, तो वह उस address को तब तक पढ़ सकता है जब तक वह मौजूद है। यदि आपको उसकी access बंद करनी है, तो आपको अपने funds को एक नए address में ले जाना होगा।

**पूरी तरह shielded भुगतान में भी fees सार्वजनिक होती हैं।** राशि छिपी रहती है; fee नहीं।

**सार्वजनिक स्थायी होता है।** chain आज जो भी दिखाती है, वही बीस साल बाद भी दिखाएगी। भुगतान भेजने *के बाद* उसे shield करने का निर्णय लेना ऐसा कुछ नहीं है जो आप कर सकें।

---

## इसे व्यवहार में लागू करें

- ऐसा wallet उपयोग करें जो default रूप से shield करे, जैसे [Zodl](https://zodl.com) या [Ywallet](https://ywallet.app/)।
- exchange से funds आते ही, उन्हें खर्च करने से पहले shield करें।
- जब भी प्राप्तकर्ता support करता हो, shielded addresses पर भुगतान करें।
- viewing key साझा करने से पहले, पूछें कि कौन सी key सबसे छोटी है जो पूछे गए प्रश्न का उत्तर दे सकती है।

---

## संसाधन

- [viewing keys की व्याख्या (Electric Coin Company)](https://electriccoin.co/blog/explaining-viewing-keys/)
- [Selective disclosure और viewing keys (Electric Coin Company)](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ZIP 310: Viewing keys](https://zips.z.cash/zip-0310)
- [Zcash तकनीक कैसे काम करती है](https://z.cash/technology/)

## संबंधित पृष्ठ

- [Zcash की मूल बातें](/start-here/what-is-zec-and-zcash)
- [Zcash नए उपयोगकर्ता मार्गदर्शिका](/start-here/new-user-guide)
- [block explorer क्या देख सकता है](/zcash-tech/what-a-block-explorer-can-see)
- [Viewing keys](/zcash-tech/viewing-keys)
- [लेनदेन](/using-zcash/transactions)

---

*यदि आप इस wiki page में जोड़ना चाहते हैं या संपादन सुझाना चाहते हैं, तो कृपया [ZecHub GitHub repo](https://github.com/ZecHub/zechub) पर जाएँ और एक pull request submit करें।*
