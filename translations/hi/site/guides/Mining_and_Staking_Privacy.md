<a href="https://github.com/zechub/zechub/edit/main/site/guides/Mining_and_Staking_Privacy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# माइनिंग और स्टेकिंग गोपनीयता

आपका माइनर भुगतान और आपका finalizer एक ही चीज़ नहीं हैं। चेन उन्हें कभी नहीं जोड़ती। यह उपयोगी है, और इसे बर्बाद करना आसान है।

<div className="grid gap-3 my-5 sm:grid-cols-3">
  <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 dark:border-emerald-700 dark:bg-emerald-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">माइनर</div>
    <div className="mt-1 text-lg font-semibold text-emerald-950 dark:text-emerald-50">पारदर्शी भुगतान</div>
    <p className="mt-1 text-sm text-emerald-900 dark:text-emerald-100">Coinbase एक Zcash पते पर भुगतान करता है। t-address का इतिहास सार्वजनिक होता है।</p>
  </div>
  <div className="rounded-xl border border-blue-300 bg-blue-50 p-4 dark:border-blue-700 dark:bg-blue-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">Finalizer</div>
    <div className="mt-1 text-lg font-semibold text-blue-950 dark:text-blue-50">zfinv1 कुंजी</div>
    <p className="mt-1 text-sm text-blue-900 dark:text-blue-100">एक ed25519 कुंजी। यह वोट पर हस्ताक्षर करती है। यह Zcash पता नहीं है।</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">Bond</div>
    <div className="mt-1 text-lg font-semibold text-amber-950 dark:text-amber-50">Shielded स्टेक</div>
    <p className="mt-1 text-sm text-amber-900 dark:text-amber-100">स्टेकिंग पूल में रहता है। एक लक्ष्य finalizer को निर्दिष्ट करता है।</p>
  </div>
</div>

## वह क्रम जो महत्वपूर्ण है

<div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-600 dark:bg-slate-800">
  <div className="flex flex-wrap items-center gap-2 font-semibold">
    <span className="rounded-full bg-emerald-600 px-3 py-1 text-sm text-white">1 माइन करें</span>
    <span className="text-slate-400">→</span>
    <span className="rounded-full bg-blue-600 px-3 py-1 text-sm text-white">2 Shield करें</span>
    <span className="text-slate-400">→</span>
    <span className="rounded-full bg-amber-600 px-3 py-1 text-sm text-white">3 Bond करें</span>
  </div>
  <p className="mt-3 mb-0 text-slate-800 dark:text-slate-100">Shield चरण छोड़ दें और निजी चरण कभी नहीं होता। Bond किसी पारदर्शी coinbase को मिटाता नहीं है।</p>
</div>

## क्या सार्वजनिक है

| चीज़ | सार्वजनिक? | क्यों |
|---|---|---|
| माइनर t-address और coinbase इतिहास | हाँ | सामान्य पारदर्शी आउटपुट |
| Finalizer कुंजी और zfinv1 | हाँ, roster पर आने के बाद | वोट सत्यापित करने के लिए ऐसा होना ज़रूरी है |
| वोटिंग शक्ति और रिवॉर्ड बैंक | हाँ | finalizer कुंजी के विरुद्ध प्रकाशित |
| किस पारदर्शी पते ने bond को फंड किया | नहीं, Shield के बाद | bond shielded नोट्स खर्च करता है |
| आपके माइनर से आपके finalizer का लिंक | चेन पर नहीं | प्रोटोकॉल में इसे लिखने वाला कुछ नहीं है |

## अपने लिए स्टेक करें, या किसी और के लिए

<div className="grid gap-3 my-4 sm:grid-cols-2">
  <div className="rounded-xl border border-slate-300 bg-white p-4 dark:border-slate-600 dark:bg-slate-800">
    <div className="font-semibold text-slate-900 dark:text-slate-50">अपने finalizer को Bond करें</div>
    <p className="mt-2 mb-0 text-sm text-slate-700 dark:text-slate-200">सबसे सरल। आप operator भूमिका और bond अपने पास रखते हैं। फिर भी कोई पर्यवेक्षक केवल चेन डेटा से यह सिद्ध नहीं कर सकता कि t-address और zfinv1 एक ही व्यक्ति के हैं।</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="font-semibold text-amber-950 dark:text-amber-50">किसी अन्य सदस्य को Bond करें</div>
    <p className="mt-2 mb-0 text-sm text-amber-900 dark:text-amber-100">वोटिंग शक्ति उनकी कुंजी के अंतर्गत दिखाई देती है। वे 10% active-finalizer कमीशन अर्जित करते हैं। Bond पर मिलने वाले 90% आपके पास रहते हैं। यही वह पैटर्न है जो स्पष्ट अनुमान को तोड़ता है।</p>
  </div>
</div>

एक समूह अलग-अलग payout पतों पर माइन कर सकता है, Shield कर सकता है, और सदस्यों के बीच Bond कर सकता है। इससे "यह माइनर ही यह finalizer है" कहना बहुत कठिन हो जाता है। इससे यह नहीं छिपता कि finalizer कौन हैं, और न ही माइनिंग छिपती है।

## यह क्या नहीं करता

<div className="my-4 rounded-xl border border-rose-300 bg-rose-50 p-4 dark:border-rose-700 dark:bg-rose-950">
  <div className="font-semibold text-rose-700 dark:text-rose-300">छिपा हुआ नहीं</div>
  <ul className="mt-2 mb-0 text-rose-950 dark:text-rose-100">
    <li>Finalizer कौन हैं</li>
    <li>हर एक के पास कितनी वोटिंग शक्ति है</li>
    <li>आपका पारदर्शी माइनिंग इतिहास</li>
    <li>चेन के बाहर बनाया गया लिंक: एक IP, एक payout पैटर्न, एक operator</li>
  </ul>
</div>

लक्ष्य zfinv1 स्टेकिंग कार्रवाई के भीतर होता है। यहाँ गोपनीयता धन के स्रोत के बारे में है, गंतव्य कुंजी को छिपाने के बारे में नहीं।

## संक्षिप्त संस्करण

माइन करें। Shield करें। फिर Bond करें। माइनर पता और finalizer कुंजी असंबद्ध रहते हैं, जब तक आप स्वयं उन्हें न जोड़ दें।
