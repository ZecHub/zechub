# <img src="/content-images/money-business-and-finance-svgrepo-com-eac0e054bd.svg" width="24" height="24" alt="finance icon"/> एक अमेरिकी गैर-लाभकारी संस्था के रूप में निजी ZEC दान स्वीकार करें

<span className="inline-flex items-center gap-[6px]">
  <span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>
  मध्यम स्तर - 10 मिनट
</span>

> यह पृष्ठ सामान्य जानकारी है, कानूनी या कर संबंधी सलाह नहीं। अमेरिकी कर नियम बदलते रहते हैं, इसलिए हर चरण की अपने अकाउंटेंट या कर सलाहकार से जाँच करें। नीचे दिया गया हर नियम अपने IRS स्रोत से लिंक है और इसकी जाँच अक्टूबर 2026 में Publication 526 (2025 के रिटर्न के लिए) तथा Form 8283 (दिसंबर 2025 संशोधन) के आधार पर की गई थी। IRS का virtual currency FAQ 2025 से पहले के लेन-देन के लिए लिखा गया था, इसलिए इसे वर्तमान दिशानिर्देशों से मिलाकर जाँचें।

## संक्षेप में

- दान को उस shielded wallet में रखें जिसे आपकी संस्था नियंत्रित करती हो, किसी कर्मचारी के निजी wallet में नहीं
- IRS ZEC को संपत्ति मानता है, इसलिए ZEC का उपहार गैर-नकद योगदान है
- $250 या उससे अधिक के उपहार के लिए, दाता को एक लिखित पावती भेजें जिसमें ZEC का वर्णन हो, लेकिन उसका डॉलर मूल्य न लिखा हो
- $5,000 से अधिक के उपहार के लिए, दाता को योग्य मूल्यांकन की आवश्यकता होती है और आप उनके Form 8283 पर हस्ताक्षर करते हैं
- यदि आप ZEC प्राप्त करने के तीन वर्षों के भीतर उसे बेचते हैं और आपने दाता के Form 8283 के Section B पर हस्ताक्षर किए थे, तो Form 8282 दाखिल करें
- जो दाता आपके लिए गुमनाम रहता है, वह आमतौर पर $250 या उससे अधिक की कटौती का दावा नहीं कर सकता

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> यह किसके लिए है?

- अमेरिकी 501(c)(3) चैरिटी, चर्च और सामुदायिक समूह जो ZEC स्वीकार करना चाहते हैं
- crypto दान की व्यवस्था करने वाले कोषाध्यक्ष, बहीखाता-लेखक और बोर्ड सदस्य
- वे दाता जो जानना चाहते हैं कि किसी गैर-लाभकारी संस्था को उनसे क्या चाहिए

व्यक्तियों और रचनाकारों के लिए, [निजी रूप से दान प्राप्त करें](/zcash-use-cases/receive-donations-privately) देखें।

<br/>

## <img src="/content-images/warning-error-svgrepo-com-b7ea8a50da.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="warning icon"/> समस्या

अमेरिकी चैरिटी के लिए अधिकांश crypto-दान सेवाएँ आपको एक transparent address देती हैं या उसके माध्यम से आपके लिए उपहार को परिवर्तित करती हैं। transparent address पर कोई भी हर उपहार, उसकी राशि और आपका बैलेंस देख सकता है। जो दाता जानबूझकर निजी रूप से दान देता है, उपहार पहुँचते ही उसकी वह गोपनीयता समाप्त हो जाती है।

किसी गैर-लाभकारी संस्था के पास उस कागजी कार्रवाई का दायित्व भी होता है जो किसी व्यक्ति के पास नहीं होता: दाता रसीदें, बड़े उपहारों के लिए IRS फ़ॉर्म और वार्षिक रिटर्न। गोपनीयता और यह कागजी कार्रवाई, दोनों साथ चल सकते हैं, बशर्ते पहले उपहार के आने से पहले उनकी योजना बनाई जाए।

