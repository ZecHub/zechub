# माइग्रेशन गाइड: zcashd से Zebrad/Zallet तक

पारंपरिक zcashd फुल नोड, जिसका रखरखाव *Electric Coin Company (ECC)* / *Zodl* द्वारा किया जाता था, को Zebra और Zallet ने प्रतिस्थापित कर दिया है। zcashd 18 जुलाई 2026 को अपनी समर्थन-समाप्ति रोक तक पहुँच गया और अब नहीं चलता है।

- Zebra, Zcash Foundation द्वारा विकसित Zcash प्रोटोकॉल का एक आधुनिक Rust कार्यान्वयन है
- Zallet, Zodl द्वारा विकसित Zebra नोड से निर्बाध रूप से जुड़ने के लिए बनाया गया एक हल्का wallet है

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![आरेख: नोड कार्यों के लिए zcashd का zebrad में और wallet कार्यों के लिए Zallet में विभाजन](/content-images/SJNBsSYTel-dfd19f34e4.webp)
</div>

यह गाइड आपको **Zcashd** से **Zebrad** और **Zallet** में माइग्रेशन की प्रक्रिया से परिचित कराती है, जिसमें सेटअप, wallet इंपोर्ट और सामान्य माइग्रेशन समस्याओं का समाधान शामिल है।

---

## zcashd ने 18 जुलाई 2026 को चलना बंद कर दिया

**इसका क्या अर्थ है**

- zcashd 18 जुलाई 2026 को अपनी समर्थन-समाप्ति रोक तक पहुँच गया। यह फिर से chain tip तक sync नहीं होगा, और न ही धन भेज या प्राप्त कर सकता है। यह समाप्त हो चुका है, नियोजित नहीं है।
- zcashd के दो कार्य अब विभाजित हैं: **zebrad** फुल नोड है, और **Zallet** wallet है।
- Zallet **beta** में है। रिलीज़ के बीच breaking changes हो सकते हैं, और कुछ zcashd JSON-RPC methods अभी लागू नहीं किए गए हैं। किसी विशिष्ट call पर निर्भर होने से पहले [method status matrix](https://zcash.github.io/zallet/) देखें।
- यदि आपके पास अभी भी **Sprout** धन है, तो पहले चरण 6 में चेतावनी पढ़ें। Zallet Sprout pool का समर्थन नहीं करता, और उन धनराशियों को स्थानांतरित करने का सामान्य तरीका चालू zcashd पर निर्भर था।

**माइग्रेट क्यों करें - अप्रचलन से परे**

अप्रचलन को अलग रखकर भी, माइग्रेट करने के ठोस कारण हैं:
- सुरक्षा और मज़बूती: Rust की memory-safety और आधुनिक tooling कमजोरियों के जोखिम कम करते हैं।
- प्रदर्शन और दक्षता: Zebrad को parallelism, अधिक कुशल संसाधन उपयोग और तेज़ sync के लिए डिज़ाइन किया गया है।
- मॉड्यूलर आर्किटेक्चर: नोड लॉजिक (Zebrad) को wallet UI (Zallet) से अलग करने से स्पष्ट सीमाएँ और बेहतर upgrade paths मिलते हैं।
- भविष्य के ecosystem के साथ संगतता: टूल, enhancements और Zcash के बाकी ecosystem का लक्ष्य लगातार Zebrad/Zallet होगा।
- निश्चिंतता: अप्रचलित, असमर्थित component चलाने में फँसने से बचें।

### अब माइग्रेशन गाइड में विस्तार से चलते हैं

**1. हर चीज़ का बैकअप लें**
* अपने zcashd नोड से अपने wallet.dat (या किसी अन्य wallet फ़ाइल / key store) का बैकअप लें।

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (1)](/content-images/SJ_0mUtTxg-1441185a72.svg)
</div>

