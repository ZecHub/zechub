# Zcash JS डेवलपर गाइड

**zcash.js** (`@zcashlabs/zcash.js`) एक प्रायोगिक TypeScript/JavaScript SDK है, जिसे Zcash Labs ने 26 अक्टूबर 2026 को जारी किया था। यह डेवलपर्स को Node.js और ब्राउज़र से Zcash नेटवर्क के साथ इंटरैक्ट करने वाले वॉलेट, लाइट क्लाइंट, डैशबोर्ड और एप्लिकेशन बनाने देता है।

> **स्थिति**: प्रायोगिक (v0.1.1)। स्थायी नोड वॉलेट के लिए वर्तमान में Linux + `flock` आवश्यक हैं। पूर्ण लाइव-ब्राउज़र भेजना/प्राप्त करना और ऐतिहासिक वॉलेट-डेटाबेस माइग्रेशन अभी पूरी तरह योग्य नहीं हैं। प्रोडक्शन उपयोग से पहले हमेशा आधिकारिक दस्तावेज़ देखें।

## SDK क्या प्रदान करता है

- `createPublicClient` — स्टेटलेस JSON-RPC क्वेरी और लेनदेन अवलोकन
- `createLightClient` — लाइटवॉलेट क्वेरी और स्ट्रीम (नोड पर नेटिव gRPC, ब्राउज़र में gRPC-Web)
- `createWalletClient` — स्थानीय खाते, स्कैनिंग, प्रस्ताव, साइनिंग, सबमिशन और दर्ज भुगतानों की पुनर्प्राप्ति
- सटीक `bigint` राशियाँ, नेटवर्क सत्यापन, व्यूइंग/पता उपकरण और PCZT उपयोगिताएँ
- बंडल किया गया आधारभूत वॉलेट इंजन, वर्कर और स्थानीय Sapling प्रूविंग एसेट (अलग से Rust इंस्टॉलेशन आवश्यक नहीं)

## इंस्टॉलेशन

**Node.js 22.23.4** का उपयोग करें (पैकेज द्वारा पिन किया गया संस्करण)।

```bash
npm install @zcashlabs/zcash.js@0.1.1
```

- ESM के साथ TypeScript को प्राथमिकता दें (`package.json` में `"type": "module"`)।
- ब्राउज़र एप्लिकेशन आधुनिक ESM बंडलर के माध्यम से काम करते हैं। बंडलर लेज़ी WASM, वर्कर और प्रूविंग एसेट उत्सर्जित करेगा — इन्हें आपके एप्लिकेशन के साथ डिप्लॉय करना आवश्यक है।

## पहली चेन क्वेरी (वॉलेट के बिना)

```ts
import { createLightClient } from '@zcashlabs/zcash.js';

const light = await createLightClient('https://testnet.zec.rocks:443', {
  network: 'testnet',
});

const tip = await light.getTip();
console.log(tip.height, tip.hash);
```

- `network` विकल्प छोड़ने पर डिफ़ॉल्ट mainnet होता है (मिलता-जुलता एंडपॉइंट प्रदान करें)।
- शुद्ध JSON-RPC उपयोग के लिए एक `createPublicClient` भी उपलब्ध है।

## वॉलेट खोलना

```ts
import { createWalletClient } from '@zcashlabs/zcash.js';

const wallet = await createWalletClient('https://testnet.zec.rocks:443', {
  network: 'testnet',
  storage: { kind: 'node-filesystem', path: './my-wallet' }, // Linux only for durable storage
});

try {
  const accounts = await wallet.accounts.list();
  console.log(accounts);
} finally {
  await wallet.close();
}
```

### स्टोरेज विकल्प

| परिवेश     | स्टोरेज विकल्प                                      |
|-----------------|-----------------------------------------------------|
| नोड (स्थायी)  | `{ kind: 'node-filesystem', path: './my-wallet' }`  |
| ब्राउज़र         | `{ kind: 'browser-opfs', name: 'my-wallet' }`       |
| अस्थायी      | `{ kind: 'memory' }`                                |

**महत्वपूर्ण डिफ़ॉल्ट** (v0.1.1 के अनुसार):

