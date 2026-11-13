# <img src="/content-images/money-business-and-finance-svgrepo-com-eac0e054bd.svg" width="24" height="24" alt="finance icon"/> ZEC का दान और US कर कटौती (tax deduction) का दावा

<span className="inline-flex items-center gap-[6px]">
  <span className="inline-block w-[12px] h-[12px] bg-green-500 rounded-full"></span>
  मध्यम - 10 मिनट
</span>

> यह पेज सामान्य जानकारी है, कानूनी या कर संबंधी सलाह नहीं। US कर नियम बदलते रहते हैं, इसलिए अपनी स्थिति किसी कर सलाहकार से जाँच लें। नीचे दिया गया हर नियम अपने IRS स्रोत से लिंक है। इन्हें अक्टूबर 2026 में Publication 526 (2025 के रिटर्न के लिए) और 2025 के कर कानून पर IRS के पेज से मिलाकर जाँचा गया था।

## संक्षेप में (TL;DR)

- IRS ZEC को संपत्ति (property) मानता है, इसलिए ZEC का उपहार एक गैर-नकद योगदान (noncash contribution) है
- अगर आपने ZEC को एक साल से ज़्यादा समय तक रखा है, तो आप आम तौर पर उसके उचित बाज़ार मूल्य (fair market value) की कटौती ले सकते हैं और उसकी बढ़ी हुई कीमत पर कोई पूंजीगत लाभ कर (capital gains tax) नहीं देना पड़ता
- अगर आपने इसे एक साल या उससे कम समय तक रखा है, तो आपकी कटौती आपके द्वारा चुकाई गई कीमत और उसके बाज़ार मूल्य में से जो कम हो, उतनी होगी
- $250 या उससे ज़्यादा के उपहार के लिए आपको चैरिटी से लिखित पावती (written acknowledgment) की ज़रूरत होती है
- $500 से ज़्यादा होने पर आपको Form 8283 भरना होता है। $5,000 से ज़्यादा होने पर आपको योग्य मूल्यांकन (qualified appraisal) की भी ज़रूरत होती है
- आपको कटौती तभी मिलती है जब आप कटौतियों को मदवार दर्ज करते हैं (itemize)। जो लोग कटौतियाँ मदवार दर्ज नहीं करते, उनके लिए 2026 से शुरू होने वाली नई कटौती केवल नकद उपहारों पर लागू होती है, ZEC पर नहीं

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> यह किसके लिए है?

- US करदाता जो किसी चैरिटी को ZEC देना चाहते हैं
- दानदाता जो चाहते हैं कि उनका उपहार ऑन-चेन (on-chain) निजी रहे और फिर भी वे कटौती का दावा कर सकें

अगर आप चैरिटी चलाते हैं, तो [US नॉनप्रॉफ़िट के रूप में निजी दान की स्वीकृति](/zcash-use-cases/accept-private-donations-as-a-us-nonprofit) देखें।

<br/>

## <img src="/content-images/icons8-lock-2f8e221321.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="lock icon"/> ऑन-चेन निजी, चैरिटी को ज्ञात

शील्डेड (shielded) उपहार राशि, आपके एड्रेस (address) और चैरिटी के बैलेंस को सार्वजनिक रिकॉर्ड से दूर रखता है। कर कटौती एक अलग तरह की गोपनीयता (privacy) है: $250 या उससे ज़्यादा के किसी भी उपहार के लिए चैरिटी को आपको पावती भेजने के लिए यह जानना ज़रूरी है कि आप कौन हैं, और $5,000 से ज़्यादा होने पर आपका मूल्यांकनकर्ता और चैरिटी दोनों आपके Form 8283 पर हस्ताक्षर करते हैं।

इसलिए आप जनता से निजी रहकर भी कटौती का दावा कर सकते हैं। लेकिन $250 या उससे ज़्यादा के उपहार के लिए आप चैरिटी से गुमनाम रहकर कटौती का दावा नहीं कर सकते।

<br/>

## <img src="/content-images/icons8-toolbox-9bebbb1619.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="toolbox icon"/> आपको क्या चाहिए