* अपनी zcash.conf और कोई भी कस्टम सेटिंग सहेजें।
* उपयोग किए जाने वाले किसी भी RPC scripts या automation की कॉपी export करें।
* सत्यापित करें कि आपके बैकअप वैध हैं (जैसे, दूसरे environment में उन्हें खोलने या inspect करने का प्रयास करें)।
* समीक्षा करें कि आप वर्तमान में किन JSON-RPC methods पर निर्भर हैं।
* [Zcash support site](https://z.cash/support/zcashd-deprecation/) पर रखी गई नियोजित compatibility table से तुलना करें 
* परिवर्तनों या अनुपलब्ध methods के लिए तैयार रहें (कुछ को workaround या adaptation की आवश्यकता हो सकती है)।

**2. सिस्टम आवश्यकताएँ और डिस्क स्पेस**
* डिस्क स्पेस वह आवश्यकता है जिसे लोग कम आँकते हैं। अगस्त 2026 में Zcash chain **270 GB** पार कर गई, इसलिए कम से कम **300 GB** खाली स्थान रखें, और संभव हो तो SSD पर।
* सुनिश्चित करें कि आपकी मशीन में स्थिर नेटवर्क, CPU और RAM है।
* एक इंटरनेट कनेक्शन 
* यदि आप source से compile करने की योजना रखते हैं, तो Rust और Cargo स्थापित रखें।

**3. Zebrad इंस्टॉल / सेटअप करें**
आप पहले से बनी binary डाउनलोड कर सकते हैं या source से build कर सकते हैं।
* Zcash Foundation, Zebra के लिए releases और binaries प्रकाशित करती है। उदाहरण के लिए, आप कोई install script इस्तेमाल कर सकते हैं या अपने OS के लिए उपयुक्त binary डाउनलोड कर सकते हैं।

* ध्यान दें कि Zebra के हाल के संस्करणों में, [Docker में RPC endpoint अब डिफ़ॉल्ट रूप से सक्षम नहीं है।](https://zfnd.org/zebra-2-3-0-release/)

**विकल्प A: पहले से बनी binary के माध्यम से इंस्टॉल करें**  
**Linux**/**macOS** पर:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (2)](/content-images/HJhYu8Y6el-d2198f22c9.svg)
</div>

यह zebrad का नवीनतम स्थिर संस्करण इंस्टॉल करता है।

**विकल्प B: source से build करें**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (3)](/content-images/Syg8FUK6eg-b4557e52e0.svg)
</div>

Build करने के बाद, binary को अपने path में ले जाएँ:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![माइग्रेशन 11](/content-images/BJ0zjLY6ll-f77354d701.webp)
</div>

**4. कॉन्फ़िगरेशन और लॉन्च**  
एक डिफ़ॉल्ट config बनाएँ:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![माइग्रेशन2](/content-images/HJV1C8tTxx-5823395651.webp)
</div>

अपनी प्राथमिकताओं के अनुसार **zebrad.toml** संपादित करें (listen address, ports, state directory, caching)।

**नोड शुरू करें:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![छवि](/content-images/H1KPkvt6gl-864c48ca40.webp)
</div>

नोड genesis से sync करना शुरू करेगा - hardware और नेटवर्क के आधार पर कई घंटे (या अधिक) लगने की अपेक्षा करें।

**5. Zallet (Wallet) इंस्टॉल / सेटअप करें**

Zallet को zcashd के wallet वाले भाग को प्रतिस्थापित करने के लिए डिज़ाइन किया गया है।

Binaries के लिए Zallet GitHub / release page देखें।

**या source से build करें:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![छवि](/content-images/SyUFxvFTex-5bb10ee1d3.webp)
</div>

* GUI या CLI लॉन्च करें (जैसा आपके installation में उपलब्ध हो)।
* इसे RPC या API endpoint के माध्यम से अपने स्थानीय Zebrad नोड से जुड़ने के लिए कॉन्फ़िगर करें।

**6. अपना zcashd Wallet Zallet में इंपोर्ट करना**

इसके लिए आपको चालू zcashd की आवश्यकता नहीं है। Zallet `wallet.dat` फ़ाइल को सीधे पढ़ता है, जो महत्वपूर्ण है क्योंकि zcashd अब शुरू नहीं किया जा सकता।

> **`wallet.dat` को रखें।** माइग्रेशन उन सभी चीज़ों की रिपोर्ट करता है जिन्हें यह Zallet wallet में प्रदर्शित नहीं कर सकता, इंपोर्ट नहीं करता; तब वह key material केवल `wallet.dat` में मौजूद रहता है। माइग्रेट करने के बाद इसे हटाएँ नहीं।

पहले `zallet init-wallet-encryption` चलाएँ। Zallet key material को age identity में encrypt करता है, और किसी भी keys के इंपोर्ट से पहले उस identity का होना आवश्यक है।

फिर अपना config और wallet रूपांतरित करें:

```bash
# translate zcash.conf into zallet.toml
zallet migrate-zcash-conf --zcashd-datadir /path/to/zcashd/datadir -o /path/to/zallet/datadir/zallet.toml

# import wallet.dat into Zallet's wallet.db
zallet migrate-zcashd-wallet --zcashd-datadir /path/to/zcashd/datadir
```

`migrate-zcashd-wallet` केवल `zcashd-import` feature वाले builds में मौजूद है, और `wallet.dat` पढ़ने के लिए Berkeley DB 6.2 से `db_dump` utility चाहिए, जो zcashd द्वारा इस्तेमाल किया गया संस्करण है। यदि आपके पास एक से अधिक wallet फ़ाइलें हैं, तो प्रत्येक फ़ाइल के लिए command एक बार चलाएँ और बाद के runs में `--allow-multiple-wallet-imports` जोड़ें; प्रत्येक अपने accounts का अलग set बनता है। आपके `rpcuser` और `rpcpassword` स्थानांतरित नहीं किए जाते, क्योंकि Zallet का JSON-RPC डिफ़ॉल्ट रूप से cookie authentication उपयोग करता है; यदि उनकी आवश्यकता हो तो `zallet add-rpc-user` से credentials जोड़ें।

**क्या स्थानांतरित होता है**

* Mnemonic seeds और उनसे derived keys, जिनमें accounts को zcashd wallet से मेल खाने के लिए फिर से बनाया जाता है
* स्वतंत्र रूप से इंपोर्ट की गई Sapling spending keys और transparent keys
* ऐसे transparent watch-only entries जिनमें public key या redeem script शामिल है
* Account birthdays, ताकि chain scanning सही height से शुरू हो

**क्या स्थानांतरित नहीं होता।** इन्हें इंपोर्ट करने के बजाय counts के साथ रिपोर्ट किया जाता है:

* **Sprout spending keys और धन।** Zallet Sprout pool का समर्थन नहीं करता। दस्तावेज़ित तरीका zcashd को retire करने से पहले उसके माध्यम से Sprout धन को बाहर स्थानांतरित करना था, और यह अब संभव नहीं है। यदि यह आपको प्रभावित करता है, तो कुछ और करने से पहले [Zcash R&D Discord](https://discord.gg/xpzPR53xtU) या [community forum](https://forum.zcashcommunity.com/) पर पूछें।
* Address book entries
* public key या redeem script के बिना संग्रहित watch-only entries, और uncompressed public keys वाली entries
* Regtest wallets

**बाद में बैकअप लेना।** केवल mnemonic अपने आप में पूर्ण बैकअप नहीं है, क्योंकि इंपोर्ट की गई keys केवल wallet database में मौजूद होती हैं। `wallet.db`, `keystore.encryption_identity` option द्वारा नामित age encryption identity फ़ाइल, और अपने mnemonic phrase की सुरक्षित प्रतियाँ रखें, तथा मूल `wallet.dat` भी रखें। ध्यान दें कि `wallet.db` स्वयं encrypted नहीं है: इसमें आपकी transaction history और viewing keys स्पष्ट रूप में रहती हैं, इसलिए बैकअप को किसी सुरक्षित स्थान पर संग्रहित करें।

**Wallet Rescan और Synchronization**

* Keys इंपोर्ट हो जाने पर, Zallet Zebrad के माध्यम से chain का rescan शुरू करेगा।
* Zallet को अपना balance और transaction history फिर से बनाने के लिए कुछ समय दें।

**7. Balances और Sync सत्यापित करें**

इंपोर्ट होने के बाद, Zallet आपके Zebrad नोड से जुड़ेगा और blockchain को फिर से scan करेगा।
Synchronization पूरा होने पर, आपके balances और transactions पहले की तरह ही दिखने चाहिए।

आप यह चलाकर अपने नोड की sync स्थिति सत्यापित कर सकते हैं:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![छवि](/content-images/SyIyVDY6xl-10d6bed7b8.webp)
</div>

या logs जाँचें।

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![छवि](/content-images/r1HfVPF6gg-b6b76e9907.webp)
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
        <td className="px-6 py-4">Port उपयोग में है या config गलत है</td>
        <td className="px-6 py-4">**zebrad.toml** जाँचें और एक खाली port उपयोग करें</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">धीमा sync</td>
        <td className="px-6 py-4">नेटवर्क congestion</td>
        <td className="px-6 py-4">स्थिर इंटरनेट सुनिश्चित करें, Zebrad पुनः आरंभ करें</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Wallet में transactions गायब हैं</td>
        <td className="px-6 py-4">अपूर्ण key import</td>
        <td className="px-6 py-4">Keys फिर से इंपोर्ट करें या Zallet में rescan करें</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet नोड से जुड़ नहीं सकता</td>
        <td className="px-6 py-4">नोड नहीं चल रहा है या endpoint गलत है</td>
        <td className="px-6 py-4">Zebrad शुरू करें और सही RPC port सत्यापित करें</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet क्रैश होता है</td>
        <td className="px-6 py-4">पुराना build</td>
        <td className="px-6 py-4">GitHub से नवीनतम release में अपडेट करें</td>
      </tr>
    </tbody>
  </table>
</div>

**9. निष्कर्ष**

zcashd से Zebrad और Zallet में माइग्रेट करने से आपको तेज़, अधिक सुरक्षित और अधिक आधुनिक Zcash अनुभव मिलता है।
Rust-आधारित सुरक्षा, मॉड्यूलर डिज़ाइन और बेहतर tooling के साथ, यह सेटअप सुनिश्चित करता है कि Zcash ecosystem के निरंतर विकसित होने पर आपका नोड और wallet भविष्य के लिए तैयार रहें।

सुझाव: अपनी wallet keys को offline रखें और नियमित रूप से अपने Zallet data का बैकअप लें।
Zebra के लिए [zebra.zfnd.org](https://zebra.zfnd.org), और Zallet के लिए [The Zallet Book](https://zcash.github.io/zallet/) या [Zallet repository](https://github.com/zcash/zallet) देखें। चरण 6 के लिए The Zallet Book का [zcashd से माइग्रेट करना](https://zcash.github.io/zallet/) अध्याय आधिकारिक संदर्भ है।
