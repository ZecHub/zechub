# Akash पर Thus Spoke Zakura (Regtest)

Akash पर **Thus Spoke Zakura v0.4.1** स्टैक (stack) चलाएँ: Zakura Regtest, lightwalletd, और वॉलेट (wallet) **डैशबोर्ड (dashboard) / HTTP API**। टेस्ट कॉइन का कोई मूल्य नहीं है। यहाँ मेननेट (mainnet) ZEC न भेजें।

टेम्पलेट (template): [awesome-akash/thus-spoke-zakura](https://github.com/akash-network/awesome-akash/tree/master/thus-spoke-zakura)

अपस्ट्रीम (upstream): [zcashlabs/thus-spoke-zakura](https://github.com/zcashlabs/thus-spoke-zakura) टैग **v0.4.1**

### इमेज

| सेवा | इमेज |
| --- | --- |
| डैशबोर्ड + API (`app`) | `ghcr.io/zcashlabs/thus-spoke-zakura-app:0.4.1` |
| lightwalletd | `ghcr.io/zcashlabs/thus-spoke-zakura-lightwalletd:0.4.1` |
| Zakura | `zakuracore/zakura:1.6.0` (0.4.1 लॉन्चर में कंपाइल किया गया पिन) |

### सेल्फ-बूटस्ट्रैप (self-bootstrap)

पहली बार शुरू होने पर `app` कंटेनर (container) अपने स्थायी वॉल्यूम (persistent volume) पर `ths-server init` चलाता है, फिर `ths-server serve`। Serve तब तक पुनः प्रयास करता रहता है जब तक Zakura JSON-RPC और lightwalletd चालू नहीं हो जाते। आपको प्रोवाइडर (provider) पर `ths` नहीं चलाना पड़ता; SDL ही रनटाइम (runtime) है।

### Akash पोर्ट कैसे प्रकाशित करता है

SDL `port` / `as` **कंटेनर** पोर्ट हैं। ऐप **8080** (`THS_LISTEN`) पर सुनता है; lightwalletd **9067** पर; Zakura RPC **18232** पर और P2P **18233** पर। डिप्लॉयमेंट (deployment) के अंदर, सेवाएँ पहले से ही इन्हीं का उपयोग करती हैं (`http://zakura:18232`, `http://lightwalletd:9067`)।

ये प्रोवाइडर के सार्वजनिक IP पर मौजूद पोर्ट **नहीं** हैं।

**डिफ़ॉल्ट (यह टेम्पलेट):** कोई समर्पित IP नहीं।

| सेवा | कंटेनर लिसन | SDL `as` | लीज़ पर यह कैसे दिखाई देता है |
| --- | --- | --- | --- |
| `app` (डैशबोर्ड + HTTP API) | 8080 | 80 (HTTP) | इनग्रेस होस्टनेम, अक्सर 80/443 पर — **इस URI को ब्राउज़र में खोलें** |
| `lightwalletd` | 9067 | 9067 (TCP, ग्लोबल) | `host:&lt;random-high-port&gt;` |
| `zakura` RPC | 18232 | 18232 (TCP, ग्लोबल) | `host:&lt;random-high-port&gt;` |
| `zakura` P2P | 18233 | 18233 (TCP, ग्लोबल) | `host:&lt;random-high-port&gt;` |

लीज़ (lease) तैयार होने के बाद, **Leases → URIs** ही सही जानकारी का स्रोत है। डैशबोर्ड के लिए **`app`** URI खोलें (वही UI जिसे `ths` स्थानीय रूप से खोलता है)। कॉम्पैक्ट क्लाइंट (compact client) को **lightwalletd** URI (`THS_LIGHTWALLETD_TLS=false`) की ओर निर्देशित करें। प्रोवाइडर IP पर `:8080`, `:80`, या `:9067` टाइप न करें, जब तक कि किसी समर्पित IP लीज़ ने उन पोर्ट को सार्वजनिक न किया हो।

**समर्पित IP** (dedicated IP) (`endpoints` / `kind: ip`) एक सशुल्क अतिरिक्त सुविधा है और यह इस टेम्पलेट में **शामिल नहीं** है। ये एक सार्वजनिक IP और कभी-कभी `as` पोर्ट को भी स्थिर कर सकते हैं। जब तक आपको इसकी आवश्यकता न हो, इन्हें बंद रखें।

### कौन-सी साइट उपयोग करें (भुगतान)

SDL वही है। दोनों Akash वेब UI में अंतर **आप भुगतान (payment) कैसे करते हैं** इसमें है।

| साइट | भुगतान | वॉलेट |
| --- | --- | --- |
| [console.akash.network](https://console.akash.network) | पारंपरिक वेब चेकआउट (Console द्वारा उपलब्ध कार्ड / फ़िएट माध्यम) | Console खाता |
| [air.akash.network](https://air.akash.network) | नेटिव Akash चेन (chain) भुगतान (AKT / ACT) | **Keplr** |

जब आप Keplr से ऑन-चेन (on-chain) भुगतान करना चाहें, तो **Air** का उपयोग करें। जब आप पारंपरिक वेब भुगतान प्रक्रिया चाहें, तो **Console** का उपयोग करें।

### डिप्लॉय

**वेब भुगतान (Console)**

[![Akash Console पर डिप्लॉय करें](https://raw.githubusercontent.com/akash-network/console/refs/heads/main/apps/deploy-web/public/images/deploy-with-akash-btn.svg)](https://console.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-thus-spoke-zakura)

**Keplr के साथ नेटिव Akash भुगतान (Air)**

[इस टेम्पलेट को Air पर खोलें](https://air.akash.network/new-deployment?step=edit-deployment&templateId=akash-network-awesome-akash-thus-spoke-zakura)

टेम्पलेट से डिप्लॉयमेंट बनाएँ, एक बिड (bid) स्वीकार करें, तब तक प्रतीक्षा करें जब तक `app` लॉग में `ths-server serve` लगातार चालू न दिखे, फिर डैशबोर्ड के लिए **`app` URI** खोलें।

### संबंधित

- [Akash पर Zakura](/guides/akash-network-zakura) — मेननेट/टेस्टनेट वैलिडेटिंग नोड (node)
- [Akash पर Zebra](/guides/akash-network-zebra)
- पुस्तक: [github.com/zcashlabs/thus-spoke-zakura/tree/main/book](https://github.com/zcashlabs/thus-spoke-zakura/tree/main/book)
