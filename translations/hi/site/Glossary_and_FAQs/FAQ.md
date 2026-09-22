# अक्सर पूछे जाने वाले प्रश्न

Zcash के बारे में सबसे आम प्रश्नों की एक सूची। Zcash क्लाइंट की समस्या-निवारण के लिए, कृपया [आधिकारिक समस्या-निवारण मार्गदर्शिका](https://zcash.readthedocs.io/en/latest/rtd_pages/troubleshooting_guide.html) देखें।

### त्वरित नेविगेशन

<div className="flex flex-wrap gap-2 my-4">
  <a href="#what-is-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">Zcash क्या है?</a>
  <a href="#how-can-i-acquire-zcash" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">मैं Zcash कैसे प्राप्त कर सकता/सकती हूँ?</a>
  <a href="#what-is-the-difference-between-zcash-and-other-cryptocurrencies" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">अन्य क्रिप्टोकरेंसियों से अंतर?</a>
  <a href="#how-is-the-zcash-protocol-governed" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">प्रोटोकॉल शासन?</a>
  <a href="#where-is-my-transaction" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">मेरा लेन-देन कहाँ है?</a>
  <a href="#is-zcash-really-private" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">क्या Zcash वास्तव में निजी है?</a>
  <a href="#a-few-common-misconceptions" className="inline-flex px-3 py-1.5 rounded-full border border-border bg-card text-sm no-underline hover:bg-accent">सामान्य भ्रांतियाँ</a>
</div>

---

## Zcash क्या है?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash तेज़, गोपनीय लेन-देनों और कम शुल्क वाली एक डिजिटल मुद्रा है। गोपनीयता Zcash की केंद्रीय विशेषता है। इसने सभी लेन-देनों को एन्क्रिप्ट करने के लिए zero-knowledge proofs के उपयोग की शुरुआत की।

तुरंत, मोबाइल, सुरक्षित और निजी भुगतानों के लिए कई wallet उपलब्ध हैं: [Wallets](/using-zcash/wallets)

</div>

## मैं Zcash कैसे प्राप्त कर सकता/सकती हूँ?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

आप ZEC को [कस्टोडियल एक्सचेंजों](/using-zcash/custodial-exchanges), [DEXs](/dex), या [केंद्रीकृत स्वैप प्लेटफ़ॉर्मों](/using-zcash/centralizedswaps) पर खरीद सकते हैं।

आप Zcash को peer-to-peer भी खरीद सकते हैं या mining के माध्यम से प्राप्त कर सकते हैं।

</div>

## Zcash और अन्य क्रिप्टोकरेंसियों के बीच क्या अंतर है?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

Zcash मूल रूप से Bitcoin या Ethereum की तुलना में अधिक निजी है। यह तेज़ block time (75 सेकंड), कम शुल्क और नियमित अपग्रेड प्रदान करता है।

उपयोगकर्ता **Transparent** या **Shielded** लेन-देनों में से चुन सकते हैं। अधिक जानकारी के लिए [एक Shielded इकोसिस्टम](https://electriccoin.co/blog/shielded-ecosystem) देखें।

</div>

## Zcash प्रोटोकॉल का शासन कैसे होता है?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

प्रोटोकॉल का शासन **Zcash इम्प्रूवमेंट प्रपोज़ल (ZIP)** प्रक्रिया द्वारा होता है। कोई भी व्यक्ति ZIP का मसौदा प्रस्तुत कर सकता है। मसौदों पर समुदाय द्वारा चर्चा की जाती है और ZIP संपादकों द्वारा उन्हें स्वीकार या अस्वीकार किया जाता है:

- [Daira Hopwood](https://twitter.com/feministPLT) (Electric Coin Company)
- [Deirdre Connolly](https://twitter.com/durumcrustulum) (Zcash Foundation)

निर्णय विनिर्देशन में लिखे जाते हैं और नेटवर्क द्वारा अपनाए जाने पर ऑन-चेन अनुमोदित होते हैं।

</div>

## मेरा लेन-देन कहाँ है?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

पहले [block explorer के लिए हमारी मार्गदर्शिका](/guides/blockchain-explorers) पढ़ें। फिर [Zcash Block Explorer](https://zcashblockexplorer.com) देखें।

लेन-देन लगभग 25 मिनट (20 ब्लॉक) के बाद समाप्त हो जाते हैं और धनराशि स्वचालित रूप से वापस कर दी जाती है।

**लेन-देन दिखाई न देने के सामान्य कारण:**

- कनेक्टिविटी का खो जाना
- लेन-देन शुल्क बहुत कम होना
- नेटवर्क ओवरलोड
- बहुत अधिक transparent इनपुट (आकार बहुत बड़ा)

**सफल होने के सुझाव:**

- एक स्थिर कनेक्शन का उपयोग करें
- मानक शुल्क दें (या प्राथमिकता के लिए अधिक)
- प्रतीक्षा करें और बाद में पुनः प्रयास करें
- लेन-देन को छोटा रखने के लिए कम इनपुट का उपयोग करें

</div>

## क्या Zcash वास्तव में निजी है?

<div className="rounded-2xl border border-border bg-card p-5 my-4">

**हाँ।** Zcash shielded लेन-देनों के लिए प्रेषक, राशि और प्राप्तकर्ता के डेटा को एन्क्रिप्ट करता है।

Zcash **नहीं** करता:

- मल्टीसिग्नेचर लेन-देनों को एन्क्रिप्ट करना (FROST इंटीग्रेशन लंबित है)
- transparent लेन-देनों के साथ सहसंबंधों से सुरक्षा प्रदान करना
- IP पते छिपाना

आगे पढ़ें: [एक शील्डेड पारिस्थितिकी तंत्र](https://web.archive.org/web/20260903010654/https://electriccoin.co/blog/shielded-ecosystem/)

</div>

## कुछ सामान्य भ्रांतियाँ

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
      <td className="py-4 px-5 text-foreground">नहीं। एक ट्रेडमार्क समझौता Zcash Foundation या ECC को समुदाय की सहमति के विरुद्ध कार्य करने से रोकता है। शासन सिद्ध रूप से विकेंद्रीकृत है (देखें [Messari रिपोर्ट](https://messari.io/report/decentralizing-zcash))। सामुदायिक मतदान, ZecHub, और Zcash Foundation A/V Club सभी व्यापक भागीदारी को सक्षम बनाते हैं।</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">क्या Zcash में कोई backdoor है?</td>
      <td className="py-4 px-5 text-foreground">नहीं। न तो Zcash और न ही हमारे द्वारा बनाया गया कोई क्रिप्टोग्राफ़िक सॉफ़्टवेयर backdoor रखता है, और न ही कभी रखेगा।</td>
    </tr>
    <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">क्या Zcash किसी निगम द्वारा नियंत्रित है?</td>
      <td className="py-4 px-5 text-foreground">गलत। हालाँकि हम अनुसंधान के लिए कंपनियों के साथ साझेदारी करते हैं, Zcash विकेंद्रीकरण के लिए प्रतिबद्ध बना हुआ है। अनेक स्वायत्त संगठन स्व-अभिरक्षा और गोपनीयता अधिकारों की दिशा में मिलकर काम करते हैं।</td>
    </tr>
    <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
      <td className="py-4 px-5 font-medium text-foreground">Zcash में अन्य privacy coins की तुलना में सीमित गोपनीयता है</td>
      <td className="py-4 px-5 text-foreground">नहीं। Monero/Grin-शैली की गोपनीयता decoys पर निर्भर करती है (जिन्हें विफल किया जा सकता है)। Zcash सभी shielded लेन-देन डेटा को एन्क्रिप्ट करता है, इसलिए pool में हर लेन-देन अप्रभेद्य होता है। देखें [पर्याप्त निजी नहीं?](https://electriccoin.co/blog/not-private-enough-mixers-and-decoys-wont-protect-you-for-long/)।</td>
    </tr>
  </tbody>
</table>

</div>

---

**अंतिम अद्यतन:** मार्च 2026
**योगदान देना चाहते हैं?** [GitHub पर इस पृष्ठ को संपादित करें](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/FAQ.md)