<br/>

## <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="lock icon"/> क्या निजी रहता है और क्या नहीं

| | आपके shielded address पर shielded उपहार |
|---|---|
| जनता | दाता, आपका address या राशि नहीं देख सकती |
| आपकी संस्था | राशि और कोई भी memo देखती है; दाता को केवल तभी देखती है जब वे अपनी पहचान बताएं |
| आपका अकाउंटेंट | वही देखता है जो आप साझा करते हैं, उदाहरण के लिए [viewing key](/zcash-tech/viewing-keys) के साथ |
| जब आप बेचते हैं | यदि आपका exchange केवल transparent deposit स्वीकार करता है, तो shielded pool से बाहर भेजी गई राशि सार्वजनिक हो जाती है ([टर्नस्टाइल](/zcash-tech/the-turnstile) देखें) |

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> आपको क्या चाहिए

- cryptocurrency को शामिल करने वाली, आपके बोर्ड द्वारा अनुमोदित उपहार-स्वीकृति नीति
- shielded address वाला [wallet](/using-zcash/wallets), जो संस्था द्वारा नियंत्रित हो
- संस्था के नाम पर exchange account, यदि आप ZEC को डॉलर में बदलने की योजना रखते हैं
- गैर-नकद उपहार संभाल चुका अकाउंटेंट

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> चरण-दर-चरण मार्गदर्शिका

### चरण 1: अपनी नीति तय करें

निम्नलिखित लिखें और अपने बोर्ड से अनुमोदित कराएँ:
- कौन धनराशि स्थानांतरित कर सकता है, और क्या हर स्थानांतरण के लिए दो लोगों की मंज़ूरी आवश्यक है
- क्या आप हर उपहार तुरंत बेचेंगे या कुछ ZEC रखेंगे
- क्या आप गुमनाम उपहार स्वीकार करते हैं और कितनी राशि तक

### चरण 2: संस्था द्वारा नियंत्रित wallet स्थापित करें

- wallet को व्यक्तिगत फोन पर नहीं, संस्था के डिवाइस पर बनाएँ
- seed phrase को ऑफ़लाइन रखें, ऐसे दो अधिकारियों के पास जो दोनों उस तक पहुँच सकें
- साझा नियंत्रण के लिए, [एक निजी सामुदायिक कोष चलाएँ](/zcash-use-cases/private-community-treasury) देखें

### चरण 3: एक shielded address प्रकाशित करें

- अपने दान पृष्ठ पर केवल shielded address साझा करें। [unified address](/using-zcash/unified-addresses) की शुरुआत `u1` से होती है, लेकिन उसमें transparent receiver भी हो सकता है और transparent-only wallet से भेजा गया उपहार तब सार्वजनिक रूप से पहुँचता है। यदि आपका wallet shielded-only address प्रदान करता है, तो उसका उपयोग करें।
- transparent address प्रकाशित न करें (उसकी शुरुआत `t1` या `t3` से होती है)
- रसीद चाहने वाले दाताओं से कहें कि वे अपना ईमेल [memo](/using-zcash/memos) में डालें। memo एन्क्रिप्टेड होता है, इसलिए केवल आपकी संस्था उसे पढ़ सकती है।

### चरण 4: हर उपहार का रिकॉर्ड रखें

हर उपहार के लिए रिकॉर्ड करें:
- प्राप्ति की तारीख और समय
- ZEC में राशि
- उस समय अमेरिकी डॉलर में मूल्य और वह मूल्य स्रोत जिसका आपने उपयोग किया
- Transaction ID और memo