- खर्च और चेंज डिफ़ॉल्ट रूप से केवल Ironwood हैं
- शुल्क नियम: ZIP-317
- पुष्टियाँ: 3 विश्वसनीय / 3 अविश्वसनीय
- भुगतान प्रस्तावित करने से पहले हमेशा `wallet.sync()` कॉल करें

## उच्च-स्तरीय वॉलेट कार्यप्रवाह

1. एक mnemonic खाता बनाएँ या आयात करें और एक signer संलग्न करें
2. `wallet.sync()` कॉल करें
3. प्राप्ति पता अनुरोध करें (Unified / Ironwood को प्राथमिकता दें)
4. एक प्रस्ताव बनाएँ → उसकी समीक्षा करें → `wallet.send()` कॉल करें
5. पुष्टि पर नज़र रखें या रीस्टार्ट के बाद पुनर्प्राप्ति के लिए दर्ज ऑपरेशन का उपयोग करें

एप्लिकेशन mnemonic बाइट्स का स्वामी होता है। जब उनकी आवश्यकता न रहे, तो उन्हें मेमोरी से साफ़ कर दें। हमेशा एक स्पष्ट अनुमोदन UI प्रस्तुत करें, जो हर प्राप्तकर्ता, राशि, शुल्क, पूल और समाप्ति दिखाता हो।

पूर्ण कार्यशील उदाहरण के लिए आधिकारिक [Wallet परिचय](https://zcashlabs.github.io/zcashjs/api/walkthrough.html) देखें।

## प्लेटफ़ॉर्म नोट्स और वर्तमान सीमाएँ

| क्षमता            | नोड                              | ब्राउज़र                          |
|-----------------------|-----------------------------------|----------------------------------|
| पैकेज               | नोड 22.23.4 + ESM                | आधुनिक ESM बंडलर + WebAssembly |
| लाइट क्वेरी         | नेटिव gRPC                       | gRPC-Web + CORS                  |
| स्थायी स्टोरेज       | केवल Linux + `flock`              | OPFS (सुरक्षित संदर्भ)            |
| अस्थायी स्टोरेज    | मेमोरी                            | मेमोरी                           |

अतिरिक्त सीमाएँ:

- स्थायी नोड स्टोरेज वर्तमान में केवल Linux है
- अभी कोई प्रबंधित गुप्त वॉल्ट, रिमोट प्रूविंग सेवा या हार्डवेयर-signer एकीकरण नहीं है
- स्टोरेज को विश्राम-अवस्था में एन्क्रिप्टेड के रूप में **नहीं** बताया गया है
- एक ही वॉलेट स्टोरेज को एक साथ कई प्रक्रियाओं या ब्राउज़र टैब से न खोलें
- हमेशा `await wallet.close()` के साथ वॉलेट को साफ़-सुथरे ढंग से बंद करें

## अगले चरण

- आधिकारिक इंस्टॉलेशन और पहला अनुरोध: [इंस्टॉलेशन](https://zcashlabs.github.io/zcashjs/api/installation.html)
- वॉलेट खोलना और कॉन्फ़िगर करना: [वॉलेट खोलें](https://zcashlabs.github.io/zcashjs/api/wallet-runtime.html)
- पूर्ण कार्यप्रवाह: [वॉलेट परिचय](https://zcashlabs.github.io/zcashjs/api/walkthrough.html)
- API संदर्भ: [API संदर्भ](https://zcashlabs.github.io/zcashjs/api/reference.html)
- प्लेटफ़ॉर्म सीमाएँ: [नोड और ब्राउज़र सेटअप](https://zcashlabs.github.io/zcashjs/api/platforms.html)


## आधिकारिक संसाधन

- डेवलपर पुस्तक: [https://zcashlabs.github.io/zcashjs/](https://zcashlabs.github.io/zcashjs/)
- GitHub रिपॉज़िटरी: [https://github.com/zcashlabs/zcashjs](https://github.com/zcashlabs/zcashjs)
- npm पैकेज: `@zcashlabs/zcash.js`


---

*यह गाइड `@zcashlabs/zcash.js@0.1.1` (अक्टूबर 2026) पर आधारित है। SDK सक्रिय विकासाधीन है — नवीनतम API और सीमाओं के लिए हमेशा आधिकारिक दस्तावेज़ को प्राथमिकता दें।*
