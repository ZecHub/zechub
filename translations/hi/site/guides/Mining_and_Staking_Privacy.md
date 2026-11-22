<a href="https://github.com/zechub/zechub/edit/main/site/guides/Mining_and_Staking_Privacy.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="पेज संपादित करें"/>
</a>

# माइनिंग (mining) और स्टेकिंग (staking) में गोपनीयता (privacy)

आपका माइनर (miner) पेआउट और आपका फाइनलाइज़र (finalizer) एक ही चीज़ नहीं हैं। चेन (chain) इन्हें कभी आपस में नहीं जोड़ती।

<div className="grid gap-3 my-5 sm:grid-cols-3">
  <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 dark:border-emerald-700 dark:bg-emerald-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">माइनर</div>
    <div className="mt-1 text-lg font-semibold text-emerald-950 dark:text-emerald-50">ट्रांसपेरेंट (transparent) पेआउट</div>
    <p className="mt-1 text-sm text-emerald-900 dark:text-emerald-100">Coinbase एक Zcash एड्रेस (address) पर भुगतान करता है। किसी t-एड्रेस का इतिहास सार्वजनिक होता है।</p>
  </div>
  <div className="rounded-xl border border-blue-300 bg-blue-50 p-4 dark:border-blue-700 dark:bg-blue-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">फाइनलाइज़र</div>
    <div className="mt-1 text-lg font-semibold text-blue-950 dark:text-blue-50">कुंजी zfinv1</div>
    <p className="mt-1 text-sm text-blue-900 dark:text-blue-100">एक ed25519 कुंजी। यह वोटों पर हस्ताक्षर करती है। यह कोई Zcash एड्रेस नहीं है।</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-300">बॉन्ड (bond)</div>
    <div className="mt-1 text-lg font-semibold text-amber-950 dark:text-amber-50">शील्डेड (shielded) स्टेक</div>
    <p className="mt-1 text-sm text-amber-900 dark:text-amber-100">यह स्टेकिंग पूल (pool) में रहता है। यह एक लक्ष्य फाइनलाइज़र को नामित करता है।</p>
  </div>
</div>

## क्रम जो मायने रखता है

<div className="my-4 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-600 dark:bg-slate-800">
  <div className="flex flex-wrap items-center gap-2 font-semibold">
    <span className="rounded-full bg-emerald-600 px-3 py-1 text-sm text-white">1 माइन</span>
    <span className="text-slate-400">→</span>
    <span className="rounded-full bg-blue-600 px-3 py-1 text-sm text-white">2 शील्ड</span>
    <span className="text-slate-400">→</span>
    <span className="rounded-full bg-amber-600 px-3 py-1 text-sm text-white">3 बॉन्ड</span>
  </div>
  <p className="mt-3 mb-0 text-slate-800 dark:text-slate-100">यदि आप शील्ड करना छोड़ देते हैं, तो निजी चरण कभी होता ही नहीं। बॉन्ड किसी ट्रांसपेरेंट कॉइनबेस को मिटाता नहीं है।</p>
</div>

## क्या सार्वजनिक है

| चीज़ | सार्वजनिक? | क्यों |
|---|---|---|
| माइनर का t-एड्रेस और कॉइनबेस इतिहास | हाँ | सामान्य ट्रांसपेरेंट आउटपुट |
| फाइनलाइज़र कुंजी और zfinv1 | हाँ, रोस्टर पर आने के बाद | वोटों के सत्यापन के लिए ऐसा होना ज़रूरी है |
| वोटिंग पावर और रिवॉर्ड बैंक | हाँ | फाइनलाइज़र कुंजी के सामने प्रकाशित किया जाता है ताकि स्टेक के वितरण का ऑडिट किया जा सके |
| किस ट्रांसपेरेंट एड्रेस ने बॉन्ड को फंड किया | नहीं, शील्ड करने के बाद | बॉन्ड शील्डेड नोट (note) खर्च करता है |
| आपके माइनर से आपके फाइनलाइज़र तक का संबंध | चेन पर नहीं | प्रोटोकॉल में कुछ भी इसे दर्ज नहीं करता |