- एक शील्डेड वॉलेट (wallet) जिसमें वह ZEC हो जिसे आप देंगे
- इस बात का रिकॉर्ड कि आपको वह ZEC कब मिला और आपने उसके लिए कितना भुगतान किया
- एक चैरिटी जो योग्य संगठन (qualified organization) हो (इसे [IRS Tax Exempt Organization Search](https://apps.irs.gov/app/eos/) पर जाँचें) और ZEC स्वीकार करती हो। [कहाँ दान करें ZEC](/zcash-use-cases/where-to-donate-zec) देखें

<br/>

## <img src="/content-images/ladder-svgrepo-com-7232bf46ed.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="step icon"/> चरण-दर-चरण गाइड

### चरण 1: जाँचें कि आपने ZEC कितने समय से रखा है

- **एक साल से ज़्यादा:** ZEC एक पूंजीगत परिसंपत्ति (capital asset) है, इसलिए यह पूंजीगत लाभ संपत्ति (capital gain property) है। आप आम तौर पर उपहार देने वाले दिन के उसके उचित बाज़ार मूल्य की कटौती ले सकते हैं ([Publication 526](https://www.irs.gov/pub/irs-pdf/p526.pdf), [IRS FAQ, Q34–Q35](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions))
- **एक साल या उससे कम:** आपकी कटौती आपके लागत आधार (cost basis) (आम तौर पर जो आपने चुकाया) और उस दिन के उचित बाज़ार मूल्य में से जो कम हो, उतनी होगी ([IRS FAQ, Q35](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions))

अगर आपने ZEC अलग-अलग समय पर खरीदा है, तो उस लॉट से दें जिसे आपने एक साल से ज़्यादा समय तक रखा है, और नोट कर लें कि आपने कौन-सा लॉट इस्तेमाल किया।

### चरण 2: चैरिटी की जाँच

सुनिश्चित करें कि संगठन कर-कटौती योग्य उपहार प्राप्त कर सकता है, और पढ़ें कि वह क्रिप्टो की रसीदों के बारे में क्या कहता है। कुछ चैरिटी क्रिप्टो के लिए कोई पावती भेजती ही नहीं हैं। [कहाँ दान करें ZEC](/zcash-use-cases/where-to-donate-zec) में बताया गया है कि हर चैरिटी इस बारे में क्या कहती है।

### चरण 3: उपहार भेजें और चैरिटी को बताएँ कि आप कौन हैं

- चैरिटी के अपने दान पेज से एड्रेस कॉपी करें
- अपने शील्डेड वॉलेट से भेजें
- अगर चैरिटी के पास शील्डेड एड्रेस है, तो अपना नाम और ईमेल [मेमो](/using-zcash/memos) में डालें, या उसके दान पेज पर दिए गए संपर्क तरीके का उपयोग करें

### चरण 4: उस दिन का मूल्य लिख लें

तारीख और समय, ZEC की मात्रा, उस समय उसका US डॉलर मूल्य और आपने कीमत कहाँ से ली, यह सब दर्ज करें। लेनदेन (transaction) ID सहेज लें। [शील्डेड ZEC के साथ रिकॉर्ड रखना](/zcash-use-cases/keeping-records-with-shielded-zec) देखें।

### चरण 5: लिखित पावती प्राप्त करें

$250 या उससे ज़्यादा के किसी भी एकल उपहार के लिए आपको चैरिटी से समकालीन लिखित पावती (contemporaneous written acknowledgment) की ज़रूरत होती है। इसमें आपके द्वारा दिए गए ZEC का विवरण होता है, लेकिन उसका मूल्य नहीं लिखा जाता। आपको यह अपना रिटर्न दाखिल करने की तारीख तक, या अगर विस्तार सहित नियत तारीख उससे पहले हो तो उस तारीख तक, चाहिए ([Publication 526](https://www.irs.gov/pub/irs-pdf/p526.pdf))।

### चरण 6: Form 8283 भरें

- **$500 से ज़्यादा और $5,000 तक:** [Form 8283](https://www.irs.gov/pub/irs-pdf/f8283.pdf) का Section A भरें
- **$5,000 से ज़्यादा:** Section B भरें। आपको किसी योग्य मूल्यांकनकर्ता (qualified appraiser) से योग्य मूल्यांकन की ज़रूरत होती है, और चैरिटी फ़ॉर्म पर हस्ताक्षर करती है। इस नियम के लिए क्रिप्टो सार्वजनिक रूप से कारोबार की जाने वाली प्रतिभूति (publicly traded security) नहीं है, इसलिए ZEC का बाज़ार मूल्य होने के बावजूद मूल्यांकन लागू होता है ([Publication 526](https://www.irs.gov/pub/irs-pdf/p526.pdf), [CCA 202302012](https://www.irs.gov/pub/irs-wd/202302012.pdf))। [Publication 561](https://www.irs.gov/pub/irs-pdf/p561.pdf) बताता है कि योग्य मूल्यांकन किसे माना जाता है और यह कब किया जाना चाहिए

### चरण 7: अपने रिटर्न में इसका दावा करें

Schedule A पर कटौती का दावा करें, जिसका मतलब है कि आप कटौतियाँ मदवार दर्ज करते हैं। अधिकांश सार्वजनिक चैरिटी को पूंजीगत लाभ संपत्ति के उपहार आम तौर पर आपकी समायोजित सकल आय (adjusted gross income) के 30% तक सीमित होते हैं, और अतिरिक्त राशि को आप आगे ले जा सकते हैं ([Publication 526](https://www.irs.gov/pub/irs-pdf/p526.pdf))।

<br/>

## <img src="/content-images/user-svgrepo-com-21adf62b7c.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="user icon"/> अगर आप कटौतियाँ मदवार दर्ज नहीं करते

कर वर्ष 2026 से, जो लोग कटौतियाँ मदवार दर्ज नहीं करते, वे $1,000 तक के धर्मार्थ उपहारों की कटौती ले सकते हैं (संयुक्त रूप से रिटर्न दाखिल करने वाले विवाहित जोड़ों के लिए $2,000)। यह कटौती केवल नकद के लिए है। ZEC जैसे गैर-नकद उपहार इसके योग्य नहीं हैं ([IRS: One Big Beautiful Bill के प्रावधान](https://www.irs.gov/newsroom/one-big-beautiful-bill-provisions))।

अगर आप कटौतियाँ मदवार दर्ज नहीं करते, तो ZEC का उपहार फिर भी चैरिटी की मदद करता है, लेकिन इससे आपका कर कम नहीं होगा।

<br/>

## <img src="/content-images/icons8-cancel-7f786be3c1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="cancel icon"/> बचने योग्य आम गलतियाँ

- पहले ZEC बेचना और फिर डॉलर दान करना, जिससे आपको वह पूंजीगत लाभ कर चुकाना पड़ सकता है जिससे आप बच सकते थे
- एक साल या उससे कम समय तक रखा गया ZEC देना और उसके पूरे बाज़ार मूल्य की कटौती लेना
- गुमनाम रूप से दान देना और फिर रसीद की उम्मीद करना
- $5,000 से ज़्यादा के उपहार के लिए मूल्यांकन छोड़ देना, क्योंकि ZEC का बाज़ार मूल्य होता है
- यह भूल जाना कि आपने दिया गया ZEC कब खरीदा था

<br/>

## <img src="/content-images/checked-checkbox-svgrepo-com-7ea19022da.svg" width="28" height="28" className="inline-block align-middle mr-1 p-[2px]" alt="done icon"/> परिणाम

आप:
- ऑन-चेन निजी रूप से ZEC दे सकते हैं
- कटौती का दावा करने के लिए ज़रूरी कागज़ात प्राप्त कर सकते हैं
- देने से पहले जान सकते हैं कि आप पर कटौती लागू होती है या नहीं

<br/>

## स्रोत

- [IRS: वर्चुअल करेंसी लेनदेन पर अक्सर पूछे जाने वाले प्रश्न](https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions) (Q34–Q37 धर्मार्थ उपहारों से संबंधित हैं)
- [IRS Publication 526: धर्मार्थ योगदान](https://www.irs.gov/pub/irs-pdf/p526.pdf)
- [IRS Publication 561: दान की गई संपत्ति के मूल्य का निर्धारण](https://www.irs.gov/pub/irs-pdf/p561.pdf)
- [IRS Chief Counsel Advice 202302012: क्रिप्टो उपहारों के लिए मूल्यांकन](https://www.irs.gov/pub/irs-wd/202302012.pdf)
- [Form 8283 और उसके निर्देश](https://www.irs.gov/forms-pubs/about-form-8283)
- [IRS: One Big Beautiful Bill के प्रावधान](https://www.irs.gov/newsroom/one-big-beautiful-bill-provisions)

<br/>

## <img src="/content-images/chain-for-links-svgrepo-com-117ee0dec1.svg" width="24" height="24" className="inline-block align-middle mr-1 p-[2px]" alt="chain-links icon"/> संबंधित

- [कहाँ दान करें ZEC](/zcash-use-cases/where-to-donate-zec) - ZEC स्वीकार करने वाले नॉनप्रॉफ़िट संगठन और रसीदों के बारे में वे क्या कहते हैं
- [US नॉनप्रॉफ़िट के रूप में निजी दान की स्वीकृति](/zcash-use-cases/accept-private-donations-as-a-us-nonprofit) - चैरिटी की ओर से वही उपहार
- [शील्डेड ZEC के साथ रिकॉर्ड रखना](/zcash-use-cases/keeping-records-with-shielded-zec) - आपके रिकॉर्ड के लिए मेमो (memo) और व्यूइंग की (viewing key)
- [मेमो](/using-zcash/memos) - शील्डेड उपहार में अपना नाम और ईमेल जोड़ें

<br/>

## अगला चरण

- [कहाँ दान करें ZEC](/zcash-use-cases/where-to-donate-zec)

<br/>

अगर आप नए हैं, तो यहाँ से शुरू करें: [Zcash क्या है](/start-here/what-is-zec-and-zcash)
