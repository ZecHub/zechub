# माइग्रेशन गाइड: zcashd से Zebrad/Zallet तक

*Electric Coin Company (ECC)* / *Zodl* द्वारा अनुरक्षित पारंपरिक zcashd फुल नोड (full node) की जगह अब Zebra और Zallet ने ले ली है। zcashd 18 जुलाई 2026 को अपने एंड-ऑफ-सपोर्ट हॉल्ट पर पहुँच गया और अब नहीं चलता।

- Zebra Zcash Foundation द्वारा विकसित Zcash प्रोटोकॉल का एक आधुनिक Rust इम्प्लीमेंटेशन है
- Zallet Zodl द्वारा विकसित एक हल्का वॉलेट (wallet) है, जिसे Zebra नोड (node) के साथ सहजता से काम करने के लिए बनाया गया है

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![आरेख: zcashd का नोड कार्यों के लिए zebrad और वॉलेट कार्यों के लिए Zallet में विभाजन](/content-images/SJNBsSYTel-dfd19f34e4.webp)
</div>

यह गाइड आपको **zcashd** से **Zebrad** और **Zallet** तक माइग्रेशन की पूरी प्रक्रिया से परिचित कराती है, जिसमें सेटअप, वॉलेट इम्पोर्ट और माइग्रेशन की आम समस्याओं का निवारण शामिल है।

---

## zcashd ने 18 जुलाई 2026 को चलना बंद कर दिया

**इसका क्या अर्थ है**

- zcashd 18 जुलाई 2026 को अपने एंड-ऑफ-सपोर्ट हॉल्ट पर पहुँच गया। यह फिर कभी चेन (chain) टिप तक सिंक नहीं होगा, और यह फंड भेज या प्राप्त नहीं कर सकता। यह हो चुका है, केवल नियोजित नहीं।
- zcashd के दो काम अब बँट गए हैं: **zebrad** फुल नोड है, और **Zallet** वॉलेट है।
- Zallet **बीटा** में है। रिलीज़ के बीच ब्रेकिंग बदलाव हो सकते हैं, और कुछ zcashd JSON-RPC मेथड अभी लागू नहीं हुए हैं। किसी विशेष कॉल पर निर्भर होने से पहले [मेथड स्टेटस मैट्रिक्स](https://zcash.github.io/zallet/) देखें।
- यदि आपके पास अब भी **Sprout** फंड हैं, तो पहले चरण 6 की चेतावनी पढ़ें। Zallet Sprout पूल (pool) का समर्थन नहीं करता, और उन फंड को स्थानांतरित करने के सामान्य तरीके के लिए चालू zcashd की आवश्यकता थी।

**माइग्रेट क्यों करें - डेप्रिकेशन से परे**

डेप्रिकेशन को अलग रखें, तब भी माइग्रेट करने के ठोस कारण हैं:
- सुरक्षा और मज़बूती: Rust की मेमोरी-सेफ्टी और आधुनिक टूलिंग कमज़ोरियों के जोखिम को कम करती है।
- प्रदर्शन और दक्षता: Zebrad को समानांतरता, अधिक कुशल संसाधन उपयोग और तेज़ सिंक के लिए डिज़ाइन किया गया है।
- मॉड्यूलर आर्किटेक्चर: नोड लॉजिक (Zebrad) को वॉलेट UI (Zallet) से अलग करने से स्पष्ट सीमाएँ और बेहतर अपग्रेड पथ मिलते हैं।
- भविष्य के इकोसिस्टम के साथ अनुकूलता: उपकरण (tools), सुधार और Zcash का बाकी इकोसिस्टम अधिकाधिक Zebrad/Zallet को लक्ष्य करेंगे।
- मन की शांति: एक डेप्रिकेटेड, असमर्थित घटक चलाते रहने में फँसने से बचें।

### अब माइग्रेशन गाइड में आगे बढ़ते हैं

**1. हर चीज़ का बैकअप**
* अपने zcashd नोड से अपनी wallet.dat (या कोई अन्य वॉलेट फ़ाइल / की स्टोर) का बैकअप लें।

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (1)](/content-images/SJ_0mUtTxg-1441185a72.svg)
</div>

