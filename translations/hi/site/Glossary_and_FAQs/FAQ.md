# अक्सर पूछे जाने वाले प्रश्न

Zcash के बारे में सबसे आम प्रश्नों की एक सूची। Zcash client की troubleshooting के लिए, कृपया [आधिकारिक troubleshooting guide](https://zcash.readthedocs.io/en/latest/rtd_pages/troubleshooting_guide.html) देखें।

### त्वरित नेविगेशन
[Zcash क्या है?](#what-is-zcash) | [Zcash कैसे प्राप्त करें?](#acquire) | [अन्य cryptocurrencies से अंतर?](#difference) | [Protocol governance?](#governance) | [मेरा transaction कहाँ है?](#transaction) | [क्या Zcash सचमुच private है?](#privacy) | [आम गलतफहमियाँ](#misconceptions)

---

## Zcash क्या है?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
Zcash एक डिजिटल मुद्रा है जिसमें तेज़, गोपनीय transactions और कम fees होती हैं। Privacy, Zcash की केंद्रीय विशेषता है। इसने सभी transactions को encrypt करने के लिए zero-knowledge proofs के उपयोग की अग्रणी शुरुआत की।  

तुरंत, mobile, सुरक्षित और private payments के लिए कई wallets उपलब्ध हैं: [मोबाइल वॉलेट्स](https://z.cash/wallets/)
</div>

## मैं Zcash कैसे प्राप्त कर सकता/सकती हूँ?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
आप cryptocurrency [एक्सचेंजों](https://z.cash/exchanges) पर ZEC खरीद सकते हैं।  
आप Zcash को peer-to-peer भी खरीद सकते हैं या mining के माध्यम से प्राप्त कर सकते हैं।
</div>

## Zcash और अन्य cryptocurrencies के बीच क्या अंतर है?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
Zcash, मूल रूप से Bitcoin या Ethereum की तुलना में अधिक private है। यह तेज़ block times (75 seconds), कम fees, और नियमित upgrades प्रदान करता है।  

Users **Transparent** या **Shielded** transactions के बीच चुन सकते हैं। अधिक जानकारी के लिए [एक Shielded Ecosystem](https://bitzecbzc.github.io/blog/shielded-ecosystem/index.html) देखें।
</div>

## Zcash protocol का governance कैसे होता है?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
Protocol का governance **Zcash Improvement Proposal (ZIP)** प्रक्रिया द्वारा किया जाता है। कोई भी व्यक्ति draft ZIP जमा कर सकता है। Drafts पर community द्वारा चर्चा की जाती है और ZIP editors द्वारा उन्हें स्वीकार या अस्वीकार किया जाता है:

- [Daira Hopwood](https://twitter.com/feministPLT) (Electric Coin Company)  
- [Deirdre Connolly](https://twitter.com/durumcrustulum) (Zcash Foundation)

निर्णयों को specification में लिखा जाता है और जब network उन्हें अपनाता है, तब उन्हें on-chain अनुमोदित किया जाता है।
</div>

## मेरा Transaction कहाँ है?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
पहले [ब्लॉक एक्सप्लोरर्स के लिए हमारी guide](https://zechub.notion.site/Zcash-Blockchain-Explorer-4b4d970cb53e474989932c6e1a78b629) पढ़ें। फिर [Zcash Block Explorer](https://zcashblockexplorer.com) देखें।  

Transactions लगभग 25 मिनट (20 blocks) के बाद expire हो जाते हैं और funds अपने-आप वापस लौट जाते हैं।  

**सामान्य कारण जिनकी वजह से कोई transaction दिखाई नहीं दे सकता:**
- कनेक्टिविटी का खो जाना
- Transaction fee बहुत कम होना
- Network overload
- बहुत अधिक transparent inputs (size बहुत बड़ा होना)

**सफल होने के लिए सुझाव:**
- स्थिर connection का उपयोग करें
- standard fee चुकाएँ (या priority के लिए अधिक)
- प्रतीक्षा करें और बाद में फिर से प्रयास करें
- transaction को छोटा रखने के लिए कम inputs का उपयोग करें
</div>

## क्या Zcash सचमुच Private है?

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
**हाँ।** Zcash shielded transactions के लिए sender, amount, और recipient data को encrypt करता है।  

Zcash **यह नहीं करता**:
- multisignature transactions को encrypt नहीं करता (FROST integration लंबित है)
- transparent transactions के साथ correlations से सुरक्षा नहीं देता
- IP addresses नहीं छिपाता

आगे पढ़ें: [एक Shielded Ecosystem](https://electriccoin.co/blog/shielded-ecosystem)
</div>

## कुछ आम गलतफहमियाँ

<div className="overflow-x-auto my-8 rounded-3xl border border-border bg-card p-6">
  <table className="w-full border-collapse rounded-2xl overflow-hidden">
    <thead>
      <tr className="border-b border-border bg-amber-100 dark:bg-zinc-800">
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">गलतफहमी</th>
        <th className="py-6 px-6 text-left font-bold text-amber-800 dark:text-white">सही उत्तर</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">क्या Zcash एक centralised coin है?</td>
        <td className="py-5 px-6 text-foreground">नहीं। एक trademark agreement, Zcash Foundation या ECC को community consensus के खिलाफ कार्य करने से रोकता है। Governance के decentralised होने का प्रमाण मौजूद है (देखें [Messari report](https://messari.io/report/decentralizing-zcash))। Community polls, ZecHub, और Zcash Foundation A/V Club सभी व्यापक भागीदारी को सक्षम बनाते हैं।</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">क्या Zcash में backdoor है?</td>
        <td className="py-5 px-6 text-foreground">नहीं। न तो Zcash और न ही हमारे द्वारा बनाए गए किसी cryptographic software में backdoor है, और न कभी होगा।</td>
      </tr>
      <tr className="border-b border-border hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">क्या Zcash किसी corporation द्वारा नियंत्रित है?</td>
        <td className="py-5 px-6 text-foreground">गलत। यद्यपि हम research के लिए companies के साथ साझेदारी करते हैं, Zcash decentralisation के प्रति प्रतिबद्ध रहता है। कई autonomous organisations self-custody और privacy rights की दिशा में मिलकर काम करती हैं।</td>
      </tr>
      <tr className="hover:bg-amber-50 dark:hover:bg-zinc-700">
        <td className="py-5 px-6 font-medium text-foreground">अन्य privacy coins की तुलना में Zcash की privacy सीमित है</td>
        <td className="py-5 px-6 text-foreground">नहीं। Monero/Grin-शैली की privacy decoys पर निर्भर करती है (जिन्हें परास्त किया जा सकता है)। Zcash सभी shielded transaction data को encrypt करता है, इसलिए pool में हर transaction अलग पहचान में नहीं आता। देखें [पर्याप्त private नहीं?](https://electriccoin.co/blog/not-private-enough-mixers-and-decoys-wont-protect-you-for-long/)।</td>
      </tr>
    </tbody>
  </table>
</div>

---

**अंतिम अद्यतन:** March 2026  
**योगदान करना चाहते हैं?** [GitHub पर इस पेज को संपादित करें](https://github.com/ZecHub/zechub/edit/main/site/Glossary_and_FAQs/FAQ.md)
