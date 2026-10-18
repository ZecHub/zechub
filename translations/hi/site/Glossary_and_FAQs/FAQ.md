# अक्सर पूछे जाने वाले प्रश्न

Zcash के बारे में सबसे आम प्रश्नों की सूची। Zcash क्लाइंट के समस्या निवारण के लिए, कृपया [आधिकारिक समस्या निवारण मार्गदर्शिका](https://zcash.readthedocs.io/en/latest/rtd_pages/troubleshooting_guide.html) देखें।

### त्वरित नेविगेशन

<div className="flex flex-wrap gap-2 my-4">
  <a href="#what-is-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Zcash क्या है?</a>
  <a href="#how-can-i-acquire-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">मैं Zcash कैसे प्राप्त कर सकता/सकती हूँ?</a>
  <a href="#what-is-the-difference-between-zcash-and-other-cryptocurrencies" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">अन्य क्रिप्टोकरेंसी से अंतर?</a>
  <a href="#how-is-the-zcash-protocol-governed" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">प्रोटोकॉल शासन?</a>
  <a href="#where-is-my-transaction" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">मेरा लेनदेन कहाँ है?</a>
  <a href="#is-zcash-really-private" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">क्या Zcash वास्तव में निजी है?</a>
  <a href="#a-few-common-misconceptions" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">आम भ्रांतियाँ</a>
  <a href="#zcashd-stopped-working-what-do-i-run-now" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">zcashd ने काम करना बंद कर दिया?</a>
  <a href="#how-do-i-move-my-zcashd-wallet-to-zallet" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">अपना वॉलेट Zallet पर स्थानांतरित करें?</a>
  <a href="#what-is-ironwood-and-do-i-need-to-do-anything" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Ironwood क्या है?</a>
  <a href="#which-full-node-should-i-run" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">कौन-सा पूर्ण नोड?</a>
  <a href="#where-do-i-look-up-a-term-from-a-release-note" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">कोई शब्द खोजें?</a>
</div>

---

## Zcash क्या है?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash तेज़, गोपनीय लेनदेनों और कम शुल्क वाली एक डिजिटल मुद्रा है। गोपनीयता Zcash की केंद्रीय विशेषता है। इसने सभी लेनदेनों को एन्क्रिप्ट करने के लिए शून्य-ज्ञान प्रमाणों के उपयोग की शुरुआत की।

तत्काल, मोबाइल, सुरक्षित और निजी भुगतानों के लिए कई वॉलेट उपलब्ध हैं: [वॉलेट](/using-zcash/wallets)

</div>

## मैं Zcash कैसे प्राप्त कर सकता/सकती हूँ?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

आप ZEC को [कस्टोडियल एक्सचेंजों](/using-zcash/custodial-exchanges), [DEXs](/using-zcash/dex), या [केंद्रीकृत स्वैप प्लेटफ़ॉर्मों](/using-zcash/centralized-swaps) पर खरीद सकते हैं।

आप Zcash को पीयर-टू-पीयर भी खरीद सकते हैं या माइनिंग द्वारा प्राप्त कर सकते हैं।

</div>

## Zcash और अन्य क्रिप्टोकरेंसी के बीच क्या अंतर है?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash, Bitcoin या Ethereum की तुलना में मूलतः अधिक निजी है। यह तेज़ ब्लॉक समय (75 सेकंड), कम शुल्क और नियमित अपग्रेड प्रदान करता है।

उपयोगकर्ता **पारदर्शी** या **शील्डेड** लेनदेनों में से चुन सकते हैं। अधिक जानकारी के लिए [एक शील्डेड पारिस्थितिकी तंत्र](https://electriccoin.co/blog/shielded-ecosystem) देखें।

</div>

## Zcash प्रोटोकॉल का शासन कैसे होता है?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

प्रोटोकॉल का शासन **Zcash सुधार प्रस्ताव (ZIP)** प्रक्रिया द्वारा होता है। कोई भी व्यक्ति मसौदा ZIP प्रस्तुत कर सकता है। मसौदों पर समुदाय द्वारा बहस की जाती है और ZIP संपादकों द्वारा स्वीकार या अस्वीकार किया जाता है:

- [Daira Hopwood](https://twitter.com/feministPLT) (Electric Coin Company)
- [Deirdre Connolly](https://twitter.com/durumcrustulum) (Zcash Foundation)

निर्णय विनिर्देशन में लिखे जाते हैं और नेटवर्क द्वारा अपनाए जाने पर ऑन-चेन अनुमोदित होते हैं।

</div>

## मेरा लेनदेन कहाँ है?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

पहले [ब्लॉक एक्सप्लोररों के लिए हमारी मार्गदर्शिका](/guides/blockchain-explorers) पढ़ें। फिर [Zcash ब्लॉक एक्सप्लोरर](https://zcashblockexplorer.com) देखें।

लेनदेन लगभग 25 मिनट (20 ब्लॉक) बाद समाप्त हो जाते हैं और धनराशि स्वचालित रूप से वापस कर दी जाती है।

**लेनदेन दिखाई न देने के आम कारण:**

- कनेक्टिविटी का नुकसान
- लेनदेन शुल्क बहुत कम होना
- नेटवर्क पर अत्यधिक भार
- बहुत अधिक पारदर्शी इनपुट (आकार बहुत बड़ा)

**सफल होने के सुझाव:**

- स्थिर कनेक्शन का उपयोग करें
- मानक शुल्क चुकाएँ (या प्राथमिकता के लिए अधिक)
- प्रतीक्षा करें और बाद में पुनः प्रयास करें
- लेनदेन को छोटा रखने के लिए कम इनपुट का उपयोग करें

</div>

## क्या Zcash वास्तव में निजी है?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

**हाँ।** Zcash शील्डेड लेनदेनों के लिए प्रेषक, राशि और प्राप्तकर्ता डेटा को एन्क्रिप्ट करता है।

Zcash **नहीं** करता:

- मल्टीसिग्नेचर लेनदेनों को एन्क्रिप्ट करना (FROST एकीकरण लंबित है)
- पारदर्शी लेनदेनों के साथ सहसंबंधों से सुरक्षा देना
- IP पते छिपाना

आगे पढ़ें: [एक शील्डेड पारिस्थितिकी तंत्र](https://web.archive.org/web/20260903010654/https://electriccoin.co/blog/shielded-ecosystem/)

</div>

## zcashd ने काम करना बंद कर दिया, अब मैं क्या चलाऊँ?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

zcashd को सेवानिवृत्त कर दिया गया है। संस्करण 6.20.0 ने 18 जुलाई 2026 को ब्लॉक 3417100 पर स्वयं को बंद कर दिया, और उसने कभी भी Ironwood (NU6.3) का समर्थन नहीं किया, इसलिए अपग्रेड करने के लिए कोई बाद का संस्करण नहीं है।

इसके बजाय Z3 स्टैक चलाएँ। तीन प्रोग्राम उस काम को बाँटते हैं जो zcashd पहले अकेले करता था:

- **[Zebra](/zcash-tech/zebra-full-node)** चेन को सत्यापित करता है
- **[Zaino](/zcash-tech/zaino)** इसे इंडेक्स करता है और वॉलेट डेटा उपलब्ध कराता है
- **[Zallet](/zcash-tech/zallet)** आपकी धनराशि रखता है

[Zakura](/zcash-tech/zakura-node) एक वैकल्पिक पूर्ण नोड है। यह अपने ऊपर zcashd भी चलाता है, जो तब सहायक है जब अन्य सॉफ़्टवेयर अभी भी पुराने इंटरफ़ेस की अपेक्षा करता हो।

[माइग्रेशन मार्गदर्शिका](/guides/migration-guide-zcashd-to-zebrad-zallet) से शुरुआत करें।

</div>

## मैं अपना zcashd वॉलेट Zallet पर कैसे स्थानांतरित करूँ?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zallet मौजूदा `wallet.dat` को माइग्रेट करता है, इसलिए आप अपनी धनराशि और पते बनाए रखते हैं।

पहले `wallet.dat` का बैकअप लें, फिर [माइग्रेशन मार्गदर्शिका](/guides/migration-guide-zcashd-to-zebrad-zallet) का पालन करें। जब तक आप Zallet में अपना बैलेंस पुष्ट न कर लें, तब तक वह बैकअप रखें।

स्थानांतरण के बाद रोज़मर्रा के कमांड के लिए [Zallet त्वरित संदर्भ](/using-zcash/zallet-quick-reference-guide) देखें।

</div>

## Ironwood क्या है, और क्या मुझे कुछ करना होगा?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Ironwood नेटवर्क अपग्रेड NU6.3 है, जो 28 जुलाई 2026 से ब्लॉक 3,428,143 पर मेननेट पर सक्रिय है। यह संशोधित सर्किट पर निर्मित एक शील्डेड पूल जोड़ता है और पुराने [Orchard](/using-zcash/shielded-pools) पूल को बंद करता है, ताकि कोई भी सत्यापित कर सके कि कोई ZEC गढ़ा नहीं गया।

**यदि आपके पास शील्डेड धनराशि है, तो उसे स्थानांतरित करने की आवश्यकता हो सकती है।** मूल्य Orchard से केवल [टर्नस्टाइल](/zcash-tech/the-turnstile) के माध्यम से निकलता है, और वॉलेट इस स्थानांतरण को अलग-अलग समय पर तथा अलग-अलग तरीकों से संभालते हैं। हाथ से कुछ भी स्थानांतरित करने से पहले अपने वॉलेट प्रदाता से पूछें।

क्या बदला और क्यों, इसके लिए [Ironwood](/zcash-tech/ironwood) पढ़ें।

</div>

## मुझे कौन-सा पूर्ण नोड चलाना चाहिए?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

**[Zebra](/zcash-tech/zebra-full-node)** zcashd का सीधा प्रतिस्थापन है और वही नोड है जिसे माइग्रेशन मार्गदर्शिका मानकर चलती है। जब तक आपके पास ऐसा न करने का कारण न हो, इसे चुनें।

**[Zakura](/zcash-tech/zakura-node)** तेज़ सिंक और नेटिव ब्लॉक प्रूनिंग के साथ, पैमाने के लिए लक्षित दूसरा कार्यान्वयन है। यदि आपको इनकी आवश्यकता है, या आप ऐसे सॉफ़्टवेयर पर निर्भर हैं जो अभी भी zcashd से संवाद करता है, तो इसे चुनें।

दोनों एक ही चेन को सत्यापित करते हैं, इसलिए यह सर्वसम्मति के बजाय परिचालन संबंधी विकल्प है।

</div>

## मैं रिलीज़ नोट से कोई शब्द कहाँ खोजूँ?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

[Zcash लाइब्रेरी](/glossary-and-faqs/zcash-library) देखें। इसमें नोड और वॉलेट सॉफ़्टवेयर, शील्डेड पूल और वे ZIP संख्याएँ शामिल हैं जो सबसे अधिक सामने आती हैं।

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
      <td className="py-4 px-5 font-medium text-foreground">क्या Zcash एक केंद्रीकृत कॉइन है?</td>
      <td className="py-4 px-5 text-foreground">नहीं। ट्रेडमार्क समझौता Zcash Foundation या ECC को समुदाय की सहमति के विरुद्ध कार्य करने से रोकता है। शासन सिद्ध रूप से विकेंद्रीकृत है ([Messari रिपोर्ट](https://messari.io/report/decentralizing-zcash) देखें)। सामुदायिक मतदान, ZecHub और Zcash Foundation A/V Club व्यापक भागीदारी को सक्षम बनाते हैं।</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">क्या Zcash में कोई बैकडोर है?</td>
      <td className="py-4 px-5 text-foreground">नहीं। न तो Zcash और न ही हमारे बनाए किसी क्रिप्टोग्राफिक सॉफ़्टवेयर में बैकडोर है, और न कभी होगा।</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">क्या Zcash एक निगम द्वारा नियंत्रित है?</td>
      <td className="py-4 px-5 text-foreground">गलत। यद्यपि हम अनुसंधान के लिए कंपनियों के साथ साझेदारी करते हैं, Zcash विकेंद्रीकरण के प्रति प्रतिबद्ध बना हुआ है। कई स्वायत्त संगठन स्व-अभिरक्षा और गोपनीयता अधिकारों के लिए मिलकर काम करते हैं।</td>
    </tr>
    <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">अन्य प्राइवेसी कॉइनों की तुलना में Zcash की गोपनीयता सीमित है</td>
      <td className="py-4 px-5 text-foreground">नहीं। Monero/Grin-शैली की गोपनीयता डिकॉय पर निर्भर करती है (जिन्हें पराजित किया जा सकता है)। Zcash सभी शील्डेड लेनदेन डेटा को एन्क्रिप्ट करता है, इसलिए पूल में हर लेनदेन अप्रभेद्य है। [पर्याप्त निजी नहीं?](https://electriccoin.co/blog/not-private-enough-mixers-and-decoys-wont-protect-you-for-long/) देखें।</td>
    </tr>
  </tbody>
</table>

</div>

---

**अंतिम अद्यतन:** अक्टूबर 2026
**योगदान देना चाहते हैं?** [इस पृष्ठ को GitHub पर संपादित करें](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/FAQ.md)
