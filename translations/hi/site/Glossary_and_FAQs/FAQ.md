# अक्सर पूछे जाने वाले प्रश्न

Zcash के बारे में सबसे आम प्रश्नों की सूची। Zcash क्लाइंट की समस्याओं के समाधान के लिए कृपया [आधिकारिक समस्या-निवारण गाइड](https://zcash.readthedocs.io/en/latest/rtd_pages/troubleshooting_guide.html) देखें।

### त्वरित नेविगेशन

<div className="flex flex-wrap gap-2 my-4">
  <a href="#what-is-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Zcash क्या है?</a>
  <a href="#how-can-i-acquire-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">मैं Zcash कैसे प्राप्त कर सकता हूँ?</a>
  <a href="#what-is-the-difference-between-zcash-and-other-cryptocurrencies" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">अन्य क्रिप्टोकरेंसी से अंतर?</a>
  <a href="#how-is-the-zcash-protocol-governed" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">प्रोटोकॉल गवर्नेंस?</a>
  <a href="#where-is-my-transaction" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">मेरा लेनदेन कहाँ है?</a>
  <a href="#is-zcash-really-private" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">क्या Zcash वास्तव में निजी है?</a>
  <a href="#a-few-common-misconceptions" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">आम भ्रांतियाँ</a>
  <a href="#zcashd-stopped-working-what-do-i-run-now" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">zcashd ने काम करना बंद कर दिया?</a>
  <a href="#how-do-i-move-my-zcashd-wallet-to-zallet" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">अपना वॉलेट Zallet में ले जाएँ?</a>
  <a href="#what-is-ironwood-and-do-i-need-to-do-anything" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Ironwood क्या है?</a>
  <a href="#which-full-node-should-i-run" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">कौन-सा फुल नोड?</a>
  <a href="#where-do-i-look-up-a-term-from-a-release-note" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">किसी शब्द का अर्थ खोजें?</a>
</div>

---

## Zcash क्या है?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash एक डिजिटल मुद्रा है, जो तेज़, गोपनीय लेनदेन (transaction) और कम शुल्क (fee) प्रदान करती है। गोपनीयता (privacy) Zcash की मुख्य विशेषता है। इसने सभी लेनदेन को एन्क्रिप्ट करने के लिए ज़ीरो-नॉलेज प्रूफ के उपयोग की शुरुआत की।

तुरंत, मोबाइल, सुरक्षित और निजी भुगतान (payment) के लिए कई वॉलेट उपलब्ध हैं: [वॉलेट](/using-zcash/wallets)

</div>

## मैं Zcash कैसे प्राप्त कर सकता हूँ?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

आप ZEC को [कस्टोडियल एक्सचेंज](/using-zcash/custodial-exchanges), [DEX](/using-zcash/dex) या [सेंट्रलाइज़्ड स्वैप प्लेटफ़ॉर्म](/using-zcash/centralized-swaps) पर खरीद सकते हैं।

आप Zcash को पीयर-टू-पीयर भी खरीद सकते हैं या माइनिंग के ज़रिए प्राप्त कर सकते हैं।

</div>

## Zcash और अन्य क्रिप्टोकरेंसी में क्या अंतर है?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash मूल रूप से Bitcoin या Ethereum की तुलना में कहीं अधिक निजी है। यह तेज़ ब्लॉक समय (75 सेकंड), कम शुल्क और नियमित अपग्रेड प्रदान करता है।

उपयोगकर्ता **ट्रांसपेरेंट** या **शील्डेड** लेनदेन में से चुन सकते हैं। अधिक जानकारी के लिए [एक शील्डेड इकोसिस्टम](https://electriccoin.co/blog/shielded-ecosystem) देखें।

</div>

## Zcash प्रोटोकॉल का गवर्नेंस कैसे होता है?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

प्रोटोकॉल का गवर्नेंस **Zcash इम्प्रूवमेंट प्रपोज़ल (ZIP)** प्रक्रिया द्वारा होता है। कोई भी ड्राफ़्ट ZIP प्रस्तुत कर सकता है। ड्राफ़्ट पर समुदाय द्वारा चर्चा की जाती है और ZIP संपादक उन्हें स्वीकार या अस्वीकार करते हैं:

- [Daira Hopwood](https://twitter.com/feministPLT) (Electric Coin Company)
- [Deirdre Connolly](https://twitter.com/durumcrustulum) (Zcash Foundation)

निर्णय स्पेसिफ़िकेशन में लिखे जाते हैं और जब नेटवर्क उन्हें अपनाता है, तब ऑन-चेन अनुमोदित होते हैं।

</div>

## मेरा लेनदेन कहाँ है?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

पहले [ब्लॉक एक्सप्लोरर पर हमारी गाइड](/guides/blockchain-explorers) पढ़ें। फिर [Zcash ब्लॉक एक्सप्लोरर](https://mainnet.zcashexplorer.app) देखें।

कोई निश्चित 25-मिनट की समाप्ति अवधि या स्वचालित रिफ़ंड टाइमर नहीं है। अपने वॉलेट द्वारा दर्ज की गई समाप्ति ऊँचाई (expiry height) देखें और जाँचें कि मूल भुगतान माइन हुआ था या नहीं। यदि यह माइन हुए बिना समाप्त हो गया, तो यह ऑन-चेन सेटल नहीं हुआ; समाप्ति से कोई रिफ़ंड लेनदेन नहीं बनता। दोबारा प्रयास के निर्देशों का पालन करने से पहले वॉलेट को सिंक होने दें। [लेनदेन समस्या-निवारण](/using-zcash/transactions#troubleshooting-stuck-transactions) और [ZIP 203](https://zips.z.cash/zip-0203) देखें।

**लेनदेन न दिखने के आम कारण:**

- कनेक्टिविटी का टूटना
- लेनदेन शुल्क बहुत कम होना
- नेटवर्क पर अत्यधिक भार
- बहुत अधिक ट्रांसपेरेंट इनपुट (आकार बहुत बड़ा)

**सफलता के लिए सुझाव:**

- स्थिर कनेक्शन का उपयोग करें
- मानक शुल्क चुकाएँ (या प्राथमिकता के लिए अधिक)
- प्रतीक्षा करें और बाद में फिर प्रयास करें
- लेनदेन को छोटा रखने के लिए कम इनपुट का उपयोग करें

</div>

## क्या Zcash वास्तव में निजी है?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

**हाँ।** Zcash शील्डेड लेनदेन के लिए प्रेषक, राशि और प्राप्तकर्ता का डेटा एन्क्रिप्ट करता है।

Zcash यह **नहीं** करता:

- मल्टीसिग्नेचर लेनदेन को एन्क्रिप्ट करना (FROST इंटीग्रेशन लंबित है)
- ट्रांसपेरेंट लेनदेन के साथ सहसंबंधों से सुरक्षा
- IP एड्रेस छिपाना

आगे पढ़ें: [एक शील्डेड इकोसिस्टम](https://web.archive.org/web/20260903010654/https://electriccoin.co/blog/shielded-ecosystem/)

</div>

## zcashd ने काम करना बंद कर दिया, अब मैं क्या चलाऊँ?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

zcashd अब सेवानिवृत्त हो चुका है। संस्करण 6.20.0 ने 18 जुलाई 2026 को ब्लॉक 3417100 पर स्वयं को बंद कर दिया, और इसने Ironwood (NU6.3) को कभी सपोर्ट नहीं किया, इसलिए अपग्रेड करने के लिए कोई बाद का संस्करण नहीं है।

इसके बजाय Z3 स्टैक चलाएँ। तीन प्रोग्राम वह काम आपस में बाँटते हैं जो zcashd पहले अकेले करता था:

- **[Zebra](/zcash-tech/zebra-full-node)** चेन को वैलिडेट करता है
- **[Zaino](/zcash-tech/zaino)** उसे इंडेक्स करता है और वॉलेट डेटा प्रदान करता है
- **[Zallet](/zcash-tech/zallet)** आपके फ़ंड रखता है

[Zakura](/zcash-tech/zakura-node) एक वैकल्पिक फुल नोड है। यह अपने ऊपर zcashd भी चलाता है, जो तब मददगार है जब अन्य सॉफ़्टवेयर अभी भी पुराने इंटरफ़ेस की अपेक्षा करते हैं।

[माइग्रेशन गाइड](/guides/migration-guide-zcashd-to-zebrad-zallet) से शुरुआत करें।

</div>

## मैं अपना zcashd वॉलेट Zallet में कैसे ले जाऊँ?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zallet मौजूदा `wallet.dat` को माइग्रेट करता है, इसलिए आपके फ़ंड और एड्रेस बने रहते हैं।

पहले `wallet.dat` का बैकअप लें, फिर [माइग्रेशन गाइड](/guides/migration-guide-zcashd-to-zebrad-zallet) का पालन करें। जब तक आप Zallet में अपने बैलेंस की पुष्टि न कर लें, तब तक वह बैकअप रखें।

माइग्रेशन के बाद रोज़मर्रा के कमांड के लिए [Zallet त्वरित संदर्भ](/using-zcash/zallet-quick-reference-guide) देखें।

</div>

## Ironwood क्या है, और क्या मुझे कुछ करना होगा?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Ironwood नेटवर्क अपग्रेड NU6.3 है, जो 28 जुलाई 2026 को ब्लॉक 3,428,143 से मेननेट पर लाइव है। यह एक सुधारे गए सर्किट पर बना शील्डेड पूल जोड़ता है और पुराने [Orchard](/using-zcash/shielded-pools) पूल को सील कर देता है, ताकि कोई भी सत्यापित कर सके कि कोई ZEC जाली नहीं बनाया गया।

**यदि आपके पास शील्डेड फ़ंड हैं, तो उन्हें स्थानांतरित करने की आवश्यकता हो सकती है।** मूल्य Orchard से केवल [टर्नस्टाइल](/zcash-tech/the-turnstile) के ज़रिए बाहर निकलता है, और वॉलेट यह स्थानांतरण अलग-अलग समय पर और अलग-अलग तरीकों से करते हैं। कुछ भी मैन्युअल रूप से स्थानांतरित करने से पहले अपने वॉलेट प्रदाता से पूछें।

क्या बदला और क्यों, यह जानने के लिए [Ironwood](/zcash-tech/ironwood) पढ़ें।

</div>

## मुझे कौन-सा फुल नोड चलाना चाहिए?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

**[Zebra](/zcash-tech/zebra-full-node)** zcashd का सीधा विकल्प है और वही नोड है जिसे माइग्रेशन गाइड मानकर चलती है। जब तक आपके पास कोई कारण न हो, इसे ही चुनें।

**[Zakura](/zcash-tech/zakura-node)** बड़े पैमाने के लिए बनाया गया दूसरा इम्प्लीमेंटेशन है, जिसमें तेज़ सिंक और नेटिव ब्लॉक प्रूनिंग है। यदि आपको इनकी आवश्यकता है, या आप ऐसे सॉफ़्टवेयर पर निर्भर हैं जो अभी भी zcashd से संवाद करता है, तो इसे चुनें।

दोनों एक ही चेन को वैलिडेट करते हैं, इसलिए यह कंसेंसस का नहीं, बल्कि परिचालन संबंधी चुनाव है।

</div>

## रिलीज़ नोट में आए किसी शब्द का अर्थ मैं कहाँ खोजूँ?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

[Zcash लाइब्रेरी](/glossary-and-faqs/zcash-library) देखें। इसमें नोड और वॉलेट सॉफ़्टवेयर, शील्डेड पूल, और सबसे अधिक दिखाई देने वाले ZIP नंबर शामिल हैं।

</div>

## कुछ आम भ्रांतियाँ

<div className="rounded-2xl border border-border bg-card p-5 my-4 overflow-x-auto">

<table className="w-full border-collapse">
  <thead>
    <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
      <th className="py-4 px-5 text-left font-bold text-amber-800 dark:text-white">भ्रांति</th>
      <th className="py-4 px-5 text-left font-bold text-amber-800 dark:text-white">सही उत्तर</th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">क्या Zcash एक सेंट्रलाइज़्ड कॉइन है?</td>
      <td className="py-4 px-5 text-foreground">नहीं। एक ट्रेडमार्क समझौता Zcash Foundation या ECC को सामुदायिक कंसेंसस के विरुद्ध कार्य करने से रोकता है। गवर्नेंस का डिसेंट्रलाइज़्ड होना सिद्ध है (देखें [Messari रिपोर्ट](https://messari.io/report/decentralizing-zcash))। सामुदायिक पोल, ZecHub और Zcash Foundation A/V Club, ये सभी व्यापक भागीदारी को संभव बनाते हैं।</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">क्या Zcash में कोई बैकडोर है?</td>
      <td className="py-4 px-5 text-foreground">नहीं। न तो Zcash में और न ही हमारे द्वारा बनाए गए किसी क्रिप्टोग्राफ़िक सॉफ़्टवेयर में कोई बैकडोर है, और कभी होगा भी नहीं।</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">क्या Zcash किसी कॉर्पोरेशन द्वारा नियंत्रित है?</td>
      <td className="py-4 px-5 text-foreground">गलत। हालाँकि हम शोध के लिए कंपनियों के साथ साझेदारी करते हैं, Zcash डिसेंट्रलाइज़ेशन के प्रति प्रतिबद्ध है। कई स्वायत्त संगठन सेल्फ़-कस्टडी और गोपनीयता अधिकारों के लिए मिलकर काम करते हैं।</td>
    </tr>
    <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">अन्य प्राइवेसी कॉइन की तुलना में Zcash की गोपनीयता सीमित है</td>
      <td className="py-4 px-5 text-foreground">नहीं। Monero/Grin जैसी गोपनीयता डिकॉय पर निर्भर करती है (जिन्हें भेदा जा सकता है)। Zcash सभी शील्डेड लेनदेन डेटा को एन्क्रिप्ट करता है, जिससे पूल का हर लेनदेन अप्रभेद्य होता है। [पर्याप्त निजी नहीं?](https://electriccoin.co/blog/not-private-enough-mixers-and-decoys-wont-protect-you-for-long/) देखें।</td>
    </tr>
  </tbody>
</table>

</div>

---

**अंतिम अपडेट:** अक्टूबर 2026
**योगदान देना चाहते हैं?** [इस पेज को GitHub पर संपादित करें](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/FAQ.md)