IRS ZEC को संपत्ति मानता है ([Notice 2014-21](https://www.irs.gov/pub/irs-drop/n-14-21.pdf)), इसलिए आपकी पुस्तकों में यह गैर-नकद योगदान है। अपने अकाउंटेंट को केवल-पठन पहुँच देने के लिए, [shielded ZEC के साथ रिकॉर्ड रखना](/zcash-use-cases/keeping-records-with-shielded-zec) देखें।

### चरण 5: $250 या अधिक के उपहारों की पावती दें

दाता आपसे लिखित पावती के बिना $250 या उससे अधिक के एकल उपहार की कटौती नहीं कर सकता ([Publication 1771](https://www.irs.gov/pub/irs-pdf/p1771.pdf))। ZEC उपहार के लिए, इसमें शामिल करें:
- आपकी संस्था का नाम
- वह तारीख जब आपने इसे प्राप्त किया
- उपहार का विवरण, उदाहरण के लिए "1.5 ZEC"। इसमें डॉलर मूल्य न लिखें: उपहार का मूल्य तय करना दाता का काम है।
- क्या आपने बदले में कुछ दिया, उदाहरण के लिए "इस योगदान के बदले कोई वस्तु या सेवा प्रदान नहीं की गई।"

दाता के पास यह अपना कर रिटर्न दाखिल करने से पहले होना चाहिए ([Publication 526](https://www.irs.gov/pub/irs-pdf/p526.pdf))। संस्थाएँ सामान्यतः इसे अगले वर्ष की 31 जनवरी तक भेजती हैं; इसे तुरंत भेजना सबसे सरल है।

### चरण 6: $5,000 से अधिक के उपहारों के लिए Form 8283 पर हस्ताक्षर करें

यदि कोई दाता $5,000 से अधिक का दावा करता है, तो उसे योग्य मूल्यांकन चाहिए। Crypto को सार्वजनिक रूप से कारोबार की जाने वाली security नहीं माना जाता, इसलिए उस पर मूल्यांकन लागू होता है ([Publication 526](https://www.irs.gov/pub/irs-pdf/p526.pdf), [CCA 202302012](https://www.irs.gov/pub/irs-wd/202302012.pdf))। दाता आपके पास [Form 8283](https://www.irs.gov/pub/irs-pdf/f8283.pdf) लाता है और आप Section B के donee भाग पर हस्ताक्षर करते हैं। आपके हस्ताक्षर यह पुष्टि करते हैं कि आपको उस तारीख को ZEC प्राप्त हुआ था; वे दाता के मूल्य की पुष्टि नहीं करते ([IRS FAQ, Q36](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions))।

### चरण 7: आवश्यकता हो तो डॉलर में बदलें

- देखें कि कौन से exchange [Custodial Exchanges](/using-zcash/custodial-exchanges) पर shielded deposit स्वीकार करते हैं। कई केवल transparent deposit स्वीकार करते हैं।
- यदि आपका exchange केवल transparent है, तो बेचते समय अपने shielded wallet से ZEC को एक ही चरण में exchange पर भेजें। वह राशि सार्वजनिक हो जाती है, लेकिन आपके अन्य उपहार और बैलेंस निजी रहते हैं।
- यदि आप ZEC प्राप्त करने के तीन वर्षों के भीतर उसे बेचते हैं और आपने दाता के Form 8283 के Section B पर हस्ताक्षर किए थे, तो बिक्री के 125 दिनों के भीतर [Form 8282](https://www.irs.gov/pub/irs-pdf/f8282.pdf) दाखिल करें और दाता को उसकी एक प्रति भेजें ([IRS FAQ, Q37](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions))।

### चरण 8: अपने वार्षिक रिटर्न में रिपोर्ट करें

अपने Form 990-series रिटर्न में ZEC उपहारों को गैर-नकद योगदान के रूप में रिपोर्ट करें और, यदि यह आप पर लागू होता है, तो [Schedule M](https://www.irs.gov/forms-pubs/about-schedule-m-form-990) भी भरें। गुमनाम उपहारों को सूचीबद्ध करने के तरीके के बारे में अपने अकाउंटेंट से पूछें।

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> गुमनाम दाता: वे क्या दावा कर सकते हैं और क्या नहीं

- जनता से गोपनीयता, आपसे गुमनामी के समान नहीं है। दाता निजी रूप से दान दे सकता है और रसीद पाने के लिए फिर भी memo में अपना ईमेल साझा कर सकता है।
- जो दाता आपके लिए गुमनाम रहता है, वह पावती नहीं पा सकता, इसलिए वह $250 या उससे अधिक के एकल उपहार की कटौती नहीं कर सकता।
- $5,000 से अधिक पर, दाता को मूल्यांकन और Form 8283 पर आपके हस्ताक्षर भी चाहिए, जिसका अर्थ है कि उसे आपको अपनी पहचान बतानी होगी।
- दाता के लिए, एक वर्ष से अधिक समय तक रखा गया ZEC उपहार सामान्यतः उचित बाज़ार मूल्य पर कटौती योग्य होता है, और उपहार पर कोई capital gains tax नहीं लगता ([IRS FAQ, Q34–Q35](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions))।

अपने दान पृष्ठ पर यह लिखें, ताकि दाता दान देने से पहले चुनाव कर सकें।

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> बचने योग्य सामान्य गलतियाँ

- उपहारों को किसी कर्मचारी के निजी wallet में रखना
- अपने दान address के रूप में transparent address या exchange deposit address प्रकाशित करना
- पावती में डॉलर मूल्य लिखना
- तीन वर्षों के भीतर बेच देना और Form 8282 भूल जाना
- गुमनाम दाताओं को कर कटौती का वादा करना

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> परिणाम

आप यह कर सकते हैं:
- अपने दाताओं या अपने बैलेंस को उजागर किए बिना ZEC स्वीकार करना
- दाताओं को कटौती का दावा करने के लिए आवश्यक कागजी कार्रवाई देना
- ऐसे रिकॉर्ड रखना जिनकी जाँच आपका अकाउंटेंट और ऑडिटर कर सकें

<br/>

## स्रोत

- [IRS: virtual currency लेन-देन पर अक्सर पूछे जाने वाले प्रश्न](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions) (Q34–Q37 चैरिटी को कवर करते हैं)
- [IRS Notice 2014-21](https://www.irs.gov/pub/irs-drop/n-14-21.pdf)
- [IRS Publication 1771: धर्मार्थ योगदान, प्रमाणन और प्रकटीकरण](https://www.irs.gov/pub/irs-pdf/p1771.pdf)
- [IRS Publication 526: धर्मार्थ योगदान](https://www.irs.gov/pub/irs-pdf/p526.pdf)
- [IRS Publication 561: दान की गई संपत्ति का मूल्य निर्धारित करना](https://www.irs.gov/pub/irs-pdf/p561.pdf)
- [IRS Chief Counsel Advice 202302012: crypto उपहारों के लिए मूल्यांकन](https://www.irs.gov/pub/irs-wd/202302012.pdf)
- [Form 8283](https://www.irs.gov/pub/irs-pdf/f8283.pdf) और [Form 8282](https://www.irs.gov/pub/irs-pdf/f8282.pdf)

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> संबंधित

- [निजी रूप से दान प्राप्त करें](/zcash-use-cases/receive-donations-privately) - व्यक्तियों के लिए यही विचार
- [shielded ZEC के साथ रिकॉर्ड रखना](/zcash-use-cases/keeping-records-with-shielded-zec) - आपकी पुस्तकों के लिए memo और viewing keys
- [Viewing Keys](/zcash-tech/viewing-keys) - अकाउंटेंट या ऑडिटर के लिए केवल-पठन पहुँच
- [टर्नस्टाइल](/zcash-tech/the-turnstile) - shielded pool से ZEC निकलने पर क्या सार्वजनिक होता है

<br/>

## अगला चरण

- [एक निजी सामुदायिक कोष चलाएँ](/zcash-use-cases/private-community-treasury)

<br/>
