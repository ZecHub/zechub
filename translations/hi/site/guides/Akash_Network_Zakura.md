# Akash Network पर Zakura चलाने का तरीका

[awesome-akash zcash-zakura](https://github.com/akash-network/awesome-akash/tree/master/zcash-zakura) टेम्पलेट (template) का उपयोग करके **Zakura** Zcash फुल नोड (full node) चलाने की चरण-दर-चरण प्रक्रिया।

Zakura एक कंसेंसस (consensus) के अनुकूल Zcash नोड (node) है (Zebra से फ़ोर्क किया गया), जिसमें तेज़ सिंक, नेटिव प्रूनिंग (pruning) और स्नैपशॉट (snapshot) बूटस्ट्रैप की सुविधा है। यह टेम्पलेट **`zakuracore/zakura:1.8.1`** को पिन करता है (डाइजेस्ट-पिन किया हुआ; `:latest` या `1.1.1` का उपयोग न करें)।

### आपको क्या मिलता है

- मेननेट (mainnet) P2P: कंटेनर **8233**, जो वैश्विक रूप से प्रकाशित है (नीचे पोर्ट मैपिंग देखें)
- स्थायी प्रून की गई स्टेट (डिफ़ॉल्ट 64 GiB), जिसमें पहली बार शुरू होने पर Valar स्नैपशॉट बूटस्ट्रैप होता है
- Prometheus **9999** और हेल्थ **8080** (आंतरिक, कोई सार्वजनिक URI नहीं)
- साथ में चलने वाले **lightwalletd** के लिए JSON-RPC **8232** आंतरिक है; LWD कंटेनर **9067** पर सुनता है और वैश्विक रूप से प्रकाशित है

SDL में फ़ीचर फ़्लैग (true/false): `ENABLE_METRICS`, `ENABLE_HEALTH`, `ENABLE_RPC`, `ENABLE_LIGHTWALLETD`। जब lightwalletd चालू होता है, तब कुकी ऑथ बंद रहता है, क्योंकि lightwalletd कुकी फ़ाइलें नहीं पढ़ सकता।

### कौन-सी साइट उपयोग करें (भुगतान)

SDL एक ही है। Akash के दोनों वेब UI में अंतर इस बात का है कि **आप भुगतान कैसे करते हैं**।

| साइट | भुगतान | वॉलेट |
| --- | --- | --- |
| [console.akash.network](https://console.akash.network) | पारंपरिक वेब चेकआउट (Console द्वारा दिए जाने वाले कार्ड / फ़िएट माध्यम) | Console खाता |
| [air.akash.network](https://air.akash.network) | नेटिव Akash चेन (chain) भुगतान (AKT / ACT) | **Keplr** |

जब आप Keplr से ऑन-चेन (on-chain) भुगतान करना चाहते हैं, तब **Air** का उपयोग करें। जब आप पारंपरिक वेब भुगतान प्रक्रिया चाहते हैं, तब **Console** का उपयोग करें। Console पर Keplr के नेटिव सेटलमेंट की अपेक्षा न करें।

### डिप्लॉय

**वेब भुगतान (Console)**

[![Akash Console पर डिप्लॉय करें](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zakura)

**Keplr के साथ नेटिव Akash भुगतान (Air)**

[इस टेम्पलेट को Air पर खोलें](https://air.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-zcash-zakura)

1. ऊपर दिया गया संबंधित लिंक खोलें (Console या Air)।
2. Air पर **Keplr** कनेक्ट करें और पुष्टि करें कि डिपॉज़िट और लीज़ के लिए आपके पास AKT/ACT है। Console पर UI द्वारा दिखाया गया वेब चेकआउट पूरा करें।
3. यदि `zcash-zakura/deploy.yaml` पहले से भरा हुआ नहीं है, तो उसे लोड करें।
4. डिपॉज़िट करें, एक बोली स्वीकार करें और लीज़ की प्रतीक्षा करें।
5. लॉग में पहले स्नैपशॉट डाउनलोड (पहली बार शुरू होने पर) और फिर `zakurad start` दिखना चाहिए।
6. **Leases → URIs** खोलें। प्रोवाइडर द्वारा दिया गया host:port उपयोग करें, सार्वजनिक IP पर 8233 या 9067 नहीं।

### Akash पोर्ट कैसे प्रकाशित करता है

SDL `port` / `as` (8233, 9067, 8232) **कंटेनर** पोर्ट हैं। Zakura अब भी 8233 पर सुनता है; lightwalletd 9067 पर; और LWD साइडकार के लिए RPC 8232 पर (`zakura:8232`)।

ये प्रोवाइडर के सार्वजनिक IP के पोर्ट **नहीं** हैं।

**डिफ़ॉल्ट (यह टेम्पलेट):** कोई समर्पित IP नहीं। हर `global: true` TCP एक्सपोज़ को एक साझा प्रोवाइडर होस्ट पर एक **रैंडम हाई पोर्ट** से मैप किया जाता है। Console/Air इन्हें लीज़ URI के रूप में दिखाते हैं, उदाहरण के लिए:

```
zakura-8233: provider.example:31482
lightwalletd-9067: provider.example:32011
```

पीयर **8233** वाले URI (`provider.example:31482`) से जुड़ते हैं। कॉम्पैक्ट वॉलेट (wallet) **9067** वाले URI का उपयोग करते हैं (TLS बंद रहता है, जब तक आप स्वयं TLS टर्मिनेट नहीं करते)। `ZAKURA_NETWORK__EXTERNAL_ADDR` को मैप किए गए P2P URI पर सेट करें, `:8233` पर नहीं।

**आंतरिक** एक्सपोज़ (`8232` RPC, `9999` मेट्रिक्स, `8080` हेल्थ) डिप्लॉयमेंट नेटवर्क पर ही रहते हैं। कोई सार्वजनिक URI नहीं।

**समर्पित IP** (`endpoints` / `kind: ip`) एक सशुल्क अतिरिक्त सुविधा हैं और इस टेम्पलेट में **शामिल नहीं** हैं। इनसे एक सार्वजनिक IP और कभी-कभी `as` पोर्ट भी पिन किया जा सकता है। इसे केवल तभी जोड़ें जब आपको एक स्थिर `host:8233` की आवश्यकता हो।

### आर्काइव बनाम प्रून्ड

डिफ़ॉल्ट **प्रून्ड** है (~11 GiB स्नैपशॉट, 64 GiB डिस्क)। पूरे इतिहास के लिए `SNAPSHOT_KIND=archive` सेट करें, डिस्क को 350 GiB+ तक बढ़ाएँ और `ZAKURA_STATE__STORAGE_MODE=archive` सेट करें।

### संबंधित

- [Akash पर Zebra](/guides/akash-network-zebra) — Zcash Foundation `zebrad` (पूरा इतिहास, कोई स्नैपशॉट नहीं)
- [Akash पर Thus Spoke Zakura](/guides/thus-spoke-zakura-akash) — Regtest डैशबोर्ड (dashboard) + ऐप (v0.4.1)
- Zakura सोर्स: [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)
- स्नैपशॉट: [zakura.com/snapshots/](https://zakura.com/snapshots/)
