# माइग्रेशन गाइड: zcashd से Zebrad/Zallet तक

Zcash इकोसिस्टम विकसित हो रहा है। पारंपरिक Zcashd फुल node, जिसे *Electric Coin Company (ECC)* / *Zodl* द्वारा मेंटेन किया जाता है, धीरे-धीरे Zebra और Zallet से प्रतिस्थापित किया जा रहा है।

- Zebra, Zcash Foundation द्वारा विकसित Zcash प्रोटोकॉल का एक आधुनिक Rust implementation है
- Zallet, Zodl द्वारा विकसित एक lightweight wallet है, जिसे Zebra nodes के साथ सहज रूप से इंटरफ़ेस करने के लिए बनाया गया है

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![ChatGPTImageOct12202508_15_20A](https://hackmd.io/_uploads/SJNBsSYTel.jpg)
</div>

यह गाइड आपको **Zcashd** से **Zebrad** और **Zallet** पर माइग्रेट करने की प्रक्रिया से चरण-दर-चरण परिचित कराती है, जिसमें setup, wallet import, और migration के दौरान आने वाली आम समस्याओं का समाधान शामिल है।

---

## Zcash प्रोजेक्ट ने औपचारिक रूप से घोषणा की है कि zcashd को 2025 में deprecated कर दिया जाएगा।

**Deprecation की स्थिति और इसका अर्थ**

- Zcash प्रोजेक्ट ने औपचारिक रूप से घोषणा की है कि zcashd को 2025 में deprecated कर दिया जाएगा।
- Full nodes को Zebrad, जो एक Rust implementation है, पर माइग्रेट किया जा रहा है, जबकि Zallet का उद्देश्य zcashd के wallet component का उत्तराधिकारी बनना है। 
- इसके जवाब में, Zebra प्रोजेक्ट compatibility, RPC migration, और ecosystem support सुनिश्चित करने के लिए "Zcashd Deprecation" milestone को ट्रैक करता है।
- कई RPC methods के लिए, Zebrad/Zallet का लक्ष्य drop-in replacements बनना है (व्यवहार की नकल करना या उससे मेल खाना)। अन्य methods बदलेंगे या संभव है कि supported न हों।

**माइग्रेट क्यों करें - Deprecation से आगे की वजहें**

Deprecation को एक तरफ रख दें, तब भी माइग्रेट करने के ठोस कारण हैं:
- Security & Robustness: Rust की memory-safety और modern tooling vulnerabilities के जोखिम को कम करती हैं।
- Performance & Efficiency: Zebrad को parallelism, अधिक efficient resource usage, और तेज sync के लिए डिज़ाइन किया गया है।
- Modular Architecture: node logic (Zebrad) को wallet UI (Zallet) से अलग करने से सीमाएँ अधिक स्पष्ट होती हैं और upgrade paths बेहतर बनते हैं।
- Future Ecosystem Compatibility: tools, enhancements, और Zcash के बाकी ecosystem का ध्यान बढ़ते हुए Zebrad/Zallet पर रहेगा।
- Peace of Mind: deprecated और unsupported component चलाने में फँसे रहने से बचें।

### अब आइए माइग्रेशन गाइड में गहराई से जाएँ

**1. सब कुछ बैकअप करें**
* अपने zcashd node से अपनी wallet.dat (या कोई भी अन्य wallet file / key store) का बैकअप लें।

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (1)](https://hackmd.io/_uploads/SJ_0mUtTxg.svg)
</div>

* अपनी zcash.conf और किसी भी custom settings को सुरक्षित रखें।
* जिन RPC scripts या automation का आप उपयोग करते हैं, उनकी एक कॉपी export करें।
* यह सत्यापित करें कि आपके backups वैध हैं (उदाहरण के लिए, किसी दूसरे environment में उन्हें खोलकर या inspect करके देखें)।
* यह समीक्षा करें कि आप वर्तमान में किन JSON-RPC methods पर निर्भर हैं।
* [Zcash support site](https://z.cash/support/zcashd-deprecation/?utm_source=chatgpt.com) पर मेंटेन की जा रही planned compatibility table से तुलना करें 
* बदलावों या missing methods के लिए तैयार रहें (कुछ के लिए workaround या adaptation की आवश्यकता हो सकती है)।

**2. सिस्टम आवश्यकताएँ और Disk Space**
* सुनिश्चित करें कि आपके पास पर्याप्त disk space हो (Zcash chain बड़ी है)। कम से कम 10 GB खाली disk space रखें।
* सुनिश्चित करें कि आपकी मशीन में स्थिर network, CPU, RAM हो।
* एक internet connection 
* यदि आप source से compile करने की योजना बना रहे हैं, तो Rust और Cargo installed होने चाहिए।

**3. Zebrad को Install / Setup करें**
आप या तो prebuilt binary डाउनलोड कर सकते हैं या source से build कर सकते हैं।
* Zcash Foundation Zebra के लिए releases और binaries प्रकाशित करती है। उदाहरण के लिए, आप install script का उपयोग कर सकते हैं या अपने OS के लिए उपयुक्त binary डाउनलोड कर सकते हैं।

* ध्यान दें कि Zebra के हाल के versions में, [RPC endpoint अब Docker में default रूप से enabled नहीं होता।](https://zfnd.org/zebra-2-3-0-release/?utm_source=chatgpt.com)

**Option A: prebuilt binary के माध्यम से Install करें**  
**Linux**/**macOS** पर:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (2)](https://hackmd.io/_uploads/HJhYu8Y6el.svg)
</div>

यह zebrad का नवीनतम stable version install करता है।

**Option B: source से Build करें**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (3)](https://hackmd.io/_uploads/Syg8FUK6eg.svg)
</div>

Build के बाद, binary को अपने path में move करें:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration 11](https://hackmd.io/_uploads/BJ0zjLY6ll.png)
</div>

**4. Configuration & Launch**  
एक default config generate करें:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![migration2](https://hackmd.io/_uploads/HJV1C8tTxx.png)
</div>

अपनी पसंद के अनुसार **zebrad.toml** को edit करें (listen address, ports, state directory, caching)।

**node शुरू करें:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](https://hackmd.io/_uploads/H1KPkvt6gl.png)
</div>

node genesis से sync करना शुरू कर देगा - hardware और network के आधार पर इसमें कई घंटे (या उससे अधिक) लग सकते हैं।

**5. Zallet (Wallet) को Install / Setup करें**

Zallet को zcashd के wallet हिस्से को replace करने के लिए डिज़ाइन किया गया है।

binaries के लिए Zallet का GitHub / release page देखें।

**या source से build करें:**

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](https://hackmd.io/_uploads/SyUFxvFTex.png)
</div>

* GUI या CLI लॉन्च करें (जैसा आपका installation प्रदान करता है)।
* इसे अपने local Zebrad node से RPC या API endpoint के माध्यम से connect होने के लिए configure करें।

**6. अपनी zcashd Wallet को Zallet में Import करना**  
Private Key Dump के माध्यम से

zcashd पर, अपनी private keys export करें:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![bash (4)](https://hackmd.io/_uploads/rJzgzwFagx.svg)
</div>

* Zallet में, Import Keys या उससे मिलते-जुलते विकल्प का चयन करें।
* इसे **zcashd_keys.txt** पर point करें। 
* Zallet को ZEC addresses और उनसे संबंधित keys को parse और import कर लेना चाहिए।

**Seed Phrase के माध्यम से** (यदि लागू हो)

* यदि आपका wallet seed backup को support करता है, तो Zallet में Restore from Seed Phrase का उपयोग करें।
* यह केवल तभी काम करेगा जब आपका zcashd wallet किसी seed से derived हो (या आपके पास seed conversion हो)।

**Wallet Rescan & Synchronization**

* एक बार keys import हो जाने के बाद, Zallet, Zebrad के माध्यम से chain का rescan trigger करेगा।
* Zallet को आपका balance और transaction history दोबारा बनाने के लिए कुछ समय दें।

**7. Balances और Sync सत्यापित करें**

Import हो जाने के बाद, Zallet आपके Zebrad node से connect होगा और blockchain को फिर से scan करेगा।
जब synchronization पूरा हो जाएगा, तो आपके balances और transactions ठीक पहले की तरह दिखाई देने चाहिए।

आप अपने node की sync status को यह चलाकर सत्यापित कर सकते हैं:

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](https://hackmd.io/_uploads/SyIyVDY6xl.png)
</div>

या logs देखें।

<div className="my-8 w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
![image](https://hackmd.io/_uploads/r1HfVPF6gg.png)
</div>

**8. Troubleshooting**

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
        <td className="px-6 py-4">Zebrad शुरू नहीं हो रहा</td>
        <td className="px-6 py-4">Port उपयोग में है या config खराब है</td>
        <td className="px-6 py-4">**zebrad.toml** जाँचें और एक free port का उपयोग करें</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">धीमा sync</td>
        <td className="px-6 py-4">Network congestion</td>
        <td className="px-6 py-4">स्थिर internet सुनिश्चित करें, Zebrad को restart करें</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Wallet में transactions नहीं दिख रहे</td>
        <td className="px-6 py-4">आंशिक key import</td>
        <td className="px-6 py-4">Keys को फिर से import करें या Zallet में rescan करें</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet node से connect नहीं कर पा रहा</td>
        <td className="px-6 py-4">Node चल नहीं रहा या endpoint गलत है</td>
        <td className="px-6 py-4">Zebrad शुरू करें और सही RPC port सत्यापित करें</td>
      </tr>
      <tr className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50">
        <td className="px-6 py-4">Zallet crash हो जाता है</td>
        <td className="px-6 py-4">पुराना build</td>
        <td className="px-6 py-4">GitHub से नवीनतम release पर update करें</td>
      </tr>
    </tbody>
  </table>
</div>

**9. निष्कर्ष**

zcashd से Zebrad और Zallet पर माइग्रेट करने से आपको एक तेज़, सुरक्षित, और अधिक आधुनिक Zcash अनुभव मिलता है।
Rust-आधारित security, modular design, और बेहतर tooling के साथ, यह setup सुनिश्चित करता है कि आपका node और wallet भविष्य के लिए तैयार रहें, जबकि Zcash ecosystem लगातार विकसित होता रहता है।

सुझाव: अपनी wallet keys को offline रखें और अपने Zallet data का नियमित रूप से बैकअप लें।
updates और community support के लिए [zebra.zfnd.org](https://zebra.zfnd.org) और [zallet.zfnd.org](https://zallet.zfnd.org) पर जाएँ।