स्टेक की गई राशियाँ जानबूझकर प्रकट की जाती हैं। डिज़ाइन के लिए यह आवश्यक है कि कुल स्टेक की गई राशि और फाइनलाइज़र के बीच उसका वितरण सार्वजनिक रूप से जाँचा जा सके। क्वांटाइज़ेशन (10 की घातें) और निश्चित स्टेकिंग विंडो यह सीमित करते हैं कि व्यक्तिगत समय या पैटर्न की कितनी जानकारी लीक होती है, और साथ ही वह ऑडिट भी संभव रहता है। अनस्टेक्ड Orchard बैलेंस निजी रहते हैं; स्टेकिंग जानबूझकर किया गया प्रकटीकरण है।

## स्वयं को स्टेक करें, या किसी और को

<div className="grid gap-3 my-4 sm:grid-cols-2">
  <div className="rounded-xl border border-slate-300 bg-white p-4 dark:border-slate-600 dark:bg-slate-800">
    <div className="font-semibold text-slate-900 dark:text-slate-50">अपने स्वयं के फाइनलाइज़र को बॉन्ड</div>
    <p className="mt-2 mb-0 text-sm text-slate-700 dark:text-slate-200">सबसे सरल। ऑपरेटर की भूमिका और बॉन्ड दोनों आपके पास रहते हैं। कोई पर्यवेक्षक फिर भी केवल चेन डेटा से यह साबित नहीं कर सकता कि t-एड्रेस और zfinv1 एक ही व्यक्ति के हैं।</p>
  </div>
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
    <div className="font-semibold text-amber-950 dark:text-amber-50">किसी अन्य सदस्य को बॉन्ड</div>
    <p className="mt-2 mb-0 text-sm text-amber-900 dark:text-amber-100">वोटिंग पावर उनकी कुंजी के अंतर्गत दिखाई देती है। वे 10% सक्रिय-फाइनलाइज़र कमीशन कमाते हैं। बॉन्ड पर जमा होने वाला 90% आपके पास रहता है। इससे यह स्पष्ट अनुमान टूट जाता है कि ट्रांसपेरेंट पेआउट प्राप्त करने वाला माइनर वही व्यक्ति है जो फाइनलाइज़र चला रहा है।</p>
  </div>
</div>

एक समूह अलग-अलग पेआउट एड्रेस पर माइनिंग कर सकता है, शील्ड कर सकता है, और सदस्यों के बीच बॉन्ड कर सकता है। इससे चेन डेटा के आधार पर “यह माइनर ही यह फाइनलाइज़र है” का दावा करना कहीं अधिक कठिन हो जाता है। यह इस बात को नहीं छिपाता कि फाइनलाइज़र कौन हैं, और यह माइनिंग को भी नहीं छिपाता।

## यह क्या नहीं करता

<div className="my-4 rounded-xl border border-rose-300 bg-rose-50 p-4 dark:border-rose-700 dark:bg-rose-950">
  <div className="font-semibold text-rose-700 dark:text-rose-300">छिपा हुआ नहीं</div>
  <ul className="mt-2 mb-0 text-rose-950 dark:text-rose-100">
    <li>फाइनलाइज़र कौन हैं</li>
    <li>प्रत्येक के पास कितनी वोटिंग पावर है</li>
    <li>आपका ट्रांसपेरेंट माइनिंग इतिहास</li>
    <li>ऑफ-चेन आपके द्वारा बनाया गया कोई संबंध: एक IP, एक पेआउट पैटर्न, एक ऑपरेटर</li>
  </ul>
</div>

लक्ष्य zfinv1 स्टेकिंग एक्शन के भीतर होता है। यहाँ गोपनीयता फंड के स्रोत के बारे में है, गंतव्य कुंजी को छिपाने के बारे में नहीं।

## संक्षिप्त सार

माइन करें। शील्ड करें। फिर बॉन्ड करें। माइनर एड्रेस और फाइनलाइज़र कुंजी तब तक असंबंधित रहते हैं जब तक आप स्वयं उन्हें आपस में नहीं जोड़ते।