* अपनी zcash.conf और कोई भी कस्टम सेटिंग सहेजें।
* आपके द्वारा उपयोग की जाने वाली किसी भी RPC स्क्रिप्ट या ऑटोमेशन की एक प्रति निर्यात करें।
* सत्यापित करें कि आपके बैकअप मान्य हैं (उदाहरण के लिए, किसी अन्य वातावरण में उन्हें खोलने या जाँचने का प्रयास करें)।
* देखें कि आप वर्तमान में किन JSON-RPC मेथड पर निर्भर हैं।
* [Zcash सपोर्ट साइट](https://z.cash/support/zcashd-deprecation/) पर अनुरक्षित नियोजित संगतता तालिका से तुलना करें 
* बदलावों या अनुपलब्ध मेथड के लिए तैयार रहें (कुछ के लिए वर्कअराउंड या अनुकूलन की आवश्यकता हो सकती है)।

**2. सिस्टम आवश्यकताएँ और डिस्क स्पेस**
* डिस्क स्पेस वह आवश्यकता है जिसे लोग कम आँकते हैं। Zcash चेन अगस्त 2026 में **270 GB** पार कर गई, इसलिए कम से कम **300 GB** खाली स्थान रखें, और संभव हो तो SSD पर।
* सुनिश्चित करें कि आपकी मशीन में स्थिर नेटवर्क, CPU और RAM हो।
* एक इंटरनेट कनेक्शन 
* यदि आप सोर्स से कंपाइल करने की योजना बना रहे हैं, तो Rust और Cargo इंस्टॉल रखें।

**3. Zebrad का इंस्टॉलेशन / सेटअप**
आप या तो प्रीबिल्ट बाइनरी डाउनलोड कर सकते हैं या सोर्स से बिल्ड कर सकते हैं।
* Zcash Foundation Zebra के लिए रिलीज़ और बाइनरी प्रकाशित करता है। उदाहरण के लिए, आप इंस्टॉल स्क्रिप्ट का उपयोग कर सकते हैं या अपने OS के लिए उपयुक्त बाइनरी डाउनलोड कर सकते हैं।

* ध्यान दें कि हाल के Zebra संस्करणों में, [Docker में RPC एंडपॉइंट अब डिफ़ॉल्ट रूप से सक्षम नहीं है।](https://zfnd.org/zebra-2-3-0-release/)

**विकल्प A: प्रीबिल्ट बाइनरी के माध्यम से इंस्टॉलेशन**  
**Linux**/**macOS** पर:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (2)](/content-images/HJhYu8Y6el-d2198f22c9.svg)
</div>

यह zebrad का नवीनतम स्थिर संस्करण इंस्टॉल करता है।

**विकल्प B: सोर्स से बिल्ड**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (3)](/content-images/Syg8FUK6eg-b4557e52e0.svg)
</div>

बिल्ड करने के बाद, बाइनरी को अपने पाथ में ले जाएँ:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![माइग्रेशन 11](/content-images/BJ0zjLY6ll-f77354d701.webp)
</div>

**4. कॉन्फ़िगरेशन और लॉन्च**  
एक डिफ़ॉल्ट कॉन्फ़िग जनरेट करें:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration2](/content-images/HJV1C8tTxx-5823395651.webp)
</div>

**zebrad.toml** को अपनी प्राथमिकताओं के अनुसार संपादित करें (लिसन एड्रेस (listen address), पोर्ट, स्टेट डायरेक्टरी, कैशिंग)।

**नोड शुरू करें:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/H1KPkvt6gl-864c48ca40.webp)
</div>

नोड जेनेसिस से सिंक होना शुरू करेगा - हार्डवेयर और नेटवर्क के आधार पर कई घंटे (या अधिक) लगने की अपेक्षा करें।

**5. Zallet (वॉलेट) का इंस्टॉलेशन / सेटअप**

Zallet को zcashd के वॉलेट वाले हिस्से की जगह लेने के लिए डिज़ाइन किया गया है।

बाइनरी के लिए Zallet GitHub / रिलीज़ पेज देखें।

**या सोर्स से बिल्ड करें:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/SyUFxvFTex-5bb10ee1d3.webp)
</div>

* GUI या CLI लॉन्च करें (जैसा आपका इंस्टॉलेशन प्रदान करता है)।
* इसे RPC या API एंडपॉइंट के माध्यम से अपने लोकल Zebrad नोड से कनेक्ट करने के लिए कॉन्फ़िगर करें।

**6. आपके zcashd वॉलेट का Zallet में इम्पोर्ट**

इसके लिए आपको चालू zcashd की आवश्यकता नहीं है। Zallet `wallet.dat` फ़ाइल को सीधे पढ़ता है, जो महत्वपूर्ण है क्योंकि zcashd को अब शुरू नहीं किया जा सकता।

> **`wallet.dat` को सुरक्षित रखें।** माइग्रेशन ऐसी किसी भी चीज़ को इम्पोर्ट करने के बजाय रिपोर्ट करता है जिसे वह Zallet वॉलेट में प्रदर्शित नहीं कर सकता, और वह की मटीरियल फिर केवल `wallet.dat` में मौजूद रहता है। माइग्रेट करने के बाद इसे डिलीट न करें।

पहले `zallet init-wallet-encryption` चलाएँ। Zallet की मटीरियल को एक age आइडेंटिटी पर एन्क्रिप्ट करता है, और किसी भी की के इम्पोर्ट होने से पहले उस आइडेंटिटी का मौजूद होना ज़रूरी है।

फिर अपने कॉन्फ़िग और अपने वॉलेट को कन्वर्ट करें:

```bash
# translate zcash.conf into zallet.toml
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir -o /path/to/zallet/datadir/zallet.toml

# import wallet.dat into Zallet's wallet.db
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet` केवल `zcashd-import` फ़ीचर वाले बिल्ड में मौजूद होता है, और `wallet.dat` को पढ़ने के लिए Berkeley DB 6.2 की `db_dump` यूटिलिटी की आवश्यकता होती है, जो वही संस्करण है जिसका zcashd उपयोग करता था। यदि आपके पास एक से अधिक वॉलेट फ़ाइल हैं, तो प्रत्येक फ़ाइल के लिए कमांड एक बार चलाएँ और बाद के रन में `--allow-multiple-wallet-imports` जोड़ें; प्रत्येक फ़ाइल अकाउंट का अपना अलग समूह बन जाती है। आपके `rpcuser` और `rpcpassword` आगे नहीं ले जाए जाते, क्योंकि Zallet का JSON-RPC डिफ़ॉल्ट रूप से कुकी ऑथेंटिकेशन का उपयोग करता है; यदि आपको इनकी आवश्यकता है तो `zallet add-rpc-user` के साथ क्रेडेंशियल जोड़ें।

**क्या स्थानांतरित होता है**

* मेनेमोनिक सीड और उनसे व्युत्पन्न की, जिनके अकाउंट zcashd वॉलेट से मेल खाने के लिए फिर से बनाए जाते हैं
* स्टैंडअलोन रूप से इम्पोर्ट की गई Sapling स्पेंडिंग की (spending key) और ट्रांसपेरेंट (transparent) की
* ट्रांसपेरेंट वॉच-ओनली एंट्री जिनमें उनकी पब्लिक की या रिडीम स्क्रिप्ट शामिल है
* अकाउंट बर्थडे, ताकि चेन स्कैनिंग सही ऊँचाई से शुरू हो

**क्या स्थानांतरित नहीं होता।** इन्हें इम्पोर्ट करने के बजाय गिनती के साथ रिपोर्ट किया जाता है:

* **Sprout स्पेंडिंग की और फंड।** Zallet Sprout पूल का समर्थन नहीं करता। प्रलेखित तरीका यह था कि zcashd को रिटायर करने से पहले उसका उपयोग करके Sprout फंड बाहर निकाले जाएँ, और अब यह संभव नहीं है। यदि यह आपको प्रभावित करता है, तो कुछ भी और करने से पहले [Zcash R&D Discord](https://discord.gg/xpzPR53xtU) या [कम्युनिटी फ़ोरम](https://forum.zcashcommunity.com/) पर पूछें।
* एड्रेस (address) बुक एंट्री
* पब्लिक की या रिडीम स्क्रिप्ट के बिना संग्रहीत वॉच-ओनली एंट्री, और अनकम्प्रेस्ड पब्लिक की वाली एंट्री
* Regtest वॉलेट

**बाद में बैकअप।** केवल मेनेमोनिक पूरा बैकअप नहीं है, क्योंकि इम्पोर्ट की गई की केवल वॉलेट डेटाबेस में मौजूद होती हैं। `wallet.db`, `keystore.encryption_identity` विकल्प द्वारा नामित age एन्क्रिप्शन (encryption) आइडेंटिटी फ़ाइल, और अपने मेनेमोनिक फ़्रेज़ की सुरक्षित प्रतियाँ रखें, और मूल `wallet.dat` भी संभालकर रखें। ध्यान दें कि `wallet.db` स्वयं एन्क्रिप्टेड नहीं है: इसमें आपका लेनदेन (transaction) इतिहास और व्यूइंग की (viewing key) बिना एन्क्रिप्शन के रखी होती हैं, इसलिए बैकअप को किसी सुरक्षित स्थान पर रखें।

**वॉलेट रीस्कैन और सिंक्रोनाइज़ेशन**

* की इम्पोर्ट होने के बाद, Zallet Zebrad के माध्यम से चेन का रीस्कैन शुरू करेगा।
* Zallet को आपका बैलेंस और लेनदेन इतिहास फिर से बनाने के लिए कुछ समय दें।

**7. बैलेंस और सिंक का सत्यापन**

इम्पोर्ट होने के बाद, Zallet आपके Zebrad नोड से कनेक्ट होगा और ब्लॉकचेन (blockchain) को रीस्कैन करेगा।
सिंक्रोनाइज़ेशन पूरा होने पर, आपके बैलेंस और लेनदेन ठीक पहले की तरह दिखाई देने चाहिए।

आप यह चलाकर अपने नोड की सिंक स्थिति सत्यापित कर सकते हैं:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/SyIyVDY6xl-10d6bed7b8.webp)
</div>

या लॉग देखें।

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](/content-images/r1HfVPF6gg-b6b76e9907.webp)
</div>

**8. समस्या निवारण**

<div className="overflow-x-auto my-8 rounded-2xl border border-slate-200 dark:border-slate-700">
  <table className="w-full min-w-full border-collapse text-sm">
    <thead className="bg-slate-100 dark:bg-slate-800">
      <tr>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">समस्या</th>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">संभावित कारण</th>
        <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">समाधान</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zebrad शुरू नहीं होता</td>
        <td className="px-6 py-4">पोर्ट पहले से उपयोग में है या कॉन्फ़िग गलत है</td>
        <td className="px-6 py-4">**zebrad.toml** जाँचें और एक खाली पोर्ट का उपयोग करें</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">धीमा सिंक</td>
        <td className="px-6 py-4">नेटवर्क कंजेशन</td>
        <td className="px-6 py-4">स्थिर इंटरनेट सुनिश्चित करें, Zebrad को रीस्टार्ट करें</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">वॉलेट में लेनदेन गायब हैं</td>
        <td className="px-6 py-4">की का आंशिक इम्पोर्ट</td>
        <td className="px-6 py-4">की फिर से इम्पोर्ट करें या Zallet में रीस्कैन करें</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet नोड से कनेक्ट नहीं हो पा रहा</td>
        <td className="px-6 py-4">नोड नहीं चल रहा या एंडपॉइंट गलत है</td>
        <td className="px-6 py-4">Zebrad शुरू करें और सही RPC पोर्ट सत्यापित करें</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet क्रैश होता है</td>
        <td className="px-6 py-4">पुराना बिल्ड</td>
        <td className="px-6 py-4">GitHub से नवीनतम रिलीज़ में अपडेट करें</td>
      </tr>
    </tbody>
  </table>
</div>

**9. निष्कर्ष**

zcashd से Zebrad और Zallet पर माइग्रेट करने से आपको एक तेज़, सुरक्षित और अधिक आधुनिक Zcash अनुभव मिलता है।
Rust-आधारित सुरक्षा, मॉड्यूलर डिज़ाइन और बेहतर टूलिंग के साथ, यह सेटअप सुनिश्चित करता है कि जैसे-जैसे Zcash इकोसिस्टम विकसित होता रहेगा, आपका नोड और वॉलेट भविष्य के लिए तैयार रहें।

सुझाव: अपनी वॉलेट की ऑफ़लाइन रखें और नियमित रूप से अपने Zallet डेटा का बैकअप लें।
Zebra के लिए [zebra.zfnd.org](https://zebra.zfnd.org) पर जाएँ, और Zallet के लिए [The Zallet Book](https://zcash.github.io/zallet/) या [Zallet रिपॉज़िटरी](https://github.com/zcash/zallet) देखें। The Zallet Book का [zcashd से माइग्रेशन](https://zcash.github.io/zallet/) अध्याय चरण 6 के लिए आधिकारिक संदर्भ है।
